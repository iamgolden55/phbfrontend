/**
 * DeactivateConfirmModal Component
 *
 * Confirmation dialog for deactivating departments.
 * Performs safety checks and shows warnings if staff or patients are assigned.
 *
 * @author AI Assistant
 * @date December 2025
 */

import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  XCircle,
  CheckCircle,
  Users,
  User,
  Loader2,
  X
} from 'lucide-react';
import { Department, DeactivationCheckResult } from '../../../types/department';
import DepartmentService from '../../../services/departmentService';

interface DeactivateConfirmModalProps {
  open: boolean;
  department: Department | null;
  onClose: () => void;
  onConfirm: (department: Department) => Promise<void>;
}

/**
 * DeactivateConfirmModal Component
 *
 * Features:
 * - Automatic safety checks on mount
 * - Staff assignment warnings
 * - Patient assignment warnings
 * - Clear confirmation messaging
 * - Prevents deactivation if unsafe
 */
const DeactivateConfirmModal: React.FC<DeactivateConfirmModalProps> = ({
  open,
  department,
  onClose,
  onConfirm
}) => {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<DeactivationCheckResult | null>(null);

  // Check if department can be deactivated when modal opens
  useEffect(() => {
    if (open && department) {
      checkDeactivation();
    } else {
      setCheckResult(null);
    }
  }, [open, department]);

  // Perform deactivation safety check
  const checkDeactivation = async () => {
    if (!department) return;

    setChecking(true);
    try {
      const result = await DepartmentService.canDeactivate(department.id);
      setCheckResult(result);
    } catch (error) {
      console.error('Error checking deactivation:', error);
      setCheckResult({
        canDeactivate: false,
        reason: 'Failed to verify deactivation safety. Please try again.'
      });
    } finally {
      setChecking(false);
    }
  };

  // Handle confirmation
  const handleConfirm = async () => {
    if (!department || !checkResult?.canDeactivate) return;

    setLoading(true);
    try {
      await onConfirm(department);
      handleClose();
    } catch (error) {
      // Error is handled by parent component
      console.error('Deactivation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle close
  const handleClose = () => {
    if (!loading && !checking) {
      setCheckResult(null);
      onClose();
    }
  };

  if (!department || !open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <AlertTriangle className="text-orange-600" size={24} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Deactivate Department</h2>
          </div>
          <button
            onClick={handleClose}
            disabled={loading || checking}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {checking ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 size={40} className="text-blue-900 animate-spin" />
              <p className="ml-3 text-gray-500">Checking safety conditions...</p>
            </div>
          ) : checkResult ? (
            <>
              <p className="text-gray-700 mb-4">
                Are you sure you want to deactivate <strong>{department.name}</strong>?
              </p>

              {checkResult.canDeactivate ? (
                <>
                  {/* Success Alert */}
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <h4 className="text-sm font-semibold text-green-900 mb-1">Safe to Deactivate</h4>
                        <p className="text-xs text-green-700">
                          No staff or patients are currently assigned to this department.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* What Happens Box */}
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-sm font-semibold text-gray-700 mb-3">What happens when you deactivate?</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-gray-500 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-sm text-gray-600">Department will be hidden from active lists</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-gray-500 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-sm text-gray-600">No new appointments or admissions allowed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-gray-500 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-sm text-gray-600">Historical data and records are preserved</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-gray-500 flex-shrink-0 mt-0.5" size={16} />
                        <span className="text-sm text-gray-600">Can be reactivated at any time</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  {/* Error Alert */}
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-4">
                    <div className="flex items-start gap-3">
                      <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <h4 className="text-sm font-semibold text-red-900 mb-1">Cannot Deactivate</h4>
                        <p className="text-sm text-red-700">{checkResult.reason}</p>
                      </div>
                    </div>
                  </div>

                  {/* Required Actions Box */}
                  <div className="p-4 bg-red-50 border border-red-300 rounded-lg">
                    <p className="text-sm font-semibold text-red-900 mb-3">Required Actions:</p>
                    <ul className="space-y-2">
                      {checkResult.staff_count && checkResult.staff_count > 0 && (
                        <li className="flex items-start gap-2">
                          <Users className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                          <span className="text-sm text-red-900">
                            Reassign {checkResult.staff_count} staff member{checkResult.staff_count > 1 ? 's' : ''} to other departments
                          </span>
                        </li>
                      )}
                      {checkResult.patient_count && checkResult.patient_count > 0 && (
                        <li className="flex items-start gap-2">
                          <User className="text-red-600 flex-shrink-0 mt-0.5" size={16} />
                          <span className="text-sm text-red-900">
                            Discharge or transfer {checkResult.patient_count} patient{checkResult.patient_count > 1 ? 's' : ''}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                Unable to verify department status. Please try again.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
          <button
            onClick={handleClose}
            disabled={loading || checking}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!checkResult?.canDeactivate || loading || checking}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Deactivating...</span>
              </>
            ) : (
              <>
                <AlertTriangle size={16} />
                <span>Deactivate Department</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeactivateConfirmModal;
