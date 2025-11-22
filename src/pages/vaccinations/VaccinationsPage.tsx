import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const VaccinationsPage: React.FC = () => {
  const vaccinationTypes = [
    {
      id: 'flu',
      title: 'Flu vaccine',
      description: 'Find out about the flu vaccine, including who should have it and how to get it',
      path: '/vaccinations/flu-vaccine',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      id: 'covid',
      title: 'COVID-19 vaccine',
      description: 'Advice about the COVID-19 vaccination program and information on the vaccines',
      path: '/vaccinations/covid-19-vaccine',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      id: 'children',
      title: 'Children\'s vaccines',
      description: 'The vaccines that are routinely offered to all children in the UK for free on the PHB',
      path: '/vaccinations/children',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      id: 'travel',
      title: 'Travel vaccinations',
      description: 'Vaccines that are recommended or required for travel to some countries',
      path: '/vaccinations/travel',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'adults',
      title: 'Vaccines for adults',
      description: 'The vaccines that are available for adults and why they\'re important',
      path: '/vaccinations/adults',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'pregnancy',
      title: 'Vaccines in pregnancy',
      description: 'Information about the vaccines recommended during pregnancy to protect you and your baby',
      path: '/vaccinations/pregnancy',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              { label: 'Vaccinations', url: '/vaccinations' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Vaccinations</h1>
          <p className="text-xl font-medium">
            Information about vaccines, including who should have them and when
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Find vaccine information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vaccinationTypes.map((vaccine) => (
              <Link key={vaccine.id} to={vaccine.path} className="block group">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group-hover:border-blue-300">
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0">
                        {vaccine.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-[#0891b2] mb-2 group-hover:underline">{vaccine.title}</h3>
                        <p className="text-gray-600">{vaccine.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <span className="text-[#0891b2] font-medium flex items-center">
                        Learn more
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
          <h2 className="text-2xl font-bold mb-6">Why vaccination is important</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-md shadow-sm">
              <h3 className="text-lg font-bold mb-2 text-[#0891b2]">Protection for you</h3>
              <p className="text-gray-600">
                Vaccines protect you from serious and potentially deadly diseases.
              </p>
            </div>
            <div className="bg-white p-5 rounded-md shadow-sm">
              <h3 className="text-lg font-bold mb-2 text-[#0891b2]">Protection for others</h3>
              <p className="text-gray-600">
                When you're vaccinated, you help protect those who cannot be vaccinated due to age or medical conditions.
              </p>
            </div>
            <div className="bg-white p-5 rounded-md shadow-sm">
              <h3 className="text-lg font-bold mb-2 text-[#0891b2]">Disease prevention</h3>
              <p className="text-gray-600">
                Vaccines have helped reduce or eliminate many diseases that used to be common, such as polio and smallpox.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-md">
            <div className="flex items-start">
              <svg className="w-10 h-10 text-blue-600 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-bold mb-2">Concerned about vaccines?</h3>
                <p className="mb-4">
                  It's normal to have questions about vaccines. All vaccines approved for use in the UK have been thoroughly tested
                  to ensure they meet strict safety standards.
                </p>
                <Link
                  to="/vaccinations/safety"
                  className="text-[#0891b2] font-medium hover:underline inline-flex items-center"
                >
                  Learn more about vaccine safety
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Where to get vaccinated</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4">GP surgery</h3>
              <p className="mb-4">
                Many vaccinations are given at GP surgeries, including routine vaccinations for babies, children, and certain adult vaccines.
              </p>
              <Link
                to="/find-a-gp"
                className="inline-flex items-center text-[#0891b2] font-medium hover:underline"
              >
                Find a GP surgery
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4">Pharmacy</h3>
              <p className="mb-4">
                Many pharmacies offer certain vaccines, such as the flu vaccine, COVID-19 vaccine, and travel vaccines.
              </p>
              <Link
                to="/find-pharmacy"
                className="inline-flex items-center text-[#0891b2] font-medium hover:underline"
              >
                Find a pharmacy
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VaccinationsPage;
