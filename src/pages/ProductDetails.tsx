import React from 'react'
import { useParams } from 'react-router-dom'
import ProductDetailsView from '../components/product/ProductDetails'
import useCart from '../hooks/useCart'

const ProductDetails: React.FC = () => {
	const { id } = useParams()
	const { addItem } = useCart()

	const product = {
		id: id ?? '1',
		name: `Product ${id}`,
		price: 49.99,
		description: 'A great demo product with lovely features.',
	}

	return (
		<main className="container">
			<ProductDetailsView
				product={product}
				onAddToCart={() => addItem({ id: product.id, name: product.name, price: product.price, quantity: 1 })}
			/>
		</main>
	)
}

export default ProductDetails
