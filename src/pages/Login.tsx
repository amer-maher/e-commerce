import React, { useState } from 'react'
// @ts-ignore: no type declarations for JS module
import useAuth from '../hooks/useAuth.js'
import { useNavigate, useLocation } from 'react-router-dom'

const Login: React.FC = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const auth = useAuth()
	const navigate = useNavigate()
	const location = useLocation()

	const from = (location.state as any)?.from?.pathname || '/'

	const submit = async (e: React.FormEvent) => {
		e.preventDefault()
		await auth.login(email, password)
		navigate(from, { replace: true })
	}

	return (
		<main style={{ padding: 20 }}>
			<h2>Login</h2>
			<form onSubmit={submit}>
				<div>
					<label>Email</label>
					<input value={email} onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div>
					<label>Password</label>
					<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button type="submit">Login</button>
			</form>
		</main>
	)
}

export default Login
