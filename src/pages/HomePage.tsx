import React from 'react';
import HeroSection from '../components/HeroSection';
import MissionSection from '../components/MissionSection';
import PHBServicesSection from '../components/PHBServicesSection';
import FeaturedSection from '../components/FeaturedSection';
import MoreInfoSection from '../components/MoreInfoSection';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  // Health links for "Manage your health" section
  const healthLinks = [
    {
      href: '/account/gp-record',
      text: 'View your GP health record',
    },
    {
      href: '/account/prescriptions',
      text: 'Order a repeat prescription',
    },
    {
      href: '/account/test-results',
      text: 'View your test results',
    },
    {
      href: '/account/appointments',
      text: 'Appointments and bookings at your GP surgery',
    },
    {
      href: '/phb-services#gp',
      text: 'How to register with a GP surgery',
    },
    {
      href: '/about#phb-number',
      text: 'Find your HPN number',
    },
  ];

  return (
    <>
      <HeroSection />
      <MissionSection />

      {/* Combined Health A-Z and Manage Health Section */}
      <section className="bg-gray-50 py-10">
        <div className="phb-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column - Health A to Z and Medicines A to Z */}
            <div className="space-y-8">
              {/* Health A to Z */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Health A to Z</h2>
                <div className="bg-white p-6 shadow-sm rounded-md">
                  <p className="mb-4">
                    Find out about conditions, symptoms and treatments, including what to do and when to get help
                  </p>
                  <Link
                    to="/health-a-z"
                    className="flex items-center text-[#0891b2] hover:underline"
                  >
                    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Medicines A to Z */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Medicines A to Z</h2>
                <div className="bg-white p-6 shadow-sm rounded-md">
                  <p className="mb-4">
                    Find out how your medicine works, how and when to take it, and possible side effects
                  </p>
                  <Link
                    to="/medicines-a-z"
                    className="flex items-center text-[#0891b2] hover:underline"
                  >
                    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right column - Manage your health */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Manage your health</h2>
              <div className="bg-white rounded-md shadow-sm p-6">
                <ul className="space-y-4">
                  {healthLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.href}
                        className="flex items-center text-[#0891b2] hover:underline"
                      >
                        <svg
                          className="h-5 w-5 mr-4 flex-shrink-0 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                        <span className="font-medium">{link.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PHBServicesSection />
      <FeaturedSection />
      <MoreInfoSection />
    </>
  );
};

export default HomePage;
