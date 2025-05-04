/**
 * Test script to find the correct medical records API endpoint
 * 
 * To use this:
 * 1. Make sure you're logged in to the application
 * 2. Have completed OTP verification for medical records
 * 3. Open browser console and run the following:
 *    import('/src/features/health/testMedicalRecordEndpoint.ts').then(module => module.testAllEndpoints())
 */

// Get tokens from localStorage
const getTokens = () => {
  const authToken = localStorage.getItem('phb_auth_token');
  const medAccessToken = localStorage.getItem('med_access_token');
  
  return { authToken, medAccessToken };
};

// List of potential API endpoints to try
const endpointsToTest = [
  'http://localhost:8000/api/patient/medical-record',
  'http://localhost:8000/api/patient/medical-record/',
  'http://localhost:8000/api/patient/medical-records',
  'http://localhost:8000/api/patient/medical-records/',
  '/api/patient/medical-record',
  '/api/patient/medical-record/',
  '/api/patient/medical-records',
  '/api/patient/medical-records/',
  'api/patient/medical-record',
  'api/patient/medical-record/',
  'api/patient/medical-records',
  'api/patient/medical-records/',
  'http://localhost:5000/api/patient/medical-record/',
  'http://127.0.0.1:8000/api/patient/medical-record/'
];

// Test a single endpoint
const testEndpoint = async (url: string): Promise<{ success: boolean; status: number; data?: any }> => {
  try {
    const { authToken, medAccessToken } = getTokens();
    
    if (!authToken || !medAccessToken) {
      console.error('Missing tokens! Make sure you are logged in and completed OTP verification');
      return { success: false, status: 0 };
    }
    
    console.log(`Testing endpoint: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'X-Med-Access-Token': medAccessToken
      }
    });
    
    const status = response.status;
    console.log(`Response status: ${status}`);
    
    if (response.ok) {
      try {
        const data = await response.json();
        console.log('SUCCESS! Data received:', data);
        return { success: true, status, data };
      } catch (e) {
        console.log('Response was OK but failed to parse JSON');
        return { success: true, status, data: null };
      }
    }
    
    return { success: false, status };
  } catch (error) {
    console.error(`Error testing ${url}:`, error);
    return { success: false, status: 0 };
  }
};

// Test all endpoints and find the one that works
export const testAllEndpoints = async (): Promise<void> => {
  console.log('Starting medical records endpoint test...');
  console.log('========================================');
  
  const { authToken, medAccessToken } = getTokens();
  console.log(`Auth token available: ${!!authToken}`);
  console.log(`Med Access token available: ${!!medAccessToken}`);
  
  if (!authToken || !medAccessToken) {
    console.error('ERROR: Missing tokens! Make sure you are logged in and completed OTP verification');
    return;
  }
  
  console.log('========================================');
  console.log('Testing all possible endpoints:');
  
  let successfulEndpoint = null;
  
  for (const endpoint of endpointsToTest) {
    const result = await testEndpoint(endpoint);
    
    if (result.success) {
      console.log(`✅ SUCCESS: ${endpoint} (Status: ${result.status})`);
      successfulEndpoint = endpoint;
      
      // Save the successful endpoint to localStorage for later use
      localStorage.setItem('working_medical_record_endpoint', endpoint);
      
      // Break after finding the first working endpoint
      break;
    } else {
      console.log(`❌ FAILED: ${endpoint} (Status: ${result.status})`);
    }
  }
  
  console.log('========================================');
  
  if (successfulEndpoint) {
    console.log(`✅ FOUND WORKING ENDPOINT: ${successfulEndpoint}`);
    console.log('This endpoint has been saved to localStorage as "working_medical_record_endpoint"');
    console.log('You can update your code to use this endpoint');
  } else {
    console.log('❌ No working endpoints found. Please check your backend configuration.');
  }
}; 