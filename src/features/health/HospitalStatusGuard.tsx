import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/authContext';

interface HospitalStatusGuardProps {
  children: React.ReactNode;
}

/**
 * HospitalStatusGuard - Protects routes that require an approved primary hospital
 * If a user's primary hospital status is pending, they are redirected to the account page
 * with a message explaining they need to wait for their registration to be approved
 */
const HospitalStatusGuard: React.FC<HospitalStatusGuardProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading, hasPrimaryHospital, primaryHospital } = useAuth();
  const location = useLocation();
  
  // Skip hospital checks for professional routes
  const isProfessionalRoute = location.pathname.startsWith('/professional');
  if (isProfessionalRoute) {
    return <>{children}</>;
  }

  // If still loading, show a loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0891b2]"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If no primary hospital is registered, redirect to the account page with message
  if (!hasPrimaryHospital) {
    return <Navigate to="/account" replace state={{ 
      hospitalMessage: "You need to register with a primary hospital to access appointment services."
    }} />;
  }

  // If primary hospital status is pending, redirect to account page with message
  if (primaryHospital && primaryHospital.status === 'pending') {
    return <Navigate to="/account" replace state={{ 
      hospitalMessage: "Your primary hospital registration is pending approval. You cannot access appointment services until it is approved."
    }} />;
  }

  // If the user has an approved primary hospital, allow access to the protected route
  return <>{children}</>;
};

export default HospitalStatusGuard;
