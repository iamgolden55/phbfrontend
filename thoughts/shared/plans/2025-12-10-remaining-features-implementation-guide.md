---
date: 2025-12-10T20:00:00+0000
author: Claude (Sonnet 4.5)
status: ready_for_implementation
priority: critical
tags: [implementation-plan, templates, clinical-notes, user-management, pricing]
related_research: thoughts/shared/research/2025-12-10-organization-dashboard-missing-features.md
related_plans:
  - thoughts/shared/plans/2025-12-10-organization-settings-hub-implementation.md
  - thoughts/shared/plans/2025-12-10-organization-profile-page-implementation.md
---

# Comprehensive Implementation Guide: Remaining Critical Features

This document provides detailed implementation specifications for the remaining high-priority features identified in the organization dashboard gap analysis.

## Table of Contents

1. [Template Library & Builder System](#template-library--builder-system)
2. [User & Role Management](#user--role-management)
3. [Price List & Health Packages](#price-list--health-packages)
4. [Structured Clinical Notes (SOAP/DAP)](#structured-clinical-notes-soapdap)

---

# 1. Template Library & Builder System

**Priority**: 🔥 Very High
**Complexity**: Very High
**Estimated Effort**: 4-6 weeks
**Impact**: Transforms clinical documentation workflow

## Overview

Create a comprehensive template management system similar to Medesk's template library, enabling organizations to:
- Organize templates by location of use and by role
- Build custom consultation note templates with drag-and-drop interface
- Use structured clinical note formats (SOAP, DAP, BIRP)
- Track template status (draft vs. ready to use)
- Assign templates to specific roles and departments

## File Structure

```
src/pages/organization/settings/
├── TemplateLibraryPage.tsx              # Main template library
├── TemplateBuilderPage.tsx              # Visual template builder
└── TemplatePreviewPage.tsx              # Template preview/test

src/components/templates/
├── library/
│   ├── TemplateGrid.tsx                 # Grid view of templates
│   ├── TemplateCard.tsx                 # Individual template card
│   ├── TemplateFilters.tsx              # Filter by location/role
│   └── TemplateSearch.tsx               # Search templates
├── builder/
│   ├── TemplateCanvas.tsx               # Drag-and-drop canvas
│   ├── TemplateToolbox.tsx              # Available field types
│   ├── SectionEditor.tsx                # Edit template sections
│   ├── FieldEditor.tsx                  # Configure individual fields
│   └── TemplatePreview.tsx              # Live preview
└── usage/
    ├── StructuredNoteForm.tsx           # Use template during encounter
    ├── SectionRenderer.tsx              # Render template sections
    └── FieldRenderer.tsx                # Render individual fields

src/types/
└── templates.ts                         # TypeScript interfaces
```

## Core TypeScript Interfaces

```typescript
// Template definition
export interface ClinicalTemplate {
  id: string;
  name: string;
  description?: string;
  status: 'draft' | 'ready_to_use' | 'archived';

  // Organization
  category: TemplateCategory;
  tags: string[];

  // Assignment
  assigned_roles: string[];          // e.g., ['doctor', 'nurse']
  assigned_locations: string[];      // e.g., ['outpatient', 'emergency']
  assigned_specialties?: string[];   // e.g., ['cardiology', 'general_practice']

  // Structure
  format: 'soap' | 'dap' | 'birp' | 'custom';
  sections: TemplateSection[];

  // Metadata
  version: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  usage_count: number;
}

export type TemplateCategory =
  | 'consultation_notes'
  | 'forms_surveys'
  | 'online_booking'
  | 'intake_forms'
  | 'discharge_summaries'
  | 'operative_notes';

// Template section (e.g., Subjective, Objective, Assessment, Plan)
export interface TemplateSection {
  id: string;
  title: string;                     // "Subjective", "Data", "Assessment"
  description?: string;
  order: number;
  required: boolean;
  fields: TemplateField[];
}

// Individual field in a section
export interface TemplateField {
  id: string;
  label: string;
  type: FieldType;
  required: boolean;
  order: number;

  // Field-specific configuration
  config: FieldConfig;

  // Conditional display
  conditional?: {
    show_if_field: string;
    show_if_value: any;
  };
}

export type FieldType =
  | 'text'              // Single-line text input
  | 'textarea'          // Multi-line text area
  | 'select'            // Dropdown
  | 'multi_select'      // Multiple selection
  | 'radio'             // Radio buttons
  | 'checkbox'          // Checkboxes
  | 'date'              // Date picker
  | 'time'              // Time picker
  | 'number'            // Numeric input
  | 'rich_text'         // Rich text editor
  | 'signature'         // Signature capture
  | 'file_upload'       // File attachment
  | 'calculated'        // Auto-calculated field
  | 'heading'           // Section heading
  | 'divider';          // Visual separator

export interface FieldConfig {
  // Text/Textarea
  placeholder?: string;
  max_length?: number;
  min_length?: number;

  // Select/Multi-select/Radio/Checkbox
  options?: FieldOption[];

  // Number
  min?: number;
  max?: number;
  step?: number;
  unit?: string;

  // Rich text
  allow_formatting?: boolean;
  allow_keywords?: boolean;        // Enable keyword highlighting
  suggested_phrases?: string[];    // Common phrases to insert

  // Calculated
  formula?: string;                // e.g., "BMI = weight / (height^2)"

  // Validation
  validation_regex?: string;
  validation_message?: string;

  // Help text
  help_text?: string;
}

export interface FieldOption {
  value: string;
  label: string;
  description?: string;
}

// Filled template (when used in clinical encounter)
export interface FilledTemplate {
  id: string;
  template_id: string;
  template_name: string;
  patient_id: string;
  encounter_id?: string;
  filled_by: string;
  filled_at: string;

  // Filled data
  sections: FilledSection[];

  // Keywords extracted (like Medesk's highlighting)
  extracted_keywords?: string[];
}

export interface FilledSection {
  section_id: string;
  section_title: string;
  fields: FilledField[];
}

export interface FilledField {
  field_id: string;
  field_label: string;
  field_type: FieldType;
  value: any;
}
```

## Component: Template Library Page

**Purpose**: Main template library with filtering and organization

```tsx
// Simplified structure - Full implementation in actual file
const TemplateLibraryPage: React.FC = () => {
  const [templates, setTemplates] = useState<ClinicalTemplate[]>([]);
  const [filterMode, setFilterMode] = useState<'location' | 'role'>('location');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Group templates by location or role
  const groupedTemplates = useMemo(() => {
    if (filterMode === 'location') {
      return groupByLocation(filteredTemplates);
    } else {
      return groupByRole(filteredTemplates);
    }
  }, [templates, filterMode, selectedFilter, searchQuery]);

  return (
    <div>
      {/* Header with Create button */}
      <Header
        title="Templates"
        onCreateNew={() => navigate('/organization/settings/templates/builder')}
      />

      {/* Filter Toggle: By Location / By Role */}
      <FilterToggle mode={filterMode} onChange={setFilterMode} />

      {/* Grouped Template Sections */}
      {Object.entries(groupedTemplates).map(([group, templates]) => (
        <TemplateGroup
          key={group}
          title={group}
          templates={templates}
          onPreview={handlePreview}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
```

**Key Features**:
- Toggle between "By Location" and "By Role" organization
- Show template counts (e.g., "117 ready to use, 22 drafts")
- Template cards with status badges
- Quick actions: Preview, Edit, Duplicate, Delete
- Search across template names and descriptions
- Filter by status (draft, ready, archived)

## Component: Template Builder

**Purpose**: Visual drag-and-drop template builder

```tsx
const TemplateBuilderPage: React.FC = () => {
  const [template, setTemplate] = useState<ClinicalTemplate>(initializeTemplate());
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Left Sidebar: Toolbox */}
      <div className="w-64 bg-gray-50 border-r">
        <TemplateToolbox
          onAddField={(fieldType) => addFieldToSection(selectedSection, fieldType)}
          onAddSection={() => addSection()}
        />
      </div>

      {/* Main Canvas */}
      <div className="flex-1 overflow-auto p-6">
        <TemplateCanvas
          template={template}
          selectedSection={selectedSection}
          onSelectSection={setSelectedSection}
          onUpdateSection={updateSection}
          onDeleteSection={deleteSection}
          onReorderSections={reorderSections}
        />
      </div>

      {/* Right Sidebar: Properties */}
      <div className="w-80 bg-gray-50 border-l">
        {selectedSection ? (
          <SectionEditor
            section={getSection(selectedSection)}
            onUpdate={updateSection}
          />
        ) : (
          <TemplateSettings
            template={template}
            onUpdate={setTemplate}
          />
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <TemplatePreviewModal
          template={template}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};
```

**Features**:
- **Toolbox**: Drag field types onto canvas
- **Canvas**: Visual representation of template with sections
- **Properties Panel**: Configure selected field/section
- **Format Presets**: Quick start with SOAP, DAP, BIRP formats
- **Field Types**: Text, textarea, select, radio, checkbox, date, signature, etc.
- **Conditional Fields**: Show/hide fields based on other field values
- **Validation Rules**: Required fields, regex patterns, min/max length
- **Live Preview**: See how template will appear to users

## Component: Structured Note Form (Usage)

**Purpose**: Use template during clinical encounter

```tsx
const StructuredNoteForm: React.FC<{
  template: ClinicalTemplate;
  patientId: string;
  encounterId?: string;
  onSave: (data: FilledTemplate) => Promise<void>;
}> = ({ template, patientId, encounterId, onSave }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentSection, setCurrentSection] = useState(0);
  const [extractedKeywords, setExtractedKeywords] = useState<string[]>([]);

  // Auto-save draft every 30 seconds
  useAutoSave(formData, 30000);

  // Extract keywords as user types (like Medesk)
  useKeywordExtraction(formData, setExtractedKeywords);

  return (
    <div>
      {/* Progress indicator */}
      <SectionProgress
        sections={template.sections}
        currentSection={currentSection}
      />

      {/* Current section fields */}
      <SectionRenderer
        section={template.sections[currentSection]}
        formData={formData}
        onChange={setFormData}
      />

      {/* Keywords display (like Medesk's highlighting) */}
      {extractedKeywords.length > 0 && (
        <KeywordsPanel keywords={extractedKeywords} />
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button onClick={previousSection}>Previous</button>
        {currentSection < template.sections.length - 1 ? (
          <button onClick={nextSection}>Next</button>
        ) : (
          <button onClick={handleSave}>Complete & Save</button>
        )}
      </div>
    </div>
  );
};
```

**Features**:
- Section-by-section navigation
- Auto-save drafts
- Keyword extraction and highlighting
- Field validation
- Copy from previous note
- Insert common phrases
- Rich text formatting where applicable
- Signature capture

## API Endpoints Required

```
# Templates
GET    /api/templates/                              # List all templates
POST   /api/templates/                              # Create template
GET    /api/templates/{id}/                         # Get template details
PATCH  /api/templates/{id}/                         # Update template
DELETE /api/templates/{id}/                         # Delete template
POST   /api/templates/{id}/duplicate/               # Duplicate template
GET    /api/templates/presets/                      # Get format presets (SOAP, DAP, etc.)

# Template usage
POST   /api/templates/{id}/fill/                    # Create filled template
GET    /api/filled-templates/                       # List filled templates
GET    /api/filled-templates/{id}/                  # Get filled template
PATCH  /api/filled-templates/{id}/                  # Update filled template (draft)
POST   /api/filled-templates/{id}/finalize/         # Finalize filled template

# Organization
GET    /api/templates/by-location/{location}/       # Filter by location
GET    /api/templates/by-role/{role}/               # Filter by role
GET    /api/templates/stats/                        # Template statistics
```

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
- TypeScript interfaces and types
- Template library page with basic CRUD
- Template card component
- Filter and search functionality
- Backend API integration

### Phase 2: Builder Core (Week 2-3)
- Template builder canvas
- Toolbox with field types
- Drag-and-drop functionality
- Section management
- Properties panel

### Phase 3: Field Types (Week 3-4)
- Implement all field types (text, select, checkbox, etc.)
- Field configuration UI
- Validation rules
- Conditional fields
- Field renderer for each type

### Phase 4: Usage & Polish (Week 4-5)
- Structured note form for using templates
- Section renderer
- Auto-save functionality
- Keyword extraction
- Copy from previous note

### Phase 5: Advanced Features (Week 5-6)
- Template versioning
- Template duplication
- Import/export templates
- Template analytics (usage tracking)
- Performance optimization

---

# 2. User & Role Management

**Priority**: 🚨 Critical
**Complexity**: High
**Estimated Effort**: 2-3 weeks
**Impact**: Essential for security and administration

## Overview

Create comprehensive user and role management interfaces:
- **User Management**: Central hub for all user administration
- **Role Management**: Define custom roles and permissions

## File Structure

```
src/pages/organization/settings/
├── UserManagementPage.tsx               # Main user management
├── UserDetailPage.tsx                   # Individual user details
└── RoleManagementPage.tsx               # Role definitions

src/components/organization/users/
├── UserTable.tsx                        # User list with filters
├── UserRow.tsx                          # Individual user row
├── UserFilters.tsx                      # Filter by role/status
├── UserInviteModal.tsx                  # Invite new users
├── UserEditModal.tsx                    # Edit user details
├── UserBulkActions.tsx                  # Bulk operations
└── UserActivityLog.tsx                  # User activity history

src/components/organization/roles/
├── RoleCard.tsx                         # Role display card
├── RoleEditor.tsx                       # Create/edit roles
├── PermissionsTree.tsx                  # Permission hierarchy
└── RoleAssignment.tsx                   # Assign roles to users

src/types/
├── users.ts                             # User interfaces
└── roles.ts                             # Role & permission interfaces
```

## TypeScript Interfaces

```typescript
// User
export interface OrganizationUser {
  id: string;
  email: string;
  full_name: string;
  phone?: string;

  // Role & Status
  role: string;                          // Role ID
  role_name: string;                     // Human-readable role name
  status: 'active' | 'inactive' | 'pending' | 'suspended';

  // Organization
  organization_id: string;
  department?: string;
  position?: string;

  // Authentication
  is_verified: boolean;
  last_login?: string;
  otp_enabled: boolean;

  // Metadata
  created_at: string;
  invited_by?: string;
  accepted_invite_at?: string;
}

// Role
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

// Permission
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
  | 'roles';

export type PermissionAction = 'read' | 'write' | 'delete' | 'approve' | 'export';
```

## User Management Page Layout

```
┌──────────────────────────────────────────────────────────┐
│  Users                          [+ Invite Users] [⚙️]    │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  Stats: 24 Active | 3 Pending | 2 Inactive               │
│                                                           │
│  [🔍 Search]  [All Roles ▼]  [All Status ▼]  [Export]   │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ ☑️  Name          Role      Status    Last Login    │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ ☐  John Doe      Doctor    Active    2h ago    ...│ │
│  │ ☐  Jane Smith    Nurse     Active    5m ago    ...│ │
│  │ ☐  Mike Johnson  Admin     Active    1d ago    ...│ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  Selected: 0  [Bulk Actions ▼]                           │
└──────────────────────────────────────────────────────────┘
```

**Key Features**:
- User table with sorting and filtering
- Bulk selection and actions (activate, deactivate, delete)
- Invite new users via email
- Edit user details and roles
- View user activity logs
- Reset passwords
- Enable/disable 2FA
- Export user list

## Role Management Page Layout

```
┌──────────────────────────────────────────────────────────┐
│  User Roles                        [+ Create Role]       │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────┐  ┌─────────────────────┐       │
│  │ 🛡️ Hospital Admin   │  │ 👨‍⚕️ Doctor          │       │
│  │ 15 users            │  │ 8 users             │       │
│  │ System role         │  │ System role         │       │
│  │ [View Details]      │  │ [View Details]      │       │
│  └─────────────────────┘  └─────────────────────┘       │
│                                                           │
│  ┌─────────────────────┐  ┌─────────────────────┐       │
│  │ 👩‍⚕️ Nurse           │  │ ⚙️ Custom Role 1    │       │
│  │ 12 users            │  │ 2 users             │       │
│  │ System role         │  │ Custom role         │       │
│  │ [View Details]      │  │ [Edit] [Delete]     │       │
│  └─────────────────────┘  └─────────────────────┘       │
└──────────────────────────────────────────────────────────┘
```

**Key Features**:
- Visual role cards showing user count
- Distinguish system vs. custom roles
- Create custom roles with specific permissions
- Permission tree/matrix interface
- Role hierarchy (inherit permissions)
- Assign default roles for new users

## Role Editor: Permission Matrix

```
┌──────────────────────────────────────────────────────────┐
│  Create Role: Lab Technician                             │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  Name: [Lab Technician        ]                          │
│  Description: [Can manage lab tests and results]         │
│                                                           │
│  Permissions                                             │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Resource           Read  Write Delete Approve      │ │
│  ├────────────────────────────────────────────────────┤ │
│  │ Patients           ✓     ✗    ✗     ✗             │ │
│  │ Lab Results        ✓     ✓    ✗     ✓             │ │
│  │ Lab Orders         ✓     ✓    ✗     ✗             │ │
│  │ Reports            ✓     ✗    ✗     ✗             │ │
│  │ Settings           ✗     ✗    ✗     ✗             │ │
│  └────────────────────────────────────────────────────┘ │
│                                                           │
│  Data Scope: ⚪ Own  ⚪ Department  🔘 Organization      │
│                                                           │
│  [Cancel]  [Save Role]                                   │
└──────────────────────────────────────────────────────────┘
```

## API Endpoints

```
# Users
GET    /api/organizations/users/                   # List users
POST   /api/organizations/users/invite/            # Invite user
GET    /api/organizations/users/{id}/              # User details
PATCH  /api/organizations/users/{id}/              # Update user
DELETE /api/organizations/users/{id}/              # Delete user
POST   /api/organizations/users/bulk-action/       # Bulk operations
GET    /api/organizations/users/{id}/activity/     # Activity log

# Roles
GET    /api/organizations/roles/                   # List roles
POST   /api/organizations/roles/                   # Create role
GET    /api/organizations/roles/{id}/              # Role details
PATCH  /api/organizations/roles/{id}/              # Update role
DELETE /api/organizations/roles/{id}/              # Delete role (custom only)
GET    /api/organizations/permissions/             # Available permissions
```

---

# 3. Price List & Health Packages

**Priority**: 🔥 High
**Complexity**: Medium
**Estimated Effort**: 2 weeks
**Impact**: Enables revenue management

## Overview

Implement service pricing catalog and bundled health packages:
- **Price List**: Catalog of all billable services with pricing
- **Health Packages**: Bundled services at discounted prices

## File Structure

```
src/pages/organization/settings/
├── PriceListPage.tsx                    # Service pricing catalog
├── PriceItemDetailPage.tsx              # Individual price item
└── HealthPackagesPage.tsx               # Health packages management

src/components/organization/pricing/
├── PriceTable.tsx                       # Sortable price list
├── PriceItemRow.tsx                     # Single price item
├── PriceItemEditor.tsx                  # Create/edit price item
├── PriceTierEditor.tsx                  # Multiple pricing tiers
├── BulkPriceImport.tsx                  # CSV import
└── PriceHistory.tsx                     # Price change history

src/components/organization/packages/
├── PackageCard.tsx                      # Package display
├── PackageEditor.tsx                    # Create/edit package
├── PackageServicePicker.tsx             # Select services for package
└── PackagePricingCalculator.tsx         # Calculate package discount

src/types/
├── pricing.ts                           # Price-related interfaces
└── packages.ts                          # Package interfaces
```

## TypeScript Interfaces

```typescript
// Price Item
export interface PriceItem {
  id: string;
  code: string;                          // Internal code (e.g., "CONS-GP")
  name: string;                          // "General Consultation"
  description?: string;

  // Category
  category: PriceCategory;
  subcategory?: string;

  // Pricing
  base_price: number;
  currency: string;
  tiers?: PriceTier[];                   // Multiple pricing levels

  // Tax
  tax_rate?: number;
  tax_inclusive: boolean;

  // Availability
  is_active: boolean;
  available_locations?: string[];

  // Metadata
  unit?: string;                         // "per session", "per test"
  duration_minutes?: number;
  created_at: string;
  updated_at: string;
}

export type PriceCategory =
  | 'consultation'
  | 'procedure'
  | 'lab_test'
  | 'imaging'
  | 'vaccination'
  | 'medication'
  | 'other';

export interface PriceTier {
  name: string;                          // "Standard", "Urgent", "After Hours"
  price: number;
  conditions?: string;                   // When this tier applies
}

// Health Package
export interface HealthPackage {
  id: string;
  name: string;
  description: string;

  // Services included
  services: PackageService[];

  // Pricing
  total_value: number;                   // Sum of individual service prices
  package_price: number;                 // Discounted package price
  discount_amount: number;
  discount_percentage: number;
  currency: string;

  // Validity
  duration_days: number;                 // How long package is valid
  max_uses?: number;                     // Usage limits per service

  // Eligibility
  eligible_for: string[];                // Patient criteria

  // Status
  is_active: boolean;
  is_featured: boolean;

  // Metadata
  created_at: string;
  purchase_count: number;
}

export interface PackageService {
  price_item_id: string;
  service_name: string;
  included_count: number;                // How many times included
  original_price: number;
}
```

## Price List Page Layout

```
┌──────────────────────────────────────────────────────────┐
│  Price List                [+ Add Item] [📥 Import CSV]  │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  [🔍 Search]  [All Categories ▼]  [Active ▼]  [Export]  │
│                                                           │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ Code      Service Name        Category   Price     │ │
│  ├─────────────────────────────────────────────────────┤ │
│  │ CONS-GP   General Consultation  Consult   £50.00  │ │
│  │ LAB-CBC   Complete Blood Count  Lab Test  £25.00  │ │
│  │ XRAY-CHE  Chest X-Ray          Imaging   £75.00  │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                           │
│  Showing 150 items                                        │
└──────────────────────────────────────────────────────────┘
```

## Health Packages Page Layout

```
┌──────────────────────────────────────────────────────────┐
│  Health Packages                  [+ Create Package]     │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ┌─────────────────────┐  ┌─────────────────────┐       │
│  │ Annual Physical     │  │ Diabetes Care       │       │
│  │ £299 (save 20%)     │  │ £450 (save 15%)     │       │
│  │                     │  │                     │       │
│  │ ✓ Consultation      │  │ ✓ 4 Consultations   │       │
│  │ ✓ Blood tests       │  │ ✓ HbA1c tests       │       │
│  │ ✓ ECG               │  │ ✓ Eye exam          │       │
│  │                     │  │ ✓ Foot exam         │       │
│  │ [Edit] [Deactivate] │  │ [Edit] [Deactivate] │       │
│  └─────────────────────┘  └─────────────────────┘       │
└──────────────────────────────────────────────────────────┘
```

## API Endpoints

```
# Price List
GET    /api/pricing/items/                         # List price items
POST   /api/pricing/items/                         # Create item
GET    /api/pricing/items/{id}/                    # Item details
PATCH  /api/pricing/items/{id}/                    # Update item
DELETE /api/pricing/items/{id}/                    # Delete item
POST   /api/pricing/items/import/                  # Bulk import
GET    /api/pricing/categories/                    # Available categories

# Health Packages
GET    /api/health-packages/                       # List packages
POST   /api/health-packages/                       # Create package
GET    /api/health-packages/{id}/                  # Package details
PATCH  /api/health-packages/{id}/                  # Update package
DELETE /api/health-packages/{id}/                  # Delete package
GET    /api/health-packages/{id}/purchases/        # Package purchase history
```

---

# 4. Structured Clinical Notes (SOAP/DAP)

**Priority**: 🔥 Very High
**Complexity**: Medium
**Estimated Effort**: 2-3 weeks
**Impact**: Improves clinical documentation quality

## Overview

Implement structured clinical note formats used in healthcare:
- **SOAP**: Subjective, Objective, Assessment, Plan
- **DAP**: Data, Assessment, Plan (shown in Medesk screenshot)
- **BIRP**: Behavior, Intervention, Response, Plan
- Integration with appointment workflow

## File Structure

```
src/components/clinical/notes/
├── SOAPNoteForm.tsx                     # SOAP format
├── DAPNoteForm.tsx                      # DAP format
├── BIRPNoteForm.tsx                     # BIRP format
├── NoteSection.tsx                      # Reusable section component
├── KeywordHighlighter.tsx               # Keyword extraction/highlight
└── ClinicalPhraseLibrary.tsx            # Common phrases dropdown

src/types/
└── clinicalNotes.ts                     # Note interfaces
```

## TypeScript Interfaces

```typescript
// Base clinical note
export interface ClinicalNote {
  id: string;
  patient_id: string;
  encounter_id?: string;
  appointment_id?: string;

  // Format
  format: 'soap' | 'dap' | 'birp';

  // Content (varies by format)
  sections: NoteSection[];

  // Keywords (like Medesk)
  extracted_keywords: string[];

  // Metadata
  created_by: string;
  created_at: string;
  signed: boolean;
  signed_at?: string;
}

export interface NoteSection {
  title: string;                         // "Subjective", "Data", etc.
  content: string;                       // Free text content
  structured_data?: Record<string, any>; // Optional structured fields
}

// SOAP Note structure
export interface SOAPNote extends ClinicalNote {
  format: 'soap';
  subjective: string;                    // Patient's complaints
  objective: string;                     // Physical exam findings, vitals
  assessment: string;                    // Diagnosis/impression
  plan: string;                          // Treatment plan, follow-up
}

// DAP Note structure (like Medesk screenshot)
export interface DAPNote extends ClinicalNote {
  format: 'dap';
  data: string;                          // Observations, behaviors
  assessment: string;                    // Clinical impression
  plan: string;                          // Treatment recommendations
}
```

## DAP Note Form (Based on Medesk Screenshot)

```tsx
const DAPNoteForm: React.FC<{
  patientId: string;
  appointmentId?: string;
  onSave: (note: DAPNote) => Promise<void>;
}> = ({ patientId, appointmentId, onSave }) => {
  const [formData, setFormData] = useState({
    data: '',
    assessment: '',
    plan: ''
  });
  const [keywords, setKeywords] = useState<string[]>([]);

  // Extract keywords as user types (like Medesk's highlighting)
  useEffect(() => {
    const allText = `${formData.data} ${formData.assessment} ${formData.plan}`;
    const extracted = extractClinicalKeywords(allText);
    setKeywords(extracted);
  }, [formData]);

  return (
    <div className="space-y-6">
      {/* DATA Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">DATA</h3>
        <KeywordHighlightTextarea
          value={formData.data}
          onChange={(value) => setFormData({ ...formData, data: value })}
          keywords={keywords}
          placeholder="During our session, Jane arrived on time but showed signs of severe anxiety..."
          rows={8}
        />
        <PhraseLibrary
          category="observations"
          onSelect={(phrase) => insertText('data', phrase)}
        />
      </div>

      {/* ASSESSMENT Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">ASSESSMENT</h3>
        <KeywordHighlightTextarea
          value={formData.assessment}
          onChange={(value) => setFormData({ ...formData, assessment: value })}
          keywords={keywords}
          placeholder="The heightened state of anxiety displayed by Jane appears to be primarily work-related..."
          rows={8}
        />
        <PhraseLibrary
          category="assessment"
          onSelect={(phrase) => insertText('assessment', phrase)}
        />
      </div>

      {/* PLAN Section */}
      <div>
        <h3 className="text-lg font-semibold mb-2">PLAN</h3>
        <KeywordHighlightTextarea
          value={formData.plan}
          onChange={(value) => setFormData({ ...formData, plan: value })}
          keywords={keywords}
          placeholder="A follow-up session for Jane is scheduled in one week to further investigate..."
          rows={8}
        />
        <PhraseLibrary
          category="treatment_plan"
          onSelect={(phrase) => insertText('plan', phrase)}
        />
      </div>

      {/* Keywords Display (like Medesk) */}
      {keywords.length > 0 && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">
            Extracted Keywords
          </h4>
          <div className="flex flex-wrap gap-2">
            {keywords.map(keyword => (
              <span
                key={keyword}
                className="px-2 py-1 bg-yellow-200 text-gray-900 text-sm rounded"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <button onClick={saveDraft} className="btn-secondary">
          Save Draft
        </button>
        <button onClick={handleSave} className="btn-primary">
          Complete & Sign
        </button>
      </div>
    </div>
  );
};
```

**Key Features**:
- **Section-based input**: Clear separation of DATA, ASSESSMENT, PLAN
- **Keyword extraction**: Automatically highlight important clinical terms
- **Phrase library**: Quick insert common clinical phrases
- **Copy from previous**: Option to copy sections from previous encounter
- **Auto-save drafts**: Save every 30 seconds
- **Signature**: Electronic signature to finalize note
- **Print/Export**: Generate PDF of completed note

## Keyword Extraction Algorithm

```typescript
const CLINICAL_KEYWORDS = [
  // Symptoms/conditions
  'anxiety', 'depression', 'pain', 'fever', 'hypertension',
  'diabetes', 'asthma', 'COPD', 'CHF', 'CAD',

  // Severity
  'severe', 'moderate', 'mild', 'acute', 'chronic',

  // Diagnoses (ICD-10 common)
  'Generalized Anxiety Disorder', 'GAD', 'Major Depressive Disorder',
  'Type 2 Diabetes', 'Essential Hypertension',

  // Medications
  'metformin', 'lisinopril', 'atorvastatin', 'sertraline',

  // Assessments
  'GAD-7', 'PHQ-9', 'Beck Anxiety Inventory', 'Beck Depression Inventory',

  // Action words
  'investigate', 'monitor', 'follow-up', 'referral', 'consultation',
  'medication', 'therapy', 'treatment', 'evaluation'
];

function extractClinicalKeywords(text: string): string[] {
  const foundKeywords: Set<string> = new Set();
  const lowercaseText = text.toLowerCase();

  for (const keyword of CLINICAL_KEYWORDS) {
    if (lowercaseText.includes(keyword.toLowerCase())) {
      foundKeywords.add(keyword);
    }
  }

  return Array.from(foundKeywords);
}
```

## Integration with Appointment Workflow

```tsx
// In ProfessionalAppointmentDetailPage.tsx
// Add "Complete Clinical Note" button

const handleCompleteNote = () => {
  setShowNoteModal(true);
};

// Modal to select note format
<NoteFormatSelector
  onSelect={(format) => {
    if (format === 'soap') {
      setShowSOAPForm(true);
    } else if (format === 'dap') {
      setShowDAPForm(true);
    }
  }}
/>

// Show appropriate form
{showSOAPForm && (
  <SOAPNoteForm
    patientId={appointment.patient_id}
    appointmentId={appointment.id}
    onSave={handleSaveNote}
  />
)}
```

## API Endpoints

```
POST   /api/clinical-notes/                        # Create note
GET    /api/clinical-notes/{id}/                   # Get note
PATCH  /api/clinical-notes/{id}/                   # Update draft
POST   /api/clinical-notes/{id}/sign/              # Sign/finalize note
GET    /api/patients/{id}/notes/                   # Patient's notes
GET    /api/appointments/{id}/note/                # Appointment's note
```

---

# Implementation Priority & Timeline

## Phase 1: Foundation (Weeks 1-2)
1. ✅ Organization Settings Hub
2. ✅ Organization Profile Page
3. 🔧 User Management Page (basic)
4. 🔧 Role Management Page (basic)

## Phase 2: Clinical Documentation (Weeks 3-5)
5. 🔥 Structured Clinical Notes (SOAP/DAP/BIRP)
6. 🔥 Template Library (viewing only)
7. 🔥 Template usage in encounters

## Phase 3: Revenue & Advanced (Weeks 6-8)
8. 💰 Price List Management
9. 💰 Health Packages
10. 🔧 Advanced user/role features (permissions matrix)

## Phase 4: Template Builder (Weeks 9-12)
11. 🎨 Template Builder (most complex - save for later)
12. 🎨 Advanced template features
13. 🎨 Template analytics

---

# Testing Checklist

## Functional Testing
- [ ] All forms validate input correctly
- [ ] API calls handle errors gracefully
- [ ] Data persists correctly to backend
- [ ] Navigation works between pages
- [ ] Search and filter functions work
- [ ] Modals open/close correctly
- [ ] File uploads work (logos, imports)

## Security Testing
- [ ] Permission checks on all sensitive actions
- [ ] Role-based access control enforced
- [ ] Input sanitization prevents XSS
- [ ] File upload validation prevents malicious files
- [ ] API authentication required

## UX Testing
- [ ] Loading states show during API calls
- [ ] Success/error messages display appropriately
- [ ] Forms are intuitive and easy to use
- [ ] Responsive design works on mobile
- [ ] Keyboard navigation works
- [ ] Screen readers can navigate pages

## Performance Testing
- [ ] Large data sets load efficiently
- [ ] Search/filter is responsive
- [ ] Auto-save doesn't lag input
- [ ] Image uploads are optimized

---

# Notes for Developers

## Code Style
- Use functional components with hooks
- TypeScript strict mode enabled
- Follow existing PHB naming conventions
- Use Tailwind for styling (match existing orange theme)
- Implement proper error boundaries

## Component Patterns
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use context for shared state (minimize prop drilling)
- Implement loading/error states consistently

## API Integration
- Use axios with interceptors for auth
- Handle 401/403 with redirects
- Show user-friendly error messages
- Implement retry logic for failed requests

## Performance
- Use React.memo for expensive components
- Implement virtualization for long lists
- Debounce search inputs
- Lazy load heavy components

## Accessibility
- Use semantic HTML
- Include ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain focus management in modals