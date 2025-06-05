import { HealthCondition } from '../healthConditionsData';

/**
 * Additional common health conditions
 * These are frequently searched conditions on health information pages
 */
export const additionalConditions: HealthCondition[] = [
  {
    id: 'chickenpox',
    name: 'Chickenpox',
    description: 'A common, highly contagious viral infection that causes an itchy, blister-like rash on the skin, mainly affecting children but can occur at any age.',
    category: 'infectious-diseases',
    subcategory: 'viral-infections',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Chickenpox',
    causes: [
      'Varicella-zoster virus (VZV)',
      'Direct contact with infected person',
      'Airborne transmission through coughing or sneezing',
      'Contact with fluid from chickenpox blisters'
    ],
    relatedConditions: [
      'shingles',
      'pneumonia',
      'encephalitis',
      'bacterial skin infections'
    ],
    symptoms: [
      'Itchy, fluid-filled blisters',
      'Red spots that appear in waves over several days',
      'Fever',
      'Fatigue',
      'Headache',
      'Loss of appetite',
      'Mild abdominal pain'
    ],
    treatments: [
      'Calamine lotion to reduce itching',
      'Acetaminophen (paracetamol) to reduce fever',
      'Cool baths with baking soda or colloidal oatmeal',
      'Antihistamines for severe itching',
      'Antiviral medications for high-risk patients',
      'Plenty of fluids and rest'
    ],
    preventions: [
      'Vaccination (highly effective)',
      'Avoiding contact with infected individuals',
      'Isolation of infected persons until blisters have crusted over'
    ],
    whenToSeekHelp: [
      'High fever (over 102°F/38.9°C)',
      'Difficulty breathing or persistent cough',
      'Severe headache',
      'Drowsiness or confusion',
      'Stiff neck',
      'Frequent vomiting',
      'Rash becomes very red, warm, or tender (signs of secondary bacterial infection)'
    ],
    commonQuestions: [
      {
        question: 'How long is chickenpox contagious?',
        answer: 'Chickenpox is contagious from 1-2 days before the rash appears until all blisters have formed scabs, typically 5-7 days after the rash first appears. People with chickenpox should avoid contact with others, especially pregnant women, newborns, and those with weakened immune systems, until all blisters have crusted over.'
      },
      {
        question: 'Can you get chickenpox more than once?',
        answer: 'It\'s rare to get chickenpox more than once. After recovery, most people have lifelong immunity. However, the virus remains dormant in nerve tissue and can reactivate later in life as shingles, particularly during periods of stress or immune system weakness. The chickenpox vaccine significantly reduces the risk of both chickenpox and later development of shingles.'
      },
      {
        question: 'Is chickenpox dangerous for adults?',
        answer: 'Yes, chickenpox tends to be more severe in adults than in children. Adults are at higher risk for complications such as pneumonia, encephalitis (brain inflammation), and bacterial infections of the skin. Pregnant women, people with weakened immune systems, and newborns are at particularly high risk for serious complications. Adults who haven\'t had chickenpox should consider vaccination.'
      }
    ],
    emergencySigns: [
      'Difficulty breathing or rapid breathing',
      'Severe headache with stiff neck',
      'High fever that doesn\'t respond to medication',
      'Frequent vomiting or signs of dehydration',
      'Extreme drowsiness or confusion',
      'Severe abdominal pain',
      'Bleeding into the skin (tiny purple or red spots)'
    ],
    prevalence: 'Before widespread vaccination, chickenpox affected about 4 million people annually in the United States alone, with over 90% of cases occurring in children under 15. Vaccination programs have reduced incidence by approximately 90% in many countries.'
  },
  {
    id: 'dementia',
    name: 'Dementia',
    description: 'A syndrome characterized by progressive deterioration of cognitive function, affecting memory, thinking, behavior, and the ability to perform everyday activities.',
    category: 'brain-and-nerves',
    subcategory: 'cognitive-disorders',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Dementia',
    causes: [
      'Alzheimer\'s disease (most common cause)',
      'Vascular damage (vascular dementia)',
      'Lewy body deposits',
      'Frontotemporal lobar degeneration',
      'Traumatic brain injury',
      'Certain infections and immune disorders',
      'Toxic and metabolic abnormalities',
      'Certain medications'
    ],
    relatedConditions: [
      'alzheimers-disease',
      'parkinsons-disease',
      'stroke',
      'depression',
      'huntingtons-disease'
    ],
    symptoms: [
      'Memory loss, particularly of recent events',
      'Difficulty with communication and language',
      'Reduced ability to focus and pay attention',
      'Decreased problem-solving and reasoning skills',
      'Confusion and disorientation',
      'Changes in mood and personality',
      'Difficulty with coordination and motor functions',
      'Paranoia, agitation, or hallucinations (in some cases)'
    ],
    treatments: [
      'Medications to temporarily improve symptoms or slow progression (cholinesterase inhibitors, memantine)',
      'Medications to manage behavioral symptoms',
      'Cognitive stimulation therapy',
      'Occupational therapy to develop coping strategies',
      'Environmental modifications for safety',
      'Support services for patients and caregivers',
      'Treatment of underlying conditions that may contribute to cognitive symptoms'
    ],
    preventions: [
      'Regular physical exercise',
      'Maintaining social connections',
      'Mental stimulation and cognitive activities',
      'Healthy diet (such as Mediterranean diet)',
      'Managing cardiovascular risk factors (high blood pressure, diabetes, high cholesterol)',
      'Not smoking and limiting alcohol consumption',
      'Getting adequate sleep',
      'Protecting against head injuries'
    ],
    whenToSeekHelp: [
      'Noticeable memory problems that interfere with daily activities',
      'Difficulty performing familiar tasks',
      'Problems with language or communication',
      'Disorientation to time or place',
      'Poor or decreased judgment',
      'Significant personality changes',
      'Withdrawal from work or social activities'
    ],
    commonQuestions: [
      {
        question: 'Is dementia the same as Alzheimer\'s disease?',
        answer: 'No, dementia is an umbrella term for symptoms affecting memory, thinking, and social abilities severely enough to interfere with daily functioning. Alzheimer\'s disease is the most common cause of dementia, accounting for 60-80% of cases. Other causes include vascular dementia, Lewy body dementia, frontotemporal dementia, and mixed dementia (combination of types).'
      },
      {
        question: 'Is dementia hereditary?',
        answer: 'Genetics can play a role in some forms of dementia, but the degree of heritability varies by type. Early-onset Alzheimer\'s disease often has a strong genetic component. For most common forms of late-onset dementia, genetics is just one of many risk factors, along with age, lifestyle, and environmental factors. Having a family history increases risk but doesn\'t mean dementia is inevitable.'
      },
      {
        question: 'Can dementia be cured?',
        answer: 'Most types of dementia, including Alzheimer\'s disease, cannot be cured with current medical treatments. However, some causes of cognitive decline are reversible, such as those due to vitamin deficiencies, medication side effects, thyroid problems, or depression. For progressive dementias, treatments focus on managing symptoms, maintaining quality of life, and slowing disease progression. Research continues on potential disease-modifying treatments.'
      }
    ],
    emergencySigns: [
      'Sudden confusion or disorientation (significantly worse than usual)',
      'Severe, sudden-onset headache',
      'Falls or loss of consciousness',
      'Seizures',
      'Inability to move part of the body (possible stroke)',
      'Extremely agitated, aggressive, or unsafe behavior'
    ],
    prevalence: 'Dementia affects approximately 55 million people worldwide, with nearly 10 million new cases each year. The prevalence doubles with every 5-year increase in age after 65, affecting about 1 in 14 people over 65 and 1 in 6 over 80.'
  },
  {
    id: 'gerd',
    name: 'GERD (Gastroesophageal Reflux Disease)',
    description: 'A chronic digestive disorder where stomach acid and sometimes stomach content flows back up into the esophagus, irritating the esophageal lining.',
    category: 'digestive-health',
    subcategory: 'stomach-disorders',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Gastroesophageal_reflux_disease',
    causes: [
      'Weakened lower esophageal sphincter (LES)',
      'Hiatal hernia',
      'Obesity or overweight',
      'Pregnancy',
      'Delayed stomach emptying',
      'Certain foods and beverages (spicy, fatty, acidic)',
      'Smoking',
      'Certain medications'
    ],
    relatedConditions: [
      'hiatal-hernia',
      'barretts-esophagus',
      'esophagitis',
      'asthma',
      'chronic-cough'
    ],
    symptoms: [
      'Heartburn (burning sensation in chest)',
      'Regurgitation of food or sour liquid',
      'Difficulty swallowing (dysphagia)',
      'Feeling of a lump in the throat',
      'Chronic cough',
      'Laryngitis or hoarseness',
      'Disrupted sleep',
      'New or worsening asthma',
      'Chest pain (which may be confused with heart-related pain)'
    ],
    treatments: [
      'Lifestyle and dietary changes',
      'Over-the-counter antacids',
      'H-2-receptor blockers (reduce acid production)',
      'Proton pump inhibitors (block acid production)',
      'Prokinetics (strengthen lower esophageal sphincter)',
      'Baclofen (reduces relaxation of lower esophageal sphincter)',
      'Surgical options for severe cases (fundoplication, LINX device)'
    ],
    preventions: [
      'Maintain healthy weight',
      'Avoid trigger foods (spicy, fatty, acidic foods, chocolate, caffeine)',
      'Eat smaller meals',
      'Don\'t lie down after eating (wait 3 hours)',
      'Elevate head of bed 6-8 inches',
      'Quit smoking',
      'Limit alcohol consumption',
      'Avoid tight-fitting clothes'
    ],
    whenToSeekHelp: [
      'Heartburn more than twice a week',
      'Persistent heartburn despite over-the-counter medications',
      'Difficulty swallowing',
      'Persistent nausea or vomiting',
      'Weight loss due to poor appetite or difficulty eating',
      'Signs of bleeding (black stools, vomiting blood)'
    ],
    commonQuestions: [
      {
        question: 'Can GERD lead to more serious conditions?',
        answer: 'Yes, untreated or poorly managed GERD can lead to complications including esophagitis (inflammation of the esophagus), esophageal stricture (narrowing due to scar tissue), Barrett\'s esophagus (precancerous changes to esophageal lining), and in rare cases, esophageal cancer. Regular monitoring and proper treatment can help prevent these complications.'
      },
      {
        question: 'Is GERD a lifelong condition?',
        answer: 'GERD is often a chronic condition that requires ongoing management, but its severity can fluctuate over time. Some people may experience periods of remission with few or no symptoms. With appropriate lifestyle changes, medication, and in some cases surgery, many people can effectively control their symptoms and prevent complications. However, complete "cure" is uncommon without surgical intervention.'
      },
      {
        question: 'How can I tell if chest pain is from GERD or a heart attack?',
        answer: 'This can be difficult as symptoms sometimes overlap. GERD-related chest pain typically occurs after eating, when lying down, or at night, and often improves with antacids. It may be burning in nature and can radiate to the neck or throat. Heart attack pain more often feels like pressure or squeezing, may radiate to the jaw, shoulder, or arm, and is frequently accompanied by shortness of breath, sweating, nausea, or lightheadedness. If you\'re unsure about the cause of chest pain, especially if it\'s new or severe, seek emergency medical attention immediately.'
      }
    ],
    emergencySigns: [
      'Severe chest pain, especially if radiating to jaw, neck, or arm',
      'Shortness of breath along with chest discomfort',
      'Vomiting blood or material that looks like coffee grounds',
      'Black, tarry stools',
      'Severe, persistent abdominal pain',
      'Choking sensation or inability to breathe'
    ],
    prevalence: 'GERD affects approximately 20% of adults in Western populations, with 7% experiencing daily symptoms. It\'s slightly more common in men than women and prevalence increases with age and obesity.'
  },
  {
    id: 'hay-fever',
    name: 'Hay Fever (Allergic Rhinitis)',
    description: 'An allergic reaction to airborne substances such as pollen, which causes inflammation of the nose and affects the sinuses, eyes, and throat.',
    category: 'immune-system',
    subcategory: 'allergies',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Allergic_rhinitis',
    causes: [
      'Pollen from trees, grasses, and weeds',
      'Dust mites',
      'Animal dander',
      'Mold spores',
      'Genetic predisposition to allergies',
      'Environmental pollutants'
    ],
    relatedConditions: [
      'asthma',
      'eczema',
      'sinusitis',
      'conjunctivitis',
      'food-allergies'
    ],
    symptoms: [
      'Runny or stuffy nose',
      'Sneezing',
      'Itchy or watery eyes',
      'Itchy throat, mouth, nose, and ears',
      'Postnasal drip',
      'Cough',
      'Fatigue',
      'Facial pressure and pain',
      'Decreased sense of smell or taste',
      'Dark circles under the eyes ("allergic shiners")'
    ],
    treatments: [
      'Antihistamines (oral or nasal)',
      'Corticosteroid nasal sprays',
      'Decongestants (short-term use)',
      'Leukotriene modifiers',
      'Nasal irrigation (saline rinses)',
      'Allergen immunotherapy (allergy shots)',
      'Sublingual immunotherapy tablets',
      'Cromolyn sodium nasal spray'
    ],
    preventions: [
      'Identify and avoid triggers',
      'Keep windows closed during high pollen seasons',
      'Use air purifiers with HEPA filters',
      'Shower and change clothes after being outdoors',
      'Wear sunglasses outdoors to protect eyes',
      'Check pollen forecasts and plan outdoor activities accordingly',
      'Regular cleaning to reduce indoor allergens',
      'Consider allergen-proof bedding'
    ],
    whenToSeekHelp: [
      'Symptoms significantly affecting quality of life',
      'Symptoms not controlled with over-the-counter medications',
      'Symptoms leading to complications like sinusitis or ear infections',
      'Asthma symptoms occurring alongside hay fever',
      'Uncertainty about whether symptoms are due to allergies or something else'
    ],
    commonQuestions: [
      {
        question: 'What\'s the difference between seasonal and perennial allergic rhinitis?',
        answer: 'Seasonal allergic rhinitis (commonly called hay fever) occurs at specific times of the year when certain plants pollinate, typically spring (tree pollen), summer (grass pollen), or fall (weed pollen). Perennial allergic rhinitis causes year-round symptoms and is usually triggered by indoor allergens like dust mites, pet dander, or mold. Some people experience both types, with perennial symptoms that worsen during specific pollen seasons.'
      },
      {
        question: 'Can hay fever develop later in life?',
        answer: 'Yes, allergic rhinitis can develop at any age, even in adults who have never had allergies before. Factors that may contribute to developing hay fever later in life include moving to a new environment with different allergens, changes in immune system function, increased pollution, or changes in lifestyle that lead to greater allergen exposure. The severity of symptoms can also change throughout life, sometimes improving and other times worsening.'
      },
      {
        question: 'Is hay fever linked to other conditions?',
        answer: 'Yes, hay fever is often associated with other allergic conditions in what\'s known as the "allergic march" or "atopic march." People with hay fever commonly have or develop asthma, eczema (atopic dermatitis), or food allergies. Hay fever can also increase the risk of developing sinusitis, middle ear infections, and sleep disturbances. Proper management of allergic rhinitis may help reduce the risk or severity of these related conditions.'
      }
    ],
    prevalence: 'Allergic rhinitis affects approximately 10-30% of adults and up to 40% of children worldwide. Its prevalence has been increasing in recent decades, particularly in urban areas and industrialized countries.',
    affectedGroups: [
      'People with family history of allergies or asthma',
      'Children and young adults (though can affect any age)',
      'People living in urban areas or polluted environments',
      'Those with other allergic conditions like asthma or eczema',
      'Individuals with occupational exposure to allergens'
    ]
  },
  {
    id: 'sciatica',
    name: 'Sciatica',
    description: 'Pain that radiates along the path of the sciatic nerve, which runs from the lower back through the hips and buttocks and down each leg.',
    category: 'bone-and-joint',
    subcategory: 'back-problems',
    causes: [
      'Herniated or slipped disk',
      'Bone spurs on the spine',
      'Spinal stenosis (narrowing of the spine)',
      'Piriformis syndrome (compression by the piriformis muscle)',
      'Trauma or injury to the spine',
      'Pregnancy and childbirth',
      'Tumors (rarely)'
    ],
    relatedConditions: [
      'herniated-disc',
      'spinal-stenosis',
      'degenerative-disc-disease',
      'spondylolisthesis',
      'piriformis-syndrome'
    ],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Sciatica',
    symptoms: [
      'Pain radiating from lower back to buttock and down the back of the leg',
      'Pain ranging from mild ache to sharp, burning sensation or excruciating discomfort',
      'Pain that worsens with movement, coughing, or sneezing',
      'Numbness, tingling, or muscle weakness in the affected leg or foot',
      'Electric shock-like sensations down the leg',
      'Pain in one side (typically)',
      'Difficulty moving the leg or foot'
    ],
    treatments: [
      'Self-care measures (rest, ice/heat therapy)',
      'Over-the-counter pain relievers (NSAIDs)',
      'Prescription medications (muscle relaxants, anti-inflammatories, nerve pain medications)',
      'Physical therapy and stretching exercises',
      'Steroid injections',
      'Alternative therapies (acupuncture, chiropractic care, massage)',
      'Surgery for severe or persistent cases'
    ],
    preventions: [
      'Maintain good posture',
      'Use proper body mechanics when lifting',
      'Stay physically active with low-impact exercises',
      'Maintain healthy weight',
      'Core-strengthening exercises',
      'Regular stretching, especially of hamstrings',
      'Ergonomic work station setup',
      'Avoid prolonged sitting'
    ],
    whenToSeekHelp: [
      'Pain lasting longer than a week',
      'Severe pain that interferes with daily activities',
      'Pain following a violent injury, like a traffic accident',
      'Difficulty controlling bowels or bladder',
      'Progressive weakness in the leg',
      'Loss of sensation in the affected leg or groin area'
    ],
    commonQuestions: [
      {
        question: 'How long does sciatica usually last?',
        answer: 'Acute sciatica episodes typically last between 1-6 weeks. Most people (about 80-90%) recover within this timeframe with conservative treatment. However, some may experience chronic sciatica lasting months or recurring periodically. The duration depends on the underlying cause, severity, treatment approach, and individual factors. Even after pain resolves, preventive measures are important to reduce the risk of recurrence.'
      },
      {
        question: 'What causes sciatica?',
        answer: 'Sciatica most commonly results from a herniated disk, bone spur on the spine, or spinal stenosis (narrowing of the spine) compressing part of the sciatic nerve. Less common causes include piriformis syndrome (when the piriformis muscle in the buttock irritates the sciatic nerve), trauma, tumors, infection, or pregnancy. Risk factors include age (most common between 30-50), obesity, occupations requiring heavy lifting or prolonged sitting, and diabetes.'
      },
      {
        question: 'When is surgery necessary for sciatica?',
        answer: 'Surgery is typically considered for sciatica when: 1) Conservative treatments have failed after 6-12 weeks, 2) Pain is severe and debilitating, 3) There is progressive neurological deficit (increasing weakness, numbness), or 4) There are signs of cauda equina syndrome (loss of bladder/bowel control, saddle anesthesia), which is a medical emergency. The type of surgery depends on the underlying cause, with options including microdiscectomy, laminectomy, or spinal fusion.'
      }
    ],
    emergencySigns: [
      'Sudden, severe pain in the low back or leg',
      'Numbness or muscle weakness in both legs',
      'Numbness or tingling in the groin or genital area',
      'Loss of bladder or bowel control',
      'Difficulty walking or standing',
      'Pain following a violent injury',
      'Fever accompanying back pain'
    ],
    prevalence: 'Sciatica affects approximately 10-40% of people at some point in their lives, with an annual incidence of 1-5%. It is most common in people between 30-50 years of age.'
  }
];

export default additionalConditions;
