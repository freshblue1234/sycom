import { Mail, Phone, MessageCircle, Clock, X } from 'lucide-react'
import { useState } from 'react'

export default function Help() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const faqData = [
    {
      question: "What services does Sycom Industry offer?",
      answer: "We provide a comprehensive range of technology solutions including software development, IT consulting, system integration, and digital transformation services tailored to meet your business needs."
    },
    {
      question: "How long does a typical project take to complete?",
      answer: "Project timelines vary based on complexity and scope. Simple projects may take 2-4 weeks, while larger enterprise solutions can take 3-6 months. We provide detailed timelines during the initial consultation."
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes, we offer various maintenance and support packages to ensure your systems continue to operate smoothly. Our support team is available to address any issues and provide updates as needed."
    },
    {
      question: "What industries do you specialize in?",
      answer: "We have experience across multiple industries including finance, healthcare, education, retail, and manufacturing. Our adaptable approach allows us to tailor solutions to the specific needs of each sector."
    },
    {
      question: "How do you ensure data security in your solutions?",
      answer: "Security is a top priority. We implement industry-standard encryption, secure coding practices, regular security audits, and compliance with relevant regulations to protect your data."
    },
    {
      question: "What is your pricing model?",
      answer: "Our pricing is project-based and depends on scope, complexity, and timeline. We provide detailed quotes after understanding your requirements. We also offer flexible payment plans for larger projects."
    }
  ]

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const helpOptions = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email and we'll get back to you within 24 hours.",
      contact: "sycomindustry@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us during business hours for immediate assistance.",
      contact: "+250 782 858 703"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time.",
      contact: "Start Live Chat"
    },
    {
      icon: Clock,
      title: "Business Hours",
      description: "Monday to Friday, 9:00 AM to 6:00 PM (GMT+2)",
      contact: "24/7 Emergency Support Available"
    }
  ]

  return (
    <section id="help" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Help & Support</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">We're here to assist you</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {helpOptions.map((option, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl hover:shadow-lg transition">
              <option.icon className="text-dark-blue-600 w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{option.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{option.description}</p>
              <p className="text-dark-blue-600 font-medium">{option.contact}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-dark-blue-50 dark:bg-gray-800 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Find answers to common questions about our services, products, and processes.
            </p>
            <button
              onClick={toggleModal}
              className="bg-dark-blue-600 text-white px-6 py-3 rounded-lg hover:bg-dark-blue-700 transition"
            >
              View FAQ
            </button>
          </div>
        </div>

        {/* FAQ Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {faqData.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <button
                    onClick={closeModal}
                    className="bg-dark-blue-600 text-white px-6 py-2 rounded-lg hover:bg-dark-blue-700 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}