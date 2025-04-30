import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Define proper types for our data
interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  isRepeat: boolean;
  lastIssued: string;
  issueFrequencyDays: number;
  quantityPerIssue: number;
  prescribedBy: {
    name: string;
    organization: string;
    type: 'GP' | 'Specialist' | 'Hospital'
  };
}

interface RequestPrescriptionResponse {
  success: boolean;
  requestId?: string;
  message?: string;
  estimatedReadyDate?: string;
  errors?: string[];
}

const RequestPrescriptionPage: React.FC = () => {
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [requestResponse, setRequestResponse] = useState<RequestPrescriptionResponse | null>(null);

  // Fetch medications from API
  useEffect(() => {
    const fetchMedications = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would be an API call
        // const response = await fetch('/api/prescriptions/repeatable');
        // const data = await response.json();
        // setMedications(data);

        // Mock data for now
        setTimeout(() => {
          setMedications([
            {
              id: '1',
              name: 'Amoxicillin',
              dosage: '500mg',
              instructions: 'Take one capsule three times a day with meals',
              isRepeat: true,
              lastIssued: '2025-03-15',
              issueFrequencyDays: 28,
              quantityPerIssue: 21,
              prescribedBy: {
                name: 'Dr. Sarah Johnson',
                organization: 'City Medical Practice',
                type: 'GP'
              }
            },
            {
              id: '2',
              name: 'Lisinopril',
              dosage: '10mg',
              instructions: 'Take one tablet daily in the morning',
              isRepeat: true,
              lastIssued: '2025-03-20',
              issueFrequencyDays: 56,
              quantityPerIssue: 56,
              prescribedBy: {
                name: 'Dr. Michael Chen',
                organization: 'Heart Institute',
                type: 'Specialist'
              }
            },
            {
              id: '3',
              name: 'Atorvastatin',
              dosage: '20mg',
              instructions: 'Take one tablet at night',
              isRepeat: true,
              lastIssued: '2025-03-10',
              issueFrequencyDays: 28,
              quantityPerIssue: 28,
              prescribedBy: {
                name: 'Dr. Sarah Johnson',
                organization: 'City Medical Practice',
                type: 'GP'
              }
            },
            {
              id: '4',
              name: 'Salbutamol Inhaler',
              dosage: '100mcg',
              instructions: 'Two puffs when required for breathlessness',
              isRepeat: true,
              lastIssued: '2025-02-28',
              issueFrequencyDays: 30,
              quantityPerIssue: 1,
              prescribedBy: {
                name: 'Dr. James Wilson',
                organization: 'Respiratory Department, Central Hospital',
                type: 'Hospital'
              }
            },
            {
              id: '5',
              name: 'Metformin',
              dosage: '500mg',
              instructions: 'Take one tablet twice daily with food',
              isRepeat: true,
              lastIssued: '2025-03-05',
              issueFrequencyDays: 28,
              quantityPerIssue: 56,
              prescribedBy: {
                name: 'Dr. Sarah Johnson',
                organization: 'City Medical Practice',
                type: 'GP'
              }
            },
          ]);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching medications:', error);
        setErrorMessage('Unable to load your medications. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchMedications();
  }, []);

  const handleMedicationToggle = (medicationId: string) => {
    setSelectedMedications(prev =>
      prev.includes(medicationId)
        ? prev.filter(id => id !== medicationId)
        : [...prev, medicationId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedMedications.length === 0) {
      setErrorMessage('Please select at least one medication');
      return;
    }

    setSubmitStatus('loading');
    setErrorMessage(null);

    try {
      // Prepare request payload
      const requestPayload = {
        medicationIds: selectedMedications,
        additionalInformation: additionalInfo,
        patientConsent: true,
        requestTimestamp: new Date().toISOString()
      };

      // In a real implementation, this would be an API call
      // const response = await fetch('/api/prescriptions/request', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer ' + authToken
      //   },
      //   body: JSON.stringify(requestPayload)
      // });
      // const data = await response.json();

      // Mock response for now
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockResponse: RequestPrescriptionResponse = {
        success: true,
        requestId: 'REQ-' + Math.floor(Math.random() * 10000000),
        message: 'Your prescription request has been submitted successfully',
        estimatedReadyDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 2 days from now
      };

      setRequestResponse(mockResponse);
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting prescription request:', error);
      setErrorMessage('There was a problem submitting your request. Please try again later.');
      setSubmitStatus('error');
    }
  };

  // Reset form after success
  const handleNewRequest = () => {
    setSelectedMedications([]);
    setAdditionalInfo('');
    setSubmitStatus('idle');
    setRequestResponse(null);
  };

  const getReadyDateMessage = () => {
    if (!requestResponse?.estimatedReadyDate) return '';

    // Format date to be more reader-friendly
    const date = new Date(requestResponse.estimatedReadyDate);
    const formattedDate = date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `Your prescription should be ready for collection by ${formattedDate}.`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <Link to="/account" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">
                  Account
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2">Request Prescription</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Request a repeat prescription</h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-800">
              Your prescription will be sent electronically to your <Link to="/account/nominated-pharmacy" className="font-medium underline">nominated pharmacy</Link>. You can collect it from there.
            </p>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">
                {errorMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      {submitStatus === 'success' ? (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Success</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>{requestResponse?.message}</p>
                    {requestResponse?.requestId && (
                      <p className="mt-1">Request reference: {requestResponse.requestId}</p>
                    )}
                    {requestResponse?.estimatedReadyDate && (
                      <p className="mt-1">{getReadyDateMessage()}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">What happens next?</h3>
              <ol className="text-sm text-gray-600 space-y-2 mb-6 text-left list-decimal list-inside">
                <li>Your request will be reviewed by a healthcare professional at your GP practice</li>
                <li>Once approved, your prescription will be sent to your nominated pharmacy</li>
                <li>You'll receive a notification when your prescription is ready for collection</li>
                <li>Collect your medication from your nominated pharmacy</li>
              </ol>

              <button
                type="button"
                onClick={handleNewRequest}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Request another prescription
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Select medications to request</h3>

              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                <div className="border rounded-md divide-y">
                  {medications.map(medication => (
                    <div key={medication.id} className="p-4 flex items-start">
                      <div className="pt-1">
                        <input
                          type="checkbox"
                          id={`med-${medication.id}`}
                          checked={selectedMedications.includes(medication.id)}
                          onChange={() => handleMedicationToggle(medication.id)}
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                      <label htmlFor={`med-${medication.id}`} className="ml-3 flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                          <div>
                            <span className="block text-sm font-medium text-gray-900">
                              {medication.name} {medication.dosage}
                            </span>
                            <span className="block text-sm text-gray-500 mt-1">
                              {medication.instructions}
                            </span>
                          </div>
                          <div className="mt-2 sm:mt-0 sm:ml-4 text-sm text-gray-500">
                            <span className="block">Last issued: {new Date(medication.lastIssued).toLocaleDateString()}</span>
                            <span className="block mt-1">Prescribed by: {medication.prescribedBy.name}</span>
                            <span className="block mt-1">
                              {medication.prescribedBy.type === 'GP' ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  GP Practice
                                </span>
                              ) : medication.prescribedBy.type === 'Specialist' ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                  Specialist
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Hospital
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional information (optional)
                </label>
                <textarea
                  id="additionalInfo"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={3}
                  className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Any special instructions or notes for your GP"
                ></textarea>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                disabled={submitStatus === 'loading' || isLoading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitStatus === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Submit request'
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Need help?</h2>
        <ul className="space-y-2 text-blue-600">
          <li>
            <Link to="/help/prescriptions/how-to-request" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              How to request prescriptions online
            </Link>
          </li>
          <li>
            <Link to="/help/prescriptions/urgent-requests" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              What to do for urgent medicine needs
            </Link>
          </li>
          <li>
            <Link to="/account/nominated-pharmacy" className="inline-flex items-center hover:underline">
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Change or set your nominated pharmacy
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RequestPrescriptionPage;
