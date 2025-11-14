# Registry Application Workflow - Draft Status Fix Implementation Plan

## Overview

Fix critical registry application workflow bug where new applications are automatically marked as "submitted" after registration, preventing users from uploading required verification documents. The backend enforces that documents can only be uploaded to "draft" applications, creating a catch-22 situation that blocks all new registrations from completing.

## Current State Analysis

### The Problem

During professional registration:

1. User completes registration form → Backend creates application with `status="submitted"`
2. User is told: "You will need these credentials to upload documents"
3. User logs in and tries to upload documents → **ERROR: "Documents can only be uploaded to draft applications"**
4. User is completely blocked from uploading required documents

### Root Cause

**Backend**: `/api/registry/applications/` POST endpoint creates applications with `status="submitted"` immediately

**Backend**: Document upload endpoint validates `status="draft"` only

**Result**: New users cannot upload documents after registration

### Key Discoveries

**Frontend discoveries:**
- **ProfessionalApplicationForm.tsx:369** - Calls `createApplication()` which returns submitted application
- **ApplicationDetailPage.tsx:396** - Upload buttons only show for `draft` or `clarification_requested` status
- **registryService.ts:405-418** - `createApplication()` calls POST `/api/registry/applications/`
- **registryService.ts:485-496** - `submitApplication()` endpoint exists but is never reached in current flow
- **Console logs** - Confirmed application has `status:"submitted"` and `documents:[]` after registration

**Backend issues (requires Django fix):**
- Application model defaults to or explicitly sets `status="submitted"` on creation
- Document upload view only allows `status="draft"` applications
- No transition from "created" → "draft" → "submitted" workflow

### Affected Users

All users who registered since the bug was introduced. They need manual admin intervention to change status back to "draft" before they can upload documents.

## Desired End State

After this plan is complete:

### User Experience
1. ✅ User completes registration → Application created with `status="draft"`
2. ✅ User uploads all required documents while application is in draft mode
3. ✅ User clicks "Submit Application" button → Status changes to "submitted"
4. ✅ Admin reviews submitted application
5. ✅ If clarification needed → Status becomes "clarification_requested", user can upload more documents

### Technical State
- Backend creates applications with `status="draft"` by default
- Frontend correctly shows upload buttons for draft applications
- Submit button calls backend endpoint to transition draft → submitted
- Clear UI messaging guides users through the workflow
- Admin has tools to reset stuck applications to draft status

### Verification
- Create new professional application through registration flow
- Verify application starts with `status="draft"`
- Upload documents successfully
- Click "Submit Application" button
- Verify status changes to "submitted"
- Verify upload buttons disappear after submission
- Verify admin can reset application to draft if needed

## What We're NOT Doing

- Not changing the registration form structure or fields
- Not modifying authentication or account creation logic
- Not changing document verification or approval workflows
- Not implementing auto-submission after document upload
- Not modifying the professional types or regulatory body requirements
- Not changing the dashboard or application listing functionality
- Not implementing email notifications (separate concern)
- Not adding payment processing for applications

## Implementation Approach

This plan uses a **two-track approach**:

**Track 1 (Backend)**: Fix the Django application creation and document upload validation
**Track 2 (Frontend)**: Ensure UI properly reflects the new workflow and handles all states

Both tracks can be developed in parallel but must be deployed together as they are tightly coupled.

---

## Phase 1: Backend - Fix Application Creation Status

### Overview
Update Django backend to create applications with `status="draft"` instead of `status="submitted"`, and ensure document upload endpoints allow draft applications.

### Prerequisites
- Access to `/Users/new/Newphb/basebackend/` repository
- Django development environment running
- Understanding of Django models and views
- Access to run backend tests

### Changes Required

#### 1. Update Application Model Default Status

**File**: `api/models.py` (or `api/registry/models.py`)

**Find**: The `ProfessionalApplication` model
```python
class ProfessionalApplication(models.Model):
    # ... fields ...
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='submitted'  # ❌ WRONG
    )
```

**Change to**:
```python
class ProfessionalApplication(models.Model):
    # ... fields ...
    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='draft'  # ✅ CORRECT
    )
```

#### 2. Update Application Creation View

**File**: `api/views/registry/applications.py` (or equivalent)

**Find**: The `create` or `post` method that creates applications

**Current logic (pseudocode)**:
```python
def create(self, request):
    application = ProfessionalApplication.objects.create(
        user=request.user,
        status='submitted',  # Explicitly set - WRONG
        # ... other fields from request.data
    )
    return Response(ApplicationSerializer(application).data)
```

