# PHB Onboarding Flow Implementation Guide

This document provides detailed information about the onboarding flow implementation in the PHB platform, including visual representation, component architecture, troubleshooting, and recommendations for backend integration.

## Table of Contents

1. [Overview](#overview)
2. [Flow Diagram](#flow-diagram)
3. [Component Architecture](#component-architecture)
4. [Step-by-Step Implementation](#step-by-step-implementation)
5. [SVG Illustrations](#svg-illustrations)
6. [Common Issues & Troubleshooting](#common-issues--troubleshooting)
7. [Backend Integration](#backend-integration)
8. [Testing & Validation](#testing--validation)

## Overview

The onboarding flow is a guided, step-by-step tour that introduces new users to key PHB features after they've completed registration and verification. It is a critical part of the user experience, providing context and education about the platform's capabilities.

**Key Characteristics:**
- Presented only to authenticated users
- Shown only once per user (tracked via `completedOnboarding` flag)
- Required before accessing protected routes
- Multi-step, progressive disclosure of features
- Includes visual aids (SVG illustrations)

## Flow Diagram

The onboarding flow consists of the following sequence:

```
Registration → OTP Verification → [ONBOARDING FLOW] → Account Dashboard
                                   ┌───────────────┐
                                   │ 1. Welcome    │
                                   ├───────────────┤
                                   │ 2. HPN Number │
                                   ├───────────────┤
                                   │ 3. Hospital   │
                                   ├───────────────┤
                                   │ 4. Records    │
                                   ├───────────────┤
                                   │ 5. Emergency  │
                                   ├───────────────┤
                                   │ 6. Completion │
                                   └───────────────┘
```

**Authentication & Routing Logic:**

```
┌──────────────┐     ┌───────────────────┐     ┌──────────────┐
│ User accesses│     │ Authentication    │     │ Protected    │
│ protected    │────▶│ state check       │────▶│ route        │
│ route        │     │                   │     │ accessible   │
└──────────────┘     └───────────────────┘     └──────────────┘
                            │
                            │ Not authenticated
                            ▼
                     ┌──────────────┐
                     │ Redirect to  │
                     │ login page   │
                     └──────────────┘
                            │
                            │ Login successful
                            ▼
                     ┌───────────────────┐     ┌──────────────┐
                     │ Onboarding check  │ No  │ Redirect to  │
                     │ completedOnboard- │────▶│ onboarding   │
                     │ ing = true?       │     │ flow         │
                     └───────────────────┘     └──────────────┘
                            │                        │
                            │ Yes                    │ Complete
                            │                        │ onboarding
                            ▼                        ▼
                     ┌──────────────┐     ┌──────────────┐
                     │ Access       │     │ Update user  │
                     │ protected    │◀────│ profile:     │
                     │ route        │     │ completed    │
                     └──────────────┘     │ Onboarding=  │
                                          │ true         │
                                          └──────────────┘
```

## Component Architecture

The onboarding flow consists of several key components:

### 1. `OnboardingFlow.tsx`

This is the main component that:
- Manages the current step state
- Renders the appropriate content for each step
- Handles navigation between steps
- Tracks completion and communicates with the auth context

```tsx
// Key component structure
const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSkipWarning, setShowSkipWarning] = useState(false);
  const navigate = useNavigate();
  const { completeOnboarding, user } = useAuth();

  // Steps data with content for each onboarding step
  const steps: OnboardingStep[] = [
    { id: 'welcome', title: '...', image: '...', details: <...> },
    // ... other steps
  ];

  // Navigation and completion handlers
  const handleNext = () => { ... };
  const handlePrevious = () => { ... };
  const handleComplete = () => {
    completeOnboarding();
    navigate('/account');
  };

  // Rendering of step content, progress bar, and navigation
  return (
    <div className="onboarding-container">
      {/* Progress tracking */}
      {/* Current step content */}
      {/* Navigation buttons */}
    </div>
  );
};
```

### 2. AuthContext Integration

The `authContext.tsx` file contains the logic for managing onboarding state:

```tsx
// In authContext.tsx
const completeOnboarding = () => {
  if (user) {
    const updatedUser = { ...user, completedOnboarding: true };
    setUser(updatedUser);
    localStorage.setItem('phb_user', JSON.stringify(updatedUser));
    setIsNewUser(false);
  }
};

// Context provides onboarding status
const contextValue = {
  // ...other auth properties
  needsOnboarding: !!user && !user.completedOnboarding,
  completeOnboarding,
};
```

### 3. Protected Route Component

Routes that require authentication use a `ProtectedRoute` component to enforce onboarding completion:

```tsx
// In App.tsx
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, needsOnboarding } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (needsOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};
```

## Step-by-Step Implementation

The onboarding flow consists of 6 distinct steps, each with its own content and illustration:

### Step 1: Welcome
- Introduction to PHB platform
- Personalized greeting using user's name
- Brief overview of what the onboarding will cover

### Step 2: Health Point Number (HPN)
- Explanation of user's unique healthcare identifier
- Benefits of having an HPN
- Display of the user's assigned HPN

### Step 3: Primary Hospital Registration
- Information about connecting with a primary healthcare provider
- Benefits of registering with a primary hospital
- Options to find hospitals or set up later

### Step 4: Medical Records
- Overview of how to manage health records in PHB
- Information about Elara AI for analyzing records
- Options to upload records or explore later

### Step 5: Emergency Assistance
- Details about emergency features
- Important safety notices
- Emergency contact setup options

### Step 6: Completion
- Congratulatory message
- Suggested next steps (complete profile, find doctor, etc.)
- Button to finalize onboarding and proceed to dashboard

Each step includes:
- A title and description
- An SVG illustration
- Detailed explanatory content
- When relevant, action buttons

## SVG Illustrations

Each onboarding step includes an SVG illustration to visually represent the concept being explained. These files are located in the `/public/images/` directory:

| Step | File Path | Description |
|------|-----------|-------------|
| Welcome | `/images/welcome-illustration.svg` | PHB welcome graphic |
| HPN | `/images/hpn-illustration.svg` | Health Point Number concept |
| Hospital | `/images/hospital-illustration.svg` | Primary care provider |
| Records | `/images/records-illustration.svg` | Medical records management |
| Emergency | `/images/emergency-illustration.svg` | Emergency assistance |
| Complete | `/images/complete-illustration.svg` | Completion celebration |

**Important Note:** The SVG files must exist and be properly formatted. Missing or malformed SVG files can cause the onboarding flow to appear as a blank page.

## Common Issues & Troubleshooting

### Blank Onboarding Screen Issue

A common issue is that the onboarding page appears completely blank. This can occur for several reasons:

1. **Missing Authentication**:
   - **Symptom**: Blank white screen when accessing `/onboarding` directly
   - **Cause**: The component expects authenticated user data and fails silently
   - **Solution**: Implement proper error handling and fallback UI when user data is missing

2. **SVG Loading Failures**:
   - **Symptom**: Content doesn't appear or appears without illustrations
   - **Cause**: SVG files missing or inaccessible
   - **Solution**: Ensure all SVG files exist in the correct location with proper formatting

3. **JavaScript Errors**:
   - **Symptom**: Page appears blank, console shows errors
   - **Cause**: Runtime errors in component rendering
   - **Solution**: Check console logs, implement error boundaries

### Implemented Solutions

To address these issues, we've implemented several improvements:

1. **Authentication Fallbacks**:
   ```tsx
   // Error handling for unauthenticated state
   if (!user) {
     return (
       <div className="auth-required-message">
         <h2>Authentication Required</h2>
         <p>Please log in to access the onboarding flow.</p>
         <Link to="/login">Go to Login</Link>
       </div>
     );
   }
   ```

2. **SVG Error Handling**:
   ```tsx
   // Fallback UI for image loading errors
   const [imageLoadError, setImageLoadError] = useState({});

   const handleImageError = (imagePath) => {
     setImageLoadError(prev => ({ ...prev, [imagePath]: true }));
   };

   // In render:
   {imageLoadError[steps[currentStep].image] ? (
     <div className="image-fallback">Step {currentStep + 1}</div>
   ) : (
     <img
       src={steps[currentStep].image}
       onError={() => handleImageError(steps[currentStep].image)}
     />
   )}
   ```

3. **Debug Utility Page**:
   - Created a test page at `/test-onboarding` to verify SVG loading
   - Provides visual feedback on which images load successfully

## Backend Integration

To fully implement the onboarding flow, the backend needs to track the onboarding completion status:

### API Requirements

1. **User Schema Update**:
   ```
   User {
     // existing fields
     completedOnboarding: Boolean
   }
   ```

2. **Onboarding Completion Endpoint**:
   ```
   PUT /api/auth/complete-onboarding
   Headers: Authorization: Bearer {token}
   Response: {
     success: Boolean,
     user: User (with updated data)
   }
   ```

3. **Fetching User State**:
   ```
   GET /api/auth/me
   Headers: Authorization: Bearer {token}
   Response: {
     user: User (includes completedOnboarding flag)
   }
   ```

### Backend Implementation Considerations

1. **Default Value**: New users should have `completedOnboarding: false` by default

2. **Validation**: Ensure only authenticated users can update this flag

3. **Immutability Option**: Optionally prevent users from repeating onboarding once completed (or add an admin option to reset it)

4. **Analytics**: Consider tracking onboarding completion rates and step drop-offs

## Testing & Validation

To ensure the onboarding flow works correctly, test the following scenarios:

1. **New User Flow**:
   - Register a new user
   - Verify OTP
   - Confirm redirection to onboarding
   - Complete all onboarding steps
   - Verify redirection to account page
   - Attempt to access onboarding again (should redirect to account)

2. **Interrupted Flow**:
   - Start onboarding
   - Close browser/refresh page
   - Log in again
   - Verify redirection back to onboarding

3. **Direct Access**:
   - Attempt to access `/onboarding` when not logged in
   - Verify proper handling (redirect or informative message)

4. **Skip Functionality**:
   - Test "Skip tour" button
   - Confirm warning modal appears
   - Test both continue and skip options

5. **Cross-browser Testing**:
   - Verify SVG loading in different browsers
   - Test responsive layout on various screen sizes

## Conclusion

The onboarding flow is a critical component of the user experience in PHB. By implementing proper error handling, user-friendly UI, and seamless integration with the backend, you can ensure users have a smooth introduction to the platform's features.

Remember that the most common issue (blank screen) is typically caused by missing authentication data or SVG loading failures. The implemented solutions in this document should address these issues and provide a robust onboarding experience.
