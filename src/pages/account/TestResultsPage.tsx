import React from 'react';
import { Link } from 'react-router-dom';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';

const TestResultsPage: React.FC = () => {
  return (
    <AccountHealthLayout title="Test Results">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Your Test Results</h2>

        <div className="mb-6">
          <p className="text-gray-700">
            View your test results from blood tests, scans, and other medical procedures. Results are added to your PHB account after being reviewed by your healthcare provider.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
              <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Coming Soon</h2>
            <p className="text-xl text-gray-600 mb-8">Test Results Viewer</p>
            
            <div className="max-w-2xl mx-auto bg-blue-50 border-l-4 border-blue-400 p-5 rounded-md mb-8 text-left">
              <h3 className="font-medium text-blue-800 mb-2">When available, this service will allow you to:</h3>
              <ul className="list-disc list-inside space-y-2 text-blue-700">
                <li>View all your medical test results in one place</li>
                <li>Search for specific tests by name or date</li>
                <li>See detailed information about each test result</li>
                <li>Track changes in your results over time</li>
                <li>Receive notifications when new results are available</li>
                <li>Download or share your results with other healthcare providers</li>
              </ul>
            </div>
            
            <p className="text-gray-600 mb-6">
              We're working hard to bring you this feature. Please check back soon!
            </p>
            
            <Link 
              to="/account/health-records"
              className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Return to Health Records
            </Link>
          </div>
        </div>

        {/* Sample test result cards for visual context */}
        <div className="opacity-50 pointer-events-none">
          <h3 className="text-xl font-semibold mb-4">Recent Test Results</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Blood Test - Full Blood Count</h4>
                    <p className="text-sm text-gray-500">Date: 15 May 2023</p>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Normal</span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">Requested by: Dr. Sarah Johnson</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AccountHealthLayout>
  );
};

export default TestResultsPage;
