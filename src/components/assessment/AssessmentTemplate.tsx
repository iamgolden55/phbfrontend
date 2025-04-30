import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export interface AssessmentQuestion {
  id: string;
  text: string;
  options: {
    value: string | number;
    label: string;
    description?: string;
  }[];
  required?: boolean;
}

export interface AssessmentProps {
  id: string;
  title: string;
  description: string;
  introduction?: string;
  questions: AssessmentQuestion[];
  onComplete?: (answers: Record<string, string | number>) => void;
  calculateScore?: (answers: Record<string, string | number>) => {
    score: number;
    interpretation: string;
    recommendations: string[];
    riskLevel?: 'low' | 'moderate' | 'high' | 'very-high';
  };
}

const AssessmentTemplate: React.FC<AssessmentProps> = ({
  id,
  title,
  description,
  introduction,
  questions,
  calculateScore,
}) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [results, setResults] = useState<{
    score: number;
    interpretation: string;
    recommendations: string[];
    riskLevel?: 'low' | 'moderate' | 'high' | 'very-high';
  } | null>(null);

  // Check if a question is answered
  const isQuestionAnswered = (questionId: string): boolean => {
    return Object.prototype.hasOwnProperty.call(answers, questionId);
  };

  const handleAnswer = (questionId: string, value: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      // Check if current question is answered if it's required
      const currentQuestion = questions[currentStep];
      if (currentQuestion.required && !isQuestionAnswered(currentQuestion.id)) {
        // Show error message or handle required validation
        return;
      }
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // This is the last question
      if (calculateScore) {
        const scoreResults = calculateScore(answers);
        setResults(scoreResults);
      }
      setShowResults(true);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
    setResults(null);
    window.scrollTo(0, 0);
  };

  // Progress calculation
  const progress = showResults ? 100 : Math.round(((currentStep + 1) / questions.length) * 100);

  // Get risk level color
  const getRiskLevelColor = (riskLevel?: string) => {
    switch (riskLevel) {
      case 'low':
        return 'text-green-700 bg-green-100';
      case 'moderate':
        return 'text-yellow-700 bg-yellow-100';
      case 'high':
        return 'text-orange-700 bg-orange-100';
      case 'very-high':
        return 'text-red-700 bg-red-100';
      default:
        return 'text-blue-700 bg-blue-100';
    }
  };

  // Helper function to check if the answer matches the option value
  const isOptionSelected = (questionId: string, optionValue: string | number) => {
    return answers[questionId] === optionValue;
  };

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <div className="flex items-center mb-2">
            <Link to="/tools/health-assessments" className="text-white hover:underline flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Assessments
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-xl font-medium">{description}</p>
        </div>
      </div>

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="phb-container py-4">
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {showResults
              ? 'Assessment Complete'
              : `Question ${currentStep + 1} of ${questions.length}`}
          </div>
        </div>
      </div>

      <div className="phb-container py-8">
        {!showResults ? (
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
            {currentStep === 0 && introduction && (
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <h3 className="font-bold text-blue-800 mb-2">Before You Begin</h3>
                <div className="text-blue-700">{introduction}</div>
              </div>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{questions[currentStep].text}</h2>
              <div className="space-y-4">
                {questions[currentStep].options.map((option, index) => (
                  <div
                    key={index}
                    className={`border rounded-md p-4 cursor-pointer transition-colors ${
                      isOptionSelected(questions[currentStep].id, option.value)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                          isOptionSelected(questions[currentStep].id, option.value)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {isOptionSelected(questions[currentStep].id, option.value) && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{option.label}</div>
                        {option.description && (
                          <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                className={`px-6 py-2 rounded-md ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                disabled={currentStep === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className={`px-6 py-2 rounded-md bg-[#005eb8] hover:bg-[#003f7e] text-white transition-colors ${
                  questions[currentStep].required && !isQuestionAnswered(questions[currentStep].id)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                disabled={questions[currentStep].required && !isQuestionAnswered(questions[currentStep].id)}
              >
                {currentStep === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Assessment Completed</h2>
              <p className="text-gray-600">
                Thank you for completing the {title}. Review your results below.
              </p>
            </div>

            {results && (
              <div className="mb-8">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">Your Score</h3>
                    {results.riskLevel && (
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(
                          results.riskLevel
                        )}`}
                      >
                        {results.riskLevel.charAt(0).toUpperCase() + results.riskLevel.slice(1)} Risk
                      </span>
                    )}
                  </div>
                  <div className="bg-gray-100 p-4 rounded-md text-center">
                    <span className="text-4xl font-bold">{results.score}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-2">What This Means</h3>
                  <div className="bg-blue-50 p-4 rounded-md">
                    <p className="text-blue-800">{results.interpretation}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Recommendations</h3>
                  <ul className="bg-gray-50 p-4 rounded-md space-y-2">
                    {results.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleRestart}
                className="px-6 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Take Assessment Again
              </button>
              <Link
                to="/tools/health-assessments"
                className="px-6 py-2 rounded-md bg-[#005eb8] hover:bg-[#003f7e] text-white transition-colors text-center"
              >
                Find More Assessments
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentTemplate;
