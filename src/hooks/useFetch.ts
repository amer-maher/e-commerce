import { useEffect, useState } from 'react'

export default function useFetch(url: string) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!url) return
		let cancelled = false
		setLoading(true)
		setError(null)
		fetch(url)
			.then((r) => r.json())
			.then((json) => {
				if (!cancelled) setData(json)
			})
			.catch((err) => {
				if (!cancelled) setError(err)
			})
			.finally(() => {
				if (!cancelled) setLoading(false)
			})

		return () => {
			cancelled = true
		}
	}, [url])

	return { data, loading, error }
}
