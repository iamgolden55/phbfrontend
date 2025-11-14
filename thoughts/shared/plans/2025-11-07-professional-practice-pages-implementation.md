# Professional Practice Pages System - Implementation Plan

**Date Created**: November 7, 2025
**Last Updated**: November 7, 2025 (Added Phase 0 - Map System Refactoring + Hospital-Pharmacy Relationship)
**Status**: 🔵 Planning Phase
**Estimated Timeline**: 6-7 weeks (5 phases)
**Priority**: High

---

## Executive Summary

### What We're Building
A LinkedIn/Facebook-style public practice page system that allows **approved healthcare professionals** to create and manage their own business pages. This bridges the gap between professional licensing (PHB registry) and public marketing, enabling professionals to advertise services directly to patients.

### Why This Matters
**Current Gap**: The PHB system has robust professional registration and licensing, but approved professionals have no way to create public-facing pages to market their services. The existing `Pharmacy` model is admin-created only.

**Solution**: New `ProfessionalPracticePage` system that:
- Allows approved professionals to self-create practice pages
- Supports two service types: **in-store** (walk-in pharmacy) and **virtual** (online consultation)
- Uses slug-based public URLs (`/pages/golden-pharmacy-abuja`)
- Integrates with existing pharmacy nomination and prescription systems
- Maintains clear separation from admin-created `Pharmacy` model

### Key User
**Example**: eruwagolden55@yahoo.com (approved pharmacist with PHB license PHB-PHARM-A3F2B9C1-E4D7) wants to create a public page to market their pharmacy services to patients.

---

## Current State Analysis

### ✅ What Exists (Foundation)

#### Three-Tier Professional Tracking System
1. **ProfessionalApplication** (`/api/models/registry/professional_application.py`)
   - Application submission and review workflow
   - Status: draft → submitted → under_review → approved/rejected
   - PHB license number issued upon approval
   - Document verification system

2. **PHBProfessionalRegistry** (`/api/models/registry/professional_registry.py`)
   - Public searchable register (like GMC)
   - OneToOne with approved ProfessionalApplication
   - Fields: license_status, license_expiry_date, is_searchable
   - Public professional information exposed

3. **Operational Models** (`/api/models/medical_staff/`)
   - `Pharmacist`: Hospital operational profile, prescription triage capability
   - `Doctor`: Hospital operational profile, appointment management
   - `Nurse`: Hospital operational profile
   - Purpose: Hospital operations, NOT public marketing

#### Professional Authentication System
- **Frontend**: `professionalAuthContext.tsx` - Wrapper around main auth, checks `user.role === 'doctor'`
- **Backend**: Cookie-based JWT authentication with `JWTCookieAuthentication`
- **Registration Service**: `registryService.ts` - 949 lines, complete API client with public/professional/admin tiers

#### Existing Pharmacy Model
- **File**: `/api/models/medical/pharmacy.py`
- **Purpose**: Admin-created pharmacies for patient nomination
- **Fields**: phb_pharmacy_code, address fields, geolocation (lat/lon), opening_hours (JSONField), services_offered (JSONField)
- **Integrated With**: `NominatedPharmacy` model for patient pharmacy selection

#### Hospital-Pharmacy Relationship (CRITICAL EXISTING FEATURE)

The system **already supports** pharmacies affiliated with hospitals. This is a foundational feature that must be understood for the practice pages implementation.

**Existing Pharmacy Model Structure** (`/api/models/medical/pharmacy.py`, lines 76-83):
```python
hospital = models.ForeignKey(
    'Hospital',
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name='affiliated_pharmacies',
    help_text="If pharmacy is part of a hospital"
)
```

##### Three Types of Pharmacies in the System

1. **Independent Admin Pharmacy**
   - Created by PHB admin
   - `Pharmacy` model with `hospital=None`
   - Standalone pharmacy not affiliated with any hospital
   - Example: "Golden Pharmacy Abuja" (independent community pharmacy)
   - Use case: Patient nominates independent pharmacy for prescription collection

2. **Hospital-Affiliated Pharmacy** (EXISTING)
   - Created by PHB admin
   - `Pharmacy` model with `hospital=<Hospital FK>`
   - Hospital's own pharmacy (e.g., "General Hospital Pharmacy")
   - Accessible via: `hospital.affiliated_pharmacies.all()`
   - Reverse relation from Hospital model: `affiliated_pharmacies`
   - Use case: Patient being treated at General Hospital nominates General Hospital's own pharmacy
   - Integration: Hospital patients can easily select their hospital's pharmacy

3. **Professional Practice Page** (NEW - This Implementation)
   - Created by approved professional (self-service)
   - `ProfessionalPracticePage` model (separate from Pharmacy)
   - Can be `in_store`, `virtual`, or `both`
   - Professional-owned marketing page
   - Use case: Approved pharmacist creates their own public practice page to advertise services

##### Why This Matters for Implementation

**Pharmacy Nomination System Update Required**:
The `NominatedPharmacy` model currently only accepts admin-created `Pharmacy` (types 1 & 2 above). We need to extend it to also accept `ProfessionalPracticePage` (type 3):

```python
class NominatedPharmacy(TimestampedModel):
    user = models.ForeignKey(User, ...)

    # EXISTING: Admin-created pharmacy (independent OR hospital-affiliated)
    pharmacy = models.ForeignKey(
        Pharmacy,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='nominations',
        help_text="Admin-created pharmacy (can be hospital-affiliated)"
    )

    # NEW: Professional-created practice page
    practice_page = models.ForeignKey(
        'ProfessionalPracticePage',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='nominations',
        help_text="Professional-created practice page"
    )

    def clean(self):
        # Constraint: Exactly ONE must be set
        if not self.pharmacy and not self.practice_page:
            raise ValidationError("Must nominate either a pharmacy or practice page")
        if self.pharmacy and self.practice_page:
            raise ValidationError("Cannot nominate both pharmacy and practice page")
```

**Prescription Routing Implications**:
When routing prescriptions, the system must handle all three pharmacy types:
- **Independent Admin Pharmacy**: Route to hospital's pharmacist pool (existing logic)
- **Hospital-Affiliated Pharmacy**: Route to hospital's pharmacist pool (existing logic)
- **Professional Practice Page**: Route to page owner's pharmacist profile (NEW logic)

**Public Directory Implications**:
- Hospital-affiliated pharmacies appear in pharmacy search with "🏥 Hospital Pharmacy" badge
- Independent pharmacies appear as regular pharmacies
- Professional practice pages appear in new practice pages directory
- Future enhancement: Hospital detail pages can list `hospital.affiliated_pharmacies.all()`

**Hospital Dashboard Integration**:
Hospitals can view and manage their affiliated pharmacies:
```python
hospital = Hospital.objects.get(id=hospital_id)
affiliated_pharmacies = hospital.affiliated_pharmacies.all()
# Returns all Pharmacy objects with hospital=<this hospital>
```

##### Key Takeaway
The system already has sophisticated pharmacy-hospital relationships. The new `ProfessionalPracticePage` system **adds a third pharmacy type** (professional-owned) rather than replacing the existing admin-created pharmacy system. All three types must coexist and integrate with pharmacy nomination and prescription routing.

#### Prescription System Integration Points
- **Prescription Triage**: Complete system (PRESCRIPTION_TRIAGE_SYSTEM_COMPLETE.md)
- **Drug Database**: 505 drugs imported with NAFDAC compliance
- **Professional Workflows**: Pharmacist/Doctor review, approve/reject prescriptions
- **Email Notifications**: Complete email system for prescription lifecycle

### ❌ What's Missing (Gaps)

1. **No Self-Service Practice Page Creation**
   - Approved professionals cannot create their own public pages
   - Must rely on admins to create `Pharmacy` entries

2. **No Virtual Service Support**
   - Current `Pharmacy` model assumes physical location
   - No support for online-only consultation services

3. **No Public Directory for Practice Pages**
   - No browsable directory of professional services
   - No search/filter by service type, location, specialty

4. **No "Create Practice Page" Wizard**
   - No frontend wizard for step-by-step page setup
   - No access control checking approval status before creation

5. **No Integration with Pharmacy Nomination**
   - Can't nominate a professional-created practice page
   - `NominatedPharmacy` only works with admin `Pharmacy` model

6. **No Dashboard Management for Pages**
   - Professionals can't edit/update their practice pages
   - No analytics (page views, inquiries, bookings)

---

## Desired End State

### User Journey: Approved Professional Creates Practice Page

```
1. PROFESSIONAL LOGS IN
   - eruwagolden55@yahoo.com logs in to professional dashboard
   - Dashboard shows "Create Your Practice Page" CTA (if eligible)

2. ACCESS CONTROL CHECK (Backend + Frontend)
   ✓ Has approved ProfessionalApplication (application_status='approved')
   ✓ Has active PHB license in PHBProfessionalRegistry (license_status='active', not expired)
   ✓ Doesn't already have a practice page (ProfessionalPracticePage.owner != user)
   → If all pass: Show "Create Practice Page" wizard
   → If fail: Show error with reason and next steps

3. WIZARD: STEP 1 - BASIC INFORMATION
   - Practice Name: "Golden Pharmacy Abuja"
   - Service Type: [in_store, virtual, both]
   - Slug: auto-generated from practice name, editable
   - Short Description (160 chars for SEO)

4. WIZARD: STEP 2 - CONTACT & LOCATION
   - If service_type includes 'in_store':
     - Physical location form (address, city, state, latitude/longitude via map picker)
     - Opening hours (JSON: {monday: {open:'09:00', close:'18:00', closed:false}, ...})
     - Phone number (for in-person inquiries)
   - If service_type includes 'virtual':
     - Virtual consultation hours
     - Online booking link
     - Video consultation platform (Zoom/Google Meet/etc.)

5. WIZARD: STEP 3 - SERVICES & PRICING
   - Services offered (checkboxes + custom):
     - For pharmacy: "Prescription Dispensing", "OTC Medications", "Health Screening", "Vaccination"
     - For doctor: "General Consultation", "Follow-up Appointment", "Medical Certificates"
   - Pricing (optional): Service name → Price in Naira
   - Payment methods accepted (cash, card, transfer, insurance)

6. WIZARD: STEP 4 - ABOUT & CREDENTIALS
   - About section (rich text editor, 500 words max)
   - Professional credentials (auto-populated from PHBProfessionalRegistry)
     - PHB License Number (verified badge)
     - Years of Experience
     - Specialization
   - Additional certifications (optional upload)
   - Languages spoken

7. WIZARD: STEP 5 - REVIEW & PUBLISH
   - Preview of public page
   - Publish button → Creates ProfessionalPracticePage record
   - Status starts as 'draft', can publish when ready
   - Verification workflow (optional admin review before public listing)

8. PRACTICE PAGE GOES LIVE
   - Public URL: https://phb.com/pages/golden-pharmacy-abuja
   - Appears in public directory (if is_published=True and verification_status='verified')
   - Available for pharmacy nomination (if service_type includes 'in_store')

9. PATIENT DISCOVERS PAGE
   - Patient searches public directory: "pharmacies in Abuja"
   - Finds "Golden Pharmacy Abuja" in results
   - Clicks to view full page with services, hours, contact info
   - Can nominate this pharmacy for prescription collection
   - Can book virtual consultation (if service_type includes 'virtual')

10. PROFESSIONAL MANAGES PAGE
   - Dashboard widget shows page stats (views, nominations, inquiries)
   - Can edit page anytime (update hours, services, pricing)
   - Can unpublish page temporarily (is_published=False)
   - Can view analytics (page views over time, conversion rates)
```

### Integration Points

#### 1. Pharmacy Nomination System
**Current**: `NominatedPharmacy` model links to admin `Pharmacy` model
**New**: Update `NominatedPharmacy` to accept either:
- `pharmacy` (ForeignKey to Pharmacy) - Admin-created
- `practice_page` (ForeignKey to ProfessionalPracticePage) - Professional-created

**Migration Strategy**: Add `practice_page` field as nullable, enforce constraint that exactly one of `pharmacy` or `practice_page` is set.

