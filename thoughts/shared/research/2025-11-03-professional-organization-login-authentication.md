---
date: 2025-11-03T00:00:00Z
researcher: Claude
git_commit: b601424d2b1ea6dcd679c9195b603ecefc718ba3
branch: main
repository: phbfrontend
topic: "How Login Works with Professionals and Organizations"
tags: [research, codebase, authentication, professional, organization, login, 2fa]
status: complete
last_updated: 2025-11-03
last_updated_by: Claude
---

# Research: How Login Works with Professionals and Organizations

**Date**: 2025-11-03T00:00:00Z
**Researcher**: Claude
**Git Commit**: b601424d2b1ea6dcd679c9195b603ecefc718ba3
**Branch**: main
**Repository**: phbfrontend

## Research Question

How does login work with professionals and organizations in the PHB platform?

## Summary

The PHB platform implements two distinct authentication systems:

1. **Professional Authentication**: Healthcare workers (doctors, nurses, pharmacists, researchers) use the standard user authentication system. The `ProfessionalAuthProvider` is a wrapper context that detects when a regular user has the `isDoctor` flag set to `true` and transforms their user data into a professional user object. This approach means professionals don't have separate login credentials or API endpoints.

2. **Organization Authentication**: Hospital/NGO/Pharmacy administrators have a completely independent authentication system with dedicated API endpoints, mandatory 2FA verification via OTP, and httpOnly cookie-based JWT token storage. Organization login requires three parameters: email, password, and hospital code.

**Key Architectural Difference**: Professional authentication piggybacks on the main user authentication system, while organization authentication is a standalone system with its own API integration.

## Detailed Findings

### Professional Authentication System

#### Architecture Overview

The professional authentication system is implemented as a **derived state pattern** rather than an independent authentication system.

**Key Files**:
- `src/features/professional/professionalAuthContext.tsx:46-115` - Main auth context provider
- `src/features/professional/ProfessionalLoginForm.tsx:9-120` - Login form UI
- `src/features/professional/ProfessionalRouteGuard.tsx` - Route protection

**How It Works**:
1. Professionals log in using the standard user login form
2. The `ProfessionalAuthProvider` monitors the main `AuthContext` via `useAuth()` hook
3. When a user with `role === 'doctor'` logs in, the context transforms the user object
4. The transformation creates a `ProfessionalUser` object with professional-specific properties
5. No separate API calls are made for professional authentication

#### Authentication Flow

**Login Process** (`ProfessionalLoginForm.tsx:15-24`):
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await login(email, password);  // 2 parameters only
    navigate(redirectPath);         // Direct navigation to dashboard
  } catch (err) {
    // Error handled in auth context
  }
};
```

**State Transformation** (`professionalAuthContext.tsx:55-84`):
```typescript
useEffect(() => {
  if (!authLoading) {
    if (mainUserAuthenticated && isDoctor && user) {
      const professionalUserData: ProfessionalUser = {
        id: user.id,
        name: user.full_name,          // Property mapping
        email: user.email,
        role: 'doctor',                // Hardcoded
        licenseNumber: user.hpn || '', // Healthcare Professional Number
        specialty: '',                 // Not available
        verified: true,                // Hardcoded
      };
      setProfessionalUser(professionalUserData);

      if (window.location.pathname.includes('/professional')) {
        localStorage.setItem('phb_view_preference', 'doctor');
        localStorage.setItem('phb_professional_auth_state', 'true');
      }
    } else {
      setProfessionalUser(null);
    }
    setIsLoading(false);
  }
}, [user, authLoading, mainUserAuthenticated, isDoctor]);
```

**Key Points**:
- No separate login API endpoint for professionals
- Authentication relies on main auth context's `isDoctor` flag
- Uses httpOnly cookies from main auth system
- Single-step authentication (no 2FA)
- Direct navigation to dashboard after successful login

#### User Data Structure

**ProfessionalUser Interface** (`professionalAuthContext.tsx:7-15`):
```typescript
interface ProfessionalUser {
  id: string;
  name: string;
  email: string;
  role: ProfessionalRole; // 'doctor' | 'nurse' | 'researcher' | 'pharmacist'
  licenseNumber?: string;
  specialty?: string;
  verified: boolean;
}
```

**Property Mappings**:
- `user.id` → `professionalUser.id`
- `user.full_name` → `professionalUser.name`
- `user.email` → `professionalUser.email`
- `'doctor'` → `professionalUser.role` (hardcoded)
- `user.hpn` → `professionalUser.licenseNumber`
- `true` → `professionalUser.verified` (hardcoded)

#### Token Management

**Storage**: httpOnly cookies (inherited from main auth)
- `phb_access_token` cookie
- `phb_refresh_token` cookie
- Automatic refresh every 25 minutes via main auth context

**No Independent Token Management**:
- Professional context doesn't manage tokens
- Relies on main auth's automatic refresh timer
- Tokens sent automatically with `credentials: 'include'`

#### Login Form Features

**Form Fields** (`ProfessionalLoginForm.tsx:44-71`):
1. Email (placeholder: "doctor@organization.org")
2. Password

**Additional UI Elements**:
- Remember me checkbox (non-functional)
- Forgot password link (static, non-functional)
- Registration link to `/professional/register`
- Test accounts display showing 4 demo accounts

**No 2FA**: Professional login is single-step authentication only.

---

### Organization Authentication System

#### Architecture Overview

The organization authentication system is a **completely independent** authentication implementation with its own API endpoints, state management, and security features.

**Key Files**:
- `src/features/organization/organizationAuthContext.tsx:83-713` - Auth context with full API integration
- `src/features/organization/OrganizationLoginForm.tsx:11-154` - Login form UI
- `src/features/organization/OrganizationVerificationForm.tsx` - 2FA OTP verification
- `src/App.tsx:295` - Route guard (inline component)

**How It Works**:
1. Organizations log in with email, password, and **hospital code** (3 parameters)
2. Backend validates credentials and sends OTP code via email
3. User enters OTP code in verification form
4. Backend sets httpOnly cookies for JWT tokens
5. Automatic token refresh every 25 minutes

#### Authentication Flow

**Step 1: Initial Login** (`OrganizationLoginForm.tsx:18-31`):
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await login(email, password, hospitalCode);  // 3 parameters
    // Component will re-render to show verification form
  } catch (err) {
    // Error handled in auth context
  }
};
```

**Login API Call** (`organizationAuthContext.tsx:293-344`):
- Endpoint: `POST http://127.0.0.1:8000/api/hospitals/admin/login/`
- Parameters: `{ email, password, hospital_code }`
- On success:
  - Stores email in sessionStorage: `org_auth_email`
  - Sets verification flag: `org_auth_needs_verification = 'true'`
  - Stores timestamp: `org_auth_timestamp`
  - Updates state: `setNeedsVerification(true)`

**Step 2: Conditional Rendering** (`OrganizationLoginForm.tsx:33-40`):
```typescript
if (needsVerification) {
  return <OrganizationVerificationForm redirectPath={redirectPath} />;
}
```

**Step 3: 2FA Verification** (`organizationAuthContext.tsx:464-535`):
- Endpoint: `POST http://127.0.0.1:8000/api/hospitals/admin/verify-2fa/`
- Parameters: `{ email, verification_code, remember_device }`
- Backend sets httpOnly cookies in response
- On success:
  - Clears sessionStorage verification keys
  - Sets `isAuthenticated = true`
  - Stores `userData` object
  - Starts automatic token refresh timer
  - Navigates to dashboard

**Key Points**:
- Three-parameter login (email, password, hospital_code)
- Mandatory 2FA via OTP email
- httpOnly cookie-based JWT storage
- Two-step authentication flow with conditional rendering
- Independent from main user authentication

#### Hospital Code Requirement

**Purpose**: The hospital code validates that the admin belongs to a specific organization.

**Usage**:
1. Required in login form as third field (`OrganizationLoginForm.tsx:83-91`)
2. Sent to backend in login API call (`organizationAuthContext.tsx:307`)
3. Required in password reset flow (`organizationAuthContext.tsx:549-550, 604`)
4. Stored in `userData.hospital.code` after successful authentication

**Example Hospital Code Format**: "NGH-001" (placeholder shown in UI)

#### User Data Structure

**UserData Interface** (`organizationAuthContext.tsx:29-47`):
```typescript
interface UserData {
  id: number;
  email: string;
  full_name: string;
  role: 'hospital_admin' | 'ngo_admin' | 'pharmacy_admin';
  is_verified: boolean;
  position?: string;
  hospital?: { id: number; name: string; code: string };
  ngo?: { id: number; name: string; code: string };
  pharmacy?: { id: number; name: string; code: string };
}
```

**Organization-Specific Properties**:
- `hospital`: Set for hospital administrators
- `ngo`: Set for NGO administrators
- `pharmacy`: Set for pharmacy administrators
- Only one organization property is set per user

#### Token Management

**Storage** (`organizationAuthContext.tsx:74-82`):
- Access token: httpOnly cookie `access_token`
- Refresh token: httpOnly cookie `refresh_token`
- Cookies set by backend (not accessible to JavaScript)
- XSS protection via httpOnly flag

**Automatic Refresh** (`organizationAuthContext.tsx:135-151`):
```typescript
const setupTokenRefreshTimer = () => {
  refreshTimerRef.current = setTimeout(async () => {
    const success = await refreshAccessToken();
    if (success) {
      setupTokenRefreshTimer(); // Reschedule
    }
  }, 25 * 60 * 1000); // 25 minutes
};
```

**Refresh Logic** (`organizationAuthContext.tsx:95-132`):
- Endpoint: `POST http://127.0.0.1:8000/api/token/refresh/`
- Uses refresh token from cookie
- Updates access token on success
- On 401/403 error, logs user out automatically
- Self-rescheduling timer pattern

**Session Recovery** (`organizationAuthContext.tsx:163-291`):
- On page load, calls `GET /api/organizations/profile/`
- If cookies valid, restores authentication state
- Preserves OTP verification state during page reloads
- Respects logout flag to prevent unwanted re-authentication

#### Login Form Features

**Form Fields** (`OrganizationLoginForm.tsx:64-111`):
1. Email (placeholder: "organization@example.com")
2. Hospital Code (placeholder: "e.g. NGH-001") - **Unique to organization login**
3. Password

**Inline Error Clearing**:
- Each input field clears errors on change
- Provides real-time feedback as user types

**Additional UI Elements**:
- Forgot password link (functional, links to `/hospital-admin/reset-password/request`)
- Remember me checkbox (non-functional)
- Registration link to `/organization/register`
- Test accounts display showing 3 demo accounts (hospital, NGO, pharma)

#### Password Reset Flow

Organizations have a comprehensive **three-step password reset** system:

**Step 1: Request Reset** (`organizationAuthContext.tsx:538-580`):
- Endpoint: `POST /api/hospitals/admin/reset-password/request/`
- Parameters: `email`, `hospital_code`
- Returns: `token`, `requires_secondary_admin`, `expires_in`

**Step 2: Verify Reset Code** (`organizationAuthContext.tsx:592-641`):
- Endpoint: `POST /api/hospitals/admin/reset-password/verify/`
- Parameters: `token`, `verification_code`, `email`, `hospital_code`
- Returns: updated `token`, `secondary_token` (if required), `expires_in`

**Step 3: Complete Reset** (`organizationAuthContext.tsx:644-687`):
- Endpoint: `POST /api/hospitals/admin/reset-password/complete/`
- Parameters: `token`, `secondary_token`, `email`, `new_password`, `confirm_password`
- Returns: `requires_2fa` flag

**Note**: Professional authentication does not have a functional password reset flow.

---

### Key Differences Summary

| Aspect | Professional Authentication | Organization Authentication |
|--------|---------------------------|---------------------------|
| **Login Parameters** | 2 (email, password) | 3 (email, password, hospital_code) |
| **API Endpoints** | None (uses main auth) | Dedicated endpoints at `/api/hospitals/admin/*` |
| **Authentication System** | Derived from main user auth | Independent authentication system |
| **2FA Requirement** | No | Yes (mandatory OTP via email) |
| **Token Storage** | httpOnly cookies (via main auth) | httpOnly cookies (own system) |
| **Token Refresh** | Via main auth context | Own refresh timer and logic |
| **Auth Flow** | Single-step (direct navigation) | Two-step (login → OTP verification) |
| **Session Storage** | localStorage (view preference) | sessionStorage (verification state) |
| **Password Reset** | Non-functional link | Full 3-step reset flow |
| **User Detection** | Checks `isDoctor` flag on user | Direct login to organization system |
| **Context Dependencies** | Depends on AuthProvider | Independent context |
| **State Management** | Transform existing user object | Fetch organization profile from API |

---

## Code References

### Professional Authentication Files

- `src/features/professional/professionalAuthContext.tsx:46-115` - ProfessionalAuthProvider and useProfessionalAuth hook
- `src/features/professional/ProfessionalLoginForm.tsx:9-120` - Professional login form component
- `src/features/professional/ProfessionalRegisterForm.tsx` - Professional registration form
- `src/features/professional/ProfessionalRouteGuard.tsx` - Route protection for professional pages
- `src/pages/professional/ProfessionalLoginPage.tsx` - Login page wrapper
- `src/layouts/ProfessionalLayout.tsx` - Layout for professional routes

### Organization Authentication Files

- `src/features/organization/organizationAuthContext.tsx:83-713` - OrganizationAuthProvider with full API integration
- `src/features/organization/OrganizationLoginForm.tsx:11-154` - Organization login form component
- `src/features/organization/OrganizationVerificationForm.tsx` - 2FA OTP verification form
- `src/features/organization/OrganizationRegisterForm.tsx` - Organization registration form
- `src/pages/organization/OrganizationLoginPage.tsx` - Login page wrapper
- `src/layouts/FluentOrganizationLayout.tsx` - Layout for organization routes
- `src/App.tsx:295` - OrganizationRouteGuard (inline component)

