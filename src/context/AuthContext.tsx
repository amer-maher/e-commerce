import React, { createContext, useEffect, useState } from 'react'

type User = { email: string } | null

type AuthContextType = {
	user: User
	loading: boolean
	login: (email: string, password: string) => Promise<void>
	logout: () => void
	register: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const raw = localStorage.getItem('auth_user')
		if (raw) {
			try {
				setUser(JSON.parse(raw))
			} catch (e) {
				setUser(null)
			}
		}
		setLoading(false)
	}, [])

	const login = async (email: string) => {
		// Minimal stub — accept any credentials
		const u = { email }
		localStorage.setItem('auth_user', JSON.stringify(u))
		setUser(u)
	}

	const logout = () => {
		localStorage.removeItem('auth_user')
		setUser(null)
	}

	const register = async (email: string) => {
		// minimal stub — store user
		const u = { email }
		localStorage.setItem('auth_user', JSON.stringify(u))
		setUser(u)
	}

	return (
		<AuthContext.Provider value={{ user, loading, login, logout, register }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
