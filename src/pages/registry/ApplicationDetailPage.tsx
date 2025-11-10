/**
 * Application Detail Page
 *
 * View and manage a specific registry application
 * Features:
 * - View application details
 * - Upload required documents
 * - Track document verification status
 * - View admin feedback
 * - Download approved license
 *
 * MICROSERVICE-READY: Uses isolated registryService
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import registryService, {
  ProfessionalApplication,
  ApplicationDocument,
  DocumentType,
  RegistryServiceError,
} from '../../services/registryService';

const ApplicationDetailPage: React.FC = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();

  const [application, setApplication] = useState<ProfessionalApplication | null>(null);
  const [documents, setDocuments] = useState<ApplicationDocument[]>([]);
  const [requiredDocs, setRequiredDocs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);

  useEffect(() => {
    if (applicationId) {
      loadApplicationDetails();
    }
  }, [applicationId]);

  const loadApplicationDetails = async () => {
    if (!applicationId) return;

    try {
      setLoading(true);
      setError(null);

      const [appData, docsData, requiredDocsData] = await Promise.all([
        registryService.professional.getApplication(applicationId),
        registryService.professional.getApplicationDocuments(applicationId),
        registryService.professional.getRequiredDocuments(
          'pharmacist' // TODO: Get from application
        ),
      ]);

      console.log('📄 Application loaded:', appData?.application_reference, 'Status:', appData?.status);
      console.log('📎 Documents:', docsData);
      console.log('📋 Required docs:', requiredDocsData);

      setApplication(appData);

      // Handle documents - could be array or paginated response
      const docsArray = Array.isArray(docsData) ? docsData : docsData.documents || [];
      setDocuments(docsArray);

      // Handle required docs - extract array from response
      const requiredArray = Array.isArray(requiredDocsData)
        ? requiredDocsData.map((doc: any) => doc.document_type || doc)
        : requiredDocsData.required_documents?.map((doc: any) => doc.document_type || doc) || [];
      setRequiredDocs(requiredArray);
    } catch (err) {
      if (err instanceof RegistryServiceError) {
        setError(err.message);
      } else {
        setError('Failed to load application details');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (documentType: DocumentType, file: File) => {
    if (!applicationId) return;

    try {
      setUploadingDoc(documentType);
      await registryService.professional.uploadDocument(
        applicationId,
        documentType,
        file
      );
      // Reload documents
      await loadApplicationDetails();
    } catch (err) {
      if (err instanceof RegistryServiceError) {
        alert(`Upload failed: ${err.message}`);
      } else {
        alert('Failed to upload document');
      }
    } finally {
      setUploadingDoc(null);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    if (!applicationId || !confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      await registryService.professional.deleteDocument(applicationId, documentId);
      await loadApplicationDetails();
    } catch (err) {
      if (err instanceof RegistryServiceError) {
        alert(`Delete failed: ${err.message}`);
      } else {
        alert('Failed to delete document');
      }
    }
  };

  const handleSubmitApplication = async () => {
    if (
      !applicationId ||
      !confirm(
        'Are you sure you want to submit this application? You will not be able to edit it after submission.'
      )
    ) {
      return;
    }

    try {
      await registryService.professional.submitApplication(applicationId);
      await loadApplicationDetails();
      alert('Application submitted successfully!');
    } catch (err) {
      if (err instanceof RegistryServiceError) {
        alert(`Submission failed: ${err.message}`);
      } else {
        alert('Failed to submit application');
      }
    }
  };

  const getDocumentStatus = (documentType: string) => {
    const doc = documents.find((d) => d.document_type === documentType);
    if (!doc) return { status: 'missing', color: 'text-red-600' };

    if (doc.verification_status === 'verified') {
      return { status: 'verified', color: 'text-green-600' };
    } else if (doc.verification_status === 'rejected') {
      return { status: 'rejected', color: 'text-red-600' };
    } else {
      return { status: 'pending', color: 'text-yellow-600' };
    }
  };

  const getDocumentIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'rejected':
        return (
          <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'pending':
        return (
          <div className="w-10 h-10 bg-yellow-100 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default: // missing
        return (
          <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-blue-100 text-blue-800',
      under_review: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      clarification_requested: 'bg-orange-100 text-orange-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md">
          <div className="text-6xl text-center mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Error Loading Application
          </h2>
          <p className="text-gray-600 text-center mb-6">
            {error || 'Application not found'}
          </p>
          <button
            onClick={() => navigate('/registry/dashboard')}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/registry/dashboard')}
            className="mr-4 text-blue-600 hover:text-blue-700"
          >
            ← Back to Dashboard
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">
              Application Details
            </h1>
            <p className="text-gray-600">
              Application #{application.application_reference}
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
              application.status || 'draft'
            )}`}
          >
            {(application.status || 'draft').replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {/* Status Messages */}
        {application.status === 'approved' && application.phb_license_number && (
          <div className="bg-green-50 border border-green-200 rounded-md p-6 mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">🎉</span>
              <div>
                <h3 className="font-semibold text-green-900 text-lg">
                  Application Approved!
                </h3>
                <p className="text-green-800">
                  Your PHB License Number: <strong>{application.phb_license_number}</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {application.status === 'rejected' && application.rejection_reason && (
          <div className="bg-red-50 border border-red-200 rounded-md p-6 mb-6">
            <h3 className="font-semibold text-red-900 mb-2">Application Rejected</h3>
            <p className="text-red-800">{application.rejection_reason}</p>
          </div>
        )}

        {application.review_notes && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6 mb-6">
            <h3 className="font-semibold text-yellow-900 mb-2">Reviewer Notes</h3>
            <p className="text-yellow-800">{application.review_notes}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Application Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Professional Type</p>
                  <p className="font-medium text-gray-900">
                    {application.professional_type
                      .replace('_', ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">
                    {application.first_name} {application.middle_name}{' '}
                    {application.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{application.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">
                    {application.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Regulatory Body</p>
                  <p className="font-medium text-gray-900">
                    {application.home_registration_body}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registration Number</p>
                  <p className="font-medium text-gray-900">
                    {application.home_registration_number}
                  </p>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Required Documents
              </h2>

              <div className="space-y-4">
                {requiredDocs.map((docType) => {
                  const docStatus = getDocumentStatus(docType);
                  const doc = documents.find((d) => d.document_type === docType);
                  const isUploading = uploadingDoc === docType;


                  return (
                    <div
                      key={docType}
                      className="border border-gray-200 rounded-md p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getDocumentIcon(docStatus.status)}
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {docType
                                .replace(/_/g, ' ')
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </h3>
                            <p className={`text-sm ${docStatus.color}`}>
                              {docStatus.status === 'missing' && 'Not uploaded'}
                              {docStatus.status === 'pending' && 'Pending verification'}
                              {docStatus.status === 'verified' && 'Verified'}
                              {docStatus.status === 'rejected' && 'Rejected'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {/* Allow delete only for draft or clarification_requested */}
                          {doc && (application.status === 'draft' || application.status === 'clarification_requested') && (
                            <button
                              onClick={() => handleDeleteDocument(doc.id)}
                              className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                            >
                              Delete
                            </button>
                          )}

                          {/* Show upload button only for draft and clarification_requested statuses */}
                          {(application.status === 'draft' || application.status === 'clarification_requested') && (
                            <label className="group flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 cursor-pointer transition-colors">
                              <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded flex items-center justify-center flex-shrink-0 transition-colors">
                                {isUploading ? (
                                  <svg className="w-5 h-5 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                ) : (
                                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                  </svg>
                                )}
                              </div>
                              <span className="text-sm font-medium">
                                {isUploading ? 'Uploading...' : doc ? 'Replace' : 'Upload'}
                              </span>
                              <input
                                type="file"
                                className="hidden"
                                disabled={isUploading}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleFileUpload(docType as DocumentType, file);
                                  }
                                }}
                              />
                            </label>
                          )}
                        </div>
                      </div>

                      {doc?.rejection_reason && (
                        <div className="mt-2 p-2 bg-red-50 rounded text-sm text-red-800">
                          <strong>Rejection Reason:</strong> {doc.rejection_reason}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Warning for Submitted Applications without Documents */}
            {(application.status === 'submitted' || application.status === 'under_review') && documents.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-yellow-900 mb-2">Documents Required</h3>
                    <p className="text-sm text-yellow-800 mb-3">
                      Your application was submitted during registration, but you haven't uploaded the required verification documents yet.
                    </p>
                    <p className="text-sm text-yellow-800 mb-3">
                      <strong>What happened?</strong> The system automatically submitted your application after account creation, but documents can only be uploaded to draft applications.
                    </p>
                    <div className="bg-white rounded-md p-3 mb-3">
                      <p className="text-sm text-gray-700 font-medium mb-2">📧 To upload your documents:</p>
                      <p className="text-sm text-gray-600">
                        Contact our registry support team at{' '}
                        <a href="mailto:registry@phb.ng" className="text-blue-600 underline hover:text-blue-700">
                          registry@phb.ng
                        </a>
                        {' '}with your application number ({application.application_reference}) and request to have your status changed back to "draft" so you can upload documents.
                      </p>
                    </div>
                    <p className="text-xs text-yellow-700 italic">
                      We're working on fixing this workflow issue. Thank you for your patience.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Info for Clarification Requested */}
            {application.status === 'clarification_requested' && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-orange-900 mb-2">Additional Documents Requested</h3>
                    <p className="text-sm text-orange-800">
                      The reviewer has requested additional documents. Please upload the required files below.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions - Only show for draft applications */}
            {(application.status === 'draft' || application.is_draft) && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
                <button
                  onClick={handleSubmitApplication}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                  disabled={documents.length === 0}
                >
                  Submit Application
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Ensure all required documents are uploaded before submission
                </p>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Created</p>
                    <p className="text-xs text-gray-500">
                      {new Date(application.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {application.submitted_date && (
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">✓</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Submitted</p>
                      <p className="text-xs text-gray-500">
                        {new Date(application.submitted_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {application.under_review_date && (
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">🔍</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Review Started
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(application.under_review_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {application.decision_date && application.status === 'approved' && (
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm">✓</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Approved</p>
                      <p className="text-xs text-gray-500">
                        {new Date(application.decision_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Help */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h4 className="font-semibold text-blue-900 text-sm mb-2">
                Need Help?
              </h4>
              <p className="text-xs text-blue-800 mb-3">
                Contact our registry support team for assistance
              </p>
              <a
                href="mailto:registry@phb.ng"
                className="text-xs text-blue-600 hover:underline block"
              >
                📧 registry@phb.ng
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
