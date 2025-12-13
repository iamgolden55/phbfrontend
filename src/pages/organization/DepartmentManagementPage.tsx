/**
 * DepartmentManagementPage
 *
 * Main page for hospital department management.
 * Integrates all department components with state management and orchestration.
 *
 * @author AI Assistant
 * @date December 2025
 */

import React, { useState, useEffect } from 'react';
import Joyride from 'react-joyride';
import { Plus, RefreshCw, HelpCircle, Building2, Loader2 } from 'lucide-react';
import {
  Department,
  DepartmentFormData,
  DepartmentFilters as DepartmentFiltersType,
  DepartmentStats as DepartmentStatsType,
  DepartmentSortField,
  SortOrder
} from '../../types/department';
import DepartmentService from '../../services/departmentService';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';
import DepartmentListTable from '../../components/organization/departments/DepartmentListTable';
import DepartmentFilters from '../../components/organization/departments/DepartmentFilters';
import DepartmentStats from '../../components/organization/departments/DepartmentStats';
import AddDepartmentModal from '../../components/organization/departments/AddDepartmentModal';
import EditDepartmentModal from '../../components/organization/departments/EditDepartmentModal';
import DeactivateConfirmModal from '../../components/organization/departments/DeactivateConfirmModal';
import BulkActionsBar from '../../components/organization/departments/BulkActionsBar';
import { ViewToggle, ViewMode } from '../../components/organization/departments/ViewToggle';
import DepartmentCardView from '../../components/organization/departments/DepartmentCardView';
import { useDepartmentTour } from '../../hooks/useDepartmentTour';

/**
 * DepartmentManagementPage Component
 *
 * Features:
 * - Department list with sorting and filtering
 * - Statistics dashboard
 * - Add/Edit/Deactivate/Reactivate departments
 * - Bulk operations
 * - CSV export
 * - Real-time updates
 */
