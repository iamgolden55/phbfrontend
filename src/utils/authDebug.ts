/**
 * Authentication Debugging Utility
 *
 * Run this in browser console to check authentication status
 */

export async function debugAuth() {
  const API_BASE_URL = 'http://127.0.0.1:8000';

  console.log('=== AUTH DEBUG START ===');

  // 1. Check if cookies exist (will be empty if httpOnly)
  console.log('1. Document cookies (httpOnly cookies won\'t show):', document.cookie);

  // 2. Try to fetch profile (should work if authenticated)
  console.log('\n2. Testing /api/profile/ endpoint...');
  try {
    const profileResponse = await fetch(`${API_BASE_URL}/api/profile/`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('Profile Status:', profileResponse.status);

    if (profileResponse.ok) {
      const profileData = await profileResponse.json();
      console.log('✅ Profile loaded successfully:', profileData);
    } else {
      const errorText = await profileResponse.text();
      console.log('❌ Profile failed:', errorText);
    }
  } catch (error) {
    console.error('❌ Profile request error:', error);
  }

  // 3. Try to request medical OTP (the failing endpoint)
  console.log('\n3. Testing /api/patient/medical-record/request-otp/ endpoint...');
  try {
    const otpResponse = await fetch(`${API_BASE_URL}/api/patient/medical-record/request-otp/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({})
    });

    console.log('OTP Request Status:', otpResponse.status);
    console.log('OTP Request Headers:', Object.fromEntries(otpResponse.headers.entries()));

    if (otpResponse.ok) {
      const otpData = await otpResponse.json();
      console.log('✅ OTP request successful:', otpData);
    } else {
      const errorText = await otpResponse.text();
      console.log('❌ OTP request failed:', errorText);
    }
  } catch (error) {
    console.error('❌ OTP request error:', error);
  }

  // 4. Check localStorage
  console.log('\n4. LocalStorage tokens:');
  console.log('- phb_token:', localStorage.getItem('phb_token') ? 'EXISTS' : 'NOT FOUND');
  console.log('- med_access_token:', localStorage.getItem('med_access_token') ? 'EXISTS' : 'NOT FOUND');
  console.log('- med_access_expiry:', localStorage.getItem('med_access_expiry'));

  console.log('\n=== AUTH DEBUG END ===');
}

// Make it available globally for browser console
if (typeof window !== 'undefined') {
  (window as any).debugAuth = debugAuth;
  console.log('✅ Auth debug tool loaded. Run debugAuth() in console to test.');
}
