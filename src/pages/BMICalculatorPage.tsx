import React from 'react';
import BMICalculator from '../features/calculators/BMICalculator';

const BMICalculatorPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">BMI Calculator</h1>
          <p className="text-xl font-medium">
            Calculate your Body Mass Index (BMI) and find out if you're a healthy weight
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
              <h2 className="text-xl font-bold mb-4">About BMI</h2>
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
              <h2 className="text-xl font-bold mb-4">Why maintaining a healthy weight matters</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Reduces risk of heart disease and stroke</li>
                <li>Lowers risk of type 2 diabetes</li>
                <li>Reduces joint pain and mobility issues</li>
                <li>Improves energy levels and general wellbeing</li>
                <li>May help with mental health and self-esteem</li>
              </ul>
              <div className="mt-6">
                <a href="/live-well/healthy-weight" className="phb-link">
                  Learn more about maintaining a healthy weight
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">Next steps for a healthier life</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/live-well/healthy-eating"
              className="bg-[#f0f4f5] p-5 rounded-md hover:bg-[#e8edee] transition-colors flex flex-col"
            >
              <h3 className="text-lg font-bold mb-2 text-[#0891b2]">Healthy eating</h3>
              <p className="text-sm text-gray-600 mb-3">Discover the benefits of a balanced diet and get tips for healthy eating.</p>
              <span className="text-[#0891b2] font-medium mt-auto flex items-center">
                Read more
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            <a
              href="/live-well/exercise"
              className="bg-[#f0f4f5] p-5 rounded-md hover:bg-[#e8edee] transition-colors flex flex-col"
            >
              <h3 className="text-lg font-bold mb-2 text-[#0891b2]">Exercise and fitness</h3>
              <p className="text-sm text-gray-600 mb-3">Find out how to get more active and improve your fitness level.</p>
              <span className="text-[#0891b2] font-medium mt-auto flex items-center">
                Read more
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            <a
              href="/phb-services"
              className="bg-[#f0f4f5] p-5 rounded-md hover:bg-[#e8edee] transition-colors flex flex-col"
            >
              <h3 className="text-lg font-bold mb-2 text-[#0891b2]">Get support</h3>
              <p className="text-sm text-gray-600 mb-3">Find local services that can help you achieve a healthy weight.</p>
              <span className="text-[#0891b2] font-medium mt-auto flex items-center">
                Find services
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculatorPage;
