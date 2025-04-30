# Smart Search System

This document explains how the smart search system works, including the natural language understanding, spelling correction, and concept matching.

## Overview

The smart search system enables users to find relevant health information even when they use everyday language, misspell terms, or describe symptoms in non-medical language. It's implemented in `src/utils/searchService.ts`.

## Key Features

1. **Natural Language Understanding** - Interprets everyday descriptions like "serious headache"
2. **Spelling Correction** - Handles misspellings like "diabeties" or "anxeity"
3. **Concept Matching** - Maps symptoms to relevant health conditions
4. **Fuzzy Matching** - Finds similar terms using Levenshtein distance

## Components

### Main Search Functions

- **`searchContent()`** - The primary search function that handles text queries
- **`getSearchSuggestions()`** - Provides autocomplete suggestions while typing
- **`extractSymptoms()`** - Extracts medical concepts from natural language

### Helper Functions

- **`correctSpelling()`** - Fixes common misspellings
- **`findFuzzyMatches()`** - Finds similar terms via fuzzy matching
- **`calculateRelevanceScore()`** - Ranks results by relevance to symptoms

## How The Smart Search Works

### 1. Natural Language Processing Flow

When a user types a search query like "serious headache":

1. The query is passed to `searchContent()`
2. `correctSpelling()` checks for misspelled words
3. `extractSymptoms()` identifies medical concepts in the query
4. The system searches for exact matches first
5. If no exact matches, it uses concept matching to find relevant results
6. If still no matches, it uses fuzzy matching as a last resort
7. Results are sorted by relevance score

### 2. Spelling Correction

Spelling correction works through:

- A dictionary of common misspellings (`commonMisspellings` object)
- Automatically generated typo variations (letter swapping, missing letters, etc.)
- The Levenshtein distance algorithm to measure string similarity

Example: "diabeties" → "diabetes"

```typescript
// Sample from the misspellings dictionary
const commonMisspellings = {
  "diabeties": "diabetes",
  "anxeity": "anxiety"
  // ... other misspellings
};
```

### 3. Concept Matching

Concept matching connects everyday language to medical terms:

- Each search result has `concepts` and `symptoms` arrays
- The system extracts concepts from the search query
- Results with matching concepts are prioritized

Example mappings:

```typescript
// Sample from the symptom phrases
const symptomPhrases = {
  "headache": ["head hurts", "head pain", "head ache", "serious headache"],
  "fatigue": ["feeling tired", "always tired", "no energy"]
  // ... other mappings
};
```

### 4. Relevance Scoring

Results are ranked using a scoring algorithm:

- Direct symptom matches get the highest score (10 points)
- Partial matches get a medium score (5 points)
- Results are sorted by total score

## Customization

To extend the smart search:

1. **Add new misspellings** in the `commonMisspellings` object
2. **Add symptom phrases** in the `symptomPhrases` object
3. **Add concept mappings** in the `conceptMap` object
4. **Enhance search data** by adding more `concepts` and `symptoms` to entries

## Integration with UI

The smart search connects to:

1. The main search input in the header
2. The dedicated search page
3. The advanced search page's text search tab

## Example Code

To perform a search programmatically:

```typescript
import { searchContent } from '../utils/searchService';

// Example function that performs a search
async function performSearch(query: string) {
  try {
    const results = await searchContent(query);
    // Process the results
    console.log(results);
  } catch (error) {
    console.error('Error searching:', error);
  }
}
```
