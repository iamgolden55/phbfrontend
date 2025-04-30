import React from 'react';
import { Link } from 'react-router-dom';
import BirthPlanCreator from '../features/pregnancy/BirthPlanCreator';

const BirthPlanCreatorPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <div className="flex items-center mb-2">
            <Link to="/pregnancy" className="text-white hover:underline mr-2">
              Pregnancy
            </Link>
            <span className="mx-2">›</span>
            <span>Birth Plan Creator</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Birth Plan Creator</h1>
          <p className="text-xl">
            Create a personalized birth plan to share with your healthcare team
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Creating Your Birth Plan</h2>
          <p className="mb-4">
            A birth plan is a document that lets your healthcare providers know your preferences for labor and delivery. While birth doesn't always go according to plan, having your wishes documented helps ensure your voice is heard during this important time.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Select your preferences from common options or add your own custom choices</li>
            <li>Explore different aspects of labor and delivery to consider</li>
            <li>Create a document you can share with your healthcare team</li>
            <li>Automatically save your progress to revisit and update later</li>
            <li>Export your completed plan as a text file or printable document</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-800">
              Remember that this tool is designed to help start a conversation with your healthcare provider. Be sure to discuss your preferences during prenatal appointments and remain flexible as your birth unfolds.
            </p>
          </div>
        </div>

        <BirthPlanCreator />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">When to Create Your Birth Plan</h2>
            <p className="mb-3">The best time to create your birth plan is during the third trimester, when:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <span>You've had time to research and consider your options</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <span>You've developed a relationship with your healthcare provider</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <span>You have a better understanding of any pregnancy complications that might affect your birth</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <span>You're close enough to your due date that your preferences likely won't change significantly</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <span>You still have time to discuss it with your provider at prenatal appointments</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Discussing Your Birth Plan</h2>
            <p className="mb-3">Tips for sharing your plan with your healthcare team:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <div>
                  <span className="font-medium">Keep it concise</span>
                  <p className="text-sm text-gray-600">A 1-2 page document is more likely to be read in full</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <div>
                  <span className="font-medium">Be specific but flexible</span>
                  <p className="text-sm text-gray-600">Clearly state preferences but acknowledge that medical necessity may require changes</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <div>
                  <span className="font-medium">Discuss it in advance</span>
                  <p className="text-sm text-gray-600">Review with your provider before your due date to address any concerns</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <div>
                  <span className="font-medium">Bring multiple copies</span>
                  <p className="text-sm text-gray-600">Have copies for your hospital bag, birth partner, and care team</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <div>
                  <span className="font-medium">Use positive language</span>
                  <p className="text-sm text-gray-600">Frame as preferences rather than demands ("I would prefer..." vs. "I don't want...")</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Other Pregnancy Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Baby Names Directory</h3>
              <p className="text-sm text-gray-600 mb-3">Find the perfect name for your baby with our searchable database.</p>
              <Link to="/pregnancy/baby-names-directory" className="text-[#005eb8] hover:underline text-sm">
                Browse names →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Pregnancy Calendar</h3>
              <p className="text-sm text-gray-600 mb-3">Track your baby's development week by week throughout your pregnancy.</p>
              <Link to="/pregnancy/calendar" className="text-[#005eb8] hover:underline text-sm">
                View calendar →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Contraction Timer</h3>
              <p className="text-sm text-gray-600 mb-3">Time your contractions during labor to know when to go to the hospital.</p>
              <Link to="/tools/contraction-timer" className="text-[#005eb8] hover:underline text-sm">
                Track contractions →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthPlanCreatorPage;
