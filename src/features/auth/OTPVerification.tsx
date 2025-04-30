import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './authContext';

const OTPVerification: React.FC = () => {
  const { verifyOTP, otpError, clearError, isLoading, pendingEmail, login } = useAuth();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resendAttempting, setResendAttempting] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  // Focus on first input when component mounts
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Timer for OTP resend
  useEffect(() => {
    if (secondsLeft > 0 && !canResend) {
      const timer = setTimeout(() => setSecondsLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (secondsLeft === 0 && !canResend) {
      setCanResend(true);
    }
  }, [secondsLeft, canResend]);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      clearError();
      setResendMessage(null);

      // Move focus to next input if value exists
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }

      // Check if all digits are filled and submit automatically
      if (newOtp.every(digit => digit !== '')) {
        handleSubmit(newOtp.join(''));
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move focus to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (otpValue?: string) => {
    const otpToSubmit = otpValue || otp.join('');
    if (otpToSubmit.length === 6) {
      setResendMessage(null);
      await verifyOTP(otpToSubmit);
    }
  };

  const handleResendOTP = async () => {
    setResendMessage(null);
    clearError();
    setResendAttempting(true);
    
    try {
      // Since there's no resend endpoint, we'll attempt to trigger a new OTP by
      // re-logging in with the same email (if available)
      if (pendingEmail) {
        // Show message before attempting to trigger login again
        setResendMessage("Requesting a new verification code...");
        
        // Note: This assumes your login flow will send a new OTP if the user
        // attempts to log in again with the same email
        // We're just triggering the login flow again, not providing a password
        try {
          // For this to work, the login endpoint needs to be able to handle login
          // requests for users who already have a pending OTP verification
          await login(pendingEmail, "");
          setResendMessage("We've sent a new verification code to your email address.");
        } catch (err) {
          setResendMessage("We couldn't request a new code. Please return to login and try again.");
        }
      } else {
        setResendMessage("Please return to the login page and try again to receive a new code.");
      }
    } finally {
      setResendAttempting(false);
      setSecondsLeft(60);
      setCanResend(false);
      
      // Reset OTP input fields
      setOtp(Array(6).fill(''));
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedOTP = pastedData.replace(/\D/g, '').slice(0, 6).split('');

    if (pastedOTP.length) {
      const newOtp = [...otp];
      pastedOTP.forEach((digit, index) => {
        if (index < 6) {
          newOtp[index] = digit;
        }
      });
      setOtp(newOtp);
      clearError();
      setResendMessage(null);

      // Focus on the next empty input after pasting
      const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
      if (nextEmptyIndex !== -1 && inputRefs.current[nextEmptyIndex]) {
        inputRefs.current[nextEmptyIndex].focus();
      } else if (inputRefs.current[5]) {
        // If all inputs are filled, focus on the last one
        inputRefs.current[5].focus();
      }

      // Check if all digits are filled and submit automatically
      if (newOtp.every(digit => digit !== '')) {
        handleSubmit(newOtp.join(''));
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Verification Required</h2>
      <p className="mb-6 text-gray-600">
        For additional security, please enter the 6-digit code sent to your email.
      </p>

      {otpError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-red-700">{otpError}</p>
            </div>
          </div>
        </div>
      )}

      {resendMessage && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-blue-700">{resendMessage}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between space-x-2 mb-6" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            value={digit}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            maxLength={1}
            className="w-full h-14 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8]"
            inputMode="numeric"
            autoComplete="one-time-code"
          />
        ))}
      </div>

      <button
        onClick={() => handleSubmit()}
        className="w-full bg-[#005eb8] text-white py-3 px-4 rounded hover:bg-[#003f7e] transition-colors mb-4 disabled:opacity-50"
        disabled={otp.some(digit => digit === '') || isLoading}
      >
        {isLoading ? 'Verifying...' : 'Verify'}
      </button>

      <div className="text-center">
        <p className="text-gray-600 mb-2">
          Didn't receive a code?
        </p>
        {canResend ? (
          <button
            onClick={handleResendOTP}
            className="text-[#005eb8] hover:underline"
            disabled={isLoading || resendAttempting}
          >
            {resendAttempting ? 'Requesting...' : 'Request New Code'}
          </button>
        ) : (
          <p className="text-gray-500">
            Request new code in <span className="font-semibold">{secondsLeft}s</span>
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-gray-600">
          Having trouble? <button onClick={() => window.location.href='/login'} className="text-[#005eb8] hover:underline">Return to login</button>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
