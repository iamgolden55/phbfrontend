import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  Shield, 
  CheckCircle, 
  Eye, 
  Share2, 
  Trash2, 
  Plus,
  X
} from 'lucide-react';
import { createApiUrl } from '../../utils/config';
import MedicalOTPAccess from '../../components/MedicalOTPAccess';

interface Document {
  id: string;
  name: string;
  type: 'lab-results' | 'prescriptions' | 'clinical-letters' | 'discharge-summaries' | 'other';
  size: string;
  date: string;
  source: string;
  uploadDate: string;
  isSecure?: boolean;
}

const HealthRecordsPage: React.FC = () => {
  // ALL HOOKS DECLARED FIRST
  const [hasAccess, setHasAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const recordsPerPage = 7;

  // FUNCTIONS
  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      
      const token = localStorage.getItem('phb_auth_token') ||  // Real PHB token first!
                   localStorage.getItem('access_token') || 
                   localStorage.getItem('authToken') ||
                   localStorage.getItem('med_access_token');  // Mock token last

      const response = await fetch(createApiUrl('api/secure/files/'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      const result = await response.json();
      
      if (result.success && result.data && result.data.files) {
        const backendFiles = result.data.files.map((file: any) => ({
          id: file.file_id,
          name: file.display_name || `Medical Document ${file.file_id.substring(0, 8)}${file.original_extension}`,
          type: 'other' as const,
          size: file.size_display || `${Math.round(file.size / 1024)} KB`,
          date: new Date(file.created_at).toISOString().split('T')[0],
          source: 'Secure Upload',
          uploadDate: file.created_at,
          isSecure: true
        }));
        
        setDocuments(backendFiles);
      } else {
        setDocuments([]);
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;
    
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('files', file);
      });

      const token = localStorage.getItem('phb_auth_token') ||  // Real PHB token first!
                   localStorage.getItem('access_token') || 
                   localStorage.getItem('authToken') ||
                   localStorage.getItem('med_access_token');  // Mock token last

      const phases = [
        { progress: 25, message: 'Validating files...' },
        { progress: 50, message: 'Scanning for security...' },
        { progress: 75, message: 'Encrypting your documents...' },
        { progress: 100, message: 'Upload complete!' }
      ];

      for (const phase of phases) {
        setUploadProgress(phase.progress);
        await new Promise(resolve => setTimeout(resolve, 400));
      }

      const response = await fetch(createApiUrl('api/secure/upload/'), {
        method: 'POST',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: formData,
      });

      const result = await response.json();

      if (result.success && result.successful_uploads > 0) {
        await fetchDocuments();
        alert(`Successfully uploaded ${result.successful_uploads} file(s) securely!`);
      } else {
        alert(`Upload failed: ${result.error || 'Unknown error'}`);
      }

    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setShowUploadForm(false);
      setUploadProgress(0);
    }
  };

  const getDocumentTypeColor = (type: string) => {
    const colors = {
      'lab-results': 'bg-purple-100 text-purple-800 border-purple-200',
      'prescriptions': 'bg-green-100 text-green-800 border-green-200',
      'clinical-letters': 'bg-blue-100 text-blue-800 border-blue-200',
      'discharge-summaries': 'bg-orange-100 text-orange-800 border-orange-200',
      'other': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  const getDocumentTypeIcon = (type: string) => {
    const icons = {
      'lab-results': '🧪',
      'prescriptions': '💊',
      'clinical-letters': '📋',
      'discharge-summaries': '🏥',
      'other': '📄'
    };
    return icons[type as keyof typeof icons] || icons.other;
  };

  const getDocumentTypeName = (type: string) => {
    const names = {
      'lab-results': 'Lab Results',
      'prescriptions': 'Prescriptions',
      'clinical-letters': 'Clinical Letters',
      'discharge-summaries': 'Discharge Summary',
      'other': 'Other'
    };
    return names[type as keyof typeof names] || names.other;
  };

  const deleteDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  // EFFECTS
  useEffect(() => {
    const checkMedicalAccess = () => {
      const medToken = localStorage.getItem('med_access_token');
      const expiryTime = localStorage.getItem('med_access_expiry');
      
      console.log('🔐 Checking access:', { medToken: medToken ? 'Found' : 'Not found', expiryTime });
      
      if (medToken && expiryTime) {
        const now = Date.now();
        if (now < parseInt(expiryTime)) {
          console.log('✅ Access granted - token valid');
          setHasAccess(true);
        } else {
          console.log('❌ Token expired');
          localStorage.removeItem('med_access_token');
          localStorage.removeItem('med_access_expiry');
          setHasAccess(false);
        }
      } else {
        console.log('❌ No med_access_token found');
        setHasAccess(false);
      }
      
      setCheckingAccess(false);
    };

    checkMedicalAccess();
  }, []);

  useEffect(() => {
    if (hasAccess && !checkingAccess) {
      fetchDocuments();
    }
  }, [hasAccess, checkingAccess]);
  
  // Reset to first page when search term changes or documents are filtered
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  const handleAccessGranted = () => {
    setHasAccess(true);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesFilter = activeFilter === 'all' || doc.type === activeFilter;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.source.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  // Get current records for pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredDocuments.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredDocuments.length / recordsPerPage);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // EARLY RETURNS
  if (checkingAccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return <MedicalOTPAccess onAccessGranted={handleAccessGranted} />;
  }

  // MAIN RENDER
  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
            Your Health Records
          </h1>
          <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
            Your medical documents are safe and secure
          </p>
        </div>

        {showUploadForm && (
          <div className="mb-6 md:mb-8 p-4 md:p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Upload Your Documents</h3>
              <button onClick={() => setShowUploadForm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5 md:h-6 md:w-6" />
              </button>
            </div>
            
            {!isUploading ? (
              <div className="border-2 border-dashed border-blue-300 rounded-xl p-6 md:p-8 text-center bg-blue-50">
                <div className="flex flex-col items-center space-y-3 md:space-y-4">
                  <Upload className="h-10 w-10 md:h-12 md:w-12 text-blue-600" />
                  <div>
                    <h4 className="text-base md:text-lg font-medium text-gray-900 mb-1 md:mb-2">
                      Drag your files here or click to browse
                    </h4>
                    <p className="text-gray-600 text-sm md:text-base">
                      PDF, images, and documents are supported
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="file-upload"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  />
                  <label
                    htmlFor="file-upload"
                    className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium cursor-pointer flex items-center text-sm md:text-base"
                  >
                    <Upload className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    Choose Files
                  </label>
                </div>
              </div>
            ) : (
              <div className="p-4 md:p-6 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 text-sm md:text-base">Uploading your file...</span>
                  <span className="text-blue-600 font-medium text-sm md:text-base">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs md:text-sm text-gray-600 mt-2">
                  {uploadProgress < 25 ? 'Validating files...' : 
                   uploadProgress < 50 ? 'Scanning for security...' : 
                   uploadProgress < 75 ? 'Encrypting your documents...' :
                   'Upload complete!'}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mb-6 md:mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:space-x-4">
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="w-full md:w-auto px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center text-sm md:text-base"
            >
              <Plus className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Upload Document
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search your documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 pl-9 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
            />
            <Search className="absolute left-3 top-2.5 md:top-3.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              Your Documents
              <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {filteredDocuments.length} files
              </span>
              <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
                Page {currentPage} of {totalPages || 1}
              </span>
            </h2>
          </div>

          {isLoading ? (
            <div className="p-8 md:p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-blue-600 mx-auto mb-3 md:mb-4"></div>
              <p className="text-lg md:text-xl font-medium text-gray-900 mb-2">Loading your documents...</p>
              <p className="text-gray-600 text-sm md:text-base">Fetching your secure medical files</p>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="p-8 md:p-12 text-center">
              <FileText className="h-12 w-12 md:h-16 md:w-16 text-gray-400 mx-auto mb-3 md:mb-4" />
              <p className="text-lg md:text-xl font-medium text-gray-900 mb-2">No documents found</p>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">Upload your first medical document to get started</p>
              <button
                onClick={() => setShowUploadForm(true)}
                className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center mx-auto text-sm md:text-base"
              >
                <Upload className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                Upload Document
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 md:px-6 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Document
                    </th>
                    <th className="px-3 py-3 md:px-6 md:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentRecords.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3 md:px-6 md:py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-lg bg-blue-100">
                            <FileText className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                          </div>
                          <div className="ml-3 md:ml-4">
                            <div className="text-sm font-medium text-gray-900 flex items-center">
                              {doc.name}
                              {doc.isSecure && (
                                <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-500 ml-2" />
                              )}
                            </div>
                            <div className="text-xs md:text-sm text-gray-500">{doc.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 md:px-6 md:py-4">
                        <div className="flex items-center space-x-2 md:space-x-3">
                          <button className="text-blue-600 hover:text-blue-900 font-medium text-xs md:text-sm">
                            <Eye className="h-3 w-3 md:h-4 md:w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 font-medium text-xs md:text-sm">
                            <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                          </button>
                          <button
                            onClick={() => deleteDocument(doc.id)}
                            className="text-red-600 hover:text-red-900 font-medium text-xs md:text-sm"
                          >
                            <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredDocuments.length > recordsPerPage && (
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstRecord + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(indexOfLastRecord, filteredDocuments.length)}</span> of{' '}
                    <span className="font-medium">{filteredDocuments.length}</span> results
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 border rounded-md text-sm font-medium ${
                        currentPage === 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`px-3 py-1 border rounded-md text-sm font-medium ${
                          currentPage === i + 1
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={nextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 border rounded-md text-sm font-medium ${
                        currentPage === totalPages
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 md:mt-6 p-3 md:p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
              <span className="font-medium text-green-800 text-sm md:text-base">Your documents are secure and private</span>
            </div>
            <div className="text-xs md:text-sm text-green-700">
              Last checked: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecordsPage;
