import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define types for professional user and auth context
export type ProfessionalRole = 'doctor' | 'nurse' | 'researcher' | 'pharmacist';

interface ProfessionalUser {
  id: string;
  name: string;
  email: string;
  role: ProfessionalRole;
  licenseNumber: string;
  specialty?: string;
  verified: boolean;
}

interface ProfessionalAuthContextType {
  professionalUser: ProfessionalUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: (preserveView?: boolean) => void;
  register: (name: string, email: string, password: string, role: ProfessionalRole, licenseNumber: string, specialty?: string) => Promise<void>;
  error: string | null;
  clearError: () => void;
  hasAccess: (requiredRoles: ProfessionalRole[]) => boolean;
  professionalInfo: ProfessionalUser | null;
}

// Create the context with a default value
const ProfessionalAuthContext = createContext<ProfessionalAuthContextType | undefined>(undefined);

// Sample professional users for demo purposes
const sampleProfessionalUsers: ProfessionalUser[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'doctor@phb.org',
    role: 'doctor',
    licenseNumber: 'MD12345',
    specialty: 'Cardiology',
    verified: true,
  },
  {
    id: '2',
    name: 'Dr. Michael Brown',
    email: 'researcher@phb.org',
    role: 'researcher',
    licenseNumber: 'RS67890',
    specialty: 'Epidemiology',
    verified: true,
  },
  {
    id: '3',
    name: 'Nurse Emma Wilson',
    email: 'nurse@phb.org',
    role: 'nurse',
    licenseNumber: 'RN54321',
    specialty: 'Pediatrics',
    verified: true,
  },
  {
    id: '4',
    name: 'Pharmacist Robert Lee',
    email: 'pharmacist@phb.org',
    role: 'pharmacist',
    licenseNumber: 'PH98765',
    verified: true,
  },
];

// Keys for localStorage
const PROFESSIONAL_USER_KEY = 'phb_professional_user';
const PROFESSIONAL_AUTH_STATE_KEY = 'phb_professional_auth_state';
const VIEW_PREFERENCE_KEY = 'phb_view_preference';

// Create a provider component
export const ProfessionalAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [professionalUser, setProfessionalUser] = useState<ProfessionalUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if professional user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem(PROFESSIONAL_USER_KEY);
    if (storedUser) {
      try {
        setProfessionalUser(JSON.parse(storedUser));
        localStorage.setItem(PROFESSIONAL_AUTH_STATE_KEY, 'true');
      } catch (err) {
        console.error('Error parsing stored professional user:', err);
        localStorage.removeItem(PROFESSIONAL_USER_KEY);
        localStorage.removeItem(PROFESSIONAL_AUTH_STATE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find professional user by email
      const foundUser = sampleProfessionalUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // In a real app, we would validate the password here
      if (password !== 'password123') {
        throw new Error('Invalid email or password');
      }

      // Clear any existing user auth token to prevent multiple accounts being logged in
      localStorage.removeItem('phb_user');

      // Store professional user in state and localStorage
      setProfessionalUser(foundUser);
      localStorage.setItem(PROFESSIONAL_USER_KEY, JSON.stringify(foundUser));
      
      // Set view preference to doctor if this is a doctor login
      if (foundUser.role === 'doctor') {
        localStorage.setItem(VIEW_PREFERENCE_KEY, 'doctor');
      }
      
      // Set authentication state
      localStorage.setItem(PROFESSIONAL_AUTH_STATE_KEY, 'true');

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = (preserveView: boolean = false) => {
    setProfessionalUser(null);
    localStorage.removeItem(PROFESSIONAL_USER_KEY);
    localStorage.removeItem(PROFESSIONAL_AUTH_STATE_KEY);
    
    // Only reset view preference if we're not preserving it
    if (!preserveView) {
      localStorage.setItem(VIEW_PREFERENCE_KEY, 'patient');
    }
  };

  // Register function (mock)
  const register = async (
    name: string,
    email: string,
    password: string,
    role: ProfessionalRole,
    licenseNumber: string,
    specialty?: string
  ) => {
    setError(null);
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if email already exists
      if (sampleProfessionalUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Email is already in use');
      }

      // Create new professional user
      const newUser: ProfessionalUser = {
        id: String(sampleProfessionalUsers.length + 1),
        name,
        email,
        role,
        licenseNumber,
        specialty,
        // By default, new users need verification
        verified: false,
      };

      // In a real app, we would save the user to a database here
      console.log('Registered new professional user:', newUser);

      // For demo purposes, immediately verify the user
      newUser.verified = true;

      // Clear any existing user auth token to prevent multiple accounts being logged in
      localStorage.removeItem('phb_user');

      // "Log in" the new professional user
      setProfessionalUser(newUser);
      localStorage.setItem(PROFESSIONAL_USER_KEY, JSON.stringify(newUser));
      
      // Set view preference to doctor if this is a doctor registration
      if (role === 'doctor') {
        localStorage.setItem(VIEW_PREFERENCE_KEY, 'doctor');
      }
      
      // Set authentication state
      localStorage.setItem(PROFESSIONAL_AUTH_STATE_KEY, 'true');

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

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
    isLoading,
    login,
    logout,
    register,
    error,
    clearError,
    hasAccess,
    professionalInfo: professionalUser,
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
