import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { timetableRows } from '../utils/mockData'

const roleBadge = {
  Student: 'text-bg-primary',
  Faculty: 'text-bg-success',
  Parent: 'text-bg-warning',
  Admin: 'text-bg-danger',
}

const enhancementFeatures = [
  'Regional Support (English / Hindi / Marathi)',
  'Moodle & ASC Portal Single Sign-On',
  'Hostel Allocation & Mess Rebate System',
  'Central Library Koha Integration',
  'NPTEL & Swayam Course Tracking',
  'Placement Cell Interview Schedules',
  'Digital Document Locker (DigiLocker)',
  'Student Activity Centre (SAC) Bookings',
  'Health Centre Appointment Gateway',
]

const parentContacts = [
  { name: 'R. Sharma', phone: '+91 98765 43210', relation: 'UG 2nd Year Parent' },
  { name: 'S. Patil', phone: '+91 98765 43211', relation: 'PG 1st Year Parent' },
  { name: 'M. Deshmukh', phone: '+91 98765 43212', relation: 'UG 4th Year Parent' },
]

const linkedSystems = [
  'ASC Portal',
  'Moodle LMS',
  'Placement Portal',
  'Central Library',
  'Hostel Affairs',
]

function RolePageTemplate({ role, title, description }) {
  const { user, language, updateLanguage, logout } = useAuth()

  return (
    <div className="role-page container py-4">
      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body p-4">
          <div className="d-flex flex-wrap gap-2 align-items-center justify-content-between">
            <div>
              <span className={`badge ${roleBadge[role]}`}>{role} Portal</span>
              <h1 className="h3 mt-2 mb-1">{title}</h1>
              <p className="text-muted mb-0">{description}</p>
            </div>

            <div className="d-flex flex-wrap gap-2 align-items-center">
              <select
                className="form-select form-select-sm"
                value={language}
                onChange={(event) => updateLanguage(event.target.value)}
                aria-label="Language selector"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Marathi</option>
              </select>
              <Link className="btn btn-outline-secondary btn-sm" to={`/${role.toLowerCase()}-dashboard`}>
                Dashboard
              </Link>
              <button className="btn btn-outline-danger btn-sm" onClick={logout} type="button">
                Logout
              </button>
            </div>
          </div>

          <div className="small text-muted mt-3">
            Logged in as {user?.name} ({user?.role})
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body p-4">
          <h2 className="h5 mb-3">Data Preview: {title}</h2>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Time / Period</th>
                  <th>Course Code</th>
                  <th>Faculty</th>
                  <th>Venue</th>
                </tr>
              </thead>
              <tbody>
                {timetableRows.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.period}</td>
                    <td>{row.subject}</td>
                    <td>{row.faculty}</td>
                    <td>{row.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="small text-muted mt-2">
            * This is dynamic dummy data injected for the IIT Bombay {title} module.
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-xl-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="h5 mb-3">Portal Enhancements</h2>
              <ul className="list-group list-group-flush">
                {enhancementFeatures.map((item) => (
                  <li key={item} className="list-group-item px-0">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-6">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h2 className="h5 mb-3">Linked Institutional Systems</h2>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {linkedSystems.map((system) => (
                  <span key={system} className="badge rounded-pill text-bg-light border">
                    {system}
                  </span>
                ))}
              </div>

              {role === 'Parent' ? (
                <>
                  <h3 className="h6 mb-2">Parent Contact Network</h3>
                  <ul className="list-group list-group-flush">
                    {parentContacts.map((contact) => (
                      <li key={contact.phone} className="list-group-item px-0">
                        <div className="fw-semibold">{contact.name}</div>
                        <div className="small text-muted">{contact.relation}</div>
                        <div className="small">{contact.phone}</div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-muted mb-0">
                  This module is securely integrated with IIT Bombay core systems for seamless data flow via LDAP.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RolePageTemplate
