---
date: 2025-11-07T00:39:16+0000
researcher: Claude
git_commit: b601424d2b1ea6dcd679c9195b603ecefc718ba3
branch: main
repository: phbfrontend
topic: "Professional Pages System - LinkedIn/Facebook Style Pages for Next Steps"
tags: [research, professional-pages, pharmacy-pages, next-steps, architecture]
status: complete
last_updated: 2025-11-07
last_updated_by: Claude
---

# Research: Professional Pages System - Next Steps After Triage Implementation

**Date**: 2025-11-07T00:39:16+0000
**Researcher**: Claude
**Git Commit**: b601424d2b1ea6dcd679c9195b603ecefc718ba3
**Branch**: main
**Repository**: phbfrontend

## Research Question

**User Request**:
> "Previously, we worked on the triage system which led to us creating professional endpoints for pharmacists, doctors, nurses and more to register and be given licence to participate in the platform. But now this brings us back to where it's all begun, which is the prescriptions. So what do we need to do next?
>
> We can use pages just the way we have in LinkedIn, Facebook and the likes of others. This way it lets users create company pages (such as pharmacists) where they can just create a page and assign what kind of services they offer. Be it a walk-in pharmacist (where they can now be used as stores). What is an in-store for a page when creating a page? If the pharmacist creates an in-store page, meaning that their pharmacist can now be used as a public pharmacy which users can choose as a nominated pharmacy to pick prescribed drugs. Secondly, if he creates his page as a virtual service, he will only be allowed to give consultations online if required by patients.
>
> Why do we choose pages instead of creating full systems and more? Another topic to be discussed is how do you flag users that have now been approved as professionals. For example, the user eruwagolden55@yahoo.com has now been approved as a pharmacist and even been issued a PHB licence. Is there a special way that he can now assess the features to create pages if we now implement that feature so that he can now do what is necessary?"

## Executive Summary

After comprehensive research of the PHB codebase, I've identified that you have:
1. ✅ **Complete Professional Registration System** - Professionals can register, get approved, and receive PHB licenses
2. ✅ **Complete Prescription Triage System** - 505 drugs, automatic routing, professional review workflows
3. ✅ **Pharmacy Nomination System** - Users can nominate pharmacies for prescription pickup
4. ❌ **NO Public Professional/Organization Pages** - This would be **NEW functionality**

The user eruwagolden55@yahoo.com is tracked as approved through:
- `ProfessionalApplication.application_status = 'approved'`
- `ProfessionalApplication.phb_license_number = 'PHB-PHARM-XXXXXXXX-XXXX'` (UUID-based)
- Entry in `PHBProfessionalRegistry` table with `status = 'active'`
- Optional entry in `Pharmacist` operational table

**Recommendation**: Implement a new "Professional Practice Pages" system that allows approved professionals to create public-facing business pages (similar to LinkedIn/Facebook company pages) with service type selection (in-store vs virtual).

---

## Summary

The PHB system has completed two major phases:
1. **Professional Registration & Licensing** - UUID-based licenses, admin approval, email notifications
2. **Prescription Triage** - Drug database, NAFDAC compliance, pharmacist/doctor workflows

The next logical step is to **bridge the gap** between:
- **What exists**: Approved professionals with licenses (tracked in `PHBProfessionalRegistry`)
- **What's missing**: Public-facing practice pages where professionals can advertise services and users can discover/nominate them

Currently, the system has:
- Organization accounts (hospitals, NGOs, pharmaceutical companies) with **internal-only dashboards**
- Pharmacy entities that users can nominate (but pharmacies are created by admins, not by pharmacists)
- Public professional profiles (searchable registry at `/registry/professional/:id`)

**The gap**: No way for an approved pharmacist like eruwagolden55@yahoo.com to create a **public practice page** that offers:
- Walk-in pharmacy services (physical store for prescription pickup)
- Virtual consultation services (online-only)

---

## Detailed Findings

### 1. Current Professional Tracking System

#### How Approved Professionals Are Identified

The system uses a **three-tier tracking approach**:

**Tier 1: Application Status** (`ProfessionalApplication` model)
- Location: Backend `/api/models/registry/professional_application.py`
- Key Fields:
  - `application_status` = 'approved' (primary approval flag)
  - `phb_license_number` = 'PHB-PHARM-A3F2B9C1-E4D7' (UUID-based, unique)
  - `approved_at` = timestamp of approval
  - `professional_type` = 'pharmacist' | 'doctor' | 'nurse' | etc.

**Tier 2: National Registry** (`PHBProfessionalRegistry` model)
- Location: Backend `/api/models/registry/professional_registry.py`
- Created automatically when admin approves application
- Key Fields:
  - `phb_license_number` = same as application (unique identifier)
  - `status` = 'active' | 'suspended' | 'revoked' | 'expired' | 'retired'
  - `issued_date`, `expiry_date` (licenses expire after 1 year)
  - `full_name`, `profession`, `specialty` (searchable public data)

**Tier 3: Operational Profile** (`Pharmacist`, `Doctor`, `Nurse` models)
- Location: Backend `/api/models/medical_staff/`
- Used for hospital affiliation and prescription triage assignment
- Key Fields:
  - `is_active` = True/False
  - `status` = 'active' | 'on_leave' | 'suspended' | 'retired'
  - `available_for_reviews` = True/False (for prescription triage)
  - `hospital` FK = hospital affiliation (can be null)

#### Example: eruwagolden55@yahoo.com Approval Status

**Database State After Approval**:

1. `CustomUser` table:
   ```
   email: eruwagolden55@yahoo.com
   user_type: 'professional'
   ```

2. `ProfessionalApplication` table:
   ```
   application_status: 'approved' ← APPROVAL FLAG
   professional_type: 'pharmacist'
   phb_license_number: 'PHB-PHARM-A3F2B9C1-E4D7' ← LICENSE ISSUED
   approved_at: 2025-11-05 14:30:00
   home_registration_body: 'PCN' (Pharmacists Council of Nigeria)
   home_registration_number: 'PCN/FG/24/XXXXX'
   ```

3. `PHBProfessionalRegistry` table:
   ```
   phb_license_number: 'PHB-PHARM-A3F2B9C1-E4D7'
   profession: 'pharmacist'
   status: 'active' ← ACTIVE LICENSE
   issued_date: 2025-11-05
   expiry_date: 2026-11-05
   ```

4. `Pharmacist` table (if operational profile created):
   ```
   is_active: True
   status: 'active'
   available_for_reviews: True ← CAN HANDLE PRESCRIPTIONS
   hospital: [FK to hospital] or NULL
   ```

**Frontend Access**:
- `registryService.verifyLicense('PHB-PHARM-A3F2B9C1-E4D7')` returns approved professional data
- `professionalAuthContext` identifies user as pharmacist
- Public profile accessible at `/registry/professional/:id`

#### Code References

