# PHB Hospital System - Improvement Roadmap

## Executive Summary

This document provides a prioritized roadmap for improving the PHB Hospital System's frontend architecture, addressing security vulnerabilities, performance bottlenecks, and architectural debt. Each improvement includes severity, effort estimates, and implementation guidance.

### Overall Assessment

**Current State**: ⚠️ Functional but with significant security and architectural concerns  
**Target State**: ✅ Secure, scalable, and maintainable enterprise healthcare platform

**Key Metrics**:
- **Security Score**: 6/10 → Target: 9/10
- **Performance Score**: 7/10 → Target: 9/10
- **Code Quality**: 7/10 → Target: 8.5/10
- **Maintainability**: 6/10 → Target: 9/10

## Improvement Priority Matrix

```
HIGH IMPACT │ P0: Auth Migration    │ P1: Bundle Optimization
           │ P0: CSP Headers       │ P1: Code Splitting
           │ P0: Audit Logging     │ P1: State Management
───────────┼────────────────────────┼─────────────────────────
MEDIUM     │ P2: Testing Suite     │ P3: Documentation
IMPACT     │ P2: Design System     │ P3: Component Library
           │ P2: Error Boundaries  │ P3: Accessibility
───────────┴────────────────────────┴─────────────────────────
             LOW EFFORT               HIGH EFFORT
```

## Table of Contents

