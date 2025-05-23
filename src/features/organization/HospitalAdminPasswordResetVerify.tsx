import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useOrganizationAuth } from './organizationAuthContext';

const HospitalAdminPasswordResetVerify: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [hospitalCode, setHospitalCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyPasswordReset, error: contextError, clearError } = useOrganizationAuth();

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get('token');
    const emailParam = params.get('email');
    
    if (tokenParam) setToken(tokenParam);
    if (emailParam) setEmail(emailParam);
    
    // Set initial expiration timer (30 minutes)
    setTimeRemaining(30 * 60);
  }, [location]);

  // Countdown timer
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;
    
    const intervalId = setInterval(() => {
      setTimeRemaining(prev => prev !== null ? prev - 1 : null);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [timeRemaining]);

  // Format remaining time as mm:ss
  const formatTimeRemaining = () => {
    if (timeRemaining === null) return '--:--';
    
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await verifyPasswordReset(token, verificationCode, email, hospitalCode || undefined);
      
      if (result.success) {
        setSuccessMessage(result.message);
        
        // Redirect to password reset completion page
        if (result.token && result.secondary_token) {
          navigate(`/hospital-admin/reset-password/complete?token=${result.token}&secondary_token=${result.secondary_token}&email=${encodeURIComponent(email)}`);
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
      <h2 className="text-2xl font-bold mb-6">Verify Password Reset Request</h2>

      {(error || contextError) && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-red-700">{error || contextError}</p>
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

      <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-blue-700 font-medium">Verification Code Sent</p>
            <p className="text-blue-600">A verification code has been sent to {email ? email.replace(/(.{2})(.*)(@.*)/, '$1****$3') : 'your email'}.</p>
            <p className="text-blue-600">Time remaining: <span className="font-mono font-bold">{formatTimeRemaining()}</span></p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="verification-code" className="block font-medium mb-1">
            Verification Code
          </label>
          <p className="text-gray-600 text-sm mb-2">
            Enter the 6-digit verification code sent to your email.
          </p>
          <input
            type="text"
            id="verification-code"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={verificationCode}
            onChange={(e) => { setVerificationCode(e.target.value); clearError(); }}
            placeholder="6-digit code"
            required
            pattern="[0-9]{6}"
            inputMode="numeric"
            maxLength={6}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="hospital-code" className="block font-medium mb-1">
            Hospital Code <span className="text-gray-500 text-sm">(optional, may be required)</span>
          </label>
          <input
            type="text"
            id="hospital-code"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={hospitalCode}
            onChange={(e) => { setHospitalCode(e.target.value); clearError(); }}
            placeholder="H-XXXXXXXX"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          disabled={isLoading || timeRemaining === 0}
        >
          {isLoading ? 'Verifying...' : 'Verify Code'}
        </button>
        
        <div className="mt-4 text-center">
          <button 
            type="button" 
            className="text-blue-600 hover:underline text-sm"
            onClick={() => navigate('/hospital-admin/reset-password/request')}
          >
            Resend verification code
          </button>
        </div>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-gray-600">
          Remember your password?{' '}
          <Link to="/organization/login" className="text-blue-600 hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HospitalAdminPasswordResetVerify;
