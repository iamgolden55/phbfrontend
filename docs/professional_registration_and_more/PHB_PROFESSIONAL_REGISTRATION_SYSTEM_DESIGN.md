# PHB Professional Registration System - Complete Design Document

## 🏥 System Overview

**Separate Microservice Architecture** - Professional registration as an independent system that integrates with existing hospital organization dashboard.

---

## 📊 Real-World Healthcare Registration Flow (NHS/GMC Model)

### **NHS/GMC 10-Step Registration Process:**

```
┌─────────────────────────────────────────────────────────────────┐
│                    REGULATORY BODY (GMC/PHB)                     │
│              Professional License Verification                   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ STEP 1-5: PRE-APPLICATION (Professional's Responsibility)       │
├─────────────────────────────────────────────────────────────────┤
│ 1. Complete Primary Medical Qualification (PMQ)                 │
│    - Medical degree from accredited institution                  │
│    - Minimum 5,500 hours over 5+ years                          │
│                                                                  │
│ 2. Complete Internship/Foundation Year                          │
│    - 12 months continuous practice in approved hospital          │
│    - 3 months medicine + 3 months surgery (minimum)             │
│                                                                  │
│ 3. Pass Professional Exams                                      │
│    - PLAB Part 1 (written exam)                                 │
│    - PLAB Part 2 (clinical assessment)                          │
│    - Valid for 2 years                                          │
│                                                                  │
│ 4. English Language Proficiency                                 │
│    - IELTS Academic: Overall 7.5 (min 7.0 each section)         │
│    - OET: Grade B in all sections                              │
│    - Valid for 2 years                                          │
│                                                                  │
│ 5. Primary Source Verification (PSV)                            │
│    - EPIC verification of medical degree                         │
│    - Direct verification from medical school                     │
│    - Authentication of all documents                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ STEP 6-8: GMC/PHB APPLICATION (Online Portal)                   │
├─────────────────────────────────────────────────────────────────┤
│ 6. Create GMC Online Account                                    │
│    - Personal details                                           │
│    - Contact information                                        │
│    - Set up MFA (2-factor authentication)                       │
│                                                                  │
│ 7. Submit Complete Application                                  │
│    - Upload all certificates (degree, internship, exams)        │
│    - Upload English language proof                              │
│    - Upload passport/ID                                         │
│    - Upload CV (detailed work history)                          │
│    - Provide 2 professional references                          │
│    - Pay application fee (£425 for GMC)                         │
│                                                                  │
│ 8. GMC Verification Process (4-6 weeks)                         │
│    - Document authenticity check                                 │
│    - Contact referees                                           │
│    - Check fitness to practice                                  │
│    - Criminal background check (DBS)                            │
│    - Check for sanctions/complaints                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ STEP 9: GMC APPROVAL → National Medical Register                │
├─────────────────────────────────────────────────────────────────┤
│ - Full Registration with License to Practice                    │
│ - GMC Reference Number issued                                   │
│ - Added to GMC Public Register (searchable online)              │
│ - Certificate of Registration issued                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│ STEP 10: HOSPITAL CREDENTIALING (Separate Process)              │
│         How Doctors Join Hospital Staff                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│ PHASE A: Application to Hospital                                │
│   1. Doctor applies for position at specific NHS Trust/Hospital │
│   2. Submits GMC number for verification                        │
│   3. Hospital HR contacts GMC to verify registration            │
│   4. Hospital Medical Staffing Office (MSO) begins process      │
│                                                                  │
│ PHASE B: Hospital Credentialing Committee Review                │
│   5. Verify GMC registration (current and in good standing)     │
│   6. Verify specialty training/certifications                   │
│   7. Check hospital's Medical Performers List (MPL)             │
│   8. Review malpractice history                                 │
│   9. Interview with department head                             │
│   10. Obtain structured references from previous hospitals      │
│                                                                  │
│ PHASE C: Privileging (Define Scope of Practice)                 │
│   11. Medical Staff Committee grants specific privileges:       │
│       ✓ Can admit patients                                      │
│       ✓ Can perform specific procedures                         │
│       ✓ Can prescribe medications                               │
│       ✓ Can order diagnostic tests                              │
│       ✓ Can supervise junior doctors                            │
│   12. Privileges tied to specialty and experience level         │
│   13. May require supervision period for new consultants        │
│                                                                  │
│ PHASE D: Hospital Onboarding                                    │
│   14. IT access (EMR system, prescribing software)              │
│   15. Occupational health clearance                             │
│   16. Hospital induction program                                │
│   17. Department-specific orientation                           │
│   18. Mentor/supervisor assigned (if required)                  │
│                                                                  │
│ PHASE E: Ongoing Monitoring                                     │
│   19. Annual re-credentialing (verify GMC status)               │
│   20. Continuing Professional Development (CPD) tracking        │
│   21. Clinical audit participation                              │
│   22. Appraisal every 12 months                                 │
│   23. Revalidation with GMC every 5 years                       │
└─────────────────────────────────────────────────────────────────┘

KEY INSIGHT: Registration ≠ Employment
- GMC Registration = Licensed to practice medicine in UK
- Hospital Credentialing = Authorized to practice at THAT hospital
- Privileging = Authorized to perform SPECIFIC procedures/services
```

---

## 🏗️ PHB System Architecture (Microservice Model)

### **Three Separate Systems:**

```
┌──────────────────────────────────────────────────────────────────────┐
│                         SYSTEM 1: PHB REGISTRY                       │
│                 (Like GMC - National Professional Database)          │
│                    Route: /registry/* or /phb-registry/*             │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  PURPOSE: Verify and maintain national database of all healthcare    │
│           professionals authorized to practice in PHB network        │
│                                                                       │
│  WHO USES IT:                                                        │
│   - Doctors applying for PHB license                                 │
│   - Pharmacists applying for PHB license                             │
│   - Nurses applying for PHB license                                  │
│   - PHB Admin (verification team)                                    │
│                                                                       │
│  ENDPOINTS:                                                          │
│   POST   /api/registry/applications/          Create application     │
│   GET    /api/registry/applications/:id       Get application       │
│   PATCH  /api/registry/applications/:id       Upload docs           │
│   POST   /api/registry/applications/:id/submit  Submit for review   │
│                                                                       │
│   # Admin endpoints                                                  │
│   GET    /api/registry/admin/applications/    List all apps         │
│   POST   /api/registry/admin/applications/:id/verify  Verify docs   │
│   POST   /api/registry/admin/applications/:id/approve  Approve      │
│   POST   /api/registry/admin/applications/:id/reject   Reject       │
│                                                                       │
│   # Public registry (like GMC public register)                       │
│   GET    /api/registry/search?license=XXX     Search professionals  │
│   GET    /api/registry/professionals/:id      View profile          │
│                                                                       │
│  DATABASE:                                                           │
│   - ProfessionalApplication (pending applications)                   │
│   - ProfessionalRegistry (approved professionals)                    │
│   - VerificationDocument (uploaded files)                            │
│   - RegistryAuditLog (all actions tracked)                           │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                    SYSTEM 2: ORGANIZATION DASHBOARD                   │
│                   (Like NHS Trust - Hospital Management)              │
│                    Route: /organization/* (EXISTING)                  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  PURPOSE: Hospital administrators manage their facility              │
│                                                                       │
│  WHO USES IT:                                                        │
│   - Hospital administrators                                          │
│   - Department heads                                                 │
│   - Medical staffing office                                          │
│                                                                       │
│  NEW FEATURES NEEDED:                                                │
│                                                                       │
│  1. STAFF RECRUITMENT PORTAL                                         │
│     /organization/recruitment/                                       │
│     - Post job openings for doctors/pharmacists/nurses               │
│     - Search PHB Registry for licensed professionals                 │
│     - Send job offers to professionals                               │
│     - Track application status                                       │
│                                                                       │
│  2. CREDENTIALING WORKFLOW                                           │
│     /organization/credentialing/                                     │
│     - Review applications from professionals                         │
│     - Verify PHB Registry license number                             │
│     - Conduct hospital-specific background checks                    │
│     - Medical Staffing Committee review                              │
│     - Approve/Reject hospital employment                             │
│                                                                       │
│  3. PRIVILEGING MANAGEMENT                                           │
│     /organization/privileging/                                       │
│     - Define privileges for each professional                        │
│     - Set scope of practice                                          │
│     - Assign supervisors (for new staff)                             │
│     - Track privilege expiry                                         │
│                                                                       │
│  4. STAFF DIRECTORY                                                  │
│     /organization/staff/                                             │
│     - List all credentialed staff                                    │
│     - View staff profiles                                            │
│     - Manage staff status (active/on-leave/suspended)                │
│     - Annual re-credentialing reminders                              │
│                                                                       │
│  ENDPOINTS (NEW):                                                    │
│   # Job postings                                                     │
│   POST   /api/organization/jobs/              Create job posting     │
│   GET    /api/organization/jobs/              List jobs              │
│                                                                       │
│   # Search PHB Registry                                              │
│   GET    /api/organization/registry/search    Search professionals   │
│   POST   /api/organization/staff/invite       Invite professional    │
│                                                                       │
│   # Hospital credentialing                                           │
│   POST   /api/organization/credentialing/     Start credentialing    │
│   GET    /api/organization/credentialing/:id  Get application        │
│   POST   /api/organization/credentialing/:id/approve  Approve        │
│                                                                       │
│   # Privileging                                                      │
│   POST   /api/organization/staff/:id/privileges  Grant privileges    │
│   GET    /api/organization/staff/:id/privileges  List privileges     │
│   DELETE /api/organization/staff/:id/privileges/:priv_id  Revoke     │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                   SYSTEM 3: PROFESSIONAL DASHBOARD                    │
│                  (Like NHS Jobs - Professional Portal)                │
│                    Route: /professional/* (EXISTING)                  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  PURPOSE: Licensed professionals manage their practice               │
│                                                                       │
│  WHO USES IT:                                                        │
│   - Doctors with PHB license                                         │
│   - Pharmacists with PHB license                                     │
│   - Nurses with PHB license                                          │
│                                                                       │
│  NEW FEATURES NEEDED:                                                │
│                                                                       │
│  1. REGISTRATION STATUS                                              │
│     /professional/registration/                                      │
│     - View PHB Registry status                                       │
│     - Track license expiry                                           │
│     - Upload renewed certificates                                    │
│     - Pay annual renewal fees                                        │
│                                                                       │
│  2. HOSPITAL AFFILIATIONS                                            │
│     /professional/affiliations/                                      │
│     - View all hospital affiliations                                 │
│     - See granted privileges at each hospital                        │
│     - Apply to new hospitals                                         │
│     - Accept job offers                                              │
│                                                                       │
│  3. JOB SEARCH                                                       │
│     /professional/jobs/                                              │
│     - Search hospital job postings                                   │
│     - Apply for positions                                            │
│     - Track application status                                       │
│                                                                       │
│  4. CREDENTIALS MANAGEMENT                                           │
│     /professional/credentials/                                       │
│     - Upload CPD certificates                                        │
│     - Track CME credits                                              │
│     - Manage certifications                                          │
│                                                                       │
│  ENDPOINTS (NEW):                                                    │
│   # Registration                                                     │
│   GET    /api/professional/registry-status     Get PHB license       │
│   POST   /api/professional/registry/renew      Renew license         │
│                                                                       │
│   # Hospital affiliations                                            │
│   GET    /api/professional/hospitals/          List affiliations     │
│   POST   /api/professional/hospitals/:id/apply  Apply to hospital    │
│   GET    /api/professional/privileges/         List all privileges   │
│                                                                       │
│   # Job search                                                       │
│   GET    /api/professional/jobs/search         Search jobs           │
│   POST   /api/professional/jobs/:id/apply      Apply for job         │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Complete Registration & Employment Flow

### **Scenario: Dr. Jane Becoming a PHB Doctor at City Hospital**

```
PART 1: PHB REGISTRY (National License)
=======================================
Step 1: Dr. Jane visits /registry/apply
   - Selects "Doctor" as profession
   - Fills basic info (name, email, phone, address)
   - Creates account

