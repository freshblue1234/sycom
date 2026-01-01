import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const InternshipRegistration = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        nationalId: '',
        studentCard: '',
        internshipField: '',
        educationLevel: '',
        institution: '',
        experience: '',
        motivation: '',
        startDate: '',
        address: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [currentPrice, setCurrentPrice] = useState(0);

    const pricing = {
        'Software Development': 25000,
        'Networking': 25000,
        'Web Development': 35000,
        'Mobile Development': 35000,
        'Data Science': 50000,
        'Cybersecurity': 50000
    };

    const internshipFields = Object.keys(pricing);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Update price when internship field changes
        if (name === 'internshipField' && pricing[value]) {
            setCurrentPrice(pricing[value]);
        }
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }
        
        if (!formData.nationalId.trim()) {
            newErrors.nationalId = 'National ID or Student Card number is required';
        }
        
        if (!formData.internshipField) {
            newErrors.internshipField = 'Please select an internship field';
        }
        
        if (!formData.educationLevel) {
            newErrors.educationLevel = 'Please select your education level';
        }
        
        if (!formData.institution.trim()) {
            newErrors.institution = 'Institution is required';
        }
        
        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        setSubmitMessage('');
        
        try {
            const response = await fetch('http://localhost:5000/api/internship/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    price: pricing[formData.internshipField],
                    paymentStatus: 'pending'
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                setSubmitMessage('Registration successful! Please proceed to payment.');
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    nationalId: '',
                    studentCard: '',
                    internshipField: '',
                    educationLevel: '',
                    institution: '',
                    experience: '',
                    motivation: '',
                    startDate: '',
                    address: ''
                });
                setCurrentPrice(0);
            } else {
                setSubmitMessage(result.message || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setSubmitMessage('Network error. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <i className="fas fa-rocket text-orange-500 text-2xl mr-3"></i>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Internship Registration</h1>
                        <i className="fas fa-rocket text-orange-500 text-2xl ml-3"></i>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        <i className="fas fa-info-circle text-blue-500 mr-1"></i>
                        Take the first step towards an exciting career in technology. 
                        Fill out the form below to apply for our internship program.
                    </p>
                    <Link
                        to="/internship"
                        className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to Internship Program
                    </Link>
                </div>

                {/* Registration Form */}
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                    <div className="flex items-center justify-center mb-6">
                        <i className="fas fa-edit text-blue-600 text-xl mr-3"></i>
                        <h2 className="text-2xl font-bold text-gray-900">Registration Form</h2>
                        <i className="fas fa-file-alt text-blue-600 text-xl ml-3"></i>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div className="border-b pb-6">
                            <div className="flex items-center mb-6">
                                <i className="fas fa-user text-blue-600 text-lg mr-2"></i>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-user-circle text-gray-400 mr-1"></i>First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.firstName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your first name"
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-user-circle text-gray-400 mr-1"></i>Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.lastName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your last name"
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-envelope text-gray-400 mr-1"></i>Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your email address"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-phone text-gray-400 mr-1"></i>Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.phone ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your phone number"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Identification */}
                        <div className="border-b pb-6">
                            <div className="flex items-center mb-6">
                                <i className="fas fa-id-card text-blue-600 text-lg mr-2"></i>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Identification</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-id-badge text-gray-400 mr-1"></i>National ID or Student Card Number *
                                    </label>
                                    <input
                                        type="text"
                                        name="nationalId"
                                        value={formData.nationalId}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.nationalId ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your National ID or Student Card number"
                                    />
                                    {errors.nationalId && (
                                        <p className="text-red-500 text-sm mt-1">{errors.nationalId}</p>
                                    )}
                                    <p className="text-gray-500 text-sm mt-1">
                                        You can use either your National ID number or Student Card number
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Internship Details */}
                        <div className="border-b pb-6">
                            <div className="flex items-center mb-6">
                                <i className="fas fa-graduation-cap text-blue-600 text-lg mr-2"></i>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Internship Details</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-laptop-code text-gray-400 mr-1"></i>Internship Field *
                                    </label>
                                    <select
                                        name="internshipField"
                                        value={formData.internshipField}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.internshipField ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Select a field</option>
                                        {internshipFields.map(field => (
                                            <option key={field} value={field}>
                                                {field} - {pricing[field].toLocaleString()} RWF/month
                                            </option>
                                        ))}
                                    </select>
                                    {errors.internshipField && (
                                        <p className="text-red-500 text-sm mt-1">{errors.internshipField}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-school text-gray-400 mr-1"></i>Education Level *
                                    </label>
                                    <select
                                        name="educationLevel"
                                        value={formData.educationLevel}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.educationLevel ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Select education level</option>
                                        <option value="high-school">High School</option>
                                        <option value="undergraduate">Undergraduate</option>
                                        <option value="graduate">Graduate</option>
                                        <option value="postgraduate">Postgraduate</option>
                                    </select>
                                    {errors.educationLevel && (
                                        <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-university text-gray-400 mr-1"></i>Institution/University *
                                    </label>
                                    <input
                                        type="text"
                                        name="institution"
                                        value={formData.institution}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.institution ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="Enter your institution name"
                                    />
                                    {errors.institution && (
                                        <p className="text-red-500 text-sm mt-1">{errors.institution}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-calendar-alt text-gray-400 mr-1"></i>Preferred Start Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors.startDate ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.startDate && (
                                        <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="border-b pb-6">
                            <div className="flex items-center mb-6">
                                <i className="fas fa-info-circle text-blue-600 text-lg mr-2"></i>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Information</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-briefcase text-gray-400 mr-1"></i>Relevant Experience
                                    </label>
                                    <textarea
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-3 py-2 border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Tell us about any relevant experience you have"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-heart text-gray-400 mr-1"></i>Motivation for Applying
                                    </label>
                                    <textarea
                                        name="motivation"
                                        value={formData.motivation}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-3 py-2 border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Why are you interested in this internship program?"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <i className="fas fa-map-marker-alt text-gray-400 mr-1"></i>Address
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        rows="2"
                                        className="w-full px-3 py-2 border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Your current address"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pricing Display */}
                        {currentPrice > 0 && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {formData.internshipField}
                                        </h3>
                                        <p className="text-gray-600">Registration Fee</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-bold text-blue-600">
                                            {currentPrice.toLocaleString()} RWF
                                        </p>
                                        <p className="text-gray-500">per month</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="flex flex-col items-center space-y-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane mr-2"></i>
                                        Submit Application
                                    </>
                                )}
                            </button>
                            
                            {submitMessage && (
                                <div className={`p-4 rounded-lg ${
                                    submitMessage.includes('successful') 
                                        ? 'bg-green-100 text-green-800 border border-green-200' 
                                        : 'bg-red-100 text-red-800 border border-red-200'
                                }`}>
                                    <p className="flex items-center">
                                        <i className={`fas ${
                                            submitMessage.includes('successful') ? 'fa-check-circle' : 'fa-exclamation-circle'
                                        } mr-2`}></i>
                                        {submitMessage}
                                    </p>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                {/* Pricing Information */}
                <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                    <div className="flex items-center justify-center mb-6">
                        <i className="fas fa-money-bill-wave text-green-600 text-xl mr-3"></i>
                        <h3 className="text-xl font-bold text-gray-900">Internship Registration Fees</h3>
                        <i className="fas fa-money-bill-wave text-green-600 text-xl ml-3"></i>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(pricing).map(([field, price]) => (
                            <div key={field} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center mb-2">
                                    <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                                        {field.includes('Software') && <i className="fas fa-code text-blue-600 text-sm"></i>}
                                        {field.includes('Web') && <i className="fas fa-globe text-blue-600 text-sm"></i>}
                                        {field.includes('Mobile') && <i className="fas fa-mobile-alt text-blue-600 text-sm"></i>}
                                        {field.includes('Data') && <i className="fas fa-chart-bar text-blue-600 text-sm"></i>}
                                        {field.includes('Cyber') && <i className="fas fa-shield-alt text-blue-600 text-sm"></i>}
                                        {field.includes('Network') && <i className="fas fa-network-wired text-blue-600 text-sm"></i>}
                                    </div>
                                    <h4 className="font-semibold text-gray-900">{field}</h4>
                                </div>
                                <p className="text-2xl font-bold text-blue-600">{price.toLocaleString()} RWF</p>
                                <p className="text-gray-500 text-sm">
                                    <i className="fas fa-calendar-alt mr-1"></i>per month
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternshipRegistration;
