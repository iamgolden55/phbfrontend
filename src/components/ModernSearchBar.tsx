import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchContent, getSearchSuggestions } from '../utils/searchService';
import { 
  getSearchHistory, 
  addToSearchHistory, 
  clearSearchHistory, 
  removeFromSearchHistory,
  SearchHistoryItem 
} from '../utils/searchHistoryService';
import { useClickOutside } from '../hooks/useClickOutside';

interface ModernSearchBarProps {
  isDarkMode?: boolean;
  isProfessionalView?: boolean;
  className?: string;
}

interface SearchResult {
  title: string;
  description: string;
  url: string;
  category: string;
  concepts?: string[];
  symptoms?: string[];
}

const ModernSearchBar: React.FC<ModernSearchBarProps> = ({ 
  isDarkMode = false, 
  isProfessionalView = false,
  className = "" 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useClickOutside(searchRef, () => {
    setShowDropdown(false);
    if (searchTerm.trim() === '') {
      setIsExpanded(false);
    }
  });

  // Load search history on mount
  useEffect(() => {
    const history = getSearchHistory();
    setSearchHistory(history);
  }, []);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.trim().length >= 2) {
        setIsLoading(true);
        try {
          const [suggestionsData, resultsData] = await Promise.all([
            getSearchSuggestions(searchTerm),
            searchContent(searchTerm)
          ]);
          
          setSuggestions(suggestionsData);
          setResults(resultsData);
          setShowDropdown(true);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setResults([]);
        if (searchTerm.trim() === '') {
          setShowDropdown(searchHistory.length > 0);
        }
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchHistory.length]);

  const handleFocus = () => {
    setIsExpanded(true);
    if (searchTerm.trim() === '' && searchHistory.length > 0) {
      setShowDropdown(true);
    } else if (searchTerm.trim().length >= 2) {
      setShowDropdown(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setHighlightedIndex(-1);
    
    if (value.trim() !== '') {
      setShowDropdown(true);
    } else {
      setShowDropdown(searchHistory.length > 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim().length >= 2) {
      performSearch(searchTerm);
    }
  };

  const performSearch = (term: string) => {
    const newHistory = addToSearchHistory(term);
    setSearchHistory(newHistory);
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setShowDropdown(false);
    setIsExpanded(false);
    inputRef.current?.blur();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    performSearch(suggestion);
  };

  const handleResultClick = (url: string) => {
    navigate(url);
    setShowDropdown(false);
    setIsExpanded(false);
  };

  const handleHistoryClick = (term: string) => {
    setSearchTerm(term);
    performSearch(term);
  };

  const handleClearHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  const handleRemoveHistoryItem = (term: string) => {
    const newHistory = removeFromSearchHistory(term);
    setSearchHistory(newHistory);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalItems = suggestions.length + results.length + searchHistory.length;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev < totalItems - 1 ? prev + 1 : -1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev > -1 ? prev - 1 : totalItems - 1));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      // Handle selection based on highlighted index
      if (highlightedIndex < suggestions.length) {
        handleSuggestionClick(suggestions[highlightedIndex]);
      } else if (highlightedIndex < suggestions.length + results.length) {
        const resultIndex = highlightedIndex - suggestions.length;
        handleResultClick(results[resultIndex].url);
      } else {
        const historyIndex = highlightedIndex - suggestions.length - results.length;
        handleHistoryClick(searchHistory[historyIndex].term);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div 
      ref={searchRef}
      className={`relative transition-all duration-500 ease-out ${
        isExpanded ? 'w-full max-w-2xl' : 'w-full max-w-md'
      } ${className}`}
    >
      {/* Main Search Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div className={`
          relative flex items-center rounded-xl transition-all duration-300 ease-out
          ${isDarkMode 
            ? 'bg-gray-800/90 border-gray-700/50 text-white' 
            : 'bg-white/95 border-gray-200/50 text-gray-900'
          }
          ${isExpanded 
            ? 'shadow-2xl border-2 border-blue-500/30 backdrop-blur-xl' 
            : 'shadow-lg border backdrop-blur-md hover:shadow-xl'
          }
          ${isProfessionalView ? 'border-white/20 bg-white/10' : ''}
        `}>
          {/* Search Icon */}
          <div className="absolute left-4 flex items-center pointer-events-none">
            <svg 
              className={`w-5 h-5 transition-colors duration-200 ${
                isExpanded 
                  ? 'text-blue-500' 
                  : isDarkMode ? 'text-gray-400' : 'text-gray-500'
              } ${isProfessionalView ? 'text-white/70' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Search PHB..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            className={`
              w-full pl-12 pr-12 py-4 rounded-xl bg-transparent border-none outline-none
              placeholder-gray-400 text-base font-medium
              ${isProfessionalView ? 'placeholder-white/50 text-white' : ''}
            `}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
          />

          {/* Loading Spinner / Clear Button */}
          <div className="absolute right-4 flex items-center">
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
            ) : searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setShowDropdown(searchHistory.length > 0);
                  inputRef.current?.focus();
                }}
                className={`
                  p-1 rounded-full transition-colors duration-200
                  ${isDarkMode 
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                  }
                  ${isProfessionalView ? 'text-white/50 hover:text-white hover:bg-white/10' : ''}
                `}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Modern Dropdown */}
      {showDropdown && (
        <div className={`
          absolute top-full left-0 right-0 mt-2 z-50
          ${isDarkMode 
            ? 'bg-gray-800/95 border-gray-700/50' 
            : 'bg-white/95 border-gray-200/30'
          }
          rounded-xl shadow-2xl backdrop-blur-xl border
          max-h-[70vh] overflow-hidden
        `}>
          
          {/* Search History Section */}
          {searchTerm.trim() === '' && searchHistory.length > 0 && (
            <div className="border-b border-gray-200/20">
              <div className="flex items-center justify-between px-6 py-3">
                <h4 className={`text-sm font-semibold ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Recent Searches
                </h4>
                <button
                  onClick={handleClearHistory}
                  className={`text-xs font-medium transition-colors duration-200 ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Clear All
                </button>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {searchHistory.map((item, index) => (
                  <div
                    key={index}
                    className={`
                      flex items-center justify-between px-6 py-3 cursor-pointer transition-all duration-200
                      ${highlightedIndex === suggestions.length + results.length + index
                        ? 'bg-blue-50 dark:bg-blue-900/30'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }
                    `}
                    onClick={() => handleHistoryClick(item.term)}
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <svg className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      <span className={`font-medium truncate ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.term}
                      </span>
                      <span className={`text-xs ml-2 flex-shrink-0 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {formatDate(item.timestamp)}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveHistoryItem(item.term);
                      }}
                      className={`
                        p-1 rounded-full transition-colors duration-200 ml-2
                        ${isDarkMode 
                          ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-600' 
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                        }
                      `}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions Section */}
          {suggestions.length > 0 && searchTerm.length >= 2 && (
            <div className="border-b border-gray-200/20">
              <div className="px-6 py-3">
                <h4 className={`text-sm font-semibold ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Suggestions
                </h4>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`
                      flex items-center px-6 py-3 cursor-pointer transition-all duration-200
                      ${highlightedIndex === index
                        ? 'bg-blue-50 dark:bg-blue-900/30'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }
                    `}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <svg className="w-4 h-4 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <span className={`font-medium ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {suggestion}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results Section */}
          {results.length > 0 && searchTerm.length >= 2 && (
            <div>
              <div className="px-6 py-3">
                <h4 className={`text-sm font-semibold ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Results ({results.length})
                </h4>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {results.slice(0, 5).map((result, index) => (
                  <div
                    key={index}
                    className={`
                      px-6 py-4 cursor-pointer transition-all duration-200 border-b border-gray-200/10 last:border-b-0
                      ${highlightedIndex === suggestions.length + index
                        ? 'bg-blue-50 dark:bg-blue-900/30'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }
                    `}
                    onClick={() => handleResultClick(result.url)}
                  >
                    <div className="flex items-start">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-2">
                          <span className={`
                            inline-block text-xs font-semibold px-2 py-1 rounded-full mr-2
                            ${isDarkMode 
                              ? 'bg-blue-900/50 text-blue-300' 
                              : 'bg-blue-100 text-blue-700'
                            }
                          `}>
                            {result.category}
                          </span>
                        </div>
                        <h5 className={`font-semibold text-base mb-1 ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {result.title}
                        </h5>
                        <p className={`text-sm line-clamp-2 ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {result.description}
                        </p>
                        
                        {/* Tags */}
                        {(result.concepts || result.symptoms) && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {result.concepts?.slice(0, 3).map((concept, i) => (
                              <span
                                key={i}
                                className={`text-xs px-2 py-1 rounded-full ${
                                  isDarkMode 
                                    ? 'bg-gray-700 text-gray-300' 
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {concept}
                              </span>
                            ))}
                            {result.symptoms?.slice(0, 2).map((symptom, i) => (
                              <span
                                key={i}
                                className={`text-xs px-2 py-1 rounded-full ${
                                  isDarkMode 
                                    ? 'bg-red-900/50 text-red-300' 
                                    : 'bg-red-50 text-red-600'
                                }`}
                              >
                                {symptom}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <svg className="w-5 h-5 text-gray-400 mt-1 ml-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* View All Results Footer */}
              <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-2xl">
                <button
                  onClick={() => performSearch(searchTerm)}
                  className={`
                    w-full text-center font-semibold py-2 px-4 rounded-xl transition-all duration-200
                    ${isDarkMode 
                      ? 'text-blue-400 hover:bg-blue-900/30' 
                      : 'text-blue-600 hover:bg-blue-50'
                    }
                  `}
                >
                  View all {results.length} results →
                </button>
              </div>
            </div>
          )}

          {/* No Results Message */}
          {searchTerm.length >= 2 && !isLoading && suggestions.length === 0 && results.length === 0 && (
            <div className="px-6 py-8 text-center">
              <div className={`text-gray-400 mb-2`}>
                <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <p className={`font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                No results found for "{searchTerm}"
              </p>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Try different keywords or check spelling
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModernSearchBar;