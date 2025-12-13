/**
 * Modern Practice Pages Directory - Airbnb-style catalog
 *
 * A comprehensive directory of verified healthcare practice pages across Nigeria.
 * Features modern card-based layout with advanced filtering and search capabilities.
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Phone,
  CheckCircle,
  TrendingUp,
  Filter,
  X,
  ChevronDown,
  Heart,
  Clock,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  fetchPublicPracticePages,
  PracticePage,
  ServiceType,
} from '../../services/practicePageService';

// ============================================================================
// CONSTANTS
// ============================================================================

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara',
];

const PROFESSIONAL_TYPES = [
  { value: 'pharmacist', label: 'Pharmacist', icon: '💊' },
  { value: 'doctor', label: 'Doctor', icon: '👨‍⚕️' },
  { value: 'nurse', label: 'Nurse', icon: '👩‍⚕️' },
];

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface DirectoryState {
  loading: boolean;
  error: string | null;
  pages: PracticePage[];
  total: number;
  currentPage: number;
}

interface Filters {
  search: string;
  serviceType: ServiceType | '';
  state: string;
  city: string;
  professionalType: string;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const PracticePageDirectory: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [state, setState] = useState<DirectoryState>({
    loading: true,
    error: null,
    pages: [],
    total: 0,
    currentPage: 1,
  });

  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get('search') || '',
    serviceType: (searchParams.get('serviceType') as ServiceType) || '',
    state: searchParams.get('state') || '',
    city: searchParams.get('city') || '',
    professionalType: searchParams.get('professionalType') || '',
  });

  const [showFilters, setShowFilters] = useState(false);

  // Load pages when filters or page changes
  useEffect(() => {
    loadPages();
  }, [filters, state.currentPage]);

  // Update URL params when filters change
  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.search) params.search = filters.search;
    if (filters.serviceType) params.serviceType = filters.serviceType;
    if (filters.state) params.state = filters.state;
    if (filters.city) params.city = filters.city;
    if (filters.professionalType) params.professionalType = filters.professionalType;

    setSearchParams(params);
  }, [filters]);

  const loadPages = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await fetchPublicPracticePages({
        search: filters.search || undefined,
        service_type: filters.serviceType || undefined,
        state: filters.state || undefined,
        city: filters.city || undefined,
        professional_type: filters.professionalType || undefined,
        page: state.currentPage,
      });

      setState((prev) => ({
        ...prev,
        loading: false,
        pages: result.results,
        total: result.count,
      }));
    } catch (err) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to load practice pages',
      }));
    }
  };

  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setState((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      serviceType: '',
      state: '',
      city: '',
      professionalType: '',
    });
    setState((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleCardClick = (slug: string) => {
    navigate(`/practice-pages/${slug}/`);
  };

  const hasActiveFilters = filters.serviceType || filters.state || filters.city || filters.professionalType;

  // ============================================================================
  // RENDER: HERO SECTION
  // ============================================================================

  const renderHero = () => (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 mr-2" />
            <span className="text-blue-200 font-medium">Verified Healthcare Providers</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Trusted Healthcare Provider
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Browse verified pharmacies, doctors, and healthcare professionals across Nigeria
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-2">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, service, or location..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                    {[filters.serviceType, filters.state, filters.city, filters.professionalType].filter(Boolean).length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-center">
          <div>
            <div className="text-3xl font-bold">{state.total.toLocaleString()}</div>
            <div className="text-blue-200 text-sm">Practice Pages</div>
          </div>
          <div>
            <div className="text-3xl font-bold">100+</div>
            <div className="text-blue-200 text-sm">Cities Covered</div>
          </div>
          <div>
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-blue-200 text-sm">Available Support</div>
          </div>
        </div>
      </div>
    </div>
  );

  // ============================================================================
  // RENDER: FILTERS PANEL
  // ============================================================================

  const renderFiltersPanel = () => {
    if (!showFilters) return null;

    return (
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Refine Your Search</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Type
              </label>
              <select
                value={filters.serviceType}
                onChange={(e) => handleFilterChange('serviceType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Services</option>
                <option value="in_store">In-Store Only</option>
                <option value="virtual">Virtual Only</option>
                <option value="both">Both In-Store & Virtual</option>
              </select>
            </div>

            {/* Professional Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Type
              </label>
              <select
                value={filters.professionalType}
                onChange={(e) => handleFilterChange('professionalType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Professionals</option>
                {PROFESSIONAL_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.icon} {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                value={filters.state}
                onChange={(e) => handleFilterChange('state', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All States</option>
                {NIGERIAN_STATES.map((stateName) => (
                  <option key={stateName} value={stateName}>
                    {stateName}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                placeholder="Enter city..."
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-600">Active filters:</span>
              {filters.serviceType && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  {filters.serviceType}
                  <button
                    onClick={() => handleFilterChange('serviceType', '')}
                    className="ml-2 hover:text-blue-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.professionalType && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                  {filters.professionalType}
                  <button
                    onClick={() => handleFilterChange('professionalType', '')}
                    className="ml-2 hover:text-purple-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.state && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                  {filters.state}
                  <button
                    onClick={() => handleFilterChange('state', '')}
                    className="ml-2 hover:text-green-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.city && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                  {filters.city}
                  <button
                    onClick={() => handleFilterChange('city', '')}
                    className="ml-2 hover:text-orange-900"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={handleClearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================================================================
  // RENDER: PRACTICE CARD (Airbnb-style)
  // ============================================================================

  const renderPracticeCard = (page: PracticePage) => {
    // Generate a unique color for the placeholder based on the page ID
    const colors = ['bg-blue-100', 'bg-green-100', 'bg-purple-100', 'bg-pink-100', 'bg-indigo-100'];
    const colorIndex = parseInt(page.id.slice(0, 8), 16) % colors.length;
    const bgColor = colors[colorIndex];

    return (
      <div
        key={page.id}
        onClick={() => handleCardClick(page.slug)}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
      >
        {/* Image Placeholder with Gradient */}
        <div className={`${bgColor} h-48 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>

          {/* Badges on Image */}
          <div className="absolute top-3 left-3 flex gap-2">
            {page.verification_status === 'verified' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white shadow-lg">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </span>
            )}
            {page.is_open_now && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white shadow-lg">
                <Clock className="w-3 h-3 mr-1" />
                Open Now
              </span>
            )}
          </div>

          {/* Professional Type Badge */}
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800 shadow">
              <Award className="w-3 h-3 mr-1" />
              {page.professional_type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title and Service Type */}
          <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
              {page.practice_name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {page.tagline}
            </p>
          </div>

          {/* Service Type Tag */}
          <div className="mb-3">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              page.service_type === 'both'
                ? 'bg-purple-100 text-purple-800'
                : page.service_type === 'virtual'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {page.service_type === 'in_store'
                ? '🏪 In-Store Service'
                : page.service_type === 'virtual'
                ? '💻 Virtual Service'
                : '🌟 In-Store & Virtual'}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span className="line-clamp-1">{page.city}, {page.state}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-500">
              <TrendingUp className="w-4 h-4 mr-1 text-gray-400" />
              <span>{page.view_count.toLocaleString()} views</span>
            </div>
            <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
              View Details
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================================
  // RENDER: RESULTS SECTION
  // ============================================================================

  const renderResults = () => {
    if (state.loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading practice pages...</p>
        </div>
      );
    }

    if (state.error) {
      return (
        <div className="max-w-md mx-auto my-12">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error Loading Pages</h3>
                <p className="mt-2 text-sm text-red-700">{state.error}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => loadPages()}
            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (state.pages.length === 0) {
      return (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No practice pages found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search terms to find what you're looking for
          </p>
          <button
            onClick={handleClearFilters}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      );
    }

    const totalPages = Math.ceil(state.total / 10);

    return (
      <>
        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {state.total.toLocaleString()} Practice Page{state.total !== 1 ? 's' : ''} Found
            </h2>
            <p className="text-gray-600 mt-1">
              Showing {((state.currentPage - 1) * 10) + 1}-{Math.min(state.currentPage * 10, state.total)} of {state.total.toLocaleString()} results
            </p>
          </div>
        </div>

        {/* Results Grid - Airbnb-style 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {state.pages.map((page) => renderPracticeCard(page))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => {
                setState((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={state.currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let pageNum;
                if (totalPages <= 7) {
                  pageNum = i + 1;
                } else if (state.currentPage <= 4) {
                  pageNum = i + 1;
                } else if (state.currentPage >= totalPages - 3) {
                  pageNum = totalPages - 6 + i;
                } else {
                  pageNum = state.currentPage - 3 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setState((prev) => ({ ...prev, currentPage: pageNum }));
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      state.currentPage === pageNum
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setState((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              disabled={state.currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </>
    );
  };

  // ============================================================================
  // RENDER: CTA SECTION
  // ============================================================================

  const renderCTA = () => (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 md:p-12 text-center my-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Are You a Healthcare Professional?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of verified professionals on PHB. Create your practice page and connect with patients across Nigeria - completely free!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/professional/my-practice"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            <Award className="w-5 h-5 mr-2" />
            Create Your Practice Page
          </Link>
          <Link
            to="/registry"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Learn More
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      {renderHero()}

      {/* Filters Panel */}
      {renderFiltersPanel()}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Results */}
        {renderResults()}

        {/* CTA Section */}
        {!state.loading && !state.error && renderCTA()}
      </div>
    </div>
  );
};

export default PracticePageDirectory;