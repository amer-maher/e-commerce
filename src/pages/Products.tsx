import React from 'react'
import { Link } from 'react-router-dom'

const Products: React.FC = () => {
	// Minimal static list for demo
	const items = [
		{ id: '1', name: 'Product A' },
		{ id: '2', name: 'Product B' },
	]

	return (
		<section style={{ padding: 20 }}>
			<h2>Products</h2>
			<ul>
				{items.map((p) => (
					<li key={p.id}>
						<Link to={`/products/${p.id}`}>{p.name}</Link>
					</li>
				))}
			</ul>
		</section>
	)
}

export default Products
