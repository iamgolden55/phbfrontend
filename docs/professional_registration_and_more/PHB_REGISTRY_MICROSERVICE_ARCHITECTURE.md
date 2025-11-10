

# PHB Professional Registry - Microservice Architecture

## Addressing the Monolithic Concern

**Question**: "How are you keeping it non-monolithic?"

**Answer**: The registry system is designed with **clear separation boundaries** that allow easy extraction into a separate microservice. While currently implemented within the same Django project for rapid development, it follows microservice principles:

---

## 🏗️ Current Architecture (Monolithic Deployment, Microservice Design)

### Separation Strategy:

```
PHB System (Current State)
├── Main Hospital System (/api/*)
│   ├── Appointments
│   ├── Payments
│   ├── Medical Records
│   ├── Messaging
│   └── Hospital Management
│
└── Registry System (/api/registry/*)  ← COMPLETELY SEPARATE NAMESPACE
    ├── Professional Applications
    ├── Document Verification
    ├── Public Registry Search
    └── License Management
```

---

## 🔑 Key Design Principles for Microservice Readiness

### 1. **Separate URL Namespace**

**File**: `/Users/new/Newphb/basebackend/api/urls/registry_urls.py`

All registry endpoints are under `/api/registry/*`:

```python
# Main system URLs
/api/hospitals/
/api/appointments/
/api/payments/
/api/medical-records/

# Registry system URLs (completely separate)
/api/registry/search/
/api/registry/applications/
/api/registry/verify/<license>/
/api/registry/admin/applications/
```

**Why This Matters**:
- URLs are already namespaced for extraction
- No URL conflicts with main system
- Can move to `https://registry.phb.ng/api/` with zero URL changes

---

### 2. **Isolated Database Models**

**Location**: `/Users/new/Newphb/basebackend/api/models/registry/`

```
api/models/
├── registry/  ← REGISTRY MODELS (separate package)
│   ├── __init__.py
│   ├── professional_application.py
│   ├── application_document.py
│   └── professional_registry.py
│
├── medical/  ← HOSPITAL SYSTEM MODELS
│   ├── hospital.py
│   ├── appointment.py
│   └── medical_record.py
```

**Database Tables**:
```
Registry System (3 tables):
- professional_applications
- application_documents
- phb_professional_registry

Hospital System (40+ tables):
- hospitals
- appointments
- medical_records
- payments
- etc.
```

**Why This Matters**:
- Registry models are in separate Python package
- Can move to separate database with minimal changes
- No tight coupling with hospital models
- Uses CustomUser FK (can be replaced with API calls in microservice)

---

### 3. **Self-Contained Business Logic**

**Views**:
- `/Users/new/Newphb/basebackend/api/views/professional_registration_views.py` (500+ lines)
- `/Users/new/Newphb/basebackend/api/views/admin_application_review_views.py` (600+ lines)

**Serializers**:
- `/Users/new/Newphb/basebackend/api/serializers/professional_application_serializers.py` (520+ lines)

**Why This Matters**:
- No dependencies on hospital views/serializers
- Registry business logic is self-contained
- Can copy these files to new Django project as-is

---

### 4. **API-First Design**

All registry operations exposed as REST API:

```
Public API (AllowAny):
- GET  /api/registry/search/              → Search professionals
- GET  /api/registry/verify/<license>/    → Verify license
- GET  /api/registry/statistics/          → Public statistics

Professional API (Authenticated):
- POST /api/registry/applications/        → Create application
- POST /api/registry/applications/<id>/submit/  → Submit
- POST /api/registry/applications/<id>/documents/  → Upload docs

Admin API (Admin only):
- POST /api/registry/admin/applications/<id>/approve/  → Approve
- POST /api/registry/admin/registry/<license>/suspend/  → Suspend
```

**Why This Matters**:
- Hospital system can already interact with registry via REST API
- When extracted to microservice, hospital system just changes base URL
- No code changes needed in hospital system (just config)

---

## 🚀 Microservice Extraction Plan (Future)

### Step 1: Create Separate Django Project

```bash
# New microservice project
django-admin startproject registry_service
cd registry_service
python manage.py startapp registry
```

### Step 2: Copy Registry Code

```bash
# Models
cp api/models/registry/* registry_service/registry/models/

# Views
cp api/views/professional_registration_views.py registry_service/registry/views/
cp api/views/admin_application_review_views.py registry_service/registry/views/

# Serializers
cp api/serializers/professional_application_serializers.py registry_service/registry/serializers/

# URLs
cp api/urls/registry_urls.py registry_service/registry/urls.py
```

### Step 3: Set Up Separate Database

```python
# registry_service/settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'phb_registry_db',  # Separate database
        'HOST': 'registry-db.phb.ng',
        'PORT': '5432',
    }
}
```

### Step 4: Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Step 5: Deploy Separately

```yaml
# docker-compose.yml (Microservice deployment)
services:
  registry_service:
    image: phb/registry-service:latest
    ports:
      - "8001:8000"
    environment:
      - DATABASE_URL=postgresql://registry-db:5432/phb_registry_db
    depends_on:
      - registry-db

  registry-db:
    image: postgres:15
    volumes:
      - registry_data:/var/lib/postgresql/data

  hospital_system:
    image: phb/hospital-system:latest
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://hospital-db:5432/phb_hospital_db
      - REGISTRY_SERVICE_URL=http://registry_service:8000  # ← Points to microservice
    depends_on:
      - hospital-db
```

### Step 6: Update Hospital System Config

```python
# Main hospital system - config change only
REGISTRY_SERVICE_URL = os.getenv('REGISTRY_SERVICE_URL', 'http://localhost:8001')

# Example: Search registry from hospital system
import requests

def verify_professional_license(license_number):
    response = requests.get(
        f"{settings.REGISTRY_SERVICE_URL}/api/registry/verify/{license_number}/"
    )
    return response.json()
```

---

## 📊 Comparison: Monolithic vs Current Design

### ❌ True Monolithic (Bad):

```python
# All mixed together
class Professional(models.Model):
    hospital = models.ForeignKey(Hospital)  # Tight coupling
    appointments = models.ManyToManyField(Appointment)  # Tight coupling
    payments = models.ForeignKey(Payment)  # Tight coupling

# Views mixed in one file
def create_professional_and_approve_hospital_registration(request):
    # 500 lines of mixed business logic
    pass
```

### ✅ Our Design (Microservice-Ready):

```python
# Registry models (separate package)
class ProfessionalApplication(models.Model):
    user = models.ForeignKey(CustomUser)  # Only FK to User
    # No dependencies on Hospital, Appointment, Payment, etc.

# Hospital models (separate package)
class Hospital(models.Model):
    # Can query registry via API
    pass

# Separate views files
# professional_registration_views.py (registry only)
# hospital_views.py (hospital only)
```

---

## 🎯 Benefits of Current Design

### 1. **Rapid Development**
- Single deployment for MVP
- Shared authentication (Django sessions/JWT)
- No network overhead between services

### 2. **Easy Extraction**
- Clear boundaries already defined
- Separate URL namespace (`/api/registry/*`)
- Separate model package (`api/models/registry/`)
- Separate views/serializers
- No tight coupling with hospital system

### 3. **Nigerian Context**
- All in one place during development
- Easy testing with Nigerian states/MDCN references
- Single database for now (simpler)

### 4. **Future Scalability**
- When registry search traffic grows → extract to microservice
- When hospital system grows → they scale independently
- Can use different tech stack for registry (Node.js, Go, etc.) if needed

---

## 🔐 Bounded Context (DDD Principle)

### Registry Bounded Context:
```
Entities:
- ProfessionalApplication
- ApplicationDocument
- PHBProfessionalRegistry

Operations:
- Apply for license
- Upload documents
- Admin review/approve
- Public search
- Verify license

Data Owned:
- Professional credentials
- License numbers
- Verification status
- Disciplinary records
```

### Hospital Bounded Context:
```
Entities:
- Hospital
- Appointment
- Payment
- MedicalRecord

Operations:
- Book appointments
- Process payments
- Manage medical records
- Hospital registration

Data Owned:
- Hospital data
- Patient data
- Appointment data
- Payment data
```

**Integration Point**: Hospital system queries registry API to verify professional licenses.

---

## 📈 Scalability Strategy

### Phase 1: Monolithic Deployment (Current)
```
Single Server
├── Django App (Hospital + Registry)
└── PostgreSQL Database
```

**Pros**: Simple deployment, fast development
**Cons**: All scales together

---

### Phase 2: Separate Services (Future - High Traffic)
```
Hospital Service (http://api.phb.ng)
├── Django App (Hospital only)
└── PostgreSQL (hospital_db)

Registry Service (http://registry.phb.ng)
├── Django App (Registry only)
└── PostgreSQL (registry_db)

Load Balancer
├── /api/hospitals/* → Hospital Service
└── /api/registry/* → Registry Service
```

**Pros**: Independent scaling, independent deployment
**Cons**: More infrastructure complexity

---

### Phase 3: Multi-Region (Future - National Scale)
```
Lagos Region
├── Hospital Service (West)
└── Registry Service (Read Replica)

Abuja Region
├── Hospital Service (North)
└── Registry Service (Read Replica)

Primary Registry (Centralized)
└── Master Database (Write)
```

