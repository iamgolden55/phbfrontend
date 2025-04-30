import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OrganizationAuthContextType {
  isAuthenticated: boolean;
  organizationInfo: OrganizationInfo | null;
  error: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (organizationData: OrganizationRegistrationData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export interface OrganizationInfo {
  id: string;
  name: string;
  email: string;
  type: 'hospital' | 'ngo' | 'pharmaceutical';
  verified: boolean;
}

export interface OrganizationRegistrationData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  type: 'hospital' | 'ngo' | 'pharmaceutical';
  address: string;
  contactNumber: string;
  website?: string;
  registrationNumber: string;
}

const OrganizationAuthContext = createContext<OrganizationAuthContextType | undefined>(undefined);

export const OrganizationAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [organizationInfo, setOrganizationInfo] = useState<OrganizationInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('organizationAuth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        setIsAuthenticated(true);
        setOrganizationInfo(authData.organizationInfo);
      } catch (err) {
        localStorage.removeItem('organizationAuth');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call to your backend
      // For this demo, we'll simulate a successful login with mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Mock organization data - this would come from your API in a real app
      const mockOrganizationData: OrganizationInfo = {
        id: '123',
        name: email.includes('hospital') ? 'General Hospital' : 
              email.includes('ngo') ? 'Health For All NGO' : 'Pharma Solutions Inc',
        email: email,
        type: email.includes('hospital') ? 'hospital' : 
              email.includes('ngo') ? 'ngo' : 'pharmaceutical',
        verified: true
      };
      
      // Validate credentials (in a real app, this would be done on the server)
      if (password !== 'password123') {
        throw new Error('Invalid email or password');
      }
      
      // Store auth data in localStorage
      const authData = {
        organizationInfo: mockOrganizationData,
        token: 'mock-jwt-token'
      };
      
      localStorage.setItem('organizationAuth', JSON.stringify(authData));
      
      setIsAuthenticated(true);
      setOrganizationInfo(mockOrganizationData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (organizationData: OrganizationRegistrationData): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate passwords match
      if (organizationData.password !== organizationData.confirmPassword) {
        throw new Error('Passwords do not match');
      }
      
      // In a real app, this would be an API call to register the organization
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      // Mock successful registration
      const mockOrganizationInfo: OrganizationInfo = {
        id: Math.random().toString(36).substr(2, 9),
        name: organizationData.name,
        email: organizationData.email,
        type: organizationData.type,
        verified: false // New organizations typically require verification
      };
      
      // Automatically log in after registration
      const authData = {
        organizationInfo: mockOrganizationInfo,
        token: 'mock-jwt-token'
      };
      
      localStorage.setItem('organizationAuth', JSON.stringify(authData));
      
      setIsAuthenticated(true);
      setOrganizationInfo(mockOrganizationInfo);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred during registration');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    localStorage.removeItem('organizationAuth');
    setIsAuthenticated(false);
    setOrganizationInfo(null);
  };

  const clearError = (): void => {
    setError(null);
  };

  const contextValue: OrganizationAuthContextType = {
    isAuthenticated,
    organizationInfo,
    error,
    isLoading,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <OrganizationAuthContext.Provider value={contextValue}>
      {children}
    </OrganizationAuthContext.Provider>
  );
};

export const useOrganizationAuth = (): OrganizationAuthContextType => {
  const context = useContext(OrganizationAuthContext);
  if (context === undefined) {
    throw new Error('useOrganizationAuth must be used within an OrganizationAuthProvider');
  }
  return context;
};

export default OrganizationAuthContext; 