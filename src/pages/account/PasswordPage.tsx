import React, { useState } from 'react';
import { useAuth } from '../../features/auth/authContext';
import { Navigate } from 'react-router-dom';

const PasswordPage: React.FC = () => {
  const { isAuthenticated, changePassword, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await changePassword(
        formData.currentPassword,
        formData.newPassword,
        formData.confirmPassword
      );

      if (result.success) {
        setSuccessMessage(result.message);
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      } else {
        setErrorMessage(result.message);
        
        // Set field-specific errors if the API response indicates them
        if (result.message.toLowerCase().includes('current password')) {
          setErrors(prev => ({ ...prev, currentPassword: result.message }));
        } else if (result.message.toLowerCase().includes('new password')) {
          setErrors(prev => ({ ...prev, newPassword: result.message }));
        } else if (result.message.toLowerCase().includes('passwords don\'t match')) {
          setErrors(prev => ({ ...prev, confirmPassword: result.message }));
        }
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
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
                  disabled={isSubmitting || isLoading}
                  className={`${
                    isSubmitting || isLoading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#0891b2] hover:bg-[#0e7490]'
                  } text-white py-2 px-6 rounded-md transition-colors flex items-center`}
                >
                  {isSubmitting || isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Change Password'
                  )}
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
