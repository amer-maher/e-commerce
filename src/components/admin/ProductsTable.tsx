import React, { useEffect, useState } from 'react';

interface Product {
  _id: string;
  productName: string;
  image: string;
  category: string;
  size: string;
  price: number;
}

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editForm, setEditForm] = useState({
    productName: '',
    image: '',
    category: '',
    size: '',
    price: 0
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      } else {
        setError(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsCreating(false);
    setEditForm({
      productName: product.productName,
      image: product.image,
      category: product.category,
      size: product.size,
      price: product.price
    });
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingProduct(null);
    setEditForm({
      productName: '',
      image: '',
      category: '',
      size: '',
      price: 0
    });
  };

  const handleSubmit = async () => {
    try {
      const url = isCreating 
        ? '/api/admin/products' 
        : `/api/admin/products/${editingProduct?._id}`;
      
      const method = isCreating ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      });
      const data = await res.json();
      
      if (res.ok) {
        alert(isCreating ? 'Product created successfully!' : 'Product updated successfully!');
        setEditingProduct(null);
        setIsCreating(false);
        fetchProducts();
      } else {
        alert(data.error || 'Failed to save product');
      }
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Failed to save product');
    }
  };

  const handleDelete = async (productId: string, productName: string) => {
    if (!confirm(`Are you sure you want to delete product "${productName}"?`)) return;
    
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      
      if (res.ok) {
        alert('Product deleted successfully!');
        fetchProducts();
      } else {
        alert(data.error || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div style={{ width: '100%', padding: '0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
        <h4 style={{ margin: '0', fontWeight: 'bold' }}>All Products</h4>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ background: '#0d6efd', color: 'white', padding: '8px 16px', borderRadius: '4px' }}>
            {products.length} Total Products
          </span>
          <button 
            onClick={handleCreate}
            style={{
              background: '#198754',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: '500'
            }}
          >
            ➕ Add New Product
          </button>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '100%',
        overflowX: 'auto'
      }}>
        <table style={{ 
          width: '100%', 
          minWidth: '1100px',
          borderCollapse: 'collapse',
          tableLayout: 'fixed'
        }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', width: '80px', fontWeight: '600' }}>#</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', width: '140px', fontWeight: '600' }}>Image</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', width: '300px', fontWeight: '600' }}>Product Name</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', width: '180px', fontWeight: '600' }}>Category</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', width: '120px', fontWeight: '600' }}>Size</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', width: '120px', fontWeight: '600' }}>Price</th>
              <th style={{ padding: '16px 20px', textAlign: 'center', width: '220px', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} style={{ borderBottom: '1px solid #e9ecef' }}>
                <td style={{ padding: '20px', fontSize: '15px' }}>{index + 1}</td>
                <td style={{ padding: '20px' }}>
                  <img
                    src={product.image || 'https://via.placeholder.com/90'}
                    alt={product.productName}
                    style={{ 
                      width: '90px', 
                      height: '90px', 
                      objectFit: 'cover', 
                      borderRadius: '8px',
                      border: '1px solid #dee2e6'
                    }}
                  />
                </td>
                <td style={{ padding: '20px', fontSize: '16px', fontWeight: '600' }}>{product.productName}</td>
                <td style={{ padding: '20px' }}>
                  <span style={{
                    background: '#f8f9fa',
                    border: '1px solid #dee2e6',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    display: 'inline-block'
                  }}>
                    {product.category}
                  </span>
                </td>
                <td style={{ padding: '20px', fontSize: '15px' }}>{product.size}</td>
                <td style={{ padding: '20px', fontSize: '16px', fontWeight: '600', color: '#198754' }}>
                  ${product.price.toFixed(2)}
                </td>
                <td style={{ padding: '20px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleEdit(product)}
                    title="Edit Product"
                    style={{
                      background: 'transparent',
                      border: '1px solid #0d6efd',
                      color: '#0d6efd',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginRight: '8px',
                      fontSize: '14px'
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id, product.productName)}
                    title="Delete Product"
                    style={{
                      background: 'transparent',
                      border: '1px solid #dc3545',
                      color: '#dc3545',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#6c757d' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
          <p>No products found</p>
        </div>
      )}

      {/* Edit/Create Modal */}
      {(editingProduct || isCreating) && (
        <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isCreating ? 'Create New Product' : 'Edit Product'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsCreating(false);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editForm.productName}
                      onChange={(e) => setEditForm({ ...editForm, productName: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Size</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editForm.size}
                      onChange={(e) => setEditForm({ ...editForm, size: e.target.value })}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                      step="0.01"
                      min="0"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editForm.image}
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {editForm.image && (
                  <div className="mb-3">
                    <label className="form-label">Preview</label>
                    <div>
                      <img
                        src={editForm.image}
                        alt="Preview"
                        style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsCreating(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  {isCreating ? 'Create Product' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
