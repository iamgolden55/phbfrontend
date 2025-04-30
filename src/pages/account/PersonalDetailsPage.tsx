import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/auth/authContext';
import { Navigate } from 'react-router-dom';

const PersonalDetailsPage: React.FC = () => {
  const { user, isAuthenticated, updateUserProfile } = useAuth();

  const [formData, setFormData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
    dateOfBirth: user?.date_of_birth || '',
    address: user?.address || '',
    phone: user?.phone || '',
  });

  // Log the user object received from context
  console.log('User object in PersonalDetailsPage:', user);

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user.full_name || '',
        email: user.email || '',
        dateOfBirth: user.date_of_birth || '',
        address: user.address || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  // Log the formData state before rendering
  console.log('Form data state in PersonalDetailsPage:', formData);

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const updateData = {
      full_name: formData.full_name,
      email: formData.email,
      dateOfBirth: formData.dateOfBirth || null,
      address: formData.address || null,
      phone: formData.phone || null,
    };

    try {
      await updateUserProfile(updateData);
      setSuccessMessage('Personal details updated successfully');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error: any) {
      console.error("Update profile failed:", error);
      setErrorMessage(error.message || 'Failed to update personal details');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Personal Details</h1>
          <p className="text-xl font-medium">
            Manage your personal information
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
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

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Information</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-[#005eb8] hover:underline flex items-center"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          <form onSubmit={handleSave}>
            <div className="space-y-6">
              <div>
                <label htmlFor="full_name" className="block text-gray-700 font-medium mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{formData.full_name || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{formData.email || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label htmlFor="dateOfBirth" className="block text-gray-700 font-medium mb-2">
                  Date of Birth
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{formData.dateOfBirth || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md">{formData.phone || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="p-2 bg-gray-50 rounded-md whitespace-pre-line">
                    {formData.address || 'Not provided'}
                  </p>
                )}
              </div>

              {isEditing && (
                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-[#005eb8] hover:bg-[#003f7e] text-white py-2 px-6 rounded-md transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsPage;
