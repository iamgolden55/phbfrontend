import React from 'react';

const HealthAZSection: React.FC = () => {
  return (
    <section className="bg-gray-100 py-8">
      <div className="phb-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Health A to Z Card */}
          <div className="bg-white p-6 shadow-sm rounded-md">
            <h2 className="text-xl font-bold text-[#005eb8] mb-4">
              <a href="/health-a-z" className="hover:underline flex items-start">
                Health A to Z
              </a>
            </h2>
            <p className="mb-4">
              Find out about conditions, symptoms and treatments, including what to do and when to get help
            </p>
            <a
              href="/health-a-z"
              className="flex items-center text-[#005eb8] font-bold"
              aria-label="Go to Health A to Z"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>

          {/* Medicines A to Z Card */}
          <div className="bg-white p-6 shadow-sm rounded-md">
            <h2 className="text-xl font-bold text-[#005eb8] mb-4">
              <a href="/medicines-a-z" className="hover:underline flex items-start">
                Medicines A to Z
              </a>
            </h2>
            <p className="mb-4">
              Find out how your medicine works, how and when to take it, and possible side effects
            </p>
            <a
              href="/medicines-a-z"
              className="flex items-center text-[#005eb8] font-bold"
              aria-label="Go to Medicines A to Z"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthAZSection;
