import { API_BASE_URL } from '../../utils/config';

/**
 * Complete medical records access flow with double authentication
 */
class MedicalRecordsService {
  private jwtToken: string | null = null;
  private medAccessToken: string | null = null;

  constructor() {
    // Try to load tokens from localStorage on initialization
    this.jwtToken = localStorage.getItem('phb_auth_token');
    this.medAccessToken = localStorage.getItem('med_access_token');
    
    // Log config info
    console.log('MedicalRecordsService initialized');
    console.log('API_BASE_URL:', API_BASE_URL);
  }

  /**
   * Helper method to get correct URL format
   * Prevents double slashes in URLs
   */
  private getApiUrl(endpoint: string): string {
    console.log('getApiUrl input endpoint:', endpoint);
    
    // Remove trailing slash from API_BASE_URL if it exists
    const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    
    // Ensure endpoint starts with a slash
    let path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // Add /api prefix if not already present AND if API_BASE_URL doesn't already include /api
    if (!path.startsWith('/api/') && !baseUrl.endsWith('/api')) {
      path = `/api${path}`;
    }
    
    const finalUrl = `${baseUrl}${path}`;
    console.log('getApiUrl constructed URL:', finalUrl);
    
    return finalUrl;
  }

  /**
   * STEP 1: User Login with OTP (first security layer)
   * Note: This is likely already handled by your auth system
   */
  async login(email: string, password: string) {
    try {
      // First login attempt
      const loginResponse = await fetch(this.getApiUrl('login/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const loginData = await loginResponse.json();
      
      // Check if OTP is required
      if (loginData.require_otp) {
        return {
          status: 'otp_required',
          message: 'Please check your email for verification code'
        };
      }
      
      // If no OTP required, save token directly
      if (loginData.tokens && loginData.tokens.access) {
        this.jwtToken = loginData.tokens.access;
        localStorage.setItem('phb_auth_token', this.jwtToken);
        return {
          status: 'success',
          token: this.jwtToken,
          userData: loginData.user_data
        };
      }
      
      return {
        status: 'error',
        message: 'Login failed'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        status: 'error',
        message: 'Login failed. Please try again.'
      };
    }
  }

  /**
   * STEP 2: Verify login OTP (completes first security layer)
   * Note: This is likely already handled by your auth system
   */
  async verifyLoginOtp(email: string, otp: string) {
    try {
      const response = await fetch(this.getApiUrl('verify-login-otp/'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return {
          status: 'error',
          message: errorData.error || 'Invalid OTP'
        };
      }
      
      const data = await response.json();
      
      // Save JWT token for future API calls
      if (data.tokens && data.tokens.access) {
        this.jwtToken = data.tokens.access;
        localStorage.setItem('phb_auth_token', this.jwtToken);
        return {
          status: 'success',
          token: this.jwtToken,
          userData: data.user_data
        };
      }
      
      return {
        status: 'error',
        message: 'Failed to verify OTP'
      };
    } catch (error) {
      console.error('OTP verification error:', error);
      return {
        status: 'error',
        message: 'Verification failed. Please try again.'
      };
    }
  }

  /**
   * STEP 3: Request Medical Records OTP (begins second security layer)
   * This must be called after user is already authenticated with JWT
   */
  async requestMedicalRecordsOtp() {
    try {
      console.log('Starting requestMedicalRecordsOtp');
      // Verify we have JWT token
      if (!this.jwtToken) {
        // Try to get from localStorage
        this.jwtToken = localStorage.getItem('phb_auth_token');
        console.log('JWT token from localStorage:', this.jwtToken ? 'Found' : 'Not found');
        
        if (!this.jwtToken) {
          console.log('No JWT token available, aborting request');
          return {
            status: 'error',
            message: 'You must be logged in to access medical records'
          };
        }
      }
      
      const apiUrl = this.getApiUrl('patient/medical-record/request-otp/');
      console.log('Requesting OTP from:', apiUrl);
      
      const headers = {
        'Authorization': `Bearer ${this.jwtToken}`,
        'Content-Type': 'application/json',
      };
      
      console.log('Request headers:', {
        Authorization: 'Bearer [TOKEN HIDDEN]',
        'Content-Type': 'application/json'
      });
      
      // Use this try-catch to specifically catch CORS errors
      try {
        console.log('Sending OTP request...');
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({}), // Empty body is fine
          // Add this to help with CORS troubleshooting
          mode: 'cors',
          credentials: 'same-origin'
        });
        
        console.log('Request OTP response status:', response.status);
        console.log('Response headers:', [...response.headers.entries()].reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {}));
        
        if (!response.ok) {
          console.error('Request OTP response not OK:', response.status);
          try {
            const errorData = await response.json();
            console.error('Error data:', errorData);
            return {
              status: 'error',
              message: errorData.error || 'Failed to request medical records access code'
            };
          } catch (err) {
            console.error('Could not parse error response:', err);
            // Try to get the raw response text
            try {
              const errorText = await response.text();
              console.error('Error response body:', errorText);
            } catch (textErr) {
              console.error('Could not get error text either');
            }
            return {
              status: 'error',
              message: 'Failed to request medical records access code'
            };
          }
        }
        
        console.log('OTP request successful, parsing response');
        const data = await response.json();
        console.log('OTP request response data:', data);
        
        return {
          status: 'success',
          message: data.message || 'Access code sent to your email'
        };
      } catch (fetchError) {
        // Specifically handle CORS and network errors
        console.error('OTP request fetch error (could be CORS related):', fetchError);
        return {
          status: 'error',
          code: 'NETWORK_ERROR',
          message: 'Network error when requesting access code. This could be due to CORS configuration.'
        };
      }
    } catch (error) {
      console.error('Medical records OTP request error:', error);
      return {
        status: 'error',
        message: 'Failed to request access code. Please try again.'
      };
    }
  }

  /**
   * STEP 4: Verify Medical Records OTP (completes second security layer)
   */
  async verifyMedicalRecordsOtp(otp: string) {
    try {
      console.log('Starting verifyMedicalRecordsOtp with code:', otp);
      // Verify we have JWT token
      if (!this.jwtToken) {
        // Try to get from localStorage
        this.jwtToken = localStorage.getItem('phb_auth_token');
        console.log('JWT token from localStorage:', this.jwtToken ? 'Found' : 'Not found');
        
        if (!this.jwtToken) {
          console.log('No JWT token available, aborting request');
          return {
            status: 'error',
            message: 'You must be logged in to access medical records'
          };
        }
      }
      
      const apiUrl = this.getApiUrl('patient/medical-record/verify-otp/');
      console.log('Verifying OTP at:', apiUrl);
      
      const headers = {
        'Authorization': `Bearer ${this.jwtToken}`,
        'Content-Type': 'application/json',
      };
      
      console.log('Request headers:', {
        Authorization: 'Bearer [TOKEN HIDDEN]',
        'Content-Type': 'application/json'
      });
      
      // Use this try-catch to specifically catch CORS errors
      try {
        console.log('Sending OTP verification request...');
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ otp }),
          // Add this to help with CORS troubleshooting
          mode: 'cors',
          credentials: 'same-origin'
        });
        
        console.log('OTP verification response status:', response.status);
        console.log('Response headers:', [...response.headers.entries()].reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {}));
        
        if (!response.ok) {
          console.error('OTP verification response not OK:', response.status);
          try {
            const errorData = await response.json();
            console.error('Error data:', errorData);
            return {
              status: 'error',
              message: errorData.error || 'Invalid access code'
            };
          } catch (err) {
            console.error('Could not parse error response:', err);
            // Try to get the raw response text
            try {
              const errorText = await response.text();
              console.error('Error response body:', errorText);
            } catch (textErr) {
              console.error('Could not get error text either');
            }
            return {
              status: 'error',
              message: 'Invalid access code'
            };
          }
        }
        
        console.log('OTP verification successful, parsing response');
        const data = await response.json();
        console.log('OTP verification response data:', data);
        
        // Save medical records access token
        if (data.med_access_token) {
          this.medAccessToken = data.med_access_token;
          
          // Verify token format (should be 32-character alphanumeric)
          if (!/^[a-zA-Z0-9]{32}$/.test(this.medAccessToken)) {
            console.warn('Received med_access_token doesn\'t match expected format (32-char alphanumeric):', 
                        this.medAccessToken.substring(0, 4) + '...');
          }
          
          // Save to localStorage with expiry
          const expiresIn = data.expires_in || 900; // Default to 15 minutes (900 seconds)
          const expiresAt = new Date().getTime() + (expiresIn * 1000);
          localStorage.setItem('med_access_token', this.medAccessToken);
          localStorage.setItem('med_access_expires_at', expiresAt.toString());
          
          console.log('Saved med_access_token to localStorage, expires in:', expiresIn, 'seconds');
          
          return {
            status: 'success',
            message: 'Medical records access granted',
            expiresIn: expiresIn
          };
        }
        
        console.error('Response OK but no med_access_token in response');
        console.log('Full response data:', data);
        return {
          status: 'error',
          message: 'Failed to verify access code'
        };
      } catch (fetchError) {
        // Specifically handle CORS and network errors
        console.error('OTP fetch error (could be CORS related):', fetchError);
        return {
          status: 'error',
          code: 'NETWORK_ERROR',
          message: 'Network error when verifying code. This could be due to CORS configuration.'
        };
      }
    } catch (error) {
      console.error('Medical records OTP verification error:', error);
      return {
        status: 'error',
        message: 'Verification failed. Please try again.'
      };
    }
  }

  /**
   * STEP 5: Finally fetch medical records (requires both security layers)
   */
  async getMedicalRecords() {
    try {
      console.log('Starting getMedicalRecords request');
      
      // First check if we have JWT token
      if (!this.jwtToken) {
        // Try to get from localStorage
        this.jwtToken = localStorage.getItem('phb_auth_token');
        console.log('JWT token from localStorage:', this.jwtToken ? 'Found' : 'Not found');
        
        if (!this.jwtToken) {
          console.log('No JWT token available, aborting request');
          return {
            status: 'error',
            code: 'AUTH_REQUIRED',
            message: 'You must be logged in to access medical records'
          };
        }
      }
      
      // Check if we have a stored med_access_token
      if (!this.medAccessToken) {
        // Try to get from localStorage
        const storedToken = localStorage.getItem('med_access_token');
        const expiresAt = localStorage.getItem('med_access_expires_at');
        console.log('Med access token from localStorage:', storedToken ? 'Found' : 'Not found');
        
        if (storedToken && expiresAt) {
          const now = new Date().getTime();
          if (now < parseInt(expiresAt)) {
            this.medAccessToken = storedToken;
            console.log('Med access token is valid');
            
            // Verify token format (should be 32-character alphanumeric)
            if (!/^[a-zA-Z0-9]{32}$/.test(this.medAccessToken)) {
              console.warn('Med access token doesn\'t match expected format (32-char alphanumeric)');
            }
          } else {
            // Token expired
            console.log('Med access token is expired');
            localStorage.removeItem('med_access_token');
            localStorage.removeItem('med_access_expires_at');
            
            return {
              status: 'error',
              code: 'MED_ACCESS_EXPIRED',
              message: 'Your medical records access has expired. Please verify again.'
            };
          }
        } else {
          console.log('No med access token available');
          return {
            status: 'error',
            code: 'MED_ACCESS_REQUIRED',
            message: 'Medical records require additional verification'
          };
        }
      }
      
      // Now fetch the medical records with both tokens
      const apiUrl = this.getApiUrl('patient/medical-record/');
      console.log('Fetching medical records from:', apiUrl);
      
      const headers = {
        'Authorization': `Bearer ${this.jwtToken}`,
        'X-Med-Access-Token': this.medAccessToken
      };
      
      console.log('Request headers:', {
        Authorization: 'Bearer [TOKEN HIDDEN]', 
        'X-Med-Access-Token': '[TOKEN HIDDEN]'
      });
      
      // Use this try-catch to specifically catch CORS errors
      try {
        console.log('Sending fetch request...');
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: headers,
          // Add this to help with CORS troubleshooting
          mode: 'cors',
          credentials: 'same-origin'
        });
        
        console.log('Response received:', {
          status: response.status,
          statusText: response.statusText,
          headers: [...response.headers.entries()].reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {})
        });
        
        if (!response.ok) {
          console.error('Response not OK:', response.status);

          // Handle 401 Unauthorized - most likely means we need med_access_token
          if (response.status === 401) {
            console.log('Unauthorized request (401) - requires medical records verification');
            // Clear any invalid tokens
            this.medAccessToken = null;
            localStorage.removeItem('med_access_token');
            localStorage.removeItem('med_access_expires_at');
            
            return {
              status: 'error',
              code: 'MED_ACCESS_REQUIRED',
              message: 'Medical records require additional verification'
            };
          }
          
          if (response.status === 403) {
            // Check specific error code
            try {
              const errorData = await response.json();
              console.log('Error data:', errorData);
              
              if (errorData.code === 'MED_ACCESS_EXPIRED') {
                // Clear expired token
                this.medAccessToken = null;
                localStorage.removeItem('med_access_token');
                localStorage.removeItem('med_access_expires_at');
                
                return {
                  status: 'error',
                  code: 'MED_ACCESS_EXPIRED',
                  message: 'Your medical records access has expired. Please verify again.'
                };
              } else if (errorData.code === 'MED_ACCESS_REQUIRED') {
                return {
                  status: 'error',
                  code: 'MED_ACCESS_REQUIRED',
                  message: 'Medical records require additional verification'
                };
              } else if (errorData.code === 'INVALID_MED_ACCESS') {
                // Clear invalid token
                this.medAccessToken = null;
                localStorage.removeItem('med_access_token');
                localStorage.removeItem('med_access_expires_at');
                
                return {
                  status: 'error',
                  code: 'INVALID_MED_ACCESS',
                  message: 'Invalid medical records access token. Please verify again.'
                };
              }
            } catch (err) {
              console.log('Failed to parse error JSON, treating as generic authorization error');
              // Still clear tokens just in case
              this.medAccessToken = null;
              localStorage.removeItem('med_access_token');
              localStorage.removeItem('med_access_expires_at');
              
              return {
                status: 'error',
                code: 'MED_ACCESS_REQUIRED',
                message: 'Medical records require additional verification'
              };
            }
          }
          
          // Attempt to read the error response body
          try {
            const errorText = await response.text();
            console.error('Error response body:', errorText);
          } catch (err) {
            console.error('Could not read error response body');
          }
          
          return {
            status: 'error',
            message: 'Failed to fetch medical records'
          };
        }
        
        console.log('Response OK, parsing JSON');
        let responseData;
        
        try {
          responseData = await response.json();
          console.log('Received medical records raw data:', responseData);
          
          // Try to normalize the data into the expected format
          let normalizedData = responseData;
          
          // Check if the data has a nested structure
          if (responseData && typeof responseData === 'object') {
            // If the data is an object with a 'records' or 'data' property, use that
            if (responseData.records) {
              console.log('Found records property in response');
              normalizedData = responseData.records;
            } else if (responseData.data) {
              console.log('Found data property in response');
              normalizedData = responseData.data;
            } else if (responseData.medical_records) {
              console.log('Found medical_records property in response');
              normalizedData = responseData.medical_records;
            }
            
            // If we got an empty object or something non-array like, create an empty array
            if (!normalizedData || (typeof normalizedData === 'object' && !Array.isArray(normalizedData) && Object.keys(normalizedData).length === 0)) {
              console.log('Received empty or invalid data, defaulting to empty array');
              normalizedData = [];
            }
            
            // If we have a single record not in an array, wrap it
            if (normalizedData && typeof normalizedData === 'object' && !Array.isArray(normalizedData) && 'id' in normalizedData) {
              console.log('Found single record, wrapping in array');
              normalizedData = [normalizedData];
            }
          }
          
          console.log('Normalized medical records data:', normalizedData);
          
          return {
            status: 'success',
            data: normalizedData
          };
        } catch (parseError) {
          console.error('Failed to parse JSON response:', parseError);
          return {
            status: 'error',
            code: 'INVALID_RESPONSE_FORMAT',
            message: 'Could not parse server response'
          };
        }
      } catch (fetchError) {
        // Specifically handle CORS and network errors
        console.error('Fetch error (could be CORS related):', fetchError);
        return {
          status: 'error',
          code: 'NETWORK_ERROR',
          message: 'Network error when accessing medical records. This could be due to CORS configuration.'
        };
      }
    } catch (error) {
      console.error('Medical records fetch error:', error);
      return {
        status: 'error',
        message: 'Failed to load medical records. Please try again.'
      };
    }
  }
}

// Export a singleton instance
export default new MedicalRecordsService(); 