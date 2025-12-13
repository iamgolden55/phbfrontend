import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useOrganizationAuth } from './organizationAuthContext';
import OrganizationVerificationForm from './OrganizationVerificationForm';
import AuthDebugInfo from './AuthDebugInfo';

interface OrganizationLoginFormProps {
  redirectPath?: string;
}

const OrganizationLoginForm: React.FC<OrganizationLoginFormProps> = ({ redirectPath }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hospitalCode, setHospitalCode] = useState('');
  const { login, error, isLoading, clearError, needsVerification, getDashboardPath } = useOrganizationAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Submitting login form...');
      await login(email, password, hospitalCode);
      
      // The login function in auth context already sets needsVerification state
      // Component will re-render automatically to show verification form
      console.log('Login successful, verification form should appear');
    } catch (err) {
      console.error('Login error:', err);
      // Error is handled in the auth context
    }
  };

  // Show verification form when needed
  if (needsVerification) {
    return (
      <>
        <OrganizationVerificationForm redirectPath={redirectPath} />
      </>
    );
  }

  return (
    <>
      
      <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Organization Sign In</h2>

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
          <label htmlFor="organization-email" className="block text-gray-700 font-medium mb-2">
            Organization Email
          </label>
          <input
            type="email"
            id="organization-email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearError(); }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="organization@example.com"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="hospital-code" className="block text-gray-700 font-medium mb-2">
            Hospital Code
          </label>
          <input
            type="text"
            id="hospital-code"
            value={hospitalCode}
            onChange={(e) => { setHospitalCode(e.target.value); clearError(); }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. NGH-001"
            required
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between">
            <label htmlFor="organization-password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <Link to="/hospital-admin/reset-password/request" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
          <input
            type="password"
            id="organization-password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); clearError(); }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Need an account?{' '}
          <a href="/organization/register" className="text-blue-600 hover:underline">
            Register your organization
          </a>
        </p>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600"> For more information on how to access your organization/hospitals dashboard, please contact support if you find any issues assessing your account.</p>
      </div>
    </div>
    </>
  );
};

export default OrganizationLoginForm; 