**Change to**:
```python
def create(self, request):
    application = ProfessionalApplication.objects.create(
        user=request.user,
        status='draft',  # Start as draft - CORRECT
        # ... other fields from request.data
    )
    return Response(ApplicationSerializer(application).data)
```

**Or if using serializer**:
```python
def create(self, request):
    data = request.data.copy()
    # Don't allow client to set status on creation
    data.pop('status', None)

    serializer = ApplicationSerializer(data=data)
    if serializer.is_valid():
        application = serializer.save(
            user=request.user,
            status='draft'  # Explicitly set to draft
        )
        return Response(ApplicationSerializer(application).data, status=201)
    return Response(serializer.errors, status=400)
```

#### 3. Create Submit Application Endpoint

**File**: `api/views/registry/applications.py`

**Add new action**:
```python
from rest_framework.decorators import action
from django.utils import timezone
from django.core.mail import send_mail

@action(detail=True, methods=['post'], url_path='submit')
def submit_application(self, request, pk=None):
    """
    Submit a draft application for review.

    Validates:
    - Application must be in 'draft' status
    - All required documents must be uploaded
    - User must be the application owner
    """
    application = self.get_object()

    # Check ownership
    if application.user != request.user:
        return Response(
            {"error": "You can only submit your own applications"},
            status=403
        )

    # Check status
    if application.status != 'draft':
        return Response(
            {"error": f"Only draft applications can be submitted. Current status: {application.status}"},
            status=400
        )

    # Get required documents for this professional type
    required_doc_types = get_required_document_types(application.professional_type)

    # Check uploaded documents
    uploaded_docs = application.documents.filter(
        document_type__in=required_doc_types
    ).count()

    if uploaded_docs < len(required_doc_types):
        missing = len(required_doc_types) - uploaded_docs
        return Response({
            "error": f"Please upload all required documents before submission. {missing} documents missing.",
            "required_documents": required_doc_types,
            "uploaded_count": uploaded_docs
        }, status=400)

    # Submit the application
    application.status = 'submitted'
    application.submitted_date = timezone.now()
    application.save()

    # Send notification email (optional)
    try:
        send_mail(
            subject=f'Application {application.application_reference} Submitted',
            message=f'Your professional registry application has been submitted and is under review.',
            from_email='registry@phb.ng',
            recipient_list=[application.email],
            fail_silently=True
        )
    except Exception as e:
        # Log but don't fail the submission
        print(f"Email notification failed: {e}")

    return Response({
        "message": "Application submitted successfully",
        "application": ApplicationSerializer(application).data,
        "status": "submitted",
        "submitted_date": application.submitted_date
    })
```

#### 4. Update Document Upload Validation

**File**: `api/views/registry/documents.py` (or equivalent)

**Find**: Document upload validation

**Current code**:
```python
def create(self, request, application_pk=None):
    application = get_object_or_404(ProfessionalApplication, pk=application_pk)

    # Only allow uploads for draft applications
    if application.status != 'draft':
        return Response(
            {"error": "Documents can only be uploaded to draft applications"},
            status=400
        )
    # ... rest of upload logic
```

**Update to also allow clarification_requested**:
```python
def create(self, request, application_pk=None):
    application = get_object_or_404(ProfessionalApplication, pk=application_pk)

    # Allow uploads for draft and clarification_requested
    allowed_statuses = ['draft', 'clarification_requested']
    if application.status not in allowed_statuses:
        return Response({
            "error": f"Documents can only be uploaded to draft applications or when additional documents are requested. Current status: {application.status}",
            "allowed_statuses": allowed_statuses,
            "current_status": application.status
        }, status=400)

    # ... rest of upload logic
```

#### 5. Add URL Route for Submit Endpoint

**File**: `api/urls.py` or `api/registry/urls.py`

**Verify the route exists**:
```python
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'applications', ApplicationViewSet, basename='application')

# This creates the route: POST /api/registry/applications/{id}/submit/
# If using @action decorator in the viewset
```

### Testing Backend Changes

#### Unit Tests

**File**: `api/tests/test_registry.py`

```python
def test_application_created_with_draft_status(self):
    """Test that new applications start with draft status"""
    response = self.client.post('/api/registry/applications/', {
        'professional_type': 'pharmacist',
        'first_name': 'Test',
        'last_name': 'User',
        'email': 'test@example.com',
        # ... other required fields
    })

    self.assertEqual(response.status_code, 201)
    self.assertEqual(response.data['status'], 'draft')

def test_document_upload_allowed_for_draft(self):
    """Test that documents can be uploaded to draft applications"""
    application = self.create_draft_application()

    response = self.client.post(
        f'/api/registry/applications/{application.id}/documents/',
        {
            'document_type': 'passport',
            'file': self.test_file
        },
        format='multipart'
    )

    self.assertEqual(response.status_code, 201)

def test_submit_application_changes_status(self):
    """Test that submitting changes status from draft to submitted"""
    application = self.create_draft_application()
    self.upload_required_documents(application)

    response = self.client.post(
        f'/api/registry/applications/{application.id}/submit/'
    )

    self.assertEqual(response.status_code, 200)
    application.refresh_from_db()
    self.assertEqual(application.status, 'submitted')
    self.assertIsNotNone(application.submitted_date)

def test_cannot_submit_without_documents(self):
    """Test that applications cannot be submitted without all required documents"""
    application = self.create_draft_application()
    # Don't upload documents

    response = self.client.post(
        f'/api/registry/applications/{application.id}/submit/'
    )

    self.assertEqual(response.status_code, 400)
    self.assertIn('documents missing', response.data['error'].lower())
```

### Manual Testing

Run Django development server and test:

```bash
cd /Users/new/Newphb/basebackend
source venv/bin/activate
python manage.py runserver
```

Test in Django shell:
```python
python manage.py shell

from api.models import ProfessionalApplication, User

# Create test user
user = User.objects.create_user(username='test@example.com', email='test@example.com', password='testpass123')

# Create application - should be draft
app = ProfessionalApplication.objects.create(
    user=user,
    professional_type='pharmacist',
    first_name='Test',
    last_name='User',
    email='test@example.com',
    # ... other fields
)

print(f"Status: {app.status}")  # Should print "draft"
print(f"Can upload docs: {app.status in ['draft', 'clarification_requested']}")  # Should be True
```

### Success Criteria

- [ ] New applications created with `status="draft"` by default
- [ ] Application model has correct default value
- [ ] Create view doesn't override status to "submitted"
- [ ] Submit endpoint exists at `/api/registry/applications/{id}/submit/`
- [ ] Submit endpoint validates draft status
- [ ] Submit endpoint validates all documents uploaded
- [ ] Submit endpoint changes status to "submitted"
- [ ] Document upload allows draft applications
- [ ] Document upload allows clarification_requested applications
- [ ] Document upload rejects submitted/approved/rejected applications
- [ ] Unit tests pass
- [ ] Manual testing confirms draft creation

### Verification Steps (Automated)

```bash
# Run backend tests
cd /Users/new/Newphb/basebackend
source venv/bin/activate
python manage.py test api.tests.test_registry

# Check for any migrations needed
python manage.py makemigrations
python manage.py migrate

# Verify endpoints exist
python manage.py show_urls | grep registry
```

### Verification Steps (Manual)

**Please test the following manually:**

1. Create a new application via API and verify `status="draft"` in response
2. Upload a document to the draft application and verify success
3. Call submit endpoint and verify status changes to "submitted"
4. Try to upload another document to submitted application and verify rejection
5. Check Django admin to see the application with correct status

---

## Phase 2: Frontend - Update UI for New Workflow

### Overview
Ensure the frontend properly handles the draft → submitted workflow and provides clear guidance to users throughout the process.

### Prerequisites
- Phase 1 backend changes deployed and tested
- Frontend development environment running
- Backend running at http://127.0.0.1:8000

### Changes Required

#### 1. Update Success Message After Registration

**File**: `src/features/registry/ProfessionalApplicationForm.tsx`

**Current code (lines 374-382)**:
```typescript
const successMessage = `✅ Application Submitted Successfully!

Application Number: ${result.application.phb_application_number || result.application.application_reference}

${result.message}

📧 A confirmation email has been sent to ${user?.email}.

You can track your application status in your dashboard.`;
```

**Change to**:
```typescript
const successMessage = `✅ Application Created Successfully!

Application Number: ${result.application.application_reference}
Status: Draft

${result.message}

📧 A confirmation email has been sent to ${user?.email}.

⚠️ IMPORTANT: Your application is in DRAFT status.
Please log in to upload your required documents and submit your application.

You can track your application status in your dashboard.`;
```

#### 2. Update New User Registration Success Message

**File**: `src/features/registry/ProfessionalApplicationForm.tsx`

**Current code (lines 410-420)**:
```typescript
const successMessage = `✅ Application Submitted Successfully!

Application Number: ${result.application.phb_application_number || result.application.application_reference}

${result.message}

📧 Login Credentials (SAVE THESE):
Username: ${result.login_credentials?.username || result.application.email}
Password: ${result.login_credentials?.password || '(as provided)'}

You will need these credentials to track your application and upload documents.`;
```

