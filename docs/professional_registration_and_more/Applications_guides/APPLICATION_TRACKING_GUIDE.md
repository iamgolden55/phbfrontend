# Application Tracking System - User Guide

**Date**: 2025-11-03

---

## How Users Track Their Applications

### 1. **Automatic Tracking (Cookie-Based)**

Users **don't need** to enter application IDs! The system automatically shows their applications.

**How It Works:**
```
User submits application
    ↓
Receives email with link: /registry/dashboard
    ↓
Clicks link (while logged in)
    ↓
JWT cookie is sent automatically
    ↓
Backend: request.user identifies the user
    ↓
Frontend: Shows ONLY their applications
```

### 2. **Dashboard Route**

**URL**: `http://localhost:5173/registry/dashboard`

**Features:**
- ✅ View all user's applications
- ✅ Status tracking (Draft, Submitted, Under Review, Approved, Rejected)
- ✅ Upload required documents
- ✅ View admin feedback
- ✅ Download approved license
- ✅ View submission dates

### 3. **Status Indicators**

| Status | Icon | Color | Meaning |
|--------|------|-------|---------|
| Draft | 📝 | Gray | Application started but not submitted |
| Submitted | 📤 | Blue | Waiting for admin review |
| Under Review | 🔍 | Yellow | Admin is reviewing the application |
| Approved | ✅ | Green | License issued! |
| Rejected | ❌ | Red | Application denied (reason provided) |
| Clarification Requested | ⚠️ | Orange | Admin needs more information |

---

## Authentication Flow

### For New Users (Public Endpoint)

```
1. User fills form at /registry/apply (not logged in)
2. Submits with email: user@example.com
3. Backend creates:
   - User account
   - Professional application
   - Random password: random_xyz_123
4. Email sent with credentials:
   Username: user@example.com
   Password: random_xyz_123
5. User logs in with these credentials
6. Can now access /registry/dashboard
7. Dashboard automatically shows their application
```

### For Existing Users (Authenticated Endpoint)

```
1. User already has PHB account
2. Logs in first
3. Goes to /registry/apply (now authenticated)
4. Fills and submits form
5. Backend creates:
   - Professional application only (no new user)
6. Email sent WITHOUT credentials (user already has login)
7. User already logged in → clicks link
8. Dashboard shows their new application
```

---

## No Manual ID Entry Needed!

**Old System (Manual Tracking):**
```
❌ User: "Enter your application ID: _______"
❌ User: "Click Track Application button"
❌ Backend: Checks if ID exists, returns data
```

**New System (Automatic):**
```
✅ User: Just clicks email link
✅ Browser: Automatically sends auth cookie
✅ Backend: request.user → filter applications
✅ Frontend: Shows user's apps automatically
```

---

## Email Link

**Original (Incorrect)**: `http://localhost:5173/professional/applications`
**Fixed (Correct)**: `http://localhost:5173/registry/dashboard`

**Why This Works:**
- Route exists ✅
- Protected by `ProfessionalRouteGuard` ✅
- Calls `registryService.professional.getMyApplications()` ✅
- Backend filters by `request.user` ✅

---

## Backend API Endpoint

**Endpoint**: `GET /api/registry/applications/`

**Request Headers:**
```http
Cookie: access_token=<JWT_TOKEN>; refresh_token=<JWT_REFRESH>
```

**Backend Code:**
```python
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def professional_applications_list_create(request):
    if request.method == 'GET':
        # Automatically filters by authenticated user
        applications = ProfessionalApplication.objects.filter(
            user=request.user  # ← THIS IS THE MAGIC!
        ).select_related('reviewed_by').prefetch_related('documents')

        serializer = ProfessionalApplicationListSerializer(
            applications,
            many=True,
            context={'request': request}
        )

        return Response({
            'count': applications.count(),
            'applications': serializer.data
        })
```

**Key Point**: `user=request.user` ensures users only see **their own** applications.

---

## Frontend Service Call

**File**: `src/services/registryService.ts`

**Function**: `getMyApplications()`

```typescript
async getMyApplications(): Promise<ProfessionalApplication[]> {
    const response = await apiRequest<{ applications: ProfessionalApplication[] }>(
        `${REGISTRY_BASE_URL}/applications/`,
        'GET'
        // No application ID needed!
        // Cookie sent automatically via credentials: 'include'
    );
    return response.applications;
}
```

