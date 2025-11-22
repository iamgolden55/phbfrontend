import React from 'react';
import { Link } from 'react-router-dom';
import PregnancyNutritionGuide from '../features/pregnancy/PregnancyNutritionGuide';

const PregnancyNutritionGuidePage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <div className="flex items-center mb-2">
            <Link to="/pregnancy" className="text-white hover:underline mr-2">
              Pregnancy
            </Link>
            <span className="mx-2">›</span>
            <span>Nutrition Guide</span>
          </div>
          <h1 className="text-3xl font-bold mb-4">Pregnancy Nutrition Guide</h1>
          <p className="text-xl">
            Essential nutrients, meal suggestions, and dietary guidelines for a healthy pregnancy
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Eating Well During Pregnancy</h2>
          <p className="mb-4">
            Good nutrition during pregnancy is crucial for your baby's growth and development. Your baby depends on the food you eat for their nourishment, making your diet an important part of prenatal care.
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Learn which nutrients are essential for your baby's development</li>
            <li>Discover healthy meal and snack ideas by trimester</li>
            <li>Understand which foods to avoid during pregnancy</li>
            <li>Find strategies for managing common pregnancy food challenges</li>
            <li>Get practical advice for maintaining a balanced diet</li>
          </ul>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-800">
              While this guide provides general recommendations, every pregnancy is unique. Consult with your healthcare provider about your specific nutritional needs, especially if you have food restrictions, allergies, or health conditions.
            </p>
          </div>
        </div>

        <PregnancyNutritionGuide />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Managing Common Challenges</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Morning Sickness</h3>
                <ul className="list-disc pl-5 text-gray-600 mt-1">
                  <li>Eat small, frequent meals throughout the day</li>
                  <li>Keep plain crackers by your bed to eat before getting up</li>
                  <li>Stay hydrated with small sips of water, ginger tea, or lemon water</li>
                  <li>Avoid strong smells and greasy foods</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold">Heartburn</h3>
                <ul className="list-disc pl-5 text-gray-600 mt-1">
                  <li>Eat smaller, more frequent meals</li>
                  <li>Avoid spicy, greasy, and acidic foods</li>
                  <li>Don't lie down immediately after eating</li>
                  <li>Sleep with your head elevated if nighttime heartburn is an issue</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold">Constipation</h3>
                <ul className="list-disc pl-5 text-gray-600 mt-1">
                  <li>Increase fiber intake gradually</li>
                  <li>Stay well-hydrated with water throughout the day</li>
                  <li>Include physical activity in your daily routine</li>
                  <li>Try warm fluids like herbal tea in the morning</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Special Dietary Considerations</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Vegetarian & Vegan</h3>
                <p className="text-sm text-gray-600 mb-1">Focus on these nutrients:</p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Iron (legumes, fortified cereals, spinach)</li>
                  <li>Vitamin B12 (fortified foods or supplements)</li>
                  <li>Zinc (nuts, seeds, legumes)</li>
                  <li>Omega-3s (flaxseed, chia seeds, walnuts)</li>
                  <li>Protein (beans, lentils, tofu, tempeh, seitan)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold">Gestational Diabetes</h3>
                <p className="text-sm text-gray-600 mb-1">Consider these guidelines:</p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Balance carbohydrates throughout the day</li>
                  <li>Pair carbs with protein and healthy fats</li>
                  <li>Choose complex carbohydrates over simple ones</li>
                  <li>Monitor blood sugar as recommended</li>
                  <li>Work with a dietitian for a personalized meal plan</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold">Food Allergies & Intolerances</h3>
                <p className="text-sm text-gray-600 mb-1">Important steps:</p>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Consult with a dietitian to ensure nutritional adequacy</li>
                  <li>Find suitable alternatives for restricted foods</li>
                  <li>Read labels carefully for hidden ingredients</li>
                  <li>Consider additional supplements if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Other Pregnancy Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Baby Names Directory</h3>
              <p className="text-sm text-gray-600 mb-3">Find the perfect name for your baby with our searchable database.</p>
              <Link to="/pregnancy/baby-names-directory" className="text-[#0891b2] hover:underline text-sm">
                Browse names →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Birth Plan Creator</h3>
              <p className="text-sm text-gray-600 mb-3">Create a personalized birth plan to share with your healthcare team.</p>
              <Link to="/pregnancy/birth-plan-creator" className="text-[#0891b2] hover:underline text-sm">
                Create your plan →
              </Link>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="font-bold mb-2">Baby Shower Planner</h3>
              <p className="text-sm text-gray-600 mb-3">Plan your celebration with checklists, invitation templates, and game ideas.</p>
              <Link to="/pregnancy/baby-shower-planner" className="text-[#0891b2] hover:underline text-sm">
                Start planning →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyNutritionGuidePage;
