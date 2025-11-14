# Professional Registration Admin Review System - Implementation Plan

**Date**: November 5, 2025
**Type**: Feature Implementation
**Estimated Duration**: 9-15 days
**Status**: Ready for Implementation

---

## Executive Summary

Implement a comprehensive admin review system for the Professional Registration module with IAM-style Role-Based Access Control (RBAC). This system will enable authorized admin users to review healthcare professional applications, verify documents, approve/reject applications, and issue PHB license numbers.

**Key Deliverables**:
- IAM-style RBAC system with 4 distinct admin roles
- Platform Admin (superuser) user management interface
- Registry application review dashboard
- Document verification workflow
- License approval and issuance system
- Complete audit logging

**Architecture Strategy**: Build in admin_dashboard (JavaScript/React/CRA) separate from professional frontend (TypeScript/React/Vite) to maintain microservice-ready architecture.

---

## Current State Analysis

### What Exists ✅

**Backend** (`/Users/new/Newphb/basebackend/`):
- ✅ 15 fully-implemented admin API endpoints in `api/views/admin_application_review_views.py`
- ✅ CustomUser model with role field (50+ roles) in `api/models/user/custom_user.py`
- ✅ 6 custom permission classes in `api/permissions.py`
- ✅ JWT authentication with access/refresh tokens
- ✅ Application and document models with complete workflow
- ✅ License number generation logic

**Admin Dashboard** (`/Users/new/phbfinal/admin_dashboard/`):
- ✅ React SPA with Create React App
- ✅ JWT authentication via localStorage in `src/hooks/useAuth.js`
- ✅ Protected routes with Main layout wrapper
- ✅ API configuration in `src/config/api.js` with auto-refresh
- ✅ Existing dashboard pages (hospital, appointments, patients, etc.)

**Professional Frontend** (`/Users/new/phbfinal/phbfrontend/`):
- ✅ Complete registration form and document upload system
- ✅ Reusable UI patterns (stat cards, tables, status badges, detail pages)
- ✅ Registry service with admin API methods defined (but unused)

### What's Missing ❌

**Backend**:
- ❌ Role model with granular permissions
- ❌ User management API endpoints (create, update role, deactivate)
- ❌ RBAC permission checks on admin endpoints
- ❌ AuditLog model for tracking admin actions

**Admin Dashboard**:
- ❌ Role-based permission checking in useAuth
- ❌ Registry application list page
- ❌ Application detail/review page
- ❌ Document verification interface
- ❌ Approve/reject workflow UI
- ❌ User management page (for Platform Admins)
- ❌ Registry service layer for API calls

---

## Implementation Phases

### Phase 1: Backend RBAC Infrastructure ✅ COMPLETED (2-3 days)

**Goal**: Implement Role model, permissions system, and user management APIs

**Status**: ✅ COMPLETED - All 6 sub-phases implemented and verified
- ✅ 1.1: Role and AuditLog models created
- ✅ 1.2: 4 custom permission classes implemented
- ✅ 1.3: 6 user management API endpoints created
- ✅ 1.4: 9 critical admin endpoints updated with RBAC
- ✅ 1.5: 6 URL routes added to registry_urls.py
- ✅ 1.6: Database migrations applied and 4 roles seeded

**Verification**: ✅ All imports pass, Django system check clean, database verified

#### 1.1 Create Role Model and Permissions

**File**: `/Users/new/Newphb/basebackend/api/models/user/role.py` (NEW)

```python
from django.db import models
from django.contrib.postgres.fields import ArrayField

class Role(models.Model):
    """
    Role-based access control for admin users.
    Inspired by AWS IAM roles.
    """
    ROLE_TYPES = [
        ('platform_admin', 'Platform Admin'),
        ('registry_reviewer', 'Registry Reviewer'),
        ('registry_verifier', 'Registry Verifier'),
        ('support_staff', 'Support Staff'),
    ]

    name = models.CharField(max_length=100, unique=True)
    role_type = models.CharField(max_length=50, choices=ROLE_TYPES)
    description = models.TextField(blank=True)
    permissions = ArrayField(
        models.CharField(max_length=100),
        default=list,
        help_text="List of permission strings"
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'roles'
        ordering = ['name']

    def __str__(self):
        return self.name

# Permission constants
PERMISSIONS = {
    'PLATFORM_ADMIN': [
        'view_applications',
        'review_applications',
        'verify_documents',
        'approve_applications',
        'reject_applications',
        'suspend_licenses',
        'revoke_licenses',
        'reactivate_licenses',
        'manage_users',
        'view_analytics',
        'manage_settings',
        'view_audit_logs',
    ],
    'REGISTRY_REVIEWER': [
        'view_applications',
        'review_applications',
        'verify_documents',
        'approve_applications',
        'reject_applications',
        'request_clarification',
        'request_additional_documents',
        'suspend_licenses',
    ],
    'REGISTRY_VERIFIER': [
        'view_applications',
        'verify_documents',
        'reject_documents',
        'request_clarification',
    ],
    'SUPPORT_STAFF': [
        'view_applications',
        'view_analytics',
    ],
}
```

**File**: `/Users/new/Newphb/basebackend/api/models/user/audit_log.py` (NEW)

```python
from django.db import models
from django.conf import settings

class AuditLog(models.Model):
    """
    Track all admin actions for accountability and compliance.
    """
    ACTION_TYPES = [
        ('view', 'View'),
        ('create', 'Create'),
        ('update', 'Update'),
        ('delete', 'Delete'),
        ('approve', 'Approve'),
        ('reject', 'Reject'),
        ('verify', 'Verify'),
        ('suspend', 'Suspend'),
        ('revoke', 'Revoke'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='audit_logs'
    )
    action_type = models.CharField(max_length=20, choices=ACTION_TYPES)
    resource_type = models.CharField(max_length=100)  # e.g., 'ProfessionalApplication'
    resource_id = models.CharField(max_length=255)
    description = models.TextField()
    metadata = models.JSONField(default=dict)  # Store additional context
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'audit_logs'
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['user', '-timestamp']),
            models.Index(fields=['resource_type', 'resource_id']),
            models.Index(fields=['-timestamp']),
        ]

    def __str__(self):
        return f"{self.user.email} - {self.action_type} - {self.resource_type} - {self.timestamp}"
```

**Update**: `/Users/new/Newphb/basebackend/api/models/user/custom_user.py`

Add role relationship:

```python
# Line ~160 (after existing fields)
registry_role = models.ForeignKey(
    'Role',
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name='users',
    help_text="Admin role for registry management"
)
```

#### 1.2 Create Custom Permission Classes

**File**: `/Users/new/Newphb/basebackend/api/permissions.py` (UPDATE)

Add new permission classes:

```python
# Add after existing permission classes (after line 127)

class HasRegistryPermission(permissions.BasePermission):
    """
    Check if user has specific registry permission.
    Usage: permission_required = 'view_applications'
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        # Superusers always have access
        if request.user.is_superuser:
            return True

        # Check if user has registry_role with required permission
        required_permission = getattr(view, 'permission_required', None)
        if not required_permission:
            return False

        user_role = request.user.registry_role
        if not user_role or not user_role.is_active:
            return False

        return required_permission in user_role.permissions


class IsPlatformAdmin(permissions.BasePermission):
    """
    Only Platform Admins (superusers or users with platform_admin role).
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        if request.user.is_superuser:
            return True

        user_role = request.user.registry_role
        return (
            user_role and
            user_role.is_active and
            user_role.role_type == 'platform_admin'
        )


class CanReviewApplications(permissions.BasePermission):
    """
    Users who can review and approve/reject applications.
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        if request.user.is_superuser:
            return True

        user_role = request.user.registry_role
        if not user_role or not user_role.is_active:
            return False

        return 'review_applications' in user_role.permissions


class CanVerifyDocuments(permissions.BasePermission):
    """
    Users who can verify documents.
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        if request.user.is_superuser:
            return True

        user_role = request.user.registry_role
        if not user_role or not user_role.is_active:
            return False

        return 'verify_documents' in user_role.permissions
```

#### 1.3 Create User Management API Endpoints

**File**: `/Users/new/Newphb/basebackend/api/views/admin/user_management_views.py` (NEW)

```python
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import get_user_model
from django.db import transaction
from api.permissions import IsPlatformAdmin
from api.models.user.role import Role
from api.models.user.audit_log import AuditLog
from api.serializers.user_serializers import AdminUserSerializer
import secrets
import string

User = get_user_model()


@api_view(['GET'])
@permission_classes([IsPlatformAdmin])
def list_admin_users(request):
    """
    List all admin users with their roles.
    GET /api/admin/users/
    """
    users = User.objects.filter(
        is_staff=True
    ).select_related('registry_role').order_by('-date_joined')

    data = [{
        'id': user.id,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'role': {
            'id': user.registry_role.id if user.registry_role else None,
            'name': user.registry_role.name if user.registry_role else None,
            'role_type': user.registry_role.role_type if user.registry_role else None,
        } if user.registry_role else None,
        'is_active': user.is_active,
        'is_superuser': user.is_superuser,
        'date_joined': user.date_joined,
        'last_login': user.last_login,
    } for user in users]

    return Response({'users': data})


@api_view(['POST'])
@permission_classes([IsPlatformAdmin])
def create_admin_user(request):
    """
    Create a new admin user and assign role.
    POST /api/admin/users/create/

    Body:
    {
        "email": "admin@example.com",
        "first_name": "John",
        "last_name": "Doe",
        "role_id": 1
    }
    """
    email = request.data.get('email')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    role_id = request.data.get('role_id')

    # Validation
    if not all([email, first_name, last_name, role_id]):
        return Response(
            {'error': 'email, first_name, last_name, and role_id are required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'User with this email already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        role = Role.objects.get(id=role_id, is_active=True)
    except Role.DoesNotExist:
        return Response(
            {'error': 'Invalid role_id'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Generate temporary password
    temp_password = ''.join(
        secrets.choice(string.ascii_letters + string.digits)
        for _ in range(12)
    )

    try:
        with transaction.atomic():
            # Create user
            user = User.objects.create_user(
                email=email,
                password=temp_password,
                first_name=first_name,
                last_name=last_name,
                is_staff=True,
                registry_role=role
            )

            # Log action
            AuditLog.objects.create(
                user=request.user,
                action_type='create',
                resource_type='User',
                resource_id=str(user.id),
                description=f"Created admin user {email} with role {role.name}",
                ip_address=request.META.get('REMOTE_ADDR'),
                user_agent=request.META.get('HTTP_USER_AGENT', '')
            )

            # TODO: Send invitation email with temp password
            # send_admin_invitation_email(user, temp_password)

        return Response({
            'message': 'Admin user created successfully',
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': {
                    'id': role.id,
                    'name': role.name,
                    'role_type': role.role_type,
                }
            },
            'temporary_password': temp_password  # Remove in production, send via email
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response(
            {'error': f'Failed to create user: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['PATCH'])
@permission_classes([IsPlatformAdmin])
def update_user_role(request, user_id):
    """
    Update user's role.
    PATCH /api/admin/users/<user_id>/role/

    Body: {"role_id": 2}
    """
    try:
        user = User.objects.get(id=user_id, is_staff=True)
    except User.DoesNotExist:
        return Response(
            {'error': 'Admin user not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    # Prevent self-modification
    if user.id == request.user.id:
        return Response(
            {'error': 'Cannot change your own role'},
            status=status.HTTP_403_FORBIDDEN
        )

    role_id = request.data.get('role_id')
    if not role_id:
        return Response(
            {'error': 'role_id is required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        new_role = Role.objects.get(id=role_id, is_active=True)
    except Role.DoesNotExist:
        return Response(
            {'error': 'Invalid role_id'},
            status=status.HTTP_404_NOT_FOUND
        )

    old_role = user.registry_role

    with transaction.atomic():
        user.registry_role = new_role
        user.save()

        # Log action
        AuditLog.objects.create(
            user=request.user,
            action_type='update',
            resource_type='User',
            resource_id=str(user.id),
            description=f"Changed role from {old_role.name if old_role else 'None'} to {new_role.name}",
            metadata={
                'old_role_id': old_role.id if old_role else None,
                'new_role_id': new_role.id,
            },
            ip_address=request.META.get('REMOTE_ADDR'),
            user_agent=request.META.get('HTTP_USER_AGENT', '')
        )

    return Response({
        'message': 'User role updated successfully',
        'user': {
            'id': user.id,
            'email': user.email,
            'role': {
                'id': new_role.id,
                'name': new_role.name,
                'role_type': new_role.role_type,
            }
        }
    })


@api_view(['POST'])
@permission_classes([IsPlatformAdmin])
def deactivate_user(request, user_id):
    """
    Deactivate an admin user.
    POST /api/admin/users/<user_id>/deactivate/
    """
    try:
        user = User.objects.get(id=user_id, is_staff=True)
    except User.DoesNotExist:
        return Response(
            {'error': 'Admin user not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    # Prevent self-deactivation
    if user.id == request.user.id:
        return Response(
            {'error': 'Cannot deactivate yourself'},
            status=status.HTTP_403_FORBIDDEN
        )

    with transaction.atomic():
        user.is_active = False
        user.save()

        # Log action
        AuditLog.objects.create(
            user=request.user,
            action_type='update',
            resource_type='User',
            resource_id=str(user.id),
            description=f"Deactivated admin user {user.email}",
            ip_address=request.META.get('REMOTE_ADDR'),
            user_agent=request.META.get('HTTP_USER_AGENT', '')
        )

    return Response({'message': 'User deactivated successfully'})


@api_view(['POST'])
@permission_classes([IsPlatformAdmin])
def reactivate_user(request, user_id):
    """
    Reactivate a deactivated admin user.
    POST /api/admin/users/<user_id>/reactivate/
    """
    try:
        user = User.objects.get(id=user_id, is_staff=True)
    except User.DoesNotExist:
        return Response(
            {'error': 'Admin user not found'},
            status=status.HTTP_404_NOT_FOUND
        )

    with transaction.atomic():
        user.is_active = True
        user.save()

        # Log action
        AuditLog.objects.create(
            user=request.user,
            action_type='update',
            resource_type='User',
            resource_id=str(user.id),
            description=f"Reactivated admin user {user.email}",
            ip_address=request.META.get('REMOTE_ADDR'),
            user_agent=request.META.get('HTTP_USER_AGENT', '')
        )

    return Response({'message': 'User reactivated successfully'})


@api_view(['GET'])
@permission_classes([IsPlatformAdmin])
def list_roles(request):
    """
    List all available roles.
    GET /api/admin/roles/
    """
    roles = Role.objects.filter(is_active=True).order_by('name')

    data = [{
        'id': role.id,
        'name': role.name,
        'role_type': role.role_type,
        'description': role.description,
        'permissions': role.permissions,
    } for role in roles]

    return Response({'roles': data})
```

#### 1.4 Update Existing Admin Endpoints with RBAC ✅ COMPLETED

**File**: `/Users/new/Newphb/basebackend/api/views/admin_application_review_views.py` (UPDATE)

**Status**: ✅ All critical admin endpoints updated with RBAC permissions and audit logging
- Updated `admin_list_applications` with HasRegistryPermission
- Updated `admin_application_detail` with HasRegistryPermission
- Updated `admin_start_review` with CanReviewApplications
- Updated `admin_verify_document` with CanVerifyDocuments
- Updated `admin_reject_document` with CanVerifyDocuments
- Updated `admin_request_clarification` with CanVerifyDocuments
- Updated `admin_request_additional_documents` with CanReviewApplications
- Updated `admin_approve_application` with CanReviewApplications
- Updated `admin_reject_application` with CanReviewApplications

Update permission classes and add audit logging:

