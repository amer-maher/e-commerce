import React from 'react'
import SignupForm from '../components/forms/SignupForm'

const Register: React.FC = () => {
	return (
		<main style={{ minHeight: 'calc(100vh - 80px)', display: 'grid', placeItems: 'center', padding: 24 }}>
			<div className="card" style={{ width: '100%', maxWidth: 520 }}>
				<div style={{ padding: 6 }}>
					<SignupForm />
				</div>
			</div>
		</main>
	)
}

export default Register
