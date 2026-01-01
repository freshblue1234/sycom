import  { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section id="home" className="pt-16 bg-gradient-to-br from-dark-blue-50 to-white dark:from-gray-900 dark:to-gray-900 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Smart Solutions for <span className="text-dark-blue-600">Tomorrow</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Sycom Industry is a Rwandan software company building websites, mobile apps, operating systems, and AI tools like Sybot AI. We create secure, scalable, and smart digital solutions for businesses and communities around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/internship-registration"
                className="bg-dark-blue-600 text-white px-8 py-3 rounded-lg hover:bg-dark-blue-700 dark:hover:bg-dark-blue-500 transition flex items-center gap-2"
              >
                Get Started <ArrowRight size={20} />
              </Link>
              <a
                href="#services"
                className="border border-dark-blue-600 text-dark-blue-600 px-8 py-3 rounded-lg hover:bg-dark-blue-50 dark:hover:bg-gray-800 dark:text-white dark:border-white transition text-center"
              >
                Learn More
              </a>
            </div>
          </div>
          <div>
            <img 
              src="https://media.istockphoto.com/id/1370598601/photo/two-young-contemporary-diversity-programmers-entering-data-in-computer.jpg?s=612x612&w=0&k=20&c=OFtoPCj8yQTUukvAgIhmGqjeBVepxVN-HPJ_VSqPUBw=" 
              alt="Technology workspace"
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
 