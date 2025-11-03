import React, { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import { Container, Form, Button, Card } from 'react-bootstrap'

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
		<Container className="py-5">
			<Card className="mx-auto" style={{ maxWidth: '400px' }}>
				<Card.Header className="bg-primary text-white">
					<h4 className="mb-0">Register</h4>
				</Card.Header>
				<Card.Body>
					<Form onSubmit={submit}>
						<Form.Group className="mb-3">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								minLength={6}
							/>
						</Form.Group>

						<Button variant="primary" type="submit" className="w-100">
							Register
						</Button>
					</Form>
				</Card.Body>
				<Card.Footer className="text-center">
					Already have an account? <Link to="/login">Login here</Link>
				</Card.Footer>
			</Card>
		</Container>
	)
}

export default Register
