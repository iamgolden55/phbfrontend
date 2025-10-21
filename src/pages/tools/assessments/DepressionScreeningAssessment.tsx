import React from 'react';
import AssessmentTemplate, { AssessmentQuestion } from '../../../components/assessment/AssessmentTemplate';

// Define the questions for Depression Screening (PHQ-9 - Patient Health Questionnaire-9)
const questions: AssessmentQuestion[] = [
  {
    id: 'little_interest',
    text: 'Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  },
  {
    id: 'feeling_down',
    text: 'Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  },
  {
    id: 'sleep_trouble',
    text: 'Over the last 2 weeks, how often have you been bothered by trouble falling or staying asleep, or sleeping too much?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  },
  {
    id: 'feeling_tired',
    text: 'Over the last 2 weeks, how often have you been bothered by feeling tired or having little energy?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  },
  {
    id: 'poor_appetite',
    text: 'Over the last 2 weeks, how often have you been bothered by poor appetite or overeating?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  },
  {
    id: 'feeling_bad',
    text: 'Over the last 2 weeks, how often have you been bothered by feeling bad about yourself - or that you are a failure or have let yourself or your family down?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  },
  {
    id: 'trouble_concentrating',
    text: 'Over the last 2 weeks, how often have you been bothered by trouble concentrating on things, such as reading the newspaper or watching television?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  },
  {
    id: 'moving_slowly',
    text: 'Over the last 2 weeks, how often have you been bothered by moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  },
  {
    id: 'thoughts_self_harm',
    text: 'Over the last 2 weeks, how often have you been bothered by thoughts that you would be better off dead, or of hurting yourself in some way?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  }
];

// Calculate the score and provide interpretation (PHQ-9 scoring)
const calculateScore = (answers: Record<string, string | number>) => {
  // Sum up all the numeric values from the answers (PHQ-9 uses direct sum)
  const totalScore = Object.values(answers).reduce((sum, value) => sum + Number(value), 0);

  // PHQ-9 scores range from 0-27
  let riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  let interpretation: string;
  let recommendations: string[] = [];

  // Check for suicidal ideation (question 9)
  const hasSuicidalThoughts = Number(answers.thoughts_self_harm) > 0;

  if (hasSuicidalThoughts) {
    // Override with crisis recommendations if any suicidal thoughts
    riskLevel = 'very-high';
    interpretation = "Your responses indicate you've had thoughts of self-harm. This requires immediate attention from a mental health professional.";
    recommendations = [
      '⚠️ IMMEDIATE ACTION NEEDED: If you are in crisis, please call emergency services (911) or go to your nearest emergency room',
      'Call the National Suicide Prevention Lifeline: 988 (available 24/7)',
      'Text "HELLO" to 741741 to reach the Crisis Text Line',
      'Reach out to a trusted friend, family member, or mental health professional immediately',
      'Do not wait - seek help right now. Your life matters and help is available',
      'Remove any means of self-harm from your immediate environment',
      'Stay with someone you trust until you can get professional help'
    ];
  } else if (totalScore <= 4) {
    riskLevel = 'low';
    interpretation = "Your score suggests minimal or no depression. You appear to be experiencing few, if any, depressive symptoms.";
    recommendations = [
      'Continue maintaining your mental health through healthy lifestyle habits',
      'Stay connected with friends, family, and your community',
      'Maintain regular physical activity and good sleep hygiene',
      'Practice stress management techniques',
      'Monitor your mental health and seek help if symptoms develop',
      'Consider these results as a baseline for future self-monitoring'
    ];
  } else if (totalScore <= 9) {
    riskLevel = 'low';
    interpretation = "Your score suggests mild depression. You may be experiencing some symptoms that are affecting your daily life.";
    recommendations = [
      'Monitor your symptoms over the next few weeks to see if they improve or worsen',
      'Practice self-care: maintain regular sleep, exercise, and healthy eating habits',
      'Engage in activities you usually enjoy, even if you don\'t feel like it',
      'Stay connected with supportive friends and family',
      'Consider talking to a mental health professional if symptoms persist or worsen',
      'Try stress-reduction techniques such as mindfulness, meditation, or yoga',
      'Limit alcohol consumption, which can worsen depression'
    ];
  } else if (totalScore <= 14) {
    riskLevel = 'moderate';
    interpretation = "Your score suggests moderate depression. Your symptoms are likely having a noticeable impact on your daily functioning.";
    recommendations = [
      'Schedule an appointment with your healthcare provider or a mental health professional',
      'Consider evidence-based treatments such as cognitive behavioral therapy (CBT)',
      'Your provider may discuss medication options if appropriate',
      'Maintain a regular routine including sleep, meals, and physical activity',
      'Reach out to trusted friends or family members for support',
      'Join a support group for people experiencing depression',
      'Avoid making major life decisions while experiencing depressive symptoms',
      'Keep track of your mood and symptoms to share with your healthcare provider'
    ];
  } else if (totalScore <= 19) {
    riskLevel = 'high';
    interpretation = "Your score suggests moderately severe depression. Professional treatment is strongly recommended.";
    recommendations = [
      'Schedule an urgent appointment with a mental health professional',
      'Discuss both therapy and medication options with your provider',
      'Consider intensive outpatient programs if recommended',
      'Build a support network of trusted individuals who can help you',
      'Create a safety plan with your healthcare provider',
      'Avoid isolation - stay connected even when it feels difficult',
      'Your healthcare provider may recommend a combination of therapy and medication',
      'Consider temporary work or study accommodations if symptoms are severe',
      'Monitor yourself closely and seek immediate help if symptoms worsen'
    ];
  } else {
    riskLevel = 'very-high';
    interpretation = "Your score suggests severe depression. Immediate professional intervention is essential.";
    recommendations = [
      'Seek immediate help from a mental health professional or go to an emergency room',
      'You may benefit from intensive treatment such as partial hospitalization or intensive outpatient programs',
      'Medication and therapy are typically both recommended for severe depression',
      'Inform trusted friends or family members about your condition so they can support you',
      'Create a detailed safety plan with your mental health provider',
      'Do not wait - contact a mental health crisis line if you cannot see a provider immediately',
      'Consider taking medical leave if your work is being significantly affected',
      'Follow your treatment plan closely and attend all appointments',
      'Remember that depression is treatable, and you can feel better with proper care',
      'National Suicide Prevention Lifeline: 988 (available 24/7 for support)'
    ];
  }

  return {
    score: totalScore, // PHQ-9 uses raw score (0-27), not percentage
    interpretation,
    recommendations,
    riskLevel
  };
};

const DepressionScreeningAssessment: React.FC = () => {
  return (
    <AssessmentTemplate
      id="depression-screening"
      title="Depression Screening (PHQ-9)"
      description="A validated screening tool for detecting depression"
      introduction="This is the Patient Health Questionnaire-9 (PHQ-9), a validated and widely used screening tool for depression. It asks about common symptoms of depression you may have experienced over the past 2 weeks. The PHQ-9 is used by healthcare professionals worldwide and can help identify whether you may benefit from further evaluation or treatment. This is a screening tool, not a diagnostic instrument. Only a qualified healthcare provider can diagnose depression. If you score high or have concerns, please consult with a healthcare professional. IMPORTANT: If you are experiencing thoughts of self-harm or suicide, please seek immediate help by calling 988 (Suicide & Crisis Lifeline) or going to your nearest emergency room."
      questions={questions}
      calculateScore={calculateScore}
    />
  );
};

export default DepressionScreeningAssessment;
