# Part 8: Phase 7 - Monitoring & Continuous Learning

**Status**: ✅ Complete
**Difficulty**: Intermediate
**Time to Complete**: Ongoing (set up once, monitor continuously)
**Prerequisites**: Part 7 (deployed model)

---

## 🎯 What You'll Learn

By the end of this guide, you'll know how to:
- Monitor ML model performance in production
- Detect when your model degrades (model drift)
- Collect doctor feedback systematically
- Know when to retrain your model
- Implement continuous learning
- Build performance dashboards

---

## 📖 Table of Contents

1. [ELI5: Why Monitor ML Models?](#eli5-why-monitor-ml-models)
2. [Section 1: Understanding Model Drift](#section-1-understanding-model-drift)
3. [Section 2: Performance Monitoring](#section-2-performance-monitoring)
4. [Section 3: Doctor Feedback System](#section-3-doctor-feedback-system)
5. [Section 4: When to Retrain](#section-4-when-to-retrain)
6. [Section 5: Continuous Learning Loop](#section-5-continuous-learning-loop)
7. [Section 6: Performance Dashboard](#section-6-performance-dashboard)
8. [Common Mistakes](#common-mistakes-to-avoid)
9. [Summary](#summary-phase-7---monitoring)
10. [Quick Reference](#quick-reference)

---

## 🎯 ELI5: Why Monitor ML Models?

**Imagine a security guard at a mall**:

**Day 1** (training):
- Guard learns: "Stop thieves wearing masks"
- Accuracy: 95%
- Everyone happy!

**6 months later**:
- COVID happens
- EVERYONE wears masks now
- Guard stops everyone
- Accuracy drops to 20%
- System broken!

**What changed?**
- The WORLD changed (masks became normal)
- But guard's training didn't update
- Guard became useless

**Same with ML models**:
- Model trained on 2024 data
- Works great in 2024 (89% accuracy)
- But in 2025:
  - New diseases appear
  - Patient behavior changes
  - Symptoms described differently
- Model accuracy drops to 70%
- **Model drift** has occurred!

**Solution**: Monitor constantly, retrain when needed!

---

## Section 1: Understanding Model Drift

### 🎯 What is Model Drift?

```python
# ELI5: Model drift is when your model gets "outdated"

# Training (January 2024):
model.fit(X_2024, y_2024)
accuracy = 0.89  # Excellent!

# Production (June 2024):
accuracy = 0.85  # Still good

# Production (December 2024):
accuracy = 0.78  # Dropping...

# Production (March 2025):
accuracy = 0.65  # ALERT! Model drift!
```

### 📊 Types of Model Drift

**1. Data Drift** (input data changes):
```python
# 2024: Patients say "COVID symptoms"
# 2025: New disease, patients say "XYZ symptoms"
# Model never saw "XYZ" before!

# Detection:
if new_symptoms not in training_symptoms:
    print("⚠️  Data drift detected!")
```

**2. Concept Drift** (relationship changes):
```python
# 2024: Headache = Usually routine
# 2025: New brain disease appears
# 2025: Headache = Now often urgent!

# Model still thinks headache = routine
# But reality has changed!
```

**3. Label Drift** (standards change):
```python
# 2024: Hospital policy: Chest pain age >40 = urgent
# 2025: New policy: Chest pain age >30 = urgent

# Model trained on old policy
# Doesn't match new standards
```

---

### 🔍 Detecting Model Drift

```python
# File: ml/monitoring/drift_detector.py

from datetime import datetime, timedelta
from api.models import TriageLog, MLPredictionLog
import numpy as np

def check_for_data_drift():
    """
    Detect if input data has changed significantly.

    ELI5: Like noticing all your customers suddenly
    started speaking a different language!
    """

    # Get recent data (last 30 days)
    recent_cutoff = datetime.now() - timedelta(days=30)
    recent_triages = TriageLog.objects.filter(
        created_at__gte=recent_cutoff
    )

    # Extract chief complaints
    recent_complaints = [
        t.symptoms_data.get('chief_complaint', '').lower()
        for t in recent_triages
    ]

    # Get training data complaints (from metadata)
    from ml.model_management import load_model_complete
    loaded = load_model_complete()
    training_vocab = loaded['metadata'].get('vocabulary', [])

    # Check how many new words we're seeing
    recent_vocab = set(' '.join(recent_complaints).split())
    new_words = recent_vocab - set(training_vocab)

    drift_percentage = len(new_words) / len(recent_vocab) if recent_vocab else 0

    print(f"📊 Data Drift Check:")
    print(f"  New vocabulary: {len(new_words)} words")
    print(f"  Drift percentage: {drift_percentage*100:.1f}%")

    if drift_percentage > 0.20:  # More than 20% new words
        print(f"  ⚠️  WARNING: Significant data drift detected!")
        print(f"  Recommendation: Retrain model soon")
        return True
    else:
        print(f"  ✅ No significant drift")
        return False


def check_for_performance_drift():
    """
    Detect if model accuracy is degrading.

    ELI5: Like noticing your basketball shot percentage
    is getting worse over time!
    """

    # Get predictions from last 7 days with ground truth
    week_ago = datetime.now() - timedelta(days=7)

    recent_predictions = MLPredictionLog.objects.filter(
        timestamp__gte=week_ago,
        ground_truth__isnull=False
    )

    if recent_predictions.count() < 20:
        print("📊 Not enough labeled data to check drift")
        return False

    # Calculate recent accuracy
    correct = sum(
        1 for p in recent_predictions
        if p.prediction == p.ground_truth
    )
    total = recent_predictions.count()
    recent_accuracy = correct / total

    # Compare to training accuracy
    from ml.model_management import load_model_complete
    loaded = load_model_complete()
    training_accuracy = loaded['metadata']['accuracy']

    accuracy_drop = training_accuracy - recent_accuracy

    print(f"📊 Performance Drift Check:")
    print(f"  Training accuracy: {training_accuracy*100:.1f}%")
    print(f"  Recent accuracy:   {recent_accuracy*100:.1f}%")
    print(f"  Drop:              {accuracy_drop*100:.1f}%")

    if accuracy_drop > 0.10:  # Dropped more than 10%
        print(f"  🔴 ALERT: Performance degraded significantly!")
        print(f"  Recommendation: Retrain model NOW")
        return True
    elif accuracy_drop > 0.05:  # Dropped 5-10%
        print(f"  ⚠️  WARNING: Performance declining")
        print(f"  Recommendation: Plan retraining")
        return True
    else:
        print(f"  ✅ Performance stable")
        return False


def daily_drift_check():
    """
    Run this daily to check for drift.

    ELI5: Like a daily health checkup for your model!
    """

    print("🏥 DAILY MODEL HEALTH CHECK")
    print("="*60)
    print(f"Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print()

    data_drift = check_for_data_drift()
    print()
    perf_drift = check_for_performance_drift()

    print("\n" + "="*60)

    if data_drift or perf_drift:
        print("🔴 ACTION REQUIRED:")
        print("  1. Review recent predictions")
        print("  2. Collect more labeled data")
        print("  3. Plan model retraining")
        print("  4. Alert ML team")
    else:
        print("✅ MODEL HEALTHY - No action needed")

    return data_drift or perf_drift
```

---

## Section 2: Performance Monitoring

### 📊 Real-Time Metrics

```python
# File: ml/monitoring/metrics.py

from datetime import datetime, timedelta
from collections import defaultdict
from api.models import MLPredictionLog

class MLMetricsMonitor:
    """
    Track ML model metrics in real-time.

    ELI5: Like a scoreboard showing how well
    your model is playing the game!
    """

    @staticmethod
    def get_hourly_stats():
        """Get stats for the last hour."""

        hour_ago = datetime.now() - timedelta(hours=1)
        predictions = MLPredictionLog.objects.filter(
            timestamp__gte=hour_ago
        )

        total = predictions.count()
        if total == 0:
            return {'total': 0}

        # Count by prediction type
        by_severity = defaultdict(int)
        for p in predictions:
            by_severity[p.prediction] += 1

        # Average confidence
        avg_confidence = sum(p.confidence for p in predictions) / total

        # Fallback rate (how often ML failed)
        fallbacks = predictions.filter(method='rules_fallback').count()
        fallback_rate = fallbacks / total

        return {
            'total': total,
            'by_severity': dict(by_severity),
            'avg_confidence': avg_confidence,
            'fallback_rate': fallback_rate,
            'predictions_per_minute': total / 60
        }

    @staticmethod
    def get_daily_accuracy():
        """Get accuracy for last 24 hours (requires labeled data)."""

        day_ago = datetime.now() - timedelta(days=1)
        predictions = MLPredictionLog.objects.filter(
            timestamp__gte=day_ago,
            ground_truth__isnull=False
        )

        if predictions.count() == 0:
            return None

        correct = sum(
            1 for p in predictions
            if p.prediction == p.ground_truth
        )
        total = predictions.count()

        # Per-class accuracy
        per_class = {}
        for severity in ['routine', 'soon', 'urgent', 'emergency']:
            severity_preds = predictions.filter(ground_truth=severity)
            if severity_preds.count() > 0:
                correct_class = severity_preds.filter(
                    prediction=severity
                ).count()
                per_class[severity] = correct_class / severity_preds.count()

        return {
            'overall_accuracy': correct / total,
            'per_class_accuracy': per_class,
            'total_labeled': total
        }

    @staticmethod
    def print_dashboard():
        """Print monitoring dashboard."""

        print("\n" + "="*60)
        print("🏥 ML MODEL DASHBOARD")
        print("="*60)
        print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

        # Hourly stats
        print("\n📊 LAST HOUR:")
        hourly = MLMetricsMonitor.get_hourly_stats()

        if hourly['total'] > 0:
            print(f"  Total predictions: {hourly['total']}")
            print(f"  Predictions/min:   {hourly['predictions_per_minute']:.1f}")
            print(f"  Avg confidence:    {hourly['avg_confidence']*100:.1f}%")
            print(f"  Fallback rate:     {hourly['fallback_rate']*100:.1f}%")
            print(f"\n  By severity:")
            for sev, count in hourly['by_severity'].items():
                print(f"    {sev}: {count} ({count/hourly['total']*100:.0f}%)")
        else:
            print("  No predictions yet")

        # Daily accuracy
        print("\n📈 LAST 24 HOURS (labeled data only):")
        daily = MLMetricsMonitor.get_daily_accuracy()

        if daily:
            print(f"  Overall accuracy: {daily['overall_accuracy']*100:.1f}%")
            print(f"  Labeled samples:  {daily['total_labeled']}")
            print(f"\n  Per-class accuracy:")
            for sev, acc in daily['per_class_accuracy'].items():
                print(f"    {sev}: {acc*100:.1f}%")
        else:
            print("  No labeled data available")

        print("\n" + "="*60)

# Run dashboard
MLMetricsMonitor.print_dashboard()
```

---

## Section 3: Doctor Feedback System

### 👨‍⚕️ Collecting Doctor Feedback

```python
# File: api/views/feedback_views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from api.models import MLPredictionLog

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_doctor_feedback(request):
    """
    Let doctors correct ML predictions.

    POST /api/ml/feedback/
    {
      "triage_log_id": 123,
      "ml_prediction": "soon",
      "doctor_correction": "urgent",
      "feedback_note": "Patient had hidden symptoms"
    }

    ELI5: Like a teacher grading the model's homework
    and showing it the correct answer!
    """

    triage_id = request.data.get('triage_log_id')
    ml_pred = request.data.get('ml_prediction')
    correct_label = request.data.get('doctor_correction')
    note = request.data.get('feedback_note', '')

    # Find the prediction log
    try:
        pred_log = MLPredictionLog.objects.get(
            triage_log_id=triage_id
        )

        # Save ground truth
        pred_log.ground_truth = correct_label
        pred_log.feedback_note = note
        pred_log.feedback_at = datetime.now()
        pred_log.feedback_by = request.user
        pred_log.save()

        # Check if correction needed
        was_correct = (ml_pred == correct_label)

        if not was_correct:
            # Log the error for analysis
            logger.warning(
                f"ML prediction corrected: {ml_pred} → {correct_label}"
            )

        return Response({
            'message': 'Feedback recorded',
            'was_correct': was_correct
        })

    except MLPredictionLog.DoesNotExist:
        return Response({
            'error': 'Prediction not found'
        }, status=404)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_feedback_stats(request):
    """
    Get statistics on doctor feedback.

    GET /api/ml/feedback/stats/
    """

    # All feedback
    all_feedback = MLPredictionLog.objects.filter(
        ground_truth__isnull=False
    )

    total = all_feedback.count()

    if total == 0:
        return Response({'total': 0})

    # Accuracy
    correct = all_feedback.filter(
        prediction=F('ground_truth')
    ).count()

    accuracy = correct / total

    # Most common errors
    errors = all_feedback.exclude(
        prediction=F('ground_truth')
    )

    error_patterns = {}
    for error in errors:
        key = f"{error.prediction} → {error.ground_truth}"
        error_patterns[key] = error_patterns.get(key, 0) + 1

    # Sort by frequency
    top_errors = sorted(
        error_patterns.items(),
        key=lambda x: x[1],
        reverse=True
    )[:5]

    return Response({
        'total_feedback': total,
        'accuracy': accuracy,
        'correct': correct,
        'incorrect': total - correct,
        'top_errors': [
            {'pattern': pattern, 'count': count}
            for pattern, count in top_errors
        ]
    })
```

---

## Section 4: When to Retrain

### 🎯 Retrain Decision Logic

```python
# File: ml/monitoring/retrain_decision.py

def should_retrain_model():
    """
    Decide if model needs retraining.

    ELI5: Like deciding if your car needs an oil change
    based on multiple warning signs!
    """

    reasons = []

    # Reason 1: Time-based (every 3 months)
    from ml.model_management import load_model_complete
    loaded = load_model_complete()

    saved_at = datetime.fromisoformat(loaded['metadata']['saved_at'])
    days_old = (datetime.now() - saved_at).days

    if days_old > 90:  # 3 months
        reasons.append(f"Model is {days_old} days old (>90 days)")

    # Reason 2: Performance drop
    daily_acc = MLMetricsMonitor.get_daily_accuracy()
    if daily_acc:
        training_acc = loaded['metadata']['accuracy']
        current_acc = daily_acc['overall_accuracy']

        if training_acc - current_acc > 0.10:
            reasons.append(
                f"Accuracy dropped {(training_acc - current_acc)*100:.1f}%"
            )

    # Reason 3: Enough new data
    total_feedback = MLPredictionLog.objects.filter(
        ground_truth__isnull=False
    ).count()

    training_size = loaded['metadata']['training_samples']

    if total_feedback > training_size * 0.5:  # 50% more data
        reasons.append(
            f"Have {total_feedback} new labeled examples"
        )

    # Reason 4: High error rate on emergencies
    if daily_acc:
        emergency_acc = daily_acc['per_class_accuracy'].get('emergency', 1.0)
        if emergency_acc < 0.85:
            reasons.append(
                f"Emergency accuracy only {emergency_acc*100:.1f}% (<85%)"
            )

    # Decision
    should_retrain = len(reasons) >= 2  # 2+ reasons = retrain

    print("🤔 RETRAIN DECISION:")
    print("="*60)

    if should_retrain:
        print("✅ RETRAIN RECOMMENDED")
        print("\nReasons:")
        for i, reason in enumerate(reasons, 1):
            print(f"  {i}. {reason}")
        print("\n📋 Next steps:")
        print("  1. Collect all labeled data since last training")
        print("  2. Run full training pipeline (Parts 3-5)")
        print("  3. Compare new model vs current model")
        print("  4. Deploy if new model is better")
    else:
        print("⏸️  NO RETRAINING NEEDED YET")
        if reasons:
            print("\nWarning signs:")
            for reason in reasons:
                print(f"  - {reason}")
            print("\nMonitor closely - may need retraining soon")
        else:
            print("\n✅ Model is healthy")

    print("="*60)

    return should_retrain, reasons
```

---

## Section 5: Continuous Learning Loop

### 🔄 The Learning Loop

```python
# File: ml/continuous_learning.py

def continuous_learning_cycle():
    """
    Complete cycle: Monitor → Collect → Retrain → Deploy

    ELI5: Like a student who:
    1. Takes a test (monitor)
    2. Reviews mistakes (collect feedback)
    3. Studies more (retrain)
    4. Takes test again (deploy)
    """

    print("🔄 CONTINUOUS LEARNING CYCLE")
    print("="*60)

    # Step 1: Monitor current performance
    print("\n📊 Step 1: Monitoring performance...")
    drift_detected = daily_drift_check()
    should_retrain, reasons = should_retrain_model()

    if not should_retrain:
        print("\n✅ No retraining needed - cycle complete")
        return

    # Step 2: Collect new labeled data
    print("\n📝 Step 2: Collecting new training data...")

    new_data = MLPredictionLog.objects.filter(
        ground_truth__isnull=False,
        used_for_training=False  # Not yet used
    )

    print(f"  New labeled examples: {new_data.count()}")

    if new_data.count() < 100:
        print("  ⚠️  Not enough data - need at least 100 examples")
        print("  Continue collecting feedback from doctors")
        return

    # Step 3: Retrain model
    print("\n🧠 Step 3: Retraining model...")
    print("  (Run training pipeline from Parts 3-5)")
    print("  This will take 1-2 hours")

    # In practice, you'd call:
    # from ml.train_model import full_training_pipeline
    # new_model = full_training_pipeline()

    # Step 4: Evaluate new model
    print("\n📈 Step 4: Evaluating new model...")
    print("  Compare:")
    print("    Old model accuracy: 89.4%")
    print("    New model accuracy: 91.2%")
    print("    Improvement: +1.8%")

    # Step 5: Deploy if better
    print("\n🚀 Step 5: Deployment decision...")

    # if new_model_better:
    print("  ✅ New model is better - deploying!")
    print("  1. Save new model")
    print("  2. Update 'latest' symlink")
    print("  3. Restart Django (auto-loads new model)")
    print("  4. Monitor for 24 hours")

    # Step 6: Mark data as used
    print("\n✓ Step 6: Updating training records...")
    new_data.update(used_for_training=True)

    print("\n🎉 LEARNING CYCLE COMPLETE!")
    print("="*60)
```

---

## Section 6: Performance Dashboard

### 📊 Simple Django Admin Dashboard

```python
# File: api/admin.py (add to existing)

from django.contrib import admin
from django.utils.html import format_html
from api.models import MLPredictionLog

@admin.register(MLPredictionLog)
class MLPredictionAdmin(admin.ModelAdmin):
    """
    Admin dashboard for ML predictions.

    ELI5: Like a car dashboard showing speed, fuel, etc.
    This shows model health!
    """

    list_display = [
        'timestamp',
        'prediction_badge',
        'confidence_bar',
        'ground_truth_badge',
        'correctness',
        'method'
    ]

    list_filter = [
        'prediction',
        'ground_truth',
        'method',
        'timestamp'
    ]

    def prediction_badge(self, obj):
        """Show prediction with color coding."""
        colors = {
            'routine': '#28a745',
            'soon': '#ffc107',
            'urgent': '#fd7e14',
            'emergency': '#dc3545'
        }
        color = colors.get(obj.prediction, '#6c757d')
        return format_html(
            '<span style="background-color:{}; color:white; '
            'padding:3px 10px; border-radius:3px;">{}</span>',
            color,
            obj.prediction.upper()
        )
    prediction_badge.short_description = 'Prediction'

    def confidence_bar(self, obj):
        """Show confidence as progress bar."""
        width = int(obj.confidence * 100)
        color = '#28a745' if obj.confidence > 0.8 else '#ffc107'
        return format_html(
            '<div style="width:100px; background:#ddd;">'
            '<div style="width:{}px; background:{}; '
            'color:white; text-align:center;">{:.0f}%</div></div>',
            width, color, obj.confidence * 100
        )
    confidence_bar.short_description = 'Confidence'

    def ground_truth_badge(self, obj):
        """Show doctor's correction."""
        if not obj.ground_truth:
            return format_html('<span style="color:#999;">-</span>')

        colors = {
            'routine': '#28a745',
            'soon': '#ffc107',
            'urgent': '#fd7e14',
            'emergency': '#dc3545'
        }
        color = colors.get(obj.ground_truth, '#6c757d')
        return format_html(
            '<span style="background-color:{}; color:white; '
            'padding:3px 10px; border-radius:3px;">{}</span>',
            color,
            obj.ground_truth.upper()
        )
    ground_truth_badge.short_description = 'Doctor Says'

    def correctness(self, obj):
        """Show if prediction was correct."""
        if not obj.ground_truth:
            return '-'

        if obj.prediction == obj.ground_truth:
            return format_html('<span style="color:#28a745;">✓ Correct</span>')
        else:
            return format_html('<span style="color:#dc3545;">✗ Wrong</span>')
    correctness.short_description = 'Result'
```

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Not Monitoring After Deployment

```python
# WRONG ❌
deploy_model()
# Then forget about it for 6 months
# Model degrades silently

# CORRECT ✅
deploy_model()
setup_daily_monitoring()  # Check every day!
alert_if_accuracy_drops()  # Get notified
```

### ❌ Mistake 2: Retraining Too Often

```python
# WRONG ❌
# Retrain every time you get 10 new examples
# Waste of time and resources

# CORRECT ✅
# Retrain when:
# - 3 months passed OR
# - Accuracy dropped >10% OR
# - Have 50%+ more labeled data
```

### ❌ Mistake 3: No Doctor Feedback Loop

```python
# WRONG ❌
# ML makes predictions
# Doctors see predictions
# No way to report errors
# Model never learns from mistakes

# CORRECT ✅
# Provide feedback button for doctors
# Log all corrections
# Use corrections as new training data
```

---

## 📚 Summary: Phase 7 - Monitoring

**What You Learned**:

1. ✅ **Model Drift**: Data drift, concept drift, performance drift
2. ✅ **Detection**: Monitor accuracy, vocabulary, error patterns
3. ✅ **Doctor Feedback**: Systematic correction collection
4. ✅ **Retrain Triggers**: Time-based, performance-based, data-based
5. ✅ **Continuous Learning**: Monitor → Collect → Retrain → Deploy
6. ✅ **Dashboards**: Track metrics in Django admin

**Key Formula**:
```python
retrain_needed = (
    days_since_training > 90 or
    accuracy_drop > 0.10 or
    new_labeled_data > training_size * 0.5
)
```

**Next**: [Part 9: Safety & Ethics](ml-triage-part9-safety-ethics.md)

---

## 🎯 Quick Reference

```python
# Daily monitoring
from ml.monitoring.drift_detector import daily_drift_check
daily_drift_check()

# Check if retrain needed
from ml.monitoring.retrain_decision import should_retrain_model
should_retrain, reasons = should_retrain_model()

# View dashboard
from ml.monitoring.metrics import MLMetricsMonitor
MLMetricsMonitor.print_dashboard()

# Run continuous learning
from ml.continuous_learning import continuous_learning_cycle
continuous_learning_cycle()
```

**Recommended Schedule**:
- **Daily**: Run drift check
- **Weekly**: Review feedback stats
- **Monthly**: Evaluate retrain decision
- **Quarterly**: Retrain if needed

