import React from 'react';
import AssessmentTemplate, { AssessmentQuestion } from '../../../components/assessment/AssessmentTemplate';

// Define the questions for the Mental Wellbeing assessment
const questions: AssessmentQuestion[] = [
  {
    id: 'feeling_optimistic',
    text: "I've been feeling optimistic about the future",
    required: true,
    options: [
      { value: 0, label: 'None of the time', description: 'Rarely or never felt this way' },
      { value: 1, label: 'Rarely', description: 'Felt this way once or twice' },
      { value: 2, label: 'Some of the time', description: 'Felt this way on several days' },
      { value: 3, label: 'Often', description: 'Felt this way more than half the days' },
      { value: 4, label: 'All of the time', description: 'Felt this way nearly every day' }
    ]
  },
  {
    id: 'feeling_useful',
    text: "I've been feeling useful",
    required: true,
    options: [
      { value: 0, label: 'None of the time', description: 'Rarely or never felt this way' },
      { value: 1, label: 'Rarely', description: 'Felt this way once or twice' },
      { value: 2, label: 'Some of the time', description: 'Felt this way on several days' },
      { value: 3, label: 'Often', description: 'Felt this way more than half the days' },
      { value: 4, label: 'All of the time', description: 'Felt this way nearly every day' }
    ]
  },
  {
    id: 'feeling_relaxed',
    text: "I've been feeling relaxed",
    required: true,
    options: [
      { value: 0, label: 'None of the time', description: 'Rarely or never felt this way' },
      { value: 1, label: 'Rarely', description: 'Felt this way once or twice' },
      { value: 2, label: 'Some of the time', description: 'Felt this way on several days' },
      { value: 3, label: 'Often', description: 'Felt this way more than half the days' },
      { value: 4, label: 'All of the time', description: 'Felt this way nearly every day' }
    ]
  },
  {
    id: 'interest_in_others',
    text: "I've been feeling interested in other people",
    required: true,
    options: [
      { value: 0, label: 'None of the time', description: 'Rarely or never felt this way' },
      { value: 1, label: 'Rarely', description: 'Felt this way once or twice' },
      { value: 2, label: 'Some of the time', description: 'Felt this way on several days' },
      { value: 3, label: 'Often', description: 'Felt this way more than half the days' },
      { value: 4, label: 'All of the time', description: 'Felt this way nearly every day' }
    ]
  },
  {
    id: 'energy_spare',
    text: "I've had energy to spare",
    required: true,
    options: [
      { value: 0, label: 'None of the time', description: 'Rarely or never felt this way' },
      { value: 1, label: 'Rarely', description: 'Felt this way once or twice' },
      { value: 2, label: 'Some of the time', description: 'Felt this way on several days' },
      { value: 3, label: 'Often', description: 'Felt this way more than half the days' },
      { value: 4, label: 'All of the time', description: 'Felt this way nearly every day' }
    ]
  },
  {
    id: 'dealing_with_problems',
    text: "I've been dealing with problems well",
    required: true,
    options: [
      { value: 0, label: 'None of the time', description: 'Rarely or never felt this way' },
      { value: 1, label: 'Rarely', description: 'Felt this way once or twice' },
      { value: 2, label: 'Some of the time', description: 'Felt this way on several days' },
      { value: 3, label: 'Often', description: 'Felt this way more than half the days' },
      { value: 4, label: 'All of the time', description: 'Felt this way nearly every day' }
    ]
  },
  {
    id: 'thinking_clearly',
    text: "I've been thinking clearly",
    required: true,
    options: [
      { value: 0, label: 'None of the time', description: 'Rarely or never felt this way' },
      { value: 1, label: 'Rarely', description: 'Felt this way once or twice' },
      { value: 2, label: 'Some of the time', description: 'Felt this way on several days' },
      { value: 3, label: 'Often', description: 'Felt this way more than half the days' },
      { value: 4, label: 'All of the time', description: 'Felt this way nearly every day' }
    ]
  },
  {
    id: 'good_about_self',
    text: "I've been feeling good about myself",
    required: true,
    options: [
      { value: 0, label: 'None of the time', description: 'Rarely or never felt this way' },
      { value: 1, label: 'Rarely', description: 'Felt this way once or twice' },
      { value: 2, label: 'Some of the time', description: 'Felt this way on several days' },
      { value: 3, label: 'Often', description: 'Felt this way more than half the days' },
      { value: 4, label: 'All of the time', description: 'Felt this way nearly every day' }
    ]
  },
  {
    id: 'close_to_others',
    text: "I've been feeling close to other people",
    required: true,
    options: [
      { value: 0, label: 'None of the time', description: 'Rarely or never felt this way' },
      { value: 1, label: 'Rarely', description: 'Felt this way once or twice' },
      { value: 2, label: 'Some of the time', description: 'Felt this way on several days' },
      { value: 3, label: 'Often', description: 'Felt this way more than half the days' },
      { value: 4, label: 'All of the time', description: 'Felt this way nearly every day' }
    ]
  },
  {
    id: 'feeling_confident',
    text: "I've been feeling confident",
    required: true,
    options: [
      { value: 0, label: 'None of the time', description: 'Rarely or never felt this way' },
      { value: 1, label: 'Rarely', description: 'Felt this way once or twice' },
      { value: 2, label: 'Some of the time', description: 'Felt this way on several days' },
      { value: 3, label: 'Often', description: 'Felt this way more than half the days' },
      { value: 4, label: 'All of the time', description: 'Felt this way nearly every day' }
    ]
  },
  {
    id: 'make_up_mind',
    text: "I've been able to make up my own mind about things",
    required: true,
    options: [
      { value: 0, label: 'None of the time', description: 'Rarely or never felt this way' },
      { value: 1, label: 'Rarely', description: 'Felt this way once or twice' },
      { value: 2, label: 'Some of the time', description: 'Felt this way on several days' },
      { value: 3, label: 'Often', description: 'Felt this way more than half the days' },
      { value: 4, label: 'All of the time', description: 'Felt this way nearly every day' }
    ]
  },
  {
    id: 'feeling_loved',
    text: "I've been feeling loved",
    required: true,
    options: [
      { value: 0, label: 'None of the time', description: 'Rarely or never felt this way' },
      { value: 1, label: 'Rarely', description: 'Felt this way once or twice' },
      { value: 2, label: 'Some of the time', description: 'Felt this way on several days' },
      { value: 3, label: 'Often', description: 'Felt this way more than half the days' },
      { value: 4, label: 'All of the time', description: 'Felt this way nearly every day' }
    ]
  },
  {
    id: 'interested_new_things',
    text: "I've been interested in new things",
    required: true,
    options: [
      { value: 0, label: 'None of the time', description: 'Rarely or never felt this way' },
      { value: 1, label: 'Rarely', description: 'Felt this way once or twice' },
      { value: 2, label: 'Some of the time', description: 'Felt this way on several days' },
      { value: 3, label: 'Often', description: 'Felt this way more than half the days' },
      { value: 4, label: 'All of the time', description: 'Felt this way nearly every day' }
    ]
  },
  {
    id: 'cheerful',
    text: "I've been feeling cheerful",
    required: true,
    options: [
      { value: 0, label: 'None of the time', description: 'Rarely or never felt this way' },
      { value: 1, label: 'Rarely', description: 'Felt this way once or twice' },
      { value: 2, label: 'Some of the time', description: 'Felt this way on several days' },
      { value: 3, label: 'Often', description: 'Felt this way more than half the days' },
      { value: 4, label: 'All of the time', description: 'Felt this way nearly every day' }
    ]
  }
];

