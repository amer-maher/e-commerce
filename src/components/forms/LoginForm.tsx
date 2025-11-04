import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Button from '../common/Button'
import '../../assets/styles/auth.css'

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as any)?.from?.pathname || '/'

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!username || !password) {
      setError('Please enter username and password')
      return
    }
    try {
      setLoading(true)
      // assume auth.login accepts (username, password)
      await auth.login(username, password)
      navigate(from, { replace: true })
    } catch (err: any) {
      setError(err?.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <div>
        <h2 className="auth__title">Welcome back</h2>
        <p className="auth__subtitle muted">Sign in to your account</p>
      </div>

      <div className="form__field">
        <label className="form__label">Username</label>
        <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="your username" />
      </div>

      <div className="form__field">
        <label className="form__label">Password</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
      </div>

      {error && <div style={{ color: 'var(--primary)', fontWeight: 600 }}>{error}</div>}

      <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => { setUsername(''); setPassword('') }}>
          Clear
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
