import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { apiFetch } from '../utils/api';

type CartItem = {
	_id: string;
	product: {
		_id: string;
		productName?: string;
		name?: string;
		image?: string;
		price: number;
		category?: string;
	};
	quantity: number;
	totalPrice: number;
};

type Cart = {
	_id: string;
	user: string;
	items: CartItem[];
	status: string;
	totalPrice: number;
	createdAt?: string;
	updatedAt?: string;
};

const ReceiptDetails: React.FC = () => {
	const { id } = useParams();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [cart, setCart] = useState<Cart | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!user) {
			navigate('/login');
			return;
		}
		if (!id) {
			setError('No receipt ID provided');
			setLoading(false);
			return;
		}
		fetchReceiptDetails();
	}, [user, id, navigate]);

	const fetchReceiptDetails = async () => {
		if (!id) return;
		setLoading(true);
		try {
			const res = await apiFetch(`/api/cart/receipt/${id}`);
			const data = await res.json();
			if (data.cart) {
				setCart(data.cart);
			} else {
				setError(data.error || 'Receipt not found');
			}
		} catch (err) {
			console.error('Failed to fetch receipt details:', err);
			setError('Failed to load receipt details');
		} finally {
			setLoading(false);
		}
	};

	if (!user) return null;
	if (loading) return <div className="container text-center py-5">Loading receipt...</div>;
	if (error) return <div className="container text-center text-danger py-5">{error}</div>;
	if (!cart) return <div className="container text-center py-5">Receipt not found</div>;

	return (
		<main style={{ padding: '40px 20px', minHeight: '70vh', maxWidth: '1200px', margin: '0 auto' }}>
			<button 
				className="btn btn-outline-primary mb-4" 
				onClick={() => navigate('/receipts')}
				style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
			>
				← Back to Orders
			</button>

			<div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
				{/* Header */}
				<div style={{ 
					background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
					color: 'white',
					padding: '30px'
				}}>
					<h2 style={{ marginBottom: '10px', fontWeight: 'bold' }}>Order Receipt</h2>
					<p style={{ margin: '0', opacity: '0.9' }}>Order ID: {cart._id.slice(-12).toUpperCase()}</p>
					<div style={{ marginTop: '15px' }}>
						<span style={{ 
							background: 'white', 
							color: '#333', 
							padding: '6px 12px', 
							borderRadius: '4px',
							marginRight: '10px',
							display: 'inline-block'
						}}>
							{cart.updatedAt ? new Date(cart.updatedAt).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							}) : 'N/A'}
						</span>
						<span style={{ 
							background: '#28a745', 
							color: 'white', 
							padding: '6px 12px', 
							borderRadius: '4px',
							display: 'inline-block'
						}}>
							✓ Completed
						</span>
					</div>
				</div>

				{/* Body */}
				<div style={{ padding: '30px' }}>
					<h5 style={{ marginBottom: '20px', fontWeight: 'bold' }}>
						Order Items 
						<span style={{ 
							background: '#007bff', 
							color: 'white', 
							padding: '4px 12px', 
							borderRadius: '4px',
							marginLeft: '10px',
							fontSize: '14px'
						}}>
							{cart.items.length} Items
						</span>
					</h5>
					
					{/* Items */}
					{cart.items.map((item, index) => (
						<div 
							key={item._id} 
							style={{ 
								border: '1px solid #dee2e6',
								borderRadius: '6px',
								padding: '20px',
								marginBottom: '15px',
								background: '#f8f9fa'
							}}
						>
							<div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'nowrap' }}>
								<div style={{ width: '50px', textAlign: 'center', flexShrink: 0 }}>
									<strong style={{ color: '#6c757d' }}>#{index + 1}</strong>
								</div>
								<div style={{ flex: '1', minWidth: '200px' }}>
									<div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
										{item.product?.productName || item.product?.name || 'Product'}
									</div>
									<div style={{ color: '#6c757d', fontSize: '14px' }}>
										{item.product?.category || '-'}
									</div>
								</div>
								<div style={{ width: '120px', textAlign: 'center', flexShrink: 0 }}>
									<div style={{ color: '#6c757d', fontSize: '12px', marginBottom: '4px' }}>Unit Price</div>
									<div style={{ fontWeight: 'bold' }}>${item.product?.price?.toFixed(2)}</div>
								</div>
								<div style={{ width: '100px', textAlign: 'center', flexShrink: 0 }}>
									<div style={{ color: '#6c757d', fontSize: '12px', marginBottom: '4px' }}>Quantity</div>
									<span style={{ 
										background: '#6c757d', 
										color: 'white', 
										padding: '4px 12px', 
										borderRadius: '4px',
										display: 'inline-block'
									}}>
										{item.quantity}
									</span>
								</div>
								<div style={{ width: '130px', textAlign: 'right', flexShrink: 0 }}>
									<div style={{ color: '#6c757d', fontSize: '12px', marginBottom: '4px' }}>Subtotal</div>
									<div style={{ fontWeight: 'bold', color: '#007bff', fontSize: '20px' }}>
										${item.totalPrice.toFixed(2)}
									</div>
								</div>
							</div>
						</div>
					))}

					{/* Summary */}
					<div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
						<div style={{ 
							background: '#f8f9fa', 
							padding: '25px', 
							borderRadius: '8px',
							width: '100%',
							maxWidth: '400px'
						}}>
							<h5 style={{ marginBottom: '20px', fontWeight: 'bold' }}>Order Summary</h5>
							<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
								<span>Total Items:</span>
								<strong>{cart.items.length}</strong>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
								<span>Total Quantity:</span>
								<strong>{cart.items.reduce((sum, item) => sum + item.quantity, 0)}</strong>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
								<span>Subtotal:</span>
								<strong>${cart.totalPrice.toFixed(2)}</strong>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
								<span>Shipping:</span>
								<strong style={{ color: '#28a745' }}>Free</strong>
							</div>
							<hr style={{ margin: '20px 0' }} />
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
								<h4 style={{ margin: '0' }}>Total:</h4>
								<h3 style={{ margin: '0', color: '#28a745', fontWeight: 'bold' }}>
									${cart.totalPrice.toFixed(2)}
								</h3>
							</div>
						</div>
					</div>
				</div>

				{/* Footer */}
				<div style={{ 
					background: '#f8f9fa', 
					textAlign: 'center', 
					padding: '15px',
					borderTop: '1px solid #dee2e6'
				}}>
					<small style={{ color: '#6c757d' }}>
						✓ This order has been completed successfully
					</small>
				</div>
			</div>
		</main>
	);
};

export default ReceiptDetails;
