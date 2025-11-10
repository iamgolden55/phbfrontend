/**
 * DocumentCard Component
 *
 * Modern document upload/display card with drag-and-drop
 * Adapted from 21st.dev component for registry documents
 */

import React, { useState, useRef } from 'react';

export type DocumentStatus = 'verified' | 'pending' | 'rejected' | 'missing';

interface DocumentCardProps {
  documentType: string;
  fileName?: string;
  fileSize?: number;
  uploadDate?: string;
  status: DocumentStatus;
  rejectionReason?: string;
  isUploading?: boolean;
  canEdit?: boolean;
  onUpload?: (file: File) => void;
  onDelete?: () => void;
  // Rejection workflow fields
  attemptsRemaining?: number;
  maxAttempts?: number;
  resubmissionDeadline?: string;
  canBeReplaced?: boolean;
  isDeadlineApproaching?: boolean;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  documentType,
  fileName,
  fileSize,
  uploadDate,
  status,
  rejectionReason,
  isUploading = false,
  canEdit = true,
  onUpload,
  onDelete,
  attemptsRemaining,
  maxAttempts,
  resubmissionDeadline,
  canBeReplaced = true,
  isDeadlineApproaching = false,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes?: number) => {
    if (!bytes) return '';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const formatDocumentType = (type: string) => {
    return type
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: 'text-green-600',
          textColor: 'text-green-700',
          label: 'Verified',
        };
      case 'pending':
        return {
          icon: (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ),
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: 'text-yellow-600',
          textColor: 'text-yellow-700',
          label: 'Pending Verification',
        };
      case 'rejected':
        return {
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: 'text-red-600',
          textColor: 'text-red-700',
          label: 'Rejected',
        };
      case 'missing':
        return {
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: 'text-gray-600',
          textColor: 'text-gray-700',
          label: 'Not Uploaded',
        };
    }
  };

  const statusConfig = getStatusConfig();
  const hasDocument = fileName && status !== 'missing';

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (canEdit) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (!canEdit || !onUpload) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onUpload) {
      onUpload(files[0]);
    }
  };

  return (
    <div
      className={`border rounded-xl p-4 transition-all duration-200 ${
        isDragging ? 'border-blue-400 bg-blue-50 scale-[1.02]' : `${statusConfig.borderColor} bg-white hover:shadow-md`
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className={`${statusConfig.bgColor} p-2.5 rounded-lg flex-shrink-0`}>
            <div className={statusConfig.iconColor}>{statusConfig.icon}</div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 text-sm">
              {formatDocumentType(documentType)}
            </h3>

            {hasDocument ? (
              <div className="mt-1 space-y-0.5">
                <p className="text-sm text-gray-600 truncate">{fileName}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  {fileSize && <span>{formatBytes(fileSize)}</span>}
                  {uploadDate && (
                    <>
                      <span>•</span>
                      <span>{uploadDate}</span>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <p className={`mt-1 text-xs ${statusConfig.textColor}`}>
                {statusConfig.label}
              </p>
            )}
          </div>
        </div>

        {canEdit && (
          <div className="flex items-center space-x-2 ml-3">
            {hasDocument && onDelete && (
              <button
                onClick={onDelete}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete document"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}

            <label className="cursor-pointer">
              <div className="px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors flex items-center space-x-2">
                {isUploading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm font-medium">Uploading...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm font-medium">{hasDocument ? 'Replace' : 'Upload'}</span>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                disabled={isUploading}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </label>
          </div>
        )}
      </div>

      {/* Rejection Information */}
      {status === 'rejected' && (
        <div className="mt-3 space-y-2">
          {/* Rejection Reason */}
          {rejectionReason && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs font-medium text-red-900 mb-1">Rejection Reason:</p>
              <p className="text-xs text-red-800">{rejectionReason}</p>
            </div>
          )}

          {/* Rejection Status Info */}
          {canBeReplaced && (attemptsRemaining !== undefined || resubmissionDeadline) && (
            <div className={`p-3 border rounded-lg ${isDeadlineApproaching ? 'bg-orange-50 border-orange-200' : 'bg-blue-50 border-blue-200'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {attemptsRemaining !== undefined && maxAttempts !== undefined && (
                    <div className="flex items-center space-x-2 mb-1">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <p className="text-xs font-medium text-blue-900">
                        {attemptsRemaining} {attemptsRemaining === 1 ? 'attempt' : 'attempts'} remaining
                      </p>
                    </div>
                  )}

                  {resubmissionDeadline && (
                    <div className="flex items-center space-x-2">
                      <svg className={`w-4 h-4 ${isDeadlineApproaching ? 'text-orange-600' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className={`text-xs ${isDeadlineApproaching ? 'text-orange-900 font-medium' : 'text-blue-900'}`}>
                        Deadline: {new Date(resubmissionDeadline).toLocaleDateString()} at {new Date(resubmissionDeadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  )}
                </div>

                {isDeadlineApproaching && (
                  <div className="ml-2">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-200 text-orange-900">
                      Urgent
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Cannot Replace Warning */}
          {!canBeReplaced && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <svg className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <p className="text-xs font-medium text-gray-900 mb-1">Cannot Re-upload</p>
                  <p className="text-xs text-gray-700">
                    {attemptsRemaining === 0
                      ? 'Maximum attempts reached. Please contact support.'
                      : resubmissionDeadline && new Date(resubmissionDeadline) < new Date()
                      ? 'Deadline has passed. Please contact support.'
                      : 'This document cannot be replaced. Please contact support.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DocumentCard;