#### 2. Prescription Routing
**Current**: Prescriptions route to `Pharmacy` via `nominated_pharmacy.pharmacy`
**New**: Check if nomination points to:
- `Pharmacy` → Use existing flow
- `ProfessionalPracticePage` → Route to page owner's pharmacy operational profile

**Logic**:
```python
if prescription_request.nominated_pharmacy.practice_page:
    # Professional-created page
    practice_page = prescription_request.nominated_pharmacy.practice_page
    pharmacist = practice_page.owner.pharmacist_profile
    # Assign to pharmacist for triage
else:
    # Admin-created pharmacy
    pharmacy = prescription_request.nominated_pharmacy.pharmacy
    # Existing hospital routing logic
```

#### 3. Professional Dashboard
**Current**: `/professional/dashboard` shows prescription queue, stats
**New**: Add "My Practice Page" section with:
- "Create Practice Page" CTA (if no page exists and eligible)
- Page management widget (if page exists)
  - Edit Page button
  - Page stats (views, nominations)
  - Quick toggle for is_published status

#### 4. Public Directory Pages
**New Routes**:
- `/pages` - Directory landing page with search/filters
- `/pages/:slug` - Individual practice page public view
- `/professional/my-practice-page` - Management dashboard for page owner

---

## Implementation Phases

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| **Phase 0: Map System Refactoring** | **1 week** | **Reusable map components, utilities, types** |
| Phase 1: Backend Foundation | 1-2 weeks | Models, migrations, API endpoints, serializers |
| Phase 2: Frontend Services & Components | 1-2 weeks | Service layer, wizard, management dashboard |
| Phase 3: Public Pages & Map Integration | 1 week | Public directory using centralized map, page view |
| Phase 4: Polish & Launch | 1 week | Email notifications, admin tools, testing, documentation |
| **Total** | **6-7 weeks** | Complete professional practice pages system |

---

## Phase 0: Map System Refactoring (1 week) ✅ COMPLETE

### 🎯 Goal: Centralized Location-Based Infrastructure

Extract the existing `/find-pharmacy` page (FindPharmacyPage.tsx, 684 lines) map implementation into **reusable, generic components** that can display ANY location-based entities throughout the system.

### Why This Matters

**Current State**: FindPharmacyPage has a fully functional Mapbox-based map system with desktop/mobile responsive layouts, custom markers, search/filter functionality, and location cards. However, it's pharmacy-specific and not reusable.

**Problem**: When building the practice pages directory (Phase 3), we'd need to duplicate ~684 lines of map logic. Future location features (hospitals, clinics, labs) would each require similar duplication.

**Solution**: Create a centralized map system that works for:
- Pharmacies (existing)
- Professional Practice Pages (new - Phase 3)
- Hospitals (future)
- Clinics, Labs, Emergency Services (future)

**Benefits**:
1. **DRY Principle**: One map implementation instead of duplicating code
2. **Consistency**: All location features have the same UX
3. **Maintainability**: Update map behavior in one place
4. **Extensibility**: Easy to add new location types
5. **Code Savings**: ~1,700 lines saved across first two location features alone

---

### 0.1 Create Generic Type Definitions

**File**: `/Users/new/phbfinal/phbfrontend/src/types/location.ts` (~200 lines)

```typescript
/**
 * Generic location types for reusable map system
 */

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationCategory {
  id: string;
  name: string;
  icon: string; // Emoji or icon name
  color: string; // Hex color for marker border
  count?: number; // Number of locations in this category
}

export interface BaseLocation extends LocationCoordinates {
  id: string;
  name: string;
  category: string; // Category ID
  address: string;
  city?: string;
  state?: string;
  phone?: string;
  rating?: number;
  reviewCount?: number;
  distance?: string; // e.g., "0.3 miles"
  isOpen?: boolean;
  hours?: string; // e.g., "8:00 AM - 10:00 PM"
}

export interface LocationWithDetails<T = any> extends BaseLocation {
  details: T; // Type-specific additional data
}

// Pharmacy-specific details
export interface PharmacyDetails {
  services: string[];
  is24h: boolean;
}

// Practice page-specific details
export interface PracticePageDetails {
  serviceType: 'in_store' | 'virtual' | 'both';
  professionalType: string;
  licenseNumber: string;
  specialization: string;
  servicesOffered: Array<{ service: string; price: number }>;
  languages: string[];
}

// Hospital-specific details
export interface HospitalDetails {
  departments: string[];
  emergencyServices: boolean;
  bedCount: number;
}

export type Pharmacy = LocationWithDetails<PharmacyDetails>;
export type PracticePage = LocationWithDetails<PracticePageDetails>;
export type Hospital = LocationWithDetails<HospitalDetails>;

export interface MapConfig {
  accessToken: string;
  style: 'streets' | 'outdoors' | 'light' | 'dark' | 'satellite';
  initialCenter: [number, number]; // [lng, lat]
  initialZoom: number;
  minZoom?: number;
  maxZoom?: number;
}
```

**Key Design Decision**: `LocationWithDetails<T>` uses TypeScript generics to allow type-safe extension while maintaining common location fields in `BaseLocation`.

---

### 0.2 Create Map Context for State Management

**File**: `/Users/new/phbfinal/phbfrontend/src/contexts/MapContext.tsx` (~120 lines)

```typescript
import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { BaseLocation, MapConfig } from '../types/location';

interface MapContextValue {
  // Map instances (desktop & mobile)
  desktopMap: React.MutableRefObject<any>;
  mobileMap: React.MutableRefObject<any>;

  // Map state
  center: [number, number];
  zoom: number;
  isLoading: boolean;

  // Selected location
  selectedLocation: BaseLocation | null;
  setSelectedLocation: (location: BaseLocation | null) => void;

  // Map actions
  flyToLocation: (lng: number, lat: number, zoom?: number) => void;
  fitBounds: (bounds: number[][]) => void;

  // Setters
  setCenter: (center: [number, number]) => void;
  setZoom: (zoom: number) => void;
  setIsLoading: (loading: boolean) => void;
}

const MapContext = createContext<MapContextValue | null>(null);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const desktopMap = useRef<any>(null);
  const mobileMap = useRef<any>(null);

  const [center, setCenter] = useState<[number, number]>([-0.1278, 51.5074]); // Default: London
  const [zoom, setZoom] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState<BaseLocation | null>(null);

  const flyToLocation = useCallback((lng: number, lat: number, targetZoom = 15) => {
    if (desktopMap.current) {
      desktopMap.current.flyTo({ center: [lng, lat], zoom: targetZoom });
    }
    if (mobileMap.current) {
      mobileMap.current.flyTo({ center: [lng, lat], zoom: targetZoom });
    }
  }, []);

  const fitBounds = useCallback((bounds: number[][]) => {
    if (desktopMap.current) {
      desktopMap.current.fitBounds(bounds, { padding: 50 });
    }
    if (mobileMap.current) {
      mobileMap.current.fitBounds(bounds, { padding: 50 });
    }
  }, []);

  return (
    <MapContext.Provider
      value={{
        desktopMap,
        mobileMap,
        center,
        zoom,
        isLoading,
        selectedLocation,
        setSelectedLocation,
        flyToLocation,
        fitBounds,
        setCenter,
        setZoom,
        setIsLoading,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within MapProvider');
  }
  return context;
};
```

**Key Design Decision**: Context avoids prop drilling for map state. Both desktop and mobile map instances managed centrally.

---

### 0.3 Create Reusable Map Component

**File**: `/Users/new/phbfinal/phbfrontend/src/components/map/LocationMap.tsx` (~250 lines)

Extracts core Mapbox initialization, marker creation, and interaction logic from FindPharmacyPage into a generic component.

**Key Features**:
- Generic `locations: T[]` prop accepts any location type
- Custom marker creation via optional `onMarkerCreate` callback
- Automatic marker generation with category icons and colors
- Click handler for marker selection
- Hover effects (scale animation)
- Responsive for desktop/mobile

**Usage Example**:
```typescript
<LocationMap
  locations={pharmacies}
  categories={pharmacyCategories}
  onLocationSelect={setSelectedPharmacy}
  deviceType="desktop"
  containerClassName="w-full h-full"
/>
```

---

### 0.4 Create Generic Search and Filter Component

**File**: `/Users/new/phbfinal/phbfrontend/src/components/map/LocationSearchFilter.tsx` (~150 lines)

Reusable search bar and category filter system with desktop/mobile variants.

**Key Features**:
- Search input with icon
- Category checkboxes (desktop) or chips (mobile)
- Filter toggle button
- Show/hide animation for filter panel
- Category counts displayed

**Desktop variant**: Full filter panel with checkboxes
**Mobile variant**: Compact chip-based filter tags

---

### 0.5 Create Generic Location List Component

**File**: `/Users/new/phbfinal/phbfrontend/src/components/map/LocationList.tsx` (~200 lines)

Generic scrollable list of locations with selection state.

**Key Features**:
- Location card with name, address, rating, distance
- Category icon display
- Selected state highlighting (blue background + left border)
- Open/closed status badge
- Optional custom details rendering via `renderLocationDetails` prop
- Desktop and mobile layout variants

---

### 0.6 Create Complete Location Finder Layout

**File**: `/Users/new/phbfinal/phbfrontend/src/components/map/LocationFinderLayout.tsx` (~300 lines)

**Complete turn-key solution** that combines all components into a full-featured location finder page.

**Desktop Layout**:
- Floating sidebar (left) with search, filters, location list
- Full-screen map (right) with custom markers
- Selected location card (bottom) with directions/call buttons

**Mobile Layout**:
- Split view: Map (top 50%) + Location list (bottom 50%)
- Search/filter bar at top of list
- Selected location bottom sheet

**Props**:
```typescript
<LocationFinderLayout
  locations={yourLocations}
  categories={yourCategories}
  onSearch={handleSearch}
  onFilter={handleFilter}
  searchPlaceholder="Search..."
  renderLocationDetails={customRenderer}  // Optional
  renderSelectedCard={customCard}         // Optional
/>
```

**Key Feature**: Handles ALL layout logic internally. Pages only need to provide data and callbacks.

---

### 0.7 Refactor FindPharmacyPage to Use New System

**File**: `/Users/new/phbfinal/phbfrontend/src/pages/FindPharmacyPage.tsx` (REFACTORED)

**Before**: 684 lines of page-specific code
**After**: ~100 lines using LocationFinderLayout

```typescript
import React, { useState, useEffect } from 'react';
import { LocationFinderLayout } from '../components/map/LocationFinderLayout';
import { Pharmacy, PharmacyDetails, LocationCategory } from '../types/location';

const FindPharmacyPage = () => {
  const categories: LocationCategory[] = [
    { id: '24h', name: '24/7 Pharmacies', icon: '🌙', color: '#059669', count: 8 },
    { id: 'hospital', name: 'Hospital Pharmacies', icon: '🏥', color: '#dc2626', count: 12 },
    { id: 'drive', name: 'Drive-Through', icon: '🚗', color: '#7c3aed', count: 15 },
    // ... more categories
  ];

  const [filteredPharmacies, setFilteredPharmacies] = useState<Pharmacy[]>([]);

  const handleSearch = (query: string) => {
    // Filter logic
  };

  const handleFilter = (categoryIds: string[]) => {
    // Filter logic
  };

  const renderPharmacyDetails = (pharmacy: Pharmacy) => (
    <div className="mt-2">
      {pharmacy.details.is24h && (
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
          24/7
        </span>
      )}
    </div>
  );

  return (
    <LocationFinderLayout
      locations={filteredPharmacies}
      categories={categories}
      onSearch={handleSearch}
      onFilter={handleFilter}
      searchPlaceholder="Search pharmacies, services..."
      renderLocationDetails={renderPharmacyDetails}
      title="Find Pharmacy"
    />
  );
};

export default FindPharmacyPage;
```

**Result**: Reduced from 684 lines to ~100 lines (584 lines saved = 85% reduction) 🎉

---

### Phase 0 Success Criteria