**Change to**:
```typescript
const successMessage = `✅ Account Created & Application Started!

Application Number: ${result.application.application_reference}
Status: Draft

${result.message}

📧 Login Credentials (SAVE THESE):
Username: ${result.login_credentials?.username || result.application.email}
Password: ${result.login_credentials?.password || '(as provided)'}

⚠️ NEXT STEPS:
1. Log in with the credentials above
2. Upload all required verification documents
3. Click "Submit Application" to complete your registration

Your application will remain in DRAFT status until you submit it after uploading all documents.`;
```

#### 3. Update Dashboard Empty State for Draft Applications

**File**: `src/pages/registry/RegistryDashboardPage.tsx`

**Current empty state** (around line 180):
```typescript
<div className="text-center py-12">
  <p className="text-gray-500">You don't have any applications yet.</p>
</div>
```

**Update to**:
```typescript
<div className="text-center py-12">
  {applications.length === 0 ? (
    <>
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
      <p className="text-gray-500 mb-4">You haven't started a professional registry application.</p>
      <button
        onClick={() => navigate('/registry/apply')}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Start Application
      </button>
    </>
  ) : null}
</div>
```

#### 4. Add Draft Status Indicator

**File**: `src/pages/registry/RegistryDashboardPage.tsx`

**Update statistics section** (around lines 117-170) to handle draft applications:

```typescript
{/* Draft Applications */}
<div className="bg-white border border-gray-200 rounded p-4">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-500">Draft applications</p>
      <p className="text-2xl font-semibold text-gray-900 mt-1">{stats.draft}</p>
      {stats.draft > 0 && (
        <p className="text-xs text-orange-600 mt-1">⚠️ Action required</p>
      )}
    </div>
    <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center">
      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </div>
  </div>
</div>
```

#### 5. Update Application Detail Page Info Box

**File**: `src/pages/registry/ApplicationDetailPage.tsx`

**Current code** (lines 488-510) for draft applications:

```typescript
{(application.status === 'draft' || application.is_draft) && (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
    <button
      onClick={handleSubmitApplication}
      className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
      disabled={documents.length === 0}
    >
      Submit Application
    </button>
    <p className="text-xs text-gray-500 mt-2">
      Ensure all required documents are uploaded before submission
    </p>
  </div>
)}
```

**Update to**:
```typescript
{(application.status === 'draft' || application.is_draft) && (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
    <div className="flex items-start space-x-3 mb-4">
      <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-blue-900 mb-1">Application in Draft</h3>
        <p className="text-sm text-blue-800">
          Upload all required documents below, then submit your application for review.
        </p>
      </div>
    </div>

    <button
      onClick={handleSubmitApplication}
      className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
      disabled={documents.length === 0}
    >
      {documents.length === 0 ? 'Upload Documents First' : 'Submit Application'}
    </button>

    {documents.length === 0 && (
      <p className="text-xs text-orange-600 mt-2 font-medium">
        ⚠️ You must upload all required documents before submission
      </p>
    )}
  </div>
)}
```

#### 6. Remove Old Warning Message

**File**: `src/pages/registry/ApplicationDetailPage.tsx`

**Remove lines 444-476** (the yellow warning box for submitted applications without documents):

```typescript
// DELETE THIS ENTIRE BLOCK
{(application.status === 'submitted' || application.status === 'under_review') && documents.length === 0 && (
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
    // ... old warning message
  </div>
)}
```

This warning is no longer needed since applications will start as draft.

#### 7. Update Submit Handler Error Handling

**File**: `src/pages/registry/ApplicationDetailPage.tsx`

**Current code** (around line 122-143):
```typescript
const handleSubmitApplication = async () => {
  if (
    !applicationId ||
    !confirm(
      'Are you sure you want to submit this application? You will not be able to edit it after submission.'
    )
  ) {
    return;
  }

  try {
    await registryService.professional.submitApplication(applicationId);
    await loadApplicationDetails();
    alert('Application submitted successfully!');
  } catch (err) {
    if (err instanceof RegistryServiceError) {
      alert(`Submission failed: ${err.message}`);
    } else {
      alert('Failed to submit application');
    }
  }
};
```

**Update to**:
```typescript
const handleSubmitApplication = async () => {
  if (!applicationId) return;

  // Check if all required documents are uploaded
  const uploadedDocs = documents.filter(d => d.verification_status !== 'rejected');
  const missingDocs = requiredDocs.length - uploadedDocs.length;

  if (missingDocs > 0) {
    alert(`⚠️ Cannot Submit Application\n\nYou have ${missingDocs} document(s) missing.\n\nPlease upload all required documents before submitting your application.`);
    return;
  }

  const confirmMessage = `Are you sure you want to submit this application?

