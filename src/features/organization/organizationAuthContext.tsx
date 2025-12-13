import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createApiUrl } from '../../utils/config';

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
 * Organization Authentication Storage - SECURE IMPLEMENTATION
 *
 * SECURITY MODEL (HTTP-ONLY COOKIES):
 * ✅ JWT tokens stored in httpOnly cookies (XSS protected)
 * ✅ Cookies: 'access_token' and 'refresh_token' set by backend
 * ✅ Automatic token refresh every 25 minutes
 * ✅ Cookies sent automatically with every API request (credentials: 'include')
 * ✅ User data stored ONLY in React state (never in sessionStorage/localStorage)
 * ✅ No sensitive data in client-side storage (prevents XSS theft)
 *
 * WHAT'S STORED IN sessionStorage (Non-Sensitive):
 * - org_auth_email: Email for OTP verification flow only
 * - org_auth_needs_verification: Boolean flag for OTP UI state
 * - org_auth_timestamp: Timestamp for OTP flow tracking
 * - org_logout_flag: Flag to distinguish intentional logout vs session expiry
 *
 * SECURITY BENEFITS:
 * - httpOnly flag prevents JavaScript access (XSS protection)
 * - No userData in sessionStorage (prevents session hijacking)
 * - All user data fetched from backend (server is source of truth)
 * - Secure flag ensures HTTPS-only transmission in production
 * - SameSite=Lax prevents CSRF attacks
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
  // Track if refresh is in progress to prevent race conditions
  const refreshInProgressRef = React.useRef<boolean>(false);

  // Debug helper - expose auth state to window in development
  React.useEffect(() => {
    if (import.meta.env.DEV) {
      (window as any).getOrgAuthState = () => ({
        isAuthenticated,
        isLoading,
        isInitialized,
        needsVerification,
        hasUserData: !!userData,
        userEmail: userData?.email,
        organizationName: userData?.hospital?.name || userData?.ngo?.name || userData?.pharmacy?.name,
        lastAuthTime: new Date(lastAuthTime).toISOString()
      });
    }
  }, [isAuthenticated, isLoading, isInitialized, needsVerification, userData, lastAuthTime]);

  // Token refresh function with proper error handling and race condition prevention
  const refreshAccessToken = React.useCallback(async (): Promise<boolean> => {
    // Prevent duplicate refresh requests
    if (refreshInProgressRef.current) {
      console.log('⏭️ Organization: Token refresh already in progress, skipping');
      return false;
    }

    refreshInProgressRef.current = true;

    try {
      console.log('🔄 Organization: Attempting to refresh access token...');
      const response = await fetch(createApiUrl('api/token/refresh/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send httpOnly cookies
      });

      // Log response details for debugging
      console.log(`📡 Organization: Token refresh response - Status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        // Parse error details from response
        let errorMessage = 'Token refresh failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.detail || errorMessage;
        } catch {
          // Response not JSON, use status text
          errorMessage = response.statusText;
        }

        console.error(`❌ Organization: Token refresh failed - ${response.status}: ${errorMessage}`);

        // Handle expired refresh tokens (401/403) by logging out
        if (response.status === 401 || response.status === 403) {
          console.log('🔒 Organization: Refresh token expired or invalid - logging out user');

          // Clear auth state
          setIsAuthenticated(false);
          setUserData(null);
          setNeedsVerification(false);
          setCurrentEmail(null);

          // Clear session storage (OTP-related only)
          sessionStorage.removeItem('org_auth_email');
          sessionStorage.removeItem('org_auth_needs_verification');
          sessionStorage.removeItem('org_auth_timestamp');

          // Clear localStorage tracking
          localStorage.removeItem('org_last_token_refresh');

          // Show user-friendly message
          console.warn('⚠️ Your session has expired. Please log in again.');
        }

        refreshInProgressRef.current = false;
        return false;
      }

      // Parse successful response
      const data = await response.json();

      if (data.status === 'success') {
        console.log('✅ Organization: Token refresh successful');
        const now = Date.now();
        setLastAuthTime(now);
        // Only update localStorage once, not in setupTokenRefreshTimer
        localStorage.setItem('org_last_token_refresh', now.toString());
        refreshInProgressRef.current = false;
        return true;
      }

      console.error('❌ Organization: Token refresh returned non-success status:', data);
      refreshInProgressRef.current = false;
      return false;

    } catch (err: any) {
      console.error('❌ Organization: Token refresh network error:', err);

      // Network errors don't necessarily mean expired token
      // User might have lost internet connection
      console.warn('⚠️ Network error during token refresh. Will retry on next trigger.');

      refreshInProgressRef.current = false;
      return false;
    }
  }, []);

  // Setup token refresh timer with retry logic
  const setupTokenRefreshTimer = React.useCallback(() => {
    // Clear any existing timer
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
      console.log('🔄 Organization: Cleared existing refresh timer');
    }

    const REFRESH_INTERVAL = 25 * 60 * 1000; // 25 minutes

    // Don't set localStorage here - only after actual refresh succeeds
    // This prevents timestamp drift between timer setup and actual refresh

    console.log('⏰ Organization: Setting up token refresh timer (will refresh in 25 minutes)');
    console.log(`⏰ Next refresh scheduled at: ${new Date(Date.now() + REFRESH_INTERVAL).toLocaleTimeString()}`);

    refreshTimerRef.current = setTimeout(async () => {
      console.log('⏰ Organization: Token refresh timer triggered');
      const success = await refreshAccessToken();
      if (success) {
        // Reschedule only if refresh succeeded
        console.log('✅ Organization: Refresh succeeded, rescheduling timer');
        setupTokenRefreshTimer();
      } else {
        // If refresh failed, check if user is still authenticated
        // If yes, retry in 1 minute (might be temporary network issue)
        // If no, user was logged out (expired refresh token)
        if (isAuthenticated) {
          console.warn('⚠️ Organization: Refresh failed but user still authenticated, retrying in 1 minute');
          refreshTimerRef.current = setTimeout(async () => {
            const retrySuccess = await refreshAccessToken();
            if (retrySuccess) setupTokenRefreshTimer();
          }, 60 * 1000); // Retry in 1 minute
        } else {
          console.log('🔒 Organization: User logged out, not rescheduling timer');
        }
      }
    }, REFRESH_INTERVAL);
  }, [refreshAccessToken, isAuthenticated]);

  // Cleanup refresh timer on unmount
  React.useEffect(() => {
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  // Handle page visibility and focus changes - refresh token when user returns to tab
  React.useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (!isAuthenticated) return;

      const lastRefresh = localStorage.getItem('org_last_token_refresh');
      const REFRESH_THRESHOLD = 15 * 60 * 1000; // 15 minutes (more aggressive)

      if (lastRefresh) {
        const timeSinceRefresh = Date.now() - parseInt(lastRefresh);
        if (timeSinceRefresh >= REFRESH_THRESHOLD) {
          console.log(`⏰ Organization: Tab became active after ${Math.round(timeSinceRefresh / 60000)} minutes, refreshing token...`);

          // refreshAccessToken has its own mutex to prevent race conditions
          const success = await refreshAccessToken();

          if (success) {
            // Reset the timer after successful refresh
            setupTokenRefreshTimer();
          }
        } else {
          console.log(`⏰ Organization: Tab became active, but token was refreshed ${Math.round(timeSinceRefresh / 60000)} minutes ago (threshold: 15 min)`);
        }
      } else {
        // No last refresh timestamp - refresh immediately to be safe
        console.log('⏰ Organization: Tab became active with no refresh timestamp, refreshing immediately...');
        const success = await refreshAccessToken();
        if (success) {
          setupTokenRefreshTimer();
        }
      }
    };

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible') {
        await checkAndRefreshToken();
      }
    };

    const handleFocus = async () => {
      await checkAndRefreshToken();
    };

    // Listen to both visibility change and focus events for better coverage
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isAuthenticated, refreshAccessToken, setupTokenRefreshTimer]);

  // Activity-based token refresh - refresh on user interaction if token is getting old
  React.useEffect(() => {
    const handleUserActivity = async () => {
      if (!isAuthenticated) return;

      const lastRefresh = localStorage.getItem('org_last_token_refresh');
      const ACTIVITY_REFRESH_THRESHOLD = 15 * 60 * 1000; // 15 minutes (more aggressive)

      if (lastRefresh) {
        const timeSinceRefresh = Date.now() - parseInt(lastRefresh);
        if (timeSinceRefresh >= ACTIVITY_REFRESH_THRESHOLD) {
          console.log(`⏰ Organization: User activity detected after ${Math.round(timeSinceRefresh / 60000)} minutes, refreshing token...`);

          // refreshAccessToken has its own mutex to prevent race conditions
          const success = await refreshAccessToken();

          if (success) {
            // Reset the timer after successful refresh
            setupTokenRefreshTimer();
          }
        }
      }
    };

    // Throttle activity checks to avoid excessive calls
    let activityTimeout: NodeJS.Timeout;
    const throttledActivity = () => {
      if (activityTimeout) clearTimeout(activityTimeout);
      activityTimeout = setTimeout(handleUserActivity, 5000); // Check 5 seconds after activity stops
    };

    // Listen for user interactions
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, throttledActivity, { passive: true }); // Add passive for performance
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, throttledActivity);
      });
      if (activityTimeout) clearTimeout(activityTimeout);
    };
  }, [isAuthenticated, refreshAccessToken, setupTokenRefreshTimer]);

  // Check if user is already logged in on mount or if OTP verification is in progress
  useEffect(() => {
    const initializeAuth = async () => {
      // Prevent multiple initializations
      if (isInitialized) {
        return;
      }

      try {
        setIsLoading(true);

        // Check if this is right after an intentional logout
        const logoutFlag = sessionStorage.getItem('org_logout_flag');
        if (logoutFlag === 'true') {
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
        // If the user is not an organization user, this will fail silently (404)
        try {
          const profileUrl = createApiUrl('api/hospitals/admin/profile/');

          const response = await fetch(profileUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Send cookies with request
          });

          if (response.ok) {
            const profileData = await response.json();

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

            // Check if token needs immediate refresh based on last refresh time
            const lastRefresh = localStorage.getItem('org_last_token_refresh');
            const REFRESH_THRESHOLD = 15 * 60 * 1000; // 15 minutes - refresh if it's been this long

            if (lastRefresh) {
              const timeSinceRefresh = Date.now() - parseInt(lastRefresh);
              if (timeSinceRefresh >= REFRESH_THRESHOLD) {
                console.log('⏰ Organization: Token is old, refreshing immediately...');
                await refreshAccessToken();
              }
            } else {
              // No timestamp means we don't know when it was last refreshed
              // Refresh proactively to ensure valid token
              console.log('⏰ Organization: No refresh timestamp found, refreshing proactively...');
              await refreshAccessToken();
            }

            // Setup automatic token refresh
            setupTokenRefreshTimer();

            console.log('🔐 ✅ ORGANIZATION USER RESTORED SUCCESSFULLY');
          } else {
            // Profile endpoint failed - user might not be an organization user
            // or cookies might be invalid/expired
            console.log('🔐 Profile endpoint returned non-OK status:', response.status);

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
              setIsAuthenticated(false);
              setUserData(null);
              setNeedsVerification(false);
              setCurrentEmail(null);
            }
          }
        } catch (fetchError) {
          // Profile endpoint network error or other failure
          console.error('🔐 Profile endpoint fetch error:', fetchError);

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
            // No auth data available
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

    // Run immediately on mount
    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const login = async (email: string, password: string, hospital_code: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    console.log('Starting login process for hospital admin');
    
    try {
      const response = await fetch(createApiUrl('api/hospitals/admin/login/'), {
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
      await fetch(createApiUrl('api/logout/'), {
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

    // Clear all auth-related session storage (OTP-related only)
    sessionStorage.removeItem('org_auth_email');
    sessionStorage.removeItem('org_auth_needs_verification');
    sessionStorage.removeItem('org_auth_timestamp');

    // Clear token refresh tracking from localStorage
    localStorage.removeItem('org_last_token_refresh');

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
      
      const response = await fetch(createApiUrl('api/hospitals/admin/verify-2fa/'), {
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
      const response = await fetch(createApiUrl('api/hospitals/admin/reset-password/request/'), {
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
      
      const response = await fetch(createApiUrl('api/hospitals/admin/reset-password/verify/'), {
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
      const response = await fetch(createApiUrl('api/hospitals/admin/reset-password/complete/'), {
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