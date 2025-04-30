import React from 'react';
import { Link } from 'react-router-dom';
import DueDateCalculator from '../features/pregnancy/DueDateCalculator';

const DueDateCalculatorPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Due Date Calculator</h1>
          <p className="text-xl font-medium">
            Find out when your baby is due and track your pregnancy journey
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <DueDateCalculator />

            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">About Due Date Calculation</h2>
              <p className="mb-4">
                Your due date, also known as the estimated date of delivery (EDD), is calculated
                from the first day of your last menstrual period (LMP). Pregnancy typically lasts
                around 40 weeks from the LMP, or roughly 38 weeks from conception.
              </p>
              <p className="mb-4">
                It's important to remember that your due date is just an estimate. Only about 5%
                of babies are actually born on their due date. Most babies arrive within 1-2 weeks
                before or after this date.
              </p>
              <h3 className="text-lg font-bold mt-6 mb-3">How it's calculated</h3>
              <p className="mb-4">
                Healthcare providers typically use Naegele's rule to calculate the estimated due date:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Take the first day of your last menstrual period</li>
                <li>Add 1 year</li>
                <li>Subtract 3 months</li>
                <li>Add 7 days</li>
              </ul>
              <p>
                For example, if your last period started on February 1, 2023, your due date would be
                around November 8, 2023.
              </p>
            </div>

            <div className="mt-8 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Key Pregnancy Milestones</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-[#005eb8]">First Trimester (Weeks 1-13)</h3>
                  <p className="text-sm text-gray-600 mt-1 mb-2">
                    Your baby's major organs and body systems develop during this period.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span><strong>Weeks 5-6:</strong> Heartbeat begins</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span><strong>Week 8:</strong> All major organs have begun forming</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span><strong>Week 12:</strong> External genitalia begin to differentiate</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#005eb8]">Second Trimester (Weeks 14-26)</h3>
                  <p className="text-sm text-gray-600 mt-1 mb-2">
                    Your baby grows rapidly and you'll likely feel movement.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span><strong>Weeks 16-20:</strong> You may feel first movements ("quickening")</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span><strong>Week 20:</strong> Anomaly scan usually performed</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span><strong>Week 24:</strong> Baby's face fully formed</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#005eb8]">Third Trimester (Weeks 27-40)</h3>
                  <p className="text-sm text-gray-600 mt-1 mb-2">
                    Your baby gains weight and prepares for birth.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span><strong>Week 32:</strong> Baby's movements become more restricted as they grow</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span><strong>Week 37:</strong> Baby is considered 'term'</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">•</span>
                      <span><strong>Weeks 38-42:</strong> Typical time range for delivery</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <Link to="/pregnancy" className="text-[#005eb8] hover:underline flex items-center">
                  View more pregnancy information
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-[#005eb8] text-white p-4">
                <h2 className="text-xl font-bold">Pregnancy Resources</h2>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-3">Tools & Calculators</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/tools/weight-gain-calculator" className="text-[#005eb8] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Pregnancy Weight Gain Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/tools/pregnancy-calendar" className="text-[#005eb8] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Pregnancy Calendar
                    </Link>
                  </li>
                  <li>
                    <Link to="/tools/kick-counter" className="text-[#005eb8] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Baby Kick Counter
                    </Link>
                  </li>
                  <li>
                    <Link to="/tools/contraction-timer" className="text-[#005eb8] hover:underline flex items-center">
                      <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Contraction Timer
                    </Link>
                  </li>
                </ul>

                <h3 className="font-bold mt-6 mb-3">Popular Pregnancy Topics</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/pregnancy/early/first-prenatal-visit" className="text-[#005eb8] hover:underline">
                      Your first prenatal visit
                    </Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/early/pregnancy-symptoms" className="text-[#005eb8] hover:underline">
                      Early pregnancy symptoms
                    </Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/middle/prenatal-tests" className="text-[#005eb8] hover:underline">
                      Prenatal tests explained
                    </Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/health/nutrition" className="text-[#005eb8] hover:underline">
                      Nutrition during pregnancy
                    </Link>
                  </li>
                  <li>
                    <Link to="/pregnancy/late/signs-of-labor" className="text-[#005eb8] hover:underline">
                      Signs of labor
                    </Link>
                  </li>
                </ul>

                <div className="mt-6 bg-blue-50 p-4 rounded-md">
                  <h3 className="font-bold text-blue-800 mb-2">Talk to a midwife</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Have questions about your pregnancy? Speak with a midwife for personalized advice.
                  </p>
                  <Link to="/services/talk-to-midwife" className="text-[#005eb8] text-sm font-medium hover:underline">
                    Book an appointment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueDateCalculatorPage;
