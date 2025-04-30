import { HealthCondition } from '../healthConditionsData';

/**
 * Health conditions starting with letters J-L
 */
export const conditionsJtoL: HealthCondition[] = [
  {
    id: 'leishmaniasis',
    name: 'Leishmaniasis',
    description: 'A parasitic disease transmitted by the bite of infected female sandflies, causing skin sores, ulcers, or serious systemic infection affecting internal organs.',
    category: 'infectious-diseases',
    subcategory: 'parasitic-infections',
    symptoms: [
      'Cutaneous form: Skin ulcers or sores at bite site',
      'Visceral form: Irregular fever, weight loss, anemia',
      'Enlargement of spleen and liver',
      'Darkening of skin',
      'Fatigue',
      'Weakness',
      'Mucosal form: Damage to mucous membranes of nose, mouth, throat',
      'Secondary bacterial infections',
      'Bleeding from affected mucous membranes',
      'Disfigurement in advanced cases'
    ],
    causes: [
      'Infection with Leishmania parasites',
      'Transmitted by the bite of infected female phlebotomine sandflies',
      'Most common in tropical and subtropical regions',
      'Increased risk in areas with poor sanitation',
      'Environmental changes that increase sandfly habitats'
    ],
    treatments: [
      'Cutaneous: Pentavalent antimonial drugs, amphotericin B, miltefosine',
      'Visceral: Liposomal amphotericin B, pentavalent antimonials, miltefosine, paromomycin',
      'Local treatment for simple cutaneous lesions (cryotherapy, thermotherapy)',
      'Supportive care for nutritional deficiencies',
      'Management of secondary infections',
      'Reconstructive surgery for disfigurement in severe cases'
    ],
    preventions: [
      'Using insect repellent in endemic areas',
      'Sleeping under insecticide-treated bed nets',
      'Wearing clothing that covers exposed skin',
      'Avoiding outdoor activities during peak sandfly activity (dusk to dawn)',
      'Indoor residual spraying with insecticides',
      'Environmental management to reduce sandfly breeding sites',
      'Control of animal reservoirs in some settings'
    ],
    relatedConditions: ['malaria', 'african-trypanosomiasis', 'chagas-disease', 'cutaneous-bacterial-infections'],
    commonQuestions: [
      {
        question: 'Can leishmaniasis be transmitted from person to person?',
        answer: 'Leishmaniasis is not typically transmitted directly from person to person. It requires transmission through the bite of infected sandflies. In rare cases, transmission can occur through blood transfusions, shared needles, congenital transmission (mother to child), or very rarely through sexual contact, but the primary route is vector-borne transmission via sandflies.'
      },
      {
        question: 'What is the difference between cutaneous and visceral leishmaniasis?',
        answer: 'Cutaneous leishmaniasis affects the skin, causing sores or ulcers at the site of sandfly bites that may heal spontaneously but often leave scars. Visceral leishmaniasis (also known as kala-azar) is more serious, affecting internal organs like the spleen, liver, and bone marrow, causing fever, weight loss, anemia, and enlarged spleen and liver. Without treatment, visceral leishmaniasis is usually fatal.'
      }
    ],
    emergencySigns: [
      'High fever with significant weight loss',
      'Severe bleeding from mucous membranes',
      'Signs of secondary bacterial infection (increasing redness, warmth, pain)',
      'Difficulty breathing or swallowing (with mucosal involvement)',
      'Extreme weakness and fatigue (suggesting advanced visceral disease)'
    ],
    prevalence: 'Leishmaniasis affects people in over 90 countries in tropical and subtropical regions. An estimated 700,000 to 1 million new cases occur annually, with 20,000-30,000 deaths from visceral leishmaniasis.',
    affectedGroups: [
      'People living in or traveling to endemic areas',
      'Those with inadequate housing and sanitation',
      'People with compromised immune systems (especially for visceral form)',
      'Migrant populations moving into endemic areas',
      'Children in some endemic regions (particularly for visceral form)'
    ]
  },
  {
    id: 'kidney-disease',
    name: 'Kidney Disease',
    description: 'A condition where kidney function gradually declines, affecting the body\'s ability to filter waste and excess fluids from the blood, potentially leading to kidney failure if untreated.',
    category: 'urinary-system',
    symptoms: [
      'Fatigue',
      'Difficulty sleeping',
      'Dry, itchy skin',
      'Frequent urination, especially at night',
      'Blood in urine',
      'Foamy urine',
      'Puffy eyes',
      'Swelling in feet and ankles',
      'Poor appetite',
      'Muscle cramps',
      'Difficulty concentrating'
    ],
    causes: [
      'Diabetes (leading cause)',
      'High blood pressure (hypertension)',
      'Glomerulonephritis (inflammation of kidney filtering units)',
      'Polycystic kidney disease',
      'Recurring kidney infections',
      'Prolonged obstruction of the urinary tract',
      'Vesicoureteral reflux (urine backs up to kidneys)',
      'Certain medications and toxins',
      'Autoimmune diseases like lupus'
    ],
    treatments: [
      'Medications to control blood pressure',
      'Medications to lower cholesterol levels',
      'Medications to treat anemia',
      'Medications to relieve swelling',
      'Dietary changes (low sodium, low protein)',
      'Limiting fluid intake',
      'Dialysis (hemodialysis or peritoneal dialysis)',
      'Kidney transplant',
      'Treating underlying conditions'
    ],
    preventions: [
      'Managing diabetes and high blood pressure',
      'Maintaining a healthy weight',
      'Following a balanced, low-salt diet',
      'Regular exercise',
      'Not smoking',
      'Limiting alcohol consumption',
      'Regular check-ups with kidney function tests',
      'Using medications like NSAIDs cautiously',
      'Staying hydrated'
    ],
    relatedConditions: [
      'diabetes',
      'hypertension',
      'heart-disease',
      'anemia',
      'bone-disease',
      'nerve-damage',
      'metabolic-acidosis'
    ],
    commonQuestions: [
      {
        question: 'What are the stages of chronic kidney disease?',
        answer: 'Chronic kidney disease is classified into five stages based on how well the kidneys filter waste (glomerular filtration rate or GFR): Stage 1 (normal or high GFR with signs of kidney damage), Stage 2 (mildly reduced GFR with kidney damage), Stage 3 (moderately reduced GFR), Stage 4 (severely reduced GFR), and Stage 5 (kidney failure, also called end-stage renal disease). Treatment approaches vary by stage, with earlier intervention yielding better outcomes.'
      },
      {
        question: 'How do doctors test for kidney disease?',
        answer: 'Kidney function is primarily evaluated through blood tests (serum creatinine, blood urea nitrogen, estimated GFR) and urine tests (checking for protein or albumin). Imaging tests like ultrasound, CT scan, or MRI may be used to examine kidney structure. In some cases, a kidney biopsy (removing a small tissue sample) may be necessary to determine the cause of kidney disease or extent of damage.'
      },
      {
        question: 'Can kidney damage be reversed?',
        answer: 'Whether kidney damage can be reversed depends on the cause and severity. Acute kidney injury may be reversible if the underlying cause is treated promptly. However, chronic kidney disease typically cannot be reversed, though treatment can slow or stop progression. In early stages, addressing risk factors like high blood pressure and diabetes can help preserve remaining kidney function. Once significant damage occurs, it\'s generally permanent.'
      }
    ],
    emergencySigns: [
      'Severe, sudden decrease in kidney function',
      'Chest pain or pressure',
      'Shortness of breath',
      'Severe, sudden swelling',
      'Confusion or drowsiness',
      'Seizures',
      'High potassium levels (causing irregular heartbeat)'
    ],
    prevalence: 'Chronic kidney disease affects approximately 37 million adults in the United States (15% of the adult population) and about 10% of the global population.',
    affectedGroups: [
      'Older adults',
      'People with diabetes',
      'People with high blood pressure',
      'Those with family history of kidney disease',
      'African Americans, Hispanic Americans, Native Americans (higher rates)',
      'People who are obese',
      'Those who smoke'
    ]
  },
  {
    id: 'leukemia',
    name: 'Leukemia',
    description: 'A cancer of blood-forming tissues, including bone marrow, that affects the production and function of blood cells, particularly white blood cells.',
    category: 'cancer',
    symptoms: [
      'Fatigue and weakness',
      'Frequent infections',
      'Easy bleeding or bruising',
      'Recurring nosebleeds',
      'Tiny red spots in the skin (petechiae)',
      'Excessive sweating, especially at night',
      'Bone pain or tenderness',
      'Unexplained weight loss',
      'Swollen lymph nodes',
      'Enlarged liver or spleen',
      'Fever or chills'
    ],
    causes: [
      'Genetic mutations in DNA of blood cells',
      'Exposure to high levels of radiation',
      'Exposure to certain chemicals (benzene)',
      'Previous cancer treatment (certain chemotherapy)',
      'Genetic disorders (Down syndrome)',
      'Certain blood disorders (myelodysplastic syndromes)',
      'Family history of leukemia',
      'Smoking'
    ],
    treatments: [
      'Chemotherapy',
      'Targeted therapy',
      'Immunotherapy',
      'Radiation therapy',
      'Stem cell transplant (bone marrow transplant)',
      'CAR-T cell therapy',
      'Biological therapy',
      'Supportive care for symptoms and treatment side effects'
    ],
    preventions: [
      'Avoiding exposure to high doses of radiation',
      'Limiting exposure to chemicals like benzene',
      'Not smoking',
      'Maintaining a healthy lifestyle',
      'No proven ways to prevent most types of leukemia',
      'Regular medical check-ups for early detection'
    ],
    relatedConditions: [
      'myelodysplastic-syndrome',
      'lymphoma',
      'multiple-myeloma',
      'aplastic-anemia',
      'myeloproliferative-disorders'
    ],
    commonQuestions: [
      {
        question: 'What are the different types of leukemia?',
        answer: 'Leukemia is classified by how quickly it progresses (acute or chronic) and the type of blood cell affected (lymphocytic or myeloid). The four main types are Acute Lymphoblastic Leukemia (ALL), Acute Myeloid Leukemia (AML), Chronic Lymphocytic Leukemia (CLL), and Chronic Myeloid Leukemia (CML). Each type affects different populations and has different treatment approaches and prognoses.'
      },
      {
        question: 'What is the survival rate for leukemia?',
        answer: 'Survival rates vary widely depending on the type of leukemia, age at diagnosis, overall health, and response to treatment. For all types combined, the five-year relative survival rate is about 65%. Acute Lymphoblastic Leukemia (ALL) in children has one of the highest cure rates at about 90%. Chronic Myeloid Leukemia (CML) has seen dramatic improvements in survival with targeted therapies. It\'s important to discuss individual prognosis with healthcare providers.'
      },
      {
        question: 'Is leukemia hereditary?',
        answer: 'Most cases of leukemia are not hereditary. However, certain genetic conditions and family history can increase risk. For example, having an identical twin with leukemia or a sibling with leukemia slightly increases risk. Some genetic syndromes like Down syndrome, Fanconi anemia, and Li-Fraumeni syndrome are associated with higher leukemia risk. Most cases develop from acquired genetic mutations during a person\'s lifetime rather than inherited mutations.'
      }
    ],
    emergencySigns: [
      'High fever with chills',
      'Severe shortness of breath',
      'Severe bleeding that doesn\'t stop with pressure',
      'Extreme fatigue or weakness making daily activities impossible',
      'Severe, persistent headache',
      'Sudden confusion or altered mental state',
      'Severe pain unrelieved by medication'
    ],
    prevalence: 'Leukemia accounts for approximately 3.5% of all new cancer cases in the United States, with about 60,530 new cases diagnosed annually. Globally, there are over 350,000 new cases each year.',
    affectedGroups: [
      'Children (ALL is the most common childhood cancer)',
      'Adults over 55 (higher rates of AML and CLL)',
      'Males (slightly higher risk than females)',
      'People with certain genetic disorders',
      'Those with prior exposure to high radiation levels or certain chemicals',
      'People previously treated with certain chemotherapy drugs',
      'Individuals with myelodysplastic syndrome'
    ]
  },
  {
    id: 'lupus',
    name: 'Lupus',
    description: 'A chronic autoimmune disease where the immune system attacks the body\'s own tissues and organs, causing inflammation and damage throughout the body.',
    category: 'immune-system',
    symptoms: [
      'Fatigue',
      'Fever',
      'Joint pain, stiffness, and swelling',
      'Butterfly-shaped rash on the face',
      'Skin lesions that worsen with sun exposure',
      'Fingers and toes that turn white or blue when cold or stressed',
      'Shortness of breath',
      'Chest pain',
      'Dry eyes',
      'Headaches, confusion, and memory loss',
      'Hair loss',
      'Mouth sores'
    ],
    causes: [
      'Genetic factors',
      'Environmental triggers (sunlight, infections)',
      'Hormonal factors (more common in women)',
      'Certain medications',
      'Stress',
      'Smoking',
      'Exposure to silica dust or certain chemicals'
    ],
    treatments: [
      'NSAIDs for pain and inflammation',
      'Antimalarial drugs (hydroxychloroquine)',
      'Corticosteroids',
      'Immunosuppressants',
      'Biologics (belimumab)',
      'Physical therapy',
      'Lifestyle modifications',
      'Treatment for specific organ involvement',
      'Sun protection'
    ],
    preventions: [
      'No proven way to prevent lupus',
      'Avoiding triggers that worsen symptoms:',
      'Sun protection',
      'Stress management',
      'Regular exercise',
      'Healthy diet',
      'Adequate rest',
      'Avoiding smoking',
      'Regular medical care for early detection and management'
    ],
    relatedConditions: [
      'rheumatoid-arthritis',
      'sjogrens-syndrome',
      'scleroderma',
      'antiphospholipid-syndrome',
      'kidney-disease',
      'heart-disease',
      'fibromyalgia'
    ],
    commonQuestions: [
      {
        question: 'Can lupus be cured?',
        answer: 'Currently, there is no cure for lupus. However, with proper treatment and management, most people with lupus can lead active, healthy lives. Treatment focuses on controlling symptoms, preventing flares, minimizing organ damage, and improving quality of life. Research continues to advance our understanding of lupus and develop new therapeutic approaches.'
      },
      {
        question: 'Is lupus contagious?',
        answer: 'No, lupus is not contagious. It cannot be spread from person to person through physical contact, air, water, or any other means. Lupus is an autoimmune condition that develops due to a combination of genetic predisposition and environmental triggers, causing the immune system to mistakenly attack the body\'s own tissues.'
      },
      {
        question: 'How does lupus affect pregnancy?',
        answer: 'Lupus can complicate pregnancy, increasing risks of miscarriage, preterm birth, preeclampsia, and fetal growth restriction. However, with proper planning and care, most women with lupus can have successful pregnancies. It\'s important to have the disease well-controlled before conception, work with a high-risk obstetrician and rheumatologist, and receive close monitoring throughout pregnancy. Some lupus medications need to be adjusted during pregnancy.'
      }
    ],
    emergencySigns: [
      'Severe chest pain or difficulty breathing',
      'Severe headache with confusion or seizures',
      'Severe abdominal pain',
      'New or worsening neurological symptoms (vision changes, weakness, numbness)',
      'Significant unexplained fever',
      'Severe depression or thoughts of self-harm'
    ],
    prevalence: 'Lupus affects approximately 1.5 million Americans and at least 5 million people worldwide. The prevalence varies by race and ethnicity, with higher rates in certain populations.',
    affectedGroups: [
      'Women of childbearing age (9 out of 10 adults with lupus are women)',
      'African Americans (4 times more common than in white populations)',
      'Hispanics, Asians, and Native Americans (higher rates than whites)',
      'People with family history of lupus or other autoimmune diseases',
      'People aged 15-44 (most common age of onset)'
    ]
  },
  {
    id: 'lymphatic-filariasis',
    name: 'Lymphatic Filariasis',
    description: 'A parasitic disease caused by thread-like worms that damage the lymphatic system, leading to severe, disfiguring swelling of the limbs and genitals (elephantiasis) if untreated.',
    category: 'infectious-diseases',
    subcategory: 'parasitic-infections',
    symptoms: [
      'Asymptomatic infection (most common initial state)',
      'Acute episodes of fever, chills, and inflammation',
      'Lymphedema (swelling of arms, legs, breasts, or genitals)',
      'Elephantiasis (extreme, disfiguring swelling with thickened, rough skin)',
      'Hydrocele (fluid collection in scrotum)',
      'Painful, inflamed lymph nodes',
      'Bacterial infections of affected areas',
      'Reduced immune function in affected limbs',
      'Chyluria (milky urine)',
      'Breathing problems if chest lymphatics affected'
    ],
    causes: [
      'Infection with filarial parasites (Wuchereria bancrofti, Brugia malayi, Brugia timori)',
      'Transmission through mosquito bites (Anopheles, Culex, Aedes, Mansonia)',
      'Repeated exposure in endemic areas increases infection risk',
      'Adult worms live in lymphatic vessels and release microfilariae into bloodstream'
    ],
    treatments: [
      'Mass drug administration (MDA) with diethylcarbamazine, ivermectin, and albendazole',
      'Hygiene management of affected limbs',
      'Compression bandaging',
      'Elevation of affected limbs',
      'Exercise to promote lymph drainage',
      'Antibiotics for secondary bacterial infections',
      'Surgery for hydrocele',
      'Management of acute inflammatory episodes'
    ],
    preventions: [
      'Mass drug administration in endemic communities',
      'Using mosquito nets while sleeping',
      'Applying insect repellent',
      'Wearing clothing that covers exposed skin',
      'Vector control measures (insecticides, removing breeding sites)',
      'Improved sanitation',
      'Treatment of infected individuals to prevent transmission'
    ],
    relatedConditions: ['elephantiasis', 'secondary-bacterial-infections', 'onchocerciasis', 'loiasis'],
    commonQuestions: [
      {
        question: 'Is lymphatic filariasis contagious from person to person?',
        answer: 'Lymphatic filariasis is not directly contagious from person to person. It requires a mosquito vector to transmit the parasitic worms between people. When a mosquito bites an infected person, it picks up microfilariae in the blood, which develop into infective larvae inside the mosquito. These larvae are then transmitted to another person during a subsequent bite.'
      },
      {
        question: 'Can the disfigurement caused by elephantiasis be reversed?',
        answer: 'Once advanced elephantiasis with significant tissue changes has developed, the disfigurement cannot be completely reversed. However, proper management can prevent progression, reduce swelling, and improve quality of life. Early intervention before permanent changes occur offers the best chance of managing the condition effectively. The global elimination program focuses on preventing new infections and providing support for those already affected.'
      }
    ],
    emergencySigns: [
      'Severe, acute bacterial infection in affected limbs',
      'High fever with inflamed, red, painful limb',
      'Signs of sepsis (extremely low blood pressure, confusion)',
      'Inability to breathe properly (if chest or neck involvement)',
      'Complete obstruction of lymphatic drainage'
    ],
    prevalence: 'Lymphatic filariasis is a neglected tropical disease that affects over 120 million people in 72 countries across Africa, Asia, the Western Pacific, and parts of the Caribbean and South America.',
    affectedGroups: [
      'People living in tropical and subtropical regions',
      'Rural populations with limited access to healthcare',
      'Communities with poor sanitation and inadequate mosquito control',
      'Adults (symptoms usually develop after prolonged exposure)',
      'People living in coastal regions and river valleys in endemic areas'
    ]
  }
];

export default conditionsJtoL;