**Automated Checks**:
- [x] TypeScript compilation passes: `npm run typecheck` ⚠️ (Pre-existing issue in TravelVaccinePage-end.tsx, all map system files are type-safe)
- [x] No type errors in location.ts, MapContext.tsx, LocationMap.tsx, LocationSearchFilter.tsx, LocationList.tsx, LocationFinderLayout.tsx
- [x] All components export correctly

**Manual Testing**:
- [x] Refactored FindPharmacyPage works exactly as before
- [x] Desktop sidebar shows pharmacies, search, filters
- [x] Mobile split view shows map (top) and list (bottom)
- [x] Click marker → Flies to location, shows details card
- [x] Search "boots" → Filters to matching pharmacies
- [x] Filter by "24/7" category → Shows only 24/7 pharmacies
- [x] Click "Directions" → Opens Google Maps with destination
- [x] Click "Call" → Opens phone dialer
- [x] No visual regressions from original FindPharmacyPage
- [x] Mobile and desktop layouts match original UX

**Code Quality**:
- [x] Generic types allow reuse for any location entity
- [x] MapContext manages shared state (no prop drilling)
- [x] Components are small, focused, testable
- [x] Desktop and mobile variants share logic, differ only in layout
- [x] Zero code duplication between map features

**Documentation**:
- [ ] Add JSDoc comments to all exported functions/components
- [ ] Create README in `/components/map/` explaining usage
- [ ] Update CLAUDE.md with centralized map system architecture

---

## Phase 0 Deliverables Summary

| Component | Lines | Purpose |
|-----------|-------|---------|
| `types/location.ts` | ~200 | Generic location types (BaseLocation, LocationWithDetails, etc.) |
| `contexts/MapContext.tsx` | ~120 | Shared map state management |
| `components/map/LocationMap.tsx` | ~250 | Reusable Mapbox map component |
| `components/map/LocationSearchFilter.tsx` | ~150 | Generic search/filter UI |
| `components/map/LocationList.tsx` | ~200 | Generic location list |
| `components/map/LocationFinderLayout.tsx` | ~300 | Complete turn-key layout |
| `pages/FindPharmacyPage.tsx` (refactored) | ~100 | Uses new system (down from 684) |
| **Total New Code** | ~1,220 | Reusable infrastructure |
| **Net Savings (immediate)** | 584 lines | From FindPharmacyPage refactor |
| **Projected Savings (Phase 3)** | ~550 lines | PracticePagesDirectory avoids duplication |
| **Projected Savings (future)** | ~1,700+ lines | Hospitals, clinics, labs, emergency services |

---

## How Phase 0 Enables Phase 3

When implementing the Practice Pages Directory (Phase 3), we'll only need ~150 lines of code:

```typescript
// Future: PracticePagesDirectoryPage.tsx (~150 lines)
const PracticePagesDirectoryPage = () => {
  const categories: LocationCategory[] = [
    { id: 'pharmacist', name: 'Pharmacists', icon: '💊', color: '#059669' },
    { id: 'doctor', name: 'Doctors', icon: '👨‍⚕️', color: '#dc2626' },
    // ...
  ];

  const [practicePages, setPracticePages] = useState<PracticePage[]>([]);

  // Load from API, convert to PracticePage type, pass to LocationFinderLayout
  return (
    <LocationFinderLayout
      locations={practicePages}
      categories={categories}
      onSearch={handleSearch}
      onFilter={handleFilter}
      searchPlaceholder="Search professionals, services..."
      title="Find Healthcare Professionals"
    />
  );
};
```

**Without Phase 0**: Would need ~700 lines (duplicate map logic)
**With Phase 0**: Only ~150 lines (data loading + LocationFinderLayout usage)

---

### Phase 1: Backend Foundation (1-2 weeks) ✅ COMPLETE

#### 1.1 Database Models (`/Users/new/Newphb/basebackend/api/models/professional/`)

**File**: `professional_practice_page.py`

```python
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.core.exceptions import ValidationError
from api.models.base import TimestampedModel
from api.models.registry.professional_registry import PHBProfessionalRegistry
import uuid

User = get_user_model()

class ProfessionalPracticePage(TimestampedModel):
    """
    Public-facing practice page for approved healthcare professionals.
    Allows professionals to market services (in-store or virtual).
    """
    # Primary Keys & Relations
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    owner = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='practice_page',
        help_text="Professional who owns this page"
    )
    linked_registry_entry = models.ForeignKey(
        PHBProfessionalRegistry,
        on_delete=models.PROTECT,
        related_name='practice_pages',
        help_text="Link to verified PHB registry entry"
    )

    # Basic Information
    practice_name = models.CharField(
        max_length=200,
        help_text="Name of practice (e.g., 'Golden Pharmacy Abuja')"
    )
    slug = models.SlugField(
        max_length=250,
        unique=True,
        help_text="URL-friendly slug (e.g., 'golden-pharmacy-abuja')"
    )
    tagline = models.CharField(
        max_length=160,
        blank=True,
        help_text="Short description for SEO and previews"
    )
    about = models.TextField(
        blank=True,
        help_text="Detailed about section (rich text supported)"
    )

    # Service Type
    SERVICE_TYPE_CHOICES = [
        ('in_store', 'In-Store/Walk-In Service'),
        ('virtual', 'Virtual Service Only'),
        ('both', 'Both In-Store and Virtual'),
    ]
    service_type = models.CharField(
        max_length=20,
        choices=SERVICE_TYPE_CHOICES,
        help_text="Type of service offered"
    )

    # Physical Location (required if service_type includes 'in_store')
    address_line_1 = models.CharField(max_length=200, blank=True)
    address_line_2 = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    postcode = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=100, default='Nigeria')

    # Geolocation (for map display and proximity searches)
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
        help_text="Latitude coordinate"
    )
    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
        help_text="Longitude coordinate"
    )

    # Contact Information
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    whatsapp_number = models.CharField(max_length=20, blank=True)

    # Opening Hours (JSONField)
    # Format: {
    #   'monday': {'open': '09:00', 'close': '18:00', 'closed': False},
    #   'tuesday': {...}, ...
    # }
    opening_hours = models.JSONField(
        default=dict,
        blank=True,
        help_text="Operating hours for in-store services"
    )

    # Virtual Service Details
    virtual_consultation_hours = models.JSONField(
        default=dict,
        blank=True,
        help_text="Availability for virtual consultations"
    )
    online_booking_url = models.URLField(
        blank=True,
        help_text="Link to booking system for virtual appointments"
    )
    video_platform = models.CharField(
        max_length=100,
        blank=True,
        help_text="Platform used (Zoom, Google Meet, etc.)"
    )

    # Services & Pricing (JSONField)
    # Format: [
    #   {'service': 'Prescription Dispensing', 'price': 0, 'description': '...'},
    #   {'service': 'Health Screening', 'price': 5000, 'description': '...'},
    # ]
    services_offered = models.JSONField(
        default=list,
        blank=True,
        help_text="List of services with optional pricing"
    )

    # Payment Methods (JSONField)
    # Format: ['cash', 'card', 'bank_transfer', 'insurance']
    payment_methods = models.JSONField(
        default=list,
        blank=True,
        help_text="Accepted payment methods"
    )

    # Additional Credentials (JSONField)
    # Format: [
    #   {'certification': 'Advanced Life Support', 'issuer': 'Nigerian Red Cross', 'year': 2022},
    # ]
    additional_certifications = models.JSONField(
        default=list,
        blank=True,
        help_text="Certifications beyond PHB license"
    )

    # Languages (JSONField)
    # Format: ['English', 'Yoruba', 'Hausa', 'Igbo']
    languages_spoken = models.JSONField(
        default=list,
        blank=True,
        help_text="Languages spoken at practice"
    )

    # Publication Status
    is_published = models.BooleanField(
        default=False,
        help_text="Whether page is publicly visible"
    )

    VERIFICATION_STATUS_CHOICES = [
        ('pending', 'Pending Verification'),
        ('verified', 'Verified'),
        ('flagged', 'Flagged for Review'),
        ('suspended', 'Suspended'),
    ]
    verification_status = models.CharField(
        max_length=20,
        choices=VERIFICATION_STATUS_CHOICES,
        default='pending',
        help_text="Admin verification status"
    )

    verification_notes = models.TextField(
        blank=True,
        help_text="Admin notes about verification"
    )
    verified_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='verified_practice_pages',
        help_text="Admin who verified page"
    )
    verified_date = models.DateTimeField(null=True, blank=True)

    # Statistics
    view_count = models.PositiveIntegerField(
        default=0,
        help_text="Number of times page viewed"
    )
    nomination_count = models.PositiveIntegerField(
        default=0,
        help_text="Number of times nominated by patients"
    )

    # SEO
    meta_keywords = models.CharField(
        max_length=255,
        blank=True,
        help_text="SEO keywords"
    )

    class Meta:
        db_table = 'professional_practice_pages'
        verbose_name = 'Professional Practice Page'
        verbose_name_plural = 'Professional Practice Pages'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['is_published', 'verification_status']),
            models.Index(fields=['service_type']),
            models.Index(fields=['city', 'state']),
            models.Index(fields=['latitude', 'longitude']),
        ]

    def __str__(self):
        return f"{self.practice_name} ({self.owner.get_full_name()})"

    def save(self, *args, **kwargs):
        # Auto-generate slug from practice_name if not provided
        if not self.slug:
            self.slug = slugify(self.practice_name)

            # Ensure uniqueness
            original_slug = self.slug
            counter = 1
            while ProfessionalPracticePage.objects.filter(slug=self.slug).exists():
                self.slug = f"{original_slug}-{counter}"
                counter += 1

        super().save(*args, **kwargs)

    def clean(self):
        """Validate model fields"""
        # If in_store service, require physical location
        if self.service_type in ['in_store', 'both']:
            if not (self.address_line_1 and self.city and self.state):
                raise ValidationError(
                    "Physical location required for in-store services"
                )

        # If virtual service, require virtual details
        if self.service_type in ['virtual', 'both']:
            if not (self.online_booking_url or self.phone or self.email):
                raise ValidationError(
                    "Contact method required for virtual services"
                )

    def get_absolute_url(self):
        """Public URL for this practice page"""
        return f"/pages/{self.slug}"

    def is_open_now(self):
        """Check if practice is currently open (for in-store)"""
        if self.service_type == 'virtual':
            return False

        from datetime import datetime
        now = datetime.now()
        day_name = now.strftime('%A').lower()
        current_time = now.strftime('%H:%M')

        day_hours = self.opening_hours.get(day_name, {})
        if day_hours.get('closed', False):
            return False

        open_time = day_hours.get('open', '')
        close_time = day_hours.get('close', '')

        if not (open_time and close_time):
            return False

        return open_time <= current_time <= close_time

    def increment_view_count(self):
        """Increment page view counter"""
        self.view_count += 1
        self.save(update_fields=['view_count'])

    def increment_nomination_count(self):
        """Increment nomination counter"""
        self.nomination_count += 1
        self.save(update_fields=['nomination_count'])


class PhysicalLocation(TimestampedModel):
    """
    Physical location for a practice page (for practices with multiple locations).
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    practice_page = models.ForeignKey(
        ProfessionalPracticePage,
        on_delete=models.CASCADE,
        related_name='locations'
    )

    name = models.CharField(
        max_length=200,
        help_text="Location name (e.g., 'Main Branch', 'Ikeja Office')"
    )
    address_line_1 = models.CharField(max_length=200)
    address_line_2 = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postcode = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=100, default='Nigeria')

    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    phone = models.CharField(max_length=20, blank=True)

    opening_hours = models.JSONField(default=dict, blank=True)

    is_primary = models.BooleanField(
        default=False,
        help_text="Is this the main location?"
    )

    class Meta:
        db_table = 'physical_locations'
        verbose_name = 'Physical Location'
        verbose_name_plural = 'Physical Locations'
        ordering = ['-is_primary', 'name']

    def __str__(self):
        return f"{self.practice_page.practice_name} - {self.name}"


class VirtualServiceOffering(TimestampedModel):
    """
    Virtual service offerings for a practice page.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    practice_page = models.ForeignKey(
        ProfessionalPracticePage,
        on_delete=models.CASCADE,
        related_name='virtual_services'
    )

    service_name = models.CharField(
        max_length=200,
        help_text="Name of virtual service (e.g., 'Online Consultation')"
    )
    description = models.TextField()
    duration_minutes = models.PositiveIntegerField(
        help_text="Typical consultation duration"
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Price in Naira"
    )

    # Availability Schedule (JSONField)
    # Format: {
    #   'monday': [{'start': '09:00', 'end': '12:00'}, {'start': '14:00', 'end': '17:00'}],
    #   'tuesday': [...], ...
    # }
    availability_schedule = models.JSONField(
        default=dict,
        blank=True,
        help_text="Weekly availability slots"
    )

    booking_url = models.URLField(
        blank=True,
        help_text="Direct booking link for this service"
    )

    is_active = models.BooleanField(
        default=True,
        help_text="Whether service is currently offered"
    )

    class Meta:
        db_table = 'virtual_service_offerings'
        verbose_name = 'Virtual Service Offering'
        verbose_name_plural = 'Virtual Service Offerings'
        ordering = ['service_name']

    def __str__(self):
        return f"{self.practice_page.practice_name} - {self.service_name}"
```

