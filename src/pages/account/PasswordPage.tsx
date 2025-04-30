import React, { useState } from 'react';
import { useAuth } from '../../features/auth/authContext';
import { Navigate } from 'react-router-dom';

const PasswordPage: React.FC = () => {
  const { isAuthenticated, changePassword } = useAuth();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if user is typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // This is a mock implementation. In a real app, this would call an API
      // and the changePassword function would be implemented in the auth context
      if (typeof changePassword === 'function') {
        changePassword(formData.currentPassword, formData.newPassword);
      }

      setSuccessMessage('Password changed successfully');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrorMessage('Failed to change password. Please check your current password and try again.');

      // Clear error message after 3 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Change Password</h1>
          <p className="text-xl font-medium">
            Update your account password
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-xl mx-auto">
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-md">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.currentPassword ? 'border-red-500' : 'border-gray-300'
                  } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.currentPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
                )}
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.newPassword ? 'border-red-500' : 'border-gray-300'
                  } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.newPassword ? (
                  <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                ) : (
                  <p className="text-gray-500 text-sm mt-1">
                    Use at least 8 characters with a mix of letters, numbers, and symbols
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-[#005eb8] hover:bg-[#003f7e] text-white py-2 px-6 rounded-md transition-colors"
                >
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordPage;
