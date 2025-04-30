import React from 'react';
import { Link } from 'react-router-dom';
import ResetPasswordForm from '../features/auth/ResetPasswordForm';

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <div className="phb-container py-8">
        <div className="mb-6">
          <Link to="/login" className="text-[#005eb8] hover:underline flex items-center">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to login
          </Link>
        </div>

        <div className="mx-auto max-w-md">
          <ResetPasswordForm />
          
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold mb-4">Password security tips</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Use at least 8 characters, including uppercase, lowercase, numbers and symbols</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Don't reuse passwords across multiple sites</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Consider using a password manager for greater security</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 