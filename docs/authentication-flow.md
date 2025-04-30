# PHB Authentication & Onboarding Flow Documentation

This document outlines the complete authentication and onboarding flow for the PHB platform, including registration, login, verification, and the onboarding process. This information is intended for backend developers to understand the client-side implementation and create the necessary API endpoints and services.

## Table of Contents

1. [Overview](#overview)
2. [User Registration Flow](#user-registration-flow)
3. [Login Flow](#login-flow)
4. [OTP Verification](#otp-verification)
5. [Onboarding Flow](#onboarding-flow)
6. [Data Models](#data-models)
7. [Required API Endpoints](#required-api-endpoints)
8. [Security Considerations](#security-considerations)

## Overview

The PHB platform uses a multi-step authentication process that includes:

1. **Registration**: Users create an account with personal information
2. **OTP Verification**: One-time passcode verification via email/phone
3. **Onboarding**: A guided introduction to PHB features for new users
4. **Route Protection**: Preventing access to certain pages based on authentication state

The frontend uses React with React Router for navigation and context API for state management. All authentication routes and components are standalone (no header/footer), while the main application uses protected routes that verify authentication status.

## User Registration Flow

### Multi-step Registration Process

The registration is implemented as a multi-step form with conditional fields based on user country:

1. **Account Information**
   - Email
   - Password
   - Password confirmation

2. **Personal Information**
   - Full name
   - Date of birth
   - Gender
   - Phone number

3. **Location Information**
   - Country (dropdown)
   - State/Region
   - City
   - **Conditional fields** based on country:
     - For Nigeria: National Identification Number (NIN)
     - For US: Social Security Number (SSN)
     - Other countries may have different requirements

4. **Verification**
   - User is sent to OTP verification

### Frontend Implementation

The registration flow is managed in `src/features/auth/RegisterForm.tsx` with form state management and validation.

```typescript
// Sample user data structure captured during registration
interface RegisterData {
  name: string;
  email: string;
  password: string;
  gender?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  nin?: string;  // Nigeria
  ssn?: string;  // US
}
```

The registration submits user data to the backend but keeps the user in an "unverified" state until OTP verification is completed.

## Login Flow

The login flow is simpler but still includes OTP verification:

1. User enters email and password
2. Backend validates credentials
3. If valid, user is prompted for OTP verification
4. After successful verification, user is:
   - Directed to the onboarding flow if they haven't completed it
   - Directed to their account page if they have completed onboarding

### Frontend Implementation

Login is managed in `src/features/auth/LoginForm.tsx` and `src/pages/LoginPage.tsx`.

## OTP Verification

Both registration and login flows use the same OTP verification component:

1. A 6-digit code is sent to the user's email or phone (currently hardcoded to "123456" for testing)
2. User enters the code
3. Frontend validates the code
4. User proceeds to the next step upon successful verification

### Frontend Implementation

OTP verification is handled in `src/features/auth/OTPVerification.tsx`.

```typescript
// In AuthContext.tsx
const verifyOTP = async (otp: string) => {
  // For demo, the code is hardcoded as "123456"
  if (otp !== '123456') {
    throw new Error('Invalid verification code');
  }

  // Complete authentication after successful verification
  // ...
}
```

## Onboarding Flow

The onboarding flow is a guided tour for new users that introduces key PHB features:

1. **Welcome**: Introduction to PHB
2. **Health Point Number (HPN)**: Explanation of user's unique healthcare identifier
3. **Primary Hospital Registration**: Information about setting up a primary care facility
4. **Medical Records**: How to manage health records in PHB
5. **Emergency Assistance**: Emergency features and setup
6. **Completion**: Final step with next action suggestions

### Important Implementation Details

1. **Access Control**:
   - Onboarding is only accessible to authenticated users
   - Users who haven't completed onboarding are redirected here when accessing protected routes
   - The flow is shown only once per user (tracked by `completedOnboarding` flag)

2. **Onboarding State**:
   - User progress is tracked with the `completedOnboarding` flag in the user object
   - Completion is triggered by the `completeOnboarding()` function in the auth context

3. **Illustrations**:
   - Each step includes an SVG illustration from the `/public/images/` directory:
     - `/images/welcome-illustration.svg`
     - `/images/hpn-illustration.svg`
     - `/images/hospital-illustration.svg`
     - `/images/records-illustration.svg`
     - `/images/emergency-illustration.svg`
     - `/images/complete-illustration.svg`

### Frontend Implementation

The onboarding flow is implemented in `src/features/auth/OnboardingFlow.tsx`.

## Data Models

### User Model

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  hpn?: string; // PHB's health service number
  gender?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  nin?: string; // Nigeria National ID
  ssn?: string; // US Social Security
  completedOnboarding?: boolean; // Tracks onboarding status
}
```

## Required API Endpoints

The backend should implement these API endpoints to support the authentication flow:

### Registration

```
POST /api/auth/register
Body: RegisterData
Response: { success: boolean, userId: string, requiresVerification: boolean }
```

### Login

```
POST /api/auth/login
Body: { email: string, password: string }
Response: { success: boolean, requiresVerification: boolean }
```

### OTP Verification

```
POST /api/auth/verify-otp
Body: { otp: string, email: string }
Response: {
  success: boolean,
  token: string,
  user: User
}
```

### Resend OTP

```
POST /api/auth/resend-otp
Body: { email: string }
Response: { success: boolean }
```

### Complete Onboarding

```
PUT /api/auth/complete-onboarding
Headers: Authorization: Bearer {token}
Response: {
  success: boolean,
  user: User (with updated completedOnboarding flag)
}
```

### Get Current User

```
GET /api/auth/me
Headers: Authorization: Bearer {token}
Response: { user: User }
```

### Logout

```
POST /api/auth/logout
Headers: Authorization: Bearer {token}
Response: { success: boolean }
```

## Security Considerations

1. **Token Storage**: The frontend stores authentication tokens in localStorage under the key `phb_user`.

2. **Protected Routes**: The application uses a `ProtectedRoute` component that:
   - Redirects unauthenticated users to login
   - Redirects authenticated users who haven't completed onboarding to the onboarding flow

3. **Password Requirements**:
   - Minimum 8 characters
   - At least one uppercase letter
   - At least one lowercase letter
   - At least one number
   - At least one special character

4. **OTP Security**:
   - 6-digit numeric codes
   - Should expire after 5-10 minutes (implementation needed)
   - Should have rate-limiting for attempts (implementation needed)

5. **PII Data Handling**:
   - Sensitive information like SSN and NIN should be encrypted at rest
   - Consider masking these values in API responses

## Frontend-Backend Interaction Flow

1. **Registration**:
   - Frontend collects user data through multi-step form
   - Data is submitted to `/api/auth/register`
   - Backend creates unverified user and sends OTP
   - Frontend redirects to OTP verification screen

2. **Login**:
   - Frontend collects credentials
   - Data is submitted to `/api/auth/login`
   - Backend validates credentials and sends OTP
   - Frontend redirects to OTP verification screen

3. **OTP Verification**:
   - Frontend collects OTP from user
   - OTP is submitted to `/api/auth/verify-otp`
   - Backend validates OTP and returns user data with token
   - Frontend stores token and user data
   - Frontend checks onboarding status and redirects accordingly

4. **Onboarding**:
   - User completes onboarding steps
   - Frontend calls `/api/auth/complete-onboarding`
   - Backend updates user's onboarding status
   - Frontend redirects to account page

5. **Accessing Protected Routes**:
   - Frontend checks for token and onboarding status
   - If missing token, redirect to login
   - If has token but onboarding incomplete, redirect to onboarding
   - Otherwise, allow access to the protected route

This documentation covers the essential implementation details required for backend developers to create compatible API services for the PHB authentication flow.
