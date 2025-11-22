import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryType {
  title: string;
  description: string;
  href: string;
  imageSrc?: string;
}

const categories: CategoryType[] = [
  {
    title: 'Healthy eating',
    description: 'Advice on maintaining a balanced diet, understanding food groups, and making healthier food choices.',
    href: '/live-well/healthy-eating',
    imageSrc: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    title: 'Exercise and fitness',
    description: 'Tips on staying active, benefits of physical activity, and how to start and maintain an exercise routine.',
    href: '/live-well/exercise',
    imageSrc: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    title: 'Mental wellbeing',
    description: 'Guidance on managing stress, improving mental health, and understanding common mental health issues.',
    href: '/live-well/mental-wellbeing',
    imageSrc: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    title: 'Sleep and tiredness',
    description: 'Information on getting good sleep, dealing with sleep problems, and managing fatigue.',
    href: '/live-well/sleep',
    imageSrc: 'https://images.unsplash.com/photo-1631157866072-2180bae85af1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    title: 'Quit smoking',
    description: 'Support and advice to help you stop smoking, including nicotine replacement therapy and medication.',
    href: '/live-well/quit-smoking',
    imageSrc: 'https://images.unsplash.com/photo-1603398495073-ad551efa915d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    title: 'Alcohol advice',
    description: 'Guidance on alcohol consumption, the effects of alcohol on your health, and how to cut down.',
    href: '/live-well/alcohol',
    imageSrc: 'https://images.unsplash.com/photo-1629880518150-52a7608455fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    title: 'Sexual health',
    description: 'Information on contraception, sexually transmitted infections (STIs), and maintaining sexual health.',
    href: '/live-well/sexual-health',
    imageSrc: 'https://images.unsplash.com/photo-1585435421671-0c16737a364d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    title: 'Healthy weight',
    description: 'Advice on maintaining a healthy weight, understanding BMI, and weight management strategies.',
    href: '/live-well/healthy-weight',
    imageSrc: 'https://images.unsplash.com/photo-1521986329282-0436c1f1e212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=300&q=80',
  },
];

const LiveWellPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Live Well</h1>
          <p className="text-xl font-medium">
            Advice, tips and tools to help you make the best choices about your health and wellbeing
          </p>
        </div>
      </div>

      {/* Categories grid */}
      <div className="phb-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
            >
              {category.imageSrc && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.imageSrc}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              <div className="p-5 flex-grow flex flex-col">
                <h2 className="text-xl font-bold text-[#0891b2] mb-2">
                  <Link to={category.href} className="hover:underline">
                    {category.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 flex-grow">{category.description}</p>
                <Link
                  to={category.href}
                  className="text-[#0891b2] font-medium hover:underline flex items-center mt-auto"
                >
                  Learn more
                  <svg className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured content */}
      <div className="bg-gray-100 py-8">
        <div className="phb-container">
          <h2 className="text-2xl font-bold mb-6">Featured guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
              <h3 className="text-lg font-bold text-[#0891b2] mb-3">5-week workout plan</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                A beginner-friendly exercise plan that gradually increases in intensity over 5 weeks.
              </p>
              <Link
                to="/live-well/exercise/5-week-workout-plan"
                className="text-[#0891b2] font-medium hover:underline"
              >
                Get started
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
              <h3 className="text-lg font-bold text-[#0891b2] mb-3">Eat well for less</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Tips and recipes for eating healthily on a budget, with meal plans and shopping lists.
              </p>
              <Link
                to="/live-well/healthy-eating/budget-meal-planning"
                className="text-[#0891b2] font-medium hover:underline"
              >
                Read guide
              </Link>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
              <h3 className="text-lg font-bold text-[#0891b2] mb-3">Sleep improvement techniques</h3>
              <p className="text-gray-600 mb-4 flex-grow">
                Practical steps to improve your sleep quality and establish a healthy sleep routine.
              </p>
              <Link
                to="/live-well/sleep/better-sleep-techniques"
                className="text-[#0891b2] font-medium hover:underline"
              >
                View techniques
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tools section */}
      <div className="phb-container py-8">
        <h2 className="text-2xl font-bold mb-6">Health tools and calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#e8edee] rounded-lg p-6">
            <h3 className="text-lg font-bold mb-3">BMI calculator</h3>
            <p className="mb-4">Check your body mass index (BMI) to see if you're a healthy weight.</p>
            <Link
              to="/tools/bmi-calculator"
              className="bg-[#0891b2] text-white px-4 py-2 rounded-md hover:bg-[#0e7490] inline-block"
            >
              Calculate your BMI
            </Link>
          </div>
          <div className="bg-[#e8edee] rounded-lg p-6">
            <h3 className="text-lg font-bold mb-3">Calorie checker</h3>
            <p className="mb-4">Find out how many calories you need each day to maintain, lose or gain weight.</p>
            <Link
              to="/tools/calorie-calculator"
              className="bg-[#0891b2] text-white px-4 py-2 rounded-md hover:bg-[#0e7490] inline-block"
            >
              Check calories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveWellPage;
