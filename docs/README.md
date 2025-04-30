# PHB Documentation

This directory contains comprehensive documentation for the PHB (Public Health Bureau) platform, focusing on authentication, user onboarding, and related functionality.

## Available Documentation

### Authentication & User Flow

- [**Authentication Flow**](authentication-flow.md) - Complete documentation of the login, registration, and authentication processes, including required API endpoints and data models.

### Onboarding Experience

- [**Onboarding Flow**](onboarding-flow.md) - Detailed implementation guide for the onboarding experience, including visual diagrams, component architecture, troubleshooting, and backend integration guidance.

## Documentation for Backend Developers

These documents are primarily designed for backend developers to understand:

1. The frontend implementation of authentication and onboarding flows
2. The expected API endpoints and data structures
3. The interaction between frontend and backend components
4. Common issues and their solutions

## Key Authentication & Onboarding Features

- Multi-step registration with conditional fields based on user country
- OTP (One-Time Password) verification for both login and registration
- Six-step onboarding flow with visual aids
- Persistent onboarding state tracking
- Protected routes based on authentication and onboarding status

## Implementation Notes

- Frontend is built with React, TypeScript, and Tailwind CSS
- Authentication state is managed through React Context API
- Onboarding completion status is stored in user profile
- SVG illustrations are used throughout the onboarding process

## Common Issues Addressed

- Blank onboarding screen troubleshooting
- Authentication state management
- SVG loading failures
- Proper error handling and fallback UIs

---

For additional questions or clarification, please contact the frontend development team.
