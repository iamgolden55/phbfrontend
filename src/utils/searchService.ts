import { SearchResultItem } from '../components/SearchResults';
import { HealthCondition, healthConditions } from '../features/health/healthConditionsData';

/**
 * Convert a HealthCondition to a SearchResultItem
 */
function healthConditionToSearchResult(condition: HealthCondition): SearchResultItem {
  return {
    title: condition.name,
    description: condition.description,
    url: `/health-a-z/${condition.id}`,
    category: 'Health A-Z',
    concepts: [condition.category, ...(condition.subcategory ? [condition.subcategory] : [])],
    symptoms: condition.symptoms
  };
}

// Non-health condition search data - other content types like Live Well, Programs, etc.
const nonHealthConditionData: SearchResultItem[] = [
  {
    title: "Healthy Eating",
    description: "Advice on maintaining a balanced diet, understanding food groups, and making healthier food choices.",
    url: "/live-well/healthy-eating",
    category: "Live Well",
    concepts: ["nutrition", "diet", "food", "meal planning", "healthy food", "vitamins", "minerals", "balanced diet"],
    symptoms: []
  },
  {
    title: "Exercise and Fitness",
    description: "Tips on staying active, benefits of physical activity, and how to start and maintain an exercise routine.",
    url: "/live-well/exercise",
    category: "Live Well",
    concepts: ["physical activity", "workout", "fitness", "cardio", "strength training", "stamina", "endurance"],
    symptoms: ["fatigue", "weakness", "low energy", "tiredness", "overweight"]
  },
  {
    title: "Mental Wellbeing",
    description: "Guidance on managing stress, improving mental health, and understanding common mental health issues.",
    url: "/live-well/mental-wellbeing",
    category: "Live Well",
    concepts: ["mental health", "wellbeing", "stress", "anxiety", "depression", "mood", "psychological", "mindfulness", "relaxation"],
    symptoms: ["stress", "anxiety", "low mood", "insomnia", "trouble sleeping", "panic attack", "overwhelmed", "sad", "feeling down", "mood swings"]
  },
  {
    title: "Sleep and Tiredness",
    description: "Information on getting good sleep, dealing with sleep problems, and managing fatigue.",
    url: "/live-well/sleep",
    category: "Live Well",
    concepts: ["sleep", "rest", "tiredness", "fatigue", "insomnia", "sleep quality", "sleep hygiene"],
    symptoms: ["insomnia", "trouble sleeping", "tiredness", "exhaustion", "fatigue", "drowsiness", "lethargy", "can't sleep", "waking up at night"]
  },
  {
    title: "Student Recruitment Program",
    description: "Empowering final year students to join PHB's mission in improving public health in Nigeria.",
    url: "/programs/student-recruitment",
    category: "Programs",
    concepts: ["student", "education", "career", "recruitment", "public health", "internship"],
    symptoms: []
  },
  {
    title: "Research Opportunities",
    description: "Funding and support for innovative public health research initiatives in Nigeria.",
    url: "/programs/research",
    category: "Programs",
    concepts: ["research", "study", "funding", "academic", "innovation", "science"],
    symptoms: []
  },
  {
    title: "Mentorship Program",
    description: "Professional development and guidance for emerging public health leaders.",
    url: "/programs/mentorship",
    category: "Programs",
    concepts: ["mentorship", "guidance", "career development", "leadership", "training"],
    symptoms: []
  },
  {
    title: "University Partnerships",
    description: "Collaborative initiatives between PHB and academic institutions across Nigeria.",
    url: "/programs/partnerships",
    category: "Programs",
    concepts: ["university", "collaboration", "academic", "partnership", "education"],
    symptoms: []
  },
  {
    title: "Depression",
    description: "Learn about depression, its symptoms, causes, and treatment options.",
    url: "/health-a-z/depression",
    category: "Health A-Z",
    concepts: ["depression", "mental health", "mood disorder", "mental illness"],
    symptoms: ["sadness", "hopelessness", "low mood", "worthlessness", "fatigue", "lack of interest", "loss of interest", "feeling down", "self harm", "suicidal thoughts", "lack of energy", "sleep problems", "weight changes"]
  },
  {
    title: "Anxiety",
    description: "Information about anxiety disorders, symptoms, and ways to manage anxiety.",
    url: "/health-a-z/anxiety",
    category: "Health A-Z",
    concepts: ["anxiety", "anxiety disorder", "panic", "worry", "mental health"],
    symptoms: ["worry", "excessive worry", "racing heart", "panic", "fear", "nervousness", "panic attack", "sweating", "shortness of breath", "chest pain", "dizziness", "nausea"]
  },
  {
    title: "Diabetes",
    description: "Understand diabetes, its types, symptoms, risks, and management strategies.",
    url: "/health-a-z/diabetes",
    category: "Health A-Z",
    concepts: ["diabetes", "blood sugar", "insulin", "glucose", "chronic disease"],
    symptoms: ["excessive thirst", "frequent urination", "hunger", "fatigue", "blurred vision", "slow healing", "weight loss", "tingling", "numbness", "thirsty all the time", "need to pee a lot"]
  },
  {
    title: "High Blood Pressure",
    description: "Learn about high blood pressure, its causes, effects, and how to control it.",
    url: "/health-a-z/high-blood-pressure",
    category: "Health A-Z",
    concepts: ["hypertension", "blood pressure", "cardiovascular", "heart health"],
    symptoms: ["headache", "severe headache", "dizziness", "chest pain", "shortness of breath", "nosebleed", "vision problems", "blood in urine", "pounding feeling", "irregular heartbeat"]
  },
  {
    title: "Migraine",
    description: "Information about migraines, triggers, symptoms, and treatment options.",
    url: "/health-a-z/migraine",
    category: "Health A-Z",
    concepts: ["migraine", "headache", "neurological", "pain"],
    symptoms: ["severe headache", "throbbing pain", "pulsating pain", "one-sided headache", "headache with nausea", "headache with sensitivity to light", "aura", "vomiting", "sensitivity to sound", "severe head pain", "serious headache"]
  },
  {
    title: "Common Cold",
    description: "Understanding the common cold, its symptoms, and home remedies.",
    url: "/health-a-z/common-cold",
    category: "Health A-Z",
    concepts: ["cold", "viral infection", "upper respiratory", "virus"],
    symptoms: ["runny nose", "sore throat", "cough", "congestion", "sneezing", "mild fever", "body aches", "headache", "stuffy nose"]
  },
  {
    title: "Flu (Influenza)",
    description: "Information about influenza, prevention, symptoms, and when to seek medical help.",
    url: "/health-a-z/flu",
    category: "Health A-Z",
    concepts: ["flu", "influenza", "viral infection", "seasonal illness"],
    symptoms: ["fever", "chills", "cough", "sore throat", "body aches", "fatigue", "headache", "runny nose", "high temperature", "sudden fever", "muscle pain", "joint pain"]
  },
  {
    title: "Allergies",
    description: "Learn about different types of allergies, symptoms, and management strategies.",
    url: "/health-a-z/allergies",
    category: "Health A-Z",
    concepts: ["allergy", "allergic reaction", "histamine", "hypersensitivity", "allergen"],
    symptoms: ["sneezing", "itching", "rash", "hives", "runny nose", "watery eyes", "swelling", "wheezing", "shortness of breath", "skin redness", "congestion"]
  },
  {
    title: "Asthma",
    description: "Information about asthma, triggers, management, and treatment options.",
    url: "/health-a-z/asthma",
    category: "Health A-Z",
    concepts: ["asthma", "respiratory condition", "lung disease", "breathing disorder"],
    symptoms: ["wheezing", "shortness of breath", "chest tightness", "coughing", "trouble breathing", "breathing difficulty", "breathlessness"]
  },
  {
    title: "Pregnancy",
    description: "Information and guidance on pregnancy, from conception to birth.",
    url: "/pregnancy",
    category: "Pregnancy",
    concepts: ["pregnancy", "maternity", "prenatal", "expecting", "childbirth", "conception"],
    symptoms: ["missed period", "nausea", "morning sickness", "fatigue during pregnancy", "tender breasts", "swollen breasts", "food aversions", "mood swings", "frequent urination"]
  },
  {
    title: "Early Pregnancy",
    description: "What to expect in the first trimester of pregnancy, including early symptoms and care.",
    url: "/pregnancy/early",
    category: "Pregnancy",
    concepts: ["first trimester", "early pregnancy", "conception", "embryo development"],
    symptoms: ["morning sickness", "nausea in pregnancy", "breast tenderness", "fatigue", "food aversions", "cramping", "spotting", "missed period", "positive pregnancy test"]
  },
  {
    title: "Middle Pregnancy",
    description: "Information about the second trimester of pregnancy and important developments.",
    url: "/pregnancy/middle",
    category: "Pregnancy",
    concepts: ["second trimester", "middle pregnancy", "fetal development", "prenatal care"],
    symptoms: ["baby movements", "kicks", "weight gain", "growing belly", "back pain", "stretch marks", "darkened skin", "linea nigra"]
  },
  {
    title: "PHB Services",
    description: "Overview of services offered by the Public Health Bureau.",
    url: "/phb-services",
    category: "Services",
    concepts: ["health services", "medical services", "public health", "healthcare"],
    symptoms: []
  },
  {
    title: "About PHB",
    description: "Learn about the Public Health Bureau, its mission, vision, and history.",
    url: "/about",
    category: "About",
    concepts: ["organization", "about", "mission", "vision", "history", "public health"],
    symptoms: []
  },
  {
    title: "Elara AI",
    description: "Discover Elara AI, PHB's artificial intelligence assistant for health information.",
    url: "/elara-ai",
    category: "AI Services",
    concepts: ["AI", "artificial intelligence", "assistant", "digital health", "technology"],
    symptoms: []
  }
];

// Common phrases that might indicate health concerns or symptoms
const symptomPhrases: { [key: string]: string[] } = {
  "headache": ["head hurts", "head pain", "head ache", "pain in head", "serious headache", "bad headache", "terrible headache", "pounding head", "throbbing head", "migraine", "head throbbing"],
  "fatigue": ["feeling tired", "always tired", "no energy", "exhausted", "worn out", "low energy", "tired all the time", "constant tiredness", "lack of energy"],
  "nausea": ["feeling sick", "upset stomach", "want to vomit", "feel like throwing up", "queasy", "stomach upset"],
  "fever": ["high temperature", "running a temperature", "feeling hot", "body temperature", "hot and cold", "chills", "sweating"],
  "cough": ["persistent cough", "bad cough", "can't stop coughing", "dry cough", "chesty cough", "night cough", "coughing up phlegm"],
  "depression": ["feeling sad", "always sad", "feeling down", "no joy", "no pleasure", "hopeless", "no motivation", "lost interest", "don't enjoy anything"],
  "anxiety": ["worried all the time", "constant worry", "can't stop worrying", "nervous", "on edge", "panic", "stress"],
  "insomnia": ["can't sleep", "trouble sleeping", "difficulty sleeping", "waking up at night", "not sleeping well", "poor sleep"],
  "breathing problems": ["can't breathe", "short of breath", "struggle to breathe", "breathing difficulty", "hard to breathe", "trouble breathing", "breathless"],
  "pain": ["it hurts", "severe pain", "chronic pain", "sharp pain", "dull pain", "constant pain", "intermittent pain"]
};

// Map common concept phrases to medical terms
const conceptMap: { [key: string]: string[] } = {
  "can't sleep": ["insomnia", "sleep", "sleep problems"],
  "feeling tired": ["fatigue", "tiredness", "exhaustion"],
  "can't breathe": ["breathing difficulty", "shortness of breath", "asthma"],
  "losing weight": ["weight loss", "diet", "nutrition"],
  "gaining weight": ["weight gain", "overweight", "diet"],
  "heart racing": ["fast heartbeat", "palpitations", "anxiety"],
  "stomach problems": ["digestive issues", "abdominal pain", "stomach ache"],
  "skin issues": ["rash", "hives", "dermatitis", "allergies"],
  "period problems": ["menstrual issues", "women's health", "gynecology"],
  "mental health": ["depression", "anxiety", "stress", "psychological wellbeing"],
  "pregnancy information": ["pregnancy", "prenatal", "expecting", "maternity"],
  "want to exercise": ["fitness", "physical activity", "workout"],
  "eat healthy": ["nutrition", "diet", "healthy eating"],
  "stress at work": ["work stress", "occupational health", "mental wellbeing"],
  "family health": ["genetic health", "hereditary conditions", "family medical history"]
};

// Common misspellings and their corrections
const commonMisspellings: { [key: string]: string } = {
  // Health conditions
  "diabeties": "diabetes",
  "diabetis": "diabetes",
  "diabetus": "diabetes",
  "diabetic": "diabetes",
  "diebetes": "diabetes",
  "anxity": "anxiety",
  "anxeity": "anxiety",
  "anxiaty": "anxiety",
  "anxeiety": "anxiety",
  "anxietie": "anxiety",
  "depresion": "depression",
  "depresn": "depression",
  "depresh": "depression",
  "depresun": "depression",
  "dipression": "depression",
  "hypertention": "high blood pressure",
  "hypertenshun": "high blood pressure",
  "hypertensin": "high blood pressure",
  "hipertension": "high blood pressure",
  "hi blood pressure": "high blood pressure",

  // Pregnancy
  "pregnent": "pregnancy",
  "pregnet": "pregnancy",
  "pragnent": "pregnancy",
  "pragnancy": "pregnancy",
  "pegnancy": "pregnancy",
  "pregnansy": "pregnancy",
  "prenancy": "pregnancy",
  "pregy": "pregnancy",
  "preggers": "pregnancy",

  // Exercise
  "excersize": "exercise",
  "excercise": "exercise",
  "exersize": "exercise",
  "exercize": "exercise",
  "exersise": "exercise",
  "exarcise": "exercise",

  // Sleep
  "sleap": "sleep",
  "slepp": "sleep",
  "sleeep": "sleep",
  "slep": "sleep",
  "sleepyness": "sleep",
  "tiredness": "tiredness",
  "tierdness": "tiredness",
  "tierd": "tired",

  // Eating
  "helthy eating": "healthy eating",
  "helthy food": "healthy eating",
  "nutriton": "nutrition",
  "nutrision": "nutrition",
  "nutrishun": "nutrition",
  "dietitian": "diet",
  "diatary": "diet",

  // Mental health
  "mental helth": "mental health",
  "mentl health": "mental health",
  "mantal health": "mental health",
  "mentel health": "mental health",
  "stress": "mental wellbeing",
  "stres": "mental wellbeing",
  "stressful": "mental wellbeing",

  // Headaches and pain
  "hedache": "headache",
  "headake": "headache",
  "migrain": "migraine",
  "migren": "migraine",
  "migranes": "migraine",
  "severe hed pain": "severe headache",
  "serious hed pain": "serious headache"
};

// Generate additional common typos automatically
function generateTypos() {
  const additionalTypos: { [key: string]: string } = {};

  // Process each keyword from nonHealthConditionData
  nonHealthConditionData.forEach(item => {
    const words = item.title.toLowerCase().split(' ');

    words.forEach((word: string) => {
      if (word.length > 3) { // Only process words longer than 3 characters
        // Common typo patterns

        // 1. Letter swapping
        for (let i = 0; i < word.length - 1; i++) {
          const swapped = word.substring(0, i) +
                        word[i+1] + word[i] +
                        word.substring(i+2);
          additionalTypos[swapped] = word;
        }

        // 2. Missing letter
        for (let i = 0; i < word.length; i++) {
          const missing = word.substring(0, i) + word.substring(i+1);
          additionalTypos[missing] = word;
        }

        // 3. Extra letter (duplicates)
        for (let i = 0; i < word.length; i++) {
          const extra = word.substring(0, i) +
                      word[i] + word[i] +
                      word.substring(i+1);
          additionalTypos[extra] = word;
        }

        // 4. Wrong vowel
        const vowels = ['a', 'e', 'i', 'o', 'u'];
        for (let i = 0; i < word.length; i++) {
          if (vowels.includes(word[i])) {
            for (const vowel of vowels) {
              if (vowel !== word[i]) {
                const wrongVowel = word.substring(0, i) +
                                vowel +
                                word.substring(i+1);
                additionalTypos[wrongVowel] = word;
              }
            }
          }
        }
      }
    });
  });

  return additionalTypos;
}

// Merge manually defined misspellings with automatically generated ones
const misspellings = { ...commonMisspellings, ...generateTypos() };

/**
 * Calculate levenshtein distance between two strings
 * This measures how different two strings are by counting the minimum number of operations
 * needed to transform one string into the other.
 */
function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;

  // Create a matrix of size (m+1) x (n+1)
  const d: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  // Initialize the first row and column
  for (let i = 0; i <= m; i++) {
    d[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    d[0][j] = j;
  }

  // Fill the matrix
  for (let j = 1; j <= n; j++) {
    for (let i = 1; i <= m; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,      // deletion
        d[i][j - 1] + 1,      // insertion
        d[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return d[m][n];
}

/**
 * Find closest matches to a search term using fuzzy matching
 *
 * @param searchTerm The term to search for
 * @param items Array of search items to check against
 * @param maxDistance Maximum edit distance to consider a match
 * @returns Array of matching search result items
 */
function findFuzzyMatches(searchTerm: string, items: SearchResultItem[], maxDistance = 2): SearchResultItem[] {
  const normalizedTerm = searchTerm.toLowerCase().trim();
  const results: SearchResultItem[] = [];

  // Check direct matches in titles
  items.forEach(item => {
    const title = item.title.toLowerCase();
    // Check if the search term is contained in the title
    if (title.includes(normalizedTerm)) {
      results.push(item);
    } else {
      // Check if any word in the title is close to the search term
      const words = title.split(' ');
      for (const word of words) {
        if (word.length > 2 && levenshteinDistance(word, normalizedTerm) <= maxDistance) {
          results.push(item);
          break;
        }
      }
    }
  });

  return results;
}

/**
 * Check and correct common misspellings
 *
 * @param searchTerm The term to check and potentially correct
 * @returns The corrected search term or the original if no correction found
 */
function correctSpelling(searchTerm: string): string {
  const normalizedTerm = searchTerm.toLowerCase().trim();

  // Check if the term is in our misspellings dictionary
  if (misspellings[normalizedTerm]) {
    return misspellings[normalizedTerm];
  }

  // Check if any word in the search term is misspelled
  const words = normalizedTerm.split(' ');
  const correctedWords = words.map(word => misspellings[word] || word);
  const corrected = correctedWords.join(' ');

  return corrected !== normalizedTerm ? corrected : normalizedTerm;
}

/**
 * Analyze a search query for symptoms or common phrases
 *
 * @param query The search query to analyze
 * @returns An array of potential medical concepts/symptoms
 */
function extractSymptoms(query: string): string[] {
  const normalizedQuery = query.toLowerCase().trim();
  const identifiedSymptoms: string[] = [];

  // First check for direct symptoms in symptom phrases
  for (const [symptom, phrases] of Object.entries(symptomPhrases)) {
    for (const phrase of phrases) {
      if (normalizedQuery.includes(phrase)) {
        identifiedSymptoms.push(symptom);
        break;
      }
    }
  }

  // Then check for concept mappings
  for (const [phrase, concepts] of Object.entries(conceptMap)) {
    if (normalizedQuery.includes(phrase)) {
      identifiedSymptoms.push(...concepts);
    }
  }

  // Finally, check individual words in the query against symptoms
  const words = normalizedQuery.split(' ');
  for (const word of words) {
    if (word.length > 3 && Object.keys(symptomPhrases).includes(word)) {
      identifiedSymptoms.push(word);
    }
  }

  return Array.from(new Set(identifiedSymptoms));
}

/**
 * Calculate a relevance score for a search result item based on how well it matches
 * the extracted concepts and symptoms from a query
 * 
 * @param item The search result item to score
 * @param extractedSymptoms Array of extracted symptoms from the query
 * @param rawQuery The original search query (normalized)
 * @returns A numerical relevance score
 */
function calculateRelevanceScore(item: SearchResultItem, extractedSymptoms: string[], rawQuery: string): number {
  let score = 0;
  const normalizedQuery = rawQuery.toLowerCase().trim();
  
  // Direct title match is highest priority
  if (item.title.toLowerCase().includes(normalizedQuery)) {
    score += 30;
    
    // Exact title match gets even higher score
    if (item.title.toLowerCase() === normalizedQuery) {
      score += 20;
    }
  }
  
  // Category match is high priority (e.g., "heart-and-circulation" for "heart" searches)
  if (item.category && item.category.toLowerCase().includes(normalizedQuery)) {
    score += 25;
  }
  
  // Description match is medium-high priority
  if (item.description && item.description.toLowerCase().includes(normalizedQuery)) {
    score += 15;
  }

  // Base score for having concepts/symptoms that match
  if (item.concepts && item.concepts.some(concept => 
    extractedSymptoms.some(symptom => concept.toLowerCase().includes(symptom))
  )) {
    score += 5;
  }

  if (item.symptoms && item.symptoms.some(itemSymptom => 
    extractedSymptoms.some(symptom => itemSymptom.toLowerCase().includes(symptom))
  )) {
    score += 10; // Symptoms are more specific, so higher score
  }

  // Additional score for each matching concept/symptom
  if (item.concepts) {
    for (const concept of item.concepts) {
      // Check against raw query
      if (concept.toLowerCase().includes(normalizedQuery)) {
        score += 8;
      }
      
      // Check against extracted symptoms
      for (const symptom of extractedSymptoms) {
        if (concept.toLowerCase().includes(symptom)) {
          score += 1;
        }
      }
    }
  }

  if (item.symptoms) {
    for (const itemSymptom of item.symptoms) {
      // Check against raw query
      if (itemSymptom.toLowerCase().includes(normalizedQuery)) {
        score += 12;
      }
      
      // Check against extracted symptoms
      for (const symptom of extractedSymptoms) {
        if (itemSymptom.toLowerCase().includes(symptom)) {
          score += 2;
        }
      }
    }
  }
  
  return score;
}

/**
 * Search for content across the app based on a search term
 * 
 * @param searchTerm The term to search for
 * @returns Promise that resolves to array of search results
 */
export async function searchContent(searchTerm: string): Promise<SearchResultItem[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  if (!searchTerm || searchTerm.trim().length < 2) {
    return [];
  }

  const query = searchTerm.toLowerCase().trim();
  
  // Check for common misspellings and correct them
  const correctedQuery = correctSpelling(query);
  
  // Extract potential symptoms or health concepts from the query
  const extractedSymptoms = extractSymptoms(correctedQuery);
  
  // Convert health conditions to search result format
  const healthConditionResults: SearchResultItem[] = healthConditions.map(healthConditionToSearchResult);
  
  // Combine all searchable content
  const allSearchableContent: SearchResultItem[] = [...nonHealthConditionData, ...healthConditionResults];
  
  // First try exact matches
  let results = allSearchableContent.filter(item => {
    // Check title
    if (item.title.toLowerCase().includes(correctedQuery)) {
      return true;
    }
    
    // Check description
    if (item.description.toLowerCase().includes(correctedQuery)) {
      return true;
    }
    
    // Check concepts
    if (item.concepts && item.concepts.some(concept => 
      concept.toLowerCase().includes(correctedQuery)
    )) {
      return true;
    }
    
    // Check symptoms
    if (item.symptoms && item.symptoms.some(symptom => 
      symptom.toLowerCase().includes(correctedQuery)
    )) {
      return true;
    }
    
    return false;
  });

  // If no exact matches, try fuzzy matching
  if (results.length === 0) {
    const fuzzyMatches = findFuzzyMatches(correctedQuery, allSearchableContent);
    results = [...fuzzyMatches];
    
    // Add a note about fuzzy matching if we found any matches
    if (results.length > 0) {
      results[0] = {
        ...results[0],
        description: `Showing similar results for "${searchTerm}". ${results[0].description}`
      };
    }
  }

  // If we have extracted symptoms/concepts, add relevant results
  if (extractedSymptoms.length > 0) {
    const symptomResults = allSearchableContent.filter(item => {
      // Skip items already in results
      if (results.includes(item)) {
        return false;
      }
      
      // Check if any extracted symptoms match this item's concepts or symptoms
      return (
        (item.concepts && item.concepts.some(concept => 
          extractedSymptoms.some(symptom => concept.toLowerCase().includes(symptom))
        )) ||
        (item.symptoms && item.symptoms.some(itemSymptom => 
          extractedSymptoms.some(symptom => itemSymptom.toLowerCase().includes(symptom))
        ))
      );
    });
    
    // Add symptom results and add a notice about the search interpretation if this was a natural language query
    if (symptomResults.length > 0) {
      results = [...results, ...symptomResults];
      
      // If we have no other results, add a note about the symptom interpretation
      if (results.length > 0 && symptomResults.includes(results[0])) {
        results[0] = {
          ...results[0],
          description: `Showing results related to "${extractedSymptoms.join(', ')}". ${results[0].description}`
        };
      }
    }
  }

  // Calculate relevance scores for sorting
  const scoredResults = results.map(item => ({
    item,
    score: calculateRelevanceScore(item, extractedSymptoms, correctedQuery)
  }));
  
  // Sort by relevance score (highest first)
  scoredResults.sort((a, b) => b.score - a.score);

  // Return sorted results
  return scoredResults.map(result => result.item);
}

/**
 * Get search suggestions based on a partial search term
 *
 * @param partialTerm The partial search term
 * @returns Promise that resolves to array of suggestion strings
 */
export const getSearchSuggestions = async (partialTerm: string): Promise<string[]> => {
  if (!partialTerm || partialTerm.trim().length < 2) {
    return [];
  }

  // Correct potential spelling mistakes
  const correctedTerm = correctSpelling(partialTerm);
  const normalizedTerm = correctedTerm.toLowerCase().trim();

  // Extract symptoms from the query
  const extractedSymptoms = extractSymptoms(normalizedTerm);
  
  // Convert health conditions to search result format
  const healthConditionResults: SearchResultItem[] = healthConditions.map(healthConditionToSearchResult);
  
  // Combine all searchable content
  const allSearchableContent: SearchResultItem[] = [...nonHealthConditionData, ...healthConditionResults];

  // Start with title matches
  let matchingTitles = allSearchableContent
    .filter((item: SearchResultItem) => item.title.toLowerCase().includes(normalizedTerm))
    .map((item: SearchResultItem) => item.title);

  // Add suggestions based on extracted symptoms
  if (extractedSymptoms.length > 0 && matchingTitles.length < 5) {
    const symptomRelatedItems = allSearchableContent
      .filter((item: SearchResultItem) => 
        item.symptoms && 
        item.symptoms.some((symptom: string) => 
          extractedSymptoms.some((extractedSymptom: string) => 
            symptom.toLowerCase().includes(extractedSymptom)
          )
        ) && 
        !matchingTitles.includes(item.title)
      )
      .map((item: SearchResultItem) => item.title);
    
    // Add symptom-related titles up to a max of 5 total suggestions
    matchingTitles = [...matchingTitles, ...symptomRelatedItems].slice(0, 5);
  }

  // If we still have fewer than 5 suggestions, add concept matches
  if (matchingTitles.length < 5) {
    const conceptMatches = allSearchableContent
      .filter((item: SearchResultItem) => 
        item.concepts && 
        item.concepts.some((concept: string) => 
          concept.toLowerCase().includes(normalizedTerm)
        ) && 
        !matchingTitles.includes(item.title)
      )
      .map((item: SearchResultItem) => item.title);
    
    // Add concept-related titles up to a max of 5 total suggestions
    matchingTitles = [...matchingTitles, ...conceptMatches].slice(0, 5);
  }
  
  // If we still don't have enough suggestions, try fuzzy matching
  if (matchingTitles.length < 3) {
    const fuzzyMatches = findFuzzyMatches(normalizedTerm, allSearchableContent);
    const fuzzyTitles = fuzzyMatches
      .map((item: SearchResultItem) => item.title)
      .filter((title: string) => !matchingTitles.includes(title));
    
    // Add fuzzy matches up to a max of 5 total suggestions
    matchingTitles = [...matchingTitles, ...fuzzyTitles].slice(0, 5);
  }

  // Return unique suggestions (up to 5)
  return Array.from(new Set(matchingTitles)).slice(0, 5);
};
