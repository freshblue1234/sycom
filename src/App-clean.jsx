import React from 'react'

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        padding: '20px', 
        borderRadius: '10px',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{ 
          color: 'white', 
          fontSize: '2.5rem', 
          margin: '0',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          Sycom Industry
        </h1>
        <p style={{ color: 'white', fontSize: '1.2rem', margin: '10px 0 0 0' }}>
          Smart Solutions for Tomorrow
        </p>
      </header>

      <main style={{ textAlign: 'center' }}>
        <section style={{ 
          background: 'rgba(255, 255, 255, 0.9)', 
          padding: '40px', 
          borderRadius: '15px',
          marginBottom: '30px'
        }}>
          <h2 style={{ color: '#333', fontSize: '2rem', marginBottom: '20px' }}>
            Welcome to Sycom Industry
          </h2>
          <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
            We are a Rwandan software company building websites, mobile apps, 
            operating systems, and AI tools like Sybot AI.
          </p>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="/internship-registration"
              style={{
                display: 'inline-block',
                padding: '15px 30px',
                background: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.background = '#0056b3'}
              onMouseOut={(e) => e.target.style.background = '#007bff'}
            >
              Get Started
            </a>
            <a 
              href="#services"
              style={{
                display: 'inline-block',
                padding: '15px 30px',
                background: 'white',
                color: '#007bff',
                textDecoration: 'none',
                border: '2px solid #007bff',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#007bff';
                e.target.style.color = 'white';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#007bff';
              }}
            >
              Learn More
            </a>
          </div>
        </section>

        <section style={{ 
          background: 'rgba(255, 255, 255, 0.9)', 
          padding: '40px', 
          borderRadius: '15px'
        }}>
          <h3 style={{ color: '#333', fontSize: '1.8rem', marginBottom: '20px' }}>
            Internship Program
          </h3>
          <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '30px' }}>
            Join our comprehensive internship program and transform your career in technology.
          </p>
          <a 
            href="/internship"
            style={{
              display: 'inline-block',
              padding: '15px 30px',
              background: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
              onMouseOver={(e) => e.target.style.background = '#218838'}
              onMouseOut={(e) => e.target.style.background = '#28a745'}
          >
            View Internship Details
          </a>
        </section>
      </main>
    </div>
  )
}

export default App
