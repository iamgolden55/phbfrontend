import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OrganizationAuthContextType {
  isAuthenticated: boolean;
  userData: UserData | null;
  error: string | null;
  isLoading: boolean;
  needsVerification: boolean;
  currentEmail: string | null;
  login: (email: string, password: string, hospital_code: string) => Promise<void>;
  verify2FA: (email: string, verificationCode: string, rememberDevice: boolean) => Promise<void>;
  register: (organizationData: OrganizationRegistrationData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  getDashboardPath: () => string;
  // Password reset functions
  requestPasswordReset: (email: string, hospitalCode: string) => Promise<{ success: boolean; message: string; token?: string; requires_secondary_admin?: boolean; expires_in?: number }>;
  verifyPasswordReset: (token: string, verificationCode: string, email: string, hospitalCode?: string) => Promise<{ success: boolean; message: string; token?: string; secondary_token?: string; expires_in?: number }>;
  completePasswordReset: (token: string, secondaryToken: string, email: string, newPassword: string, confirmPassword: string) => Promise<{ success: boolean; message: string; requires_2fa?: boolean }>;
}

export interface HospitalInfo {
  id: number;
  name: string;
  code: string;
}

export interface UserData {
  id: number;
  email: string;
  full_name: string;
  role: 'hospital_admin' | 'ngo_admin' | 'pharmacy_admin';
  hospital?: HospitalInfo;
  ngo?: {
    id: number;
    name: string;
    code: string;
  };
  pharmacy?: {
    id: number;
    name: string;
    code: string;
  };
  is_verified: boolean;
  position: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  tokens: {
    access: string;
    refresh: string;
  };
  user_data: UserData;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check localStorage immediately to prevent auth flash
    const storedAuth = localStorage.getItem('organizationAuth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        return !!(authData.userData && authData.tokens);
      } catch {
        return false;
      }
    }
    return false;
  });
  const [userData, setUserData] = useState<UserData | null>(() => {
    // Initialize userData from localStorage if available
    const storedAuth = localStorage.getItem('organizationAuth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        return authData.userData || null;
      } catch {
        return null;
      }
    }
    return null;
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [needsVerification, setNeedsVerification] = useState<boolean>(false);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);

  // Check if user is already logged in on mount or if OTP verification is in progress
  useEffect(() => {
    // First check for stored auth in localStorage (fully authenticated user)
    const storedAuth = localStorage.getItem('organizationAuth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        if (authData.userData && authData.tokens) {
          setIsAuthenticated(true);
          setUserData(authData.userData);
          // Clear any verification state if we're already authenticated
          sessionStorage.removeItem('org_auth_email');
          sessionStorage.removeItem('org_auth_needs_verification');
        }
      } catch (err) {
        localStorage.removeItem('organizationAuth');
      }
    } else {
      // If not fully authenticated, check if we're in the middle of OTP verification
      const storedEmail = sessionStorage.getItem('org_auth_email');
      const needsVerify = sessionStorage.getItem('org_auth_needs_verification');
      
      if (storedEmail && needsVerify === 'true') {
        console.log('Resuming OTP verification for email:', storedEmail);
        setCurrentEmail(storedEmail);
        setNeedsVerification(true);
      }
    }
  }, []);

  const login = async (email: string, password: string, hospital_code: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    console.log('Starting login process for hospital admin');
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/hospitals/admin/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          hospital_code
        })
      });

      // Get the response data
      const data = await response.json();
      console.log('Login response:', JSON.stringify(data, null, 2));
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Important: For hospital admin login, ALWAYS show the OTP verification screen
      // There have been issues with detecting verification state from backend response
      console.log('Login successful, proceeding to OTP verification');
      
      // Store verification state in sessionStorage ONLY (not localStorage)
      // This prevents conflicts with auth state checks
      sessionStorage.setItem('org_auth_email', email);
      sessionStorage.setItem('org_auth_needs_verification', 'true');
      sessionStorage.setItem('org_auth_timestamp', Date.now().toString());
      
      // Update React state
      setCurrentEmail(email);
      setNeedsVerification(true);
      
      console.log('Verification state set, should see OTP form now');
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
      
      // In a real app, this would be an API call to register
      const mockUserData: UserData = {
        id: Math.floor(Math.random() * 10000),
        email: organizationData.email,
        full_name: organizationData.name,
        role: organizationData.type === 'hospital' ? 'hospital_admin' :
              organizationData.type === 'ngo' ? 'ngo_admin' : 'pharmacy_admin',
        is_verified: false,
        position: 'Administrator'
      };

      // Add organization specific data
      if (organizationData.type === 'hospital') {
        mockUserData.hospital = {
          id: Math.floor(Math.random() * 100),
          name: organizationData.name,
          code: `H${Math.floor(Math.random() * 1000)}`
        };
      } else if (organizationData.type === 'ngo') {
        mockUserData.ngo = {
          id: Math.floor(Math.random() * 100),
          name: organizationData.name,
          code: `N${Math.floor(Math.random() * 1000)}`
        };
      } else {
        mockUserData.pharmacy = {
          id: Math.floor(Math.random() * 100),
          name: organizationData.name,
          code: `P${Math.floor(Math.random() * 1000)}`
        };
      }
      
      // Automatically log in after registration
      const authData = {
        userData: mockUserData,
        tokens: {
          access: 'mock-access-token',
          refresh: 'mock-refresh-token'
        }
      };
      
      localStorage.setItem('organizationAuth', JSON.stringify(authData));
      
      setIsAuthenticated(true);
      setUserData(mockUserData);
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
    setUserData(null);
  };

  const clearError = (): void => {
    setError(null);
  };

  const getDashboardPath = (): string => {
    if (!userData) return '/organization/login';
    
    // All organization types use the same dashboard route
    // The OrganizationDashboardPage will render the correct dashboard based on role
    return '/organization/dashboard';
  };

  const verify2FA = async (email: string, verificationCode: string, rememberDevice: boolean): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Verifying 2FA for email:', email);
      console.log('Making 2FA verification request for email:', email);
      const response = await fetch('http://127.0.0.1:8000/api/hospitals/admin/verify-2fa/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          verification_code: verificationCode,
          remember_device: rememberDevice
        })
      });

      // Important: Only parse the response JSON once
      const data = await response.json();
      console.log('2FA verification raw response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }
      console.log('2FA verification response:', data);
      
      if (!data.user_data || !data.tokens) {
        throw new Error('Invalid response from server');
      }

      // Store auth data in localStorage
      const authData = {
        userData: data.user_data,
        tokens: data.tokens
      };
      
      // Clear the verification state from sessionStorage
      sessionStorage.removeItem('org_auth_email');
      sessionStorage.removeItem('org_auth_needs_verification');
      
      localStorage.setItem('organizationAuth', JSON.stringify(authData));
      
      // Ensure we're correctly updating the state with verified user data
      console.log('Setting authenticated user data:', data.user_data);
      
      // First, update React state
      setUserData(data.user_data);
      setIsAuthenticated(true);
      
      // Then update localStorage with the auth data to ensure persistence
      localStorage.setItem('organizationAuth', JSON.stringify(authData));
      
      // Important: Clear all verification flags and data
      setNeedsVerification(false);
      setCurrentEmail(null);
      
      // Clear verification data from sessionStorage only
      sessionStorage.removeItem('org_auth_email');
      sessionStorage.removeItem('org_auth_needs_verification');
      sessionStorage.removeItem('org_auth_timestamp');
      
      console.log('Authentication successful, state updated');
      
      // Navigation will be handled by the component that called verify2FA
      // This prevents the full page reload issue
    } catch (err) {
      if (err instanceof Error) {
        console.error('2FA verification error:', err.message);
        setError(err.message);
      } else {
        console.error('Unexpected 2FA verification error');
        setError('An unexpected error occurred during verification');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to request a password reset for hospital admin
  const requestPasswordReset = async (email: string, hospitalCode: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/hospitals/admin/reset-password/request/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          hospital_code: hospitalCode
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Password reset request failed');
      }
      
      return {
        success: true,
        message: data.message || 'Password reset initiated. Please check your email for verification instructions.',
        token: data.token,
        requires_secondary_admin: data.requires_secondary_admin,
        expires_in: data.expires_in
      };
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      return {
        success: false,
        message: err instanceof Error ? err.message : 'An unexpected error occurred'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Force navigation to dashboard when needed
  const forceDashboardNavigation = () => {
    console.log('Force redirecting to dashboard');
    // Use a slight delay to ensure any state updates have processed
    setTimeout(() => {
      window.location.href = '/organization/dashboard';
    }, 200);
  };

  // Function to verify a password reset code
  const verifyPasswordReset = async (token: string, verificationCode: string, email: string, hospitalCode?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const body: any = {
        token,
        verification_code: verificationCode,
        email
      };
      
      if (hospitalCode) {
        body.hospital_code = hospitalCode;
      }
      
      const response = await fetch('http://127.0.0.1:8000/api/hospitals/admin/reset-password/verify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }
      
      return {
        success: true,
        message: data.message || 'Verification successful. Proceed to reset your password.',
        token: data.token,
        secondary_token: data.secondary_token,
        expires_in: data.expires_in
      };
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      return {
        success: false,
        message: err instanceof Error ? err.message : 'An unexpected error occurred'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Function to complete the password reset process
  const completePasswordReset = async (token: string, secondaryToken: string, email: string, newPassword: string, confirmPassword: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/hospitals/admin/reset-password/complete/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          secondary_token: secondaryToken,
          email,
          new_password: newPassword,
          confirm_password: confirmPassword
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }
      
      return {
        success: true,
        message: data.message || 'Password has been reset successfully. Please log in with your new credentials.',
        requires_2fa: data.requires_2fa
      };
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
      return {
        success: false,
        message: err instanceof Error ? err.message : 'An unexpected error occurred'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: OrganizationAuthContextType = {
    isAuthenticated,
    userData,
    error,
    isLoading,
    needsVerification,
    currentEmail,
    login,
    verify2FA,
    register,
    logout,
    clearError,
    getDashboardPath,
    requestPasswordReset,
    verifyPasswordReset,
    completePasswordReset,
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