1. [Priority 0: Critical Improvements](#priority-0-critical-improvements)
2. [Priority 1: High-Impact Improvements](#priority-1-high-impact-improvements)
3. [Priority 2: Medium-Impact Improvements](#priority-2-medium-impact-improvements)
4. [Priority 3: Nice-to-Have Improvements](#priority-3-nice-to-have-improvements)
5. [Implementation Timeline](#implementation-timeline)
6. [Success Metrics](#success-metrics)
7. [Migration Strategies](#migration-strategies)

---

## Priority 0: Critical Improvements

### P0-1: Migrate Authentication to HttpOnly Cookies

**Issue**: User and Professional authentication contexts store JWT tokens in localStorage, exposing them to XSS attacks.

**Severity**: 🔴 **CRITICAL**

**Current State**:
```typescript
// ❌ VULNERABLE: src/features/auth/authContext.tsx
localStorage.setItem('phb_token', token);
localStorage.setItem('phb_user', JSON.stringify(user));

// ❌ VULNERABLE: src/features/professional/professionalAuthContext.tsx
localStorage.setItem('phb_professional_token', token);
```

**Target State**:
```typescript
// ✅ SECURE: Backend sets httpOnly cookies
// Frontend just includes credentials
const response = await fetch('/api/profile/', {
  credentials: 'include'
});
```

**Implementation Steps**:

1. **Backend Changes** (Week 1-2):
   ```python
   # Django backend modifications
   # 1. Update login view to set httpOnly cookies
   def login_view(request):
       # ... authentication logic ...
       response = JsonResponse({'user': user_data})
       response.set_cookie(
           'access_token',
           access_token,
           httponly=True,
           secure=True,
           samesite='Lax',
           max_age=1800  # 30 minutes
       )
       response.set_cookie(
           'refresh_token',
           refresh_token,
           httponly=True,
           secure=True,
           samesite='Lax',
           max_age=604800  # 7 days
       )
       return response
   ```

2. **Frontend Changes** (Week 2-3):
   ```typescript
   // src/features/auth/authContext.tsx
   // Remove all localStorage token operations

   const login = async (email: string, password: string) => {
     const response = await fetch(`${API_BASE_URL}/api/login/`, {
       method: 'POST',
       credentials: 'include', // Cookies sent automatically
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email, password })
     });

     if (response.ok) {
       const data = await response.json();
       setUser(data.user); // Store user in state, not localStorage
       setIsAuthenticated(true);
     }
   };

   // Automatic token refresh
   useEffect(() => {
     if (isAuthenticated) {
       const refreshTimer = setInterval(async () => {
         await fetch(`${API_BASE_URL}/api/token/refresh/`, {
           method: 'POST',
           credentials: 'include'
         });
       }, 25 * 60 * 1000); // 25 minutes

       return () => clearInterval(refreshTimer);
     }
   }, [isAuthenticated]);
   ```

3. **Update All Services** (Week 3):
   ```typescript
   // Update ALL service files to include credentials
   // src/services/appointmentService.ts
   const response = await fetch(`${API_BASE_URL}/api/appointments/`, {
     method: 'GET',
     credentials: 'include', // Add this to ALL fetch calls
     headers: { 'Content-Type': 'application/json' }
   });
   ```

4. **Testing** (Week 4):
   - Cross-browser testing
   - Session persistence testing
   - Logout functionality
   - Token refresh mechanism
   - CORS configuration verification

**Effort**: 4 weeks (2 backend, 2 frontend)

**Risk**: HIGH (Breaking change, requires coordinated deployment)

**Impact**:
- ✅ Eliminates #1 security vulnerability
- ✅ XSS protection for authentication
- ✅ Automatic session management
- ✅ HIPAA compliance improvement

**Success Criteria**:
- [ ] No authentication tokens in localStorage
- [ ] All API calls use `credentials: 'include'`
- [ ] Automatic token refresh working
- [ ] Session timeout properly enforced
- [ ] Security audit passing

**Dependencies**:
- Backend API must implement cookie-based auth
- CORS configuration must allow credentials
- Deployment coordination required

---

### P0-2: Implement Content Security Policy (CSP)

**Issue**: No CSP headers leave the application vulnerable to XSS attacks.

**Severity**: 🔴 **CRITICAL**

**Current State**: No CSP implementation

**Target State**: Strict CSP with whitelist approach

**Implementation**:

**Step 1: Create `_headers` file** (Netlify):
```
# public/_headers
/*
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://js.paystack.co; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' http://127.0.0.1:8000 https://api.paystack.co; frame-src https://checkout.paystack.com;
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Step 2: Remove inline scripts** (if any):
```bash
# Find inline scripts
grep -r "onclick=" src/
grep -r "onerror=" src/
grep -r "<script>" public/

# Replace with event listeners
```

**Step 3: Add nonce for necessary inline scripts**:
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [
    reactSwc(),
    {
      name: 'csp-nonce',
      transformIndexHtml(html) {
        const nonce = crypto.randomBytes(16).toString('base64');
        return html.replace(
          /<script/g,
          `<script nonce="${nonce}"`
        );
      }
    }
  ]
});
```

**Step 4: Test CSP**:
```bash
# Use CSP Evaluator
https://csp-evaluator.withgoogle.com/

# Check browser console for violations
# Fix or whitelist each violation
```

**Effort**: 3-5 days

**Risk**: MEDIUM (May break external integrations)

**Impact**:
- ✅ Prevents XSS attacks
- ✅ Controls resource loading
- ✅ Enhances security posture

**Success Criteria**:
- [ ] CSP headers deployed
- [ ] No CSP violations in production
- [ ] Paystack integration still works
- [ ] All external resources whitelisted
- [ ] Monitoring CSP reports

---

### P0-3: Implement Comprehensive Audit Logging

**Issue**: No logging of security-sensitive operations (HIPAA violation).

**Severity**: 🔴 **CRITICAL** (Compliance)

**Current State**: No audit trail

**Target State**: All PHI access logged

**Implementation**:

**Step 1: Create Audit Logger** (`src/utils/auditLogger.ts`):
```typescript
export interface AuditEvent {
  event_type: string;
  resource: string;
  resource_id?: string;
  action: string;
  user_id?: string;
  success: boolean;
  details?: Record<string, any>;
  ip_address?: string;
  user_agent: string;
}

export class AuditLogger {
  private static async getClientIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'unknown';
    }
  }

  static async log(event: Partial<AuditEvent>) {
    try {
      const ip = await this.getClientIP();

      await fetch(`${API_BASE_URL}/api/audit-log/`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...event,
          ip_address: ip,
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          client_timestamp: Date.now()
        })
      });
    } catch (error) {
      // Fail silently, log to monitoring service
      console.error('Audit log failed:', error);
    }
  }
}
```

**Step 2: Add Logging to Critical Operations**:

```typescript
// Login events
AuditLogger.log({
  event_type: 'authentication',
  action: 'login_attempt',
  success: true,
  details: { email, method: '2fa' }
});

// Medical record access
AuditLogger.log({
  event_type: 'phi_access',
  resource: 'medical_record',
  resource_id: recordId,
  action: 'view',
  success: true,
  details: { otp_verified: true }
});

// Prescription creation
AuditLogger.log({
  event_type: 'prescription',
  resource: 'prescription',
  action: 'create',
  success: true,
  details: { medication, dosage, patient_id }
});

// File uploads
AuditLogger.log({
  event_type: 'file_operation',
  resource: 'medical_document',
  action: 'upload',
  success: true,
  details: { file_type, size, virus_scan_result }
});

// Failed operations
AuditLogger.log({
  event_type: 'security',
  action: 'unauthorized_access_attempt',
  success: false,
  details: { attempted_resource, user_role }
});
```

**Step 3: Events to Log**:

| Event Category | Events |
|----------------|--------|
| **Authentication** | login_attempt, login_success, login_failure, logout, password_reset, 2fa_verification |
| **PHI Access** | medical_record_view, medical_record_download, medical_record_modify, prescription_view, test_result_view |
| **Data Modification** | profile_update, appointment_create, prescription_create, medical_record_upload |
| **Security** | unauthorized_access, permission_denied, suspicious_activity, session_timeout |
| **File Operations** | file_upload, file_download, file_delete, virus_scan_result |

**Step 4: Create Audit Dashboard** (Organization admin):
```typescript
// src/pages/organization/AuditLogPage.tsx
// Filterable audit log viewer
// - Filter by user, event type, date range
// - Export to CSV for compliance
// - Real-time monitoring
```

**Effort**: 2 weeks

**Risk**: LOW (Non-breaking addition)

**Impact**:
- ✅ HIPAA compliance
- ✅ Security monitoring
- ✅ Incident investigation
- ✅ User accountability

**Success Criteria**:
- [ ] All PHI access logged
- [ ] All authentication events logged
- [ ] Audit logs stored securely (encrypted)
- [ ] Logs retained for required period
- [ ] Audit dashboard functional
- [ ] Export functionality working

---

### P0-4: Remove Inconsistent Authentication Patterns

**Issue**: Three different authentication implementations create complexity and security gaps.

**Severity**: 🔴 **CRITICAL** (Architecture)

**Current State**:
- User Auth: localStorage
- Professional Auth: localStorage + hybrid with main auth
- Organization Auth: httpOnly cookies

**Target State**: Single, consistent authentication pattern across all user types

**Implementation**:

**Option 1: Unified Cookie-Based Auth** (Recommended):

```typescript
// src/contexts/UnifiedAuthContext.tsx
interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'patient' | 'professional' | 'organization';
  professional_data?: ProfessionalInfo;
  organization_data?: OrganizationInfo;
}

export const UnifiedAuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Single login method for all user types
  const login = async (
    email: string,
    password: string,
    userType: 'patient' | 'professional' | 'organization'
  ) => {
    const endpoint = {
      patient: '/api/auth/login/',
      professional: '/api/auth/professional-login/',
      organization: '/api/auth/organization-login/'
    }[userType];

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      setIsAuthenticated(true);
    }
  };

  // Single logout for all
  const logout = async () => {
    await fetch(`${API_BASE_URL}/api/auth/logout/`, {
      method: 'POST',
      credentials: 'include'
    });
    setUser(null);
    setIsAuthenticated(false);
  };

  // Role-based access control
  const hasRole = (requiredRoles: string[]) => {
    return user && requiredRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
```

**Migration Path**:
1. Create UnifiedAuthContext
2. Migrate Organization routes first (already using cookies)
3. Migrate User routes
4. Migrate Professional routes
5. Remove old contexts
6. Update all route guards

**Effort**: 6 weeks

**Risk**: HIGH (Major refactor)

**Impact**:
- ✅ Consistent security across all user types
- ✅ Simplified codebase
- ✅ Easier maintenance
- ✅ Better testing

---

## Priority 1: High-Impact Improvements

### P1-1: Implement Rate Limiting

**Issue**: No protection against brute force attacks.

**Severity**: 🟡 **HIGH**

**Implementation**:

```typescript
// src/hooks/useRateLimit.ts
export const useRateLimit = (
  key: string,
  maxAttempts: number,
  windowMs: number
) => {
  const getAttempts = (): number => {
    const stored = localStorage.getItem(`ratelimit_${key}`);
    if (!stored) return 0;

    const { attempts, resetAt } = JSON.parse(stored);
    if (Date.now() > resetAt) return 0;

    return attempts;
  };

  const checkLimit = (): {
    allowed: boolean;
    remainingTime: number;
    attemptsLeft: number;
  } => {
    const attempts = getAttempts();

    if (attempts >= maxAttempts) {
      const stored = localStorage.getItem(`ratelimit_${key}`);
      const { resetAt } = JSON.parse(stored!);
      return {
        allowed: false,
        remainingTime: resetAt - Date.now(),
        attemptsLeft: 0
      };
    }

    return {
      allowed: true,
      remainingTime: 0,
      attemptsLeft: maxAttempts - attempts
    };
  };

  const recordAttempt = () => {
    const attempts = getAttempts() + 1;
    const resetAt = Date.now() + windowMs;

    localStorage.setItem(
      `ratelimit_${key}`,
      JSON.stringify({ attempts, resetAt })
    );
  };

  return { checkLimit, recordAttempt };
};

// Usage in LoginForm
const { checkLimit, recordAttempt } = useRateLimit(
  'login',
  5, // max attempts
  15 * 60 * 1000 // 15 minutes
);

const handleLogin = async () => {
  const { allowed, remainingTime, attemptsLeft } = checkLimit();

  if (!allowed) {
    const minutes = Math.ceil(remainingTime / 60000);
    toast.error(`Too many login attempts. Please try again in ${minutes} minutes.`);
    return;
  }

  try {
    await login(email, password);
    // Success: reset counter
    localStorage.removeItem('ratelimit_login');
  } catch (error) {
    recordAttempt();
    toast.error(`Login failed. ${attemptsLeft - 1} attempts remaining.`);
  }
};
```

**Effort**: 3-5 days

**Impact**:
- ✅ Prevents brute force attacks
- ✅ Improves security posture
- ✅ User-friendly feedback

---

### P1-2: Add Session Timeout Management

**Issue**: No automatic session expiration.

**Severity**: 🟡 **HIGH**

**Implementation**:

```typescript
// src/hooks/useSessionTimeout.ts
export const useSessionTimeout = (
  timeoutMs: number = 30 * 60 * 1000, // 30 minutes
  warningMs: number = 5 * 60 * 1000 // 5 minutes warning
) => {
  const { logout } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimers = useCallback(() => {
    // Clear existing timers
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);

    setShowWarning(false);

    // Set warning timer
    warningRef.current = setTimeout(() => {
      setShowWarning(true);
    }, timeoutMs - warningMs);

    // Set logout timer
    timeoutRef.current = setTimeout(() => {
      logout();
      toast.info('Session expired due to inactivity');
    }, timeoutMs);
  }, [timeoutMs, warningMs, logout]);

  useEffect(() => {
    // Activity events
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

    events.forEach(event => {
      document.addEventListener(event, resetTimers);
    });

    resetTimers(); // Start timers

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimers);
      });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (warningRef.current) clearTimeout(warningRef.current);
    };
  }, [resetTimers]);

  return { showWarning, resetTimers };
};

// SessionTimeoutWarning Component
export const SessionTimeoutWarning = () => {
  const { showWarning, resetTimers } = useSessionTimeout();

  if (!showWarning) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500 text-white p-4 rounded-lg shadow-lg">
      <p className="font-semibold">Session Expiring Soon</p>
      <p className="text-sm">You'll be logged out in 5 minutes due to inactivity.</p>
      <button
        onClick={resetTimers}
        className="mt-2 px-4 py-2 bg-white text-yellow-500 rounded hover:bg-gray-100"
      >
        Stay Logged In
      </button>
    </div>
  );
};
```

**Effort**: 2-3 days

**Impact**:
- ✅ Reduces session hijacking risk
- ✅ Improves security
- ✅ Better user experience

---

### P1-3: Bundle Size Optimization

**Issue**: Large bundle sizes affect initial load time.

**Severity**: 🟡 **HIGH** (Performance)

**Current Analysis**:
```bash
# Analyze bundle
npm run build
# Check dist/assets/ file sizes
```

**Implementation**:

**Step 1: Code Splitting by Route**:
```typescript
// src/App.tsx
import { lazy, Suspense } from 'react';

// Lazy load routes
const ProfessionalDashboard = lazy(() => import('./pages/professional/ProfessionalDashboardPage'));
const OrganizationDashboard = lazy(() => import('./pages/organization/OrganizationDashboardPage'));
const WomensHealthDashboard = lazy(() => import('./pages/account/WomensHealthDashboardEnhanced'));

// Wrap with Suspense
<Route
  path="/professional/dashboard"
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <ProfessionalDashboard />
    </Suspense>
  }
/>
```

**Step 2: Optimize Manual Chunks** (`vite.config.ts`):
```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core vendor chunk
          'vendor-core': ['react', 'react-dom', 'react-router-dom'],

          // UI libraries
          'vendor-ui': [
            '@mui/material',
            '@mui/icons-material',
            '@fluentui/react-components'
          ],

          // Charts
          'vendor-charts': [
            'chart.js',
            'react-chartjs-2',
            'recharts'
          ],

          // Medical
          'vendor-medical': [
            'cornerstone-core',
            'dicom-parser'
          ],

          // Utils
          'vendor-utils': [
            'axios',
            'date-fns',
            'lodash'
          ]
        }
      }
    }
  }
});
```

**Step 3: Tree Shaking**:
```typescript
// ❌ BAD: Imports entire library
import _ from 'lodash';

// ✅ GOOD: Import specific functions
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';

// Or use named imports
import { debounce, throttle } from 'lodash-es';
```

**Step 4: Dynamic Imports for Heavy Components**:
```typescript
// Only load when needed
const loadPDFViewer = async () => {
  const { PDFViewer } = await import('./components/PDFViewer');
  return PDFViewer;
};

// In component
const [PDFViewer, setPDFViewer] = useState<any>(null);

useEffect(() => {
  if (showPDF) {
    loadPDFViewer().then(setPDFViewer);
  }
}, [showPDF]);
```

**Effort**: 1-2 weeks

**Impact**:
- ✅ 30-40% bundle size reduction
- ✅ Faster initial load
- ✅ Better user experience

**Target Metrics**:
- Initial bundle: < 500KB (currently ~1-2MB estimated)
- Largest chunk: < 200KB
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s

---

### P1-4: Implement Automated Dependency Scanning

**Issue**: No vulnerability monitoring.

**Severity**: 🟡 **HIGH**

**Implementation**:

**Step 1: Add npm scripts** (`package.json`):
```json
{
  "scripts": {
    "security:audit": "npm audit --audit-level=moderate",
    "security:fix": "npm audit fix",
    "security:check": "npm outdated && npm audit",
    "precommit": "npm run security:audit && npm run typecheck"
  }
}
```

**Step 2: GitHub Actions** (`.github/workflows/security.yml`):
```yaml
name: Security Scan

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * 0' # Weekly on Sunday

jobs:
  security-scan:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run npm audit
        run: npm audit --audit-level=moderate
        continue-on-error: true

      - name: Run Snyk Security Scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

      - name: Upload Snyk results
        uses: github/codeql-action/upload-sarif@v2
        if: always()
        with:
          sarif_file: snyk.sarif
```

**Step 3: Dependabot** (`.github/dependabot.yml`):
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 10
    versioning-strategy: increase
    labels:
      - "dependencies"
      - "security"
    commit-message:
      prefix: "chore"
      prefix-development: "chore"
      include: "scope"
```

**Effort**: 1-2 days

**Impact**:
- ✅ Automated vulnerability detection
- ✅ Proactive security patches
- ✅ Compliance maintenance

---

## Priority 2: Medium-Impact Improvements

### P2-1: Implement Comprehensive Testing Suite

**Issue**: No automated testing detected.

**Severity**: 🟡 **MEDIUM**

**Implementation**:

**Step 1: Setup Vitest**:
```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

**Step 2: Configuration** (`vitest.config.ts`):
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        'dist/'
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
```

**Step 3: Test Examples**:

```typescript
// src/__tests__/components/StatusBadge.test.tsx
import { render, screen } from '@testing-library/react';
import { StatusBadge } from '@/components/StatusBadge';

describe('StatusBadge', () => {
  it('renders pending status', () => {
    render(<StatusBadge status="pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('applies correct color for confirmed status', () => {
    const { container } = render(<StatusBadge status="confirmed" />);
    expect(container.firstChild).toHaveClass('bg-green-100');
  });
});

// src/__tests__/services/appointmentService.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppointmentService } from '@/services/appointmentService';

describe('AppointmentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches appointments with filters', async () => {
    const mockResponse = {
      appointments: [],
      total_count: 0
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    });

    const result = await AppointmentService.getAppointments({
      status: 'pending'
    });

    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('status=pending'),
      expect.any(Object)
    );
  });

  it('handles API errors', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ message: 'Error' })
    });

    await expect(
      AppointmentService.getAppointments()
    ).rejects.toThrow('Error');
  });
});

