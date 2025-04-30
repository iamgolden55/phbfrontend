# Medical Terminology System

This document explains how the medical terminology highlighting and tooltip system works.

## Overview

The medical terminology system automatically identifies medical terms in text content and provides tooltip definitions when users hover over these terms. This helps users understand complex medical terminology without leaving the page.

## Key Files

- **`src/features/search/medicalDictionary.ts`** - Database of medical terms and definitions
- **`src/features/search/MedicalTermTooltip.tsx`** - Component for displaying tooltips
- **`src/features/search/MedicalTermHighlighter.tsx`** - Utility to find and highlight terms

## Medical Dictionary

The medical dictionary (`medicalDictionary.ts`) contains structured information about medical terms:

```typescript
export interface MedicalTermDefinition {
  term: string;             // The term in display form (capitalized)
  definition: string;       // Plain language explanation
  category: 'condition' | 'symptom' | 'procedure' | 'medication' | 'anatomy' | 'general';
  relatedTerms?: string[];  // Optional related terms for further exploration
}
```

Terms are categorized into:
- **Conditions** - Diseases and disorders (e.g., diabetes, hypertension)
- **Symptoms** - Clinical manifestations (e.g., headache, nausea)
- **Procedures** - Medical tests and interventions (e.g., MRI, CT scan)
- **Medications** - Drug classes and treatments (e.g., antibiotic, analgesic)
- **Anatomy** - Body parts and systems (e.g., cardiovascular, respiratory)
- **General** - Other medical concepts (e.g., chronic, acute)

### Example Dictionary Entry

```typescript
"hypertension": {
  term: "Hypertension",
  definition: "High blood pressure, a common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems.",
  category: "condition",
  relatedTerms: ["blood pressure", "cardiovascular disease", "heart disease"]
}
```

## Term Tooltip Component

The `MedicalTermTooltip` component:

1. Wraps around medical terms
2. Shows a tooltip when the user hovers over the term
3. Positions the tooltip appropriately based on screen space
4. Color-codes the tooltip based on term category

### Usage Example

```tsx
import MedicalTermTooltip from './MedicalTermTooltip';

// In your JSX:
<p>
  Patients with <MedicalTermTooltip term="hypertension">hypertension</MedicalTermTooltip> should monitor their blood pressure regularly.
</p>
```

### Tooltip Features

- **Category Badge** - Shows the term category (color-coded)
- **Term Title** - Displays the formal term
- **Definition** - Provides a clear explanation
- **Related Terms** - Suggests connected concepts for exploration

## Term Highlighter Component

The `MedicalTermHighlighter` component automatically finds and highlights medical terms in a block of text:

1. Takes a text string as input
2. Searches for medical terms from the dictionary
3. Wraps found terms in `MedicalTermTooltip` components
4. Returns the processed text with interactive terms

### How It Works

1. It uses a regular expression to locate medical terms in the text
2. Terms are sorted by length (longest first) to avoid partial matches
3. The text is split into segments: regular text and medical terms
4. Each medical term is wrapped in a tooltip component

### Usage Example

```tsx
import MedicalTermHighlighter from './MedicalTermHighlighter';

// In your JSX:
<MedicalTermHighlighter
  text="Hypertension and diabetes are common chronic conditions that often occur together."
  className="text-gray-700"
/>
```

## Utility Functions

The dictionary also provides utility functions:

- **`getMedicalTermDefinition(term)`** - Gets a definition for a specific term
- **`getAllMedicalTerms()`** - Returns an array of all available terms
- **`findMedicalTermsInText(text)`** - Finds all medical terms in a text string

## Customization

To extend the medical terminology system:

1. **Add new terms** to the `medicalDictionary` object in `medicalDictionary.ts`
2. Ensure each term has the correct structure (term, definition, category)
3. Consider adding related terms to help users explore connected concepts

## Integration

The medical term system is integrated with:

1. Search results in `AdvancedSearchPage.tsx`
2. Condition descriptions in the symptom checker
3. Health information pages throughout the site

## Example: Adding a New Term

To add a new medical term to the dictionary:

```typescript
// In medicalDictionary.ts
export const medicalDictionary: Record<string, MedicalTermDefinition> = {
  // Existing terms...

  // Add your new term:
  "osteoporosis": {
    term: "Osteoporosis",
    definition: "A condition that weakens bones, making them fragile and more likely to break.",
    category: "condition",
    relatedTerms: ["bone density", "fracture", "calcium deficiency"]
  }
};
```
