import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const BabyHealthPage: React.FC = () => {
  const healthTopics = [
    {
      id: 'newborn',
      title: 'Newborn health',
      description: 'Information about common conditions and concerns in newborns',
      path: '/conditions/baby/newborn',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'feeding',
      title: 'Feeding your baby',
      description: 'Information about breastfeeding, formula feeding, and weaning',
      path: '/conditions/baby/feeding',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m-6-8h6M9 1l3 3 3-3" />
        </svg>
      )
    },
    {
      id: 'sleep',
      title: 'Baby sleep',
      description: 'Information about sleep patterns, routines, and safe sleeping',
      path: '/conditions/baby/sleep',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )
    },
    {
      id: 'crying',
      title: 'Crying and colic',
      description: 'Information about why babies cry and how to cope with colic',
      path: '/conditions/baby/crying',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      id: 'development',
      title: 'Baby development',
      description: 'Information about developmental milestones and how to support your baby\'s development',
      path: '/conditions/baby/development',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 'illness',
      title: 'Illness in babies',
      description: 'Information about common illnesses in babies and when to get help',
      path: '/conditions/baby/illness',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'skin',
      title: 'Baby skin conditions',
      description: 'Information about common skin conditions in babies, such as eczema and nappy rash',
      path: '/conditions/baby/skin',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
        </svg>
      )
    },
    {
      id: 'vaccinations',
      title: 'Baby vaccinations',
      description: 'Information about the vaccination schedule for babies and why vaccinations are important',
      path: '/vaccinations/children',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'safety',
      title: 'Baby safety',
      description: 'Information about keeping your baby safe at home and when out and about',
      path: '/conditions/baby/safety',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  const commonConditions = [
    {
      title: 'Colic',
      path: '/conditions/baby/colic',
      description: 'Excessive, frequent crying in a baby who appears to be healthy'
    },
    {
      title: 'Cradle cap',
      path: '/conditions/baby/cradle-cap',
      description: 'Yellow, crusty patches on a baby\'s scalp'
    },
    {
      title: 'Nappy rash',
      path: '/conditions/baby/nappy-rash',
      description: 'Red, painful rash in the nappy area'
    },
    {
      title: 'Reflux',
      path: '/conditions/baby/reflux',
      description: 'When a baby brings up milk during or after feeding'
    },
    {
      title: 'Jaundice',
      path: '/conditions/baby/jaundice',
      description: 'Yellowing of a baby\'s skin and the whites of their eyes'
    },
    {
      title: 'Thrush',
      path: '/conditions/baby/thrush',
      description: 'White patches in a baby\'s mouth or nappy rash that won\'t clear up'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#1e88e5] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Conditions', url: '/health-a-z' },
              { label: 'Baby', url: '/conditions/baby' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Baby health</h1>
          <p className="text-xl font-medium">
            Information and advice about caring for your baby, from newborn to 12 months
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-10">
          <h2 className="text-2xl font-bold mb-4">About baby health</h2>
          <p className="mb-4">
            The first year of a baby's life is a time of rapid growth and development. It's also a time when parents have many questions and concerns about their baby's health.
          </p>
          <p className="mb-4">
            This section provides information and advice about common baby health concerns, from feeding and sleep to illness and development. It also includes information about when to seek medical help for your baby.
          </p>
          <p>
            If you're worried about your baby's health, you should always seek advice from a healthcare professional. You can contact your health visitor, GP, or call PHB 111 for advice. In an emergency, call 999.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Baby health topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthTopics.map((topic) => (
              <Link key={topic.id} to={topic.path} className="block group">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group-hover:border-blue-300 h-full">
                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0">
                        {topic.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-bold text-[#1e88e5] mb-2 group-hover:underline">{topic.title}</h3>
                        <p className="text-gray-600">{topic.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <span className="text-[#1e88e5] font-medium flex items-center">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-[#e3f2fd] p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Common baby conditions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commonConditions.map((condition, index) => (
                  <Link key={index} to={condition.path} className="block group">
                    <div className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="text-lg font-bold text-[#1e88e5] mb-1 group-hover:underline">{condition.title}</h3>
                      <p className="text-sm text-gray-600">{condition.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-center">
                <Link
                  to="/health-a-z?ages=babies"
                  className="inline-flex items-center bg-[#1e88e5] text-white px-6 py-2 rounded-md hover:bg-[#1976d2] transition-colors"
                >
                  View all baby conditions
                  <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-xl font-bold mb-4 text-[#1e88e5]">When to get help for your baby</h3>
              <p className="mb-4">
                Call 999 or go to A&E if your baby:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-red-600">
                <li>is struggling to breathe</li>
                <li>is unresponsive or has become floppy</li>
                <li>has a fit or seizure for the first time, or one that lasts more than 5 minutes</li>
                <li>has a rash that doesn't fade when you press a glass against it</li>
                <li>has a fever and is persistently crying or irritable</li>
                <li>has blood in their poo or vomit</li>
              </ul>
              <p className="text-sm text-gray-500">
                These symptoms require immediate medical attention.
              </p>
            </div>
            <div className="bg-[#e3f2fd] p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-[#1e88e5]">Baby health checks</h3>
              <p className="mb-4">
                Your baby will have regular health and development checks in their first year. These are usually carried out by a health visitor or doctor.
              </p>
              <Link
                to="/conditions/baby/health-checks"
                className="text-[#1e88e5] font-medium hover:underline inline-flex items-center"
              >
                Learn about baby health checks
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Support for parents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#1e88e5]">Talk to a health visitor</h3>
              <p className="mb-4">
                Health visitors are nurses or midwives who are specially trained to support families with young children. They can provide advice and support on all aspects of baby health and development.
              </p>
              <p className="mb-4">
                You can contact your health visitor directly, or through your GP surgery.
              </p>
              <Link
                to="/find-a-health-visitor"
                className="inline-flex items-center text-[#1e88e5] font-medium hover:underline"
              >
                Find out more about health visitors
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-[#1e88e5]">Parent support groups</h3>
              <p className="mb-4">
                Talking to other parents can be a valuable source of support and advice when you have a baby. There are many parent support groups, both local and online.
              </p>
              <Link
                to="/find-parent-support"
                className="inline-flex items-center text-[#1e88e5] font-medium hover:underline"
              >
                Find parent support groups
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 p-6 rounded-md">
            <div className="flex items-start">
              <svg className="w-10 h-10 text-blue-600 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-lg font-bold mb-2">PHB helpline for parents</h3>
                <p className="mb-4">
                  If you're worried about your baby's health or development, you can call the PHB helpline for advice. The helpline is staffed by trained advisers who can provide information and support.
                </p>
                <p className="font-bold">
                  Call: 0300 123 1044 (Monday to Friday, 9am to 8pm; Saturday and Sunday, 10am to 4pm)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabyHealthPage;
