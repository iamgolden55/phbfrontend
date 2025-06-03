import React from 'react';
import { Link } from 'react-router-dom';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';

const RequestPrescriptionPage: React.FC = () => {
  return (
    <AccountHealthLayout title="Request a Repeat Prescription">

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="text-center py-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
            <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Coming Soon</h2>
          <p className="text-xl text-gray-600 mb-8">Repeat Prescription Service</p>
          
          <div className="max-w-2xl mx-auto bg-blue-50 border-l-4 border-blue-400 p-5 rounded-md mb-8 text-left">
            <h3 className="font-medium text-blue-800 mb-2">When available, this service will allow you to:</h3>
            <ul className="list-disc list-inside space-y-2 text-blue-700">
              <li>Request repeat prescriptions for your current medications</li>
              <li>Select from your list of approved repeat medications</li>
              <li>Add additional information for your doctor</li>
              <li>Track the status of your prescription request</li>
              <li>Receive notifications when your prescription is ready for collection</li>
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
    </AccountHealthLayout>
  );
};

export default RequestPrescriptionPage;
