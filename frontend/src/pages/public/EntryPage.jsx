import { Link } from 'react-router-dom'

const roleCards = [
  { role: 'student', title: 'Student Portal', desc: 'Academic progress, assignments, fees, and mentor connect.' },
  { role: 'faculty', title: 'Faculty Portal', desc: 'Attendance, marks entry, class analytics, and resources.' },
  { role: 'parent', title: 'Parent Portal', desc: 'Child performance, parent communication, alerts, and dues.' },
  { role: 'admin', title: 'Admin Console', desc: 'Institution-wide operations, reports, and controls.' },
]

function EntryPage() {
  return (
    <div className="container py-5">
      <div className="entry-hero card border-0 shadow-lg mb-4">
        <div className="card-body p-4 p-md-5">
          <p className="text-uppercase small fw-semibold text-primary mb-2">Welcome</p>
          <h1 className="display-5 fw-bold mb-3">IIT Bombay ERP Experience</h1>
          <p className="lead text-muted mb-4">
            Good to see you. Please choose your portal to continue into the secure system.
          </p>
          <Link className="btn btn-primary btn-lg" to="/login">
            Continue to Login
          </Link>
        </div>
      </div>

      <div className="row g-3">
        {roleCards.map((item) => (
          <div key={item.role} className="col-12 col-md-6">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h2 className="h5 mb-2">{item.title}</h2>
                <p className="text-muted mb-0">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EntryPage
