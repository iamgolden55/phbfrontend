# Drug Classification Database Design

## Problem
Current keyword-based controlled substance detection is:
- ❌ Prone to false positives ("codeine-free" triggers "codeine")
- ❌ Misses drug name variants ("Co-codamol", "MST Continus")
- ❌ Not Nigerian context (missing NAFDAC schedules)
- ❌ Can't track dosage thresholds (Tramadol <50mg less regulated)

## Solution: Proper Drug Database

### Database Table: `drug_classifications`

```sql
CREATE TABLE drug_classifications (
    id UUID PRIMARY KEY,

    -- Drug Identification
    generic_name VARCHAR(200) NOT NULL,
    brand_names TEXT[], -- ['Panadol', 'Tylenol', 'Calpol']
    active_ingredients TEXT[], -- ['Paracetamol 500mg']

    -- Nigerian Regulatory Status
    nafdac_approved BOOLEAN DEFAULT false,
    nafdac_registration_number VARCHAR(50),
    nafdac_schedule VARCHAR(20), -- 'unscheduled', 'schedule_1', 'schedule_2', etc.

    -- International Classifications
    us_dea_schedule VARCHAR(20), -- 'schedule_1', 'schedule_2', etc.
    uk_controlled_drug_class VARCHAR(20), -- 'class_a', 'class_b', 'class_c'
    who_essential_medicine BOOLEAN DEFAULT false,

    -- Prescribing Requirements
    requires_special_prescription BOOLEAN DEFAULT false,
    requires_physician_only BOOLEAN DEFAULT false,
    pharmacist_can_prescribe BOOLEAN DEFAULT true,
    maximum_days_supply INTEGER, -- e.g., 30 days for controlled substances

    -- Clinical Classifications
    therapeutic_class VARCHAR(100), -- 'analgesic', 'antibiotic', 'antihypertensive'
    pharmacological_class VARCHAR(100), -- 'opioid', 'benzodiazepine', 'NSAID'

    -- Risk Flags
    is_high_risk BOOLEAN DEFAULT false,
    requires_monitoring BOOLEAN DEFAULT false,
    monitoring_type VARCHAR(100), -- 'INR', 'liver_function', 'kidney_function'
    monitoring_frequency_days INTEGER,

    -- Age Restrictions
    minimum_age INTEGER,
    maximum_age INTEGER,
    pregnancy_category VARCHAR(10), -- 'A', 'B', 'C', 'D', 'X'

    -- Drug Interactions
    major_interactions TEXT[], -- Array of drug names that interact
    contraindications TEXT[], -- Conditions where drug is contraindicated

    -- Search & Matching
    search_keywords TEXT[], -- All possible spellings/variants

    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for fast searching
CREATE INDEX idx_generic_name ON drug_classifications(generic_name);
CREATE INDEX idx_nafdac_schedule ON drug_classifications(nafdac_schedule);
CREATE INDEX idx_therapeutic_class ON drug_classifications(therapeutic_class);
CREATE INDEX idx_search_keywords ON drug_classifications USING GIN(search_keywords);
```

### Example Data Entries

#### 1. Tramadol (Controlled in Nigeria since 2018)

```python
{
    'generic_name': 'Tramadol',
    'brand_names': ['Tramal', 'Ultram', 'Contramal', 'Amadol'],
    'active_ingredients': ['Tramadol Hydrochloride'],

    'nafdac_approved': True,
    'nafdac_registration_number': 'A4-1234',
    'nafdac_schedule': 'schedule_4',  # Controlled since 2018

    'us_dea_schedule': 'schedule_4',
    'uk_controlled_drug_class': None,  # Not controlled in UK
    'who_essential_medicine': True,

    'requires_special_prescription': True,
    'requires_physician_only': True,  # Pharmacist CANNOT prescribe in Nigeria
    'pharmacist_can_prescribe': False,
    'maximum_days_supply': 30,

    'therapeutic_class': 'Analgesic',
    'pharmacological_class': 'Opioid',

    'is_high_risk': True,
    'requires_monitoring': True,
    'monitoring_type': 'addiction_risk_assessment',
    'monitoring_frequency_days': 30,

    'search_keywords': [
        'tramadol', 'tramal', 'ultram', 'contramal', 'amadol',
        'tramadol hydrochloride', 'tramadol hcl'
    ]
}
```

