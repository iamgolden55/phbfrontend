---
date: 2025-11-05 18:06:18 UTC
researcher: Claude (Sonnet 4.5)
git_commit: b601424d2b1ea6dcd679c9195b603ecefc718ba3
branch: main
repository: phbfrontend
topic: "Professional Registration Admin Review System - IAM-Style Implementation"
tags: [research, professional-registration, admin-review, IAM, role-based-access, registry]
status: complete
last_updated: 2025-11-05
last_updated_by: Claude (Sonnet 4.5)
---

# Research: Professional Registration Admin Review System

**Date**: 2025-11-05 18:06:18 UTC
**Researcher**: Claude (Sonnet 4.5)
**Git Commit**: b601424d2b1ea6dcd679c9195b603ecefc718ba3
**Branch**: main
**Repository**: phbfrontend

## Research Question

The user has successfully implemented the professional registration system where pharmacists and other healthcare professionals can register and upload required documents. The next phase is to implement an admin review/approval system with the following requirements:

1. **Who reviews applications?** A set of users with specific permissions to review professional applications
2. **Where does it live?** In the separate admin_dashboard (`/Users/new/phbfinal/admin_dashboard`) which acts as a centralized platform dashboard
3. **IAM-style access control** Similar to AWS IAM, where users can login but only access features their roles entail
4. **Review workflow** Admins should be able to:
   - Review applications and documents submitted
   - Approve or reject applications
   - Request additional information from applicants if needed
   - Issue PHB license numbers upon approval

## Summary

The professional registration system currently has a complete **frontend application flow** and **backend API infrastructure** ready for admin review. The admin_dashboard exists as a **React-based platform admin console** but currently lacks:

1. **Role-based access control (RBAC)** - No IAM-style permission system implemented
2. **Registry review UI** - No admin interface for reviewing professional applications
3. **Integration with registry backend** - Admin dashboard not yet connected to registry APIs

**Key Finding**: The backend has **15 fully-implemented admin endpoints** for application review, document verification, and license issuance. The admin_dashboard has the **UI patterns and authentication infrastructure** needed to build the review interface, but requires:
- Adding RBAC/IAM-style permissions to the auth system
- Creating registry review pages/components in the admin dashboard
- Connecting to existing backend admin API endpoints

## Detailed Findings

### Component 1: Backend Admin API (Already Built) ✅

**Location**: `/Users/new/Newphb/basebackend/api/views/admin_application_review_views.py`

The backend has **15 admin endpoints** fully implemented and ready to use:

#### Application Management Endpoints

1. **List All Applications**
   - URL: `GET /api/registry/admin/applications/`
   - Filters: `status`, `professional_type`, `submitted_after`, `search`
   - Pagination: `page`, `per_page`
   - Permission: `IsAdminUser` (checks `user.is_staff` or `user.is_superuser`)
   - Returns status summary with counts

2. **Get Application Details**
   - URL: `GET /api/registry/admin/applications/<uuid:application_id>/`
   - Returns full application with documents and verification status

3. **Start Review**
   - URL: `POST /api/registry/admin/applications/<uuid:application_id>/start-review/`
   - Changes status: `submitted` → `under_review`
   - Assigns reviewer: `reviewed_by = request.user`

4. **Approve Application**
   - URL: `POST /api/registry/admin/applications/<uuid:application_id>/approve/`
   - Validates all documents verified
   - Generates UUID-based PHB license number (format: `PHB-{TYPE}-{8CHARS}-{4CHARS}`)
   - Creates `PHBProfessionalRegistry` entry
   - Sends approval email with license number

5. **Reject Application**
   - URL: `POST /api/registry/admin/applications/<uuid:application_id>/reject/`
   - Requires rejection reason
   - Sends rejection email to applicant

6. **Request Additional Documents**
   - URL: `POST /api/registry/admin/applications/<uuid:application_id>/request-documents/`
   - Changes status to `documents_requested`
   - Applicant can upload additional docs

#### Document Verification Endpoints

7. **Verify Document**
   - URL: `POST /api/registry/admin/applications/<uuid:app_id>/documents/<uuid:doc_id>/verify/`
   - Marks document as verified
   - Tracks progress: verified_docs/total_docs

