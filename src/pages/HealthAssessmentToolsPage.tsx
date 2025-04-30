import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const HealthAssessmentToolsPage: React.FC = () => {
  const assessmentTools = [
    {
      id: 'bmi-calculator',
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index (BMI) and find out if you are a healthy weight',
      path: '/health-assessment-tools/calculate-your-bmi',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'health-check',
      title: 'Health Check Assessment',
      description: 'Take our comprehensive assessment to evaluate your overall health and wellbeing',
      path: '/tools/health-assessments/health-check',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'mental-wellbeing',
      title: 'Mental Wellbeing Assessment',
      description: 'Evaluate your mental health and get personalized recommendations to improve wellbeing',
      path: '/tools/health-assessments/mental-wellbeing',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'weight-gain-calculator',
      title: 'Weight Gain Calculator',
      description: 'Track healthy weight gain during pregnancy with our specialized calculator',
      path: '/tools/weight-gain-calculator',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      )
    },
    {
      id: 'due-date-calculator',
      title: 'Due Date Calculator',
      description: 'Calculate your estimated due date based on your last period or conception date',
      path: '/tools/due-date-calculator',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'kick-counter',
      title: 'Pregnancy Kick Counter',
      description: 'Track and record your baby\'s movements during pregnancy',
      path: '/tools/kick-counter',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Health Assessment Tools', url: '/health-assessment-tools' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Health Assessment Tools</h1>
          <p className="text-xl font-medium">
            Use our range of tools to assess and monitor your health
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {assessmentTools.map((tool) => (
            <Link key={tool.id} to={tool.path} className="block group">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group-hover:border-blue-300">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="flex-shrink-0">
                      {tool.icon}
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-bold text-[#005eb8] mb-2 group-hover:underline">{tool.title}</h2>
                      <p className="text-gray-600">{tool.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <span className="text-[#005eb8] font-medium flex items-center">
                      Use this tool
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

        <div className="mt-16 bg-gray-50 rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold mb-6">Why use our health assessment tools?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-md shadow-sm">
              <h3 className="text-lg font-bold mb-2 text-[#005eb8]">Reliable information</h3>
              <p className="text-gray-600">
                All our tools are based on clinically validated methods and trusted medical information.
              </p>
            </div>
            <div className="bg-white p-5 rounded-md shadow-sm">
              <h3 className="text-lg font-bold mb-2 text-[#005eb8]">Easy to use</h3>
              <p className="text-gray-600">
                Our tools are designed to be simple and intuitive, providing clear results and guidance.
              </p>
            </div>
            <div className="bg-white p-5 rounded-md shadow-sm">
              <h3 className="text-lg font-bold mb-2 text-[#005eb8]">Personalized insights</h3>
              <p className="text-gray-600">
                Get tailored recommendations based on your individual health assessment results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthAssessmentToolsPage;
