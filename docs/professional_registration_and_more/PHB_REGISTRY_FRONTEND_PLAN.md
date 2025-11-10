# PHB Professional Registry - Frontend Implementation Plan

**Status**: Planning Phase
**Date**: November 2, 2025

---

## 🎯 Overview

Building user-facing interfaces for the PHB Professional Registration System.

**Current State**: ✅ Backend complete (26 API endpoints)
**Next Phase**: 🎨 Frontend UI/UX implementation

---

## 📋 Frontend Pages Required

### 1. **Public Registry Search** (`/registry/search`)
**Purpose**: Allow patients and hospitals to search for and verify licensed professionals

**Features**:
- Search form (name, license number, location, specialty)
- Advanced filters (state, city, professional type)
- Results grid with professional cards
- Professional profile modal/page
- License verification widget
- Quick verify by license number

**Components**:
- `RegistrySearchPage.tsx`
- `ProfessionalCard.tsx`
- `ProfessionalProfile.tsx`
- `LicenseVerificationWidget.tsx`
- `SearchFilters.tsx`

**API Endpoints Used**:
- `GET /api/registry/search/`
- `GET /api/registry/verify/<license>/`
- `GET /api/registry/states/`
- `GET /api/registry/professional-types/`
- `GET /api/registry/specializations/`

**Priority**: HIGH (public-facing, builds trust)

---

### 2. **Professional Registration Portal** (`/registry/apply`)
**Purpose**: Allow healthcare professionals to apply for PHB license

**Features**:
- Multi-step registration form (5-6 steps)
- Form validation with Nigerian context
- Document upload (drag-and-drop)
- Required documents checklist
- Terms & conditions agreement
- Application preview before submission
- Payment integration (Paystack)

**Steps**:
1. Personal Information
2. Professional Qualifications
3. Employment History
4. Document Upload
5. Review & Submit
6. Payment (if applicable)

**Components**:
- `ProfessionalRegistrationPage.tsx`
- `RegistrationStep1Personal.tsx`
- `RegistrationStep2Qualifications.tsx`
- `RegistrationStep3Employment.tsx`
- `RegistrationStep4Documents.tsx`
- `RegistrationStep5Review.tsx`
- `DocumentUploadZone.tsx`
- `RequiredDocumentsChecklist.tsx`

**API Endpoints Used**:
- `POST /api/registry/applications/`
- `PUT /api/registry/applications/<id>/`
- `POST /api/registry/applications/<id>/documents/`
- `POST /api/registry/applications/<id>/submit/`
- `GET /api/registry/required-documents/`

**Priority**: HIGH (core functionality)

---

### 3. **Professional Dashboard** (`/professional/registry`)
**Purpose**: Professionals track their applications and manage licenses

**Features**:
- My applications list
- Application status tracking (visual timeline)
- Document status (verified/pending/rejected)
- Application actions (edit draft, submit, resubmit)
- License card (once approved)
- Renewal reminders
- Download license certificate (PDF)

**Components**:
- `ProfessionalRegistryDashboard.tsx`
- `ApplicationStatusCard.tsx`
- `ApplicationTimeline.tsx`
- `LicenseCard.tsx`
- `DocumentStatusList.tsx`

**API Endpoints Used**:
- `GET /api/registry/applications/`
- `GET /api/registry/applications/<id>/`
- `GET /api/registry/applications/<id>/documents/`

**Priority**: HIGH (user retention)

---

### 4. **Admin Review Dashboard** (`/admin/registry/applications`)
**Purpose**: PHB admins review and approve professional applications

**Features**:
- Application queue (filterable by status)
- Application detail view
- Document viewer with verify/reject actions
- Approval workflow
- Rejection with reason
- Request additional documents
- License management (suspend, revoke, renew)
- Bulk actions
- Statistics dashboard

**Components**:
- `AdminRegistryDashboard.tsx`
- `ApplicationQueue.tsx`
- `ApplicationReviewPanel.tsx`
- `DocumentVerificationPanel.tsx`
- `ApprovalModal.tsx`
- `RejectionModal.tsx`
- `LicenseManagementTable.tsx`
- `RegistryStatistics.tsx`

**API Endpoints Used**:
- `GET /api/registry/admin/applications/`
- `GET /api/registry/admin/applications/<id>/`
- `POST /api/registry/admin/applications/<id>/start-review/`
- `POST /api/registry/admin/applications/<id>/documents/<doc_id>/verify/`
- `POST /api/registry/admin/applications/<id>/approve/`
- `POST /api/registry/admin/applications/<id>/reject/`
- `GET /api/registry/admin/registry/`
- `POST /api/registry/admin/registry/<license>/suspend/`

