import React, { useEffect } from 'react';
import RegisterForm from '../features/auth/RegisterForm';
import OTPVerification from '../features/auth/OTPVerification';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/authContext';

const RegisterPage: React.FC = () => {
  const { isAuthenticated, otpVerification, isNewUser, needsOnboarding } = useAuth();
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

        <div className="mx-auto max-w-lg">
          {otpVerification ? (
            <OTPVerification />
          ) : (
            <>
              <RegisterForm />

              <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-bold mb-4">Important Information</h2>
                <div className="space-y-4 text-sm">
                  <p>
                    Your personal information will be handled in accordance with our privacy policy and data protection laws.
                  </p>
                  <p>
                    To use certain PHB services, you may need to verify your identity by providing additional information
                    at a later stage.
                  </p>
                  <p>
                    If you're registering on behalf of someone else, you must have their consent or legal authority to do so.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
