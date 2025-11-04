import React from 'react'
import LoginForm from '../components/forms/LoginForm'

const Login: React.FC = () => {
	return (
		<main style={{ minHeight: 'calc(100vh - 80px)', display: 'grid', placeItems: 'center', padding: 24 }}>
			<div className="card" style={{ width: '100%', maxWidth: 520 }}>
				<div style={{ padding: 6 }}>
					<LoginForm />
				</div>
			</div>
		</main>
	)
}

export default Login
