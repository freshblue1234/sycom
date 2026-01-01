import  { Menu, X, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDarkMode } from '../contexts/DarkModeContext'
import logo from '../assets/logo.svg'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { darkMode, toggleDarkMode } = useDarkMode()

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={logo} alt="Sycom Industry Logo" className="h-10 w-auto" />
            <b className="text-blue-600 hover:text-dark-blue-600">SYCOM INDUSTRY</b>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-dark-blue-600">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-dark-blue-600">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-dark-blue-600">Services</Link>
            <Link to="/products" className="text-gray-700 hover:text-dark-blue-600">Products</Link>
            <Link to="/company-bio" className="text-gray-700 hover:text-dark-blue-600">Company Bio</Link>
            <Link to="/team" className="text-gray-700 hover:text-dark-blue-600">Team</Link>
            <Link to="/internship" className="text-gray-700 hover:text-dark-blue-600 font-semibold text-blue-600">Internship</Link>
            <Link to="/contact" className="text-gray-700 hover:text-dark-blue-600">Contact</Link>
            <Link to="/help" className="text-gray-700 hover:text-dark-blue-600">Help</Link>
            <button
              onClick={toggleDarkMode}
              className="text-gray-700 hover:text-dark-blue-600 focus:outline-none"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </nav>

          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" className="block py-2 text-gray-700">Home</Link>
            <Link to="/about" className="block py-2 text-gray-700">About</Link>
            <Link to="/services" className="block py-2 text-gray-700">Services</Link>
            <Link to="/products" className="block py-2 text-gray-700">Products</Link>
            <Link to="/company-bio" className="block py-2 text-gray-700">Company Bio</Link>
            <Link to="/team" className="block py-2 text-gray-700">Team</Link>
            <Link to="/internship" className="block py-2 text-gray-700 font-semibold text-blue-600">Internship</Link>
            <Link to="/contact" className="block py-2 text-gray-700">Contact</Link>
            <Link to="/help" className="block py-2 text-gray-700">Help</Link>
            <button
              onClick={toggleDarkMode}
              className="block py-2 text-gray-700 w-full text-left"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
 
