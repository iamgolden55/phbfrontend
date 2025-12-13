# Test Doctor Credentials for General Hospital Asaba

## Doctor Registration Complete ✅

A test doctor has been successfully registered in the PHB system for General Hospital Asaba to enable prescription workflow testing.

---

## Doctor Details

### Personal Information
- **Name**: Dr. Emmanuel Chukwuma Okonkwo
- **Email**: `dr.emmanuel.okonkwo@phb-test.com`
- **Password**: `TestDoctor123!`
- **Phone**: +234 801 234 5678
- **Date of Birth**: May 15, 1985

### Professional Information
- **Role**: Doctor (Internal Medicine)
- **Specialization**: Internal Medicine
- **Years of Experience**: 14 years
- **Education**: MBBS, University of Lagos (2010)
- **Additional Qualifications**:
  - Fellowship in Internal Medicine (FMCPaed) - 2015
  - Certificate in Emergency Medicine - 2018

### Registration Details
- **MDCN Registration**: MDCN/R/2024/12345
- **PHB License Number**: PHB-DOC-2025-00082
- **License Status**: Active
- **License Expiry**: November 11, 2026

### Hospital Affiliation
- **Hospital**: New General Central Hospital GRA Asaba
- **Hospital ID**: 27
- **Position**: Consultant Physician
- **Department**: Internal Medicine
- **Practice Address**: New General Central Hospital GRA Asaba, Delta State

---

## Login Instructions

### For Professional Portal

1. **Navigate to Professional Login**:
   - URL: `http://localhost:5173/professional/login`
   - Or click "Professional Login" from the main navigation

2. **Enter Credentials**:
   ```
   Email: dr.emmanuel.okonkwo@phb-test.com
   Password: TestDoctor123!
   ```

3. **OTP/2FA**:
   - ✅ **OTP is DISABLED** for this test account
   - No OTP code required during login
   - Direct access after entering email and password

4. **Access Features**:
   - Professional Dashboard
   - Appointments Management
   - Prescription Management
   - Patient Records
   - Practice Page

---

## Testing Prescription Workflow

Now that the doctor is registered, you can test the prescription workflow:

### Step 1: Patient Appointment Booking
1. Login as a regular patient
2. Book an appointment with Dr. Emmanuel Okonkwo at General Hospital Asaba
3. Complete the appointment

### Step 2: Doctor Creates Prescription
1. Login as the doctor (using credentials above)
2. Navigate to Appointments
3. View patient appointment
4. Create prescription for the patient:
   - Select medications
   - Add dosage instructions
   - Add notes
   - Submit prescription

### Step 3: Patient Views Prescription
1. Login as the patient
2. Navigate to Appointments or Prescriptions
3. View the prescription created by Dr. Okonkwo

### Step 4: Pharmacy Nomination
1. Patient selects/nominates their preferred pharmacy
2. Prescription is sent to the nominated pharmacy

### Step 5: Pharmacy Fulfillment
1. Pharmacy receives prescription request
2. Pharmacy prepares medication
3. Patient collects medication from pharmacy

---

## Database Verification

To verify the doctor in the database:

```bash
cd /Users/new/Newphb/basebackend
source venv/bin/activate
python manage.py shell
```

```python
from django.contrib.auth import get_user_model
from api.models import Hospital
from api.models.registry import ProfessionalApplication, PHBProfessionalRegistry

User = get_user_model()

# Get doctor
doctor = User.objects.get(email='dr.emmanuel.okonkwo@phb-test.com')
print(f'Name: Dr. {doctor.first_name} {doctor.last_name}')
print(f'Hospital: {doctor.hospital.name}')
print(f'Role: {doctor.role}')

# Get professional application
app = ProfessionalApplication.objects.get(user=doctor)
print(f'Application Status: {app.status}')
print(f'Registration: {app.home_registration_number}')

# Get registry entry
registry = PHBProfessionalRegistry.objects.get(user=doctor)
print(f'License: {registry.phb_license_number}')
print(f'Status: {registry.license_status}')
```

---

## API Testing

### Test Professional Login

```bash
curl -X POST http://127.0.0.1:8000/api/professional/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "dr.emmanuel.okonkwo@phb-test.com",
    "password": "TestDoctor123!"
  }'
```

### Verify Professional in Registry

```bash
curl -X GET "http://127.0.0.1:8000/api/registry/verify/PHB-DOC-2025-00082/"
```

### Search for Doctor

```bash
curl -X GET "http://127.0.0.1:8000/api/registry/search/?professional_type=doctor&city=Asaba"
```

---

## Next Steps

1. ✅ **Doctor Registration** - Complete
2. ✅ **Hospital Affiliation** - Complete
3. ✅ **Professional Registry Entry** - Complete
4. 🔄 **Test Prescription Workflow**:
   - Create test patient account
   - Book appointment with Dr. Okonkwo
   - Complete appointment
   - Doctor creates prescription
   - Patient nominates pharmacy
   - Pharmacy receives and fulfills prescription

---

## Troubleshooting

### Cannot Login
- Verify email: `dr.emmanuel.okonkwo@phb-test.com`
- Verify password: `TestDoctor123!`
- Check that professional login endpoint is correct
- Verify user is active: `is_active=True`
- **OTP is disabled** - no code should be required

### Doctor Not Showing for Hospital
- Verify `doctor.hospital.id == 27`
- Check hospital name matches "New General Central Hospital GRA Asaba"
- Ensure role is set to 'doctor'

### Prescription Creation Fails
- Verify doctor is approved in professional registry
- Check that appointment exists and is completed
- Ensure patient has nominated a pharmacy
- Verify prescription permissions for doctor role

---

## Additional Test Accounts Needed

To fully test the prescription workflow, you may also need:

1. **Test Patient Account**
   - Can book appointments
   - Can view prescriptions
   - Can nominate pharmacy

2. **Test Pharmacy Account**
   - Can receive prescription requests
   - Can mark prescriptions as fulfilled
   - Located near General Hospital Asaba

3. **Hospital Admin Account** (if needed)
   - Can manage doctors
   - Can view hospital appointments

---

## File Location

This document is saved at:
```
/Users/new/phbfinal/phbfrontend/TEST_DOCTOR_CREDENTIALS.md
```

Doctor registration script location:
```
/Users/new/Newphb/basebackend/register_test_doctor.py
```

---

**Created**: November 11, 2025
**Purpose**: Testing prescription workflow at General Hospital Asaba
**Status**: Doctor successfully registered and ready for testing
