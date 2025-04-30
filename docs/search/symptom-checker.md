# Symptom Checker

This document explains how the interactive symptom checker works.

## Overview

The Symptom Checker is an interactive tool that guides users through a series of questions to help identify possible conditions related to their symptoms. It's designed to be educational, not diagnostic, and helps users find relevant health information.

## Key Files

- **`src/features/search/SymptomChecker.tsx`** - The main symptom checker component

## Data Model

The symptom checker uses a structured data model with several key interfaces:

### Symptom

Represents a primary symptom that users can select:

```typescript
interface Symptom {
  id: string;                     // Unique identifier for the symptom
  name: string;                   // Display name (e.g., "Headache")
  description: string;            // Brief description of the symptom
  followUpQuestions: FollowUpQuestion[]; // Array of follow-up questions
}
```

### Follow-up Question

Represents a question asked about the selected symptom:

```typescript
interface FollowUpQuestion {
  id: string;                     // Unique identifier for the question
  text: string;                   // Question text
  options: FollowUpOption[];      // Possible answers
}
```

### Follow-up Option

Represents a possible answer to a follow-up question:

```typescript
interface FollowUpOption {
  id: string;                     // Unique identifier for the option
  text: string;                   // Answer text
  score: number;                  // Numeric score for condition matching
  nextQuestionId?: string;        // Optional ID of the next question to ask
}
```

### Possible Condition

Represents a health condition that might match the user's symptoms:

```typescript
interface PossibleCondition {
  id: string;                     // Unique identifier for the condition
  name: string;                   // Condition name (e.g., "Migraine")
  description: string;            // Brief description of the condition
  url: string;                    // URL to more information
  matchScore: number;             // Score indicating match strength
}
```

## Workflow

The symptom checker follows this workflow:

1. **Symptom Selection** - User selects a primary symptom
2. **Question Series** - User answers follow-up questions about the symptom
3. **Result Generation** - System calculates scores and presents possible conditions
4. **Learn More** - User can click on conditions to read more information

## Scoring Algorithm

The condition matching uses a scoring system:

1. Each answer has a base score (1-5 points)
2. Specific answer combinations add bonus points for relevant conditions
3. Conditions are sorted by total score (highest to lowest)
4. The top-scoring conditions are presented as the most likely matches

## Example Code

### Condition Matching

```typescript
// Example from SymptomChecker.tsx
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
            // ...more condition-specific adjustments

            return { ...c, matchScore: score };
          });
        break;

      // ...cases for other symptoms
    }
  }

  // Sort by match score
  matchedConditions.sort((a, b) => b.matchScore - a.matchScore);
  setResults(matchedConditions);
  setIsComplete(true);
};
```

## Component Structure

The component is structured with several key sections:

1. **Header** - Title and description
2. **Disclaimer** - Medical disclaimer banner
3. **Symptom Selection** - Grid of initial symptoms
4. **Questions Interface** - Dynamic question/answer form
5. **Results Display** - Matched conditions with descriptions

## Usage

The symptom checker component accepts a callback prop for when results are generated:

```typescript
interface SymptomCheckerProps {
  onResultsGenerated?: (results: PossibleCondition[]) => void;
}
```

### Example Usage

```tsx
import SymptomChecker from '../features/search/SymptomChecker';

function HealthToolsPage() {
  const handleResults = (results) => {
    console.log('Symptom checker results:', results);
    // Do something with the results, like log analytics
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Health Assessment Tools</h1>
      <SymptomChecker onResultsGenerated={handleResults} />
    </div>
  );
}
```

## Customization

To extend the symptom checker:

### 1. Add New Symptoms

Add entries to the `symptoms` array:

```typescript
const symptoms: Symptom[] = [
  // ... existing symptoms

  // Add a new symptom
  {
    id: 'cough',
    name: 'Cough',
    description: 'Persistent coughing or throat irritation.',
    followUpQuestions: [
      // Define follow-up questions...
    ]
  }
];
```

### 2. Add New Follow-up Questions

Add questions to a symptom's `followUpQuestions` array:

```typescript
followUpQuestions: [
  // ... existing questions

  // Add a new question
  {
    id: 'cough-duration',
    text: 'How long have you been coughing?',
    options: [
      { id: 'days', text: 'A few days', score: 1 },
      { id: 'weeks', text: 'Several weeks', score: 3 },
      { id: 'months', text: 'Months', score: 5 }
    ]
  }
]
```

### 3. Add New Possible Conditions

Add entries to the `possibleConditions` array:

```typescript
const possibleConditions: PossibleCondition[] = [
  // ... existing conditions

  // Add a new condition
  {
    id: 'bronchitis',
    name: 'Bronchitis',
    description: 'An inflammation of the lining of your bronchial tubes, which carry air to and from your lungs.',
    url: '/health-a-z/bronchitis',
    matchScore: 0 // Initial score will be calculated dynamically
  }
];
```

### 4. Update the Matching Logic

Add new cases to the `generateResults` function:

```typescript
switch (selectedSymptom.id) {
  // ... existing cases

  // Add a new case
  case 'cough':
    matchedConditions = possibleConditions
      .filter(c => ['bronchitis', 'common-cold', 'asthma'].includes(c.id))
      .map(c => {
        let score = totalScore;

        // Add condition-specific scoring logic
        if (c.id === 'bronchitis' && answers['cough-duration'] === 'weeks') {
          score += 3;
        }
        // ... more scoring rules

        return { ...c, matchScore: score };
      });
    break;
}
```

## Integration with Search System

The symptom checker integrates with the search system in `AdvancedSearchPage.tsx`:

1. Results from the symptom checker can become search results
2. Users can click on conditions to navigate to detailed information
3. The search query can be pre-populated based on symptom checker results

```typescript
// In AdvancedSearchPage.tsx
const handleCheckerResults = (results: any[]) => {
  // Update the search results with symptom checker results
  if (results && results.length > 0) {
    const checkerResults: SearchResultItem[] = results.map(result => ({
      title: result.name,
      description: result.description,
      url: result.url,
      category: 'Symptom Checker Results'
    }));

    setSearchResults(checkerResults);
  }
};
```