**Migration**: `0039_professional_practice_pages.py`

```python
from django.db import migrations, models
import django.db.models.deletion
import uuid

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0038_drug_classifications'),  # Previous migration
    ]

    operations = [
        migrations.CreateModel(
            name='ProfessionalPracticePage',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('practice_name', models.CharField(help_text="Name of practice", max_length=200)),
                ('slug', models.SlugField(help_text="URL-friendly slug", max_length=250, unique=True)),
                # ... all fields from model above
            ],
            options={
                'verbose_name': 'Professional Practice Page',
                'verbose_name_plural': 'Professional Practice Pages',
                'db_table': 'professional_practice_pages',
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='PhysicalLocation',
            fields=[
                # ... fields from model above
            ],
            options={
                'verbose_name': 'Physical Location',
                'verbose_name_plural': 'Physical Locations',
                'db_table': 'physical_locations',
                'ordering': ['-is_primary', 'name'],
            },
        ),
        migrations.CreateModel(
            name='VirtualServiceOffering',
            fields=[
                # ... fields from model above
            ],
            options={
                'verbose_name': 'Virtual Service Offering',
                'verbose_name_plural': 'Virtual Service Offerings',
                'db_table': 'virtual_service_offerings',
                'ordering': ['service_name'],
            },
        ),
        # Add indexes
        migrations.AddIndex(
            model_name='professionalpracticepage',
            index=models.Index(fields=['slug'], name='prof_page_slug_idx'),
        ),
        migrations.AddIndex(
            model_name='professionalpracticepage',
            index=models.Index(fields=['is_published', 'verification_status'], name='prof_page_pub_ver_idx'),
        ),
        migrations.AddIndex(
            model_name='professionalpracticepage',
            index=models.Index(fields=['service_type'], name='prof_page_svc_type_idx'),
        ),
        migrations.AddIndex(
            model_name='professionalpracticepage',
            index=models.Index(fields=['city', 'state'], name='prof_page_location_idx'),
        ),
        migrations.AddIndex(
            model_name='professionalpracticepage',
            index=models.Index(fields=['latitude', 'longitude'], name='prof_page_geo_idx'),
        ),
    ]
```

#### 1.2 Update NominatedPharmacy Model

**File**: `/Users/new/Newphb/basebackend/api/models/medical/pharmacy.py`

**Add to NominatedPharmacy**:
```python
class NominatedPharmacy(TimestampedModel):
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='nominated_pharmacies')

    # EXISTING: Admin-created pharmacy
    pharmacy = models.ForeignKey(
        Pharmacy,
        on_delete=models.CASCADE,
        related_name='nominations',
        null=True,  # ← Make nullable
        blank=True
    )

    # NEW: Professional-created practice page
    practice_page = models.ForeignKey(
        'professional.ProfessionalPracticePage',  # String reference to avoid circular import
        on_delete=models.CASCADE,
        related_name='nominations',
        null=True,
        blank=True,
        help_text="Professional-created practice page (mutually exclusive with pharmacy)"
    )

    nomination_type = models.CharField(max_length=50)
    is_current = models.BooleanField(default=True)

    class Meta:
        db_table = 'nominated_pharmacies'
        verbose_name = 'Nominated Pharmacy'
        verbose_name_plural = 'Nominated Pharmacies'
        constraints = [
            models.CheckConstraint(
                check=(
                    models.Q(pharmacy__isnull=False, practice_page__isnull=True) |
                    models.Q(pharmacy__isnull=True, practice_page__isnull=False)
                ),
                name='pharmacy_or_practice_page_not_both'
            )
        ]

    def get_nominated_location(self):
        """Get nominated location (either Pharmacy or ProfessionalPracticePage)"""
        if self.pharmacy:
            return {
                'type': 'pharmacy',
                'name': self.pharmacy.name,
                'address': self.pharmacy.address_line_1,
                'city': self.pharmacy.city,
                'phone': self.pharmacy.phone,
            }
        elif self.practice_page:
            return {
                'type': 'practice_page',
                'name': self.practice_page.practice_name,
                'address': self.practice_page.address_line_1,
                'city': self.practice_page.city,
                'phone': self.practice_page.phone,
            }
        return None
```

**Migration**: `0040_update_nominated_pharmacy.py`

```python
from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0039_professional_practice_pages'),
    ]

    operations = [
        # Make pharmacy field nullable
        migrations.AlterField(
            model_name='nominatedpharmacy',
            name='pharmacy',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name='nominations',
                to='api.pharmacy'
            ),
        ),
        # Add practice_page field
        migrations.AddField(
            model_name='nominatedpharmacy',
            name='practice_page',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name='nominations',
                to='api.professionalpracticepage',
                help_text='Professional-created practice page (mutually exclusive with pharmacy)'
            ),
        ),
        # Add constraint: exactly one of pharmacy or practice_page must be set
        migrations.AddConstraint(
            model_name='nominatedpharmacy',
            constraint=models.CheckConstraint(
                check=(
                    models.Q(pharmacy__isnull=False, practice_page__isnull=True) |
                    models.Q(pharmacy__isnull=True, practice_page__isnull=False)
                ),
                name='pharmacy_or_practice_page_not_both'
            ),
        ),
    ]
```

#### 1.3 API Endpoints & Views

**File**: `/Users/new/Newphb/basebackend/api/views/practice_page_views.py`

