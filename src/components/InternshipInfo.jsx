import React, { useState } from 'react';
import { 
  GraduationCap, 
  Clock, 
  Users, 
  Award, 
  Target, 
  BookOpen, 
  Laptop, 
  Network, 
  Database, 
  Shield, 
  Globe, 
  Smartphone,
  CheckCircle,
  Calendar,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';
import InternshipRegistration from './InternshipRegistration';

export default function InternshipInfo() {
  const [showRegistration, setShowRegistration] = useState(false);

  const internshipFields = [
    {
      icon: Laptop,
      title: 'Software Development',
      description: 'Learn modern programming languages, frameworks, and software development best practices.',
      skills: ['JavaScript', 'Python', 'React', 'Node.js', 'Git']
    },
    {
      icon: Network,
      title: 'Networking',
      description: 'Master network infrastructure, security, and administration of enterprise systems.',
      skills: ['Cisco', 'Network Security', 'TCP/IP', 'Firewalls', 'VPN']
    },
    {
      icon: Database,
      title: 'Data Science',
      description: 'Explore data analysis, machine learning, and artificial intelligence concepts.',
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics', 'TensorFlow']
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Learn ethical hacking, security protocols, and protect digital assets.',
      skills: ['Ethical Hacking', 'Security Audits', 'Cryptography', 'Risk Assessment']
    },
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Build modern, responsive websites and web applications.',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Responsive Design']
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Create native and cross-platform mobile applications.',
      skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Mobile UI/UX']
    }
  ];

  const benefits = [
    {
      icon: GraduationCap,
      title: 'Hands-on Experience',
      description: 'Work on real projects with industry professionals'
    },
    {
      icon: Users,
      title: 'Mentorship',
      description: 'One-on-one guidance from experienced developers'
    },
    {
      icon: Award,
      title: 'Certificate',
      description: 'Receive a recognized certificate upon completion'
    },
    {
      icon: Target,
      title: 'Career Opportunities',
      description: 'Potential job placement with partner companies'
    }
  ];

  const requirements = [
    'Minimum age: 18 years',
    'Basic computer skills',
    'Passion for technology',
    'Commitment to complete the program',
    'Own laptop/computer (for online mode)',
    'Good communication skills'
  ];

  const programStructure = [
    {
      phase: 'Phase 1: Foundation',
      duration: '4 weeks',
      topics: ['Basic concepts', 'Tools setup', 'Introduction to industry standards']
    },
    {
      phase: 'Phase 2: Core Skills',
      duration: '8 weeks',
      topics: ['Advanced concepts', 'Practical projects', 'Team collaboration']
    },
    {
      phase: 'Phase 3: Specialization',
      duration: '6 weeks',
      topics: ['Specialized training', 'Real-world projects', 'Portfolio development']
    },
    {
      phase: 'Phase 4: Capstone',
      duration: '4 weeks',
      topics: ['Final project', 'Presentation skills', 'Job preparation']
    }
  ];

  if (showRegistration) {
    return <InternshipRegistration />;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sycom Industry Internship Program
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Launch your tech career with our comprehensive internship program. 
            Gain hands-on experience, learn from industry experts, and build your portfolio.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowRegistration(true)}
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg"
            >
              Register Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 font-semibold rounded-lg">
              <DollarSign className="w-5 h-5 mr-2" />
              Registration Fee: 25,000 RWF
            </div>
          </div>
        </div>

        {/* Program Overview */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Program</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                Our internship program is designed to bridge the gap between academic knowledge 
                and industry requirements. We provide comprehensive training in various technology 
                fields with a focus on practical skills and real-world applications.
              </p>
              <p className="mb-4">
                Whether you're a recent graduate, student, or career switcher, our program offers 
                the perfect opportunity to kickstart your tech career. You'll work on actual projects, 
                learn from experienced professionals, and build a portfolio that showcases your skills.
              </p>
              <p>
                Join us and become part of Rwanda's growing tech ecosystem. Our graduates have 
                gone on to work with leading tech companies and some have even started their own ventures.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Program Details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="text-blue-600 w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Duration</p>
                  <p className="text-gray-600">22 weeks (5.5 months)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="text-blue-600 w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Mode</p>
                  <p className="text-gray-600">Online or Physical (Kigali)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="text-blue-600 w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Schedule</p>
                  <p className="text-gray-600">Monday - Friday, 9:00 AM - 4:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="text-blue-600 w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Certification</p>
                  <p className="text-gray-600">Industry-recognized certificate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Internship Fields */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Available Internship Fields
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internshipFields.map((field, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <field.icon className="text-blue-600 w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{field.title}</h3>
                <p className="text-gray-600 mb-4">{field.description}</p>
                <div className="flex flex-wrap gap-2">
                  {field.skills.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Our Internship?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <benefit.icon className="text-blue-600 w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Program Structure */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Program Structure
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programStructure.map((phase, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">{phase.phase}</h3>
                  <span className="text-sm text-blue-600 font-medium">{phase.duration}</span>
                </div>
                <ul className="space-y-2">
                  {phase.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Requirements</h2>
            <ul className="space-y-3">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-yellow-900 mb-4">Important Information</h3>
            <ul className="space-y-3 text-yellow-800">
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Registration fee is non-refundable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Limited slots available - first come, first served</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Payment can be made via Mobile Money, Card, or Bank Transfer</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>Verification code will be sent to your email after payment</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Tech Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our internship program and take the first step towards a successful career in technology.
          </p>
          <button
            onClick={() => setShowRegistration(true)}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition shadow-xl text-lg"
          >
            Register for Internship Now
            <ArrowRight className="ml-2 w-6 h-6" />
          </button>
          <p className="mt-4 text-sm opacity-75">
            Registration Fee: 25,000 RWF • Limited Spots Available
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-16 bg-white rounded-lg shadow p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Have Questions?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Mail className="text-blue-600 w-8 h-8 mx-auto mb-3" />
              <p className="font-semibold text-gray-900">Email</p>
              <p className="text-gray-600">sycomindustry@gmail.com</p>
            </div>
            <div className="text-center">
              <Phone className="text-blue-600 w-8 h-8 mx-auto mb-3" />
              <p className="font-semibold text-gray-900">Phone</p>
              <p className="text-gray-600">+250 784 090 113</p>
            </div>
            <div className="text-center">
              <MapPin className="text-blue-600 w-8 h-8 mx-auto mb-3" />
              <p className="font-semibold text-gray-900">Location</p>
              <p className="text-gray-600">Kigali, Rwanda</p>
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
