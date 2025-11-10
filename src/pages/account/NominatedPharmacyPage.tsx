import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  Building2,
  CheckCircle2,
  XCircle,
  Search,
  History,
  Info,
  Loader2,
  ExternalLink
} from 'lucide-react';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';
import {
  getCurrentNomination,
  getPharmacies,
  getNominatablePharmacies,
  nominatePharmacy,
  removeNomination,
  getNominationHistory,
  formatPharmacyAddress,
  getTodayHours,
  type Pharmacy,
  type NominatedPharmacy,
  type NominatedPharmacyHistory
} from '../../services/pharmacyService';

const NominatedPharmacyPage: React.FC = () => {
  const [currentNomination, setCurrentNomination] = useState<NominatedPharmacy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPharmacySearch, setShowPharmacySearch] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [nominationHistory, setNominationHistory] = useState<NominatedPharmacyHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load current nomination on mount
  useEffect(() => {
    loadCurrentNomination();
  }, []);

  const loadCurrentNomination = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getCurrentNomination();

      if (response.has_nomination && response.nomination) {
        setCurrentNomination(response.nomination);
      } else {
        setCurrentNomination(null);
      }
    } catch (err) {
      console.error('Error loading nomination:', err);
      setError('Failed to load your nominated pharmacy');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchPharmacies = async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setPharmacies([]);
      return;
    }

    try {
      setSearchLoading(true);
      // Use getNominatablePharmacies to include both admin pharmacies and practice pages
      const response = await getNominatablePharmacies({ search: query });
      setPharmacies(response.pharmacies);
    } catch (err) {
      console.error('Error searching pharmacies:', err);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleNominatePharmacy = async (pharmacy: Pharmacy) => {
    try {
      setActionLoading(true);
      setError(null);

      // Determine if this is an admin pharmacy or practice page
      const nominationRequest: any = {
        nomination_type: 'repeat',
      };

      if (pharmacy.source === 'practice_page' && pharmacy.practice_page_id) {
        nominationRequest.practice_page_id = pharmacy.practice_page_id;
      } else if (pharmacy.pharmacy_id) {
        nominationRequest.pharmacy_id = pharmacy.pharmacy_id;
      } else {
        // Fallback for legacy data
        nominationRequest.pharmacy_id = typeof pharmacy.id === 'number' ? pharmacy.id : parseInt(pharmacy.id.toString().replace('pharmacy-', ''));
      }

      const response = await nominatePharmacy(nominationRequest);

      if (response.success) {
        setSuccessMessage(`${pharmacy.name} has been set as your nominated pharmacy!`);
        await loadCurrentNomination();
        setShowPharmacySearch(false);
        setPharmacies([]);
        setSearchQuery('');

        // Clear success message after 5 seconds
        setTimeout(() => setSuccessMessage(null), 5000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to nominate pharmacy');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemoveNomination = async () => {
    if (!confirm('Are you sure you want to remove your nominated pharmacy?')) {
      return;
    }

    try {
      setActionLoading(true);
      setError(null);

      const response = await removeNomination();

      if (response.success) {
        setSuccessMessage('Pharmacy nomination removed successfully');
        setCurrentNomination(null);

        setTimeout(() => setSuccessMessage(null), 5000);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to remove nomination');
    } finally {
      setActionLoading(false);
    }
  };

  const loadNominationHistory = async () => {
    try {
      setHistoryLoading(true);
      const response = await getNominationHistory();
      setNominationHistory(response.nominations);
      setShowHistory(true);
    } catch (err) {
      console.error('Error loading history:', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  if (isLoading) {
    return (
      <AccountHealthLayout title="Your Nominated Pharmacy">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      </AccountHealthLayout>
    );
  }

  return (
    <AccountHealthLayout title="Your Nominated Pharmacy">
      {/* Info Banner */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
        <div className="flex">
          <Info className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-800">
              Your nominated pharmacy is where your electronic prescriptions will be sent.
              You can collect your medicine from this pharmacy without needing a paper prescription.
            </p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
          <div className="flex">
            <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
            <p className="text-sm text-green-800">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
          <div className="flex">
            <XCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Current Nomination Card */}
      {currentNomination ? (
        (() => {
          // Get pharmacy data from either pharmacy or practice_page
          const pharmacyData = (currentNomination as any).pharmacy || (currentNomination as any).practice_page;
          const isPracticePage = !(currentNomination as any).pharmacy && !!(currentNomination as any).practice_page;

          return (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Current Nominated Pharmacy</h2>
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-gray-900">{pharmacyData.name}</h3>
                    {isPracticePage && (
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                        Professional
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Code: {pharmacyData.phb_pharmacy_code}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-700">
                      {formatPharmacyAddress(pharmacyData)}
                    </p>
                  </div>

                  {pharmacyData.phone && (
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-2" />
                      <a
                        href={`tel:${pharmacyData.phone}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {pharmacyData.phone}
                      </a>
                    </div>
                  )}

                  {pharmacyData.opening_hours && (
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-400 mr-2" />
                      <p className="text-sm text-gray-700">
                        Today: {getTodayHours(pharmacyData.opening_hours)}
                      </p>
                    </div>
                  )}

                  {pharmacyData.electronic_prescriptions_enabled && (
                    <div className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                      <p className="text-sm text-green-700 font-medium">
                        Electronic Prescriptions Enabled
                      </p>
                    </div>
                  )}
                </div>

                {pharmacyData.services_offered && pharmacyData.services_offered.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {pharmacyData.services_offered.map((service: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {service.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Nominated on {new Date(currentNomination.nominated_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={() => setShowPharmacySearch(true)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Change Pharmacy
                  </button>
                  <button
                    onClick={handleRemoveNomination}
                    disabled={actionLoading}
                    className="flex-1 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium disabled:opacity-50"
                  >
                    {actionLoading ? 'Removing...' : 'Remove Nomination'}
                  </button>
                </div>
              </div>
            </div>
          );
        })()
      ) : (
        // No Nomination Card
        <div className="bg-white rounded-lg shadow-md p-8 mb-6 text-center">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No Nominated Pharmacy
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            You haven't nominated a pharmacy yet. Nominate one now to receive your electronic prescriptions directly.
          </p>
          <button
            onClick={() => setShowPharmacySearch(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Nominate a Pharmacy
          </button>
        </div>
      )}

      {/* View History Button */}
      <div className="mb-6">
        <button
          onClick={loadNominationHistory}
          disabled={historyLoading}
          className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          <History className="w-5 h-5 mr-2" />
          {historyLoading ? 'Loading...' : 'View Nomination History'}
        </button>
      </div>

      {/* Help Links */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
        <div className="space-y-2">
          <Link
            to="/help/prescriptions/how-nominations-work"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            How do pharmacy nominations work?
          </Link>
          <Link
            to="/find-pharmacy"
            className="flex items-center text-blue-600 hover:text-blue-700"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Find pharmacies near you
          </Link>
        </div>
      </div>

      {/* Pharmacy Search Modal */}
      {showPharmacySearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Search for a Pharmacy</h2>
            </div>

            <div className="p-6">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by pharmacy name, city, or postcode..."
                  value={searchQuery}
                  onChange={(e) => handleSearchPharmacies(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              {searchLoading && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                </div>
              )}

              <div className="max-h-96 overflow-y-auto space-y-3">
                {pharmacies.map((pharmacy) => (
                  <div
                    key={pharmacy.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-900">{pharmacy.name}</h3>
                          {pharmacy.source === 'practice_page' && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">
                              Professional
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {pharmacy.address_line_1}, {pharmacy.city}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span className="text-xs text-gray-400">Code: {pharmacy.phb_pharmacy_code}</span>
                          {pharmacy.distance && (
                            <span>{pharmacy.distance} km away</span>
                          )}
                          {pharmacy.is_open && (
                            <span className="text-green-600 font-medium">Open now</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => handleNominatePharmacy(pharmacy)}
                        disabled={actionLoading}
                        className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50"
                      >
                        {actionLoading ? 'Nominating...' : 'Nominate'}
                      </button>
                    </div>
                  </div>
                ))}

                {!searchLoading && searchQuery && pharmacies.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    No pharmacies found. Try a different search term.
                  </p>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setShowPharmacySearch(false);
                  setPharmacies([]);
                  setSearchQuery('');
                }}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nomination History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Nomination History</h2>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              {nominationHistory.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No nomination history found.</p>
              ) : (
                <div className="space-y-4">
                  {nominationHistory.map((nomination) => (
                    <div
                      key={nomination.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{nomination.pharmacy_name}</h3>
                          <p className="text-sm text-gray-600 mt-1">Code: {nomination.pharmacy_code}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Nominated: {new Date(nomination.nominated_at).toLocaleDateString()}
                            {nomination.ended_at && (
                              <> • Ended: {new Date(nomination.ended_at).toLocaleDateString()}</>
                            )}
                          </p>
                        </div>
                        {nomination.is_current && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                            Current
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowHistory(false)}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AccountHealthLayout>
  );
};

export default NominatedPharmacyPage;
