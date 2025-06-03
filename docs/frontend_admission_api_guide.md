# Frontend Integration Guide: Patient Admission System

This document provides comprehensive guidance for frontend developers on integrating with the patient admission API. It covers patient admission workflows, department and doctor selection, and security requirements.

**Last Updated:** June 3, 2025

## Table of Contents
1. [Authentication Requirements](#authentication-requirements)
2. [API Endpoints Overview](#api-endpoints-overview)
3. [Department and Doctor Selection](#department-and-doctor-selection)
4. [Patient Admission Workflows](#patient-admission-workflows)
5. [Security Considerations](#security-considerations)
6. [Frontend Implementation Guidelines](#frontend-implementation-guidelines)

## Authentication Requirements

All API requests must include proper authentication:

```javascript
// Example request with authentication
const response = await fetch('/api/departments/', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

Different user roles have different access levels:
- **Hospital Admins**: Full access to hospital data (requires hospital code verification)
- **Doctors**: Access to patient data and departments they work in
- **Nurses**: Access to assigned departments and patients
- **Front Desk Staff**: Access to admission creation and patient lookup

## API Endpoints Overview

### Hospital Information

#### Get Hospital Details
```
GET /api/hospitals/{hospital_id}/
```

Response:
```json
{
  "id": "123",
  "name": "St. Nicholas Hospital",
  "address": "123 Hospital Road",
  "city": "Lagos",
  "state": "Lagos State",
  "country": "Nigeria",
  "email": "contact@stnicholas.example.com",
  "phone": "+2341234567890",
  "hospital_type": "General",
  "registration_number": "H-a7f3dc9e",
  "total_departments": 6,
  "total_beds": 145,
  "available_beds": 145
}
```

### Department and Doctor Selection

#### List Departments with Available Beds
```
GET /api/hospitals/{hospital_id}/departments/?available_beds=true
```

Response:
```json
{
  "count": 6,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "101",
      "name": "Emergency Department",
      "total_beds": 15,
      "occupied_beds": 0,
      "available_beds": 15,
      "department_type": "emergency",
      "floor": "Ground Floor",
      "extension_number": "1001",
      "head_doctor_name": "Dr. James Wilson",
      "min_staff_required": 5,
      "current_staff_count": 12
    },
    {
      "id": "102",
      "name": "Cardiology",
      "total_beds": 20,
      "occupied_beds": 0,
      "available_beds": 20,
      "department_type": "specialty",
      "floor": "2nd Floor",
      "extension_number": "2001",
      "head_doctor_name": "Dr. Sarah Johnson",
      "min_staff_required": 4,
      "current_staff_count": 8
    },
    // Additional departments...
  ]
}
```

#### List Doctors by Department
```
GET /api/hospitals/{hospital_id}/doctors/?department_id={department_id}
```

Response:
```json
{
  "count": 3,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "201",
      "user": {
        "id": "301",
        "first_name": "Ninioritse",
        "last_name": "Eruwa",
        "full_name": "Ninioritse Great Eruwa"
      },
      "specialization": "Cardiology",
      "license_number": "MED-12345",
      "position": "Senior Consultant",
      "available_for_admission": true,
      "current_patient_count": 5
    },
    // Additional doctors...
  ]
}
```

#### List All Available Doctors
```
GET /api/hospitals/{hospital_id}/doctors/?available_for_admission=true
```

### Patient Admission Workflows

#### 1. Check if Patient is Registered

```
GET /api/patients/search/?query={patient_name_or_hpn}
```

Response:
```json
{
  "count": 1,
  "results": [
    {
      "id": "401",
      "first_name": "Bethel",
      "last_name": "Akande",
      "hpn": "OGB 295 047 5384",
      "date_of_birth": "2007-06-15",
      "gender": "female",
      "city": "Ogbomosho",
      "phone": "+2341234567890",
      "is_registered": true,
      "hospital_registrations": [
        {
          "hospital_id": "123",
          "hospital_name": "St. Nicholas Hospital",
          "is_primary": true,
          "registration_date": "2023-05-10"
        }
      ]
    }
  ]
}
```

#### 2. Create Admission for Registered Patient

```
POST /api/admissions/
```

Request Body:
```json
{
  "patient_id": "401",
  "hospital_id": "123",
  "department_id": "102",
  "reason_for_admission": "Acute abdominal pain, suspected appendicitis",
  "admission_type": "inpatient",
  "priority": "urgent",
  "attending_doctor_id": "201",
  "expected_discharge_date": "2025-06-06",
  "diagnosis": "Suspected acute appendicitis",
  "acuity_level": 2,
  "is_icu_bed": false,
  "additional_notes": "Patient reports pain began 6 hours ago"
}
```

Response:
```json
{
  "id": "501",
  "admission_id": "ADM-250603-AAIL",
  "patient_name": "Bethel Akande",
  "hospital_name": "St. Nicholas Hospital",
  "department_name": "Cardiology",
  "status": "pending",
  "bed_identifier": "Room CAR-101",
  "attending_doctor_name": "Ninioritse Great Eruwa",
  "admission_date": "2025-06-03T13:30:00Z",
  "expected_discharge_date": "2025-06-06",
  "registration_status": "complete"
}
```

#### 3. Create Emergency Admission for Unregistered Patient

```
POST /api/admissions/emergency_admission/
```

Request Body:
```json
{
  "hospital_id": "123",
  "department_id": "101",
  "attending_doctor_id": "201",
  "admission_type": "emergency",
  "priority": "emergency",
  "reason_for_admission": "Chest pain and shortness of breath",
  "diagnosis": "Suspected acute coronary syndrome",
  "acuity_level": 2,
  "expected_discharge_date": "2025-06-05",
  "temp_patient_details": {
    "first_name": "John",
    "last_name": "Doe",
    "gender": "male",
    "age": 35,
    "date_of_birth": "1990-05-15",
    "phone_number": "+1234567890",
    "city": "Lagos",
    "address": "123 Main St, Lagos, Nigeria",
    "emergency_contact": "+1987654321",
    "emergency_contact_name": "Jane Doe",
    "emergency_contact_relationship": "Spouse",
    "chief_complaint": "Chest pain and shortness of breath",
    "allergies": ["Penicillin"],
    "current_medications": ["None"],
    "brief_history": "No known cardiac history. Started experiencing pain 2 hours ago.",
    "vitals": {
      "blood_pressure": "140/90",
      "heart_rate": 92,
      "temperature": 37.8,
      "respiratory_rate": 20,
      "oxygen_saturation": 95
    }
  }
}
```

Response:
```json
{
  "id": "502",
  "admission_id": "ADM-250603-BJ7Y",
  "temp_patient_id": "TEMP-250603-K8M1",
  "patient_name": "John Doe",
  "hospital_name": "St. Nicholas Hospital",
  "department_name": "Emergency Department",
  "status": "pending",
  "bed_identifier": "Room EME-101",
  "attending_doctor_name": "Ninioritse Great Eruwa",
  "admission_date": "2025-06-03T13:30:00Z",
  "expected_discharge_date": "2025-06-05",
  "registration_status": "pending",
  "message": "Emergency admission created successfully. Patient should be registered when stable."
}
```

#### 4. Admit Patient

```
PUT /api/admissions/{admission_id}/admit/
```

Response:
```json
{
  "id": "501",
  "admission_id": "ADM-250603-AAIL",
  "patient_name": "Bethel Akande",
  "status": "admitted",
  "department_name": "Cardiology",
  "bed_identifier": "Room CAR-101",
  "admission_date": "2025-06-03T13:30:00Z"
}
```

#### 5. Convert Emergency Patient to Registered User

```
POST /api/admissions/{admission_id}/complete_registration/
```

Request Body:
```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "date_of_birth": "1990-05-15",
  "address": "123 Main St, Lagos, Nigeria",
  "city": "Lagos",
  "state": "Lagos State",
  "country": "Nigeria"
}
```

Response:
```json
{
  "message": "Patient successfully registered",
  "user_id": "402",
  "hpn": "LAG 588 721 9032",
  "admission_id": "ADM-250603-BJ7Y",
  "registration_status": "complete"
}
```

#### 6. Discharge Patient

```
PUT /api/admissions/{admission_id}/discharge/
```

Request Body:
```json
{
  "destination": "Home",
  "summary": "Patient stabilized. Symptoms resolved with treatment.",
  "followup": "Follow-up with cardiology clinic in 1 week."
}
```

Response:
```json
{
  "id": "501",
  "admission_id": "ADM-250603-AAIL",
  "patient_name": "Bethel Akande",
  "status": "discharged",
  "discharge_date": "2025-06-03T15:45:00Z",
  "length_of_stay_days": 0.1,
  "discharge_summary": "Patient stabilized. Symptoms resolved with treatment.",
  "followup_instructions": "Follow-up with cardiology clinic in 1 week."
}
```

### 7. Track Admission Status

```
GET /api/admissions/{admission_id}/
```

Response:
```json
{
  "id": "501",
  "admission_id": "ADM-250603-AAIL",
  "patient": {
    "id": "401",
    "name": "Bethel Akande",
    "hpn": "OGB 295 047 5384"
  },
  "hospital": {
    "id": "123",
    "name": "St. Nicholas Hospital"
  },
  "department": {
    "id": "102",
    "name": "Cardiology"
  },
  "status": "admitted",
  "admission_type": "inpatient",
  "priority": "urgent",
  "reason_for_admission": "Acute abdominal pain, suspected appendicitis",
  "is_icu_bed": false,
  "bed_identifier": "Room CAR-101",
  "attending_doctor": {
    "id": "201",
    "name": "Ninioritse Great Eruwa",
    "specialization": "Cardiology"
  },
  "admission_date": "2025-06-03T13:30:00Z",
  "expected_discharge_date": "2025-06-06",
  "diagnosis": "Suspected acute appendicitis",
  "acuity_level": 2
}
```

## Security Considerations

### Hospital Admin Security
- Hospital admins must verify their hospital code during login
- All admin actions are subject to 2FA verification
- The system uses dual-email security:
  - Login email: admin.hospitalname@example.com
  - Contact email: Real email for notifications
- Domain validation is enforced for hospital email addresses

### Patient Data Security
- All requests must include proper authorization headers
- Rate limiting is in place (3 failed attempts trigger IP-based limiting)
- Account lockout occurs after 5 failed attempts (15 minutes)
- All actions on patient records are logged for audit purposes

## Frontend Implementation Guidelines

### Recommended Workflow for Patient Admission

1. **Initial Patient Search**
   - Search for patient by name, HPN, or phone number
   - Determine if patient is registered or needs emergency admission

2. **Department Selection**
   - Display departments with available beds
   - Show bed availability counts
   - Include department details (floor, extension number, etc.)
   - Sort by most available beds or most relevant to patient condition

3. **Doctor Selection**
   - After department selection, filter doctors by selected department
   - Show doctor availability and current patient load
   - Display doctor specialization and qualifications
   - Allow sorting by availability or specialization

4. **Admission Form**
   - Pre-populate fields for registered patients
   - For emergency admissions, collect all required fields with clear validation
   - Provide dropdown for admission type and priority
   - Show bed availability in real-time

5. **Security Validation**
   - Implement required security checks based on user role
   - For hospital admins, ensure hospital code verification
   - Enforce 2FA for sensitive operations
   - Comply with domain validation requirements

### UI/UX Recommendations

1. **Dashboard View**
   - Show hospital capacity overview
   - Display departments with color-coded bed availability
   - Provide quick access to admission creation

2. **Patient Search**
   - Implement typeahead search with real-time results
   - Display patient HPN prominently for verification
   - Show patient's registration status with the hospital

3. **Admission Process**
   - Use a multi-step wizard for complex admission flows
   - Provide clear progress indicators
   - Include validation at each step before proceeding

4. **Mobile Responsiveness**
   - Ensure all forms work on mobile devices for bedside admission
   - Optimize doctor and department selection for touch interfaces
   - Support offline capabilities for emergency situations

## API Error Handling

The API returns standardized error responses:

```json
{
  "error": "Missing required personal information: first_name, phone_number",
  "error_code": "VALIDATION_ERROR",
  "status_code": 400
}
```

Common error codes:
- `VALIDATION_ERROR`: Missing or invalid fields
- `AUTHORIZATION_ERROR`: Insufficient permissions
- `AUTHENTICATION_ERROR`: Invalid or expired credentials
- `RESOURCE_NOT_FOUND`: Requested item doesn't exist
- `CAPACITY_ERROR`: No available beds in selected department

## Additional Resources

- [Hospital Creation Guide](/docs/hospital_creation_guide.md)
- [Patient Admission System Overview](/docs/patient_admission_system.md)
- [API Reference Documentation](/api/swagger/)
- [Hospital Security Protocol](/docs/hospital_security_protocol.md)
