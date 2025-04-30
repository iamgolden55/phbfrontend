import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/authContext';

const TestPage: React.FC = () => {
  const { login, createTestUser, isAuthenticated, user, verifyOTP, otpVerification, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      // Use the sample user credentials
      await login('john@example.com', 'password');
      // If OTP verification is required, automatically enter the OTP
      if (otpVerification) {
        await verifyOTP('123456');
      }
      setIsLoading(false);
      // Navigate to appointments page after login
      navigate('/account/appointments');
    } catch (error) {
      console.error('Auto-login failed:', error);
      setIsLoading(false);
    }
  };

  const handleCreateTestUser = () => {
    createTestUser();
    navigate('/account/appointments');
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Test Page</h1>

      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Authentication Status</h2>
        <p className="mb-2">
          <strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}
        </p>
        {user && (
          <div className="mb-4 p-3 bg-gray-200 rounded">
            <p><strong>User ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Completed Onboarding:</strong> {user.completedOnboarding ? 'Yes' : 'No'}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-4">
          {!isAuthenticated ? (
            <>
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Auto Login as John'}
              </button>

              <button
                onClick={handleCreateTestUser}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Create & Login as Test User
              </button>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Test Pages</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/account/appointments" className="text-blue-600 hover:underline">
                Appointments Page
              </Link>
            </li>
            <li>
              <Link to="/account/test-results" className="text-blue-600 hover:underline">
                Test Results Page
              </Link>
            </li>
            <li>
              <Link to="/account/appointments/book" className="text-blue-600 hover:underline">
                Book Appointment
              </Link>
            </li>
            <li>
              <Link to="/account/appointments/view" className="text-blue-600 hover:underline">
                View Appointments
              </Link>
            </li>
          </ul>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="text-xl font-bold mb-4">Other Test Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/test-onboarding" className="text-blue-600 hover:underline">
                Test Onboarding Flow
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-blue-600 hover:underline">
                Login Page
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-blue-600 hover:underline">
                Register Page
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