```python
from rest_framework import status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from django.utils import timezone
from api.models.professional.professional_practice_page import (
    ProfessionalPracticePage,
    PhysicalLocation,
    VirtualServiceOffering,
)
from api.models.registry.professional_registry import PHBProfessionalRegistry
from api.models.registry.professional_application import ProfessionalApplication
from api.serializers.practice_page_serializers import (
    ProfessionalPracticePageSerializer,
    ProfessionalPracticePageDetailSerializer,
    ProfessionalPracticePageCreateSerializer,
)

# ============================================================================
# ACCESS CONTROL HELPER
# ============================================================================

def check_can_create_practice_page(user):
    """
    Check if user meets all requirements to create a practice page.

    Requirements:
    1. Has approved ProfessionalApplication
    2. Has active PHB license in PHBProfessionalRegistry
    3. Doesn't already have a practice page

    Returns:
        dict: {'canCreate': bool, 'reason': str (if False)}
    """
    # Check 1: Approved application
    try:
        application = ProfessionalApplication.objects.get(
            user=user,
            application_status='approved',
            phb_license_number__isnull=False,
        )
    except ProfessionalApplication.DoesNotExist:
        return {
            'canCreate': False,
            'reason': 'You must have an approved professional application first. Please complete your registration.',
        }

    # Check 2: Active registry entry
    try:
        registry_entry = PHBProfessionalRegistry.objects.get(
            user=user,
            license_status='active',
            license_expiry_date__gt=timezone.now().date(),
        )
    except PHBProfessionalRegistry.DoesNotExist:
        return {
            'canCreate': False,
            'reason': 'Your PHB license is not active or has expired. Please renew your license.',
        }

    # Check 3: No existing practice page
    if ProfessionalPracticePage.objects.filter(owner=user).exists():
        return {
            'canCreate': False,
            'reason': 'You already have a practice page. You can edit your existing page from your dashboard.',
        }

    return {
        'canCreate': True,
        'registry_entry': registry_entry,
        'application': application,
    }

# ============================================================================
# PUBLIC ENDPOINTS (No authentication required)
# ============================================================================

@api_view(['GET'])
def public_practice_pages(request):
    """
    GET /api/practice-pages/

    Public directory of practice pages. Filterable by:
    - service_type: in_store, virtual, both
    - state: Nigerian state
    - city: City name
    - professional_type: doctor, pharmacist, nurse
    - search: Text search in practice_name, about, services
    """
    # Only show published and verified pages
    pages = ProfessionalPracticePage.objects.filter(
        is_published=True,
        verification_status='verified',
    )

    # Filters
    service_type = request.query_params.get('service_type')
    if service_type:
        pages = pages.filter(service_type=service_type)

    state = request.query_params.get('state')
    if state:
        pages = pages.filter(state__iexact=state)

    city = request.query_params.get('city')
    if city:
        pages = pages.filter(city__iexact=city)

    professional_type = request.query_params.get('professional_type')
    if professional_type:
        pages = pages.filter(linked_registry_entry__professional_type=professional_type)

    search = request.query_params.get('search')
    if search:
        pages = pages.filter(
            Q(practice_name__icontains=search) |
            Q(about__icontains=search) |
            Q(tagline__icontains=search)
        )

    # Pagination
    paginator = PageNumberPagination()
    paginator.page_size = 20
    paginated_pages = paginator.paginate_queryset(pages, request)

    serializer = ProfessionalPracticePageSerializer(paginated_pages, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def public_practice_page_detail(request, slug):
    """
    GET /api/practice-pages/{slug}/

    Public view of a single practice page.
    Increments view_count.
    """
    try:
        page = ProfessionalPracticePage.objects.get(
            slug=slug,
            is_published=True,
            verification_status='verified',
        )
    except ProfessionalPracticePage.DoesNotExist:
        return Response(
            {'error': 'Practice page not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    # Increment view count
    page.increment_view_count()

    serializer = ProfessionalPracticePageDetailSerializer(page)
    return Response(serializer.data)


# ============================================================================
# PROFESSIONAL ENDPOINTS (Requires professional authentication)
# ============================================================================

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def check_eligibility(request):
    """
    GET /api/practice-pages/check-eligibility/

    Check if authenticated user can create a practice page.

    Returns:
        {
            "canCreate": true/false,
            "reason": "string (if canCreate is false)",
            "applicationStatus": "approved",
            "licenseNumber": "PHB-PHARM-...",
            "licenseExpiry": "2026-01-01"
        }
    """
    result = check_can_create_practice_page(request.user)

    if result['canCreate']:
        registry_entry = result['registry_entry']
        application = result['application']

        return Response({
            'canCreate': True,
            'applicationStatus': application.application_status,
            'licenseNumber': registry_entry.phb_license_number,
            'licenseExpiry': registry_entry.license_expiry_date,
            'professionalType': registry_entry.professional_type,
            'specialization': registry_entry.specialization,
        })
    else:
        return Response({
            'canCreate': False,
            'reason': result['reason'],
        })


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_practice_page(request):
    """
    POST /api/practice-pages/create/

    Create a new practice page for authenticated professional.

    Request Body:
        {
            "practice_name": "string",
            "slug": "string" (optional, auto-generated if not provided),
            "tagline": "string",
            "about": "string",
            "service_type": "in_store|virtual|both",
            "address_line_1": "string" (required if service_type includes in_store),
            "city": "string",
            "state": "string",
            "latitude": number,
            "longitude": number,
            "phone": "string",
            "email": "string",
            "opening_hours": {monday: {open, close, closed}, ...},
            "services_offered": [{service, price, description}, ...],
            "payment_methods": ["cash", "card", ...],
            "languages_spoken": ["English", "Yoruba", ...],
            "is_published": true/false
        }

    Returns:
        {
            "success": true,
            "page": { ... page object ... },
            "message": "Practice page created successfully"
        }
    """
    # Check eligibility
    eligibility = check_can_create_practice_page(request.user)
    if not eligibility['canCreate']:
        return Response(
            {'error': eligibility['reason']},
            status=status.HTTP_403_FORBIDDEN
        )

    registry_entry = eligibility['registry_entry']

    # Create page
    serializer = ProfessionalPracticePageCreateSerializer(data=request.data)
    if serializer.is_valid():
        page = serializer.save(
            owner=request.user,
            linked_registry_entry=registry_entry,
        )

        return Response({
            'success': True,
            'page': ProfessionalPracticePageDetailSerializer(page).data,
            'message': 'Practice page created successfully',
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def my_practice_page(request):
    """
    GET /api/practice-pages/my-page/

    Get authenticated user's practice page (if exists).

    Returns:
        {
            "hasPage": true/false,
            "page": { ... page object ... } (if hasPage is true)
        }
    """
    try:
        page = ProfessionalPracticePage.objects.get(owner=request.user)
        return Response({
            'hasPage': True,
            'page': ProfessionalPracticePageDetailSerializer(page).data,
        })
    except ProfessionalPracticePage.DoesNotExist:
        return Response({
            'hasPage': False,
        })


@api_view(['PUT', 'PATCH'])
@permission_classes([permissions.IsAuthenticated])
def update_practice_page(request):
    """
    PUT/PATCH /api/practice-pages/my-page/update/

    Update authenticated user's practice page.

    Request Body: Same as create, but all fields optional

    Returns:
        {
            "success": true,
            "page": { ... updated page object ... },
            "message": "Practice page updated successfully"
        }
    """
    try:
        page = ProfessionalPracticePage.objects.get(owner=request.user)
    except ProfessionalPracticePage.DoesNotExist:
        return Response(
            {'error': 'You do not have a practice page'},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = ProfessionalPracticePageCreateSerializer(
        page,
        data=request.data,
        partial=True,  # Allow partial updates
    )

    if serializer.is_valid():
        page = serializer.save()

        return Response({
            'success': True,
            'page': ProfessionalPracticePageDetailSerializer(page).data,
            'message': 'Practice page updated successfully',
        })

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def toggle_published(request):
    """
    POST /api/practice-pages/my-page/toggle-published/

    Toggle is_published status of authenticated user's practice page.

    Request Body:
        {
            "is_published": true/false
        }

    Returns:
        {
            "success": true,
            "is_published": true/false,
            "message": "Page published successfully" | "Page unpublished successfully"
        }
    """
    try:
        page = ProfessionalPracticePage.objects.get(owner=request.user)
    except ProfessionalPracticePage.DoesNotExist:
        return Response(
            {'error': 'You do not have a practice page'},
            status=status.HTTP_404_NOT_FOUND
        )

    is_published = request.data.get('is_published')
    if is_published is None:
        return Response(
            {'error': 'is_published field is required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    page.is_published = is_published
    page.save(update_fields=['is_published', 'updated_at'])

    message = 'Page published successfully' if is_published else 'Page unpublished successfully'

    return Response({
        'success': True,
        'is_published': page.is_published,
        'message': message,
    })


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def page_analytics(request):
    """
    GET /api/practice-pages/my-page/analytics/

    Get analytics for authenticated user's practice page.

    Returns:
        {
            "view_count": number,
            "nomination_count": number,
            "views_last_30_days": number,
            "nominations_last_30_days": number,
            "is_published": true/false,
            "verification_status": "verified|pending|flagged|suspended",
        }
    """
    try:
        page = ProfessionalPracticePage.objects.get(owner=request.user)
    except ProfessionalPracticePage.DoesNotExist:
        return Response(
            {'error': 'You do not have a practice page'},
            status=status.HTTP_404_NOT_FOUND
        )

    # For now, return basic stats
    # TODO: Implement time-based analytics (views/nominations last 30 days)
    return Response({
        'view_count': page.view_count,
        'nomination_count': page.nomination_count,
        'is_published': page.is_published,
        'verification_status': page.verification_status,
        'created_at': page.created_at,
        'updated_at': page.updated_at,
    })


# ============================================================================
# ADMIN ENDPOINTS (Requires admin authentication)
# ============================================================================

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated, permissions.IsAdminUser])
def admin_list_pages(request):
    """
    GET /api/practice-pages/admin/pages/

    Admin view of all practice pages. Filterable by verification_status.
    """
    pages = ProfessionalPracticePage.objects.all()

    verification_status = request.query_params.get('verification_status')
    if verification_status:
        pages = pages.filter(verification_status=verification_status)

    paginator = PageNumberPagination()
    paginator.page_size = 20
    paginated_pages = paginator.paginate_queryset(pages, request)

    serializer = ProfessionalPracticePageDetailSerializer(paginated_pages, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated, permissions.IsAdminUser])
def admin_verify_page(request, page_id):
    """
    POST /api/practice-pages/admin/pages/{page_id}/verify/

    Admin verifies a practice page.

    Request Body:
        {
            "verification_status": "verified|flagged|suspended",
            "verification_notes": "string"
        }
    """
    try:
        page = ProfessionalPracticePage.objects.get(id=page_id)
    except ProfessionalPracticePage.DoesNotExist:
        return Response(
            {'error': 'Practice page not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    verification_status = request.data.get('verification_status')
    verification_notes = request.data.get('verification_notes', '')

    if verification_status not in ['verified', 'flagged', 'suspended']:
        return Response(
            {'error': 'Invalid verification_status'},
            status=status.HTTP_400_BAD_REQUEST
        )

    page.verification_status = verification_status
    page.verification_notes = verification_notes
    page.verified_by = request.user
    page.verified_date = timezone.now()
    page.save()

    # TODO: Send email notification to page owner

    return Response({
        'success': True,
        'page': ProfessionalPracticePageDetailSerializer(page).data,
        'message': f'Page {verification_status} successfully',
    })
```

**URL Configuration**: `/Users/new/Newphb/basebackend/api/urls.py`

```python
from django.urls import path
from api.views import practice_page_views

urlpatterns = [
    # ... existing URLs

    # Public Practice Page URLs
    path('practice-pages/', practice_page_views.public_practice_pages, name='public_practice_pages'),
    path('practice-pages/<slug:slug>/', practice_page_views.public_practice_page_detail, name='public_practice_page_detail'),

    # Professional Practice Page URLs (requires authentication)
    path('practice-pages/check-eligibility/', practice_page_views.check_eligibility, name='check_eligibility'),
    path('practice-pages/create/', practice_page_views.create_practice_page, name='create_practice_page'),
    path('practice-pages/my-page/', practice_page_views.my_practice_page, name='my_practice_page'),
    path('practice-pages/my-page/update/', practice_page_views.update_practice_page, name='update_practice_page'),
    path('practice-pages/my-page/toggle-published/', practice_page_views.toggle_published, name='toggle_published'),
    path('practice-pages/my-page/analytics/', practice_page_views.page_analytics, name='page_analytics'),

    # Admin Practice Page URLs (requires admin)
    path('practice-pages/admin/pages/', practice_page_views.admin_list_pages, name='admin_list_pages'),
    path('practice-pages/admin/pages/<uuid:page_id>/verify/', practice_page_views.admin_verify_page, name='admin_verify_page'),
]
```

#### 1.4 Serializers

**File**: `/Users/new/Newphb/basebackend/api/serializers/practice_page_serializers.py`

```python
from rest_framework import serializers
from api.models.professional.professional_practice_page import (
    ProfessionalPracticePage,
    PhysicalLocation,
    VirtualServiceOffering,
)
from api.models.registry.professional_registry import PHBProfessionalRegistry

class ProfessionalPracticePageSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views"""

    owner_name = serializers.CharField(source='owner.get_full_name', read_only=True)
    professional_type = serializers.CharField(source='linked_registry_entry.professional_type', read_only=True)
    license_number = serializers.CharField(source='linked_registry_entry.phb_license_number', read_only=True)
    is_open_now = serializers.SerializerMethodField()

    class Meta:
        model = ProfessionalPracticePage
        fields = [
            'id', 'practice_name', 'slug', 'tagline', 'service_type',
            'city', 'state', 'is_published', 'verification_status',
            'owner_name', 'professional_type', 'license_number',
            'is_open_now', 'view_count', 'created_at',
        ]

    def get_is_open_now(self, obj):
        return obj.is_open_now()


class ProfessionalPracticePageDetailSerializer(serializers.ModelSerializer):
    """Full serializer for detail views"""

    owner_name = serializers.CharField(source='owner.get_full_name', read_only=True)
    owner_email = serializers.EmailField(source='owner.email', read_only=True)

    # Professional credentials from registry
    professional_credentials = serializers.SerializerMethodField()

    # Computed fields
    is_open_now = serializers.SerializerMethodField()

    class Meta:
        model = ProfessionalPracticePage
        fields = '__all__'

    def get_professional_credentials(self, obj):
        registry = obj.linked_registry_entry
        return {
            'phb_license_number': registry.phb_license_number,
            'professional_type': registry.professional_type,
            'specialization': registry.specialization,
            'qualification_year': registry.qualification_year,
            'years_of_experience': registry.years_of_experience,
            'primary_qualification': registry.primary_qualification,
            'license_status': registry.license_status,
            'license_expiry_date': registry.license_expiry_date,
        }

    def get_is_open_now(self, obj):
        return obj.is_open_now()


class ProfessionalPracticePageCreateSerializer(serializers.ModelSerializer):
    """Serializer for create/update operations"""

    class Meta:
        model = ProfessionalPracticePage
        fields = [
            'practice_name', 'slug', 'tagline', 'about', 'service_type',
            'address_line_1', 'address_line_2', 'city', 'state', 'postcode', 'country',
            'latitude', 'longitude', 'phone', 'email', 'website', 'whatsapp_number',
            'opening_hours', 'virtual_consultation_hours', 'online_booking_url', 'video_platform',
            'services_offered', 'payment_methods', 'additional_certifications', 'languages_spoken',
            'is_published', 'meta_keywords',
        ]
        extra_kwargs = {
            'slug': {'required': False},  # Auto-generated if not provided
        }

    def validate(self, data):
        service_type = data.get('service_type')

        # If in_store, require physical location
        if service_type in ['in_store', 'both']:
            if not (data.get('address_line_1') and data.get('city') and data.get('state')):
                raise serializers.ValidationError(
                    "Physical location (address, city, state) required for in-store services"
                )

        # If virtual, require contact method
        if service_type in ['virtual', 'both']:
            if not (data.get('online_booking_url') or data.get('phone') or data.get('email')):
                raise serializers.ValidationError(
                    "Contact method (booking URL, phone, or email) required for virtual services"
                )

        return data
```

#### Phase 1 Success Criteria ✅ COMPLETE

**Automated Checks**:
- [x] Migrations run without errors: `python manage.py migrate`
- [x] Django system check passes: `python manage.py check`
- [x] Models registered in admin: Visit `/admin/`, see ProfessionalPracticePage, PhysicalLocation, VirtualServiceOffering
- [x] API endpoints respond:
  - `GET /api/practice-pages/` → 200 (empty list initially)
  - `GET /api/practice-pages/check-eligibility/` → 200 with eligibility data
  - `POST /api/practice-pages/create/` → 201 with created page

**Manual Testing**:
- [x] Create ProfessionalApplication and approve it (status='approved', phb_license_number set)
- [x] Create PHBProfessionalRegistry entry (license_status='active', not expired)
- [x] Call `/api/practice-pages/check-eligibility/` → Returns `canCreate: true` with credentials
- [x] Create practice page via API → Succeeds with 201 and full page data
- [x] Update practice page via PATCH → Succeeds with updated data
- [x] Publish/unpublish page → Toggles is_published successfully
- [x] Get analytics → Returns view_count, nomination_count, status
- [x] Visit `/admin/` → Practice page visible in admin interface
- [x] Update NominatedPharmacy: practice_page FK working with constraint

**Documentation**:
- [x] Phase 1 summary document created: `PHASE_1_BACKEND_FOUNDATION_COMPLETE.md`

---

### Phase 2: Frontend Services & Core Components (1-2 weeks)

#### 2.1 Frontend Service Layer ✅ COMPLETE

**File**: `/Users/new/phbfinal/phbfrontend/src/services/practicePageService.ts`

```typescript
import { API_BASE_URL } from '../utils/config';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ServiceType = 'in_store' | 'virtual' | 'both';
export type VerificationStatus = 'pending' | 'verified' | 'flagged' | 'suspended';

export interface PracticePage {
  id: string;
  practice_name: string;
  slug: string;
  tagline: string;
  service_type: ServiceType;
  city: string;
  state: string;
  is_published: boolean;
  verification_status: VerificationStatus;
  owner_name: string;
  professional_type: string;
  license_number: string;
  is_open_now: boolean;
  view_count: number;
  created_at: string;
}

export interface PracticePageDetail extends PracticePage {
  about: string;
  address_line_1: string;
  address_line_2: string;
  postcode: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  phone: string;
  email: string;
  website: string;
  whatsapp_number: string;
  opening_hours: Record<string, { open: string; close: string; closed: boolean }>;
  virtual_consultation_hours: Record<string, any>;
  online_booking_url: string;
  video_platform: string;
  services_offered: Array<{ service: string; price: number; description: string }>;
  payment_methods: string[];
  additional_certifications: Array<{ certification: string; issuer: string; year: number }>;
  languages_spoken: string[];
  professional_credentials: {
    phb_license_number: string;
    professional_type: string;
    specialization: string;
    qualification_year: number;
    years_of_experience: number;
    primary_qualification: string;
    license_status: string;
    license_expiry_date: string;
  };
  nomination_count: number;
  updated_at: string;
}

export interface CreatePracticePageRequest {
  practice_name: string;
  slug?: string;
  tagline: string;
  about: string;
  service_type: ServiceType;
  // Physical location (required if service_type includes 'in_store')
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  // Contact
  phone?: string;
  email?: string;
  website?: string;
  whatsapp_number?: string;
  // Hours
  opening_hours?: Record<string, { open: string; close: string; closed: boolean }>;
  virtual_consultation_hours?: Record<string, any>;
  online_booking_url?: string;
  video_platform?: string;
  // Services & Pricing
  services_offered?: Array<{ service: string; price: number; description: string }>;
  payment_methods?: string[];
  // Additional Info
  additional_certifications?: Array<{ certification: string; issuer: string; year: number }>;
  languages_spoken?: string[];
  // Publication
  is_published?: boolean;
  meta_keywords?: string;
}

export interface EligibilityCheckResponse {
  canCreate: boolean;
  reason?: string;
  applicationStatus?: string;
  licenseNumber?: string;
  licenseExpiry?: string;
  professionalType?: string;
  specialization?: string;
}

export interface PageAnalytics {
  view_count: number;
  nomination_count: number;
  is_published: boolean;
  verification_status: VerificationStatus;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// API HELPER FUNCTIONS
// ============================================================================

const fixApiUrl = (endpoint: string): string => {
  if (API_BASE_URL.endsWith('/') && endpoint.startsWith('/')) {
    return `${API_BASE_URL}${endpoint.substring(1)}`;
  }
  return `${API_BASE_URL}${endpoint}`;
};

const getAuthConfig = () => ({
  credentials: 'include' as RequestCredentials,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================================================
// PUBLIC API (No authentication required)
// ============================================================================

export async function fetchPublicPracticePages(filters?: {
  service_type?: ServiceType;
  state?: string;
  city?: string;
  professional_type?: string;
  search?: string;
  page?: number;
}): Promise<{ results: PracticePage[]; count: number; next: string | null; previous: string | null }> {
  try {
    const queryParams = new URLSearchParams();
    if (filters) {
      if (filters.service_type) queryParams.append('service_type', filters.service_type);
      if (filters.state) queryParams.append('state', filters.state);
      if (filters.city) queryParams.append('city', filters.city);
      if (filters.professional_type) queryParams.append('professional_type', filters.professional_type);
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.page) queryParams.append('page', filters.page.toString());
    }

    const url = fixApiUrl(`/api/practice-pages/?${queryParams.toString()}`);
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching public practice pages:', error);
    throw error;
  }
}

export async function fetchPublicPracticePageDetail(slug: string): Promise<PracticePageDetail> {
  try {
    const url = fixApiUrl(`/api/practice-pages/${slug}/`);
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Practice page not found');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching practice page detail:', error);
    throw error;
  }
}

// ============================================================================
// PROFESSIONAL API (Requires authentication)
// ============================================================================

export async function checkEligibility(): Promise<EligibilityCheckResponse> {
  try {
    const url = fixApiUrl('/api/practice-pages/check-eligibility/');
    const response = await fetch(url, {
      method: 'GET',
      ...getAuthConfig(),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return {
          canCreate: false,
          reason: 'You must be logged in as a professional to create a practice page.',
        };
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking eligibility:', error);
    throw error;
  }
}

export async function createPracticePage(
  data: CreatePracticePageRequest
): Promise<{ success: boolean; page: PracticePageDetail; message: string }> {
  try {
    const url = fixApiUrl('/api/practice-pages/create/');
    const response = await fetch(url, {
      method: 'POST',
      ...getAuthConfig(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating practice page:', error);
    throw error;
  }
}

export async function getMyPracticePage(): Promise<{
  hasPage: boolean;
  page?: PracticePageDetail;
}> {
  try {
    const url = fixApiUrl('/api/practice-pages/my-page/');
    const response = await fetch(url, {
      method: 'GET',
      ...getAuthConfig(),
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        throw new Error('Authentication required');
      }
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching my practice page:', error);
    throw error;
  }
}

export async function updatePracticePage(
  data: Partial<CreatePracticePageRequest>
): Promise<{ success: boolean; page: PracticePageDetail; message: string }> {
  try {
    const url = fixApiUrl('/api/practice-pages/my-page/update/');
    const response = await fetch(url, {
      method: 'PATCH',
      ...getAuthConfig(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating practice page:', error);
    throw error;
  }
}

export async function togglePublished(
  is_published: boolean
): Promise<{ success: boolean; is_published: boolean; message: string }> {
  try {
    const url = fixApiUrl('/api/practice-pages/my-page/toggle-published/');
    const response = await fetch(url, {
      method: 'POST',
      ...getAuthConfig(),
      body: JSON.stringify({ is_published }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error toggling published status:', error);
    throw error;
  }
}

export async function getPageAnalytics(): Promise<PageAnalytics> {
  try {
    const url = fixApiUrl('/api/practice-pages/my-page/analytics/');
    const response = await fetch(url, {
      method: 'GET',
      ...getAuthConfig(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching page analytics:', error);
    throw error;
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function generateSlugFromName(practiceName: string): string {
  return practiceName
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

export function formatAddress(page: PracticePageDetail): string {
  const parts = [
    page.address_line_1,
    page.address_line_2,
    page.city,
    page.state,
    page.postcode,
    page.country,
  ].filter(Boolean);

  return parts.join(', ');
}

export function isPageOpenNow(opening_hours: Record<string, any>): boolean {
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

  const dayHours = opening_hours[dayName];
  if (!dayHours || dayHours.closed) {
    return false;
  }

  return currentTime >= dayHours.open && currentTime <= dayHours.close;
}

export function getTodaysHours(opening_hours: Record<string, any>): string {
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  const dayHours = opening_hours[dayName];
  if (!dayHours) {
    return 'Hours not available';
  }

  if (dayHours.closed) {
    return 'Closed today';
  }

  return `${dayHours.open} - ${dayHours.close}`;
}
```

**Total Lines**: ~550 lines

#### 2.2 Create Practice Page Wizard Component

**File**: `/Users/new/phbfinal/phbfrontend/src/components/professional/CreatePracticePageWizard.tsx`

This file would be approximately 1,200-1,500 lines with:
- Step 1: Basic Information
- Step 2: Contact & Location
- Step 3: Services & Pricing
- Step 4: About & Credentials
- Step 5: Review & Publish

Due to length constraints, I'll document the structure here. The wizard would use:
- Material-UI Stepper component
- Form validation with error states
- Map picker for geolocation (latitude/longitude)
- Rich text editor for about section
- Opening hours builder (weekly schedule)

#### 2.3 Practice Page Management Dashboard

**File**: `/Users/new/phbfinal/phbfrontend/src/pages/professional/MyPracticePageDashboard.tsx`

Similar structure to existing professional pages, showing:
- Page preview card
- Quick edit button
- Analytics cards (views, nominations)
- Publish/Unpublish toggle
- Link to public page

#### Phase 2 Success Criteria

**Phase 2.1 - Frontend Service Layer ✅ COMPLETE:**
- [x] TypeScript compilation passes: `npm run typecheck`
- [x] Service functions export correct types
- [x] All API endpoints have corresponding service functions
- [x] Summary document created: `PHASE_2_FRONTEND_SERVICES_COMPLETE.md`

**Phase 2.2 - Create Wizard (✅ COMPLETE):**
- [x] Wizard Step 1: Enter practice name, see slug auto-generated
- [x] Wizard Step 2: Select service_type='in_store', see location form appear
- [x] Wizard Step 2: Select service_type='virtual', see virtual service form appear
- [x] Wizard Step 3: Add services with pricing, see list update
- [x] Wizard Step 5: Review shows all entered data
- [x] Click "Publish" → API call succeeds, redirects to dashboard
- [x] 5-step wizard component completed (843 lines)
- [x] All Material-UI components integrated
- [x] Conditional field rendering based on service_type
- [x] Step-by-step validation implemented
- [x] Dynamic chip-based lists for services, payments, languages
- [x] Comprehensive review step with formatted preview
- [x] Error handling and loading states
- [x] Summary document created: `PHASE_2.2_CREATE_WIZARD_COMPLETE.md`

**Phase 2.3 - Management Dashboard (✅ COMPLETE):**
- [x] Dashboard shows page stats (view_count, nomination_count)
- [x] Toggle publish → Page is_published status updates
- [x] Click "Edit Page" → Opens wizard with pre-filled data
- [x] Verification status badges (pending/verified/rejected)
- [x] Public URL with copy-to-clipboard
- [x] Analytics cards with formatted metrics
- [x] No-page state with create CTA
- [x] Responsive grid layout
- [x] Error handling and loading states
- [x] Summary document created: `PHASE_2.3_DASHBOARD_COMPLETE.md`

---

### Phase 3: Public Pages & Integration (1 week)

#### 3.1 Public Practice Page View

**File**: `/Users/new/phbfinal/phbfrontend/src/pages/public/PracticePageView.tsx`

Public-facing page view accessible at `/pages/:slug`. Shows:
- Practice name, tagline
- Professional credentials (PHB license badge, specialization, years of experience)
- About section
- Services offered with pricing
- Opening hours (if in-store)
- Map with location pin (if in-store)
- Contact information (phone, email, website, WhatsApp)
- "Nominate This Pharmacy" button (if service_type includes 'in_store')
- "Book Virtual Consultation" button (if service_type includes 'virtual')

#### 3.2 Practice Pages Directory

**File**: `/Users/new/phbfinal/phbfrontend/src/pages/public/PracticePages Directory.tsx`

Directory landing page at `/pages`. Features:
- Search bar (text search in practice_name, about, services)
- Filters sidebar:
  - Service Type (in-store, virtual, both)
  - Professional Type (doctor, pharmacist, nurse)
  - State dropdown
  - City input
- Results grid with practice page cards
- Pagination
- "Featured" section (verified pages with high ratings)

#### 3.3 Pharmacy Nomination Integration

**Update**: `/Users/new/phbfinal/phbfrontend/src/pages/account/NominatedPharmacyPage.tsx`

Add support for nominating professional-created practice pages:
- Search results show both `Pharmacy` (admin-created) and `ProfessionalPracticePage` (professional-created)
- Badge to distinguish: "Official Pharmacy" vs. "Professional Page"
- Same nomination flow for both types

**Backend Update**: `/Users/new/Newphb/basebackend/api/views/pharmacy_views.py`

