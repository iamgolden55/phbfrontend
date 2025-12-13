# 🏥 Organization Profile Page - Complete Data Flow Guide

*A Super Simple Guide to Understanding How Your Hospital Profile Gets Displayed*

**Written for: Junior Developers & Anyone Learning Our System**
**Last Updated: December 2025**

---

## 📚 Table of Contents

1. [The Big Picture Story](#-the-big-picture-story)
2. [Understanding the Problem We Solved](#-understanding-the-problem-we-solved)
3. [Complete Step-by-Step Data Journey](#-complete-step-by-step-data-journey)
4. [How Naming Works (Backend vs Frontend)](#-how-naming-works-backend-vs-frontend)
5. [The Code Files Involved](#-the-code-files-involved)
6. [Understanding Each Data Field](#-understanding-each-data-field)
7. [The Data Mapping Magic](#-the-data-mapping-magic)
8. [Common Questions & Answers](#-common-questions--answers)
9. [How to Debug When Things Go Wrong](#-how-to-debug-when-things-go-wrong)
10. [Practice Exercises](#-practice-exercises)

---

## 🎯 The Big Picture Story

### Imagine This Scenario...

You are the admin of **"City Hospital"**. You log into the PHB system and click on "Profile" in the settings. You expect to see:
- Your hospital's name
- The address
- Phone numbers
- Contact persons
- How many beds you have
- And much more...

**But how does the computer know all this information about your hospital?** 🤔

Let's follow the journey of this data, from the moment you click "Profile" until you see it on your screen!

---

## 🔍 Understanding the Problem We Solved

### **The Original Problem** ❌

When we first built the Organization Profile page, we made a mistake. We designed it based on what we *thought* the backend should look like, not what it *actually* looked like!

**What we thought existed:**
```typescript
// We thought the backend had this fancy structure
{
  id: "1",
  name: "City Hospital",
  phones: [
    { number: "+44 20 3608", type: "main", is_primary: true },
    { number: "+44 7580 2961", type: "mobile", is_primary: false }
  ],
  emails: [
    { email: "info@hospital.com", type: "general", is_primary: true },
    { email: "support@hospital.com", type: "support", is_primary: false }
  ],
  bank_details: {
    bank_name: "Barclays",
    account_number: "12345678"
  }
}
```

**What actually existed in the backend:**
```python
# The real Hospital model in Django
class Hospital(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)  # Just ONE phone, not an array!
    email = models.EmailField()              # Just ONE email, not an array!
    # No bank_details at all!
```

### **The Solution** ✅

We fixed the frontend to match the *actual* backend structure. We:
1. Found out what data the backend really has
2. Updated our frontend interfaces to match
3. Fetched the data from the correct endpoints
4. Mapped the data properly
5. Displayed only the data that exists

---

## 🚂 Complete Step-by-Step Data Journey

Let's follow the data from the moment you click the Profile link!

### **Step 1: User Clicks "Profile"** 👆

**What happens:**
```
User in browser → Clicks "Profile" link
                → Browser navigates to: http://localhost:5173/organization/settings/profile
```

**In the browser's address bar:**
```
Before: http://localhost:5173/organization/settings
After:  http://localhost:5173/organization/settings/profile
```

---

### **Step 2: React Router Loads the Page** 🗺️

**What happens:**
```javascript
// In App.tsx
<Route path="/organization/settings/profile" element={<OrganizationProfilePage />} />
```

React Router sees that URL and says: *"Ah! The user wants to see the OrganizationProfilePage component. Let me load that!"*

The `OrganizationProfilePage` component starts loading...

---

### **Step 3: Page Component Mounts** ⚙️

**File: `OrganizationProfilePage.tsx`**

```typescript
const OrganizationProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<OrganizationProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();  // 👈 This runs automatically when page loads!
  }, []);
```

**What happens:**
1. The page component initializes
2. It creates state variables to store:
   - `profile`: Will hold the hospital data (starts as `null`)
   - `loading`: Shows we're still fetching data (starts as `true`)
3. The `useEffect` hook runs automatically
4. It calls `fetchProfile()` to get the data

**On your screen:**
```
┌─────────────────────────────────┐
│  🔄 Loading profile...          │
│                                 │
│     (spinning loader icon)      │
└─────────────────────────────────┘
```

---

### **Step 4: Fetching the Admin Profile** 📡

**File: `organizationProfileService.ts`**

```typescript
async getProfile(): Promise<OrganizationProfile> {
  // Step 1: Get the admin profile to find the hospital ID
  const profileResponse = await fetch(
    `${API_BASE_URL}/api/hospitals/admin/profile/`,
    {
      method: 'GET',
      credentials: 'include',  // 👈 Sends cookies with the request
    }
  );
```

**What happens:**
1. The browser makes an HTTP request to the backend
2. The URL is: `http://localhost:8000/api/hospitals/admin/profile/`
3. The browser automatically includes HTTP-only cookies (authentication tokens)

**Network Request:**
```
GET http://localhost:8000/api/hospitals/admin/profile/
Headers:
  Content-Type: application/json
  Cookie: access_token=eyJhbGc... (automatically included)
```

**Backend receives this request and checks:**
- Is there a valid cookie? ✅
- Is the user authenticated? ✅
- Is the user a hospital admin? ✅

**Backend responds with:**
```json
{
  "id": 71,
  "email": "admin@cityhospital.com",
  "full_name": "Dr. John Smith",
  "role": "hospital_admin",
  "hospital": {
    "id": 1,                    👈 This is what we need!
    "name": "City Hospital",
    "code": "CH001"
  },
  "is_verified": true,
  "position": "Administrator"
}
```

**The important part:**
```javascript
const profileData = await profileResponse.json();
const hospitalId = profileData.hospital?.id;  // → 1
```

We now know the hospital ID is `1`! 🎉

---

### **Step 5: Fetching All Hospitals** 📡

**Why do we need this?**
The admin profile only gives us basic hospital info (id, name, code). We need the *full* hospital details (address, phone, contacts, etc.).

```typescript
// Step 2: Get all hospitals and find the one matching the ID
const hospitalsResponse = await fetch(
  `${API_BASE_URL}/api/hospitals/`,
  {
    method: 'GET',
    credentials: 'include',
  }
);
```

**Network Request:**
```
GET http://localhost:8000/api/hospitals/
Headers:
  Content-Type: application/json
  Cookie: access_token=eyJhbGc...
```

**Backend responds with:**
```json
{
  "hospitals": [
    {
      "id": 1,
      "name": "City Hospital",
      "hospital_type": "public",
      "registration_number": "CH001",
      "address": "123 Medical Drive, London",
      "phone": "+44 20 3608 3182",
      "email": "info@cityhospital.com",
      "website": "https://cityhospital.com",
      "city": "London",
      "state": null,
      "country": "United Kingdom",
      "postal_code": "W1A 1AA",
      "emergency_contact": "+44 20 3608 9999",
      "primary_contact_name": "Sarah Johnson",
      "primary_contact_title": "Chief Administrator",
      "primary_contact_phone": "+44 20 3608 3100",
      "primary_contact_email": "s.johnson@cityhospital.com",
      "bed_capacity": 500,
      "emergency_unit": true,
      "icu_unit": true,
      "is_verified": true,
      "has_electronic_medical_records": true,
      "has_telemedicine_capabilities": false,
      ...and more fields...
    },
    {
      "id": 2,
      "name": "Another Hospital",
      ...
    }
  ]
}
```

**Finding our hospital:**
```typescript
const hospitalsData = await hospitalsResponse.json();
const hospital = hospitalsData.hospitals?.find(
  (h: HospitalApiResponse) => h.id === hospitalId  // Find hospital with id = 1
);
```

We now have the *complete* hospital data! 🎊

---

### **Step 6: Mapping the Data** 🗺️

**The Challenge:**
The backend sends data in one format, but our frontend wants it in a slightly different format. We need to "translate" it!

**Backend Format (what we receive):**
```typescript
{
  id: 1,
  name: "City Hospital",
  hospital_type: "public",               // 👈 Snake case
  registration_number: "CH001",          // 👈 Different name
  primary_contact_name: "Sarah Johnson", // 👈 Flat structure
  primary_contact_title: "Chief Admin",
  primary_contact_phone: "+44 20 3608",
  primary_contact_email: "s.johnson@..."
}
```

**Frontend Format (what we want):**
```typescript
{
  id: 1,
  name: "City Hospital",
  type: "public",                        // 👈 Camel case
  code: "CH001",                         // 👈 Renamed
  primary_contact: {                     // 👈 Nested object
    name: "Sarah Johnson",
    title: "Chief Admin",
    phone: "+44 20 3608",
    email: "s.johnson@..."
  }
}
```

**The Mapping Function:**
```typescript
function mapHospitalToProfile(hospital: HospitalApiResponse): OrganizationProfile {
  return {
    // Simple field mapping
    id: hospital.id,                           // 1 → 1
    name: hospital.name,                       // "City Hospital" → "City Hospital"
    type: hospital.hospital_type,              // "public" → "public"
    code: hospital.registration_number,        // "CH001" → "CH001"

    // Group related fields into an object
    primary_contact: hospital.primary_contact_name ? {
      name: hospital.primary_contact_name,
      title: hospital.primary_contact_title || '',
      phone: hospital.primary_contact_phone || '',
      email: hospital.primary_contact_email || '',
    } : undefined,  // 👈 Only create if name exists!

    // ... more mappings
  };
}
```

**Why do we do this?**
1. **Consistency**: All our frontend code uses camelCase
2. **Organization**: Related fields are grouped together
3. **Null Safety**: We handle missing data properly
4. **Type Safety**: TypeScript knows exactly what fields exist

---

### **Step 7: Updating the Component State** 📦

```typescript
// In fetchProfile()
const data = await OrganizationProfileService.getProfile();
setProfile(data);        // 👈 Store the data in React state
setLoading(false);       // 👈 Turn off loading spinner
```

**What happens:**
1. The `profile` state is updated with the hospital data
2. The `loading` state is set to `false`
3. React automatically re-renders the component

---

### **Step 8: Rendering the Data** 🎨

React now renders the page with the actual data:

```typescript
return (
  <div>
    {/* Hospital Name */}
    <h1>{profile.name}</h1>  {/* → "City Hospital" */}

    {/* Phone Number */}
    <p>{profile.phone}</p>   {/* → "+44 20 3608 3182" */}

    {/* Primary Contact */}
    {profile.primary_contact && (
      <div>
        <p>{profile.primary_contact.name}</p>   {/* → "Sarah Johnson" */}
        <p>{profile.primary_contact.title}</p>  {/* → "Chief Administrator" */}
      </div>
    )}
  </div>
);
```

**On your screen:**
```
┌─────────────────────────────────────────────┐
│  Organisation Profile                       │
│  ✓ Verified                                 │
├─────────────────────────────────────────────┤
│                                             │
│  🏥 City Hospital                           │
│  Type: Public Hospital                      │
│  Code: CH001                                │
│                                             │
│  📞 Contact Information                     │
│  +44 20 3608 3182                          │
│  info@cityhospital.com                     │
│                                             │
│  👥 Key Personnel                           │
│  Primary Contact: Sarah Johnson            │
│  Chief Administrator                        │
│  s.johnson@cityhospital.com                │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🏷️ How Naming Works (Backend vs Frontend)

### **Naming Convention Differences**

#### **Backend (Python/Django): snake_case**
```python
hospital_type
registration_number
primary_contact_name
has_electronic_medical_records
```

**Rules:**
- All lowercase
- Words separated by underscores `_`
- Example: `primary_contact_phone`

#### **Frontend (TypeScript): camelCase**
```typescript
hospitalType
registrationNumber
primaryContactName
hasElectronicMedicalRecords
```

**Rules:**
- First word lowercase
- Subsequent words capitalized
- No separators
- Example: `primaryContactPhone`

### **Why Different Naming?**

**Python/Django Convention:**
- Python developers are used to snake_case
- Django models use snake_case
- Database columns use snake_case

**JavaScript/TypeScript Convention:**
- JavaScript developers are used to camelCase
- Most JS libraries use camelCase
- React components use camelCase

### **How We Handle This**

**Option 1: Keep Backend Names (What We Did)**
```typescript
// Keep the same names as backend
interface OrganizationProfile {
  hospital_type: string;           // 👈 Matches backend exactly
  registration_number: string;
  primary_contact_name: string;
}
```

**Pros:**
- ✅ No mapping needed
- ✅ Easy to understand where data comes from

**Cons:**
- ❌ Not following JavaScript conventions
- ❌ Inconsistent with other frontend code

**Option 2: Rename to Camel Case (Alternative)**
```typescript
// Convert to camelCase
interface OrganizationProfile {
  hospitalType: string;           // 👈 JavaScript convention
  registrationNumber: string;
  primaryContactName: string;
}

// Then map during conversion
function mapHospitalToProfile(hospital) {
  return {
    hospitalType: hospital.hospital_type,
    registrationNumber: hospital.registration_number,
    // ...
  };
}
```

**Pros:**
- ✅ Follows JavaScript conventions
- ✅ Consistent with other frontend code

**Cons:**
- ❌ Extra mapping step
- ❌ Need to remember both names

### **Field Renaming Examples**

Some fields we renamed because the frontend name is clearer:

| Backend Name | Frontend Name | Why? |
|-------------|---------------|------|
| `hospital_type` | `type` | Shorter, context is clear |
| `registration_number` | `code` | More intuitive name |
| `has_electronic_medical_records` | `digital_infrastructure.emr` | Better organization |

---

## 📁 The Code Files Involved

Let's understand each file and what it does:

### **1. `organizationProfileService.ts`** 📡

**Location:** `src/services/organizationProfileService.ts`

**Purpose:** Handles all communication with the backend API

**What it does:**
- Makes HTTP requests to the backend
- Fetches hospital data
- Maps backend data to frontend format
- Handles errors

**Key Functions:**
```typescript
getProfile()  // Fetches and returns the hospital profile
```

**Think of it as:** A messenger that goes to the backend, gets information, and brings it back in a format we can use.

---

### **2. `OrganizationProfilePage.tsx`** 🎨

**Location:** `src/pages/organization/settings/OrganizationProfilePage.tsx`

**Purpose:** The actual page that users see

**What it does:**
- Calls the service to get data
- Shows a loading spinner while waiting
- Displays the data in a nice layout
- Handles errors gracefully

**Think of it as:** The restaurant menu and dining room. It takes the food (data) from the kitchen (service) and presents it nicely to customers (users).

---

### **3. Backend Hospital Model** 🗄️

**Location:** `basebackend/api/models/medical/hospital.py`

**Purpose:** Defines the hospital data structure in the database

**What it contains:**
```python
class Hospital(models.Model):
    name = models.CharField(max_length=200)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    # ... 50+ more fields
```

**Think of it as:** The blueprint for how hospital information is stored in the database.

---

### **4. Backend Hospital Serializer** 📝

**Location:** `basebackend/api/serializers.py`

**Purpose:** Converts database objects to JSON format

**What it does:**
```python
class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = [
            'id', 'name', 'hospital_type', 'address',
            'phone', 'email', 'website', ...
        ]
```

**Think of it as:** A translator that converts database language into JSON that the frontend can understand.

---

### **5. Backend Hospital Views** 🚪

**Location:** `basebackend/api/views/hospital/hospital_views.py`

**Purpose:** Handles incoming requests and returns data

**Key Endpoints:**
```python
@api_view(['GET'])
def hospital_list(request):
    hospitals = Hospital.objects.all()
    serializer = HospitalSerializer(hospitals, many=True)
    return Response({'hospitals': serializer.data})
```

**Think of it as:** The receptionist at the hospital. They receive your request and give you the information you need.

---

## 🎯 Understanding Each Data Field

Let's look at every field and understand what it means, where it comes from, and how it's used.

### **Basic Information Fields**

#### **1. `id`**
```typescript
id: number
```

**What is it?**
A unique number that identifies this hospital in the database.

**Example:** `1`, `42`, `1337`

**Backend Field:** `id`

**Where does it come from?**
Automatically created by Django when a hospital is added to the database.

**How is it used?**
- To fetch specific hospital details
- To link related records (appointments, departments, etc.)
- To identify which hospital an admin belongs to

**In the UI:**
Not directly shown to users (it's an internal ID)

---

#### **2. `name`**
```typescript
name: string
```

**What is it?**
The official name of the hospital.

**Example:** `"City Hospital"`, `"St. Mary's Medical Center"`

**Backend Field:** `name`

**Where does it come from?**
Entered during hospital registration or setup.

**How is it used?**
- Displayed as the main heading on the profile page
- Shown in lists and searches
- Used in emails and notifications

**In the UI:**
```tsx
<h1>{profile.name}</h1>
// Displays: "City Hospital"
```

---

#### **3. `type`**
```typescript
type: string
```

**What is it?**
The category or type of healthcare facility.

**Possible Values:**
- `"public"` - Government-funded hospital
- `"private"` - Privately owned hospital
- `"specialist"` - Specializes in specific treatments
- `"teaching"` - Connected to a medical school
- `"clinic"` - Small medical facility
- `"research"` - Research institution

**Backend Field:** `hospital_type`

**Where does it come from?**
Selected during registration.

**How is it used?**
- To categorize hospitals in searches
- To show appropriate features based on type
- For reporting and analytics

**In the UI:**
```tsx
<p>{profile.type.replace('_', ' ')}</p>
// "public" displays as: "Public Hospital"
```

---

#### **4. `code`**
```typescript
code: string
```

**What is it?**
A unique registration or identification code for the hospital.

**Example:** `"CH001"`, `"NHS-12345"`, `"HOS-LONDON-001"`

**Backend Field:** `registration_number`

**Where does it come from?**
- Assigned during government registration
- Created by the system during setup
- Must be unique across all hospitals

**How is it used?**
- Official identification
- Required for billing and insurance
- Used in legal and administrative documents

**In the UI:**
```tsx
<p className="font-mono">{profile.code}</p>
// Displays: "CH001" (in monospace font)
```

---

### **Contact Information Fields**

#### **5. `phone`**
```typescript
phone: string
```

**What is it?**
The main contact phone number for the hospital.

**Example:** `"+44 20 3608 3182"`, `"(555) 123-4567"`

**Backend Field:** `phone`

**Where does it come from?**
Entered during setup or updated in settings.

**How is it used?**
- Patients call for appointments
- Emergency contacts
- General inquiries

**In the UI:**
```tsx
<p>{profile.phone}</p>
// Displays: "+44 20 3608 3182"
```

**Important Note:**
Unlike the original design, we only have ONE phone number, not multiple. The backend model has:
```python
phone = models.CharField(max_length=20)  # Just one field
```

Not:
```python
phones = models.ManyToManyField(Phone)  # Multiple phones (we don't have this)
```

---

#### **6. `email`**
```typescript
email: string
```

**What is it?**
The main contact email address.

**Example:** `"info@cityhospital.com"`, `"contact@medical-center.org"`

**Backend Field:** `email`

**Where does it come from?**
Set during registration or updated later.

**How is it used?**
- For email correspondence
- Receiving patient inquiries
- System notifications

**In the UI:**
```tsx
<p className="break-all">{profile.email}</p>
// Displays: "info@cityhospital.com"
// break-all: Prevents long emails from breaking layout
```

---

#### **7. `website`**
```typescript
website: string
```

**What is it?**
The hospital's website URL.

**Example:** `"https://cityhospital.com"`, `"https://www.stmarys.org"`

**Backend Field:** `website`

**Where does it come from?**
Optional field entered during setup.

**How is it used?**
- Patients can visit for more information
- Links to booking systems
- Marketing and publicity

**In the UI:**
```tsx
<a href={profile.website} target="_blank" rel="noopener noreferrer">
  {profile.website}
</a>
// Displays as clickable link: "https://cityhospital.com"
```

**Security Note:**
`rel="noopener noreferrer"` prevents security issues when opening in new tab.

---

#### **8. `emergency_contact`**
```typescript
emergency_contact: string
```

**What is it?**
A dedicated emergency phone number, different from the main number.

**Example:** `"+44 20 3608 9999"`, `"911"`, `"999"`

**Backend Field:** `emergency_contact`

**Where does it come from?**
Configured during setup for urgent situations.

**How is it used?**
- For emergency situations
- Quick access for ambulances
- 24/7 urgent care line

**In the UI:**
```tsx
{profile.emergency_contact && (
  <div className="text-red-500">
    <Phone className="text-red-400" />
    {profile.emergency_contact}
    <span>Emergency Contact</span>
  </div>
)}
// Displays in red to indicate urgency
```

---

### **Location Fields**

#### **9. `address`**
```typescript
address: string
```

**What is it?**
The full street address of the hospital.

**Example:** `"123 Medical Drive, Paddington"`, `"2 Eastbourne Terrace"`

**Backend Field:** `address`

**Where does it come from?**
Entered during registration.

**How is it used?**
- For physical mail
- For patient directions
- For delivery services

**In the UI:**
```tsx
<p>{profile.address}</p>
// Displays: "123 Medical Drive, Paddington"
```

---

#### **10. `city`**
```typescript
city: string
```

**What is it?**
The city where the hospital is located.

**Example:** `"London"`, `"Manchester"`, `"New York"`

**Backend Field:** `city`

**How is it used?**
- Geographic filtering
- Regional statistics
- Local search results

---

#### **11. `state`**
```typescript
state: string
```

**What is it?**
State or province (optional, mainly for US/Canada).

**Example:** `"California"`, `"Ontario"`, `null` (for UK)

**Backend Field:** `state`

**How is it used?**
- For countries with states/provinces
- Not used in UK hospitals (usually null)

---

#### **12. `country`**
```typescript
country: string
```

**What is it?**
The country where the hospital is located.

**Example:** `"United Kingdom"`, `"United States"`, `"Nigeria"`

**Backend Field:** `country`

**How is it used?**
- International operations
- Legal jurisdiction
- Regional settings (currency, date format)

---

#### **13. `postal_code`**
```typescript
postal_code: string
```

**What is it?**
ZIP code or postal code.

**Example:** `"W1A 1AA"` (UK), `"10001"` (US)

**Backend Field:** `postal_code`

**How is it used?**
- Address validation
- Location-based services
- Delivery routing

---

#### **14 & 15. `latitude` & `longitude`**
```typescript
latitude: string | null
longitude: string | null
```

**What are they?**
Geographic coordinates for precise location.

**Example:**
- Latitude: `"51.5074"`
- Longitude: `"-0.1278"`

**Backend Fields:** `latitude`, `longitude`

**How are they used?**
- Map integration
- Distance calculations
- Navigation apps

**In the UI:**
Not directly shown, but could be used for a map widget in the future.

---

### **Contact Person Fields**

These are grouped into nested objects for better organization.

#### **16. `primary_contact`**
```typescript
primary_contact?: {
  name: string;
  title: string;
  phone: string;
  email: string;
}
```

**What is it?**
The main administrative contact person.

**Example:**
```typescript
{
  name: "Sarah Johnson",
  title: "Chief Administrator",
  phone: "+44 20 3608 3100",
  email: "s.johnson@cityhospital.com"
}
```

**Backend Fields:**
- `primary_contact_name`
- `primary_contact_title`
- `primary_contact_phone`
- `primary_contact_email`

**How is it created?**
```typescript
primary_contact: hospital.primary_contact_name ? {
  name: hospital.primary_contact_name,
  title: hospital.primary_contact_title || '',
  phone: hospital.primary_contact_phone || '',
  email: hospital.primary_contact_email || '',
} : undefined  // 👈 Only created if name exists!
```

**Why the `?` in the type?**
The `?` means "optional". Not all hospitals have this information filled in.

**How is it used in the UI?**
```tsx
{profile.primary_contact && (
  <div>
    <p>{profile.primary_contact.name}</p>
    <p>{profile.primary_contact.title}</p>
    <p>{profile.primary_contact.phone}</p>
    <p>{profile.primary_contact.email}</p>
  </div>
)}
// Only displays if primary_contact exists
```

---

#### **17. `administrative_contact`**

Similar to primary_contact but for administrative queries.

**Backend Fields:**
- `administrative_contact_name`
- `administrative_contact_title`
- `administrative_contact_phone`
- `administrative_contact_email`

---

#### **18. `medical_director`**
```typescript
medical_director?: {
  name: string;
  license: string;
  specialization: string;
  years_experience: number;
}
```

**What is it?**
The chief medical officer of the hospital.

**Example:**
```typescript
{
  name: "Dr. Michael Chen",
  license: "MDCN-45678",
  specialization: "Cardiology",
  years_experience: 15
}
```

**Backend Fields:**
- `medical_director_name`
- `medical_director_license`
- `medical_director_specialization`
- `medical_director_years_experience`

**In the UI:**
```tsx
{profile.medical_director && (
  <div>
    <p>{profile.medical_director.name}</p>
    <p>{profile.medical_director.specialization}</p>
    <p>License: {profile.medical_director.license}</p>
    <p>{profile.medical_director.years_experience} years experience</p>
  </div>
)}
```

---

### **Operational Fields**

#### **19. `bed_capacity`**
```typescript
bed_capacity: number
```

**What is it?**
Total number of beds in the hospital.

**Example:** `500`, `1000`, `50`

**Backend Field:** `bed_capacity`

**How is it used?**
- Capacity planning
- Patient admissions
- Emergency preparedness

**In the UI:**
```tsx
<div className="flex items-center justify-between">
  <Bed size={16} />
  <span>Bed Capacity</span>
  <span className="font-semibold">{profile.bed_capacity}</span>
</div>
// Displays: "Bed Capacity: 500"
```

---

#### **20. `emergency_unit`**
```typescript
emergency_unit: boolean
```

**What is it?**
Whether the hospital has an emergency department.

**Values:** `true` or `false`

**Backend Field:** `emergency_unit`

**How is it used?**
- To show if emergency services are available
- For ambulance routing
- For emergency care searches

**In the UI:**
```tsx
<span className={profile.emergency_unit ? 'bg-green-100' : 'bg-gray-100'}>
  {profile.emergency_unit ? 'Available' : 'Not Available'}
</span>
// Green badge if available, gray if not
```

---

#### **21. `icu_unit`**
```typescript
icu_unit: boolean
```

**What is it?**
Whether the hospital has an Intensive Care Unit.

**Values:** `true` or `false`

**Backend Field:** `icu_unit`

**Similar to emergency_unit in usage and display.**

---

#### **22. `is_verified`**
```typescript
is_verified: boolean
```

**What is it?**
Whether the hospital has been verified by administrators.

**Values:** `true` or `false`

**Backend Field:** `is_verified`

**How is it used?**
- Trust indicator for patients
- Access to certain features
- Public visibility

**In the UI:**
```tsx
{profile.is_verified && (
  <div className="bg-green-50 border-green-200">
    <Shield size={16} className="text-green-600" />
    <span className="text-green-700">Verified</span>
  </div>
)}
// Shows a green "Verified" badge
```

---

#### **23. `verification_date`**
```typescript
verification_date: string | null
```

**What is it?**
Date when the hospital was verified.

**Example:** `"2024-01-15"`, `null`

**Backend Field:** `verification_date`

**Format:** ISO date string (YYYY-MM-DD)

---

#### **24. `accreditation_status`**
```typescript
accreditation_status: boolean
```

**What is it?**
Whether the hospital is officially accredited.

**Values:** `true` or `false`

**Backend Field:** `accreditation_status`

**What's the difference from `is_verified`?**
- **is_verified**: Internal PHB verification (we checked them)
- **accreditation_status**: External official accreditation (government/medical board)

---

#### **25. `accreditation_expiry`**
```typescript
accreditation_expiry: string | null
```

**What is it?**
When the accreditation expires and needs renewal.

**Example:** `"2025-12-31"`, `null`

**Backend Field:** `accreditation_expiry`

---

### **Digital Infrastructure Fields**

These are grouped into a single object:

#### **26. `digital_infrastructure`**
```typescript
digital_infrastructure: {
  his: boolean;              // Hospital Information System
  emr: boolean;              // Electronic Medical Records
  telemedicine: boolean;     // Telemedicine Capabilities
  api_integration: boolean;  // API Integration Ready
  online_booking: boolean;   // Online Appointment Booking
  patient_portal: boolean;   // Patient Portal
  mobile_app: boolean;       // Mobile Application
}
```

**What is it?**
A collection of flags showing what digital systems the hospital has.

**Backend Fields:**
- `has_hospital_information_system`
- `has_electronic_medical_records`
- `has_telemedicine_capabilities`
- `has_api_integration`
- `has_online_appointment_booking`
- `has_patient_portal`
- `has_mobile_application`

**How is it mapped?**
```typescript
digital_infrastructure: {
  his: hospital.has_hospital_information_system,
  emr: hospital.has_electronic_medical_records,
  telemedicine: hospital.has_telemedicine_capabilities,
  api_integration: hospital.has_api_integration,
  online_booking: hospital.has_online_appointment_booking,
  patient_portal: hospital.has_patient_portal,
  mobile_app: hospital.has_mobile_application,
}
```

**Why shorten the names?**
- Backend uses descriptive names: `has_electronic_medical_records`
- Frontend uses abbreviations: `emr`
- Easier to work with in the frontend
- Everyone in healthcare knows what "EMR" means

**In the UI:**
```tsx
<div className="grid grid-cols-3 gap-3">
  {Object.entries({
    'HIS': profile.digital_infrastructure.his,
    'EMR': profile.digital_infrastructure.emr,
    'Telemedicine': profile.digital_infrastructure.telemedicine,
    'API Integration': profile.digital_infrastructure.api_integration,
    'Online Booking': profile.digital_infrastructure.online_booking,
    'Patient Portal': profile.digital_infrastructure.patient_portal,
    'Mobile App': profile.digital_infrastructure.mobile_app,
  }).map(([name, enabled]) => (
    <div key={name}>
      <div className={enabled ? 'bg-green-500' : 'bg-gray-300'} />
      <span className={enabled ? 'text-gray-700' : 'text-gray-400'}>
        {name}
      </span>
    </div>
  ))}
</div>
// Displays a grid with green dots for enabled features
```

---

## 🎨 The Data Mapping Magic

Let's deep dive into how we transform backend data to frontend format!

### **The Mapping Function Explained**

```typescript
function mapHospitalToProfile(hospital: HospitalApiResponse): OrganizationProfile {
  return {
    // ... mapping logic
  };
}
```

This function is like a translator. Let's see it translate different types of data:

### **Type 1: Direct Copy (No Change)**

Some fields are copied exactly as-is:

```typescript
// Backend has:
{
  id: 1,
  name: "City Hospital"
}

// Mapping:
{
  id: hospital.id,        // 1 → 1
  name: hospital.name,    // "City Hospital" → "City Hospital"
}

// Frontend gets:
{
  id: 1,
  name: "City Hospital"
}
```

**When to use:** When backend and frontend names match exactly.

---

### **Type 2: Simple Rename**

Some fields are renamed for clarity:

```typescript
// Backend has:
{
  hospital_type: "public",
  registration_number: "CH001"
}

// Mapping:
{
  type: hospital.hospital_type,              // Renamed!
  code: hospital.registration_number,        // Renamed!
}

// Frontend gets:
{
  type: "public",
  code: "CH001"
}
```

**When to use:** When you want a different, clearer name in the frontend.

---

### **Type 3: Null Safety with Default Values**

Some fields might be null, so we provide defaults:

```typescript
// Backend might have:
{
  phone: "+44 20 3608 3182"  // Or might be null!
}

// Mapping WITH null check:
{
  phone: hospital.phone || '',  // 👈 If null, use empty string
}

// If phone is "+44 20 3608 3182":
{
  phone: "+44 20 3608 3182"
}

// If phone is null:
{
  phone: ""
}
```

**Why do this?**
- Prevents errors when trying to display null values
- TypeScript expects a string, not null
- Empty string is safer than null for display

---

### **Type 4: Grouping Related Fields**

This is the most interesting transformation!

```typescript
// Backend has FLAT structure:
{
  primary_contact_name: "Sarah Johnson",
  primary_contact_title: "Chief Administrator",
  primary_contact_phone: "+44 20 3608 3100",
  primary_contact_email: "s.johnson@cityhospital.com"
}

// Mapping - Create NESTED object:
{
  primary_contact: hospital.primary_contact_name ? {  // 👈 Only if name exists!
    name: hospital.primary_contact_name,
    title: hospital.primary_contact_title || '',
    phone: hospital.primary_contact_phone || '',
    email: hospital.primary_contact_email || '',
  } : undefined  // 👈 Otherwise, don't create the object at all!
}

// Frontend gets NESTED structure:
{
  primary_contact: {
    name: "Sarah Johnson",
    title: "Chief Administrator",
    phone: "+44 20 3608 3100",
    email: "s.johnson@cityhospital.com"
  }
}

// OR if no primary contact exists:
{
  primary_contact: undefined
}
```

**Why do this?**
1. **Organization:** Related fields stay together
2. **Type Safety:** TypeScript knows all contact fields exist together
3. **Conditional Display:** Easy to check if contact exists
4. **Cleaner Code:** Easier to work with in React

**The Magic Line:**
```typescript
hospital.primary_contact_name ? { ... } : undefined
```

This checks:
- **If** `primary_contact_name` exists (not null, not empty)
- **Then** create the nested object
- **Otherwise** set primary_contact to undefined

---

### **Type 5: Transformation with Grouping**

The digital infrastructure is the most complex transformation:

```typescript
// Backend has MANY boolean fields:
{
  has_hospital_information_system: true,
  has_electronic_medical_records: true,
  has_telemedicine_capabilities: false,
  has_api_integration: true,
  has_online_appointment_booking: true,
  has_patient_portal: false,
  has_mobile_application: false
}

// Mapping - Create ONE nested object with SHORT names:
{
  digital_infrastructure: {
    his: hospital.has_hospital_information_system,     // Long name → Short name
    emr: hospital.has_electronic_medical_records,
    telemedicine: hospital.has_telemedicine_capabilities,
    api_integration: hospital.has_api_integration,
    online_booking: hospital.has_online_appointment_booking,
    patient_portal: hospital.has_patient_portal,
    mobile_app: hospital.has_mobile_application,
  }
}

// Frontend gets:
{
  digital_infrastructure: {
    his: true,
    emr: true,
    telemedicine: false,
    api_integration: true,
    online_booking: true,
    patient_portal: false,
    mobile_app: false
  }
}
```

**Benefits:**
1. **Organized:** All digital capabilities in one place
2. **Shorter Names:** `emr` instead of `has_electronic_medical_records`
3. **Easy to Loop:** Can use `Object.entries()` to display all features
4. **Extensible:** Easy to add new features

**Usage Example:**
```typescript
// Loop through all features
Object.entries(profile.digital_infrastructure).map(([name, enabled]) => (
  <div>
    <CheckIcon enabled={enabled} />
    <span>{name}</span>
  </div>
))
```

---

### **Complete Mapping Flow Diagram**

```
📥 BACKEND DATA (from API)
┌──────────────────────────────────────┐
│ {                                    │
│   id: 1,                            │
│   name: "City Hospital",            │
│   hospital_type: "public",          │
│   registration_number: "CH001",     │
│   phone: "+44 20 3608 3182",       │
│   email: "info@cityhospital.com",  │
│   primary_contact_name: "Sarah",    │
│   primary_contact_title: "Admin",   │
│   ...50 more fields                 │
│ }                                    │
└──────────────────────────────────────┘
            ↓
    🔄 MAPPING FUNCTION
┌──────────────────────────────────────┐
│  mapHospitalToProfile(hospital)      │
│                                      │
│  • Copy unchanged fields             │
│  • Rename for clarity                │
│  • Group related fields              │
│  • Handle null values                │
│  • Shorten long names                │
└──────────────────────────────────────┘
            ↓
📤 FRONTEND DATA (for UI)
┌──────────────────────────────────────┐
│ {                                    │
│   id: 1,                            │
│   name: "City Hospital",            │
│   type: "public",                   │
│   code: "CH001",                    │
│   phone: "+44 20 3608 3182",       │
│   email: "info@cityhospital.com",  │
│   primary_contact: {                │
│     name: "Sarah",                  │
│     title: "Admin",                 │
│     ...                             │
│   },                                │
│   digital_infrastructure: {         │
│     his: true,                      │
│     emr: true,                      │
│     ...                             │
│   }                                 │
│ }                                    │
└──────────────────────────────────────┘
```

---

## ❓ Common Questions & Answers

### **Q1: Why do we fetch the admin profile first, then the hospitals list?**

**A:** Great question! Here's why we need TWO API calls:

**Step 1: Get Admin Profile**
```typescript
// Call: GET /api/hospitals/admin/profile/
// Returns:
{
  id: 71,
  email: "admin@cityhospital.com",
  hospital: {
    id: 1,           // 👈 We get the hospital ID here
    name: "City Hospital",
    code: "CH001"
  }
}
```

**Why?** To find out WHICH hospital this admin belongs to.

**Step 2: Get Full Hospital Details**
```typescript
// Call: GET /api/hospitals/
// Returns:
{
  hospitals: [
    {
      id: 1,
      name: "City Hospital",
      address: "...",        // 👈 Full details here!
      phone: "...",
      email: "...",
      // ... 50+ more fields
    }
  ]
}
```

**Why?** The admin profile only has basic info (id, name, code). We need the FULL hospital profile with all 50+ fields!

**Alternative (doesn't exist yet):**
Ideally, we'd have a single endpoint like:
```
GET /api/hospitals/my-hospital/
```
That returns the full hospital for the logged-in admin. But since we don't have that endpoint yet, we use this two-step approach.

---

### **Q2: What if a field is missing or null?**

**A:** We handle this in multiple ways:

**Method 1: Default Values**
```typescript
phone: hospital.phone || ''
// If phone is null → use empty string ""
```

**Method 2: Optional Chaining**
```typescript
{profile.phone && <p>{profile.phone}</p>}
// Only display if phone exists
```

**Method 3: Conditional Objects**
```typescript
primary_contact: hospital.primary_contact_name ? { ... } : undefined
// Only create the object if the name exists
```

**Example Flow:**

```typescript
// Backend returns:
{
  primary_contact_name: null,
  primary_contact_title: null,
  primary_contact_phone: null,
  primary_contact_email: null
}

// Mapping checks:
primary_contact: hospital.primary_contact_name ? { ... } : undefined
//               ↑
//               null → Condition fails!

// Frontend gets:
{
  primary_contact: undefined
}

// UI renders:
{profile.primary_contact && (
  <div>Contact info</div>
)}
// ↑
// undefined is falsy → Doesn't render!
```

---

### **Q3: Why group fields like `primary_contact` into nested objects?**

**A:** For organization and type safety! Compare:

**Without Grouping (Bad):**
```typescript
interface Profile {
  primary_contact_name: string;
  primary_contact_title: string;
  primary_contact_phone: string;
  primary_contact_email: string;
  administrative_contact_name: string;
  administrative_contact_title: string;
  administrative_contact_phone: string;
  administrative_contact_email: string;
  // 😰 Hard to tell what belongs together!
}

// Using it:
<div>
  <p>{profile.primary_contact_name}</p>
  <p>{profile.primary_contact_title}</p>
  <p>{profile.primary_contact_phone}</p>
  <p>{profile.primary_contact_email}</p>
</div>
// 🤔 Is primary_contact_phone related to primary_contact_name?
```

**With Grouping (Good):**
```typescript
interface Profile {
  primary_contact?: {
    name: string;
    title: string;
    phone: string;
    email: string;
  };
  administrative_contact?: {
    name: string;
    title: string;
    phone: string;
    email: string;
  };
  // ✨ Crystal clear what belongs together!
}

// Using it:
{profile.primary_contact && (
  <div>
    <p>{profile.primary_contact.name}</p>
    <p>{profile.primary_contact.title}</p>
    <p>{profile.primary_contact.phone}</p>
    <p>{profile.primary_contact.email}</p>
  </div>
)}
// ✅ Clear relationship between all contact fields!
```

**Benefits:**
1. **Clarity:** Easy to see related fields
2. **Type Safety:** TypeScript ensures all fields exist together
3. **Null Checking:** One check for all fields
4. **Easier Refactoring:** Move all contact fields at once

---

### **Q4: What happens if the API call fails?**

**A:** Error handling flow:

```typescript
try {
  const data = await OrganizationProfileService.getProfile();
  setProfile(data);
  setError(null);  // Clear any previous errors
} catch (err) {
  console.error('Failed to fetch profile:', err);
  setError('Failed to load organization profile. Please try again.');
  setProfile(null);  // Clear profile data
} finally {
  setLoading(false);  // Always stop loading
}
```

**User sees:**
```
┌─────────────────────────────────────┐
│ ❌ Error                            │
│                                     │
│ Failed to load organization         │
│ profile. Please try again.          │
│                                     │
│  [Retry Button]                     │
└─────────────────────────────────────┘
```

**Possible Error Causes:**
1. **Network Error:** No internet connection
2. **Authentication Error:** Token expired or invalid
3. **Permission Error:** User is not a hospital admin
4. **Server Error:** Backend is down or crashed
5. **Data Error:** Hospital ID not found

---

### **Q5: How do I add a new field to the profile?**

**A:** Follow these steps:

**Step 1: Check if Backend Has It**
```python
# Look in: basebackend/api/models/medical/hospital.py
class Hospital(models.Model):
    # ... existing fields ...
    new_field = models.CharField(max_length=100)  # Your new field
```

**Step 2: Check Serializer Includes It**
```python
# Look in: basebackend/api/serializers.py
class HospitalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospital
        fields = [
            'id', 'name', 'phone', 'email',
            'new_field',  # 👈 Add here!
        ]
```

**Step 3: Add to Frontend Interface**
```typescript
// In: organizationProfileService.ts

// Add to backend interface
interface HospitalApiResponse {
  id: number;
  name: string;
  new_field: string;  // 👈 Add here!
}

// Add to frontend interface
export interface OrganizationProfile {
  id: number;
  name: string;
  newField: string;  // 👈 Add here (camelCase!)
}
```

**Step 4: Add to Mapping Function**
```typescript
function mapHospitalToProfile(hospital: HospitalApiResponse): OrganizationProfile {
  return {
    id: hospital.id,
    name: hospital.name,
    newField: hospital.new_field || '',  // 👈 Map here!
  };
}
```

**Step 5: Display in UI**
```tsx
// In: OrganizationProfilePage.tsx
<div>
  <p>New Field Label</p>
  <p>{profile.newField}</p>
</div>
```

**Done!** 🎉

---

### **Q6: Why use TypeScript interfaces?**

**A:** TypeScript catches errors before they happen!

**Without TypeScript (JavaScript):**
```javascript
// Typo in field name - No error until runtime!
<p>{profile.nme}</p>  // ❌ "nme" doesn't exist
// Page crashes when it tries to render
```

**With TypeScript:**
```typescript
interface OrganizationProfile {
  name: string;
  // ... other fields
}

<p>{profile.nme}</p>  // ❌ TypeScript Error: Property 'nme' does not exist
//             ^^^
// VS Code shows red squiggly line immediately!
```

**Benefits:**
1. **Catch Typos:** IDE shows errors immediately
2. **Autocomplete:** IDE suggests available fields
3. **Documentation:** Interface shows what data exists
4. **Refactoring:** Rename safely across entire codebase

---

## 🔧 How to Debug When Things Go Wrong

### **Problem 1: Profile Page Shows Loading Forever** 🔄

**Symptoms:**
- Spinner never stops
- No data displayed
- No error message

**How to Debug:**

**Step 1: Open Browser DevTools**
- Press F12
- Go to "Console" tab

**Step 2: Look for Errors**
```
❌ Failed to fetch admin profile: 401
❌ TypeError: Cannot read property 'id' of undefined
```

**Step 3: Check Network Tab**
- Go to "Network" tab
- Look for failed requests (red text)
- Click on failed request
- Check "Response" tab

**Common Causes & Solutions:**

| Error | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Not logged in or token expired | Log in again |
| 403 Forbidden | User is not a hospital admin | Contact administrator |
| 404 Not Found | Hospital ID doesn't exist | Check database |
| 500 Server Error | Backend crashed | Check backend logs |

---

### **Problem 2: Some Fields Are Missing** 🕳️

**Symptoms:**
- Profile loads
- But some fields don't display
- No error in console

**How to Debug:**

**Step 1: Check Backend Response**
```javascript
// In organizationProfileService.ts, add logging:
const hospitalsData = await hospitalsResponse.json();
console.log('🔍 Backend Response:', hospitalsData);  // 👈 Add this!

const hospital = hospitalsData.hospitals?.find(...);
console.log('🔍 Found Hospital:', hospital);  // 👈 And this!
```

**Step 2: Check Browser Console**
```javascript
🔍 Backend Response: {
  hospitals: [{
    id: 1,
    name: "City Hospital",
    phone: null,  // 👈 Ah! Phone is null!
    email: "info@hospital.com"
  }]
}
```

**Step 3: Check Database**
```sql
-- In your database tool
SELECT phone FROM api_hospital WHERE id = 1;
-- Result: NULL
```

**Solution:**
Field is not set in the database. Update it:
```sql
UPDATE api_hospital
SET phone = '+44 20 3608 3182'
WHERE id = 1;
```

---

### **Problem 3: TypeScript Errors After Changes** 🔴

**Symptoms:**
```
❌ Property 'xyz' does not exist on type 'OrganizationProfile'
❌ Type 'string | null' is not assignable to type 'string'
```

**How to Debug:**

**Step 1: Find the Error**
- VS Code shows red squiggly lines
- Hover over to see the error message

**Step 2: Check the Interface**
```typescript
interface OrganizationProfile {
  name: string;  // 👈 Check if field exists
  phone: string; // 👈 Check if type matches
}
```

**Step 3: Fix the Mismatch**

**Example:**
```typescript
// ❌ Error: Type 'string | null' is not assignable to type 'string'
phone: hospital.phone  // Backend might return null

// ✅ Fix: Add null check
phone: hospital.phone || ''  // Convert null to empty string
```

---

### **Problem 4: Mapping Doesn't Work** 🗺️

**Symptoms:**
- Data arrives from backend
- But frontend shows wrong values
- Or fields are undefined

**How to Debug:**

**Step 1: Log Before and After Mapping**
```typescript
function mapHospitalToProfile(hospital: HospitalApiResponse): OrganizationProfile {
  console.log('📥 BEFORE MAPPING:', hospital);

  const result = {
    id: hospital.id,
    name: hospital.name,
    // ... rest of mapping
  };

  console.log('📤 AFTER MAPPING:', result);
  return result;
}
```

**Step 2: Compare Console Output**
```javascript
📥 BEFORE MAPPING: {
  id: 1,
  name: "City Hospital",
  hospital_type: "public"  // 👈 Backend uses snake_case
}

📤 AFTER MAPPING: {
  id: 1,
  name: "City Hospital",
  type: undefined  // 👈 Oops! Wrong field name!
}
```

**Step 3: Fix the Mapping**
```typescript
// ❌ Wrong
type: hospital.type  // Doesn't exist!

// ✅ Correct
type: hospital.hospital_type  // Use backend field name
```

---

## 🎓 Practice Exercises

Try these exercises to test your understanding!

### **Exercise 1: Add License Number Field**

**Task:** Add a `license_number` field to show the hospital's medical license.

**Steps to complete:**

1. **Add to Backend Interface**
```typescript
interface HospitalApiResponse {
  // ... existing fields
  license_number: string | null;  // Add this
}
```

2. **Add to Frontend Interface**
```typescript
export interface OrganizationProfile {
  // ... existing fields
  licenseNumber: string;  // Add this
}
```

3. **Add Mapping**
```typescript
function mapHospitalToProfile(hospital: HospitalApiResponse): OrganizationProfile {
  return {
    // ... existing mappings
    licenseNumber: hospital.license_number || 'Not Available',
  };
}
```

4. **Display in UI**
```tsx
<div>
  <p className="text-sm text-gray-500">License Number</p>
  <p className="text-gray-800">{profile.licenseNumber}</p>
</div>
```

---

### **Exercise 2: Add Emergency Contact Person**

**Task:** Add an emergency contact person (similar to primary_contact).

**Hint:** The backend has these fields:
- `emergency_contact_person_name`
- `emergency_contact_person_phone`
- `emergency_contact_person_email`

**Try to:**
1. Add to interfaces
2. Create the mapping with grouping
3. Display in the UI (only if exists!)

<details>
<summary>Click to see solution</summary>

```typescript
// 1. Backend Interface
interface HospitalApiResponse {
  emergency_contact_person_name: string | null;
  emergency_contact_person_phone: string | null;
  emergency_contact_person_email: string | null;
}

// 2. Frontend Interface
export interface OrganizationProfile {
  emergency_contact_person?: {
    name: string;
    phone: string;
    email: string;
  };
}

// 3. Mapping
function mapHospitalToProfile(hospital: HospitalApiResponse): OrganizationProfile {
  return {
    // ... existing fields
    emergency_contact_person: hospital.emergency_contact_person_name ? {
      name: hospital.emergency_contact_person_name,
      phone: hospital.emergency_contact_person_phone || '',
      email: hospital.emergency_contact_person_email || '',
    } : undefined,
  };
}

// 4. UI
{profile.emergency_contact_person && (
  <div>
    <p className="font-semibold">Emergency Contact Person</p>
    <p>{profile.emergency_contact_person.name}</p>
    <p>{profile.emergency_contact_person.phone}</p>
    <p>{profile.emergency_contact_person.email}</p>
  </div>
)}
```

</details>

---

### **Exercise 3: Debug This Code**

**Task:** Find what's wrong with this code:

```typescript
interface OrganizationProfile {
  name: string;
  phone: string;
}

function mapHospitalToProfile(hospital: HospitalApiResponse): OrganizationProfile {
  return {
    name: hospital.hospitalName,
    phone: hospital.phone_number,
  };
}
```

**Questions:**
1. What will happen when this code runs?
2. Why will it fail?
3. How would you fix it?

<details>
<summary>Click to see answer</summary>

**Problems:**
1. `hospital.hospitalName` doesn't exist (should be `hospital.name`)
2. `hospital.phone_number` doesn't exist (should be `hospital.phone`)

**What happens:**
- Both fields will be `undefined`
- No error thrown (JavaScript just returns undefined)
- UI will show blank spaces

**Fix:**
```typescript
function mapHospitalToProfile(hospital: HospitalApiResponse): OrganizationProfile {
  return {
    name: hospital.name,     // ✅ Correct field name
    phone: hospital.phone,   // ✅ Correct field name
  };
}
```

**Lesson:** Always check the backend response to know the exact field names!

</details>

---

## 🎊 Conclusion

Congratulations! 🎉 You now understand:

✅ How data flows from database to user's screen
✅ How backend and frontend naming differs
✅ How to map backend data to frontend format
✅ How to handle missing or null data
✅ How to debug when things go wrong
✅ How to add new fields to the profile

### **Key Takeaways**

1. **Two API Calls:**
   - First: Get admin profile → Find hospital ID
   - Second: Get hospital details → Get full data

2. **Data Mapping:**
   - Backend uses `snake_case`
   - Frontend uses `camelCase`
   - Related fields are grouped into nested objects

3. **Null Safety:**
   - Always use `||` for default values
   - Use `?.` for optional fields
   - Use `field ? { ... } : undefined` for conditional objects

4. **TypeScript Benefits:**
   - Catches errors early
   - Provides autocomplete
   - Serves as documentation

### **Next Steps**

Want to learn more? Try these:

1. **Add More Fields**
   - Practice adding new fields to the profile
   - Try grouping related fields

2. **Add Editing**
   - Create a form to edit profile
   - Send PATCH request to update

3. **Add Images**
   - Implement logo upload
   - Display hospital images

4. **Explore Other Features**
   - Look at how appointments work
   - Study the departments data flow

---

**Remember:** The best way to learn is by doing! Try breaking things, fixing them, and experimenting with the code. Don't be afraid to add `console.log()` everywhere! 🐛🔍

**Happy Coding!** 💻✨
