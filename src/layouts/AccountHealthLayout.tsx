import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/authContext';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center px-4 py-3 ${
      active
        ? 'bg-blue-50 text-[#005eb8] border-l-4 border-[#005eb8]'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="mr-3">{icon}</div>
    <span className="font-medium">{label}</span>
  </Link>
);

interface AccountHealthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AccountHealthLayout: React.FC<AccountHealthLayoutProps> = ({
  children,
  title = "Your Health Dashboard"
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-6">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-xl">
            Access and manage your health information securely
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="mb-4">
              <Link
                to="/account"
                className="flex items-center text-[#005eb8] hover:underline mb-4"
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Account
              </Link>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="font-bold">Health Services</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  <NavLink
                    to="/account/gp-record"
                    active={currentPath === '/account/gp-record'}
                    icon={
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    }
                    label="GP Health Record"
                  />
                  <NavLink
                    to="/account/prescriptions"
                    active={currentPath === '/account/prescriptions'}
                    icon={
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    }
                    label="Prescriptions"
                  />
                  <NavLink
                    to="/account/appointments"
                    active={currentPath === '/account/appointments'}
                    icon={
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    }
                    label="Appointments"
                  />
                  <NavLink
                    to="/account/test-results"
                    active={currentPath === '/account/test-results'}
                    icon={
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    }
                    label="Test Results"
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-2">Need help?</h3>
              <p className="text-sm text-blue-700 mb-3">
                If you need assistance with your health dashboard, our support team is here to help.
              </p>
              <Link
                to="/help/health-services"
                className="text-[#005eb8] text-sm hover:underline flex items-center"
              >
                Visit our help center
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountHealthLayout;
