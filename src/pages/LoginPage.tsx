import React, { useEffect } from 'react';
import LoginForm from '../features/auth/LoginForm';
import OTPVerification from '../features/auth/OTPVerification';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/authContext';

const LoginPage: React.FC = () => {
  const { isAuthenticated, otpVerificationRequired, needsOnboarding } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users based on onboarding status
  useEffect(() => {
    if (isAuthenticated) {
      if (needsOnboarding) {
        navigate('/onboarding');
      } else {
        navigate('/account');
      }
    }
  }, [isAuthenticated, needsOnboarding, navigate]);

  // If already authenticated, handled by useEffect
  if (isAuthenticated) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="bg-gray-100">
      <div className="phb-container py-8">
        <div className="mb-6">
          <Link to="/" className="text-[#005eb8] hover:underline flex items-center">
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to homepage
          </Link>
        </div>

        <div className="mx-auto max-w-md">
          {otpVerificationRequired ? (
            <OTPVerification />
          ) : (
            <>
              <LoginForm />

              <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold mb-4">Why register with PHB?</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Book GP appointments online</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Order repeat prescriptions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>View your medical record securely</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Get personalized health information</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
