/**
 * Comprehensive data model for health conditions in the Health A-Z section
 */

export interface HealthCondition {
  id: string;                   // Unique identifier (slug for URLs)
  name: string;                 // Display name
  description: string;          // Brief description for listings
  category: HealthCategory;     // Primary category
  subcategory?: string;         // Optional subcategory
  symptoms: string[];           // Common symptoms
  causes: string[];             // Known causes or risk factors
  treatments: string[];         // Treatment options
  preventions: string[];        // Prevention methods
  relatedConditions?: string[];  // Related health conditions
  commonQuestions: Question[];  // Frequently asked questions
  emergencySigns?: string[];    // Signs to seek immediate medical attention
  whenToSeekHelp?: string[];   // When to seek medical help (less urgent than emergency signs)
  prevalence?: string;          // How common the condition is
  affectedGroups?: string[];    // Groups most commonly affected
  wikipediaUrl?: string;        // URL to the Wikipedia article for more information
  references?: Reference[];     // Scientific references and citations
  extraInfo?: string;           // Additional important information about the condition
  moreInfoLinks?: MoreInfoLink[]; // Links to additional resources
  transmissions?: string[];     // How the condition is transmitted (for infectious diseases)
}

export interface Question {
  question: string;
  answer: string;
}

export interface Reference {
  id: string;                   // Reference identifier (e.g., [1], [2], etc.)
  text: string;                 // Full citation text
  url?: string;                 // Optional URL to the reference source
}

export interface MoreInfoLink {
  label: string;                // Display text for the link
  url: string;                 // URL for the link
}

export type HealthCategory =
  | 'heart-and-circulation'
  | 'brain-and-nerves'
  | 'mental-health'
  | 'digestive-health'
  | 'bone-and-joint'
  | 'immune-system'
  | 'respiratory'
  | 'skin-and-hair'
  | 'reproductive-health'
  | 'endocrine-system'
  | 'urinary-system'
  | 'eye-health'
  | 'ear-health'
  | 'infectious-diseases'
  | 'cancer'
  | 'childrens-health'
  | 'mens-health'
  | 'womens-health'
  | 'seniors-health'
  | 'general-health';

/**
 * Interface for categorized health conditions
 */
export interface HealthConditionsByCategory {
  [category: string]: HealthCondition[];
}

/**
 * Interface for alphabetized health conditions
 */
export interface HealthConditionsByLetter {
  [letter: string]: HealthCondition[];
}

/**
 * Get conditions by first letter
 */
export function getConditionsByLetter(): HealthConditionsByLetter {
  const byLetter: HealthConditionsByLetter = {};

  // Initialize with alphabet letters
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
    byLetter[letter] = [];
  });

  // Populate with conditions
  healthConditions.forEach(condition => {
    const firstLetter = condition.name.charAt(0).toUpperCase();
    if (byLetter[firstLetter]) {
      byLetter[firstLetter].push(condition);
    }
  });

  // Sort conditions within each letter
  Object.keys(byLetter).forEach(letter => {
    byLetter[letter].sort((a, b) => a.name.localeCompare(b.name));
  });

  return byLetter;
}

/**
 * Get conditions by category
 */
export function getConditionsByCategory(): HealthConditionsByCategory {
  const byCategory: HealthConditionsByCategory = {};

  // Populate with conditions
  healthConditions.forEach(condition => {
    if (!byCategory[condition.category]) {
      byCategory[condition.category] = [];
    }
    byCategory[condition.category].push(condition);
  });

  // Sort conditions within each category
  Object.keys(byCategory).forEach(category => {
    byCategory[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  return byCategory;
}

/**
 * Get a specific health condition by ID
 */
export function getConditionById(id: string): HealthCondition | undefined {
  return healthConditions.find(condition => condition.id === id);
}

/**
 * Get related conditions for a specific condition
 */
export function getRelatedConditions(conditionId: string): HealthCondition[] {
  const condition = getConditionById(conditionId);
  if (!condition || !condition.relatedConditions) return [];

  return condition.relatedConditions
    .map(id => getConditionById(id))
    .filter((c): c is HealthCondition => c !== undefined);
}

/**
 * Search conditions by query
 */
export function searchConditions(query: string): HealthCondition[] {
  if (!query || query.trim() === '') return [];

  const normalizedQuery = query.toLowerCase().trim();

  return healthConditions.filter(condition =>
    condition.name.toLowerCase().includes(normalizedQuery) ||
    condition.description.toLowerCase().includes(normalizedQuery) ||
    condition.symptoms.some(symptom => symptom.toLowerCase().includes(normalizedQuery)) ||
    condition.causes.some(cause => cause.toLowerCase().includes(normalizedQuery))
  );
}

// Import condition data files
import conditionsAtoC from './healthConditionsData/conditionsA-C';
import conditionsDtoF from './healthConditionsData/conditionsD-F';
import conditionsGtoI from './healthConditionsData/conditionsG-I';
import conditionsJtoL from './healthConditionsData/conditionsJ-L';
import conditionsMtoO from './healthConditionsData/conditionsM-O';
import conditionsPtoR from './healthConditionsData/conditionsP-R';
import conditionsStoT from './healthConditionsData/conditionsS-T';
import conditionsUtoZ from './healthConditionsData/conditionsU-Z';
import additionalCommonConditions from './healthConditionsData/additionalCommonConditions';
import additionalConditions from './healthConditionsData/additionalConditions';
import popularConditions from './healthConditionsData/popularConditions';

// Combine all conditions into one array
export const healthConditions: HealthCondition[] = [
  ...conditionsAtoC,
  ...conditionsDtoF,
  ...conditionsGtoI,
  ...conditionsJtoL,
  ...conditionsMtoO,
  ...conditionsPtoR,
  ...conditionsStoT,
  ...conditionsUtoZ,
  ...additionalCommonConditions,
  ...additionalConditions,
  ...popularConditions
];