Step 2: Dr. Jane completes application form
   - Medical school details
   - License number (from Medical Council of Nigeria)
   - Specialty: General Medicine
   - Years of experience: 5 years
   - Upload documents:
     ✓ MBBS Certificate
     ✓ Medical Council license
     ✓ Internship certificate
     ✓ CV
     ✓ Passport photo
     ✓ 2 reference letters
   - Pay application fee (₦50,000)
   - Submit application

Step 3: PHB Admin reviews application (3-5 business days)
   - Verify documents authenticity
   - Contact Medical Council to verify license
   - Contact references
   - Background check
   - Decision: APPROVE ✓

Step 4: Dr. Jane receives PHB License
   - PHB License Number: PHB-DOC-2025-00123
   - Added to PHB Public Registry
   - Certificate sent via email
   - Can now apply to PHB network hospitals

=======================================

PART 2: HOSPITAL CREDENTIALING (Employment)
=======================================
Step 5: City Hospital posts job opening
   - /organization/jobs/create
   - Position: General Physician
   - Department: Internal Medicine
   - Requirements: PHB-licensed doctor, 3+ years exp

Step 6: Dr. Jane applies to City Hospital
   - /professional/jobs/search (finds City Hospital job)
   - Clicks "Apply"
   - System auto-fills PHB license info
   - Adds cover letter
   - Submits application

