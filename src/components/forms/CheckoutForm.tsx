import React, { useState } from 'react'

const CheckoutForm: React.FC = () => {
	const [name, setName] = useState('')
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [submitting, setSubmitting] = useState(false)

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setSubmitting(true)
		setTimeout(() => setSubmitting(false), 600)
	}

	return (
		<form className="form" onSubmit={onSubmit}>
			<label className="form__field">
				<span className="form__label">Full Name</span>
				<input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
			</label>
			<label className="form__field">
				<span className="form__label">Address</span>
				<input className="input" value={address} onChange={(e) => setAddress(e.target.value)} required />
			</label>
			<label className="form__field">
				<span className="form__label">City</span>
				<input className="input" value={city} onChange={(e) => setCity(e.target.value)} required />
			</label>
			<button type="submit" className="btn btn--primary" disabled={submitting}>
				{submitting ? 'Placing order…' : 'Place Order'}
			</button>
		</form>
	)
}

export default CheckoutForm



