import React from 'react'

export default function TestSimple() {
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
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>REACT IS WORKING!</h1>
      <p style={{ fontSize: '24px', textAlign: 'center', maxWidth: '600px' }}>
        If you can see this, React is rendering correctly. The issue is with the original components.
      </p>
      <button 
        onClick={() => alert('JavaScript is working!')}
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
      >
        Click to Test JavaScript
      </button>
    </div>
  )
}