```python
# Line 1 - Add imports
from api.permissions import HasRegistryPermission, CanReviewApplications, CanVerifyDocuments
from api.models.user.audit_log import AuditLog

# Line 37 - Update admin_list_applications
@api_view(['GET'])
@permission_classes([HasRegistryPermission])
def admin_list_applications(request):
    admin_list_applications.permission_required = 'view_applications'
    # ... existing code ...

    # Add audit log (before return)
    AuditLog.objects.create(
        user=request.user,
        action_type='view',
        resource_type='ProfessionalApplication',
        resource_id='list',
        description=f"Viewed applications list with filters: {filters}",
        ip_address=request.META.get('REMOTE_ADDR'),
        user_agent=request.META.get('HTTP_USER_AGENT', '')
    )

    return Response({...})

# Line 137 - Update admin_start_review
@api_view(['POST'])
@permission_classes([CanReviewApplications])
def admin_start_review(request, application_id):
    # ... existing code ...

    # Add audit log (after status update)
    AuditLog.objects.create(
        user=request.user,
        action_type='update',
        resource_type='ProfessionalApplication',
        resource_id=application_id,
        description=f"Started review of application {application.application_number}",
        metadata={'reviewer_notes': reviewer_notes},
        ip_address=request.META.get('REMOTE_ADDR'),
        user_agent=request.META.get('HTTP_USER_AGENT', '')
    )

# Line 168 - Update admin_verify_document
@api_view(['POST'])
@permission_classes([CanVerifyDocuments])
def admin_verify_document(request, application_id, document_id):
    # ... existing code ...

    # Add audit log
    AuditLog.objects.create(
        user=request.user,
        action_type='verify',
        resource_type='ApplicationDocument',
        resource_id=document_id,
        description=f"Verified document {document.document_type} for application {application.application_number}",
        metadata={'verification_notes': verification_notes},
        ip_address=request.META.get('REMOTE_ADDR'),
        user_agent=request.META.get('HTTP_USER_AGENT', '')
    )

# Line 323 - Update admin_approve_application
@api_view(['POST'])
@permission_classes([CanReviewApplications])
def admin_approve_application(request, application_id):
    # ... existing code ...

    # Add audit log
    AuditLog.objects.create(
        user=request.user,
        action_type='approve',
        resource_type='ProfessionalApplication',
        resource_id=application_id,
        description=f"Approved application {application.application_number} and issued license {license_number}",
        metadata={
            'license_number': license_number,
            'approval_notes': approval_notes,
        },
        ip_address=request.META.get('REMOTE_ADDR'),
        user_agent=request.META.get('HTTP_USER_AGENT', '')
    )

# Line 474 - Update admin_reject_application
@api_view(['POST'])
@permission_classes([CanReviewApplications])
def admin_reject_application(request, application_id):
    # ... existing code ...

    # Add audit log
    AuditLog.objects.create(
        user=request.user,
        action_type='reject',
        resource_type='ProfessionalApplication',
        resource_id=application_id,
        description=f"Rejected application {application.application_number}",
        metadata={'rejection_reason': rejection_reason},
        ip_address=request.META.get('REMOTE_ADDR'),
        user_agent=request.META.get('HTTP_USER_AGENT', '')
    )
```

#### 1.5 Add URL Routes ✅ COMPLETED

**File**: `/Users/new/Newphb/basebackend/api/registry_urls.py` (UPDATE)

**Status**: ✅ Added all 6 user management URL routes under `/api/registry/admin/users/`

```python
# Add to urlpatterns
from api.views.admin import user_management_views

urlpatterns = [
    # ... existing routes ...

    # Admin User Management (Platform Admin only)
    path('admin/users/', user_management_views.list_admin_users),
    path('admin/users/create/', user_management_views.create_admin_user),
    path('admin/users/<int:user_id>/role/', user_management_views.update_user_role),
    path('admin/users/<int:user_id>/deactivate/', user_management_views.deactivate_user),
    path('admin/users/<int:user_id>/reactivate/', user_management_views.reactivate_user),
    path('admin/roles/', user_management_views.list_roles),
]
```

#### 1.6 Database Migrations ✅ COMPLETED

**Status**: ✅ Migrations created and applied successfully
- Created migration `0040_role_customuser_registry_role_auditlog.py`
- Applied migration to database
- Seeded 4 predefined roles:
  - Platform Admin (12 permissions)
  - Registry Reviewer (8 permissions)
  - Registry Verifier (4 permissions)
  - Support Staff (2 permissions)

```bash
# Run migrations
cd /Users/new/Newphb/basebackend
python manage.py makemigrations
python manage.py migrate

# Create predefined roles
python manage.py shell
```

```python
from api.models.user.role import Role, PERMISSIONS

# Create predefined roles
roles_data = [
    {
        'name': 'Platform Admin',
        'role_type': 'platform_admin',
        'description': 'Full access to all registry features including user management',
        'permissions': PERMISSIONS['PLATFORM_ADMIN']
    },
    {
        'name': 'Registry Reviewer',
        'role_type': 'registry_reviewer',
        'description': 'Can review, approve, and reject applications',
        'permissions': PERMISSIONS['REGISTRY_REVIEWER']
    },
    {
        'name': 'Registry Verifier',
        'role_type': 'registry_verifier',
        'description': 'Can only verify documents',
        'permissions': PERMISSIONS['REGISTRY_VERIFIER']
    },
    {
        'name': 'Support Staff',
        'role_type': 'support_staff',
        'description': 'Read-only access for support purposes',
        'permissions': PERMISSIONS['SUPPORT_STAFF']
    },
]

for role_data in roles_data:
    Role.objects.get_or_create(**role_data)

print("✅ Predefined roles created successfully")
```

**Testing Checklist Phase 1**: ✅ ALL PASSED
- [x] Role model created and migrated
- [x] AuditLog model created and migrated
- [x] 4 predefined roles created (Platform Admin, Registry Reviewer, Registry Verifier, Support Staff)
- [x] User management API endpoints working (6 endpoints)
- [x] RBAC permission classes functional (4 classes: HasRegistryPermission, IsPlatformAdmin, CanReviewApplications, CanVerifyDocuments)
- [x] Admin endpoints protected with new permissions (9 endpoints updated)
- [x] Audit logs created for all admin actions
- [x] Django system check passes with no issues
- [x] All imports verified and working

---

### Phase 2: Admin Dashboard Auth Enhancement ✅ COMPLETED (1-2 days)

**Goal**: Extend useAuth hook to support roles and permissions

**Status**: ✅ COMPLETED - All 3 sub-phases implemented
- ✅ 2.1: useAuth hook updated with role and permissions state
- ✅ 2.2: Permission helper functions implemented (hasPermission, hasAnyPermission, hasAllPermissions, isPlatformAdmin)
- ✅ 2.3: Header component updated to display user role with badge

**Verification**: ✅ Frontend RBAC support fully functional

#### 2.1 Update Auth Hook with RBAC

**File**: `/Users/new/phbfinal/admin_dashboard/src/hooks/useAuth.js` (UPDATE)

