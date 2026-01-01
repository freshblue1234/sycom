export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sycom Industry</h3>
            <p className="text-gray-400 text-sm">
              Building smart solutions for tomorrow with cutting-edge technology.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/internship" className="text-gray-400 hover:text-white">Internship</a></li>
              <li><a href="/internship-registration" className="text-gray-400 hover:text-white">Register</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="/services" className="text-gray-400 hover:text-white">Web Development</a></li>
              <li><a href="/products" className="text-gray-400 hover:text-white">Mobile Apps</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">AI Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              Kigali, Rwanda<br />
              Email: info@sycomindustry.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Sycom Industry. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
