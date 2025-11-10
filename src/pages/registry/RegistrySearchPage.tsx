/**
 * Professional Registry Search Page
 *
 * Public page for searching and verifying registered healthcare professionals.
 * No authentication required - allows patients and facilities to verify credentials.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Shield, Award, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { registryService } from '../../services/registryService';

interface SearchFilters {
  query: string;
  professionalType: string;
  specialization: string;
  state: string;
}

interface Professional {
  id: string;
  phb_license_number: string;
  professional_type: string;
  professional_type_display: string;
  full_name: string;
  title: string;
  primary_qualification: string;
  qualification_year: number;
  specialization: string;
  license_status: string;
  license_status_display: string;
  home_registration_body: string;
  home_registration_number: string;
  city: string;
  state: string;
  languages_spoken: string[];
  identity_verified: boolean;
  qualifications_verified: boolean;
}

const RegistrySearchPage: React.FC = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    professionalType: '',
    specialization: '',
    state: '',
  });

  const [searchResults, setSearchResults] = useState<Professional[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const professionalTypes = [
    { value: '', label: 'All Professions' },
    { value: 'pharmacist', label: 'Pharmacist' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'nurse', label: 'Nurse' },
    { value: 'midwife', label: 'Midwife' },
    { value: 'dentist', label: 'Dentist' },
    { value: 'physiotherapist', label: 'Physiotherapist' },
    { value: 'lab_technician', label: 'Lab Scientist' },
    { value: 'radiographer', label: 'Radiographer' },
  ];

  const nigeriaStates = [
    { value: '', label: 'All States' },
    { value: 'Lagos', label: 'Lagos' },
    { value: 'Abuja', label: 'FCT Abuja' },
    { value: 'Kano', label: 'Kano' },
    { value: 'Rivers', label: 'Rivers' },
    { value: 'Oyo', label: 'Oyo' },
    { value: 'Kaduna', label: 'Kaduna' },
    { value: 'Enugu', label: 'Enugu' },
    { value: 'Delta', label: 'Delta' },
    { value: 'Ogun', label: 'Ogun' },
    { value: 'Anambra', label: 'Anambra' },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setHasSearched(true);

    try {
      const response = await registryService.searchProfessionals(filters);
      setSearchResults(response.results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">
              Search Professional Registry
            </h1>
            <p className="text-xl text-blue-100">
              Verify healthcare professionals licensed with PHB. Search by name, license number, or specialty.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <form onSubmit={handleSearch}>
            {/* Main Search Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Name or License Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="query"
                  value={filters.query}
                  onChange={handleInputChange}
                  placeholder="e.g., Dr. John Doe or PHB-PHARM-2024-12345"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Type
                </label>
                <select
                  name="professionalType"
                  value={filters.professionalType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {professionalTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization
                </label>
                <input
                  type="text"
                  name="specialization"
                  value={filters.specialization}
                  onChange={handleInputChange}
                  placeholder="e.g., Cardiology"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <select
                  name="state"
                  value={filters.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {nigeriaStates.map(state => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isSearching}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
              >
                <Search className="w-5 h-5 mr-2" />
                {isSearching ? 'Searching...' : 'Search Registry'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setFilters({
                    query: '',
                    professionalType: '',
                    specialization: '',
                    state: '',
                  });
                  setSearchResults([]);
                  setHasSearched(false);
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {isSearching && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Searching registry...</p>
          </div>
        )}

        {!isSearching && hasSearched && searchResults.length === 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
            <div className="flex items-center">
              <Search className="w-6 h-6 text-yellow-600 mr-3" />
              <div>
                <h3 className="font-semibold text-yellow-800">No Results Found</h3>
                <p className="text-yellow-700 mt-1">
                  No professionals match your search criteria. Try adjusting your filters or search terms.
                </p>
              </div>
            </div>
          </div>
        )}

        {!isSearching && searchResults.length > 0 && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results ({searchResults.length})
              </h2>
              <p className="text-gray-600 mt-1">
                Showing verified healthcare professionals
              </p>
            </div>

            <div className="space-y-4">
              {searchResults.map(professional => (
                <div
                  key={professional.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {/* Header */}
                      <div className="flex items-center mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {professional.title} {professional.full_name}
                          </h3>
                          <p className="text-gray-600">
                            {professional.professional_type_display}
                            {professional.specialization && ` • ${professional.specialization}`}
                          </p>
                        </div>
                      </div>

                      {/* Verification Badges */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          professional.license_status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <Shield className="w-4 h-4 mr-1" />
                          {professional.license_status_display}
                        </span>

                        {professional.identity_verified && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                            <Award className="w-4 h-4 mr-1" />
                            Identity Verified
                          </span>
                        )}

                        {professional.qualifications_verified && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                            <Award className="w-4 h-4 mr-1" />
                            Qualifications Verified
                          </span>
                        )}
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">PHB License</p>
                          <p className="font-semibold text-gray-900">
                            {professional.phb_license_number}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">Registration Body</p>
                          <p className="font-semibold text-gray-900">
                            {professional.home_registration_body}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">Registration Number</p>
                          <p className="font-semibold text-gray-900">
                            {professional.home_registration_number}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">Qualification</p>
                          <p className="font-semibold text-gray-900">
                            {professional.primary_qualification} ({professional.qualification_year})
                          </p>
                        </div>

                        {professional.city && professional.state && (
                          <div>
                            <p className="text-gray-500">Location</p>
                            <p className="font-semibold text-gray-900 flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {professional.city}, {professional.state}
                            </p>
                          </div>
                        )}

                        {professional.languages_spoken && professional.languages_spoken.length > 0 && (
                          <div>
                            <p className="text-gray-500">Languages</p>
                            <p className="font-semibold text-gray-900">
                              {professional.languages_spoken.join(', ')}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link
                      to={`/registry/professional/${professional.id}`}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center whitespace-nowrap"
                    >
                      View Profile
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Information Box */}
        {!hasSearched && (
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
            <h3 className="font-semibold text-blue-900 mb-2">
              How to Use Registry Search
            </h3>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Search by professional name to find specific individuals</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Enter PHB license number for instant verification (format: PHB-PHARM-2024-12345)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Use filters to browse professionals by type, specialty, or location</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>All listed professionals have verified credentials with their regulatory bodies</span>
              </li>
            </ul>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Are you a healthcare professional?
          </h3>
          <p className="text-blue-100 mb-6">
            Join Nigeria's trusted professional registry and get verified within 3-5 business days
          </p>
          <Link
            to="/registry/apply"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Register Now - It's FREE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrySearchPage;
