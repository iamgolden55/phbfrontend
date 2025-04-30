import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

const HealthyEatingPage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Healthy Eating</h1>
          <p className="text-xl font-medium">
            A healthy diet and good nutrition are essential for overall health and wellbeing
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
              { label: 'Healthy Eating', href: '/live-well/healthy-eating' }
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
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Eating a balanced diet</h2>
              <p className="mb-4">
                A healthy, balanced diet is essential for maintaining good health and preventing various diseases. It should include a variety of foods from all major food groups in the right proportions.
              </p>
              <p className="mb-4">
                The Nigerian Dietary Guidelines recommend that your diet should include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>At least 5 portions of fruits and vegetables every day</li>
                <li>Meals based on starchy foods like rice, yam, potatoes, and whole grains</li>
                <li>Some protein-rich foods such as beans, fish, eggs, and lean meat</li>
                <li>Some dairy or dairy alternatives</li>
                <li>Small amounts of unsaturated oils and spreads</li>
                <li>Plenty of fluids (6-8 glasses a day)</li>
              </ul>
              <p className="mb-4">
                Try to limit foods high in fat, salt and sugar, as these can contribute to health problems when consumed in excess.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Nutrition basics</h2>
              <p className="mb-4">
                Understanding the basics of nutrition can help you make better food choices:
              </p>

              <h3 className="text-xl font-semibold mb-2">Carbohydrates</h3>
              <p className="mb-4">
                Carbohydrates are your body's main source of energy. Choose complex carbohydrates such as whole grains, beans, fruits, and vegetables rather than simple carbohydrates like sugar and processed foods.
              </p>

              <h3 className="text-xl font-semibold mb-2">Protein</h3>
              <p className="mb-4">
                Protein is essential for building and repairing tissues. Good sources include beans, fish, eggs, meat, and poultry. Plant-based proteins like beans, peas, and lentils are especially healthy choices.
              </p>

              <h3 className="text-xl font-semibold mb-2">Fats</h3>
              <p className="mb-4">
                Not all fats are bad. Healthy fats from foods like avocados, nuts, seeds, and olive oil are important for brain health and absorbing certain vitamins. Limit saturated and trans fats found in fried foods and many processed products.
              </p>

              <h3 className="text-xl font-semibold mb-2">Vitamins and minerals</h3>
              <p className="mb-4">
                These micronutrients are needed in small amounts but are crucial for many bodily functions. Eating a variety of foods is the best way to ensure you get all the vitamins and minerals you need.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Healthy eating tips</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Base your meals on starchy carbohydrates like rice, yam, or whole grains</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Eat at least 5 portions of a variety of fruits and vegetables every day</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Choose lean proteins and include fish in your diet at least twice a week</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cut down on saturated fat, sugar and salt</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Stay hydrated by drinking plenty of water</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Watch your portion sizes to avoid overeating</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Meal planning</h2>
              <p className="mb-4">
                Planning your meals ahead of time can help you maintain a healthy diet, save money, and reduce food waste. Here are some tips for effective meal planning:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Set aside time each week to plan your meals</li>
                <li>Check what you already have in your cupboards, fridge and freezer</li>
                <li>Make a shopping list based on your meal plan</li>
                <li>Consider batch cooking and freezing portions for later use</li>
                <li>Include a variety of foods to ensure you get all the nutrients you need</li>
                <li>Be realistic about what you'll actually cook and eat</li>
              </ul>
              <p className="mb-4">
                Preparing your own meals at home gives you more control over the ingredients and cooking methods, making it easier to eat healthily.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#005eb8] mb-4">Eating on a budget</h2>
              <p className="mb-4">
                Eating healthily doesn't have to be expensive. Here are some tips for nutritious eating on a budget:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Plan your meals and make a shopping list to avoid impulse purchases</li>
                <li>Buy seasonal fruits and vegetables when they're at their cheapest</li>
                <li>Consider frozen or canned fruits and vegetables, which can be just as nutritious as fresh</li>
                <li>Buy staples like rice, beans, and grains in bulk</li>
                <li>Use leftover vegetables in soups, stews or stir-fries</li>
                <li>Compare prices between different brands and stores</li>
                <li>Check for special offers, but be wary of buying things you don't need</li>
              </ul>
              <p>
                <Link to="/live-well/healthy-eating/budget-meal-planning" className="text-[#005eb8] font-medium hover:underline">
                  Find more tips on eating well for less →
                </Link>
              </p>
            </div>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Related Topics */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Related topics</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/live-well/exercise" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Exercise and fitness
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
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=250&q=80"
                  alt="Meal plan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[#005eb8] mb-3">7-day healthy meal plan</h3>
                <p className="text-gray-600 mb-4">
                  Get started with our nutritionist-designed meal plan for a week of balanced eating.
                </p>
                <Link to="/live-well/healthy-eating/meal-plans" className="text-[#005eb8] font-medium hover:underline">
                  View meal plan
                </Link>
              </div>
            </div>

            {/* Tools */}
            <div className="bg-[#e8edee] p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Health tools</h3>
              <p className="mb-4">Check if you're a healthy weight with our BMI calculator.</p>
              <Link
                to="/tools/bmi-calculator"
                className="bg-[#005eb8] text-white px-4 py-2 rounded-md hover:bg-[#003f7e] inline-block w-full text-center"
              >
                Calculate your BMI
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthyEatingPage;
