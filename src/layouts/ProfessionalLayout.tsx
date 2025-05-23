import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useProfessionalAuth } from '../features/professional/professionalAuthContext';
import { useAuth } from '../features/auth/authContext';
import PHBLogo from '../components/PHBLogo';
import FeedbackButton from '../components/FeedbackButton';
import ViewToggle from '../components/ViewToggle';

// Key for storing authentication state in localStorage
const PROFESSIONAL_AUTH_STATE_KEY = 'phb_professional_auth_state';
const VIEW_PREFERENCE_KEY = 'phb_view_preference';

const ProfessionalLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { professionalUser, logout } = useProfessionalAuth();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current user is a doctor (either from user or professional context)
  const userIsDoctor = user?.role === 'doctor' || user?.hpn || professionalUser?.role === 'doctor';

  // Handle browser navigation events (back/forward buttons)
  useEffect(() => {
    // Set authentication state if user is a doctor
    if (userIsDoctor) {
      localStorage.setItem(PROFESSIONAL_AUTH_STATE_KEY, 'true');
    }

    // Function to handle browser back/forward navigation
    const handlePopState = () => {
      const viewPreference = localStorage.getItem(VIEW_PREFERENCE_KEY);
      
      // If in professional section but view preference doesn't match, align them
      if (location.pathname.includes('/professional') && viewPreference !== 'doctor') {
        localStorage.setItem(VIEW_PREFERENCE_KEY, 'doctor');
      }
      
      // If user is a doctor, ensure authentication state is set
      if (userIsDoctor) {
        localStorage.setItem(PROFESSIONAL_AUTH_STATE_KEY, 'true');
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [location.pathname, userIsDoctor]);

  // Check if view is switched to patient view
  useEffect(() => {
    const checkViewPreference = () => {
      const viewPreference = localStorage.getItem(VIEW_PREFERENCE_KEY);
      if (viewPreference !== 'doctor') {
        // If user switched to patient view, redirect to regular account page
        navigate('/account');
      }
    };
    
    // Check initially
    checkViewPreference();
    
    // Set up event listener for storage changes (when toggle is clicked elsewhere)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === VIEW_PREFERENCE_KEY) {
        checkViewPreference();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for immediate updates within the same window
    const handleCustomViewChange = () => checkViewPreference();
    window.addEventListener('phb_view_changed', handleCustomViewChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('phb_view_changed', handleCustomViewChange);
    };
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/professional/login');
  };

  // Define menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      { label: 'Dashboard', path: '/professional/dashboard' },
      { label: 'Appointments', path: '/professional/appointments' },
      { label: 'Patient Management', path: '/professional/patients' },
      { label: 'Clinical Guidelines', path: '/professional/guidelines' },
      { label: 'Professional Forum', path: '/professional/forum' },
      { label: 'Clinical Calculators', path: '/professional/calculators' },
    ];

    // Check both professional context and regular user context
    const effectiveUser = professionalUser || (user?.role === 'doctor' ? user : null);

    if (effectiveUser) {
      const role = professionalUser?.role || user?.role;
      
      if (role === 'doctor') {
        baseItems.push({ label: 'Doctor Resources', path: '/professional/resources' });
      }

      if (role === 'researcher') {
        baseItems.push({ label: 'Research Dashboard', path: '/professional/research' });
      }

      if (role === 'nurse') {
        baseItems.push({ label: 'Nursing Resources', path: '/professional/nursing-resources' });
      }

      if (role === 'pharmacist') {
        baseItems.push({ label: 'Pharmacy Resources', path: '/professional/pharmacy-resources' });
      }
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  // Format role with capitalization if it exists
  const effectiveUser = professionalUser || (user?.role === 'doctor' ? user : null);
  const formattedRole = effectiveUser?.role
    ? effectiveUser.role.charAt(0).toUpperCase() + effectiveUser.role.slice(1)
    : '';
  const userName = effectiveUser?.name || '';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Professional Header */}
      <header className="bg-blue-800 text-white shadow">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/professional/dashboard" className="flex items-center">
                  <PHBLogo className="h-8 w-8 mr-2" />
                  <span className="font-bold text-xl">PHB Professional</span>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* User Menu with ViewToggle */}
            <div className="hidden md:ml-4 md:flex md:items-center">
              {/* Always display the ViewToggle */}
              <ViewToggle />
              
              {effectiveUser && (
                <div className="ml-3 relative flex items-center">
                  <span className="mr-4 text-sm">{userName}</span>
                  <span className="mr-4 px-2 py-1 rounded-full bg-blue-700 text-xs">
                    {formattedRole}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 border border-white rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              {/* ViewToggle for mobile */}
              <ViewToggle />
              
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none ml-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                <svg
                  className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Icon when menu is open */}
                <svg
                  className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu, show/hide based on menu state */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {effectiveUser && (
            <div className="pt-4 pb-3 border-t border-blue-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-lg font-bold">
                      {userName.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{userName}</div>
                  <div className="text-sm font-medium text-blue-200">{formattedRole}</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      {/* Feedback Button */}
      <FeedbackButton />
    </div>
  );
};

export default ProfessionalLayout;
