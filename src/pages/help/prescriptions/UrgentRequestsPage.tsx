import React from 'react';
import { Link } from 'react-router-dom';

const UrgentRequestsPage: React.FC = () => {
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
                <span className="ml-1 text-gray-500 md:ml-2">Urgent Prescription Requests</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Urgent Prescription Requests</h1>

      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Medical Emergency?</h3>
            <div className="mt-1 text-sm text-red-700">
              <p>
                If you're experiencing a medical emergency, call <strong className="font-bold">999</strong> immediately or go to your nearest Emergency Department. This information is for non-emergency urgent medication needs only.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">What is considered an urgent prescription?</h2>
          <p className="mb-4 text-gray-600">
            An urgent prescription is one that you need more quickly than the standard 48-hour processing time. This might be because:
          </p>
          <ul className="list-disc ml-6 space-y-2 text-gray-600 mb-6">
            <li>You have run out or are about to run out of essential medication</li>
            <li>You need medication for an acute condition that requires immediate treatment</li>
            <li>You're traveling and need medication before departure</li>
            <li>A change in your health requires prompt medication adjustment</li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  The best way to avoid urgent requests is to order your repeat prescriptions at least 5-7 days before you're due to run out. Set reminders in your calendar or use the PHB app notification feature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Options for urgent prescriptions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-lg p-5 bg-gray-50">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Contact your GP practice</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Call your GP practice directly and explain that you need an urgent prescription. They may be able to arrange a same-day prescription.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Best for:</strong> Established repeat medications you've run out of
              </p>
            </div>

            <div className="border rounded-lg p-5 bg-gray-50">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Book an urgent appointment</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Book an on-the-day appointment with your GP or practice nurse. This can be done through the PHB app or by calling your practice.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Best for:</strong> New medications or when your condition needs review
              </p>
            </div>

            <div className="border rounded-lg p-5 bg-gray-50">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Ask your pharmacy</h3>
              </div>
              <p className="text-gray-600 mb-3">
                Pharmacists can provide emergency supplies of some medications without a prescription, particularly if you've had it prescribed before.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Best for:</strong> When your GP practice is closed or if you're away from home
              </p>
            </div>

            <div className="border rounded-lg p-5 bg-gray-50">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">PHB Urgent Care</h3>
              </div>
              <p className="text-gray-600 mb-3">
                If your GP practice is closed and you need urgent advice about medication, contact PHB Urgent Care online or by phone.
              </p>
              <p className="text-sm text-gray-500">
                <strong>Best for:</strong> Out-of-hours urgent medication needs
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-4">
            <h3 className="font-medium text-lg mb-3">Using the PHB app for urgent requests</h3>
            <p className="text-gray-600 mb-4">
              When submitting a prescription request through the PHB app, you can mark it as urgent:
            </p>
            <ol className="list-decimal ml-6 space-y-2 text-gray-600">
              <li>Follow the normal process to <Link to="/account/request-prescription" className="text-blue-600 hover:underline">request a prescription</Link></li>
              <li>In the additional information section, clearly state that this is an urgent request and why</li>
              <li>Include details about when you need the medication by</li>
              <li>Submit your request</li>
              <li>Follow up with a phone call to your GP practice to alert them to the urgent request</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Emergency supplies from pharmacies</h2>

          <p className="text-gray-600 mb-4">
            Pharmacists can provide emergency supplies of many prescription medications under certain conditions:
          </p>

          <div className="bg-gray-50 rounded-lg p-5 mb-6">
            <h3 className="font-medium text-lg mb-3">When a pharmacist can help</h3>
            <ul className="list-disc ml-6 space-y-2 text-gray-600">
              <li>You've been prescribed the medication before</li>
              <li>The pharmacist considers the medication necessary for your immediate treatment</li>
              <li>It's not practical to get a prescription from your GP without undue delay</li>
              <li>The medication isn't a controlled drug (with some exceptions for certain controlled drugs)</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="font-medium text-lg mb-3">What you'll need</h3>
            <ul className="list-disc ml-6 space-y-2 text-gray-600">
              <li>Identification</li>
              <li>Details of your regular medication (ideally, take your repeat prescription slip or medication packaging)</li>
              <li>Payment for the medication (unless you're exempt from prescription charges)</li>
              <li>Information about your GP or regular prescriber</li>
            </ul>
          </div>

          <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">
                  The pharmacist may only provide enough medication to last until you can get a prescription from your GP, typically just a few days' supply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Preventing urgent situations</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-5">
              <svg className="h-8 w-8 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-medium text-lg mb-2">Set medication reminders</h3>
              <p className="text-gray-600">
                Use the PHB app or your phone's calendar to set reminders to order prescriptions 7-10 days before you run out.
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <svg className="h-8 w-8 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-medium text-lg mb-2">Keep track of supplies</h3>
              <p className="text-gray-600">
                Regularly check how many days of medication you have left and order when you have 7-10 days remaining.
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <svg className="h-8 w-8 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="font-medium text-lg mb-2">Plan ahead for travel</h3>
              <p className="text-gray-600">
                If you're going away, request your prescription at least two weeks before your departure date.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Related help topics</h2>
        <ul className="space-y-2 text-blue-600">
          <li>
            <Link to="/help/prescriptions/how-to-request" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              How to request prescriptions online
            </Link>
          </li>
          <li>
            <Link to="/help/prescriptions/how-nominations-work" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              How prescription nominations work
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

export default UrgentRequestsPage;
