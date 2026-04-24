import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import DashboardHome from './components/DashboardHome'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './hooks/useAuth'
import EntryPage from './pages/public/EntryPage'
import LoginPage from './pages/public/LoginPage'
import './App.css'

const roleColorClass = {
  student: 'text-bg-primary',
  faculty: 'text-bg-success',
  parent: 'text-bg-warning',
  admin: 'text-bg-danger',
}

const roleDisplay = {
  student: 'Student',
  faculty: 'Faculty',
  parent: 'Parent',
  admin: 'Admin',
}

const toKebabCase = (value) =>
  value
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()

const pageModules = import.meta.glob('./pages/*/*.jsx', { eager: true })

const generatedRoutes = Object.entries(pageModules)
  .map(([filePath, module]) => {
    const match = filePath.match(/\.\/pages\/([^/]+)\/([^/]+)\.jsx$/)
    if (!match) {
      return null
    }

    const [, role, fileName] = match
    const slug = toKebabCase(fileName)
    const routePath = `/${role}-dashboard/${slug}`

    return {
      role,
      fileName,
      slug,
      routePath,
      Component: module.default,
    }
  })
  .filter(Boolean)

function HomeDirectory() {
  const groupedRoutes = generatedRoutes.reduce((acc, route) => {
    if (!acc[route.role]) {
      acc[route.role] = []
    }
    acc[route.role].push(route)
    return acc
  }, {})

  const roleOrder = ['student', 'faculty', 'parent', 'admin']

  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-6 fw-bold mb-2">IIT Bombay ERP Module Directory</h1>
        <p className="text-muted mb-0">
          Role dashboards with minimum 15 pages each are now available.
        </p>
      </header>

      <div className="row g-3">
        {roleOrder.map((role) => (
          <div key={role} className="col-12 col-lg-6">
            <section className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h2 className="h5 mb-0">{roleDisplay[role]} Dashboard</h2>
                  <span className={`badge ${roleColorClass[role]}`}>
                    {groupedRoutes[role]?.length ?? 0} Pages
                  </span>
                </div>

                <ul className="list-group list-group-flush">
                  {(groupedRoutes[role] ?? []).map((route) => (
                    <li key={route.routePath} className="list-group-item px-0">
                      <Link className="directory-link" to={route.routePath}>
                        {route.slug}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  )
}

function RedirectHome() {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/entry" replace />
  }

  return <Navigate to={`/${user.role}-dashboard`} replace />
}

function NotFoundPage() {
  return (
    <div className="container py-5 text-center">
      <h1 className="h3 mb-2">Page Not Found</h1>
      <p className="text-muted">The requested route is not available.</p>
      <Link className="btn btn-primary" to="/">
        Back to Home
      </Link>
    </div>
  )
}

function App() {
  const groupedRoutes = generatedRoutes.reduce((acc, route) => {
    if (!acc[route.role]) {
      acc[route.role] = []
    }
    acc[route.role].push(route)
    return acc
  }, {})

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectHome />} />
        <Route path="/entry" element={<EntryPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute role="student" />}>
          <Route
            path="/student-dashboard"
            element={<DashboardHome role="student" routes={groupedRoutes.student || []} />}
          />
        </Route>

        <Route element={<ProtectedRoute role="faculty" />}>
          <Route
            path="/faculty-dashboard"
            element={<DashboardHome role="faculty" routes={groupedRoutes.faculty || []} />}
          />
        </Route>

        <Route element={<ProtectedRoute role="parent" />}>
          <Route
            path="/parent-dashboard"
            element={<DashboardHome role="parent" routes={groupedRoutes.parent || []} />}
          />
        </Route>

        <Route element={<ProtectedRoute role="admin" />}>
          <Route
            path="/admin-dashboard"
            element={<DashboardHome role="admin" routes={groupedRoutes.admin || []} />}
          />
        </Route>

        <Route path="/directory" element={<HomeDirectory />} />

        {generatedRoutes.map((route) => (
          <Route key={route.routePath} element={<ProtectedRoute role={route.role} />}>
            <Route path={route.routePath} element={<route.Component />} />
          </Route>
        ))}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
