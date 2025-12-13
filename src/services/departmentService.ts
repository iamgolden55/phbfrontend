/**
 * Department Service Layer
 *
 * API service for department management operations.
 * Handles all HTTP requests to the backend department endpoints.
 *
 * @author AI Assistant
 * @date December 2025
 */

import {
  Department,
  DepartmentFormData,
  DepartmentDetailResponse,
  DepartmentListResponse,
  DepartmentStats,
  DepartmentFilters,
  DeactivationCheckResult,
  DepartmentAPIError
} from '../types/department';
import { API_BASE_URL } from '../utils/config';

/**
 * Department Service
 *
 * Provides methods for:
 * - Listing departments with filters
 * - Getting department details
 * - Creating new departments
 * - Updating existing departments
 * - Deactivating/reactivating departments
 * - Getting department statistics
 */
export class DepartmentService {
  /**
   * List all departments for the authenticated user's hospital
   *
   * @param params - Optional filter and pagination parameters
   * @returns Promise with departments array and total count
   */
  static async listDepartments(params?: {
    search?: string;
    department_type?: string;
    is_active?: boolean | 'all';
    page?: number;
    limit?: number;
  }): Promise<{ departments: Department[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.search) {
        queryParams.append('search', params.search);
      }

      if (params?.department_type) {
        queryParams.append('department_type', params.department_type);
      }

      if (params?.is_active !== undefined && params.is_active !== 'all') {
        queryParams.append('is_active', params.is_active ? 'true' : 'false');
      }

      if (params?.page) {
        queryParams.append('page', params.page.toString());
      }

      if (params?.limit) {
        queryParams.append('limit', params.limit.toString());
      }

      const queryString = queryParams.toString();
      const url = queryString
        ? `${API_BASE_URL}/api/hospitals/departments/?${queryString}`
        : `${API_BASE_URL}/api/hospitals/departments/`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData: DepartmentAPIError = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data: DepartmentListResponse = await response.json();

      // Handle both array and object response formats
      const departments = Array.isArray(data) ? data : (data.departments || []);
      const total = Array.isArray(data) ? data.length : (data.total || departments.length);

      return {
        departments,
        total
      };
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  }

