export  default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Sycom Industry</h2>
          <p className="text-xl text-gray-600">Pioneering technology solutions for modern businesses</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://media.istockphoto.com/id/1435220822/photo/african-american-software-developer.jpg?s=612x612&w=0&k=20&c=JESGRQ2xqRH9ZcJzvZBHZIZKVY8MDejBSOfxeM-i5e4=" 
              alt="Team collaboration"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Innovation at Our Core</h3>
            <p className="text-gray-600 mb-6">
              Founded on the belief that technology should serve humanity, Sycom Industry delivers cutting-edge solutions that drive real business transformation. Our team of experts combines technical excellence with strategic vision to create lasting impact.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">50+ Projects</h4>
                <p className="text-sm text-gray-600">Successfully delivered</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">24/7 Support</h4>
                <p className="text-sm text-gray-600">Always here for you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
 