✓ All ${requiredDocs.length} required documents uploaded
✓ Application will be sent for admin review

After submission:
• You cannot edit your application
• You cannot upload additional documents (unless admin requests clarification)
• Admin will review and approve/reject your application

Do you want to proceed?`;

  if (!confirm(confirmMessage)) {
    return;
  }

  try {
    await registryService.professional.submitApplication(applicationId);
    await loadApplicationDetails();

    const successMessage = `✅ Application Submitted Successfully!

Application Number: ${application?.application_reference}

Your application is now under review. You will receive an email notification when a decision is made.

You can track your application status in your dashboard.`;

    alert(successMessage);
  } catch (err) {
    if (err instanceof RegistryServiceError) {
      alert(`❌ Submission Failed\n\n${err.message}\n\nPlease ensure all requirements are met before submitting.`);
    } else {
      alert('Failed to submit application. Please try again or contact support.');
    }
  }
};
```

### Testing Frontend Changes

#### Manual Testing Checklist

**Test 1: New User Registration Flow**
```
1. Go to /registry/apply (not logged in)
2. Fill out entire registration form
3. Click Submit
4. Verify success message shows "Draft" status
5. Verify message instructs to "upload documents and submit"
6. Save the credentials shown
7. Navigate to login page
8. Log in with credentials
9. Navigate to /registry/dashboard
10. Verify application shows with "DRAFT" status
11. Click "View details"
12. Verify draft status info box is visible
13. Verify upload buttons are visible
14. Verify "Submit Application" button is disabled
15. Upload a test document
16. Verify "Submit Application" button becomes enabled
17. Click "Submit Application"
18. Verify confirmation dialog shows document count
19. Confirm submission
20. Verify status changes to "SUBMITTED"
21. Verify upload buttons disappear
22. Verify success message confirms submission
```

**Test 2: Existing User Adding Application**
```
1. Log in as existing user
2. Go to /registry/apply
3. Fill out application form
4. Submit
5. Verify "Draft" status in success message
6. Navigate to dashboard
7. Verify new application appears as "DRAFT"
8. Complete upload and submit flow
9. Verify all steps work correctly
```

**Test 3: Draft Application Dashboard View**
```
1. Log in with draft application
2. Go to /registry/dashboard
3. Verify "Draft applications" stat shows count
4. Verify draft badge shows on application row
5. Verify "Action required" indicator shows
6. Click application to view details
7. Verify draft info box visible
8. Verify upload buttons visible
```

**Test 4: Error Handling**
```
1. Create draft application
2. Try to submit without uploading documents
3. Verify error message shows missing documents count
4. Upload some (not all) documents
5. Try to submit again
6. Verify still blocked with updated count
7. Upload remaining documents
8. Submit successfully
9. Try to upload another document to submitted app
10. Verify upload buttons are hidden
```

### Success Criteria

- [ ] Registration success messages updated to mention "Draft" status
- [ ] Dashboard shows draft applications count with warning indicator
- [ ] Application detail page shows clear draft status info box
- [ ] Upload buttons visible only for draft/clarification_requested
- [ ] Submit button disabled until all documents uploaded
- [ ] Submit confirmation shows document count and consequences
- [ ] Success message after submission shows "Submitted" status
- [ ] Old warning message for submitted-without-docs removed
- [ ] Error handling prevents submission without all documents
- [ ] TypeScript compilation succeeds with no errors

### Verification Steps (Automated)

```bash
# Run TypeScript type check
npm run typecheck

# Build for production (catches any build errors)
npm run build
```

### Verification Steps (Manual)

**Please test the following manually:**

1. Complete the "Test 1: New User Registration Flow" checklist above
2. Verify all UI messages are clear and accurate
3. Verify no console errors during the flow
4. Test on both desktop and mobile viewport sizes
5. Verify all buttons and links work correctly

---

## Phase 3: Admin Tools for Managing Stuck Applications

### Overview
Create Django admin actions and management commands to help administrators reset applications that are stuck in "submitted" status without documents back to "draft" status.

### Prerequisites
- Phase 1 and 2 completed
- Django admin access
- Understanding of Django admin customization

### Changes Required

#### 1. Add Admin Action to Reset Status

**File**: `api/admin.py` (or `api/registry/admin.py`)

**Find**: The `ProfessionalApplicationAdmin` class

