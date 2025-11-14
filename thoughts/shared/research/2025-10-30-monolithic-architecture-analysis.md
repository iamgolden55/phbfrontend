---
date: 2025-10-30T21:05:42+0000
researcher: Claude
git_commit: b601424d2b1ea6dcd679c9195b603ecefc718ba3
branch: main
repository: phbfrontend
topic: "Monolithic Architecture Analysis and Microservices Migration Strategy for PHB"
tags: [research, architecture, monolithic, microservices, aws, decoupling, single-point-of-failure]
status: complete
last_updated: 2025-10-30
last_updated_by: Claude
related_to: 2025-10-30-aws-services-integration-analysis.md
---

# Research: Monolithic Architecture Analysis and Microservices Migration Strategy for PHB

**Date**: 2025-10-30T21:05:42+0000
**Researcher**: Claude
**Git Commit**: b601424d2b1ea6dcd679c9195b603ecefc718ba3
**Branch**: main
**Repository**: phbfrontend
**Related**: [AWS Services Integration Analysis](2025-10-30-aws-services-integration-analysis.md)

## Research Question

"Based on my reading I found out that PHB runs on a monolithic system meaning components all have to come together for the system to work. If one thing goes wrong in the backend the frontend might crash and so on. Run your research on this topic as well."

## Executive Summary

The PHB Hospital System exhibits **tight monolithic coupling** between frontend and backend with **critical single points of failure**. Analysis of 100+ components reveals that a backend failure will cascade through the application, causing widespread crashes. The system has **no circuit breakers**, **inconsistent error handling** across 889 console.log statements in 95 files, and **fallback mechanisms** that could expose mock data in production.

**Key Findings:**
- **36 components** crash without AuthProvider
- **13 service files** with zero retry logic or circuit breakers
- **3 separate authentication systems** all depending on same Django backend
- **Cookie-based sessions** requiring backend availability for every page load
- **889 console.log statements** instead of centralized logging
- **No error boundaries** on most routes (only 2 pages protected)

---

## Table of Contents

