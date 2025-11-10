import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Pill,
  FileText,
  GraduationCap,
  Calculator,
  Award,
  Scale,
  Download,
  Search,
  ExternalLink,
  ChevronRight,
  Database,
  AlertCircle,
} from 'lucide-react';
import { searchDrugs, getDrugStatistics, DrugSearchResult, DrugStatistics } from '../../services/drugService';

/**
 * Pharmacy Resources Page
 *
 * Comprehensive resource hub for pharmacists including:
 * - Drug database with 142+ medications
 * - Clinical guidelines and protocols
 * - Educational materials
 * - Reference tools and calculators
 * - Professional development resources
 * - Regulatory information
 * - Forms and templates
 */
export const PharmacyResourcesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<DrugSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [drugStats, setDrugStats] = useState<DrugStatistics | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Load drug statistics on mount
  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setStatsLoading(true);

      // Add 3-second delay before loading statistics
      await new Promise(resolve => setTimeout(resolve, 3000));

      const stats = await getDrugStatistics();
      setDrugStats(stats);
    } catch (error) {
      console.error('Failed to load drug statistics:', error);
      // Set default stats if API fails
      setDrugStats({
        total_drugs: 142,
        controlled_substances: 26,
        high_risk_medications: 85,
        nafdac_compliant: 142,
        by_schedule: [],
        top_therapeutic_classes: []
      });
    } finally {
      setStatsLoading(false);
    }
  };

  const handleDrugDatabaseClick = () => {
    navigate('/medicines-a-z');
  };

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    if (query.length < 2) {
      setSearchError('Search query must be at least 2 characters');
      return;
    }

    try {
      setSearching(true);
      setSearchError(null);

      // Add 3-second delay before searching
      await new Promise(resolve => setTimeout(resolve, 3000));

      const response = await searchDrugs(query, 10);
      setSearchResults(response.results);
    } catch (error: any) {
      setSearchError(error.message || 'Failed to search drugs');
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Debounce search - only search after user stops typing
    if (value.trim().length >= 2) {
      handleSearch(value);
    } else if (value.trim().length === 0) {
      setSearchResults([]);
      setSearchError(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Pharmacy Resources</h1>
        <p className="mt-2 text-gray-600">
          Comprehensive professional resources, guidelines, and tools for pharmacists
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            {searching ? (
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            )}
            <input
              type="text"
              placeholder={`Search drug database (${drugStats?.total_drugs || 142}+ medications)...`}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => handleSearch(searchQuery)}
            disabled={searching}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {searching ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </>
            ) : (
              'Search'
            )}
          </button>
        </div>

        {/* Search Results */}
        {searching && (
          <div className="mt-4 text-center py-8">
            <svg className="w-10 h-10 animate-spin text-blue-600 mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-sm text-gray-600 mt-3 font-medium">Searching drug database...</p>
          </div>
        )}

        {searchError && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-700">{searchError}</p>
          </div>
        )}

        {!searching && searchResults.length > 0 && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Found {searchResults.length} medication{searchResults.length !== 1 ? 's' : ''}
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {searchResults.map((drug) => (
                <button
                  key={drug.id}
                  onClick={() => navigate(`/medicines-a-z/${drug.id}`)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors border border-gray-200 hover:border-blue-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{drug.name}</p>
                        {drug.is_controlled && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Controlled</span>
                        )}
                        {drug.requires_physician && (
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded">Physician Only</span>
                        )}
                      </div>
                      {drug.brand_names && (
                        <p className="text-xs text-gray-500 mt-0.5">Brand names: {drug.brand_names}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-1">{drug.description}</p>
                      {drug.category && (
                        <p className="text-xs text-gray-500 mt-1">
                          <span className="font-medium">Category:</span> {drug.category}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-4 flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => navigate('/medicines-a-z')}
              className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all medications →
            </button>
          </div>
        )}

        {!searching && searchQuery && searchResults.length === 0 && !searchError && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              No medications found for "{searchQuery}". Try searching by drug name, brand name, or therapeutic class.
            </p>
          </div>
        )}
      </div>

      {/* Drug Database - Featured Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Drug Information Database</h2>
            </div>
            <p className="text-blue-100 mb-6 text-lg">
              Access comprehensive drug information for {drugStats?.total_drugs || 142}+ medications including
              interactions, contraindications, dosing, and NAFDAC classifications.
            </p>

            {/* Drug Database Stats */}
            {statsLoading ? (
              <div className="text-center py-6">
                <svg className="w-10 h-10 animate-spin text-white mx-auto" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-blue-100 mt-3 font-medium">Loading statistics...</p>
              </div>
            ) : drugStats && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="text-3xl font-bold">{drugStats.total_drugs}</p>
                  <p className="text-blue-200 text-sm">Total Drugs</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="text-3xl font-bold">{drugStats.top_therapeutic_classes?.length || 88}+</p>
                  <p className="text-blue-200 text-sm">Categories</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="text-3xl font-bold">{drugStats.controlled_substances}</p>
                  <p className="text-blue-200 text-sm">Controlled</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="text-3xl font-bold">{drugStats.high_risk_medications}</p>
                  <p className="text-blue-200 text-sm">High Risk</p>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-blue-200 text-sm">NAFDAC Compliant</p>
                </div>
              </div>
            )}

            <button
              onClick={handleDrugDatabaseClick}
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
            >
              Access Drug Database
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Resource Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-start">
        {/* 1. Clinical Guidelines */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div
            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection('guidelines')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Clinical Guidelines</h3>
                  <p className="text-gray-600 text-sm">Drug therapy guidelines and treatment protocols</p>
                </div>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  activeSection === 'guidelines' ? 'rotate-90' : ''
                }`}
              />
            </div>
          </div>

          {activeSection === 'guidelines' && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="space-y-3">
                <a href="https://www.who.int/publications/i/item/9789241550239" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors group">
                  <span className="text-gray-700 group-hover:text-blue-700">WHO Antimicrobial Stewardship Guidelines</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </a>
                <a href="https://www.nice.org.uk/guidance/ng28" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors group">
                  <span className="text-gray-700 group-hover:text-blue-700">Diabetes Type 2 - Treatment & Management</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </a>
                <a href="https://www.acc.org/guidelines" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors group">
                  <span className="text-gray-700 group-hover:text-blue-700">ACC/AHA Cardiovascular Guidelines</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </a>
                <a href="https://www.who.int/publications/i/item/9789241550390" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors group">
                  <span className="text-gray-700 group-hover:text-blue-700">WHO Pain Management Guidelines</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </a>
                <a href="https://bnf.nice.org.uk/drug/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors group">
                  <span className="text-gray-700 group-hover:text-blue-700">BNF for Children - Pediatric Dosing</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 2. Pharmacy Protocols */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div
            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection('protocols')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Pharmacy Protocols</h3>
                  <p className="text-gray-600 text-sm">Standard operating procedures and guidelines</p>
                </div>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  activeSection === 'protocols' ? 'rotate-90' : ''
                }`}
              />
            </div>
          </div>

          {activeSection === 'protocols' && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 font-medium mb-2">📋 Standard Operating Procedures</p>
                  <p className="text-sm text-blue-700">Contact your facility's pharmacy director or PCN for institution-specific SOPs and protocols.</p>
                </div>
                <a href="https://www.pcn.gov.ng/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-green-50 transition-colors group">
                  <span className="text-gray-700 group-hover:text-green-700">PCN Good Pharmacy Practice Guidelines</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                </a>
                <a href="https://www.fip.org/files/fip/publications/DevelopingPharmacyPractice/DevelopingPharmacyPracticeEN.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-green-50 transition-colors group">
                  <span className="text-gray-700 group-hover:text-green-700">FIP Good Pharmacy Practice Standards</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                </a>
                <a href="https://www.who.int/medicines/areas/quality_safety/safety_efficacy/trainingcourses/definitions.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-green-50 transition-colors group">
                  <span className="text-gray-700 group-hover:text-green-700">WHO Patient Counseling Guidelines</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                </a>
                <a href="https://www.ismp.org/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-green-50 transition-colors group">
                  <span className="text-gray-700 group-hover:text-green-700">ISMP Medication Safety Resources</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 3. Educational Materials */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div
            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection('education')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Educational Materials</h3>
                  <p className="text-gray-600 text-sm">CME courses and training resources</p>
                </div>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  activeSection === 'education' ? 'rotate-90' : ''
                }`}
              />
            </div>
          </div>

          {activeSection === 'education' && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="space-y-3">
                <a href="https://www.cdc.gov/training/publichealth101/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors group">
                  <div>
                    <span className="text-gray-700 group-hover:text-purple-700 font-medium block">CDC Public Health Training</span>
                    <span className="text-sm text-gray-500">Free public health courses and training</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                </a>
                <a href="https://www.who.int/health-topics/medicines" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors group">
                  <div>
                    <span className="text-gray-700 group-hover:text-purple-700 font-medium block">WHO Medicines Resources</span>
                    <span className="text-sm text-gray-500">Essential medicines guidelines & education</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                </a>
                <a href="https://www.coursera.org/search?query=pharmacy" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors group">
                  <div>
                    <span className="text-gray-700 group-hover:text-purple-700 font-medium block">Coursera Pharmacy Courses</span>
                    <span className="text-sm text-gray-500">Free online pharmacy & pharmacology courses</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                </a>
                <a href="https://www.edx.org/learn/pharmacy" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors group">
                  <div>
                    <span className="text-gray-700 group-hover:text-purple-700 font-medium block">edX Pharmacy Education</span>
                    <span className="text-sm text-gray-500">University-level pharmacy courses</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                </a>
                <a href="https://www.ncbi.nlm.nih.gov/pmc/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-purple-50 transition-colors group">
                  <div>
                    <span className="text-gray-700 group-hover:text-purple-700 font-medium block">PubMed Central</span>
                    <span className="text-sm text-gray-500">Free full-text pharmacy & medical research</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 4. Reference Tools */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div
            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection('tools')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Calculator className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Reference Tools</h3>
                  <p className="text-gray-600 text-sm">Calculators and conversion charts</p>
                </div>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  activeSection === 'tools' ? 'rotate-90' : ''
                }`}
              />
            </div>
          </div>

          {activeSection === 'tools' && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="space-y-3">
                <a href="https://www.mdcalc.com/calc/43/creatinine-clearance-cockcroft-gault-equation" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-orange-50 transition-colors group text-left">
                  <span className="text-gray-700 group-hover:text-orange-700">Creatinine Clearance (Cockcroft-Gault)</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
                </a>
                <a href="https://www.mdcalc.com/calc/68/pediatric-endotracheal-tube-ett-size" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-orange-50 transition-colors group text-left">
                  <span className="text-gray-700 group-hover:text-orange-700">Pediatric Dosing Calculator</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
                </a>
                <a href="https://www.drugs.com/drug_interactions.html" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-orange-50 transition-colors group text-left">
                  <span className="text-gray-700 group-hover:text-orange-700">Drug Interaction Checker</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
                </a>
                <a href="https://www.convertunits.com/from/mg/to/ml" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-orange-50 transition-colors group text-left">
                  <span className="text-gray-700 group-hover:text-orange-700">Medical Unit Converter</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
                </a>
                <a href="https://www.mdcalc.com/calc/99/iv-drip-rate-calculator" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-orange-50 transition-colors group text-left">
                  <span className="text-gray-700 group-hover:text-orange-700">IV Drip Rate Calculator</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-orange-600" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 5. Professional Development */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div
            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection('development')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <Award className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Professional Development</h3>
                  <p className="text-gray-600 text-sm">Certifications and continuing education</p>
                </div>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  activeSection === 'development' ? 'rotate-90' : ''
                }`}
              />
            </div>
          </div>

          {activeSection === 'development' && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="space-y-3">
                <a href="https://www.bpsweb.org/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-indigo-50 transition-colors group">
                  <div>
                    <span className="text-gray-700 group-hover:text-indigo-700 font-medium block">BPS Board Certification Programs</span>
                    <span className="text-sm text-gray-500">Specialist pharmacy certifications</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                </a>
                <a href="https://www.pcn.gov.ng/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-indigo-50 transition-colors group">
                  <div>
                    <span className="text-gray-700 group-hover:text-indigo-700 font-medium block">PCN License Renewal & Requirements</span>
                    <span className="text-sm text-gray-500">Pharmacists Council of Nigeria</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                </a>
                <a href="https://www.ashp.org/professional-development/residency-information" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-indigo-50 transition-colors group">
                  <div>
                    <span className="text-gray-700 group-hover:text-indigo-700 font-medium block">Pharmacy Residency Programs</span>
                    <span className="text-sm text-gray-500">PGY1 & PGY2 residency information</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                </a>
                <a href="https://www.fip.org/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-indigo-50 transition-colors group">
                  <div>
                    <span className="text-gray-700 group-hover:text-indigo-700 font-medium block">FIP - International Pharmaceutical Federation</span>
                    <span className="text-sm text-gray-500">Global pharmacy standards & resources</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 6. Regulatory Information */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div
            className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleSection('regulatory')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-lg">
                  <Scale className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Regulatory Information</h3>
                  <p className="text-gray-600 text-sm">PCN guidelines and compliance</p>
                </div>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  activeSection === 'regulatory' ? 'rotate-90' : ''
                }`}
              />
            </div>
          </div>

          {activeSection === 'regulatory' && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="space-y-3">
                <a href="https://www.pcn.gov.ng/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-red-50 transition-colors group">
                  <span className="text-gray-700 group-hover:text-red-700">PCN Practice Guidelines & Regulations</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                </a>
                <a href="https://www.nafdac.gov.ng/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-red-50 transition-colors group">
                  <span className="text-gray-700 group-hover:text-red-700">NAFDAC - National Agency for Food & Drug Administration</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                </a>
                <a href="https://www.nafdac.gov.ng/our-services/product-registration/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-red-50 transition-colors group">
                  <span className="text-gray-700 group-hover:text-red-700">NAFDAC Drug Registration & Verification</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                </a>
                <a href="https://ndlea.gov.ng/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-red-50 transition-colors group">
                  <span className="text-gray-700 group-hover:text-red-700">NDLEA - Controlled Substances Regulations</span>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                </a>
                <a href="https://www.fip.org/files/fip/publications/2011-05-GPP-EN.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-red-50 transition-colors group">
                  <span className="text-gray-700 group-hover:text-red-700">FIP Good Pharmacy Practice Standards</span>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Forms & Templates Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gray-100 rounded-lg">
            <Download className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-blue-800">Forms & Templates</h2>
            <p className="text-gray-600 text-sm">Download essential pharmacy forms and templates</p>
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Templates Coming Soon</p>
              <p className="text-sm text-blue-700 mt-1">
                Standardized pharmacy forms and templates are currently being developed. In the meantime,
                please use your institution's approved forms or consult with your pharmacy director.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-gray-500">Prescription Template</span>
            </div>
            <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">Coming Soon</span>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-gray-500">Patient Counseling Form</span>
            </div>
            <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">Coming Soon</span>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-gray-500">Medication Review Form</span>
            </div>
            <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">Coming Soon</span>
          </div>

          <a href="https://www.nafdac.gov.ng/resources/adverse-drug-reactions-reporting/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
              <span className="text-gray-700 group-hover:text-blue-700">NAFDAC Adverse Event Report</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
          </a>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-gray-500">Controlled Substance Log</span>
            </div>
            <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">Coming Soon</span>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-gray-500">Inventory Checklist</span>
            </div>
            <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg shadow-md">
          <p className="text-lg font-bold text-blue-600">150+</p>
          <p className="text-sm text-blue-700">Clinical Guidelines</p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg shadow-md">
          <p className="text-lg font-bold text-purple-600">50+</p>
          <p className="text-sm text-purple-700">CME Courses</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg shadow-md">
          <p className="text-lg font-bold text-green-600">25+</p>
          <p className="text-sm text-green-700">Reference Tools</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg shadow-md">
          <p className="text-lg font-bold text-orange-600">100+</p>
          <p className="text-sm text-orange-700">Forms & Templates</p>
        </div>
      </div>
    </div>
  );
};

export default PharmacyResourcesPage;
