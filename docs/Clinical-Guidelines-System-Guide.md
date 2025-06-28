# Clinical Guidelines Management System - Developer Guide

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture & Data Flow](#architecture--data-flow)
3. [Backend Implementation](#backend-implementation)
4. [Frontend Implementation](#frontend-implementation)
5. [Complete User Journey](#complete-user-journey)
6. [API Documentation](#api-documentation)
7. [File Management](#file-management)
8. [Security & Permissions](#security--permissions)
9. [Testing the System](#testing-the-system)
10. [Common Issues & Troubleshooting](#common-issues--troubleshooting)

---

## System Overview

### What is the Clinical Guidelines System?

The Clinical Guidelines Management System is a feature that allows hospitals to create, manage, and distribute medical protocols and procedures to their medical staff. Think of it as a digital library where:

- **Hospital administrators** can upload and manage clinical guidelines (like "Emergency Room Protocols" or "COVID-19 Treatment Guidelines")
- **Medical professionals** (doctors, nurses) can view, search, and bookmark these guidelines for quick reference

### Why was this system built?

Before this system, hospitals had to rely on static files or paper-based guidelines. Our system provides:
- **Centralized management** - All guidelines in one place
- **Version control** - Track updates and changes
- **Access control** - Only approved guidelines are visible to staff
- **Audit trails** - Track who accessed what and when
- **Search & filtering** - Find guidelines quickly
- **Bookmarking** - Save frequently used guidelines

---

## Architecture & Data Flow

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Hospital      │    │   PHB Backend   │    │   Medical       │
│   Admin         │───▶│   (Django)      │◄───│   Staff         │
│   (Upload)      │    │                 │    │   (View)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   File Storage  │
                       │   (Media Files) │
                       └─────────────────┘
```

### Data Flow: How Guidelines Travel from Hospital to Doctor

1. **Hospital Admin Creates Guideline**
   ```
   Hospital Admin → Upload Form → Backend API → Database + File Storage
   ```

2. **Approval Workflow**
   ```
   Draft → Pending Review → Approved → Published → Visible to Staff
   ```

3. **Medical Staff Access**
   ```
   Doctor Login → Professional Dashboard → View Guidelines → Download/Bookmark
   ```

---

## Backend Implementation

### Database Models

#### 1. ClinicalGuideline Model
Located: `/Users/new/Newphb/basebackend/api/models/medical/clinical_guideline.py`

```python
class ClinicalGuideline(models.Model):
    # Core Information
    guideline_id = models.UUIDField(default=uuid.uuid4, unique=True)
    title = models.CharField(max_length=300)
    description = models.TextField()
    version = models.CharField(max_length=20, default="1.0")
    
    # Ownership
    organization = models.ForeignKey('Hospital', on_delete=models.CASCADE)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    
    # Content
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    file_path = models.CharField(max_length=500, blank=True, null=True)
    text_content = models.TextField(blank=True, null=True)
    
    # Publication Status
    approval_status = models.CharField(max_length=20, choices=APPROVAL_STATUS_CHOICES)
    is_published = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
```

**Key Fields Explained:**
- `guideline_id`: Unique identifier (UUID) for each guideline
- `organization`: Links guideline to a specific hospital
- `file_path`: Path to uploaded PDF/document file
- `approval_status`: Workflow state (draft → approved → published)
- `is_published`: Whether medical staff can see this guideline

#### 2. Supporting Models

**GuidelineAccess**: Tracks who accessed what guideline when
```python
class GuidelineAccess(models.Model):
    guideline = models.ForeignKey(ClinicalGuideline)
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    action = models.CharField(choices=['view', 'download', 'shared'])
    accessed_at = models.DateTimeField(auto_now_add=True)
```

**GuidelineBookmark**: Allows medical staff to bookmark guidelines
```python
class GuidelineBookmark(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    guideline = models.ForeignKey(ClinicalGuideline)
    notes = models.TextField(blank=True)
```

### API Endpoints

#### Hospital Admin Endpoints (Create/Manage)

**1. Create Guideline**
```http
POST /api/clinical-guidelines/
Content-Type: application/json
Authorization: Bearer <hospital_admin_token>

{
  "title": "Emergency Room Protocols",
  "description": "Standard procedures for emergency room staff",
  "category": "emergency",
  "effective_date": "2024-01-01"
}
```

**2. Upload File**
```http
POST /api/clinical-guidelines/upload/
Content-Type: multipart/form-data
Authorization: Bearer <hospital_admin_token>

file: <PDF file>
title: "Emergency Room Protocols"
description: "Standard procedures for emergency room staff"
category: "emergency"
```

**3. Update Guideline**
```http
PUT /api/clinical-guidelines/{guideline_id}/
Content-Type: application/json
Authorization: Bearer <hospital_admin_token>

{
  "title": "Updated Emergency Room Protocols",
  "version": "2.0"
}
```

**4. Delete Guideline**
```http
DELETE /api/clinical-guidelines/{guideline_id}/
Authorization: Bearer <hospital_admin_token>
```

**5. Approve & Publish**
```http
POST /api/clinical-guidelines/{guideline_id}/approve/
POST /api/clinical-guidelines/{guideline_id}/publish/
Authorization: Bearer <hospital_admin_token>
```

#### Medical Staff Endpoints (View/Access)

**1. List Published Guidelines**
```http
GET /api/clinical-guidelines/?is_published=true
Authorization: Bearer <medical_staff_token>
```

**2. Download Guideline**
```http
GET /api/clinical-guidelines/{guideline_id}/download/
Authorization: Bearer <medical_staff_token>
```

**3. Bookmark Guideline**
```http
POST /api/clinical-guidelines/{guideline_id}/bookmark/
Authorization: Bearer <medical_staff_token>
```

### File Management System

#### Original vs. Simplified Approach

**❌ Original (Over-engineered)**
```python
# Used complex secure document encryption
file_document = models.ForeignKey('SecureDocument')
# Required military-grade encryption for simple hospital policies
```

**✅ Simplified (Current)**
```python
# Simple file path storage
file_path = models.CharField(max_length=500)

# Files stored in organized directories:
# media/clinical_guidelines/{hospital_id}/{guideline_uuid}.pdf
```

#### File Upload Process
```python
def _save_guideline_file(self, uploaded_file, guideline):
    # Create hospital-specific directory
    upload_dir = os.path.join('clinical_guidelines', str(guideline.organization.id))
    
    # Generate safe filename using guideline UUID
    file_extension = os.path.splitext(uploaded_file.name)[1].lower()
    safe_filename = f"{guideline.guideline_id}{file_extension}"
    
    # Save using Django's default storage
    file_path = os.path.join(upload_dir, safe_filename)
    saved_path = default_storage.save(file_path, uploaded_file)
    
    return saved_path
```

---

## Frontend Implementation

### Component Structure

```
src/
├── pages/
│   ├── organization/
│   │   └── ClinicalGuidelinesManagementPage.tsx  # Hospital admin interface
│   └── professional/
│       └── ClinicalGuidelinesPage.tsx            # Medical staff interface
├── components/
│   └── guidelines/
│       ├── GuidelineUploadModal.tsx              # Upload form
│       └── GuidelineCard.tsx                     # Guideline display
└── services/
    └── guidelinesService.ts                      # API communication
```

### Hospital Admin Interface

Located: `/src/pages/organization/ClinicalGuidelinesManagementPage.tsx`

**Key Features:**
- Dashboard with statistics (total guidelines, pending approvals, etc.)
- Upload new guidelines (file + metadata)
- View all hospital's guidelines
- Approve/publish workflow
- Edit/delete guidelines

**Code Structure:**
```typescript
const ClinicalGuidelinesManagementPage: React.FC = () => {
  const [guidelines, setGuidelines] = useState<ClinicalGuideline[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Load hospital's guidelines
  const loadGuidelines = async () => {
    const data = await guidelinesService.getGuidelines();
    setGuidelines(data);
  };
  
  // Handle guideline approval
  const handleApprove = async (guidelineId: string) => {
    await guidelinesService.approveGuideline(guidelineId);
    loadGuidelines(); // Refresh list
  };
};
```

### Medical Staff Interface

Located: `/src/pages/professional/ClinicalGuidelinesPage.tsx`

**Key Features:**
- View published guidelines only
- Search and filter guidelines
- Bookmark frequently used guidelines
- Download guideline files
- Two-tab interface (All Guidelines | Bookmarked)

**Code Structure:**
```typescript
const ClinicalGuidelinesPage: React.FC = () => {
  const [guidelines, setGuidelines] = useState<ClinicalGuideline[]>([]);
  const [bookmarkedGuidelines, setBookmarkedGuidelines] = useState<ClinicalGuideline[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'bookmarked'>('all');
  
  // Only load published guidelines
  const loadGuidelines = async () => {
    const filterParams = { is_published: true };
    const data = await guidelinesService.getGuidelines(filterParams);
    setGuidelines(data);
  };
};
```

### API Service

Located: `/src/services/guidelinesService.ts`

**Key Functions:**
```typescript
class GuidelinesService {
  // Get guidelines with filtering
  async getGuidelines(filters?: any): Promise<ClinicalGuideline[]> {
    const response = await axios.get(createApiUrl('api/clinical-guidelines/'), {
      params: filters,
      headers: this.getAuthHeaders()
    });
    return response.data;
  }
  
  // Upload new guideline with file
  async uploadGuideline(data: FormData): Promise<ClinicalGuideline> {
    const response = await axios.post(
      createApiUrl('api/clinical-guidelines/upload/'),
      data,
      { headers: { ...this.getAuthHeaders(), 'Content-Type': 'multipart/form-data' } }
    );
    return response.data.guideline;
  }
  
  // Download guideline file
  async downloadGuideline(guidelineId: string): Promise<Blob> {
    const response = await axios.get(
      createApiUrl(`api/clinical-guidelines/${guidelineId}/download/`),
      { 
        headers: this.getAuthHeaders(),
        responseType: 'blob' 
      }
    );
    return response.data;
  }
}
```

---

## Complete User Journey

### Journey 1: Hospital Admin Uploads Guideline

1. **Login as Hospital Admin**
   - Navigate to `/organization/login`
   - Use hospital admin credentials

2. **Access Guidelines Management**
   - Navigate to `/organization/clinical-guidelines`
   - See dashboard with current guidelines

3. **Upload New Guideline**
   ```
   Click "Upload New Guideline" 
   → Modal opens 
   → Fill form (title, description, category, etc.)
   → Select PDF file
   → Click "Upload"
   → Guideline created in "Draft" status
   ```

4. **Approve & Publish**
   ```
   Find guideline in list
   → Click "Approve" 
   → Status changes to "Approved"
   → Click "Publish"
   → Status changes to "Published"
   → Now visible to medical staff
   ```

### Journey 2: Doctor Views Guideline

1. **Login as Medical Professional**
   - Navigate to `/professional/login`
   - Use doctor/nurse credentials

2. **Access Guidelines**
   - Navigate to `/professional/guidelines`
   - See all published guidelines from registered hospitals

3. **Search & Filter**
   ```
   Use search box to find "Emergency"
   → Filter by category "Emergency Protocols"
   → Select guideline from list
   → View full details
   ```

4. **Download & Bookmark**
   ```
   Click "Download PDF" 
   → File downloads to device
   Click bookmark icon
   → Guideline saved to "Bookmarked" tab
   ```

### Journey 3: Hospital Admin Updates Guideline

1. **Find Existing Guideline**
   - Go to guidelines management page
   - Find guideline in list

2. **Update Content**
   ```
   Click "Edit" on guideline
   → Update title/description/version
   → Upload new file (if needed)
   → Save changes
   ```

3. **Version Control**
   ```
   Previous version remains in system
   → New version gets new version number
   → Medical staff see updated version
   ```

---

## API Documentation

### Authentication

All API calls require authentication headers:
```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

### Response Format

**Success Response:**
```json
{
  "id": 1,
  "guideline_id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Emergency Room Protocols",
  "description": "Standard procedures for emergency room staff",
  "organization_name": "City General Hospital",
  "created_by_name": "Dr. Admin Smith",
  "approval_status": "published",
  "is_published": true,
  "file_url": "/api/clinical-guidelines/550e8400-e29b-41d4-a716-446655440000/download/",
  "download_url": "/api/clinical-guidelines/550e8400-e29b-41d4-a716-446655440000/download/",
  "created_at": "2024-01-15T10:30:00Z",
  "access_count": 45
}
```

**Error Response:**
```json
{
  "error": "Only hospital administrators can upload clinical guidelines.",
  "details": {
    "field": "specific error details"
  }
}
```

### File Upload Format

```javascript
const formData = new FormData();
formData.append('file', pdfFile);
formData.append('title', 'Emergency Protocols');
formData.append('description', 'Standard emergency procedures');
formData.append('category', 'emergency');
formData.append('effective_date', '2024-01-01');
```

---

## Security & Permissions

### Role-Based Access Control

**Hospital Admin (`hospital_admin`)**
- ✅ Create guidelines for their hospital
- ✅ Edit/delete their hospital's guidelines
- ✅ Approve/publish guidelines
- ✅ View access statistics
- ❌ Cannot access other hospitals' guidelines

**Medical Staff (`doctor`, `nurse`, etc.)**
- ✅ View published guidelines from registered hospitals
- ✅ Download guideline files
- ✅ Bookmark guidelines
- ❌ Cannot create/edit guidelines
- ❌ Cannot see draft/unpublished guidelines

### Permission Classes

Located: `/Users/new/Newphb/basebackend/api/permissions.py`

```python
class IsHospitalAdmin(BasePermission):
    def has_permission(self, request, view):
        return (request.user.is_authenticated and 
                request.user.role == 'hospital_admin')

class CanAccessGuideline(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Check if user's hospital matches guideline's organization
        if request.user.role == 'hospital_admin':
            return obj.organization == request.user.hospitaladmin.hospital
        else:
            # Medical staff can only access published guidelines
            return obj.is_published and obj.is_accessible
```

### File Security

- Files stored in hospital-specific directories
- Access controlled through API endpoints
- No direct file URL access
- Download logging for audit trails

---

## Testing the System

### Backend Testing

1. **Test Model Creation**
```python
# In Django shell
from api.models.medical.clinical_guideline import ClinicalGuideline
from api.models import Hospital, CustomUser

# Create test guideline
guideline = ClinicalGuideline.objects.create(
    title="Test Guideline",
    description="Test description",
    organization=hospital,
    created_by=admin_user,
    category="emergency"
)
```

2. **Test API Endpoints**
```bash
# Test with curl
curl -X GET "http://localhost:8000/api/clinical-guidelines/" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Frontend Testing

1. **Component Testing**
```typescript
// Test guideline upload
const mockGuideline = {
  title: "Test Guideline",
  description: "Test description",
  category: "emergency"
};

// Test API service
await guidelinesService.uploadGuideline(formData);
```

2. **Integration Testing**
```
1. Login as hospital admin
2. Upload a test guideline
3. Approve and publish it
4. Login as medical staff
5. Verify guideline appears in professional dashboard
6. Test download functionality
```

---

## Common Issues & Troubleshooting

### Issue 1: Import Errors
```
Error: The requested module '/src/utils/config.ts' does not provide an export named 'getConfig'
```

**Solution:**
```typescript
// ❌ Wrong import
import { getConfig } from '../utils/config';

// ✅ Correct import
import { createApiUrl } from '../utils/config';
```

### Issue 2: File Upload Failing
```
Error: No file provided
```

**Common Causes:**
- FormData not properly constructed
- Missing 'multipart/form-data' content type
- File input not properly referenced

**Solution:**
```typescript
const formData = new FormData();
formData.append('file', fileInput.files[0]); // Ensure file exists
```

### Issue 3: Permission Denied
```
Error: Only hospital administrators can upload clinical guidelines
```

**Common Causes:**
- User not logged in as hospital admin
- Token expired or invalid
- User role not properly set

**Solution:**
- Verify user role in database
- Check token validity
- Ensure proper authentication headers

### Issue 4: Guidelines Not Showing for Medical Staff
```
Medical staff sees empty guidelines list
```

**Common Causes:**
- Guidelines not published
- Guidelines not approved
- Medical staff not associated with correct hospital

**Solution:**
1. Check guideline approval_status is "approved"
2. Check is_published is True
3. Verify medical staff hospital association

### Issue 5: File Download Not Working
```
Error: File not found or corrupted
```

**Common Causes:**
- File path incorrect in database
- File deleted from storage
- Incorrect file permissions

**Solution:**
```python
# Check file exists
from django.core.files.storage import default_storage
if default_storage.exists(guideline.file_path):
    # File exists, check permissions
else:
    # File missing, need to re-upload
```

---

## Performance Considerations

### Database Optimization
- Indexes on frequently queried fields (organization, category, approval_status)
- Proper foreign key relationships
- Pagination for large guideline lists

### File Storage Optimization
- Organized directory structure
- File size limits (10MB for guidelines)
- Cleanup of orphaned files

### Frontend Optimization
- Lazy loading of guideline content
- Pagination for large lists
- Caching of frequently accessed guidelines

---

## Future Enhancements

### Potential Features
1. **Version History** - Track all versions of guidelines
2. **Advanced Search** - Full-text search within guideline content
3. **Workflow Automation** - Auto-approval for certain categories
4. **Mobile App** - Dedicated mobile interface for medical staff
5. **Integration** - Connect with existing hospital management systems
6. **Analytics** - Detailed usage analytics and reporting

### Technical Improvements
1. **Caching** - Redis caching for frequently accessed guidelines
2. **CDN** - Content delivery network for file downloads
3. **Background Jobs** - Async processing for large file uploads
4. **API Versioning** - Support multiple API versions
5. **Real-time Updates** - WebSocket notifications for new guidelines

---

## Conclusion

The Clinical Guidelines Management System provides a complete solution for hospitals to manage and distribute medical protocols to their staff. The system balances simplicity with functionality, ensuring that hospital administrators can easily manage guidelines while medical staff can quickly access the information they need.

Key takeaways for junior developers:
- **Start Simple**: We simplified from over-engineered secure vault to standard file storage
- **User-Centered Design**: Built around actual user workflows (admin upload → staff access)
- **Proper Permissions**: Role-based access ensures security without complexity
- **Complete Integration**: Backend models, APIs, and frontend components work together seamlessly

Remember: Good software solves real problems without unnecessary complexity!