**Add admin action**:
```python
from django.contrib import admin
from django.contrib import messages

@admin.action(description='Reset selected applications to draft status')
def reset_to_draft(modeladmin, request, queryset):
    """
    Reset applications to draft status.

    Use this for applications that were accidentally submitted
    before documents were uploaded.
    """
    # Only reset submitted applications without documents
    eligible = queryset.filter(
        status='submitted',
        documents__isnull=True
    ).distinct()

    if eligible.count() == 0:
        modeladmin.message_user(
            request,
            "No eligible applications selected. Only submitted applications without documents can be reset.",
            level=messages.WARNING
        )
        return

    # Reset to draft
    count = eligible.update(
        status='draft',
        submitted_date=None
    )

    modeladmin.message_user(
        request,
        f'{count} application(s) reset to draft status. Users can now upload documents.',
        level=messages.SUCCESS
    )

class ProfessionalApplicationAdmin(admin.ModelAdmin):
    list_display = [
        'application_reference',
        'applicant_name',
        'professional_type',
        'status',
        'document_count',
        'submitted_date',
        'created_at'
    ]

    list_filter = [
        'status',
        'professional_type',
        'created_at',
        'submitted_date'
    ]

    search_fields = [
        'application_reference',
        'email',
        'first_name',
        'last_name',
        'registration_number'
    ]

    actions = [reset_to_draft]

    readonly_fields = [
        'application_reference',
        'created_at',
        'updated_at',
        'submitted_date'
    ]

    fieldsets = (
        ('Application Info', {
            'fields': (
                'application_reference',
                'status',
                'professional_type',
                'user'
            )
        }),
        ('Personal Details', {
            'fields': (
                'first_name',
                'middle_name',
                'last_name',
                'email',
                'phone'
            )
        }),
        ('Professional Details', {
            'fields': (
                'home_registration_body',
                'home_registration_number',
                'specialization',
                'years_of_experience'
            )
        }),
        ('Status & Dates', {
            'fields': (
                'created_at',
                'submitted_date',
                'under_review_date',
                'decision_date'
            )
        }),
        ('Review', {
            'fields': (
                'review_notes',
                'rejection_reason'
            )
        })
    )

    def document_count(self, obj):
        """Show number of uploaded documents"""
        return obj.documents.count()
    document_count.short_description = 'Documents'

    def applicant_name(self, obj):
        """Show full name"""
        parts = [obj.first_name, obj.middle_name, obj.last_name]
        return ' '.join(filter(None, parts))
    applicant_name.short_description = 'Applicant'
```

#### 2. Create Management Command

**File**: `api/management/commands/fix_stuck_applications.py`

```python
from django.core.management.base import BaseCommand
from api.models import ProfessionalApplication

class Command(BaseCommand):
    help = 'Reset stuck applications (submitted without documents) back to draft status'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be done without making changes',
        )
        parser.add_argument(
            '--application-id',
            type=str,
            help='Reset specific application by ID',
        )

    def handle(self, *args, **options):
        dry_run = options['dry_run']
        app_id = options.get('application_id')

        # Build query
        if app_id:
            applications = ProfessionalApplication.objects.filter(
                id=app_id,
                status='submitted'
            )
        else:
            # Find all submitted applications without documents
            applications = ProfessionalApplication.objects.filter(
                status='submitted',
                documents__isnull=True
            ).distinct()

        count = applications.count()

        if count == 0:
            self.stdout.write(
                self.style.WARNING('No stuck applications found.')
            )
            return

        self.stdout.write(f'Found {count} stuck application(s):')

        for app in applications:
            self.stdout.write(
                f'  - {app.application_reference}: '
                f'{app.first_name} {app.last_name} ({app.email})'
            )

        if dry_run:
            self.stdout.write(
                self.style.WARNING('\nDRY RUN - No changes made')
            )
            return

        # Confirm action
        if not app_id:  # Don't prompt for specific ID
            confirm = input(f'\nReset {count} application(s) to draft? (yes/no): ')
            if confirm.lower() != 'yes':
                self.stdout.write(self.style.WARNING('Cancelled'))
                return

        # Reset applications
        updated = applications.update(
            status='draft',
            submitted_date=None
        )

        self.stdout.write(
            self.style.SUCCESS(
                f'\n✓ Successfully reset {updated} application(s) to draft status'
            )
        )
        self.stdout.write(
            'Users can now upload documents and submit their applications.'
        )
```

#### 3. Create Management Command Directories

```bash
cd /Users/new/Newphb/basebackend
mkdir -p api/management/commands
touch api/management/__init__.py
touch api/management/commands/__init__.py
```

### Testing Admin Tools

#### Test Admin Action

```bash
cd /Users/new/Newphb/basebackend
source venv/bin/activate
python manage.py runserver
```

