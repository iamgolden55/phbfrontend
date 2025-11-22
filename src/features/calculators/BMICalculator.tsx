import React, { useState, useEffect } from 'react';

type BMICategory = 'underweight' | 'healthy' | 'overweight' | 'obese' | null;

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [bmi, setBMI] = useState<number | null>(null);
  const [bmiCategory, setBMICategory] = useState<BMICategory>(null);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [error, setError] = useState<string | null>(null);

  const getBMICategory = (bmi: number): BMICategory => {
    if (bmi < 18.5) return 'underweight';
    if (bmi >= 18.5 && bmi < 25) return 'healthy';
    if (bmi >= 25 && bmi < 30) return 'overweight';
    return 'obese';
  };

  const calculateBMI = () => {
    setError(null);

    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    if (isNaN(weightValue) || isNaN(heightValue)) {
      setError('Please enter valid height and weight values.');
      return;
    }

    if (weightValue <= 0 || heightValue <= 0) {
      setError('Height and weight must be greater than zero.');
      return;
    }

    let bmiValue: number;

    if (unitSystem === 'metric') {
      // BMI = weight(kg) / (height(m))^2
      const heightInMeters = heightValue / 100; // Convert cm to m
      bmiValue = weightValue / (heightInMeters * heightInMeters);
    } else {
      // BMI = (weight(lbs) * 703) / (height(in))^2
      bmiValue = (weightValue * 703) / (heightValue * heightValue);
    }

    setBMI(parseFloat(bmiValue.toFixed(1)));
    setBMICategory(getBMICategory(bmiValue));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };

  const handleUnitSystemChange = (system: 'metric' | 'imperial') => {
    setUnitSystem(system);
    setHeight('');
    setWeight('');
    setBMI(null);
    setBMICategory(null);
    setError(null);
  };

  const getCategoryColor = (category: BMICategory): string => {
    switch (category) {
      case 'underweight': return 'text-blue-600';
      case 'healthy': return 'text-green-600';
      case 'overweight': return 'text-orange-600';
      case 'obese': return 'text-red-600';
      default: return '';
    }
  };

  const getHealthyWeightRange = (): string => {
    if (!height || unitSystem !== 'metric') return '';

    const heightInMeters = parseFloat(height) / 100;
    if (isNaN(heightInMeters) || heightInMeters <= 0) return '';

    const minWeight = (18.5 * heightInMeters * heightInMeters).toFixed(1);
    const maxWeight = (24.9 * heightInMeters * heightInMeters).toFixed(1);

    return `${minWeight} - ${maxWeight} kg`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">BMI Calculator</h2>
      <p className="mb-6">
        Body Mass Index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.
      </p>

      {/* Unit selection */}
      <div className="mb-6">
        <div className="flex mb-2">
          <button
            onClick={() => handleUnitSystemChange('metric')}
            className={`px-4 py-2 rounded-l-md ${
              unitSystem === 'metric'
                ? 'bg-[#0891b2] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Metric (cm, kg)
          </button>
          <button
            onClick={() => handleUnitSystemChange('imperial')}
            className={`px-4 py-2 rounded-r-md ${
              unitSystem === 'imperial'
                ? 'bg-[#0891b2] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Imperial (in, lbs)
          </button>
        </div>
      </div>

      {/* Input fields */}
      <div className="mb-6">
        <div className="mb-4">
          <label htmlFor="height" className="block font-medium mb-1">
            Height {unitSystem === 'metric' ? '(cm)' : '(inches)'}
          </label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={handleHeightChange}
            placeholder={unitSystem === 'metric' ? 'e.g., 175' : 'e.g., 69'}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="weight" className="block font-medium mb-1">
            Weight {unitSystem === 'metric' ? '(kg)' : '(lbs)'}
          </label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={handleWeightChange}
            placeholder={unitSystem === 'metric' ? 'e.g., 70' : 'e.g., 160'}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
          />
        </div>
      </div>

      {/* Calculate button */}
      <button
        onClick={calculateBMI}
        className="bg-[#0891b2] text-white px-6 py-2 rounded-md hover:bg-[#0e7490] transition-colors w-full md:w-auto"
      >
        Calculate BMI
      </button>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {/* Results */}
      {bmi !== null && bmiCategory && (
        <div className="mt-6 p-6 bg-gray-50 rounded-md border border-gray-200">
          <h3 className="text-xl font-bold mb-4">Your Results</h3>
          <div className="mb-4">
            <p className="text-gray-700">Your BMI is:</p>
            <p className="text-3xl font-bold">{bmi}</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">According to the PHB guidelines, your BMI indicates you are:</p>
            <p className={`text-xl font-bold ${getCategoryColor(bmiCategory)}`}>
              {bmiCategory.charAt(0).toUpperCase() + bmiCategory.slice(1)}
            </p>
          </div>

          {unitSystem === 'metric' && height && bmiCategory !== 'healthy' && (
            <div className="mb-4">
              <p className="text-gray-700">For your height, a healthy weight range would be:</p>
              <p className="font-bold">{getHealthyWeightRange()}</p>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="font-bold mb-2">BMI Categories:</h4>
            <ul className="space-y-1">
              <li><span className="text-blue-600 font-semibold">Underweight:</span> BMI less than 18.5</li>
              <li><span className="text-green-600 font-semibold">Healthy weight:</span> BMI 18.5 to 24.9</li>
              <li><span className="text-orange-600 font-semibold">Overweight:</span> BMI 25 to 29.9</li>
              <li><span className="text-red-600 font-semibold">Obese:</span> BMI 30 or higher</li>
            </ul>
          </div>

          <div className="mt-4 bg-blue-50 p-4 rounded-md text-sm">
            <p className="text-blue-800">
              <strong>Note:</strong> BMI is a general guide and doesn't account for factors like muscle mass, bone density, or ethnic differences.
              Consult with a healthcare professional for a complete health assessment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
