import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback, useRef } from 'react';
import { API_BASE_URL } from '../../utils/config';

// Define types for our user and auth context
interface User {
  id: string;
  full_name: string;
  email: string;
  hpn?: string;
  gender?: string;
  date_of_birth?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  nin?: string;
  ssn?: string;
  has_completed_onboarding?: boolean;
  address?: string;
  phone?: string;
  contactPreferences?: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    appointmentReminders: boolean;
    healthTips: boolean;
    serviceUpdates: boolean;
    researchParticipation: boolean;
  };
  is_verified?: boolean;
  role?: string;
  primaryHospital?: Hospital;
}

// New interface for hospital data
interface Hospital {
  id: number;
  name: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  region?: string;
  registration_date?: string;
  status?: string;
  available?: boolean;
}

// New interface for primary hospital registration response
interface PrimaryHospitalResponse {
  has_primary: boolean;
  primary_hospital?: Hospital;
}

interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  gender?: string;
  date_of_birth?: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  nin?: string;
  ssn?: string;
  preferred_language?: string;
  secondary_languages?: string[];
  custom_language?: string;
  consent_terms?: boolean;
  consent_hipaa?: boolean;
  consent_data_processing?: boolean;
}

interface UserProfileUpdateData {
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  date_of_birth?: string;
  gender?: string;
  preferred_language?: string;
  secondary_languages?: string[];
  custom_language?: string;
}

