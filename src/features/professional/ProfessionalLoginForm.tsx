import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfessionalAuth } from './professionalAuthContext';

interface ProfessionalLoginFormProps {
  redirectPath?: string;
}

const ProfessionalLoginForm: React.FC<ProfessionalLoginFormProps> = ({ redirectPath = '/professional/dashboard' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading, clearError } = useProfessionalAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // Navigate to the specified redirect path after successful login
      navigate(redirectPath);
    } catch (err) {
      // Error is handled in the auth context
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Professional Healthcare Login</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
          <button
            className="float-right text-red-700"
            onClick={clearError}
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Professional Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="doctor@organization.org"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/professional/register" className="text-blue-600 hover:underline">
            Register as a Healthcare Professional
          </a>
        </p>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          For test accounts: <br />
          Doctor: doctor@phb.org / password123<br />
          Researcher: researcher@phb.org / password123<br />
          Nurse: nurse@phb.org / password123<br />
          Pharmacist: pharmacist@phb.org / password123
        </p>
      </div>
    </div>
  );
};

export default ProfessionalLoginForm;
