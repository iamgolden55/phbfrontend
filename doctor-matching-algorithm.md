# Doctor Matching Algorithm Implementation Guide

This document provides a detailed explanation of how to implement the doctor matching algorithm for the PHB healthcare platform. This algorithm matches patients with appropriate healthcare providers based on a variety of factors.

## Overview

The doctor matching service automatically connects patients with healthcare providers based on patient preferences, doctor specialties, availability, and other criteria. This is a critical component of the appointment booking system.

## Algorithm Requirements

### Input Data

The doctor matching algorithm will use the following input data:

#### From Patient's Appointment Request:

- **Appointment Type** (e.g., consultation, follow-up, vaccination)
- **Medical Specialty Needed** (e.g., cardiology, dermatology)
- **Preferred Language**
- **Urgency Level** (routine, soon, urgent)
- **Preferred Date**
- **Preferred Time Slot** (optional)
- **Symptoms Description** (for analysis)
- **Patient Location** (inferred from profile)
- **Patient Medical History** (from records)

#### From Doctor Database:

- **Doctor's ID** and name
- **Specialties** (primary and secondary)
- **Languages Spoken**
- **Availability Calendar**
- **Location/Practice Address**
- **Experience Level**
- **Patient Ratings**
- **Previous Patient Relationships**

### Implementation Steps

#### 1. Initial Filtering

```python
def filter_eligible_doctors(appointment_request):
    # Start with all doctors
    eligible_doctors = get_all_doctors()

    # 1. Filter by specialty (required match)
    eligible_doctors = [doc for doc in eligible_doctors
                        if appointment_request.specialty in doc.specialties]

    # 2. Filter by language (if specified)
    if appointment_request.preferred_language:
        eligible_doctors = [doc for doc in eligible_doctors
                           if appointment_request.preferred_language in doc.languages]

    # 3. Filter by availability on the preferred date
    eligible_doctors = [doc for doc in eligible_doctors
                       if has_availability(doc, appointment_request.preferred_date)]

    return eligible_doctors
```

#### 2. Scoring Doctors

After initial filtering, calculate a match score for each eligible doctor:

```python
def calculate_match_scores(eligible_doctors, appointment_request, patient):
    scored_doctors = []

    for doctor in eligible_doctors:
        score = 0  # Base score

        # Primary specialty match (highest weight)
        if appointment_request.specialty == doctor.primary_specialty:
            score += 40

        # Language match
        if appointment_request.preferred_language in doctor.languages:
            score += 20

        # Previous relationship with patient
        if has_previous_appointments(doctor, patient):
            score += 15

        # Availability score - closer to preferred time gets higher score
        availability_score = calculate_availability_score(
            doctor, appointment_request.preferred_date, appointment_request.preferred_time)
        score += availability_score * 10  # Max 10 points

        # Location proximity (if in-person appointment)
        if appointment_request.type == 'in-person':
            proximity_score = calculate_proximity_score(doctor.location, patient.location)
            score += proximity_score * 5  # Max 5 points

        # Doctor rating
        score += doctor.average_rating  # Assuming 1-5 scale

        # Experience level for certain complex cases
        if is_complex_case(appointment_request.symptoms):
            score += min(doctor.years_experience / 10, 5)  # Max 5 points

        # Add to scored list
        scored_doctors.append({
            'doctor': doctor,
            'score': score,
            'available_slots': get_available_slots(doctor, appointment_request.preferred_date)
        })

    # Sort by score (descending)
    return sorted(scored_doctors, key=lambda x: x['score'], reverse=True)
```

#### 3. Urgency Adjustments

For urgent appointments, modify the standard algorithm:

```python
def adjust_for_urgency(scored_doctors, urgency):
    if urgency == 'urgent':
        # For urgent cases, availability within 24-48 hours is crucial
        # Re-score based on soonest availability
        for doc in scored_doctors:
            earliest_slot = get_earliest_available_slot(doc['doctor'])
            hours_until_slot = calculate_hours_until(earliest_slot)

            if hours_until_slot <= 24:
                doc['score'] += 30  # Major boost for very quick availability
            elif hours_until_slot <= 48:
                doc['score'] += 15  # Moderate boost for availability within 48 hours
            else:
                doc['score'] -= 20  # Penalty for not available soon

    # Re-sort after adjustments
    return sorted(scored_doctors, key=lambda x: x['score'], reverse=True)
```

#### 4. Final Selection and Slot Assignment

```python
def select_and_assign_slots(scored_doctors, limit=5):
    # Return top N matches with available slots
    top_matches = scored_doctors[:limit]

    result = []
    for match in top_matches:
        result.append({
            'doctorId': match['doctor'].id,
            'doctorName': match['doctor'].name,
            'specialty': match['doctor'].primary_specialty,
            'languages': match['doctor'].languages,
            'availableSlots': match['available_slots'],
            'matchScore': normalize_score(match['score']),  # Convert to 0-100 scale
            'location': match['doctor'].location_description
        })

    return result
```

## Implementation Architecture

### Database Structure

#### Doctors Table:
```sql
CREATE TABLE doctors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    primary_specialty VARCHAR(50) NOT NULL,
    secondary_specialties TEXT[], -- Array of specialties
    languages TEXT[], -- Array of languages
    location_id INTEGER REFERENCES locations(id),
    years_experience INTEGER,
    average_rating DECIMAL(2,1)
);
```

#### Doctor Availability Table:
```sql
CREATE TABLE doctor_availability (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER REFERENCES doctors(id),
    day_of_week INTEGER, -- 0-6 for Monday-Sunday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_recurring BOOLEAN DEFAULT TRUE,
    specific_date DATE, -- NULL if recurring
    is_available BOOLEAN DEFAULT TRUE
);
```

#### Appointment Slots Table:
```sql
CREATE TABLE appointment_slots (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER REFERENCES doctors(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    is_booked BOOLEAN DEFAULT FALSE,
    appointment_id INTEGER REFERENCES appointments(id) NULL
);
```

### Service Implementation

Create a dedicated service for the doctor matching functionality:

```typescript
// src/services/doctorMatchingService.ts

export class DoctorMatchingService {
  // Main matching function
  async matchDoctorsForAppointment(appointmentRequest: BookAppointmentRequest,
                                   patientId: string): Promise<DoctorMatch[]> {
    // 1. Get patient information
    const patient = await this.patientRepository.findById(patientId);

    // 2. Get eligible doctors
    const eligibleDoctors = await this.filterEligibleDoctors(appointmentRequest);

    // 3. Score doctors
    let scoredDoctors = await this.scoreDoctors(eligibleDoctors, appointmentRequest, patient);

    // 4. Apply urgency adjustments
    scoredDoctors = this.adjustForUrgency(scoredDoctors, appointmentRequest.urgency);

    // 5. Select top matches and format response
    return this.selectTopMatches(scoredDoctors);
  }

  private async filterEligibleDoctors(appointmentRequest: BookAppointmentRequest): Promise<Doctor[]> {
    // Implementation of filtering logic
    // ...
  }

  private async scoreDoctors(doctors: Doctor[],
                           request: BookAppointmentRequest,
                           patient: Patient): Promise<ScoredDoctor[]> {
    // Implementation of scoring logic
    // ...
  }

  // Additional helper methods
  // ...
}
```

## Availability Management

The system must manage doctor availability efficiently:

1. **Regular Schedule Generation**: Create recurring slots based on doctor's regular schedule
2. **Blocked Time Management**: Handle vacations, meetings, and other unavailable times
3. **Real-time Updates**: Update availability when appointments are booked/cancelled

```typescript
class AvailabilityService {
  // Generate available slots for a specific date
  async generateSlotsForDate(doctorId: string, date: Date): Promise<TimeSlot[]> {
    // Get doctor's regular schedule for this day of week
    const dayOfWeek = date.getDay();
    const regularSchedule = await this.getRegularSchedule(doctorId, dayOfWeek);

    // Get any exceptions for this specific date
    const exceptions = await this.getDateExceptions(doctorId, date);

    // Apply exceptions to regular schedule
    const adjustedSchedule = this.applyExceptions(regularSchedule, exceptions);

    // Generate 15/30 minute slots based on adjusted schedule
    return this.generateTimeSlots(adjustedSchedule, date);
  }

  // Check if slots are available for a specific date and time range
  async checkAvailability(doctorId: string, date: Date,
                         startTime: string, endTime: string): Promise<boolean> {
    // Implementation
    // ...
  }

  // Mark slots as booked when appointment is confirmed
  async bookSlots(doctorId: string, date: Date,
                 startTime: string, endTime: string): Promise<void> {
    // Implementation
    // ...
  }
}
```

## Performance Considerations

For large-scale implementations:

1. **Caching**: Cache doctor availability data
2. **Pre-computation**: Pre-compute common matches during off-peak hours
3. **Database Optimization**: Create indices on frequently queried fields:
   ```sql
   CREATE INDEX idx_doctor_specialty ON doctors(primary_specialty);
   CREATE INDEX idx_doctor_availability ON doctor_availability(doctor_id, day_of_week);
   CREATE INDEX idx_appointment_slots ON appointment_slots(doctor_id, start_time);
   ```
4. **Batch Processing**: For initial filtering, use batch database queries rather than individual lookups

## Continuous Improvement

The matching algorithm should improve over time:

1. **Feedback Loop**: Collect data on patient satisfaction with matched doctors
2. **Machine Learning**: Train models to predict best matches based on historical data
3. **A/B Testing**: Test different scoring weights to optimize patient satisfaction and appointment efficiency

## Implementation Considerations for Django

Since you're using Django as your backend, here's how you might implement this:

```python
# models.py
from django.db import models

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    primary_specialty = models.CharField(max_length=50)
    secondary_specialties = models.JSONField(default=list)
    languages = models.JSONField(default=list)
    location = models.ForeignKey('Location', on_delete=models.PROTECT)
    years_experience = models.IntegerField(default=0)
    average_rating = models.DecimalField(max_digits=2, decimal_places=1, default=5.0)

    def has_availability(self, date, start_time=None, end_time=None):
        # Implementation
        pass

# views.py
from rest_framework.views import APIView
from rest_framework.response import Response

class DoctorMatchingView(APIView):
    def post(self, request):
        # Extract request data
        appointment_data = request.data
        patient = request.user.patient

        # Create matching service
        matching_service = DoctorMatchingService()

        # Get matches
        matches = matching_service.match_doctors(appointment_data, patient)

        return Response({"matches": matches})

# services.py
class DoctorMatchingService:
    def match_doctors(self, appointment_data, patient):
        # 1. Filter eligible doctors
        eligible_doctors = self._filter_eligible_doctors(appointment_data)

        # 2. Score doctors
        scored_doctors = self._score_doctors(eligible_doctors, appointment_data, patient)

        # 3. Apply urgency adjustments if needed
        if appointment_data.get('urgency') == 'urgent':
            scored_doctors = self._adjust_for_urgency(scored_doctors)

        # 4. Format and return top matches
        return self._format_top_matches(scored_doctors)

    # Helper methods implementation
    # ...
```

## Testing

Test the matching algorithm thoroughly:

1. **Unit Tests**: Test individual components of the algorithm
2. **Integration Tests**: Test the end-to-end matching process
3. **Performance Tests**: Ensure the algorithm scales with large doctor/patient datasets
4. **Edge Cases**: Test with various combinations of preferences and availability

Example test:

```python
def test_doctor_matching_with_language_preference():
    # Arrange
    appointment_request = {
        'specialty': 'Cardiology',
        'preferred_language': 'Spanish',
        'preferred_date': '2025-05-15',
        'urgency': 'routine'
    }

    # Create test doctors in database
    spanish_doctor = create_test_doctor(specialty='Cardiology', languages=['Spanish', 'English'])
    english_doctor = create_test_doctor(specialty='Cardiology', languages=['English'])

    # Act
    matching_service = DoctorMatchingService()
    matches = matching_service.match_doctors(appointment_request, test_patient)

    # Assert
    assert len(matches) > 0
    assert matches[0]['doctorId'] == spanish_doctor.id
    assert spanish_doctor.id in [m['doctorId'] for m in matches]
    assert matches[0]['matchScore'] > 90  # High match expected
```

---

This guide outlines a comprehensive approach to implementing the doctor matching algorithm. The actual implementation may need adjustments based on your specific requirements and infrastructure.
