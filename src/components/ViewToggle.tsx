import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/authContext';
import { useProfessionalAuth } from '../features/professional/professionalAuthContext';

// Create a localStorage key for storing the view preference
const VIEW_PREFERENCE_KEY = 'phb_view_preference';

const ViewToggle: React.FC = () => {
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
  
  // Track tooltip visibility
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Check if we should show the toggle - either user is a doctor or professional user is logged in
  const showToggle = isDoctor || (user?.role === 'doctor') || professionalUser?.role === 'doctor';
  
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
    }
  }, [location.pathname, isProfessionalView]);
  
  // Handle toggle switch
  const handleToggleView = () => {
    // Set animation state
    setIsAnimating(true);
    
    // Toggle the view
    const newValue = !isProfessionalView;
    setIsProfessionalView(newValue);
    
    // Save preference
    localStorage.setItem(VIEW_PREFERENCE_KEY, newValue ? 'doctor' : 'patient');
    
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
  
  // No need to show toggle if not applicable
  if (!showToggle && !hasHPN) return null;
  
  return (
    <div className="flex items-center mr-2 relative">
      <div className="mr-2 text-sm font-medium">
        <span className={`${!isProfessionalView ? 'text-blue-600' : 'text-gray-500'}`}>Patient</span>
        <span className="mx-1 text-gray-400">/</span>
        <span className={`${isProfessionalView ? 'text-blue-600' : 'text-gray-500'}`}>Doctor</span>
      </div>
      <button
        onClick={handleToggleView}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className={`
          relative inline-flex items-center h-6 rounded-full w-11 
          transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 
          focus:ring-offset-2 focus:ring-blue-500
          ${isAnimating ? 'scale-110' : 'scale-100'}
          transition-transform duration-200
        `}
        style={{ 
          backgroundColor: isProfessionalView ? '#1E40AF' : '#9CA3AF',
        }}
        aria-pressed={isProfessionalView}
        aria-label="Toggle view mode"
      >
        <span className="sr-only">
          {isProfessionalView ? 'Switch to patient view' : 'Switch to doctor view'}
        </span>
        <span
          className={`
            ${isProfessionalView ? 'translate-x-6' : 'translate-x-1'}
            inline-block w-4 h-4 transform bg-white rounded-full 
            transition-transform duration-300 ease-in-out
            ${isAnimating ? 'scale-110' : 'scale-100'}
          `}
          aria-hidden="true"
        />
      </button>
      
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap z-50">
          Switch between patient and doctor views
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
        </div>
      )}
    </div>
  );
};

export default ViewToggle; 