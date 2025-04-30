import React from 'react';
import { useAuth } from '../auth/authContext';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';

const MedicalRecords = () => {
  const { user } = useAuth();

  return (
    <AccountHealthLayout>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Medical Records</h2>
        
        <div className="p-4 bg-blue-50 rounded-md mb-6">
          <p className="text-blue-700">
            Your HPN number: {user?.hpn || 'Not available'}
          </p>
        </div>
        
        <p className="mb-4">
          Your medical records are currently being migrated to our new system. 
          Please check back soon to access your complete medical history.
        </p>
        
        <div className="border p-4 rounded-md bg-gray-50 text-center">
          <p className="mb-2 font-medium">Need immediate access to your records?</p>
          <p className="text-gray-600">
            Please contact your primary healthcare provider or hospital directly.
          </p>
        </div>
      </div>
    </AccountHealthLayout>
  );
};

export default MedicalRecords;
