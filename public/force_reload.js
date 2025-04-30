// This is a cache-busting script for the PHB application
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the appointments or test results page
  const path = window.location.pathname;
  if (path.includes('/account/appointments') || path.includes('/account/test-results')) {
    // For debugging - this will help identify cache issues
    console.log('Cache-busting active: ' + new Date().toISOString());

    // Force a reload if we detect we're stuck in a stale version
    const forceReload = () => {
      if (document.querySelector('.coming-soon-message')) {
        console.log('Detected stale "Coming Soon" UI, triggering reload');
        window.location.reload(true);
      }
    };

    // Try to reload after a short delay if we detect the old UI
    setTimeout(forceReload, 1000);
  }
});
