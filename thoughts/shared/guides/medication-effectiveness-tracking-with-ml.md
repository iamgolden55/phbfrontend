# Medication Effectiveness Tracking with Machine Learning

**Created:** 2025-01-14
**Status:** Planning
**Priority:** High
**Complexity:** Advanced

## Executive Summary

This guide outlines a comprehensive system for tracking medication effectiveness in the PHB platform, leveraging patient-reported outcomes (PROs), clinical data integration, and machine learning to provide personalized treatment insights and improve patient care.

---

## Table of Contents

1. [Business Value](#business-value)
2. [System Architecture](#system-architecture)
3. [Data Models](#data-models)
4. [Frontend Components](#frontend-components)
5. [Backend APIs](#backend-apis)
6. [Machine Learning Pipeline](#machine-learning-pipeline)
7. [Implementation Phases](#implementation-phases)
8. [Security & Privacy](#security--privacy)
9. [Testing Strategy](#testing-strategy)
10. [Success Metrics](#success-metrics)

---

## Business Value

### Why This Matters

**For Patients:**
- Better treatment outcomes through personalized care
- Early detection of ineffective medications
- Reduced side effects and medication switching
- Empowerment through health tracking

**For Healthcare Providers:**
- Data-driven prescription decisions
- Real-time patient monitoring
- Population health insights
- Evidence-based medication selection

**For PHB Platform:**
- Competitive differentiation
- Higher patient engagement
- Valuable real-world evidence (RWE) data
- Potential for pharmaceutical partnerships
- Regulatory compliance (FDA 21st Century Cures Act)

### Key Metrics to Track

```yaml
Patient Engagement:
  - Follow-up completion rate: Target >70%
  - App retention rate: Target >80% (30 days)
  - Medication adherence: Target >85%

Clinical Outcomes:
  - Symptom improvement rate: Baseline
  - Adverse event detection time: Target <7 days
  - Treatment success rate: Track by condition

Platform Value:
  - Data quality score: Target >90%
  - ML model accuracy: Target >85%
  - Time to insight: Target <30 days
```

---

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Layer                        │
├─────────────────────────────────────────────────────────────┤
│  • Prescription Details                                      │
│  • Follow-up Surveys                                         │
│  • Effectiveness Dashboard                                   │
│  • Analytics Visualization                                   │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                     API Gateway Layer                        │
├─────────────────────────────────────────────────────────────┤
│  • Authentication & Authorization                            │
│  • Rate Limiting                                             │
│  • Request Validation                                        │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                    Application Layer                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Prescription│  │   Follow-up  │  │  Analytics   │      │
│  │   Service    │  │   Service    │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                      Data Layer                              │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │    Redis     │  │   S3/Blob    │      │
│  │  (Primary)   │  │   (Cache)    │  │   (Files)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────┬───────────────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────┐
│                   ML/Analytics Layer                         │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Data Prep   │  │  ML Training │  │  Prediction  │      │
│  │  Pipeline    │  │   Pipeline   │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────┐      │
│  │  MLflow - Model Registry & Experiment Tracking   │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

```yaml
Frontend:
  - Framework: React 18 with TypeScript
  - State Management: Context API + React Query
  - Charts: Chart.js, Recharts
  - Forms: React Hook Form + Zod validation
  - Notifications: React Toastify

Backend:
  - Framework: Django 4.2+ (REST Framework)
  - Database: PostgreSQL 15+
  - Cache: Redis 7+
  - Task Queue: Celery with Redis broker
  - File Storage: AWS S3 or Azure Blob

ML Stack:
  - Language: Python 3.11+
  - ML Framework: scikit-learn, XGBoost
  - Deep Learning: PyTorch (for advanced models)
  - Experiment Tracking: MLflow
  - Feature Store: Feast (optional)
  - Model Serving: FastAPI

Infrastructure:
  - Container: Docker + Docker Compose
  - Orchestration: Kubernetes (production)
  - CI/CD: GitHub Actions
  - Monitoring: Prometheus + Grafana
  - Logging: ELK Stack
```

---

## Data Models

### 1. Core Tables

#### `medication_outcomes` Table

```sql
CREATE TABLE medication_outcomes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prescription_id UUID NOT NULL REFERENCES prescriptions(id),
    patient_id INTEGER NOT NULL REFERENCES users(id),

    -- Follow-up metadata
    followup_number INTEGER NOT NULL, -- 1st, 2nd, 3rd follow-up
    followup_date TIMESTAMP NOT NULL,
    followup_type VARCHAR(20) CHECK (followup_type IN ('scheduled', 'unscheduled', 'adverse_event')),

    -- Symptom tracking
    condition_name VARCHAR(255),
    symptom_severity_before INTEGER CHECK (symptom_severity_before BETWEEN 1 AND 10),
    symptom_severity_current INTEGER CHECK (symptom_severity_current BETWEEN 1 AND 10),
    symptoms_resolved BOOLEAN DEFAULT FALSE,

    -- Medication adherence
    doses_taken INTEGER,
    doses_prescribed INTEGER,
    adherence_rate DECIMAL(5, 2) GENERATED ALWAYS AS (
        CASE
            WHEN doses_prescribed > 0 THEN (doses_taken::DECIMAL / doses_prescribed * 100)
            ELSE NULL
        END
    ) STORED,
    missed_doses_reason TEXT,

    -- Effectiveness ratings
    effectiveness_rating INTEGER CHECK (effectiveness_rating BETWEEN 1 AND 5),
    would_take_again BOOLEAN,
    patient_notes TEXT,

    -- Side effects
    side_effects JSONB DEFAULT '[]'::JSONB,
    -- Example: [{"name": "Nausea", "severity": "mild", "frequency": "daily"}]
    side_effects_severity VARCHAR(20) CHECK (side_effects_severity IN ('none', 'mild', 'moderate', 'severe')),
    discontinued_due_to_side_effects BOOLEAN DEFAULT FALSE,

    -- Clinical outcomes
    clinical_improvement BOOLEAN,
    prescription_renewed BOOLEAN,
    medication_stopped_early BOOLEAN,
    stop_reason TEXT,

    -- Provider assessment (optional)
    provider_notes TEXT,
    provider_effectiveness_rating INTEGER CHECK (provider_effectiveness_rating BETWEEN 1 AND 5),

    -- Metadata
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    submitted_by VARCHAR(20) CHECK (submitted_by IN ('patient', 'provider', 'system')),

    -- Constraints
    UNIQUE(prescription_id, followup_number)
);

-- Indexes for performance
CREATE INDEX idx_med_outcomes_prescription ON medication_outcomes(prescription_id);
CREATE INDEX idx_med_outcomes_patient ON medication_outcomes(patient_id);
CREATE INDEX idx_med_outcomes_date ON medication_outcomes(followup_date);
CREATE INDEX idx_med_outcomes_effectiveness ON medication_outcomes(effectiveness_rating);
CREATE INDEX idx_med_outcomes_side_effects ON medication_outcomes USING GIN(side_effects);
```

#### `clinical_measurements` Table

```sql
CREATE TABLE clinical_measurements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prescription_id UUID NOT NULL REFERENCES prescriptions(id),
    patient_id INTEGER NOT NULL REFERENCES users(id),
    outcome_id UUID REFERENCES medication_outcomes(id),

    -- Measurement details
    measurement_type VARCHAR(100) NOT NULL, -- 'blood_pressure', 'blood_glucose', 'weight', etc.
    measurement_value JSONB NOT NULL,
    -- Example: {"systolic": 130, "diastolic": 85, "unit": "mmHg"}

    measurement_date TIMESTAMP NOT NULL,
    measurement_method VARCHAR(50), -- 'home', 'clinic', 'lab', 'wearable'

    -- Reference ranges
    normal_range_min DECIMAL(10, 2),
    normal_range_max DECIMAL(10, 2),
    is_within_normal BOOLEAN GENERATED ALWAYS AS (
        (measurement_value->>'numeric_value')::DECIMAL BETWEEN normal_range_min AND normal_range_max
    ) STORED,

    -- Source
    source VARCHAR(50), -- 'patient_reported', 'lab_result', 'doctor_visit', 'device_sync'
    verified BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clinical_meas_prescription ON clinical_measurements(prescription_id);
CREATE INDEX idx_clinical_meas_type ON clinical_measurements(measurement_type);
CREATE INDEX idx_clinical_meas_date ON clinical_measurements(measurement_date);
```

#### `followup_schedules` Table

```sql
CREATE TABLE followup_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prescription_id UUID NOT NULL REFERENCES prescriptions(id),
    patient_id INTEGER NOT NULL REFERENCES users(id),

    -- Schedule details
    scheduled_date TIMESTAMP NOT NULL,
    followup_type VARCHAR(50) NOT NULL, -- 'day_3', 'week_2', 'month_1', 'custom'
    status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'missed', 'cancelled')),

    -- Notification
    notification_sent BOOLEAN DEFAULT FALSE,
    notification_sent_at TIMESTAMP,
    reminder_count INTEGER DEFAULT 0,

    -- Completion
    completed_at TIMESTAMP,
    outcome_id UUID REFERENCES medication_outcomes(id),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_followup_schedule_patient ON followup_schedules(patient_id);
CREATE INDEX idx_followup_schedule_status ON followup_schedules(status);
CREATE INDEX idx_followup_schedule_date ON followup_schedules(scheduled_date);
```

#### `medication_effectiveness_aggregates` Table (for analytics)

```sql
CREATE TABLE medication_effectiveness_aggregates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    medication_name VARCHAR(255) NOT NULL,
    medication_generic_name VARCHAR(255),
    condition_treated VARCHAR(255),

    -- Aggregate statistics
    total_prescriptions INTEGER DEFAULT 0,
    total_followups INTEGER DEFAULT 0,
    followup_completion_rate DECIMAL(5, 2),

    avg_effectiveness_rating DECIMAL(3, 2),
    avg_symptom_improvement DECIMAL(5, 2), -- Percentage
    avg_adherence_rate DECIMAL(5, 2),

    -- Outcomes
    improvement_count INTEGER DEFAULT 0,
    no_improvement_count INTEGER DEFAULT 0,
    adverse_events_count INTEGER DEFAULT 0,
    discontinued_count INTEGER DEFAULT 0,

    -- Side effects frequency
    common_side_effects JSONB DEFAULT '[]'::JSONB,
    -- Example: [{"name": "Headache", "frequency": 0.15}]

    -- Demographics breakdown
    effectiveness_by_age JSONB DEFAULT '{}'::JSONB,
    effectiveness_by_gender JSONB DEFAULT '{}'::JSONB,

    -- Time periods
    calculation_period_start DATE,
    calculation_period_end DATE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(medication_name, condition_treated, calculation_period_end)
);

CREATE INDEX idx_med_eff_agg_medication ON medication_effectiveness_aggregates(medication_name);
CREATE INDEX idx_med_eff_agg_condition ON medication_effectiveness_aggregates(condition_treated);
```

### 2. TypeScript Interfaces (Frontend)

```typescript
// src/types/medicationOutcomes.ts

export interface MedicationOutcome {
  id: string;
  prescription_id: string;
  patient_id: number;

  // Follow-up metadata
  followup_number: number;
  followup_date: string;
  followup_type: 'scheduled' | 'unscheduled' | 'adverse_event';

  // Symptom tracking
  condition_name?: string;
  symptom_severity_before?: number; // 1-10
  symptom_severity_current?: number; // 1-10
  symptoms_resolved: boolean;
  symptom_improvement_percentage?: number; // Calculated

  // Adherence
  doses_taken?: number;
  doses_prescribed?: number;
  adherence_rate?: number; // Percentage
  missed_doses_reason?: string;

  // Effectiveness
  effectiveness_rating?: number; // 1-5 stars
  would_take_again?: boolean;
  patient_notes?: string;

  // Side effects
  side_effects: SideEffect[];
  side_effects_severity?: 'none' | 'mild' | 'moderate' | 'severe';
  discontinued_due_to_side_effects: boolean;

  // Clinical outcomes
  clinical_improvement?: boolean;
  prescription_renewed?: boolean;
  medication_stopped_early: boolean;
  stop_reason?: string;

  // Provider input
  provider_notes?: string;
  provider_effectiveness_rating?: number;

  // Metadata
  created_at: string;
  updated_at: string;
  submitted_by: 'patient' | 'provider' | 'system';
}

export interface SideEffect {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  frequency: 'rarely' | 'occasionally' | 'daily' | 'constant';
  started_date?: string;
  resolved_date?: string;
  action_taken?: string; // 'none', 'dose_adjusted', 'medication_stopped'
}

export interface ClinicalMeasurement {
  id: string;
  prescription_id: string;
  measurement_type: string;
  measurement_value: Record<string, any>;
  measurement_date: string;
  measurement_method?: string;
  normal_range_min?: number;
  normal_range_max?: number;
  is_within_normal?: boolean;
  source: string;
  verified: boolean;
}

export interface FollowupSchedule {
  id: string;
  prescription_id: string;
  scheduled_date: string;
  followup_type: string;
  status: 'pending' | 'completed' | 'missed' | 'cancelled';
  notification_sent: boolean;
  completed_at?: string;
  outcome_id?: string;
}

export interface EffectivenessAnalytics {
  medication_name: string;
  condition_treated: string;
  total_prescriptions: number;
  avg_effectiveness_rating: number;
  avg_symptom_improvement: number;
  followup_completion_rate: number;
  common_side_effects: Array<{
    name: string;
    frequency: number; // 0-1
  }>;
  effectiveness_by_demographics: {
    age_groups: Record<string, number>;
    gender: Record<string, number>;
  };
  trend_data: Array<{
    date: string;
    effectiveness: number;
  }>;
}
```

---

## Frontend Components

### 1. Follow-up Survey Component

**File:** `src/pages/account/MedicationFollowupPage.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/authContext';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';
import {
  fetchPrescriptionForFollowup,
  submitFollowupOutcome,
  PrescriptionWithSchedule,
  FollowupFormData,
} from '../../services/medicationOutcomesService';

const MedicationFollowupPage: React.FC = () => {
  const { prescriptionId } = useParams<{ prescriptionId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [prescription, setPrescription] = useState<PrescriptionWithSchedule | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<FollowupFormData>({
    symptom_severity_current: 5,
    doses_taken: 0,
    doses_prescribed: 0,
    effectiveness_rating: 3,
    would_take_again: true,
    side_effects: [],
    side_effects_severity: 'none',
    clinical_improvement: false,
    medication_stopped_early: false,
  });

  useEffect(() => {
    const loadPrescription = async () => {
      if (!prescriptionId) return;

      try {
        const data = await fetchPrescriptionForFollowup(prescriptionId);
        setPrescription(data);

        // Pre-fill doses prescribed
        if (data.total_doses) {
          setFormData(prev => ({
            ...prev,
            doses_prescribed: data.total_doses,
          }));
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load prescription');
      } finally {
        setIsLoading(false);
      }
    };

    loadPrescription();
  }, [prescriptionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submitFollowupOutcome(prescriptionId!, formData);
      navigate('/account/prescriptions', {
        state: {
          message: 'Thank you! Your feedback has been recorded successfully.'
        }
      });
    } catch (err: any) {
      setError(err.message || 'Failed to submit follow-up');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSideEffect = (effect: string, severity: 'mild' | 'moderate' | 'severe') => {
    setFormData(prev => ({
      ...prev,
      side_effects: [
        ...prev.side_effects,
        { name: effect, severity, frequency: 'occasionally' }
      ],
      side_effects_severity: calculateOverallSeverity([
        ...prev.side_effects,
        { name: effect, severity, frequency: 'occasionally' }
      ])
    }));
  };

  const removeSideEffect = (index: number) => {
    setFormData(prev => {
      const newEffects = prev.side_effects.filter((_, i) => i !== index);
      return {
        ...prev,
        side_effects: newEffects,
        side_effects_severity: calculateOverallSeverity(newEffects)
      };
    });
  };

  if (isLoading) {
    return (
      <AccountHealthLayout title="Medication Follow-up">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </AccountHealthLayout>
    );
  }

  if (!prescription) {
    return (
      <AccountHealthLayout title="Medication Follow-up">
        <div className="text-center py-8">
          <p className="text-red-600">Prescription not found</p>
        </div>
      </AccountHealthLayout>
    );
  }

  return (
    <AccountHealthLayout title="Medication Follow-up">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            How is {prescription.medication_name} working for you?
          </h1>
          <p className="text-gray-600">
            Your feedback helps us provide better care and improve treatment outcomes.
          </p>

          {/* Prescription summary */}
          <div className="mt-4 bg-blue-50 p-4 rounded-md">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Medication:</span>{' '}
                {prescription.medication_name} {prescription.strength}
              </div>
              <div>
                <span className="font-medium">Prescribed for:</span>{' '}
                {prescription.indication || 'General treatment'}
              </div>
              <div>
                <span className="font-medium">Started:</span>{' '}
                {new Date(prescription.prescribed_date).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Duration:</span>{' '}
                {prescription.duration || 'Ongoing'}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Follow-up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Symptom Improvement */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Symptom Improvement
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How would you rate your symptoms now?
                <span className="text-gray-500 ml-2">(1 = Much worse, 10 = Completely resolved)</span>
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.symptom_severity_current}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    symptom_severity_current: parseInt(e.target.value)
                  }))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-2xl font-bold text-blue-600 w-12 text-center">
                  {formData.symptom_severity_current}
                </span>
              </div>

              {/* Visual feedback */}
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>Much worse</span>
                <span>No change</span>
                <span>Completely resolved</span>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Have your symptoms been resolved?
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, clinical_improvement: true }))}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    formData.clinical_improvement
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  ✓ Yes, improved
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, clinical_improvement: false }))}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    !formData.clinical_improvement
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  ✗ No improvement
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Medication Adherence */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Medication Adherence
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How many doses have you taken?
              </label>
              <input
                type="number"
                min="0"
                value={formData.doses_taken}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  doses_taken: parseInt(e.target.value) || 0
                }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Out of {formData.doses_prescribed} prescribed doses
                {formData.doses_prescribed > 0 && (
                  <span className="ml-2 font-medium text-blue-600">
                    ({Math.round((formData.doses_taken / formData.doses_prescribed) * 100)}% adherence)
                  </span>
                )}
              </p>
            </div>

            {formData.doses_taken < formData.doses_prescribed && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why did you miss some doses?
                </label>
                <textarea
                  value={formData.missed_doses_reason || ''}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    missed_doses_reason: e.target.value
                  }))}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="E.g., Forgot, felt better, side effects, etc."
                />
              </div>
            )}
          </div>

          {/* Section 3: Effectiveness Rating */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Overall Effectiveness
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How effective is this medication for you?
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, effectiveness_rating: rating }))}
                    className={`flex-1 py-4 rounded-lg border-2 transition-all ${
                      formData.effectiveness_rating >= rating
                        ? 'border-yellow-400 bg-yellow-50 scale-105'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    <svg
                      className={`h-8 w-8 mx-auto ${
                        formData.effectiveness_rating >= rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span className="text-xs mt-1 block">{rating} star{rating > 1 ? 's' : ''}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Would you take this medication again if needed?
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, would_take_again: true }))}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    formData.would_take_again
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  ✓ Yes
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, would_take_again: false }))}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                    !formData.would_take_again
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 bg-white text-gray-700'
                  }`}
                >
                  ✗ No
                </button>
              </div>
            </div>
          </div>

          {/* Section 4: Side Effects */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Side Effects
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Have you experienced any side effects?
              </label>

              {/* Common side effects quick add */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Common side effects:</p>
                <div className="flex flex-wrap gap-2">
                  {prescription.common_side_effects?.map((effect: string) => (
                    <button
                      key={effect}
                      type="button"
                      onClick={() => addSideEffect(effect, 'mild')}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50"
                    >
                      + {effect}
                    </button>
                  ))}
                </div>
              </div>

              {/* Added side effects list */}
              {formData.side_effects.length > 0 && (
                <div className="space-y-3 mb-4">
                  {formData.side_effects.map((effect, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{effect.name}</p>
                        <div className="flex space-x-4 mt-1">
                          <select
                            value={effect.severity}
                            onChange={(e) => {
                              const newEffects = [...formData.side_effects];
                              newEffects[index].severity = e.target.value as any;
                              setFormData(prev => ({ ...prev, side_effects: newEffects }));
                            }}
                            className="text-sm border-gray-300 rounded"
                          >
                            <option value="mild">Mild</option>
                            <option value="moderate">Moderate</option>
                            <option value="severe">Severe</option>
                          </select>
                          <select
                            value={effect.frequency}
                            onChange={(e) => {
                              const newEffects = [...formData.side_effects];
                              newEffects[index].frequency = e.target.value as any;
                              setFormData(prev => ({ ...prev, side_effects: newEffects }));
                            }}
                            className="text-sm border-gray-300 rounded"
                          >
                            <option value="rarely">Rarely</option>
                            <option value="occasionally">Occasionally</option>
                            <option value="daily">Daily</option>
                            <option value="constant">Constant</option>
                          </select>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSideEffect(index)}
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add custom side effect */}
              <button
                type="button"
                onClick={() => {
                  const customEffect = prompt('Enter side effect:');
                  if (customEffect) addSideEffect(customEffect, 'mild');
                }}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                + Add custom side effect
              </button>
            </div>

            {formData.side_effects.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Did you stop taking the medication due to side effects?
                </label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      discontinued_due_to_side_effects: true,
                      medication_stopped_early: true
                    }))}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                      formData.discontinued_due_to_side_effects
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-300 bg-white text-gray-700'
                    }`}
                  >
                    Yes, stopped
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      discontinued_due_to_side_effects: false
                    }))}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                      !formData.discontinued_due_to_side_effects
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 bg-white text-gray-700'
                    }`}
                  >
                    No, continuing
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Additional Notes */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Additional Information
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Any other comments or observations?
              </label>
              <textarea
                value={formData.patient_notes || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  patient_notes: e.target.value
                }))}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Share any other relevant information about your experience with this medication..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block animate-spin mr-2">⟳</span>
                  Submitting...
                </>
              ) : (
                'Submit Follow-up'
              )}
            </button>
          </div>
        </form>
      </div>
    </AccountHealthLayout>
  );
};

// Helper function
function calculateOverallSeverity(effects: SideEffect[]): 'none' | 'mild' | 'moderate' | 'severe' {
  if (effects.length === 0) return 'none';
  if (effects.some(e => e.severity === 'severe')) return 'severe';
  if (effects.some(e => e.severity === 'moderate')) return 'moderate';
  return 'mild';
}

export default MedicationFollowupPage;
```

### 2. Effectiveness Dashboard Component

**File:** `src/pages/account/MedicationEffectivenessDashboard.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { fetchPatientEffectivenessData, EffectivenessStats } from '../../services/medicationOutcomesService';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const MedicationEffectivenessDashboard: React.FC = () => {
  const [stats, setStats] = useState<EffectivenessStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMedication, setSelectedMedication] = useState<string>('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPatientEffectivenessData(selectedMedication);
        setStats(data);
      } catch (err) {
        console.error('Failed to load effectiveness data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [selectedMedication]);

  if (isLoading) {
    return (
      <AccountHealthLayout title="Medication Effectiveness">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </AccountHealthLayout>
    );
  }

  if (!stats) {
    return (
      <AccountHealthLayout title="Medication Effectiveness">
        <div className="text-center py-8">
          <p>No data available</p>
        </div>
      </AccountHealthLayout>
    );
  }

  return (
    <AccountHealthLayout title="Medication Effectiveness">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Your Medication Effectiveness
          </h1>
          <p className="text-gray-600">
            Track how well your medications are working for you over time.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Average Effectiveness
            </h3>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-blue-600">
                {stats.avg_effectiveness_rating.toFixed(1)}
              </p>
              <p className="ml-2 text-gray-500">/ 5.0</p>
            </div>
            <div className="mt-2 flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(stats.avg_effectiveness_rating)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Symptom Improvement
            </h3>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-green-600">
                {stats.avg_symptom_improvement.toFixed(0)}%
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Average improvement across all medications
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              Medication Adherence
            </h3>
            <div className="flex items-baseline">
              <p className="text-3xl font-bold text-purple-600">
                {stats.avg_adherence_rate.toFixed(0)}%
              </p>
            </div>
            <p className="mt-2 text-sm text-gray-600">
              You're taking your medications as prescribed
            </p>
          </div>
        </div>

        {/* Symptom Progress Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Symptom Severity Over Time
          </h2>
          <div className="h-64">
            <Line
              data={{
                labels: stats.symptom_trend.map(d =>
                  new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                ),
                datasets: [
                  {
                    label: 'Symptom Severity',
                    data: stats.symptom_trend.map(d => d.severity),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    reverse: true,
                    min: 1,
                    max: 10,
                    ticks: {
                      stepSize: 1,
                    },
                    title: {
                      display: true,
                      text: 'Severity (1=Best, 10=Worst)',
                    },
                  },
                },
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Medication Breakdown */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Your Medications
          </h2>
          <div className="space-y-4">
            {stats.medications.map((med) => (
              <div key={med.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{med.name}</h3>
                    <p className="text-sm text-gray-600">{med.strength}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.round(med.effectiveness_rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {med.effectiveness_rating.toFixed(1)} / 5.0
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
                  <div>
                    <p className="text-gray-500">Improvement</p>
                    <p className="font-medium text-green-600">
                      {med.symptom_improvement}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Adherence</p>
                    <p className="font-medium text-purple-600">
                      {med.adherence_rate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Follow-ups</p>
                    <p className="font-medium text-blue-600">
                      {med.followup_count}
                    </p>
                  </div>
                </div>

                {med.side_effects.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Reported Side Effects:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {med.side_effects.map((effect, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-1 text-xs rounded-full ${
                            effect.severity === 'severe'
                              ? 'bg-red-100 text-red-700'
                              : effect.severity === 'moderate'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {effect.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Side Effects Summary */}
        {stats.all_side_effects.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Side Effects Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.all_side_effects.map((effect, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-3">
                  <p className="font-medium text-gray-900">{effect.name}</p>
                  <p className="text-sm text-gray-600 capitalize">
                    {effect.severity} • {effect.frequency}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {effect.medication_name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AccountHealthLayout>
  );
};

export default MedicationEffectivenessDashboard;
```

---

## Backend APIs

### Django Views

**File:** `backend/medications/views.py`

```python
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Avg, Count, Q, F
from django.utils import timezone
from datetime import timedelta
from .models import (
    MedicationOutcome,
    ClinicalMeasurement,
    FollowupSchedule,
    Prescription
)
from .serializers import (
    MedicationOutcomeSerializer,
    ClinicalMeasurementSerializer,
    FollowupScheduleSerializer,
    EffectivenessStatsSerializer
)
from .tasks import schedule_followup_notifications


class MedicationOutcomeViewSet(viewsets.ModelViewSet):
    """
    API endpoints for medication outcome tracking.
    """
    serializer_class = MedicationOutcomeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Filter outcomes by authenticated user."""
        return MedicationOutcome.objects.filter(
            patient=self.request.user
        ).select_related(
            'prescription'
        ).order_by('-followup_date')

    def create(self, request, *args, **kwargs):
        """
        Create a new medication outcome follow-up.
        """
        data = request.data.copy()
        data['patient_id'] = request.user.id
        data['submitted_by'] = 'patient'

        # Auto-set followup number
        prescription_id = data.get('prescription_id')
        existing_count = MedicationOutcome.objects.filter(
            prescription_id=prescription_id
        ).count()
        data['followup_number'] = existing_count + 1

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        outcome = serializer.save()

        # Mark corresponding follow-up schedule as completed
        FollowupSchedule.objects.filter(
            prescription_id=prescription_id,
            status='pending'
        ).first().mark_completed(outcome)

        # Schedule next follow-up if needed
        schedule_next_followup(prescription_id, outcome.followup_number)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    @action(detail=False, methods=['get'])
    def effectiveness_stats(self, request):
        """
        Get aggregate effectiveness statistics for the patient.
        """
        medication_filter = request.query_params.get('medication', 'all')

        queryset = self.get_queryset()

        if medication_filter != 'all':
            queryset = queryset.filter(
                prescription__medication_name__icontains=medication_filter
            )

        # Calculate aggregate stats
        stats = queryset.aggregate(
            avg_effectiveness=Avg('effectiveness_rating'),
            avg_symptom_improvement=Avg(
                F('symptom_severity_before') - F('symptom_severity_current')
            ) * 10,  # Convert to percentage
            avg_adherence=Avg('adherence_rate'),
            total_followups=Count('id'),
        )

        # Get medication breakdown
        medications = []
        for prescription in Prescription.objects.filter(
            patient=request.user,
            outcomes__isnull=False
        ).distinct():
            med_outcomes = prescription.outcomes.all()

            med_stats = med_outcomes.aggregate(
                effectiveness=Avg('effectiveness_rating'),
                symptom_improvement=Avg(
                    F('symptom_severity_before') - F('symptom_severity_current')
                ) * 10,
                adherence=Avg('adherence_rate'),
                followups=Count('id')
            )

            # Get side effects
            side_effects = []
            for outcome in med_outcomes:
                if outcome.side_effects:
                    side_effects.extend(outcome.side_effects)

            medications.append({
                'id': str(prescription.id),
                'name': prescription.medication_name,
                'strength': prescription.strength,
                'effectiveness_rating': med_stats['effectiveness'] or 0,
                'symptom_improvement': med_stats['symptom_improvement'] or 0,
                'adherence_rate': med_stats['adherence'] or 0,
                'followup_count': med_stats['followups'] or 0,
                'side_effects': side_effects,
            })

        # Get symptom trend
        symptom_trend = []
        for outcome in queryset.order_by('followup_date'):
            symptom_trend.append({
                'date': outcome.followup_date.isoformat(),
                'severity': outcome.symptom_severity_current,
            })

        # Collect all side effects
        all_side_effects = []
        for outcome in queryset:
            if outcome.side_effects:
                for effect in outcome.side_effects:
                    all_side_effects.append({
                        **effect,
                        'medication_name': outcome.prescription.medication_name
                    })

        response_data = {
            **stats,
            'medications': medications,
            'symptom_trend': symptom_trend,
            'all_side_effects': all_side_effects,
        }

        return Response(response_data)

    @action(detail=False, methods=['get'])
    def pending_followups(self, request):
        """
        Get pending follow-up schedules for the patient.
        """
        pending = FollowupSchedule.objects.filter(
            patient=request.user,
            status='pending',
            scheduled_date__lte=timezone.now() + timedelta(days=7)
        ).select_related('prescription').order_by('scheduled_date')

        serializer = FollowupScheduleSerializer(pending, many=True)
        return Response(serializer.data)


class ClinicalMeasurementViewSet(viewsets.ModelViewSet):
    """
    API endpoints for clinical measurements (vitals, labs, etc.)
    """
    serializer_class = ClinicalMeasurementSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ClinicalMeasurement.objects.filter(
            patient=self.request.user
        ).order_by('-measurement_date')

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['patient_id'] = request.user.id
        data['source'] = 'patient_reported'

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


# Helper functions
def schedule_next_followup(prescription_id, current_followup_number):
    """
    Schedule the next follow-up based on medication type and timing.
    """
    prescription = Prescription.objects.get(id=prescription_id)

    # Determine next follow-up timing
    followup_timings = {
        1: 3,   # Day 3
        2: 14,  # Week 2
        3: 30,  # Month 1
        4: 60,  # Month 2
        5: 90,  # Month 3
    }

    next_number = current_followup_number + 1

    if next_number in followup_timings:
        days_until = followup_timings[next_number]
        scheduled_date = timezone.now() + timedelta(days=days_until)

        FollowupSchedule.objects.create(
            prescription=prescription,
            patient=prescription.patient,
            scheduled_date=scheduled_date,
            followup_type=f'followup_{next_number}',
            status='pending'
        )

        # Queue notification
        schedule_followup_notifications.apply_async(
            args=[prescription.id, next_number],
            eta=scheduled_date - timedelta(days=1)  # Send reminder 1 day before
        )
```

### Serializers

**File:** `backend/medications/serializers.py`

```python
from rest_framework import serializers
from .models import (
    MedicationOutcome,
    ClinicalMeasurement,
    FollowupSchedule,
    Prescription
)


class MedicationOutcomeSerializer(serializers.ModelSerializer):
    """
    Serializer for medication outcome data.
    """
    medication_name = serializers.CharField(
        source='prescription.medication_name',
        read_only=True
    )
    adherence_rate = serializers.DecimalField(
        max_digits=5,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = MedicationOutcome
        fields = [
            'id', 'prescription_id', 'patient_id', 'medication_name',
            'followup_number', 'followup_date', 'followup_type',
            'condition_name', 'symptom_severity_before',
            'symptom_severity_current', 'symptoms_resolved',
            'doses_taken', 'doses_prescribed', 'adherence_rate',
            'missed_doses_reason', 'effectiveness_rating',
            'would_take_again', 'patient_notes', 'side_effects',
            'side_effects_severity', 'discontinued_due_to_side_effects',
            'clinical_improvement', 'prescription_renewed',
            'medication_stopped_early', 'stop_reason',
            'provider_notes', 'provider_effectiveness_rating',
            'created_at', 'updated_at', 'submitted_by'
        ]
        read_only_fields = [
            'id', 'adherence_rate', 'created_at', 'updated_at'
        ]

    def validate(self, data):
        """
        Custom validation.
        """
        # Ensure symptom severity is within range
        if 'symptom_severity_current' in data:
            if not 1 <= data['symptom_severity_current'] <= 10:
                raise serializers.ValidationError({
                    'symptom_severity_current': 'Must be between 1 and 10'
                })

        # Ensure effectiveness rating is within range
        if 'effectiveness_rating' in data:
            if not 1 <= data['effectiveness_rating'] <= 5:
                raise serializers.ValidationError({
                    'effectiveness_rating': 'Must be between 1 and 5'
                })

        return data


class ClinicalMeasurementSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicalMeasurement
        fields = '__all__'
        read_only_fields = ['id', 'is_within_normal', 'created_at']


class FollowupScheduleSerializer(serializers.ModelSerializer):
    medication_name = serializers.CharField(
        source='prescription.medication_name',
        read_only=True
    )
    medication_strength = serializers.CharField(
        source='prescription.strength',
        read_only=True
    )

    class Meta:
        model = FollowupSchedule
        fields = [
            'id', 'prescription_id', 'medication_name',
            'medication_strength', 'scheduled_date', 'followup_type',
            'status', 'notification_sent', 'completed_at'
        ]
        read_only_fields = ['id', 'notification_sent', 'completed_at']
```

---

## Machine Learning Pipeline

### 1. Feature Engineering

**File:** `backend/ml/features.py`

```python
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from datetime import datetime


class MedicationEffectivenessFeatureEngine:
    """
    Feature engineering for medication effectiveness prediction.
    """

    def __init__(self):
        self.scaler = StandardScaler()
        self.label_encoders = {}

    def extract_features(self, prescription_data, patient_data, outcome_history=None):
        """
        Extract features for ML model.

        Returns:
            DataFrame with engineered features
        """
        features = {}

        # === Patient Demographics ===
        features['age'] = self._calculate_age(patient_data['date_of_birth'])
        features['gender_encoded'] = self._encode_categorical(
            patient_data['gender'], 'gender'
        )
        features['bmi'] = patient_data.get('bmi', None)

        # === Medication Features ===
        features['medication_class'] = self._encode_categorical(
            prescription_data['medication_class'], 'med_class'
        )
        features['dosage_strength_mg'] = self._extract_dosage_numeric(
            prescription_data['strength']
        )
        features['frequency_per_day'] = self._parse_frequency(
            prescription_data['frequency']
        )
        features['route_encoded'] = self._encode_categorical(
            prescription_data['route'], 'route'
        )

        # === Condition Features ===
        features['condition_severity'] = prescription_data.get('severity_score', 5)
        features['condition_duration_days'] = self._calculate_duration(
            prescription_data.get('condition_onset_date')
        )
        features['is_chronic_condition'] = int(
            prescription_data.get('condition_type') == 'chronic'
        )

        # === Historical Features (if available) ===
        if outcome_history:
            features['prior_medication_count'] = len(outcome_history)
            features['avg_prior_effectiveness'] = np.mean([
                h['effectiveness_rating'] for h in outcome_history
            ])
            features['avg_prior_adherence'] = np.mean([
                h['adherence_rate'] for h in outcome_history
            ])
            features['prior_side_effects_count'] = sum([
                len(h['side_effects']) for h in outcome_history
            ])
            features['prior_discontinuation_rate'] = sum([
                h['medication_stopped_early'] for h in outcome_history
            ]) / len(outcome_history)
        else:
            # First-time user
            features['prior_medication_count'] = 0
            features['avg_prior_effectiveness'] = 0
            features['avg_prior_adherence'] = 0
            features['prior_side_effects_count'] = 0
            features['prior_discontinuation_rate'] = 0

        # === Comorbidity Features ===
        features['comorbidity_count'] = len(patient_data.get('comorbidities', []))
        features['has_hypertension'] = int('hypertension' in patient_data.get('comorbidities', []))
        features['has_diabetes'] = int('diabetes' in patient_data.get('comorbidities', []))
        features['has_heart_disease'] = int('heart_disease' in patient_data.get('comorbidities', []))

        # === Drug Interaction Features ===
        features['concurrent_medications_count'] = len(
            patient_data.get('current_medications', [])
        )
        features['potential_interactions_count'] = self._count_interactions(
            prescription_data['medication_name'],
            patient_data.get('current_medications', [])
        )

        # === Temporal Features ===
        features['prescription_month'] = datetime.now().month
        features['prescription_season'] = self._get_season(datetime.now().month)

        return pd.DataFrame([features])

    def _calculate_age(self, date_of_birth):
        """Calculate age from date of birth."""
        if isinstance(date_of_birth, str):
            dob = datetime.strptime(date_of_birth, '%Y-%m-%d')
        else:
            dob = date_of_birth

        today = datetime.now()
        age = today.year - dob.year - (
            (today.month, today.day) < (dob.month, dob.day)
        )
        return age

    def _encode_categorical(self, value, category_name):
        """Encode categorical variables."""
        if category_name not in self.label_encoders:
            self.label_encoders[category_name] = LabelEncoder()

        try:
            return self.label_encoders[category_name].transform([value])[0]
        except:
            # Handle unseen categories
            self.label_encoders[category_name].fit([value])
            return self.label_encoders[category_name].transform([value])[0]

    def _extract_dosage_numeric(self, strength_str):
        """Extract numeric dosage from string like '500mg'."""
        import re
        match = re.search(r'(\d+)', str(strength_str))
        return float(match.group(1)) if match else 0

    def _parse_frequency(self, frequency_str):
        """Convert frequency string to times per day."""
        freq_map = {
            'once daily': 1,
            'twice daily': 2,
            'three times daily': 3,
            'four times daily': 4,
            'every 12 hours': 2,
            'every 8 hours': 3,
            'every 6 hours': 4,
        }
        return freq_map.get(str(frequency_str).lower(), 1)

    def _calculate_duration(self, onset_date):
        """Calculate days since condition onset."""
        if not onset_date:
            return 0

        if isinstance(onset_date, str):
            onset = datetime.strptime(onset_date, '%Y-%m-%d')
        else:
            onset = onset_date

        return (datetime.now() - onset).days

    def _count_interactions(self, new_medication, current_medications):
        """
        Count potential drug interactions.
        This is a placeholder - would integrate with drug interaction database.
        """
        # TODO: Integrate with drug interaction API/database
        return 0

    def _get_season(self, month):
        """Get season from month (1-4)."""
        if month in [12, 1, 2]:
            return 1  # Winter
        elif month in [3, 4, 5]:
            return 2  # Spring
        elif month in [6, 7, 8]:
            return 3  # Summer
        else:
            return 4  # Fall
```

### 2. ML Model Training

**File:** `backend/ml/train.py`

```python
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    mean_absolute_error,
    mean_squared_error,
    r2_score
)
import mlflow
import mlflow.sklearn
from xgboost import XGBRegressor, XGBClassifier
import joblib
from datetime import datetime


class MedicationEffectivenessModel:
    """
    ML model for predicting medication effectiveness.
    """

    def __init__(self, model_type='effectiveness'):
        """
        Initialize model.

        Args:
            model_type: 'effectiveness' (regression) or 'adherence' (classification)
        """
        self.model_type = model_type
        self.model = None
        self.feature_names = None

        if model_type == 'effectiveness':
            # Predict effectiveness rating (1-5)
            self.model = GradientBoostingRegressor(
                n_estimators=200,
                learning_rate=0.1,
                max_depth=5,
                random_state=42
            )
        elif model_type == 'adherence':
            # Predict high/low adherence
            self.model = XGBClassifier(
                n_estimators=100,
                learning_rate=0.1,
                max_depth=4,
                random_state=42
            )
        else:
            raise ValueError(f"Unknown model type: {model_type}")

    def train(self, X, y, tune_hyperparameters=False):
        """
        Train the model.

        Args:
            X: Feature DataFrame
            y: Target variable
            tune_hyperparameters: Whether to perform hyperparameter tuning
        """
        mlflow.start_run()

        # Store feature names
        self.feature_names = X.columns.tolist()

        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        # Hyperparameter tuning
        if tune_hyperparameters:
            self.model = self._tune_hyperparameters(X_train, y_train)

        # Train model
        self.model.fit(X_train, y_train)

        # Evaluate
        metrics = self._evaluate(X_test, y_test)

        # Log to MLflow
        mlflow.log_params({
            'model_type': self.model_type,
            'n_samples': len(X),
            'n_features': X.shape[1]
        })
        mlflow.log_metrics(metrics)
        mlflow.sklearn.log_model(self.model, "model")

        # Feature importance
        if hasattr(self.model, 'feature_importances_'):
            feature_importance = pd.DataFrame({
                'feature': self.feature_names,
                'importance': self.model.feature_importances_
            }).sort_values('importance', ascending=False)

            mlflow.log_artifact(
                self._save_feature_importance_plot(feature_importance)
            )

        mlflow.end_run()

        return metrics

    def predict(self, X):
        """
        Make predictions.

        Args:
            X: Feature DataFrame

        Returns:
            Predictions
        """
        if self.model is None:
            raise ValueError("Model not trained yet")

        # Ensure features match training
        if self.feature_names:
            X = X[self.feature_names]

        predictions = self.model.predict(X)

        # Clip effectiveness predictions to valid range
        if self.model_type == 'effectiveness':
            predictions = np.clip(predictions, 1, 5)

        return predictions

    def predict_proba(self, X):
        """
        Predict probabilities (for classification models).
        """
        if self.model_type != 'adherence':
            raise ValueError("predict_proba only available for classification")

        if self.feature_names:
            X = X[self.feature_names]

        return self.model.predict_proba(X)

    def _tune_hyperparameters(self, X_train, y_train):
        """
        Perform hyperparameter tuning using GridSearchCV.
        """
        if self.model_type == 'effectiveness':
            param_grid = {
                'n_estimators': [100, 200, 300],
                'learning_rate': [0.05, 0.1, 0.15],
                'max_depth': [3, 4, 5],
                'min_samples_split': [2, 5, 10]
            }
        else:
            param_grid = {
                'n_estimators': [50, 100, 150],
                'learning_rate': [0.05, 0.1, 0.2],
                'max_depth': [3, 4, 5],
                'min_child_weight': [1, 3, 5]
            }

        grid_search = GridSearchCV(
            self.model,
            param_grid,
            cv=5,
            scoring='neg_mean_squared_error' if self.model_type == 'effectiveness' else 'f1',
            n_jobs=-1,
            verbose=1
        )

        grid_search.fit(X_train, y_train)

        mlflow.log_params(grid_search.best_params_)

        return grid_search.best_estimator_

    def _evaluate(self, X_test, y_test):
        """
        Evaluate model performance.
        """
        y_pred = self.predict(X_test)

        if self.model_type == 'effectiveness':
            # Regression metrics
            metrics = {
                'mae': mean_absolute_error(y_test, y_pred),
                'rmse': np.sqrt(mean_squared_error(y_test, y_pred)),
                'r2': r2_score(y_test, y_pred)
            }
        else:
            # Classification metrics
            metrics = {
                'accuracy': accuracy_score(y_test, y_pred),
                'precision': precision_score(y_test, y_pred, average='weighted'),
                'recall': recall_score(y_test, y_pred, average='weighted'),
                'f1': f1_score(y_test, y_pred, average='weighted')
            }

        return metrics

    def save(self, filepath):
        """Save model to disk."""
        joblib.dump({
            'model': self.model,
            'feature_names': self.feature_names,
            'model_type': self.model_type
        }, filepath)

    @classmethod
    def load(cls, filepath):
        """Load model from disk."""
        data = joblib.load(filepath)
        instance = cls(model_type=data['model_type'])
        instance.model = data['model']
        instance.feature_names = data['feature_names']
        return instance


# Training script
if __name__ == '__main__':
    from .data_loader import load_training_data
    from .features import MedicationEffectivenessFeatureEngine

    # Load data
    df = load_training_data()

    # Feature engineering
    feature_engine = MedicationEffectivenessFeatureEngine()
    # ... feature extraction logic ...

    # Train effectiveness model
    effectiveness_model = MedicationEffectivenessModel('effectiveness')
    effectiveness_model.train(X, y_effectiveness, tune_hyperparameters=True)
    effectiveness_model.save('models/effectiveness_model.pkl')

    # Train adherence model
    adherence_model = MedicationEffectivenessModel('adherence')
    adherence_model.train(X, y_adherence, tune_hyperparameters=True)
    adherence_model.save('models/adherence_model.pkl')
```

### 3. Prediction Service

**File:** `backend/ml/predict.py`

```python
from .train import MedicationEffectivenessModel
from .features import MedicationEffectivenessFeatureEngine
import numpy as np


class MedicationEffectivenessPredictionService:
    """
    Service for making real-time predictions.
    """

    def __init__(self):
        self.effectiveness_model = MedicationEffectivenessModel.load(
            'models/effectiveness_model.pkl'
        )
        self.adherence_model = MedicationEffectivenessModel.load(
            'models/adherence_model.pkl'
        )
        self.feature_engine = MedicationEffectivenessFeatureEngine()

    def predict_effectiveness(self, prescription_data, patient_data, outcome_history=None):
        """
        Predict medication effectiveness for a patient.

        Returns:
            dict with predictions and confidence intervals
        """
        # Extract features
        features = self.feature_engine.extract_features(
            prescription_data,
            patient_data,
            outcome_history
        )

        # Predict
        effectiveness_pred = self.effectiveness_model.predict(features)[0]
        adherence_proba = self.adherence_model.predict_proba(features)[0]

        # Generate recommendations
        recommendations = self._generate_recommendations(
            effectiveness_pred,
            adherence_proba,
            features
        )

        return {
            'predicted_effectiveness': round(effectiveness_pred, 2),
            'effectiveness_category': self._categorize_effectiveness(effectiveness_pred),
            'predicted_adherence_high_prob': round(adherence_proba[1], 2),
            'adherence_risk': self._categorize_adherence(adherence_proba[1]),
            'recommendations': recommendations,
            'confidence': self._calculate_confidence(features)
        }

    def _categorize_effectiveness(self, rating):
        """Categorize effectiveness rating."""
        if rating >= 4.0:
            return 'Highly Effective'
        elif rating >= 3.0:
            return 'Moderately Effective'
        elif rating >= 2.0:
            return 'Low Effectiveness'
        else:
            return 'Ineffective'

    def _categorize_adherence(self, prob_high):
        """Categorize adherence risk."""
        if prob_high >= 0.8:
            return 'Low Risk'
        elif prob_high >= 0.5:
            return 'Moderate Risk'
        else:
            return 'High Risk'

    def _generate_recommendations(self, effectiveness, adherence_proba, features):
        """Generate personalized recommendations."""
        recommendations = []

        # Low effectiveness
        if effectiveness < 3.0:
            recommendations.append({
                'type': 'alert',
                'message': 'This medication may not be highly effective for you. Consider discussing alternatives with your doctor.',
                'priority': 'high'
            })

        # Low adherence risk
        if adherence_proba[1] < 0.5:
            recommendations.append({
                'type': 'adherence',
                'message': 'Set medication reminders to improve adherence.',
                'priority': 'medium'
            })

        # Drug interactions
        if features['potential_interactions_count'].iloc[0] > 0:
            recommendations.append({
                'type': 'interaction',
                'message': 'Possible drug interactions detected. Review with your pharmacist.',
                'priority': 'high'
            })

        # Comorbidities
        if features['comorbidity_count'].iloc[0] >= 3:
            recommendations.append({
                'type': 'monitoring',
                'message': 'Given your health conditions, close monitoring is recommended.',
                'priority': 'medium'
            })

        return recommendations

    def _calculate_confidence(self, features):
        """
        Calculate prediction confidence based on data quality.
        """
        # Factors affecting confidence:
        # - Amount of historical data
        # - Data completeness
        # - Model performance

        prior_count = features['prior_medication_count'].iloc[0]

        if prior_count >= 5:
            confidence = 0.9
        elif prior_count >= 3:
            confidence = 0.75
        elif prior_count >= 1:
            confidence = 0.6
        else:
            confidence = 0.4

        return confidence


# Django integration
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def predict_medication_effectiveness(request):
    """
    API endpoint for ML predictions.

    Request body:
    {
        "prescription_id": "uuid",
        "medication_name": "Lisinopril",
        "strength": "500mg",
        ...
    }
    """
    prescription_data = request.data
    patient_data = {
        'date_of_birth': request.user.date_of_birth,
        'gender': request.user.gender,
        'bmi': request.user.bmi,
        'comorbidities': request.user.comorbidities,
        'current_medications': request.user.current_medications,
    }

    # Get outcome history
    from medications.models import MedicationOutcome
    outcome_history = MedicationOutcome.objects.filter(
        patient=request.user
    ).values()

    # Make prediction
    service = MedicationEffectivenessPredictionService()
    prediction = service.predict_effectiveness(
        prescription_data,
        patient_data,
        list(outcome_history) if outcome_history else None
    )

    return Response(prediction)
```

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
**Status: Planning**

**Backend:**
- [ ] Create database migrations for outcome tables
- [ ] Implement basic API endpoints (CRUD for outcomes)
- [ ] Add follow-up scheduling logic
- [ ] Create Celery tasks for notifications

**Frontend:**
- [ ] Build basic follow-up survey component
- [ ] Integrate with prescriptions page
- [ ] Add "Submit Follow-up" CTA to prescription details

**Testing:**
- [ ] Unit tests for API endpoints
- [ ] Integration tests for follow-up flow

**Success Criteria:**
- Users can submit follow-up responses
- Data persists correctly in database
- Follow-ups schedule automatically

---

### Phase 2: Analytics & Visualization (Weeks 3-4)
**Status: Pending**

**Backend:**
- [ ] Implement effectiveness aggregation queries
- [ ] Build analytics API endpoints
- [ ] Create scheduled jobs for aggregate calculations

**Frontend:**
- [ ] Build effectiveness dashboard
- [ ] Add charts (Chart.js integration)
- [ ] Create medication comparison views

**Testing:**
- [ ] Performance testing for analytics queries
- [ ] UI/UX testing for dashboards

**Success Criteria:**
- Dashboard loads in <2 seconds
- Charts render correctly
- Data updates in real-time

---

### Phase 3: Machine Learning (Weeks 5-8)
**Status: Pending**

**ML Development:**
- [ ] Collect and clean training data
- [ ] Feature engineering pipeline
- [ ] Train baseline models
- [ ] Hyperparameter tuning
- [ ] Model evaluation and selection

**ML Ops:**
- [ ] Set up MLflow tracking
- [ ] Create model deployment pipeline
- [ ] Build prediction API
- [ ] Implement A/B testing framework

**Integration:**
- [ ] Add ML predictions to prescription flow
- [ ] Display recommendations in UI
- [ ] Create feedback loop for model improvement

**Testing:**
- [ ] Model performance testing
- [ ] Prediction accuracy validation
- [ ] Load testing for prediction API

**Success Criteria:**
- Model achieves >85% accuracy
- Prediction latency <500ms
- Continuous learning pipeline active

---

### Phase 4: Advanced Features (Weeks 9-12)
**Status: Future**

**Features:**
- [ ] Clinical measurements integration
- [ ] Wearable device sync
- [ ] Provider dashboard
- [ ] Population health analytics
- [ ] Adverse event detection
- [ ] Medication substitution recommendations

**Enhancements:**
- [ ] Multi-language support
- [ ] Voice input for follow-ups
- [ ] PDF report generation
- [ ] Integration with EHR systems

---

## Security & Privacy

### HIPAA Compliance

```yaml
Required Measures:
  - Data Encryption:
      At Rest: AES-256
      In Transit: TLS 1.3+

  - Access Control:
      Authentication: Multi-factor (2FA/OTP)
      Authorization: Role-based (RBAC)
      Audit Logging: All data access logged

  - Data Retention:
      Active Data: 7 years minimum
      Deleted Data: Secure erasure (NIST 800-88)

  - Business Associate Agreements:
      ML Platform: Required
      Cloud Provider: Required
      Analytics: Required
```

### Privacy Considerations

```python
# backend/medications/privacy.py

class PrivacyProtection:
    """
    Implement privacy-preserving techniques.
    """

    @staticmethod
    def anonymize_for_ml(data):
        """
        Anonymize patient data for ML training.
        """
        # Remove direct identifiers
        data = data.drop(columns=['name', 'email', 'phone', 'address'])

        # Hash indirect identifiers
        data['patient_id'] = data['patient_id'].apply(
            lambda x: hashlib.sha256(str(x).encode()).hexdigest()
        )

        # Generalize age to age groups
        data['age_group'] = pd.cut(
            data['age'],
            bins=[0, 18, 30, 50, 65, 100],
            labels=['<18', '18-30', '30-50', '50-65', '65+']
        )
        data = data.drop(columns=['age'])

        return data

    @staticmethod
    def differential_privacy(query_result, epsilon=1.0):
        """
        Add noise for differential privacy.
        """
        # Laplace mechanism
        sensitivity = 1.0  # Depends on query
        noise = np.random.laplace(0, sensitivity / epsilon, size=query_result.shape)
        return query_result + noise
```

---

## Testing Strategy

### Unit Tests

```python
# backend/medications/tests/test_outcomes.py

from django.test import TestCase
from rest_framework.test import APIClient
from medications.models import MedicationOutcome
from users.models import User


class MedicationOutcomeTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email='test@example.com',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)

    def test_create_outcome(self):
        """Test creating a medication outcome."""
        data = {
            'prescription_id': str(self.prescription.id),
            'symptom_severity_current': 3,
            'effectiveness_rating': 4,
            'would_take_again': True,
            'side_effects': []
        }

        response = self.client.post('/api/medication-outcomes/', data)

        self.assertEqual(response.status_code, 201)
        self.assertEqual(MedicationOutcome.objects.count(), 1)
        outcome = MedicationOutcome.objects.first()
        self.assertEqual(outcome.effectiveness_rating, 4)

    def test_effectiveness_stats(self):
        """Test effectiveness statistics endpoint."""
        # Create test outcomes
        MedicationOutcome.objects.create(
            prescription=self.prescription,
            patient=self.user,
            effectiveness_rating=4,
            symptom_severity_before=8,
            symptom_severity_current=3
        )

        response = self.client.get('/api/medication-outcomes/effectiveness_stats/')

        self.assertEqual(response.status_code, 200)
        self.assertIn('avg_effectiveness', response.data)
        self.assertEqual(response.data['avg_effectiveness'], 4.0)
```

### Integration Tests

```python
# backend/medications/tests/test_ml_integration.py

class MLIntegrationTests(TestCase):

    def test_prediction_endpoint(self):
        """Test ML prediction API."""
        data = {
            'medication_name': 'Lisinopril',
            'strength': '500mg',
            'condition': 'hypertension'
        }

        response = self.client.post('/api/ml/predict-effectiveness/', data)

        self.assertEqual(response.status_code, 200)
        self.assertIn('predicted_effectiveness', response.data)
        self.assertIn('recommendations', response.data)
```

### Frontend Tests

```typescript
// src/pages/account/__tests__/MedicationFollowupPage.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MedicationFollowupPage from '../MedicationFollowupPage';

describe('MedicationFollowupPage', () => {

  test('renders follow-up form', () => {
    render(<MedicationFollowupPage />);
    expect(screen.getByText(/How is.*working for you/i)).toBeInTheDocument();
  });

  test('submits follow-up successfully', async () => {
    render(<MedicationFollowupPage />);

    // Fill form
    fireEvent.change(screen.getByLabelText(/symptom severity/i), {
      target: { value: 7 }
    });
    fireEvent.click(screen.getByText(/Yes, improved/i));

    // Submit
    fireEvent.click(screen.getByText(/Submit Follow-up/i));

    await waitFor(() => {
      expect(screen.getByText(/Thank you/i)).toBeInTheDocument();
    });
  });
});
```

---

## Success Metrics

### KPIs to Track

```yaml
User Engagement:
  - Follow-up completion rate: >70%
  - Time to complete survey: <5 minutes
  - Return user rate: >60%

Data Quality:
  - Complete responses: >85%
  - Side effect reporting: >40%
  - Clinical improvement tracking: >70%

Clinical Impact:
  - Adverse event detection time: <3 days
  - Medication switch rate: Track trend
  - Treatment success rate: Improve by 15%

ML Performance:
  - Prediction accuracy: >85%
  - Model drift: <5% per quarter
  - Recommendation acceptance: >50%

Business Value:
  - Cost savings from early detection: $X per patient
  - Provider satisfaction: >4/5
  - Platform engagement: +20%
```

---

## Next Steps

1. **Review & Approve**: Stakeholder review of this plan
2. **Resource Allocation**: Assign development team
3. **Data Preparation**: Begin collecting baseline data
4. **Phase 1 Kickoff**: Start with foundation implementation
5. **Pilot Program**: Test with 100 users before full rollout

---

## References

- FDA 21st Century Cures Act: Real-World Evidence
- HIPAA Privacy Rule: 45 CFR Part 160
- ML Model Cards: Transparency in AI
- Patient-Reported Outcomes (PRO) Guidelines: FDA 2009

---

**Document Version:** 1.0
**Last Updated:** 2025-01-14
**Author:** PHB Development Team
**Status:** Awaiting Approval
