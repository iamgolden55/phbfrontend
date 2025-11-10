import React from 'react';
import { Link } from 'react-router-dom';

const FindPhbNumberPage: React.FC = () => {
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
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2">Find your HPN number</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">How to find your HPN number</h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              Your HPN (Health Point Number) is your digital access point to healthcare services. Keep it safe and share it when needed to get help.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">What is an HPN number?</h2>
          <p className="text-gray-600 mb-4">
            Your HPN (Health Point Number) is a unique identifier assigned to you when you register with PHB. It's used to access your health records, book appointments, and receive healthcare services across the PHB network.
          </p>
          <div className="bg-gray-50 border rounded-md p-4">
            <h3 className="font-medium text-gray-900 mb-2">Why is it important?</h3>
            <ul className="list-disc ml-6 text-gray-600 space-y-1">
              <li>Quick identification during appointments</li>
              <li>Secure access to your medical records</li>
              <li>Streamlined healthcare service delivery</li>
              <li>Emergency medical assistance</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Where to find your HPN number</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium text-lg mb-2 flex items-center">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                In your welcome email
              </h3>
              <p className="text-gray-600 mb-2">
                When you first registered with PHB, you received a welcome email containing your HPN number. Look for an email from PHB with the subject "Welcome to PHB" or "Your PHB Registration Confirmation".
              </p>
              <div className="bg-gray-50 rounded-md p-3 text-sm">
                <p className="text-gray-700 mb-1"><span className="font-medium">Tip:</span> Search your email for:</p>
                <ul className="list-disc ml-6 text-gray-600">
                  <li>"HPN" or "Health Point Number"</li>
                  <li>"PHB Welcome" or "Registration Confirmation"</li>
                  <li>Emails from support@phb.org.ng</li>
                </ul>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium text-lg mb-2 flex items-center">
                <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                On your main dashboard
              </h3>
              <p className="text-gray-600 mb-2">
                Your HPN number is displayed on your main dashboard when you log in to your PHB account.
              </p>
              <ol className="list-decimal ml-6 text-gray-600 space-y-1">
                <li>Sign in to your PHB account</li>
                <li>Go to your main dashboard/home page</li>
                <li>Look for the "Your HPN" section at the top of the page</li>
                <li>Your HPN number will be clearly displayed</li>
              </ol>
              <div className="mt-3">
                <Link to="/account" className="text-blue-600 hover:underline inline-flex items-center text-sm">
                  <span>Go to your dashboard</span>
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-medium text-lg mb-2 flex items-center">
                <svg className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                In your account settings
              </h3>
              <p className="text-gray-600 mb-2">
                You can also find your HPN in your account settings under personal details.
              </p>
              <ol className="list-decimal ml-6 text-gray-600 space-y-1">
                <li>Sign in to your PHB account</li>
                <li>Navigate to "Account Settings" or "Personal Details"</li>
                <li>Your HPN will be listed among your personal information</li>
              </ol>
              <div className="mt-3">
                <Link to="/account/personal-details" className="text-blue-600 hover:underline inline-flex items-center text-sm">
                  <span>Go to personal details</span>
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Security and privacy</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border rounded-md p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900 mb-1">Safe to share</h3>
                  <p className="text-sm text-gray-600">
                    It's safe to share your HPN with healthcare professionals when booking appointments or receiving medical care.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border rounded-md p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900 mb-1">Keep it secure</h3>
                  <p className="text-sm text-gray-600">
                    While your HPN can be shared with healthcare providers, keep it safe like any other personal identifier.
                  </p>
                </div>
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
                    Your HPN alone cannot be used to access your account - a password is always required for account login.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Can't find your HPN?</h2>

          <p className="text-gray-600 mb-4">
            If you're unable to locate your HPN number using the methods above, our support team can help you retrieve it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-md p-4">
              <div className="flex items-center mb-2">
                <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <h3 className="font-medium">Call us</h3>
              </div>
              <p className="text-gray-600 text-sm mb-1">0800 123 4567</p>
              <p className="text-gray-500 text-xs">Available 8am - 8pm, 7 days a week</p>
            </div>

            <div className="border rounded-md p-4">
              <div className="flex items-center mb-2">
                <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="font-medium">Email us</h3>
              </div>
              <p className="text-gray-600 text-sm mb-1">support@phb.org.ng</p>
              <p className="text-gray-500 text-xs">Response within 24 hours</p>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 rounded-md p-4">
            <p className="text-sm text-gray-700">
              <span className="font-medium">What you'll need:</span> To verify your identity, please have your email address and date of birth ready when contacting support.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Related help guides</h2>
        <ul className="space-y-2 text-blue-600">
          <li>
            <Link to="/help/account/personal-details" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Managing your personal details
            </Link>
          </li>
          <li>
            <Link to="/help/account/health-records" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Accessing your health records
            </Link>
          </li>
          <li>
            <Link to="/help/appointments/how-to-book" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              How to book an appointment
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FindPhbNumberPage;
