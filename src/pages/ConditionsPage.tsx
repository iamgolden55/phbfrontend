import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const ConditionsPage: React.FC = () => {
  const conditionCategories = [
    {
      id: 'baby-health',
      title: 'Baby health',
      description: 'Information and advice about caring for your baby, from newborn to 12 months',
      path: '/conditions/baby',
      icon: (
        <svg className="w-12 h-12 text-[#005eb8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      id: 'womens-health',
      title: 'Women\'s health',
      description: 'Health information specifically for women, including periods, pregnancy, and screenings',
      path: '/womens-health',
      icon: (
        <svg className="w-12 h-12 text-[#005eb8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'mental-health',
      title: 'Mental health',
      description: 'Support and information for mental health conditions and wellbeing',
      path: '/mental-health',
      icon: (
        <svg className="w-12 h-12 text-[#005eb8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      id: 'pregnancy',
      title: 'Pregnancy',
      description: 'Complete guide to pregnancy care, health, and what to expect',
      path: '/pregnancy',
      icon: (
        <svg className="w-12 h-12 text-[#005eb8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'care-support',
      title: 'Care and support',
      description: 'Support for carers, older people, disabilities, and end of life care',
      path: '/care-and-support',
      icon: (
        <svg className="w-12 h-12 text-[#005eb8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'vaccinations',
      title: 'Vaccinations',
      description: 'Information about vaccines for children, adults, travel, and seasonal vaccines',
      path: '/vaccinations',
      icon: (
        <svg className="w-12 h-12 text-[#005eb8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  const quickLinks = [
    {
      title: 'Health A-Z',
      description: 'Find all health conditions and treatments from A to Z',
      path: '/health-a-z',
      icon: '📚'
    },
    {
      title: 'Medicines A-Z',
      description: 'Information about prescription and over-the-counter medicines',
      path: '/medicines-a-z',
      icon: '💊'
    },
    {
      title: 'Live Well',
      description: 'Advice on healthy living, diet, exercise, and lifestyle',
      path: '/live-well',
      icon: '🌟'
    },
    {
      title: 'Emergency Help',
      description: 'Know when to call 999, 111, or visit A&E',
      path: '/help',
      icon: '🚨'
    }
  ];

  const commonConditions = [
    { name: 'Diabetes', path: '/health-a-z/diabetes' },
    { name: 'High blood pressure', path: '/health-a-z/high-blood-pressure' },
    { name: 'Depression', path: '/mental-health/depression' },
    { name: 'Anxiety', path: '/mental-health/anxiety' },
    { name: 'Asthma', path: '/health-a-z/asthma' },
    { name: 'Arthritis', path: '/health-a-z/arthritis' },
    { name: 'Heart disease', path: '/health-a-z/heart-disease' },
    { name: 'Flu', path: '/health-a-z/flu' }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Conditions', url: '/conditions' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Health conditions and treatments</h1>
          <p className="text-xl font-medium">
            Find information about health conditions, treatments, and support for you and your family
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        {/* Introduction */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-10 border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Find the health information you need</h2>
          <p className="mb-4">
            PHB provides trusted health information to help you understand conditions, treatments, and how to 
            stay healthy. Our information is evidence-based and reviewed by medical professionals.
          </p>
          <p className="text-sm text-gray-600">
            This information is for educational purposes only. Always consult with a healthcare professional 
            for personalized medical advice.
          </p>
        </div>

        {/* Health Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse by health topic</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conditionCategories.map((category) => (
              <Link key={category.id} to={category.path} className="block group">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group-hover:border-blue-300 h-full">
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0">
                        {category.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-[#005eb8] mb-2 group-hover:underline">{category.title}</h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <span className="text-[#005eb8] font-medium flex items-center">
                        Explore topic
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

        {/* Quick Links and Common Conditions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Quick Links */}
          <div className="bg-[#f0f4f5] p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Quick access</h2>
            <div className="space-y-4">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.path} className="block group">
                  <div className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow flex items-center">
                    <span className="text-2xl mr-4">{link.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-[#005eb8] mb-1 group-hover:underline">{link.title}</h3>
                      <p className="text-sm text-gray-600">{link.description}</p>
                    </div>
                    <svg className="h-5 w-5 ml-auto text-[#005eb8] transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Common Conditions */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Common conditions</h2>
            <div className="grid grid-cols-1 gap-3">
              {commonConditions.map((condition, index) => (
                <Link key={index} to={condition.path} className="block group">
                  <div className="p-3 rounded-md hover:bg-blue-50 transition-colors flex items-center justify-between">
                    <span className="text-[#005eb8] font-medium group-hover:underline">{condition.name}</span>
                    <svg className="h-4 w-4 text-[#005eb8] transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                to="/health-a-z"
                className="inline-flex items-center bg-[#005eb8] text-white px-6 py-2 rounded-md hover:bg-[#003f7e] transition-colors"
              >
                View all conditions A-Z
                <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Emergency Information */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <svg className="w-8 h-8 text-red-600 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h3 className="text-lg font-bold text-red-800 mb-2">When to seek emergency help</h3>
              <div className="text-red-700 space-y-2">
                <p><strong>Call 999</strong> for life-threatening emergencies</p>
                <p><strong>Call 111</strong> for urgent but non-emergency health concerns</p>
                <p><strong>Visit A&E</strong> for serious injuries or sudden severe illness</p>
                <p><strong>Contact your GP</strong> for non-urgent health problems</p>
              </div>
              <div className="mt-4">
                <Link
                  to="/help"
                  className="inline-flex items-center text-red-800 font-medium hover:underline"
                >
                  Learn more about when to get help
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Information */}
        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Health information you can trust</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#005eb8]">Evidence-based content</h3>
              <p className="text-gray-700 mb-4">
                All our health information is based on the latest medical evidence and guidelines. 
                It's written and reviewed by qualified healthcare professionals.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-[#005eb8]">Regular updates</h3>
              <p className="text-gray-700 mb-4">
                We regularly review and update our content to ensure it reflects current best practice 
                and the latest research in healthcare.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-md">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Important disclaimer</h3>
                <p className="text-blue-700 text-sm">
                  This website provides general health information only. It should not be used to diagnose 
                  or treat any health condition. Always seek advice from a qualified healthcare professional 
                  about your specific health concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionsPage;