import React from 'react';
import AssessmentTemplate, { AssessmentQuestion } from '../../../components/assessment/AssessmentTemplate';

// Define the questions for Sleep Quality assessment (based on Pittsburgh Sleep Quality Index concepts)
const questions: AssessmentQuestion[] = [
  {
    id: 'sleep_duration',
    text: 'How many hours of actual sleep do you get per night on average?',
    required: true,
    options: [
      { value: 3, label: '7-9 hours', description: 'Recommended sleep duration for adults' },
      { value: 2, label: '6-7 hours', description: 'Slightly less than recommended' },
      { value: 1, label: '5-6 hours', description: 'Insufficient sleep' },
      { value: 0, label: 'Less than 5 hours', description: 'Severely insufficient sleep' }
    ]
  },
  {
    id: 'sleep_latency',
    text: 'How long does it usually take you to fall asleep?',
    required: true,
    options: [
      { value: 3, label: 'Less than 15 minutes', description: 'Excellent sleep onset' },
      { value: 2, label: '15-30 minutes', description: 'Normal sleep onset' },
      { value: 1, label: '31-60 minutes', description: 'Delayed sleep onset' },
      { value: 0, label: 'More than 60 minutes', description: 'Significant difficulty falling asleep' }
    ]
  },
  {
    id: 'sleep_disruptions',
    text: 'How often do you wake up during the night?',
    required: true,
    options: [
      { value: 3, label: 'Rarely or never', description: 'Continuous, undisturbed sleep' },
      { value: 2, label: 'Once per night', description: 'Minimal disruption' },
      { value: 1, label: '2-3 times per night', description: 'Moderate disruption' },
      { value: 0, label: '4 or more times per night', description: 'Frequent disruptions' }
    ]
  },
  {
    id: 'sleep_quality',
    text: 'How would you rate your overall sleep quality?',
    required: true,
    options: [
      { value: 3, label: 'Excellent', description: 'Always feel refreshed and well-rested' },
      { value: 2, label: 'Good', description: 'Usually feel rested' },
      { value: 1, label: 'Fair', description: 'Sometimes feel unrested' },
      { value: 0, label: 'Poor', description: 'Rarely feel rested' }
    ]
  },
  {
    id: 'daytime_sleepiness',
    text: 'How often do you feel excessively sleepy during the day?',
    required: true,
    options: [
      { value: 3, label: 'Never', description: 'Alert throughout the day' },
      { value: 2, label: 'Rarely (1-2 days per week)', description: 'Minimal daytime sleepiness' },
      { value: 1, label: 'Sometimes (3-4 days per week)', description: 'Moderate daytime sleepiness' },
      { value: 0, label: 'Often (5+ days per week)', description: 'Significant daytime sleepiness' }
    ]
  },
  {
    id: 'snoring',
    text: 'Do you snore loudly or has anyone told you that you stop breathing during sleep?',
    required: true,
    options: [
      { value: 3, label: 'Never or rarely', description: 'No signs of sleep apnea' },
      { value: 2, label: 'Occasional light snoring', description: 'Minor airway issues' },
      { value: 1, label: 'Frequent loud snoring', description: 'Possible sleep-disordered breathing' },
      { value: 0, label: 'Loud snoring with breathing pauses', description: 'Strong indicators of sleep apnea' }
    ]
  },
  {
    id: 'sleep_schedule',
    text: 'How consistent is your sleep schedule?',
    required: true,
    options: [
      { value: 3, label: 'Very consistent', description: 'Same bedtime and wake time daily (±30 min)' },
      { value: 2, label: 'Mostly consistent', description: 'Regular schedule with occasional variations' },
      { value: 1, label: 'Somewhat irregular', description: 'Varies by 1-2 hours regularly' },
      { value: 0, label: 'Very irregular', description: 'Highly variable sleep schedule' }
    ]
  },
  {
    id: 'sleep_environment',
    text: 'How would you rate your sleep environment?',
    required: true,
    options: [
      { value: 3, label: 'Excellent', description: 'Dark, quiet, cool, and comfortable' },
      { value: 2, label: 'Good', description: 'Generally conducive to sleep' },
      { value: 1, label: 'Fair', description: 'Some environmental issues' },
      { value: 0, label: 'Poor', description: 'Noisy, bright, or uncomfortable' }
    ]
  },
  {
    id: 'pre_sleep_routine',
    text: 'Do you have a relaxing pre-sleep routine?',
    required: true,
    options: [
      { value: 3, label: 'Yes, consistent routine', description: 'Wind-down activities 30-60 min before bed' },
      { value: 2, label: 'Sometimes', description: 'Occasional relaxing activities' },
      { value: 1, label: 'Rarely', description: 'Minimal pre-sleep preparation' },
      { value: 0, label: 'No routine', description: 'Active or stimulating activities before bed' }
    ]
  },
  {
    id: 'screen_time',
    text: 'How much screen time (phone, TV, computer) do you have in the hour before bed?',
    required: true,
    options: [
      { value: 3, label: 'None', description: 'No screens before bedtime' },
      { value: 2, label: 'Less than 15 minutes', description: 'Minimal screen exposure' },
      { value: 1, label: '15-30 minutes', description: 'Moderate screen exposure' },
      { value: 0, label: 'More than 30 minutes', description: 'Significant blue light exposure' }
    ]
  }
];

// Calculate the score and provide interpretation
const calculateScore = (answers: Record<string, string | number>) => {
  // Sum up all the numeric values from the answers
  const totalScore = Object.values(answers).reduce((sum, value) => sum + Number(value), 0);

  // Maximum possible score (3 points per question)
  const maxScore = questions.length * 3;
  const scorePercentage = Math.round((totalScore / maxScore) * 100);

  // Determine sleep quality level
  let riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  let interpretation: string;
  let recommendations: string[] = [];

  if (scorePercentage >= 80) {
    riskLevel = 'low';
    interpretation = "Your sleep quality appears to be excellent. You're practicing good sleep hygiene and getting restorative sleep.";
    recommendations = [
      'Continue maintaining your current healthy sleep habits',
      'Keep your consistent sleep schedule, even on weekends',
      'Continue to prioritize sleep as part of your overall health routine',
      'Share your successful sleep strategies with others who may be struggling',
      'Stay aware of any changes in your sleep patterns and address them early'
    ];
  } else if (scorePercentage >= 60) {
    riskLevel = 'low';
    interpretation = "Your sleep quality is generally good, but there's room for improvement in some areas.";
    recommendations = [
      'Establish a more consistent sleep schedule, going to bed and waking at the same time daily',
      'Create a relaxing bedtime routine 30-60 minutes before sleep',
      'Limit screen time at least one hour before bedtime',
      'Ensure your bedroom is dark, quiet, and cool (60-67°F/15-19°C)',
      'Avoid caffeine after 2 PM and large meals close to bedtime',
      'Consider using blackout curtains, white noise, or earplugs if needed',
      'Get regular physical activity, but not within 3 hours of bedtime'
    ];
  } else if (scorePercentage >= 40) {
    riskLevel = 'moderate';
    interpretation = "Your sleep quality is below average and may be affecting your health and daily functioning.";
    recommendations = [
      'Prioritize improving your sleep hygiene with consistent bedtimes and wake times',
      'Create a sleep-friendly environment: dark, quiet, and cool',
      'Develop a relaxing pre-sleep routine without screens',
      'Limit caffeine, alcohol, and nicotine, especially in the evening',
      'Try relaxation techniques such as deep breathing, meditation, or progressive muscle relaxation',
      'Keep a sleep diary to identify patterns and triggers',
      'If problems persist for more than 3 weeks, consult your healthcare provider',
      'Consider cognitive behavioral therapy for insomnia (CBT-I) if issues continue'
    ];
  } else {
    riskLevel = 'high';
    interpretation = "Your sleep quality is poor and may significantly impact your health. Professional consultation is recommended.";
    recommendations = [
      'Schedule an appointment with your healthcare provider to discuss your sleep issues',
      'Ask about screening for sleep disorders such as sleep apnea or insomnia',
      'Your doctor may recommend a sleep study if breathing issues are suspected',
      'Consider referral to a sleep specialist or sleep clinic',
      'Cognitive behavioral therapy for insomnia (CBT-I) is highly effective',
      'Avoid using alcohol as a sleep aid, as it disrupts sleep quality',
      'Address any underlying conditions that may be affecting sleep (pain, anxiety, etc.)',
      'Follow sleep hygiene recommendations strictly while working with your doctor',
      'Be aware that poor sleep increases risk for other health conditions'
    ];
  }

  return {
    score: scorePercentage,
    interpretation,
    recommendations,
    riskLevel
  };
};

const SleepQualityAssessment: React.FC = () => {
  return (
    <AssessmentTemplate
      id="sleep-quality"
      title="Sleep Quality Assessment"
      description="Evaluate the quality of your sleep and identify potential sleep issues"
      introduction="This assessment is based on principles from the Pittsburgh Sleep Quality Index (PSQI) and general sleep health guidelines. It evaluates various aspects of your sleep patterns, quality, and sleep hygiene practices. Good sleep is essential for physical health, mental wellbeing, and daily functioning. This is a screening tool and not a diagnostic instrument. If you have persistent sleep problems, please consult with a healthcare provider or sleep specialist."
      questions={questions}
      calculateScore={calculateScore}
    />
  );
};

export default SleepQualityAssessment;
