import React from 'react';
import { Link } from 'react-router-dom';

const BudgetMealPlanningPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <nav className="text-sm mb-4">
            <Link to="/live-well" className="hover:underline">Live well</Link>
            <span className="mx-2">›</span>
            <Link to="/live-well/healthy-eating" className="hover:underline">Healthy eating</Link>
            <span className="mx-2">›</span>
            <span>Budget meal planning</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Budget-friendly meal planning</h1>
          <p className="text-xl font-medium">
            Nutritious, affordable meal planning designed for African families and communities
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Coming soon with African context */}
        <div className="text-center py-16">
          <div className="max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🍽️✨</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Something Amazing is Cooking!</h2>
            <p className="text-lg text-gray-600 mb-6">
              We're developing a comprehensive budget meal planning guide specifically designed for 
              Nigerian families, featuring local ingredients, market shopping tips, and delicious 
              traditional recipes that won't break the bank.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-4">What's coming:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div>
                  <h4 className="font-semibold mb-2">🥘 Nigerian-Focused Content</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Local staples: Rice, beans, yam, plantain</li>
                    <li>• Market shopping strategies</li>
                    <li>• Seasonal eating for best prices</li>
                    <li>• Traditional healthy recipes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">💰 Budget-Smart Features</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Weekly meal plans under ₦5,000</li>
                    <li>• Family-sized portions</li>
                    <li>• Ingredient substitution guides</li>
                    <li>• Leftover transformation tips</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-8">
              Our nutrition experts are working with local food specialists to ensure this guide 
              reflects real Nigerian eating patterns, prices, and preferences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/live-well/healthy-eating"
                className="bg-[#005eb8] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block font-bold"
              >
                Explore healthy eating basics
              </Link>
              <Link
                to="/account/appointments/book"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                Get nutrition consultation
              </Link>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              Have suggestions for local foods or recipes we should include? 
              <Link to="/help" className="text-[#005eb8] hover:underline ml-1">Let us know!</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetMealPlanningPage;