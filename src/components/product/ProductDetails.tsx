import React from 'react'
import Button from '../common/Button'

type Product = {
	id: string
	name: string
	price: number
	description?: string
	rating?: number
	image?: string
}

const ProductDetails: React.FC<{ product: Product; onAddToCart: () => void }> = ({ product, onAddToCart }) => {
	return (
		<section className="product-details card">
			<div className="product-details__image" aria-hidden />
			<div className="product-details__body">
				<h2 className="page-title" style={{ marginTop: 0 }}>{product.name}</h2>
				<p className="muted">{product.description}</p>
				<p className="product-details__price">${product.price.toFixed(2)}</p>
				<Button variant="primary" onClick={onAddToCart}>Add to Cart</Button>
			</div>
		</section>
	)
}

export default ProductDetails


