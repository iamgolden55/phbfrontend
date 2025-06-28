// src/components/womenshealth/WomensHealthGuard.tsx

import React, { useState, useEffect } from 'react';
import { womensHealthApi } from '../../services/womensHealthApi';
import { WomensHealthVerification } from './WomensHealthVerification';
import { AlertCircle, Loader } from 'lucide-react';

interface WomensHealthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  allowSkip?: boolean;
}

const WomensHealthGuard: React.FC<WomensHealthGuardProps> = ({
  children,
  fallback,
  allowSkip = false
}) => {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'required' | 'verified' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    checkVerificationStatus();
  }, [allowSkip]);

  const checkVerificationStatus = async () => {
    // Temporary bypass: always skip verification when allowSkip is true
    if (allowSkip) {
      console.log('Bypassing verification check due to allowSkip=true');
      setVerificationStatus('verified');
      return;
    }
    
    try {
      const response = await womensHealthApi.getVerificationStatus();
      if (response.success) {
        setVerificationStatus(response.status.verified ? 'verified' : 'required');
      } else {
        setVerificationStatus('error');
        setError('Failed to check verification status');
      }
    } catch (error: any) {
      console.error('Error checking verification status:', error);
      
      // If authentication error and allowSkip is true, skip verification
      if (allowSkip && (error.message?.includes('Authentication') || error.message?.includes('required'))) {
        console.log('Authentication error detected, skipping verification due to allowSkip=true');
        setVerificationStatus('verified');
        return;
      }
      
      setVerificationStatus('error');
      setError(error.response?.data?.message || 'Failed to check verification status');
    }
  };

  const handleVerificationComplete = () => {
    setVerificationStatus('verified');
  };

  const handleVerificationSkip = () => {
    if (allowSkip) {
      setVerificationStatus('verified');
    }
  };

  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader className="w-8 h-8 animate-spin text-pink-600 mx-auto" />
          <p className="text-gray-600">Checking verification status...</p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'error') {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Verification Check Failed
            </h2>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={checkVerificationStatus}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-lg font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    );
  }

  if (verificationStatus === 'required') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <WomensHealthVerification
          onVerificationComplete={handleVerificationComplete}
          onVerificationSkip={allowSkip ? handleVerificationSkip : undefined}
        />
      </div>
    );
  }

  return <>{children}</>;
};

export default WomensHealthGuard;