/**
 * BulkActionsBar Component
 *
 * Floating action bar that appears when departments are selected.
 * Provides bulk operations like deactivate, reactivate, and export.
 *
 * @author AI Assistant
 * @date December 2025
 */

import React, { useState } from 'react';
import {
  X,
  ToggleRight,
  ToggleLeft,
  Download,
  MoreVertical,
  Loader2
} from 'lucide-react';
import { Department } from '../../../types/department';
import DepartmentService from '../../../services/departmentService';

interface BulkActionsBarProps {
  selectedDepartments: Department[];
  onClearSelection: () => void;
  onBulkComplete: (action: string, results: { success: number; failed: number }) => void;
}

/**
 * BulkActionsBar Component
 *
 * Features:
 * - Shows count of selected departments
 * - Bulk deactivate (with validation)
 * - Bulk reactivate
 * - Export selected to CSV
 * - Clear selection
 * - Floating at bottom of screen
 */
const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
  selectedDepartments,
  onClearSelection,
  onBulkComplete
}) => {
  const [loading, setLoading] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  if (selectedDepartments.length === 0) {
    return null;
  }

  // Count active and inactive departments
  const activeDepts = selectedDepartments.filter(d => d.is_active).length;
  const inactiveDepts = selectedDepartments.filter(d => !d.is_active).length;

  // Handle bulk deactivate
  const handleBulkDeactivate = async () => {
    const activeDepartments = selectedDepartments.filter(d => d.is_active);

    if (activeDepartments.length === 0) {
      return;
    }

    if (!window.confirm(
      `Are you sure you want to deactivate ${activeDepartments.length} department${activeDepartments.length > 1 ? 's' : ''}?\n\n` +
      `Departments with assigned staff or patients will be skipped.`
    )) {
      return;
    }

    setLoading(true);
    try {
      const results = await DepartmentService.bulkDeactivate(
        activeDepartments.map(d => d.id)
      );

      onBulkComplete('deactivate', {
        success: results.success.length,
        failed: results.failed.length
      });

      // Show detailed results if there were failures
      if (results.failed.length > 0) {
        const failedNames = results.failed
          .map(f => {
            const dept = activeDepartments.find(d => d.id === f.id);
            return `\n- ${dept?.name || f.id}: ${f.error}`;
          })
          .join('');

        alert(
          `Bulk Deactivation Results:\n\n` +
          `✓ Successfully deactivated: ${results.success.length}\n` +
          `✗ Failed to deactivate: ${results.failed.length}\n\n` +
          `Failed departments:${failedNames}`
        );
      }

      onClearSelection();
    } catch (error) {
      console.error('Bulk deactivation error:', error);
      alert('Failed to perform bulk deactivation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle bulk reactivate
  const handleBulkReactivate = async () => {
    const inactiveDepartments = selectedDepartments.filter(d => !d.is_active);

    if (inactiveDepartments.length === 0) {
      return;
    }

    if (!window.confirm(
      `Are you sure you want to reactivate ${inactiveDepartments.length} department${inactiveDepartments.length > 1 ? 's' : ''}?`
    )) {
      return;
    }

    setLoading(true);
    try {
      const results = await DepartmentService.bulkReactivate(
        inactiveDepartments.map(d => d.id)
      );

      onBulkComplete('reactivate', {
        success: results.success.length,
        failed: results.failed.length
      });

      if (results.failed.length > 0) {
        const failedNames = results.failed
          .map(f => {
            const dept = inactiveDepartments.find(d => d.id === f.id);
            return `\n- ${dept?.name || f.id}: ${f.error}`;
          })
          .join('');

        alert(
          `Bulk Reactivation Results:\n\n` +
          `✓ Successfully reactivated: ${results.success.length}\n` +
          `✗ Failed to reactivate: ${results.failed.length}\n\n` +
          `Failed departments:${failedNames}`
        );
      }

      onClearSelection();
    } catch (error) {
      console.error('Bulk reactivation error:', error);
      alert('Failed to perform bulk reactivation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    try {
      const csv = DepartmentService.exportToCSV(selectedDepartments);
      DepartmentService.downloadCSV(
        csv,
        `departments-export-${new Date().toISOString().split('T')[0]}.csv`
      );

      onBulkComplete('export', {
        success: selectedDepartments.length,
        failed: 0
      });
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export departments. Please try again.');
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000] max-w-[800px] w-[calc(100%-48px)]">
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200">
        <div className="flex items-center gap-4 p-4">
          {/* Selection Count */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-800">
              {selectedDepartments.length}
            </span>
            <span className="text-sm text-gray-500">selected</span>
            {activeDepts > 0 && (
              <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 text-xs font-medium rounded-lg">
                {activeDepts} active
              </span>
            )}
            {inactiveDepts > 0 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-600 border border-gray-200 text-xs font-medium rounded-lg">
                {inactiveDepts} inactive
              </span>
            )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Export */}
            <button
              onClick={handleExport}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Export to CSV"
            >
              <Download size={14} />
              <span>Export</span>
            </button>

            {/* Deactivate */}
            {activeDepts > 0 && (
              <button
                onClick={handleBulkDeactivate}
                disabled={loading}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={`Deactivate ${activeDepts} active department${activeDepts > 1 ? 's' : ''}`}
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <ToggleLeft size={14} />
                )}
                <span>Deactivate ({activeDepts})</span>
              </button>
            )}

            {/* Reactivate */}
            {inactiveDepts > 0 && (
              <button
                onClick={handleBulkReactivate}
                disabled={loading}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-green-700 bg-white border border-green-300 rounded-lg hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={`Reactivate ${inactiveDepts} inactive department${inactiveDepts > 1 ? 's' : ''}`}
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <ToggleRight size={14} />
                )}
                <span>Reactivate ({inactiveDepts})</span>
              </button>
            )}
          </div>

          {/* Clear Selection */}
          <button
            onClick={onClearSelection}
            disabled={loading}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-2"
            title="Clear selection"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;
