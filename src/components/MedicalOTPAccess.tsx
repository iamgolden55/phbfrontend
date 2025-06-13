import React, { useState } from 'react';
import { Shield, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { createApiUrl } from '../utils/config';

interface MedicalOTPProps {
  onAccessGranted: () => void;
}

const MedicalOTPAccess: React.FC<MedicalOTPProps> = ({ onAccessGranted }) => {
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRequestOTP = async () => {
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('phb_auth_token') ||  
                   localStorage.getItem('access_token') || 
                   localStorage.getItem('authToken');

      const response = await fetch(createApiUrl('api/patient/medical-record/request-otp/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Medical record access code sent to your email. Please check your inbox.');
        setStep('verify');
      } else {
        setError(result.error || 'Failed to request access code. Please try again.');
      }
    } catch (error) {
      setError('Failed to request access code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp.trim()) {
      setError('Please enter the access code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('phb_auth_token') ||  
                   localStorage.getItem('access_token') || 
                   localStorage.getItem('authToken');

      const response = await fetch(createApiUrl('api/patient/medical-record/verify-otp/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ otp }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store the medical access token and expiry time
        const expiryTime = Date.now() + (result.expires_in * 1000); // Convert seconds to milliseconds
        
        localStorage.setItem('med_access_token', result.med_access_token);
        localStorage.setItem('med_access_expiry', expiryTime.toString());
        
        // Also store the PHB token for secure file uploads
        localStorage.setItem('phb_auth_token', token);
        
        setMessage('Access granted successfully!');
        setTimeout(() => {
          onAccessGranted();
        }, 1000);
      } else {
        setError(result.error || 'Invalid access code. Please try again.');
      }
    } catch (error) {
      setError('Failed to verify access code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (step === 'request') {
        handleRequestOTP();
      } else {
        handleVerifyOTP();
      }
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Secure Medical Records Access
          </h1>
          <p className="text-gray-600 text-sm">
            Your medical records are protected with additional security
          </p>
        </div>

        {step === 'request' ? (
          /* Step 1: Request OTP */
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Request Access Code</h2>
            </div>
            
            <p className="text-gray-600 mb-6 text-sm">
              To access your medical records, we'll send a secure access code to your registered email address.
            </p>

            {message && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-green-800 text-sm">{message}</span>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0" />
                <span className="text-red-800 text-sm">{error}</span>
              </div>
            )}

            <button
              onClick={handleRequestOTP}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <Mail className="h-4 w-4 mr-2" />
              )}
              {isLoading ? 'Sending...' : 'Send Access Code'}
            </button>
          </div>
        ) : (
          /* Step 2: Verify OTP */
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <Lock className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Enter Access Code</h2>
            </div>
            
            <p className="text-gray-600 mb-6 text-sm">
              Please enter the 6-digit access code sent to your email.
            </p>

            {message && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                <span className="text-green-800 text-sm">{message}</span>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="h-4 w-4 text-red-600 mr-2 flex-shrink-0" />
                <span className="text-red-800 text-sm">{error}</span>
              </div>
            )}

            <div className="mb-6">
              <input
                type="text"
                value={otp}
                onChange={handleOTPChange}
                onKeyPress={handleKeyPress}
                placeholder="000000"
                className="w-full px-4 py-3 text-center text-2xl font-mono tracking-widest border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={6}
                autoComplete="one-time-code"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={handleVerifyOTP}
                disabled={isLoading || otp.length !== 6}
                className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Lock className="h-4 w-4 mr-2" />
                )}
                {isLoading ? 'Verifying...' : 'Verify Access'}
              </button>

              <button
                onClick={() => {
                  setStep('request');
                  setOtp('');
                  setError('');
                  setMessage('');
                }}
                className="w-full py-2 px-4 text-gray-600 font-medium rounded-lg hover:bg-gray-100"
              >
                Send New Code
              </button>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center mb-2">
            <Shield className="h-4 w-4 text-gray-600 mr-2" />
            <span className="text-sm font-medium text-gray-900">Security Notice</span>
          </div>
          <p className="text-xs text-gray-600">
            Your medical records are protected with end-to-end encryption and require multi-factor authentication for access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicalOTPAccess;