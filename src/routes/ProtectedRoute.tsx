import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

// A simple protected route component for react-router v6
const ProtectedRoute: React.FC<{redirectPath?: string}> = ({ redirectPath = '/login' }) => {
	const auth = useAuth()
	const location = useLocation()

	if (auth.loading) {
		return null // or a loader component
	}

	if (!auth.user) {
		return <Navigate to={redirectPath} replace state={{ from: location }} />
	}

	return <Outlet />
}

export default ProtectedRoute
