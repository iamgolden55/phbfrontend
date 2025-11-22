import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/auth/authContext';
import { Navigate } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/config';

const SecuritySettingsPage: React.FC = () => {
  const { user, isAuthenticated, updateUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // OTP settings state
  const [otpRequiredForLogin, setOtpRequiredForLogin] = useState(false);

  useEffect(() => {
    if (user) {
      // Set initial state from user data
      setOtpRequiredForLogin(user.otp_required_for_login ?? true); // Default to true if undefined
    }
  }, [user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleOtpToggle = async () => {
    setSuccessMessage('');
    setErrorMessage('');
    setIsLoading(true);

    const newOtpSetting = !otpRequiredForLogin;

    try {
      // Update via API
      await updateUserProfile({
        otp_required_for_login: newOtpSetting
      });

      // Update local state
      setOtpRequiredForLogin(newOtpSetting);

      setSuccessMessage(
        newOtpSetting
          ? 'OTP verification enabled successfully. You will need to enter an OTP code when logging in.'
          : 'OTP verification disabled successfully. You can now login with just your email and password.'
      );

      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error: any) {
      console.error("Failed to update OTP settings:", error);
      setErrorMessage(error.message || 'Failed to update OTP settings');
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Security Settings</h1>
          <p className="text-xl font-medium">
            Manage your account security and login preferences
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md flex items-start">
              <svg className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md flex items-start">
              <svg className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Login Security</h2>
            <p className="text-gray-600">
              Configure how you want to secure your account during login
            </p>
          </div>

          {/* OTP Toggle Section */}
          <div className="border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <svg className="h-6 w-6 text-[#0891b2] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <h3 className="text-lg font-bold">One-Time Password (OTP) Verification</h3>
                </div>

                <p className="text-gray-700 mb-3">
                  {otpRequiredForLogin
                    ? 'OTP verification is currently enabled. You will receive a verification code via email each time you log in.'
                    : 'OTP verification is currently disabled. You can log in with just your email and password.'}
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
                  <div className="flex items-start">
                    <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">About OTP Verification:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Adds an extra layer of security to your account</li>
                        <li>Requires you to enter a code sent to your email during login</li>
                        <li>Recommended for enhanced account protection</li>
                        <li>Can be enabled or disabled at any time</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {!otpRequiredForLogin && (
                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-sm text-amber-800">
                        <span className="font-medium">Warning:</span> Disabling OTP verification makes your account less secure. We recommend keeping it enabled to protect your health information.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="ml-6 flex-shrink-0">
                <button
                  onClick={handleOtpToggle}
                  disabled={isLoading}
                  className={`relative inline-flex items-center h-10 rounded-full w-20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    otpRequiredForLogin
                      ? 'bg-[#0891b2]'
                      : 'bg-gray-300'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  aria-label={`OTP verification is ${otpRequiredForLogin ? 'enabled' : 'disabled'}`}
                >
                  <span
                    className={`inline-block h-8 w-8 transform rounded-full bg-white shadow-lg transition-transform ${
                      otpRequiredForLogin ? 'translate-x-11' : 'translate-x-1'
                    }`}
                  />
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
                </button>
                <p className="text-xs text-gray-600 mt-2 text-center">
                  {otpRequiredForLogin ? 'ON' : 'OFF'}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Security Information */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold mb-3">Additional Security Tips</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Use a strong, unique password for your PHB account</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Never share your password or OTP code with anyone</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Log out when using shared or public devices</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Regularly update your password from the Change Password page</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettingsPage;
