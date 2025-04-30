import { HealthCondition } from '../healthConditionsData';

/**
 * Popular health conditions frequently searched on NHS website
 * These are among the most viewed conditions on the NHS health pages
 */
export const nhsPopularConditions: HealthCondition[] = [
  {
    id: 'covid-19',
    name: 'COVID-19',
    description: 'A respiratory illness caused by the SARS-CoV-2 virus, ranging from mild symptoms to severe illness and potentially long-term health effects.',
    category: 'infectious-diseases',
    subcategory: 'viral-infections',
    symptoms: [
      'Fever or chills',
      'Cough',
      'Shortness of breath or difficulty breathing',
      'Fatigue',
      'Muscle or body aches',
      'Headache',
      'New loss of taste or smell',
      'Sore throat',
      'Congestion or runny nose',
      'Nausea or vomiting',
      'Diarrhea'
    ],
    causes: [
      'Infection with the SARS-CoV-2 virus',
      'Primarily spreads through respiratory droplets',
      'Airborne transmission (especially in poorly ventilated spaces)',
      'Contact with contaminated surfaces (less common)',
      'Possible spread from asymptomatic or pre-symptomatic individuals'
    ],
    treatments: [
      'Antiviral medications for high-risk patients',
      'Monoclonal antibody treatments',
      'Rest and fluids',
      'Over-the-counter medications for symptom relief',
      'Oxygen therapy for severe cases',
      'Ventilator support in critical cases',
      'Corticosteroids for severe inflammation',
      'Treatment of specific complications',
      'Rehabilitation for long-term effects'
    ],
    preventions: [
      'Vaccination',
      'Hand hygiene (frequent handwashing or use of hand sanitizer)',
      'Wearing masks in high-risk situations',
      'Physical distancing in crowded areas',
      'Improving ventilation in indoor spaces',
      'Staying home when sick',
      'Testing when symptomatic or after exposure',
      'Following public health guidelines during outbreaks'
    ],
    relatedConditions: [
      'long-covid',
      'pneumonia',
      'acute-respiratory-distress-syndrome',
      'myocarditis',
      'blood-clotting-disorders',
      'post-viral-fatigue',
      'influenza'
    ],
    commonQuestions: [
      {
        question: 'How long is the isolation period for COVID-19?',
        answer: 'Current isolation recommendations vary by country and continue to evolve. In general, if you test positive for COVID-19, it\'s recommended to stay home for at least 5 days and isolate from others. You can typically end isolation after 5 days if you are fever-free for 24 hours (without using fever-reducing medication) and your symptoms are improving. Wearing a high-quality mask when around others is recommended for an additional 5 days. Those with more severe illness may need to isolate for longer. Always check with local health authorities for the most current guidance.'
      },
      {
        question: 'What is Long COVID?',
        answer: 'Long COVID (or Post-COVID Condition) refers to a range of symptoms that persist for weeks or months after the acute phase of COVID-19 infection. Symptoms may include fatigue, brain fog, shortness of breath, heart palpitations, joint or muscle pain, sleep problems, mood changes, and many others. Long COVID can affect anyone who has had COVID-19, even those with mild initial symptoms, though it appears more common in those who had severe disease. The condition can significantly impact daily life and ability to work. Research is ongoing to better understand causes, risk factors, and effective treatments.'
      },
      {
        question: 'Can I get COVID-19 again if I\'ve already had it?',
        answer: 'Yes, reinfection with COVID-19 is possible and has become increasingly common as the virus continues to evolve with new variants. While having COVID-19 provides some natural immunity, this protection wanes over time and may not be as effective against newer variants. Vaccination, even after infection, provides additional protection against reinfection and severe disease. Each COVID-19 infection carries risks of complications and long-term effects, so continued preventive measures remain important, especially for high-risk individuals or during periods of high community transmission.'
      }
    ],
    emergencySigns: [
      'Trouble breathing',
      'Persistent pain or pressure in the chest',
      'New confusion',
      'Inability to wake or stay awake',
      'Pale, gray, or blue-colored skin, lips, or nail beds',
      'Severe and persistent dizziness or lightheadedness',
      'Worsening symptoms after initial improvement'
    ],
    prevalence: 'COVID-19 has affected hundreds of millions of people globally since its emergence in late 2019, with several waves of variants causing surges in different regions over time.',
    affectedGroups: [
      'People of all ages, though risk of severe illness increases with age',
      'Individuals with underlying medical conditions',
      'People with weakened immune systems',
      'Pregnant women',
      'Unvaccinated individuals (higher risk of severe illness)',
      'Healthcare workers and those with high exposure risk',
      'People living in congregate settings'
    ],
    moreInfoLinks: [
      {
        label: 'COVID-19 vaccine information',
        url: '/vaccinations/covid-19-vaccine'
      }
    ],
    extraInfo: 'Vaccination is the most effective way to protect yourself and others from severe illness due to COVID-19. Learn more about eligibility, how to get vaccinated, and the latest guidance on the COVID-19 vaccine on our dedicated vaccine page.'
  },
  {
    id: 'sinusitis',
    name: 'Sinusitis',
    description: 'Inflammation or swelling of the tissue lining the sinuses, causing mucus buildup, facial pain, and difficulty breathing through the nose.',
    category: 'respiratory',
    symptoms: [
      'Facial pain/pressure/tenderness',
      'Nasal stuffiness or congestion',
      'Nasal discharge (thick, yellow or greenish)',
      'Reduced sense of smell and taste',
      'Post-nasal drip',
      'Sore throat',
      'Cough (often worse at night)',
      'Bad breath',
      'Fatigue',
      'Fever (in some cases)'
    ],
    causes: [
      'Viral infections (common cold)',
      'Bacterial infections (secondary)',
      'Fungal infections (rare)',
      'Nasal polyps',
      'Deviated nasal septum',
      'Allergies',
      'Tooth infections',
      'Immune system disorders',
      'Environmental irritants',
      'Swimming or diving (changes in air pressure)'
    ],
    treatments: [
      'Saline nasal irrigation',
      'Nasal corticosteroids',
      'Decongestants (short-term use)',
      'Over-the-counter pain relievers',
      'Antibiotics (only for confirmed bacterial infections)',
      'Allergy medications if allergies are the cause',
      'Warm compresses on the face',
      'Staying hydrated',
      'Inhaling steam',
      'Surgery (for chronic cases with structural issues)'
    ],
    preventions: [
      'Avoiding upper respiratory infections (handwashing, avoiding sick contacts)',
      'Managing allergies',
      'Avoiding cigarette smoke and pollutants',
      'Using a humidifier to add moisture to the air',
      'Drinking plenty of fluids',
      'Regular saline nasal rinses',
      'Avoiding temperature extremes',
      'Managing stress (can trigger sinus issues in some people)',
      'Using decongestants before air travel if prone to sinusitis'
    ],
    relatedConditions: [
      'rhinitis',
      'nasal-polyps',
      'allergies',
      'common-cold',
      'deviated-septum',
      'asthma',
      'tooth-infections'
    ],
    commonQuestions: [
      {
        question: 'How can I tell if I have a sinus infection or just a cold?',
        answer: 'While colds and sinus infections share symptoms like congestion and runny nose, sinus infections typically involve more facial pain and pressure (particularly around eyes, cheeks, and forehead), thicker and colored (yellow/green) nasal discharge, and symptoms that last longer than 10 days. Cold symptoms usually peak within 3-5 days and gradually improve, while sinusitis symptoms persist or worsen. Dental pain, reduced sense of smell, and chronic cough are more common with sinusitis. Fever is more frequent with colds initially but can occur with bacterial sinusitis as well.'
      },
      {
        question: 'Do I need antibiotics for sinusitis?',
        answer: 'Antibiotics are not needed for most cases of sinusitis, as 90-98% of cases are caused by viruses and will improve on their own within 7-10 days. Antibiotics only work against bacterial infections, not viral ones. Doctors may recommend antibiotics if symptoms are severe, last more than 10 days without improvement, include high fever, or if symptoms improve then worsen again ("double worsening"). Overuse of antibiotics can lead to antibiotic resistance and side effects. Focusing on symptom relief with saline rinses, decongestants, and pain relievers is often the best approach initially.'
      },
      {
        question: 'Can sinusitis become chronic?',
        answer: 'Yes, sinusitis can become chronic, defined as inflammation lasting 12 weeks or longer despite treatment attempts. This occurs in about 1 in 10 cases of acute sinusitis. Risk factors for chronic sinusitis include structural abnormalities (deviated septum, nasal polyps), allergies, asthma, immune disorders, recurring infections, and environmental factors. Chronic sinusitis requires a different treatment approach, often including longer courses of medications, identifying and treating underlying causes, and sometimes surgical intervention to correct structural problems or improve sinus drainage.'
      }
    ],
    emergencySigns: [
      'Severe headache with high fever',
      'Vision changes (double vision, reduced vision)',
      'Swelling around the eyes or forehead',
      'Severe facial pain and swelling',
      'Confusion or altered mental state',
      'Stiff neck with fever',
      'Shortness of breath'
    ],
    prevalence: 'Sinusitis affects approximately 31 million people in the United States each year, with around 1 in 8 adults diagnosed annually.',
    affectedGroups: [
      'People with allergies or asthma',
      'Adults between 18-45 years old (peak incidence)',
      'People with structural abnormalities in the nose or sinuses',
      'Individuals with weakened immune systems',
      'Smokers',
      'People with dental infections',
      'Those exposed to air pollution or irritants',
      'Regular swimmers and divers'
    ]
  },
  {
    id: 'shingles',
    name: 'Shingles (Herpes Zoster)',
    description: 'A viral infection causing a painful rash that develops on one side of the face or body, caused by the same virus responsible for chickenpox.',
    category: 'infectious-diseases',
    subcategory: 'viral-infections',
    symptoms: [
      'Pain, burning, numbness or tingling in a localized area',
      'Sensitivity to touch',
      'Red rash that begins a few days after the pain',
      'Fluid-filled blisters that break open and crust over',
      'Itching',
      'Fever',
      'Headache',
      'Fatigue',
      'Sensitivity to light',
      'Symptoms typically affecting only a small section on one side of the body'
    ],
    causes: [
      'Reactivation of the varicella-zoster virus (which causes chickenpox)',
      'The virus remains dormant in nerve tissue and can reactivate years later',
      'Weakened immune system',
      'Aging (risk increases with age)',
      'Stress',
      'Certain medications that suppress the immune system',
      'Recent illness or surgery',
      'Trauma to the affected area (rarely)'
    ],
    treatments: [
      'Antiviral medications (acyclovir, valacyclovir, famciclovir)',
      'Pain medications (over-the-counter and prescription)',
      'Topical antibiotics if blisters become infected',
      'Numbing creams or patches',
      'Wet compresses',
      'Calamine lotion for itching',
      'Antihistamines for itching',
      'Nerve blocks for severe pain',
      'Tricyclic antidepressants or anticonvulsants for ongoing nerve pain'
    ],
    preventions: [
      'Shingles vaccine (recommended for adults 50 and older)',
      'Chickenpox vaccine (reduces risk of getting chickenpox and subsequently shingles)',
      'Managing stress',
      'Maintaining a strong immune system',
      'Getting adequate rest',
      'Eating a healthy diet',
      'Regular exercise'
    ],
    relatedConditions: [
      'chickenpox',
      'postherpetic-neuralgia',
      'encephalitis',
      'vision-problems',
      'bacterial-skin-infections',
      'ramsay-hunt-syndrome',
      'bell-palsy'
    ],
    commonQuestions: [
      {
        question: 'Can you get shingles more than once?',
        answer: 'Yes, it is possible to get shingles more than once, though most people who get shingles only have one episode in their lifetime. Approximately 1-5% of people experience shingles recurrence. Those with weakened immune systems and older adults have a higher risk of recurrence. Each episode typically occurs in a different area of the body. The shingles vaccine is recommended even for those who have had shingles before, as it can help prevent future occurrences and reduce the risk of complications.'
      },
      {
        question: 'Is shingles contagious?',
        answer: 'Shingles itself is not contagious—you cannot catch shingles from someone who has it. However, the varicella-zoster virus that causes shingles can be transmitted from a person with active shingles to someone who has never had chickenpox or been vaccinated against it. In such cases, the person exposed would develop chickenpox, not shingles. The virus is spread through direct contact with fluid from shingles blisters, not through sneezing or coughing. Once the shingles rash has crusted over, the person is no longer contagious.'
      },
      {
        question: 'What is postherpetic neuralgia?',
        answer: 'Postherpetic neuralgia (PHN) is the most common complication of shingles, occurring in approximately 10-18% of cases. It is defined as persistent pain in the area where the shingles rash occurred, lasting more than 90 days after the rash has healed. The pain can be severe and debilitating, described as burning, stabbing, or aching, and can continue for months or even years. Risk factors include older age, severe pain during the acute phase of shingles, extensive rash, and location of shingles on the face or torso. Early antiviral treatment for shingles may reduce the risk of developing PHN.'
      }
    ],
    emergencySigns: [
      'Rash near the eyes (can cause permanent eye damage if untreated)',
      'Widespread rash (may indicate weakened immune system)',
      'High fever',
      'Confusion or disorientation',
      'Severe headache',
      'Difficulty with hearing or balance',
      'Facial weakness or paralysis'
    ],
    prevalence: 'Approximately 1 in 3 people will develop shingles in their lifetime, with an estimated one million cases occurring annually in the United States.',
    affectedGroups: [
      'Adults over 50 (risk increases with age)',
      'People with weakened immune systems',
      'Individuals who had chickenpox before age 1',
      'Those under significant physical or emotional stress',
      'People taking immunosuppressive medications',
      'Individuals with certain diseases (cancer, HIV/AIDS)',
      'Anyone who has had chickenpox'
    ]
  },
  {
    id: 'endometriosis',
    name: 'Endometriosis',
    description: 'A condition where tissue similar to the lining of the uterus grows outside the uterus, causing pain and potential fertility issues.',
    category: 'reproductive-health',
    subcategory: 'womens-health',
    symptoms: [
      'Painful periods (dysmenorrhea)',
      'Pain during or after sex',
      'Pain with bowel movements or urination',
      'Excessive bleeding during periods',
      'Bleeding between periods',
      'Infertility',
      'Fatigue',
      'Bloating',
      'Nausea, especially during periods',
      'Chronic pelvic pain'
    ],
    causes: [
      'Retrograde menstruation (menstrual blood flowing back through fallopian tubes)',
      'Cellular metaplasia (cells changing type outside the uterus)',
      'Embryonic cell transformation',
      'Surgical scar implantation',
      'Endometrial cell transport (through blood vessels or lymphatic system)',
      'Immune system disorders',
      'Genetic factors',
      'Environmental factors and toxins'
    ],
    treatments: [
      'Pain medications (NSAIDs)',
      'Hormone therapy (birth control pills, progestins, GnRH agonists and antagonists)',
      'Conservative surgery (laparoscopy to remove endometriosis implants)',
      'Hysterectomy with removal of ovaries (in severe cases)',
      'Fertility treatment if trying to become pregnant',
      'Lifestyle interventions (exercise, diet modifications)',
      'Alternative therapies (acupuncture, dietary supplements)',
      'Physical therapy for pelvic pain',
      'Psychological support'
    ],
    preventions: [
      'No known prevention',
      'Hormonal birth control may reduce risk',
      'Pregnancy and breastfeeding may temporarily reduce symptoms',
      'Regular exercise',
      'Avoiding large amounts of alcohol and caffeine',
      'Maintaining healthy body weight',
      'Early diagnosis and management'
    ],
    relatedConditions: [
      'adenomyosis',
      'infertility',
      'irritable-bowel-syndrome',
      'interstitial-cystitis',
      'fibromyalgia',
      'chronic-fatigue-syndrome',
      'autoimmune-disorders'
    ],
    commonQuestions: [
      {
        question: 'Does endometriosis always cause infertility?',
        answer: 'No, endometriosis does not always cause infertility, though it is a leading cause of fertility problems. About 30-50% of women with endometriosis experience infertility. The relationship between endometriosis and fertility depends on several factors including the severity of the condition, the location of endometriosis tissue, whether it has damaged the ovaries or fallopian tubes, and other individual factors. Many women with mild to moderate endometriosis can conceive naturally, while others may need fertility treatments. Early diagnosis and treatment can help preserve fertility.'
      },
      {
        question: 'Why does it often take so long to diagnose endometriosis?',
        answer: 'Endometriosis takes an average of 7-10 years from symptom onset to diagnosis due to several factors. Symptoms can mimic other conditions like irritable bowel syndrome or pelvic inflammatory disease. Many people normalize menstrual pain, not realizing their symptoms are abnormal. Healthcare providers may dismiss pain as "just bad periods" or psychological. The definitive diagnosis requires laparoscopic surgery, which isn\'t performed based on symptoms alone. Additionally, symptoms don\'t always correlate with disease severity—some with severe endometriosis have minimal symptoms, while others with mild disease have debilitating pain. Increased awareness and education are helping reduce diagnostic delays.'
      },
      {
        question: 'Does endometriosis go away after menopause?',
        answer: 'Endometriosis symptoms typically improve after natural menopause due to the decline in estrogen production, as endometriosis is an estrogen-dependent disease. However, it doesn\'t always completely resolve. Some women may continue to experience symptoms if they take hormone replacement therapy containing estrogen. In rare cases, endometriosis can still be active in post-menopausal women due to the body producing small amounts of estrogen in fat tissue or the adrenal glands. Women who have surgical menopause (removal of ovaries) before natural menopause may experience more immediate relief from endometriosis symptoms.'
      }
    ],
    emergencySigns: [
      'Severe, acute pelvic pain that doesn\'t respond to usual pain management',
      'Signs of ruptured endometrioma (sudden intense abdominal pain)',
      'Symptoms of bowel obstruction (severe bloating, inability to pass gas or stool)',
      'Symptoms of urinary obstruction (inability to urinate)',
      'Heavy, uncontrolled vaginal bleeding',
      'Signs of infection with endometriosis (fever, severe pain)'
    ],
    prevalence: 'Endometriosis affects approximately 1 in 10 women of reproductive age worldwide, an estimated 190 million individuals globally.',
    affectedGroups: [
      'Women of reproductive age (typically 15-49 years)',
      'Those with a family history of endometriosis',
      'Women who have never had children',
      'Women with shorter menstrual cycles or longer periods',
      'People with anatomical abnormalities of the reproductive tract',
      'Those with immune system disorders',
      'People who started their periods at an early age'
    ]
  }
];

export default nhsPopularConditions;
