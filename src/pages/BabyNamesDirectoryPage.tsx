import React from 'react';
import { Link } from 'react-router-dom';
import BabyNamesDirectory from '../features/pregnancy/BabyNamesDirectory';

const BabyNamesDirectoryPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <div className="flex items-center mb-2">
            <Link to="/pregnancy" className="text-white hover:underline mr-2">
              Pregnancy
            </Link>
            <span className="mx-2">›</span>
            <span>Baby Names Directory</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Baby Names Directory</h1>
          <p className="text-xl">
            Find the perfect name for your baby with our searchable database
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Finding the Perfect Name</h2>
          <p className="mb-4">
            Choosing a name for your baby is one of the most important decisions you'll make during pregnancy. Our baby names directory can help you:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Search through hundreds of names by origin, gender, or meaning</li>
            <li>Filter by first letter to find names beginning with your favorite letter</li>
            <li>Save your favorite names to compare later</li>
            <li>Learn about the meaning and origin of each name</li>
            <li>Discover popular, rising, and unique name options</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-800">
              Take your time exploring different options. Your favorites will be saved across visits, allowing you to build a personalized shortlist.
            </p>
          </div>
        </div>

        <BabyNamesDirectory />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Naming Considerations</h2>
            <p className="mb-3">When choosing your baby's name, consider:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <span>How the name will sound with your surname and any middle names</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <span>Any potential nicknames or shortened versions of the name</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <span>Cultural or family significance that might be important to you</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <span>How the name might affect your child at different stages of life</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <span>The uniqueness or popularity of the name in your community</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Popular Naming Trends</h2>
            <p className="mb-3">Current popular trends in baby naming include:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <span><strong>Nature-inspired names:</strong> Like Willow, River, Sage, and Jasper</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <span><strong>Gender-neutral options:</strong> Such as Riley, Avery, Quinn, and Jordan</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <span><strong>Vintage revivals:</strong> Including Theodore, Florence, Arthur, and Evelyn</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <span><strong>Short, simple names:</strong> Like Mia, Nova, Leo, and Kai</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <span><strong>Cultural heritage:</strong> Names that reflect family background or ancestry</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Other Pregnancy Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Baby Shower Planner</h3>
              <p className="text-sm text-gray-600 mb-3">Plan the perfect celebration with our checklist and invitation templates.</p>
              <Link to="/pregnancy/baby-shower-planner" className="text-[#005eb8] hover:underline text-sm">
                Start planning →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Birth Plan Creator</h3>
              <p className="text-sm text-gray-600 mb-3">Create a personalized birth plan to share with your healthcare team.</p>
              <Link to="/pregnancy/birth-plan-creator" className="text-[#005eb8] hover:underline text-sm">
                Create your plan →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Pregnancy Calendar</h3>
              <p className="text-sm text-gray-600 mb-3">Track your baby's development week by week throughout your pregnancy.</p>
              <Link to="/pregnancy/calendar" className="text-[#005eb8] hover:underline text-sm">
                View calendar →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabyNamesDirectoryPage;
