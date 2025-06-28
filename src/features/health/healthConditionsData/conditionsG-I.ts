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
  },
  {
    id: 'hiv-aids',
    name: 'HIV/AIDS',
    description: 'Human Immunodeficiency Virus (HIV) is a virus that attacks the body\'s immune system, specifically CD4 cells (T cells), which help the immune system fight off infections.[1] If left untreated, HIV can lead to Acquired Immunodeficiency Syndrome (AIDS), the late stage of HIV infection that occurs when the body\'s immune system is badly damaged because of the virus.[2] With proper medical care, HIV can be controlled and people with HIV can live long, healthy lives and protect their partners.[3]',
    category: 'infectious-diseases',
    subcategory: 'viral-infections',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/HIV/AIDS',
    symptoms: [
      'Early HIV infection (acute HIV syndrome):',
      'Fever',
      'Headache',
      'Muscle aches and joint pain',
      'Rash',
      'Sore throat and painful mouth sores',
      'Swollen lymph glands, mainly on the neck',
      'Diarrhea',
      'Weight loss',
      'Cough',
      'Night sweats',
      'Chronic HIV infection (often asymptomatic for years):',
      'Persistent swollen lymph nodes',
      'Later stages/AIDS:',
      'Recurring fever',
      'Chronic diarrhea',
      'Persistent white spots or unusual lesions on tongue or in mouth',
      'Persistent, unexplained fatigue',
      'Skin rashes or bumps',
      'Rapid weight loss',
      'Opportunistic infections'
    ],
    causes: [
      'HIV transmission through:',
      'Unprotected sexual contact (vaginal, anal, or oral sex)',
      'Sharing needles, syringes, or other drug injection equipment',
      'Mother-to-child transmission during pregnancy, childbirth, or breastfeeding',
      'Blood transfusions (very rare in countries with blood screening)',
      'Occupational exposure in healthcare settings',
      'Sharing tattoo or body piercing equipment'
    ],
    treatments: [
      'Antiretroviral therapy (ART):',
      'Combination of HIV medicines taken daily',
      'Integrase strand transfer inhibitors (INSTIs)',
      'Non-nucleoside reverse transcriptase inhibitors (NNRTIs)',
      'Nucleoside reverse transcriptase inhibitors (NRTIs)',
      'Protease inhibitors (PIs)',
      'Entry or fusion inhibitors',
      'Treatment of opportunistic infections',
      'Regular monitoring of CD4 count and viral load',
      'Preventive medications for opportunistic infections',
      'Supportive care for symptoms',
      'Mental health support and counseling'
    ],
    preventions: [
      'Pre-exposure prophylaxis (PrEP) for high-risk individuals',
      'Post-exposure prophylaxis (PEP) after potential exposure',
      'Safe sex practices (condom use, limiting number of partners)',
      'Never sharing needles, syringes, or other drug equipment',
      'Regular HIV testing',
      'Treating other sexually transmitted infections',
      'Male circumcision (reduces risk in heterosexual men)',
      'Avoiding sharing personal items that may have blood',
      'Safe blood transfusion practices',
      'Treatment as prevention (undetectable = untransmittable)'
    ],
    relatedConditions: [
      'opportunistic-infections',
      'pneumocystis-pneumonia',
      'kaposi-sarcoma',
      'tuberculosis',
      'hepatitis-b',
      'hepatitis-c',
      'cytomegalovirus',
      'toxoplasmosis',
      'candidiasis'
    ],
    commonQuestions: [
      {
        question: 'Can HIV be cured?',
        answer: 'Currently, there is no cure for HIV, but it can be effectively treated and controlled with antiretroviral therapy (ART). When taken consistently, ART can reduce the amount of HIV in the blood to undetectable levels. People with undetectable viral loads cannot transmit HIV to their sexual partners (undetectable = untransmittable or U=U). With proper treatment, people with HIV can live nearly normal lifespans.'
      },
      {
        question: 'How is HIV transmitted?',
        answer: 'HIV is transmitted through specific body fluids: blood, semen, pre-seminal fluid, rectal fluids, vaginal fluids, and breast milk. The most common ways HIV spreads are through unprotected sex and sharing needles. HIV is NOT transmitted through saliva, tears, sweat, casual contact like hugging or shaking hands, sharing food or drinks, or through insect bites.'
      },
      {
        question: 'What does it mean to have an undetectable viral load?',
        answer: 'An undetectable viral load means that the amount of HIV in the blood is so low that standard laboratory tests cannot detect it. This is achieved through consistent use of antiretroviral therapy (ART). People with undetectable viral loads cannot transmit HIV to their sexual partners and have greatly improved health outcomes. However, HIV is still present in the body and treatment must continue.'
      }
    ],
    emergencySigns: [
      'Severe, persistent fever',
      'Difficulty breathing or shortness of breath',
      'Persistent cough with blood',
      'Severe headache with neck stiffness',
      'Persistent vomiting or diarrhea causing dehydration',
      'Confusion or altered mental state',
      'Severe abdominal pain',
      'Signs of severe infection',
      'Unusual bleeding or bruising'
    ],
    prevalence: 'Globally, an estimated 38.4 million people were living with HIV at the end of 2021. Sub-Saharan Africa is most severely affected, accounting for about two-thirds of people living with HIV worldwide. In the United States, more than 1.2 million people are living with HIV.',
    affectedGroups: [
      'Men who have sex with men (MSM)',
      'People who inject drugs',
      'Sex workers and their clients',
      'Transgender people',
      'People in certain geographic regions (Sub-Saharan Africa)',
      'Young women in high-prevalence areas',
      'People with multiple sexual partners',
      'Individuals with other sexually transmitted infections'
    ],
    references: [
      {
        id: '1',
        text: 'Centers for Disease Control and Prevention (2023). "HIV Basics". National Center for HIV/AIDS, Viral Hepatitis, STD, and TB Prevention.',
        url: 'https://www.cdc.gov/hiv/basics/index.html'
      },
      {
        id: '2',
        text: 'World Health Organization (2023). "HIV/AIDS Fact Sheet".',
        url: 'https://www.who.int/news-room/fact-sheets/detail/hiv-aids'
      },
      {
        id: '3',
        text: 'UNAIDS (2022). "Global HIV & AIDS statistics — Fact sheet".',
        url: 'https://www.unaids.org/en/resources/fact-sheet'
      }
    ]
  },
  {
    id: 'heart-disease',
    name: 'Heart Disease (Coronary Artery Disease)',
    description: 'Heart disease, also known as coronary artery disease (CAD), is the leading cause of death worldwide.[1] It occurs when the coronary arteries that supply blood to the heart muscle become narrowed or blocked by fatty deposits called plaque.[2] This reduces blood flow to the heart, which can cause chest pain (angina), heart attacks, and other serious complications.[3] The disease develops over many years and may not cause symptoms until a significant blockage occurs.[4]',
    category: 'heart-and-circulation',
    subcategory: 'cardiovascular-disease',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Coronary_artery_disease',
    symptoms: [
      'Chest pain or discomfort (angina):',
      'Pressure, squeezing, fullness, or pain in center of chest',
      'Pain may spread to arms, neck, jaw, or back',
      'Shortness of breath',
      'Heart palpitations',
      'Weakness or dizziness',
      'Nausea',
      'Sweating',
      'Fatigue, especially with exertion',
      'Swelling in legs, ankles, or feet',
      'Irregular heartbeat',
      'Some people have no symptoms (silent ischemia)'
    ],
    causes: [
      'Atherosclerosis (plaque buildup in arteries)',
      'High blood pressure',
      'High cholesterol levels',
      'Smoking and tobacco use',
      'Diabetes',
      'Obesity',
      'Physical inactivity',
      'Unhealthy diet high in saturated fats, trans fats, and sodium',
      'Excessive alcohol consumption',
      'Stress',
      'Age (risk increases with age)',
      'Family history of heart disease',
      'Gender (men at higher risk at younger ages)'
    ],
    treatments: [
      'Lifestyle modifications:',
      'Heart-healthy diet (Mediterranean diet, DASH diet)',
      'Regular physical activity',
      'Smoking cessation',
      'Weight management',
      'Stress reduction',
      'Medications:',
      'Cholesterol-lowering drugs (statins)',
      'Blood pressure medications (ACE inhibitors, beta-blockers)',
      'Antiplatelet drugs (aspirin, clopidogrel)',
      'Nitrates for chest pain',
      'Procedures:',
      'Angioplasty and stent placement',
      'Coronary artery bypass surgery (CABG)',
      'Cardiac rehabilitation programs'
    ],
    preventions: [
      'Maintain a healthy diet low in saturated and trans fats',
      'Exercise regularly (at least 150 minutes moderate activity per week)',
      'Don\'t smoke and avoid secondhand smoke',
      'Maintain a healthy weight',
      'Manage stress effectively',
      'Control blood pressure',
      'Manage cholesterol levels',
      'Control diabetes if present',
      'Limit alcohol consumption',
      'Get adequate sleep',
      'Regular health screenings and checkups'
    ],
    relatedConditions: [
      'high-blood-pressure',
      'high-cholesterol',
      'diabetes',
      'stroke',
      'heart-failure',
      'arrhythmia',
      'peripheral-artery-disease',
      'metabolic-syndrome'
    ],
    commonQuestions: [
      {
        question: 'What is the difference between a heart attack and angina?',
        answer: 'Angina is chest pain caused by reduced blood flow to the heart muscle, typically triggered by physical activity or stress, and usually relieved by rest or medication. A heart attack occurs when blood flow to part of the heart muscle is completely blocked, causing permanent damage to that area of the heart. Heart attack pain is typically more severe, lasts longer, and doesn\'t improve with rest. Heart attacks are medical emergencies requiring immediate treatment.'
      },
      {
        question: 'Can heart disease be reversed?',
        answer: 'While heart disease cannot be completely "reversed," its progression can be slowed, stopped, or in some cases, improved through aggressive lifestyle changes and medical treatment. Studies have shown that comprehensive lifestyle programs including very low-fat diets, regular exercise, stress management, and smoking cessation can help reduce plaque buildup and improve heart function. Medications like statins can also help stabilize plaque and reduce cardiovascular risk.'
      },
      {
        question: 'At what age should I start worrying about heart disease?',
        answer: 'Heart disease prevention should start early, ideally in childhood with healthy lifestyle habits. Risk factors can begin accumulating in the 20s and 30s. Men typically develop heart disease 7-10 years earlier than women, with risk increasing significantly after age 45 for men and after menopause for women. However, people with risk factors like diabetes, high blood pressure, or family history may need to be concerned earlier. Regular health screenings should begin by age 20.'
      }
    ],
    emergencySigns: [
      'Severe chest pain or pressure',
      'Pain radiating to arms, back, neck, jaw, or stomach',
      'Shortness of breath',
      'Cold sweats',
      'Nausea or vomiting',
      'Lightheadedness or sudden dizziness',
      'Rapid or irregular heartbeat',
      'Loss of consciousness',
      'Symptoms lasting more than a few minutes or getting worse'
    ],
    prevalence: 'Heart disease is the leading cause of death globally, responsible for approximately 17.9 million deaths annually. In the United States, about 655,000 Americans die from heart disease each year—that\'s 1 in every 5 deaths. About 18.2 million adults aged 20 and older have coronary artery disease.',
    affectedGroups: [
      'Men (higher risk at younger ages)',
      'Women after menopause',
      'People with diabetes',
      'Individuals with high blood pressure or cholesterol',
      'Smokers',
      'People with family history of heart disease',
      'Those who are overweight or obese',
      'People with sedentary lifestyles',
      'Individuals under chronic stress'
    ],
    references: [
      {
        id: '1',
        text: 'World Health Organization (2023). "Cardiovascular diseases (CVDs) Fact Sheet".',
        url: 'https://www.who.int/news-room/fact-sheets/detail/cardiovascular-diseases-(cvds)'
      },
      {
        id: '2',
        text: 'American Heart Association (2023). "Coronary Artery Disease".',
        url: 'https://www.heart.org/en/health-topics/consumer-healthcare/what-is-cardiovascular-disease/coronary-artery-disease'
      },
      {
        id: '3',
        text: 'Centers for Disease Control and Prevention (2023). "Heart Disease Facts".',
        url: 'https://www.cdc.gov/heartdisease/facts.htm'
      }
    ]
  },
  {
    id: 'hepatitis-b-c',
    name: 'Hepatitis B & C',
    description: 'Viral infections that cause inflammation of the liver.[1] Hepatitis B and C are the most common forms of viral hepatitis and can cause both acute and chronic infection.[2] While Hepatitis B can be prevented with vaccination, there is currently no vaccine for Hepatitis C.[3] Both infections can lead to serious liver complications including cirrhosis, liver failure, and liver cancer if left untreated.[4]',
    category: 'infectious-diseases',
    subcategory: 'viral-liver-infections',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Hepatitis_B',
    symptoms: [
      'Acute Hepatitis (both B & C):',
      'Fatigue',
      'Nausea and vomiting',
      'Abdominal pain',
      'Dark urine',
      'Clay-colored bowel movements',
      'Joint pain',
      'Jaundice (yellowing of skin and eyes)',
      'Chronic Hepatitis (often asymptomatic until liver damage occurs):',
      'Persistent fatigue',
      'Mild abdominal discomfort',
      'Advanced disease symptoms:',
      'Ascites (fluid accumulation in abdomen)',
      'Swelling in legs',
      'Confusion',
      'Easy bruising and bleeding'
    ],
    causes: [
      'Hepatitis B transmission:',
      'Blood-to-blood contact',
      'Sexual contact with infected person',
      'Mother-to-child during birth',
      'Sharing needles or drug equipment',
      'Sharing personal items (razors, toothbrushes)',
      'Hepatitis C transmission:',
      'Blood-to-blood contact (most common)',
      'Sharing needles or drug equipment',
      'Blood transfusions before 1992',
      'Healthcare exposure (needlestick injuries)',
      'Sexual transmission (less common than Hepatitis B)',
      'Mother-to-child transmission (uncommon)'
    ],
    treatments: [
      'Hepatitis B:',
      'Acute: Supportive care, rest, adequate nutrition',
      'Chronic: Antiviral medications (tenofovir, entecavir)',
      'Regular monitoring of liver function',
      'Hepatitis C:',
      'Direct-acting antivirals (DAAs) - cure rate >95%',
      'Sofosbuvir/velpatasvir, glecaprevir/pibrentasvir',
      'Treatment duration: 8-12 weeks typically',
      'General management:',
      'Avoid alcohol and hepatotoxic drugs',
      'Hepatitis A and B vaccination (if not immune)',
      'Regular monitoring for liver cancer',
      'Liver transplant for end-stage disease'
    ],
    preventions: [
      'Hepatitis B prevention:',
      'Hepatitis B vaccination (most effective prevention)',
      'Safe sex practices',
      'Never share needles or drug equipment',
      'Use standard precautions in healthcare settings',
      'Screen blood donations',
      'Hepatitis C prevention:',
      'Never share needles, syringes, or drug equipment',
      'Use standard precautions in healthcare settings',
      'Safe sex practices (especially with multiple partners)',
      'Avoid sharing personal items that may have blood',
      'General prevention:',
      'Practice good hygiene',
      'Get tested if at risk'
    ],
    relatedConditions: [
      'liver-cirrhosis',
      'liver-cancer',
      'liver-failure',
      'hepatitis-a',
      'hepatitis-d',
      'alcoholic-liver-disease',
      'non-alcoholic-fatty-liver-disease',
      'hiv-aids',
      'autoimmune-hepatitis'
    ],
    commonQuestions: [
      {
        question: 'What is the difference between Hepatitis B and Hepatitis C?',
        answer: 'Both are viral infections that affect the liver, but they differ in several ways. Hepatitis B has a vaccine for prevention, while Hepatitis C does not. Hepatitis B is more commonly transmitted through sexual contact and from mother to child, while Hepatitis C is primarily transmitted through blood contact. Hepatitis C has highly effective cure rates (>95%) with direct-acting antivirals, while Hepatitis B is generally managed as a chronic condition with antiviral therapy. Both can cause serious liver complications if untreated.'
      },
      {
        question: 'Can Hepatitis B and C be cured?',
        answer: 'Hepatitis C can be cured in more than 95% of cases with direct-acting antiviral medications taken for 8-12 weeks. Hepatitis B is more challenging - while acute Hepatitis B may resolve on its own, chronic Hepatitis B cannot be cured but can be effectively managed with antiviral medications to suppress the virus and prevent liver damage. Some people with chronic Hepatitis B may achieve "functional cure" where the virus becomes undetectable, but this is less common than with Hepatitis C.'
      },
      {
        question: 'How long can you have Hepatitis without knowing it?',
        answer: 'Many people with chronic Hepatitis B or C have no symptoms for years or even decades. Hepatitis C is often called a "silent" infection because 70-80% of people have no symptoms during the acute phase, and chronic infection can remain asymptomatic until significant liver damage occurs. Similarly, chronic Hepatitis B may be asymptomatic for many years. This is why screening is important for people at risk, as early detection and treatment can prevent serious complications.'
      }
    ],
    emergencySigns: [
      'Severe abdominal pain',
      'Persistent vomiting',
      'Signs of liver failure: confusion, severe fatigue, yellowing of skin/eyes',
      'Signs of gastrointestinal bleeding: black tarry stools, vomiting blood',
      'Swelling in abdomen or legs',
      'High fever with hepatitis symptoms',
      'Severe dehydration'
    ],
    prevalence: 'Globally, an estimated 296 million people live with chronic Hepatitis B and 58 million with Hepatitis C. Hepatitis B caused approximately 820,000 deaths in 2019, while Hepatitis C caused about 290,000 deaths. In the United States, about 2.4 million people live with Hepatitis C and 880,000 with Hepatitis B.',
    affectedGroups: [
      'People who inject drugs',
      'Healthcare workers',
      'People born in countries with high Hepatitis B prevalence',
      'Men who have sex with men',
      'People with HIV',
      'Household contacts of infected individuals',
      'People on hemodialysis',
      'Recipients of blood transfusions before 1992 (Hepatitis C)',
      'People born from 1945-1965 (baby boomers) for Hepatitis C',
      'People with multiple sexual partners'
    ],
    references: [
      {
        id: '1',
        text: 'World Health Organization (2023). "Hepatitis B Fact Sheet".',
        url: 'https://www.who.int/news-room/fact-sheets/detail/hepatitis-b'
      },
      {
        id: '2',
        text: 'World Health Organization (2023). "Hepatitis C Fact Sheet".',
        url: 'https://www.who.int/news-room/fact-sheets/detail/hepatitis-c'
      },
      {
        id: '3',
        text: 'Centers for Disease Control and Prevention (2023). "Viral Hepatitis".',
        url: 'https://www.cdc.gov/hepatitis/'
      },
      {
        id: '4',
        text: 'American Association for the Study of Liver Diseases (2023). "HCV Guidance: Recommendations for Testing, Managing, and Treating Hepatitis C".',
        url: 'https://www.hcvguidelines.org/'
      }
    ]
  }
];

export default conditionsGtoI;
