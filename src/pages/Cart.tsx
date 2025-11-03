import React from 'react'
import useCart from '../hooks/useCart'

const Cart: React.FC = () => {
	const { items, total, removeItem, clearCart } = useCart()

	return (
		<main style={{ padding: 20 }}>
			<h2>Your Cart</h2>
			{items.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					<ul>
						{items.map((it) => (
							<li key={it.id}>{it.name} — {it.quantity}</li>
						))}
					</ul>
					<p>Total: ${total.toFixed(2)}</p>
					<button onClick={() => clearCart()}>Clear cart</button>
				</>
			)}
		</main>
	)
}

export default Cart
