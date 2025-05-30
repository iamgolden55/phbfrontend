import React from 'react';
import { Link } from 'react-router-dom';
import UserRegistrationsPanel from '../../features/organization/components/UserRegistrationsPanel';

const UserRegistrationsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link 
                to="/organization/dashboard" 
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <span className="material-icons mr-2">arrow_back</span>
                Back to Dashboard
              </Link>
              <div className="text-gray-300">|</div>
              <h1 className="text-2xl font-bold text-gray-900">User Registration Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/organization/invite-users"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium"
              >
                <span className="material-icons text-sm mr-2">person_add</span>
                Invite Users
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Description */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <span className="material-icons text-blue-600 mr-3">info</span>
            <div>
              <h3 className="text-sm font-medium text-blue-800">User Registration Management</h3>
              <p className="text-sm text-blue-700 mt-1">
                Review and approve user registration requests for your hospital. 
                Users who register will be able to book appointments and access hospital services once approved.
              </p>
            </div>
          </div>
        </div>

        {/* User Registrations Panel */}
        <UserRegistrationsPanel />

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/organization/bulk-approve"
              className="bg-green-50 hover:bg-green-100 p-4 rounded-lg border border-green-200 flex items-center text-green-700 transition-colors"
            >
              <span className="material-icons mr-3">done_all</span>
              <div>
                <div className="font-medium">Bulk Approve</div>
                <div className="text-sm text-green-600">Approve multiple registrations</div>
              </div>
            </Link>
            <Link
              to="/organization/user-analytics"
              className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg border border-purple-200 flex items-center text-purple-700 transition-colors"
            >
              <span className="material-icons mr-3">analytics</span>
              <div>
                <div className="font-medium">User Analytics</div>
                <div className="text-sm text-purple-600">View registration trends</div>
              </div>
            </Link>
            <Link
              to="/organization/settings"
              className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border border-gray-200 flex items-center text-gray-700 transition-colors"
            >
              <span className="material-icons mr-3">settings</span>
              <div>
                <div className="font-medium">Settings</div>
                <div className="text-sm text-gray-600">Configure registration rules</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationsPage;
