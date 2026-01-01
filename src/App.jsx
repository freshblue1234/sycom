import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './components/About'
import Services from './components/Services'
import Products from './components/Products'
import CompanyBio from './components/CompanyBio'
import Team from './components/Team'
import InternshipInfo from './components/InternshipInfo'
import InternshipRegistration from './pages/InternshipRegistration'
import Contact from './pages/Contact'
import Help from './pages/Help'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Footer from './components/Footer'
import { DarkModeProvider } from './contexts/DarkModeContext'

export default function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
              <Route path="/company-bio" element={<CompanyBio />} />
              <Route path="/team" element={<Team />} />
              <Route path="/internship" element={<InternshipInfo />} />
              <Route path="/internship-registration" element={<InternshipRegistration />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </DarkModeProvider>
  )
}