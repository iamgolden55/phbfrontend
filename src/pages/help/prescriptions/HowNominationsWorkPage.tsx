import React from 'react';
import { Link } from 'react-router-dom';

const HowNominationsWorkPage: React.FC = () => {
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
                <span className="ml-1 text-gray-500 md:ml-2">How Pharmacy Nominations Work</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">How Pharmacy Nominations Work</h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              Pharmacy nominations allow you to choose which pharmacy will receive your electronic prescriptions automatically. This helps streamline the prescription process and makes it more convenient to collect your medications.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">What is a nominated pharmacy?</h2>

          <p className="text-gray-600 mb-4">
            Your nominated pharmacy is the pharmacy you've chosen to receive and dispense your electronic prescriptions. When your GP issues an electronic prescription, it's sent directly to your nominated pharmacy via the Electronic Prescription Service (EPS).
          </p>

          <div className="bg-gray-50 rounded-lg p-5">
            <h3 className="font-medium text-lg mb-3">Key benefits</h3>
            <ul className="space-y-3">
              <li className="flex">
                <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-gray-600">No need to collect a paper prescription from your GP</span>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-gray-600">Your pharmacy can prepare your prescription before you arrive</span>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-gray-600">Reduced risk of lost prescriptions</span>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-gray-600">More efficient repeat prescription process</span>
              </li>
              <li className="flex">
                <svg className="h-6 w-6 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-gray-600">Option to have medications delivered by some pharmacies</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">How the nomination process works</h2>

          <div className="relative overflow-hidden pb-56 mb-6">
            <div className="bg-gray-100 rounded-lg p-4 h-full">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-blue-100 p-3 mb-3">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-center font-medium mb-1">1. Prescription Created</p>
                <p className="text-center text-sm text-gray-600">Your doctor creates an electronic prescription</p>
                <div className="my-4 bg-white h-8 w-1 rounded-full"></div>
                <div className="rounded-full bg-blue-100 p-3 mb-3">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                </div>
                <p className="text-center font-medium mb-1">2. Electronic Transmission</p>
                <p className="text-center text-sm text-gray-600">The prescription is sent to your nominated pharmacy</p>
                <div className="my-4 bg-white h-8 w-1 rounded-full"></div>
                <div className="rounded-full bg-blue-100 p-3 mb-3">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p className="text-center font-medium mb-1">3. Preparation at Pharmacy</p>
                <p className="text-center text-sm text-gray-600">Your pharmacy prepares your medication</p>
                <div className="my-4 bg-white h-8 w-1 rounded-full"></div>
                <div className="rounded-full bg-blue-100 p-3 mb-3">
                  <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <p className="text-center font-medium mb-1">4. Collection</p>
                <p className="text-center text-sm text-gray-600">You collect your medication from your nominated pharmacy</p>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-5">
            When your GP prescribes medication, the electronic prescription is securely transmitted through the EPS to your nominated pharmacy. The pharmacy receives the prescription electronically and can prepare your medication before you arrive.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-5">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  You do not need to nominate a pharmacy to use the Electronic Prescription Service. If you prefer, your GP can still provide a paper prescription with a barcode that can be taken to any pharmacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Setting or changing your nominated pharmacy</h2>

          <p className="text-gray-600 mb-5">
            You can set or change your nominated pharmacy at any time. There are several ways to do this:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-lg p-5">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Through the PHB website or app</h3>
              </div>
              <p className="text-gray-600 mb-2">
                The easiest way to set or change your nominated pharmacy is through your PHB account online or in the app.
              </p>
              <Link to="/account/nominated-pharmacy" className="text-blue-600 hover:underline text-sm font-medium inline-flex items-center">
                <span>Manage your nominated pharmacy</span>
                <svg className="w-3.5 h-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="border rounded-lg p-5">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">At your pharmacy</h3>
              </div>
              <p className="text-gray-600">
                Visit any pharmacy and ask them to set up or change your nomination. They'll need some identification and will update your preferences on the system.
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Through your GP practice</h3>
              </div>
              <p className="text-gray-600">
                Contact your GP practice and ask them to update your pharmacy nomination preferences.
              </p>
            </div>

            <div className="border rounded-lg p-5">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">By phone</h3>
              </div>
              <p className="text-gray-600">
                Call the PHB Help Centre at 0800 123 4567 (8am-8pm, 7 days a week) and our team can update your nomination for you.
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">
                  You can change your nominated pharmacy at any time. Your new nomination will take effect for your next prescription.
                </p>
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
              <h3 className="font-medium text-lg text-gray-900">Can I have more than one nominated pharmacy?</h3>
              <p className="text-gray-600 mt-1">
                No, you can only have one nominated pharmacy at a time for your prescriptions. However, you can change your nomination whenever you need to.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900">What if I don't want to nominate a pharmacy?</h3>
              <p className="text-gray-600 mt-1">
                Nomination is optional. If you prefer not to use this service, your GP can still give you a paper prescription with a barcode that you can take to any pharmacy.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900">What if my nominated pharmacy doesn't have my medication in stock?</h3>
              <p className="text-gray-600 mt-1">
                If your nominated pharmacy doesn't have your medication, they can either order it for you (usually arriving the next working day) or they can cancel the electronic prescription so you can take it to another pharmacy.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900">Is my prescription information secure?</h3>
              <p className="text-gray-600 mt-1">
                Yes, electronic prescriptions are transmitted securely through the NHS Electronic Prescription Service. The system meets strict security standards to ensure your data is protected.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900">Can I use a pharmacy that's not my nominated pharmacy?</h3>
              <p className="text-gray-600 mt-1">
                If you want to use a different pharmacy, you have two options: you can change your nomination before your prescription is issued, or you can ask your GP for a paper prescription with a barcode that you can take to any pharmacy.
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
            <Link to="/help/prescriptions/urgent-requests" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Urgent prescription requests
            </Link>
          </li>
          <li>
            <Link to="/account/nominated-pharmacy" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Change your nominated pharmacy
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HowNominationsWorkPage;
