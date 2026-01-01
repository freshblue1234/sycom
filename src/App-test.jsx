import React from 'react'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Sycom Industry</h1>
        <p className="text-lg text-gray-700 mb-8">Admin Dashboard Test</p>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">System Status</h2>
          <div className="space-y-2">
            <p className="text-green-600">✅ Frontend: Working</p>
            <p className="text-green-600">✅ React: Loading</p>
            <p className="text-blue-600">🔗 Admin Login: <a href="/admin/login" className="underline">Click Here</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}