#### 2. Codeine (Restricted in Nigeria - Cough Syrup Abuse)

```python
{
    'generic_name': 'Codeine',
    'brand_names': ['Codeine Phosphate', 'Co-codamol', 'Panadeine'],
    'active_ingredients': ['Codeine Phosphate', 'Codeine + Paracetamol'],

    'nafdac_approved': True,
    'nafdac_schedule': 'schedule_2',

    'requires_special_prescription': True,
    'requires_physician_only': True,
    'pharmacist_can_prescribe': False,
    'maximum_days_supply': 14,

    'therapeutic_class': 'Analgesic, Antitussive',
    'pharmacological_class': 'Opioid',

    'is_high_risk': True,

    'search_keywords': [
        'codeine', 'co-codamol', 'cocodamol', 'panadeine',
        'codeine phosphate', 'codeine linctus',
        'codeine cough syrup', 'cough syrup with codeine'
    ]
}
```

#### 3. Diazepam (Benzodiazepine - Controlled)

```python
{
    'generic_name': 'Diazepam',
    'brand_names': ['Valium', 'Stesolid', 'Diazemuls'],

    'nafdac_schedule': 'schedule_3',
    'us_dea_schedule': 'schedule_4',
    'uk_controlled_drug_class': 'class_c',

    'requires_physician_only': True,
    'pharmacist_can_prescribe': False,
    'maximum_days_supply': 30,

    'therapeutic_class': 'Anxiolytic, Sedative',
    'pharmacological_class': 'Benzodiazepine',

    'is_high_risk': True,
    'requires_monitoring': True,
    'monitoring_type': 'dependence_risk_assessment',

    'contraindications': [
        'myasthenia gravis', 'sleep apnea', 'respiratory depression'
    ],

    'search_keywords': [
        'diazepam', 'valium', 'stesolid', 'diazemuls'
    ]
}
```

#### 4. Paracetamol (NOT Controlled - Safe)

```python
{
    'generic_name': 'Paracetamol',
    'brand_names': ['Panadol', 'Tylenol', 'Calpol', 'Emzor Paracetamol'],

    'nafdac_approved': True,
    'nafdac_schedule': 'unscheduled',

    'requires_physician_only': False,
    'pharmacist_can_prescribe': True,  # ✓ Pharmacist can approve
    'maximum_days_supply': 90,

    'therapeutic_class': 'Analgesic, Antipyretic',
    'pharmacological_class': 'Non-opioid analgesic',

    'is_high_risk': False,
    'requires_monitoring': False,

    'search_keywords': [
        'paracetamol', 'acetaminophen', 'panadol', 'tylenol',
        'calpol', 'emzor paracetamol'
    ]
}
```

#### 5. Warfarin (High-Risk but NOT Controlled)

```python
{
    'generic_name': 'Warfarin',
    'brand_names': ['Coumadin', 'Marevan', 'Warfarin Sodium'],

    'nafdac_schedule': 'unscheduled',  # NOT a controlled substance

    'requires_physician_only': False,
    'pharmacist_can_prescribe': True,  # For established patients
    'maximum_days_supply': 30,

    'therapeutic_class': 'Anticoagulant',
    'pharmacological_class': 'Vitamin K antagonist',

    'is_high_risk': True,  # ⚠️ High-risk but not controlled
    'requires_monitoring': True,
    'monitoring_type': 'INR',
    'monitoring_frequency_days': 30,

    'major_interactions': [
        'aspirin', 'ibuprofen', 'diclofenac',  # NSAIDs
        'amiodarone', 'antibiotics', 'antifungals'
    ],

    'contraindications': [
        'active bleeding', 'pregnancy', 'severe hypertension'
    ]
}
```

