import React, { useState, useEffect } from 'react';

interface WeightRanges {
  underweight: { min: number; max: number };
  normal: { min: number; max: number };
  overweight: { min: number; max: number };
  obese: { min: number; max: number };
}

// Weight gain recommendations in kg
const singletonWeightRanges: WeightRanges = {
  underweight: { min: 12.5, max: 18 },
  normal: { min: 11.5, max: 16 },
  overweight: { min: 7, max: 11.5 },
  obese: { min: 5, max: 9 }
};

const twinsWeightRanges: WeightRanges = {
  underweight: { min: 23, max: 28 },
  normal: { min: 17, max: 25 },
  overweight: { min: 14, max: 23 },
  obese: { min: 11, max: 19 }
};

const tripletsWeightRanges: WeightRanges = {
  underweight: { min: 23, max: 28 }, // Same as twins for underweight
  normal: { min: 20, max: 28 },
  overweight: { min: 17, max: 25 },
  obese: { min: 14, max: 23 }
};

const WeightGainCalculator: React.FC = () => {
  const [height, setHeight] = useState<number | ''>(0);
  const [prePregnancyWeight, setPrePregnancyWeight] = useState<number | ''>(0);
  const [currentWeight, setCurrentWeight] = useState<number | ''>(0);
  const [gestation, setGestation] = useState<number | ''>(0);
  const [fetusCount, setFetusCount] = useState<number>(1);
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<'underweight' | 'normal' | 'overweight' | 'obese' | null>(null);
  const [recommendedGain, setRecommendedGain] = useState<{ min: number; max: number } | null>(null);
  const [currentGain, setCurrentGain] = useState<number | null>(null);
  const [weeklyGainReco, setWeeklyGainReco] = useState<{ min: number; max: number } | null>(null);
  const [gainRate, setGainRate] = useState<number | null>(null);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Calculate BMI and related values when input changes
  useEffect(() => {
    if (height && prePregnancyWeight) {
      calculateBMI();
    } else {
      setBmi(null);
      setBmiCategory(null);
      setRecommendedGain(null);
    }
  }, [height, prePregnancyWeight, fetusCount, heightUnit, weightUnit]);

  // Calculate current gain and rate when relevant input changes
  useEffect(() => {
    if (prePregnancyWeight && currentWeight && gestation) {
      calculateCurrentGain();
    } else {
      setCurrentGain(null);
      setGainRate(null);
    }
  }, [prePregnancyWeight, currentWeight, gestation, weightUnit]);

  const calculateBMI = () => {
    let heightInMeters: number;
    let weightInKg: number;

    // Convert height to meters
    if (heightUnit === 'cm' && typeof height === 'number') {
      heightInMeters = height / 100;
    } else if (heightUnit === 'ft' && typeof height === 'number') {
      heightInMeters = height * 0.3048;
    } else {
      return;
    }

    // Convert weight to kg
    if (weightUnit === 'kg' && typeof prePregnancyWeight === 'number') {
      weightInKg = prePregnancyWeight;
    } else if (weightUnit === 'lb' && typeof prePregnancyWeight === 'number') {
      weightInKg = prePregnancyWeight * 0.45359237;
    } else {
      return;
    }

    // Calculate BMI
    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
    setBmi(calculatedBMI);

    // Determine BMI category
    let category: 'underweight' | 'normal' | 'overweight' | 'obese';

    if (calculatedBMI < 18.5) {
      category = 'underweight';
    } else if (calculatedBMI < 25) {
      category = 'normal';
    } else if (calculatedBMI < 30) {
      category = 'overweight';
    } else {
      category = 'obese';
    }

    setBmiCategory(category);

    // Determine recommended weight gain
    let weightRange;

    if (fetusCount === 1) {
      weightRange = singletonWeightRanges[category];
    } else if (fetusCount === 2) {
      weightRange = twinsWeightRanges[category];
    } else {
      weightRange = tripletsWeightRanges[category];
    }

    // If user selected pounds, convert kg to pounds
    if (weightUnit === 'lb') {
      weightRange = {
        min: Math.round(weightRange.min * 2.20462),
        max: Math.round(weightRange.max * 2.20462)
      };
    }

    setRecommendedGain(weightRange);

    // Calculate recommended weekly weight gain (after first trimester)
    // General guidelines: For singleton pregnancies, about 0.5-1 lb per week (0.2-0.5 kg)
    let weeklyRange;

    if (fetusCount === 1) {
      weeklyRange = weightUnit === 'kg'
        ? { min: 0.2, max: 0.5 }
        : { min: 0.5, max: 1 };
    } else if (fetusCount === 2) {
      weeklyRange = weightUnit === 'kg'
        ? { min: 0.5, max: 0.7 }
        : { min: 1, max: 1.5 };
    } else {
      weeklyRange = weightUnit === 'kg'
        ? { min: 0.7, max: 1 }
        : { min: 1.5, max: 2 };
    }

    setWeeklyGainReco(weeklyRange);
  };

  const calculateCurrentGain = () => {
    if (typeof prePregnancyWeight === 'number' && typeof currentWeight === 'number') {
      const gain = currentWeight - prePregnancyWeight;
      setCurrentGain(gain);

      // If also have gestation weeks, calculate weekly rate (after 12 weeks)
      if (typeof gestation === 'number' && gestation > 12) {
        const weeksAfterFirstTrimester = gestation - 12;
        // Assume about 0.5-2 kg (1-4.4 lb) gained in first trimester
        const firstTrimesterGain = weightUnit === 'kg' ? 1.5 : 3.3;
        const gainAfterFirstTrimester = gain - firstTrimesterGain;

        const weeklyRate = gainAfterFirstTrimester / weeksAfterFirstTrimester;
        setGainRate(weeklyRate);
      } else {
        setGainRate(null);
      }
    }
  };

  const handleCalculate = () => {
    if (height && prePregnancyWeight) {
      calculateBMI();
      if (currentWeight && gestation) {
        calculateCurrentGain();
      }
      setShowResults(true);
    }
  };

  const renderBMICategory = () => {
    if (!bmiCategory) return null;

    const categoryInfo = {
      underweight: {
        label: 'Underweight',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        description: 'You may need to gain more weight during pregnancy.'
      },
      normal: {
        label: 'Normal Weight',
        color: 'text-green-600',
        bg: 'bg-green-50',
        description: 'Your pre-pregnancy BMI is in the healthy range.'
      },
      overweight: {
        label: 'Overweight',
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        description: 'Recommended to gain less weight during pregnancy.'
      },
      obese: {
        label: 'Obese',
        color: 'text-red-600',
        bg: 'bg-red-50',
        description: 'You should gain the least amount of weight during pregnancy.'
      },
    };

    const info = categoryInfo[bmiCategory];

    return (
      <div className={`${info.bg} p-4 rounded-md mb-4 flex items-start`}>
        <div className={`${info.color} mr-2 mt-1`}>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className={`font-bold ${info.color}`}>{info.label}</p>
          <p className="text-gray-700">{info.description}</p>
        </div>
      </div>
    );
  };

  const renderGainStatus = () => {
    if (currentGain === null || recommendedGain === null || gestation === '') {
      return null;
    }

    // Determine progress based on gestation
    const estimatedTotalGain = typeof gestation === 'number' ?
      (gestation / 40) * ((recommendedGain.min + recommendedGain.max) / 2) : 0;

    let status;
    if (currentGain < recommendedGain.min * (gestation as number / 40) * 0.85) {
      status = {
        label: 'Below Recommended',
        color: 'text-amber-600',
        message: 'You are gaining less than the recommended amount for your current week. Discuss with your healthcare provider.'
      };
    } else if (currentGain > recommendedGain.max * (gestation as number / 40) * 1.15) {
      status = {
        label: 'Above Recommended',
        color: 'text-red-600',
        message: 'You are gaining more than the recommended amount for your current week. Discuss with your healthcare provider.'
      };
    } else {
      status = {
        label: 'On Track',
        color: 'text-green-600',
        message: 'Your weight gain is within the recommended range for your current week. Great job!'
      };
    }

    return (
      <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">Current Progress</h3>
        <p className="mb-2">
          Your total weight gain so far: <span className="font-bold">{currentGain.toFixed(1)} {weightUnit}</span>
        </p>
        <p className={`font-bold ${status.color} mb-2`}>{status.label}</p>
        <p>{status.message}</p>

        {gainRate !== null && weeklyGainReco !== null && (
          <div className="mt-4">
            <p className="mb-1">
              Your average weekly gain (after week 12): <span className="font-bold">{gainRate.toFixed(1)} {weightUnit}/week</span>
            </p>
            <p className="mb-1">
              Recommended weekly gain: <span className="font-bold">{weeklyGainReco.min}-{weeklyGainReco.max} {weightUnit}/week</span>
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Pregnancy Weight Gain Calculator</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Type of Pregnancy</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    checked={fetusCount === 1}
                    onChange={() => setFetusCount(1)}
                  />
                  <span className="ml-2">Singleton</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    checked={fetusCount === 2}
                    onChange={() => setFetusCount(2)}
                  />
                  <span className="ml-2">Twins</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    checked={fetusCount === 3}
                    onChange={() => setFetusCount(3)}
                  />
                  <span className="ml-2">Triplets</span>
                </label>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Your Height</label>
              <div className="flex space-x-4">
                <div className="flex-grow">
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={height === '' ? '' : height}
                    onChange={(e) => setHeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    min="0"
                    step={heightUnit === 'cm' ? '1' : '0.01'}
                    placeholder={`Height in ${heightUnit}`}
                  />
                </div>
                <div className="flex space-x-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      checked={heightUnit === 'cm'}
                      onChange={() => setHeightUnit('cm')}
                    />
                    <span className="ml-1">cm</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      checked={heightUnit === 'ft'}
                      onChange={() => setHeightUnit('ft')}
                    />
                    <span className="ml-1">ft</span>
                  </label>
                </div>
              </div>
              {heightUnit === 'ft' && (
                <p className="text-sm text-gray-500 mt-1">
                  Example: 5'6" would be 5.5 feet (5 feet + 6 inches ÷ 12)
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Pre-Pregnancy Weight</label>
              <div className="flex space-x-4">
                <div className="flex-grow">
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={prePregnancyWeight === '' ? '' : prePregnancyWeight}
                    onChange={(e) => setPrePregnancyWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    min="0"
                    step="0.1"
                    placeholder={`Weight in ${weightUnit}`}
                  />
                </div>
                <div className="flex space-x-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      checked={weightUnit === 'kg'}
                      onChange={() => setWeightUnit('kg')}
                    />
                    <span className="ml-1">kg</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      checked={weightUnit === 'lb'}
                      onChange={() => setWeightUnit('lb')}
                    />
                    <span className="ml-1">lb</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <label className="block mb-2 font-medium">Current Weight (Optional)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={currentWeight === '' ? '' : currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value === '' ? '' : parseFloat(e.target.value))}
                min="0"
                step="0.1"
                placeholder={`Current weight in ${weightUnit}`}
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-medium">Current Week of Pregnancy (Optional)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={gestation === '' ? '' : gestation}
                onChange={(e) => setGestation(e.target.value === '' ? '' : parseFloat(e.target.value))}
                min="1"
                max="42"
                step="1"
                placeholder="Weeks"
              />
            </div>

            <div className="mt-8">
              <button
                className="w-full bg-[#005eb8] text-white py-2 px-4 rounded-md hover:bg-[#004c93] transition-colors"
                onClick={handleCalculate}
                disabled={!height || !prePregnancyWeight}
              >
                Calculate
              </button>
            </div>
          </div>
        </div>
      </div>

      {showResults && (
        <div className="mt-4 border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Your Results</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2">Pre-Pregnancy BMI</h3>
              <p className="mb-4">
                Your BMI: <span className="font-bold">{bmi !== null ? bmi.toFixed(1) : '-'}</span>
              </p>

              {renderBMICategory()}

              <h3 className="font-bold text-lg mb-2">Recommended Weight Gain</h3>
              <p className="mb-2">
                For your {fetusCount === 1 ? 'singleton' : fetusCount === 2 ? 'twin' : 'triplet'} pregnancy, the recommended
                total weight gain is:
              </p>
              <p className="text-lg font-bold mb-4 text-[#005eb8]">
                {recommendedGain ? `${recommendedGain.min}-${recommendedGain.max} ${weightUnit}` : '-'}
              </p>

              {weeklyGainReco && (
                <div className="mb-4">
                  <p className="mb-1">Recommended weekly gain (after first trimester):</p>
                  <p className="font-bold">
                    {weeklyGainReco.min}-{weeklyGainReco.max} {weightUnit}/week
                  </p>
                </div>
              )}
            </div>

            <div>
              {renderGainStatus()}

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-bold text-lg mb-2">General Weight Gain Pattern</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>First trimester: 1-2 {weightUnit}</li>
                  <li>Second trimester: Steady weight gain</li>
                  <li>Third trimester: Steady weight gain until the last month</li>
                </ul>

                <div className="mt-4">
                  <p className="text-sm text-gray-600 italic">
                    Note: These are general guidelines. Your healthcare provider may recommend a different weight gain
                    pattern based on your specific health needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeightGainCalculator;
