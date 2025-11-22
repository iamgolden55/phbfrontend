import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FiveWeekWorkoutPlanPage: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <nav className="text-sm mb-4">
            <Link to="/live-well" className="hover:underline">Live well</Link>
            <span className="mx-2">›</span>
            <Link to="/live-well/exercise" className="hover:underline">Exercise</Link>
            <span className="mx-2">›</span>
            <span>5-week workout plan</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">5-Week Beginner Workout Plan</h1>
          <p className="text-xl font-medium">
            A progressive fitness program designed to build strength, endurance, and healthy habits
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Program overview */}
        <div className="bg-gray-50 border-l-4 border-gray-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-gray-800">Program overview</h2>
          <p className="mb-4 text-gray-700">
            This 5-week program is designed for beginners or those returning to exercise. 
            Each week progressively builds on the previous, gradually increasing intensity.
          </p>
          <p className="text-gray-700">
            <strong>Equipment needed:</strong> Just your body weight, a sturdy chair, and optional water bottles.
          </p>
        </div>

        {/* Coming soon message for now */}
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">🚧 Workout Plan Coming Soon!</h2>
          <p className="text-gray-600 mb-6">
            We're putting the finishing touches on your comprehensive 5-week workout program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/live-well/exercise"
              className="bg-[#0891b2] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block font-bold"
            >
              Explore other exercises
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiveWeekWorkoutPlanPage;