import React, { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useOrganizationAuth } from '../features/organization/organizationAuthContext';
import PHBLogo from '../components/PHBLogo';
import FeedbackButton from '../components/FeedbackButton';

const OrganizationLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userData, logout } = useOrganizationAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/organization/login');
  };

  // Define menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      { label: 'Dashboard', path: '/organization/dashboard', icon: 'dashboard' },
    ];

    if (userData) {
      if (userData.role === 'hospital_admin') {
        return [
          ...baseItems,
          { label: 'Patient Admissions', path: '/organization/admissions', icon: 'person_add' },
          { label: 'Surgery Schedule', path: '/organization/surgery-schedule', icon: 'event' },
          { label: 'Department Management', path: '/organization/departments', icon: 'bed' },
          { label: 'Staff Roster', path: '/organization/staffing', icon: 'badge' },
          { label: 'Inventory Check', path: '/organization/inventory', icon: 'inventory_2' },
        ];
      } else if (userData.role === 'ngo_admin') {
        return [
          ...baseItems,
          { label: 'Programs', path: '/organization/programs', icon: 'article' },
          { label: 'Volunteers', path: '/organization/volunteers', icon: 'people' },
          { label: 'Donations', path: '/organization/donations', icon: 'volunteer_activism' },
          { label: 'Reports', path: '/organization/reports', icon: 'bar_chart' },
        ];
      } else if (userData.role === 'pharmacy_admin') {
        return [
          ...baseItems,
          { label: 'Inventory', path: '/organization/inventory', icon: 'inventory_2' },
          { label: 'Research', path: '/organization/research', icon: 'science' },
          { label: 'Distribution', path: '/organization/distribution', icon: 'local_shipping' },
          { label: 'Compliance', path: '/organization/compliance', icon: 'gavel' },
        ];
      }
    }
    
    return baseItems;
  };

  const menuItems = getMenuItems();

  // Determine organization type from user role
  const getOrganizationType = () => {
    if (!userData) return 'Organization';
    if (userData.role === 'hospital_admin') return 'Hospital';
    if (userData.role === 'ngo_admin') return 'NGO';
    if (userData.role === 'pharmacy_admin') return 'Pharmacy';
    return 'Organization';
  };
  
  const formattedType = getOrganizationType();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Organization Header */}
      <header className="bg-blue-800 text-white shadow">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/organization/dashboard" className="flex items-center">
                  <PHBLogo className="h-8 w-8 mr-2" />
                  <span className="font-bold text-xl">PHB {formattedType}</span>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 flex items-center"
                >
                  <span className="material-icons text-lg mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="hidden md:ml-4 md:flex md:items-center">
              {userData && (
                <div className="ml-3 relative flex items-center">
                  <span className="mr-4 text-sm">{userData?.full_name || 'User'} | {userData?.hospital?.name || userData?.ngo?.name || userData?.pharmacy?.name || ''}</span>
                  <span className="mr-4 px-2 py-1 rounded-full bg-blue-700 text-xs">
                    {formattedType}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 border border-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center"
                  >
                    <span className="material-icons text-sm mr-1">logout</span>
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <span className="material-icons">
                  {isMobileMenuOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="material-icons text-lg mr-1">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
          {userData && (
            <div className="pt-4 pb-3 border-t border-blue-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-lg font-bold">
                      {userData?.full_name?.charAt(0) || 'U'}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{userData?.full_name || 'User'}</div>
                  <div className="text-sm font-medium text-blue-200">{userData?.hospital?.name || userData?.ngo?.name || userData?.pharmacy?.name || ''}</div>
                  <div className="text-sm font-medium text-blue-200">{formattedType}</div>
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
      <footer className="bg-white p-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Public Health Bureau. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="/terms" className="text-gray-500 hover:text-blue-600 text-sm">Terms of Service</a>
              <a href="/privacy" className="text-gray-500 hover:text-blue-600 text-sm">Privacy Policy</a>
              <a href="/contact" className="text-gray-500 hover:text-blue-600 text-sm">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Feedback Button */}
      <FeedbackButton />
    </div>
  );
};

export default OrganizationLayout; 