import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const MealPlansPage: React.FC = () => {
  return (
    <div className="bg-white">
        {/* Header */}
        <div className="bg-[#0891b2] text-white py-8">
          <div className="phb-container">
            <h1 className="text-3xl font-bold mb-4">Personalized Meal Plans</h1>
            <Breadcrumbs 
              customItems={[
                { label: 'Home', path: '/' },
                { label: 'Live Well', path: '/live-well' },
                { label: 'Healthy Eating', path: '/live-well/healthy-eating' },
                { label: 'Meal Plans', path: '/live-well/healthy-eating/meal-plans' }
              ]} 
            />
          </div>
        </div>

        <div className="phb-container py-8">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
                <svg className="h-10 w-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Coming Soon</h2>
              <p className="text-xl text-gray-600 mb-8">Personalized Meal Planning</p>
              
              <div className="max-w-2xl mx-auto bg-blue-50 border-l-4 border-blue-400 p-5 rounded-md mb-8 text-left">
                <h3 className="font-medium text-blue-800 mb-2">When available, this service will allow you to:</h3>
                <ul className="list-disc list-inside space-y-2 text-blue-700">
                  <li>Create personalized meal plans based on your health goals</li>
                  <li>Set your weight, activity level, and dietary preferences</li>
                  <li>Choose meal plan duration (1-4 weeks)</li>
                  <li>Generate balanced meal suggestions with nutritional information</li>
                  <li>Access shopping lists for your meal plans</li>
                  <li>Save favorite meal plans for future reference</li>
                </ul>
              </div>
              
              <p className="text-gray-600 mb-6">
                We're working hard to bring you this feature. Please check back soon!
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left max-w-2xl mx-auto">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      All health information provided is for reading and educational purposes only. If you take any action based on this information, including dietary changes, PHB shall not be held liable. Always consult with a qualified healthcare professional before making health-related decisions.
                    </p>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/live-well/healthy-eating"
                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Return to Healthy Eating
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MealPlansPage;
