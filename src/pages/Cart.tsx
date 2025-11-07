import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../utils/api';

const Cart: React.FC = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [cart, setCart] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!user) {
			navigate('/login', { state: { from: '/cart' } });
			return;
		}
		apiFetch(`/api/cart/${user._id}`)
			.then(res => res.json())
			.then(data => {
				if (data.cart) {
					setCart(data.cart);
				} else {
					setError(data.error || 'Failed to load cart');
				}
				setLoading(false);
			})
			.catch(() => {
				setError('Failed to load cart');
				setLoading(false);
			});
	}, [user, navigate]);

	if (!user) return null;
	if (loading) return <div className="container text-center py-5">Loading cart...</div>;
	if (error) return <div className="container text-center text-danger py-5">{error}</div>;

	return (
		<main className="container py-5">
			<h2 className="fw-bold mb-4">Your Shopping Cart</h2>
			{!cart || !cart.items || cart.items.length === 0 ? (
				<div className="alert alert-info">
					<p className="mb-0">Your cart is empty. Start shopping to add items!</p>
				</div>
			) : (
				<>
					<div className="row">
						<div className="col-lg-8">
							<div className="card shadow-sm mb-4">
								<div className="card-body">
									{cart.items.map((it: any) => (
										<div key={it._id} className="row align-items-center border-bottom py-3">
											<div className="col-md-2">
												<img
													src={it.product?.image || 'https://via.placeholder.com/100'}
													alt={it.product?.productName || it.product?.name || 'Product'}
													className="img-fluid rounded"
													style={{ maxWidth: '80px' }}
												/>
											</div>
											<div className="col-md-4">
												<h5 className="mb-1">{it.product?.productName || it.product?.name || 'Product'}</h5>
												<p className="text-muted mb-0">${it.product?.price?.toFixed(2) || '0.00'}</p>
											</div>
											<div className="col-md-3 text-center">
												<span className="badge bg-secondary">Qty: {it.quantity}</span>
											</div>
											<div className="col-md-3 text-end">
												<h6 className="mb-0">${it.totalPrice.toFixed(2)}</h6>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="card shadow-sm">
								<div className="card-body">
									<h5 className="card-title mb-3">Order Summary</h5>
									<div className="d-flex justify-content-between mb-2">
										<span>Items ({cart.items.length})</span>
										<span>${cart.totalPrice.toFixed(2)}</span>
									</div>
									<hr />
									<div className="d-flex justify-content-between mb-3">
										<strong>Total</strong>
										<strong>${cart.totalPrice.toFixed(2)}</strong>
									</div>
									<button className="btn btn-primary w-100 mb-2">Proceed to Checkout</button>
									<button className="btn btn-outline-secondary w-100" onClick={() => navigate('/products')}>
										Continue Shopping
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</main>
	);
}

export default Cart
