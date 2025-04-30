import React, { useState } from 'react';
import { useAuth } from '../auth/authContext';
import { Link } from 'react-router-dom';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';

interface PrescriptionType {
  id: string;
  medication: string;
  dosage: string;
  prescribed: string;
  lastDispensed: string;
  nextDue: string;
  remainingRepeats: number;
  status: 'active' | 'ordered' | 'dispensed' | 'expired' | 'cancelled';
  prescriber: string;
}

interface NotificationType {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  date: string;
}

// Sample prescriptions for demonstration
const mockPrescriptions: PrescriptionType[] = [
  {
    id: 'p1',
    medication: 'Cetirizine 10mg tablets',
    dosage: 'One tablet once a day',
    prescribed: '2023-09-15',
    lastDispensed: '2023-10-01',
    nextDue: '2023-11-01',
    remainingRepeats: 3,
    status: 'active',
    prescriber: 'Dr. Michael Brown'
  },
  {
    id: 'p2',
    medication: 'Salbutamol 100mcg inhaler',
    dosage: 'One or two puffs up to four times a day when required',
    prescribed: '2023-08-22',
    lastDispensed: '2023-09-01',
    nextDue: '2023-10-15',
    remainingRepeats: 5,
    status: 'active',
    prescriber: 'Dr. Sarah Johnson'
  },
  {
    id: 'p3',
    medication: 'Omeprazole 20mg capsules',
    dosage: 'One capsule once a day',
    prescribed: '2023-10-05',
    lastDispensed: '2023-10-07',
    nextDue: '2023-11-07',
    remainingRepeats: 2,
    status: 'ordered',
    prescriber: 'Dr. Michael Brown'
  },
  {
    id: 'p4',
    medication: 'Amoxicillin 500mg capsules',
    dosage: 'One capsule three times a day',
    prescribed: '2023-07-10',
    lastDispensed: '2023-07-10',
    nextDue: '-',
    remainingRepeats: 0,
    status: 'expired',
    prescriber: 'Dr. James Wilson'
  },
  {
    id: 'p5',
    medication: 'Ibuprofen 400mg tablets',
    dosage: 'One tablet up to three times a day',
    prescribed: '2023-10-10',
    lastDispensed: '2023-10-12',
    nextDue: '2023-11-12',
    remainingRepeats: 0,
    status: 'dispensed',
    prescriber: 'Dr. Sarah Johnson'
  },
];

// Sample notifications
const mockNotifications: NotificationType[] = [
  {
    id: 'n1',
    type: 'success',
    message: 'Your prescription for Omeprazole 20mg has been ordered and will be ready for collection soon.',
    date: '2023-10-06'
  },
  {
    id: 'n2',
    type: 'info',
    message: 'Your Cetirizine prescription will be due for renewal in 14 days.',
    date: '2023-10-18'
  },
];

const Prescriptions: React.FC = () => {
  const { user } = useAuth();
  const [view, setView] = useState<'all' | 'active' | 'ordered' | 'history'>('active');
  const [selectedPrescription, setSelectedPrescription] = useState<PrescriptionType | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Filter prescriptions based on current view
  const filteredPrescriptions = mockPrescriptions.filter(prescription => {
    if (view === 'all') return true;
    if (view === 'active') return prescription.status === 'active';
    if (view === 'ordered') return prescription.status === 'ordered' || prescription.status === 'dispensed';
    if (view === 'history') return prescription.status === 'expired' || prescription.status === 'cancelled';
    return true;
  });

  const formatDate = (dateString: string) => {
    if (dateString === '-') return '-';
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ready to order';
      case 'ordered': return 'Processing';
      case 'dispensed': return 'Ready for collection';
      case 'expired': return 'Expired';
      case 'cancelled': return 'Cancelled';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'ordered': return 'text-blue-600 bg-blue-50';
      case 'dispensed': return 'text-purple-600 bg-purple-50';
      case 'expired': return 'text-gray-600 bg-gray-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // Handle prescription order
  const handleOrderPrescription = (prescription: PrescriptionType) => {
    setSelectedPrescription(prescription);
    setShowOrderModal(true);
  };

  // Simplified mock order submission
  const submitOrder = () => {
    console.log('Order submitted for:', selectedPrescription?.medication);
    setShowOrderModal(false);
    // In a real app, this would update the prescription status and trigger API calls
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

        {/* Notifications */}
        {mockNotifications.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold mb-3">Notifications</h3>
            <div className="space-y-3">
              {mockNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-md ${
                    notification.type === 'success' ? 'bg-green-50 text-green-700' :
                    notification.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                    notification.type === 'error' ? 'bg-red-50 text-red-700' :
                    'bg-blue-50 text-blue-700'
                  }`}
                >
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
                    </div>
                    <div className="ml-3">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs mt-1 opacity-70">{formatDate(notification.date)}</p>
                    </div>
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
                onClick={() => setView('active')}
                className={`whitespace-nowrap pb-3 px-1 text-sm font-medium ${
                  view === 'active'
                    ? 'border-b-2 border-[#005eb8] text-[#005eb8]'
                    : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                Ready to order
              </button>
              <button
                onClick={() => setView('ordered')}
                className={`whitespace-nowrap pb-3 px-1 text-sm font-medium ${
                  view === 'ordered'
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
                      Next due
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Repeats
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPrescriptions.map((prescription) => (
                    <tr key={prescription.id} className="hover:bg-gray-50">
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
                        <div className="text-sm text-gray-900">{formatDate(prescription.nextDue)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(prescription.status)}`}>
                          {getStatusLabel(prescription.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {prescription.remainingRepeats}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {prescription.status === 'active' && (
                          <button
                            onClick={() => handleOrderPrescription(prescription)}
                            className="text-[#005eb8] hover:text-[#003f7e]"
                          >
                            Order
                          </button>
                        )}
                        {(prescription.status === 'ordered' || prescription.status === 'dispensed') && (
                          <span className="text-gray-500 cursor-not-allowed">Ordered</span>
                        )}
                        {prescription.status === 'expired' && prescription.remainingRepeats === 0 && (
                          <Link to="/account/request-prescription" className="text-[#005eb8] hover:text-[#003f7e]">
                            Request renewal
                          </Link>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">No prescriptions found</h3>
              <p className="text-gray-500 mt-1">There are no prescriptions in this category.</p>
            </div>
          )}
        </div>

        {/* Additional information */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="font-bold text-blue-800 mb-2">Order or view your prescriptions online</h3>
            <p className="text-blue-700 text-sm">
              You can order repeat prescriptions, view your prescription history, and check the status of your prescriptions online.
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

        {/* Order modal */}
        {showOrderModal && selectedPrescription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-bold mb-4">Order prescription</h3>
              <p className="mb-4">
                You are about to order:
              </p>
              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <p className="font-bold">{selectedPrescription.medication}</p>
                <p className="text-sm text-gray-600">{selectedPrescription.dosage}</p>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                This will be sent to your nominated pharmacy for dispensing.
                You will be notified when your prescription is ready for collection.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={submitOrder}
                  className="px-4 py-2 bg-[#005eb8] text-white rounded-md hover:bg-[#003f7e]"
                >
                  Confirm order
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
