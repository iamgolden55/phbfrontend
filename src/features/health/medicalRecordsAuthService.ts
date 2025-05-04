// Import the API_BASE_URL from the utils config
import { API_BASE_URL } from '../../utils/config';

// Token storage keys
const MED_ACCESS_TOKEN_KEY = 'med_access_token';
const MED_ACCESS_EXPIRY_KEY = 'med_access_expiry';
const AUTH_TOKEN_KEY = 'phb_auth_token';

// Error codes
export const ERROR_CODES = {
  MED_ACCESS_REQUIRED: 'MED_ACCESS_REQUIRED',
  INVALID_MED_ACCESS: 'INVALID_MED_ACCESS',
  MED_ACCESS_EXPIRED: 'MED_ACCESS_EXPIRED',
};

// Token management
export const getMedAccessToken = (): string | null => {
  return localStorage.getItem(MED_ACCESS_TOKEN_KEY);
};

export const getMedAccessExpiry = (): number => {
  const expiry = localStorage.getItem(MED_ACCESS_EXPIRY_KEY);
  return expiry ? parseInt(expiry, 10) : 0;
};

export const setMedAccessToken = (token: string, expiryMinutes: number = 30): void => {
  const expiryTime = Date.now() + expiryMinutes * 60 * 1000;
  localStorage.setItem(MED_ACCESS_TOKEN_KEY, token);
  localStorage.setItem(MED_ACCESS_EXPIRY_KEY, expiryTime.toString());
};

export const clearMedAccessToken = (): void => {
  localStorage.removeItem(MED_ACCESS_TOKEN_KEY);
  localStorage.removeItem(MED_ACCESS_EXPIRY_KEY);
};

export const isMedAccessTokenValid = (): boolean => {
  const token = getMedAccessToken();
  if (!token) return false;
  
  const expiry = getMedAccessExpiry();
  return expiry > Date.now();
};

