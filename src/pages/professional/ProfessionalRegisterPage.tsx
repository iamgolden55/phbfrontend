import React from 'react';
import { Helmet } from 'react-helmet';
import ProfessionalRegisterForm from '../../features/professional/ProfessionalRegisterForm';
import PHBLogo from '../../components/PHBLogo';

const ProfessionalRegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Helmet>
        <title>Healthcare Professional Registration | PHB</title>
      </Helmet>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <PHBLogo className="h-12 w-12" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Healthcare Professional Registration
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create your professional account to access exclusive resources
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <ProfessionalRegisterForm />

        <div className="mt-6 bg-white py-4 px-4 shadow rounded-lg text-sm text-gray-600 text-center">
          <p>
            Already have an account? <a href="/professional/login" className="text-blue-600 hover:underline">Log in here</a>
          </p>
          <p className="mt-2">
            <a href="/" className="text-blue-600 hover:underline">Return to public site</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalRegisterPage;
