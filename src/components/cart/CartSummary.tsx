import React from 'react'

const CartSummary: React.FC<{
	total: number
	itemCount: number
	onClear: () => void
	onCheckout: () => void
}> = ({ total, itemCount, onClear, onCheckout }) => {
	return (
		<div>
			<h3>Summary</h3>
			<p className="muted">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
			<div className="summary__row">
				<span>Subtotal</span>
				<strong>${total.toFixed(2)}</strong>
			</div>
			<div className="summary__row">
				<span>Shipping</span>
				<span className="muted">Calculated at checkout</span>
			</div>
			<div className="summary__row summary__row--total">
				<span>Total</span>
				<strong>${total.toFixed(2)}</strong>
			</div>
			<div className="summary__actions">
				<button className="btn btn--secondary" onClick={onClear}>Clear Cart</button>
				<button className="btn btn--primary" onClick={onCheckout}>Checkout</button>
			</div>
		</div>
	)
}

export default CartSummary

