import React from 'react';
import BMICalculator from '../features/calculators/BMICalculator';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const HealthAssessmentBMICalculatorPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Health Assessment Tools', url: '/health-assessment-tools' },
              { label: 'Calculate Your BMI', url: '/health-assessment-tools/calculate-your-bmi' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Calculate Your BMI</h1>
          <p className="text-xl font-medium">
            Determine if you're a healthy weight using our Body Mass Index (BMI) calculator
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <BMICalculator />
          </div>

          <div className="col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-xl font-bold mb-4">What is BMI?</h2>
              <p className="mb-4">
                BMI (Body Mass Index) is a measurement that helps to determine whether you are a healthy weight for your height.
              </p>
              <p className="mb-4">
                BMI is calculated by dividing your weight in kilograms by your height in meters squared. In the imperial system,
                the formula is weight (pounds) multiplied by 703, divided by height (inches) squared.
              </p>
              <p>
                While BMI is useful for most people, it has some limitations. It may not be accurate for athletes, pregnant
                women, or the elderly.
              </p>
            </div>

            <div className="bg-[#e8edee] p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Health risks of being overweight</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Increased risk of type 2 diabetes</li>
                <li>Higher chance of heart disease and stroke</li>
                <li>Greater likelihood of certain cancers</li>
                <li>Respiratory problems and sleep apnea</li>
                <li>Joint pain and mobility issues</li>
              </ul>
              <div className="mt-6">
                <Link to="/live-well/healthy-weight" className="text-[#005eb8] font-medium hover:underline">
                  Learn more about maintaining a healthy weight
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Other health assessment tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/tools/health-assessments/health-check"
              className="bg-[#f0f4f5] p-5 rounded-md hover:bg-[#e8edee] transition-colors flex flex-col"
            >
              <h3 className="text-lg font-bold mb-2 text-[#005eb8]">Health Check Assessment</h3>
              <p className="text-sm text-gray-600 mb-3">Take our comprehensive health check to evaluate your overall wellbeing.</p>
              <span className="text-[#005eb8] font-medium mt-auto flex items-center">
                Start assessment
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link
              to="/tools/health-assessments/mental-wellbeing"
              className="bg-[#f0f4f5] p-5 rounded-md hover:bg-[#e8edee] transition-colors flex flex-col"
            >
              <h3 className="text-lg font-bold mb-2 text-[#005eb8]">Mental Wellbeing Assessment</h3>
              <p className="text-sm text-gray-600 mb-3">Evaluate your mental health and get personalized recommendations.</p>
              <span className="text-[#005eb8] font-medium mt-auto flex items-center">
                Start assessment
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
            <Link
              to="/tools/weight-gain-calculator"
              className="bg-[#f0f4f5] p-5 rounded-md hover:bg-[#e8edee] transition-colors flex flex-col"
            >
              <h3 className="text-lg font-bold mb-2 text-[#005eb8]">Weight Gain Calculator</h3>
              <p className="text-sm text-gray-600 mb-3">Track healthy weight gain during pregnancy with our specialized calculator.</p>
              <span className="text-[#005eb8] font-medium mt-auto flex items-center">
                Use calculator
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthAssessmentBMICalculatorPage;
