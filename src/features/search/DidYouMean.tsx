import React from 'react';

interface DidYouMeanProps {
  originalQuery: string;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
  className?: string;
}

/**
 * A component that displays "Did you mean" suggestions for ambiguous search queries
 * or symptom descriptions
 */
const DidYouMean: React.FC<DidYouMeanProps> = ({
  originalQuery,
  suggestions,
  onSuggestionClick,
  className = ''
}) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className={`text-sm ${className}`}>
      <span className="text-gray-600">Did you mean: </span>
      <ul className="inline-flex flex-wrap gap-1 ml-1">
        {suggestions.map((suggestion, index) => (
          <React.Fragment key={suggestion}>
            <li>
              <button
                onClick={() => onSuggestionClick(suggestion)}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                {suggestion}
              </button>
            </li>
            {index < suggestions.length - 1 && <li className="text-gray-400">•</li>}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

/**
 * Generate alternative suggestions for symptom descriptions
 *
 * @param symptomDescription An ambiguous symptom description
 * @returns Array of possible interpretations
 */
export const generateSymptomSuggestions = (symptomDescription: string): string[] => {
  // Map of common ambiguous descriptions to more specific suggestions
  const ambiguousMappings: Record<string, string[]> = {
    // Head-related
    'headache': ['migraine', 'tension headache', 'cluster headache', 'sinus headache'],
    'head hurts': ['headache', 'migraine', 'sinus pressure', 'head injury'],
    'dizzy': ['dizziness', 'vertigo', 'lightheadedness', 'balance problems'],
    'can\'t see well': ['blurred vision', 'vision loss', 'eye strain', 'vision changes'],

    // Chest and breathing
    'chest pain': ['heart attack symptoms', 'angina', 'heartburn', 'muscle strain'],
    'chest hurts': ['chest pain', 'heart attack symptoms', 'costochondritis', 'acid reflux'],
    'hard to breathe': ['shortness of breath', 'asthma attack', 'panic attack', 'respiratory infection'],
    'can\'t breathe': ['severe shortness of breath', 'asthma attack', 'anaphylaxis', 'panic attack'],

    // Stomach and digestion
    'stomach pain': ['abdominal pain', 'indigestion', 'menstrual cramps', 'appendicitis symptoms'],
    'stomach hurts': ['abdominal pain', 'gastritis', 'food poisoning', 'stomach flu'],
    'can\'t eat': ['loss of appetite', 'nausea', 'food aversion', 'difficulty swallowing'],
    'feeling sick': ['nausea', 'general malaise', 'flu symptoms', 'food poisoning'],

    // General symptoms
    'tired all the time': ['chronic fatigue', 'sleep apnea', 'anemia', 'depression'],
    'no energy': ['fatigue', 'chronic fatigue syndrome', 'depression', 'vitamin deficiency'],
    'always sick': ['chronic illness', 'immune deficiency', 'recurring infections', 'allergies'],
    'not feeling well': ['general malaise', 'flu symptoms', 'fever', 'infection'],

    // Pain-related
    'everything hurts': ['body aches', 'fibromyalgia', 'flu symptoms', 'autoimmune disorder'],
    'pain everywhere': ['widespread pain', 'fibromyalgia', 'rheumatoid arthritis', 'polymyalgia'],
    'bad pain': ['severe pain', 'acute pain', 'chronic pain', 'pain management'],
    'hurts to move': ['joint pain', 'muscle pain', 'arthritis', 'injury'],

    // Mental health
    'feeling down': ['depression', 'low mood', 'sadness', 'grief'],
    'worried all the time': ['anxiety', 'generalized anxiety disorder', 'stress', 'worry'],
    'can\'t focus': ['attention problems', 'ADHD symptoms', 'brain fog', 'concentration issues'],
    'can\'t sleep': ['insomnia', 'sleep disorder', 'sleep apnea', 'anxiety at night'],

    // Skin and allergies
    'itchy skin': ['skin rash', 'eczema', 'allergic reaction', 'hives'],
    'rash': ['skin rash', 'allergic reaction', 'eczema', 'contact dermatitis'],
    'sneezing': ['allergies', 'common cold', 'hay fever', 'dust allergy'],

    // Specific terms
    'covid': ['COVID-19 symptoms', 'coronavirus', 'respiratory infection', 'fever and cough'],
    'flu': ['influenza symptoms', 'cold vs flu', 'fever and body aches', 'respiratory infection'],
    'heart': ['heart disease', 'heart palpitations', 'chest pain', 'cardiovascular symptoms']
  };

  // Normalize the input
  const normalizedInput = symptomDescription.toLowerCase().trim();

  // First check for exact matches
  if (ambiguousMappings[normalizedInput]) {
    return ambiguousMappings[normalizedInput];
  }

  // Then check for partial matches
  for (const [key, suggestions] of Object.entries(ambiguousMappings)) {
    if (normalizedInput.includes(key)) {
      return suggestions;
    }
  }

  // Then check if any key includes the input
  const matchingKeys = Object.keys(ambiguousMappings).filter(key => key.includes(normalizedInput));
  if (matchingKeys.length > 0) {
    const matchingSuggestions: string[] = [];
    matchingKeys.forEach(key => {
      matchingSuggestions.push(...ambiguousMappings[key]);
    });
    // Return unique suggestions
    return Array.from(new Set(matchingSuggestions)).slice(0, 4);
  }

  // If no matches found, return empty array
  return [];
};

export default DidYouMean;
