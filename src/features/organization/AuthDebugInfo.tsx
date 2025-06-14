import React from 'react';
import { useOrganizationAuth } from './organizationAuthContext';

const AuthDebugInfo: React.FC = () => {
  const { 
    isAuthenticated, 
    userData, 
    needsVerification, 
    currentEmail, 
    isLoading, 
    isInitialized,
    error 
  } = useOrganizationAuth();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 bg-gray-800 text-white p-3 rounded-lg text-xs max-w-xs z-50">
      <h4 className="font-bold mb-2">🔐 Auth Debug</h4>
      <div className="space-y-1">
        <div>Initialized: {isInitialized ? '✅' : '❌'}</div>
        <div>Loading: {isLoading ? '⏳' : '✅'}</div>
        <div>Authenticated: {isAuthenticated ? '✅' : '❌'}</div>
        <div>Needs Verification: {needsVerification ? '⚠️' : '✅'}</div>
        <div>Current Email: {currentEmail ? '📧' : '❌'}</div>
        <div>User Data: {userData ? '👤' : '❌'}</div>
        {error && <div className="text-red-300">Error: {error}</div>}
      </div>
    </div>
  );
};

export default AuthDebugInfo;