**Priority**: HIGH (admin workflow)

---

### 5. **License Verification Page** (`/registry/verify`)
**Purpose**: Quick public license verification

**Features**:
- Simple input (license number)
- Instant verification result
- Professional details (if valid)
- Print verification result
- Share verification link

**Components**:
- `LicenseVerificationPage.tsx`
- `VerificationResult.tsx`

**API Endpoints Used**:
- `GET /api/registry/verify/<license>/`

**Priority**: MEDIUM (nice-to-have, trust builder)

---

### 6. **Registry Statistics Page** (`/registry/statistics`)
**Purpose**: Public transparency about PHB registry

**Features**:
- Total professionals by type (charts)
- Professionals by state (map)
- Registration trends (line chart)
- Specialization breakdown

**Components**:
- `RegistryStatisticsPage.tsx`
- `StatisticsCharts.tsx`

**API Endpoints Used**:
- `GET /api/registry/statistics/`

**Priority**: LOW (nice-to-have)

---

## 🏗️ Technical Architecture

### Frontend Stack (Already in Project):
- ✅ React 18 with TypeScript
- ✅ Material-UI components
- ✅ React Router v6
- ✅ Axios for API calls
- ✅ Vite build tool

### New Services Needed:
```typescript
// src/services/registryService.ts
- searchRegistry()
- verifyLicense()
- createApplication()
- uploadDocument()
- submitApplication()
- getMyApplications()
- getApplicationDetails()

// Admin services
- adminListApplications()
- adminApproveApplication()
- adminRejectApplication()
- etc.
```

### Routing Structure:
```
/registry/                   → RegistryLandingPage (info about PHB registry)
/registry/search             → RegistrySearchPage (public search)
/registry/verify             → LicenseVerificationPage
/registry/apply              → ProfessionalRegistrationPage (multi-step form)
/registry/statistics         → RegistryStatisticsPage

/professional/registry       → ProfessionalRegistryDashboard
/professional/registry/applications/<id> → ApplicationDetailPage

/admin/registry              → AdminRegistryDashboard
/admin/registry/applications → ApplicationQueuePage
/admin/registry/applications/<id> → ApplicationReviewPage
/admin/registry/licenses     → LicenseManagementPage
```

---

## 🎨 Design System

