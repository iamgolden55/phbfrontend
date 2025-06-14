// Debug localStorage persistence
window.debugAuth = {
  check: () => {
    const stored = localStorage.getItem('organizationAuth');
    console.log('🔍 Debug Auth Check:');
    console.log('localStorage exists:', !!stored);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log('Auth data structure:', {
          hasUserData: !!parsed.userData,
          hasTokens: !!parsed.tokens,
          userEmail: parsed.userData?.email,
          userRole: parsed.userData?.role,
          hospitalId: parsed.userData?.hospital?.id,
          hospitalName: parsed.userData?.hospital?.name
        });
      } catch (e) {
        console.log('Parse error:', e);
      }
    }
  },
  
  clear: () => {
    localStorage.removeItem('organizationAuth');
    console.log('✅ Auth cleared');
  },
  
  setTest: () => {
    const testAuth = {
      userData: { id: 1, email: 'test@example.com', role: 'hospital_admin' },
      tokens: { access: 'test-token', refresh: 'test-refresh' }
    };
    localStorage.setItem('organizationAuth', JSON.stringify(testAuth));
    console.log('✅ Test auth set');
  }
};

console.log('🔍 Debug commands available:');
console.log('window.debugAuth.check() - Check current auth state');
console.log('window.debugAuth.clear() - Clear auth data');
console.log('window.debugAuth.setTest() - Set test auth data');
