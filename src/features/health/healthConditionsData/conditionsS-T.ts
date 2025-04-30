import { HealthCondition } from '../healthConditionsData';

/**
 * Health conditions starting with letters S-T
 */
export const conditionsStoT: HealthCondition[] = [
  {
    id: 'sleep-apnea',
    name: 'Sleep Apnea',
    description: 'A serious sleep disorder where breathing repeatedly stops and starts during sleep, leading to decreased oxygen levels and disrupted rest.',
    category: 'respiratory',
    subcategory: 'sleep-disorders',
    symptoms: [
      'Loud snoring',
      'Episodes of stopped breathing during sleep (observed by another person)',
      'Gasping for air during sleep',
      'Awakening with a dry mouth',
      'Morning headache',
      'Difficulty staying asleep (insomnia)',
      'Excessive daytime sleepiness (hypersomnia)',
      'Difficulty paying attention while awake',
      'Irritability',
      'Night sweats'
    ],
    causes: [
      'Obstructive sleep apnea: physical blockage of airway',
      'Central sleep apnea: brain fails to signal breathing muscles',
      'Complex sleep apnea: combination of both types',
      'Obesity and excess weight',
      'Large tonsils or adenoids (especially in children)',
      'Endocrine disorders (hypothyroidism, acromegaly)',
      'Neuromuscular disorders',
      'Heart or kidney failure',
      'Genetic predisposition',
      'Smoking and alcohol use'
    ],
    treatments: [
      'Lifestyle changes (weight loss, exercise, smoking cessation)',
      'Continuous positive airway pressure (CPAP) therapy',
      'Bilevel positive airway pressure (BiPAP) therapy',
      'Oral appliances to keep throat open',
      'Adaptive servo-ventilation (ASV)',
      'Supplemental oxygen',
      'Surgery to remove tissue or reposition jaw',
      'Implanted stimulation devices',
      'Treatment of underlying medical problems',
      'Positional therapy (avoiding sleeping on back)'
    ],
    preventions: [
      'Maintaining healthy weight',
      'Regular exercise',
      'Avoiding alcohol and sedatives before bedtime',
      'Quitting smoking',
      'Sleeping on side rather than back',
      'Treating nasal allergies',
      'Following a regular sleep schedule',
      'Using properly fitted oral devices if recommended'
    ],
    relatedConditions: [
      'obesity',
      'hypertension',
      'heart-disease',
      'type-2-diabetes',
      'stroke',
      'metabolic-syndrome',
      'depression',
      'adhd-like-symptoms'
    ],
    commonQuestions: [
      {
        question: 'How is sleep apnea diagnosed?',
        answer: 'Sleep apnea is typically diagnosed through a sleep study (polysomnography), which can be conducted in a sleep lab or at home with portable monitoring devices. During the study, various bodily functions are monitored including brain activity, eye movement, heart rate, breathing patterns, blood oxygen levels, and body movements. The test measures the number of apnea events (complete breathing pauses) and hypopnea events (partial breathing pauses), resulting in an apnea-hypopnea index (AHI) that determines the severity of the condition.'
      },
      {
        question: 'Is CPAP the only treatment for sleep apnea?',
        answer: 'While CPAP (Continuous Positive Airway Pressure) therapy is the most common and effective treatment for moderate to severe sleep apnea, it\'s not the only option. Alternatives include oral appliances that reposition the jaw and tongue, positional therapy devices, various surgical procedures, implanted upper airway stimulation devices, and lifestyle changes like weight loss and exercise. For mild cases, behavioral changes alone might be sufficient. The best treatment depends on the type and severity of sleep apnea, individual anatomy, other medical conditions, and personal preference.'
      },
      {
        question: 'Can children have sleep apnea?',
        answer: 'Yes, children can have sleep apnea, with an estimated prevalence of 1-5% in the pediatric population. In children, the most common cause is enlarged tonsils and adenoids, rather than obesity (though childhood obesity can also contribute). Symptoms in children may differ from adults and include attention problems, behavioral issues, poor school performance, mouth breathing, bedwetting, excessive sweating at night, and unusual sleeping positions. Treatment often involves surgical removal of tonsils and adenoids, though other approaches may be needed depending on the cause.'
      }
    ],
    emergencySigns: [
      'Severe shortness of breath or choking episodes during sleep',
      'Significant and sudden increase in daytime sleepiness affecting safety',
      'Falling asleep while driving or operating machinery',
      'Chest pain or irregular heartbeat during sleep episodes',
      'Severe morning headaches with confusion',
      'Noticeable cognitive decline or personality changes'
    ],
    prevalence: 'Sleep apnea affects approximately 936 million adults worldwide aged 30-69 (nearly 1 billion people). In the United States, about 25 million adults have obstructive sleep apnea.',
    affectedGroups: [
      'Middle-aged and older adults',
      'Men (2-3 times more common than in women, though women\'s risk increases after menopause)',
      'People who are overweight or obese',
      'Individuals with large neck circumference',
      'Those with family history of sleep apnea',
      'People with certain medical conditions (hypertension, type 2 diabetes)',
      'Smokers',
      'People who use alcohol, sedatives, or tranquilizers'
    ]
  },
  {
    id: 'schistosomiasis',
    name: 'Schistosomiasis',
    description: 'A parasitic disease caused by blood flukes (trematode worms) of the genus Schistosoma, transmitted through contact with freshwater contaminated with the parasites, leading to chronic illness.',
    category: 'infectious-diseases',
    subcategory: 'parasitic-infections',
    symptoms: [
      'Acute phase (Katayama fever): Fever, chills, cough, and muscle aches',
      'Skin rash or itchy skin',
      'Abdominal pain',
      'Bloody diarrhea or blood in stool',
      'Bloody urine (in urinary schistosomiasis)',
      'Pain during urination',
      'Enlarged liver or spleen',
      'Chronic fatigue',
      'Growth and cognitive impairments in children',
      'Genital lesions and vaginal bleeding (genital schistosomiasis)'
    ],
    causes: [
      'Infection with Schistosoma parasites (S. mansoni, S. haematobium, S. japonicum, etc.)',
      'Transmission through skin contact with contaminated freshwater',
      'Parasite larvae (cercariae) released from infected freshwater snails',
      'Most common in tropical and subtropical areas with inadequate sanitation',
      'Adult worms live in blood vessels and release eggs that damage organs'
    ],
    treatments: [
      'Praziquantel (drug of choice, kills adult worms)',
      'Repeated treatment may be needed in heavily endemic areas',
      'Management of complications (including surgery in severe cases)',
      'Supportive care for symptoms',
      'Iron supplementation for anemia',
      'Mass drug administration in high-prevalence communities'
    ],
    preventions: [
      'Avoiding wading, swimming, or bathing in freshwater in endemic areas',
      'Improved sanitation and access to clean water',
      'Snail control in water bodies',
      'Health education about transmission and prevention',
      'Treating infected people to reduce environmental contamination',
      'Filtering or treating potentially contaminated water'
    ],
    relatedConditions: ['chronic-liver-disease', 'bladder-cancer', 'chronic-kidney-disease', 'pulmonary-hypertension'],
    commonQuestions: [
      {
        question: 'How long can schistosomiasis parasites live in the body?',
        answer: 'Adult schistosomes can live in the human body for an average of 3-10 years, but some may survive for up to 40 years. During this time, female worms produce hundreds to thousands of eggs daily, which cause most of the health problems associated with the disease. Even after the worms die naturally, the damage they\'ve caused to organs may persist and continue to cause symptoms.'
      },
      {
        question: 'Is schistosomiasis contagious from person to person?',
        answer: 'No, schistosomiasis cannot be transmitted directly from person to person. The parasite requires both a specific type of freshwater snail (intermediate host) and human (definitive host) to complete its life cycle. Infection occurs when people contact water containing infectious cercariae that have been released from infected snails. The parasite cannot complete its life cycle in chlorinated swimming pools or properly treated water.'
      }
    ],
    prevalence: 'Schistosomiasis affects over 240 million people worldwide, with more than 700 million people living in endemic areas at risk of infection. It is particularly prevalent in sub-Saharan Africa, which accounts for more than 90% of cases.',
    affectedGroups: [
      'School-aged children in endemic areas',
      'Farmers, fishermen, and others who work in or near water',
      'Women doing domestic chores in infested water',
      'Travelers to endemic regions who swim or wade in freshwater',
      'Rural communities with limited access to safe water and sanitation'
    ]
  },
  {
    id: 'trachoma',
    name: 'Trachoma',
    description: 'A bacterial eye infection caused by Chlamydia trachomatis that leads to inflammation, scarring of the eyelid, and potentially blindness if left untreated.',
    category: 'infectious-diseases',
    subcategory: 'bacterial-infections',
    symptoms: [
      'Itchy, irritated eyes',
      'Discharge from the eyes',
      'Light sensitivity (photophobia)',
      'Eye pain',
      'Swollen eyelids',
      'Turned-in eyelashes (trichiasis) in advanced cases',
      'Cloudy cornea in advanced cases',
      'Reduced vision or blindness in advanced cases',
      'Formation of follicles on the inner eyelid'
    ],
    causes: [
      'Infection with Chlamydia trachomatis bacteria',
      'Spread through direct contact with eye discharge from infected person',
      'Spread by flies that have been in contact with discharge from infected eyes',
      'Contact with contaminated objects (towels, clothing)',
      'Poor personal and environmental hygiene',
      'Limited access to clean water and sanitation'
    ],
    treatments: [
      'Antibiotics (azithromycin, oral or topical tetracycline)',
      'Mass drug administration in affected communities',
      'Surgery for advanced cases with turned-in eyelashes (trichiasis)',
      'Epilation (removal of ingrowing eyelashes)',
      'Facial cleanliness',
      'Management of complications'
    ],
    preventions: [
      'Improved sanitation and access to clean water',
      'Regular face washing, especially for children',
      'Personal hygiene practices',
      'Environmental improvements to reduce fly breeding',
      'Antibiotic treatment programs in endemic communities',
      'SAFE strategy (Surgery, Antibiotics, Facial cleanliness, Environmental improvement)'
    ],
    relatedConditions: ['bacterial-conjunctivitis', 'corneal-opacity', 'dry-eye-syndrome'],
    commonQuestions: [
      {
        question: 'Is trachoma still common worldwide?',
        answer: 'Trachoma remains the world\'s leading infectious cause of blindness, but its prevalence has significantly decreased due to global elimination efforts. It is now primarily found in poor, rural communities in Africa, Asia, Central and South America, Australia, and the Middle East. The WHO launched a program to eliminate trachoma as a public health problem by 2030, and many countries have already achieved elimination targets. However, an estimated 137 million people still live in trachoma-endemic areas and require interventions.'
      },
      {
        question: 'How does trachoma lead to blindness?',
        answer: 'Trachoma leads to blindness through a progressive process that often takes many years. Repeated infections cause chronic inflammation of the eyelids, which leads to scarring. Over time, this scarring can cause the eyelid to turn inward (entropion), resulting in eyelashes rubbing against the cornea (trichiasis). This continuous abrasion damages the cornea, causing painful corneal ulcers and scarring. Eventually, the cornea becomes opaque, leading to irreversible vision loss and blindness. This progression typically occurs over 10-40 years with repeated infections.'
      }
    ],
    prevalence: 'Trachoma is endemic in 44 countries and affects about 1.9 million people worldwide, with approximately 137 million people living in endemic areas. It is responsible for the visual impairment or blindness of about 1.9 million people.',
    affectedGroups: [
      'People living in poor rural communities with limited access to healthcare, clean water, and sanitation',
      'Children, who are more susceptible to infection and serve as reservoirs',
      'Women, who are 2-3 times more likely to develop trichiasis than men (possibly due to closer contact with children)',
      'Communities in hot, dry, dusty environments that favor transmission',
      'Indigenous populations in certain countries'
    ]
  },
  {
    id: 'tuberculosis',
    name: 'Tuberculosis (TB)',
    description: 'A potentially serious infectious disease caused by Mycobacterium tuberculosis bacteria that mainly affects the lungs but can also affect other parts of the body.',
    category: 'infectious-diseases',
    subcategory: 'bacterial-infections',
    symptoms: [
      'Persistent cough (lasting more than three weeks)',
      'Coughing up blood or mucus',
      'Chest pain, particularly during breathing or coughing',
      'Unintentional weight loss',
      'Fatigue',
      'Fever',
      'Night sweats',
      'Chills',
      'Loss of appetite',
      'Symptoms related to affected organs in extrapulmonary TB'
    ],
    causes: [
      'Infection with Mycobacterium tuberculosis bacteria',
      'Airborne transmission through droplets when infected people cough, speak, or sneeze',
      'Close, prolonged contact with someone who has active TB disease',
      'Reactivation of latent TB infection',
      'Immunosuppression (especially HIV infection) increasing susceptibility'
    ],
    treatments: [
      'Combination of antibiotics for 6-9 months (isoniazid, rifampin, ethambutol, pyrazinamide)',
      'Directly Observed Therapy (DOT) to ensure medication adherence',
      'Treatment for drug-resistant TB (longer duration, more medications)',
      'Treatment of latent TB infection to prevent active disease',
      'Supportive care for symptoms and complications',
      'Surgery in rare cases (to remove damaged lung tissue)'
    ],
    preventions: [
      'BCG vaccine (provides some protection, especially for children)',
      'Early detection and treatment of active cases',
      'Treatment of latent TB infection',
      'Infection control measures in healthcare settings',
      'Proper ventilation in high-risk settings',
      'Avoiding close contact with known TB patients until they\'re no longer contagious',
      'HIV prevention and treatment',
      'Addressing poverty and overcrowding'
    ],
    relatedConditions: ['hiv-aids', 'silicosis', 'diabetes', 'copd'],
    commonQuestions: [
      {
        question: 'What is the difference between latent TB infection and TB disease?',
        answer: 'Latent TB infection means TB bacteria are living in the body but not causing symptoms (people aren\'t sick or contagious). This can last for years or a lifetime without progressing. TB disease (active TB) means the bacteria are multiplying, making the person sick and potentially contagious. Symptoms typically affect the lungs but can involve other body parts. About 5-10% of people with latent TB will develop active TB disease in their lifetime, with higher risk in the first two years after infection.'
      },
      {
        question: 'How long is TB contagious after starting treatment?',
        answer: 'People with active pulmonary TB generally become non-contagious after about 2-3 weeks of effective antibiotic treatment, provided they\'re responding well to therapy. However, the full treatment course (typically 6-9 months) must be completed to cure the disease and prevent relapse or drug resistance. Public health authorities often use factors like clinical improvement, reduced cough, negative sputum smears, and time on effective therapy to determine when isolation can be discontinued.'
      }
    ],
    emergencySigns: [
      'Severe difficulty breathing',
      'Coughing up large amounts of blood',
      'Severe chest pain',
      'High persistent fever',
      'Confusion or altered mental status (in TB meningitis)'
    ],
    prevalence: 'Tuberculosis affects about 10 million people worldwide each year and is one of the top 10 causes of death globally. Approximately one-quarter of the world\'s population has latent TB infection.',
    affectedGroups: [
      'People living with HIV/AIDS',
      'People living in poverty or overcrowded conditions',
      'Healthcare workers',
      'People with weakened immune systems',
      'Prison inmates',
      'Homeless populations',
      'People from countries with high TB burden',
      'Indigenous populations in some countries'
    ]
  },
  {
    id: 'typhoid-fever',
    name: 'Typhoid Fever',
    description: 'A bacterial infection caused by Salmonella Typhi, spread through contaminated food and water, characterized by high fever, abdominal pain, and potentially serious complications if untreated.',
    category: 'infectious-diseases',
    subcategory: 'bacterial-infections',
    symptoms: [
      'Persistent high fever (gradually increasing to 103°F-104°F)',
      'Headache',
      'Weakness and fatigue',
      'Abdominal pain',
      'Constipation or diarrhea',
      'Loss of appetite',
      'Rash of flat, rose-colored spots (rose spots)',
      'Dry cough',
      'Muscle aches',
      'Enlarged spleen and liver',
      'Bradycardia (slow heart rate) relative to fever'
    ],
    causes: [
      'Infection with Salmonella Typhi bacteria',
      'Consuming food or water contaminated with feces from infected person',
      'Poor sanitation and inadequate hygiene',
      'Close contact with infected individuals (less common)',
      'Some people become carriers without symptoms (like "Typhoid Mary")'
    ],
    treatments: [
      'Antibiotics (ciprofloxacin, azithromycin, ceftriaxone)',
      'Supportive care including fluids and nutrition',
      'Management of complications',
      'Isolation to prevent spread to others',
      'Longer antibiotic courses for chronic carriers'
    ],
    preventions: [
      'Typhoid vaccines (injectable Vi capsular polysaccharide or oral Ty21a)',
      'Safe drinking water (boiled, treated, or bottled)',
      'Proper food handling and preparation',
      'Thorough handwashing with soap',
      'Avoiding raw foods in high-risk areas',
      'Proper sewage disposal systems',
      'Identifying and treating carriers',
      'Water chlorination and sanitation improvement'
    ],
    relatedConditions: ['paratyphoid-fever', 'salmonellosis', 'gastroenteritis', 'intestinal-perforation'],
    commonQuestions: [
      {
        question: 'How long do typhoid symptoms last without treatment?',
        answer: 'Without treatment, typhoid fever typically progresses through four stages over 3-4 weeks. Symptoms worsen during the first week with rising fever, peak in severity during the second week with potential complications, begin to ease during the third week, and gradually resolve in the fourth week. However, without proper treatment, the mortality rate can reach 12-30%. Additionally, about 10-15% of untreated patients who survive will experience relapse, and 2-5% may become chronic carriers.'
      },
      {
        question: 'Is typhoid fever only found in developing countries?',
        answer: 'Typhoid fever predominantly affects developing nations with limited access to clean water and proper sanitation. About 11-20 million cases occur worldwide annually, with most in South Asia, Southeast Asia, and sub-Saharan Africa. In developed countries like the United States, Canada, and Western Europe, typhoid is relatively rare (fewer than 500 cases annually in the US) and most cases are acquired during international travel to endemic regions. However, the disease can occur anywhere if water or food becomes contaminated with S. Typhi.'
      }
    ],
    emergencySigns: [
      'Persistent high fever unresponsive to treatment',
      'Severe abdominal pain or distension',
      'Neurological symptoms (confusion, delirium)',
      'Intestinal bleeding (bloody stools)',
      'Signs of intestinal perforation (severe pain, rigid abdomen)',
      'Shock',
      'Severe dehydration'
    ],
    prevalence: 'Typhoid fever affects an estimated 11-20 million people worldwide annually, causing between 128,000-161,000 deaths. The highest incidence is in South Asia, Southeast Asia, and sub-Saharan Africa.',
    affectedGroups: [
      'Children and young adults in endemic areas',
      'Travelers to endemic regions',
      'People in areas with poor sanitation and limited access to clean water',
      'Populations in conflict zones or after natural disasters',
      'Those living in crowded conditions with inadequate hygiene'
    ]
  },
  {
    id: 'thyroid-disorders',
    name: 'Thyroid Disorders',
    description: 'Conditions that affect the thyroid gland\'s function, causing it to produce either too much thyroid hormone (hyperthyroidism) or too little (hypothyroidism).',
    category: 'endocrine-system',
    symptoms: [
      'Hypothyroidism: fatigue, increased sensitivity to cold, constipation, dry skin, weight gain, puffy face, hoarseness, muscle weakness, elevated cholesterol, muscle aches, depression, impaired memory',
      'Hyperthyroidism: weight loss, rapid heartbeat, increased appetite, nervousness, tremor, sweating, changes in menstrual patterns, increased sensitivity to heat, more frequent bowel movements, goiter, bulging eyes (in Graves\' disease)',
      'Thyroid nodules: lump in the neck, difficulty swallowing or breathing (large nodules), pain in the neck (rare)',
      'Thyroiditis: pain and tenderness in the thyroid, fever, fatigue, jaw pain'
    ],
    causes: [
      'Autoimmune disorders (Hashimoto\'s thyroiditis, Graves\' disease)',
      'Thyroiditis (inflammation of the thyroid)',
      'Iodine deficiency or excess',
      'Thyroid nodules or tumors',
      'Pituitary gland disorders',
      'Pregnancy (postpartum thyroiditis)',
      'Certain medications (amiodarone, lithium)',
      'Radiation treatment',
      'Congenital thyroid defects',
      'Genetic factors'
    ],
    treatments: [
      'Hypothyroidism: synthetic thyroid hormone replacement (levothyroxine)',
      'Hyperthyroidism: anti-thyroid medications, radioactive iodine, beta blockers, surgery',
      'Thyroid nodules: monitoring, fine needle aspiration, surgery if cancerous',
      'Thyroiditis: pain relievers, corticosteroids, thyroid hormone replacement if needed',
      'Goiter: iodine supplements, thyroid hormone, surgery for large goiters',
      'Thyroid cancer: surgery, radioactive iodine, thyroid hormone therapy, radiation, chemotherapy'
    ],
    preventions: [
      'No specific prevention for many thyroid disorders',
      'Adequate iodine intake (iodized salt) to prevent iodine deficiency disorders',
      'Avoiding unnecessary radiation exposure to the neck',
      'Regular medical check-ups to detect thyroid problems early',
      'Awareness of symptoms if family history of thyroid disorders',
      'Quitting smoking (reduces risk of Graves\' disease)',
      'Self-examination for thyroid nodules'
    ],
    relatedConditions: [
      'diabetes',
      'celiac-disease',
      'rheumatoid-arthritis',
      'lupus',
      'primary-adrenal-insufficiency',
      'pernicious-anemia',
      'reproductive-disorders'
    ],
    commonQuestions: [
      {
        question: 'How common are thyroid problems?',
        answer: 'Thyroid disorders are very common, affecting an estimated 20 million Americans. Women are 5-8 times more likely than men to develop thyroid problems. One in eight women will develop a thyroid disorder during her lifetime. The prevalence increases with age, and about 60% of people with thyroid disease are unaware of their condition due to the often subtle and nonspecific nature of symptoms that can be mistaken for other conditions or normal aging.'
      },
      {
        question: 'How does thyroid function affect weight?',
        answer: 'The thyroid produces hormones that regulate metabolism—how your body uses energy. With hypothyroidism (underactive thyroid), metabolism slows, often leading to weight gain, difficulty losing weight, and fatigue even with reduced calorie intake. Conversely, hyperthyroidism (overactive thyroid) speeds up metabolism, typically causing weight loss despite increased appetite. However, weight changes are rarely the only symptom of thyroid disorders, and modest weight gain alone is not usually caused by hypothyroidism. While treating thyroid dysfunction can help normalize metabolism, it may not result in significant weight loss for many people with hypothyroidism.'
      },
      {
        question: 'Can thyroid problems affect pregnancy?',
        answer: 'Yes, thyroid disorders can affect fertility, pregnancy, and the health of both mother and baby. Uncontrolled hypothyroidism during pregnancy increases risk of miscarriage, preterm birth, preeclampsia, and developmental problems in the baby. Hyperthyroidism carries risks of miscarriage, premature birth, and maternal heart problems. Women with pre-existing thyroid conditions often need dose adjustments during pregnancy. Additionally, some women develop postpartum thyroiditis after delivery. Pregnant women with thyroid disorders require close monitoring by healthcare providers throughout pregnancy and postpartum period.'
      }
    ],
    emergencySigns: [
      'Thyroid storm (severe hyperthyroidism): extremely high fever, rapid heart rate, high blood pressure, confusion, delirium',
      'Myxedema coma (severe hypothyroidism): extreme fatigue, decreased mental status, low body temperature, slow heart rate, seizures',
      'Severe swelling in neck affecting breathing',
      'Rapid enlargement of thyroid nodule',
      'Severe neck pain with fever',
      'Palpitations with chest pain and shortness of breath'
    ],
    prevalence: 'Thyroid disorders affect approximately 200 million people worldwide. In the United States, about 20 million people have some form of thyroid disease.',
    affectedGroups: [
      'Women (5-8 times more likely than men)',
      'People over age 60',
      'Those with family history of thyroid disease',
      'Individuals with autoimmune disorders',
      'People with previous radiation exposure to the neck',
      'Women during pregnancy and postpartum period',
      'Individuals in geographic areas with iodine deficiency'
    ]
  }
];

export default conditionsStoT;
