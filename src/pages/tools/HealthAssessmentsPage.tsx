import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Define assessment types
interface Assessment {
  id: string;
  title: string;
  description: string;
  duration: string;
  questions: number;
  category: 'physical' | 'mental' | 'lifestyle' | 'risk';
  popular: boolean;
}

const assessments: Assessment[] = [
  {
    id: 'health-check',
    title: 'General Health Check',
    description: 'A comprehensive assessment of your overall health status and risk factors',
    duration: '5-10 minutes',
    questions: 25,
    category: 'physical',
    popular: true
  },
  {
    id: 'mental-wellbeing',
    title: 'Mental Wellbeing Assessment',
    description: 'Evaluate your mental health, stress levels, and emotional wellbeing',
    duration: '5 minutes',
    questions: 15,
    category: 'mental',
    popular: true
  },
  {
    id: 'heart-disease-risk',
    title: 'Heart Disease Risk Calculator',
    description: 'Assess your risk of developing cardiovascular disease in the next 10 years',
    duration: '3-5 minutes',
    questions: 12,
    category: 'risk',
    popular: true
  },
  {
    id: 'diabetes-risk',
    title: 'Type 2 Diabetes Risk Assessment',
    description: 'Check your risk of developing type 2 diabetes based on lifestyle and family history',
    duration: '3 minutes',
    questions: 8,
    category: 'risk',
    popular: false
  },
  {
    id: 'sleep-quality',
    title: 'Sleep Quality Assessment',
    description: 'Evaluate the quality of your sleep and identify potential sleep issues',
    duration: '4 minutes',
    questions: 10,
    category: 'lifestyle',
    popular: false
  },
  {
    id: 'nutrition',
    title: 'Nutritional Health Assessment',
    description: 'Analyze your diet and eating habits to identify areas for improvement',
    duration: '7 minutes',
    questions: 20,
    category: 'lifestyle',
    popular: false
  },
  {
    id: 'depression-screening',
    title: 'Depression Screening (PHQ-9)',
    description: 'A validated screening tool for detecting depression',
    duration: '2-3 minutes',
    questions: 9,
    category: 'mental',
    popular: true
  },
  {
    id: 'anxiety-screening',
    title: 'Anxiety Screening (GAD-7)',
    description: 'A validated screening tool for detecting anxiety disorders',
    duration: '2 minutes',
    questions: 7,
    category: 'mental',
    popular: false
  }
];

const HealthAssessmentsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter assessments based on active category and search term
  const filteredAssessments = assessments.filter(assessment => {
    const matchesCategory = activeCategory === 'all' || assessment.category === activeCategory;
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        assessment.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group assessments by category - for the sidebar
  const assessmentsByCategory = {
    physical: assessments.filter(a => a.category === 'physical').length,
    mental: assessments.filter(a => a.category === 'mental').length,
    lifestyle: assessments.filter(a => a.category === 'lifestyle').length,
    risk: assessments.filter(a => a.category === 'risk').length,
  };

  // Function to get category name
  const getCategoryName = (category: Assessment['category']) => {
    switch (category) {
      case 'physical':
        return 'Physical Health';
      case 'mental':
        return 'Mental Health';
      case 'lifestyle':
        return 'Lifestyle';
      case 'risk':
        return 'Risk Assessment';
      default:
        return category;
    }
  };

  // Function to get category color
  const getCategoryColor = (category: Assessment['category']) => {
    switch (category) {
      case 'physical':
        return 'text-blue-700 bg-blue-100';
      case 'mental':
        return 'text-purple-700 bg-purple-100';
      case 'lifestyle':
        return 'text-green-700 bg-green-100';
      case 'risk':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Health Assessments</h1>
          <p className="text-xl font-medium">
            Take assessments to understand your health and get personalized recommendations
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Categories</h2>

              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    All Assessments
                    <span className="float-right font-medium">{assessments.length}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveCategory('physical')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === 'physical'
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Physical Health
                    <span className="float-right font-medium">{assessmentsByCategory.physical}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveCategory('mental')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === 'mental'
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Mental Health
                    <span className="float-right font-medium">{assessmentsByCategory.mental}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveCategory('lifestyle')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === 'lifestyle'
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Lifestyle
                    <span className="float-right font-medium">{assessmentsByCategory.lifestyle}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveCategory('risk')}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === 'risk'
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    Risk Assessment
                    <span className="float-right font-medium">{assessmentsByCategory.risk}</span>
                  </button>
                </li>
              </ul>

              <hr className="my-4 border-gray-200" />

              <h3 className="font-bold mb-3">Popular Assessments</h3>
              <ul className="space-y-2">
                {assessments
                  .filter(a => a.popular)
                  .map(assessment => (
                    <li key={assessment.id}>
                      <Link
                        to={`/tools/health-assessments/${assessment.id}`}
                        className="text-[#005eb8] hover:underline block py-1"
                      >
                        {assessment.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search assessments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {activeCategory !== 'all' && (
                <div className="mt-4">
                  <h2 className="text-2xl font-bold mb-2">{getCategoryName(activeCategory as Assessment['category'])}</h2>
                  <p className="text-gray-600">
                    {activeCategory === 'physical' && 'Assessments related to your physical health and bodily functions.'}
                    {activeCategory === 'mental' && 'Tools to evaluate your mental wellbeing and psychological health.'}
                    {activeCategory === 'lifestyle' && 'Assessments of your daily habits and lifestyle choices.'}
                    {activeCategory === 'risk' && 'Calculate your risk for various health conditions.'}
                  </p>
                </div>
              )}
            </div>

            {filteredAssessments.length === 0 ? (
              <div className="bg-gray-50 p-8 text-center rounded-md">
                <p className="text-gray-600 mb-4">No assessments found matching your search.</p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchTerm('');
                  }}
                  className="text-[#005eb8] hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAssessments.map(assessment => (
                  <div key={assessment.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold">{assessment.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(assessment.category)}`}>
                        {getCategoryName(assessment.category)}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">
                      {assessment.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {assessment.duration}
                      </div>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {assessment.questions} questions
                      </div>
                    </div>

                    <Link
                      to={`/tools/health-assessments/${assessment.id}`}
                      className="block w-full bg-[#005eb8] hover:bg-[#003f7e] text-white text-center py-2 rounded-md transition-colors"
                    >
                      Start Assessment
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthAssessmentsPage;
