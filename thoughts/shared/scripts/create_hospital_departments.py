#!/usr/bin/env python3
"""
Django Management Command: Create Standard Departments for Hospital

Usage:
    python manage.py shell < create_hospital_departments.py

OR copy-paste into Django shell:
    python manage.py shell

Purpose:
    Creates standard Nigerian hospital departments for hospitals that have none.
    Specifically fixes General Hospital ASABA (Delta State) issue where zero departments
    were configured, blocking all appointment bookings.

Reference:
    Based on research in thoughts/shared/research/2025-11-11-appointment-department-routing-system.md
"""

# ==============================================================================
# CONFIGURATION
# ==============================================================================

# Target hospital (change as needed)
HOSPITAL_NAME = "General Hospital ASABA"  # or use hospital ID
# HOSPITAL_ID = 123  # Uncomment to use ID instead

# Standard Nigerian Hospital Departments
# These match the frontend body-part mapping in BookAppointment.tsx:193-210
STANDARD_DEPARTMENTS = [
    {
        "name": "General Medicine",
        "code": "GEN",
        "description": "Primary care and general medical conditions",
        "is_clinical": True,
        "is_available_for_appointments": True,
        "requires_referral": False,
        "is_24_hours": True,
    },
    {
        "name": "Emergency Medicine",
        "code": "ER",
        "description": "Emergency and acute care services",
        "is_clinical": True,
        "is_available_for_appointments": True,
        "requires_referral": False,
        "is_24_hours": True,
    },
    {
        "name": "Cardiology",
        "code": "CARD",
        "description": "Heart and cardiovascular conditions",
        "is_clinical": True,
        "is_available_for_appointments": True,
        "requires_referral": True,
        "is_24_hours": False,
    },
    {
        "name": "Orthopedics",
        "code": "ORTHO",
        "description": "Bone, joint, and musculoskeletal conditions",
        "is_clinical": True,
        "is_available_for_appointments": True,
        "requires_referral": False,
        "is_24_hours": False,
    },
    {
        "name": "Pediatrics",
        "code": "PEDS",
        "description": "Children's health and development",
        "is_clinical": True,
        "is_available_for_appointments": True,
        "requires_referral": False,
        "is_24_hours": False,
    },
    {
        "name": "Obstetrics & Gynecology",
        "code": "OBGYN",
        "description": "Women's reproductive health and maternity care",
        "is_clinical": True,
        "is_available_for_appointments": True,
        "requires_referral": False,
        "is_24_hours": True,
    },
    {
        "name": "Surgery",
        "code": "SURG",
        "description": "General surgical procedures",
        "is_clinical": True,
        "is_available_for_appointments": True,
        "requires_referral": True,
        "is_24_hours": True,
    },
    {
        "name": "Neurology",
        "code": "NEURO",
        "description": "Brain, spine, and nervous system conditions",
        "is_clinical": True,
        "is_available_for_appointments": True,
        "requires_referral": True,
        "is_24_hours": False,
    },
    {
        "name": "ENT",
        "code": "ENT",
        "description": "Ear, Nose, and Throat conditions",
        "is_clinical": True,
        "is_available_for_appointments": True,
        "requires_referral": False,
        "is_24_hours": False,
    },
    {
        "name": "Pulmonology",
        "code": "PULM",
        "description": "Respiratory and lung conditions",
        "is_clinical": True,
        "is_available_for_appointments": True,
        "requires_referral": True,
        "is_24_hours": False,
    },
    {
        "name": "Gastroenterology",
        "code": "GASTRO",
        "description": "Digestive system and gastrointestinal conditions",
        "is_clinical": True,
        "is_available_for_appointments": True,
        "requires_referral": True,
        "is_24_hours": False,
    },
    {
        "name": "Urology",
        "code": "URO",
        "description": "Urinary tract and male reproductive health",
        "is_clinical": True,
        "is_available_for_appointments": True,
        "requires_referral": True,
        "is_24_hours": False,
    },
    {
        "name": "Radiology",
        "code": "RAD",
        "description": "Medical imaging and diagnostic services",
        "is_clinical": False,
        "is_support": True,
        "is_available_for_appointments": True,
        "requires_referral": True,
        "is_24_hours": True,
    },
    {
        "name": "Laboratory",
        "code": "LAB",
        "description": "Medical laboratory and pathology services",
        "is_clinical": False,
        "is_support": True,
        "is_available_for_appointments": False,
        "requires_referral": False,
        "is_24_hours": True,
    },
    {
        "name": "Pharmacy",
        "code": "PHARM",
        "description": "Pharmaceutical services and dispensing",
        "is_clinical": False,
        "is_support": True,
        "is_available_for_appointments": False,
        "requires_referral": False,
        "is_24_hours": True,
    },
]

