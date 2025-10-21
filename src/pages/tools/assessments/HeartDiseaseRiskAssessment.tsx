import React from 'react';
import AssessmentTemplate, { AssessmentQuestion } from '../../../components/assessment/AssessmentTemplate';

// Define the questions for the Heart Disease Risk assessment (based on Framingham Risk Score)
const questions: AssessmentQuestion[] = [
  {
    id: 'age',
    text: 'What is your age?',
    required: true,
    options: [
      { value: 0, label: 'Under 30', description: 'Lower age-related risk' },
      { value: 1, label: '30-39', description: 'Low age-related risk' },
      { value: 2, label: '40-49', description: 'Moderate age-related risk' },
      { value: 3, label: '50-59', description: 'Increased age-related risk' },
      { value: 4, label: '60 or older', description: 'Higher age-related risk' }
    ]
  },
  {
    id: 'gender',
    text: 'What is your biological sex?',
    required: true,
    options: [
      { value: 0, label: 'Female', description: 'Generally lower cardiovascular risk' },
      { value: 1, label: 'Male', description: 'Generally higher cardiovascular risk' }
    ]
  },
  {
    id: 'blood_pressure',
    text: 'Do you have high blood pressure or are you taking blood pressure medication?',
    required: true,
    options: [
      { value: 0, label: 'No, blood pressure is normal', description: 'Below 120/80 mmHg' },
      { value: 1, label: 'Slightly elevated', description: '120-129/80-84 mmHg' },
      { value: 2, label: 'Stage 1 hypertension', description: '130-139/85-89 mmHg' },
      { value: 3, label: 'Stage 2 hypertension', description: '140+/90+ mmHg or on medication' }
    ]
  },
  {
    id: 'cholesterol',
    text: 'What is your cholesterol level status?',
    required: true,
    options: [
      { value: 0, label: 'Normal (healthy range)', description: 'Total cholesterol below 200 mg/dL' },
      { value: 1, label: 'Borderline high', description: 'Total cholesterol 200-239 mg/dL' },
      { value: 2, label: 'High', description: 'Total cholesterol 240+ mg/dL or on medication' },
      { value: 3, label: "Don't know", description: 'Not recently tested' }
    ]
  },
  {
    id: 'smoking',
    text: 'Do you currently smoke or have you smoked in the past year?',
    required: true,
    options: [
      { value: 0, label: 'Never smoked', description: 'Never been a regular smoker' },
      { value: 1, label: 'Former smoker (quit over 1 year ago)', description: 'Successfully quit smoking' },
      { value: 2, label: 'Current smoker', description: 'Currently smoke regularly' }
    ]
  },
  {
    id: 'diabetes',
    text: 'Do you have diabetes?',
    required: true,
    options: [
      { value: 0, label: 'No', description: 'No diabetes diagnosis' },
      { value: 1, label: 'Pre-diabetes', description: 'Elevated blood sugar levels' },
      { value: 2, label: 'Type 2 diabetes', description: 'Diagnosed with type 2 diabetes' },
      { value: 3, label: 'Type 1 diabetes', description: 'Diagnosed with type 1 diabetes' }
    ]
  },
  {
    id: 'family_history',
    text: 'Do you have a family history of heart disease?',
    required: true,
    options: [
      { value: 0, label: 'No known family history', description: 'No close relatives with heart disease' },
      { value: 1, label: 'Family history after age 60', description: 'Parents/siblings had heart disease after 60' },
      { value: 2, label: 'Family history before age 60', description: 'Parents/siblings had heart disease before 60' }
    ]
  },
  {
    id: 'bmi',
    text: 'What is your Body Mass Index (BMI) category?',
    required: true,
    options: [
      { value: 0, label: 'Normal weight (18.5-24.9)', description: 'Healthy weight range' },
      { value: 1, label: 'Overweight (25-29.9)', description: 'Above healthy weight range' },
      { value: 2, label: 'Obese (30+)', description: 'Significantly above healthy weight range' },
      { value: 3, label: 'Underweight (below 18.5)', description: 'Below healthy weight range' }
    ]
  },
  {
    id: 'physical_activity',
    text: 'How much moderate to vigorous physical activity do you get per week?',
    required: true,
    options: [
      { value: 0, label: '150+ minutes', description: 'Meets or exceeds recommendations' },
      { value: 1, label: '75-149 minutes', description: 'Some regular activity' },
      { value: 2, label: 'Less than 75 minutes', description: 'Below recommended levels' },
      { value: 3, label: 'Little to no activity', description: 'Sedentary lifestyle' }
    ]
  },
  {
    id: 'diet',
    text: 'How would you describe your diet?',
    required: true,
    options: [
      { value: 0, label: 'Heart-healthy diet', description: 'Rich in fruits, vegetables, whole grains, lean proteins' },
      { value: 1, label: 'Moderately healthy', description: 'Some healthy foods, some processed foods' },
      { value: 2, label: 'Poor diet', description: 'High in processed foods, saturated fats, sodium' }
    ]
  },
  {
    id: 'stress',
    text: 'How would you rate your stress levels?',
    required: true,
    options: [
      { value: 0, label: 'Low stress', description: 'Well-managed, minimal stress' },
      { value: 1, label: 'Moderate stress', description: 'Some stress, generally manageable' },
      { value: 2, label: 'High stress', description: 'Frequently stressed or overwhelmed' },
      { value: 3, label: 'Very high stress', description: 'Chronic, unmanaged stress' }
    ]
  },
  {
    id: 'alcohol',
    text: 'How many alcoholic drinks do you consume per week?',
    required: true,
    options: [
      { value: 0, label: 'None or occasional', description: '0-7 drinks per week' },
      { value: 1, label: 'Moderate consumption', description: '8-14 drinks per week' },
      { value: 2, label: 'Heavy consumption', description: '15+ drinks per week' }
    ]
  }
];

