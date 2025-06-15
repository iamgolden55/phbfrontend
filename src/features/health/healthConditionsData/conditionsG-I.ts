import { HealthCondition } from '../healthConditionsData';

/**
 * Health conditions starting with letters G-I
 */
export const conditionsGtoI: HealthCondition[] = [
  {
    id: 'high-blood-pressure',
    name: 'High Blood Pressure (Hypertension)',
    description: 'A common condition where the long-term force of blood against artery walls is high enough to potentially cause health problems.[1] Blood pressure is determined by the amount of blood the heart pumps and the resistance to blood flow in the arteries.[2] Hypertension typically develops over many years and often has no symptoms, but it can silently damage blood vessels and organs, particularly the heart, brain, kidneys, and eyes.[3] It is one of the most important preventable causes of premature morbidity and mortality worldwide.[4]',
    category: 'heart-and-circulation',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Hypertension',
    symptoms: [
      'Often asymptomatic ("silent killer")',
      'Headaches (particularly in the morning)',
      'Shortness of breath',
      'Nosebleeds',
      'Visual changes',
      'Chest pain',
      'Dizziness',
      'Facial flushing',
      'Blood in urine',
      'Palpitations'
    ],
    causes: [
      'Essential/primary hypertension (no identifiable cause, develops gradually)',
      'Secondary hypertension (caused by underlying conditions)',
      'Age (risk increases with age)',
      'Family history and genetic factors',
      'Obesity and excess weight',
      'Physical inactivity',
      'High sodium (salt) intake',
      'Low potassium intake',
      'Excessive alcohol consumption',
      'Tobacco use',
      'Chronic stress',
      'Certain medications (NSAIDs, decongestants, birth control pills)',
      'Chronic kidney disease',
      'Sleep apnea',
      'Thyroid or adrenal disorders'
    ],
    treatments: [
      'Lifestyle modifications (diet, exercise, stress management)',
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
      'Vasodilators',
      'Combined alpha and beta-blockers',
      'Regular blood pressure monitoring',
      'Treatment of underlying causes for secondary hypertension'
    ],
    preventions: [
      'Maintaining a healthy weight',
      'DASH diet (Dietary Approaches to Stop Hypertension)',
      'Reducing sodium intake (less than 2,300 mg a day)',
      'Increasing potassium intake (if kidney function is normal)',
      'Regular physical activity (150 minutes moderate exercise weekly)',
      'Limiting alcohol consumption',
      'Quitting smoking',
      'Managing stress',
      'Regular blood pressure checks',
      'Adequate sleep',
      'Reducing caffeine intake'
    ],
    relatedConditions: [
      'heart-disease',
      'stroke',
      'kidney-disease',
      'metabolic-syndrome',
      'heart-failure',
      'diabetes',
      'vision-loss'
    ],
    commonQuestions: [
      {
        question: 'What is considered high blood pressure?',
        answer: 'Blood pressure is measured using two numbers: systolic pressure (top number) and diastolic pressure (bottom number). Normal blood pressure is below 120/80 mm Hg. Elevated blood pressure is systolic 120-129 and diastolic less than 80. Stage 1 hypertension is systolic 130-139 or diastolic 80-89. Stage 2 hypertension is systolic 140 or higher or diastolic 90 or higher. Hypertensive crisis (requiring immediate medical attention) is systolic over 180 and/or diastolic over 120.'
      },
      {
        question: 'Why is high blood pressure called the "silent killer"?',
        answer: 'High blood pressure is often called the "silent killer" because it frequently has no noticeable symptoms, yet it can lead to serious health problems like heart attack, stroke, heart failure, and kidney disease. Many people have high blood pressure for years without knowing it, as the condition damages blood vessels and organs gradually over time. This is why regular blood pressure screening is essential, even when feeling well.'
      },
      {
        question: 'Can high blood pressure be cured?',
        answer: 'Essential or primary hypertension, which accounts for about 95% of cases, cannot be cured but can be effectively managed with lifestyle changes and medication. Secondary hypertension, which is caused by an underlying condition, may be resolved if the underlying cause is treated successfully. For most people with high blood pressure, it is a lifelong condition requiring ongoing management to maintain healthy blood pressure levels and prevent complications.'
      }
    ],
    emergencySigns: [
      'Severely elevated blood pressure (above 180/120 mm Hg)',
      'Severe headache',
      'Severe anxiety',
      'Shortness of breath',
      'Nosebleeds',
      'Severe chest pain',
      'Vision problems',
      'Blood in the urine',
      'Confusion',
      'Seizures'
    ],
    prevalence: 'Hypertension affects approximately 1.13 billion people worldwide, with an estimated prevalence of 30-45% in adults. In many countries, 1 in 4 men and 1 in 5 women have high blood pressure, though many are undiagnosed.', 
    affectedGroups: [
      'Adults over 65 years',
      'Black people (higher prevalence and severity)',
      'Men (until age 65, then women have higher rates)',
      'People with family history of hypertension',
      'Individuals with obesity or overweight',
      'People with unhealthy lifestyle habits',
      'Individuals with chronic conditions like diabetes or kidney disease',
      'Pregnant women (gestational hypertension)',
      'People living in low and middle-income countries'
    ],
    references: [
      {
        id: '1',
        text: 'Whelton PK, Carey RM, Aronow WS, et al. (2018). "2017 ACC/AHA/AAPA/ABC/ACPM/AGS/APhA/ASH/ASPC/NMA/PCNA Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure in Adults". Journal of the American College of Cardiology. 71 (19): e127–e248.',
        url: 'https://doi.org/10.1016/j.jacc.2017.11.006'
      },
      {
        id: '2',
        text: 'Mills KT, Stefanescu A, He J. (2020). "The global epidemiology of hypertension". Nature Reviews Nephrology. 16 (4): 223–237.',
        url: 'https://doi.org/10.1038/s41581-019-0244-2'
      },
      {
        id: '3',
        text: 'Unger T, Borghi C, Charchar F, et al. (2020). "2020 International Society of Hypertension Global Hypertension Practice Guidelines". Hypertension. 75 (6): 1334–1357.',
        url: 'https://doi.org/10.1161/HYPERTENSIONAHA.120.15026'
      },
      {
        id: '4',
        text: 'World Health Organization (2023). "Hypertension". Fact Sheets.',
        url: 'https://www.who.int/news-room/fact-sheets/detail/hypertension'
      },
      {
        id: '5',
        text: 'National Heart, Lung, and Blood Institute (2022). "High Blood Pressure". Health Topics.',
        url: 'https://www.nhlbi.nih.gov/health/high-blood-pressure'
      }
    ]
  },
  {
    id: 'influenza',
    name: 'Influenza (Flu)',
    description: 'A highly contagious respiratory illness caused by influenza viruses that infect the nose, throat, and sometimes the lungs.[1] The disease is characterized by sudden onset of fever, muscle aches, headache, malaise, cough, and other respiratory symptoms.[2] Influenza can cause mild to severe illness, and at times can lead to death, particularly in high-risk groups such as the elderly, young children, and people with certain health conditions.[3] The virus spreads primarily through respiratory droplets when infected people cough, sneeze, or talk.[4]',
    category: 'respiratory',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Influenza',
    symptoms: [
      'Sudden onset of fever and chills',
      'Muscle and body aches',
      'Headache',
      'Fatigue',
      'Dry cough',
      'Sore throat',
      'Runny or stuffy nose',
      'Shortness of breath',
      'Loss of appetite',
      'Possible nausea, vomiting, and diarrhea (more common in children)',
      'Confusion (especially in older adults)'
    ],
    causes: [
      'Infection with influenza virus (types A, B, or C)',
      'Spread through respiratory droplets',
      'Contact with contaminated surfaces',
      'Airborne transmission in crowded spaces',
      'Seasonal variations in virus prevalence',
      'Antigenic drift and shift (virus mutations)'
    ],
    treatments: [
      'Rest and adequate fluid intake',
      'Over-the-counter fever reducers (acetaminophen, ibuprofen)',
      'Antiviral medications (oseltamivir, zanamivir, baloxavir, peramivir)',
      'Prescription medications for severe cases',
      'Supportive care for symptoms',
      'Hospitalization for severe cases or complications'
    ],
    preventions: [
      'Annual influenza vaccination',
      'Regular handwashing',
      'Avoiding close contact with sick individuals',
      'Covering coughs and sneezes',
      'Staying home when sick',
      'Wearing masks in high-risk settings',
      'Maintaining good overall health',
      'Antiviral medications for post-exposure prophylaxis in high-risk individuals'
    ],
    relatedConditions: [
      'pneumonia',
      'bronchitis',
      'sinusitis',
      'ear-infections',
      'myocarditis',
      'encephalitis',
      'guillain-barre-syndrome'
    ],
    commonQuestions: [
      {
        question: 'What is the difference between a cold and the flu?',
        answer: 'While both are respiratory illnesses, the flu is generally more severe and comes on more suddenly than a cold. Flu symptoms typically include fever, body aches, extreme fatigue, and dry cough, which are less common or milder with colds. Colds more often cause runny or stuffy noses. Flu can lead to serious complications like pneumonia, bacterial infections, and hospitalizations, while colds rarely do.'
      },
      {
        question: 'Can the flu vaccine give you the flu?',
        answer: 'No, flu vaccines cannot cause flu illness. The flu shot contains either inactivated (killed) viruses or only a single protein from the flu virus, neither of which can cause infection. The nasal spray vaccine contains weakened viruses that can\'t cause the flu. Some people may experience mild side effects like soreness at the injection site, low-grade fever, or muscle aches, but these are not the flu and typically resolve within 1-2 days.'
      },
      {
        question: 'How long is someone contagious with the flu?',
        answer: 'People with flu are most contagious in the first 3-4 days after their illness begins, though some may be able to infect others beginning 1 day before symptoms develop and up to 5-7 days after becoming sick. Children and people with weakened immune systems might be able to spread the virus for longer periods. The contagious period can vary based on the individual and the strain of influenza.'
      }
    ],
    emergencySigns: [
      'Difficulty breathing or shortness of breath',
      'Persistent pain or pressure in the chest or abdomen',
      'Persistent dizziness, confusion, or inability to arouse',
      'Seizures',
      'Not urinating',
      'Severe muscle pain',
      'Severe weakness or unsteadiness',
      'Fever or cough that improve but then return or worsen',
      'Worsening of chronic medical conditions'
    ],
    prevalence: 'Seasonal influenza affects approximately 5-10% of adults and 20-30% of children globally each year, resulting in about 3-5 million cases of severe illness and 290,000-650,000 respiratory deaths annually.',
    affectedGroups: [
      'Elderly people (65 years and older)',
      'Young children (especially under 5 years)',
      'Pregnant women',
      'People with chronic medical conditions',
      'People with weakened immune systems',
      'Healthcare workers',
      'Residents of nursing homes and long-term care facilities'
    ],
    references: [
      {
        id: '1',
        text: 'Centers for Disease Control and Prevention (2023). "Influenza (Flu)". National Center for Immunization and Respiratory Diseases.',
        url: 'https://www.cdc.gov/flu/index.htm'
      },
      {
        id: '2',
        text: 'Krammer F, Smith GJD, Fouchier RAM, et al. (2018). "Influenza". Nature Reviews Disease Primers. 4 (1): 3.',
        url: 'https://doi.org/10.1038/s41572-018-0002-y'
      },
      {
        id: '3',
        text: 'Paules C, Subbarao K (2017). "Influenza". Lancet. 390 (10095): 697–708.',
        url: 'https://doi.org/10.1016/S0140-6736(17)30129-0'
      },
      {
        id: '4',
        text: 'Uyeki TM, Bernstein HH, Bradley JS, et al. (2019). "Clinical Practice Guidelines by the Infectious Diseases Society of America: 2018 Update on Diagnosis, Treatment, Chemoprophylaxis, and Institutional Outbreak Management of Seasonal Influenza". Clinical Infectious Diseases. 68 (6): e1–e47.',
        url: 'https://doi.org/10.1093/cid/ciy866'
      },
      {
        id: '5',
        text: 'World Health Organization (2023). "Influenza (Seasonal)". Fact Sheets.',
        url: 'https://www.who.int/news-room/fact-sheets/detail/influenza-(seasonal)'
      }
    ]
  },
  {
    id: 'impetigo',
    name: 'Impetigo',
    description: 'A highly contagious bacterial skin infection that primarily affects infants and children.[1] Impetigo is characterized by red sores that quickly rupture, ooze for a few days, and then form a yellowish-brown crust.[2] The infection is most common on the face, particularly around the nose and mouth, but can spread to other parts of the body through touch.[3] There are two main types: non-bullous (contagious) impetigo and bullous impetigo, with the former being more common.[4]',
    category: 'skin-and-hair',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Impetigo',
    symptoms: [
      'Red sores that quickly rupture and ooze fluid',
      'Honey-colored or yellowish-brown crusts over sores',
      'Itchy rash',
      'Painless fluid-filled blisters (in bullous impetigo)',
      'Skin redness around sores',
      'Swollen lymph nodes in affected area (in some cases)',
      'Painful ulcers (in ecthyma, a deeper form of impetigo)'
    ],
    causes: [
      'Staphylococcus aureus bacteria (most common cause)',
      'Streptococcus pyogenes bacteria (group A strep)',
      'Bacterial entry through breaks in the skin (cuts, insect bites, or other skin conditions)',
      'Direct contact with sores of infected person',
      'Contact with contaminated items (clothing, towels, bedding)'
    ],
    treatments: [
      'Topical antibiotics (mupirocin ointment) for mild cases',
      'Oral antibiotics for widespread infection',
      'Hydrogen peroxide 1% cream (recommended by NICE guidelines for localized cases)',
      'Gentle washing of sores with soap and water to remove crusts',
      'Covering sores to prevent spread',
      'Keeping nails short to prevent scratching and spreading'
    ],
    preventions: [
      'Regular handwashing with soap and water',
      'Keeping cuts and scrapes clean and covered',
      'Not sharing personal items with infected individuals',
      'Washing an infected person\'s clothing, towels, and bedding in hot water',
      'Keeping children with impetigo home from school until 24 hours after starting antibiotics',
      'Maintaining good personal hygiene'
    ],
    relatedConditions: [
      'cellulitis',
      'eczema',
      'scabies',
      'dermatitis',
      'poststreptococcal-glomerulonephritis'
    ],
    commonQuestions: [
      {
        question: 'Is impetigo contagious?',
        answer: 'Yes, impetigo is highly contagious. It can spread through direct contact with sores or by sharing items that have been in contact with the infection. It\'s important to avoid touching the sores, practice good hygiene, and keep the affected person\'s personal items separate until the infection is cleared.'
      },
      {
        question: 'How long does impetigo last?',
        answer: 'Without treatment, impetigo may clear up on its own within 2-3 weeks. However, with appropriate antibiotic treatment, the infection usually improves within 7-10 days. Sores typically stop being contagious after 48 hours of antibiotic treatment.'
      },
      {
        question: 'Can adults get impetigo?',
        answer: 'While impetigo is most common in children aged 2-5, adults can also get the infection. It\'s more likely to occur in adults who live in warm, humid climates, have a weakened immune system, or participate in close-contact sports. Adults who are in close contact with infected children are also at higher risk.'
      }
    ],
    emergencySigns: [
      'Fever',
      'Sores that continue to spread or don\'t heal after treatment',
      'Pain at the infection site',
      'Signs of deeper infection (increasing redness, warmth, swelling, pain)',
      'Symptoms of kidney problems (dark, tea-colored urine, decreased urination, swelling)'
    ],
    prevalence: 'Impetigo affects more than 162 million children globally at any time, primarily in low- to middle-income countries. It is especially prevalent in tropical regions and areas with limited resources.',
    affectedGroups: [
      'Children aged 2-5 years',
      'People living in warm, humid climates',
      'Individuals in crowded living conditions',
      'People with poor hygiene practices',
      'Those with weakened immune systems',
      'Individuals with skin conditions like eczema or dermatitis',
      'Athletes in contact sports'
    ],
    references: [
      {
        id: '1',
        text: 'Bowen AC, Mahé A, Hay RJ, et al. (2015). "The Global Epidemiology of Impetigo: A Systematic Review of the Population Prevalence of Impetigo and Pyoderma". PLoS ONE. 10 (8): e0136789.',
        url: 'https://doi.org/10.1371/journal.pone.0136789'
      },
      {
        id: '2',
        text: 'Hartman-Adams H, Banvard C, Juckett G (2014). "Impetigo: diagnosis and treatment". American Family Physician. 90 (4): 229–35.',
        url: 'https://www.aafp.org/pubs/afp/issues/2014/0815/p229.html'
      },
      {
        id: '3',
        text: 'Koning S, van der Sande R, Verhagen AP, et al. (2012). "Interventions for impetigo". Cochrane Database of Systematic Reviews. 1 (1): CD003261.',
        url: 'https://doi.org/10.1002/14651858.CD003261.pub3'
      },
      {
        id: '4',
        text: 'George A, Rubin G (2003). "A systematic review and meta-analysis of treatments for impetigo". British Journal of General Practice. 53 (491): 480–7.',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1314624/'
      },
      {
        id: '5',
        text: 'National Institute for Health and Care Excellence (2020). "Impetigo: antimicrobial prescribing". NICE guideline [NG153].',
        url: 'https://www.nice.org.uk/guidance/ng153'
      }
    ]
  },
  {
    id: 'gerd',
    name: 'Gastroesophageal Reflux Disease (GERD)',
    description: 'A chronic digestive disorder that occurs when stomach acid or, occasionally, stomach content, flows back (refluxes) into the esophagus.[1] The backwash of acid irritates the lining of the esophagus, often causing it to become inflamed.[2] GERD is a more serious form of gastroesophageal reflux (GER), which is a common condition where people experience occasional acid reflux. When reflux occurs regularly and causes troublesome symptoms or complications, it is diagnosed as GERD.[3] If left untreated, GERD can lead to complications such as esophagitis, Barrett\'s esophagus, esophageal strictures, and in rare cases, esophageal cancer.[4]',
    category: 'digestive-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Gastroesophageal_reflux_disease',
    symptoms: [
      'Heartburn (burning sensation in the chest)',
      'Regurgitation (sour or bitter-tasting acid backing up into throat or mouth)',
      'Chest pain',
      'Difficulty swallowing (dysphagia)',
      'Feeling like there\'s a lump in the throat',
      'Chronic cough',
      'Hoarseness or voice changes',
      'Sore throat',
      'Laryngitis',
      'Asthma-like symptoms',
      'Disrupted sleep',
      'Tooth enamel erosion',
      'Bad breath',
      'Nausea after eating'
    ],
    causes: [
      'Weakened lower esophageal sphincter (LES)',
      'Hiatal hernia (when the upper part of the stomach bulges up into the chest)',
      'Obesity or overweight',
      'Pregnancy',
      'Delayed stomach emptying',
      'Connective tissue disorders (e.g., scleroderma)',
      'Certain foods and beverages (spicy, fatty, citrus, chocolate, coffee, alcohol)',
      'Smoking',
      'Certain medications (aspirin, ibuprofen, certain muscle relaxants, some blood pressure medications)'
    ],
    treatments: [
      'Lifestyle modifications (dietary changes, weight loss, avoiding triggers)',
      'Over-the-counter antacids (Tums, Rolaids, Maalox)',
      'H2 receptor blockers (famotidine, cimetidine, ranitidine)',
      'Proton pump inhibitors (omeprazole, lansoprazole, esomeprazole)',
      'Prokinetics to strengthen the LES and help stomach emptying',
      'Baclofen to reduce relaxations of the lower esophageal sphincter',
      'Endoscopic procedures (Stretta procedure, transoral incisionless fundoplication)',
      'Surgical options (Nissen fundoplication, LINX device implantation)',
      'Complementary approaches (acupuncture, relaxation techniques)'
    ],
    preventions: [
      'Maintaining a healthy weight',
      'Eating smaller meals',
      'Avoiding lying down after eating (wait at least 3 hours)',
      'Elevating the head of the bed 6-8 inches',
      'Avoiding trigger foods (spicy, fatty, acidic foods, chocolate, mint)',
      'Limiting alcohol and caffeine consumption',
      'Quitting smoking',
      'Wearing loose-fitting clothing',
      'Managing stress effectively',
      'Chewing food thoroughly and eating slowly'
    ],
    relatedConditions: [
      'hiatal-hernia',
      'barretts-esophagus',
      'esophagitis',
      'esophageal-stricture',
      'esophageal-cancer',
      'peptic-ulcer-disease',
      'asthma',
      'chronic-cough',
      'laryngitis'
    ],
    commonQuestions: [
      {
        question: 'Is GERD the same as acid reflux?',
        answer: 'While the terms are often used interchangeably, they represent different points on a spectrum of the same condition. Acid reflux refers to the occasional backflow of stomach acid into the esophagus, which many people experience from time to time. GERD, on the other hand, is a chronic, more severe form of acid reflux that occurs regularly (at least twice a week) and causes troublesome symptoms or complications. GERD is essentially persistent acid reflux that requires medical attention and treatment to prevent long-term damage to the esophagus.'
      },
      {
        question: 'Can GERD lead to cancer?',
        answer: 'While GERD itself doesn\'t directly cause cancer, chronic, untreated GERD can, in some cases, lead to Barrett\'s esophagus, a condition where the lining of the esophagus changes to resemble the lining of the intestine. This condition is considered a precancerous change and increases the risk of developing esophageal adenocarcinoma, a type of esophageal cancer. However, it\'s important to note that only a small percentage of people with GERD develop Barrett\'s esophagus, and an even smaller percentage of those with Barrett\'s develop cancer. Regular monitoring and proper treatment of GERD can help reduce these risks.'
      },
      {
        question: 'Do I need to take medication for GERD for the rest of my life?',
        answer: 'Not necessarily. The need for long-term medication depends on the severity of your GERD, how well it responds to treatment, and whether you can effectively manage it with lifestyle modifications. Some people can control their symptoms with dietary and lifestyle changes alone, while others may need medication for longer periods. For those with severe GERD or complications, long-term medication or even surgery might be necessary. It\'s important to work with your healthcare provider to develop a personalized treatment plan and to periodically reassess whether continued medication is needed. Never stop taking prescribed medications without consulting your doctor first.'
      }
    ],
    emergencySigns: [
      'Severe chest pain that might be mistaken for a heart attack',
      'Severe abdominal pain',
      'Difficulty swallowing or painful swallowing',
      'Vomiting large amounts or vomiting blood (which may look like coffee grounds)',
      'Black, tarry stools',
      'Shortness of breath, sweating, or dizziness with chest pain',
      'Unexplained weight loss',
      'Chronic hoarseness or wheezing'
    ],
    prevalence: 'GERD affects approximately 20% of adults in Western populations, making it one of the most common digestive disorders. The prevalence varies globally, with higher rates in North America and Europe compared to East Asia. In the United States, an estimated 20 million people have chronic GERD requiring regular medication.',
    affectedGroups: [
      'Adults over 40 (risk increases with age)',
      'Overweight or obese individuals',
      'Pregnant women',
      'Smokers',
      'People with a family history of GERD',
      'Those with certain connective tissue disorders (e.g., scleroderma)',
      'People with delayed gastric emptying',
      'Individuals with hiatal hernia'
    ],
    references: [
      {
        id: '1',
        text: 'Gyawali CP, Kahrilas PJ, Savarino E, et al. (2018). "Modern diagnosis of GERD: the Lyon Consensus". Gut. 67 (7): 1351–1362.',
        url: 'https://doi.org/10.1136/gutjnl-2017-314722'
      },
      {
        id: '2',
        text: 'Kellerman R, Kintanar T. (2017). "Gastroesophageal Reflux Disease". Primary Care: Clinics in Office Practice. 44 (4): 561–573.',
        url: 'https://doi.org/10.1016/j.pop.2017.07.001'
      },
      {
        id: '3',
        text: 'Richter JE, Rubenstein JH. (2018). "Presentation and Epidemiology of Gastroesophageal Reflux Disease". Gastroenterology. 154 (2): 267–276.',
        url: 'https://doi.org/10.1053/j.gastro.2017.07.045'
      },
      {
        id: '4',
        text: 'Vakil N, van Zanten SV, Kahrilas P, et al. (2006). "The Montreal definition and classification of gastroesophageal reflux disease: a global evidence-based consensus". American Journal of Gastroenterology. 101 (8): 1900–1920.',
        url: 'https://doi.org/10.1111/j.1572-0241.2006.00630.x'
      },
      {
        id: '5',
        text: 'Katz PO, Dunbar KB, Schnoll-Sussman FH, et al. (2022). "ACG Clinical Guideline for the Diagnosis and Management of Gastroesophageal Reflux Disease". American Journal of Gastroenterology. 117 (1): 27–56.',
        url: 'https://doi.org/10.14309/ajg.0000000000001538'
      }
    ]
  },
  {
    id: 'gout',
    name: 'Gout',
    description: 'A type of inflammatory arthritis characterized by recurrent attacks of a red, tender, hot, and swollen joint, most commonly affecting the base of the big toe.[1][2] Gout is caused by elevated levels of uric acid in the blood which crystallize and deposit in joints, tendons, and surrounding tissues.[3] Long-standing hyperuricemia can lead to tophi (hard, painless deposits of uric acid crystals) and kidney stones.[4]',
    category: 'bone-and-joint',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Gout',
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
    references: [
      {
        id: '1',
        text: 'Ragab G, Elshahaly M, Bardin T (September 2017). "Gout: An old disease in new perspective - A review". Journal of Advanced Research. 8 (5): 495–511.',
        url: 'https://doi.org/10.1016/j.jare.2017.04.008'
      },
      {
        id: '2',
        text: 'Richette P, Bardin T (January 2010). "Gout". Lancet. 375 (9711): 318–28.',
        url: 'https://doi.org/10.1016/S0140-6736(09)60883-7'
      },
      {
        id: '3',
        text: 'Dalbeth N, Merriman TR, Stamp LK (April 2016). "Gout". Lancet. 388 (10055): 2039–2052.',
        url: 'https://doi.org/10.1016/S0140-6736(16)00346-9'
      },
      {
        id: '4',
        text: 'Hyndman D, Liu S, Miner JN (June 2016). "Urate Handling in the Human Body". Current Rheumatology Reports. 18 (6): 34.',
        url: 'https://doi.org/10.1007/s11926-016-0587-7'
      },
      {
        id: '5',
        text: 'Pascart T, Lioté F (May 2019). "Gout: state of the art after a decade of developments". Rheumatology. 58 (1): 27–44.',
        url: 'https://doi.org/10.1093/rheumatology/key002'
      }
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
    id: 'irritable-bowel-syndrome',
    name: 'Irritable Bowel Syndrome (IBS)',
    description: 'A common disorder that affects the large intestine, characterized by a group of symptoms including abdominal pain, bloating, and changes in bowel habits.[1] IBS is a functional gastrointestinal disorder, meaning that while it causes significant discomfort, it does not damage the digestive tract or lead to more serious conditions.[2] The condition is chronic, with symptoms typically coming and going over time, often triggered by food, stress, or other factors.[3] There are different subtypes based on predominant bowel habits: IBS with constipation (IBS-C), IBS with diarrhea (IBS-D), and IBS with mixed bowel habits (IBS-M).[4]',
    category: 'digestive-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Irritable_bowel_syndrome',
    symptoms: [
      'Abdominal pain or cramping, often relieved after bowel movements',
      'Bloating and gas',
      'Diarrhea or constipation, sometimes alternating between both',
      'Mucus in the stool',
      'Changes in appearance of bowel movements',
      'Changes in frequency of bowel movements',
      'Feeling of incomplete evacuation after bowel movements',
      'Urgency to have bowel movements',
      'Digestive discomfort after eating',
      'Nausea'
    ],
    causes: [
      'Abnormal muscle contractions in the intestine',
      'Nervous system abnormalities affecting gut-brain communication',
      'Inflammation in the intestines',
      'Severe infection or food poisoning (post-infectious IBS)',
      'Changes in gut microbiota',
      'Food sensitivities or intolerances',
      'Hormonal changes (more common in women)',
      'Genetic factors',
      'Psychological stress and anxiety'
    ],
    treatments: [
      'Dietary changes (low-FODMAP diet, identifying trigger foods)',
      'Fiber supplements for constipation-predominant IBS',
      'Anti-diarrheal medications for diarrhea-predominant IBS',
      'Antispasmodics to reduce muscle contractions and abdominal pain',
      'Laxatives for constipation relief',
      'Antibiotics (like rifaximin) to alter gut bacteria',
      'Probiotics to promote healthy gut bacteria',
      'Antidepressants to inhibit pain perception and reduce symptoms',
      'Psychological therapies (cognitive behavioral therapy, hypnotherapy)',
      'Stress management techniques',
      'Regular physical activity'
    ],
    preventions: [
      'Stress management and relaxation techniques',
      'Regular exercise',
      'Adequate sleep',
      'Avoiding trigger foods',
      'Eating smaller, regular meals',
      'Staying hydrated',
      'Limiting caffeine and alcohol intake',
      'Reducing high-gas foods (beans, cabbage, carbonated drinks)'
    ],
    relatedConditions: [
      'inflammatory-bowel-disease',
      'celiac-disease',
      'crohns-disease',
      'ulcerative-colitis',
      'microscopic-colitis',
      'fibromyalgia',
      'chronic-fatigue-syndrome',
      'depression',
      'anxiety'
    ],
    commonQuestions: [
      {
        question: 'Is irritable bowel syndrome serious?',
        answer: 'IBS is not life-threatening and does not increase the risk of colorectal cancer or other serious bowel diseases. However, it is a chronic condition that can significantly impact quality of life, causing discomfort, emotional distress, and disruption to daily activities. While IBS doesn\'t cause permanent damage to the intestines, it\'s important to manage symptoms effectively.'
      },
      {
        question: 'What foods should I avoid with IBS?',
        answer: 'Common trigger foods include high-FODMAP foods (certain fruits, vegetables, dairy, wheat, and artificial sweeteners), caffeine, alcohol, fatty foods, and spicy foods. However, triggers vary significantly between individuals. Keeping a food diary can help identify personal triggers. Working with a dietitian on an elimination diet followed by careful reintroduction of foods can be helpful in developing a personalized plan.'
      },
      {
        question: 'Is there a cure for IBS?',
        answer: 'There is currently no cure for IBS, but symptoms can be managed effectively through dietary changes, medication, stress management, and lifestyle modifications. Treatment approaches are typically tailored to the individual\'s specific symptoms and triggers. Many people find that their symptoms improve significantly with proper management strategies.'
      }
    ],
    prevalence: 'IBS affects between 10-15% of people worldwide, making it one of the most common gastrointestinal disorders. It is more common in women than men, with a female-to-male ratio of approximately 2:1.',
    affectedGroups: [
      'Women (particularly during menstrual periods)',
      'People under 50 years of age',
      'People with a family history of IBS',
      'Individuals with mental health conditions like anxiety or depression',
      'Those with a history of physical or sexual abuse',
      'People who have experienced severe infections or food poisoning'
    ],
    references: [
      {
        id: '1',
        text: 'Ford AC, Lacy BE, Talley NJ (2017). "Irritable Bowel Syndrome". New England Journal of Medicine. 376 (26): 2566–2578.',
        url: 'https://doi.org/10.1056/NEJMra1607547'
      },
      {
        id: '2',
        text: 'Chey WD, Kurlander J, Eswaran S (2015). "Irritable bowel syndrome: a clinical review". JAMA. 313 (9): 949–958.',
        url: 'https://doi.org/10.1001/jama.2015.0954'
      },
      {
        id: '3',
        text: 'Canavan C, West J, Card T (2014). "The epidemiology of irritable bowel syndrome". Clinical Epidemiology. 6: 71–80.',
        url: 'https://doi.org/10.2147/CLEP.S40245'
      },
      {
        id: '4',
        text: 'Lacy BE, Mearin F, Chang L, et al. (2016). "Bowel Disorders". Gastroenterology. 150 (6): 1393–1407.',
        url: 'https://doi.org/10.1053/j.gastro.2016.02.031'
      },
      {
        id: '5',
        text: 'Moayyedi P, Mearin F, Azpiroz F, et al. (2017). "Irritable bowel syndrome diagnosis and management: A simplified algorithm for clinical practice". United European Gastroenterology Journal. 5 (6): 773–788.',
        url: 'https://doi.org/10.1177/2050640617731968'
      }
    ]
  }
];

export default conditionsGtoI;