---

## Improved Triage Logic

### New function: `check_drug_classification(medication_name)`

```python
def check_drug_classification(medication_name: str) -> Dict[str, Any]:
    """
    Look up drug in classification database

    Returns:
        {
            'is_controlled': bool,
            'schedule': str,
            'requires_physician': bool,
            'pharmacist_can_prescribe': bool,
            'is_high_risk': bool,
            'requires_monitoring': bool,
            'drug_info': DrugClassification object
        }
    """
    from api.models import DrugClassification

    # Search by generic name or brand names or keywords
    drug = DrugClassification.objects.filter(
        Q(generic_name__icontains=medication_name) |
        Q(brand_names__icontains=medication_name) |
        Q(search_keywords__contains=[medication_name.lower()])
    ).first()

    if not drug:
        # Not found in database - log for review
        logger.warning(f"Drug not found in classification DB: {medication_name}")
        return {
            'is_controlled': False,  # Assume safe if unknown
            'requires_physician': False,
            'pharmacist_can_prescribe': True,
            'is_high_risk': False,
            'unknown_drug': True
        }

    is_controlled = drug.nafdac_schedule in [
        'schedule_1', 'schedule_2', 'schedule_3', 'schedule_4'
    ]

    return {
        'is_controlled': is_controlled,
        'schedule': drug.nafdac_schedule,
        'requires_physician': drug.requires_physician_only,
        'pharmacist_can_prescribe': drug.pharmacist_can_prescribe,
        'is_high_risk': drug.is_high_risk,
        'requires_monitoring': drug.requires_monitoring,
        'monitoring_type': drug.monitoring_type,
        'drug_info': drug
    }
```

### Updated triage categorization:

```python
def categorize_prescription_request(prescription_request):
    """
    Enhanced with database lookups
    """
    medications = prescription_request.medications.all()

    controlled_meds = []
    high_risk_meds = []
    specialist_required = False

    for med in medications:
        # Database lookup instead of keyword matching
        classification = check_drug_classification(med.medication_name)

        if classification['is_controlled']:
            controlled_meds.append({
                'name': med.medication_name,
                'schedule': classification['schedule'],
                'requires_physician': classification['requires_physician']
            })

        if classification['is_high_risk']:
            high_risk_meds.append(med.medication_name)

        # Check if requires specialist
        if classification.get('requires_specialist'):
            specialist_required = True

    # Prioritize by risk level
    if specialist_required:
        return ('SPECIALIST_REQUIRED', 'Contains specialist medications')

    if high_risk_meds:
        return ('HIGH_RISK', f'High-risk medications: {", ".join(high_risk_meds)}')

    if controlled_meds:
        # Check if pharmacist can handle based on their authority
        all_pharmacist_approved = all(
            not med['requires_physician']
            for med in controlled_meds
        )

        if all_pharmacist_approved:
            return ('CONTROLLED_SUBSTANCE',
                   'Controlled substances - pharmacist with authority can review')
        else:
            return ('CONTROLLED_SUBSTANCE',
                   'Controlled substances - requires physician')

    # ... rest of triage logic
```

---

## Benefits of Database Approach

### ✅ Accuracy
```
Request: "Co-codamol 30/500"
Old system: ❌ Missed (no keyword match)
New system: ✓ Detected (brand name in database)

Request: "Codeine-free cough syrup"
Old system: ❌ False positive (keyword match)
New system: ✓ Correctly identified as NOT controlled
```

### ✅ Nigerian Context
```
Tramadol in Nigeria:
- NAFDAC Schedule 4 (controlled since 2018)
- Requires physician prescription
- 30-day supply maximum
- Addiction risk monitoring required

System automatically applies Nigerian regulations ✓
```

