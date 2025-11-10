# PHB Professional Registry - Testing Guide

**Server Status**: ✅ Running on `http://127.0.0.1:8000`

---

## 🎯 Quick Start - Test Right Now!

The Django development server is running and ready to test. You can use your browser, Postman, or curl commands.

---

## 🌐 Base URL

```
http://127.0.0.1:8000/api/registry/
```

---

## ✅ PUBLIC ENDPOINTS (No Authentication Required)

### 1. Get Nigerian States (36 states + FCT)

**URL**: `http://127.0.0.1:8000/api/registry/states/`

**Method**: GET

**Browser**: Just paste this URL in your browser!

**Response**:
```json
{
  "count": 37,
  "states": [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", ...
    "Lagos", "Rivers", "FCT", etc.
  ]
}
```

---

### 2. Get Professional Types

**URL**: `http://127.0.0.1:8000/api/registry/professional-types/`

**Method**: GET

**Browser**: Paste in browser

**Response**:
```json
{
  "count": 9,
  "professional_types": [
    {"value": "doctor", "display": "Medical Doctor"},
    {"value": "pharmacist", "display": "Pharmacist"},
    {"value": "nurse", "display": "Nurse"},
    ...
  ]
}
```

---

### 3. Get Specializations

**URL**: `http://127.0.0.1:8000/api/registry/specializations/`

**Method**: GET

**Optional Query Param**: `?professional_type=doctor` (filters by type)

**Browser**:
- All: `http://127.0.0.1:8000/api/registry/specializations/`
- Doctors only: `http://127.0.0.1:8000/api/registry/specializations/?professional_type=doctor`

---

### 4. Search Professional Registry (Public)

**URL**: `http://127.0.0.1:8000/api/registry/search/`

**Method**: GET

**Query Parameters**:
- `name` - Professional's name (first or last)
- `license_number` - PHB license number
- `professional_type` - doctor, pharmacist, etc.
- `specialization` - Specialty
- `city` - City in Nigeria
- `state` - Nigerian state
- `license_status` - active (default), suspended, etc.
- `page` - Page number (default: 1)
- `per_page` - Results per page (default: 20)

**Examples**:

**Search by state**:
```
http://127.0.0.1:8000/api/registry/search/?state=Lagos
```

**Search by professional type**:
```
http://127.0.0.1:8000/api/registry/search/?professional_type=doctor
```

**Search by name**:
```
http://127.0.0.1:8000/api/registry/search/?name=Okafor
```

**Combined search** (doctor in Lagos):
```
http://127.0.0.1:8000/api/registry/search/?professional_type=doctor&state=Lagos
```

**Current Response** (empty because no professionals registered yet):
```json
{
  "count": 0,
  "page": 1,
  "per_page": 20,
  "total_pages": 0,
  "results": []
}
```

---

### 5. Verify Professional License

**URL**: `http://127.0.0.1:8000/api/registry/verify/<license_number>/`

**Method**: GET

**Example**:
```
http://127.0.0.1:8000/api/registry/verify/PHB-DOC-2025-00001/
```

**Current Response** (404 because no licenses issued yet):
```json
{
  "verified": false,
  "message": "No professional found with license number PHB-DOC-2025-00001. Please verify the license number and try again."
}
```

---

### 6. Get Registry Statistics

**URL**: `http://127.0.0.1:8000/api/registry/statistics/`

**Method**: GET

**Browser**: `http://127.0.0.1:8000/api/registry/statistics/`

**Current Response** (all zeros because no professionals yet):
```json
{
  "total_active_professionals": 0,
  "total_registered_professionals": 0,
  "professionals_by_type": {},
  "top_states_by_professionals": [],
  "last_updated": "2025-11-02T..."
}
```

---

## 🔒 PROFESSIONAL ENDPOINTS (Authentication Required)

**NOTE**: These require user authentication (login with JWT token or session cookie)

### 1. List My Applications

**URL**: `http://127.0.0.1:8000/api/registry/applications/`

**Method**: GET

**Authentication**: Required (JWT Bearer token or session cookie)

**cURL Example**:
```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://127.0.0.1:8000/api/registry/applications/
```

---

### 2. Create New Application

**URL**: `http://127.0.0.1:8000/api/registry/applications/`

**Method**: POST

**Authentication**: Required

