import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../common/Button'

type Product = {
	id: string
	name: string
	price: number
	rating?: number
	image?: string
}

const ProductCard: React.FC<{ product: Product; onAddToCart: () => void }> = ({ product, onAddToCart }) => {
	return (
		<div className="product-card card">
			<div className="product-card__image" aria-hidden />
			<div className="product-card__body">
				<h3 className="product-card__title">
					<Link to={`/products/${product.id}`}>{product.name}</Link>
				</h3>
				<p className="product-card__price">${product.price.toFixed(2)}</p>
				<Button variant="primary" onClick={onAddToCart}>Add to Cart</Button>
			</div>
		</div>
	)
}

export default ProductCard