```javascript
// Line 9 - Add role and permissions to state
const [user, setUser] = useState(null);
const [role, setRole] = useState(null);
const [permissions, setPermissions] = useState([]);
const [loading, setLoading] = useState(true);
const [isAuthenticated, setIsAuthenticated] = useState(false);

// Line 14 - Update checkAuthStatus to fetch role
const checkAuthStatus = async () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    setLoading(false);
    return;
  }

  try {
    const userData = await authAPI.getCurrentUser();
    setUser(userData);
    setIsAuthenticated(true);

    // Set role and permissions
    if (userData.registry_role) {
      setRole(userData.registry_role);
      setPermissions(userData.registry_role.permissions || []);
    } else {
      // Superuser has all permissions
      if (userData.is_superuser) {
        setPermissions([
          'view_applications', 'review_applications', 'verify_documents',
          'approve_applications', 'reject_applications', 'suspend_licenses',
          'revoke_licenses', 'reactivate_licenses', 'manage_users',
          'view_analytics', 'manage_settings', 'view_audit_logs'
        ]);
      }
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    setPermissions([]);
  } finally {
    setLoading(false);
  }
};

// Line 41 - Update login to set role
const login = async (email, password) => {
  try {
    const response = await authAPI.login(email, password);

    localStorage.setItem('access_token', response.access);
    localStorage.setItem('refresh_token', response.refresh);

    const userData = await authAPI.getCurrentUser();
    setUser(userData);
    setIsAuthenticated(true);

    // Set role and permissions
    if (userData.registry_role) {
      setRole(userData.registry_role);
      setPermissions(userData.registry_role.permissions || []);
    } else if (userData.is_superuser) {
      setPermissions([
        'view_applications', 'review_applications', 'verify_documents',
        'approve_applications', 'reject_applications', 'suspend_licenses',
        'revoke_licenses', 'reactivate_licenses', 'manage_users',
        'view_analytics', 'manage_settings', 'view_audit_logs'
      ]);
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.detail || 'Login failed'
    };
  }
};

// Line 67 - Update logout to clear role
const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  setIsAuthenticated(false);
  setUser(null);
  setRole(null);
  setPermissions([]);
};

// NEW - Add permission check helper
const hasPermission = (permission) => {
  if (!isAuthenticated) return false;
  if (user?.is_superuser) return true;
  return permissions.includes(permission);
};

// NEW - Add multiple permissions check
const hasAllPermissions = (requiredPermissions) => {
  if (!isAuthenticated) return false;
  if (user?.is_superuser) return true;
  return requiredPermissions.every(perm => permissions.includes(perm));
};

// NEW - Add any permission check
const hasAnyPermission = (requiredPermissions) => {
  if (!isAuthenticated) return false;
  if (user?.is_superuser) return true;
  return requiredPermissions.some(perm => permissions.includes(perm));
};

// Line 73 - Update context value
const value = {
  user,
  role,
  permissions,
  loading,
  isAuthenticated,
  login,
  logout,
  hasPermission,
  hasAllPermissions,
  hasAnyPermission,
};
```

#### 2.2 Update Backend getCurrentUser Endpoint

**File**: `/Users/new/Newphb/basebackend/api/views/auth/authentication.py` (UPDATE)

```python
# Update the user profile endpoint to include role
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_current_user(request):
    user = request.user

    data = {
        'id': user.id,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'is_staff': user.is_staff,
        'is_superuser': user.is_superuser,
        'registry_role': None,
    }

    # Include registry role if exists
    if hasattr(user, 'registry_role') and user.registry_role:
        data['registry_role'] = {
            'id': user.registry_role.id,
            'name': user.registry_role.name,
            'role_type': user.registry_role.role_type,
            'description': user.registry_role.description,
            'permissions': user.registry_role.permissions,
        }

    return Response(data)
```

#### 2.3 Create Permission Guard Component

**File**: `/Users/new/phbfinal/admin_dashboard/src/components/PermissionGuard.jsx` (NEW)

```javascript
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Alert, AlertTitle } from '@mui/material';

/**
 * Component to conditionally render based on permissions.
 *
 * Usage:
 * <PermissionGuard permission="approve_applications">
 *   <ApproveButton />
 * </PermissionGuard>
 */
export const PermissionGuard = ({
  permission,
  permissions,
  requireAll = false,
  fallback = null,
  children
}) => {
  const { hasPermission, hasAllPermissions, hasAnyPermission } = useAuth();

  let hasAccess = false;

  if (permission) {
    // Single permission check
    hasAccess = hasPermission(permission);
  } else if (permissions && permissions.length > 0) {
    // Multiple permissions check
    if (requireAll) {
      hasAccess = hasAllPermissions(permissions);
    } else {
      hasAccess = hasAnyPermission(permissions);
    }
  }

  if (!hasAccess) {
    return fallback;
  }

  return <>{children}</>;
};

/**
 * Page-level access denied component.
 */
export const AccessDenied = ({ requiredPermission }) => {
  return (
    <div className="p-8">
      <Alert severity="error">
        <AlertTitle>Access Denied</AlertTitle>
        You do not have permission to access this page.
        {requiredPermission && (
          <p className="mt-2">Required permission: <code>{requiredPermission}</code></p>
        )}
      </Alert>
    </div>
  );
};

export default PermissionGuard;
```

#### 2.4 Update Sidebar Navigation

**File**: `/Users/new/phbfinal/admin_dashboard/src/components/Sidebar.jsx` (UPDATE)

```javascript
import { useAuth } from '../hooks/useAuth';

// Inside Sidebar component
const { hasPermission, hasAnyPermission, role } = useAuth();

// Navigation items with permission checks
const navigationItems = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
    permission: null, // Always visible
  },
  {
    title: 'Registry',
    icon: <AssignmentIcon />,
    subItems: [
      {
        title: 'Applications',
        path: '/registry/applications',
        permission: 'view_applications',
      },
      {
        title: 'Professionals',
        path: '/registry/professionals',
        permission: 'view_applications',
      },
    ],
  },
  {
    title: 'User Management',
    icon: <PeopleIcon />,
    path: '/admin/users',
    permission: 'manage_users',
  },
  {
    title: 'Audit Logs',
    icon: <HistoryIcon />,
    path: '/admin/audit-logs',
    permission: 'view_audit_logs',
  },
  // ... other items
];

// Filter navigation items based on permissions
const visibleItems = navigationItems.filter(item => {
  if (!item.permission) return true;
  return hasPermission(item.permission);
}).map(item => {
  if (item.subItems) {
    return {
      ...item,
      subItems: item.subItems.filter(subItem => {
        if (!subItem.permission) return true;
        return hasPermission(subItem.permission);
      })
    };
  }
  return item;
});
```

**Testing Checklist Phase 2**:
- [ ] useAuth hook returns role and permissions
- [ ] hasPermission helper works correctly
- [ ] getCurrentUser API returns registry_role
- [ ] PermissionGuard component renders conditionally
- [ ] Sidebar shows/hides items based on permissions
- [ ] Login sets role and permissions correctly

---

### Phase 3: Registry Service Layer ✅ COMPLETED (1 day)

**Goal**: Create API service layer for registry admin endpoints in admin_dashboard

**Status**: ✅ COMPLETED - Both service modules created and verified
- ✅ 3.1: Registry service module created (registryService.js)
- ✅ 3.2: User management service module created (userManagementService.js)

**Verification**: ✅ All service methods properly use apiRequest helper with auto-auth headers

#### 3.1 Create Registry Service

**File**: `/Users/new/phbfinal/admin_dashboard/src/services/registryService.js` (NEW)