### Colors (Nigerian Theme):
- Primary: Green (#008751) - Nigerian flag green
- Secondary: White (#FFFFFF)
- Accent: Gold (#FFD700) - Trust, excellence
- Error: Red (#DC143C)
- Success: Green (#28A745)

### Components Style:
- Clean, modern cards
- Clear typography (Roboto/Inter)
- Ample white space
- Mobile-responsive
- Accessibility (WCAG 2.1 AA)

---

## 📱 Responsive Design

All pages must work on:
- Desktop (1920px+)
- Laptop (1366px)
- Tablet (768px)
- Mobile (375px)

---

## 🔐 Authentication Context

**New Context Required**:
```typescript
// src/contexts/RegistryContext.tsx
- Current application (if in draft)
- My applications list
- Upload progress
```

**Reuse Existing**:
- `AuthContext` (user authentication)
- Admin authentication from existing admin context

---

## 📊 Implementation Phases

### **Phase 1: Core Professional Flow** (Priority: HIGHEST)
**Goal**: Allow professionals to register and track applications

**Components** (Order):
1. `registryService.ts` - API integration
2. `ProfessionalRegistrationPage.tsx` - Multi-step form
3. `DocumentUploadZone.tsx` - File upload
4. `ProfessionalRegistryDashboard.tsx` - Application tracking
5. Routes integration

**Estimated Time**: 6-8 hours
**Deliverable**: Professional can apply and track status

---

### **Phase 2: Public Search & Verification** (Priority: HIGH)
**Goal**: Public can search and verify professionals

**Components**:
1. `RegistrySearchPage.tsx` - Search interface
2. `ProfessionalCard.tsx` - Results display
3. `LicenseVerificationPage.tsx` - Quick verify

**Estimated Time**: 4-6 hours
**Deliverable**: Public search works

---

### **Phase 3: Admin Review Dashboard** (Priority: HIGH)
**Goal**: Admins can review and approve applications

**Components**:
1. `AdminRegistryDashboard.tsx` - Queue management
2. `ApplicationReviewPanel.tsx` - Review interface
3. `DocumentVerificationPanel.tsx` - Document review
4. `ApprovalModal.tsx` - Approval workflow

**Estimated Time**: 6-8 hours
**Deliverable**: Complete admin workflow

---

### **Phase 4: Polish & Enhancement** (Priority: MEDIUM)
**Goal**: Improve UX and add nice-to-have features

**Features**:
1. Statistics page
2. PDF certificate generation
3. Email notifications (frontend trigger)
4. Advanced search filters
5. Professional profile pages

**Estimated Time**: 4-6 hours
**Deliverable**: Production-ready UI

---

## 🚀 Quick Start (Phase 1)

### Step 1: Create Registry Service
```typescript
// src/services/registryService.ts
export const registryService = {
  // Public APIs
  searchRegistry: async (params) => {...},
  verifyLicense: async (licenseNumber) => {...},

  // Professional APIs
  createApplication: async (data) => {...},
  getMyApplications: async () => {...},
  uploadDocument: async (applicationId, file, metadata) => {...},
  submitApplication: async (applicationId) => {...},

  // Reference data
  getNigerianStates: async () => {...},
  getProfessionalTypes: async () => {...},
  getSpecializations: async (type) => {...},
};
```

### Step 2: Create Registration Page
```typescript
// src/pages/registry/ProfessionalRegistrationPage.tsx
- Multi-step form (Material-UI Stepper)
- Form state management (useState or react-hook-form)
- Progress saving (auto-save drafts)
- Validation
```

### Step 3: Add Routes
```typescript
// src/App.tsx
<Route path="/registry/*" element={<RegistryRoutes />} />
```

---

## ❓ Open Questions & Design Decisions

### **CRITICAL QUESTION 1: Hospital Migration**
**Question**: "How do existing hospital doctors migrate to PHB without stress?"

**Current Situation**:
- Nigerian hospitals already have doctors working
- Doctors are registered with MDCN (Medical and Dental Council of Nigeria)
- Doctors are employed by hospitals (private or public)

**Problem**:
If we require ALL doctors to apply individually through PHB:
- 10,000+ doctors would need to apply manually
- Massive administrative burden
- Disruption to existing hospital operations
- Doctors might resist new bureaucracy

**Proposed Solutions**:

#### **Option A: Bulk Hospital Migration** (RECOMMENDED)
**How it works**:
1. Hospital admin uploads CSV of existing staff
2. Includes: Name, MDCN number, specialization, etc.
3. PHB auto-creates applications in "pending verification" status
4. PHB verifies MDCN registration in bulk (API to MDCN if available)
5. Auto-approve if MDCN valid
6. Issue PHB licenses in bulk
7. Email each doctor: "You've been registered with PHB by [Hospital Name]"

**Pros**:
- Zero work for individual doctors
- Hospitals can migrate entire staff at once
- Fast onboarding (thousands in one day)
- PHB builds registry quickly

**Cons**:
- Need MDCN API integration (or manual verification)
- Doctors don't fill own forms (less data validation)

**Implementation**:
```
New Admin Endpoint:
POST /api/registry/admin/bulk-import/
- Upload CSV
- Create applications
- Auto-verify with MDCN
- Issue licenses
```

---

#### **Option B: MDCN Auto-Sync** (IDEAL BUT COMPLEX)
**How it works**:
1. PHB integrates with MDCN database (if API exists)
2. Sync all MDCN-registered doctors to PHB automatically
3. Issue PHB licenses to all MDCN doctors
4. Keep in sync (daily/weekly)

**Pros**:
- Zero manual work
- Always up-to-date
- National coverage instantly

**Cons**:
- Requires MDCN cooperation (may not have API)
- Legal/regulatory approval needed
- Technical complexity

---

#### **Option C: Simplified Fast-Track for MDCN Holders** (BALANCE)
**How it works**:
1. Doctor applies through normal PHB form
2. If they have MDCN number → "Fast Track" workflow
3. System auto-fetches MDCN data (if API) or accepts MDCN certificate upload
4. Skip document verification (trust MDCN verification)
5. Auto-approve within 24 hours
6. Issue PHB license

**Pros**:
- Doctors still apply (data validation)
- Much faster than full review (24hrs vs 2 weeks)
- Less admin burden
- Trust existing MDCN verification

**Cons**:
- Doctors still need to apply individually
- Slower than bulk import

**Implementation**:
```typescript
// In registration form
if (hasMDCNNumber) {
  // Show fast-track badge
  // Auto-fill from MDCN (if API)
  // Skip detailed document requirements
  // Flag for auto-approval
}
```

---

#### **Option D: Hospital-Initiated Registration** (HYBRID)
**How it works**:
1. Hospital admin can "pre-register" their staff
2. Creates draft applications with basic info
3. Doctor receives email: "Complete your PHB registration"
4. Doctor logs in, verifies pre-filled data, uploads documents
5. Submit for approval
6. Faster because basic info already filled

**Pros**:
- Hospital helps with migration
- Doctor still owns their application
- Data quality maintained
- Less burden on individual doctors

**Cons**:
- Still requires doctor action
- Two-step process

---

### **RECOMMENDATION: Option A + Option C**

**Phase 1 (Immediate - For Existing Hospital Staff)**:
- Bulk hospital migration (Option A)
- Hospitals upload CSV of existing staff
- Auto-create applications
- Verify MDCN numbers (manual or API)
- Issue PHB licenses in bulk
- **Result**: 10,000+ doctors onboarded in 1 week

**Phase 2 (Ongoing - For New Professionals)**:
- Fast-track for MDCN holders (Option C)
- New doctors apply individually
- MDCN holders get 24-hour approval
- Non-MDCN (foreign doctors) get full review

**Implementation Plan**:
```
1. Build bulk import endpoint
2. Create CSV template for hospitals
3. Add MDCN verification step
4. Add "Fast Track" badge to registration form
5. Email notifications for bulk-registered doctors
```

---

### **CRITICAL QUESTION 2: Doctor-Hospital Relationship**

**Question**: "How do doctors link to hospitals in PHB?"

**Current Models**:

#### **Model 1: Registration ≠ Employment** (Recommended)
- PHB Registry = National license to practice (like MDCN)
- Hospital Employment = Separate system (Hospital Credentialing - Phase 2)
- Doctor can be licensed by PHB but work at multiple hospitals
- Doctor can be licensed but in private practice only

**Flow**:
1. Doctor applies to PHB → Gets PHB license (national)
2. Doctor applies to Hospital A → Hospital credentials them (local)
3. Doctor applies to Hospital B → Hospital credentials them (local)
4. Doctor has 1 PHB license, works at 2 hospitals

**Database**:
```
PHBProfessionalRegistry (National license)
└── Doctor: Dr. Chidi (PHB-DOC-2025-00001)

HospitalAffiliation (Local employment - Phase 2)
├── Dr. Chidi → Lagos Teaching Hospital
├── Dr. Chidi → Private Hospital Lagos
└── Dr. Chidi → Freelance/Private Practice
```

---

#### **Model 2: Registry Includes Hospital** (Simpler but Limited)
- Doctor applies to PHB and specifies hospital
- PHB license tied to hospital
- If doctor changes hospital, must update PHB registry

**Cons**:
- Doesn't support multiple hospitals
- Doesn't support private practice
- Tight coupling

**Not Recommended**

---

### **FINAL ARCHITECTURE DECISION**

```
PHB SYSTEM LAYERS:

Layer 1: National License (PHB Registry) ← WE BUILT THIS
├── Doctor applies
├── PHB verifies credentials
├── PHB issues license (PHB-DOC-2025-00001)
└── License is NATIONAL (not tied to hospital)

Layer 2: Hospital Credentialing (Phase 2 - TODO)
├── Doctor (with PHB license) applies to hospital
├── Hospital HR reviews
├── Hospital issues privileges
└── Doctor works at hospital

Layer 3: Practice Management (Future)
├── Doctor schedules appointments
├── Doctor sees patients
├── Doctor prescribes medications
└── Linked to existing PHB appointment system
```

**This matches NHS/GMC model perfectly!**

---

## 📋 Updated Implementation Plan

### **Phase 1: Core Registration UI** (NOW)
Build frontend for individual doctor registration

### **Phase 2: Bulk Migration Tool** (NEXT)
Build admin tool for hospitals to bulk-import existing staff

### **Phase 3: Hospital Credentialing** (LATER)
Build system for doctors to apply to hospitals (separate from national license)

---

## 🎯 Next Steps

1. **Clarify with user**: Which migration option to implement?
2. **Start Phase 1**: Build professional registration UI
3. **Add bulk import**: If user confirms Option A
4. **Design hospital credentialing**: For Phase 2

---

**Status**: Awaiting user decision on migration strategy
**Recommended**: Option A (Bulk Import) + Option C (Fast Track)
**Timeline**: 2-3 days for Phase 1 UI, 1 day for bulk import feature

---

**Last Updated**: November 2, 2025
**Architect**: Claude (Anthropic)
