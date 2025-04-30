import { HealthCondition } from '../healthConditionsData';

/**
 * Health conditions starting with letters D-F
 */
export const conditionsDtoF: HealthCondition[] = [
  {
    id: 'diarrheal-diseases',
    name: 'Diarrheal Diseases',
    description: 'A group of conditions characterized by loose, watery stools occurring more frequently than normal, often caused by viral, bacterial, or parasitic infections and resulting in dehydration if severe or untreated.',
    category: 'digestive',
    subcategory: 'infectious-diarrhea',
    symptoms: [
      'Loose, watery stools',
      'Abdominal cramps or pain',
      'Fever',
      'Blood in the stool',
      'Bloating',
      'Nausea',
      'Urgent need to have a bowel movement',
      'Dehydration (dry mouth, thirst, reduced urination)',
      'Weakness and fatigue',
      'Weight loss'
    ],
    causes: [
      'Viral infections (rotavirus, norovirus)',
      'Bacterial infections (E. coli, Salmonella, Shigella)',
      'Parasitic infections (Giardia, Cryptosporidium)',
      'Food or water contamination',
      'Poor sanitation and hygiene',
      'Medications (antibiotics)',
      'Food intolerances',
      'Intestinal disorders (IBD, IBS)'
    ],
    treatments: [
      'Oral rehydration solutions (ORS)',
      'Increased fluid intake',
      'Antibiotics (for bacterial causes)',
      'Antiparasitic medications',
      'Zinc supplements (especially for children)',
      'Probiotics',
      'Anti-diarrheal medications (in certain cases)',
      'Hospitalization and IV fluids for severe cases'
    ],
    preventions: [
      'Proper hand hygiene',
      'Safe food handling and preparation',
      'Clean drinking water',
      'Improved sanitation facilities',
      'Rotavirus vaccination for infants',
      'Safe travel practices in high-risk areas',
      'Breastfeeding for infants',
      'Proper disposal of human waste'
    ],
    relatedConditions: ['dysentery', 'cholera', 'gastroenteritis', 'food-poisoning', 'malnutrition'],
    commonQuestions: [
      {
        question: 'When should I seek medical attention for diarrhea?',
        answer: 'Seek medical attention if diarrhea persists for more than 2 days, is accompanied by high fever (over 39°C/102°F), contains blood or pus, causes severe pain, or leads to dehydration. For infants, children, and elderly people, medical care should be sought sooner as they\'re more vulnerable to dehydration.'
      },
      {
        question: 'What is the BRAT diet, and does it help with diarrhea?',
        answer: 'The BRAT diet (Bananas, Rice, Applesauce, Toast) is a bland diet traditionally recommended during recovery from diarrhea. While it may help ease symptoms by providing easily digestible foods that are low in fiber, modern medical advice suggests a more balanced diet that includes lean proteins and vegetables once acute symptoms improve. The BRAT diet alone lacks enough nutrients for extended use.'
      }
    ],
    emergencySigns: [
      'Severe dehydration (extreme thirst, dry mouth, little or no urination, severe weakness)',
      'Bloody diarrhea',
      'Persistent vomiting',
      'Fever above 39°C (102°F)',
      'Severe abdominal or rectal pain'
    ],
    prevalence: 'Diarrheal diseases are among the leading causes of morbidity and mortality worldwide, particularly affecting children under 5 years in developing countries. They cause approximately 1.7 billion cases annually with nearly 525,000 deaths among children under five years.',
    affectedGroups: [
      'Children under 5 years of age',
      'People in areas with poor sanitation',
      'Travelers to high-risk regions',
      'People with compromised immune systems',
      'Elderly individuals'
    ]
  },
  {
    id: 'depression',
    name: 'Depression',
    description: 'A common and serious mental health disorder that negatively affects how you feel, think, and act, causing persistent feelings of sadness and loss of interest in activities.',
    category: 'mental-health',
    subcategory: 'mood-disorders',
    symptoms: [
      'Persistent sad, anxious, or "empty" mood',
      'Loss of interest or pleasure in hobbies and activities',
      'Fatigue and decreased energy',
      'Insomnia, early-morning awakening, or oversleeping',
      'Appetite and/or weight changes',
      'Thoughts of death or suicide, or suicide attempts',
      'Restlessness or irritability',
      'Difficulty concentrating, remembering, or making decisions',
      'Physical symptoms that don\'t respond to treatment (headaches, digestive disorders, pain)'
    ],
    causes: [
      'Brain chemistry imbalances',
      'Genetic factors',
      'Biological differences in brain structure',
      'Hormonal changes',
      'Early childhood trauma or abuse',
      'Medical conditions',
      'Certain medications',
      'Substance use disorders'
    ],
    treatments: [
      'Medications (antidepressants)',
      'Psychotherapy (talk therapy)',
      'Cognitive Behavioral Therapy (CBT)',
      'Interpersonal therapy',
      'Electroconvulsive therapy (ECT) for severe cases',
      'Transcranial magnetic stimulation (TMS)',
      'Lifestyle changes',
      'Support groups'
    ],
    preventions: [
      'Stress management techniques',
      'Regular physical activity',
      'Adequate sleep',
      'Nutritious diet',
      'Avoiding alcohol and recreational drugs',
      'Maintaining social connections',
      'Seeking help early for mental health concerns'
    ],
    relatedConditions: [
      'anxiety-disorders',
      'bipolar-disorder',
      'seasonal-affective-disorder',
      'post-traumatic-stress-disorder',
      'substance-use-disorders'
    ],
    commonQuestions: [
      {
        question: 'Is depression just sadness?',
        answer: 'No, depression is much more than just feeling sad. It\'s a serious medical condition that affects how a person thinks, feels, and functions. While sadness is a normal human emotion that passes with time, depression is persistent and can significantly interfere with daily activities, relationships, and overall quality of life.'
      },
      {
        question: 'How long does depression treatment take to work?',
        answer: 'The timeline varies by individual and treatment type. Antidepressants typically take 2-4 weeks to show initial effects and 6-8 weeks for full benefits. Psychotherapy may show gradual improvement over several weeks or months. For some, a combination of treatments works best. Recovery is often a process rather than a sudden improvement.'
      },
      {
        question: 'Can depression come back after treatment?',
        answer: 'Yes, depression can recur. About 50% of people who recover from a first episode of depression may experience additional episodes. However, with ongoing treatment and proper management strategies, the risk of recurrence can be significantly reduced. Many people learn to recognize early warning signs and seek help promptly to prevent full relapses.'
      }
    ],
    emergencySigns: [
      'Suicidal thoughts or behaviors',
      'Psychotic symptoms (hallucinations or delusions)',
      'Inability to care for oneself (not eating, bathing, etc.)',
      'Severe impairment in daily functioning'
    ],
    prevalence: 'Depression affects approximately 264 million people worldwide. In the United States, about 7% of adults experience major depressive disorder in a given year.',
    affectedGroups: [
      'Women (1.5-2 times more likely than men)',
      'Young adults ages 18-25',
      'People with chronic health conditions',
      'Those with family history of depression',
      'People who have experienced trauma or major life stressors',
      'Individuals with certain personality traits (low self-esteem, overly dependent, pessimistic)'
    ]
  },
  {
    id: 'ebola-virus-disease',
    name: 'Ebola Virus Disease',
    description: 'A rare but severe, often fatal illness in humans caused by Ebola virus infection, characterized by fever, severe internal bleeding, and organ failure.',
    category: 'infectious-diseases',
    subcategory: 'viral-hemorrhagic-fevers',
    symptoms: [
      'Sudden onset of fever',
      'Severe headache',
      'Muscle pain and weakness',
      'Fatigue',
      'Sore throat',
      'Vomiting and diarrhea',
      'Rash',
      'Impaired kidney and liver function',
      'Internal and external bleeding (in some cases)',
      'Low white blood cell and platelet counts'
    ],
    causes: [
      'Infection with Ebola virus (Zaire, Sudan, Bundibugyo, Tai Forest, or Reston ebolavirus)',
      'Transmitted through direct contact with body fluids of infected people',
      'Contact with infected animals (particularly fruit bats, primates)',
      'Handling of contaminated medical equipment',
      'Contact with bodies of deceased Ebola victims during burial practices'
    ],
    treatments: [
      'Supportive care (rehydration, maintaining oxygen and blood pressure)',
      'Treatment of specific symptoms',
      'Antibiotics for secondary infections',
      'Experimental therapies (monoclonal antibody treatments)',
      'Ebola vaccines for prevention and outbreak control',
      'Isolation to prevent spread',
      'Blood transfusions and clotting factors for hemorrhage'
    ],
    preventions: [
      'Avoiding contact with infected individuals',
      'Proper hygiene and handwashing',
      'Using personal protective equipment in healthcare settings',
      'Safe burial practices',
      'Ebola vaccines for high-risk populations',
      'Contact tracing and isolation of potentially exposed individuals',
      'Avoiding consumption of bushmeat in endemic areas'
    ],
    relatedConditions: ['marburg-virus-disease', 'lassa-fever', 'crimean-congo-hemorrhagic-fever'],
    commonQuestions: [
      {
        question: 'How contagious is Ebola?',
        answer: 'Ebola is not as contagious as many other infectious diseases like measles or influenza. It spreads through direct contact with body fluids (blood, vomit, feces, urine, saliva, sweat, semen) of infected people who are showing symptoms, not through casual contact or airborne transmission. However, when transmission occurs, the virus is highly virulent with a high fatality rate.'
      },
      {
        question: 'Can Ebola survivors infect others after recovery?',
        answer: 'Ebola survivors generally develop immunity to the strain that infected them, but the virus can persist in certain body fluids (particularly semen) for months after recovery. The virus has been found in semen up to 18 months after recovery in some cases, creating a risk of sexual transmission. Survivors are advised to practice safe sex or abstinence for at least 12 months after recovery or until their semen tests negative twice.'
      }
    ],
    emergencySigns: [
      'High fever with bleeding',
      'Multiple organ failure',
      'Severe dehydration',
      'Confusion or altered mental state',
      'Seizures',
      'Shortness of breath',
      'Significant bleeding from any site'
    ],
    prevalence: 'Ebola outbreaks occur sporadically, primarily in central and western Africa. The 2014-2016 West African Ebola outbreak was the largest in history, with over 28,600 cases and 11,325 deaths across multiple countries.',
    affectedGroups: [
      'People in areas with active Ebola outbreaks',
      'Healthcare workers treating Ebola patients',
      'Family members and others in close contact with infected individuals',
      'People participating in traditional burial practices involving direct contact with bodies',
      'Laboratory workers handling specimens from infected individuals'
    ]
  },
  {
    id: 'dengue-fever',
    name: 'Dengue Fever',
    description: 'A mosquito-borne viral infection that causes a severe flu-like illness and can sometimes lead to a potentially lethal complication called severe dengue (previously known as dengue hemorrhagic fever).',
    category: 'infectious-diseases',
    subcategory: 'viral-infections',
    symptoms: [
      'High fever (40°C/104°F)',
      'Severe headache',
      'Pain behind the eyes',
      'Muscle and joint pains (breakbone fever)',
      'Nausea and vomiting',
      'Swollen glands',
      'Skin rash (appearing 2-5 days after fever)',
      'Mild bleeding (nose or gum bleeding, easy bruising)',
      'Fatigue',
      'Severe abdominal pain (in severe cases)'
    ],
    causes: [
      'Infection with dengue virus (DENV, serotypes 1-4)',
      'Transmitted primarily by female Aedes aegypti mosquitoes',
      'Also transmitted by Aedes albopictus mosquitoes',
      'Common in tropical and subtropical regions',
      'Risk increases during rainy seasons'
    ],
    treatments: [
      'No specific antiviral treatment exists',
      'Supportive care and symptom management',
      'Adequate fluid intake and rest',
      'Pain relievers with acetaminophen (avoiding aspirin and NSAIDs)',
      'Hospitalization for severe cases',
      'Blood transfusions for severe bleeding',
      'Close monitoring of blood pressure, platelets, and fluid levels'
    ],
    preventions: [
      'Using mosquito repellents containing DEET, picaridin, or oil of lemon eucalyptus',
      'Wearing long-sleeved clothing',
      'Using mosquito nets while sleeping',
      'Installing window and door screens',
      'Eliminating mosquito breeding sites (standing water)',
      'Community mosquito control measures',
      'Dengue vaccines (available in some countries for those previously infected)'
    ],
    relatedConditions: ['yellow-fever', 'zika-virus', 'chikungunya', 'malaria'],
    commonQuestions: [
      {
        question: 'Can dengue fever be transmitted from person to person?',
        answer: 'Dengue fever is not contagious and cannot be spread directly from person to person. It requires a mosquito vector to transmit the virus from one person to another. The mosquito becomes infected when it bites a person with dengue virus in their blood and can then transmit the virus to other people through subsequent bites.'
      },
      {
        question: 'Why is a second dengue infection more dangerous than the first?',
        answer: 'Second infections with a different dengue serotype can be more severe due to a phenomenon called antibody-dependent enhancement (ADE). Antibodies from the first infection can actually help the second virus infect more cells, potentially leading to severe dengue. This is why having prior exposure to dengue is a risk factor for developing severe disease with subsequent infections.'
      }
    ],
    emergencySigns: [
      'Severe abdominal pain',
      'Persistent vomiting',
      'Rapid breathing',
      'Bleeding gums or nose',
      'Blood in vomit or stool',
      'Fatigue, restlessness, or irritability',
      'Severe drop in blood pressure (shock)',
      'Cold or clammy skin'
    ],
    prevalence: 'Dengue is one of the most common mosquito-borne diseases globally, with an estimated 390 million infections annually, of which about 96 million manifest clinically. Approximately half of the world\'s population is at risk.',
    affectedGroups: [
      'People living in or traveling to tropical regions',
      'Urban populations in tropical areas',
      'Young children and elderly (higher risk of severe disease)',
      'People with previous dengue infection (risk of severe disease with different serotype)',
      'Pregnant women (risk of transmission to fetus)'
    ]
  },
  {
    id: 'diabetes',
    name: 'Diabetes',
    description: 'A chronic disease that affects how your body turns food into energy by impacting how it produces or uses insulin, resulting in too much sugar in the bloodstream.',
    category: 'endocrine-system',
    symptoms: [
      'Increased thirst and urination',
      'Extreme hunger',
      'Unexplained weight loss',
      'Fatigue',
      'Blurred vision',
      'Slow-healing sores',
      'Frequent infections',
      'Numbness or tingling in the hands or feet',
      'Areas of darkened skin, usually in the armpits and neck'
    ],
    causes: [
      'Type 1: Immune system attacks and destroys insulin-producing cells',
      'Type 2: Cells become resistant to insulin action and pancreas fails to produce enough insulin',
      'Gestational: Hormone changes during pregnancy affect insulin action',
      'Genetic predisposition',
      'Environmental factors',
      'Obesity and physical inactivity (for Type 2)',
      'Other medical conditions or medications'
    ],
    treatments: [
      'Insulin therapy (especially for Type 1)',
      'Oral or injectable medications',
      'Blood sugar monitoring',
      'Healthy eating',
      'Regular physical activity',
      'Weight management',
      'Pancreas transplantation (rare, severe cases)',
      'Bariatric surgery (for some Type 2 cases with obesity)'
    ],
    preventions: [
      'Type 1 cannot currently be prevented',
      'Type 2 and gestational:',
      'Maintaining a healthy weight',
      'Eating a balanced diet rich in fruits, vegetables, and whole grains',
      'Regular physical activity',
      'Avoiding tobacco use',
      'Limiting alcohol consumption',
      'Managing blood pressure and cholesterol levels'
    ],
    relatedConditions: [
      'obesity',
      'heart-disease',
      'kidney-disease',
      'neuropathy',
      'retinopathy',
      'hypertension',
      'metabolic-syndrome'
    ],
    commonQuestions: [
      {
        question: 'What\'s the difference between Type 1 and Type 2 diabetes?',
        answer: 'Type 1 diabetes is an autoimmune condition where the body attacks insulin-producing cells, typically appearing in childhood or adolescence and requiring insulin therapy. Type 2 diabetes develops when cells become resistant to insulin and the pancreas can\'t make enough insulin to overcome this resistance, usually appearing in adults and often related to lifestyle factors like obesity and inactivity.'
      },
      {
        question: 'Can diabetes be cured?',
        answer: 'Currently, there is no cure for diabetes. Type 1 diabetes requires lifelong insulin therapy. Type 2 diabetes can sometimes be managed through diet, exercise, and weight loss to the point where medication is no longer needed, but the underlying condition remains. Research for cures continues, including artificial pancreas technology and immunotherapy.'
      },
      {
        question: 'How does diabetes affect daily life?',
        answer: 'Living with diabetes requires daily management including monitoring blood sugar levels, taking medications or insulin, planning meals, staying physically active, and attending regular medical appointments. While it requires attention and care, most people with diabetes can lead full, active lives by maintaining good control of their condition.'
      }
    ],
    emergencySigns: [
      'Very high blood sugar (hyperglycemia) with symptoms like extreme thirst, frequent urination, dry mouth, weakness, confusion',
      'Very low blood sugar (hypoglycemia) with symptoms like shakiness, nervousness, sweating, irritability, confusion, rapid heartbeat',
      'Diabetic ketoacidosis: nausea, vomiting, stomach pain, fruity breath odor, difficulty breathing, confusion',
      'Hyperosmolar hyperglycemic state: extreme thirst, dry mouth, fever, drowsiness, confusion, vision loss'
    ],
    prevalence: 'Diabetes affects approximately 463 million adults worldwide (1 in 11), with Type 2 accounting for about 90% of cases. In the United States, over 34 million people have diabetes (10.5% of the population).',
    affectedGroups: [
      'Type 1: Children and young adults (though can occur at any age)',
      'Type 2: Adults over 45, but increasingly seen in children and teenagers',
      'People with family history of diabetes',
      'Certain ethnic groups (higher rates in African Americans, Hispanics, Native Americans, Asian Americans, Pacific Islanders)',
      'People who are overweight or obese',
      'Women who had gestational diabetes or gave birth to babies weighing over 9 pounds'
    ]
  },
  {
    id: 'eczema',
    name: 'Eczema',
    description: 'A group of conditions that cause the skin to become inflamed, itchy, red, and rough. The most common type is atopic dermatitis.',
    category: 'skin-and-hair',
    symptoms: [
      'Dry, sensitive skin',
      'Intense itching',
      'Red, inflamed skin',
      'Recurring rash',
      'Scaly patches',
      'Oozing or crusting',
      'Areas of swelling',
      'Dark colored patches of skin',
      'Rough, leathery, or scaly patches'
    ],
    causes: [
      'Genetic factors',
      'Immune system dysfunction',
      'Environmental triggers',
      'Irritants (soaps, detergents, shampoos)',
      'Allergens (dust mites, pets, pollens, mold, dandruff)',
      'Microbes (bacteria, viruses, fungi)',
      'Hot and cold temperatures',
      'Stress',
      'Hormones'
    ],
    treatments: [
      'Moisturizers',
      'Topical corticosteroids',
      'Topical calcineurin inhibitors',
      'Antihistamines for itching',
      'Oral corticosteroids (severe cases)',
      'Phototherapy (light therapy)',
      'Immunosuppressants',
      'Biologic drugs (for moderate to severe cases)',
      'Wet wraps',
      'Behavioral approaches for scratch control'
    ],
    preventions: [
      'Identifying and avoiding triggers',
      'Daily bathing and moisturizing',
      'Using mild soaps and detergents',
      'Wearing soft, breathable fabrics (cotton)',
      'Avoiding extreme temperatures',
      'Managing stress',
      'Humidifying dry indoor air',
      'Avoiding scratching'
    ],
    relatedConditions: [
      'asthma',
      'allergic-rhinitis',
      'food-allergies',
      'contact-dermatitis',
      'psoriasis'
    ],
    commonQuestions: [
      {
        question: 'Is eczema contagious?',
        answer: 'No, eczema is not contagious. You cannot catch it from someone else or spread it to others through contact. It is caused by a combination of genetic and environmental factors that affect the skin\'s barrier function and immune system responses.'
      },
      {
        question: 'Will my child outgrow eczema?',
        answer: 'Many children with eczema do experience improvement as they grow older. About 60% of children may have significant improvement or complete resolution of symptoms by adolescence. However, some continue to have symptoms into adulthood, and the condition can also appear for the first time in adults.'
      },
      {
        question: 'What\'s the connection between eczema and allergies?',
        answer: 'Eczema often occurs alongside allergic conditions like asthma, hay fever, and food allergies, forming what doctors call the "atopic march" or "allergic triad." These conditions share similar immune system mechanisms. People with eczema often have overactive immune responses to environmental triggers, though eczema itself is not an allergic reaction.'
      }
    ],
    prevalence: 'Eczema affects approximately 10-20% of children and 1-3% of adults worldwide. In the United States, about 31.6 million people (10.1% of the population) have some form of eczema.',
    affectedGroups: [
      'Infants and children (often starts before age 5)',
      'People with family history of eczema, asthma, or allergies',
      'Those living in urban areas or developed countries',
      'People in colder, drier climates',
      'Individuals with certain genetic mutations affecting skin barrier function'
    ]
  },
  {
    id: 'fibromyalgia',
    name: 'Fibromyalgia',
    description: 'A chronic disorder characterized by widespread musculoskeletal pain, fatigue, and tenderness in localized areas, often accompanied by sleep, memory, and mood issues.',
    category: 'bone-and-joint',
    symptoms: [
      'Widespread pain throughout the body',
      'Fatigue and tiredness',
      'Sleep problems',
      'Cognitive difficulties ("fibro fog")',
      'Headaches and migraines',
      'Numbness or tingling in hands and feet',
      'Irritable bowel syndrome',
      'Temporomandibular joint disorders',
      'Increased sensitivity to pain, bright lights, loud noises, and temperature changes',
      'Depression and anxiety'
    ],
    causes: [
      'Central nervous system changes (central sensitization)',
      'Genetic factors',
      'Physical or emotional trauma',
      'Infections or illnesses',
      'Hormonal imbalances',
      'Abnormal pain processing',
      'Sleep disturbances',
      'Stress and psychological factors'
    ],
    treatments: [
      'Pain medications',
      'Antidepressants',
      'Anti-seizure drugs',
      'Physical therapy',
      'Occupational therapy',
      'Cognitive behavioral therapy',
      'Stress management techniques',
      'Exercise programs (especially low-impact)',
      'Sleep management',
      'Complementary therapies (massage, acupuncture, tai chi, yoga)'
    ],
    preventions: [
      'Stress reduction',
      'Regular exercise',
      'Good sleep hygiene',
      'Maintaining a healthy lifestyle',
      'Pacing activities to avoid overexertion',
      'Early treatment of trauma or injuries',
      'Seeking prompt treatment for depression or anxiety'
    ],
    relatedConditions: [
      'chronic-fatigue-syndrome',
      'irritable-bowel-syndrome',
      'temporomandibular-joint-disorders',
      'interstitial-cystitis',
      'migraine',
      'depression',
      'anxiety-disorders'
    ],
    commonQuestions: [
      {
        question: 'Is fibromyalgia a real medical condition?',
        answer: 'Yes, fibromyalgia is a real medical condition recognized by major medical organizations worldwide, including the World Health Organization and the American College of Rheumatology. While it cannot be detected by standard laboratory tests, it causes measurable changes in how the brain and nervous system process pain signals.'
      },
      {
        question: 'Is fibromyalgia progressive or degenerative?',
        answer: 'Fibromyalgia is neither progressive nor degenerative. Unlike conditions such as multiple sclerosis or rheumatoid arthritis, it does not cause permanent damage to the joints, muscles, or internal organs. However, symptoms may fluctuate over time, with periods of flare-ups and remissions. Proper management can help reduce symptom severity.'
      },
      {
        question: 'How is fibromyalgia diagnosed?',
        answer: 'Fibromyalgia is diagnosed based on symptoms and by ruling out other conditions that might cause similar problems. The current diagnostic criteria focus on widespread pain throughout the body lasting at least three months, fatigue, sleep problems, and cognitive difficulties. There is no specific blood test or imaging study that can confirm the diagnosis.'
      }
    ],
    prevalence: 'Fibromyalgia affects approximately 2-4% of the global population, with an estimated 10 million people in the United States living with the condition.',
    affectedGroups: [
      'Women (diagnosed at nearly twice the rate of men)',
      'Middle-aged adults (most often diagnosed between ages 30-50)',
      'People with family history of fibromyalgia',
      'Those with other rheumatic conditions like rheumatoid arthritis or lupus',
      'Individuals who have experienced physical or emotional trauma'
    ]
  }
];

export default conditionsDtoF;
