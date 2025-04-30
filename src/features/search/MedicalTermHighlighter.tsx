import React from 'react';
import { findMedicalTermsInText } from './medicalDictionary';
import MedicalTermTooltip from './MedicalTermTooltip';

interface MedicalTermHighlighterProps {
  text: string;
  className?: string;
}

/**
 * Component that automatically finds and highlights medical terms in text
 * with tooltip definitions
 */
const MedicalTermHighlighter: React.FC<MedicalTermHighlighterProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Find all medical terms in the text
  const terms = findMedicalTermsInText(text);

  // If no terms found, just return the original text
  if (terms.length === 0) {
    return <p className={className}>{text}</p>;
  }

  // Sort terms by length (descending) to avoid issues with overlapping terms
  // For example, if we have "headache" and "head", we want to match "headache" first
  const sortedTerms = [...terms].sort((a, b) => b.length - a.length);

  // Create a regular expression to match any of the medical terms
  // Use word boundaries to ensure we match whole words
  const termRegex = new RegExp(`\\b(${sortedTerms.join('|')})\\b`, 'gi');

  // Split the text into parts: normal text and medical terms
  const parts = [];
  let lastIndex = 0;
  let match;
  let count = 0;

  // Regular expression .exec() is stateful, it returns matches one by one
  while ((match = termRegex.exec(text)) !== null) {
    // Add the text before this match
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: text.substring(lastIndex, match.index),
        key: `text-${count++}`
      });
    }

    // Add the matched term
    parts.push({
      type: 'term',
      content: match[0],
      term: match[0].toLowerCase(),
      key: `term-${count++}`
    });

    lastIndex = match.index + match[0].length;
  }

  // Add any remaining text
  if (lastIndex < text.length) {
    parts.push({
      type: 'text',
      content: text.substring(lastIndex),
      key: `text-${count++}`
    });
  }

  // Render the parts
  return (
    <p className={className}>
      {parts.map(part => {
        if (part.type === 'term') {
          return (
            <MedicalTermTooltip key={part.key} term={part.term}>
              {part.content}
            </MedicalTermTooltip>
          );
        } else {
          return <React.Fragment key={part.key}>{part.content}</React.Fragment>;
        }
      })}
    </p>
  );
};

export default MedicalTermHighlighter;
