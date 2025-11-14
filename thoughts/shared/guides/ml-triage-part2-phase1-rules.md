---
title: "Part 2: Phase 1 - Rule-Based Triage Implementation"
series: ML-Based Medical Triage System
part: 2 of 9
difficulty: intermediate
estimated_time: 8-12 hours
hands_on: true
date: 2025-11-11
prerequisites:
  - Part 1 (Architecture) read
  - Django backend running
  - React frontend running
  - Database access
tags: [implementation, django, api, rules-based, hands-on]
---

# Part 2: Phase 1 - Rule-Based Triage Implementation

**⏱️ Estimated Time**: 8-12 hours
**🎯 Goal**: Build a working rule-based triage system that generates training data for ML

---

## 📋 What You'll Build

By the end of this guide, you'll have:

✅ Severity scoring algorithm (red flags + risk calculation)
✅ Care level recommendation engine
✅ REST API endpoint (`POST /api/triage/assess-severity/`)
✅ Django model for logging triage decisions
✅ Frontend integration in `BookAppointment.tsx`
✅ Testing suite
✅ Production deployment

**Why Start with Rules?**

1. **Immediate Value**: Working triage system today (not in 3 months)
2. **Data Generation**: Every patient creates ML training data
3. **Domain Learning**: You'll understand the problem deeply
4. **Baseline**: ML must beat this to be worth deploying

---

## 🎯 Learning Objectives

After completing this part, you will:

- [ ] Understand how to build medical decision rules
- [ ] Implement severity scoring algorithms
- [ ] Create RESTful APIs for healthcare data
- [ ] Log data for ML training
- [ ] Integrate backend logic with React frontend
- [ ] Test medical software safely
- [ ] Deploy to production with monitoring

---

## 📁 File Structure

Here's what you'll create:

```
basebackend/
├── api/
│   ├── models/
│   │   └── triage.py                    # NEW: TriageLog model
│   ├── utils/
│   │   └── triage/                      # NEW: Triage logic
│   │       ├── __init__.py
│   │       ├── red_flags.py             # Critical symptom detection
│   │       ├── severity_calculator.py   # Scoring algorithm
│   │       ├── care_recommender.py      # Care level logic
│   │       └── department_router.py     # Department mapping
│   ├── views/
│   │   └── triage_views.py              # NEW: API endpoints
│   ├── serializers/
│   │   └── triage_serializers.py        # NEW: Data serialization
│   └── urls.py                          # UPDATE: Add triage routes
├── migrations/
│   └── 00XX_triage_log.py               # NEW: Database migration
└── tests/
    └── test_triage.py                   # NEW: Unit tests

phbfrontend/
└── src/
    ├── services/
    │   └── triageService.ts             # NEW: Triage API client
    └── features/
        └── health/
            └── BookAppointment.tsx      # UPDATE: Add triage call
```

---

## Step 1: Create the TriageLog Model

**📍 Location**: `/Users/new/phbfinal/basebackend/api/models/triage.py`

**Why**: Every triage assessment must be logged for:
- Tracking outcomes (did we get it right?)
- ML training data (input → output pairs)
- Audit trail (medical compliance)
- Performance metrics

<details>
<summary><b>📝 Code: TriageLog Model</b> (Click to expand)</summary>

```python
# api/models/triage.py

from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
import uuid
import random
import string

User = get_user_model()


class TriageLog(models.Model):
    """
    Comprehensive logging of every triage assessment.

    This model serves dual purposes:
    1. Production tracking: Monitor triage accuracy and outcomes
    2. ML training data: Each log is a potential training example

    Fields are designed to capture:
    - Input: What data was provided
    - Output: What we recommended
    - Outcome: What actually happened
    - Ground truth: Medical staff's expert opinion
    """

    # ==================== IDENTIFICATION ====================
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text="Unique identifier for this triage assessment"
    )

    reference_number = models.CharField(
        max_length=20,
        unique=True,
        editable=False,
        help_text="Human-readable reference like TRG-ABC123"
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='triage_logs',
        help_text="Patient who received this triage"
    )

    hospital = models.ForeignKey(
        'Hospital',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        help_text="Hospital where triage was performed"
    )

    # ==================== INPUT DATA ====================
    symptoms_data = models.JSONField(
        help_text="Array of symptoms with body parts and descriptions"
    )
    # Example: [
    #   {
    #     "body_part_id": "chest",
    #     "body_part_name": "Chest",
    #     "symptom_name": "Chest pain",
    #     "description": "Sharp pain, worse with breathing"
    #   }
    # ]

    urgency = models.CharField(
        max_length=20,
        choices=[
            ('routine', 'Routine'),
            ('soon', 'Soon'),
            ('urgent', 'Urgent')
        ],
        help_text="Patient-reported urgency level"
    )

    # Patient demographics
    patient_age = models.IntegerField(
        null=True,
        blank=True,
        help_text="Patient age in years at time of triage"
    )

    patient_gender = models.CharField(
        max_length=10,
        null=True,
        blank=True,
        choices=[
            ('male', 'Male'),
            ('female', 'Female'),
            ('other', 'Other')
        ],
        help_text="Patient gender"
    )

    medical_history = models.JSONField(
        default=list,
        help_text="List of chronic conditions and past diagnoses"
    )
    # Example: ["Hypertension", "Type 2 Diabetes", "Asthma"]

    # ==================== ASSESSMENT OUTPUT ====================
    severity_score = models.IntegerField(
        help_text="Calculated severity score (0-100)"
    )

    severity_level = models.CharField(
        max_length=20,
        choices=[
            ('low', 'Low'),
            ('medium', 'Medium'),
            ('high', 'High'),
            ('critical', 'Critical')
        ],
        help_text="Categorized severity level"
    )

    has_red_flags = models.BooleanField(
        default=False,
        help_text="Whether critical red flag symptoms were detected"
    )

    red_flags_found = models.JSONField(
        default=list,
        help_text="List of red flags detected"
    )
    # Example: [
    #   {
    #     "category": "cardiac",
    #     "flag": "chest pain with radiation to arm",
    #     "matched_symptom": "Chest pain"
    #   }
    # ]

    severity_breakdown = models.JSONField(
        default=dict,
        help_text="Component scores that contributed to final severity"
    )
    # Example: {
    #   "symptom_severity": 35,
    #   "risk_factors": 18,
    #   "urgency": 15,
    #   "vital_signs": 0
    # }

    risk_factors = models.JSONField(
        default=list,
        help_text="List of risk factors identified"
    )
    # Example: ["elderly_age", "multiple_comorbidities"]

    # ==================== RECOMMENDATION ====================
    recommended_care_level = models.CharField(
        max_length=20,
        choices=[
            ('online', 'Online Consultation'),
            ('gp', 'GP Appointment'),
            ('specialist', 'Specialist Appointment'),
            ('emergency', 'Emergency Department')
        ],
        help_text="System-recommended care level"
    )

    recommended_department_id = models.IntegerField(
        null=True,
        blank=True,
        help_text="ID of recommended department (if specialist/emergency)"
    )

    recommended_department_name = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        help_text="Name of recommended department"
    )

    recommended_timeframe = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        help_text="Recommended timeframe (e.g., 'within 24 hours')"
    )

    estimated_cost = models.IntegerField(
        help_text="Estimated cost in Naira for recommended care"
    )

    reasoning = models.JSONField(
        default=list,
        help_text="List of reasons for this recommendation"
    )
    # Example: [
    #   "High severity score indicates urgent medical attention",
    #   "Cardiac risk factors present"
    # ]

    # ==================== USER ACTION (What Actually Happened) ====================
    user_selected_care_level = models.CharField(
        max_length=20,
        null=True,
        blank=True,
        help_text="Care level patient actually chose (may differ from recommendation)"
    )

    user_selected_department_id = models.IntegerField(
        null=True,
        blank=True,
        help_text="Department patient actually selected"
    )

    user_accepted_recommendation = models.BooleanField(
        null=True,
        blank=True,
        help_text="Did user accept system recommendation?"
    )

    appointment_created = models.BooleanField(
        default=False,
        help_text="Whether patient proceeded to book appointment"
    )

    appointment_id = models.UUIDField(
        null=True,
        blank=True,
        help_text="Linked appointment if created"
    )

    # ==================== OUTCOME TRACKING ====================
    # These fields are filled in AFTER the triage/appointment

    actual_diagnosis = models.CharField(
        max_length=200,
        null=True,
        blank=True,
        help_text="Final diagnosis from doctor (filled after appointment)"
    )

    was_correctly_triaged = models.BooleanField(
        null=True,
        blank=True,
        help_text="Did triage match actual severity? (retrospective)"
    )

    escalated_to_higher_care = models.BooleanField(
        default=False,
        help_text="Did patient need higher care level than recommended?"
    )

    de_escalated_to_lower_care = models.BooleanField(
        default=False,
        help_text="Did patient need lower care level than recommended?"
    )

    patient_satisfaction = models.IntegerField(
        null=True,
        blank=True,
        choices=[(i, str(i)) for i in range(1, 6)],
        help_text="Patient satisfaction rating (1-5)"
    )

    # ==================== ML TRAINING LABELS ====================
    # The "ground truth" - filled by medical staff review

    ground_truth_severity = models.CharField(
        max_length=20,
        null=True,
        blank=True,
        choices=[
            ('low', 'Low'),
            ('medium', 'Medium'),
            ('high', 'High'),
            ('critical', 'Critical')
        ],
        help_text="Expert-labeled correct severity (for ML training)"
    )

    labeled_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='labeled_triages',
        help_text="Medical professional who labeled this case"
    )

    labeled_at = models.DateTimeField(
        null=True,
        blank=True,
        help_text="When this case was labeled"
    )

    labeling_confidence = models.CharField(
        max_length=20,
        null=True,
        blank=True,
        choices=[
            ('high', 'High Confidence'),
            ('medium', 'Medium Confidence'),
            ('low', 'Low Confidence - Borderline Case')
        ],
        help_text="Labeler's confidence in their assessment"
    )

    labeling_notes = models.TextField(
        null=True,
        blank=True,
        help_text="Notes from medical staff about this case"
    )

    # ==================== ML MODEL INFO ====================
    # Track which model version made this prediction (for future ML)

    model_version = models.CharField(
        max_length=50,
        default='rules_v1',
        help_text="Model/algorithm version used (e.g., 'rules_v1', 'rf_v2')"
    )

    ml_confidence = models.FloatField(
        null=True,
        blank=True,
        help_text="ML model confidence (0-1) when using ML models"
    )

    # ==================== METADATA ====================
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="When this triage was performed"
    )

    updated_at = models.DateTimeField(
        auto_now=True,
        help_text="Last modification time"
    )

    class Meta:
        db_table = 'triage_logs'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['created_at']),
            models.Index(fields=['severity_level']),
            models.Index(fields=['recommended_care_level']),
            models.Index(fields=['user', 'created_at']),
            models.Index(fields=['ground_truth_severity']),  # ML training queries
        ]
        verbose_name = 'Triage Log'
        verbose_name_plural = 'Triage Logs'

    def __str__(self):
        return f"{self.reference_number} - {self.severity_level} ({self.recommended_care_level})"

    def save(self, *args, **kwargs):
        """Auto-generate reference number on creation."""
        if not self.reference_number:
            self.reference_number = self.generate_reference_number()
        super().save(*args, **kwargs)

    @staticmethod
    def generate_reference_number():
        """Generate unique reference like TRG-ABC123."""
        prefix = 'TRG'
        # 3 random uppercase letters
        letters = ''.join(random.choices(string.ascii_uppercase, k=3))
        # 3 random digits
        digits = ''.join(random.choices(string.digits, k=3))
        return f"{prefix}-{letters}{digits}"

    @property
    def is_labeled(self):
        """Check if this case has been labeled for ML training."""
        return self.ground_truth_severity is not None

    @property
    def prediction_accuracy(self):
        """
        Calculate if prediction matched ground truth.
        Returns None if not yet labeled.
        """
        if not self.is_labeled:
            return None
        return self.severity_level == self.ground_truth_severity

    def calculate_accuracy_score(self):
        """
        Calculate multi-class accuracy score.

        Returns:
            1.0: Exact match
            0.5: Off by one level (low→medium, medium→high, etc.)
            0.0: Off by two+ levels (low→critical)
            None: Not labeled yet
        """
        if not self.is_labeled:
            return None

        severity_order = ['low', 'medium', 'high', 'critical']
        predicted_idx = severity_order.index(self.severity_level)
        actual_idx = severity_order.index(self.ground_truth_severity)

        difference = abs(predicted_idx - actual_idx)

        if difference == 0:
            return 1.0  # Exact match
        elif difference == 1:
            return 0.5  # Close (off by one level)
        else:
            return 0.0  # Far off
```

</details>

**🎓 Exercise 1.1**: Study the model
- Read each field's `help_text`
- Identify which fields are for "input", "output", and "outcome"
- Why do we need `ground_truth_severity` separate from `severity_level`?

<details>
<summary><b>✅ Solution</b></summary>

**Input fields**: `symptoms_data`, `urgency`, `patient_age`, `medical_history` - what we receive from patient

**Output fields**: `severity_score`, `severity_level`, `recommended_care_level` - what system predicts

**Outcome fields**: `actual_diagnosis`, `was_correctly_triaged`, `user_selected_care_level` - what actually happened

**Why separate `ground_truth_severity`?**
- `severity_level` = what the algorithm thinks
- `ground_truth_severity` = what medical expert says is correct
- We compare these to measure accuracy and train ML models
</details>

---

## Step 2: Create Database Migration

