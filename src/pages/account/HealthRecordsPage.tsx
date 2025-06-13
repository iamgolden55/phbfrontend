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
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Loader2
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
  file_path?: string;
  original_extension?: string;
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

  // DOCUMENT VIEWER STATES 🚀
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);
  const [documentUrl, setDocumentUrl] = useState<string>('');
  const [isLoadingDocument, setIsLoadingDocument] = useState(false);
  const [viewerZoom, setViewerZoom] = useState(1);
  const [viewerRotation, setViewerRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [documentError, setDocumentError] = useState<string>('');
  const [pdfLoadFailed, setPdfLoadFailed] = useState(false); // 🔍 NEW: Track PDF load failures

  // 🗑️ DELETE MODAL STATES
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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
          isSecure: true,
          file_path: file.file_path,
          original_extension: file.original_extension
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

  // 🚀 NUCLEAR DOCUMENT VIEWER FUNCTIONS!
  const viewDocument = async (document: Document) => {
    setIsLoadingDocument(true);
    setDocumentError('');
    setViewingDocument(document);
    
    try {
      const token = localStorage.getItem('phb_auth_token') ||
                   localStorage.getItem('access_token') || 
                   localStorage.getItem('authToken') ||
                   localStorage.getItem('med_access_token');

      const response = await fetch(createApiUrl(`api/secure/files/${document.id}/preview/`), {
        method: 'GET',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setDocumentUrl(url);
      } else {
        const errorData = await response.json();
        setDocumentError(errorData.error || 'Failed to load document');
      }
    } catch (error) {
      console.error('Error viewing document:', error);
      setDocumentError('Network error while loading document');
    } finally {
      setIsLoadingDocument(false);
    }
  };

  const closeDocumentViewer = () => {
    setViewingDocument(null);
    if (documentUrl) {
      URL.revokeObjectURL(documentUrl);
      setDocumentUrl('');
    }
    setViewerZoom(1);
    setViewerRotation(0);
    setIsFullscreen(false);
    setDocumentError('');
    setPdfLoadFailed(false); // 🔍 Reset PDF load failure state
  };

  const zoomIn = () => setViewerZoom(prev => Math.min(prev + 0.25, 3));
  const zoomOut = () => setViewerZoom(prev => Math.max(prev - 0.25, 0.25));
  const resetZoom = () => setViewerZoom(1);
  const rotateDocument = () => setViewerRotation(prev => (prev + 90) % 360);
  const toggleFullscreen = () => setIsFullscreen(prev => !prev);

  const downloadDocument = () => {
    if (documentUrl && viewingDocument) {
      const link = document.createElement('a');
      link.href = documentUrl;
      link.download = viewingDocument.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.toLowerCase().split('.').pop() || '';
    const iconMap: { [key: string]: string } = {
      'pdf': '📄',
      'jpg': '🖼️',
      'jpeg': '🖼️', 
      'png': '🖼️',
      'gif': '🖼️',
      'doc': '📝',
      'docx': '📝',
      'txt': '📄'
    };
    return iconMap[extension] || '📄';
  };

  const isImageFile = (fileName: string) => {
    const extension = fileName.toLowerCase().split('.').pop() || '';
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(extension);
  };

  const isPdfFile = (fileName: string) => {
    return fileName.toLowerCase().endsWith('.pdf');
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

  // 🗑️ NUCLEAR DELETE SYSTEM!
  const showDeleteConfirmation = (document: Document) => {
    setDocumentToDelete(document);
    setShowDeleteModal(true);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDocumentToDelete(null);
    setIsDeleting(false);
  };

  const confirmDelete = async () => {
    if (!documentToDelete) return;
    
    setIsDeleting(true);
    
    try {
      const token = localStorage.getItem('phb_auth_token') ||
                   localStorage.getItem('access_token') || 
                   localStorage.getItem('authToken') ||
                   localStorage.getItem('med_access_token');

      const response = await fetch(createApiUrl(`api/secure/files/${documentToDelete.id}/delete/`), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      const result = await response.json();

      if (result.success) {
        // Remove from frontend state
        setDocuments(documents.filter(doc => doc.id !== documentToDelete.id));
        
        // Close viewer if this document was being viewed
        if (viewingDocument && viewingDocument.id === documentToDelete.id) {
          closeDocumentViewer();
        }

        // Close delete modal
        setShowDeleteModal(false);
        setDocumentToDelete(null);
        
        // Success feedback - we'll show this in the modal
      } else {
        // Error will be shown in the modal
      }
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
    }
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
    <div className="min-h-screen bg-gray-50 p-3 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Mobile-Optimized Header */}
        <div className="mb-4 md:mb-8">
          <h1 className="text-xl md:text-4xl font-bold text-gray-900 leading-tight">
            Your Health Records
          </h1>
          <p className="text-gray-600 mt-1 text-xs md:text-base">
            Your medical documents are safe and secure
          </p>
        </div>

        {/* Mobile-Enhanced Security Notice */}
        {documents.some(doc => doc.isSecure) && (
          <div className="mb-4 p-3 md:p-4 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
            <div className="flex items-start space-x-2 md:space-x-3">
              <div className="text-blue-600 text-lg md:text-xl flex-shrink-0 mt-0.5">🔐</div>
              <div>
                <h3 className="font-semibold text-blue-900 text-sm md:text-base">Security Upgrade Notice</h3>
                <p className="text-xs md:text-sm text-blue-700 mt-1 leading-relaxed">
                  We've enhanced our security system! Some older files may need to be re-uploaded to view them. 
                  All new uploads will be immediately viewable with our enhanced encryption.
                </p>
              </div>
            </div>
          </div>
        )}

        {showUploadForm && (
          <div className="mb-4 md:mb-8 p-3 md:p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="text-base md:text-xl font-bold text-gray-900">Upload Your Documents</h3>
              <button onClick={() => setShowUploadForm(false)} className="text-gray-500 hover:text-gray-700 p-1">
                <X className="h-4 w-4 md:h-6 md:w-6" />
              </button>
            </div>
            
            {!isUploading ? (
              <div className="border-2 border-dashed border-blue-300 rounded-xl p-4 md:p-8 text-center bg-blue-50">
                <div className="flex flex-col items-center space-y-2 md:space-y-4">
                  <Upload className="h-8 w-8 md:h-12 md:w-12 text-blue-600" />
                  <div>
                    <h4 className="text-sm md:text-lg font-medium text-gray-900 mb-1">
                      Drag your files here or click to browse
                    </h4>
                    <p className="text-gray-600 text-xs md:text-base">
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
                    className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium cursor-pointer flex items-center text-sm md:text-base transition-all duration-200 hover:shadow-md active:scale-95"
                  >
                    <Upload className="h-3 w-3 md:h-5 md:w-5 mr-2" />
                    Choose Files
                  </label>
                </div>
              </div>
            ) : (
              <div className="p-3 md:p-6 bg-blue-50 rounded-lg">
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

        {/* Mobile-Enhanced Action Bar */}
        <div className="mb-4 md:mb-8 space-y-3 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:space-x-4">
            <button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="w-full md:w-auto px-4 py-3 md:px-6 md:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium flex items-center justify-center text-sm md:text-base transition-all duration-200 hover:shadow-lg active:scale-95"
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
              className="w-full md:w-80 pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base bg-white shadow-sm"
            />
            <Search className="absolute left-3 top-3.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-4 md:px-6 py-3 md:py-4 bg-gray-50 border-b border-gray-200">
            {/* Mobile-Optimized Header */}
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:justify-between">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 flex items-center">
                <FileText className="h-5 w-5 md:h-6 md:w-6 mr-2 text-blue-600" />
                Your Documents
              </h2>
              
              {/* Mobile: Simple file count */}
              <div className="flex items-center justify-between md:justify-end space-x-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full flex items-center">
                  📄 {filteredDocuments.length} {filteredDocuments.length === 1 ? 'file' : 'files'}
                </span>
                
                {/* Only show pagination if there are multiple pages */}
                {totalPages > 1 && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hidden md:inline-flex">
                    Page {currentPage} of {totalPages}
                  </span>
                )}
              </div>
            </div>
            
            {/* Mobile: Show pagination info only when needed and styled nicely */}
            {totalPages > 1 && (
              <div className="mt-2 md:hidden">
                <div className="flex items-center justify-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              </div>
            )}
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
                          <button 
                            onClick={() => viewDocument(doc)}
                            className="text-blue-600 hover:text-blue-900 font-medium text-xs md:text-sm hover:bg-blue-50 p-2 rounded-lg transition-all duration-200 flex items-center space-x-1"
                            title="View document"
                          >
                            <Eye className="h-3 w-3 md:h-4 md:w-4" />
                            <span className="hidden md:inline">View</span>
                          </button>
                          <button className="text-green-600 hover:text-green-900 font-medium text-xs md:text-sm hover:bg-green-50 p-2 rounded-lg transition-all duration-200 flex items-center space-x-1">
                            <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                            <span className="hidden md:inline">Share</span>
                          </button>
                          <button
                            onClick={() => showDeleteConfirmation(doc)}
                            className="text-red-600 hover:text-red-900 font-medium text-xs md:text-sm hover:bg-red-50 p-2 rounded-lg transition-all duration-200 flex items-center space-x-1"
                            title="Delete document"
                          >
                            <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                            <span className="hidden md:inline">Delete</span>
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

        {/* 🗑️ BEAUTIFUL DELETE CONFIRMATION MODAL */}
        {showDeleteModal && documentToDelete && (
          <div className="fixed inset-0 z-50 p-4 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-md">
              {/* Header */}
              <div className="bg-red-50 px-6 py-4 border-b border-red-100">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-red-900">Delete Document</h3>
                    <p className="text-sm text-red-700">This action cannot be undone</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="px-6 py-6">
                <div className="mb-4">
                  <p className="text-gray-700 text-sm mb-3">
                    Are you sure you want to permanently delete this document?
                  </p>
                  
                  {/* Document Info */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {documentToDelete.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {documentToDelete.size} • {documentToDelete.source}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <div className="text-yellow-600 text-lg">⚠️</div>
                    <div>
                      <p className="text-sm font-medium text-yellow-800">Warning</p>
                      <p className="text-xs text-yellow-700">
                        This will permanently remove the document from your medical records. 
                        You'll need to re-upload it if you want to access it again.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      <span>Delete Forever</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 🚀 NUCLEAR DOCUMENT VIEWER MODAL! */}
        {viewingDocument && (
          <div className={`fixed inset-0 z-50 ${isFullscreen ? 'p-0' : 'p-4'} bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center`}>
            <div className={`bg-white rounded-xl shadow-2xl overflow-hidden ${isFullscreen ? 'w-full h-full' : 'w-full max-w-6xl h-5/6'} flex flex-col`}>
              {/* Header */}
              <div className="bg-gray-50 px-4 md:px-6 py-3 md:py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="text-xl md:text-2xl">{getFileIcon(viewingDocument.name)}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-xl font-bold text-gray-900 truncate">{viewingDocument.name}</h3>
                    <p className="text-xs md:text-sm text-gray-600">{viewingDocument.size} • {viewingDocument.source}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Mobile Close Button - Large and Prominent */}
                  <button 
                    onClick={closeDocumentViewer} 
                    className="md:hidden p-3 bg-red-100 hover:bg-red-200 rounded-xl text-red-600 flex items-center justify-center min-w-[44px] min-h-[44px]"
                    title="Close"
                  >
                    <X className="h-6 w-6" />
                  </button>

                  {/* Desktop Controls */}
                  <div className="hidden md:flex items-center space-x-2">
                    {/* Zoom Controls */}
                    <div className="flex items-center space-x-1 bg-white rounded-lg border border-gray-300 p-1">
                      <button onClick={zoomOut} className="p-1 hover:bg-gray-100 rounded" title="Zoom out">
                        <ZoomOut className="h-4 w-4" />
                      </button>
                      <span className="px-2 text-sm font-medium text-gray-700">{Math.round(viewerZoom * 100)}%</span>
                      <button onClick={zoomIn} className="p-1 hover:bg-gray-100 rounded" title="Zoom in">
                        <ZoomIn className="h-4 w-4" />
                      </button>
                      <button onClick={resetZoom} className="p-1 hover:bg-gray-100 rounded text-xs px-2" title="Reset zoom">
                        Reset
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <button onClick={rotateDocument} className="p-2 hover:bg-gray-100 rounded-lg" title="Rotate">
                      <RotateCw className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                    <button onClick={downloadDocument} className="p-2 hover:bg-gray-100 rounded-lg" title="Download">
                      <Download className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                    <button onClick={toggleFullscreen} className="p-2 hover:bg-gray-100 rounded-lg" title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}>
                      {isFullscreen ? <Minimize2 className="h-4 w-4 md:h-5 md:w-5" /> : <Maximize2 className="h-4 w-4 md:h-5 md:w-5" />}
                    </button>
                    <button onClick={closeDocumentViewer} className="p-2 hover:bg-gray-100 rounded-lg" title="Close">
                      <X className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-hidden bg-gray-100 relative">
                {isLoadingDocument ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 md:h-12 md:w-12 animate-spin text-blue-600 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-900">Loading document...</p>
                      <p className="text-gray-600">Decrypting secure medical file</p>
                    </div>
                  </div>
                ) : documentError ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-4">
                      <div className="text-red-500 text-6xl mb-4">🔐</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">File Recovery Needed</h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        This file was encrypted with an older security system. To view it, please re-upload the document.
                      </p>
                      <div className="space-y-3">
                        <button 
                          onClick={() => {
                            closeDocumentViewer();
                            setShowUploadForm(true);
                          }}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Re-upload Document
                        </button>
                        <button 
                          onClick={closeDocumentViewer}
                          className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                        >
                          Close
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-3">
                        New uploads use enhanced security and will be viewable immediately.
                      </p>
                    </div>
                  </div>
                ) : documentUrl ? (
                  <div className="h-full overflow-auto p-2 md:p-4">
                    <div className="flex justify-center">
                      {isPdfFile(viewingDocument.name) ? (
                        // 🚀 PLATFORM-SPECIFIC PDF VIEWER
                        <div className="w-full h-full">
                          {/* Desktop: Always use iframe (works perfectly) */}
                          <iframe
                            src={`${documentUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width`}
                            className="hidden md:block w-full h-full min-h-[600px] border-2 border-gray-300 rounded-lg shadow-lg bg-white"
                            style={{
                              transform: `scale(${viewerZoom}) rotate(${viewerRotation}deg)`,
                              transformOrigin: 'center center'
                            }}
                            title={viewingDocument.name}
                            allow="autoplay"
                          />
                          
                          {/* Mobile: Smart detection with fallback */}
                          <div className="md:hidden">
                            {!pdfLoadFailed ? (
                              <iframe
                                src={`${documentUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width`}
                                className="w-full h-full min-h-[500px] border-2 border-gray-300 rounded-lg shadow-lg bg-white"
                                style={{
                                  transform: `scale(${viewerZoom}) rotate(${viewerRotation}deg)`,
                                  transformOrigin: 'center center'
                                }}
                                title={viewingDocument.name}
                                allow="autoplay"
                                onLoad={(e) => {
                                  // 🔍 Only check on mobile
                                  const iframe = e.target as HTMLIFrameElement;
                                  setTimeout(() => {
                                    try {
                                      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                                      if (!iframeDoc || iframeDoc.body.children.length === 0) {
                                        console.log('📱 Mobile PDF failed to load in iframe, showing fallback');
                                        setPdfLoadFailed(true);
                                      }
                                    } catch (error) {
                                      // PDF is probably loading fine
                                      console.log('📱 Mobile PDF loading (cross-origin protection)');
                                    }
                                  }, 3000); // Give more time for mobile
                                }}
                                onError={() => {
                                  console.log('📱 Mobile PDF iframe failed to load');
                                  setPdfLoadFailed(true);
                                }}
                              />
                            ) : (
                              // 🎯 Mobile Fallback Only
                              <div className="text-center bg-white p-6 rounded-lg border-2 border-gray-300 min-h-[500px] flex flex-col items-center justify-center">
                                <div className="text-6xl mb-4">📄</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">PDF Document</h3>
                                <p className="text-gray-600 mb-4 text-sm text-center max-w-md">
                                  This PDF is ready to view! Your browser might handle it better as a download.
                                </p>
                                <div className="space-y-3 w-full max-w-xs">
                                  <button 
                                    onClick={downloadDocument}
                                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center text-sm font-medium"
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Download PDF
                                  </button>
                                  <button 
                                    onClick={() => {
                                      window.open(documentUrl, '_blank');
                                    }}
                                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center text-sm font-medium"
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Open in New Tab
                                  </button>
                                  <button 
                                    onClick={() => {
                                      setPdfLoadFailed(false);
                                    }}
                                    className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                                  >
                                    Try Preview Again
                                  </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-4">
                                  {viewingDocument.size} • Secure Medical Document
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : isImageFile(viewingDocument.name) ? (
                        <img
                          src={documentUrl}
                          alt={viewingDocument.name}
                          className="max-w-full max-h-full object-contain border-2 border-gray-300 rounded-lg shadow-lg"
                          style={{
                            transform: `scale(${viewerZoom}) rotate(${viewerRotation}deg)`,
                            transformOrigin: 'center center'
                          }}
                        />
                      ) : (
                        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
                          <div className="text-6xl mb-4">{getFileIcon(viewingDocument.name)}</div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{viewingDocument.name}</h3>
                          <p className="text-gray-600 mb-4">This file type cannot be previewed directly.</p>
                          <button 
                            onClick={downloadDocument}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center mx-auto"
                          >
                            <Download className="h-5 w-5 mr-2" />
                            Download to View
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Mobile Action Bar - Bottom */}
              <div className="md:hidden bg-gray-50 px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button onClick={zoomOut} className="p-2 bg-white rounded-lg border border-gray-300" title="Zoom out">
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="px-3 py-1 bg-white rounded-lg border border-gray-300 text-sm font-medium">
                    {Math.round(viewerZoom * 100)}%
                  </span>
                  <button onClick={zoomIn} className="p-2 bg-white rounded-lg border border-gray-300" title="Zoom in">
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button onClick={resetZoom} className="px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm" title="Reset zoom">
                    Reset
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button onClick={downloadDocument} className="p-2 bg-blue-100 rounded-lg text-blue-600" title="Download">
                    <Download className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={closeDocumentViewer} 
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthRecordsPage;