**Body** (JSON):
```json
{
  "professional_type": "doctor",
  "title": "Dr",
  "first_name": "Chidi",
  "middle_name": "Emeka",
  "last_name": "Okafor",
  "date_of_birth": "1990-05-15",
  "gender": "male",
  "nationality": "Nigerian",
  "email": "chidi.okafor@example.com",
  "phone": "+2348021234567",
  "alternate_phone": "",
  "address_line_1": "123 Victoria Island Road",
  "address_line_2": "Apartment 4B",
  "city": "Lagos",
  "state": "Lagos",
  "postcode": "101001",
  "country": "Nigeria",
  "primary_qualification": "MBBS",
  "qualification_institution": "University of Lagos",
  "qualification_year": 2015,
  "qualification_country": "Nigeria",
  "additional_qualifications": [
    {
      "degree": "Fellowship in Internal Medicine",
      "institution": "West African College of Physicians",
      "year": 2020
    }
  ],
  "specialization": "internal_medicine",
  "subspecialization": "Cardiology",
  "home_registration_body": "Medical and Dental Council of Nigeria (MDCN)",
  "home_registration_number": "MDCN/2015/00123",
  "home_registration_date": "2015-08-01",
  "employment_history": [
    {
      "employer": "Lagos University Teaching Hospital",
      "position": "Resident Doctor",
      "from_date": "2015-09-01",
      "to_date": "2020-08-31",
      "responsibilities": "Internal medicine, patient care, clinical research"
    }
  ],
  "years_of_experience": 8,
  "reason_for_application": "Seeking PHB registration to practice in private and public healthcare settings in Nigeria",
  "practice_intentions": "I intend to work both in hospital settings and private practice, focusing on cardiology",
  "languages_spoken": "English, Igbo, Yoruba"
}
```

**cURL Example**:
```bash
curl -X POST http://127.0.0.1:8000/api/registry/applications/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d @application.json
```

**Response** (Success - 201 Created):
```json
{
  "message": "Professional application created successfully. Please complete all required fields and upload documents before submission.",
  "application": {
    "id": "uuid-here",
    "application_reference": "PHB-APP-DOC-2025-12345",
    "status": "draft",
    "professional_type": "doctor",
    ...
  }
}
```

---

### 3. Upload Documents

**URL**: `http://127.0.0.1:8000/api/registry/applications/<application_id>/documents/`

**Method**: POST

**Content-Type**: `multipart/form-data`

**Body**:
- `document_type` (required) - One of: passport, national_id, primary_degree_certificate, etc.
- `document_title` (required) - "My MBBS Certificate"
- `description` (optional) - "Bachelor of Medicine degree from University of Lagos"
- `file` (required) - PDF/JPG/PNG file
- `issue_date` (optional) - "2015-07-15"
- `expiry_date` (optional) - "2030-07-15"
- `issuing_authority` (optional) - "University of Lagos"
- `document_number` (optional) - "CERT-2015-00123"

**cURL Example**:
```bash
curl -X POST http://127.0.0.1:8000/api/registry/applications/<application_id>/documents/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "document_type=primary_degree_certificate" \
  -F "document_title=MBBS Certificate" \
  -F "description=Bachelor of Medicine degree" \
  -F "file=@/path/to/certificate.pdf" \
  -F "issue_date=2015-07-15" \
  -F "issuing_authority=University of Lagos"
```

---

### 4. Submit Application

**URL**: `http://127.0.0.1:8000/api/registry/applications/<application_id>/submit/`

**Method**: POST

**Authentication**: Required

**Body**: Empty (validation is automatic)

**Validation Checks**:
- All required fields completed
- All required documents uploaded
- Terms & conditions agreed
- Code of conduct agreed
- Declaration of truthfulness made

**cURL Example**:
```bash
curl -X POST http://127.0.0.1:8000/api/registry/applications/<application_id>/submit/ \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response** (Success):
```json
{
  "message": "Application PHB-APP-DOC-2025-12345 submitted successfully. You will receive an email confirmation shortly.",
  "application": {
    "status": "submitted",
    "submitted_date": "2025-11-02T...",
    ...
  }
}
```

**Response** (Error - Missing Documents):
```json
{
  "error": "Missing required documents: Passport, Good Standing Certificate"
}
```

---

### 5. Get Required Documents

**URL**: `http://127.0.0.1:8000/api/registry/required-documents/?professional_type=doctor`

**Method**: GET

**Query Params**: `professional_type` (required)

**Browser**: `http://127.0.0.1:8000/api/registry/required-documents/?professional_type=doctor`

