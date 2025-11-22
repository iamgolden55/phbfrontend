import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface WeightGoal {
  title: string;
  description: string;
  approach: string;
  tips: string[];
  timeframe: string;
  sustainability: string;
}

interface BMICategory {
  range: string;
  category: string;
  description: string;
  recommendations: string[];
  color: string;
}

const weightGoals: WeightGoal[] = [
  {
    title: 'Gradual Weight Loss',
    description: 'Safe, sustainable weight reduction for long-term health benefits.',
    approach: 'Create a moderate calorie deficit through balanced diet and regular physical activity.',
    tips: [
      'Aim for 0.5-1kg weight loss per week',
      'Focus on whole foods and portion control',
      'Include 150+ minutes of moderate exercise weekly',
      'Stay hydrated and get adequate sleep'
    ],
    timeframe: '3-12 months depending on goals',
    sustainability: '95% when combined with lifestyle changes'
  },
  {
    title: 'Weight Maintenance',
    description: 'Maintaining a healthy weight through balanced lifestyle habits.',
    approach: 'Balance calorie intake with energy expenditure through mindful eating and regular activity.',
    tips: [
      'Monitor weight weekly, not daily',
      'Continue healthy eating patterns',
      'Maintain regular physical activity',
      'Practice stress management techniques'
    ],
    timeframe: 'Ongoing lifestyle approach',
    sustainability: '85% with consistent habits'
  },
  {
    title: 'Healthy Weight Gain',
    description: 'Safe weight gain for those who are underweight or building muscle mass.',
    approach: 'Increase calorie intake with nutrient-dense foods while incorporating strength training.',
    tips: [
      'Add 300-500 extra calories daily',
      'Focus on protein-rich foods',
      'Include strength training exercises',
      'Eat frequent, smaller meals'
    ],
    timeframe: '2-6 months for noticeable changes',
    sustainability: '90% with proper nutrition planning'
  }
];

const bmiCategories: BMICategory[] = [
  {
    range: 'Below 18.5',
    category: 'Underweight',
    description: 'May indicate nutritional deficiency or underlying health conditions.',
    recommendations: [
      'Consult healthcare provider for evaluation',
      'Focus on nutrient-dense, calorie-rich foods',
      'Consider strength training to build muscle',
      'Monitor for underlying health issues'
    ],
    color: 'bg-blue-50 border-blue-200'
  },
  {
    range: '18.5 - 24.9',
    category: 'Normal Weight',
    description: 'Associated with lower risk of weight-related health problems.',
    recommendations: [
      'Maintain current healthy habits',
      'Continue balanced diet and regular exercise',
      'Monitor weight periodically',
      'Focus on overall wellness, not just weight'
    ],
    color: 'bg-green-50 border-green-200'
  },
  {
    range: '25.0 - 29.9',
    category: 'Overweight',
    description: 'Slightly increased risk of health complications, but manageable with lifestyle changes.',
    recommendations: [
      'Gradual weight loss of 5-10% can improve health',
      'Increase physical activity gradually',
      'Focus on portion control and food quality',
      'Consider professional guidance'
    ],
    color: 'bg-yellow-50 border-yellow-200'
  },
  {
    range: '30.0 and above',
    category: 'Obese',
    description: 'Increased risk of serious health conditions, but significant health improvements possible.',
    recommendations: [
      'Consult healthcare provider for comprehensive plan',
      'Consider structured weight loss program',
      'Focus on sustainable lifestyle changes',
      'Regular health monitoring and support'
    ],
    color: 'bg-orange-50 border-orange-200'
  }
];