### ✅ Detailed Information
```
When pharmacist reviews request for Warfarin:
- Shows: "High-risk anticoagulant"
- Shows: "Requires INR monitoring every 30 days"
- Shows: "Interacts with: aspirin, ibuprofen, antibiotics"
- Shows: "Last INR test: 45 days ago - OVERDUE!"

Pharmacist can make informed decision
```

### ✅ Easy Updates
```
When NAFDAC changes regulations:
1. Update one row in database
2. All future prescriptions follow new rules

Example: If Nigeria bans Codeine cough syrups completely:
UPDATE drug_classifications
SET nafdac_schedule = 'schedule_1',
    requires_physician_only = true
WHERE generic_name = 'Codeine' AND therapeutic_class LIKE '%Antitussive%';

Done! ✓
```

---

## Implementation Plan

### Phase 1: Database Setup (1 day)
1. Create `DrugClassification` model
2. Create database migration
3. Build admin interface for managing drugs

### Phase 2: Seed Data (2-3 days)
1. Import top 200 commonly prescribed drugs in Nigeria
2. Add all NAFDAC controlled substances
3. Add WHO Essential Medicines
4. Add high-risk medications (warfarin, insulin, etc.)

### Phase 3: Integration (1 day)
1. Replace keyword matching with database lookups
2. Update triage logic
3. Add drug interaction checking

### Phase 4: Ongoing (continuous)
1. Add more drugs as requests come in
2. Update when NAFDAC changes regulations
3. Import international drug databases (FDA, WHO)

---

## Data Sources

### Nigerian Sources:
1. **NAFDAC** - https://www.nafdac.gov.ng/
   - Controlled substances schedules
   - Approved drug list
   - Registration database

2. **Pharmacists Council of Nigeria (PCN)**
   - Prescribing guidelines
   - Controlled drug protocols

### International Sources:
1. **WHO Essential Medicines List** - https://www.who.int/medicines/publications/essentialmedicines/
2. **FDA Drug Database** - https://www.fda.gov/drugs/
3. **RxNorm (US National Library of Medicine)** - https://www.nlm.nih.gov/research/umls/rxnorm/
4. **British National Formulary (BNF)** - https://bnf.nice.org.uk/

---

## Quick Win: Hybrid Approach (Immediate)

While building the database, enhance current keywords:

```python
CONTROLLED_SUBSTANCES_NIGERIA = {
    # Opioids (Schedule 2)
    'morphine': {'schedule': 2, 'class': 'opioid'},
    'codeine': {'schedule': 2, 'class': 'opioid'},
    'pethidine': {'schedule': 2, 'class': 'opioid'},
    'pentazocine': {'schedule': 2, 'class': 'opioid'},

    # Tramadol (Schedule 4 - recently controlled)
    'tramadol': {'schedule': 4, 'class': 'opioid', 'year_controlled': 2018},

    # Benzodiazepines (Schedule 3)
    'diazepam': {'schedule': 3, 'class': 'benzodiazepine'},
    'lorazepam': {'schedule': 3, 'class': 'benzodiazepine'},
    'alprazolam': {'schedule': 3, 'class': 'benzodiazepine'},

    # Brand name variants
    'co-codamol': {'schedule': 2, 'class': 'opioid', 'contains': 'codeine'},
    'tramal': {'schedule': 4, 'class': 'opioid', 'generic': 'tramadol'},
    'valium': {'schedule': 3, 'class': 'benzodiazepine', 'generic': 'diazepam'},
}

def is_controlled_substance_nigeria(medication_name: str) -> bool:
    """Enhanced keyword check with exact matching"""
    med_lower = medication_name.lower()

    for keyword, info in CONTROLLED_SUBSTANCES_NIGERIA.items():
        # Exact word match (not substring)
        if keyword in med_lower.split():
            return True, info

    return False, None
```

This prevents "codeine-free" false positives while we build the database.

---

**Recommendation**: Start with hybrid approach (enhanced keywords) NOW, build proper database in parallel for future.
