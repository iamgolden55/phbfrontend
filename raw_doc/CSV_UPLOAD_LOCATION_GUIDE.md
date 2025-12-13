# CSV Upload Location - Hospital Bulk Import

**Question**: Where will hospitals upload the CSV file?

**Answer**: In the **PHB Admin Dashboard** (specifically for hospital admins)

---

## 🎯 Upload Location Overview

### **Three Different Access Points**:

1. **Hospital Admin Dashboard** (Primary) ✅ RECOMMENDED
2. **PHB Super Admin Dashboard** (Backup)
3. **API Endpoint** (For tech-savvy hospitals)

---

## 📍 OPTION 1: Hospital Admin Dashboard (Primary Method)

### **URL**: `https://phb.ng/organization/bulk-import` or `https://phb.ng/organization/staff/upload`

### **Who Has Access**:
- Hospital administrators (logged into their hospital's organization dashboard)
- Hospital HR managers (with delegated permissions)

### **Navigation Path**:

```
1. Login to PHB → https://phb.ng/organization/login

2. Navigate to Organization Dashboard
   ┌─────────────────────────────────────────────────┐
   │  PHB - Lagos Teaching Hospital                  │
   │  ─────────────────────────────────────────────  │
   │                                                  │
   │  📊 Dashboard                                    │
   │  🏥 Hospital Profile                            │
   │  👥 Staff Management          ← YOU ARE HERE    │
   │      ├─ Active Staff (1,247)                    │
   │      ├─ Departments                             │
   │      └─ Bulk Upload Staff    ← CLICK THIS      │
   │  📅 Appointments                                │
   │  💊 Pharmacy                                    │
   │  📈 Analytics                                   │
   └─────────────────────────────────────────────────┘

3. Click "Staff Management" → "Bulk Upload Staff"

4. You see the bulk upload page (detailed below)
```

### **Current Integration** (You already have this!):

Looking at your existing PHB system, you already have:
- ✅ Organization dashboard (`/organization/*` routes)
- ✅ Hospital admin authentication
- ✅ Hospital profile management

**We just need to add ONE new page**: `/organization/staff/bulk-upload`

---

## 🎨 Bulk Upload Page UI (Detailed Design)

### **Page**: `/organization/staff/bulk-upload`

**Full URL**: `http://127.0.0.1:8000/organization/staff/bulk-upload` (local) or `https://phb.ng/organization/staff/bulk-upload` (production)

### **What It Looks Like**:

```
┌───────────────────────────────────────────────────────────────────────┐
│  PHB Organization Dashboard > Staff Management > Bulk Upload          │
│  ────────────────────────────────────────────────────────────────────│
│                                                                        │
│  📤 Bulk Upload Professional Staff                                    │
│  ══════════════════════════════════════════════════════════════════  │
│                                                                        │
│  Register all your medical staff with PHB in one go.                 │
│  Perfect for migrating existing hospital employees to PHB.            │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Step 1: Download CSV Template                                │   │
│  │  ────────────────────────────────────────────────────────────│   │
│  │                                                                │   │
│  │  Download our template to ensure proper formatting:           │   │
│  │                                                                │   │
│  │  📄 hospital_staff_template.csv                               │   │
│  │     ├─ Includes all required columns                          │   │
│  │     ├─ Example data rows                                      │   │
│  │     └─ Formatting instructions                                │   │
│  │                                                                │   │
│  │  [📥 Download Template]                                       │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Step 2: Prepare Your CSV File                                │   │
│  │  ────────────────────────────────────────────────────────────│   │
│  │                                                                │   │
│  │  Fill in your staff details in the template:                  │   │
│  │                                                                │   │
│  │  Required Columns:                                             │   │
│  │  • Title (Dr, Prof, Mr, Mrs, Ms)                              │   │
│  │  • First Name                                                  │   │
│  │  • Last Name                                                   │   │
│  │  • Date of Birth (YYYY-MM-DD)                                 │   │
│  │  • Gender (male/female/other)                                 │   │
│  │  • MDCN Number (e.g., MDCN/2015/00123)                        │   │
│  │  • Specialization                                             │   │
│  │  • Phone (+234...)                                            │   │
│  │  • Email                                                       │   │
│  │                                                                │   │
│  │  [📖 View Full Field List]                                    │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Step 3: Upload Your CSV File                                 │   │
│  │  ────────────────────────────────────────────────────────────│   │
│  │                                                                │   │
│  │  ┌────────────────────────────────────────────────────────┐  │   │
│  │  │                                                          │  │   │
│  │  │      📤 Drag & drop your CSV file here                  │  │   │
│  │  │         or click to browse                              │  │   │
│  │  │                                                          │  │   │
│  │  │      [Browse Files]                                     │  │   │
│  │  │                                                          │  │   │
│  │  │      Supported: .csv, .xlsx (max 10MB)                  │  │   │
│  │  │                                                          │  │   │
│  │  └────────────────────────────────────────────────────────┘  │   │
│  │                                                                │   │
│  │  📎 No file selected                                          │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
│  [Cancel]                                    [Continue to Preview →] │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘
```

### **After File Upload**:

```
┌───────────────────────────────────────────────────────────────────────┐
│  Step 4: Preview & Verify Data                                        │
│  ══════════════════════════════════════════════════════════════════  │
│                                                                        │
│  📎 File: luth_staff_2025.csv (245 KB) ✓                             │
│  📊 1,247 staff members detected                                      │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Preview (First 10 rows):                                     │   │
│  │  ──────────────────────────────────────────────────────────  │   │
│  │                                                                │   │
│  │  Name                    MDCN Number      Specialization      │   │
│  │  ─────────────────────────────────────────────────────────   │   │
│  │  ✓ Dr. Chidi Okafor     MDCN/2015/00123  Internal Medicine  │   │
│  │  ✓ Dr. Amaka Nwosu      MDCN/2013/00456  Pediatrics         │   │
│  │  ✓ Prof. Ibrahim Yusuf  MDCN/2000/00789  Surgery            │   │
│  │  ✓ Dr. Fatima Bello     MDCN/2018/01234  Obstetrics         │   │
│  │  ⚠️  Dr. John Doe         [Missing]        Radiology         │   │
│  │  ✓ Dr. Ada Eze          MDCN/2016/02345  Anesthesiology    │   │
│  │  ...                                                          │   │
│  │                                                                │   │
│  │  [View All 1,247 Rows]                                        │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Data Validation:                                              │   │
│  │                                                                │   │
│  │  ✅ Valid Rows: 1,246 (99.9%)                                 │   │
│  │  ⚠️  Warnings: 1 (missing MDCN number)                         │   │
│  │  ❌ Errors: 0                                                  │   │
│  │                                                                │   │
│  │  [Review Issues]                                              │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Import Settings:                                              │   │
│  │                                                                │   │
│  │  Verification Method:                                          │   │
│  │  ○ Trust (Recommended) - Auto-approve all                     │   │
│  │  ○ Sample (10% verification)                                  │   │
│  │  ○ Full MDCN verification                                     │   │
│  │                                                                │   │
│  │  ✓ Send email notifications to all staff                      │   │
│  │  ✓ Create user accounts automatically                         │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
│  ⚠️  This will create 1,246 professional applications and issue       │
│     PHB licenses. This action cannot be undone.                      │
│                                                                        │
│  [← Back]  [Cancel]                         [Confirm Import (1,246)] │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘
```

### **During Processing**:

```
┌───────────────────────────────────────────────────────────────────────┐
│  Processing Bulk Import...                                            │
│  ══════════════════════════════════════════════════════════════════  │
│                                                                        │
│  ⏳ Please wait while we process your staff registration              │
│     This may take 5-10 minutes for 1,000+ staff members              │
│                                                                        │
│  Progress: 823 / 1,246 (66%)                                          │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░                                          │
│                                                                        │
│  Current Status:                                                       │
│  ✅ Applications created: 823                                         │
│  ✅ Licenses issued: 823                                              │
│  📧 Emails sent: 823                                                  │
│  ⚠️  Skipped (duplicates): 12                                         │
│  ❌ Errors: 2                                                          │
│                                                                        │
│  Estimated time remaining: 3 minutes                                  │
│                                                                        │
│  Do not close this page or navigate away.                            │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘
```

### **Success Screen**:

```
┌───────────────────────────────────────────────────────────────────────┐
│  ✅ Bulk Import Complete!                                             │
│  ══════════════════════════════════════════════════════════════════  │
│                                                                        │
│  🎉 Successfully registered 1,232 healthcare professionals            │
│                                                                        │
│  Summary:                                                              │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Total in CSV: 1,247                                          │   │
│  │  ✅ Successfully Created: 1,232                               │   │
│  │  ⚠️  Skipped (Duplicates): 12                                 │   │
│  │  ❌ Errors: 3                                                  │   │
│  │                                                                │   │
│  │  PHB Licenses Issued:                                          │   │
│  │  PHB-DOC-2025-00001 to PHB-DOC-2025-01232                     │   │
│  │                                                                │   │
│  │  📧 1,232 email notifications sent                            │   │
│  │     All staff will receive their PHB license via email        │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
│  What's Next?                                                          │
│  • Staff can log in at: https://phb.ng/professional/login            │
│  • They will receive email with login credentials                    │
│  • Licenses are active and can be verified publicly                  │
│                                                                        │
│  Downloads:                                                            │
│  📄 [Download Full Report (PDF)]                                      │
│  📊 [Download Success List (CSV)]                                     │
│  ⚠️  [Download Error Report (3 items)]                                │
│                                                                        │
│  Actions:                                                              │
│  [View Registered Staff]  [Import More Staff]  [Done]                │
│                                                                        │
└───────────────────────────────────────────────────────────────────────┘
```

---

## 📍 OPTION 2: PHB Super Admin Dashboard (Backup Method)

### **URL**: `https://phb.ng/admin/registry/bulk-import`

### **Who Has Access**:
- PHB administrators only (not hospital admins)
- Used when hospital needs help with upload

### **When to Use**:
- Hospital admin is having technical difficulties
- Hospital doesn't have organization account yet
- Emergency bulk import needed

### **Process**:
Same as Option 1, but PHB admin selects which hospital the import is for.

---

## 📍 OPTION 3: Direct API Upload (For Tech-Savvy Hospitals)

### **Endpoint**: `POST https://phb.ng/api/registry/admin/bulk-import/`

### **Who Has Access**:
- Hospitals with API integration
- Requires API key

### **Example cURL**:
```bash
curl -X POST https://phb.ng/api/registry/admin/bulk-import/ \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "csv_file=@luth_staff_2025.csv" \
  -F "verification_method=trust" \
  -F "notification_enabled=true"
```

---

## 🗂️ Where Does the CSV Go After Upload?

### **Backend Processing Flow**:

```
1. File Upload
   └─> Stored temporarily: /tmp/uploads/luth_staff_2025.csv

2. Validation
   └─> Parse CSV, check format
   └─> Store validation results in database

3. Processing
   └─> Create ProfessionalApplication records
   └─> Issue licenses
   └─> Create PHBProfessionalRegistry entries
   └─> Queue email notifications

4. Cleanup
   └─> Delete temporary CSV file
   └─> Keep processing log in database
```

### **Database Storage**:

CSV data is NOT stored as a file long-term. Instead:

```
CSV Row → Becomes → Database Record

Dr. Chidi Okafor, MDCN/2015/00123, ...
    ↓
ProfessionalApplication:
  - first_name: "Chidi"
  - last_name: "Okafor"
  - home_registration_number: "MDCN/2015/00123"
  - ...
    ↓
PHBProfessionalRegistry:
  - phb_license_number: "PHB-DOC-2025-00001"
  - professional_type: "doctor"
  - ...
```

---

## 📋 CSV Template (What Hospitals Download)

**File**: `hospital_staff_template.csv`

**Download Location**: Button on bulk upload page

**Contents**:
```csv
Title,First Name,Middle Name,Last Name,Date of Birth,Gender,Nationality,MDCN Number,Email,Phone,Alternate Phone,Address Line 1,Address Line 2,City,State,Postcode,Country,Primary Qualification,Qualification Institution,Qualification Year,Qualification Country,Specialization,Subspecialization,Years of Experience,Employment Start Date,Position,Department,Languages Spoken
Dr,Chidi,Emeka,Okafor,1990-05-15,male,Nigerian,MDCN/2015/00123,chidi.okafor@hospital.com,+2348021234567,,123 Victoria Island,Apartment 4B,Lagos,Lagos,101001,Nigeria,MBBS,University of Lagos,2015,Nigeria,internal_medicine,Cardiology,8,2015-09-01,Senior Resident,Internal Medicine,English; Igbo; Yoruba
Dr,Amaka,Chidinma,Nwosu,1988-03-22,female,Nigerian,MDCN/2013/00456,amaka.nwosu@hospital.com,+2348031234567,,456 Ikoyi Road,,Lagos,Lagos,101001,Nigeria,MBBS,University of Ibadan,2013,Nigeria,pediatrics,,10,2013-10-01,Consultant,Pediatrics,English; Igbo
Prof,Ibrahim,Musa,Yusuf,1975-11-10,male,Nigerian,MDCN/2000/00789,ibrahim.yusuf@hospital.com,+2348041234567,,789 Allen Avenue,,Lagos,Lagos,101001,Nigeria,MBBS,Ahmadu Bello University,2000,Nigeria,surgery,Cardiothoracic Surgery,23,2000-06-01,Chief Surgeon,Surgery,English; Hausa
```

**Instructions Included**:
- Column descriptions
- Format examples
- Required vs optional fields
- Common mistakes to avoid

---

## 🎯 Key Takeaways

### **Primary Upload Location**:
✅ **Organization Dashboard** → **Staff Management** → **Bulk Upload Staff**

**URL**: `https://phb.ng/organization/staff/bulk-upload`

### **Who Uploads**:
- Hospital administrators
- Hospital HR managers

### **What They Upload**:
- CSV file with staff list
- Downloaded from template on the same page

### **What Happens After**:
1. File validated
2. Data previewed
3. Admin confirms
4. System auto-creates applications
5. Issues PHB licenses
6. Sends emails to all staff
7. Done! 1,000+ doctors registered

### **Hospital Admin Doesn't Need**:
- ❌ Technical knowledge
- ❌ API access
- ❌ Programming skills
- ❌ Command line

### **Hospital Admin Just Needs**:
- ✅ Login to organization dashboard
- ✅ Download template
- ✅ Fill Excel/CSV
- ✅ Upload file
- ✅ Click confirm

**That's it!** 🎉

---

**Next Step**: Should I build this bulk upload page now? It integrates directly into your existing `/organization/*` dashboard!

---

**Last Updated**: November 2, 2025
**Document**: CSV Upload Location Guide
