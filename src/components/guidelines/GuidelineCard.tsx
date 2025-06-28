import React from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock,
  AlertCircle,
  BookOpen,
  Calendar,
  Users,
  Tag
} from 'lucide-react';
import { ClinicalGuideline } from '../../services/guidelinesService';

interface GuidelineCardProps {
  guideline: ClinicalGuideline;
  onView: (guideline: ClinicalGuideline) => void;
  onEdit?: (guideline: ClinicalGuideline) => void;
  onDelete?: (guideline: ClinicalGuideline) => void;
  onDownload?: (guideline: ClinicalGuideline) => void;
  onApprove?: (guideline: ClinicalGuideline) => void;
  onPublish?: (guideline: ClinicalGuideline) => void;
  showActions?: boolean;
  variant?: 'admin' | 'professional';
}

const GuidelineCard: React.FC<GuidelineCardProps> = ({
  guideline,
  onView,
  onEdit,
  onDelete,
  onDownload,
  onApprove,
  onPublish,
  showActions = true,
  variant = 'admin'
}) => {
  const getStatusBadge = () => {
    const status = guideline.approval_status;
    const isPublished = guideline.is_published;
    
    if (status === 'approved' && isPublished) {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          <CheckCircle className="w-3 h-3 mr-1" />
          Published
        </span>
      );
    } else if (status === 'approved') {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
          <CheckCircle className="w-3 h-3 mr-1" />
          Approved
        </span>
      );
    } else if (status === 'pending_review') {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
          <Clock className="w-3 h-3 mr-1" />
          Pending Review
        </span>
      );
    } else if (status === 'draft') {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
          <Edit className="w-3 h-3 mr-1" />
          Draft
        </span>
      );
    } else if (status === 'rejected') {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
          <AlertCircle className="w-3 h-3 mr-1" />
          Rejected
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
          <AlertCircle className="w-3 h-3 mr-1" />
          Unknown
        </span>
      );
    }
  };

  const getPriorityBadge = () => {
    const colors = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-blue-100 text-blue-800 border-blue-200',
      low: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${colors[guideline.priority as keyof typeof colors] || colors.medium}`}>
        {guideline.priority === 'critical' && <AlertCircle className="w-3 h-3 mr-1" />}
        {guideline.priority.charAt(0).toUpperCase() + guideline.priority.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpired = guideline.expiry_date && new Date(guideline.expiry_date) < new Date();
  const isEffective = new Date(guideline.effective_date) <= new Date();

  return (
    <div className={`bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 ${isExpired ? 'opacity-75' : ''}`}>
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {guideline.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {guideline.description}
            </p>
          </div>
          
          <div className="ml-4 flex flex-col space-y-2">
            {getStatusBadge()}
            {getPriorityBadge()}
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Tag className="h-4 w-4 mr-2 text-gray-400" />
            <span className="capitalize">{guideline.category.replace('_', ' ')}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>v{guideline.version}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>Effective: {formatDate(guideline.effective_date)}</span>
          </div>
          
          <div className="flex items-center">
            <Eye className="h-4 w-4 mr-2 text-gray-400" />
            <span>{guideline.access_count} views</span>
          </div>
        </div>

        {/* Specialty */}
        {guideline.specialty && (
          <div className="mb-4">
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
              {guideline.specialty}
            </span>
          </div>
        )}

        {/* Target Roles */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm text-gray-600">Target Roles:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {guideline.target_roles.slice(0, 3).map((role) => (
              <span
                key={role}
                className="inline-flex items-center px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded"
              >
                {role.replace('_', ' ')}
              </span>
            ))}
            {guideline.target_roles.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded">
                +{guideline.target_roles.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Expiry Warning */}
        {isExpired && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-sm text-red-700">
                This guideline expired on {formatDate(guideline.expiry_date!)}
              </span>
            </div>
          </div>
        )}

        {/* Not Yet Effective Warning */}
        {!isEffective && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm text-yellow-700">
                This guideline becomes effective on {formatDate(guideline.effective_date)}
              </span>
            </div>
          </div>
        )}

        {/* Keywords */}
        {guideline.keywords.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {guideline.keywords.slice(0, 5).map((keyword, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                >
                  #{keyword}
                </span>
              ))}
              {guideline.keywords.length > 5 && (
                <span className="text-xs text-gray-500">
                  +{guideline.keywords.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <button
                onClick={() => onView(guideline)}
                className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </button>
              
              {guideline.file_url && onDownload && (
                <button
                  onClick={() => onDownload(guideline)}
                  className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-600 hover:text-green-800 transition-colors"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </button>
              )}
              
              {variant === 'professional' && guideline.is_bookmarked && (
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-yellow-600">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Bookmarked
                </span>
              )}
            </div>

            {variant === 'admin' && (
              <div className="flex space-x-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(guideline)}
                    className="inline-flex items-center px-2 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                )}
                
                {guideline.approval_status === 'draft' && onApprove && (
                  <button
                    onClick={() => onApprove(guideline)}
                    className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    title="Approve"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                )}
                
                {guideline.approval_status === 'approved' && !guideline.is_published && onPublish && (
                  <button
                    onClick={() => onPublish(guideline)}
                    className="inline-flex items-center px-2 py-1 text-sm text-purple-600 hover:text-purple-800 transition-colors"
                    title="Publish"
                  >
                    <BookOpen className="h-4 w-4" />
                  </button>
                )}
                
                {onDelete && (
                  <button
                    onClick={() => onDelete(guideline)}
                    className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuidelineCard;