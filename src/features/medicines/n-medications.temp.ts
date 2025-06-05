export const nMedications = [
  {
    id: 'nadolol',
    name: 'Nadolol',
    description: 'Non-selective beta blocker for cardiovascular conditions.',
    category: 'cardiovascular',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Nadolol',
    indications: ['Hypertension', 'Angina', 'Arrhythmias'],
    dosage: '40-320mg once daily',
    sideEffects: ['Bradycardia', 'Fatigue', 'Bronchospasm'],
    warnings: ['Avoid abrupt withdrawal', 'Caution in asthma/COPD'],
    pregnancy: 'Category C - Use if benefits outweigh risks',
    breastfeeding: 'Compatible'
  },
  {
    id: 'naloxone',
    name: 'Naloxone',
    description: 'Opioid antagonist for overdose reversal.',
    category: 'emergency',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Naloxone',
    indications: ['Opioid overdose'],
    dosage: '0.4-2mg IV/IM/IN (repeat as needed)',
    sideEffects: ['Precipitated withdrawal', 'Hypertension', 'Tachycardia'],
    warnings: ['Monitor for re-sedation', 'Short half-life may require repeat doses'],
    pregnancy: 'Category B - Compatible',
    breastfeeding: 'Compatible'
  }
];
