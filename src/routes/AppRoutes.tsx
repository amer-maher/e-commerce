import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import ProductsPage from '../pages/ProductsPage'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Receipts from '../pages/Receipts'
import ReceiptDetails from '../pages/ReceiptDetails'
import AdminDashboard from '../pages/AdminDashboard'
import NotFound from '../pages/NotFound'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'
import Header from '../components/layout/header/Header'
import Footer from '../components/layout/footer/Footer'
const AppRoutes: React.FC = () => {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/products/:id" element={<ProductDetails />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				{/* Protected routes */}
				<Route element={<ProtectedRoute />}>
					<Route path="/cart" element={<Cart />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/receipts" element={<Receipts />} />
					<Route path="/receipts/:id" element={<ReceiptDetails />} />
				</Route>

				{/* Admin only routes */}
				<Route element={<AdminRoute />}>
					<Route path="/admin" element={<AdminDashboard />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer/>
		</BrowserRouter>
	)
}

export default AppRoutes
