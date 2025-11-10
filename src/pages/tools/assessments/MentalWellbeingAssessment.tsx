import React from 'react';
import AssessmentTemplate, { AssessmentQuestion } from '../../../components/assessment/AssessmentTemplate';

// Define the questions for the Mental Wellbeing assessment - encouraging and strength-based
const questions: AssessmentQuestion[] = [
  {
    id: 'feeling_optimistic',
    text: "Looking ahead fills you with hope and possibility",
    required: true,
    options: [
      { value: 0, label: 'Building this strength', description: 'This is something you\'re working on' },
      { value: 1, label: 'Occasionally', description: 'You catch glimpses of this feeling' },
      { value: 2, label: 'Sometimes', description: 'You experience this regularly' },
      { value: 3, label: 'Frequently', description: 'This is often part of your experience' },
      { value: 4, label: 'Almost always', description: 'This is a core part of how you feel' }
    ]
  },
  {
    id: 'feeling_useful',
    text: "You feel like you're making a meaningful contribution",
    required: true,
    options: [
      { value: 0, label: 'Building this strength', description: 'This is something you\'re working on' },
      { value: 1, label: 'Occasionally', description: 'You catch glimpses of this feeling' },
      { value: 2, label: 'Sometimes', description: 'You experience this regularly' },
      { value: 3, label: 'Frequently', description: 'This is often part of your experience' },
      { value: 4, label: 'Almost always', description: 'This is a core part of how you feel' }
    ]
  },
  {
    id: 'feeling_relaxed',
    text: "You can find moments of calm and peace in your day",
    required: true,
    options: [
      { value: 0, label: 'Building this strength', description: 'This is something you\'re working on' },
      { value: 1, label: 'Occasionally', description: 'You catch glimpses of this feeling' },
      { value: 2, label: 'Sometimes', description: 'You experience this regularly' },
      { value: 3, label: 'Frequently', description: 'This is often part of your experience' },
      { value: 4, label: 'Almost always', description: 'This is a core part of how you feel' }
    ]
  },
  {
    id: 'interest_in_others',
    text: "You feel genuinely curious and engaged with people around you",
    required: true,
    options: [
      { value: 0, label: 'Building this strength', description: 'This is something you\'re working on' },
      { value: 1, label: 'Occasionally', description: 'You catch glimpses of this feeling' },
      { value: 2, label: 'Sometimes', description: 'You experience this regularly' },
      { value: 3, label: 'Frequently', description: 'This is often part of your experience' },
      { value: 4, label: 'Almost always', description: 'This is a core part of how you feel' }
    ]
  },
  {
    id: 'energy_spare',
    text: "You have the energy you need to tackle what matters to you",
    required: true,
    options: [
      { value: 0, label: 'Building this strength', description: 'This is something you\'re working on' },
      { value: 1, label: 'Occasionally', description: 'You catch glimpses of this feeling' },
      { value: 2, label: 'Sometimes', description: 'You experience this regularly' },
      { value: 3, label: 'Frequently', description: 'This is often part of your experience' },
      { value: 4, label: 'Almost always', description: 'This is a core part of how you feel' }
    ]
  },
  {
    id: 'dealing_with_problems',
    text: "You're handling life's challenges with resilience",
    required: true,
    options: [
      { value: 0, label: 'Building this strength', description: 'This is something you\'re working on' },
      { value: 1, label: 'Occasionally', description: 'You catch glimpses of this feeling' },
      { value: 2, label: 'Sometimes', description: 'You experience this regularly' },
      { value: 3, label: 'Frequently', description: 'This is often part of your experience' },
      { value: 4, label: 'Almost always', description: 'This is a core part of how you feel' }
    ]
  },
  {
    id: 'thinking_clearly',
    text: "Your mind feels sharp and focused",
    required: true,
    options: [
      { value: 0, label: 'Building this strength', description: 'This is something you\'re working on' },
      { value: 1, label: 'Occasionally', description: 'You catch glimpses of this feeling' },
      { value: 2, label: 'Sometimes', description: 'You experience this regularly' },
      { value: 3, label: 'Frequently', description: 'This is often part of your experience' },
      { value: 4, label: 'Almost always', description: 'This is a core part of how you feel' }
    ]
  },
  {
    id: 'good_about_self',
    text: "You appreciate who you are and feel comfortable in your own skin",
    required: true,
    options: [
      { value: 0, label: 'Building this strength', description: 'This is something you\'re working on' },
      { value: 1, label: 'Occasionally', description: 'You catch glimpses of this feeling' },
      { value: 2, label: 'Sometimes', description: 'You experience this regularly' },
      { value: 3, label: 'Frequently', description: 'This is often part of your experience' },
      { value: 4, label: 'Almost always', description: 'This is a core part of how you feel' }
    ]
  },
  {
    id: 'close_to_others',
    text: "You feel connected and valued in your relationships",
    required: true,
    options: [
      { value: 0, label: 'Building this strength', description: 'This is something you\'re working on' },
      { value: 1, label: 'Occasionally', description: 'You catch glimpses of this feeling' },
      { value: 2, label: 'Sometimes', description: 'You experience this regularly' },
      { value: 3, label: 'Frequently', description: 'This is often part of your experience' },
      { value: 4, label: 'Almost always', description: 'This is a core part of how you feel' }
    ]
  },
  {
    id: 'feeling_confident',
    text: "You trust in your abilities and your capacity to grow",
    required: true,
    options: [
      { value: 0, label: 'Building this strength', description: 'This is something you\'re working on' },
      { value: 1, label: 'Occasionally', description: 'You catch glimpses of this feeling' },
      { value: 2, label: 'Sometimes', description: 'You experience this regularly' },
      { value: 3, label: 'Frequently', description: 'This is often part of your experience' },
      { value: 4, label: 'Almost always', description: 'This is a core part of how you feel' }
    ]
  },
  {
    id: 'make_up_mind',
    text: "You feel empowered to make your own choices",
    required: true,
    options: [
      { value: 0, label: 'Building this strength', description: 'This is something you\'re working on' },
      { value: 1, label: 'Occasionally', description: 'You catch glimpses of this feeling' },
      { value: 2, label: 'Sometimes', description: 'You experience this regularly' },
      { value: 3, label: 'Frequently', description: 'This is often part of your experience' },
      { value: 4, label: 'Almost always', description: 'This is a core part of how you feel' }
    ]
  },
  {
    id: 'feeling_loved',
    text: "You know you matter to the people in your life",
    required: true,
    options: [
      { value: 0, label: 'Building this strength', description: 'This is something you\'re working on' },
      { value: 1, label: 'Occasionally', description: 'You catch glimpses of this feeling' },
      { value: 2, label: 'Sometimes', description: 'You experience this regularly' },
      { value: 3, label: 'Frequently', description: 'This is often part of your experience' },
      { value: 4, label: 'Almost always', description: 'This is a core part of how you feel' }
    ]
  },
  {
    id: 'interested_new_things',
    text: "You're open to new experiences and learning",
    required: true,
    options: [
      { value: 0, label: 'Building this strength', description: 'This is something you\'re working on' },
      { value: 1, label: 'Occasionally', description: 'You catch glimpses of this feeling' },
      { value: 2, label: 'Sometimes', description: 'You experience this regularly' },
      { value: 3, label: 'Frequently', description: 'This is often part of your experience' },
      { value: 4, label: 'Almost always', description: 'This is a core part of how you feel' }
    ]
  },
  {
    id: 'cheerful',
    text: "You find moments of joy and lightness in your days",
    required: true,
    options: [
      { value: 0, label: 'Building this strength', description: 'This is something you\'re working on' },
      { value: 1, label: 'Occasionally', description: 'You catch glimpses of this feeling' },
      { value: 2, label: 'Sometimes', description: 'You experience this regularly' },
      { value: 3, label: 'Frequently', description: 'This is often part of your experience' },
      { value: 4, label: 'Almost always', description: 'This is a core part of how you feel' }
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
    interpretation = "You're thriving! Your responses show strong mental wellbeing across many areas of your life. You're experiencing positive emotions, feeling connected, and functioning well.";
    recommendations = [
      'Keep nurturing the practices that help you thrive',
      'Share your strength - your experience could inspire others on their journey',
      'Continue investing in the relationships and activities that bring meaning to your life',
      'Stay curious about new ways to maintain and deepen your sense of wellbeing'
    ];
  } else if (scorePercentage >= 50) {
    riskLevel = 'low';
    interpretation = "You're doing well in many areas and building strength in others. Your wellbeing journey is progressing, with room to grow even stronger.";
    recommendations = [
      'Notice the areas where you\'re already strong - these are your foundations to build on',
      'Explore mindfulness or breathing practices to cultivate more moments of calm',
      'Movement can be powerful - find physical activities that feel good to you',
      'Connect with people who energize and support you'
    ];
  } else if (scorePercentage >= 25) {
    riskLevel = 'moderate';
    interpretation = "You're navigating some challenges right now. Your responses show you're building important strengths, and there's support available to help you grow stronger.";
    recommendations = [
      'Consider connecting with a mental health professional who can support your journey',
      'Start with small acts of self-care: rest when you need it, nourish your body, move gently',
      'You don\'t have to figure everything out alone - reaching out is a sign of wisdom',
      'Notice what drains your energy and what restores it, then do more of what helps'
    ];
  } else {
    riskLevel = 'high';
    interpretation = "Right now feels challenging, and that takes courage to acknowledge. Your wellbeing matters, and support is available to help you move forward.";
    recommendations = [
      'Please reach out to a healthcare professional - they\'re there to support you through this',
      'You deserve support and care, and asking for help shows incredible strength',
      'If you need someone to talk to right away, mental health helplines are available 24/7',
      'Be compassionate with yourself - healing is possible, and you don\'t have to do it alone'
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
      title="Wellbeing Check-In"
      description="Discover your strengths and explore opportunities to nurture your mental wellness"
      introduction="Take a moment to reflect on how you've been feeling lately. This check-in, inspired by the Warwick-Edinburgh Mental Wellbeing Scale, helps you notice your current strengths and areas where you might want to focus more attention. There are no right or wrong answers - just an opportunity to pause and tune into your experience over the past 2 weeks."
      questions={questions}
      calculateScore={calculateScore}
    />
  );
};

export default MentalWellbeingAssessment;