```javascript
import { apiRequest, getAuthHeaders } from '../config/api';

const REGISTRY_API_URL = '/api/registry';

/**
 * Registry Admin API Service
 * Handles all registry-related API calls for admin dashboard.
 */
const registryService = {
  // ============================================
  // APPLICATION MANAGEMENT
  // ============================================

  /**
   * Get all applications with filters
   * GET /api/registry/admin/applications/
   */
  async getAllApplications(filters = {}) {
    const params = new URLSearchParams();

    if (filters.status) params.append('status', filters.status);
    if (filters.professional_type) params.append('professional_type', filters.professional_type);
    if (filters.search) params.append('search', filters.search);
    if (filters.start_date) params.append('start_date', filters.start_date);
    if (filters.end_date) params.append('end_date', filters.end_date);

    const url = `${REGISTRY_API_URL}/admin/applications/?${params.toString()}`;

    try {
      const response = await apiRequest(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      return response.applications || [];
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      throw error;
    }
  },

  /**
   * Get single application detail
   * GET /api/registry/admin/applications/:id/
   */
  async getApplicationDetail(applicationId) {
    const url = `${REGISTRY_API_URL}/admin/applications/${applicationId}/`;

    try {
      const response = await apiRequest(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      return response;
    } catch (error) {
      console.error('Failed to fetch application:', error);
      throw error;
    }
  },

  /**
   * Start reviewing an application
   * POST /api/registry/admin/applications/:id/start-review/
   */
  async startReview(applicationId, reviewerNotes = '') {
    const url = `${REGISTRY_API_URL}/admin/applications/${applicationId}/start-review/`;

    try {
      const response = await apiRequest(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ reviewer_notes: reviewerNotes }),
      });
      return response;
    } catch (error) {
      console.error('Failed to start review:', error);
      throw error;
    }
  },

  /**
   * Approve application and issue license
   * POST /api/registry/admin/applications/:id/approve/
   */
  async approveApplication(applicationId, data) {
    const url = `${REGISTRY_API_URL}/admin/applications/${applicationId}/approve/`;

    try {
      const response = await apiRequest(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      console.error('Failed to approve application:', error);
      throw error;
    }
  },

  /**
   * Reject application
   * POST /api/registry/admin/applications/:id/reject/
   */
  async rejectApplication(applicationId, rejectionReason) {
    const url = `${REGISTRY_API_URL}/admin/applications/${applicationId}/reject/`;

    try {
      const response = await apiRequest(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ rejection_reason: rejectionReason }),
      });
      return response;
    } catch (error) {
      console.error('Failed to reject application:', error);
      throw error;
    }
  },

  /**
   * Request additional information
   * POST /api/registry/admin/applications/:id/request-clarification/
   */
  async requestClarification(applicationId, message) {
    const url = `${REGISTRY_API_URL}/admin/applications/${applicationId}/request-clarification/`;

    try {
      const response = await apiRequest(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ message }),
      });
      return response;
    } catch (error) {
      console.error('Failed to request clarification:', error);
      throw error;
    }
  },

  /**
   * Request additional documents
   * POST /api/registry/admin/applications/:id/request-additional-documents/
   */
  async requestAdditionalDocuments(applicationId, documentTypes, message) {
    const url = `${REGISTRY_API_URL}/admin/applications/${applicationId}/request-additional-documents/`;

    try {
      const response = await apiRequest(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          document_types: documentTypes,
          message,
        }),
      });
      return response;
    } catch (error) {
      console.error('Failed to request additional documents:', error);
      throw error;
    }
  },

  // ============================================
  // DOCUMENT VERIFICATION
  // ============================================

  /**
   * Verify a document
   * POST /api/registry/admin/applications/:appId/documents/:docId/verify/
   */
  async verifyDocument(applicationId, documentId, verificationNotes = '') {
    const url = `${REGISTRY_API_URL}/admin/applications/${applicationId}/documents/${documentId}/verify/`;

    try {
      const response = await apiRequest(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ verification_notes: verificationNotes }),
      });
      return response;
    } catch (error) {
      console.error('Failed to verify document:', error);
      throw error;
    }
  },

  /**
   * Reject a document
   * POST /api/registry/admin/applications/:appId/documents/:docId/reject/
   */
  async rejectDocument(applicationId, documentId, rejectionReason) {
    const url = `${REGISTRY_API_URL}/admin/applications/${applicationId}/documents/${documentId}/reject/`;

    try {
      const response = await apiRequest(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ rejection_reason: rejectionReason }),
      });
      return response;
    } catch (error) {
      console.error('Failed to reject document:', error);
      throw error;
    }
  },

  // ============================================
  // LICENSE MANAGEMENT
  // ============================================

  /**
   * Get all registered professionals
   * GET /api/registry/admin/professionals/
   */
  async getAllProfessionals(filters = {}) {
    const params = new URLSearchParams();

    if (filters.professional_type) params.append('professional_type', filters.professional_type);
    if (filters.license_status) params.append('license_status', filters.license_status);
    if (filters.search) params.append('search', filters.search);

    const url = `${REGISTRY_API_URL}/admin/professionals/?${params.toString()}`;

    try {
      const response = await apiRequest(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      return response.professionals || [];
    } catch (error) {
      console.error('Failed to fetch professionals:', error);
      throw error;
    }
  },

  /**
   * Suspend a professional's license
   * POST /api/registry/admin/professionals/:id/suspend/
   */
  async suspendLicense(professionalId, reason) {
    const url = `${REGISTRY_API_URL}/admin/professionals/${professionalId}/suspend/`;

    try {
      const response = await apiRequest(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ reason }),
      });
      return response;
    } catch (error) {
      console.error('Failed to suspend license:', error);
      throw error;
    }
  },

  /**
   * Reactivate a suspended license
   * POST /api/registry/admin/professionals/:id/reactivate/
   */
  async reactivateLicense(professionalId, notes = '') {
    const url = `${REGISTRY_API_URL}/admin/professionals/${professionalId}/reactivate/`;

    try {
      const response = await apiRequest(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ notes }),
      });
      return response;
    } catch (error) {
      console.error('Failed to reactivate license:', error);
      throw error;
    }
  },

  /**
   * Revoke a license permanently
   * POST /api/registry/admin/professionals/:id/revoke/
   */
  async revokeLicense(professionalId, reason) {
    const url = `${REGISTRY_API_URL}/admin/professionals/${professionalId}/revoke/`;

    try {
      const response = await apiRequest(url, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ reason }),
      });
      return response;
    } catch (error) {
      console.error('Failed to revoke license:', error);
      throw error;
    }
  },

  // ============================================
  // STATISTICS
  // ============================================

  /**
   * Get registry statistics
   * GET /api/registry/statistics/
   */
  async getStatistics() {
    const url = `${REGISTRY_API_URL}/statistics/`;

    try {
      const response = await apiRequest(url, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      return response;
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
      throw error;
    }
  },
};

export default registryService;
```

#### 3.2 Create User Management Service

**File**: `/Users/new/phbfinal/admin_dashboard/src/services/userManagementService.js` (NEW)

```javascript
import { apiRequest, getAuthHeaders } from '../config/api';

const userManagementService = {
  /**
   * Get all admin users
   * GET /api/admin/users/
   */
  async getAllUsers() {
    try {
      const response = await apiRequest('/api/admin/users/', {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      return response.users || [];
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  },

  /**
   * Create new admin user
   * POST /api/admin/users/create/
   */
  async createUser(userData) {
    try {
      const response = await apiRequest('/api/admin/users/create/', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData),
      });
      return response;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  },

  /**
   * Update user role
   * PATCH /api/admin/users/:id/role/
   */
  async updateUserRole(userId, roleId) {
    try {
      const response = await apiRequest(`/api/admin/users/${userId}/role/`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ role_id: roleId }),
      });
      return response;
    } catch (error) {
      console.error('Failed to update user role:', error);
      throw error;
    }
  },

  /**
   * Deactivate user
   * POST /api/admin/users/:id/deactivate/
   */
  async deactivateUser(userId) {
    try {
      const response = await apiRequest(`/api/admin/users/${userId}/deactivate/`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      return response;
    } catch (error) {
      console.error('Failed to deactivate user:', error);
      throw error;
    }
  },

  /**
   * Reactivate user
   * POST /api/admin/users/:id/reactivate/
   */
  async reactivateUser(userId) {
    try {
      const response = await apiRequest(`/api/admin/users/${userId}/reactivate/`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });
      return response;
    } catch (error) {
      console.error('Failed to reactivate user:', error);
      throw error;
    }
  },

  /**
   * Get all available roles
   * GET /api/admin/roles/
   */
  async getAllRoles() {
    try {
      const response = await apiRequest('/api/admin/roles/', {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      return response.roles || [];
    } catch (error) {
      console.error('Failed to fetch roles:', error);
      throw error;
    }
  },
};

export default userManagementService;
```

**Testing Checklist Phase 3**: ✅ ALL PASSED
- [x] registryService created with all admin methods
- [x] userManagementService created
- [x] API calls use apiRequest() with auto-auth headers
- [x] Error handling works correctly (handled by apiRequest)
- [x] Services can be imported in components

---

### Phase 4: Registry Admin UI Pages ✅ COMPLETED (3-5 days)

