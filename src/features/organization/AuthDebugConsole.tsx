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
      
      // Log localStorage content
      const storedAuth = localStorage.getItem('organizationAuth');
      if (storedAuth) {
        try {
          const parsed = JSON.parse(storedAuth);
          console.log('LocalStorage Auth:', {
            hasUserData: !!parsed.userData,
            hasTokens: !!parsed.tokens,
            userRole: parsed.userData?.role,
            hospitalId: parsed.userData?.hospital?.id,
            hospitalName: parsed.userData?.hospital?.name,
          });
        } catch (e) {
          console.log('LocalStorage Parse Error:', e);
        }
      } else {
        console.log('LocalStorage Auth: None');
      }
      console.groupEnd();
    }
  }, [auth]);

  return null; // This component doesn't render anything
};

export default AuthDebugConsole;
