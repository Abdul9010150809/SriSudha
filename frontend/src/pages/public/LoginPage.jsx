import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const roleDefaults = {
  student: { username: 'student', password: 'student123' },
  faculty: { username: 'faculty', password: 'faculty123' },
  parent: { username: 'parent', password: 'parent123' },
  admin: { username: 'admin', password: 'admin123' },
}

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [role, setRole] = useState('student')
  const [username, setUsername] = useState(roleDefaults.student.username)
  const [password, setPassword] = useState(roleDefaults.student.password)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleRoleChange(nextRole) {
    setRole(nextRole)
    setUsername(roleDefaults[nextRole].username)
    setPassword(roleDefaults[nextRole].password)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login({ role, username, password })
      navigate(`/${role}-dashboard`, { replace: true })
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h1 className="h3 mb-2">Secure Login</h1>
              <p className="text-muted mb-4">Sign in with your role-specific demo credentials.</p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="role">
                    Role
                  </label>
                  <select
                    id="role"
                    className="form-select"
                    value={role}
                    onChange={(event) => handleRoleChange(event.target.value)}
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="parent">Parent</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                  <input
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>

                {error ? <div className="alert alert-danger py-2">{error}</div> : null}

                <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                  {loading ? 'Signing in...' : 'Login'}
                </button>
              </form>

              <div className="mt-4 small text-muted">
                Demo users: student / faculty / parent / admin with matching passwords ending in 123.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
