import React from 'react';
import { Link } from 'react-router-dom';

const PHBServicesSection: React.FC = () => {
  const serviceLinks = [
    {
      href: '/find-pharmacy',
      text: 'Find a pharmacy',
    },
    {
      href: '/phb-services#dentist',
      text: 'Find a dentist',
    },
    {
      href: '/phb-services#gp',
      text: 'Find a GP',
    },
    {
      href: '/phb-services#therapy',
      text: 'Find a PHB talking therapies service',
    },
  ];

  return (
    <section className="bg-gray-50 py-10">
      <div className="phb-container">
        <h2 className="text-2xl font-bold mb-6">PHB services</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - PHB service buttons */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="bg-[#005eb8] text-white p-4 rounded-md flex items-center justify-between hover:bg-[#003f7e] transition-colors"
                >
                  <span className="font-medium">{link.text}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ))}
            </div>

            <div className="mt-4">
              <Link to="/phb-services#all" className="flex items-center text-[#005eb8] hover:underline">
                <svg
                  className="h-5 w-5 mr-2 flex-shrink-0 text-[#005eb8]"
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
                <span className="font-medium">Find other PHB services</span>
              </Link>
            </div>
          </div>

          {/* Right side - Help from PHB 111 */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-md shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold mb-3">Help from PHB 111</h3>
              <p className="mb-4 text-gray-700">
                If you're worried about a symptom and not sure what help you need, PHB 111 can tell you what to do next.
              </p>
              <p className="mb-2">
                Go to <a href="https://111.phb.uk" className="text-[#005eb8] font-medium hover:underline">111.phb.uk</a> or <a href="tel:111" className="text-[#005eb8] font-medium hover:underline">call 111</a>.
              </p>
              <p className="text-red-700 font-medium">
                For a life-threatening emergency call 999.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PHBServicesSection;
