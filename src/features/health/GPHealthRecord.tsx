import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/authContext';
import { Link } from 'react-router-dom';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';

interface RecordType {
  id: string;
  date: string;
  provider: string;
  title: string;
  summary: string;
  details?: string;
  type: 'appointment' | 'consultation' | 'test' | 'medication' | 'referral' | 'vaccination';
}

// Sample health records for demonstration
const mockHealthRecords: RecordType[] = [
  {
    id: '1',
    date: '2023-12-15',
    provider: 'Dr. Sarah Johnson',
    title: 'Regular Check-up',
    summary: 'Annual wellness check-up. No significant concerns.',
    details: 'Blood pressure: 120/80 mmHg\nWeight: 70 kg\nHeight: 175 cm\nBMI: 22.9\nNotes: Patient reports mild seasonal allergies. Advised to continue taking antihistamines as needed.',
    type: 'consultation'
  },
  {
    id: '2',
    date: '2023-09-08',
    provider: 'City Medical Laboratory',
    title: 'Blood Test Results',
    summary: 'Complete blood count and metabolic panel. All results within normal range.',
    details: 'Hemoglobin: 14.2 g/dL (Normal)\nWhite blood cells: 7.5 x10^9/L (Normal)\nPlatelets: 250 x10^9/L (Normal)\nGlucose: 5.1 mmol/L (Normal)\nTotal cholesterol: 4.8 mmol/L (Normal)',
    type: 'test'
  },
  {
    id: '3',
    date: '2023-07-22',
    provider: 'Dr. James Wilson',
    title: 'Prescription Renewal',
    summary: 'Renewed prescription for allergy medication.',
    details: 'Medication: Cetirizine 10mg\nDosage: One tablet daily\nQuantity: 30 tablets\nRefills: 3',
    type: 'medication'
  },
  {
    id: '4',
    date: '2023-05-10',
    provider: 'Dr. Sarah Johnson',
    title: 'Influenza Vaccination',
    summary: 'Annual flu vaccine administered.',
    details: 'Vaccine: Quadrivalent Influenza Vaccine\nBatch number: FL789456\nAdministered in: Left arm\nNo immediate adverse reactions observed.',
    type: 'vaccination'
  },
  {
    id: '5',
    date: '2023-03-15',
    provider: 'Dr. Michael Brown',
    title: 'Dermatology Referral',
    summary: 'Referral to dermatology for assessment of persistent rash.',
    details: 'Referred to: Dr. Emily Chen, Dermatology\nReason: Assessment of eczema on hands and arms\nUrgency: Routine',
    type: 'referral'
  },
];