// src/__tests__/hooks/useDebounce.test.ts
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debounces value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 500 } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated', delay: 500 });
    expect(result.current).toBe('initial'); // Still initial

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated'); // Now updated
  });
});
```

**Step 4: Add npm scripts**:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}
```

**Target Coverage**:
- Overall: 70%+
- Services: 80%+
- Hooks: 90%+
- Components: 60%+

**Effort**: 3-4 weeks

**Impact**:
- ✅ Bug prevention
- ✅ Refactoring confidence
- ✅ Documentation through tests

---

### P2-2: Unify Design System

**Issue**: Multiple UI libraries (Tailwind, MUI, Fluent UI) create inconsistency.

**Severity**: 🟢 **MEDIUM**

**Current State**:
- Tailwind CSS (utility-first)
- Material-UI (component library)
- Fluent UI (organization dashboards)
- Custom components

**Recommended Path**: Gradual migration to single design system

**Option 1: Tailwind + Headless UI** (Recommended):
```bash
npm install @headlessui/react @heroicons/react
```

**Option 2: Keep MUI, remove Fluent UI**

**Implementation** (Option 1):

**Step 1: Create Design Token System**:
```typescript
// src/styles/tokens.ts
export const designTokens = {
  colors: {
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      500: '#2196f3',
      700: '#1976d2',
      900: '#0d47a1'
    },
    success: { /* ... */ },
    error: { /* ... */ },
    warning: { /* ... */ }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['Fira Code', 'monospace']
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px'
    }
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px'
  }
};
```

