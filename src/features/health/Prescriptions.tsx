import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/authContext';
import { Link } from 'react-router-dom';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';
import { 
  fetchPatientPrescriptions, 
  orderPrescription, 
  completePrescription, 
  ApiMedication, 
  ApiPrescriptionsResponse,
  Notification,
  generateNotifications,
  getSavedNotifications,
  saveNotifications,
  deleteNotification
} from './prescriptionsService';

interface PrescriptionType {
  id: string;
  medication: string;
  dosage: string;
  prescribed: string;
  lastDispensed: string;
  prescriber: string;
  status: 'active' | 'collected' | 'completed' | 'expired';
  form?: string;
  route?: string;
  frequency?: string;
  duration?: string;
  patient_instructions?: string;
  indication?: string;
  strength?: string;
  generic_name?: string;
}

// NotificationType interface is now imported from prescriptionsService.ts as 'Notification'

const Prescriptions: React.FC = () => {
  const { user } = useAuth();
  const [view, setView] = useState<'all' | 'inProgress' | 'history'>('all');
  const [selectedPrescription, setSelectedPrescription] = useState<PrescriptionType | null>(null);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [prescriptions, setPrescriptions] = useState<PrescriptionType[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Load notifications from local storage on component mount
  useEffect(() => {
    const savedNotifications = getSavedNotifications();
    setNotifications(savedNotifications);
  }, []);

  useEffect(() => {
    const loadPrescriptions = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPatientPrescriptions();
        console.log('Fetched prescriptions:', data);
        
        // Process the API response - only use medications array from the response
        const apiPrescriptions = data.medications || [];
        console.log('API prescriptions:', apiPrescriptions);
        
        // Generate notifications from prescription data
        const generatedNotifications = generateNotifications(apiPrescriptions);
        
        // Merge with existing notifications, avoiding duplicates
        const existingNotifications = getSavedNotifications();
        const mergedNotifications = [...existingNotifications];
        
        // Add only new notifications that don't already exist
        generatedNotifications.forEach(newNotif => {
          // Check if notification with same ID exists
          if (!mergedNotifications.some(existing => existing.id === newNotif.id)) {
            mergedNotifications.push(newNotif);
          }
        });
        
        // Save and set notifications
        saveNotifications(mergedNotifications);
        setNotifications(mergedNotifications);
        
        // Convert API format to our component format
        const formattedPrescriptions: PrescriptionType[] = apiPrescriptions.map((apiMed: ApiMedication) => {
          // Get creation date safely
          const creationDateStr = apiMed.created_at || new Date().toISOString();
          const creationDate = new Date(creationDateStr);
          
          // Safely extract date part or use a fallback
          const prescribedDate = apiMed.created_at ? apiMed.created_at.split('T')[0] : new Date().toISOString().split('T')[0];
          
          let status: 'active' | 'collected' | 'completed' | 'expired';
          if (apiMed.status === 'expired') {
            status = 'expired';
          } else if (apiMed.status === 'dispensed' || apiMed.status === 'ordered') {
            status = 'collected';
          } else if (apiMed.status === 'completed') {
            status = 'completed';
          } else {
            status = 'active';
          }

          // Get the prescriber name safely - prioritize the actual doctor who prescribed the medication
          const prescriber = apiMed.doctor_name || 
                          apiMed.prescriber_name || 
                          'Your Doctor';
          
          return {
            id: apiMed.id || String(Math.random()),
            medication: `${apiMed.medication_name || 'Unknown'} ${apiMed.strength || ''}`.trim(),
            dosage: `${apiMed.dosage || 'As directed'}, ${apiMed.frequency || 'as needed'}${apiMed.duration ? `, for ${apiMed.duration}` : ''}`,
            prescribed: prescribedDate,
            lastDispensed: prescribedDate, // Assuming dispensed on creation for demo
            status: status,
            prescriber: prescriber,
            // Save original API fields for detail view
            form: apiMed.form,
            route: apiMed.route,
            frequency: apiMed.frequency,
            duration: apiMed.duration,
            patient_instructions: apiMed.patient_instructions,
            indication: apiMed.indication,
            strength: apiMed.strength,
            generic_name: apiMed.generic_name
          };
        });
        console.log('Formatted prescriptions:', formattedPrescriptions);
        setPrescriptions(formattedPrescriptions);
      } catch (err: any) {
        console.error('Failed to load prescriptions:', err);
        setError(err.message || 'Failed to load prescriptions');
        
        // Fallback to empty array if API fails
        setPrescriptions([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPrescriptions();
  }, []);

  // Filter prescriptions based on current view
  const filteredPrescriptions = prescriptions.filter(prescription => {
    if (view === 'all') return prescription.status === 'active'; // All prescriptions tab now shows only active prescriptions
    if (view === 'inProgress') return prescription.status === 'collected';
    if (view === 'history') return prescription.status === 'completed' || prescription.status === 'expired';
    return true;
  });

  const formatDate = (dateString: string) => {
    if (dateString === '-') return '-';
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
    } catch (e) {
      return dateString;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ready to collect';
      case 'collected': return 'Collected';
      case 'completed': return 'Completed';
      case 'expired': return 'Expired';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'collected': return 'text-blue-600 bg-blue-50';
      case 'completed': return 'text-purple-600 bg-purple-50';
      case 'expired': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Handle prescription collection
  const handleCollectPrescription = (prescription: PrescriptionType) => {
    setSelectedPrescription(prescription);
    setShowCollectModal(true);
  };

  // Handle prescription completion
  const handleCompletePrescription = (prescription: PrescriptionType) => {
    setSelectedPrescription(prescription);
    setShowCompleteModal(true);
  };

  // Handle view prescription details
  const handleViewPrescriptionDetails = (prescription: PrescriptionType) => {
    setSelectedPrescription(prescription);
    setShowDetailModal(true);
  };

  // Submit collect using the service
  const submitCollect = async () => {
    if (!selectedPrescription) return;
    
    try {
      setIsLoading(true);
      // Call the orderPrescription function
      const result = await orderPrescription(selectedPrescription.id);
      
      // Update the prescription status locally
      setPrescriptions(prescriptions.map(p => 
        p.id === selectedPrescription.id 
          ? { 
              ...p, 
              status: 'collected',
              lastDispensed: new Date().toISOString().split('T')[0]
            }
          : p
      ));
      
      // Update the view to show In Progress after purchase
      setView('inProgress');
      
      setShowCollectModal(false);
      setActionSuccess(`Your ${selectedPrescription.medication} has been marked as purchased successfully.`);
      setTimeout(() => setActionSuccess(null), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to purchase prescription');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit completion
  const submitComplete = async () => {
    if (!selectedPrescription) return;
    
    try {
      setIsLoading(true);
      // Use the completePrescription function
      const result = await completePrescription(selectedPrescription.id);
      
      // Update the prescription status locally
      setPrescriptions(prescriptions.map(p => 
        p.id === selectedPrescription.id 
          ? { 
              ...p, 
              status: 'completed' 
            }
          : p
      ));
      
      // Update the view to show History after finishing medication
      setView('history');
      
      setShowCompleteModal(false);
      setActionSuccess(`Your ${selectedPrescription.medication} has been marked as completed successfully.`);
      setTimeout(() => setActionSuccess(null), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to complete prescription');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AccountHealthLayout title="Prescriptions">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Prescriptions</h2>
          <div className="text-sm text-gray-500">
            HPN Number: <span className="font-medium">{user?.hpn || '123 456 7890'}</span>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Success message */}
        {actionSuccess && (
          <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
            <p className="font-medium">Success</p>
            <p className="text-sm">{actionSuccess}</p>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="mb-6 text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your prescriptions...</p>
          </div>
        )}

        {/* Notifications */}
        {!isLoading && notifications.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold mb-3">Notifications</h3>
            <div className="space-y-3">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-md ${
                    notification.type === 'success' ? 'bg-green-50 text-green-700' :
                    notification.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                    notification.type === 'error' ? 'bg-red-50 text-red-700' :
                    'bg-blue-50 text-blue-700'
                  }`}
                >
                  <div className="flex justify-between">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {notification.type === 'success' && (
                          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {notification.type === 'info' && (
                          <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {notification.type === 'warning' && (
                          <svg className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        )}
                        {notification.type === 'error' && (
                          <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs mt-1 opacity-70">{formatDate(notification.date)}</p>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const updatedNotifications = deleteNotification(notification.id);
                        setNotifications(updatedNotifications);
                        setActionSuccess('Notification dismissed');
                        setTimeout(() => setActionSuccess(null), 3000);
                      }}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label="Delete notification"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View selector */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setView('inProgress')}
                className={`whitespace-nowrap pb-3 px-1 text-sm font-medium ${
                  view === 'inProgress'
                    ? 'border-b-2 border-[#005eb8] text-[#005eb8]'
                    : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                In progress
              </button>
              <button
                onClick={() => setView('history')}
                className={`whitespace-nowrap pb-3 px-1 text-sm font-medium ${
                  view === 'history'
                    ? 'border-b-2 border-[#005eb8] text-[#005eb8]'
                    : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                History
              </button>
              <button
                onClick={() => setView('all')}
                className={`whitespace-nowrap pb-3 px-1 text-sm font-medium ${
                  view === 'all'
                    ? 'border-b-2 border-[#005eb8] text-[#005eb8]'
                    : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                All prescriptions
              </button>
            </nav>
          </div>
        </div>

        {/* Prescriptions list */}
        <div className="mb-6">
          {filteredPrescriptions.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Medication
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last dispensed
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPrescriptions.map((prescription) => (
                    <tr 
                      key={prescription.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewPrescriptionDetails(prescription)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{prescription.medication}</div>
                            <div className="text-sm text-gray-500">{prescription.dosage}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(prescription.lastDispensed)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(prescription.status)}`}>
                          {getStatusLabel(prescription.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {prescription.prescriber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" onClick={(e) => e.stopPropagation()}>
                        {prescription.status === 'active' && (
                          <button
                            onClick={() => handleCollectPrescription(prescription)}
                            className="text-[#005eb8] hover:text-[#003f7e]"
                          >
                            Purchase
                          </button>
                        )}
                        {prescription.status === 'collected' && (
                          <button
                            onClick={() => handleCompletePrescription(prescription)}
                            className="text-[#005eb8] hover:text-[#003f7e]"
                          >
                            Finished medication
                          </button>
                        )}
                        {(prescription.status === 'completed' || prescription.status === 'expired') && (
                          <span className="text-gray-500 cursor-not-allowed">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-md">
              <svg className="h-12 w-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">No prescriptions found</h3>
              <p className="text-gray-500 mt-1">
                {view === 'all' && 'There are no prescribed medications for you at this time.'}
                {view === 'inProgress' && 'You have no medications in progress at this time.'}
                {view === 'history' && 'You have no medication history at this time.'}
              </p>
            </div>
          )}
        </div>

        {/* Additional information */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-bold text-blue-800 mb-2">View and manage your prescriptions online</h3>
            <p className="text-blue-700 text-sm">
              You can manage your prescriptions, view your prescription history, and track the status of your prescriptions online.
              Your GP practice or pharmacy can answer questions about your prescription medications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold mb-2">Request a new prescription</h3>
              <p className="text-sm text-gray-600 mb-3">
                If you need a prescription for a new medication, you'll need to contact your GP.
              </p>
              <Link to="/account/request-prescription" className="text-[#005eb8] text-sm hover:underline">
                Request a new prescription
              </Link>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-bold mb-2">Nominated pharmacy</h3>
              <p className="text-sm text-gray-600 mb-3">
                Electronic prescriptions will be sent to your nominated pharmacy.
              </p>
              <Link to="/account/nominated-pharmacy" className="text-[#005eb8] text-sm hover:underline">
                Set or change your pharmacy
              </Link>
            </div>
          </div>
        </div>

        {/* Collect modal */}
        {showCollectModal && selectedPrescription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-bold mb-4">Collect Prescription</h3>
              <p className="mb-4">
                You are about to mark this prescription as collected:
              </p>
              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <p className="font-bold">{selectedPrescription.medication}</p>
                <p className="text-sm text-gray-600">{selectedPrescription.dosage}</p>
                <p className="text-sm text-gray-600 mt-1">Prescribed by: {selectedPrescription.prescriber}</p>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                This action indicates you have collected the medication from your pharmacy and it is now in your possession.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCollectModal(false)}
                  disabled={isLoading}
                  className={`px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={submitCollect}
                  disabled={isLoading}
                  className={`px-4 py-2 bg-[#005eb8] text-white rounded-md hover:bg-[#003f7e] ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⟳</span>
                      Processing...
                    </>
                  ) : (
                    'Confirm Purchase'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Complete modal */}
        {showCompleteModal && selectedPrescription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-bold mb-4">Complete Prescription</h3>
              <p className="mb-4">
                You are about to mark this prescription as completed:
              </p>
              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <p className="font-bold">{selectedPrescription.medication}</p>
                <p className="text-sm text-gray-600">{selectedPrescription.dosage}</p>
                <p className="text-sm text-gray-600 mt-1">Prescribed by: {selectedPrescription.prescriber}</p>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                This action indicates you have finished the prescribed course of medication. The prescription will be moved to your history.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCompleteModal(false)}
                  disabled={isLoading}
                  className={`px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={submitComplete}
                  disabled={isLoading}
                  className={`px-4 py-2 bg-[#005eb8] text-white rounded-md hover:bg-[#003f7e] ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⟳</span>
                      Processing...
                    </>
                  ) : (
                    'Confirm Completion'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Prescription detail modal */}
        {showDetailModal && selectedPrescription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-blue-800">Prescription Details</h3>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Prescription summary */}
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <h4 className="font-bold text-blue-800 mb-2">{selectedPrescription.medication}</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Status:</span>{' '}
                    <span className={`px-2 py-0.5 rounded-full ${getStatusColor(selectedPrescription.status)}`}>
                      {getStatusLabel(selectedPrescription.status)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Prescribed by:</span> {selectedPrescription.prescriber}
                  </div>
                  <div>
                    <span className="font-medium">Prescribed:</span> {formatDate(selectedPrescription.prescribed)}
                  </div>
                  <div>
                    <span className="font-medium">Last dispensed:</span> {formatDate(selectedPrescription.lastDispensed)}
                  </div>
                </div>
              </div>

              {/* Medication details */}
              <div className="mb-6">
                <h4 className="font-bold mb-3 text-gray-700">Medication Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
                  <div>
                    <p className="text-sm text-gray-500">Medication Name</p>
                    <p className="font-medium">{selectedPrescription.medication}</p>
                  </div>
                  {selectedPrescription.generic_name && (
                    <div>
                      <p className="text-sm text-gray-500">Generic Name</p>
                      <p className="font-medium">{selectedPrescription.generic_name}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500">Strength</p>
                    <p className="font-medium">{selectedPrescription.strength}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Form</p>
                    <p className="font-medium capitalize">{selectedPrescription.form}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="font-medium capitalize">{selectedPrescription.route}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Dosage</p>
                    <p className="font-medium">{selectedPrescription.dosage}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Frequency</p>
                    <p className="font-medium">{selectedPrescription.frequency}</p>
                  </div>
                  {selectedPrescription.duration && (
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{selectedPrescription.duration}</p>
                    </div>
                  )}
                  {selectedPrescription.indication && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">Indication</p>
                      <p className="font-medium">{selectedPrescription.indication}</p>
                    </div>
                  )}
                  {selectedPrescription.patient_instructions && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">Instructions</p>
                      <p className="font-medium">{selectedPrescription.patient_instructions}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-3 mt-6">
                {selectedPrescription.status === 'active' && (
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      setShowCollectModal(true);
                    }}
                    className="px-4 py-2 bg-[#005eb8] text-white rounded-md hover:bg-[#003f7e]"
                  >
                    Purchase
                  </button>
                )}
                {selectedPrescription.status === 'collected' && (
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      setShowCompleteModal(true);
                    }}
                    className="px-4 py-2 bg-[#005eb8] text-white rounded-md hover:bg-[#003f7e]"
                  >
                    Finished medication
                  </button>
                )}
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AccountHealthLayout>
  );
};

export default Prescriptions;