const GPHealthRecord: React.FC = () => {
  const { user, isLoading, error, hasPrimaryHospital, primaryHospital, checkPrimaryHospital } = useAuth();
  const [selectedRecord, setSelectedRecord] = useState<RecordType | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCheckingHospital, setIsCheckingHospital] = useState(false);

  // Check primary hospital on component mount
  useEffect(() => {
    const verifyHospital = async () => {
      setIsCheckingHospital(true);
      try {
        await checkPrimaryHospital();
      } catch (err) {
        console.error("Error checking primary hospital status:", err);
      } finally {
        setIsCheckingHospital(false);
      }
    };

    // Only check if we don't already have the primary hospital information
    // Use a local variable to avoid dependency on the changing state
    const shouldCheckHospital = !isLoading && !hasPrimaryHospital && !primaryHospital;
    
    if (shouldCheckHospital) {
      verifyHospital();
    }
    
    // Remove dependencies that cause re-renders and infinite API calls
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter records based on type and search term
  const filteredRecords = mockHealthRecords.filter(record => {
    const matchesType = filterType === 'all' || record.type === filterType;
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.provider.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return (
          <div className="bg-purple-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        );
      case 'consultation':
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        );
      case 'test':
        return (
          <div className="bg-yellow-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
        );
      case 'medication':
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'referral':
        return (
          <div className="bg-orange-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        );
      case 'vaccination':
        return (
          <div className="bg-teal-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 p-2 rounded-full">
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        );
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'appointment': return 'Appointment';
      case 'consultation': return 'Consultation';
      case 'test': return 'Test Result';
      case 'medication': return 'Medication';
      case 'referral': return 'Referral';
      case 'vaccination': return 'Vaccination';
      default: return 'Record';
    }
  };

  const recordsContent = (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">GP Health Record</h2>
        <div className="text-sm text-gray-500">
          {isCheckingHospital ? (
            <div className="flex items-center">
              <div className="animate-spin h-4 w-4 border-2 border-[#005eb8] border-t-transparent rounded-full mr-2"></div>
              <span>Checking hospital registration...</span>
            </div>
          ) : hasPrimaryHospital && primaryHospital ? (
            <div className="text-green-700">
              <div>HPN Number: <span className="font-medium">{user?.hpn || "Not available"}</span></div>
              <div>Primary Hospital: <span className="font-medium">{primaryHospital.name}</span></div>
            </div>
          ) : (
            <div className="text-yellow-600">
              HPN Number not linked with a primary hospital. <Link to="/account/link-phb" className="text-[#005eb8] hover:underline">Link your HPN number to a hospital</Link>
            </div>
          )}
        </div>
      </div>

      {/* Show a warning if not registered with a hospital */}
      {!hasPrimaryHospital && !isCheckingHospital && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Hospital Registration Required</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  You need to link your HPN number to a primary hospital to access your complete health records. 
                  This allows healthcare providers to share your medical information securely.
                </p>
                <p className="mt-2">
                  <Link to="/account/link-phb" className="font-medium text-yellow-800 underline hover:text-yellow-600">
                    Register with a hospital now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and filters */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-1 max-w-md">
          <input
            type="search"
            placeholder="Search records..."
            className="px-4 py-2 border border-gray-300 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-[#005eb8]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-[#005eb8] text-white px-4 py-2 rounded-r-md hover:bg-[#003f7e]"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
              filterType === 'all' ? 'bg-[#005eb8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {['consultation', 'test', 'medication', 'vaccination', 'referral'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                filterType === type ? 'bg-[#005eb8] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getTypeLabel(type)}
            </button>
          ))}
        </div>
      </div>

      {/* Show limited access message if not linked with hospital */}
      {!hasPrimaryHospital && !isCheckingHospital && (
        <div className="bg-gray-50 p-4 rounded mb-6 text-gray-600 text-sm border border-gray-200">
          <p><strong>Note:</strong> You are viewing limited records only. Link your HPN number to a primary hospital to access your complete medical history.</p>
        </div>
      )}

      {/* Records list and detail view */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Records list */}
        <div className="lg:col-span-1 border rounded-md overflow-hidden h-[600px] flex flex-col">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-bold">Health Records</h3>
          </div>

          <div className="overflow-y-auto flex-grow">
            {filteredRecords.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <li
                    key={record.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedRecord?.id === record.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedRecord(record)}
                  >
                    <div className="flex items-start gap-3">
                      {getTypeIcon(record.type)}
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-[#005eb8] truncate">{record.title}</h4>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{formatDate(record.date)}</span>
                        </div>
                        <p className="text-sm text-gray-600 truncate">{record.summary}</p>
                        <p className="text-xs text-gray-500 mt-1">{record.provider}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center">
                <p className="text-gray-500">No records found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Record details */}
        <div className="lg:col-span-2 border rounded-md overflow-hidden h-[600px] flex flex-col">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <h3 className="font-bold">Record Details</h3>
          </div>

          <div className="overflow-y-auto flex-grow p-6">
            {selectedRecord ? (
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-800">{selectedRecord.title}</h2>
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {getTypeLabel(selectedRecord.type)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-medium">{formatDate(selectedRecord.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Provider</p>
                    <p className="font-medium">{selectedRecord.provider}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Summary</p>
                  <p className="p-3 bg-gray-50 rounded-md">{selectedRecord.summary}</p>
                </div>

                {selectedRecord.details && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Details</p>
                    <div className="p-3 bg-gray-50 rounded-md whitespace-pre-line">
                      {selectedRecord.details}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500">Select a record to view details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AccountHealthLayout>
      {recordsContent}
    </AccountHealthLayout>
  );
};

export default GPHealthRecord;
