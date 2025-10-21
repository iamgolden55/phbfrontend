import React from 'react';
import AssessmentTemplate, { AssessmentQuestion } from '../../../components/assessment/AssessmentTemplate';

// Define the questions for Anxiety Screening (GAD-7 - Generalized Anxiety Disorder 7)
const questions: AssessmentQuestion[] = [
  {
    id: 'feeling_nervous',
    text: 'Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  },
  {
    id: 'not_stop_worrying',
    text: 'Over the last 2 weeks, how often have you been bothered by not being able to stop or control worrying?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  },
  {
    id: 'worrying_too_much',
    text: 'Over the last 2 weeks, how often have you been bothered by worrying too much about different things?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  },
  {
    id: 'trouble_relaxing',
    text: 'Over the last 2 weeks, how often have you been bothered by trouble relaxing?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  },
  {
    id: 'being_restless',
    text: 'Over the last 2 weeks, how often have you been bothered by being so restless that it is hard to sit still?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  },
  {
    id: 'easily_annoyed',
    text: 'Over the last 2 weeks, how often have you been bothered by becoming easily annoyed or irritable?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  },
  {
    id: 'feeling_afraid',
    text: 'Over the last 2 weeks, how often have you been bothered by feeling afraid, as if something awful might happen?',
    required: true,
    options: [
      { value: 0, label: 'Not at all', description: '' },
      { value: 1, label: 'Several days', description: '' },
      { value: 2, label: 'More than half the days', description: '' },
      { value: 3, label: 'Nearly every day', description: '' }
    ]
  }
];

// Calculate the score and provide interpretation (GAD-7 scoring)
const calculateScore = (answers: Record<string, string | number>) => {
  // Sum up all the numeric values from the answers (GAD-7 uses direct sum)
  const totalScore = Object.values(answers).reduce((sum, value) => sum + Number(value), 0);

  // GAD-7 scores range from 0-21
  let riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  let interpretation: string;
  let recommendations: string[] = [];

  if (totalScore <= 4) {
    riskLevel = 'low';
    interpretation = "Your score suggests minimal anxiety. You appear to be experiencing few, if any, anxiety symptoms.";
    recommendations = [
      'Continue maintaining your mental health through healthy lifestyle habits',
      'Practice stress management techniques to prevent anxiety from developing',
      'Maintain regular physical activity, which helps reduce anxiety',
      'Ensure adequate sleep and practice good sleep hygiene',
      'Stay connected with supportive friends and family',
      'Monitor your mental health and seek help if symptoms develop',
      'Consider mindfulness or meditation practices as preventive measures'
    ];
  } else if (totalScore <= 9) {
    riskLevel = 'low';
    interpretation = "Your score suggests mild anxiety. You may be experiencing some anxiety symptoms that are causing minor interference with your life.";
    recommendations = [
      'Monitor your symptoms over the next few weeks to see if they improve or worsen',
      'Practice relaxation techniques such as deep breathing, progressive muscle relaxation, or meditation',
      'Maintain regular physical activity, which is proven to reduce anxiety',
      'Limit caffeine and alcohol consumption, which can worsen anxiety',
      'Ensure you\'re getting adequate sleep (7-9 hours per night)',
      'Try mindfulness exercises or yoga to help manage stress',
      'Consider talking to a counselor or therapist if symptoms persist',
      'Identify and address sources of stress in your life where possible'
    ];
  } else if (totalScore <= 14) {
    riskLevel = 'moderate';
    interpretation = "Your score suggests moderate anxiety. Your symptoms are likely having a noticeable impact on your daily life and functioning.";
    recommendations = [
      'Schedule an appointment with a mental health professional or your healthcare provider',
      'Cognitive Behavioral Therapy (CBT) is highly effective for anxiety disorders',
      'Practice daily relaxation techniques such as deep breathing or progressive muscle relaxation',
      'Maintain a regular exercise routine - aim for at least 30 minutes most days',
      'Limit or avoid caffeine, nicotine, and alcohol',
      'Ensure consistent sleep schedule and good sleep hygiene',
      'Consider joining a support group for anxiety',
      'Your provider may discuss therapy, medication, or a combination of both',
      'Keep a journal to track anxiety triggers and patterns'
    ];
  } else {
    riskLevel = 'high';
    interpretation = "Your score suggests severe anxiety. Professional treatment is strongly recommended as your anxiety is likely significantly interfering with your daily life.";
    recommendations = [
      'Seek immediate help from a mental health professional',
      'Contact your healthcare provider for an urgent appointment',
      'Evidence-based treatments like CBT are highly effective for severe anxiety',
      'Your provider may recommend medication in combination with therapy',
      'Practice grounding techniques during moments of high anxiety (5-4-3-2-1 method, deep breathing)',
      'Avoid self-medicating with alcohol, caffeine, or other substances',
      'Inform trusted friends or family members so they can support you',
      'Consider intensive outpatient treatment if recommended by your provider',
      'If you experience panic attacks, learn and practice panic management techniques',
      'Create a safety plan with your mental health provider',
      'Remember that anxiety disorders are highly treatable with proper care',
      'National Alliance on Mental Illness (NAMI) Helpline: 1-800-950-NAMI (6264) for support and resources'
    ];
  }

  return {
    score: totalScore, // GAD-7 uses raw score (0-21), not percentage
    interpretation,
    recommendations,
    riskLevel
  };
};

const AnxietyScreeningAssessment: React.FC = () => {
  return (
    <AssessmentTemplate
      id="anxiety-screening"
      title="Anxiety Screening (GAD-7)"
      description="A validated screening tool for detecting anxiety disorders"
      introduction="This is the Generalized Anxiety Disorder 7-item scale (GAD-7), a validated and widely used screening tool for anxiety disorders. It asks about common symptoms of anxiety you may have experienced over the past 2 weeks. The GAD-7 is used by healthcare professionals worldwide and can help identify whether you may benefit from further evaluation or treatment. While it was originally developed to screen for generalized anxiety disorder, it has also been validated for screening panic disorder, social anxiety disorder, and post-traumatic stress disorder. This is a screening tool, not a diagnostic instrument. Only a qualified healthcare provider can diagnose an anxiety disorder. If you score high or have concerns about your anxiety, please consult with a healthcare professional."
      questions={questions}
      calculateScore={calculateScore}
    />
  );
};

export default AnxietyScreeningAssessment;
