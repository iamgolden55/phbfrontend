/**
 * Department Management Type Definitions
 *
 * Comprehensive TypeScript interfaces for the PHB Hospital Department Management System.
 * Based on NHS UK structures, Nigerian healthcare systems, and hospital management best practices.
 *
 * @author AI Assistant
 * @date December 2025
 */

/**
 * Department Type Classification
 *
 * Three-tier categorization system:
 * - Clinical: Patient-facing medical departments (12 types)
 * - Support: Medical support services (8 types)
 * - Administrative: Management and operations (10 types)
 * - Custom: User-defined departments
 */
export type DepartmentType =
  // Clinical Departments (12 types)
  | 'medical'           // General medicine
  | 'surgical'          // General surgery
  | 'emergency'         // A&E / Emergency department
  | 'critical_care'     // ICU/HDU
  | 'outpatient'        // Outpatient clinics
  | 'pediatrics'        // Child health (Nigeria priority)
  | 'obstetrics'        // Maternity / Women's health (Nigeria priority)
  | 'cardiology'        // Heart / cardiovascular
  | 'oncology'          // Cancer treatment
  | 'psychiatry'        // Mental health
  | 'dermatology'       // Skin conditions
  | 'orthopedics'       // Bone / joint care
  | 'nephrology'        // Kidney care
  | 'neurology'         // Brain / nervous system
  | 'ophthalmology'     // Eye care
  | 'ent'               // Ear, nose, throat
  // Support Departments (8 types)
  | 'laboratory'        // Lab services
  | 'radiology'         // X-ray, ultrasound, CT, MRI
  | 'pharmacy'          // Inpatient + outpatient dispensary
  | 'physiotherapy'     // Physical therapy / rehabilitation
  | 'blood_bank'        // Blood transfusion services
  | 'pathology'         // Disease diagnosis
  | 'imaging'           // Advanced imaging center
  | 'dental'            // Dental services
  | 'nutrition'         // Dietary services
  | 'rehabilitation'    // Extended rehab services
  // Administrative Departments (10 types)
  | 'admin'             // General administration
  | 'records'           // Medical records management
  | 'it'                // Information Technology
  | 'human_resources'   // HR department
  | 'finance'           // Finance & accounting
  | 'operations'        // Operations & facilities
  | 'quality_assurance' // NHS compliance / quality control
  | 'training'          // Staff training & development
  | 'procurement'       // Supply chain / purchasing
  | 'facilities'        // Building maintenance
  // Custom
  | 'custom';           // User-defined departments

/**
 * Wing/Location Classification
 */
export type Wing = 'north' | 'south' | 'east' | 'west' | 'central';

/**
 * Operating Hours Structure
 * Defines daily operational hours for each day of the week
 */
export interface OperatingHours {
  monday: { start: string; end: string };
  tuesday: { start: string; end: string };
  wednesday: { start: string; end: string };
  thursday: { start: string; end: string };
  friday: { start: string; end: string };
  saturday: { start: string; end: string };
  sunday: { start: string; end: string };
}

/**
 * Staff Member Interface (simplified for department context)
 */
export interface DepartmentStaff {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
}

/**
 * Bed Status Information
 */
export interface BedStatus {
  total: number;
  occupied: number;
  available: number;
  icu_total: number;
  icu_occupied: number;
  icu_available: number;
  utilization_rate: number;
}

/**
 * Department Statistics
 */
export interface DepartmentDetailStats {
  is_understaffed: boolean;
  staff_utilization: number;
  budget_utilization: number;
  is_clinical: boolean;
  is_support: boolean;
  is_administrative: boolean;
  is_available_for_appointments: boolean;
}

/**
 * Complete Department Interface
 * Represents a hospital department with all fields from the backend model
 */
export interface Department {
  // Identifiers
  id: number;
  name: string;
  code: string;
  department_type: DepartmentType;
  description: string;
  is_active: boolean;

  // Location
  floor_number: string;
  wing: Wing;

  // Contact Information
  extension_number: string;
  emergency_contact: string;
  email: string;

  // Operations
  is_24_hours: boolean;
  operating_hours: OperatingHours;

  // Capacity (clinical departments)
  total_beds: number;
  occupied_beds: number;
  available_beds: number;
  icu_beds: number;
  occupied_icu_beds: number;
  available_icu_beds: number;
  bed_capacity: number;
  bed_utilization_rate: number;

