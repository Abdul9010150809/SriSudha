import { Link } from 'react-router-dom'

import { instituteStats } from '../utils/mockData'

const roleTitle = {
  student: 'Student Dashboard',
  faculty: 'Faculty Dashboard',
  parent: 'Parent Dashboard',
  admin: 'Admin Dashboard',
}

function DashboardHome({ role, routes }) {
  return (
    <div className="container py-4">
      <div className="row g-3 mb-4">
        {instituteStats.map((stat) => (
          <div key={stat.label} className="col-6 col-md-3">
            <div className="card border-0 shadow-sm text-center h-100">
              <div className="card-body p-3">
                <div className="fs-4 fw-bold text-primary mb-1">{stat.value}</div>
                <div className="small text-muted">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h1 className="h3 mb-2">{roleTitle[role]}</h1>
          <p className="text-muted mb-4">Select a module to continue.</p>

          <div className="row g-2">
            {routes.map((route) => (
              <div key={route.routePath} className="col-12 col-md-6 col-xl-4">
                <Link className="btn btn-outline-primary w-100 text-start" to={route.routePath}>
                  {route.slug}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome
