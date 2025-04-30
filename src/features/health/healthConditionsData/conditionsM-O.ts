import { HealthCondition } from '../healthConditionsData';

/**
 * Health conditions starting with letters M-O
 */
export const conditionsMtoO: HealthCondition[] = [
  {
    id: 'malaria',
    name: 'Malaria',
    description: 'A life-threatening disease caused by Plasmodium parasites transmitted to humans through the bite of infected female Anopheles mosquitoes, characterized by cycles of fever, chills, and flu-like symptoms.',
    category: 'infectious-diseases',
    subcategory: 'parasitic-infections',
    symptoms: [
      'Fever and chills (often occurring in cycles)',
      'Headache',
      'Nausea and vomiting',
      'Muscle pain and fatigue',
      'Sweating',
      'Chest or abdominal pain',
      'Cough',
      'Rapid breathing',
      'Jaundice (in some cases)',
      'Confusion or seizures (in severe cases)'
    ],
    causes: [
      'Infection with Plasmodium parasites (P. falciparum, P. vivax, P. ovale, P. malariae, P. knowlesi)',
      'Transmitted through bites of infected female Anopheles mosquitoes',
      'Blood transfusion from infected donor (rare)',
      'Sharing needles or syringes (rare)',
      'Mother-to-child transmission during pregnancy or delivery (congenital malaria)'
    ],
    treatments: [
      'Artemisinin-based combination therapies (ACTs) for P. falciparum',
      'Chloroquine (for susceptible P. vivax, P. ovale, P. malariae)',
      'Primaquine or tafenoquine (to prevent relapses in P. vivax and P. ovale)',
      'Intravenous artesunate for severe malaria',
      'Supportive care (fluids, fever reduction, oxygen)',
      'Treatment of complications',
      'Monitoring for treatment response'
    ],
    preventions: [
      'Mosquito bite prevention (insect repellent, bed nets, protective clothing)',
      'Chemoprophylaxis for travelers to endemic areas',
      'Indoor residual spraying with insecticides',
      'Eliminating mosquito breeding sites',
      'Seasonal malaria chemoprevention for children in high-transmission areas',
      'RTS,S/AS01 malaria vaccine in select African countries',
      'Intermittent preventive treatment during pregnancy in endemic areas'
    ],
    relatedConditions: ['anemia', 'cerebral-malaria', 'blackwater-fever', 'tropical-splenomegaly', 'dengue-fever'],
    commonQuestions: [
      {
        question: 'Can malaria be completely cured?',
        answer: 'Most malaria cases can be completely cured with appropriate and prompt treatment. However, some Plasmodium species (P. vivax and P. ovale) can remain dormant in the liver and cause relapses months or years later if not treated with medications that target this liver stage. P. falciparum malaria, the most dangerous form, doesn\'t cause relapses but can lead to severe complications or death if not treated quickly and effectively.'
      },
      {
        question: 'How quickly do malaria symptoms appear after infection?',
        answer: 'The time between infection and the appearance of symptoms (incubation period) typically ranges from 7 to 30 days, depending on the Plasmodium species. P. falciparum usually causes symptoms within 10-15 days, while P. vivax and P. ovale may not cause symptoms for 2-4 weeks or longer. Some people may develop symptoms months after exposure, particularly with P. vivax and P. ovale, which can remain dormant in the liver.'
      }
    ],
    emergencySigns: [
      'Extreme lethargy or unconsciousness',
      'Seizures or convulsions',
      'Difficulty breathing',
      'Jaundice plus dark urine',
      'Persistent vomiting and inability to retain oral medications',
      'Severe paleness (anemia)',
      'Abnormal bleeding'
    ],
    prevalence: 'In 2021, there were an estimated 247 million cases of malaria worldwide, with approximately 619,000 deaths. About 95% of malaria cases and 96% of malaria deaths occur in the WHO African Region, with children under 5 accounting for about 80% of all malaria deaths in Africa.',
    affectedGroups: [
      'Children under 5 years of age',
      'Pregnant women',
      'People living in or traveling to endemic regions',
      'People with HIV/AIDS',
      'People without acquired immunity (travelers, migrants)',
      'Non-immune populations in areas with unstable transmission'
    ]
  },
  {
    id: 'marburg-virus-disease',
    name: 'Marburg Virus Disease',
    description: 'A rare but severe hemorrhagic fever caused by the Marburg virus, with high fatality rates, characterized by fever, bleeding, and organ damage.',
    category: 'infectious-diseases',
    subcategory: 'viral-hemorrhagic-fevers',
    symptoms: [
      'Sudden onset of high fever',
      'Severe headache',
      'Muscle aches and pains',
      'Severe malaise and fatigue',
      'Watery diarrhea, abdominal pain, nausea and vomiting',
      'Chest pain, sore throat',
      'Rash (around day 5)',
      'Bleeding from multiple sites (gums, nose, eyes, digestive tract)',
      'Jaundice',
      'Delirium, confusion, and eventual coma'
    ],
    causes: [
      'Infection with Marburg virus (in the filovirus family, related to Ebola)',
      'Transmission through direct contact with body fluids of infected people',
      'Contact with infected fruit bats or their secretions',
      'Handling infected non-human primates',
      'Exposure in caves or mines inhabited by fruit bats'
    ],
    treatments: [
      'No specific antiviral treatment approved',
      'Supportive care (rehydration, maintaining oxygen levels and blood pressure)',
      'Treatment of specific symptoms',
      'Management of complications',
      'Experimental treatments (monoclonal antibodies, antivirals)',
      'Isolation to prevent transmission',
      'Blood products for severe bleeding'
    ],
    preventions: [
      'Avoiding contact with infected individuals',
      'Proper handling of specimens and medical waste',
      'Safe burial practices',
      'Using personal protective equipment in healthcare settings',
      'Avoiding caves or mines in endemic areas',
      'Cooking bushmeat thoroughly',
      'Contact tracing and quarantine of exposed individuals'
    ],
    relatedConditions: ['ebola-virus-disease', 'lassa-fever', 'other-viral-hemorrhagic-fevers'],
    commonQuestions: [
      {
        question: 'How is Marburg virus disease different from Ebola?',
        answer: 'Marburg virus disease and Ebola virus disease are both caused by filoviruses and present with similar symptoms, including hemorrhagic fever. The primary differences are in the specific virus responsible, with Marburg having only one species while Ebola has several. Marburg was discovered in 1967, earlier than Ebola, during laboratory outbreaks in Germany and Yugoslavia. While both are highly lethal, they have different geographic distributions for natural outbreaks, though both primarily affect Africa.'
      },
      {
        question: 'How long after infection do Marburg symptoms appear?',
        answer: 'The incubation period for Marburg virus disease (time from infection to onset of symptoms) ranges from 2 to 21 days, with an average of 5-10 days. The disease begins abruptly with high fever, severe headache, and severe malaise. Within a few days, many patients develop severe gastrointestinal symptoms, followed by bleeding tendencies and often multiple organ failure. The initial symptoms can resemble other tropical infectious diseases like malaria or typhoid fever, making early diagnosis challenging.'
      }
    ],
    emergencySigns: [
      'Bleeding from multiple sites',
      'Signs of shock (rapid pulse, low blood pressure)',
      'Altered consciousness or confusion',
      'Severe dehydration',
      'Difficulty breathing',
      'Multiple organ failure'
    ],
    prevalence: 'Marburg virus disease is rare, with sporadic outbreaks primarily in Africa. The largest outbreak occurred in Angola in 2004-2005 with over 250 cases and a case-fatality rate of about 90%. Recent outbreaks have occurred in Uganda, Ghana, and Equatorial Guinea.',
    affectedGroups: [
      'People in or traveling to affected regions in Africa',
      'Miners and cave explorers in endemic areas',
      'Healthcare workers treating infected patients',
      'Family members caring for infected individuals',
      'People involved in traditional burial practices'
    ]
  },
  {
    id: 'mental-health-disorders',
    name: 'Mental Health Disorders',
    description: 'A broad category of conditions that affect mood, thinking, and behavior, ranging from anxiety and depression to more severe conditions such as schizophrenia and bipolar disorder.',
    category: 'mental-health',
    symptoms: [
      'Changes in mood (sadness, euphoria, irritability)',
      'Altered thinking patterns',
      'Unusual beliefs or perceptions',
      'Anxiety, fear, or worry',
      'Changes in energy levels or sleep patterns',
      'Difficulties with concentration or memory',
      'Changes in appetite or weight',
      'Social withdrawal',
      'Reduced ability to function in daily life',
      'Suicidal thoughts or behaviors'
    ],
    causes: [
      'Genetic predisposition',
      'Neurochemical imbalances',
      'Environmental stressors',
      'Trauma or adverse life experiences',
      'Developmental factors',
      'Substance use',
      'Medical conditions affecting brain function',
      'Social determinants (poverty, discrimination, isolation)',
      'Complex interaction of biological, psychological, and social factors'
    ],
    treatments: [
      'Psychotherapy (cognitive-behavioral therapy, interpersonal therapy, etc.)',
      'Medications (antidepressants, anxiolytics, antipsychotics, mood stabilizers)',
      'Lifestyle modifications (exercise, nutrition, sleep hygiene)',
      'Stress management techniques',
      'Social support enhancement',
      'Self-help and peer support groups',
      'Mindfulness and meditation practices',
      'Brain stimulation therapies (for treatment-resistant conditions)',
      'Integrated care approaches'
    ],
    preventions: [
      'Early intervention for mental health concerns',
      'Building resilience through coping skills',
      'Maintaining social connections',
      'Regular physical activity',
      'Healthy diet and adequate sleep',
      'Stress management',
      'Limiting alcohol and avoiding drugs',
      'Seeking help during difficult life transitions',
      'Public education to reduce stigma'
    ],
    relatedConditions: [
      'anxiety-disorders',
      'depression',
      'bipolar-disorder',
      'schizophrenia',
      'post-traumatic-stress-disorder',
      'obsessive-compulsive-disorder',
      'eating-disorders',
      'substance-use-disorders'
    ],
    commonQuestions: [
      {
        question: 'How common are mental health disorders?',
        answer: 'Mental health disorders are extremely common worldwide. According to the World Health Organization, approximately 1 in 8 people globally live with a mental disorder. Depression and anxiety are among the most prevalent, affecting hundreds of millions of people. Despite their prevalence, there remains a significant treatment gap in many countries, with many people not receiving the care they need due to lack of resources, stigma, or inadequate health systems.'
      },
      {
        question: 'Can mental health disorders be cured?',
        answer: 'While "cure" may not be the most accurate term for many mental health conditions, effective treatments exist that can significantly reduce symptoms and improve quality of life. Some people experience complete remission of symptoms, while others learn to manage their condition effectively over time. Many mental health disorders follow a fluctuating course with periods of remission and recurrence. The most effective approaches often combine multiple treatment modalities tailored to individual needs, emphasizing recovery and improved functioning rather than focusing solely on eliminating all symptoms.'
      },
      {
        question: 'What\'s the relationship between physical and mental health?',
        answer: 'Physical and mental health are deeply interconnected. Physical health problems can increase the risk of developing mental health issues, and mental health disorders can negatively impact physical health. For example, depression increases the risk of heart disease, diabetes, and stroke, while chronic physical conditions often lead to depression or anxiety. Furthermore, lifestyle factors like exercise, diet, and sleep affect both physical and mental well-being. This bidirectional relationship highlights the importance of integrated healthcare approaches that address both aspects of health simultaneously.'
      }
    ],
    emergencySigns: [
      'Suicidal thoughts, plans, or behaviors',
      'Severe inability to care for basic needs',
      'Psychosis (hallucinations or delusions)',
      'Extreme mood changes affecting safety',
      'Severe confusion or disorientation',
      'Aggressive behavior threatening self or others'
    ],
    prevalence: 'Mental health disorders affect nearly 1 billion people worldwide. Depression affects approximately 280 million people, anxiety disorders affect 301 million, bipolar disorder affects 40 million, and schizophrenia affects 24 million people globally.',
    affectedGroups: [
      'Adolescents and young adults (many disorders emerge during this period)',
      'Older adults (at risk for depression, cognitive disorders)',
      'People experiencing poverty or socioeconomic disadvantage',
      'Those with history of trauma or adverse childhood experiences',
      'People with chronic physical health conditions',
      'Those with family history of mental health disorders',
      'Marginalized populations facing discrimination or social exclusion'
    ]
  },
  {
    id: 'meningitis',
    name: 'Meningitis',
    description: 'Inflammation of the protective membranes covering the brain and spinal cord (meninges), usually caused by infection with viruses, bacteria, or fungi, and potentially life-threatening.',
    category: 'infectious-diseases',
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
    ]
  },
  {
    id: 'onchocerciasis',
    name: 'Onchocerciasis (River Blindness)',
    description: 'A parasitic disease caused by the filarial worm Onchocerca volvulus, transmitted by blackfly bites, leading to severe skin disease and potentially permanent blindness if untreated.',
    category: 'infectious-diseases',
    subcategory: 'parasitic-infections',
    symptoms: [
      'Intense itching',
      'Skin rashes, lesions, and discoloration',
      'Subcutaneous nodules where adult worms reside',
      'Visual impairment progressing to blindness',
      'Red, watery eyes',
      'Light sensitivity',
      'Eye pain or inflammation',
      'Skin thickening and loss of elasticity',
      'Hanging groin (lymphatic damage causing genital swelling)',
      'Weight loss and general debilitation in severe cases'
    ],
    causes: [
      'Infection with the parasitic worm Onchocerca volvulus',
      'Transmission through bites of infected blackflies (Simulium species)',
      'Blackflies breed in fast-flowing rivers and streams (hence "river blindness")',
      'Adult worms live in nodules and release microfilariae that migrate through skin and eyes',
      'Inflammatory response to dead microfilariae causes most symptoms'
    ],
    treatments: [
      'Ivermectin (destroys microfilariae and temporarily sterilizes adult worms)',
      'Mass drug administration programs in endemic communities',
      'Doxycycline (targets Wolbachia bacteria in the worms, killing adult worms)',
      'Surgical removal of subcutaneous nodules (limited effectiveness)',
      'Pain management and anti-inflammatory medications for symptom relief',
      'Eye care for those with ocular complications'
    ],
    preventions: [
      'Regular ivermectin treatment in endemic areas (preventive chemotherapy)',
      'Vector control through insecticide spraying',
      'Personal protection against blackfly bites (protective clothing, repellents)',
      'Environmental measures to reduce blackfly breeding sites',
      'Community-directed treatment programs',
      'Health education about the disease and prevention methods'
    ],
    relatedConditions: ['lymphatic-filariasis', 'loiasis', 'dermatitis', 'keratitis', 'uveitis'],
    commonQuestions: [
      {
        question: 'Is onchocerciasis curable?',
        answer: 'Onchocerciasis is not completely curable with a single treatment. Ivermectin, the main medication used, kills the microfilariae (immature worms) but not the adult worms. Regular treatment with ivermectin (usually annually or bi-annually for 10-15 years, which is the lifespan of adult worms) can effectively control the disease by suppressing microfilariae production. More recently, doxycycline has shown promise in killing adult worms by targeting symbiotic bacteria they need to survive, but this requires daily treatment for 4-6 weeks and is not widely used in mass treatment programs.'
      },
      {
        question: 'Can vision loss from onchocerciasis be reversed?',
        answer: 'Unfortunately, vision loss that has already occurred due to onchocerciasis generally cannot be reversed. Treatment with ivermectin can prevent further damage by eliminating microfilariae, but cannot repair damage to the optic nerve or restore vision that has been lost. This is why prevention and early treatment are crucial. Visual impairment in early stages might improve with treatment, but blindness resulting from advanced disease is usually permanent.'
      }
    ],
    prevalence: 'Approximately 21 million people are infected with onchocerciasis worldwide, with over 99% of cases occurring in Africa. About 1 million people have experienced vision loss due to the disease. Thanks to control efforts, onchocerciasis has been eliminated in several countries in the Americas and transmission has been interrupted in some African countries.',
    affectedGroups: [
      'People living near fast-flowing rivers and streams in endemic areas',
      'Agricultural workers and farmers in endemic regions',
      'Rural communities with limited access to healthcare',
      'Adults (symptoms typically develop years after repeated exposure)',
      'Communities in sub-Saharan Africa (over 99% of cases)',
      'Previously, communities in parts of Latin America (now largely eliminated)'
    ]
  },
  {
    id: 'migraine',
    name: 'Migraine',
    description: 'A neurological condition characterized by recurrent, severe headaches often accompanied by other symptoms such as nausea, vomiting, and sensitivity to light and sound.',
    category: 'brain-and-nerves',
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
    prevalence: 'Migraines affect approximately 12% of the global population. In the United States, about 39 million people experience migraines.',
    affectedGroups: [
      'Women (three times more likely than men)',
      'People between ages 15-55',
      'Those with family history of migraines',
      'People with other neurological conditions',
      'Those with certain psychiatric conditions like depression and anxiety'
    ]
  },
  // ... existing code ... <multiple sclerosis, obesity, and osteoporosis conditions>
];

export default conditionsMtoO;
