import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useProfessionalAuth } from '../features/professional/professionalAuthContext';
import PHBLogo from '../components/PHBLogo';
import FeedbackButton from '../components/FeedbackButton';

const ProfessionalLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { professionalUser, logout } = useProfessionalAuth();
  const navigate = useNavigate();

  // Check if view is switched to patient view
  useEffect(() => {
    const checkViewPreference = () => {
      const viewPreference = localStorage.getItem('phb_view_preference');
      if (viewPreference !== 'doctor') {
        // If user switched to patient view, redirect to regular account page
        navigate('/account');
      }
    };
    
    // Check initially
    checkViewPreference();
    
    // Set up event listener for storage changes (when toggle is clicked elsewhere)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'phb_view_preference') {
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
      { label: 'Patient Management', path: '/professional/patients' },
      { label: 'Clinical Guidelines', path: '/professional/guidelines' },
      { label: 'Professional Forum', path: '/professional/forum' },
      { label: 'Clinical Calculators', path: '/professional/calculators' },
    ];

    if (professionalUser) {
      if (professionalUser.role === 'doctor') {
        baseItems.push({ label: 'Doctor Resources', path: '/professional/resources' });
      }

      if (professionalUser.role === 'researcher') {
        baseItems.push({ label: 'Research Dashboard', path: '/professional/research' });
      }

      if (professionalUser.role === 'nurse') {
        baseItems.push({ label: 'Nursing Resources', path: '/professional/nursing-resources' });
      }

      if (professionalUser.role === 'pharmacist') {
        baseItems.push({ label: 'Pharmacy Resources', path: '/professional/pharmacy-resources' });
      }
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  // Format role with capitalization if it exists
  const formattedRole = professionalUser?.role
    ? professionalUser.role.charAt(0).toUpperCase() + professionalUser.role.slice(1)
    : '';

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

            {/* User Menu */}
            <div className="hidden md:ml-4 md:flex md:items-center">
              {professionalUser && (
                <div className="ml-3 relative flex items-center">
                  <span className="mr-4 text-sm">{professionalUser.name}</span>
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
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
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
          {professionalUser && (
            <div className="pt-4 pb-3 border-t border-blue-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-lg font-bold">
                      {professionalUser.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{professionalUser.name}</div>
                  <div className="text-sm font-medium text-blue-200">{formattedRole}</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <button
                  onClick={handleLogout}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 w-full text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-center md:text-left">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Public Health Board - Professional Portal
              </p>
              <p className="text-xs mt-1 text-blue-200">
                This platform is intended for healthcare professionals only. All information is confidential.
              </p>
            </div>
            <div className="mt-4 flex justify-center md:mt-0">
              <a href="#" className="text-blue-200 hover:text-white mx-2">Terms of Service</a>
              <a href="#" className="text-blue-200 hover:text-white mx-2">Privacy Policy</a>
              <a href="#" className="text-blue-200 hover:text-white mx-2">Contact</a>
            </div>
          </div>
        </div>
        <FeedbackButton />
      </footer>
    </div>
  );
};

export default ProfessionalLayout;