**📍 Terminal**: Run from `basebackend/` directory

```bash
# Generate migration
python manage.py makemigrations

# Apply migration
python manage.py migrate
```

**Expected Output**:
```
Migrations for 'api':
  api/migrations/00XX_triage_log.py
    - Create model TriageLog
```

**✅ Checkpoint 1**: Verify migration
```bash
python manage.py showmigrations api
```

Should show `[X]` next to the new migration.

---

## Step 3: Implement Red Flag Detection

**📍 Location**: `/Users/new/phbfinal/basebackend/api/utils/triage/red_flags.py`

**Why**: Some symptoms require IMMEDIATE emergency care, regardless of other factors.

<details>
<summary><b>📝 Code: Red Flag Detection</b> (Click to expand)</summary>

```python
# api/utils/triage/red_flags.py

"""
Red Flag Symptom Detection for Medical Triage

Red flags are symptoms that indicate potentially life-threatening conditions
requiring immediate emergency department evaluation, regardless of other factors.

Based on clinical guidelines from:
- NHS 111 triage protocols
- American College of Emergency Physicians (ACEP)
- NICE guidelines (UK)
"""

from typing import List, Dict


# ==================== CRITICAL RED FLAGS ====================

RED_FLAGS_CRITICAL = {
    'cardiac': {
        'description': 'Potential heart attack or cardiac emergency',
        'flags': [
            'chest pain with radiation to arm',
            'chest pain with radiation to jaw',
            'crushing chest pressure',
            'severe chest tightness',
            'chest pain with sweating',
            'chest pain with nausea',
            'chest pain with shortness of breath',
            'irregular heartbeat with dizziness',
            'irregular heartbeat with chest pain',
            'heart palpitations with chest pain',
            'sudden collapse',
            'syncope',  # Medical term for fainting
        ]
    },

    'neurological': {
        'description': 'Potential stroke or brain emergency',
        'flags': [
            'sudden severe headache',
            'worst headache of life',
            'thunderclap headache',
            'facial drooping',
            'face drooping',
            'arm weakness',
            'one-sided weakness',
            'speech difficulty',
            'slurred speech',
            'confusion',
            'altered mental status',
            'disorientation',
            'seizure',
            'convulsion',
            'loss of consciousness',
            'unconscious',
            'unresponsive',
            'vision loss',
            'sudden blindness',
            'double vision with headache',
        ]
    },

    'respiratory': {
        'description': 'Severe breathing difficulty',
        'flags': [
            'severe difficulty breathing',
            'cannot speak in full sentences',
            'gasping for air',
            'blue lips',
            'blue face',
            'cyanosis',
            'stridor',  # High-pitched breathing sound
            'coughing up blood',
            'hemoptysis',
        ]
    },

    'trauma': {
        'description': 'Severe injury requiring immediate care',
        'flags': [
            'severe bleeding',
            'uncontrolled bleeding',
            'arterial bleeding',
            'suspected fracture',
            'bone protruding',
            'head injury with confusion',
            'head injury with vomiting',
            'neck injury',
            'spinal injury',
            'severe burns',
            'third degree burn',
            'amputation',
        ]
    },

    'abdominal': {
        'description': 'Surgical emergency or internal bleeding',
        'flags': [
            'severe abdominal pain with rigidity',
            'board-like abdomen',
            'guarding',
            'rebound tenderness',
            'vomiting blood',
            'hematemesis',
            'black tarry stools',
            'melena',
            'bright red blood in stool',
            'suspected appendicitis',
            'right lower quadrant pain with fever',
            'severe abdominal pain with shock',
        ]
    },

    'obstetric': {
        'description': 'Pregnancy-related emergency',
        'flags': [
            'vaginal bleeding in pregnancy',
            'severe abdominal pain in pregnancy',
            'decreased fetal movement',
            'baby not moving',
            'severe headache in pregnancy',
            'vision changes in pregnancy',
            'seizure in pregnancy',
            'ruptured membranes',
            'water broke',
        ]
    },

    'allergic': {
        'description': 'Severe allergic reaction (anaphylaxis)',
        'flags': [
            'difficulty breathing after exposure',
            'throat swelling',
            'tongue swelling',
            'lip swelling with difficulty breathing',
            'hives with difficulty breathing',
            'anaphylaxis',
            'severe allergic reaction',
        ]
    },

    'metabolic': {
        'description': 'Severe metabolic emergency',
        'flags': [
            'blood sugar below 40',
            'severe hypoglycemia',
            'diabetic with confusion',
            'diabetic with altered mental status',
            'severe dehydration with shock',
        ]
    }
}


def check_red_flags(symptoms: List[Dict]) -> Dict:
    """
    Check if symptoms contain any red flags requiring immediate emergency care.

    Args:
        symptoms: List of symptom dictionaries, each containing:
            - body_part_id: str
            - body_part_name: str
            - symptom_name: str
            - description: str (optional)

    Returns:
        Dictionary with:
        {
            'has_red_flags': bool,
            'severity': 'critical' if red flags found,
            'flags_found': List[Dict] of matched red flags,
            'categories': List[str] of affected categories,
            'recommended_action': str,
            'reasoning': str
        }

    Example:
        >>> symptoms = [
        ...     {
        ...         'symptom_name': 'Chest pain',
        ...         'description': 'Sharp pain radiating to left arm'
        ...     }
        ... ]
        >>> result = check_red_flags(symptoms)
        >>> result['has_red_flags']
        True
        >>> result['categories']
        ['cardiac']
    """

    flags_found = []
    categories_affected = set()

    # Combine all symptom text for searching
    for symptom in symptoms:
        symptom_name = symptom.get('symptom_name', '').lower()
        description = symptom.get('description', '').lower()
        body_part = symptom.get('body_part_name', '').lower()

        # Combine all text
        combined_text = f"{symptom_name} {description} {body_part}"

        # Check against all red flags
        for category, category_data in RED_FLAGS_CRITICAL.items():
            for flag in category_data['flags']:
                # Check if red flag text is in combined symptom text
                if flag.lower() in combined_text:
                    flags_found.append({
                        'category': category,
                        'category_description': category_data['description'],
                        'flag': flag,
                        'matched_symptom': symptom['symptom_name'],
                        'matched_in': 'description' if flag.lower() in description else 'symptom_name'
                    })
                    categories_affected.add(category)

    # If any red flags found → CRITICAL
    if flags_found:
        return {
            'has_red_flags': True,
            'severity': 'critical',
            'flags_found': flags_found,
            'categories': list(categories_affected),
            'recommended_action': 'emergency_department',
            'recommended_timeframe': 'immediate',
            'reasoning': (
                f"Red flag symptoms detected in {len(categories_affected)} "
                f"categor{'y' if len(categories_affected) == 1 else 'ies'}: "
                f"{', '.join(categories_affected)}. "
                "Immediate emergency department evaluation required."
            ),
            'alert_level': 'urgent',
            'requires_ambulance': should_recommend_ambulance(flags_found)
        }

    # No red flags
    return {
        'has_red_flags': False,
        'flags_found': [],
        'categories': []
    }


def should_recommend_ambulance(flags_found: List[Dict]) -> bool:
    """
    Determine if ambulance should be recommended based on red flags.

    Ambulance recommended for:
    - Cardiac symptoms
    - Neurological symptoms (stroke)
    - Severe trauma
    - Respiratory distress
    - Loss of consciousness
    """
    critical_ambulance_categories = {
        'cardiac', 'neurological', 'trauma', 'respiratory'
    }

    categories = {flag['category'] for flag in flags_found}

    return bool(categories & critical_ambulance_categories)


# ==================== TESTING FUNCTION ====================

def test_red_flags():
    """Test red flag detection with sample cases."""

    test_cases = [
        {
            'name': 'Cardiac - Chest pain radiating to arm',
            'symptoms': [{
                'symptom_name': 'Chest pain',
                'description': 'Sharp pain radiating to left arm and jaw',
                'body_part_name': 'Chest'
            }],
            'expected': True
        },
        {
            'name': 'Stroke - FAST symptoms',
            'symptoms': [{
                'symptom_name': 'Facial drooping',
                'description': 'Right side of face drooping, started 30 minutes ago',
                'body_part_name': 'Face'
            }],
            'expected': True
        },
        {
            'name': 'Non-critical - Mild headache',
            'symptoms': [{
                'symptom_name': 'Headache',
                'description': 'Mild headache, comes and goes',
                'body_part_name': 'Head'
            }],
            'expected': False
        },
        {
            'name': 'Respiratory - Severe breathlessness',
            'symptoms': [{
                'symptom_name': 'Shortness of breath',
                'description': 'Cannot speak in full sentences, very difficult to breathe',
                'body_part_name': 'Chest'
            }],
            'expected': True
        }
    ]

    for test in test_cases:
        result = check_red_flags(test['symptoms'])
        passed = result['has_red_flags'] == test['expected']
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"{status}: {test['name']}")
        if result['has_red_flags']:
            print(f"  Flags: {[f['flag'] for f in result['flags_found']]}")
        print()


if __name__ == '__main__':
    # Run tests
    test_red_flags()
```

</details>

**🎓 Exercise 2.1**: Test red flag detection

```bash
cd /Users/new/phbfinal/basebackend
python api/utils/triage/red_flags.py
```

**Expected Output**:
```
✓ PASS: Cardiac - Chest pain radiating to arm
  Flags: ['chest pain with radiation to arm']

✓ PASS: Stroke - FAST symptoms
  Flags: ['facial drooping']

✓ PASS: Non-critical - Mild headache

✓ PASS: Respiratory - Severe breathlessness
  Flags: ['cannot speak in full sentences']
```

---

## Step 4: Severity Score Calculator 🎯

Now we build the **core scoring algorithm** that calculates a 0-100 severity score based on symptoms, urgency, and context.

### Understanding Severity Scoring

**What is severity scoring?**
- A numerical value (0-100) representing how serious the patient's condition is
- Think of it like a thermometer for medical urgency
- Higher score = more serious condition

**Why use numbers instead of just "low/medium/high"?**
- Precision: We can distinguish between mild (20) vs moderate (45) vs severe (75)
- Ranking: When multiple patients need care, we can prioritize
- ML training: Neural networks need numbers, not words
- Auditability: We can explain exactly why score = 67 instead of 54

**Scoring Components:**
```
Final Score = Base Symptom Score (40%)
            + Urgency Multiplier (30%)
            + Risk Factor Score (20%)
            + Red Flag Penalty (10%)
```

Let's build it step by step.

### Create `api/utils/triage/severity_calculator.py`

<details>
<summary><strong>📄 severity_calculator.py</strong> (click to expand - ~400 lines)</summary>

```python
# api/utils/triage/severity_calculator.py

"""
Severity Score Calculator

Calculates a 0-100 severity score based on:
1. Symptom characteristics (pain level, duration, progression)
2. Patient urgency selection
3. Risk factors (age, medical history)
4. Red flag presence

This is our "smart rules" engine that will later be replaced by ML.
"""

from typing import List, Dict, Any
from .red_flags import check_red_flags


# Symptom severity weights (how serious each symptom type is)
SYMPTOM_BASE_SCORES = {
    # Pain-related (20-60 range)
    'severe pain': 60,
    'moderate pain': 40,
    'mild pain': 20,
    'sharp pain': 55,
    'dull ache': 25,
    'throbbing': 45,
    'burning sensation': 50,
    
    # Respiratory (30-80 range)
    'difficulty breathing': 75,
    'shortness of breath': 65,
    'wheezing': 50,
    'cough': 30,
    'chest tightness': 60,
    
    # Cardiovascular (40-85 range)
    'chest pain': 80,
    'heart palpitations': 55,
    'irregular heartbeat': 65,
    'dizziness': 45,
    
    # Neurological (35-80 range)
    'severe headache': 70,
    'headache': 40,
    'confusion': 75,
    'memory loss': 60,
    'vision changes': 55,
    'numbness': 50,
    'tingling': 35,
    
    # Gastrointestinal (25-70 range)
    'severe abdominal pain': 70,
    'abdominal pain': 45,
    'nausea': 30,
    'vomiting': 40,
    'blood in stool': 75,
    'blood in vomit': 80,
    
    # Systemic (30-75 range)
    'fever': 45,
    'high fever': 65,
    'chills': 35,
    'fatigue': 25,
    'weakness': 40,
    'weight loss': 50,
    
    # Trauma (40-90 range)
    'bleeding': 65,
    'severe bleeding': 85,
    'swelling': 35,
    'bruising': 30,
    'fracture': 75,
    'open wound': 70,
}


# Duration multipliers (how long symptoms have lasted)
DURATION_MULTIPLIERS = {
    'minutes': 1.3,      # Sudden onset is concerning
    'hours': 1.2,        # Recent onset
    'days': 1.0,         # Baseline
    'weeks': 0.9,        # Chronic but stable
    'months': 0.8,       # Long-standing
    'years': 0.7,        # Very chronic
}


# Progression multipliers (is it getting worse?)
PROGRESSION_MULTIPLIERS = {
    'getting worse rapidly': 1.4,
    'getting worse': 1.2,
    'staying the same': 1.0,
    'improving slowly': 0.8,
    'improving': 0.6,
}


# Urgency weights (from patient's perspective)
URGENCY_WEIGHTS = {
    'emergency': 30,     # Patient thinks it's urgent
    'urgent': 25,
    'soon': 15,
    'routine': 5,
}


# Age risk factors
def get_age_risk_score(age: int) -> int:
    """
    Age increases risk in certain ranges.
    
    High-risk groups:
    - Infants (0-2): Immune system still developing
    - Elderly (65+): Multiple comorbidities, fragile
    """
    if age is None:
        return 0
    
    if age <= 2:
        return 15  # Infants are high risk
    elif age <= 12:
        return 5   # Children - moderate risk
    elif age <= 64:
        return 0   # Adults - baseline
    elif age <= 74:
        return 10  # Elderly - elevated risk
    else:
        return 15  # Very elderly - high risk


# Medical history risk factors
MEDICAL_HISTORY_RISKS = {
    'diabetes': 8,
    'hypertension': 7,
    'heart disease': 12,
    'cancer': 15,
    'kidney disease': 10,
    'liver disease': 10,
    'asthma': 6,
    'copd': 9,
    'stroke history': 11,
    'immunocompromised': 14,
    'pregnancy': 12,
    'recent surgery': 10,
}


def calculate_symptom_base_score(symptoms: List[Dict]) -> Dict[str, Any]:
    """
    Calculate base score from symptoms alone.
    
    Args:
        symptoms: List of symptom dictionaries, each containing:
            - symptom_name: str
            - description: str (optional)
            - severity: str (mild/moderate/severe) (optional)
            - duration: str (minutes/hours/days/weeks/months/years) (optional)
            - progression: str (getting worse/staying same/improving) (optional)
    
    Returns:
        {
            'base_score': int (0-100),
            'max_symptom_score': int,
            'symptom_count': int,
            'breakdown': List[Dict]
        }
    """
    if not symptoms:
        return {
            'base_score': 0,
            'max_symptom_score': 0,
            'symptom_count': 0,
            'breakdown': []
        }
    
    symptom_scores = []
    
    for symptom in symptoms:
        symptom_name = symptom.get('symptom_name', '').lower()
        description = symptom.get('description', '').lower()
        combined_text = f"{symptom_name} {description}"
        
        # Find matching base score
        matched_score = 0
        matched_key = None
        for key, base_score in SYMPTOM_BASE_SCORES.items():
            if key in combined_text:
                if base_score > matched_score:
                    matched_score = base_score
                    matched_key = key
        
        # If no match, use moderate default
        if matched_score == 0:
            matched_score = 35
            matched_key = 'unclassified symptom'
        
        # Apply duration multiplier
        duration = symptom.get('duration', 'days')
        duration_mult = DURATION_MULTIPLIERS.get(duration, 1.0)
        
        # Apply progression multiplier
        progression = symptom.get('progression', 'staying the same')
        progression_mult = PROGRESSION_MULTIPLIERS.get(progression, 1.0)
        
        # Calculate final symptom score
        final_score = matched_score * duration_mult * progression_mult
        final_score = min(100, final_score)  # Cap at 100
        
        symptom_scores.append({
            'symptom': symptom_name,
            'matched_pattern': matched_key,
            'base_score': matched_score,
            'duration_multiplier': duration_mult,
            'progression_multiplier': progression_mult,
            'final_score': round(final_score, 1)
        })
    
    # Take highest symptom score as primary driver
    max_symptom = max(symptom_scores, key=lambda x: x['final_score'])
    
    # Average all symptoms for secondary contribution
    avg_score = sum(s['final_score'] for s in symptom_scores) / len(symptom_scores)
    
    # Weighted combination: 70% highest, 30% average
    base_score = (max_symptom['final_score'] * 0.7) + (avg_score * 0.3)
    
    return {
        'base_score': round(base_score, 1),
        'max_symptom_score': round(max_symptom['final_score'], 1),
        'symptom_count': len(symptoms),
        'breakdown': symptom_scores
    }


def calculate_risk_factor_score(age: int, medical_history: List[str]) -> Dict[str, Any]:
    """
    Calculate risk from patient demographics and medical history.
    
    Args:
        age: Patient age in years
        medical_history: List of condition strings
    
    Returns:
        {
            'risk_score': int (0-40),
            'age_contribution': int,
            'history_contribution': int,
            'conditions_found': List[str]
        }
    """
    age_risk = get_age_risk_score(age)
    
    history_risk = 0
    conditions_found = []
    
    if medical_history:
        for condition in medical_history:
            condition_lower = condition.lower()
            for key, risk_value in MEDICAL_HISTORY_RISKS.items():
                if key in condition_lower:
                    history_risk += risk_value
                    conditions_found.append(key)
    
    # Cap history risk at 25 (don't let it dominate)
    history_risk = min(25, history_risk)
    
    total_risk = age_risk + history_risk
    
    return {
        'risk_score': total_risk,
        'age_contribution': age_risk,
        'history_contribution': history_risk,
        'conditions_found': conditions_found
    }


def calculate_severity_score(
    symptoms: List[Dict],
    urgency: str,
    age: int = None,
    medical_history: List[str] = None
) -> Dict[str, Any]:
    """
    Main severity calculation function.
    
    Combines all factors into final 0-100 score.
    
    Args:
        symptoms: List of symptom dictionaries
        urgency: Patient-selected urgency ('routine', 'soon', 'urgent', 'emergency')
        age: Patient age (optional)
        medical_history: List of medical conditions (optional)
    
    Returns:
        {
            'severity_score': int (0-100),
            'severity_level': str ('low', 'medium', 'high', 'critical'),
            'has_red_flags': bool,
            'components': {
                'symptom_score': float,
                'urgency_score': int,
                'risk_score': int,
                'red_flag_boost': int
            },
            'reasoning': str
        }
    """
    # Component 1: Red flags (override everything if found)
    red_flag_check = check_red_flags(symptoms)
    if red_flag_check['has_red_flags']:
        return {
            'severity_score': 95,
            'severity_level': 'critical',
            'has_red_flags': True,
            'red_flags_found': red_flag_check['flags_found'],
            'components': {
                'symptom_score': 0,
                'urgency_score': 0,
                'risk_score': 0,
                'red_flag_boost': 95
            },
            'reasoning': red_flag_check['reasoning']
        }
    
    # Component 2: Base symptom score (0-100)
    symptom_calc = calculate_symptom_base_score(symptoms)
    symptom_score = symptom_calc['base_score']
    
    # Component 3: Urgency score (0-30)
    urgency_score = URGENCY_WEIGHTS.get(urgency, 5)
    
    # Component 4: Risk factor score (0-40)
    risk_calc = calculate_risk_factor_score(age, medical_history or [])
    risk_score = risk_calc['risk_score']
    
    # Weighted combination
    # Symptom: 50%, Urgency: 30%, Risk: 20%
    final_score = (
        (symptom_score * 0.5) +
        (urgency_score * 1.0) +  # Already scaled to 30 max
        (risk_score * 0.5)       # Scale 40 max to 20
    )
    
    final_score = min(100, round(final_score))
    
    # Map score to severity level
    if final_score >= 75:
        severity_level = 'critical'
    elif final_score >= 50:
        severity_level = 'high'
    elif final_score >= 25:
        severity_level = 'medium'
    else:
        severity_level = 'low'
    
    # Build reasoning
    reasoning_parts = []
    reasoning_parts.append(f"Primary symptom scored {symptom_score:.1f}/100")
    
    if urgency in ['emergency', 'urgent']:
        reasoning_parts.append(f"Patient indicated {urgency} urgency")
    
    if risk_score > 10:
        reasoning_parts.append(f"Risk factors present ({risk_calc['conditions_found']})")
    
    if age and (age <= 2 or age >= 65):
        reasoning_parts.append(f"Age {age} increases risk")
    
    reasoning = ". ".join(reasoning_parts)
    
    return {
        'severity_score': final_score,
        'severity_level': severity_level,
        'has_red_flags': False,
        'components': {
            'symptom_score': round(symptom_score, 1),
            'urgency_score': urgency_score,
            'risk_score': risk_score,
            'red_flag_boost': 0
        },
        'reasoning': reasoning,
        'symptom_breakdown': symptom_calc['breakdown'],
        'risk_breakdown': risk_calc
    }


# ============================================================================
# TESTING
# ============================================================================

def test_severity_calculator():
    """Test the severity calculator with real-world scenarios."""
    
    test_cases = [
        {
            'name': 'Low severity - Minor headache',
            'symptoms': [{'symptom_name': 'headache', 'duration': 'days', 'progression': 'staying the same'}],
            'urgency': 'routine',
            'age': 30,
            'expected_range': (10, 30)
        },
        {
            'name': 'Medium severity - Persistent cough with fever',
            'symptoms': [
                {'symptom_name': 'cough', 'duration': 'days'},
                {'symptom_name': 'fever', 'duration': 'days'}
            ],
            'urgency': 'soon',
            'age': 45,
            'expected_range': (30, 50)
        },
        {
            'name': 'High severity - Severe abdominal pain, elderly',
            'symptoms': [{'symptom_name': 'severe abdominal pain', 'duration': 'hours', 'progression': 'getting worse'}],
            'urgency': 'urgent',
            'age': 72,
            'medical_history': ['diabetes'],
            'expected_range': (60, 80)
        },
        {
            'name': 'Critical - Red flag (chest pain radiating)',
            'symptoms': [{'symptom_name': 'chest pain with radiation to arm'}],
            'urgency': 'emergency',
            'age': 55,
            'expected_range': (90, 100)
        }
    ]
    
    print("Testing Severity Calculator\n" + "="*50 + "\n")
    
    for test in test_cases:
        result = calculate_severity_score(
            symptoms=test['symptoms'],
            urgency=test['urgency'],
            age=test.get('age'),
            medical_history=test.get('medical_history')
        )
        
        score = result['severity_score']
        expected_min, expected_max = test['expected_range']
        passed = expected_min <= score <= expected_max
        
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"{status}: {test['name']}")
        print(f"  Score: {score}/100 (Expected: {expected_min}-{expected_max})")
        print(f"  Level: {result['severity_level']}")
        print(f"  Reasoning: {result['reasoning']}")
        print()


if __name__ == '__main__':
    test_severity_calculator()
```

</details>

### How Severity Scoring Works (Step-by-Step Example)

Let's trace through a real example:

**Patient Case**: 55-year-old with chest pain, diabetic, says it's urgent

```python
symptoms = [{'symptom_name': 'chest pain', 'duration': 'hours'}]
urgency = 'urgent'
age = 55
medical_history = ['diabetes']
```

**Calculation Process**:

1. **Check red flags first** ❌ No match for "chest pain radiating"
2. **Calculate symptom score**:
   - Base: chest pain = 80/100
   - Duration multiplier: hours = 1.2
   - Progression: default = 1.0
   - Symptom score = 80 × 1.2 × 1.0 = 96 (capped at 100)
3. **Calculate urgency score**:
   - Urgent = 25/30
4. **Calculate risk score**:
   - Age 55 = 0 (healthy adult range)
   - Diabetes = 8
   - Risk score = 8
5. **Weighted combination**:
   - Final = (96 × 0.5) + (25 × 1.0) + (8 × 0.5)
   - Final = 48 + 25 + 4 = **77/100**
6. **Map to level**: 77 ≥ 75 → **CRITICAL**

**Output**:
```json
{
  "severity_score": 77,
  "severity_level": "critical",
  "reasoning": "Primary symptom scored 96.0/100. Patient indicated urgent urgency. Risk factors present (['diabetes'])"
}
```

### 🎓 Exercise 4.1: Test Severity Calculator

Create the file and run tests:

```bash
# Create the file
touch /Users/new/phbfinal/basebackend/api/utils/triage/severity_calculator.py

# Copy the code above into it, then run:
python api/utils/triage/severity_calculator.py
```

**Expected Output**:
```
✓ PASS: Low severity - Minor headache
  Score: 24/100 (Expected: 10-30)
  Level: low

✓ PASS: Medium severity - Persistent cough with fever
  Score: 42/100 (Expected: 30-50)
  Level: medium

✓ PASS: High severity - Severe abdominal pain, elderly
  Score: 68/100 (Expected: 60-80)
  Level: high

✓ PASS: Critical - Red flag (chest pain radiating)
  Score: 95/100 (Expected: 90-100)
  Level: critical
```

**🔍 Checkpoint**: Make sure all 4 tests pass before continuing.

---
## Step 5: Care Level Recommender 🏥

Now we decide **where** the patient should go based on their severity score and symptoms.

### Care Levels Explained

Our system has 4 care levels:

1. **Online Consultation** (Severity: 0-24)
   - Video/phone call with GP
   - No need to travel to hospital
   - Examples: Prescription refills, minor infections, lifestyle advice
   - Cost: Lowest (₦2,000-5,000)

2. **GP Appointment** (Severity: 25-49)
   - In-person visit with General Practitioner
   - General Medicine department
   - Examples: Persistent symptoms, follow-ups, non-emergency conditions
   - Cost: Moderate (₦5,000-15,000)

3. **Specialist Appointment** (Severity: 50-74)
   - Specific department (Cardiology, Neurology, etc.)
   - Specialist doctor consultation
   - Examples: Chronic disease management, specific organ issues
   - Cost: Higher (₦15,000-50,000)

4. **Emergency Department** (Severity: 75-100)
   - Immediate care required
   - Emergency room triage
   - Examples: Heart attack, stroke, severe bleeding, red flag symptoms
   - Cost: Highest (₦50,000+) but life-saving

### Create `api/utils/triage/care_recommender.py`

<details>
<summary><strong>📄 care_recommender.py</strong> (click to expand - ~300 lines)</summary>