**Step 2: Create Base Components**:
```typescript
// src/components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  const baseStyles = 'font-medium rounded-lg transition-colors';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};
```

**Step 3: Migration Strategy**:
1. New components use design system (Week 1-2)
2. Migrate critical paths (Week 3-4)
3. Migrate remaining components (Month 2-3)
4. Remove unused libraries (Month 4)

**Effort**: 3-4 months (gradual)

**Impact**:
- ✅ Consistent UI/UX
- ✅ Smaller bundle size
- ✅ Easier maintenance

---

### P2-3: Add Error Boundaries

**Issue**: No global error handling for component crashes.

**Severity**: 🟢 **MEDIUM**

**Implementation**:

```typescript
// src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    // Log to monitoring service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to backend
    fetch('/api/error-log/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.toString(),
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-center text-gray-900">
              Something went wrong
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              We're sorry, but an error occurred. Please refresh the page and try again.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Refresh Page
              </button>
              <button
                onClick={() => window.history.back()}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage in App.tsx
<ErrorBoundary onError={(error, info) => {
  // Send to monitoring service (e.g., Sentry)
  console.error('Global error:', error, info);
}}>
  <App />
</ErrorBoundary>

// Feature-specific boundaries
<ErrorBoundary fallback={<FeatureErrorFallback />}>
  <HealthFeatures />
</ErrorBoundary>
```

**Effort**: 2-3 days

**Impact**:
- ✅ Graceful error handling
- ✅ Better user experience
- ✅ Error tracking

---

## Priority 3: Nice-to-Have Improvements

### P3-1: Add Accessibility (A11y) Improvements

**Issue**: Accessibility not systematically implemented.

**Severity**: 🟢 **LOW** (But important for compliance)

**Implementation**:

**Step 1: Add eslint-plugin-jsx-a11y**:
```bash
npm install -D eslint-plugin-jsx-a11y
```

```javascript
// eslint.config.js
{
  plugins: ['jsx-a11y'],
  extends: ['plugin:jsx-a11y/recommended']
}
```

**Step 2: Accessibility Checklist**:

```typescript
// ✅ GOOD: Semantic HTML
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
  </ul>
</nav>

// ❌ BAD: Div soup
<div>
  <div onClick={() => navigate('/home')}>Home</div>
</div>

// ✅ GOOD: ARIA labels
<button aria-label="Close modal" onClick={onClose}>
  <X />
</button>

// ✅ GOOD: Form labels
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ GOOD: Focus management
const modalRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus();
  }
}, [isOpen]);

<div ref={modalRef} tabIndex={-1} role="dialog">
  {/* Modal content */}
</div>

// ✅ GOOD: Keyboard navigation
<button
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  }}
>
  Click me
</button>

// ✅ GOOD: Alt text for images
<img src={avatar} alt={`${user.name}'s profile picture`} />

