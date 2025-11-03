import React from 'react'
import ProductCard from './ProductCard'
import useCart from '../../hooks/useCart'

const DEMO = [
	{ id: '1', name: 'Product A', price: 19.99 },
	{ id: '2', name: 'Product B', price: 29.99 },
	{ id: '3', name: 'Product C', price: 49.99 },
]

const ProductList: React.FC = () => {
	const { addItem } = useCart()

	return (
		<div className="grid grid--3">
			{DEMO.map((p) => (
				<ProductCard
					key={p.id}
					product={p}
					onAddToCart={() => addItem({ id: p.id, name: p.name, price: p.price, quantity: 1 })}
				/>
			))}
		</div>
	)
}

export default ProductList


