import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface OrganizationAuthContextType {
  isAuthenticated: boolean;
  userData: UserData | null;
  error: string | null;
  isLoading: boolean;
  isInitialized: boolean;
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start with loading true
  const [needsVerification, setNeedsVerification] = useState<boolean>(false);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Check if user is already logged in on mount or if OTP verification is in progress
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔐 === AUTH INITIALIZATION STARTING ===');
      
      // Prevent multiple initializations
      if (isInitialized) {
        console.log('🔐 Auth already initialized, skipping...');
        return;
      }

      try {
        setIsLoading(true);
        
        // Debug: Check what's in localStorage
        const storedAuth = localStorage.getItem('organizationAuth');
        console.log('🔐 Raw localStorage content:', storedAuth ? 'EXISTS' : 'NULL');
        
        if (storedAuth) {
          console.log('🔐 Found stored auth, attempting to parse...');
          try {
            const authData = JSON.parse(storedAuth);
            console.log('🔐 Parsed auth data structure:', {
              hasUserData: !!authData.userData,
              hasTokens: !!authData.tokens,
              userRole: authData.userData?.role,
              userEmail: authData.userData?.email,
              hospitalId: authData.userData?.hospital?.id
            });
            
            if (authData.userData && authData.tokens) {
              console.log('🔐 ✅ RESTORING USER SESSION FROM LOCALSTORAGE');
              
              // IMPORTANT: Ensure we set these values SYNCHRONOUSLY to avoid race conditions
              // This ensures the auth state is immediately available to route guards
              setIsAuthenticated(true);
              setUserData(authData.userData);
              setNeedsVerification(false);
              setCurrentEmail(null);
              
              // Only clear session storage if we're fully authenticated
              sessionStorage.removeItem('org_auth_email');
              sessionStorage.removeItem('org_auth_needs_verification');
              
              // Persist the auth state in a more reliable storage method
              // This is a fallback in case localStorage is cleared or corrupted
              try {
                sessionStorage.setItem('org_auth_initialized', 'true');
                sessionStorage.setItem('org_auth_state', JSON.stringify({
                  isAuthenticated: true,
                  userData: authData.userData
                }));
              } catch (err) {
                console.warn('🔐 Failed to set backup session storage:', err);
              }
              
              setIsInitialized(true);
              setIsLoading(false);
              console.log('🔐 ✅ USER RESTORED SUCCESSFULLY');
              return;
            } else {
              console.warn('🔐 ⚠️ Invalid auth data structure:', {
                userDataExists: !!authData.userData,
                tokensExist: !!authData.tokens
              });
            }
          } catch (err) {
            console.warn('🔐 ❌ Failed to parse auth data:', err);
          }
        } else {
          // Check backup storage in session storage
          try {
            const backupState = sessionStorage.getItem('org_auth_state');
            if (backupState) {
              const parsedState = JSON.parse(backupState);
              if (parsedState.isAuthenticated && parsedState.userData) {
                console.log('🔐 Recovering from backup session storage');
                setIsAuthenticated(true);
                setUserData(parsedState.userData);
                setNeedsVerification(false);
                setCurrentEmail(null);
                setIsInitialized(true);
                setIsLoading(false);
                
                // Restore localStorage for future refreshes
                localStorage.setItem('organizationAuth', JSON.stringify({
                  userData: parsedState.userData,
                  tokens: { access: 'recovered-token', refresh: 'recovered-refresh' }
                }));
                
                console.log('🔐 ✅ USER RESTORED FROM BACKUP');
                return;
              }
            }
          } catch (err) {
            console.warn('🔐 Failed to check backup session storage:', err);
          }
          
          console.log('🔐 No stored auth found in localStorage');
        }

        // If not fully authenticated, check if we're in the middle of OTP verification
        const storedEmail = sessionStorage.getItem('org_auth_email');
        const needsVerify = sessionStorage.getItem('org_auth_needs_verification');
        
        if (storedEmail && needsVerify === 'true') {
          console.log('🔐 Resuming OTP verification for email:', storedEmail);
          setCurrentEmail(storedEmail);
          setNeedsVerification(true);
          setIsAuthenticated(false);
          setUserData(null);
        } else {
          // No auth data and no verification in progress
          console.log('🔐 No existing auth found, user needs to login');
          setIsAuthenticated(false);
          setUserData(null);
          setNeedsVerification(false);
          setCurrentEmail(null);
        }
      } catch (error) {
        console.error('🔐 ❌ Auth initialization error:', error);
        setError('Failed to initialize authentication');
        setIsAuthenticated(false);
        setUserData(null);
        setNeedsVerification(false);
        setCurrentEmail(null);
      } finally {
        setIsInitialized(true);
        setIsLoading(false);
        console.log('🔐 === AUTH INITIALIZATION COMPLETE ===');
      }
    };

    // Run immediately on mount, with no dependencies, to minimize synchronization issues
    initializeAuth();
  }, []); // Empty dependency array - only run once, no re-initialization

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
    console.log('🔐 Logging out user...');
    // Clear all auth-related storage
    localStorage.removeItem('organizationAuth');
    sessionStorage.removeItem('org_auth_email');
    sessionStorage.removeItem('org_auth_needs_verification');
    sessionStorage.removeItem('org_auth_timestamp');
    
    // Also clear backup auth state
    sessionStorage.removeItem('org_auth_initialized');
    sessionStorage.removeItem('org_auth_state');
    
    setIsAuthenticated(false);
    setUserData(null);
    setNeedsVerification(false);
    setCurrentEmail(null);
    setError(null);
  };

  // Add token validation function
  const validateToken = React.useCallback(async () => {
    const storedAuth = localStorage.getItem('organizationAuth');
    if (!storedAuth) return false;

    try {
      const authData = JSON.parse(storedAuth);
      if (!authData.userData || !authData.tokens?.access) {
        return false;
      }

      // TODO: Add actual token validation against backend
      // For now, just check if the token exists and userData is valid
      return !!(authData.userData.id && authData.userData.email && authData.userData.role);
    } catch (error) {
      console.error('🔐 Token validation error:', error);
      return false;
    }
  }, []);

  // Prevent automatic logout on page refresh
  const refreshTokenIfNeeded = React.useCallback(async () => {
    const isValid = await validateToken();
    if (!isValid && isAuthenticated) {
      console.warn('🔐 Invalid token detected, but not auto-logging out');
      // Don't automatically log out - let user try to use the app
      // They'll get proper error messages if APIs fail
    }
  }, [validateToken, isAuthenticated]);

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
      console.log('🔐 === 2FA VERIFICATION STARTING ===');
      console.log('🔐 Verifying 2FA for email:', email);
      
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

      const data = await response.json();
      console.log('🔐 2FA verification response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }
      
      if (!data.user_data || !data.tokens) {
        throw new Error('Invalid response from server');
      }

      // Store auth data in localStorage
      const authData = {
        userData: data.user_data,
        tokens: data.tokens
      };
      
      console.log('🔐 Storing auth data to localStorage:', {
        hasUserData: !!authData.userData,
        hasTokens: !!authData.tokens,
        userRole: authData.userData?.role,
        hospitalId: authData.userData?.hospital?.id
      });
      
      // Store in localStorage for primary persistence
      localStorage.setItem('organizationAuth', JSON.stringify(authData));
      
      // ALSO store in sessionStorage as a backup mechanism
      try {
        sessionStorage.setItem('org_auth_initialized', 'true');
        sessionStorage.setItem('org_auth_state', JSON.stringify({
          isAuthenticated: true,
          userData: data.user_data
        }));
      } catch (err) {
        console.warn('🔐 Failed to set backup session storage:', err);
      }
      
      // Verify it was stored correctly
      const storedCheck = localStorage.getItem('organizationAuth');
      console.log('🔐 Verification - localStorage write successful:', !!storedCheck);
      
      // Clear the verification state from sessionStorage
      sessionStorage.removeItem('org_auth_email');
      sessionStorage.removeItem('org_auth_needs_verification');
      sessionStorage.removeItem('org_auth_timestamp');
      
      // Update React state - IMPORTANT: Do this in the right order
      // Set these values SYNCHRONOUSLY to avoid race conditions
      setUserData(data.user_data);
      setIsAuthenticated(true);
      setNeedsVerification(false);
      setCurrentEmail(null);
      
      console.log('🔐 ✅ AUTHENTICATION SUCCESSFUL, USER LOGGED IN');
      console.log('🔐 === 2FA VERIFICATION COMPLETE ===');
      
    } catch (err) {
      if (err instanceof Error) {
        console.error('🔐 ❌ 2FA verification error:', err.message);
        setError(err.message);
      } else {
        console.error('🔐 ❌ Unexpected 2FA verification error');
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
    isInitialized,
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