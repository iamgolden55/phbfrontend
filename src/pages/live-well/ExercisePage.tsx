import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const ExercisePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Exercise and Fitness</h1>
          <p className="text-xl font-medium">
            Physical activity is vital for maintaining good health and preventing many diseases
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-gray-100 py-2">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Live Well', href: '/live-well' },
              { label: 'Exercise and Fitness', href: '/live-well/exercise' }
            ]}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Benefits of physical activity</h2>
              <p className="mb-4">
                Regular exercise has numerous health benefits beyond just weight management. Being physically active can:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Reduce your risk of heart disease, stroke, type 2 diabetes, and some cancers</li>
                <li>Improve your mental health and mood</li>
                <li>Strengthen your bones and muscles</li>
                <li>Improve your ability to do daily activities and prevent falls</li>
                <li>Increase your chances of living longer</li>
                <li>Help control your weight</li>
                <li>Improve sleep quality</li>
                <li>Enhance brain health and reduce risk of dementia</li>
              </ul>
              <p className="mb-4">
                Even small amounts of physical activity are beneficial, and some activity is better than none at all.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">How much exercise do I need?</h2>
              <p className="mb-4">
                For substantial health benefits, Nigerian health guidelines recommend:
              </p>

              <div className="bg-blue-50 p-6 rounded-lg mb-4">
                <h3 className="text-xl font-semibold mb-3">For adults (18-64 years)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>At least 150 minutes of moderate-intensity activity or 75 minutes of vigorous-intensity activity per week</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Muscle-strengthening activities on 2 or more days a week</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Spread activity throughout the week</span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">For children and adolescents (6-17 years)</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>60 minutes or more of moderate-to-vigorous physical activity daily</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Include activities that strengthen muscles and bones at least 3 days per week</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Types of physical activity</h2>

              <h3 className="text-xl font-semibold mb-2">Aerobic activity</h3>
              <p className="mb-4">
                Aerobic activities make you breathe harder and your heart beat faster. Examples include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Brisk walking or jogging</li>
                <li>Dancing</li>
                <li>Swimming</li>
                <li>Cycling</li>
                <li>Playing football, basketball, or other sports</li>
                <li>Gardening and housework (if vigorous)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2">Muscle-strengthening activities</h3>
              <p className="mb-4">
                These activities work all the major muscle groups of your body. Examples include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Lifting weights</li>
                <li>Working with resistance bands</li>
                <li>Exercises that use your body weight for resistance (push-ups, sit-ups)</li>
                <li>Heavy gardening (digging, shoveling)</li>
                <li>Yoga</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2">Flexibility exercises</h3>
              <p className="mb-4">
                These help maintain the range of motion of your joints. Examples include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Stretching exercises</li>
                <li>Yoga</li>
                <li>Pilates</li>
                <li>Tai chi</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2">Balance exercises</h3>
              <p className="mb-4">
                These can help prevent falls, especially important for older adults. Examples include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Tai chi</li>
                <li>Standing on one foot</li>
                <li>Walking heel-to-toe</li>
                <li>Yoga and Pilates poses that challenge your balance</li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Getting started with exercise</h2>
              <p className="mb-4">
                If you haven't been active for a while, start slowly and gradually increase your activity level. Here are some tips:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Choose activities you enjoy and will stick with</li>
                <li>Start with just 10 minutes of activity and gradually build up</li>
                <li>Make physical activity part of your daily routine</li>
                <li>Find an exercise buddy to help keep you motivated</li>
                <li>Set realistic goals and track your progress</li>
                <li>Remember that some activity is better than none</li>
                <li>Check with your healthcare provider if you have chronic conditions or concerns</li>
              </ul>
              <p>
                <Link to="/live-well/exercise/5-week-workout-plan" className="text-[#005eb8] font-medium hover:underline">
                  Try our beginner-friendly 5-week workout plan →
                </Link>
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Staying motivated</h2>
              <p className="mb-4">
                Here are some strategies to help you stay motivated and make physical activity a regular part of your life:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Mix up your routine to prevent boredom</li>
                <li>Set specific, measurable, achievable, relevant, and time-bound (SMART) goals</li>
                <li>Track your progress with a fitness app or journal</li>
                <li>Reward yourself when you reach milestones (with non-food rewards)</li>
                <li>Join a class or club for social support</li>
                <li>Schedule exercise into your day like any other important appointment</li>
                <li>Focus on how good you feel after exercising, not just weight or appearance</li>
              </ul>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Related Topics */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Related topics</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/live-well/healthy-eating" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Healthy eating
                  </Link>
                </li>
                <li>
                  <Link to="/live-well/healthy-weight" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Healthy weight
                  </Link>
                </li>
                <li>
                  <Link to="/tools/bmi-calculator" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    BMI calculator
                  </Link>
                </li>
              </ul>
            </div>

            {/* Featured Guides */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
                  alt="Running workout"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#005eb8] mb-3">5-week workout plan</h3>
                <p className="text-gray-600 mb-4">
                  A beginner-friendly exercise plan that gradually increases in intensity over 5 weeks.
                </p>
                <Link to="/live-well/exercise/5-week-workout-plan" className="text-[#005eb8] font-medium hover:underline">
                  Get started
                </Link>
              </div>
            </div>

            {/* Tools */}
            <div className="bg-[#e8edee] p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Health tools</h3>
              <p className="mb-4">Calculate how many calories you burn during different activities.</p>
              <Link
                to="/tools/calorie-calculator"
                className="bg-[#005eb8] text-white px-4 py-2 rounded-md hover:bg-[#003f7e] inline-block w-full text-center"
              >
                Calorie calculator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;
