---
date: 2025-11-11T09:10:25+0000
author: Claude
git_commit: 991bc3617244ceb5a57cd467da28bdd5aa29c30d
branch: main
repository: phbfrontend
topic: "Machine Learning-Based Medical Triage System - Complete Implementation Guide"
tags: [implementation-plan, machine-learning, medical-triage, appointment-routing, healthcare-ai]
status: planning
priority: high
complexity: high
estimated_duration: 3-6 months
learning_focus: true
last_updated: 2025-11-11
last_updated_by: Claude
---

# Machine Learning-Based Medical Triage System - Complete Implementation Guide

**Date**: 2025-11-11T09:10:25+0000
**Author**: Claude
**Status**: Planning Phase
**Complexity**: High (3-6 months implementation)
**Learning Focus**: Educational guide for ML implementation in healthcare

---

## Table of Contents

1. [Introduction & Vision](#introduction--vision)
2. [Why Machine Learning for Medical Triage?](#why-machine-learning-for-medical-triage)
3. [ML Fundamentals for Healthcare](#ml-fundamentals-for-healthcare)
4. [System Architecture Overview](#system-architecture-overview)
5. [Phase 1: Rule-Based Foundation (Weeks 1-2)](#phase-1-rule-based-foundation)
6. [Phase 2: Data Collection & Preparation (Weeks 3-6)](#phase-2-data-collection--preparation)
7. [Phase 3: Feature Engineering (Weeks 7-8)](#phase-3-feature-engineering)
8. [Phase 4: Model Development (Weeks 9-12)](#phase-4-model-development)
9. [Phase 5: Training Pipeline (Weeks 13-14)](#phase-5-training-pipeline)
10. [Phase 6: Validation & Testing (Weeks 15-16)](#phase-6-validation--testing)
11. [Phase 7: Integration (Weeks 17-18)](#phase-7-integration)
12. [Phase 8: Deployment & Monitoring (Weeks 19-20)](#phase-8-deployment--monitoring)
13. [Safety, Ethics & Compliance](#safety-ethics--compliance)
14. [Learning Resources](#learning-resources)
15. [Success Metrics](#success-metrics)

---

## Introduction & Vision

### The Goal

Transform the PHB appointment booking system from a **static, department-based routing** system to an **intelligent, ML-powered triage system** that:

1. **Assesses symptom severity** (Low/Medium/High/Critical)
2. **Recommends appropriate care level** (Online/GP/Specialist/Emergency)
3. **Routes to correct department** (when specialist care needed)
4. **Learns from outcomes** (improves accuracy over time)
5. **Reduces specialist overload** (60-70% to online/GP care)

### Current vs. Future State

**Current System**:
```
Symptom → Hardcoded mapping → Department → Doctor → In-Person Appointment
```

**Future System (ML-Enhanced)**:
```
Symptom + Patient Context
  ↓
ML Severity Assessment
  ↓
├─ Low (60-70%) → Online Consultation (same day, ₦1,500)
├─ Medium (20-25%) → GP Appointment (General Medicine, ₦2,000)
├─ High (8-10%) → Specialist (ML suggests department, ₦3,500-7,500)
└─ Critical (1-2%) → Emergency (immediate, ₦5,000-10,000)
```

### Why This Matters

**For Patients**:
- ✅ Faster access to care (online same-day vs. weeks for specialist)
- ✅ Lower costs (₦1,500 online vs. ₦7,500 specialist)
- ✅ Appropriate care level (not over/under-treated)

**For Doctors**:
- ✅ 60% workload reduction (GPs handle low-severity online)
- ✅ Focus on complex cases requiring specialist expertise
- ✅ Better work-life balance

**For PHB Platform**:
- ✅ Scalability (one GP handles 50 online vs. 20 in-person/day)
- ✅ Revenue growth (serve more patients with same resources)
- ✅ Competitive advantage (AI-powered healthcare)

---

## Why Machine Learning for Medical Triage?

### The Problem with Static Rules

**Current Hardcoded Approach** (`BookAppointment.tsx:193-210`):
```typescript
const bodyPartToDeptMapping = {
  'chest': ['cardiology', 'pulmonology', 'emergency medicine'],
  'head': ['neurology', 'ent', 'ophthalmology']
};
```

**Limitations**:
1. **Cannot capture complexity**: "Chest pain" could be cardiac (urgent), muscular (routine), or anxiety (online consultation)
2. **No context awareness**: Same symptom in 25-year-old athlete vs. 65-year-old diabetic = different severity
3. **Static**: Requires code changes to update rules
4. **No learning**: Can't improve from past successful/unsuccessful routings

### What ML Can Do

**Example 1: Contextual Severity Assessment**

**Input**:
- Symptom: "Chest pain"
- Age: 55
- Gender: Male
- Medical history: Hypertension, diabetes
- Description: "Sharp pain, radiates to left arm, shortness of breath"
- Urgency: "urgent"

**ML Output**:
```json
{
  "severity_score": 92,
  "severity_level": "critical",
  "recommended_care": "emergency",
  "reasoning": [
    "Classic cardiac symptoms in high-risk patient",
    "HEART score: 7/10 (high risk for ACS)",
    "Requires immediate ECG and troponin",
    "Matches 87% of past MI cases in database"
  ],
  "suggested_department": "Emergency Medicine",
  "confidence": 0.94,
  "timeframe": "immediate",
  "alternative_diagnoses": [
    {"condition": "Acute coronary syndrome", "probability": 0.85},
    {"condition": "Pulmonary embolism", "probability": 0.08},
    {"condition": "Costochondritis", "probability": 0.05}
  ]
}
```

**Example 2: Adaptive Learning**

**Scenario**: 100 patients with "headache" symptom triaged by ML

**Initial Performance**:
- 60 routed to online consultation
- 30 routed to GP
- 10 routed to neurology

**Outcomes Tracked**:
- 55/60 online cases resolved successfully (92% accuracy) ✓
- 5/60 escalated to in-person (8% missed severity)
- 28/30 GP cases appropriate (93% accuracy) ✓
- 2/30 should have been neurology (7% under-triage)
- 10/10 neurology cases correct (100% accuracy) ✓

**Model Retraining**:
- Learns: "Headache + vision changes + sudden onset → neurology (not online)"
- Adjusts severity scoring for headache + red flag symptoms
- Next 100 patients: Under-triage drops from 7% to 2%

**This is impossible with static rules**.

---

## ML Fundamentals for Healthcare

### Key Concepts Explained

#### 1. Supervised Learning

**Definition**: Teaching the model by showing it examples with known correct answers.

**In Our Context**:
- **Input (Features)**: Patient symptoms, age, gender, medical history
- **Output (Label)**: Correct severity level (Low/Medium/High/Critical)
- **Training**: Show model 10,000 past cases with known outcomes
- **Learning**: Model finds patterns that predict severity

**Simple Analogy**:
Teaching a child to identify animals:
- Show pictures of dogs labeled "dog" → Child learns dog features
- Show pictures of cats labeled "cat" → Child learns cat features
- Now child can identify new animals it hasn't seen

**In Triage**:
- Show cases of "chest pain + age 60 → critical" → Model learns pattern
- Show cases of "headache + age 25 → low" → Model learns pattern
- Model can now assess new patients it hasn't seen

#### 2. Classification vs. Regression

**Classification** (What we need):
- **Goal**: Categorize into discrete classes
- **Our Classes**: Low, Medium, High, Critical
- **Output**: Category + confidence score
- **Example**: "This patient is 'High' severity with 89% confidence"

**Regression** (Not our primary need):
- **Goal**: Predict continuous number
- **Example**: Predict exact blood pressure (120 mmHg)

#### 3. Feature Engineering

**Definition**: Converting raw data into numerical features the model can understand.

**Raw Data**:
```
Symptom: "Chest pain"
Age: 55
Gender: "Male"
History: ["Hypertension", "Diabetes"]
```

**Engineered Features**:
```python
{
  # Symptom encoding
  'symptom_chest_pain': 1,
  'symptom_category_cardiac': 1,

  # Age features
  'age': 55,
  'age_group_middle_age': 1,
  'age_over_50': 1,

  # Gender (one-hot encoding)
  'gender_male': 1,
  'gender_female': 0,

  # Medical history (multi-hot encoding)
  'history_hypertension': 1,
  'history_diabetes': 1,
  'history_asthma': 0,

  # Risk scores
  'cardiac_risk_score': 0.82,
  'has_multiple_comorbidities': 1,

  # Temporal features
  'symptom_duration_hours': 2,
  'symptom_onset_sudden': 1
}
```

**Why This Matters**:
ML models work with numbers, not words. Feature engineering is **critical** for model performance.

#### 4. Model Types (Explained Simply)

**A. Logistic Regression** (Start here)
- **What it is**: Linear decision boundary
- **Pros**: Simple, fast, interpretable
- **Cons**: Cannot capture complex patterns
- **Use case**: Baseline model to beat

**Analogy**: Drawing a straight line to separate two groups of points.

**B. Random Forest** (Recommended for production)
- **What it is**: Committee of decision trees voting on answer
- **Pros**: Handles non-linear patterns, robust, feature importance
- **Cons**: Larger model size
- **Use case**: Production model

**Analogy**: Asking 100 doctors for their opinion, then taking majority vote.

**C. Gradient Boosting (XGBoost)** (High performance)
- **What it is**: Sequential trees, each correcting previous errors
- **Pros**: Often highest accuracy, handles missing data
- **Cons**: Slower training, requires tuning
- **Use case**: Competition-winning model

**Analogy**: Student takes test, teacher points out mistakes, student studies those mistakes, repeats.

**D. Neural Networks** (Future upgrade)
- **What it is**: Layers of interconnected nodes learning features
- **Pros**: Can learn very complex patterns
- **Cons**: Requires lots of data (10,000+ examples), black box
- **Use case**: After collecting sufficient data

**Analogy**: Human brain with neurons connecting and firing.

#### 5. Training, Validation, Testing

**Training Set (70%)**:
- Data model learns from
- Adjusts weights to minimize errors

**Validation Set (15%)**:
- Data used to tune hyperparameters
- Prevents overfitting to training data
- Example: "Should tree depth be 5 or 10?"

**Test Set (15%)**:
- **Never seen by model during development**
- Final performance evaluation
- Simulates real-world performance

**Critical**: Test set must NEVER influence model decisions. This ensures honest performance measurement.

#### 6. Overfitting vs. Underfitting

**Underfitting** (Model too simple):
```
Model: "All chest pain → high severity"
Problem: Misses nuance (muscular chest pain is low severity)
Accuracy: 60%
```

**Good Fit** (Goldilocks zone):
```
Model: "Chest pain + age + history + description → severity"
Accuracy: 85%
Generalizes to new patients
```

**Overfitting** (Model too complex):
```
Model: Memorizes every patient exactly
Training accuracy: 99%
Test accuracy: 65% ← WORSE on new patients
Problem: Learned noise, not patterns
```

**Solution**: Cross-validation, regularization, early stopping.

---

## System Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Patient Interface                        │
│  (React Frontend - BookAppointment.tsx)                     │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ POST /api/triage/assess-severity/
                 ▼
┌─────────────────────────────────────────────────────────────┐
│              Triage API Gateway (Django)                    │
│  • Input validation                                         │
│  • Feature extraction                                       │
│  • Model invocation                                         │
│  • Response formatting                                      │
└────────────────┬────────────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
┌──────────────┐   ┌──────────────┐
│ Rule-Based   │   │ ML Model     │
│ Engine       │   │ Service      │
│ (Phase 1)    │   │ (Phase 4+)   │
└──────┬───────┘   └──────┬───────┘
       │                  │
       │ Severity score   │ Predictions
       │ Red flags        │ Confidence
       │                  │ Reasoning
       └────────┬─────────┘
                │
                ▼
┌─────────────────────────────────────────────────────────────┐
│            Decision Engine (Hybrid)                         │
│  • Combines rule-based + ML predictions                     │
│  • Safety checks (override ML if red flags)                 │
│  • Department routing                                       │
│  • Care level recommendation                                │
└────────────────┬────────────────────────────────────────────┘
                 │
                 │ Triage Decision
                 ▼
┌─────────────────────────────────────────────────────────────┐
│              Outcome Tracking                               │
│  • Log: prediction, actual outcome, accuracy                │
│  • Feedback loop: did patient escalate/de-escalate?        │
│  • Continuous learning dataset                             │
└─────────────────────────────────────────────────────────────┘
                 │
                 │ Periodic retraining
                 ▼
┌─────────────────────────────────────────────────────────────┐
│           ML Training Pipeline (Offline)                    │
│  • Data labeling                                            │
│  • Feature engineering                                      │
│  • Model training                                           │
│  • Validation                                               │
│  • Model versioning                                         │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Backend ML Stack**:
- **Language**: Python 3.10+
- **Framework**: Django (existing)
- **ML Library**: scikit-learn (start) → XGBoost (production) → TensorFlow (future)
- **Model Serving**: Django REST API (Phase 1) → Dedicated microservice (Phase 2)
- **Data Storage**: PostgreSQL (existing) + TimescaleDB (time-series tracking)
- **Feature Store**: Redis (cache computed features)
- **Model Registry**: MLflow (track experiments, versions)
- **Monitoring**: Prometheus + Grafana (model performance metrics)

**Frontend Integration**:
- **Framework**: React + TypeScript (existing)
- **State Management**: React Context API
- **API Client**: Axios (existing)
- **UI Components**: Material-UI (existing)

**Training Infrastructure** (Future):
- **Compute**: AWS EC2 (t3.large for training) or local initially
- **Storage**: S3 (model artifacts, training data)
- **Notebooks**: Jupyter (experimentation)
- **Orchestration**: Airflow or Prefect (automated retraining)

---

## Phase 1: Rule-Based Foundation

**Duration**: Weeks 1-2
**Goal**: Build intelligent rule-based system before adding ML
**Why**: ML requires data. Rules provide baseline and generate training data.

### 1.1 Severity Scoring Algorithm

#### Red Flag Symptoms (Immediate Critical)

```python
# api/utils/triage/red_flags.py

RED_FLAGS_CRITICAL = {
    'cardiac': [
        'chest pain with radiation to arm/jaw',
        'crushing chest pressure',
        'severe shortness of breath',
        'sudden collapse',
        'irregular heartbeat with dizziness'
    ],
    'neurological': [
        'sudden severe headache ("worst headache of life")',
        'facial drooping',
        'arm weakness',
        'speech difficulty',
        'confusion or altered mental status',
        'seizure',
        'loss of consciousness'
    ],
    'respiratory': [
        'severe difficulty breathing',
        'unable to speak in full sentences',
        'blue lips or face',
        'coughing up blood'
    ],
    'trauma': [
        'severe bleeding',
        'suspected fracture',
        'head injury with confusion',
        'severe burns'
    ],
    'abdominal': [
        'severe abdominal pain with rigidity',
        'vomiting blood',
        'black tarry stools',
        'suspected appendicitis (RLQ pain + fever)'
    ]
}

def check_red_flags(symptoms: List[Dict]) -> Dict:
    """
    Check if symptoms contain any red flags requiring immediate care.

    Returns:
        {
            'has_red_flags': bool,
            'severity': 'critical',
            'flags_found': List[str],
            'recommended_action': 'emergency_department'
        }
    """
    flags_found = []

    for symptom in symptoms:
        symptom_text = symptom['symptom_name'].lower()
        description = symptom.get('description', '').lower()
        combined = f"{symptom_text} {description}"

        for category, flag_list in RED_FLAGS_CRITICAL.items():
            for flag in flag_list:
                if flag in combined:
                    flags_found.append({
                        'category': category,
                        'flag': flag,
                        'matched_symptom': symptom['symptom_name']
                    })

    if flags_found:
        return {
            'has_red_flags': True,
            'severity': 'critical',
            'flags_found': flags_found,
            'recommended_action': 'emergency_department',
            'reasoning': 'Red flag symptoms detected requiring immediate evaluation'
        }

    return {'has_red_flags': False}
```

#### Severity Scoring Formula

```python
# api/utils/triage/severity_calculator.py

def calculate_severity_score(
    symptoms: List[Dict],
    patient_age: int,
    medical_history: List[str],
    urgency: str,
    vital_signs: Optional[Dict] = None
) -> Dict:
    """
    Calculate severity score (0-100) based on multiple factors.

    Scoring Components:
    - Base symptom severity: 0-40 points
    - Patient risk factors: 0-25 points
    - Urgency level: 0-15 points
    - Vital signs (if available): 0-20 points

    Returns:
        {
            'severity_score': int (0-100),
            'severity_level': 'low'|'medium'|'high'|'critical',
            'breakdown': Dict (component scores),
            'risk_factors': List[str]
        }
    """
    score = 0
    breakdown = {}
    risk_factors = []

    # Component 1: Base Symptom Severity (0-40)
    symptom_score = calculate_symptom_severity(symptoms)
    score += symptom_score
    breakdown['symptom_severity'] = symptom_score

    # Component 2: Patient Risk Factors (0-25)
    risk_score = 0

    # Age-based risk
    if patient_age < 1:
        risk_score += 10
        risk_factors.append('infant_age')
    elif patient_age > 65:
        risk_score += 8
        risk_factors.append('elderly_age')
    elif patient_age > 50:
        risk_score += 5
        risk_factors.append('middle_age')

    # Comorbidity risk
    high_risk_conditions = [
        'diabetes', 'hypertension', 'heart disease',
        'copd', 'asthma', 'kidney disease', 'cancer'
    ]

    comorbidity_count = sum(
        1 for condition in medical_history
        if any(risk in condition.lower() for risk in high_risk_conditions)
    )

    if comorbidity_count >= 3:
        risk_score += 10
        risk_factors.append('multiple_comorbidities')
    elif comorbidity_count >= 2:
        risk_score += 7
        risk_factors.append('two_comorbidities')
    elif comorbidity_count >= 1:
        risk_score += 4
        risk_factors.append('one_comorbidity')

    score += risk_score
    breakdown['risk_factors'] = risk_score

    # Component 3: Urgency Level (0-15)
    urgency_mapping = {
        'urgent': 15,
        'soon': 8,
        'routine': 0
    }
    urgency_score = urgency_mapping.get(urgency.lower(), 0)
    score += urgency_score
    breakdown['urgency'] = urgency_score

    # Component 4: Vital Signs (if available) (0-20)
    if vital_signs:
        vital_score = calculate_vital_signs_score(vital_signs, patient_age)
        score += vital_score
        breakdown['vital_signs'] = vital_score

    # Determine severity level
    severity_level = categorize_severity(score)

    return {
        'severity_score': min(score, 100),  # Cap at 100
        'severity_level': severity_level,
        'breakdown': breakdown,
        'risk_factors': risk_factors
    }

def calculate_symptom_severity(symptoms: List[Dict]) -> int:
    """Calculate base severity from symptoms."""

    # Symptom severity mapping
    HIGH_SEVERITY_SYMPTOMS = {
        'chest pain': 35,
        'severe headache': 30,
        'difficulty breathing': 35,
        'confusion': 30,
        'severe abdominal pain': 30,
        'severe bleeding': 40,
        'loss of consciousness': 40
    }

    MEDIUM_SEVERITY_SYMPTOMS = {
        'fever': 15,
        'persistent cough': 12,
        'joint pain': 10,
        'back pain': 12,
        'nausea': 10,
        'dizziness': 15
    }

    LOW_SEVERITY_SYMPTOMS = {
        'mild headache': 5,
        'runny nose': 3,
        'minor cut': 5,
        'sore throat': 8
    }

    max_symptom_score = 0

    for symptom in symptoms:
        symptom_name = symptom['symptom_name'].lower()

        # Check high severity
        for high_symptom, score in HIGH_SEVERITY_SYMPTOMS.items():
            if high_symptom in symptom_name:
                max_symptom_score = max(max_symptom_score, score)

        # Check medium severity
        for med_symptom, score in MEDIUM_SEVERITY_SYMPTOMS.items():
            if med_symptom in symptom_name:
                max_symptom_score = max(max_symptom_score, score)

        # Check low severity
        for low_symptom, score in LOW_SEVERITY_SYMPTOMS.items():
            if low_symptom in symptom_name:
                max_symptom_score = max(max_symptom_score, score)

    # Multiple symptoms modifier
    if len(symptoms) >= 3:
        max_symptom_score = min(max_symptom_score * 1.2, 40)

    return int(max_symptom_score)

def categorize_severity(score: int) -> str:
    """Convert numeric score to severity level."""
    if score >= 75:
        return 'critical'
    elif score >= 50:
        return 'high'
    elif score >= 25:
        return 'medium'
    else:
        return 'low'
```

### 1.2 Care Level Recommendation Engine

```python
# api/utils/triage/care_recommender.py

def recommend_care_level(
    severity_score: int,
    severity_level: str,
    has_red_flags: bool,
    patient_context: Dict
) -> Dict:
    """
    Recommend appropriate care level based on severity assessment.

    Returns:
        {
            'care_level': 'online'|'gp'|'specialist'|'emergency',
            'reasoning': List[str],
            'timeframe': str,
            'estimated_cost': int,
            'alternative_options': List[Dict]
        }
    """

    # Override: Red flags always → Emergency
    if has_red_flags:
        return {
            'care_level': 'emergency',
            'reasoning': ['Red flag symptoms detected requiring immediate medical attention'],
            'timeframe': 'immediate',
            'estimated_cost': 5000,
            'requires_ambulance': True,
            'alternative_options': []
        }

    # Critical severity (75-100)
    if severity_level == 'critical':
        return {
            'care_level': 'emergency',
            'reasoning': [
                'High severity score indicates urgent medical attention needed',
                'Symptoms require immediate evaluation and potential intervention'
            ],
            'timeframe': 'within 2 hours',
            'estimated_cost': 5000,
            'alternative_options': []
        }

    # High severity (50-74)
    if severity_level == 'high':
        return {
            'care_level': 'specialist',
            'reasoning': [
                'Symptoms indicate need for specialist evaluation',
                'Complex case requiring specialized expertise'
            ],
            'timeframe': 'within 24-48 hours',
            'estimated_cost': 7500,
            'alternative_options': [
                {
                    'care_level': 'gp',
                    'reasoning': 'GP can provide initial assessment and refer if needed',
                    'timeframe': 'within 2-3 days',
                    'estimated_cost': 3500
                }
            ]
        }

    # Medium severity (25-49)
    if severity_level == 'medium':
        return {
            'care_level': 'gp',
            'reasoning': [
                'Symptoms can be managed by general practitioner',
                'In-person examination recommended'
            ],
            'timeframe': 'within 3-5 days',
            'estimated_cost': 3500,
            'alternative_options': [
                {
                    'care_level': 'online',
                    'reasoning': 'Initial online consultation may be sufficient',
                    'timeframe': 'same day or next day',
                    'estimated_cost': 1500
                }
            ]
        }

    # Low severity (0-24)
    return {
        'care_level': 'online',
        'reasoning': [
            'Symptoms can be addressed through online consultation',
            'No immediate physical examination required',
            'Cost-effective and convenient option'
        ],
        'timeframe': 'same day',
        'estimated_cost': 1500,
        'alternative_options': [
            {
                'care_level': 'gp',
                'reasoning': 'In-person visit if you prefer face-to-face consultation',
                'timeframe': 'within 1 week',
                'estimated_cost': 3500
            }
        ]
    }
```

### 1.3 Department Routing (When Specialist Needed)

```python
# api/utils/triage/department_router.py

def suggest_department(
    symptoms: List[Dict],
    care_level: str,
    available_departments: List[Dict]
) -> Dict:
    """
    Suggest appropriate department when specialist care needed.

    Only called when care_level = 'specialist' or 'emergency'
    """

    if care_level == 'emergency':
        emergency_dept = find_department(available_departments, 'emergency medicine')
        if emergency_dept:
            return {
                'department_id': emergency_dept['id'],
                'department_name': emergency_dept['name'],
                'confidence': 1.0,
                'reasoning': 'Emergency department required for critical cases'
            }

    # Symptom-based department mapping (from existing logic)
    body_parts = [symptom['body_part_id'] for symptom in symptoms]

    # Use existing mapping logic
    preferred_departments = get_preferred_departments_for_symptoms(body_parts)

    # Match with available departments
    for dept_name in preferred_departments:
        dept = find_department(available_departments, dept_name)
        if dept:
            return {
                'department_id': dept['id'],
                'department_name': dept['name'],
                'confidence': 0.8,
                'reasoning': f'Symptom pattern matches {dept_name} specialty'
            }

    # Fallback to General Medicine
    general_med = find_department(available_departments, 'general medicine')
    if general_med:
        return {
            'department_id': general_med['id'],
            'department_name': general_med['name'],
            'confidence': 0.5,
            'reasoning': 'General Medicine can provide initial evaluation and refer if needed'
        }

    return None
```

### 1.4 API Endpoint Implementation

```python
# api/views/triage_views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from api.utils.triage.red_flags import check_red_flags
from api.utils.triage.severity_calculator import calculate_severity_score
from api.utils.triage.care_recommender import recommend_care_level
from api.utils.triage.department_router import suggest_department
from api.models import Hospital, Department

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assess_severity(request):
    """
    Assess severity and recommend care level for patient symptoms.

    Request Body:
    {
        "symptoms": [
            {
                "body_part_id": "chest",
                "body_part_name": "Chest",
                "symptom_name": "Chest pain",
                "description": "Sharp pain, worse with breathing"
            }
        ],
        "urgency": "urgent",
        "hospital_id": 123,
        "patient_context": {
            "age": 55,
            "gender": "male",
            "medical_history": ["Hypertension", "Diabetes"]
        }
    }

    Response:
    {
        "severity_assessment": {
            "severity_score": 85,
            "severity_level": "high",
            "has_red_flags": false,
            "breakdown": {...}
        },
        "care_recommendation": {
            "care_level": "specialist",
            "department": {...},
            "timeframe": "within 24-48 hours",
            "estimated_cost": 7500,
            "reasoning": [...]
        },
        "triage_id": "TRG-123456"
    }
    """

    try:
        # Extract request data
        symptoms = request.data.get('symptoms', [])
        urgency = request.data.get('urgency', 'routine')
        hospital_id = request.data.get('hospital_id')
        patient_context = request.data.get('patient_context', {})

        # Validation
        if not symptoms:
            return Response(
                {'error': 'At least one symptom is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Step 1: Check for red flags
        red_flag_check = check_red_flags(symptoms)

        # Step 2: Calculate severity score
        severity_assessment = calculate_severity_score(
            symptoms=symptoms,
            patient_age=patient_context.get('age', 30),
            medical_history=patient_context.get('medical_history', []),
            urgency=urgency
        )

        # Merge red flags into assessment
        if red_flag_check['has_red_flags']:
            severity_assessment.update(red_flag_check)
            severity_assessment['severity_score'] = 100
            severity_assessment['severity_level'] = 'critical'

        # Step 3: Recommend care level
        care_recommendation = recommend_care_level(
            severity_score=severity_assessment['severity_score'],
            severity_level=severity_assessment['severity_level'],
            has_red_flags=red_flag_check['has_red_flags'],
            patient_context=patient_context
        )

        # Step 4: Suggest department (if specialist/emergency care)
        if care_recommendation['care_level'] in ['specialist', 'emergency']:
            # Fetch available departments
            hospital = Hospital.objects.get(id=hospital_id)
            available_depts = list(hospital.departments.filter(is_active=True).values(
                'id', 'name', 'code'
            ))

            department_suggestion = suggest_department(
                symptoms=symptoms,
                care_level=care_recommendation['care_level'],
                available_departments=available_depts
            )

            if department_suggestion:
                care_recommendation['department'] = department_suggestion

        # Step 5: Log triage for tracking (create TriageLog model)
        triage_log = create_triage_log(
            user=request.user,
            symptoms=symptoms,
            severity_assessment=severity_assessment,
            care_recommendation=care_recommendation
        )

        # Step 6: Return response
        return Response({
            'severity_assessment': severity_assessment,
            'care_recommendation': care_recommendation,
            'triage_id': triage_log.reference_number
        }, status=status.HTTP_200_OK)

    except Hospital.DoesNotExist:
        return Response(
            {'error': 'Hospital not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        logger.error(f"Triage assessment error: {str(e)}")
        return Response(
            {'error': 'Failed to assess severity'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
```

### 1.5 Data Logging (Critical for ML)

```python
# api/models/triage.py

from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

class TriageLog(models.Model):
    """
    Logs every triage assessment for ML training data collection.
    """

    # Identification
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    reference_number = models.CharField(max_length=20, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='triage_logs')
    hospital = models.ForeignKey('Hospital', on_delete=models.SET_NULL, null=True)

    # Input Data
    symptoms_data = models.JSONField()  # Original symptom selection
    urgency = models.CharField(max_length=20)
    patient_age = models.IntegerField(null=True, blank=True)
    patient_gender = models.CharField(max_length=10, null=True, blank=True)
    medical_history = models.JSONField(default=list)

    # Assessment Output
    severity_score = models.IntegerField()  # 0-100
    severity_level = models.CharField(max_length=20)  # low/medium/high/critical
    has_red_flags = models.BooleanField(default=False)
    red_flags_found = models.JSONField(default=list)

    # Recommendation
    recommended_care_level = models.CharField(max_length=20)  # online/gp/specialist/emergency
    recommended_department_id = models.IntegerField(null=True, blank=True)
    recommended_department_name = models.CharField(max_length=100, null=True, blank=True)
    estimated_cost = models.IntegerField()

    # User Action (what actually happened)
    user_selected_care_level = models.CharField(max_length=20, null=True, blank=True)
    user_selected_department_id = models.IntegerField(null=True, blank=True)
    appointment_created = models.BooleanField(default=False)
    appointment_id = models.UUIDField(null=True, blank=True)

    # Outcome Tracking (filled in later)
    actual_diagnosis = models.CharField(max_length=200, null=True, blank=True)
    was_correctly_triaged = models.BooleanField(null=True, blank=True)
    escalated_to_higher_care = models.BooleanField(default=False)
    de_escalated_to_lower_care = models.BooleanField(default=False)
    patient_satisfaction = models.IntegerField(null=True, blank=True)  # 1-5 rating

    # ML Training Label (filled by medical staff review)
    ground_truth_severity = models.CharField(max_length=20, null=True, blank=True)
    labeled_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='labeled_triages')
    labeled_at = models.DateTimeField(null=True, blank=True)

    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'triage_logs'
        indexes = [
            models.Index(fields=['created_at']),
            models.Index(fields=['severity_level']),
            models.Index(fields=['recommended_care_level']),
        ]

    def __str__(self):
        return f"{self.reference_number} - {self.severity_level}"
```

**Why This Model is Critical**:
1. **Input-Output Pairs**: Every triage creates a training example
2. **Ground Truth Labels**: Medical staff can review and correct
3. **Outcome Tracking**: Did recommendation match actual need?
4. **Feature Engineering**: Rich data for ML model training

After 1000 triages → We have 1000 labeled examples to train ML model! 🎯

---

## Phase 2: Data Collection & Preparation

**Duration**: Weeks 3-6
**Goal**: Collect and prepare high-quality training data
**Target**: 5,000-10,000 labeled triage cases

### 2.1 Data Collection Strategy

#### Immediate Data Sources

**1. Historical Appointment Data**
```sql
-- Extract past appointments with symptoms
SELECT
    a.id,
    a.patient_id,
    a.chief_complaint,
    a.symptoms_data,
    a.appointment_type,
    a.department_id,
    d.name as department_name,
    p.age,
    p.gender,
    p.medical_history,
    a.created_at,
    a.status,
    a.actual_diagnosis  -- if available
FROM appointments a
JOIN patients p ON a.patient_id = p.id
JOIN departments d ON a.department_id = d.id
WHERE a.symptoms_data IS NOT NULL
AND a.created_at >= NOW() - INTERVAL '1 year';
```

**Estimated Data**: If you have 100 appointments/week × 52 weeks = **5,200 appointments** → Good starting dataset!

**2. Prescription Request Data**
```sql
-- Prescription requests include symptoms
SELECT
    pr.id,
    pr.patient_id,
    pr.medications_requested,
    pr.urgency,
    pr.triage_category,
    pr.assigned_to_role,
    pr.pharmacist_review_action,
    pr.had_clinical_intervention,
    p.age,
    p.gender,
    p.medical_history
FROM prescription_requests pr
JOIN patients p ON pr.patient_id = p.id
WHERE pr.created_at >= NOW() - INTERVAL '1 year';
```

**3. Real-Time Triage Logs** (Phase 1)
- Every patient using new triage system generates training data
- 100 patients/week × 4 weeks = **400 new examples** during Phase 2

#### Data Labeling Workflow

**Challenge**: Historical data doesn't have "ground truth" severity labels.

**Solution**: Medical Staff Review

```python
# api/management/commands/label_triage_data.py

class Command(BaseCommand):
    help = 'CLI tool for medical staff to label historical triage data'

    def handle(self, *args, **options):
        unlabeled_logs = TriageLog.objects.filter(
            ground_truth_severity__isnull=True
        ).order_by('created_at')

        for i, log in enumerate(unlabeled_logs[:100], 1):
            self.stdout.write(f"\n\n{'='*60}")
            self.stdout.write(f"Case {i}/100 - {log.reference_number}")
            self.stdout.write(f"{'='*60}\n")

            # Display case details
            self.stdout.write(f"Patient: {log.patient_age}yo {log.patient_gender}")
            self.stdout.write(f"Medical History: {', '.join(log.medical_history)}")
            self.stdout.write(f"\nSymptoms:")
            for symptom in log.symptoms_data:
                self.stdout.write(f"  • {symptom['symptom_name']}: {symptom.get('description', 'N/A')}")

            self.stdout.write(f"\nUrgency: {log.urgency}")

            # Show system's recommendation
            self.stdout.write(f"\nSystem Recommended: {log.recommended_care_level.upper()}")
            self.stdout.write(f"Severity Score: {log.severity_score}/100")

            # Show actual outcome if available
            if log.appointment_created:
                self.stdout.write(f"\nActual Outcome:")
                self.stdout.write(f"  • Appointment created: Yes")
                self.stdout.write(f"  • Department: {log.user_selected_department_name}")
                if log.actual_diagnosis:
                    self.stdout.write(f"  • Diagnosis: {log.actual_diagnosis}")

            # Ask for label
            self.stdout.write(f"\n\nWhat is the CORRECT severity for this case?")
            self.stdout.write("1. Low (online consultation sufficient)")
            self.stdout.write("2. Medium (GP appointment needed)")
            self.stdout.write("3. High (specialist appointment needed)")
            self.stdout.write("4. Critical (emergency care needed)")
            self.stdout.write("5. Skip / Uncertain")

            choice = input("\nEnter choice (1-5): ").strip()

            severity_map = {
                '1': 'low',
                '2': 'medium',
                '3': 'high',
                '4': 'critical'
            }

            if choice in severity_map:
                log.ground_truth_severity = severity_map[choice]
                log.labeled_by = self.get_current_user()  # From command context
                log.labeled_at = timezone.now()

                # Calculate if system was correct
                log.was_correctly_triaged = (
                    log.severity_level == log.ground_truth_severity
                )

                log.save()
                self.stdout.write(self.style.SUCCESS(f"✓ Labeled as: {severity_map[choice]}"))
            elif choice == '5':
                self.stdout.write(self.style.WARNING("Skipped"))
            else:
                self.stdout.write(self.style.ERROR("Invalid choice, skipping"))
```

**Labeling Rate**: 2-3 minutes/case × 60 cases/hour = **20 cases/hour per medical staff**

**Team Effort**:
- 5 doctors/pharmacists × 4 hours each = **400 labeled cases in one day**
- Repeat once a week for 4 weeks = **1,600 labeled cases** 🎯

#### Data Quality Checklist

**Before Training**:
- [ ] Minimum 1,000 labeled examples
- [ ] Balanced classes: ~20% Low, ~50% Medium, ~25% High, ~5% Critical
- [ ] No duplicate cases (same patient, same symptoms, same day)
- [ ] Complete data (no missing symptoms, age, gender)
- [ ] Medical staff inter-rater agreement > 80% (test on 100 overlapping cases)

### 2.2 Data Cleaning & Validation

```python
# scripts/data_preparation/clean_triage_data.py

import pandas as pd
import numpy as np
from typing import List, Dict

def load_triage_data() -> pd.DataFrame:
    """Load labeled triage logs from database."""
    from api.models import TriageLog

    logs = TriageLog.objects.filter(
        ground_truth_severity__isnull=False  # Only labeled data
    ).values(
        'id',
        'reference_number',
        'symptoms_data',
        'urgency',
        'patient_age',
        'patient_gender',
        'medical_history',
        'severity_score',
        'severity_level',
        'ground_truth_severity',  # ← Target label
        'has_red_flags',
        'created_at'
    )

    df = pd.DataFrame(logs)
    return df

def clean_data(df: pd.DataFrame) -> pd.DataFrame:
    """Clean and validate data."""

    initial_count = len(df)

    # 1. Remove duplicates (same patient, same day, same symptoms)
    df['date'] = pd.to_datetime(df['created_at']).dt.date
    df = df.drop_duplicates(subset=['patient_id', 'date', 'symptoms_data'], keep='first')
    print(f"Removed {initial_count - len(df)} duplicates")

    # 2. Handle missing values
    # Age: impute with median if missing
    df['patient_age'] = df['patient_age'].fillna(df['patient_age'].median())

    # Gender: impute with mode or 'unknown'
    df['patient_gender'] = df['patient_gender'].fillna('unknown')

    # Medical history: empty list if null
    df['medical_history'] = df['medical_history'].apply(
        lambda x: x if isinstance(x, list) else []
    )

    # 3. Remove invalid ages
    df = df[df['patient_age'].between(0, 120)]

    # 4. Standardize text fields
    df['patient_gender'] = df['patient_gender'].str.lower()
    df['urgency'] = df['urgency'].str.lower()

    # 5. Validate symptoms_data structure
    def validate_symptoms(symptoms):
        if not isinstance(symptoms, list) or len(symptoms) == 0:
            return False
        for symptom in symptoms:
            if 'symptom_name' not in symptom:
                return False
        return True

    df = df[df['symptoms_data'].apply(validate_symptoms)]

    final_count = len(df)
    print(f"Final dataset: {final_count} examples ({(final_count/initial_count)*100:.1f}% retained)")

    return df

def analyze_class_distribution(df: pd.DataFrame):
    """Check if classes are balanced."""
    print("\nClass Distribution:")
    print(df['ground_truth_severity'].value_counts())
    print("\nPercentages:")
    print(df['ground_truth_severity'].value_counts(normalize=True) * 100)

    # Check for class imbalance
    min_class_pct = df['ground_truth_severity'].value_counts(normalize=True).min()
    if min_class_pct < 0.05:  # Less than 5%
        print("\n⚠️  WARNING: Severe class imbalance detected!")
        print("   Consider collecting more data for minority classes")

def save_cleaned_data(df: pd.DataFrame, filepath: str):
    """Save cleaned data for ML training."""
    df.to_csv(filepath, index=False)
    print(f"\n✓ Saved cleaned data to: {filepath}")

if __name__ == '__main__':
    # Load data
    df = load_triage_data()
    print(f"Loaded {len(df)} labeled examples")

    # Clean data
    df_clean = clean_data(df)

    # Analyze
    analyze_class_distribution(df_clean)

    # Save
    save_cleaned_data(df_clean, 'data/triage_training_data.csv')
```

### 2.3 Train-Validation-Test Split

```python
# scripts/data_preparation/split_data.py

from sklearn.model_selection import train_test_split
import pandas as pd

def split_data(df: pd.DataFrame, test_size=0.15, val_size=0.15, random_state=42):
    """
    Split data into train/validation/test sets.

    Stratified split ensures each set has same class distribution.
    """

    # First split: separate test set (15%)
    train_val, test = train_test_split(
        df,
        test_size=test_size,
        stratify=df['ground_truth_severity'],  # Maintain class distribution
        random_state=random_state
    )

    # Second split: separate validation from training
    # val_size is relative to train_val (e.g., 0.15 of 0.85 = ~13% of total)
    val_relative_size = val_size / (1 - test_size)

    train, val = train_test_split(
        train_val,
        test_size=val_relative_size,
        stratify=train_val['ground_truth_severity'],
        random_state=random_state
    )

    print(f"\nData Split:")
    print(f"Training:   {len(train):,} examples ({len(train)/len(df)*100:.1f}%)")
    print(f"Validation: {len(val):,} examples ({len(val)/len(df)*100:.1f}%)")
    print(f"Test:       {len(test):,} examples ({len(test)/len(df)*100:.1f}%)")

    # Verify class distribution in each set
    for name, dataset in [('Train', train), ('Val', val), ('Test', test)]:
        print(f"\n{name} Set Class Distribution:")
        print(dataset['ground_truth_severity'].value_counts(normalize=True) * 100)

    return train, val, test

def save_splits(train, val, test, output_dir='data/splits/'):
    """Save splits to separate files."""
    import os
    os.makedirs(output_dir, exist_ok=True)

    train.to_csv(f'{output_dir}/train.csv', index=False)
    val.to_csv(f'{output_dir}/val.csv', index=False)
    test.to_csv(f'{output_dir}/test.csv', index=False)

    print(f"\n✓ Saved splits to: {output_dir}")

if __name__ == '__main__':
    # Load cleaned data
    df = pd.read_csv('data/triage_training_data.csv')

    # Split
    train, val, test = split_data(df)

    # Save
    save_splits(train, val, test)
```

---

## Phase 3: Feature Engineering

**Duration**: Weeks 7-8
**Goal**: Transform raw data into ML-ready numerical features
**Why**: Models need numbers, not words

### 3.1 Feature Categories

#### A. Symptom Features

```python
# scripts/feature_engineering/symptom_features.py

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer
import numpy as np

class SymptomFeatureExtractor:
    """Extract numerical features from symptoms."""

    def __init__(self):
        self.symptom_vectorizer = TfidfVectorizer(
            max_features=100,  # Top 100 most common symptoms
            ngram_range=(1, 2)  # Unigrams and bigrams
        )
        self.body_part_encoder = MultiLabelBinarizer()

    def fit(self, symptoms_list):
        """Learn vocabulary from training data."""
        # Extract all symptom names
        all_symptoms = []
        all_body_parts = []

        for symptoms in symptoms_list:
            symptom_names = [s['symptom_name'] for s in symptoms]
            all_symptoms.extend(symptom_names)

            body_parts = [s['body_part_id'] for s in symptoms]
            all_body_parts.append(body_parts)

        # Fit vectorizer
        self.symptom_vectorizer.fit(all_symptoms)
        self.body_part_encoder.fit(all_body_parts)

    def transform(self, symptoms):
        """Convert symptoms to numerical features."""
        features = {}

        # 1. Symptom count
        features['symptom_count'] = len(symptoms)

        # 2. TF-IDF encoding of symptom names
        symptom_names = [s['symptom_name'] for s in symptoms]
        symptom_text = ' '.join(symptom_names)
        tfidf_features = self.symptom_vectorizer.transform([symptom_text]).toarray()[0]

        for i, val in enumerate(tfidf_features):
            features[f'symptom_tfidf_{i}'] = val

        # 3. Body parts multi-hot encoding
        body_parts = [s['body_part_id'] for s in symptoms]
        body_part_encoded = self.body_part_encoder.transform([body_parts])[0]

        for i, val in enumerate(body_part_encoded):
            body_part_name = self.body_part_encoder.classes_[i]
            features[f'body_part_{body_part_name}'] = val

        # 4. Description length (if available)
        total_description_length = sum(
            len(s.get('description', ''))
            for s in symptoms
        )
        features['total_description_length'] = total_description_length

        # 5. Specific high-risk symptoms (binary flags)
        high_risk_keywords = [
            'severe', 'sudden', 'crushing', 'radiating',
            'worst', 'blood', 'unconscious', 'confusion'
        ]

        combined_text = ' '.join([
            s['symptom_name'] + ' ' + s.get('description', '')
            for s in symptoms
        ]).lower()

        for keyword in high_risk_keywords:
            features[f'has_{keyword}'] = int(keyword in combined_text)

        return features
```

#### B. Patient Context Features

```python
# scripts/feature_engineering/patient_features.py

def extract_patient_features(patient_data):
    """Extract features from patient context."""
    features = {}

    age = patient_data.get('age', 30)
    gender = patient_data.get('gender', 'unknown')
    medical_history = patient_data.get('medical_history', [])

    # 1. Age features
    features['age'] = age
    features['age_squared'] = age ** 2  # Capture non-linear age effects

    # Age groups (clinical relevance)
    features['is_infant'] = int(age < 1)
    features['is_child'] = int(1 <= age < 12)
    features['is_adolescent'] = int(12 <= age < 18)
    features['is_young_adult'] = int(18 <= age < 40)
    features['is_middle_aged'] = int(40 <= age < 65)
    features['is_elderly'] = int(age >= 65)

    # 2. Gender (one-hot encoding)
    features['gender_male'] = int(gender.lower() == 'male')
    features['gender_female'] = int(gender.lower() == 'female')
    features['gender_unknown'] = int(gender.lower() == 'unknown')

    # 3. Medical history features
    features['comorbidity_count'] = len(medical_history)

    # Specific conditions (multi-hot encoding)
    high_risk_conditions = [
        'diabetes', 'hypertension', 'heart disease', 'copd',
        'asthma', 'kidney disease', 'cancer', 'stroke',
        'obesity', 'immunocompromised'
    ]

    medical_history_lower = [cond.lower() for cond in medical_history]

    for condition in high_risk_conditions:
        # Check if condition mentioned in any history item
        has_condition = any(condition in item for item in medical_history_lower)
        features[f'history_{condition}'] = int(has_condition)

    # 4. Risk scores
    # Cardiac risk (simplified Framingham)
    cardiac_risk = 0
    if features['age'] > 50:
        cardiac_risk += 2
    if features['gender_male']:
        cardiac_risk += 1
    if features['history_diabetes']:
        cardiac_risk += 2
    if features['history_hypertension']:
        cardiac_risk += 2

    features['cardiac_risk_score'] = cardiac_risk / 7.0  # Normalize to 0-1

    return features
```

#### C. Urgency and Temporal Features

```python
def extract_urgency_features(urgency, timestamp=None):
    """Extract features from urgency level and timing."""
    features = {}

    # 1. Urgency level (one-hot encoding)
    features['urgency_routine'] = int(urgency == 'routine')
    features['urgency_soon'] = int(urgency == 'soon')
    features['urgency_urgent'] = int(urgency == 'urgent')

    # 2. Urgency score (ordinal encoding)
    urgency_scores = {'routine': 0, 'soon': 0.5, 'urgent': 1.0}
    features['urgency_score'] = urgency_scores.get(urgency, 0)

    # 3. Temporal features (if timestamp provided)
    if timestamp:
        from datetime import datetime

        # Hour of day (some conditions worse at night)
        hour = timestamp.hour
        features['hour_of_day'] = hour
        features['is_night'] = int(20 <= hour or hour < 6)
        features['is_weekend'] = int(timestamp.weekday() >= 5)

    return features
```

#### D. Combined Feature Extraction

```python
# scripts/feature_engineering/feature_pipeline.py

import pandas as pd

class TriageFeaturePipeline:
    """Complete feature extraction pipeline."""

    def __init__(self):
        self.symptom_extractor = SymptomFeatureExtractor()
        self.fitted = False

    def fit(self, df):
        """Fit extractors on training data."""
        self.symptom_extractor.fit(df['symptoms_data'].tolist())
        self.fitted = True
        return self

    def transform(self, df):
        """Transform data to feature matrix."""
        if not self.fitted:
            raise ValueError("Pipeline must be fitted before transform")

        all_features = []

        for idx, row in df.iterrows():
            features = {}

            # Extract from all sources
            symptom_features = self.symptom_extractor.transform(row['symptoms_data'])
            patient_features = extract_patient_features({
                'age': row['patient_age'],
                'gender': row['patient_gender'],
                'medical_history': row['medical_history']
            })
            urgency_features = extract_urgency_features(
                row['urgency'],
                row.get('created_at')
            )

            # Combine all features
            features.update(symptom_features)
            features.update(patient_features)
            features.update(urgency_features)

            all_features.append(features)

        # Convert to DataFrame
        feature_df = pd.DataFrame(all_features)

        # Add target variable
        feature_df['target'] = df['ground_truth_severity'].values

        return feature_df

    def fit_transform(self, df):
        """Fit and transform in one step (for training data)."""
        self.fit(df)
        return self.transform(df)
```

### 3.2 Feature Scaling

```python
# scripts/feature_engineering/scaling.py

from sklearn.preprocessing import StandardScaler
import joblib

def scale_features(X_train, X_val, X_test):
    """
    Standardize features to mean=0, std=1.

    IMPORTANT: Fit scaler ONLY on training data to prevent data leakage.
    """

    scaler = StandardScaler()

    # Fit on training data
    X_train_scaled = scaler.fit_transform(X_train)

    # Transform validation and test using training statistics
    X_val_scaled = scaler.transform(X_val)
    X_test_scaled = scaler.transform(X_test)

    # Save scaler for production use
    joblib.dump(scaler, 'models/feature_scaler.pkl')
    print("✓ Saved feature scaler")

    return X_train_scaled, X_val_scaled, X_test_scaled
```

### 3.3 Feature Analysis

```python
# scripts/feature_engineering/analyze_features.py

import matplotlib.pyplot as plt
import seaborn as sns

def analyze_feature_importance(X, y, feature_names):
    """Analyze which features correlate with severity."""

    from sklearn.ensemble import RandomForestClassifier

    # Train quick RF model
    rf = RandomForestClassifier(n_estimators=100, random_state=42)
    rf.fit(X, y)

    # Get feature importances
    importances = rf.feature_importances_

    # Create DataFrame for easy plotting
    importance_df = pd.DataFrame({
        'feature': feature_names,
        'importance': importances
    }).sort_values('importance', ascending=False)

    # Plot top 20 features
    plt.figure(figsize=(10, 8))
    sns.barplot(data=importance_df.head(20), x='importance', y='feature')
    plt.title('Top 20 Most Important Features')
    plt.xlabel('Importance Score')
    plt.tight_layout()
    plt.savefig('analysis/feature_importance.png')
    print("✓ Saved feature importance plot")

    # Print top features
    print("\nTop 10 Most Important Features:")
    print(importance_df.head(10).to_string(index=False))

    return importance_df
```

---

**[Document continues with Phases 4-8, Safety/Ethics, and Learning Resources...]**

*This is Part 1 of the comprehensive ML implementation guide. The document is quite extensive (50+ pages). Would you like me to:*

1. **Continue with the remaining phases** (Model Development, Training, Integration, Deployment)
2. **Focus on a specific phase** you want to dive into first
3. **Create a separate hands-on tutorial** for Phase 1 implementation (rule-based system)

**What's your preference for learning this?** I can structure the content to match your learning style! 🚀