8. **Reject Document**
   - URL: `POST /api/registry/admin/applications/<uuid:app_id>/documents/<uuid:doc_id>/reject/`
   - Requires rejection reason
   - May trigger `documents_requested` status

9. **Request Document Clarification**
   - URL: `POST /api/registry/admin/applications/<uuid:app_id>/documents/<uuid:doc_id>/clarify/`
   - Sets verification status to `clarification_needed`

#### Registry Management Endpoints

10. **List All Registry Entries**
    - URL: `GET /api/registry/admin/registry/`
    - Filters: `license_status`, `professional_type`, `state`, `search`

11. **Suspend License**
    - URL: `POST /api/registry/admin/registry/<license_number>/suspend/`
    - Changes status to `suspended`

12. **Reactivate License**
    - URL: `POST /api/registry/admin/registry/<license_number>/reactivate/`
    - Changes status back to `active`

13. **Revoke License (Permanent)**
    - URL: `POST /api/registry/admin/registry/<license_number>/revoke/`
    - Changes status to `revoked`
    - Removes from public search

14. **Add Disciplinary Record**
    - URL: `POST /api/registry/admin/registry/<license_number>/disciplinary/`
    - Appends disciplinary notes (public transparency)

15. **Get Registry Statistics**
    - URL: `GET /api/registry/statistics/`
    - Returns counts by type, state, status

**Reference**: Full API documentation in `REGISTRY_TESTING_GUIDE.md:385-732`

### Component 2: Admin Dashboard (Needs Work) ⚠️

**Location**: `/Users/new/phbfinal/admin_dashboard`

#### Current State

**Tech Stack**:
- React 18 with JavaScript (not TypeScript)
- Create React App setup
- Bootstrap 5 + React Bootstrap
- React Router v6
- SCSS/SASS styling
- ApexCharts + Chart.js for visualization

**Authentication**: Implemented (`src/hooks/useAuth.js`)
- JWT-based authentication
- Access/refresh tokens in localStorage
- Automatic token refresh on 401 errors
- `withAuth()` HOC for route protection
- Login/logout flows complete

**Route Protection**: Implemented (`src/layouts/Main.js`)
- Checks `isAuthenticated` from `useAuth` hook
- Redirects to `/pages/signin` if not authenticated
- All dashboard routes nested under `Main` layout

**Current Dashboard Pages**:
- Platform Overview
- Hospital Management (`/dashboard/hospital`)
- Hospital Registry (`/dashboard/hospital-registry`)
- Healthcare Finance
- Sales Monitoring
- Event Management
- Helpdesk Service
- Storage Management
- Product Management

#### What's Missing

**No Role-Based Access Control (RBAC)**:
- Currently only checks "logged in" vs "not logged in"
- No user role fields in auth context
- No permission checks for features
- No granular access control
- All authenticated users see all features

**No Registry Review UI**:
- No pages for reviewing professional applications
- No components for document verification
- No admin approval workflow UI
- No integration with backend registry endpoints

**No Registry Service**:
- No API service layer for registry admin endpoints
- No TypeScript types for registry data
- No error handling for registry operations

### Component 3: Professional Registration Frontend (Reference Implementation) ✅

**Location**: `/Users/new/phbfinal/phbfrontend/src/`

The professional-facing registry UI provides excellent patterns to reuse:

#### AWS Console-Style Layout Patterns

**Stat Cards Widget** (`RegistryDashboardPage.tsx:113-125`):
```typescript
<div className="bg-white border border-gray-200 rounded p-4">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">Total applications</p>
      <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.total}</p>
    </div>
    <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
      <svg>...</svg>
    </div>
  </div>
</div>
```

**Table Widget Pattern** (`RegistryDashboardPage.tsx:174-287`):
```typescript
<div className="bg-white border border-gray-200 rounded">
  <div className="px-6 py-4 border-b border-gray-200">
    <h2 className="text-lg font-medium text-gray-900">Applications ({count})</h2>
  </div>
  <div className="p-6">
    <table className="min-w-full divide-y divide-gray-200">
      <thead><tr className="bg-gray-50">...</tr></thead>
      <tbody className="bg-white divide-y divide-gray-200">...</tbody>
    </table>
  </div>
</div>
```

#### Status Badge System

**Color Mapping** (`RegistryDashboardPage.tsx:50-60`):
```typescript
const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    draft: 'text-gray-600 bg-gray-50 border-gray-200',
    submitted: 'text-blue-600 bg-blue-50 border-blue-200',
    under_review: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    approved: 'text-green-600 bg-green-50 border-green-200',
    rejected: 'text-red-600 bg-red-50 border-red-200',
    clarification_requested: 'text-orange-600 bg-orange-50 border-orange-200',
  };
  return colors[status] || 'text-gray-600 bg-gray-50 border-gray-200';
};
```

#### Document Status Icons

Visual icons for document verification status (`ApplicationDetailPage.tsx:158-193`):
- ✓ Green checkmark for verified
- ✗ Red X for rejected
- ⏱ Yellow clock for pending
- ⚠ Orange warning for missing

#### Cookie-Based Authentication

**Auth Config** (`registryService.ts:241-251`):
```typescript
const getAuthConfig = () => {
  return {
    withCredentials: true,  // Send httpOnly cookies automatically
    headers: {
      'Content-Type': 'application/json',
    }
  };
};
```

All registry API calls use cookie-based authentication for XSS protection.

### Component 4: Application Workflow (Already Defined) ✅

**Status Transition Flow**:
```
draft → submitted → under_review → [approved | rejected]
                         ↓
                   documents_requested
                         ↓
                     submitted (loop)
```

**Application Statuses**:
- `draft` - Incomplete, user can edit
- `submitted` - Pending admin review
- `under_review` - Admin actively reviewing
- `documents_requested` - Additional docs needed
- `approved` - License issued
- `rejected` - Application denied
- `expired` - Timed out

**Document Verification Statuses**:
- `pending` - Awaiting review
- `verified` - Approved by admin
- `rejected` - Invalid/forged
- `clarification_needed` - Needs better copy

**Approval Requirements**:
1. All required documents uploaded
2. All documents verified by admin
3. Admin provides review notes
4. System generates unique PHB license number
5. Registry entry created
6. Approval email sent to applicant

### Component 5: IAM-Style RBAC Requirements (To Be Built) 🔨

Based on AWS IAM and the user's requirements, the system needs:

#### User Roles

**Platform Admin** (Superuser):
- Full access to all features
- Can manage other admin users
- Can override any decision
- Dashboard analytics and system monitoring

**Registry Reviewer** (Staff):
- Can review professional applications
- Can verify/reject documents
- Can approve/reject applications
- Can request additional information
- Cannot manage users or access platform settings

**Registry Verifier** (Limited Staff):
- Can only verify/reject documents
- Cannot approve applications
- Cannot access other features

**Support Staff** (Read-Only):
- Can view applications and status
- Cannot make changes
- Can communicate with applicants

#### Permissions Matrix

| Feature | Platform Admin | Registry Reviewer | Registry Verifier | Support Staff |
|---------|---------------|-------------------|-------------------|---------------|
| View applications | ✅ | ✅ | ✅ | ✅ |
| Start review | ✅ | ✅ | ❌ | ❌ |
| Verify documents | ✅ | ✅ | ✅ | ❌ |
| Approve application | ✅ | ✅ | ❌ | ❌ |
| Reject application | ✅ | ✅ | ❌ | ❌ |
| Suspend license | ✅ | ✅ | ❌ | ❌ |
| Revoke license | ✅ | ❌ | ❌ | ❌ |
| Manage users | ✅ | ❌ | ❌ | ❌ |
| Platform settings | ✅ | ❌ | ❌ | ❌ |

#### Implementation Approach

**Backend** (Django):
1. Create `Role` model with permissions
2. Add `role` foreign key to `User` model
3. Create custom permission classes:
   - `IsRegistryReviewer`
   - `IsRegistryVerifier`
   - `CanApproveApplications`
4. Apply to admin endpoints:
   ```python
   @permission_classes([IsRegistryReviewer])
   def approve_application(request, application_id):
       pass
   ```

