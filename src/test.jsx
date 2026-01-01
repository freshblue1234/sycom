import React from 'react'

export default function Test() {
  return (
    <div style={{ 
      padding: '20px', 
      background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', 
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>TEST COMPONENT</h1>
      <p style={{ fontSize: '24px', textAlign: 'center', maxWidth: '600px' }}>
        If you can see this colorful page, React is working perfectly!
        The issue might be with Tailwind CSS or the component imports.
      </p>
      <button 
        style={{
          padding: '15px 30px',
          fontSize: '18px',
          background: 'white',
          color: '#ff6b6b',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
        onClick={() => alert('React is working!')}
      >
        Click me to test JavaScript
      </button>
    </div>
  )
}
