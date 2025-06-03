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

// Mean Arterial Pressure Calculator
const MAPCalculator: React.FC = () => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [map, setMap] = useState<number | null>(null);
  const [interpretation, setInterpretation] = useState('');

  const calculateMAP = () => {
    if (!systolic || !diastolic) return;

    const systolicVal = parseFloat(systolic);
    const diastolicVal = parseFloat(diastolic);

    if (systolicVal <= 0 || diastolicVal <= 0) return;
    if (diastolicVal >= systolicVal) {
      setInterpretation('Error: Diastolic must be lower than systolic');
      return;
    }

    const mapValue = ((2 * diastolicVal) + systolicVal) / 3;
    setMap(parseFloat(mapValue.toFixed(1)));

    // Set interpretation
    if (mapValue < 60) {
      setInterpretation('Low - Possible inadequate organ perfusion');
    } else if (mapValue >= 60 && mapValue <= 100) {
      setInterpretation('Normal');
    } else {
      setInterpretation('High - Possible hypertension');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Mean Arterial Pressure (MAP) Calculator</h3>
      <p className="text-sm text-gray-600 mb-4">
        Estimates average arterial pressure during one cardiac cycle.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Systolic BP (mmHg)
          </label>
          <input
            type="number"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g., 120"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Diastolic BP (mmHg)
          </label>
          <input
            type="number"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g., 80"
            min="1"
          />
        </div>
      </div>

      <button
        onClick={calculateMAP}
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 mb-4"
      >
        Calculate MAP
      </button>

      {map !== null && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-lg font-semibold">
            MAP: <span className="text-blue-600">{map} mmHg</span>
          </p>
          <p>
            Interpretation: <span className="font-semibold">{interpretation}</span>
          </p>
          <div className="mt-2 text-sm text-gray-600">
            <p>Clinical Reference:</p>
            <ul className="list-disc list-inside mt-1">
              <li>&lt;60 mmHg: Possible inadequate organ perfusion(Passage of blood or other fluid through the blood vessels, to other organs/tissues)</li>
              <li>60-100 mmHg: Normal range(Passage of blood or other fluid through the blood vessels, to other organs/tissues is normal)</li>
              <li>&gt;100 mmHg: Possible hypertension(Passage of blood or other fluid through the blood vessels, to other organs/tissues is too high)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// eGFR Calculator
const eGFRCalculator: React.FC = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [creatinine, setCreatinine] = useState('');
  const [egfr, setEgfr] = useState<number | null>(null);
  const [stage, setStage] = useState('');

  const calculateEGFR = () => {
    if (!age || !creatinine) return;

    const ageVal = parseFloat(age);
    const scrVal = parseFloat(creatinine);

    if (ageVal <= 0 || scrVal <= 0) return;

    let egfrValue;
    if (gender === 'female') {
      if (scrVal <= 0.7) {
        egfrValue = 144 * Math.pow(scrVal/0.7, -0.329) * Math.pow(0.993, ageVal);
      } else {
        egfrValue = 144 * Math.pow(scrVal/0.7, -1.209) * Math.pow(0.993, ageVal);
      }
    } else { // male
      if (scrVal <= 0.9) {
        egfrValue = 141 * Math.pow(scrVal/0.9, -0.411) * Math.pow(0.993, ageVal);
      } else {
        egfrValue = 141 * Math.pow(scrVal/0.9, -1.209) * Math.pow(0.993, ageVal);
      }
    }
    
    const roundedEgfr = parseFloat(egfrValue.toFixed(1));
    setEgfr(roundedEgfr);

    // Determine CKD stage
    if (roundedEgfr >= 90) {
      setStage('Normal kidney function');
    } else if (roundedEgfr >= 60) {
      setStage('Mildly decreased kidney function');
    } else if (roundedEgfr >= 30) {
      setStage('Moderately decreased kidney function');
    } else if (roundedEgfr >= 15) {
      setStage('Severely decreased kidney function');
    } else {
      setStage('Kidney failure');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">eGFR Calculator</h3>
      <p className="text-sm text-gray-600 mb-4">
        Estimates kidney function based on serum creatinine, age and gender.
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
            placeholder="e.g., 45"
            min="1"
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
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Serum Creatinine (mg/dL)
          </label>
          <input
            type="number"
            step="0.01"
            value={creatinine}
            onChange={(e) => setCreatinine(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g., 1.2"
            min="0.1"
          />
        </div>
      </div>

      <button
        onClick={calculateEGFR}
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 mb-4"
      >
        Calculate eGFR
      </button>

      {egfr !== null && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-lg font-semibold">
            eGFR: <span className="text-blue-600">{egfr} mL/min/1.73m²</span>
          </p>
          <p>
            Kidney Function: <span className="font-semibold">{stage}</span>
          </p>
          <div className="mt-2 text-sm text-gray-600">
            <p>Clinical Reference:</p>
            <ul className="list-disc list-inside mt-1">
              <li>≥90: Normal kidney function (Healthy filtering of waste from blood)</li>
              <li>60-89: Mild decrease (Kidneys filtering slightly less waste than normal)</li>
              <li>30-59: Moderate decrease (Kidneys filtering much less waste - may need monitoring)</li>
              <li>15-29: Severe decrease (Kidneys struggling to filter waste - likely needs treatment)</li>
              <li>&lt;15: Kidney failure (Kidneys barely filtering waste - needs immediate medical care)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// HAS-BLED Score Calculator
const HASBLEDCalculator: React.FC = () => {
  const [hypertension, setHypertension] = useState(false);
  const [abnormalRenal, setAbnormalRenal] = useState(false);
  const [abnormalLiver, setAbnormalLiver] = useState(false);
  const [stroke, setStroke] = useState(false);
  const [bleeding, setBleeding] = useState(false);
  const [labileINR, setLabileINR] = useState(false);
  const [elderly, setElderly] = useState(false);
  const [drugsAlcohol, setDrugsAlcohol] = useState(false);
  
  const [score, setScore] = useState<number | null>(null);
  const [risk, setRisk] = useState('');

  const calculateScore = () => {
    let totalScore = 0;
    if (hypertension) totalScore += 1;
    if (abnormalRenal) totalScore += 1;
    if (abnormalLiver) totalScore += 1;
    if (stroke) totalScore += 1;
    if (bleeding) totalScore += 1;
    if (labileINR) totalScore += 1;
    if (elderly) totalScore += 1;
    if (drugsAlcohol) totalScore += 1;
    
    setScore(totalScore);
    setRisk(totalScore >= 3 ? 'High bleeding risk' : 'Low-moderate bleeding risk');
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">HAS-BLED Score Calculator</h3>
      <p className="text-sm text-gray-600 mb-4">
        Estimates major bleeding risk for patients on anticoagulation.
      </p>

      <div className="space-y-3 mb-4">
        {[
          { label: 'Hypertension', state: hypertension, setter: setHypertension },
          { label: 'Abnormal renal function', state: abnormalRenal, setter: setAbnormalRenal },
          { label: 'Abnormal liver function', state: abnormalLiver, setter: setAbnormalLiver },
          { label: 'Stroke history', state: stroke, setter: setStroke },
          { label: 'Bleeding history', state: bleeding, setter: setBleeding },
          { label: 'Labile INR', state: labileINR, setter: setLabileINR },
          { label: 'Elderly (>65 years)', state: elderly, setter: setElderly },
          { label: 'Drugs/alcohol usage', state: drugsAlcohol, setter: setDrugsAlcohol },
        ].map((item, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              id={`hasbled-${index}`}
              checked={item.state}
              onChange={() => item.setter(!item.state)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor={`hasbled-${index}`} className="ml-2 text-sm text-gray-700">
              {item.label}
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={calculateScore}
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 mb-4"
      >
        Calculate HAS-BLED Score
      </button>

      {score !== null && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-lg font-semibold">
            Score: <span className="text-blue-600">{score}</span>
          </p>
          <p>
            Bleeding Risk: <span className="font-semibold">{risk}</span>
          </p>
          <div className="mt-2 text-sm text-gray-600">
            <p>Clinical Reference:</p>
            <ul className="list-disc list-inside mt-1">
              <li>0-2: Low-moderate risk (1.9-3.4 bleeds per 100 patient-years)</li>
              <li>≥3: High risk (8.7 bleeds per 100 patient-years)</li>
              <li>Each point increases bleeding risk by ~1.5x</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Wells Score for DVT Calculator
const WellsDVTCalculator: React.FC = () => {
  const [activeCancer, setActiveCancer] = useState(false);
  const [paralysis, setParalysis] = useState(false);
  const [bedridden, setBedridden] = useState(false);
  const [tenderness, setTenderness] = useState(false);
  const [legSwollen, setLegSwollen] = useState(false);
  const [calfSwelling, setCalfSwelling] = useState(false);
  const [pittingEdema, setPittingEdema] = useState(false);
  const [collateralVeins, setCollateralVeins] = useState(false);
  const [alternativeDiagnosis, setAlternativeDiagnosis] = useState(false);
  
  const [score, setScore] = useState<number | null>(null);
  const [probability, setProbability] = useState('');

  const calculateScore = () => {
    let totalScore = 0;
    if (activeCancer) totalScore += 1;
    if (paralysis) totalScore += 1;
    if (bedridden) totalScore += 1;
    if (tenderness) totalScore += 1;
    if (legSwollen) totalScore += 1;
    if (calfSwelling) totalScore += 1;
    if (pittingEdema) totalScore += 1;
    if (collateralVeins) totalScore += 1;
    if (alternativeDiagnosis) totalScore -= 2;
    
    setScore(totalScore);
    
    if (totalScore <= 1) {
      setProbability('Low probability (3% DVT prevalence)');
    } else if (totalScore >= 2 && totalScore <= 6) {
      setProbability('Moderate probability (17% DVT prevalence)');
    } else {
      setProbability('High probability (75% DVT prevalence)');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Wells Score for DVT</h3>
      <p className="text-sm text-gray-600 mb-4">
        Estimates probability of deep vein thrombosis.
      </p>

      <div className="space-y-3 mb-4">
        {[
          { label: 'Active cancer (treatment ongoing or <6mo)', state: activeCancer, setter: setActiveCancer },
          { label: 'Paralysis/paresis or recent cast', state: paralysis, setter: setParalysis },
          { label: 'Recently bedridden >3d or major surgery <4wk', state: bedridden, setter: setBedridden },
          { label: 'Localized tenderness along deep veins', state: tenderness, setter: setTenderness },
          { label: 'Entire leg swollen', state: legSwollen, setter: setLegSwollen },
          { label: 'Calf swelling >3cm vs asymptomatic side', state: calfSwelling, setter: setCalfSwelling },
          { label: 'Pitting edema', state: pittingEdema, setter: setPittingEdema },
          { label: 'Collateral superficial veins', state: collateralVeins, setter: setCollateralVeins },
          { label: 'Alternative diagnosis more likely', state: alternativeDiagnosis, setter: setAlternativeDiagnosis },
        ].map((item, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              id={`wellsdvt-${index}`}
              checked={item.state}
              onChange={() => item.setter(!item.state)}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <label htmlFor={`wellsdvt-${index}`} className="ml-2 text-sm text-gray-700">
              {item.label}
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={calculateScore}
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 mb-4"
      >
        Calculate Wells Score
      </button>

      {score !== null && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-lg font-semibold">
            Score: <span className="text-blue-600">{score}</span>
          </p>
          <p>
            DVT Probability: <span className="font-semibold">{probability}</span>
          </p>
          <div className="mt-2 text-sm text-gray-600">
            <p>Clinical Reference:</p>
            <ul className="list-disc list-inside mt-1">
              <li>≤1: Low probability (3% DVT prevalence)</li>
              <li>2-6: Moderate probability (17% DVT prevalence)</li>
              <li>≥7: High probability (75% DVT prevalence)</li>
              <li>Negative score possible if alternative diagnosis more likely</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// NIH Stroke Scale Calculator
const NIHStrokeScaleCalculator: React.FC = () => {
  const [items, setItems] = useState<Record<string, number>>({
    '1a-loc': 0,
    '1b-loc-questions': 0,
    '1c-loc-commands': 0,
    '2-best-gaze': 0,
    '3-visual': 0,
    '4-facial-palsy': 0,
    '5a-motor-arm-left': 0,
    '5b-motor-arm-right': 0,
    '6a-motor-leg-left': 0,
    '6b-motor-leg-right': 0,
    '7-limb-ataxia': 0,
    '8-sensory': 0,
    '9-best-language': 0,
    '10-dysarthria': 0,
    '11-extinction-inattention': 0
  });
  
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [severity, setSeverity] = useState('');

  const calculateScore = () => {
    const score = Object.values(items).reduce((sum, val) => sum + val, 0);
    setTotalScore(score);
    
    if (score === 0) {
      setSeverity('No stroke symptoms');
    } else if (score <= 4) {
      setSeverity('Minor stroke');
    } else if (score <= 15) {
      setSeverity('Moderate stroke');
    } else if (score <= 20) {
      setSeverity('Moderate to severe stroke');
    } else {
      setSeverity('Severe stroke');
    }
  };

  const handleItemChange = (item: string, value: number) => {
    setItems(prev => ({ ...prev, [item]: value }));
  };

  const itemDefinitions = [
    { id: '1a-loc', label: '1a. Level of Consciousness', options: [
      '0: Alert', '1: Not alert but arousable', '2: Not alert, repeated stimulation', '3: Unresponsive'
    ]},
    { id: '1b-loc-questions', label: '1b. Orientation Questions (month, age)', options: [
      '0: Answers both correctly', '1: Answers one correctly', '2: Neither correct'
    ]},
    { id: '1c-loc-commands', label: '1c. Response to Commands', options: [
      '0: Performs both tasks', '1: Performs one task', '2: Neither'
    ]},
    { id: '2-best-gaze', label: '2. Best Gaze', options: [
      '0: Normal', '1: Partial gaze palsy', '2: Forced deviation'
    ]},
    { id: '3-visual', label: '3. Visual', options: [
      '0: No visual loss', '1: Partial hemianopia', '2: Complete hemianopia', '3: Bilateral hemianopia'
    ]},
    { id: '4-facial-palsy', label: '4. Facial Palsy', options: [
      '0: Normal', '1: Minor paralysis', '2: Partial paralysis', '3: Complete paralysis'
    ]},
    { id: '5a-motor-arm-left', label: '5a. Motor Arm (Left)', options: [
      '0: No drift', '1: Drift before 10s', '2: Falls before 10s', '3: No effort', '4: No movement'
    ]},
    { id: '5b-motor-arm-right', label: '5b. Motor Arm (Right)', options: [
      '0: No drift', '1: Drift before 10s', '2: Falls before 10s', '3: No effort', '4: No movement'
    ]},
    { id: '6a-motor-leg-left', label: '6a. Motor Leg (Left)', options: [
      '0: No drift', '1: Drift before 5s', '2: Falls before 5s', '3: No effort', '4: No movement'
    ]},
    { id: '6b-motor-leg-right', label: '6b. Motor Leg (Right)', options: [
      '0: No drift', '1: Drift before 5s', '2: Falls before 5s', '3: No effort', '4: No movement'
    ]},
    { id: '7-limb-ataxia', label: '7. Limb Ataxia', options: [
      '0: Absent', '1: Present in one limb', '2: Present in two limbs'
    ]},
    { id: '8-sensory', label: '8. Sensory', options: [
      '0: Normal', '1: Mild loss', '2: Severe loss'
    ]},
    { id: '9-best-language', label: '9. Best Language', options: [
      '0: No aphasia', '1: Mild aphasia', '2: Severe aphasia', '3: Mute'
    ]},
    { id: '10-dysarthria', label: '10. Dysarthria', options: [
      '0: Normal', '1: Mild', '2: Severe', '3: Intubated'
    ]},
    { id: '11-extinction-inattention', label: '11. Extinction/Inattention', options: [
      '0: Absent', '1: Mild', '2: Severe'
    ]}
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">NIH Stroke Scale (NIHSS)</h3>
      <p className="text-sm text-gray-600 mb-4">
        Quantifies stroke severity through neurological assessment.
      </p>

      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
        {itemDefinitions.map((item) => (
          <div key={item.id} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {item.label}
            </label>
            <div className="space-y-1">
              {item.options.map((option, idx) => {
                const value = parseInt(option.split(':')[0]);
                return (
                  <div key={idx} className="flex items-center">
                    <input
                      type="radio"
                      id={`${item.id}-${idx}`}
                      name={item.id}
                      checked={items[item.id] === value}
                      onChange={() => handleItemChange(item.id, value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label htmlFor={`${item.id}-${idx}`} className="ml-2 text-sm text-gray-700">
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={calculateScore}
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 mb-4"
      >
        Calculate NIHSS Score
      </button>

      {totalScore !== null && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-lg font-semibold">
            Total Score: <span className="text-blue-600">{totalScore}</span>
          </p>
          <p>
            Stroke Severity: <span className="font-semibold">{severity}</span>
          </p>
          <div className="mt-2 text-sm text-gray-600">
            <p>Clinical Reference:</p>
            <ul className="list-disc list-inside mt-1">
              <li>0: No stroke symptoms</li>
              <li>1-4: Minor stroke</li>
              <li>5-15: Moderate stroke</li>
              <li>16-20: Moderate to severe stroke</li>
              <li>21-42: Severe stroke</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// APGAR Score Calculator
const APGARCalculator: React.FC = () => {
  const [appearance, setAppearance] = useState(2);
  const [pulse, setPulse] = useState(2);
  const [grimace, setGrimace] = useState(2);
  const [activity, setActivity] = useState(2);
  const [respiration, setRespiration] = useState(2);
  
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  const calculateScore = () => {
    const score = appearance + pulse + grimace + activity + respiration;
    setTotalScore(score);
    
    if (score >= 7) {
      setStatus('Normal - Routine care');
    } else if (score >= 4) {
      setStatus('Moderately depressed - May need oxygen/suctioning');
    } else {
      setStatus('Severely depressed - Needs resuscitation');
    }
  };

  const apgarComponents = [
    {
      name: 'Appearance (Skin color)',
      value: appearance,
      setter: setAppearance,
      options: [
        '0: Blue/pale all over',
        '1: Body pink, extremities blue',
        '2: Completely pink'
      ]
    },
    {
      name: 'Pulse (Heart rate)',
      value: pulse,
      setter: setPulse,
      options: [
        '0: Absent',
        '1: <100 bpm',
        '2: ≥100 bpm'
      ]
    },
    {
      name: 'Grimace (Reflex irritability)',
      value: grimace,
      setter: setGrimace,
      options: [
        '0: No response',
        '1: Grimace/feeble cry',
        '2: Vigorous cry/pulls away'
      ]
    },
    {
      name: 'Activity (Muscle tone)',
      value: activity,
      setter: setActivity,
      options: [
        '0: Limp/floppy',
        '1: Some flexion',
        '2: Active motion'
      ]
    },
    {
      name: 'Respiration (Breathing)',
      value: respiration,
      setter: setRespiration,
      options: [
        '0: Absent',
        '1: Weak/irregular',
        '2: Strong cry'
      ]
    }
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">APGAR Score Calculator</h3>
      <p className="text-sm text-gray-600 mb-4">
        Assesses newborn health immediately after birth.
      </p>

      <div className="space-y-4 mb-4">
        {apgarComponents.map((component, idx) => (
          <div key={idx} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {component.name}
            </label>
            <div className="space-y-1">
              {component.options.map((option, optIdx) => {
                const value = parseInt(option.split(':')[0]);
                return (
                  <div key={optIdx} className="flex items-center">
                    <input
                      type="radio"
                      id={`${idx}-${optIdx}`}
                      name={component.name}
                      checked={component.value === value}
                      onChange={() => component.setter(value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label htmlFor={`${idx}-${optIdx}`} className="ml-2 text-sm text-gray-700">
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={calculateScore}
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 mb-4"
      >
        Calculate APGAR Score
      </button>

      {totalScore !== null && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-lg font-semibold">
            APGAR Score: <span className="text-blue-600">{totalScore}</span>
          </p>
          <p>
            Newborn Status: <span className="font-semibold">{status}</span>
          </p>
          <div className="mt-2 text-sm text-gray-600">
            <p>Clinical Reference:</p>
            <ul className="list-disc list-inside mt-1">
              <li>7-10: Normal - Routine care</li>
              <li>4-6: Moderately depressed - May need oxygen/suctioning</li>
              <li>0-3: Severely depressed - Needs resuscitation</li>
              <li>Typically scored at 1 and 5 minutes after birth</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Pediatric Dosing Calculator
const PediatricDosingCalculator: React.FC = () => {
  const medications = [
    { name: 'Acetaminophen', dose: '15 mg/kg', max: '75 mg/kg/day', form: 'liquid' },
    { name: 'Ibuprofen', dose: '10 mg/kg', max: '40 mg/kg/day', form: 'liquid' },
    { name: 'Amoxicillin', dose: '45 mg/kg/day', max: '4 g/day', form: 'liquid' },
    { name: 'Ceftriaxone', dose: '50-75 mg/kg/day', max: '2 g/day', form: 'IV' },
    { name: 'Prednisolone', dose: '1-2 mg/kg/day', max: '80 mg/day', form: 'liquid' },
  ];
  
  const [weight, setWeight] = useState('');
  const [medication, setMedication] = useState(medications[0]);
  const [dose, setDose] = useState<{amount: number | null; volume: string | null}>({amount: null, volume: null});

  const calculateDose = () => {
    if (!weight) return;
    
    const weightVal = parseFloat(weight);
    if (weightVal <= 0) return;
    
    // Extract numeric dose value (e.g. '15 mg/kg' -> 15)
    const dosePerKg = parseFloat(medication.dose.split(' ')[0]);
    const calculatedDose = weightVal * dosePerKg;
    
    // For liquid forms, calculate volume (assuming standard concentrations)
    let volume = null;
    if (medication.form === 'liquid') {
      const concentration = medication.name === 'Amoxicillin' ? 250 : 160; // mg/5ml
      volume = `${((calculatedDose / concentration) * 5).toFixed(1)} ml`;
    }
    
    setDose({
      amount: parseFloat(calculatedDose.toFixed(1)),
      volume
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Pediatric Dosing Calculator</h3>
      <p className="text-sm text-gray-600 mb-4">
        Calculate medication dosages based on weight for pediatric patients.
      </p>

      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="e.g., 15"
            min="0.1"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medication
          </label>
          <select
            value={medication.name}
            onChange={(e) => {
              const selected = medications.find(m => m.name === e.target.value);
              if (selected) setMedication(selected);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {medications.map((med, idx) => (
              <option key={idx} value={med.name}>
                {med.name} ({med.dose})
              </option>
            ))}
          </select>
        </div>

        <div className="text-sm text-gray-600">
          <p>Recommended: {medication.dose}</p>
          <p>Maximum: {medication.max}</p>
          <p>Form: {medication.form}</p>
        </div>
      </div>

      <button
        onClick={calculateDose}
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 mb-4"
      >
        Calculate Dose
      </button>

      {dose.amount !== null && (
        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-lg font-semibold">
            Dose: <span className="text-blue-600">{dose.amount} mg</span>
          </p>
          {dose.volume && (
            <p className="text-lg font-semibold mt-2">
              Volume: <span className="text-blue-600">{dose.volume}</span>
            </p>
          )}
          <div className="mt-2 text-sm text-gray-600">
            <p>Clinical Notes:</p>
            <ul className="list-disc list-inside mt-1">
              <li>Always verify dose with current guidelines</li>
              <li>Check for contraindications</li>
              <li>Adjust for renal/hepatic impairment if needed</li>
              <li>Confirm medication concentration before administration</li>
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
    component: eGFRCalculator,
  },
  {
    id: 'hasbled',
    name: 'HAS-BLED Score',
    description: 'Assess the risk of major bleeding for patients on anticoagulation.',
    category: 'cardiology',
    component: HASBLEDCalculator,
  },
  {
    id: 'wells',
    name: 'Wells Score for DVT',
    description: 'Estimate the probability of deep vein thrombosis.',
    category: 'internal',
    component: WellsDVTCalculator,
  },
  {
    id: 'nihss',
    name: 'NIH Stroke Scale (NIHSS)',
    description: 'Quantify stroke severity for neurological assessment.',
    category: 'neurology',
    component: NIHStrokeScaleCalculator,
  },
  {
    id: 'map',
    name: 'Mean Arterial Pressure (MAP)',
    description: 'Calculate average arterial pressure during a cardiac cycle.',
    category: 'cardiology',
    component: MAPCalculator,
  },
  {
    id: 'apgar',
    name: 'APGAR Score',
    description: 'Assess the health of newborns immediately after birth.',
    category: 'obstetrics',
    component: APGARCalculator,
  },
  {
    id: 'peds-dose',
    name: 'Pediatric Dosing',
    description: 'Calculate medication dosages based on weight for pediatric patients.',
    category: 'pediatrics',
    component: PediatricDosingCalculator,
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