  // Staff Management
  current_staff_count: number;
  minimum_staff_required: number;
  recommended_staff_ratio: number;
  is_understaffed: boolean;
  staff_utilization_rate: number;

  // Budget (optional - may not be exposed to all users)
  annual_budget?: number;
  budget_year?: number;
  budget_utilized?: number;
  equipment_budget?: number;
  staff_budget?: number;
  budget_utilization_rate?: number;

  // Classification Properties
  is_clinical: boolean;
  is_support: boolean;
  is_administrative: boolean;
  is_available_for_appointments: boolean;

  // Metadata
  hospital: number;
  hospital_name?: string; // From serializer
  created_at?: string;
  updated_at?: string;
  current_patient_count?: number; // May not always be available
}

/**
 * Department Form Data
 * Data structure for creating/editing departments
 */
export interface DepartmentFormData {
  // Required Fields
  name: string;
  code: string;
  department_type: DepartmentType;
  description: string;

  // Location (required)
  floor_number: string;
  wing: Wing;

  // Contact (required)
  extension_number: string;
  emergency_contact: string;
  email: string;

  // Operations (required)
  is_24_hours: boolean;
  operating_hours?: OperatingHours; // Optional if is_24_hours is true

  // Capacity (optional - for clinical departments)
  total_beds?: number;
  icu_beds?: number;
  bed_capacity?: number;

  // Staffing (required)
  minimum_staff_required: number;

  // Status (optional - defaults to true)
  is_active?: boolean;

  // Hospital (usually set automatically from context)
  hospital?: number;
}

/**
 * Department Detail Response
 * Extended department information returned by the detail endpoint
 */
export interface DepartmentDetailResponse {
  status: 'success' | 'error';
  department: Department;
  staff: DepartmentStaff[];
  staff_count: number;
  patient_count: number;
  bed_status: BedStatus;
  stats: DepartmentDetailStats;
}

/**
 * Department List Response
 * Response from list departments endpoint
 */
export interface DepartmentListResponse {
  departments?: Department[];
  total?: number;
  // Alternative response format (array directly)
  0?: Department;
  length?: number;
}

/**
 * Department Statistics Overview
 * Aggregate statistics across all departments
 */
export interface DepartmentStats {
  total_departments: number;
  active_departments: number;
  inactive_departments: number;
  clinical_departments: number;
  support_departments: number;
  administrative_departments: number;
  total_beds: number;
  available_beds: number;
  bed_utilization_rate: number;
  total_staff: number;
  understaffed_departments: number;
}

/**
 * Department Filter Parameters
 */
export interface DepartmentFilters {
  search?: string;
  department_type?: DepartmentType | 'all';
  is_active?: boolean | 'all';
  wing?: Wing | 'all';
  floor_number?: string | 'all';
  is_clinical?: boolean;
  is_support?: boolean;
  is_administrative?: boolean;
}

/**
 * Department Sort Options
 */
export type DepartmentSortField =
  | 'name'
  | 'code'
  | 'department_type'
  | 'total_beds'
  | 'current_staff_count'
  | 'bed_utilization_rate'
  | 'is_active'
  | 'created_at';

export type SortOrder = 'asc' | 'desc';

export interface DepartmentSortConfig {
  field: DepartmentSortField;
  order: SortOrder;
}

/**
 * API Error Response
 */
export interface DepartmentAPIError {
  status: 'error';
  message: string;
  detail?: string;
  field?: string;
  errors?: Record<string, string[]>;
}

/**
 * Deactivation Check Result
 */
export interface DeactivationCheckResult {
  canDeactivate: boolean;
  reason?: string;
  staff_count?: number;
  patient_count?: number;
}

/**
 * Department Type Categories
 * Helper for grouping department types
 */
export const DEPARTMENT_TYPE_CATEGORIES = {
  CLINICAL: [
    'medical', 'surgical', 'emergency', 'critical_care', 'outpatient',
    'pediatrics', 'obstetrics', 'cardiology', 'oncology', 'psychiatry',
    'dermatology', 'orthopedics', 'nephrology', 'neurology',
    'ophthalmology', 'ent'
  ] as const,

  SUPPORT: [
    'laboratory', 'radiology', 'pharmacy', 'physiotherapy',
    'blood_bank', 'pathology', 'imaging', 'dental',
    'nutrition', 'rehabilitation'
  ] as const,

  ADMINISTRATIVE: [
    'admin', 'records', 'it', 'human_resources', 'finance', 'operations',
    'quality_assurance', 'training', 'procurement', 'facilities'
  ] as const,

  CUSTOM: ['custom'] as const
} as const;

