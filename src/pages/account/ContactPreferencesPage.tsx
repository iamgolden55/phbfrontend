import React, { useState } from 'react';
import { useAuth } from '../../features/auth/authContext';
import { Navigate } from 'react-router-dom';

const ContactPreferencesPage: React.FC = () => {
  const { user, isAuthenticated, updateContactPreferences } = useAuth();

  const [preferences, setPreferences] = useState({
    emailNotifications: user?.contactPreferences?.emailNotifications || false,
    smsNotifications: user?.contactPreferences?.smsNotifications || false,
    appointmentReminders: user?.contactPreferences?.appointmentReminders || false,
    healthTips: user?.contactPreferences?.healthTips || false,
    serviceUpdates: user?.contactPreferences?.serviceUpdates || false,
    researchParticipation: user?.contactPreferences?.researchParticipation || false,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // This is a mock implementation. In a real app, this would call an API
      // and the updateContactPreferences function would be implemented in the auth context
      if (typeof updateContactPreferences === 'function') {
        updateContactPreferences(preferences);
      }

      setSuccessMessage('Contact preferences updated successfully');

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrorMessage('Failed to update contact preferences');

      // Clear error message after 3 seconds
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Contact Preferences</h1>
          <p className="text-xl font-medium">
            Manage how we contact you
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

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Communication Preferences</h2>
            <p className="text-gray-600">
              Choose how and when you'd like to hear from us. You can change these settings at any time.
            </p>
          </div>

          <form onSubmit={handleSave}>
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-bold text-lg mb-4">Notification Methods</h3>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="emailNotifications"
                      name="emailNotifications"
                      checked={preferences.emailNotifications}
                      onChange={handleChange}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label htmlFor="emailNotifications" className="font-medium">
                        Email Notifications
                      </label>
                      <p className="text-sm text-gray-600">
                        Receive notifications via email
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="smsNotifications"
                      name="smsNotifications"
                      checked={preferences.smsNotifications}
                      onChange={handleChange}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label htmlFor="smsNotifications" className="font-medium">
                        SMS Notifications
                      </label>
                      <p className="text-sm text-gray-600">
                        Receive notifications via text message
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="font-bold text-lg mb-4">Notification Types</h3>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="appointmentReminders"
                      name="appointmentReminders"
                      checked={preferences.appointmentReminders}
                      onChange={handleChange}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label htmlFor="appointmentReminders" className="font-medium">
                        Appointment Reminders
                      </label>
                      <p className="text-sm text-gray-600">
                        Receive reminders about upcoming appointments
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="healthTips"
                      name="healthTips"
                      checked={preferences.healthTips}
                      onChange={handleChange}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label htmlFor="healthTips" className="font-medium">
                        Health Tips & Advice
                      </label>
                      <p className="text-sm text-gray-600">
                        Receive helpful health information and tips
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="serviceUpdates"
                      name="serviceUpdates"
                      checked={preferences.serviceUpdates}
                      onChange={handleChange}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label htmlFor="serviceUpdates" className="font-medium">
                        Service Updates
                      </label>
                      <p className="text-sm text-gray-600">
                        Receive updates about PHB services and features
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="researchParticipation"
                      name="researchParticipation"
                      checked={preferences.researchParticipation}
                      onChange={handleChange}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <label htmlFor="researchParticipation" className="font-medium">
                        Research Participation
                      </label>
                      <p className="text-sm text-gray-600">
                        Be notified about opportunities to participate in health research
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-[#0891b2] hover:bg-[#0e7490] text-white py-2 px-6 rounded-md transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPreferencesPage;