**Response**:
```json
{
  "professional_type": "doctor",
  "required_documents": [
    {"document_type": "passport", "display_name": "Passport"},
    {"document_type": "primary_degree_certificate", "display_name": "Primary Degree Certificate"},
    {"document_type": "transcript", "display_name": "Academic Transcript"},
    {"document_type": "cv_resume", "display_name": "CV/Resume"},
    {"document_type": "passport_photo", "display_name": "Passport Photograph"},
    {"document_type": "proof_of_address", "display_name": "Proof Of Address"},
    {"document_type": "home_registration_certificate", "display_name": "Home Registration Certificate"},
    {"document_type": "good_standing_certificate", "display_name": "Certificate Of Good Standing"},
    {"document_type": "internship_certificate", "display_name": "Internship/House Job Certificate"},
    {"document_type": "character_reference", "display_name": "Character Reference Letter"}
  ]
}
```

---

## 🔐 ADMIN ENDPOINTS (Admin Users Only)

**NOTE**: These require admin authentication (`IsAdminUser` permission)

### 1. List All Applications

**URL**: `http://127.0.0.1:8000/api/registry/admin/applications/`

**Method**: GET

**Query Parameters**:
- `status` - Filter by status (draft, submitted, under_review, approved, rejected, etc.)
- `professional_type` - Filter by type
- `search` - Search by name, email, or application reference
- `page` - Page number
- `per_page` - Results per page

**Example**:
```
http://127.0.0.1:8000/api/registry/admin/applications/?status=submitted
```

---

### 2. Start Application Review

**URL**: `http://127.0.0.1:8000/api/registry/admin/applications/<application_id>/start-review/`

**Method**: POST

**Body**: Empty

**Effect**: Changes status from "submitted" to "under_review"

---

### 3. Verify Document

**URL**: `http://127.0.0.1:8000/api/registry/admin/applications/<application_id>/documents/<document_id>/verify/`

**Method**: POST

**Body**:
```json
{
  "notes": "Document verified with University of Lagos. Authentic certificate."
}
```

---

### 4. Approve Application & Issue License

**URL**: `http://127.0.0.1:8000/api/registry/admin/applications/<application_id>/approve/`

**Method**: POST

**Body**:
```json
{
  "review_notes": "All credentials verified. Approved for PHB license.",
  "practice_type": "both",
  "public_email": "dr.chidi@example.com",
  "public_phone": "+2348021234567",
  "biography": "Dr. Chidi Okafor is a board-certified cardiologist..."
}
```

**Effect**:
- Changes status to "approved"
- Generates PHB license number (e.g., PHB-DOC-2025-00001)
- Issues license valid for 1 year
- Creates entry in public registry
- Sends approval email (TODO)

**Response**:
```json
{
  "message": "Application approved! PHB license PHB-DOC-2025-00001 issued to Dr Chidi Okafor.",
  "registry_entry": {
    "phb_license_number": "PHB-DOC-2025-00001",
    "license_status": "active",
    "license_issue_date": "2025-11-02",
    "license_expiry_date": "2026-11-02",
    ...
  }
}
```

---

### 5. Suspend License

**URL**: `http://127.0.0.1:8000/api/registry/admin/registry/<license_number>/suspend/`

**Method**: POST

**Body**:
```json
{
  "reason": "Pending investigation into malpractice complaint"
}
```

---

### 6. Revoke License (Permanent)

**URL**: `http://127.0.0.1:8000/api/registry/admin/registry/<license_number>/revoke/`

**Method**: POST

**Body**:
```json
{
  "reason": "Convicted of professional misconduct"
}
```

---

## 🧪 Testing Workflow (Recommended Order)

### Step 1: Test Public Endpoints (Browser)

```
1. http://127.0.0.1:8000/api/registry/states/
2. http://127.0.0.1:8000/api/registry/professional-types/
3. http://127.0.0.1:8000/api/registry/specializations/
4. http://127.0.0.1:8000/api/registry/search/
5. http://127.0.0.1:8000/api/registry/statistics/
```

✅ **You can test these RIGHT NOW in your browser!**

---

### Step 2: Get Authentication Token

You need to log in to get a JWT token or session cookie.

**Login Endpoint**: `http://127.0.0.1:8000/api/auth/login/`

**Method**: POST

**Body**:
```json
{
  "email": "your_email@example.com",
  "password": "your_password"
}
```

