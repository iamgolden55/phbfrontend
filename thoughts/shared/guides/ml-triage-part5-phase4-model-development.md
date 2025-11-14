---
title: "Part 5: Model Development - Training Your First ML Model"
date: 2025-11-11
author: Claude
part: 5 of 9
difficulty: beginner-friendly
estimated_time: 8-10 hours (learning + experimentation)
prerequisite: "Part 4 - Feature Engineering (features ready)"
tags: [machine-learning, model-training, algorithms, healthcare, beginner]
---

# Part 5: Model Development - Training Your First ML Model

**Welcome to the Exciting Part!** 🤖

This is where you actually train an ML model! After all the preparation (data collection, labeling, feature engineering), you're finally ready to teach a computer to predict severity levels.

---

## 🤔 What Is "Model Training"? (ELI5)

### The Simplest Possible Explanation

Remember learning multiplication tables as a kid?

**Traditional approach** (memorization):
```
Teacher: "What's 7 × 8?"
You: "Uh... 56?"
Teacher: "Correct!"

You memorized: 7 × 8 = 56
```

**ML approach** (pattern learning):
```
Show examples:
  2 × 3 = 6
  4 × 5 = 20
  7 × 8 = 56
  3 × 9 = 27

Computer learns the PATTERN:
  "Ah! I multiply the first number by the second!"

Test on new problem:
  6 × 7 = ?
  Computer: "I multiply 6 × 7 = 42" ✅
```

**Model training** = Showing examples until the computer learns the pattern

### Real-World Analogy: Teaching a Dog Tricks

**Scenario**: Teaching a dog to sit

**Step 1: Show examples** (Training)
```
You: "Sit!" + push dog's bottom down
Dog sits → Give treat ✅

Repeat 100 times

Dog learns: "When human says 'sit' and I sit, I get treat"
```

**Step 2: Test** (Evaluation)
```
You: "Sit!" (no pushing)
Dog: Sits automatically ✅

The dog learned the pattern!
```

**Step 3: Use in real life** (Production)
```
At the park:
You: "Sit!"
Dog: Sits ✅

At home:
You: "Sit!"
Dog: Sits ✅

The dog generalized the pattern to new situations!
```

### Applying This to Medical Triage

**Training**: Show the model 1,000 labeled cases
```
Input: "chest pain, 55 years old, diabetic"
Label: "HIGH severity"

Input: "mild headache, 25 years old, no history"
Label: "LOW severity"

... 998 more examples ...

Model learns: "Chest pain + age + diabetes → HIGH"
                "Mild symptoms + young + healthy → LOW"
```

**Testing**: Give it new cases it's never seen
```
Input: "chest pain, 62 years old, hypertension"
Model: "HIGH severity" ✅ (Correct!)

Input: "minor cough, 30 years old, no history"
Model: "LOW severity" ✅ (Correct!)
```

**Production**: Use it on real patients
```
New patient: "shortness of breath, 45, asthma"
Model: "MEDIUM severity" → Recommend GP appointment
```

---

## 🎯 What You'll Learn in This Part

By the end, you'll understand:

✅ What different ML algorithms are (and when to use each)
✅ How to train your first model (step-by-step code)
✅ How to evaluate if your model is good
✅ How to compare multiple models
✅ How to choose the best model for production
✅ Common beginner mistakes and how to avoid them

**Time**: 8-10 hours total
- Understanding algorithms: 2-3 hours
- Coding first model: 2-3 hours
- Training multiple models: 2-3 hours
- Evaluation & comparison: 2-3 hours

---

## 📚 Table of Contents

1. [Understanding ML Algorithms](#1-understanding-ml-algorithms)
2. [Your First Model: Logistic Regression](#2-your-first-model-logistic-regression)
3. [Training the Model](#3-training-the-model)
4. [Evaluating the Model](#4-evaluating-the-model)
5. [Trying Different Algorithms](#5-trying-different-algorithms)
6. [Comparing Model Performance](#6-comparing-model-performance)
7. [Choosing the Best Model](#7-choosing-the-best-model)
8. [Common Mistakes](#8-common-mistakes)

---

## 1. Understanding ML Algorithms

### What Is an "Algorithm"?

**Simple definition**: An algorithm is a recipe for solving a problem.

**Cooking analogy**:
```
Recipe for chocolate cake (algorithm):
  1. Mix flour, sugar, cocoa
  2. Add eggs and butter
  3. Bake at 350°F for 30 minutes

Different recipes (algorithms) for cake:
  - Chocolate cake recipe
  - Vanilla cake recipe
  - Red velvet cake recipe

All make cake, but different approaches!
```

**ML analogy**:
```
Different algorithms for predicting severity:
  - Logistic Regression (simple, fast)
  - Random Forest (powerful, slower)
  - Neural Network (very powerful, slowest)

All predict severity, but different approaches!
```

### The 4 Main Algorithms We'll Use

| Algorithm | Complexity | Speed | Accuracy | When to Use |
|-----------|------------|-------|----------|-------------|
| **Logistic Regression** | Simple ⭐ | Very Fast ⚡⚡⚡ | Good 📊 | Start here! Baseline model |
| **Random Forest** | Medium ⭐⭐ | Fast ⚡⚡ | Better 📊📊 | Good default choice |
| **XGBoost** | Complex ⭐⭐⭐ | Medium ⚡ | Best 📊📊📊 | When you need maximum accuracy |
| **Neural Network** | Very Complex ⭐⭐⭐⭐ | Slow 🐌 | Best 📊📊📊 | Large datasets (10,000+) |

### Algorithm #1: Logistic Regression

**Simple explanation**: Draws a line to separate categories

**Visual example**:
```
Imagine plotting patients on a graph:

Severity Score
    100 |                    ✗ CRITICAL
        |               ✗
     75 |          ✗         ✗ HIGH
        |     ✗       ✗
     50 |  ✗      ✗          ● MEDIUM
        | ●    ●    ●
     25 |●  ●           ●    ● LOW
        |   ●     ●
      0 |________________________
        0      25    50    75   Age

Logistic Regression draws a line:
    
    100 |                    ✗
        |           ─────────── ← Line separates HIGH from LOW
     50 |  ●    ●
        |
      0 |________________________

If new patient is above line → HIGH
If new patient is below line → LOW
```

**How it works**:
1. Takes all your features (symptoms, age, etc.)
2. Learns which features are most important
3. Combines them with weights: `severity = w1×chest_pain + w2×age + w3×diabetes + ...`
4. Converts to probability: 0-1 range

**Pros**:
- Very fast to train (seconds)
- Easy to understand
- Works well with small datasets (500 examples)
- Can explain predictions ("chest pain contributed 0.4 to HIGH score")

**Cons**:
- Only learns simple patterns (straight lines)
- Can't capture complex relationships
- Lower accuracy than other methods

**When to use**: 
- Your first model (always start here!)
- When you need explainability
- When you have limited data

### Algorithm #2: Random Forest

**Simple explanation**: Asks 100 simple models and takes a vote

**Visual example**:
```
Think of asking 100 doctors for opinions:

Patient: "55M, chest pain, diabetic"

Tree 1: "HIGH severity" (based on age + diabetes)
Tree 2: "CRITICAL severity" (based on chest pain)
Tree 3: "HIGH severity" (based on age + symptoms)
Tree 4: "HIGH severity" (based on diabetes + pain)
... 96 more trees ...

Vote count:
  CRITICAL: 15 votes
  HIGH: 72 votes ← Winner!
  MEDIUM: 13 votes
  LOW: 0 votes

Random Forest: "HIGH severity" (majority vote)
```

**How it works**:
1. Creates 100 "decision trees" (simple models)
2. Each tree looks at different features
3. Each tree makes a prediction
4. Takes majority vote

**Pros**:
- More accurate than Logistic Regression
- Handles complex patterns
- Resistant to overfitting
- Still relatively fast

**Cons**:
- Slower than Logistic Regression
- Harder to explain (100 trees!)
- Uses more memory

**When to use**:
- When you need better accuracy than Logistic Regression
- When you have enough data (1,000+ examples)
- General-purpose "default choice"

### Algorithm #3: XGBoost

**Simple explanation**: Random Forest, but smarter

**How it's different**:
```
Random Forest: Creates 100 trees independently
  Tree 1: Makes predictions
  Tree 2: Makes predictions
  Tree 3: Makes predictions
  (All trees work separately)

XGBoost: Creates trees one at a time, learning from mistakes
  Tree 1: Makes predictions, gets 20% wrong
  Tree 2: Focuses on fixing Tree 1's mistakes
  Tree 3: Focuses on fixing Tree 1 + Tree 2's mistakes
  (Each tree corrects previous trees)
```

**Pros**:
- Usually the most accurate
- Wins most ML competitions
- Handles missing data well
- Fast training (with GPU)

**Cons**:
- Many parameters to tune
- Can overfit if not careful
- Harder to understand

**When to use**:
- When you need maximum accuracy
- When you have 2,000+ examples
- When you've tried Random Forest and want better

### Algorithm #4: Neural Network

**Simple explanation**: Mimics how brain neurons work

**Visual example**:
```
Your brain processing "Is this a dog?":

Input → Neuron Layer 1 → Neuron Layer 2 → Output
        ↓                ↓
    Detects shapes   Combines shapes   "Yes, it's a dog"
    (ears, tail)     into patterns

Neural Network for triage:

Features → Layer 1 → Layer 2 → Layer 3 → Severity
           ↓        ↓          ↓
       Combines    Finds      Final
       symptoms    patterns   decision
```

**Pros**:
- Can learn very complex patterns
- State-of-the-art for large datasets
- Handles images, text, etc.

**Cons**:
- Needs LOTS of data (10,000+ examples)
- Very slow to train
- "Black box" - hard to explain
- Many parameters to tune

**When to use**:
- When you have 10,000+ examples
- When simpler methods plateau
- When you have time/resources for training

**For your triage system**: Start with Logistic Regression, move to Random Forest. Skip Neural Networks unless you have 10,000+ labeled cases.

---

## 2. Your First Model: Logistic Regression

Let's train your first ML model! We'll start with Logistic Regression because it's the simplest.

### Step 1: Load Your Data

First, we need to load the labeled triage data from your database.

**Create**: `basebackend/ml/train_model.py`

```python
# ml/train_model.py

"""
ML Model Training Script

Trains machine learning models on labeled triage data.
"""

import numpy as np
import pandas as pd
from django.core.management import setup_environ
import sys
import os

# Setup Django environment to access models
sys.path.append('/Users/new/phbfinal/basebackend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
import django
django.setup()

from api.models.triage import TriageLog
from ml.feature_extraction import TriageFeatureExtractor


def load_training_data():
    """
    Load labeled triage data from database.
    
    Returns:
        List of triage dictionaries ready for feature extraction
    """
    
    # Get all triages that have been labeled
    labeled_triages = TriageLog.objects.filter(
        ground_truth_severity__isnull=False  # Only labeled cases
    ).order_by('created_at')
    
    print(f"Found {labeled_triages.count()} labeled triage cases")
    
    # Convert to list of dictionaries
    training_data = []
    labels = []
    
    for triage in labeled_triages:
        # Extract features
        data_dict = {
            'symptoms_data': triage.symptoms_data,
            'urgency': triage.urgency,
            'patient_age': triage.patient_age,
            'medical_history': triage.medical_history or [],
            'severity_score': triage.severity_score,
        }
        
        training_data.append(data_dict)
        
        # Label is the ground truth severity
        labels.append(triage.ground_truth_severity)
    
    print(f"Loaded {len(training_data)} training examples")
    
    # Show label distribution
    unique, counts = np.unique(labels, return_counts=True)
    print("\nLabel distribution:")
    for severity, count in zip(unique, counts):
        percentage = count / len(labels) * 100
        print(f"  {severity}: {count} ({percentage:.1f}%)")
    
    return training_data, labels


# Example usage:
if __name__ == '__main__':
    training_data, labels = load_training_data()
    
    print(f"\nFirst example:")
    print(f"Features: {training_data[0]}")
    print(f"Label: {labels[0]}")
```

**Run it**:
```bash
cd /Users/new/phbfinal/basebackend
python ml/train_model.py
```

**Expected output**:
```
Found 1205 labeled triage cases
Loaded 1205 training examples

Label distribution:
  low: 722 (59.9%)
  medium: 301 (25.0%)
  high: 145 (12.0%)
  critical: 37 (3.1%)

First example:
Features: {'symptoms_data': [{'symptom_name': 'chest pain', ...}], 'urgency': 'urgent', ...}
Label: high
```

### Step 2: Extract Features

Now convert the raw data to numerical features using the extractor from Part 4.

```python
# ml/train_model.py (continued)

def prepare_features_and_labels(training_data, labels):
    """
    Convert raw data to feature vectors and label integers.
    
    Args:
        training_data: List of triage dictionaries
        labels: List of severity strings ('low', 'medium', 'high', 'critical')
    
    Returns:
        X: Feature matrix (n_samples, n_features)
        y: Label array (n_samples,) with integer labels
    """
    
    # Step 1: Extract features
    print("\nExtracting features...")
    extractor = TriageFeatureExtractor(max_symptom_features=100)
    X = extractor.fit_transform(training_data)
    
    print(f"Feature matrix shape: {X.shape}")
    print(f"  {X.shape[0]} patients")
    print(f"  {X.shape[1]} features per patient")
    
    # Step 2: Convert labels to integers
    # ML models need numbers, not strings!
    label_mapping = {
        'low': 0,
        'medium': 1,
        'high': 2,
        'critical': 3
    }
    
    y = np.array([label_mapping[label] for label in labels])
    
    print(f"\nLabel encoding:")
    print(f"  'low' → 0")
    print(f"  'medium' → 1")
    print(f"  'high' → 2")
    print(f"  'critical' → 3")
    
    return X, y, extractor, label_mapping


# Example usage:
if __name__ == '__main__':
    training_data, labels = load_training_data()
    X, y, extractor, label_mapping = prepare_features_and_labels(training_data, labels)
    
    print(f"\nReady for training!")
    print(f"X shape: {X.shape}")
    print(f"y shape: {y.shape}")
```

**Run it**:
```bash
python ml/train_model.py
```

**Expected output**:
```
Extracting features...
✅ Learned vocabulary of 89 symptom terms
✅ Encoded 4 categories: ['routine', 'soon', 'urgent', 'emergency']
✅ Encoded 12 conditions: ['asthma', 'diabetes', ...]
✅ Learned scaling for 2 numerical features

Feature matrix shape: (1205, 118)
  1205 patients
  118 features per patient

Label encoding:
  'low' → 0
  'medium' → 1
  'high' → 2
  'critical' → 3

Ready for training!
X shape: (1205, 118)
y shape: (1205,)
```

---


## 3. Training the Model

Now the exciting part - actually training your first ML model!

### Step 3: Split Data (Train/Test)

**Important concept**: We need to split data into two sets:

**Training set** (80%): Model learns from this
**Test set** (20%): Model is evaluated on this (never seen before!)

**Why?** Imagine studying for an exam:

```
Bad approach:
  - Study questions 1-100
  - Exam has the SAME questions 1-100
  - You get 100% but didn't really learn ❌

Good approach:
  - Study questions 1-80
  - Exam has NEW questions 81-100
  - You get 85% - proves you learned the concepts ✅
```

Same with ML:
```
Training set: Questions 1-80 (model learns patterns)
Test set: Questions 81-100 (model proves it learned)
```

**Code**:

```python
# ml/train_model.py (continued)

from sklearn.model_selection import train_test_split

def split_train_test(X, y, test_size=0.2, random_state=42):
    """
    Split data into training and test sets.
    
    Args:
        X: Feature matrix
        y: Labels
        test_size: Percentage for test set (0.2 = 20%)
        random_state: Random seed (42 = reproducible results)
    
    Returns:
        X_train, X_test, y_train, y_test
    """
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=test_size,
        random_state=random_state,
        stratify=y  # Keep same proportion of each severity level
    )
    
    print("\n" + "="*60)
    print("DATA SPLIT")
    print("="*60)
    print(f"Training set: {X_train.shape[0]} samples ({100-test_size*100:.0f}%)")
    print(f"Test set: {X_test.shape[0]} samples ({test_size*100:.0f}%)")
    
    # Show label distribution in each set
    print("\nTraining set labels:")
    unique, counts = np.unique(y_train, return_counts=True)
    for label, count in zip(unique, counts):
        print(f"  Label {label}: {count} ({count/len(y_train)*100:.1f}%)")
    
    print("\nTest set labels:")
    unique, counts = np.unique(y_test, return_counts=True)
    for label, count in zip(unique, counts):
        print(f"  Label {label}: {count} ({count/len(y_test)*100:.1f}%)")
    
    return X_train, X_test, y_train, y_test


# Example usage:
if __name__ == '__main__':
    training_data, labels = load_training_data()
    X, y, extractor, label_mapping = prepare_features_and_labels(training_data, labels)
    
    X_train, X_test, y_train, y_test = split_train_test(X, y)
```

### Step 4: Train Logistic Regression

Finally! Let's train the model:

```python
# ml/train_model.py (continued)

from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import time

def train_logistic_regression(X_train, y_train):
    """
    Train Logistic Regression model.
    
    Args:
        X_train: Training features
        y_train: Training labels
    
    Returns:
        Trained model
    """
    
    print("\n" + "="*60)
    print("TRAINING LOGISTIC REGRESSION")
    print("="*60)
    
    # Create model
    model = LogisticRegression(
        max_iter=1000,      # Maximum training iterations
        random_state=42,    # Reproducible results
        multi_class='multinomial',  # For 4 classes (low/med/high/crit)
        solver='lbfgs'      # Optimization algorithm (don't worry about this)
    )
    
    # Train!
    print("Training started...")
    start_time = time.time()
    
    model.fit(X_train, y_train)
    
    training_time = time.time() - start_time
    
    print(f"✅ Training completed in {training_time:.2f} seconds")
    
    return model


# Example usage:
if __name__ == '__main__':
    training_data, labels = load_training_data()
    X, y, extractor, label_mapping = prepare_features_and_labels(training_data, labels)
    X_train, X_test, y_train, y_test = split_train_test(X, y)
    
    # Train model
    model = train_logistic_regression(X_train, y_train)
    
    print("\n🎉 Your first ML model is trained!")
```

**Run it**:
```bash
python ml/train_model.py
```

**Expected output**:
```
==============================================================
TRAINING LOGISTIC REGRESSION
==============================================================
Training started...
✅ Training completed in 0.43 seconds

🎉 Your first ML model is trained!
```

**That's it!** You just trained your first machine learning model! 🎉

---

## 4. Evaluating the Model

Now we need to check: **How good is our model?**

### Understanding Accuracy

**Accuracy** = Percentage of correct predictions

```
Simple example:
  Test set has 100 patients
  Model predicts correctly for 85 patients
  Accuracy = 85/100 = 85% ✅
```

But there's more to evaluation than just accuracy...

### The Four Metrics

For each severity level, we track:

**1. Accuracy**: Overall correctness (simplest)
```
Correct predictions / Total predictions
85 correct out of 100 = 85%
```

**2. Precision**: Of the ones we predicted as HIGH, how many were actually HIGH?
```
True Positives / (True Positives + False Positives)

Example:
  Model predicted 20 patients as HIGH
  15 were actually HIGH → Precision = 15/20 = 75%
  
"When model says HIGH, it's right 75% of the time"
```

**3. Recall**: Of all actual HIGH patients, how many did we catch?
```
True Positives / (True Positives + False Negatives)

Example:
  There were 25 actual HIGH patients
  We caught 15 of them → Recall = 15/25 = 60%
  
"We caught 60% of the HIGH cases"
```

**4. F1-Score**: Balance between Precision and Recall
```
2 × (Precision × Recall) / (Precision + Recall)

Example:
  Precision = 75%, Recall = 60%
  F1 = 2 × (0.75 × 0.60) / (0.75 + 0.60) = 67%
```

### Real-World Example

Imagine 100 test patients:
- 60 are actually LOW
- 25 are actually MEDIUM
- 12 are actually HIGH
- 3 are actually CRITICAL

**Model predictions**:
```
Predicted LOW: 58 patients
  - 55 were actually LOW ✅
  - 3 were actually MEDIUM ❌
  
Predicted MEDIUM: 27 patients
  - 22 were actually MEDIUM ✅
  - 4 were actually LOW ❌
  - 1 was actually HIGH ❌
  
Predicted HIGH: 12 patients
  - 10 were actually HIGH ✅
  - 2 were actually MEDIUM ❌
  
Predicted CRITICAL: 3 patients
  - 3 were actually CRITICAL ✅

Overall accuracy: 90/100 = 90% ✅
```

**Breakdown by severity**:

**LOW severity**:
- Precision: 55/(55+4) = 93% (when we say LOW, we're usually right)
- Recall: 55/60 = 92% (we catch most LOW cases)

**CRITICAL severity**:
- Precision: 3/3 = 100% (when we say CRITICAL, we're always right!)
- Recall: 3/3 = 100% (we catch all CRITICAL cases!)

### Implementation

```python
# ml/train_model.py (continued)

def evaluate_model(model, X_test, y_test, label_mapping):
    """
    Evaluate model performance on test set.
    
    Args:
        model: Trained model
        X_test: Test features
        y_test: Test labels
        label_mapping: Dict mapping label names to integers
    
    Returns:
        Dictionary with evaluation metrics
    """
    
    print("\n" + "="*60)
    print("MODEL EVALUATION")
    print("="*60)
    
    # Make predictions
    y_pred = model.predict(X_test)
    
    # Calculate accuracy
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\n📊 Overall Accuracy: {accuracy*100:.2f}%")
    
    # Detailed report
    # Reverse mapping: 0 → 'low', 1 → 'medium', etc.
    reverse_mapping = {v: k for k, v in label_mapping.items()}
    target_names = [reverse_mapping[i] for i in sorted(reverse_mapping.keys())]
    
    print("\n📈 Detailed Performance by Severity Level:")
    print("="*60)
    report = classification_report(
        y_test, y_pred,
        target_names=target_names,
        digits=3
    )
    print(report)
    
    # Confusion matrix (shows where model makes mistakes)
    from sklearn.metrics import confusion_matrix
    cm = confusion_matrix(y_test, y_pred)
    
    print("\n🔍 Confusion Matrix:")
    print("(Rows = Actual, Columns = Predicted)")
    print("="*60)
    
    # Pretty print
    header = "           " + "  ".join(target_names)
    print(header)
    for i, actual_label in enumerate(target_names):
        row = f"{actual_label:10s} " + "  ".join([f"{cm[i,j]:3d}" for j in range(len(target_names))])
        print(row)
    
    return {
        'accuracy': accuracy,
        'confusion_matrix': cm,
        'classification_report': report
    }


# Example usage:
if __name__ == '__main__':
    training_data, labels = load_training_data()
    X, y, extractor, label_mapping = prepare_features_and_labels(training_data, labels)
    X_train, X_test, y_train, y_test = split_train_test(X, y)
    
    model = train_logistic_regression(X_train, y_train)
    
    # Evaluate
    results = evaluate_model(model, X_test, y_test, label_mapping)
```

**Expected output**:
```
==============================================================
MODEL EVALUATION
==============================================================

📊 Overall Accuracy: 87.14%

📈 Detailed Performance by Severity Level:
==============================================================
              precision    recall  f1-score   support

         low      0.921     0.956     0.938       145
      medium      0.833     0.800     0.816        60
        high      0.778     0.636     0.700        22
    critical      1.000     0.857     0.923         7

    accuracy                          0.871       234
   macro avg      0.883     0.812     0.844       234
weighted avg      0.869     0.871     0.868       234

🔍 Confusion Matrix:
(Rows = Actual, Columns = Predicted)
==============================================================
           low  medium  high  critical
low        139    5      1     0
medium     9      48     3     0
high       3      5      14    0
critical   0      0      1     6
```

**Reading the confusion matrix**:
```
Row = What it ACTUALLY was
Column = What we PREDICTED

Example: cm[2, 1] = 5
  - 5 patients were actually HIGH (row 2)
  - But we predicted MEDIUM (column 1)
  - This is a mistake! We underestimated severity
```

### What Makes a "Good" Model?

**For medical triage, priorities are**:

1. **High recall for CRITICAL** (catch all emergencies!)
   - 100% recall = Caught all critical cases ✅
   - Missing a critical case is DANGEROUS

2. **High precision for CRITICAL** (don't cry wolf)
   - 100% precision = When we say CRITICAL, we're right ✅
   - Too many false alarms = people ignore warnings

3. **Overall accuracy > 80%**
   - Better than random guessing (25% for 4 classes)
   - Better than simple rules (~60-70%)

**Your first model results**:
- ✅ Overall accuracy: 87% (Great!)
- ✅ CRITICAL precision: 100% (Perfect!)
- ✅ CRITICAL recall: 86% (Good, but missed 1 case)
- ⚠️ HIGH recall: 64% (Could be better - missed 8 HIGH cases)

**Interpretation**: Model is good but could improve on detecting HIGH severity cases.

---

## 5. Trying Different Algorithms

Let's try Random Forest and XGBoost to see if we can do better!

### Training Random Forest

```python
# ml/train_model.py (continued)

from sklearn.ensemble import RandomForestClassifier

def train_random_forest(X_train, y_train):
    """
    Train Random Forest model.
    
    Args:
        X_train: Training features
        y_train: Training labels
    
    Returns:
        Trained model
    """
    
    print("\n" + "="*60)
    print("TRAINING RANDOM FOREST")
    print("="*60)
    
    model = RandomForestClassifier(
        n_estimators=100,   # Number of trees (more = better, but slower)
        max_depth=10,       # Maximum depth of each tree
        min_samples_split=5, # Minimum samples to split a node
        random_state=42,
        n_jobs=-1           # Use all CPU cores (faster!)
    )
    
    print("Training started...")
    start_time = time.time()
    
    model.fit(X_train, y_train)
    
    training_time = time.time() - start_time
    
    print(f"✅ Training completed in {training_time:.2f} seconds")
    
    return model


# Example usage:
if __name__ == '__main__':
    # ... previous code ...
    
    # Train Random Forest
    rf_model = train_random_forest(X_train, y_train)
    
    print("\n" + "="*60)
    print("RANDOM FOREST RESULTS")
    print("="*60)
    rf_results = evaluate_model(rf_model, X_test, y_test, label_mapping)
```

### Training XGBoost

```python
# ml/train_model.py (continued)

from xgboost import XGBClassifier

def train_xgboost(X_train, y_train):
    """
    Train XGBoost model.
    
    Args:
        X_train: Training features
        y_train: Training labels
    
    Returns:
        Trained model
    """
    
    print("\n" + "="*60)
    print("TRAINING XGBOOST")
    print("="*60)
    
    model = XGBClassifier(
        n_estimators=100,      # Number of boosting rounds
        max_depth=6,           # Maximum tree depth
        learning_rate=0.1,     # Step size (smaller = more careful learning)
        random_state=42,
        eval_metric='mlogloss', # Evaluation metric
        use_label_encoder=False
    )
    
    print("Training started...")
    start_time = time.time()
    
    model.fit(X_train, y_train)
    
    training_time = time.time() - start_time
    
    print(f"✅ Training completed in {training_time:.2f} seconds")
    
    return model


# Example usage:
if __name__ == '__main__':
    # ... previous code ...
    
    # Train XGBoost
    xgb_model = train_xgboost(X_train, y_train)
    
    print("\n" + "="*60)
    print("XGBOOST RESULTS")
    print("="*60)
    xgb_results = evaluate_model(xgb_model, X_test, y_test, label_mapping)
```

---

## 6. Comparing Model Performance

Now let's compare all three models side-by-side:

```python
# ml/train_model.py (continued)

def compare_models(models_dict, X_test, y_test):
    """
    Compare multiple models and show which is best.
    
    Args:
        models_dict: Dictionary of {name: model}
        X_test: Test features
        y_test: Test labels
    
    Returns:
        Comparison dataframe
    """
    
    print("\n" + "="*60)
    print("MODEL COMPARISON")
    print("="*60)
    
    results = []
    
    for name, model in models_dict.items():
        # Predict
        y_pred = model.predict(X_test)
        
        # Calculate metrics
        from sklearn.metrics import precision_recall_fscore_support
        
        accuracy = accuracy_score(y_test, y_pred)
        precision, recall, f1, _ = precision_recall_fscore_support(
            y_test, y_pred, average='weighted', zero_division=0
        )
        
        results.append({
            'Model': name,
            'Accuracy': f"{accuracy*100:.2f}%",
            'Precision': f"{precision*100:.2f}%",
            'Recall': f"{recall*100:.2f}%",
            'F1-Score': f"{f1*100:.2f}%"
        })
    
    # Convert to DataFrame for pretty printing
    df = pd.DataFrame(results)
    
    print("\n")
    print(df.to_string(index=False))
    print("\n")
    
    # Find best model by accuracy
    accuracies = [float(r['Accuracy'].strip('%')) for r in results]
    best_idx = np.argmax(accuracies)
    best_model_name = results[best_idx]['Model']
    
    print(f"🏆 Best Model: {best_model_name} ({results[best_idx]['Accuracy']} accuracy)")
    
    return df


# Complete example:
if __name__ == '__main__':
    print("\n" + "="*60)
    print("COMPLETE ML PIPELINE")
    print("="*60)
    
    # 1. Load data
    training_data, labels = load_training_data()
    
    # 2. Extract features
    X, y, extractor, label_mapping = prepare_features_and_labels(training_data, labels)
    
    # 3. Split train/test
    X_train, X_test, y_train, y_test = split_train_test(X, y)
    
    # 4. Train all models
    print("\n🚀 Training multiple models...")
    
    lr_model = train_logistic_regression(X_train, y_train)
    rf_model = train_random_forest(X_train, y_train)
    xgb_model = train_xgboost(X_train, y_train)
    
    # 5. Compare models
    models = {
        'Logistic Regression': lr_model,
        'Random Forest': rf_model,
        'XGBoost': xgb_model
    }
    
    comparison = compare_models(models, X_test, y_test)
    
    print("\n✅ Training complete! Check results above to choose best model.")
```

**Expected output**:
```
==============================================================
MODEL COMPARISON
==============================================================

               Model  Accuracy  Precision  Recall  F1-Score
  Logistic Regression    87.14%     86.90%  87.14%    86.80%
        Random Forest    91.45%     91.20%  91.45%    91.30%
              XGBoost    92.31%     92.10%  92.31%    92.20%

🏆 Best Model: XGBoost (92.31% accuracy)

✅ Training complete! Check results above to choose best model.
```

---


## 7. Choosing the Best Model

Now you have 3 models with different performance. How do you choose?

### Decision Framework

**Question 1: Is there a clear winner in accuracy?**

```
If XGBoost: 92% ✅
   Random Forest: 91%
   Logistic Regression: 87%

YES → XGBoost is clearly best (+1% over RF, +5% over LR)
```

**Question 2: Check CRITICAL severity performance**

```
For each model, check:
  - CRITICAL Precision: When we say CRITICAL, are we right?
  - CRITICAL Recall: Do we catch all CRITICAL cases?

Example results:
  Logistic Regression: Precision=100%, Recall=86%
  Random Forest: Precision=100%, Recall=100% ✅ Perfect!
  XGBoost: Precision=100%, Recall=100% ✅ Perfect!

Both RF and XGBoost are excellent at detecting emergencies.
```

**Question 3: Consider training time**

```
Logistic Regression: 0.5 seconds ⚡⚡⚡
Random Forest: 3.2 seconds ⚡⚡
XGBoost: 5.7 seconds ⚡

If XGBoost is only 1% better than RF, but 2x slower,
maybe Random Forest is better choice?
```

**Question 4: Consider explainability**

```
Logistic Regression: ✅ Easy to explain
  "Chest pain contributed +0.4, diabetes +0.2, total = HIGH"

Random Forest: ⚠️ Harder to explain
  "100 trees voted, 72 said HIGH"

XGBoost: ❌ Very hard to explain
  "Complex boosting algorithm predicted HIGH"

If you need to explain predictions to doctors → Logistic Regression
If you just need accuracy → XGBoost
```

### Recommendation for Your Triage System

**Start with**: Random Forest
- Good balance of accuracy (91%)
- Perfect CRITICAL detection
- Reasonable speed (3 seconds)
- Somewhat explainable

**Later, try**: XGBoost
- If you need that extra 1% accuracy
- When you have more data (2,000+ examples)
- When training time isn't critical

**Keep**: Logistic Regression
- As baseline comparison
- For quick experiments
- When you need full explainability

### Save the Best Model

```python
# ml/train_model.py (continued)

import pickle
import joblib

def save_model(model, extractor, label_mapping, filename_prefix='triage_model'):
    """
    Save trained model and associated components.
    
    Args:
        model: Trained ML model
        extractor: Fitted TriageFeatureExtractor
        label_mapping: Dict mapping severity names to integers
        filename_prefix: Prefix for saved files
    """
    
    print("\n" + "="*60)
    print("SAVING MODEL")
    print("="*60)
    
    # Create ml/models directory if doesn't exist
    import os
    os.makedirs('ml/models', exist_ok=True)
    
    # Save model
    model_path = f'ml/models/{filename_prefix}.pkl'
    joblib.dump(model, model_path)
    print(f"✅ Model saved to: {model_path}")
    
    # Save feature extractor
    extractor_path = f'ml/models/{filename_prefix}_extractor.pkl'
    joblib.dump(extractor, extractor_path)
    print(f"✅ Extractor saved to: {extractor_path}")
    
    # Save label mapping
    mapping_path = f'ml/models/{filename_prefix}_labels.pkl'
    joblib.dump(label_mapping, mapping_path)
    print(f"✅ Label mapping saved to: {mapping_path}")
    
    print(f"\n🎉 All components saved! Total size: {_get_file_sizes([model_path, extractor_path, mapping_path])}")


def _get_file_sizes(paths):
    """Calculate total size of files."""
    total_bytes = sum(os.path.getsize(p) for p in paths)
    if total_bytes < 1024:
        return f"{total_bytes} bytes"
    elif total_bytes < 1024*1024:
        return f"{total_bytes/1024:.1f} KB"
    else:
        return f"{total_bytes/(1024*1024):.1f} MB"


def load_model(filename_prefix='triage_model'):
    """
    Load saved model and components.
    
    Args:
        filename_prefix: Prefix used when saving
    
    Returns:
        model, extractor, label_mapping
    """
    
    model_path = f'ml/models/{filename_prefix}.pkl'
    extractor_path = f'ml/models/{filename_prefix}_extractor.pkl'
    mapping_path = f'ml/models/{filename_prefix}_labels.pkl'
    
    model = joblib.load(model_path)
    extractor = joblib.load(extractor_path)
    label_mapping = joblib.load(mapping_path)
    
    print(f"✅ Loaded model from: {model_path}")
    
    return model, extractor, label_mapping


# Example usage:
if __name__ == '__main__':
    # ... train models ...
    
    # Save the best model (XGBoost in this case)
    save_model(xgb_model, extractor, label_mapping, filename_prefix='triage_xgboost_v1')
    
    # Later, load it:
    # loaded_model, loaded_extractor, loaded_mapping = load_model('triage_xgboost_v1')
```

---

## 8. Common Mistakes (And How to Avoid Them)

### Mistake 1: Training on Test Data 🚫

**WRONG**:
```python
# Fit extractor on ALL data (including test)
extractor.fit(all_data)  # ❌ Data leakage!

# Split after fitting
X_train, X_test = train_test_split(X)

# Model sees test data during feature extraction → cheating!
```

**CORRECT**:
```python
# Split FIRST
train_data, test_data = train_test_split(all_data)

# Fit extractor ONLY on training data
extractor.fit(train_data)  # ✅

# Transform both sets
X_train = extractor.transform(train_data)
X_test = extractor.transform(test_data)
```

### Mistake 2: Overfitting to Training Data 🚫

**Signs of overfitting**:
```
Training accuracy: 99% ✅
Test accuracy: 65% ❌

Model memorized training data instead of learning patterns!
```

**Causes**:
- Model too complex (too many features, deep trees)
- Not enough training data
- Trained for too long

**Solutions**:
```python
# 1. Simplify model
RandomForestClassifier(
    max_depth=5,  # Limit tree depth (was 10)
    min_samples_split=10  # Need more samples to split (was 5)
)

# 2. Get more data
# Collect 500 more labeled examples

# 3. Use regularization
LogisticRegression(
    C=0.1  # Stronger regularization (default is 1.0)
)
```

### Mistake 3: Ignoring Class Imbalance 🚫

**Problem**:
```
Training data:
  LOW: 700 examples (70%)
  MEDIUM: 200 examples (20%)
  HIGH: 80 examples (8%)
  CRITICAL: 20 examples (2%)

Model learns: "Just predict LOW for everything!"
Accuracy: 70% (but useless!)
```

**Solution**:
```python
# Option 1: Weighted classes
RandomForestClassifier(
    class_weight='balanced'  # Give more importance to rare classes
)

# Option 2: Oversample rare classes
from imblearn.over_sampling import SMOTE

smote = SMOTE()
X_train_balanced, y_train_balanced = smote.fit_resample(X_train, y_train)

# Now all classes have similar number of examples
```

### Mistake 4: Not Checking Feature Importance 🚫

**Problem**: Model uses irrelevant features

```python
# Bad features creep in
Features used:
  - chest_pain: 0.35 (important ✅)
  - age: 0.22 (important ✅)
  - day_of_week: 0.15 (irrelevant! ❌)
  - hospital_name: 0.12 (irrelevant! ❌)

Model learns spurious patterns: "More emergencies on Mondays!"
```

**Solution**:
```python
# Check feature importance (Random Forest)
importances = rf_model.feature_importances_
feature_names = extractor.get_feature_names()

# Sort by importance
sorted_idx = np.argsort(importances)[::-1]

print("Top 10 most important features:")
for i in range(10):
    idx = sorted_idx[i]
    print(f"{feature_names[idx]}: {importances[idx]:.3f}")

# Remove irrelevant features if they appear in top 10!
```

### Mistake 5: Using Wrong Metric 🚫

**Problem**: Optimizing for accuracy when you should optimize for recall

```
Medical context:
  - Missing a CRITICAL case = very bad (patient could die)
  - False alarm CRITICAL = less bad (better safe than sorry)

→ We need HIGH RECALL for CRITICAL, not just high accuracy!
```

**Solution**:
```python
# Focus on recall for critical cases
from sklearn.metrics import recall_score

critical_recall = recall_score(
    y_test, y_pred,
    labels=[3],  # Only CRITICAL class
    average=None
)[0]

print(f"CRITICAL Recall: {critical_recall*100:.1f}%")

# If < 95%, model is not safe for production!
if critical_recall < 0.95:
    print("⚠️ WARNING: Too many CRITICAL cases missed!")
    print("   Consider:")
    print("   - Collecting more CRITICAL examples")
    print("   - Using class_weight='balanced'")
    print("   - Lowering CRITICAL threshold")
```

### Mistake 6: Forgetting to Update Models 🚫

**Problem**: Using same model forever

```
January: Model trained on winter diseases (flu, cold)
         Accuracy: 90% ✅

July: New diseases appear (heat stroke, dehydration)
      Model never saw these!
      Accuracy: 65% ❌

Model becomes stale!
```

**Solution**:
```python
# Retrain regularly
# - Every 3 months: Retrain on latest data
# - When accuracy drops >5%: Urgent retrain
# - When new disease patterns emerge: Retrain

# Track model performance over time
# (We'll cover this in Part 8: Monitoring)
```

---

## 9. Summary & Next Steps

### What You Accomplished 🎉

✅ **Understood ML algorithms**: Logistic Regression, Random Forest, XGBoost
✅ **Trained your first model**: Logistic Regression in < 1 second!
✅ **Evaluated performance**: Accuracy, precision, recall, F1-score
✅ **Compared models**: Side-by-side comparison of 3 algorithms
✅ **Chose best model**: Random Forest or XGBoost for production
✅ **Saved models**: Pickle files ready for deployment
✅ **Avoided mistakes**: Data leakage, overfitting, wrong metrics

### Key Takeaways for Beginners

**1. ML training = showing examples until computer learns patterns**
   - Like teaching a kid to recognize dogs by showing 1,000 dog photos

**2. Always split train/test**
   - Train set: Model learns from this
   - Test set: Model proves it learned (never seen before!)

**3. Different algorithms = different trade-offs**
   - Logistic Regression: Simple, fast, explainable
   - Random Forest: Balanced, good default
   - XGBoost: Most accurate, slower, complex

**4. Accuracy isn't everything**
   - For medical: Recall for CRITICAL > Overall accuracy
   - "Catch all emergencies" is more important than "be right overall"

**5. Models need maintenance**
   - Retrain every 3 months
   - Monitor performance
   - Update when accuracy drops

### Your Training Results

**Typical results for 1,000 labeled examples**:

```
Model Comparison:
┌────────────────────────┬──────────┬───────────┬────────┐
│ Model                  │ Accuracy │ CRITICAL  │ Speed  │
│                        │          │ Recall    │        │
├────────────────────────┼──────────┼───────────┼────────┤
│ Logistic Regression    │ 85-88%   │ 85-90%    │ 0.5s   │
│ Random Forest          │ 89-92%   │ 95-100%   │ 3s     │
│ XGBoost                │ 91-93%   │ 95-100%   │ 6s     │
│ Your Old Rules System  │ ~70%     │ ~80%      │ 0.1s   │
└────────────────────────┴──────────┴───────────┴────────┘

Improvement: +20% accuracy over rules! 🎉
```

### Checklist Before Moving to Phase 5

- [ ] Trained at least 2 models (Logistic Regression + Random Forest)
- [ ] Test accuracy > 85%
- [ ] CRITICAL recall > 90%
- [ ] Understand what precision/recall mean
- [ ] Saved best model to pickle file
- [ ] Can load model and make predictions on new data

### What's Next?

**Phase 5: Training & Evaluation** 📊
- Cross-validation (better evaluation method)
- Hyperparameter tuning (optimize model settings)
- Handling overfitting (model memorizes instead of learns)
- Learning curves (how much data do you really need?)
- When is your model "good enough"?

**File**: `ml-triage-part6-phase5-training-evaluation.md`

**Key question Phase 5 answers**: "How do I make my model even better?"

---

## 10. Quick Reference

### Training Workflow

```python
# 1. Load data
from api.models.triage import TriageLog
triages = TriageLog.objects.filter(ground_truth_severity__isnull=False)

# 2. Extract features
from ml.feature_extraction import TriageFeatureExtractor
extractor = TriageFeatureExtractor()
X = extractor.fit_transform(training_data)
y = labels  # Convert to integers: 0,1,2,3

# 3. Split train/test
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# 4. Train model
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# 5. Evaluate
from sklearn.metrics import accuracy_score, classification_report
y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")
print(classification_report(y_test, y_pred))

# 6. Save
import joblib
joblib.dump(model, 'model.pkl')
joblib.dump(extractor, 'extractor.pkl')
```

### Making Predictions on New Patients

```python
# Load saved model
import joblib
model = joblib.load('ml/models/triage_xgboost_v1.pkl')
extractor = joblib.load('ml/models/triage_xgboost_v1_extractor.pkl')
label_mapping = joblib.load('ml/models/triage_xgboost_v1_labels.pkl')

# New patient data
new_patient = {
    'symptoms_data': [{'symptom_name': 'chest pain', 'duration': 'hours'}],
    'urgency': 'urgent',
    'patient_age': 55,
    'medical_history': ['diabetes'],
    'severity_score': 77  # From rule-based system
}

# Extract features
features = extractor.transform([new_patient])

# Predict
prediction = model.predict(features)[0]
probabilities = model.predict_proba(features)[0]

# Convert back to label name
reverse_mapping = {v: k for k, v in label_mapping.items()}
predicted_severity = reverse_mapping[prediction]

print(f"Predicted severity: {predicted_severity}")
print(f"Confidence: {probabilities[prediction]*100:.1f}%")

# Output:
# Predicted severity: high
# Confidence: 87.3%
```

### Model Comparison Code

```python
def compare_all_models(X_train, X_test, y_train, y_test):
    """Train and compare all models."""
    
    from sklearn.linear_model import LogisticRegression
    from sklearn.ensemble import RandomForestClassifier
    from xgboost import XGBClassifier
    
    models = {
        'Logistic Regression': LogisticRegression(max_iter=1000),
        'Random Forest': RandomForestClassifier(n_estimators=100),
        'XGBoost': XGBClassifier(n_estimators=100)
    }
    
    for name, model in models.items():
        print(f"\nTraining {name}...")
        model.fit(X_train, y_train)
        
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"  Accuracy: {accuracy*100:.2f}%")
```

---

## 📚 Additional Resources

### For Learning More About ML

**Videos**:
- StatQuest: "Machine Learning Fundamentals" series (YouTube)
- 3Blue1Brown: "Neural Networks" series (YouTube)
- Coursera: "Machine Learning" by Andrew Ng

**Books**:
- "Hands-On Machine Learning" by Aurélien Géron (best for beginners!)
- "Introduction to Machine Learning with Python" by Andreas Müller

**Practice**:
- Kaggle: "Titanic" competition (beginner-friendly)
- Kaggle: "House Prices" competition
- Try different algorithms on small datasets

---

**Author**: Claude (AI Assistant)  
**Created**: 2025-11-11  
**Part**: 5 of 9  
**Status**: Complete ✅  
**Estimated Time**: 8-10 hours (learning + experimentation)  
**Prerequisite**: Part 4 - Feature Engineering

---

**Ready for Phase 5?** Head to [Part 6: Training & Evaluation](./ml-triage-part6-phase5-training-evaluation.md) to optimize your model! 🚀

**Need to review?** Go back to the [Index](./ml-triage-system-index.md) for navigation.
