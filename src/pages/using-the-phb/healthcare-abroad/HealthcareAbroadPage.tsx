import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../components/Breadcrumbs';

const HealthcareAbroadPage: React.FC = () => {
  const healthcareOptions = [
    {
      id: 'ghic',
      title: 'Get healthcare abroad with a GHIC or EHIC',
      description: 'Apply for or renew your Global Health Insurance Card for access to healthcare in the EU',
      path: '/using-the-phb/healthcare-abroad/apply-for-ghic',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 'travel-insurance',
      title: 'Travel insurance',
      description: 'Why you need travel insurance and what it should cover',
      path: '/using-the-phb/healthcare-abroad/travel-insurance',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'healthcare-country',
      title: 'Healthcare when traveling to specific countries',
      description: 'Find country-specific healthcare information for your trip',
      path: '/using-the-phb/healthcare-abroad/countries',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'moving-abroad',
      title: 'Moving abroad',
      description: 'How to access healthcare if you\'re moving abroad permanently',
      path: '/using-the-phb/healthcare-abroad/moving-abroad',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'vaccinations',
      title: 'Vaccinations for travel',
      description: 'Which travel vaccinations you need and where to get them',
      path: '/vaccinations/travel',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      id: 'medicines',
      title: 'Travelling with medicines',
      description: 'Rules for taking medicines abroad and getting prescriptions',
      path: '/using-the-phb/healthcare-abroad/travelling-with-medicines',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Using the PHB', url: '/using-the-phb' },
              { label: 'Healthcare abroad', url: '/using-the-phb/healthcare-abroad' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Healthcare abroad</h1>
          <p className="text-xl font-medium">
            Information and advice about accessing healthcare when traveling or living abroad
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthcareOptions.map((option) => (
              <Link key={option.id} to={option.path} className="block group">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group-hover:border-blue-300 h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0">
                        {option.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-[#0891b2] mb-2 group-hover:underline">{option.title}</h3>
                        <p className="text-gray-600">{option.description}</p>
                      </div>
                    </div>
                    <div className="mt-auto pt-4 flex justify-end">
                      <span className="text-[#0891b2] font-medium flex items-center">
                        Find out more
                        <svg className="h-5 w-5 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Before you travel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Essential checklist</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Check if you need any vaccinations or malaria tablets</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Check if your destination has any specific health risks</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Apply for a GHIC (or use your existing EHIC) if traveling to Europe</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Get comprehensive travel insurance with healthcare cover</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pack a first aid kit and any prescription medications you need</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Travel health advice</h3>
              <p className="mb-4">
                The PHB provides up-to-date health advice for travelers, including information on:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Specific health risks in different countries</li>
                <li>Required and recommended vaccinations</li>
                <li>Avoiding illness when traveling</li>
                <li>What to do if you get ill abroad</li>
                <li>Returning to the UK after treatment abroad</li>
              </ul>
              <div className="mt-6">
                <Link
                  to="/travel-health"
                  className="bg-[#0891b2] text-white px-6 py-2 rounded-md hover:bg-[#004b93] transition-colors inline-block"
                >
                  Check travel health advice
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-md">
            <div className="flex items-start">
              <svg className="w-10 h-10 text-blue-600 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-bold mb-2">Emergency medical assistance</h3>
                <p className="mb-4">
                  If you need emergency medical help when abroad, dial 112 in the EU or the local emergency number in other countries.
                  Contact your travel insurance provider as soon as possible if you're admitted to hospital.
                </p>
                <p className="font-medium">
                  Emergency assistance: +44 (0)20 7136 6780
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthcareAbroadPage;
