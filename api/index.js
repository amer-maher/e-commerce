import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not set');
  }

  const connection = await mongoose.connect(MONGO_URI);
  cachedDb = connection;
  return connection;
}

// Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});

const productSchema = new mongoose.Schema({
  productName: String,
  image: String,
  category: String,
  size: String,
  price: Number
});

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
  status: { type: String, enum: ['open', 'completed'], default: 'open' },
  totalPrice: { type: Number, required: true },
  submissionDate: { type: Date }
}, { timestamps: true });

// Models
const User = mongoose.models.User || mongoose.model('User', userSchema, 'users');
const Product = mongoose.models.Product || mongoose.model('Product', productSchema, 'products');
const CartItem = mongoose.models.CartItem || mongoose.model('CartItem', cartItemSchema, 'cartitems');
const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema, 'carts');

// Register endpoint
app.post('/api/register', async (req, res) => {
  await connectToDatabase();
  let { email, username, password } = req.body;
  if (!email || !username || !password) return res.status(400).json({ error: 'Missing fields' });
  const emailRegex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email format' });
  email = email.trim().toLowerCase();
  username = username.trim();
  try {
    const exists = await User.findOne({
      $or: [{ email }, { username: { $regex: `^${username}$`, $options: 'i' } }]
    });
    if (exists) return res.status(409).json({ error: 'User already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    return res.status(201).json({ message: 'User registered', user: { _id: user._id, email, username, isAdmin: user.isAdmin } });
  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  await connectToDatabase();
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
    res.status(200).json({ message: 'Login successful', user: { _id: user._id, email: user.email, username: user.username, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Cart endpoints
app.post('/api/cart/add', async (req, res) => {
  await connectToDatabase();
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) return res.status(400).json({ error: 'Missing fields' });
  try {
    let cart = await Cart.findOne({ user: userId, status: 'open' }).populate('items');
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const itemTotal = product.price * quantity;

    let cartItem;
    if (cart) {
      cartItem = await CartItem.findOne({ product: productId, _id: { $in: cart.items } });
      if (cartItem) {
        cartItem.quantity += quantity;
        cartItem.totalPrice = cartItem.quantity * product.price;
        await cartItem.save();
      } else {
        cartItem = new CartItem({ product: productId, quantity, totalPrice: itemTotal });
        await cartItem.save();
        cart.items.push(cartItem._id);
      }
      cart.totalPrice = await CartItem.aggregate([
        { $match: { _id: { $in: cart.items } } },
        { $group: { _id: null, sum: { $sum: '$totalPrice' } } }
      ]).then(r => r[0]?.sum || 0);
      await cart.save();
    } else {
      cartItem = new CartItem({ product: productId, quantity, totalPrice: itemTotal });
      await cartItem.save();
      cart = new Cart({ user: userId, items: [cartItem._id], status: 'open', totalPrice: itemTotal });
      await cart.save();
    }
    res.json({ cart });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

app.get('/api/cart/:userId', async (req, res) => {
  await connectToDatabase();
  try {
    const cart = await Cart.findOne({ user: req.params.userId, status: 'open' }).populate({
      path: 'items',
      populate: { path: 'product' }
    });
    if (!cart) return res.status(404).json({ error: 'No open cart found' });
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

app.post('/api/cart/checkout/:userId', async (req, res) => {
  await connectToDatabase();
  try {
    const cart = await Cart.findOne({ user: req.params.userId, status: 'open' });
    if (!cart) return res.status(404).json({ error: 'No open cart found' });
    cart.status = 'completed';
    cart.submissionDate = new Date();
    await cart.save();
    res.json({ message: 'Checkout successful!', cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to complete checkout' });
  }
});

app.get('/api/cart/receipts/:userId', async (req, res) => {
  await connectToDatabase();
  try {
    const carts = await Cart.find({ user: req.params.userId, status: 'completed' })
      .populate({ path: 'items', populate: { path: 'product' } })
      .sort({ updatedAt: -1 });
    res.json({ carts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch receipts' });
  }
});

app.get('/api/cart/receipt/:cartId', async (req, res) => {
  await connectToDatabase();
  try {
    const cart = await Cart.findById(req.params.cartId)
      .populate({ path: 'items', populate: { path: 'product' } });
    if (!cart) return res.status(404).json({ error: 'Receipt not found' });
    res.json({ cart });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch receipt' });
  }
});

app.delete('/api/cart/item/:userId/:itemId', async (req, res) => {
  await connectToDatabase();
  try {
    const { userId, itemId } = req.params;
    const cart = await Cart.findOne({ user: userId, status: 'open' });
    if (!cart) return res.status(404).json({ error: 'No open cart found' });

    cart.items = cart.items.filter(id => id.toString() !== itemId);
    
    if (cart.items.length === 0) {
      await CartItem.findByIdAndDelete(itemId);
      await Cart.findByIdAndDelete(cart._id);
      return res.json({ message: 'Cart deleted - no items remaining', cartDeleted: true });
    }

    await CartItem.findByIdAndDelete(itemId);
    cart.totalPrice = await CartItem.aggregate([
      { $match: { _id: { $in: cart.items } } },
      { $group: { _id: null, sum: { $sum: '$totalPrice' } } }
    ]).then(r => r[0]?.sum || 0);
    await cart.save();
    
    const updatedCart = await Cart.findById(cart._id).populate({
      path: 'items',
      populate: { path: 'product' }
    });
    res.json({ message: 'Item removed', cart: updatedCart, cartDeleted: false });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

// Product endpoints
app.get('/api/products', async (req, res) => {
  await connectToDatabase();
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  await connectToDatabase();
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Admin endpoints
app.get('/api/admin/sales-analytics', async (req, res) => {
  await connectToDatabase();
  try {
    const salesData = await Cart.aggregate([
      { $match: { status: 'completed', submissionDate: { $exists: true } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$submissionDate' } },
          totalSales: { $sum: '$totalPrice' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { date: '$_id', totalSales: 1, orderCount: 1, _id: 0 } }
    ]);
    res.json({ salesData });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sales analytics' });
  }
});

app.get('/api/admin/users', async (req, res) => {
  await connectToDatabase();
  try {
    const users = await User.find({}).select('-password');
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.put('/api/admin/users/:id', async (req, res) => {
  await connectToDatabase();
  try {
    const { email, username } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { email, username },
      { new: true, runValidators: true }
    ).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated', user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/admin/users/:id', async (req, res) => {
  await connectToDatabase();
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.put('/api/admin/products/:id', async (req, res) => {
  await connectToDatabase();
  try {
    const { productName, image, category, size, price } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { productName, image, category, size, price },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product updated', product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/admin/products/:id', async (req, res) => {
  await connectToDatabase();
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

app.post('/api/admin/products', async (req, res) => {
  await connectToDatabase();
  try {
    const { productName, image, category, size, price } = req.body;
    const product = new Product({ productName, image, category, size, price });
    await product.save();
    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Export for Vercel
export default app;
