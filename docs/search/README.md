# Advanced Search System Documentation

This documentation explains the advanced search features implemented in the PHB website, including the smart search, symptom checker, body map interface, and medical term definitions.

## Table of Contents

1. [Overview](#overview)
2. [Main Components](#main-components)
3. [Feature-Specific Documentation](#feature-specific-documentation)
4. [Integration with Existing System](#integration-with-existing-system)
5. [Adding New Features](#adding-new-features)

## Overview

The advanced search system is a comprehensive health information search solution with four key features:

1. **Smart Text Search** - Searches that understand natural language, spelling variations, and symptom descriptions
2. **Body Map Interface** - A visual interface for selecting body parts and related symptoms
3. **Symptom Checker** - An interactive questionnaire that helps identify possible health conditions
4. **Medical Term Definitions** - Hover-based tooltips that provide definitions for medical terms

These features are integrated into a single Advanced Search Page that allows users to switch between different search methods.

## Main Components

The advanced search system is organized in the `src/features/search` directory and includes:

- **AdvancedSearchPage.tsx** - The main page that integrates all search features
- **BodyMapSearch.tsx** - The interactive body map component
- **SymptomChecker.tsx** - The step-by-step symptom checker
- **MedicalTermTooltip.tsx** - Component for displaying term definitions
- **MedicalTermHighlighter.tsx** - Utility that finds and highlights medical terms in text
- **DidYouMean.tsx** - Component for suggesting alternatives for ambiguous queries
- **medicalDictionary.ts** - Database of medical terms and their definitions

## Feature-Specific Documentation

Each feature has its own detailed documentation:

- [Smart Search System](./smart-search.md) - How the natural language understanding works
- [Medical Terminology System](./medical-terms.md) - How the term highlighting and tooltips work
- [Body Map Interface](./body-map.md) - How the visual search interface works
- [Symptom Checker](./symptom-checker.md) - How the symptom checker algorithm works
- [Did You Mean Feature](./did-you-mean.md) - How ambiguous query handling works

## Integration with Existing System

The advanced search system is integrated with the existing PHB website through:

1. Route definitions in `App.tsx`
2. Links from the standard search page (`SearchPage.tsx`)
3. Shared search utilities in `utils/searchService.ts`

## Adding New Features

To extend the advanced search system:

1. For new medical terms, add entries to `medicalDictionary.ts`
2. For new symptoms, update the `symptoms` array in `SymptomChecker.tsx`
3. For new body regions, update the `bodyParts` array in `BodyMapSearch.tsx`
4. For new ambiguous term mappings, update `ambiguousMappings` in `DidYouMean.tsx`

See individual feature documentation for detailed information on making specific modifications.