1. Navigate to http://127.0.0.1:8000/admin/
2. Go to Applications list
3. Filter by Status = "submitted"
4. Select applications without documents
5. Choose "Reset selected applications to draft status" action
6. Click "Go"
7. Verify success message
8. Verify applications now show "draft" status
9. Log in as one of those users in frontend
10. Verify they can now upload documents

#### Test Management Command

```bash
# Dry run to see what would happen
python manage.py fix_stuck_applications --dry-run

# Reset all stuck applications
python manage.py fix_stuck_applications

# Reset specific application
python manage.py fix_stuck_applications --application-id=<uuid>
```

### Success Criteria

- [ ] Admin action appears in application admin list
- [ ] Admin action only resets submitted apps without documents
- [ ] Admin action shows success message with count
- [ ] Admin action prevents invalid resets
- [ ] Management command exists and runs without errors
- [ ] Management command --dry-run shows applications without changing them
- [ ] Management command resets applications correctly
- [ ] Management command --application-id resets specific app
- [ ] Admin panel shows document count column
- [ ] Admin panel search works for application reference and email

### Verification Steps (Automated)

```bash
# Test management command help
python manage.py fix_stuck_applications --help

# Test dry run
python manage.py fix_stuck_applications --dry-run
```

### Verification Steps (Manual)

**Please test the following manually:**

1. Log into Django admin panel
2. Navigate to Applications section
3. Verify list display shows all expected columns
4. Filter by "submitted" status
5. Select one or more applications
6. Choose "Reset to draft" action
7. Verify success message appears
8. Verify applications now show "draft" status
9. Test management command with --dry-run flag
10. Verify it shows applications without modifying them

---

## Phase 4: Documentation and Migration Guide

### Overview
Create comprehensive documentation for the new workflow and provide migration guide for existing affected users.

### Changes Required

#### 1. Update Registry Documentation

**File**: `docs/registry-application-workflow.md` (create new)

```markdown
# Professional Registry Application Workflow

## Overview

The PHB Professional Registry allows healthcare professionals to register and obtain a PHB license number for practicing in Nigeria.

## Application Workflow

### Step 1: Account Creation & Application Start

When you register as a professional:

1. Fill out the registration form with your details
2. System creates your account and application with **DRAFT** status
3. You receive login credentials

**Important**: Your application starts in DRAFT status. You must upload documents and submit it for review.

### Step 2: Document Upload

After logging in:

1. Navigate to Registry Dashboard
2. Click your draft application
3. Upload all required documents:
   - Passport photograph
   - Primary degree certificate
   - Transcript
   - CV/Resume
   - Passport photo
   - Proof of address
   - Home registration certificate
   - Good standing certificate
   - Internship certificate (if applicable)

**Note**: You can only upload documents while application is in DRAFT status.

### Step 3: Submit Application

After uploading all documents:

1. Click "Submit Application" button
2. Confirm submission
3. Application status changes to **SUBMITTED**
4. You will receive email confirmation

**Warning**: After submission, you cannot upload additional documents unless admin requests clarification.

### Step 4: Admin Review

Admin reviews your application:

- **Approved**: You receive PHB license number
- **Rejected**: Application is rejected with reason
- **Clarification Requested**: You can upload additional documents

### Step 5: Approval

Once approved:

- You receive your PHB license number
- License is valid for specified period
- You can download your license certificate

## Application Statuses

| Status | Description | Can Upload Docs? | Can Submit? |
|--------|-------------|------------------|-------------|
| Draft | Application started, not submitted | ✅ Yes | ✅ Yes (after docs) |
| Submitted | Under review by admin | ❌ No | ❌ No |
| Under Review | Admin is reviewing | ❌ No | ❌ No |
| Clarification Requested | Admin needs more docs | ✅ Yes | ❌ No |
| Approved | Application approved | ❌ No | ❌ No |
| Rejected | Application rejected | ❌ No | ❌ No |

## Troubleshooting

### My application is submitted but I haven't uploaded documents

This was a bug in earlier versions. Contact registry@phb.ng with your application number to have it reset to draft status.

### I can't upload documents

Check your application status:
- **Draft**: Upload buttons should be visible
- **Submitted/Under Review**: Contact support if documents are missing
- **Clarification Requested**: Upload buttons should be visible

### Submit button is disabled

Verify:
1. All required documents are uploaded
2. Application is in draft status
3. No error messages are showing

## Support

For assistance:
- Email: registry@phb.ng
- Include your application number in all correspondence
```

#### 2. Create User Migration Guide

**File**: `docs/registry-migration-guide.md` (create new)

