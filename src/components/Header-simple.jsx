import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-blue-600 font-bold text-xl">SYCOM INDUSTRY</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-dark-blue-600">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-dark-blue-600">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-dark-blue-600">Services</Link>
            <Link to="/products" className="text-gray-700 hover:text-dark-blue-600">Products</Link>
            <Link to="/company-bio" className="text-gray-700 hover:text-dark-blue-600">Company Bio</Link>
            <Link to="/team" className="text-gray-700 hover:text-dark-blue-600">Team</Link>
            <Link to="/internship" className="text-gray-700 hover:text-dark-blue-600 font-semibold text-blue-600">Internship</Link>
            <Link to="/internship-registration" className="text-gray-700 hover:text-dark-blue-600">Register</Link>
            <Link to="/contact" className="text-gray-700 hover:text-dark-blue-600">Contact</Link>
            <Link to="/help" className="text-gray-700 hover:text-dark-blue-600">Help</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
