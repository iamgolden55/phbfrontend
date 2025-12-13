import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface BulkActionConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: 'activate' | 'deactivate' | 'delete' | null;
  userCount: number;
  isLoading?: boolean;
}

const BulkActionConfirmModal: React.FC<BulkActionConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  action,
  userCount,
  isLoading = false,
}) => {
  if (!isOpen || !action) return null;

  const actionConfig = {
    activate: {
      title: 'Activate Users',
      message: `Are you sure you want to activate ${userCount} user${userCount > 1 ? 's' : ''}? They will be able to access the system immediately.`,
      confirmText: 'Activate',
      confirmClass: 'bg-green-600 hover:bg-green-700 disabled:bg-green-400',
      icon: '✓',
      iconColor: 'text-green-600',
    },
    deactivate: {
      title: 'Deactivate Users',
      message: `Are you sure you want to deactivate ${userCount} user${userCount > 1 ? 's' : ''}? They will lose access to the system but their data will be preserved.`,
      confirmText: 'Deactivate',
      confirmClass: 'bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400',
      icon: '⏸',
      iconColor: 'text-yellow-600',
    },
    delete: {
      title: 'Delete Users',
      message: `Are you sure you want to delete ${userCount} user${userCount > 1 ? 's' : ''}? This action CANNOT be undone and will permanently remove their accounts and data.`,
      confirmText: 'Delete',
      confirmClass: 'bg-red-600 hover:bg-red-700 disabled:bg-red-400',
      warning: true,
      icon: '🗑',
      iconColor: 'text-red-600',
    },
  };

  const config = actionConfig[action];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        <div className="flex items-center gap-3 mb-4">
          <div className={`text-3xl ${config.iconColor}`}>{config.icon}</div>
          <h3 className="text-xl font-bold text-gray-800">{config.title}</h3>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">{config.message}</p>

        {config.warning && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="text-red-600 mt-0.5 flex-shrink-0" size={20} />
              <div>
                <p className="text-red-800 text-sm font-semibold mb-1">
                  Warning: Permanent Action
                </p>
                <p className="text-red-700 text-sm">
                  This action cannot be undone. All user data will be permanently deleted.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-5 py-2.5 text-white rounded-lg font-medium transition-colors ${config.confirmClass} disabled:cursor-not-allowed flex items-center gap-2`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <span>{config.confirmText}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionConfirmModal;
