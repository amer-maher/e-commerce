
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { apiFetch } from '../utils/api';

type Product = {
	_id?: string;
	id?: string;
	productName?: string;
	name?: string;
	price?: number;
	description?: string;
	rating?: number;
	image?: string;
	category?: string;
	size?: string;
};

const ProductDetails: React.FC = () => {
	const { id } = useParams();
	const { user } = useAuth();
	const navigate = useNavigate();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!id) {
			setError('No product ID provided');
			setLoading(false);
			return;
		}
		apiFetch(`/api/products/${id}`)
			.then((res) => res.json())
			.then((data) => {
				if (data.product) {
					setProduct(data.product);
				} else {
					setError('Product not found');
				}
				setLoading(false);
			})
			.catch(() => {
				setError('Failed to fetch product');
				setLoading(false);
			});
	}, [id]);

	if (loading) return <div className="text-center py-5">Loading product...</div>;
	if (error) return <div className="text-center text-danger py-5">{error}</div>;
	if (!product) return null;

	return (
		<section className="container d-flex flex-column" style={{ minHeight: '80vh' }}>
			<div className="row align-items-center">
				<div className="col-md-6 mb-4 mb-md-0">
					<img
						src={product.image || 'https://via.placeholder.com/600x400?text=Product+Image'}
						alt={product.productName || product.name || 'Product'}
						className="img-fluid rounded shadow-sm"
					/>
				</div>
				<div className="col-md-6">
					<h2 className="fw-bold mb-3">{product.productName || product.name}</h2>
					<p className="text-muted mb-3">{product.description || 'No description available.'}</p>
					<h4 className="text-dark mb-4">${typeof product.price === 'number' ? product.price.toFixed(2) : 'N/A'}</h4>
					<div className="mb-2">Category: {product.category || 'N/A'}</div>
					<div className="mb-4">Size: {product.size || 'N/A'}</div>
					<button
						className="btn custom-btn btn-lg"
						onClick={async () => {
							if (!user) {
								alert('Please login to add items to cart');
								navigate('/login');
								return;
							}
							try {
								const res = await apiFetch('/api/cart/add', {
									method: 'POST',
									headers: { 'Content-Type': 'application/json' },
									body: JSON.stringify({
										userId: user._id,
										productId: product._id || product.id,
										quantity: 1
									})
								});
								const result = await res.json();
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
					>
						Add to Cart
					</button>
					<button className="btn btn-outline-secondary ms-3" onClick={() => navigate(-1)}>
						Back
					</button>
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
