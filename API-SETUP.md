# API Setup for PHB Doctor Appointments

This document explains how to set up and test the API connection for doctor appointments in the PHB frontend application.

## Backend Requirements

The frontend expects the backend API to expose the following endpoint:

- `/api/doctor-appointments/` - Returns a list of appointments for the authenticated doctor

The API response should include the following fields for each appointment:
- `appointment_id` - Unique identifier for the appointment
- `patient_name` - Name of the patient
- `appointment_date` - ISO date string for the appointment
- `formatted_date` - Human-readable date
- `formatted_time` - Human-readable time
- `status` - Status of the appointment (e.g., "scheduled", "cancelled")
- `priority` - Priority level (e.g., "normal", "urgent", "high")

## Testing the API Connection

We've provided two tools to test the API connection:

### 1. Browser-based Test Tool

Open `test-api.html` in your browser to use the interactive test tool. This tool allows you to:
- Specify the API URL (default: http://127.0.0.1:8000)
- Provide an authentication token or use one from localStorage
- Test the connection and view the response structure

To use this tool:
1. Start your backend server
2. Open `test-api.html` in your browser
3. Enter the API URL and token (if needed)
4. Click "Test Connection"
5. Check the results in the log display

### 2. Console Script

You can also test the API connection using the JavaScript console in your browser:

1. Open your app in the browser (e.g., http://localhost:5173/professional/dashboard)
2. Log in to ensure you have a valid authentication token
3. Open the browser developer tools (F12 or Right-click > Inspect)
4. Paste the following code into the console:

```javascript
const API_BASE_URL = 'http://127.0.0.1:8000';
const AUTH_TOKEN_KEY = 'phb_auth_token';

async function testDoctorAppointmentsAPI() {
  console.log('Testing connection to the doctor-appointments API endpoint...');
  
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    
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
    
    return data;
  } catch (error) {
    console.error('Error connecting to the API:', error);
    return null;
  }
}

testDoctorAppointmentsAPI();
```

## Troubleshooting

If you encounter issues connecting to the API:

1. **CORS Issues**: Make sure your backend is configured to allow cross-origin requests from your frontend domain.

2. **Authentication Issues**: Verify that:
   - You're logged in and have a valid token in localStorage
   - The token is being sent in the correct format (Bearer token)
   - The token hasn't expired

3. **Backend Service**: Ensure your backend server is running and accessible at the specified URL.

4. **API Response Format**: If the API connects but the data doesn't appear in the dashboard, check that the response includes all the required fields with the correct names.

## Fallback Mechanism

The frontend is designed to display mock data if the API connection fails. This allows you to develop and test the UI even without a working backend. If you see mock data in the dashboard, it means the application couldn't connect to the API successfully. 