const DepartmentManagementPage: React.FC = () => {
  // Auth state - CRITICAL: Must wait for initialization before making API calls
  const { isInitialized, isLoading: authLoading, userData } = useOrganizationAuth();

  // Data state
  const [departments, setDepartments] = useState<Department[]>([]);
  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);
  const [stats, setStats] = useState<DepartmentStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Filter and sort state
  const [filters, setFilters] = useState<DepartmentFiltersType>({});
  const [sortField, setSortField] = useState<DepartmentSortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Selection state
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // View state
  const [viewMode, setViewMode] = useState<ViewMode>('cards');

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Tour state
  const { run, stepIndex, steps, handleJoyrideCallback, restartTour } = useDepartmentTour();

  // Modal state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(null);

  // Notification state
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  // Load departments when auth is fully initialized
  // CRITICAL: Must wait for isInitialized to ensure session restoration is complete
  useEffect(() => {
    if (isInitialized && !authLoading && userData?.hospital?.id) {
      console.log('🏥 ✅ Auth initialized, loading departments...');
      loadDepartments();
    } else {
      console.log('🏥 ⏳ Waiting for auth initialization...', {
        isInitialized,
        authLoading,
        hospitalId: userData?.hospital?.id
      });
    }
  }, [isInitialized, authLoading, userData?.hospital?.id]);

  // Apply filters and sorting when data or filters change
  useEffect(() => {
    applyFiltersAndSort();
  }, [departments, filters, sortField, sortOrder]);

  // Auto-dismiss notification after 13 seconds
  useEffect(() => {
    if (notification.open) {
      const timer = setTimeout(() => {
        handleCloseNotification();
      }, 13000); // 13 seconds

      return () => clearTimeout(timer);
    }
  }, [notification.open]);

  // Load all departments and statistics
  const loadDepartments = async () => {
    try {
      setLoading(true);
      const [deptData, statsData] = await Promise.all([
        DepartmentService.listDepartments(),
        DepartmentService.getDepartmentStats()
      ]);

      setDepartments(deptData.departments);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading departments:', error);
      showNotification('Failed to load departments', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Refresh departments
  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await loadDepartments();
      showNotification('Departments refreshed', 'success');
    } catch (error) {
      showNotification('Failed to refresh', 'error');
    } finally {
      setRefreshing(false);
    }
  };

  // Apply filters and sorting
  const applyFiltersAndSort = () => {
    let filtered = DepartmentService.filterDepartments(departments, filters);
    filtered = DepartmentService.sortDepartments(filtered, sortField, sortOrder);
    setFilteredDepartments(filtered);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: DepartmentFiltersType) => {
    setFilters(newFilters);
    setSelectedIds([]); // Clear selection when filters change
  };

  // Handle filter reset
  const handleFilterReset = () => {
    setFilters({});
    setSelectedIds([]);
  };

  // Handle stat card filter
  const handleStatFilter = (filterType: string) => {
    switch (filterType) {
      case 'clinical':
        setFilters({ is_clinical: true });
        break;
      case 'support':
        setFilters({ is_support: true });
        break;
      case 'administrative':
        setFilters({ is_administrative: true });
        break;
      case 'active':
        setFilters({ is_active: true });
        break;
      case 'inactive':
        setFilters({ is_active: false });
        break;
      default:
        setFilters({});
    }
    setSelectedIds([]);
  };

  // Handle sort
  const handleSort = (field: DepartmentSortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Handle selection
  const handleSelect = (ids: number[]) => {
    setSelectedIds(ids);
  };

  // Get selected departments
  const getSelectedDepartments = (): Department[] => {
    return filteredDepartments.filter(d => selectedIds.includes(d.id));
  };

  // Handle create department
  const handleCreateDepartment = async (data: DepartmentFormData) => {
    try {
      // Add hospital ID from auth context
      if (!userData?.hospital?.id) {
        showNotification('Hospital ID not found. Please refresh and try again.', 'error');
        return;
      }

      const dataWithHospital: any = {
        ...data,
        hospital: userData.hospital.id,
        current_staff_count: 0  // Explicitly set to 0 for new departments
      };

      await DepartmentService.createDepartment(dataWithHospital);
      await loadDepartments();
      showNotification(`Department "${data.name}" created successfully`, 'success');
    } catch (error) {
      throw error; // Let modal handle the error
    }
  };

  // Handle edit department
  const handleEditDepartment = async (departmentId: number, data: Partial<DepartmentFormData>) => {
    try {
      await DepartmentService.updateDepartment(departmentId, data);
      await loadDepartments();
      showNotification('Department updated successfully', 'success');
    } catch (error) {
      throw error; // Let modal handle the error
    }
  };

  // Handle deactivate department
  const handleDeactivateDepartment = async (department: Department) => {
    try {
      await DepartmentService.deactivateDepartment(department.id);
      await loadDepartments();
      showNotification(`Department "${department.name}" deactivated`, 'success');
    } catch (error) {
      showNotification(`Failed to deactivate: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
      throw error;
    }
  };

  // Handle reactivate department
  const handleReactivateDepartment = async (department: Department) => {
    try {
      await DepartmentService.reactivateDepartment(department.id);
      await loadDepartments();
      showNotification(`Department "${department.name}" reactivated`, 'success');
    } catch (error) {
      showNotification(`Failed to reactivate: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
  };

  // Handle view details (could open a detail modal or navigate to detail page)
  const handleViewDetail = (department: Department) => {
    // For now, open edit modal
    // In future, this could open a dedicated detail view
    setCurrentDepartment(department);
    setEditModalOpen(true);
  };

  // Handle bulk operation complete
  const handleBulkComplete = (action: string, results: { success: number; failed: number }) => {
    if (action === 'export') {
      showNotification(`Exported ${results.success} departments to CSV`, 'success');
    } else if (action === 'deactivate') {
      showNotification(
        `Deactivated ${results.success} department${results.success !== 1 ? 's' : ''}` +
        (results.failed > 0 ? ` (${results.failed} failed)` : ''),
        results.failed > 0 ? 'warning' : 'success'
      );
      loadDepartments();
    } else if (action === 'reactivate') {
      showNotification(
        `Reactivated ${results.success} department${results.success !== 1 ? 's' : ''}` +
        (results.failed > 0 ? ` (${results.failed} failed)` : ''),
        results.failed > 0 ? 'warning' : 'success'
      );
      loadDepartments();
    }
  };

  // Show notification
  const showNotification = (
    message: string,
    severity: 'success' | 'error' | 'info' | 'warning' = 'success'
  ) => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  // Wait for auth initialization before rendering
  // This prevents premature API calls during session restoration
  if (!isInitialized || authLoading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 size={40} className="text-blue-900 animate-spin" />
        </div>
      </div>
    );
  }

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 size={40} className="text-blue-900 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Joyride Tour Component */}
      <Joyride
        steps={steps}
        run={run}
        stepIndex={stepIndex}
        callback={handleJoyrideCallback}
        continuous
        showProgress
        showSkipButton
        styles={{
          options: {
            primaryColor: '#1e3a8a',
            zIndex: 10000,
          },
        }}
      />

      {/* Page Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Department Management</h1>
          <p className="text-gray-500 mt-1">
            Manage hospital departments, staff allocation, and bed capacity
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={restartTour}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <HelpCircle size={16} />
            <span>Tour</span>
          </button>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {refreshing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setAddModalOpen(true)}
            data-tour="add-button"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors"
          >
            <Plus size={16} />
            <span>Add Department</span>
          </button>
        </div>
      </div>

      {/* Statistics Dashboard */}
      <DepartmentStats stats={stats} loading={loading} onStatClick={handleStatFilter} />

      {/* Filters */}
      <DepartmentFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleFilterReset}
        departmentCount={filteredDepartments.length}
      />

      {/* View Toggle and Count */}
      <div className="flex items-center justify-between mb-6">
        <ViewToggle currentView={viewMode} onChange={setViewMode} />
        <p className="text-sm text-gray-500">
          Showing {filteredDepartments.length} of {departments.length} departments
        </p>
      </div>

      {/* Department List - Cards or Table */}
      {filteredDepartments.length > 0 ? (
        viewMode === 'cards' ? (
          <DepartmentCardView
            departments={filteredDepartments}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            onEdit={(dept) => {
              setCurrentDepartment(dept);
              setEditModalOpen(true);
            }}
            onDeactivate={(dept) => {
              setCurrentDepartment(dept);
              setDeactivateModalOpen(true);
            }}
            onReactivate={handleReactivateDepartment}
          />
        ) : (
          <DepartmentListTable
            departments={filteredDepartments}
            loading={loading}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            onEdit={(dept) => {
              setCurrentDepartment(dept);
              setEditModalOpen(true);
            }}
            onDeactivate={(dept) => {
              setCurrentDepartment(dept);
              setDeactivateModalOpen(true);
            }}
            onReactivate={handleReactivateDepartment}
            onViewDetail={handleViewDetail}
            sortField={sortField}
            sortOrder={sortOrder}
            onSort={handleSort}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={setPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        )
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-12 text-center">
          <Building2 size={48} className="text-blue-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No departments found</h3>
          <p className="text-gray-600 mb-4">
            {Object.keys(filters).length > 0
              ? "No departments match your current filters."
              : "Get started by creating your first department."}
          </p>
          {Object.keys(filters).length > 0 ? (
            <button
              onClick={handleFilterReset}
              className="px-4 py-2 text-sm font-medium text-blue-900 bg-white border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Clear Filters
            </button>
          ) : (
            <button
              onClick={() => setAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Plus size={16} />
              <span>Add Department</span>
            </button>
          )}
        </div>
      )}

      {/* Bulk Actions Bar */}
      <BulkActionsBar
        selectedDepartments={getSelectedDepartments()}
        onClearSelection={() => setSelectedIds([])}
        onBulkComplete={handleBulkComplete}
      />

      {/* Modals */}
      <AddDepartmentModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleCreateDepartment}
        existingCodes={departments.map(d => d.code)}
      />

      <EditDepartmentModal
        open={editModalOpen}
        department={currentDepartment}
        onClose={() => {
          setEditModalOpen(false);
          setCurrentDepartment(null);
        }}
        onSubmit={handleEditDepartment}
      />

      <DeactivateConfirmModal
        open={deactivateModalOpen}
        department={currentDepartment}
        onClose={() => {
          setDeactivateModalOpen(false);
          setCurrentDepartment(null);
        }}
        onConfirm={handleDeactivateDepartment}
      />

      {/* Notifications */}
      {notification.open && (
        <div className="fixed bottom-4 left-4 z-50 max-w-md">
          <div
            className={`p-4 rounded-lg shadow-lg flex items-start gap-3 ${
              notification.severity === 'success'
                ? 'bg-green-500 text-white'
                : notification.severity === 'error'
                ? 'bg-red-500 text-white'
                : notification.severity === 'warning'
                ? 'bg-orange-500 text-white'
                : 'bg-blue-500 text-white'
            }`}
          >
            <p className="flex-1 text-sm">{notification.message}</p>
            <button
              onClick={handleCloseNotification}
              className="text-white hover:text-gray-200 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagementPage;
