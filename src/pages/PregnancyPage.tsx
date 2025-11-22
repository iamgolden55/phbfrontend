import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface PregnancyTopicType {
  title: string;
  description: string;
  href: string;
  imageSrc?: string;
  stage?: 'planning' | 'early' | 'middle' | 'late' | 'birth' | 'after';
}

interface PregnancyToolType {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

const pregnancyTopics: PregnancyTopicType[] = [
  {
    title: 'Planning your pregnancy',
    description: 'Information and advice on getting pregnant, including how to improve your chances and when to seek help.',
    href: '/pregnancy/planning',
    imageSrc: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
    stage: 'planning',
  },
  {
    title: 'Early pregnancy',
    description: 'Information about early pregnancy symptoms, antenatal care, common concerns and preparing for your baby.',
    href: '/pregnancy/early',
    imageSrc: 'https://images.unsplash.com/photo-1584582868822-39d9d145a4a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
    stage: 'early',
  },
  {
    title: 'Middle pregnancy',
    description: 'Guidance on the second trimester, including scans, feeling your baby move, and staying comfortable.',
    href: '/pregnancy/middle',
    imageSrc: 'https://images.unsplash.com/photo-1537365587684-f490dae3bd54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
    stage: 'middle',
  },
  {
    title: 'Late pregnancy',
    description: 'Preparing for birth, knowing the signs of labor, and what to expect in the final weeks of pregnancy.',
    href: '/pregnancy/late',
    imageSrc: 'https://images.unsplash.com/photo-1595924738670-5e04dfc67fa7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
    stage: 'late',
  },
  {
    title: 'Labor and birth',
    description: 'Information on different types of birth, pain relief, what to bring to the hospital, and more.',
    href: '/pregnancy/labor-and-birth', // Updated path
    imageSrc: 'https://images.unsplash.com/photo-1548078153-52a79d1cd0f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
    stage: 'birth',
  },
  {
    title: 'After the birth',
    description: 'Advice on caring for yourself and your baby, breastfeeding, recovering after birth, and more.',
    href: '/pregnancy/after-birth',
    imageSrc: 'https://images.unsplash.com/photo-1625236305335-94da4b9e6696?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
    stage: 'after',
  },
  {
    title: 'Your pregnancy care',
    description: 'Information about appointments, check-ups, ultrasound scans and health in pregnancy.',
    href: '/pregnancy/care',
    imageSrc: 'https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    title: 'Health in pregnancy',
    description: 'Advice on managing common health problems in pregnancy and when to get help.',
    href: '/pregnancy/health',
    imageSrc: 'https://images.unsplash.com/photo-1516085172872-de2a0583037e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
  },
];

const popularTopics = [
  {
    title: 'Your first prenatal visit',
    description: 'What to expect and how to prepare for your first appointment with your midwife or doctor.',
    href: '/pregnancy/first-prenatal-visit',
    imageSrc: 'https://images.unsplash.com/photo-1584515976203-e9ef36901238?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    title: 'Early pregnancy symptoms',
    description: 'Understanding the first signs and symptoms of pregnancy and how to manage them.',
    href: '/pregnancy/early-pregnancy-symptoms',
    imageSrc: 'https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    title: 'Prenatal tests explained',
    description: 'A guide to the tests offered during pregnancy and what they mean for you and your baby.',
    href: '/pregnancy/prenatal-tests',
    imageSrc: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    title: 'Nutrition during pregnancy',
    description: 'Essential nutrition advice and meal ideas for maintaining a healthy pregnancy diet.',
    href: '/pregnancy/nutrition-guide',
    imageSrc: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    title: 'Signs of labor',
    description: 'Recognizing when labor is beginning and what to expect during childbirth.',
    href: '/pregnancy/signs-of-labor',
    imageSrc: 'https://images.unsplash.com/photo-1535185384036-28bbc8035f28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250&q=80',
  }
];

const pregnancyTools: PregnancyToolType[] = [
  {
    title: 'Due Date Calculator',
    description: 'Find out when your baby is due and track your pregnancy milestones.',
    href: '/tools/due-date-calculator',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Baby Kick Counter',
    description: 'Track your baby\'s movements to monitor their well-being.',
    href: '/tools/kick-counter',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Weight Gain Calculator',
    description: 'Calculate recommended pregnancy weight gain based on your BMI.',
    href: '/tools/weight-gain-calculator',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    title: 'Contraction Timer',
    description: 'Time your contractions during labor to know when to head to the hospital.',
    href: '/tools/contraction-timer',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600'
  },
  {
    title: 'Pregnancy Calendar',
    description: 'Track your baby\'s development and changes week by week.',
    href: '/pregnancy/calendar',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    title: 'Baby Names Directory',
    description: 'Find the perfect name for your baby with searchable options.',
    href: '/pregnancy/baby-names-directory',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Baby Shower Planner',
    description: 'Plan your perfect celebration with checklists and templates.',
    href: '/pregnancy/baby-shower-planner',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    bgColor: 'bg-pink-100',
    iconColor: 'text-pink-600'
  },
  {
    title: 'Nutrition Guide',
    description: 'Essential nutrition advice and meal ideas for a healthy pregnancy.',
    href: '/pregnancy/nutrition-guide',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    title: 'Birth Plan Creator',
    description: 'Create a personalized birth plan to share with your healthcare team.',
    href: '/pregnancy/birth-plan-creator',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
];

const PregnancyPage: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [progressBarWidth, setProgressBarWidth] = useState('0%');

  // Determine current week and set selected stage based on it
  useEffect(() => {
    // Check if due date is stored in localStorage
    const savedDueDate = localStorage.getItem('pregnancyDueDate');

    if (savedDueDate) {
      const dueDate = new Date(savedDueDate);
      const today = new Date();

      // Calculate LMP (Last Menstrual Period) from due date
      const lmpDate = new Date(dueDate);
      lmpDate.setDate(lmpDate.getDate() - 280); // 40 weeks = 280 days

      // Calculate difference in days
      const diffTime = Math.abs(today.getTime() - lmpDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Convert to weeks
      const weeks = Math.floor(diffDays / 7);

      if (weeks >= 1 && weeks <= 42) {
        setCurrentWeek(weeks);

        // Map week to pregnancy stage
        let stage = '';
        if (weeks < 1) {
          stage = 'planning';
        } else if (weeks <= 12) {
          stage = 'early';
          setProgressBarWidth('20%');
        } else if (weeks <= 27) {
          stage = 'middle';
          setProgressBarWidth('40%');
        } else if (weeks <= 36) {
          stage = 'late';
          setProgressBarWidth('60%');
        } else if (weeks <= 40) {
          stage = 'birth';
          setProgressBarWidth('80%');
        } else {
          stage = 'after';
          setProgressBarWidth('100%');
        }

        setSelectedStage(stage);
      }
    }
  }, []);

  // Function to handle stage click
  const handleStageClick = (stage: string) => {
    setSelectedStage(stage);
  };

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Pregnancy</h1>
          <p className="text-xl font-medium">
            Information and advice to help you through all stages of your pregnancy
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        {/* Journey through pregnancy */}
        <h2 className="text-2xl font-bold mb-6">Your pregnancy journey</h2>
        <div className="relative mb-12">
          {/* Progress bar (desktop) */}
          <div className="hidden md:block absolute top-14 left-0 w-full h-2 bg-gray-200 rounded-full z-0">
            <div
              className="absolute top-0 left-0 h-full bg-[#0891b2] rounded-full transform origin-left"
              style={{ width: progressBarWidth }}
            ></div>
          </div>

          {/* Stages */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-y-6 md:gap-x-2">
            {['planning', 'early', 'middle', 'late', 'birth', 'after'].map((stage, index) => {
              const stageData = pregnancyTopics.find(topic => topic.stage === stage);
              const isSelected = selectedStage === stage;
              const isCurrent = currentWeek !== null && (
                (stage === 'planning' && currentWeek < 1) ||
                (stage === 'early' && currentWeek >= 1 && currentWeek <= 12) ||
                (stage === 'middle' && currentWeek > 12 && currentWeek <= 27) ||
                (stage === 'late' && currentWeek > 27 && currentWeek <= 36) ||
                (stage === 'birth' && currentWeek > 36 && currentWeek <= 40) ||
                (stage === 'after' && currentWeek > 40)
              );

              return (
                <div key={index} className="relative flex flex-col items-center">
                  {/* Circle and number for desktop */}
                  <div
                    className={`hidden md:flex h-8 w-8 rounded-full items-center justify-center font-bold text-lg z-10 cursor-pointer
                      ${isSelected || isCurrent ? 'bg-[#0891b2] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    onClick={() => handleStageClick(stage)}
                  >
                    {index + 1}
                  </div>

                  {/* Stage content */}
                  <div className="mt-2 text-center">
                    <h3 className="font-bold text-sm mb-1">
                      {stageData ? (
                        <Link
                          to={stageData.href}
                          className={`hover:underline ${isSelected || isCurrent ? 'text-[#0891b2] font-bold' : 'text-gray-700'}`}
                        >
                          {stageData.title}
                        </Link>
                      ) : (
                        `Stage ${index + 1}`
                      )}
                    </h3>
                    {stageData && (
                      <p className="text-xs text-gray-600 hidden md:block">
                        {stageData.description.slice(0, 60)}...
                      </p>
                    )}
                    {isCurrent && (
                      <span className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full mt-1">
                        You are here
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {currentWeek && (
            <div className="mt-4 text-center">
              <p className="text-blue-600">
                <span className="font-bold">Week {currentWeek}</span> of your pregnancy.{' '}
                <Link to="/pregnancy/calendar" className="underline">
                  View detailed week by week guide
                </Link>
              </p>
            </div>
          )}

          {!currentWeek && (
            <div className="mt-4 text-center">
              <Link
                to="/tools/due-date-calculator"
                className="text-blue-600 underline"
              >
                Calculate your due date to personalize your journey
              </Link>
            </div>
          )}
        </div>

        {/* Popular pregnancy topics */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular pregnancy topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTopics.map((topic, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full"
              >
                {topic.imageSrc && (
                  <Link to={topic.href}>
                    <div className="h-40 overflow-hidden">
                      <img
                        src={topic.imageSrc}
                        alt={topic.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                )}
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-lg font-bold text-[#0891b2] mb-2">
                    <Link to={topic.href} className="hover:underline">
                      {topic.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">{topic.description}</p>
                  <Link
                    to={topic.href}
                    className="text-[#0891b2] font-medium hover:underline flex items-center mt-auto text-sm"
                  >
                    Read more
                    <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Pregnancy Tools */}
        <h2 className="text-2xl font-bold mb-6">Interactive Pregnancy Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pregnancyTools.map((tool, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-3">
                <div className={`${tool.bgColor} p-3 rounded-full ${tool.iconColor} mr-3`}>
                  {tool.icon}
                </div>
                <h3 className="font-bold">{tool.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {tool.description}
              </p>
              <Link
                to={tool.href}
                className="text-[#0891b2] font-medium hover:underline flex items-center text-sm"
              >
                Try it now
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Featured guides */}
        <h2 className="text-2xl font-bold mb-6">Pregnancy guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pregnancyTopics.map((topic, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
            >
              {topic.imageSrc && (
                <Link to={topic.href}>
                  <div className="h-40 overflow-hidden">
                    <img
                      src={topic.imageSrc}
                      alt={topic.title}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
              )}
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-[#0891b2] mb-2">
                  <Link to={topic.href} className="hover:underline">
                    {topic.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">{topic.description}</p>
                <Link
                  to={topic.href}
                  className="text-[#0891b2] font-medium hover:underline flex items-center mt-auto text-sm"
                >
                  Read more
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Health concerns */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">Health concerns during pregnancy</h2>
          <p className="mb-6">
            If you're concerned about your health or your baby's health during pregnancy, contact your midwife or GP as soon as possible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-md border border-gray-200">
              <h3 className="font-bold mb-2">Symptoms not to ignore</h3>
              <ul className="text-sm space-y-1">
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Vaginal bleeding</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Severe abdominal pain</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Reduced baby movements</span>
                </li>
              </ul>
              <Link to="/pregnancy/concerns" className="text-[#0891b2] text-sm hover:underline block mt-3">
                See all symptoms
              </Link>
            </div>

            <div className="bg-white p-4 rounded-md border border-gray-200">
              <h3 className="font-bold mb-2">Common concerns</h3>
              <ul className="text-sm space-y-1">
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-[#0891b2] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <Link to="/pregnancy/concerns/morning-sickness" className="hover:underline">Morning sickness</Link>
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-[#0891b2] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <Link to="/pregnancy/concerns/tiredness" className="hover:underline">Extreme tiredness</Link>
                </li>
                <li className="flex items-start">
                  <svg className="h-4 w-4 text-[#0891b2] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <Link to="/pregnancy/concerns/back-pain" className="hover:underline">Back pain</Link>
                </li>
              </ul>
              <Link to="/pregnancy/common-concerns" className="text-[#0891b2] text-sm hover:underline block mt-3">
                See all common concerns
              </Link>
            </div>

            <div className="bg-white p-4 rounded-md border border-gray-200">
              <h3 className="font-bold mb-2">Get help</h3>
              <p className="text-sm mb-4">
                If you're worried about your health or your baby, contact:
              </p>
              <ul className="text-sm space-y-2">
                <li className="flex items-start">
                  <span className="font-bold mr-2">•</span>
                  <span>Your midwife or maternity unit</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">•</span>
                  <span>Your GP</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">•</span>
                  <span>PHB 111 service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Parenting classes */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Antenatal classes and workshops</h2>
            <p className="mb-6">
              Antenatal classes can help you and your partner prepare for labor, birth and early parenthood. They're a good way to meet other expectant parents in your area.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-bold mb-2">PHB antenatal classes</h3>
                <p className="text-sm mb-3">Free classes offered by your local PHB trust, covering pregnancy, labor and birth.</p>
                <Link to="/pregnancy/antenatal-classes" className="text-[#0891b2] text-sm hover:underline">
                  Find local classes
                </Link>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-bold mb-2">Online resources</h3>
                <p className="text-sm mb-3">Videos, online courses and digital tools to help you prepare for parenthood.</p>
                <Link to="/pregnancy/online-resources" className="text-[#0891b2] text-sm hover:underline">
                  Explore online resources
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Due date calculator */}
        <div className="bg-[#0891b2] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">When is my baby due?</h2>
            <p className="mb-6">
              Use our pregnancy due date calculator to work out when your baby is due.
            </p>
            <Link
              to="/tools/due-date-calculator"
              className="bg-white text-[#0891b2] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
            >
              Calculate your due date
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyPage;