# ==============================================================================
# SCRIPT
# ==============================================================================

def create_hospital_departments():
    """
    Create standard departments for the specified hospital.

    This fixes the critical issue where hospitals can be created with zero
    departments, making appointment booking impossible.
    """
    from api.models import Hospital, Department
    from django.db import transaction

    print("=" * 80)
    print("CREATING HOSPITAL DEPARTMENTS")
    print("=" * 80)

    # Find hospital
    try:
        if 'HOSPITAL_ID' in globals():
            hospital = Hospital.objects.get(id=HOSPITAL_ID)
        else:
            hospital = Hospital.objects.get(name=HOSPITAL_NAME)
    except Hospital.DoesNotExist:
        print(f"❌ ERROR: Hospital '{HOSPITAL_NAME}' not found!")
        print("\nAvailable hospitals:")
        for h in Hospital.objects.all()[:10]:
            print(f"  - ID: {h.id}, Name: {h.name}, State: {h.state}")
        return

    print(f"\n✅ Found hospital: {hospital.name}")
    print(f"   Location: {hospital.city}, {hospital.state}")
    print(f"   ID: {hospital.id}")

    # Check existing departments
    existing_count = Department.objects.filter(hospital=hospital).count()
    print(f"\n📊 Current departments: {existing_count}")

    if existing_count > 0:
        print("\n⚠️  WARNING: Hospital already has departments!")
        existing_depts = Department.objects.filter(hospital=hospital).values_list('name', flat=True)
        for dept in existing_depts:
            print(f"   - {dept}")

        response = input("\nDo you want to ADD more departments? (yes/no): ")
        if response.lower() not in ['yes', 'y']:
            print("❌ Cancelled.")
            return

    # Create departments
    print(f"\n🏗️  Creating {len(STANDARD_DEPARTMENTS)} departments...")

    created_count = 0
    skipped_count = 0

    with transaction.atomic():
        for dept_data in STANDARD_DEPARTMENTS:
            dept_name = dept_data['name']

            # Check if department already exists (by name)
            if Department.objects.filter(hospital=hospital, name=dept_name).exists():
                print(f"   ⏭️  Skipped: {dept_name} (already exists)")
                skipped_count += 1
                continue

            # Create department
            department = Department.objects.create(
                hospital=hospital,
                name=dept_data['name'],
                code=dept_data['code'],
                description=dept_data['description'],
                is_clinical=dept_data.get('is_clinical', False),
                is_support=dept_data.get('is_support', False),
                is_available_for_appointments=dept_data.get('is_available_for_appointments', True),
                requires_referral=dept_data.get('requires_referral', False),
                is_24_hours=dept_data.get('is_24_hours', False),
                is_active=True,
            )

            print(f"   ✅ Created: {dept_name} ({dept_data['code']})")
            created_count += 1

    # Summary
    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"✅ Created: {created_count} departments")
    print(f"⏭️  Skipped: {skipped_count} departments (already existed)")
    print(f"📊 Total departments now: {Department.objects.filter(hospital=hospital).count()}")

    # Verify critical departments
    print("\n🔍 Verifying critical departments:")
    critical_depts = ['General Medicine', 'Emergency Medicine']

    for dept_name in critical_depts:
        exists = Department.objects.filter(hospital=hospital, name=dept_name).exists()
        status = "✅" if exists else "❌"
        print(f"   {status} {dept_name}")

    # Check appointment readiness
    has_general_med = Department.objects.filter(
        hospital=hospital,
        name__iexact='general medicine'
    ).exists()

    print("\n🎯 APPOINTMENT READINESS:")
    if has_general_med:
        print("   ✅ Hospital is ready for appointment bookings!")
        print("   ✅ General Medicine department available (critical fallback)")
    else:
        print("   ❌ Hospital NOT ready - missing General Medicine department")

    print("\n" + "=" * 80)
    print(f"🎉 Done! {hospital.name} is now configured.")
    print("=" * 80)

    return True


# ==============================================================================
# RUN SCRIPT
# ==============================================================================

if __name__ == "__main__":
    # This runs when you execute: python manage.py shell < create_hospital_departments.py
    create_hospital_departments()
else:
    # This runs when you paste into Django shell
    print("\n📝 To create departments, run: create_hospital_departments()")
    print(f"   Target hospital: {HOSPITAL_NAME}\n")
