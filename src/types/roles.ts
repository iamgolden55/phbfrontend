// Role Management Types

export interface Role {
  id: string;
  name: string;
  description?: string;

  // Type
  is_system_role: boolean;               // System roles can't be deleted
  is_custom: boolean;

  // Permissions
  permissions: Permission[];

  // Hierarchy
  parent_role?: string;
  inherits_permissions: boolean;

  // Metadata
  user_count: number;
  created_at: string;
  updated_at: string;
}

export interface Permission {
  id: string;
  resource: PermissionResource;
  actions: PermissionAction[];
  scope?: 'own' | 'department' | 'organization';  // Data access scope
}

export type PermissionResource =
  | 'patients'
  | 'appointments'
  | 'medical_records'
  | 'prescriptions'
  | 'lab_results'
  | 'billing'
  | 'staff'
  | 'reports'
  | 'settings'
  | 'users'
  | 'roles'
  | 'templates'
  | 'price_list'
  | 'health_packages';

export type PermissionAction = 'read' | 'write' | 'delete' | 'approve' | 'export';

export interface PermissionCategory {
  name: string;
  description: string;
  resources: PermissionResource[];
}

export const PERMISSION_CATEGORIES: PermissionCategory[] = [
  {
    name: 'Patient Management',
    description: 'Access and manage patient information',
    resources: ['patients', 'medical_records', 'prescriptions']
  },
  {
    name: 'Clinical Operations',
    description: 'Manage appointments and clinical services',
    resources: ['appointments', 'lab_results', 'templates']
  },
  {
    name: 'Financial',
    description: 'Billing and revenue management',
    resources: ['billing', 'price_list', 'health_packages']
  },
  {
    name: 'Administration',
    description: 'System administration and configuration',
    resources: ['staff', 'users', 'roles', 'settings', 'reports']
  }
];

export interface RoleFormData {
  name: string;
  description: string;
  parent_role?: string;
  inherits_permissions: boolean;
  permissions: Map<PermissionResource, Set<PermissionAction>>;
  scope: 'own' | 'department' | 'organization';
}

export interface RoleAssignmentData {
  user_id: string;
  user_name: string;
  user_email: string;
  current_role: string;
  new_role: string;
}

// System role definitions (read-only reference)
export const SYSTEM_ROLES = {
  HOSPITAL_ADMIN: 'hospital_admin',
  DOCTOR: 'doctor',
  NURSE: 'nurse',
  RECEPTIONIST: 'receptionist',
  LAB_TECHNICIAN: 'lab_technician',
  PHARMACIST: 'pharmacist',
  RADIOLOGIST: 'radiologist',
  ACCOUNTANT: 'accountant'
} as const;

export type SystemRoleType = typeof SYSTEM_ROLES[keyof typeof SYSTEM_ROLES];