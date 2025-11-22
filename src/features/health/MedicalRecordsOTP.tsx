import React, { useState } from 'react';
import medicalRecordsService from './medicalRecordsService';

interface MedicalRecordsOTPProps {
  onVerificationSuccess: () => void;
  onCancel: () => void;
}

const MedicalRecordsOTP: React.FC<MedicalRecordsOTPProps> = ({
  onVerificationSuccess,
  onCancel
}) => {
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpMessage, setOtpMessage] = useState('');

  const handleRequestOTP = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Requesting medical record OTP');
      const result = await medicalRecordsService.requestMedicalRecordsOtp();
      console.log('OTP request result:', result);
      
      if (result.status === 'success') {
        setOtpMessage(result.message || 'Verification code sent to your email address');
        setStep('verify');
      } else {
        setError(result.message || 'Failed to request verification code');
      }
    } catch (err) {
      console.error('Unexpected error requesting OTP:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      setError('Please enter the verification code');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Verifying OTP:', otp);
      const result = await medicalRecordsService.verifyMedicalRecordsOtp(otp);
      console.log('OTP verification result:', result);
      
      if (result.status === 'success') {
        onVerificationSuccess();
      } else {
        setError(result.message || 'Invalid verification code');
      }
    } catch (err) {
      console.error('Unexpected error verifying OTP:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Secure Access Required</h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-md">
        <p className="text-blue-800">
          Medical records contain sensitive information and require additional verification.
        </p>
      </div>
      
      {step === 'request' ? (
        <div>
          <p className="mb-6">
            To protect your privacy, we need to verify your identity before showing your medical records.
            We'll send a verification code to your registered email address.
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <div className="flex justify-between">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleRequestOTP}
              disabled={isLoading}
              className="px-4 py-2 bg-[#0891b2] text-white rounded-md hover:bg-[#0e7490] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Request Verification Code'}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-4">
            {otpMessage || 'Please enter the verification code sent to your email.'}
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleVerifyOTP}>
            <div className="mb-4">
              <label htmlFor="otp" className="block text-gray-700 font-medium mb-2">
                Verification Code
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
                autoFocus
              />
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep('request')}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                disabled={isLoading}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="px-4 py-2 bg-[#0891b2] text-white rounded-md hover:bg-[#0e7490] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordsOTP; 