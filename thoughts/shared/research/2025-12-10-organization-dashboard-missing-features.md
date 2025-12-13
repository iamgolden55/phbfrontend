---
date: 2025-12-10T19:17:24+0000
researcher: Claude (Sonnet 4.5)
git_commit: b1b01de1a24739f0e33ab785d2e536faabdd184b
branch: main
repository: phbfrontend
topic: "Organization Dashboard Missing Features and EMR/EHR Gap Analysis"
tags: [research, organization, dashboard, emr, ehr, templates, missing-features, medesk-comparison]
status: complete
last_updated: 2025-12-10
last_updated_by: Claude (Sonnet 4.5)
---

# Research: Organization Dashboard Missing Features and EMR/EHR Gap Analysis

**Date**: December 10, 2025 19:17:24 UTC
**Researcher**: Claude (Sonnet 4.5)
**Git Commit**: b1b01de1a24739f0e33ab785d2e536faabdd184b
**Branch**: main
**Repository**: phbfrontend

## Research Question

Based on Medesk EMR/EHR system screenshots, identify:
1. What organization dashboard pages are missing in the PHB system
2. What features from Medesk's organization settings should be implemented
3. What template/forms management capabilities are missing
4. What additional EMR/EHR features should be added to make PHB a complete healthcare management system

## Executive Summary

The PHB system has a **comprehensive foundation** for an EMR/EHR platform with 40+ clinical pages, robust appointment management, prescription workflows, lab/radiology management, and patient records. However, compared to mature systems like Medesk, it is **missing critical organizational configuration pages** and a **formal template management system** for clinical documentation.

### What Exists (Strong Foundation)
- ✅ Organization dashboard with role-based views (Hospital, NGO, Pharmacy)
- ✅ Patient management and registration
- ✅ Staff management and roster
- ✅ Appointment scheduling with department routing
- ✅ Prescription management with electronic tokens
- ✅ Lab and radiology management
- ✅ Billing and invoicing
- ✅ Clinical guidelines with approval workflows
- ✅ Medical records with OTP security
- ✅ Ward and admission management
- ✅ Pharmacy inventory and dispensing

