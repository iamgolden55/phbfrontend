# Part 7: Phase 6 - Production Deployment

**Status**: ✅ Complete
**Difficulty**: Intermediate
**Time to Complete**: 1-2 weeks
**Prerequisites**: Parts 2-6 (must have trained model)

---

## 🎯 What You'll Learn

By the end of this guide, you'll know how to:
- Save and load trained ML models properly
- Create REST API endpoints for predictions
- Integrate ML with your Django backend
- Implement A/B testing (rule-based vs ML)
- Handle edge cases and fallbacks
- Monitor model performance in production

---

## 📖 Table of Contents

1. [ELI5: What is Model Deployment?](#eli5-what-is-model-deployment)
2. [Section 1: Saving and Loading Models](#section-1-saving-and-loading-models)
3. [Section 2: Creating the Prediction Service](#section-2-creating-the-prediction-service)
4. [Section 3: REST API Endpoints](#section-3-rest-api-endpoints)
5. [Section 4: Integration with Django](#section-4-integration-with-django)
6. [Section 5: A/B Testing (Rules vs ML)](#section-5-ab-testing-rules-vs-ml)
7. [Section 6: Edge Cases and Fallbacks](#section-6-edge-cases-and-fallbacks)
8. [Section 7: Basic Monitoring](#section-7-basic-monitoring)
9. [Common Mistakes](#common-mistakes-to-avoid)
10. [Summary](#summary-phase-6---production-deployment)
11. [Quick Reference](#quick-reference)
12. [What's Next?](#whats-next)

---

## 🎯 ELI5: What is Model Deployment?

**Imagine you've built a really cool robot that can sort mail**:

**Phase 1-5** (Training):
- You taught the robot at home
- Tested it with practice mail
- It works great in your living room!
- Success rate: 90%

**Phase 6** (Deployment):
- Now you need to move the robot to the ACTUAL post office
- It needs to work 24/7 with REAL mail
- It needs to handle weird mail it's never seen
- If it breaks, real customers are affected!

**Deployment challenges**:
1. **Transport the robot** (save and load the model)
2. **Connect it to the mail system** (API integration)
3. **Have a backup system** (fallback to rules if ML fails)
4. **Monitor its performance** (is it still 90% accurate with real mail?)
5. **Handle weird cases** (what if someone mails a pineapple?)

**In ML terms**:
- Your model works great in Jupyter notebooks (your living room)
- Now you need it to work in production (the real post office)
- With real patients, 24/7, with monitoring and fallbacks

---

## Section 1: Saving and Loading Models

### 🎯 ELI5: Why Save Models?

**Imagine learning to play piano**:

**Bad approach** ❌:
- Every time you want to play, forget everything
- Re-learn from scratch (takes months)
- Finally remember how to play
- Too exhausted to actually perform

**Good approach** ✅:
- Learn once (takes months)
- Remember forever (brain = saved model)
- Sit down and play anytime

**ML is the same**:
- Training = learning (hours/days)
- Saving = remembering
- Loading = recalling instantly
- Predicting = performing

---

### 💾 Complete Model Saving Code

```python
# File: ml/model_management.py

import joblib
import json
import os
from datetime import datetime
from pathlib import Path

def save_model_complete(model, feature_extractor, metadata, version="v1"):
    """
    Save everything needed to use the model later.

    ELI5: Like saving a video game - save EVERYTHING
    you need to continue exactly where you left off!
    """

    models_dir = Path("ml/models")
    models_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    base_name = f"triage_{version}_{timestamp}"

    print(f"💾 Saving model: {base_name}")

    # Save model
    model_path = models_dir / f"{base_name}_model.pkl"
    joblib.dump(model, model_path)
    print(f"  ✅ Model: {model_path.stat().st_size / 1024:.1f} KB")

    # Save feature extractor (CRITICAL!)
    extractor_path = models_dir / f"{base_name}_extractor.pkl"
    joblib.dump(feature_extractor, extractor_path)
    print(f"  ✅ Extractor: {extractor_path.stat().st_size / 1024:.1f} KB")

    # Save metadata
    metadata['saved_at'] = datetime.now().isoformat()
    metadata['version'] = version
    metadata_path = models_dir / f"{base_name}_metadata.json"
    with open(metadata_path, 'w') as f:
        json.dump(metadata, f, indent=2)
    print(f"  ✅ Metadata saved")

    # Create "latest" symlinks
    for ext in ['model', 'extractor', 'metadata']:
        latest = models_dir / f"latest_{ext}.pkl" if ext != 'metadata' else models_dir / f"latest_{ext}.json"
        if latest.exists():
            latest.unlink()
        source = models_dir / f"{base_name}_{ext}.{'pkl' if ext != 'metadata' else 'json'}"
        latest.symlink_to(source.name)

    print(f"🎉 Saved successfully!")
    return str(base_name)


def load_model_complete(version=None):
    """
    Load saved model and everything needed.

    Args:
        version: Specific version to load, or None for latest

    Returns:
        dict with 'model', 'extractor', 'metadata'
    """

    models_dir = Path("ml/models")

    if version is None:
        print("📂 Loading LATEST model...")
        model_path = models_dir / "latest_model.pkl"
        extractor_path = models_dir / "latest_extractor.pkl"
        metadata_path = models_dir / "latest_metadata.json"
    else:
        print(f"📂 Loading model: {version}")
        model_path = models_dir / f"{version}_model.pkl"
        extractor_path = models_dir / f"{version}_extractor.pkl"
        metadata_path = models_dir / f"{version}_metadata.json"

    model = joblib.load(model_path)
    extractor = joblib.load(extractor_path)
    with open(metadata_path) as f:
        metadata = json.load(f)

    print(f"✅ Loaded: {metadata.get('accuracy', 0)*100:.1f}% accuracy")

    label_map = {'routine': 0, 'soon': 1, 'urgent': 2, 'emergency': 3}
    reverse_map = {v: k for k, v in label_map.items()}

    return {
        'model': model,
        'extractor': extractor,
        'metadata': metadata,
        'labels': label_map,
        'reverse_labels': reverse_map
    }
```

---

## Section 2: Django Prediction Service

### 🎯 ELI5: What is a Singleton Service?

**Imagine a school**:

**Bad approach** ❌:
- Every student hires their own teacher
- 100 students = 100 teachers teaching same thing
- Expensive! Slow!

**Good approach** ✅:
- ONE teacher for all students
- All students share the same teacher
- Efficient! Fast!

**Singleton Pattern**:
- Load model ONCE when Django starts
- All requests use the SAME loaded model
- Fast predictions (no re-loading)

---

### 🔧 Prediction Service Implementation

```python
# File: ml/prediction_service.py

import logging
from typing import Dict, Optional

logger = logging.getLogger(__name__)

class TriagePredictionService:
    """
    Singleton service - ONE instance shared by everyone.

    ELI5: The ONE teacher that everyone uses!
    """

    _instance = None
    _loaded = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        if self._loaded is None:
            self.load_model()

    def load_model(self):
        """Load model when Django starts."""
        try:
            from ml.model_management import load_model_complete
            self._loaded = load_model_complete()
            logger.info("✅ ML model loaded")
        except Exception as e:
            logger.error(f"❌ Model load failed: {e}")
            self._loaded = None

    def predict(self, triage_data: Dict) -> Optional[Dict]:
        """Make one prediction."""
        if not self._loaded:
            return None

        try:
            # Extract features
            features = self._loaded['extractor'].transform([triage_data])

            # Predict
            pred_int = self._loaded['model'].predict(features)[0]
            pred_label = self._loaded['reverse_labels'][pred_int]

            # Get confidence
            probs = self._loaded['model'].predict_proba(features)[0]
            confidence = float(probs[pred_int])

            return {
                'prediction': pred_label,
                'confidence': confidence,
                'probabilities': {
                    label: float(probs[i])
                    for i, label in self._loaded['reverse_labels'].items()
                }
            }
        except Exception as e:
            logger.error(f"Prediction error: {e}")
            return None

# Create singleton
prediction_service = TriagePredictionService()
```

---

## Section 3: REST API Endpoints

```python
# File: api/views/ml_views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ml.prediction_service import prediction_service

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ml_predict(request):
    """
    POST /api/ml/predict/

    Request:
    {
      "symptoms_data": {"chief_complaint": "headache"},
      "urgency": "soon",
      "patient_age": 35,
      "severity_score": 40
    }

    Response:
    {
      "prediction": "soon",
      "confidence": 0.87,
      "probabilities": {...}
    }
    """

    result = prediction_service.predict(request.data)

    if result:
        return Response(result)
    else:
        # Fallback to rules
        from api.services.triage_service import calculate_severity
        severity = calculate_severity(request.data['symptoms_data'], {})

        return Response({
            'prediction': 'soon' if severity < 50 else 'urgent',
            'confidence': 0.0,
            'fallback': True
        })

# Add to api/urls.py:
# path('ml/predict/', ml_predict)
```

---

## Section 4: Loading Model on Django Startup

```python
# File: api/apps.py

from django.apps import AppConfig

class ApiConfig(AppConfig):
    name = 'api'

    def ready(self):
        """Called when Django starts."""
        import sys
        if 'runserver' in sys.argv or 'gunicorn' in sys.argv[0]:
            from ml.prediction_service import prediction_service
            # Model already loaded in __init__
```

---

## Section 5: A/B Testing (Rules vs ML)

### 🎯 ELI5: What is A/B Testing?

**Imagine two pizza recipes**:

**Recipe A** (old):
- Your grandma's recipe
- Always works
- Known to be good

**Recipe B** (new):
- New fancy recipe
- Might be better?
- Need to test!

**A/B Test**:
- Give 50% of customers Recipe A
- Give 50% of customers Recipe B
- Track which gets better ratings
- Keep the winner!

**For ML Triage**:
- Give 50% of patients rule-based triage
- Give 50% of patients ML triage
- Compare which is more accurate
- Gradually shift to ML if it wins

---

### 🔧 A/B Testing Implementation

```python
# File: api/services/ab_testing.py

import random
from api.models import TriageLog

def should_use_ml_for_patient(patient_id):
    """
    Decide if this patient gets ML or rules.

    ELI5: Flip a coin - heads=ML, tails=rules!
    (But consistent per patient)
    """

    # Use patient_id to ensure same patient always gets same method
    random.seed(patient_id)
    return random.random() < 0.5  # 50% ML, 50% rules


def hybrid_triage_prediction(triage_data, patient_id):
    """
    A/B test: Some get ML, some get rules.
    """

    use_ml = should_use_ml_for_patient(patient_id)

    if use_ml:
        # Try ML first
        from ml.prediction_service import prediction_service
        ml_result = prediction_service.predict(triage_data)

        if ml_result:
            # ML succeeded
            return {
                **ml_result,
                'method': 'ml',
                'ab_group': 'ml'
            }

    # Fallback to rules (or if patient in rules group)
    from api.services.triage_service import calculate_severity, recommend_care_level

    severity = calculate_severity(triage_data['symptoms_data'], {})
    care_level = recommend_care_level(severity, triage_data['urgency'], False)

    return {
        'prediction': care_level,
        'confidence': 0.0,
        'method': 'rules',
        'ab_group': 'rules' if not use_ml else 'rules_fallback'
    }
```

---

## Section 6: Edge Cases and Fallbacks

### ⚠️ What Can Go Wrong?

```python
# Edge Case 1: Model not loaded
if not prediction_service._loaded:
    # Fallback to rules
    use_rule_based_triage()

# Edge Case 2: Prediction fails
try:
    result = prediction_service.predict(data)
except Exception:
    # Fallback to rules
    use_rule_based_triage()

# Edge Case 3: Missing features
if 'symptoms_data' not in data:
    return {'error': 'Missing required field'}

# Edge Case 4: Very low confidence
if result['confidence'] < 0.60:
    # Use rules instead
    use_rule_based_triage()

# Edge Case 5: Red flags detected
if has_red_flags(data['symptoms_data']):
    # Override ML - always emergency
    return {'prediction': 'emergency'}
```

---

## Section 7: Basic Monitoring

```python
# File: api/services/ml_monitoring.py

from api.models import MLPredictionLog
from django.utils import timezone

def log_ml_prediction(triage_log_id, prediction_result):
    """
    Log every ML prediction for monitoring.

    ELI5: Like keeping a diary of every decision
    the model makes, so we can review later!
    """

    MLPredictionLog.objects.create(
        triage_log_id=triage_log_id,
        prediction=prediction_result['prediction'],
        confidence=prediction_result['confidence'],
        probabilities=prediction_result['probabilities'],
        method=prediction_result.get('method', 'ml'),
        timestamp=timezone.now()
    )


# Check model performance daily
def check_model_performance():
    """Run this daily to check if model is still good."""

    from datetime import timedelta

    yesterday = timezone.now() - timedelta(days=1)

    predictions = MLPredictionLog.objects.filter(
        timestamp__gte=yesterday,
        ground_truth__isnull=False  # Only labeled cases
    )

    correct = sum(1 for p in predictions if p.prediction == p.ground_truth)
    total = predictions.count()

    if total > 0:
        accuracy = correct / total
        print(f"📊 Last 24h accuracy: {accuracy*100:.1f}%")

        if accuracy < 0.75:
            print("⚠️  WARNING: Accuracy dropped below 75%!")
            # Send alert email
```

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Not Saving Feature Extractor

```python
# WRONG ❌
joblib.dump(model, 'model.pkl')
# Later: Features don't match! Model breaks!

# CORRECT ✅
joblib.dump(model, 'model.pkl')
joblib.dump(feature_extractor, 'extractor.pkl')
```

### ❌ Mistake 2: Loading Model on Every Request

```python
# WRONG ❌ - Very slow!
def predict(data):
    model = joblib.load('model.pkl')  # Loads every time!
    return model.predict(data)

# CORRECT ✅ - Load once
model = joblib.load('model.pkl')  # Load once at startup
def predict(data):
    return model.predict(data)
```

### ❌ Mistake 3: No Fallback to Rules

```python
# WRONG ❌
result = ml_predict(data)
# If ML fails, crash!

# CORRECT ✅
result = ml_predict(data)
if not result:
    result = rule_based_predict(data)
```

---

## 📚 Summary

**Part 7 Complete!** You learned:

1. ✅ Save models with `joblib` (model + extractor + metadata)
2. ✅ Load models efficiently (once at startup)
3. ✅ Create singleton prediction service
4. ✅ Build REST API endpoints
5. ✅ Integrate with Django
6. ✅ Implement A/B testing
7. ✅ Handle edge cases with fallbacks
8. ✅ Basic monitoring and logging

**Next**: [Part 8: Monitoring & Continuous Learning](ml-triage-part8-phase7-monitoring.md)