  /**
   * Get detailed information about a specific department
   *
   * @param departmentId - Department ID
   * @returns Promise with detailed department information
   */
  static async getDepartmentDetail(departmentId: number): Promise<DepartmentDetailResponse> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/hospitals/departments/${departmentId}/detail/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const errorData: DepartmentAPIError = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching department details:', error);
      throw error;
    }
  }

  /**
   * Create a new department
   *
   * @param data - Department form data
   * @returns Promise with created department
   */
  static async createDepartment(data: DepartmentFormData): Promise<Department> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/hospitals/departments/create/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData: DepartmentAPIError = await response.json();
        throw new Error(errorData.message || 'Failed to create department');
      }

      const result = await response.json();

      // Handle different response formats
      if (result.department) {
        return result.department;
      } else if (result.status === 'success' && result.department) {
        return result.department;
      } else {
        return result;
      }
    } catch (error) {
      console.error('Error creating department:', error);
      throw error;
    }
  }

  /**
   * Update department basic information
   *
   * @param departmentId - Department ID
   * @param data - Partial department data to update
   * @returns Promise with updated department
   */
  static async updateDepartment(
    departmentId: number,
    data: Partial<DepartmentFormData>
  ): Promise<Department> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/hospitals/departments/${departmentId}/update/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData: DepartmentAPIError = await response.json();
        throw new Error(errorData.message || 'Failed to update department');
      }

      const result = await response.json();

      // Handle different response formats
      if (result.department) {
        return result.department;
      } else if (result.status === 'success' && result.department) {
        return result.department;
      } else {
        return result;
      }
    } catch (error) {
      console.error('Error updating department:', error);
      throw error;
    }
  }

  /**
   * Deactivate a department (soft delete)
   *
   * @param departmentId - Department ID
   * @returns Promise with deactivated department
   */
  static async deactivateDepartment(departmentId: number): Promise<Department> {
    return this.updateDepartment(departmentId, { is_active: false });
  }

  /**
   * Reactivate a deactivated department
   *
   * @param departmentId - Department ID
   * @returns Promise with reactivated department
   */
  static async reactivateDepartment(departmentId: number): Promise<Department> {
    return this.updateDepartment(departmentId, { is_active: true });
  }

  /**
   * Check if department can be safely deactivated
   *
   * @param departmentId - Department ID
   * @returns Promise with deactivation check result
   */
  static async canDeactivate(departmentId: number): Promise<DeactivationCheckResult> {
    try {
      const response = await this.getDepartmentDetail(departmentId);
      const { department, staff_count, patient_count } = response;

      // Check staff assignment
      if (staff_count > 0 || department.current_staff_count > 0) {
        const count = staff_count || department.current_staff_count;
        return {
          canDeactivate: false,
          reason: `Cannot deactivate: ${count} staff member(s) currently assigned. Please reassign staff first.`,
          staff_count: count
        };
      }

      // Check patient assignment
      if (patient_count > 0 || (department.current_patient_count && department.current_patient_count > 0)) {
        const count = patient_count || department.current_patient_count || 0;
        return {
          canDeactivate: false,
          reason: `Cannot deactivate: ${count} patient(s) currently in department. Please discharge or transfer patients first.`,
          patient_count: count
        };
      }

      return { canDeactivate: true };
    } catch (error) {
      console.error('Error checking deactivation:', error);
      throw error;
    }
  }

  /**
   * Get department statistics for the hospital
   *
   * @returns Promise with department statistics
   */
  static async getDepartmentStats(): Promise<DepartmentStats> {
    try {
      const { departments } = await this.listDepartments();

      return {
        total_departments: departments.length,
        active_departments: departments.filter(d => d.is_active).length,
        inactive_departments: departments.filter(d => !d.is_active).length,
        clinical_departments: departments.filter(d => d.is_clinical).length,
        support_departments: departments.filter(d => d.is_support).length,
        administrative_departments: departments.filter(d => d.is_administrative).length,
        total_beds: departments.reduce((sum, d) => sum + (d.total_beds || 0), 0),
        available_beds: departments.reduce((sum, d) => sum + (d.available_beds || 0), 0),
        bed_utilization_rate: this.calculateAverageBedUtilization(departments),
        total_staff: departments.reduce((sum, d) => sum + (d.current_staff_count || 0), 0),
        understaffed_departments: departments.filter(d => d.is_understaffed).length,
      };
    } catch (error) {
      console.error('Error fetching department stats:', error);
      throw error;
    }
  }

  /**
   * Calculate average bed utilization rate across departments
   *
   * @param departments - Array of departments
   * @returns Average bed utilization rate as percentage
   */
  private static calculateAverageBedUtilization(departments: Department[]): number {
    const departmentsWithBeds = departments.filter(d => d.total_beds > 0);

    if (departmentsWithBeds.length === 0) {
      return 0;
    }

    const totalUtilization = departmentsWithBeds.reduce(
      (sum, d) => sum + (d.bed_utilization_rate || 0),
      0
    );

    return Math.round((totalUtilization / departmentsWithBeds.length) * 100) / 100;
  }

  /**
   * Filter departments locally (client-side filtering)
   *
   * @param departments - Array of departments to filter
   * @param filters - Filter criteria
   * @returns Filtered departments array
   */
  static filterDepartments(
    departments: Department[],
    filters: DepartmentFilters
  ): Department[] {
    let filtered = [...departments];

    // Search filter (name or code)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        d =>
          d.name.toLowerCase().includes(searchLower) ||
          d.code.toLowerCase().includes(searchLower)
      );
    }

    // Department type filter
    if (filters.department_type && filters.department_type !== 'all') {
      filtered = filtered.filter(d => d.department_type === filters.department_type);
    }

    // Active status filter
    if (filters.is_active !== undefined && filters.is_active !== 'all') {
      filtered = filtered.filter(d => d.is_active === filters.is_active);
    }

    // Wing filter
    if (filters.wing && filters.wing !== 'all') {
      filtered = filtered.filter(d => d.wing === filters.wing);
    }

    // Floor filter
    if (filters.floor_number && filters.floor_number !== 'all') {
      filtered = filtered.filter(d => d.floor_number === filters.floor_number);
    }

    // Category filters
    if (filters.is_clinical) {
      filtered = filtered.filter(d => d.is_clinical);
    }

    if (filters.is_support) {
      filtered = filtered.filter(d => d.is_support);
    }

    if (filters.is_administrative) {
      filtered = filtered.filter(d => d.is_administrative);
    }

    return filtered;
  }

  /**
   * Sort departments by specified field and order
   *
   * @param departments - Array of departments to sort
   * @param field - Field to sort by
   * @param order - Sort order (asc/desc)
   * @returns Sorted departments array
   */
  static sortDepartments(
    departments: Department[],
    field: keyof Department,
    order: 'asc' | 'desc' = 'asc'
  ): Department[] {
    const sorted = [...departments].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      // String comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Number/boolean comparison
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }

  /**
   * Export departments to CSV format
   *
   * @param departments - Array of departments to export
   * @returns CSV string
   */
  static exportToCSV(departments: Department[]): string {
    const headers = [
      'ID',
      'Name',
      'Code',
      'Type',
      'Category',
      'Status',
      'Floor',
      'Wing',
      'Total Beds',
      'Available Beds',
      'Bed Utilization %',
      'Staff Count',
      'Understaffed',
      'Extension',
      'Emergency Contact',
      'Email'
    ];

    const rows = departments.map(d => [
      d.id,
      d.name,
      d.code,
      d.department_type,
      d.is_clinical ? 'Clinical' : d.is_support ? 'Support' : 'Administrative',
      d.is_active ? 'Active' : 'Inactive',
      d.floor_number,
      d.wing,
      d.total_beds || 0,
      d.available_beds || 0,
      Math.round(d.bed_utilization_rate * 100) / 100,
      d.current_staff_count || 0,
      d.is_understaffed ? 'Yes' : 'No',
      d.extension_number,
      d.emergency_contact,
      d.email
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return csvContent;
  }

  /**
   * Download CSV file
   *
   * @param csvContent - CSV content string
   * @param filename - Optional filename (defaults to departments-YYYY-MM-DD.csv)
   */
  static downloadCSV(csvContent: string, filename?: string): void {
    const defaultFilename = `departments-${new Date().toISOString().split('T')[0]}.csv`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename || defaultFilename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }

  /**
   * Bulk deactivate multiple departments
   *
   * @param departmentIds - Array of department IDs to deactivate
   * @returns Promise with results for each department
   */
  static async bulkDeactivate(
    departmentIds: number[]
  ): Promise<{ success: number[]; failed: Array<{ id: number; error: string }> }> {
    const results = {
      success: [] as number[],
      failed: [] as Array<{ id: number; error: string }>
    };

    for (const id of departmentIds) {
      try {
        // Check if can deactivate first
        const canDeactivate = await this.canDeactivate(id);

        if (!canDeactivate.canDeactivate) {
          results.failed.push({
            id,
            error: canDeactivate.reason || 'Cannot deactivate department'
          });
          continue;
        }

        // Deactivate
        await this.deactivateDepartment(id);
        results.success.push(id);
      } catch (error) {
        results.failed.push({
          id,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }

  /**
   * Bulk reactivate multiple departments
   *
   * @param departmentIds - Array of department IDs to reactivate
   * @returns Promise with results for each department
   */
  static async bulkReactivate(
    departmentIds: number[]
  ): Promise<{ success: number[]; failed: Array<{ id: number; error: string }> }> {
    const results = {
      success: [] as number[],
      failed: [] as Array<{ id: number; error: string }>
    };

    for (const id of departmentIds) {
      try {
        await this.reactivateDepartment(id);
        results.success.push(id);
      } catch (error) {
        results.failed.push({
          id,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }
}

/**
 * Export default instance for convenience
 */
export default DepartmentService;
