import { HealthCondition } from '../healthConditionsData';

/**
 * Additional common health conditions
 * These are frequently searched conditions on health information pages
 */
export const additionalConditions: HealthCondition[] = [
  {
    id: 'chickenpox',
    name: 'Chickenpox',
    description: 'A common, highly contagious viral infection that causes an itchy, blister-like rash on the skin, mainly affecting children but can occur at any age.',
    category: 'infectious-diseases',
    subcategory: 'viral-infections',
    symptoms: [
      'Itchy, fluid-filled blisters on the body, face, and scalp',
      'Red spots that eventually turn into blisters',
      'Crusting and scabbing of broken blisters',
      'Fever',
      'Fatigue',
      'Loss of appetite',
      'Headache',
      'General feeling of being unwell',
      'Mild abdominal pain',
      'Sore throat'
    ],
    causes: [
      'Infection with the varicella-zoster virus (VZV)',
      'Direct contact with blister fluid from someone with chickenpox',
      'Exposure to droplets from an infected person\'s coughs or sneezes',
      'Contact with contaminated surfaces or objects',
      'Exposure to someone with shingles (which is caused by the same virus)'
    ],
    treatments: [
      'Self-care at home (rest, hydration)',
      'Over-the-counter pain relievers (paracetamol)',
      'Cooling baths and creams to reduce itching',
      'Calamine lotion for itchy skin',
      'Antihistamines to help reduce itching',
      'Keeping fingernails short to prevent skin damage from scratching',
      'Antiviral medications (for high-risk individuals)',
      'Plenty of fluids to prevent dehydration',
      'Avoidance of aspirin or ibuprofen (may cause serious complications)'
    ],
    preventions: [
      'Vaccination (chickenpox vaccine)',
      'Avoiding contact with infected individuals',
      'Isolation of infected individuals until all blisters have crusted over',
      'Handwashing and hygiene measures',
      'Disinfection of contaminated items',
      'Avoiding sharing personal items with infected individuals'
    ],
    relatedConditions: [
      'shingles',
      'scarlet-fever',
      'measles',
      'rubella',
      'impetigo',
      'hand-foot-and-mouth-disease'
    ],
    commonQuestions: [
      {
        question: 'How long is chickenpox contagious?',
        answer: 'Chickenpox is contagious from 1-2 days before the rash appears until all the blisters have crusted over, which usually takes 5-7 days after the rash first appears. People with chickenpox should stay away from school, work, or public places during this time to prevent spreading the infection to others, especially those at high risk for complications.'
      },
      {
        question: 'Can you get chickenpox more than once?',
        answer: 'It\'s rare to get chickenpox more than once. After having chickenpox, the virus remains dormant in nerve tissue and most people develop immunity that protects them for life. However, the virus can reactivate later in life and cause shingles. In rare cases, some people (particularly those with weakened immune systems) may experience a second case of chickenpox, but this is uncommon in people with healthy immune systems.'
      },
      {
        question: 'When should I contact a doctor about chickenpox?',
        answer: 'Contact a doctor if the person with chickenpox is a newborn, pregnant, has a weakened immune system, or is an adult (especially over 65). Also seek medical attention if there are signs of complications: fever lasting more than 4 days or over 38.9°C (102°F), difficulty breathing, rapid/severe rash spread, dizziness, disorientation, stiff neck, frequent vomiting, difficulty waking or staying awake, severe cough, bacterial skin infections (increased redness, warmth, tenderness, or pus), or if the person cannot drink enough fluids.'
      }
    ],
    emergencySigns: [
      'Severe headache',
      'Difficulty breathing or persistent cough',
      'Severe abdominal pain',
      'Stiff neck',
      'High fever that doesn\'t respond to medication',
      'Signs of skin infection (increased swelling, warmth, redness, tenderness)',
      'Extreme drowsiness or difficulty walking',
      'Confusion or disorientation',
      'Rapid heartbeat or dehydration'
    ],
    prevalence: 'Before vaccination became widespread, about 90% of people had chickenpox by age 15. In the UK, there are an estimated 350,000-400,000 cases annually, primarily in children under 10 years old.',
    affectedGroups: [
      'Children under 10 years old (most commonly affected)',
      'Non-immune adolescents and adults (often experience more severe symptoms)',
      'Pregnant women (risk of complications for both mother and baby)',
      'People with weakened immune systems',
      'Newborns whose mothers have not had chickenpox'
    ]
  },
  {
    id: 'dementia',
    name: 'Dementia',
    description: 'A syndrome characterized by progressive deterioration of cognitive function, affecting memory, thinking, behavior, and the ability to perform everyday activities.',
    category: 'brain-and-nerves',
    subcategory: 'neurological-disorders',
    symptoms: [
      'Memory loss, particularly of recent events',
      'Difficulty with problem-solving and complex tasks',
      'Problems with language and communication',
      'Confusion about time and place',
      'Difficulty with planning and organizing',
      'Changes in mood and personality',
      'Poor judgment and decision-making',
      'Withdrawal from social activities',
      'Difficulty recognizing familiar objects, faces, or people',
      'Problems with coordination and movement'
    ],
    causes: [
      'Alzheimer\'s disease (most common cause)',
      'Vascular damage to the brain (vascular dementia)',
      'Lewy body deposits in the brain',
      'Frontotemporal lobar degeneration',
      'Traumatic brain injury',
      'Infections affecting the central nervous system',
      'Long-term alcohol or drug use',
      'Certain nutritional deficiencies',
      'Some metabolic disorders',
      'Medication side effects or interactions'
    ],
    treatments: [
      'Cholinesterase inhibitors (for Alzheimer\'s disease)',
      'Memantine (for moderate to severe Alzheimer\'s)',
      'Medications to manage behavioral symptoms',
      'Cognitive stimulation therapy',
      'Reminiscence therapy',
      'Validation therapy',
      'Physical exercise programs',
      'Occupational therapy',
      'Speech and language therapy',
      'Support for daily living activities',
      'Management of underlying conditions (e.g., high blood pressure for vascular dementia)'
    ],
    preventions: [
      'Regular physical exercise',
      'Healthy diet (Mediterranean diet shows benefits)',
      'Not smoking',
      'Limited alcohol consumption',
      'Maintaining healthy blood pressure, cholesterol, and blood sugar levels',
      'Mental and social stimulation',
      'Adequate sleep',
      'Prevention of head injuries',
      'Treatment of depression',
      'Management of hearing loss'
    ],
    relatedConditions: [
      'alzheimers-disease',
      'vascular-dementia',
      'lewy-body-dementia',
      'frontotemporal-dementia',
      'parkinsons-disease',
      'huntingtons-disease',
      'depression',
      'delirium'
    ],
    commonQuestions: [
      {
        question: 'Is dementia the same as Alzheimer\'s disease?',
        answer: 'No, dementia and Alzheimer\'s disease are not the same, though they\'re often confused. Dementia is an umbrella term describing a set of symptoms including memory loss and difficulties with thinking, problem-solving, or language. Alzheimer\'s disease is the most common cause of dementia, accounting for 60-80% of cases. Other types include vascular dementia, Lewy body dementia, and frontotemporal dementia. Each has different causes, symptoms, and progression patterns, though there is often overlap.'
      },
      {
        question: 'Can dementia be cured?',
        answer: 'Most types of dementia cannot be cured, as they involve progressive brain cell death that current treatments cannot stop or reverse. However, some dementia-like symptoms can be treated and even reversed when they\'re caused by conditions such as depression, medication side effects, thyroid problems, vitamin deficiencies, or brain tumors. For the main progressive types of dementia (Alzheimer\'s, vascular, Lewy body, frontotemporal), current treatments focus on symptom management and slowing progression rather than providing a cure. Research continues toward more effective treatments and potential cures.'
      },
      {
        question: 'Is dementia hereditary?',
        answer: 'The hereditary nature of dementia varies depending on the type. Most cases of dementia, including common forms like Alzheimer\'s disease and vascular dementia, are not directly inherited in a predictable pattern. However, having a family history can increase your risk. A small percentage of dementia cases (particularly early-onset forms) are caused by specific genetic mutations with a strong inheritance pattern. Frontotemporal dementia has a stronger genetic component than other types, with about 40% of cases being hereditary. Genetic testing may be appropriate for families with multiple affected members or early-onset cases.'
      }
    ],
    emergencySigns: [
      'Sudden confusion or disorientation (significantly worse than usual)',
      'Severe, sudden-onset headache',
      'Falls or loss of consciousness',
      'Seizures',
      'Hallucinations or paranoia causing dangerous behavior',
      'Inability to recognize caregivers',
      'Complete inability to eat, drink, or take medications',
      'Extreme agitation or aggression that poses safety risks'
    ],
    prevalence: 'Dementia affects approximately 50 million people worldwide. In the UK, over 850,000 people have dementia, with numbers projected to rise to 1.6 million by 2040.',
    affectedGroups: [
      'Older adults (risk increases significantly after age 65)',
      'People with family history of dementia',
      'Those with cardiovascular risk factors',
      'Individuals with Down syndrome',
      'People with history of traumatic brain injury',
      'Those with less education and cognitive stimulation throughout life',
      'People with chronic conditions like diabetes, high blood pressure, or high cholesterol'
    ]
  },
  {
    id: 'gerd',
    name: 'GERD (Gastroesophageal Reflux Disease)',
    description: 'A chronic digestive disorder where stomach acid and sometimes stomach content flows back up into the esophagus, irritating the esophageal lining.',
    category: 'digestive-health',
    symptoms: [
      'Heartburn (burning sensation in the chest)',
      'Regurgitation of food or sour liquid',
      'Difficulty swallowing (dysphagia)',
      'Feeling of a lump in the throat',
      'Chest pain (especially when lying down)',
      'Chronic cough',
      'Laryngitis or hoarseness',
      'Disrupted sleep',
      'Bad breath',
      'Dental erosion',
      'Nausea'
    ],
    causes: [
      'Weakened lower esophageal sphincter (LES)',
      'Hiatal hernia',
      'Abnormal emptying of the stomach',
      'Obesity or overweight',
      'Pregnancy',
      'Smoking',
      'Certain foods and drinks (spicy, fatty, acidic foods, chocolate, caffeine, alcohol)',
      'Eating large meals or lying down after eating',
      'Certain medications (aspirin, ibuprofen, some muscle relaxers, blood pressure medications)',
      'Delayed stomach emptying'
    ],
    treatments: [
      'Lifestyle and dietary changes',
      'Over-the-counter antacids',
      'H-2-receptor blockers (reduce acid production)',
      'Proton pump inhibitors (block acid production)',
      'Prokinetics (strengthen LES and help stomach empty faster)',
      'Baclofen (reduces LES relaxation)',
      'Surgical procedures (fundoplication, LINX device)',
      'Endoscopic procedures (Stretta, TIF)',
      'Losing excess weight',
      'Elevating the head of the bed'
    ],
    preventions: [
      'Maintaining healthy weight',
      'Avoiding trigger foods and beverages',
      'Eating smaller meals',
      'Not lying down right after eating',
      'Elevating the head of the bed',
      'Quitting smoking',
      'Avoiding tight-fitting clothes',
      'Managing stress',
      'Taking medications with plenty of water',
      'Limiting alcohol consumption'
    ],
    relatedConditions: [
      'barretts-esophagus',
      'esophagitis',
      'esophageal-stricture',
      'esophageal-cancer',
      'asthma',
      'chronic-cough',
      'laryngitis',
      'hiatal-hernia'
    ],
    commonQuestions: [
      {
        question: 'What\'s the difference between heartburn and GERD?',
        answer: 'Heartburn is a symptom—a burning sensation in the chest that can be a result of acid reflux, while GERD is a chronic disease. Occasional acid reflux and heartburn are common and don\'t necessarily mean you have GERD. However, if you experience persistent heartburn more than twice a week, or if it interferes with your daily life, you might have GERD. GERD is essentially frequent, chronic acid reflux that can lead to complications like esophageal inflammation, strictures, Barrett\'s esophagus, or even cancer if left untreated.'
      },
      {
        question: 'Can GERD lead to more serious conditions?',
        answer: 'Yes, untreated or poorly managed GERD can lead to complications including esophagitis (inflammation of the esophagus), esophageal strictures (narrowing due to scar tissue), Barrett\'s esophagus (precancerous changes to the esophageal lining), and in rare cases, esophageal cancer. GERD can also worsen or contribute to respiratory conditions like asthma, chronic cough, laryngitis, and pneumonia. Regular monitoring and proper treatment can significantly reduce the risk of developing these complications.'
      },
      {
        question: 'Will I need to take medication for GERD forever?',
        answer: 'Not necessarily. The duration of medication depends on the severity of your GERD, response to treatment, and success with lifestyle modifications. Some people can manage GERD with lifestyle changes alone after an initial medication course. Others may need long-term medication. If you\'re concerned about long-term medication use, discuss with your doctor about the lowest effective dose, intermittent therapy, or on-demand treatment. Surgical or endoscopic procedures might be options for those who don\'t respond well to medications or prefer not to take them long-term.'
      }
    ],
    emergencySigns: [
      'Severe, crushing chest pain (might be heart-related, not GERD)',
      'Difficulty breathing or shortness of breath',
      'Severe abdominal pain',
      'Vomiting of blood or material that looks like coffee grounds',
      'Black, tarry stools',
      'Difficulty swallowing that prevents eating',
      'Choking sensation or feeling food stuck in throat',
      'Unexplained weight loss'
    ],
    prevalence: 'GERD affects approximately 20% of the adult population in Western countries. In the UK, about 1 in 5 people experience GERD symptoms at least weekly.',
    affectedGroups: [
      'Adults over 40 (though it can affect people of all ages)',
      'People who are overweight or obese',
      'Pregnant women',
      'Smokers',
      'Those with hiatal hernia',
      'People with connective tissue disorders like scleroderma',
      'Those who consume large amounts of caffeine, alcohol, or spicy/fatty foods',
      'People who take certain medications (NSAIDs, some asthma medications, calcium channel blockers)'
    ]
  },
  {
    id: 'hay-fever',
    name: 'Hay Fever (Allergic Rhinitis)',
    description: 'An allergic reaction to airborne substances such as pollen, which causes inflammation of the nose and affects the sinuses, eyes, and throat.',
    category: 'immune-system',
    subcategory: 'allergies',
    symptoms: [
      'Sneezing',
      'Itchy, runny or blocked nose',
      'Red, itchy, watery eyes',
      'Itchy throat, mouth, nose and ears',
      'Cough (from postnasal drip)',
      'Loss of smell',
      'Headache',
      'Earache',
      'Fatigue',
      'Facial pain or pressure'
    ],
    causes: [
      'Tree pollen (spring)',
      'Grass pollen (late spring and summer)',
      'Weed pollen (autumn)',
      'House dust mites',
      'Mold spores',
      'Pet dander',
      'Genetic predisposition',
      'Environmental pollution (can worsen symptoms)'
    ],
    treatments: [
      'Antihistamine tablets, nasal sprays, or eye drops',
      'Corticosteroid nasal sprays and drops',
      'Nasal decongestants (short-term use)',
      'Leukotriene receptor antagonists',
      'Nasal irrigation with saline solution',
      'Allergen immunotherapy (desensitization)',
      'Eye drops for allergic conjunctivitis',
      'Traditional remedies (limited evidence for effectiveness)',
      'Wearing sunglasses outdoors',
      'Using air purifiers indoors'
    ],
    preventions: [
      'Checking pollen forecasts and staying indoors when counts are high',
      'Keeping windows and doors closed during high pollen seasons',
      'Wearing wraparound sunglasses outside',
      'Showering and changing clothes after being outdoors',
      'Using air conditioning or air purifiers',
      'Drying clothes indoors during pollen season',
      'Using pollen filters in car ventilation systems',
      'Applying a small amount of petroleum jelly around nostrils to trap pollen',
      'Regular vacuuming with HEPA filter',
      'Pre-emptive use of medications before symptoms start'
    ],
    relatedConditions: [
      'asthma',
      'eczema',
      'sinusitis',
      'allergic-conjunctivitis',
      'food-allergies',
      'oral-allergy-syndrome',
      'chronic-rhinitis'
    ],
    commonQuestions: [
      {
        question: 'Can hay fever develop later in life?',
        answer: 'Yes, hay fever can develop at any age, even if you\'ve never had allergies before. While hay fever often first appears in childhood or adolescence, many people develop symptoms in adulthood or even old age. Factors like moving to a new area with different allergens, changes in the immune system, increased exposure to allergens, or environmental changes can trigger the onset of hay fever in adults. It\'s also possible that mild symptoms went unnoticed earlier in life but become more apparent with increased exposure or sensitivity.'
      },
      {
        question: 'Is hay fever worse in certain weather conditions?',
        answer: 'Yes, hay fever symptoms can be significantly affected by weather conditions. Warm, dry, and windy days often worsen symptoms because pollen spreads more easily. Rain can provide temporary relief by washing pollen from the air, but thunderstorms can actually worsen symptoms as they cause pollen grains to burst and release smaller particles that are more easily inhaled deeply into the lungs. Humidity can increase mold spore levels. Many people find their symptoms are worst in the early morning and early evening when pollen counts tend to be highest.'
      },
      {
        question: 'Can hay fever affect my sleep and concentration?',
        answer: 'Yes, hay fever can significantly impact sleep and cognitive function. Nasal congestion and other symptoms can disrupt sleep, leading to fatigue, irritability, and difficulty concentrating during the day. Studies have shown that hay fever can impair cognitive function, reduce productivity, and affect academic performance in students. Untreated hay fever has been linked to poor exam results. The combined effects of medication side effects (some antihistamines cause drowsiness) and disturbed sleep can further impact concentration and mental performance.'
      }
    ],
    emergencySigns: [
      'Severe allergic reaction (anaphylaxis) including difficulty breathing, swelling of face or throat',
      'Wheezing or shortness of breath',
      'Complete nasal blockage affecting breathing',
      'Severe asthma attack triggered by hay fever',
      'High fever accompanying symptoms (may indicate secondary infection)'
    ],
    prevalence: 'Hay fever affects approximately 10-30% of the global population. In the UK, it affects around 1 in 5 people at some point in their lives.',
    affectedGroups: [
      'People with family history of allergies or asthma',
      'Children and young adults (though can affect any age)',
      'People living in urban areas or polluted environments',
      'Those with other allergic conditions like asthma or eczema',
      'People born during high pollen seasons',
      'Early exposure to cigarette smoke or air pollution'
    ]
  },
  {
    id: 'sciatica',
    name: 'Sciatica',
    description: 'Pain that radiates along the path of the sciatic nerve, which runs from the lower back through the hips and buttocks and down each leg.',
    category: 'bone-and-joint',
    subcategory: 'nerve-pain',
    symptoms: [
      'Pain that radiates from the lower back to the buttock and down the back of the leg',
      'Pain that ranges from mild ache to sharp, burning sensation or excruciating discomfort',
      'Numbness or tingling in the affected leg',
      'Weakness in the affected leg or foot',
      'Pain that worsens when sitting',
      'Electric shock-like pain',
      'Difficulty moving the leg or foot',
      'Pain in one side (typically)',
      'Hip pain',
      'Increased pain when coughing, sneezing or straining'
    ],
    causes: [
      'Herniated or slipped disc',
      'Bone spurs on the spine',
      'Spinal stenosis (narrowing of the spine)',
      'Piriformis syndrome (muscle in the buttocks compressing the sciatic nerve)',
      'Spondylolisthesis (vertebra slipping onto the one below it)',
      'Trauma or injury to the lumbar spine or sciatic nerve',
      'Tumors (rarely)',
      'Infection (rarely)',
      'Pregnancy (due to pressure on the sciatic nerve)',
      'Diabetes (can cause nerve damage)'
    ],
    treatments: [
      'Self-care and rest (limited time)',
      'Over-the-counter pain relievers (ibuprofen, naproxen)',
      'Prescription medications (muscle relaxants, anti-inflammatories)',
      'Physical therapy',
      'Stretching exercises',
      'Hot and cold packs',
      'Epidural steroid injections',
      'Alternative treatments (acupuncture, chiropractic care, massage)',
      'Surgery (for severe cases with significant weakness or uncontrolled pain)',
      'Cognitive behavioral therapy for pain management'
    ],
    preventions: [
      'Regular exercise to strengthen back and core muscles',
      'Good posture when sitting and standing',
      'Proper lifting techniques (using legs, not back)',
      'Maintaining healthy weight',
      'Avoiding prolonged sitting',
      'Using proper ergonomics at workstations',
      'Stretching regularly',
      'Low-impact activities (swimming, walking)',
      'Avoiding smoking (reduces blood flow and nutrients to discs)',
      'Regular movement throughout the day'
    ],
    relatedConditions: [
      'herniated-disc',
      'spinal-stenosis',
      'spondylolisthesis',
      'piriformis-syndrome',
      'back-pain',
      'degenerative-disc-disease',
      'cauda-equina-syndrome'
    ],
    commonQuestions: [
      {
        question: 'How long does sciatica last?',
        answer: 'The duration of sciatica varies significantly from person to person. For many people, acute sciatica resolves within 4-6 weeks with appropriate self-care and pain management. However, some may experience chronic sciatica that lasts for months or even years, particularly if the underlying cause isn\'t addressed. Recurrent episodes are common. Recovery time depends on the cause, severity, individual health factors, and treatment approach. Early intervention typically leads to faster recovery and reduces the risk of the condition becoming chronic.'
      },
      {
        question: 'What exercises help relieve sciatica?',
        answer: 'Gentle stretches and exercises can help relieve sciatica by reducing pressure on the sciatic nerve and strengthening supporting muscles. Beneficial exercises include knee-to-chest stretches, lying spinal twists, seated spinal stretches, and gentle hamstring stretches. Walking, swimming, and stationary cycling are good low-impact activities. Core-strengthening exercises like modified planks and bird-dogs help support the spine. However, it\'s important to start gently and avoid exercises that increase pain. A physical therapist can provide a personalized exercise program based on your specific condition and needs.'
      },
      {
        question: 'Can sciatica affect both legs?',
        answer: 'While sciatica typically affects only one leg at a time, it can affect both legs simultaneously, though this is less common. Bilateral sciatica (affecting both legs) may indicate a more serious condition such as cauda equina syndrome, central disc herniation, or spinal stenosis that affects the central portion of the spine. These conditions can compress multiple nerve roots on both sides. Bilateral symptoms warrant immediate medical attention, especially if accompanied by bowel or bladder problems, as they may represent a medical emergency requiring urgent intervention.'
      }
    ],
    emergencySigns: [
      'Sudden, severe pain in the low back or leg',
      'Numbness or muscle weakness in both legs',
      'Numbness or tingling in the groin or genital area',
      'Loss of bladder or bowel control',
      'Difficulty walking or standing',
      'Fever accompanying back pain',
      'Pain following a violent injury',
      'Progressive neurological deficits'
    ],
    prevalence: 'Sciatica affects approximately 10-40% of people at some point in their lives, with about 1-5% experiencing it in any given year.',
    affectedGroups: [
      'Adults aged 30-50 years',
      'People with physically demanding jobs',
      'Sedentary individuals who sit for prolonged periods',
      'Those who are overweight or obese',
      'People with diabetes',
      'Pregnant women',
      'Individuals with poor posture',
      'Those with history of back injury or surgery'
    ]
  }
];

export default additionalConditions;
