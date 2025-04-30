import { HealthCondition } from '../healthConditionsData';

/**
 * Health conditions starting with letters A-C
 */
export const conditionsAtoC: HealthCondition[] = [
  {
    id: 'african-trypanosomiasis',
    name: 'African Trypanosomiasis (Sleeping Sickness)',
    description: 'A parasitic disease transmitted by the tsetse fly, affecting the nervous system and causing severe neurological complications if untreated.',
    category: 'infectious-diseases',
    subcategory: 'parasitic-infections',
    symptoms: [
      'Fever',
      'Severe headaches',
      'Irritability',
      'Extreme fatigue',
      'Swollen lymph nodes',
      'Joint pain',
      'Sleep cycle disruption',
      'Confusion',
      'Difficulty concentrating',
      'Progressive drowsiness',
      'Coma in late stages'
    ],
    causes: [
      'Infection with trypanosoma parasites (T. brucei gambiense or T. brucei rhodesiense)',
      'Transmitted through the bite of infected tsetse flies',
      'Common in rural areas of sub-Saharan Africa'
    ],
    treatments: [
      'Early diagnosis through blood tests and cerebrospinal fluid examination',
      'Stage 1 (hemolymphatic): Pentamidine or Suramin',
      'Stage 2 (neurological): Melarsoprol, Eflornithine, or Nifurtimox-Eflornithine combination',
      'Hospitalization for treatment administration and monitoring',
      'Supportive care for symptoms and complications'
    ],
    preventions: [
      'Avoiding tsetse fly habitats',
      'Wearing protective clothing (long sleeves, pants)',
      'Using insect repellent',
      'Checking vehicles before entering',
      'Tsetse fly population control measures',
      'Public health surveillance in endemic areas'
    ],
    relatedConditions: ['malaria', 'leishmaniasis', 'chagas-disease'],
    commonQuestions: [
      {
        question: 'Can sleeping sickness be contracted outside of Africa?',
        answer: 'African trypanosomiasis is geographically restricted to sub-Saharan Africa where the tsetse fly vector is found. It cannot be contracted in other regions unless through very rare cases of laboratory accidents.'
      },
      {
        question: 'How quickly does sleeping sickness progress?',
        answer: 'The progression varies by parasite type. T. b. rhodesiense causes a more acute form that can progress to the neurological stage within weeks or months. T. b. gambiense causes a chronic form that may take months or years to reach the neurological stage.'
      }
    ],
    emergencySigns: [
      'Severe confusion or behavioral changes',
      'Seizures',
      'Inability to be awakened',
      'Extreme lethargy'
    ]
  },

  {
    id: 'anxiety-disorders',
    name: 'Anxiety Disorders',
    description: 'A group of mental health conditions characterized by significant feelings of anxiety, fear, or worry that interfere with daily activities.',
    category: 'mental-health',
    subcategory: 'anxiety',
    symptoms: [
      'Excessive worrying or fear',
      'Feeling agitated or on edge',
      'Restlessness or feeling keyed up',
      'Fatigue and irritability',
      'Difficulty concentrating',
      'Muscle tension',
      'Sleep problems',
      'Panic attacks (in some types)',
      'Rapid heartbeat',
      'Sweating or trembling'
    ],
    causes: [
      'Genetic factors',
      'Brain chemistry imbalances',
      'Environmental stresses',
      'Trauma or significant life events',
      'Medical conditions',
      'Substance use or withdrawal'
    ],
    treatments: [
      'Cognitive Behavioral Therapy (CBT)',
      'Exposure therapy',
      'Acceptance and Commitment Therapy (ACT)',
      'Selective Serotonin Reuptake Inhibitors (SSRIs)',
      'Serotonin-Norepinephrine Reuptake Inhibitors (SNRIs)',
      'Benzodiazepines (for short-term use)',
      'Buspirone',
      'Relaxation techniques and mindfulness',
      'Lifestyle changes'
    ],
    preventions: [
      'Stress management techniques',
      'Regular physical activity',
      'Adequate sleep',
      'Limiting caffeine and alcohol',
      'Maintaining social connections',
      'Seeking help early when symptoms first appear'
    ],
    relatedConditions: [
      'depression',
      'obsessive-compulsive-disorder',
      'post-traumatic-stress-disorder',
      'panic-disorder',
      'social-anxiety-disorder'
    ],
    commonQuestions: [
      {
        question: 'What\'s the difference between normal anxiety and an anxiety disorder?',
        answer: 'Normal anxiety is a temporary response to stress that doesn\'t interfere with daily life. An anxiety disorder involves excessive fear or worry that is difficult to control, lasts for extended periods, and significantly impacts daily functioning.'
      },
      {
        question: 'Are anxiety disorders treatable?',
        answer: 'Yes, anxiety disorders are highly treatable. Most people who receive appropriate treatment experience significant improvement in their symptoms and quality of life. Treatment typically involves therapy, medication, or a combination of both.'
      },
      {
        question: 'Can anxiety disorders develop suddenly?',
        answer: 'While some anxiety disorders may seem to appear suddenly, especially after a traumatic event, many develop gradually over time. Symptoms may worsen during periods of stress or life transitions.'
      }
    ],
    prevalence: 'Anxiety disorders are the most common mental health conditions, affecting approximately 30% of adults at some point in their lives.',
    affectedGroups: [
      'Women (more commonly diagnosed than men)',
      'Adolescents and young adults',
      'People with family history of anxiety',
      'Those who have experienced trauma',
      'People with certain medical conditions'
    ]
  },

  {
    id: 'arthritis',
    name: 'Arthritis',
    description: 'A group of conditions involving inflammation or degeneration of one or more joints, causing pain, stiffness, and reduced mobility.',
    category: 'bone-and-joint',
    symptoms: [
      'Joint pain',
      'Stiffness, especially in the morning or after inactivity',
      'Swelling in the joints',
      'Reduced range of motion',
      'Redness and warmth in the affected area',
      'Fatigue (especially with rheumatoid arthritis)',
      'Joint deformity (in advanced cases)'
    ],
    causes: [
      'Age-related wear and tear (osteoarthritis)',
      'Autoimmune responses (rheumatoid arthritis)',
      'Genetics',
      'Joint injuries',
      'Obesity and excess weight',
      'Infections',
      'Occupational hazards'
    ],
    treatments: [
      'Pain relievers (acetaminophen, NSAIDs)',
      'Anti-inflammatory medications',
      'Disease-modifying antirheumatic drugs (DMARDs)',
      'Biologics',
      'Corticosteroid injections',
      'Physical therapy',
      'Occupational therapy',
      'Joint replacement surgery',
      'Assistive devices (braces, canes)'
    ],
    preventions: [
      'Maintain a healthy weight',
      'Regular low-impact exercise',
      'Protect joints during activities',
      'Good posture and ergonomics',
      'Balanced diet rich in anti-inflammatory foods',
      'Avoiding smoking'
    ],
    relatedConditions: [
      'osteoarthritis',
      'rheumatoid-arthritis',
      'gout',
      'psoriatic-arthritis',
      'lupus',
      'fibromyalgia'
    ],
    commonQuestions: [
      {
        question: 'What\'s the difference between osteoarthritis and rheumatoid arthritis?',
        answer: 'Osteoarthritis is primarily a degenerative joint disease caused by wear and tear on the joints over time. Rheumatoid arthritis is an autoimmune condition where the body\'s immune system mistakenly attacks the joint lining, causing inflammation and damage.'
      },
      {
        question: 'Can weather affect arthritis symptoms?',
        answer: 'Many people with arthritis report that changes in weather, particularly cold or damp conditions, can worsen their symptoms. While research is mixed, barometric pressure changes may affect joint pressure and pain levels.'
      },
      {
        question: 'Is arthritis only an elderly person\'s disease?',
        answer: 'No, arthritis can affect people of all ages, including children. While osteoarthritis is more common in older adults, rheumatoid arthritis and other forms can develop at any age. Juvenile arthritis specifically affects children under 16.'
      }
    ],
    prevalence: 'Arthritis affects over 54 million adults in the United States, making it one of the leading causes of disability.',
    affectedGroups: [
      'Older adults (especially for osteoarthritis)',
      'Women (especially for rheumatoid arthritis)',
      'People with family history of arthritis',
      'Those with previous joint injuries',
      'People who are overweight or obese',
      'Individuals with certain occupations involving repetitive joint stress'
    ]
  },

  {
    id: 'atrial-fibrillation',
    name: 'Atrial Fibrillation',
    description: 'An irregular and often rapid heart rhythm that can increase the risk of strokes, heart failure, and other heart-related complications.',
    category: 'heart-and-circulation',
    symptoms: [
      'Palpitations (sensations of a racing, uncomfortable, irregular heartbeat)',
      'Weakness',
      'Fatigue',
      'Lightheadedness',
      'Dizziness',
      'Shortness of breath',
      'Chest pain or discomfort'
    ],
    causes: [
      'Abnormalities or damage to the heart\'s structure',
      'High blood pressure',
      'Heart attacks',
      'Coronary artery disease',
      'Congenital heart defects',
      'Overactive thyroid gland',
      'Sleep apnea',
      'Viral infections',
      'Stress',
      'Alcohol or stimulant use'
    ],
    treatments: [
      'Medications to control heart rate (beta blockers, calcium channel blockers)',
      'Medications to control heart rhythm (antiarrhythmics)',
      'Blood thinners to prevent clots and strokes',
      'Electrical cardioversion',
      'Catheter ablation',
      'Maze procedure surgery',
      'Pacemaker implantation',
      'Left atrial appendage closure'
    ],
    preventions: [
      'Heart-healthy lifestyle',
      'Regular physical activity',
      'Healthy diet low in salt and solid fats',
      'Avoiding excessive alcohol and caffeine',
      'Not smoking',
      'Maintaining a healthy weight',
      'Managing stress',
      'Treating underlying conditions like sleep apnea'
    ],
    relatedConditions: [
      'heart-failure',
      'stroke',
      'coronary-artery-disease',
      'heart-attack',
      'hypertension',
      'valve-disease'
    ],
    commonQuestions: [
      {
        question: 'Is atrial fibrillation life-threatening?',
        answer: 'While atrial fibrillation itself is not usually immediately life-threatening, it significantly increases the risk of stroke and can lead to heart failure over time if not properly managed. The blood clots that may form due to the irregular heartbeat can cause strokes if they travel to the brain.'
      },
      {
        question: 'Can atrial fibrillation go away on its own?',
        answer: 'Some people experience paroxysmal atrial fibrillation, which can come and go, with episodes that stop on their own. However, atrial fibrillation often progresses and becomes more persistent over time, requiring treatment to manage symptoms and prevent complications.'
      },
      {
        question: 'How can I tell if I\'m having an atrial fibrillation episode?',
        answer: 'Many people describe feeling a fluttering or thumping in the chest, irregular heartbeat, or heart palpitations. Others may feel fatigue, shortness of breath, weakness, dizziness, or chest discomfort. Some people have no symptoms and discover they have AFib during a routine medical examination.'
      }
    ],
    emergencySigns: [
      'Severe chest pain',
      'Severe shortness of breath',
      'Fainting or severe dizziness',
      'Sudden weakness or numbness in the face, arm, or leg (signs of a stroke)'
    ],
    prevalence: 'Atrial fibrillation affects an estimated 2.7 to 6.1 million people in the United States, with the prevalence increasing with age.',
    affectedGroups: [
      'Older adults (risk increases with age)',
      'People with heart disease or high blood pressure',
      'Those with family history of AFib',
      'People who are overweight or obese',
      'Heavy alcohol users',
      'Athletes (can develop in some high-performance athletes)'
    ]
  },

  {
    id: 'bronchitis',
    name: 'Bronchitis',
    description: 'An inflammation of the lining of the bronchial tubes, which carry air to and from the lungs, usually resulting in coughing, mucus production, and sometimes difficulty breathing.',
    category: 'respiratory',
    symptoms: [
      'Persistent cough, often with mucus',
      'Shortness of breath',
      'Wheezing',
      'Chest discomfort or tightness',
      'Low fever and chills',
      'Fatigue'
    ],
    causes: [
      'Viral infections (most common cause of acute bronchitis)',
      'Bacterial infections',
      'Exposure to irritants such as tobacco smoke, air pollution, or dust',
      'Workplace exposure to certain chemicals or fumes',
      'Gastroesophageal reflux disease (GERD)'
    ],
    treatments: [
      'Rest and plenty of fluids',
      'Over-the-counter pain relievers to reduce fever and discomfort',
      'Cough medicine (if cough interferes with sleep)',
      'Antibiotics (only if bacterial infection is present)',
      'Inhalers and other bronchodilators (to open airways)',
      'Pulmonary rehabilitation (for chronic bronchitis)',
      'Oxygen therapy (in severe cases)'
    ],
    preventions: [
      'Avoid smoking and secondhand smoke',
      'Vaccination against flu and pneumonia',
      'Frequent handwashing, especially during cold and flu season',
      'Use of masks in polluted environments',
      'Maintaining good overall health with diet and exercise'
    ],
    relatedConditions: [
      'asthma',
      'pneumonia',
      'copd',
      'emphysema',
      'sinusitis'
    ],
    commonQuestions: [
      {
        question: 'What is the difference between acute and chronic bronchitis?',
        answer: 'Acute bronchitis typically lasts less than three weeks and is often due to a viral infection. Chronic bronchitis is defined as a productive cough that lasts for three months or more per year for at least two consecutive years, and is often part of chronic obstructive pulmonary disease (COPD).'
      },
      {
        question: 'When should I see a doctor for bronchitis?',
        answer: 'You should see a doctor if you have a cough that lasts more than three weeks, prevents you from sleeping, is accompanied by fever higher than 100.4°F (38°C), produces discolored or bloody mucus, or is accompanied by wheezing or shortness of breath.'
      },
      {
        question: 'Is bronchitis contagious?',
        answer: 'Acute bronchitis caused by a virus or bacteria can be contagious and spread through coughs, sneezes, or touching contaminated surfaces. Chronic bronchitis is not contagious as it\'s typically caused by long-term exposure to irritants that damage the lungs.'
      }
    ],
    emergencySigns: [
      'Severe difficulty breathing',
      'High fever above 100.4°F (38°C) with shaking chills',
      'Coughing up blood',
      'Bluish discoloration of lips or fingernails'
    ],
    prevalence: 'Acute bronchitis is one of the most common conditions treated by primary care physicians, with millions of cases annually. Chronic bronchitis affects approximately 9 million Americans.',
    affectedGroups: [
      'Smokers',
      'People with weakened immune systems',
      'The elderly and very young children',
      'Those with respiratory conditions like asthma',
      'People regularly exposed to air pollutants or chemical fumes'
    ]
  },

  {
    id: 'buruli-ulcer',
    name: 'Buruli Ulcer',
    description: 'A chronic debilitating skin infection caused by Mycobacterium ulcerans, characterized by large skin ulcers typically on the limbs.',
    category: 'infectious-diseases',
    subcategory: 'bacterial-infections',
    symptoms: [
      'Painless nodules under the skin (initial stage)',
      'Firm, non-tender plaque',
      'Large, undermined skin ulcers with necrotic base',
      'Destruction of skin and soft tissue',
      'Possible bone involvement in advanced cases',
      'Limited mobility if ulcers affect joints'
    ],
    causes: [
      'Infection with Mycobacterium ulcerans bacteria',
      'Transmission methods not fully understood (possibly through water, soil, or insect vectors)',
      'Common in tropical and subtropical regions, especially near wetlands and slow-moving water'
    ],
    treatments: [
      'Combination antibiotic therapy (rifampicin and clarithromycin for 8 weeks)',
      'Wound care and dressings',
      'Surgery to remove necrotic tissue',
      'Skin grafting for large wounds',
      'Physical therapy to prevent disability',
      'Rehabilitation for affected limbs'
    ],
    preventions: [
      'Early detection and prompt treatment',
      'Avoiding contact with contaminated water sources in endemic areas',
      'Proper wound care to prevent secondary infections',
      'Public health education in endemic communities',
      'BCG vaccination may provide limited protection'
    ],
    relatedConditions: ['tuberculosis', 'leprosy'],
    commonQuestions: [
      {
        question: 'Is Buruli ulcer contagious from person to person?',
        answer: 'Buruli ulcer is not believed to be transmitted directly from person to person. Most evidence suggests it is acquired from the environment, particularly in areas near wetlands or slow-moving water bodies.'
      },
      {
        question: 'What is the long-term outlook for people with Buruli ulcer?',
        answer: 'With early diagnosis and appropriate antibiotic treatment, most cases heal with minimal scarring and disability. However, delayed diagnosis can lead to extensive tissue damage, requiring surgery and potentially resulting in permanent disfigurement and disability.'
      }
    ]
  },

  {
    id: 'cancers',
    name: 'Cancers',
    description: 'A group of diseases characterized by the uncontrolled growth and spread of abnormal cells that can invade nearby tissues and spread to other parts of the body.',
    category: 'cancer',
    symptoms: [
      'Unexplained weight loss',
      'Fatigue',
      'Pain',
      'Skin changes',
      'Change in bowel or bladder habits',
      'Unusual bleeding or discharge',
      'Thickening or lump in breast or elsewhere',
      'Indigestion or difficulty swallowing',
      'Recent change in a wart or mole',
      'Persistent cough or hoarseness'
    ],
    causes: [
      'Genetic mutations (inherited or acquired)',
      'Tobacco use',
      'Excessive alcohol consumption',
      'UV radiation exposure',
      'Certain infectious agents (HPV, Hepatitis B and C, H. pylori)',
      'Exposure to carcinogens (asbestos, benzene, etc.)',
      'Chronic inflammation',
      'Hormonal factors',
      'Diet and physical inactivity',
      'Obesity'
    ],
    treatments: [
      'Surgery to remove cancerous tissue',
      'Radiation therapy to kill cancer cells',
      'Chemotherapy to kill rapidly dividing cells',
      'Immunotherapy to help the immune system fight cancer',
      'Targeted therapy to attack specific cancer cell features',
      'Hormone therapy for hormone-sensitive cancers',
      'Stem cell transplant for certain blood cancers',
      'Precision medicine based on genetic profile',
      'Palliative care for symptom management'
    ],
    preventions: [
      'Avoiding tobacco',
      'Limiting alcohol consumption',
      'Maintaining a healthy weight',
      'Regular physical activity',
      'Healthy diet rich in fruits and vegetables',
      'Sun protection',
      'Vaccinations against cancer-causing infections (HPV, Hepatitis B)',
      'Regular screening tests (mammograms, colonoscopies, Pap tests)',
      'Avoiding exposure to environmental carcinogens',
      'Genetic counseling for those with family history'
    ],
    relatedConditions: ['benign-tumors', 'precancerous-conditions', 'metastatic-disease'],
    commonQuestions: [
      {
        question: 'Are all cancers hereditary?',
        answer: 'No, most cancers are not hereditary. Only about 5-10% of cancers are directly linked to inherited genetic mutations. The majority of cancers develop from mutations acquired during a person\'s lifetime due to environmental factors and lifestyle choices.'
      },
      {
        question: 'Can cancer be cured?',
        answer: 'Many cancers can be effectively treated and even cured, especially when detected early. Treatment success depends on the type of cancer, its stage at diagnosis, and individual factors. Some cancers have high cure rates, while others remain challenging to treat.'
      }
    ],
    emergencySigns: [
      'Severe unexplained pain',
      'Difficulty breathing',
      'Unusual bleeding that doesn\'t stop',
      'Large changes in a mole',
      'Seizures or changes in consciousness in those with known or suspected brain tumors'
    ]
  },

  {
    id: 'cardiovascular-diseases',
    name: 'Cardiovascular Diseases',
    description: 'A class of diseases that involve the heart or blood vessels, including coronary artery disease, heart failure, arrhythmias, valve disorders, and congenital heart defects.',
    category: 'heart-and-circulation',
    symptoms: [
      'Chest pain or discomfort (angina)',
      'Shortness of breath',
      'Pain, numbness, or coldness in legs or arms',
      'Irregular heartbeat or palpitations',
      'Dizziness or lightheadedness',
      'Fatigue',
      'Swelling in legs, ankles, or feet',
      'Rapid or racing heartbeat',
      'Fainting or near-fainting spells'
    ],
    causes: [
      'High blood pressure',
      'High cholesterol and triglycerides',
      'Smoking',
      'Diabetes',
      'Obesity',
      'Physical inactivity',
      'Unhealthy diet',
      'Family history and genetic factors',
      'Age (risk increases with age)',
      'Stress',
      'Poor sleep',
      'Alcohol or drug abuse'
    ],
    treatments: [
      'Lifestyle modifications',
      'Medications (statins, beta-blockers, ACE inhibitors, anticoagulants, etc.)',
      'Angioplasty and stent placement',
      'Coronary artery bypass surgery',
      'Valve repair or replacement',
      'Pacemakers and implantable cardioverter-defibrillators',
      'Heart transplantation',
      'Cardiac rehabilitation programs',
      'Management of underlying conditions like diabetes and hypertension'
    ],
    preventions: [
      'Regular physical activity',
      'Heart-healthy diet',
      'Maintaining healthy weight',
      'Not smoking or quitting smoking',
      'Limiting alcohol consumption',
      'Managing stress',
      'Regular health screenings',
      'Controlling blood pressure',
      'Managing cholesterol levels',
      'Controlling blood sugar if diabetic'
    ],
    relatedConditions: ['hypertension', 'coronary-artery-disease', 'heart-failure', 'stroke', 'peripheral-artery-disease'],
    commonQuestions: [
      {
        question: 'What is the difference between a heart attack and cardiac arrest?',
        answer: 'A heart attack occurs when blood flow to part of the heart is blocked, causing damage to heart muscle. Cardiac arrest occurs when the heart suddenly stops beating, causing loss of consciousness and no pulse. A heart attack can lead to cardiac arrest, but they are different conditions requiring different emergency responses.'
      },
      {
        question: 'Can cardiovascular disease be reversed?',
        answer: 'Some cardiovascular conditions can be improved or partially reversed through lifestyle changes, medications, and medical procedures. For example, coronary artery disease may be improved through lifestyle changes, statins, and procedures like angioplasty. However, complete reversal is not always possible for all types of cardiovascular disease.'
      }
    ],
    emergencySigns: [
      'Chest pain, pressure, or squeezing sensation',
      'Pain radiating to arm, jaw, neck, or back',
      'Sudden severe shortness of breath',
      'Sudden weakness, numbness, or paralysis in face, arm, or leg (signs of stroke)',
      'Sudden severe headache',
      'Fainting or loss of consciousness'
    ]
  },

  {
    id: 'cholera',
    name: 'Cholera',
    description: 'An acute diarrheal infection caused by ingestion of food or water contaminated with the bacterium Vibrio cholerae, which can lead to severe dehydration and death if untreated.',
    category: 'infectious-diseases',
    subcategory: 'bacterial-infections',
    symptoms: [
      'Profuse watery diarrhea ("rice water stools")',
      'Vomiting',
      'Leg cramps',
      'Rapid dehydration',
      'Low blood pressure',
      'Dry mouth and skin',
      'Irregular heartbeat',
      'Shock',
      'Little or no urine output',
      'Weakness and fatigue'
    ],
    causes: [
      'Infection with Vibrio cholerae bacteria',
      'Consuming contaminated food or water',
      'Poor sanitation and inadequate clean water supply',
      'Living in crowded conditions with poor hygiene',
      'Raw or undercooked seafood from contaminated waters'
    ],
    treatments: [
      'Prompt rehydration (oral rehydration solution)',
      'Intravenous fluids for severe cases',
      'Antibiotics to shorten duration (doxycycline, azithromycin, ciprofloxacin)',
      'Zinc supplements for children',
      'Management of complications'
    ],
    preventions: [
      'Safe drinking water (boiled, treated, or bottled)',
      'Proper food preparation and storage',
      'Thorough hand washing with soap',
      'Proper sanitation and waste disposal',
      'Cholera vaccines for high-risk populations',
      'Improved water and sanitation infrastructure',
      'Public health education in endemic areas'
    ],
    relatedConditions: ['dysentery', 'typhoid-fever', 'enterotoxigenic-e-coli-infection'],
    commonQuestions: [
      {
        question: 'How quickly can cholera kill if untreated?',
        answer: 'Cholera can cause death within hours if left untreated. The rapid loss of fluids and electrolytes through severe diarrhea and vomiting can lead to dehydration, shock, and death in as little as 2-3 hours in the most severe cases, particularly in vulnerable populations like children and the elderly.'
      },
      {
        question: 'Is cholera still common in the modern world?',
        answer: 'Yes, cholera remains a significant public health problem in many parts of the developing world, particularly in areas with inadequate sanitation and water treatment infrastructure. Major outbreaks still occur, especially following natural disasters, conflicts, or in refugee camps where water and sanitation systems are compromised.'
      }
    ],
    emergencySigns: [
      'Severe dehydration (sunken eyes, dry mouth, extreme thirst, little or no urination)',
      'Lethargy or unconsciousness',
      'Seizures',
      'Severe muscle cramps',
      'Shock (rapid pulse, low blood pressure)'
    ]
  },

  {
    id: 'chronic-respiratory-diseases',
    name: 'Chronic Respiratory Diseases',
    description: 'A group of chronic diseases affecting the airways and other structures of the lungs, including asthma, chronic obstructive pulmonary disease (COPD), pulmonary hypertension, and occupational lung diseases.',
    category: 'respiratory',
    symptoms: [
      'Shortness of breath (dyspnea)',
      'Chronic cough',
      'Wheezing',
      'Chest tightness',
      'Excess mucus production',
      'Fatigue',
      'Reduced exercise tolerance',
      'Recurrent respiratory infections',
      'Cyanosis (bluish discoloration of lips or skin) in severe cases'
    ],
    causes: [
      'Tobacco smoke (active and passive smoking)',
      'Air pollution (outdoor and indoor)',
      'Occupational dusts and chemicals',
      'Frequent lower respiratory infections during childhood',
      'Genetic factors',
      'Allergies and hypersensitivity',
      'Premature birth affecting lung development'
    ],
    treatments: [
      'Bronchodilators to relax airway muscles',
      'Inhaled corticosteroids to reduce inflammation',
      'Long-term oxygen therapy for advanced cases',
      'Pulmonary rehabilitation programs',
      'Smoking cessation support',
      'Vaccination against influenza and pneumococcal disease',
      'Management of comorbidities',
      'Lung transplantation for end-stage disease',
      'Lifestyle modifications'
    ],
    preventions: [
      'Avoiding tobacco smoke',
      'Reducing exposure to air pollution',
      'Using protective equipment in hazardous work environments',
      'Early detection and management of respiratory symptoms',
      'Maintaining good indoor air quality',
      'Regular exercise',
      'Healthy diet',
      'Prevention of respiratory infections'
    ],
    relatedConditions: ['asthma', 'copd', 'bronchiectasis', 'pulmonary-fibrosis', 'pulmonary-hypertension'],
    commonQuestions: [
      {
        question: 'Can chronic respiratory diseases be cured?',
        answer: 'Most chronic respiratory diseases cannot be completely cured, but they can be effectively managed with proper treatment. The goal of treatment is to control symptoms, prevent exacerbations, slow disease progression, and improve quality of life. Early diagnosis and intervention generally lead to better outcomes.'
      },
      {
        question: 'How does air pollution affect respiratory diseases?',
        answer: 'Air pollution can trigger symptoms and exacerbations in people with existing respiratory diseases and contribute to the development of new cases. Pollutants can cause inflammation in the airways, reduce lung function, and increase susceptibility to infections. Long-term exposure is associated with reduced lung growth in children and accelerated lung function decline in adults.'
      }
    ],
    emergencySigns: [
      'Severe breathlessness that doesn\'t improve with medication',
      'Inability to speak in full sentences due to breathlessness',
      'Bluish coloration of lips or face',
      'Altered mental status or confusion',
      'Rapid breathing with severe chest pain'
    ]
  },

  {
    id: 'chronic-venous-insufficiency',
    name: 'Chronic Venous Insufficiency',
    description: 'A condition where the veins in the legs cannot efficiently return blood to the heart, causing blood to pool in the legs and leading to various complications.',
    category: 'heart-and-circulation',
    subcategory: 'vascular-disorders',
    symptoms: [
      'Leg swelling, especially after prolonged standing',
      'Aching or heaviness in legs',
      'Leg pain that worsens when standing',
      'Varicose veins',
      'Leathery-looking skin on the legs',
      'Flaking or itching skin on the legs',
      'Leg ulcers, especially near the ankles',
      'Hardening of the skin on the legs',
      'Brown discoloration around the ankles'
    ],
    causes: [
      'Damaged or weakened vein valves',
      'Past blood clots (deep vein thrombosis)',
      'Phlebitis (vein inflammation)',
      'Family history of venous problems',
      'Prolonged sitting or standing',
      'Obesity',
      'Pregnancy',
      'Age-related changes in veins',
      'Smoking'
    ],
    treatments: [
      'Compression stockings',
      'Regular exercise',
      'Leg elevation',
      'Weight management',
      'Medications to improve blood flow',
      'Endovenous thermal ablation',
      'Sclerotherapy',
      'Vein stripping (in severe cases)',
      'Wound care for venous ulcers',
      'Skin grafting for persistent ulcers'
    ],
    preventions: [
      'Regular physical activity',
      'Maintaining a healthy weight',
      'Avoiding prolonged standing or sitting',
      'Regular leg elevation',
      'Wearing compression stockings',
      'Avoiding tight clothing that restricts blood flow',
      'Quitting smoking'
    ],
    relatedConditions: ['varicose-veins', 'deep-vein-thrombosis', 'venous-stasis-ulcers', 'lymphedema'],
    commonQuestions: [
      {
        question: 'Is chronic venous insufficiency reversible?',
        answer: 'Chronic venous insufficiency is generally not completely reversible, but its progression can be slowed and symptoms can be effectively managed with appropriate treatment. Early intervention tends to yield better outcomes in preventing complications like venous ulcers.'
      },
      {
        question: 'How effective are compression stockings for chronic venous insufficiency?',
        answer: 'Compression stockings are considered a cornerstone of treatment for chronic venous insufficiency. They help improve blood flow by applying graduated pressure to the legs, reducing swelling and discomfort. Studies show they can significantly reduce symptoms and help prevent complications when worn consistently.'
      }
    ]
  },

  {
    id: 'coronary-artery-disease',
    name: 'Coronary Artery Disease',
    description: 'A condition in which the major blood vessels that supply the heart with blood, oxygen, and nutrients (coronary arteries) become damaged or diseased, often due to buildup of cholesterol-containing deposits (plaque).',
    category: 'heart-and-circulation',
    symptoms: [
      'Chest pain or discomfort (angina)',
      'Shortness of breath',
      'Pain or discomfort in the arms, neck, jaw, shoulder, or back',
      'Fatigue',
      'Nausea',
      'Lightheadedness',
      'Cold sweats'
    ],
    causes: [
      'Atherosclerosis (buildup of plaque in arteries)',
      'High blood pressure',
      'High cholesterol',
      'Diabetes',
      'Smoking',
      'Lack of physical activity',
      'Obesity',
      'Family history',
      'Age'
    ],
    treatments: [
      'Lifestyle changes (diet, exercise, smoking cessation)',
      'Medications (aspirin, statins, beta-blockers, ACE inhibitors)',
      'Angioplasty and stent placement',
      'Coronary artery bypass surgery',
      'Cardiac rehabilitation',
      'Management of underlying conditions'
    ],
    preventions: [
      'Heart-healthy diet (Mediterranean or DASH diet)',
      'Regular exercise',
      'Maintaining healthy weight',
      'Not smoking',
      'Managing stress',
      'Controlling blood pressure, cholesterol, and diabetes',
      'Limiting alcohol consumption'
    ],
    relatedConditions: [
      'heart-attack',
      'heart-failure',
      'arrhythmias',
      'peripheral-artery-disease',
      'stroke',
      'hypertension'
    ],
    commonQuestions: [
      {
        question: 'What is the difference between coronary artery disease and a heart attack?',
        answer: 'Coronary artery disease (CAD) is the underlying condition where coronary arteries become narrowed or blocked by plaque buildup. A heart attack (myocardial infarction) occurs when blood flow to a part of the heart is completely blocked, causing heart muscle damage. Heart attacks are often a result of advanced coronary artery disease.'
      },
      {
        question: 'Can coronary artery disease be reversed?',
        answer: 'While coronary artery disease cannot be completely cured, its progression can be slowed or even partially reversed in some cases through intensive lifestyle changes, medication, and medical procedures. Studies have shown that significant diet changes, exercise, stress management, and smoking cessation can help reduce plaque buildup over time.'
      },
      {
        question: 'What tests are used to diagnose coronary artery disease?',
        answer: 'Diagnostic tests may include electrocardiogram (ECG), stress tests, echocardiogram, nuclear cardiac stress test, cardiac CT scan, cardiac MRI, and coronary angiogram (cardiac catheterization). The specific tests recommended depend on your symptoms, risk factors, and medical history.'
      }
    ],
    emergencySigns: [
      'Chest pain or discomfort lasting more than a few minutes or that comes and goes',
      'Shortness of breath with or without chest discomfort',
      'Pain or discomfort in one or both arms, the back, neck, jaw, or stomach',
      'Cold sweat, nausea, or lightheadedness'
    ],
    prevalence: 'Coronary artery disease is the most common type of heart disease in the United States, affecting approximately 20.1 million adults aged 20 and over.',
    affectedGroups: [
      'Older adults (risk increases with age)',
      'Men (though risk for women increases after menopause)',
      'People with family history of heart disease',
      'Those with unhealthy lifestyle habits',
      'People with conditions like diabetes, high blood pressure, or high cholesterol',
      'Certain ethnic groups (higher rates in South Asians, African Americans)'
    ]
  }
];

export default conditionsAtoC;
