import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PHBLogo from './PHBLogo';
import { useAuth } from '../features/auth/authContext';
import { useProfessionalAuth } from '../features/professional/professionalAuthContext';
import CompactSearchBar from './CompactSearchBar';
import SearchModal from './SearchModal';
import EnhancedViewToggle from './EnhancedViewToggle';

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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDataStorageBanner, setShowDataStorageBanner] = useState(true);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const { user, isAuthenticated, logout, isDoctor } = useAuth();
  const { professionalUser } = useProfessionalAuth();
  const { isDarkMode } = useDarkMode();
  const location = useLocation();


  // Check if we're in professional view
  const isProfessionalView = location.pathname.includes('/professional');

  // Check if the data storage consent has been saved previously
  useEffect(() => {
    const dataStorageConsent = localStorage.getItem('data-storage-consent');
    if (dataStorageConsent) {
      setShowDataStorageBanner(false);
    }
  }, []);

  const handleDataStorageConsent = (accepted: boolean) => {
    const consent = accepted ? 'accepted' : 'declined';
    localStorage.setItem('data-storage-consent', consent);

    // Also store timestamp for auditing
    localStorage.setItem('data-storage-consent-timestamp', new Date().toISOString());

    // Keep legacy key for backwards compatibility during transition
    localStorage.setItem('cookie-consent', consent);

    setShowDataStorageBanner(false);
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
      {/* Data Storage banner */}
      {showDataStorageBanner && (
        <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-900 text-white'} p-4 shadow-lg`}>
          <div className="phb-container">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm md:text-base font-medium mb-1">
                  📦 Data Storage Notice
                </p>
                <p className="text-xs md:text-sm text-gray-300">
                  PHB stores authentication tokens and preferences in your browser's localStorage to provide our services.
                  We do not use tracking cookies. By continuing, you consent to this data storage.{' '}
                  <a
                    href="/about#cookies"
                    className="underline hover:text-blue-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn more about our data storage practices
                  </a>
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button
                  onClick={() => handleDataStorageConsent(true)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors shadow-md"
                  aria-label="Accept data storage"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleDataStorageConsent(false)}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm font-medium transition-colors shadow-md"
                  aria-label="Decline data storage"
                >
                  Decline
                </button>
              </div>
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

            {/* Modern Search Bar - Desktop Only */}
            <div className="hidden md:flex flex-1 justify-center max-w-2xl mx-8">
              <CompactSearchBar 
                isDarkMode={isDarkMode}
                isProfessionalView={isProfessionalView}
                className="w-full max-w-md"
                isModalOpen={isSearchModalOpen}
                setIsModalOpen={setIsSearchModalOpen}
              />
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
                onClick={() => setIsSearchModalOpen(true)}
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>

              {/* Enhanced View Toggle for All Professionals */}
              {isAuthenticated && (isDoctor || !!professionalUser) && <EnhancedViewToggle compact={true} className="ml-1" />}

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

      {/* Global Search Modal (shared between mobile and desktop) */}
      <SearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        isDarkMode={isDarkMode}
        isProfessionalView={isProfessionalView}
      />

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