Step 7: City Hospital receives application
   - /organization/credentialing/ (dashboard shows new application)
   - HR reviews application
   - System auto-verifies PHB license (API call to Registry)
   - Status shows: "PHB Licensed ✓"

Step 8: Hospital Credentialing Process
   - Medical Staffing Office reviews:
     ✓ PHB license valid
     ✓ Specialty matches requirement
     ✓ No complaints/sanctions
   - Department Head interview
   - Internal background check
   - Decision: APPROVE FOR EMPLOYMENT ✓

Step 9: Privileging
   - Medical Staff Committee meeting
   - Grants privileges to Dr. Jane:
     ✓ Can admit patients
     ✓ Can prescribe medications
     ✓ Can order lab tests
     ✓ Can order imaging (X-ray, CT)
     ✗ Cannot perform surgery (not surgeon)
     ✗ Cannot supervise residents (needs 7+ years exp)
   - Assigned supervisor: Dr. Smith (first 6 months)

Step 10: Dr. Jane Onboarding
   - HR creates employee profile
   - IT creates hospital system accounts
   - Issues hospital ID badge
   - Assigns to Internal Medicine department
   - Adds to hospital EMR system
   - Orientation program (1 week)

RESULT:
   - Dr. Jane has PHB License (national)
   - Dr. Jane employed at City Hospital (local)
   - Dr. Jane has specific privileges (scope of practice)
   - Dr. Jane can now see patients at City Hospital
```

---

## 📋 Database Schema

### **New Models Required:**

```python
# =============================================================================
# PHB REGISTRY MODELS
# =============================================================================

class ProfessionalApplication(TimestampedModel):
    """
    Application to PHB National Registry (like GMC application)
    """
    APPLICATION_STATUS = [
        ('draft', 'Draft - Incomplete'),
        ('submitted', 'Submitted - Pending Review'),
        ('under_review', 'Under Review'),
        ('documents_requested', 'Additional Documents Requested'),
        ('approved', 'Approved - License Issued'),
        ('rejected', 'Rejected'),
        ('expired', 'Expired'),
    ]

    PROFESSION_TYPES = [
        ('doctor', 'Medical Doctor'),
        ('pharmacist', 'Pharmacist'),
        ('nurse', 'Nurse'),
        ('dentist', 'Dentist'),
        ('midwife', 'Midwife'),
    ]

    # Applicant
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    profession = models.CharField(max_length=20, choices=PROFESSION_TYPES)
    status = models.CharField(max_length=30, choices=APPLICATION_STATUS, default='draft')

    # Professional Details
    primary_qualification = models.CharField(max_length=200)  # e.g., "MBBS"
    medical_school = models.CharField(max_length=200)
    graduation_year = models.PositiveIntegerField()
    license_number = models.CharField(max_length=100)  # From national medical council
    license_issuing_body = models.CharField(max_length=200)  # e.g., "Medical Council of Nigeria"
    license_issue_date = models.DateField()
    license_expiry_date = models.DateField()

    # Specialization (for doctors)
    specialty = models.CharField(max_length=100, blank=True)
    subspecialty = models.CharField(max_length=100, blank=True)

    # Experience
    years_of_experience = models.PositiveIntegerField()
    current_employer = models.CharField(max_length=200, blank=True)

    # Internship/Foundation
    internship_completed = models.BooleanField(default=False)
    internship_hospital = models.CharField(max_length=200, blank=True)
    internship_start_date = models.DateField(null=True, blank=True)
    internship_end_date = models.DateField(null=True, blank=True)

    # References
    reference1_name = models.CharField(max_length=200)
    reference1_position = models.CharField(max_length=200)
    reference1_email = models.EmailField()
    reference1_phone = models.CharField(max_length=20)
    reference1_verified = models.BooleanField(default=False)
    reference1_verified_at = models.DateTimeField(null=True, blank=True)

    reference2_name = models.CharField(max_length=200)
    reference2_position = models.CharField(max_length=200)
    reference2_email = models.EmailField()
    reference2_phone = models.CharField(max_length=20)
    reference2_verified = models.BooleanField(default=False)
    reference2_verified_at = models.DateTimeField(null=True, blank=True)

    # Payment
    application_fee_paid = models.BooleanField(default=False)
    payment_reference = models.CharField(max_length=100, blank=True)
    payment_date = models.DateTimeField(null=True, blank=True)

    # Admin Review
    reviewed_by = models.ForeignKey(CustomUser, null=True, related_name='reviewed_applications')
    reviewed_at = models.DateTimeField(null=True, blank=True)
    review_notes = models.TextField(blank=True)
    rejection_reason = models.TextField(blank=True)
    documents_requested = models.TextField(blank=True)

    # Approval
    approved_at = models.DateTimeField(null=True, blank=True)
    phb_license_number = models.CharField(max_length=50, unique=True, null=True, blank=True)
    phb_license_issued_at = models.DateTimeField(null=True, blank=True)
    phb_license_expiry_date = models.DateField(null=True, blank=True)

    submitted_at = models.DateTimeField(null=True, blank=True)


class ApplicationDocument(TimestampedModel):
    """
    Documents uploaded with application
    """
    DOCUMENT_TYPES = [
        ('degree_certificate', 'Degree Certificate'),
        ('medical_license', 'Medical License'),
        ('internship_certificate', 'Internship Certificate'),
        ('cv', 'Curriculum Vitae'),
        ('passport_photo', 'Passport Photograph'),
        ('reference_letter', 'Reference Letter'),
        ('id_card', 'National ID/Passport'),
        ('specialty_certificate', 'Specialty Certificate'),
        ('cme_certificate', 'CME Certificate'),
        ('other', 'Other Document'),
    ]

    VERIFICATION_STATUS = [
        ('pending', 'Pending Verification'),
        ('verified', 'Verified'),
        ('rejected', 'Rejected - Invalid'),
        ('unclear', 'Unclear - Better Copy Needed'),
    ]

    application = models.ForeignKey(ProfessionalApplication, on_delete=models.CASCADE, related_name='documents')
    document_type = models.CharField(max_length=30, choices=DOCUMENT_TYPES)
    file = models.FileField(upload_to='registry/applications/%Y/%m/')
    file_name = models.CharField(max_length=200)
    file_size = models.PositiveIntegerField()  # in bytes

    verification_status = models.CharField(max_length=20, choices=VERIFICATION_STATUS, default='pending')
    verified_by = models.ForeignKey(CustomUser, null=True, related_name='verified_documents')
    verified_at = models.DateTimeField(null=True, blank=True)
    verification_notes = models.TextField(blank=True)


class PHBProfessionalRegistry(TimestampedModel):
    """
    National registry of all PHB-licensed professionals
    Public searchable database (like GMC register)
    """
    PROFESSION_TYPES = [
        ('doctor', 'Medical Doctor'),
        ('pharmacist', 'Pharmacist'),
        ('nurse', 'Nurse'),
        ('dentist', 'Dentist'),
        ('midwife', 'Midwife'),
    ]

    REGISTRATION_STATUS = [
        ('active', 'Active - Good Standing'),
        ('suspended', 'Suspended'),
        ('expired', 'Expired - Renewal Required'),
        ('revoked', 'Revoked'),
        ('retired', 'Retired'),
    ]

    # Link to original application
    application = models.OneToOneField(ProfessionalApplication, on_delete=models.PROTECT)
    user = models.ForeignKey(CustomUser, on_delete=models.PROTECT)
    profession = models.CharField(max_length=20, choices=PROFESSION_TYPES)

    # PHB License
    phb_license_number = models.CharField(max_length=50, unique=True, db_index=True)
    issued_date = models.DateField()
    expiry_date = models.DateField()
    status = models.CharField(max_length=20, choices=REGISTRATION_STATUS, default='active')

    # Professional Info (for public register)
    full_name = models.CharField(max_length=200)
    specialty = models.CharField(max_length=100, blank=True)
    primary_qualification = models.CharField(max_length=200)
    year_qualified = models.PositiveIntegerField()

    # Flags (public safety)
    has_conditions = models.BooleanField(default=False)  # Practice conditions/restrictions
    conditions_text = models.TextField(blank=True)
    under_investigation = models.BooleanField(default=False)

    # Renewal
    last_renewed_at = models.DateField(null=True, blank=True)
    renewal_reminder_sent = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "PHB Professional Registry"
        ordering = ['-issued_date']


# =============================================================================
# HOSPITAL CREDENTIALING MODELS
# =============================================================================

class HospitalStaffApplication(TimestampedModel):
    """
    Professional applies to work at a specific hospital
    Hospital-level credentialing (separate from PHB Registry)
    """
    APPLICATION_STATUS = [
        ('pending', 'Pending Review'),
        ('under_review', 'Under Review'),
        ('credentialing_committee', 'Credentialing Committee Review'),
        ('approved', 'Approved - Credentialed'),
        ('rejected', 'Rejected'),
        ('withdrawn', 'Withdrawn by Applicant'),
    ]

    # Who & Where
    professional = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)

    # PHB Registry Verification
    phb_license_number = models.CharField(max_length=50)
    phb_registry_verified = models.BooleanField(default=False)
    phb_registry_verified_at = models.DateTimeField(null=True, blank=True)

    # Application Details
    position_applied_for = models.CharField(max_length=200)
    cover_letter = models.TextField(blank=True)
    requested_privileges = models.JSONField(default=list)  # List of privileges requested

    # Hospital Review
    status = models.CharField(max_length=30, choices=APPLICATION_STATUS, default='pending')
    reviewed_by = models.ForeignKey(CustomUser, null=True, related_name='reviewed_staff_applications')
    reviewed_at = models.DateTimeField(null=True, blank=True)
    review_notes = models.TextField(blank=True)

    # Credentialing Committee
    committee_review_date = models.DateField(null=True, blank=True)
    committee_decision = models.TextField(blank=True)
    committee_members = models.JSONField(default=list)  # List of committee member names

    # Employment
    employment_start_date = models.DateField(null=True, blank=True)
    employment_contract = models.FileField(upload_to='contracts/', null=True, blank=True)
    probation_period_months = models.PositiveIntegerField(default=6)
    requires_supervision = models.BooleanField(default=False)
    supervisor = models.ForeignKey('Doctor', null=True, blank=True, on_delete=models.SET_NULL)

    applied_at = models.DateTimeField(auto_now_add=True)
    approved_at = models.DateTimeField(null=True, blank=True)


class HospitalPrivilege(TimestampedModel):
    """
    Specific clinical privileges granted to a professional at a hospital
    Defines scope of practice
    """
    PRIVILEGE_TYPES = [
        ('admit_patients', 'Admit Patients'),
        ('discharge_patients', 'Discharge Patients'),
        ('prescribe_medications', 'Prescribe Medications'),
        ('prescribe_controlled', 'Prescribe Controlled Substances'),
        ('order_lab_tests', 'Order Laboratory Tests'),
        ('order_imaging', 'Order Imaging (X-ray, CT, MRI)'),
        ('perform_minor_procedures', 'Perform Minor Procedures'),
        ('perform_major_surgery', 'Perform Major Surgery'),
        ('supervise_residents', 'Supervise Residents/Interns'),
        ('emergency_procedures', 'Perform Emergency Procedures'),
        ('prescribe_chemotherapy', 'Prescribe Chemotherapy'),
        ('review_prescriptions', 'Review/Approve Prescriptions (Pharmacist)'),
        ('clinical_consultation', 'Provide Clinical Consultation'),
    ]

    # Polymorphic - can apply to Doctor, Pharmacist, Nurse
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    professional = GenericForeignKey('content_type', 'object_id')

    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    privilege_type = models.CharField(max_length=50, choices=PRIVILEGE_TYPES)

    # Privilege details
    granted_by = models.ForeignKey(CustomUser, on_delete=models.PROTECT)
    granted_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateField(null=True, blank=True)

    # Conditions
    requires_supervision = models.BooleanField(default=False)
    supervisor = models.ForeignKey('Doctor', null=True, blank=True, on_delete=models.SET_NULL)
    conditions = models.TextField(blank=True)  # e.g., "Only for pediatric patients"

    # Status
    is_active = models.BooleanField(default=True)
    suspended_at = models.DateTimeField(null=True, blank=True)
    suspension_reason = models.TextField(blank=True)
    revoked_at = models.DateTimeField(null=True, blank=True)
    revoked_by = models.ForeignKey(CustomUser, null=True, related_name='revoked_privileges')

    class Meta:
        unique_together = ['content_type', 'object_id', 'hospital', 'privilege_type']


class HospitalAffiliation(TimestampedModel):
    """
    Professional's affiliation with a hospital
    One professional can work at multiple hospitals
    """
    AFFILIATION_STATUS = [
        ('active', 'Active Staff'),
        ('on_leave', 'On Leave'),
        ('suspended', 'Suspended'),
        ('terminated', 'Terminated'),
        ('resigned', 'Resigned'),
        ('retired', 'Retired'),
    ]

    EMPLOYMENT_TYPE = [
        ('full_time', 'Full-Time'),
        ('part_time', 'Part-Time'),
        ('locum', 'Locum/Temporary'),
        ('consultant', 'Consultant'),
        ('honorary', 'Honorary'),
    ]

    # Polymorphic - Doctor, Pharmacist, Nurse
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    professional = GenericForeignKey('content_type', 'object_id')

    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)

    # Employment
    employment_type = models.CharField(max_length=20, choices=EMPLOYMENT_TYPE)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=AFFILIATION_STATUS, default='active')

    # Primary affiliation (main hospital)
    is_primary_affiliation = models.BooleanField(default=True)

    # Re-credentialing
    last_credentialing_date = models.DateField()
    next_credentialing_date = models.DateField()
    credentialing_reminder_sent = models.BooleanField(default=False)
```

---

## 🎨 Frontend Routes & Pages

```
PUBLIC REGISTRY PORTAL
======================
/registry/                           Landing page (explain PHB registry)
/registry/search                     Search public registry (like GMC register)
/registry/professional/:license      View professional's public profile

PROFESSIONAL APPLICATION
========================
/registry/apply                      Choose profession type
/registry/apply/doctor               Doctor application form
/registry/apply/pharmacist           Pharmacist application form
/registry/apply/nurse                Nurse application form
/registry/apply/:id/documents        Upload documents
/registry/apply/:id/payment          Pay application fee
/registry/apply/:id/status           Track application status

ADMIN VERIFICATION
==================
/registry/admin/dashboard            Admin dashboard
/registry/admin/applications         List all applications
/registry/admin/applications/:id     Review application
/registry/admin/applications/:id/verify  Verify documents
/registry/admin/registry             Manage registry
/registry/admin/registry/:id         View/edit registry entry

ORGANIZATION (Hospital)
=======================
# Existing routes
/organization/dashboard              Hospital dashboard

# NEW: Recruitment
/organization/recruitment            Recruitment home
/organization/recruitment/jobs       Manage job postings
/organization/recruitment/jobs/new   Create job posting
/organization/recruitment/jobs/:id/edit  Edit job posting

# NEW: Credentialing
/organization/credentialing          Credentialing dashboard
/organization/credentialing/applications  List applications
/organization/credentialing/:id      Review application
/organization/credentialing/:id/verify  Verify PHB license

# NEW: Staff Management
/organization/staff                  Staff directory
/organization/staff/:id              Staff profile
/organization/staff/:id/privileges   Manage privileges
/organization/staff/:id/credentialing  Re-credentialing

PROFESSIONAL (Doctor/Pharmacist)
=================================
# Existing routes
/professional/dashboard              Professional dashboard

# NEW: Registration
/professional/registration           PHB license status
/professional/registration/renew     Renew license
/professional/credentials            Manage credentials

# NEW: Jobs & Affiliations
/professional/jobs                   Job search
/professional/jobs/:id               Job details
/professional/jobs/:id/apply         Apply for job
/professional/hospitals              List hospital affiliations
/professional/hospitals/:id          Hospital affiliation details
/professional/privileges             View all privileges
```

---

## 🚀 Implementation Phases

### **Phase 1: PHB Registry Foundation** (2-3 weeks)
- [ ] Create database models (ProfessionalApplication, PHBProfessionalRegistry, ApplicationDocument)
- [ ] Build API endpoints for application submission
- [ ] Build admin verification dashboard
- [ ] Document upload system
- [ ] Payment integration (Paystack)
- [ ] Email notifications
- [ ] Public registry search

### **Phase 2: Organization Integration** (2 weeks)
- [ ] Hospital recruitment portal
- [ ] Job posting system
- [ ] Search PHB Registry API
- [ ] Hospital credentialing workflow (HospitalStaffApplication)
- [ ] Privilege management (HospitalPrivilege)
- [ ] Staff directory

### **Phase 3: Professional Dashboard** (1-2 weeks)
- [ ] Registration status page
- [ ] Job search & application
- [ ] Hospital affiliations view
- [ ] Credentials management
- [ ] Renewal workflow

### **Phase 4: Advanced Features** (Ongoing)
- [ ] Annual re-credentialing automation
- [ ] License verification API (integrate with Medical Council)
- [ ] CPD tracking system
- [ ] Performance monitoring
- [ ] Complaint management

---

## 💡 Key Design Decisions

1. **Separate Systems**: Registry is separate from hospital employment
2. **Two-Step Process**: Get PHB license → Apply to hospitals
3. **Public Register**: Searchable database like GMC
4. **Multiple Affiliations**: Professionals can work at multiple hospitals
5. **Privilege System**: Fine-grained scope of practice control
6. **Annual Renewal**: Both PHB license and hospital credentialing
7. **Document Verification**: Admin reviews all credentials
8. **Reference Checks**: Contact referees before approval

---

## 📞 Integration Points

**How Systems Connect:**

```
PHB Registry ←→ Organization Dashboard
   - Hospital verifies PHB license number
   - API: GET /api/registry/verify-license?number=PHB-DOC-2025-00123
   - Response: License valid, professional info

PHB Registry ←→ Professional Dashboard
   - Professional views their license status
   - Professional manages credentials
   - API: GET /api/professional/registry-status

Organization ←→ Professional Dashboard
   - Professional searches hospital jobs
   - Professional applies to hospital
   - Professional tracks application status
```

---

This design gives you a complete, production-ready professional registration system modeled after NHS/GMC with proper separation of concerns!
