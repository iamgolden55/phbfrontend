import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PHBLogo from './PHBLogo';
import { useAuth } from '../features/auth/authContext';
import { useProfessionalAuth } from '../features/professional/professionalAuthContext';
import SearchResults from './SearchResults';
import { searchContent, getSearchSuggestions } from '../utils/searchService';
import { useClickOutside } from '../hooks/useClickOutside';
import ViewToggle from './ViewToggle';
import {
  getSearchHistory,
  addToSearchHistory,
  clearSearchHistory,
  removeFromSearchHistory,
  SearchHistoryItem
} from '../utils/searchHistoryService';

// Create a custom hook for dark mode
const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Only use saved theme preference, default to light, ignore system preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return { isDarkMode, toggleDarkMode };
};

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [pasteAnimation, setPasteAnimation] = useState(false);
  const { user, isAuthenticated, logout, isDoctor } = useAuth();
  const { professionalUser } = useProfessionalAuth();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();

  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchResultsRef = useRef<HTMLDivElement>(null);

  // Check if we're in professional view
  const isProfessionalView = location.pathname.includes('/professional');

  // Close search results when clicking outside
  useClickOutside(searchRef, (event) => {
    // Don't close if clicking inside the mobile search results
    if (mobileSearchResultsRef.current && mobileSearchResultsRef.current.contains(event.target as Node)) {
      return;
    }

    setShowSearchBox(false);
    if (searchTerm.trim() === '') {
      setIsSearchExpanded(false); // Collapse search if it's empty when clicking outside
    }
  });

  // Check if the cookie consent has been saved previously
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookie-consent');
    if (cookieConsent) {
      setShowCookieBanner(false);
    }
  }, []);

  // Load search history when component mounts
  useEffect(() => {
    try {
      const history = getSearchHistory();
      setSearchHistory(history);
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  }, []);

  // Perform live search whenever searchTerm changes
  useEffect(() => {
    const performLiveSearch = async () => {
      if (searchTerm.trim().length >= 2) {
        setIsSearching(true);
        try {
          // Get both suggestions and results at the same time
          const [suggestionsData, resultsData] = await Promise.all([
            getSearchSuggestions(searchTerm),
            searchContent(searchTerm)
          ]);

          setSuggestions(suggestionsData);
          setSearchResults(resultsData);

          // If there are results, show the search box
          if (resultsData.length > 0 || suggestionsData.length > 0) {
            setShowSearchBox(true);
          }
        } catch (error) {
          console.error('Error during live search:', error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions([]);
        setSearchResults([]);
      }
    };

    // Use a short debounce to avoid too many requests
    const timeoutId = setTimeout(performLiveSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Force search expansion after the component mounts
  useEffect(() => {
    // Add a small delay to ensure the focus transition is visible
    const timer = setTimeout(() => {
      if (searchInputRef.current === document.activeElement) {
        setIsSearchExpanded(true);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Always show search box when typing and there's content
    if (value.trim() !== '') {
      setShowSearchBox(true);
    } else {
      // Hide search box when input is empty
      setShowSearchBox(false);
    }
  };

  // Add a paste handler for mobile devices
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text');
    setSearchTerm(pastedText);

    // Show search box when pasting content
    if (pastedText.trim() !== '') {
      setShowSearchBox(true);

      // Add visual feedback for paste event
      setPasteAnimation(true);
      setTimeout(() => {
        setPasteAnimation(false);
      }, 800);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim().length >= 2) {
      // Add to search history
      const newHistory = addToSearchHistory(searchTerm);
      setSearchHistory(newHistory);

      // If we submit the form, navigate to the search page
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowSearchBox(false);
    }
  };

  // Handle clicking on a search history item
  const handleHistoryItemClick = (term: string) => {
    setSearchTerm(term);

    // Trigger search with the selected history term
    const performSearch = async () => {
      setIsSearching(true);
      try {
        // Add to search history again to make it the most recent
        const newHistory = addToSearchHistory(term);
        setSearchHistory(newHistory);

        // Reset filter to see all results
        setActiveFilter('all');

        // Perform the search
        const results = await searchContent(term);
        setSearchResults(results);
        setShowSearchBox(true);
      } catch (error) {
        console.error('Error searching with history item:', error);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  };

  // Handle clearing all search history
  const handleClearHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  // Handle removing a single history item
  const handleRemoveHistoryItem = (term: string) => {
    const newHistory = removeFromSearchHistory(term);
    setSearchHistory(newHistory);
  };

  // Handle filter changes
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSearchClick = () => {
    setShowSearchBox(true);
    setIsSearchExpanded(true); // Expand the search bar
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const handleSearchFocus = () => {
    setShowSearchBox(true);
    setIsSearchExpanded(true);

    // If there's already a search term, trigger search on focus
    if (searchTerm.trim().length >= 2) {
      const performSearch = async () => {
        try {
          const results = await searchContent(searchTerm);
          setSearchResults(results);
        } catch (error) {
          console.error('Error searching on focus:', error);
        }
      };

      performSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    // Perform search with the suggestion
    const performSearch = async () => {
      try {
        setIsSearching(true);
        const results = await searchContent(suggestion);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching with suggestion:', error);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  };

  const handleResultClick = (url: string) => {
    // Navigate to the result URL and close the search
    navigate(url);
    setShowSearchBox(false);
    if (searchTerm.trim() === '') {
      setIsSearchExpanded(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleCookieConsent = (consent: boolean) => {
    // Save the user's cookie preference
    localStorage.setItem('cookie-consent', consent ? 'accepted' : 'declined');
    setShowCookieBanner(false);
  };

  // Navigation items - Regular view
  const regularNavItems = [
    { name: 'Health A-Z', path: '/health-a-z' },
    { name: 'Live Well', path: '/live-well' },
    { name: 'Mental health', path: '/mental-health' },
    { name: 'Care and support', path: '/care-and-support' },
    { name: 'Pregnancy', path: '/pregnancy' },
    { name: 'Programs', path: '/programs' },
  ];

  // Navigation items - Professional view
  const professionalNavItems = [
    { name: 'Dashboard', path: '/professional/dashboard' },
    { name: 'Appointments', path: '/professional/appointments' },
    { name: 'Patients', path: '/professional/patients' },
    { name: 'Calculators', path: '/professional/calculators' },
    { name: 'Resources', path: '/professional/resources' },
  ];

  // Use the appropriate nav items based on current view
  const navItems = isProfessionalView ? professionalNavItems : regularNavItems;

  return (
    <header className={`sticky top-0 z-40 w-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Cookie banner - similar to NHS */}
      {showCookieBanner && (
        <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} p-4 border-b border-gray-700/10`}>
          <div className="phb-container">
            <h2 className="text-lg font-bold mb-2">Cookies on the PHB website</h2>
            <p className="mb-2">We've put some small files called cookies on your device to make our site work.</p>
            <p className="mb-2">
              We'd also like to use analytics cookies. These collect feedback and send information about how our site is
              used to services called Adobe Analytics, Adobe Target, Qualtrics Feedback and Google Analytics. We use this
              information to improve our site.
            </p>
            <p className="mb-4">
              Let us know if this is OK. We'll use a cookie to save your choice. You can{' '}
              <a href="#" className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} underline hover:text-blue-800`}>read more about our cookies</a>{' '}
              before you choose.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
                onClick={() => handleCookieConsent(true)}
              >
                I'm OK with analytics cookies
              </button>
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
                onClick={() => handleCookieConsent(false)}
              >
                Do not use analytics cookies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main header */}
      <div className={`border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} shadow-sm ${isProfessionalView ? 'bg-blue-900' : ''}`}>
        <div className="phb-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to={isProfessionalView ? "/professional/dashboard" : "/"} className="flex items-center">
                <PHBLogo className={isProfessionalView ? "text-white" : ""} />
                {isProfessionalView && (
                  <span className="ml-2 font-bold text-white text-lg">Professional</span>
                )}
              </Link>
            </div>

            {/* Expandable Search bar - desktop only */}
            <div
              ref={searchRef}
              className={`hidden md:flex flex-1 relative items-center mx-8 transition-all duration-500 ease-in-out ${
                isSearchExpanded ? 'max-w-3xl' : 'max-w-xs'
              }`}
              onClick={handleSearchClick}
            >
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search PHB"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onPaste={handlePaste}
                  onFocus={handleSearchFocus}
                  className={`w-full pl-10 pr-4 py-2 ${
                    isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-100 text-gray-900 border-gray-300'
                  } rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out ${
                    isSearchExpanded ? 'shadow-lg' : ''
                  } ${pasteAnimation ? 'animate-pulse bg-blue-50' : ''}`}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </div>

                {/* Clear search button - only show when there's text */}
                {searchTerm.trim() !== '' && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchTerm('');
                      searchInputRef.current?.focus();
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500 hover:text-gray-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </form>

              {/* Search results and suggestions */}
              {showSearchBox && (
                <div className="absolute top-full left-0 right-0 mt-1 z-50">
                  {/* Show suggestions if there are any and we're not showing results yet */}
                  {suggestions.length > 0 && searchResults.length === 0 && !isSearching && (
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                      <ul className="divide-y divide-gray-100">
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                              </svg>
                              <span>{suggestion}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Show search results if available */}
                  {(searchResults.length > 0 || isSearching || (searchTerm.length >= 2 && !suggestions.length)) && (
                    <SearchResults
                      results={searchResults}
                      isLoading={isSearching}
                      searchTerm={searchTerm}
                      onClose={() => setShowSearchBox(false)}
                      onResultClick={handleResultClick}
                      searchHistory={searchHistory}
                      onHistoryItemClick={handleHistoryItemClick}
                      onClearHistory={handleClearHistory}
                      onRemoveHistoryItem={handleRemoveHistoryItem}
                      activeFilter={activeFilter}
                      onFilterChange={handleFilterChange}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Navigation menu - desktop only */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`text-sm font-medium hover:text-blue-300 transition-colors ${
                    isProfessionalView 
                      ? 'text-white'
                      : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center space-x-4">
              {/* Search button - mobile only */}
              <button
                className={`md:hidden ${
                  isProfessionalView 
                    ? 'text-white hover:text-blue-200' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                } transition-colors`}
                onClick={handleSearchClick}
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>

              {/* View Toggle for Doctors */}
              {isAuthenticated && isDoctor && <ViewToggle />}

              {/* Login/Account button */}
              {isAuthenticated ? (
                <Link
                  to={isProfessionalView ? "/professional/profile" : "/account"}
                  className={`${
                    isProfessionalView 
                      ? 'bg-white text-blue-900 hover:bg-blue-100' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  } px-4 py-2 rounded-md transition-colors text-sm font-medium`}
                >
                  {isProfessionalView ? 'Profile' : 'Account'}
                </Link>
              ) : (
                <Link
                  to={isProfessionalView ? "/professional/login" : "/login"}
                  className={`${
                    isProfessionalView 
                      ? 'bg-white text-blue-900 hover:bg-blue-100' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  } px-4 py-2 rounded-md transition-colors text-sm font-medium`}
                >
                  Login
                </Link>
              )}

              {/* Mobile menu button - tablet/mobile only */}
              <button
                className={`lg:hidden ${
                  isProfessionalView 
                    ? 'text-white hover:text-blue-200'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                } transition-colors`}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                aria-label={showMobileMenu ? 'Close menu' : 'Open menu'}
              >
                {showMobileMenu ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search box */}
      {showSearchBox && (
        <div className="md:hidden p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search PHB"
              value={searchTerm}
              onChange={handleSearchChange}
              onPaste={handlePaste}
              className={`w-full pl-10 pr-4 py-2 ${isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-100 text-gray-900 border-gray-300'} rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${pasteAnimation ? 'animate-pulse bg-blue-50' : ''}`}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              autoFocus
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>

            {/* Mobile clear/close buttons */}
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center space-x-2">
              {searchTerm.trim() !== '' && (
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setSearchTerm('')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 ml-2"
                onClick={() => setShowSearchBox(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </form>

          {/* Mobile search suggestions */}
          {suggestions.length > 0 && searchResults.length === 0 && !isSearching && (
            <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                      </svg>
                      <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>{suggestion}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Mobile search results - with pointer events explicitly enabled */}
          {(searchResults.length > 0 || isSearching || (searchTerm.length >= 2 && !suggestions.length)) && (
            <div className="mt-2" ref={mobileSearchResultsRef}>
              <div className="pointer-events-auto">
                <SearchResults
                  results={searchResults}
                  isLoading={isSearching}
                  searchTerm={searchTerm}
                  onClose={() => setShowSearchBox(false)}
                  onResultClick={handleResultClick}
                  searchHistory={searchHistory}
                  onHistoryItemClick={handleHistoryItemClick}
                  onClearHistory={handleClearHistory}
                  onRemoveHistoryItem={handleRemoveHistoryItem}
                  activeFilter={activeFilter}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className={`lg:hidden border-b ${
          isProfessionalView 
            ? 'border-blue-800 bg-blue-900 text-white'
            : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
        }`}>
          <div className="phb-container py-4">
            <nav>
              <ul className="space-y-4">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className={`block py-2 text-base font-medium hover:text-blue-300 transition-colors ${
                        isProfessionalView 
                          ? 'text-white'
                          : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
                      }`}
                      onClick={() => setShowMobileMenu(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;