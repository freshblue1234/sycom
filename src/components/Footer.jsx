import logo from '../assets/logo.svg';

export  default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="Sycom Industry Logo" className="h-10 w-auto mr-3" />
              <h3 className="text-2xl font-bold">Sycom Industry</h3>
            </div>
            <p className="text-gray-400">Smart solutions for tomorrow's challenges.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Web Development</li>
              <li>Digital Solutions</li>
              <li>Data Analytics</li>
              <li>AI Consulting</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
              <li><a href="#team" className="hover:text-white transition">Our Team</a></li>
              <li><a href="#contact" className="hover:text-white transition">Careers</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li>LinkedIn</li>
              <li>Twitter</li>
              <li>GitHub</li>
              <li>Email</li>
              <li>
                <a href="https://wa.me/250782858703" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Sycom Industry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
 