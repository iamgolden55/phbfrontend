---
title: "Part 3: Data Collection & Labeling - ML Training Data"
date: 2025-11-11
author: Claude
part: 3 of 9
difficulty: beginner-friendly
estimated_time: 4-6 weeks (mostly waiting)
prerequisite: "Part 2 - Phase 1 Rule-Based Triage (must be deployed)"
tags: [machine-learning, data-collection, labeling, healthcare, beginner]
---

# Part 3: Data Collection & Labeling

**Welcome to Phase 2!** 🎓

In Phase 1, you built a rule-based triage system. Now you're going to collect the **data that teaches your ML model to be smarter than those rules**.

---

## 🤔 What Is This Phase About? (Beginner Explanation)

### The Simple Version

Remember when you learned to ride a bike? Someone didn't just give you a rulebook that said:
- "If leaning left, turn handlebars 3 degrees right"
- "If speed > 10mph, shift weight backward by 2 inches"

Instead, you:
1. **Tried riding** (generated examples)
2. **Fell down** (made mistakes)
3. **Someone told you** "lean less!" or "pedal faster!" (got labels/feedback)
4. **Your brain learned patterns** from those examples

**That's exactly what we're doing with ML!**

### The ML Version

**Phase 1** = Your rule-based system (the instruction manual)
**Phase 2** = Collecting examples (you riding the bike)
**Phase 3-5** = Training the ML model (your brain learning patterns)
**Phase 6-7** = Using the trained model (you riding confidently)

Right now, your triage system works like this:
```
Patient symptoms → Rules (if chest pain, score = 80) → Recommendation
```

After ML training, it will work like this:
```
Patient symptoms → ML Model (learned from 1000s of examples) → Better recommendation
```

---

## 📊 What Is "Training Data"? (ELI5)

### Analogy: Learning to Recognize Dogs

**Scenario**: You want to teach a computer to recognize dogs in photos.

**Bad Approach** (rules-based):
```
IF has_four_legs AND has_tail AND has_fur THEN dog
```
Problem: Cats also have four legs, tail, and fur! ❌

**Good Approach** (ML):
```
Show computer 1,000 photos:
  - 500 labeled "dog" 🐕
  - 500 labeled "not dog" 🐈🐦🐿️

Computer learns patterns:
  - Dogs have specific ear shapes
  - Dogs have specific snout lengths
  - Dogs have specific body proportions

Now it can recognize dogs it's never seen before! ✅
```

### Applying This to Medical Triage

**Our Task**: Teach computer to recognize severity levels

**Our Training Data**:
```
Example 1:
  Input: "chest pain, 55 years old, diabetic, urgent"
  Label: "HIGH severity" (determined by doctor review)

Example 2:
  Input: "mild headache, 25 years old, no history, routine"
  Label: "LOW severity" (determined by doctor review)

... 1,000 more examples ...

Computer learns patterns:
  - Chest pain + age > 50 + diabetes = high risk
  - Mild headache + young + no history = low risk
```

**Key Insight**: The more examples, the better the computer learns!

---

## 🎯 What You'll Learn in This Part

By the end of this guide, you'll understand:

✅ What training data is and why it matters
✅ How much data you need (and why)
✅ What "labeling" means (and who does it)
✅ How to set up a labeling workflow for doctors
✅ How to measure data quality
✅ When you're ready to start building the ML model

**Time Commitment**:
- **Setup**: 4-6 hours (one-time)
- **Data collection**: 4-6 weeks (passive - system runs in background)
- **Labeling**: 10-15 hours total (spread across weeks)

---

## 📚 Table of Contents

1. [Understanding Training Data](#1-understanding-training-data)
2. [How Much Data Do You Need?](#2-how-much-data-do-you-need)
3. [What Is "Labeling"?](#3-what-is-labeling)
4. [Setting Up Data Collection](#4-setting-up-data-collection)
5. [Building a Labeling Interface](#5-building-a-labeling-interface)
6. [Quality Control](#6-quality-control)
7. [When Are You Ready for ML?](#7-when-are-you-ready-for-ml)
8. [Real-World Example Walkthrough](#8-real-world-example-walkthrough)

---

## 1. Understanding Training Data

### What Is Training Data Made Of?

Every training example has **two parts**:

**Part 1: Input (Features)**
The information the model uses to make predictions
```
Example:
  - Symptoms: ["chest pain", "shortness of breath"]
  - Age: 55
  - Medical history: ["diabetes", "hypertension"]
  - Urgency: "urgent"
```

**Part 2: Output (Label)**
The correct answer (what the model should predict)
```
Example:
  - Ground truth severity: "high"
  - Correct care level: "specialist"
  - Correct department: "cardiology"
```

### Real Example from Your TriageLog Table

Remember the `TriageLog` model you created in Phase 1? Let's see what one record looks like:

```python
# A single triage record in your database

Triage Record #42:
┌─────────────────────────────────────────────────┐
│ INPUT DATA (what patient provided)             │
├─────────────────────────────────────────────────┤
│ symptoms_data:                                  │
│   [{"symptom_name": "chest pain",              │
│     "duration": "hours",                        │
│     "progression": "getting worse"}]            │
│                                                 │
│ urgency: "urgent"                               │
│ patient_age: 55                                 │
│ medical_history: ["diabetes"]                   │
├─────────────────────────────────────────────────┤
│ SYSTEM PREDICTION (what rules calculated)      │
├─────────────────────────────────────────────────┤
│ severity_score: 77                              │
│ severity_level: "high"                          │
│ recommended_care_level: "specialist"            │
│ recommended_department_id: 3 (Cardiology)       │
├─────────────────────────────────────────────────┤
│ GROUND TRUTH (what doctor said - added later)  │
├─────────────────────────────────────────────────┤
│ ground_truth_severity: "critical" ⚠️           │
│ actual_diagnosis: "Angina - heart attack risk" │
│ was_correctly_triaged: False                    │
│   (system said "high", doctor said "critical") │
│                                                 │
│ labeled_by: Dr. Smith (user_id: 12)            │
│ labeled_at: 2025-11-15 14:30:00                │
└─────────────────────────────────────────────────┘
```

**This is ONE training example!**

**Key Observation**: The system predicted "high" but doctor said "critical". The ML model will learn from this mistake!

---

## 2. How Much Data Do You Need?

### The Short Answer

**Minimum**: 500-1,000 labeled examples
**Good**: 2,000-5,000 labeled examples
**Excellent**: 10,000+ labeled examples

But it's not just about quantity - **quality matters more**!

### Why These Numbers?

Think of it like learning a language:

**100 words** = You can order food at a restaurant
**1,000 words** = You can have basic conversations
**10,000 words** = You're fluent

Same with ML:

**500 examples** = Model learns basic patterns
**2,000 examples** = Model handles most cases well
**10,000 examples** = Model is very accurate

### Breaking Down by Category

You need examples from **ALL four severity levels**:

```
Target Distribution (1,000 examples):

┌────────────┬───────────┬────────────┬─────────────────────────┐
│ Severity   │ Expected  │ # Examples │ Why This Many?          │
│ Level      │ %         │ Needed     │                         │
├────────────┼───────────┼────────────┼─────────────────────────┤
│ LOW        │ 60-70%    │ 600-700    │ Most common (colds,     │
│            │           │            │ minor issues)           │
├────────────┼───────────┼────────────┼─────────────────────────┤
│ MEDIUM     │ 20-25%    │ 200-250    │ Common (persistent      │
│            │           │            │ symptoms, follow-ups)   │
├────────────┼───────────┼────────────┼─────────────────────────┤
│ HIGH       │ 8-12%     │ 80-120     │ Less common (specialist │
│            │           │            │ needed)                 │
├────────────┼───────────┼────────────┼─────────────────────────┤
│ CRITICAL   │ 1-3%      │ 10-30      │ Rare (emergencies)      │
│            │           │            │ ⚠️ Need to oversample!  │
└────────────┴───────────┴────────────┴─────────────────────────┘
```

**⚠️ Important Problem**: You'll get lots of LOW examples, very few CRITICAL!

**Solution**: Oversample critical cases
- Ask doctors to label ALL emergency cases
- Maybe label only 10% of routine cases
- This balances your dataset

### Realistic Timeline

```
Week 1-2:    System goes live → 50-100 triages created
Week 3-4:    Start labeling first batch → 100-200 labeled
Week 5-8:    Continued use → 500-800 labeled (minimum reached!)
Week 9-12:   More labeling → 1,000-2,000 labeled (ready for ML!)
```

**Pro Tip**: Start labeling in small batches (100 at a time) while collecting more data.

---

## 3. What Is "Labeling"? (For Complete Beginners)

### Simple Explanation

**Labeling** = Having an expert tell you the "correct answer" for each example

### Real-World Analogy

**Scenario**: Teaching a kid to identify fruits

**Unlabeled Data**:
```
Photo 1: [image of round red object]
Photo 2: [image of yellow curved object]
Photo 3: [image of green bumpy object]
```

**Labeled Data** (adult labels them):
```
Photo 1: [image of round red object] → LABEL: "apple" ✅
Photo 2: [image of yellow curved object] → LABEL: "banana" ✅
Photo 3: [image of green bumpy object] → LABEL: "kiwi" ✅
```

Now the kid can learn: "round + red = apple"

### In Your Triage System

**Unlabeled Triage** (what system has):
```
Patient complained of:
  - Chest pain (duration: hours)
  - Shortness of breath
  - Age: 62, diabetic

System predicted: severity_level = "high"
```

**Labeled Triage** (doctor reviews):
```
Patient complained of:
  - Chest pain (duration: hours)
  - Shortness of breath
  - Age: 62, diabetic

System predicted: severity_level = "high"

✅ DOCTOR REVIEW (labeling):
  - Actual diagnosis: "Myocardial infarction (heart attack)"
  - Correct severity: "CRITICAL" ⚠️
  - Was system correct? NO (it said "high", should be "critical")
  - Notes: "Chest pain + diabetes + age = very high risk"
```

**This is labeling!** A medical expert adds the "ground truth" (correct answer).

---

## 4. Setting Up Data Collection

### Step 1: Verify Phase 1 Is Running

Before collecting data, make sure your rule-based system from Phase 1 is deployed and working:

```bash
# Check that triage endpoint works
curl -X POST http://localhost:8000/api/triage/assess-severity/ \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "symptoms": [{"symptom_name": "headache"}],
    "urgency": "routine",
    "hospital_id": 1
  }'

# Should return triage result with severity_score, care_level, etc.
```

✅ **Success Criteria**: You get a JSON response with triage results

### Step 2: Monitor Data Accumulation

Create a simple dashboard to track how much data you're collecting:

**Create file**: `basebackend/api/views/triage_stats_views.py`

```python
# api/views/triage_stats_views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Count, Q
from api.models.triage import TriageLog

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def data_collection_stats(request):
    """
    Show progress on data collection for ML training.
    
    GET /api/triage/stats/collection/
    """
    
    # Total triages created
    total_triages = TriageLog.objects.count()
    
    # How many are labeled (have ground truth)
    labeled_triages = TriageLog.objects.filter(
        ground_truth_severity__isnull=False
    ).count()
    
    # Breakdown by severity (system predictions)
    severity_breakdown = TriageLog.objects.values('severity_level').annotate(
        count=Count('id')
    )
    
    # Breakdown by ground truth (labeled data)
    labeled_breakdown = TriageLog.objects.filter(
        ground_truth_severity__isnull=False
    ).values('ground_truth_severity').annotate(
        count=Count('id')
    )
    
    # Calculate labeling progress
    labeling_percentage = (labeled_triages / total_triages * 100) if total_triages > 0 else 0
    
    # Ready for ML?
    ready_for_ml = labeled_triages >= 500
    
    return Response({
        'total_triages': total_triages,
        'labeled_triages': labeled_triages,
        'unlabeled_triages': total_triages - labeled_triages,
        'labeling_percentage': round(labeling_percentage, 1),
        
        'system_predictions': severity_breakdown,
        'ground_truth_labels': labeled_breakdown,
        
        'ready_for_ml': ready_for_ml,
        'target': 1000,
        'progress_to_target': round((labeled_triages / 1000) * 100, 1),
        
        'recommendations': _get_collection_recommendations(
            total_triages, labeled_triages
        )
    })


def _get_collection_recommendations(total, labeled):
    """Give helpful recommendations based on current progress."""
    recommendations = []
    
    if total < 100:
        recommendations.append("System is new. Wait 1-2 weeks for more data to accumulate.")
    
    if labeled == 0:
        recommendations.append("⚠️ No labeled data yet! Start labeling to prepare for ML training.")
    
    if labeled > 0 and labeled < 100:
        recommendations.append(f"Good start! Aim for 100 labeled examples first, then reassess. ({labeled}/100 done)")
    
    if labeled >= 100 and labeled < 500:
        recommendations.append(f"Making progress! Target 500 labeled examples minimum. ({labeled}/500 done)")
    
    if labeled >= 500 and labeled < 1000:
        recommendations.append(f"✅ Minimum reached! You can start ML experiments. For better accuracy, aim for 1,000 labels. ({labeled}/1000 done)")
    
    if labeled >= 1000:
        recommendations.append("🎉 Excellent! You have enough data for high-quality ML training.")
    
    # Check labeling rate
    if total > 200 and labeled < (total * 0.1):
        recommendations.append(f"⚠️ Low labeling rate ({labeled}/{total} = {round(labeled/total*100, 1)}%). Aim to label at least 50-70% of cases.")
    
    return recommendations
```

**Add to** `api/urls.py`:
```python
path('triage/stats/collection/', triage_stats_views.data_collection_stats),
```

**Test it**:
```bash
curl http://localhost:8000/api/triage/stats/collection/ \
  -H "Authorization: Bearer $TOKEN"
```

**Expected output**:
```json
{
  "total_triages": 45,
  "labeled_triages": 0,
  "unlabeled_triages": 45,
  "labeling_percentage": 0.0,
  "ready_for_ml": false,
  "target": 1000,
  "progress_to_target": 0.0,
  "recommendations": [
    "System is new. Wait 1-2 weeks for more data to accumulate.",
    "⚠️ No labeled data yet! Start labeling to prepare for ML training."
  ]
}
```

---

## 5. Building a Labeling Interface

Now we need a way for doctors to review triage cases and add labels (ground truth).

### What Labeling Looks Like

Imagine a doctor sees this screen:

```
┌──────────────────────────────────────────────────────────┐
│ Triage Case Review - Record #TRG-ABC123                 │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ PATIENT INFORMATION:                                     │
│   Age: 55 years old                                      │
│   Medical History: Diabetes, Hypertension                │
│                                                          │
│ SYMPTOMS REPORTED:                                       │
│   ✓ Chest pain (duration: 2 hours, getting worse)       │
│   ✓ Shortness of breath                                 │
│   ✓ Sweating                                            │
│                                                          │
│ URGENCY: Urgent                                          │
│                                                          │
├──────────────────────────────────────────────────────────┤
│ SYSTEM ASSESSMENT:                                       │
│   Severity Score: 77/100                                 │
│   Severity Level: HIGH                                   │
│   Recommended: Specialist (Cardiology)                   │
├──────────────────────────────────────────────────────────┤
│                                                          │
│ ✏️  DOCTOR REVIEW (Please fill):                         │
│                                                          │
│   What is the correct severity?                          │
│   ( ) Low    ( ) Medium    (✓) Critical    ( ) High      │
│                                                          │
│   Actual diagnosis (optional):                           │
│   [Suspected myocardial infarction________________]      │
│                                                          │
│   Was the system correct?                                │
│   ( ) Yes, correctly triaged                             │
│   (✓) No, severity was underestimated                    │
│   ( ) No, severity was overestimated                     │
│                                                          │
│   Notes:                                                 │
│   [Chest pain + age + diabetes = high cardiac risk]      │
│   [Should have been triaged as CRITICAL, not HIGH]       │
│                                                          │
│   [Save Label]  [Skip]  [Next Case →]                    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Implementation: Labeling API Endpoint

**Create**: `api/views/labeling_views.py`

```python
# api/views/labeling_views.py

"""
Labeling interface for medical professionals to review triage cases.
"""

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from api.models.triage import TriageLog

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_unlabeled_triages(request):
    """
    Get list of triages that need labeling.
    
    GET /api/triage/labeling/queue/
    
    Query params:
      - limit: number of cases to return (default: 20)
      - severity_filter: 'low'|'medium'|'high'|'critical' (optional)
    """
    
    limit = int(request.GET.get('limit', 20))
    severity_filter = request.GET.get('severity_filter')
    
    # Get unlabeled triages
    triages = TriageLog.objects.filter(
        ground_truth_severity__isnull=True  # Not labeled yet
    ).order_by('-created_at')  # Most recent first
    
    # Apply severity filter if provided
    if severity_filter:
        triages = triages.filter(severity_level=severity_filter)
    
    # Limit results
    triages = triages[:limit]
    
    # Format for frontend
    results = []
    for triage in triages:
        results.append({
            'id': str(triage.id),
            'reference_number': triage.reference_number,
            'created_at': triage.created_at,
            
            # Patient info
            'patient_age': triage.patient_age,
            'medical_history': triage.medical_history,
            
            # Symptoms
            'symptoms_data': triage.symptoms_data,
            'urgency': triage.urgency,
            
            # System assessment
            'severity_score': triage.severity_score,
            'severity_level': triage.severity_level,
            'recommended_care_level': triage.recommended_care_level,
            'has_red_flags': triage.has_red_flags,
            
            # What user actually chose
            'user_selected_care_level': triage.user_selected_care_level,
            'appointment_created': triage.appointment_created,
        })
    
    return Response({
        'count': len(results),
        'results': results
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_label(request, triage_id):
    """
    Submit a label for a triage case.
    
    POST /api/triage/labeling/<triage_id>/label/
    
    Body:
      {
        "ground_truth_severity": "low|medium|high|critical",
        "actual_diagnosis": "string (optional)",
        "was_correctly_triaged": boolean,
        "reviewer_notes": "string (optional)"
      }
    """
    
    triage = get_object_or_404(TriageLog, id=triage_id)
    
    # Validate input
    ground_truth = request.data.get('ground_truth_severity')
    if ground_truth not in ['low', 'medium', 'high', 'critical']:
        return Response(
            {'error': 'Invalid severity level'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Update triage with labels
    triage.ground_truth_severity = ground_truth
    triage.actual_diagnosis = request.data.get('actual_diagnosis', '')
    triage.was_correctly_triaged = request.data.get('was_correctly_triaged', False)
    triage.labeled_by = request.user
    triage.labeled_at = timezone.now()
    
    # Store reviewer notes in a JSON field (add this to model if needed)
    # For now, we can add it to symptoms_data or create new field
    
    triage.save()
    
    return Response({
        'message': 'Label saved successfully',
        'triage_id': str(triage.id),
        'reference_number': triage.reference_number
    })
```

Add to `api/urls.py`:
```python
from api.views import labeling_views

urlpatterns = [
    # ... existing routes ...
    
    # Labeling endpoints
    path('triage/labeling/queue/', labeling_views.get_unlabeled_triages),
    path('triage/labeling/<uuid:triage_id>/label/', labeling_views.submit_label),
]
```

---


### Frontend: Simple Labeling Page

Create a simple page for doctors to review and label cases.

**Create**: `src/pages/professional/TriageLabelingPage.tsx`

```typescript
// src/pages/professional/TriageLabelingPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/config';
import { useProfessionalAuth } from '../../contexts/professionalAuthContext';
import './TriageLabelingPage.css';

interface UnlabeledTriage {
  id: string;
  reference_number: string;
  created_at: string;
  patient_age: number;
  medical_history: string[];
  symptoms_data: any[];
  urgency: string;
  severity_score: number;
  severity_level: string;
  recommended_care_level: string;
}

const TriageLabelingPage: React.FC = () => {
  const { token } = useProfessionalAuth();
  const [triages, setTriages] = useState<UnlabeledTriage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [groundTruthSeverity, setGroundTruthSeverity] = useState('');
  const [actualDiagnosis, setActualDiagnosis] = useState('');
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);
  const [notes, setNotes] = useState('');

  // Fetch unlabeled triages
  useEffect(() => {
    fetchUnlabeledTriages();
  }, []);

  const fetchUnlabeledTriages = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/triage/labeling/queue/`,
        {
          params: { limit: 50 },
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      setTriages(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch triages:', error);
      setLoading(false);
    }
  };

  const submitLabel = async () => {
    if (!groundTruthSeverity) {
      alert('Please select a severity level');
      return;
    }

    const currentTriage = triages[currentIndex];

    try {
      await axios.post(
        `${API_BASE_URL}/api/triage/labeling/${currentTriage.id}/label/`,
        {
          ground_truth_severity: groundTruthSeverity,
          actual_diagnosis: actualDiagnosis,
          was_correctly_triaged: wasCorrect,
          reviewer_notes: notes
        },
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      // Move to next case
      if (currentIndex < triages.length - 1) {
        setCurrentIndex(currentIndex + 1);
        resetForm();
      } else {
        alert('All cases reviewed! Fetching more...');
        fetchUnlabeledTriages();
        setCurrentIndex(0);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to submit label:', error);
      alert('Failed to save label. Please try again.');
    }
  };

  const resetForm = () => {
    setGroundTruthSeverity('');
    setActualDiagnosis('');
    setWasCorrect(null);
    setNotes('');
  };

  const skipCase = () => {
    if (currentIndex < triages.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetForm();
    }
  };

  if (loading) {
    return <div className="labeling-page">Loading cases...</div>;
  }

  if (triages.length === 0) {
    return (
      <div className="labeling-page">
        <h1>✅ All Cases Labeled!</h1>
        <p>Great work! Check back later for more cases to review.</p>
      </div>
    );
  }

  const currentTriage = triages[currentIndex];

  return (
    <div className="labeling-page">
      <div className="labeling-header">
        <h1>Triage Case Review</h1>
        <p className="progress">
          Case {currentIndex + 1} of {triages.length}
        </p>
      </div>

      <div className="case-card">
        {/* Case Information */}
        <div className="section">
          <h2>Patient Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Age:</span>
              <span className="value">{currentTriage.patient_age || 'Not provided'}</span>
            </div>
            <div className="info-item">
              <span className="label">Medical History:</span>
              <span className="value">
                {currentTriage.medical_history?.length > 0
                  ? currentTriage.medical_history.join(', ')
                  : 'None reported'}
              </span>
            </div>
            <div className="info-item">
              <span className="label">Urgency:</span>
              <span className={`value urgency-${currentTriage.urgency}`}>
                {currentTriage.urgency.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        <div className="section">
          <h2>Symptoms Reported</h2>
          <ul className="symptoms-list">
            {currentTriage.symptoms_data.map((symptom: any, idx: number) => (
              <li key={idx}>
                <strong>{symptom.symptom_name}</strong>
                {symptom.description && ` - ${symptom.description}`}
                {symptom.duration && ` (Duration: ${symptom.duration})`}
                {symptom.progression && ` - ${symptom.progression}`}
              </li>
            ))}
          </ul>
        </div>

        {/* System Assessment */}
        <div className="section system-assessment">
          <h2>System Assessment</h2>
          <div className="assessment-grid">
            <div className="assessment-item">
              <span className="label">Severity Score:</span>
              <span className="value score">{currentTriage.severity_score}/100</span>
            </div>
            <div className="assessment-item">
              <span className="label">Severity Level:</span>
              <span className={`value badge severity-${currentTriage.severity_level}`}>
                {currentTriage.severity_level.toUpperCase()}
              </span>
            </div>
            <div className="assessment-item">
              <span className="label">Recommended:</span>
              <span className="value">{currentTriage.recommended_care_level}</span>
            </div>
          </div>
        </div>

        {/* Doctor Review Form */}
        <div className="section review-form">
          <h2>✏️ Your Review</h2>
          
          <div className="form-group">
            <label>What is the CORRECT severity level? *</label>
            <div className="severity-options">
              {['low', 'medium', 'high', 'critical'].map(level => (
                <label key={level} className="severity-option">
                  <input
                    type="radio"
                    name="severity"
                    value={level}
                    checked={groundTruthSeverity === level}
                    onChange={(e) => setGroundTruthSeverity(e.target.value)}
                  />
                  <span className={`severity-badge severity-${level}`}>
                    {level.toUpperCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Actual diagnosis (optional):</label>
            <input
              type="text"
              value={actualDiagnosis}
              onChange={(e) => setActualDiagnosis(e.target.value)}
              placeholder="E.g., Viral upper respiratory infection"
            />
          </div>

          <div className="form-group">
            <label>Was the system's assessment correct?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="correct"
                  checked={wasCorrect === true}
                  onChange={() => setWasCorrect(true)}
                />
                ✅ Yes, correctly triaged
              </label>
              <label>
                <input
                  type="radio"
                  name="correct"
                  checked={wasCorrect === false}
                  onChange={() => setWasCorrect(false)}
                />
                ❌ No, incorrect severity
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Notes (optional):</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional observations or reasons for your decision"
              rows={3}
            />
          </div>

          <div className="button-group">
            <button onClick={skipCase} className="btn-secondary">
              Skip
            </button>
            <button onClick={submitLabel} className="btn-primary">
              Save Label & Next →
            </button>
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${((currentIndex + 1) / triages.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default TriageLabelingPage;
```

**Add basic CSS**: `src/pages/professional/TriageLabelingPage.css`

```css
.labeling-page {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.labeling-header {
  text-align: center;
  margin-bottom: 2rem;
}

.labeling-header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.progress {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.case-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 2rem;
  margin-bottom: 1rem;
}

.section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #ecf0f1;
}

.section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section h2 {
  color: #34495e;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.info-grid, .assessment-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.info-item, .assessment-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.info-item .label, .assessment-item .label {
  font-weight: 600;
  color: #7f8c8d;
  font-size: 0.85rem;
  text-transform: uppercase;
}

.info-item .value, .assessment-item .value {
  font-size: 1rem;
  color: #2c3e50;
}

.urgency-urgent, .urgency-emergency {
  color: #e74c3c !important;
  font-weight: 700;
}

.symptoms-list {
  list-style: none;
  padding: 0;
}

.symptoms-list li {
  padding: 0.75rem;
  background: #f8f9fa;
  border-left: 3px solid #3498db;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

.system-assessment {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
  border-bottom: none;
}

.severity-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.85rem;
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
}

.review-form {
  background: #fef9e7;
  padding: 1.5rem;
  border-radius: 6px;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.severity-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
}

.severity-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.75rem;
  border: 2px solid #ecf0f1;
  border-radius: 6px;
  transition: all 0.2s;
}

.severity-option:hover {
  border-color: #3498db;
  background: #f8f9fa;
}

.severity-option input[type="radio"]:checked + .severity-badge {
  border: 2px solid #2c3e50;
}

.form-group input[type="text"],
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #ecf0f1;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.radio-group label:hover {
  background: #f8f9fa;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.btn-primary, .btn-secondary {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover {
  background: #2980b9;
}

.btn-secondary {
  background: #ecf0f1;
  color: #34495e;
}

.btn-secondary:hover {
  background: #bdc3c7;
}

.progress-bar {
  height: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  transition: width 0.3s ease;
}
```

**Add route** in `src/App.tsx`:
```typescript
import TriageLabelingPage from './pages/professional/TriageLabelingPage';

// In your professional routes
<Route path="/professional/triage/labeling" element={<TriageLabelingPage />} />
```

---

## 6. Quality Control

### Why Quality Matters More Than Quantity

**Bad Example** (1,000 low-quality labels):
```
Case 1: Doctor rushed, marked everything as "medium" without reading → Wrong ❌
Case 2: Doctor disagreed with themselves (marked similar cases differently) → Inconsistent ❌
Case 3: Doctor labeled based on outcome, not initial symptoms → Biased ❌
```

Result: ML model learns garbage patterns → Performs worse than rules!

**Good Example** (500 high-quality labels):
```
Case 1: Doctor carefully reviewed, consistent with guidelines → Correct ✅
Case 2: Doctor used same criteria as Case 1 → Consistent ✅
Case 3: Doctor labeled based on initial presentation only → Unbiased ✅
```

Result: ML model learns good patterns → Performs better than rules!

**💡 Key Insight**: 500 good labels > 5,000 bad labels

### Quality Metrics to Track

Create a quality dashboard to monitor labeling quality:

```python
# api/views/labeling_quality_views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Count, Q
from api.models.triage import TriageLog

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def labeling_quality_report(request):
    """
    Generate quality metrics for labeled data.
    
    GET /api/triage/labeling/quality/
    """
    
    labeled_cases = TriageLog.objects.filter(
        ground_truth_severity__isnull=False
    )
    
    total_labeled = labeled_cases.count()
    
    # Metric 1: Agreement rate (how often system == doctor)
    correctly_triaged = labeled_cases.filter(
        was_correctly_triaged=True
    ).count()
    
    agreement_rate = (correctly_triaged / total_labeled * 100) if total_labeled > 0 else 0
    
    # Metric 2: Severity distribution (should be realistic)
    severity_dist = labeled_cases.values('ground_truth_severity').annotate(
        count=Count('id')
    )
    
    # Metric 3: Inter-rater reliability (if multiple doctors label same case)
    # TODO: Implement when you have multiple labelers
    
    # Metric 4: Labeling speed (cases per labeler per hour)
    # TODO: Track timestamps
    
    # Metric 5: Check for suspicious patterns
    warnings = []
    
    # Warning: Too much agreement (might be lazy labeling)
    if agreement_rate > 90:
        warnings.append("⚠️ Very high agreement rate (>90%). Doctor might be just accepting system recommendations without careful review.")
    
    # Warning: Too little agreement (might be bad rules OR bad labels)
    if agreement_rate < 30:
        warnings.append("⚠️ Very low agreement rate (<30%). Either rules are very bad OR labeling criteria is unclear.")
    
    # Warning: Unrealistic distribution
    critical_count = labeled_cases.filter(ground_truth_severity='critical').count()
    low_count = labeled_cases.filter(ground_truth_severity='low').count()
    
    critical_pct = (critical_count / total_labeled * 100) if total_labeled > 0 else 0
    low_pct = (low_count / total_labeled * 100) if total_labeled > 0 else 0
    
    if critical_pct > 20:
        warnings.append(f"⚠️ Too many CRITICAL cases ({critical_pct:.1f}%). Real-world: 1-3%. Might be over-labeling.")
    
    if low_pct > 80:
        warnings.append(f"⚠️ Too many LOW cases ({low_pct:.1f}%). Real-world: 60-70%. Might be under-labeling serious cases.")
    
    return Response({
        'total_labeled': total_labeled,
        'agreement_rate': round(agreement_rate, 1),
        'severity_distribution': severity_dist,
        'quality_warnings': warnings,
        'recommendations': _get_quality_recommendations(agreement_rate, total_labeled)
    })


def _get_quality_recommendations(agreement_rate, total):
    """Give recommendations based on quality metrics."""
    recs = []
    
    if 40 <= agreement_rate <= 70:
        recs.append("✅ Good agreement rate! Rules and labels are reasonably aligned.")
    
    if total >= 100:
        recs.append("✅ Enough labeled data to start analyzing patterns.")
    
    if total >= 500:
        recs.append("✅ Ready to begin ML experiments!")
    
    return recs
```

Add to `api/urls.py`:
```python
from api.views import labeling_quality_views

path('triage/labeling/quality/', labeling_quality_views.labeling_quality_report),
```

Test it:
```bash
curl http://localhost:8000/api/triage/labeling/quality/ \
  -H "Authorization: Bearer $TOKEN"
```

Expected output:
```json
{
  "total_labeled": 150,
  "agreement_rate": 62.7,
  "severity_distribution": [
    {"ground_truth_severity": "low", "count": 95},
    {"ground_truth_severity": "medium", "count": 40},
    {"ground_truth_severity": "high", "count": 12},
    {"ground_truth_severity": "critical", "count": 3}
  ],
  "quality_warnings": [],
  "recommendations": [
    "✅ Good agreement rate! Rules and labels are reasonably aligned.",
    "✅ Enough labeled data to start analyzing patterns."
  ]
}
```

---

## 7. When Are You Ready for ML?

### The Checklist

You're ready to move to Phase 3 (Feature Engineering) and Phase 4 (ML Training) when:

**Data Quantity** ✅
- [ ] At least 500 labeled examples
- [ ] Ideally 1,000+ labeled examples
- [ ] Examples from all 4 severity levels
- [ ] At least 20-30 examples of CRITICAL cases (oversample if needed)

**Data Quality** ✅
- [ ] Agreement rate between 40-70% (not too high, not too low)
- [ ] Realistic severity distribution (60-70% low, 20-25% medium, 8-12% high, 1-3% critical)
- [ ] Consistent labeling (same doctor labels similar cases the same way)
- [ ] Unbiased labels (based on initial symptoms, not hindsight)

**Data Diversity** ✅
- [ ] Examples from multiple hospitals
- [ ] Examples from different age groups (young, middle-aged, elderly)
- [ ] Examples with various medical histories
- [ ] Examples covering main symptom categories (cardiac, respiratory, neuro, etc.)

**Infrastructure** ✅
- [ ] Database query performance is good (< 1 second for 1,000 records)
- [ ] Data export working (can export to CSV for analysis)
- [ ] Labeling interface is usable and stable

### Self-Assessment Tool

Run this check:

```bash
curl http://localhost:8000/api/triage/stats/collection/ \
  -H "Authorization: Bearer $TOKEN"
```

Look for:
```json
{
  "ready_for_ml": true,  ← THIS SHOULD BE TRUE
  "labeled_triages": 1205,
  "progress_to_target": 120.5,
  "recommendations": [
    "🎉 Excellent! You have enough data for high-quality ML training."
  ]
}
```

If `ready_for_ml: false`, follow the recommendations provided!

---


## 8. Real-World Example Walkthrough

Let's walk through a complete data collection cycle step-by-step, from patient booking to doctor labeling to ML readiness.

### Week 1: System Goes Live

**Monday - System Deployed**
```
✅ Phase 1 triage system deployed to production
✅ Patients can now book appointments with triage assessment
✅ TriageLog database starts collecting data
```

**Monday - First Patients**
```
9:00 AM - Patient #1 books appointment
  Symptoms: Mild headache, 2 days
  System assessment: severity = 15 (LOW)
  Patient books: Online consultation
  ✅ TriageLog record created

10:30 AM - Patient #2 books appointment
  Symptoms: Chest pain, radiating to arm
  System assessment: severity = 95 (CRITICAL) 🚨
  System recommends: Emergency department
  Patient books: Emergency
  ✅ TriageLog record created

... 8 more patients throughout the day ...

End of Day 1: 10 triage records created
```

**End of Week 1**
```
Total triages: 67 cases
- 45 LOW (67%)
- 15 MEDIUM (22%)
- 5 HIGH (7%)
- 2 CRITICAL (3%)

Labeled: 0 (haven't started labeling yet)

Status: Collecting data ⏳
```

### Week 2-3: Continue Collection + Start Labeling

**Monday Week 2 - First Labeling Session**
```
Dr. Smith logs into labeling interface:
  - Sees 67 unlabeled cases
  - Starts reviewing from most recent

Case #67 (Latest):
  Patient: 28F, no medical history
  Symptoms: Headache (3 days), mild fever
  System: severity = 35 (MEDIUM), recommended = GP
  
  Dr. Smith reviews:
    ✅ Correct severity: MEDIUM
    ✅ Diagnosis: Viral syndrome
    ✅ Was system correct? YES
    
  ✅ Labeled! (1/67 done)

Case #66:
  Patient: 62M, diabetes + hypertension
  Symptoms: Chest pain (2 hours), sweating
  System: severity = 77 (HIGH), recommended = Specialist
  
  Dr. Smith reviews:
    ⚠️ Correct severity: CRITICAL (not HIGH!)
    ⚠️ Diagnosis: Suspected acute coronary syndrome
    ❌ Was system correct? NO - underestimated severity
    ⚠️ Notes: "Chest pain + diabetes + age = very high cardiac risk"
    
  ✅ Labeled! (2/67 done)
  
Dr. Smith spends 1 hour, labels 15 cases
```

**End of Week 3**
```
Total triages: 189 cases
Labeled: 85 cases (45% labeled)

Quality check:
  Agreement rate: 58% ✅ Good!
  Severity distribution:
    - LOW: 62%
    - MEDIUM: 23%
    - HIGH: 12%
    - CRITICAL: 3%
  ✅ Realistic distribution!

Status: On track ✅
```

### Week 4-6: Reaching Minimum

**Week 4-6 Activity**
```
Weekly labeling sessions:
  - Dr. Smith: 30-40 cases/week
  - Dr. Jones (new labeler): 20-30 cases/week
  - Combined: ~50-70 labeled/week

Triages continue accumulating:
  - ~80-100 new cases/week
  - System is being used regularly
```

**End of Week 6**
```
Total triages: 534 cases
Labeled: 515 cases (96% labeled!) 🎉

Quality metrics:
  ✅ Agreement rate: 61%
  ✅ Distribution: Realistic
  ✅ Multiple labelers for consistency
  ✅ No major quality warnings

🎊 MILESTONE: MINIMUM REACHED!
Status: Ready to start ML experiments! 🚀
```

### Week 7-12: Aiming for Excellence

**Weeks 7-12**
```
Continue data collection while starting ML work:
  - Use first 515 labeled cases for initial ML experiments
  - Continue labeling new cases in background
  - Refine ML models as more data comes in

End of Week 12:
  Total triages: 1,247 cases
  Labeled: 1,180 cases (95% labeled)

🏆 EXCELLENT! Ready for high-quality ML training
```

### Timeline Summary

```
┌────────┬──────────────┬──────────┬────────────────────────┐
│ Week   │ Total Cases  │ Labeled  │ Status                 │
├────────┼──────────────┼──────────┼────────────────────────┤
│ 1      │ 67           │ 0        │ 📊 Collecting          │
│ 2-3    │ 189          │ 85       │ 🏷️  Labeling started   │
│ 4-6    │ 534          │ 515      │ ✅ Minimum reached     │
│ 7-12   │ 1,247        │ 1,180    │ 🏆 Excellence reached  │
└────────┴──────────────┴──────────┴────────────────────────┘
```

**Key Insight**: You can start ML experiments at Week 6 (500 labels), but continue collecting data to improve accuracy over time.

---

## 9. Common Questions (FAQ)

### Q1: "Do I need to label 100% of cases?"

**A: No! 50-70% is fine.**

Reasons:
- Some cases are clear-cut (mild cold = obviously LOW)
- Some cases are duplicates (10th headache case this week)
- Labeling everything is time-consuming

**Best strategy**:
- Label ALL critical and high severity cases (they're rare)
- Label 50% of medium cases (random sampling)
- Label 10-20% of low cases (most are similar)

### Q2: "What if doctors disagree on the same case?"

**A: That's actually valuable!**

Example:
```
Case #123: Chest pain, 45M
  Dr. Smith labeled: MEDIUM
  Dr. Jones labeled: HIGH
  
This tells you:
  - Case is "borderline" between MEDIUM and HIGH
  - Need clearer guidelines for this symptom combination
  - ML model can learn from this uncertainty
```

**What to do**:
- Track inter-rater agreement
- For disagreements, get a 3rd doctor opinion
- Or, label it as "uncertain" and exclude from training

### Q3: "Our system is agreeing with doctors 95% of the time. Is that good?"

**A: Actually, that's suspicious! 🤔**

If agreement is >90%:
- Doctors might be "lazy labeling" (just clicking YES without thinking)
- Or, rules are already very good (so why train ML?)

**Target**: 50-70% agreement
- Low enough that ML can improve
- High enough that rules aren't completely wrong

### Q4: "We have 1,000 cases but only 5 are CRITICAL. Is that okay?"

**A: No, you need more CRITICAL examples!**

Solutions:
1. **Wait longer**: Critical cases are rare (1-3%), so you need ~500 total cases to get 15 critical
2. **Oversample**: Label ALL critical cases but only sample other severities
3. **Synthetic data**: Create hypothetical critical cases (advanced technique)

**Minimum target**: 20-30 critical examples for ML to learn this pattern

### Q5: "Can I start ML training with 300 labeled cases?"

**A: Yes, but...**

- **300 cases**: You can start basic experiments, but accuracy will be lower
- **500 cases**: Minimum for decent ML performance
- **1,000+ cases**: Much better, recommended for production use

Think of it like:
- 300 = Passing grade (C)
- 500 = Good grade (B)
- 1,000+ = Excellent grade (A)

Start experimenting at 300, but keep labeling to improve!

---

## 10. Troubleshooting Common Issues

### Issue 1: "Nobody is labeling cases"

**Symptoms**:
- System running for 4 weeks
- 500 triage records created
- Only 10 labeled

**Causes**:
- Labeling interface is clunky/slow
- Doctors don't know it exists
- No incentive/time allocated

**Solutions**:
1. Make labeling EASY (good UI, mobile-friendly)
2. Send weekly reminders
3. Allocate dedicated time (e.g., "Friday afternoon labeling hour")
4. Gamify: "Dr. Smith labeled 50 cases this week! 🏆"

### Issue 2: "All our cases are being labeled as LOW"

**Symptoms**:
- 95% of labeled cases are LOW severity
- Only 1-2 HIGH or CRITICAL cases

**Causes**:
- Your hospital mostly handles minor cases (good!)
- Or, labeling criteria is too lenient

**Solutions**:
1. Check if this matches reality (is 95% actually minor?)
2. Set clear guidelines: "Diabetes + chest pain = always HIGH minimum"
3. Oversample the rare cases (label ALL high/critical, sample LOW)

### Issue 3: "Labeling is too slow"

**Symptoms**:
- Takes 5-10 minutes per case
- Doctors getting frustrated

**Causes**:
- Too many required fields
- UI is complex
- No keyboard shortcuts

**Solutions**:
1. Simplify: Only require severity level, make diagnosis optional
2. Add keyboard shortcuts: 1=LOW, 2=MEDIUM, 3=HIGH, 4=CRITICAL, Enter=Save
3. Batch labeling: Show 10 cases on one screen
4. Pre-fill likely answer: If system says MEDIUM, highlight that button

### Issue 4: "Data export is failing"

**Symptoms**:
- Can't export labeled data to CSV
- Getting timeout errors

**Causes**:
- Too many records (1,000+)
- Query is slow
- Server has low memory

**Solutions**:
```python
# Add pagination to export
@api_view(['GET'])
def export_labeled_data(request):
    """Export labeled triage data in batches."""
    
    batch_size = 500
    offset = int(request.GET.get('offset', 0))
    
    triages = TriageLog.objects.filter(
        ground_truth_severity__isnull=False
    ).order_by('created_at')[offset:offset + batch_size]
    
    # Convert to CSV
    data = []
    for triage in triages:
        data.append({
            'id': str(triage.id),
            'symptoms': json.dumps(triage.symptoms_data),
            'age': triage.patient_age,
            'urgency': triage.urgency,
            'ground_truth_severity': triage.ground_truth_severity,
            # ... more fields ...
        })
    
    return Response(data)
```

---

## 11. Summary & Next Steps

### What You Accomplished in Phase 2 🎉

✅ **Understood training data**: Inputs (symptoms) + Labels (doctor's assessment)
✅ **Set collection targets**: 500 minimum, 1,000 ideal
✅ **Built labeling workflow**: Interface for doctors to review cases
✅ **Implemented quality control**: Metrics to ensure good data
✅ **Learned when you're ready**: Checklist for moving to ML

### Key Takeaways for Beginners

**1. Training data = examples the computer learns from**
   - Like showing a kid 100 photos of dogs to learn what a dog looks like

**2. Quality > Quantity**
   - 500 good labels > 5,000 rushed labels

**3. Labeling = expert adds the "correct answer"**
   - Doctor reviews case and says "this should have been CRITICAL, not HIGH"

**4. You need balanced data**
   - Examples from all 4 severity levels
   - Don't have 1,000 LOW and 0 CRITICAL

**5. 50-70% agreement is ideal**
   - Too high = labels are lazy
   - Too low = rules are terrible OR labels are inconsistent

### Checklist Before Moving to Phase 3

- [ ] Phase 1 rule-based system is deployed and stable
- [ ] At least 500 labeled examples collected
- [ ] Quality metrics look good (agreement 40-70%, realistic distribution)
- [ ] Can export data to CSV/JSON for ML training
- [ ] Multiple severity levels represented (not just LOW)
- [ ] Labeling interface is working smoothly

### What's Next?

**Phase 3: Feature Engineering** 📊
- Learn how to convert text symptoms into numbers
- Understand what "features" are
- Build feature extraction pipeline
- Prepare data for ML algorithms

**File**: `ml-triage-part4-phase3-feature-engineering.md`

**Key question Phase 3 answers**: "How do I turn 'chest pain' into numbers that a computer can learn from?"

---

## 12. Quick Reference

### Key Files Created

**Backend**:
- `api/views/triage_stats_views.py` - Data collection progress tracking
- `api/views/labeling_views.py` - Labeling API endpoints
- `api/views/labeling_quality_views.py` - Quality metrics

**Frontend**:
- `src/pages/professional/TriageLabelingPage.tsx` - Labeling interface for doctors
- `src/pages/professional/TriageLabelingPage.css` - Styling

### Key API Endpoints

```
GET  /api/triage/stats/collection/      - Check data collection progress
GET  /api/triage/labeling/queue/        - Get cases to label
POST /api/triage/labeling/<id>/label/   - Submit a label
GET  /api/triage/labeling/quality/      - Check labeling quality
```

### Key Metrics to Monitor

```sql
-- Total cases
SELECT COUNT(*) FROM api_triagelog;

-- Labeled cases
SELECT COUNT(*) FROM api_triagelog WHERE ground_truth_severity IS NOT NULL;

-- Agreement rate
SELECT 
  ROUND(100.0 * COUNT(CASE WHEN was_correctly_triaged THEN 1 END) / COUNT(*), 1) as agreement_pct
FROM api_triagelog
WHERE ground_truth_severity IS NOT NULL;

-- Severity distribution
SELECT ground_truth_severity, COUNT(*) as count
FROM api_triagelog
WHERE ground_truth_severity IS NOT NULL
GROUP BY ground_truth_severity;
```

---

## 📚 Additional Resources

### For Learning More About Data Collection

**Books**:
- "Machine Learning Yearning" by Andrew Ng (FREE PDF) - Chapters on data collection
- "Building Machine Learning Powered Applications" by Emmanuel Ameisen

**Online**:
- Google's "Data Preparation and Feature Engineering" course (Coursera)
- Fast.ai "Practical Deep Learning" - Lesson on data quality

### For Understanding Medical Data

**Resources**:
- MIMIC-III dataset documentation (example of labeled medical data)
- "Medical Data Annotation Guidelines" (search for free PDFs)

---

**Author**: Claude (AI Assistant)  
**Created**: 2025-11-11  
**Part**: 3 of 9  
**Status**: Complete ✅  
**Estimated Time**: 4-6 weeks (mostly passive data collection)  
**Prerequisite**: Part 2 - Phase 1 Rule-Based Triage must be deployed

---

**Ready for Phase 3?** Head to [Part 4: Feature Engineering](./ml-triage-part4-phase3-feature-engineering.md) to learn how to convert symptoms into numbers for ML! 🚀

**Need to review?** Go back to the [Index](./ml-triage-system-index.md) for navigation.
