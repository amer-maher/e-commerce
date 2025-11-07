import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../utils/api';

type Cart = {
	_id: string;
	user: string;
	items: any[];
	status: string;
	totalPrice: number;
	createdAt?: string;
	updatedAt?: string;
};

const Receipts: React.FC = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [receipts, setReceipts] = useState<Cart[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!user) {
			navigate('/login', { state: { from: '/receipts' } });
			return;
		}
		fetchReceipts();
	}, [user, navigate]);

	const fetchReceipts = async () => {
		if (!user?._id) return;
		setLoading(true);
		try {
			const res = await apiFetch(`/api/cart/receipts/${user._id}`);
			const data = await res.json();
			if (data.carts) {
				setReceipts(data.carts);
			} else {
				setError(data.error || 'Failed to load receipts');
			}
		} catch (err) {
			console.error('Failed to fetch receipts:', err);
			setError('Failed to load receipts');
		} finally {
			setLoading(false);
		}
	};

	if (!user) return null;
	if (loading) return <div className="container text-center py-5">Loading receipts...</div>;
	if (error) return <div className="container text-center text-danger py-5">{error}</div>;

	return (
		<main className="container py-5" style={{ minHeight: '70vh' }}>
			<div className="text-center mb-5">
				<h2 className="fw-bold display-5 mb-2">Order History</h2>
				<p className="text-muted">View all your completed purchases</p>
			</div>
			
			{receipts.length === 0 ? (
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="card shadow-sm border-0">
							<div className="card-body text-center py-5">
								<div className="mb-4">
									<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-receipt text-muted" viewBox="0 0 16 16">
										<path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27m.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0z"/>
										<path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5"/>
									</svg>
								</div>
								<h5 className="mb-3">No Orders Yet</h5>
								<p className="text-muted mb-4">You haven't completed any purchases yet. Start shopping to see your order history here!</p>
								<button className="btn btn-primary" onClick={() => navigate('/products')}>
									Browse Products
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="row g-4">
					{receipts.map((cart, index) => (
						<div key={cart._id} className="col-md-6 col-lg-4">
							<div 
								className="card shadow-sm border-0 h-100 hover-card" 
								style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
								onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
								onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
								onClick={() => navigate(`/receipts/${cart._id}`)}
							>
								<div className="card-body p-4">
									<div className="d-flex justify-content-between align-items-start mb-3">
										<div>
											<h5 className="mb-1 fw-bold">Order #{receipts.length - index}</h5>
											<small className="text-muted">ID: {cart._id.slice(-12)}</small>
										</div>
										<div className="badge bg-success px-3 py-2">
											Completed
										</div>
									</div>
									
									<div className="mb-3">
										<div className="text-muted small mb-2">
											<i className="bi bi-calendar-check me-2"></i>
											{cart.updatedAt ? new Date(cart.updatedAt).toLocaleDateString('en-US', { 
												year: 'numeric', 
												month: 'short', 
												day: 'numeric' 
											}) : 'N/A'}
										</div>
										<div className="text-muted small">
											<i className="bi bi-box-seam me-2"></i>
											{cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}
										</div>
									</div>

									<hr />

									<div className="d-flex justify-content-between align-items-center">
										<span className="text-muted">Total</span>
										<h4 className="mb-0 text-primary fw-bold">${cart.totalPrice.toFixed(2)}</h4>
									</div>

									<button className="btn btn-outline-primary w-100 mt-3">
										View Details
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</main>
	);
};

export default Receipts;