// ✅ GOOD: Skip links
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

**Step 3: Add axe-core for testing**:
```bash
npm install -D @axe-core/react
```

```typescript
// src/main.tsx (development only)
if (import.meta.env.DEV) {
  import('@axe-core/react').then(axe => {
    axe.default(React, ReactDOM, 1000);
  });
}
```

**Effort**: 2-3 weeks

**Impact**:
- ✅ Legal compliance (ADA)
- ✅ Improved usability for all users
- ✅ SEO benefits

---

### P3-2: Implement Component Documentation (Storybook)

**Issue**: No component documentation or visual testing.

**Severity**: 🟢 **LOW**

**Implementation**:

```bash
npx storybook@latest init
```

```typescript
// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button'
  }
};
```

**Effort**: 2-3 weeks

**Impact**:
- ✅ Component documentation
- ✅ Visual regression testing
- ✅ Design system enforcement

---

## Implementation Timeline

### Phase 1: Critical Security (Months 1-2)

**Month 1**:
- Week 1-2: P0-1 Backend work (cookie auth)
- Week 3-4: P0-1 Frontend work (migrate user auth)

**Month 2**:
- Week 1: P0-2 CSP implementation
- Week 2-3: P0-3 Audit logging
- Week 4: P0-4 Planning unified auth