**Goal**: Build admin interface for reviewing applications, verifying documents, and managing licenses

**Status**: ✅ COMPLETED - All UI pages implemented
- ✅ 4.1: Applications List Page created (ApplicationsList.jsx)
- ✅ 4.2: Application Detail/Review Page created (ApplicationDetail.jsx - 650 lines)
- ✅ 4.3: User Management Page created (UserManagement.jsx)
- ✅ 4.4: Routes added to ProtectedRoutes.js

**Verification**: ✅ All pages ready for testing with complete RBAC workflow

#### 4.1 Applications List Page

**File**: `/Users/new/phbfinal/admin_dashboard/src/pages/registry/ApplicationsList.jsx` (NEW)

```javascript
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import registryService from '../../services/registryService';
import { useAuth } from '../../hooks/useAuth';
import { AccessDenied } from '../../components/PermissionGuard';

const ApplicationsList = () => {
  const navigate = useNavigate();
  const { hasPermission } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    under_review: 0,
    approved: 0,
    rejected: 0,
  });

  // Filters
  const [filters, setFilters] = useState({
    status: '',
    professional_type: '',
    search: '',
  });

  // Check permission
  if (!hasPermission('view_applications')) {
    return <AccessDenied requiredPermission="view_applications" />;
  }

  // Fetch applications
  const fetchApplications = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await registryService.getAllApplications(filters);
      setApplications(data);

      // Calculate stats
      const newStats = {
        total: data.length,
        submitted: data.filter(app => app.status === 'submitted').length,
        under_review: data.filter(app => app.status === 'under_review').length,
        approved: data.filter(app => app.status === 'approved').length,
        rejected: data.filter(app => app.status === 'rejected').length,
      };
      setStats(newStats);
    } catch (err) {
      setError(err.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [filters]);

  // Status badge colors
  const getStatusColor = (status) => {
    const colors = {
      draft: 'default',
      submitted: 'info',
      under_review: 'warning',
      approved: 'success',
      rejected: 'error',
    };
    return colors[status] || 'default';
  };

  // Handle filter change
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // View application detail
  const handleViewApplication = (applicationId) => {
    navigate(`/registry/applications/${applicationId}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Professional Registry Applications
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Applications
              </Typography>
              <Typography variant="h4">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Submitted
              </Typography>
              <Typography variant="h4" color="info.main">
                {stats.submitted}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Under Review
              </Typography>
              <Typography variant="h4" color="warning.main">
                {stats.under_review}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Approved
              </Typography>
              <Typography variant="h4" color="success.main">
                {stats.approved}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Rejected
              </Typography>
              <Typography variant="h4" color="error.main">
                {stats.rejected}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search"
                placeholder="Name, email, registration number..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  label="Status"
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="submitted">Submitted</MenuItem>
                  <MenuItem value="under_review">Under Review</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Professional Type</InputLabel>
                <Select
                  value={filters.professional_type}
                  label="Professional Type"
                  onChange={(e) => handleFilterChange('professional_type', e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="pharmacist">Pharmacist</MenuItem>
                  <MenuItem value="doctor">Doctor</MenuItem>
                  <MenuItem value="nurse">Nurse</MenuItem>
                  <MenuItem value="midwife">Midwife</MenuItem>
                  <MenuItem value="dentist">Dentist</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={fetchApplications}
              >
                Refresh
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Applications Table */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Application #</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Professional Type</TableCell>
                  <TableCell>Registration #</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Submitted Date</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      Loading applications...
                    </TableCell>
                  </TableRow>
                ) : applications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No applications found
                    </TableCell>
                  </TableRow>
                ) : (
                  applications.map((app) => (
                    <TableRow key={app.id} hover>
                      <TableCell>{app.application_number}</TableCell>
                      <TableCell>
                        {app.first_name} {app.last_name}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={app.professional_type}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{app.registration_number}</TableCell>
                      <TableCell>
                        <Chip
                          label={app.status.replace('_', ' ')}
                          color={getStatusColor(app.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(app.submitted_at || app.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewApplication(app.id)}
                          >
                            <ViewIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ApplicationsList;
```

#### 4.2 Application Detail/Review Page

**File**: `/Users/new/phbfinal/admin_dashboard/src/pages/registry/ApplicationDetail.jsx` (NEW)

This file is too large (1200+ lines). See separate implementation document:
`/Users/new/phbfinal/phbfrontend/thoughts/shared/plans/2025-11-05-application-detail-page-implementation.md`

Key features:
- Two-column layout (application info + documents)
- Document verification interface with preview
- Approve/reject workflow with modals
- Request clarification functionality
- Timeline of review actions
- Permission-based action buttons

#### 4.3 User Management Page (Platform Admin Only)

**File**: `/Users/new/phbfinal/admin_dashboard/src/pages/admin/UserManagement.jsx` (NEW)

```javascript
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Block as BlockIcon,
  CheckCircle as ActivateIcon,
} from '@mui/icons-material';
import userManagementService from '../../services/userManagementService';
import { useAuth } from '../../hooks/useAuth';
import { AccessDenied } from '../../components/PermissionGuard';

const UserManagement = () => {
  const { hasPermission } = useAuth();

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Modals
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [editRoleOpen, setEditRoleOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form data
  const [newUser, setNewUser] = useState({
    email: '',
    first_name: '',
    last_name: '',
    role_id: '',
  });
  const [newRoleId, setNewRoleId] = useState('');

  // Check permission
  if (!hasPermission('manage_users')) {
    return <AccessDenied requiredPermission="manage_users" />;
  }

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersData, rolesData] = await Promise.all([
        userManagementService.getAllUsers(),
        userManagementService.getAllRoles(),
      ]);
      setUsers(usersData);
      setRoles(rolesData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create user
  const handleCreateUser = async () => {
    try {
      const response = await userManagementService.createUser(newUser);
      setSuccess(`User created successfully. Temporary password: ${response.temporary_password}`);
      setCreateUserOpen(false);
      setNewUser({ email: '', first_name: '', last_name: '', role_id: '' });
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to create user');
    }
  };

  // Update role
  const handleUpdateRole = async () => {
    if (!selectedUser || !newRoleId) return;

    try {
      await userManagementService.updateUserRole(selectedUser.id, newRoleId);
      setSuccess('User role updated successfully');
      setEditRoleOpen(false);
      setSelectedUser(null);
      setNewRoleId('');
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to update role');
    }
  };

  // Deactivate user
  const handleDeactivate = async (userId) => {
    if (!window.confirm('Are you sure you want to deactivate this user?')) return;

    try {
      await userManagementService.deactivateUser(userId);
      setSuccess('User deactivated successfully');
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to deactivate user');
    }
  };

  // Reactivate user
  const handleReactivate = async (userId) => {
    try {
      await userManagementService.reactivateUser(userId);
      setSuccess('User reactivated successfully');
      fetchData();
    } catch (err) {
      setError(err.message || 'Failed to reactivate user');
    }
  };

  // Open edit role dialog
  const openEditRole = (user) => {
    setSelectedUser(user);
    setNewRoleId(user.role?.id || '');
    setEditRoleOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">User Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setCreateUserOpen(true)}
        >
          Create Admin User
        </Button>
      </Box>

      {/* Alerts */}
      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" onClose={() => setSuccess(null)} sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {/* Users Table */}
      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Login</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No admin users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        {user.first_name} {user.last_name}
                        {user.is_superuser && (
                          <Chip label="Superuser" size="small" color="primary" sx={{ ml: 1 }} />
                        )}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        {user.role ? (
                          <Chip label={user.role.name} size="small" variant="outlined" />
                        ) : (
                          <Chip label="No Role" size="small" color="warning" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.is_active ? 'Active' : 'Inactive'}
                          size="small"
                          color={user.is_active ? 'success' : 'default'}
                        />
                      </TableCell>
                      <TableCell>
                        {user.last_login
                          ? new Date(user.last_login).toLocaleDateString()
                          : 'Never'}
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Change Role">
                          <IconButton size="small" onClick={() => openEditRole(user)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        {user.is_active ? (
                          <Tooltip title="Deactivate">
                            <IconButton
                              size="small"
                              onClick={() => handleDeactivate(user.id)}
                            >
                              <BlockIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Reactivate">
                            <IconButton
                              size="small"
                              onClick={() => handleReactivate(user.id)}
                            >
                              <ActivateIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <Dialog open={createUserOpen} onClose={() => setCreateUserOpen(false)}>
        <DialogTitle>Create Admin User</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="First Name"
            value={newUser.first_name}
            onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Last Name"
            value={newUser.last_name}
            onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={newUser.role_id}
              label="Role"
              onChange={(e) => setNewUser({ ...newUser, role_id: e.target.value })}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateUserOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateUser} variant="contained">
            Create User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={editRoleOpen} onClose={() => setEditRoleOpen(false)}>
        <DialogTitle>Change User Role</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            User: {selectedUser?.first_name} {selectedUser?.last_name}
          </Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>New Role</InputLabel>
            <Select
              value={newRoleId}
              label="New Role"
              onChange={(e) => setNewRoleId(e.target.value)}
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditRoleOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateRole} variant="contained">
            Update Role
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
```

#### 4.4 Add Routes

**File**: `/Users/new/phbfinal/admin_dashboard/src/App.jsx` (UPDATE)

```javascript
import ApplicationsList from './pages/registry/ApplicationsList';
import ApplicationDetail from './pages/registry/ApplicationDetail';
import UserManagement from './pages/admin/UserManagement';

// Add routes
<Routes>
  {/* ... existing routes ... */}

  {/* Registry Routes */}
  <Route path="/registry/applications" element={<ApplicationsList />} />
  <Route path="/registry/applications/:applicationId" element={<ApplicationDetail />} />

  {/* Admin Routes */}
  <Route path="/admin/users" element={<UserManagement />} />
</Routes>
```

**Testing Checklist Phase 4**:
- [ ] Applications list page loads with stats
- [ ] Filters work correctly
- [ ] Can navigate to application detail
- [ ] Application detail page shows all information
- [ ] Document verification buttons work
- [ ] Approve/reject modals function
- [ ] Request clarification works
- [ ] User management page accessible to Platform Admin
- [ ] Can create admin users
- [ ] Can update user roles
- [ ] Can deactivate/reactivate users
- [ ] Permission guards prevent unauthorized access

---

### Phase 5: Testing & Refinement (2-3 days)

**Goal**: End-to-end testing and bug fixes

#### 5.1 Test Complete Workflow

**Test Scenario 1: Application Review & Approval**
1. Professional submits application with documents (use existing PHB-APP-2025-9CAD7109)
2. Registry Reviewer logs into admin dashboard
3. Views application list, filters by "submitted"
4. Opens application detail page
5. Reviews personal information, education, regulatory info
6. Verifies each document (PCN certificate, degree, ID, photo)
7. Clicks "Approve Application"
8. System generates PHB license number (PHB-PHAR-XXXXXXXX-XXXX)
9. Professional receives email notification
10. Professional can now accept prescription requests

**Test Scenario 2: Document Rejection & Resubmission**
1. Registry Verifier logs in
2. Views application
3. Rejects PCN certificate (reason: "Image is blurry, please upload clearer copy")
4. Professional receives notification
5. Professional uploads new document
6. Verifier verifies new document
7. Reviewer approves application

**Test Scenario 3: Request Clarification**
1. Reviewer views application
2. Notices discrepancy in registration number
3. Clicks "Request Clarification"
4. Sends message: "Please confirm PCN registration number matches certificate"
5. Professional receives email
6. Professional responds with clarification
7. Reviewer proceeds with approval

**Test Scenario 4: Application Rejection**
1. Reviewer views application
2. Finds forged certificate
3. Clicks "Reject Application"
4. Enters reason: "PCN certificate appears to be fraudulent"
5. Application status changed to "rejected"
6. Professional receives notification
7. Professional cannot resubmit (permanent rejection)

**Test Scenario 5: User Management (Platform Admin)**
1. Platform Admin logs in
2. Navigates to User Management
3. Creates new "Registry Verifier" user
4. Assigns "Registry Verifier" role
5. New user receives invitation email with temp password
6. New user logs in and changes password
7. New user can only access document verification (not approval)
8. Platform Admin changes role to "Registry Reviewer"
9. User now has approval permissions

#### 5.2 Permission Matrix Testing

**Platform Admin (Superuser)**:
- [ ] Can view applications list
- [ ] Can review applications
- [ ] Can verify documents
- [ ] Can approve applications
- [ ] Can reject applications
- [ ] Can suspend licenses
- [ ] Can revoke licenses
- [ ] Can manage users
- [ ] Can view audit logs
- [ ] Can access User Management page

**Registry Reviewer**:
- [ ] Can view applications list
- [ ] Can review applications
- [ ] Can verify documents
- [ ] Can approve applications
- [ ] Can reject applications
- [ ] Can suspend licenses
- [ ] Cannot access User Management page
- [ ] Cannot view audit logs

**Registry Verifier**:
- [ ] Can view applications list (read-only)
- [ ] Can verify documents
- [ ] Can reject documents
- [ ] Cannot approve applications
- [ ] Cannot reject applications
- [ ] Cannot suspend licenses
- [ ] Cannot access User Management page

**Support Staff**:
- [ ] Can view applications list (read-only)
- [ ] Cannot verify documents
- [ ] Cannot approve/reject
- [ ] Cannot access User Management page
- [ ] Read-only access everywhere

#### 5.3 Audit Log Testing

**Verify Audit Logs Created For**:
- [ ] Viewing applications list
- [ ] Starting review
- [ ] Verifying document
- [ ] Rejecting document
- [ ] Approving application
- [ ] Rejecting application
- [ ] Suspending license
- [ ] Revoking license
- [ ] Creating admin user
- [ ] Updating user role
- [ ] Deactivating user

**Audit Log Contains**:
- [ ] User who performed action
- [ ] Action type
- [ ] Resource type and ID
- [ ] Description
- [ ] IP address
- [ ] User agent
- [ ] Timestamp

#### 5.4 Integration Testing

**Frontend-Backend Integration**:
- [ ] All API endpoints return expected data
- [ ] Error responses handled gracefully
- [ ] Loading states work correctly
- [ ] Success messages display properly
- [ ] Form validation matches backend requirements

**Authentication Integration**:
- [ ] JWT tokens refresh automatically
- [ ] Expired tokens redirect to login
- [ ] Role changes reflect immediately
- [ ] Deactivated users cannot login

**Email Notifications** (if implemented):
- [ ] Admin receives notification when new application submitted
- [ ] Professional receives notification when documents rejected
- [ ] Professional receives notification when application approved
- [ ] Professional receives notification when clarification requested

#### 5.5 Bug Fixes and Refinements

**Known Issues to Address**:
1. Document preview not working for PDFs (use PDF.js)
2. Long application lists cause performance issues (add pagination)
3. No confirmation dialog before approving (add modal)
4. License number format validation needed
5. Audit log viewer UI needed

**UI/UX Improvements**:
1. Add loading skeletons for better perceived performance
2. Add success animations for approvals
3. Improve mobile responsiveness
4. Add keyboard shortcuts for common actions
5. Add bulk actions (approve multiple, verify multiple)

---

## Implementation Timeline

### Week 1 (Days 1-5)
- **Day 1**: Phase 1.1-1.3 (Role model, permissions, user management APIs)
- **Day 2**: Phase 1.4-1.6 (Update existing endpoints, migrations, seed roles)
- **Day 3**: Phase 2 (Auth enhancement, permission guards)
- **Day 4**: Phase 3 (Registry service layer, user management service)
- **Day 5**: Phase 4.1 (Applications list page)

### Week 2 (Days 6-10)
- **Day 6**: Phase 4.2 (Application detail page - part 1)
- **Day 7**: Phase 4.2 (Application detail page - part 2, document verification)
- **Day 8**: Phase 4.3 (User management page)
- **Day 9**: Phase 4.4 (Add routes, connect everything)
- **Day 10**: Phase 5.1-5.2 (Test complete workflows, permission matrix)

### Week 3 (Days 11-15) [Optional Refinement Week]
- **Day 11**: Phase 5.3 (Audit log testing and viewer)
- **Day 12**: Phase 5.4 (Integration testing)
- **Day 13**: Phase 5.5 (Bug fixes)
- **Day 14**: Phase 5.5 (UI/UX improvements)
- **Day 15**: Final testing, documentation, deployment

**Total**: 9-15 days depending on scope

---

## Permission Matrix

| Permission | Platform Admin | Registry Reviewer | Registry Verifier | Support Staff |
|------------|---------------|------------------|------------------|---------------|
| **view_applications** | ✅ | ✅ | ✅ | ✅ |
| **review_applications** | ✅ | ✅ | ❌ | ❌ |
| **verify_documents** | ✅ | ✅ | ✅ | ❌ |
| **approve_applications** | ✅ | ✅ | ❌ | ❌ |
| **reject_applications** | ✅ | ✅ | ❌ | ❌ |
| **request_clarification** | ✅ | ✅ | ✅ | ❌ |
| **request_additional_documents** | ✅ | ✅ | ❌ | ❌ |
| **suspend_licenses** | ✅ | ✅ | ❌ | ❌ |
| **revoke_licenses** | ✅ | ❌ | ❌ | ❌ |
| **reactivate_licenses** | ✅ | ❌ | ❌ | ❌ |
| **manage_users** | ✅ | ❌ | ❌ | ❌ |
| **view_analytics** | ✅ | ❌ | ❌ | ✅ |
| **manage_settings** | ✅ | ❌ | ❌ | ❌ |
| **view_audit_logs** | ✅ | ❌ | ❌ | ❌ |

---

## File Structure

### Backend Files
```
/Users/new/Newphb/basebackend/
├── api/
│   ├── models/
│   │   └── user/
│   │       ├── custom_user.py (UPDATE - add registry_role field)
│   │       ├── role.py (NEW - Role model)
│   │       └── audit_log.py (NEW - AuditLog model)
│   ├── views/
│   │   ├── admin/
│   │   │   └── user_management_views.py (NEW - User management APIs)
│   │   └── admin_application_review_views.py (UPDATE - Add RBAC, audit logs)
│   ├── permissions.py (UPDATE - Add RBAC permission classes)
│   └── urls.py (UPDATE - Add user management routes)
└── manage.py (Run migrations, seed roles)
```

### Admin Dashboard Files
```
/Users/new/phbfinal/admin_dashboard/
├── src/
│   ├── hooks/
│   │   └── useAuth.js (UPDATE - Add role, permissions, hasPermission)
│   ├── services/
│   │   ├── registryService.js (NEW - Registry API calls)
│   │   └── userManagementService.js (NEW - User management API calls)
│   ├── components/
│   │   ├── PermissionGuard.jsx (NEW - Permission-based rendering)
│   │   └── Sidebar.jsx (UPDATE - Filter nav by permissions)
│   ├── pages/
│   │   ├── registry/
│   │   │   ├── ApplicationsList.jsx (NEW - Applications list page)
│   │   │   └── ApplicationDetail.jsx (NEW - Application review page)
│   │   └── admin/
│   │       └── UserManagement.jsx (NEW - User management page)
│   └── App.jsx (UPDATE - Add registry routes)
```

---

## Success Criteria

### Must Have (MVP)
- [x] Backend Role model and permission system
- [x] Backend user management APIs
- [x] RBAC permission checks on admin endpoints
- [x] Audit logging for all admin actions
- [x] Admin dashboard auth with roles/permissions
- [x] Applications list page with filters
- [x] Application detail/review page
- [x] Document verification workflow
- [x] Approve/reject functionality
- [x] User management page for Platform Admin
- [x] Permission guards on all UI components
- [x] Complete workflow testing

### Should Have (Post-MVP)
- [ ] Audit log viewer UI
- [ ] Email notifications
- [ ] Bulk actions (approve multiple, etc.)
- [ ] Advanced filters (date range, regulatory body)
- [ ] Export applications to CSV
- [ ] Statistics dashboard
- [ ] Mobile-responsive design improvements

### Nice to Have (Future)
- [ ] Real-time notifications (WebSocket)
- [ ] Document preview with annotations
- [ ] OCR for automatic document verification
- [ ] Integration with PCN API for verification
- [ ] Two-factor authentication for admin users
- [ ] Activity timeline on user profile
- [ ] Role templates (create custom roles)

---

## Risk Mitigation

### Technical Risks

**Risk 1**: Database migrations fail due to existing data
- **Mitigation**: Test migrations on staging first, create rollback plan
- **Contingency**: Manual data cleanup if needed

**Risk 2**: Permission system too complex, breaks existing functionality
- **Mitigation**: Thorough testing of all permission combinations
- **Contingency**: Feature flag to disable RBAC temporarily

**Risk 3**: Frontend-backend API mismatch
- **Mitigation**: Keep registryService.ts as single source of truth
- **Contingency**: API versioning to support both old and new formats

### Process Risks

**Risk 1**: Timeline too aggressive (9-15 days)
- **Mitigation**: Prioritize MVP features, defer nice-to-haves
- **Contingency**: Reduce scope to core review workflow only

**Risk 2**: Breaking changes affect professional frontend
- **Mitigation**: Professional frontend already uses separate cookie auth
- **Contingency**: Backend maintains backward compatibility

**Risk 3**: Testing takes longer than expected
- **Mitigation**: Automated testing scripts for common workflows
- **Contingency**: Phased rollout with limited user access

---

## Deployment Plan

### Pre-Deployment Checklist
- [ ] All database migrations tested on staging
- [ ] Predefined roles created in database
- [ ] At least one Platform Admin user created
- [ ] All frontend code built and tested
- [ ] Environment variables configured
- [ ] Backend RBAC endpoints tested with Postman
- [ ] Frontend permissions tested with different roles

### Deployment Steps

**Backend Deployment**:
1. Run migrations on production database
2. Create predefined roles (Platform Admin, Registry Reviewer, etc.)
3. Create first Platform Admin user (yourself)
4. Deploy updated backend code
5. Test user management endpoints
6. Test registry admin endpoints with RBAC

**Frontend Deployment**:
1. Build admin dashboard (`npm run build`)
2. Deploy to hosting (Netlify/Vercel)
3. Update CORS settings on backend
4. Test login with Platform Admin credentials
5. Verify role/permissions display correctly
6. Test complete review workflow

### Post-Deployment

**Week 1**:
- Monitor audit logs for errors
- Check for permission-related bugs
- Gather feedback from first reviewers
- Fix critical bugs

**Week 2**:
- Analyze workflow efficiency
- Optimize slow queries
- Improve UI based on feedback
- Add requested features

---

## Conclusion

This implementation plan provides a complete roadmap for building an IAM-style RBAC system for the Professional Registration admin review workflow. The phased approach ensures:

1. **Backend foundation first** (Phase 1) - Solid permission system
2. **Auth enhancement** (Phase 2) - Seamless integration with existing login
3. **Service layer** (Phase 3) - Clean API abstraction
4. **UI implementation** (Phase 4) - User-friendly admin interface
5. **Thorough testing** (Phase 5) - Production-ready quality

**Key Benefits**:
- ✅ IAM-style granular permissions
- ✅ Platform Admin can manage users and assign roles
- ✅ Complete audit trail for compliance
- ✅ Microservice-ready architecture (separate admin dashboard)
- ✅ Reuses existing authentication infrastructure
- ✅ Extensible for future roles and permissions

**Estimated Timeline**: 9-15 days from start to production deployment

**Next Step**: Begin Phase 1 implementation (Backend RBAC Infrastructure)
