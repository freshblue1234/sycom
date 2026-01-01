import  { Code, Globe, Database, Zap } from 'lucide-react'

export default function Services() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom web applications built with modern technologies and best practices."
    },
    {
      icon: Globe,
      title: "Digital Solutions",
      description: "Comprehensive digital transformation strategies for growing businesses."
    },
    {
      icon: Database,
      title: "Data Analytics",
      description: "Turn your data into actionable insights with advanced analytics solutions."
    },
    {
      icon: Zap,
      title: "AI Consulting",
      description: "Harness the power of artificial intelligence to automate and optimize."
    }
  ]

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Comprehensive solutions for your technology needs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition">
              <service.icon className="text-dark-blue-600 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
 