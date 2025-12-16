import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useOrganizationAuth } from '../features/organization/organizationAuthContext';
import { OrganizationChatBot } from '../features/organization/components/OrganizationChatBot';
import OrganizationSidebar from '../features/organization/components/OrganizationSidebar';
import { OrganizationTourProvider, useOrganizationTour } from '../features/organization/context/OrganizationTourContext';
import {
  Bell,
  Search,
  Menu,
  HelpCircle,
} from 'lucide-react';

const OrganizationLayoutContent: React.FC = () => {
  console.log('🚀 ModernOrganizationLayout is rendering!');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userData, logout } = useOrganizationAuth();
  const { startTour } = useOrganizationTour();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-800">
      {/* Sidebar Component */}
      <OrganizationSidebar
        isOpen={isSidebarOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <div
        className={`
          flex-1 flex flex-col min-h-screen transition-all duration-300
          ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'}
        `}
      >
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (window.innerWidth >= 768) {
                  toggleSidebar();
                } else {
                  toggleMobileMenu();
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
            >
              <Menu size={20} />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-1.5 w-64 lg:w-96 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:outline-none text-sm ml-2 w-full text-gray-600"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Help / Tour Trigger */}
            <button
              onClick={startTour}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-blue-600 transition-colors"
              title="Start Dashboard Tour"
            >
              <HelpCircle size={20} />
            </button>

            {/* Notifications */}
            <button className="p-2 hover:bg-gray-100 rounded-full relative text-gray-500 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">{userData?.full_name || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{userData?.role || 'Administrator'}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                {userData?.full_name?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Organization Guide Chatbot */}
      <OrganizationChatBot />

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

const ModernOrganizationLayout: React.FC = () => {
  return (
    <OrganizationTourProvider>
      <OrganizationLayoutContent />
    </OrganizationTourProvider>
  );
};

export default ModernOrganizationLayout;
