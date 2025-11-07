import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
// ...existing code...

// ...existing code...

type Product = {
  _id?: string;
  id?: string;
  productName?: string;
  name?: string;
  price?: number;
  image?: string;
  category?: string;
  size?: string;
};

const ProductList: React.FC = () => {
  const { addItem } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center">Loading products...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  // Get unique categories for dropdown
  const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

  // Filter products by search and category
  const filtered = products.filter(p => {
    const name = (p.productName || p.name || '').toLowerCase();
    const matchesSearch = name.includes(search.toLowerCase());
    const matchesCategory = category ? p.category === category : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4">Our Products</h2>
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-2">
          <select
            className="form-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row g-4">
        {filtered.map((p) => (
          <div className="col-sm-6 col-md-4" key={String(p._id || p.id)}>
            <ProductCard
              product={{
                id: String(p._id || p.id),
                name: p.productName || p.name || '',
                price: typeof p.price === 'number' ? p.price : 0,
                image: p.image || '',
              }}
              onAddToCart={async () => {
                if (!user) {
                  navigate('/login', { state: { from: window.location.pathname } });
                  return;
                }
                // Check if user has _id
                if (!user._id) {
                  alert('Please log out and log back in to enable cart functionality');
                  return;
                }
                try {
                  const requestBody = {
                    userId: user._id,
                    productId: p._id || p.id,
                    quantity: 1
                  };
                  console.log('Add to cart request:', requestBody);
                  const res = await fetch('/api/cart/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                  });
                  const result = await res.json();
                  console.log('Add to cart response:', result);
                  if (result.cart) {
                    alert('Item added to cart successfully!');
                  } else {
                    alert(result.error || 'Failed to add to cart');
                  }
                } catch (err) {
                  console.error('Add to cart error:', err);
                  alert('Failed to add to cart');
                }
              }}
            />
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center text-muted">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
