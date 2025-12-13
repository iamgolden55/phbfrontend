// User Management Service
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface OrganizationUser {
  id: number;
  user_id: number;
  email: string;
  full_name: string;
  role: 'hospital_admin';
  status: 'active' | 'inactive';
  department?: {
    id: number;
    name: string;
    type: string;
    code: string;
  } | null;
  position: string;
  phone: string;
  last_login: string | null;
  joined_date: string | null;
  is_general_admin: boolean;
  is_department_head: boolean;
}

export interface InviteUserRequest {
  email: string;
  full_name: string;
  role: string;
  department?: string;
  position?: string;
  phone?: string;
}

export interface UpdateUserRequest {
  full_name?: string;
  role?: string;
  department?: string;
  position?: string;
  phone?: string;
  status?: 'active' | 'inactive' | 'suspended';
}

export interface UserListResponse {
  users: OrganizationUser[];
  summary: {
    total_admins: number;
    general_admins: number;
    department_heads: number;
  };
}

export interface Department {
  id: number;
  name: string;
  code: string;
  department_type: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  is_system_role: boolean;
}

export const UserManagementService = {
  async listUsers(params?: {
    search?: string;
    role?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<UserListResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.search) queryParams.append('search', params.search);
      if (params?.role) queryParams.append('role', params.role);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const queryString = queryParams.toString();
      const url = queryString
        ? `${API_BASE_URL}/api/hospitals/admin/users/?${queryString}`
        : `${API_BASE_URL}/api/hospitals/admin/users/`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Use HTTP-only cookies for authentication
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async getDepartments(category?: 'administrative' | 'clinical' | 'support' | 'all'): Promise<Department[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/hospitals/departments/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let departments = Array.isArray(data) ? data : data.departments || [];

      // Filter by category if specified
      if (category && category !== 'all') {
        // Define which department_type values belong to each category
        const categoryMap = {
          administrative: ['admin', 'records', 'it', 'human_resources', 'finance', 'operations'],
          clinical: ['medical', 'surgical', 'emergency', 'critical_care', 'outpatient'],
          support: ['laboratory', 'radiology', 'pharmacy', 'physiotherapy'],
        };

        const allowedTypes = categoryMap[category] || [];
        departments = departments.filter((dept: any) =>
          allowedTypes.includes(dept.department_type)
        );
      }

      return departments;
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  },

  async getRoles(): Promise<Role[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/organizations/roles/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : data.roles || [];
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  },

  async inviteUser(data: InviteUserRequest): Promise<OrganizationUser> {
    try {
      const token = localStorage.getItem('phb_organization_token');
      const response = await fetch(`${API_BASE_URL}/api/organizations/users/invite/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error inviting user:', error);
      throw error;
    }
  },

  async updateUser(userId: string, data: UpdateUserRequest): Promise<OrganizationUser> {
    try {
      const token = localStorage.getItem('phb_organization_token');
      const response = await fetch(`${API_BASE_URL}/api/organizations/users/${userId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  async deleteUser(userId: string): Promise<void> {
    try {
      const token = localStorage.getItem('phb_organization_token');
      const response = await fetch(`${API_BASE_URL}/api/organizations/users/${userId}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },

  async bulkAction(action: 'activate' | 'deactivate' | 'delete', userIds: string[]): Promise<void> {
    try {
      const token = localStorage.getItem('phb_organization_token');
      const response = await fetch(`${API_BASE_URL}/api/organizations/users/bulk-action/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        credentials: 'include',
        body: JSON.stringify({ action, user_ids: userIds }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error performing bulk action:', error);
      throw error;
    }
  },
};