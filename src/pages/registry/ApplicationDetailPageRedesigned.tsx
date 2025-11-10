/**
 * Application Detail Page - REDESIGNED
 *
 * Modern dashboard-style application detail page
 * Inspired by cloud infrastructure dashboards
 *
 * Features:
 * - Dashboard-style metrics cards
 * - Modern document upload with drag-and-drop
 * - Visual timeline for application progress
 * - Clean card-based layout
 * - Better mobile responsiveness
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import registryService, {
  ProfessionalApplication,
  ApplicationDocument,
  DocumentType,
  RegistryServiceError,
} from '../../services/registryService';
import MetricsCard from '../../components/registry/MetricsCard';
import InfoCard, { InfoItem } from '../../components/registry/InfoCard';
import DocumentCard from '../../components/registry/DocumentCard';
import Timeline, { TimelineItem } from '../../components/registry/Timeline';

const ApplicationDetailPageRedesigned: React.FC = () => {
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
        registryService.professional.getRequiredDocuments('pharmacist'),
      ]);

      setApplication(appData);
      const docsArray = Array.isArray(docsData) ? docsData : docsData.documents || [];
      setDocuments(docsArray);

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
      await registryService.professional.uploadDocument(applicationId, documentType, file);
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

  const getMetricsData = () => {
    if (!application) return null;

    const totalDocs = requiredDocs.length;
    const uploadedDocs = documents.length;
    const verifiedDocs = documents.filter(d => d.verification_status === 'verified').length;
    const completionPercentage = totalDocs > 0 ? Math.round((uploadedDocs / totalDocs) * 100) : 0;

    const daysSinceSubmission = application.submitted_date
      ? Math.floor((Date.now() - new Date(application.submitted_date).getTime()) / (1000 * 60 * 60 * 24))
      : null;

    return {
      completionPercentage,
      uploadedDocs,
      totalDocs,
      verifiedDocs,
      daysSinceSubmission,
    };
  };

  const getTimelineItems = (): TimelineItem[] => {
    if (!application) return [];

    const items: TimelineItem[] = [
      {
        id: 'created',
        title: 'Application Created',
        date: new Date(application.created_at).toLocaleDateString(),
        status: 'completed',
      },
    ];

    if (application.submitted_date) {
      items.push({
        id: 'submitted',
        title: 'Application Submitted',
        date: new Date(application.submitted_date).toLocaleDateString(),
        status: 'completed',
      });
    }

    if (application.under_review_date) {
      items.push({
        id: 'under_review',
        title: 'Under Review',
        date: new Date(application.under_review_date).toLocaleDateString(),
        status: 'completed',
      });
    } else if (application.status === 'submitted') {
      items.push({
        id: 'under_review',
        title: 'Awaiting Review',
        status: 'current',
      });
    }

    if (application.decision_date && application.status === 'approved') {
      items.push({
        id: 'approved',
        title: 'Application Approved',
        description: `License: ${application.phb_license_number}`,
        date: new Date(application.decision_date).toLocaleDateString(),
        status: 'completed',
      });
    } else if (application.status !== 'approved' && application.status !== 'rejected') {
      items.push({
        id: 'decision',
        title: 'Final Decision',
        status: 'pending',
      });
    }

    return items;
  };

  const getPersonalInfoItems = (): InfoItem[] => {
    if (!application) return [];

    return [
      {
        label: 'Full Name',
        value: `${application.first_name} ${application.middle_name || ''} ${application.last_name}`.trim(),
      },
      {
        label: 'Email',
        value: application.email,
      },
      {
        label: 'Phone Number',
        value: application.phone,
      },
      {
        label: 'Professional Type',
        value: application.professional_type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      },
      {
        label: 'Specialization',
        value: application.specialization,
      },
      {
        label: 'Years of Experience',
        value: `${application.years_of_experience} years`,
      },
    ];
  };

  const getRegulatoryInfoItems = (): InfoItem[] => {
    if (!application) return [];

    return [
      {
        label: 'Regulatory Body',
        value: application.home_registration_body,
      },
      {
        label: 'Registration Number',
        value: application.home_registration_number,
      },
      {
        label: 'Registration Date',
        value: application.home_registration_date
          ? new Date(application.home_registration_date).toLocaleDateString()
          : '—',
      },
    ];
  };

  const getStatusBadgeClass = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800 border-gray-300',
      submitted: 'bg-blue-100 text-blue-800 border-blue-300',
      under_review: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300',
      clarification_requested: 'bg-orange-100 text-orange-800 border-orange-300',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading application...</p>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
          <div className="text-6xl text-center mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Error Loading Application
          </h2>
          <p className="text-gray-600 text-center mb-6">{error || 'Application not found'}</p>
          <button
            onClick={() => navigate('/registry/dashboard')}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const metrics = getMetricsData();
  const canEdit = application.status === 'draft' || application.status === 'clarification_requested';
  // Allow re-upload if application is under review and has ANY rejected documents (check documents array)
  const hasActualRejectedDocs = documents.some(d => d.verification_status === 'rejected');
  const canReupload = application.status === 'under_review' && hasActualRejectedDocs;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/registry/dashboard')}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Reference: {application.application_reference}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span
                className={`px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusBadgeClass(
                  application.status || 'draft'
                )}`}
              >
                {(application.status || 'draft').replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Status Banners */}
        {application.status === 'approved' && application.phb_license_number && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">🎉</span>
              <div>
                <h3 className="font-semibold text-green-900 text-lg">Application Approved!</h3>
                <p className="text-green-800">
                  Your PHB License Number: <strong>{application.phb_license_number}</strong>
                </p>
              </div>
            </div>
          </div>
        )}

        {application.status === 'rejected' && application.rejection_reason && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-red-900 mb-2">Application Rejected</h3>
            <p className="text-red-800">{application.rejection_reason}</p>
          </div>
        )}

        {/* Rejected Documents Notice */}
        {hasActualRejectedDocs && application.status === 'under_review' && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">⚠️</span>
              <div className="flex-1">
                <h3 className="font-semibold text-orange-900 text-lg mb-1">Action Required: Rejected Documents</h3>
                <p className="text-orange-800 mb-3">
                  Some of your documents have been rejected and need to be re-uploaded. Please review the rejection reasons below and upload corrected versions before the deadline.
                </p>
                <div className="flex items-center space-x-2 text-sm text-orange-900">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Review and re-upload rejected documents in the section below</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Metrics Cards */}
        {metrics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricsCard
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Completion"
              value={metrics.completionPercentage}
              unit="%"
              status={metrics.completionPercentage === 100 ? 'good' : metrics.completionPercentage >= 50 ? 'warning' : 'alert'}
              statusText={`${metrics.uploadedDocs}/${metrics.totalDocs} documents`}
            />

            <MetricsCard
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              title="Verified Docs"
              value={metrics.verifiedDocs}
              unit={`/ ${metrics.totalDocs}`}
              status={metrics.verifiedDocs === metrics.totalDocs ? 'good' : 'info'}
              statusText={metrics.verifiedDocs === metrics.totalDocs ? 'All verified' : 'Pending review'}
            />

            <MetricsCard
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Processing Time"
              value={metrics.daysSinceSubmission !== null ? metrics.daysSinceSubmission : '—'}
              unit={metrics.daysSinceSubmission !== null ? 'days' : ''}
              status="info"
              statusText={application.status === 'draft' ? 'Not submitted' : 'Since submission'}
            />

            <MetricsCard
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Application Status"
              value={application.status.replace('_', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              status={
                application.status === 'approved'
                  ? 'good'
                  : application.status === 'rejected'
                  ? 'alert'
                  : 'info'
              }
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <InfoCard
              title="Personal Information"
              items={getPersonalInfoItems()}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            />

            {/* Regulatory Information */}
            <InfoCard
              title="Regulatory Information"
              items={getRegulatoryInfoItems()}
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
            />

            {/* Required Documents */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">Required Documents</h2>
                </div>
                <span className="text-sm text-gray-600">
                  {documents.length} / {requiredDocs.length} uploaded
                </span>
              </div>

              <div className="space-y-3">
                {requiredDocs.map((docType) => {
                  const doc = documents.find((d) => d.document_type === docType);
                  const isUploading = uploadingDoc === docType;
                  const isRejected = doc?.verification_status === 'rejected';
                  const canEditOrReupload = canEdit || (isRejected && canReupload && doc?.can_be_replaced);

                  return (
                    <DocumentCard
                      key={docType}
                      documentType={docType}
                      fileName={doc?.file_name}
                      fileSize={doc?.file_name ? 1024 * 500 : undefined}
                      uploadDate={doc?.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : undefined}
                      status={
                        doc?.verification_status === 'verified'
                          ? 'verified'
                          : doc?.verification_status === 'rejected'
                          ? 'rejected'
                          : doc
                          ? 'pending'
                          : 'missing'
                      }
                      rejectionReason={doc?.verification_notes}
                      isUploading={isUploading}
                      canEdit={canEditOrReupload}
                      onUpload={(file) => handleFileUpload(docType as DocumentType, file)}
                      onDelete={doc && canEdit ? () => handleDeleteDocument(doc.id) : undefined}
                      // Rejection workflow props
                      attemptsRemaining={doc?.attempts_remaining}
                      maxAttempts={doc?.max_rejection_attempts}
                      resubmissionDeadline={doc?.resubmission_deadline}
                      canBeReplaced={doc?.can_be_replaced}
                      isDeadlineApproaching={doc?.is_deadline_approaching}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submit Action */}
            {(application.status === 'draft' || application.is_draft) && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
                <button
                  onClick={handleSubmitApplication}
                  disabled={documents.length === 0}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  Submit Application
                </button>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Upload all required documents before submission
                </p>
              </div>
            )}

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-6">Application Timeline</h3>
              <Timeline items={getTimelineItems()} />
            </div>

            {/* Help */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 text-sm mb-2">Need Help?</h4>
              <p className="text-xs text-blue-800 mb-3">
                Contact our registry support team for assistance
              </p>
              <a
                href="mailto:registry@phb.ng"
                className="text-xs text-blue-600 hover:underline flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>registry@phb.ng</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPageRedesigned;
