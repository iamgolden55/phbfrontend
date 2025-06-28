import React from 'react';
import { Link } from 'react-router-dom';

interface WomensHealthHubProps {
  className?: string;
}

const WomensHealthHub: React.FC<WomensHealthHubProps> = ({ className = '' }) => {
  return (
    <div className={`bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-md border border-pink-200 ${className}`}>
      <div className="flex items-center mb-2">
        <div className="rounded-full bg-pink-100 p-2 mr-3">
          <svg className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h3 className="font-bold text-pink-800">Women's Health Hub</h3>
      </div>
      
      <p className="text-sm text-gray-700 mb-3">
        Track your reproductive health, pregnancy journey, and wellness goals
      </p>
      
      <div className="space-y-2">
        <Link 
          to="/account/womens-health" 
          className="text-pink-600 hover:text-pink-800 hover:underline text-sm font-medium flex items-center"
        >
          Access women's health dashboard
          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
        
        <div className="text-xs text-gray-600 flex items-center space-x-4">
          <span className="flex items-center">
            <div className="w-2 h-2 bg-pink-400 rounded-full mr-1"></div>
            Cycle tracking
          </span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-1"></div>
            Pregnancy care
          </span>
          <span className="flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
            Health goals
          </span>
        </div>
      </div>
    </div>
  );
};

export default WomensHealthHub;