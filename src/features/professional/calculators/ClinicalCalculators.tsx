import React, { useState } from 'react';

// Define calculator types
type CalculatorCategory = 'cardiology' | 'neurology' | 'anesthesiology' | 'internal' | 'pediatrics' | 'obstetrics';

interface Calculator {
  id: string;
  name: string;
  description: string;
  category: CalculatorCategory;
  component: React.FC;
}

// BMI Calculator Component
const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [classification, setClassification] = useState('');

  const calculateBMI = () => {
    if (!weight || !height) return;

    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height) / 100; // convert cm to m

    if (weightVal <= 0 || heightVal <= 0) return;

    const bmiValue = weightVal / (heightVal * heightVal);
    setBmi(parseFloat(bmiValue.toFixed(1)));

    // Classify BMI
    if (bmiValue < 18.5) {
      setClassification('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setClassification('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setClassification('Overweight');
    } else if (bmiValue >= 30 && bmiValue < 35) {
      setClassification('Class I obesity');
    } else if (bmiValue >= 35 && bmiValue < 40) {
      setClassification('Class II obesity');
    } else {
      setClassification('Class III obesity');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Body Mass Index (BMI) Calculator</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g., 70"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g., 175"
          />
        </div>
      </div>

      <button
        onClick={calculateBMI}
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 mb-4"
      >
        Calculate BMI
      </button>

      {bmi !== null && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-lg font-semibold">
            BMI: <span className="text-blue-600">{bmi}</span>
          </p>
          <p>
            Classification: <span className="font-semibold">{classification}</span>
          </p>
          <div className="mt-2 text-sm text-gray-600">
            <p>Clinical Interpretation:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Underweight: &lt;18.5 - Higher risk for nutritional deficiencies, osteoporosis</li>
              <li>Normal weight: 18.5-24.9 - Lower risk for weight-related health problems</li>
              <li>Overweight: 25-29.9 - Increased risk for type 2 diabetes, hypertension</li>
              <li>Obesity (Class I): 30-34.9 - High risk for cardiovascular disease</li>
              <li>Obesity (Class II): 35-39.9 - Very high risk for metabolic disorders</li>
              <li>Obesity (Class III): ≥40 - Extremely high risk for multiple comorbidities</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// CHA₂DS₂-VASc Score Calculator
const CHA2DS2VASCCalculator: React.FC = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [hasChf, setHasChf] = useState(false);
  const [hasHypertension, setHasHypertension] = useState(false);
  const [hasDiabetes, setHasDiabetes] = useState(false);
  const [hasStroke, setHasStroke] = useState(false);
  const [hasVascular, setHasVascular] = useState(false);

  const [score, setScore] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState('');

  const calculateScore = () => {
    if (!age || !gender) return;

    let totalScore = 0;

    // CHF
    if (hasChf) totalScore += 1;

    // Hypertension
    if (hasHypertension) totalScore += 1;

    // Age
    const ageVal = parseInt(age);
    if (ageVal >= 75) {
      totalScore += 2;
    } else if (ageVal >= 65 && ageVal < 75) {
      totalScore += 1;
    }

    // Diabetes
    if (hasDiabetes) totalScore += 1;

    // Stroke/TIA
    if (hasStroke) totalScore += 2;

    // Vascular disease
    if (hasVascular) totalScore += 1;

    // Gender (female)
    if (gender === 'female') totalScore += 1;

    setScore(totalScore);

    // Set recommendation
    if (gender === 'male') {
      if (totalScore === 0) {
        setRecommendation('No anticoagulation or aspirin recommended');
      } else if (totalScore === 1) {
        setRecommendation('Consider oral anticoagulation or aspirin, but oral anticoagulation is preferred');
      } else {
        setRecommendation('Oral anticoagulation recommended');
      }
    } else { // female
      if (totalScore === 1) {
        setRecommendation('No anticoagulation or aspirin recommended');
      } else if (totalScore === 2) {
        setRecommendation('Consider oral anticoagulation or aspirin, but oral anticoagulation is preferred');
      } else if (totalScore > 2) {
        setRecommendation('Oral anticoagulation recommended');
      } else {
        setRecommendation('No specific recommendation available');
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">CHA₂DS₂-VASc Score Calculator</h3>
      <p className="text-sm text-gray-600 mb-4">
        Used to determine stroke risk for patients with atrial fibrillation.
      </p>

      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age (years)
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g., 65"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Risk Factors</p>

          <div className="flex items-center">
            <input
              id="chf"
              type="checkbox"
              checked={hasChf}
              onChange={(e) => setHasChf(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="chf" className="ml-2 block text-sm text-gray-700">
              Congestive Heart Failure (+1)
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="hypertension"
              type="checkbox"
              checked={hasHypertension}
              onChange={(e) => setHasHypertension(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="hypertension" className="ml-2 block text-sm text-gray-700">
              Hypertension (+1)
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="diabetes"
              type="checkbox"
              checked={hasDiabetes}
              onChange={(e) => setHasDiabetes(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="diabetes" className="ml-2 block text-sm text-gray-700">
              Diabetes Mellitus (+1)
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="stroke"
              type="checkbox"
              checked={hasStroke}
              onChange={(e) => setHasStroke(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="stroke" className="ml-2 block text-sm text-gray-700">
              Stroke, TIA, or Thromboembolism (+2)
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="vascular"
              type="checkbox"
              checked={hasVascular}
              onChange={(e) => setHasVascular(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="vascular" className="ml-2 block text-sm text-gray-700">
              Vascular Disease (+1)
            </label>
          </div>
        </div>
      </div>

      <button
        onClick={calculateScore}
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 mb-4"
      >
        Calculate Score
      </button>

      {score !== null && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-lg font-semibold">
            CHA₂DS₂-VASc Score: <span className="text-blue-600">{score}</span>
          </p>
          <p className="font-semibold">
            Recommendation: <span className="text-blue-800">{recommendation}</span>
          </p>
          <div className="mt-2 text-sm text-gray-600">
            <p>Stroke Risk per Year:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Score 0: 0.2%</li>
              <li>Score 1: 0.6%</li>
              <li>Score 2: 2.2%</li>
              <li>Score 3: 3.2%</li>
              <li>Score 4: 4.8%</li>
              <li>Score 5: 7.2%</li>
              <li>Score 6: 9.7%</li>
              <li>Score 7: 11.2%</li>
              <li>Score 8: 10.8%</li>
              <li>Score 9: 12.2%</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// List of available calculators
const calculators: Calculator[] = [
  {
    id: 'bmi',
    name: 'Body Mass Index (BMI)',
    description: 'Calculate and classify body mass index based on height and weight.',
    category: 'internal',
    component: BMICalculator,
  },
  {
    id: 'cha2ds2vasc',
    name: 'CHA₂DS₂-VASc Score',
    description: 'Assess stroke risk for patients with atrial fibrillation.',
    category: 'cardiology',
    component: CHA2DS2VASCCalculator,
  },
  {
    id: 'egfr',
    name: 'eGFR Calculator',
    description: 'Estimate glomerular filtration rate for kidney function assessment.',
    category: 'internal',
    component: () => <div className="p-4 bg-gray-100 rounded-lg">Calculator coming soon</div>,
  },
  {
    id: 'hascbled',
    name: 'HAS-BLED Score',
    description: 'Assess the risk of major bleeding for patients on anticoagulation.',
    category: 'cardiology',
    component: () => <div className="p-4 bg-gray-100 rounded-lg">Calculator coming soon</div>,
  },
  {
    id: 'wells',
    name: 'Wells Score for DVT',
    description: 'Estimate the probability of deep vein thrombosis.',
    category: 'internal',
    component: () => <div className="p-4 bg-gray-100 rounded-lg">Calculator coming soon</div>,
  },
  {
    id: 'nihss',
    name: 'NIH Stroke Scale (NIHSS)',
    description: 'Quantify stroke severity for neurological assessment.',
    category: 'neurology',
    component: () => <div className="p-4 bg-gray-100 rounded-lg">Calculator coming soon</div>,
  },
  {
    id: 'map',
    name: 'Mean Arterial Pressure (MAP)',
    description: 'Calculate average arterial pressure during a cardiac cycle.',
    category: 'cardiology',
    component: () => <div className="p-4 bg-gray-100 rounded-lg">Calculator coming soon</div>,
  },
  {
    id: 'apgar',
    name: 'APGAR Score',
    description: 'Assess the health of newborns immediately after birth.',
    category: 'obstetrics',
    component: () => <div className="p-4 bg-gray-100 rounded-lg">Calculator coming soon</div>,
  },
  {
    id: 'peds-dose',
    name: 'Pediatric Dosing',
    description: 'Calculate medication dosages based on weight for pediatric patients.',
    category: 'pediatrics',
    component: () => <div className="p-4 bg-gray-100 rounded-lg">Calculator coming soon</div>,
  },
];

const ClinicalCalculators: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CalculatorCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCalculator, setSelectedCalculator] = useState<Calculator | null>(null);

  // Filter calculators by category and search term
  const filteredCalculators = calculators.filter((calc) => {
    const matchesCategory = selectedCategory === 'all' || calc.category === selectedCategory;
    const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          calc.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Clinical Calculators</h2>
      <p className="text-gray-600 mb-6">
        Evidence-based tools to assist clinical decision-making. These calculators are for professional use only and should be used in conjunction with clinical judgment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="md:col-span-3">
          <input
            type="text"
            placeholder="Search calculators..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as CalculatorCategory | 'all')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Categories</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="internal">Internal Medicine</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="obstetrics">Obstetrics</option>
            <option value="anesthesiology">Anesthesiology</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {filteredCalculators.map((calculator) => (
          <div
            key={calculator.id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition"
            onClick={() => setSelectedCalculator(calculator)}
          >
            <h3 className="text-lg font-semibold text-blue-700">{calculator.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{calculator.description}</p>
            <div className="mt-2">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {calculator.category.charAt(0).toUpperCase() + calculator.category.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredCalculators.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No calculators found matching your criteria.</p>
        </div>
      )}

      {selectedCalculator && (
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-blue-800">{selectedCalculator.name}</h3>
            <button
              onClick={() => setSelectedCalculator(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              × Close
            </button>
          </div>
          <div>
            <selectedCalculator.component />
          </div>
          <div className="mt-4 text-xs text-gray-500">
            <p>
              Disclaimer: These calculators are provided for educational purposes and clinical decision support only.
              They should not replace clinical judgment. Always refer to up-to-date guidelines and consider individual
              patient factors when making clinical decisions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicalCalculators;
