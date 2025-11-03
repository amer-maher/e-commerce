import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Register: React.FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const auth = useAuth()
	const navigate = useNavigate()

	const submit = async (e: React.FormEvent) => {
		e.preventDefault()
		await auth.register(email, password)
		navigate('/')
	}

	return (
		<main style={{ padding: 20 }}>
			<h2>Register</h2>
			<form onSubmit={submit}>
				<div>
					<label>Email</label>
					<input value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div>
					<label>Password</label>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button type="submit">Register</button>
			</form>
		</main>
	)
}

export default Register
