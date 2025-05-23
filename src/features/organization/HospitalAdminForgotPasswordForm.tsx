import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOrganizationAuth } from './organizationAuthContext';

const HospitalAdminForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [hospitalCode, setHospitalCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [expiresIn, setExpiresIn] = useState<number | null>(null);
  const navigate = useNavigate();
  
  const { requestPasswordReset, error: contextError, clearError } = useOrganizationAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await requestPasswordReset(email, hospitalCode);
      
      if (result.success) {
        setResetToken(result.token || null);
        setExpiresIn(result.expires_in || null);
        setSuccessMessage(result.message);
        
        // Redirect to verification page with token and email
        if (result.token) {
          navigate(`/hospital-admin/reset-password/verify?token=${result.token}&email=${encodeURIComponent(email)}`);
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Reset Your Hospital Admin Password</h2>

      {contextError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-red-700">{contextError}</p>
            </div>
          </div>
        </div>
      )}

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

      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-green-700">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="email" className="block font-medium mb-1">
            Admin Email
          </label>
          <p className="text-gray-600 text-sm mb-2">
            Enter your admin email address associated with your hospital.
          </p>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearError(); }}
            placeholder="admin.hospitalname@example.com"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="hospital-code" className="block font-medium mb-1">
            Hospital Registration Code
          </label>
          <p className="text-gray-600 text-sm mb-2">
            Enter your hospital registration code (e.g., H-XXXXXXXX).
          </p>
          <input
            type="text"
            id="hospital-code"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={hospitalCode}
            onChange={(e) => { setHospitalCode(e.target.value); clearError(); }}
            placeholder="H-XXXXXXXX"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Request Password Reset'}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-gray-600">
          Remember your password?{' '}
          <Link to="/organization/login" className="text-blue-600 hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>

      <div className="mt-6">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-600">
              For security reasons, verification instructions will be sent to the email address registered with your hospital admin account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalAdminForgotPasswordForm;
