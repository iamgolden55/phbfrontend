# Professional Registration & Approval Flow - QUICK REFERENCE

## The Question
**Does approving a pharmacist application create a Pharmacist model record?**

## The Answer
**NO** - Approval creates:
- ✅ ProfessionalApplication (status='approved', with license number)
- ✅ PHBProfessionalRegistry (public searchable registry entry)
- ❌ Pharmacist model (NOT created)

---

## Quick Facts

| Aspect | Details |
|--------|---------|
| **Registration File** | `basebackend/api/views/professional_registration_views.py` |
| **Approval File** | `basebackend/api/views/admin_application_review_views.py:472-641` |
| **Approval Function** | `admin_approve_application()` |
| **Pharmacist Model** | `basebackend/api/models/medical_staff/pharmacist.py` |
| **Models Created on Approval** | 2 (Application + Registry) |
| **Models NOT Created** | 3 (Pharmacist, Doctor, and no staff model) |
| **Signals for Auto-Creation** | None currently implemented |
| **License Number Format** | `PHB-PHARM-{8-CHARS}-{4-CHARS}` (e.g., `PHB-PHARM-A3F2B9C1-E4D7`) |
| **License Expiry** | Automatically set to 1 year from approval |
| **Public Registry** | Yes, searchable at `/api/registry/search/` |

---

## Data Flow Diagram

```
REGISTRATION SUBMISSION
─────────────────────────────────────
Frontend User
  → Professional Type: 'pharmacist'
  → License Number, Specialty, etc.
  ↓
Backend API: POST /api/registry/public/applications/
  ↓
Creates:
  ├─ User (if new registration)
  └─ ProfessionalApplication (status='draft')
  ↓
Sends: Verification email

DOCUMENT UPLOAD & SUBMISSION
─────────────────────────────────────
Professional uploads documents
  ↓
ApplicationDocument records created (status='pending')
  ↓
Professional submits application
  ↓
ProfessionalApplication.status = 'submitted'

ADMIN REVIEW
─────────────────────────────────────
Admin verifies documents
  ↓
ApplicationDocument.verification_status = 'verified'
  ↓
Admin approves application
  ↓

APPROVAL (THE KEY STEP)
─────────────────────────────────────
admin_approve_application() is called
  ↓
  Step 1: Validate (check documents verified)
  ↓
  Step 2: Generate License
    - Code: 'PHARM' (for pharmacist)
    - Format: PHB-PHARM-{UUID}
  ↓
  Step 3: Update ProfessionalApplication
    - status = 'approved'
    - phb_license_number = 'PHB-PHARM-A3F2B9C1-E4D7'
    - license_issue_date = today()
    - license_expiry_date = today() + 365 days
    - documents_verified = True
    - identity_verified = True
    - qualifications_verified = True
    - registration_verified = True
  ↓
  Step 4: Create PHBProfessionalRegistry
    - NEW record created
    - user = approved_user
    - application = approved_application (OneToOne)
    - professional_type = 'pharmacist'
    - license_status = 'active'
    - is_searchable = True
    - (copies all data from application)
  ↓
  Step 5: Send Email & Audit Log
  ↓
Response: 200 OK

POST-APPROVAL STATE
─────────────────────────────────────
Pharmacist:
  ✓ Has user account (can login)
  ✓ Has ProfessionalApplication (status='approved')
  ✓ Has PHBProfessionalRegistry entry (publicly searchable)
  ✓ Has license number (PHB-PHARM-A3F2B9C1-E4D7)
  ✓ Can verify license at public API
  ✗ Does NOT have Pharmacist model
  ✗ Cannot review prescriptions
  ✗ Cannot prescribe
  ✗ Not assigned to hospital

NEXT STEP (MANUAL - NOT AUTOMATIC)
─────────────────────────────────────
Hospital admin must:
  1. Create Pharmacist model manually
  2. Link to: user=approved_user
  3. Set: pharmacy_license_number, license_expiry_date, etc.
  4. Configure: prescribing_authority_level, triage_specialty
  5. Assign to: hospital, department
  6. Set availability: working_hours, working_days, etc.
```

