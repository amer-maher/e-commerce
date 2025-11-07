import React, { createContext, useEffect, useState } from 'react'

type User = { _id: string; email: string; username: string } | null

type AuthContextType = {
	user: User
	loading: boolean
	login: (username: string, password: string) => Promise<void>
	logout: () => void
	register: (email: string, username: string, password: string) => Promise<void>
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

	const login = async (username: string, password: string) => {
		const res = await fetch('http://localhost:4000/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});
		const result = await res.json();
		if (result.user) {
			localStorage.setItem('auth_user', JSON.stringify(result.user));
			setUser(result.user);
		} else {
			throw new Error(result.error || 'Login failed');
		}
	}

	const logout = () => {
		localStorage.removeItem('auth_user')
		setUser(null)
	}

	const register = async (email: string, username: string, password: string) => {
		const res = await fetch('http://localhost:4000/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, username, password })
		});
		const result = await res.json();
		if (result.user) {
			localStorage.setItem('auth_user', JSON.stringify(result.user));
			setUser(result.user);
		} else {
			throw new Error(result.error || 'Registration failed');
		}
	}

	return (
		<AuthContext.Provider value={{ user, loading, login, logout, register }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContext
