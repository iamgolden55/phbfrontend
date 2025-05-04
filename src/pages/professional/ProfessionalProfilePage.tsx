import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../features/auth/authContext';

const ProfessionalProfilePage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <Helmet>
        <title>Doctor Profile | PHB</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Professional Profile</h1>
        <p className="mt-2 text-gray-600">
          View and manage your doctor account information
        </p>
      </div>
      
      {/* Doctor Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Doctor Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-base font-medium">{user?.full_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Health Professional Number</p>
            <p className="text-base font-medium">{user?.hpn || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-base font-medium">{user?.phone || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="text-base font-medium capitalize">{user?.gender || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">City</p>
            <p className="text-base font-medium">{user?.city || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">State</p>
            <p className="text-base font-medium">{user?.state || 'Not provided'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Country</p>
            <p className="text-base font-medium">{user?.country || 'Not provided'}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
      
      {/* Account Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div>
            <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors">
              Change Password
            </button>
          </div>
          <div>
            <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors">
              Update Contact Preferences
            </button>
          </div>
          <div>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfilePage; 