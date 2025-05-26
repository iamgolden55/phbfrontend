import { HealthCondition } from '../healthConditionsData';

/**
 * Health conditions starting with letters P-R
 */
export const conditionsPtoR: HealthCondition[] = [
  {
    id: 'parkinsons-disease',
    name: 'Parkinson\'s Disease',
    description: 'A progressive neurodegenerative disorder that affects predominantly dopamine-producing neurons in a specific area of the brain called substantia nigra.[1] Parkinson\'s disease is characterized by motor symptoms such as tremors, rigidity, slowness of movement, and impaired balance and coordination.[2] Non-motor symptoms like cognitive impairment, mood disorders, sleep difficulties, and autonomic dysfunction may also occur.[3] The disease typically develops gradually, with symptoms worsening over time.[4] While there is no cure, treatments can help manage symptoms and improve quality of life.[5]',
    category: 'brain-and-nerves',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Parkinson%27s_disease',
    symptoms: [
      'Tremor (usually begins in a limb, often the hand or fingers)',
      'Bradykinesia (slowness of movement)',
      'Rigidity or stiffness of the limbs and trunk',
      'Impaired balance and coordination, sometimes leading to falls',
      'Loss of automatic movements (reduced blinking, arm swinging while walking)',
      'Speech changes (speaking softly, quickly, slurring or hesitating)',
      'Writing changes (handwriting becomes small and cramped)',
      'Stooped posture',
      'Facial masking (reduced facial expression)',
      'Cognitive impairment (varying from mild to dementia)',
      'Depression and anxiety',
      'Sleep disorders (REM sleep behavior disorder, insomnia)',
      'Constipation and urinary problems',
      'Fatigue',
      'Loss of sense of smell'
    ],
    causes: [
      'Degeneration of dopamine-producing neurons in the substantia nigra',
      'Presence of Lewy bodies (abnormal protein deposits) in brain cells',
      'Genetic factors (several gene mutations linked to Parkinson\'s)',
      'Environmental factors (exposure to certain toxins or pesticides)',
      'Age-related changes in the brain',
      'Head injuries',
      'Oxidative stress and mitochondrial dysfunction',
      'Inflammation',
      'Protein misfolding and aggregation'
    ],
    treatments: [
      'Medications to increase dopamine levels (levodopa)',
      'Dopamine agonists (ropinirole, pramipexole)',
      'MAO-B inhibitors (selegiline, rasagiline)',
      'COMT inhibitors (entacapone)',
      'Anticholinergics for tremor (trihexyphenidyl)',
      'Deep brain stimulation surgery',
      'Focused ultrasound treatment',
      'Physical therapy to improve balance and mobility',
      'Occupational therapy for daily living activities',
      'Speech therapy',
      'Exercise programs (including tai chi, yoga, dancing)',
      'Experimental treatments (gene therapy, stem cell therapy)'
    ],
    preventions: [
      'No proven ways to prevent Parkinson\'s disease',
      'Regular exercise may reduce risk',
      'Caffeine consumption (particularly coffee) associated with lower risk',
      'Avoiding exposure to pesticides and environmental toxins',
      'Anti-inflammatory diet (Mediterranean diet)',
      'Adequate vitamin D levels',
      'Neuroprotective strategies under investigation'
    ],
    relatedConditions: [
      'lewy-body-dementia',
      'multiple-system-atrophy',
      'progressive-supranuclear-palsy',
      'corticobasal-degeneration',
      'essential-tremor',
      'drug-induced-parkinsonism',
      'vascular-parkinsonism',
      'normal-pressure-hydrocephalus',
      'alzheimers-disease'
    ],
    commonQuestions: [
      {
        question: 'Is Parkinson\'s disease hereditary?',
        answer: 'Parkinson\'s disease has both genetic and environmental components, but most cases are not directly inherited. About 10-15% of people with Parkinson\'s have a family history of the disease. Several gene mutations have been identified that can cause or increase the risk of developing Parkinson\'s, including mutations in the LRRK2, PARK7, PINK1, PRKN, and SNCA genes. However, the majority of cases (about 85-90%) are classified as "sporadic" or "idiopathic," meaning they occur without a clear family history or known genetic cause. Even in cases with identified genetic factors, environmental influences likely play a role in determining whether someone develops the disease. If you have a first-degree relative (parent or sibling) with Parkinson\'s, your risk is slightly higher than the general population, but still relatively low.'
      },
      {
        question: 'How quickly does Parkinson\'s disease progress?',
        answer: 'The progression of Parkinson\'s disease varies significantly from person to person. Some people experience a slow progression over many years with minimal disability, while others may develop more severe symptoms more rapidly. On average, Parkinson\'s progresses through stages over decades rather than months or years. Factors that may influence progression rate include age of onset (younger onset often progresses more slowly), specific genetic factors, presence of certain symptoms at onset, and individual response to treatment. The disease typically follows a pattern of gradual worsening with periodic plateaus, rather than a steady decline. Modern treatments can significantly slow the apparent progression of symptoms, though they don\'t halt the underlying neurodegenerative process. Regular exercise, proper medication management, and multidisciplinary care may help slow functional decline and maintain quality of life longer.'
      },
      {
        question: 'What is the difference between essential tremor and Parkinson\'s disease?',
        answer: 'While both conditions involve tremors, they differ in several important ways: 1) Tremor characteristics: Essential tremor typically causes action tremor (occurring during voluntary movement) and is most noticeable when using the hands for activities like drinking, eating, or writing. Parkinson\'s tremor is usually a resting tremor (occurring when the body part is relaxed and supported) and often presents as a pill-rolling motion of the thumb and forefinger. 2) Associated symptoms: Essential tremor primarily causes tremors, with few other neurological symptoms. Parkinson\'s includes additional cardinal signs such as bradykinesia (slowness of movement), rigidity, and postural instability. 3) Body parts affected: Essential tremor commonly affects the hands, head, and voice. Parkinson\'s tremor typically starts in one hand or foot and may progress to affect the same limb on the opposite side. 4) Response to alcohol: Essential tremor often temporarily improves after consuming alcohol, while Parkinson\'s tremor typically doesn\'t respond to alcohol. 5) Family history: Essential tremor has a stronger hereditary component, with about 50% of cases having a family history. Accurate diagnosis is important as the treatments and prognosis differ between these conditions.'
      }
    ],
    emergencySigns: [
      'Sudden inability to move ("freezing" that doesn\'t resolve)',
      'Falls resulting in serious injury',
      'Severe difficulty swallowing or choking',
      'Hallucinations or delusions causing dangerous behavior',
      'Neuroleptic malignant syndrome from medication (high fever, muscle rigidity, altered consciousness)',
      'Severe depression with suicidal thoughts',
      'Severe side effects from medication adjustments'
    ],
    prevalence: 'Parkinson\'s disease affects approximately 1% of the population over age 60 worldwide, making it the second most common neurodegenerative disorder after Alzheimer\'s disease. In the United States, about 1 million people are living with Parkinson\'s, with approximately 60,000 new diagnoses each year. The prevalence increases with age, reaching nearly 2-3% in those over 80 years old. Men are about 1.5 times more likely to develop Parkinson\'s than women.',
    affectedGroups: [
      'Older adults (most cases diagnosed after age 60)',
      'Men (higher incidence than women)',
      'People with family history of Parkinson\'s',
      'Individuals with certain genetic mutations (LRRK2, SNCA, etc.)',
      'People with history of head trauma',
      'Those with occupational exposure to certain chemicals (pesticides, herbicides)',
      'Agricultural workers and those living in rural areas (possibly due to environmental exposures)',
      'People with reduced sense of smell (hyposmia)'
    ],
    references: [
      {
        id: '1',
        text: 'Poewe W, Seppi K, Tanner CM, et al. (2017). "Parkinson disease". Nature Reviews Disease Primers. 3: 17013.',
        url: 'https://doi.org/10.1038/nrdp.2017.13'
      },
      {
        id: '2',
        text: 'Armstrong MJ, Okun MS. (2020). "Diagnosis and Treatment of Parkinson Disease: A Review". JAMA. 323 (6): 548-560.',
        url: 'https://doi.org/10.1001/jama.2019.22360'
      },
      {
        id: '3',
        text: 'Schapira AHV, Chaudhuri KR, Jenner P. (2017). "Non-motor features of Parkinson disease". Nature Reviews Neuroscience. 18 (7): 435-450.',
        url: 'https://doi.org/10.1038/nrn.2017.62'
      },
      {
        id: '4',
        text: 'Kalia LV, Lang AE. (2015). "Parkinson\'s disease". Lancet. 386 (9996): 896-912.',
        url: 'https://doi.org/10.1016/S0140-6736(14)61393-3'
      },
      {
        id: '5',
        text: 'Bloem BR, Okun MS, Klein C. (2021). "Parkinson\'s disease". Lancet. 397 (10291): 2284-2303.',
        url: 'https://doi.org/10.1016/S0140-6736(21)00218-X'
      }
    ]
  },
  {
    id: 'q-fever',
    name: 'Q Fever',
    description: 'A bacterial infection caused by Coxiella burnetii, primarily spread to humans through contact with infected animals, especially cattle, sheep, and goats.[1] The name "Q fever" comes from "query fever," coined during an outbreak among Australian abattoir workers in 1935 when the cause was unknown.[2] While many infected people have no or mild symptoms, Q fever can cause acute illness with flu-like symptoms, pneumonia, or hepatitis.[3] In some cases, it can develop into a chronic infection affecting the heart (endocarditis) or other organs.[4] Early antibiotic treatment is highly effective for acute infections, but chronic Q fever requires long-term therapy.[5]',
    category: 'infectious-diseases',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Q_fever',
    symptoms: [
      'Acute Q fever (approximately 60% of infections are asymptomatic):',
      'High fever (often sudden onset)',
      'Severe headache',
      'Fatigue',
      'Muscle pain and body aches',
      'Chills and sweats',
      'Nausea, vomiting, or diarrhea',
      'Chest pain',
      'Dry cough',
      'Pneumonia (in some cases)',
      'Hepatitis with liver enlargement (in some cases)',
      'Skin rash (uncommon)',
      'Chronic Q fever:',
      'Endocarditis (heart valve infection)',
      'Vascular infections (infected aneurysms or vascular grafts)',
      'Recurrent fevers',
      'Night sweats',
      'Fatigue',
      'Weight loss',
      'Chronic hepatitis',
      'Osteomyelitis (bone infection)',
      'Post-Q fever fatigue syndrome:',
      'Persistent fatigue',
      'Muscle and joint pain',
      'Headaches',
      'Sleep disturbances',
      'Cognitive difficulties'
    ],
    causes: [
      'Infection with the bacterium Coxiella burnetii',
      'Primary transmission routes:',
      'Inhalation of contaminated dust or aerosols from infected animals',
      'Direct contact with infected animals (particularly during birthing)',
      'Contact with contaminated materials (wool, hides, straw)',
      'Consumption of unpasteurized dairy products',
      'Tick bites (rarely)',
      'Risk factors:',
      'Occupational exposure (farmers, veterinarians, abattoir workers)',
      'Living in rural areas near livestock',
      'Visiting farms or animal facilities',
      'Pre-existing heart valve disease (risk factor for chronic Q fever)',
      'Immunocompromised status',
      'Pregnancy'
    ],
    treatments: [
      'Acute Q fever:',
      'Doxycycline (first-line treatment, typically for 2-3 weeks)',
      'Alternative antibiotics for those who cannot take doxycycline:',
      'Fluoroquinolones (e.g., moxifloxacin)',
      'Trimethoprim-sulfamethoxazole',
      'Macrolides (less effective)',
      'Supportive care for symptoms',
      'Chronic Q fever:',
      'Long-term combination antibiotic therapy (typically 18-24 months or longer):',
      'Doxycycline plus hydroxychloroquine (first-line therapy)',
      'Alternative regimens for those who cannot tolerate first-line therapy',
      'Regular monitoring of antibiotic levels and effectiveness',
      'Surgical intervention for infected vascular grafts or heart valves when necessary',
      'Post-Q fever fatigue syndrome:',
      'Graded exercise therapy',
      'Cognitive behavioral therapy',
      'Symptomatic treatment'
    ],
    preventions: [
      'Occupational precautions:',
      'Wearing appropriate personal protective equipment when working with animals',
      'Proper disposal of animal birth products and contaminated materials',
      'Good hygiene practices in animal handling settings',
      'General precautions:',
      'Avoiding unpasteurized dairy products',
      'Washing hands after animal contact',
      'Laundering potentially contaminated clothing separately',
      'Appropriate tick prevention measures in endemic areas',
      'Vaccination:',
      'Occupational vaccination for high-risk workers (available in some countries)',
      'Animal vaccination to reduce bacterial shedding',
      'Environmental measures:',
      'Proper disposal of animal waste',
      'Controlling dust in livestock areas',
      'Restricting access to areas where infected animals have been kept'
    ],
    relatedConditions: [
      'brucellosis',
      'leptospirosis',
      'psittacosis',
      'tularemia',
      'infectious-endocarditis',
      'pneumonia',
      'hepatitis',
      'chronic-fatigue-syndrome'
    ],
    commonQuestions: [
      {
        question: 'Can Q fever be transmitted from person to person?',
        answer: 'Direct person-to-person transmission of Q fever is extremely rare. Unlike many other infectious diseases, Q fever is primarily zoonotic, meaning it spreads from animals to humans rather than between humans. The main routes of transmission involve exposure to infected animals (particularly cattle, sheep, and goats) or their environments through inhalation of contaminated aerosols or dust particles. However, there are a few documented special circumstances where human-to-human transmission might occur: 1) Transmission through blood transfusion from an infected donor; 2) Vertical transmission from an infected mother to her fetus during pregnancy; 3) Sexual transmission (extremely rare and not well-documented); 4) Potential transmission during childbirth or via breast milk (also rare). In healthcare settings, standard precautions are generally sufficient when caring for patients with Q fever, as the risk of transmission from patients to healthcare workers is minimal. This is in contrast to many other infectious diseases that require special isolation precautions.'
      },
      {
        question: 'How long does Q fever last if untreated?',
        answer: 'The duration and course of untreated Q fever vary significantly depending on whether it\'s acute or chronic infection. Acute Q fever, even without treatment, is often self-limiting in healthy individuals. Symptoms typically appear 2-3 weeks after exposure and usually last 1-2 weeks, though they can persist for up to 90 days in some cases. Most people recover completely without specific treatment, although fatigue and weakness may linger for months. However, about 2-5% of acute Q fever patients may develop chronic Q fever, which can manifest months or even years after the initial infection. Without treatment, chronic Q fever can persist indefinitely and lead to serious complications like endocarditis (heart valve infection), which has a high mortality rate if untreated. Additionally, about 10-20% of acute Q fever patients develop post-Q fever fatigue syndrome, which can cause debilitating fatigue and other symptoms lasting for years without proper management. Because of these potential complications, antibiotic treatment is recommended for diagnosed cases of Q fever, even for those with mild symptoms.'
      },
      {
        question: 'Is Q fever common in the United States?',
        answer: 'Q fever is relatively uncommon in the United States, but it is likely underdiagnosed and underreported due to its nonspecific symptoms and the specialized testing required for diagnosis. According to the Centers for Disease Control and Prevention (CDC), approximately 100-200 cases of Q fever are reported annually in the US, though the actual number of infections is estimated to be much higher. The disease is more prevalent in certain regions and populations, particularly in rural agricultural areas with livestock operations. States with significant cattle, sheep, and goat industries tend to report more cases. Occupational exposure accounts for many cases, with farmers, veterinarians, slaughterhouse workers, and laboratory personnel working with the bacterium at higher risk. Unlike some other countries such as Australia and parts of Europe where Q fever is more endemic and recognized, awareness of the disease among US healthcare providers may be lower, contributing to missed diagnoses. The CDC considers Q fever a notifiable disease and a potential bioterrorism agent due to its high infectivity, environmental stability, and potential for aerosol transmission.'
      }
    ],
    emergencySigns: [
      'High fever (over 104°F/40°C) that doesn\'t respond to treatment',
      'Severe difficulty breathing or chest pain',
      'Signs of endocarditis (in chronic Q fever):',
      'New heart murmur',
      'Unexplained heart failure symptoms',
      'Persistent fever with known heart valve disease',
      'Neurological symptoms:',
      'Severe headache with stiff neck',
      'Confusion or altered mental status',
      'Seizures',
      'Signs of liver failure:',
      'Jaundice (yellowing of skin or eyes)',
      'Severe abdominal pain',
      'Easy bruising or bleeding'
    ],
    prevalence: 'Q fever occurs worldwide, with varying prevalence by region. In endemic areas, seroprevalence studies suggest 10-60% of certain populations (particularly those with occupational exposure) have been infected at some point. The annual incidence ranges from approximately 0.1 to 10 per 100,000 population, varying significantly by country and region. Australia, France, Spain, and the Netherlands have reported notable outbreaks, with the largest recorded outbreak occurring in the Netherlands between 2007-2010, affecting over 4,000 people. In the United States, only 100-200 cases are reported annually, though the actual number is likely much higher due to underdiagnosis and underreporting. Q fever affects all age groups, though clinical disease is more commonly diagnosed in adults, with a peak incidence in those aged 30-70 years.',
    affectedGroups: [
      'Occupational risk groups:',
      'Farmers and farm workers',
      'Veterinarians and veterinary staff',
      'Abattoir and meat processing workers',
      'Wool and hide processors',
      'Laboratory workers handling Coxiella burnetii',
      'Animal transport workers',
      'Demographic factors:',
      'Adults more commonly diagnosed than children',
      'Men more frequently affected than women (likely due to occupational exposure)',
      'Rural residents with livestock exposure',
      'High-risk groups for severe or chronic disease:',
      'People with pre-existing heart valve abnormalities',
      'Individuals with vascular grafts or aneurysms',
      'Immunocompromised persons',
      'Pregnant women (risk for adverse pregnancy outcomes)',
      'Elderly individuals'
    ],
    references: [
      {
        id: '1',
        text: 'Eldin C, Mélenotte C, Mediannikov O, et al. (2017). "From Q Fever to Coxiella burnetii Infection: a Paradigm Change". Clinical Microbiology Reviews. 30 (1): 115-190.',
        url: 'https://doi.org/10.1128/CMR.00045-16'
      },
      {
        id: '2',
        text: 'Parker NR, Barralet JH, Bell AM. (2006). "Q fever". Lancet. 367 (9511): 679-688.',
        url: 'https://doi.org/10.1016/S0140-6736(06)68266-4'
      },
      {
        id: '3',
        text: 'Anderson A, Bijlmer H, Fournier PE, et al. (2013). "Diagnosis and management of Q fever--United States, 2013: recommendations from CDC and the Q Fever Working Group". MMWR Recommendations and Reports. 62 (RR-03): 1-30.',
        url: 'https://www.cdc.gov/mmwr/preview/mmwrhtml/rr6203a1.htm'
      },
      {
        id: '4',
        text: 'Million M, Raoult D. (2015). "Recent advances in the study of Q fever epidemiology, diagnosis and management". Journal of Infection. 71 Suppl 1: S2-S9.',
        url: 'https://doi.org/10.1016/j.jinf.2015.04.024'
      },
      {
        id: '5',
        text: 'Maurin M, Raoult D. (1999). "Q Fever". Clinical Microbiology Reviews. 12 (4): 518-553.',
        url: 'https://doi.org/10.1128/CMR.12.4.518'
      }
    ]
  },
  {
    id: 'rheumatoid-arthritis',
    name: 'Rheumatoid Arthritis',
    description: 'A chronic inflammatory autoimmune disorder that primarily affects the joints, causing painful swelling that can eventually result in bone erosion and joint deformity.[1] The condition occurs when the immune system mistakenly attacks the body\'s own tissues, particularly the synovium, which is the lining of the membranes surrounding the joints.[2] Unlike osteoarthritis, rheumatoid arthritis affects the lining of joints, causing a painful swelling that can eventually result in bone erosion and joint deformity.[3] The inflammation associated with rheumatoid arthritis can also damage other parts of the body, including the skin, eyes, lungs, heart, and blood vessels.[4]',
    category: 'bone-and-joint',
    subcategory: 'autoimmune-disorders',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Rheumatoid_arthritis',
    symptoms: [
      'Tender, warm, swollen joints',
      'Joint stiffness that is usually worse in the mornings and after inactivity',
      'Fatigue, fever, and loss of appetite',
      'Symmetrical pattern of affected joints (same joints on both sides of the body)',
      'Small joints affected first (fingers, wrists)',
      'Rheumatoid nodules (firm bumps of tissue under the skin)',
      'Joint deformity in advanced stages',
      'Reduced range of motion',
      'Joint pain',
      'Weight loss',
      'Weakness',
      'Dry eyes and mouth (Sjögren\'s syndrome)',
      'Anemia',
      'Low-grade fever'
    ],
    causes: [
      'Autoimmune reaction (immune system attacks synovium)',
      'Genetic factors (HLA class II genotypes)',
      'Environmental triggers in genetically susceptible individuals',
      'Hormonal factors (more common in women)',
      'Smoking (increases risk and severity)',
      'Obesity',
      'Periodontal disease',
      'Microbiome alterations',
      'Viral or bacterial infections (as potential triggers)'
    ],
    treatments: [
      'Disease-modifying antirheumatic drugs (DMARDs) such as methotrexate, hydroxychloroquine, sulfasalazine, leflunomide',
      'Biologic agents (TNF inhibitors, IL-6 inhibitors, T-cell costimulation modulators, B-cell depleting agents)',
      'JAK inhibitors (tofacitinib, baricitinib, upadacitinib)',
      'Corticosteroids for short-term relief',
      'NSAIDs for pain management',
      'Physical therapy to maintain joint flexibility',
      'Occupational therapy for joint protection',
      'Joint surgery in advanced cases (synovectomy, tendon repair, joint fusion, joint replacement)',
      'Self-management strategies (exercise, rest, joint protection)'
    ],
    preventions: [
      'No known prevention, but early diagnosis and treatment can prevent joint damage',
      'Smoking cessation (reduces risk and improves treatment outcomes)',
      'Maintaining healthy weight',
      'Regular physical activity',
      'Good dental hygiene',
      'Balanced diet rich in anti-inflammatory foods'
    ],
    relatedConditions: [
      'psoriatic-arthritis',
      'lupus',
      'sjogrens-syndrome',
      'ankylosing-spondylitis',
      'vasculitis',
      'fibromyalgia',
      'osteoarthritis',
      'gout'
    ],
    commonQuestions: [
      {
        question: 'Is rheumatoid arthritis hereditary?',
        answer: 'Rheumatoid arthritis has a genetic component, but it is not directly hereditary in the way that some diseases are. Having a family member with RA increases your risk, but many people with RA have no family history of the disease. Current research suggests that specific genes, particularly certain HLA (human leukocyte antigen) class II genotypes, can increase susceptibility to rheumatoid arthritis. However, genetics alone don\'t determine who gets RA—environmental factors like smoking, infections, or hormonal changes likely trigger the disease in genetically susceptible individuals. This complex interplay between genetics and environment is why RA isn\'t considered strictly hereditary, but rather has a hereditary component that influences risk.'
      },
      {
        question: 'What is the difference between rheumatoid arthritis and osteoarthritis?',
        answer: 'Rheumatoid arthritis (RA) and osteoarthritis (OA) are distinct conditions with different causes, symptoms, and treatments. RA is an autoimmune disease where the immune system attacks the joint lining, causing inflammation that can damage cartilage and bones. It typically affects joints symmetrically, often begins between ages 30-60, and includes systemic symptoms like fatigue and fever. OA is a degenerative joint disease caused by wear and tear on joints over time. It typically affects weight-bearing joints asymmetrically, usually begins after age 50, and symptoms are generally limited to the affected joints. RA involves morning stiffness lasting more than an hour, while OA stiffness typically resolves within 30 minutes. Treatment for RA focuses on controlling inflammation and the immune response, while OA treatment primarily addresses pain management and maintaining joint function.'
      },
      {
        question: 'Can rheumatoid arthritis go into remission?',
        answer: 'Yes, rheumatoid arthritis can go into remission, especially with early and aggressive treatment. Remission means that the disease activity is very low or absent, resulting in few or no symptoms and minimal or no progression of joint damage. There are different types of remission: clinical remission (no visible signs of disease activity), imaging remission (no inflammation visible on ultrasound or MRI), and sustained remission (lasting for months or years). With modern treatment approaches, particularly the early use of disease-modifying antirheumatic drugs (DMARDs) and biologic therapies, remission is an achievable goal for many patients. The likelihood of achieving remission is highest when treatment begins within the first few months of symptom onset. However, remission doesn\'t mean the disease is cured—most patients need to continue some form of treatment to maintain remission, and the disease can flare if treatment is stopped.'
      }
    ],
    emergencySigns: [
      'Sudden, severe joint pain with extreme swelling or inability to move a joint',
      'High fever with joint pain (could indicate septic arthritis)',
      'Chest pain or shortness of breath (could indicate lung or heart involvement)',
      'Severe abdominal pain (could indicate vasculitis)',
      'Numbness or tingling in extremities (could indicate nerve compression)',
      'Sudden vision changes (could indicate eye involvement)'
    ],
    prevalence: 'Rheumatoid arthritis affects approximately 0.5-1% of the global population. In the United States, about 1.3 million adults have RA. The condition is 2-3 times more common in women than in men. Although RA can occur at any age, it most commonly begins between the ages of 30 and 60 for women and somewhat later in life for men. The incidence of RA appears to be declining in developed countries, possibly due to environmental changes, decreased smoking rates, and increased use of oral contraceptives, which may have a protective effect.',
    affectedGroups: [
      'Women (2-3 times more likely than men)',
      'Adults aged 30-60 (peak onset)',
      'People with family history of RA',
      'Smokers (increased risk and severity)',
      'Individuals with specific HLA-DR4 genetic markers',
      'People with obesity',
      'Individuals exposed to certain environmental factors (silica dust, asbestos)'
    ],
    references: [
      {
        id: '1',
        text: 'Smolen JS, Aletaha D, McInnes IB. (2016). "Rheumatoid arthritis". Lancet. 388 (10055): 2023-2038.',
        url: 'https://doi.org/10.1016/S0140-6736(16)30173-8'
      },
      {
        id: '2',
        text: 'McInnes IB, Schett G. (2011). "The pathogenesis of rheumatoid arthritis". New England Journal of Medicine. 365 (23): 2205-2219.',
        url: 'https://doi.org/10.1056/NEJMra1004965'
      },
      {
        id: '3',
        text: 'Firestein GS, McInnes IB. (2017). "Immunopathogenesis of Rheumatoid Arthritis". Immunity. 46 (2): 183-196.',
        url: 'https://doi.org/10.1016/j.immuni.2017.02.006'
      },
      {
        id: '4',
        text: 'England BR, Thiele GM, Anderson DR, Mikuls TR. (2019). "Increased cardiovascular risk in rheumatoid arthritis: mechanisms and implications". BMJ. 367: l6432.',
        url: 'https://doi.org/10.1136/bmj.l6432'
      },
      {
        id: '5',
        text: 'Fraenkel L, Bathon JM, England BR, et al. (2021). "2021 American College of Rheumatology Guideline for the Treatment of Rheumatoid Arthritis". Arthritis Care & Research. 73 (7): 924-939.',
        url: 'https://doi.org/10.1002/acr.24596'
      }
    ]
  }
];

export default conditionsPtoR;
