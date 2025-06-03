import React from 'react';
import { Link } from 'react-router-dom';

const HowToBookPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link to="/help" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                  Help
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link to="/help/appointments" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                  Appointments
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2">How to book</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">How to book an appointment</h1>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Smart Doctor Matching</h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">
                  Our intelligent system automatically matches you with the most suitable healthcare professional based on your specific needs.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-medium mb-3">How the Smart Matching works</h3>
          <p className="mb-4">
            Our advanced machine learning algorithm considers multiple factors to connect you with the right healthcare provider:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-md p-4 bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-md font-medium">Medical Specialty Matching</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    If your issue concerns a specific body system (like cardiac problems), you'll be matched with a specialist in that area.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4 bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-md font-medium">Emergency Prioritization</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Urgent cases are automatically flagged and matched with available doctors who can provide immediate assistance.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4 bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-md font-medium">Language Preference</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    The system matches you with healthcare providers who speak your preferred language to ensure clear communication.
                  </p>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4 bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-md font-medium">Continuity of Care</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    When possible, the system will match you with healthcare providers who have previously treated you for related conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Booking steps</h2>

          <ol className="relative border-l border-gray-200 ml-3 space-y-8">
            <li className="mb-6 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                <span className="text-blue-600 font-bold">1</span>
              </span>
              <h3 className="font-medium text-lg mb-1">Sign in to your PHB account</h3>
              <p className="text-gray-600 mb-2">
                Log in to your PHB account using your username and password
              </p>
              <Link to="/login" className="text-blue-600 hover:underline inline-flex items-center">
                <span>Go to login page</span>
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </li>

            <li className="mb-6 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                <span className="text-blue-600 font-bold">2</span>
              </span>
              <h3 className="font-medium text-lg mb-1">Navigate to appointment booking</h3>
              <p className="text-gray-600 mb-2">
                Go to your account page and select "Book appointment" or use the direct link below
              </p>
              <Link to="/account/appointments/book" className="text-blue-600 hover:underline inline-flex items-center">
                <span>Book an appointment</span>
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </li>

            <li className="mb-6 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                <span className="text-blue-600 font-bold">3</span>
              </span>
              <h3 className="font-medium text-lg mb-1">Describe your health concern</h3>
              <p className="text-gray-600">
                Provide details about your symptoms or health issue. Include:
              </p>
              <ul className="list-disc ml-6 mt-2 text-gray-600">
                <li>What symptoms you're experiencing</li>
                <li>How long you've had them</li>
                <li>Any relevant medical history</li>
                <li>Emergency status (is it urgent?)</li>
                <li>Language preferences</li>
              </ul>
            </li>

            <li className="mb-6 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                <span className="text-blue-600 font-bold">4</span>
              </span>
              <h3 className="font-medium text-lg mb-1">Review doctor recommendations</h3>
              <p className="text-gray-600 mb-2">
                Our system will suggest healthcare providers based on your specific needs. You'll see:
              </p>
              <ul className="list-disc ml-6 text-gray-600">
                <li>Doctor profiles and specialties</li>
                <li>Available appointment times</li>
                <li>Match score percentage (how well they match your needs)</li>
                <li>Languages spoken</li>
              </ul>
            </li>

            <li className="ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                <span className="text-blue-600 font-bold">5</span>
              </span>
              <h3 className="font-medium text-lg mb-1">Select an appointment and confirm</h3>
              <p className="text-gray-600 mb-2">
                Choose your preferred doctor and appointment time, then confirm your booking. You'll receive:
              </p>
              <ul className="list-disc ml-6 text-gray-600">
                <li>Email confirmation</li>
                <li>SMS reminder (if enabled)</li>
                <li>Option to add to your calendar</li>
                <li>Information about appointment preparation</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Appointment types</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium text-lg mb-2">Video consultation</h3>
              <p className="text-gray-600 mb-3">
                Speak to a healthcare professional via secure video call from the comfort of your home.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No travel required</span>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="font-medium text-lg mb-2">Phone consultation</h3>
              <p className="text-gray-600 mb-3">
                Receive medical advice over the phone at your scheduled appointment time.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Good for those with limited internet access</span>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="font-medium text-lg mb-2">In-person appointment</h3>
              <p className="text-gray-600 mb-3">
                Visit your GP surgery or healthcare facility for a face-to-face consultation.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Best for physical examinations</span>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="font-medium text-lg mb-2">Emergency appointment</h3>
              <p className="text-gray-600 mb-3">
                For urgent medical issues requiring same-day attention. Our system prioritizes these requests.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <svg className="h-4 w-4 mr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-red-600 font-medium">For emergencies only</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Important</h3>
                <div className="text-sm text-yellow-700">
                  <p>
                    If you have a life-threatening emergency, call 999 immediately. Do not wait for an online appointment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Related help guides</h2>
        <ul className="space-y-2 text-blue-600">
          <li>
            <Link to="/help/appointments/cancel-change" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              How to cancel or reschedule an appointment
            </Link>
          </li>
          <li>
            <Link to="/help/appointments/prepare" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              How to prepare for your appointment
            </Link>
          </li>
          <li>
            <Link to="/help/appointments/technical-issues" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Troubleshooting video appointment issues
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HowToBookPage;