**Backend Approval Logic** (`/api/views/admin_application_review_views.py:362-406`):
```python
def admin_approve_application(request, application_id):
    # Generate UUID-based license
    license_uuid = uuid.uuid4()
    phb_license_number = f"PHB-{type_code}-{str(license_uuid)[:8]}-{str(license_uuid)[9:13]}"

    # Update application
    application.status = 'approved'
    application.phb_license_number = phb_license_number
    application.approved_at = timezone.now()
    application.save()

    # Create registry entry
    PHBProfessionalRegistry.objects.create(
        application=application,
        user=application.user,
        phb_license_number=phb_license_number,
        status='active',
        issued_date=timezone.now().date(),
        expiry_date=timezone.now().date() + timedelta(days=365)
    )

    # Send approval email
    send_professional_application_approved_email(...)
```

**Frontend Verification** (`src/services/registryService.ts:304-318`):
```typescript
async verifyLicense(licenseNumber: string): Promise<{
  valid: boolean;
  professional?: RegistryProfessional;
  message: string;
}> {
  const response = await axios.get(
    `${REGISTRY_API_URL}/verify/${licenseNumber}/`
  );
  return response.data;
}
```

---

### 2. Current Pharmacy System

#### Existing Pharmacy Infrastructure

**Pharmacy Entity** (`pharmacyService.ts:1-949`):
- **NOT** created by pharmacists themselves
- Created by system admins (CSV import or manual entry)
- Fields: ODS code, name, address, phone, opening hours, services
- Users can search and nominate pharmacies for prescriptions

**Pharmacy Nomination Flow** (`src/pages/account/NominatedPharmacyPage.tsx`):
1. User searches for pharmacies (by name, location, or ODS code)
2. User nominates a pharmacy
3. Backend creates `NominatedPharmacy` relationship
4. When user requests prescription, it goes to nominated pharmacy
5. Professional approves prescription
6. Pharmacy dispenses medication

**Key API Endpoints** (`src/services/pharmacyService.ts`):
- `GET /api/pharmacies/` - List all pharmacies (admin-created)
- `GET /api/pharmacies/nearby/` - Find nearby pharmacies
- `GET /api/pharmacies/:id/` - Pharmacy details
- `POST /api/pharmacies/nominated/` - Nominate pharmacy
- `GET /api/pharmacies/nominated/` - Current nomination

**Current Limitation**:
- Pharmacies are **static entities** created by admins
- No way for pharmacist eruwagolden55@yahoo.com to create/manage their own pharmacy page
- No service type differentiation (in-store vs virtual)

---

### 3. Current Organization System

#### Organization Authentication

**Three Organization Types** (`src/features/organization/organizationAuthContext.tsx:33-53`):
- `'hospital_admin'` - Hospital management
- `'ngo_admin'` - NGO/charity management
- `'pharmacy_admin'` - Pharmaceutical company management

**Organization Dashboard Features**:
- Staff roster management
- Ward management
- Patient admissions
- Inventory tracking
- Analytics
- **All features are INTERNAL-ONLY** (not public-facing)

**Organization Routes** (`src/App.tsx:427-467`):
- `/organization/login` - Login with hospital_code requirement
- `/organization/register` - New organization registration
- `/organization/dashboard` - Internal management dashboard
- NO public organization profile pages (e.g., `/organization/:id/public-profile`)

**Key Limitation**:
- Organizations have **authentication + dashboards** but **NO public pages**
- Users can't discover/browse organization profiles
- No equivalent to LinkedIn company pages or Facebook business pages

---

### 4. Professional Authentication System

#### Professional Auth Context

**Location**: `src/features/professional/professionalAuthContext.tsx`

**Professional Roles Supported**:
```typescript
type ProfessionalRole = 'doctor' | 'nurse' | 'researcher' | 'pharmacist'
```

**Professional User Interface**:
```typescript
interface ProfessionalUser {
  id: string;
  name: string;
  email: string;
  role: ProfessionalRole;
  licenseNumber?: string;  // PHB license
  specialty?: string;
  verified: boolean;
}
```

**Authentication Flow**:
1. Professional logs in via `/professional/login`
2. `professionalAuthContext` checks if user has `role === 'doctor'` or `hpn` field
3. Uses main `authContext` + extends with professional-specific data
4. Stores auth state in localStorage: `phb_professional_auth_state`
5. Uses httpOnly cookies for JWT tokens (not localStorage)

**Professional Routes** (`src/App.tsx:869-887`):
- `/professional/dashboard` - Main dashboard
- `/professional/appointments` - Appointment management
- `/professional/prescriptions` - Prescription triage (for pharmacists/doctors)
- `/professional/profile` - Own profile management
- `/professional/calculators` - Clinical calculators
- `/professional/guidelines` - Clinical guidelines
- `/professional/resources` - Professional resources
- `/professional/research` - Research dashboard

**View Toggle Feature**:
- Doctors can toggle between patient view and professional view
- Uses `phb_view_preference` in localStorage
- Component: `src/components/EnhancedViewToggle.tsx`

---

### 5. Registry System (Public Professional Profiles)

#### Current Registry Features

**Public Registry Endpoints** (`src/services/registryService.ts:835-949`):
- `searchProfessionals(query, filters)` - Search approved professionals
- `verifyLicense(licenseNumber)` - Verify PHB license validity
- `getApplicationStatus(applicationId)` - Check application status
- `getProfessionalTypes()` - List available professional types

**Public Registry Pages**:
- `/registry/landing` - Registry landing page (`src/pages/registry/RegistryLandingPage.tsx`)
- `/registry/search` - Professional search (`src/pages/registry/RegistrySearchPage.tsx`)
- `/registry/professional/:id` - **Public professional profile** (`src/pages/registry/ProfessionalProfilePage.tsx`)
- `/registry/apply` - Application form (`src/pages/registry/ApplyPage.tsx`)

**Admin Registry Pages** (for staff review):
- `/registry/dashboard` - Application review dashboard (`src/pages/registry/RegistryDashboardPage.tsx`)
- `/registry/application/:id` - Application detail/review (`src/pages/registry/ApplicationDetailPage.tsx`)

**What Registry Provides**:
- Public directory of all approved professionals
- License verification
- Search by name, specialty, location
- Professional credentials display (license number, specialization, years of experience)

**What Registry Does NOT Provide**:
- No service listings (what services the professional offers)
- No appointment booking from registry profile
- No practice information (physical location, hours, contact)
- No differentiation between in-store and virtual services
- No way for professional to manage their registry profile content

---

## Architecture Insights

