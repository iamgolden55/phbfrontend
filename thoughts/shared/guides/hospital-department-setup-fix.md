# Hospital Department Setup - Quick Fix Guide

**Date**: 2025-11-11
**Issue**: General Hospital ASABA has zero departments → Appointment bookings blocked
**Solution**: Create standard departments using script or backend admin

---

## 🔴 The Problem

**Symptoms**:
- Patients try to book appointments
- Get error: "Could not find a suitable department for your symptoms"
- Booking completely blocked

**Root Cause**:
- Hospital created without any departments
- No database constraint requiring minimum departments
- Frontend appointment booking depends on departments existing

**Affected Hospital**:
- **Name**: General Hospital ASABA
- **Location**: Delta State, Nigeria
- **User**: publichealthbureau@hotmail.com

---

## ✅ Solution Options

### Option A: Run Django Management Script (Recommended)

**Location**: `/thoughts/shared/scripts/create_hospital_departments.py`

**Steps**:

1. **Navigate to backend directory**:
   ```bash
   cd /Users/new/Newphb/basebackend
   ```

2. **Activate virtual environment**:
   ```bash
   source venv/bin/activate
   ```

3. **Run script in Django shell**:
   ```bash
   python manage.py shell < /Users/new/phbfinal/phbfrontend/thoughts/shared/scripts/create_hospital_departments.py
   ```

   **OR** paste into Django shell:
   ```bash
   python manage.py shell
   ```
   Then copy-paste the entire script content and run:
   ```python
   create_hospital_departments()
   ```

4. **Verify results**:
   ```
   ✅ Created: 15 departments
   ✅ Total departments now: 15
   ✅ Hospital is ready for appointment bookings!
   ```

**What it creates**:

The script creates **15 standard Nigerian hospital departments**:

**Clinical Departments** (appointment-enabled):
1. General Medicine (critical fallback)
2. Emergency Medicine (24/7)
3. Cardiology
4. Orthopedics
5. Pediatrics
6. Obstetrics & Gynecology
7. Surgery
8. Neurology
9. ENT (Ear, Nose, Throat)
10. Pulmonology
11. Gastroenterology
12. Urology

**Support Departments**:
13. Radiology
14. Laboratory
15. Pharmacy

---

### Option B: Manual Creation via Admin Panel

**Not Yet Implemented** - Requires department setup wizard (pending)

Current organization admin panel at `/organization/wards` allows manual department creation but has no guided workflow.

**Steps** (when available):
1. Log in as hospital admin: `publichealthbureau@hotmail.com`
2. Navigate to `/organization/wards`
3. Click "Add Department" for each required department
4. Minimum required: **General Medicine**

---

### Option C: Direct Database Query (Emergency Only)

**⚠️ Use only if script fails**

```sql
-- Connect to PostgreSQL database
psql -U your_db_user -d phb_database

-- Get hospital ID
SELECT id, name, state FROM api_hospital WHERE name LIKE '%ASABA%';

-- Create General Medicine department (critical)
INSERT INTO api_department (
    hospital_id,
    name,
    code,
    description,
    is_clinical,
    is_available_for_appointments,
    is_active,
    created_at,
    updated_at
) VALUES (
    123,  -- Replace with actual hospital ID
    'General Medicine',
    'GEN',
    'Primary care and general medical conditions',
    true,
    true,
    true,
    NOW(),
    NOW()
);

-- Verify
SELECT name, code FROM api_department WHERE hospital_id = 123;
```

---

## 🎯 Post-Fix Verification

### Frontend Verification

1. **Open frontend in browser**:
   ```bash
   cd /Users/new/phbfinal/phbfrontend
   bun run dev
   ```

2. **Navigate to**: http://localhost:5173/account/book-appointment

3. **Expected behavior**:
   - Departments load successfully (no error on page load)
   - Select symptoms from body map
   - Select date and time
   - Click "Confirm & Book Appointment"
   - Should proceed to payment (not error)

### Backend API Verification

**Test departments endpoint**:
```bash
# Replace TOKEN with actual auth token
TOKEN="your_jwt_token_here"

curl -s 'http://localhost:8000/api/departments/' \
  -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
```

**Expected response**:
```json
{
  "status": "success",
  "departments": [
    {
      "id": 1,
      "name": "General Medicine",
      "code": "GEN",
      "description": "Primary care and general medical conditions"
    },
    {
      "id": 2,
      "name": "Emergency Medicine",
      "code": "ER",
      "description": "Emergency and acute care services"
    },
    // ... 13 more departments
  ]
}
```

---

## 📋 Frontend Error Messages (New)

After fixing, users will see **better error messages** if departments are missing:

### Error 1: No Departments at All
**Old**: "Could not determine appropriate department. Please try again."

**New**:
```
This hospital has not configured any departments yet.
Appointment bookings are currently unavailable.
Please contact hospital administration or try a different hospital.
```

### Error 2: No Matching Department
**Old**: "Could not determine appropriate department. Please try again."

**New**:
```
Could not find a suitable department for your symptoms at this hospital.
This may be because the hospital does not have the required specialist departments configured.
Please try selecting different symptoms or contact the hospital directly.
```

**Files Changed**:
- `/src/features/health/BookAppointment.tsx:363-367` (no departments error)
- `/src/features/health/BookAppointment.tsx:762-766` (no match error)

---

## 🔮 Future Improvements (After ML Learning)

These fixes are **temporary** until ML-based routing is implemented:

### Phase 1: Backend API Architecture (Next 2 weeks)
- **Move routing to backend**: Department suggestion API
- **Severity assessment**: Map symptoms to care levels
- **Flexible matching**: Synonym support and fuzzy matching

**Benefits**:
- Clean separation frontend/backend
- Easy ML integration later
- Hospital-specific customization

### Phase 2: ML Integration (After learning ML Parts 6-9)
- **ML-based department prediction**: Uses triage model from ML guides
- **Confidence scoring**: Fallback to rules when ML uncertain
- **A/B testing**: Compare ML vs rules performance

**ML Integration Point** (from ML Part 7):
```python
# Backend: api/views/appointment_triage_views.py
from ml.prediction_service import prediction_service

@api_view(['POST'])
def suggest_department(request):
    symptoms = request.data.get('symptoms', [])

    # Use ML model (trained in Parts 2-6, deployed in Part 7)
    ml_result = prediction_service.predict({
        'symptoms_data': symptoms,
        'urgency': request.data.get('urgency'),
        'patient_age': request.data.get('patient_age'),
    })

    # Map ML urgency to department
    department = map_urgency_to_department(
        ml_result['prediction']  # 'routine'/'soon'/'urgent'/'emergency'
    )

    return Response({
        'department_id': department.id,
        'confidence': ml_result['confidence'],
        'method': 'ml'
    })
```

### Phase 3: NHS-Style Triage (1-2 months)
- **Low severity** (60%) → Online consultation (no department needed)
- **Medium severity** (30%) → General Medicine
- **High severity** (8%) → Specialist departments
- **Critical** (2%) → Emergency

**Benefits**:
- Reduces specialist department dependency 100% → 10%
- Faster patient access (online same-day)
- Scales better (fewer in-person appointments)

---

## 📚 Related Documentation

**Research Documents**:
- `thoughts/shared/research/2025-11-11-appointment-department-routing-system.md` - Full analysis of department routing
- `thoughts/shared/research/2025-11-08-appointment-prescription-pharmacy-flow.md` - Complete patient journey

**ML Implementation Guides** (for future backend API):
- `thoughts/shared/guides/ml-triage-system-index.md` - ML guide index
- `thoughts/shared/guides/ml-triage-part7-phase6-deployment.md` - Django ML deployment
- `thoughts/shared/guides/ml-triage-part8-phase7-monitoring.md` - ML monitoring

**Scripts**:
- `thoughts/shared/scripts/create_hospital_departments.py` - Department creation script

---

## ✅ Checklist

**Immediate Fixes** (Completed):
- [x] Create department creation script
- [x] Add better error messages in frontend
- [x] Document setup process

**Next Steps** (After ML Learning):
- [ ] Build backend department suggestion API
- [ ] Build severity assessment API
- [ ] Integrate ML model into routing
- [ ] Implement A/B testing (ML vs rules)
- [ ] Add department setup wizard for new hospitals

---

## 🆘 Troubleshooting

### Issue: Script fails with "Hospital not found"

**Solution**: Check hospital name spelling
```python
# In Django shell:
from api.models import Hospital
Hospital.objects.filter(name__icontains='asaba').values('id', 'name', 'state')
```

### Issue: Departments created but appointments still fail

**Solution**: Check department IDs are being returned by API
```bash
curl -s 'http://localhost:8000/api/departments/' -H "Authorization: Bearer $TOKEN"
```

### Issue: "General Medicine" not recognized as fallback

**Solution**: Check exact name match (case-insensitive but spelling matters)
```python
# Should be exactly: "General Medicine"
# NOT: "general medicine" ❌
# NOT: "Internal Medicine" ❌
# NOT: "General Med" ❌
```

---

**Status**: ✅ Immediate fixes complete
**Next**: Continue learning ML (Parts 6-9), then build backend APIs
**Timeline**: Backend APIs ready in 1-2 weeks after ML learning complete
