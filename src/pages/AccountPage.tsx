import React, { useEffect, useState } from 'react';
import { useAuth } from '../features/auth/authContext';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import WomensHealthHub from '../features/womens-health/WomensHealthHub';

const AccountPage: React.FC = () => {
  const { user, isAuthenticated, logout, hasPrimaryHospital, primaryHospital, primaryHospitalStatus, checkPrimaryHospital } = useAuth();
  const [isProfessionalView, setIsProfessionalView] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isCheckingHospital, setIsCheckingHospital] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the user is a doctor and what view they're in
  useEffect(() => {
    const checkViewPreference = () => {
      const viewPreference = localStorage.getItem('phb_view_preference');
      const newIsProfessionalView = viewPreference === 'doctor';
      
      if (user?.role === 'doctor' || user?.hpn) {
        setIsProfessionalView(newIsProfessionalView);
        
        // If in professional view, redirect to professional dashboard
        if (newIsProfessionalView) {
          navigate('/professional/dashboard');
        }
      }
    };
    
    // Check initially
    checkViewPreference();
    
    // Set up event listener for storage changes (when toggle is clicked elsewhere)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'phb_view_preference') {
        checkViewPreference();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for immediate updates within the same window
    const handleCustomViewChange = () => checkViewPreference();
    window.addEventListener('phb_view_changed', handleCustomViewChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('phb_view_changed', handleCustomViewChange);
    };
  }, [user, navigate]);

  // Check the primary hospital status when the component mounts
  useEffect(() => {
    // Create a flag to prevent duplicate API calls
    let isMounted = true;

    const checkHospitalStatus = async () => {
      console.log('🏥 AccountPage: checkHospitalStatus called', { isAuthenticated, hasUser: !!user, isMounted });

      if (isAuthenticated && user && isMounted) {
        setIsCheckingHospital(true);
        console.log('🏥 AccountPage: Calling checkPrimaryHospital()');
        try {
          // Check if the user has a primary hospital registered
          const result = await checkPrimaryHospital();
          console.log('🏥 AccountPage: checkPrimaryHospital result:', result);
        } catch (error) {
          console.error('❌ AccountPage: Failed to check primary hospital status:', error);
        } finally {
          if (isMounted) {
            console.log('🏥 AccountPage: Setting isCheckingHospital to false');
            setIsCheckingHospital(false);
          }
        }
      } else {
        // If not authenticated or no user, stop loading
        console.log('🏥 AccountPage: Not authenticated or no user, stopping loading');
        setIsCheckingHospital(false);
      }
    };

    checkHospitalStatus();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]); // Only re-check when auth state or user changes, NOT checkPrimaryHospital
  
  // Check for redirect messages in location state
  useEffect(() => {
    // Check if we have a redirect message in the location state
    if (location.state && 'hospitalMessage' in location.state) {
      setAlertMessage(location.state.hospitalMessage as string);
      
      // Clear the location state to prevent showing the message again on refresh
      // This is a bit of a hack but necessary since we can't modify the location state directly
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
  };

  // Show appointments in the patient view unless doctor is in professional view
  const showAppointmentsLink = !(isProfessionalView && (user?.role === 'doctor' || user?.hpn));

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">My Account</h1>
          <p className="text-xl font-medium">
            Manage your health information and PHB services
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        {/* Hospital status alert message */}
        {alertMessage && (
          <div className="mb-6 p-4 rounded-md bg-amber-50 border border-amber-200 text-amber-800">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  {alertMessage}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar with user info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start mb-4">
                <div className="bg-[#005eb8] text-white rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
                  {user?.full_name ? user.full_name.charAt(0) : '?'}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold">{user?.full_name}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>

              {user?.hpn && (
                <div className="mb-4 p-3 bg-gray-50 rounded-md">
                  <h3 className="font-bold text-gray-700">HPN Number</h3>
                  <p className="text-lg">{user?.hpn}</p>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="w-full mt-4 border border-[#005eb8] text-[#005eb8] hover:bg-[#f0f4f5] py-2 rounded transition-colors"
              >
                Sign out
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-bold mb-4">Account settings</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/account/personal-details" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Personal details
                  </Link>
                </li>
                <li>
                  <Link to="/account/contact-preferences" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact preferences
                  </Link>
                </li>
                <li>
                  <Link to="/account/security" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Security & Login
                  </Link>
                </li>
                <li>
                  <Link to="/account/password" className="text-[#005eb8] hover:underline flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Change password
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Your Health Services</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/account/gp-record"
                  className="bg-[#f0f4f5] p-4 rounded-md flex items-center hover:bg-[#e8edee] transition-colors"
                >
                  <div className="rounded-full bg-blue-100 p-3 mr-3">
                    <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">GP Health Record</h3>
                    <p className="text-sm text-gray-600">View your medical records</p>
                  </div>
                </Link>

                <Link
                  to="/account/prescriptions"
                  className="bg-[#f0f4f5] p-4 rounded-md flex items-center hover:bg-[#e8edee] transition-colors"
                >
                  <div className="rounded-full bg-green-100 p-3 mr-3">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Prescriptions</h3>
                    <p className="text-sm text-gray-600">Order and track prescriptions</p>
                  </div>
                </Link>

                {showAppointmentsLink && (
                  <Link
                    to="/account/appointments"
                    className="bg-[#f0f4f5] p-4 rounded-md flex items-center hover:bg-[#e8edee] transition-colors"
                  >
                    <div className="rounded-full bg-purple-100 p-3 mr-3">
                      <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Appointments</h3>
                      <p className="text-sm text-gray-600">Book and manage appointments</p>
                    </div>
                  </Link>
                )}

                <Link
                  to="/account/test-results"
                  className="bg-[#f0f4f5] p-4 rounded-md flex items-center hover:bg-[#e8edee] transition-colors"
                >
                  <div className="rounded-full bg-yellow-100 p-3 mr-3">
                    <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Test Results</h3>
                    <p className="text-sm text-gray-600">View your test results</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Hospital Status Loading Indicator */}
            {isCheckingHospital && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-center py-4">
                  <svg className="animate-spin h-6 w-6 text-blue-600 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-gray-600">Checking hospital registration status...</span>
                </div>
              </div>
            )}

            {/* Primary Hospital Registration Alert - Shows different messages based on registration status */}
            {!isCheckingHospital && !hasPrimaryHospital && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="p-3 rounded-md bg-blue-50 text-blue-700">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">
                        Please register with a primary hospital to access all health services
                      </p>
                      <p className="text-sm mt-1">
                        Registering with a primary hospital allows you to access prescriptions, appointments, and other health services.
                      </p>
                      <div className="mt-2">
                        <Link
                          to="/account/link-phb"
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                        >
                          View available hospitals
                          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pending Registration Alert */}
            {!isCheckingHospital && hasPrimaryHospital && primaryHospitalStatus === 'pending' && primaryHospital && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="p-3 rounded-md bg-amber-50 text-amber-800">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">
                        Your registration with <strong>{primaryHospital.name}</strong> is pending approval
                      </p>
                      <p className="text-sm mt-1">
                        You'll receive a notification once your registration has been approved by the hospital. This typically takes 1-2 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rejected Registration Alert */}
            {!isCheckingHospital && hasPrimaryHospital && primaryHospitalStatus === 'rejected' && primaryHospital && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="p-3 rounded-md bg-red-50 text-red-800">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">
                        Your registration with <strong>{primaryHospital.name}</strong> was not approved
                      </p>
                      <p className="text-sm mt-1">
                        Please contact the hospital for more information or select a different hospital.
                      </p>
                      <div className="mt-2">
                        <Link
                          to="/account/link-phb"
                          className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center"
                        >
                          Choose a different hospital
                          <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Your Health</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#f0f4f5] p-4 rounded-md">
                  <h3 className="font-bold mb-2">Health Goals</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Track your health goals and progress
                  </p>
                  <Link to="/account/health-goals" className="text-[#005eb8] hover:underline text-sm">
                    Set up health goals
                  </Link>
                </div>

                <div className="bg-[#f0f4f5] p-4 rounded-md">
                  <h3 className="font-bold mb-2">Health Records</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Store and manage your health documents
                  </p>
                  <Link to="/account/health-records" className="text-[#005eb8] hover:underline text-sm">
                    Manage records
                  </Link>
                </div>
              </div>

              <div className={`grid grid-cols-1 ${user?.gender !== 'male' ? 'md:grid-cols-2' : ''} gap-4 mb-6`}>
                {/* New Medical Records section */}
                <div className="bg-[#f0f4f5] p-4 rounded-md">
                  <h3 className="font-bold mb-2">Medical Records</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Access your complete medical history with secure verification
                  </p>
                  <Link to="/account/medical-records" className="text-[#005eb8] hover:underline text-sm">
                    View medical records
                  </Link>
                </div>

                {/* Women's Health Hub - Only show for non-male users */}
                {user?.gender !== 'male' && <WomensHealthHub />}
              </div>

              <Link
                to="/tools/health-assessments"
                className="block bg-[#005eb8] hover:bg-[#003f7e] text-white p-4 rounded-md transition-colors text-center"
              >
                Take a Health Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
