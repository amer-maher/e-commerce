import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

const Home: React.FC = () => {
	return (
		<main className="container">
			<section className="hero">
				<div className="hero__content">
					<h1 className="hero__title">Welcome to the E‑Commerce Demo</h1>
					<p className="hero__subtitle">Discover products, add to cart, and enjoy a simple checkout flow.</p>
					<div className="hero__actions">
						<Link to="/products">
							<Button variant="primary">Browse Products</Button>
						</Link>
						<Link to="/cart">
							<Button variant="ghost">View Cart</Button>
						</Link>
					</div>
				</div>
				<div className="hero__art" aria-hidden />
			</section>
			<section className="section">
				<h2 className="section__title">Featured</h2>
				<p className="muted">This is a demo app. Use the Products page to explore items.</p>
			</section>
		</main>
	)
}

export default Home