Update nomination endpoint to accept `practice_page_id` in addition to `pharmacy_id`:

```python
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def nominate_pharmacy(request):
    user = request.user
    pharmacy_id = request.data.get('pharmacy_id')
    practice_page_id = request.data.get('practice_page_id')

    # Ensure exactly one is provided
    if not (pharmacy_id or practice_page_id) or (pharmacy_id and practice_page_id):
        return Response(
            {'error': 'Provide either pharmacy_id or practice_page_id, not both'},
            status=400
        )

    # Clear existing nominations
    NominatedPharmacy.objects.filter(patient=user, is_current=True).update(is_current=False)

    # Create new nomination
    nomination = NominatedPharmacy.objects.create(
        patient=user,
        pharmacy_id=pharmacy_id if pharmacy_id else None,
        practice_page_id=practice_page_id if practice_page_id else None,
        nomination_type='user_selected',
        is_current=True,
    )

    # Increment nomination count
    if practice_page_id:
        practice_page = ProfessionalPracticePage.objects.get(id=practice_page_id)
        practice_page.increment_nomination_count()

    return Response({'success': True, 'nomination': {...}})
```

#### 3.4 Professional Dashboard Widget

**Update**: `/Users/new/phbfinal/phbfrontend/src/pages/professional/ProfessionalDashboardPage.tsx`

Add "My Practice Page" section to professional dashboard:

```tsx
// Check if user has practice page
const { data: myPage } = useQuery('myPracticePage', practicePageService.getMyPracticePage);

// Check eligibility to create
const { data: eligibility } = useQuery('createPageEligibility', practicePageService.checkEligibility);

// Render section
{!myPage?.hasPage && eligibility?.canCreate && (
  <Card>
    <CardContent>
      <Typography variant="h6">Create Your Practice Page</Typography>
      <Typography variant="body2">
        Promote your services to patients with a public practice page.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/professional/create-practice-page')}
      >
        Get Started
      </Button>
    </CardContent>
  </Card>
)}

{myPage?.hasPage && (
  <Card>
    <CardContent>
      <Typography variant="h6">My Practice Page</Typography>
      <Typography variant="body2">{myPage.page.practice_name}</Typography>
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="caption">Views</Typography>
            <Typography variant="h5">{myPage.page.view_count}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">Nominations</Typography>
            <Typography variant="h5">{myPage.page.nomination_count}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Box mt={2}>
        <Button variant="outlined" onClick={() => navigate('/professional/my-practice-page')}>
          Manage Page
        </Button>
        <Button variant="text" onClick={() => window.open(`/pages/${myPage.page.slug}`, '_blank')}>
          View Public Page
        </Button>
      </Box>
    </CardContent>
  </Card>
)}
```

#### Phase 3 Success Criteria - ✅ COMPLETE

**Automated Checks**:
- [x] ✅ TypeScript compilation passes
- [x] ✅ Public components created (PracticePageView, PracticePageDirectory)
- [x] ✅ Service layer integration complete
- [x] ✅ 0 TypeScript errors

**Components Delivered**:
- [x] ✅ PracticePageView (470 lines) - Single practice page display
- [x] ✅ PracticePageDirectory (469 lines) - Browse and search directory
- [x] ✅ Professional credentials display
- [x] ✅ Services, payment methods, languages display
- [x] ✅ Location and contact information
- [x] ✅ Opening hours display
- [x] ✅ Nominate pharmacy button
- [x] ✅ Share functionality
- [x] ✅ Search and filter system
- [x] ✅ Pagination
- [x] ✅ Responsive design
- [x] ✅ Summary document created: `PHASE_3_PUBLIC_PAGES_COMPLETE.md`

**Manual Testing** (Ready for user):
- [ ] Visit `/practice-pages` → See directory with search and filters
- [ ] Filter by service_type='in_store' → See only in-store practices
- [ ] Filter by state='Lagos' → See only Lagos practices
- [ ] Search "pharmacy" → See matching results
- [ ] Click practice card → Navigate to `/practice-pages/:slug`
- [ ] View practice page → See all details (about, services, hours, map)
- [ ] Click "Nominate This Pharmacy" → Nomination succeeds
- [ ] Visit `/account/nominated-pharmacy` → See practice page nomination
- [ ] Professional dashboard → See "My Practice Page" widget
- [ ] If no page: See "Create Your Practice Page" CTA
- [ ] If has page: See stats (views, nominations) and management buttons

---

### Phase 4: Polish & Launch (1 week)

#### 4.1 Email Notifications

**File**: `/Users/new/Newphb/basebackend/api/templates/email/practice_page_created.html`

Email sent to professional when practice page is created.

**File**: `/Users/new/Newphb/basebackend/api/templates/email/practice_page_verified.html`

Email sent to professional when admin verifies their page.

**File**: `/Users/new/Newphb/basebackend/api/templates/email/practice_page_nomination.html`

Email sent to professional when patient nominates their page.

**Email Functions**: `/Users/new/Newphb/basebackend/api/utils/email.py`

```python
def send_practice_page_created_email(practice_page):
    """Send confirmation email when practice page is created"""
    context = {
        'professional_name': practice_page.owner.get_full_name(),
        'practice_name': practice_page.practice_name,
        'page_url': f'https://phb.com/pages/{practice_page.slug}',
        'dashboard_url': 'https://phb.com/professional/my-practice-page',
    }
    # ... email sending logic

def send_practice_page_verified_email(practice_page):
    """Send notification when page is verified by admin"""
    # ...

def send_practice_page_nomination_email(practice_page, patient):
    """Send notification when patient nominates practice"""
    # ...
```

#### 4.2 Admin Tools

**File**: `/Users/new/phbfinal/phbfrontend/src/pages/admin/PracticePageAdminPanel.tsx`

Admin interface to:
- View all practice pages (with filters: verification_status, service_type, professional_type)
- Review pending pages
- Verify/flag/suspend pages
- View page details and professional credentials
- Send messages to page owners

#### 4.3 SEO Optimization

**Add to PracticePageView.tsx**:
```tsx
import { Helmet } from 'react-helmet';

<Helmet>
  <title>{page.practice_name} - PHB Healthcare Directory</title>
  <meta name="description" content={page.tagline} />
  <meta name="keywords" content={page.meta_keywords} />
  <meta property="og:title" content={page.practice_name} />
  <meta property="og:description" content={page.tagline} />
  <meta property="og:url" content={`https://phb.com/pages/${page.slug}`} />
</Helmet>
```

#### 4.4 Testing Checklist

**End-to-End Flow**:
1. [ ] Professional Registration → Approval → License Issue
2. [ ] Login as professional → Dashboard shows "Create Practice Page" CTA
3. [ ] Click CTA → Wizard opens, eligibility passed
4. [ ] Complete wizard → Practice page created
5. [ ] Dashboard shows page stats widget
6. [ ] Admin reviews page → Verifies page
7. [ ] Professional receives verification email
8. [ ] Public directory shows page
9. [ ] Patient finds page via search
10. [ ] Patient nominates page
11. [ ] Professional receives nomination email
12. [ ] Prescription routed to professional's pharmacy

**Error Handling**:
- [ ] Try to create page without approved application → Error message
- [ ] Try to create page with expired license → Error message
- [ ] Try to create second page → Error message
- [ ] Submit wizard with missing required fields → Validation errors
- [ ] Submit wizard with invalid service_type='in_store' but no address → Error

**Security**:
- [ ] Unauthenticated user can't access `/professional/create-practice-page`
- [ ] Unauthenticated user can't call `/api/practice-pages/create/`
- [ ] Professional A can't edit Professional B's page
- [ ] Admin verification requires admin role

#### 4.5 Documentation

**User Guides**:
- `/docs/professional-practice-pages/user-guide.md` - How to create and manage practice page
- `/docs/professional-practice-pages/faq.md` - Common questions

**Developer Documentation**:
- `/docs/professional-practice-pages/api-reference.md` - API endpoint documentation
- `/docs/professional-practice-pages/database-schema.md` - Model relationships and fields
- `/docs/professional-practice-pages/integration-guide.md` - How to integrate with other systems

#### Phase 4 Success Criteria

**Automated Checks**:
- [ ] All TypeScript compilation passes
- [ ] Django system check passes
- [ ] All migrations applied successfully
- [ ] Email templates render without errors

**Manual Testing**:
- [ ] Complete end-to-end flow (registration → page creation → nomination)
- [ ] Receive all email notifications
- [ ] Admin can verify/flag/suspend pages
- [ ] Public directory is searchable and filterable
- [ ] SEO meta tags present on public pages
- [ ] Mobile responsive design works
- [ ] Accessibility (keyboard navigation, screen reader support)

**Performance**:
- [ ] Public directory loads in < 2 seconds
- [ ] Practice page detail loads in < 1 second
- [ ] Wizard steps transition smoothly (no lag)
- [ ] Map rendering doesn't block UI

**Launch Readiness**:
- [ ] Production database migrated
- [ ] API endpoints deployed
- [ ] Frontend deployed
- [ ] SSL certificates configured
- [ ] CORS configured for frontend domain
- [ ] Email SMTP configured
- [ ] Monitoring and logging set up
- [ ] Error tracking (Sentry) configured
- [ ] User documentation published

---

## File Structure

```
Backend (/Users/new/Newphb/basebackend/)
├── api/
│   ├── models/
│   │   ├── professional/
│   │   │   ├── __init__.py
│   │   │   └── professional_practice_page.py (NEW - 650 lines)
│   │   ├── medical/
│   │   │   └── pharmacy.py (UPDATE - Add practice_page FK to NominatedPharmacy)
│   ├── serializers/
│   │   ├── __init__.py
│   │   └── practice_page_serializers.py (NEW - 150 lines)
│   ├── views/
│   │   ├── __init__.py
│   │   ├── practice_page_views.py (NEW - 550 lines)
│   │   └── pharmacy_views.py (UPDATE - Add practice_page nomination support)
│   ├── migrations/
│   │   ├── 0039_professional_practice_pages.py (NEW)
│   │   └── 0040_update_nominated_pharmacy.py (NEW)
│   ├── templates/
│   │   └── email/
│   │       ├── practice_page_created.html (NEW - 200 lines)
│   │       ├── practice_page_verified.html (NEW - 180 lines)
│   │       └── practice_page_nomination.html (NEW - 190 lines)
│   ├── utils/
│   │   └── email.py (UPDATE - Add 3 email functions)
│   └── urls.py (UPDATE - Add 9 practice page URLs)

Frontend (/Users/new/phbfinal/phbfrontend/)
├── src/
│   ├── services/
│   │   └── practicePageService.ts (NEW - 550 lines)
│   ├── components/
│   │   └── professional/
│   │       ├── CreatePracticePageWizard.tsx (NEW - 1,400 lines)
│   │       └── PracticePageCard.tsx (NEW - 150 lines)
│   ├── pages/
│   │   ├── public/
│   │   │   ├── PracticePageView.tsx (NEW - 600 lines)
│   │   │   └── PracticePageDirectoryView.tsx (NEW - 500 lines)
│   │   ├── professional/
│   │   │   ├── MyPracticePageDashboard.tsx (NEW - 400 lines)
│   │   │   └── ProfessionalDashboardPage.tsx (UPDATE - Add page widget)
│   │   ├── account/
│   │   │   └── NominatedPharmacyPage.tsx (UPDATE - Add practice page support)
│   │   └── admin/
│   │       └── PracticePageAdminPanel.tsx (NEW - 450 lines)
│   ├── hooks/
│   │   └── usePracticePage.ts (NEW - 80 lines)
│   └── App.tsx (UPDATE - Add 4 routes)

Documentation (/Users/new/phbfinal/phbfrontend/docs/)
└── professional-practice-pages/
    ├── user-guide.md (NEW)
    ├── api-reference.md (NEW)
    ├── database-schema.md (NEW)
    ├── integration-guide.md (NEW)
    └── faq.md (NEW)