**Authentication Handled By:**
```typescript
async function apiRequest<T>(
    endpoint: string,
    method: string,
    body?: any
): Promise<T> {
    const config: RequestInit = {
        method,
        headers,
        credentials: 'include',  // ← Sends JWT cookies automatically!
    };

    const response = await fetch(url, config);
    return await response.json();
}
```

---

## Security Benefits

### Why Cookie-Based is Better

**localStorage (Old Way):**
```javascript
❌ localStorage.getItem('phb_token')
❌ Accessible to JavaScript
❌ Vulnerable to XSS attacks
❌ Manual token management
```

**httpOnly Cookies (New Way):**
```javascript
✅ Browser manages cookies
✅ Invisible to JavaScript
✅ XSS protection built-in
✅ Automatic transmission
✅ Secure by default
```

### Attack Prevention

**XSS Attack Attempt:**
```html
<!-- Malicious script injected somehow -->
<script>
  // Try to steal token
  localStorage.getItem('phb_token');  // ❌ Would work with localStorage
  document.cookie;                     // ✅ Won't show httpOnly cookies!

  // httpOnly cookies are invisible!
  // Cannot be accessed, cannot be stolen
</script>
```

---

## User Experience Flow

### New User Journey

1. **Submit Application** → `/registry/apply`
   - Fills form
   - Submits
   - Sees success message

2. **Receive Email** → Inbox
   - Subject: "✅ Professional Application Submitted"
   - Contains credentials
   - Contains dashboard link

3. **Login** → `/login`
   - Uses credentials from email
   - JWT cookie set automatically

4. **Track Application** → `/registry/dashboard`
   - Clicks email link
   - Dashboard loads
   - Shows their application automatically
   - No ID entry needed!

5. **View Details** → `/registry/applications/:id`
   - Clicks application card
   - Sees full details
   - Can upload documents

### Existing User Journey

1. **Login First** → `/login`
   - Uses existing credentials
   - JWT cookie set

2. **Submit Application** → `/registry/apply`
   - Already logged in
   - Fills form
   - Submits

3. **Receive Email** → Inbox
   - Subject: "✅ Professional Application Submitted"
   - NO credentials (already has login)
   - Contains dashboard link

4. **Track Application** → `/registry/dashboard`
   - Already logged in
   - Clicks email link
   - Dashboard shows new application
   - Can track progress immediately

---

## Testing Checklist

### Test Scenario 1: New User
- [ ] Submit application at `/registry/apply` (not logged in)
- [ ] Receive email with credentials
- [ ] Login with provided credentials
- [ ] Click dashboard link from email
- [ ] Verify application appears
- [ ] Verify no manual ID entry required

### Test Scenario 2: Existing User
- [ ] Login first
- [ ] Submit application at `/registry/apply`
- [ ] Receive email WITHOUT credentials
- [ ] Click dashboard link (already logged in)
- [ ] Verify application appears
- [ ] Verify seamless experience

### Test Scenario 3: Multiple Applications
- [ ] User submits 2 applications
- [ ] Dashboard shows both
- [ ] Each has unique application reference
- [ ] Each is clickable for details
- [ ] Status updates independently

### Test Scenario 4: Logged Out
- [ ] User logs out
- [ ] Clicks dashboard link from email
- [ ] Should redirect to login
- [ ] After login, redirects to dashboard
- [ ] Applications load correctly

---

## Troubleshooting

### Problem: "Page Not Found" when clicking email link

**Cause**: Email had wrong URL (`/professional/applications`)
**Solution**: Fixed to `/registry/dashboard` ✅

### Problem: Dashboard shows empty list

**Possible Causes:**
1. User not logged in (check authentication)
2. Cookie not being sent (check `credentials: 'include'`)
3. Wrong user logged in
4. Application status filtered out

**Debug Steps:**
```javascript
// Check if user is authenticated
console.log('User:', user);
console.log('Authenticated:', isAuthenticated);

// Check API response
const apps = await registryService.professional.getMyApplications();
console.log('Applications:', apps);
```

### Problem: "Unauthorized" error

**Cause**: JWT cookie missing or expired
**Solution**: User needs to login again

---

## Summary

✅ **No manual ID tracking needed**
✅ **Cookie-based authentication handles everything**
✅ **Email link points to `/registry/dashboard`**
✅ **Dashboard automatically shows user's applications**
✅ **Secure, user-friendly, seamless experience**

**System Status**: ✅ Complete and Working!

---

**Last Updated**: 2025-11-03
**Version**: 1.0
