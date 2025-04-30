import React from 'react';
import PHBServicesSection from '../components/PHBServicesSection';

const PHBServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">PHB Services</h1>
          <p className="text-xl">
            Find services provided by the Public Health Bureau (PHB)
          </p>
        </div>
      </div>

      <div className="phb-container mt-8 mb-12">
        <p className="text-lg mb-6">
          The Public Health Bureau (PHB) offers a wide range of services to help you manage your health and wellbeing.
          Use the links below to find services near you, including pharmacies, dentists, GPs, and specialist services.
        </p>
      </div>

      <PHBServicesSection />

      <div className="phb-container my-12">
        <h2 className="text-2xl font-bold mb-6">Additional Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-3">Emergency Services</h3>
            <p className="mb-4">For life-threatening emergencies, call 999 or visit your nearest Accident & Emergency department.</p>
            <a href="/emergency-services" className="phb-link">Learn more about emergency services</a>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-3">Screening Services</h3>
            <p className="mb-4">PHB offers various screening programs to help detect potential health issues early.</p>
            <a href="/screening-services" className="phb-link">Find out about PHB screening services</a>
          </div>

          <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
            <h3 className="text-xl font-bold mb-3">Maternity Services</h3>
            <p className="mb-4">Comprehensive care throughout pregnancy, birth, and the early days with your new baby.</p>
            <a href="/pregnancy/health" className="phb-link">Explore PHB maternity services</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PHBServicesPage;
