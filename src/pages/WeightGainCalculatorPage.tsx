import React from 'react';
import { Link } from 'react-router-dom';
import WeightGainCalculator from '../features/pregnancy/WeightGainCalculator';

const WeightGainCalculatorPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <div className="flex items-center mb-2">
            <Link to="/pregnancy" className="text-white hover:underline mr-2">
              Pregnancy
            </Link>
            <span className="mx-2">›</span>
            <span>Weight Gain Calculator</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Pregnancy Weight Gain Calculator</h1>
          <p className="text-xl">
            Calculate your recommended pregnancy weight gain based on your pre-pregnancy BMI
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About This Tool</h2>
          <p className="mb-4">
            Maintaining a healthy weight during pregnancy is important for both mother and baby. This calculator helps you determine:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Your pre-pregnancy BMI (Body Mass Index)</li>
            <li>Recommended total weight gain for your entire pregnancy</li>
            <li>Recommended rate of weight gain per week</li>
            <li>Whether your current weight gain is on track (if you provide your current weight)</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-800">
              These are general guidelines based on recommendations from health organizations. Your healthcare provider may recommend different targets based on your specific health needs.
            </p>
          </div>
        </div>

        <WeightGainCalculator />

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Understanding Pregnancy Weight Gain</h2>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Where Does the Weight Go?</h3>
            <p className="mb-2">A typical weight distribution for a full-term pregnancy (in a woman of normal BMI) includes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Baby: 7-8 pounds (3.2-3.6 kg)</li>
              <li>Placenta: 1-2 pounds (0.5-0.9 kg)</li>
              <li>Amniotic fluid: 2 pounds (0.9 kg)</li>
              <li>Uterine enlargement: 2 pounds (0.9 kg)</li>
              <li>Maternal breast tissue: 2 pounds (0.9 kg)</li>
              <li>Maternal blood volume: 3-4 pounds (1.4-1.8 kg)</li>
              <li>Fluid in maternal tissue: 3-4 pounds (1.4-1.8 kg)</li>
              <li>Maternal fat stores: 5-9 pounds (2.3-4.1 kg)</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="font-bold mb-2">Weight Gain Pattern</h3>
            <p className="mb-2">Pregnancy weight gain is not usually consistent throughout the three trimesters:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>First trimester:</strong> Usually 1-5 pounds total (0.5-2.3 kg)</li>
              <li><strong>Second trimester:</strong> About 1 pound (0.5 kg) per week</li>
              <li><strong>Third trimester:</strong> About 1 pound (0.5 kg) per week until week 36-37, when weight gain often slows</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <p className="text-yellow-800">
              <strong>Important:</strong> Never attempt to lose weight during pregnancy. If you're concerned about your weight gain, speak with your healthcare provider for personalized advice.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Other Pregnancy Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Due Date Calculator</h3>
              <p className="text-sm text-gray-600 mb-3">Find out when your baby is due based on your last period or conception date.</p>
              <Link to="/tools/due-date-calculator" className="text-[#0891b2] hover:underline text-sm">
                Calculate your due date →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Baby Kick Counter</h3>
              <p className="text-sm text-gray-600 mb-3">Track your baby's movements to monitor their well-being.</p>
              <Link to="/tools/kick-counter" className="text-[#0891b2] hover:underline text-sm">
                Count baby kicks →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Contraction Timer</h3>
              <p className="text-sm text-gray-600 mb-3">Time your contractions during labor to know when to go to the hospital.</p>
              <Link to="/tools/contraction-timer" className="text-[#0891b2] hover:underline text-sm">
                Track contractions →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeightGainCalculatorPage;
