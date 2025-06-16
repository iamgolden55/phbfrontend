import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/authContext';
import { useProfessionalAuth } from '../features/professional/professionalAuthContext';

// Create a localStorage key for storing the view preference
const VIEW_PREFERENCE_KEY = 'phb_view_preference';
const PROFESSIONAL_AUTH_STATE_KEY = 'phb_professional_auth_state';

interface EnhancedViewToggleProps {
  className?: string;
  compact?: boolean; // For different display modes (full vs compact)
}

const EnhancedViewToggle: React.FC<EnhancedViewToggleProps> = ({ 
  className = '', 
  compact = false 
}) => {
  const { user, isDoctor } = useAuth();
  const { professionalUser } = useProfessionalAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize with stored preference or default to regular view
  const [isProfessionalView, setIsProfessionalView] = useState<boolean>(() => {
    // Check localStorage for saved preference
    const savedPreference = localStorage.getItem(VIEW_PREFERENCE_KEY);
    if (savedPreference) {
      return savedPreference === 'doctor';
    }
    
    // Default to current path if no saved preference
    return location.pathname.includes('/professional');
  });
  
  // Track animation state
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Track touch/tap feedback
  const [isTouched, setIsTouched] = useState(false);
  
  // Check if we should show the toggle - either user is a doctor or professional user is logged in
  const showToggle = isDoctor || (user?.role === 'doctor') || (user?.hpn) || professionalUser?.role === 'doctor';
  
  // If the doctor HPN exists, it confirms this user is a doctor
  const hasHPN = !!user?.hpn;
  
  // Handle route changes
  useEffect(() => {
    // If the user navigates directly to a professional route,
    // update the toggle state to match
    const isCurrentlyInProfessionalView = location.pathname.includes('/professional');
    if (isCurrentlyInProfessionalView !== isProfessionalView) {
      setIsProfessionalView(isCurrentlyInProfessionalView);
      // Update stored preference to match current location
      localStorage.setItem(VIEW_PREFERENCE_KEY, isCurrentlyInProfessionalView ? 'doctor' : 'patient');
      
      // If switching to professional view, set auth state
      if (isCurrentlyInProfessionalView && (isDoctor || user?.role === 'doctor' || user?.hpn || professionalUser)) {
        localStorage.setItem(PROFESSIONAL_AUTH_STATE_KEY, 'true');
      }
    }
  }, [location.pathname, isProfessionalView, isDoctor, user, professionalUser]);

  // Create a custom event that will keep the view state consistent
  useEffect(() => {
    // Broadcast the initial view state on component mount
    const initialViewState = isProfessionalView ? 'doctor' : 'patient';
    localStorage.setItem(VIEW_PREFERENCE_KEY, initialViewState);
    
    // If doctor and in professional view, set auth state
    if (isProfessionalView && (isDoctor || user?.role === 'doctor' || user?.hpn || professionalUser)) {
      localStorage.setItem(PROFESSIONAL_AUTH_STATE_KEY, 'true');
    }
    
    // Function to handle popstate (browser back/forward buttons)
    const handlePopState = () => {
      const currentPreference = localStorage.getItem(VIEW_PREFERENCE_KEY);
      const isInProfessionalPath = location.pathname.includes('/professional');
      
      // If there's a mismatch between path and preference, fix it
      if ((isInProfessionalPath && currentPreference !== 'doctor') || 
          (!isInProfessionalPath && currentPreference === 'doctor')) {
        localStorage.setItem(VIEW_PREFERENCE_KEY, isInProfessionalPath ? 'doctor' : 'patient');
        setIsProfessionalView(isInProfessionalPath);
      }
      
      // Ensure auth state is set when navigating to professional pages
      if (isInProfessionalPath && (isDoctor || user?.role === 'doctor' || user?.hpn || professionalUser)) {
        localStorage.setItem(PROFESSIONAL_AUTH_STATE_KEY, 'true');
      }
    };
    
    // Listen for browser navigation events
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isProfessionalView, isDoctor, user, professionalUser, location.pathname]);
  
  // Handle toggle switch
  const handleToggleView = () => {
    // Set animation state
    setIsAnimating(true);
    
    // Toggle the view
    const newValue = !isProfessionalView;
    setIsProfessionalView(newValue);
    
    // Save preference
    localStorage.setItem(VIEW_PREFERENCE_KEY, newValue ? 'doctor' : 'patient');
    
    // Set auth state if switching to professional view and user is a doctor
    if (newValue && (isDoctor || user?.role === 'doctor' || user?.hpn || professionalUser)) {
      localStorage.setItem(PROFESSIONAL_AUTH_STATE_KEY, 'true');
    }
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new CustomEvent('phb_view_changed'));
    
    // Check if we're in an appointment-related path
    const isAppointmentPath = location.pathname.includes('/appointment');
    
    // Redirect to appropriate dashboard or appointments page based on toggle state
    if (newValue) {
      // If in appointment page, navigate to doctor appointments
      if (isAppointmentPath) {
        navigate('/professional/appointments');
      } else {
        navigate('/professional/dashboard');
      }
    } else {
      // If in appointment page, navigate to patient appointments
      if (isAppointmentPath) {
        navigate('/account/appointments');
      } else {
        navigate('/account');
      }
    }
    
    // Reset animation after a delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Handle touch start event
  const handleTouchStart = () => {
    setIsTouched(true);
  };

  // Handle touch end event
  const handleTouchEnd = () => {
    setIsTouched(false);
  };
  
  // No need to show toggle if not applicable
  if (!showToggle && !hasHPN) return null;

  if (compact) {
    // Compact version (icon only with tooltip) for mobile/header
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={handleToggleView}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`
            flex items-center justify-center p-3 rounded-full
            transition-all duration-300 ease-in-out
            ${isProfessionalView ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}
            ${isAnimating ? 'scale-110' : 'scale-100'}
            ${isTouched ? 'bg-opacity-70' : ''}
            active:scale-95 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500
          `}
          aria-label={isProfessionalView ? 'Switch to patient view' : 'Switch to doctor view'}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="sr-only">
              {isProfessionalView ? 'Doctor View' : 'Patient View'}
            </span>
          </div>
        </button>

        {/* Mobile-friendly tooltip that shows on tap */}
        <div className={`
          absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
          px-3 py-2 bg-gray-800 text-white text-xs rounded-md shadow-lg 
          whitespace-nowrap z-50 transition-opacity duration-200
          ${isTouched ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}>
          {isProfessionalView ? 'Doctor View' : 'Patient View'}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      </div>
    );
  }

  // Full version with labels and toggle switch
  return (
    <div className={`${className}`}>
      {/* Segmented control style for better mobile UX */}
      <div className="flex rounded-lg overflow-hidden shadow-sm border border-gray-200">
        {/* Patient button */}
        <button
          onClick={() => !isProfessionalView ? null : handleToggleView()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`
            flex-1 py-3 px-4 text-center transition-all duration-300 ease-in-out
            ${!isProfessionalView 
              ? 'bg-blue-500 text-white font-medium' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
            ${isAnimating && !isProfessionalView ? 'scale-105' : ''}
            ${isTouched && isProfessionalView ? 'bg-gray-200' : ''}
            active:scale-95 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500
          `}
          aria-pressed={!isProfessionalView}
        >
          <span className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Patient
          </span>
        </button>
        
        {/* Doctor button */}
        <button
          onClick={() => isProfessionalView ? null : handleToggleView()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`
            flex-1 py-3 px-4 text-center transition-all duration-300 ease-in-out
            ${isProfessionalView 
              ? 'bg-blue-500 text-white font-medium' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
            ${isAnimating && isProfessionalView ? 'scale-105' : ''}
            ${isTouched && !isProfessionalView ? 'bg-gray-200' : ''}
            active:scale-95 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500
          `}
          aria-pressed={isProfessionalView}
        >
          <span className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            Doctor
          </span>
        </button>
      </div>
    </div>
  );
};

export default EnhancedViewToggle;
