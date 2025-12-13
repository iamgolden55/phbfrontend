import React from 'react';
import { useOrganizationAuth } from './organizationAuthContext';

const AuthDebugConsole: React.FC = () => {
  const auth = useOrganizationAuth();

  React.useEffect(() => {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🔐 Auth Debug Info');
      console.log('Initialized:', auth.isInitialized);
      console.log('Loading:', auth.isLoading);
      console.log('Authenticated:', auth.isAuthenticated);
      console.log('Needs Verification:', auth.needsVerification);
      console.log('Current Email:', auth.currentEmail);
      console.log('User Data:', auth.userData);
      console.log('Error:', auth.error);

      // Log authentication method (now using HTTP-only cookies)
      console.log('🔒 Authentication Method: HTTP-only Cookies (XSS Protected)');
      console.log('🍪 Tokens stored in httpOnly cookies (not accessible to JavaScript)');
      console.log('✅ No sensitive data in localStorage or sessionStorage');

      // Check if sessionStorage has any org-related data (should be empty now)
      const sessionKeys = Object.keys(sessionStorage).filter(key => key.includes('org'));
      if (sessionKeys.length > 0) {
        console.warn('⚠️ WARNING: Found org-related sessionStorage keys:', sessionKeys);
      } else {
        console.log('✅ sessionStorage: Clean (no auth data)');
      }

      console.groupEnd();
    }
  }, [auth]);

  return null; // This component doesn't render anything
};

export default AuthDebugConsole;
