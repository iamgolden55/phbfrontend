// src/components/womenshealth/WomensHealthVerification.tsx

import React, { useState, useEffect } from 'react';
import { womensHealthApi } from '../../services/womensHealthApi';
import { Button } from '@mui/material';
import { AlertCircle, Check, Shield, Clock, Mail } from 'lucide-react';

interface VerificationProps {
  onVerificationComplete: () => void;
  onVerificationSkip?: () => void;
}

export const WomensHealthVerification: React.FC<VerificationProps> = ({
  onVerificationComplete,
  onVerificationSkip
}) => {
  const [step, setStep] = useState<'initial' | 'otp-sent' | 'verifying' | 'verified'>('initial');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    checkVerificationStatus();
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const checkVerificationStatus = async () => {
    try {
      const response = await womensHealthApi.getVerificationStatus();
      if (response.success && response.status.verified) {
        setStep('verified');
        onVerificationComplete();
      } else if (response.status.has_pending_otp) {
        setStep('otp-sent');
        if (response.status.otp_expires_at) {
          const expiryTime = new Date(response.status.otp_expires_at).getTime();
          const now = new Date().getTime();
          const remaining = Math.max(0, Math.floor((expiryTime - now) / 1000));
          setTimeLeft(remaining);
        }
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
    }
  };

  const handleRequestVerification = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await womensHealthApi.requestVerification();
      if (response.success) {
        setStep('otp-sent');
        setTimeLeft(300); // 5 minutes
      } else {
        setError(response.message || 'Failed to send verification code');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await womensHealthApi.verifyOTP(otp);
      if (response.success && response.verified) {
        setStep('verified');
        setTimeout(() => {
          onVerificationComplete();
        }, 1000);
      } else {
        setError(response.message || 'Invalid verification code');
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderInitialStep = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
        <Shield className="w-8 h-8 text-pink-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Secure Your Women's Health Data
        </h2>
        <p className="text-gray-600">
          To access your women's health features, we need to verify your identity. 
          This ensures your sensitive health information remains secure and private.
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg text-left">
        <h3 className="font-semibold text-blue-900 mb-2">What you'll get access to:</h3>
        <ul className="space-y-1 text-blue-800">
          <li>• Menstrual cycle tracking and predictions</li>
          <li>• Fertility and ovulation monitoring</li>
          <li>• Pregnancy journey tracking</li>
          <li>• Health goals and wellness insights</li>
          <li>• Screening reminders and health records</li>
        </ul>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-3">
        <Button
          onClick={handleRequestVerification}
          disabled={loading}
          variant="contained"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3"
        >
          {loading ? 'Sending verification code...' : 'Verify My Identity'}
        </Button>

        {onVerificationSkip && (
          <Button
            onClick={onVerificationSkip}
            variant="text"
            className="w-full text-gray-600 hover:text-gray-800"
          >
            Skip for now
          </Button>
        )}
      </div>
    </div>
  );

  const renderOtpStep = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Mail className="w-8 h-8 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Check Your Email
        </h2>
        <p className="text-gray-600">
          We've sent a 6-digit verification code to your email address. 
          Enter it below to verify your identity.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter 6-digit code"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-lg font-mono tracking-widest focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            maxLength={6}
          />
        </div>

        {timeLeft > 0 && (
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Code expires in {formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2 text-red-700">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-3">
        <Button
          onClick={handleVerifyOTP}
          disabled={loading || otp.length !== 6}
          variant="contained"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3"
        >
          {loading ? 'Verifying...' : 'Verify Code'}
        </Button>

        <Button
          onClick={handleRequestVerification}
          disabled={loading || timeLeft > 0}
          variant="text"
          className="w-full text-gray-600 hover:text-gray-800"
        >
          {timeLeft > 0 ? `Resend code in ${formatTime(timeLeft)}` : 'Resend code'}
        </Button>
      </div>
    </div>
  );

  const renderVerifiedStep = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Verification Complete!
        </h2>
        <p className="text-gray-600">
          Your identity has been verified. You now have secure access to your women's health features.
        </p>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-green-800 font-medium">
          Welcome to your personalized women's health journey!
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      {step === 'initial' && renderInitialStep()}
      {step === 'otp-sent' && renderOtpStep()}
      {(step === 'verified' || step === 'verifying') && renderVerifiedStep()}
    </div>
  );
};