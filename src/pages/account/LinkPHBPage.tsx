 import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/authContext';

// Interface for the enhanced API response
interface HospitalResponse {
  hospitals: Array<{
    id: number;
    name: string;
    region?: string;
    city?: string;
    country?: string;
    address?: string;
    available?: boolean;
  }>;
  message?: string;
  location?: {
    latitude: number;
    longitude: number;
    radius_km: number;
  };
}

const LinkPHBPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading, error: authError, registerWithHospital, fetchNearbyHospitals, fetchAllHospitals, checkPrimaryHospital, hasPrimaryHospital, primaryHospital } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);
  const [phbNumber, setPhbNumber] = useState(user?.hpn || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [locationMessage, setLocationMessage] = useState<string | null>(null);
  
  // New state variables for hospital loading
  const [hospitals, setHospitals] = useState<Array<{
    id: number;
    name: string;
    region?: string;
    city?: string;
    country?: string;
    address?: string;
    available: boolean;
  }>>([]);
  const [isLoadingHospitals, setIsLoadingHospitals] = useState(false);
  const [usingGeolocation, setUsingGeolocation] = useState(false);
  const [searchRadius, setSearchRadius] = useState(10);
  const [userCoords, setUserCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [noHospitalsFound, setNoHospitalsFound] = useState(false);
  
  // Add refs to track if hospitals are already loaded and if an API call is in progress
  const hospitalsLoaded = useRef(false);
  const apiCallInProgress = useRef(false);

  // Add new state for region warning
  const [regionWarning, setRegionWarning] = useState<string | null>(null);

  // Check if user already has a primary hospital on load - RUN ONCE ONLY
  useEffect(() => {
    // Skip if hospitals are already loaded or if an API call is in progress
    if (hospitalsLoaded.current || apiCallInProgress.current) return;
    
    const checkUserHospital = async () => {
      if (apiCallInProgress.current) return;
      apiCallInProgress.current = true;
      
      try {
        const result = await checkPrimaryHospital();
        if (result.has_primary && result.primary_hospital) {
          setSuccess(`You are already registered with ${result.primary_hospital.name} as your primary hospital.`);
          hospitalsLoaded.current = true;
        } else {
          // Only load hospitals if user doesn't have a primary hospital
          // and hospitals haven't been loaded yet
          if (!hospitalsLoaded.current) {
            await loadHospitals(true);
            hospitalsLoaded.current = true;
          }
        }
      } catch (err) {
        console.error("Error checking primary hospital:", err);
        setError("Failed to check your hospital registration status. Please try again.");
        // Still try to load hospitals even if check fails
        // but only if hospitals haven't been loaded yet
        if (!hospitalsLoaded.current) {
          await loadHospitals(true);
          hospitalsLoaded.current = true;
        }
      } finally {
        apiCallInProgress.current = false;
      }
    };

    if (!authLoading) {
      checkUserHospital();
    }
    // Only run this effect once when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading]);

  // Get user location
  const getUserLocation = async () => {
    return new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          reject(error);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    });
  };

  // Load hospitals - either nearby or all
  const loadHospitals = async (useLocation: boolean = false) => {
    // Skip if an API call is already in progress
    if (apiCallInProgress.current) return;
    apiCallInProgress.current = true;
    
    setIsLoadingHospitals(true);
    setError('');
    setNoHospitalsFound(false);
    
    try {
      let response: HospitalResponse;
      
      if (useLocation) {
        try {
          const coords = await getUserLocation();
          setUserCoords(coords);
          setUsingGeolocation(true);
          
          // Call the nearby hospitals API with coordinates
          const nearbyResponse = await fetchNearbyHospitals(coords.latitude, coords.longitude, searchRadius);
          response = nearbyResponse as HospitalResponse;
          
          // If no hospitals found with current location, try user's profile location
          if (!response.hospitals || response.hospitals.length === 0) {
            console.log('No hospitals found near current location, trying profile location');
            
            // Check if user has location data in their profile
            if (user && (user.city || user.country || user.state)) {
              setLocationMessage('No hospitals found near your current location. Showing hospitals near your profile address.');
              
              // Just fetch all hospitals as we can't directly geocode the profile address
              const allHospitalsResponse = await fetchAllHospitals();
              
              // Filter hospitals by user's location
              // This is a basic client-side filter as we don't have geocoding
              // In a production app, you'd make an API call with the profile address coordinates
              const filteredHospitals = filterHospitalsByProfileLocation(allHospitalsResponse);
              
              if (filteredHospitals.length > 0) {
                response = { 
                  hospitals: filteredHospitals,
                  message: 'Showing hospitals near your profile address'
                };
              } else {
                // If no hospitals found near profile location either, show all
                response = { 
                  hospitals: allHospitalsResponse,
                  message: 'No hospitals found near your locations. Showing all available hospitals.'
                };
              }
            } else {
              // No profile location available, fetch all hospitals
              const allHospitalsResponse = await fetchAllHospitals();
              response = { 
                hospitals: allHospitalsResponse,
                message: 'No hospitals found nearby. Showing all available hospitals.'
              };
            }
          }
          
        } catch (locationError) {
          console.warn("Could not get user location:", locationError);
          setUsingGeolocation(false);
          
          // Fall back to all hospitals
          const allHospitalsResponse = await fetchAllHospitals();
          response = { hospitals: allHospitalsResponse };
        }
      } else {
        setUsingGeolocation(false);
        
        // Just fetch all hospitals
        const allHospitalsResponse = await fetchAllHospitals();
        response = { hospitals: allHospitalsResponse };
      }
      
      // Handle the enhanced API response
      console.log('Hospital response received');
      
      // Save location message if provided
      if (response.message) {
        setLocationMessage(response.message);
      } else if (response.location) {
        setLocationMessage(`Showing hospitals within ${response.location.radius_km} km of your location`);
      } else {
        setLocationMessage('Showing all available hospitals');
      }
      
      // Ensure hospitals is always an array
      const hospitalData = response.hospitals || [];
      
      // Check if we have any hospitals
      setNoHospitalsFound(hospitalData.length === 0);
      
      // Format hospitals for display
      const formattedHospitals = hospitalData.map(hospital => ({
        ...hospital,
        region: hospital.region || hospital.city || '',
        available: hospital.available !== false // default to true if available is not specified
      }));
      
      // Update state only once with the formatted hospitals
      setHospitals(formattedHospitals);
    } catch (err) {
      console.error("Error loading hospitals:", err);
      setError("Failed to load hospitals. Please try again.");
      setNoHospitalsFound(true);
    } finally {
      setIsLoadingHospitals(false);
      apiCallInProgress.current = false;
    }
  };

  // Helper function to filter hospitals by user's profile location
  const filterHospitalsByProfileLocation = (hospitals: Array<{
    id: number;
    name: string;
    region?: string;
    city?: string;
    country?: string;
    address?: string;
    available: boolean;
  }>): Array<{
    id: number;
    name: string;
    region?: string;
    city?: string;
    country?: string;
    address?: string;
    available: boolean;
  }> => {
    // If user has no location data, return all hospitals
    if (!user || (!user.city && !user.country && !user.state)) {
      return hospitals;
    }
    
    // Filter hospitals based on location match
    // First try city match, then state/region match, then country match
    let filtered = hospitals;
    
    // Try to match by city (most specific)
    if (user.city) {
      const cityMatches = hospitals.filter(hospital => 
        hospital.city?.toLowerCase().includes(user.city?.toLowerCase() || '') ||
        hospital.region?.toLowerCase().includes(user.city?.toLowerCase() || '')
      );
      
      if (cityMatches.length > 0) {
        return cityMatches;
      }
    }
    
    // Try to match by state/region
    if (user.state) {
      const stateMatches = hospitals.filter(hospital => 
        hospital.region?.toLowerCase().includes(user.state?.toLowerCase() || '')
      );
      
      if (stateMatches.length > 0) {
        return stateMatches;
      }
    }
    
    // Try to match by country (least specific)
    if (user.country) {
      const countryMatches = hospitals.filter(hospital => 
        hospital.country?.toLowerCase().includes(user.country?.toLowerCase() || '')
      );
      
      if (countryMatches.length > 0) {
        return countryMatches;
      }
    }
    
    // If no matches, return all hospitals
    return hospitals;
  };

  // Handle changes to the search radius and re-fetch nearby hospitals
  const handleRadiusChange = async (radius: number) => {
    // Prevent unnecessary API calls if the radius hasn't changed
    if (radius === searchRadius || apiCallInProgress.current) return;
    
    setSearchRadius(radius);
    if (usingGeolocation && userCoords) {
      // Mark that an API call is in progress
      apiCallInProgress.current = true;
      setIsLoadingHospitals(true);
      
      try {
        // Call the nearby hospitals API with new radius
        const response = await fetchNearbyHospitals(userCoords.latitude, userCoords.longitude, radius);
        
        // Handle the enhanced API response
        if ('message' in response) {
          setLocationMessage(response.message);
        }
        
        // Ensure hospitals is always an array
        const hospitalData = response.hospitals || [];
        
        // Check if we have any hospitals
        setNoHospitalsFound(hospitalData.length === 0);
        
        const formattedHospitals = hospitalData.map(hospital => ({
          ...hospital,
          region: hospital.region || hospital.city || '',
          available: hospital.available !== false
        }));
        
        setHospitals(formattedHospitals);
      } catch (err) {
        console.error("Error loading hospitals with new radius:", err);
        setError("Failed to update hospital list with new search radius.");
      } finally {
        setIsLoadingHospitals(false);
        apiCallInProgress.current = false;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the HPN number
    if (!phbNumber.trim()) {
      setError('Please enter your HPN number');
      return;
    }

    // Validate that a hospital is selected
    if (!selectedHospital) {
      setError('Please select a hospital');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Call API to register with hospital
      const result = await registerWithHospital(selectedHospital, true);

      setSuccess(result.message || 'Your HPN number has been successfully linked to the selected hospital.');

      // Redirect after successful linking
      setTimeout(() => {
        navigate('/account');
      }, 3000);
    } catch (err: any) {
      console.error("Hospital registration failed:", err);
      setError(err.message || 'Failed to register with the selected hospital. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle toggling between geolocation and all hospitals
  const toggleLocationSearch = () => {
    // Prevent unnecessary state updates and API calls if already in the requested mode
    // or if an API call is already in progress
    if (apiCallInProgress.current) return;
    
    if (usingGeolocation) {
      // Only switch to all hospitals if currently using geolocation
      setIsLoadingHospitals(true);
      loadHospitals(false);
    } else {
      // Only try to use geolocation if not already using it
      setIsLoadingHospitals(true);
      loadHospitals(true);
    }
  };

  // Extract unique regions from hospitals
  const regions = Array.from(new Set(hospitals.map(hospital => hospital.region))).sort();

  // Filter hospitals by search term and selected region
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = searchTerm === '' ||
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (hospital.region && hospital.region.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRegion = selectedRegion === '' || hospital.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  const handleHospitalSelect = (hospitalId: number) => {
    setSelectedHospital(hospitalId);
    setError('');
    
    // Check if selected hospital is in a different region than user's location
    // and show warning if necessary
    const selectedHosp = hospitals.find(h => h.id === hospitalId);
    if (selectedHosp) {
      checkHospitalRegionMismatch(selectedHosp);
    } else {
      setRegionWarning(null);
    }
  };

  // Function to check if selected hospital is in a different region
  const checkHospitalRegionMismatch = (hospital: {
    id: number;
    name: string;
    region?: string;
    city?: string;
    country?: string;
    address?: string;
    available: boolean;
  }) => {
    // Clear any previous warnings
    setRegionWarning(null);
    
    // Option 1: Check against current geolocation region if available
    if (usingGeolocation && userCoords) {
      // We don't have the region name from coordinates directly
      // This would ideally use reverse geocoding, but for now
      // we'll compare against known hospital locations from hospitals array
      
      // If hospital has no region information, we can't compare
      if (!hospital.region) return;
      
      // If there are other hospitals in different regions, 
      // warn if this hospital isn't in the most common region for nearby hospitals
      const nearbyRegions = hospitals
        .filter(h => h.region)
        .map(h => h.region as string);
      
      // If we have at least 2 hospitals with regions to compare
      if (nearbyRegions.length >= 2) {
        // Find most common region in results
        const regionCounts = nearbyRegions.reduce((acc, region) => {
          acc[region] = (acc[region] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);
        
        // Get region with highest count
        const mostCommonRegion = Object.entries(regionCounts)
          .sort((a, b) => b[1] - a[1])[0][0];
        
        if (hospital.region !== mostCommonRegion) {
          setRegionWarning(
            `This hospital is in ${hospital.region}, which appears to be outside your current location area (${mostCommonRegion}). For example, traveling from Delta to Abuja (over 500km) would make routine appointments difficult. We recommend choosing a hospital in your local area.`
          );
        }
      }
    }
    // Option 2: Check against user's profile location if available
    else if (user && (user.city || user.state || user.country)) {
      if (!hospital.region && !hospital.city && !hospital.country) return;
      
      // Compare hospital region/city with user's profile location
      if (user.city && hospital.city && 
          !hospital.city.toLowerCase().includes(user.city.toLowerCase()) && 
          !user.city.toLowerCase().includes(hospital.city.toLowerCase())) {
        setRegionWarning(
          `This hospital is in ${hospital.city}, which is different from your profile location (${user.city}). Long-distance travel for healthcare may be challenging. For example, traveling from Delta to Abuja would require significant time and resources for each visit.`
        );
      }
      else if (user.state && hospital.region && 
               !hospital.region.toLowerCase().includes(user.state.toLowerCase()) && 
               !user.state.toLowerCase().includes(hospital.region.toLowerCase())) {
        setRegionWarning(
          `This hospital is in ${hospital.region}, which appears to be different from your region (${user.state}). Registering with a hospital outside your state (e.g., choosing an Abuja hospital while living in Delta) may limit your ability to receive timely care.`
        );
      }
      else if (user.country && hospital.country && 
               hospital.country.toLowerCase() !== user.country.toLowerCase()) {
        setRegionWarning(
          `This hospital is in ${hospital.country}, which is different from your country (${user.country}). International healthcare coordination presents significant challenges. We strongly recommend choosing a hospital within Nigeria.`
        );
      }
    }
  };

  // If the user already has a primary hospital, show that information
  if (hasPrimaryHospital && primaryHospital) {
    return (
      <div className="bg-white">
        <div className="bg-[#005eb8] text-white py-8">
          <div className="phb-container">
            <h1 className="text-3xl font-bold mb-4">Hospital Registration</h1>
          </div>
        </div>

        <div className="phb-container py-8">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
            <h2 className="text-xl font-bold mb-2 text-green-800">You're Already Registered</h2>
            <p className="text-green-700">
              You are currently registered with <strong>{primaryHospital.name}</strong> as your primary hospital.
            </p>
            {primaryHospital.address && (
              <p className="text-green-700 mt-2">Address: {primaryHospital.address}</p>
            )}
            {primaryHospital.city && (
              <p className="text-green-700">City: {primaryHospital.city}</p>
            )}
            <p className="text-green-700 mt-2">Registration Status: {primaryHospital.status || 'Active'}</p>
            <p className="text-green-700 mt-4">
              If you need to change your primary hospital, please contact PHB support.
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <Link
              to="/account"
              className="px-6 py-3 bg-[#005eb8] text-white font-medium rounded-md hover:bg-[#004a93] transition-colors"
            >
              Return to Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Link HPN Number to Hospital</h1>
          <p className="text-xl font-medium">
            Link your HPN number to your primary hospital to access appointment booking and other services
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-blue-800">Why link your HPN number?</h2>
          <p className="mb-2 text-blue-700">
            You must link your HPN number to a primary hospital before you can:
          </p>
          <ul className="list-disc pl-6 text-blue-700 mb-2">
            <li>Book appointments</li>
            <li>Request prescriptions</li>
            <li>Access lab results</li>
            <li>Receive referrals to specialists</li>
          </ul>
          <p className="text-blue-700">
            This linking process ensures your medical records are properly maintained and available to healthcare providers when needed.
          </p>
        </div>

        {success ? (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8">
            <h2 className="text-xl font-bold mb-2 text-green-800">Success!</h2>
            <p className="text-green-700">{success}</p>
            <p className="text-green-700 mt-2">Redirecting you to your account page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">1. Enter your HPN number</h2>
              <div className="mb-4">
                <label htmlFor="phbNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  HPN Number
                </label>
                <input
                  type="text"
                  id="phbNumber"
                  value={phbNumber}
                  onChange={(e) => setPhbNumber(e.target.value)}
                  placeholder="e.g., PHB1234567890"
                  className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Your HPN number can be found on your PHB card or in your welcome email
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">2. Select your primary hospital</h2>
                <button
                  type="button"
                  onClick={toggleLocationSearch}
                  className="text-[#005eb8] hover:underline text-sm flex items-center"
                >
                  {usingGeolocation ? 'Show all hospitals' : 'Find hospitals near me'}
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {usingGeolocation ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    )}
                  </svg>
                </button>
              </div>

              {locationMessage && (
                <div className="mb-4 bg-blue-50 p-4 rounded-md">
                  <p className="text-blue-700 flex items-center">
                    <svg className="h-5 w-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {locationMessage}
                  </p>
                  
                  {usingGeolocation && (
                    <div className="flex items-center justify-end mt-2">
                      <span className="text-sm text-blue-700 mr-2">Search radius:</span>
                      <select
                        value={searchRadius}
                        onChange={(e) => handleRadiusChange(Number(e.target.value))}
                        className="px-2 py-1 border border-blue-300 rounded-md text-blue-700 bg-blue-50"
                      >
                        <option value={5}>5 km</option>
                        <option value={10}>10 km</option>
                        <option value={20}>20 km</option>
                        <option value={50}>50 km</option>
                        <option value={100}>100 km</option>
                      </select>
                    </div>
                  )}
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by region (optional)
                </label>
                <select
                  id="region"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All regions</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search for a hospital
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by hospital name or region"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-3">Select a hospital from the list:</h3>
                
                {isLoadingHospitals ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#005eb8]"></div>
                    <p className="mt-2 text-gray-500">Loading hospitals...</p>
                  </div>
                ) : noHospitalsFound ? (
                  <div className="text-center py-8 bg-gray-50 rounded-md">
                    <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-600 font-medium">No hospitals found</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Try changing your search criteria or location settings
                    </p>
                    <button 
                      type="button"
                      onClick={() => loadHospitals(false)}
                      className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                      Show all available hospitals
                    </button>
                  </div>
                ) : filteredHospitals.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredHospitals.map(hospital => (
                      <div
                        key={hospital.id}
                        onClick={() => hospital.available && handleHospitalSelect(hospital.id)}
                        className={`p-4 border rounded-md cursor-pointer transition-colors ${
                          hospital.available
                            ? selectedHospital === hospital.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                            : 'border-gray-200 bg-gray-100 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-gray-800">{hospital.name}</h4>
                            <p className="text-gray-600 text-sm">{hospital.region}</p>
                            {hospital.address && (
                              <p className="text-gray-500 text-xs mt-1">{hospital.address}</p>
                            )}
                          </div>
                          {!hospital.available && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                              Not available
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-50 rounded-md">
                    <p className="text-gray-500">No hospitals found matching your search criteria</p>
                  </div>
                )}
              </div>
            </div>

            {selectedHospital && regionWarning && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong className="font-medium text-yellow-800">Warning: </strong>
                      {regionWarning}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {authError && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700">{authError}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting || isLoadingHospitals || noHospitalsFound || !selectedHospital}
                className={`px-6 py-3 bg-[#005eb8] text-white font-medium rounded-md hover:bg-[#004a93] transition-colors ${
                  (isSubmitting || isLoadingHospitals || noHospitalsFound || !selectedHospital) ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Link HPN Number'}
              </button>
              <Link
                to="/account"
                className="text-[#005eb8] hover:underline"
              >
                Cancel and return to account
              </Link>
            </div>
          </form>
        )}

        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Need help?</h2>
          <p className="mb-4">
            If you're having trouble linking your HPN number or have questions, you can:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <Link to="/help/find-phb-number" className="text-[#005eb8] hover:underline">
                Find your HPN number
              </Link>
            </li>
            <li>
              <Link to="/account/contact-support" className="text-[#005eb8] hover:underline">
                Contact PHB support
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LinkPHBPage;
