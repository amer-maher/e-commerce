import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

// Protected route for admin users only
const AdminRoute: React.FC<{redirectPath?: string}> = ({ redirectPath = '/' }) => {
	const auth = useAuth()
	const location = useLocation()

	if (auth.loading) {
		return null // or a loader component
	}

	if (!auth.user) {
		return <Navigate to="/login" replace state={{ from: location }} />
	}

	if (!auth.user.isAdmin) {
		// Not an admin, redirect to home with error message
		return <Navigate to={redirectPath} replace />
	}

	return <Outlet />
}

export default AdminRoute