// Calculate the score and provide interpretation
const calculateScore = (answers: Record<string, string | number>) => {
  // Sum up all the numeric values from the answers
  const totalScore = Object.values(answers).reduce((sum, value) => sum + Number(value), 0);

  // Calculate risk percentage (normalized to 100)
  const maxScore = 36; // Maximum possible risk score
  const scorePercentage = Math.round((totalScore / maxScore) * 100);

  // Determine risk level
  let riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  let interpretation: string;
  let recommendations: string[] = [];

  if (scorePercentage < 20) {
    riskLevel = 'low';
    interpretation = "Your 10-year cardiovascular disease risk appears to be low. Your current lifestyle and health factors suggest a reduced risk of heart disease.";
    recommendations = [
      'Continue maintaining a heart-healthy lifestyle with regular exercise and balanced nutrition',
      'Schedule regular check-ups to monitor blood pressure and cholesterol levels',
      'Avoid starting smoking and limit alcohol consumption',
      'Maintain a healthy weight through diet and physical activity',
      'Manage stress through relaxation techniques and adequate sleep'
    ];
  } else if (scorePercentage < 40) {
    riskLevel = 'moderate';
    interpretation = "Your 10-year cardiovascular disease risk is moderate. Some lifestyle changes could help reduce your risk further.";
    recommendations = [
      'Consult with your healthcare provider about your cardiovascular risk factors',
      'Increase physical activity to at least 150 minutes of moderate exercise per week',
      'Adopt a heart-healthy diet low in saturated fats, sodium, and processed foods',
      'If you smoke, seek support to quit smoking',
      'Monitor and manage blood pressure and cholesterol levels regularly',
      'Maintain a healthy weight through balanced nutrition and exercise'
    ];
  } else if (scorePercentage < 60) {
    riskLevel = 'high';
    interpretation = "Your 10-year cardiovascular disease risk is elevated. It's important to take action to reduce your risk factors.";
    recommendations = [
      'Schedule an appointment with your healthcare provider to discuss your cardiovascular health',
      'Work with your doctor to manage blood pressure, cholesterol, and blood sugar levels',
      'If you smoke, quitting is one of the most important steps you can take',
      'Increase physical activity gradually with your doctor\'s guidance',
      'Adopt a Mediterranean-style or DASH diet to support heart health',
      'Consider stress management techniques such as meditation or counseling',
      'Your doctor may recommend medications to manage risk factors'
    ];
  } else {
    riskLevel = 'very-high';
    interpretation = "Your assessment indicates a high 10-year cardiovascular disease risk. Immediate medical consultation is strongly recommended.";
    recommendations = [
      'Schedule an urgent appointment with your healthcare provider',
      'You may need medications to manage blood pressure, cholesterol, or diabetes',
      'Work closely with your healthcare team to create a comprehensive treatment plan',
      'If you smoke, seek immediate support to quit',
      'Follow your doctor\'s recommendations for diet, exercise, and lifestyle modifications',
      'Regular monitoring and follow-up appointments will be essential',
      'Consider cardiac rehabilitation programs if recommended by your doctor',
      'Know the warning signs of heart attack and stroke'
    ];
  }

  return {
    score: scorePercentage,
    interpretation,
    recommendations,
    riskLevel
  };
};

const HeartDiseaseRiskAssessment: React.FC = () => {
  return (
    <AssessmentTemplate
      id="heart-disease-risk"
      title="Heart Disease Risk Calculator"
      description="Assess your risk of developing cardiovascular disease in the next 10 years"
      introduction="This assessment is based on established cardiovascular risk factors including the Framingham Risk Score criteria. It evaluates your current health status and lifestyle factors that contribute to heart disease risk. This is not a diagnostic tool and should not replace professional medical advice. Please answer honestly for the most accurate risk assessment."
      questions={questions}
      calculateScore={calculateScore}
    />
  );
};

export default HeartDiseaseRiskAssessment;
