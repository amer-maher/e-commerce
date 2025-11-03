import React, { createContext, useEffect, useState } from 'react'

type CartItem = { id: string; name: string; price: number; quantity: number }

type CartContextType = {
	items: CartItem[]
	addItem: (item: CartItem) => void
	removeItem: (id: string) => void
	clearCart: () => void
	total: number
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [items, setItems] = useState<CartItem[]>([])

	useEffect(() => {
		const raw = localStorage.getItem('cart_items')
		if (raw) setItems(JSON.parse(raw))
	}, [])

	useEffect(() => {
		localStorage.setItem('cart_items', JSON.stringify(items))
	}, [items])

	const addItem = (item: CartItem) => {
		setItems((prev) => {
			const found = prev.find((p) => p.id === item.id)
			if (found) {
				return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p))
			}
			return [...prev, item]
		})
	}

	const removeItem = (id: string) => {
		setItems((prev) => prev.filter((p) => p.id !== id))
	}

	const clearCart = () => setItems([])

	const total = items.reduce((s, it) => s + it.price * it.quantity, 0)

	return (
		<CartContext.Provider value={{ items, addItem, removeItem, clearCart, total }}>
			{children}
		</CartContext.Provider>
	)
}

export default CartContext
