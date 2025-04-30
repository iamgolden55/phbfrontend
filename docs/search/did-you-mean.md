# Did You Mean Feature

This document explains how the "Did You Mean" feature works for providing alternative suggestions for ambiguous symptom descriptions.

## Overview

The "Did You Mean" feature helps users find relevant health information when they use ambiguous or non-medical language to describe their symptoms. It suggests more specific or medically accurate terms that can improve search results.

## Key Files

- **`src/features/search/DidYouMean.tsx`** - The component that displays suggestion alternatives
- **`src/features/search/DidYouMean.tsx`** (contains `generateSymptomSuggestions` function) - Logic for generating suggestions

## Component Structure

The `DidYouMean` component is a simple UI component that:

1. Takes an original query and an array of suggestions
2. Displays a "Did you mean:" prompt followed by clickable suggestions
3. Triggers a callback when a suggestion is clicked

```typescript
interface DidYouMeanProps {
  originalQuery: string;          // The user's original search term
  suggestions: string[];          // Array of alternative suggestions
  onSuggestionClick: (suggestion: string) => void;  // Click handler
  className?: string;             // Optional CSS class
}
```

## Suggestion Generation

The `generateSymptomSuggestions` function analyzes a query string and returns possible alternatives:

```typescript
function generateSymptomSuggestions(symptomDescription: string): string[] {
  // Normalize the input
  const normalizedInput = symptomDescription.toLowerCase().trim();

  // Check for exact matches, partial matches, or related terms
  // ...

  // Return array of suggestions (or empty array if none found)
  return suggestions;
}
```

## Ambiguous Mappings Dictionary

The core of the feature is a comprehensive dictionary that maps common phrases to more specific medical concepts:

```typescript
const ambiguousMappings: Record<string, string[]> = {
  // Head-related
  'headache': ['migraine', 'tension headache', 'cluster headache', 'sinus headache'],
  'head hurts': ['headache', 'migraine', 'sinus pressure', 'head injury'],

  // Chest and breathing
  'chest pain': ['heart attack symptoms', 'angina', 'heartburn', 'muscle strain'],
  'hard to breathe': ['shortness of breath', 'asthma attack', 'panic attack', 'respiratory infection'],

  // General symptoms
  'tired all the time': ['chronic fatigue', 'sleep apnea', 'anemia', 'depression'],
  'not feeling well': ['general malaise', 'flu symptoms', 'fever', 'infection'],

  // ... many more mappings
}
```

## How It Works

The suggestion algorithm uses a three-tiered approach:

1. **Exact Match** - Checks if the query exactly matches a key in the dictionary
2. **Partial Match** - Checks if the query contains any keys in the dictionary
3. **Reverse Match** - Checks if any dictionary keys contain the query

### Matching Logic

```typescript
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
```

## Component Rendering

The component renders as a simple line of text with clickable suggestions:

```tsx
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
```

## Integration with Search

The "Did You Mean" feature is integrated with the advanced search page:

```tsx
// Inside AdvancedSearchPage.tsx
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const q = params.get('q');
  if (q) {
    setSearchQuery(q);
    performSearch(q);

    // Generate "Did you mean" suggestions
    const suggestions = generateSymptomSuggestions(q);
    setDidYouMeanSuggestions(suggestions);
  }
}, [location.search]);

// Handler for when a suggestion is clicked
const handleSuggestionClick = (suggestion: string) => {
  setSearchQuery(suggestion);
  navigate(`/advanced-search?q=${encodeURIComponent(suggestion)}`);
  performSearch(suggestion);
  setDidYouMeanSuggestions([]);
};
```

## Example Use Cases

1. **Vague Symptom Descriptions** - User searches for "feeling tired all the time" and gets suggestions like "chronic fatigue," "anemia," etc.
2. **Non-Medical Language** - User searches for "stomach hurts" and gets suggestions like "abdominal pain," "gastritis," etc.
3. **Ambiguous Terms** - User searches for "chest pain" and gets more specific suggestions like "heart attack symptoms," "angina," etc.

## Customization

To extend the "Did You Mean" feature:

### 1. Add New Ambiguous Mappings

Add entries to the `ambiguousMappings` dictionary:

```typescript
const ambiguousMappings: Record<string, string[]> = {
  // ... existing mappings

  // Add new mappings
  'dizzy when standing': ['orthostatic hypotension', 'vertigo', 'dehydration', 'low blood pressure'],
  'ringing in ears': ['tinnitus', 'ear infection', 'ear wax buildup', 'hearing loss'],
  'lump in throat': ['globus sensation', 'anxiety symptoms', 'thyroid issues', 'acid reflux']
};
```

### 2. Improve Matching Algorithm

You can enhance the matching logic to handle more complex cases:

```typescript
// Add more sophisticated matching
// For example, partial word matching
const words = normalizedInput.split(' ');
for (const [key, suggestions] of Object.entries(ambiguousMappings)) {
  const keyWords = key.split(' ');
  if (words.some(word => keyWords.includes(word))) {
    return suggestions;
  }
}
```

## Usage Example

To use the "Did You Mean" component in another page:

```tsx
import DidYouMean, { generateSymptomSuggestions } from '../features/search/DidYouMean';

function SearchResultsPage() {
  const [query, setQuery] = useState('headache');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Generate suggestions when query changes
    const newSuggestions = generateSymptomSuggestions(query);
    setSuggestions(newSuggestions);
  }, [query]);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    // Perform search with new query
    console.log(`Searching for: ${suggestion}`);
  };

  return (
    <div className="p-4">
      <h1>Search Results for "{query}"</h1>

      {suggestions.length > 0 && (
        <DidYouMean
          originalQuery={query}
          suggestions={suggestions}
          onSuggestionClick={handleSuggestionClick}
          className="mt-2 mb-4"
        />
      )}

      {/* Search results would go here */}
    </div>
  );
}
```
