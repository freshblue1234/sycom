export default function CompanyBio() {
  return (
    <section id="company-bio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-xl text-gray-600">Learn about Sycom Industry's journey</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Company office"
              className="rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">From Vision to Reality</h3>
            <p className="text-gray-600 mb-6">
              Founded in 2025 by Nshuti Moise, Sycom Industry began with a simple vision: to make cutting-edge technology accessible to businesses of all sizes. What started as a small team of passionate developers has grown into a full-service technology solutions provider.
            </p>
            <p className="text-gray-600 mb-6">
              Our journey has been driven by a commitment to innovation, quality, and customer satisfaction. We've partnered with over 200 clients across various industries, helping them navigate the digital transformation landscape and achieve their business goals.
            </p>
            <p className="text-gray-600 mb-6">
              Today, Sycom Industry continues to push boundaries with emerging technologies like artificial intelligence, blockchain, and IoT. Our team of experts combines technical excellence with strategic vision to create solutions that not only meet today's needs but anticipate tomorrow's challenges.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">200+ Clients</h4>
                <p className="text-sm text-gray-600">Worldwide</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">50+ Team Members</h4>
                <p className="text-sm text-gray-600">And growing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}