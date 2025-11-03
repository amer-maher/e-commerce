import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar: React.FC = () => {
	return (
		<nav className="nav">
			<NavLink className="nav__link" to="/">Home</NavLink>
			<NavLink className="nav__link" to="/products">Products</NavLink>
			<NavLink className="nav__link" to="/cart">Cart</NavLink>
			<NavLink className="nav__link" to="/login">Login</NavLink>
		</nav>
	)
}

export default Navbar


