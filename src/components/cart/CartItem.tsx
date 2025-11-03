import React from 'react'

type Item = { id: string; name: string; price: number; quantity: number }

const CartItem: React.FC<{
	item: Item
	onRemove: () => void
	onQuantityChange: (quantity: number) => void
}> = ({ item, onRemove, onQuantityChange }) => {
	return (
		<div className="cart-item">
			<div className="cart-item__image" aria-hidden />
			<div className="cart-item__info">
				<div className="cart-item__title">{item.name}</div>
				<div className="cart-item__meta">${item.price.toFixed(2)} each</div>
				<div className="cart-item__controls">
					<div className="qty">
						<button className="btn btn--ghost" onClick={() => onQuantityChange(item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
						<span className="qty__value">{item.quantity}</span>
						<button className="btn btn--ghost" onClick={() => onQuantityChange(item.quantity + 1)}>+</button>
					</div>
					<button className="btn btn--secondary" onClick={onRemove} aria-label={`Remove ${item.name}`}>Remove</button>
				</div>
			</div>
			<div className="cart-item__total">${(item.price * item.quantity).toFixed(2)}</div>
		</div>
	)
}

export default CartItem

