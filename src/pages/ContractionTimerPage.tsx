import React from 'react';
import { Link } from 'react-router-dom';
import ContractionTimer from '../features/pregnancy/ContractionTimer';

const ContractionTimerPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <div className="flex items-center mb-2">
            <Link to="/pregnancy" className="text-white hover:underline mr-2">
              Pregnancy
            </Link>
            <span className="mx-2">›</span>
            <span>Contraction Timer</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Contraction Timer</h1>
          <p className="text-xl">
            Track the frequency and duration of your contractions during labor
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">When to Use This Tool</h2>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-800">
              Use this tool when you're experiencing regular contractions to help determine when it might be time to go to the hospital or birth center.
            </p>
          </div>
          <p className="mb-4">
            Timing your contractions helps you and your healthcare provider track the progress of your labor. Contractions typically start irregularly and gradually become more regular, longer, and stronger as labor progresses.
          </p>
          <p className="mb-4">
            <strong>How to use this tool:</strong>
          </p>
          <ol className="list-decimal pl-6 mb-6 space-y-2">
            <li>Press "Start Contraction" when a contraction begins</li>
            <li>Press "Stop Contraction" when the contraction ends</li>
            <li>The tool will automatically calculate the duration of each contraction and the interval between contractions</li>
            <li>Continue timing your contractions for at least an hour</li>
          </ol>
        </div>

        <ContractionTimer />

        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">When to Contact Your Healthcare Provider</h2>
          <p className="mb-4">
            Generally, it's time to go to the hospital or birth center when:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>For first-time mothers:</strong> Contractions are coming regularly 5 minutes apart, lasting for 1 minute each, for at least 1 hour (the 5-1-1 rule)</li>
            <li><strong>For experienced mothers:</strong> Contractions are coming regularly 7-10 minutes apart, lasting for 45-60 seconds each</li>
            <li><strong>If your water breaks</strong>, regardless of whether you're having contractions</li>
            <li><strong>If you have bright red vaginal bleeding</strong> that resembles a period flow</li>
            <li><strong>If you notice decreased fetal movement</strong></li>
          </ul>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <p className="text-yellow-800">
              <strong>Important:</strong> This tool is not a substitute for medical advice. Always contact your healthcare provider if you're unsure about your labor progress or have any concerns.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Other Pregnancy Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Due Date Calculator</h3>
              <p className="text-sm text-gray-600 mb-3">Find out when your baby is due based on your last period or conception date.</p>
              <Link to="/tools/due-date-calculator" className="text-[#005eb8] hover:underline text-sm">
                Calculate your due date →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Baby Kick Counter</h3>
              <p className="text-sm text-gray-600 mb-3">Track your baby's movements to monitor their well-being.</p>
              <Link to="/tools/kick-counter" className="text-[#005eb8] hover:underline text-sm">
                Count baby kicks →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Weight Gain Calculator</h3>
              <p className="text-sm text-gray-600 mb-3">Calculate recommended pregnancy weight gain based on your pre-pregnancy BMI.</p>
              <Link to="/tools/weight-gain-calculator" className="text-[#005eb8] hover:underline text-sm">
                Check weight guidelines →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractionTimerPage;
