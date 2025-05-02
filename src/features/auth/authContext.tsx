import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback, useRef } from 'react';

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
  name?: string;
  email?: string;
  dateOfBirth?: string;
  address?: string;
  phone?: string;
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
  login: (email: string, password: string) => Promise<void>;
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
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  // Password reset functions
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message: string }>;
  confirmPasswordReset: (token: string, newPassword: string, confirmPassword: string) => Promise<{ success: boolean; message: string }>;
  // New functions for hospital selection and registration
  checkPrimaryHospital: () => Promise<PrimaryHospitalResponse>;
  fetchNearbyHospitals: (latitude: number, longitude: number, radius?: number) => Promise<{ hospitals: Hospital[]; message?: string; location?: { latitude: number; longitude: number; radius_km: number; } }>;
  fetchAllHospitals: () => Promise<Hospital[]>;
  registerWithHospital: (hospitalId: number, isPrimary?: boolean) => Promise<{ message: string; data: any }>;
  primaryHospital: Hospital | null;
  hasPrimaryHospital: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/'; // Fallback if .env is missing
const AUTH_TOKEN_KEY = 'phb_auth_token'; // Key for storing token in localStorage

// Helper function for making API calls
async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any,
  token?: string | null
): Promise<T> {
  const url = `${API_BASE_URL.replace(/\/$/, '')}${endpoint}`; // Ensure no double slashes
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
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
  // New state variables for hospital functionality
  const [primaryHospital, setPrimaryHospital] = useState<Hospital | null>(null);
  const [hasPrimaryHospital, setHasPrimaryHospital] = useState<boolean>(false);

  // Add a reference to track the last API call time and parameters
  const lastApiCall = useRef<{
    endpoint: string;
    params: any;
    timestamp: number;
  } | null>(null);
  
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

  // Check for existing token on initial load
  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    if (token) {
      try {
        // Assuming '/api/profile/' endpoint can fetch user profile via GET
        const userData = await apiRequest<User>('/api/profile/', 'GET', undefined, token);
        
        // Log the user data and onboarding status
        console.log("User profile data from API:", userData);
        console.log("has_completed_onboarding value:", userData.has_completed_onboarding);
        console.log("has_completed_onboarding type:", typeof userData.has_completed_onboarding);
        
        setUser(userData);
        
        // Check if user has a primary hospital after successful authentication
        // But only if we haven't already loaded this information
        if (!hasPrimaryHospital && !primaryHospital) {
          try {
            const hospitalData = await apiRequest<PrimaryHospitalResponse>(
              '/api/user/has-primary-hospital/', 
              'GET', 
              undefined, 
              token
            );
            
            // Only update if values have changed to prevent re-renders
            const hasPrimaryChanged = hospitalData.has_primary !== hasPrimaryHospital;
            const hospitalChanged = JSON.stringify(hospitalData.primary_hospital) !== JSON.stringify(primaryHospital);
            
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
        console.error('Token validation failed:', err);
        localStorage.removeItem(AUTH_TOKEN_KEY); // Remove invalid token
        setUser(null);
        setPrimaryHospital(null);
        setHasPrimaryHospital(false);
        // Optionally set an error message if needed
        if (err.status === 401 || err.status === 403) {
          setError("Your session has expired. Please log in again.");
        }
      }
    } else {
      setUser(null); // Ensure user is null if no token
      setPrimaryHospital(null);
      setHasPrimaryHospital(false);
    }
    setIsLoading(false);
  }, [hasPrimaryHospital, primaryHospital]); // Add these as dependencies

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]); // Run once on mount

  const handleAuthSuccess = (userData: User, token: string) => {
      console.log("Auth success with user data:", userData);
      console.log("has_completed_onboarding value:", userData.has_completed_onboarding);
      
      setUser(userData);
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      setOtpVerificationRequired(false);
      setPendingEmail(null);
      setError(null);
      setOtpError(null);
      setIsLoading(false);
      
      // Debug log after setting user
      setTimeout(() => {
        console.log("User state after handleAuthSuccess:", user);
        console.log("needsOnboarding calculated as:", !!user && !user.has_completed_onboarding);
      }, 100);
  };

  // Login function
  const login = async (email: string, password: string) => {
    setError(null);
    setOtpError(null);
    setIsLoading(true);
    setOtpVerificationRequired(false); // Reset OTP state
    setPendingEmail(null);

    try {
      // Assuming '/api/login/' endpoint
      const response = await apiRequest<{ user?: User; token?: string; otpRequired?: boolean; message?: string }>('/api/login/', 'POST', { email, password });

       // Check 1: Explicit OTP required flag from backend
       if (response.otpRequired) {
           setOtpVerificationRequired(true);
           setPendingEmail(email);
           setUser(null);
           localStorage.removeItem(AUTH_TOKEN_KEY);
           setError(response.message || "OTP verification required."); // Show message if available
       }
       // Check 2: Direct login success with user and token
       else if (response.user && response.token) {
           handleAuthSuccess(response.user, response.token);
           
           // Check if user has a primary hospital after successful login
           // Only if we haven't already loaded this information
           if (!hasPrimaryHospital && !primaryHospital) {
             try {
               const token = response.token;
               const hospitalData = await apiRequest<PrimaryHospitalResponse>(
                 '/api/user/has-primary-hospital/', 
                 'GET', 
                 undefined, 
                 token
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
       // Check 3: Successful response but no token -> Assume OTP required (common pattern)
       else if (!response.token) { // If response is OK (implied by being here) but no token
           console.log("Login successful, but no token received. Assuming OTP is required.");
           setOtpVerificationRequired(true);
           setPendingEmail(email);
           setUser(null);
           localStorage.removeItem(AUTH_TOKEN_KEY);
           setError(response.message || "OTP verification required."); // Show message if available
       }
       // Check 4: Unexpected response structure
       else {
           console.error("Unexpected response structure during login:", response);
           throw new Error("Invalid response from server during login.");
       }

    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || 'Login failed. Please check your credentials.');
      setUser(null);
      localStorage.removeItem(AUTH_TOKEN_KEY);
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
       localStorage.removeItem(AUTH_TOKEN_KEY);

    } catch (err: any) {
      console.error("Registration failed:", err);
      setError(err.message || 'Registration failed. Please try again.');
       setUser(null);
       localStorage.removeItem(AUTH_TOKEN_KEY);
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
          // Assuming '/api/verify-login-otp/' endpoint
          // Expect nested tokens and user_data based on console log
          const response = await apiRequest<{ tokens?: { access?: string; refresh?: string }; user_data?: User; message?: string }>('/api/verify-login-otp/', 'POST', { email: verificationEmail, otp });

          console.log("Response from /api/verify-login-otp/:", response); // Keep logging for now

          // Check for nested access token and user data
          if (response.tokens && response.tokens.access && response.user_data) {
               const accessToken = response.tokens.access;
               const userData = response.user_data;

               // Store the token and update user state directly
               // No need for separate /api/profile call here
               handleAuthSuccess(userData, accessToken);

               // Check if user has a primary hospital after successful OTP verification
               // Only if we haven't already loaded this information
               if (!hasPrimaryHospital && !primaryHospital) {
                 try {
                   const hospitalData = await apiRequest<PrimaryHospitalResponse>(
                     '/api/user/has-primary-hospital/', 
                     'GET', 
                     undefined, 
                     accessToken
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
               console.error("OTP verification response missing expected structure (tokens.access or user_data):", response);
               throw new Error(response.message || "Invalid response structure from server during OTP verification.");
          }

      } catch (err: any) {
          console.error("OTP Verification failed:", err);
          setOtpError(err.message || 'Invalid or expired OTP. Please try again.');
          setUser(null); // Ensure user is not set on failure
          localStorage.removeItem(AUTH_TOKEN_KEY);
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
    setError(null);
    setOtpError(null);
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    // Clear local state immediately
    setUser(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setOtpVerificationRequired(false);
    setPendingEmail(null);
    setPrimaryHospital(null);
    setHasPrimaryHospital(false);

    // No API call needed for standard JWT logout on client-side
    // Backend token invalidation (if any) happens via expiry or refresh mechanisms
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

    console.log("Starting completeOnboarding...");
    console.log("Current user:", user);
    console.log("Current has_completed_onboarding value:", user.has_completed_onboarding);

    // Set a temporary flag to prevent redirect loops
    localStorage.setItem('phb_onboarding_completed', 'true');

    setIsLoading(true);
    try {
      // Send the expected data in the POST body
      const requestBody = { has_completed_onboarding: true }; 
      console.log("Sending request to /api/onboarding/update/ with:", requestBody);
      
      const response = await apiRequest<{success?: boolean; message?: string; user?: User}>(
        `/api/onboarding/update/`, 
        'POST', 
        requestBody, 
        localStorage.getItem(AUTH_TOKEN_KEY)
      );
      
      console.log("Response from /api/onboarding/update/:", response);

      // Update local state immediately regardless of response
      const updatedUser = { ...user, has_completed_onboarding: true };
      setUser(updatedUser);
      
      console.log("Onboarding completion successful");
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
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      try {
          // Assuming endpoint like '/api/profile/'
          const updatedUserData = await apiRequest<User>('/api/profile/', 'PUT', data, token);
          setUser(updatedUserData);
      } catch (err: any) {
          console.error("Update profile failed:", err);
          setError(err.message || "Failed to update profile.");
          throw err; // Re-throw for the calling component to handle
      } finally {
          setIsLoading(false);
      }
  };

  // Function to update contact preferences
  const updateContactPreferences = async (preferences: ContactPreferencesData) => {
      if (!user) throw new Error("User not authenticated");
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem(AUTH_TOKEN_KEY);
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
  const changePassword = async (currentPassword: string, newPassword: string) => {
       if (!user) throw new Error("User not authenticated");
       setIsLoading(true);
       setError(null);
       const token = localStorage.getItem(AUTH_TOKEN_KEY);
       try {
           // Assuming endpoint like '/api/auth/change-password' - COMMENTED OUT
           console.warn("Change Password functionality requires a confirmed backend endpoint."); // Added warning
           // await apiRequest('/api/auth/change-password', 'POST', { currentPassword, newPassword }, token);
           // Optionally show success message
           setError("Change Password endpoint not configured in frontend."); // Feedback

       } catch (err: any) {
           console.error("Change password failed:", err);
           setError(err.message || "Failed to change password.");
           throw err; // Re-throw
       } finally {
           setIsLoading(false);
       }
  };

  // New function to check if user has a primary hospital
  const checkPrimaryHospital = async () => {
    if (!user) throw new Error("User not authenticated");
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    
    try {
      const response = await apiRequest<PrimaryHospitalResponse>(
        '/api/user/has-primary-hospital/', 
        'GET', 
        undefined, 
        token
      );
      
      // Only update state if the values have actually changed
      // This prevents re-renders that could trigger more API calls
      const hasPrimaryChanged = response.has_primary !== hasPrimaryHospital;
      const hospitalChanged = JSON.stringify(response.primary_hospital) !== JSON.stringify(primaryHospital);
      
      if (hasPrimaryChanged || hospitalChanged) {
        setHasPrimaryHospital(response.has_primary);
        setPrimaryHospital(response.primary_hospital || null);
      }
      
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
      console.log("Throttling identical API call to fetchNearbyHospitals");
      return { hospitals: [] }; // Return empty result for throttled calls
    }
    
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    
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
        'GET', 
        undefined, 
        token
      );
      
      // Return the full response object to allow displaying the message
      return response;
    } catch (err: any) {
      console.error("Fetch nearby hospitals failed:", err);
      setError(err.message || "Failed to fetch nearby hospitals.");
      // Return empty array instead of throwing to handle gracefully
      return { hospitals: [] };
    } finally {
      setIsLoading(false);
    }
  };

  // New function to fetch all hospitals
  const fetchAllHospitals = async () => {
    if (!user) throw new Error("User not authenticated");
    
    // Throttle identical API calls
    const endpoint = `/api/hospitals/`;
    
    if (shouldThrottleApiCall(endpoint, {})) {
      console.log("Throttling identical API call to fetchAllHospitals");
      return []; // Return empty result for throttled calls
    }
    
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    
    try {
      // Update to handle the enhanced API response structure
      const response = await apiRequest<{
        hospitals: Hospital[];
        message?: string;
      }>(
        endpoint, 
        'GET', 
        undefined, 
        token
      );
      
      // Return just the hospitals array
      return response.hospitals || [];
    } catch (err: any) {
      console.error("Fetch all hospitals failed:", err);
      setError(err.message || "Failed to fetch hospitals.");
      // Return empty array instead of throwing to handle gracefully
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // New function to register with a hospital
  const registerWithHospital = async (hospitalId: number, isPrimary: boolean = true) => {
    if (!user) throw new Error("User not authenticated");
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    
    try {
      const response = await apiRequest<{ message: string; data: any }>(
        '/api/hospitals/register/', 
        'POST', 
        { hospital: hospitalId, is_primary: isPrimary }, 
        token
      );
      
      // If this is set as the primary hospital and registration was successful
      if (isPrimary && response.data) {
        // Check primary hospital status again to update state
        await checkPrimaryHospital();
      }
      
      return response;
    } catch (err: any) {
      console.error("Hospital registration failed:", err);
      setError(err.message || "Failed to register with hospital.");
      throw err;
    } finally {
      setIsLoading(false);
    }
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
    registerWithHospital,
    primaryHospital,
    hasPrimaryHospital,
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
