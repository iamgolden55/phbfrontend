import React from 'react';
import { Helmet } from 'react-helmet';

const ProfessionalPatientsPage: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Patients | Doctor Dashboard</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">My Patients</h1>
        <p className="mt-2 text-gray-600">
          View and manage your patient list
        </p>
      </div>
      
      {/* Content placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-center text-gray-500">
          Patient management functionality will be implemented soon.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalPatientsPage; 