**Response**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {...}
}
```

Use this `access_token` in the `Authorization: Bearer <token>` header.

---

### Step 3: Create Professional Application (Postman/curl)

Use the token from Step 2 to create an application.

---

### Step 4: Upload Documents

Upload at least the required documents for your professional type.

---

### Step 5: Submit Application

Once all documents uploaded, submit the application.

---

### Step 6: Admin Approval (Requires Admin Account)

Login as admin and approve the application to issue a license.

---

### Step 7: Verify License Works (Browser)

After license is issued, verify it publicly:

```
http://127.0.0.1:8000/api/registry/verify/PHB-DOC-2025-00001/
```

You should see:
```json
{
  "verified": true,
  "message": "✓ Dr Chidi Okafor is a licensed Medical Doctor with PHB. License is valid until 2026-11-02.",
  "professional": {...}
}
```

---

### Step 8: Search Registry (Browser)

Search for the newly registered professional:

```
http://127.0.0.1:8000/api/registry/search/?state=Lagos&professional_type=doctor
```

You should see the professional in results!

---

## 🔧 Testing Tools

### Option 1: Browser (Simplest - For Public Endpoints)

Just paste URLs directly in your browser address bar.

**Best For**: Nigerian states, professional types, specializations, search, statistics

---

### Option 2: Postman (Recommended)

1. Download Postman: https://www.postman.com/downloads/
2. Create new collection "PHB Registry"
3. Add requests for each endpoint
4. Set Authorization header: `Bearer <your_token>`
5. Test all endpoints

---

### Option 3: cURL (Command Line)

```bash
# Public endpoint (no auth)
curl http://127.0.0.1:8000/api/registry/states/

# Authenticated endpoint
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://127.0.0.1:8000/api/registry/applications/

# Create application
curl -X POST http://127.0.0.1:8000/api/registry/applications/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"professional_type": "doctor", ...}'
```

---

### Option 4: Python requests

```python
import requests

# Public search
response = requests.get('http://127.0.0.1:8000/api/registry/search/', params={'state': 'Lagos'})
print(response.json())

# Authenticated request
headers = {'Authorization': f'Bearer {token}'}
response = requests.get('http://127.0.0.1:8000/api/registry/applications/', headers=headers)
print(response.json())
```

---

## 📱 Quick Test URLs (Copy & Paste in Browser)

```
# Nigerian States
http://127.0.0.1:8000/api/registry/states/

# Professional Types
http://127.0.0.1:8000/api/registry/professional-types/

# All Specializations
http://127.0.0.1:8000/api/registry/specializations/

# Doctor Specializations Only
http://127.0.0.1:8000/api/registry/specializations/?professional_type=doctor

# Search All Professionals
http://127.0.0.1:8000/api/registry/search/

# Search Doctors in Lagos
http://127.0.0.1:8000/api/registry/search/?professional_type=doctor&state=Lagos

# Registry Statistics
http://127.0.0.1:8000/api/registry/statistics/

# Verify License (will be 404 until licenses issued)
http://127.0.0.1:8000/api/registry/verify/PHB-DOC-2025-00001/
```

---

## ✅ What's Working Now

- ✅ Server is running on `http://127.0.0.1:8000`
- ✅ All 26 registry endpoints configured
- ✅ Public endpoints tested and working
- ✅ Nigerian states endpoint (37 states)
- ✅ Professional types endpoint (9 types)
- ✅ Specializations endpoint (25+ specializations)
- ✅ Search endpoint (ready, just empty results)
- ✅ Statistics endpoint (ready, just zeros)
- ✅ Microservice-ready architecture

---

## 🎯 Next Steps

1. **Test public endpoints in browser** (you can do this right now!)
2. **Create user account** (if you don't have one)
3. **Get authentication token**
4. **Create professional application via Postman/curl**
5. **Upload sample documents**
6. **Submit application**
7. **Create admin account** (if needed)
8. **Admin approve application**
9. **Verify license publicly**
10. **Search registry**

---

## 📞 Support

If you encounter any issues:

1. **Check server logs**:
   ```bash
   tail -f /tmp/django_registry_server.log
   ```

2. **Check Django is running**:
   ```bash
   ps aux | grep "manage.py runserver"
   ```

3. **Restart server if needed**:
   ```bash
   pkill -f "manage.py runserver"
   cd /Users/new/Newphb/basebackend
   source venv/bin/activate
   python manage.py runserver 0.0.0.0:8000 --settings=server.settings
   ```

---

**Server Started**: November 2, 2025
**Base URL**: `http://127.0.0.1:8000/api/registry/`
**Status**: ✅ Ready for Testing
**Public Endpoints**: 6 (working now, no auth required)
**Professional Endpoints**: 5 (require authentication)
**Admin Endpoints**: 15 (require admin authentication)

---

🎉 **Start testing now! Just open your browser and paste the URLs above!**