1. [Current Monolithic Architecture](#1-current-monolithic-architecture)
2. [Single Points of Failure](#2-single-points-of-failure)
3. [Cascading Failure Scenarios](#3-cascading-failure-scenarios)
4. [Tight Coupling Analysis](#4-tight-coupling-analysis)
5. [Error Handling Gaps](#5-error-handling-gaps)
6. [Microservices Architecture Design](#6-microservices-architecture-design)
7. [AWS Services for Decoupling](#7-aws-services-for-decoupling)
8. [Migration Strategy](#8-migration-strategy)
9. [Implementation Roadmap](#9-implementation-roadmap)

---

## 1. Current Monolithic Architecture

### 1.1 System Topology

```
┌─────────────────────────────────────────────────────────────────┐
│ FRONTEND (React SPA - Netlify)                                  │
│  - 100+ components                                              │
│  - 13 service files                                             │
│  - 3 authentication contexts                                    │
│  - Zero circuit breakers                                        │
│  - 889 console.log statements                                   │
└────────────────┬────────────────────────────────────────────────┘
                 │
                 │ HTTP + Cookies (credentials: 'include')
                 │ All requests require backend availability
                 │
      ┌──────────▼──────────┐           ┌──────────────────────┐
      │ Django Backend      │           │ Node.js Backend      │
      │ Port 8000           │           │ Port 5000            │
      │                     │           │                      │
      │ ENDPOINTS:          │           │ ENDPOINTS:           │
      │ - /api/profile/     │           │ - /api (general)     │
      │ - /api/appointments/│           │ - /auth              │
      │ - /api/prescriptions│           │ - /health            │
      │ - /api/payments/    │           │ - /organization      │
      │ - /api/medical-rec/ │           │                      │
      └─────────┬───────────┘           └──────────┬───────────┘
                │                                   │
                │                                   │
      ┌─────────▼───────────────────────────────────▼───────────┐
      │ Database (PostgreSQL/MySQL - assumed)                   │
      │ - Patient records                                       │
      │ - Prescriptions                                         │
      │ - Appointments                                          │
      │ - User accounts                                         │
      └─────────────────────────────────────────────────────────┘
```

**Critical Observation**: Frontend makes **direct synchronous HTTP calls** to backend services. If either backend is down, **entire application becomes unusable**.

### 1.2 Authentication Flow (Critical Dependency)

```
User Loads App
     │
     ▼
AuthContext.checkAuthStatus() ──────► POST /api/profile/ (Django)
     │                                        │
     │                                 ┌──────▼─────────┐
     │                                 │ Success: user  │
     │                                 │ Failure: null  │
     │                                 └──────┬─────────┘
     │                                        │
     ▼                                        │
If user === null ─────────────────────────┬──┘
     │                                    │
     │                                    │
     ▼                                    ▼
Navigate to /login                  Check hospital status
     │                                    │
     │                                    ▼
     ▼                         GET /api/user/has-primary-hospital/
All account routes                        │
blocked                          ┌────────▼────────┐
                                 │ Success: status │
                                 │ Failure: error  │
                                 └─────────────────┘
```

**SPOF**: If `/api/profile/` fails:
- AuthContext sets `user = null` ([authContext.tsx:461](src/features/auth/authContext.tsx#L461))
- `isAuthenticated` becomes `false` ([authContext.tsx:1256](src/features/auth/authContext.tsx#L1256))
- ProtectedRoute redirects ALL users to `/login` ([App.tsx:351](src/App.tsx#L351))
- **Result**: Application unusable for authenticated users

### 1.3 Service Layer Topology

```
Frontend Components
    ├─ BookAppointment.tsx (66 console statements)
    ├─ Prescriptions.tsx
    ├─ MedicalRecords.tsx
    ├─ PaymentModal.tsx
    └─ 100+ others
        │
        ▼
Service Layer (13 files)
    ├─ appointmentService.ts ─────► Django :8000/api/appointments/
    ├─ paymentService.ts ─────────► Django :8000/api/payments/
    ├─ prescriptionsService.ts ───► Django :8000/api/prescriptions/
    ├─ medicalRecordsService.ts ──► Django :8000/api/patient/medical-record/
    ├─ pharmacyService.ts ────────► Django :8000/api/pharmacies/
    ├─ guidelinesService.ts ──────► Django :8000/api/clinical-guidelines/
    ├─ staffService.ts ───────────► Django :8000/api/staff/
    ├─ womensHealthApi.ts ────────► Django :8000/api/womens-health/
    └─ appointmentsService.ts ────► Django :8000/api/appointments/
        │
        │ All use: credentials: 'include' (cookies required)
        │ None have: retry logic, circuit breakers, offline queues
        │
        ▼
Django Backend (SINGLE POINT OF FAILURE)
```

**Coupling Analysis**:
- **100% of services** depend on Django backend
- **Zero redundancy**: No backup servers or fallback endpoints
- **No retry logic**: First failure = user-visible error
- **No offline mode**: LocalStorage used only for temporary data

---

## 2. Single Points of Failure

### 2.1 Backend API Availability

**SPOF #1: Django Backend (Port 8000)**

**Impact Scope**: **100% of application functionality**

**Affected Services** (all fail simultaneously):
1. `appointmentService.ts` - Appointment booking ([appointmentService.ts:56](src/services/appointmentService.ts#L56))
2. `paymentService.ts` - Payment processing ([paymentService.ts:98](src/services/paymentService.ts#L98))
3. `prescriptionsService.ts` - Prescription management ([prescriptionsService.ts:122](src/features/health/prescriptionsService.ts#L122))
4. `medicalRecordsService.ts` - Medical records access ([medicalRecordsService.ts:151](src/features/health/medicalRecordsService.ts#L151))
5. `pharmacyService.ts` - Pharmacy services ([pharmacyService.ts:159](src/services/pharmacyService.ts#L159))
6. `guidelinesService.ts` - Clinical guidelines ([guidelinesService.ts:113](src/services/guidelinesService.ts#L113))
7. `staffService.ts` - Staff management ([staffService.ts:65](src/services/staffService.ts#L65))
8. `womensHealthApi.ts` - Women's health ([womensHealthApi.ts:586](src/services/womensHealthApi.ts#L586))
9. `authContext.tsx` - User authentication ([authContext.tsx:388](src/features/auth/authContext.tsx#L388))
10. `organizationAuthContext.tsx` - Organization auth ([organizationAuthContext.tsx:195](src/features/organization/organizationAuthContext.tsx#L195))

**User Experience During Outage**:
```
1. User visits application
2. AuthContext calls /api/profile/ → FAILS
3. setUser(null) executed
4. ProtectedRoute redirects to /login
5. User enters credentials
6. Login form calls /api/login/ → FAILS
7. Error: "Network error. Please try again."
8. User stuck in login loop
9. Application completely unusable
```

**Recovery Time**: Manual intervention required (restart Django server)

---

**SPOF #2: Node.js Backend (Port 5000)**

**Impact Scope**: Limited (API_URL endpoints)

**Current Usage**: Minimal - most code uses Django :8000
**Files Referencing**: [config.ts:7](src/utils/config.ts#L7) defines `API_URL` but **not widely used** in codebase

**Evidence**: Grep analysis shows hardcoded `http://127.0.0.1:8000` in 90%+ of service files

---

### 2.2 Database Availability

**SPOF #3: PostgreSQL/MySQL Database**

**Impact**: Backend APIs fail → Frontend fails
**Cascade**: Database down → Django can't authenticate → Auth tokens invalid → All users logged out

**Affected Flows**:
- User authentication (profile lookups)
- Appointment booking (read/write)
- Prescription management (read/write)
- Payment verification (write)
- Medical records access (read)

**No Caching Strategy**: Every request hits database
**No Read Replicas**: Single database instance
**No Fallback**: No secondary data sources

---

### 2.3 Authentication Cookie Dependency

**SPOF #4: httpOnly Cookies**

**Vulnerability**: Cookies set by backend, frontend has **zero control**

**Failure Scenarios**:

**Scenario 1: Cookie Expiry During Active Session**
```typescript
// authContext.tsx:282-355
async refreshAccessToken() {
  const response = await fetch('/api/token/refresh/', {
    credentials: 'include',  // Sends refresh_token cookie
  });

  if (!response.ok) {
    // If refresh fails, user is logged out
    setError("Your session has expired. Please log in again.");
    setUser(null);
    // USER LOSES ALL UNSAVED WORK
  }
}
```

**Scenario 2: Backend Restart Clears Sessions**
```
Django restarts (deployment, crash, update)
    ↓
Session store cleared (if in-memory, not Redis)
    ↓
User's cookies become invalid
    ↓
/api/profile/ returns 401 Unauthorized
    ↓
Frontend sets user = null
    ↓
User redirected to login (losing current page state)
```

**Scenario 3: CORS Issues**
```typescript
// organizationAuthContext.tsx:195
const response = await fetch('http://127.0.0.1:8000/api/organizations/profile/', {
  credentials: 'include',
  mode: 'cors',
});

// If CORS headers misconfigured, cookies not sent
// Response: 401 Unauthorized
// Result: Organization admins cannot access dashboard
```

---

### 2.4 Context Provider Hierarchy

**SPOF #5: AuthProvider**

**Impact**: **36 components crash** without AuthProvider

**Affected Components** (all call `useAuth()`):
- [LoginPage.tsx](src/pages/LoginPage.tsx)
- [RegisterPage.tsx](src/pages/RegisterPage.tsx)
- [AccountPage.tsx](src/pages/AccountPage.tsx)
- [PersonalDetailsPage.tsx](src/pages/account/PersonalDetailsPage.tsx)
- [PasswordPage.tsx](src/pages/account/PasswordPage.tsx)
- [HealthRecordsPage.tsx](src/pages/account/HealthRecordsPage.tsx)
- [BookAppointment.tsx](src/features/health/BookAppointment.tsx) (66 console statements)
- [Prescriptions.tsx](src/features/health/Prescriptions.tsx)
- [MedicalRecords.tsx](src/features/health/MedicalRecords.tsx)
- [Header.tsx](src/components/Header.tsx)
- [ViewToggle.tsx](src/components/ViewToggle.tsx)
- ...and 25 more

**Failure Mechanism**:
```typescript
// authContext.tsx:1391-1395
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

**Result**: If `<AuthProvider>` removed from [App.tsx:363](src/App.tsx#L363), React error boundary catches error, **entire app crashes**.

---

**SPOF #6: ProfessionalAuthProvider Depends on AuthProvider**

**Dependency Chain**:
```typescript
// professionalAuthContext.tsx:52
const { user, isLoading: authLoading, isAuthenticated, isDoctor } = useAuth();

// If AuthProvider fails → ProfessionalAuthProvider fails
// 14 professional components crash
```

**Affected Components**: All professional pages, [ProfessionalLayout.tsx](src/layouts/ProfessionalLayout.tsx), professional dashboards

---

### 2.5 Payment Processing

**SPOF #7: Paystack Integration**

**External Dependency**: `https://js.paystack.co/v1/inline.js`

**Failure Scenario**:
```typescript
// PaymentModal.tsx:54-67
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://js.paystack.co/v1/inline.js';
  script.async = true;
  script.onload = () => setIsPaystackLoaded(true);
  // NO script.onerror HANDLER!
  document.body.appendChild(script);
}, []);

// If Paystack CDN down:
// - isPaystackLoaded stays false
// - Pay button disabled
// - No error message shown
// - User cannot book appointments
```

**Impact**: Appointment booking completely blocked (no alternative payment method)

**Recovery**: None - waits indefinitely for Paystack CDN

---

### 2.6 Medical Records OTP Flow

**SPOF #8: Dual Authentication Requirement**

**Complexity**: Medical records require **both** JWT cookie **and** OTP access token

```typescript
// medicalRecordsService.ts:384-610
async getMedicalRecords() {
  const medAccessToken = localStorage.getItem('med_access_token');

  // Requires BOTH tokens
  const headers = {
    'Authorization': `Bearer ${this.jwtToken}`,  // From cookie
    'X-Med-Access-Token': medAccessToken,        // From localStorage
  };

  // If either missing → 401 Unauthorized
}
```

**Failure Points**:
1. JWT cookie invalid → OTP flow fails at start
2. OTP endpoint down → Cannot get `med_access_token`
3. localStorage cleared → Loses `med_access_token`
4. Token expires (30 min) → User must re-request OTP

**No Fallback**: If OTP system fails, medical records **completely inaccessible**

---

## 3. Cascading Failure Scenarios

### 3.1 Authentication Cascade

**Trigger**: Django backend returns 500 error on `/api/profile/`

**Cascade Timeline**:
```
T+0s: User loads application
T+1s: AuthContext.checkAuthStatus() called
T+2s: fetch('/api/profile/') returns 500 Internal Server Error
T+2.5s: catch block executes
T+3s: setUser(null) called → isAuthenticated = false
T+3.5s: App re-renders with auth state change
T+4s: ProtectedRoute detects !isAuthenticated
T+4.5s: Navigate to '/login' executed
T+5s: User sees login page (confused - was already logged in)
T+10s: User enters credentials again
T+12s: fetch('/api/login/') → 500 error (same backend issue)
T+13s: setError("Login failed") displayed
T+15s: User tries again → same error
T+20s: User gives up, leaves application
```

**Impact**: **All authenticated users** logged out simultaneously

**Scope**: **100% of user sessions** disrupted

**Evidence**:
- [authContext.tsx:368-475](src/features/auth/authContext.tsx#L368-L475) - `checkAuthStatus()` implementation
- [authContext.tsx:461](src/features/auth/authContext.tsx#L461) - `setUser(null)` on error
- [App.tsx:347-359](src/App.tsx#L347-L359) - ProtectedRoute redirect logic

---

### 3.2 Payment Failure Cascade

**Trigger**: Backend crashes during payment verification

**Timeline**:
```
T+0s: User completes payment on Paystack
T+5s: Paystack redirects back to PHB with reference
T+6s: PaymentModal.verifyPayment() called
T+8s: fetch('/api/payments/verify/{ref}') → TIMEOUT (backend down)
T+38s: Request times out after 30 seconds
T+38.5s: catch block executes
T+39s: onPaymentError("Payment verification failed") called
T+40s: User sees error: "Payment verification failed. Please contact support if you were charged."
```

**User State**: **Paid but no appointment created**

**Data Inconsistency**:
- Paystack: Payment successful
- PHB Database: No appointment record
- User: Confused, frustrated, paid but no service

**Recovery**: Manual intervention required (customer support must verify payment, manually create appointment)

**Evidence**:
- [PaymentModal.tsx:145-190](src/components/modals/PaymentModal.tsx#L145-L190) - `verifyPayment()` implementation
- [paymentService.ts:340-407](src/services/paymentService.ts#L340-L407) - `verifyPayment()` service
- **Zero retry logic** in payment verification

---

### 3.3 Medical Records Access Cascade

**Trigger**: OTP verification endpoint returns 500 error

**Timeline**:
```
T+0s: User requests medical records access
T+2s: medicalRecordsService.requestMedicalRecordsOtp() called
T+4s: fetch('/api/patient/medical-record/request-otp/') → SUCCESS
T+5s: OTP sent to user's email
T+60s: User enters OTP code
T+62s: medicalRecordsService.verifyMedicalRecordsOtp() called
T+64s: fetch('/api/patient/medical-record/verify-otp/') → 500 ERROR
T+65s: catch block executes
```

**Two Possible Outcomes**:

**Production Mode** (if no development fallback):
```
T+66s: Error thrown to component
T+67s: Component displays: "Failed to verify OTP"
T+70s: User tries again → same error
T+80s: User requests new OTP → same backend error
T+90s: User cannot access medical records
```

**Development Mode** (current codebase):
```
T+66s: catch block returns MOCK success
T+67s: localStorage.setItem('med_access_token', 'mock-token-...')
T+68s: User proceeds to medical records
T+70s: getMedicalRecords() called with mock token
T+72s: Backend rejects mock token → 401 Unauthorized
T+73s: Error: "Unauthorized access to medical records"
```

**Critical Issue**: Development fallback in production code ([medicalRecordsService.ts:223-228](src/features/health/medicalRecordsService.ts#L223-L228))

---

### 3.4 Appointment Booking Cascade

**Trigger**: Multiple API failures during booking flow

**Timeline**:
```
T+0s: User fills appointment booking form
T+5s: fetchDepartments() called → SUCCESS (departments loaded)
T+10s: fetchDoctors() called → SUCCESS (doctors loaded)
T+15s: fetchAvailability() called → SUCCESS (time slots shown)
T+20s: User selects time slot, clicks "Book"
T+22s: checkAppointmentConflict() called
T+24s: fetch('/api/appointments/check-conflict/') → 500 ERROR
T+25s: Error caught, conflict check skipped (no blocking)
T+26s: initializePayment() called
T+28s: fetch('/api/payments/initialize/') → 500 ERROR
T+29s: catch block executes
T+30s: return { status: 'error', message: 'Payment initialization failed' }
T+31s: BookAppointment shows error
T+32s: User clicks "Try Again"
T+34s: Same API calls → same errors
T+40s: User gives up
```

**Data State**:
- Form data: Lost (no localStorage backup)
- Selected slot: Gone (may be booked by another user)
- User: Frustrated (has to start over)

**Evidence**:
- [BookAppointment.tsx:653-830](src/features/health/BookAppointment.tsx#L653-L830) - Booking flow
- [appointmentService.ts:75-109](src/services/appointmentService.ts#L75-L109) - Conflict check
- [paymentService.ts:220-337](src/services/paymentService.ts#L220-L337) - Payment initialization
- **Zero retry logic** in any step

---

### 3.5 Organization Dashboard Cascade

**Trigger**: Organization backend endpoint fails

**Timeline**:
```
T+0s: Hospital admin loads /organization/dashboard
T+1s: OrganizationRouteGuard checks auth
T+2s: fetch('/api/organizations/profile/') → 500 ERROR
T+3s: catch block executes
T+4s: setIsAuthenticated(false)
T+5s: Navigate to '/organization/login'
T+6s: Admin enters credentials
T+8s: fetch('/api/hospitals/admin/login/') → 500 ERROR
T+9s: Error: "Login failed"
```

**Fallback Mechanism** (lines 237-273 in organizationAuthContext.tsx):
```typescript
// If API fails, check sessionStorage for pending state
const savedEmail = sessionStorage.getItem('org_auth_email');
const needsVerification = sessionStorage.getItem('org_auth_needs_verification');

if (savedEmail && needsVerification === 'true') {
  // Restore 2FA flow state
  setCurrentEmail(savedEmail);
  setNeedsVerification(true);
}
```

**Problem**: Fallback only works for 2FA state, **not for full authentication**

**Impact**: All organization admins unable to access dashboard

---

## 4. Tight Coupling Analysis

### 4.1 Frontend-Backend URL Coupling

**Issue**: **6 different URL construction patterns** across codebase

**Pattern 1: Hardcoded in Service** (4 files)
```typescript
// appointmentService.ts:1
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Problem: Each service defines own constant
// Risk: Inconsistent defaults across services
```

**Pattern 2: Using createApiUrl** (3 files)
```typescript
// guidelinesService.ts:3
import { createApiUrl } from '../utils/config';
const apiUrl = createApiUrl('api/clinical-guidelines/');

// Better: Centralized utility
// Issue: Not universally adopted
```

**Pattern 3: Custom fixApiUrl** (2 files)
```typescript
// pharmacyService.ts:4-9
const fixApiUrl = (endpoint: string): string => {
  if (API_BASE_URL.endsWith('/') && endpoint.startsWith('/')) {
    return `${API_BASE_URL}${endpoint.substring(1)}`;
  }
  return `${API_BASE_URL}${endpoint}`;
};

// Problem: Duplicated logic
// Risk: Different implementations might diverge
```

**Pattern 4: Direct fetch with template literal** (4 files)
```typescript
// staffService.ts:65
fetch(`${API_BASE_URL}/api/staff/`)

// Problem: Manual concatenation
// Risk: Double slashes, missing slashes
```

**Coupling Severity**: **HIGH**
- No single source of truth for API URLs
- Hard to switch backends (must update multiple files)
- Cannot easily add load balancing or failover

---

### 4.2 Authentication State Coupling

**Issue**: Components directly couple to specific auth context implementations

**Example: Header Component**
```typescript
// Header.tsx:40-41
const { user, isAuthenticated, logout, isDoctor } = useAuth();
const { professionalUser } = useProfessionalAuth();

// Tightly coupled to:
// 1. useAuth() hook structure
// 2. useProfessionalAuth() hook structure
// 3. Field names (user, isAuthenticated, logout, isDoctor)
// 4. Context provider hierarchy
```

**Ripple Effects**:
- Change AuthContext interface → must update **36 components**
- Change ProfessionalAuthContext → must update **14 components**
- Add new auth method → must create new provider + update all consumers

**Better Approach**: Interface/Adapter pattern
```typescript
// authAdapter.ts (hypothetical)
interface IAuthService {
  getCurrentUser(): User | null;
  isAuthenticated(): boolean;
  login(credentials): Promise<void>;
  logout(): Promise<void>;
}

// Components depend on interface, not implementation
// Easy to swap auth providers
```

---

### 4.3 Route-to-Backend Coupling

**Issue**: Routes assume specific backend endpoints exist

**Example: HospitalStatusGuard**
```typescript
// HospitalStatusGuard.tsx:14-54
// This guard BLOCKS navigation if backend unavailable

const { user, isAuthenticated, isLoading, hasPrimaryHospital, primaryHospital } = useAuth();

if (isLoading) {
  return <LoadingSpinner />;  // Blocks while waiting for backend
}

if (!isAuthenticated) {
  return <Navigate to="/login" />;  // Backend must respond for auth check
}

if (!hasPrimaryHospital) {
  return <Navigate to="/account" />;  // Backend must return hospital status
}

// Only renders children if ALL backend calls succeed
```

**Impact**: Routes like `/account/appointments/book` **completely inaccessible** if:
- `/api/profile/` endpoint down
- `/api/user/has-primary-hospital/` endpoint down
- Backend returns incorrect data structure

**Coupling Severity**: **CRITICAL**
- No offline mode for appointment booking
- Cannot show cached appointments if backend down
- User cannot even view previously booked appointments

---

### 4.4 Payment Flow Coupling

**Issue**: Payment verification tightly coupled to backend transaction creation

**Current Flow**:
```
1. User pays on Paystack (external)
2. Paystack redirects to PHB
3. Frontend calls /api/payments/verify/{ref}
4. Backend:
   - Verifies payment with Paystack API
   - Creates appointment in database
   - Returns appointment data
5. Frontend shows confirmation
```

**Problem**: **Backend creates appointment** during verification

**Consequence**: If backend crashes **after** payment but **before** database write:
- User charged ✅
- Appointment created ❌
- No automatic retry ❌
- Manual recovery required ✅

**Evidence**: [paymentService.ts:340-407](src/services/paymentService.ts#L340-L407) - Single verification attempt, no retry

---

### 4.5 localStorage Coupling to Backend State

**Issue**: Critical state stored in localStorage with no backend sync

**Example: Pregnancy Tracking**
```typescript
// KickCounter.tsx (from previous research)
localStorage.setItem('kickSessions', JSON.stringify(sessions));

// CycleTrackerPage.tsx
localStorage.setItem('cycles', JSON.stringify(cycles));

// ContractionTimer.tsx
localStorage.setItem('contractions', JSON.stringify(contractions));
```

**Problems**:
1. **Data Loss**: User clears browser data → loses months of health tracking
2. **No Cross-Device Sync**: Data not available on other devices
3. **No Backup**: Backend has no copy of this critical health data
4. **Inconsistency**: Backend might have different state for user

**Coupling**: Frontend **assumes** backend doesn't need this data, but health tracking is core feature

---

## 5. Error Handling Gaps

### 5.1 No Centralized Error Handling

**Finding**: **889 console.log statements** across **95 files**

**Top Offenders**:
- [medicalRecordsService.ts](src/features/health/medicalRecordsService.ts): **77 console statements**
- [authContext.tsx](src/features/auth/authContext.tsx): **78 console statements**
- [BookAppointment.tsx](src/features/health/BookAppointment.tsx): **66 console statements**
- [paymentService.ts](src/services/paymentService.ts): **21 console statements**

**Issues**:
1. **No structured logging** - Cannot query or filter errors
2. **Production logs in console** - Not captured for monitoring
3. **Inconsistent error messages** - Each component has own format
4. **No error correlation** - Cannot trace request flow across services

**Current Pattern**:
```typescript
// medicalRecordsService.ts:218-228
try {
  const response = await fetch(apiUrl, {...});
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return await response.json();
} catch (error) {
  console.error('Network error accessing medical records:', error);
  // Developer fallback (SHOULD NOT BE IN PRODUCTION!)
  return { status: 'success', message: 'Development mode: ...' };
}
```

---

### 5.2 Error Boundary Coverage

**Finding**: Only **2 pages** have ErrorBoundary protection

**Protected Pages**:
1. [OrganizationDashboardPage.tsx:5](src/pages/organization/OrganizationDashboardPage.tsx#L5)
2. [ClinicalGuidelinesManagementPage.tsx](src/pages/organization/ClinicalGuidelinesManagementPage.tsx)

**ErrorBoundary Implementation**: [ErrorBoundary.tsx:1-67](src/components/ErrorBoundary.tsx#L1-L67)
```typescript
componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  console.error('Dashboard Error Boundary caught an error:', error, errorInfo);
}

render() {
  if (this.state.hasError) {
    return (
      <div>
        <h2>Something went wrong</h2>
        <button onClick={() => window.location.reload()}>
          Refresh Page
        </button>
      </div>
    );
  }
  return this.props.children;
}
```

**Limitations**:
1. **Only catches render errors** - Not async API failures
2. **Generic recovery** - Just reloads page (loses state)
3. **No error reporting** - Just console.error
4. **Not used widely** - 98% of routes unprotected

**Impact**: Most components crash without graceful degradation

---

### 5.3 Missing Retry Logic

**Finding**: **Zero services** implement retry logic

**Services Without Retry**:
1. appointmentService.ts
2. paymentService.ts
3. prescriptionsService.ts
4. medicalRecordsService.ts
5. pharmacyService.ts
6. guidelinesService.ts
7. staffService.ts
8. womensHealthApi.ts
9. appointmentsService.ts (professional)
10. medicalRecordService.ts (professional)

**Example: Appointment Service**
```typescript
// appointmentService.ts:55-72
async getAppointments(filters?) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/hospitals/appointments/...`);

    if (!response.ok) {
      throw new Error('Failed to fetch appointments');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;  // NO RETRY, immediate failure
  }
}
```

**Impact**: Transient network issues cause permanent failures

---

### 5.4 Fallback Mechanisms

**Finding**: Inconsistent fallback strategies

**Pattern 1: Mock Data Fallback** (Development mode)
```typescript
// medicalRecordsService.ts:223-228
catch (fetchError) {
  console.log('Network error, returning mock success for development');
  return {
    status: 'success',
    message: 'Development mode: Access code sent to your email. Enter code "123456" to continue.'
  };
}
```

**Risk**: Could run in production if environment detection fails

---

**Pattern 2: Alternative Endpoint Fallback**
```typescript
// prescriptionsService.ts:191-220
try {
  response = await fetch(`/api/prescriptions/${id}/order/`, {...});
} catch (error) {
  // Try alternative endpoint
  response = await fetch(`/api/prescriptions/${id}/update-status/`, {
    body: JSON.stringify({ status: 'pending_collection' }),
  });
}
```

**Issue**: Assumes both endpoints exist, no docs on which is canonical

---

**Pattern 3: Return Error Object** (No throw)
```typescript
// paymentService.ts:330-336
catch (error) {
  return {
    status: 'error',
    message: error.message || 'Payment initialization failed'
  };
}
```

**Inconsistency**: Some services throw, others return error objects

---

**Pattern 4: Silent Failure**
```typescript
// paymentService.ts:209-215
catch (error) {
  return {
    payments_enabled: true,  // Default to enabled!
    message: 'Unable to check payment status',
  };
}
```

**Risk**: Shows payment form even if payment system is down

---

## 6. Microservices Architecture Design

### 6.1 Proposed Service Decomposition

```
┌─────────────────────────────────────────────────────────────────┐
│ CLIENT (React SPA)                                              │
│  - Service Workers for offline support                         │
│  - IndexedDB for local caching                                 │
│  - EventBus for service communication                          │
└─────────────┬───────────────────────────────────────────────────┘
              │
              │ API Gateway (AWS API Gateway / Kong)
              │ - Rate limiting
              │ - Request routing
              │ - Circuit breaking
              │
┌─────────────▼───────────────────────────────────────────────────┐
│ API GATEWAY LAYER                                               │
│  - Authentication middleware                                    │
│  - Request/response transformation                             │
│  - Service discovery                                           │
└─────────────┬───────────────────────────────────────────────────┘
              │
      ┌───────┴───────┬───────────┬───────────┬───────────┐
      │               │           │           │           │
┌─────▼─────┐  ┌──────▼────┐ ┌───▼────┐ ┌────▼─────┐ ┌──▼──────┐
│ Auth      │  │Appointment│ │Payment │ │Medical   │ │Pharmacy │
│ Service   │  │ Service   │ │Service │ │Records   │ │Service  │
│           │  │           │ │        │ │Service   │ │         │
│ - Login   │  │ - Book    │ │ -Init  │ │ -Request │ │ -Search │
│ - Logout  │  │ - View    │ │ -Verify│ │ -Verify  │ │ -Nominate│
│ - Refresh │  │ - Cancel  │ │ -Status│ │ -Access  │ │ -Locate │
│ - Profile │  │ - Confirm │ │        │ │          │ │         │
│ - Hospital│  │ - Conflict│ │        │ │          │ │         │
│           │  │  Check    │ │        │ │          │ │         │
└─────┬─────┘  └──────┬────┘ └───┬────┘ └────┬─────┘ └──┬──────┘
      │               │          │           │          │
      │               └──────────┴───────────┴──────────┘
      │                          │
      │                    ┌─────▼──────┐
      │                    │ Event Bus  │
      │                    │ (SNS/SQS)  │
      │                    └─────┬──────┘
      │                          │
      ▼                          ▼
┌─────────────────────────────────────────────────────────────────┐
│ DATA LAYER                                                      │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ RDS          │  │ DynamoDB     │  │ S3           │         │
│  │ (PostgreSQL) │  │              │  │              │         │
│  │              │  │              │  │              │         │
│  │ - Users      │  │ - Sessions   │  │ - Medical    │         │
│  │ - Appts      │  │ - Search     │  │   Imaging    │         │
│  │ - Hospitals  │  │   History    │  │ - Guidelines │         │
│  │ - Staff      │  │ - Pregnancy  │  │ - Prescr.    │         │
│  │              │  │   Tracking   │  │   Docs       │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Service Boundaries

#### Auth Service
**Responsibilities**:
- User authentication (login, logout, register)
- Token management (issue, refresh, revoke)
- Profile management
- Hospital registration and verification
- Role-based access control (patient, doctor, admin)

**API Endpoints**:
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/register`
- `POST /auth/token/refresh`
- `GET /auth/profile`
- `POST /auth/hospital/register`
- `GET /auth/hospital/status`

**Database**: Users, Roles, Sessions (RDS)
**Cache**: Active sessions (ElastiCache Redis)

**Decoupling Benefit**: Auth failures don't crash appointment booking

---

#### Appointment Service
**Responsibilities**:
- Appointment scheduling
- Availability management
- Conflict checking
- Cancellation and rescheduling
- Department/doctor assignment

**API Endpoints**:
- `GET /appointments`
- `POST /appointments`
- `DELETE /appointments/{id}`
- `PUT /appointments/{id}/reschedule`
- `POST /appointments/check-conflict`
- `GET /appointments/{id}/availability`

**Database**: Appointments, Departments, Doctors (RDS)
**Queue**: Confirmation emails (SQS)

**Decoupling Benefit**: Appointment viewing works even if payment service down

---

#### Payment Service
**Responsibilities**:
- Payment initialization (Paystack integration)
- Payment verification
- Transaction history
- Refund processing
- Payment status checks

**API Endpoints**:
- `POST /payments/initialize`
- `POST /payments/verify/{reference}`
- `GET /payments/history`
- `POST /payments/refund`
- `GET /payments/status`

**Database**: Transactions (RDS)
**External**: Paystack API
**Queue**: Payment events (SNS → Appointment Service)

**Decoupling Benefit**: Payment failures queued for retry, appointments created eventually

---

#### Medical Records Service
**Responsibilities**:
- OTP request and verification
- Medical record access authorization
- Record retrieval
- Access auditing

**API Endpoints**:
- `POST /medical-records/request-otp`
- `POST /medical-records/verify-otp`
- `GET /medical-records`
- `GET /medical-records/summary`
- `GET /medical-records/audit-log`

**Database**: Medical Records, Access Logs (RDS)
**Storage**: DICOM files (S3)
**Cache**: OTP codes (ElastiCache, 5-min TTL)

**Decoupling Benefit**: Medical records access independent of appointment system

---

#### Prescription Service
**Responsibilities**:
- Prescription management
- Order processing
- Pharmacy nomination
- Status tracking

**API Endpoints**:
- `GET /prescriptions`
- `POST /prescriptions/{id}/order`
- `PUT /prescriptions/{id}/status`
- `POST /prescriptions/{id}/complete`

**Database**: Prescriptions (RDS)
**Storage**: Prescription PDFs (S3)

**Decoupling Benefit**: Can view prescriptions even if pharmacy service down

---

#### Pharmacy Service
**Responsibilities**:
- Pharmacy search and location
- Nomination management
- Pharmacy details
- Electronic prescription capabilities

**API Endpoints**:
- `GET /pharmacies`
- `GET /pharmacies/nearby`
- `POST /pharmacies/nominate`
- `GET /pharmacies/nominated`
- `DELETE /pharmacies/nominate`

**Database**: Pharmacies, Nominations (RDS)

**Decoupling Benefit**: Can manage nominations even if prescription service down

---

#### Women's Health Service (NEW)
**Responsibilities**:
- Cycle tracking
- Pregnancy monitoring
- Fertility tracking
- Health goals

**API Endpoints**:
- `POST /womens-health/verification`
- `GET /womens-health/profile`
- `POST /womens-health/cycles`
- `POST /womens-health/pregnancy`
- `POST /womens-health/logs`

**Database**: Cycles, Pregnancy Data (DynamoDB - time-series optimized)

**Decoupling Benefit**: Health tracking works offline, syncs when connected

---

#### Organization Service
**Responsibilities**:
- Hospital admin authentication
- Dashboard data
- User registration approvals
- Ward management
- Staff roster

**API Endpoints**:
- `POST /organization/login`
- `POST /organization/verify-2fa`
- `GET /organization/dashboard`
- `GET /organization/admissions`
- `PUT /organization/registrations/{id}/approve`

**Database**: Organizations, Admissions, Staff (RDS)

**Decoupling Benefit**: Organization dashboards independent of patient services

---

### 6.3 Inter-Service Communication

#### Synchronous (REST API)
Use for: Real-time data requirements

**Examples**:
- Auth Service verifies token → called by all services
- Payment Service checks status → called by Appointment Service

**Implementation**: AWS API Gateway + ALB

---

#### Asynchronous (Event-Driven)
Use for: Eventual consistency, decoupled operations

**Examples**:
```
Payment Verified Event
    ↓
    ├─ Appointment Service: Create appointment
    ├─ Email Service: Send confirmation
    └─ Audit Service: Log transaction

Appointment Created Event
    ↓
    ├─ SMS Service: Send reminder (24 hours before)
    └─ Calendar Service: Add to patient calendar

Medical Record Accessed Event
    ↓
    └─ Audit Service: Log access for compliance
```

**Implementation**: AWS SNS (pub/sub) + SQS (queuing)

---

## 7. AWS Services for Decoupling

### 7.1 API Gateway Pattern

**AWS API Gateway**

**Purpose**: Single entry point for all frontend requests

**Features**:
- **Request routing** - Route to appropriate microservice
- **Rate limiting** - Prevent DDoS, protect backend
- **CORS handling** - Centralized CORS configuration
- **Request transformation** - Normalize requests
- **Response caching** - Reduce backend load

**Configuration**:
```json
{
  "routes": [
    {
      "path": "/api/auth/*",
      "target": "http://auth-service.internal:8001",
      "methods": ["GET", "POST", "PUT", "DELETE"],
      "cache": {
        "enabled": true,
        "ttl": 300,
        "paths": ["/api/auth/profile"]
      }
    },
    {
      "path": "/api/appointments/*",
      "target": "http://appointment-service.internal:8002",
      "rateLimit": {
        "requests": 100,
        "window": 60
      }
    },
    {
      "path": "/api/payments/*",
      "target": "http://payment-service.internal:8003",
      "timeout": 30000
    }
  ]
}
```

**Benefits for PHB**:
1. Frontend calls single URL (api.phb.com)
2. Backend services can move, scale independently
3. Easy to add new services without frontend changes
4. Monitoring and logging centralized

---

### 7.2 Circuit Breaker Pattern

**AWS App Mesh / Custom Implementation**

**Purpose**: Prevent cascading failures

**Implementation Example**:
```typescript
// Frontend: circuitBreaker.ts
class CircuitBreaker {
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failures = 0;
  private threshold = 5;
  private timeout = 60000; // 1 minute

  async execute<T>(apiCall: () => Promise<T>, fallback?: () => T): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        console.log('Circuit breaker OPEN, using fallback');
        return fallback ? fallback() : Promise.reject('Service unavailable');
      }
    }

    try {
      const result = await apiCall();

      if (this.state === 'HALF_OPEN') {
        this.state = 'CLOSED';
        this.failures = 0;
      }

      return result;
    } catch (error) {
      this.failures++;
      this.lastFailureTime = Date.now();

      if (this.failures >= this.threshold) {
        this.state = 'OPEN';
        console.log('Circuit breaker opened after', this.failures, 'failures');
      }

      if (fallback) {
        return fallback();
      }

      throw error;
    }
  }
}

// Usage in appointmentService.ts
const appointmentCircuit = new CircuitBreaker();

async getAppointments(filters?) {
  return appointmentCircuit.execute(
    () => fetch(`${API_BASE_URL}/api/appointments/`).then(r => r.json()),
    () => {
      // Fallback: Return cached appointments from IndexedDB
      return localDB.appointments.toArray();
    }
  );
}
```

**Benefits for PHB**:
1. Auth service failure doesn't spam backend with retries
2. User gets cached data instead of error
3. Backend has time to recover
4. Prevents resource exhaustion

---

### 7.3 Message Queues for Async Operations

**AWS SQS (Simple Queue Service)**

**Use Cases**:
1. **Payment Verification Queue**
```
User pays on Paystack
    ↓
Frontend sends message to SQS: PaymentVerificationQueue
    ↓
Backend worker picks up message
    ↓
Verifies payment with Paystack (with retries)
    ↓
Creates appointment in database
    ↓
Sends confirmation email
```

**Benefits**:
- Payment verification **retried automatically** on failure
- User doesn't wait for backend processing
- Appointments created **eventually** even if backend temporarily down

---

2. **Appointment Reminder Queue**
```
Appointment created
    ↓
Message sent to SQS: AppointmentReminderQueue
    ↓
Scheduled for delivery 24 hours before appointment
    ↓
Lambda function triggered
    ↓
Sends SMS/email reminder
```

**Benefits**:
- Reminder system **independent** of appointment service
- Failure to send reminder doesn't affect appointment booking
- Can retry failed reminders

---

3. **Medical Records Access Audit Queue**
```
User accesses medical records
    ↓
Message sent to SQS: AuditLogQueue
    ↓
Audit service logs access
    ↓
Compliance reports generated
```

**Benefits**:
- Audit logging **never blocks** medical record access
- Can process audit logs in batch for efficiency
- Compliance reporting doesn't impact user experience

---

### 7.4 Caching with ElastiCache

**AWS ElastiCache (Redis)**

**Use Cases**:

**1. Session Cache**
```typescript
// Current: Sessions in database (slow)
// New: Sessions in Redis (fast)

// Auth Service
await redis.setex(
  `session:${userId}`,
  1800,  // 30 minutes
  JSON.stringify({ user, permissions, hospital })
);

// All services can quickly check auth
const session = await redis.get(`session:${userId}`);
```

**Benefits**:
- **10x faster** auth checks
- Database not hit on every request
- Sessions survive backend restarts

---

**2. OTP Code Cache**
```typescript
// Medical Records Service
await redis.setex(
  `otp:${userId}`,
  300,  // 5 minutes
  otpCode
);

// Verify OTP
const storedOtp = await redis.get(`otp:${userId}`);
if (storedOtp === userEnteredOtp) {
  // Grant access
}
```

**Benefits**:
- OTP codes **auto-expire** after 5 minutes
- No database writes for temporary codes
- Prevents brute-force attacks (rate limiting in Redis)

---

**3. Appointment Availability Cache**
```typescript
// Appointment Service
const cacheKey = `availability:${doctorId}:${date}`;

// Check cache first
let availability = await redis.get(cacheKey);

if (!availability) {
  // Cache miss - query database
  availability = await db.query(`
    SELECT time_slot FROM appointments
    WHERE doctor_id = ? AND date = ?
  `);

  // Cache for 5 minutes
  await redis.setex(cacheKey, 300, JSON.stringify(availability));
}

return JSON.parse(availability);
```

**Benefits**:
- Repeated availability checks don't hit database
- Faster booking experience
- Reduces database load by 80%+

---

### 7.5 Event-Driven Architecture with SNS

**AWS SNS (Simple Notification Service)**

**Pub/Sub Pattern**:

**Example: Payment Verified Event**
```
Payment Service verifies payment
    ↓
Publishes PaymentVerifiedEvent to SNS topic
    ↓
    ├─ Appointment Service (subscriber): Creates appointment
    ├─ Email Service (subscriber): Sends confirmation email
    ├─ SMS Service (subscriber): Sends SMS confirmation
    ├─ Analytics Service (subscriber): Logs conversion
    └─ Audit Service (subscriber): Logs transaction
```

**Implementation**:
```typescript
// Payment Service
await sns.publish({
  TopicArn: 'arn:aws:sns:us-east-1:123456789:PaymentVerified',
  Message: JSON.stringify({
    paymentReference: 'pay_123',
    userId: 'user_456',
    amount: 5000,
    appointmentData: {...}
  })
});

// Each subscriber processes independently
// If Email Service fails, Appointment still created
```

**Benefits**:
- **Loose coupling** - Services don't know about each other
- **Scalability** - Add new subscribers without changing publisher
- **Resilience** - One subscriber failure doesn't affect others
- **Auditability** - All events logged centrally

---

### 7.6 Service Mesh with AWS App Mesh

**AWS App Mesh**

**Purpose**: Manage service-to-service communication

**Features**:
- **Service discovery** - Services find each other automatically
- **Load balancing** - Distribute requests across instances
- **Retry logic** - Automatic retries with exponential backoff
- **Circuit breaking** - Prevent cascading failures
- **Observability** - Tracing, metrics, logs

**Configuration Example**:
```yaml
apiVersion: appmesh.k8s.aws/v1beta2
kind: VirtualService
metadata:
  name: appointment-service
spec:
  provider:
    virtualRouter:
      virtualRouterRef:
        name: appointment-router
---
apiVersion: appmesh.k8s.aws/v1beta2
kind: VirtualRouter
metadata:
  name: appointment-router
spec:
  routes:
    - name: appointment-route
      httpRoute:
        match:
          prefix: /
        action:
          weightedTargets:
            - virtualNodeRef:
                name: appointment-v1
              weight: 90
            - virtualNodeRef:
                name: appointment-v2
              weight: 10
        retryPolicy:
          maxRetries: 3
          perRetryTimeout:
            value: 2
            unit: s
          httpRetryEvents:
            - server-error
            - gateway-error
```

**Benefits for PHB**:
1. **Gradual rollouts** - Deploy new version to 10% of traffic
2. **Automatic retries** - Transient failures handled automatically
3. **Load balancing** - Traffic distributed evenly
4. **Observability** - See which services are slow/failing

---

## 8. Migration Strategy

### 8.1 Strangler Fig Pattern

**Concept**: Gradually replace monolith with microservices

**Phases**:

**Phase 1: Extract Auth Service** (Month 1-2)
```
Current:
Frontend → Django :8000/api/profile/

New:
Frontend → API Gateway → Auth Service :8001/api/profile/
                       ↘ Django :8000 (fallback)
```

**Steps**:
1. Deploy Auth Service (standalone microservice)
2. Configure API Gateway to route `/api/auth/*` to Auth Service
3. Keep Django auth as fallback (circuit breaker)
4. Monitor Auth Service for 2 weeks
5. Switch 10% of traffic to Auth Service
6. Gradually increase to 100%
7. Remove Django auth endpoints

**Rollback Plan**: API Gateway routes back to Django on error

---

**Phase 2: Extract Payment Service** (Month 3-4)
```
Current:
Frontend → Django :8000/api/payments/*

New:
Frontend → API Gateway → Payment Service :8003/api/payments/*
                       ↘ Django :8000 (fallback)
```

**Critical**: Payment Service publishes events to SNS
- SNS → Appointment Service (creates appointment)
- SNS → Email Service (sends confirmation)

**Benefit**: Payment verification retried via SQS if appointment creation fails

---

**Phase 3: Extract Appointment Service** (Month 5-6)
```
Frontend → API Gateway → Appointment Service :8002
                       ↘ Auth Service :8001 (verify token)
                       ↘ Payment Service :8003 (check payment status)
```

**Data Migration**: Copy appointments from Django DB to Appointment Service DB

**Dual-Write Period**: Write to both databases for 1 month, verify consistency

---

**Phase 4: Extract Medical Records Service** (Month 7-8)
- Includes OTP verification
- DICOM file migration to S3
- Audit logging to separate service

---

**Phase 5: Extract Remaining Services** (Month 9-12)
- Prescription Service
- Pharmacy Service
- Women's Health Service
- Organization Service

---

### 8.2 Database Migration Strategy

**Current**: Single PostgreSQL database

**Target**: Database per service

**Migration Steps**:

**1. Identify Service Boundaries**
```
Auth Service DB:
- users
- roles
- sessions
- hospitals

Appointment Service DB:
- appointments
- departments
- doctors
- schedules

Payment Service DB:
- transactions
- payment_methods

Medical Records Service DB:
- medical_records
- access_logs
- otp_codes
```

**2. Extract Schema**
```sql
-- Create new database for Auth Service
CREATE DATABASE phb_auth_service;

-- Copy users table
INSERT INTO phb_auth_service.users
SELECT * FROM phb_monolith.users;

-- Create foreign key references for other services
-- Appointments will store user_id but query Auth Service for user data
```

**3. Implement Data Access Layer**
```typescript
// Appointment Service needs user data
// Instead of JOIN across databases:

// Old (monolith):
SELECT a.*, u.name, u.email
FROM appointments a
JOIN users u ON a.user_id = u.id;

// New (microservices):
const appointments = await db.appointments.find({});
const userIds = appointments.map(a => a.user_id);
const users = await authServiceClient.getUsersByIds(userIds);

// Stitch data in application layer
const appointmentsWithUsers = appointments.map(a => ({
  ...a,
  user: users.find(u => u.id === a.user_id)
}));
```

**4. Handle Transactions Across Services**

**Saga Pattern** for distributed transactions:

**Example**: Create appointment with payment
```
1. Payment Service: Reserve payment
   - Status: PENDING
   - If fails: Abort

2. Appointment Service: Create appointment
   - Status: PENDING_PAYMENT
   - If fails: Compensate (cancel payment reservation)

3. Payment Service: Capture payment
   - Status: COMPLETED
   - If fails: Compensate (delete appointment)

4. Appointment Service: Confirm appointment
   - Status: CONFIRMED
```

**Saga Coordinator** (AWS Step Functions):
```json
{
  "StartAt": "ReservePayment",
  "States": {
    "ReservePayment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:ReservePayment",
      "Next": "CreateAppointment",
      "Catch": [{
        "ErrorEquals": ["States.ALL"],
        "Next": "PaymentFailed"
      }]
    },
    "CreateAppointment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:CreateAppointment",
      "Next": "CapturePayment",
      "Catch": [{
        "ErrorEquals": ["States.ALL"],
        "Next": "CancelPayment"
      }]
    },
    "CapturePayment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:CapturePayment",
      "Next": "ConfirmAppointment",
      "Catch": [{
        "ErrorEquals": ["States.ALL"],
        "Next": "DeleteAppointment"
      }]
    },
    "ConfirmAppointment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:ConfirmAppointment",
      "End": true
    },
    "CancelPayment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:CancelPayment",
      "Next": "PaymentFailed"
    },
    "DeleteAppointment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:DeleteAppointment",
      "Next": "PaymentFailed"
    },
    "PaymentFailed": {
      "Type": "Fail"
    }
  }
}
```

---

### 8.3 Frontend Refactoring

**Current**: Direct service calls
```typescript
// appointmentService.ts
fetch(`${API_BASE_URL}/api/appointments/`)
```

**Target**: API Gateway + Retry + Circuit Breaker
```typescript
// apiClient.ts (new centralized client)
import { CircuitBreaker } from './circuitBreaker';
import { RetryPolicy } from './retryPolicy';

class ApiClient {
  private baseUrl = 'https://api.phb.com';  // API Gateway
  private circuitBreaker = new CircuitBreaker();
  private retryPolicy = new RetryPolicy({ maxRetries: 3 });

  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.circuitBreaker.execute(
      () => this.retryPolicy.execute(
        () => fetch(`${this.baseUrl}${endpoint}`, {
          ...options,
          credentials: 'include',
        }).then(r => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
      ),
      () => this.getFallback<T>(endpoint)  // Circuit breaker fallback
    );
  }

  private async getFallback<T>(endpoint: string): Promise<T> {
    // Try to get from IndexedDB cache
    const cached = await localDB.get(endpoint);
    if (cached) {
      return cached as T;
    }
    throw new Error('Service unavailable');
  }
}

// Usage in appointmentService.ts
const apiClient = new ApiClient();

async getAppointments(filters?) {
  return apiClient.get<AppointmentsResponse>('/api/appointments/', {
    query: filters
  });
}
```

**Benefits**:
1. **Single URL** - Easy to change backend
2. **Retry logic** - Transient failures handled
3. **Circuit breaker** - Prevents cascading failures
4. **Fallback** - Returns cached data on outage
5. **Testable** - Can mock ApiClient

---

### 8.4 Offline Support with Service Workers

**Implementation**:
```typescript
// service-worker.ts
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Cache hit - return cached response
        if (cachedResponse) {
          return cachedResponse;
        }

        // Cache miss - fetch from network
        return fetch(event.request)
          .then((networkResponse) => {
            // Cache successful responses
            if (networkResponse.ok) {
              const clonedResponse = networkResponse.clone();
              caches.open('phb-v1').then((cache) => {
                cache.put(event.request, clonedResponse);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Network failed - return offline page
            return caches.match('/offline.html');
          });
      })
  );
});
```

**Cache Strategy**:
- **Static assets** (JS, CSS, images): Cache-first
- **API responses** (appointments, prescriptions): Network-first with cache fallback
- **User profile**: Stale-while-revalidate

**Offline Capabilities**:
- View past appointments (cached)
- View prescriptions (cached)
- Queue appointment booking (sync when online)
- Pregnancy tracking (localStorage + IndexedDB)

---

## 9. Implementation Roadmap

### Phase 1: Foundation (Month 1-2)

**Week 1-2: Infrastructure Setup**
- [ ] Set up AWS account and VPC
- [ ] Configure API Gateway
- [ ] Set up ElastiCache (Redis) cluster
- [ ] Configure CloudWatch logging
- [ ] Set up SNS topics and SQS queues

**Week 3-4: Extract Auth Service**
- [ ] Create Auth microservice (Node.js/Django)
- [ ] Migrate users table to Auth Service DB
- [ ] Implement circuit breaker in frontend
- [ ] Deploy Auth Service to ECS/EKS
- [ ] Route 10% traffic to Auth Service

**Week 5-6: Monitoring & Validation**
- [ ] Set up CloudWatch dashboards
- [ ] Configure alarms for Auth Service
- [ ] Monitor error rates, latency
- [ ] Gradually increase traffic to 100%
- [ ] Remove Django auth endpoints

**Deliverables**:
- ✅ Auth Service live and handling 100% of auth requests
- ✅ CloudWatch dashboards showing metrics
- ✅ Circuit breaker preventing auth failures from crashing app

---

### Phase 2: Payment Decoupling (Month 3-4)

**Week 7-8: Payment Service**
- [ ] Create Payment microservice
- [ ] Implement Paystack integration
- [ ] Set up PaymentVerifiedEvent SNS topic
- [ ] Configure SQS queue for payment verification retries
- [ ] Deploy Payment Service

**Week 9-10: Appointment Event Subscriber**
- [ ] Create AppointmentCreationWorker (SQS consumer)
- [ ] Subscribe to PaymentVerifiedEvent
- [ ] Implement saga pattern for distributed transaction
- [ ] Deploy worker as Lambda function

**Week 11-12: Migration & Testing**
- [ ] Dual-write payments to both systems
- [ ] Verify data consistency
- [ ] Switch to Payment Service
- [ ] Test payment failure scenarios

**Deliverables**:
- ✅ Payment failures auto-retry via SQS
- ✅ Appointments created asynchronously
- ✅ User doesn't lose payment even if appointment creation temporarily fails

---

### Phase 3: Appointment Service (Month 5-6)

**Week 13-14: Appointment Microservice**
- [ ] Create Appointment Service
- [ ] Migrate appointments, departments, doctors tables
- [ ] Implement caching with Redis (availability checks)
- [ ] Deploy Appointment Service

**Week 15-16: Integration & Testing**
- [ ] Integrate with Auth Service (token verification)
- [ ] Integrate with Payment Service (payment status checks)
- [ ] Implement offline queueing in frontend
- [ ] Test conflict scenarios

**Week 17-18: Data Migration**
- [ ] Dual-write appointments to both DBs
- [ ] Verify consistency for 2 weeks
- [ ] Switch reads to Appointment Service
- [ ] Remove Django appointment endpoints

**Deliverables**:
- ✅ Appointment booking works offline (queued)
- ✅ Appointment viewing works with cached data
- ✅ Conflict detection works across services

---

### Phase 4: Medical Records Service (Month 7-8)

**Week 19-20: Medical Records Microservice**
- [ ] Create Medical Records Service
- [ ] Migrate medical records to S3 (DICOM files)
- [ ] Implement OTP caching in Redis
- [ ] Deploy Medical Records Service

**Week 21-22: Audit & Compliance**
- [ ] Create Audit Service (SNS subscriber)
- [ ] Log all medical record accesses
- [ ] Generate compliance reports
- [ ] Test OTP flow

**Deliverables**:
- ✅ Medical records access independent of appointment system
- ✅ OTP codes cached in Redis (auto-expire)
- ✅ Audit trail for compliance

---

### Phase 5: Remaining Services (Month 9-12)

**Week 23-26: Prescription & Pharmacy Services**
- [ ] Extract Prescription Service
- [ ] Extract Pharmacy Service
- [ ] Integrate with Auth, Appointment services
- [ ] Migrate data

**Week 27-30: Women's Health Service**
- [ ] Create Women's Health Service
- [ ] Migrate pregnancy tracking to DynamoDB
- [ ] Implement offline sync
- [ ] Deploy service

**Week 31-34: Organization Service**
- [ ] Extract Organization/Admin Service
- [ ] Migrate dashboard data
- [ ] Implement role-based access
- [ ] Test admin flows

**Week 35-36: Final Migration**
- [ ] Remove all Django dependencies
- [ ] Decommission monolith
- [ ] Performance testing
- [ ] Final security audit

**Deliverables**:
- ✅ Complete microservices architecture
- ✅ All services independent and scalable
- ✅ Monolith decommissioned

---

## Conclusion

The PHB Hospital System's monolithic architecture presents **critical single points of failure** that can bring down the entire application. By migrating to a microservices architecture on AWS, the system will gain:

1. **Resilience**: Service failures isolated, circuit breakers prevent cascades
2. **Scalability**: Services scale independently based on demand
3. **Maintainability**: Smaller codebases, easier to understand and modify
4. **Deployability**: Deploy services independently, reduce downtime
5. **Performance**: Caching, CDN, and service-specific optimizations

**Critical Next Steps**:
1. Replace 889 console.log statements with CloudWatch logging
2. Implement circuit breakers in frontend
3. Add retry logic to all API calls
4. Extract Auth Service (highest priority)
5. Set up API Gateway and monitoring

**Estimated Timeline**: 12 months for complete migration
**Estimated Cost**: $1,500-2,500/month (AWS services)
**Risk Mitigation**: Strangler fig pattern allows gradual migration with rollback capability

---

## Code References

### Single Points of Failure
- [authContext.tsx:368-475](src/features/auth/authContext.tsx#L368-L475) - Auth initialization SPOF
- [App.tsx:347-359](src/App.tsx#L347-L359) - ProtectedRoute redirect logic
- [appointmentService.ts:55-72](src/services/appointmentService.ts#L55-L72) - No retry logic
- [paymentService.ts:220-337](src/services/paymentService.ts#L220-L337) - Payment initialization SPOF
- [PaymentModal.tsx:54-67](src/components/modals/PaymentModal.tsx#L54-L67) - Paystack CDN dependency

### Tight Coupling
- [BookAppointment.tsx:653-830](src/features/health/BookAppointment.tsx#L653-L830) - Multi-service coupling
- [medicalRecordsService.ts:384-610](src/features/health/medicalRecordsService.ts#L384-L610) - Dual auth requirement
- [organizationAuthContext.tsx:163-291](src/features/organization/organizationAuthContext.tsx#L163-L291) - Organization init flow
- [HospitalStatusGuard.tsx:14-54](src/features/health/HospitalStatusGuard.tsx#L14-L54) - Route-backend coupling

### Error Handling Gaps
- [ErrorBoundary.tsx:1-67](src/components/ErrorBoundary.tsx#L1-L67) - Limited error boundary
- [medicalRecordsService.ts:223-228](src/features/health/medicalRecordsService.ts#L223-L228) - Mock fallback in production
- [prescriptionsService.ts:191-220](src/features/health/prescriptionsService.ts#L191-L220) - Alternative endpoint fallback
- [paymentService.ts:209-215](src/services/paymentService.ts#L209-L215) - Silent failure pattern

---

**Related Research**: [AWS Services Integration Analysis](2025-10-30-aws-services-integration-analysis.md)
