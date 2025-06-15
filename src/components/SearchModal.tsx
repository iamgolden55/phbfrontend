import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchContent, getSearchSuggestions } from '../utils/searchService';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
  isProfessionalView?: boolean;
}

interface SearchResult {
  title: string;
  description: string;
  url: string;
  category: string;
  concepts?: string[];
  symptoms?: string[];
}

const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen, 
  onClose, 
  isDarkMode = false, 
  isProfessionalView = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
      document.body.style.overflow = 'hidden';
    } else {
      setSearchTerm('');
      setResults([]);
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim().length >= 2) {
        setIsLoading(true);
        try {
          const resultsData = await searchContent(searchTerm);
          setResults(resultsData);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim().length >= 2) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      onClose();
    }
  };

  const handleResultClick = (url: string) => {
    navigate(url);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalBg = isDarkMode 
    ? 'bg-gray-900/95 border-gray-700/50' 
    : 'bg-white/95 border-gray-200/30';
  
  const inputBg = isDarkMode 
    ? 'bg-gray-800/90 border-gray-600/50' 
    : 'bg-gray-50/80 border-gray-300/50';
  
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const placeholderColor = isDarkMode ? 'placeholder-white/50' : 'placeholder-gray-400';

  if (!isOpen) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl mx-4 mt-8 md:mt-16 max-h-[90vh] overflow-hidden">
        <div className={`rounded-3xl shadow-2xl backdrop-blur-xl border overflow-hidden ${modalBg} ${isProfessionalView ? 'bg-blue-900/95 border-blue-700/50' : ''}`}>
          
          {/* Header */}
          <div className="p-6 border-b border-gray-200/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-2xl font-bold ${textColor} ${isProfessionalView ? 'text-white' : ''}`}>
                Search PHB
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSubmit}>
              <div className={`relative flex items-center rounded-2xl border-2 focus-within:border-blue-500/50 ${inputBg} ${isProfessionalView ? 'bg-blue-800/50 border-blue-600/50' : ''}`}>
                <div className="absolute left-5">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>

                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for health information..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className={`w-full pl-14 pr-14 py-5 rounded-2xl bg-transparent border-none outline-none text-lg font-medium ${textColor} ${placeholderColor} ${isProfessionalView ? 'text-white placeholder-white/50' : ''}`}
                  autoComplete="off"
                />

                <div className="absolute right-5">
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
                  ) : searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {results.length > 0 && searchTerm.length >= 2 && (
              <div className="p-6">
                <h3 className={`text-lg font-semibold mb-4 ${textColor} ${isProfessionalView ? 'text-white' : ''}`}>
                  Results ({results.length})
                </h3>
                <div className="space-y-4">
                  {results.slice(0, 8).map((result, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
                      onClick={() => handleResultClick(result.url)}
                    >
                      <div className="flex items-start">
                        <div className="flex-1">
                          <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                            {result.category}
                          </span>
                          <h4 className={`font-bold text-lg mb-2 ${textColor} ${isProfessionalView ? 'text-white' : ''}`}>
                            {result.title}
                          </h4>
                          <p className={`text-base mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} ${isProfessionalView ? 'text-white/80' : ''}`}>
                            {result.description}
                          </p>
                        </div>
                        <svg className="w-6 h-6 text-gray-400 mt-2 ml-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {searchTerm.length >= 2 && !isLoading && results.length === 0 && (
              <div className="p-12 text-center">
                <svg className="w-16 h-16 mx-auto mb-6 opacity-50 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <h3 className={`text-xl font-semibold mb-3 ${textColor} ${isProfessionalView ? 'text-white' : ''}`}>
                  No results found for "{searchTerm}"
                </h3>
                <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ${isProfessionalView ? 'text-white/70' : ''}`}>
                  Try different keywords or check spelling
                </p>
              </div>
            )}

            {/* Empty State */}
            {searchTerm.trim() === '' && (
              <div className="p-12 text-center">
                <svg className="w-16 h-16 mx-auto mb-6 opacity-50 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <h3 className={`text-xl font-semibold mb-3 ${textColor} ${isProfessionalView ? 'text-white' : ''}`}>
                  Search PHB Health Information
                </h3>
                <p className={`text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ${isProfessionalView ? 'text-white/70' : ''}`}>
                  Find health information, services, conditions, and more
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;