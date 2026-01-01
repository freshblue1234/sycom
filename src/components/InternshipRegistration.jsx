import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, CreditCard, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function InternshipRegistration() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    national_id: '',
    field: '',
    mode: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [paymentStep, setPaymentStep] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const internshipFields = [
    'Software',
    'Networking', 
    'Data Science',
    'Cybersecurity',
    'Web Development',
    'Mobile Development'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.national_id.trim()) newErrors.national_id = 'National ID is required';
    if (!formData.field) newErrors.field = 'Internship field is required';
    if (!formData.mode) newErrors.mode = 'Mode is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessage({ type: 'error', text: 'Please fill in all required fields correctly' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/register-internship', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setRegistrationSuccess(true);
        setRegistrationData(result.data);
        setMessage({ 
          type: 'success', 
          text: 'Registration successful! Please proceed to payment.' 
        });
        setPaymentStep(true);
      } else {
        setMessage({ 
          type: 'error', 
          text: result.message || 'Registration failed. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ 
        type: 'error', 
        text: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayment = async () => {
    if (!registrationData) return;

    setPaymentProcessing(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registration_id: registrationData.id,
          email: registrationData.email,
          amount: 25000 // 25,000 RWF
        })
      });

      const result = await response.json();

      if (result.success) {
        // Redirect to payment page
        window.location.href = result.payment_link;
      } else {
        setMessage({ 
          type: 'error', 
          text: result.message || 'Payment initiation failed. Please try again.' 
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      setMessage({ 
        type: 'error', 
        text: 'Payment error. Please try again.' 
      });
    } finally {
      setPaymentProcessing(false);
    }
  };

  // Check for payment success from URL parameters
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const transactionId = urlParams.get('transaction_id');
    const registrationId = urlParams.get('registration_id');

    if (status === 'successful' && transactionId && registrationId) {
      verifyPayment(transactionId, registrationId);
    }
  }, []);

  const verifyPayment = async (transactionId, registrationId) => {
    setPaymentProcessing(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transaction_id: transactionId,
          registration_id: registrationId
        })
      });

      const result = await response.json();

      if (result.success) {
        setPaymentSuccess(true);
        setMessage({ 
          type: 'success', 
          text: 'Payment successful! Verification code has been sent to your email.' 
        });
        setPaymentStep(false);
      } else {
        setMessage({ 
          type: 'error', 
          text: result.message || 'Payment verification failed.' 
        });
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setMessage({ 
        type: 'error', 
        text: 'Payment verification error. Please contact support.' 
      });
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Internship Registration
          </h2>
          <p className="text-xl text-gray-600">
            Join our internship program and kickstart your career
          </p>
          <div className="mt-4 inline-flex items-center bg-blue-50 px-4 py-2 rounded-lg">
            <CreditCard className="text-blue-600 w-5 h-5 mr-2" />
            <span className="text-blue-900 font-medium">Registration Fee: 25,000 RWF</span>
          </div>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {paymentSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-900 mb-2">
              Registration Complete!
            </h3>
            <p className="text-green-700 mb-4">
              Thank you for registering for our internship program.
            </p>
            <p className="text-green-600">
              Your verification code has been sent to your email address.
              Please keep it safe for when your internship begins.
            </p>
          </div>
        ) : (
          <form onSubmit={handleRegistration} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.full_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting || paymentStep}
                  required
                />
                {errors.full_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting || paymentStep}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="+250 7XX XXX XXX"
                  disabled={isSubmitting || paymentStep}
                  required
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  National ID *
                </label>
                <input
                  type="text"
                  name="national_id"
                  value={formData.national_id}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.national_id ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting || paymentStep}
                  required
                />
                {errors.national_id && (
                  <p className="mt-1 text-sm text-red-600">{errors.national_id}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting || paymentStep}
                  required
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Internship Field *
                </label>
                <select
                  name="field"
                  value={formData.field}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.field ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting || paymentStep}
                  required
                >
                  <option value="">Select a field</option>
                  {internshipFields.map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
                {errors.field && (
                  <p className="mt-1 text-sm text-red-600">{errors.field}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mode *
                </label>
                <select
                  name="mode"
                  value={formData.mode}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.mode ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting || paymentStep}
                  required
                >
                  <option value="">Select mode</option>
                  <option value="Online">Online</option>
                  <option value="Physical">Physical</option>
                </select>
                {errors.mode && (
                  <p className="mt-1 text-sm text-red-600">{errors.mode}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              {!paymentStep ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Processing Registration...
                    </>
                  ) : (
                    'Register for Internship'
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={paymentProcessing}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {paymentProcessing ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Pay 25,000 RWF
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        )}

        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Important Information:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Registration fee is non-refundable</li>
            <li>• Payment can be made via Mobile Money, Card, or Bank Transfer</li>
            <li>• Verification code will be sent to your email after successful payment</li>
            <li>• Keep your verification code safe for internship start</li>
            <li>• For support: sycomindustry@gmail.com | +250 784 090 113</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