### Password Reset Files (Organization Only)

- `src/features/organization/HospitalAdminForgotPasswordForm.tsx` - Password reset request form
- `src/features/organization/HospitalAdminPasswordResetVerify.tsx` - Password reset verification form
- `src/features/organization/HospitalAdminPasswordResetComplete.tsx` - Password reset completion form
- `src/pages/organization/HospitalAdminForgotPasswordPage.tsx` - Password reset request page
- `src/pages/organization/HospitalAdminPasswordResetVerifyPage.tsx` - Verification page
- `src/pages/organization/HospitalAdminPasswordResetCompletePage.tsx` - Completion page

### Main Auth Context (Used by Professionals)

- `src/features/auth/authContext.tsx` - Main authentication context for regular users and professionals

---

## Architecture Insights

### 1. Nested Context Pattern

The application uses a **nested context provider hierarchy** in `App.tsx:399-401`:

```typescript
<AuthProvider>
  <ProfessionalAuthProvider>
    <OrganizationAuthProvider>
      {/* App routes */}
    </OrganizationAuthProvider>
  </ProfessionalAuthProvider>
</AuthProvider>
```

**Benefits**:
- Each context can access parent contexts
- Professional auth can monitor main auth state
- Clear separation of concerns
- Allows multiple authentication systems to coexist

### 2. Derived State Pattern (Professional Auth)

Professional authentication implements a **derived state pattern**:
- No independent data source
- Transforms data from parent context
- Updates automatically when parent changes
- Minimal code duplication
- Single source of truth (main auth)

**Trade-offs**:
- Cannot have professional-specific authentication logic
- Limited to properties available in main User interface
- Hardcoded values (verified: true, role: 'doctor')
- Dependent on main auth functionality

### 3. Independent System Pattern (Organization Auth)

Organization authentication is a **fully independent system**:
- Own API endpoints and logic
- Own state management
- Own token refresh mechanism
- Own error handling
- Own security features (2FA)

**Benefits**:
- Complete control over authentication flow
- Organization-specific features (hospital code, secondary admin)
- Independent security policies
- Flexible to extend without affecting other auth systems

### 4. Security Architecture

**XSS Protection**:
- Both systems now use httpOnly cookies
- Tokens not accessible to JavaScript
- Prevents token theft via XSS attacks

**Token Refresh Strategy**:
- Proactive refresh (25 minutes before 30-minute expiry)
- Automatic re-scheduling after successful refresh
- Graceful logout on refresh failure
- Prevents session interruption

**2FA Security** (Organization Only):
- Mandatory OTP verification
- Email-based OTP delivery
- Remember device option
- Verification state preserved across page reloads

### 5. Role-Based Access Control

**Professional RBAC** (`professionalAuthContext.tsx:91-95`):
```typescript
const hasAccess = (requiredRoles: ProfessionalRole[]) => {
  if (!professionalUser) return false;
  if (!professionalUser.verified) return false;
  return requiredRoles.includes(professionalUser.role);
};
```

**Organization RBAC**:
- Role-based dashboard rendering (hospital/NGO/pharmacy)
- Different management pages per organization type
- Role stored in `userData.role` property

### 6. Route Protection Patterns

**Professional Routes** (`src/features/professional/ProfessionalRouteGuard.tsx`):
- Checks `isAuthenticated` from professional context
- Redirects to `/professional/login` if not authenticated
- Allows access to professional-specific pages

**Organization Routes** (`src/App.tsx:295-356`):
- Inline guard component in App.tsx
- Checks `isAuthenticated` from organization context
- Redirects to `/organization/login` if not authenticated
- Separate from main user route guards

---

## Historical Context (from thoughts/)

No existing research documents found in thoughts/ directory related to professional or organization authentication flows. This is the first comprehensive research on this topic.

---

## Open Questions

1. **Professional Registration**: How does professional registration work? Is it integrated with the professional authentication system or separate?

2. **Hospital Code Management**: Where are hospital codes managed? Can admins create/modify them? What's the format specification?

3. **Secondary Admin Approval**: The password reset flow mentions "secondary admin approval" - how is this implemented and when is it required?

4. **Professional Specialty Field**: The `ProfessionalUser.specialty` field is always empty string. Where should this data come from? Is it stored in the backend User model?

5. **Remember Device Feature**: The 2FA "remember device" option - how long does it remember? What's stored to identify the device?

6. **Token Expiration Handling**: What happens if a user's session expires while they're actively using the app? Is there UI feedback?

7. **Multi-Organization Access**: Can a single admin account manage multiple organizations (e.g., multiple hospitals)?

8. **Professional License Verification**: Is there a separate system for verifying professional licenses (HPN numbers)? How does it integrate with authentication?
