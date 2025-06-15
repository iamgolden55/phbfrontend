import React, { useState, useEffect, useCallback } from 'react';
import SearchModal from './SearchModal';

interface CompactSearchBarProps {
  isDarkMode?: boolean;
  isProfessionalView?: boolean;
  className?: string;
  isModalOpen?: boolean;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompactSearchBar: React.FC<CompactSearchBarProps> = ({ 
  isDarkMode = false, 
  isProfessionalView = false,
  className = "",
  isModalOpen: externalIsModalOpen,
  setIsModalOpen: externalSetIsModalOpen
}) => {
  const [internalIsModalOpen, setInternalIsModalOpen] = useState(false);
  
  // Use the external state if provided, otherwise use internal state
  const isModalOpen = externalIsModalOpen !== undefined ? externalIsModalOpen : internalIsModalOpen;
  const setIsModalOpen = externalSetIsModalOpen || setInternalIsModalOpen;

  // Keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsModalOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSearchClick = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    // Prevent any default behavior and stop propagation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Ensure modal is opened with a slight delay for mobile
    setTimeout(() => setIsModalOpen(true), 10);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Compact Search Trigger */}
      <div className={className}>
        <button
          className="inline-flex items-center justify-center cursor-pointer transition-all duration-200 ease-out"
          onClick={handleSearchClick}
          onTouchEnd={handleSearchClick}
          aria-label="Search"
          title="Search (⌘K)"
          style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }}
        >
          {/* Search Icon */}
          <div className="flex items-center justify-center">
            <svg 
              className={`w-6 h-6 transition-colors duration-200 ${
                isDarkMode ? 'text-black-400 hover:text-black-300' : 'text-black-500 hover:text-black-700'
              } ${isProfessionalView ? 'text-white/70 hover:text-white' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <span className={`ml-1 text-xs font-medium opacity-75 ${
            isDarkMode ? 'text-black-400' : 'text-black-500'
          } ${isProfessionalView ? 'text-white/60' : ''}`}>
            ⌘K
          </span>
        </button>
      </div>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isDarkMode={isDarkMode}
        isProfessionalView={isProfessionalView}
      />
    </>
  );
};

export default CompactSearchBar;