```markdown
# Registry Application Migration Guide

## For Users Affected by the Workflow Bug

If you registered before [DATE] and your application is stuck in "submitted" status without documents, follow these steps:

### Step 1: Contact Support

Email registry@phb.ng with:
- Subject: "Reset Application to Draft Status"
- Your application number (e.g., PHB-APP-2025-XXXXX)
- Your email address used for registration

### Step 2: Wait for Status Reset

Support will reset your application to "draft" status within 1-2 business days.

### Step 3: Upload Documents

Once reset:
1. Log in to your account
2. Navigate to Registry Dashboard
3. Click your application
4. Upload all required documents

### Step 4: Submit Application

After uploading all documents:
1. Click "Submit Application" button
2. Confirm submission
3. Your application will be reviewed

## For New Users

The issue has been fixed! New registrations will automatically start in draft status, allowing you to upload documents before submission.

## FAQ

**Q: How long will the reset take?**
A: Usually 1-2 business days during business hours.

**Q: Will I lose my application data?**
A: No, all your information is preserved. Only the status is changed.

**Q: Do I need to re-register?**
A: No, just request a status reset for your existing application.

**Q: Can I upload documents while waiting?**
A: No, you must wait for the status to be reset to "draft" first.
```

#### 3. Create Admin Guide

**File**: `docs/admin/registry-reset-guide.md` (create new)

```markdown
# Admin Guide: Resetting Stuck Applications

## Overview

This guide explains how to reset applications that were submitted without documents due to the workflow bug.

## Using Django Admin

1. Log in to Django admin
2. Navigate to "Professional Applications"
3. Filter by Status = "submitted"
4. Look for applications with Document count = 0
5. Select the applications
6. Choose "Reset selected applications to draft status" from actions dropdown
7. Click "Go"
8. Verify success message

## Using Management Command

### Reset All Stuck Applications

```bash
cd /path/to/basebackend
source venv/bin/activate

# Preview what would be reset (dry run)
python manage.py fix_stuck_applications --dry-run

# Actually reset them
python manage.py fix_stuck_applications
```

### Reset Specific Application

```bash
# Get application ID from admin panel or database
python manage.py fix_stuck_applications --application-id=<uuid>
```

## Communicating with Users

When resetting an application, send this email:

**Subject**: Your PHB Registry Application - Status Reset

```
Dear [Name],

Your professional registry application ([Application Number]) has been reset to DRAFT status.

You can now:
1. Log in to your account
2. Navigate to Registry Dashboard
3. Upload all required verification documents
4. Click "Submit Application" to complete your registration

Your application data has been preserved. Only the status was changed to allow document uploads.

If you have any questions, please reply to this email.

Best regards,
PHB Registry Support Team
```

## Monitoring

Check for stuck applications regularly:

```sql
SELECT
    application_reference,
    email,
    status,
    document_count,
    submitted_date
FROM api_professionalapplication
WHERE status = 'submitted'
  AND document_count = 0
  AND submitted_date > '2025-11-01'
ORDER BY submitted_date DESC;
```
```

### Success Criteria

- [ ] User documentation created explaining workflow
- [ ] Migration guide created for affected users
- [ ] Admin guide created for support team
- [ ] All documentation is clear and accurate
- [ ] Examples include actual field names and URLs
- [ ] Troubleshooting section addresses common issues

### Verification Steps (Manual)

**Please verify the following:**

1. Read through all documentation for accuracy
2. Verify all URLs and commands are correct
3. Check that email templates are professional
4. Ensure technical terms are explained clearly
5. Verify documentation matches actual implementation

---

## Post-Implementation

### Deployment Checklist

- [ ] Phase 1: Backend changes deployed to production
- [ ] Phase 2: Frontend changes deployed to production
- [ ] Phase 3: Admin tools available and tested
- [ ] Phase 4: Documentation published
- [ ] All existing stuck applications reset to draft
- [ ] Email sent to affected users
- [ ] Support team trained on new workflow
- [ ] Monitoring in place for any issues

### Success Metrics

After 1 week:
- [ ] No new "stuck" applications (submitted without documents)
- [ ] Average time from registration to document upload decreases
- [ ] Support tickets about document upload decrease
- [ ] New registrations complete workflow successfully

### Rollback Plan

If issues arise:

1. Backend: Revert migrations, restore previous code
2. Frontend: Redeploy previous version
3. Database: Restore from backup if needed
4. Communication: Email users about temporary issue

---

## Notes

- This is a breaking change that requires coordinated frontend/backend deployment
- Both repositories must be updated simultaneously
- Existing affected users need manual intervention (admin reset)
- Consider scheduling deployment during low-traffic period
- Have support team ready for questions after deployment