interface ContactPreferencesData {
  emailNotifications: boolean;
  smsNotifications: boolean;
  appointmentReminders: boolean;
  healthTips: boolean;
  serviceUpdates: boolean;
  researchParticipation: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isNewUser: boolean;
  needsOnboarding: boolean;
  completeOnboarding: () => Promise<{ success: boolean; message: string }>;
  login: (email: string, password: string, captchaToken?: string, captchaAnswer?: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    data: RegisterData
  ) => Promise<void>;
  error: string | null;
  clearError: () => void;
  // OTP-related properties
  otpVerificationRequired: boolean;
  verifyOTP: (otp: string, email?: string) => Promise<void>;
  resendOTP: (email?: string) => Promise<void>;
  otpError: string | null;
  pendingUser: User | null;
  createTestUser: () => User;
  // New functions for account management
  updateUserProfile: (data: UserProfileUpdateData) => Promise<void>;
  updateContactPreferences: (preferences: ContactPreferencesData) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<{ success: boolean; message: string }>;
  // Password reset functions
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message: string }>;
  confirmPasswordReset: (token: string, newPassword: string, confirmPassword: string) => Promise<{ success: boolean; message: string }>;
  // New functions for hospital selection and registration
  checkPrimaryHospital: () => Promise<PrimaryHospitalResponse>;
  fetchNearbyHospitals: (latitude: number, longitude: number, radius?: number) => Promise<{ hospitals: Hospital[]; message?: string; location?: { latitude: number; longitude: number; radius_km: number; } }>;
  fetchAllHospitals: () => Promise<Hospital[]>;
  searchHospitals: (query: string, options?: { state?: string; city?: string; limit?: number }) => Promise<Hospital[]>;
  registerWithHospital: (hospitalId: number, isPrimary?: boolean) => Promise<{ message: string; data: any }>;
  primaryHospital: Hospital | null;
  hasPrimaryHospital: boolean;
  primaryHospitalStatus: 'pending' | 'approved' | 'rejected' | null;
  // Doctor role check - check both role and hpn for reliability
  isDoctor: boolean;
  // CAPTCHA-related properties
  captchaRequired: boolean;
  captchaChallenge: string;
  captchaToken: string;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Authentication Token Storage
 *
 * CURRENT IMPLEMENTATION (httpOnly Cookies):
 * - JWT tokens are stored in httpOnly cookies (set by backend)
 * - Cookies are automatically sent with requests (credentials: 'include')
 * - Inaccessible to JavaScript code (XSS protection)
 * - SameSite=Lax prevents CSRF attacks
 *
 * SECURITY BENEFITS:
 * - httpOnly flag prevents JavaScript access (XSS protection)
 * - Automatic token refresh via cookie-based endpoint
 * - Secure flag ensures HTTPS-only transmission in production
 * - Backwards compatible with Authorization header during migration
 *
 * @see {@link https://owasp.org/www-community/attacks/xss/ XSS Attack Information}
 * @see {@link thoughts/shared/research/2025-10-18-cookie-usage.md Cookie Research}
 * @see {@link thoughts/shared/plans/2025-10-18-httponly-cookie-migration.md Migration Plan}
 */

// Helper function for making API calls with cookie-based authentication
async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  body?: any,
  _legacyToken?: string | null // Kept for backwards compatibility, not used
): Promise<T> {
  // Ensure exactly one slash between base URL and endpoint
  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // NOTE: Authorization header no longer needed - cookies sent automatically
  // Backend's JWTCookieAuthentication checks cookies first, then falls back to headers

  const config: RequestInit = {
    method,
    headers,
    credentials: 'include', // CRITICAL: Send cookies with every request
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    // Handle cases where the response might be empty (e.g., 204 No Content)
    if (response.status === 204) {
        // Assuming T can accommodate null or undefined for empty responses if necessary
        // Or return a specific marker object/value if T cannot be null/undefined
        return null as T; // Adjust as needed based on expected return types for 204
    }

    const data = await response.json();

    if (!response.ok) {
      // Throw an error object that includes status and message
      const error: any = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data; // Attach full response data if needed
      throw error;
    }

    return data as T;
  } catch (error) {
    console.error(`API request failed: ${method} ${endpoint}`, error);
    // Re-throw the error so it can be caught by the calling function
    throw error;
  }
}

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [pendingUser, setPendingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpVerificationRequired, setOtpVerificationRequired] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [pendingRememberMe, setPendingRememberMe] = useState<boolean>(false);
  // New state variables for hospital functionality
  const [primaryHospital, setPrimaryHospital] = useState<Hospital | null>(null);
  const [hasPrimaryHospital, setHasPrimaryHospital] = useState<boolean>(false);
  const [primaryHospitalStatus, setPrimaryHospitalStatus] = useState<'pending' | 'approved' | 'rejected' | null>(null);
  // CAPTCHA-related state
  const [captchaRequired, setCaptchaRequired] = useState(false);
  const [captchaChallenge, setCaptchaChallenge] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  // Token refresh state - track when we last authenticated
  const [lastAuthTime, setLastAuthTime] = useState<number | null>(null);
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Add a reference to track the last API call time and parameters
  const lastApiCall = useRef<{
    endpoint: string;
    params: any;
    timestamp: number;
  } | null>(null);

  // Add cache for hospital data with support for multiple search queries
  const hospitalCache = useRef<{
    searches: Record<string, { hospitals: Hospital[]; timestamp: number }>;
    nearbyHospitals: { hospitals: Hospital[]; location?: any; timestamp: number } | null;
  }>({
    searches: {},
    nearbyHospitals: null
  });

  // Helper to throttle API calls
  const shouldThrottleApiCall = (endpoint: string, params: any, throttleMs: number = 500) => {
    const now = Date.now();

    if (lastApiCall.current &&
        lastApiCall.current.endpoint === endpoint &&
        JSON.stringify(lastApiCall.current.params) === JSON.stringify(params) &&
        now - lastApiCall.current.timestamp < throttleMs) {
      return true; // Should throttle
    }

    // Update the last API call reference
    lastApiCall.current = {
      endpoint,
      params,
      timestamp: now
    };

    return false; // Should not throttle
  };

  // Function to refresh access token using refresh token from cookies
  const refreshAccessToken = useCallback(async (): Promise<boolean> => {
    try {
      console.log('🔄 Attempting to refresh access token...');

      // Call the cookie-based token refresh endpoint
      const response = await apiRequest<{
        status?: string;
        message?: string;
        tokens?: {
          access?: string;
          refresh?: string;
        }
      }>(
        '/api/token/refresh/',
        'POST'
      );

      if (response.status === 'success') {
        console.log('✅ Token refresh successful');
        // Update last auth time to reset the refresh timer
        setLastAuthTime(Date.now());
        return true;
      } else {
        console.warn('⚠️ Token refresh failed:', response.message);
        return false;
      }
    } catch (err: any) {
      console.error('❌ Token refresh error:', err);

      // If refresh fails with 401, user needs to login again
      if (err.status === 401 || err.status === 403) {
        console.log('🔒 Refresh token expired - logging out user');

        // Check if this is right after an intentional logout
        const logoutFlag = sessionStorage.getItem('phb_logout_flag');
        if (logoutFlag !== 'true') {
          // Only show error if this isn't an intentional logout
          setError("Your session has expired. Please log in again.");
        }

        setUser(null);
        setPrimaryHospital(null);
        setHasPrimaryHospital(false);
        setPrimaryHospitalStatus(null);
      }

      return false;
    }
  }, []);

  // Setup automatic token refresh timer
  const setupTokenRefreshTimer = useCallback(() => {
    // Clear any existing timer
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    // Set timer to refresh 5 minutes before expiry (25 minutes from now)
    // Access tokens expire in 30 minutes
    const REFRESH_INTERVAL = 25 * 60 * 1000; // 25 minutes in milliseconds

    console.log('⏰ Setting up token refresh timer (will refresh in 25 minutes)');

    refreshTimerRef.current = setTimeout(async () => {
      console.log('⏰ Token refresh timer triggered');
      const success = await refreshAccessToken();

      if (success) {
        // If refresh successful, setup next refresh
        setupTokenRefreshTimer();
      }
    }, REFRESH_INTERVAL);
  }, [refreshAccessToken]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  // Check for existing authentication on initial load
  // NOTE: No need to check localStorage - cookies are sent automatically
  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // Check if this is right after an intentional logout
    const logoutFlag = sessionStorage.getItem('phb_logout_flag');
    if (logoutFlag === 'true') {
      console.log('🔐 Clean logout detected, skipping auth check');
      sessionStorage.removeItem('phb_logout_flag');
      setUser(null);
      setPrimaryHospital(null);
      setHasPrimaryHospital(false);
      setError(null); // Clear any error messages from logout
      setIsLoading(false);
      return;
    }

    try {
      // Cookies are sent automatically with credentials: 'include'
      // If user has valid cookies, profile will be returned
      const userData = await apiRequest<User>('/api/profile/', 'GET');
        
        // Log the user data and onboarding status
        // User profile data loaded successfully
        
        // Create a mutable copy of userData to add role if needed
        let userDataWithRole = {...userData};
        
        // Make sure the role field is preserved - check if we need to add the role field
        if (userData && userData.hpn && !userData.role) {
          // If user has HPN but no role, they're likely a doctor - fetch their role
          try {
            const roleResponse = await apiRequest<{role?: string}>(
              '/api/user/role/',
              'GET',
              undefined,
              token
            );
            
            // If role exists in response, update the user data
            if (roleResponse && roleResponse.role) {
              userDataWithRole.role = roleResponse.role;
            } else if (userData.hpn) {
              // As a fallback for doctor users with HPN
              userDataWithRole.role = 'doctor'; // Set default role for users with HPN
            }
            
            // Updated user data with role
          } catch (roleErr) {
            console.error('Error fetching user role:', roleErr);
            // Fallback if we can't fetch the role
            if (userData.hpn) {
              userDataWithRole.role = 'doctor';
              // Set fallback role for user with HPN
            }
          }
        }
        
        setUser(userDataWithRole);

        // Setup automatic token refresh timer
        setLastAuthTime(Date.now());
        setupTokenRefreshTimer();

        // Check if user has a primary hospital after successful authentication
        // But only if we haven't already loaded this information
        if (!hasPrimaryHospital && !primaryHospital) {
          try {
            const hospitalData = await apiRequest<PrimaryHospitalResponse>(
              '/api/user/has-primary-hospital/',
              'GET'
            );

            // Only update if values have changed to prevent re-renders
            const hasPrimaryChanged = hospitalData.has_primary !== hasPrimaryHospital;
            const hospitalChanged = JSON.stringify(hospitalData.primary_hospital) !== JSON.stringify(primaryHospital);
            // Primary hospital status updated
            if (hasPrimaryChanged || hospitalChanged) {
              setHasPrimaryHospital(hospitalData.has_primary);
              setPrimaryHospital(hospitalData.primary_hospital || null);
            }
          } catch (hospitalErr) {
            console.error('Error checking primary hospital:', hospitalErr);
            // Don't fail the entire auth check if hospital check fails
          }
        }
      } catch (err: any) {
        console.error('Authentication check failed:', err);
        // Cookies are invalid or expired - clear user state
        // Backend will clear cookies on 401/403 responses
        const hadValidSession = user !== null;
        setUser(null);
        setPrimaryHospital(null);
        setHasPrimaryHospital(false);
        setPrimaryHospitalStatus(null);
        // Clear refresh timer
        if (refreshTimerRef.current) {
          clearTimeout(refreshTimerRef.current);
          refreshTimerRef.current = null;
        }
        // Only show session expired message if user had a valid session before
        if (hadValidSession && (err.status === 401 || err.status === 403)) {
          setError("Your session has expired. Please log in again.");
        }
      }
    setIsLoading(false);
  }, [hasPrimaryHospital, primaryHospital, setupTokenRefreshTimer]); // Add these as dependencies

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]); // Run once on mount

  const handleAuthSuccess = (userData: User) => {
      // Authentication successful

      // Make sure the role field is preserved in the user data
      const updatedUserData = {
        ...userData,
        role: userData.role // Explicitly preserve the role field
      };

      setUser(updatedUserData);
      // NOTE: No need to store tokens - they're in httpOnly cookies set by backend
      setOtpVerificationRequired(false);
      setPendingEmail(null);
      setError(null);
      setOtpError(null);
      setIsLoading(false);

      // Setup automatic token refresh timer
      setLastAuthTime(Date.now());
      setupTokenRefreshTimer();

      // Debug log after setting user
      setTimeout(() => {
        // User state updated
      }, 100);
  };

  // Login function
  const login = async (email: string, password: string, captchaToken?: string, captchaAnswer?: string, rememberMe?: boolean) => {
    setError(null);
    setOtpError(null);
    setIsLoading(true);
    setOtpVerificationRequired(false); // Reset OTP state
    setPendingEmail(null);

    // Reset CAPTCHA state if not being used in this request
    if (!captchaToken) {
      setCaptchaRequired(false);
      setCaptchaChallenge('');
      setCaptchaToken('');
    }

    try {
      // Prepare login payload
      // Using 'email' field as required by the backend
      const loginPayload: any = { email, password };

      // Add CAPTCHA data if provided
      if (captchaToken && captchaAnswer) {
        loginPayload.captcha_token = captchaToken;
        loginPayload.captcha_answer = captchaAnswer;
      }

      // Add remember_me flag if provided (extends cookie lifetime to 30 days)
      if (rememberMe) {
        loginPayload.remember_me = true;
      }
      
      // Make API request to the login endpoint
      // IMPORTANT: We're using /api/login/ for the main auth flow, which triggers OTP
      // The CAPTCHA challenge is implemented on this endpoint as well
      const response = await apiRequest<{ 
        user?: User; 
        token?: string; 
        otpRequired?: boolean; 
        require_otp?: boolean; // Backend uses this field name
        status?: string; // Backend may return 'pending' for OTP flow
        message?: string;
        detail?: string;
        captcha_required?: boolean;
        captcha_challenge?: string;
        captcha_token?: string;
        access?: string;
        refresh?: string;
      }>('/api/login/', 'POST', loginPayload);

      // Handle CAPTCHA challenge response
      if (response.captcha_required) {
        setCaptchaRequired(true);
        setCaptchaChallenge(response.captcha_challenge || '');
        setCaptchaToken(response.captcha_token || '');
        setError(response.message || 'CAPTCHA verification required due to multiple failed attempts.');
        return;
      }

      // Check 1: Explicit OTP required flag from backend (using either field name)
      if (response.otpRequired || response.require_otp || (response.status === 'pending')) {
        setOtpVerificationRequired(true);
        setPendingEmail(email);
        setPendingRememberMe(rememberMe || false); // Store rememberMe for OTP verification
        setUser(null);
        setError(response.message || "OTP verification required."); // Show message if available
      }
      // Check 2: Direct login success with user data
      // NOTE: Tokens are in cookies, so we only need user data from response
      else if (response.user) {
        handleAuthSuccess(response.user);

        // Check if user has a primary hospital after successful login
        // Only if we haven't already loaded this information
        if (!hasPrimaryHospital && !primaryHospital) {
          try {
            const hospitalData = await apiRequest<PrimaryHospitalResponse>(
              '/api/user/has-primary-hospital/',
              'GET'
            );

            // Only update if values have changed
            const hasPrimaryChanged = hospitalData.has_primary !== hasPrimaryHospital;
            const hospitalChanged = JSON.stringify(hospitalData.primary_hospital) !== JSON.stringify(primaryHospital);

            if (hasPrimaryChanged || hospitalChanged) {
              setHasPrimaryHospital(hospitalData.has_primary);
              setPrimaryHospital(hospitalData.primary_hospital || null);
            }
          } catch (hospitalErr) {
            console.error('Error checking primary hospital after login:', hospitalErr);
            // Don't fail the login if hospital check fails
          }
        }
      }
      // Check 3: No user data in response -> Assume OTP required (common pattern)
      else {
        console.log("Login successful, but no user data received. Assuming OTP is required.");
        setOtpVerificationRequired(true);
        setPendingEmail(email);
        setPendingRememberMe(rememberMe || false); // Store rememberMe for OTP verification
        setUser(null);
        setError(response.message || "OTP verification required."); // Show message if available
      }

    } catch (err: any) {
      console.error("Login failed:", err);
      
      // Handle CAPTCHA challenge (403 Forbidden)
      if (err.status === 403 && err.data) {
        const data = err.data;
        if (data.captcha_required) {
          setCaptchaRequired(true);
          setCaptchaChallenge(data.captcha_challenge || '');
          setCaptchaToken(data.captcha_token || '');
          setError(data.detail || 'CAPTCHA verification required due to multiple failed attempts.');
          return;
        }
      }
      
      // Handle rate limiting (429 Too Many Requests)
      if (err.status === 429) {
        // Show user-friendly rate limit message
        setError('Too many login attempts. Please wait a moment before trying again.');
        return;
      }
      
      // Handle other errors
      setError(err.message || 'Login failed. Please check your credentials.');
      setUser(null);
      // NOTE: Cookies are cleared by backend on error responses
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (data: RegisterData) => {
    setError(null);
    setOtpError(null);
    setIsLoading(true);
    setOtpVerificationRequired(false);
    setPendingEmail(null);

    try {
      // Assuming '/api/registration/' endpoint
      const response = await apiRequest<{ message: string; otpRequired?: boolean }>('/api/registration/', 'POST', data);

      if (response.otpRequired) {
         setOtpVerificationRequired(true);
         setPendingEmail(data.email); // Store email for OTP step
         // Potentially show response.message to user (e.g., "Registration successful, please check your email for OTP")
         setError(response.message || "Registration successful. Please verify your email."); // Use error state for feedback
      } else {
         // Handle cases where registration might directly log in (less common)
         // Or just show a success message
         setError(response.message || "Registration successful. You can now log in."); // Use error state for feedback
      }
       setUser(null); // User needs to verify or log in
       // NOTE: No tokens in localStorage - cookies handled by backend

    } catch (err: any) {
      console.error("Registration failed:", err);
      setError(err.message || 'Registration failed. Please try again.');
       setUser(null);
       // NOTE: Cookies cleared by backend on error
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP function
  const verifyOTP = async (otp: string, email?: string) => {
      const verificationEmail = email || pendingEmail; // Use provided email or the one stored after login/register
      if (!verificationEmail) {
          setOtpError("Email address is missing for OTP verification.");
          return;
      }

      setOtpError(null);
      setError(null);
      setIsLoading(true);

      try {
          // Prepare OTP verification payload
          const otpPayload: any = { email: verificationEmail, otp };

          // Add remember_me flag if it was set during login
          if (pendingRememberMe) {
            otpPayload.remember_me = true;
          }

          // Assuming '/api/verify-login-otp/' endpoint
          // Expect nested tokens and user_data based on console log
          const response = await apiRequest<{ tokens?: { access?: string; refresh?: string }; user_data?: User; message?: string }>('/api/verify-login-otp/', 'POST', otpPayload);

          console.log("Response from /api/verify-login-otp/:", response); // Keep logging for now

          // Check for user data in response
          // NOTE: Tokens are in httpOnly cookies, we only need user data
          if (response.user_data) {
               const userData = response.user_data;

               // Update user state - cookies are already set by backend
               handleAuthSuccess(userData);

               // Clear pending remember me flag after successful verification
               setPendingRememberMe(false);

               // Check if user has a primary hospital after successful OTP verification
               // Only if we haven't already loaded this information
               if (!hasPrimaryHospital && !primaryHospital) {
                 try {
                   const hospitalData = await apiRequest<PrimaryHospitalResponse>(
                     '/api/user/has-primary-hospital/',
                     'GET'
                   );

                   // Only update if values have changed
                   const hasPrimaryChanged = hospitalData.has_primary !== hasPrimaryHospital;
                   const hospitalChanged = JSON.stringify(hospitalData.primary_hospital) !== JSON.stringify(primaryHospital);

                   if (hasPrimaryChanged || hospitalChanged) {
                     setHasPrimaryHospital(hospitalData.has_primary);
                     setPrimaryHospital(hospitalData.primary_hospital || null);
                   }
                 } catch (hospitalErr) {
                   console.error('Error checking primary hospital after OTP verification:', hospitalErr);
                   // Don't fail the verification if hospital check fails
                 }
               }
          } else {
               // If structure is not as expected
               console.error("OTP verification response missing user_data:", response);
               throw new Error(response.message || "Invalid response structure from server during OTP verification.");
          }

      } catch (err: any) {
          console.error("OTP Verification failed:", err);
          setOtpError(err.message || 'Invalid or expired OTP. Please try again.');
          setUser(null); // Ensure user is not set on failure
          setPendingRememberMe(false); // Clear remember me flag on error
          // NOTE: Cookies cleared by backend on error
      } finally {
          setIsLoading(false);
      }
  };

  // Resend OTP function
  const resendOTP = async (email?: string) => {
      const resendEmail = email || pendingEmail;
       if (!resendEmail) {
           setOtpError("Email address is missing for resending OTP.");
           return;
       }

       setOtpError(null); // Clear previous OTP error
       setError(null);
       setIsLoading(true); // Indicate activity

       try {
           // Make an API call to resend the OTP to the user's email
           const response = await apiRequest<{ message: string }>(
             '/api/resend-otp/', 
             'POST', 
             { email: resendEmail }
           );
           
           // Show success message 
           setOtpError(response.message || "OTP code has been resent to your email");

       } catch (err: any) {
           console.error("Resend OTP failed:", err);
           setOtpError(err.message || 'Failed to resend OTP. Please try again later.');
       } finally {
           setIsLoading(false); // Finish loading state
       }
  };

  // Logout function
  const logout = async () => {
    try {
      // Set flag to indicate this is an intentional logout (not session expiry)
      sessionStorage.setItem('phb_logout_flag', 'true');

      // Call backend logout to blacklist tokens and clear cookies
      await apiRequest('/api/logout/', 'POST');
      console.log('Logout request successful - cookies cleared by backend');
    } catch (err) {
      console.error('Error during logout API call:', err);
      // Continue with local cleanup even if API call fails
    }

    // Clear error state explicitly to prevent "session expired" message
    setError(null);
    setOtpError(null);

    // Clear local user state
    setUser(null);
    setPrimaryHospital(null);
    setHasPrimaryHospital(false);
    setPrimaryHospitalStatus(null);

    // Clear pending authentication data
    setPendingEmail(null);
    setPendingRememberMe(false);
    setOtpVerificationRequired(false);

    // Clear any non-auth localStorage items
    // NOTE: phb_professional_user and phb_view_preference are not tokens,
    // they're app preferences and can stay in localStorage
    localStorage.removeItem('phb_view_preference');
    localStorage.removeItem('phb_onboarding_completed');

    // Clear the refresh timer
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    // Resolve the promise
    return Promise.resolve();
  };

  const clearError = () => {
    setError(null);
    setOtpError(null);
  };

  const completeOnboarding = async () => {
    if (!user) {
      console.error("Cannot complete onboarding - user is null");
      return { success: false, message: "Cannot complete onboarding - user is null" };
    }

    // Starting onboarding completion

    // Set a temporary flag to prevent redirect loops
    localStorage.setItem('phb_onboarding_completed', 'true');

    setIsLoading(true);
    try {
      // Send the expected data in the POST body
      const requestBody = { has_completed_onboarding: true };

      const response = await apiRequest<{success?: boolean; message?: string; user?: User}>(
        `/api/onboarding/update/`,
        'POST',
        requestBody
      );

      // Update local state immediately regardless of response
      const updatedUser = { ...user, has_completed_onboarding: true };
      setUser(updatedUser);
      return { success: true, message: "Onboarding completed successfully" };

    } catch (err: any) {
      console.error("Failed to mark onboarding as complete:", err);
      setError(err.message || "Failed to update onboarding status.");
      return { 
        success: false, 
        message: err.message || "Failed to update onboarding status."
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update user profile
  const updateUserProfile = async (data: UserProfileUpdateData) => {
      if (!user) throw new Error("User not authenticated");
      setIsLoading(true);
      setError(null);
      
      // Create a copy of data for safe manipulation
      const updateData: Record<string, any> = { ...data };
      
      // Check if we're sending secondary_languages
      if ('secondary_languages' in updateData) {
          // Completely rewritten secondary_languages handling
          const rawValue = updateData.secondary_languages;
          let secondaryLanguages: string[] = [];
          
          // Case 1: Already a proper array
          if (Array.isArray(rawValue)) {
              // Filter out any non-string values and ensure each is a proper string
              secondaryLanguages = rawValue
                  .filter(item => item !== null && item !== undefined)
                  .map(item => String(item).trim());
              
              console.log("Case 1: Array input - processed to:", secondaryLanguages);
          }
          // Case 2: String that looks like a JSON array
          else if (typeof rawValue === 'string' && rawValue.trim().startsWith('[') && rawValue.trim().endsWith(']')) {
              try {
                  const parsed = JSON.parse(rawValue);
                  if (Array.isArray(parsed)) {
                      secondaryLanguages = parsed
                          .filter(item => item !== null && item !== undefined)
                          .map(item => String(item).trim());
                  } else {
                      // If parsed successfully but not an array, treat as comma-separated values
                      secondaryLanguages = rawValue
                          .slice(1, -1) // Remove brackets
                          .split(',')
                          .map(lang => lang.trim().replace(/['"]/g, '')); // Remove quotes
                  }
              } catch (e) {
                  // If JSON parsing fails, manually extract values
                  secondaryLanguages = rawValue
                      .slice(1, -1) // Remove brackets
                      .split(',')
                      .map(lang => lang.trim().replace(/['"]/g, '')); // Remove quotes
              }
              console.log("Case 2: JSON string input - processed to:", secondaryLanguages);
          }
          // Case 3: Regular string (treat as comma-separated)
          else if (typeof rawValue === 'string') {
              secondaryLanguages = rawValue
                  .split(',')
                  .map(lang => lang.trim())
                  .filter(lang => lang.length > 0); // Filter out empty strings
                  
              console.log("Case 3: String input - processed to:", secondaryLanguages);
          }
          // Case 4: Object that can be converted to string and split
          else if (rawValue && typeof rawValue === 'object') {
              try {
                  const asString = String(rawValue);
                  secondaryLanguages = asString
                      .split(',')
                      .map(lang => lang.trim())
                      .filter(lang => lang.length > 0);
                      
                  console.log("Case 4: Object input - processed to:", secondaryLanguages);
              } catch (e) {
                  console.error("Failed to process object as string:", e);
                  secondaryLanguages = [];
              }
          }
          
          // Ensure we have an array even if all processing failed
          if (!Array.isArray(secondaryLanguages)) {
              console.error("Secondary languages processing resulted in non-array:", secondaryLanguages);
              secondaryLanguages = [];
          }
          
          // Update the data with properly formatted array
          updateData.secondary_languages = secondaryLanguages;
          
          console.log("Final secondary_languages array type:", typeof updateData.secondary_languages);
          console.log("Is array:", Array.isArray(updateData.secondary_languages));
          console.log("Final value:", updateData.secondary_languages);
      }
      
      // Make sure custom_language is an empty string rather than null or undefined
      if ('custom_language' in updateData && (updateData.custom_language === null || updateData.custom_language === undefined)) {
          updateData.custom_language = '';
      }
      
      // Replace all null/undefined values with empty strings
      Object.keys(updateData).forEach(key => {
          if (updateData[key] === null || updateData[key] === undefined) {
              updateData[key] = '';
          }
      });
      
      console.log("Final formatted data being sent to API:", updateData);
      console.log("Fields being updated:", Object.keys(updateData).join(', '));
      console.log("Using PATCH method for partial update");
      
      if ('secondary_languages' in updateData) {
          console.log("Type of secondary_languages:", 
              Array.isArray(updateData.secondary_languages) ? 'Array' : typeof updateData.secondary_languages);
          console.log("Secondary languages value:", updateData.secondary_languages);
      }
      
      try {
          // Use PATCH instead of PUT for partial updates
          const updatedUserData = await apiRequest<User>('/api/profile/', 'PATCH', updateData);
          
          // Update local user state with the new data
          setUser(prevUser => {
              if (!prevUser) return updatedUserData;
              return { ...prevUser, ...updatedUserData };
          });
      } catch (err: any) {
          console.error("Update profile failed:", err);
          const errorMessage = err.data?.detail || err.message || "Failed to update profile.";
          setError(errorMessage);
          throw new Error(errorMessage); // Re-throw with better error message
      } finally {
          setIsLoading(false);
      }
  };

  // Function to update contact preferences
  const updateContactPreferences = async (preferences: ContactPreferencesData) => {
      if (!user) throw new Error("User not authenticated");
      setIsLoading(true);
      setError(null);
      try {
          // Assuming endpoint like '/api/users/contact-preferences' - COMMENTED OUT
          // This might be part of the /api/profile/ update
          console.warn("Update Contact Preferences functionality might need to be merged into updateUserProfile or requires a specific backend endpoint."); // Added warning
          // const updatedUserData = await apiRequest<User>('/api/users/contact-preferences', 'PUT', preferences, token);
          // setUser(updatedUserData); // Update local user state if separate call is made

          // For now, assume it might be part of profile data, no separate API call
           setError("Update Contact Preferences endpoint not configured in frontend."); // Feedback

      } catch (err: any) {
          console.error("Update preferences failed:", err);
          setError(err.message || "Failed to update preferences.");
          throw err; // Re-throw
      } finally {
          setIsLoading(false);
      }
  };

  // Function to change password
  const changePassword = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
       if (!user) throw new Error("User not authenticated");
       setIsLoading(true);
       setError(null);
       try {
           const response = await apiRequest<{ message: string }>(
               '/api/password/change/',
               'POST',
               {
                   current_password: currentPassword,
                   new_password: newPassword,
                   confirm_password: confirmPassword
               }
           );
           
           return { success: true, message: response.message || "Password changed successfully! 🎉" };
       } catch (err: any) {
           console.error("Change password failed:", err);
           let errorMessage = "Failed to change password.";
           
           // Handle specific error cases based on the API response
           if (err.data) {
               if (err.data.error) {
                   errorMessage = err.data.error;
               } else if (err.data.confirm_password) {
                   errorMessage = err.data.confirm_password[0];
               } else if (err.data.new_password) {
                   errorMessage = err.data.new_password[0];
               } else if (err.data.current_password) {
                   errorMessage = err.data.current_password[0];
               }
           }
           
           setError(errorMessage);
           return { success: false, message: errorMessage };
       } finally {
           setIsLoading(false);
       }
  };

  // New function to check if user has a primary hospital
  const checkPrimaryHospital = async () => {
    // Don't proceed if no user is authenticated
    if (!user) throw new Error("User not authenticated");
    
    // Skip hospital checks for professional users entirely
    // This prevents unnecessary API calls for doctors
    if (user.role === 'doctor' || !!user.hpn) {
      return Promise.resolve({ 
        has_primary: true, // Doctors don't need to register with hospitals
        primary_hospital: undefined 
      } as PrimaryHospitalResponse);
    }
    
    // Check if current URL path includes professional routes and skip check if so
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/professional')) {
      return Promise.resolve({ 
        has_primary: true, // Skip check for professional routes
        primary_hospital: undefined 
      } as PrimaryHospitalResponse);
    }
    
    // Use the throttling mechanism to prevent rapid repeated API calls
    if (shouldThrottleApiCall('/api/user/has-primary-hospital/', {}, 2000)) {
      // Return the current values if we're throttling, making sure they match the expected type
      return Promise.resolve({ 
        has_primary: hasPrimaryHospital, 
        primary_hospital: primaryHospital === null ? undefined : primaryHospital 
      } as PrimaryHospitalResponse);
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiRequest<PrimaryHospitalResponse>(
        '/api/user/has-primary-hospital/',
        'GET'
      );
      
      // Only update state if the values have actually changed
      // This prevents re-renders that could trigger more API calls
      const hasPrimaryChanged = response.has_primary !== hasPrimaryHospital;
      const hospitalChanged = JSON.stringify(response.primary_hospital) !== JSON.stringify(primaryHospital);
      const statusChanged = response.primary_hospital?.status !== primaryHospitalStatus;

      if (hasPrimaryChanged || hospitalChanged || statusChanged) {
        setHasPrimaryHospital(response.has_primary);
        setPrimaryHospital(response.primary_hospital || null);
        // Validate and set status - ensure it's one of the expected values
        const status = response.primary_hospital?.status;
        if (status === 'pending' || status === 'approved' || status === 'rejected') {
          setPrimaryHospitalStatus(status);
        } else {
          setPrimaryHospitalStatus(null);
        }
      }
      
      // Only log in development (removed production check to fix TypeScript error)
      // console.log("Primary hospital status:", response);
      
      return response;
    } catch (err: any) {
      console.error("Check primary hospital failed:", err);
      setError(err.message || "Failed to check primary hospital status.");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // New function to fetch nearby hospitals
  const fetchNearbyHospitals = async (latitude: number, longitude: number, radius: number = 10) => {
    if (!user) throw new Error("User not authenticated");

    // Throttle identical API calls
    const endpoint = `/api/hospitals/nearby/`;
    const params = { latitude, longitude, radius };

    if (shouldThrottleApiCall(endpoint, params)) {
      console.log("Throttling identical API call to fetchNearbyHospitals - returning cached data");
      // Return cached data instead of empty array
      return hospitalCache.current.nearbyHospitals || { hospitals: [] };
    }

    // DON'T set global isLoading for hospital fetches - it causes ProtectedRoute to unmount!
    // setIsLoading(true);
    setError(null);

    try {
      // Update to handle the enhanced API response structure
      const response = await apiRequest<{
        hospitals: Hospital[];
        message?: string;
        location?: {
          latitude: number;
          longitude: number;
          radius_km: number;
        }
      }>(
        `${endpoint}?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
        'GET'
      );

      // Cache the response with timestamp
      hospitalCache.current.nearbyHospitals = {
        ...response,
        timestamp: Date.now()
      };

      // Return the full response object to allow displaying the message
      return response;
    } catch (err: any) {
      console.error("Fetch nearby hospitals failed:", err);
      setError(err.message || "Failed to fetch nearby hospitals.");
      // Return cached data if available, otherwise empty array
      return hospitalCache.current.nearbyHospitals || { hospitals: [] };
    }
    // DON'T set global isLoading for hospital fetches
    // finally {
    //   setIsLoading(false);
    // }
  };

  // New function to fetch all hospitals
  const fetchAllHospitals = async () => {
    if (!user) throw new Error("User not authenticated");

    // Throttle identical API calls
    const endpoint = `/api/hospitals/`;
    const cacheKey = 'all';

    if (shouldThrottleApiCall(endpoint, {})) {
      console.log("Throttling identical API call to fetchAllHospitals - returning cached data");
      // Return cached data for 'all' hospitals
      return hospitalCache.current.searches[cacheKey]?.hospitals || [];
    }

    // DON'T set global isLoading for hospital fetches - it causes ProtectedRoute to unmount!
    // setIsLoading(true);
    setError(null);

    try {
      // Update to handle the enhanced API response structure
      const response = await apiRequest<{
        hospitals: Hospital[];
        message?: string;
      }>(
        endpoint,
        'GET'
      );

      // Cache the hospitals array with 'all' key
      hospitalCache.current.searches[cacheKey] = {
        hospitals: response.hospitals || [],
        timestamp: Date.now()
      };

      // Return just the hospitals array
      return response.hospitals || [];
    } catch (err: any) {
      console.error("Fetch all hospitals failed:", err);
      setError(err.message || "Failed to fetch hospitals.");
      // Return cached data for 'all' hospitals if available, otherwise empty array
      return hospitalCache.current.searches[cacheKey]?.hospitals || [];
    }
    // DON'T set global isLoading for hospital fetches
    // finally {
    //   setIsLoading(false);
    // }
  };

  // New function to search hospitals with server-side filtering
  const searchHospitals = async (
    query: string,
    options?: {
      state?: string;
      city?: string;
      limit?: number;
    }
  ) => {
    if (!user) throw new Error("User not authenticated");

    // Build query parameters
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (options?.state) params.append('state', options.state);
    if (options?.city) params.append('city', options.city);
    if (options?.limit) params.append('limit', options.limit.toString());

    const endpoint = `/api/hospitals/search/?${params.toString()}`;

    // Create unique cache key based on query parameters
    const cacheKey = `${query || 'all'}_${options?.state || ''}_${options?.city || ''}_${options?.limit || ''}`;

    // Throttle identical API calls
    if (shouldThrottleApiCall(endpoint, {})) {
      console.log("Throttling identical API call to searchHospitals - returning cached data");
      // Return cached data for this specific search if available
      return hospitalCache.current.searches[cacheKey]?.hospitals || [];
    }

    // DON'T set global isLoading for hospital searches - it causes ProtectedRoute to unmount!
    // setIsLoading(true);
    setError(null);

    try {
      const response = await apiRequest<{
        hospitals: Hospital[];
        message?: string;
        total?: number;
      }>(endpoint, 'GET');

      // Cache the search results with unique key
      hospitalCache.current.searches[cacheKey] = {
        hospitals: response.hospitals || [],
        timestamp: Date.now()
      };

      return response.hospitals || [];
    } catch (err: any) {
      console.error("Search hospitals failed:", err);
      setError(err.message || "Failed to search hospitals.");
      // Return cached data for this specific search if available, otherwise empty array
      return hospitalCache.current.searches[cacheKey]?.hospitals || [];
    }
    // DON'T set global isLoading for hospital searches
    // finally {
    //   setIsLoading(false);
    // }
  };

  // New function to register with a hospital
  const registerWithHospital = async (hospitalId: number, isPrimary: boolean = true) => {
    if (!user) throw new Error("User not authenticated");
    // DON'T set global isLoading - it causes ProtectedRoute to unmount the entire app!
    // Components using this function should manage their own loading states
    // setIsLoading(true);
    setError(null);

    try {
      const response = await apiRequest<{ message: string; data: any }>(
        '/api/hospitals/register/',
        'POST',
        { hospital: hospitalId, is_primary: isPrimary }
      );

      // Note: Removed automatic checkPrimaryHospital() call to prevent cascading
      // state updates. Components should manually refresh primary hospital status
      // if needed after successful registration.

      return response;
    } catch (err: any) {
      console.error("Hospital registration failed:", err);
      setError(err.message || "Failed to register with hospital.");
      throw err;
    }
    // DON'T set global isLoading - components manage their own loading states
    // finally {
    //   setIsLoading(false);
    // }
  };

  // Calculate needsOnboarding based on user state
  const needsOnboarding = !!user && 
    (user.has_completed_onboarding === false || user.has_completed_onboarding === null || user.has_completed_onboarding === undefined) && 
    !localStorage.getItem('phb_onboarding_completed');
  const isAuthenticated = !!user;

  // Add a createTestUser function before the contextValue declaration
  const createTestUser = (): User => {
    const testUser: User = {
      id: 'test-user-id',
      full_name: 'Test User',
      email: 'test@example.com',
      is_verified: true,
      role: 'patient',
      has_completed_onboarding: false,
      gender: 'prefer-not-to-say',
      date_of_birth: '1990-01-01',
      phone: '+12345678901',
      country: 'united-states',
      state: 'Test State',
      city: 'Test City'
    };
    
    // For testing only - set in local state but don't persist to storage
    setUser(testUser);
    return testUser;
  };

  // Function to request a password reset
  const requestPasswordReset = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiRequest<{ success: boolean; message: string }>(
        '/api/password/reset/',
        'POST',
        { email }
      );
      
      // Always return a success message even if the email doesn't exist (for security)
      return {
        success: true,
        message: response.message || 'If this email exists in our system, password reset instructions have been sent'
      };
    } catch (err: any) {
      console.error('Password reset request failed:', err);
      
      // For security reasons, don't reveal if the email exists
      // Instead, return a generic success message
      return {
        success: false,
        message: 'If this email exists in our system, password reset instructions have been sent'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Function to confirm password reset
  const confirmPasswordReset = async (token: string, newPassword: string, confirmPassword: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiRequest<{ success: boolean; message: string }>(
        '/api/password/reset/confirm/',
        'POST',
        { 
          token, 
          new_password: newPassword,
          confirm_password: confirmPassword 
        }
      );
      
      return {
        success: true,
        message: response.message || 'Your password has been successfully reset'
      };
    } catch (err: any) {
      console.error('Password reset confirmation failed:', err);
      return {
        success: false,
        message: err.message || 'Failed to reset password. The link may have expired or is invalid.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    isNewUser,
    needsOnboarding,
    completeOnboarding,
    login,
    logout,
    register,
    error,
    clearError,
    otpVerificationRequired,
    verifyOTP,
    resendOTP,
    otpError,
    pendingUser,
    createTestUser,
    updateUserProfile,
    updateContactPreferences,
    changePassword,
    requestPasswordReset,
    confirmPasswordReset,
    // New hospital-related functions
    checkPrimaryHospital,
    fetchNearbyHospitals,
    fetchAllHospitals,
    searchHospitals,
    registerWithHospital,
    primaryHospital,
    hasPrimaryHospital,
    primaryHospitalStatus,
    // Doctor role check - check both role and hpn for reliability
    isDoctor: user?.role === 'doctor',
    // CAPTCHA-related properties
    captchaRequired,
    captchaChallenge,
    captchaToken,
  };
  
  

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