**Frontend** (Admin Dashboard):
1. Extend `useAuth` hook to include user role:
   ```javascript
   const { user, isAuthenticated, role, permissions } = useAuth();
   ```

2. Add permission check utility:
   ```javascript
   const hasPermission = (permission) => {
     return user?.permissions?.includes(permission);
   };
   ```

3. Conditionally render UI based on permissions:
   ```javascript
   {hasPermission('approve_applications') && (
     <button onClick={approveApplication}>Approve</button>
   )}
   ```

4. Create route guards per permission level:
   ```javascript
   <Route
     path="/registry/review"
     element={
       <RequirePermission permission="review_applications">
         <RegistryReviewPage />
       </RequirePermission>
     }
   />
   ```

## Code References

### Backend Admin Endpoints
- `/Users/new/Newphb/basebackend/api/views/admin_application_review_views.py:37-732` - All admin review endpoints
- `/Users/new/Newphb/basebackend/api/registry_urls.py:105-127` - Admin URL routing
- `/Users/new/Newphb/basebackend/api/permissions.py:3-103` - Existing custom permissions

### Admin Dashboard Structure
- `/Users/new/phbfinal/admin_dashboard/src/hooks/useAuth.js:1-end` - Auth context hook
- `/Users/new/phbfinal/admin_dashboard/src/config/api.js:1-end` - API configuration
- `/Users/new/phbfinal/admin_dashboard/src/layouts/Main.js:1-end` - Protected layout
- `/Users/new/phbfinal/admin_dashboard/src/dashboard/HospitalRegistry.js:1-end` - Similar dashboard example

### Professional Frontend Patterns
- `/Users/new/phbfinal/phbfrontend/src/services/registryService.ts:591-814` - Admin API methods (reference)
- `/Users/new/phbfinal/phbfrontend/src/pages/registry/RegistryDashboardPage.tsx:1-end` - Dashboard layout patterns
- `/Users/new/phbfinal/phbfrontend/src/pages/registry/ApplicationDetailPage.tsx:1-end` - Detail view patterns

### Models and Workflow
- `/Users/new/Newphb/basebackend/api/models/registry/professional_application.py:1-end` - Application model
- `/Users/new/Newphb/basebackend/api/models/registry/application_document.py:1-end` - Document model
- `/Users/new/Newphb/basebackend/api/models/registry/professional_registry.py:1-end` - Registry model

## Architecture Insights

### Two-Dashboard Strategy

The system uses **two separate dashboards** for different user types:

**Professional Dashboard** (`/Users/new/phbfinal/phbfrontend`):
- TypeScript + React + Vite
- For healthcare professionals (doctors, pharmacists, nurses)
- Features: Apply for registration, upload documents, track application status
- Public-facing with protected professional routes
- Cookie-based authentication

**Platform Admin Dashboard** (`/Users/new/phbfinal/admin_dashboard`):
- JavaScript + React + Create React App
- For platform administrators and registry reviewers
- Features: Review applications, verify documents, approve/reject, manage licenses
- Internal-only with full authentication required
- localStorage-based authentication

### Microservice-Ready Architecture

The registry system is designed for extraction:
- All API calls isolated in single service files
- Configurable endpoint URLs
- Zero cross-module dependencies
- Can become independent microservice with 1 line change:
  ```typescript
  // Current
  const REGISTRY_API_URL = `${API_BASE_URL}/api/registry`;

  // Microservice
  const REGISTRY_API_URL = 'https://registry-service.phb.ng';
  ```

### Authentication Patterns

**Cookie-Based** (Professional Frontend):
- JWT tokens in httpOnly cookies
- XSS protection (JavaScript cannot access)
- `credentials: 'include'` on all API calls
- Automatic cookie management by browser

**localStorage-Based** (Admin Dashboard):
- Access/refresh tokens in localStorage
- Manual token management
- `getAuthHeaders()` adds Bearer token
- Auto-refresh on 401 errors

**Backend Validation**:
- Django REST Framework `IsAuthenticated` permission
- Django's `IsAdminUser` permission for admin endpoints
- Custom permissions: `IsMedicalStaff`, `IsHospitalAdmin`, etc.

