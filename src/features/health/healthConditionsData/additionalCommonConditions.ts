import { HealthCondition } from '../healthConditionsData';

/**
 * Additional common health conditions to supplement our current dataset
 * These are commonly searched conditions on the NHS website
 */
export const additionalCommonConditions: HealthCondition[] = [
  {
    id: 'allergies',
    name: 'Allergies',
    description: 'An allergy is a reaction the body has to a particular food or substance that occurs when the immune system overreacts to typically harmless substances in the environment.[1][2] Allergies can affect the nose, eyes, skin, lungs, and gastrointestinal tract.[3] These allergic reactions can range from mild discomfort to life-threatening emergencies like anaphylaxis.[4][6] The incidence of allergic reactions, particularly anaphylaxis, has been increasing in the general population.[6]',
    category: 'immune-system',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Allergy',
    symptoms: [
      'Sneezing',
      'Runny or blocked nose',
      'Red, itchy, watery eyes',
      'Wheezing and coughing',
      'Raised, itchy, red rash (hives)',
      'Swollen lips, tongue, eyes or face',
      'Difficulty breathing',
      'Digestive problems (stomach pain, vomiting, diarrhea)',
      'Dry, red and cracked skin'
    ],
    causes: [
      'Pollen from trees and grasses',
      'Dust mites',
      'Animal dander (tiny flakes of skin or hair)',
      'Food (particularly nuts, fruit, shellfish, eggs and cow\'s milk)',
      'Insect bites and stings',
      'Medicines (including ibuprofen, aspirin and certain antibiotics)',
      'Latex (used in some gloves and condoms)',
      'Mold (tiny fungi with spores that float in the air)',
      'Household chemicals'
    ],
    treatments: [
      'Antihistamines (tablets, capsules, creams, liquids, eye drops)',
      'Decongestants',
      'Corticosteroids',
      'Leukotriene receptor antagonists',
      'Immunotherapy (desensitization)',
      'Avoiding known allergens when possible',
      'Emollients for eczema caused by allergies',
      'Adrenaline auto-injectors (like EpiPen) for severe reactions',
      'Allergy eye drops'
    ],
    preventions: [
      'Identifying and avoiding allergens',
      'Keeping a diary to track exposure and symptoms',
      'Wearing a medical alert bracelet if you have severe allergies',
      'Using air purifiers to reduce airborne allergens',
      'Regular cleaning to reduce dust mites',
      'Using allergen-proof bed covers',
      'Avoiding outdoor activity when pollen counts are high',
      'Reading food labels carefully if you have food allergies'
    ],
    relatedConditions: [
      'asthma',
      'eczema',
      'hay-fever',
      'food-intolerance',
      'anaphylaxis',
      'rhinitis',
      'sinusitis',
      'contact dermatitis'
    ],
    references: [
      {
        id: '1',
        text: 'Types of Allergic Diseases. NIAID. 29 May 2015.',
        url: 'https://www.niaid.nih.gov/diseases-conditions/types-allergic-diseases'
      },
      {
        id: '2',
        text: 'Kay AB (2000). "Overview of allergy and allergic diseases: with a view to the future". British Medical Bulletin. 56 (4): 843–64.',
        url: 'https://doi.org/10.1258/0007142001903481'
      },
      {
        id: '3',
        text: 'Sicherer SH, Sampson HA (February 2014). "Food allergy: Epidemiology, pathogenesis, diagnosis, and treatment". The Journal of Allergy and Clinical Immunology. 133 (2): 291–307.',
        url: 'https://doi.org/10.1016/j.jaci.2013.11.020'
      },
      {
        id: '4',
        text: 'Simons FE (October 2009). "Anaphylaxis: Recent advances in assessment and treatment". The Journal of Allergy and Clinical Immunology. 124 (4): 625–36.',
        url: 'https://doi.org/10.1016/j.jaci.2009.08.025'
      },
      {
        id: '5',
        text: 'Wheatley LM, Togias A (January 2015). "Clinical practice. Allergic rhinitis". The New England Journal of Medicine. 372 (5): 456–63.',
        url: 'https://doi.org/10.1056/NEJMcp1412282'
      },
      {
        id: '6',
        text: 'Dougherty JM, Alsayouri K, Sadowski A (2023). "Allergy". StatPearls Publishing LLC.',
        url: 'https://pubmed.ncbi.nlm.nih.gov/31424821/'
      }
    ],
    commonQuestions: [
      {
        question: 'What\'s the difference between an allergy and an intolerance?',
        answer: 'An allergy involves the immune system and can cause potentially serious reactions, while an intolerance doesn\'t involve the immune system and is generally less severe. Allergic reactions happen quickly after exposure and can affect multiple parts of the body, even in small amounts of the allergen. Intolerances usually cause digestive symptoms that develop gradually and often depend on the amount consumed.'
      },
      {
        question: 'Can allergies be cured?',
        answer: 'Currently, there is no cure for allergies, but treatments can help manage symptoms effectively. Immunotherapy (allergen-specific treatments given as shots or tablets) can reduce sensitivity to allergens and change how the immune system reacts to them, providing long-term relief for some people. However, even after successful immunotherapy, you may still need to avoid certain allergens and carry emergency medication if you have severe allergies.'
      },
      {
        question: 'Can you develop allergies later in life?',
        answer: 'Yes, allergies can develop at any age, even if you\'ve never had allergic reactions before. Adult-onset allergies are common and can be triggered by changes in your environment, moving to a new location, or changes in your immune system. Some allergies may have been present in a milder form earlier in life but become more noticeable with repeated exposure or when the immune system becomes more sensitive.'
      }
    ],
    emergencySigns: [
      'Swelling of the throat, mouth, lips or tongue',
      'Difficulty breathing or swallowing',
      'Wheezing or persistent cough',
      'Dizziness or feeling faint',
      'Rapid heartbeat',
      'Sudden drop in blood pressure',
      'Loss of consciousness',
      'Severe skin rash or hives over much of the body'
    ],
    prevalence: 'Allergies affect more than 1 in 4 people in the UK at some point in their lives. Food allergies affect approximately 2% of adults and 5-8% of children.',
    affectedGroups: [
      'Children (though many outgrow allergies)',
      'People with a family history of allergies',
      'People with asthma or other allergic conditions',
      'Those with compromised immune systems',
      'People regularly exposed to allergens',
      'Individuals with certain genetic predispositions'
    ]
  },
  {
    id: 'common-cold',
    name: 'Common Cold',
    description: 'The common cold is a viral infectious disease of the upper respiratory tract that primarily affects the nose, throat, sinuses, and larynx.[1][2] It is the most frequent infectious disease in humans and is usually mild and self-limiting.[3] Common colds are defined as upper respiratory tract infections that affect the predominantly nasal part of the respiratory mucosa.[4]',
    category: 'respiratory',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Common_cold',
    symptoms: [
      'Runny or blocked nose',
      'Sore throat',
      'Headache',
      'Sneezing',
      'Cough',
      'Slight temperature (38°C or less)',
      'Pressure in ears and face',
      'Loss of taste and smell',
      'Muscle aches',
      'Feeling generally unwell'
    ],
    causes: [
      'Rhinoviruses (most common cause)',
      'Coronavirus (not COVID-19)',
      'RSV (respiratory syncytial virus)',
      'Parainfluenza virus',
      'Adenovirus',
      'Close contact with infected people',
      'Touching contaminated surfaces then touching eyes or nose',
      'Inhaling droplets from coughs and sneezes'
    ],
    treatments: [
      'Rest and sleep',
      'Staying hydrated',
      'Over-the-counter pain relievers (paracetamol, ibuprofen)',
      'Decongestants',
      'Saline nasal sprays or drops',
      'Throat lozenges or sprays',
      'Warm drinks with honey and lemon',
      'Vapor rubs',
      'Humidifiers to add moisture to the air'
    ],
    preventions: [
      'Frequent handwashing with soap and water',
      'Using hand sanitizer when soap isn\'t available',
      'Avoiding close contact with sick people',
      'Not touching your face with unwashed hands',
      'Covering coughs and sneezes with tissues',
      'Cleaning and disinfecting frequently touched surfaces',
      'Staying home when sick',
      'Maintaining a healthy lifestyle to support immune function'
    ],
    relatedConditions: [
      'influenza',
      'sinusitis',
      'bronchitis',
      'pneumonia',
      'strep-throat',
      'covid-19',
      'allergic-rhinitis'
    ],
    references: [
      {
        id: '1',
        text: 'Eccles R (November 2005). "Understanding the symptoms of the common cold and influenza". The Lancet. Infectious Diseases. 5 (11): 718–25.',
        url: 'https://doi.org/10.1016/S1473-3099(05)70270-X'
      },
      {
        id: '2',
        text: 'Heikkinen T, Järvinen A (January 2003). "The common cold". Lancet. 361 (9351): 51–9.',
        url: 'https://doi.org/10.1016/S0140-6736(03)12162-9'
      },
      {
        id: '3',
        text: 'Allan GM, Arroll B (February 2014). "Prevention and treatment of the common cold: making sense of the evidence". CMAJ. 186 (3): 190–9.',
        url: 'https://doi.org/10.1503/cmaj.121442'
      },
      {
        id: '4',
        text: 'Arroll B (March 2011). "Common cold". BMJ Clinical Evidence. 2011 (3): 1510.',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3275147/'
      },
      {
        id: '5',
        text: 'Centers for Disease Control and Prevention. "Common Colds: Protect Yourself and Others".',
        url: 'https://www.cdc.gov/features/rhinoviruses/'
      }
    ],
    commonQuestions: [
      {
        question: 'How long does a cold last?',
        answer: 'The common cold typically lasts between 7-10 days. Symptoms usually peak around days 3-5 and then gradually improve. Some symptoms, particularly cough, may persist for up to two weeks. If symptoms last longer than two weeks or worsen significantly after a week, you might have a secondary infection or another condition that requires medical attention.'
      },
      {
        question: 'Is it a cold or the flu?',
        answer: 'Colds and flu share many symptoms, but flu symptoms tend to be more severe and come on more suddenly. The flu more commonly causes fever above 38°C, severe body aches, extreme fatigue, and headaches. Colds typically cause more nasal symptoms like runny nose and congestion, with milder overall symptoms. Flu can lead to serious complications like pneumonia, while colds rarely cause serious health problems.'
      },
      {
        question: 'Should I take antibiotics for a cold?',
        answer: 'No, antibiotics are not effective against colds because colds are caused by viruses, not bacteria. Antibiotics only work against bacterial infections. Taking antibiotics when they\'re not needed contributes to antibiotic resistance and may cause side effects. You should manage cold symptoms with rest, fluids, and over-the-counter remedies. See a doctor if symptoms are severe or last longer than 10 days.'
      }
    ],
    prevalence: 'Adults have an average of 2-3 colds per year, while children may have 8-12 colds annually. The common cold is the most frequent infectious disease in humans.',
    affectedGroups: [
      'Children (especially those in daycare or school settings)',
      'People with weakened immune systems',
      'Smokers and those exposed to secondhand smoke',
      'People in crowded environments',
      'Those with seasonal allergies or asthma',
      'Adults in close contact with children'
    ]
  },
  {
    id: 'flu',
    name: 'Flu (Influenza)',
    description: 'A contagious respiratory illness caused by influenza viruses that infect the nose, throat, and sometimes the lungs, causing mild to severe illness and sometimes death.',
    category: 'respiratory',
    subcategory: 'infectious-diseases',
    symptoms: [
      'Sudden high temperature (38°C or above)',
      'Aching body',
      'Feeling tired or exhausted',
      'Dry cough',
      'Sore throat',
      'Headache',
      'Difficulty sleeping',
      'Loss of appetite',
      'Diarrhea or stomach pain',
      'Feeling sick and being sick'
    ],
    causes: [
      'Influenza A viruses (can cause severe epidemics)',
      'Influenza B viruses (typically cause milder disease)',
      'Influenza C viruses (usually cause mild respiratory symptoms)',
      'Spread through droplets when infected people cough, sneeze or talk',
      'Contact with contaminated surfaces',
      'Close contact with infected individuals'
    ],
    treatments: [
      'Rest and sleep',
      'Keeping warm',
      'Taking paracetamol or ibuprofen to lower temperature and treat aches and pains',
      'Drinking plenty of water to avoid dehydration',
      'Antiviral medications (oseltamivir, zanamivir) for those at high risk',
      'Hospitalization for severe cases',
      'Antibiotics if secondary bacterial infection develops'
    ],
    preventions: [
      'Annual flu vaccination',
      'Regular handwashing',
      'Using tissues to cover mouth and nose when coughing or sneezing',
      'Avoiding close contact with sick people',
      'Cleaning and disinfecting surfaces that may be contaminated',
      'Avoiding touching eyes, nose, and mouth',
      'Staying home when sick to prevent spreading the virus'
    ],
    relatedConditions: [
      'common-cold',
      'pneumonia',
      'bronchitis',
      'sinusitis',
      'covid-19',
      'strep-throat',
      'respiratory-syncytial-virus'
    ],
    commonQuestions: [
      {
        question: 'How long is flu contagious?',
        answer: 'People with flu are most contagious in the first 3-4 days after their illness begins, but they may remain infectious for up to 7 days after symptoms start. Some people, especially young children and people with weakened immune systems, might be able to infect others for an even longer time. You can spread the flu before you even know you\'re sick, beginning 1 day before symptoms develop and up to 5-7 days after becoming sick.'
      },
      {
        question: 'Can you get the flu from the flu vaccine?',
        answer: 'No, you cannot get the flu from the flu vaccine. The vaccines either contain inactivated (killed) virus, only a portion of the virus, or a weakened virus that cannot cause infection. The most common side effects from the flu shot are soreness, redness, or swelling at the injection site, low-grade fever, and aches. These side effects are not flu itself but the body\'s immune response to the vaccine and typically resolve within 1-2 days.'
      },
      {
        question: 'When should I see a doctor for flu symptoms?',
        answer: 'Most people with flu can recover at home without medical care, but you should seek medical attention if you have difficulty breathing, persistent chest or abdominal pain, persistent dizziness or confusion, seizures, severe muscle pain, severe weakness, dehydration, or symptoms that improve but then return with worse fever or cough. People at high risk of complications (young children, older adults, pregnant women, and those with certain medical conditions) should contact a healthcare provider early.'
      }
    ],
    emergencySigns: [
      'Difficulty breathing or shortness of breath',
      'Pain or pressure in the chest or abdomen',
      'Sudden dizziness or confusion',
      'Severe or persistent vomiting',
      'Flu-like symptoms that improve but then return with fever and worse cough',
      'Bluish lips or face',
      'Not waking up or not interacting',
      'Seizures'
    ],
    prevalence: 'Seasonal flu epidemics occur yearly, affecting 5-10% of adults and 20-30% of children globally each year. In the UK, an average of 17,000 people die from flu complications annually.',
    affectedGroups: [
      'Children under 5 years old, especially those under 2',
      'Adults 65 years and older',
      'Pregnant women and women up to 2 weeks postpartum',
      'People with chronic medical conditions (asthma, heart disease, diabetes)',
      'Individuals with weakened immune systems',
      'Healthcare workers and people in close contact with high-risk groups'
    ]
  },
  {
    id: 'back-pain',
    name: 'Back Pain',
    description: 'Pain affecting the back, ranging from mild to severe, that can be acute (short-term) or chronic (long-term) and can affect people of any age.',
    category: 'bone-and-joint',
    symptoms: [
      'Muscle ache or stiffness',
      'Shooting or stabbing pain',
      'Pain radiating down the leg',
      'Limited flexibility or range of motion of the back',
      'Inability to stand straight',
      'Pain that worsens with bending, lifting, standing or walking',
      'Pain that improves with reclining',
      'Muscle spasms',
      'Tingling or numbness in legs (if due to nerve compression)'
    ],
    causes: [
      'Muscle or ligament strain from heavy lifting or sudden awkward movements',
      'Bulging or ruptured discs',
      'Arthritis',
      'Skeletal irregularities (scoliosis, lordosis)',
      'Osteoporosis',
      'Poor posture',
      'Prolonged sitting or standing',
      'Overweight or obesity',
      'Lack of exercise',
      'Psychological stress'
    ],
    treatments: [
      'Over-the-counter pain relievers (paracetamol, ibuprofen)',
      'Stronger pain medication by prescription',
      'Muscle relaxants',
      'Physical therapy',
      'Heat or ice packs',
      'Gentle activity and stretching',
      'Manual therapy (physiotherapy, osteopathy, chiropractic)',
      'Cognitive behavioral therapy for chronic pain',
      'Injections for severe pain',
      'Surgery (rarely, for specific conditions)'
    ],
    preventions: [
      'Regular exercise to strengthen back and core muscles',
      'Maintaining a healthy weight',
      'Proper lifting technique (lift with legs, not back)',
      'Good posture when sitting and standing',
      'Ergonomic work environment',
      'Using supportive furniture',
      'Taking breaks when standing or sitting for long periods',
      'Avoiding smoking (reduces blood flow to lower spine)',
      'Stress management'
    ],
    relatedConditions: [
      'sciatica',
      'herniated-disc',
      'spinal-stenosis',
      'arthritis',
      'osteoporosis',
      'fibromyalgia',
      'ankylosing-spondylitis'
    ],
    commonQuestions: [
      {
        question: 'When should back pain be considered serious?',
        answer: 'Most back pain gradually improves with home treatment. However, you should seek immediate medical care if your back pain follows a fall or injury, is severe and doesn\'t improve with rest, spreads down one or both legs (especially if it extends below the knee), causes weakness, numbness or tingling in legs, is accompanied by unexplained weight loss, or involves bowel or bladder problems. Also seek care if you have a history of cancer, osteoporosis, steroid use, or substance abuse.'
      },
      {
        question: 'Is bed rest recommended for back pain?',
        answer: 'No, extended bed rest is generally not recommended for back pain. Current evidence suggests that staying active is better for recovery than bed rest. Too much rest can actually worsen pain and lead to deconditioning of muscles. For acute back pain, a day or two of relative rest may help, but it\'s important to start gentle movement as soon as tolerable. Continue normal activities as much as possible, avoiding those that aggravate pain significantly.'
      },
      {
        question: 'Can emotional stress cause back pain?',
        answer: 'Yes, psychological stress can contribute to back pain or make existing pain worse. When stressed, muscles tend to tense up, which can lead to or exacerbate back pain. Stress also affects how we perceive pain, potentially making it feel more intense. The relationship between stress and pain is complex and bidirectional—pain causes stress, and stress can intensify pain. Stress management techniques like deep breathing, meditation, and progressive muscle relaxation may help reduce stress-related back pain.'
      }
    ],
    emergencySigns: [
      'Severe back pain that doesn\'t improve with rest',
      'Back pain after a fall or injury',
      'Pain accompanied by fever',
      'Pain causing new bowel or bladder problems',
      'Pain accompanied by unexplained weight loss',
      'Pain with leg weakness, numbness or tingling',
      'Pain with redness or swelling on the back',
      'Pain that wakes you from sleep'
    ],
    prevalence: 'Back pain is one of the most common reasons people see a doctor, with about 80% of adults experiencing it at some point in their lives. At any given time, about 20% of people are affected by back pain.',
    affectedGroups: [
      'Adults aged 35-55 (most commonly affected)',
      'People with physically demanding jobs',
      'People who are overweight or obese',
      'Pregnant women',
      'People with sedentary lifestyles',
      'Smokers',
      'Those with a family history of back problems',
      'People with certain mental health conditions (anxiety, depression)'
    ]
  }
];

export default additionalCommonConditions;
