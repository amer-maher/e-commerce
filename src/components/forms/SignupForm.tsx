import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import Button from '../common/Button'
import '../../assets/styles/auth.css'

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const auth = useAuth()
  const navigate = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !username || !password) {
      setError('Please fill all fields');
      return;
    }
    try {
      setLoading(true);
      await auth.register(email, username, password);
      // Registration successful, user is logged in
      navigate('/');
    } catch (err: any) {
      setError(err?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <div>
        <h2 className="auth__title">Create account</h2>
        <p className="auth__subtitle muted">Join us — it only takes a minute</p>
      </div>

      <div className="form__field">
        <label className="form__label">Email</label>
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      </div>

      <div className="form__field">
        <label className="form__label">Username</label>
        <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="choose a username" />
      </div>

      <div className="form__field">
        <label className="form__label">Password</label>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />
      </div>

      {error && <div style={{ color: 'var(--primary)', fontWeight: 600 }}>{error}</div>}

        <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
          <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Creating account...' : 'Sign up'}</Button>
          <Button type="button" variant="ghost" onClick={() => { setEmail(''); setUsername(''); setPassword('') }}>Clear</Button>
        </div>
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: '#a67c52', borderRadius: 8, padding: '8px 32px', minWidth: 320, display: 'flex', justifyContent: 'center' }}>
            <button
              type="button"
              className="text-muted"
              style={{
                fontSize: '0.95em',
                textAlign: 'center',
                width: '100%',
                background: 'transparent',
                border: 'none',
                padding: 0,
                color: 'inherit'
              }}
              onClick={() => navigate('/login')}
            >
              Already have an account? <span style={{ textDecoration: 'underline' }}>Log in</span>
            </button>
          </div>
        </div>
    </form>
  )
}

export default SignupForm
