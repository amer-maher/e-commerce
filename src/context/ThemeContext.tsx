import React, { createContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextType = {
	theme: Theme
	toggle: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>('light')

	useEffect(() => {
		const raw = localStorage.getItem('app_theme') as Theme | null
		if (raw === 'dark' || raw === 'light') setTheme(raw)
	}, [])

	useEffect(() => {
		localStorage.setItem('app_theme', theme)
		document.documentElement.setAttribute('data-theme', theme)
	}, [theme])

	const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

	return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export default ThemeContext