### Critical Gaps Identified
- ❌ **Organization Settings Page** (like Medesk's comprehensive settings hub)
- ❌ **Practice Profile Management** (organization details, contacts, address)
- ❌ **Locations & Rooms Management** (physical facility management)
- ❌ **Role Management System** (define and manage user roles)
- ❌ **User Management Interface** (comprehensive user administration)
- ❌ **Schedule Management** (global scheduling rules and availability)
- ❌ **Tag Management** (reference data management)
- ❌ **Online Appointment Booking Settings** (public booking configuration)
- ❌ **Subscription Details Page** (billing plans and licenses)
- ❌ **Consultation Notes Templates Library** (organized by location/role)
- ❌ **Template Builder/Editor** (create and manage clinical note templates)
- ❌ **Structured Clinical Notes** (DATA/ASSESSMENT/PLAN format)
- ❌ **Price List Management** (service pricing)
- ❌ **Health Packages** (bundled services for patients)

## Detailed Findings

### 1. Current Organization Dashboard Implementation

The PHB system has a **solid organizational structure** with multiple specialized pages:

#### Main Dashboard & Management Pages

**Dashboard Pages** (`src/pages/organization/`):
- `OrganizationDashboardPage.tsx:1` - Main container routing to role-specific dashboards
- `ModernOrganizationDashboard.tsx:1` - Modern employee/HR dashboard with statistics
- `HospitalDashboard.tsx` (feature) - Hospital-specific dashboard with bed utilization, ward occupancy
- `NGODashboard.tsx` (feature) - NGO-specific dashboard
- `PharmaDashboard.tsx` (feature) - Pharmacy-specific dashboard

**Management Pages** (`src/pages/organization/`):
- `PatientManagementPage.tsx:1` - Patient records, search, admission modal
- `PatientAdmissionsPage.tsx:1` - Dedicated admissions management
- `PatientRegistrationPage.tsx:1` - New patient registration form
- `StaffManagementPage.tsx:1` - Staff management (doctors, nurses, admins)
- `PharmacyManagementPage.tsx:1` - Pharmacy inventory and dispensing
- `BillingManagementPage.tsx:1` - Financial management and invoicing
- `ClinicalManagementPage.tsx:1` - EHR, vitals, prescriptions tabs
- `ReportsPage.tsx:1` - Analytics and reporting with charts
- `AppointmentsPage.tsx:1` - Appointment management with filters
- `WardManagementPage.tsx:1` - Ward/department bed management
- `SurgerySchedulePage.tsx:1` - Surgery scheduling
- `AnalyticsPage.tsx:1` - Performance metrics
- `EmergencyPage.tsx:1` - Emergency response
- `InventoryCheckPage.tsx:1` - Inventory auditing
- `LabTechnicianPage.tsx:1` - Lab management
- `RadiologyPage.tsx:1` - Radiology department
- `UserRegistrationsPage.tsx:1` - Pending user approvals
- `PatientRegistrationApprovalPage.tsx:1` - Patient registration approvals
- `StaffRosterPage.tsx:1` - Staff scheduling
- `HospitalLicensesPage.tsx:1` - Licenses and certifications
- `ClinicalGuidelinesManagementPage.tsx:1` - Clinical protocols

#### Authentication & Routing

**Organization Auth Context** (`src/features/organization/organizationAuthContext.tsx:1`):
- Three organization roles: `hospital_admin`, `ngo_admin`, `pharmacy_admin`
- 2FA verification (always required for hospital admins)
- JWT token management with httpOnly cookies
- Auto token refresh every 25 minutes
- Activity-based and visibility-based refresh

**Organization Routes** (`App.tsx:520-642`):
- Base: `/organization` with `ModernOrganizationLayout`
- 24+ organization routes including dashboard, patients, clinical, lab, radiology, pharmacy, billing, appointments, surgery, reports, staff, admissions, wards, etc.
- Employee sub-routes: `/employee/*` with separate layout

**Layout Components**:
- `ModernOrganizationLayout.tsx:27-194` - Collapsible sidebar (64px collapsed, 256px expanded), 13 menu items
- `OrganizationLayout.tsx:7-206` - Legacy layout with role-based menus
- `ModernEmployeeLayout.tsx:1` - Employee-specific layout

### 2. Missing Organization Settings (Compared to Medesk)

Based on the Medesk screenshots, PHB is **missing a centralized Organization Settings hub** similar to Medesk's comprehensive settings interface.

#### Medesk's Organization Settings Structure

**Screenshot 1** shows:
```
Organisation Settings
├── Basic
│   ├── My Practice (Practice profile and details)
│   ├── Locations & Rooms (Manage rooms and departments)
│   ├── Roles (Manage available user roles)
│   ├── Users (Management and registration of users)
│   ├── Schedule (Schedule management for users)
│   ├── Tag Management (Tag and reference management)
│   ├── Online Appointment Booking (Management of online booking settings)
│   └── Subscription Details (Your pricing plan and terms of use)
├── Service Provision
│   ├── Price List (View and edit price list items)
│   ├── Consultation Notes Templates and Forms (Manage templates and forms)
│   └── Health Packages (Management of health packages available to patients)
├── Payments and Accounting
└── Labs

Organisation Profile (shown on right panel)
├── [UK] Medesk Demo Clinic - Practice
├── Contacts (Phone numbers and emails)
├── Address (Physical location with timezone)
├── Site (Website URL)
└── Bank Details
```

#### What PHB is Missing

**1. Organization Settings Hub Page** ❌
- **Status**: Does not exist
- **Medesk equivalent**: Central settings page with categorized sections
- **What it should include**:
  - Navigation to all organizational configuration pages
  - Settings categorized by function (Basic, Service Provision, Payments, Labs)
  - Quick access to frequently used settings

**2. My Practice / Organization Profile Page** ❌
- **Status**: Does not exist as a dedicated page
- **Medesk equivalent**: Organization Profile with editable details
- **Required fields**:
  - Organization name and type (Hospital/NGO/Pharmacy)
  - Contact information (multiple phone numbers, emails)
  - Physical address with timezone
  - Website URL
  - Bank details for payments
  - Logo/branding
  - Edit functionality with form validation

**3. Locations & Rooms Management** ❌
- **Status**: Ward management exists but not comprehensive room/location management
- **Medesk equivalent**: "Locations & Rooms - Manage rooms and departments"
- **Gap**: No dedicated interface for:
  - Creating and managing physical locations within organization
  - Room definitions and assignments
  - Location-specific settings and resources
  - Floor plans or facility maps
  - Room scheduling and availability

**4. Roles Management System** ❌
- **Status**: No dedicated role management interface
- **Medesk equivalent**: "Roles - Manage available user roles"
- **Gap**: Cannot define or customize roles within the organization
- **Current state**: Roles are hardcoded (hospital_admin, ngo_admin, pharmacy_admin, doctor, nurse, etc.)
- **Needed**:
  - Create custom roles
  - Define permissions per role
  - Assign capabilities (read, write, delete, approve)
  - Role hierarchy management

**5. Users Management Interface** ❌
- **Status**: Staff management exists but not comprehensive user management
- **Medesk equivalent**: "Users - Management and registration of users"
- **Gap**:
  - No centralized user administration page
  - User registration/approval flow exists (`UserRegistrationsPage.tsx`) but not integrated into settings
  - Cannot view all users across roles in one interface
  - No bulk user operations
  - No user permission assignment UI

**6. Schedule Management (Global)** ❌
- **Status**: Staff roster exists, appointment scheduling exists, but no global schedule configuration
- **Medesk equivalent**: "Schedule - Schedule management for users"
- **Gap**:
  - No organization-wide scheduling rules
  - No default working hours configuration
  - No holiday/closure calendar
  - No shift template definitions
  - No break time policies

**7. Tag Management** ❌
- **Status**: Does not exist
- **Medesk equivalent**: "Tag Management - Tag and reference management"
- **Gap**: No way to manage:
  - Clinical tags/labels for categorization
  - Diagnosis codes (ICD-10)
  - Procedure codes (CPT)
  - Custom reference data
  - Standardized terminology

**8. Online Appointment Booking Settings** ❌
- **Status**: Appointment booking exists but no configuration page for public booking
- **Medesk equivalent**: "Online Appointment Booking - Management of online booking settings"
- **Gap**:
  - No settings page for online booking configuration
  - Cannot configure which services are bookable online
  - No booking hours restrictions
  - No advance booking limits
  - No cancellation policy settings
  - No patient self-service settings

**9. Subscription Details / Licensing Page** ❌
- **Status**: `HospitalLicensesPage.tsx` exists but unclear if it covers subscription management
- **Medesk equivalent**: "Subscription Details - Your pricing plan and terms of use"
- **Gap**:
  - No clear subscription/billing plan display
  - No feature limits based on subscription tier
  - No upgrade/downgrade options
  - No usage metrics vs. subscription limits
  - No terms of service display

**10. Price List Management** ❌
- **Status**: Does not exist
- **Medesk equivalent**: "Price List - View and edit price list items" (Service Provision section)
- **Gap**:
  - No service pricing catalog
  - Cannot define prices for consultations, procedures, lab tests
  - No pricing tiers (standard, urgent, after-hours)
  - No insurance pricing vs. private pricing
  - Billing page exists but no underlying price list management

**11. Health Packages** ❌
- **Status**: Does not exist
- **Medesk equivalent**: "Health Packages - Management of health packages available to patients"
- **Gap**:
  - No bundled service offerings
  - Cannot create packages (e.g., "Annual Physical Package", "Diabetes Care Package")
  - No package pricing
  - No package promotion to patients

### 3. Template & Forms System Analysis

#### What PHB Has (Template-Related)

**Assessment Templates** (`src/components/assessment/AssessmentTemplate.tsx:1`):
- ✅ Multi-step health assessment questionnaires
- ✅ Progress tracking with scoring
- ✅ Risk level classification
- ✅ Reusable across multiple health assessment pages
- **Use cases**: Depression screening, anxiety assessment, diabetes risk, heart disease risk

**Treatment Plan Forms** (`src/features/professional/patients/TreatmentPlanForm.tsx:1`):
- ✅ Dynamic treatment goal management
- ✅ Medication listing
- ✅ Status tracking
- ✅ Progress notes

**Clinical Guidelines System** (`src/services/guidelinesService.ts:1`):
- ✅ Complete CRUD for guidelines
- ✅ Approval workflow (draft → pending_review → approved → published)
- ✅ Versioning system
- ✅ Multiple content types (PDF, text)
- ✅ Category classification (21 categories)
- ✅ Target role assignment
- ✅ Upload modal with metadata (`GuidelineUploadModal.tsx`)

**Clinical Management** (`src/pages/organization/ClinicalManagementPage.tsx:1`):
- ✅ Tabs for EHR, Vitals, Prescriptions
- ✅ Recent encounters display

**Patient Data Types** (`src/features/professional/patients/patientTypes.ts:1`):
- ✅ Structured interfaces for: Patient, Note, TestResult, TreatmentPlan, Appointment, ProgressNote
- ✅ Note categories: general, observation, treatment, discussion, private

#### What PHB is Missing (Compared to Medesk)

**Screenshot 2** shows Medesk's template system:
```
Templates
├── BY LOCATION OF USE
│   ├── Forms and surveys (117 ready to use, 22 drafts)
│   └── Online booking (19 ready to use, 1 drafts)
└── BY ROLE ASSOCIATED WITH THE APPOINTMENT
    ├── Audiologist (16 ready to use)
    ├── Clinic Development Lead (29 ready to use, 2 drafts)
    ├── Clinician (17 ready to use, 1 drafts)
    ├── Dr Jones - Cardiologist (25 ready to use, 1 drafts)
    └── Dr Smith - GP (31 ready to use, 1 drafts)

[+] Create a new template button
```

**Screenshot 3** shows a structured clinical note template:
```
DAP notes therapy example

Created At: 06.06.2024
Client Name: Jane Doe

DATA
During our session, Jane arrived on time but showed signs of severe anxiety...

ASSESSMENT
The heightened state of anxiety displayed by Jane appears to be primarily work-related...
Keywords: severe anxiety, Generalized Anxiety Disorder (GAD), symptoms, affecting, ability to function effectively

PLAN
A follow-up session for Jane is scheduled in one week to further investigate...
Keywords: investigate, using the GAD-7, Beck Anxiety Inventory, consideration of a referral, evaluation for possible medication
```

**Missing Components:**

**1. Consultation Notes Templates Library** ❌
- **Status**: Does not exist as a dedicated system
- **Medesk equivalent**: "Consultation Notes Templates and Forms" with 100+ templates
- **Gap**:
  - No template library organized by location of use
  - No template library organized by role/specialty
  - No ready-to-use vs. draft template status
  - No template count display
  - No search/filter for templates
  - Clinical notes exist but not templated

**2. Template Builder/Editor** ❌
- **Status**: No visual template builder
- **Medesk equivalent**: Ability to create and customize note templates
- **Gap**:
  - Cannot create reusable clinical note templates
  - No template sections/structure definition
  - No template field types (text, checkbox, dropdown, date)
  - No template versioning for notes
  - No template sharing across users

**3. Structured Clinical Note Format** ❌
- **Status**: Notes are stored but not structured
- **Medesk equivalent**: DAP (Data-Assessment-Plan), SOAP formats
- **Gap**:
  - No predefined note structures (SOAP, DAP, BIRP, GIRP, etc.)
  - No section-based note entry
  - No keyword extraction or highlighting
  - No clinical terminology suggestions
  - Notes in `patientTypes.ts` are just `content: string`, no structure

**4. Forms and Surveys** ❌
- **Status**: Health assessment forms exist but not as a general form system
- **Medesk equivalent**: 117 ready-to-use forms, customizable surveys
- **Gap**:
  - Assessment templates are hardcoded per health topic
  - No general-purpose form builder
  - Cannot create custom patient intake forms
  - No consent forms management
  - No patient-facing survey distribution

**5. Role-Specific Template Assignment** ❌
- **Status**: Not implemented
- **Medesk equivalent**: Templates organized by role (Audiologist, Clinician, Dr Jones - Cardiologist)
- **Gap**:
  - Cannot assign templates to specific professional roles
  - No role-based template defaults
  - No specialty-specific template libraries
  - All professionals share the same documentation tools

**6. Location-Specific Templates** ❌
- **Status**: Not implemented
- **Medesk equivalent**: Templates organized by location (Forms for surveys, Online booking)
- **Gap**:
  - Cannot assign templates to specific departments/locations
  - No department-specific documentation standards
  - No location-based workflow templates

### 4. Comprehensive EMR/EHR Feature Inventory

#### Strong Existing Features (What PHB Does Well)

**Clinical Core** (40+ pages, 12+ services):
- ✅ **Medical Records** with OTP verification (`medicalRecordsService.ts:1`)
- ✅ **Appointment Management** with department routing (`appointmentService.ts:1`)
- ✅ **Prescription Management** with electronic tokens (`prescriptionsService.ts:1`)
- ✅ **Lab Management** with test ordering and results (`LabTechnicianPage.tsx:1`)
- ✅ **Radiology** with DICOM parsing (`RadiologyPage.tsx:1`)
- ✅ **Pharmacy** with inventory and dispensing (`PharmacyManagementPage.tsx:1`)
- ✅ **Patient Demographics** comprehensive tracking (`patientTypes.ts:1`)
- ✅ **Allergy Tracking** with severity levels
- ✅ **Medication Lists** active and historical
- ✅ **Vital Signs** monitoring
- ✅ **Billing & Invoicing** (`BillingManagementPage.tsx:1`)
- ✅ **Clinical Guidelines** with approval workflows (`guidelinesService.ts:1`)
- ✅ **Treatment Plans** with goal tracking (`TreatmentPlanForm.tsx:1`)
- ✅ **Staff Management** and rostering
- ✅ **Ward Management** and admissions
- ✅ **Surgery Scheduling**
- ✅ **Emergency Management**
- ✅ **Patient Registration** with approval workflow
- ✅ **Clinical Calculators** (BMI, etc.) (`ClinicalCalculators.tsx:1`)
- ✅ **Referral Management** for specialists
- ✅ **QR Code** prescription verification
- ✅ **Payment Integration** (Paystack)

**Security & Compliance**:
- ✅ **Multi-context Authentication** (user, professional, organization)
- ✅ **2FA/OTP** for sensitive operations
- ✅ **httpOnly Cookies** for XSS protection
- ✅ **Token Management** with auto-refresh
- ✅ **Role-based Access Control**

**Data Visualization**:
- ✅ **Charts** (Chart.js, Recharts)
- ✅ **Analytics Dashboard** (`AnalyticsPage.tsx:1`)
- ✅ **Reports** with export (`ReportsPage.tsx:1`)

### 5. Missing EMR/EHR Features (Industry Standard)

Based on comprehensive EMR/EHR systems, PHB should consider adding:

#### A. Clinical Documentation

**1. Discharge Summaries** ❌
- **Current**: Admission management exists but no structured discharge
- **Needed**:
  - Discharge summary templates
  - Reason for admission, hospital course, discharge medications
  - Follow-up instructions
  - Discharge diagnosis
  - Discharge disposition (home, rehab, nursing facility)

**2. Operative Notes** ❌
- **Current**: Surgery scheduling exists
- **Needed**:
  - Pre-operative diagnosis
  - Post-operative diagnosis
  - Procedure performed
  - Surgeon, anesthesiologist, nurses
  - Findings
  - Complications
  - Estimated blood loss
  - Specimens sent to pathology

**3. Progress Notes (SOAP format)** ❌
- **Current**: Progress notes exist in `patientTypes.ts` but unstructured
- **Needed**:
  - SOAP format (Subjective, Objective, Assessment, Plan)
  - DAP format (Data, Assessment, Plan) - shown in Medesk
  - BIRP format (Behavior, Intervention, Response, Plan)
  - Structured input forms for each section

**4. Consultation Notes** ❌
- **Current**: Appointment notes exist
- **Needed**:
  - Specialized consultation note templates by specialty
  - History of present illness (HPI)
  - Review of systems (ROS)
  - Physical examination findings
  - Consultant recommendations

**5. Nursing Notes** ❌
- **Current**: No nursing-specific documentation
- **Needed**:
  - Nursing assessments
  - Care plans
  - Medication administration records (MAR)
  - Input/output records
  - Vital signs flow sheets

#### B. Order Management

**6. Lab Order Sets** ❌
- **Current**: Lab tests can be ordered but no order sets
- **Needed**:
  - Predefined lab panels (e.g., "Basic Metabolic Panel", "Complete Blood Count")
  - Order favorites per provider
  - Order protocols by diagnosis
  - STAT vs. routine ordering

**7. Radiology Order Sets** ❌
- **Current**: Radiology requests exist
- **Needed**:
  - Predefined imaging protocols
  - Clinical indication requirements
  - Contrast protocols
  - Radiation dose tracking

**8. Medication Order Sets** ❌
- **Current**: Prescriptions can be created individually
- **Needed**:
  - Order sets for common conditions (e.g., "CAP - Community Acquired Pneumonia")
  - Standing orders
  - Protocol-driven ordering

#### C. Clinical Decision Support

**9. Drug Interaction Checking** ⚠️
- **Current**: `PrescriptionTriageModal` mentions drug interaction tracking
- **Status**: Unclear if fully implemented
- **Needed**:
  - Real-time drug-drug interaction alerts
  - Drug-allergy checking
  - Duplicate therapy alerts
  - Dosing guidance

**10. Clinical Alerts & Reminders** ❌
- **Current**: Critical alerts shown on dashboard
- **Needed**:
  - Preventive care reminders (vaccinations, screenings)
  - Lab result alerts (abnormal, critical)
  - Appointment overdue alerts
  - Medication renewal reminders

**11. Care Pathways / Protocols** ❌
- **Current**: Clinical guidelines exist
- **Needed**:
  - Automated care pathways triggered by diagnosis
  - Protocol-driven order sets
  - Quality measure tracking
  - Clinical pathway progress tracking

#### D. Patient Engagement

**12. Patient Portal** ⚠️
- **Current**: Patient features exist but status unclear
- **Components found**: `MedicalRecords.tsx`, `Appointments.tsx`, `Prescriptions.tsx`, `TestResults.tsx`
- **Gaps**:
  - No secure messaging with providers
  - No patient education library
  - No wellness tracking
  - No family access controls

**13. Patient Education** ❌
- **Current**: Health conditions database exists
- **Needed**:
  - Assign educational materials to patients
  - Track if materials were reviewed
  - Medication-specific instructions
  - Condition-specific education
  - Video library

**14. Telemedicine Integration** ❌
- **Current**: No video consultation capability
- **Needed**:
  - Video visit scheduling
  - In-app video calls
  - Screen sharing for education
  - Virtual waiting room

#### E. Administrative & Compliance

**15. Audit Trails** ⚠️
- **Current**: Some access tracking exists (guidelines)
- **Needed**:
  - Comprehensive audit logs for all record access
  - Who accessed what record, when
  - Changes made to records with before/after
  - Compliance reporting for HIPAA/GDPR

**16. Consent Management** ❌
- **Current**: No consent system
- **Needed**:
  - Electronic consent forms
  - Consent versioning
  - Patient signature capture
  - Consent type (treatment, research, data sharing)
  - Consent expiry and renewal

**17. Insurance/Billing Integration** ❌
- **Current**: Billing page exists but no insurance
- **Needed**:
  - Insurance eligibility verification
  - Prior authorization tracking
  - Claims submission
  - EOB (Explanation of Benefits) processing
  - Denial management

**18. Referral Tracking** ⚠️
- **Current**: Referral creation exists (`referAppointment()`)
- **Gaps**:
  - No referral status tracking (sent, received, completed)
  - No referral response/report integration
  - No specialist report routing back to PCP

#### F. Advanced Clinical Features

**19. Problem List** ❌
- **Current**: Medical conditions tracked but not as formal problem list
- **Needed**:
  - Active problem list (diagnoses)
  - Problem onset date
  - Problem status (active, resolved, inactive)
  - ICD-10 coding
  - Problem-oriented medical record (POMR)

**20. Immunization Registry** ❌
- **Current**: Vaccinations can be scheduled as appointments
- **Needed**:
  - Complete vaccination history
  - Immunization schedule tracking
  - Vaccine lot number and manufacturer
  - Immunization registry reporting
  - Vaccine forecasting

**21. Growth Charts (Pediatrics)** ❌
- **Current**: Not applicable for general system
- **Needed if pediatrics supported**:
  - Height/weight/BMI growth curves
  - Developmental milestones
  - Pediatric vital signs normalization

**22. Care Coordination** ❌
- **Current**: Limited coordination features
- **Needed**:
  - Care team management (multiple providers per patient)
  - Task assignment across care team
  - Care transitions tracking (hospital to home)
  - Post-discharge follow-up

**23. Quality Measures & Reporting** ❌
- **Current**: Analytics exist but not quality-specific
- **Needed**:
  - HEDIS measures tracking
  - MIPS/MACRA quality reporting
  - Quality dashboards per provider
  - Patient registry for chronic conditions

**24. Clinical Registry** ❌
- **Current**: Not implemented
- **Needed**:
  - Disease-specific registries (diabetes, cancer, cardiac)
  - Outcome tracking
  - Population health management
  - Research data extraction

#### G. Reporting & Analytics

**25. Custom Report Builder** ❌
- **Current**: Fixed reports in `ReportsPage.tsx`
- **Needed**:
  - Ad-hoc report generation
  - Drag-and-drop report builder
  - Scheduled report delivery
  - Report templates library

**26. Provider Productivity Reports** ❌
- **Current**: Not implemented
- **Needed**:
  - Patients seen per day/week/month
  - Revenue per provider
  - Appointment utilization
  - Documentation completion rates

**27. Operational Dashboards** ⚠️
- **Current**: Dashboard exists but could be enhanced
- **Needed**:
  - Real-time bed availability
  - ER wait times
  - OR utilization
  - Staff workload distribution
  - Patient flow analysis

#### H. Mobile & Accessibility

**28. Mobile App (Native)** ❌
- **Current**: Web app only (responsive design)
- **Needed**:
  - Native iOS/Android apps for providers
  - Offline capability
  - Push notifications
  - Biometric authentication

**29. Accessibility Compliance** ⚠️
- **Current**: Unknown compliance level
- **Needed**:
  - WCAG 2.1 AA compliance
  - Screen reader compatibility
  - Keyboard navigation
  - High contrast mode

#### I. Integration & Interoperability

**30. HL7/FHIR Integration** ❌
- **Current**: No standard health data exchange
- **Needed**:
  - HL7 v2 message support
  - FHIR API endpoints
  - CDA document generation
  - HIE (Health Information Exchange) connectivity

**31. Lab Interface** ❌
- **Current**: Manual lab result entry
- **Needed**:
  - Electronic lab orders (CPOE)
  - Automated result import
  - Lab interface engine
  - Bidirectional communication

**32. Pharmacy Interface** ❌
- **Current**: Electronic prescription exists but not integrated with external pharmacies
- **Needed**:
  - E-prescribing (EPCS)
  - Surescripts integration
  - Pharmacy benefit manager (PBM) integration
  - Real-time pharmacy availability

**33. Imaging System Integration** ❌
- **Current**: DICOM parser exists but integration unclear
- **Needed**:
  - PACS integration
  - Image viewer embedded in EMR
  - Radiology report routing
  - Prior imaging comparison

## Code References

### Organization Dashboard
- `src/pages/organization/OrganizationDashboardPage.tsx:1` - Main dashboard container
- `src/pages/organization/ModernOrganizationDashboard.tsx:1` - Modern dashboard implementation
- `src/layouts/ModernOrganizationLayout.tsx:27-194` - Primary layout with 13 menu items
- `App.tsx:520-642` - Organization routing structure

### Authentication & Security
- `src/features/organization/organizationAuthContext.tsx:1` - Organization auth context
- `src/features/professional/professionalAuthContext.tsx:1` - Professional auth context
- `src/features/auth/authContext.tsx:1` - Patient auth context

### Template-Related
- `src/components/assessment/AssessmentTemplate.tsx:1` - Health assessment templates
- `src/features/professional/patients/TreatmentPlanForm.tsx:1` - Treatment plan forms
- `src/services/guidelinesService.ts:1` - Clinical guidelines management
- `src/components/guidelines/GuidelineUploadModal.tsx:1` - Guideline upload interface
- `src/features/professional/patients/patientTypes.ts:1` - Data structures including Note interface

### EMR Core Features
- `src/services/appointmentService.ts:1` - Appointment management
- `src/features/health/prescriptionsService.ts:1` - Prescription management
- `src/features/health/medicalRecordsService.ts:1` - Medical records access
- `src/pages/organization/LabTechnicianPage.tsx:1` - Lab management
- `src/pages/organization/RadiologyPage.tsx:1` - Radiology management
- `src/pages/organization/PharmacyManagementPage.tsx:1` - Pharmacy operations

## Architecture Insights

### Multi-Tenant Organization System
- Three authentication contexts for different user types
- Role-based dashboards (Hospital, NGO, Pharmacy)
- Department-based appointment routing
- Organization-specific data isolation

### Security-First Design
- httpOnly cookies for XSS protection
- OTP verification for sensitive operations (medical records, controlled substances)
- Token refresh strategies (25-minute interval, activity-based, visibility-based)
- Multiple authentication layers

### Modular Feature Organization
- Feature-based directory structure (`/features/organization/`, `/features/professional/`, `/features/health/`)
- Separation of concerns: services, components, contexts
- Reusable components (DashboardWidgets, assessment templates)

### Payment Integration
- Paystack integration for appointment payments
- Billing management with invoice tracking
- Payment confirmation workflows

### API Integration Patterns
- RESTful API services
- JWT bearer token authentication
- Consistent error handling
- CORS-compatible requests

## Historical Context (from thoughts/)

### Recent Implementation Work
- `thoughts/shared/research/2025-11-12-pharmacy-prescription-lookup-missing-feature.md` - Pharmacy lookup gaps identified
- `thoughts/shared/research/2025-10-31-onboarding-non-functional-features.md` - Broken onboarding features documented
- `thoughts/shared/research/2025-11-10-hospital-admin-not-linked-to-hospital.md` - Organization linking issues (fixed)
- `thoughts/shared/research/2025-11-11-appointment-department-routing-system.md` - Department routing analysis

### Professional System Evolution
- `thoughts/shared/plans/2025-11-07-professional-practice-pages-implementation.md` - Three-tier professional tracking planned
- `thoughts/shared/research/2025-11-05-professional-registration-admin-review-system.md` - Admin review system requirements

### Clinical Workflow Documentation
- `thoughts/shared/research/2025-11-08-appointment-prescription-pharmacy-flow.md` - Complete clinical workflow documented
- `thoughts/shared/plans/2025-10-31-prescription-request-refill-feature.md` - Prescription refill planning
- `thoughts/shared/research/2025-10-21-pharmacy-nomination-system.md` - Pharmacy nomination design

### Advanced Features Planned
- `thoughts/shared/plans/2025-11-11-ml-based-medical-triage-implementation.md` - ML triage system (comprehensive 7-phase plan)
- `thoughts/shared/guides/medication-effectiveness-tracking-with-ml.md` - Medication effectiveness tracking with ML

### Infrastructure Evolution
- `thoughts/shared/research/2025-10-30-monolithic-architecture-analysis.md` - Architecture analysis and microservices migration considerations
- `thoughts/shared/research/2025-10-30-aws-services-integration-analysis.md` - AWS integration strategy
- `thoughts/shared/plans/2025-10-18-httponly-cookie-migration.md` - Security enhancement (httpOnly cookies)

### Template System Context
**No existing documentation found** for template management system - this is a **net new requirement**

## Related Research
- Previous research documents: 45+ in `thoughts/shared/` covering various aspects of the system
- Key missing: Comprehensive organization settings research
- Key missing: Template system architecture documentation
- Key missing: EMR feature gap analysis (this document addresses it)

## Open Questions

### Immediate Questions (Organization Settings)
1. Should organization settings be a single page with tabs or separate pages?
2. Which settings should be editable by hospital_admin vs. requiring super admin?
3. Should role management support custom roles or predefined roles only?
4. How should multi-location organizations be handled (hospital chains)?
5. Should there be organization-level vs. department-level settings?

### Template System Questions
1. Should templates be stored as structured JSON or rich text with embedded fields?
2. Should the system support multiple template formats (SOAP, DAP, BIRP, etc.)?
3. How should template versioning work (immutable vs. editable)?
4. Should templates support computed fields (auto-calculate BMI, risk scores)?
5. Should there be a marketplace for community-contributed templates?
6. How should templates handle multilingual content?

### EMR Feature Prioritization Questions
1. Which missing features are **critical** vs. **nice-to-have**?
2. Should PHB target a specific use case (primary care, hospital, specialty)?
3. What is the target market (UK NHS-style, US commercial, international)?
4. Are there specific regulatory requirements (HIPAA, GDPR, MHRA)?
5. What is the maturity timeline (MVP, v1.0, v2.0)?

### Technical Architecture Questions
1. Should settings be stored in database or configuration files?
2. How should template rendering work (server-side vs. client-side)?
3. Should there be a plugin architecture for custom features?
4. What is the data migration strategy for existing organizations?
5. How should multi-tenancy scale (database-per-tenant vs. shared schema)?

## Recommendations

### Phase 1: Critical Organization Settings (High Priority)

**1. Create Organization Settings Hub Page** 🚨
- **File**: `src/pages/organization/OrganizationSettingsPage.tsx`
- **Route**: `/organization/settings`
- **Features**:
  - Categorized settings sections (Basic, Service Provision, Payments, Labs)
  - Navigation cards to sub-pages
  - Quick stats (users, roles, locations, templates)
  - Search settings functionality

**2. Implement Organization Profile Page** 🚨
- **File**: `src/pages/organization/OrganizationProfilePage.tsx`
- **Route**: `/organization/settings/profile`
- **Features**:
  - Editable organization details (name, type, code)
  - Multiple contact methods (phones, emails)
  - Address with timezone selection
  - Website and social media links
  - Bank details for payment processing
  - Logo upload
  - Organization description/about section

**3. Create User Management Interface** 🚨
- **File**: `src/pages/organization/UserManagementPage.tsx`
- **Route**: `/organization/settings/users`
- **Features**:
  - Unified view of all users (staff, admins, etc.)
  - User roles and status
  - Bulk invite/deactivate
  - User activity logs
  - Password reset functionality
  - Session management
  - Integrate existing `UserRegistrationsPage.tsx` as a tab

**4. Implement Role Management System** 🚨
- **File**: `src/pages/organization/RoleManagementPage.tsx`
- **Route**: `/organization/settings/roles`
- **Backend required**: Role definition API
- **Features**:
  - Create custom roles
  - Define permissions per role (read, write, delete, approve)
  - Role hierarchy
  - Assign capabilities by feature area
  - Role templates for common setups

### Phase 2: Service Provision Settings (High Priority)

**5. Create Price List Management** 🔥
- **File**: `src/pages/organization/PriceListPage.tsx`
- **Route**: `/organization/settings/price-list`
- **Features**:
  - Service catalog (consultations, procedures, tests)
  - Pricing tiers (standard, urgent, after-hours)
  - Insurance pricing vs. private pricing
  - Bulk import/export
  - Price history and effective dates
  - Service bundling

**6. Implement Consultation Notes Template System** 🔥
- **Files**:
  - `src/pages/organization/TemplateLibraryPage.tsx` - Template library
  - `src/components/templates/TemplateBuilder.tsx` - Visual builder
  - `src/components/templates/TemplateEditor.tsx` - Edit templates
  - `src/components/templates/StructuredNoteForm.tsx` - Use templates during encounters
- **Routes**:
  - `/organization/settings/templates` - Library
  - `/organization/settings/templates/builder` - Create new
  - `/organization/settings/templates/:id/edit` - Edit existing
- **Backend required**: Template storage API with versioning
- **Features**:
  - **Template Library**:
    - Organize by location (Forms, Online Booking, Inpatient, Outpatient)
    - Organize by role (Doctor, Nurse, Specialist)
    - Status: Draft, Ready to Use, Archived
    - Template count by category
    - Search and filter
    - Preview templates
    - Duplicate templates
  - **Template Builder**:
    - Drag-and-drop section builder
    - Predefined formats (SOAP, DAP, BIRP, GIRP)
    - Field types: text, textarea, checkbox, radio, dropdown, date, signature
    - Section types: DATA, ASSESSMENT, PLAN, Subjective, Objective
    - Required vs. optional fields
    - Field validation rules
    - Conditional fields (show/hide based on other fields)
    - Keywords/highlighting configuration
  - **Structured Note Entry**:
    - Section-based forms
    - Auto-save as draft
    - Clinical terminology suggestions
    - Copy from previous notes
    - Insert common phrases
    - Highlight keywords (like Medesk's "severe anxiety" highlighting)
    - Print preview

**7. Create Health Packages Management** 🔥
- **File**: `src/pages/organization/HealthPackagesPage.tsx`
- **Route**: `/organization/settings/health-packages`
- **Features**:
  - Create service bundles
  - Package pricing (with discount)
  - Package duration/validity
  - Included services checklist
  - Patient eligibility criteria
  - Package promotions
  - Booking packages from patient portal

### Phase 3: Facility & Schedule Settings (Medium Priority)

**8. Implement Locations & Rooms Management** 🔧
- **File**: `src/pages/organization/LocationsRoomsPage.tsx`
- **Route**: `/organization/settings/locations-rooms`
- **Features**:
  - Multi-location support (for hospital chains)
  - Building/floor/room hierarchy
  - Room types (exam room, treatment room, OR, ER)
  - Room capacity and equipment
  - Room availability scheduling
  - Room assignment to departments
  - Floor plans (optional, future)

**9. Create Global Schedule Management** 🔧
- **File**: `src/pages/organization/ScheduleSettingsPage.tsx`
- **Route**: `/organization/settings/schedule`
- **Features**:
  - Organization working hours (default)
  - Holiday calendar
  - Closure dates
  - Break policies
  - Shift templates (morning, evening, night)
  - On-call schedules
  - Department-specific hours

**10. Implement Online Booking Settings** 🔧
- **File**: `src/pages/organization/OnlineBookingSettingsPage.tsx`
- **Route**: `/organization/settings/online-booking`
- **Features**:
  - Enable/disable online booking per service
  - Booking hours restrictions
  - Advance booking limits (e.g., 60 days ahead)
  - Same-day booking rules
  - Buffer time between appointments
  - Cancellation policy (hours before)
  - Reschedule policy
  - New patient vs. returning patient rules
  - Deposit requirements

### Phase 4: Clinical Enhancement (Medium-High Priority)

**11. Implement Structured Progress Notes (SOAP)** 🔥
- **Files**:
  - `src/components/clinical/SOAPNoteForm.tsx`
  - `src/components/clinical/DAPNoteForm.tsx`
  - Update `patientTypes.ts` to include structured note interface
- **Features**:
  - SOAP format: Subjective, Objective, Assessment, Plan
  - DAP format: Data, Assessment, Plan
  - Section-specific text areas with guidance
  - Auto-population from vitals (Objective section)
  - Problem list integration
  - Medication reconciliation in Plan
  - Follow-up scheduling from Plan
  - Clinical decision support prompts

**12. Create Discharge Summary Template** 🔥
- **File**: `src/components/clinical/DischargeSummaryForm.tsx`
- **Features**:
  - Reason for admission
  - Hospital course summary
  - Discharge diagnosis (primary and secondary)
  - Discharge medications with reconciliation
  - Follow-up appointments
  - Activity restrictions
  - Diet instructions
  - Discharge disposition
  - Patient education provided

**13. Implement Operative Note Template** 🔥
- **File**: `src/components/clinical/OperativeNoteForm.tsx`
- **Integration**: Link to `SurgerySchedulePage.tsx`
- **Features**:
  - Pre-operative diagnosis
  - Post-operative diagnosis
  - Procedure performed (with CPT codes)
  - Surgeon, assistant, anesthesiologist, nurses
  - Anesthesia type
  - Incision description
  - Findings
  - Procedure details
  - Specimens sent
  - Estimated blood loss
  - Complications
  - Implants/hardware used

**14. Add Drug Interaction Checking** 🔥
- **Integration**: Enhance prescription system
- **Backend required**: Drug interaction database API
- **Features**:
  - Real-time interaction alerts (drug-drug)
  - Severity levels (contraindicated, major, moderate, minor)
  - Drug-allergy checking
  - Duplicate therapy alerts
  - Dosing guidance based on age/weight/renal function
  - Override with documentation requirement

### Phase 5: Administrative Features (Medium Priority)

**15. Implement Tag Management** 🔧
- **File**: `src/pages/organization/TagManagementPage.tsx`
- **Route**: `/organization/settings/tags`
- **Features**:
  - Create custom tags/labels
  - Tag categories (diagnosis, procedure, clinical, administrative)
  - ICD-10 code management
  - CPT code management
  - Custom terminology
  - Tag hierarchy (parent-child)
  - Tag usage tracking

**16. Create Subscription/Licensing Page** 🔧
- **File**: `src/pages/organization/SubscriptionPage.tsx`
- **Route**: `/organization/settings/subscription`
- **Features**:
  - Current plan display (Free, Basic, Pro, Enterprise)
  - Feature limits vs. usage
  - User count limits
  - Storage limits
  - Upgrade/downgrade options
  - Billing history
  - Invoices download
  - Payment method management
  - Terms of service display

**17. Implement Comprehensive Audit Trails** 🔧
- **File**: `src/pages/organization/AuditLogsPage.tsx`
- **Backend required**: Comprehensive logging system
- **Features**:
  - All record access logs
  - Changes made to records (before/after)
  - User actions (login, logout, failed attempts)
  - Administrative actions (user created, role changed)
  - Filter by user, date range, action type, resource
  - Export audit logs
  - Compliance reports (HIPAA, GDPR)

**18. Create Consent Management System** 🔧
- **Files**:
  - `src/pages/organization/ConsentFormsPage.tsx` - Manage consent forms
  - `src/components/consent/ConsentCaptureForm.tsx` - Capture consent
  - `src/features/professional/patients/ConsentHistory.tsx` - View patient consents
- **Features**:
  - Consent form templates (treatment, research, data sharing)
  - Electronic signature capture
  - Consent versioning
  - Expiry and renewal tracking
  - Consent status (active, expired, revoked)
  - Consent audit trail
  - Multi-language consent forms

### Phase 6: Patient Engagement (Lower Priority)

**19. Enhance Patient Portal** 📱
- **Files**: Enhance existing patient features
- **Features to add**:
  - Secure messaging with providers
  - Patient education library (assign reading materials)
  - Wellness tracking (weight, blood pressure, blood glucose)
  - Family/proxy access (parents, caregivers)
  - Request prescription refills
  - View test results with explanations
  - Complete intake forms before visit

**20. Add Patient Education Library** 📱
- **File**: `src/pages/organization/PatientEducationPage.tsx`
- **Features**:
  - Educational content library
  - Condition-specific education
  - Medication instructions
  - Video library
  - Assign materials to patients
  - Track if materials were viewed
  - Multi-language support

### Phase 7: Advanced Clinical (Lower Priority)

**21. Implement Problem List** 📊
- **Integration**: Add to patient chart
- **Features**:
  - Active problem list (diagnoses)
  - Problem onset date and end date
  - Problem status (active, resolved, inactive)
  - ICD-10 coding
  - Problem-oriented charting
  - Link notes to problems

**22. Create Immunization Registry** 📊
- **File**: `src/features/professional/patients/ImmunizationRegistry.tsx`
- **Features**:
  - Complete vaccination history
  - Immunization schedule tracking
  - Vaccine lot number and manufacturer
  - VIS (Vaccine Information Statement) provided
  - Vaccine forecasting (what's due)
  - Registry reporting
  - Adverse event reporting

**23. Add Care Coordination Tools** 📊
- **Files**:
  - `src/features/professional/patients/CareTeam.tsx` - Care team management
  - `src/features/professional/patients/CareTransitions.tsx` - Transition tracking
- **Features**:
  - Care team members (multiple providers per patient)
  - Task assignment across team
  - Care plan sharing
  - Transition of care tracking (hospital → home → rehab)
  - Post-discharge follow-up scheduling

**24. Implement Quality Measures Dashboard** 📊
- **File**: `src/pages/organization/QualityDashboardPage.tsx`
- **Features**:
  - HEDIS measures tracking
  - Quality measure performance by provider
  - Patient registry for chronic conditions
  - Quality improvement tracking
  - Benchmarking against national standards

### Phase 8: Integration & Interoperability (Advanced)

**25. Add HL7/FHIR Support** 🔌
- **Backend required**: HL7/FHIR engine
- **Features**:
  - HL7 v2 ADT messages (admissions, discharges, transfers)
  - FHIR API endpoints (Patient, Encounter, Observation, MedicationRequest)
  - CDA document generation
  - HIE connectivity
  - Query for external patient data

**26. Implement Lab Interface** 🔌
- **Backend required**: Lab interface engine
- **Features**:
  - Electronic lab orders (CPOE)
  - Automated result import (HL7 ORU messages)
  - Bidirectional communication
  - Result routing to ordering provider
  - Critical result notifications

**27. Add E-Prescribing Integration** 🔌
- **Backend required**: Surescripts or equivalent
- **Features**:
  - Send prescriptions electronically to pharmacies
  - EPCS (Electronic Prescribing for Controlled Substances)
  - Pharmacy benefit checking
  - Medication history from PBM
  - Prior authorization electronic submission

**28. Integrate PACS for Imaging** 🔌
- **Backend required**: PACS integration
- **Features**:
  - Embedded image viewer in EMR
  - Radiology report routing
  - Prior imaging comparison
  - Image sharing with specialists
  - DICOM worklist

### Implementation Priority Matrix

| Priority | Feature | Effort | Impact | Dependencies |
|----------|---------|--------|--------|--------------|
| 🚨 Critical | Organization Settings Hub | Medium | High | None |
| 🚨 Critical | Organization Profile Page | Low | High | Settings Hub |
| 🚨 Critical | User Management Interface | Medium | High | None |
| 🚨 Critical | Role Management System | High | High | Backend API |
| 🔥 High | Price List Management | Medium | High | Backend API |
| 🔥 High | Template Library | High | Very High | Backend API |
| 🔥 High | Template Builder | Very High | Very High | Template Library |
| 🔥 High | Structured Notes (SOAP) | Medium | Very High | Template System |
| 🔥 High | Health Packages | Medium | Medium | Price List |
| 🔥 High | Discharge Summary | Medium | High | Template System |
| 🔥 High | Operative Notes | Medium | High | Template System |
| 🔥 High | Drug Interaction Checking | High | Very High | External API |
| 🔧 Medium | Locations & Rooms | Medium | Medium | Settings Hub |
| 🔧 Medium | Schedule Settings | Medium | Medium | Settings Hub |
| 🔧 Medium | Online Booking Settings | Low | Medium | Settings Hub |
| 🔧 Medium | Tag Management | Low | Medium | Backend API |
| 🔧 Medium | Subscription Page | Low | Low | Backend API |
| 🔧 Medium | Audit Trails | High | High | Backend Logging |
| 🔧 Medium | Consent Management | Medium | High | Backend API |
| 📱 Lower | Patient Portal Enhancement | High | Medium | Multiple |
| 📱 Lower | Patient Education | Medium | Low | Content Library |
| 📊 Lower | Problem List | Low | Medium | Patient Chart |
| 📊 Lower | Immunization Registry | Medium | Medium | Backend API |
| 📊 Lower | Care Coordination | High | Medium | Multiple |
| 📊 Lower | Quality Dashboard | High | Low | Data Analytics |
| 🔌 Advanced | HL7/FHIR | Very High | High | Backend Engine |
| 🔌 Advanced | Lab Interface | Very High | High | Third Party |
| 🔌 Advanced | E-Prescribing | Very High | High | Surescripts |
| 🔌 Advanced | PACS Integration | Very High | Medium | Third Party |

### Quick Wins (Implement First)
1. ✅ **Organization Profile Page** (Low effort, high visibility)
2. ✅ **Online Booking Settings** (Low effort, user-facing)
3. ✅ **Tag Management** (Low effort, enables better organization)
4. ✅ **Subscription Page** (Low effort, business critical)

### Foundation Builders (Critical Infrastructure)
1. ✅ **Organization Settings Hub** (Central navigation)
2. ✅ **Role Management System** (Security foundation)
3. ✅ **User Management Interface** (Administrative foundation)
4. ✅ **Template System** (Clinical documentation foundation)

### High-Impact Clinical
1. ✅ **Structured Notes (SOAP/DAP)** (Daily use, quality improvement)
2. ✅ **Drug Interaction Checking** (Patient safety critical)
3. ✅ **Discharge Summaries** (Care transitions, compliance)
4. ✅ **Operative Notes** (Surgical documentation)

### Revenue Generators
1. ✅ **Price List Management** (Enables billing)
2. ✅ **Health Packages** (New revenue stream)
3. ✅ **Subscription Tiers** (Business model)

## Conclusion

The PHB Frontend has a **strong EMR/EHR foundation** with comprehensive clinical workflows, security, and patient management. However, it is **missing critical organizational administration pages** that mature EMR systems like Medesk provide.

**Highest Priority Gaps**:
1. **Organization Settings Hub** - Centralized configuration interface
2. **Template Management System** - Clinical note templates organized by role/location
3. **Structured Clinical Notes** - SOAP/DAP format implementation
4. **Role & User Management** - Administrative control and security

**Implementation Recommendation**:
- **Phase 1**: Build Organization Settings Hub and Profile Page (2-3 weeks)
- **Phase 2**: Implement Template Library and Builder (4-6 weeks)
- **Phase 3**: Add Price List and Health Packages (2-3 weeks)
- **Phase 4**: Enhance clinical documentation (SOAP notes, discharge summaries) (3-4 weeks)
- **Phase 5+**: Advanced features based on user feedback

The system is **production-ready for core EMR functions** but needs these **administrative and template features** to be competitive with commercial EMR systems like Medesk, Epic, Cerner, or Athenahealth.