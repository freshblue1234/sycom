import { Box, Cpu, Cloud, Shield } from 'lucide-react'

export default function Products() {
  const products = [
    {
      icon: Box,
      title: "Sycom Builder",
      description: "Our flagship no-code platform for building web applications with drag-and-drop simplicity."
    },
    {
      icon: Cpu,
      title: "Sybot AI",
      description: "Our flagship AI assistant that revolutionizes how businesses interact with technology.",
      link: "https://sybotai.it.com"
    },
    {
      icon: Cloud,
      title: "Sycom Cloud",
      description: "Secure, scalable cloud infrastructure designed for modern enterprises."
    },
    {
      icon: Shield,
      title: "Sycom Security Suite",
      description: "Comprehensive security solutions to protect your digital assets."
    }
  ]

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-xl text-gray-600">Innovative solutions designed for your success</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition">
              <product.icon className="text-dark-blue-600 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{product.title}</h3>
              <p className="text-gray-600">{product.description}</p>
              {product.link && (
                <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-dark-blue-600 hover:underline mt-2 inline-block">
                  Learn more
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}