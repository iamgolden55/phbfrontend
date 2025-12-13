# 📊 PHB Data Flow Guide for Junior Developers

*A friendly, step-by-step guide to understanding how data moves from the database to your screen!*

---

## 🎯 Table of Contents

1. [The Big Picture](#-the-big-picture)
2. [Understanding Data Properties](#-understanding-data-properties)
3. [Backend Structure](#-backend-structure)
4. [Frontend Structure](#-frontend-structure)
5. [Complete Data Flow Example](#-complete-data-flow-example)
6. [How to Fetch New Data](#-how-to-fetch-new-data)
7. [Common Patterns](#-common-patterns)
8. [Troubleshooting](#-troubleshooting)

---

## 🌟 The Big Picture

Imagine data as a package being delivered from a warehouse (database) to your doorstep (the user's screen). Here's the journey it takes:

```
📦 Database (PostgreSQL)
    ↓
📋 Model (Django - defines what data looks like)
    ↓
🔄 Serializer (Django - converts data to JSON format)
    ↓
🚪 View (Django - handles requests and returns data)
    ↓
🛣️ URL Route (Django - maps URLs to views)
    ↓
🌐 API Endpoint (http://localhost:8000/api/...)
    ↓
📡 Service Function (Frontend - makes the API call)
    ↓
🎣 Custom Hook (Frontend - manages state and fetches data)
    ↓
⚙️ Context (Frontend - shares data across components)
    ↓
🎨 Component (Frontend - displays data to user)
```

**Key Point**: Data always flows in ONE direction - from the backend to the frontend. The frontend never directly touches the database!

---

## 🔍 Understanding Data Properties

### "How do I know what properties are available?"

This is one of the most important questions! When you see code like `userData?.hospital?.id` or `dept.occupied_beds`, how do you know those properties exist? Let me show you! 🕵️

---

### **Method 1: Inspect the API Response** (Easiest! ⭐)

The fastest way is to look at what the backend actually sends you!

#### **Step 1: Open Browser DevTools**
1. Open your app in Chrome/Firefox
2. Press `F12` or `Right-click → Inspect`
3. Go to the **Network** tab
4. Refresh the page

#### **Step 2: Find the API Request**
1. Look for requests starting with `/api/`
2. Click on the request (e.g., `profile` or `departments`)
3. Click the **Response** tab

#### **Example: Organization Profile**

When you make a request to `/api/hospitals/admin/profile/`, you'll see:

```json
{
  "id": 71,
  "email": "admin@cityhospital.com",
  "full_name": "Dr. John Smith",
  "role": "hospital_admin",
  "hospital": {
    "id": 1,
    "name": "City Hospital",
    "code": "CH001"
  },
  "is_verified": true,
  "position": "Administrator"
}
```

**Now you know!** ✨

From this response, you can access:
- `userData.id` → `71`
- `userData.email` → `"admin@cityhospital.com"`
- `userData.full_name` → `"Dr. John Smith"`
- `userData.role` → `"hospital_admin"`
- `userData.hospital` → `{ id: 1, name: "City Hospital", code: "CH001" }`
- `userData.hospital.id` → `1`
- `userData.hospital.name` → `"City Hospital"`
- `userData.hospital.code` → `"CH001"`
- `userData.is_verified` → `true`
- `userData.position` → `"Administrator"`

#### **Example: Department Data**

Request to `/api/hospitals/departments/?hospital=1` returns:

```json
[
  {
    "id": 1,
    "name": "Emergency Department",
    "code": "EMRG",
    "department_type": "emergency",
    "total_beds": 50,
    "occupied_beds": 35,
    "available_beds": 15,
    "icu_beds": 10,
    "occupied_icu_beds": 8,
    "available_icu_beds": 2,
    "current_staff_count": 45,
    "minimum_staff_required": 40,
    "is_understaffed": false,
    "bed_utilization_rate": 70.0,
    "is_active": true
  },
  {
    "id": 2,
    "name": "ICU",
    "code": "ICU",
    "total_beds": 20,
    "occupied_beds": 18,
    "available_beds": 2,
    "icu_beds": 20,
    "occupied_icu_beds": 18,
    "available_icu_beds": 2,
    "current_staff_count": 30,
    "minimum_staff_required": 25,
    "is_understaffed": false,
    "bed_utilization_rate": 90.0,
    "is_active": true
  }
]
```

**Now you know for each department (dept):**
- `dept.id` → `1`
- `dept.name` → `"Emergency Department"`
- `dept.code` → `"EMRG"`
- `dept.total_beds` → `50`
- `dept.occupied_beds` → `35`
- `dept.available_beds` → `15`
- `dept.icu_beds` → `10`
- `dept.current_staff_count` → `45`
- `dept.bed_utilization_rate` → `70.0`
- And so on! ✨

---

### **Method 2: Check the Backend Serializer**

The backend serializer tells you EXACTLY what fields are available.

#### **Example: Looking at Department Serializer**

```python
# File: basebackend/hospitals/serializers.py

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = [
            'id',
            'name',
            'code',
            'department_type',
            'is_active',
            'description',
            'floor_number',
            'wing',
            'extension_number',
            'emergency_contact',
            'email',
            'total_beds',           # ← This is why dept.total_beds works!
            'occupied_beds',         # ← This is why dept.occupied_beds works!
            'available_beds',        # ← This is why dept.available_beds works!
            'icu_beds',
            'occupied_icu_beds',
            'available_icu_beds',
            'bed_capacity',
            'bed_utilization_rate',
            'current_staff_count',
            'minimum_staff_required',
            'is_understaffed',
            'current_patient_count',
            'utilization_rate',
            'is_24_hours',
            'annual_budget',
            'is_clinical',
            'is_support',
            'is_administrative',
        ]
```

**Every field listed here is available in your frontend!** 🎯

When you fetch departments, each department object will have ALL these properties!

---

### **Method 3: Check TypeScript Interfaces**

Frontend TypeScript interfaces mirror the backend structure.

#### **Example: Department Interface**

```typescript
// File: src/hooks/useDepartmentStats.ts

export interface DepartmentData {
  id: number;
  name: string;
  code: string;
  department_type: string;
  is_active: boolean;
  description: string;

  // Location & Contact
  floor_number: string;
  wing: string;
  extension_number: string;
  emergency_contact: string;
  email: string;

  // 🛏️ BED TRACKING - This is why these properties exist!
  total_beds: number;              // ← dept.total_beds
  occupied_beds: number;            // ← dept.occupied_beds
  available_beds: number;           // ← dept.available_beds
  icu_beds: number;                 // ← dept.icu_beds
  occupied_icu_beds: number;        // ← dept.occupied_icu_beds
  available_icu_beds: number;       // ← dept.available_icu_beds
  bed_capacity: number;
  bed_utilization_rate: number;

  // 👥 STAFF MANAGEMENT
  current_staff_count: number;      // ← dept.current_staff_count
  minimum_staff_required: number;
  is_understaffed: boolean;
  staff_utilization_rate: number;

  // 🏥 PATIENT STATISTICS
  current_patient_count: number;
  utilization_rate: number;
}
```

**The interface shows you every property you can access!** 📋

When you type `dept.` in your code editor, it will auto-suggest all these properties!

---

### **Method 4: Use Console.log() to Explore**

When you're not sure what data you have, log it!

```typescript
export const useDepartmentStats = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();

      // 🔍 LOG THE DATA TO SEE WHAT YOU GOT!
      console.log('📊 Departments data:', data);
      console.log('📊 First department:', data[0]);
      console.log('📊 Available properties:', Object.keys(data[0]));

      setDepartments(data);
    };

    fetchDepartments();
  }, []);

  return { departments };
};
```

**In your browser console (F12), you'll see:**

```
📊 Departments data: Array(5)
  0: {id: 1, name: "Emergency Department", total_beds: 50, occupied_beds: 35, ...}
  1: {id: 2, name: "ICU", total_beds: 20, occupied_beds: 18, ...}
  ...

📊 First department:
  {
    id: 1,
    name: "Emergency Department",
    code: "EMRG",
    total_beds: 50,
    occupied_beds: 35,
    available_beds: 15,
    ...
  }

📊 Available properties:
  ["id", "name", "code", "total_beds", "occupied_beds", "available_beds", ...]
```

**Now you can see EXACTLY what properties are available!** 🎉

---

### **Understanding Dot Notation**

#### **Simple Property Access**
```typescript
const dept = {
  id: 1,
  name: "Emergency",
  total_beds: 50
};

console.log(dept.id);          // → 1
console.log(dept.name);        // → "Emergency"
console.log(dept.total_beds);  // → 50
```

#### **Nested Property Access**
```typescript
const userData = {
  id: 71,
  full_name: "Dr. John Smith",
  hospital: {
    id: 1,
    name: "City Hospital",
    code: "CH001"
  }
};

console.log(userData.id);             // → 71
console.log(userData.hospital);       // → {id: 1, name: "City Hospital", code: "CH001"}
console.log(userData.hospital.id);    // → 1
console.log(userData.hospital.name);  // → "City Hospital"
```

#### **The Problem: What if data is missing?**

```typescript
// ❌ This will CRASH if userData is null or hospital doesn't exist
const hospitalId = userData.hospital.id;
// Error: Cannot read property 'hospital' of null

// ✅ SOLUTION: Optional Chaining (?.)
const hospitalId = userData?.hospital?.id;
// → If userData is null: returns undefined (no crash!)
// → If hospital is undefined: returns undefined (no crash!)
// → If everything exists: returns the id value!
```

#### **Optional Chaining Examples**

```typescript
// Example 1: Safely accessing nested properties
const userData = null;
console.log(userData?.hospital?.id);  // → undefined (no error!)

// Example 2: With real data
const userData = {
  id: 71,
  hospital: {
    id: 1,
    name: "City Hospital"
  }
};
console.log(userData?.hospital?.id);  // → 1 ✅

// Example 3: Missing nested property
const userData = {
  id: 71,
  hospital: null  // hospital is null!
};
console.log(userData?.hospital?.id);  // → undefined (no error!)

// Example 4: Using with fallback values
const hospitalName = userData?.hospital?.name || 'No Hospital';
// If name exists → returns name
// If name doesn't exist → returns 'No Hospital'
```

---

### **Real Example from OrganizationDashboard**

```typescript
// File: src/pages/organization/OrganizationDashboardPage.tsx

const OrganizationDashboardPage: React.FC = () => {
  const { userData } = useOrganizationAuth();
  const dashboardStats = useOrganizationDashboardStats();

  // HOW DO WE KNOW THESE PROPERTIES EXIST?
  return (
    <div>
      {/* 1. userData comes from organizationAuthContext
          2. We checked the API response and saw it has these fields
          3. The UserData interface defines them */}

      <h1>Welcome, {userData?.full_name}</h1>
      {/* userData.full_name exists because:
          - Backend returns it in /api/hospitals/admin/profile/
          - UserData interface defines it
          - We use ?. to be safe */}

      <p>{userData?.hospital?.name}</p>
      {/* userData.hospital.name exists because:
          - Backend includes nested hospital object
          - hospital has id, name, code properties
          - We use ?. for safety */}

      {dashboardStats.hospital && (
        <>
          <div>Total Beds: {dashboardStats.hospital.totalBeds}</div>
          {/* dashboardStats.hospital.totalBeds exists because:
              - useOrganizationDashboardStats hook creates it
              - It's calculated from useDepartmentStats
              - DashboardStats interface defines it */}

          <div>Occupied: {dashboardStats.hospital.occupiedBeds}</div>
          {/* Same as above - defined in DashboardStats interface */}

          <div>Available: {dashboardStats.hospital.availableBeds}</div>
        </>
      )}
    </div>
  );
};
```

---

### **Quick Reference: Finding Properties**

| I want to know... | Check here... |
|-------------------|---------------|
| What the API returns | Browser DevTools → Network → Response tab |
| What fields backend sends | Backend `serializers.py` → `fields = [...]` |
| What properties frontend expects | Frontend TypeScript interfaces |
| What data I actually received | Add `console.log()` in your code |
| If a property is nested | Look at JSON response structure |

---

### **Practice Exercise** 🎓

**Given this API response:**
```json
{
  "id": 100,
  "patient_name": "Jane Doe",
  "admission_date": "2024-01-15",
  "department": {
    "id": 5,
    "name": "Cardiology",
    "floor": 3
  },
  "assigned_doctor": {
    "id": 42,
    "name": "Dr. Sarah Johnson",
    "specialization": "Cardiologist"
  },
  "bed_number": "301-A",
  "status": "admitted"
}
```

**Question: How would you access each piece of data?**

<details>
<summary>Click to see answers</summary>

```typescript
// Assuming the data is stored in a variable called 'admission'

admission.id                           // → 100
admission.patient_name                 // → "Jane Doe"
admission.admission_date               // → "2024-01-15"
admission.department                   // → {id: 5, name: "Cardiology", floor: 3}
admission.department.id                // → 5
admission.department.name              // → "Cardiology"
admission.department.floor             // → 3
admission.assigned_doctor              // → {id: 42, name: "Dr. Sarah Johnson", ...}
admission.assigned_doctor.id           // → 42
admission.assigned_doctor.name         // → "Dr. Sarah Johnson"
admission.assigned_doctor.specialization // → "Cardiologist"
admission.bed_number                   // → "301-A"
admission.status                       // → "admitted"

// With optional chaining (safer):
admission?.department?.name            // → "Cardiology" (or undefined if missing)
admission?.assigned_doctor?.name       // → "Dr. Sarah Johnson" (or undefined)
```

</details>

---

### **Key Takeaways** 🎯

1. **The data structure in the frontend matches the backend serializer** - What the backend sends is what you get!

2. **Always inspect API responses first** - Use Browser DevTools to see real data

3. **TypeScript interfaces are your friend** - They show you what properties exist

4. **Use optional chaining (?.)** - Prevents crashes when data might be missing

5. **When in doubt, console.log()** - It's the fastest way to explore unknown data

6. **Nested objects use dot notation** - `user.hospital.name` goes deeper into the structure

7. **Backend serializer = Frontend properties** - They should always match!

---

## 🏗️ Backend Structure

### 1. **Models** (Django `models.py`)
Models define what data looks like in the database. Think of them as blueprints for your data.

**Example: Hospital Model**
```python
# File: basebackend/hospitals/models.py

class Hospital(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=50, unique=True)
    email = models.EmailField()
    address = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
```

**What this means**:
- Every hospital in the database has a `name`, `code`, `email`, `address`, etc.
- When you query `Hospital.objects.all()`, you get all hospitals from the database

---

### 2. **Serializers** (Django `serializers.py`)
Serializers convert complex Python objects into JSON format (and vice versa). JSON is the language that the frontend understands.

**Example: Hospital Serializer**
```python
# File: basebackend/hospitals/serializers.py

from rest_framework import serializers
from .models import Hospital

class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = ['id', 'name', 'code', 'email', 'address', 'is_active', 'created_at']
```

**What happens here**:
```python
# Input: Hospital object from database
hospital = Hospital.objects.get(id=1)
# name="City Hospital", code="CH001", ...

# Serializer converts it to JSON:
serializer = HospitalSerializer(hospital)
print(serializer.data)

# Output: JSON that frontend can understand
{
    "id": 1,
    "name": "City Hospital",
    "code": "CH001",
    "email": "info@cityhospital.com",
    "address": "123 Main St",
    "is_active": true,
    "created_at": "2024-01-15T10:30:00Z"
}
```

---

### 3. **Views** (Django `views.py`)
Views are functions that handle HTTP requests and return responses. They're like waiters in a restaurant - they take your order (request) and bring you food (data).

**Example: Department Stats View**
```python
# File: basebackend/hospitals/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Department
from .serializers import DepartmentSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def department_list(request):
    """
    Get all departments for a hospital
    URL: /api/hospitals/departments/?hospital=1
    """
    # Step 1: Get hospital ID from query parameters
    hospital_id = request.query_params.get('hospital')

    # Step 2: Query the database
    departments = Department.objects.filter(
        hospital_id=hospital_id,
        is_active=True
    )

    # Step 3: Serialize the data (convert to JSON)
    serializer = DepartmentSerializer(departments, many=True)

    # Step 4: Return JSON response
    return Response(serializer.data)
```

**What this view does**:
1. Receives a GET request to `/api/hospitals/departments/?hospital=1`
2. Checks if user is authenticated (logged in)
3. Gets `hospital=1` from the URL parameters
4. Queries the database for all active departments in that hospital
5. Converts the department objects to JSON using the serializer
6. Sends the JSON back to the frontend

---

### 4. **URL Routes** (Django `urls.py`)
URL routes map web addresses to view functions. They're like a phone directory - they tell Django which view to call for each URL.

**Example: URL Configuration**
```python
# File: basebackend/hospitals/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('departments/', views.department_list, name='department-list'),
    path('registrations/', views.registration_list, name='registration-list'),
    path('admin/profile/', views.admin_profile, name='admin-profile'),
]
```

**How it works**:
- User requests: `GET http://localhost:8000/api/hospitals/departments/`
- Django looks at `urls.py` and finds the matching pattern
- Django calls `views.department_list()` function
- View returns the data

---

## 🎨 Frontend Structure

### 1. **API Configuration** (`utils/config.ts`)
This file sets up the base URL for all API calls.

**Example:**
```typescript
// File: src/utils/config.ts

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const createApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}/${endpoint}`;
};
```

**Usage**:
```typescript
const url = createApiUrl('api/hospitals/departments/');
// Result: "http://localhost:8000/api/hospitals/departments/"
```

---

### 2. **Service Functions** (`services/*.ts`)
Services are functions that make HTTP requests to the backend. They're responsible for fetching, creating, updating, and deleting data.

**Example: Organization Profile Service**
```typescript
// File: src/services/organizationProfileService.ts

export interface OrganizationProfile {
  id: string;
  name: string;
  type: 'hospital' | 'ngo' | 'pharmacy';
  code: string;
  description?: string;
  logo_url?: string;
  phones: PhoneContact[];
  emails: EmailContact[];
  address: Address;
  website_url?: string;
  created_at: string;
  updated_at: string;
}

export const OrganizationProfileService = {
  // Function to GET profile data
  async getProfile(): Promise<OrganizationProfile> {
    try {
      const token = localStorage.getItem('phb_organization_token');

      // Make HTTP GET request
      const response = await fetch(`${API_BASE_URL}/api/organizations/profile/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        credentials: 'include', // Send cookies
      });

      // Check if request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse JSON response
      const data = await response.json();
      return data; // Return the profile data

    } catch (error) {
      console.error('Error fetching organization profile:', error);
      throw error;
    }
  },

  // Function to UPDATE profile data
  async updateProfile(updates: ProfileUpdateRequest): Promise<OrganizationProfile> {
    try {
      const token = localStorage.getItem('phb_organization_token');

      const response = await fetch(`${API_BASE_URL}/api/organizations/profile/`, {
        method: 'PATCH', // PATCH for partial updates
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        credentials: 'include',
        body: JSON.stringify(updates), // Send updated data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating organization profile:', error);
      throw error;
    }
  },
};
```

**Key Points**:
- `GET` = Fetch data (read)
- `POST` = Create new data
- `PATCH` = Update existing data (partial)
- `PUT` = Update existing data (complete)
- `DELETE` = Remove data

---

### 3. **Custom Hooks** (`hooks/*.ts`)
Hooks are React functions that manage state and side effects. They fetch data from services and make it available to components.

**Example: useRegistrationStats Hook**
```typescript
// File: src/hooks/useRegistrationStats.ts

interface RegistrationStats {
  pending: number;
  approved: number;
  total: number;
  loading: boolean;
  error: string | null;
}

export const useRegistrationStats = (): RegistrationStats => {
  // State to store the fetched data
  const [stats, setStats] = useState<RegistrationStats>({
    pending: 0,
    approved: 0,
    total: 0,
    loading: true,
    error: null,
  });

  // Get authentication info
  const { isInitialized, isLoading: authLoading } = useOrganizationAuth();

  // Function to fetch data from API
  const fetchRegistrationCount = async (status: 'pending' | 'approved'): Promise<number> => {
    try {
      const apiUrl = `${API_BASE_URL}/api/hospitals/registrations/?status=${status}`;

      // Make the HTTP request
      const response = await fetch(apiUrl, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${status} registrations`);
      }

      // Parse the JSON response
      const data = await response.json();

      // Count the number of registrations
      const count = Array.isArray(data) ? data.length : 0;
      return count;

    } catch (err) {
      console.error(`Error fetching ${status} registrations:`, err);
      return 0;
    }
  };

  // useEffect runs when component mounts or dependencies change
  useEffect(() => {
    const loadStats = async () => {
      setStats(prev => ({ ...prev, loading: true, error: null }));

      try {
        // Fetch both pending and approved counts in parallel
        const [pendingCount, approvedCount] = await Promise.all([
          fetchRegistrationCount('pending'),
          fetchRegistrationCount('approved')
        ]);

        // Update state with fetched data
        setStats({
          pending: pendingCount,
          approved: approvedCount,
          total: pendingCount + approvedCount,
          loading: false,
          error: null,
        });
      } catch (err) {
        setStats(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load registration stats',
        }));
      }
    };

    // Only fetch when auth is ready
    if (isInitialized && !authLoading) {
      loadStats();
    }
  }, [isInitialized, authLoading]);

  return stats; // Return the stats for components to use
};
```

**How to use this hook in a component**:
```typescript
function DashboardComponent() {
  // Call the hook to get the data
  const { pending, approved, total, loading, error } = useRegistrationStats();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Registration Stats</h2>
      <p>Pending: {pending}</p>
      <p>Approved: {approved}</p>
      <p>Total: {total}</p>
    </div>
  );
}
```

---

### 4. **Context Providers** (`features/*/authContext.tsx`)
Context provides a way to share data across many components without passing props manually at every level. Think of it as a global store.

**Example: Organization Auth Context**
```typescript
// File: src/features/organization/organizationAuthContext.tsx

interface UserData {
  id: number;
  email: string;
  full_name: string;
  role: 'hospital_admin' | 'ngo_admin' | 'pharmacy_admin';
  hospital?: HospitalInfo;
  is_verified: boolean;
  position: string;
}

interface OrganizationAuthContextType {
  isAuthenticated: boolean;
  userData: UserData | null;
  error: string | null;
  isLoading: boolean;
  login: (email: string, password: string, hospital_code: string) => Promise<void>;
  logout: () => void;
}

// Create the context
const OrganizationAuthContext = createContext<OrganizationAuthContextType | undefined>(undefined);

// Provider component that wraps your app
export const OrganizationAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Fetch user profile from backend
        const response = await fetch(createApiUrl('api/hospitals/admin/profile/'), {
          method: 'GET',
          credentials: 'include', // Send cookies
        });

        if (response.ok) {
          const profileData = await response.json();

          // Update context with user data
          setIsAuthenticated(true);
          setUserData(profileData);
        } else {
          setIsAuthenticated(false);
          setUserData(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setIsAuthenticated(false);
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string, hospital_code: string) => {
    // Login logic here...
  };

  const logout = async () => {
    // Logout logic here...
  };

  // Provide the context value to all children
  return (
    <OrganizationAuthContext.Provider value={{
      isAuthenticated,
      userData,
      error,
      isLoading,
      login,
      logout,
    }}>
      {children}
    </OrganizationAuthContext.Provider>
  );
};

// Custom hook to use the context
export const useOrganizationAuth = () => {
  const context = useContext(OrganizationAuthContext);
  if (context === undefined) {
    throw new Error('useOrganizationAuth must be used within an OrganizationAuthProvider');
  }
  return context;
};
```

**Using the context in components**:
```typescript
function SomeComponent() {
  const { userData, isAuthenticated, logout } = useOrganizationAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {userData?.full_name}!</h1>
      <p>Hospital: {userData?.hospital?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

### 5. **Components** (`pages/*.tsx`, `components/*.tsx`)
Components are the UI building blocks that display data to users. They use hooks and context to get data.

**Example: Organization Dashboard Page**
```typescript
// File: src/pages/organization/OrganizationDashboardPage.tsx

const OrganizationDashboardPage: React.FC = () => {
  // Get user data from context
  const { userData, logout, isLoading } = useOrganizationAuth();

  // Get dashboard statistics from custom hook
  const dashboardStats = useOrganizationDashboardStats();

  // Show loading spinner while data is being fetched
  if (isLoading || dashboardStats.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
        <p className="mt-4">Loading Dashboard...</p>
      </div>
    );
  }

  // Show error message if something went wrong
  if (dashboardStats.error) {
    return <div className="text-red-600">Error: {dashboardStats.error}</div>;
  }

  // Render the dashboard with real data
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-blue-800">
            {dashboardStats.organizationType} Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Welcome, <span className="font-semibold">{userData?.full_name}</span>
          </p>
          <p className="text-blue-600">
            {dashboardStats.organizationName}
          </p>
          <button onClick={logout} className="mt-4 px-4 py-2 bg-red-600 text-white rounded">
            Sign Out
          </button>
        </div>

        {/* Stats Grid - Hospital specific */}
        {dashboardStats.hospital && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Beds Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm font-medium">Total Beds</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {dashboardStats.hospital.totalBeds}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {dashboardStats.hospital.availableBeds} available
              </p>
            </div>

            {/* Active Patients Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm font-medium">Active Patients</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {dashboardStats.hospital.activePatients}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {dashboardStats.hospital.bedUtilization}% utilization
              </p>
            </div>

            {/* Pending Registrations Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500 text-sm font-medium">Pending Registrations</h3>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {dashboardStats.hospital.pendingRegistrations}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {dashboardStats.hospital.approvedRegistrations} approved
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationDashboardPage;
```

---

## 🔄 Complete Data Flow Example

Let's trace how **department statistics** flow from database to screen:

### **Step 1: Database**
```sql
-- PostgreSQL database has a departments table
SELECT * FROM departments WHERE hospital_id = 1 AND is_active = true;
```

### **Step 2: Django Model**
```python
# File: basebackend/hospitals/models.py

class Department(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=50)
    total_beds = models.IntegerField(default=0)
    occupied_beds = models.IntegerField(default=0)
    available_beds = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    # ... more fields
```

### **Step 3: Django Serializer**
```python
# File: basebackend/hospitals/serializers.py

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = [
            'id', 'name', 'code', 'total_beds',
            'occupied_beds', 'available_beds', 'is_active'
        ]
```

### **Step 4: Django View**
```python
# File: basebackend/hospitals/views.py

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def department_list(request):
    hospital_id = request.query_params.get('hospital')
    departments = Department.objects.filter(hospital_id=hospital_id, is_active=True)
    serializer = DepartmentSerializer(departments, many=True)
    return Response(serializer.data)
```

### **Step 5: Django URL**
```python
# File: basebackend/hospitals/urls.py

urlpatterns = [
    path('departments/', views.department_list, name='department-list'),
]
```

### **Step 6: API Response (JSON)**
```json
[
  {
    "id": 1,
    "name": "Emergency Department",
    "code": "EMRG",
    "total_beds": 50,
    "occupied_beds": 35,
    "available_beds": 15,
    "is_active": true
  },
  {
    "id": 2,
    "name": "ICU",
    "code": "ICU",
    "total_beds": 20,
    "occupied_beds": 18,
    "available_beds": 2,
    "is_active": true
  }
]
```

### **Step 7: Frontend Custom Hook**
```typescript
// File: src/hooks/useDepartmentStats.ts

export const useDepartmentStats = () => {
  const { userData } = useOrganizationAuth();
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      const hospitalId = userData?.hospital?.id;
      const apiUrl = `${API_BASE_URL}/api/hospitals/departments/?hospital=${hospitalId}`;

      const response = await fetch(apiUrl, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      setDepartments(data);
      setLoading(false);
    };

    if (userData?.hospital?.id) {
      fetchDepartments();
    }
  }, [userData]);

  return { departments, loading };
};
```

### **Step 8: Display in Component**
```typescript
// File: src/pages/organization/OrganizationDashboardPage.tsx

function DepartmentStats() {
  const { departments, loading } = useDepartmentStats();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Department Statistics</h2>
      {departments.map(dept => (
        <div key={dept.id} className="card">
          <h3>{dept.name}</h3>
          <p>Total Beds: {dept.total_beds}</p>
          <p>Occupied: {dept.occupied_beds}</p>
          <p>Available: {dept.available_beds}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## 🏗️ Complete Feature Development Workflow

### **Real-World Example: Building an Employee/HR Dashboard from Scratch**

Let's walk through building a complete feature - an Employee Dashboard at `http://localhost:5173/employee/dashboard` that shows employee attendance, leave requests, and payroll information.

---

### **Phase 1: Planning & Requirements** 📋

Before writing ANY code, understand what you need:

#### **Step 1.1: Define the Feature Requirements**

**What does the Employee Dashboard need to show?**
- Employee personal information
- Attendance records (clock in/out times)
- Leave requests (pending, approved, rejected)
- Payroll information (salary, deductions, bonuses)
- Department assignment
- Shift schedule

#### **Step 1.2: Sketch the Data Structure**

```
Employee
├── Basic Info (name, email, employee_id, position)
├── Department (which department they work in)
├── Attendance Records (date, clock_in, clock_out, hours_worked)
├── Leave Requests (type, start_date, end_date, status)
└── Payroll (base_salary, allowances, deductions)
```

#### **Step 1.3: List the API Endpoints You'll Need**

```
GET  /api/employees/profile/              - Get logged-in employee's profile
GET  /api/employees/attendance/           - Get attendance records
POST /api/employees/attendance/clock-in/  - Clock in
POST /api/employees/attendance/clock-out/ - Clock out
GET  /api/employees/leaves/               - Get leave requests
POST /api/employees/leaves/               - Create leave request
GET  /api/employees/payroll/              - Get payroll information
```

---

### **Phase 2: Backend Development** 🔨

#### **Step 2.1: Create Django Models**

Models define the database structure. Create or update `basebackend/employees/models.py`:

```python
# File: basebackend/employees/models.py

from django.db import models
from django.contrib.auth.models import User
from hospitals.models import Hospital, Department

class Employee(models.Model):
    """Core employee information"""
    EMPLOYMENT_STATUS = [
        ('active', 'Active'),
        ('on_leave', 'On Leave'),
        ('suspended', 'Suspended'),
        ('terminated', 'Terminated'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='employee_profile')
    employee_id = models.CharField(max_length=50, unique=True)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='employees')
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)

    # Personal Information
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)
    date_of_birth = models.DateField()

    # Employment Details
    position = models.CharField(max_length=100)
    employment_status = models.CharField(max_length=20, choices=EMPLOYMENT_STATUS, default='active')
    date_hired = models.DateField()
    date_terminated = models.DateField(null=True, blank=True)

    # Salary Information
    base_salary = models.DecimalField(max_digits=10, decimal_places=2)
    hourly_rate = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'employees'
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return f"{self.employee_id} - {self.first_name} {self.last_name}"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class Attendance(models.Model):
    """Track employee attendance - clock in/out"""
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='attendance_records')
    date = models.DateField()
    clock_in = models.DateTimeField(null=True, blank=True)
    clock_out = models.DateTimeField(null=True, blank=True)
    hours_worked = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    notes = models.TextField(blank=True)

    class Meta:
        db_table = 'employee_attendance'
        ordering = ['-date']
        unique_together = ['employee', 'date']

    def __str__(self):
        return f"{self.employee.full_name} - {self.date}"


class LeaveRequest(models.Model):
    """Employee leave/vacation requests"""
    LEAVE_TYPES = [
        ('sick', 'Sick Leave'),
        ('vacation', 'Vacation'),
        ('personal', 'Personal Leave'),
        ('maternity', 'Maternity Leave'),
        ('paternity', 'Paternity Leave'),
        ('emergency', 'Emergency Leave'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('cancelled', 'Cancelled'),
    ]

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='leave_requests')
    leave_type = models.CharField(max_length=20, choices=LEAVE_TYPES)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    approved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_leaves')
    approved_at = models.DateTimeField(null=True, blank=True)
    rejection_reason = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'employee_leave_requests'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.employee.full_name} - {self.leave_type} ({self.status})"

    @property
    def total_days(self):
        return (self.end_date - self.start_date).days + 1


class Payroll(models.Model):
    """Monthly payroll records"""
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='payroll_records')
    month = models.IntegerField()  # 1-12
    year = models.IntegerField()

    # Earnings
    base_salary = models.DecimalField(max_digits=10, decimal_places=2)
    overtime_pay = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    bonuses = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    allowances = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    # Deductions
    tax_deduction = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    insurance_deduction = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    other_deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    # Totals
    gross_pay = models.DecimalField(max_digits=10, decimal_places=2)
    net_pay = models.DecimalField(max_digits=10, decimal_places=2)

    payment_date = models.DateField(null=True, blank=True)
    is_paid = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'employee_payroll'
        ordering = ['-year', '-month']
        unique_together = ['employee', 'month', 'year']

    def __str__(self):
        return f"{self.employee.full_name} - {self.month}/{self.year}"
```

**After creating models, run migrations:**
```bash
cd basebackend
python manage.py makemigrations
python manage.py migrate
```

---

#### **Step 2.2: Create Serializers**

Serializers convert model instances to JSON. Create `basebackend/employees/serializers.py`:

```python
# File: basebackend/employees/serializers.py

from rest_framework import serializers
from .models import Employee, Attendance, LeaveRequest, Payroll
from hospitals.serializers import DepartmentSerializer

class EmployeeSerializer(serializers.ModelSerializer):
    """Serializer for Employee model"""
    full_name = serializers.CharField(read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    hospital_name = serializers.CharField(source='hospital.name', read_only=True)

    class Meta:
        model = Employee
        fields = [
            'id',
            'employee_id',
            'first_name',
            'last_name',
            'full_name',
            'email',
            'phone_number',
            'date_of_birth',
            'position',
            'employment_status',
            'date_hired',
            'department',
            'department_name',
            'hospital',
            'hospital_name',
            'base_salary',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class AttendanceSerializer(serializers.ModelSerializer):
    """Serializer for Attendance records"""
    employee_name = serializers.CharField(source='employee.full_name', read_only=True)
    employee_id = serializers.CharField(source='employee.employee_id', read_only=True)

    class Meta:
        model = Attendance
        fields = [
            'id',
            'employee',
            'employee_name',
            'employee_id',
            'date',
            'clock_in',
            'clock_out',
            'hours_worked',
            'notes',
        ]
        read_only_fields = ['id', 'hours_worked']


class LeaveRequestSerializer(serializers.ModelSerializer):
    """Serializer for Leave Requests"""
    employee_name = serializers.CharField(source='employee.full_name', read_only=True)
    total_days = serializers.IntegerField(read_only=True)
    leave_type_display = serializers.CharField(source='get_leave_type_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = LeaveRequest
        fields = [
            'id',
            'employee',
            'employee_name',
            'leave_type',
            'leave_type_display',
            'start_date',
            'end_date',
            'total_days',
            'reason',
            'status',
            'status_display',
            'approved_by',
            'approved_at',
            'rejection_reason',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'approved_by', 'approved_at']


class PayrollSerializer(serializers.ModelSerializer):
    """Serializer for Payroll records"""
    employee_name = serializers.CharField(source='employee.full_name', read_only=True)
    employee_id = serializers.CharField(source='employee.employee_id', read_only=True)

    class Meta:
        model = Payroll
        fields = [
            'id',
            'employee',
            'employee_name',
            'employee_id',
            'month',
            'year',
            'base_salary',
            'overtime_pay',
            'bonuses',
            'allowances',
            'tax_deduction',
            'insurance_deduction',
            'other_deductions',
            'gross_pay',
            'net_pay',
            'payment_date',
            'is_paid',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']
```

**Key Points:**
- `fields` list defines what data will be sent to frontend
- `read_only_fields` cannot be modified by API calls
- `source='employee.full_name'` accesses nested properties
- `serializers.CharField(read_only=True)` for computed properties

---

#### **Step 2.3: Create Views**

Views handle API requests. Create `basebackend/employees/views.py`:

```python
# File: basebackend/employees/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import datetime, date
from .models import Employee, Attendance, LeaveRequest, Payroll
from .serializers import (
    EmployeeSerializer,
    AttendanceSerializer,
    LeaveRequestSerializer,
    PayrollSerializer
)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def employee_profile(request):
    """
    Get the profile of the logged-in employee
    URL: GET /api/employees/profile/
    """
    try:
        # Get employee associated with the logged-in user
        employee = Employee.objects.get(user=request.user)
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)
    except Employee.DoesNotExist:
        return Response(
            {'error': 'Employee profile not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def attendance_list(request):
    """
    Get attendance records for the logged-in employee
    URL: GET /api/employees/attendance/?start_date=2024-01-01&end_date=2024-01-31
    """
    try:
        employee = Employee.objects.get(user=request.user)

        # Get query parameters for date filtering
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')

        # Base query
        attendance = Attendance.objects.filter(employee=employee)

        # Apply date filters if provided
        if start_date:
            attendance = attendance.filter(date__gte=start_date)
        if end_date:
            attendance = attendance.filter(date__lte=end_date)

        serializer = AttendanceSerializer(attendance, many=True)
        return Response(serializer.data)

    except Employee.DoesNotExist:
        return Response(
            {'error': 'Employee profile not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def clock_in(request):
    """
    Clock in for work
    URL: POST /api/employees/attendance/clock-in/
    """
    try:
        employee = Employee.objects.get(user=request.user)
        today = date.today()

        # Check if already clocked in today
        attendance, created = Attendance.objects.get_or_create(
            employee=employee,
            date=today,
            defaults={'clock_in': timezone.now()}
        )

        if not created and attendance.clock_in:
            return Response(
                {'error': 'Already clocked in today'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not created:
            attendance.clock_in = timezone.now()
            attendance.save()

        serializer = AttendanceSerializer(attendance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Employee.DoesNotExist:
        return Response(
            {'error': 'Employee profile not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def clock_out(request):
    """
    Clock out from work
    URL: POST /api/employees/attendance/clock-out/
    """
    try:
        employee = Employee.objects.get(user=request.user)
        today = date.today()

        # Get today's attendance record
        try:
            attendance = Attendance.objects.get(employee=employee, date=today)
        except Attendance.DoesNotExist:
            return Response(
                {'error': 'No clock-in record found for today'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if attendance.clock_out:
            return Response(
                {'error': 'Already clocked out today'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Record clock out time
        attendance.clock_out = timezone.now()

        # Calculate hours worked
        if attendance.clock_in:
            time_diff = attendance.clock_out - attendance.clock_in
            attendance.hours_worked = round(time_diff.total_seconds() / 3600, 2)

        attendance.save()

        serializer = AttendanceSerializer(attendance)
        return Response(serializer.data)

    except Employee.DoesNotExist:
        return Response(
            {'error': 'Employee profile not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def leave_requests(request):
    """
    GET: List all leave requests for the employee
    POST: Create a new leave request
    URL: /api/employees/leaves/
    """
    try:
        employee = Employee.objects.get(user=request.user)

        if request.method == 'GET':
            # Get all leave requests
            leaves = LeaveRequest.objects.filter(employee=employee)

            # Filter by status if provided
            status_filter = request.query_params.get('status')
            if status_filter:
                leaves = leaves.filter(status=status_filter)

            serializer = LeaveRequestSerializer(leaves, many=True)
            return Response(serializer.data)

        elif request.method == 'POST':
            # Create new leave request
            serializer = LeaveRequestSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save(employee=employee)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Employee.DoesNotExist:
        return Response(
            {'error': 'Employee profile not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def payroll_records(request):
    """
    Get payroll records for the employee
    URL: GET /api/employees/payroll/?year=2024&month=1
    """
    try:
        employee = Employee.objects.get(user=request.user)

        # Base query
        payroll = Payroll.objects.filter(employee=employee)

        # Filter by year and month if provided
        year = request.query_params.get('year')
        month = request.query_params.get('month')

        if year:
            payroll = payroll.filter(year=year)
        if month:
            payroll = payroll.filter(month=month)

        serializer = PayrollSerializer(payroll, many=True)
        return Response(serializer.data)

    except Employee.DoesNotExist:
        return Response(
            {'error': 'Employee profile not found'},
            status=status.HTTP_404_NOT_FOUND
        )
```

**Key Points:**
- `@api_view(['GET', 'POST'])` defines allowed HTTP methods
- `@permission_classes([IsAuthenticated])` requires login
- `request.user` is the logged-in user
- `request.query_params` gets URL query parameters
- `request.data` gets POST body data
- Always return proper HTTP status codes

---

#### **Step 2.4: Set Up URL Routes**

Map URLs to views. Create/update `basebackend/employees/urls.py`:

```python
# File: basebackend/employees/urls.py

from django.urls import path
from . import views

urlpatterns = [
    # Employee profile
    path('profile/', views.employee_profile, name='employee-profile'),

    # Attendance
    path('attendance/', views.attendance_list, name='attendance-list'),
    path('attendance/clock-in/', views.clock_in, name='clock-in'),
    path('attendance/clock-out/', views.clock_out, name='clock-out'),

    # Leave requests
    path('leaves/', views.leave_requests, name='leave-requests'),

    # Payroll
    path('payroll/', views.payroll_records, name='payroll-records'),
]
```

**Include in main `urls.py`:**
```python
# File: basebackend/basebackend/urls.py

from django.urls import path, include

urlpatterns = [
    # ... other patterns ...
    path('api/employees/', include('employees.urls')),
]
```

---

#### **Step 2.5: Test the API**

Before moving to frontend, TEST YOUR API!

**Using curl:**
```bash
# 1. Login to get token (adjust based on your auth system)
curl -X POST http://localhost:8000/api/login/ \
  -H "Content-Type: application/json" \
  -d '{"email": "employee@hospital.com", "password": "password123"}'

# Response: {"token": "abc123xyz..."}

# 2. Get employee profile
curl -X GET http://localhost:8000/api/employees/profile/ \
  -H "Authorization: Bearer abc123xyz..."

# 3. Get attendance records
curl -X GET 'http://localhost:8000/api/employees/attendance/?start_date=2024-01-01' \
  -H "Authorization: Bearer abc123xyz..."

# 4. Clock in
curl -X POST http://localhost:8000/api/employees/attendance/clock-in/ \
  -H "Authorization: Bearer abc123xyz..."

# 5. Get leave requests
curl -X GET http://localhost:8000/api/employees/leaves/ \
  -H "Authorization: Bearer abc123xyz..."

# 6. Create leave request
curl -X POST http://localhost:8000/api/employees/leaves/ \
  -H "Authorization: Bearer abc123xyz..." \
  -H "Content-Type: application/json" \
  -d '{
    "leave_type": "vacation",
    "start_date": "2024-07-01",
    "end_date": "2024-07-05",
    "reason": "Family vacation"
  }'
```

**Check responses:**
- Status 200/201 = Success ✅
- Status 400 = Bad request (check your data)
- Status 401 = Not authenticated (check token)
- Status 404 = Not found (check URL)
- Status 500 = Server error (check backend logs)

---

### **Phase 3: Frontend Development** 🎨

Now that the backend is working, let's build the frontend!

#### **Step 3.1: Create TypeScript Interfaces**

Create `src/types/employee.ts`:

```typescript
// File: src/types/employee.ts

export interface Employee {
  id: number;
  employee_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  position: string;
  employment_status: 'active' | 'on_leave' | 'suspended' | 'terminated';
  date_hired: string;
  department: number;
  department_name: string;
  hospital: number;
  hospital_name: string;
  base_salary: number;
  created_at: string;
  updated_at: string;
}

export interface Attendance {
  id: number;
  employee: number;
  employee_name: string;
  employee_id: string;
  date: string;
  clock_in: string | null;
  clock_out: string | null;
  hours_worked: number;
  notes: string;
}

export interface LeaveRequest {
  id: number;
  employee: number;
  employee_name: string;
  leave_type: 'sick' | 'vacation' | 'personal' | 'maternity' | 'paternity' | 'emergency';
  leave_type_display: string;
  start_date: string;
  end_date: string;
  total_days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  status_display: string;
  approved_by: number | null;
  approved_at: string | null;
  rejection_reason: string;
  created_at: string;
  updated_at: string;
}

export interface Payroll {
  id: number;
  employee: number;
  employee_name: string;
  employee_id: string;
  month: number;
  year: number;
  base_salary: number;
  overtime_pay: number;
  bonuses: number;
  allowances: number;
  tax_deduction: number;
  insurance_deduction: number;
  other_deductions: number;
  gross_pay: number;
  net_pay: number;
  payment_date: string | null;
  is_paid: boolean;
  created_at: string;
}

export interface CreateLeaveRequest {
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
}
```

**These interfaces MUST match your backend serializers!**

---

#### **Step 3.2: Create Service Functions**

Create `src/services/employeeService.ts`:

```typescript
// File: src/services/employeeService.ts

import { API_BASE_URL } from '../utils/config';
import type { Employee, Attendance, LeaveRequest, Payroll, CreateLeaveRequest } from '../types/employee';

export const EmployeeService = {
  // Get employee profile
  async getProfile(): Promise<Employee> {
    const response = await fetch(`${API_BASE_URL}/api/employees/profile/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch employee profile');
    }

    return await response.json();
  },

  // Get attendance records
  async getAttendance(startDate?: string, endDate?: string): Promise<Attendance[]> {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);

    const url = `${API_BASE_URL}/api/employees/attendance/?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch attendance records');
    }

    return await response.json();
  },

  // Clock in
  async clockIn(): Promise<Attendance> {
    const response = await fetch(`${API_BASE_URL}/api/employees/attendance/clock-in/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to clock in');
    }

    return await response.json();
  },

  // Clock out
  async clockOut(): Promise<Attendance> {
    const response = await fetch(`${API_BASE_URL}/api/employees/attendance/clock-out/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to clock out');
    }

    return await response.json();
  },

  // Get leave requests
  async getLeaveRequests(statusFilter?: string): Promise<LeaveRequest[]> {
    const params = new URLSearchParams();
    if (statusFilter) params.append('status', statusFilter);

    const url = `${API_BASE_URL}/api/employees/leaves/?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch leave requests');
    }

    return await response.json();
  },

  // Create leave request
  async createLeaveRequest(leaveData: CreateLeaveRequest): Promise<LeaveRequest> {
    const response = await fetch(`${API_BASE_URL}/api/employees/leaves/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(leaveData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create leave request');
    }

    return await response.json();
  },

  // Get payroll records
  async getPayroll(year?: number, month?: number): Promise<Payroll[]> {
    const params = new URLSearchParams();
    if (year) params.append('year', year.toString());
    if (month) params.append('month', month.toString());

    const url = `${API_BASE_URL}/api/employees/payroll/?${params.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch payroll records');
    }

    return await response.json();
  },
};
```

---

#### **Step 3.3: Create Custom Hooks**

Create `src/hooks/useEmployeeData.ts`:

```typescript
// File: src/hooks/useEmployeeData.ts

import { useState, useEffect } from 'react';
import { EmployeeService } from '../services/employeeService';
import type { Employee, Attendance, LeaveRequest, Payroll } from '../types/employee';

export const useEmployeeProfile = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await EmployeeService.getProfile();
        setEmployee(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { employee, loading, error };
};

export const useAttendance = (startDate?: string, endDate?: string) => {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const data = await EmployeeService.getAttendance(startDate, endDate);
        setAttendance(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load attendance');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [startDate, endDate]);

  const refetch = () => {
    EmployeeService.getAttendance(startDate, endDate)
      .then(setAttendance)
      .catch(err => setError(err.message));
  };

  return { attendance, loading, error, refetch };
};

export const useLeaveRequests = (statusFilter?: string) => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        setLoading(true);
        const data = await EmployeeService.getLeaveRequests(statusFilter);
        setLeaves(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leave requests');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [statusFilter]);

  const refetch = () => {
    EmployeeService.getLeaveRequests(statusFilter)
      .then(setLeaves)
      .catch(err => setError(err.message));
  };

  return { leaves, loading, error, refetch };
};

export const usePayroll = (year?: number, month?: number) => {
  const [payroll, setPayroll] = useState<Payroll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayroll = async () => {
      try {
        setLoading(true);
        const data = await EmployeeService.getPayroll(year, month);
        setPayroll(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load payroll');
      } finally {
        setLoading(false);
      }
    };

    fetchPayroll();
  }, [year, month]);

  return { payroll, loading, error };
};
```

---

#### **Step 3.4: Create the Dashboard Page**

Create `src/pages/employee/EmployeeDashboardPage.tsx`:

```typescript
// File: src/pages/employee/EmployeeDashboardPage.tsx

import React, { useState } from 'react';
import { useEmployeeProfile, useAttendance, useLeaveRequests } from '../../hooks/useEmployeeData';
import { EmployeeService } from '../../services/employeeService';

const EmployeeDashboardPage: React.FC = () => {
  const { employee, loading: profileLoading } = useEmployeeProfile();
  const { attendance, refetch: refetchAttendance } = useAttendance();
  const { leaves } = useLeaveRequests();
  const [clockingIn, setClockingIn] = useState(false);

  const handleClockIn = async () => {
    try {
      setClockingIn(true);
      await EmployeeService.clockIn();
      alert('Clocked in successfully!');
      refetchAttendance();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to clock in');
    } finally {
      setClockingIn(false);
    }
  };

  const handleClockOut = async () => {
    try {
      setClockingIn(true);
      await EmployeeService.clockOut();
      alert('Clocked out successfully!');
      refetchAttendance();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to clock out');
    } finally {
      setClockingIn(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Get today's attendance
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.find(a => a.date === today);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6 bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-blue-800">Employee Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Welcome, <span className="font-semibold">{employee?.full_name}</span>
        </p>
        <div className="mt-2 space-y-1 text-sm">
          <p className="text-gray-600">Employee ID: {employee?.employee_id}</p>
          <p className="text-gray-600">Position: {employee?.position}</p>
          <p className="text-gray-600">Department: {employee?.department_name}</p>
        </div>
      </div>

      {/* Clock In/Out Section */}
      <div className="mb-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Attendance</h2>

        <div className="flex gap-4">
          <button
            onClick={handleClockIn}
            disabled={clockingIn || !!todayAttendance?.clock_in}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {todayAttendance?.clock_in ? 'Already Clocked In' : 'Clock In'}
          </button>

          <button
            onClick={handleClockOut}
            disabled={clockingIn || !todayAttendance?.clock_in || !!todayAttendance?.clock_out}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {todayAttendance?.clock_out ? 'Already Clocked Out' : 'Clock Out'}
          </button>
        </div>

        {todayAttendance && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              Clock In: {todayAttendance.clock_in
                ? new Date(todayAttendance.clock_in).toLocaleTimeString()
                : 'Not clocked in'}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              Clock Out: {todayAttendance.clock_out
                ? new Date(todayAttendance.clock_out).toLocaleTimeString()
                : 'Not clocked out'}
            </p>
            <p className="text-sm font-semibold text-gray-800 mt-2">
              Hours Worked: {todayAttendance.hours_worked} hrs
            </p>
          </div>
        )}
      </div>

      {/* Leave Requests Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Leave Requests</h2>

        {leaves.length === 0 ? (
          <p className="text-gray-500">No leave requests found</p>
        ) : (
          <div className="space-y-4">
            {leaves.map(leave => (
              <div key={leave.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{leave.leave_type_display}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {leave.start_date} to {leave.end_date} ({leave.total_days} days)
                    </p>
                    <p className="text-sm text-gray-700 mt-2">{leave.reason}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    leave.status === 'approved' ? 'bg-green-100 text-green-800' :
                    leave.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {leave.status_display}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboardPage;
```

---

#### **Step 3.5: Set Up Routing**

Update `src/App.tsx` to add the employee route:

```typescript
// File: src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeDashboardPage from './pages/employee/EmployeeDashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ... other routes ... */}

        <Route path="/employee/dashboard" element={<EmployeeDashboardPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

### **Phase 4: Testing & Refinement** 🧪

#### **Step 4.1: Test the Complete Flow**

1. **Start backend server:**
   ```bash
   cd basebackend
   python manage.py runserver
   ```

2. **Start frontend dev server:**
   ```bash
   cd phbfrontend
   bun run dev
   ```

3. **Open browser:**
   - Navigate to `http://localhost:5173/employee/dashboard`
   - Check browser console (F12) for errors
   - Check Network tab for API calls

4. **Test each feature:**
   - Does the profile load correctly?
   - Can you clock in?
   - Can you clock out?
   - Do leave requests display?
   - Are there any errors in console?

#### **Step 4.2: Common Issues and Fixes**

**Issue: 401 Unauthorized**
- Check if user is logged in
- Verify authentication cookies/tokens are being sent

**Issue: 404 Not Found**
- Verify URL patterns in backend `urls.py`
- Check frontend API_BASE_URL configuration

**Issue: Data not displaying**
- Check browser console for errors
- Check Network tab for API response
- Verify TypeScript interfaces match backend serializer

**Issue: CORS errors**
- Configure CORS settings in Django settings
- Ensure `credentials: 'include'` in fetch calls

---

### **Summary: Complete Checklist** ✅

**Backend:**
- [ ] Created models in `models.py`
- [ ] Ran migrations (`makemigrations` and `migrate`)
- [ ] Created serializers in `serializers.py`
- [ ] Created views in `views.py`
- [ ] Set up URL routes in `urls.py`
- [ ] Tested API endpoints with curl/Postman
- [ ] Verified API responses match expected format

**Frontend:**
- [ ] Created TypeScript interfaces matching backend
- [ ] Created service functions for API calls
- [ ] Created custom hooks for data fetching
- [ ] Created page/component to display data
- [ ] Added route in App.tsx
- [ ] Tested in browser (http://localhost:5173/employee/dashboard)
- [ ] Handled loading and error states
- [ ] Verified data displays correctly

**Congratulations! You've built a complete feature from scratch!** 🎉

---

## 🚀 How to Fetch New Data

### **Scenario: You want to display a list of staff members**

#### **Step 1: Understand what data you need**
- Staff name
- Staff role
- Department
- Contact information

#### **Step 2: Check if backend endpoint exists**
Look in the backend code:
```python
# File: basebackend/hospitals/urls.py
path('staff/', views.staff_list, name='staff-list'),
```

If it doesn't exist, you need to create it first in the backend!

#### **Step 3: Test the endpoint**
Use curl or browser to test:
```bash
curl -X GET 'http://localhost:8000/api/hospitals/staff/' \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Expected response:
```json
[
  {
    "id": 1,
    "name": "Dr. John Doe",
    "role": "Doctor",
    "department": "Cardiology",
    "email": "john.doe@hospital.com"
  }
]
```

#### **Step 4: Create TypeScript interface**
```typescript
// File: src/types/staff.ts

export interface StaffMember {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
}
```

#### **Step 5: Create service function**
```typescript
// File: src/services/staffService.ts

import { API_BASE_URL } from '../utils/config';
import { StaffMember } from '../types/staff';

export const StaffService = {
  async getStaffList(hospitalId: number): Promise<StaffMember[]> {
    const response = await fetch(
      `${API_BASE_URL}/api/hospitals/staff/?hospital=${hospitalId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch staff');
    }

    return await response.json();
  },
};
```

#### **Step 6: Create custom hook**
```typescript
// File: src/hooks/useStaffList.ts

import { useState, useEffect } from 'react';
import { useOrganizationAuth } from '../features/organization/organizationAuthContext';
import { StaffService } from '../services/staffService';
import { StaffMember } from '../types/staff';

export const useStaffList = () => {
  const { userData, isInitialized } = useOrganizationAuth();
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      if (!userData?.hospital?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await StaffService.getStaffList(userData.hospital.id);
        setStaff(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch staff');
      } finally {
        setLoading(false);
      }
    };

    if (isInitialized) {
      fetchStaff();
    }
  }, [userData?.hospital?.id, isInitialized]);

  return { staff, loading, error };
};
```

#### **Step 7: Use in component**
```typescript
// File: src/pages/organization/StaffManagementPage.tsx

import React from 'react';
import { useStaffList } from '../../hooks/useStaffList';

const StaffManagementPage: React.FC = () => {
  const { staff, loading, error } = useStaffList();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Staff Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map(member => (
          <div key={member.id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-600 mt-2">{member.role}</p>
            <p className="text-gray-500 text-sm mt-1">{member.department}</p>
            <p className="text-blue-600 text-sm mt-2">{member.email}</p>
          </div>
        ))}
      </div>

      {staff.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No staff members found
        </div>
      )}
    </div>
  );
};

export default StaffManagementPage;
```

---

## 📚 Common Patterns

### **Pattern 1: Fetching data with filters**
```typescript
export const useFilteredData = (filters: Record<string, any>) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Convert filters to query string
      const queryString = new URLSearchParams(filters).toString();
      const url = `${API_BASE_URL}/api/endpoint/?${queryString}`;

      const response = await fetch(url, { credentials: 'include' });
      const result = await response.json();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, [JSON.stringify(filters)]); // Re-fetch when filters change

  return { data, loading };
};

// Usage
const { data, loading } = useFilteredData({
  status: 'active',
  department: 'cardiology'
});
```

### **Pattern 2: Paginated data**
```typescript
export const usePaginatedData = (page: number, pageSize: number) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${API_BASE_URL}/api/endpoint/?page=${page}&page_size=${pageSize}`;
      const response = await fetch(url, { credentials: 'include' });
      const result = await response.json();

      setData(result.results);
      setTotal(result.count);
      setLoading(false);
    };

    fetchData();
  }, [page, pageSize]);

  return { data, total, loading };
};
```

### **Pattern 3: Real-time updates**
```typescript
export const useRealtimeData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_BASE_URL}/api/endpoint/`, {
        credentials: 'include'
      });
      const result = await response.json();
      setData(result);
    };

    // Fetch immediately
    fetchData();

    // Set up polling - fetch every 30 seconds
    const interval = setInterval(fetchData, 30000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return { data };
};
```

### **Pattern 4: POST/Create data**
```typescript
export const useCreateRecord = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRecord = async (recordData: any) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/endpoint/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(recordData),
      });

      if (!response.ok) {
        throw new Error('Failed to create record');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createRecord, loading, error };
};

// Usage in component
function CreateForm() {
  const { createRecord, loading } = useCreateRecord();

  const handleSubmit = async (formData: any) => {
    try {
      const result = await createRecord(formData);
      alert('Record created successfully!');
    } catch (err) {
      alert('Failed to create record');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}
```

### **Pattern 5: Update data**
```typescript
export const useUpdateRecord = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateRecord = async (id: number, updates: any) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/api/endpoint/${id}/`, {
        method: 'PATCH', // or 'PUT' for full updates
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update record');
      }

      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateRecord, loading, error };
};
```

---

## 🔧 Troubleshooting

### **Problem: Data not loading**

**Checklist**:
1. ✅ Is the backend server running? (`python manage.py runserver`)
2. ✅ Is the API endpoint correct? Check `urls.py`
3. ✅ Are you authenticated? Check cookies/tokens
4. ✅ Check browser console for errors (F12 → Console)
5. ✅ Check network tab for API responses (F12 → Network)
6. ✅ Is the data structure correct? Match frontend types with backend serializer

**Debug tips**:
```typescript
// Add console logs in your hook
useEffect(() => {
  const fetchData = async () => {
    console.log('🔍 Fetching data from:', url);
    console.log('🔍 Hospital ID:', hospitalId);

    const response = await fetch(url);
    console.log('📡 Response status:', response.status);

    const data = await response.json();
    console.log('✅ Data received:', data);

    setData(data);
  };

  fetchData();
}, []);
```

### **Problem: 401 Unauthorized error**

**Solution**:
- User is not authenticated
- Check if cookies are being sent: `credentials: 'include'`
- Check if token exists: `localStorage.getItem('phb_organization_token')`
- Try logging in again

### **Problem: 404 Not Found error**

**Solution**:
- API endpoint doesn't exist
- Check URL spelling
- Check backend `urls.py` for correct path
- Make sure backend server is running

### **Problem: Data is undefined in component**

**Solution**:
```typescript
// Always check if data exists before using it
function Component() {
  const { userData } = useOrganizationAuth();

  // ❌ Bad - will crash if userData is null
  return <div>{userData.hospital.name}</div>;

  // ✅ Good - safely access nested properties
  return (
    <div>
      {userData?.hospital?.name || 'No hospital'}
    </div>
  );
}
```

### **Problem: Infinite loop / too many requests**

**Solution**:
```typescript
// ❌ Bad - missing dependency array, runs every render
useEffect(() => {
  fetchData();
});

// ❌ Bad - object in dependency causes infinite re-renders
useEffect(() => {
  fetchData();
}, [userData]); // userData is an object

// ✅ Good - only specific dependencies
useEffect(() => {
  fetchData();
}, [userData?.hospital?.id]); // Only re-run if hospital ID changes
```

---

## 🎓 Quick Reference

### **Data Flow Checklist**

When adding new data to the UI, follow this checklist:

- [ ] **Backend**: Model exists in `models.py`
- [ ] **Backend**: Serializer exists in `serializers.py`
- [ ] **Backend**: View exists in `views.py`
- [ ] **Backend**: URL pattern exists in `urls.py`
- [ ] **Backend**: Test endpoint with curl/Postman
- [ ] **Frontend**: Create TypeScript interface
- [ ] **Frontend**: Create service function
- [ ] **Frontend**: Create custom hook
- [ ] **Frontend**: Use hook in component
- [ ] **Frontend**: Handle loading and error states
- [ ] **Frontend**: Display data with proper styling

### **HTTP Methods Quick Reference**

| Method | Purpose | Example |
|--------|---------|---------|
| GET | Fetch data | `fetch('/api/staff/', { method: 'GET' })` |
| POST | Create new data | `fetch('/api/staff/', { method: 'POST', body: JSON.stringify(data) })` |
| PATCH | Update partial data | `fetch('/api/staff/1/', { method: 'PATCH', body: JSON.stringify(updates) })` |
| PUT | Update complete data | `fetch('/api/staff/1/', { method: 'PUT', body: JSON.stringify(data) })` |
| DELETE | Remove data | `fetch('/api/staff/1/', { method: 'DELETE' })` |

### **Common HTTP Status Codes**

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created successfully |
| 400 | Bad request (invalid data) |
| 401 | Unauthorized (not logged in) |
| 403 | Forbidden (no permission) |
| 404 | Not found (endpoint doesn't exist) |
| 500 | Server error (backend crashed) |

---

## 🎉 Congratulations!

You now understand how data flows through the PHB system! Remember:

1. **Backend** provides the data through APIs
2. **Services** fetch the data from APIs
3. **Hooks** manage state and side effects
4. **Context** shares data across components
5. **Components** display the data to users

Keep this guide handy as you build new features. Happy coding! 🚀

---

**Need help?** Ask your team lead or senior developers. They were once beginners too! 😊