// Helper function for making API calls
async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
  body?: any,
  additionalHeaders?: Record<string, string>
): Promise<T> {
  // Ensure exactly one slash between base URL and endpoint
  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  
  // Get the authentication token
  const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
  
  if (!authToken) {
    throw new Error('Authentication required. Please log in again.');
  }
  
  console.log(`[DEBUG] API Request to: ${url} (${method})`);
  console.log(`[DEBUG] Auth token available: ${!!authToken}`);
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${authToken}`,
    ...additionalHeaders
  };
  
  const config: RequestInit = { method, headers };
  
  if (body) {
    config.body = JSON.stringify(body);
  }
  
  console.log(`[DEBUG] Request headers:`, headers);
  if (body) console.log(`[DEBUG] Request body:`, body);
  
  try {
    const response = await fetch(url, config);
    console.log(`[DEBUG] Response status:`, response.status);
    
    // Handle no content responses
    if (response.status === 204) {
      return null as unknown as T;
    }
    
    // Always try to parse response as JSON, even for errors
    let data: any;
    try {
      data = await response.json();
    } catch (e) {
      // If response is not JSON, create a simple object
      data = { message: 'No response data or invalid JSON' };
    }
    
    if (!response.ok) {
      // Try alternate URL with trailing slash if we get a 404
      if (response.status === 404 && !url.endsWith('/')) {
        console.log(`[DEBUG] Trying alternate URL with trailing slash`);
        const altUrl = `${url}/`;
        const altResponse = await fetch(altUrl, config);
        
        if (altResponse.ok) {
          console.log(`[DEBUG] Alternate URL successful:`, altResponse.status);
          const altData = await altResponse.json();
          return altData as T;
        } else {
          console.error(`[DEBUG] Alternate URL also failed:`, altResponse.status);
        }
      }
      
      // Throw an error object that includes status and message
      const error: any = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }
    
    return data as T;
  } catch (error) {
    console.error(`[DEBUG] API request failed: ${method} ${endpoint}`, error);
    throw error;
  }
}

// API calls
export const requestMedicalRecordOTP = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const data = await apiRequest<{ message?: string }>(
      'api/patient/medical-record/request-otp',
      'POST'
    );
    
    return { 
      success: true, 
      message: data.message || 'Verification code sent to your email address' 
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { 
      success: false, 
      message: errorMessage || 'Failed to request access code. Please try again.'
    };
  }
};

export const verifyMedicalRecordOTP = async (otp: string): Promise<{ 
  success: boolean; 
  message: string;
  token?: string;
}> => {
  try {
    const data = await apiRequest<{ 
      med_access_token?: string; 
      expires_in?: number;
      message?: string;
    }>(
      'api/patient/medical-record/verify-otp',
      'POST',
      { otp }
    );
    
    // Store the token with expiry time
    if (data.med_access_token) {
      const expiresIn = data.expires_in || 30 * 60; // Default to 30 minutes in seconds
      setMedAccessToken(data.med_access_token, expiresIn / 60); // Convert seconds to minutes
      
      return { 
        success: true, 
        message: 'Access granted successfully', 
        token: data.med_access_token
      };
    } else {
      throw new Error('No access token received');
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return { 
      success: false, 
      message: errorMessage || 'Invalid verification code. Please try again.'
    };
  }
};

export const fetchMedicalRecords = async () => {
  try {
    console.log('[DEBUG] Starting medical records fetch attempt');
    const medAccessToken = getMedAccessToken();
    console.log(`[DEBUG] Med access token available: ${!!medAccessToken}`);
    
    if (!medAccessToken) {
      console.log('[DEBUG] No medical access token found');
      return {
        success: false,
        errorCode: ERROR_CODES.MED_ACCESS_REQUIRED,
        message: 'Medical records access requires verification.'
      };
    }
    
    if (!isMedAccessTokenValid()) {
      console.log('[DEBUG] Medical access token expired');
      return {
        success: false,
        errorCode: ERROR_CODES.MED_ACCESS_EXPIRED,
        message: 'Your secure access has expired. Please verify again.'
      };
    }
    
    // Get the authentication token
    const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
    
    if (!authToken) {
      console.log('[DEBUG] No auth token found');
      return {
        success: false,
        errorCode: 'AUTH_REQUIRED',
        message: 'Authentication required. Please log in again.'
      };
    }
    
    // Check if we have a known working endpoint from previous tests
    let endpoint = localStorage.getItem('working_medical_record_endpoint');
    
    // If no working endpoint is saved, use the default as specified by the backend developer
    if (!endpoint) {
      // Standard endpoint with trailing slash as specified in the backend developer's message
      endpoint = 'api/patient/medical-record/';
    }
    
    console.log(`[DEBUG] Using endpoint: ${endpoint}`);
    
    // Add the medical access token to the headers
    const additionalHeaders = {
      'X-Med-Access-Token': medAccessToken
    };
    
    console.log('[DEBUG] Attempting to fetch medical records with both tokens');
    
    try {
      const data = await apiRequest<any>(
        endpoint,
        'GET',
        undefined,
        additionalHeaders
      );
      
      console.log('[DEBUG] Medical records fetch successful:', data);
      
      // Ensure data is returned as an array to match MedicalRecord[] type
      const formattedData = Array.isArray(data) ? data : (data?.records || []);
      
      return {
        success: true,
        data: formattedData
      };
    } catch (error) {
      console.error('[DEBUG] Medical records fetch failed:', error);
      
      // Check if this is a 401 or 403 unauthorized error
      const status = (error as any).status;
      if (status === 401 || status === 403) {
        return {
          success: false,
          errorCode: ERROR_CODES.INVALID_MED_ACCESS,
          message: 'Invalid access token. Please verify again.'
        };
      }
      
      throw error; // Re-throw for the outer catch
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('[DEBUG] Failed to fetch medical records:', error);
    
    return {
      success: false,
      errorCode: 'FETCH_ERROR',
      message: errorMessage || 'Failed to fetch medical records'
    };
  }
}; 