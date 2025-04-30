import React, { useState } from 'react';
import MedicalTermTooltip from './MedicalTermTooltip';

interface Symptom {
  id: string;
  name: string;
  description: string;
  followUpQuestions: FollowUpQuestion[];
}

interface FollowUpQuestion {
  id: string;
  text: string;
  options: FollowUpOption[];
}

interface FollowUpOption {
  id: string;
  text: string;
  score: number;
  nextQuestionId?: string;
}

interface PossibleCondition {
  id: string;
  name: string;
  description: string;
  url: string;
  matchScore: number;
}

// Sample symptoms for the symptom checker
const symptoms: Symptom[] = [
  {
    id: 'headache',
    name: 'Headache',
    description: 'Pain in any region of the head.',
    followUpQuestions: [
      {
        id: 'headache-severity',
        text: 'How would you rate the severity of your headache?',
        options: [
          { id: 'mild', text: 'Mild - I can still do my daily activities', score: 1 },
          { id: 'moderate', text: 'Moderate - It affects my activities but I can still function', score: 3 },
          { id: 'severe', text: 'Severe - It prevents me from doing normal activities', score: 5, nextQuestionId: 'headache-location' }
        ]
      },
      {
        id: 'headache-location',
        text: 'Where is your headache located?',
        options: [
          { id: 'forehead', text: 'Forehead or temples (sides of forehead)', score: 2 },
          { id: 'one-side', text: 'One side of the head only', score: 4 },
          { id: 'back', text: 'Back of the head or neck', score: 2 },
          { id: 'all-over', text: 'All over the head', score: 3, nextQuestionId: 'headache-duration' }
        ]
      },
      {
        id: 'headache-duration',
        text: 'How long have you been experiencing this headache?',
        options: [
          { id: 'hours', text: 'A few hours', score: 1 },
          { id: 'day', text: 'About a day', score: 2 },
          { id: 'days', text: 'Several days', score: 3 },
          { id: 'weeks', text: 'Weeks or longer', score: 4, nextQuestionId: 'headache-additional' }
        ]
      },
      {
        id: 'headache-additional',
        text: 'Do you have any additional symptoms?',
        options: [
          { id: 'nausea', text: 'Nausea or vomiting', score: 3 },
          { id: 'sensitivity', text: 'Sensitivity to light or sound', score: 3 },
          { id: 'vision', text: 'Visual changes (blurry vision, seeing spots)', score: 4 },
          { id: 'none', text: 'None of these', score: 0 }
        ]
      }
    ]
  },
  {
    id: 'chest-pain',
    name: 'Chest Pain',
    description: 'Discomfort or pain in the chest area.',
    followUpQuestions: [
      {
        id: 'chest-pain-severity',
        text: 'How would you rate your chest pain?',
        options: [
          { id: 'mild', text: 'Mild discomfort', score: 2 },
          { id: 'moderate', text: 'Moderate pain', score: 4 },
          { id: 'severe', text: 'Severe pain', score: 5, nextQuestionId: 'chest-pain-character' }
        ]
      },
      {
        id: 'chest-pain-character',
        text: 'How would you describe the pain?',
        options: [
          { id: 'squeezing', text: 'Squeezing, crushing, or heavy pressure', score: 5 },
          { id: 'sharp', text: 'Sharp or stabbing', score: 3 },
          { id: 'burning', text: 'Burning sensation', score: 2 },
          { id: 'dull', text: 'Dull ache', score: 2, nextQuestionId: 'chest-pain-duration' }
        ]
      },
      {
        id: 'chest-pain-duration',
        text: 'How long have you been experiencing this pain?',
        options: [
          { id: 'minutes', text: 'A few minutes', score: 3 },
          { id: 'hours', text: 'Several hours', score: 4 },
          { id: 'days', text: 'Days', score: 2 },
          { id: 'weeks', text: 'Weeks or longer', score: 1, nextQuestionId: 'chest-pain-additional' }
        ]
      },
      {
        id: 'chest-pain-additional',
        text: 'Do you have any additional symptoms?',
        options: [
          { id: 'shortness', text: 'Shortness of breath', score: 4 },
          { id: 'sweating', text: 'Sweating or cold, clammy skin', score: 4 },
          { id: 'radiation', text: 'Pain radiating to the arm, neck, or jaw', score: 5 },
          { id: 'none', text: 'None of these', score: 0 }
        ]
      }
    ]
  },
  {
    id: 'fatigue',
    name: 'Fatigue',
    description: 'Feeling of tiredness, exhaustion, or lack of energy.',
    followUpQuestions: [
      {
        id: 'fatigue-severity',
        text: 'How severe is your fatigue?',
        options: [
          { id: 'mild', text: 'Mild - I get tired more easily than usual', score: 1 },
          { id: 'moderate', text: 'Moderate - It affects my daily activities', score: 3 },
          { id: 'severe', text: 'Severe - I struggle to complete basic tasks', score: 5, nextQuestionId: 'fatigue-duration' }
        ]
      },
      {
        id: 'fatigue-duration',
        text: 'How long have you been experiencing fatigue?',
        options: [
          { id: 'days', text: 'A few days', score: 1 },
          { id: 'weeks', text: 'Several weeks', score: 3 },
          { id: 'months', text: 'Months or longer', score: 4, nextQuestionId: 'fatigue-pattern' }
        ]
      },
      {
        id: 'fatigue-pattern',
        text: 'Which pattern best describes your fatigue?',
        options: [
          { id: 'morning', text: 'Worse in the morning, improves during the day', score: 2 },
          { id: 'evening', text: 'Gets worse as the day progresses', score: 1 },
          { id: 'constant', text: 'Constant throughout the day', score: 3 },
          { id: 'variable', text: 'Comes and goes unpredictably', score: 2, nextQuestionId: 'fatigue-additional' }
        ]
      },
      {
        id: 'fatigue-additional',
        text: 'Do you have any additional symptoms?',
        options: [
          { id: 'sleep', text: 'Sleep problems (insomnia, sleeping too much)', score: 3 },
          { id: 'mood', text: 'Mood changes (depression, anxiety)', score: 3 },
          { id: 'physical', text: 'Physical symptoms (pain, weakness)', score: 4 },
          { id: 'none', text: 'None of these', score: 0 }
        ]
      }
    ]
  }
];

// Sample possible conditions that might match symptoms
const possibleConditions: PossibleCondition[] = [
  {
    id: 'migraine',
    name: 'Migraine',
    description: 'A neurological condition that can cause multiple symptoms, including throbbing headaches, often on one side of the head.',
    url: '/health-a-z/migraine',
    matchScore: 0
  },
  {
    id: 'tension-headache',
    name: 'Tension Headache',
    description: 'The most common type of headache, characterized by mild to moderate pain often described as feeling like a tight band around the head.',
    url: '/health-a-z/tension-headache',
    matchScore: 0
  },
  {
    id: 'cluster-headache',
    name: 'Cluster Headache',
    description: 'Extremely painful headaches occurring in cyclical patterns or clusters, often waking people in the middle of the night.',
    url: '/health-a-z/cluster-headache',
    matchScore: 0
  },
  {
    id: 'heart-attack',
    name: 'Heart Attack',
    description: 'A serious medical emergency in which the blood supply to the heart is suddenly blocked, usually by a blood clot.',
    url: '/health-a-z/heart-attack',
    matchScore: 0
  },
  {
    id: 'angina',
    name: 'Angina',
    description: 'A type of chest pain caused by reduced blood flow to the heart muscle, typically triggered by stress or physical activity.',
    url: '/health-a-z/angina',
    matchScore: 0
  },
  {
    id: 'gerd',
    name: 'Gastroesophageal Reflux Disease (GERD)',
    description: 'A digestive disorder that affects the ring of muscle between the esophagus and stomach, causing acid reflux and heartburn.',
    url: '/health-a-z/gerd',
    matchScore: 0
  },
  {
    id: 'chronic-fatigue',
    name: 'Chronic Fatigue Syndrome',
    description: 'A complicated disorder characterized by extreme fatigue that cannot be explained by any underlying medical condition.',
    url: '/health-a-z/chronic-fatigue-syndrome',
    matchScore: 0
  },
  {
    id: 'depression',
    name: 'Depression',
    description: 'A mental health disorder characterized by persistently depressed mood or loss of interest in activities, causing significant impairment in daily life.',
    url: '/health-a-z/depression',
    matchScore: 0
  },
  {
    id: 'anemia',
    name: 'Anemia',
    description: 'A condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body\'s tissues.',
    url: '/health-a-z/anemia',
    matchScore: 0
  }
];

