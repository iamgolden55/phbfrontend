// Test script to verify connection to the doctor-appointments API endpoint
const API_BASE_URL = 'http://127.0.0.1:8000';
const AUTH_TOKEN_KEY = 'phb_auth_token';

async function testDoctorAppointmentsAPI() {
  console.log('Testing connection to the doctor-appointments API endpoint...');
  
  try {
    // Get the authentication token from localStorage if exists
    // For testing purposes only - you might want to replace this with a valid token
    const token = localStorage.getItem(AUTH_TOKEN_KEY) || 'your_test_token_here';
    
    const response = await fetch(`${API_BASE_URL}/api/doctor-appointments/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching appointments: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    
    // Check if response has the expected structure
    if (Array.isArray(data)) {
      console.log('Response is an array of appointments');
      
      if (data.length > 0) {
        console.log('First appointment data structure:', data[0]);
        console.log('Patient name available:', data[0].patient_name || 'NOT FOUND');
        console.log('Appointment ID available:', data[0].appointment_id || 'NOT FOUND');
      } else {
        console.log('No appointments found in the response');
      }
    } else {
      console.log('Response is not an array. Structure:', data);
    }
    
    return data;
  } catch (error) {
    console.error('Error connecting to the API:', error);
    return null;
  }
}

// Run the test
testDoctorAppointmentsAPI()
  .then(result => {
    if (result) {
      console.log('✅ API connection successful!');
    } else {
      console.log('❌ API connection failed.');
    }
  });

// Usage instructions:
// 1. Run this script in the browser console after logging in
// 2. Make sure the API server is running at http://127.0.0.1:8000
// 3. Check the console logs to verify the API connection 