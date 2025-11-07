import React from 'react'
import Hero from '../components/layout/hero/Hero'
import ProductList from '../components/product/ProductList'
import useAuth from '../hooks/useAuth'

const Home: React.FC = () => {
	return (
		<main>
			<Hero />
			<ProductList />
		</main>
	)
}

export default Home