interface SymptomCheckerProps {
  onResultsGenerated?: (results: PossibleCondition[]) => void;
}

const SymptomChecker: React.FC<SymptomCheckerProps> = ({ onResultsGenerated }) => {
  const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [results, setResults] = useState<PossibleCondition[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const handleSymptomSelect = (symptomId: string) => {
    const symptom = symptoms.find(s => s.id === symptomId);
    if (symptom) {
      // Reset state for new symptom
      setSelectedSymptom(symptom);
      setCurrentQuestionId(symptom.followUpQuestions[0].id);
      setAnswers({});
      setTotalScore(0);
      setResults([]);
      setIsComplete(false);
    }
  };

  const handleOptionSelect = (questionId: string, option: FollowUpOption) => {
    // Update answers and score
    const newAnswers = { ...answers, [questionId]: option.id };
    setAnswers(newAnswers);
    setTotalScore(prev => prev + option.score);

    // Find next question or finish
    if (option.nextQuestionId) {
      setCurrentQuestionId(option.nextQuestionId);
    } else {
      // Try to find the next question in sequence
      if (selectedSymptom) {
        const currentIndex = selectedSymptom.followUpQuestions.findIndex(q => q.id === questionId);
        if (currentIndex < selectedSymptom.followUpQuestions.length - 1) {
          setCurrentQuestionId(selectedSymptom.followUpQuestions[currentIndex + 1].id);
        } else {
          // We've reached the end of the questions
          generateResults();
        }
      }
    }
  };

  const generateResults = () => {
    let matchedConditions: PossibleCondition[] = [];

    // Simple mapping between symptoms and conditions for demo purposes
    if (selectedSymptom) {
      switch (selectedSymptom.id) {
        case 'headache':
          matchedConditions = possibleConditions
            .filter(c => ['migraine', 'tension-headache', 'cluster-headache'].includes(c.id))
            .map(c => {
              let score = totalScore;

              // Adjust scores based on specific answers
              if (c.id === 'migraine' && answers['headache-location'] === 'one-side') {
                score += 3;
              }
              if (c.id === 'migraine' && answers['headache-additional'] === 'sensitivity') {
                score += 3;
              }
              if (c.id === 'tension-headache' && answers['headache-location'] === 'forehead') {
                score += 2;
              }
              if (c.id === 'cluster-headache' && answers['headache-severity'] === 'severe') {
                score += 2;
              }

              return { ...c, matchScore: score };
            });
          break;

        case 'chest-pain':
          matchedConditions = possibleConditions
            .filter(c => ['heart-attack', 'angina', 'gerd'].includes(c.id))
            .map(c => {
              let score = totalScore;

              if (c.id === 'heart-attack' && answers['chest-pain-character'] === 'squeezing') {
                score += 3;
              }
              if (c.id === 'heart-attack' && answers['chest-pain-additional'] === 'radiation') {
                score += 3;
              }
              if (c.id === 'angina' && answers['chest-pain-duration'] === 'minutes') {
                score += 2;
              }
              if (c.id === 'gerd' && answers['chest-pain-character'] === 'burning') {
                score += 3;
              }

              return { ...c, matchScore: score };
            });
          break;

        case 'fatigue':
          matchedConditions = possibleConditions
            .filter(c => ['chronic-fatigue', 'depression', 'anemia'].includes(c.id))
            .map(c => {
              let score = totalScore;

              if (c.id === 'chronic-fatigue' && answers['fatigue-duration'] === 'months') {
                score += 3;
              }
              if (c.id === 'depression' && answers['fatigue-additional'] === 'mood') {
                score += 3;
              }
              if (c.id === 'anemia' && answers['fatigue-pattern'] === 'constant') {
                score += 2;
              }

              return { ...c, matchScore: score };
            });
          break;
      }
    }

    // Sort by match score
    matchedConditions.sort((a, b) => b.matchScore - a.matchScore);

    setResults(matchedConditions);
    setIsComplete(true);

    // Call the callback if provided
    if (onResultsGenerated) {
      onResultsGenerated(matchedConditions);
    }
  };

  const resetChecker = () => {
    setSelectedSymptom(null);
    setCurrentQuestionId(null);
    setAnswers({});
    setTotalScore(0);
    setResults([]);
    setIsComplete(false);
  };

  const getCurrentQuestion = () => {
    if (!selectedSymptom || !currentQuestionId) return null;
    return selectedSymptom.followUpQuestions.find(q => q.id === currentQuestionId);
  };

  const currentQuestion = getCurrentQuestion();

  // Medical disclaimer component
  const Disclaimer = () => (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-amber-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-amber-700">
            <strong>Medical Disclaimer:</strong> This tool is for informational purposes only and is not a qualified medical opinion. Always consult with a healthcare professional about any health concerns.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-xl font-bold">Symptom Checker</h2>
        <p className="text-sm mt-1 text-blue-100">
          Answer a few questions to help identify possible conditions related to your symptoms
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        {showDisclaimer && <Disclaimer />}

        {/* Symptom Selection */}
        {!selectedSymptom && (
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">What's your main symptom?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {symptoms.map(symptom => (
                <button
                  key={symptom.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors text-left"
                  onClick={() => handleSymptomSelect(symptom.id)}
                >
                  <h4 className="font-medium text-blue-600">{symptom.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{symptom.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Questions */}
        {selectedSymptom && currentQuestion && !isComplete && (
          <div className="max-w-lg mx-auto">
            <div className="flex items-center mb-6">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={resetChecker}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
              <h3 className="text-lg font-medium text-gray-900 ml-2">
                About your {selectedSymptom.name}
              </h3>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">{currentQuestion.text}</h4>
              <div className="space-y-2">
                {currentQuestion.options.map(option => (
                  <button
                    key={option.id}
                    className="w-full p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left"
                    onClick={() => handleOptionSelect(currentQuestion.id, option)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {isComplete && (
          <div>
            <div className="flex items-center mb-6">
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={resetChecker}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
              <h3 className="text-lg font-medium text-gray-900 ml-2">
                Possible conditions based on your symptoms
              </h3>
            </div>

            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((condition, index) => (
                  <div
                    key={condition.id}
                    className={`p-4 border rounded-lg ${index === 0 ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-blue-600">
                        <MedicalTermTooltip term={condition.id}>
                          {condition.name}
                        </MedicalTermTooltip>
                      </h4>
                      {index === 0 && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Best match
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{condition.description}</p>
                    <div className="mt-3">
                      <a
                        href={condition.url}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Learn more about {condition.name} →
                      </a>
                    </div>
                  </div>
                ))}

                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                  <p className="text-sm text-gray-600">
                    Remember: The Symptom Checker is not a diagnosis. The results show what you may be experiencing and possible conditions. Consult with a healthcare professional for proper diagnosis and treatment.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mx-auto mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-lg font-medium text-gray-900 mb-2">No clear matches found</h4>
                <p className="text-gray-600">
                  We couldn't identify specific conditions based on your answers. Please consult with a healthcare professional for proper evaluation.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
