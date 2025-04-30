import React from 'react';
import { Link } from 'react-router-dom';

const HowToRequestPage: React.FC = () => {
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
                <Link to="/help/prescriptions" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                  Prescriptions
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2">How to Request Prescriptions</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">How to Request Repeat Prescriptions Online</h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              The PHB platform makes it easy to request repeat prescriptions online. You can order medications that your doctor has approved for repeats without needing to visit your GP surgery.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Before you start</h2>
          <p className="mb-4">
            Before requesting a repeat prescription online, make sure you have:
          </p>
          <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-600">
            <li>A PHB account with verified identity</li>
            <li>A nominated pharmacy where you'd like to collect your medication</li>
            <li>Medications that have been approved for repeat prescription by your GP</li>
          </ul>

          <div className="flex items-center my-6 border-t border-b border-gray-200 py-4">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 mr-4">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600">
              Not all medications can be provided as repeat prescriptions. Controlled medications, antibiotics, and some other drugs may require a consultation with your doctor.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Step-by-step guide</h2>

          <ol className="relative border-l border-gray-200 ml-3 space-y-8">
            <li className="mb-6 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white text-blue-600 font-bold">1</span>
              <h3 className="font-medium text-lg mb-1">Sign in to your PHB account</h3>
              <p className="text-gray-600 mb-2">
                Log in to your PHB account using your username and password.
              </p>
              <Link to="/login" className="text-blue-600 hover:underline inline-flex items-center text-sm font-medium">
                <span>Go to login page</span>
                <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </li>

            <li className="mb-6 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white text-blue-600 font-bold">2</span>
              <h3 className="font-medium text-lg mb-1">Navigate to repeat prescriptions</h3>
              <p className="text-gray-600 mb-2">
                From your account dashboard, select "Request a prescription" or click the direct link below.
              </p>
              <Link to="/account/request-prescription" className="text-blue-600 hover:underline inline-flex items-center text-sm font-medium">
                <span>Go to request prescription</span>
                <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </li>

            <li className="mb-6 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white text-blue-600 font-bold">3</span>
              <h3 className="font-medium text-lg mb-1">Select your medications</h3>
              <p className="text-gray-600">
                You'll see a list of your repeat medications. Select the ones you need by checking the boxes next to them.
              </p>
              <div className="mt-3 bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="text-sm text-gray-600 italic">
                  Only medications that your doctor has approved for repeat prescription will appear in this list.
                </p>
              </div>
            </li>

            <li className="mb-6 ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white text-blue-600 font-bold">4</span>
              <h3 className="font-medium text-lg mb-1">Add any notes (optional)</h3>
              <p className="text-gray-600">
                If needed, you can add additional information for your GP or the pharmacy in the notes section.
              </p>
              <div className="mt-3 bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="text-sm text-gray-600">
                  Examples of useful notes:
                </p>
                <ul className="list-disc ml-5 mt-2 text-sm text-gray-600">
                  <li>If you need a larger supply due to travel plans</li>
                  <li>If you're experiencing any side effects</li>
                  <li>If you have delivery requirements for your pharmacy</li>
                </ul>
              </div>
            </li>

            <li className="ml-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white text-blue-600 font-bold">5</span>
              <h3 className="font-medium text-lg mb-1">Submit your request</h3>
              <p className="text-gray-600 mb-2">
                Review your selections and click "Submit request". Your request will be sent to your GP practice for approval.
              </p>
              <div className="p-4 bg-green-50 border-l-4 border-green-500 text-sm text-green-700">
                After submitting, you'll receive a confirmation with a reference number. You'll be notified when your prescription has been processed and is ready for collection.
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">What happens next?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="flex items-center mb-3">
                <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white text-xl font-semibold">1</span>
                <h3 className="ml-3 text-lg font-medium text-gray-900">GP Review</h3>
              </div>
              <p className="text-gray-600">
                Your request is reviewed by a healthcare professional at your GP practice, usually within 48 hours (working days).
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="flex items-center mb-3">
                <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white text-xl font-semibold">2</span>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Prescription Sent</h3>
              </div>
              <p className="text-gray-600">
                Once approved, your electronic prescription is sent to your nominated pharmacy automatically.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg">
              <div className="flex items-center mb-3">
                <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white text-xl font-semibold">3</span>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Collection</h3>
              </div>
              <p className="text-gray-600">
                You'll receive a notification when your medication is ready for collection from your nominated pharmacy.
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Important</h3>
                <div className="mt-1 text-sm text-yellow-700">
                  <p>
                    Allow at least 48 hours (working days) for your prescription request to be processed. Don't wait until you've run out of medication before requesting a repeat prescription.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg text-gray-900">Why can't I see all my medications in the repeat prescription list?</h3>
              <p className="text-gray-600 mt-1">
                Only medications that your doctor has approved as repeatable will appear in the list. Some medications, such as antibiotics or controlled drugs, may require a consultation before being prescribed.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900">How do I change my nominated pharmacy?</h3>
              <p className="text-gray-600 mt-1">
                You can change your nominated pharmacy through your PHB account settings. Go to <Link to="/account/nominated-pharmacy" className="text-blue-600 hover:underline">Nominated Pharmacy</Link> to make changes.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900">What if I need my prescription urgently?</h3>
              <p className="text-gray-600 mt-1">
                The standard processing time is 48 hours (working days). If you need a prescription urgently, please see our guide on <Link to="/help/prescriptions/urgent-requests" className="text-blue-600 hover:underline">urgent prescription requests</Link>.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900">Will I be notified when my prescription is ready?</h3>
              <p className="text-gray-600 mt-1">
                Yes, you'll receive a notification through your preferred communication method (email, SMS, or app notification) when your prescription has been processed and is ready for collection.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Related help topics</h2>
        <ul className="space-y-2 text-blue-600">
          <li>
            <Link to="/help/prescriptions/how-nominations-work" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              How prescription nominations work
            </Link>
          </li>
          <li>
            <Link to="/help/prescriptions/urgent-requests" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Urgent prescription requests
            </Link>
          </li>
          <li>
            <Link to="/account/request-prescription" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Request a prescription now
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HowToRequestPage;
