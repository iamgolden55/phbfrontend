import { HealthCondition } from '../healthConditionsData';

/**
 * Popular health conditions frequently searched on health websites
 * These are among the most viewed health conditions
 */
export const popularConditions: HealthCondition[] = [
  {
    id: 'covid-19',
    name: 'COVID-19',
    description: 'A respiratory illness caused by the SARS-CoV-2 virus, ranging from mild symptoms to severe illness and potentially long-term health effects.',
    category: 'infectious-diseases',
    subcategory: 'respiratory-infections',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/COVID-19',
    causes: [
      'Infection with the SARS-CoV-2 virus',
      'Close contact with infected individuals',
      'Airborne transmission through respiratory droplets',
      'Contact with contaminated surfaces (less common)'
    ],
    symptoms: [
      'Fever or chills',
      'Cough',
      'Shortness of breath',
      'Fatigue',
      'Muscle or body aches',
      'Headache',
      'New loss of taste or smell',
      'Sore throat',
      'Congestion or runny nose',
      'Nausea or vomiting',
      'Diarrhea'
    ],
    treatments: [
      'Rest and fluids',
      'Over-the-counter fever reducers',
      'Antiviral medications for high-risk patients',
      'Oxygen therapy for severe cases',
      'Monoclonal antibody treatment for eligible patients'
    ],
    preventions: [
      'Vaccination',
      'Proper hand hygiene',
      'Wearing masks in crowded settings',
      'Physical distancing when appropriate',
      'Improving ventilation in indoor spaces',
      'Staying home when sick'
    ],
    whenToSeekHelp: [
      'Trouble breathing',
      'Persistent chest pain or pressure',
      'New confusion',
      'Inability to wake or stay awake',
      'Pale, gray, or blue-colored skin, lips, or nail beds'
    ],
    commonQuestions: [
      {
        question: 'How long does COVID-19 last?',
        answer: 'Most people with mild cases recover within 1-2 weeks. Some people experience lingering symptoms for weeks or months (Long COVID). Recovery time for severe cases requiring hospitalization can be several weeks to months.'
      },
      {
        question: 'Can you get COVID-19 more than once?',
        answer: 'Yes, reinfection is possible. While having COVID-19 provides some natural immunity, this protection decreases over time and may be less effective against new variants. Vaccination remains recommended even for those who have had COVID-19.'
      },
      {
        question: 'What is Long COVID?',
        answer: 'Long COVID refers to a range of symptoms that can last weeks or months after first being infected with the virus that causes COVID-19 or can appear weeks after infection. Long COVID can happen to anyone who has had COVID-19, even if their illness was mild, or if they had no initial symptoms. Common symptoms include fatigue, difficulty thinking or concentrating ("brain fog"), headache, loss of smell or taste, dizziness, heart palpitations, chest pain, shortness of breath, cough, joint or muscle pain, depression or anxiety, fever, and symptoms that get worse after physical or mental activities.'
      }
    ],
    prevalence: 'COVID-19 has affected hundreds of millions of people globally since its emergence in late 2019, with millions of deaths worldwide.',
    affectedGroups: [
      'People of all ages, though risk of severe illness increases with age',
      'Individuals with underlying medical conditions',
      'People with weakened immune systems',
      'Pregnant women',
      'Unvaccinated individuals'
    ]
  },
  {
    id: 'sinusitis',
    name: 'Sinusitis',
    description: 'Inflammation or swelling of the tissue lining the sinuses, causing mucus buildup, facial pain, and difficulty breathing through the nose.',
    category: 'respiratory',
    subcategory: 'sinus-conditions',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Sinusitis',
    causes: [
      'Viral infections (common cold, flu)',
      'Bacterial infections (Streptococcus pneumoniae, Haemophilus influenzae)',
      'Allergies',
      'Environmental factors (pollution, tobacco smoke)',
      'Anatomical abnormalities (deviated septum, nasal polyps)'
    ],
    symptoms: [
      'Facial pain or pressure',
      'Nasal congestion',
      'Thick, discolored nasal discharge',
      'Reduced sense of smell and taste',
      'Postnasal drip',
      'Sore throat',
      'Cough',
      'Bad breath',
      'Fatigue',
      'Fever (in some cases)'
    ],
    treatments: [
      'Saline nasal irrigation',
      'Nasal corticosteroids',
      'Decongestants (short-term use only)',
      'Over-the-counter pain relievers',
      'Antibiotics (only for bacterial sinusitis)',
      'Allergy medications if allergies contribute to sinusitis'
    ],
    preventions: [
      'Avoid known allergens and irritants',
      'Use a humidifier to moisten the air',
      'Stay hydrated',
      'Practice good hand hygiene',
      'Avoid smoking and secondhand smoke',
      'Manage allergies proactively'
    ],
    whenToSeekHelp: [
      'Symptoms lasting more than 10 days without improvement',
      'Severe symptoms such as high fever or severe facial pain',
      'Multiple episodes of sinusitis within a year',
      'Symptoms that worsen after initially improving',
      'Symptoms following head injury or with neurological symptoms'
    ],
    commonQuestions: [
      {
        question: 'What\'s the difference between acute and chronic sinusitis?',
        answer: 'Acute sinusitis typically lasts less than 4 weeks and is often triggered by a cold or allergies. Chronic sinusitis lasts 12 weeks or longer despite treatment attempts. Recurrent sinusitis involves several acute episodes within a year.'
      },
      {
        question: 'Can sinusitis go away on its own?',
        answer: 'Acute viral sinusitis often resolves on its own within 7-10 days. Bacterial sinusitis may require antibiotics. Chronic sinusitis typically requires medical treatment and won\'t resolve without intervention.'
      },
      {
        question: 'Is sinusitis contagious?',
        answer: 'Sinusitis itself is not contagious, but the cold or flu viruses that can lead to sinusitis are contagious. Bacterial sinusitis is not generally considered contagious.'
      }
    ],
    prevalence: 'Sinusitis affects approximately 31 million people worldwide each year. Chronic sinusitis affects about 12% of adults.',
    affectedGroups: [
      'People with allergies or asthma',
      'Adults between 18-45 years old (peak incidence)',
      'People with structural abnormalities in the nose or sinuses',
      'Individuals with weakened immune systems',
      'Smokers'
    ]
  },
  {
    id: 'shingles',
    name: 'Shingles (Herpes Zoster)',
    description: 'A viral infection causing a painful rash that develops on one side of the face or body, caused by the same virus responsible for chickenpox.',
    category: 'infectious-diseases',
    subcategory: 'viral-infections',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Shingles',
    causes: [
      'Reactivation of the varicella-zoster virus that causes chickenpox',
      'Weakened immune system due to age, stress, or illness',
      'Previous chickenpox infection'
    ],
    symptoms: [
      'Pain, burning, numbness or tingling',
      'Sensitivity to touch',
      'Red rash that begins a few days after the pain',
      'Fluid-filled blisters that break open and crust over',
      'Itching',
      'Fever',
      'Headache',
      'Fatigue',
      'Sensitivity to light'
    ],
    treatments: [
      'Antiviral medications (most effective when started within 72 hours)',
      'Pain medications',
      'Topical antibiotics to prevent bacterial infections of blisters',
      'Wet compresses, calamine lotion, and colloidal oatmeal baths to relieve itching',
      'Capsaicin cream or lidocaine patches for post-herpetic neuralgia'
    ],
    preventions: [
      'Shingles vaccine (recommended for adults 50 and older)',
      'Chickenpox vaccine (prevents chickenpox, which is a prerequisite for shingles)',
      'Managing stress and maintaining strong immune health'
    ],
    whenToSeekHelp: [
      'Pain and rash near the eyes (can cause permanent eye damage)',
      'Rash that is widespread and painful',
      'Age over 60 or weakened immune system',
      'Someone in the household has a weakened immune system, is pregnant, or is an infant'
    ],
    commonQuestions: [
      {
        question: 'Can you get shingles more than once?',
        answer: "Yes, it\'s possible to get shingles multiple times, though most people who get shingles will only have one episode in their lifetime. The risk of recurrence is higher in people with weakened immune systems."
      },
      {
        question: 'Is shingles contagious?',
        answer: "Shingles itself isn't contagious, but the virus that causes it (varicella-zoster) can be transmitted to people who haven't had chickenpox or the chickenpox vaccine, potentially causing chickenpox in these individuals. The virus is spread through direct contact with fluid from shingles blisters."
      },
      {
        question: 'How long does shingles last?',
        answer: "Most cases of shingles last 3 to 5 weeks. The typical progression includes: 1-5 days of pain and tingling, 1-14 days of active blisters, and 7-10 days of scabbing and healing. Some people develop post-herpetic neuralgia (PHN), where pain persists for months or even years after the rash has healed."
      }
    ],
    prevalence: 'About 1 in 3 people will develop shingles in their lifetime. The risk increases with age, with nearly half of those affected being over 60 years old.',
    affectedGroups: [
      'Adults over 50 (risk increases with age)',
      'People with weakened immune systems',
      'Individuals who had chickenpox before age 1',
      'Those under significant physical or emotional stress',
      'People taking immunosuppressive medications'
    ]
  },
  {
    id: 'endometriosis',
    name: 'Endometriosis',
    description: 'A condition where tissue similar to the lining of the uterus grows outside the uterus, causing pain and potential fertility issues.',
    category: 'reproductive-health',
    subcategory: 'womens-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Endometriosis',
    causes: [
      'Retrograde menstruation (backflow of menstrual tissue)',
      'Cellular metaplasia (transformation of one cell type to another)',
      'Embryonic cell growth',
      'Surgical scar implantation',
      'Immune system dysfunction',
      'Genetic factors'
    ],
    symptoms: [
      'Painful periods (dysmenorrhea)',
      'Pain during or after sex',
      'Pain with bowel movements or urination',
      'Excessive bleeding during periods or between periods',
      'Infertility',
      'Fatigue',
      'Bloating',
      'Nausea',
      'Constipation or diarrhea'
    ],
    treatments: [
      'Pain medications (NSAIDs)',
      'Hormonal contraceptives',
      'Gonadotropin-releasing hormone (GnRH) agonists and antagonists',
      'Progestin therapy',
      'Aromatase inhibitors',
      'Conservative surgery to remove endometriosis implants',
      'Hysterectomy with removal of ovaries (in severe cases)',
      'Complementary approaches (acupuncture, dietary changes, physical therapy)'
    ],
    preventions: [
      'No known prevention, but may be managed by:',
      'Regular exercise',
      'Avoiding large amounts of alcohol and caffeine',
      'Hormonal birth control (may reduce risk)',
      'Maintaining a healthy weight'
    ],
    whenToSeekHelp: [
      'Pelvic pain that disrupts daily activities',
      'Painful periods that don\'t respond to over-the-counter pain relievers',
      'Pain during sex',
      'Difficulty becoming pregnant after trying for 12 months',
      'Unusual menstrual symptoms (heavy bleeding, spotting)'
    ],
    commonQuestions: [
      {
        question: 'Can endometriosis be cured?',
        answer: "There is currently no cure for endometriosis, but treatments can help manage symptoms and improve quality of life. Treatment approaches include pain management, hormonal therapies, and surgery to remove endometriosis tissue. In some cases, pregnancy or menopause may temporarily relieve symptoms, but endometriosis can recur."
      },
      {
        question: 'Does endometriosis always cause infertility?',
        answer: "Not all women with endometriosis experience infertility. About 30-50% of women with endometriosis may have difficulty getting pregnant, but many can still conceive naturally or with reproductive assistance. The severity of endometriosis doesn't always correlate with fertility issues—some with mild disease may struggle to conceive, while others with severe disease may not have fertility problems."
      },
      {
        question: 'Why does it often take so long to diagnose endometriosis?',
        answer: 'Endometriosis is often underdiagnosed and misdiagnosed for several reasons: symptoms overlap with other conditions, normalization of period pain, variation in symptom presentation, lack of awareness among patients and some healthcare providers, and the fact that definitive diagnosis requires laparoscopic surgery. On average, it takes 7-10 years from symptom onset to diagnosis. Increased awareness and education are helping to reduce this delay.'
      }
    ],
    prevalence: 'Endometriosis affects approximately 1 in 10 women of reproductive age worldwide, an estimated 190 million individuals globally.',
    affectedGroups: [
      'Women of reproductive age (typically 15-49 years)',
      'Those with a family history of endometriosis',
      'Women who have never given birth',
      'Women with shorter menstrual cycles or longer periods',
      'People with certain immune disorders'
    ]
  }
];

export default popularConditions;
