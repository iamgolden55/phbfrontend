# Women's Health Database Specification

## Overview
This document outlines the database schema and API requirements for implementing comprehensive women's health tracking within the PHB Hospital System. The system will support pregnancy tracking, menstrual cycle monitoring, reproductive health goals, preventive care reminders, and fertility planning.

## Core Principles
- **Privacy First**: All reproductive health data must be encrypted and require explicit consent
- **Flexible Tracking**: Support various tracking preferences and life stages
- **Medical Integration**: Seamless integration with existing medical records and appointments
- **Data Portability**: Users can export their complete health data
- **Audit Trail**: All data changes must be logged for medical accuracy

## Database Schema

### 1. Women's Health Profile
```sql
CREATE TABLE womens_health_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    preferred_cycle_length INTEGER DEFAULT 28, -- days
    preferred_period_length INTEGER DEFAULT 5, -- days
    last_menstrual_period DATE,
    pregnancy_status ENUM('not_pregnant', 'trying_to_conceive', 'pregnant', 'postpartum') DEFAULT 'not_pregnant',
    pregnancy_due_date DATE,
    pregnancy_start_date DATE,
    contraception_method VARCHAR(100),
    fertility_tracking_enabled BOOLEAN DEFAULT false,
    notification_preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Menstrual Cycle Tracking
```sql
CREATE TABLE menstrual_cycles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES womens_health_profiles(id) ON DELETE CASCADE,
    cycle_start_date DATE NOT NULL,
    cycle_end_date DATE,
    cycle_length INTEGER, -- calculated when cycle ends
    period_start_date DATE NOT NULL,
    period_end_date DATE,
    period_length INTEGER, -- calculated when period ends
    flow_intensity ENUM('light', 'normal', 'heavy', 'very_heavy'),
    ovulation_date DATE, -- predicted or confirmed
    is_complete BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Daily Health Tracking
```sql
CREATE TABLE daily_health_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES womens_health_profiles(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    symptoms JSONB DEFAULT '[]', -- ["cramps", "bloating", "mood_swings", "headache", "fatigue"]
    mood_score INTEGER CHECK (mood_score >= 1 AND mood_score <= 10),
    energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
    sleep_hours DECIMAL(3,1),
    sleep_quality INTEGER CHECK (sleep_quality >= 1 AND sleep_quality <= 5),
    exercise_minutes INTEGER DEFAULT 0,
    water_intake_liters DECIMAL(3,1),
    medication_taken JSONB DEFAULT '[]',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(profile_id, log_date)
);
```

### 4. Pregnancy Tracking
```sql
CREATE TABLE pregnancy_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES womens_health_profiles(id) ON DELETE CASCADE,
    pregnancy_week INTEGER NOT NULL CHECK (pregnancy_week >= 1 AND pregnancy_week <= 42),
    log_date DATE NOT NULL,
    weight_kg DECIMAL(5,2),
    belly_circumference_cm DECIMAL(5,2),
    baby_kicks_count INTEGER DEFAULT 0,
    symptoms JSONB DEFAULT '[]', -- ["morning_sickness", "fatigue", "back_pain", "heartburn"]
    mood_rating INTEGER CHECK (mood_rating >= 1 AND mood_rating <= 10),
    prenatal_vitamins_taken BOOLEAN DEFAULT false,
    exercise_minutes INTEGER DEFAULT 0,
    doctor_appointment_notes TEXT,
    ultrasound_images JSONB DEFAULT '[]', -- array of image URLs
    milestone_photos JSONB DEFAULT '[]', -- weekly bump photos
    partner_notes TEXT, -- notes from partner/family
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5. Contraction Tracking (Labor)
```sql
CREATE TABLE contraction_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES womens_health_profiles(id) ON DELETE CASCADE,
    session_start TIMESTAMP WITH TIME ZONE NOT NULL,
    session_end TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    total_contractions INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE contractions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES contraction_sessions(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER, -- calculated
    intensity INTEGER CHECK (intensity >= 1 AND intensity <= 10),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 6. Health Screenings & Preventive Care
```sql
CREATE TABLE health_screenings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES womens_health_profiles(id) ON DELETE CASCADE,
    screening_type ENUM('mammogram', 'cervical_smear', 'bone_density', 'blood_pressure', 'cholesterol', 'std_panel'),
    last_screening_date DATE,
    next_due_date DATE,
    result_status ENUM('normal', 'abnormal', 'follow_up_needed', 'pending'),
    result_notes TEXT,
    reminder_enabled BOOLEAN DEFAULT true,
    reminder_advance_days INTEGER DEFAULT 30,
    provider_name VARCHAR(255),
    appointment_id UUID REFERENCES appointments(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 7. Fertility Tracking
```sql
CREATE TABLE fertility_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES womens_health_profiles(id) ON DELETE CASCADE,
    tracking_date DATE NOT NULL,
    basal_body_temperature DECIMAL(4,2), -- Celsius
    cervical_mucus_type ENUM('dry', 'sticky', 'creamy', 'watery', 'egg_white'),
    cervical_position ENUM('low', 'medium', 'high'),
    cervical_firmness ENUM('firm', 'medium', 'soft'),
    ovulation_test_result ENUM('negative', 'positive', 'peak'),
    pregnancy_test_result ENUM('negative', 'positive', 'not_tested'),
    sexual_activity BOOLEAN DEFAULT false,
    fertility_signs JSONB DEFAULT '[]', -- ["ovulation_pain", "breast_tenderness", "increased_libido"]
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(profile_id, tracking_date)
);
```

### 8. Reproductive Health Goals
```sql
CREATE TABLE health_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES womens_health_profiles(id) ON DELETE CASCADE,
    goal_type ENUM('cycle_regulation', 'fertility_improvement', 'symptom_management', 'weight_management', 'fitness', 'nutrition'),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target_value DECIMAL(10,2), -- flexible numeric target
    target_unit VARCHAR(50), -- "kg", "minutes", "days", "cycles"
    current_value DECIMAL(10,2) DEFAULT 0,
    start_date DATE NOT NULL,
    target_date DATE,
    is_achieved BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    reminder_frequency ENUM('daily', 'weekly', 'monthly', 'none') DEFAULT 'weekly',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 9. Health Education & Resources
```sql
CREATE TABLE health_education_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES womens_health_profiles(id) ON DELETE CASCADE,
    resource_type ENUM('article', 'video', 'course', 'webinar'),
    resource_id VARCHAR(255) NOT NULL,
    resource_title VARCHAR(255) NOT NULL,
    category ENUM('pregnancy', 'menstrual_health', 'fertility', 'menopause', 'sexual_health', 'preventive_care'),
    progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    completed_at TIMESTAMP WITH TIME ZONE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    bookmarked BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 10. Family Planning & Birth Control
```sql
CREATE TABLE birth_control_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES womens_health_profiles(id) ON DELETE CASCADE,
    method_type ENUM('pill', 'iud', 'implant', 'injection', 'patch', 'ring', 'condom', 'diaphragm', 'natural', 'sterilization'),
    brand_name VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    effectiveness_rating DECIMAL(4,2), -- percentage
    side_effects JSONB DEFAULT '[]',
    satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
    prescribed_by VARCHAR(255), -- doctor name
    prescription_id UUID,
    reminder_time TIME,
    reminder_enabled BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 11. Partner/Family Integration
```sql
CREATE TABLE pregnancy_partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES womens_health_profiles(id) ON DELETE CASCADE,
    partner_name VARCHAR(255) NOT NULL,
    partner_email VARCHAR(255),
    relationship_type ENUM('partner', 'spouse', 'family_member', 'friend', 'caregiver'),
    access_level ENUM('view_only', 'view_and_comment', 'full_access'),
    invitation_status ENUM('pending', 'accepted', 'declined', 'revoked') DEFAULT 'pending',
    invitation_token VARCHAR(255) UNIQUE,
    access_granted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Endpoints Specification

### Authentication
All endpoints require JWT authentication with `phb_token` header.

### Core Endpoints

#### Women's Health Profile
```
GET    /api/womens-health/profile           # Get user's profile
POST   /api/womens-health/profile           # Create new profile
PUT    /api/womens-health/profile           # Update profile
DELETE /api/womens-health/profile           # Deactivate profile
```

#### Menstrual Cycle Tracking
```
GET    /api/womens-health/cycles                    # Get cycle history
POST   /api/womens-health/cycles                    # Start new cycle
PUT    /api/womens-health/cycles/:id                # Update cycle
GET    /api/womens-health/cycles/current            # Get current cycle
GET    /api/womens-health/cycles/predictions        # Get cycle predictions
```

#### Daily Health Logs
```
GET    /api/womens-health/daily-logs                # Get logs (with date range)
POST   /api/womens-health/daily-logs                # Create daily log
PUT    /api/womens-health/daily-logs/:date          # Update specific date log
DELETE /api/womens-health/daily-logs/:date          # Delete log
GET    /api/womens-health/daily-logs/trends         # Get trend analysis
```

#### Pregnancy Tracking
```
GET    /api/womens-health/pregnancy                 # Get pregnancy data
POST   /api/womens-health/pregnancy                 # Create pregnancy tracking
PUT    /api/womens-health/pregnancy/:week           # Update weekly data
GET    /api/womens-health/pregnancy/milestones     # Get milestone data
POST   /api/womens-health/pregnancy/photos         # Upload milestone photos
```

#### Contraction Tracking
```
POST   /api/womens-health/contractions/session     # Start contraction session
PUT    /api/womens-health/contractions/session/:id # End session
POST   /api/womens-health/contractions             # Log individual contraction
GET    /api/womens-health/contractions/analysis    # Get labor progression analysis
```

#### Health Screenings
```
GET    /api/womens-health/screenings               # Get screening schedule
POST   /api/womens-health/screenings               # Add screening record
PUT    /api/womens-health/screenings/:id           # Update screening
GET    /api/womens-health/screenings/reminders     # Get upcoming reminders
```

#### Fertility Tracking
```
GET    /api/womens-health/fertility                # Get fertility data
POST   /api/womens-health/fertility                # Log fertility data
GET    /api/womens-health/fertility/predictions    # Get ovulation predictions
GET    /api/womens-health/fertility/fertile-window # Get current fertile window
```

#### Health Goals
```
GET    /api/womens-health/goals                    # Get active goals
POST   /api/womens-health/goals                    # Create new goal
PUT    /api/womens-health/goals/:id                # Update goal
DELETE /api/womens-health/goals/:id                # Delete goal
POST   /api/womens-health/goals/:id/progress       # Log progress
```

### Data Export & Privacy
```
GET    /api/womens-health/export                   # Export all data (PDF/JSON)
DELETE /api/womens-health/data                     # Delete all data (GDPR)
GET    /api/womens-health/privacy-settings         # Get privacy settings
PUT    /api/womens-health/privacy-settings         # Update privacy settings
```

## Sample JSON Responses

### Profile Response
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "user_id": "user_123",
  "date_of_birth": "1990-05-15",
  "pregnancy_status": "pregnant",
  "pregnancy_due_date": "2024-12-15",
  "pregnancy_week": 24,
  "last_menstrual_period": "2024-05-01",
  "preferred_cycle_length": 28,
  "contraception_method": "none",
  "fertility_tracking_enabled": true,
  "notification_preferences": {
    "period_reminders": true,
    "appointment_reminders": true,
    "screening_reminders": true,
    "daily_log_reminders": false
  }
}
```

