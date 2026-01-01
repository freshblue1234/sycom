import  { Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', text: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', text: '' })

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.success) {
        setStatus({ type: 'error', text: result?.message || 'Failed to send message. Please try again.' })
        return
      }

      setStatus({ type: 'success', text: 'Thank you for your message! We will get back to you soon.' })
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus({ type: 'error', text: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600">Ready to start your next project? Let's talk.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail className="text-dark-blue-600 w-6 h-6" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">sycomindustry@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-dark-blue-600 w-6 h-6" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">+250 784 090 113</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-dark-blue-600 w-6 h-6" />
                <div>
                  <p className="font-medium text-gray-900">WhatsApp</p>
                  <a href="https://wa.me/+250784090113" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-dark-blue-600">
                    +250 784 090 113
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="text-dark-blue-600 w-6 h-6" />
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-gray-600">Kigali, Rwanda</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {status.text && (
                <div
                  className={
                    status.type === 'success'
                      ? 'p-3 rounded-md bg-green-50 text-green-800 border border-green-200'
                      : 'p-3 rounded-md bg-red-50 text-red-800 border border-red-200'
                  }
                >
                  {status.text}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dark-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dark-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dark-blue-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-dark-blue-600 text-white py-2 px-4 rounded-md hover:bg-dark-blue-700 transition"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
 
