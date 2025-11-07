
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { createPortal } from 'react-dom';

const CartOffcanvas: React.FC = () => {
  const { user } = useAuth();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user?._id) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/cart/${user._id}`);
      const data = await res.json();
      if (data.cart) {
        setCart(data.cart);
      }
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!user?._id || !cart) return;
    try {
      const res = await fetch(`/api/cart/checkout/${user._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.message) {
        alert('✅ Checkout successful! Thank you for your order.');
        setCart(null); // Clear cart display
        // Close the offcanvas
        const offcanvasEl = document.getElementById('cartSidebar');
        const bsOffcanvas = (window as any).bootstrap?.Offcanvas?.getInstance(offcanvasEl);
        if (bsOffcanvas) bsOffcanvas.hide();
      } else {
        alert(data.error || 'Checkout failed');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to complete checkout');
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!user?._id) return;
    if (!confirm('Remove this item from cart?')) return;
    
    try {
      const res = await fetch(`/api/cart/item/${user._id}/${itemId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      
      if (data.cartDeleted) {
        // Cart was deleted because it's empty
        setCart(null);
        alert('Item removed. Your cart is now empty.');
      } else if (data.cart) {
        // Update cart with new data
        setCart(data.cart);
      } else {
        alert(data.error || 'Failed to remove item');
      }
    } catch (err) {
      console.error('Error removing item:', err);
      alert('Failed to remove item');
    }
  };

  useEffect(() => {
    // Fetch cart when offcanvas is opened
    const offcanvasEl = document.getElementById('cartSidebar');
    if (offcanvasEl) {
      offcanvasEl.addEventListener('shown.bs.offcanvas', fetchCart);
      return () => offcanvasEl.removeEventListener('shown.bs.offcanvas', fetchCart);
    }
  }, [user]);

  return createPortal(
    <div
      className="offcanvas offcanvas-end text-bg-dark"
      tabIndex={-1}
      id="cartSidebar"
      aria-labelledby="cartSidebarLabel"
      style={{ minWidth: 340 }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="cartSidebarLabel">Your Cart</h5>
        <button
          type="button"
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {loading ? (
          <p>Loading cart...</p>
        ) : !cart || !cart.items || cart.items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul style={{ padding: 0, listStyle: 'none' }}>
              {cart.items.map((it: any) => (
                <li key={it._id} style={{ marginBottom: 12, borderBottom: '1px solid #333', paddingBottom: 8 }}>
                  <div className="d-flex align-items-start mb-2">
                    <img
                      src={it.product?.image || 'https://via.placeholder.com/50'}
                      alt={it.product?.productName || it.product?.name}
                      style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4, marginRight: 8 }}
                    />
                    <div className="flex-grow-1">
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{it.product?.productName || it.product?.name}</div>
                      <div style={{ fontSize: 12, color: '#aaa' }}>Qty: {it.quantity}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>${it.totalPrice.toFixed(2)}</div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(it._id)}
                      className="btn btn-sm btn-danger"
                      style={{ padding: '4px 8px', fontSize: '12px' }}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <hr style={{ borderColor: '#555' }} />
            <div className="d-flex justify-content-between mb-3">
              <strong>Total:</strong>
              <strong>${cart.totalPrice.toFixed(2)}</strong>
            </div>
            <button className="btn btn-warning w-100" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  return (
    <>
      {/* Cart Button */}
      {user && (
        <button
          className="btn btn-outline-warning btn-sm"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#cartSidebar"
          aria-controls="cartSidebar"
        >
          🛒 Cart
        </button>
      )}
      <CartOffcanvas />
    </>
  );
};

export default Sidebar;