### Current System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER TYPES                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Regular Users (Patients)                                │
│     - authContext (JWT via httpOnly cookies)                │
│     - Routes: /account/*                                     │
│     - Features: Prescriptions, appointments, health records │
│                                                              │
│  2. Professionals (Doctors, Pharmacists, Nurses)            │
│     - professionalAuthContext (extends authContext)         │
│     - Routes: /professional/*                                │
│     - Features: Dashboards, prescription triage, patients   │
│                                                              │
│  3. Organizations (Hospitals, NGOs, Pharma Companies)       │
│     - organizationAuthContext (separate auth)               │
│     - Routes: /organization/*                                │
│     - Features: Staff roster, ward management, inventory    │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              PROFESSIONAL TRACKING SYSTEM                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Application → Review → Approval → Registry                 │
│                                                              │
│  ProfessionalApplication                                     │
│  ├─ status: 'approved'                                      │
│  ├─ phb_license_number: 'PHB-PHARM-UUID'                   │
│  └─ professional_type: 'pharmacist'                         │
│                                                              │
│  PHBProfessionalRegistry (if approved)                      │
│  ├─ status: 'active'                                        │
│  ├─ phb_license_number: same as application                │
│  └─ Public searchable record                                │
│                                                              │
│  Pharmacist/Doctor/Nurse (operational profile)              │
│  ├─ is_active: True                                         │
│  ├─ hospital: FK or NULL                                    │
│  └─ Used for prescription triage assignment                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                 PHARMACY SYSTEM                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Current: Admin-Created Pharmacy Entities                   │
│  ├─ Pharmacy model (name, ODS code, address)               │
│  ├─ NominatedPharmacy (user → pharmacy relationship)       │
│  └─ Users search/nominate for prescriptions                 │
│                                                              │
│  What's Missing:                                             │
│  ├─ Pharmacists can't create their own pharmacy pages      │
│  ├─ No service type (in-store vs virtual)                  │
│  └─ No public pharmacy profile pages                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### What Exists vs What's Missing

#### ✅ What Exists

**Professional Infrastructure**:
- Complete registration and approval workflow
- UUID-based license generation (PHB-{TYPE}-{UUID})
- National professional registry (searchable)
- Public professional profiles (`/registry/professional/:id`)
- Professional authentication context
- Professional dashboards and tools
- Prescription triage system (505 drugs, NAFDAC compliance)

**Pharmacy Infrastructure**:
- Pharmacy entity model (admin-created)
- Pharmacy search and nomination
- Prescription routing to nominated pharmacies
- Pharmacy verification system

**Organization Infrastructure**:
- Organization authentication (hospital_admin, pharmacy_admin, ngo_admin)
- Organization dashboards (internal management)
- Three organization types: hospital, ngo, pharmaceutical

#### ❌ What's Missing (Gaps for "Pages" System)

**Public Professional Practice Pages**:
- No way for approved professionals to create business pages
- No service type selection (in-store vs virtual)
- No practice information management (hours, location, services)
- No appointment booking from professional pages
- No differentiation between registry profile and practice page

**Professional-Created Pharmacies**:
- No way for pharmacist to create their own pharmacy listing
- No pharmacist-to-pharmacy ownership relationship
- No pharmacy page management dashboard
- No service offerings management

**Public Organization Pages**:
- No public-facing organization profiles
- No organization search/directory
- No "About Us" or marketing content
- Organization dashboards are internal-only

**Discoverability**:
- No way for users to browse local pharmacies by service type
- No filtering by "walk-in" vs "virtual service"
- No professional practice directory (separate from license registry)

---

## Code References

### Professional Authentication
- `src/features/professional/professionalAuthContext.tsx:1-200` - Professional auth context
- `src/features/professional/ProfessionalRouteGuard.tsx:1-50` - Route guard component
- `src/features/professional/ProfessionalLoginForm.tsx:1-150` - Login form
- `src/pages/professional/ProfessionalDashboardPage.tsx:1-500` - Dashboard

### Registry System
- `src/services/registryService.ts:1-949` - Complete registry API service
- `src/services/registryService.ts:126-178` - ProfessionalApplication interface
- `src/services/registryService.ts:180-193` - RegistryProfessional interface
- `src/pages/registry/RegistrySearchPage.tsx` - Public professional search
- `src/pages/registry/ProfessionalProfilePage.tsx` - Public professional profile
- Backend: `/api/views/admin_application_review_views.py:362-406` - Approval logic

### Pharmacy System
- `src/services/pharmacyService.ts:1-949` - Pharmacy API service
- `src/pages/account/NominatedPharmacyPage.tsx` - Nomination management
- `src/pages/FindPharmacyPage.tsx` - Public pharmacy search

### Organization System
- `src/features/organization/organizationAuthContext.tsx:1-300` - Organization auth
- `src/pages/organization/OrganizationDashboardPage.tsx` - Organization dashboard
- `src/layouts/FluentOrganizationLayout.tsx` - Organization layout

### Documentation
- `PROFESSIONAL_REGISTRATION_COMPLETE_IMPLEMENTATION.md:1-800` - Registration system
- `PRESCRIPTION_TRIAGE_SYSTEM_COMPLETE.md:1-362` - Triage system
- `REGISTRY_LANDING_AND_SEARCH_COMPLETE.md` - Registry implementation
- `docs/professional_registration_and_more/PHB_PROFESSIONAL_REGISTRATION_SYSTEM_DESIGN.md:531-730` - System design
- `thoughts/shared/plans/2025-10-21-pharmacy-nomination-system.md` - Pharmacy plans

---

## Proposed Solution: Professional Practice Pages System

### Overview

Implement a new **"Professional Practice Pages"** feature that allows approved professionals to:
1. Create public-facing practice pages (similar to LinkedIn company pages)
2. Choose service type: **In-Store** (walk-in pharmacy) or **Virtual Service** (online consultation)
3. Manage practice information (location, hours, services, contact)
4. Be discoverable by patients searching for services
5. Accept prescription nominations (if in-store pharmacy)
6. Accept consultation bookings (if virtual service)

### Why "Pages" Instead of Full Organizations?

**User's Reasoning** (from question):
> "Why do we choose pages instead of creating full systems and more?"

**Answer**: The existing organization system is designed for **large institutions** (hospitals, NGOs, pharmaceutical companies) with:
- Multiple staff members
- Complex role hierarchies
- Internal management dashboards
- Hospital code requirements for login

For **individual professionals** (especially pharmacists), a full organization system is:
- ❌ **Overkill** - Too many features they won't use
- ❌ **Complicated** - Requires hospital codes, staff rosters, ward management
- ❌ **Not User-Friendly** - Designed for admins, not solo practitioners

A "**Page**" system is:
- ✅ **Lightweight** - Just a public profile with service info
- ✅ **Self-Service** - Professionals create and manage their own pages
- ✅ **Discoverable** - Pages appear in public searches/directories
- ✅ **Flexible** - Choose in-store or virtual services
- ✅ **Familiar UX** - Users understand "business pages" from LinkedIn/Facebook

**Key Difference**:
- **Organization**: Internal management system for institutions
- **Page**: Public-facing business profile for individual practitioners

### Proposed Architecture

```
┌─────────────────────────────────────────────────────────────┐
│            PROFESSIONAL PRACTICE PAGES SYSTEM                │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ProfessionalPracticePage (new model)                       │
│  ├─ owner: FK to CustomUser                                │
│  ├─ linked_registry_entry: FK to PHBProfessionalRegistry   │
│  ├─ page_type: 'individual' | 'group_practice'             │
│  ├─ service_type: 'in_store' | 'virtual' | 'both'          │
│  ├─ practice_name: "Golden Pharmacy"                        │
│  ├─ slug: "golden-pharmacy-abuja"                           │
│  ├─ description: Free text                                  │
│  ├─ services_offered: JSON array                            │
│  ├─ is_published: Boolean                                   │
│  └─ verification_status: 'pending' | 'verified'             │
│                                                              │
│  PhysicalLocation (if service_type = 'in_store' or 'both') │
│  ├─ practice_page: FK                                       │
│  ├─ address_line_1, city, state, postcode                  │
│  ├─ latitude, longitude                                     │
│  ├─ opening_hours: JSON                                     │
│  ├─ facilities: ['wheelchair_access', 'parking']            │
│  └─ photos: JSON array of image URLs                        │
│                                                              │
│  VirtualServiceOffering (if service_type = 'virtual')       │
│  ├─ practice_page: FK                                       │
│  ├─ consultation_types: ['prescription_review', etc.]       │
│  ├─ availability_schedule: JSON                             │
│  ├─ video_platform: 'zoom' | 'google_meet' | etc.          │
│  └─ consultation_fee: Decimal                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     USER FLOWS                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. CREATE PAGE (Approved Professional)                     │
│     /professional/pages/create                               │
│     ├─ Check: User has approved application                │
│     ├─ Check: User has active PHB license                   │
│     ├─ Check: No existing page for this user                │
│     ├─ Choose service type: in-store | virtual | both      │
│     ├─ Fill practice details                                │
│     └─ Publish page                                          │
│                                                              │
│  2. MANAGE PAGE (Page Owner)                                │
│     /professional/pages/manage                               │
│     ├─ Edit practice information                            │
│     ├─ Update opening hours (if in-store)                   │
│     ├─ Manage services offered                              │
│     ├─ Upload photos (if in-store)                          │
│     └─ Pause/unpublish page                                  │
│                                                              │
│  3. DISCOVER PAGE (Patient)                                 │
│     /pages/search or /pharmacies/search                      │
│     ├─ Filter by service type (in-store | virtual)         │
│     ├─ Filter by location (if in-store)                     │
│     ├─ Filter by services offered                           │
│     └─ View page → Nominate (if in-store) or Book (virtual)│
│                                                              │
│  4. VIEW PAGE (Public)                                       │
│     /pages/:slug or /pharmacy/:slug                          │
│     ├─ See practice information                             │
│     ├─ See professional credentials (linked to registry)   │
│     ├─ See opening hours and location (if in-store)        │
│     ├─ "Nominate This Pharmacy" button (if in-store)       │
│     └─ "Book Consultation" button (if virtual)              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### How Approved Professionals Access Page Creation

**Question from User**:
> "Is there a special way that he [eruwagolden55@yahoo.com] can now assess the features to create pages if we now implement that feature so that he can now do what is necessary?"

**Answer**: Create a gated access system using existing approval flags.

#### Access Control Flow

**Step 1: Check Professional Approval Status**
```typescript
// Frontend check (src/features/professional/canCreatePage.ts)
export async function canCreatePracticePage(user: User): Promise<{
  canCreate: boolean;
  reason?: string;
}> {
  // Check 1: User must have approved application
  const application = await registryService.getApplicationStatus(user.id);
  if (!application || application.status !== 'approved') {
    return {
      canCreate: false,
      reason: 'You must have an approved professional application first.'
    };
  }

  // Check 2: User must have active PHB license
  const licenseValid = await registryService.verifyLicense(
    application.phb_license_number
  );
  if (!licenseValid.valid) {
    return {
      canCreate: false,
      reason: 'Your PHB license is not active. Please contact support.'
    };
  }

  // Check 3: Check if user already has a page
  const existingPage = await practicePageService.getUserPage(user.id);
  if (existingPage) {
    return {
      canCreate: false,
      reason: 'You already have a practice page. Go to Manage Page to edit it.'
    };
  }

  // All checks passed
  return { canCreate: true };
}
```

**Backend check** (`/api/views/practice_pages_views.py`):
```python
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_practice_page(request):
    user = request.user

    # Check 1: User has approved application
    try:
        application = ProfessionalApplication.objects.get(
            user=user,
            application_status='approved',
            phb_license_number__isnull=False
        )
    except ProfessionalApplication.DoesNotExist:
        return Response({
            'error': 'You must have an approved professional application'
        }, status=403)

    # Check 2: User has active registry entry
    try:
        registry_entry = PHBProfessionalRegistry.objects.get(
            user=user,
            status='active',
            expiry_date__gt=timezone.now().date()
        )
    except PHBProfessionalRegistry.DoesNotExist:
        return Response({
            'error': 'Your PHB license is not active'
        }, status=403)

    # Check 3: User doesn't already have a page
    if ProfessionalPracticePage.objects.filter(owner=user).exists():
        return Response({
            'error': 'You already have a practice page'
        }, status=400)

    # Create page
    page = ProfessionalPracticePage.objects.create(
        owner=user,
        linked_registry_entry=registry_entry,
        practice_name=request.data.get('practice_name'),
        service_type=request.data.get('service_type'),
        # ...
    )

    return Response({
        'page': PageSerializer(page).data,
        'message': 'Practice page created successfully'
    })
```

#### UI Access Points

**For eruwagolden55@yahoo.com** (approved pharmacist):

**Option 1: Professional Dashboard Card** (`src/pages/professional/ProfessionalDashboardPage.tsx`)
```tsx
// Add card to dashboard
{user.isApproved && !user.hasPage && (
  <Card>
    <CardHeader>
      <Sparkles className="w-5 h-5" />
      <h3>Create Your Practice Page</h3>
    </CardHeader>
    <CardContent>
      <p>
        You've been approved! Create a public practice page to let
        patients discover your services.
      </p>
      <Button
        onClick={() => navigate('/professional/pages/create')}
        className="mt-4"
      >
        Create Practice Page
      </Button>
    </CardContent>
  </Card>
)}
```

**Option 2: Professional Menu Item** (`src/layouts/ProfessionalLayout.tsx`)
```tsx
// Add to navigation menu
{user.isApproved && (
  <MenuItem to="/professional/pages">
    <Store className="w-5 h-5" />
    <span>My Practice Page</span>
    {!user.hasPage && <Badge>New</Badge>}
  </MenuItem>
)}
```

**Option 3: Onboarding Banner** (First login after approval)
```tsx
{user.justApproved && !user.hasSeenPagePrompt && (
  <Banner color="success">
    <CheckCircle /> Congratulations! Your PHB license has been approved.
    <Button onClick={() => navigate('/professional/pages/create')}>
      Create Your Practice Page →
    </Button>
  </Banner>
)}
```

#### New Routes Required

```tsx
// Add to App.tsx professional routes
<Route path="/professional/pages" element={<ProfessionalLayout />}>
  <Route index element={<MyPracticePageDashboard />} />
  <Route path="create" element={<CreatePracticePageWizard />} />
  <Route path="edit" element={<EditPracticePage />} />
  <Route path="analytics" element={<PageAnalytics />} />
</Route>

// Public page routes
<Route path="/pages/:slug" element={<PublicPracticePage />} />
<Route path="/pharmacies" element={<PharmacyDirectory />} />
<Route path="/virtual-services" element={<VirtualServiceDirectory />} />
```

---

## Next Steps: Implementation Plan

### Phase 1: Foundation (1-2 weeks)

#### 1.1 Backend Models
Create new Django models:

**File**: `/api/models/practice_pages/professional_practice_page.py`
```python
class ProfessionalPracticePage(models.Model):
    # Core fields
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    linked_registry_entry = models.ForeignKey(
        PHBProfessionalRegistry,
        on_delete=models.PROTECT
    )

    # Page info
    practice_name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    logo = models.ImageField(upload_to='practice_logos/', null=True)

    # Service type
    page_type = models.CharField(
        max_length=20,
        choices=[
            ('individual', 'Individual Practice'),
            ('group_practice', 'Group Practice'),
        ],
        default='individual'
    )

    service_type = models.CharField(
        max_length=20,
        choices=[
            ('in_store', 'In-Store/Walk-In'),  # ← Physical pharmacy
            ('virtual', 'Virtual Service'),     # ← Online consultation only
            ('both', 'Both In-Store and Virtual'),
        ]
    )

    # Services offered (JSON array)
    services_offered = models.JSONField(default=list)
    # Example: ['prescription_dispensing', 'medication_review',
    #           'travel_vaccinations', 'health_checks']

    # Status
    is_published = models.BooleanField(default=False)
    verification_status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending Verification'),
            ('verified', 'Verified'),
            ('suspended', 'Suspended'),
        ],
        default='pending'
    )

    # Contact
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    website = models.URLField(blank=True)

    # Stats
    total_views = models.PositiveIntegerField(default=0)
    total_nominations = models.PositiveIntegerField(default=0)  # If in-store
    total_bookings = models.PositiveIntegerField(default=0)      # If virtual

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['service_type']),
            models.Index(fields=['is_published', 'verification_status']),
        ]
```

**File**: `/api/models/practice_pages/physical_location.py`
```python
class PhysicalLocation(models.Model):
    """Physical location for in-store practices"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    practice_page = models.OneToOneField(
        ProfessionalPracticePage,
        on_delete=models.CASCADE,
        related_name='physical_location'
    )

    # Address
    address_line_1 = models.CharField(max_length=200)
    address_line_2 = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postcode = models.CharField(max_length=20)
    country = models.CharField(max_length=100, default='Nigeria')

    # Geolocation
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True)

    # Opening hours (JSON)
    opening_hours = models.JSONField(default=dict)
    # Example: {
    #   'monday': {'open': '09:00', 'close': '18:00', 'closed': False},
    #   'tuesday': {'open': '09:00', 'close': '18:00', 'closed': False},
    #   ...
    # }

    # Facilities
    facilities = models.JSONField(default=list)
    # Example: ['wheelchair_access', 'parking', 'consultation_room']

    # Photos
    photos = models.JSONField(default=list)
    # Example: [
    #   {'url': 'https://...', 'caption': 'Storefront'},
    #   {'url': 'https://...', 'caption': 'Interior'}
    # ]

    # Directions
    directions_text = models.TextField(blank=True)
    google_maps_url = models.URLField(blank=True)
```

**File**: `/api/models/practice_pages/virtual_service.py`
```python
class VirtualServiceOffering(models.Model):
    """Virtual service details"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    practice_page = models.OneToOneField(
        ProfessionalPracticePage,
        on_delete=models.CASCADE,
        related_name='virtual_service'
    )

    # Consultation types offered
    consultation_types = models.JSONField(default=list)
    # Example: ['prescription_review', 'medication_consultation',
    #           'health_advice', 'chronic_disease_management']

    # Availability (JSON)
    availability_schedule = models.JSONField(default=dict)
    # Example: {
    #   'monday': [
    #     {'start': '09:00', 'end': '12:00'},
    #     {'start': '14:00', 'end': '17:00'}
    #   ],
    #   ...
    # }

    # Video platform
    video_platform = models.CharField(
        max_length=50,
        choices=[
            ('zoom', 'Zoom'),
            ('google_meet', 'Google Meet'),
            ('microsoft_teams', 'Microsoft Teams'),
            ('phb_video', 'PHB Video'),
        ],
        default='phb_video'
    )

    # Pricing
    consultation_fee = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )
    free_consultation_available = models.BooleanField(default=False)

    # Duration
    typical_consultation_duration = models.PositiveIntegerField(
        default=15,
        help_text='Duration in minutes'
    )

    # Response time
    average_response_time = models.CharField(
        max_length=50,
        default='Within 24 hours'
    )
```

#### 1.2 Backend API Endpoints

**File**: `/api/views/practice_pages_views.py`

Create these endpoints:
- `POST /api/practice-pages/` - Create new page (gated by approval status)
- `GET /api/practice-pages/my-page/` - Get authenticated user's page
- `PUT /api/practice-pages/my-page/` - Update page
- `DELETE /api/practice-pages/my-page/` - Delete page
- `POST /api/practice-pages/my-page/publish/` - Publish page
- `POST /api/practice-pages/my-page/unpublish/` - Unpublish page

**File**: `/api/views/public_pages_views.py`

Public endpoints:
- `GET /api/pages/:slug/` - Get public page by slug
- `GET /api/pages/search/` - Search pages (with filters)
- `GET /api/pharmacies/` - List in-store pharmacies (extends existing)
- `GET /api/virtual-services/` - List virtual service providers
- `POST /api/pages/:slug/nominate/` - Nominate in-store pharmacy
- `POST /api/pages/:slug/book/` - Book virtual consultation

#### 1.3 Frontend Services

**File**: `src/services/practicePageService.ts`
```typescript
export interface PracticePage {
  id: string;
  owner_id: string;
  practice_name: string;
  slug: string;
  description: string;
  logo_url?: string;
  service_type: 'in_store' | 'virtual' | 'both';
  services_offered: string[];
  is_published: boolean;
  verification_status: 'pending' | 'verified' | 'suspended';
  phone: string;
  email: string;
  website?: string;
  physical_location?: PhysicalLocation;
  virtual_service?: VirtualService;
  professional_info: {
    name: string;
    license_number: string;
    specialization: string;
  };
  stats: {
    total_views: number;
    total_nominations: number;
    total_bookings: number;
  };
  created_at: string;
  updated_at: string;
}

export const practicePageService = {
  // Owner management
  async createPage(data: CreatePageRequest): Promise<PracticePage> {...},
  async getMyPage(): Promise<PracticePage | null> {...},
  async updatePage(data: UpdatePageRequest): Promise<PracticePage> {...},
  async deletePage(): Promise<void> {...},
  async publishPage(): Promise<void> {...},
  async unpublishPage(): Promise<void> {...},

  // Public access
  async getPageBySlug(slug: string): Promise<PracticePage> {...},
  async searchPages(params: SearchParams): Promise<PagedResponse<PracticePage>> {...},
  async getInStorePharmacies(filters: Filters): Promise<PracticePage[]> {...},
  async getVirtualServices(filters: Filters): Promise<PracticePage[]> {...},
};
```

### Phase 2: UI Components (1-2 weeks)

#### 2.1 Create Practice Page Wizard

**File**: `src/pages/professional/pages/CreatePracticePageWizard.tsx`

Multi-step wizard:
1. **Step 1: Basic Information**
   - Practice name
   - Description
   - Logo upload
   - Contact info (phone, email, website)

2. **Step 2: Service Type Selection**
   - Radio buttons: In-Store | Virtual | Both
   - Explanation of each type
   - Visual icons/illustrations

3. **Step 3A: Physical Location** (if in-store selected)
   - Address form
   - Opening hours editor (weekly schedule)
   - Facilities checklist (parking, wheelchair access, etc.)
   - Photo uploader
   - Map preview (Google Maps integration)

3. **Step 3B: Virtual Service** (if virtual selected)
   - Consultation types checkboxes
   - Availability scheduler
   - Video platform selection
   - Pricing setup
   - Response time estimate

4. **Step 4: Services Offered**
   - Multiselect checkboxes for services
   - Custom service text input
   - Service description editor

5. **Step 5: Preview & Publish**
   - Preview of public page
   - Edit buttons for each section
   - "Publish Page" button
   - "Save as Draft" button

#### 2.2 Manage Practice Page Dashboard

**File**: `src/pages/professional/pages/ManagePracticePage.tsx`

Dashboard sections:
- **Overview Card**: Page status, views, nominations/bookings
- **Quick Actions**: Edit page, pause/unpublish, view public page
- **Recent Activity**: Recent nominations (if in-store) or bookings (if virtual)
- **Analytics**: Views over time, popular services, conversion rate
- **Reviews** (future): Customer reviews and ratings

#### 2.3 Public Practice Page View

**File**: `src/pages/pages/PublicPracticePage.tsx`

Public page layout:
- **Header Section**:
  - Logo, practice name
  - Service type badge (In-Store | Virtual)
  - Verification badge (if verified)
  - Professional credentials (linked to registry profile)

- **Hero Section**:
  - Hero image/photo
  - Call-to-action buttons:
    - "Nominate This Pharmacy" (if in-store)
    - "Book Consultation" (if virtual)

- **About Section**:
  - Description
  - Services offered (icon grid)

- **Location Section** (if in-store):
  - Address
  - Map
  - Opening hours table
  - Facilities icons
  - Photos gallery
  - Directions button

- **Consultation Info Section** (if virtual):
  - Consultation types
  - Availability calendar
  - Video platform info
  - Pricing
  - "Book Now" button

- **Professional Info Section**:
  - Professional name
  - PHB license number (linked to registry)
  - Specialization
  - Years of experience
  - "View Full Registry Profile" link

#### 2.4 Directory Pages

**File**: `src/pages/pages/PharmacyDirectory.tsx`
- Grid/list of all in-store pharmacies
- Filters: Location, services offered, facilities, opening hours
- Sort: Distance, rating, recently added
- Map view toggle

**File**: `src/pages/pages/VirtualServiceDirectory.tsx`
- Grid/list of all virtual service providers
- Filters: Professional type, consultation type, availability, price range
- Sort: Rating, price, response time
- "Book Now" quick action buttons

### Phase 3: Integration (1 week)

#### 3.1 Integrate with Existing Pharmacy Nomination

Modify existing pharmacy nomination flow to support practice pages:
- Update `NominatedPharmacy` model to reference `ProfessionalPracticePage` (optional FK)
- Update nomination UI to show practice pages alongside admin-created pharmacies
- Add "Created by [Pharmacist Name]" badge for practice pages

#### 3.2 Integrate with Prescription System

When professional approves prescription:
- If pharmacist has practice page (in-store), route to their pharmacy
- If no practice page, use existing pharmacy nomination system
- Send notification to practice page owner about incoming prescription

#### 3.3 Professional Dashboard Integration

Add to professional dashboard:
- "My Practice Page" card (if page exists)
- "Create Practice Page" prompt (if approved but no page)
- Page analytics widget (views, nominations, bookings)

### Phase 4: Polish & Launch (1 week)

#### 4.1 Email Notifications

**New emails to create**:
- Page creation confirmation
- Page verification approval
- New nomination received (for in-store pages)
- New booking received (for virtual pages)
- Page analytics weekly summary

#### 4.2 Admin Tools

Create admin interface:
- Review pending pages (verification)
- Suspend/unsuspend pages
- Handle reported pages
- Analytics dashboard (pages created, views, conversions)

#### 4.3 Testing

- Unit tests for access control
- Integration tests for page creation flow
- E2E tests for public page view and nomination/booking
- Manual QA for all user flows

#### 4.4 Documentation

- User guide for creating practice pages
- FAQ about in-store vs virtual services
- API documentation for practice pages
- Admin guide for page moderation

---

## Example User Flow: eruwagolden55@yahoo.com

### Scenario: Pharmacist Creates In-Store Pharmacy Page

**Step-by-step flow**:

1. **Login**:
   - eruwagolden55@yahoo.com logs into `/professional/login`
   - System recognizes approved pharmacist (PHB license: PHB-PHARM-A3F2B9C1-E4D7)

2. **Dashboard Prompt**:
   - Dashboard shows banner: "🎉 Congratulations! Create your practice page to let patients discover your pharmacy."
   - User clicks "Create Practice Page" button

3. **Page Creation Wizard**:

   **Step 1: Basic Info**
   - Practice Name: "Golden Pharmacy Abuja"
   - Description: "Your trusted neighborhood pharmacy providing quality medications and health services since 2020."
   - Logo: Upload pharmacy logo
   - Phone: +234-XXX-XXXX-XXX
   - Email: contact@goldenpharmacy.ng
   - Website: www.goldenpharmacy.ng

   **Step 2: Service Type**
   - Select: **"In-Store/Walk-In"** (radio button)
   - System explains: "Your pharmacy will be available as a physical location that patients can nominate for prescription pickup."

   **Step 3: Physical Location**
   - Address: "123 Gimbiya Street, Garki II, Abuja"
   - Opening Hours:
     ```
     Monday-Friday: 8:00 AM - 8:00 PM
     Saturday: 9:00 AM - 6:00 PM
     Sunday: Closed
     ```
   - Facilities: ✓ Parking, ✓ Wheelchair Access, ✓ Consultation Room
   - Photos: Upload 3 photos (storefront, interior, consultation room)
   - Map: Auto-populate from address

   **Step 4: Services Offered**
   - ✓ Prescription Dispensing
   - ✓ Medication Counseling
   - ✓ Blood Pressure Checks
   - ✓ Diabetes Monitoring
   - ✓ Travel Vaccinations
   - ✓ Health Supplies

   **Step 5: Preview & Publish**
   - Preview shows public page layout
   - User clicks "Publish Page"
   - System creates slug: `golden-pharmacy-abuja`
   - Page is published with `verification_status='pending'`

4. **Confirmation**:
   - Success message: "✅ Your practice page has been published! It will appear in search results once verified (usually within 24 hours)."
   - Redirect to page management dashboard

5. **Page Management**:
   - View page at: `https://phb.ng/pages/golden-pharmacy-abuja`
   - Dashboard shows:
     - Status: Published, Pending Verification
     - Total Views: 0
     - Total Nominations: 0
   - Edit buttons for each section

6. **Public Discovery**:
   - Patient searches "pharmacies in Garki Abuja"
   - Golden Pharmacy appears in results (after verification)
   - Patient clicks page → sees full info
   - Patient clicks "Nominate This Pharmacy"
   - Golden Pharmacy becomes patient's nominated pharmacy

7. **Prescription Flow**:
   - Patient requests prescription
   - Doctor approves prescription
   - Prescription routed to Golden Pharmacy (user's nomination)
   - eruwagolden55@yahoo.com receives notification:
     - "New prescription ready for dispensing at Golden Pharmacy"
   - Pharmacist prepares medication
   - Patient picks up at physical location (123 Gimbiya Street)

---

## Benefits of Pages System

### For Approved Professionals (like eruwagolden55@yahoo.com)

1. **Visibility**: Public-facing page increases discoverability
2. **Credibility**: Page linked to verified PHB license builds trust
3. **Flexibility**: Choose in-store, virtual, or both service types
4. **Control**: Manage own practice information and availability
5. **Growth**: Track views, nominations, bookings over time
6. **Legitimacy**: Professional page elevates brand perception

### For Patients

1. **Discoverability**: Find local pharmacies and services easily
2. **Transparency**: See credentials, services, hours upfront
3. **Convenience**: Virtual consultations available from verified professionals
4. **Choice**: Filter by service type (in-store vs virtual)
5. **Trust**: All pages linked to verified PHB licenses
6. **Accessibility**: Book virtual consultations without visiting in person

### For PHB Platform

1. **Network Effect**: More professionals create pages → more patients use platform
2. **Service Differentiation**: In-store vs virtual creates new service categories
3. **Compliance**: All pages tied to verified licenses ensures safety
4. **Revenue**: Potential for premium page features (highlighted listings, ads)
5. **Data**: Analytics on service demand, popular pharmacies, booking patterns
6. **Scalability**: Pages system is self-service (less admin overhead than manual pharmacy creation)

---

## Technical Considerations

### 1. Access Control Implementation

**Question**: How to ensure only approved professionals can create pages?

**Answer**: Use existing approval flags in database:

**Backend Decorator** (`/api/decorators/professional_decorators.py`):
```python
def requires_active_license(view_func):
    """Decorator to check if user has active PHB license"""
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        user = request.user

        # Check approved application
        application = ProfessionalApplication.objects.filter(
            user=user,
            application_status='approved',
            phb_license_number__isnull=False
        ).first()

        if not application:
            return Response({
                'error': 'Active professional license required',
                'details': 'You must have an approved application with a PHB license'
            }, status=403)

        # Check active registry entry
        registry = PHBProfessionalRegistry.objects.filter(
            user=user,
            status='active',
            expiry_date__gt=timezone.now().date()
        ).first()

        if not registry:
            return Response({
                'error': 'Active license required',
                'details': 'Your PHB license has expired or is suspended'
            }, status=403)

        # Attach to request for view use
        request.professional_application = application
        request.registry_entry = registry

        return view_func(request, *args, **kwargs)

    return wrapper

# Usage
@requires_active_license
def create_practice_page(request):
    # Access request.professional_application and request.registry_entry
    ...
```

**Frontend Route Guard** (`src/features/professional/PracticePageGuard.tsx`):
```tsx
export function PracticePageGuard({ children }: { children: React.ReactNode }) {
  const [canCreate, setCanCreate] = useState<boolean | null>(null);
  const [reason, setReason] = useState<string>('');
  const { user } = useAuth();
  const { professional } = useProfessionalAuth();

  useEffect(() => {
    async function checkAccess() {
      const result = await canCreatePracticePage(user);
      setCanCreate(result.canCreate);
      setReason(result.reason || '');
    }
    checkAccess();
  }, [user]);

  if (canCreate === null) {
    return <LoadingSpinner />;
  }

  if (!canCreate) {
    return (
      <AccessDenied
        title="Practice Page Access Restricted"
        message={reason}
        actions={[
          { label: 'View Registry Profile', link: '/registry/professional/me' },
          { label: 'Contact Support', link: '/help' }
        ]}
      />
    );
  }

  return <>{children}</>;
}

// Usage in App.tsx
<Route
  path="/professional/pages/*"
  element={
    <PracticePageGuard>
      <ProfessionalLayout />
    </PracticePageGuard>
  }
>
  <Route path="create" element={<CreatePracticePageWizard />} />
  <Route path="manage" element={<ManagePracticePage />} />
</Route>
```

### 2. Relationship Between Pharmacy Entity and Practice Page

**Question**: How do practice pages relate to existing `Pharmacy` model?

**Options**:

**Option A: Separate Systems** (Recommended)
- Keep existing `Pharmacy` model for admin-created pharmacies
- New `ProfessionalPracticePage` model for professional-created pages
- Both can be nominated by users
- `NominatedPharmacy` model can reference either:
  ```python
  class NominatedPharmacy(models.Model):
      user = models.ForeignKey(CustomUser)

      # Option 1: Admin-created pharmacy
      pharmacy = models.ForeignKey(Pharmacy, null=True, blank=True)

      # Option 2: Professional practice page
      practice_page = models.ForeignKey(
          ProfessionalPracticePage,
          null=True,
          blank=True
      )

      # Constraint: Must have one or the other
      class Meta:
          constraints = [
              CheckConstraint(
                  check=(
                      Q(pharmacy__isnull=False) & Q(practice_page__isnull=True) |
                      Q(pharmacy__isnull=True) & Q(practice_page__isnull=False)
                  ),
                  name='one_pharmacy_type_only'
              )
          ]
  ```

**Option B: Unified System** (More complex, not recommended for MVP)
- Migrate `Pharmacy` model to support both admin and professional creation
- Add `created_by` field (admin vs professional)
- Add `owner` FK to professional (nullable)
- More complex migration path

**Recommendation**: Use Option A (separate systems) for MVP, consider unification in future if needed.

### 3. Slug Generation

**Question**: How to ensure unique slugs for practice pages?

**Answer**: Auto-generate from practice name with collision handling:

```python
from django.utils.text import slugify

def generate_unique_slug(practice_name, user):
    base_slug = slugify(practice_name)
    slug = base_slug
    counter = 1

    while ProfessionalPracticePage.objects.filter(slug=slug).exists():
        slug = f"{base_slug}-{counter}"
        counter += 1

    return slug

# Usage
slug = generate_unique_slug("Golden Pharmacy Abuja", user)
# Result: "golden-pharmacy-abuja"
# If exists: "golden-pharmacy-abuja-1"
```

User can also customize slug during creation if desired.

### 4. Verification Workflow

**Question**: Should pages be auto-verified or require admin review?

**Answer**: Two-tier verification:

**Tier 1: License Verification** (Automatic)
- User must have approved application + active license to create page
- Page creation automatically validates these
- Page can be published immediately

**Tier 2: Content Verification** (Manual, optional)
- Admin reviews page content (photos, description, services)
- Admin can mark page as "verified" (gets blue checkmark badge)
- Optional: Admin can suspend page if inappropriate content found

**Status Flow**:
```
Created → Published (pending verification) → Verified (admin approval)
                                           → Suspended (admin action)
```

**Recommendation for MVP**: Allow auto-publish (Tier 1 only), add Tier 2 in future release.

### 5. Analytics & Tracking

Track these metrics per page:
- Total views (incremented on page load)
- Unique views (by IP or user session)
- Total nominations (if in-store)
- Total bookings (if virtual)
- Conversion rate (views → nominations/bookings)
- Popular services (which services are clicked most)
- Traffic sources (direct, search, referral)

Store analytics in separate model:
```python
class PracticePageAnalytics(models.Model):
    practice_page = models.ForeignKey(ProfessionalPracticePage)
    date = models.DateField()
    total_views = models.PositiveIntegerField(default=0)
    unique_views = models.PositiveIntegerField(default=0)
    nominations = models.PositiveIntegerField(default=0)
    bookings = models.PositiveIntegerField(default=0)
    # ...
```

### 6. SEO Considerations

For public practice pages to be discoverable via Google:
- Use semantic HTML (schema.org markup for LocalBusiness/MedicalBusiness)
- Generate sitemap for all published pages
- Add meta tags (title, description, Open Graph)
- Implement server-side rendering (SSR) or static site generation (SSG) for React pages
- Add breadcrumb navigation

Example schema.org markup:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Pharmacy",
  "name": "Golden Pharmacy Abuja",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Gimbiya Street",
    "addressLocality": "Abuja",
    "postalCode": "900001",
    "addressCountry": "NG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 9.0569,
    "longitude": 7.4951
  },
  "telephone": "+234-XXX-XXXX-XXX",
  "openingHours": "Mo-Fr 08:00-20:00",
  "priceRange": "$$"
}
</script>
```

---

## Open Questions

### 1. Group Practices

**Question**: Should pharmacists be able to create group practice pages with multiple professionals?

**Answer for MVP**: Start with individual pages only. Add group practices in Phase 2 with:
- `page_type = 'group_practice'`
- `PracticePageMember` model (many-to-many relationship)
- Admin can be "owner" with permission to add/remove members

### 2. Multi-Location Pages

**Question**: Can a pharmacist have multiple physical locations under one page?

**Answer for MVP**: One page = one location. For multiple locations:
- Professional creates separate pages for each location
- Dashboard shows "Manage All Pages"
- Future: Add "Chain" concept for multi-location management

### 3. Payment Integration (Virtual Services)

**Question**: How are consultation fees collected?

**Answer for MVP**: Manual payment (outside platform). Future phases:
- Integrate Paystack for online payment
- Escrow system (hold payment until consultation complete)
- Professional sets pricing in page settings

### 4. Booking System (Virtual Services)

**Question**: How does booking flow work?

**Answer for MVP**: Simple form submission:
1. Patient clicks "Book Consultation"
2. Fill form: date/time preference, consultation type, reason
3. Submit booking request
4. Professional receives notification
5. Professional confirms/rejects via email or dashboard
6. Patient receives confirmation email

**Future**: Full calendar integration with auto-booking and video call links.

### 5. Page Ownership Transfer

**Question**: Can page ownership be transferred?

**Answer for MVP**: No transfer. If professional leaves/retires:
- Page can be unpublished or marked as "No longer active"
- No ownership transfer

**Future**: Add transfer workflow for business succession.

---

## Related Research

- [Professional Registration System Design](/Users/new/phbfinal/phbfrontend/docs/professional_registration_and_more/PHB_PROFESSIONAL_REGISTRATION_SYSTEM_DESIGN.md)
- [Professional Registration Complete Implementation](/Users/new/phbfinal/phbfrontend/PROFESSIONAL_REGISTRATION_COMPLETE_IMPLEMENTATION.md)
- [Prescription Triage System Complete](/Users/new/phbfinal/phbfrontend/PRESCRIPTION_TRIAGE_SYSTEM_COMPLETE.md)
- [Pharmacy Nomination System Plan](/Users/new/phbfinal/phbfrontend/thoughts/shared/plans/2025-10-21-pharmacy-nomination-system.md)
- [Registry Landing and Search Complete](/Users/new/phbfinal/phbfrontend/REGISTRY_LANDING_AND_SEARCH_COMPLETE.md)

---

## Summary: What to Build Next

### Immediate Next Steps (for user eruwagolden55@yahoo.com)

1. ✅ **Verify Current Status**
   - Confirm user has `ProfessionalApplication.application_status = 'approved'`
   - Confirm user has `PHBProfessionalRegistry.status = 'active'`
   - Check PHB license number: `PHB-PHARM-XXXXXXXX-XXXX`

2. 🔨 **Implement Practice Pages System** (4-6 weeks)
   - Phase 1: Backend models and API (1-2 weeks)
   - Phase 2: UI components (1-2 weeks)
   - Phase 3: Integration with existing systems (1 week)
   - Phase 4: Polish and launch (1 week)

3. 🎯 **Enable Page Creation Access**
   - Add access control decorator: `@requires_active_license`
   - Add frontend guard: `<PracticePageGuard>`
   - Add dashboard prompt: "Create Your Practice Page"
   - Add navigation menu item: "My Practice Page"

4. 🚀 **Launch MVP Features**
   - ✅ Create practice page (with service type: in-store | virtual)
   - ✅ Public practice page view
   - ✅ Practice page management dashboard
   - ✅ Search/directory of practice pages
   - ✅ Nomination integration (for in-store pages)
   - ⏳ Booking integration (for virtual pages) - Phase 2

### Why This Approach?

1. **Builds on Existing Infrastructure**: Uses existing professional registration, authentication, and approval workflows
2. **Self-Service**: Reduces admin burden (professionals manage own pages)
3. **Scalable**: Pages system can grow to thousands of professionals
4. **Flexible**: Supports both physical and virtual service models
5. **Familiar UX**: "Pages" concept is well-understood from LinkedIn/Facebook
6. **Monetizable**: Premium page features can be added later

### Success Metrics

After implementation, track:
- Number of practice pages created
- Percentage of approved professionals with pages
- Page views and engagement
- Nominations/bookings through pages
- User satisfaction (surveys)
- Platform growth (new users discovering services)

---

**Status**: Research Complete - Ready for Implementation Planning
**Next Action**: Review this document with stakeholders and prioritize implementation phases
**Estimated Timeline**: 4-6 weeks for MVP (Phases 1-3)
**Key Decision Needed**: Approve separate "Practice Pages" system vs extending existing Pharmacy model
