import React from 'react';
import { Link } from 'react-router-dom';
import BabyShowerPlanner from '../features/pregnancy/BabyShowerPlanner';

const BabyShowerPlannerPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <div className="flex items-center mb-2">
            <Link to="/pregnancy" className="text-white hover:underline mr-2">
              Pregnancy
            </Link>
            <span className="mx-2">›</span>
            <span>Baby Shower Planner</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Baby Shower Planner</h1>
          <p className="text-xl">
            Plan the perfect celebration with our interactive checklist and resources
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Planning Your Baby Shower</h2>
          <p className="mb-4">
            A baby shower is a special celebration to honor expectant parents and help them prepare for their new arrival. Our planner makes organizing this meaningful event easier with:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>A comprehensive planning checklist you can customize</li>
            <li>Beautiful invitation templates to inspire your design</li>
            <li>Fun game ideas to entertain your guests</li>
            <li>Expert planning tips for a stress-free celebration</li>
            <li>Timeline suggestions to keep your planning on track</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-800">
              Your progress is automatically saved, so you can return to your planning at any time. Check off items as you complete them and add any custom tasks specific to your event.
            </p>
          </div>
        </div>

        <BabyShowerPlanner />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Popular Themes</h2>
            <p className="mb-3">Consider these trending baby shower themes:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <div>
                  <span className="font-medium">Boho/Neutral</span>
                  <p className="text-sm text-gray-600">Natural elements, macramé, dried pampas grass, and earthy tones</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <div>
                  <span className="font-medium">Woodland Creatures</span>
                  <p className="text-sm text-gray-600">Forest animals, green foliage, mushrooms, and natural wood</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <div>
                  <span className="font-medium">Twinkle Twinkle Little Star</span>
                  <p className="text-sm text-gray-600">Stars, moons, navy blues, and golds with twinkling lights</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <div>
                  <span className="font-medium">Safari/Jungle</span>
                  <p className="text-sm text-gray-600">Cute jungle animals, tropical leaves, and natural textures</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <div>
                  <span className="font-medium">Gender Reveal Combined</span>
                  <p className="text-sm text-gray-600">Add a gender reveal element to your shower with pink and blue accents</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Menu Ideas</h2>
            <p className="mb-3">Simple but impressive food options:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <div>
                  <span className="font-medium">Grazing Table</span>
                  <p className="text-sm text-gray-600">Cheese, crackers, fruits, nuts, and dips for easy self-service</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <div>
                  <span className="font-medium">Tea Sandwiches</span>
                  <p className="text-sm text-gray-600">Cucumber, egg salad, and chicken varieties cut into small triangles</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <div>
                  <span className="font-medium">Individual Desserts</span>
                  <p className="text-sm text-gray-600">Cupcakes, cake pops, cookies, and brownies in theme colors</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <div>
                  <span className="font-medium">Mocktail Bar</span>
                  <p className="text-sm text-gray-600">Selection of alcohol-free punches, spritzers, and sparklers</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-[#005eb8] mr-2">•</span>
                <div>
                  <span className="font-medium">Themed Snacks</span>
                  <p className="text-sm text-gray-600">Baby-shaped or themed foods like baby booties cookies or "baby" vegetables</p>
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
              <h3 className="font-bold mb-2">Birth Plan Creator</h3>
              <p className="text-sm text-gray-600 mb-3">Create a personalized birth plan to share with your healthcare team.</p>
              <Link to="/pregnancy/birth-plan-creator" className="text-[#005eb8] hover:underline text-sm">
                Create your plan →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Pregnancy Nutrition Guide</h3>
              <p className="text-sm text-gray-600 mb-3">Learn about essential nutrients and meal planning for a healthy pregnancy.</p>
              <Link to="/pregnancy/nutrition-guide" className="text-[#005eb8] hover:underline text-sm">
                View nutrition guide →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BabyShowerPlannerPage;
