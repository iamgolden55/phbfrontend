import React, { useState, useRef, useEffect } from 'react';
import { getMedicalTermDefinition, MedicalTermDefinition } from './medicalDictionary';

interface MedicalTermTooltipProps {
  children: React.ReactNode;
  term: string;
}

const MedicalTermTooltip: React.FC<MedicalTermTooltipProps> = ({ children, term }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [definition, setDefinition] = useState<MedicalTermDefinition | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  // Load the definition on mount
  useEffect(() => {
    const termDefinition = getMedicalTermDefinition(term);
    setDefinition(termDefinition);
  }, [term]);

  // Update tooltip position based on the wrapper element position
  useEffect(() => {
    if (isHovering && wrapperRef.current && tooltipRef.current) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      // Adjust position based on available screen space
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      // Default is to show above the term
      let top = wrapperRect.top - tooltipRect.height - 10;
      let left = wrapperRect.left + (wrapperRect.width / 2) - (tooltipRect.width / 2);

      // If tooltip would go above the viewport, show it below the term
      if (top < 0) {
        top = wrapperRect.bottom + 10;
      }

      // If tooltip would go off the left edge, adjust left position
      if (left < 0) {
        left = 0;
      }

      // If tooltip would go off the right edge, adjust left position
      if (left + tooltipRect.width > windowWidth) {
        left = windowWidth - tooltipRect.width;
      }

      setTooltipPosition({ top, left });
    }
  }, [isHovering]);

  // Handle hovering events
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Color based on category
  const getCategoryColor = () => {
    if (!definition) return 'bg-blue-200';

    switch (definition.category) {
      case 'condition':
        return 'bg-red-200';
      case 'symptom':
        return 'bg-amber-200';
      case 'procedure':
        return 'bg-green-200';
      case 'medication':
        return 'bg-purple-200';
      case 'anatomy':
        return 'bg-cyan-200';
      case 'general':
      default:
        return 'bg-blue-200';
    }
  };

  // Only render tooltip if we have a definition
  if (!definition) {
    return <>{children}</>;
  }

  return (
    <span
      ref={wrapperRef}
      className="relative inline underline decoration-dotted decoration-2 underline-offset-2 cursor-help"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {isHovering && (
        <div
          ref={tooltipRef}
          className="fixed z-50 w-72 p-3 rounded-lg shadow-lg bg-white border border-gray-200"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor()}`}>
              {definition.category}
            </span>
            <h3 className="font-bold text-gray-900">{definition.term}</h3>
          </div>

          <p className="text-sm text-gray-700 mb-2">{definition.definition}</p>

          {definition.relatedTerms && definition.relatedTerms.length > 0 && (
            <div className="text-xs">
              <span className="text-gray-500">Related:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {definition.relatedTerms.map((relatedTerm, index) => (
                  <span key={index} className="bg-gray-100 px-2 py-0.5 rounded">
                    {relatedTerm}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </span>
  );
};

export default MedicalTermTooltip;
