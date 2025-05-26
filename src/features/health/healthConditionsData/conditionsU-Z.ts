import { HealthCondition } from '../healthConditionsData';

/**
 * Health conditions starting with letters U-Z
 */
export const conditionsUtoZ: HealthCondition[] = [
  {
    id: 'whooping-cough',
    name: 'Whooping Cough (Pertussis)',
    description: 'A highly contagious respiratory tract infection caused by the bacterium Bordetella pertussis.[1] It is characterized by severe coughing fits followed by a high-pitched intake of breath that sounds like a "whoop".[2] The disease is particularly dangerous for babies and young children, and can be fatal, especially in infants less than one year of age.[3] Despite widespread vaccination, pertussis remains endemic in many countries and has seen resurgence in recent decades.[4]',
    category: 'respiratory',
    subcategory: 'infectious-diseases',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Whooping_cough',
    symptoms: [
      'Initial symptoms (catarrhal stage, 1-2 weeks):',
      'Runny nose',
      'Low-grade fever',
      'Mild, occasional cough',
      'Apnea (pauses in breathing) in infants',
      'Paroxysmal stage (2-6 weeks):',
      'Severe coughing fits (paroxysms)',
      'Characteristic "whoop" sound when inhaling after coughing (may be absent in infants and adults)',
      'Vomiting during or after coughing fits',
      'Exhaustion after coughing episodes',
      'Cyanosis (blue or purple coloration of the skin) during coughing fits',
      'Normal or only slightly elevated temperature between coughing episodes',
      'Convalescent stage (weeks to months):',
      'Gradual recovery',
      'Decreasing frequency and severity of coughing fits',
      'Susceptibility to other respiratory infections'
    ],
    causes: [
      'Infection with Bordetella pertussis bacteria',
      'Transmission through airborne droplets from coughs or sneezes',
      'Direct contact with respiratory secretions',
      'Highly contagious (up to 90% infection rate in unvaccinated household contacts)',
      'Most infectious during the catarrhal stage and early paroxysmal stage',
      'Waning immunity from childhood vaccination',
      'Incomplete vaccination series'
    ],
    treatments: [
      'Antibiotics (most effective when started early):',
      'Macrolides (azithromycin, clarithromycin, erythromycin)',
      'Trimethoprim-sulfamethoxazole (for patients allergic to macrolides)',
      'Supportive care:',
      'Adequate hydration and nutrition',
      'Humidified air',
      'Frequent small meals (to prevent post-cough vomiting)',
      'Avoidance of irritants that trigger coughing',
      'Hospitalization for severe cases (especially infants)',
      'Oxygen therapy for cyanosis or apnea',
      'Suctioning of thick respiratory secretions',
      'Mechanical ventilation in critical cases'
    ],
    preventions: [
      'Vaccination:',
      'DTaP (diphtheria, tetanus, acellular pertussis) vaccine for children under 7',
      'Tdap (tetanus, diphtheria, acellular pertussis) booster for adolescents and adults',
      'Maternal vaccination during each pregnancy (ideally between 27-36 weeks)',
      'Cocooning strategy (vaccinating all close contacts of newborns)',
      'Isolation of infected individuals',
      'Antibiotic prophylaxis for close contacts of confirmed cases',
      'Good hand hygiene',
      'Covering coughs and sneezes'
    ],
    relatedConditions: [
      'bronchitis',
      'pneumonia',
      'ear-infections',
      'rib-fractures',
      'hernias',
      'encephalopathy',
      'seizures',
      'apnea'
    ],
    commonQuestions: [
      {
        question: 'Can you get whooping cough if you\'ve been vaccinated?',
        answer: 'Yes, it is possible to get whooping cough even if you\'ve been vaccinated, though the disease is typically milder in vaccinated individuals. This can occur for several reasons: vaccine-induced immunity wanes over time (typically 5-10 years after the last dose); the pertussis vaccine is about 80-90% effective, so some vaccinated individuals remain susceptible; and circulating strains of Bordetella pertussis may have evolved to partially evade vaccine-induced immunity. This is why booster doses are recommended for adolescents and adults, especially pregnant women and those who will be in close contact with infants. Even with these limitations, vaccination remains the most effective strategy for preventing pertussis and reducing its severity.'
      },
      {
        question: 'How long is whooping cough contagious?',
        answer: 'Whooping cough is most contagious during the early stages of the illness, specifically during the catarrhal stage (first 1-2 weeks) and early paroxysmal stage, before the characteristic coughing fits begin or just as they start. Without antibiotic treatment, a person can be contagious for up to 3 weeks after the onset of coughing fits. However, with appropriate antibiotic treatment, the contagious period is significantly reduced—most people are no longer contagious after 5 days of antibiotic therapy. This is why early diagnosis and treatment are important not only for the patient but also for preventing transmission to others, especially vulnerable individuals like unvaccinated infants.'
      },
      {
        question: 'Why is whooping cough dangerous for babies?',
        answer: 'Whooping cough is particularly dangerous for babies, especially those under 6 months of age, for several reasons. Infants have immature immune systems and are not fully protected until they\'ve received at least three doses of the pertussis vaccine (typically by 6 months). In babies, pertussis can cause severe complications including: apnea (pauses in breathing), pneumonia, seizures, encephalopathy (brain disease), and death. Infants often don\'t develop the characteristic "whoop" sound, making diagnosis challenging, and they may present with life-threatening apnea or cyanosis instead. Additionally, the coughing fits can prevent proper feeding, leading to dehydration and malnutrition. About half of infants under 1 year who get pertussis require hospitalization, and the mortality rate is highest in this age group, particularly in those under 2 months old. This is why maternal vaccination during pregnancy and creating a "cocoon" of vaccinated individuals around newborns are crucial strategies.'
      }
    ],
    emergencySigns: [
      'In infants and young children:',
      'Difficulty breathing or rapid breathing',
      'Prolonged apnea (pauses in breathing)',
      'Cyanosis (blue or purple coloration of the lips or face)',
      'Seizures',
      'Dehydration',
      'Extreme lethargy or difficulty waking',
      'Inability to feed',
      'In all age groups:',
      'Persistent vomiting',
      'Signs of pneumonia (high fever, chest pain)',
      'Prolonged coughing fits that prevent breathing'
    ],
    prevalence: 'Despite widespread vaccination, pertussis remains endemic globally with an estimated 24.1 million cases and 160,700 deaths annually, primarily in developing countries. In recent decades, there has been a resurgence in many developed countries with high vaccination coverage. The United States reported between 10,000-50,000 cases annually in recent years, with cyclical peaks every 3-5 years. The highest incidence is among infants under 1 year, followed by children aged 7-10 years and adolescents, reflecting waning immunity after childhood vaccination.',
    affectedGroups: [
      'Infants under 1 year (highest risk of severe disease and death)',
      'Unvaccinated or incompletely vaccinated children',
      'Adolescents and adults with waning vaccine immunity',
      'Pregnant women (can transmit to newborns)',
      'Elderly individuals',
      'People with chronic respiratory conditions',
      'Immunocompromised individuals'
    ],
    references: [
      {
        id: '1',
        text: 'Kilgore PE, Salim AM, Zervos MJ, Schmitt HJ. (2016). "Pertussis: Microbiology, Disease, Treatment, and Prevention". Clinical Microbiology Reviews. 29 (3): 449-486.',
        url: 'https://doi.org/10.1128/CMR.00083-15'
      },
      {
        id: '2',
        text: 'Yeung KHT, Duclos P, Nelson EAS, Hutubessy RCW. (2017). "An update of the global burden of pertussis in children younger than 5 years: a modelling study". The Lancet Infectious Diseases. 17 (9): 974-980.',
        url: 'https://doi.org/10.1016/S1473-3099(17)30390-0'
      },
      {
        id: '3',
        text: 'Burdin N, Handy LK, Plotkin SA. (2017). "What Is Wrong with Pertussis Vaccine Immunity? The Problem of Waning Effectiveness of Pertussis Vaccines". Cold Spring Harbor Perspectives in Biology. 9 (12): a029454.',
        url: 'https://doi.org/10.1101/cshperspect.a029454'
      },
      {
        id: '4',
        text: 'Liang JL, Tiwari T, Moro P, et al. (2018). "Prevention of Pertussis, Tetanus, and Diphtheria with Vaccines in the United States: Recommendations of the Advisory Committee on Immunization Practices (ACIP)". MMWR Recommendations and Reports. 67 (2): 1-44.',
        url: 'https://doi.org/10.15585/mmwr.rr6702a1'
      },
      {
        id: '5',
        text: 'Mattoo S, Cherry JD. (2005). "Molecular pathogenesis, epidemiology, and clinical manifestations of respiratory infections due to Bordetella pertussis and other Bordetella subspecies". Clinical Microbiology Reviews. 18 (2): 326-382.',
        url: 'https://doi.org/10.1128/CMR.18.2.326-382.2005'
      }
    ]
  },
  {
    id: 'ulcerative-colitis',
    name: 'Ulcerative Colitis',
    description: 'A chronic inflammatory bowel disease (IBD) that causes inflammation and ulcers in the lining of the large intestine (colon) and rectum.[1] The inflammation typically begins in the rectum and lower colon but may spread continuously to involve the entire colon.[2] Unlike Crohn\'s disease, which can affect any part of the gastrointestinal tract, ulcerative colitis is limited to the colon and rectum.[3] The disease can significantly impact quality of life and, in severe cases, may require surgery.[4] While there is no cure, treatments can reduce symptoms and bring about long-term remission.[5]',
    category: 'digestive-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Ulcerative_colitis',
    symptoms: [
      'Diarrhea, often with blood or pus',
      'Abdominal pain and cramping',
      'Rectal pain and bleeding',
      'Urgency to defecate',
      'Inability to defecate despite urgency',
      'Weight loss',
      'Fatigue',
      'Fever',
      'Failure to grow in children',
      'Joint pain',
      'Skin problems (erythema nodosum, pyoderma gangrenosum)',
      'Eye inflammation',
      'Mouth sores',
      'Liver problems (primary sclerosing cholangitis)'
    ],
    causes: [
      'Autoimmune reaction (immune system attacks cells in the digestive tract)',
      'Genetic factors (family history increases risk)',
      'Environmental triggers',
      'Dysregulated immune response to intestinal microbiota',
      'Abnormal gut microbiome composition',
      'Epithelial barrier defects',
      'Possible dietary factors (Western diet high in fat and refined foods)',
      'Possible role of stress in triggering flares'
    ],
    treatments: [
      'Anti-inflammatory medications:',
      '5-aminosalicylates (5-ASAs) for mild to moderate disease',
      'Corticosteroids for moderate to severe flares',
      'Immunosuppressants (azathioprine, 6-mercaptopurine, cyclosporine)',
      'Biologics (anti-TNF agents like infliximab, adalimumab; anti-integrins like vedolizumab; anti-IL-12/23 like ustekinumab)',
      'JAK inhibitors (tofacitinib)',
      'Surgery (colectomy) for severe cases unresponsive to medication or complications',
      'Antibiotics for infections',
      'Iron supplements for anemia',
      'Probiotics (specific strains may help certain patients)',
      'Pain medications',
      'Antidiarrheals (with caution during flares)'
    ],
    preventions: [
      'No known prevention for developing ulcerative colitis',
      'For those diagnosed, preventing flares may include:',
      'Medication adherence',
      'Avoiding trigger foods (varies by individual)',
      'Stress management',
      'Regular exercise',
      'Not smoking (smoking cessation may trigger flares in ulcerative colitis, unlike Crohn\'s)',
      'Limiting NSAIDs use',
      'Regular medical follow-up',
      'Vaccinations to prevent complications from immunosuppressive therapy'
    ],
    relatedConditions: [
      'crohns-disease',
      'inflammatory-bowel-disease',
      'irritable-bowel-syndrome',
      'colorectal-cancer',
      'primary-sclerosing-cholangitis',
      'ankylosing-spondylitis',
      'arthritis',
      'pyoderma-gangrenosum',
      'erythema-nodosum',
      'uveitis'
    ],
    commonQuestions: [
      {
        question: 'What\'s the difference between ulcerative colitis and Crohn\'s disease?',
        answer: 'While both are inflammatory bowel diseases with similar symptoms, they differ in several key ways: 1) Location: Ulcerative colitis affects only the colon and rectum, while Crohn\'s can affect any part of the digestive tract from mouth to anus. 2) Pattern of inflammation: Ulcerative colitis causes continuous inflammation of the innermost lining of the colon, while Crohn\'s causes patchy, transmural (full-thickness) inflammation. 3) Complications: Ulcerative colitis may lead to toxic megacolon and colorectal cancer, while Crohn\'s more commonly causes strictures, fistulas, and abscesses. 4) Symptoms: Bloody diarrhea is more common in ulcerative colitis, while abdominal pain and malnutrition are more prominent in Crohn\'s. 5) Surgical outcomes: Removal of the entire colon and rectum can "cure" ulcerative colitis, while Crohn\'s may recur after surgery. 6) Smoking effects: Interestingly, smoking may worsen Crohn\'s but has shown protective effects in ulcerative colitis (though smoking is still not recommended due to its many health risks).'
      },
      {
        question: 'Can diet changes help manage ulcerative colitis?',
        answer: 'Diet plays an important role in managing ulcerative colitis, though no single diet works for everyone. During flares, a low-fiber, low-residue diet may help reduce symptoms by limiting foods that are harder to digest. Some patients benefit from identifying and avoiding specific trigger foods through elimination diets under medical supervision. Common triggers include dairy, high-fiber foods, spicy foods, alcohol, and caffeine. Between flares, most gastroenterologists recommend a well-balanced diet rich in nutrients. Specific diets that some patients find helpful include the Specific Carbohydrate Diet (SCD), the low-FODMAP diet, the Mediterranean diet, and the anti-inflammatory diet. Adequate hydration is essential, especially during active disease. Nutritional supplements may be necessary for those with nutrient deficiencies. It\'s important to work with healthcare providers, particularly registered dietitians specializing in IBD, to develop an individualized nutrition plan that ensures adequate nutrient intake while minimizing symptoms.'
      },
      {
        question: 'Is ulcerative colitis curable?',
        answer: 'Ulcerative colitis is considered a chronic, lifelong condition without a medical cure. However, it can be effectively managed with medications that can induce and maintain remission, sometimes for years. The only definitive "cure" is surgical removal of the entire colon and rectum (proctocolectomy), which eliminates the disease since it cannot recur in other parts of the digestive tract (unlike Crohn\'s disease). Modern surgical options include procedures that preserve continence, such as ileal pouch-anal anastomosis (IPAA or J-pouch surgery), which allows patients to defecate normally without an external ostomy bag. However, surgery is typically reserved for severe cases that don\'t respond to medication, complications like perforation or severe bleeding, precancerous changes, or cancer. Research into new treatments continues, including biologics, small molecules, and microbiome-based therapies, offering hope for better disease control and improved quality of life.'
      }
    ],
    emergencySigns: [
      'Severe abdominal pain',
      'High fever (above 101°F or 38.3°C)',
      'Profuse rectal bleeding or passing large amounts of blood',
      'Severe diarrhea that leads to dehydration',
      'Rapid heart rate',
      'Dizziness or fainting',
      'Severe fatigue or weakness',
      'Sudden, severe abdominal swelling',
      'Inability to keep down liquids',
      'Signs of toxic megacolon (severely distended colon, fever, rapid heart rate, pain)'
    ],
    prevalence: 'Ulcerative colitis affects approximately 900,000 people in the United States and about 2 million people in Europe. The global prevalence is increasing, particularly in newly industrialized countries. Incidence rates range from 9-20 cases per 100,000 person-years in North America and Europe. Ulcerative colitis can develop at any age, but onset typically occurs between 15 and 30 years, with a second peak between 50 and 70 years.',
    affectedGroups: [
      'Most common in people of European descent, particularly Ashkenazi Jewish populations',
      'Increasing in previously low-incidence regions like Asia, South America, and southern Europe',
      'Affects men and women equally',
      'Typical onset in adolescence and early adulthood (15-30 years)',
      'Second peak of onset in 50-70 year age group',
      'Higher risk in those with first-degree relatives with IBD (genetic component)',
      'Urban populations (higher rates than rural areas)',
      'Non-smokers and former smokers (higher risk than current smokers)',
      'People living in northern, industrialized countries'
    ],
    references: [
      {
        id: '1',
        text: 'Ungaro R, Mehandru S, Allen PB, et al. (2017). "Ulcerative colitis". Lancet. 389 (10080): 1756-1770.',
        url: 'https://doi.org/10.1016/S0140-6736(16)32126-2'
      },
      {
        id: '2',
        text: 'Feuerstein JD, Isaacs KL, Schneider Y, et al. (2020). "AGA Clinical Practice Guidelines on the Management of Moderate to Severe Ulcerative Colitis". Gastroenterology. 158 (5): 1450-1461.',
        url: 'https://doi.org/10.1053/j.gastro.2020.01.006'
      },
      {
        id: '3',
        text: 'Danese S, Fiocchi C. (2011). "Ulcerative Colitis". New England Journal of Medicine. 365 (18): 1713-1725.',
        url: 'https://doi.org/10.1056/NEJMra1102942'
      },
      {
        id: '4',
        text: 'Kobayashi T, Siegmund B, Le Berre C, et al. (2020). "Ulcerative colitis". Nature Reviews Disease Primers. 6 (1): 74.',
        url: 'https://doi.org/10.1038/s41572-020-0205-x'
      },
      {
        id: '5',
        text: 'Rubin DT, Ananthakrishnan AN, Siegel CA, et al. (2019). "ACG Clinical Guideline: Ulcerative Colitis in Adults". American Journal of Gastroenterology. 114 (3): 384-413.',
        url: 'https://doi.org/10.14309/ajg.0000000000000152'
      }
    ]
  },
  {
    id: 'xerostomia',
    name: 'Xerostomia (Dry Mouth)',
    description: 'A condition characterized by decreased saliva production resulting in abnormal dryness in the mouth.[1] While not a disease itself, xerostomia is a symptom that can significantly impact quality of life, affecting speech, eating, swallowing, and oral health.[2] The condition can range from mild discomfort to severe complications like increased tooth decay, mouth infections, and nutritional deficiencies.[3] Xerostomia is commonly caused by medications, medical treatments, systemic diseases, or aging.[4] Management approaches typically address both the underlying causes and the symptomatic relief of oral dryness.[5]',
    category: 'digestive-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Xerostomia',
    symptoms: [
      'Persistent feeling of dryness in the mouth',
      'Thick, stringy saliva',
      'Difficulty speaking, chewing, or swallowing',
      'Changed sense of taste (dysgeusia)',
      'Bad breath (halitosis)',
      'Cracked lips',
      'Sore throat',
      'Dry, rough tongue',
      'Mouth sores or infections',
      'Difficulty wearing dentures',
      'Increased thirst',
      'Burning sensation in the mouth',
      'Lipstick sticking to teeth (in women)',
      'Difficulty speaking for extended periods',
      'Waking up at night needing to drink water'
    ],
    causes: [
      'Medications (over 500 medications can cause dry mouth):',
      'Antihistamines and decongestants',
      'Antihypertensives (blood pressure medications)',
      'Antidepressants',
      'Antipsychotics',
      'Diuretics',
      'Muscle relaxants',
      'Pain medications',
      'Parkinson\'s disease medications',
      'Medical treatments:',
      'Radiation therapy to the head and neck',
      'Chemotherapy',
      'Nerve damage to the head and neck',
      'Diseases and conditions:',
      'Sjögren\'s syndrome (autoimmune disorder)',
      'Diabetes',
      'HIV/AIDS',
      'Alzheimer\'s disease',
      'Stroke',
      'Rheumatoid arthritis',
      'Hypertension',
      'Parkinson\'s disease',
      'Cystic fibrosis',
      'Other causes:',
      'Aging',
      'Dehydration',
      'Tobacco use',
      'Alcohol use',
      'Recreational drug use',
      'Mouth breathing',
      'Anxiety'
    ],
    treatments: [
      'Addressing underlying causes:',
      'Medication adjustment (when possible)',
      'Managing underlying medical conditions',
      'Improving hydration',
      'Saliva substitutes and moisturizers:',
      'Over-the-counter saliva substitutes',
      'Mouth moisturizing sprays, gels, and rinses',
      'Water-based lip lubricants',
      'Salivary stimulants:',
      'Sugar-free gum or candies containing xylitol',
      'Prescription medications (pilocarpine, cevimeline)',
      'Acupuncture (in some cases)',
      'Oral hygiene:',
      'Frequent dental check-ups',
      'Regular brushing with fluoride toothpaste',
      'Daily flossing',
      'Fluoride treatments',
      'Lifestyle modifications:',
      'Avoiding caffeine, alcohol, and tobacco',
      'Using a humidifier at night',
      'Sipping water frequently',
      'Avoiding salty, spicy, acidic, or sugary foods',
      'Minimizing use of over-the-counter antihistamines and decongestants'
    ],
    preventions: [
      'Staying well-hydrated',
      'Regular dental check-ups',
      'Good oral hygiene practices',
      'Avoiding tobacco and limiting alcohol consumption',
      'Using a humidifier in dry environments',
      'Breathing through the nose rather than mouth',
      'Discussing medication side effects with healthcare providers',
      'Managing chronic conditions that may contribute to dry mouth',
      'Limiting caffeine intake'
    ],
    relatedConditions: [
      'sjogrens-syndrome',
      'diabetes',
      'hiv-aids',
      'rheumatoid-arthritis',
      'lupus',
      'parkinsons-disease',
      'alzheimers-disease',
      'oral-thrush',
      'burning-mouth-syndrome',
      'dental-caries',
      'oral-candidiasis',
      'dysgeusia'
    ],
    commonQuestions: [
      {
        question: 'Will my xerostomia go away if I stop taking my medication?',
        answer: 'It depends on several factors. If your dry mouth is primarily caused by medication, there\'s a good chance that the symptoms will improve after stopping or changing the medication. However, this varies based on: 1) The specific medication - some medications cause temporary effects while others may lead to longer-lasting changes; 2) Duration of use - longer-term use may take more time to reverse; 3) Individual factors - how your body specifically responds; 4) Presence of other causes - if you have multiple factors contributing to xerostomia. It\'s crucial NOT to stop prescribed medications without consulting your healthcare provider first. Abruptly discontinuing certain medications can be dangerous and potentially life-threatening. Your doctor may be able to: adjust your dosage, recommend a different medication with fewer dry mouth side effects, suggest taking the medication at a different time of day, or prescribe additional treatments to manage the dry mouth symptoms while continuing necessary medication. Even after changing medications, it may take time for normal salivary function to return, and in some cases, especially after long-term use of certain medications, complete recovery of salivary function might not occur. Always work with your healthcare provider to safely address medication-related dry mouth.'
      },
      {
        question: 'Can dry mouth cause cavities?',
        answer: 'Yes, dry mouth (xerostomia) significantly increases the risk of developing cavities. This happens because saliva plays several crucial protective roles in maintaining oral health: 1) Cleansing effect - Saliva naturally washes away food particles and bacteria that would otherwise remain on teeth; 2) Neutralizing acids - Saliva buffers and neutralizes acids produced by bacteria, which would otherwise erode tooth enamel; 3) Remineralization - Saliva contains calcium and phosphate ions that help repair early tooth decay by promoting remineralization of enamel; 4) Antimicrobial properties - Saliva contains proteins and enzymes that help control bacteria and fungi in the mouth. When saliva production is reduced, these protective mechanisms are compromised, creating an environment where cavity-causing bacteria can thrive. Studies have shown that people with chronic dry mouth can develop new cavities at three times the normal rate. Additionally, dry mouth often leads to cavities in unusual locations, such as along the gum line or on root surfaces, which are particularly challenging to treat. If you have dry mouth, it\'s essential to have more frequent dental check-ups (every 3-4 months rather than every 6 months), use high-fluoride toothpaste, consider additional fluoride treatments, and be meticulous about oral hygiene.'
      },
      {
        question: 'What foods and drinks should I avoid with xerostomia?',
        answer: 'With xerostomia (dry mouth), certain foods and drinks can worsen symptoms or increase the risk of dental complications. It\'s advisable to avoid or limit: 1) Dry, tough foods - Like crusty bread, crackers, or tough meats that require significant saliva for comfortable chewing and swallowing; 2) Spicy foods - These can irritate an already sensitive dry mouth; 3) Acidic foods and drinks - Citrus fruits, tomatoes, and vinegar-based products can be uncomfortable and contribute to enamel erosion when saliva isn\'t available to neutralize acids; 4) Salty foods - These can further dehydrate mouth tissues and cause discomfort; 5) Sugary foods and drinks - Without adequate saliva to wash away sugars and neutralize acids, these significantly increase cavity risk; 6) Alcohol - Including alcoholic beverages and alcohol-containing mouthwashes, which can further dry mouth tissues; 7) Caffeine - Coffee, tea, some sodas, and energy drinks have diuretic effects that can worsen dehydration; 8) Carbonated beverages - Both regular and diet versions are acidic and can contribute to enamel erosion. Instead, focus on: Soft, moist foods (possibly with gravies or sauces), non-acidic fruits and vegetables, foods with high water content, sugar-free options, and staying well-hydrated with water. Consider using xylitol-containing products, which can help stimulate saliva flow and have anti-cavity properties.'
      }
    ],
    emergencySigns: [
      'Extreme difficulty swallowing or choking',
      'Severe mouth pain',
      'Inability to drink or take medications',
      'Signs of dehydration (extreme thirst, dizziness, confusion)',
      'Oral infections with fever',
      'Rapid dental deterioration',
      'Significant weight loss due to difficulty eating'
    ],
    prevalence: 'Xerostomia affects approximately 10% of the general population, with much higher rates among older adults. Studies show that 20-30% of adults over 65 experience dry mouth, with the prevalence increasing with age. The condition is particularly common in people taking multiple medications, with up to 80% of commonly prescribed medications listing dry mouth as a potential side effect. Among cancer patients who have undergone radiation therapy to the head and neck, the prevalence is extremely high, affecting up to 100% during treatment and persisting long-term in many cases. In individuals with Sjögren\'s syndrome, an autoimmune disorder, dry mouth is a defining feature affecting the vast majority of patients.',
    affectedGroups: [
      'Older adults (especially those over 65)',
      'People taking multiple medications (polypharmacy)',
      'Cancer patients undergoing radiation therapy to the head and neck',
      'People with autoimmune disorders, particularly Sjögren\'s syndrome',
      'Individuals with diabetes, HIV/AIDS, or Parkinson\'s disease',
      'Patients with depression and anxiety disorders',
      'Individuals who smoke or use recreational drugs',
      'People who breathe primarily through their mouth',
      'Those living in dry or high-altitude environments'
    ],
    references: [
      {
        id: '1',
        text: 'Villa A, Connell CL, Abati S. (2015). "Diagnosis and management of xerostomia and hyposalivation". Therapeutics and Clinical Risk Management. 11: 45-51.',
        url: 'https://doi.org/10.2147/TCRM.S76282'
      },
      {
        id: '2',
        text: 'Tanasiewicz M, Hildebrandt T, Obersztyn I. (2016). "Xerostomia of Various Etiologies: A Review of the Literature". Advances in Clinical and Experimental Medicine. 25 (1): 199-206.',
        url: 'https://doi.org/10.17219/acem/29375'
      },
      {
        id: '3',
        text: 'Han P, Suarez-Durall P, Mulligan R. (2015). "Dry mouth: A critical topic for older adult patients". Journal of Prosthodontic Research. 59 (1): 6-19.',
        url: 'https://doi.org/10.1016/j.jpor.2014.11.001'
      },
      {
        id: '4',
        text: 'Millsop JW, Wang EA, Fazel N. (2017). "Etiology, evaluation, and management of xerostomia". Clinics in Dermatology. 35 (5): 468-476.',
        url: 'https://doi.org/10.1016/j.clindermatol.2017.06.010'
      },
      {
        id: '5',
        text: 'Plemons JM, Al-Hashimi I, Marek CL. (2014). "Managing xerostomia and salivary gland hypofunction: Executive summary of a report from the American Dental Association Council on Scientific Affairs". Journal of the American Dental Association. 145 (8): 867-873.',
        url: 'https://doi.org/10.14219/jada.2014.44'
      }
    ]
  },
  {
    id: 'vitiligo',
    name: 'Vitiligo',
    description: 'A long-term skin condition characterized by patches of skin losing their pigment, resulting in white patches with sharp margins.[1] The disorder affects all skin types but is more noticeable in people with darker skin.[2] Vitiligo occurs when melanocytes, the cells responsible for skin pigmentation, are destroyed.[3] The exact cause remains unclear, but it\'s believed to be an autoimmune condition where the body\'s immune system attacks and destroys its own melanocytes.[4] While vitiligo is not physically painful or contagious, it can have significant psychological and social impacts on affected individuals.[5]',
    category: 'skin-and-hair',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Vitiligo',
    symptoms: [
      'Patchy loss of skin color, typically first appearing on sun-exposed areas such as the face, hands, and feet',
      'Premature whitening or graying of the hair on the scalp, eyelashes, eyebrows, or beard',
      'Loss of color in the tissues that line the inside of the mouth and nose',
      'Loss of or change in color of the inner layer of the eye (retina)',
      'Smooth texture of white patches',
      'Well-defined boundaries between pigmented and depigmented skin',
      'Symmetrical patterns of depigmentation (in generalized vitiligo)',
      'Koebner phenomenon (development of new patches at sites of skin trauma)',
      'Sunburn in depigmented areas (due to lack of melanin protection)',
      'Itching (uncommon but may occur before or during pigment loss)'
    ],
    causes: [
      'Autoimmune disorder (immune system attacking melanocytes)',
      'Genetic factors (family history increases risk)',
      'Neurochemical factors (neurogenic inflammation)',
      'Oxidative stress (imbalance between free radicals and antioxidants)',
      'Environmental triggers (sunburn, chemical exposure, physical trauma to the skin)',
      'Psychological stress (may trigger or worsen condition)',
      'Association with other autoimmune diseases (thyroid disorders, alopecia areata, pernicious anemia)',
      'Melanocyte defects (intrinsic abnormalities in the pigment cells)'
    ],
    treatments: [
      'Topical treatments:',
      'Corticosteroid creams',
      'Calcineurin inhibitors (tacrolimus, pimecrolimus)',
      'Calcipotriene (vitamin D analog)',
      'Light therapy:',
      'Narrowband ultraviolet B (NB-UVB) phototherapy',
      'Psoralen plus ultraviolet A (PUVA)',
      'Excimer laser',
      'Oral medications:',
      'Corticosteroids',
      'Janus kinase (JAK) inhibitors',
      'Immunosuppressants',
      'Surgical options:',
      'Skin grafting',
      'Blister grafting',
      'Cellular grafting (melanocyte-keratinocyte transplantation)',
      'Depigmentation therapy (for widespread vitiligo)',
      'Ruxolitinib cream (FDA approved in 2021)',
      'Complementary approaches:',
      'Sunscreen use',
      'Cosmetic camouflage (makeup, self-tanners)',
      'Psychological support'
    ],
    preventions: [
      'No known prevention for vitiligo development',
      'Possible preventive measures for progression or recurrence:',
      'Avoiding physical trauma to the skin (Koebner phenomenon)',
      'Using sunscreen to prevent sunburn',
      'Managing stress',
      'Early treatment of developing lesions',
      'Regular monitoring of autoimmune conditions',
      'Maintaining overall health and immune system function'
    ],
    relatedConditions: [
      'autoimmune-thyroid-disease',
      'alopecia-areata',
      'pernicious-anemia',
      'addisons-disease',
      'type-1-diabetes',
      'psoriasis',
      'lupus',
      'rheumatoid-arthritis',
      'albinism',
      'halo-nevus'
    ],
    commonQuestions: [
      {
        question: 'Is vitiligo contagious?',
        answer: 'No, vitiligo is not contagious in any way. You cannot catch vitiligo by touching, living with, or being intimate with a person who has the condition. Vitiligo is an autoimmune condition where the body\'s own immune system mistakenly attacks and destroys melanocytes, the cells that produce skin pigment (melanin). The exact trigger for this autoimmune response isn\'t fully understood, but it involves a combination of genetic predisposition and possibly environmental factors. Since it\'s an internal immune system issue rather than an infection or external agent, there is no possibility of transmission from person to person through physical contact or proximity. People with vitiligo can participate in all normal social activities, including swimming in public pools, sharing food or utensils, and physical intimacy, without any risk of spreading the condition to others.'
      },
      {
        question: 'Can vitiligo be cured?',
        answer: 'Currently, there is no definitive cure for vitiligo that works for everyone. However, several treatments can help restore skin color or even stop the progression of depigmentation in many patients. The effectiveness of treatments varies greatly among individuals, with some experiencing significant repigmentation while others see minimal improvement. Recent advances in treatment include topical Janus kinase (JAK) inhibitors like ruxolitinib cream (FDA approved in 2021), which has shown promising results in clinical trials. The most effective conventional treatments include narrowband ultraviolet B (NB-UVB) phototherapy, topical corticosteroids, calcineurin inhibitors, and various surgical techniques for stable vitiligo. Treatment outcomes tend to be better when vitiligo is caught early, affects the face and neck region, and in darker skin types. Even without complete repigmentation, many people with vitiligo lead fulfilling lives, aided by support groups, psychological counseling, and cosmetic camouflage techniques. Research continues into new therapies targeting the autoimmune aspects of the disease, offering hope for more effective treatments in the future.'
      },
      {
        question: 'Does vitiligo affect overall health?',
        answer: 'Vitiligo itself does not generally affect overall physical health or life expectancy. It primarily causes cosmetic changes to the skin and doesn\'t lead to physical pain or organ dysfunction. However, there are several important health considerations for people with vitiligo: 1) Increased sun sensitivity in depigmented areas due to lack of protective melanin, raising the risk of sunburn and potentially skin cancer; 2) Higher incidence of other autoimmune conditions, particularly thyroid disorders (found in approximately 15-25% of vitiligo patients), alopecia areata, and pernicious anemia; 3) Psychological impact, including depression, anxiety, and social stigma, which can significantly affect quality of life and mental health; 4) Ocular abnormalities in some cases, including uveitis and retinal pigment changes; 5) Hearing abnormalities in rare cases, particularly in syndromic forms of vitiligo. Regular health monitoring is recommended, including thyroid function tests, comprehensive eye exams, and mental health assessments as needed. While vitiligo itself isn\'t physically debilitating, managing these associated health aspects is an important part of comprehensive care.'
      }
    ],
    emergencySigns: [
      'Vitiligo itself is not a medical emergency',
      'Seek immediate care for:',
      'Severe allergic reactions to treatment medications',
      'Excessive skin burning from phototherapy',
      'Signs of skin infection in treated areas',
      'Severe psychological distress or suicidal thoughts related to body image'
    ],
    prevalence: 'Vitiligo affects approximately 0.5-2% of the global population, with an estimated 70 million people worldwide living with the condition. The prevalence varies by region and population, with some studies showing higher rates in certain geographic areas. The condition can develop at any age, but about 50% of cases begin before age 20, with the peak onset between 10-30 years old. Vitiligo affects all races and both sexes equally, though it may be more noticeable and psychologically impactful in people with darker skin tones.',
    affectedGroups: [
      'All racial and ethnic groups (equally common but more visible in darker skin)',
      'All genders (affects males and females equally)',
      'Most commonly begins in childhood or young adulthood (before age 30)',
      'People with family history of vitiligo (30% have a family member with the condition)',
      'Individuals with other autoimmune diseases',
      'People with certain genetic markers (over 50 susceptibility loci identified)',
      'Those who have experienced significant physical or emotional stress (potential trigger)',
      'Occupational exposure to certain chemicals may increase risk in some populations'
    ],
    references: [
      {
        id: '1',
        text: 'Ezzedine K, Eleftheriadou V, Whitton M, van Geel N. (2015). "Vitiligo". Lancet. 386 (9988): 74-84.',
        url: 'https://doi.org/10.1016/S0140-6736(14)60763-7'
      },
      {
        id: '2',
        text: 'Bergqvist C, Ezzedine K. (2020). "Vitiligo: A Review". Dermatology. 236 (6): 571-592.',
        url: 'https://doi.org/10.1159/000506103'
      },
      {
        id: '3',
        text: 'Rodrigues M, Ezzedine K, Hamzavi I, et al. (2017). "New discoveries in the pathogenesis and classification of vitiligo". Journal of the American Academy of Dermatology. 77 (1): 1-13.',
        url: 'https://doi.org/10.1016/j.jaad.2016.10.048'
      },
      {
        id: '4',
        text: 'Harris JE. (2016). "Cellular stress and innate inflammation in organ-specific autoimmunity: lessons learned from vitiligo". Immunological Reviews. 269 (1): 11-25.',
        url: 'https://doi.org/10.1111/imr.12369'
      },
      {
        id: '5',
        text: 'Speeckaert R, van Geel N. (2017). "Vitiligo: An Update on Pathophysiology and Treatment Options". American Journal of Clinical Dermatology. 18 (6): 733-744.',
        url: 'https://doi.org/10.1007/s40257-017-0298-5'
      }
    ]
  },
  {
    id: 'zika-virus',
    name: 'Zika Virus Disease',
    description: 'A mosquito-borne viral infection primarily transmitted by Aedes mosquitoes, the same type that transmits dengue, chikungunya, and yellow fever.[1] While most Zika virus infections cause mild or no symptoms, infection during pregnancy can cause severe birth defects, including microcephaly and other congenital abnormalities.[2] The virus can also be transmitted sexually, through blood transfusion, and from mother to fetus during pregnancy.[3] First identified in Uganda in 1947, Zika gained international attention after outbreaks in the Pacific islands and the Americas in 2015-2016.[4] There is currently no specific treatment or vaccine available.[5]',
    category: 'infectious-diseases',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Zika_virus',
    symptoms: [
      'Most infections (80%) cause no symptoms',
      'Mild fever',
      'Rash (usually maculopapular, starting on the face and spreading)',
      'Joint pain (arthralgia)',
      'Muscle pain (myalgia)',
      'Conjunctivitis (red eyes)',
      'Headache',
      'Eye pain',
      'Fatigue',
      'Rarely: Guillain-Barré syndrome (neurological complication)',
      'In pregnant women: no specific symptoms, but can cause fetal abnormalities'
    ],
    causes: [
      'Infection with Zika virus (a flavivirus)',
      'Primary transmission through bite of infected Aedes mosquitoes (mainly Aedes aegypti)',
      'Sexual transmission (from both male and female partners)',
      'Mother-to-child transmission during pregnancy or around birth',
      'Blood transfusion (rare)',
      'Laboratory exposure (very rare)'
    ],
    transmissions: [
      'Mosquito bites (primary mode)',
      'Sexual contact with infected individual',
      'From mother to fetus during pregnancy',
      'Blood transfusion (theoretical risk)',
      'Not spread through casual contact, coughing, or sneezing'
    ],
    treatments: [
      'No specific antiviral treatment available',
      'Supportive care:',
      'Rest',
      'Hydration',
      'Acetaminophen for fever and pain',
      'Avoiding aspirin and NSAIDs until dengue is ruled out (risk of bleeding)',
      'For pregnant women: regular monitoring of fetal development',
      'For Guillain-Barré syndrome: immunoglobulin therapy, plasmapheresis'
    ],
    preventions: [
      'Mosquito bite prevention:',
      'Using insect repellents containing DEET, picaridin, or IR3535',
      'Wearing long-sleeved shirts and long pants',
      'Using mosquito nets and window/door screens',
      'Eliminating standing water where mosquitoes breed',
      'Sexual transmission prevention:',
      'Abstaining from sex or using condoms if traveling to or living in areas with Zika',
      'For pregnant women: avoiding travel to areas with active Zika transmission',
      'For those planning pregnancy: following guidelines on waiting periods after potential exposure',
      'No vaccine currently available (several in development)'
    ],
    relatedConditions: [
      'congenital-zika-syndrome',
      'microcephaly',
      'guillain-barre-syndrome',
      'dengue-fever',
      'chikungunya',
      'yellow-fever',
      'west-nile-virus'
    ],
    commonQuestions: [
      {
        question: 'How long does Zika virus stay in the body?',
        answer: 'Zika virus typically remains in the blood for about a week after symptoms begin, though it can persist longer in some people. However, the virus can remain in other bodily fluids for extended periods: in semen, Zika RNA has been detected for up to 3 months (with potential infectivity for 69 days); in vaginal fluids for up to 14 days; and in urine for up to 20 days. The virus can also persist in pregnant women and be transmitted to the developing fetus throughout pregnancy. In most people with symptomatic infection, the body clears the virus completely, and immunity develops, though it\'s unclear how long this immunity lasts. Once a person has recovered and the virus is cleared from the bloodstream, they are not at risk of developing Zika-related birth defects in future pregnancies. Current CDC guidelines recommend that men who have traveled to areas with Zika wait at least 3 months before trying to conceive with their partners, and that women wait at least 2 months.'
      },
      {
        question: 'What birth defects can Zika virus cause?',
        answer: 'Zika virus infection during pregnancy can cause a constellation of severe birth defects known as Congenital Zika Syndrome. The five distinct features of this syndrome include: 1) Severe microcephaly (abnormally small head size) with partially collapsed skull; 2) Thin cerebral cortex with subcortical calcifications; 3) Eye abnormalities, including macular scarring and focal pigmentary retinal mottling; 4) Congenital contractures or limited joint movement, such as clubfoot or arthrogryposis; and 5) Marked hypertonia (excessive muscle tension) leading to spasticity and restricted body movement. Beyond these defining features, Zika-related birth defects may also include brain damage and neurological problems even without microcephaly, hearing loss, seizures, vision problems, feeding difficulties, and developmental delays. The risk of birth defects is highest when infection occurs in the first trimester, estimated at 5-15%, though infection at any stage of pregnancy can cause complications. Not all infected pregnancies result in birth defects.'
      },
      {
        question: 'Is there a vaccine for Zika virus?',
        answer: 'Currently, there is no approved vaccine for Zika virus, though several candidates are in various stages of development. After the 2015-2016 outbreaks, multiple vaccine candidates advanced to clinical trials, including DNA vaccines, mRNA vaccines, inactivated virus vaccines, and viral vector vaccines. Some reached Phase 2 clinical trials, but development slowed significantly after Zika cases declined worldwide. This decline presented challenges for vaccine testing, as large-scale efficacy trials require active transmission. Additionally, funding priorities shifted as the immediate public health emergency subsided. The COVID-19 pandemic further diverted resources from Zika vaccine development. However, research continues, with some promising candidates still being studied. The success of mRNA technology for COVID-19 vaccines has reinvigorated interest in applying similar platforms to Zika. Until a vaccine becomes available, prevention focuses on avoiding mosquito bites and taking precautions against sexual transmission in affected areas.'
      }
    ],
    emergencySigns: [
      'Severe headache',
      'High fever',
      'Stiff neck',
      'Confusion',
      'Seizures',
      'Muscle weakness or paralysis (signs of Guillain-Barré syndrome)',
      'During pregnancy: decreased fetal movement, abnormal fetal ultrasound findings'
    ],
    prevalence: 'Since the major outbreaks of 2015-2016, Zika virus transmission has declined substantially worldwide. Prior to those outbreaks, major epidemics occurred in French Polynesia (2013-2014) and Yap Island, Micronesia (2007). During the peak of the epidemic in the Americas, 48 countries and territories reported local transmission. Currently, low-level transmission continues in some areas, primarily in tropical regions where the Aedes mosquito vector is present.',
    affectedGroups: [
      'People living in or traveling to areas with active Zika transmission (primarily tropical and subtropical regions)',
      'Pregnant women (highest risk group due to potential for fetal harm)',
      'Sexual partners of those infected or exposed to Zika',
      'Young adults (most commonly diagnosed age group)',
      'Those without prior immunity',
      'People living in areas with limited mosquito control and poor housing conditions',
      'Outdoor workers with high mosquito exposure'
    ],
    references: [
      {
        id: '1',
        text: 'Pielnaa P, Al-Saadawe M, Saro A, et al. (2020). "Zika virus-spread, epidemiology, genome, transmission cycle, clinical manifestation, associated challenges, vaccine and antiviral drug development". Virology. 543: 34-42.',
        url: 'https://doi.org/10.1016/j.virol.2020.01.015'
      },
      {
        id: '2',
        text: 'Moore CA, Staples JE, Dobyns WB, et al. (2017). "Characterizing the Pattern of Anomalies in Congenital Zika Syndrome for Pediatric Clinicians". JAMA Pediatrics. 171 (3): 288-295.',
        url: 'https://doi.org/10.1001/jamapediatrics.2016.3982'
      },
      {
        id: '3',
        text: 'Gregory CJ, Oduyebo T, Brault AC, et al. (2017). "Modes of Transmission of Zika Virus". The Journal of Infectious Diseases. 216 (suppl_10): S875-S883.',
        url: 'https://doi.org/10.1093/infdis/jix396'
      },
      {
        id: '4',
        text: 'Musso D, Gubler DJ. (2016). "Zika Virus". Clinical Microbiology Reviews. 29 (3): 487-524.',
        url: 'https://doi.org/10.1128/CMR.00072-15'
      },
      {
        id: '5',
        text: 'Poland GA, Kennedy RB, Ovsyannikova IG, et al. (2019). "Development of vaccines against Zika virus". The Lancet Infectious Diseases. 19 (5): e145-e146.',
        url: 'https://doi.org/10.1016/S1473-3099(18)30063-X'
      }
    ]
  },
  {
    id: 'varicose-veins',
    name: 'Varicose Veins',
    description: 'Enlarged, twisted veins that most commonly appear in the legs and feet.[1] They develop when the valves in the veins that regulate blood flow become damaged or weakened, causing blood to pool and veins to swell.[2] While often a cosmetic concern, varicose veins can cause discomfort and lead to more serious problems in some cases.[3] They affect approximately 23% of adults worldwide, with women being more commonly affected than men.[4]',
    category: 'heart-and-circulation',
    subcategory: 'vascular-disorders',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Varicose_veins',
    symptoms: [
      'Visible, dark purple or blue veins',
      'Twisted, bulging veins that appear cord-like',
      'Aching or heavy feeling in the legs',
      'Burning, throbbing, muscle cramping, and swelling in the lower legs',
      'Worsened pain after sitting or standing for long periods',
      'Itching around veins',
      'Skin discoloration around the affected vein',
      'Pain that improves with walking or elevating the legs',
      'Restless legs',
      'Night cramps'
    ],
    causes: [
      'Age (veins lose elasticity over time)',
      'Pregnancy (increased blood volume and pressure on veins)',
      'Family history (genetic predisposition)',
      'Obesity (extra weight puts pressure on veins)',
      'Standing or sitting for long periods',
      'Gender (women are more likely to develop them)',
      'Previous deep vein thrombosis',
      'Congenital vein abnormalities',
      'Increased abdominal pressure (from tumors, constipation, or tight garments)',
      'Hormonal influences (puberty, pregnancy, menopause, birth control pills)'
    ],
    treatments: [
      'Conservative approaches:',
      'Compression stockings',
      'Regular exercise',
      'Elevating the legs',
      'Avoiding long periods of standing or sitting',
      'Weight management',
      'Medical procedures:',
      'Sclerotherapy (injection of solution to close veins)',
      'Laser treatment (uses strong bursts of light)',
      'Radiofrequency ablation (uses heat)',
      'Endovenous laser ablation (uses laser energy)',
      'Ambulatory phlebectomy (removal through small incisions)',
      'Vein stripping and ligation (surgical removal)',
      'Endoscopic vein surgery (for severe cases with leg ulcers)'
    ],
    preventions: [
      'Regular physical activity to improve circulation',
      'Maintaining a healthy weight',
      'Avoiding high heels and tight hosiery',
      'Elevating legs when resting',
      'Changing sitting or standing position regularly',
      'Wearing compression stockings if at risk',
      'Low-salt, high-fiber diet to prevent water retention and constipation',
      'Avoiding crossing legs when sitting'
    ],
    relatedConditions: [
      'chronic-venous-insufficiency',
      'deep-vein-thrombosis',
      'superficial-thrombophlebitis',
      'venous-ulcers',
      'spider-veins',
      'hemorrhoids',
      'lymphedema',
      'may-thurner-syndrome'
    ],
    commonQuestions: [
      {
        question: 'Are varicose veins dangerous?',
        answer: 'While varicose veins are often primarily a cosmetic concern, they can sometimes lead to more serious problems. Most people with varicose veins don\'t develop complications, but potential risks include: venous eczema (skin rash); lipodermatosclerosis (hardening of fat under the skin); bleeding (if the vein is injured); superficial thrombophlebitis (painful blood clots); venous ulcers (painful sores near the ankles); and deep vein thrombosis (rare, but serious). Risk factors for complications include older age, obesity, pregnancy, and a history of blood clots. It\'s advisable to seek medical attention if you experience severe pain, swelling, warmth, or redness, if the vein becomes hard or tender, if a sore develops, or if symptoms interfere with daily activities. Regular follow-up with healthcare providers can help monitor for potential complications.'
      },
      {
        question: 'Will varicose veins go away on their own?',
        answer: 'Varicose veins typically don\'t go away on their own once they\'ve developed. The structural changes in the veins—weakened valves and stretched vein walls—are generally permanent without intervention. However, symptoms may fluctuate and can sometimes improve with self-care measures like regular exercise, weight management, leg elevation, and wearing compression stockings. In some cases, such as pregnancy-related varicose veins, the condition may improve after childbirth as hormonal levels and abdominal pressure normalize, though they may not disappear completely. For persistent or bothersome varicose veins, medical treatments like sclerotherapy, laser therapy, or surgical options can effectively eliminate the affected veins. It\'s important to note that treating existing varicose veins doesn\'t prevent new ones from forming, so ongoing preventive measures are important.'
      },
      {
        question: 'What\'s the difference between spider veins and varicose veins?',
        answer: 'Spider veins and varicose veins differ in size, appearance, and sometimes symptoms. Spider veins (telangiectasias) are smaller, thin lines (1 mm or less) that appear red, purple, or blue and often resemble spider webs or tree branches just beneath the skin surface. They\'re usually flat or slightly raised and most commonly appear on the legs and face. Spider veins rarely cause physical symptoms beyond cosmetic concerns. Varicose veins, in contrast, are larger (typically >3 mm in diameter), raised, swollen, and twisted veins that often appear blue or dark purple. They commonly develop in the legs and can cause physical symptoms like aching, heaviness, swelling, and discomfort. Both conditions result from venous insufficiency, but varicose veins represent a more advanced stage of venous disease. While spider veins are primarily a cosmetic issue, varicose veins can sometimes lead to complications if left untreated. Treatment options exist for both conditions, with spider veins typically requiring less invasive procedures.'
      }
    ],
    emergencySigns: [
      'Bleeding from a varicose vein',
      'Sudden increase in swelling or pain',
      'Formation of ulcers or sores',
      'Hardening of the vein with warmth and redness (may indicate thrombophlebitis)',
      'Severe leg pain with swelling, warmth, and redness (may indicate deep vein thrombosis)'
    ],
    prevalence: 'Varicose veins affect approximately 23% of adults worldwide. The prevalence increases with age, affecting about 22% of people aged 30-40 and over 80% of people by age 80. Women are more commonly affected than men, with a female-to-male ratio of about 3:1. The prevalence varies by geographic region and ethnicity, with higher rates reported in Western populations and lower rates in Africa and Asia. Risk factors such as pregnancy, prolonged standing occupations, obesity, and family history significantly influence the development of varicose veins.',
    affectedGroups: [
      'Women (especially after multiple pregnancies)',
      'Older adults (increasing prevalence with age)',
      'People with family history of venous disease',
      'Overweight or obese individuals',
      'People who stand for long periods (e.g., nurses, teachers, retail workers)',
      'Those with history of deep vein thrombosis',
      'Pregnant women',
      'People with occupations requiring prolonged sitting'
    ],
    references: [
      {
        id: '1',
        text: 'Piazza G. (2014). "Varicose veins". Circulation. 130 (7): 582-587.',
        url: 'https://doi.org/10.1161/CIRCULATIONAHA.113.008331'
      },
      {
        id: '2',
        text: 'Hamdan A. (2012). "Management of varicose veins and venous insufficiency". JAMA. 308 (24): 2612-2621.',
        url: 'https://doi.org/10.1001/jama.2012.111352'
      },
      {
        id: '3',
        text: 'Gloviczki P, Comerota AJ, Dalsing MC, et al. (2011). "The care of patients with varicose veins and associated chronic venous diseases: clinical practice guidelines of the Society for Vascular Surgery and the American Venous Forum". Journal of Vascular Surgery. 53 (5 Suppl): 2S-48S.',
        url: 'https://doi.org/10.1016/j.jvs.2011.01.079'
      },
      {
        id: '4',
        text: 'Evans CJ, Fowkes FG, Ruckley CV, Lee AJ. (1999). "Prevalence of varicose veins and chronic venous insufficiency in men and women in the general population: Edinburgh Vein Study". Journal of Epidemiology and Community Health. 53 (3): 149-153.',
        url: 'https://doi.org/10.1136/jech.53.3.149'
      },
      {
        id: '5',
        text: 'O\'Donnell TF, Passman MA, Marston WA, et al. (2014). "Management of venous leg ulcers: clinical practice guidelines of the Society for Vascular Surgery and the American Venous Forum". Journal of Vascular Surgery. 60 (2 Suppl): 3S-59S.',
        url: 'https://doi.org/10.1016/j.jvs.2014.04.049'
      }
    ]
  },
  {
    id: 'yellow-fever',
    name: 'Yellow Fever',
    description: 'A viral hemorrhagic disease transmitted by infected mosquitoes, primarily the Aedes and Haemagogus species.[1] The disease is endemic in tropical areas of Africa and South America.[2] Yellow fever gets its name from the jaundice (yellowing of the skin and eyes) that affects some patients.[3] While many cases are mild, severe yellow fever can cause bleeding, organ failure, and death.[4] Vaccination is highly effective in preventing the disease.[5]',
    category: 'infectious-diseases',
    subcategory: 'viral-hemorrhagic-fevers',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Yellow_fever',
    symptoms: [
      'Initial phase (acute phase, 3-6 days):',
      'Sudden onset of fever',
      'Headache',
      'Muscle pain, particularly back pain',
      'Nausea and vomiting',
      'Loss of appetite',
      'Dizziness',
      'Red eyes, face, or tongue',
      'Relative bradycardia (slow heart rate despite fever)',
      'Remission period (hours to days):',
      'Temporary improvement of symptoms',
      'Toxic phase (15-25% of cases):',
      'Return of high fever',
      'Jaundice (yellowing of skin and eyes)',
      'Abdominal pain with vomiting',
      'Bleeding from mouth, nose, eyes, or stomach',
      'Blood in vomit ("coffee grounds" appearance)',
      'Dark urine',
      'Kidney failure',
      'Liver failure',
      'Delirium, seizures, or coma',
      'Death (in 20-50% of severe cases)'
    ],
    causes: [
      'Infection with yellow fever virus (Flavivirus)',
      'Transmission through bite of infected female mosquitoes:',
      'Aedes species (primarily Aedes aegypti) in urban settings',
      'Haemagogus and Sabethes species in jungle/sylvatic settings',
      'Three transmission cycles:',
      'Sylvatic (jungle) cycle: between monkeys and mosquitoes',
      'Intermediate (savannah) cycle: between humans and mosquitoes in humid or semi-humid areas',
      'Urban cycle: between humans and domestic/peridomestic mosquitoes'
    ],
    treatments: [
      'No specific antiviral treatment exists',
      'Supportive care:',
      'Rest',
      'Fluids and electrolyte management',
      'Oxygen therapy',
      'Blood pressure support',
      'Dialysis for kidney failure',
      'Treatment of secondary infections',
      'Blood transfusions for severe bleeding',
      'Avoiding certain medications:',
      'Aspirin and NSAIDs (may increase bleeding risk)',
      'Medications metabolized by the liver',
      'Intensive care for severe cases'
    ],
    preventions: [
      'Vaccination:',
      'Single dose provides lifelong immunity for most people',
      'Required for travel to endemic areas',
      'Recommended for laboratory workers handling the virus',
      'Mass vaccination campaigns in high-risk areas',
      'Mosquito control measures:',
      'Eliminating breeding sites (standing water)',
      'Insecticide spraying',
      'Larvicides',
      'Personal protection:',
      'Mosquito repellents containing DEET',
      'Wearing long-sleeved clothing',
      'Using bed nets',
      'Staying in screened or air-conditioned rooms',
      'Surveillance and outbreak response'
    ],
    relatedConditions: [
      'dengue-fever',
      'zika-virus',
      'west-nile-virus',
      'viral-hepatitis',
      'malaria',
      'leptospirosis',
      'viral-hemorrhagic-fevers'
    ],
    commonQuestions: [
      {
        question: 'Who should get the yellow fever vaccine?',
        answer: 'The yellow fever vaccine is recommended for: people aged 9 months or older traveling to or living in areas at risk for yellow fever virus transmission in Africa and South America; people traveling to countries that require proof of yellow fever vaccination for entry; and laboratory personnel who work with yellow fever virus. The vaccine is not recommended for: infants younger than 9 months (except during epidemics); people with severe allergies to vaccine components; people with thymus disorders or who have had their thymus removed; people with primary immunodeficiencies or immunosuppression; and people with HIV infection and CD4 counts <200/mm³. Pregnant women, adults 60 years and older, and people with asymptomatic HIV and CD4 counts of 200-499/mm³ should be evaluated on a case-by-case basis. A single dose of yellow fever vaccine provides lifelong protection for most people, though booster doses may be considered for certain high-risk groups.'
      },
      {
        question: 'How is yellow fever diagnosed?',
        answer: 'Diagnosing yellow fever can be challenging, especially in the early stages when symptoms resemble other tropical diseases. Diagnosis typically involves: clinical evaluation of symptoms and travel history to endemic regions; blood tests to detect the virus itself (PCR testing) during the first few days of illness; serological tests to identify antibodies against the virus (IgM and IgG); liver function tests to assess liver damage; and ruling out similar diseases like malaria, dengue fever, and viral hepatitis. Definitive diagnosis often requires specialized laboratory testing available at reference centers. In endemic areas during outbreaks, diagnosis may be based primarily on clinical symptoms and epidemiological context. Early diagnosis is important for implementing appropriate supportive care and public health measures to prevent further transmission.'
      },
      {
        question: 'Is yellow fever still a threat today?',
        answer: 'Yes, yellow fever remains a significant public health threat in endemic regions of Africa and South America, with an estimated 200,000 cases and 30,000 deaths annually. Despite the existence of an effective vaccine, several factors contribute to its continued threat: limited vaccine coverage in some high-risk areas; urbanization and climate change expanding mosquito habitats; international travel potentially introducing the virus to new regions with competent mosquito vectors; vaccine supply limitations during large outbreaks; and challenges in surveillance and healthcare infrastructure in endemic regions. Recent large outbreaks in Angola, Democratic Republic of Congo, and Brazil highlight the ongoing risk. The World Health Organization continues to implement its Global Strategy to Eliminate Yellow Fever Epidemics (EYE), focusing on vaccination, surveillance, and outbreak preparedness to reduce this threat.'
      }
    ],
    emergencySigns: [
      'High fever that returns after initial improvement',
      'Severe abdominal pain with vomiting',
      'Bleeding from mouth, nose, or eyes',
      'Vomiting blood or blood in stool',
      'Yellow skin or eyes (jaundice)',
      'Decreased urination',
      'Confusion, seizures, or coma'
    ],
    prevalence: 'Yellow fever is endemic in tropical areas of Africa and South America, with an estimated 200,000 cases and 30,000 deaths annually worldwide. Africa accounts for about 90% of cases globally. Approximately 900 million people live in 47 countries at risk for yellow fever. Large outbreaks occur periodically, with recent significant epidemics in Angola (2015-2016) and Brazil (2016-2018). The true incidence is likely higher due to underreporting and cases misdiagnosed as other tropical diseases.',
    affectedGroups: [
      'Unvaccinated individuals living in or traveling to endemic areas',
      'People in rural areas near forests or jungles (sylvatic transmission)',
      'Urban populations during outbreaks (urban transmission)',
      'Outdoor workers in endemic regions',
      'Children (often have more severe disease)',
      'People with compromised immune systems',
      'Travelers from non-endemic regions (lack natural immunity)'
    ],
    references: [
      {
        id: '1',
        text: 'Monath TP, Vasconcelos PF. (2015). "Yellow fever". Journal of Clinical Virology. 64: 160-173.',
        url: 'https://doi.org/10.1016/j.jcv.2014.08.030'
      },
      {
        id: '2',
        text: 'World Health Organization. (2023). "Yellow fever". WHO Fact Sheet.',
        url: 'https://www.who.int/news-room/fact-sheets/detail/yellow-fever'
      },
      {
        id: '3',
        text: 'Douam F, Ploss A. (2018). "Yellow Fever Virus: Knowledge Gaps Impeding the Fight Against an Old Foe". Trends in Microbiology. 26 (11): 913-928.',
        url: 'https://doi.org/10.1016/j.tim.2018.05.012'
      },
      {
        id: '4',
        text: 'Paules CI, Fauci AS. (2017). "Yellow Fever - Once Again on the Radar Screen in the Americas". New England Journal of Medicine. 376 (15): 1397-1399.',
        url: 'https://doi.org/10.1056/NEJMp1702172'
      },
      {
        id: '5',
        text: 'Staples JE, Gershman M, Fischer M. (2010). "Yellow Fever Vaccine: Recommendations of the Advisory Committee on Immunization Practices (ACIP)". MMWR Recommendations and Reports. 59 (RR-7): 1-27.',
        url: 'https://www.cdc.gov/mmwr/preview/mmwrhtml/rr5907a1.htm'
      }
    ]
  }
];

export default conditionsUtoZ;
