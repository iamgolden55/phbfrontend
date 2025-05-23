import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useAuth } from '../auth/authContext';

// Define types for professional user and auth context
export type ProfessionalRole = 'doctor' | 'nurse' | 'researcher' | 'pharmacist';

interface ProfessionalUser {
  id: string;
  name: string;
  email: string;
  role: ProfessionalRole;
  licenseNumber?: string;
  specialty?: string;
  verified: boolean;
}

interface ProfessionalAuthContextType {
  professionalUser: ProfessionalUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  hasAccess: (requiredRoles: ProfessionalRole[]) => boolean;
  professionalInfo: ProfessionalUser | null;
}

// Create the context with a default value
const ProfessionalAuthContext = createContext<ProfessionalAuthContextType | undefined>(undefined);

// Keys for localStorage
const PROFESSIONAL_AUTH_STATE_KEY = 'phb_professional_auth_state';
const VIEW_PREFERENCE_KEY = 'phb_view_preference';

// Create a provider component
export const ProfessionalAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [professionalUser, setProfessionalUser] = useState<ProfessionalUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use the main auth context
  const { user, isLoading: authLoading, isAuthenticated: mainUserAuthenticated, isDoctor } = useAuth();

  // Check if the user is a professional (doctor)
  useEffect(() => {
    // Only process when the main auth has completed loading
    if (!authLoading) {
      if (mainUserAuthenticated && isDoctor && user) {
        // Convert regular user to professional user format
        const professionalUserData: ProfessionalUser = {
          id: user.id,
          name: user.full_name,
          email: user.email,
          role: 'doctor', // User is detected as a doctor
          licenseNumber: user.hpn || '', // Healthcare Professional Number
          specialty: '', // User specialty might not be in the regular user model
          verified: true,
        };
        
        setProfessionalUser(professionalUserData);
        
        // Update view preference if in professional view
        if (window.location.pathname.includes('/professional')) {
          localStorage.setItem(VIEW_PREFERENCE_KEY, 'doctor');
          localStorage.setItem(PROFESSIONAL_AUTH_STATE_KEY, 'true');
        }
      } else {
        // Not a professional user or not authenticated
        setProfessionalUser(null);
      }
      
      setIsLoading(false);
    }
  }, [user, authLoading, mainUserAuthenticated, isDoctor]);

  const clearError = () => {
    setError(null);
  };

  // Helper function to check if user has access to a feature
  const hasAccess = (requiredRoles: ProfessionalRole[]) => {
    if (!professionalUser) return false;
    if (!professionalUser.verified) return false;
    return requiredRoles.includes(professionalUser.role);
  };

  const contextValue: ProfessionalAuthContextType = {
    professionalUser,
    isAuthenticated: !!professionalUser,
    isLoading: isLoading || authLoading,
    error,
    clearError,
    hasAccess,
    professionalInfo: professionalUser,
  };
  console.log("professionalUser:", professionalUser);
  return (
    <ProfessionalAuthContext.Provider value={contextValue}>
      {children}
    </ProfessionalAuthContext.Provider>
  );
};

// Create a custom hook to use the professional auth context
export const useProfessionalAuth = () => {
  const context = useContext(ProfessionalAuthContext);
  if (context === undefined) {
    throw new Error('useProfessionalAuth must be used within a ProfessionalAuthProvider');
  }
  return context;
};

export default ProfessionalAuthContext;
