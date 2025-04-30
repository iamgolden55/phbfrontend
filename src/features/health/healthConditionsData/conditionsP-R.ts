import { HealthCondition } from '../healthConditionsData';

/**
 * Health conditions starting with letters P-R
 */
export const conditionsPtoR: HealthCondition[] = [
  {
    id: 'parkinsons-disease',
    name: 'Parkinson\'s Disease',
    description: 'A progressive nervous system disorder that affects movement, causing tremors, stiffness, and slowing of movement due to decreased dopamine production in the brain.',
    category: 'brain-and-nerves',
    symptoms: [
      'Tremor, usually beginning in the hands',
      'Slowed movement (bradykinesia)',
      'Muscle rigidity or stiffness',
      'Impaired posture and balance',
      'Loss of automatic movements (blinking, smiling)',
      'Speech changes (soft, slurred, monotone)',
      'Writing changes (small, cramped handwriting)',
      'Sleep problems',
      'Cognitive changes',
      'Depression and emotional changes'
    ],
    causes: [
      'Loss of dopamine-producing neurons in the brain',
      'Genetic mutations (in some cases)',
      'Environmental toxins exposure',
      'Head injuries',
      'Lewy bodies (abnormal protein deposits)',
      'Alpha-synuclein clumps in brain cells',
      'Age-related factors',
      'Gender (more common in men)'
    ],
    treatments: [
      'Medications to increase dopamine (levodopa)',
      'Dopamine agonists',
      'MAO-B inhibitors',
      'COMT inhibitors',
      'Anticholinergics',
      'Deep brain stimulation surgery',
      'Physical therapy',
      'Occupational therapy',
      'Speech therapy',
      'Exercise programs'
    ],
    preventions: [
      'No proven ways to prevent Parkinson\'s',
      'Regular exercise may reduce risk',
      'Caffeine consumption (particularly coffee) may lower risk',
      'Avoiding exposure to pesticides and toxins',
      'Antioxidant-rich diet',
      'Neuroprotective approach for those at high genetic risk'
    ],
    relatedConditions: [
      'lewy-body-dementia',
      'multiple-system-atrophy',
      'progressive-supranuclear-palsy',
      'corticobasal-degeneration',
      'drug-induced-parkinsonism'
    ],
    commonQuestions: [
      {
        question: 'Is Parkinson\'s disease fatal?',
        answer: 'Parkinson\'s disease itself is not typically considered fatal, but complications from the disease can reduce life expectancy. Most people with Parkinson\'s have a normal or near-normal life expectancy. However, advanced Parkinson\'s increases the risk of serious complications such as falls, pneumonia, and choking, which can be life-threatening. With proper treatment and management, many people with Parkinson\'s live long, productive lives.'
      },
      {
        question: 'Does everyone with Parkinson\'s disease develop tremors?',
        answer: 'No, not everyone with Parkinson\'s disease develops tremors. While tremor is one of the most recognizable symptoms, about 20% of people with Parkinson\'s never develop tremor. This form is sometimes called "akinetic-rigid" Parkinson\'s, where stiffness and slowness of movement are the predominant symptoms. Each person\'s experience with Parkinson\'s is unique, with different combinations and severity of symptoms.'
      },
      {
        question: 'Can young people get Parkinson\'s disease?',
        answer: 'Yes, although it\'s less common, young people can develop Parkinson\'s disease. When symptoms begin before age 50, it\'s called Young-Onset Parkinson\'s Disease (YOPD). About 2-10% of people with Parkinson\'s are diagnosed before age 50. YOPD is more likely to be associated with genetic factors and may progress more slowly. However, the earlier onset means living with the condition for more years, presenting unique challenges for career, family planning, and long-term care.'
      }
    ],
    emergencySigns: [
      'Sudden inability to move (freezing) in unsafe situations',
      'Falls resulting in injury',
      'Extreme difficulty swallowing or choking',
      'Severe confusion or hallucinations',
      'Symptoms of neuroleptic malignant syndrome from medications (high fever, muscle rigidity, altered consciousness)'
    ],
    prevalence: 'Parkinson\'s disease affects approximately 10 million people worldwide. In the United States, about 1 million people are living with Parkinson\'s disease.',
    affectedGroups: [
      'Older adults (risk increases with age)',
      'Men (1.5 times more likely than women)',
      'People with family history of Parkinson\'s',
      'Those with certain genetic mutations',
      'People with extensive exposure to certain herbicides, pesticides, or industrial chemicals',
      'Individuals who have experienced head trauma'
    ]
  },
  {
    id: 'pneumonia',
    name: 'Pneumonia',
    description: 'An infection that inflames the air sacs in one or both lungs, which may fill with fluid or pus, causing cough with phlegm, fever, chills, and difficulty breathing.',
    category: 'respiratory',
    symptoms: [
      'Cough with phlegm (may be greenish, yellow, or bloody)',
      'Fever, sweating, and shaking chills',
      'Shortness of breath',
      'Rapid, shallow breathing',
      'Chest pain that worsens when breathing deeply or coughing',
      'Fatigue and weakness',
      'Nausea, vomiting, or diarrhea',
      'Confusion or changes in mental awareness (in older adults)',
      'Lower than normal body temperature (in older adults)',
      'Decreased appetite'
    ],
    causes: [
      'Bacterial infections (pneumococcus, Haemophilus influenzae, Mycoplasma pneumoniae)',
      'Viral infections (influenza, respiratory syncytial virus, COVID-19)',
      'Fungal infections (Pneumocystis jirovecii, Cryptococcus)',
      'Aspiration of food, drink, vomit, or saliva into lungs',
      'Hospital-acquired infections',
      'Ventilator-associated pneumonia',
      'Chemical inhalation'
    ],
    treatments: [
      'Antibiotics for bacterial pneumonia',
      'Antiviral medications for some viral pneumonias',
      'Antifungal medications for fungal pneumonia',
      'Cough medicine',
      'Fever reducers/pain relievers (acetaminophen, NSAIDs)',
      'Hospitalization for severe cases',
      'Oxygen therapy',
      'Intravenous fluids',
      'Assisted breathing with ventilator (severe cases)',
      'Rest and fluids'
    ],
    preventions: [
      'Vaccination (pneumococcal vaccine, influenza vaccine, COVID-19 vaccine)',
      'Good hand hygiene',
      'Not smoking',
      'Maintaining strong immune system through healthy lifestyle',
      'Avoiding close contact with sick people',
      'Covering coughs and sneezes',
      'Proper dental hygiene to prevent aspiration pneumonia',
      'Treating underlying conditions that increase risk'
    ],
    relatedConditions: [
      'bronchitis',
      'copd',
      'influenza',
      'covid-19',
      'pleural-effusion',
      'lung-abscess',
      'sepsis'
    ],
    commonQuestions: [
      {
        question: 'How long does it take to recover from pneumonia?',
        answer: 'Recovery time varies depending on the type of pneumonia, its severity, and individual factors like age and overall health. Generally, younger, healthier adults may feel better within a week or two. However, full recovery, including fatigue resolution and return of normal strength, often takes 4-6 weeks. For older adults or those with severe pneumonia requiring hospitalization, recovery may take several months. Even after feeling better, the immune system may still be recovering.'
      },
      {
        question: 'How is pneumonia diagnosed?',
        answer: 'Pneumonia diagnosis typically begins with a physical exam, where the doctor listens to the lungs with a stethoscope for abnormal breathing sounds. Chest X-rays are usually used to confirm the diagnosis and show the extent and location of the infection. Additional tests may include blood tests to check for infection, pulse oximetry to measure oxygen levels, sputum tests to identify the specific germ causing the infection, and sometimes CT scans for more detailed imaging.'
      },
      {
        question: 'Can pneumonia spread from person to person?',
        answer: 'Some types of pneumonia are contagious and can spread from person to person, particularly those caused by infectious bacteria or viruses such as influenza, COVID-19, or tuberculosis. These pathogens can spread through airborne droplets from coughs or sneezes, or by touching surfaces contaminated with these germs. However, pneumonia itself isn\'t contagious—only the germs that cause it. Fungal pneumonia and aspiration pneumonia are not typically contagious.'
      }
    ],
    emergencySigns: [
      'Difficulty breathing or rapid breathing',
      'Bluish color to lips or fingernails (cyanosis)',
      'High fever with shaking chills',
      'Coughing up blood',
      'Confusion or changes in mental awareness',
      'Severe chest pain',
      'Inability to eat or drink'
    ],
    prevalence: 'Pneumonia affects approximately 450 million people globally each year (about 7% of the population), resulting in about 4 million deaths annually.',
    affectedGroups: [
      'Children under 5 years',
      'Adults over 65 years',
      'People with weakened immune systems',
      'Those with chronic diseases (heart disease, diabetes, COPD)',
      'Smokers',
      'People on ventilators in hospitals',
      'Individuals in nursing homes or long-term care facilities'
    ]
  },
  {
    id: 'rabies',
    name: 'Rabies',
    description: 'A viral disease that causes inflammation of the brain and is almost always fatal once symptoms appear, transmitted through the saliva of infected animals, typically via bites.',
    category: 'infectious-diseases',
    subcategory: 'viral-infections',
    symptoms: [
      'Initial symptoms: Fever, headache, general weakness, discomfort',
      'Tingling or itching at bite site',
      'Cerebral phase: Confusion, anxiety, agitation, hallucinations',
      'Hydrophobia (fear of water due to painful swallowing)',
      'Aerophobia (fear of drafts or fresh air)',
      'Hypersalivation (excessive drooling)',
      'Muscle spasms and paralysis',
      'Seizures',
      'Coma',
      'Death (usually within 2-10 days after symptom onset)'
    ],
    causes: [
      'Infection with rabies virus (Lyssavirus)',
      'Transmission through saliva of infected animals via bites or scratches',
      'Rarely, transmission through mucous membranes or inhalation',
      'Most common animal vectors: dogs, bats, foxes, raccoons, skunks',
      'Untreated wounds contaminated with infected saliva'
    ],
    treatments: [
      'Post-exposure prophylaxis (PEP) before symptoms appear',
      'Wound cleaning and disinfection',
      'Rabies immune globulin (RIG) at wound site',
      'Series of rabies vaccinations',
      'Once symptoms appear, Milwaukee protocol (induced coma and antiviral therapy)',
      'Supportive intensive care',
      'Palliative care for advanced cases'
    ],
    preventions: [
      'Pre-exposure vaccination for high-risk groups',
      'Immediate wound washing after animal bite',
      'Prompt post-exposure prophylaxis',
      'Vaccination of domestic animals',
      'Avoiding contact with wild or unfamiliar animals',
      'Animal population control and surveillance',
      'Public education about rabies risks'
    ],
    relatedConditions: ['encephalitis', 'other-viral-encephalitides', 'tetanus'],
    commonQuestions: [
      {
        question: 'How long after a bite does rabies take to develop?',
        answer: 'The incubation period for rabies is typically 1-3 months but can range from less than a week to more than a year. This variability depends on factors like the bite location (closer to the brain means shorter incubation), the severity of the wound, the amount of virus introduced, and the individual\'s immune status. The virus travels from the wound site to the central nervous system via nerve pathways, which explains why bites on the face or neck tend to progress faster than those on extremities. This incubation period allows time for effective post-exposure prophylaxis before symptoms develop.'
      },
      {
        question: 'Is rabies 100% fatal once symptoms appear?',
        answer: 'Rabies is almost always fatal once clinical symptoms appear, with a mortality rate approaching 100%. However, there have been a few documented cases of survival, most notably through the experimental Milwaukee Protocol, which involves induced coma and antiviral treatment. Of the approximately 30 people who have received this treatment, only a handful have survived, often with significant neurological deficits. These rare survivals don\'t change the essential fact that rabies should be considered virtually 100% fatal, emphasizing the critical importance of prompt post-exposure prophylaxis after potential exposure.'
      }
    ],
    emergencySigns: [
      'Any symptoms following an animal bite',
      'Hydrophobia (fear of water)',
      'Confusion or agitation after potential rabies exposure',
      'Paralysis or difficulty swallowing',
      'Excessive salivation with history of animal bite'
    ],
    prevalence: 'Rabies causes approximately 59,000 human deaths annually worldwide, with 95% of cases occurring in Africa and Asia. Dogs are responsible for up to 99% of human rabies transmissions in these regions. In countries with widespread dog vaccination, rabies is rare, with bat transmission being the primary concern.',
    affectedGroups: [
      'People in developing countries with limited access to healthcare and veterinary services',
      'Rural populations',
      'Children (more likely to be bitten and may not report bites)',
      'Those working with animals (veterinarians, animal handlers, wildlife workers)',
      'Travelers to rabies-endemic regions',
      'People in areas with large stray dog populations'
    ]
  },
  {
    id: 'psoriasis',
    name: 'Psoriasis',
    description: 'A chronic autoimmune condition that causes rapid buildup of skin cells, resulting in scaling on the skin\'s surface. Inflammation and redness around the scales is common.',
    category: 'skin-and-hair',
    symptoms: [
      'Red patches of skin covered with silvery scales',
      'Dry, cracked skin that may bleed or itch',
      'Itching, burning, or soreness',
      'Thickened, pitted, or ridged nails',
      'Swollen and stiff joints',
      'Small scaling spots (commonly seen in children)',
      'Cyclic flare-ups lasting weeks or months, followed by remissions'
    ],
    causes: [
      'Immune system dysfunction (T cells attack healthy skin cells)',
      'Genetic predisposition',
      'Environmental triggers',
      'Infections (strep throat, skin infections)',
      'Stress',
      'Cold, dry weather',
      'Injuries to skin (cuts, scrapes, bug bites)',
      'Certain medications (lithium, beta blockers, antimalarials)',
      'Alcohol consumption',
      'Smoking'
    ],
    treatments: [
      'Topical treatments (corticosteroids, vitamin D analogs, retinoids, calcineurin inhibitors)',
      'Light therapy (phototherapy)',
      'Oral or injected medications for severe cases',
      'Biologics targeting specific parts of the immune system',
      'Systemic treatments (methotrexate, cyclosporine, apremilast)',
      'Moisturizers and scale-removing products',
      'Lifestyle modifications',
      'Diet changes',
      'Stress reduction techniques'
    ],
    preventions: [
      'No way to prevent initial development',
      'Preventing flare-ups:',
      'Identifying and avoiding personal triggers',
      'Maintaining healthy lifestyle',
      'Stress management',
      'Regular moisturizing',
      'Limiting alcohol consumption',
      'Not smoking',
      'Protecting skin from injury'
    ],
    relatedConditions: [
      'psoriatic-arthritis',
      'cardiovascular-disease',
      'metabolic-syndrome',
      'inflammatory-bowel-disease',
      'depression',
      'type-2-diabetes',
      'eye-conditions'
    ],
    commonQuestions: [
      {
        question: 'Is psoriasis contagious?',
        answer: 'No, psoriasis is not contagious. You cannot catch psoriasis from someone else or spread it to others through skin contact. Psoriasis develops due to a combination of genetic predisposition and immune system irregularities. The visible skin lesions are not infectious but rather the result of accelerated skin cell growth and inflammation.'
      },
      {
        question: 'What are the different types of psoriasis?',
        answer: 'There are several types of psoriasis, each with distinct characteristics: Plaque psoriasis (most common, featuring raised red patches with silvery scales), Guttate psoriasis (small dot-like lesions), Inverse psoriasis (smooth red patches in body folds), Pustular psoriasis (white pustules surrounded by red skin), Erythrodermic psoriasis (widespread inflammation and exfoliation affecting most of the body), Nail psoriasis (affecting fingernails and toenails), and Psoriatic arthritis (joint inflammation with skin symptoms).'
      },
      {
        question: 'Can diet affect psoriasis?',
        answer: 'While there\'s no definitive psoriasis diet, some dietary changes may help reduce inflammation and symptoms in certain individuals. Anti-inflammatory diets like the Mediterranean diet may be beneficial. Some people report improvement when avoiding potential trigger foods like gluten, dairy, or nightshades. Maintaining a healthy weight is important, as obesity is linked to more severe psoriasis. Omega-3 fatty acids, turmeric, and vitamin D may have anti-inflammatory benefits. It\'s best to discuss dietary changes with healthcare providers.'
      }
    ],
    prevalence: 'Psoriasis affects approximately 125 million people worldwide (2-3% of the global population). In the United States, about 8 million people have psoriasis.',
    affectedGroups: [
      'Adults between 15-35 years (most common onset age)',
      'People with family history of psoriasis',
      'Individuals of European descent (more common)',
      'Those living in northern countries (higher prevalence)',
      'People with certain immune-related conditions',
      'Smokers and former smokers',
      'People who are overweight or obese'
    ]
  },
  {
    id: 'rheumatoid-arthritis',
    name: 'Rheumatoid Arthritis',
    description: 'A chronic inflammatory disorder that affects joints and sometimes other body systems, causing painful swelling that can eventually result in bone erosion and joint deformity.',
    category: 'bone-and-joint',
    subcategory: 'autoimmune',
    symptoms: [
      'Tender, warm, swollen joints',
      'Joint stiffness that is usually worse in the mornings or after inactivity',
      'Fatigue, fever, and loss of appetite',
      'Symmetrical pattern of affected joints',
      'Early symptoms often in smaller joints (fingers, toes)',
      'Later progression to wrists, knees, ankles, elbows, hips, and shoulders',
      'Rheumatoid nodules under the skin',
      'Weight loss',
      'Dry eyes and mouth',
      'Shortness of breath'
    ],
    causes: [
      'Autoimmune response (immune system attacks joint lining)',
      'Genetic factors',
      'Environmental triggers',
      'Hormonal factors (more common in women)',
      'Bacterial or viral infections (potentially triggering autoimmune response)',
      'Smoking',
      'Obesity'
    ],
    treatments: [
      'NSAIDs for pain and inflammation',
      'Corticosteroids to reduce inflammation and slow joint damage',
      'Conventional DMARDs (methotrexate, hydroxychloroquine, sulfasalazine, leflunomide)',
      'Biologic DMARDs (TNF inhibitors, IL-6 inhibitors, T-cell activation inhibitors)',
      'JAK inhibitors',
      'Physical therapy',
      'Occupational therapy',
      'Joint surgery in advanced cases',
      'Lifestyle modifications'
    ],
    preventions: [
      'No specific prevention known',
      'Quitting smoking (or never starting)',
      'Maintaining healthy weight',
      'Regular physical activity',
      'Fish oil supplements may reduce risk',
      'Early treatment to prevent joint damage'
    ],
    relatedConditions: [
      'osteoarthritis',
      'lupus',
      'psoriatic-arthritis',
      'ankylosing-spondylitis',
      'fibromyalgia',
      'cardiovascular-disease',
      'interstitial-lung-disease'
    ],
    commonQuestions: [
      {
        question: 'What\'s the difference between rheumatoid arthritis and osteoarthritis?',
        answer: 'Rheumatoid arthritis (RA) and osteoarthritis (OA) have different causes and symptoms. RA is an autoimmune disease where the immune system attacks joint linings, causing inflammation and eventually damaging bone and cartilage. OA results from mechanical wear and tear on joints over time. RA typically affects joints symmetrically (same joints on both sides of body), while OA often affects weight-bearing joints or previously injured joints. RA includes systemic symptoms like fatigue and fever, which are not typical in OA.'
      },
      {
        question: 'Can rheumatoid arthritis go into remission?',
        answer: 'Yes, rheumatoid arthritis can go into remission, especially with early and aggressive treatment. Remission means disease activity is minimal or absent with no signs of active inflammation. There are different types of remission: clinical remission (no observable symptoms), imaging remission (no signs of inflammation on scans), and drug-free remission (maintained without medications). With current treatment approaches, particularly early intervention with disease-modifying drugs, remission is an achievable goal for many patients, though some may still require ongoing treatment to maintain it.'
      },
      {
        question: 'Does diet affect rheumatoid arthritis?',
        answer: 'While diet alone cannot cure rheumatoid arthritis, certain dietary choices may help manage symptoms. Anti-inflammatory diets like the Mediterranean diet (rich in fish, olive oil, fruits, vegetables, and whole grains) have shown benefits in some studies. Some patients report improvement when avoiding potential trigger foods like dairy, gluten, or nightshades, though evidence varies. Omega-3 fatty acids from fish oil have anti-inflammatory properties that may help reduce joint pain. Maintaining a healthy weight reduces stress on joints. It\'s recommended to discuss dietary changes with healthcare providers.'
      }
    ],
    emergencySigns: [
      'Sudden inability to move a joint',
      'Joint that is markedly red, hot, and swollen',
      'Severe, unexplained joint pain',
      'Significant and rapid weight loss',
      'High fever accompanying joint symptoms',
      'Chest pain or shortness of breath (may indicate lung or heart complications)'
    ],
    prevalence: 'Rheumatoid arthritis affects approximately 14 million people worldwide. In the United States, about 1.3 million people (0.5-1% of the adult population) have RA.',
    affectedGroups: [
      'Women (2-3 times more likely than men)',
      'Adults in their 40s-60s (most common onset)',
      'People with family history of RA',
      'Smokers (higher risk and more severe disease)',
      'Those with specific genetic markers (HLA-DR4)',
      'People who are overweight or obese',
      'Those exposed to certain environmental factors like asbestos or silica'
    ]
  }
];

export default conditionsPtoR;
