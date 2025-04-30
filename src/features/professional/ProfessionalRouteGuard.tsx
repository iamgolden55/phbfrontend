import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useProfessionalAuth, ProfessionalRole } from './professionalAuthContext';

interface ProfessionalRouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: ProfessionalRole[];
}

const ProfessionalRouteGuard: React.FC<ProfessionalRouteGuardProps> = ({
  children,
  allowedRoles = ['doctor', 'nurse', 'researcher', 'pharmacist']
}) => {
  const { professionalUser, isAuthenticated, isLoading } = useProfessionalAuth();
  const location = useLocation();

  // If auth is still loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        <p className="ml-2 text-gray-700">Loading...</p>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !professionalUser) {
    return <Navigate to="/professional/login" state={{ from: location }} replace />;
  }

  // If authenticated but not verified, redirect to verification pending page
  if (!professionalUser.verified) {
    return <Navigate to="/professional/verification-pending" state={{ from: location }} replace />;
  }

  // If authenticated but doesn't have the required role, show access denied
  if (!allowedRoles.includes(professionalUser.role)) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-700 mb-4">
          You don't have permission to access this page. This resource is only available to{' '}
          {allowedRoles.join(', ')} users.
        </p>
        <p className="text-gray-700">
          Your current role is <span className="font-semibold">{professionalUser.role}</span>.
        </p>
        <div className="mt-6">
          <a
            href="/professional/dashboard"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    );
  }

  // If all checks pass, render the protected route
  return <>{children}</>;
};

export default ProfessionalRouteGuard;