### Phase 2: High-Impact Improvements (Months 3-4)

**Month 3**:
- Week 1: P1-1 Rate limiting
- Week 2: P1-2 Session timeout
- Week 3-4: P1-3 Bundle optimization

**Month 4**:
- Week 1: P1-4 Dependency scanning
- Week 2-3: P0-4 Unified auth migration
- Week 4: Testing and validation

### Phase 3: Quality Improvements (Months 5-6)

**Month 5**:
- Week 1-3: P2-1 Testing suite (critical paths)
- Week 4: P2-3 Error boundaries

**Month 6**:
- Week 1-2: P2-2 Design system (planning)
- Week 3-4: P2-2 Design system (initial components)

### Phase 4: Polish (Months 7-8)

**Month 7**:
- Week 1-2: P3-1 Accessibility
- Week 3-4: P3-2 Storybook

**Month 8**:
- Week 1-2: Final testing
- Week 3-4: Documentation & training

## Success Metrics

### Security Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| **Security Score** | 6/10 | 9/10 | Security audit |
| **XSS Vulnerabilities** | 2 critical | 0 | Code review |
| **Auth Token Exposure** | 67% (2/3) | 0% | Architecture review |
| **CSP Violations** | N/A | 0 | Browser console |
| **Dependency Vulnerabilities** | Unknown | 0 high/critical | npm audit |

