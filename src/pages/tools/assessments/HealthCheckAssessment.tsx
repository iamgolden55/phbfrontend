import React from 'react';
import AssessmentTemplate, { AssessmentQuestion } from '../../../components/assessment/AssessmentTemplate';

// Define the questions for the General Health Check assessment
const questions: AssessmentQuestion[] = [
  {
    id: 'physical_activity',
    text: 'How many days a week do you engage in at least 30 minutes of moderate physical activity?',
    required: true,
    options: [
      { value: 0, label: 'None', description: 'I don\'t regularly exercise' },
      { value: 1, label: '1-2 days', description: 'Occasional light exercise' },
      { value: 2, label: '3-4 days', description: 'Regular moderate exercise' },
      { value: 3, label: '5 or more days', description: 'Frequent exercise routine' }
    ]
  },
  {
    id: 'diet',
    text: 'How would you describe your diet?',
    required: true,
    options: [
      { value: 0, label: 'Poor', description: 'Mostly processed foods, few fruits and vegetables' },
      { value: 1, label: 'Fair', description: 'Some healthy foods, but also frequent unhealthy choices' },
      { value: 2, label: 'Good', description: 'Mostly healthy foods with occasional treats' },
      { value: 3, label: 'Excellent', description: 'Well-balanced diet rich in fruits, vegetables, and whole foods' }
    ]
  },
  {
    id: 'sleep',
    text: 'On average, how many hours of sleep do you get per night?',
    required: true,
    options: [
      { value: 0, label: 'Less than 5 hours', description: 'Significantly less than recommended' },
      { value: 1, label: '5-6 hours', description: 'Less than recommended for most adults' },
      { value: 2, label: '7-8 hours', description: 'Recommended amount for most adults' },
      { value: 3, label: 'More than 8 hours', description: 'More than typical recommendation' }
    ]
  },
  {
    id: 'stress',
    text: 'How would you rate your stress levels over the past month?',
    required: true,
    options: [
      { value: 0, label: 'Very high', description: 'Feeling overwhelmed most days' },
      { value: 1, label: 'High', description: 'Frequently feeling stressed' },
      { value: 2, label: 'Moderate', description: 'Occasional stress but generally manageable' },
      { value: 3, label: 'Low', description: 'Rarely feeling stressed' }
    ]
  },
  {
    id: 'smoking',
    text: 'Do you smoke tobacco products?',
    required: true,
    options: [
      { value: 0, label: 'Daily smoker', description: 'Smoke every day' },
      { value: 1, label: 'Occasional smoker', description: 'Smoke sometimes but not daily' },
      { value: 2, label: 'Former smoker', description: 'Used to smoke but have quit' },
      { value: 3, label: 'Non-smoker', description: 'Never smoked or very rarely' }
    ]
  },
  {
    id: 'alcohol',
    text: 'How often do you consume alcoholic beverages?',
    required: true,
    options: [
      { value: 1, label: 'Never', description: 'Don\'t drink alcohol' },
      { value: 2, label: 'Occasionally', description: '1-2 drinks per week or less' },
      { value: 3, label: 'Moderately', description: '3-7 drinks per week' },
      { value: 0, label: 'Frequently', description: 'More than 7 drinks per week' }
    ]
  },
  {
    id: 'water',
    text: 'How much water do you drink daily?',
    required: true,
    options: [
      { value: 0, label: 'Less than 2 glasses', description: 'Significantly less than recommended' },
      { value: 1, label: '2-4 glasses', description: 'Less than recommended' },
      { value: 2, label: '5-7 glasses', description: 'Close to recommended amount' },
      { value: 3, label: '8 or more glasses', description: 'Meets or exceeds recommendations' }
    ]
  },
  {
    id: 'checkups',
    text: 'How regularly do you have health check-ups?',
    required: true,
    options: [
      { value: 0, label: 'Rarely or never', description: 'Only see a doctor when sick' },
      { value: 1, label: 'Occasionally', description: 'Every few years' },
      { value: 2, label: 'Regularly', description: 'Annual or biannual check-ups' },
      { value: 3, label: 'Frequently', description: 'Multiple times per year as recommended' }
    ]
  },
  {
    id: 'chronic_conditions',
    text: 'Do you have any chronic health conditions (e.g., diabetes, hypertension, asthma)?',
    required: true,
    options: [
      { value: 0, label: 'Multiple conditions', description: 'More than one chronic condition' },
      { value: 1, label: 'One condition', description: 'One chronic condition' },
      { value: 2, label: 'Minor conditions only', description: 'Minor health issues only' },
      { value: 3, label: 'None', description: 'No chronic health conditions' }
    ]
  },
  {
    id: 'mental_health',
    text: 'How would you rate your overall mental well-being?',
    required: true,
    options: [
      { value: 0, label: 'Poor', description: 'Frequently struggling with mental health issues' },
      { value: 1, label: 'Fair', description: 'Occasional mental health challenges' },
      { value: 2, label: 'Good', description: 'Generally positive mental well-being' },
      { value: 3, label: 'Excellent', description: 'Strong mental well-being most of the time' }
    ]
  }
];

