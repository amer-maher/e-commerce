import React from 'react'
import Navbar from './Navbar'

const Header: React.FC = () => {
	return (
		<header className="site-header">
			<div className="container site-header__inner">
				<div className="brand">E‑Commerce</div>
				<Navbar />
			</div>
		</header>
	)
}

export default Header