### License Number Generation

UUID-based approach ensures:
- **Global uniqueness** - No collisions
- **Infinite capacity** - Never run out of numbers
- **Non-sequential** - Security through obscurity
- **Format**: `PHB-{TYPE}-{8CHARS}-{4CHARS}`
- **Example**: `PHB-DOC-A3F2B9C1-E4D7`

Implementation with collision detection and retry logic (max 5 attempts).

## Historical Context (from thoughts/)

### Previous Work

**Professional Registration Implementation** (`conversation.txt:1-92`):
- Successfully registered one pharmacist with 9 documents
- Fixed document upload errors (400 Bad Request)
- Fixed missing form fields (title, postcode)
- Application status changed to "pending verification"
- Email verification system working

**Registry UI Phase 1** (`REGISTRY_UI_PHASE1_COMPLETE.md`):
- Complete professional application form (6 steps)
- Document upload interface with drag-and-drop
- Application dashboard with status tracking
- 30+ API methods in service layer
- Microservice-ready architecture
- **Phase 2 needed**: Admin review interface

**Registry Workflow Fixes** (`REGISTRY_WORKFLOW_FIX_IMPLEMENTED.md`):
- Fixed status bug: applications created with `status='submitted'` instead of `'draft'`
- Document uploads now only allowed for `'draft'` and `'documents_requested'` statuses
- Clear error messages for invalid status transitions

**Authentication Fix** (`REGISTRY_DASHBOARD_AUTH_FIX.md`):
- Migrated from localStorage to cookie-based authentication
- All 21 professional API calls updated
- All 11 admin API calls updated
- XSS protection via httpOnly cookies

## Related Research

- `PROFESSIONAL_REGISTRATION_GUIDE.md` - Complete user guide for professionals applying
- `REGISTRY_TESTING_GUIDE.md` - Backend API testing instructions
- `PHB_REGISTRY_IMPLEMENTATION_COMPLETE.md` - Technical implementation overview

## Open Questions

1. **User Management**: How do we onboard new admin users?
   - Self-service registration + approval workflow?
   - Manual creation by platform admin?
   - Integration with existing hospital staff database?

2. **Role Assignment**: Who assigns roles to users?
   - Platform admin manually assigns?
   - Automatic role based on email domain?
   - Request-and-approve workflow?

3. **Permission Granularity**: How fine-grained should permissions be?
   - Per-endpoint level (e.g., `can_verify_documents`)?
   - Feature-level (e.g., `registry_admin`)?
   - Role-based (e.g., `reviewer` role has predefined permissions)?

4. **Audit Trail**: Should role changes be logged?
   - Who changed user's role and when?
   - Permission change history?
   - Access logs per admin action?

5. **Multi-Factor Authentication**: Required for admin users?
   - SMS/email OTP for login?
   - Authenticator app (TOTP)?
   - Only for certain roles?

6. **Session Management**: How long should admin sessions last?
   - Auto-logout after inactivity?
   - Require re-authentication for sensitive actions?
   - Session timeout configuration?

## Implementation Roadmap

### Phase 1: Backend RBAC (Estimated: 2-3 days)

**Tasks**:
1. Create `Role` model with permissions field (JSONField)
2. Add `role` foreign key to `User` model
3. Create migration to add default roles:
   - Platform Admin (all permissions)
   - Registry Reviewer (review + approve)
   - Registry Verifier (verify documents only)
   - Support Staff (read-only)
4. Create custom permission classes:
   - `IsRegistryReviewer`
   - `IsRegistryVerifier`
   - `CanApproveApplications`
5. Apply permissions to admin endpoints
6. Update serializers to include role and permissions
7. Create user management endpoints:
   - `POST /api/admin/users/` - Create admin user
   - `PATCH /api/admin/users/{id}/` - Update user role
   - `GET /api/admin/users/` - List admin users

**Files to Modify**:
- `/Users/new/Newphb/basebackend/api/models/user/user.py` - Add role field
- `/Users/new/Newphb/basebackend/api/permissions.py` - Add custom permissions
- `/Users/new/Newphb/basebackend/api/views/admin_application_review_views.py` - Apply permissions
- `/Users/new/Newphb/basebackend/api/serializers.py` - Include role in user serializer

### Phase 2: Admin Dashboard Auth Enhancement (Estimated: 1-2 days)

**Tasks**:
1. Update `useAuth` hook to fetch user role and permissions:
   ```javascript
   const [user, setUser] = useState(null);
   const [role, setRole] = useState(null);
   const [permissions, setPermissions] = useState([]);
   ```

2. Create permission check utility:
   ```javascript
   const hasPermission = (permission) => {
     return permissions.includes(permission);
   };
   ```

3. Create route guard components:
   ```javascript
   <RequirePermission permission="review_applications">
     <RegistryReviewPage />
   </RequirePermission>
   ```

4. Update menu configuration to show/hide based on permissions
5. Add role badge to header (Platform Admin, Reviewer, etc.)

**Files to Create/Modify**:
- `/Users/new/phbfinal/admin_dashboard/src/hooks/useAuth.js` - Extend with role/permissions
- `/Users/new/phbfinal/admin_dashboard/src/components/RequirePermission.jsx` - Permission guard
- `/Users/new/phbfinal/admin_dashboard/src/data/Menu.js` - Add permission checks

### Phase 3: Registry Service Layer (Estimated: 1 day)

**Tasks**:
1. Create `registryService.js` in admin dashboard:
   ```javascript
   export const registryAPI = {
     // Applications
     getAllApplications: async (filters) => { ... },
     getApplicationDetail: async (id) => { ... },
     startReview: async (id) => { ... },
     approveApplication: async (id, data) => { ... },
     rejectApplication: async (id, reason) => { ... },

     // Documents
     verifyDocument: async (appId, docId, notes) => { ... },
     rejectDocument: async (appId, docId, reason) => { ... },

     // Registry
     getAllProfessionals: async (filters) => { ... },
     suspendLicense: async (licenseNumber, reason) => { ... },
   };
   ```

2. Add error handling and loading states
3. Create TypeScript types file (optional but recommended)

**Files to Create**:
- `/Users/new/phbfinal/admin_dashboard/src/services/registryService.js` - Registry API calls
- `/Users/new/phbfinal/admin_dashboard/src/types/registry.d.ts` - TypeScript types (optional)

### Phase 4: Registry Admin UI Pages (Estimated: 3-5 days)

**Tasks**:
1. Create `RegistryOverview.js` dashboard:
   - Stat cards (total applications, pending, approved, rejected)
   - Chart showing applications over time
   - Recent applications table
   - Quick actions (view pending, start reviewing)

2. Create `RegistryApplicationsList.js`:
   - Table with all applications
   - Filters: status, professional type, date range
   - Search by name, email, application number
   - Click row to view detail
   - Status badges with color coding

3. Create `RegistryApplicationDetail.js`:
   - Application information display
   - Document verification interface
   - Action buttons based on status:
     - Draft: N/A (not visible to admins)
     - Submitted: "Start Review" button
     - Under Review: Verify/reject documents, approve/reject application
     - Documents Requested: View requested docs
     - Approved: View license number, suspend option
     - Rejected: View rejection reason
   - Timeline showing application history
   - Notes/comments section

4. Create `DocumentVerificationPanel.js` component:
   - List of all uploaded documents
   - Document preview (PDF viewer, image viewer)
   - Verification status indicators
   - Verify/reject/request clarification buttons
   - Rejection reason input
   - Progress tracker (X/Y documents verified)

5. Create `LicenseManagement.js`:
   - Table of all licensed professionals
   - Search and filter
   - License status badges
   - Actions: view profile, suspend, reactivate, revoke
   - Disciplinary records

6. Create `UserManagement.js`:
   - List of admin users
   - Add new admin user
   - Assign/change roles
   - Deactivate users
   - Audit log of role changes