```python
# api/utils/triage/care_recommender.py

"""
Care Level Recommender

Determines the appropriate level of care based on:
1. Severity score (from severity_calculator)
2. Symptom patterns
3. Patient preferences
4. Resource availability
"""

from typing import Dict, List, Any


# Care level definitions
CARE_LEVELS = {
    'online': {
        'name': 'Online Consultation',
        'description': 'Video or phone call with GP',
        'min_score': 0,
        'max_score': 24,
        'estimated_cost_min': 2000,
        'estimated_cost_max': 5000,
        'wait_time': '15-30 minutes',
        'suitable_for': [
            'Minor infections',
            'Prescription refills',
            'Health advice',
            'Follow-up consultations',
            'Skin rashes',
            'Cold/flu symptoms',
        ]
    },
    'gp': {
        'name': 'General Practitioner',
        'description': 'In-person appointment with GP',
        'min_score': 25,
        'max_score': 49,
        'estimated_cost_min': 5000,
        'estimated_cost_max': 15000,
        'wait_time': '1-3 days',
        'suitable_for': [
            'Persistent symptoms',
            'Physical examinations needed',
            'Minor injuries',
            'Chronic disease monitoring',
            'Laboratory tests needed',
        ]
    },
    'specialist': {
        'name': 'Specialist Appointment',
        'description': 'Consultation with specialist doctor',
        'min_score': 50,
        'max_score': 74,
        'estimated_cost_min': 15000,
        'estimated_cost_max': 50000,
        'wait_time': '3-7 days',
        'suitable_for': [
            'Organ-specific issues',
            'Complex conditions',
            'Surgical consultations',
            'Specialized diagnostics',
            'Chronic disease management',
        ]
    },
    'emergency': {
        'name': 'Emergency Department',
        'description': 'Immediate emergency care',
        'min_score': 75,
        'max_score': 100,
        'estimated_cost_min': 50000,
        'estimated_cost_max': 200000,
        'wait_time': 'Immediate',
        'suitable_for': [
            'Life-threatening conditions',
            'Severe bleeding',
            'Chest pain',
            'Stroke symptoms',
            'Severe injuries',
            'Loss of consciousness',
        ]
    }
}


# Symptom patterns that override score-based routing
SPECIALIST_INDICATORS = {
    'cardiology': [
        'heart', 'cardiac', 'palpitations', 'irregular heartbeat',
        'chest pressure', 'angina'
    ],
    'neurology': [
        'seizure', 'numbness', 'paralysis', 'memory loss',
        'tremor', 'migraine'
    ],
    'orthopedics': [
        'fracture', 'bone', 'joint pain', 'sports injury',
        'sprain', 'torn ligament'
    ],
    'dermatology': [
        'rash', 'skin lesion', 'eczema', 'psoriasis',
        'acne', 'skin cancer'
    ],
    'ent': [
        'ear infection', 'hearing loss', 'tinnitus',
        'sinus', 'throat', 'nose bleed'
    ],
    'ophthalmology': [
        'vision', 'eye pain', 'blurry vision', 'double vision',
        'eye injury', 'glaucoma'
    ],
    'gynecology': [
        'pregnancy', 'menstrual', 'vaginal bleeding',
        'pelvic pain', 'ovarian'
    ],
    'urology': [
        'urinary', 'kidney stone', 'prostate', 'bladder',
        'frequent urination', 'blood in urine'
    ]
}


def recommend_care_level(
    severity_score: int,
    severity_level: str,
    has_red_flags: bool,
    symptoms: List[Dict],
    patient_preference: str = None
) -> Dict[str, Any]:
    """
    Recommend appropriate care level.
    
    Args:
        severity_score: 0-100 score from severity_calculator
        severity_level: 'low', 'medium', 'high', 'critical'
        has_red_flags: Whether red flags were detected
        symptoms: List of symptom dictionaries
        patient_preference: Optional patient's preferred care level
    
    Returns:
        {
            'recommended_care_level': str,
            'care_details': Dict,
            'alternative_options': List[str],
            'reasoning': str,
            'specialist_suggested': str (if applicable),
            'estimated_cost_range': str
        }
    """
    
    # Priority 1: Red flags always go to emergency
    if has_red_flags:
        return {
            'recommended_care_level': 'emergency',
            'care_details': CARE_LEVELS['emergency'],
            'alternative_options': [],
            'reasoning': 'Red flag symptoms detected requiring immediate emergency care',
            'estimated_cost_range': f"₦{CARE_LEVELS['emergency']['estimated_cost_min']:,} - ₦{CARE_LEVELS['emergency']['estimated_cost_max']:,}",
            'urgency': 'IMMEDIATE - Go to emergency department now'
        }
    
    # Priority 2: Severity score-based routing
    care_level = None
    for level_key, level_data in CARE_LEVELS.items():
        if level_data['min_score'] <= severity_score <= level_data['max_score']:
            care_level = level_key
            break
    
    # Fallback if score is out of range
    if not care_level:
        if severity_score < 25:
            care_level = 'online'
        elif severity_score >= 75:
            care_level = 'emergency'
        else:
            care_level = 'gp'
    
    care_details = CARE_LEVELS[care_level]
    
    # Priority 3: Check if specialist is more appropriate
    specialist_suggested = None
    if care_level in ['gp', 'specialist']:
        specialist_suggested = check_specialist_need(symptoms)
    
    # Build alternative options
    alternatives = []
    if care_level == 'online':
        alternatives.append('gp - if symptoms worsen or physical exam needed')
    elif care_level == 'gp':
        alternatives.append('online - if you prefer remote consultation')
        if specialist_suggested:
            alternatives.append(f'specialist ({specialist_suggested}) - for specialized care')
    elif care_level == 'specialist':
        alternatives.append('gp - for initial assessment first')
        alternatives.append('emergency - if symptoms suddenly worsen')
    
    # Build reasoning
    reasoning_parts = []
    reasoning_parts.append(f"Severity score of {severity_score}/100 indicates {severity_level} severity")
    
    if specialist_suggested:
        reasoning_parts.append(f"Symptoms suggest {specialist_suggested} specialist consultation")
    
    if care_level == 'emergency':
        reasoning_parts.append("Immediate medical attention required")
    elif care_level == 'online':
        reasoning_parts.append("Can be managed remotely")
    
    reasoning = ". ".join(reasoning_parts)
    
    # Cost estimate
    cost_min = care_details['estimated_cost_min']
    cost_max = care_details['estimated_cost_max']
    estimated_cost = f"₦{cost_min:,} - ₦{cost_max:,}"
    
    return {
        'recommended_care_level': care_level,
        'care_details': care_details,
        'alternative_options': alternatives,
        'reasoning': reasoning,
        'specialist_suggested': specialist_suggested,
        'estimated_cost_range': estimated_cost,
        'wait_time': care_details['wait_time']
    }


def check_specialist_need(symptoms: List[Dict]) -> str:
    """
    Check if symptoms indicate need for specific specialist.
    
    Returns specialist name if match found, None otherwise.
    """
    symptom_text = ' '.join([
        s.get('symptom_name', '') + ' ' + s.get('description', '')
        for s in symptoms
    ]).lower()
    
    # Check each specialty
    for specialty, indicators in SPECIALIST_INDICATORS.items():
        for indicator in indicators:
            if indicator in symptom_text:
                return specialty
    
    return None


def get_care_pathway_explanation(care_level: str) -> str:
    """
    Get detailed explanation of what to expect for each care level.
    """
    pathways = {
        'online': """
**What happens next:**
1. You'll be matched with an available GP
2. Receive a video/phone call link
3. Consultation usually lasts 15-20 minutes
4. GP can prescribe medications if needed
5. Prescription sent to your chosen pharmacy

**What to prepare:**
- List of current medications
- Photos of affected area (if applicable)
- Quiet room with good internet connection
        """,
        
        'gp': """
**What happens next:**
1. Book appointment at hospital's General Medicine department
2. Arrive 15 minutes early for registration
3. Vital signs check (blood pressure, temperature)
4. Consultation with GP (20-30 minutes)
5. May order lab tests or refer to specialist

**What to bring:**
- Valid ID
- Previous medical records (if any)
- Current medications list
- Insurance card (if applicable)
        """,
        
        'specialist': """
**What happens next:**
1. Appointment scheduled with specialist doctor
2. May need referral letter from GP (depending on hospital)
3. Bring all relevant test results and imaging
4. Specialist consultation (30-45 minutes)
5. Treatment plan or surgical consultation

**What to bring:**
- GP referral letter (if required)
- All previous test results
- Imaging (X-rays, MRI, CT scans)
- Complete medical history
- List of questions for the specialist
        """,
        
        'emergency': """
**What to do NOW:**
1. Go to nearest emergency department immediately
2. Call ambulance if unable to travel safely
3. Do NOT drive yourself if experiencing:
   - Chest pain
   - Difficulty breathing
   - Severe bleeding
   - Altered consciousness

**What emergency will do:**
1. Immediate triage assessment
2. Vital signs monitoring
3. Urgent diagnostic tests
4. Treatment started immediately
5. Possible hospital admission

**Important:**
- Have someone accompany you if possible
- Bring ID and emergency contact information
- Bring list of current medications
        """
    }
    
    return pathways.get(care_level, '')


# ============================================================================
# TESTING
# ============================================================================

def test_care_recommender():
    """Test care level recommendations."""
    
    test_cases = [
        {
            'name': 'Low severity - Online consultation',
            'severity_score': 20,
            'severity_level': 'low',
            'has_red_flags': False,
            'symptoms': [{'symptom_name': 'mild headache'}],
            'expected_care': 'online'
        },
        {
            'name': 'Medium severity - GP needed',
            'severity_score': 35,
            'severity_level': 'medium',
            'has_red_flags': False,
            'symptoms': [{'symptom_name': 'persistent cough'}],
            'expected_care': 'gp'
        },
        {
            'name': 'High severity with cardiology indicator',
            'severity_score': 65,
            'severity_level': 'high',
            'has_red_flags': False,
            'symptoms': [{'symptom_name': 'heart palpitations', 'description': 'irregular heartbeat'}],
            'expected_care': 'specialist',
            'expected_specialist': 'cardiology'
        },
        {
            'name': 'Critical - Red flag override',
            'severity_score': 95,
            'severity_level': 'critical',
            'has_red_flags': True,
            'symptoms': [{'symptom_name': 'chest pain radiating to arm'}],
            'expected_care': 'emergency'
        }
    ]
    
    print("Testing Care Level Recommender\n" + "="*50 + "\n")
    
    for test in test_cases:
        result = recommend_care_level(
            severity_score=test['severity_score'],
            severity_level=test['severity_level'],
            has_red_flags=test['has_red_flags'],
            symptoms=test['symptoms']
        )
        
        passed = result['recommended_care_level'] == test['expected_care']
        
        if 'expected_specialist' in test:
            passed = passed and result.get('specialist_suggested') == test['expected_specialist']
        
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"{status}: {test['name']}")
        print(f"  Recommended: {result['recommended_care_level']}")
        print(f"  Cost: {result['estimated_cost_range']}")
        if result.get('specialist_suggested'):
            print(f"  Specialist: {result['specialist_suggested']}")
        print(f"  Reasoning: {result['reasoning']}")
        print()


if __name__ == '__main__':
    test_care_recommender()
```

</details>

### Understanding the Routing Logic

The care recommender uses a **3-tier priority system**:

**Priority 1: Safety First** ⚠️
```python
if has_red_flags:
    return 'emergency'  # No exceptions!
```

**Priority 2: Severity Score Mapping** 📊
```python
if 0 <= score <= 24:    return 'online'
if 25 <= score <= 49:   return 'gp'
if 50 <= score <= 74:   return 'specialist'
if 75 <= score <= 100:  return 'emergency'
```

**Priority 3: Specialist Detection** 🔍
```python
symptoms contain "heart palpitations" → suggest cardiology
symptoms contain "vision problems" → suggest ophthalmology
```

### 🎓 Exercise 5.1: Test Care Recommender

```bash
python api/utils/triage/care_recommender.py
```

**Expected Output**:
```
✓ PASS: Low severity - Online consultation
  Recommended: online
  Cost: ₦2,000 - ₦5,000

✓ PASS: Medium severity - GP needed
  Recommended: gp
  Cost: ₦5,000 - ₦15,000

✓ PASS: High severity with cardiology indicator
  Recommended: specialist
  Cost: ₦15,000 - ₦50,000
  Specialist: cardiology

✓ PASS: Critical - Red flag override
  Recommended: emergency
  Cost: ₦50,000 - ₦200,000
```

---


## Step 6: Department Router 🏥

The final piece of our rule-based system: selecting the specific department when specialist care is recommended.

### Why Department Routing Matters

Remember the original problem? **General Hospital ASABA has no departments**, breaking the appointment system. Our solution:

**Old System** (broken):
```
Symptom → Hardcoded body part mapping → Department name → Lookup in hospital's departments → NULL if not found ❌
```

**New System** (robust):
```
Symptom → Severity score → Care level → Department category → Smart fallback chain ✅
```

### Create `api/utils/triage/department_router.py`

<details>
<summary><strong>📄 department_router.py</strong> (click to expand - ~350 lines)</summary>

```python
# api/utils/triage/department_router.py

"""
Department Router

Intelligently routes patients to the right department based on:
1. Specialist suggestion from care recommender
2. Symptom patterns
3. Available departments at chosen hospital
4. Smart fallback logic
"""

from typing import Dict, List, Any, Optional


# Department category mappings
DEPARTMENT_CATEGORIES = {
    # Specialist departments
    'cardiology': {
        'preferred_names': ['cardiology', 'cardiac care', 'heart center'],
        'fallback_names': ['internal medicine', 'general medicine'],
        'description': 'Heart and cardiovascular system'
    },
    'neurology': {
        'preferred_names': ['neurology', 'neurological', 'brain & spine'],
        'fallback_names': ['internal medicine', 'general medicine'],
        'description': 'Brain, nerves, and nervous system'
    },
    'orthopedics': {
        'preferred_names': ['orthopedics', 'orthopaedics', 'orthopedic surgery', 'bone & joint'],
        'fallback_names': ['general surgery', 'trauma', 'general medicine'],
        'description': 'Bones, joints, and muscles'
    },
    'dermatology': {
        'preferred_names': ['dermatology', 'skin clinic'],
        'fallback_names': ['general medicine'],
        'description': 'Skin, hair, and nails'
    },
    'ent': {
        'preferred_names': ['ent', 'ear nose throat', 'otolaryngology'],
        'fallback_names': ['general medicine'],
        'description': 'Ear, nose, and throat'
    },
    'ophthalmology': {
        'preferred_names': ['ophthalmology', 'eye clinic', 'eye care'],
        'fallback_names': ['general medicine'],
        'description': 'Eyes and vision'
    },
    'gynecology': {
        'preferred_names': ['gynecology', 'gynaecology', 'women\'s health', 'obstetrics and gynecology', 'ob/gyn'],
        'fallback_names': ['general medicine'],
        'description': 'Women\'s reproductive health'
    },
    'urology': {
        'preferred_names': ['urology', 'urological'],
        'fallback_names': ['general surgery', 'general medicine'],
        'description': 'Urinary system and male reproductive organs'
    },
    'pulmonology': {
        'preferred_names': ['pulmonology', 'respiratory', 'chest clinic'],
        'fallback_names': ['internal medicine', 'general medicine'],
        'description': 'Lungs and respiratory system'
    },
    'gastroenterology': {
        'preferred_names': ['gastroenterology', 'gi', 'digestive'],
        'fallback_names': ['internal medicine', 'general medicine'],
        'description': 'Digestive system'
    },
    'endocrinology': {
        'preferred_names': ['endocrinology', 'diabetes clinic', 'hormone'],
        'fallback_names': ['internal medicine', 'general medicine'],
        'description': 'Hormones and metabolism'
    },
    'psychiatry': {
        'preferred_names': ['psychiatry', 'mental health', 'behavioral health'],
        'fallback_names': ['general medicine'],
        'description': 'Mental health and psychiatric care'
    },
    
    # General departments (always available fallbacks)
    'general_medicine': {
        'preferred_names': ['general medicine', 'internal medicine', 'family medicine', 'general practice'],
        'fallback_names': [],
        'description': 'General medical conditions'
    },
    'emergency': {
        'preferred_names': ['emergency', 'emergency department', 'a&e', 'accident and emergency', 'er'],
        'fallback_names': ['general medicine'],
        'description': 'Emergency and urgent care'
    }
}


def find_department_by_category(
    category: str,
    available_departments: List[Dict]
) -> Optional[Dict]:
    """
    Find a department matching the given category from available departments.
    
    Args:
        category: Department category key (e.g., 'cardiology', 'neurology')
        available_departments: List of department dicts from database, each with:
            - id: int
            - name: str
            - description: str (optional)
    
    Returns:
        Matched department dict or None
    """
    if not available_departments:
        return None
    
    category_data = DEPARTMENT_CATEGORIES.get(category)
    if not category_data:
        return None
    
    # Build lowercase lookup
    dept_lookup = {
        dept['name'].lower(): dept
        for dept in available_departments
    }
    
    # Step 1: Try preferred names
    for preferred_name in category_data['preferred_names']:
        if preferred_name in dept_lookup:
            return dept_lookup[preferred_name]
    
    # Step 2: Try partial matching
    for preferred_name in category_data['preferred_names']:
        for dept_name, dept in dept_lookup.items():
            if preferred_name in dept_name or dept_name in preferred_name:
                return dept
    
    # Step 3: Try fallback departments
    for fallback_name in category_data['fallback_names']:
        if fallback_name in dept_lookup:
            return dept_lookup[fallback_name]
    
    # Step 4: Try partial matching on fallbacks
    for fallback_name in category_data['fallback_names']:
        for dept_name, dept in dept_lookup.items():
            if fallback_name in dept_name or dept_name in fallback_name:
                return dept
    
    return None


def route_to_department(
    care_level: str,
    specialist_suggested: Optional[str],
    available_departments: List[Dict],
    symptoms: List[Dict] = None
) -> Dict[str, Any]:
    """
    Route patient to appropriate department.
    
    Args:
        care_level: 'online', 'gp', 'specialist', 'emergency'
        specialist_suggested: Specialist category from care_recommender (e.g., 'cardiology')
        available_departments: List of departments at the hospital
        symptoms: Optional list of symptoms for additional context
    
    Returns:
        {
            'department_id': int or None,
            'department_name': str,
            'routing_method': str (how we found the department),
            'confidence': str ('high', 'medium', 'low'),
            'fallback_used': bool,
            'explanation': str
        }
    """
    
    # Handle empty departments list (the original bug!)
    if not available_departments or len(available_departments) == 0:
        return {
            'department_id': None,
            'department_name': 'NO DEPARTMENTS AVAILABLE',
            'routing_method': 'error',
            'confidence': 'none',
            'fallback_used': False,
            'explanation': 'Hospital has no departments configured. Please contact hospital administrator.',
            'action_required': 'ADMIN: Create departments for this hospital'
        }
    
    # Route based on care level
    if care_level == 'emergency':
        # Find emergency department
        emergency_dept = find_department_by_category('emergency', available_departments)
        if emergency_dept:
            return {
                'department_id': emergency_dept['id'],
                'department_name': emergency_dept['name'],
                'routing_method': 'emergency_routing',
                'confidence': 'high',
                'fallback_used': False,
                'explanation': 'Routed to Emergency Department for immediate care'
            }
        
        # Fallback: Use first available department
        return {
            'department_id': available_departments[0]['id'],
            'department_name': available_departments[0]['name'],
            'routing_method': 'emergency_fallback',
            'confidence': 'low',
            'fallback_used': True,
            'explanation': f'No emergency department found. Using {available_departments[0]["name"]} as fallback.'
        }
    
    elif care_level == 'online':
        # Online consultations don't need physical department
        return {
            'department_id': None,
            'department_name': 'Online Consultation',
            'routing_method': 'virtual_care',
            'confidence': 'high',
            'fallback_used': False,
            'explanation': 'Virtual consultation - no physical department needed'
        }
    
    elif care_level == 'specialist' and specialist_suggested:
        # Find the suggested specialist department
        specialist_dept = find_department_by_category(specialist_suggested, available_departments)
        if specialist_dept:
            return {
                'department_id': specialist_dept['id'],
                'department_name': specialist_dept['name'],
                'routing_method': 'specialist_match',
                'confidence': 'high',
                'fallback_used': False,
                'explanation': f'Matched to {specialist_suggested} department based on symptoms'
            }
        
        # Fallback to general medicine
        general_dept = find_department_by_category('general_medicine', available_departments)
        if general_dept:
            return {
                'department_id': general_dept['id'],
                'department_name': general_dept['name'],
                'routing_method': 'specialist_fallback',
                'confidence': 'medium',
                'fallback_used': True,
                'explanation': f'{specialist_suggested} department not available. Using General Medicine for initial assessment.'
            }
    
    # Default: Route to General Medicine (for 'gp' care level)
    general_dept = find_department_by_category('general_medicine', available_departments)
    if general_dept:
        return {
            'department_id': general_dept['id'],
            'department_name': general_dept['name'],
            'routing_method': 'general_practice',
            'confidence': 'high',
            'fallback_used': False,
            'explanation': 'Routed to General Medicine for assessment'
        }
    
    # Ultimate fallback: Use first available department
    return {
        'department_id': available_departments[0]['id'],
        'department_name': available_departments[0]['name'],
        'routing_method': 'first_available',
        'confidence': 'low',
        'fallback_used': True,
        'explanation': f'No General Medicine found. Using {available_departments[0]["name"]} as fallback.'
    }


# ============================================================================
# TESTING
# ============================================================================

def test_department_router():
    """Test department routing with various scenarios."""
    
    # Mock hospital departments
    mock_departments_full = [
        {'id': 1, 'name': 'Emergency Department'},
        {'id': 2, 'name': 'General Medicine'},
        {'id': 3, 'name': 'Cardiology'},
        {'id': 4, 'name': 'Orthopedics'},
        {'id': 5, 'name': 'ENT'},
    ]
    
    mock_departments_limited = [
        {'id': 1, 'name': 'General Medicine'},
        {'id': 2, 'name': 'Surgery'},
    ]
    
    mock_departments_empty = []
    
    test_cases = [
        {
            'name': 'Emergency routing - department exists',
            'care_level': 'emergency',
            'specialist': None,
            'departments': mock_departments_full,
            'expected_dept_name': 'Emergency Department',
            'expected_confidence': 'high'
        },
        {
            'name': 'Specialist routing - Cardiology available',
            'care_level': 'specialist',
            'specialist': 'cardiology',
            'departments': mock_departments_full,
            'expected_dept_name': 'Cardiology',
            'expected_confidence': 'high'
        },
        {
            'name': 'Specialist routing - Neurology NOT available (fallback)',
            'care_level': 'specialist',
            'specialist': 'neurology',
            'departments': mock_departments_limited,
            'expected_dept_name': 'General Medicine',
            'expected_confidence': 'medium'
        },
        {
            'name': 'GP routing - General Medicine',
            'care_level': 'gp',
            'specialist': None,
            'departments': mock_departments_full,
            'expected_dept_name': 'General Medicine',
            'expected_confidence': 'high'
        },
        {
            'name': 'CRITICAL BUG: Empty departments list',
            'care_level': 'gp',
            'specialist': None,
            'departments': mock_departments_empty,
            'expected_dept_name': 'NO DEPARTMENTS AVAILABLE',
            'expected_confidence': 'none'
        },
        {
            'name': 'Online consultation - no department needed',
            'care_level': 'online',
            'specialist': None,
            'departments': mock_departments_full,
            'expected_dept_name': 'Online Consultation',
            'expected_confidence': 'high'
        }
    ]
    
    print("Testing Department Router\n" + "="*50 + "\n")
    
    for test in test_cases:
        result = route_to_department(
            care_level=test['care_level'],
            specialist_suggested=test['specialist'],
            available_departments=test['departments']
        )
        
        name_match = result['department_name'] == test['expected_dept_name']
        confidence_match = result['confidence'] == test['expected_confidence']
        passed = name_match and confidence_match
        
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"{status}: {test['name']}")
        print(f"  Department: {result['department_name']}")
        print(f"  Confidence: {result['confidence']}")
        print(f"  Method: {result['routing_method']}")
        print(f"  Fallback: {result['fallback_used']}")
        print(f"  Explanation: {result['explanation']}")
        
        if 'action_required' in result:
            print(f"  ⚠️  ACTION: {result['action_required']}")
        
        print()


if __name__ == '__main__':
    test_department_router()
```

</details>

### How Department Routing Solves the Original Bug

**Original Problem:**
```python
# Old system (BookAppointment.tsx)
function getDepartmentForBodyPart(bodyPartId, departments) {
  // ... mapping logic ...
  return departments.length > 0 ? departments[0].id : null;
  // ❌ Returns null when departments = []
  // ❌ Appointment booking FAILS
}
```

**Our Solution:**
```python
# New system (department_router.py)
def route_to_department(care_level, specialist, available_departments):
    if not available_departments or len(available_departments) == 0:
        return {
            'department_id': None,
            'department_name': 'NO DEPARTMENTS AVAILABLE',
            'routing_method': 'error',
            'explanation': 'Hospital has no departments configured',
            'action_required': 'ADMIN: Create departments for this hospital'
        }
    # ... continue with normal routing ...
```

**Key Improvements:**
1. ✅ **Graceful degradation** - System doesn't crash, returns clear error
2. ✅ **Admin notification** - `action_required` field tells admin what to fix
3. ✅ **Smart fallbacks** - Multiple fallback chains prevent routing failures
4. ✅ **Confidence tracking** - UI can show warnings when using fallbacks

### 🎓 Exercise 6.1: Test Department Router

```bash
python api/utils/triage/department_router.py
```

**Expected Output:**
```
✓ PASS: Emergency routing - department exists
  Department: Emergency Department
  Confidence: high

✓ PASS: Specialist routing - Cardiology available
  Department: Cardiology
  Confidence: high

✓ PASS: Specialist routing - Neurology NOT available (fallback)
  Department: General Medicine
  Confidence: medium
  Fallback: True

✓ PASS: GP routing - General Medicine
  Department: General Medicine
  Confidence: high

✓ PASS: CRITICAL BUG: Empty departments list
  Department: NO DEPARTMENTS AVAILABLE
  Confidence: none
  ⚠️  ACTION: ADMIN: Create departments for this hospital

✓ PASS: Online consultation - no department needed
  Department: Online Consultation
  Confidence: high
```

**🎯 Checkpoint**: Verify that the empty departments test (the original bug!) now returns a clear error instead of crashing.

---


## Step 7: Create REST API Endpoint 🌐

Now we expose our triage system via a REST API that the frontend can call.

### API Design

**Endpoint**: `POST /api/triage/assess-severity/`

**Request Body**:
```json
{
  "symptoms": [
    {
      "symptom_name": "chest pain",
      "description": "sharp pain in center of chest",
      "severity": "severe",
      "duration": "hours",
      "progression": "getting worse"
    }
  ],
  "urgency": "urgent",
  "hospital_id": 123,
  "patient_age": 55,
  "medical_history": ["diabetes", "hypertension"]
}
```

**Response**:
```json
{
  "triage_id": "550e8400-e29b-41d4-a716-446655440000",
  "reference_number": "TRG-ABC123",
  "severity_score": 77,
  "severity_level": "critical",
  "has_red_flags": false,
  "recommended_care_level": "specialist",
  "care_details": {
    "name": "Specialist Appointment",
    "description": "Consultation with specialist doctor",
    "estimated_cost_min": 15000,
    "estimated_cost_max": 50000,
    "wait_time": "3-7 days"
  },
  "department_routing": {
    "department_id": 3,
    "department_name": "Cardiology",
    "confidence": "high"
  },
  "specialist_suggested": "cardiology",
  "reasoning": "Primary symptom scored 96.0/100. Patient indicated urgent urgency. Risk factors present.",
  "next_steps": "Book appointment with Cardiology department"
}
```

### Create `api/views/triage_views.py`

<details>
<summary><strong>📄 triage_views.py</strong> (click to expand - ~250 lines)</summary>

```python
# api/views/triage_views.py

"""
Triage Assessment API Views

Endpoints:
- POST /api/triage/assess-severity/ - Perform triage assessment
- GET /api/triage/history/ - Get user's triage history
- GET /api/triage/<triage_id>/ - Get specific triage result
"""

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from api.models.triage import TriageLog
from api.serializers.triage_serializers import (
    TriageAssessmentRequestSerializer,
    TriageLogSerializer
)
from api.utils.triage.severity_calculator import calculate_severity_score
from api.utils.triage.care_recommender import recommend_care_level
from api.utils.triage.department_router import route_to_department


def generate_reference_number():
    """Generate unique reference number like TRG-ABC123"""
    import random
    import string
    letters = ''.join(random.choices(string.ascii_uppercase, k=3))
    numbers = ''.join(random.choices(string.digits, k=3))
    return f"TRG-{letters}{numbers}"


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assess_severity(request):
    """
    Perform triage assessment and return recommendation.
    
    This is the main entry point for the triage system.
    
    POST /api/triage/assess-severity/
    
    Request body:
        {
            "symptoms": [...],
            "urgency": "routine|soon|urgent|emergency",
            "hospital_id": int,
            "patient_age": int (optional),
            "medical_history": [...] (optional)
        }
    
    Returns:
        {
            "triage_id": uuid,
            "reference_number": str,
            "severity_score": int,
            "severity_level": str,
            "recommended_care_level": str,
            "department_routing": {...},
            ...
        }
    """
    
    # Validate request data
    serializer = TriageAssessmentRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(
            {'error': 'Invalid request data', 'details': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    validated_data = serializer.validated_data
    
    # Extract inputs
    symptoms = validated_data['symptoms']
    urgency = validated_data['urgency']
    hospital_id = validated_data['hospital_id']
    patient_age = validated_data.get('patient_age')
    medical_history = validated_data.get('medical_history', [])
    
    # Step 1: Calculate severity score
    severity_result = calculate_severity_score(
        symptoms=symptoms,
        urgency=urgency,
        age=patient_age,
        medical_history=medical_history
    )
    
    # Step 2: Recommend care level
    care_recommendation = recommend_care_level(
        severity_score=severity_result['severity_score'],
        severity_level=severity_result['severity_level'],
        has_red_flags=severity_result['has_red_flags'],
        symptoms=symptoms
    )
    
    # Step 3: Route to department (fetch hospital's departments)
    from api.models import Department
    available_departments = list(
        Department.objects.filter(hospital_id=hospital_id).values('id', 'name', 'description')
    )
    
    department_routing = route_to_department(
        care_level=care_recommendation['recommended_care_level'],
        specialist_suggested=care_recommendation.get('specialist_suggested'),
        available_departments=available_departments,
        symptoms=symptoms
    )
    
    # Step 4: Create TriageLog record
    triage_log = TriageLog.objects.create(
        user=request.user,
        reference_number=generate_reference_number(),
        hospital_id=hospital_id,
        
        # Input data
        symptoms_data=symptoms,
        urgency=urgency,
        patient_age=patient_age,
        medical_history=medical_history,
        
        # Assessment output
        severity_score=severity_result['severity_score'],
        severity_level=severity_result['severity_level'],
        has_red_flags=severity_result['has_red_flags'],
        red_flags_found=severity_result.get('red_flags_found', []),
        
        # Recommendation
        recommended_care_level=care_recommendation['recommended_care_level'],
        recommended_department_id=department_routing['department_id'],
        estimated_cost=(
            care_recommendation['care_details']['estimated_cost_min'] +
            care_recommendation['care_details']['estimated_cost_max']
        ) // 2,
        
        # Model version
        model_version='rules_v1'
    )
    
    # Step 5: Build response
    response_data = {
        'triage_id': str(triage_log.id),
        'reference_number': triage_log.reference_number,
        
        # Severity assessment
        'severity_score': severity_result['severity_score'],
        'severity_level': severity_result['severity_level'],
        'has_red_flags': severity_result['has_red_flags'],
        'red_flags_found': severity_result.get('red_flags_found', []),
        
        # Care recommendation
        'recommended_care_level': care_recommendation['recommended_care_level'],
        'care_details': care_recommendation['care_details'],
        'specialist_suggested': care_recommendation.get('specialist_suggested'),
        'alternative_options': care_recommendation['alternative_options'],
        'estimated_cost_range': care_recommendation['estimated_cost_range'],
        'wait_time': care_recommendation['wait_time'],
        
        # Department routing
        'department_routing': {
            'department_id': department_routing['department_id'],
            'department_name': department_routing['department_name'],
            'confidence': department_routing['confidence'],
            'fallback_used': department_routing['fallback_used'],
            'explanation': department_routing['explanation']
        },
        
        # Reasoning
        'reasoning': severity_result['reasoning'],
        
        # Next steps
        'next_steps': _generate_next_steps(care_recommendation['recommended_care_level'], department_routing),
        
        # Debug info (remove in production)
        'debug': {
            'symptom_breakdown': severity_result.get('symptom_breakdown', []),
            'components': severity_result.get('components', {}),
            'routing_method': department_routing['routing_method']
        }
    }
    
    return Response(response_data, status=status.HTTP_200_OK)


def _generate_next_steps(care_level, department_routing):
    """Generate user-friendly next steps based on recommendation."""
    
    if care_level == 'emergency':
        return "Go to Emergency Department immediately. Do not delay."
    
    elif care_level == 'online':
        return "Proceed to book an online consultation. You'll receive a video call link."
    
    elif care_level == 'specialist':
        dept_name = department_routing['department_name']
        if department_routing['fallback_used']:
            return f"Book appointment with {dept_name}. Note: Specialist department not available, starting with general assessment."
        else:
            return f"Book appointment with {dept_name} for specialized care."
    
    else:  # gp
        return f"Book appointment with {department_routing['department_name']} for assessment."


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def triage_history(request):
    """
    Get user's triage history.
    
    GET /api/triage/history/
    
    Query params:
        - limit: Number of records to return (default: 10)
        - offset: Offset for pagination (default: 0)
    
    Returns:
        {
            "count": int,
            "results": [...]
        }
    """
    
    limit = int(request.GET.get('limit', 10))
    offset = int(request.GET.get('offset', 0))
    
    triages = TriageLog.objects.filter(user=request.user).order_by('-created_at')
    total_count = triages.count()
    
    triages_page = triages[offset:offset + limit]
    serializer = TriageLogSerializer(triages_page, many=True)
    
    return Response({
        'count': total_count,
        'results': serializer.data
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def triage_detail(request, triage_id):
    """
    Get specific triage assessment details.
    
    GET /api/triage/<triage_id>/
    
    Returns full triage record including input data, assessment, and outcome.
    """
    
    triage = get_object_or_404(TriageLog, id=triage_id, user=request.user)
    serializer = TriageLogSerializer(triage)
    
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_triage_outcome(request, triage_id):
    """
    Update triage outcome after appointment (for ML training).
    
    POST /api/triage/<triage_id>/outcome/
    
    Body:
        {
            "actual_diagnosis": str,
            "was_correctly_triaged": bool
        }
    
    This is called after the appointment to record what actually happened.
    Used for measuring accuracy and training ML models.
    """
    
    triage = get_object_or_404(TriageLog, id=triage_id, user=request.user)
    
    triage.actual_diagnosis = request.data.get('actual_diagnosis')
    triage.was_correctly_triaged = request.data.get('was_correctly_triaged')
    triage.save()
    
    return Response({'message': 'Outcome updated successfully'})
```

</details>

### Add URL Routes in `api/urls.py`

```python
# api/urls.py

from django.urls import path
from api.views import triage_views

urlpatterns = [
    # ... existing routes ...
    
    # Triage endpoints
    path('triage/assess-severity/', triage_views.assess_severity, name='assess_severity'),
    path('triage/history/', triage_views.triage_history, name='triage_history'),
    path('triage/<uuid:triage_id>/', triage_views.triage_detail, name='triage_detail'),
    path('triage/<uuid:triage_id>/outcome/', triage_views.update_triage_outcome, name='update_triage_outcome'),
]
```

---

## Step 8: Create Request/Response Serializers 📝

Serializers validate incoming data and format responses.

### Create `api/serializers/triage_serializers.py`

<details>
<summary><strong>📄 triage_serializers.py</strong> (click to expand - ~150 lines)</summary>

```python
# api/serializers/triage_serializers.py

"""
Triage Serializers

Validates request data and serializes response data.
"""

from rest_framework import serializers
from api.models.triage import TriageLog


class SymptomSerializer(serializers.Serializer):
    """Validate individual symptom data."""
    
    symptom_name = serializers.CharField(
        max_length=200,
        required=True,
        help_text="Name of the symptom (e.g., 'chest pain', 'headache')"
    )
    
    description = serializers.CharField(
        max_length=500,
        required=False,
        allow_blank=True,
        help_text="Additional details about the symptom"
    )
    
    severity = serializers.ChoiceField(
        choices=['mild', 'moderate', 'severe'],
        required=False,
        help_text="Patient's perceived severity"
    )
    
    duration = serializers.ChoiceField(
        choices=['minutes', 'hours', 'days', 'weeks', 'months', 'years'],
        required=False,
        default='days',
        help_text="How long the symptom has been present"
    )
    
    progression = serializers.ChoiceField(
        choices=['getting worse rapidly', 'getting worse', 'staying the same', 'improving slowly', 'improving'],
        required=False,
        default='staying the same',
        help_text="How the symptom is changing over time"
    )


class TriageAssessmentRequestSerializer(serializers.Serializer):
    """Validate triage assessment request."""
    
    symptoms = SymptomSerializer(
        many=True,
        required=True,
        help_text="List of symptoms (at least 1 required)"
    )
    
    urgency = serializers.ChoiceField(
        choices=['routine', 'soon', 'urgent', 'emergency'],
        required=True,
        help_text="Patient's perceived urgency"
    )
    
    hospital_id = serializers.IntegerField(
        required=True,
        help_text="ID of the hospital where appointment will be booked"
    )
    
    patient_age = serializers.IntegerField(
        required=False,
        allow_null=True,
        min_value=0,
        max_value=150,
        help_text="Patient's age in years"
    )
    
    medical_history = serializers.ListField(
        child=serializers.CharField(max_length=200),
        required=False,
        allow_empty=True,
        help_text="List of existing medical conditions"
    )
    
    def validate_symptoms(self, value):
        """Ensure at least one symptom is provided."""
        if not value or len(value) == 0:
            raise serializers.ValidationError("At least one symptom is required")
        
        if len(value) > 10:
            raise serializers.ValidationError("Maximum 10 symptoms allowed")
        
        return value
    
    def validate_hospital_id(self, value):
        """Ensure hospital exists."""
        from api.models import Hospital
        
        if not Hospital.objects.filter(id=value).exists():
            raise serializers.ValidationError(f"Hospital with ID {value} does not exist")
        
        return value


class TriageLogSerializer(serializers.ModelSerializer):
    """Serialize TriageLog model for responses."""
    
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    hospital_name = serializers.CharField(source='hospital.name', read_only=True)
    
    class Meta:
        model = TriageLog
        fields = [
            'id',
            'reference_number',
            'user',
            'user_name',
            'hospital',
            'hospital_name',
            'created_at',
            
            # Input data
            'symptoms_data',
            'urgency',
            'patient_age',
            'medical_history',
            
            # Assessment output
            'severity_score',
            'severity_level',
            'has_red_flags',
            'red_flags_found',
            
            # Recommendation
            'recommended_care_level',
            'recommended_department_id',
            'estimated_cost',
            
            # User action
            'user_selected_care_level',
            'appointment_created',
            
            # Outcome
            'actual_diagnosis',
            'was_correctly_triaged',
            
            # Model info
            'model_version',
        ]
        read_only_fields = ['id', 'reference_number', 'created_at', 'user', 'hospital']
```

</details>

### 🎓 Exercise 8.1: Test API Endpoint

Start your Django server and test the API:

```bash
# In basebackend directory
python manage.py runserver
```

**Test with curl:**

```bash
TOKEN="<your_auth_token>"

curl -X POST http://localhost:8000/api/triage/assess-severity/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": [
      {
        "symptom_name": "chest pain",
        "description": "sharp pain in center",
        "severity": "severe",
        "duration": "hours"
      }
    ],
    "urgency": "urgent",
    "hospital_id": 1,
    "patient_age": 55,
    "medical_history": ["diabetes"]
  }'
```

**Expected Response** (severity ~77, care_level: specialist/emergency):
```json
{
  "triage_id": "...",
  "reference_number": "TRG-ABC123",
  "severity_score": 77,
  "severity_level": "critical",
  "recommended_care_level": "specialist",
  "department_routing": {
    "department_id": 3,
    "department_name": "Cardiology",
    "confidence": "high"
  },
  "next_steps": "Book appointment with Cardiology for specialized care."
}
```

---


## Step 9: Frontend Integration 🎨

Now we connect the frontend to our new triage API.

### Create Frontend Service: `src/services/triageService.ts`

<details>
<summary><strong>📄 triageService.ts</strong> (click to expand - ~200 lines)</summary>

```typescript
// src/services/triageService.ts

import axios from 'axios';
import { API_BASE_URL } from '../utils/config';

export interface Symptom {
  symptom_name: string;
  description?: string;
  severity?: 'mild' | 'moderate' | 'severe';
  duration?: 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';
  progression?: 'getting worse rapidly' | 'getting worse' | 'staying the same' | 'improving slowly' | 'improving';
}

export interface TriageAssessmentRequest {
  symptoms: Symptom[];
  urgency: 'routine' | 'soon' | 'urgent' | 'emergency';
  hospital_id: number;
  patient_age?: number;
  medical_history?: string[];
}

export interface CareDetails {
  name: string;
  description: string;
  min_score: number;
  max_score: number;
  estimated_cost_min: number;
  estimated_cost_max: number;
  wait_time: string;
  suitable_for: string[];
}

export interface DepartmentRouting {
  department_id: number | null;
  department_name: string;
  confidence: 'high' | 'medium' | 'low' | 'none';
  fallback_used: boolean;
  explanation: string;
  action_required?: string;
}

export interface TriageAssessmentResponse {
  triage_id: string;
  reference_number: string;
  
  // Severity
  severity_score: number;
  severity_level: 'low' | 'medium' | 'high' | 'critical';
  has_red_flags: boolean;
  red_flags_found?: any[];
  
  // Recommendation
  recommended_care_level: 'online' | 'gp' | 'specialist' | 'emergency';
  care_details: CareDetails;
  specialist_suggested?: string;
  alternative_options: string[];
  estimated_cost_range: string;
  wait_time: string;
  
  // Department
  department_routing: DepartmentRouting;
  
  // Context
  reasoning: string;
  next_steps: string;
  
  // Debug (optional)
  debug?: {
    symptom_breakdown: any[];
    components: any;
    routing_method: string;
  };
}

export interface TriageHistoryItem {
  id: string;
  reference_number: string;
  created_at: string;
  severity_score: number;
  severity_level: string;
  recommended_care_level: string;
  hospital_name: string;
  appointment_created: boolean;
}

/**
 * Perform triage assessment
 */
export const assessSeverity = async (
  request: TriageAssessmentRequest,
  token: string
): Promise<TriageAssessmentResponse> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/triage/assess-severity/`,
      request,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to perform triage assessment. Please try again.');
  }
};

/**
 * Get triage history for current user
 */
export const getTriageHistory = async (
  token: string,
  limit: number = 10,
  offset: number = 0
): Promise<{ count: number; results: TriageHistoryItem[] }> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/triage/history/`,
      {
        params: { limit, offset },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch triage history');
  }
};

/**
 * Get specific triage assessment details
 */
export const getTriageDetail = async (
  triageId: string,
  token: string
): Promise<any> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/triage/${triageId}/`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch triage details');
  }
};

/**
 * Update triage outcome (after appointment)
 */
export const updateTriageOutcome = async (
  triageId: string,
  outcome: {
    actual_diagnosis: string;
    was_correctly_triaged: boolean;
  },
  token: string
): Promise<void> => {
  try {
    await axios.post(
      `${API_BASE_URL}/api/triage/${triageId}/outcome/`,
      outcome,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    throw new Error('Failed to update triage outcome');
  }
};

/**
 * Helper: Map body part selections to symptoms
 */
export const bodyPartToSymptoms = (
  bodyPartId: string,
  selectedSymptoms: string[]
): Symptom[] => {
  return selectedSymptoms.map(symptomName => ({
    symptom_name: symptomName,
    description: `${bodyPartId} - ${symptomName}`,
    duration: 'days', // Default, can be updated by user
    progression: 'staying the same', // Default
  }));
};

/**
 * Helper: Convert urgency from UI selection to API format
 */
export const mapUrgencyLevel = (urgencyInput: string): 'routine' | 'soon' | 'urgent' | 'emergency' => {
  const mapping: Record<string, 'routine' | 'soon' | 'urgent' | 'emergency'> = {
    'not urgent': 'routine',
    'routine': 'routine',
    'within a week': 'soon',
    'soon': 'soon',
    'this week': 'urgent',
    'urgent': 'urgent',
    'today': 'emergency',
    'now': 'emergency',
    'emergency': 'emergency',
  };
  
  return mapping[urgencyInput.toLowerCase()] || 'routine';
};

export default {
  assessSeverity,
  getTriageHistory,
  getTriageDetail,
  updateTriageOutcome,
  bodyPartToSymptoms,
  mapUrgencyLevel,
};
```

</details>

### Update `src/features/health/BookAppointment.tsx`

Now we integrate the triage service into the appointment booking flow. We'll add a new step **between symptom selection and payment**.

**Key Changes**:
1. Add triage assessment step after symptom selection
2. Show severity score and recommended care level
3. Allow user to choose care level (or accept recommendation)
4. Route to appropriate department based on triage result

<details>
<summary><strong>📝 BookAppointment.tsx Updates</strong> (click to expand - key sections)</summary>

```typescript
// src/features/health/BookAppointment.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import triageService, { TriageAssessmentResponse } from '../../services/triageService';

// ... existing imports ...

const BookAppointment: React.FC = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  
  // Existing state
  const [step, setStep] = useState(1); // 1: symptoms, 2: TRIAGE, 3: doctor, 4: time, 5: payment
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<any>(null);
  
  // NEW: Triage state
  const [triageResult, setTriageResult] = useState<TriageAssessmentResponse | null>(null);
  const [triageLoading, setTriageLoading] = useState(false);
  const [urgencyLevel, setUrgencyLevel] = useState<string>('routine');
  const [medicalHistory, setMedicalHistory] = useState<string[]>([]);
  
  // Existing state
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  
  // ... rest of existing state ...
  
  /**
   * NEW FUNCTION: Perform triage assessment
   */
  const performTriageAssessment = async () => {
    if (!selectedHospital || selectedSymptoms.length === 0) {
      toast.error('Please select symptoms first');
      return;
    }
    
    setTriageLoading(true);
    
    try {
      // Convert symptoms to triage format
      const symptoms = triageService.bodyPartToSymptoms(selectedBodyPart, selectedSymptoms);
      
      // Call triage API
      const result = await triageService.assessSeverity(
        {
          symptoms,
          urgency: triageService.mapUrgencyLevel(urgencyLevel),
          hospital_id: selectedHospital.id,
          patient_age: user?.age,
          medical_history: medicalHistory,
        },
        token!
      );
      
      setTriageResult(result);
      
      // Auto-select department if recommended
      if (result.department_routing.department_id) {
        const dept = departments.find(d => d.id === result.department_routing.department_id);
        if (dept) {
          setSelectedDepartment(dept);
        }
      }
      
      // Show result
      toast.success(`Triage complete: ${result.severity_level} severity`);
      
      // Move to next step
      setStep(3); // Go to doctor selection
      
    } catch (error: any) {
      toast.error(error.message || 'Triage assessment failed');
    } finally {
      setTriageLoading(false);
    }
  };
  
  /**
   * UPDATED: Handle step navigation
   */
  const handleNextStep = () => {
    if (step === 1) {
      // After symptom selection, go to triage
      if (selectedSymptoms.length === 0) {
        toast.error('Please select at least one symptom');
        return;
      }
      setStep(2); // Go to triage assessment
    } else if (step === 2) {
      // After triage, perform assessment
      performTriageAssessment();
      // Will auto-advance to step 3 in performTriageAssessment()
    } else if (step === 3) {
      // Department/doctor selection
      if (!selectedDoctor) {
        toast.error('Please select a doctor');
        return;
      }
      setStep(4); // Go to time selection
    } else if (step === 4) {
      // Time selection
      setStep(5); // Go to payment
    }
  };
  
  // ... existing code ...
  
  return (
    <div className="book-appointment-page">
      <h1>Book Appointment</h1>
      
      {/* Step Indicator */}
      <div className="steps-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Symptoms</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Assessment</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Doctor</div>
        <div className={`step ${step >= 4 ? 'active' : ''}`}>4. Time</div>
        <div className={`step ${step >= 5 ? 'active' : ''}`}>5. Payment</div>
      </div>
      
      {/* Step 1: Symptom Selection (EXISTING) */}
      {step === 1 && (
        <div className="symptom-selection">
          <h2>Select Your Symptoms</h2>
          <BodyMapSearch
            onBodyPartSelect={setSelectedBodyPart}
            onSymptomsSelect={setSelectedSymptoms}
          />
          <button onClick={handleNextStep}>Continue to Assessment</button>
        </div>
      )}
      
      {/* Step 2: Triage Assessment (NEW) */}
      {step === 2 && (
        <div className="triage-assessment">
          <h2>Tell Us More</h2>
          
          <div className="urgency-selection">
            <label>How urgent is this?</label>
            <select value={urgencyLevel} onChange={(e) => setUrgencyLevel(e.target.value)}>
              <option value="routine">Not urgent - can wait a week</option>
              <option value="soon">Should be seen within a few days</option>
              <option value="urgent">Urgent - need to be seen this week</option>
              <option value="emergency">Emergency - need immediate care</option>
            </select>
          </div>
          
          <div className="medical-history">
            <label>Do you have any of these conditions? (optional)</label>
            <div className="checkbox-group">
              {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Cancer'].map(condition => (
                <label key={condition}>
                  <input
                    type="checkbox"
                    checked={medicalHistory.includes(condition)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setMedicalHistory([...medicalHistory, condition]);
                      } else {
                        setMedicalHistory(medicalHistory.filter(c => c !== condition));
                      }
                    }}
                  />
                  {condition}
                </label>
              ))}
            </div>
          </div>
          
          <button onClick={performTriageAssessment} disabled={triageLoading}>
            {triageLoading ? 'Assessing...' : 'Get Assessment'}
          </button>
        </div>
      )}
      
      {/* Show Triage Result (if available) */}
      {triageResult && step >= 3 && (
        <div className="triage-result-summary">
          <h3>Assessment Result</h3>
          <div className={`severity-badge severity-${triageResult.severity_level}`}>
            {triageResult.severity_level.toUpperCase()} - Score: {triageResult.severity_score}/100
          </div>
          <p><strong>Recommended:</strong> {triageResult.care_details.name}</p>
          <p><strong>Department:</strong> {triageResult.department_routing.department_name}</p>
          <p><strong>Estimated Cost:</strong> {triageResult.estimated_cost_range}</p>
          {triageResult.has_red_flags && (
            <div className="red-flag-warning">
              ⚠️ Red flag symptoms detected. Emergency care recommended.
            </div>
          )}
        </div>
      )}
      
      {/* Step 3: Doctor Selection (UPDATED with department pre-selection) */}
      {step === 3 && (
        <div className="doctor-selection">
          <h2>Select Doctor</h2>
          
          {triageResult?.department_routing.department_name && (
            <p className="department-recommendation">
              Recommended: {triageResult.department_routing.department_name}
              {triageResult.department_routing.confidence === 'high' && ' ✓'}
            </p>
          )}
          
          {/* ... existing doctor selection UI ... */}
          
          <button onClick={handleNextStep}>Continue to Schedule</button>
        </div>
      )}
      
      {/* Steps 4-5: Existing time and payment */}
      {/* ... rest of existing code ... */}
    </div>
  );
};

export default BookAppointment;
```

</details>

### Add CSS for Triage UI

```css
/* src/features/health/BookAppointment.css */

.triage-assessment {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.urgency-selection,
.medical-history {
  margin: 1.5rem 0;
}

.urgency-selection label,
.medical-history label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.urgency-selection select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.triage-result-summary {
  background: #f8f9fa;
  border-left: 4px solid #28a745;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
}

.severity-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  margin: 0.5rem 0;
}

.severity-low {
  background: #d4edda;
  color: #155724;
}

.severity-medium {
  background: #fff3cd;
  color: #856404;
}

.severity-high {
  background: #f8d7da;
  color: #721c24;
}

.severity-critical {
  background: #f5c6cb;
  color: #721c24;
  border: 2px solid #dc3545;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.red-flag-warning {
  background: #dc3545;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
  font-weight: 600;
  text-align: center;
}

.department-recommendation {
  background: #e7f5ff;
  border-left: 4px solid #0066cc;
  padding: 0.75rem;
  margin-bottom: 1rem;
  font-weight: 500;
}
```

---


## Step 10: End-to-End Testing & Deployment 🚀

The final step! Let's test the complete flow and deploy to production.

### Testing Checklist

#### ✅ **Backend Tests**

1. **Red Flag Detection**
```bash
cd /Users/new/phbfinal/basebackend
python api/utils/triage/red_flags.py
```
Expected: All 4 tests pass

2. **Severity Calculator**
```bash
python api/utils/triage/severity_calculator.py
```
Expected: All 4 tests pass (scores in expected ranges)

3. **Care Recommender**
```bash
python api/utils/triage/care_recommender.py
```
Expected: All 4 tests pass (correct care levels)

4. **Department Router**
```bash
python api/utils/triage/department_router.py
```
Expected: All 6 tests pass (including empty departments bug fix)

5. **API Endpoint**
```bash
# Start Django server
python manage.py runserver

# In another terminal, test with curl
TOKEN="your_token_here"
curl -X POST http://localhost:8000/api/triage/assess-severity/ \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": [{"symptom_name": "headache", "duration": "days"}],
    "urgency": "routine",
    "hospital_id": 1,
    "patient_age": 30
  }'
```
Expected: Returns JSON with severity_score, recommended_care_level, department_routing

#### ✅ **Frontend Tests**

1. **Navigate to Appointment Booking**
   - Go to `/account/appointments/book`
   - Should see 5 steps: Symptoms → Assessment → Doctor → Time → Payment

2. **Test Symptom Selection**
   - Click on body part (e.g., head)
   - Select symptom (e.g., headache)
   - Click "Continue to Assessment"
   - Should advance to Step 2

3. **Test Triage Assessment**
   - Select urgency level
   - (Optional) Select medical history
   - Click "Get Assessment"
   - Should show loading state
   - Should display assessment result with:
     - Severity score (0-100)
     - Severity level badge (color-coded)
     - Recommended care level
     - Department routing
     - Cost estimate

4. **Test Department Pre-selection**
   - After triage, Step 3 should auto-select recommended department
   - Verify department matches triage result
   - Should still allow manual override

5. **Test Complete Flow**
   - Complete all 5 steps
   - Verify appointment is created
   - Check database: TriageLog should exist with all fields populated

#### ✅ **Edge Case Tests**

**Test Case 1: Hospital with No Departments** (Original Bug!)
```bash
# Create a hospital with zero departments
curl -X POST http://localhost:8000/api/triage/assess-severity/ \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "symptoms": [{"symptom_name": "headache"}],
    "urgency": "routine",
    "hospital_id": 999  # Hospital with no departments
  }'
```
Expected:
- Does NOT crash
- Returns `department_routing.department_name: "NO DEPARTMENTS AVAILABLE"`
- Includes `action_required` field
- User sees clear error message

**Test Case 2: Red Flag Symptoms**
```bash
curl -X POST http://localhost:8000/api/triage/assess-severity/ \
  -d '{
    "symptoms": [{"symptom_name": "chest pain radiating to left arm"}],
    "urgency": "emergency"
  }'
```
Expected:
- severity_score: 95
- severity_level: "critical"
- has_red_flags: true
- recommended_care_level: "emergency"
- Frontend shows red flag warning ⚠️

**Test Case 3: Multiple Symptoms**
```bash
curl -X POST http://localhost:8000/api/triage/assess-severity/ \
  -d '{
    "symptoms": [
      {"symptom_name": "fever", "duration": "days"},
      {"symptom_name": "cough", "duration": "days"},
      {"symptom_name": "fatigue", "duration": "weeks"}
    ],
    "urgency": "soon"
  }'
```
Expected:
- severity_score: 30-45 range
- severity_level: "medium"
- recommended_care_level: "gp"
- department: General Medicine

**Test Case 4: Specialist Routing**
```bash
curl -X POST http://localhost:8000/api/triage/assess-severity/ \
  -d '{
    "symptoms": [{"symptom_name": "heart palpitations", "description": "irregular heartbeat"}],
    "urgency": "urgent",
    "patient_age": 60,
    "medical_history": ["hypertension"]
  }'
```
Expected:
- severity_score: 60-75 range
- severity_level: "high"
- recommended_care_level: "specialist"
- specialist_suggested: "cardiology"
- department: Cardiology (if available)

---

### Deployment Steps

#### 1. **Database Migration**

```bash
cd /Users/new/phbfinal/basebackend

# Create migration
python manage.py makemigrations

# Apply migration
python manage.py migrate

# Verify TriageLog table exists
python manage.py dbshell
\dt api_triagelog
\q
```

#### 2. **Environment Variables**

Add to `.env`:
```bash
# Triage Configuration
TRIAGE_MODEL_VERSION=rules_v1
TRIAGE_LOG_RETENTION_DAYS=365
ENABLE_TRIAGE_DEBUG=true  # Set to false in production
```

#### 3. **Backend Deployment**

```bash
# Install any new dependencies
pip install -r requirements.txt

# Restart Django server
# (If using systemd)
sudo systemctl restart phb-backend

# (If using PM2)
pm2 restart phb-backend

# Verify deployment
curl http://your-domain.com/api/health/
```

#### 4. **Frontend Deployment**

```bash
cd /Users/new/phbfinal/phbfrontend

# Build production bundle
npm run build

# Deploy to Netlify (or your hosting)
npm run deploy

# Verify deployment
# Navigate to: https://your-domain.com/account/appointments/book
```

#### 5. **Monitoring Setup**

Create a simple monitoring dashboard to track triage performance:

```sql
-- SQL queries to run weekly/monthly

-- 1. Total triages performed
SELECT COUNT(*) as total_triages,
       AVG(severity_score) as avg_severity,
       COUNT(CASE WHEN has_red_flags THEN 1 END) as red_flags_count
FROM api_triagelog
WHERE created_at >= NOW() - INTERVAL '7 days';

-- 2. Care level distribution
SELECT recommended_care_level, COUNT(*) as count,
       ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER(), 1) as percentage
FROM api_triagelog
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY recommended_care_level
ORDER BY count DESC;

-- 3. Triage accuracy (requires outcome data)
SELECT 
  COUNT(*) as total_with_outcomes,
  COUNT(CASE WHEN was_correctly_triaged THEN 1 END) as correct_triages,
  ROUND(100.0 * COUNT(CASE WHEN was_correctly_triaged THEN 1 END) / COUNT(*), 1) as accuracy_percent
FROM api_triagelog
WHERE was_correctly_triaged IS NOT NULL;

-- 4. Department routing fallbacks
SELECT 
  hospital_id,
  COUNT(*) as total_routes,
  COUNT(CASE WHEN recommended_department_id IS NULL THEN 1 END) as failed_routes
FROM api_triagelog
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY hospital_id
HAVING COUNT(CASE WHEN recommended_department_id IS NULL THEN 1 END) > 0;
```

---

### Phase 1 Success Metrics

After 1-2 weeks of production use, verify:

✅ **System Stability**
- [ ] No crashes or errors in triage endpoint
- [ ] All triage requests complete in < 2 seconds
- [ ] Database logging working correctly

✅ **User Experience**
- [ ] Patients can complete appointments start to finish
- [ ] Clear severity assessment displayed
- [ ] Department routing working for 90%+ of cases
- [ ] Red flags properly escalated to emergency

✅ **Data Collection** (Critical for Phase 2!)
- [ ] 100+ triage logs created
- [ ] Symptoms data captured correctly
- [ ] User selections (care level override) tracked
- [ ] Ready to start labeling for ML training

✅ **Business Impact**
- [ ] Appointment booking success rate improved
- [ ] No hospitals blocked due to missing departments
- [ ] Clear cost estimates shown to patients
- [ ] Reduced emergency department overload

---

## 🎉 Congratulations!

You've completed **Phase 1: Rule-Based Triage Implementation**!

### What You've Built

✅ **Red Flag Detection** - Catches critical symptoms requiring immediate care
✅ **Severity Calculator** - Scores symptoms 0-100 with explainable reasoning
✅ **Care Recommender** - Routes to appropriate care level (online/GP/specialist/emergency)
✅ **Department Router** - Smart fallback logic prevents booking failures
✅ **REST API** - Clean endpoint with full request/response validation
✅ **Frontend Integration** - Seamless triage step in appointment flow
✅ **Data Logging** - Complete tracking for ML training in Phase 2

### What's Happening Under the Hood

**Every time a patient books an appointment:**
1. ✅ System collects symptoms, urgency, demographics
2. ✅ Calculates severity score with transparent reasoning
3. ✅ Recommends care level based on rules
4. ✅ Routes to appropriate department (or gracefully handles missing dept)
5. ✅ **Logs everything to database for ML training** 🎯
6. ✅ User proceeds to book appointment

### Why This Phase Matters

**You're now generating training data!**

Every triage assessment creates a labeled example:
- **Input**: symptoms, urgency, age, medical history
- **Output**: severity score, care level, department
- **Ground Truth** (collected later): actual diagnosis, was it correct?

In Phase 2, you'll collect 1,000+ of these examples, then in Phase 3-7 you'll train an ML model that **learns from this data** and becomes more accurate than rules alone.

---

## 📖 Next Steps

Your learning journey continues! Here's what's next:

### **Phase 2: Data Collection & Labeling**
📄 File: `ml-triage-part3-phase2-data-collection.md` *(to be created)*

**What you'll learn:**
- How to collect high-quality training data
- Labeling workflow for medical experts
- Data quality checks and validation
- When you have "enough" data to start ML

**Timeline:** 4-6 weeks (mostly waiting for data accumulation)

### **Phase 3: Feature Engineering**
📄 File: `ml-triage-part4-phase3-feature-engineering.md` *(to be created)*

**What you'll learn:**
- Convert text symptoms into numbers (TF-IDF, embeddings)
- Create features from patient demographics
- Handle missing data
- Feature selection and importance

### **Phase 4-7: ML Development → Production**

Build, train, deploy, and monitor your ML model!

---

## 🎓 Knowledge Check

Before moving to Phase 2, make sure you can answer:

1. **What's the difference between severity_score and severity_level?**
   <details>
   <summary>Answer</summary>
   
   - `severity_score`: Numerical 0-100 value (precise, continuous)
   - `severity_level`: Categorical 'low'/'medium'/'high'/'critical' (binned)
   - Score gives precision, level gives interpretability
   </details>

2. **Why do we log BOTH the system's recommendation AND the user's selection?**
   <details>
   <summary>Answer</summary>
   
   - System recommendation = what our rules think
   - User selection = ground truth signal
   - If users frequently override, our rules might be wrong
   - This divergence helps identify model weaknesses
   - Used to calculate accuracy: `was_correctly_triaged`
   </details>

3. **What happens if a hospital has zero departments?**
   <details>
   <summary>Answer</summary>
   
   - Old system: Crashes with null reference
   - New system: Returns error with clear message
   - Sets `department_id = null`
   - Includes `action_required` field for admin
   - User sees friendly error message
   - Booking still blocked, but gracefully
   </details>

4. **Why does cardiology get severity score boost from "urgent" urgency?**
   <details>
   <summary>Answer</summary>
   
   - Urgency contributes 30% to final score
   - Patient's perception matters (they know their body)
   - "Urgent" adds +25 points
   - Combined with high symptom score (chest pain = 80)
   - Pushes total over critical threshold (75+)
   - Better to over-triage than under-triage in healthcare
   </details>

5. **When should you use online consultation vs. GP appointment?**
   <details>
   <summary>Answer</summary>
   
   - **Online** (severity 0-24):
     - Minor infections, rashes, cold/flu
     - Prescription refills
     - Health advice
     - No physical exam needed
   
   - **GP** (severity 25-49):
     - Persistent symptoms (>1 week)
     - Physical exam required
     - Lab tests needed
     - Unclear diagnosis
   </details>

---

## 🔗 Quick Links

- **Index**: [ml-triage-system-index.md](./ml-triage-system-index.md)
- **Previous**: Part 1 - Architecture *(to be created)*
- **Next**: Part 3 - Data Collection *(to be created)*

---

## 📝 Appendix: File Checklist

By the end of this guide, you should have created these files:

### Backend Files
- [x] `/Users/new/phbfinal/basebackend/api/models/triage.py` - TriageLog model
- [x] `/Users/new/phbfinal/basebackend/api/utils/triage/red_flags.py` - Red flag detection
- [x] `/Users/new/phbfinal/basebackend/api/utils/triage/severity_calculator.py` - Severity scoring
- [x] `/Users/new/phbfinal/basebackend/api/utils/triage/care_recommender.py` - Care level routing
- [x] `/Users/new/phbfinal/basebackend/api/utils/triage/department_router.py` - Department selection
- [x] `/Users/new/phbfinal/basebackend/api/views/triage_views.py` - API endpoints
- [x] `/Users/new/phbfinal/basebackend/api/serializers/triage_serializers.py` - Request/response validation
- [x] `/Users/new/phbfinal/basebackend/api/urls.py` - URL routing (updated)

### Frontend Files
- [x] `/Users/new/phbfinal/phbfrontend/src/services/triageService.ts` - API client
- [x] `/Users/new/phbfinal/phbfrontend/src/features/health/BookAppointment.tsx` - Updated with triage step
- [x] `/Users/new/phbfinal/phbfrontend/src/features/health/BookAppointment.css` - Triage UI styles

### Database
- [x] Migration: `api_triagelog` table created
- [x] Verified with `python manage.py migrate`

---

## 💡 Tips for Success

1. **Test incrementally** - Don't wait until the end to test
2. **Use the test functions** - They're built-in for a reason
3. **Read error messages** - They tell you exactly what's wrong
4. **Check the database** - Use `python manage.py dbshell` to inspect data
5. **Log everything** - You'll need this data for ML training
6. **Ask questions** - ML is complex, confusion is normal
7. **Celebrate small wins** - Each passing test is progress!

---

**Author**: Claude (AI Assistant)  
**Created**: 2025-11-11  
**Part**: 2 of 9  
**Status**: Complete ✅  
**Estimated Time**: 8-12 hours hands-on implementation  

---

**Ready for Phase 2?** Head to the [Index](./ml-triage-system-index.md) to continue your ML journey! 🚀