---

## Model Schema Summary

### ProfessionalApplication (Registry Model)
```python
Location: api/models/registry/professional_application.py
Status: Updated on approval (status → 'approved')

Key Fields:
  user: ForeignKey(User)
  professional_type: 'pharmacist' (from registration)
  status: 'approved' (changed on approval)
  phb_license_number: 'PHB-PHARM-A3F2B9C1-E4D7' (generated on approval)
  license_issue_date: today() (set on approval)
  license_expiry_date: today() + 365 (set on approval)
  primary_qualification: 'BPharm' or similar
  specialization: 'hospital_pharmacy', 'community_pharmacy', etc.
  documents_verified: True (set on approval)
  identity_verified: True (set on approval)
  qualifications_verified: True (set on approval)
  registration_verified: True (set on approval)
```

### PHBProfessionalRegistry (Public Registry Model)
```python
Location: api/models/registry/professional_registry.py
Status: Created on approval

Key Fields:
  user: OneToOneField(User)
  application: OneToOneField(ProfessionalApplication)
  phb_license_number: 'PHB-PHARM-A3F2B9C1-E4D7'
  professional_type: 'pharmacist'
  license_status: 'active'
  license_issue_date: date (from approval)
  license_expiry_date: date (from approval)
  is_searchable: True (appears in public search)
  identity_verified: True
  qualifications_verified: True
```

### Pharmacist (Hospital Staff Model)
```python
Location: api/models/medical_staff/pharmacist.py
Status: NOT CREATED on approval (would need manual creation)

Would contain:
  user: OneToOneField(User) - NOT CREATED
  hospital: ForeignKey(Hospital) - NULL
  pharmacy_license_number: '' - NOT SET
  prescribing_authority_level: 'none' - NOT SET
  can_review_prescriptions: False - NOT SET
  triage_specialty: '' - NOT SET
  status: 'active' - NOT SET
  available_for_reviews: False - NOT SET
```

---

## Why This Design?

### The Two-Tier System

```
TIER 1: NATIONAL LICENSING
├─ ProfessionalApplication (application record)
├─ PHBProfessionalRegistry (public directory)
├─ Purpose: Professional credentialing & verification
└─ Created: During registration & approval

TIER 2: HOSPITAL EMPLOYMENT
├─ Pharmacist model (hospital staff record)
├─ Doctor model (hospital staff record)
├─ Purpose: Hospital-specific staffing & permissions
└─ Created: Hospital admin decides to hire
```

### Advantages:
1. Professional can be approved nationally without hospital assignment
2. One license can work at multiple hospitals
3. Hospitals control their own prescribing authority settings
4. Separation of concerns: national vs. hospital
5. Safer: prevents auto-granting inappropriate permissions

### Disadvantages:
1. Extra step for hospital admins
2. Approved pharmacist can't immediately prescribe
3. User confusion: "I'm approved but can't do anything?"
4. Missing UI for "create pharmacist profile" workflow

---

## What Needs to Happen (If You Want Auto-Creation)

### Current State: NO AUTO-CREATION
- Signals.py has no trigger for Pharmacist creation
- No code in approval flow creates Pharmacist model
- This is by design

### To Enable Auto-Creation (Recommended Implementation):
1. Add signal in `api/models/signals.py`
2. Trigger: `post_save` on `PHBProfessionalRegistry`
3. Action: Create `Pharmacist` model with defaults
4. Default values should be safe (may disable prescriptions by default)

