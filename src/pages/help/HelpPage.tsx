import React from 'react';
import { Link } from 'react-router-dom';

const HelpPage: React.FC = () => {
  // Define help categories
  const helpCategories = [
    {
      title: 'Appointments',
      icon: (
        <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      topics: [
        { title: 'How to book an appointment', link: '/help/appointments/how-to-book' },
        { title: 'Cancelling or rescheduling', link: '/help/appointments/cancel-change' },
        { title: 'Preparing for your appointment', link: '/help/appointments/prepare' },
        { title: 'Video consultation help', link: '/help/appointments/video-consultation' },
      ],
    },
    {
      title: 'Prescriptions',
      icon: (
        <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      topics: [
        { title: 'Requesting a prescription', link: '/help/prescriptions/how-to-request' },
        { title: 'Setting your nominated pharmacy', link: '/help/prescriptions/nominated-pharmacy' },
        { title: 'Prescription charges and exemptions', link: '/help/prescriptions/charges' },
        { title: 'Urgent prescription requests', link: '/help/prescriptions/urgent-requests' },
      ],
    },
    {
      title: 'Your PHB account',
      icon: (
        <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      topics: [
        { title: 'Managing your personal details', link: '/help/account/personal-details' },
        { title: 'Changing your password', link: '/help/account/password' },
        { title: 'Setting communication preferences', link: '/help/account/communication' },
        { title: 'Accessing your health records', link: '/help/account/health-records' },
      ],
    },
    {
      title: 'Technical support',
      icon: (
        <svg className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      topics: [
        { title: 'Browser compatibility', link: '/help/technical/browsers' },
        { title: 'Troubleshooting login issues', link: '/help/technical/login-issues' },
        { title: 'App not working correctly', link: '/help/technical/app-issues' },
        { title: 'Accessibility settings', link: '/help/technical/accessibility' },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2">Help & Support</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Help and Support Centre</h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              Need immediate help? Call our support team on <span className="font-semibold">0800 123 4567</span> (8am - 8pm, 7 days a week)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {helpCategories.map((category, index) => (
          <div key={index} className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-4">
                {category.icon}
                <h2 className="text-xl font-semibold text-gray-900 ml-3">{category.title}</h2>
              </div>
              <ul className="space-y-3">
                {category.topics.map((topic, topicIndex) => (
                  <li key={topicIndex}>
                    <Link to={topic.link} className="text-blue-600 hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{topic.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg text-gray-900">How do I register with a GP surgery?</h3>
              <p className="text-gray-600 mt-1">
                You can register with a GP surgery by visiting the surgery's website or by going in person. You'll need to fill in a registration form. Some surgeries also allow online registration through the PHB services.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900">How can I see my test results?</h3>
              <p className="text-gray-600 mt-1">
                Test results are available in your PHB account under "Health Records" &gt; "Test Results". New results are usually available within 5 working days after the test.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900">What should I do if I need medical help now?</h3>
              <p className="text-gray-600 mt-1">
                If it's an emergency, call 999. For urgent medical problems that are not life-threatening, call 111. For routine issues, book an appointment with your GP or use the PHB's online consultation service.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-900">How can I Find my HPN number?</h3>
              <p className="text-gray-600 mt-1">
                Your PHB number is a 10-digit number shown at the top of any letter from the PHB. It's also available in your PHB account under "Account Settings" &gt; "Personal Details".
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact us</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <svg className="h-10 w-10 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">By Phone</h3>
              <p className="text-gray-600 mt-1">0800 123 4567</p>
              <p className="text-gray-500 text-sm">8am - 8pm, 7 days a week</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <svg className="h-10 w-10 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">By Email</h3>
              <p className="text-gray-600 mt-1">support@phb.org.uk</p>
              <p className="text-gray-500 text-sm">Response within 24 hours</p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <svg className="h-10 w-10 text-blue-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">Live Chat</h3>
              <p className="text-gray-600 mt-1">Chat with our team</p>
              <p className="text-gray-500 text-sm">Available 9am - 5pm, Mon - Fri</p>
              <button className="mt-2 inline-flex items-center px-3 py-1.5 border border-blue-500 shadow-sm text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Start Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
