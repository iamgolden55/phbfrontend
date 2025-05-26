import { HealthCondition } from '../healthConditionsData';

/**
 * Health conditions starting with letters M-O
 */
export const conditionsMtoO: HealthCondition[] = [
  {
    id: 'narcolepsy',
    name: 'Narcolepsy',
    description: 'A chronic neurological disorder that affects the brain\'s ability to control sleep-wake cycles.[1] People with narcolepsy experience excessive daytime sleepiness and may fall asleep suddenly during the day, even in the middle of activities.[2] The disorder is characterized by abnormal rapid eye movement (REM) sleep, which typically occurs within minutes of falling asleep rather than after a longer period.[3] There are two main types: type 1 (with cataplexy) and type 2 (without cataplexy).[4]',
    category: 'brain-and-nerves',
    subcategory: 'sleep-disorders',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Narcolepsy',
    symptoms: [
      'Excessive daytime sleepiness (EDS)',
      'Sudden, uncontrollable sleep attacks',
      'Cataplexy (sudden loss of muscle tone triggered by strong emotions, primarily in type 1)',
      'Sleep paralysis (temporary inability to move or speak while falling asleep or upon waking)',
      'Hypnagogic/hypnopompic hallucinations (vivid, dream-like experiences when falling asleep or waking up)',
      'Disrupted nighttime sleep',
      'Automatic behaviors (performing routine tasks without awareness or later memory)',
      'Memory problems',
      'Difficulty concentrating',
      'Depression',
      'Weight gain'
    ],
    causes: [
      'Type 1: Loss of hypocretin (orexin) neurons in the hypothalamus',
      'Autoimmune factors (immune system attacks hypocretin-producing cells)',
      'Genetic predisposition (HLA-DQB1*06:02 gene)',
      'Rarely, brain injuries affecting the hypothalamus',
      'Certain infections (including H1N1 influenza)',
      'In some cases, the cause remains unknown (especially for type 2)'
    ],
    treatments: [
      'Stimulant medications (modafinil, armodafinil, methylphenidate)',
      'Sodium oxybate (Xyrem) for cataplexy and improving nighttime sleep',
      'Selective serotonin reuptake inhibitors (SSRIs) or serotonin-norepinephrine reuptake inhibitors (SNRIs) for cataplexy',
      'Tricyclic antidepressants for cataplexy',
      'Pitolisant (Wakix) - histamine H3 receptor antagonist/inverse agonist',
      'Solriamfetol (Sunosi) - dopamine and norepinephrine reuptake inhibitor',
      'Scheduled naps',
      'Sleep hygiene practices',
      'Behavioral and lifestyle modifications',
      'Support groups and counseling'
    ],
    preventions: [
      'No known prevention methods as narcolepsy is typically caused by genetic factors or autoimmune processes',
      'Managing risk factors for secondary narcolepsy (preventing head injuries)',
      'Early diagnosis and treatment to prevent complications and improve quality of life'
    ],
    relatedConditions: [
      'idiopathic-hypersomnia',
      'sleep-apnea',
      'kleine-levin-syndrome',
      'restless-legs-syndrome',
      'depression',
      'anxiety-disorders',
      'obstructive-sleep-apnea',
      'multiple-sclerosis'
    ],
    commonQuestions: [
      {
        question: 'Is narcolepsy a rare condition?',
        answer: 'Yes, narcolepsy is considered a relatively rare sleep disorder. It affects approximately 1 in 2,000 to 1 in 3,000 people in the general population. However, it is likely underdiagnosed due to symptoms being attributed to other conditions, lack of awareness among healthcare providers, and the gradual onset of symptoms in some cases. The prevalence varies among different populations, with some studies showing higher rates in Japan and lower rates in Israel and Saudi Arabia. Despite being rare, narcolepsy significantly impacts quality of life and often requires lifelong management. The average time from symptom onset to diagnosis is 7-10 years, highlighting the importance of increased awareness and recognition of this condition.'
      },
      {
        question: 'What\'s the difference between narcolepsy type 1 and type 2?',
        answer: 'The primary difference between narcolepsy type 1 and type 2 is the presence of cataplexy and hypocretin deficiency. Type 1 narcolepsy (previously called narcolepsy with cataplexy) is characterized by excessive daytime sleepiness plus cataplexy (sudden loss of muscle tone triggered by strong emotions) and/or low levels of hypocretin in cerebrospinal fluid. It is caused by the loss of hypocretin-producing neurons in the hypothalamus, likely due to an autoimmune process. Type 2 narcolepsy (previously called narcolepsy without cataplexy) involves excessive daytime sleepiness but no cataplexy, and hypocretin levels are usually normal or only slightly reduced. The cause of type 2 is less well understood. Both types share symptoms like sleep attacks, disrupted nighttime sleep, sleep paralysis, and hypnagogic hallucinations, but these may be less severe in type 2. Treatment approaches are similar, though medications specifically targeting cataplexy are only necessary for type 1.'
      },
      {
        question: 'Can children develop narcolepsy?',
        answer: 'Yes, children can develop narcolepsy, though it\'s less commonly diagnosed in pediatric populations. The disorder often begins in childhood or adolescence, with a bimodal peak of onset around ages 15 and 35. In children, narcolepsy symptoms may present differently than in adults. Excessive daytime sleepiness might manifest as irritability, hyperactivity, or attention problems, leading to misdiagnosis as ADHD or behavioral issues. Cataplexy in children may appear as facial grimacing or jaw slackening rather than the classic muscle weakness. Children with narcolepsy often experience academic difficulties, social challenges, and emotional problems due to their symptoms. Early diagnosis is crucial but challenging, as the average time from symptom onset to diagnosis can be even longer in children than adults. There was a notable increase in childhood narcolepsy cases following the 2009-2010 H1N1 influenza pandemic and related vaccinations in some European countries, highlighting a potential environmental trigger in genetically susceptible individuals.'
      }
    ],
    emergencySigns: [
      'Cataplexy episodes that cause falls or injuries',
      'Sleep attacks while driving or operating machinery',
      'Severe psychological distress or suicidal thoughts related to the condition',
      'Significant worsening of symptoms or new neurological symptoms (which may indicate another disorder)',
      'Adverse reactions to narcolepsy medications'
    ],
    prevalence: 'Narcolepsy affects approximately 1 in 2,000 to 1 in 3,000 people worldwide. Type 1 narcolepsy is more common than type 2, accounting for about 60-70% of cases. The condition affects all racial and ethnic groups, though some variations exist, with higher prevalence reported in Japan (1 in 600) and lower rates in Israel and Saudi Arabia. Men and women are affected equally. Symptoms typically begin between ages 10 and 30, with two peak periods of onset around 15 and 35 years of age. However, diagnosis is often delayed by 8-15 years after symptom onset.',
    affectedGroups: [
      'Adolescents and young adults (most common age of onset)',
      'People with family history of narcolepsy',
      'Individuals with the HLA-DQB1*06:02 gene variant',
      'People who have had certain infections (particularly H1N1 influenza)',
      'Individuals with brain injuries affecting the hypothalamus',
      'People with certain autoimmune disorders'
    ],
    references: [
      {
        id: '1',
        text: 'Scammell TE. (2015). "Narcolepsy". New England Journal of Medicine. 373 (27): 2654-2662.',
        url: 'https://doi.org/10.1056/NEJMra1500587'
      },
      {
        id: '2',
        text: 'Bassetti CLA, Adamantidis A, Burdakov D, et al. (2019). "Narcolepsy - clinical spectrum, aetiopathophysiology, diagnosis and treatment". Nature Reviews Neurology. 15 (9): 519-539.',
        url: 'https://doi.org/10.1038/s41582-019-0226-9'
      },
      {
        id: '3',
        text: 'Kornum BR, Knudsen S, Ollila HM, et al. (2017). "Narcolepsy". Nature Reviews Disease Primers. 3: 16100.',
        url: 'https://doi.org/10.1038/nrdp.2016.100'
      },
      {
        id: '4',
        text: 'American Academy of Sleep Medicine. (2014). "International Classification of Sleep Disorders". 3rd ed. Darien, IL: American Academy of Sleep Medicine.',
        url: 'https://aasm.org/clinical-resources/scoring-manual/'
      },
      {
        id: '5',
        text: 'Maski K, Trotti LM, Kotagal S, et al. (2021). "Treatment of central disorders of hypersomnolence: an American Academy of Sleep Medicine clinical practice guideline". Journal of Clinical Sleep Medicine. 17 (9): 1881-1893.',
        url: 'https://doi.org/10.5664/jcsm.9328'
      }
    ]
  },
  {
    id: 'malaria',
    name: 'Malaria',
    description: 'A life-threatening mosquito-borne infectious disease caused by Plasmodium parasites.[1] Malaria is transmitted to humans through the bite of infected female Anopheles mosquitoes.[2] The disease is characterized by cycles of fever, chills, and flu-like illness, and if left untreated, can progress to severe illness and death.[3] Malaria is preventable and curable, yet it remains a major global health challenge, particularly in tropical and subtropical regions.[4]',
    category: 'infectious-diseases',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Malaria',
    symptoms: [
      'Fever and chills',
      'Headache',
      'Nausea and vomiting',
      'Muscle pain and fatigue',
      'Sweating',
      'Chest or abdominal pain',
      'Cough',
      'Cycles of cold/hot stages followed by sweating',
      'Enlarged spleen',
      'Jaundice (in severe cases)'
    ],
    causes: [
      'Infection with Plasmodium parasites (primarily P. falciparum, P. vivax, P. ovale, P. malariae, and P. knowlesi)',
      'Transmission through the bite of infected female Anopheles mosquitoes',
      'Rarely, through blood transfusion, organ transplant, or shared needles',
      'Mother-to-child transmission during pregnancy or delivery (congenital malaria)'
    ],
    treatments: [
      'Antimalarial medications (artemisinin-based combination therapies for P. falciparum)',
      'Chloroquine (for chloroquine-sensitive infections)',
      'Atovaquone-proguanil, mefloquine, or doxycycline',
      'Primaquine (to prevent relapse for P. vivax and P. ovale)',
      'Supportive care for severe malaria (IV fluids, blood transfusions)',
      'Hospitalization for severe cases',
      'Management of complications'
    ],
    preventions: [
      'Use of insecticide-treated bed nets',
      'Indoor residual spraying with insecticides',
      'Antimalarial medications for travelers to endemic areas',
      'Elimination of mosquito breeding sites',
      'Wearing long-sleeved clothing and using insect repellent',
      'Chemoprophylaxis for high-risk groups (pregnant women, children in endemic areas)',
      'Vector control measures'
    ],
    relatedConditions: [
      'blackwater-fever',
      'cerebral-malaria',
      'anemia',
      'splenomegaly',
      'dengue-fever',
      'yellow-fever',
      'leishmaniasis',
      'trypanosomiasis'
    ],
    commonQuestions: [
      {
        question: 'Where is malaria most commonly found?',
        answer: 'Malaria is most common in tropical and subtropical regions, with the highest burden in sub-Saharan Africa, which accounts for about 95% of all malaria cases and 96% of deaths. Other affected regions include parts of South Asia, Southeast Asia, Latin America, the Middle East, and the Western Pacific. The disease is closely linked to climate conditions that support mosquito breeding and parasite development, typically in warm, humid environments with adequate rainfall.'
      },
      {
        question: 'How long does it take to develop symptoms after being infected with malaria?',
        answer: 'The time between infection and the appearance of symptoms (incubation period) varies depending on the Plasmodium species. For P. falciparum, symptoms typically appear 10-15 days after the infective mosquito bite. P. vivax and P. ovale may cause symptoms after 8-14 days but can also remain dormant in the liver for months or years before causing relapses. For P. malariae, the incubation period is usually 18-40 days. Some individuals may develop symptoms despite taking prophylactic antimalarial drugs, especially if the regimen is inappropriate for the region visited.'
      },
      {
        question: 'Can malaria be completely cured?',
        answer: 'Yes, malaria can be completely cured if diagnosed and treated promptly with appropriate antimalarial medications. However, some Plasmodium species (P. vivax and P. ovale) can remain dormant in the liver as hypnozoites and cause relapses months or years later if not treated with drugs that target this liver stage, such as primaquine or tafenoquine. P. falciparum and P. malariae do not have a dormant liver stage, so complete clearance of blood-stage parasites results in cure. Drug resistance, particularly in P. falciparum, can complicate treatment and may require alternative medication regimens.'
      }
    ],
    emergencySigns: [
      'Severe anemia',
      'Respiratory distress',
      'Cerebral malaria (confusion, seizures, coma)',
      'Multiple organ failure',
      'Abnormal bleeding',
      'Jaundice',
      'Hypoglycemia',
      'Renal failure',
      'Hemoglobinuria (blackwater fever)',
      'Prostration (extreme weakness)'
    ],
    prevalence: 'In 2022, there were an estimated 249 million malaria cases worldwide, with approximately 608,000 deaths. Africa bears the highest burden, with 94% of cases and 96% of deaths. Children under 5 years account for about 80% of all malaria deaths in Africa.',
    affectedGroups: [
      'Children under 5 years of age',
      'Pregnant women',
      'Non-immune travelers to endemic areas',
      'People living in poverty with limited access to prevention and treatment',
      'Populations in sub-Saharan Africa',
      'Rural communities with limited healthcare access',
      'Immunocompromised individuals (including those with HIV/AIDS)',
      'Refugees and displaced populations'
    ],
    references: [
      {
        id: '1',
        text: 'World Health Organization. (2023). "World Malaria Report 2022". WHO, Geneva.',
        url: 'https://www.who.int/teams/global-malaria-programme/reports/world-malaria-report-2022'
      },
      {
        id: '2',
        text: 'Phillips MA, Burrows JN, Manyando C, et al. (2017). "Malaria". Nature Reviews Disease Primers. 3: 17050.',
        url: 'https://doi.org/10.1038/nrdp.2017.50'
      },
      {
        id: '3',
        text: 'Ashley EA, Pyae Phyo A, Woodrow CJ. (2018). "Malaria". Lancet. 391 (10130): 1608-1621.',
        url: 'https://doi.org/10.1016/S0140-6736(18)30324-6'
      },
      {
        id: '4',
        text: 'Centers for Disease Control and Prevention. (2023). "Malaria".',
        url: 'https://www.cdc.gov/parasites/malaria/index.html'
      },
      {
        id: '5',
        text: 'White NJ, Pukrittayakamee S, Hien TT, et al. (2014). "Malaria". Lancet. 383 (9918): 723-735.',
        url: 'https://doi.org/10.1016/S0140-6736(13)60024-0'
      }
    ]
  },
  {
    id: 'measles',
    name: 'Measles',
    description: 'A highly contagious viral disease characterized by fever, cough, conjunctivitis, and a distinctive rash.[1] Measles is caused by the measles virus (genus Morbillivirus) and spreads through respiratory droplets and direct contact with infected secretions.[2] Although previously a common childhood illness worldwide, vaccination has dramatically reduced its incidence in many countries.[3] The disease can lead to serious complications including pneumonia, encephalitis, and death, particularly in young children, malnourished individuals, and those with compromised immune systems.[4]',
    category: 'infectious-diseases',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Measles',
    symptoms: [
      'Fever (often high, 103°F-105°F or 39°C-41°C)',
      'Dry cough',
      'Runny nose (coryza)',
      'Red, watery eyes (conjunctivitis)',
      'Koplik spots (small white spots inside the mouth)',
      'Maculopapular rash beginning on face and spreading downward',
      'Malaise and fatigue',
      'Loss of appetite',
      'Swollen lymph nodes',
      'Photophobia (sensitivity to light)'
    ],
    causes: [
      'Infection with the measles virus (Paramyxoviridae family)',
      'Airborne transmission through respiratory droplets',
      'Direct contact with infected nasal or throat secretions',
      'Contaminated surfaces (virus can remain active for up to 2 hours)',
      'Lack of vaccination or immunity',
      'Travel to areas with ongoing measles outbreaks'
    ],
    treatments: [
      'Supportive care (rest, fluids, fever-reducing medications)',
      'Vitamin A supplementation (reduces severity and complications)',
      'Antibiotics for secondary bacterial infections',
      'Hospitalization for severe cases',
      'Management of complications',
      'Isolation to prevent spread to others',
      'Post-exposure vaccination within 72 hours may prevent or modify disease'
    ],
    preventions: [
      'MMR (measles, mumps, rubella) vaccination',
      'Two doses of vaccine providing 97-99% immunity',
      'Maintaining high vaccination rates in communities for herd immunity',
      'Isolation of infected individuals',
      'Proper hand hygiene',
      'Post-exposure prophylaxis with vaccine or immunoglobulin',
      'Travel vaccination for unimmunized individuals going to endemic areas'
    ],
    relatedConditions: [
      'pneumonia',
      'encephalitis',
      'subacute-sclerosing-panencephalitis',
      'otitis-media',
      'diarrhea',
      'keratitis',
      'mumps',
      'rubella'
    ],
    commonQuestions: [
      {
        question: 'Can you get measles if you\'ve been vaccinated?',
        answer: 'While the measles vaccine (MMR) is highly effective, providing about 97-99% immunity with two doses, breakthrough infections can occur rarely. However, if a vaccinated person does contract measles, they typically experience a milder form of the disease with less severe symptoms and reduced risk of complications. This is why maintaining high vaccination rates in communities is crucial—it provides protection even for those rare cases where the vaccine doesn\'t completely prevent infection.'
      },
      {
        question: 'How long is someone with measles contagious?',
        answer: 'People with measles are contagious from about 4 days before the rash appears until about 4 days after it appears. Specifically, they can transmit the virus from about 4 days before the rash through 4 days after the rash erupts. The period of maximum contagiousness is just before the rash appears, which is problematic because people may not know they have measles at that point. This is why measles spreads so efficiently and why isolation of suspected cases is important for containment.'
      },
      {
        question: 'What are the potential long-term effects of measles?',
        answer: 'Beyond the immediate illness, measles can have serious long-term effects. The virus can suppress the immune system for weeks to months after infection, creating "immune amnesia" that leaves individuals vulnerable to other infections. Rare but severe long-term complications include subacute sclerosing panencephalitis (SSPE), a fatal neurological disease that can develop 7-10 years after infection. Measles during pregnancy can lead to miscarriage, premature birth, or low birth weight. In children, measles can occasionally cause lasting vision or hearing impairment.'
      }
    ],
    emergencySigns: [
      'Severe difficulty breathing or shortness of breath',
      'Persistent high fever that doesn\'t respond to medication',
      'Severe headache with stiff neck',
      'Unusual drowsiness or difficulty waking',
      'Seizures',
      'Altered mental status or confusion',
      'Severe dehydration (dry mouth, decreased urination, sunken eyes)'
    ],
    prevalence: 'Despite the availability of a safe and effective vaccine, measles remains a significant cause of death globally, particularly among children under 5 years of age. In 2018, there were more than 140,000 measles deaths worldwide. In recent years, measles outbreaks have occurred even in countries with high vaccination rates due to vaccine hesitancy and declining immunization coverage.',
    affectedGroups: [
      'Unvaccinated individuals, particularly children',
      'Infants too young to be vaccinated (under 12 months)',
      'Pregnant women',
      'Immunocompromised individuals',
      'Malnourished children, especially those with vitamin A deficiency',
      'People in developing countries with limited healthcare access',
      'Communities with low vaccination rates'
    ],
    references: [
      {
        id: '1',
        text: 'Moss WJ, Griffin DE. (2012). "Measles". Lancet. 379 (9811): 153–164.',
        url: 'https://doi.org/10.1016/S0140-6736(10)62352-5'
      },
      {
        id: '2',
        text: 'Strebel PM, Orenstein WA. (2019). "Measles". New England Journal of Medicine. 381 (4): 349–357.',
        url: 'https://doi.org/10.1056/NEJMcp1905181'
      },
      {
        id: '3',
        text: 'Goodson JL, Seward JF. (2015). "Measles 50 Years After Use of Measles Vaccine". Infectious Disease Clinics of North America. 29 (4): 725–743.',
        url: 'https://doi.org/10.1016/j.idc.2015.08.001'
      },
      {
        id: '4',
        text: 'Mina MJ, Kula T, Leng Y, et al. (2019). "Measles virus infection diminishes preexisting antibodies that offer protection from other pathogens". Science. 366 (6465): 599–606.',
        url: 'https://doi.org/10.1126/science.aay6485'
      },
      {
        id: '5',
        text: 'Centers for Disease Control and Prevention. (2022). "Measles (Rubeola)". In Epidemiology and Prevention of Vaccine-Preventable Diseases (14th ed.).',
        url: 'https://www.cdc.gov/vaccines/pubs/pinkbook/meas.html'
      }
    ]
  },

  {
    id: 'multiple-sclerosis',
    name: 'Multiple Sclerosis (MS)',
    description: 'A chronic, inflammatory, demyelinating disease of the central nervous system that disrupts communication between the brain and other parts of the body.[1] In MS, the immune system mistakenly attacks the protective covering (myelin) of nerve fibers, causing communication problems between the brain and the rest of the body.[2] Eventually, the disease can cause permanent damage or deterioration of the nerves.[3] Signs and symptoms vary widely, depending on the amount of nerve damage and which nerves are affected.[4] Some people with severe MS may lose the ability to walk independently, while others may experience long periods of remission without any new symptoms.[5]',
    category: 'brain-and-nerves',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Multiple_sclerosis',
    symptoms: [
      'Fatigue',
      'Numbness or weakness in one or more limbs',
      'Electric-shock sensations with certain neck movements (Lhermitte sign)',
      'Tremor, lack of coordination or unsteady gait',
      'Vision problems (partial or complete loss of vision, double vision, blurry vision)',
      'Slurred speech',
      'Dizziness',
      'Tingling or pain in parts of the body',
      'Problems with sexual, bowel and bladder function',
      'Cognitive impairment (problems with memory, attention, problem-solving)',
      'Depression and mood changes',
      'Muscle spasms and stiffness',
      'Heat sensitivity (temporary worsening of symptoms when body temperature rises)'
    ],
    causes: [
      'Autoimmune reaction where the body\'s immune system attacks myelin in the central nervous system',
      'Genetic factors (increased risk if family members have MS)',
      'Environmental factors (more common in temperate climates further from the equator)',
      'Viral infections (Epstein-Barr virus may trigger MS in genetically susceptible individuals)',
      'Low vitamin D levels',
      'Smoking',
      'Obesity in early life',
      'Complex interaction between genetic susceptibility and environmental factors'
    ],
    treatments: [
      'Disease-modifying therapies to reduce relapses and slow progression',
      'Injectable medications (interferon beta, glatiramer acetate)',
      'Oral medications (fingolimod, dimethyl fumarate, teriflunomide, siponimod, ozanimod)',
      'Infusion treatments (natalizumab, alemtuzumab, ocrelizumab, rituximab)',
      'Corticosteroids for acute relapses',
      'Plasmapheresis (plasma exchange) for severe relapses unresponsive to steroids',
      'Symptomatic treatments for specific symptoms (muscle relaxants for spasticity, medications for fatigue, pain, bladder/bowel issues)',
      'Physical therapy to improve mobility, strength, and function',
      'Occupational therapy for daily living activities',
      'Speech therapy',
      'Cognitive rehabilitation',
      'Complementary and alternative therapies (yoga, meditation, acupuncture)'
    ],
    preventions: [
      'No known prevention for MS itself',
      'Maintaining adequate vitamin D levels',
      'Not smoking',
      'Maintaining a healthy weight',
      'Regular exercise',
      'Stress management',
      'Following a balanced, healthy diet',
      'Early treatment to prevent relapses and disability progression'
    ],
    relatedConditions: [
      'neuromyelitis-optica',
      'acute-disseminated-encephalomyelitis',
      'transverse-myelitis',
      'optic-neuritis',
      'myelin-oligodendrocyte-glycoprotein-antibody-disease',
      'autoimmune-encephalitis',
      'lupus',
      'rheumatoid-arthritis',
      'sjogrens-syndrome'
    ],
    commonQuestions: [
      {
        question: 'Is multiple sclerosis hereditary?',
        answer: 'Multiple sclerosis is not directly hereditary in the sense of following a predictable inheritance pattern, but there is a genetic component to MS risk. If a first-degree relative (parent, sibling) has MS, your risk increases to approximately 2-4%, compared to about 0.1% in the general population. However, this still means the vast majority of people with a family history will not develop MS. The genetic component appears to involve multiple genes that each contribute a small amount to overall risk, rather than a single gene mutation. MS is considered a complex disease that results from interactions between genetic susceptibility and environmental factors such as vitamin D levels, Epstein-Barr virus exposure, smoking, and geographical location.'
      },
      {
        question: 'What is the life expectancy for someone with multiple sclerosis?',
        answer: 'Life expectancy for people with multiple sclerosis has improved significantly over recent decades and continues to approach that of the general population, especially with early diagnosis and treatment. On average, people with MS may have a lifespan that is 5-10 years shorter than those without MS, but this varies widely depending on many factors. Those with mild disease, early treatment, and good disease management may have a normal or near-normal life expectancy. Factors that can influence life expectancy include the type of MS (relapsing-remitting typically has a better prognosis than primary progressive), age at diagnosis, effectiveness of treatment, presence of other health conditions, and access to comprehensive care. Most people with MS do not die from the disease itself but from the same causes as the general population, though complications from severe MS can contribute to mortality in some cases.'
      },
      {
        question: 'What are the different types of multiple sclerosis?',
        answer: 'There are four main types of multiple sclerosis: 1) Relapsing-Remitting MS (RRMS): The most common form (85-90% of initial diagnoses), characterized by clearly defined attacks (relapses) followed by partial or complete recovery periods (remissions). 2) Secondary Progressive MS (SPMS): Many people with RRMS eventually transition to SPMS, which involves more progressive neurological decline with or without occasional relapses, minor recoveries, and plateaus. 3) Primary Progressive MS (PPMS): Characterized by worsening neurological function from the onset of symptoms, without early relapses or remissions. About 10-15% of people with MS have PPMS. 4) Progressive-Relapsing MS (PRMS): A rare form (now usually classified as active PPMS) that shows progressive disease from the beginning with clear acute relapses, with or without recovery, and continued progression between relapses. The classification system has been refined in recent years to better reflect disease activity (active vs. not active) and progression (with progression vs. without progression).'
      }
    ],
    emergencySigns: [
      'Sudden, severe changes in vision or complete vision loss',
      'Extreme dizziness or vertigo causing inability to stand or walk',
      'New or severe difficulty speaking or swallowing',
      'Sudden onset of significant weakness or numbness affecting a major portion of the body',
      'Severe, unremitting pain',
      'Changes in consciousness or seizures',
      'Severe psychiatric symptoms (suicidal thoughts, psychosis)',
      'Signs of infection with fever in patients on immunosuppressive therapies'
    ],
    prevalence: 'Multiple sclerosis affects approximately 2.8 million people worldwide. The prevalence varies significantly by region, with higher rates in North America and Europe (particularly in northern latitudes) compared to Asia, Africa, and South America. In the United States, about 1 million people live with MS, while in the UK approximately 130,000 people are affected. MS is typically diagnosed between the ages of 20 and 50, with the average age of onset around 30 years.',
    affectedGroups: [
      'Women (affected 2-3 times more often than men)',
      'People between 20-50 years of age',
      'Individuals of Northern European descent',
      'People living in temperate climates, especially further from the equator',
      'Individuals with a family history of MS',
      'People with certain genetic markers (particularly HLA-DRB1*15:01)',
      'Individuals with history of Epstein-Barr virus infection',
      'Smokers',
      'Those with low vitamin D levels'
    ],
    references: [
      {
        id: '1',
        text: 'Reich DS, Lucchinetti CF, Calabresi PA. (2018). "Multiple Sclerosis". New England Journal of Medicine. 378 (2): 169-180.',
        url: 'https://doi.org/10.1056/NEJMra1401483'
      },
      {
        id: '2',
        text: 'Thompson AJ, Baranzini SE, Geurts J, et al. (2018). "Multiple sclerosis". Lancet. 391 (10130): 1622-1636.',
        url: 'https://doi.org/10.1016/S0140-6736(18)30481-1'
      },
      {
        id: '3',
        text: 'Baecher-Allan C, Kaskow BJ, Weiner HL. (2018). "Multiple Sclerosis: Mechanisms and Immunotherapy". Neuron. 97 (4): 742-768.',
        url: 'https://doi.org/10.1016/j.neuron.2018.01.021'
      },
      {
        id: '4',
        text: 'Walton C, King R, Rechtman L, et al. (2020). "Rising prevalence of multiple sclerosis worldwide: Insights from the Atlas of MS, third edition". Multiple Sclerosis Journal. 26 (14): 1816-1821.',
        url: 'https://doi.org/10.1177/1352458520970841'
      },
      {
        id: '5',
        text: 'Hauser SL, Cree BAC. (2020). "Treatment of Multiple Sclerosis: A Review". American Journal of Medicine. 133 (12): 1380-1390.',
        url: 'https://doi.org/10.1016/j.amjmed.2020.05.049'
      }
    ]
  },
  {
    id: 'melanoma',
    name: 'Melanoma',
    description: 'The most dangerous form of skin cancer that develops from the pigment-producing cells known as melanocytes.[1] Melanoma is primarily caused by DNA damage resulting from exposure to ultraviolet (UV) radiation from the sun or tanning beds.[2] Early detection is crucial as melanoma can spread rapidly to other parts of the body if not treated promptly.[3] The disease typically presents as a new or changing mole with irregular features, and the risk is higher in individuals with fair skin, a history of sunburns, or a family history of the condition.[4]',
    category: 'cancer',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Melanoma',
    symptoms: [
      'New mole or change in an existing mole',
      'Asymmetrical moles (one half unlike the other)',
      'Irregular or poorly defined borders',
      'Variation in color within the same mole',
      'Diameter larger than 6mm (about the size of a pencil eraser)',
      'Evolving size, shape, or color over time',
      'Itching or bleeding moles',
      'Elevation or growth above the skin surface',
      'Nodules or bumps on the skin (nodular melanoma)',
      'Sores that don\'t heal'
    ],
    causes: [
      'Ultraviolet (UV) radiation exposure from the sun',
      'Use of tanning beds and sun lamps',
      'History of sunburns, especially severe blistering sunburns',
      'Excessive UV exposure in people with fair skin',
      'Genetic predisposition and family history',
      'Multiple or atypical moles (dysplastic nevi)',
      'Weakened immune system',
      'Personal history of melanoma or other skin cancers',
      'Xeroderma pigmentosum (rare genetic condition)',
      'Age (risk increases with age, though melanoma affects younger people too)'
    ],
    treatments: [
      'Surgical excision of the melanoma',
      'Sentinel lymph node biopsy to determine if cancer has spread',
      'Wider excision of surrounding tissue for invasive melanomas',
      'Lymph node dissection if cancer has spread to nearby lymph nodes',
      'Immunotherapy (such as immune checkpoint inhibitors)',
      'Targeted therapy for melanomas with specific genetic mutations',
      'Radiation therapy for symptom relief or specific situations',
      'Chemotherapy for advanced cases',
      'Clinical trials of new treatments',
      'Palliative care for advanced disease'
    ],
    preventions: [
      'Limiting sun exposure, especially between 10 a.m. and 4 p.m.',
      'Regularly using broad-spectrum sunscreen (SPF 30 or higher)',
      'Wearing protective clothing, wide-brimmed hats, and sunglasses',
      'Avoiding tanning beds and sun lamps',
      'Seeking shade when outdoors',
      'Regular skin self-examinations',
      'Annual professional skin checks, especially for high-risk individuals',
      'Teaching children good sun protection habits',
      'Extra precautions for those with fair skin or family history',
      'Window tinting or UV-protective film for cars and homes'
    ],
    relatedConditions: [
      'basal-cell-carcinoma',
      'squamous-cell-carcinoma',
      'actinic-keratosis',
      'dysplastic-nevus-syndrome',
      'ocular-melanoma',
      'mucosal-melanoma',
      'merkel-cell-carcinoma',
      'xeroderma-pigmentosum',
      'albinism'
    ],
    commonQuestions: [
      {
        question: 'How can I tell the difference between a normal mole and melanoma?',
        answer: 'The ABCDE rule is helpful for distinguishing between normal moles and potential melanomas: A for Asymmetry (one half unlike the other), B for Border irregularity, C for Color variation within the same mole, D for Diameter larger than 6mm (about the size of a pencil eraser), and E for Evolving size, shape, or color. Additionally, the "ugly duckling" sign suggests that melanomas often look different from a person\'s other moles. Any mole that stands out as different from the rest, is changing, itching, bleeding, or has any concerning features should be evaluated by a dermatologist.'
      },
      {
        question: 'What are the stages of melanoma and what do they mean for treatment and prognosis?',
        answer: 'Melanoma staging ranges from 0 to IV. Stage 0 (melanoma in situ) is confined to the epidermis with nearly 100% survival rate. Stage I melanomas are thin (≤2mm) without ulceration or with minimal ulceration, with 5-year survival rates of 92-97%. Stage II melanomas are thicker or ulcerated but haven\'t spread, with survival rates of 53-81%. Stage III involves spread to nearby lymph nodes, with survival rates of 40-78% depending on substage. Stage IV indicates distant metastasis to other organs, with historically poor survival rates of 15-20% at 5 years, though newer therapies have improved outcomes. Treatment becomes more aggressive with advancing stages, ranging from simple excision to complex systemic therapies.'
      },
      {
        question: 'Can melanoma appear in places not exposed to the sun?',
        answer: 'Yes, melanoma can develop anywhere on the body, including areas that receive little or no sun exposure. While sun-exposed areas are common sites, melanoma can also appear on the palms of hands, soles of feet (acral melanoma), under fingernails or toenails (subungual melanoma), in the eyes (ocular melanoma), and on mucosal surfaces like the mouth, nasal passages, or genital areas. These "hidden" melanomas often go undetected longer and may have different risk factors than UV-related melanomas. People with darker skin are more prone to acral and mucosal melanomas. Regular full-body skin checks should include examination of all skin surfaces.'
      }
    ],
    emergencySigns: [
      'Rapidly changing mole',
      'Bleeding or ulcerating mole',
      'Severe pain in a mole',
      'New symptoms like headache, vision changes, or seizures (possibly indicating brain metastasis)',
      'Unexplained weight loss or fatigue with known melanoma',
      'Difficulty breathing or persistent cough (possibly indicating lung metastasis)',
      'Enlarged, hard, or painful lymph nodes'
    ],
    prevalence: 'Globally, melanoma accounts for about 1% of all skin cancers but causes the majority of skin cancer deaths. In the United States, the lifetime risk of developing melanoma is about 2.6% (1 in 38) for whites, 0.1% (1 in 1,000) for Blacks, and 0.6% (1 in 167) for Hispanics. Australia and New Zealand have the highest rates worldwide. Incidence has been rising over the past few decades, partly due to increased UV exposure and improved detection.',
    affectedGroups: [
      'Fair-skinned individuals with light hair and eye color',
      'People with numerous moles or atypical moles',
      'Those with a personal or family history of melanoma',
      'Individuals with a history of severe sunburns, especially in childhood',
      'Regular tanning bed users',
      'Older adults (median age at diagnosis is 65)',
      'People with weakened immune systems',
      'Males (higher incidence in some countries)',
      'People with xeroderma pigmentosum or other genetic conditions'
    ],
    references: [
      {
        id: '1',
        text: 'Schadendorf D, van Akkooi ACJ, Berking C, et al. (2018). "Melanoma". Lancet. 392 (10151): 971–984.',
        url: 'https://doi.org/10.1016/S0140-6736(18)31559-9'
      },
      {
        id: '2',
        text: 'Carr S, Smith C, Wernberg J. (2020). "Epidemiology and Risk Factors of Melanoma". Surgical Clinics of North America. 100 (1): 1–12.',
        url: 'https://doi.org/10.1016/j.suc.2019.09.005'
      },
      {
        id: '3',
        text: 'Rastrelli M, Tropea S, Rossi CR, Alaibac M. (2014). "Melanoma: Epidemiology, Risk Factors, Pathogenesis, Diagnosis and Classification". In Vivo. 28 (6): 1005–1011.',
        url: 'https://iv.iiarjournals.org/content/28/6/1005.long'
      },
      {
        id: '4',
        text: 'Leonardi GC, Falzone L, Salemi R, et al. (2018). "Cutaneous melanoma: From pathogenesis to therapy". International Journal of Oncology. 52 (4): 1071–1080.',
        url: 'https://doi.org/10.3892/ijo.2018.4287'
      },
      {
        id: '5',
        text: 'Michielin O, van Akkooi ACJ, Ascierto PA, et al. (2019). "Cutaneous melanoma: ESMO Clinical Practice Guidelines for diagnosis, treatment and follow-up". Annals of Oncology. 30 (12): 1884–1901.',
        url: 'https://doi.org/10.1093/annonc/mdz411'
      }
    ]
  },
  {
    id: 'meningitis',
    name: 'Meningitis',
    description: 'Inflammation of the protective membranes covering the brain and spinal cord (meninges), usually caused by infection with viruses, bacteria, or fungi.[1] Meningitis can be life-threatening due to the inflammation\'s proximity to the brain and spinal cord.[2] Bacterial meningitis is particularly serious and can cause severe brain damage or death if not treated promptly, while viral meningitis is typically less severe and often resolves without specific treatment.[3]',
    category: 'infectious-diseases',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Meningitis',
    subcategory: 'central-nervous-system-infections',
    symptoms: [
      'Sudden high fever',
      'Severe headache',
      'Stiff neck (nuchal rigidity)',
      'Nausea and vomiting',
      'Photophobia (sensitivity to light)',
      'Altered mental status (confusion)',
      'Seizures',
      'Skin rash (particularly with meningococcal meningitis)',
      'Lethargy or difficulty waking',
      'Bulging fontanelle in infants'
    ],
    causes: [
      'Bacterial infection (Neisseria meningitidis, Streptococcus pneumoniae, Haemophilus influenzae)',
      'Viral infection (enteroviruses, herpes viruses, mumps, measles, influenza)',
      'Fungal infection (Cryptococcus, Histoplasma, Blastomyces, especially in immunocompromised people)',
      'Parasitic infection (rare)',
      'Non-infectious causes (certain medications, cancers, autoimmune disorders)'
    ],
    treatments: [
      'Bacterial: Immediate intravenous antibiotic therapy',
      'Viral: Supportive care, antiviral medications for specific causes',
      'Fungal: Antifungal medications',
      'Corticosteroids to reduce inflammation (in some cases)',
      'Pain management',
      'Anti-seizure medications if needed',
      'Intravenous fluids',
      'Oxygen therapy',
      'Intensive care monitoring for severe cases'
    ],
    preventions: [
      'Vaccinations (meningococcal, pneumococcal, Hib, MMR)',
      'Good hygiene practices',
      'Avoiding close contact with people who have meningitis',
      'Prophylactic antibiotics for close contacts of bacterial meningitis cases',
      'Proper food handling to prevent Listeria infections',
      'Preventing mosquito bites in areas with viral encephalitis',
      'Avoiding activities that increase risk of head trauma'
    ],
    relatedConditions: ['encephalitis', 'brain-abscess', 'septicemia', 'hydrocephalus', 'meningococcemia'],
    commonQuestions: [
      {
        question: 'How is meningitis diagnosed?',
        answer: 'Meningitis is typically diagnosed through a combination of clinical evaluation and laboratory tests. The definitive test is a lumbar puncture (spinal tap), which collects cerebrospinal fluid for analysis of white blood cell count, protein and glucose levels, and the presence of bacteria, viruses, or fungi. Additional tests may include blood cultures, PCR tests to identify specific pathogens, and imaging studies like CT or MRI scans to check for complications such as brain swelling or abscess formation.'
      },
      {
        question: 'How quickly should meningitis be treated?',
        answer: 'Bacterial meningitis is a medical emergency requiring immediate treatment, ideally within minutes to hours of symptom onset. Delays in treatment increase the risk of severe outcomes including death and permanent neurological damage. If bacterial meningitis is suspected, antibiotics are often administered even before the diagnosis is confirmed by laboratory tests. Viral meningitis, while serious, is usually less urgent and typically resolves without specific treatment, though antiviral medications may be used for certain causes.'
      },
      {
        question: 'What are the long-term effects of meningitis?',
        answer: 'Long-term effects of meningitis vary based on the type, severity, and how quickly treatment was started. Possible long-term complications include hearing loss, vision problems, memory difficulties, learning disabilities, seizures, kidney problems, and amputation of limbs (in severe meningococcal cases with septicemia). Bacterial meningitis generally has a higher risk of long-term complications than viral meningitis. Children, especially infants, may develop more significant neurological problems. However, many people recover completely without lasting effects, particularly with prompt treatment.'
      }
    ],
    emergencySigns: [
      'Rapid onset of high fever with severe headache',
      'Stiff neck with inability to touch chin to chest',
      'Purple or red rash that doesn\'t fade when pressed (glass test)',
      'Seizures',
      'Decreased consciousness or coma',
      'Signs of shock (low blood pressure, rapid heart rate)',
      'Bulging fontanelle in infants'
    ],
    prevalence: 'Globally, meningitis affects more than 2.5 million people annually. Bacterial meningitis incidence varies widely by region, with the highest rates in the "meningitis belt" of sub-Saharan Africa. Viral meningitis is more common than bacterial but generally less severe.',
    affectedGroups: [
      'Infants and young children',
      'Adolescents and young adults in congregate settings (colleges, military)',
      'Older adults (over 65)',
      'People with compromised immune systems',
      'People without certain vaccinations',
      'Those with cochlear implants or certain skull defects',
      'People who have recently had neurosurgery'
    ],
    references: [
      {
        id: '1',
        text: 'van de Beek D, Cabellos C, Dzupova O, et al. (2016). "ESCMID guideline: diagnosis and treatment of acute bacterial meningitis". Clinical Microbiology and Infection. 22 Suppl 3: S37-62.',
        url: 'https://doi.org/10.1016/j.cmi.2016.01.007'
      },
      {
        id: '2',
        text: 'McGill F, Heyderman RS, Michael BD, et al. (2016). "The UK joint specialist societies guideline on the diagnosis and management of acute meningitis and meningococcal sepsis in immunocompetent adults". Journal of Infection. 72 (4): 405-438.',
        url: 'https://doi.org/10.1016/j.jinf.2016.01.007'
      },
      {
        id: '3',
        text: 'Brouwer MC, Tunkel AR, van de Beek D. (2010). "Epidemiology, diagnosis, and antimicrobial treatment of acute bacterial meningitis". Clinical Microbiology Reviews. 23 (3): 467-492.',
        url: 'https://doi.org/10.1128/CMR.00070-09'
      },
      {
        id: '4',
        text: 'World Health Organization. (2018). "Meningitis".',
        url: 'https://www.who.int/news-room/fact-sheets/detail/meningitis'
      },
      {
        id: '5',
        text: 'Thigpen MC, Whitney CG, Messonnier NE, et al. (2011). "Bacterial meningitis in the United States, 1998-2007". New England Journal of Medicine. 364 (21): 2016-2025.',
        url: 'https://doi.org/10.1056/NEJMoa1005384'
      }
    ]
  },
  {
    id: 'migraine',
    name: 'Migraine',
    description: 'A neurological condition characterized by recurrent, severe headaches often accompanied by other symptoms such as nausea, vomiting, and sensitivity to light and sound.[1] Migraines typically cause intense, throbbing pain on one side of the head and can last for hours to days.[2] Some people experience warning symptoms known as aura before or with the headache, which can include visual disturbances, tingling sensations, or difficulty speaking.[3] Migraines significantly impact quality of life and are one of the world\'s leading causes of disability.[4]',
    category: 'brain-and-nerves',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Migraine',
    symptoms: [
      'Moderate to severe headache, often pulsating and on one side',
      'Nausea and vomiting',
      'Sensitivity to light (photophobia)',
      'Sensitivity to sound (phonophobia)',
      'Visual disturbances (aura) such as flashing lights or blind spots',
      'Dizziness or vertigo',
      'Tingling or numbness in face or extremities',
      'Difficulty speaking',
      'Fatigue',
      'Neck pain or stiffness'
    ],
    causes: [
      'Genetic predisposition',
      'Hormonal changes (especially in women)',
      'Certain foods and food additives',
      'Alcoholic beverages, especially wine',
      'Stress and anxiety',
      'Changes in sleep patterns',
      'Environmental changes (weather, altitude, barometric pressure)',
      'Sensory stimuli (bright lights, strong smells)',
      'Certain medications',
      'Physical exertion'
    ],
    treatments: [
      'Pain-relieving medications (aspirin, ibuprofen, triptans)',
      'Anti-nausea medications',
      'Preventive medications (beta blockers, antidepressants, anti-seizure drugs)',
      'CGRP antagonists',
      'Botox injections',
      'Neuromodulation devices',
      'Lifestyle modifications',
      'Stress management techniques',
      'Biofeedback and acupuncture',
      'Cognitive behavioral therapy'
    ],
    preventions: [
      'Identifying and avoiding personal triggers',
      'Maintaining regular sleep schedule',
      'Regular meals and hydration',
      'Regular exercise',
      'Stress management',
      'Limiting caffeine and alcohol',
      'Maintaining a headache diary to identify patterns',
      'Preventive medications for frequent migraines'
    ],
    relatedConditions: [
      'tension-headache',
      'cluster-headache',
      'vestibular-migraine',
      'abdominal-migraine',
      'stroke',
      'depression',
      'anxiety-disorders'
    ],
    commonQuestions: [
      {
        question: 'What\'s the difference between a migraine and a regular headache?',
        answer: 'While a regular headache typically causes pain in the head, forehead, or neck, migraines are more severe and often involve additional symptoms beyond head pain. Migraines frequently include nausea, vomiting, extreme sensitivity to light and sound, and visual disturbances called aura. Regular headaches usually respond to over-the-counter pain relievers, while migraines may require specific medication and can be debilitating enough to interfere with daily activities.'
      },
      {
        question: 'Can migraines be prevented?',
        answer: 'While not all migraines can be prevented, many people can reduce their frequency and severity through a combination of approaches. These include identifying and avoiding personal triggers, maintaining regular sleep and meal schedules, stress management, certain medications taken regularly for prevention (rather than treatment), supplements like magnesium or riboflavin, and alternative therapies such as acupuncture or biofeedback. A personalized prevention plan developed with a healthcare provider is most effective.'
      },
      {
        question: 'Are migraines hereditary?',
        answer: 'Yes, migraines tend to run in families, suggesting a genetic component. If you have a parent who experiences migraines, you have about a 50% chance of developing them. If both parents have migraines, your risk increases to 75%. While specific migraine genes have been identified, the inheritance pattern is complex, involving multiple genes as well as environmental factors that can trigger the genetic predisposition.'
      }
    ],
    emergencySigns: [
      'Sudden, severe headache unlike previous headaches',
      'Headache with fever, stiff neck, confusion, seizures, double vision, weakness, or numbness',
      'Headache after head injury',
      'Chronic headache that worsens after coughing, exertion, or sudden movement',
      'New headache if you\'re over 50'
    ],
    prevalence: 'Migraines affect approximately 12% of the global population. In the United States, about 39 million people experience migraines. Women are three times more likely than men to experience migraines, with highest prevalence between ages 18-44.',
    affectedGroups: [
      'Women (three times more likely than men)',
      'People between ages 15-55',
      'Those with family history of migraines',
      'People with other neurological conditions',
      'Those with certain psychiatric conditions like depression and anxiety'
    ],
    references: [
      {
        id: '1',
        text: 'Goadsby PJ, Holland PR, Martins-Oliveira M, et al. (2017). "Pathophysiology of Migraine: A Disorder of Sensory Processing". Physiological Reviews. 97 (2): 553-622.',
        url: 'https://doi.org/10.1152/physrev.00034.2015'
      },
      {
        id: '2',
        text: 'Charles A. (2018). "The pathophysiology of migraine: implications for clinical management". Lancet Neurology. 17 (2): 174-182.',
        url: 'https://doi.org/10.1016/S1474-4422(17)30435-0'
      },
      {
        id: '3',
        text: 'GBD 2016 Headache Collaborators. (2018). "Global, regional, and national burden of migraine and tension-type headache, 1990-2016: a systematic analysis for the Global Burden of Disease Study 2016". Lancet Neurology. 17 (11): 954-976.',
        url: 'https://doi.org/10.1016/S1474-4422(18)30322-3'
      },
      {
        id: '4',
        text: 'Dodick DW. (2018). "Migraine". Lancet. 391 (10127): 1315-1330.',
        url: 'https://doi.org/10.1016/S0140-6736(18)30478-1'
      },
      {
        id: '5',
        text: 'American Migraine Foundation. (2021). "Understanding Migraine".',
        url: 'https://americanmigrainefoundation.org/resource-library/understanding-migraine/'
      }
    ]
  },
  {
    id: 'mumps',
    name: 'Mumps',
    description: 'A contagious viral infection primarily affecting the salivary glands, particularly the parotid glands, causing swelling and pain near the jaw.[1] Mumps is caused by the mumps virus (genus Rubulavirus) and spreads through respiratory droplets or direct contact with an infected person.[2] The introduction of the MMR (measles, mumps, rubella) vaccine has significantly reduced the incidence of mumps in many countries.[3] While usually mild in children, mumps can lead to more serious complications in adults, including testicular inflammation, meningitis, and hearing loss.[4]',
    category: 'infectious-diseases',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Mumps',
    symptoms: [
      'Swollen, painful salivary glands, especially the parotid glands',
      'Jaw pain and tenderness',
      'Fever',
      'Headache',
      'Muscle aches',
      'Weakness and fatigue',
      'Loss of appetite',
      'Pain while chewing or swallowing',
      'Earache',
      'Swelling around the temples or jaw (often on both sides)'
    ],
    causes: [
      'Infection with the mumps virus (paramyxovirus family)',
      'Transmission through respiratory droplets from coughing and sneezing',
      'Direct contact with infected saliva',
      'Sharing utensils or cups with an infected person',
      'Lack of vaccination',
      'Contact with contaminated surfaces',
      'Close living quarters (dormitories, military barracks, etc.)'
    ],
    treatments: [
      'Rest and adequate fluid intake',
      'Over-the-counter pain relievers (acetaminophen, ibuprofen)',
      'Cold compresses for swollen glands',
      'Soft, bland foods that don\'t require much chewing',
      'Avoiding acidic foods and beverages',
      'Isolation to prevent spreading the virus',
      'Supportive care for complications'
    ],
    preventions: [
      'MMR (measles, mumps, rubella) vaccine',
      'Two doses of the vaccine providing about 88% protection',
      'Avoiding close contact with infected individuals',
      'Proper hand hygiene',
      'Not sharing eating utensils or drinks',
      'Covering mouth and nose when coughing or sneezing',
      'Maintaining high vaccination rates in communities for herd immunity'
    ],
    relatedConditions: [
      'orchitis',
      'meningitis',
      'encephalitis',
      'pancreatitis',
      'oophoritis',
      'measles',
      'rubella',
      'deafness',
      'mastitis'
    ],
    commonQuestions: [
      {
        question: 'Can you get mumps if you\'ve been vaccinated?',
        answer: 'Yes, it\'s possible to get mumps even if you\'ve been vaccinated, though the risk is significantly lower. The MMR vaccine is about 88% effective at preventing mumps after two doses. If a vaccinated person does contract mumps, they typically experience milder symptoms and fewer complications than unvaccinated individuals. Vaccine effectiveness can wane over time, and during outbreaks, even vaccinated populations can be affected, particularly in close-contact settings like college campuses.'
      },
      {
        question: 'How long is mumps contagious?',
        answer: 'People with mumps are typically contagious from about 2 days before symptoms appear until 5 days after the onset of parotid gland swelling. However, the virus may be present in saliva from 7 days before to 9 days after the onset of symptoms. The most infectious period is just before and during the early stages of symptom development. This is why isolation is important once mumps is diagnosed, and why the disease can spread rapidly in group settings before cases are identified.'
      },
      {
        question: 'What are the potential complications of mumps in adults?',
        answer: 'Mumps tends to cause more severe complications in adults than in children. The most common serious complication in adult males is orchitis (testicular inflammation), affecting 20-30% of post-pubertal males, which can lead to testicular atrophy and, rarely, fertility issues. Other potential complications include meningitis (inflammation of the brain and spinal cord membranes) in 1-10% of cases, pancreatitis (pancreas inflammation), oophoritis (ovarian inflammation) in females, and permanent hearing loss (rare). Encephalitis (brain inflammation) is a rare but serious complication that can be life-threatening.'
      }
    ],
    emergencySigns: [
      'Severe headache with stiff neck',
      'Severe abdominal pain (possible pancreatitis)',
      'Testicular pain and swelling (orchitis)',
      'Seizures or altered consciousness',
      'Severe dehydration due to difficulty swallowing',
      'Sudden hearing loss',
      'High fever that doesn\'t respond to medication'
    ],
    prevalence: 'Before widespread vaccination, mumps was a common childhood disease with epidemics occurring every 2-5 years. Since the introduction of the MMR vaccine in the 1960s, cases have decreased by more than 99% in countries with high vaccination rates. However, outbreaks still occur, particularly in close-contact settings like colleges and universities, even among vaccinated populations.',
    affectedGroups: [
      'Unvaccinated or under-vaccinated individuals',
      'College students and others in close-living situations',
      'Children aged 5-9 years (in unvaccinated populations)',
      'Adults born before routine vaccination who never had mumps',
      'Individuals with weakened immune systems',
      'International travelers to areas where mumps is common',
      'Healthcare workers with potential exposure'
    ],
    references: [
      {
        id: '1',
        text: 'Hviid A, Rubin S, Mühlemann K. (2008). "Mumps". Lancet. 371 (9616): 932–944.',
        url: 'https://doi.org/10.1016/S0140-6736(08)60419-5'
      },
      {
        id: '2',
        text: 'Galazka AM, Robertson SE, Kraigher A. (1999). "Mumps and mumps vaccine: a global review". Bulletin of the World Health Organization. 77 (1): 3–14.',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2557572/'
      },
      {
        id: '3',
        text: 'McLean HQ, Fiebelkorn AP, Temte JL, Wallace GS. (2013). "Prevention of measles, rubella, congenital rubella syndrome, and mumps, 2013: summary recommendations of the Advisory Committee on Immunization Practices (ACIP)". MMWR Recommendations and Reports. 62 (RR-04): 1–34.',
        url: 'https://www.cdc.gov/mmwr/preview/mmwrhtml/rr6204a1.htm'
      },
      {
        id: '4',
        text: 'Lewnard JA, Grad YH. (2018). "Vaccine waning and mumps re-emergence in the United States". Science Translational Medicine. 10 (433): eaao5945.',
        url: 'https://doi.org/10.1126/scitranslmed.aao5945'
      },
      {
        id: '5',
        text: 'Rubin S, Eckhaus M, Rennick LJ, et al. (2015). "Molecular biology, pathogenesis and pathology of mumps virus". Journal of Pathology. 235 (2): 242–252.',
        url: 'https://doi.org/10.1002/path.4445'
      }
    ]
  },
  {
    id: 'muscular-dystrophy',
    name: 'Muscular Dystrophy',
    description: 'A group of genetic diseases characterized by progressive weakness and degeneration of the skeletal muscles that control movement.[1] There are more than 30 forms of muscular dystrophy, with varying ages of onset, severity, and patterns of affected muscles.[2] All forms of muscular dystrophy grow worse as muscles progressively degenerate and weaken, with many patients eventually losing the ability to walk.[3] Some forms also affect cardiac muscles, causing cardiomyopathy and arrhythmias, or respiratory muscles, leading to breathing difficulties.[4]',
    category: 'brain-and-nerves',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Muscular_dystrophy',
    symptoms: [
      'Progressive muscle weakness',
      'Muscle wasting (atrophy)',
      'Poor balance',
      'Frequent falls',
      'Difficulty walking (waddling gait)',
      'Difficulty rising from a lying or sitting position (Gowers\'s sign)',
      'Limited range of motion',
      'Respiratory problems',
      'Skeletal deformities such as scoliosis',
      'Muscle spasms and contractures'
    ],
    causes: [
      'Genetic mutations affecting proteins essential for muscle integrity',
      'Dystrophin gene mutations (in Duchenne and Becker muscular dystrophies)',
      'Autosomal dominant inheritance patterns (some forms)',
      'Autosomal recessive inheritance patterns (some forms)',
      'X-linked inheritance patterns (some forms)',
      'Spontaneous genetic mutations (in cases without family history)',
      'Disruption of muscle cell membrane stability',
      'Defects in proteins associated with the dystrophin-glycoprotein complex',
      'Abnormal protein folding in muscle cells'
    ],
    treatments: [
      'Physical therapy to maintain muscle strength and prevent contractures',
      'Occupational therapy to improve daily functioning',
      'Corticosteroids (such as prednisone or deflazacort) to slow muscle degeneration',
      'Orthotic devices such as ankle-foot orthoses or leg braces',
      'Assistive devices like wheelchairs, canes, or walkers',
      'Respiratory support (ventilators for advanced cases)',
      'Cardiac monitoring and management',
      'Orthopedic surgery to correct scoliosis or contractures',
      'Gene therapy (emerging treatments for some types)',
      'Medications for symptom management'
    ],
    preventions: [
      'Genetic counseling for families with history of muscular dystrophy',
      'Prenatal testing and diagnosis',
      'Carrier testing for family members of affected individuals',
      'Regular exercise as recommended by healthcare providers',
      'Maintaining a healthy weight to reduce strain on muscles',
      'Preventing respiratory infections through vaccination',
      'Early intervention to prevent complications',
      'Avoiding prolonged immobility when possible'
    ],
    relatedConditions: [
      'myotonic-dystrophy',
      'duchenne-muscular-dystrophy',
      'becker-muscular-dystrophy',
      'facioscapulohumeral-muscular-dystrophy',
      'limb-girdle-muscular-dystrophy',
      'congenital-muscular-dystrophy',
      'emery-dreifuss-muscular-dystrophy',
      'oculopharyngeal-muscular-dystrophy',
      'distal-muscular-dystrophy'
    ],
    commonQuestions: [
      {
        question: 'How is muscular dystrophy diagnosed?',
        answer: 'Diagnosis of muscular dystrophy typically involves several steps. First, the doctor evaluates symptoms and family history. Blood tests check for elevated creatine kinase levels, which indicate muscle damage. Genetic testing can identify specific gene mutations responsible for many forms of muscular dystrophy. Electromyography (EMG) measures electrical activity in muscles, while muscle biopsies examine muscle tissue under a microscope for characteristic changes. Imaging studies like MRI may also be used to assess muscle quality and identify patterns of muscle involvement. Early diagnosis is important for better management of the condition.'
      },
      {
        question: 'What are the different types of muscular dystrophy?',
        answer: 'There are more than 30 different types of muscular dystrophy, each affecting different muscle groups and varying in severity and age of onset. Major types include Duchenne (the most common and severe form affecting boys), Becker (similar to Duchenne but milder), Myotonic (affecting facial muscles, characterized by inability to relax muscles), Limb-girdle (affecting hip and shoulder muscles), Facioscapulohumeral (affecting face, shoulders, and upper arms), Congenital (present at birth), Emery-Dreifuss (early contractures and cardiac issues), Oculopharyngeal (affecting eyelids and throat), and Distal (affecting hands, forearms, lower legs). Each type has distinct genetic causes, inheritance patterns, and progression rates.'
      },
      {
        question: 'Is muscular dystrophy treatable?',
        answer: 'While there is currently no cure for muscular dystrophy, treatments can help manage symptoms and improve quality of life. Corticosteroids like prednisone can slow muscle degeneration in some forms. Physical and occupational therapy help maintain muscle function and independence. Assistive devices and orthotic supports aid mobility. Respiratory care and cardiac monitoring are essential for types affecting these systems. Surgeries may correct contractures or scoliosis. Promising research includes gene therapy, exon skipping, and CRISPR technology, with some treatments receiving FDA approval for specific types like Duchenne. Management is typically multidisciplinary, involving neurologists, pulmonologists, cardiologists, physical therapists, and genetic counselors.'
      }
    ],
    emergencySigns: [
      'Severe difficulty breathing or respiratory distress',
      'Signs of cardiac problems (chest pain, irregular heartbeat)',
      'Choking or severe swallowing difficulties',
      'High fever with respiratory symptoms',
      'Severe falls resulting in potential fractures',
      'Sudden increase in weakness',
      'Signs of respiratory infection with decreased oxygen levels'
    ],
    prevalence: 'The prevalence of all forms of muscular dystrophy combined is estimated at 1 in 3,000 to 1 in 5,000 people worldwide. Duchenne muscular dystrophy, the most common form, affects approximately 1 in 3,500 to 5,000 male births globally. Other forms such as myotonic dystrophy affect about 1 in 8,000 people, while facioscapulohumeral muscular dystrophy affects about 1 in 20,000 people.',
    affectedGroups: [
      'Males (for X-linked forms like Duchenne and Becker)',
      'Both sexes (for autosomal dominant and recessive forms)',
      'Children (congenital and early-onset forms)',
      'Adolescents and young adults (some forms like limb-girdle)',
      'Middle-aged adults (later-onset forms like oculopharyngeal)',
      'Families with history of muscular dystrophy',
      'Specific ethnic populations (some forms have higher prevalence in certain groups)'
    ],
    references: [
      {
        id: '1',
        text: 'Mercuri E, Bonnemann CG, Muntoni F. (2019). "Muscular dystrophies". Lancet. 394 (10213): 2025–2038.',
        url: 'https://doi.org/10.1016/S0140-6736(19)32910-1'
      },
      {
        id: '2',
        text: 'Mah JK, Korngut L, Dykeman J, et al. (2014). "A systematic review and meta-analysis on the epidemiology of Duchenne and Becker muscular dystrophy". Neuromuscular Disorders. 24 (6): 482–491.',
        url: 'https://doi.org/10.1016/j.nmd.2014.03.008'
      },
      {
        id: '3',
        text: 'Birnkrant DJ, Bushby K, Bann CM, et al. (2018). "Diagnosis and management of Duchenne muscular dystrophy, part 1: diagnosis, and neuromuscular, rehabilitation, endocrine, and gastrointestinal and nutritional management". Lancet Neurology. 17 (3): 251–267.',
        url: 'https://doi.org/10.1016/S1474-4422(18)30024-3'
      },
      {
        id: '4',
        text: 'Shieh PB. (2018). "Emerging Strategies in the Treatment of Duchenne Muscular Dystrophy". Neurotherapeutics. 15 (4): 840–848.',
        url: 'https://doi.org/10.1007/s13311-018-00687-z'
      },
      {
        id: '5',
        text: 'Emery AE. (2002). "The muscular dystrophies". Lancet. 359 (9307): 687–695.',
        url: 'https://doi.org/10.1016/S0140-6736(02)07815-7'
      }
    ]
  },
  {
    id: 'nasal-polyps',
    name: 'Nasal Polyps',
    description: 'Nasal polyps are soft, painless, noncancerous growths that develop on the lining of the nasal passages or sinuses.[1] They result from chronic inflammation and are associated with conditions such as asthma, recurring infection, allergies, drug sensitivity, or certain immune disorders.[2] When small, nasal polyps may not cause symptoms, but larger growths or groups of polyps can block nasal passages and lead to breathing problems, frequent infections, and reduced sense of smell.[3]',
    category: 'respiratory',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Nasal_polyp',
    symptoms: [
      'Nasal congestion and stuffiness',
      'Runny nose',
      'Postnasal drip',
      'Reduced or lost sense of smell',
      'Reduced sense of taste',
      'Facial pressure or pain',
      'Sinus headaches',
      'Snoring',
      'Frequent sinus infections',
      'Breathing through the mouth',
      'Thick nasal discharge',
      'Nasal speech'
    ],
    causes: [
      'Chronic inflammation of nasal passages and sinuses',
      'Asthma',
      'Aspirin sensitivity',
      'Allergic rhinitis (hay fever)',
      'Cystic fibrosis',
      'Chronic sinusitis',
      'Aspirin-exacerbated respiratory disease (AERD)',
      'Allergic fungal sinusitis',
      'Churg-Strauss syndrome (eosinophilic granulomatosis with polyangiitis)',
      'Genetic factors'
    ],
    treatments: [
      'Nasal corticosteroid sprays to reduce inflammation',
      'Oral corticosteroids for more severe cases',
      'Antihistamines for allergic reactions',
      'Antibiotics for bacterial infections',
      'Antileukotriene medications (like montelukast) for people with aspirin sensitivity',
      'Aspirin desensitization for those with aspirin-exacerbated respiratory disease',
      'Saline nasal irrigation to improve mucus flow',
      'Endoscopic sinus surgery to remove polyps and improve sinus drainage',
      'Biologics (such as dupilumab) for severe cases',
      'Immunotherapy for allergic triggers'
    ],
    preventions: [
      'Managing allergies and asthma',
      'Avoiding nasal irritants like tobacco smoke',
      'Humidifying the air at home to prevent nasal dryness',
      'Using saline nasal sprays to rinse allergens and irritants',
      'Regular use of prescribed nasal corticosteroids',
      'Following treatment plan to manage chronic sinusitis',
      'Avoiding aspirin and NSAIDs if you have aspirin sensitivity',
      'Treating nasal and sinus infections promptly',
      'Maintaining good indoor air quality',
      'Regular follow-up appointments with healthcare providers'
    ],
    relatedConditions: [
      'chronic-sinusitis',
      'allergic-rhinitis',
      'asthma',
      'cystic-fibrosis',
      'aspirin-exacerbated-respiratory-disease',
      'allergic-fungal-sinusitis',
      'eosinophilic-granulomatosis-with-polyangiitis'
    ],
    commonQuestions: [
      {
        question: 'Are nasal polyps cancerous?',
        answer: 'No, nasal polyps are not cancerous. They are benign (noncancerous) growths that develop in the lining of the nasal passages or sinuses due to chronic inflammation. However, in very rare cases, what appears to be a polyp could be another type of growth. If you have unusual symptoms or a unilateral (one-sided) polyp, your doctor may recommend a biopsy to rule out other conditions.'
      },
      {
        question: 'Will nasal polyps go away on their own?',
        answer: 'Nasal polyps rarely go away on their own without treatment. In fact, they tend to grow larger over time if the underlying inflammation is not addressed. Treatment with medications like corticosteroids can shrink polyps and reduce symptoms. For larger polyps or those that don\'t respond to medication, surgical removal may be necessary. Even after successful treatment, nasal polyps often recur, especially if the underlying cause of inflammation continues.'
      },
      {
        question: 'How are nasal polyps diagnosed?',
        answer: 'Nasal polyps are diagnosed through a combination of methods. First, your doctor will review your symptoms and medical history. Then, they will examine the inside of your nose using a nasal endoscope (a thin, flexible tube with a light and camera). For a more detailed view, imaging tests like a CT scan may be ordered to determine the size, location, and extent of the polyps, as well as to check for other abnormalities in the sinuses. In some cases, allergy tests or tests for cystic fibrosis may be recommended to identify underlying causes.'
      }
    ],
    emergencySigns: [
      'Severe difficulty breathing',
      'Complete nasal obstruction on both sides',
      'Severe headache with high fever',
      'Visual changes or vision loss',
      'Significant swelling around the eyes',
      'Severe facial pain or swelling',
      'Symptoms of meningitis (stiff neck, sensitivity to light)'
    ],
    prevalence: 'Nasal polyps affect approximately 1-4% of the general population. They are more common in adults than children and tend to occur most often in people over 40. Men are 2-4 times more likely to develop nasal polyps than women. Among people with chronic rhinosinusitis, about 20% have nasal polyps. The prevalence is significantly higher in people with asthma (7%), and even higher in those with both asthma and aspirin sensitivity (approximately 15%).', 
    affectedGroups: [
      'Adults over 40 years of age',
      'Men (more commonly than women)',
      'People with asthma',
      'People with aspirin sensitivity',
      'Individuals with cystic fibrosis',
      'People with chronic sinusitis',
      'Individuals with allergic fungal sinusitis',
      'People with immune disorders'
    ],
    references: [
      {
        id: '1',
        text: 'Stevens WW, Schleimer RP, Kern RC. (2016). "Chronic Rhinosinusitis with Nasal Polyps". Journal of Allergy and Clinical Immunology: In Practice. 4 (4): 565-572.',
        url: 'https://doi.org/10.1016/j.jaip.2016.04.012'
      },
      {
        id: '2',
        text: 'Fokkens WJ, Lund VJ, Hopkins C, et al. (2020). "European Position Paper on Rhinosinusitis and Nasal Polyps 2020". Rhinology. 58 (Suppl S29): 1-464.',
        url: 'https://doi.org/10.4193/Rhin20.600'
      },
      {
        id: '3',
        text: 'Bachert C, Pawankar R, Zhang L, et al. (2014). "ICON: chronic rhinosinusitis". World Allergy Organization Journal. 7 (1): 25.',
        url: 'https://doi.org/10.1186/1939-4551-7-25'
      },
      {
        id: '4',
        text: 'Khan A, Huynh TMT, Vandeplas G, et al. (2019). "The Role of Biologics in Chronic Rhinosinusitis with Nasal Polyps". Journal of Allergy and Clinical Immunology: In Practice. 7 (5): 1575-1584.',
        url: 'https://doi.org/10.1016/j.jaip.2019.01.031'
      },
      {
        id: '5',
        text: 'Tan BK, Chandra RK, Pollak J, et al. (2013). "Incidence and associated premorbid diagnoses of patients with chronic rhinosinusitis". Journal of Allergy and Clinical Immunology. 131 (5): 1350-1360.',
        url: 'https://doi.org/10.1016/j.jaci.2013.02.002'
      }
    ]
  },
  {
    id: 'nephritis',
    name: 'Nephritis',
    description: 'Nephritis refers to inflammation of the kidneys, which can affect the kidney function by reducing its ability to filter waste from the blood.[1] This condition can be acute or chronic and is often caused by infections, autoimmune disorders, or exposure to certain drugs or toxins.[2] Without proper treatment, nephritis can lead to kidney damage, kidney failure, high blood pressure, and fluid retention.[3]',
    category: 'urinary-system',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Nephritis',
    symptoms: [
      'Blood in urine (hematuria)',
      'Protein in urine (proteinuria)',
      'Decreased urine output (oliguria)',
      'Foamy or bubbly urine',
      'Swelling (edema), particularly in the face, legs, and ankles',
      'High blood pressure',
      'Fatigue',
      'Nausea and vomiting',
      'Loss of appetite',
      'Confusion or difficulty concentrating',
      'Shortness of breath',
      'Pain or burning during urination',
      'Flank pain (pain in the sides)'
    ],
    causes: [
      'Autoimmune disorders (like lupus, Goodpasture syndrome)',
      'Bacterial infections (streptococcal infections)',
      'Viral infections (hepatitis B, hepatitis C, HIV)',
      'Medications and toxins',
      'Allergic reactions to medications',
      'IgA nephropathy',
      'Post-streptococcal glomerulonephritis',
      'Genetic disorders',
      'Vasculitis (inflammation of blood vessels)',
      'Diabetic nephropathy',
      'Urinary tract infections that spread to the kidneys (pyelonephritis)'
    ],
    treatments: [
      'Corticosteroids to reduce inflammation',
      'Immunosuppressive medications for autoimmune causes',
      'Angiotensin-converting enzyme (ACE) inhibitors to control blood pressure',
      'Antibiotics for bacterial infections',
      'Antiviral medications for viral causes',
      'Plasmapheresis (blood plasma exchange) in severe cases',
      'Diuretics to reduce fluid retention',
      'Dietary changes (low-sodium, low-protein diet)',
      'Dialysis for severe kidney dysfunction',
      'Kidney transplant for end-stage kidney disease',
      'Discontinuation of medications causing the nephritis'
    ],
    preventions: [
      'Prompt treatment of throat and skin infections',
      'Management of underlying conditions like diabetes and hypertension',
      'Regular monitoring of kidney function in high-risk individuals',
      'Avoiding medications known to cause kidney damage',
      'Maintaining adequate hydration',
      'Following a kidney-friendly diet as recommended by healthcare providers',
      'Regular check-ups for those with risk factors',
      'Controlling blood pressure and blood sugar levels',
      'Prompt treatment of urinary tract infections'
    ],
    relatedConditions: [
      'lupus',
      'glomerulonephritis',
      'interstitial-nephritis',
      'pyelonephritis',
      'chronic-kidney-disease',
      'kidney-failure',
      'iga-nephropathy',
      'goodpasture-syndrome',
      'vasculitis',
      'post-streptococcal-glomerulonephritis'
    ],
    commonQuestions: [
      {
        question: 'What is the difference between nephritis and nephrosis?',
        answer: 'Nephritis and nephrosis are both kidney disorders but differ in their underlying causes and manifestations. Nephritis refers specifically to inflammation of the kidneys, often due to infections, autoimmune disorders, or reactions to medications. It typically presents with blood in the urine, reduced kidney function, and sometimes high blood pressure. Nephrosis, on the other hand, is characterized by damage to the kidney\'s filtering membranes without inflammation, leading to massive protein loss in the urine, severe swelling, and high cholesterol. While nephritis often involves an immune or inflammatory response, nephrosis is usually related to damage to the glomerular filtration barrier.'
      },
      {
        question: 'How is nephritis diagnosed?',
        answer: 'Diagnosing nephritis typically involves several steps. First, doctors evaluate symptoms and medical history, followed by urine tests to check for blood, protein, and other abnormalities. Blood tests assess kidney function by measuring levels of creatinine and blood urea nitrogen (BUN). Imaging studies like ultrasounds or CT scans may be used to visualize kidney structure. A kidney biopsy—where a small tissue sample is removed and examined under a microscope—is often necessary for definitive diagnosis and to determine the specific type of nephritis. Additional tests may include complement levels, autoantibody tests, and streptococcal antibody titers depending on the suspected cause.'
      },
      {
        question: 'Can nephritis be cured?',
        answer: 'Whether nephritis can be cured depends on its underlying cause and severity. Some forms, like those caused by bacterial infections or medication reactions, may resolve completely with appropriate treatment. For instance, post-streptococcal glomerulonephritis often improves on its own with supportive care. However, nephritis related to autoimmune disorders like lupus or IgA nephropathy typically requires ongoing management rather than offering a definitive cure. Early diagnosis and treatment are crucial to prevent or slow kidney damage. Even in cases where complete cure isn\'t possible, proper treatment can often effectively control symptoms and preserve kidney function for many years.'
      }
    ],
    emergencySigns: [
      'Severe shortness of breath or difficulty breathing',
      'Chest pain or pressure',
      'Severe headache with confusion',
      'Seizures',
      'Significant decrease or absence of urine output',
      'Extreme swelling, especially if sudden',
      'Very high blood pressure with symptoms like severe headache or vision changes'
    ],
    prevalence: 'The prevalence of nephritis varies by type and region. Globally, glomerulonephritis, the most common form of nephritis, affects approximately 1 in 10,000 people. Lupus nephritis occurs in about 50-60% of people with systemic lupus erythematosus (SLE). Post-streptococcal glomerulonephritis is more common in developing countries, affecting 9.5-28.5 individuals per 100,000 annually. In the United States, nephritis represents the ninth most common cause of death among all women and the fifth leading cause among non-Hispanic Black women.',
    affectedGroups: [
      'People with autoimmune disorders, particularly lupus',
      'Individuals after streptococcal infections',
      'People of African or Asian descent (higher rates of certain types)',
      'Children (post-streptococcal glomerulonephritis)',
      'Adults in their 20s and 30s (lupus nephritis)',
      'Men with IgA nephropathy (more common than in women)',
      'People taking certain medications (drug-induced nephritis)',
      'Individuals with chronic infections like hepatitis B or C',
      'People with diabetes or high blood pressure'
    ],
    references: [
      {
        id: '1',
        text: 'Couser WG. (2012). "Basic and translational concepts of immune-mediated glomerular diseases". Journal of the American Society of Nephrology. 23 (3): 381-399.',
        url: 'https://doi.org/10.1681/ASN.2011030304'
      },
      {
        id: '2',
        text: 'Hahn BH, McMahon MA, Wilkinson A, et al. (2012). "American College of Rheumatology guidelines for screening, treatment, and management of lupus nephritis". Arthritis Care & Research. 64 (6): 797-808.',
        url: 'https://doi.org/10.1002/acr.21664'
      },
      {
        id: '3',
        text: 'Rodrigues JC, Haas M, Reich HN. (2017). "IgA Nephropathy". Clinical Journal of the American Society of Nephrology. 12 (4): 677-686.',
        url: 'https://doi.org/10.2215/CJN.07420716'
      },
      {
        id: '4',
        text: 'Jefferson JA. (2014). "Treating elderly patients with nephritis and renal disease". Clinics in Geriatric Medicine. 30 (3): 487-501.',
        url: 'https://doi.org/10.1016/j.cger.2014.04.006'
      },
      {
        id: '5',
        text: 'Pinto J, Bhat S, Bhat RG, et al. (2018). "Study of clinical, laboratory parameters and outcome in pediatric acute post-streptococcal glomerulonephritis". Journal of Nepal Paediatric Society. 38 (1): 26-30.',
        url: 'https://doi.org/10.3126/jnps.v38i1.19057'
      }
    ]
  },
  {
    id: 'peripheral-neuropathy',
    name: 'Peripheral Neuropathy',
    description: 'Peripheral neuropathy refers to damage or disease affecting the peripheral nerves, which are the nerves outside the brain and spinal cord.[1] This damage disrupts the nerves\'s ability to transmit signals between the brain, spinal cord, and the rest of the body, resulting in symptoms such as numbness, weakness, and pain, typically in the hands and feet.[2] The condition can be acute (sudden onset with rapid progression) or chronic (develops slowly over time), and can affect motor, sensory, or autonomic nerve fibers.[3]',
    category: 'brain-and-nerves',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Peripheral_neuropathy',
    symptoms: [
      'Numbness and tingling in feet or hands',
      'Burning, stabbing, or shooting pain',
      'Loss of balance and coordination',
      'Muscle weakness',
      'Extreme sensitivity to touch',
      'Lack of pain sensation (which can lead to injuries)',
      'Changes in blood pressure causing dizziness',
      'Heat intolerance',
      'Digestive problems',
      'Bladder dysfunction',
      'Sexual dysfunction',
      'Muscle cramps or twitching',
      'Difficulty walking or moving arms'
    ],
    causes: [
      'Diabetes mellitus (most common cause)',
      'Alcoholism and poor nutrition',
      'Autoimmune diseases like rheumatoid arthritis and lupus',
      'Infections (HIV, Lyme disease, shingles, hepatitis C)',
      'Vitamin deficiencies (B1, B6, B12, E)',
      'Medications, especially chemotherapy drugs',
      'Toxin exposure (heavy metals, industrial chemicals)',
      'Trauma or pressure on nerves',
      'Genetic disorders (Charcot-Marie-Tooth disease)',
      'Kidney disease',
      'Hypothyroidism',
      'Cancer and tumors',
      'Vascular and blood problems',
      'Fluoroquinolone antibiotics'
    ],
    treatments: [
      'Treating underlying conditions (diabetes, autoimmune disorders)',
      'Pain management with medications (anticonvulsants, antidepressants)',
      'Topical treatments (lidocaine patches, capsaicin cream)',
      'Physical therapy to improve strength and balance',
      'Occupational therapy for adaptive equipment and techniques',
      'Transcutaneous electrical nerve stimulation (TENS)',
      'Plasma exchange therapy for certain conditions',
      'Intravenous immune globulin for immune-mediated neuropathies',
      'Surgery to relieve nerve compression',
      'Pain management procedures (nerve blocks)',
      'Complementary approaches (acupuncture, massage)',
      'Alpha-lipoic acid and other supplements for diabetic neuropathy'
    ],
    preventions: [
      'Managing diabetes with strict blood sugar control',
      'Maintaining healthy vitamin levels through diet and supplements',
      'Limiting alcohol consumption',
      'Regular exercise to maintain muscle strength',
      'Eating a balanced diet rich in B vitamins',
      'Avoiding toxin exposure (heavy metals, industrial chemicals)',
      'Regular medical check-ups for early detection of conditions',
      'Proper footwear to prevent injuries for those with foot numbness',
      'Avoiding prolonged pressure on nerves (such as from repetitive motions)',
      'Maintaining a healthy weight'
    ],
    relatedConditions: [
      'diabetes-mellitus',
      'alcoholism',
      'rheumatoid-arthritis',
      'lupus',
      'hiv',
      'lyme-disease',
      'shingles',
      'vitamin-deficiencies',
      'guillain-barre-syndrome',
      'charcot-marie-tooth-disease',
      'multiple-sclerosis',
      'kidney-disease',
      'hypothyroidism'
    ],
    commonQuestions: [
      {
        question: 'Is peripheral neuropathy reversible?',
        answer: 'Whether peripheral neuropathy can be reversed depends largely on the underlying cause. If the neuropathy is caused by a treatable condition such as vitamin deficiency, diabetes, or inflammatory disorders, addressing these conditions promptly may improve or even reverse the neuropathy. For instance, neuropathy caused by vitamin B12 deficiency can often be reversed with proper supplementation. Similarly, neuropathy from pressure on nerves (like carpal tunnel syndrome) may improve with surgery. However, in many cases, especially when nerves have been damaged for a long time or when the cause is genetic, complete reversal might not be possible. The goal of treatment then becomes managing symptoms and preventing further progression. Early diagnosis and treatment typically offer the best chance for recovery or improvement.'
      },
      {
        question: 'How is peripheral neuropathy diagnosed?',
        answer: 'Diagnosing peripheral neuropathy involves several steps. First, your doctor will review your medical history and symptoms, followed by a physical and neurological examination testing reflexes, muscle strength, and sensitivity to touch, temperature, and vibration. Blood tests may be ordered to check for vitamin deficiencies, diabetes, abnormal immune function, and other potential causes. Specialized tests often include electromyography (EMG) and nerve conduction studies, which measure electrical activity in muscles and nerves to identify abnormalities. In some cases, nerve or skin biopsies may be necessary to examine nerve damage directly. Advanced imaging such as MRI might be used to rule out other conditions that could cause similar symptoms. A thorough diagnostic process is essential because treatment depends on identifying the underlying cause of the neuropathy.'
      },
      {
        question: 'What are the differences between the types of peripheral neuropathy?',
        answer: 'Peripheral neuropathy can be classified in several ways based on which nerves are affected. Mononeuropathy affects a single nerve, with common examples being carpal tunnel syndrome or ulnar nerve palsy. Polyneuropathy affects multiple nerves simultaneously and typically begins in the longest nerves (those going to the feet) before progressing upward; diabetic neuropathy is a classic example. Multiple mononeuropathy (mononeuritis multiplex) damages nerves in isolated areas and is often associated with inflammatory conditions. Based on the type of nerve fibers affected, neuropathy can be sensory (affecting touch, pain, and temperature sensation), motor (causing weakness and muscle atrophy), autonomic (affecting involuntary functions like blood pressure and digestion), or mixed (combination of types). The symptoms, progression, and treatment approach vary significantly depending on which classification applies to a patient\'s specific condition.'
      }
    ],
    emergencySigns: [
      'Sudden onset of weakness or paralysis',
      'Severe pain that is unmanageable',
      'Difficulty breathing or swallowing',
      'Rapid progression of symptoms over days',
      'Symptoms following a recent injury or trauma',
      'Loss of bladder or bowel control',
      'Dizziness with severe blood pressure changes',
      'Diabetic neuropathy with foot infections or ulcers'
    ],
    prevalence: 'Peripheral neuropathy affects approximately 2-8% of the general population, though estimates vary widely. The prevalence increases significantly with age, affecting up to 8% of people over 55 years and potentially 50% of individuals over 80 years old. Among people with diabetes, the prevalence is much higher, with 60-70% developing some form of neuropathy during their lifetime. Certain types are more common in specific populations: alcoholic neuropathy affects 25-66% of chronic alcohol users; chemotherapy-induced peripheral neuropathy occurs in 30-40% of cancer patients receiving neurotoxic chemotherapy; and HIV-associated neuropathy affects approximately 30-60% of individuals with HIV.',
    affectedGroups: [
      'Adults over 60 years of age',
      'People with diabetes (especially with poor glycemic control)',
      'Individuals with autoimmune disorders',
      'Cancer patients undergoing chemotherapy',
      'People with HIV/AIDS',
      'Individuals with kidney or liver disorders',
      'Those with vitamin deficiencies or malnutrition',
      'Heavy alcohol users',
      'People with genetic predispositions to nerve disorders',
      'Workers exposed to industrial toxins or heavy metals'
    ],
    references: [
      {
        id: '1',
        text: 'Watson JC, Dyck PJ. (2015). "Peripheral Neuropathy: A Practical Approach to Diagnosis and Symptom Management". Mayo Clinic Proceedings. 90 (7): 940-951.',
        url: 'https://doi.org/10.1016/j.mayocp.2015.05.004'
      },
      {
        id: '2',
        text: 'Staff NP, Windebank AJ. (2014). "Peripheral neuropathy due to vitamin deficiency, toxins, and medications". Continuum (Minneapolis, Minn.). 20 (5): 1293-1306.',
        url: 'https://doi.org/10.1212/01.CON.0000455880.06675.5a'
      },
      {
        id: '3',
        text: 'Callaghan BC, Price RS, Feldman EL. (2015). "Distal Symmetric Polyneuropathy: A Review". JAMA. 314 (20): 2172-2181.',
        url: 'https://doi.org/10.1001/jama.2015.13611'
      },
      {
        id: '4',
        text: 'Hoeijmakers JG, Faber CG, Lauria G, et al. (2012). "Small-fibre neuropathies—advances in diagnosis, pathophysiology and management". Nature Reviews Neurology. 8 (7): 369-379.',
        url: 'https://doi.org/10.1038/nrneurol.2012.97'
      },
      {
        id: '5',
        text: 'Feldman EL, Callaghan BC, Pop-Busui R, et al. (2019). "Diabetic neuropathy". Nature Reviews Disease Primers. 5 (1): 42.',
        url: 'https://doi.org/10.1038/s41572-019-0092-1'
      }
    ]
  },
  {
    id: 'osteoarthritis',
    name: 'Osteoarthritis',
    description: 'Osteoarthritis is the most common form of arthritis, characterized by joint pain and stiffness that develops gradually over time.[1] It occurs when the protective cartilage that cushions the ends of bones wears down over time, leading to bone-on-bone contact, inflammation, and joint damage.[2] The condition most commonly affects the knees, hips, hands, and spine, causing pain, reduced mobility, and in advanced cases, significant disability.[3]',
    category: 'bone-and-joint',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Osteoarthritis',
    symptoms: [
      'Joint pain that worsens with activity and improves with rest',
      'Morning stiffness that typically lasts less than 30 minutes',
      'Decreased joint flexibility and range of motion',
      'Joint swelling and tenderness',
      'Grating sensation or crackling sound (crepitus) when the joint moves',
      'Bone spurs (osteophytes) around affected joints',
      'Joint instability or buckling, especially in knees',
      'Changes in gait or walking pattern',
      'Heberden\'s nodes (bony enlargements in finger joints)',
      'Bouchard\'s nodes (swelling of the middle joints of fingers)',
      'Reduced function and mobility'
    ],
    causes: [
      'Age-related wear and tear of joint cartilage',
      'Previous joint injuries or trauma',
      'Obesity and excess body weight',
      'Joint overuse from repetitive movements',
      'Genetic predisposition',
      'Bone deformities or misalignments',
      'Metabolic disorders such as diabetes',
      'Inflammatory conditions',
      'Gender (more common in women)',
      'Loss of muscle strength supporting joints',
      'Joint malformation at birth (congenital)'
    ],
    treatments: [
      'Over-the-counter pain relievers (acetaminophen/paracetamol)',
      'Nonsteroidal anti-inflammatory drugs (NSAIDs)',
      'Topical pain-relieving creams and gels',
      'Physical therapy and targeted exercises',
      'Weight loss for overweight individuals',
      'Assistive devices (canes, walkers, braces)',
      'Intra-articular corticosteroid injections',
      'Hyaluronic acid injections',
      'Joint replacement surgery for severe cases',
      'Osteotomy (surgical realignment of bones)',
      'Heat and cold therapy',
      'Complementary therapies like acupuncture',
      'Duloxetine for pain management'
    ],
    preventions: [
      'Maintaining a healthy weight',
      'Regular low-impact exercise',
      'Protecting joints during physical activities',
      'Avoiding repetitive stress on joints',
      'Building muscle strength around joints',
      'Using proper body mechanics',
      'Taking breaks during repetitive tasks',
      'Eating a balanced diet rich in anti-inflammatory foods',
      'Managing blood sugar levels',
      'Avoiding smoking and excessive alcohol consumption',
      'Early treatment of joint injuries'
    ],
    relatedConditions: [
      'rheumatoid-arthritis',
      'gout',
      'psoriatic-arthritis',
      'fibromyalgia',
      'lupus',
      'bursitis',
      'tendinitis',
      'obesity',
      'diabetes',
      'metabolic-syndrome'
    ],
    commonQuestions: [
      {
        question: 'Is osteoarthritis the same as rheumatoid arthritis?',
        answer: 'No, osteoarthritis and rheumatoid arthritis are two distinct conditions with different causes and characteristics. Osteoarthritis is primarily a degenerative joint disease caused by wear and tear on joint cartilage over time. It typically affects older adults and develops gradually. Rheumatoid arthritis, on the other hand, is an autoimmune disorder where the immune system mistakenly attacks the synovial membrane of joints, causing inflammation. Rheumatoid arthritis can occur at any age, often develops more rapidly, typically affects joints symmetrically (same joint on both sides of the body), and may involve systemic symptoms like fatigue and fever. While both conditions cause joint pain and stiffness, the underlying mechanisms, treatment approaches, and disease progression differ significantly.'
      },
      {
        question: 'Can osteoarthritis be reversed?',
        answer: 'Currently, there is no cure that can completely reverse the cartilage damage caused by osteoarthritis. However, the progression of the disease can be slowed, and symptoms can be effectively managed with appropriate treatment. Early intervention with lifestyle modifications (such as weight loss and exercise), physical therapy, and appropriate medications can help preserve joint function and reduce pain. Some emerging treatments, such as certain biologics and regenerative medicine approaches (stem cell therapy, platelet-rich plasma), are being studied for their potential to repair or regenerate damaged cartilage, but these are still experimental. For severe cases, surgical interventions like joint replacement can significantly improve quality of life by replacing damaged joint surfaces with artificial components.'
      },
      {
        question: 'What exercises are best for osteoarthritis?',
        answer: 'The best exercises for osteoarthritis are low-impact activities that strengthen muscles around affected joints without causing additional stress or pain. Water-based exercises like swimming or aquatic therapy are excellent options as they provide resistance while reducing weight-bearing stress on joints. Walking, cycling on a stationary bike, and elliptical training are also beneficial for lower body joints. Tai chi and gentle yoga can improve flexibility, balance, and joint function. Specific strengthening exercises targeting muscles around affected joints (such as quadriceps strengthening for knee osteoarthritis) are particularly important. Range-of-motion exercises help maintain joint flexibility. It\'s crucial to start slowly, increase intensity gradually, and work with a physical therapist to develop a personalized exercise program. Avoid high-impact activities like running or jumping, which can worsen joint damage and pain.'
      }
    ],
    emergencySigns: [
      'Sudden, severe increase in joint pain',
      'Joint that appears deformed',
      'Inability to move or bear weight on a joint',
      'Extreme swelling with warmth and redness',
      'Fever accompanying joint symptoms',
      'Severe joint pain following an injury',
      'Rapid deterioration in mobility or function'
    ],
    prevalence: 'Osteoarthritis affects over 32.5 million adults in the United States alone, making it the most common joint disorder worldwide. The prevalence increases with age, affecting approximately 13.9% of adults aged 25 and older and over 33.6% of those aged 65 and older. Women are more commonly affected than men, especially after age 50. Knee osteoarthritis is the most prevalent form, followed by hand and hip osteoarthritis. Globally, osteoarthritis is a leading cause of disability, with the burden expected to increase as populations age and obesity rates rise.',
    affectedGroups: [
      'Adults over 50 years of age',
      'Women (especially after menopause)',
      'People with previous joint injuries',
      'Individuals who are overweight or obese',
      'Those with a family history of osteoarthritis',
      'People with certain occupations involving repetitive joint stress',
      'Athletes with history of joint injuries',
      'Individuals with bone or joint abnormalities',
      'People with metabolic disorders like diabetes',
      'Individuals with inflammatory joint diseases'
    ],
    references: [
      {
        id: '1',
        text: 'Hunter DJ, Bierma-Zeinstra S. (2019). "Osteoarthritis". Lancet. 393 (10182): 1745-1759.',
        url: 'https://doi.org/10.1016/S0140-6736(19)30417-9'
      },
      {
        id: '2',
        text: 'Kolasinski SL, Neogi T, Hochberg MC, et al. (2020). "2019 American College of Rheumatology/Arthritis Foundation Guideline for the Management of Osteoarthritis of the Hand, Hip, and Knee". Arthritis Care & Research. 72 (2): 149-162.',
        url: 'https://doi.org/10.1002/acr.24131'
      },
      {
        id: '3',
        text: 'Martel-Pelletier J, Barr AJ, Cicuttini FM, et al. (2016). "Osteoarthritis". Nature Reviews Disease Primers. 2: 16072.',
        url: 'https://doi.org/10.1038/nrdp.2016.72'
      },
      {
        id: '4',
        text: 'Deveza LA, Loeser RF. (2018). "Is osteoarthritis one disease or a collection of many?". Rheumatology. 57 (suppl_4): iv34-iv42.',
        url: 'https://doi.org/10.1093/rheumatology/kex417'
      },
      {
        id: '5',
        text: 'Bannuru RR, Osani MC, Vaysbrot EE, et al. (2019). "OARSI guidelines for the non-surgical management of knee, hip, and polyarticular osteoarthritis". Osteoarthritis and Cartilage. 27 (11): 1578-1589.',
        url: 'https://doi.org/10.1016/j.joca.2019.06.011'
      }
    ]
  },
  {
    id: 'osteomyelitis',
    name: 'Osteomyelitis',
    description: 'Osteomyelitis is an infection and inflammation of bone tissue, which can develop from a variety of causes including bloodstream infections, nearby tissue infections, or direct bone contamination from injury or surgery.[1] The infection can be acute (developing rapidly with severe symptoms) or chronic (developing gradually with persistent symptoms).[2] Without proper treatment, osteomyelitis can lead to permanent bone damage, reduced mobility, and life-threatening complications.[3]',
    category: 'bone-and-joint',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Osteomyelitis',
    symptoms: [
      'Bone pain that worsens with movement',
      'Swelling, warmth, and redness over the affected area',
      'Fever and chills',
      'Fatigue or general discomfort',
      'Excessive sweating',
      'Limited range of motion in the affected limb',
      'Drainage from an open wound near the infection site',
      'Difficulty bearing weight on the affected limb',
      'Irritability in young children',
      'Back pain (in vertebral osteomyelitis)',
      'Stiffness or inability to move the affected bone or joint'
    ],
    causes: [
      'Bacterial infections (most commonly Staphylococcus aureus)',
      'Fungal infections (in immunocompromised individuals)',
      'Mycobacterial infections (such as tuberculosis)',
      'Open fractures or wounds exposing bone to the environment',
      'Surgical procedures involving bone',
      'Bloodstream infections that spread to bone (hematogenous)',
      'Spread of infection from nearby soft tissues',
      'Intravenous drug use',
      'Diabetes with foot ulcers',
      'Sickle cell disease',
      'Prosthetic joint infections',
      'Poor blood circulation',
      'Weakened immune system'
    ],
    treatments: [
      'Intravenous antibiotics for 4-6 weeks',
      'Oral antibiotics for milder cases or follow-up treatment',
      'Surgical debridement (removal of infected and dead tissue)',
      'Removal of foreign objects or hardware if present',
      'Drainage of abscesses',
      'Bone grafting for large defects',
      'Hyperbaric oxygen therapy for chronic cases',
      'Amputation in severe cases unresponsive to other treatments',
      'Pain management',
      'Stabilization of affected bones',
      'Wound care and dressing changes',
      'Physical therapy after acute phase has resolved'
    ],
    preventions: [
      'Prompt treatment of skin infections and wounds',
      'Proper wound care and cleaning',
      'Maintaining good hygiene',
      'Careful management of diabetes and proper foot care',
      'Avoiding intravenous drug use',
      'Proper pre- and post-operative care for orthopedic procedures',
      'Appropriate antibiotic prophylaxis for high-risk procedures',
      'Regular monitoring of chronic wounds',
      'Maintaining a strong immune system',
      'Prompt treatment of infections before they can spread to bone'
    ],
    relatedConditions: [
      'diabetic-foot-ulcers',
      'cellulitis',
      'septic-arthritis',
      'pressure-ulcers',
      'peripheral-vascular-disease',
      'sickle-cell-disease',
      'endocarditis',
      'tuberculosis',
      'fractures',
      'implant-associated-infections'
    ],
    commonQuestions: [
      {
        question: 'How is osteomyelitis diagnosed?',
        answer: 'Diagnosing osteomyelitis typically involves several steps. First, a healthcare provider will review the patient\'s medical history and perform a physical examination. Blood tests may show elevated white blood cell counts, C-reactive protein levels, and erythrocyte sedimentation rate, all indicating infection. Imaging studies are crucial and often begin with X-rays, though early infections may not be visible. More advanced imaging such as MRI provides detailed images of bone and surrounding soft tissues and is considered the most sensitive imaging method. CT scans and nuclear medicine bone scans may also be used, particularly when MRI is contraindicated. The definitive diagnosis often requires a bone biopsy, where a sample of bone tissue is collected and analyzed to identify the specific pathogen causing the infection. This helps determine the most effective antibiotic treatment.'
      },
      {
        question: 'What is the difference between acute and chronic osteomyelitis?',
        answer: 'Acute and chronic osteomyelitis differ in their onset, duration, and treatment approaches. Acute osteomyelitis develops rapidly, typically within two weeks of an injury or infection, with symptoms including sudden pain, fever, swelling, and redness. It responds well to antibiotics if treated promptly. Chronic osteomyelitis, on the other hand, develops slowly over months or years, often following inadequately treated acute infections. It\'s characterized by persistent bone infection, recurring symptoms, dead bone tissue (sequestrum), and the formation of new bone around the infection (involucrum). Chronic cases are much more difficult to treat, often requiring surgical intervention to remove infected and dead bone, followed by prolonged antibiotic therapy. Unlike acute cases, chronic osteomyelitis may never completely resolve and can lead to long-term complications.'
      },
      {
        question: 'Can osteomyelitis be completely cured?',
        answer: 'Whether osteomyelitis can be completely cured depends largely on several factors including the type (acute or chronic), the causative organism, the patient\'s overall health, and how quickly treatment begins. Acute osteomyelitis caught early and treated aggressively with appropriate antibiotics has a good chance of complete resolution. However, chronic osteomyelitis is more challenging to cure completely. Even with surgical debridement and prolonged antibiotic therapy, there\'s a risk of recurrence months or years later. Certain factors like compromised immunity, poor blood circulation, diabetes, or the presence of foreign materials (like implants) can make complete eradication more difficult. In some cases, especially severe chronic infections, the goal shifts from cure to management—controlling the infection and preventing its spread rather than eliminating it entirely. Regular follow-up is essential as recurrence rates can be significant.'
      }
    ],
    emergencySigns: [
      'High fever with severe bone pain',
      'Inability to move the affected limb',
      'Signs of sepsis (rapid heartbeat, confusion, low blood pressure)',
      'Spreading redness, warmth, and swelling',
      'Numbness or tingling below the infection site',
      'Sudden increase in pain or drainage from the site',
      'Loss of function in the affected area',
      'Development of neurological symptoms in spinal osteomyelitis'
    ],
    prevalence: 'Osteomyelitis affects approximately 2 to 5 people per 10,000 annually in developed countries, with higher rates in developing regions. The incidence increases with age, with elderly individuals having rates up to 9 per 10,000. In children, acute hematogenous osteomyelitis occurs in about 1 in 5,000 children under 13 years of age, particularly in males. The prevalence is significantly higher in populations with risk factors such as diabetes (15-fold increased risk), peripheral vascular disease, intravenous drug use, and in individuals with prosthetic joints (1-2% infection rate). Vertebral osteomyelitis accounts for about 2-7% of all cases of osteomyelitis.',
    affectedGroups: [
      'Children (especially boys under 5 years)',
      'Older adults (over 50 years)',
      'People with diabetes',
      'Individuals with compromised immune systems',
      'Intravenous drug users',
      'People with sickle cell disease',
      'Individuals with recent bone surgery or fractures',
      'Patients with prosthetic joints or implants',
      'People with poor circulation or peripheral vascular disease',
      'Individuals with chronic wounds or pressure ulcers'
    ],
    references: [
      {
        id: '1',
        text: 'Lew DP, Waldvogel FA. (2004). "Osteomyelitis". Lancet. 364 (9431): 369-379.',
        url: 'https://doi.org/10.1016/S0140-6736(04)16727-5'
      },
      {
        id: '2',
        text: 'Hatzenbuehler J, Pulling TJ. (2011). "Diagnosis and management of osteomyelitis". American Family Physician. 84 (9): 1027-1033.',
        url: 'https://www.aafp.org/pubs/afp/issues/2011/1101/p1027.html'
      },
      {
        id: '3',
        text: 'Schmitt SK. (2017). "Osteomyelitis". Infectious Disease Clinics of North America. 31 (2): 325-338.',
        url: 'https://doi.org/10.1016/j.idc.2017.01.010'
      },
      {
        id: '4',
        text: 'Kremers HM, Nwojo ME, Ransom JE, et al. (2015). "Trends in the epidemiology of osteomyelitis: a population-based study, 1969 to 2009". Journal of Bone and Joint Surgery. American Volume. 97 (10): 837-845.',
        url: 'https://doi.org/10.2106/JBJS.N.01350'
      },
      {
        id: '5',
        text: 'Lipsky BA, Berendt AR, Cornia PB, et al. (2012). "2012 Infectious Diseases Society of America clinical practice guideline for the diagnosis and treatment of diabetic foot infections". Clinical Infectious Diseases. 54 (12): e132-e173.',
        url: 'https://doi.org/10.1093/cid/cis346'
      }
    ]
  },
  {
    id: 'otitis-media',
    name: 'Otitis Media',
    description: 'Otitis media is inflammation or infection of the middle ear, commonly known as a middle ear infection.[1] It occurs when fluid builds up in the space behind the eardrum, causing pain and sometimes affecting hearing.[2] Otitis media is one of the most common childhood illnesses, though it can occur at any age.[3] There are several types including acute otitis media (AOM), otitis media with effusion (OME), and chronic suppurative otitis media (CSOM).',
    category: 'ear-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Otitis_media',
    symptoms: [
      'Ear pain (otalgia)',
      'Feeling of fullness in the ear',
      'Hearing difficulties',
      'Fluid drainage from the ear',
      'Fever',
      'Irritability in infants and young children',
      'Trouble sleeping',
      'Tugging or pulling at the ear (especially in children)',
      'Poor feeding in infants',
      'Balance problems',
      'Headache',
      'Nausea or vomiting'
    ],
    causes: [
      'Upper respiratory tract infections (colds, flu)',
      'Eustachian tube dysfunction',
      'Allergies',
      'Enlarged adenoids',
      'Tobacco smoke exposure',
      'Pacifier use',
      'Bottle feeding while lying down',
      'Genetic predisposition',
      'Day care attendance (increased exposure to infections)',
      'Seasonal factors (more common in fall and winter)',
      'Changes in altitude or air pressure'
    ],
    treatments: [
      'Pain relievers (acetaminophen, ibuprofen)',
      'Antibiotics for bacterial infections (amoxicillin is most common)',
      'Watchful waiting for mild cases in children over 6 months',
      'Ear drops for pain relief',
      'Tympanostomy tubes (ear tubes) for recurrent infections',
      'Adenoidectomy for recurrent cases related to enlarged adenoids',
      'Warm compresses to relieve pain',
      'Antihistamines or decongestants for cases related to allergies',
      'Nasal steroids for allergic causes',
      'Myringotomy (surgical incision in eardrum to drain fluid)'
    ],
    preventions: [
      'Breastfeeding infants for at least six months',
      'Avoiding tobacco smoke exposure',
      'Pneumococcal vaccination',
      'Annual influenza vaccination',
      'Frequent handwashing to prevent spread of germs',
      'Avoiding bottle feeding while infant is lying down',
      'Treating allergies promptly',
      'Limiting pacifier use in older infants and toddlers',
      'Xylitol gum or syrup in older children',
      'Avoiding crowded settings during cold and flu season'
    ],
    relatedConditions: [
      'sinusitis',
      'allergic-rhinitis',
      'adenoid-hypertrophy',
      'eustachian-tube-dysfunction',
      'hearing-loss',
      'mastoiditis',
      'cholesteatoma',
      'tympanic-membrane-perforation',
      'cleft-palate',
      'down-syndrome'
    ],
    commonQuestions: [
      {
        question: 'How can I tell if my child has an ear infection?',
        answer: 'Signs that your child might have an ear infection include tugging or pulling at the ears, increased irritability or crying, difficulty sleeping, fever, fluid draining from the ear, balance problems, and trouble hearing or responding to quiet sounds. In infants, you might notice increased fussiness, especially when lying down, and poor feeding. Since these symptoms can overlap with other conditions, it\'s important to consult a healthcare provider for an accurate diagnosis. The definitive way to diagnose an ear infection is through visual examination of the eardrum using an otoscope, which only a healthcare professional can perform properly.'
      },
      {
        question: 'Do ear infections always need antibiotics?',
        answer: 'No, not all ear infections require antibiotics. Many cases of otitis media, especially in children over 6 months with mild symptoms, resolve on their own within a few days. This approach, called "watchful waiting," is often recommended for non-severe cases. Pain relievers like acetaminophen or ibuprofen can help manage discomfort during this time. However, antibiotics are typically recommended for children under 6 months, those with severe symptoms, children under 2 years with infections in both ears, or when symptoms don\'t improve after 48-72 hours of watchful waiting. This selective use of antibiotics helps prevent antibiotic resistance while ensuring appropriate treatment for those who need it most.'
      },
      {
        question: 'When are ear tubes recommended for children with ear infections?',
        answer: 'Ear tubes (tympanostomy tubes) are typically recommended when a child experiences recurrent acute otitis media or persistent fluid in the middle ear (otitis media with effusion). Specific criteria often include three or more separate ear infections within six months, four or more infections in one year, fluid in the middle ear lasting more than three months with hearing loss, or when infections cause speech delays or balance problems. The tubes provide ventilation to the middle ear, allowing fluid to drain and equalizing pressure. This small surgical procedure is usually performed under brief general anesthesia and the tubes typically fall out on their own within 6-18 months. For children with recurrent infections, tubes can significantly reduce the frequency of episodes and the need for antibiotics.'
      }
    ],
    emergencySigns: [
      'Severe ear pain',
      'High fever (above 102°F or 39°C)',
      'Stiff neck',
      'Severe headache',
      'Lethargy or excessive sleepiness',
      'Persistent vomiting',
      'Swelling behind the ear',
      'Redness extending from the ear',
      'Facial weakness',
      'Sudden hearing loss'
    ],
    prevalence: 'Otitis media is extremely common, especially in children. By age 3, approximately 80% of children have experienced at least one episode of acute otitis media, and 40% have had six or more episodes. It is the most frequent diagnosis in sick children in the United States, accounting for approximately 30 million physician visits annually. The peak incidence occurs between 6 and 24 months of age. While less common in adults, otitis media can occur at any age, with an estimated prevalence of about 0.25% in the adult population.',
    affectedGroups: [
      'Children between 6 months and 2 years of age',
      'Children in daycare settings',
      'Children with cleft palate or other craniofacial abnormalities',
      'Individuals with Down syndrome',
      'Native American and Inuit populations',
      'Children exposed to tobacco smoke',
      'Bottle-fed infants (compared to breastfed)',
      'Children with immune deficiencies',
      'Individuals with allergic rhinitis',
      'Winter and fall season residents (seasonal variation)'
    ],
    references: [
      {
        id: '1',
        text: 'Lieberthal AS, Carroll AE, Chonmaitree T, et al. (2013). "The diagnosis and management of acute otitis media". Pediatrics. 131 (3): e964-e999.',
        url: 'https://doi.org/10.1542/peds.2012-3488'
      },
      {
        id: '2',
        text: 'Venekamp RP, Sanders SL, Glasziou PP, et al. (2015). "Antibiotics for acute otitis media in children". Cochrane Database of Systematic Reviews. (6): CD000219.',
        url: 'https://doi.org/10.1002/14651858.CD000219.pub4'
      },
      {
        id: '3',
        text: 'Rosenfeld RM, Shin JJ, Schwartz SR, et al. (2016). "Clinical Practice Guideline: Otitis Media with Effusion (Update)". Otolaryngology-Head and Neck Surgery. 154 (1 Suppl): S1-S41.',
        url: 'https://doi.org/10.1177/0194599815623467'
      },
      {
        id: '4',
        text: 'Schilder AG, Chonmaitree T, Cripps AW, et al. (2016). "Otitis media". Nature Reviews Disease Primers. 2: 16063.',
        url: 'https://doi.org/10.1038/nrdp.2016.63'
      },
      {
        id: '5',
        text: 'Kaur R, Morris M, Pichichero ME. (2017). "Epidemiology of Acute Otitis Media in the Postpneumococcal Conjugate Vaccine Era". Pediatrics. 140 (3): e20170181.',
        url: 'https://doi.org/10.1542/peds.2017-0181'
      }
    ]
  },
  {
    id: 'obsessive-compulsive-disorder',
    name: 'Obsessive-Compulsive Disorder (OCD)',
    description: 'A chronic mental health condition characterized by uncontrollable, recurring thoughts (obsessions) and behaviors (compulsions) that a person feels the urge to repeat over and over.[1] These obsessions and compulsions can significantly interfere with daily activities and cause substantial distress.[2] OCD isn\'t about habits like being organized or perfectionistic; it\'s a disorder that often involves intrusive thoughts and ritualistic behaviors performed to temporarily relieve severe anxiety.[3] While once classified as an anxiety disorder, OCD is now considered a unique condition with specific neurobiological foundations.[4] With appropriate treatment, many people with OCD can manage their symptoms and improve their quality of life.[5]',
    category: 'mental-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Obsessive–compulsive_disorder',
    symptoms: [
      'Obsessions (intrusive, unwanted thoughts, images, or urges that trigger distressing feelings)',
      'Compulsions (repetitive behaviors or mental acts that a person feels driven to perform)',
      'Excessive time spent on rituals (typically more than 1 hour daily)',
      'Significant distress or functional impairment',
      'Avoidance of situations that trigger obsessions',
      'Recognition that the obsessions/compulsions are excessive or unreasonable (though insight varies)',
      'Anxiety, disgust, or distress if unable to complete rituals',
      'Difficulty controlling thoughts or behaviors even when recognized as excessive',
      'Seeking reassurance from others',
      'Need for symmetry, exactness, or order',
      'Fear of contamination or illness',
      'Intrusive violent, sexual, or religious thoughts',
      'Excessive checking behaviors',
      'Mental rituals (counting, praying, repeating words)'
    ],
    causes: [
      'Biological factors:',
      'Abnormalities in certain brain regions (orbitofrontal cortex, anterior cingulate cortex, striatum)',
      'Imbalance in neurotransmitters (particularly serotonin)',
      'Genetic factors (increased risk if family members have OCD)',
      'Autoimmune reactions (in some cases, such as PANDAS/PANS)',
      'Environmental factors:',
      'Stressful or traumatic life events',
      'Childhood trauma or abuse',
      'Certain bacterial or viral infections (e.g., streptococcal infections)',
      'Learning and behavioral factors:',
      'Learned patterns of thought and behavior',
      'Negative reinforcement (temporary anxiety relief from performing compulsions)'
    ],
    treatments: [
      'Psychotherapy:',
      'Cognitive Behavioral Therapy (CBT)',
      'Exposure and Response Prevention (ERP) - gold standard psychotherapy for OCD',
      'Acceptance and Commitment Therapy (ACT)',
      'Medications:',
      'Selective Serotonin Reuptake Inhibitors (SSRIs) such as fluoxetine, sertraline, paroxetine',
      'Clomipramine (a tricyclic antidepressant)',
      'Augmentation strategies (antipsychotics, glutamate modulators)',
      'Other approaches:',
      'Deep Brain Stimulation (for severe, treatment-resistant cases)',
      'Transcranial Magnetic Stimulation (TMS)',
      'Support groups and family therapy',
      'Lifestyle modifications (stress management, regular exercise, adequate sleep)',
      'Mindfulness and meditation practices'
    ],
    preventions: [
      'No known prevention methods for OCD',
      'Early intervention when symptoms first appear',
      'Stress management techniques',
      'Maintaining treatment for symptom management and relapse prevention',
      'Family education to reduce accommodation of symptoms',
      'Healthy lifestyle (regular exercise, adequate sleep, balanced nutrition)',
      'Avoiding substance use that may exacerbate symptoms'
    ],
    relatedConditions: [
      'anxiety-disorders',
      'depression',
      'tic-disorders',
      'tourettes-syndrome',
      'body-dysmorphic-disorder',
      'hoarding-disorder',
      'trichotillomania',
      'excoriation-disorder',
      'autism-spectrum-disorders',
      'pandas-pans'
    ],
    commonQuestions: [
      {
        question: 'Is OCD just about being neat and organized?',
        answer: 'No, OCD is much more than a preference for organization or cleanliness. While some people with OCD may have compulsions related to order or cleanliness, the disorder is characterized by unwanted, intrusive thoughts (obsessions) that cause significant anxiety, followed by repetitive behaviors or mental acts (compulsions) performed to reduce that anxiety. These obsessions and compulsions are time-consuming, cause significant distress, and interfere with daily functioning. Many people with OCD have themes entirely unrelated to cleanliness or organization, such as fears of harming others, intrusive sexual or religious thoughts, or needs for symmetry. The difference between being detail-oriented or preferring organization and having OCD is the level of distress, the inability to control the thoughts/behaviors, and the significant negative impact on one\'s life.'
      },
      {
        question: 'Can children develop OCD?',
        answer: 'Yes, children can and do develop OCD. While the average age of onset is around 19-20 years, approximately one-third to one-half of adults with OCD report that their symptoms began in childhood or adolescence. Childhood-onset OCD may present somewhat differently than adult-onset OCD, with children less likely to recognize that their thoughts or behaviors are excessive or unreasonable. Children may also be less able to articulate their obsessions and may simply engage in compulsive behaviors that family members notice. Parents might observe rituals around bedtime, excessive concerns about harm coming to family members, or repeating behaviors until they "feel right." A subset of childhood OCD cases may be associated with streptococcal infections (PANDAS/PANS). Early identification and treatment are important, as childhood OCD can interfere with social development, academic performance, and family relationships. Effective treatments for children include specialized cognitive-behavioral therapy (particularly exposure and response prevention) and, in some cases, medication.'
      },
      {
        question: 'Does OCD get worse with age?',
        answer: 'OCD typically follows a chronic, waxing and waning course, meaning symptoms may fluctuate in intensity over time rather than steadily worsening with age. Without treatment, about 60-70% of people with OCD experience persistent or episodic symptoms throughout their lives. Symptoms often intensify during periods of stress, major life transitions, or trauma. However, the natural progression varies significantly between individuals. Some people experience relative stability of symptoms, others have periods of remission and relapse, and some may see gradual improvement over time. Early onset OCD (in childhood) may have a different course than adult-onset OCD. With appropriate treatment, including cognitive-behavioral therapy (particularly exposure and response prevention) and medication when indicated, many people with OCD experience significant symptom reduction and improved quality of life. Treatment outcomes are generally better with early intervention, though improvement is possible at any age. Some individuals find that while their core OCD themes remain the same throughout life, they develop better coping strategies and become less impaired by their symptoms as they age.'
      }
    ],
    emergencySigns: [
      'Suicidal thoughts or behaviors',
      'Self-harm',
      'Inability to perform basic self-care due to severe OCD symptoms',
      'Complete inability to function in daily life',
      'Psychotic symptoms (loss of touch with reality)',
      'Severe weight loss due to contamination fears interfering with eating',
      'Medical complications from excessive washing or other compulsions',
      'Severe depression with hopelessness'
    ],
    prevalence: 'OCD affects approximately 1.2% to 2.3% of the population worldwide. In the United States, about 2.3 million adults, or 1.2% of the population, have OCD in a given year. The lifetime prevalence is estimated at around 2-3%. OCD affects people of all genders, races, and ethnic backgrounds, though there are some differences in how symptoms may manifest across cultural contexts. The average age of onset is 19-20 years, but symptoms can appear in childhood, adolescence, or early adulthood. About one-third to one-half of adult cases begin in childhood.',
    affectedGroups: [
      'Adults and children of all genders, races, and ethnic backgrounds',
      'Slightly more common in childhood for males, but equal gender distribution in adulthood',
      'Typically begins in late adolescence or early adulthood',
      'Higher rates in first-degree relatives of people with OCD',
      'Individuals with history of trauma or significant life stress',
      'People with certain other mental health conditions (tic disorders, anxiety disorders)',
      'In some cases, children following streptococcal infections (PANDAS/PANS)'
    ],
    references: [
      {
        id: '1',
        text: 'American Psychiatric Association. (2013). "Diagnostic and Statistical Manual of Mental Disorders (5th ed.)". Arlington, VA: American Psychiatric Publishing.',
        url: 'https://doi.org/10.1176/appi.books.9780890425596'
      },
      {
        id: '2',
        text: 'Stein DJ, Costa DLC, Lochner C, et al. (2019). "Obsessive–compulsive disorder". Nature Reviews Disease Primers. 5 (1): 52.',
        url: 'https://doi.org/10.1038/s41572-019-0102-3'
      },
      {
        id: '3',
        text: 'Hirschtritt ME, Bloch MH, Mathews CA. (2017). "Obsessive-Compulsive Disorder: Advances in Diagnosis and Treatment". JAMA. 317 (13): 1358-1367.',
        url: 'https://doi.org/10.1001/jama.2017.2200'
      },
      {
        id: '4',
        text: 'Pittenger C, Bloch MH. (2014). "Pharmacological treatment of obsessive-compulsive disorder". Psychiatric Clinics of North America. 37 (3): 375-391.',
        url: 'https://doi.org/10.1016/j.psc.2014.05.006'
      },
      {
        id: '5',
        text: 'Fenske JN, Petersen K. (2015). "Obsessive-Compulsive Disorder: Diagnosis and Management". American Family Physician. 92 (10): 896-903.',
        url: 'https://www.aafp.org/pubs/afp/issues/2015/1115/p896.html'
      }
    ]
  },
  // ... existing code ... <multiple sclerosis, obesity, and osteoporosis conditions>
];

export default conditionsMtoO;