// Calculate the score and provide interpretation
const calculateScore = (answers: Record<string, string | number>) => {
  // Sum up all the numeric values from the answers
  const totalScore = Object.values(answers).reduce((sum, value) => sum + Number(value), 0);

  // Maximum possible score (3 points per question)
  const maxScore = questions.length * 3;

  // Convert to a percentage for display
  const scorePercentage = Math.round((totalScore / maxScore) * 100);

  // Determine risk level
  let riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  let interpretation: string;
  let recommendations: string[] = [];

  if (scorePercentage >= 80) {
    riskLevel = 'low';
    interpretation = "Your overall health appears to be excellent. You're maintaining healthy habits in most areas of your life.";
    recommendations = [
      'Continue with your current healthy lifestyle habits',
      'Consider setting new health goals to maintain motivation',
      'Share your successful health strategies with friends and family',
      'Schedule regular preventive check-ups to maintain your health'
    ];
  } else if (scorePercentage >= 60) {
    riskLevel = 'low';
    interpretation = "Your overall health appears to be good. You have established some healthy habits, but there may be areas for improvement.";
    recommendations = [
      'Focus on the areas where you scored lower to improve your overall health',
      'Consider consulting with a healthcare professional for personalized advice',
      'Set specific, achievable goals for areas needing improvement',
      'Try tracking your habits with a journal or app to stay motivated'
    ];
  } else if (scorePercentage >= 40) {
    riskLevel = 'moderate';
    interpretation = "Your health assessment indicates some areas of concern. Making some lifestyle changes could significantly improve your overall health.";
    recommendations = [
      'Prioritize addressing the areas where you scored lowest',
      'Consider scheduling a check-up with your healthcare provider',
      'Start with small, sustainable changes rather than trying to change everything at once',
      'Look into resources or support groups that can help with specific health challenges'
    ];
  } else {
    riskLevel = 'high';
    interpretation = "Your health assessment indicates several areas of concern. It's recommended that you consult with a healthcare professional to develop a plan for improving your health.";
    recommendations = [
      'Schedule an appointment with your healthcare provider to discuss your health concerns',
      'Focus on making one small positive change at a time',
      'Consider seeking support from health professionals, friends, or family',
      'Remember that small improvements can lead to significant health benefits over time'
    ];
  }

  return {
    score: scorePercentage,
    interpretation,
    recommendations,
    riskLevel
  };
};

const HealthCheckAssessment: React.FC = () => {
  return (
    <AssessmentTemplate
      id="health-check"
      title="General Health Check"
      description="A comprehensive assessment of your overall health status and risk factors"
      introduction="This assessment is designed to give you a general overview of your health based on lifestyle factors and health habits. It's not a diagnostic tool but can help identify areas where you might want to focus on improving your health. Answer each question honestly for the most accurate results."
      questions={questions}
      calculateScore={calculateScore}
    />
  );
};

export default HealthCheckAssessment;