const HealthyWeightPage: React.FC = () => {
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(70);
  const [bmi, setBmi] = useState<number>(0);
  const [bmiCategory, setBmiCategory] = useState<BMICategory | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string>('maintenance');
  const [showCalculator, setShowCalculator] = useState(true);

  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

  const calculateBMI = () => {
    if (height > 0 && weight > 0) {
      const heightInMeters = height / 100;
      const calculatedBMI = weight / (heightInMeters * heightInMeters);
      setBmi(Math.round(calculatedBMI * 10) / 10);
      
      // Determine BMI category
      if (calculatedBMI < 18.5) {
        setBmiCategory(bmiCategories[0]);
      } else if (calculatedBMI < 25) {
        setBmiCategory(bmiCategories[1]);
      } else if (calculatedBMI < 30) {
        setBmiCategory(bmiCategories[2]);
      } else {
        setBmiCategory(bmiCategories[3]);
      }
    }
  };

  const getHealthyWeightRange = () => {
    const heightInMeters = height / 100;
    const minWeight = Math.round(18.5 * heightInMeters * heightInMeters);
    const maxWeight = Math.round(24.9 * heightInMeters * heightInMeters);
    return { min: minWeight, max: maxWeight };
  };

  const selectedGoalData = weightGoals.find(goal => 
    goal.title.toLowerCase().includes(selectedGoal) || 
    (selectedGoal === 'loss' && goal.title.includes('Loss')) ||
    (selectedGoal === 'gain' && goal.title.includes('Gain')) ||
    (selectedGoal === 'maintenance' && goal.title.includes('Maintenance'))
  ) || weightGoals[1];

  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <nav className="text-sm mb-4">
            <Link to="/live-well" className="hover:underline">Live well</Link>
            <span className="mx-2">›</span>
            <span>Healthy weight</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Achieving and maintaining a healthy weight</h1>
          <p className="text-xl font-medium">
            Evidence-based guidance for sustainable weight management and overall wellness
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Health at every size message */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-blue-800">Health at every size</h2>
          <p className="mb-4 text-blue-700">
            Healthy weight is about more than just numbers on a scale. It's about feeling strong, 
            energetic, and confident in your body while reducing your risk of chronic diseases.
          </p>
          <p className="mb-4 text-blue-700">
            Everyone's healthy weight is different and depends on factors like genetics, age, 
            muscle mass, and overall health. Focus on healthy habits rather than perfect numbers.
          </p>
          <p className="text-blue-700">
            <strong>Remember:</strong> Small, sustainable changes lead to lasting results. 
            Extreme diets and rapid weight loss are rarely successful long-term.
          </p>
        </div>

        {/* BMI Calculator */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-green-800">BMI Calculator & Assessment</h2>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="text-green-600 hover:text-green-800 text-sm font-medium"
            >
              {showCalculator ? 'Hide Calculator' : 'Show Calculator'}
            </button>
          </div>
          
          {showCalculator && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    min="100"
                    max="250"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full p-3 border border-green-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    min="30"
                    max="300"
                  />
                </div>
              </div>

              {bmi > 0 && bmiCategory && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
                    <div className="text-2xl font-bold text-green-600">{bmi}</div>
                    <div className="text-sm text-green-700">Your BMI</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
                    <div className="text-lg font-bold text-blue-600">{bmiCategory.category}</div>
                    <div className="text-sm text-blue-700">Category</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
                    <div className="text-lg font-bold text-purple-600">
                      {getHealthyWeightRange().min}-{getHealthyWeightRange().max}kg
                    </div>
                    <div className="text-sm text-purple-700">Healthy range</div>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="mt-4 text-sm text-green-700">
            <strong>Note:</strong> BMI is a screening tool, not a diagnostic measure. 
            It doesn't account for muscle mass, bone density, or body composition. 
            Consult a healthcare provider for comprehensive health assessment.
          </div>
        </div>

        {/* BMI Categories */}
        <h2 className="text-2xl font-bold mb-6">Understanding BMI categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {bmiCategories.map((category, index) => (
            <div
              key={index}
              className={`border rounded-lg p-6 ${category.color} ${
                bmiCategory?.category === category.category ? 'ring-2 ring-blue-400' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">{category.category}</h3>
                <span className="text-sm font-medium bg-white px-2 py-1 rounded">
                  BMI {category.range}
                </span>
              </div>
              <p className="text-sm mb-4">{category.description}</p>
              <div>
                <h4 className="font-semibold mb-2">Recommendations:</h4>
                <ul className="text-sm space-y-1">
                  {category.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-2 h-2 bg-gray-600 rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Weight Management Goals */}
        <h2 className="text-2xl font-bold mb-6">Choose your weight management approach</h2>
        <div className="mb-6">
          <div className="flex flex-wrap gap-3">
            {['maintenance', 'loss', 'gain'].map((goal) => (
              <button
                key={goal}
                onClick={() => setSelectedGoal(goal)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedGoal === goal
                    ? 'bg-[#0891b2] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {goal === 'maintenance' ? 'Maintain Weight' : 
                 goal === 'loss' ? 'Lose Weight' : 'Gain Weight'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-[#0891b2] mb-3">{selectedGoalData.title}</h3>
          <p className="text-gray-600 mb-4">{selectedGoalData.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Approach:</h4>
              <p className="text-sm text-gray-600 mb-4">{selectedGoalData.approach}</p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Key strategies:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {selectedGoalData.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-2 h-2 bg-[#0891b2] rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Timeline:</h4>
              <p className="text-sm text-gray-600 mb-4">{selectedGoalData.timeframe}</p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Success rate:</h4>
              <p className="text-sm text-gray-600">{selectedGoalData.sustainability}</p>
            </div>
          </div>
        </div>

        {/* Healthy habits */}
        <h2 className="text-2xl font-bold mb-6">Building healthy habits for life</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold mb-2 text-blue-800">🍽️ Mindful Eating</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Eat slowly and without distractions</li>
              <li>• Pay attention to hunger and fullness cues</li>
              <li>• Choose nutrient-dense foods</li>
              <li>• Practice portion awareness</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-bold mb-2 text-green-800">🏃‍♀️ Regular Movement</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Aim for 150+ minutes moderate activity weekly</li>
              <li>• Include strength training 2-3 times per week</li>
              <li>• Find activities you enjoy</li>
              <li>• Start small and gradually increase</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h3 className="font-bold mb-2 text-purple-800">😴 Quality Sleep</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Aim for 7-9 hours per night</li>
              <li>• Maintain consistent sleep schedule</li>
              <li>• Create relaxing bedtime routine</li>
              <li>• Limit screen time before bed</li>
            </ul>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h3 className="font-bold mb-2 text-orange-800">💧 Stay Hydrated</h3>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Drink 8-10 glasses of water daily</li>
              <li>• Start meals with a glass of water</li>
              <li>• Choose water over sugary drinks</li>
              <li>• Monitor urine color as hydration guide</li>
            </ul>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
            <h3 className="font-bold mb-2 text-pink-800">🧘‍♀️ Stress Management</h3>
            <ul className="text-sm text-pink-700 space-y-1">
              <li>• Practice relaxation techniques</li>
              <li>• Maintain social connections</li>
              <li>• Engage in hobbies you enjoy</li>
              <li>• Seek support when needed</li>
            </ul>
          </div>

          <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
            <h3 className="font-bold mb-2 text-teal-800">📊 Track Progress</h3>
            <ul className="text-sm text-teal-700 space-y-1">
              <li>• Monitor habits, not just weight</li>
              <li>• Take body measurements</li>
              <li>• Note energy and mood improvements</li>
              <li>• Celebrate small victories</li>
            </ul>
          </div>
        </div>

        {/* When to seek help */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-yellow-800">When to seek professional support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Consider professional help if you:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Have tried multiple diets without lasting success</li>
                <li>• Experience emotional eating or food obsessions</li>
                <li>• Have underlying health conditions</li>
                <li>• Need to lose more than 10% of body weight</li>
                <li>• Feel overwhelmed or confused about nutrition</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">PHB can provide:</h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Personalized nutrition counseling</li>
                <li>• Medical weight management programs</li>
                <li>• Mental health support for eating issues</li>
                <li>• Fitness assessment and planning</li>
                <li>• Ongoing monitoring and support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Support and resources */}
        <div className="bg-[#0891b2] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to start your healthy weight journey?</h2>
            <p className="mb-6">
              Sustainable weight management is about creating healthy habits that fit your lifestyle. 
              Get personalized support from PHB healthcare professionals.
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
                Explore healthy eating
              </Link>
              <Link
                to="/live-well/exercise"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-[#0891b2] transition-colors inline-block font-bold"
              >
                Start exercising
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthyWeightPage;