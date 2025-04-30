# PHB Frontend-Backend Integration Guide

This document provides a guide for backend developers to implement API endpoints that integrate with the PHB frontend application, specifically focusing on the appointments and test results functionality.

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Appointments API](#appointments-api)
   - [Data Models](#appointment-data-models)
   - [Endpoints](#appointment-endpoints)
   - [Doctor Matching Service](#doctor-matching-service)
4. [Test Results API](#test-results-api)
   - [Data Models](#test-results-data-models)
   - [Endpoints](#test-results-endpoints)
5. [Error Handling](#error-handling)
6. [Testing The Integration](#testing-the-integration)
7. [Deployment Considerations](#deployment-considerations)

## Overview

The PHB frontend application provides user interfaces for managing healthcare appointments and viewing test results. The frontend is designed to interact with RESTful API endpoints for retrieving, creating, updating, and deleting data. This guide outlines the requirements for implementing these API endpoints.

The frontend currently uses mock data for demonstration purposes. The backend developer will need to replace these mock implementations with actual API calls to a backend server.

## Authentication

All API endpoints should be secured with authentication. The frontend application uses JWT-based authentication.

### Authentication Flow

1. User logs in via the `/api/auth/login` endpoint
2. Backend validates credentials and returns a JWT token
3. Frontend stores the token in localStorage as `phb_user`
4. Subsequent API requests include the token in the Authorization header
5. Backend validates the token for each request

### Authentication Headers

API requests will include the following headers:

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## Appointments API

The Appointments feature allows users to book, view, and manage their healthcare appointments.

### Appointment Data Models

The frontend expects appointment data in the following format:

```typescript
interface AppointmentType {
  id: string;
  date: string;  // ISO8601 format: YYYY-MM-DD
  time: string;  // Format: HH:MM (24-hour)
  duration: string;  // Format: "XX min"
  type: 'in-person' | 'phone' | 'video';
  provider: string;  // Doctor's name
  speciality: string;  // Medical specialty
  location: string;  // Clinic or virtual location
  status: 'scheduled' | 'cancelled' | 'completed' | 'missed' | 'rescheduled';
  reason?: string;  // Appointment reason
}

interface BookAppointmentRequest {
  appointmentType: string;  // Type of appointment (e.g., "Consultation", "Follow-up")
  specialtyNeeded: string;  // Medical specialty required
  preferredLanguage: string;  // Patient's language preference
  urgency: 'routine' | 'soon' | 'urgent';  // Level of urgency
  preferredDate: string;  // ISO8601 format: YYYY-MM-DD
  preferredTimeSlot: string;  // Format: "HH:MM - HH:MM"
  symptoms: string;  // Patient's symptoms
  additionalNotes?: string;  // Additional information
}

interface AppointmentConfirmation {
  appointmentId: string;
  doctorName: string;
  doctorSpecialty: string;
  location: string;
  dateConfirmed: string;  // ISO8601 format: YYYY-MM-DD
  timeConfirmed: string;  // Format: "HH:MM - HH:MM"
}
```

### Appointment Endpoints

#### 1. Get All Appointments

```
GET /api/appointments
```

**Query Parameters:**
- `status` (optional): Filter by appointment status
- `from` (optional): Start date filter (YYYY-MM-DD)
- `to` (optional): End date filter (YYYY-MM-DD)
- `limit` (optional): Number of results to return
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "appointments": [AppointmentType],
  "total": 10,
  "limit": 20,
  "offset": 0
}
```

#### 2. Get Upcoming Appointments

```
GET /api/appointments/upcoming
```

**Response:**
```json
{
  "appointments": [AppointmentType]
}
```

#### 3. Get Single Appointment

```
GET /api/appointments/:id
```

**Response:**
```json
{
  "appointment": AppointmentType
}
```

#### 4. Book New Appointment

```
POST /api/appointments
```

**Request Body:**
```json
{
  "appointment": BookAppointmentRequest
}
```

**Response:**
```json
{
  "confirmation": AppointmentConfirmation,
  "message": "Appointment booked successfully"
}
```

#### 5. Cancel Appointment

```
PUT /api/appointments/:id/cancel
```

**Request Body:**
```json
{
  "reason": "schedule_conflict"  // Optional reason for cancellation
}
```

**Response:**
```json
{
  "message": "Appointment cancelled successfully",
  "appointment": AppointmentType  // Updated appointment with status: "cancelled"
}
```

#### 6. Get Available Time Slots

```
GET /api/appointments/available-slots
```

**Query Parameters:**
- `date` (required): Date for availability check (YYYY-MM-DD)
- `specialty` (optional): Filter by specialty
- `duration` (optional): Appointment duration in minutes

**Response:**
```json
{
  "availableSlots": ["09:00 - 09:30", "09:45 - 10:15", ...]
}
```

### Doctor Matching Service

The system includes an automatic doctor matching capability. This service should:

1. Match patients with doctors based on:
   - Language preference
   - Medical specialty
   - Availability
   - Appointment urgency

2. Implement the following endpoint:

```
POST /api/appointments/match-doctor
```

**Request Body:**
```json
{
  "specialtyNeeded": "Cardiology",
  "preferredLanguage": "Spanish",
  "urgency": "soon",
  "preferredDate": "2025-05-15"
}
```

**Response:**
```json
{
  "matches": [
    {
      "doctorId": "doc123",
      "doctorName": "Dr. Maria Rodriguez",
      "specialty": "Cardiology",
      "languages": ["English", "Spanish"],
      "availableSlots": ["09:00 - 09:30", "09:45 - 10:15"],
      "matchScore": 98  // Percentage match based on criteria
    },
    ...
  ]
}
```

#### Matching Algorithm Considerations

The doctor matching algorithm should consider the following factors:

1. **Specialty match** (primary requirement)
2. **Language match** (weighted heavily)
3. **Availability match** (consider urgency vs. available slots)
4. **Location proximity** (if applicable)
5. **Patient history** (previous doctor relationships)

For emergency appointments (urgency = "urgent"), prioritize availability within 24-48 hours over other factors.

## Test Results API

The Test Results feature allows users to view their medical test results.

### Test Results Data Models

The frontend expects test results data in the following format:

```typescript
interface TestResultType {
  id: string;
  date: string;  // ISO8601 format: YYYY-MM-DD
  testName: string;
  testType: string;
  orderedBy: string;  // Ordering physician
  status: 'completed' | 'pending' | 'cancelled';
  results?: {
    name: string;  // Test name
    value: string;  // Result value
    unit?: string;  // Unit of measurement
    normalRange?: string;  // Normal range for test
    isNormal: boolean;  // Whether result is within normal range
  }[];
  summary?: string;  // Summary of results
  notes?: string;  // Additional notes from provider
}
```

### Test Results Endpoints

#### 1. Get All Test Results

```
GET /api/test-results
```

**Query Parameters:**
- `status` (optional): Filter by result status
- `from` (optional): Start date filter (YYYY-MM-DD)
- `to` (optional): End date filter (YYYY-MM-DD)
- `type` (optional): Filter by test type
- `limit` (optional): Number of results to return
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "testResults": [TestResultType],
  "total": 15,
  "limit": 20,
  "offset": 0
}
```

#### 2. Get Recent Test Results

```
GET /api/test-results/recent
```

**Response:**
```json
{
  "testResults": [TestResultType]
}
```

#### 3. Get Single Test Result

```
GET /api/test-results/:id
```

**Response:**
```json
{
  "testResult": TestResultType
}
```

#### 4. Get Test Result PDF

```
GET /api/test-results/:id/pdf
```

**Response:**
PDF file as binary data with appropriate HTTP headers.

#### 5. Search Test Results

```
GET /api/test-results/search
```

**Query Parameters:**
- `query` (required): Search term
- `from` (optional): Start date filter (YYYY-MM-DD)
- `to` (optional): End date filter (YYYY-MM-DD)
- `limit` (optional): Number of results to return
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "testResults": [TestResultType],
  "total": 5,
  "limit": 20,
  "offset": 0
}
```

## Error Handling

API responses should use appropriate HTTP status codes and include detailed error messages when applicable.

### Error Response Format

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "The requested appointment does not exist",
    "details": {
      "appointmentId": "invalid-id"
    }
  }
}
```

### Common Error Codes

- `UNAUTHORIZED`: Authentication failure
- `FORBIDDEN`: Permission denied
- `RESOURCE_NOT_FOUND`: Requested resource doesn't exist
- `VALIDATION_ERROR`: Invalid input data
- `CONFLICT`: Resource conflict (e.g., time slot already booked)
- `INTERNAL_ERROR`: Server error

## Testing The Integration

Frontend components are designed to integrate with these API endpoints.

### Frontend API Integration Files

To connect the frontend to your actual API, you'll need to modify the following files:

1. For Appointments:
   - Create a new service file: `src/services/appointmentService.ts`
   - Replace mock data in `src/features/health/Appointments.tsx`
   - Update API calls in `src/features/health/BookAppointment.tsx`
   - Update API calls in `src/features/health/ViewAppointments.tsx`

2. For Test Results:
   - Create a new service file: `src/services/testResultsService.ts`
   - Replace mock data in `src/features/health/TestResults.tsx`

### Example API Service Implementation

Here's an example of an API service for appointments:

```typescript
// src/services/appointmentService.ts
import { API_BASE_URL } from '../config';
import { AppointmentType, BookAppointmentRequest } from '../types';

// Helper function to get auth token
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('phb_user') || '{}');
  return {
    'Authorization': `Bearer ${user.token}`,
    'Content-Type': 'application/json'
  };
};

export const appointmentService = {
  // Get upcoming appointments
  getUpcomingAppointments: async (): Promise<AppointmentType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/appointments/upcoming`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message || 'Failed to fetch appointments');
    }

    const data = await response.json();
    return data.appointments;
  },

  // Book new appointment
  bookAppointment: async (appointmentData: BookAppointmentRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ appointment: appointmentData })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message || 'Failed to book appointment');
    }

    return await response.json();
  },

  // Add other appointment API methods here
};
```

## Deployment Considerations

### CORS Configuration

Ensure your backend API has proper CORS (Cross-Origin Resource Sharing) configuration to allow requests from the frontend domain:

```
Access-Control-Allow-Origin: https://your-frontend-domain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Environment Configuration

The frontend should use environment variables to configure the API base URL:

- Development: `http://localhost:8000`
- Production: `https://api.your-domain.com`

### Health Check Endpoint

Implement a health check endpoint to verify API availability:

```
GET /api/health
```

**Response:**
```json
{
  "status": "ok",
  "version": "1.0.0",
  "environment": "production"
}
```

---

This guide provides the foundation for implementing backend services that integrate with the PHB frontend application. Adjust the API design as needed to match your specific backend architecture and requirements.
