import React, { createContext, useState, useContext, useEffect, useRef, ReactNode } from 'react';
import { useAuth } from '../auth/authContext';
import { API_BASE_URL } from '../../utils/config';

// Define types for professional user and auth context
export type ProfessionalRole =
  | 'doctor'
  | 'nurse'
  | 'researcher'
  | 'pharmacist'
  | 'physiotherapist'
  | 'lab_technician'
  | 'radiographer'
  | 'midwife'
  | 'dentist'
  | 'optometrist';

interface ProfessionalUser {
  id: string;
  name: string;
  email: string;
  role: ProfessionalRole;
  professional_type?: string; // From PHB Registry (e.g., 'pharmacist', 'doctor')
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
  logout: () => void;
}

// Create the context with a default value
const ProfessionalAuthContext = createContext<ProfessionalAuthContextType | undefined>(undefined);

/**
 * Professional Authentication Storage
 *
 * CURRENT IMPLEMENTATION (localStorage):
 * - Professional state and preferences stored in browser localStorage
 * - Accessible to JavaScript code (XSS vulnerable)
 *
 * PLANNED MIGRATION:
 * - Moving to httpOnly cookies for enhanced XSS protection
 * - See: thoughts/shared/research/2025-10-18-cookie-usage.md
 * - See: thoughts/shared/plans/2025-10-18-httponly-cookie-migration.md
 */
const PROFESSIONAL_AUTH_STATE_KEY = 'phb_professional_auth_state';
const VIEW_PREFERENCE_KEY = 'phb_view_preference';

// Create a provider component
export const ProfessionalAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [professionalUser, setProfessionalUser] = useState<ProfessionalUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasChecked = useRef(false);

  // Use the main auth context
  const { user, isLoading: authLoading, isAuthenticated: mainUserAuthenticated, isDoctor } = useAuth();

  // Fetch professional info from registry
  const fetchProfessionalInfo = async () => {
    try {
      const url = `${API_BASE_URL}/api/registry/my-info/`;

      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return {
          professional_type: data.professional_type,
          licenseNumber: data.license_number,
          specialty: data.specialization,
          verified: data.verified,
        };
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  // Check if the user is a professional (doctor, pharmacist, etc.)
  useEffect(() => {
    const loadProfessionalData = async () => {
      // Prevent infinite loop - only run once we have valid user data
      // Allow re-run if user data changes (e.g., fresh login)
      if (hasChecked.current && professionalUser) {
        return;
      }

      // Only process when the main auth has completed loading AND user data is available
      if (!authLoading && mainUserAuthenticated && user) {
        hasChecked.current = true;

        // Try to fetch detailed professional info from registry
        const registryInfo = await fetchProfessionalInfo();

        if (registryInfo) {
          // User has an active professional license in PHB Registry
          const professionalUserData: ProfessionalUser = {
            id: user.id,
            name: user.full_name,
            email: user.email,
            role: registryInfo.professional_type as ProfessionalRole,
            professional_type: registryInfo.professional_type,
            licenseNumber: registryInfo.licenseNumber,
            specialty: registryInfo.specialty,
            verified: registryInfo.verified,
          };

          setProfessionalUser(professionalUserData);

          // Update view preference if in professional view
          if (window.location.pathname.includes('/professional')) {
            localStorage.setItem(VIEW_PREFERENCE_KEY, 'doctor');
            localStorage.setItem(PROFESSIONAL_AUTH_STATE_KEY, 'true');
          }
        } else if (isDoctor && user.hpn) {
          // Fallback: User is detected as a doctor via old HPN system
          const professionalUserData: ProfessionalUser = {
            id: user.id,
            name: user.full_name,
            email: user.email,
            role: 'doctor',
            professional_type: 'doctor',
            licenseNumber: user.hpn,
            specialty: '',
            verified: true,
          };

          setProfessionalUser(professionalUserData);

          if (window.location.pathname.includes('/professional')) {
            localStorage.setItem(VIEW_PREFERENCE_KEY, 'doctor');
            localStorage.setItem(PROFESSIONAL_AUTH_STATE_KEY, 'true');
          }
        } else {
          // Not a professional user
          setProfessionalUser(null);
        }

        setIsLoading(false);
      } else if (!authLoading && !mainUserAuthenticated) {
        // Auth completed but user is not authenticated
        setProfessionalUser(null);
        setIsLoading(false);
      }
    };

    loadProfessionalData();
  }, [user, authLoading, mainUserAuthenticated, isDoctor]);

  const clearError = () => {
    setError(null);
  };

  // Logout function
  const logout = () => {
    setProfessionalUser(null);
    localStorage.removeItem(PROFESSIONAL_AUTH_STATE_KEY);
    localStorage.removeItem(VIEW_PREFERENCE_KEY);
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
    logout,
  };

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
