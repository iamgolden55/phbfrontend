/**
 * Test script to find the correct medical records API endpoint
 * 
 * To use this:
 * 1. Make sure you're logged in to the application
 * 2. Have completed OTP verification for medical records
 * 3. Open browser console and run the following:
 *    import('/src/features/health/testMedicalRecordEndpoint.ts').then(module => module.testAllEndpoints())
 */

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
const testEndpoint = async (url: string, medAccessToken?: string): Promise<{ success: boolean; status: number; data?: any }> => {
  try {
    console.log(`Testing endpoint: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(medAccessToken ? { 'X-Med-Access-Token': medAccessToken } : {})
      },
      credentials: 'include'
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
export const testAllEndpoints = async (medAccessToken?: string): Promise<void> => {
  console.log('Starting medical records endpoint test...');
  console.log('========================================');
  console.log(`Med Access token provided: ${!!medAccessToken}`);
  
  console.log('========================================');
  console.log('Testing all possible endpoints:');
  
  let successfulEndpoint = null;
  
  for (const endpoint of endpointsToTest) {
    const result = await testEndpoint(endpoint, medAccessToken);
    
    if (result.success) {
      console.log(`✅ SUCCESS: ${endpoint} (Status: ${result.status})`);
      successfulEndpoint = endpoint;
      
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