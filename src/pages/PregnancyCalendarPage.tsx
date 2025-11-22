import React from 'react';
import { Link } from 'react-router-dom';
import PregnancyCalendar from '../features/pregnancy/PregnancyCalendar';

const PregnancyCalendarPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <div className="flex items-center mb-2">
            <Link to="/pregnancy" className="text-white hover:underline mr-2">
              Pregnancy
            </Link>
            <span className="mx-2">›</span>
            <span>Pregnancy Calendar</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Pregnancy Calendar</h1>
          <p className="text-xl">
            Track your baby's development and your pregnancy week by week
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About the Pregnancy Calendar</h2>
          <p className="mb-4">
            Our pregnancy calendar helps you track your baby's growth and development from conception to birth. You'll find detailed information about:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>How your baby is developing each week</li>
            <li>Changes happening in your body</li>
            <li>What size your baby is compared to common objects</li>
            <li>Important milestones throughout your pregnancy</li>
            <li>Tips and advice for each stage of pregnancy</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-800">
              For a personalized experience, enter your due date to see which week of pregnancy you're currently in. You can then follow along with your baby's development in real-time.
            </p>
          </div>
        </div>

        <PregnancyCalendar />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Key Milestones</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-600 font-bold px-2 py-1 rounded-md mr-3 text-xs">Week 8</div>
                <div>
                  <p className="font-medium">All essential organs have begun forming</p>
                  <p className="text-sm text-gray-600">Baby's heart is beating and hands/feet are developing</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-100 text-blue-600 font-bold px-2 py-1 rounded-md mr-3 text-xs">Week 12</div>
                <div>
                  <p className="font-medium">End of first trimester</p>
                  <p className="text-sm text-gray-600">Baby has all essential organs and body parts</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 text-green-600 font-bold px-2 py-1 rounded-md mr-3 text-xs">Week 20</div>
                <div>
                  <p className="font-medium">Halfway point; detailed anatomy scan</p>
                  <p className="text-sm text-gray-600">Baby can hear sounds and is developing hair</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 text-green-600 font-bold px-2 py-1 rounded-md mr-3 text-xs">Week 24</div>
                <div>
                  <p className="font-medium">Viability milestone</p>
                  <p className="text-sm text-gray-600">Baby has a chance of survival if born now with medical help</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-purple-100 text-purple-600 font-bold px-2 py-1 rounded-md mr-3 text-xs">Week 37</div>
                <div>
                  <p className="font-medium">Full-term pregnancy begins</p>
                  <p className="text-sm text-gray-600">Baby is considered fully developed</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Pregnancy Appointments Calendar</h2>
            <p className="mb-4">Typical schedule for prenatal appointments:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="font-bold text-gray-700 mr-2">Weeks 4-8:</span>
                <span>First prenatal visit (confirmation of pregnancy)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-gray-700 mr-2">Weeks 10-13:</span>
                <span>NIPT blood test, nuchal translucency ultrasound</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-gray-700 mr-2">Weeks 16-20:</span>
                <span>Quad screen blood test, amniocentesis (if recommended)</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-gray-700 mr-2">Weeks 18-22:</span>
                <span>Anatomy ultrasound scan</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-gray-700 mr-2">Weeks 24-28:</span>
                <span>Glucose screening test, regular check-up</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-gray-700 mr-2">Weeks 28-36:</span>
                <span>Regular check-ups every 2-3 weeks</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-gray-700 mr-2">Weeks 36-40:</span>
                <span>Weekly check-ups until delivery</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Note: This is a general schedule. Your healthcare provider will determine your specific appointment schedule.
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
              <h3 className="font-bold mb-2">Weight Gain Calculator</h3>
              <p className="text-sm text-gray-600 mb-3">Calculate recommended pregnancy weight gain based on your pre-pregnancy BMI.</p>
              <Link to="/tools/weight-gain-calculator" className="text-[#0891b2] hover:underline text-sm">
                Check weight guidelines →
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

export default PregnancyCalendarPage;
