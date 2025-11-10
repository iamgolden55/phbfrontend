/**
 * Professional Registry Landing Page
 *
 * Main entry point for the PHB Professional Registry system.
 * Explains benefits, shows professional types, and provides clear CTAs.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Building, UserCheck, FileText, Clock, Shield, Award, Search, LogIn, UserPlus } from 'lucide-react';

const RegistryLandingPage: React.FC = () => {
  const professionalTypes = [
    { name: 'Pharmacist', body: 'PCN', icon: '💊' },
    { name: 'Doctor', body: 'MDCN', icon: '🩺' },
    { name: 'Nurse', body: 'NMCN', icon: '👨‍⚕️' },
    { name: 'Midwife', body: 'NMCN', icon: '👶' },
    { name: 'Dentist', body: 'MDCN', icon: '🦷' },
    { name: 'Physiotherapist', body: 'MPBN', icon: '💪' },
    { name: 'Lab Scientist', body: 'MLSCN', icon: '🔬' },
    { name: 'Radiographer', body: 'RRBN', icon: '📡' },
  ];

  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: 'Verified Credentials',
      description: 'All professionals verified with regulatory bodies (PCN, MDCN, NMCN)',
    },
    {
      icon: <Building className="w-8 h-8 text-green-600" />,
      title: 'Nationwide Network',
      description: 'Practice at any PHB-affiliated facility across Nigeria',
    },
    {
      icon: <FileText className="w-8 h-8 text-purple-600" />,
      title: 'Digital License',
      description: 'Downloadable license certificate and public verification',
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: 'Fast Processing',
      description: 'Most applications reviewed within 3-5 business days',
    },
    {
      icon: <UserCheck className="w-8 h-8 text-indigo-600" />,
      title: 'Patient Trust',
      description: 'Build credibility with verified public professional profile',
    },
    {
      icon: <Award className="w-8 h-8 text-pink-600" />,
      title: 'Free Registration',
      description: 'No application fees for initial professional registration',
    },
  ];

  const registrationSteps = [
    {
      step: 1,
      title: 'Fill Application Form',
      description: 'Complete 6-step form with personal, educational, and professional information',
      time: '15-20 minutes',
    },
    {
      step: 2,
      title: 'Upload Documents',
      description: 'Submit registration certificate, degree, ID, and passport photo',
      time: '5-10 minutes',
    },
    {
      step: 3,
      title: 'Verification Review',
      description: 'PHB admin verifies credentials with regulatory bodies',
      time: '3-5 business days',
    },
    {
      step: 4,
      title: 'Get Licensed',
      description: 'Receive approval email and download your PHB license certificate',
      time: 'Instant',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-6">
              <Award className="w-12 h-12 text-blue-600" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              PHB Professional Registry
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto">
              Nigeria's Trusted Healthcare Professional Registry
            </p>

            <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              Register, verify, and build your professional profile in the PHB healthcare network.
              Join thousands of verified healthcare professionals nationwide.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/registry/apply"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
              >
                <UserPlus className="w-6 h-6 mr-2" />
                Apply for Registration
              </Link>

              <Link
                to="/registry/search"
                className="inline-flex items-center px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors border-2 border-white"
              >
                <Search className="w-6 h-6 mr-2" />
                Search Professionals
              </Link>

              <Link
                to="/registry/dashboard"
                className="inline-flex items-center px-6 py-4 bg-transparent text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors border-2 border-white"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Login to Dashboard
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-blue-700 rounded-lg p-4">
                <div className="text-3xl font-bold">Growing</div>
                <div className="text-blue-200 text-sm">Network of Professionals</div>
              </div>
              <div className="bg-blue-700 rounded-lg p-4">
                <div className="text-3xl font-bold">Trusted</div>
                <div className="text-blue-200 text-sm">Verification System</div>
              </div>
              <div className="bg-blue-700 rounded-lg p-4">
                <div className="text-3xl font-bold">3-5 Days</div>
                <div className="text-blue-200 text-sm">Fast Processing</div>
              </div>
              <div className="bg-blue-700 rounded-lg p-4">
                <div className="text-3xl font-bold">FREE</div>
                <div className="text-blue-200 text-sm">No Registration Fee</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Register with PHB?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join Nigeria's most trusted healthcare professional registry and unlock exclusive benefits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Types Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Who Can Register?
            </h2>
            <p className="text-lg text-gray-600">
              We support all major healthcare professional categories in Nigeria
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {professionalTypes.map((type, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">{type.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{type.name}</h3>
                <p className="text-sm text-gray-500">{type.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Licensed by: PCN • MDCN • NMCN • MPBN • MLSCN • RRBN • OPTON
            </p>
            <Link
              to="/registry/apply"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              See full list of supported professions →
            </Link>
          </div>
        </div>
      </div>

      {/* Registration Process */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple 4-Step Registration Process
          </h2>
          <p className="text-lg text-gray-600">
            Get licensed in as little as 30 minutes of your time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {registrationSteps.map((step) => (
            <div key={step.step} className="relative">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow h-full">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-3">{step.description}</p>
                <p className="text-sm text-blue-600 font-medium">⏱️ {step.time}</p>
              </div>

              {/* Arrow */}
              {step.step < 4 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-300">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/registry/apply"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Start Your Application Now →
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            ✓ No fees • ✓ 15-20 minutes • ✓ Instant confirmation
          </p>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              What You'll Need
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  📋 Information Required
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Professional registration number (PCN, MDCN, etc.)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Educational qualifications and graduation year
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Current practice address and contact information
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Years of professional experience
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    Area of specialization
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  📄 Documents to Upload
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">��</span>
                    Registration certificate (from regulatory body)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">📎</span>
                    Degree certificate or transcript
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">📎</span>
                    Government-issued ID (National ID, passport, driver's license)
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">📎</span>
                    Passport photograph (professional)
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">📎</span>
                    <span className="text-gray-500">Proof of practice address (optional)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <p className="text-yellow-800">
                <strong>Important:</strong> All documents must be clear, readable, and in PDF, JPG, or PNG format (max 5MB each).
                Your credentials will be verified with your regulatory body during the review process.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <details className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
              <summary className="font-semibold text-lg text-gray-900">
                How long does registration take?
              </summary>
              <p className="mt-3 text-gray-600">
                The application form takes 15-20 minutes to complete. After submission and document upload,
                most applications are reviewed within 3-5 business days.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
              <summary className="font-semibold text-lg text-gray-900">
                Is there a registration fee?
              </summary>
              <p className="mt-3 text-gray-600">
                No, professional registration with PHB is currently FREE. There are no application or processing fees.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
              <summary className="font-semibold text-lg text-gray-900">
                Do I need to be in Nigeria to register?
              </summary>
              <p className="mt-3 text-gray-600">
                Yes, you must have a valid Nigerian professional registration number and must be licensed to practice in Nigeria.
                You can complete the registration process from anywhere, but you need Nigerian credentials.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
              <summary className="font-semibold text-lg text-gray-900">
                Can I register if I'm employed by a hospital?
              </summary>
              <p className="mt-3 text-gray-600">
                Yes! Individual registration is open to all licensed professionals. If your hospital is PHB-affiliated,
                you may already be registered through bulk migration. Check with your hospital admin or apply individually.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
              <summary className="font-semibold text-lg text-gray-900">
                What happens after I'm approved?
              </summary>
              <p className="mt-3 text-gray-600">
                Once approved, you'll receive an email with your PHB license number, downloadable certificate,
                and access to your professional dashboard where you can view prescr iption requests, manage your profile,
                and access PHB professional tools.
              </p>
            </details>

            <details className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow">
              <summary className="font-semibold text-lg text-gray-900">
                Can I update my information after registration?
              </summary>
              <p className="mt-3 text-gray-600">
                Yes, you can update most information from your professional dashboard. Major changes
                (like registration number or degree) may require admin verification.
              </p>
            </details>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Nigeria's Leading Healthcare Network?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Register now and get verified within 3-5 business days
          </p>

          <Link
            to="/registry/apply"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl"
          >
            <UserPlus className="w-6 h-6 mr-2" />
            Start Application
          </Link>

          <p className="mt-6 text-blue-200">
            Have questions? Email us at{' '}
            <a href="mailto:registry@phb.ng" className="underline hover:text-white">
              registry@phb.ng
            </a>
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-white mb-3">Quick Links</h4>
              <div className="space-y-2">
                <div><Link to="/registry/apply" className="hover:text-white">Apply Now</Link></div>
                <div><Link to="/registry/search" className="hover:text-white">Search Registry</Link></div>
                <div><Link to="/registry/dashboard" className="hover:text-white">Professional Dashboard</Link></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Support</h4>
              <div className="space-y-2">
                <div><a href="mailto:registry@phb.ng" className="hover:text-white">Email Support</a></div>
                <div><a href="mailto:support@phb.ng" className="hover:text-white">Technical Help</a></div>
                <div><Link to="/help" className="hover:text-white">Help Center</Link></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-3">Regulatory Bodies</h4>
              <div className="text-sm space-y-1">
                <div>PCN • MDCN • NMCN</div>
                <div>MPBN • MLSCN • RRBN</div>
                <div>OPTON</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>© 2025 Public Health Bureau (PHB). All rights reserved.</p>
            <p className="mt-2 text-gray-400">
              Compliant with Nigerian Data Protection Regulation (NDPR)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistryLandingPage;
