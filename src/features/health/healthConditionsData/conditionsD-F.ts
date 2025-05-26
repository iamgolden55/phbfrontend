import { HealthCondition } from '../healthConditionsData';

/**
 * Health conditions starting with letters D-F
 */
export const conditionsDtoF: HealthCondition[] = [
  {
    id: 'endometriosis',
    name: 'Endometriosis',
    description: 'A chronic inflammatory condition where tissue similar to the lining of the uterus (endometrium) grows outside the uterine cavity.[1] These growths, called endometrial implants, most commonly occur on the ovaries, fallopian tubes, pelvic peritoneum, and bowel.[2] The condition affects approximately 10% of reproductive-age women worldwide and is a leading cause of pelvic pain and infertility.[3] Despite its prevalence, endometriosis is often underdiagnosed, with an average delay of 7-10 years from symptom onset to diagnosis.[4]',
    category: 'reproductive-health',
    subcategory: 'gynecological-disorders',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Endometriosis',
    symptoms: [
      'Painful periods (dysmenorrhea)',
      'Chronic pelvic pain',
      'Pain during or after sexual intercourse (dyspareunia)',
      'Pain with bowel movements or urination, particularly during menstruation',
      'Excessive bleeding during periods or between periods',
      'Infertility or difficulty becoming pregnant',
      'Fatigue',
      'Bloating and nausea',
      'Diarrhea or constipation, especially during menstrual periods',
      'Lower back pain that may occur at any time',
      'Symptoms may vary widely in severity and don\'t necessarily correlate with the extent of the disease'
    ],
    causes: [
      'Retrograde menstruation (menstrual blood flowing back through the fallopian tubes)',
      'Cellular metaplasia (cells outside the uterus transform into endometrial-like cells)',
      'Embryonic cell transformation (embryonic cells develop into endometrial tissue)',
      'Surgical scar implantation (during surgeries like C-section or hysterectomy)',
      'Endometrial cell transport (through blood vessels or lymphatic system)',
      'Immune system dysfunction',
      'Genetic factors (family history increases risk)',
      'Environmental factors (including exposure to certain chemicals)'
    ],
    treatments: [
      'Pain management:',
      'Nonsteroidal anti-inflammatory drugs (NSAIDs)',
      'Hormonal therapies:',
      'Combined hormonal contraceptives (pills, patches, rings)',
      'Progestins (pills, IUDs, implants, injections)',
      'Gonadotropin-releasing hormone (GnRH) agonists and antagonists',
      'Aromatase inhibitors',
      'Surgical treatments:',
      'Laparoscopic excision or ablation of endometriosis lesions',
      'Removal of endometriomas (ovarian cysts)',
      'Hysterectomy with or without oophorectomy (in severe cases)',
      'Complementary approaches:',
      'Physical therapy for pelvic pain',
      'Acupuncture',
      'Dietary modifications',
      'Exercise',
      'Cognitive behavioral therapy',
      'Fertility treatments for those trying to conceive'
    ],
    preventions: [
      'No known definitive prevention methods',
      'Factors that may reduce risk:',
      'Regular exercise',
      'Maintaining a healthy weight',
      'Avoiding large amounts of alcohol and caffeine',
      'Reducing exposure to environmental toxins',
      'Pregnancy and breastfeeding (may temporarily suppress symptoms)',
      'Early diagnosis and treatment to prevent progression'
    ],
    relatedConditions: [
      'adenomyosis',
      'uterine-fibroids',
      'pelvic-inflammatory-disease',
      'irritable-bowel-syndrome',
      'interstitial-cystitis',
      'fibromyalgia',
      'autoimmune-disorders',
      'certain-cancers (rare association)'
    ],
    commonQuestions: [
      {
        question: 'Does endometriosis always cause infertility?',
        answer: 'No, endometriosis does not always cause infertility, though it is associated with fertility challenges. Approximately 30-50% of women with endometriosis experience infertility, but many women with the condition can and do conceive naturally. The relationship between endometriosis and fertility is complex and depends on several factors including the severity and location of endometriosis lesions, whether the condition has affected the ovaries or fallopian tubes, the presence of adhesions (scar tissue), and other individual factors. Endometriosis may impact fertility through mechanisms such as distorted pelvic anatomy, altered immune function, impaired egg quality, compromised implantation, and inflammation. For women with endometriosis who are trying to conceive, treatment options range from surgical removal of endometriosis lesions to fertility treatments like intrauterine insemination (IUI) or in vitro fertilization (IVF). The approach depends on the woman\'s age, the severity of endometriosis, duration of infertility, and other fertility factors.'
      },
      {
        question: 'Is endometriosis just "bad period pain"?',
        answer: 'No, endometriosis is much more than "bad period pain." While painful periods (dysmenorrhea) are a common symptom, endometriosis is a complex, chronic inflammatory condition where tissue similar to the uterine lining grows outside the uterus. The pain of endometriosis can be debilitating and is often not limited to menstruation—many women experience pain throughout their cycle, during sexual intercourse, or with bowel movements and urination. Beyond pain, endometriosis can cause a range of other symptoms including heavy or irregular bleeding, fatigue, digestive issues, and infertility. The condition can significantly impact quality of life, affecting relationships, work productivity, mental health, and daily activities. Unfortunately, the misconception that endometriosis is just severe menstrual pain contributes to diagnostic delays, with many women\'s symptoms being dismissed or normalized. This highlights the importance of increased awareness and education about this condition among both the public and healthcare providers.'
      },
      {
        question: 'Can endometriosis be cured?',
        answer: 'Currently, there is no definitive cure for endometriosis. It is considered a chronic condition that requires ongoing management. While treatments can effectively control symptoms and slow disease progression, endometriosis often recurs after treatment, particularly after conservative surgeries that preserve the uterus and ovaries. The only procedure that completely eliminates endometriosis is a total hysterectomy with removal of both ovaries and all visible endometriosis lesions, but even this is not guaranteed to resolve all symptoms, especially if microscopic disease remains. Additionally, this approach causes surgical menopause and eliminates the possibility of future pregnancy, making it inappropriate for many women, particularly those of reproductive age who wish to preserve fertility. Most treatment approaches aim to manage symptoms, improve quality of life, preserve fertility when desired, and slow disease progression through a combination of pain management, hormonal therapies, surgical interventions, and lifestyle modifications. Research into more effective treatments and potential cures continues, with promising developments in understanding the genetic and immunological aspects of the disease.'
      }
    ],
    emergencySigns: [
      'Severe, acute pelvic pain that doesn\'t respond to usual pain management',
      'Signs of ruptured endometrioma (sudden, sharp abdominal pain)',
      'Symptoms of bowel or urinary obstruction',
      'Heavy vaginal bleeding requiring more than one pad or tampon per hour',
      'Signs of infection (fever, chills) after endometriosis surgery'
    ],
    prevalence: 'Endometriosis affects approximately 10% of reproductive-age women worldwide, which translates to roughly 190 million women globally. The actual prevalence may be higher due to underdiagnosis. Studies show that endometriosis is present in 25-50% of women with infertility and 70-90% of women with chronic pelvic pain. The condition can affect women of any age after puberty, though it is most commonly diagnosed between ages 25-35. There is often a significant delay in diagnosis, averaging 7-10 years from symptom onset.',
    affectedGroups: [
      'Women of reproductive age (typically ages 15-49)',
      'Those with a family history of endometriosis (7-10 times higher risk)',
      'Women who have never given birth',
      'Women with shorter menstrual cycles or longer periods',
      'Women with certain anatomical abnormalities of the reproductive tract',
      'Those with immune system disorders',
      'Individuals assigned female at birth with retrograde menstruation'
    ],
    references: [
      {
        id: '1',
        text: 'Zondervan KT, Becker CM, Missmer SA. (2020). "Endometriosis". New England Journal of Medicine. 382 (13): 1244-1256.',
        url: 'https://doi.org/10.1056/NEJMra1810764'
      },
      {
        id: '2',
        text: 'Giudice LC. (2010). "Clinical practice. Endometriosis". New England Journal of Medicine. 362 (25): 2389-2398.',
        url: 'https://doi.org/10.1056/NEJMcp1000274'
      },
      {
        id: '3',
        text: 'As-Sanie S, Black R, Giudice LC, et al. (2019). "Assessing research gaps and unmet needs in endometriosis". American Journal of Obstetrics and Gynecology. 221 (2): 86-94.',
        url: 'https://doi.org/10.1016/j.ajog.2019.02.033'
      },
      {
        id: '4',
        text: 'Agarwal SK, Chapron C, Giudice LC, et al. (2019). "Clinical diagnosis of endometriosis: a call to action". American Journal of Obstetrics and Gynecology. 220 (4): 354.e1-354.e12.',
        url: 'https://doi.org/10.1016/j.ajog.2018.12.039'
      },
      {
        id: '5',
        text: 'Dunselman GA, Vermeulen N, Becker C, et al. (2014). "ESHRE guideline: management of women with endometriosis". Human Reproduction. 29 (3): 400-412.',
        url: 'https://doi.org/10.1093/humrep/det457'
      }
    ]
  },
  {
    id: 'diarrheal-diseases',
    name: 'Diarrheal Diseases',
    description: 'A group of conditions characterized by loose, watery stools occurring more frequently than normal (typically three or more loose/liquid stools per day), often caused by viral, bacterial, or parasitic infections.[1] Diarrheal disease is the third leading cause of death in children under 5 years old[2] and can result in severe dehydration if untreated.[3] The condition can negatively impact both physical fitness and mental development, particularly in children.[4]',
    category: 'digestive-health',
    subcategory: 'infectious-diarrhea',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Diarrhea',
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
    references: [
      {
        id: '1',
        text: 'World Health Organization. (2023). "Diarrhoeal disease". WHO Fact Sheet.',
        url: 'https://www.who.int/news-room/fact-sheets/detail/diarrhoeal-disease'
      },
      {
        id: '2',
        text: 'GBD 2016 Diarrhoeal Disease Collaborators. (2018). "Estimates of the global, regional, and national morbidity, mortality, and aetiologies of diarrhoea in 195 countries: a systematic analysis for the Global Burden of Disease Study 2016". The Lancet Infectious Diseases, 18(11), 1211-1228.',
        url: 'https://doi.org/10.1016/S1473-3099(18)30362-1'
      },
      {
        id: '3',
        text: 'Shane AL, Mody RK, Crump JA, et al. (2017). "2017 Infectious Diseases Society of America Clinical Practice Guidelines for the Diagnosis and Management of Infectious Diarrhea". Clinical Infectious Diseases, 65(12), e45-e80.',
        url: 'https://doi.org/10.1093/cid/cix669'
      },
      {
        id: '4',
        text: 'Guerrant RL, DeBoer MD, Moore SR, Scharf RJ, Lima AA. (2013). "The impoverished gut—a triple burden of diarrhoea, stunting and chronic disease". Nature Reviews Gastroenterology & Hepatology, 10(4), 220-229.',
        url: 'https://doi.org/10.1038/nrgastro.2012.239'
      },
      {
        id: '5',
        text: 'Kotloff KL, Nataro JP, Blackwelder WC, et al. (2013). "Burden and aetiology of diarrhoeal disease in infants and young children in developing countries (the Global Enteric Multicenter Study, GEMS): a prospective, case-control study". The Lancet, 382(9888), 209-222.',
        url: 'https://doi.org/10.1016/S0140-6736(13)60844-2'
      }
    ],
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
    id: 'deep-vein-thrombosis',
    name: 'Deep Vein Thrombosis (DVT)',
    description: 'A condition that occurs when a blood clot (thrombus) forms in one or more of the deep veins in the body, most commonly in the legs.[1] Deep vein thrombosis can cause leg pain or swelling, but can also occur without any symptoms.[2] If the blood clot breaks loose, it can travel through the bloodstream and lodge in the lungs, blocking blood flow (pulmonary embolism), which can be life-threatening.[3] DVT is a serious condition that requires prompt medical attention and treatment.[4]',
    category: 'heart-and-circulation',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Deep_vein_thrombosis',
    symptoms: [
      'Swelling in the affected leg (less commonly, both legs)',
      'Pain in the leg, often starting in the calf',
      'Red or discolored skin on the leg',
      'Feeling of warmth in the affected leg',
      'Visible surface veins',
      'Leg fatigue',
      'Note: About 50% of people with DVT have no symptoms at all'
    ],
    causes: [
      'Prolonged immobility (long trips, bed rest)',
      'Injury or surgery',
      'Pregnancy and childbirth',
      'Hormone therapy or birth control pills',
      'Cancer and cancer treatments',
      'Genetic blood clotting disorders (e.g., Factor V Leiden)',
      'Previous history of DVT or pulmonary embolism',
      'Advanced age',
      'Obesity',
      'Smoking',
      'Heart failure',
      'Inflammatory bowel disease',
      'COVID-19 infection'
    ],
    treatments: [
      'Anticoagulant medications (blood thinners) like heparin, warfarin, or direct oral anticoagulants',
      'Thrombolytic therapy (clot dissolvers) for severe cases',
      'Inferior vena cava (IVC) filters for those who can\'t take anticoagulants',
      'Compression stockings to prevent swelling and reduce risk of complications',
      'Elevation of the affected limb',
      'Surgical thrombectomy (removal of clot) in extreme cases',
      'Treatment of underlying conditions'
    ],
    preventions: [
      'Regular movement during long trips or periods of sitting',
      'Compression stockings during high-risk situations',
      'Anticoagulant medications for high-risk individuals',
      'Early ambulation after surgery',
      'Maintaining a healthy weight',
      'Regular exercise',
      'Quitting smoking',
      'Staying hydrated',
      'Avoiding tight clothing that restricts blood flow',
      'Preventative anticoagulants after certain surgeries',
      'Pneumatic compression devices during hospitalization'
    ],
    relatedConditions: [
      'pulmonary-embolism',
      'post-thrombotic-syndrome',
      'chronic-venous-insufficiency',
      'may-thurner-syndrome',
      'protein-c-deficiency',
      'protein-s-deficiency',
      'factor-v-leiden',
      'prothrombin-gene-mutation',
      'antiphospholipid-syndrome'
    ],
    commonQuestions: [
      {
        question: 'How serious is a DVT?',
        answer: 'A deep vein thrombosis (DVT) is a serious medical condition that requires prompt treatment. While the clot itself can cause damage to the vein and surrounding tissues, the most significant danger is that the clot could break loose and travel to the lungs, causing a pulmonary embolism (PE). PE is a potentially life-threatening emergency that can cause severe damage to the lungs and other organs due to reduced oxygen in the blood. Additionally, DVT can lead to long-term complications such as post-thrombotic syndrome, which causes chronic pain, swelling, and skin changes in the affected limb. The severity depends on the size and location of the clot, pre-existing health conditions, and how quickly treatment is initiated. With proper and timely treatment, many people recover completely from DVT, but it often requires several months of medication and monitoring.'
      },
      {
        question: 'How long does it take for a DVT to dissolve with treatment?',
        answer: 'With appropriate anticoagulant (blood thinner) treatment, a deep vein thrombosis (DVT) doesn\'t actually dissolve immediately but becomes stabilized, preventing it from growing larger or breaking off. The body\'s natural clot dissolution process (fibrinolysis) then works to gradually break down the clot. The timeline varies significantly between individuals: Small clots may dissolve within a few weeks. Larger clots can take 3-6 months to resolve completely. Some very large clots may never dissolve entirely, though they become adherent to the vein wall and less dangerous over time. During treatment, symptom improvement often occurs within days to weeks, even though the clot itself is still present. Pain and swelling typically decrease within 1-2 weeks as collateral circulation develops. Most patients require anticoagulant therapy for at least 3 months, sometimes longer depending on risk factors. For particularly severe or life-threatening clots, thrombolytic therapy (clot-busting drugs) might be used, which can dissolve clots more quickly but carries increased bleeding risks.'
      },
      {
        question: 'Can I fly with a DVT?',
        answer: 'Flying with a diagnosed DVT (deep vein thrombosis) is generally not recommended in the early stages of diagnosis and treatment. Air travel involves prolonged sitting in a confined space with reduced mobility and lower cabin pressure, which can increase the risk of clot progression or embolization (breaking off and traveling to the lungs). If you have been diagnosed with a DVT, you should: Wait until your treatment has stabilized the clot, typically at least 2-4 weeks after starting anticoagulation therapy. Consult with your healthcare provider before planning any air travel. They can provide personalized advice based on your specific situation, clot location, and treatment progress. If your doctor approves travel, they may recommend: Taking your anticoagulant medication exactly as prescribed before and during travel. Wearing properly fitted compression stockings. Getting an aisle seat to facilitate movement. Standing, stretching, and walking every 1-2 hours during the flight. Staying well-hydrated and avoiding alcohol. In some cases, your doctor might recommend a temporary adjustment to your anticoagulant regimen before flying. Never make travel plans against medical advice if you have a recently diagnosed DVT, as the risk of pulmonary embolism is highest in the early weeks after clot formation.'
      }
    ],
    emergencySigns: [
      'Sudden shortness of breath',
      'Chest pain that worsens with deep breathing',
      'Coughing up blood',
      'Rapid or irregular heartbeat',
      'Lightheadedness or fainting',
      'Severe swelling that develops suddenly',
      'Extreme pain in the leg',
      'Bluish discoloration of the limb',
      'Stroke-like symptoms (if clot travels to the brain)'
    ],
    prevalence: 'Deep vein thrombosis affects approximately 1-2 people per 1,000 annually in the general population. The incidence increases dramatically with age, rising from about 1 in 10,000 for people in their 20s to 1 in 100 for people in their 80s. In the United States, it\'s estimated that 60,000-100,000 people die annually from DVT/PE, and 10-30% of people with DVT/PE die within one month of diagnosis.',
    affectedGroups: [
      'Adults over 60 years of age',
      'Hospitalized patients, especially after surgery',
      'People with limited mobility or paralysis',
      'Cancer patients',
      'Pregnant women and women who recently gave birth',
      'Women taking estrogen-containing contraceptives or hormone replacement therapy',
      'People with inherited blood clotting disorders',
      'Overweight and obese individuals',
      'Smokers',
      'People with previous history of DVT or PE',
      'Individuals with certain chronic illnesses (heart disease, lung disease, inflammatory bowel disease)'
    ],
    references: [
      {
        id: '1',
        text: 'Di Nisio M, van Es N, Büller HR. (2016). "Deep vein thrombosis and pulmonary embolism". Lancet. 388 (10063): 3060-3073.',
        url: 'https://doi.org/10.1016/S0140-6736(16)30514-1'
      },
      {
        id: '2',
        text: 'Cushman M. (2007). "Epidemiology and risk factors for venous thrombosis". Seminars in Hematology. 44 (2): 62-69.',
        url: 'https://doi.org/10.1053/j.seminhematol.2007.02.004'
      },
      {
        id: '3',
        text: 'Kearon C, Akl EA, Ornelas J, et al. (2016). "Antithrombotic Therapy for VTE Disease: CHEST Guideline and Expert Panel Report". Chest. 149 (2): 315-352.',
        url: 'https://doi.org/10.1016/j.chest.2015.11.026'
      },
      {
        id: '4',
        text: 'Heit JA, Spencer FA, White RH. (2016). "The epidemiology of venous thromboembolism". Journal of Thrombosis and Thrombolysis. 41 (1): 3-14.',
        url: 'https://doi.org/10.1007/s11239-015-1311-6'
      },
      {
        id: '5',
        text: 'Anderson FA Jr, Spencer FA. (2003). "Risk factors for venous thromboembolism". Circulation. 107 (23 Suppl 1): I9-16.',
        url: 'https://doi.org/10.1161/01.CIR.0000078469.07362.E6'
      }
    ]
  },
  {
    id: 'dyslexia',
    name: 'Dyslexia',
    description: 'A specific learning disorder that affects the brain\'s ability to process written language, characterized by difficulties with accurate and fluent word recognition, spelling, and decoding abilities.[1] Despite these challenges, dyslexia is not related to intelligence, vision problems, or lack of motivation to learn.[2] It is the most common learning disability, affecting about 5-10% of the population, and often runs in families.[3] With appropriate teaching methods and accommodations, people with dyslexia can learn successfully and excel in many areas.[4]',
    category: 'brain-and-nerves',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Dyslexia',
    symptoms: [
      'Difficulty reading fluently and accurately',
      'Slow reading speed',
      'Problems with spelling',
      'Difficulty with phonological processing (manipulating sounds in words)',
      'Trouble with rapid naming of familiar objects or colors',
      'Challenges with reading comprehension',
      'Difficulty learning letter-sound correspondences',
      'Problems with sequencing letters or numbers',
      'Avoiding reading tasks or activities',
      'Mispronouncing names or words, especially those that are unfamiliar',
      'Difficulty retrieving specific words when speaking',
      'Problems with writing and organizing written expression',
      'Challenges with time management and organization',
      'Difficulty following multi-step directions',
      'May have strengths in reasoning, problem-solving, creativity, and visual-spatial abilities'
    ],
    causes: [
      'Genetic factors (runs in families)',
      'Differences in brain structure and function, particularly in areas involved in language processing',
      'Differences in how the brain processes phonological information',
      'Heritability estimated at 40-60%',
      'Environmental factors may interact with genetic predisposition',
      'Possible neurological factors affecting connections between different brain regions'
    ],
    treatments: [
      'Structured literacy instruction with explicit, systematic phonics-based approaches',
      'Multisensory teaching methods (Orton-Gillingham, Wilson Reading System, Lindamood-Bell)',
      'Specialized educational interventions tailored to individual needs',
      'Assistive technology (text-to-speech software, speech recognition, audiobooks)',
      'Educational accommodations (extended time, alternative formats for assignments)',
      'Remediation focused on phonological awareness, decoding, fluency, and comprehension',
      'Working with specialized tutors or educational therapists',
      'Psychological support to address potential emotional and social impacts',
      'Early intervention for better outcomes'
    ],
    preventions: [
      'While dyslexia cannot be prevented, early identification and intervention can reduce its impact',
      'Early screening for children with family history of dyslexia',
      'Monitoring language development in young children',
      'Developing strong oral language skills before formal reading instruction',
      'Universal screening in early elementary school',
      'Providing appropriate educational support as soon as difficulties are identified'
    ],
    relatedConditions: [
      'dyscalculia',
      'dysgraphia',
      'developmental-language-disorder',
      'attention-deficit-hyperactivity-disorder',
      'auditory-processing-disorder',
      'specific-learning-disorder',
      'visual-processing-disorder',
      'executive-function-disorder'
    ],
    commonQuestions: [
      {
        question: 'Is dyslexia just reading words backward?',
        answer: 'No, reading words backward is not the primary characteristic of dyslexia, although it\'s a common misconception. Dyslexia is a complex learning disorder involving difficulties with accurate and fluent word recognition, poor spelling, and decoding abilities. People with dyslexia may occasionally reverse letters (like confusing \'b\' and \'d\') or transpose letters within words, but these are just some of many possible symptoms. The core difficulty in dyslexia involves phonological processing—connecting speech sounds to letters and words. This affects how individuals decode written language, making reading laborious and affecting comprehension. Other challenges may include problems with rapid naming, working memory, processing speed, and organizing written and spoken language. Each person with dyslexia has a unique pattern of strengths and weaknesses, with symptoms ranging from mild to severe.'
      },
      {
        question: 'Can dyslexia be cured?',
        answer: 'Dyslexia is not a disease or illness that can be "cured," but rather a lifelong neurological difference in how the brain processes language. It is best understood as a different pattern of brain organization and function that has both challenges and strengths. While dyslexia cannot be cured, its impact can be significantly reduced through appropriate evidence-based interventions and accommodations. Structured literacy programs, multisensory teaching methods, and assistive technologies can help individuals with dyslexia become successful readers and writers. Many people with dyslexia develop effective coping strategies and compensatory skills over time. With proper support, individuals with dyslexia can achieve academic success and thrive in various careers—many become highly successful professionals, entrepreneurs, artists, and leaders. The focus should be on providing the right tools and strategies rather than seeking a cure for what is essentially a different, but equally valid, way of processing information.'
      },
      {
        question: 'How is dyslexia diagnosed?',
        answer: 'Dyslexia diagnosis typically involves a comprehensive evaluation by qualified professionals, such as psychologists, neuropsychologists, or educational specialists with expertise in learning disabilities. The process generally includes: A detailed history, including family history, developmental milestones, and educational experiences. Standardized tests of intellectual abilities to rule out intellectual disability as a cause of reading difficulties. Assessment of reading skills, including word recognition, decoding, reading fluency, and comprehension. Evaluation of phonological processing abilities, which are typically core deficits in dyslexia. Assessment of other language skills, including vocabulary and listening comprehension. Spelling and writing assessments. Additional tests of related cognitive functions like working memory, processing speed, and attention. Vision and hearing screenings to rule out sensory issues as primary causes. The diagnosis is based on establishing a pattern of strengths and weaknesses that is characteristic of dyslexia, with reading and spelling skills significantly below what would be expected based on the individual\'s age, education, and intellectual abilities. Early diagnosis (kindergarten through grade 2) is ideal, but dyslexia can be diagnosed at any age, including in adulthood.'
      }
    ],
    emergencySigns: [
      'While dyslexia itself is not a medical emergency, watch for:',
      'Severe anxiety or depression related to academic difficulties',
      'School refusal or significant distress about attending school',
      'Signs of bullying or social isolation due to learning differences',
      'Expressions of worthlessness, hopelessness, or suicidal thoughts',
      'Sudden changes in behavior or personality related to learning struggles'
    ],
    prevalence: 'Dyslexia affects approximately 5-10% of the population worldwide, making it the most common learning disability. It occurs across all cultures, socioeconomic backgrounds, and intellectual abilities. In the United States, estimates suggest that 15-20% of the population has some symptoms of dyslexia, with about 5-10% having moderate to severe manifestations that significantly impact reading acquisition and academic performance.',
    affectedGroups: [
      'Occurs in all populations and demographic groups',
      'Affects males and females, though historically more males have been identified (possibly due to referral bias)',
      'Present across all intellectual ability levels, from below average to gifted',
      'Runs in families (40-60% heritability)',
      'Often co-occurs with other neurodevelopmental conditions like ADHD (30-50% comorbidity)',
      'Can affect individuals regardless of educational opportunities or socioeconomic status',
      'Present across languages and writing systems, though manifestation may differ'
    ],
    references: [
      {
        id: '1',
        text: 'Lyon GR, Shaywitz SE, Shaywitz BA. (2003). "A definition of dyslexia". Annals of Dyslexia. 53 (1): 1-14.',
        url: 'https://doi.org/10.1007/s11881-003-0001-9'
      },
      {
        id: '2',
        text: 'Shaywitz SE, Shaywitz BA. (2005). "Dyslexia (Specific Reading Disability)". Biological Psychiatry. 57 (11): 1301-1309.',
        url: 'https://doi.org/10.1016/j.biopsych.2005.01.043'
      },
      {
        id: '3',
        text: 'Peterson RL, Pennington BF. (2015). "Developmental Dyslexia". Annual Review of Clinical Psychology. 11: 283-307.',
        url: 'https://doi.org/10.1146/annurev-clinpsy-032814-112842'
      },
      {
        id: '4',
        text: 'International Dyslexia Association. (2002). "Definition of Dyslexia".',
        url: 'https://dyslexiaida.org/definition-of-dyslexia/'
      },
      {
        id: '5',
        text: 'Ozernov-Palchik O, Gaab N. (2016). "Tackling the \'dyslexia paradox\': reading brain and behavior for early markers of developmental dyslexia". Wiley Interdisciplinary Reviews: Cognitive Science. 7 (2): 156-176.',
        url: 'https://doi.org/10.1002/wcs.1383'
      }
    ]
  },
  {
    id: 'diabetes',
    name: 'Diabetes Mellitus',
    description: 'A group of metabolic disorders characterized by high blood sugar levels over a prolonged period due to problems with insulin secretion, insulin action, or both.[1] Insulin, a hormone produced by the pancreas, regulates blood glucose by helping cells absorb glucose from the bloodstream for energy.[2] In diabetes, this process is impaired, leading to chronic high blood sugar that can cause serious health complications.[3] The main types include Type 1 (autoimmune), Type 2 (insulin resistance), and gestational diabetes (during pregnancy).[4]',
    category: 'endocrine-system',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Diabetes_mellitus',
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
    ],
    references: [
      {
        id: '1',
        text: 'American Diabetes Association. (2022). "Standards of Medical Care in Diabetes—2022". Diabetes Care. 45 (Supplement 1): S1-S264.',
        url: 'https://doi.org/10.2337/dc22-Sint'
      },
      {
        id: '2',
        text: 'Skyler JS, Bakris GL, Bonifacio E, et al. (2017). "Differentiation of Diabetes by Pathophysiology, Natural History, and Prognosis". Diabetes. 66 (2): 241-255.',
        url: 'https://doi.org/10.2337/db16-0806'
      },
      {
        id: '3',
        text: 'Zheng Y, Ley SH, Hu FB. (2018). "Global aetiology and epidemiology of type 2 diabetes mellitus and its complications". Nature Reviews Endocrinology. 14 (2): 88-98.',
        url: 'https://doi.org/10.1038/nrendo.2017.151'
      },
      {
        id: '4',
        text: 'International Diabetes Federation. (2021). "IDF Diabetes Atlas, 10th edition".',
        url: 'https://diabetesatlas.org/'
      },
      {
        id: '5',
        text: 'Atkinson MA, Eisenbarth GS, Michels AW. (2014). "Type 1 diabetes". Lancet. 383 (9911): 69-82.',
        url: 'https://doi.org/10.1016/S0140-6736(13)60591-7'
      }
    ]
  },
  {
    id: 'eczema',
    name: 'Eczema (Atopic Dermatitis)',
    description: 'A chronic inflammatory skin condition characterized by intense itching, redness, and a dry, scaly rash.[1] The most common form is atopic dermatitis, which often begins in infancy or childhood and can persist into adulthood.[2] This condition typically follows a relapsing and remitting course with flares triggered by various environmental and physiological factors.[3] Eczema is often associated with other atopic conditions such as asthma and allergic rhinitis, and is thought to result from a complex interaction between genetic, immunologic, and environmental factors.[4]',
    category: 'skin-and-hair',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Atopic_dermatitis',
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
    ],
    references: [
      {
        id: '1',
        text: 'Weidinger S, Novak N (2016). "Atopic dermatitis". Lancet. 387 (10023): 1109–1122.',
        url: 'https://doi.org/10.1016/S0140-6736(15)00149-X'
      },
      {
        id: '2',
        text: 'Eichenfield LF, Tom WL, Chamlin SL, et al. (2014). "Guidelines of care for the management of atopic dermatitis: section 1. Diagnosis and assessment of atopic dermatitis". Journal of the American Academy of Dermatology. 70 (2): 338–351.',
        url: 'https://doi.org/10.1016/j.jaad.2013.10.010'
      },
      {
        id: '3',
        text: 'Langan SM, Irvine AD, Weidinger S (2020). "Atopic dermatitis". Lancet. 396 (10247): 345–360.',
        url: 'https://doi.org/10.1016/S0140-6736(20)31286-1'
      },
      {
        id: '4',
        text: 'Kantor R, Silverberg JI (2017). "Environmental risk factors and their role in the management of atopic dermatitis". Expert Review of Clinical Immunology. 13 (1): 15–26.',
        url: 'https://doi.org/10.1080/1744666X.2016.1212660'
      },
      {
        id: '5',
        text: 'Bieber T, Traidl-Hoffmann C, Schäppi G, Lauener R, Akdis C, Schmid-Grendelmeier P (2020). "Unraveling the complexity of atopic dermatitis: The CK-CARE approach toward precision medicine". Allergy. 75 (11): 2936–2938.',
        url: 'https://doi.org/10.1111/all.14194'
      }
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