/**
 * Department Type Display Names
 */
export const DEPARTMENT_TYPE_LABELS: Record<DepartmentType, string> = {
  // Clinical
  medical: 'General Medicine',
  surgical: 'General Surgery',
  emergency: 'Emergency / A&E',
  critical_care: 'Critical Care / ICU',
  outpatient: 'Outpatient Clinic',
  pediatrics: 'Pediatrics',
  obstetrics: 'Obstetrics / Maternity',
  cardiology: 'Cardiology',
  oncology: 'Oncology',
  psychiatry: 'Psychiatry',
  dermatology: 'Dermatology',
  orthopedics: 'Orthopedics',
  nephrology: 'Nephrology',
  neurology: 'Neurology',
  ophthalmology: 'Ophthalmology',
  ent: 'ENT',

  // Support
  laboratory: 'Laboratory Services',
  radiology: 'Radiology / Imaging',
  pharmacy: 'Pharmacy',
  physiotherapy: 'Physiotherapy',
  blood_bank: 'Blood Bank',
  pathology: 'Pathology',
  imaging: 'Advanced Imaging',
  dental: 'Dental Services',
  nutrition: 'Nutrition / Dietary',
  rehabilitation: 'Rehabilitation',

  // Administrative
  admin: 'Administration',
  records: 'Medical Records',
  it: 'Information Technology',
  human_resources: 'Human Resources',
  finance: 'Finance',
  operations: 'Operations',
  quality_assurance: 'Quality Assurance',
  training: 'Training & Development',
  procurement: 'Procurement',
  facilities: 'Facilities Management',

  // Custom
  custom: 'Custom Department'
};

/**
 * Wing Display Names
 */
export const WING_LABELS: Record<Wing, string> = {
  north: 'North Wing',
  south: 'South Wing',
  east: 'East Wing',
  west: 'West Wing',
  central: 'Central Wing'
};

/**
 * Default Operating Hours (24/7)
 */
export const DEFAULT_24_7_HOURS: OperatingHours = {
  monday: { start: '00:00', end: '23:59' },
  tuesday: { start: '00:00', end: '23:59' },
  wednesday: { start: '00:00', end: '23:59' },
  thursday: { start: '00:00', end: '23:59' },
  friday: { start: '00:00', end: '23:59' },
  saturday: { start: '00:00', end: '23:59' },
  sunday: { start: '00:00', end: '23:59' }
};

/**
 * Default Business Hours (Mon-Fri, 8am-5pm)
 * Note: For closed days (Sat/Sun), using 00:00-00:01 satisfies backend validation
 * that requires end time > start time, while still indicating minimal/closed hours
 */
export const DEFAULT_BUSINESS_HOURS: OperatingHours = {
  monday: { start: '08:00', end: '17:00' },
  tuesday: { start: '08:00', end: '17:00' },
  wednesday: { start: '08:00', end: '17:00' },
  thursday: { start: '08:00', end: '17:00' },
  friday: { start: '08:00', end: '17:00' },
  saturday: { start: '00:00', end: '00:01' },
  sunday: { start: '00:00', end: '00:01' }
};

/**
 * Type guard for checking if a department type is clinical
 */
export function isClinicalDepartment(type: DepartmentType): boolean {
  return DEPARTMENT_TYPE_CATEGORIES.CLINICAL.includes(type as any);
}

/**
 * Type guard for checking if a department type is support
 */
export function isSupportDepartment(type: DepartmentType): boolean {
  return DEPARTMENT_TYPE_CATEGORIES.SUPPORT.includes(type as any);
}

/**
 * Type guard for checking if a department type is administrative
 */
export function isAdministrativeDepartment(type: DepartmentType): boolean {
  return DEPARTMENT_TYPE_CATEGORIES.ADMINISTRATIVE.includes(type as any);
}

/**
 * Get department category label
 */
export function getDepartmentCategory(type: DepartmentType): 'Clinical' | 'Support' | 'Administrative' | 'Custom' {
  if (isClinicalDepartment(type)) return 'Clinical';
  if (isSupportDepartment(type)) return 'Support';
  if (isAdministrativeDepartment(type)) return 'Administrative';
  return 'Custom';
}