```

**Total New Code**:
- Backend: ~2,200 lines (models, views, serializers, migrations, emails)
- Frontend: ~4,130 lines (services, components, pages)
- Documentation: ~1,500 lines
- **Grand Total**: ~7,830 lines of production code

---

## Timeline Estimates

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| Phase 1: Backend Foundation | 1-2 weeks | Models, migrations, API endpoints, serializers |
| Phase 2: Frontend Services & Components | 1-2 weeks | Service layer, wizard, management dashboard |
| Phase 3: Public Pages & Integration | 1 week | Public directory, page view, pharmacy nomination integration |
| Phase 4: Polish & Launch | 1 week | Email notifications, admin tools, testing, documentation |
| **Total** | **5-6 weeks** | Complete professional practice pages system |

---

## Security Considerations

### Access Control
- **Create Page**: Requires approved ProfessionalApplication + active PHB license + no existing page
- **Edit Page**: Only page owner can edit
- **Publish/Unpublish**: Only page owner can toggle
- **Admin Actions**: Require admin role

### Data Validation
- **Service Type**: Enforce required fields based on service_type (location for in_store, contact for virtual)
- **Slug Uniqueness**: Prevent duplicate slugs
- **One Page Per Professional**: Database constraint + API check

### Privacy
- **Email/Phone**: Optional fields, not required to publish
- **Professional Credentials**: Auto-populated from verified PHBProfessionalRegistry
- **Verification Status**: Only 'verified' pages appear in public directory

### Rate Limiting
- **Page Creation**: Limit to prevent spam (already limited to 1 per user)
- **View Count Increment**: Consider IP-based throttling
- **API Endpoints**: Standard rate limiting (100 requests/minute per user)

---

## Testing Strategy

### Unit Tests (Backend)
```python
# api/tests/test_practice_page_models.py
def test_create_practice_page_with_valid_data()
def test_create_practice_page_without_address_for_in_store_service_fails()
def test_slug_auto_generation()
def test_slug_uniqueness_enforcement()
def test_is_open_now_method()
def test_increment_view_count()
def test_increment_nomination_count()
```

### Integration Tests (Backend)
```python
# api/tests/test_practice_page_api.py
def test_public_directory_endpoint_returns_only_published_pages()
def test_create_page_requires_authentication()
def test_create_page_checks_eligibility()
def test_create_page_with_expired_license_fails()
def test_update_page_by_non_owner_fails()
def test_admin_verification_updates_status()
```

### Frontend Tests (Jest + React Testing Library)
```typescript
// src/services/__tests__/practicePageService.test.ts
test('fetchPublicPracticePages calls correct endpoint with filters')
test('createPracticePage sends correct request body')
test('checkEligibility returns canCreate: false when not eligible')

// src/components/professional/__tests__/CreatePracticePageWizard.test.tsx
test('Step 1: Auto-generates slug from practice name')
test('Step 2: Shows location form when service_type includes in_store')
test('Step 5: Displays all wizard data in review step')
test('Submit wizard: Calls createPracticePage API')
```

### End-to-End Tests (Playwright/Cypress)
```typescript
test('Professional creates practice page and patient nominates it', async () => {
  // 1. Login as approved professional
  // 2. Navigate to dashboard
  // 3. Click "Create Practice Page"
  // 4. Complete wizard
  // 5. Publish page
  // 6. Logout
  // 7. Login as patient
  // 8. Search for practice
  // 9. Nominate practice
  // 10. Verify nomination
});
```

---

## Risk Mitigation

### Risk 1: Performance Issues with Geolocation Queries
**Mitigation**:
- Add database indexes on `latitude` and `longitude` columns
- Use PostGIS extension for efficient geospatial queries (if available)
- Implement caching for "nearby pharmacies" searches (Redis)

### Risk 2: Spam/Fake Practice Pages
**Mitigation**:
- Require admin verification before public listing (`verification_status='verified'`)
- Link pages to PHBProfessionalRegistry (verified professionals only)
- Implement reporting system for users to flag suspicious pages

### Risk 3: Duplicate Pharmacy Listings (Admin vs Professional)
**Mitigation**:
- Clear UI labeling: "Official PHB Pharmacy" vs. "Professional Practice Page"
- Allow professionals to claim admin-created pharmacies (future feature)
- Educate admins to check for professional pages before creating admin pharmacies

### Risk 4: Integration Complexity with Existing Systems
**Mitigation**:
- Phase 3 thoroughly tests pharmacy nomination integration
- Update all prescription routing logic to handle both Pharmacy and ProfessionalPracticePage
- Comprehensive integration tests

### Risk 5: Low Adoption by Professionals
**Mitigation**:
- In-app notifications to approved professionals about new feature
- Email campaign to registered professionals
- Dashboard CTA with clear value proposition
- Success stories and testimonials from early adopters

---

## Success Metrics

### Technical Metrics
- [ ] Zero production errors for 7 days post-launch
- [ ] API response times < 500ms (p95)
- [ ] Public directory page load time < 2 seconds
- [ ] Zero database deadlocks or constraint violations

### User Metrics
- [ ] 20% of approved professionals create practice pages within 30 days
- [ ] 50% of practice pages published within 7 days of creation
- [ ] 100 patient pharmacy nominations of professional pages within first month
- [ ] 80% practice page retention rate (not deleted) after 90 days

### Quality Metrics
- [ ] 90% admin verification rate (verified vs. flagged/suspended)
- [ ] < 5% rejection rate for practice page creations
- [ ] Zero security incidents (unauthorized access, data breaches)
- [ ] 95% user satisfaction (post-feature survey)

---

## Dependencies

### Backend Dependencies (Already Installed)
- Django 5.1
- Django REST Framework
- PostgreSQL (database)
- Pillow (image handling, if needed for future photo uploads)

### Frontend Dependencies (Already Installed)
- React 18
- TypeScript
- Material-UI
- React Router v6
- React Query (for data fetching and caching)
- React Helmet (for SEO)

### New Dependencies (If Needed)
- **Backend**: django-storages + boto3 (if S3 for practice page photos)
- **Frontend**: react-leaflet (for map display and geolocation picker)

---

## Post-Launch Enhancements (Future Phases)

### Phase 5: Patient Reviews & Ratings (4 weeks)
- Patients can leave reviews for practice pages
- Star rating system (1-5 stars)
- Verified purchase reviews (only patients who nominated the page)
- Review moderation system for admins

### Phase 6: Appointment Booking Integration (3 weeks)
- Virtual consultation booking directly from practice page
- Calendar integration for professionals
- Payment processing for consultation fees
- Email/SMS reminders for appointments

### Phase 7: Analytics Dashboard (2 weeks)
- Page views over time (daily, weekly, monthly charts)
- Demographics of viewers (age, location, gender)
- Conversion metrics (views → nominations, views → bookings)
- Comparative analytics (how does your page compare to similar practices?)

### Phase 8: Multi-Location Support (2 weeks)
- Professionals can add multiple physical locations (PhysicalLocation model already prepared)
- Each location has its own opening hours and contact info
- Map shows all locations
- Patients can nominate specific location

### Phase 9: Mobile App (8 weeks)
- Native iOS/Android app
- Push notifications for new nominations, reviews, bookings
- Offline mode for professionals to view page details
- QR code for easy page sharing

---

## Appendix

### API Endpoint Reference

#### Public Endpoints (No authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/practice-pages/` | List all published and verified practice pages (with filters) |
| GET | `/api/practice-pages/{slug}/` | Get details of a single practice page by slug |

#### Professional Endpoints (Requires authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/practice-pages/check-eligibility/` | Check if user can create a practice page |
| POST | `/api/practice-pages/create/` | Create a new practice page |
| GET | `/api/practice-pages/my-page/` | Get authenticated user's practice page |
| PATCH | `/api/practice-pages/my-page/update/` | Update authenticated user's practice page |
| POST | `/api/practice-pages/my-page/toggle-published/` | Toggle is_published status |
| GET | `/api/practice-pages/my-page/analytics/` | Get page analytics (views, nominations) |

#### Admin Endpoints (Requires admin role)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/practice-pages/admin/pages/` | List all practice pages (admin view) |
| POST | `/api/practice-pages/admin/pages/{page_id}/verify/` | Verify, flag, or suspend a practice page |

### Database Schema Diagram

```
┌─────────────────────────┐
│ CustomUser              │
│ - id (PK)               │
│ - email                 │
│ - full_name             │
└─────────────────────────┘
           │
           │ OneToOne
           ▼
┌─────────────────────────────────────────────────────────┐
│ ProfessionalApplication                                 │
│ - id (PK, UUID)                                         │
│ - user (FK → CustomUser)                                │
│ - application_status (draft|submitted|approved|...)     │
│ - phb_license_number (e.g., PHB-PHARM-A3F2B9C1-E4D7)    │
│ - professional_type (doctor|pharmacist|nurse|...)       │
└─────────────────────────────────────────────────────────┘
           │
           │ OneToOne (when approved)
           ▼
┌─────────────────────────────────────────────────────────┐
│ PHBProfessionalRegistry                                 │
│ - id (PK, UUID)                                         │
│ - user (FK → CustomUser, OneToOne)                      │
│ - application (FK → ProfessionalApplication, OneToOne)  │
│ - phb_license_number (unique)                           │
│ - license_status (active|suspended|revoked|...)         │
│ - license_expiry_date                                   │
│ - professional_type                                     │
│ - specialization                                        │
└─────────────────────────────────────────────────────────┘
           │
           │ FK (linked_registry_entry)
           ▼
┌────────────────────────────────────────────────────────────────┐
│ ProfessionalPracticePage                                       │
│ - id (PK, UUID)                                                │
│ - owner (FK → CustomUser, OneToOne)                            │
│ - linked_registry_entry (FK → PHBProfessionalRegistry)         │
│ - practice_name                                                │
│ - slug (unique)                                                │
│ - service_type (in_store|virtual|both)                         │
│ - address_line_1, city, state (physical location)              │
│ - latitude, longitude (geolocation)                            │
│ - phone, email, website                                        │
│ - opening_hours (JSONField)                                    │
│ - services_offered (JSONField)                                 │
│ - is_published                                                 │
│ - verification_status (pending|verified|flagged|suspended)     │
│ - view_count, nomination_count                                 │
└────────────────────────────────────────────────────────────────┘
           │
           │ nominations (reverse FK)
           ▼
┌─────────────────────────────────────────────────────────┐
│ NominatedPharmacy                                       │
│ - id (PK)                                               │
│ - patient (FK → CustomUser)                             │
│ - pharmacy (FK → Pharmacy, nullable) ──OR──             │
│ - practice_page (FK → ProfessionalPracticePage, null... │
│ - is_current                                            │
│ [Constraint: Exactly one of pharmacy or practice_page]  │
└─────────────────────────────────────────────────────────┘
```

**Key Relationships**:
1. **User → ProfessionalApplication**: One user can have multiple applications (but only one approved)
2. **ProfessionalApplication → PHBProfessionalRegistry**: OneToOne when application is approved
3. **PHBProfessionalRegistry → ProfessionalPracticePage**: FK relationship (one registry entry can be linked to one practice page)
4. **User → ProfessionalPracticePage**: OneToOne (one user can own one practice page)
5. **ProfessionalPracticePage → NominatedPharmacy**: Reverse FK (many nominations per page)
6. **NominatedPharmacy**: Either `pharmacy` OR `practice_page` is set, never both (enforced by CHECK constraint)

---

**Document Version**: 1.0
**Last Updated**: November 7, 2025
**Status**: 🔵 Ready for Implementation
**Total Estimated Lines of Code**: ~7,830 lines
**Total Estimated Timeline**: 5-6 weeks (4 phases)

---

## Next Steps

1. **Review & Approval**: Stakeholders review this plan and provide feedback
2. **Resource Allocation**: Assign developers to Phase 1 (backend foundation)
3. **Environment Setup**: Create feature branch `feature/professional-practice-pages`
4. **Phase 1 Kickoff**: Begin backend model development and migrations
5. **Weekly Standups**: Track progress against timeline, address blockers
6. **Phase Completion Reviews**: Demo completed phases before moving to next
7. **Launch Preparation**: Final testing, documentation, deployment planning

**Ready to begin Phase 1? 🚀**
