import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Simple Home Component
function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Sycom Industry</h1>
        <p className="text-lg text-gray-600 mb-8">Welcome to our internship management system</p>
        <div className="space-x-4">
          <a href="/admin/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block">
            Admin Login
          </a>
        </div>
      </div>
    </div>
  )
}

// Admin Login Component
function AdminLogin() {
  const [email, setEmail] = React.useState('admin@sycomindustry.com')
  const [password, setPassword] = React.useState('admin123')
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [redirectToDashboard, setRedirectToDashboard] = React.useState(false)

  React.useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      setRedirectToDashboard(true)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      })

      const result = await response.json()

      if (result.success) {
        localStorage.setItem('adminToken', result.data.token)
        localStorage.setItem('adminUser', JSON.stringify(result.data.admin))
        setMessage('Login successful! Redirecting...')
        setTimeout(() => {
          setRedirectToDashboard(true)
        }, 1000)
      } else {
        setMessage(result.message || 'Login failed')
      }
    } catch (error) {
      setMessage('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (redirectToDashboard) {
    window.location.href = '/admin/dashboard'
    return <div>Redirecting...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600 mt-2">Sycom Industry Dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          
          {message && (
            <div className={`text-center text-sm ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

// Admin Dashboard Component
function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [dashboardData, setDashboardData] = React.useState(null)
  const [registrations, setRegistrations] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const user = localStorage.getItem('adminUser')
    
    if (token && user) {
      setIsAuthenticated(true)
      fetchData()
      
      // Set up real-time updates every 30 seconds
      const interval = setInterval(() => {
        fetchData()
      }, 30000)
      
      return () => clearInterval(interval)
    } else {
      window.location.href = '/admin/login'
    }
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      
      const [dashboardResponse, registrationsResponse] = await Promise.all([
        fetch('http://localhost:5000/api/admin/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:5000/api/admin/registrations', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])

      const dashboardResult = await dashboardResponse.json()
      const registrationsResult = await registrationsResponse.json()

      if (dashboardResult.success) {
        setDashboardData(dashboardResult.data)
      }
      if (registrationsResult.success) {
        setRegistrations(registrationsResult.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    window.location.href = '/admin/login'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-md">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Total Registrations</h3>
              <p className="text-3xl font-bold text-blue-600">{dashboardData.summary.total_registrations || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Paid Registrations</h3>
              <p className="text-3xl font-bold text-green-600">{dashboardData.summary.paid_registrations || 0}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
              <p className="text-3xl font-bold text-purple-600">{(dashboardData.summary.total_revenue || 0).toLocaleString()} RWF</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900">Today's Registrations</h3>
              <p className="text-3xl font-bold text-orange-600">{dashboardData.summary.today_registrations || 0}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Recent Registrations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Field</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {registrations.slice(0, 5).map((reg, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reg.full_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.field}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.payment_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
