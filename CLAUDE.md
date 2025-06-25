# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PHB (Public Health Bureau) Hospital System Frontend - A comprehensive healthcare management platform built with React, TypeScript, and Vite.

### Tech Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with Material-UI components
- **Routing**: React Router v6
- **State Management**: Context API (multiple auth contexts)
- **HTTP Client**: Axios
- **Charts**: Chart.js, Recharts
- **Calendar**: react-big-calendar
- **Medical**: DICOM parser, Cornerstone Core for medical imaging
- **Payment**: Paystack integration

## Development Commands

```bash
# Development server (runs on all network interfaces)
bun run dev

# Type checking (run before committing)
bun run typecheck

# Linting with auto-fix
bun run lint

# Production build
bun run build

# Preview production build
bun run preview

# Deploy to Netlify
bun run deploy
```

## Architecture Overview

### Authentication Contexts
The app uses three separate authentication contexts:
1. **AuthProvider** (`authContext.tsx`) - Regular user authentication
2. **ProfessionalAuthProvider** (`professionalAuthContext.tsx`) - Medical professionals
3. **OrganizationAuthProvider** (`organizationAuthContext.tsx`) - Organization admins

### Routing Structure
- **Public routes**: Health info, conditions, medicines (no auth required)
- **`/account/*`**: User account features (requires AuthProvider)
- **`/professional/*`**: Medical professional features (requires ProfessionalAuthProvider)
- **`/organization/*`**: Organization admin features (requires OrganizationAuthProvider)

### Route Guards
- **ProtectedRoute**: Ensures user authentication and onboarding completion
- **ProfessionalRouteGuard**: Guards professional routes
- **OrganizationRouteGuard**: Guards organization routes
- **HospitalStatusGuard**: Additional guard for appointment routes

### API Integration
- Base URL configured in `utils/config.ts`
- JWT tokens stored in localStorage with keys:
  - `phb_token` (regular users)
  - `phb_professional_token` (professionals)
  - `phb_organization_token` (organizations)
- All API calls should include appropriate Authorization headers

### Key Services
- **appointmentService.ts**: Appointment booking and management
- **paymentService.ts**: Paystack payment integration
- **medicalRecordsService.ts**: Medical records with OTP verification
- **medicinesApiService.ts**: Medicines database integration

### Component Organization
- **`/components`**: Reusable UI components
- **`/features`**: Feature-specific components and logic
- **`/pages`**: Route page components
- **`/layouts`**: Layout wrapper components
- **`/hooks`**: Custom React hooks
- **`/services`**: API service modules

### Important Patterns
1. **OTP Verification**: Medical records require OTP verification before access
2. **Role-based Navigation**: Menu items change based on user role/type
3. **View Toggle**: Professionals can switch between patient/professional views
4. **Payment Flow**: Appointments require payment confirmation via Paystack
5. **File Security**: Secure file upload with validation and virus scanning

### Testing Considerations
- No specific test framework currently configured
- Consider adding Vitest for unit testing
- Manual testing through development server

### Current Work in Progress
Based on git status:
- Payment confirmation flow improvements
- Professional appointment detail enhancements
- New medical access tab feature

### Environment Variables
The app expects backend API URLs to be configured. Check `utils/config.ts` for required configuration.

### Deployment
- Currently configured for Netlify deployment
- Build outputs to `dist/` directory
- Static hosting compatible

## Common Tasks

### Adding a New Page
1. Create component in `/pages` directory
2. Add route in `App.tsx` under appropriate layout
3. Update navigation menus if needed

### Adding API Endpoints
1. Create/update service file in `/services`
2. Include proper auth headers from context
3. Handle errors consistently

### Working with Authentication
1. Use appropriate auth context hook
2. Check `isAuthenticated` state
3. Include tokens in API requests
4. Handle token expiry/refresh

### Modifying Layouts
1. MainLayout: General public pages
2. ProfessionalLayout: Medical staff pages
3. OrganizationLayout: Admin pages

Each layout has its own header, navigation, and styling.