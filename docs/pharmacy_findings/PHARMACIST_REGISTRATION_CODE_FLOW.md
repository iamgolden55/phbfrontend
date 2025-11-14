# Code References & Flow Diagrams

## Complete Code Flow Path for Pharmacist Registration & Approval

### REGISTRATION SUBMISSION

```
Frontend (ProfessionalRegisterForm.tsx)
    ↓
    [Step 1: Name, Email, Password]
    [Step 2: Professional Type = 'pharmacist', License #, Specialty]
    [Step 3: Verification Code]
    ↓
Backend API POST /api/registry/public/applications/
    ↓
professional_registration_views.py:submit_new_professional_application()
    ↓
    Creates User:
    - user = User(username=email, first_name, last_name, etc.)
    - user.set_password(password)
    - user.save()  ← Triggers signal create_medical_record()
    ↓
    Creates ProfessionalApplication:
    - application = ProfessionalApplication.objects.create(
        user=user,
        professional_type='pharmacist',
        first_name, last_name, email, phone,
        home_registration_body (regulatory body),
        home_registration_number,
        primary_qualification (highest_degree),
        qualification_institution (university),
        qualification_year (graduation_year),
        specialization='community_pharmacy' | 'hospital_pharmacy' | etc.,
        years_of_experience,
        status='draft',  ← Initially draft
        agreed_to_terms=True,
        agreed_to_code_of_conduct=True,
        declaration_truthful=True
      )
    ↓
    Generates application reference:
    - application.application_reference = f"PHB-APP-{year}-{uuid[:8]}"
    ↓
    Sends emails:
    - send_verification_email(user, verification_link)
    - send_professional_application_confirmation_email(user, application, password)
    - send_new_application_alert_to_admins(application)
    ↓
Response: 201 Created with application details
```

### DOCUMENT UPLOAD & SUBMISSION

```
Frontend (Registry Dashboard)
    ↓
POST /api/registry/applications/{app_id}/documents/
    ↓
application_documents_list_create()
    ↓
    ApplicationDocument.objects.create(
        application=application,
        document_type='qualification_certificate' | 'registration_proof' | etc.,
        file=uploaded_file,
        verification_status='pending',
        uploaded_by=user
    )
    ↓
Response: 201 Created

---

Frontend User submits application:
    ↓
POST /api/registry/applications/{app_id}/submit/
    ↓
submit_professional_application()
    ↓
    application.submit_application()
    # Sets: status='submitted', submitted_date=now()
    ↓
    send_professional_application_confirmation_email(...)
    send_new_application_alert_to_admins(...)
    ↓
Response: 200 OK with updated application
```

### ADMIN REVIEW & APPROVAL

```
Admin Dashboard sees application list:
    ↓
GET /api/admin/applications/
    ↓
admin_list_applications()
    ↓
Returns: List of ProfessionalApplication with status filters
```

#### Document Verification (Admin)

```
Admin verifies each document:
    ↓
POST /api/admin/applications/{app_id}/documents/{doc_id}/verify/
    ↓
admin_verify_document()
    ↓
    document.verify_document(verifier=admin_user, notes='...')
    # Sets: verification_status='verified', verified_by=admin_user, verified_date=now()
    ↓
Repeat for each document until all verified
```

#### Application Approval (Admin) - MAIN FLOW

```
Admin clicks "Approve Application":
    ↓
POST /api/admin/applications/{app_id}/approve/
    ↓
admin_approve_application() in admin_application_review_views.py (Lines 472-641)
    ↓
    [VALIDATION]
    - Check: application.status != 'approved'
    - Check: all documents verified (total_docs == verified_docs)
    ↓
    [LICENSE GENERATION]
    - type_codes = { 'pharmacist': 'PHARM', ... }
    - type_code = type_codes.get('pharmacist') = 'PHARM'
    - Generate: PHB-PHARM-{8 UUID hex chars}-{4 UUID hex chars}
    - Example: PHB-PHARM-A3F2B9C1-E4D7
    - Check for collision (extremely unlikely)
    ↓
    [UPDATE APPLICATION]
    application.approve_application(
        license_number='PHB-PHARM-A3F2B9C1-E4D7',
        reviewer=admin_user,
        review_notes='...'
    )
    # This sets:
    # - status = 'approved'
    # - decision_date = now()
    # - reviewed_by = admin_user
    # - review_notes = provided notes
    # - phb_license_number = license_number
    # - license_issue_date = today()
    # - license_expiry_date = today() + 365 days
    ↓
    [MARK VERIFICATIONS AS COMPLETE]
    application.documents_verified = True
    application.identity_verified = True
    application.qualifications_verified = True
    application.registration_verified = True
    application.save(update_fields=[...])
    ↓
    [CREATE REGISTRY ENTRY] ← KEY STEP
    registry_entry = PHBProfessionalRegistry.objects.create(
        user=application.user,
        application=application,
        phb_license_number='PHB-PHARM-A3F2B9C1-E4D7',
        professional_type='pharmacist',  # From application
        title=application.title,
        first_name=application.first_name,
        last_name=application.last_name,
        primary_qualification=application.primary_qualification,
        qualification_year=application.qualification_year,
        specialization=application.specialization,
        license_status='active',
        license_issue_date=application.license_issue_date,
        license_expiry_date=application.license_expiry_date,
        home_registration_body=application.home_registration_body,
        home_registration_number=application.home_registration_number,
        practice_type=request.data.get('practice_type', 'hospital'),
        city=application.city,
        state=application.state,
        country=application.country,
        languages_spoken=application.languages_spoken,
        public_email=request.data.get('public_email', ''),
        public_phone=request.data.get('public_phone', ''),
        biography=request.data.get('biography', ''),
        identity_verified=True,
        qualifications_verified=True,
        is_searchable=True
    )
    ↓
    [SEND EMAIL]
    send_application_approved_email(application, registry_entry)
    ↓
    [AUDIT LOG]
    AuditLog.objects.create(
        user=admin_user,
        action_type='approve',
        resource_type='ProfessionalApplication',
        resource_id=application.id,
        description=f"Approved application {application.application_reference}...",
        metadata={...}
    )
    ↓
Response: 200 OK with registry_entry details
```

### CRITICAL FINDING: NO PHARMACIST MODEL CREATED

```
After approval succeeds, the following EXISTS:
    ✓ ProfessionalApplication (status='approved', has license number)
    ✓ PHBProfessionalRegistry (public registry entry, searchable)
    ✓ User account (can login, has HPN number)

But the following DOES NOT GET CREATED:
    ✗ Pharmacist model (OneToOneField on User)
    ✗ Doctor model (OneToOneField on User) 
    ✗ Any signal automatically creates these

Why?
    - Registration approval = National/public licensing
    - Pharmacist/Doctor model = Hospital-specific staff record
    - These are intentionally separate systems
    - Hospital admins create Pharmacist records separately for their staff
```

### POST-APPROVAL: WHAT PHARMACIST CAN DO

```
Pharmacist logs in with their credentials:
    ↓
Access: /registry/applications/{app_id}
    ↓
Can view:
    - Application status = 'approved'
    - License number = 'PHB-PHARM-A3F2B9C1-E4D7'
    - License expiry date
    - All their submitted documents
    ↓
Can verify license:
    GET /api/registry/verify/{license_number}/
    ↓
Public registry shows:
    - Name, qualifications, specialization
    - License status (active)
    - Verification date
    - Practice type (hospital/private/both)
    - Languages spoken
```

### WHAT'S MISSING (NOT AUTOMATIC)

```
Pharmacist does NOT automatically get:
    ✗ Hospital assignment
    ✗ Department assignment
    ✗ Prescribing authority configuration
    ✗ Triage specialty assignment
    ✗ Working hours setup
    ✗ Availability settings
    ✗ Maximum daily reviews limit
    ✗ Ability to review prescriptions

These require hospital admin to:
    1. Create Pharmacist model record manually
    2. Link it to: user=approved_application.user
    3. Set: pharmacy_license_number = phb_license_number
    4. Configure: prescribing_authority_level, triage_specialty, etc.
    5. Assign to hospital & department
```

---

## Model Relationships After Approval

```
User (one approved pharmacist)
    ↓
    ├─ OneToOne: professional_registry → PHBProfessionalRegistry
    │            (CREATED on approval, searchable in public)
    │
    ├─ ForeignKey: professional_applications → ProfessionalApplication[]
    │              (UPDATED on approval, status='approved')
    │
    └─ OneToOne: pharmacist_profile → Pharmacist
               (NOT CREATED, would need manual creation)
               (If it existed, would have prescribing_authority_level, etc.)
```

---

## File Locations Quick Reference

| Component | File Path | Key Functions |
|-----------|-----------|----------------|
| **Frontend Form** | `phbfrontend/src/features/professional/ProfessionalRegisterForm.tsx` | Registration wizard (3 steps) |
| **Frontend Dashboard** | `phbfrontend/src/pages/registry/RegistryDashboardPage.tsx` | Shows application status |
| **Backend Registration** | `basebackend/api/views/professional_registration_views.py` | submit_new_professional_application() |
| **Backend Approval** | `basebackend/api/views/admin_application_review_views.py` | admin_approve_application() (lines 472-641) |
| **Application Model** | `basebackend/api/models/registry/professional_application.py` | Stores application data |
| **Registry Model** | `basebackend/api/models/registry/professional_registry.py` | Public searchable registry |
| **Pharmacist Model** | `basebackend/api/models/medical_staff/pharmacist.py` | Hospital staff profile (NOT auto-created) |
| **Signals** | `basebackend/api/models/signals.py` | NO signal for Pharmacist creation |
