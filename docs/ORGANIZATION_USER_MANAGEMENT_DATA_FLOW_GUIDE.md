# Organization User Management Data Flow Guide

## Overview

This document provides a comprehensive guide to understanding how the Organization User Management feature works, including the data flow from database to frontend, field mappings, and troubleshooting tips.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Organizational Hierarchy Concept](#organizational-hierarchy-concept)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [Data Flow](#data-flow)
6. [Field Mappings](#field-mappings)
7. [Authentication](#authentication)
8. [Frontend Components](#frontend-components)
9. [Common Issues & Debugging](#common-issues--debugging)
10. [Testing Guide](#testing-guide)

---

## System Architecture

The Organization User Management system displays "high-level individuals within the organization" - specifically hospital administrators and department heads. It follows a three-tier architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  UserManagementPage.tsx → userManagementService.ts          │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP-only Cookies
                           │ GET /api/hospitals/admin/users/
┌──────────────────────────▼──────────────────────────────────┐
│                        Backend API                           │
│  HospitalAdminUsersView (hospital_admin_management.py)      │
└──────────────────────────┬──────────────────────────────────┘
                           │ Django ORM Queries
┌──────────────────────────▼──────────────────────────────────┐
│                        Database                              │
│  HospitalAdmin ←→ Department (Many-to-One)                  │
│  HospitalAdmin ←→ CustomUser (One-to-One)                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Organizational Hierarchy Concept

The system implements a flexible organizational hierarchy with two types of administrators:

### 1. General Administrators (`department=null`)
- Manage the entire organization
- No specific department assignment
- Have broad organizational responsibilities
- Display as "Organization Administrator" in the UI

### 2. Department Heads (`department` assigned)
- Lead specific departments (IT, HR, Finance, Medical, Pharmacy, etc.)
- Each admin leads at most ONE department
- Multiple admins can co-lead the same department (Many-to-One relationship)
- Display as "{Department Name} Head" in the UI (e.g., "IT Department Head")

### Department Types

The system supports the following department types:

**Clinical Departments:**
- Medical Department
- Surgical Department
- Emergency Department
- Critical Care
- Outpatient Clinic

**Support Departments:**
- Laboratory
- Radiology
- Pharmacy
- Physiotherapy

**Administrative Departments:**
- Administration
- Medical Records
- Information Technology
- Human Resources
- Finance & Accounting
- Operations & Facilities

---

## Database Schema

### HospitalAdmin Model

Located at: `/Users/new/Newphb/basebackend/api/models/medical/hospital_auth.py`

```python
class HospitalAdmin(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    hospital = models.ForeignKey('Hospital', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    contact_email = models.EmailField(blank=True, null=True)
    department = models.ForeignKey(
        'Department',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='heads',
        help_text="Department this admin leads (null for general org admins)"
    )
```

### Department Model

Located at: `/Users/new/Newphb/basebackend/api/models/medical/department.py`

```python
class Department(TimestampedModel):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    department_type = models.CharField(
        max_length=20,
        choices=DEPARTMENT_TYPES
    )
    hospital = models.ForeignKey(
        'api.Hospital',
        on_delete=models.CASCADE,
        related_name='departments'
    )
```

### Relationship Diagram

```
Hospital (1) ←──── (Many) HospitalAdmin
                           ↓ (One-to-One)
                      CustomUser

Department (1) ←──── (Many) HospitalAdmin
    ↓
Hospital (1)
```

**Key Points:**
- **Many-to-One**: Multiple admins can head the same department
- **One-to-One**: Each admin has exactly one CustomUser account
- **Nullable FK**: `department` can be null for general admins

---

## API Endpoints

### GET `/api/hospitals/admin/users/`

**Purpose**: List all administrators at the authenticated admin's hospital

**Authentication**: HTTP-only cookies (secure session-based auth)

**Request**:
```bash
GET /api/hospitals/admin/users/
Cookie: sessionid=<session-id>
```

**Response Format**:
```json
{
  "users": [
    {
      "id": 1,
      "user_id": 123,
      "email": "admin@hospital.com",
      "full_name": "John Doe",
      "role": "hospital_admin",
      "status": "active",
      "department": {
        "id": 5,
        "name": "Information Technology",
        "type": "it",
        "code": "IT-001"
      },
      "position": "Chief Information Officer",
      "phone": "+1234567890",
      "last_login": "2025-01-10T14:30:00Z",
      "joined_date": "2024-01-01T00:00:00Z",
      "is_general_admin": false,
      "is_department_head": true
    }
  ],
  "summary": {
    "total_admins": 5,
    "general_admins": 2,
    "department_heads": 3
  }
}
```

**Authorization Logic**:
1. User must be authenticated (HTTP-only cookie session)
2. User role must be `'hospital_admin'`
3. User can only see admins at their own hospital
4. Data is filtered by `hospital_id` from the admin's profile

---

## Data Flow

### Step-by-Step Flow

```
┌────────────────────────────────────────────────────────────────┐
│ 1. User navigates to /organization/settings/users              │
└────────────────┬───────────────────────────────────────────────┘
                 │
┌────────────────▼───────────────────────────────────────────────┐
│ 2. UserManagementPage.tsx calls fetchUsers()                   │
└────────────────┬───────────────────────────────────────────────┘
                 │
┌────────────────▼───────────────────────────────────────────────┐
│ 3. userManagementService.listUsers() makes API call            │
│    - Endpoint: /api/hospitals/admin/users/                     │
│    - Method: GET                                                │
│    - Credentials: include (HTTP-only cookies)                  │
└────────────────┬───────────────────────────────────────────────┘
                 │
┌────────────────▼───────────────────────────────────────────────┐
│ 4. HospitalAdminUsersView.get() processes request              │
│    a. Verify user is authenticated                             │
│    b. Verify user.role == 'hospital_admin'                     │
│    c. Get admin's HospitalAdmin profile                        │
│    d. Extract hospital_id from profile                         │
└────────────────┬───────────────────────────────────────────────┘
                 │
┌────────────────▼───────────────────────────────────────────────┐
│ 5. Query database for all admins at the hospital               │
│    HospitalAdmin.objects.filter(hospital=hospital_id)          │
│      .select_related('user', 'department')                     │
└────────────────┬───────────────────────────────────────────────┘
                 │
┌────────────────▼───────────────────────────────────────────────┐
│ 6. Serialize data (for each admin):                            │
│    - Build department object (if department exists)            │
│    - Calculate is_general_admin (department is null)           │
│    - Calculate is_department_head (department is not null)     │
│    - Format dates (ISO 8601 format)                            │
└────────────────┬───────────────────────────────────────────────┘
                 │
┌────────────────▼───────────────────────────────────────────────┐
│ 7. Return JSON response with users array and summary           │
└────────────────┬───────────────────────────────────────────────┘
                 │
┌────────────────▼───────────────────────────────────────────────┐
│ 8. Frontend receives data and updates state                    │
│    - setUsers(data.users)                                      │
│    - setStats(data.summary)                                    │
└────────────────┬───────────────────────────────────────────────┘
                 │
┌────────────────▼───────────────────────────────────────────────┐
│ 9. UI renders with real data:                                  │
│    - Stats cards show total/general/department head counts     │
│    - Table displays users with department info                 │
│    - Role shows "Organization Administrator" or "{Dept} Head"  │
└────────────────────────────────────────────────────────────────┘
```

---

## Field Mappings

### Backend to Frontend Mapping

| Backend Source | Backend Field | Frontend Field | Transformation |
|----------------|---------------|----------------|----------------|
| HospitalAdmin | `id` | `id` | Direct mapping |
| CustomUser | `id` | `user_id` | Direct mapping |
| HospitalAdmin | `email` | `email` | Direct mapping |
| HospitalAdmin | `name` | `full_name` | Direct mapping |
| CustomUser | `role` | `role` | Always `'hospital_admin'` |
| CustomUser | `is_active` | `status` | `'active'` if true, else `'inactive'` |
| Department | `id`, `name`, `type`, `code` | `department` | Nested object (null if no department) |
| HospitalAdmin | `position` | `position` | Direct mapping |
| CustomUser | `phone` | `phone` | Direct mapping (empty string if null) |
| CustomUser | `last_login` | `last_login` | ISO 8601 format (null if never logged in) |
| CustomUser | `date_joined` | `joined_date` | ISO 8601 format |
| HospitalAdmin | `department` | `is_general_admin` | `true` if department is null |
| HospitalAdmin | `department` | `is_department_head` | `true` if department is not null |

### Example Transformation

**Backend Data:**
```python
{
    'id': 1,
    'user': CustomUser(id=123, email='admin@hospital.com', role='hospital_admin', is_active=True),
    'name': 'John Doe',
    'position': 'CIO',
    'email': 'admin@hospital.com',
    'department': Department(id=5, name='Information Technology', type='it', code='IT-001')
}
```

**Frontend Data:**
```typescript
{
  id: 1,
  user_id: 123,
  email: 'admin@hospital.com',
  full_name: 'John Doe',
  role: 'hospital_admin',
  status: 'active',
  department: {
    id: 5,
    name: 'Information Technology',
    type: 'it',
    code: 'IT-001'
  },
  position: 'CIO',
  phone: '',
  last_login: '2025-01-10T14:30:00Z',
  joined_date: '2024-01-01T00:00:00Z',
  is_general_admin: false,
  is_department_head: true
}
```

---

## Authentication

### HTTP-Only Cookie Authentication

The system uses **HTTP-only cookies** for secure session-based authentication, following the same pattern as the Organization Profile feature.

#### Why HTTP-Only Cookies?

1. **Security**: Cookies are not accessible via JavaScript (prevents XSS attacks)
2. **Automatic**: Browser automatically includes cookies in requests
3. **CSRF Protection**: Django's CSRF middleware protects against CSRF attacks
4. **Session Management**: Server-side session management for better control

#### Frontend Configuration

```typescript
const response = await fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include', // ⭐ Important: Include cookies in request
});
```

#### Backend Configuration

```python
# Authentication check in view
user = request.user
if not user.is_authenticated:
    return Response(
        {"error": "Authentication required"},
        status=status.HTTP_401_UNAUTHORIZED
    )

if user.role != 'hospital_admin':
    return Response(
        {"error": "Only hospital administrators can access this endpoint"},
        status=status.HTTP_403_FORBIDDEN
    )
```

#### Login Flow

Before accessing the user management page, the admin must:

1. **Login**: POST to `/api/hospitals/admin/login/` with email and password
2. **2FA Verification**: POST to `/api/hospitals/admin/verify-2fa/` with OTP code
3. **Session Established**: HTTP-only session cookie is set
4. **Access Protected Routes**: Cookie automatically included in all subsequent requests

---

## Frontend Components

### File: `/Users/new/phbfinal/phbfrontend/src/pages/organization/settings/UserManagementPage.tsx`

**Key Features:**
- Displays list of hospital administrators
- Shows stats (total admins, general admins, department heads)
- Filters by type (all, general admins, department heads) and status
- Search functionality
- Visual indicators for department heads

**Helper Function:**
```typescript
const getRoleDisplayName = (user: OrganizationUser): string => {
  if (user.is_department_head && user.department) {
    return `${user.department.name} Head`;
  }
  return 'Organization Administrator';
};
```

### File: `/Users/new/phbfinal/phbfrontend/src/services/userManagementService.ts`

**Key Interfaces:**
```typescript
export interface OrganizationUser {
  id: number;
  user_id: number;
  email: string;
  full_name: string;
  role: 'hospital_admin';
  status: 'active' | 'inactive';
  department?: {
    id: number;
    name: string;
    type: string;
    code: string;
  } | null;
  position: string;
  phone: string;
  last_login: string | null;
  joined_date: string | null;
  is_general_admin: boolean;
  is_department_head: boolean;
}

export interface UserListResponse {
  users: OrganizationUser[];
  summary: {
    total_admins: number;
    general_admins: number;
    department_heads: number;
  };
}
```

---

## Common Issues & Debugging

### Issue 1: "Failed to load users. Please try again."

**Symptoms:**
- Error message displayed on page
- Console shows network error or 401/403 status

**Possible Causes & Solutions:**

1. **Not Authenticated**
   - **Cause**: Session cookie expired or not set
   - **Solution**: Re-login via `/organization/login`
   - **Check**: Look for `sessionid` cookie in browser DevTools → Application → Cookies

2. **Wrong User Role**
   - **Cause**: User is not a hospital admin
   - **Solution**: Ensure user has `role='hospital_admin'` in CustomUser model
   - **Check**: Query database: `SELECT role FROM api_customuser WHERE id=<user_id>`

3. **CORS Issues**
   - **Cause**: Frontend and backend on different domains without proper CORS config
   - **Solution**: Check Django CORS settings in `settings.py`
   - **Check**: Browser console for CORS errors

4. **HospitalAdmin Profile Not Found**
   - **Cause**: User has `role='hospital_admin'` but no HospitalAdmin record
   - **Solution**: Create HospitalAdmin record for the user
   - **Check**: Query database: `SELECT * FROM api_hospitaladmin WHERE user_id=<user_id>`

### Issue 2: Department Info Not Showing

**Symptoms:**
- Department column shows "N/A" for all users
- Department heads show as "Organization Administrator"

**Possible Causes & Solutions:**

1. **Department Field is Null**
   - **Cause**: Admin has no department assigned
   - **Solution**: Assign department in Django admin or via migration
   - **Check**: `SELECT department_id FROM api_hospitaladmin WHERE id=<admin_id>`

2. **Department Not Found**
   - **Cause**: Department ID exists but department record deleted
   - **Solution**: Create department record or set department to null
   - **Check**: `SELECT * FROM api_department WHERE id=<department_id>`

3. **Backend Serialization Error**
   - **Cause**: Department object not being serialized correctly
   - **Solution**: Check `hospital_admin_management.py` serialization logic
   - **Check**: Test API endpoint directly with curl

### Issue 3: Empty User List

**Symptoms:**
- Page loads successfully but shows no users
- Stats show 0 for all categories

**Possible Causes & Solutions:**

1. **No Admins at Hospital**
   - **Cause**: Hospital has no HospitalAdmin records
   - **Solution**: Create admin records for the hospital
   - **Check**: `SELECT COUNT(*) FROM api_hospitaladmin WHERE hospital_id=<hospital_id>`

2. **Wrong Hospital Association**
   - **Cause**: Current admin is associated with a different hospital
   - **Solution**: Verify hospital_id in admin's HospitalAdmin record
   - **Check**: Compare admin's hospital_id with expected hospital

3. **Data Not Migrated**
   - **Cause**: Database migrations not applied
   - **Solution**: Run `python manage.py migrate`
   - **Check**: Verify migration `0053_hospitaladmin_department_and_more.py` is applied

### Debugging Commands

#### Backend (Django Shell)

```python
# Enter Django shell
python manage.py shell

# Check user authentication
from api.models import CustomUser
user = CustomUser.objects.get(email='admin@hospital.com')
print(f"Role: {user.role}, Is Active: {user.is_active}")

# Check HospitalAdmin record
from api.models import HospitalAdmin
admin = HospitalAdmin.objects.get(user=user)
print(f"Hospital ID: {admin.hospital.id}")
print(f"Department: {admin.department}")

# List all admins at hospital
admins = HospitalAdmin.objects.filter(hospital=admin.hospital)
for a in admins:
    print(f"{a.name} - Department: {a.department}")

# Check departments
from api.models import Department
depts = Department.objects.filter(hospital=admin.hospital)
for d in depts:
    print(f"{d.name} ({d.department_type})")
```

#### Frontend (Browser Console)

```javascript
// Check cookies
document.cookie

// Test API call manually
fetch('http://localhost:8000/api/hospitals/admin/users/', {
  credentials: 'include'
})
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e));

// Check OrganizationUser interface
console.log(users); // Log users state variable
```

#### curl Testing

```bash
# Login first to get session cookie
curl -s -X POST 'http://localhost:8000/api/hospitals/admin/login/' \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@hospital.com","password":"password123"}' \
  --cookie-jar cookies.txt

# Verify 2FA
curl -s -X POST 'http://localhost:8000/api/hospitals/admin/verify-2fa/' \
  -H 'Content-Type: application/json' \
  -d '{"otp":"123456"}' \
  --cookie cookies.txt \
  --cookie-jar cookies.txt

# Test users endpoint
curl -s 'http://localhost:8000/api/hospitals/admin/users/' \
  -H 'Content-Type: application/json' \
  --cookie cookies.txt | python -m json.tool
```

---

## Testing Guide

### Manual Testing Checklist

#### Backend Testing

1. **✅ Migrations Applied**
   ```bash
   python manage.py showmigrations api | grep 0053
   ```
   - Should show `[X] 0053_hospitaladmin_department_and_more`

2. **✅ Test Data Created**
   ```python
   # Create test departments
   from api.models import Department, Hospital
   hospital = Hospital.objects.get(id=1)

   it_dept = Department.objects.create(
       hospital=hospital,
       name='Information Technology',
       code='IT-001',
       department_type='it',
       floor_number='3',
       wing='north',
       extension_number='3001',
       emergency_contact='+1234567890',
       email='it@hospital.com'
   )

   hr_dept = Department.objects.create(
       hospital=hospital,
       name='Human Resources',
       code='HR-001',
       department_type='human_resources',
       floor_number='4',
       wing='south',
       extension_number='4001',
       emergency_contact='+1234567891',
       email='hr@hospital.com'
   )
   ```

3. **✅ Assign Departments to Admins**
   ```python
   from api.models import HospitalAdmin

   # Make one admin an IT department head
   admin1 = HospitalAdmin.objects.get(id=1)
   admin1.department = it_dept
   admin1.save()

   # Make another admin an HR department head
   admin2 = HospitalAdmin.objects.get(id=2)
   admin2.department = hr_dept
   admin2.save()

   # Leave one admin as general admin (department=None)
   # admin3.department = None (default)
   ```

4. **✅ Test API Endpoint**
   ```bash
   # After logging in and getting session cookie
   curl -s 'http://localhost:8000/api/hospitals/admin/users/' \
     --cookie cookies.txt | python -m json.tool
   ```
   - Should return JSON with users array and summary object
   - Should include department objects for department heads
   - Should show department=null for general admins

#### Frontend Testing

1. **✅ Navigate to Page**
   - Go to `http://localhost:5173/organization/settings/users`
   - Page should load without errors

2. **✅ Verify Real Data Displayed**
   - Should NOT see mock data
   - Should see actual admins from database
   - Stats should show real counts

3. **✅ Verify Role Display**
   - General admins should show "Organization Administrator"
   - Department heads should show "{Department Name} Head" (e.g., "IT Department Head")
   - Department heads should have purple "Head" badge

4. **✅ Verify Department Column**
   - Should show department name for department heads
   - Should show "N/A" for general admins

5. **✅ Test Filters**
   - "All Types" should show all admins
   - "General Admins" should filter to show only admins without departments
   - "Department Heads" should filter to show only admins with departments
   - Status filter should work (Active/Inactive)

6. **✅ Test Search**
   - Type admin name or email in search box
   - Should filter results in real-time

7. **✅ Verify Stats Cards**
   - "Total Admins" should match total count
   - "General Admins" should match count of admins without departments
   - "Department Heads" should match count of admins with departments

### Automated Testing (Future)

```python
# Example test case (to be implemented)
from django.test import TestCase
from api.models import HospitalAdmin, Department, Hospital, CustomUser

class HospitalAdminUsersViewTest(TestCase):
    def setUp(self):
        # Create test hospital
        self.hospital = Hospital.objects.create(name='Test Hospital')

        # Create test user
        self.user = CustomUser.objects.create(
            email='test@hospital.com',
            role='hospital_admin'
        )

        # Create test admin
        self.admin = HospitalAdmin.objects.create(
            user=self.user,
            hospital=self.hospital,
            name='Test Admin',
            position='Administrator'
        )

    def test_list_admins_authenticated(self):
        # Login
        self.client.force_login(self.user)

        # Call endpoint
        response = self.client.get('/api/hospitals/admin/users/')

        # Verify response
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn('users', data)
        self.assertIn('summary', data)
```

---

## Additional Notes

### Security Considerations

1. **Data Isolation**: Users can only see admins at their own hospital
2. **Role-Based Access**: Only hospital admins can access this endpoint
3. **HTTP-Only Cookies**: Session tokens are not accessible via JavaScript
4. **CSRF Protection**: Django's CSRF middleware protects against CSRF attacks

### Performance Optimizations

1. **select_related()**: Used to reduce database queries by joining related tables
2. **Pagination**: Can be added for hospitals with many admins (future enhancement)
3. **Caching**: Consider caching department data if it doesn't change frequently

### Future Enhancements

1. **User Invitation System**: Allow admins to invite new department heads
2. **Department Assignment UI**: Interface to assign/reassign department leadership
3. **Permission Management**: Define granular permissions for each department head
4. **Audit Logs**: Track changes to admin roles and departments
5. **Bulk Operations**: Activate/deactivate multiple admins at once

---

## Summary

The Organization User Management feature implements a flexible organizational hierarchy system that distinguishes between general administrators and department heads. It uses HTTP-only cookie authentication for security and follows a clear data flow from database through API to frontend.

**Key Takeaways:**
- ✅ Two types of admins: General (department=null) and Department Heads (department assigned)
- ✅ Many-to-One relationship: Multiple admins can co-lead same department
- ✅ HTTP-only cookies for secure authentication
- ✅ Comprehensive field mapping between backend and frontend
- ✅ Clear role display: "Organization Administrator" vs "{Department} Head"

**For Support:**
- Backend issues: Check Django logs and database queries
- Frontend issues: Check browser console and network tab
- Authentication issues: Verify session cookies and user role

---

**Document Version**: 1.0
**Last Updated**: December 2024
**Author**: PHB Development Team
