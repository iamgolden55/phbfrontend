import React, { useState, useEffect } from 'react';
import { useAuth } from './authContext';
import { Link } from 'react-router-dom';
import './captchaStyles.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const {
    login,
    isLoading,
    error,
    clearError,
    captchaRequired,
    captchaChallenge,
    captchaToken
  } = useAuth();
  
  // Reset captcha answer when captchaRequired changes to false
  useEffect(() => {
    if (!captchaRequired) {
      setCaptchaAnswer('');
    }
  }, [captchaRequired]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaRequired) {
      await login(email, password, captchaToken, captchaAnswer, rememberMe);
    } else {
      await login(email, password, undefined, undefined, rememberMe);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Sign in to your PHB account</h2>

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
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8]"
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearError(); }}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <Link to="/forgot-password" className="text-sm text-[#005eb8] hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8]"
            value={password}
            onChange={(e) => { setPassword(e.target.value); clearError(); }}
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Remember Me checkbox */}
        <div className="mb-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="rememberMe"
              className="w-4 h-4 text-[#005eb8] border-gray-300 rounded focus:ring-2 focus:ring-[#005eb8]"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-700">
              Remember me for 30 days
            </span>
          </label>
        </div>

        {/* CAPTCHA challenge section */}
        {captchaRequired && (
          <div className="captcha-container mb-6">
            <div className="captcha-challenge">
              <h4 className="text-lg font-medium mb-2">Security Check</h4>
              <p className="text-gray-800 text-lg font-medium">{captchaChallenge}</p>
            </div>
            <div className="mt-3">
              <label htmlFor="captcha-answer" className="block font-medium mb-1">
                Answer
              </label>
              <input
                type="text"
                id="captcha-answer"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#005eb8]"
                value={captchaAnswer}
                onChange={(e) => { setCaptchaAnswer(e.target.value); clearError(); }}
                placeholder="Enter your answer"
                required
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#005eb8] text-white py-2 px-4 rounded hover:bg-[#003f7e] transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : captchaRequired ? 'Verify & Sign in' : 'Sign in'}
        </button>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-200 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#005eb8] hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
