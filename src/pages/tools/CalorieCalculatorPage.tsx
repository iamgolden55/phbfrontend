import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface CalorieResult {
  bmr: number;
  maintenance: number;
  weightLoss: number;
  weightGain: number;
  activityLevel: string;
}

const CalorieCalculatorPage: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(70);
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [result, setResult] = useState<CalorieResult | null>(null);

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise', multiplier: 1.2 },
    { value: 'light', label: 'Lightly Active', description: 'Light exercise 1-3 days/week', multiplier: 1.375 },
    { value: 'moderate', label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week', multiplier: 1.55 },
    { value: 'very', label: 'Very Active', description: 'Hard exercise 6-7 days/week', multiplier: 1.725 },
    { value: 'extra', label: 'Extremely Active', description: 'Very hard exercise, physical job', multiplier: 1.9 }
  ];

  const calculateCalories = () => {
    // Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const selectedActivity = activityLevels.find(level => level.value === activityLevel);
    const multiplier = selectedActivity?.multiplier || 1.55;
    
    const maintenance = bmr * multiplier;
    const weightLoss = maintenance - 500; // 500 calorie deficit
    const weightGain = maintenance + 300; // 300 calorie surplus

    setResult({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      weightLoss: Math.round(weightLoss),
      weightGain: Math.round(weightGain),
      activityLevel: selectedActivity?.label || 'Moderately Active'
    });
  };

  useEffect(() => {
    calculateCalories();
  }, [gender, age, height, weight, activityLevel]);

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <nav className="text-sm mb-4">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">›</span>
            <span>Tools</span>
            <span className="mx-2">›</span>
            <span>Calorie calculator</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Daily Calorie Calculator</h1>
          <p className="text-xl font-medium">
            Calculate your daily calorie needs for weight maintenance, loss, or gain
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Calculator description */}
        <div className="bg-gray-50 border-l-4 border-gray-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-gray-800">How this calculator works</h2>
          <p className="mb-4 text-gray-700">
            This calculator uses the Mifflin-St Jeor equation, considered the most accurate method 
            for estimating Basal Metabolic Rate (BMR) and daily calorie needs.
          </p>
          <p className="text-gray-700">
            Your BMR is the number of calories your body burns at rest. Combined with your activity level, 
            we calculate your total daily energy expenditure and provide recommendations for different goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Enter your details</h2>
            
            <div className="space-y-6">
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setGender('male')}
                    className={`px-4 py-2 rounded-md border transition-colors ${
                      gender === 'male'
                        ? 'bg-[#0891b2] text-white border-[#0891b2]'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`px-4 py-2 rounded-md border transition-colors ${
                      gender === 'female'
                        ? 'bg-[#0891b2] text-white border-[#0891b2]'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0891b2] focus:border-[#0891b2]"
                  min="15"
                  max="100"
                />
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0891b2] focus:border-[#0891b2]"
                  min="100"
                  max="250"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0891b2] focus:border-[#0891b2]"
                  min="30"
                  max="300"
                />
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Activity Level</label>
                <div className="space-y-2">
                  {activityLevels.map((level) => (
                    <div key={level.value} className="flex items-start">
                      <input
                        type="radio"
                        id={level.value}
                        name="activity"
                        value={level.value}
                        checked={activityLevel === level.value}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        className="mt-1 mr-3"
                      />
                      <label htmlFor={level.value} className="text-sm">
                        <div className="font-medium">{level.label}</div>
                        <div className="text-gray-600">{level.description}</div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Your calorie needs</h2>
            
            {result && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">Basal Metabolic Rate (BMR)</div>
                  <div className="text-2xl font-bold text-[#0891b2]">{result.bmr.toLocaleString()} calories/day</div>
                  <div className="text-sm text-gray-600 mt-1">Calories burned at complete rest</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700">Maintain Current Weight</div>
                  <div className="text-2xl font-bold text-green-600">{result.maintenance.toLocaleString()} calories/day</div>
                  <div className="text-sm text-green-700 mt-1">Based on {result.activityLevel}</div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700">Lose Weight (0.5kg/week)</div>
                  <div className="text-2xl font-bold text-blue-600">{result.weightLoss.toLocaleString()} calories/day</div>
                  <div className="text-sm text-blue-700 mt-1">500 calorie deficit</div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="text-sm text-orange-700">Gain Weight (0.3kg/week)</div>
                  <div className="text-2xl font-bold text-orange-600">{result.weightGain.toLocaleString()} calories/day</div>
                  <div className="text-sm text-orange-700 mt-1">300 calorie surplus</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Important notes */}
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Important notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Remember:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• These are estimates - individual needs vary</li>
                <li>• Quality of calories matters as much as quantity</li>
                <li>• Consult healthcare provider for personalized advice</li>
                <li>• Gradual changes are more sustainable</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">For best results:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Focus on nutrient-dense whole foods</li>
                <li>• Include regular physical activity</li>
                <li>• Stay hydrated throughout the day</li>
                <li>• Monitor how you feel, not just the scale</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-[#0891b2] text-white p-8 rounded-lg mt-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to put this into action?</h2>
            <p className="mb-6">
              Understanding your calorie needs is just the first step. Get personalized nutrition 
              guidance and meal planning support from PHB healthcare professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account/appointments/book"
                className="bg-white text-[#0891b2] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
              >
                Book nutrition consultation
              </Link>
              <Link
                to="/live-well/healthy-eating"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                Healthy eating guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculatorPage;