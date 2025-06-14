import React, { useState, useEffect } from 'react';
import SearchModal from './SearchModal';

interface CompactSearchBarProps {
  isDarkMode?: boolean;
  isProfessionalView?: boolean;
  className?: string;
}

const CompactSearchBar: React.FC<CompactSearchBarProps> = ({ 
  isDarkMode = false, 
  isProfessionalView = false,
  className = "" 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Compact Search Trigger */}
      <div 
        className={`${className} cursor-pointer`}
        onClick={handleSearchClick}
      >
        <div className={`
          relative flex items-center rounded-2xl transition-all duration-300 ease-out group
          ${isDarkMode 
            ? 'bg-gray-800/70 border-gray-700/50 text-white hover:bg-gray-800/90' 
            : 'bg-gray-100/80 border-gray-200/50 text-gray-900 hover:bg-gray-100'
          }
          ${isProfessionalView 
            ? 'bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm' 
            : ''
          }
          border hover:shadow-lg hover:scale-[1.02] px-4 py-3
        `}>
          {/* Search Icon */}
          <div className="flex items-center">
            <svg 
              className={`w-5 h-5 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-700'
              } ${isProfessionalView ? 'text-white/70 group-hover:text-white' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>

          {/* Search Text */}
          <span className={`ml-3 text-sm font-medium transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-700'
          } ${isProfessionalView ? 'text-white/70 group-hover:text-white' : ''}`}>
            Search PHB...
          </span>

          {/* Keyboard Shortcut Hint */}
          <div className={`ml-auto flex items-center text-xs font-medium ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          } ${isProfessionalView ? 'text-white/50' : ''}`}>
            <kbd className={`px-2 py-1 rounded ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'
            } ${isProfessionalView ? 'bg-white/10' : ''}`}>
              ⌘K
            </kbd>
          </div>
        </div>
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