**Files to Create**:
- `/Users/new/phbfinal/admin_dashboard/src/dashboard/RegistryOverview.js`
- `/Users/new/phbfinal/admin_dashboard/src/pages/registry/ApplicationsList.js`
- `/Users/new/phbfinal/admin_dashboard/src/pages/registry/ApplicationDetail.js`
- `/Users/new/phbfinal/admin_dashboard/src/components/registry/DocumentVerificationPanel.js`
- `/Users/new/phbfinal/admin_dashboard/src/pages/registry/LicenseManagement.js`
- `/Users/new/phbfinal/admin_dashboard/src/pages/admin/UserManagement.js`

**Routes to Add** (`/Users/new/phbfinal/admin_dashboard/src/routes/ProtectedRoutes.js`):
```javascript
{
  path: '/registry',
  element: <RegistryOverview />,
},
{
  path: '/registry/applications',
  element: <RequirePermission permission="review_applications">
    <ApplicationsList />
  </RequirePermission>,
},
{
  path: '/registry/applications/:applicationId',
  element: <RequirePermission permission="review_applications">
    <ApplicationDetail />
  </RequirePermission>,
},
{
  path: '/registry/licenses',
  element: <RequirePermission permission="manage_licenses">
    <LicenseManagement />
  </RequirePermission>,
},
{
  path: '/admin/users',
  element: <RequirePermission permission="manage_users">
    <UserManagement />
  </RequirePermission>,
},
```

### Phase 5: Testing & Refinement (Estimated: 2-3 days)

**Tasks**:
1. End-to-end testing of review workflow:
   - Submit application as professional
   - Review and approve as admin
   - Verify license issued correctly
   - Test document rejection flow
   - Test additional documents request

2. Permission boundary testing:
   - Verify reviewers cannot access user management
   - Verify verifiers cannot approve applications
   - Test unauthorized access attempts

3. UI/UX refinement:
   - Ensure all status transitions clear
   - Add loading spinners
   - Add success/error toasts
   - Improve error messages
   - Add helpful tooltips

4. Performance testing:
   - Test with 100+ applications
   - Optimize table rendering
   - Add pagination/virtual scrolling if needed

### Total Estimated Time: 9-15 days

## Success Criteria

**Backend RBAC**:
- ✅ Roles and permissions defined in database
- ✅ Custom permission classes created
- ✅ Admin endpoints protected by role
- ✅ User management API working

**Admin Dashboard**:
- ✅ Auth system includes role and permissions
- ✅ Permission guards on routes
- ✅ Menu items show/hide based on permissions
- ✅ Role badge visible in header

**Registry Review UI**:
- ✅ Admins can view all applications
- ✅ Admins can filter and search applications
- ✅ Admins can review application details
- ✅ Admins can verify/reject documents
- ✅ Admins can approve/reject applications
- ✅ License numbers generated on approval
- ✅ Email notifications sent
- ✅ License management working

**Access Control**:
- ✅ Platform admins have full access
- ✅ Reviewers can review and approve
- ✅ Verifiers can only verify documents
- ✅ Support staff has read-only access
- ✅ Unauthorized users cannot access admin features

## Next Steps

1. **Immediate**: Discuss with user which RBAC model to implement:
   - Simple (3 roles: admin, reviewer, support)
   - Standard (5 roles: admin, reviewer, verifier, support, auditor)
   - Granular (permission-based with custom combinations)

2. **Design**: Create wireframes/mockups for admin review UI pages

3. **Backend**: Implement RBAC models and permissions

4. **Frontend**: Build admin dashboard registry pages

5. **Testing**: End-to-end workflow testing

6. **Documentation**: Update admin user guide with RBAC instructions

## Conclusion

The professional registration system has a **solid foundation** with:
- ✅ Complete backend API for admin review (15 endpoints)
- ✅ Professional application flow working
- ✅ Admin dashboard infrastructure ready
- ✅ Reusable UI patterns in professional frontend

**What's needed**:
- 🔨 Backend RBAC (roles, permissions, user management)
- 🔨 Admin dashboard enhancement (role/permission support)
- 🔨 Registry review UI pages (applications, documents, licenses)
- 🔨 Service layer integration (connect UI to backend APIs)

**Estimated effort**: 9-15 days for complete implementation

The system is well-architected and ready for the admin review interface to be built. All backend APIs are tested and working. The main work is creating the admin UI components and implementing the IAM-style permission system.
