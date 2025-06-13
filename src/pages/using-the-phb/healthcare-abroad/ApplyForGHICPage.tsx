import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

interface GHICApplication {
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    nationality: string;
    passportNumber: string;
    currentCountry: string;
  };
  travelDetails: {
    destinationCountries: string[];
    travelStartDate: string;
    travelEndDate: string;
    travelPurpose: string;
    frequentTraveler: boolean;
  };
  coveragePreferences: {
    coverageLevel: string;
    medicalHistory: boolean;
    emergencyEvacuation: boolean;
    familyCoverage: boolean;
    familyMembers: number;
  };
}

const ApplyForGHICPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [application, setApplication] = useState<GHICApplication>({
    personalDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: 'Nigerian',
      passportNumber: '',
      currentCountry: 'Nigeria'
    },
    travelDetails: {
      destinationCountries: [],
      travelStartDate: '',
      travelEndDate: '',
      travelPurpose: '',
      frequentTraveler: false
    },
    coveragePreferences: {
      coverageLevel: '',
      medicalHistory: false,
      emergencyEvacuation: true,
      familyCoverage: false,
      familyMembers: 0
    }
  });
  // African countries covered by PHB's HMO network
  const africanCountries = [
    'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Cameroon', 
    'Cape Verde', 'Chad', 'Côte d\'Ivoire', 'Democratic Republic of Congo',
    'Egypt', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Kenya',
    'Liberia', 'Libya', 'Madagascar', 'Mali', 'Morocco', 'Mozambique',
    'Namibia', 'Niger', 'Rwanda', 'Senegal', 'Sierra Leone', 'South Africa',
    'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
  ];

  const coveragePlans = [
    {
      id: 'basic',
      name: 'GHIC Basic',
      price: '₦25,000',
      period: 'per year',
      coverage: '$50,000',
      features: [
        'Emergency medical treatment',
        'Hospitalization coverage',
        'Outpatient care',
        '24/7 helpline support',
        'Coverage across 15+ African countries',
        'Digital health card'
      ]
    },
    {
      id: 'premium',
      name: 'GHIC Premium',
      price: '₦65,000',
      period: 'per year',
      coverage: '$150,000',
      features: [
        'All Basic benefits',
        'Emergency medical evacuation',
        'Repatriation coverage',
        'Specialist consultations',
        'Coverage across 35+ African countries',
        'Family coverage discounts',
        'Pre-existing condition coverage'
      ],
      popular: true
    },
    {
      id: 'platinum',
      name: 'GHIC Platinum',
      price: '₦120,000',
      period: 'per year',
      coverage: '$500,000',
      features: [
        'All Premium benefits',
        'Global coverage (Africa + International)',
        'VIP medical services',
        'Health concierge services',
        'Preventive care coverage',
        'Mental health support',
        'Medical tourism assistance'
      ]
    }
  ];

  const handleInputChange = (section: keyof GHICApplication, field: string, value: any) => {
    setApplication(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Using the PHB', url: '/using-the-phb' },
              { label: 'Healthcare abroad', url: '/using-the-phb/healthcare-abroad' },
              { label: 'Apply for GHIC', url: '/using-the-phb/healthcare-abroad/apply-for-ghic' }
            ]}
            textColor="text-white"
          />
          <div className="flex items-center mt-4">
            <div className="bg-white bg-opacity-20 rounded-full p-3 mr-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Apply for PHB Global Health Insurance Card (GHIC)</h1>
              <p className="text-xl opacity-90">
                Get comprehensive health coverage across Africa through our HMO network partnerships
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Choose PHB Global Health Insurance Card?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Pan-African Coverage</h3>
              <p className="text-gray-600 text-sm">Access to quality healthcare across 35+ African countries through our extensive HMO network</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Affordable Premium</h3>
              <p className="text-gray-600 text-sm">Competitive rates starting from ₦25,000/year with family discounts and flexible payment options</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock assistance, emergency coordination, and health concierge services wherever you are</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Application Coming Soon</h2>
            <p className="text-gray-600 mb-6">Our comprehensive GHIC application system is currently under development.</p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4">Get Notified When Available</h3>
              <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyForGHICPage;