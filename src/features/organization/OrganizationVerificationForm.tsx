import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrganizationAuth } from './organizationAuthContext';

interface OrganizationVerificationFormProps {
  redirectPath?: string;
}

const OrganizationVerificationForm: React.FC<OrganizationVerificationFormProps> = ({ redirectPath = '/organization/dashboard' }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const { verify2FA, error, isLoading, clearError, currentEmail, getDashboardPath, needsVerification } = useOrganizationAuth();
  const navigate = useNavigate();

  // Force navigation directly to dashboard 
  const navigateToDashboard = useCallback(() => {
    const path = '/organization/dashboard';
    console.log('Force navigating to dashboard path:', path);
    window.location.href = path; // Use direct window location change for stronger navigation
  }, []);

  // Handle successful navigation after verification
  useEffect(() => {
    // Don't interfere with verification process
    if (needsVerification && currentEmail) {
      console.log('🔐 OTP verification page active for:', currentEmail);
      return; // Stay on verification page
    }

    // Only redirect if we're actually authenticated
    const authData = localStorage.getItem('organizationAuth');
    if (authData && !needsVerification) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed.userData && parsed.tokens) {
          console.log('🔐 Found valid auth data, redirecting to dashboard');
          setTimeout(() => {
            navigateToDashboard();
          }, 100);
        }
      } catch (e) {
        console.error('Error parsing auth data:', e);
      }
    }
  }, [needsVerification, currentEmail, navigateToDashboard]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentEmail) {
      console.error('No email found for verification');
      return;
    }
    
    try {
      // First clear any existing errors
      clearError();
      console.log('Submitting verification code for', currentEmail);
      
      // Perform the 2FA verification
      await verify2FA(currentEmail, verificationCode, rememberDevice);
      
      // Verification successful! The auth context has updated the state
      console.log('Verification successful, redirecting to dashboard');
      
      // Navigate to dashboard using React Router
      navigate(redirectPath || getDashboardPath());
      
      // If navigation doesn't work, force it as a fallback
      setTimeout(() => {
        if (window.location.pathname !== '/organization/dashboard') {
          window.location.href = '/organization/dashboard';
        }
      }, 500);
    } catch (err) {
      // Error is handled in the auth context
      console.error('2FA verification error:', err);
    }
  };

  // Don't render if we shouldn't be in verification mode
  if (!needsVerification || !currentEmail) {
    console.log('🔐 Verification form should not render:', { needsVerification, currentEmail });
    return null;
  }

  return (
    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Verification Required</h2>
      <p className="text-gray-600 mb-6">
        Please enter the verification code sent to your email address.
      </p>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="verification-code" className="block text-gray-700 font-medium mb-2">
            Verification Code
          </label>
          <input
            type="text"
            id="verification-code"
            value={verificationCode}
            onChange={(e) => { setVerificationCode(e.target.value); clearError(); }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter verification code"
            required
          />
        </div>

        <div className="flex items-center mb-6">
          <input
            id="remember-device"
            type="checkbox"
            checked={rememberDevice}
            onChange={(e) => setRememberDevice(e.target.checked)}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="remember-device" className="ml-2 block text-sm text-gray-700">
            Remember this device
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
};

export default OrganizationVerificationForm;
