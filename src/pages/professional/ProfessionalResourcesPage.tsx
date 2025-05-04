import React from 'react';
import { Helmet } from 'react-helmet';

const ProfessionalResourcesPage: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Resources | Doctor Dashboard</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Doctor Resources</h1>
        <p className="mt-2 text-gray-600">
          Access professional medical resources and reference materials
        </p>
      </div>
      
      {/* Content placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-center text-gray-500">
          Professional resources will be available soon.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalResourcesPage; 