// Calculate the score and provide interpretation
const calculateScore = (answers: Record<string, string | number>) => {
  // Sum up all the numeric values from the answers
  const totalScore = Object.values(answers).reduce((sum, value) => sum + Number(value), 0);

  // Convert to scale of 0-100 for easier understanding
  const scorePercentage = Math.round((totalScore / (questions.length * 4)) * 100);

  // Determine well-being level and provide recommendations
  let riskLevel: 'high' | 'moderate' | 'low';
  let interpretation: string;
  let recommendations: string[] = [];

  if (scorePercentage >= 75) {
    riskLevel = 'low';
    interpretation = "Your responses suggest you have good mental wellbeing. You appear to be feeling positive and functioning well in most aspects of your life.";
    recommendations = [
      'Continue practicing habits that support your mental wellbeing',
      'Consider mentoring or supporting others who may be struggling',
      'Maintain your social connections and supportive relationships',
      'Continue to engage in activities that give you a sense of meaning and purpose'
    ];
  } else if (scorePercentage >= 50) {
    riskLevel = 'low';
    interpretation = "Your mental wellbeing appears to be average. While you're doing well in some areas, there may be aspects of your mental health that could benefit from additional attention.";
    recommendations = [
      'Identify the areas where you scored lower and consider ways to strengthen these aspects',
      'Practice mindfulness or relaxation techniques to help manage stress',
      'Engage in regular physical activity, which is known to improve mood',
      "Consider talking to trusted friends or family about how you're feeling"
    ];
  } else if (scorePercentage >= 25) {
    riskLevel = 'moderate';
    interpretation = "Your responses suggest your mental wellbeing is below average. You may be experiencing challenges in several areas of your life.";
    recommendations = [
      'Consider speaking with a mental health professional for additional support',
      'Focus on self-care activities like adequate sleep, healthy eating, and physical activity',
      'Try to identify specific stressors in your life and develop strategies to address them',
      'Build your support network by connecting with friends, family, or support groups'
    ];
  } else {
    riskLevel = 'high';
    interpretation = "Your responses indicate you may be experiencing significant challenges with your mental wellbeing. It's important to seek support.";
    recommendations = [
      "We recommend speaking with a healthcare professional about how you're feeling",
      'Remember that mental health challenges are common and treatable',
      'Consider contacting a mental health helpline for immediate support if needed',
      'Be gentle with yourself and recognize that seeking help is a sign of strength'
    ];
  }

  return {
    score: scorePercentage,
    interpretation,
    recommendations,
    riskLevel
  };
};

const MentalWellbeingAssessment: React.FC = () => {
  return (
    <AssessmentTemplate
      id="mental-wellbeing"
      title="Mental Wellbeing Assessment"
      description="Evaluate your mental health, stress levels, and emotional wellbeing"
      introduction="This assessment is based on the Warwick-Edinburgh Mental Wellbeing Scale (WEMWBS), a widely used tool for measuring mental wellbeing. Please answer based on your experience over the past 2 weeks. This is not a diagnostic tool, but it can help you understand your current mental wellbeing."
      questions={questions}
      calculateScore={calculateScore}
    />
  );
};

export default MentalWellbeingAssessment;
