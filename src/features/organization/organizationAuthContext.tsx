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

/**
 * Organization Authentication Storage
 *
 * MIGRATED TO HTTPONLY COOKIES:
 * - JWT tokens now stored in httpOnly cookies (XSS protected)
 * - Cookies: 'access_token' and 'refresh_token'
 * - Automatic token refresh every 25 minutes
 * - Cookies sent automatically with every API request (credentials: 'include')
 * - User data stored in React state (not localStorage)
 */
export const OrganizationAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start with loading true
  const [needsVerification, setNeedsVerification] = useState<boolean>(false);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [lastAuthTime, setLastAuthTime] = useState<number>(Date.now());
  const refreshTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  // Token refresh function
  const refreshAccessToken = React.useCallback(async (): Promise<boolean> => {
    try {
      console.log('🔄 Organization: Attempting to refresh access token...');
      const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies with request
      });

      if (!response.ok) {
        console.error('❌ Organization: Token refresh failed');
        return false;
      }

      const data = await response.json();
      if (data.status === 'success') {
        console.log('✅ Organization: Token refresh successful');
        setLastAuthTime(Date.now());
        return true;
      }

      return false;
    } catch (err: any) {
      console.error('❌ Organization: Token refresh error:', err);
      if (err.status === 401 || err.status === 403) {
        console.log('🔒 Organization: Refresh token expired - logging out user');
        setIsAuthenticated(false);
        setUserData(null);
        setNeedsVerification(false);
        setCurrentEmail(null);
        sessionStorage.removeItem('org_auth_email');
        sessionStorage.removeItem('org_auth_needs_verification');
      }
      return false;
    }
  }, []);

  // Setup token refresh timer
  const setupTokenRefreshTimer = React.useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    const REFRESH_INTERVAL = 25 * 60 * 1000; // 25 minutes (5 min before 30-min expiry)
    console.log('⏰ Organization: Setting up token refresh timer (will refresh in 25 minutes)');

    refreshTimerRef.current = setTimeout(async () => {
      console.log('⏰ Organization: Token refresh timer triggered');
      const success = await refreshAccessToken();
      if (success) {
        setupTokenRefreshTimer(); // Set up next refresh
      }
    }, REFRESH_INTERVAL);
  }, [refreshAccessToken]);

  // Cleanup refresh timer on unmount
  React.useEffect(() => {
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  // Check if user is already logged in on mount or if OTP verification is in progress
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔐 === ORGANIZATION AUTH INITIALIZATION STARTING ===');

      // Prevent multiple initializations
      if (isInitialized) {
        console.log('🔐 Organization auth already initialized, skipping...');
        return;
      }

      try {
        setIsLoading(true);

        // Check if this is right after an intentional logout
        const logoutFlag = sessionStorage.getItem('org_logout_flag');
        if (logoutFlag === 'true') {
          console.log('🔐 Organization: Clean logout detected, skipping auth check');
          sessionStorage.removeItem('org_logout_flag');
          setIsAuthenticated(false);
          setUserData(null);
          setNeedsVerification(false);
          setCurrentEmail(null);
          setIsLoading(false);
          setIsInitialized(true);
          return;
        }

        // Check authentication status by calling the backend
        // The backend will check the httpOnly cookies automatically
        console.log('🔐 Checking authentication status with backend...');

        try {
          const response = await fetch('http://127.0.0.1:8000/api/organizations/profile/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Send cookies with request
          });

          if (response.ok) {
            const profileData = await response.json();
            console.log('🔐 ✅ ORGANIZATION USER AUTHENTICATED VIA COOKIES');
            console.log('🔐 Profile data:', profileData);

            // Map the profile data to UserData format
            const userData: UserData = {
              id: profileData.id || profileData.user_id,
              email: profileData.email,
              full_name: profileData.full_name || profileData.name || '',
              role: profileData.role || 'hospital_admin',
              is_verified: profileData.is_verified || true,
              position: profileData.position || 'Administrator',
              hospital: profileData.hospital
            };

            setIsAuthenticated(true);
            setUserData(userData);
            setNeedsVerification(false);
            setCurrentEmail(null);
            setLastAuthTime(Date.now());

            // Clear session storage for OTP verification
            sessionStorage.removeItem('org_auth_email');
            sessionStorage.removeItem('org_auth_needs_verification');

            // Setup automatic token refresh
            setupTokenRefreshTimer();

            console.log('🔐 ✅ ORGANIZATION USER RESTORED SUCCESSFULLY');
          } else {
            console.log('🔐 No valid authentication found (401/403)');

            // Check if we're in the middle of OTP verification
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
          }
        } catch (fetchError) {
          console.log('🔐 Error checking auth status:', fetchError);

          // Check if we're in the middle of OTP verification
          const storedEmail = sessionStorage.getItem('org_auth_email');
          const needsVerify = sessionStorage.getItem('org_auth_needs_verification');

          if (storedEmail && needsVerify === 'true') {
            console.log('🔐 Resuming OTP verification for email:', storedEmail);
            setCurrentEmail(storedEmail);
            setNeedsVerification(true);
            setIsAuthenticated(false);
            setUserData(null);
          } else {
            setIsAuthenticated(false);
            setUserData(null);
            setNeedsVerification(false);
            setCurrentEmail(null);
          }
        }
      } catch (error) {
        console.error('🔐 ❌ Organization auth initialization error:', error);
        setError('Failed to initialize authentication');
        setIsAuthenticated(false);
        setUserData(null);
        setNeedsVerification(false);
        setCurrentEmail(null);
      } finally {
        setIsInitialized(true);
        setIsLoading(false);
        console.log('🔐 === ORGANIZATION AUTH INITIALIZATION COMPLETE ===');
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
      
      // Note: For real implementation, backend would set cookies
      // For now with mock data, just set the state
      setIsAuthenticated(true);
      setUserData(mockUserData);
      setLastAuthTime(Date.now());

      // Setup automatic token refresh (even for mock)
      setupTokenRefreshTimer();
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

  const logout = async (): Promise<void> => {
    console.log('🔐 Organization: Logging out user...');

    // Set flag to indicate this is an intentional logout (not session expiry)
    sessionStorage.setItem('org_logout_flag', 'true');

    // Clear the refresh timer
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    // Call backend logout endpoint to clear cookies
    try {
      await fetch('http://127.0.0.1:8000/api/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies with request
      });
      console.log('✅ Organization: Logout request successful - cookies cleared by backend');
    } catch (err) {
      console.error('❌ Organization: Error during logout API call:', err);
    }

    // Clear all auth-related session storage
    sessionStorage.removeItem('org_auth_email');
    sessionStorage.removeItem('org_auth_needs_verification');
    sessionStorage.removeItem('org_auth_timestamp');
    sessionStorage.removeItem('org_auth_initialized');
    sessionStorage.removeItem('org_auth_state');

    // Update state
    setIsAuthenticated(false);
    setUserData(null);
    setNeedsVerification(false);
    setCurrentEmail(null);
    setError(null);
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
        }),
        credentials: 'include', // Ensure cookies are sent/received
      });

      const data = await response.json();
      console.log('🔐 2FA verification response:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Verification failed');
      }
      
      if (!data.user_data) {
        throw new Error('Invalid response from server');
      }

      console.log('🔐 User data received from backend:', {
        hasUserData: !!data.user_data,
        userRole: data.user_data?.role,
        hospitalId: data.user_data?.hospital?.id
      });

      console.log('🔐 ✅ Cookies have been set by backend automatically');

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
      setLastAuthTime(Date.now());

      // Setup automatic token refresh
      setupTokenRefreshTimer();

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