### Daily Log Response
```json
{
  "log_date": "2024-06-25",
  "symptoms": ["mild_cramps", "bloating", "fatigue"],
  "mood_score": 7,
  "energy_level": 6,
  "sleep_hours": 7.5,
  "sleep_quality": 4,
  "exercise_minutes": 30,
  "water_intake_liters": 2.1,
  "medication_taken": ["prenatal_vitamin", "iron_supplement"],
  "notes": "Feeling good overall, mild pregnancy symptoms"
}
```

### Pregnancy Tracking Response
```json
{
  "pregnancy_week": 24,
  "log_date": "2024-06-25",
  "weight_kg": 68.5,
  "belly_circumference_cm": 95.2,
  "baby_kicks_count": 15,
  "symptoms": ["back_pain", "heartburn"],
  "mood_rating": 8,
  "prenatal_vitamins_taken": true,
  "exercise_minutes": 45,
  "milestone_photos": [
    "https://storage.phb.com/pregnancy/user_123/week_24_photo.jpg"
  ],
  "baby_development": {
    "size": "ear_of_corn",
    "length_cm": 30,
    "weight_g": 600,
    "developments": ["hearing_developed", "fat_accumulation", "lung_development"]
  }
}
```

## Security & Privacy Considerations

### Data Encryption
- All reproductive health data must be encrypted at rest using AES-256
- Sensitive fields (fertility data, pregnancy details) require additional encryption layer
- API responses must use HTTPS with certificate pinning

### Access Control
- Users have complete control over their data
- Partner access requires explicit consent and can be revoked anytime
- Healthcare providers need separate authorization tokens
- Audit logs for all data access and modifications

### Data Retention
- Raw tracking data retained for 7 years (medical requirement)
- Aggregated/anonymized data can be retained for research (with consent)
- Complete data deletion available (GDPR compliance)
- Automatic data archival for inactive accounts

### Notifications & Reminders
- All notifications must respect user preferences
- Critical health reminders (overdue screenings) cannot be disabled
- Emergency notifications for concerning patterns
- Partner notifications require separate consent

## Integration Points

### Existing PHB Systems
- **User Authentication**: Link to existing user accounts
- **Medical Records**: Integration with medical history and appointments
- **Appointment System**: Prenatal appointments, screening bookings
- **Prescription System**: Birth control prescriptions, prenatal vitamins
- **Payment System**: Screening fees, appointment costs

### External Integrations
- **Wearable Devices**: Fitbit, Apple Health, Google Fit for sleep/exercise data
- **Medical Devices**: Digital thermometers, ovulation monitors
- **Pharmacy Systems**: Prescription refill reminders
- **Lab Systems**: Test result integration (hormone levels, etc.)

## Performance Requirements
- API response time < 200ms for read operations
- Support for 100,000+ concurrent users
- Real-time notifications with <5 second delay
- 99.9% uptime SLA for critical tracking features
- Efficient data queries with proper indexing on date fields

## Testing Requirements
- Unit tests for all business logic
- Integration tests for API endpoints
- Load testing for concurrent users
- Security testing for data protection
- User acceptance testing with focus groups

This specification provides the foundation for building a comprehensive women's health tracking system that integrates seamlessly with the existing PHB platform while maintaining the highest standards of privacy and medical accuracy.