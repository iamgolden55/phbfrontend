import React, { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from 'lodash';

interface Patient {
  id: number;
  hpn: string;
  first_name: string;
  last_name: string;
  age?: number;
  date_of_birth?: string;
  gender?: string;
  email?: string;
}

interface PatientHPNSearchProps {
  onPatientSelect: (patient: Patient) => void;
  value?: string;
  required?: boolean;
}

const PatientHPNSearch: React.FC<PatientHPNSearchProps> = ({ 
  onPatientSelect, 
  value = '', 
  required = false 
}) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<Patient[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  // Get auth token
  const getAuthToken = () => {
    const organizationAuth = localStorage.getItem('organizationAuth');
    if (organizationAuth) {
      try {
        const authData = JSON.parse(organizationAuth);
        return authData.tokens?.access;
      } catch (e) {
        console.error('Failed to parse organization auth data:', e);
      }
    }
    return null;
  };

  // Format HPN as user types (XXX XXX XXX XXXX)
  const formatHPN = (value: string) => {
    // Remove all non-alphanumeric characters
    const cleaned = value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    
    // Apply formatting
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    if (cleaned.length <= 9) return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9, 13)}`;
  };

  // Search for patients
  const searchPatients = useCallback(async (query: string) => {
    if (!query || query.replace(/\s/g, '').length < 3) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = getAuthToken();
      const cleanQuery = query.replace(/\s/g, '');
      
      const response = await fetch(
        `${API_BASE_URL}/api/patients/search/?hpn=${cleanQuery}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const patients = Array.isArray(data) ? data : data.results || [];
        setSearchResults(patients);
        setShowDropdown(patients.length > 0);
        setSelectedIndex(-1);
      } else {
        setError('Failed to search patients');
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching patients:', error);
      setError('Error searching patients');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [API_BASE_URL]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => searchPatients(query), 300),
    [searchPatients]
  );

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatHPN(e.target.value);
    setSearchTerm(formatted);
    setSelectedPatient(null);
    
    // Only search if we have at least 3 characters (excluding spaces)
    if (formatted.replace(/\s/g, '').length >= 3) {
      debouncedSearch(formatted);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  // Handle patient selection
  const handleSelectPatient = (patient: Patient) => {
    setSelectedPatient(patient);
    setSearchTerm(patient.hpn);
    setShowDropdown(false);
    onPatientSelect(patient);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
          handleSelectPatient(searchResults[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate age from date of birth
  const calculateAge = (dob?: string) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="relative" ref={searchRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Patient HPN Number {required && '*'}
      </label>
      
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="material-icons text-gray-400 text-sm">search</span>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm.length >= 3 && searchResults.length > 0 && setShowDropdown(true)}
          className={`w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="XXX XXX XXX XXXX"
          required={required}
          maxLength={16} // 3 + 3 + 3 + 4 + 3 spaces
        />
        
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className="material-icons animate-spin text-blue-500 text-sm">refresh</span>
          </div>
        )}
        
        {/* Success Checkmark */}
        {selectedPatient && !isLoading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <span className="material-icons text-green-500 text-sm">check_circle</span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}

      {/* Search Results Dropdown */}
      {showDropdown && searchResults.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-auto">
          {searchResults.map((patient, index) => {
            const age = patient.age || calculateAge(patient.date_of_birth);
            return (
              <div
                key={patient.id}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  index === selectedIndex 
                    ? 'bg-blue-50 border-l-2 border-blue-500' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleSelectPatient(patient)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="material-icons text-gray-400">person</span>
                    <div>
                      <div className="font-medium text-gray-900">
                        {patient.hpn}
                      </div>
                      <div className="text-sm text-gray-600">
                        {patient.first_name} {patient.last_name}
                        {age && ` - ${age} years`}
                        {patient.gender && ` - ${patient.gender}`}
                      </div>
                    </div>
                  </div>
                  {index === selectedIndex && (
                    <span className="material-icons text-blue-500 text-sm">arrow_forward</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* No Results Message */}
      {showDropdown && searchResults.length === 0 && !isLoading && searchTerm.length >= 3 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-4">
          <div className="text-center text-gray-500">
            <span className="material-icons text-gray-400 mb-2">search_off</span>
            <p className="text-sm">No patients found with HPN "{searchTerm}"</p>
          </div>
        </div>
      )}

      {/* Selected Patient Preview */}
      {selectedPatient && (
        <div className="mt-2 p-3 bg-blue-50 rounded-md border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="material-icons text-blue-600">verified_user</span>
              <div>
                <p className="text-sm font-medium text-blue-900">
                  {selectedPatient.first_name} {selectedPatient.last_name}
                </p>
                <p className="text-xs text-blue-700">
                  HPN: {selectedPatient.hpn} 
                  {selectedPatient.age && ` • Age: ${selectedPatient.age}`}
                  {selectedPatient.gender && ` • ${selectedPatient.gender}`}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedPatient(null);
                setSearchTerm('');
                onPatientSelect(null as any);
                inputRef.current?.focus();
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              <span className="material-icons text-sm">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientHPNSearch;