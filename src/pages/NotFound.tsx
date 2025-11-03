import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => (
	<main style={{ padding: 20 }}>
		<h2>404 — Not Found</h2>
		<p>The page you requested does not exist.</p>
		<p>
			<Link to="/">Go home</Link>
		</p>
	</main>
)

export default NotFound
