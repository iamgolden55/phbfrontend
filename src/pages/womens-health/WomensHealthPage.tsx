import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const WomensHealthPage: React.FC = () => {
  const healthTopics = [
    {
      id: 'periods',
      title: 'Periods and period problems',
      description: 'Information about periods, including heavy periods, irregular periods, and painful periods',
      path: '/womens-health/periods',
      icon: (
        <svg className="w-12 h-12 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'contraception',
      title: 'Contraception',
      description: 'Information about different types of contraception, how they work, and how to get them',
      path: '/contraception',
      icon: (
        <svg className="w-12 h-12 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'pregnancy',
      title: 'Pregnancy',
      description: 'Information and advice to help you through all stages of pregnancy',
      path: '/pregnancy',
      icon: (
        <svg className="w-12 h-12 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'menopause',
      title: 'Menopause',
      description: 'Information about the menopause, symptoms, and treatments',
      path: '/womens-health/menopause',
      icon: (
        <svg className="w-12 h-12 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      id: 'breast-health',
      title: 'Breast health',
      description: 'Information about breast cancer screening, breast lumps, and other breast conditions',
      path: '/womens-health/breast-health',
      icon: (
        <svg className="w-12 h-12 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      id: 'sexual-health',
      title: 'Sexual health',
      description: 'Information about STIs, sexual problems, and getting tested',
      path: '/womens-health/sexual-health',
      icon: (
        <svg className="w-12 h-12 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 'fertility',
      title: 'Fertility',
      description: 'Information about getting pregnant, fertility problems, and treatments',
      path: '/womens-health/fertility',
      icon: (
        <svg className="w-12 h-12 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v3m0 0v3m0-3h3m-3 0H9m1.5-12h-2" />
        </svg>
      )
    },
    {
      id: 'mental-health',
      title: 'Mental health',
      description: 'Information about mental health issues that may affect women',
      path: '/womens-health/mental-health',
      icon: (
        <svg className="w-12 h-12 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 'screenings',
      title: 'Health screenings',
      description: 'Information about cervical screening, breast screening, and other health checks',
      path: '/womens-health/screenings',
      icon: (
        <svg className="w-12 h-12 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#d8157d] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Women\'s health', url: '/womens-health' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Women's health</h1>
          <p className="text-xl font-medium">
            Information and support on health, wellbeing, conditions and services for women
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Women's health topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthTopics.map((topic) => (
              <Link key={topic.id} to={topic.path} className="block group">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group-hover:border-pink-300 h-full">
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0">
                        {topic.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-[#d8157d] mb-2 group-hover:underline">{topic.title}</h3>
                        <p className="text-gray-600">{topic.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <span className="text-[#d8157d] font-medium flex items-center">
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

        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Women's health services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Sexual health services</h3>
              <p className="mb-4">
                Find sexual health services near you for contraception, STI testing, and other sexual health support.
              </p>
              <Link
                to="/service-search/sexual-health"
                className="inline-flex items-center text-[#d8157d] font-medium hover:underline"
              >
                Find sexual health services
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">GP services</h3>
              <p className="mb-4">
                Find a GP or book an appointment with your GP for women's health issues.
              </p>
              <Link
                to="/find-a-gp"
                className="inline-flex items-center text-[#d8157d] font-medium hover:underline"
              >
                Find a GP
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Screening services</h3>
              <p className="mb-4">
                Find information about cervical and breast screening programs and how to access them.
              </p>
              <Link
                to="/womens-health/screenings"
                className="inline-flex items-center text-[#d8157d] font-medium hover:underline"
              >
                Learn about screening programs
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#d8157d]">Maternity services</h3>
              <p className="mb-4">
                Information about antenatal care, labor and birth, and postnatal support.
              </p>
              <Link
                to="/pregnancy/care"
                className="inline-flex items-center text-[#d8157d] font-medium hover:underline"
              >
                Explore maternity services
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Support and resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-2 text-[#d8157d]">Women's Health Helpline</h3>
              <p className="text-gray-600 mb-4">
                Speak to a healthcare professional about women's health concerns.
              </p>
              <p className="font-bold">Call: 0800 123 4567</p>
              <p className="text-sm text-gray-500">Monday to Friday, 9am to 5pm</p>
            </div>
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-2 text-[#d8157d]">PHB App</h3>
              <p className="text-gray-600 mb-4">
                Access women's health services and information through the PHB App.
              </p>
              <Link
                to="/phb-services"
                className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
              >
                Download the PHB App
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-[#fdf2f8] p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-2 text-[#d8157d]">Support groups</h3>
              <p className="text-gray-600 mb-4">
                Find support groups for various women's health conditions.
              </p>
              <Link
                to="/find-support-groups"
                className="text-[#d8157d] font-medium hover:underline inline-flex items-center"
              >
                Find support groups
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

export default WomensHealthPage;
