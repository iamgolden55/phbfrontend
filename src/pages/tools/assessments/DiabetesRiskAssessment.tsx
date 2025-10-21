import React from 'react';
import AssessmentTemplate, { AssessmentQuestion } from '../../../components/assessment/AssessmentTemplate';

// Define the questions for Type 2 Diabetes Risk assessment (based on ADA risk test)
const questions: AssessmentQuestion[] = [
  {
    id: 'age',
    text: 'How old are you?',
    required: true,
    options: [
      { value: 0, label: 'Under 40', description: 'Lower age-related risk' },
      { value: 1, label: '40-49', description: 'Moderate age-related risk' },
      { value: 2, label: '50-59', description: 'Increased age-related risk' },
      { value: 3, label: '60 or older', description: 'Higher age-related risk' }
    ]
  },
  {
    id: 'gender',
    text: 'What is your biological sex?',
    required: true,
    options: [
      { value: 0, label: 'Female', description: '' },
      { value: 1, label: 'Male', description: 'Males have slightly higher risk' }
    ]
  },
  {
    id: 'family_history',
    text: 'Do you have a parent, brother, or sister with diabetes?',
    required: true,
    options: [
      { value: 0, label: 'No', description: 'No immediate family history' },
      { value: 2, label: 'Yes', description: 'Family history significantly increases risk' }
    ]
  },
  {
    id: 'bmi',
    text: 'What is your Body Mass Index (BMI) range?',
    required: true,
    options: [
      { value: 0, label: 'Under 25 (Normal weight)', description: 'Healthy weight range' },
      { value: 1, label: '25-29.9 (Overweight)', description: 'Increased risk' },
      { value: 2, label: '30-34.9 (Obese Class I)', description: 'High risk' },
      { value: 3, label: '35+ (Obese Class II+)', description: 'Very high risk' }
    ]
  },
  {
    id: 'physical_activity',
    text: 'How physically active are you?',
    required: true,
    options: [
      { value: 0, label: 'Very active', description: 'Regular vigorous exercise most days' },
      { value: 1, label: 'Moderately active', description: 'Some regular physical activity' },
      { value: 2, label: 'Not very active', description: 'Minimal physical activity' },
      { value: 3, label: 'Sedentary', description: 'Little to no physical activity' }
    ]
  },
  {
    id: 'gestational_diabetes',
    text: 'For women: Have you ever been diagnosed with gestational diabetes (diabetes during pregnancy)?',
    required: false,
    options: [
      { value: 0, label: 'No or not applicable', description: 'Never had gestational diabetes or not female' },
      { value: 2, label: 'Yes', description: 'Previous gestational diabetes increases risk' }
    ]
  },
  {
    id: 'blood_pressure',
    text: 'Have you ever been told you have high blood pressure?',
    required: true,
    options: [
      { value: 0, label: 'No', description: 'Normal blood pressure' },
      { value: 1, label: 'Yes', description: 'High blood pressure increases diabetes risk' }
    ]
  },
  {
    id: 'prediabetes',
    text: 'Have you ever been told you have pre-diabetes or borderline diabetes?',
    required: true,
    options: [
      { value: 0, label: 'No', description: 'No previous diagnosis' },
      { value: 2, label: 'Yes', description: 'Pre-diabetes is a strong risk factor' }
    ]
  }
];

// Calculate the score and provide interpretation
const calculateScore = (answers: Record<string, string | number>) => {
  // Sum up all the numeric values from the answers
  const totalScore = Object.values(answers).reduce((sum, value) => sum + Number(value), 0);

  // Maximum possible score
  const maxScore = 17;
  const scorePercentage = Math.round((totalScore / maxScore) * 100);

  // Determine risk level based on standard diabetes risk score
  let riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  let interpretation: string;
  let recommendations: string[] = [];

  if (totalScore < 3) {
    riskLevel = 'low';
    interpretation = "Your risk of developing type 2 diabetes is currently low. Your lifestyle and health factors suggest good metabolic health.";
    recommendations = [
      'Continue maintaining a healthy weight and active lifestyle',
      'Eat a balanced diet rich in whole grains, fruits, vegetables, and lean proteins',
      'Stay physically active with at least 150 minutes of moderate exercise per week',
      'Get regular health screenings as recommended by your healthcare provider',
      'Limit sugary drinks and processed foods high in added sugars'
    ];
  } else if (totalScore < 6) {
    riskLevel = 'moderate';
    interpretation = "You have a moderate risk of developing type 2 diabetes. Making some lifestyle changes now can help prevent diabetes.";
    recommendations = [
      'Schedule a check-up with your healthcare provider to discuss diabetes screening',
      'Work towards achieving and maintaining a healthy weight',
      'Increase your physical activity to at least 150 minutes of moderate exercise per week',
      'Choose whole grains over refined grains and limit added sugars',
      'Monitor your blood sugar levels as recommended by your doctor',
      'Reduce portion sizes and practice mindful eating',
      'Stay hydrated by drinking water instead of sugary beverages'
    ];
  } else if (totalScore < 9) {
    riskLevel = 'high';
    interpretation = "You have a high risk of developing type 2 diabetes. It's important to take preventive action now.";
    recommendations = [
      'Schedule an appointment with your healthcare provider for blood glucose testing',
      'Ask about diabetes prevention programs in your area',
      'Work with a registered dietitian to develop a healthy eating plan',
      'Set a goal to lose 5-7% of your body weight if you are overweight',
      'Aim for at least 150 minutes of moderate-intensity physical activity per week',
      'Monitor your blood pressure and cholesterol levels',
      'Your doctor may recommend metformin if you have pre-diabetes',
      'Track your food intake and physical activity to stay accountable'
    ];
  } else {
    riskLevel = 'very-high';
    interpretation = "Your risk of type 2 diabetes is very high. Immediate consultation with a healthcare provider is strongly recommended.";
    recommendations = [
      'Schedule an urgent appointment with your healthcare provider for diabetes screening',
      'Ask about referral to a diabetes prevention program',
      'Request consultation with an endocrinologist if not already seeing one',
      'Work with a certified diabetes educator and registered dietitian',
      'Your doctor may prescribe metformin to help prevent diabetes progression',
      'Set realistic weight loss goals with medical supervision',
      'Start a structured exercise program approved by your doctor',
      'Monitor blood glucose levels as directed by your healthcare provider',
      'Learn to recognize symptoms of diabetes and seek immediate care if they develop'
    ];
  }

  return {
    score: scorePercentage,
    interpretation,
    recommendations,
    riskLevel
  };
};

const DiabetesRiskAssessment: React.FC = () => {
  return (
    <AssessmentTemplate
      id="diabetes-risk"
      title="Type 2 Diabetes Risk Assessment"
      description="Check your risk of developing type 2 diabetes based on lifestyle and family history"
      introduction="This assessment is based on the American Diabetes Association (ADA) Type 2 Diabetes Risk Test. It evaluates your risk factors for developing type 2 diabetes. Early detection and lifestyle changes can prevent or delay the onset of type 2 diabetes. This tool is for screening purposes only and is not a diagnostic tool. Please consult with a healthcare provider for proper evaluation and testing."
      questions={questions}
      calculateScore={calculateScore}
    />
  );
};

export default DiabetesRiskAssessment;
