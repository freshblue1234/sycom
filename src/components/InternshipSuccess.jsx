import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Home, Mail, Phone } from 'lucide-react';

export default function InternshipSuccess() {
  const [paymentStatus, setPaymentStatus] = useState('processing');
  const [verificationCode, setVerificationCode] = useState(null);
  const [registrationDetails, setRegistrationDetails] = useState(null);

  useEffect(() => {
    // Check URL parameters for payment status
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const transactionId = urlParams.get('transaction_id');
    const registrationId = urlParams.get('registration_id');

    if (status === 'successful' && transactionId && registrationId) {
      // Verify payment with backend
      verifyPayment(transactionId, registrationId);
    } else if (status === 'failed') {
      setPaymentStatus('failed');
    } else if (status === 'cancelled') {
      setPaymentStatus('cancelled');
    }
  }, []);

  const verifyPayment = async (transactionId, registrationId) => {
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
        setPaymentStatus('success');
        // Note: Verification code is sent via email, not displayed here for security
      } else {
        setPaymentStatus('failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setPaymentStatus('failed');
    }
  };

  const getStatusContent = () => {
    switch (paymentStatus) {
      case 'success':
        return {
          icon: <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />,
          title: 'Payment Successful!',
          message: 'Your internship registration has been completed successfully.',
          subMessage: 'A verification code has been sent to your email address. Please keep it safe for when your internship begins.',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-900'
        };
      case 'failed':
        return {
          icon: <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />,
          title: 'Payment Failed',
          message: 'We were unable to process your payment.',
          subMessage: 'Please try again or contact our support team for assistance.',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-900'
        };
      case 'cancelled':
        return {
          icon: <AlertCircle className="w-16 h-16 text-yellow-600 mx-auto mb-4" />,
          title: 'Payment Cancelled',
          message: 'Your payment was cancelled.',
          subMessage: 'You can try again anytime by returning to the registration form.',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-900'
        };
      default:
        return {
          icon: (
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          ),
          title: 'Processing Payment...',
          message: 'We are verifying your payment status.',
          subMessage: 'Please wait while we complete the verification process.',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-900'
        };
    }
  };

  const statusContent = getStatusContent();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${statusContent.bgColor} ${statusContent.borderColor} border rounded-xl p-8 text-center`}>
          {statusContent.icon}
          
          <h1 className={`text-3xl md:text-4xl font-bold ${statusContent.textColor} mb-4`}>
            {statusContent.title}
          </h1>
          
          <p className={`text-xl ${statusContent.textColor} mb-4`}>
            {statusContent.message}
          </p>
          
          <p className={`text-lg ${statusContent.textColor} mb-8`}>
            {statusContent.subMessage}
          </p>

          {paymentStatus === 'success' && (
            <div className="bg-white rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Information:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Your verification code has been sent to your registered email address</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Keep your verification code safe - you'll need it when your internship begins</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Check your spam folder if you don't receive the email within 5 minutes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Internship start dates and further instructions will be communicated via email</span>
                </li>
              </ul>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>

            {paymentStatus !== 'success' && (
              <button
                onClick={() => window.location.href = '/#internship-registration'}
                className="flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
              >
                Try Again
              </button>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-white rounded-lg shadow p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Need Help?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <Mail className="text-blue-600 w-6 h-6" />
              <div>
                <p className="font-medium text-gray-900">Email Support</p>
                <p className="text-gray-600">sycomindustry@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-blue-600 w-6 h-6" />
              <div>
                <p className="font-medium text-gray-900">Phone Support</p>
                <p className="text-gray-600">+250 784 090 113</p>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Business Hours: Monday to Friday, 9:00 AM to 6:00 PM (GMT+2)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
