import React, { useState, useEffect } from 'react';
import { useAuth } from '../../features/auth/authContext';
import { Navigate } from 'react-router-dom';
import MedicalRecordsOTP from '../../features/health/MedicalRecordsOTP';
import { 
  isMedAccessTokenValid, 
  clearMedAccessToken 
} from '../../features/health/medicalRecordsAuthService';

interface HealthDocument {
  id: string;
  name: string;
  type: 'lab_result' | 'prescription' | 'clinical_letter' | 'discharge_summary' | 'other';
  date: string;
  source: string;
  size: string;
  uploadDate: string;
}

const sampleDocuments: HealthDocument[] = [
  {
    id: '1',
    name: 'Blood Test Results.pdf',
    type: 'lab_result',
    date: '2025-02-15',
    source: 'City General Hospital',
    size: '545 KB',
    uploadDate: '2025-02-20'
  },
  {
    id: '2',
    name: 'Prescription - Amoxicillin.pdf',
    type: 'prescription',
    date: '2025-01-10',
    source: 'Dr. Sarah Johnson',
    size: '212 KB',
    uploadDate: '2025-01-10'
  },
  {
    id: '3',
    name: 'Hospital Discharge Summary.pdf',
    type: 'discharge_summary',
    date: '2024-11-28',
    source: 'Royal Medical Center',
    size: '1.2 MB',
    uploadDate: '2024-12-01'
  }
];

const HealthRecordsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [documents, setDocuments] = useState<HealthDocument[]>(sampleDocuments);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newDocument, setNewDocument] = useState({
    name: '',
    type: 'other' as HealthDocument['type'],
    date: '',
    source: '',
  });
  
  // Add new state for medical record access
  const [accessState, setAccessState] = useState<'checking' | 'need_auth' | 'loading' | 'authorized' | 'error'>('checking');
  const [accessError, setAccessError] = useState<string>('');
  const [accessExpiry, setAccessExpiry] = useState<Date | null>(null);

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = () => {
    setAccessState('checking');
    
    // Check if we have a valid med access token
    if (isMedAccessTokenValid()) {
      // We have a valid token, we can show the health records
      setAccessState('authorized');
      
      // Set expiry time for UI display
      const expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 30); // Assuming 30 min expiry
      setAccessExpiry(expiryTime);
    } else {
      // We need to request authentication
      setAccessState('need_auth');
    }
  };

  const handleVerificationSuccess = () => {
    setAccessState('authorized');
    // Set expiry time for UI display
    const expiryTime = new Date();
    expiryTime.setMinutes(expiryTime.getMinutes() + 30);
    setAccessExpiry(expiryTime);
  };

  const handleCancelVerification = () => {
    // Just show a message instead of the verification form
    setAccessState('need_auth');
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render different content based on access state
  if (accessState === 'checking') {
    return (
      <div className="bg-white">
        <div className="bg-[#005eb8] text-white py-8">
          <div className="phb-container">
            <h1 className="text-3xl font-bold mb-4">Health Records</h1>
            <p className="text-xl font-medium">
              Manage and access your health documents
            </p>
          </div>
        </div>
        <div className="phb-container py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-8 w-8 border-4 border-[#005eb8] border-t-transparent rounded-full"></div>
            <span className="ml-3 text-gray-600">Checking access...</span>
          </div>
        </div>
      </div>
    );
  }

  if (accessState === 'need_auth') {
    return (
      <div className="bg-white">
        <div className="bg-[#005eb8] text-white py-8">
          <div className="phb-container">
            <h1 className="text-3xl font-bold mb-4">Health Records</h1>
            <p className="text-xl font-medium">
              Manage and access your health documents
            </p>
          </div>
        </div>
        <div className="phb-container py-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Secure Access Required</h2>
            
            <div className="p-4 bg-blue-50 rounded-md mb-6">
              <p className="text-blue-800">
                Health records contain sensitive information and require additional verification.
              </p>
            </div>
            
            <p className="mb-6">
              To protect your privacy, we need to verify your identity before showing your health records.
              Click the button below to proceed with verification.
            </p>
            
            <button
              onClick={() => setAccessState('loading')}
              className="px-4 py-2 bg-[#005eb8] text-white rounded-md hover:bg-[#003f7e]"
            >
              Request Secure Access
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (accessState === 'loading') {
    return (
      <div className="bg-white">
        <div className="bg-[#005eb8] text-white py-8">
          <div className="phb-container">
            <h1 className="text-3xl font-bold mb-4">Health Records</h1>
            <p className="text-xl font-medium">
              Manage and access your health documents
            </p>
          </div>
        </div>
        <div className="phb-container py-8">
          <MedicalRecordsOTP 
            onVerificationSuccess={handleVerificationSuccess} 
            onCancel={handleCancelVerification} 
          />
        </div>
      </div>
    );
  }

  if (accessState === 'error') {
    return (
      <div className="bg-white">
        <div className="bg-[#005eb8] text-white py-8">
          <div className="phb-container">
            <h1 className="text-3xl font-bold mb-4">Health Records</h1>
            <p className="text-xl font-medium">
              Manage and access your health documents
            </p>
          </div>
        </div>
        <div className="phb-container py-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Access Error</h2>
            
            <div className="p-4 bg-red-50 rounded-md mb-6 text-red-700">
              {accessError || 'An error occurred while accessing your health records.'}
            </div>
            
            <button
              onClick={checkAccess}
              className="px-4 py-2 bg-[#005eb8] text-white rounded-md hover:bg-[#003f7e]"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setNewDocument({
        ...newDocument,
        name: file.name
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDocument({
      ...newDocument,
      [name]: value
    });
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      // Show error message about missing file
      return;
    }

    // Create new document object
    const newDoc: HealthDocument = {
      id: Date.now().toString(),
      name: newDocument.name,
      type: newDocument.type,
      date: newDocument.date,
      source: newDocument.source,
      size: `${Math.round(selectedFile.size / 1024)} KB`,
      uploadDate: new Date().toISOString().split('T')[0]
    };

    // Add document to list
    setDocuments([...documents, newDoc]);

    // Reset form
    setSelectedFile(null);
    setNewDocument({
      name: '',
      type: 'other',
      date: '',
      source: '',
    });
    setShowUploadForm(false);
  };

  const deleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  // Filter documents by type and search term
  const filteredDocuments = documents.filter(doc => {
    const matchesFilter = activeFilter === 'all' || doc.type === activeFilter;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Functions to get icon and color for document type
  const getDocumentTypeIcon = (type: HealthDocument['type']) => {
    switch (type) {
      case 'lab_result':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'prescription':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'clinical_letter':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'discharge_summary':
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      default:
        return (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const getDocumentTypeColor = (type: HealthDocument['type']) => {
    switch (type) {
      case 'lab_result':
        return 'text-purple-600 bg-purple-100';
      case 'prescription':
        return 'text-blue-600 bg-blue-100';
      case 'clinical_letter':
        return 'text-green-600 bg-green-100';
      case 'discharge_summary':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getDocumentTypeName = (type: HealthDocument['type']) => {
    switch (type) {
      case 'lab_result':
        return 'Lab Result';
      case 'prescription':
        return 'Prescription';
      case 'clinical_letter':
        return 'Clinical Letter';
      case 'discharge_summary':
        return 'Discharge Summary';
      default:
        return 'Other Document';
    }
  };

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Health Records</h1>
          <p className="text-xl font-medium">
            Manage and access your health documents
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold">Your Documents</h2>
            <p className="text-gray-600">Upload and manage your health-related documents</p>
          </div>
          <div className="flex items-center">
            {accessExpiry && (
              <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mr-4">
                Access expires: {accessExpiry.toLocaleTimeString()}
              </div>
            )}
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="bg-[#005eb8] hover:bg-[#003f7e] text-white px-4 py-2 rounded-md transition-colors"
            >
              {showUploadForm ? 'Cancel' : '+ Upload Document'}
            </button>
          </div>
        </div>

        {showUploadForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Upload Health Document</h3>
            <form onSubmit={handleUpload}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="file" className="block text-gray-700 font-medium mb-2">
                    Document File *
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG
                  </p>
                </div>

                <div>
                  <label htmlFor="type" className="block text-gray-700 font-medium mb-2">
                    Document Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={newDocument.type}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="lab_result">Lab Result</option>
                    <option value="prescription">Prescription</option>
                    <option value="clinical_letter">Clinical Letter</option>
                    <option value="discharge_summary">Discharge Summary</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                    Document Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newDocument.date}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="source" className="block text-gray-700 font-medium mb-2">
                    Source / Provider
                  </label>
                  <input
                    type="text"
                    id="source"
                    name="source"
                    value={newDocument.source}
                    onChange={handleInputChange}
                    placeholder="Hospital, doctor, or clinic name"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#005eb8] hover:bg-[#003f7e] text-white px-6 py-2 rounded-md transition-colors"
                  disabled={!selectedFile}
                >
                  Upload Document
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('lab_result')}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeFilter === 'lab_result'
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 hover:bg-purple-200 text-purple-800'
                }`}
              >
                Lab Results
              </button>
              <button
                onClick={() => setActiveFilter('prescription')}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeFilter === 'prescription'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                }`}
              >
                Prescriptions
              </button>
              <button
                onClick={() => setActiveFilter('clinical_letter')}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeFilter === 'clinical_letter'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 hover:bg-green-200 text-green-800'
                }`}
              >
                Clinical Letters
              </button>
              <button
                onClick={() => setActiveFilter('discharge_summary')}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeFilter === 'discharge_summary'
                    ? 'bg-red-600 text-white'
                    : 'bg-red-100 hover:bg-red-200 text-red-800'
                }`}
              >
                Discharge Summaries
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {filteredDocuments.length === 0 ? (
            <div className="bg-gray-50 p-8 text-center rounded-md">
              <p className="text-gray-600 mb-4">No documents found.</p>
              <button
                onClick={() => {
                  setShowUploadForm(true);
                  setActiveFilter('all');
                  setSearchTerm('');
                }}
                className="text-[#005eb8] hover:underline"
              >
                Upload your first document
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocuments.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md border border-gray-200">
                            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                            <div className="text-sm text-gray-500">
                              Uploaded: {new Date(doc.uploadDate).toLocaleDateString()} • {doc.size}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDocumentTypeColor(doc.type)}`}>
                          <span className="mr-1">
                            {getDocumentTypeIcon(doc.type)}
                          </span>
                          {getDocumentTypeName(doc.type)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(doc.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.source}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          View
                        </button>
                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                          Share
                        </button>
                        <button
                          onClick={() => deleteDocument(doc.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthRecordsPage;