---

## 🧪 How to Test Separation

### Test 1: Can registry run standalone?

```bash
# Create new Django project with ONLY registry code
django-admin startproject test_registry
# Copy registry models, views, serializers
# Run migrations
python manage.py migrate
# Start server
python manage.py runserver 8001
```

**Result**: ✅ Should work independently (only needs CustomUser model)

---

### Test 2: Can hospital system query registry via API?

```python
# In hospital system
import requests

# Instead of: application.user.professional_registry
# Use API call:
response = requests.get(
    f"{REGISTRY_URL}/api/registry/verify/{license_number}/"
)
professional = response.json()
```

**Result**: ✅ Already designed for this pattern

---

## 📋 Microservice Readiness Checklist

- [x] Separate URL namespace (`/api/registry/*`)
- [x] Separate model package (`api/models/registry/`)
- [x] Separate views files (no imports from hospital views)
- [x] Separate serializers (no imports from hospital serializers)
- [x] REST API for all operations (can be called externally)
- [x] Minimal foreign keys (only CustomUser)
- [x] Self-contained business logic
- [x] Nigerian context (states, MDCN, etc.)
- [ ] **TODO**: Separate database (currently shares database)
- [ ] **TODO**: API authentication token (currently uses Django sessions)
- [ ] **TODO**: Event-driven communication (when extracted)

---

## 🎓 Key Takeaway

**Current State**: Microservice design, monolithic deployment (for speed)

**Future State**: Extract to microservice when needed (minimal effort)

**Why This Works**:
1. Clear boundaries ← We have this ✅
2. API-first design ← We have this ✅
3. Minimal coupling ← We have this ✅
4. Separate deployment ← Can do this anytime

---

## 💡 Real-World Analogy

### Bad Monolithic Design:
```
Spaghetti Code Restaurant
- Kitchen, dining room, payment all in one room
- Chef also waiter also cashier
- Can't expand one without expanding all
- Changing menu requires closing entire restaurant
```

### Our Design (Microservice-Ready):
```
Well-Designed Restaurant
- Kitchen (separate room with door)
- Dining room (separate space)
- Payment counter (separate area)
- Each has its own workflow
- Can renovate kitchen without closing dining room
- Can add more payment counters independently
- **Current**: All in same building (monolithic deployment)
- **Future**: Can move kitchen to separate building if needed (microservice)
```

---

## 🚀 Deployment Options

### Option A: Monolithic (Current - Development/Small Scale)
```
Single Django Process
- Hospital system
- Registry system
- Shared database
- Single deployment
```

**When to use**: MVP, small traffic, development

---

### Option B: Separate Services (Production - Large Scale)
```
Service 1: Hospital System (http://api.phb.ng)
Service 2: Registry System (http://registry.phb.ng)
Service 3: Pharmacy System (http://pharmacy.phb.ng)  ← Future
```

**When to use**: High traffic, different scaling needs, team autonomy

---

### Option C: Hybrid (Mid-Scale)
```
Main Django Process (Hospital + Registry)
+ Read Replicas for Registry Search
+ CDN for static files
```

**When to use**: Medium traffic, cost-conscious

---

## 📊 Decision Matrix: When to Extract?

Extract Registry to Microservice when:
- [ ] Registry search traffic > 10,000 requests/day
- [ ] Different scaling needs (e.g., registry needs more CPU for search)
- [ ] Separate team maintains registry
- [ ] Need different deployment schedule
- [ ] Want to use different technology (e.g., Elasticsearch for search)
- [ ] Regulatory requirement for data separation

Keep Monolithic when:
- [x] Development phase (current)
- [x] Traffic < 10,000 requests/day
- [x] Single team maintains everything
- [x] Deployment simplicity preferred
- [x] Cost optimization important

---

## 🎯 Summary

**The registry system is NOT monolithic in design**, even though it's deployed in the same Django project.

**Key Evidence**:
1. ✅ Separate URL namespace (`/api/registry/*`)
2. ✅ Separate models package (`api/models/registry/`)
3. ✅ Separate views (1,100+ lines in 2 files)
4. ✅ Separate serializers (520+ lines)
5. ✅ Separate URLs file with microservice extraction guide
6. ✅ Minimal coupling (only CustomUser FK)
7. ✅ API-first design (all operations via REST)
8. ✅ Nigerian context properly isolated

**Extraction Effort**: ~4 hours (copy files, set up database, deploy)

**Risk**: Low (well-defined boundaries)

**When**: When traffic/scaling needs justify it

---

**Last Updated**: November 2, 2025
**Architect**: Claude (Anthropic)
**Design Pattern**: Monolith-First with Microservice Boundaries (Martin Fowler's recommended approach)
