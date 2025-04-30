# Body Map Interface

This document explains how the interactive body map for symptom-based searching works.

## Overview

The Body Map Interface provides a visual way for users to identify symptoms based on the affected body part. Users can click on a body part, view associated symptoms, and select a symptom to search for relevant information.

## Key Files

- **`src/features/search/BodyMapSearch.tsx`** - The main body map component

## Component Structure

The `BodyMapSearch` component has two main parts:

1. **SVG Body Map** - An interactive human body diagram with clickable regions
2. **Symptoms Panel** - A dynamic panel that shows symptoms for the selected body part

## Data Model

The body map uses a structured data model to represent body parts and their associated symptoms:

```typescript
interface BodyPart {
  id: string;             // Unique identifier for the body part
  name: string;           // Display name (e.g., "Head", "Chest")
  area: string;           // Broader anatomical region (e.g., "Head and Neck")
  symptoms: string[];     // Array of common symptoms for this body part
  svgPath: string;        // SVG path definition for the clickable region
}
```

### Example Body Part Definition

```typescript
{
  id: 'head',
  name: 'Head',
  area: 'Head and Neck',
  symptoms: [
    'Headache',
    'Migraine',
    'Dizziness',
    'Hearing loss',
    'Vision problems',
    'Sinus congestion'
  ],
  svgPath: 'M150,70 a40,40 0 1,0 0.1,0 Z'  // SVG circle path for the head
}
```

## Interactive Features

The body map includes several interactive features:

1. **Hover Highlighting** - Body parts highlight when the mouse hovers over them
2. **Selection State** - Clicked body parts remain highlighted to show selection
3. **Dynamic Symptom List** - The symptoms panel updates based on the selected body part
4. **Search Integration** - Selecting a symptom initiates a search with the body part and symptom

## Component Props

The `BodyMapSearch` component accepts two callback props:

```typescript
interface BodyMapSearchProps {
  onBodyPartSelect: (bodyPart: BodyPart) => void;
  onSymptomSelect?: (symptom: string, bodyPart: BodyPart) => void;
}
```

- **`onBodyPartSelect`** - Called when a body part is clicked
- **`onSymptomSelect`** - Called when a symptom is selected (optional)

## SVG Structure

The body map uses SVG for rendering the human figure:

1. **Base Outlines** - Simple paths that show the general human figure
2. **Clickable Regions** - Overlaid transparent paths that respond to user interaction
3. **Visual Feedback** - Color changes for hover and selection states

### SVG Interaction Code

```tsx
{bodyParts.map(part => (
  <path
    key={part.id}
    d={part.svgPath}
    fill={selectedBodyPart?.id === part.id ? '#60a5fa' : (hoveredBodyPart === part.id ? '#93c5fd' : 'transparent')}
    stroke={selectedBodyPart?.id === part.id ? '#2563eb' : (hoveredBodyPart === part.id ? '#60a5fa' : '#d1d5db')}
    strokeWidth="2"
    onClick={() => handleBodyPartClick(part)}
    onMouseEnter={() => handleMouseEnter(part.id)}
    onMouseLeave={handleMouseLeave}
    style={{ cursor: 'pointer' }}
    data-body-part={part.id}
    className="transition-colors duration-150"
  />
))}
```

## Integration with Search

When a user selects a body part and then a symptom, the component:

1. Constructs a search query combining the body part name and symptom
2. Triggers the `onSymptomSelect` callback with the symptom and body part
3. The parent component (`AdvancedSearchPage`) uses this to perform a search

```typescript
// Inside AdvancedSearchPage.tsx
const handleSymptomSelect = (symptom: string, bodyPart: any) => {
  const query = `${bodyPart.name} ${symptom}`;
  setSearchQuery(query);
  navigate(`/advanced-search?q=${encodeURIComponent(query)}`);
  performSearch(query);
};
```

## Responsive Design

The body map component is responsive and adapts to different screen sizes:

- On desktop, it displays as a two-column layout
- On mobile, it displays as a single column with the map above the symptoms
- SVG viewBox ensures proper scaling of the diagram

## Customization

To extend the body map with new body parts:

1. Add a new entry to the `bodyParts` array
2. Define an SVG path for the new region
3. List common symptoms for the body part

### Example: Adding a New Body Part

```typescript
// Add a new body part to the bodyParts array
const bodyParts: BodyPart[] = [
  // ... existing parts

  // Add a new body part
  {
    id: 'shoulder',
    name: 'Shoulder',
    area: 'Upper Extremities',
    symptoms: [
      'Shoulder pain',
      'Limited range of motion',
      'Joint instability',
      'Rotator cuff pain',
      'Frozen shoulder'
    ],
    svgPath: 'M110,120 C100,115 90,110 80,120 L90,130 L100,125 Z'  // Example SVG path
  }
];
```

## Usage Example

To use the body map component in another page:

```tsx
import BodyMapSearch from '../features/search/BodyMapSearch';

function SymptomExplorerPage() {
  const handleBodyPartSelect = (bodyPart) => {
    console.log(`Selected body part: ${bodyPart.name}`);
  };

  const handleSymptomSelect = (symptom, bodyPart) => {
    console.log(`Selected symptom: ${symptom} in ${bodyPart.name}`);
    // Implement your search logic here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Symptom Explorer</h1>
      <BodyMapSearch
        onBodyPartSelect={handleBodyPartSelect}
        onSymptomSelect={handleSymptomSelect}
      />
    </div>
  );
}
```
