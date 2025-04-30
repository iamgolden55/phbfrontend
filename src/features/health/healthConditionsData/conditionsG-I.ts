import { HealthCondition } from '../healthConditionsData';

/**
 * Health conditions starting with letters G-I
 */
export const conditionsGtoI: HealthCondition[] = [
  {
    id: 'gout',
    name: 'Gout',
    description: 'A type of inflammatory arthritis that causes sudden, severe attacks of pain, swelling, redness and tenderness in joints, often at the base of the big toe.',
    category: 'bone-and-joint',
    symptoms: [
      'Intense joint pain, especially in the big toe',
      'Lingering discomfort after the pain subsides',
      'Inflammation and redness',
      'Limited range of motion',
      'Swelling in and around the affected joint',
      'Peeling, itchy, flaky skin as joint starts to heal',
      'Formation of nodules (tophi) in later stages'
    ],
    causes: [
      'Elevated uric acid levels in the blood',
      'Underexcretion of uric acid by the kidneys',
      'Overproduction of uric acid in the body',
      'Consumption of foods high in purines',
      'Genetic factors',
      'Certain medications (diuretics, low-dose aspirin)',
      'Medical conditions (untreated hypertension, diabetes, metabolic syndrome, heart and kidney diseases)'
    ],
    treatments: [
      'NSAIDs for pain and inflammation',
      'Colchicine to reduce inflammation',
      'Corticosteroids for severe pain',
      'Xanthine oxidase inhibitors to reduce uric acid production',
      'Uricosurics to improve uric acid removal',
      'Rest and elevation of the affected joint',
      'Ice application to reduce swelling',
      'Joint protection with splints or other devices'
    ],
    preventions: [
      'Limiting intake of foods high in purines (red meat, organ meats, seafood)',
      'Limiting alcohol consumption, especially beer',
      'Avoiding high-fructose corn syrup',
      'Maintaining a healthy weight',
      'Staying hydrated',
      'Regular exercise',
      'Taking prescribed medications consistently'
    ],
    relatedConditions: [
      'arthritis',
      'kidney-stones',
      'hypertension',
      'diabetes',
      'obesity',
      'metabolic-syndrome',
      'kidney-disease'
    ],
    commonQuestions: [
      {
        question: 'Is gout caused only by diet?',
        answer: 'No, diet is just one factor that can contribute to gout. While certain foods and drinks can trigger gout attacks, the condition is primarily related to how the body processes uric acid, which is influenced by genetics, kidney function, and other health conditions. Diet modification is important but often not sufficient as the sole treatment.'
      },
      {
        question: 'Can gout be cured permanently?',
        answer: 'Gout cannot be cured permanently, but it can be effectively managed with proper treatment. With medication, dietary changes, and lifestyle modifications, many people can prevent gout attacks and limit joint damage. Consistent long-term treatment is essential to maintain normal uric acid levels and prevent complications.'
      },
      {
        question: 'How quickly do gout attacks develop?',
        answer: 'Gout attacks often develop suddenly, typically overnight. You may go to bed feeling fine but wake up with an intensely painful, hot, red, and swollen joint. The pain typically reaches its peak within 12-24 hours of onset and can last for days to weeks without treatment. This rapid onset is a distinguishing feature of gout.'
      }
    ],
    prevalence: 'Gout affects approximately 9.2 million adults (4%) in the United States. Globally, the prevalence ranges from 1-4% of the population.',
    affectedGroups: [
      'Men (affected 2-3 times more often than women)',
      'Postmenopausal women',
      'Adults over 30',
      'People with family history of gout',
      'Those with kidney disease',
      'People who are overweight or obese',
      'Individuals who consume high-purine diets or excessive alcohol'
    ]
  },
  {
    id: 'guinea-worm-disease',
    name: 'Guinea Worm Disease (Dracunculiasis)',
    description: 'A parasitic infection caused by the guinea worm (Dracunculus medinensis) that affects poor communities without access to safe drinking water, resulting in painful skin lesions and disability.',
    category: 'infectious-diseases',
    subcategory: 'parasitic-infections',
    symptoms: [
      'Painful blister or swelling on skin (usually on lower limbs or feet)',
      'Burning sensation at site of worm emergence',
      'Fever',
      'Nausea and vomiting',
      'Dizziness',
      'Allergic reaction',
      'Intense pain when worm emerges through skin',
      'Secondary bacterial infections',
      'Difficulty walking or working during emergence',
      'Joint stiffness'
    ],
    causes: [
      'Infection with the parasitic worm Dracunculus medinensis',
      'Drinking water containing water fleas (copepods) infected with guinea worm larvae',
      'Once inside the human body, larvae mature into adult worms over a year',
      'Female worms migrate to the skin surface to release larvae, causing painful blisters'
    ],
    treatments: [
      'No drugs available to treat the infection',
      'Slow, careful extraction of the worm by winding it around a small stick over days or weeks',
      'Keeping the wound clean to prevent secondary infections',
      'Pain management',
      'Antibiotics for secondary bacterial infections',
      'Bandaging to protect the wound'
    ],
    preventions: [
      'Filtering drinking water through fine mesh cloth',
      'Treating water sources with larvicides',
      'Providing safe drinking water sources',
      'Preventing people with emerging worms from entering water sources',
      'Community education about transmission',
      'Surveillance and case containment'
    ],
    relatedConditions: ['other-parasitic-worm-infections', 'waterborne-diseases'],
    commonQuestions: [
      {
        question: 'Is Guinea worm disease close to being eradicated?',
        answer: 'Yes, Guinea worm disease is very close to eradication. Since the start of the eradication program in 1986, when there were an estimated 3.5 million cases across 21 countries, the number has been reduced by more than 99.99%. In 2022, only 13 human cases were reported worldwide. It would be the second human disease ever eradicated (after smallpox) and the first without a vaccine or medicine.'
      },
      {
        question: 'How long does it take to extract a Guinea worm?',
        answer: 'The traditional extraction of a Guinea worm is a slow, careful process that can take anywhere from a few days to several weeks. The worm is gradually wound around a small stick or piece of gauze, with only a few centimeters extracted each day to avoid breaking the worm, which could cause severe inflammation or infection. The entire worm, which can grow up to 80-100 cm in length, must be completely removed.'
      }
    ],
    prevalence: 'Once widespread across parts of Africa, the Middle East, and Asia, Guinea worm disease is now nearly eradicated, with only a handful of cases reported annually in a few countries (primarily Chad, South Sudan, Ethiopia, and Mali).',
    affectedGroups: [
      'People in rural, isolated communities without access to safe drinking water',
      'Agricultural workers in endemic areas',
      'Children who play or swim in contaminated water',
      'People in regions with seasonal water scarcity who rely on stagnant water sources'
    ]
  },
  {
    id: 'hiv-aids',
    name: 'HIV/AIDS',
    description: 'A chronic viral infection that attacks the immune system, specifically CD4 cells, weakening the body\'s ability to fight infections and disease. If untreated, HIV (Human Immunodeficiency Virus) can lead to AIDS (Acquired Immunodeficiency Syndrome).',
    category: 'infectious-diseases',
    subcategory: 'viral-infections',
    symptoms: [
      'Acute phase: Flu-like symptoms (fever, sore throat, fatigue, swollen lymph nodes, rash)',
      'Chronic phase: Often asymptomatic for years',
      'AIDS phase: Rapid weight loss, recurring fever, extreme fatigue',
      'Night sweats',
      'Swollen lymph nodes',
      'Diarrhea lasting more than a week',
      'Pneumonia',
      'Red, brown, or purplish blotches on skin',
      'Memory loss, depression, neurological disorders',
      'Opportunistic infections'
    ],
    causes: [
      'Infection with HIV virus',
      'Unprotected sexual contact with infected person',
      'Sharing needles or syringes',
      'Mother-to-child transmission during pregnancy, birth, or breastfeeding',
      'Transfusion with infected blood (very rare in countries with blood screening)'
    ],
    treatments: [
      'Antiretroviral therapy (ART)',
      'Combination drug regimens to control viral replication',
      'Regular monitoring of viral load and CD4 count',
      'Treatment of opportunistic infections',
      'Preventive medications for opportunistic infections',
      'Mental health support',
      'Nutritional support'
    ],
    preventions: [
      'Safe sex practices, including condom use',
      'Pre-exposure prophylaxis (PrEP) for high-risk individuals',
      'Post-exposure prophylaxis (PEP) after potential exposure',
      'Regular HIV testing',
      'Avoiding sharing needles or drug paraphernalia',
      'Antiretroviral treatment for pregnant women with HIV',
      'Male circumcision (provides partial protection)',
      'Treatment as prevention (keeping viral load undetectable)'
    ],
    relatedConditions: ['opportunistic-infections', 'tuberculosis', 'pneumocystis-pneumonia', 'kaposis-sarcoma', 'hiv-associated-neurocognitive-disorder'],
    commonQuestions: [
      {
        question: 'Can HIV be cured?',
        answer: 'Currently, there is no cure for HIV. However, with proper medical care and antiretroviral treatment (ART), HIV can be controlled. People with HIV who receive consistent treatment can live long, healthy lives and prevent transmitting the virus to their sexual partners. Research for a cure continues, with some promising approaches including "shock and kill" strategies and gene therapy.'
      },
      {
        question: 'What does "undetectable equals untransmittable" (U=U) mean?',
        answer: 'U=U means that people with HIV who take antiretroviral therapy as prescribed and maintain an undetectable viral load (the amount of HIV in the blood) have effectively no risk of sexually transmitting HIV to their HIV-negative partners. This scientific consensus has been confirmed by multiple large studies and represents a major breakthrough in HIV prevention.'
      },
      {
        question: 'What is the difference between HIV and AIDS?',
        answer: 'HIV (Human Immunodeficiency Virus) is the virus that can lead to AIDS. AIDS (Acquired Immunodeficiency Syndrome) is the most advanced stage of HIV infection, defined by the development of certain opportunistic infections or cancers, or when CD4 cells drop below 200 cells/mm³. With current treatments, many people with HIV never develop AIDS.'
      }
    ],
    emergencySigns: [
      'High fever with severe headache',
      'Confusion or changes in mental status',
      'Seizures',
      'Inability to breathe properly',
      'Severe, persistent diarrhea',
      'Severe weight loss',
      'Inability to eat or drink'
    ],
    prevalence: 'Globally, about 38.4 million people were living with HIV at the end of 2021. An estimated 650,000 people died from HIV-related causes in 2021, and 1.5 million people acquired HIV.',
    affectedGroups: [
      'Men who have sex with men',
      'Transgender women',
      'People who inject drugs',
      'Sex workers and their clients',
      'People in prisons and other closed settings',
      'Young women in sub-Saharan Africa',
      'Children born to mothers with HIV'
    ]
  },
  {
    id: 'hepatitis-b-and-c',
    name: 'Hepatitis B and C',
    description: 'Viral infections that affect the liver, potentially leading to both acute and chronic disease, with hepatitis B spread through blood and body fluids and hepatitis C primarily through blood.',
    category: 'infectious-diseases',
    subcategory: 'viral-infections',
    symptoms: [
      'Fatigue',
      'Nausea and vomiting',
      'Abdominal pain or discomfort',
      'Loss of appetite',
      'Low-grade fever',
      'Jaundice (yellowing of skin and eyes)',
      'Dark urine',
      'Joint pain',
      'Clay-colored bowel movements',
      'Many infected people have no symptoms (especially in early stages)'
    ],
    causes: [
      'Hepatitis B virus (HBV) infection transmitted through blood, semen, and other body fluids',
      'Hepatitis C virus (HCV) infection primarily transmitted through blood',
      'Sharing needles (drug use, tattoos, piercings)',
      'Unprotected sexual contact (more common with HBV)',
      'Mother-to-child transmission during birth',
      'Occupational exposure in healthcare settings',
      'Transfusion with unscreened blood (rare in developed countries)'
    ],
    treatments: [
      'Hepatitis B: Antiviral medications (tenofovir, entecavir, others)',
      'Hepatitis C: Direct-acting antiviral medications (with >95% cure rate)',
      'Regular monitoring of liver function',
      'Vaccination against hepatitis A and B for those with hepatitis C',
      'Lifestyle changes (avoiding alcohol, maintaining healthy weight)',
      'Liver transplantation for end-stage liver disease'
    ],
    preventions: [
      'Hepatitis B vaccine (highly effective)',
      'No vaccine for hepatitis C',
      'Safe sex practices',
      'Avoiding sharing needles or personal items that may contain blood',
      'Screening of blood and organ donors',
      'Proper infection control in healthcare settings',
      'Screening pregnant women for hepatitis B'
    ],
    relatedConditions: ['cirrhosis', 'liver-cancer', 'liver-failure', 'hepatitis-a', 'hepatitis-d', 'hepatitis-e'],
    commonQuestions: [
      {
        question: 'What is the difference between hepatitis B and C?',
        answer: 'While both are viral infections affecting the liver, they differ in transmission, progression, and prevention. Hepatitis B spreads through blood and body fluids, has a vaccine for prevention, and most adults clear the infection naturally. Hepatitis C primarily spreads through blood, has no vaccine, and more commonly becomes chronic (75-85% of cases). Treatment approaches also differ, with hepatitis C now being curable in most cases with direct-acting antivirals.'
      },
      {
        question: 'Can hepatitis B or C be cured?',
        answer: 'Hepatitis B typically cannot be completely cured, but it can be effectively managed with medications that suppress the virus. About 90% of healthy adults clear hepatitis B naturally without treatment. Hepatitis C, on the other hand, can now be cured in more than 95% of cases with an 8-12 week course of direct-acting antiviral medications, representing a major medical breakthrough in recent years.'
      }
    ],
    emergencySigns: [
      'Severe abdominal pain and swelling',
      'Persistent vomiting',
      'Significant jaundice (deep yellowing of skin and eyes)',
      'Confusion or drowsiness',
      'Bleeding easily or bruising',
      'Dark or bloody stool'
    ],
    prevalence: 'Globally, an estimated 296 million people live with chronic hepatitis B, and 58 million with chronic hepatitis C. Together they account for over 1 million deaths annually from complications like cirrhosis and liver cancer.',
    affectedGroups: [
      'People who inject drugs',
      'Men who have sex with men (particularly for hepatitis B)',
      'Healthcare workers',
      'People born to mothers with hepatitis B',
      'People born between 1945-1965 (baby boomers) for hepatitis C in the US',
      'People who received blood transfusions before screening was implemented',
      'People from regions with high hepatitis B or C prevalence'
    ]
  },
  {
    id: 'hypertension',
    name: 'Hypertension',
    description: 'A common condition where the long-term force of blood against artery walls is high enough to eventually cause health problems, such as heart disease.',
    category: 'heart-and-circulation',
    symptoms: [
      'Often no symptoms (known as the "silent killer")',
      'Headaches (particularly in severe cases)',
      'Shortness of breath',
      'Nosebleeds',
      'Dizziness or lightheadedness',
      'Visual changes',
      'Facial flushing',
      'Blood spots in the eyes (subconjunctival hemorrhage)'
    ],
    causes: [
      'Genetic factors',
      'Age (risk increases with age)',
      'Unhealthy diet (high sodium, low potassium)',
      'Physical inactivity',
      'Obesity or overweight',
      'Excessive alcohol consumption',
      'Tobacco use',
      'Stress',
      'Chronic kidney disease',
      'Sleep apnea',
      'Adrenal and thyroid disorders',
      'Certain medications (decongestants, pain relievers, birth control pills)'
    ],
    treatments: [
      'Lifestyle changes (diet, exercise, weight loss)',
      'Diuretics (water pills)',
      'ACE inhibitors',
      'Angiotensin II receptor blockers (ARBs)',
      'Calcium channel blockers',
      'Beta-blockers',
      'Renin inhibitors',
      'Alpha blockers',
      'Alpha-2 receptor agonists',
      'Central agonists',
      'Peripheral adrenergic inhibitors',
      'Vasodilators'
    ],
    preventions: [
      'DASH diet (Dietary Approaches to Stop Hypertension)',
      'Reducing sodium intake',
      'Regular physical activity',
      'Maintaining a healthy weight',
      'Limiting alcohol consumption',
      'Avoiding tobacco use',
      'Managing stress',
      'Regular blood pressure monitoring',
      'Adequate sleep'
    ],
    relatedConditions: [
      'heart-disease',
      'heart-attack',
      'stroke',
      'heart-failure',
      'aneurysm',
      'kidney-disease',
      'metabolic-syndrome',
      'diabetes'
    ],
    commonQuestions: [
      {
        question: 'What numbers indicate high blood pressure?',
        answer: 'Blood pressure is measured using two numbers: systolic pressure (top number) and diastolic pressure (bottom number). Normal blood pressure is below 120/80 mm Hg. Elevated blood pressure is 120-129 systolic and less than 80 diastolic. Stage 1 hypertension is 130-139 systolic or 80-89 diastolic. Stage 2 hypertension is 140/90 mm Hg or higher. A hypertensive crisis requiring immediate medical attention is a reading above 180/120 mm Hg.'
      },
      {
        question: 'How often should I check my blood pressure?',
        answer: 'If your blood pressure is normal (less than 120/80 mm Hg), it\'s recommended to check it at least once every 1-2 years. For those with elevated blood pressure or risk factors, more frequent monitoring may be advised. Those diagnosed with hypertension should check as recommended by their healthcare provider, often daily or weekly at home. Always use a properly calibrated device and maintain consistent measurement conditions.'
      },
      {
        question: 'Can hypertension be cured?',
        answer: 'For most people with primary (essential) hypertension, there is no cure. However, it can be effectively managed with lifestyle modifications and medications. Secondary hypertension, caused by an underlying condition, may sometimes be cured by treating the primary cause. Even when not curable, proper management can help maintain normal blood pressure levels and prevent complications.'
      }
    ],
    emergencySigns: [
      'Blood pressure reading above 180/120 mm Hg',
      'Severe headache',
      'Severe chest pain',
      'Severe shortness of breath',
      'Vision problems',
      'Difficulty speaking',
      'Weakness or numbness in limbs',
      'Severe anxiety'
    ],
    prevalence: 'Hypertension affects approximately 1.28 billion adults aged 30-79 worldwide. In the United States, about 47% of adults (116 million people) have hypertension.',
    affectedGroups: [
      'Older adults',
      'African Americans (higher rates and earlier onset)',
      'People with family history of hypertension',
      'People who are overweight or obese',
      'Those with unhealthy lifestyles (high sodium diet, physical inactivity, tobacco use, excessive alcohol)',
      'Individuals with chronic conditions like diabetes or kidney disease'
    ]
  },
  {
    id: 'inflammatory-bowel-disease',
    name: 'Inflammatory Bowel Disease',
    description: 'A group of chronic disorders that cause inflammation in the digestive tract, primarily including Crohn\'s disease and ulcerative colitis.',
    category: 'digestive-health',
    symptoms: [
      'Persistent diarrhea',
      'Abdominal pain and cramping',
      'Blood in stool',
      'Fatigue',
      'Reduced appetite',
      'Unintended weight loss',
      'Fever',
      'Urgency to defecate',
      'Feeling of incomplete bowel movement',
      'Extra-intestinal symptoms (joint pain, skin problems, eye inflammation)'
    ],
    causes: [
      'Autoimmune reaction',
      'Genetic factors',
      'Environmental triggers',
      'Abnormal immune response to gut bacteria',
      'Smoking (increases risk for Crohn\'s disease)',
      'Nonsteroidal anti-inflammatory drugs',
      'Diet high in fat or refined foods',
      'Stress (may worsen symptoms but doesn\'t cause IBD)'
    ],
    treatments: [
      'Anti-inflammatory drugs (aminosalicylates, corticosteroids)',
      'Immunosuppressants',
      'Biologics (TNF inhibitors, integrin receptor antagonists, interleukin inhibitors)',
      'Antibiotics for infections or fistulas',
      'Antidiarrheal medications',
      'Pain relievers',
      'Nutritional supplements',
      'Surgery for severe cases',
      'Dietary modifications'
    ],
    preventions: [
      'No proven prevention strategies',
      'Quitting smoking (especially for Crohn\'s disease)',
      'Anti-inflammatory diet',
      'Regular exercise',
      'Stress management',
      'Avoiding NSAIDs if diagnosed with IBD',
      'Taking prescribed medications consistently'
    ],
    relatedConditions: [
      'crohns-disease',
      'ulcerative-colitis',
      'colorectal-cancer',
      'arthritis',
      'primary-sclerosing-cholangitis',
      'ankylosing-spondylitis',
      'psoriasis'
    ],
    commonQuestions: [
      {
        question: 'What\'s the difference between Crohn\'s disease and ulcerative colitis?',
        answer: 'While both are forms of inflammatory bowel disease, they affect different parts of the digestive tract in different ways. Crohn\'s disease can affect any part of the digestive tract from mouth to anus, with inflammation that extends deep into affected tissues and can skip areas (leaving patches of healthy tissue between inflamed areas). Ulcerative colitis is limited to the colon (large intestine) and rectum, with continuous inflammation that affects only the innermost lining of the colon.'
      },
      {
        question: 'Is IBD the same as IBS?',
        answer: 'No, IBD (inflammatory bowel disease) and IBS (irritable bowel syndrome) are different conditions. IBD is characterized by inflammation of the digestive tract that can cause tissue damage and includes Crohn\'s disease and ulcerative colitis. IBS is a functional disorder that affects how the intestines work but doesn\'t cause inflammation or tissue damage. While symptoms may overlap, IBS is generally less severe and doesn\'t cause bleeding or increased inflammatory markers in blood tests.'
      },
      {
        question: 'Can diet control IBD?',
        answer: 'Diet alone cannot cure IBD, but it plays an important role in managing symptoms and maintaining nutrition. Certain foods may trigger symptoms in some individuals, so identifying and avoiding personal trigger foods can help. During flares, low-fiber, low-residue diets may reduce symptoms. Some patients benefit from specific approaches like the Specific Carbohydrate Diet or Mediterranean Diet. However, dietary management should complement, not replace, medical treatment prescribed by healthcare providers.'
      }
    ],
    emergencySigns: [
      'Severe, persistent abdominal pain',
      'High fever',
      'Significant rectal bleeding or passing large amounts of blood',
      'Severe diarrhea that leads to dehydration',
      'Inability to keep down liquids',
      'New or worsening symptoms while on treatment'
    ],
    prevalence: 'IBD affects approximately 3 million adults in the United States (1.3% of the population) and is increasing globally, especially in developing countries adopting Western lifestyles.',
    affectedGroups: [
      'Adults between 15-35 years old (peak onset age)',
      'Those with family history of IBD',
      'People of European descent (though rates are increasing in all ethnic groups)',
      'Ashkenazi Jewish population',
      'People living in urban areas or industrialized countries',
      'Smokers (for Crohn\'s disease)'
    ]
  },
  {
    id: 'insomnia',
    name: 'Insomnia',
    description: 'A common sleep disorder that makes it difficult to fall asleep, stay asleep, or get enough quality sleep, despite having the opportunity to do so.',
    category: 'brain-and-nerves',
    subcategory: 'sleep-disorders',
    symptoms: [
      'Difficulty falling asleep',
      'Waking up during the night and having trouble returning to sleep',
      'Waking up too early',
      'Not feeling well-rested after sleep',
      'Daytime tiredness or sleepiness',
      'Irritability, depression, or anxiety',
      'Difficulty paying attention or focusing',
      'Increased errors or accidents',
      'Ongoing worries about sleep'
    ],
    causes: [
      'Stress, anxiety, or worry',
      'Depression or other mental health disorders',
      'Medical conditions (chronic pain, cancer, diabetes, heart disease, asthma, GERD, Parkinson\'s disease, Alzheimer\'s disease)',
      'Medications (antidepressants, corticosteroids, thyroid hormone, high blood pressure medications, some contraceptives)',
      'Caffeine, nicotine, or alcohol consumption',
      'Poor sleep habits or environment',
      'Eating too much late in the evening',
      'Shift work or travel disrupting circadian rhythms',
      'Aging (changes in sleep patterns and health)'
    ],
    treatments: [
      'Cognitive behavioral therapy for insomnia (CBT-I)',
      'Sleep hygiene education',
      'Sleep restriction',
      'Stimulus control therapy',
      'Relaxation techniques',
      'Prescription medications (benzodiazepines, non-benzodiazepine hypnotics, melatonin receptor agonists, orexin receptor antagonists)',
      'Over-the-counter sleep aids',
      'Melatonin supplements',
      'Treating underlying conditions'
    ],
    preventions: [
      'Maintaining a regular sleep schedule',
      'Creating a comfortable sleep environment',
      'Limiting screen time before bed',
      'Avoiding caffeine, nicotine, and alcohol before bedtime',
      'Regular physical activity (but not too close to bedtime)',
      'Avoiding large meals and beverages before bed',
      'Managing stress through relaxation techniques',
      'Limiting daytime naps'
    ],
    relatedConditions: [
      'anxiety-disorders',
      'depression',
      'sleep-apnea',
      'restless-leg-syndrome',
      'chronic-pain',
      'gerd',
      'hyperthyroidism'
    ],
    commonQuestions: [
      {
        question: 'How much sleep do I really need?',
        answer: 'Sleep needs vary by age and individual factors. Generally, adults need 7-9 hours of quality sleep per night, teenagers need 8-10 hours, school-age children need 9-12 hours, and infants and toddlers need even more. The quality of sleep is as important as quantity. If you feel well-rested and function well during the day, you\'re probably getting enough sleep, even if it\'s slightly outside the recommended range.'
      },
      {
        question: 'Is it harmful to use sleep medications regularly?',
        answer: 'While sleep medications can be effective for short-term insomnia, long-term use can lead to tolerance (needing higher doses), dependence, and side effects including daytime drowsiness, confusion, and increased risk of falls. Most sleep experts recommend using medications as a short-term solution while addressing underlying causes and developing good sleep habits. Always use sleep medications under medical supervision and discuss long-term management with your healthcare provider.'
      },
      {
        question: 'Can insomnia go away on its own?',
        answer: 'Acute or short-term insomnia often resolves when the triggering stress or event passes. However, chronic insomnia (lasting more than three months) typically doesn\'t go away without intervention. If left untreated, chronic insomnia can contribute to serious health problems including depression, heart disease, and diabetes. Fortunately, effective treatments exist, with cognitive behavioral therapy for insomnia (CBT-I) considered the first-line treatment with long-lasting benefits.'
      }
    ],
    prevalence: 'Insomnia affects approximately 10-30% of adults worldwide. About 35% of adults report occasional insomnia symptoms, while 10% have chronic insomnia disorder.',
    affectedGroups: [
      'Women (1.5 times more likely than men)',
      'Adults over 60',
      'People with mental health disorders',
      'People with certain medical conditions',
      'Shift workers',
      'Those experiencing major life stresses or trauma',
      'Pregnant women'
    ]
  }
];

export default conditionsGtoI;
