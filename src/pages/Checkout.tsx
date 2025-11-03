import React from 'react'
import CheckoutForm from '../components/forms/CheckoutForm'

const Checkout: React.FC = () => {
	return (
		<main className="container">
			<h2 className="page-title">Checkout</h2>
			<div className="card">
				<CheckoutForm />
			</div>
		</main>
	)
}

export default Checkout
