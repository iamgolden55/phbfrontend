import React from 'react';
import { Link } from 'react-router-dom';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';

const NominatedPharmacyPage: React.FC = () => {
  return (
    <AccountHealthLayout title="Your Nominated Pharmacy">

      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-800">
                Your nominated pharmacy is where your electronic prescriptions will be sent. You can collect your medicine from this pharmacy without needing a paper prescription.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
              <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Coming Soon</h2>
            <p className="text-xl text-gray-600 mb-8">Pharmacy Nomination Service</p>
            
            <div className="max-w-2xl mx-auto bg-blue-50 border-l-4 border-blue-400 p-5 rounded-md mb-8 text-left">
              <h3 className="font-medium text-blue-800 mb-2">When available, this service will allow you to:</h3>
              <ul className="list-disc list-inside space-y-2 text-blue-700">
                <li>View your currently nominated pharmacy details</li>
                <li>Search for pharmacies by name, postcode, or town</li>
                <li>View nearby pharmacies with their opening hours</li>
                <li>Change your nominated pharmacy easily</li>
                <li>Receive confirmation when your nomination is updated</li>
              </ul>
            </div>
            
            <p className="text-gray-600 mb-6">
              We're working hard to bring you this feature. Please check back soon!
            </p>
            
            <Link 
              to="/account/prescriptions"
              className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Prescriptions
            </Link>
          </div>
        </div>
      </div>
    </AccountHealthLayout>
  );
};

export default NominatedPharmacyPage;