### Implementation Complexity:
- Low: One signal handler (~15 lines)
- Medium: Set appropriate defaults (debatable what's "safe")
- High: Test all edge cases (collisions, updates, etc.)

---

## Approval API Response Example

```python
POST /api/admin/applications/{app_id}/approve/
Body: {
  "review_notes": "All credentials verified",
  "practice_type": "hospital",
  "public_email": "doctor@example.com",
  "public_phone": "+234812345678"
}

Response: 200 OK
{
  "message": "Application approved! PHB license PHB-PHARM-A3F2B9C1-E4D7 issued to Dr. John Smith.",
  "registry_entry": {
    "id": "uuid...",
    "user": {"id": "...", "email": "john@example.com"},
    "application": {"id": "...", "status": "approved"},
    "phb_license_number": "PHB-PHARM-A3F2B9C1-E4D7",
    "professional_type": "pharmacist",
    "first_name": "John",
    "last_name": "Smith",
    "license_status": "active",
    "license_issue_date": "2025-11-13",
    "license_expiry_date": "2026-11-13",
    "is_searchable": true,
    "identity_verified": true,
    "qualifications_verified": true,
    "specialization": "hospital_pharmacy"
  }
}
```

---

## Testing Checklist

- [ ] Registration creates ProfessionalApplication
- [ ] Admin can verify documents
- [ ] Admin can approve application
- [ ] License number is generated correctly
- [ ] License has format: PHB-PHARM-{8}-{4}
- [ ] PHBProfessionalRegistry is created
- [ ] Application status changes to 'approved'
- [ ] Approval email is sent
- [ ] Public registry search finds the professional
- [ ] Pharmacist can verify their license at /api/registry/verify/{license}
- [ ] Pharmacist model is NOT automatically created ← KEY TEST
- [ ] Hospital admin can manually create Pharmacist model
- [ ] All fields are correctly copied from Application to Registry

---

## Files Provided

1. **PHARMACIST_REGISTRATION_SUMMARY.md** (this file)
   - Quick reference & overview

2. **PHARMACIST_REGISTRATION_FLOW_ANALYSIS.md**
   - Complete technical deep-dive
   - All models, endpoints, signals
   - What gets created, what doesn't
   - Architecture explanation

3. **PHARMACIST_REGISTRATION_CODE_FLOW.md**
   - Step-by-step code flow
   - Line references
   - Request/response examples
   - Model relationships

4. **PHARMACIST_REGISTRATION_KEY_FINDINGS.md**
   - Business decisions
   - 3 implementation scenarios
   - Signal code examples
   - Testing & recommendations

---

## Key Takeaways

1. ✅ **System works correctly** - Registration & approval are functioning as designed
2. ✅ **Architecture is sound** - Separation of national licensing from hospital employment
3. ❌ **Pharmacist model NOT auto-created** - This is intentional, not a bug
4. ⚠️ **User experience gap** - Approved pharmacist doesn't know what to do next
5. 💡 **Opportunity to improve** - Add signal for auto-Pharmacist creation (optional)
6. 📋 **Decision needed** - Manual vs. automatic Pharmacist creation (business decision)

---

## Quick Links to Code

| Component | File | Lines/Function |
|-----------|------|-----------------|
| Registration Form | `phbfrontend/src/features/professional/ProfessionalRegisterForm.tsx` | Full file |
| Registration API | `basebackend/api/views/professional_registration_views.py` | submit_new_professional_application() |
| Approval API | `basebackend/api/views/admin_application_review_views.py` | admin_approve_application() (472-641) |
| Approval Main Step | `basebackend/api/views/admin_application_review_views.py` | Line 578 (PHBProfessionalRegistry.objects.create) |
| Signals | `basebackend/api/models/signals.py` | Check for Pharmacist signal (not found) |
| Application Model | `basebackend/api/models/registry/professional_application.py` | All |
| Registry Model | `basebackend/api/models/registry/professional_registry.py` | All |
| Pharmacist Model | `basebackend/api/models/medical_staff/pharmacist.py` | All |

---

## Bottom Line

The professional registration system works correctly. Approving a pharmacist application:
- ✅ Creates/updates ProfessionalApplication with license
- ✅ Creates PHBProfessionalRegistry (public record)
- ❌ Does NOT create Pharmacist model (intentional)

To enable automatic Pharmacist creation, add a signal handler (recommended enhancement).

