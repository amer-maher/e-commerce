import React from 'react'
import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

const Navbar: React.FC = () => {
	const { user, loading } = useAuth();
	return (
		<nav className="nav">
			<NavLink className="nav__link" to="/">Home</NavLink>
			<NavLink className="nav__link" to="/products">Products</NavLink>
			{!loading && user && <NavLink className="nav__link" to="/receipts">Receipts</NavLink>}
			{!loading && user && <NavLink className="nav__link" to="/cart">Cart</NavLink>}
			<NavLink className="nav__link" to="/register">Register</NavLink>
			<NavLink className="nav__link" to="/login">Login</NavLink>
		</nav>
	)
}

export default Navbar


