import React from 'react';
import { Helmet } from 'react-helmet';

const ProfessionalResearchPage: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Research | Doctor Dashboard</title>
      </Helmet>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Medical Research</h1>
        <p className="mt-2 text-gray-600">
          Access and contribute to medical research initiatives
        </p>
      </div>
      
      {/* Content placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-center text-gray-500">
          Research functionality will be available soon.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalResearchPage; 