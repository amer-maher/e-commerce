
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://amroqadadha_db_user:oNkq8IPUUFS1InvF@cluster0.l5ge8z6.mongodb.net/ecommerce');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema, 'users');

app.post('/api/register', async (req, res) => {
  let { email, username, password } = req.body;
  if (!email || !username || !password) return res.status(400).json({ error: 'Missing fields' });
  // Email format validation
  const emailRegex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email format' });
  // Normalize input
  email = email.trim().toLowerCase();
  username = username.trim();
  try {
    const exists = await User.findOne({
      $or: [
        { email },
        { username: { $regex: `^${username}$`, $options: 'i' } }
      ]
    });
    if (exists) return res.status(409).json({ error: 'User already exists' });
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, username, password: hashedPassword });
    console.log('Attempting to save user:', { email, username });
    await user.save();
    console.log('User saved successfully:', { email, username });
    // Automatically log in after registration
  return res.status(201).json({ message: 'User registered', user: { _id: user._id, email, username } });
  } catch (err) {
    console.error('Registration error:', err);
    if (err && err.name === 'MongoServerError' && err.code === 11000) {
      return res.status(409).json({ error: 'User already exists' });
    }
    res.status(500).json({ error: 'Registration failed', details: err.message, stack: err.stack });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
  res.status(200).json({ message: 'Login successful', user: { _id: user._id, email: user.email, username: user.username } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
// ...existing code...
});

// Products endpoint
const productSchema = new mongoose.Schema({
  productName: String,
  image: String,
  category: String,
  size: String,
  price: Number
});
const Product = mongoose.model('Product', productSchema, 'products');

// CartItem schema
const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true }
});
const CartItem = mongoose.model('CartItem', cartItemSchema, 'cartitems');

// Cart schema
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
  status: { type: String, enum: ['open', 'completed'], default: 'open' },
  totalPrice: { type: Number, required: true }
});
const Cart = mongoose.model('Cart', cartSchema, 'carts');

// Create or get open cart for user
app.post('/api/cart/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  if (!userId || !productId || !quantity) return res.status(400).json({ error: 'Missing fields' });
  try {
    // Find open cart for user
    let cart = await Cart.findOne({ user: userId, status: 'open' }).populate('items');
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    const itemTotal = product.price * quantity;

    // Check if item already exists in cart
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
      // Update cart total
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

// Get cart for user
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId, status: 'open' }).populate({
      path: 'items',
      populate: { path: 'product' }
    });
    if (!cart) return res.status(404).json({ error: 'No open cart found' });
    res.json({ cart });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

// Checkout - complete cart
app.post('/api/cart/checkout/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId, status: 'open' });
    if (!cart) return res.status(404).json({ error: 'No open cart found' });
    cart.status = 'completed';
    await cart.save();
    res.json({ message: 'Checkout successful!', cart });
  } catch (err) {
    console.error('Error completing checkout:', err);
    res.status(500).json({ error: 'Failed to complete checkout' });
  }
});

// Get completed carts (receipts) for user
app.get('/api/cart/receipts/:userId', async (req, res) => {
  try {
    const carts = await Cart.find({ user: req.params.userId, status: 'completed' })
      .populate({
        path: 'items',
        populate: { path: 'product' }
      })
      .sort({ updatedAt: -1 }); // Most recent first
    res.json({ carts });
  } catch (err) {
    console.error('Error fetching receipts:', err);
    res.status(500).json({ error: 'Failed to fetch receipts' });
  }
});

// Get single receipt by cart ID
app.get('/api/cart/receipt/:cartId', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId)
      .populate({
        path: 'items',
        populate: { path: 'product' }
      });
    if (!cart) return res.status(404).json({ error: 'Receipt not found' });
    res.json({ cart });
  } catch (err) {
    console.error('Error fetching receipt:', err);
    res.status(500).json({ error: 'Failed to fetch receipt' });
  }
});

// Remove item from cart
app.delete('/api/cart/item/:userId/:itemId', async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const cart = await Cart.findOne({ user: userId, status: 'open' });
    if (!cart) return res.status(404).json({ error: 'No open cart found' });

    // Remove item from cart
    cart.items = cart.items.filter(id => id.toString() !== itemId);
    
    // If cart is empty, delete it
    if (cart.items.length === 0) {
      await CartItem.findByIdAndDelete(itemId);
      await Cart.findByIdAndDelete(cart._id);
      return res.json({ message: 'Cart deleted - no items remaining', cartDeleted: true });
    }

    // Otherwise, delete the cart item and update cart total
    await CartItem.findByIdAndDelete(itemId);
    
    // Recalculate cart total
    cart.totalPrice = await CartItem.aggregate([
      { $match: { _id: { $in: cart.items } } },
      { $group: { _id: null, sum: { $sum: '$totalPrice' } } }
    ]).then(r => r[0]?.sum || 0);
    
    await cart.save();
    
    // Return updated cart
    const updatedCart = await Cart.findById(cart._id).populate({
      path: 'items',
      populate: { path: 'product' }
    });
    
    res.json({ message: 'Item removed', cart: updatedCart, cartDeleted: false });
  } catch (err) {
    console.error('Error removing item:', err);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get single product by id
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.listen(4000, () => console.log('Server running on port 4000'));