### Performance Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| **Initial Bundle Size** | ~1-2MB | <500KB | Webpack analyzer |
| **First Contentful Paint** | Unknown | <1.5s | Lighthouse |
| **Time to Interactive** | Unknown | <3s | Lighthouse |
| **Largest Contentful Paint** | Unknown | <2.5s | Lighthouse |

### Code Quality Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| **Test Coverage** | 0% | 70% | Vitest |
| **TypeScript Errors** | 0 | 0 | tsc |
| **ESLint Errors** | Unknown | 0 | eslint |
| **Code Duplication** | Unknown | <5% | SonarQube |

## Migration Strategies

### Zero-Downtime Deployment for Auth Migration

**Strategy**: Blue-Green Authentication

**Steps**:

1. **Phase 1: Dual Auth Support** (Week 1)
   ```typescript
   // Support both localStorage AND cookies temporarily
   const getToken = () => {
     // Try cookie first
     const cookieToken = document.cookie
       .split('; ')
       .find(row => row.startsWith('access_token='));

     if (cookieToken) {
       return cookieToken.split('=')[1];
     }

     // Fallback to localStorage
     return localStorage.getItem('phb_token');
   };
   ```

2. **Phase 2: Gradual Migration** (Week 2-3)
   - Backend supports both auth methods
   - New logins use cookies
   - Existing sessions remain valid

3. **Phase 3: Force Migration** (Week 4)
   - Show migration prompt to localStorage users
   - Auto-migrate on next login
   - Deprecation warnings

4. **Phase 4: Cleanup** (Week 5)
   - Remove localStorage code
   - Remove dual-auth support

### Breaking Change Communication

**For any breaking changes:**

1. **Announcement** (T-4 weeks)
   - Email users
   - In-app banner
   - Blog post

2. **Migration Guide** (T-3 weeks)
   - Step-by-step instructions
   - FAQ
   - Support contact

3. **Grace Period** (T-2 weeks to T)
   - Dual support
   - Warnings
   - Help resources

4. **Implementation** (T)
   - Deploy changes
   - Monitor closely
   - Rapid response team

5. **Post-Deployment** (T+1 week)
   - Monitor metrics
   - Address issues
   - Collect feedback

---

**Document Version**: 1.0.0  
**Last Updated**: 2025-01-18  
**Next Review**: 2025-02-18  
**Owner**: PHB Development Team  
**Status**: Draft → Pending Approval → Implementation
