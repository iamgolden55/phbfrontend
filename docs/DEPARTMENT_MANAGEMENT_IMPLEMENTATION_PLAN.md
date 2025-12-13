# Department Management System - Complete Implementation Plan

**Author**: AI Assistant
**Date**: December 2025
**Status**: Ready for Implementation
**Estimated Timeline**: 18 days (3.6 weeks)
**Priority**: HIGH - Critical gap for hospital operations

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Problem Statement](#problem-statement)
3. [Research & Market Analysis](#research--market-analysis)
4. [Solution Architecture](#solution-architecture)
5. [Implementation Phases](#implementation-phases)
6. [Technical Specifications](#technical-specifications)
7. [Testing Strategy](#testing-strategy)
8. [Critical Files](#critical-files)
9. [Success Criteria](#success-criteria)

---

## Executive Summary

This plan outlines the implementation of a **flexible, hybrid department management system** for the PHB Hospital System. Based on extensive research of NHS UK structures (2023-2025), Nigerian healthcare systems, and modern hospital management software best practices, the solution balances standardization with customization - a critical requirement for international hospital software.

### Key Features
- ✅ Full CRUD operations for hospital departments
- ✅ Intelligent hybrid categorization (predefined + custom types)
- ✅ Automatic pre-seeding for new hospitals
- ✅ Organization Settings integration
- ✅ Soft delete (deactivation) with safeguards
- ✅ Search, filter, sort, bulk actions
- ✅ Export capabilities

---

## Problem Statement

### Current Gaps

**Backend**:
- ❌ NO UPDATE/PATCH endpoints for editing departments
- ❌ NO DELETE endpoints (soft or hard)
- ✅ GET (list/retrieve) and POST (create) exist but limited

**Frontend**:
- ❌ NO department management in Organization Settings
- ❌ Limited UI in WardManagementPage (create/view only, no edit)
- ❌ NO deactivation/soft delete functionality
- ❌ NO search, filter, or bulk operations

**Business Impact**:
- Hospital admins cannot create departments for their organization
- IT Heads, HR Heads, Finance Heads have no departments to be assigned to
- No way to organize staff into proper departmental structure
- System becomes unusable for real hospital operations

### User Requirements (From Discovery)

1. **Location**: Organization Settings page (NOT ward management)
2. **Initialization**: Pre-seed common departments when hospital is created
3. **Edit Scope**: Basic info only (name, description, location, contact) - NO type/code changes
4. **Deletion**: Deactivate instead of delete (soft delete for data integrity)

---

## Research & Market Analysis

### NHS UK Structure (2023-2025)

**Key Findings**:
- 42 Integrated Care Systems (ICSs) established in England (July 2022)
- Departments grouped into 5-7 divisions: Medicine, Surgery, Women's & Children's, Urgent Care, Support
- Triple integration approach: primary/hospital care, physical/mental health, health/social care
- Source: [NHS Structure Guide](https://www.themedicportal.com/application-guide/the-nhs/structure-of-the-nhs/)

**Implications for PHB**:
- Support standard clinical divisions
- Allow flexible departmental categorization
- Enable integration between department types

### Nigeria Healthcare System (2024-2025)

**Key Findings**:
- Three-tier system: Primary (PHCs), Secondary (general/specialist hospitals), Tertiary (teaching hospitals)
- 2,100+ Primary Healthcare Centers upgraded to full functionality in 2024
- Additional 3,000 PHCs in progress for 2025
- ₦37 billion disbursed through Basic Health Care Provision Fund (BHCPF)
- $1.2 billion Sector-Wide Approach (SWAP) initiative launched August 2024
- Source: [Nigeria Healthcare 2024 Report](https://nairametrics.com/2025/01/04/nigerias-healthcare-sector-in-2024-key-milestones-innovations-and-policy-shifts/)

**Implications for PHB**:
- Support different facility types (Clinic, General, Specialized, Tertiary)
- Prioritize maternity/pediatrics departments (Nigeria priorities)
- Enable different seeding profiles per hospital type

### Hospital Management Software Best Practices (2023-2024)

**Key Findings**:
- **"Flexible enough to adapt to changing demands"** - Critical requirement
- **"Numerous modules to suit distinct departmental needs"** - Core feature
- **Customization and flexibility are TOP priorities** in modern HMS
- Cloud-based solutions dominate: 62% of market share in 2023
- Task-based categorization with priority allocation
- Source: [Hospital Management Software Guide](https://adamosoft.com/blog/healthcare-software-development/hospital-management-system/)

**Implications for PHB**:
- Cannot use rigid predefined-only system
- Must support custom department creation
- Need flexible categorization strategy
- Balance structure with adaptability

---

## Solution Architecture

### 1. Intelligent Hybrid Categorization

Based on research findings, we implement a **three-tier categorization system**:

#### Tier 1: Core Predefined Types (Already in Backend)

```typescript
CLINICAL: [
  'medical',         // General medicine
  'surgical',        // General surgery
  'emergency',       // A&E / Emergency department
  'critical_care',   // ICU/HDU
  'outpatient'       // Outpatient clinics
]

SUPPORT: [
  'laboratory',      // Lab services
  'radiology',       // X-ray, ultrasound, CT, MRI
  'pharmacy',        // Inpatient + outpatient dispensary
  'physiotherapy'    // Physical therapy / rehabilitation
]

ADMINISTRATIVE: [
  'admin',           // General administration
  'records',         // Medical records management
  'it',              // Information Technology
  'human_resources', // HR department
  'finance',         // Finance & accounting
  'operations'       // Operations & facilities
]
```

#### Tier 2: Extended Types (UK/Nigeria Markets)

```typescript
EXTENDED_CLINICAL: [
  'pediatrics',      // Child health (Nigeria priority)
  'obstetrics',      // Maternity / Women's health (Nigeria priority)
  'cardiology',      // Heart / cardiovascular
  'oncology',        // Cancer treatment
  'psychiatry',      // Mental health
  'dermatology',     // Skin conditions
  'orthopedics',     // Bone / joint care
  'nephrology',      // Kidney care
  'neurology',       // Brain / nervous system
  'ophthalmology',   // Eye care
  'ent'              // Ear, nose, throat
]

EXTENDED_SUPPORT: [
  'blood_bank',      // Blood transfusion services
  'pathology',       // Disease diagnosis
  'imaging',         // Advanced imaging center
  'dental',          // Dental services
  'nutrition',       // Dietary services
  'rehabilitation'   // Extended rehab services
]

EXTENDED_ADMIN: [
  'quality_assurance',  // NHS compliance / quality control
  'training',           // Staff training & development
  'procurement',        // Supply chain / purchasing
  'facilities'          // Building maintenance
]
```

#### Tier 3: Custom Category

```typescript
CUSTOM: 'custom'  // For unique departments not fitting standard categories
```

**Why This Approach?**

1. ✅ **NHS UK Alignment**: Supports division-based structure
2. ✅ **Nigerian Healthcare Ready**: Accommodates three-tier system
3. ✅ **Research-Backed**: "Flexible enough to adapt" (best practice)
4. ✅ **Future-Proof**: Can add new types without breaking existing data
5. ✅ **International**: Works for UK, Nigeria, and other markets

---

### 2. Smart Department Pre-Seeding

Automatically create departments when a new hospital registers, based on hospital type.

#### Profile 1: Primary Health Centers / Clinics

**Use Case**: Small clinics, community health centers, PHCs

```typescript
CORE_DEPARTMENTS: [
  'outpatient',         // General consultations
  'pharmacy',           // Basic dispensary
  'laboratory',         // Basic lab tests
  'admin'               // Records management
]

RECOMMENDED_DEPARTMENTS: [
  'maternal_health',    // Antenatal/postnatal care (Nigeria priority)
  'immunization'        // Vaccination services
]
```

#### Profile 2: General / Secondary Hospitals

**Use Case**: District hospitals, general hospitals, secondary care facilities

```typescript
CORE_DEPARTMENTS: [
  // Clinical
  'emergency',          // Accident & Emergency
  'outpatient',         // General OPD
  'medical',            // General medicine wards
  'surgical',           // General surgery
  'obstetrics',         // Maternity ward (Nigeria priority)
  'pediatrics',         // Children's ward (Nigeria priority)

  // Support
  'pharmacy',           // Full pharmacy services
  'laboratory',         // Comprehensive lab
  'radiology',          // X-ray, ultrasound

  // Administrative
  'admin',              // General administration
  'records',            // Medical records
  'finance'             // Billing & accounts
]

RECOMMENDED_DEPARTMENTS: [
  'critical_care',      // ICU/HDU
  'physiotherapy',      // Rehabilitation
  'nutrition',          // Dietary services
  'blood_bank'          // Transfusion services
]
```

#### Profile 3: Specialized / Tertiary Hospitals

**Use Case**: Teaching hospitals, specialist centers, tertiary care facilities

```typescript
CORE_DEPARTMENTS: [
  ...GENERAL_HOSPITAL_CORE,  // All general hospital departments

  // Additional specialized departments
  'critical_care',      // ICU (essential for tertiary)
  'cardiology',         // Heart center
  'oncology',           // Cancer treatment
  'nephrology',         // Renal unit
  'pathology',          // Advanced diagnostics
  'quality_assurance',  // NHS compliance
  'training'            // Teaching hospital requirement
]

RECOMMENDED_DEPARTMENTS: [
  'neurology',          // Brain / nerve disorders
  'orthopedics',        // Bone / joint surgery
  'ophthalmology',      // Eye center
  'ent',                // ENT department
  'psychiatry',         // Mental health unit
  'dermatology'         // Skin conditions
]
```

#### Implementation Strategy

```typescript
// On hospital registration/creation:
function seedDepartmentsForHospital(hospital: Hospital) {
  const profile = getDepartmentProfile(hospital.hospital_type);

  // 1. Create core departments automatically
  for (const deptType of profile.core) {
    createDepartment({
      hospital: hospital.id,
      name: getDepartmentName(deptType),
      code: generateDepartmentCode(deptType),
      department_type: deptType,
      ...getDefaultValues(deptType)
    });
  }

  // 2. Show recommended departments for optional addition
  showRecommendedDepartmentsDialog(profile.recommended);
}
```

---

### 3. Backend API Enhancements

#### Current API Status

**Existing Endpoints**:
- ✅ `GET /api/departments/` - List departments (with filters)
- ✅ `GET /api/hospitals/departments/<hospital_id>` - Get hospital departments
- ✅ `POST /api/hospitals/departments/create/` - Create new department

**Missing Endpoints**:
- ❌ `PATCH /api/hospitals/departments/<id>/update/` - Update department
- ❌ `GET /api/hospitals/departments/<id>/` - Get department details
- ❌ Soft delete functionality (deactivation)

#### New Endpoints to Implement

**1. Update Department**

```python
# File: /api/views/hospital/hospital_views.py

@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_department(request, department_id):
    """
    Update department basic information.

    EDITABLE FIELDS:
    - name, description
    - floor_number, wing
    - extension_number, emergency_contact, email
    - operating_hours (if not 24/7)
    - is_active (soft delete/reactivate)

    IMMUTABLE FIELDS (data integrity):
    - department_type, code, hospital

    VALIDATION:
    - Cannot deactivate if current_staff_count > 0
    - Cannot deactivate if current_patient_count > 0
    - Unique name per hospital
    """
    try:
        department = Department.objects.get(id=department_id)

        # Permission check: Only hospital admin
        if request.user.role != 'hospital_admin':
            return Response({'error': 'Unauthorized'}, status=403)

        # Verify user's hospital matches department's hospital
        hospital_admin = HospitalAdmin.objects.get(user=request.user)
        if department.hospital != hospital_admin.hospital:
            return Response({
                'error': 'Cannot edit other hospital departments'
            }, status=403)

        # Immutable fields validation
        IMMUTABLE_FIELDS = ['department_type', 'code', 'hospital']
        for field in IMMUTABLE_FIELDS:
            if field in request.data:
                if request.data[field] != getattr(department, field):
                    return Response({
                        'error': f'Cannot modify {field} after creation',
                        'field': field
                    }, status=400)

        # Deactivation validation
        if 'is_active' in request.data and not request.data['is_active']:
            if department.current_staff_count > 0:
                return Response({
                    'error': 'Cannot deactivate department with assigned staff',
                    'staff_count': department.current_staff_count,
                    'message': 'Please reassign staff members first'
                }, status=400)

            if department.current_patient_count > 0:
                return Response({
                    'error': 'Cannot deactivate department with current patients',
                    'patient_count': department.current_patient_count,
                    'message': 'Please discharge or transfer patients first'
                }, status=400)

        # Unique name validation
        if 'name' in request.data:
            existing = Department.objects.filter(
                hospital=department.hospital,
                name=request.data['name']
            ).exclude(id=department.id)

            if existing.exists():
                return Response({
                    'error': 'Department name already exists in this hospital'
                }, status=400)

        # Update allowed fields
        ALLOWED_FIELDS = [
            'name', 'description', 'floor_number', 'wing',
            'extension_number', 'emergency_contact', 'email',
            'operating_hours', 'is_active'
        ]

        for field in ALLOWED_FIELDS:
            if field in request.data:
                setattr(department, field, request.data[field])

        department.save()

        return Response({
            'status': 'success',
            'message': 'Department updated successfully',
            'department': DepartmentSerializer(department).data
        }, status=200)

    except Department.DoesNotExist:
        return Response({'error': 'Department not found'}, status=404)
    except HospitalAdmin.DoesNotExist:
        return Response({'error': 'Hospital admin profile not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
```

**2. Get Department Details**

```python
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def department_detail(request, department_id):
    """
    Get detailed department information including:
    - Basic info
    - Staff list with roles
    - Current patient count and bed status
    - Budget utilization
    - Operating hours
    - Recent activity
    """
    try:
        department = Department.objects.get(id=department_id)

        # Verify access (must be from same hospital)
        user_hospital = get_user_hospital(request.user)
        if department.hospital != user_hospital:
            return Response({'error': 'Access denied'}, status=403)

        # Get additional details
        staff_list = department.doctors.all()[:10]  # Limit to 10

        return Response({
            'department': DepartmentSerializer(department).data,
            'staff': StaffSerializer(staff_list, many=True).data,
            'staff_count': department.current_staff_count,
            'patient_count': department.current_patient_count,
            'bed_status': {
                'total': department.total_beds,
                'occupied': department.occupied_beds,
                'available': department.available_beds,
                'utilization_rate': department.bed_utilization_rate
            },
            'stats': {
                'is_understaffed': department.is_understaffed,
                'staff_utilization': department.staff_utilization_rate,
                'budget_utilization': department.budget_utilization_rate
            }
        })

    except Department.DoesNotExist:
        return Response({'error': 'Department not found'}, status=404)
```

**3. URL Configuration**

```python
# File: /api/urls.py

urlpatterns = [
    # Existing
    path('api/departments/', departments, name='list_departments'),
    path('api/hospitals/departments/', departments, name='list_create_departments'),
    path('api/hospitals/departments/create/', create_department, name='create_department'),
    path('api/hospitals/departments/<int:hospital_id>/', get_hospital_departments),

    # NEW ENDPOINTS:
    path('api/hospitals/departments/<int:department_id>/detail/', department_detail, name='department_detail'),
    path('api/hospitals/departments/<int:department_id>/update/', update_department, name='update_department'),
]
```

---

### 4. Frontend Component Architecture

```
src/
├── pages/organization/settings/
│   ├── DepartmentManagementPage.tsx    # Main CRUD page
│   └── DepartmentDetailPage.tsx         # Detailed view (optional)
│
├── features/organization/components/Departments/
│   ├── DepartmentListTable.tsx          # Sortable, filterable table
│   ├── DepartmentCard.tsx               # Card view component
│   ├── AddDepartmentModal.tsx           # Creation modal
│   ├── EditDepartmentModal.tsx          # Edit basic info modal
│   ├── DeactivateConfirmModal.tsx       # Soft delete confirmation
│   ├── DepartmentFilters.tsx            # Type, status, location filters
│   ├── DepartmentStats.tsx              # Overview statistics cards
│   └── BulkActionsBar.tsx               # Bulk activate/deactivate
│
├── services/
│   └── departmentService.ts             # API service layer
│
└── types/
    └── department.ts                    # TypeScript interfaces
```

---

### 5. TypeScript Type Definitions

```typescript
// File: src/types/department.ts

export type DepartmentType =
  // Clinical (12 types)
  | 'medical' | 'surgical' | 'emergency' | 'critical_care' | 'outpatient'
  | 'pediatrics' | 'obstetrics' | 'cardiology' | 'oncology' | 'psychiatry'
  | 'dermatology' | 'orthopedics'
  // Support (8 types)
  | 'laboratory' | 'radiology' | 'pharmacy' | 'physiotherapy'
  | 'blood_bank' | 'pathology' | 'imaging' | 'dental'
  // Administrative (10 types)
  | 'admin' | 'records' | 'it' | 'human_resources' | 'finance' | 'operations'
  | 'quality_assurance' | 'training' | 'procurement' | 'facilities'
  // Custom
  | 'custom';

export type Wing = 'north' | 'south' | 'east' | 'west' | 'central';

export interface OperatingHours {
  monday: { start: string; end: string };
  tuesday: { start: string; end: string };
  wednesday: { start: string; end: string };
  thursday: { start: string; end: string };
  friday: { start: string; end: string };
  saturday: { start: string; end: string };
  sunday: { start: string; end: string };
}

export interface Department {
  id: number;
  name: string;
  code: string;
  department_type: DepartmentType;
  description: string;
  is_active: boolean;

  // Location
  floor_number: string;
  wing: Wing;

  // Contact
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

  // Staff
  current_staff_count: number;
  minimum_staff_required: number;
  recommended_staff_ratio: number;
  is_understaffed: boolean;
  staff_utilization_rate: number;

  // Budget
  annual_budget: number;
  budget_year: number;
  budget_utilized: number;
  equipment_budget: number;
  staff_budget: number;
  budget_utilization_rate: number;

  // Classification
  is_clinical: boolean;
  is_support: boolean;
  is_administrative: boolean;
  is_available_for_appointments: boolean;

  // Metadata
  hospital: number;
  created_at?: string;
  updated_at?: string;
}

export interface DepartmentFormData {
  // Required
  name: string;
  code: string;
  department_type: DepartmentType;

  // Location
  floor_number: string;
  wing: Wing;

  // Contact
  extension_number: string;
  emergency_contact: string;
  email: string;

  // Operations
  is_24_hours: boolean;
  operating_hours?: OperatingHours;

  // Capacity (optional for clinical)
  total_beds?: number;
  icu_beds?: number;
  minimum_staff_required: number;

  // Description
  description: string;
}

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
```

---

### 6. API Service Layer

```typescript
// File: src/services/departmentService.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const DepartmentService = {
  /**
   * List all departments for the authenticated user's hospital
   */
  async listDepartments(params?: {
    search?: string;
    type?: string;
    status?: 'active' | 'inactive' | 'all';
    page?: number;
    limit?: number;
  }): Promise<{ departments: Department[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.search) queryParams.append('search', params.search);
      if (params?.type) queryParams.append('department_type', params.type);
      if (params?.status && params.status !== 'all') {
        queryParams.append('is_active', params.status === 'active' ? 'true' : 'false');
      }
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const queryString = queryParams.toString();
      const url = queryString
        ? `${API_BASE_URL}/api/departments/?${queryString}`
        : `${API_BASE_URL}/api/departments/`;

      const response = await fetch(url, {
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
      return {
        departments: Array.isArray(data) ? data : data.departments || [],
        total: data.total || data.length || 0
      };
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  },

  /**
   * Get detailed information about a specific department
   */
  async getDepartmentDetail(departmentId: number): Promise<{
    department: Department;
    staff: any[];
    stats: any;
  }> {
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching department details:', error);
      throw error;
    }
  },

  /**
   * Create a new department
   */
  async createDepartment(data: DepartmentFormData): Promise<Department> {
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
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create department');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating department:', error);
      throw error;
    }
  },

  /**
   * Update department basic information
   */
  async updateDepartment(
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
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update department');
      }

      const result = await response.json();
      return result.department;
    } catch (error) {
      console.error('Error updating department:', error);
      throw error;
    }
  },

  /**
   * Deactivate a department (soft delete)
   */
  async deactivateDepartment(departmentId: number): Promise<Department> {
    return this.updateDepartment(departmentId, { is_active: false });
  },

  /**
   * Reactivate a department
   */
  async reactivateDepartment(departmentId: number): Promise<Department> {
    return this.updateDepartment(departmentId, { is_active: true });
  },

  /**
   * Check if department can be safely deactivated
   */
  async canDeactivate(departmentId: number): Promise<{
    canDeactivate: boolean;
    reason?: string;
    staff_count?: number;
    patient_count?: number;
  }> {
    try {
      const { department, stats } = await this.getDepartmentDetail(departmentId);

      if (department.current_staff_count > 0) {
        return {
          canDeactivate: false,
          reason: `Cannot deactivate: ${department.current_staff_count} staff member(s) currently assigned. Please reassign staff first.`,
          staff_count: department.current_staff_count
        };
      }

      if (department.current_patient_count > 0) {
        return {
          canDeactivate: false,
          reason: `Cannot deactivate: ${department.current_patient_count} patient(s) currently in department. Please discharge or transfer patients first.`,
          patient_count: department.current_patient_count
        };
      }

      return { canDeactivate: true };
    } catch (error) {
      console.error('Error checking deactivation:', error);
      throw error;
    }
  },

  /**
   * Get department statistics
   */
  async getDepartmentStats(): Promise<DepartmentStats> {
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
        bed_utilization_rate: departments.length > 0
          ? departments.reduce((sum, d) => sum + (d.bed_utilization_rate || 0), 0) / departments.length
          : 0,
        total_staff: departments.reduce((sum, d) => sum + (d.current_staff_count || 0), 0),
        understaffed_departments: departments.filter(d => d.is_understaffed).length,
      };
    } catch (error) {
      console.error('Error fetching department stats:', error);
      throw error;
    }
  },
};
```

---

### 7. Key Component Designs

#### DepartmentManagementPage

**Features**:
- Department list table with sorting, filtering, pagination
- Search by name or code
- Filter by type (Clinical/Support/Administrative/Custom)
- Filter by status (Active/Inactive)
- Filter by location (Floor/Wing)
- Bulk actions (activate/deactivate multiple)
- Add department button
- Export to CSV/Excel
- Statistics overview cards

**State Management**:
```typescript
interface DepartmentManagementPageState {
  departments: Department[];
  loading: boolean;
  error: string | null;

  // Filters
  searchQuery: string;
  typeFilter: DepartmentType | 'all';
  statusFilter: 'active' | 'inactive' | 'all';
  locationFilter: Wing | 'all';

  // UI State
  viewMode: 'table' | 'cards';
  showAddModal: boolean;
  showEditModal: boolean;
  editingDepartment: Department | null;
  showDeactivateModal: boolean;
  deactivatingDepartment: Department | null;

  // Selection
  selectedDepartments: Set<number>;
}
```

#### AddDepartmentModal

**Features**:
- Multi-section form (Basic Info, Location, Contact, Operations, Capacity)
- Smart defaults based on department type
- Dynamic fields (show/hide beds based on is_clinical)
- Operating hours configuration
- Validation (unique name/code, format checks)
- Help text and tooltips

**Form Validation**:
```typescript
const validateDepartment = (data: DepartmentFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Name: 3-100 characters, required
  if (!data.name?.trim()) {
    errors.name = 'Department name is required';
  } else if (data.name.length < 3) {
    errors.name = 'Name must be at least 3 characters';
  } else if (data.name.length > 100) {
    errors.name = 'Name must be less than 100 characters';
  }

  // Code: 2-20 uppercase alphanumeric + hyphens, required
  if (!data.code?.trim()) {
    errors.code = 'Department code is required';
  } else if (!/^[A-Z0-9-]{2,20}$/.test(data.code)) {
    errors.code = 'Code must be 2-20 uppercase letters, numbers, or hyphens';
  }

  // Email: Valid format (optional)
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }

  // Phone: Nigerian format (optional)
  if (data.emergency_contact &&
      !/^(\+234|0)[789]\d{9}$/.test(data.emergency_contact.replace(/\s/g, ''))) {
    errors.emergency_contact = 'Invalid Nigerian phone number (e.g., 08012345678 or +2348012345678)';
  }

  // Operating hours: End time > Start time
  if (!data.is_24_hours && data.operating_hours) {
    for (const day of Object.keys(data.operating_hours)) {
      const hours = data.operating_hours[day];
      if (hours.start >= hours.end) {
        errors[`operating_hours_${day}`] = 'End time must be after start time';
      }
    }
  }

  return errors;
};
```

#### EditDepartmentModal

**Features**:
- Pre-filled form with existing data
- Read-only fields: Type, Code (greyed out with tooltip)
- Editable: Name, Description, Location, Contact, Hours
- Validation before save
- Show warning if changes affect existing data

#### DeactivateConfirmModal

**Features**:
- Check staff assignment count
- Check current patient count
- Show impact warning with counts
- Block deactivation if staff/patients assigned
- Suggest actions (reassign staff, transfer patients)
- Confirm button (danger styling)

---

## Implementation Phases

### Phase 1: Backend Foundation (Days 1-3)

**Tasks**:
- [x] Add `update_department` endpoint in `hospital_views.py`
- [x] Add `department_detail` endpoint
- [x] Implement validation for immutable fields
- [x] Add staff/patient assignment checks for deactivation
- [x] Update URL configuration
- [ ] Test API endpoints with Postman/Thunder Client
- [ ] Document API changes in README

**Deliverables**:
- Working UPDATE/PATCH endpoint
- Working GET detail endpoint
- Unit tests for validation logic
- API documentation

---

### Phase 2: TypeScript Types & Service (Days 4-5)

**Tasks**:
- [x] Create `src/types/department.ts` with all interfaces
- [x] Create `src/services/departmentService.ts` with CRUD methods
- [x] Add error handling and type guards
- [ ] Write unit tests for service layer
- [x] Add JSDoc comments

**Deliverables**:
- Complete type definitions
- Complete service layer
- Unit tests for service methods

---

### Phase 3: Core Components (Days 6-10)

**Tasks**:
- [ ] Build DepartmentListTable component (Day 6)
- [ ] Build DepartmentFilters component (Day 6)
- [ ] Build DepartmentStats component (Day 7)
- [ ] Build AddDepartmentModal component (Day 8)
- [ ] Build EditDepartmentModal component (Day 9)
- [ ] Build DeactivateConfirmModal component (Day 9)
- [ ] Build BulkActionsBar component (Day 10)
- [ ] Add responsive styling

**Deliverables**:
- 7 reusable components
- Component unit tests
- Storybook stories (optional)

---

### Phase 4: Main Page Integration (Days 11-13)

**Tasks**:
- [ ] Create DepartmentManagementPage (Day 11)
- [ ] Integrate all components
- [ ] Add to Organization Settings (Day 12)
- [ ] Add route in App.tsx
- [ ] Implement search, filter, sort logic (Day 12)
- [ ] Add export functionality (Day 13)
- [ ] Add responsive design and mobile optimization

**Deliverables**:
- Complete DepartmentManagementPage
- Settings integration
- Working search, filter, sort
- Export to CSV/Excel

---

### Phase 5: Testing & Refinement (Days 14-15)

**Tasks**:
- [ ] User acceptance testing with hospital admins (Day 14)
- [ ] Fix bugs and edge cases
- [ ] Performance optimization (pagination, caching) (Day 15)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Cross-browser testing
- [ ] Mobile testing

**Deliverables**:
- Bug-free application
- Performance benchmarks met
- Accessibility compliance

---

### Phase 6: Documentation & Migration (Days 16-18)

**Tasks**:
- [ ] Write user documentation (Day 16)
- [ ] Create admin guide with screenshots
- [ ] Implement WardManagementPage migration (Day 17)
- [ ] Add deprecation notice to old page
- [ ] Train support staff (Day 18)
- [ ] Create video tutorial (optional)

**Deliverables**:
- User documentation
- Admin guide
- Migration complete
- Support staff trained

---

## Testing Strategy

### Unit Tests

```typescript
// Service layer tests
describe('DepartmentService', () => {
  test('creates department with valid data', async () => {
    const newDept = await DepartmentService.createDepartment({
      name: 'Test Department',
      code: 'TEST-01',
      department_type: 'medical',
      floor_number: '1',
      wing: 'north',
      extension_number: '101',
      emergency_contact: '08012345678',
      email: 'test@hospital.com',
      is_24_hours: true,
      minimum_staff_required: 5,
      description: 'Test department'
    });

    expect(newDept.id).toBeDefined();
    expect(newDept.name).toBe('Test Department');
  });

  test('prevents duplicate department names', async () => {
    await expect(
      DepartmentService.createDepartment({
        name: 'Existing Department',
        ...otherData
      })
    ).rejects.toThrow('Department name already exists');
  });

  test('updates only allowed fields', async () => {
    const updated = await DepartmentService.updateDepartment(1, {
      name: 'New Name',
      department_type: 'medical'  // Should be ignored (immutable)
    });

    expect(updated.name).toBe('New Name');
    expect(updated.department_type).toBe('surgical'); // Unchanged
  });

  test('blocks deactivation with assigned staff', async () => {
    const canDeactivate = await DepartmentService.canDeactivate(1);

    expect(canDeactivate.canDeactivate).toBe(false);
    expect(canDeactivate.staff_count).toBeGreaterThan(0);
    expect(canDeactivate.reason).toContain('staff member');
  });
});
```

### Integration Tests

```typescript
describe('Department Management Workflow', () => {
  test('complete department lifecycle', async () => {
    // 1. Create
    const dept = await createDepartment({
      name: 'Cardiology',
      code: 'CARD-01',
      department_type: 'cardiology',
      ...otherData
    });
    expect(dept.id).toBeDefined();

    // 2. Read
    const fetched = await getDepartmentDetail(dept.id);
    expect(fetched.department.name).toBe('Cardiology');

    // 3. Update
    const updated = await updateDepartment(dept.id, {
      name: 'Cardiology Department',
      floor_number: '2'
    });
    expect(updated.name).toBe('Cardiology Department');
    expect(updated.floor_number).toBe('2');

    // 4. Deactivate
    const deactivated = await deactivateDepartment(dept.id);
    expect(deactivated.is_active).toBe(false);

    // 5. Reactivate
    const reactivated = await reactivateDepartment(dept.id);
    expect(reactivated.is_active).toBe(true);
  });

  test('search and filter workflow', async () => {
    // Search by name
    const searchResults = await listDepartments({ search: 'card' });
    expect(searchResults.departments.length).toBeGreaterThan(0);
    expect(searchResults.departments[0].name.toLowerCase()).toContain('card');

    // Filter by type
    const clinicalDepts = await listDepartments({ type: 'clinical' });
    expect(clinicalDepts.departments.every(d => d.is_clinical)).toBe(true);

    // Filter by status
    const activeDepts = await listDepartments({ status: 'active' });
    expect(activeDepts.departments.every(d => d.is_active)).toBe(true);
  });
});
```

### Manual Test Cases

**Functional Tests**:
- [ ] Create department (all types: clinical, support, administrative, custom)
- [ ] Edit department (verify immutable fields are locked)
- [ ] Deactivate department with staff (should block)
- [ ] Deactivate department without staff (should succeed)
- [ ] Reactivate deactivated department
- [ ] Search by name (partial match)
- [ ] Search by code (exact match)
- [ ] Filter by type (Clinical/Support/Administrative)
- [ ] Filter by status (Active/Inactive)
- [ ] Filter by location (Floor/Wing)
- [ ] Sort by each column (name, type, beds, staff)
- [ ] Bulk select departments
- [ ] Bulk activate selected departments
- [ ] Bulk deactivate selected departments
- [ ] Export to CSV
- [ ] Export to Excel

**Permission Tests**:
- [ ] Non-admin user cannot access department management
- [ ] Admin can only view/edit departments from their own hospital
- [ ] Cannot edit other hospital's departments (should show error)
- [ ] Session timeout redirects to login

**Edge Cases**:
- [ ] Create department with duplicate name (should block)
- [ ] Create department with duplicate code (should block)
- [ ] Create department with invalid email format
- [ ] Create department with invalid phone format
- [ ] Update department to existing name (should block)
- [ ] Deactivate department with patients (should block)
- [ ] Try to change department type via edit (should ignore)
- [ ] Try to change department code via edit (should ignore)
- [ ] Empty search returns all departments
- [ ] No matching search shows empty state
- [ ] No departments exist shows empty state with "Create First Department" CTA

**Performance Tests**:
- [ ] Page loads in < 2 seconds with 100 departments
- [ ] Search returns results in < 500ms
- [ ] Filter updates in < 200ms
- [ ] Table renders smoothly with 500+ departments (pagination)

**Accessibility Tests**:
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader announces all elements correctly
- [ ] Focus indicators are visible
- [ ] Color contrast meets WCAG 2.1 AA
- [ ] Form labels are associated with inputs
- [ ] Error messages are announced

---

## Critical Files

### Backend (NEW/MODIFY)

1. **`/Users/new/.claude-worktrees/basebackend/sleepy-hoover/api/views/hospital/hospital_views.py`**
   - Add `update_department` function
   - Add `department_detail` function
   - Priority: **HIGH**

2. **`/Users/new/.claude-worktrees/basebackend/sleepy-hoover/api/urls.py`**
   - Add routes for new endpoints
   - Priority: **HIGH**

3. **`/Users/new/.claude-worktrees/basebackend/sleepy-hoover/api/models/medical/department.py`**
   - Verify model structure (existing, no changes needed)
   - Priority: **LOW** (review only)

---

### Frontend (NEW)

1. **`/Users/new/phbfinal/phbfrontend/src/pages/organization/settings/DepartmentManagementPage.tsx`**
   - Main department management page
   - Priority: **HIGH**

2. **`/Users/new/phbfinal/phbfrontend/src/features/organization/components/Departments/AddDepartmentModal.tsx`**
   - Department creation modal
   - Priority: **HIGH**

3. **`/Users/new/phbfinal/phbfrontend/src/features/organization/components/Departments/EditDepartmentModal.tsx`**
   - Department edit modal
   - Priority: **HIGH**

4. **`/Users/new/phbfinal/phbfrontend/src/features/organization/components/Departments/DepartmentListTable.tsx`**
   - Department list table with sorting/filtering
   - Priority: **HIGH**

5. **`/Users/new/phbfinal/phbfrontend/src/features/organization/components/Departments/DeactivateConfirmModal.tsx`**
   - Deactivation confirmation modal
   - Priority: **MEDIUM**

6. **`/Users/new/phbfinal/phbfrontend/src/features/organization/components/Departments/DepartmentFilters.tsx`**
   - Filter component
   - Priority: **MEDIUM**

7. **`/Users/new/phbfinal/phbfrontend/src/features/organization/components/Departments/DepartmentStats.tsx`**
   - Statistics overview component
   - Priority: **LOW**

8. **`/Users/new/phbfinal/phbfrontend/src/services/departmentService.ts`**
   - API service layer
   - Priority: **HIGH**

9. **`/Users/new/phbfinal/phbfrontend/src/types/department.ts`**
   - TypeScript type definitions
   - Priority: **HIGH**

---

### Frontend (MODIFY)

1. **`/Users/new/phbfinal/phbfrontend/src/pages/organization/settings/OrganizationSettingsPage.tsx`**
   - Add department management card
   - Priority: **MEDIUM**

2. **`/Users/new/phbfinal/phbfrontend/src/App.tsx`**
   - Add route for `/organization/settings/departments`
   - Priority: **MEDIUM**

3. **`/Users/new/phbfinal/phbfrontend/src/layouts/ModernOrganizationLayout.tsx`**
   - Optional: Add sidebar link for departments
   - Priority: **LOW**

---

## Success Criteria

### Must Have (MVP)
- ✅ Create departments with all required fields
- ✅ Edit basic information (name, description, location, contact, hours)
- ✅ Cannot edit type or code (data integrity preserved)
- ✅ Soft delete (deactivate) with validation
- ✅ Cannot deactivate with assigned staff or patients
- ✅ Search departments by name or code
- ✅ Filter by type, status, location
- ✅ Sort by any column
- ✅ Integration with organization settings
- ✅ Pre-seeding for new hospitals

### Should Have
- ✅ View department details and statistics
- ✅ Bulk actions (activate/deactivate multiple departments)
- ✅ Export functionality (CSV/Excel)
- ✅ Card view option (in addition to table view)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessibility compliance (WCAG 2.1 AA)

### Nice to Have
- Department templates (pre-defined department sets)
- Department hierarchy/relationships
- Budget tracking in UI
- Staff assignment directly from department page
- Department performance dashboard
- Department comparison view

---

## Security Considerations

1. **Role-Based Access**:
   - Only `hospital_admin` role can create/edit departments
   - Other roles can view only

2. **Hospital Isolation**:
   - Admins can only manage departments from their own hospital
   - Cross-hospital access denied

3. **Audit Logging**:
   - Track all department changes (create, update, deactivate)
   - Include: user, timestamp, action, old values, new values

4. **Soft Delete**:
   - No hard deletes - preserve historical data
   - Deactivated departments hidden from dropdowns but accessible via filters

5. **Data Integrity**:
   - Immutable fields cannot be changed after creation
   - Validation on both frontend and backend
   - Prevent deactivation with assigned staff/patients

---

## Performance Considerations

1. **Pagination**:
   - 20 departments per page by default
   - User can adjust (10, 20, 50, 100)

2. **Lazy Loading**:
   - Department details loaded on-demand
   - Statistics calculated on backend

3. **Caching**:
   - Cache department list for 5 minutes
   - Invalidate on create/update/delete

4. **Optimistic Updates**:
   - Update UI immediately, rollback on error
   - Show loading state during API call

5. **Search Optimization**:
   - Debounced search input (300ms delay)
   - Backend search index on name and code

---

## Migration from WardManagementPage

### Strategy: Graceful 5-Week Transition

**Week 1**: Create new DepartmentManagementPage with full CRUD
**Week 2**: Add cross-links between pages ("Manage in Settings" button)
**Week 3**: Achieve feature parity (add bed management view to new page)
**Week 4**: Redirect old page with "You've been redirected" message
**Week 5**: Remove old WardManagementPage after user adaptation period

### Communication Plan

1. **In-App Notification**: "Department management has moved to Organization Settings for better organization"
2. **Email to Admins**: Explain new location and benefits
3. **Tooltip/Banner**: Show for 2 weeks on old page before redirect

---

## Resources & Sources

### Research Sources

1. **NHS UK Structure**: [How The NHS in England Works](https://www.themedicportal.com/application-guide/the-nhs/structure-of-the-nhs/)
2. **Nigeria Healthcare 2024**: [Key Milestones and Policy Shifts](https://nairametrics.com/2025/01/04/nigerias-healthcare-sector-in-2024-key-milestones-innovations-and-policy-shifts/)
3. **Hospital Management Software**: [Comprehensive Guide](https://adamosoft.com/blog/healthcare-software-development/hospital-management-system/)

### Key Documents

1. **Department Model**: `/Users/new/.claude-worktrees/basebackend/sleepy-hoover/api/models/medical/department.py`
2. **Hospital Views**: `/Users/new/.claude-worktrees/basebackend/sleepy-hoover/api/views/hospital/hospital_views.py`
3. **Existing Ward Management**: `/Users/new/phbfinal/phbfrontend/src/pages/organization/WardManagementPage.tsx`

---

## Conclusion

This comprehensive plan provides a complete roadmap for implementing a flexible, research-backed department management system that serves both UK and Nigerian healthcare markets. The hybrid categorization approach balances standardization with customization, while the smart pre-seeding strategy ensures rapid hospital onboarding.

**Timeline**: 18 days (3.6 weeks)
**Priority**: HIGH
**Dependencies**: Backend API updates must complete before frontend Phase 4

The implementation is broken down into 6 clear phases with specific deliverables, making it easy to track progress and ensure quality at each stage.

---

**Next Steps**:
1. Review and approve this plan
2. Begin Phase 1: Backend Foundation
3. Parallel work: Create TypeScript types while backend is in development
4. Follow phase-by-phase implementation
5. Test thoroughly at each phase
6. Deploy with migration strategy
