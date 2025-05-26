import { HealthCondition } from '../healthConditionsData';

/**
 * Health conditions starting with letters J-L
 */
export const conditionsJtoL: HealthCondition[] = [
  {
    id: 'kidney-stones',
    name: 'Kidney Stones (Nephrolithiasis)',
    description: 'Hard deposits made of minerals and salts that form inside the kidneys and can affect any part of the urinary tract.[1] Kidney stones develop when urine becomes concentrated, allowing minerals to crystallize and stick together.[2] Passing kidney stones can be quite painful, but they usually cause no permanent damage if recognized in a timely fashion.[3] Depending on the cause, preventive measures may help reduce the risk of recurrence.[4]',
    category: 'urinary-system',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Kidney_stone_disease',
    symptoms: [
      'Severe pain in the side and back, below the ribs',
      'Pain that radiates to the lower abdomen and groin',
      'Pain that comes in waves and fluctuates in intensity',
      'Pain during urination',
      'Pink, red, or brown urine (indicating blood in urine)',
      'Cloudy or foul-smelling urine',
      'Nausea and vomiting',
      'Persistent need to urinate',
      'Urinating more often than usual',
      'Urinating small amounts',
      'Fever and chills (if infection is present)'
    ],
    causes: [
      'Dehydration (insufficient fluid intake)',
      'Diet high in salt, sugar, and animal protein',
      'Obesity',
      'Family history of kidney stones',
      'Certain medical conditions (inflammatory bowel disease, chronic diarrhea, hyperparathyroidism)',
      'Certain medications (calcium-based antacids, certain diuretics, protease inhibitors)',
      'Urinary tract infections',
      'Metabolic disorders (like cystinuria, hyperoxaluria, hyperuricosuria)',
      'Genetic factors'
    ],
    treatments: [
      'Pain relievers (over-the-counter or prescription)',
      'Medical expulsive therapy (alpha blockers to relax ureter muscles)',
      'Increased fluid intake to help pass the stone',
      'Extracorporeal shock wave lithotripsy (ESWL) - using sound waves to break stones',
      'Ureteroscopy - using a scope to remove or break up stones',
      'Percutaneous nephrolithotomy - surgical removal for larger stones',
      'Parathyroid gland surgery (if hyperparathyroidism is the cause)',
      'Medications specific to stone type (thiazide diuretics, allopurinol, etc.)'
    ],
    preventions: [
      'Drinking plenty of water (2-3 liters daily)',
      'Reducing sodium intake',
      'Limiting animal protein consumption',
      'Avoiding vitamin C supplements (for those prone to calcium oxalate stones)',
      'Eating calcium-rich foods with meals (contrary to old beliefs, dietary calcium can help)',
      'Limiting oxalate-rich foods (for those with calcium oxalate stones)',
      'Medications to prevent stone formation based on stone type',
      'Regular follow-up with healthcare providers for those with recurrent stones'
    ],
    relatedConditions: [
      'urinary-tract-infections',
      'hyperparathyroidism',
      'renal-tubular-acidosis',
      'cystinuria',
      'gout',
      'inflammatory-bowel-disease',
      'chronic-kidney-disease',
      'urinary-tract-obstruction'
    ],
    commonQuestions: [
      {
        question: 'How do I know if I passed my kidney stone?',
        answer: 'You\'ll typically know you\'ve passed a kidney stone when you feel a sudden relief of pain. Some people may actually see the stone in their urine, especially if they\'re straining their urine as advised by their doctor. Kidney stones can range in size from a grain of sand to a pearl or even larger, with most being yellow or brown. After passing a stone, it\'s important to collect it if possible for laboratory analysis to determine its composition, which can help guide prevention strategies. If you had imaging that showed a stone and your symptoms completely resolve, it\'s likely you\'ve passed it, but follow-up with your healthcare provider is still recommended to ensure no stones remain.'
      },
      {
        question: 'What type of kidney stones are most common?',
        answer: 'Calcium stones are the most common type, accounting for about 80% of all kidney stones. These primarily occur in the form of calcium oxalate, though some form as calcium phosphate. Oxalate is a naturally occurring substance found in many foods and is also produced daily by the liver. High oxalate foods include certain fruits and vegetables, nuts, and chocolate. Other types of kidney stones include: struvite stones (usually caused by infections), uric acid stones (often associated with high-protein diets or gout), and cystine stones (rare, hereditary stones). Identifying the stone type through laboratory analysis is important for developing targeted prevention strategies.'
      },
      {
        question: 'Can kidney stones cause permanent damage?',
        answer: 'While most kidney stones don\'t cause permanent damage if treated promptly, complications can occur in some cases. Stones that remain in the kidneys for long periods (staghorn calculi) can lead to chronic kidney damage, recurrent urinary tract infections, or loss of kidney function. Stones that block the flow of urine can cause hydronephrosis (swelling of the kidney) and may lead to kidney damage if not addressed. Recurrent kidney stones over many years might contribute to chronic kidney disease. Additionally, the frequent use of certain pain medications and some stone-preventing medications can affect kidney function over time. This is why proper medical evaluation and treatment of kidney stones, as well as preventive measures for those prone to recurrence, are important.'
      }
    ],
    emergencySigns: [
      'Severe pain that prevents finding a comfortable position',
      'Pain accompanied by nausea and vomiting',
      'Fever and chills (indicating possible infection)',
      'Blood in urine',
      'Difficulty passing urine',
      'Signs of sepsis (confusion, rapid breathing, extreme pain)'
    ],
    prevalence: 'Kidney stones affect approximately 1 in 11 people in the United States. The lifetime risk of developing kidney stones is about 9% for women and 19% for men. The prevalence has increased in recent decades, possibly due to dietary and lifestyle changes, as well as global warming increasing the risk of dehydration. Stone recurrence is common, with about 50% of people experiencing another stone within 5-10 years without preventive measures.',
    affectedGroups: [
      'Men (more commonly affected than women)',
      'Adults between 30-60 years old',
      'People with family history of kidney stones',
      'Those living in hot, dry climates or high temperatures',
      'People with certain medical conditions (IBD, gout, obesity, diabetes, hyperparathyroidism)',
      'Those with history of gastric bypass or other intestinal surgeries',
      'People with recurrent urinary tract infections',
      'Individuals with sedentary lifestyles'
    ],
    references: [
      {
        id: '1',
        text: 'Scales CD Jr, Smith AC, Hanley JM, Saigal CS. (2012). "Prevalence of kidney stones in the United States". European Urology. 62 (1): 160-165.',
        url: 'https://doi.org/10.1016/j.eururo.2012.03.052'
      },
      {
        id: '2',
        text: 'Pearle MS, Goldfarb DS, Assimos DG, et al. (2014). "Medical management of kidney stones: AUA guideline". Journal of Urology. 192 (2): 316-324.',
        url: 'https://doi.org/10.1016/j.juro.2014.05.006'
      },
      {
        id: '3',
        text: 'Romero V, Akpinar H, Assimos DG. (2010). "Kidney stones: a global picture of prevalence, incidence, and associated risk factors". Reviews in Urology. 12 (2-3): e86-e96.',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2931286/'
      },
      {
        id: '4',
        text: 'Worcester EM, Coe FL. (2010). "Clinical practice. Calcium kidney stones". New England Journal of Medicine. 363 (10): 954-963.',
        url: 'https://doi.org/10.1056/NEJMcp1001011'
      },
      {
        id: '5',
        text: 'Ferraro PM, Taylor EN, Gambaro G, Curhan GC. (2017). "Dietary and Lifestyle Risk Factors Associated with Incident Kidney Stones in Men and Women". Journal of Urology. 198 (4): 858-863.',
        url: 'https://doi.org/10.1016/j.juro.2017.03.124'
      }
    ]
  },
  {
    id: 'jaundice',
    name: 'Jaundice',
    description: 'A condition characterized by yellowing of the skin, mucous membranes, and the whites of the eyes (sclera) due to increased levels of bilirubin in the blood.[1] Jaundice itself is not a disease but a sign of an underlying condition affecting the liver, bile ducts, or red blood cells.[2] It occurs when the body cannot properly process bilirubin, a yellow-orange pigment produced during the normal breakdown of red blood cells.[3] There are three main types: pre-hepatic (before the liver), hepatic (within the liver), and post-hepatic (after the liver).[4]',
    category: 'digestive-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Jaundice',
    symptoms: [
      'Yellowing of the skin and whites of the eyes',
      'Dark urine',
      'Pale or clay-colored stools',
      'Itching (pruritus)',
      'Fatigue',
      'Abdominal pain or discomfort',
      'Nausea and vomiting',
      'Weight loss',
      'Fever (in some cases)',
      'Cognitive changes (in severe cases)'
    ],
    causes: [
      'Pre-hepatic causes (increased red blood cell breakdown): Hemolytic anemias, sickle cell disease, thalassemia',
      'Hepatic causes (liver problems): Hepatitis, cirrhosis, alcoholic liver disease, medication-induced liver injury',
      'Post-hepatic causes (bile duct obstruction): Gallstones, pancreatic cancer, bile duct cancer, bile duct strictures',
      'Genetic disorders: Gilbert\'s syndrome, Crigler-Najjar syndrome',
      'Infections: Viral hepatitis, leptospirosis, malaria',
      'Neonatal jaundice in newborns due to immature liver function'
    ],
    treatments: [
      'Treating the underlying cause',
      'Medication adjustments if drug-induced',
      'Phototherapy for neonatal jaundice',
      'Surgery for bile duct obstructions',
      'Lifestyle changes for alcohol-related liver disease',
      'Antiviral medications for viral hepatitis',
      'Blood transfusions for severe hemolytic disorders',
      'Liver transplantation in severe cases of liver failure'
    ],
    preventions: [
      'Vaccination against hepatitis A and B',
      'Avoiding excessive alcohol consumption',
      'Practicing safe sex to prevent hepatitis B and C',
      'Using clean needles and avoiding needle sharing',
      'Maintaining a healthy diet and weight',
      'Avoiding potentially hepatotoxic medications',
      'Early treatment of conditions that can lead to jaundice'
    ],
    relatedConditions: [
      'hepatitis',
      'cirrhosis',
      'gallstones',
      'hemolytic-anemia',
      'liver-cancer',
      'pancreatic-cancer',
      'bile-duct-cancer',
      'gilberts-syndrome'
    ],
    commonQuestions: [
      {
        question: 'Is jaundice dangerous?',
        answer: 'Jaundice itself is not dangerous but is a sign of an underlying condition that may range from mild to severe. In adults, jaundice always requires medical evaluation to determine its cause. Some conditions causing jaundice, such as hepatitis or bile duct obstruction, can be serious and require prompt treatment. In newborns, mild jaundice is common and often resolves without treatment, but severe jaundice requires medical intervention to prevent complications.'
      },
      {
        question: 'How is jaundice diagnosed?',
        answer: 'Diagnosis begins with a physical examination and medical history. Blood tests measure bilirubin levels and assess liver function. Imaging tests such as ultrasound, CT scans, or MRI may be used to check for bile duct blockages or liver abnormalities. Additional tests may include liver biopsy, endoscopic retrograde cholangiopancreatography (ERCP), or magnetic resonance cholangiopancreatography (MRCP) to visualize the bile ducts in detail.'
      },
      {
        question: 'How long does jaundice last?',
        answer: 'The duration of jaundice depends on its underlying cause. Neonatal jaundice typically resolves within 1-2 weeks. In adults, viral hepatitis may cause jaundice lasting several weeks to months. Jaundice caused by medications often improves after stopping the medication. For chronic liver diseases or bile duct blockages, jaundice may persist until the underlying condition is effectively treated. Follow-up with healthcare providers is essential to monitor recovery.'
      }
    ],
    prevalence: 'Jaundice is rare in adults, with an annual incidence of approximately 0.74 per 1000 individuals over age 45. It is much more common in newborns, affecting up to 60% of full-term babies and 80% of premature babies in the first week of life.',
    affectedGroups: [
      'Newborns, especially premature infants',
      'People with liver diseases',
      'Individuals with hereditary blood disorders',
      'People with bile duct or gallbladder disorders',
      'Those with certain infections (hepatitis, malaria, leptospirosis)',
      'Heavy alcohol users',
      'People taking certain medications with hepatotoxic effects'
    ],
    references: [
      {
        id: '1',
        text: 'Roche SP, Kobos R (2004). "Jaundice in the adult patient". American Family Physician. 69 (2): 299–304.',
        url: 'https://www.aafp.org/pubs/afp/issues/2004/0115/p299.html'
      },
      {
        id: '2',
        text: 'Fargo MV, Grogan SP, Saguil A (2017). "Evaluation of Jaundice in Adults". American Family Physician. 95 (3): 164–168.',
        url: 'https://www.aafp.org/pubs/afp/issues/2017/0201/p164.html'
      },
      {
        id: '3',
        text: 'Fevery J (2008). "Bilirubin in clinical practice: a review". Liver International. 28 (5): 592–605.',
        url: 'https://doi.org/10.1111/j.1478-3231.2008.01716.x'
      },
      {
        id: '4',
        text: 'Bassari R, Koea JB (2015). "Jaundice associated pruritis: a review of pathophysiology and treatment". World Journal of Gastroenterology. 21 (5): 1404–1413.',
        url: 'https://doi.org/10.3748/wjg.v21.i5.1404'
      },
      {
        id: '5',
        text: 'Taylor A, Stapley S, Hamilton W (2012). "Jaundice in primary care: a cohort study of adults aged >45 years using electronic medical records". Family Practice. 29 (4): 416–420.',
        url: 'https://doi.org/10.1093/fampra/cmr118'
      }
    ]
  },
  {
    id: 'joint-pain',
    name: 'Joint Pain (Arthralgia)',
    description: 'Pain in one or more joints that can vary in intensity from mild discomfort to debilitating pain.[1] Arthralgia (literally meaning "joint pain") is a symptom rather than a specific condition, and can be caused by a wide range of disorders affecting the joints directly or surrounding tissues.[2] It may occur with or without joint inflammation (arthritis).[3] Joint pain can be temporary or chronic, and may significantly impact quality of life and mobility depending on its severity and underlying cause.[4]',
    category: 'bone-and-joint',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Arthralgia',
    symptoms: [
      'Pain in one or more joints',
      'Stiffness or reduced range of motion',
      'Swelling around the joint (in some cases)',
      'Warmth or redness over the joint (if inflammation is present)',
      'Tenderness when touching the joint',
      'Difficulty moving or using the affected joint',
      'Weakness in the joint area',
      'Clicking, popping, or grinding sounds during movement',
      'Pain that worsens with activity or at certain times of day',
      'Joint instability or feeling like the joint might "give way"'
    ],
    causes: [
      'Osteoarthritis (wear and tear of joint cartilage)',
      'Rheumatoid arthritis and other autoimmune disorders',
      'Gout and pseudogout (crystal deposition in joints)',
      'Infection (septic arthritis)',
      'Injury or trauma to the joint',
      'Bursitis (inflammation of fluid-filled sacs that cushion joints)',
      'Tendinitis (inflammation of tendons near joints)',
      'Fibromyalgia',
      'Viral infections',
      'Lyme disease and other tick-borne illnesses',
      'Medications (particularly some antibiotics and antivirals)',
      'Bone cancer or metastatic cancer',
      'Overuse or repetitive strain injuries'
    ],
    treatments: [
      'Over-the-counter pain relievers (acetaminophen, NSAIDs)',
      'Prescription medications for specific underlying conditions',
      'Corticosteroid injections to reduce inflammation',
      'Physical therapy to improve strength and flexibility',
      'Heat or cold therapy',
      'Rest and activity modification',
      'Assistive devices (braces, splints, canes)',
      'Weight loss to reduce stress on weight-bearing joints',
      'Surgery for severe joint damage (joint replacement, repair)',
      'Alternative therapies (acupuncture, massage)',
      'Treatment of underlying conditions causing joint pain'
    ],
    preventions: [
      'Maintaining healthy weight to reduce stress on joints',
      'Regular low-impact exercise to strengthen supporting muscles',
      'Proper warm-up before physical activity',
      'Using proper technique during sports and exercise',
      'Avoiding repetitive movements when possible',
      'Ergonomic workplace adjustments',
      'Balanced diet rich in anti-inflammatory foods',
      'Adequate calcium and vitamin D intake for bone health',
      'Protecting joints during high-risk activities',
      'Early treatment of infections that could affect joints'
    ],
    relatedConditions: [
      'osteoarthritis',
      'rheumatoid-arthritis',
      'gout',
      'lupus',
      'bursitis',
      'tendinitis',
      'fibromyalgia',
      'lyme-disease',
      'ankylosing-spondylitis',
      'psoriatic-arthritis'
    ],
    commonQuestions: [
      {
        question: 'When should I see a doctor about joint pain?',
        answer: 'You should see a doctor for joint pain if you experience severe pain, significant swelling, redness or warmth around a joint, joint deformity, inability to use the joint, or pain that persists for more than a few days. Also seek medical attention if your joint pain follows an injury or is accompanied by fever, unexplained weight loss, or other concerning symptoms. Chronic or recurrent joint pain should always be evaluated by a healthcare provider to identify the underlying cause and prevent further damage.'
      },
      {
        question: 'What\'s the difference between arthritis and arthralgia?',
        answer: 'Arthralgia simply means joint pain, while arthritis refers specifically to joint inflammation. All arthritis involves arthralgia (pain), but not all arthralgia involves inflammation. Arthritis typically presents with additional symptoms like joint swelling, redness, warmth, and morning stiffness lasting more than 30 minutes. Arthralgia without these inflammatory signs may be due to other causes such as injury, overuse, or referred pain from nearby structures.'
      },
      {
        question: 'Can diet affect joint pain?',
        answer: 'Yes, diet can influence joint pain in several ways. Some foods may trigger inflammation in susceptible individuals, potentially worsening conditions like rheumatoid arthritis or gout. Common inflammatory triggers include processed foods, sugar, and certain oils. Conversely, anti-inflammatory diets rich in omega-3 fatty acids, antioxidants, and phytonutrients (found in fatty fish, colorful fruits and vegetables, nuts, and olive oil) may help reduce joint pain. Maintaining a healthy weight through proper diet also reduces stress on weight-bearing joints like knees and hips.'
      }
    ],
    prevalence: 'Joint pain is extremely common, affecting approximately 30% of adults at any given time. The prevalence increases with age, with over 50% of adults over 65 reporting some form of joint pain within the past month. It is one of the most common reasons people seek medical care.',
    affectedGroups: [
      'Older adults (especially those over 65)',
      'Athletes and people with physically demanding occupations',
      'Women (particularly for certain types of arthritis)',
      'People with obesity',
      'Individuals with previous joint injuries',
      'Those with family history of arthritis or autoimmune disorders',
      'People with certain metabolic conditions (like gout)'
    ],
    references: [
      {
        id: '1',
        text: 'Bonakdar RA (2017). "Targeting Systemic Inflammation in Patients With Obesity-related Pain: Obesity- related Pain: Time for a New Approach That Targets Systemic Inflammation". The Journal of Family Practice. 66 (2): S14–S19.',
        url: 'https://www.mdedge.com/familymedicine/article/130059/pain/targeting-systemic-inflammation-patients-obesity-related-pain'
      },
      {
        id: '2',
        text: 'Woolf AD (2003). "The bone and joint decade 2000-2010". Annals of the Rheumatic Diseases. 59 (2): 81–82.',
        url: 'https://doi.org/10.1136/ard.59.2.81'
      },
      {
        id: '3',
        text: 'Croft P, Blyth FM, van der Windt D (2010). "Chronic Pain Epidemiology - From Aetiology to Public Health". Oxford University Press.',
        url: 'https://doi.org/10.1093/acprof:oso/9780199235766.001.0001'
      },
      {
        id: '4',
        text: 'Heidari B (2011). "Knee osteoarthritis prevalence, risk factors, pathogenesis and features: Part I". Caspian Journal of Internal Medicine. 2 (2): 205–212.',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3766936/'
      },
      {
        id: '5',
        text: 'Neogi T (2013). "The epidemiology and impact of pain in osteoarthritis". Osteoarthritis and Cartilage. 21 (9): 1145–1153.',
        url: 'https://doi.org/10.1016/j.joca.2013.03.018'
      }
    ]
  },
  {
    id: 'laryngitis',
    name: 'Laryngitis',
    description: 'An inflammatory condition of the larynx (voice box) characterized by swelling and irritation of the vocal cords.[1] Laryngitis can be acute (short-term) or chronic (long-lasting), with acute cases typically caused by viral infections and resolving within one to two weeks.[2] Chronic laryngitis persists for more than three weeks and may result from ongoing irritation or infection.[3] The condition primarily affects the voice, causing hoarseness or temporary loss of voice, and may be accompanied by pain, dry cough, and difficulty swallowing.[4]',
    category: 'respiratory',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Laryngitis',
    symptoms: [
      'Hoarse, raspy voice or complete voice loss',
      'Dry or sore throat',
      'Sensation of tickling or rawness in the throat',
      'Dry cough',
      'Difficulty speaking or pain when speaking',
      'Need to clear throat frequently',
      'Altered pitch or volume of voice',
      'Sensation of a lump in the throat',
      'Difficulty swallowing',
      'Mild fever (in infectious cases)'
    ],
    causes: [
      'Viral infections (most common cause of acute laryngitis, including rhinovirus, influenza, and coronavirus)',
      'Bacterial infections (streptococcus, Haemophilus influenzae)',
      'Fungal infections (Candida, especially in immunocompromised individuals)',
      'Vocal strain from overuse (yelling, singing, talking excessively)',
      'Irritants like cigarette smoke, alcohol, or chemical fumes',
      'Gastroesophageal reflux disease (GERD) or laryngopharyngeal reflux',
      'Allergies to dust, mold, or pollen',
      'Exposure to dry air or low humidity environments',
      'Inhalation injuries from smoke or steam',
      'Autoimmune disorders affecting the larynx'
    ],
    treatments: [
      'Voice rest (reducing or eliminating talking)',
      'Increasing fluid intake to stay hydrated',
      'Humidification of air (using a humidifier)',
      'Over-the-counter pain relievers for discomfort',
      'Gargling with warm salt water to relieve throat pain',
      'Avoiding decongestants which may dry the throat',
      'Antibiotics (only for bacterial laryngitis)',
      'Corticosteroids for severe inflammation',
      'Antacids or proton pump inhibitors for reflux-related cases',
      'Voice therapy for chronic or recurring cases'
    ],
    preventions: [
      'Avoiding excessive voice use or strain',
      'Proper hydration by drinking plenty of fluids',
      'Using a humidifier in dry environments',
      'Avoiding smoking and secondhand smoke',
      'Limiting alcohol and caffeine consumption',
      'Practicing good hand hygiene to prevent viral infections',
      'Managing allergies and acid reflux effectively',
      'Avoiding clearing the throat or whispering (which strains vocal cords)',
      'Using a microphone when speaking to large groups',
      'Maintaining proper vocal techniques for singers and public speakers'
    ],
    relatedConditions: [
      'pharyngitis',
      'tonsillitis',
      'vocal-cord-nodules',
      'gastroesophageal-reflux-disease',
      'common-cold',
      'influenza',
      'bronchitis',
      'epiglottitis',
      'croup',
      'sinusitis'
    ],
    commonQuestions: [
      {
        question: 'How long does laryngitis typically last?',
        answer: 'Acute laryngitis usually resolves within one to two weeks, particularly when caused by a viral infection or vocal strain. However, chronic laryngitis lasts longer than three weeks and may persist for months if the underlying cause is not addressed. Cases resulting from vocal misuse typically improve with voice rest, while those caused by infections resolve once the infection clears. Persistent symptoms lasting more than two weeks should be evaluated by a healthcare provider to rule out more serious conditions.'
      },
      {
        question: 'Is laryngitis contagious?',
        answer: 'Laryngitis itself is not contagious, but the infections that cause it often are. When laryngitis is caused by viral or bacterial infections such as the common cold, flu, or strep throat, these underlying infections can spread from person to person through respiratory droplets or direct contact. However, laryngitis that results from vocal strain, allergies, reflux, or irritants is not contagious. Practicing good hygiene, including handwashing and avoiding sharing personal items, can help prevent the spread of infectious causes of laryngitis.'
      },
      {
        question: 'When should I see a doctor for laryngitis?',
        answer: 'You should consult a healthcare provider if your laryngitis symptoms last longer than two weeks, if you have difficulty breathing or swallowing, if you cough up blood, if you have a high fever (above 103°F or 39.4°C), or if you experience severe throat pain. Additionally, if you rely on your voice professionally (such as singers, teachers, or public speakers) or if laryngitis recurs frequently, medical evaluation is recommended. Children with symptoms of croup (barking cough, stridor) should receive prompt medical attention as this can indicate more serious airway inflammation.'
      }
    ],
    emergencySigns: [
      'Difficulty breathing or shortness of breath',
      'Severe throat pain',
      'Inability to swallow liquids',
      'High fever with throat pain',
      'Drooling (especially in children)',
      'Stridor (high-pitched breathing sound)',
      'Coughing up blood',
      'Symptoms lasting more than 2-3 weeks'
    ],
    prevalence: 'Laryngitis is a common condition affecting approximately 3-6% of the general population each year. Acute viral laryngitis is particularly common during cold and flu season. Voice professionals like teachers, singers, and public speakers have a higher incidence rate, with some studies suggesting up to 50% experience laryngitis at some point in their careers.',
    affectedGroups: [
      'Voice professionals (singers, teachers, public speakers)',
      'People who use their voice excessively',
      'Smokers and those exposed to secondhand smoke',
      'Individuals with allergies or acid reflux',
      'People with respiratory infections',
      'Those who work in polluted or dusty environments',
      'Individuals with compromised immune systems',
      'Children (particularly prone to viral causes and croup)'
    ],
    references: [
      {
        id: '1',
        text: 'Wood JM, Athanasiadis T, Allen J. (2014). "Laryngitis". BMJ. 349: g5827.',
        url: 'https://doi.org/10.1136/bmj.g5827'
      },
      {
        id: '2',
        text: 'Reveiz L, Cardona AF. (2015). "Antibiotics for acute laryngitis in adults". Cochrane Database of Systematic Reviews. 2015(5): CD004783.',
        url: 'https://doi.org/10.1002/14651858.CD004783.pub5'
      },
      {
        id: '3',
        text: 'Feierabend RH, Shahram MN. (2009). "Hoarseness in adults". American Family Physician. 80(4): 363–370.',
        url: 'https://www.aafp.org/pubs/afp/issues/2009/0815/p363.html'
      },
      {
        id: '4',
        text: 'Dominguez LM, Simpson CB. (2015). "Inflammatory diseases of the upper airway: subglottic stenosis". In Flint PW, et al. (eds.), Cummings Otolaryngology (6th ed.). Philadelphia, PA: Elsevier Saunders.',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4518320/'
      },
      {
        id: '5',
        text: 'Cohen SM, Dupont WD, Courey MS. (2006). "Quality-of-life impact of non-neoplastic voice disorders: a meta-analysis". Annals of Otology, Rhinology & Laryngology. 115(2): 128–134.',
        url: 'https://doi.org/10.1177/000348940611500209'
      }
    ]
  },
  {
    id: 'lyme-disease',
    name: 'Lyme Disease',
    description: 'A tick-borne bacterial infection caused by the spirochete Borrelia burgdorferi and transmitted primarily by blacklegged ticks (Ixodes species).[1] Lyme disease is the most common vector-borne disease in the United States and Europe.[2] Initial infection often produces a characteristic expanding rash called erythema migrans (EM), which may be accompanied by flu-like symptoms.[3] If untreated, the bacteria can spread through the bloodstream to affect the joints, heart, and nervous system, resulting in more severe manifestations.[4] Early diagnosis and appropriate antibiotic treatment usually lead to a full recovery.[5]',
    category: 'infectious-diseases',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Lyme_disease',
    symptoms: [
      'Erythema migrans (bull\'s-eye rash) in 70-80% of infected persons',
      'Fatigue',
      'Fever and chills',
      'Headache',
      'Muscle and joint pain',
      'Swollen lymph nodes',
      'Facial palsy (loss of muscle tone on one or both sides of the face)',
      'Intermittent pain in tendons, muscles, joints, and bones',
      'Heart palpitations or irregular heartbeat (Lyme carditis)',
      'Episodes of dizziness or shortness of breath',
      'Inflammation of the brain and spinal cord',
      'Nerve pain or numbness',
      'Shooting pains, numbness, or tingling in the hands or feet',
      'Problems with short-term memory'
    ],
    causes: [
      'Infection with Borrelia bacteria (primarily B. burgdorferi in North America)',
      'Transmission through the bite of infected blacklegged ticks (Ixodes scapularis or Ixodes pacificus in the US)',
      'Ticks must typically be attached for 36-48 hours or more for transmission',
      'Most infections occur through bites from immature ticks called nymphs',
      'Geographical risk varies by region with highest prevalence in Northeast and Upper Midwest United States and parts of Europe',
      'Outdoor activities in wooded or grassy areas increase exposure risk',
      'Seasonal risk highest during late spring through summer'
    ],
    treatments: [
      'Oral antibiotics (doxycycline, amoxicillin, or cefuroxime axetil) for early stages',
      'Intravenous antibiotics for more severe cases or neurological involvement',
      'Standard treatment duration of 10-21 days depending on stage and manifestation',
      'Nonsteroidal anti-inflammatory drugs (NSAIDs) for pain and inflammation',
      'Temporary pacemaker may be needed for severe cardiac manifestations',
      'Supportive therapy for specific symptoms',
      'Physical therapy for persistent joint problems',
      'Rest and limitation of activities during recovery'
    ],
    preventions: [
      'Avoiding tick-infested areas when possible',
      'Wearing long-sleeved shirts and long pants in wooded or grassy areas',
      'Using EPA-registered insect repellents containing DEET, picaridin, or permethrin',
      'Treating clothing and gear with products containing 0.5% permethrin',
      'Checking body and clothing for ticks after being outdoors',
      'Showering within two hours of coming indoors',
      'Removing attached ticks promptly with fine-tipped tweezers',
      'Creating tick-safe zones around homes by clearing leaf litter and brush',
      'Keeping lawns mowed and creating barriers between wooded areas and lawn'
    ],
    relatedConditions: [
      'babesiosis',
      'anaplasmosis',
      'ehrlichiosis',
      'rocky-mountain-spotted-fever',
      'tularemia',
      'powassan-virus-disease',
      'post-treatment-lyme-disease-syndrome',
      'chronic-fatigue-syndrome',
      'fibromyalgia',
      'rheumatoid-arthritis'
    ],
    commonQuestions: [
      {
        question: 'How soon after a tick bite do symptoms of Lyme disease appear?',
        answer: 'The characteristic erythema migrans (EM) or "bull\'s-eye" rash usually appears 3 to 30 days after an infected tick bite, with an average of about 7 days. However, not everyone develops this rash. Early symptoms such as fever, fatigue, headache, and muscle aches typically develop within days to weeks of infection. If untreated, more severe symptoms affecting the joints, heart, and nervous system may occur weeks to months after the initial infection.'
      },
      {
        question: 'Can Lyme disease be transmitted from person to person?',
        answer: 'No, Lyme disease cannot be transmitted from person to person through casual contact, touching, kissing, or sexual intercourse. It is not contagious like a cold or flu. The disease is only transmitted through the bite of an infected tick. There is no evidence that Lyme disease can be transmitted through blood transfusions, but people who have been treated for Lyme disease are generally not accepted as blood donors until they have fully recovered.'
      },
      {
        question: 'What is Post-Treatment Lyme Disease Syndrome (PTLDS)?',
        answer: 'Post-Treatment Lyme Disease Syndrome (PTLDS) refers to a set of persistent symptoms that affect approximately 10-20% of people who have been treated for Lyme disease with a standard course of antibiotics. Symptoms may include fatigue, pain, joint and muscle aches, sleep disturbance, cognitive difficulties, and other symptoms that can last for more than 6 months after treatment. The exact cause of PTLDS is not well understood, and research suggests it may be related to persistent immune system responses rather than ongoing infection. Additional antibiotics have not been shown to be beneficial for PTLDS.'
      }
    ],
    emergencySigns: [
      'Neurological symptoms such as severe headache or stiff neck',
      'Heart palpitations or chest pain',
      'Facial paralysis (Bell\'s palsy)',
      'Severe joint pain and swelling',
      'Dizziness or shortness of breath',
      'High fever that doesn\'t respond to medication',
      'Rash that is warm, red, swollen, or painful'
    ],
    prevalence: 'Approximately 476,000 people are diagnosed and treated for Lyme disease each year in the United States according to CDC estimates. In Europe, approximately 65,000 cases are reported annually, though the actual number is likely much higher due to underreporting. The incidence varies greatly by region, with the highest rates in the northeastern and north-central United States and in central and eastern Europe.',
    affectedGroups: [
      'People who spend time outdoors in wooded or grassy areas',
      'Residents of or visitors to the Northeast and Upper Midwest regions of the United States',
      'Outdoor workers such as forestry workers, landscapers, and park rangers',
      'Children aged 5-14 years who play outdoors',
      'Adults aged 45-64 years',
      'People with occupational or recreational exposure to tick habitats',
      'Pet owners whose animals may bring ticks into the home'
    ],
    references: [
      {
        id: '1',
        text: 'Steere AC, Strle F, Wormser GP, et al. (2016). "Lyme borreliosis". Nature Reviews Disease Primers. 2: 16090.',
        url: 'https://doi.org/10.1038/nrdp.2016.90'
      },
      {
        id: '2',
        text: 'Shapiro ED (2014). "Lyme Disease". New England Journal of Medicine. 370 (18): 1724–1731.',
        url: 'https://doi.org/10.1056/NEJMcp1314325'
      },
      {
        id: '3',
        text: 'Lantos PM, Rumbaugh J, Bockenstedt LK, et al. (2021). "Clinical Practice Guidelines by the Infectious Diseases Society of America (IDSA), American Academy of Neurology (AAN), and American College of Rheumatology (ACR): 2020 Guidelines for the Prevention, Diagnosis, and Treatment of Lyme Disease". Clinical Infectious Diseases. 72 (1): e1–e48.',
        url: 'https://doi.org/10.1093/cid/ciaa1215'
      },
      {
        id: '4',
        text: 'Sanchez E, Vannier E, Wormser GP, Hu LT (2016). "Diagnosis, Treatment, and Prevention of Lyme Disease, Human Granulocytic Anaplasmosis, and Babesiosis: A Review". JAMA. 315 (16): 1767–1777.',
        url: 'https://doi.org/10.1001/jama.2016.2884'
      },
      {
        id: '5',
        text: 'Stanek G, Wormser GP, Gray J, Strle F (2012). "Lyme borreliosis". The Lancet. 379 (9814): 461–473.',
        url: 'https://doi.org/10.1016/S0140-6736(11)60103-7'
      }
    ]
  },
  {
    id: 'leishmaniasis',
    name: 'Leishmaniasis',
    description: 'A parasitic disease transmitted by the bite of infected female phlebotomine sandflies, with several clinical forms that range from self-healing skin sores to severe, potentially fatal systemic infection.[1] The three main forms are cutaneous (affecting the skin), mucocutaneous (affecting skin and mucous membranes), and visceral leishmaniasis or kala-azar (affecting internal organs).[2] The disease is caused by protozoan parasites of the Leishmania genus and is endemic in over 90 countries in tropical and subtropical regions.[3] Risk factors include poverty, malnutrition, deforestation, and urbanization.[4]',
    category: 'infectious-diseases',
    subcategory: 'parasitic-infections',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Leishmaniasis',
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
    ],
    references: [
      {
        id: '1',
        text: 'World Health Organization (2023). "Leishmaniasis". Fact Sheets.',
        url: 'https://www.who.int/news-room/fact-sheets/detail/leishmaniasis'
      },
      {
        id: '2',
        text: 'Burza S, Croft SL, Boelaert M (2018). "Leishmaniasis". Lancet. 392 (10151): 951–970.',
        url: 'https://doi.org/10.1016/S0140-6736(18)31204-2'
      },
      {
        id: '3',
        text: 'Torres-Guerrero E, Quintanilla-Cedillo MR, Ruiz-Esmenjaud J, Arenas R (2017). "Leishmaniasis: a review". F1000Research. 6: 750.',
        url: 'https://doi.org/10.12688/f1000research.11120.1'
      },
      {
        id: '4',
        text: 'Alvar J, Vélez ID, Bern C, et al. (2012). "Leishmaniasis Worldwide and Global Estimates of Its Incidence". PLoS ONE. 7 (5): e35671.',
        url: 'https://doi.org/10.1371/journal.pone.0035671'
      },
      {
        id: '5',
        text: 'McGwire BS, Satoskar AR (2014). "Leishmaniasis: clinical syndromes and treatment". QJM: An International Journal of Medicine. 107 (1): 7–14.',
        url: 'https://doi.org/10.1093/qjmed/hct116'
      }
    ]
  },
  {
    id: 'kawasaki-disease',
    name: 'Kawasaki Disease',
    description: 'A rare acute febrile illness that primarily affects children under the age of 5.[1] It is characterized by inflammation of blood vessels (vasculitis) throughout the body, particularly affecting the coronary arteries that supply blood to the heart.[2] Without prompt treatment, Kawasaki disease can lead to serious cardiac complications, including coronary artery aneurysms.[3] The cause remains unknown, but it is believed to involve an abnormal immune response to an infection or environmental trigger in genetically predisposed individuals.[4]',
    category: 'immune-system',
    subcategory: 'vasculitis',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Kawasaki_disease',
    symptoms: [
      'High fever (above 39°C/102.2°F) lasting at least 5 days',
      'Red, swollen hands and feet, often with peeling skin',
      'Rash on the main part of the body and/or genital area',
      'Red, bloodshot eyes (conjunctivitis) without discharge',
      'Swollen, red, cracked lips and "strawberry tongue"',
      'Swollen lymph nodes in the neck (at least one larger than 1.5 cm)',
      'Extreme irritability',
      'Joint pain and swelling',
      'Diarrhea, vomiting, and abdominal pain',
      'Peeling of skin on fingers and toes (typically 2-3 weeks after fever onset)'
    ],
    causes: [
      'Unknown specific cause',
      'Suspected infectious trigger',
      'Possible genetic predisposition',
      'Environmental factors',
      'Abnormal immune response',
      'Seasonal patterns (more common in winter and spring in non-tropical regions)',
      'Possible link to airborne or waterborne agents'
    ],
    treatments: [
      'High-dose intravenous immunoglobulin (IVIG) within 10 days of fever onset',
      'High-dose aspirin during acute phase',
      'Low-dose aspirin for several weeks after fever subsides',
      'Second IVIG dose or infliximab for IVIG-resistant cases',
      'Corticosteroids in select cases',
      'Cyclosporine for refractory cases',
      'Cardiac monitoring during treatment and follow-up',
      'Long-term cardiac follow-up for patients with coronary artery abnormalities'
    ],
    preventions: [
      'No known prevention methods since the cause is unknown',
      'Prompt recognition and treatment to prevent complications',
      'Regular follow-up care for children with coronary artery abnormalities',
      'Influenza and varicella vaccination for children on long-term aspirin therapy'
    ],
    relatedConditions: [
      'coronary-artery-aneurysm',
      'myocarditis',
      'pericarditis',
      'heart-attack',
      'toxic-shock-syndrome',
      'juvenile-idiopathic-arthritis',
      'scarlet-fever',
      'stevens-johnson-syndrome'
    ],
    commonQuestions: [
      {
        question: 'Is Kawasaki disease contagious?',
        answer: 'Kawasaki disease is not believed to be contagious from person to person. Although the exact cause remains unknown, it is thought to be triggered by an infection or environmental factor in genetically susceptible children, rather than being directly transmitted between individuals. Multiple cases may occur in a community around the same time due to exposure to the same environmental trigger.'
      },
      {
        question: 'How is Kawasaki disease diagnosed?',
        answer: 'There is no specific test for Kawasaki disease. Diagnosis is based on clinical criteria, including fever lasting at least 5 days plus at least 4 of the following: rash, red eyes, red/swollen hands and feet, swollen lymph nodes in the neck, and changes in the lips/mouth. Doctors also use blood tests, urine tests, and echocardiograms to help confirm the diagnosis and monitor for complications.'
      },
      {
        question: 'What are the long-term effects of Kawasaki disease?',
        answer: 'Most children who receive prompt treatment recover fully without long-term problems. However, about 20-25% of untreated children develop coronary artery aneurysms, which can lead to heart attacks, heart failure, or other cardiac issues later in life. Children who develop coronary abnormalities require ongoing cardiology follow-up, and in some cases, lifelong medication or other interventions to prevent complications.'
      }
    ],
    emergencySigns: [
      'Persistent high fever not responding to medication',
      'Extreme irritability',
      'Signs of heart problems (chest pain, rapid or irregular heartbeat, difficulty breathing)',
      'Confusion or excessive drowsiness',
      'Seizures'
    ],
    prevalence: 'Kawasaki disease affects approximately 9-20 per 100,000 children under age 5 in the United States and is most common in children of Asian and Pacific Islander descent. It is more frequent in boys than girls (1.5:1 ratio) and 80% of cases occur in children younger than 5 years of age.',
    affectedGroups: [
      'Children under 5 years of age (80% of cases)',
      'Children of Asian and Pacific Islander descent (highest rates)',
      'Boys (1.5 times more likely than girls)',
      'Children with certain genetic predispositions'
    ],
    references: [
      {
        id: '1',
        text: 'McCrindle BW, Rowley AH, Newburger JW, et al. (2017). "Diagnosis, Treatment, and Long-Term Management of Kawasaki Disease: A Scientific Statement for Health Professionals From the American Heart Association". Circulation. 135 (17): e927–e999.',
        url: 'https://doi.org/10.1161/CIR.0000000000000484'
      },
      {
        id: '2',
        text: 'Newburger JW, Takahashi M, Burns JC (2016). "Kawasaki Disease". Journal of the American College of Cardiology. 67 (14): 1738–1749.',
        url: 'https://doi.org/10.1016/j.jacc.2015.12.073'
      },
      {
        id: '3',
        text: 'Makino N, Nakamura Y, Yashiro M, et al. (2015). "Descriptive epidemiology of Kawasaki disease in Japan, 2011–2012: from the results of the 22nd nationwide survey". Journal of Epidemiology. 25 (3): 239–245.',
        url: 'https://doi.org/10.2188/jea.JE20140089'
      },
      {
        id: '4',
        text: 'Onouchi Y (2018). "The genetics of Kawasaki disease". International Journal of Rheumatic Diseases. 21 (1): 26–30.',
        url: 'https://doi.org/10.1111/1756-185X.13218'
      },
      {
        id: '5',
        text: 'Dietz SM, van Stijn D, Burgner D, et al. (2017). "Dissecting Kawasaki disease: a state-of-the-art review". European Journal of Pediatrics. 176 (8): 995–1009.',
        url: 'https://doi.org/10.1007/s00431-017-2937-5'
      }
    ]
  },
  {
    id: 'keratitis',
    name: 'Keratitis',
    description: 'An inflammatory condition of the cornea, the clear dome-shaped tissue that covers the front of the eye.[1] Keratitis can be caused by infection (bacterial, viral, fungal, or parasitic), injury, or underlying diseases that affect the cornea.[2] The condition often results in pain, redness, light sensitivity, and potentially vision changes if left untreated.[3] The severity ranges from mild irritation to severe inflammation that can lead to corneal scarring, vision loss, or even perforation of the cornea in extreme cases.[4]',
    category: 'eye-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Keratitis',
    symptoms: [
      'Eye pain or discomfort',
      'Redness of the eye',
      'Excessive tearing',
      'Light sensitivity (photophobia)',
      'Blurred or decreased vision',
      'Sensation of something in the eye (foreign body sensation)',
      'Difficulty opening the eyelid due to pain or light sensitivity',
      'Eye discharge',
      'Cloudy appearance of the cornea',
      'Irregular pupil shape (in severe cases)'
    ],
    causes: [
      'Bacterial infections (Staphylococcus aureus, Pseudomonas aeruginosa)',
      'Viral infections (herpes simplex virus, varicella zoster virus)',
      'Fungal infections (Aspergillus, Candida, Fusarium)',
      'Parasitic infections (Acanthamoeba)',
      'Contact lens wear, especially with poor hygiene',
      'Eye injury or trauma',
      'Dry eyes (exposure keratitis)',
      'Ultraviolet (UV) radiation exposure (photokeratitis)',
      'Allergic reactions',
      'Autoimmune disorders'
    ],
    treatments: [
      'Antibacterial eye drops for bacterial keratitis',
      'Antiviral medications for viral keratitis (acyclovir, ganciclovir)',
      'Antifungal medications for fungal keratitis',
      'Anti-parasitic treatments for amoebic keratitis',
      'Artificial tears for dry eye-related keratitis',
      'Discontinuation of contact lens use during treatment',
      'Pain management',
      'Corticosteroid eye drops (in specific non-infectious cases)',
      'Surgical debridement (removal of infected tissue)',
      'Corneal transplant in severe cases'
    ],
    preventions: [
      'Proper contact lens hygiene and care',
      'Regular replacement of contact lenses and cases',
      'Avoiding sleeping in contact lenses',
      'Protecting eyes from injury',
      'Wearing UV-protective sunglasses',
      'Proper treatment of eye infections',
      'Regular eye examinations',
      'Avoiding sharing eye makeup or towels',
      'Washing hands before touching eyes',
      'Antiviral prophylaxis for recurrent herpes simplex keratitis'
    ],
    relatedConditions: [
      'conjunctivitis',
      'dry-eye-syndrome',
      'corneal-ulcer',
      'herpes-simplex-virus-infection',
      'herpes-zoster-ophthalmicus',
      'acanthamoeba-infection',
      'corneal-abrasion',
      'uveitis',
      'blepharitis'
    ],
    commonQuestions: [
      {
        question: 'Is keratitis contagious?',
        answer: 'Some forms of keratitis can be contagious, particularly those caused by viruses like herpes simplex virus. However, bacterial, fungal, and parasitic keratitis are generally not directly transmitted from person to person. Nevertheless, the microorganisms that cause these infections can be spread through contact with contaminated objects, including contact lenses, eye makeup, or towels. Good hygiene practices can help prevent the spread of organisms that cause keratitis.'
      },
      {
        question: 'How does contact lens use relate to keratitis?',
        answer: 'Contact lens wear is a significant risk factor for keratitis, particularly bacterial and Acanthamoeba keratitis. Poor lens hygiene practices significantly increase this risk, including sleeping in lenses, using tap water for lens storage or cleaning, not replacing lens cases regularly, topping off solution instead of replacing it, and not washing hands before handling lenses. These practices can lead to biofilm formation and colonization of lenses by microorganisms that can cause serious eye infections.'
      },
      {
        question: 'How is keratitis diagnosed and treated?',
        answer: 'Keratitis is typically diagnosed through an eye examination using a slit lamp microscope, which allows detailed visualization of the cornea. In some cases, corneal scrapings may be taken to identify the specific pathogen. Treatment depends on the cause: antibacterial drops for bacterial infections, antiviral medications for viral causes, antifungals for fungal keratitis, and specific treatments for Acanthamoeba. Early treatment is crucial to prevent complications such as corneal scarring or vision loss.'
      }
    ],
    emergencySigns: [
      'Severe eye pain',
      'Sudden vision loss',
      'Significant light sensitivity',
      'Rapidly worsening symptoms',
      'Corneal ulceration or perforation'
    ],
    prevalence: 'The incidence of keratitis varies by region and type. Contact lens-related microbial keratitis affects approximately 2-4 per 10,000 contact lens wearers annually, with higher rates among those who sleep in their lenses. Herpes simplex keratitis is the most common cause of corneal blindness in developed countries.',
    affectedGroups: [
      'Contact lens wearers',
      'People with compromised immune systems',
      'Individuals with previous eye injuries',
      'Those with chronic eye surface diseases',
      'People with herpes simplex virus infections',
      'Outdoor workers exposed to UV radiation or eye trauma',
      'People in developing countries with limited access to clean water'
    ],
    references: [
      {
        id: '1',
        text: 'Jeng BH, Gritz DC, Kumar AB, et al. (2010). "Epidemiology of ulcerative keratitis in Northern California". Archives of Ophthalmology. 128 (8): 1022–1028.',
        url: 'https://doi.org/10.1001/archophthalmol.2010.144'
      },
      {
        id: '2',
        text: 'Whitcher JP, Srinivasan M, Upadhyay MP (2001). "Corneal blindness: a global perspective". Bulletin of the World Health Organization. 79 (3): 214–221.',
        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2566379/'
      },
      {
        id: '3',
        text: 'Farooq AV, Shukla D (2012). "Herpes simplex epithelial and stromal keratitis: an epidemiologic update". Survey of Ophthalmology. 57 (5): 448–462.',
        url: 'https://doi.org/10.1016/j.survophthal.2012.01.005'
      },
      {
        id: '4',
        text: 'Dart JK, Radford CF, Minassian D, et al. (2008). "Risk factors for microbial keratitis with contemporary contact lenses: a case-control study". Ophthalmology. 115 (10): 1647–1654.',
        url: 'https://doi.org/10.1016/j.ophtha.2008.05.003'
      },
      {
        id: '5',
        text: 'Kaye S, Choudhary A (2006). "Herpes simplex keratitis". Progress in Retinal and Eye Research. 25 (4): 355–380.',
        url: 'https://doi.org/10.1016/j.preteyeres.2006.05.001'
      }
    ]
  },
  {
    id: 'kidney-disease',
    name: 'Chronic Kidney Disease',
    description: 'A progressive condition characterized by the gradual loss of kidney function over time, affecting the body\'s ability to filter waste and excess fluids from the blood.[1] Initially asymptomatic, CKD is typically detected through routine blood work showing elevated serum creatinine or protein in urine.[2] If left untreated, it can progress to end-stage renal disease (ESRD) requiring dialysis or kidney transplantation.[3] The most common causes are diabetes mellitus, hypertension, and glomerulonephritis, with complications affecting multiple body systems.[4]',
    category: 'urinary-system',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Chronic_kidney_disease',
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
    ],
    references: [
      {
        id: '1',
        text: 'Kidney Disease: Improving Global Outcomes (KDIGO) CKD Work Group (2013). "KDIGO 2012 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease". Kidney International Supplements. 3 (1): 1–150.',
        url: 'https://kdigo.org/guidelines/ckd-evaluation-and-management/'
      },
      {
        id: '2',
        text: 'Webster AC, Nagler EV, Morton RL, Masson P (2017). "Chronic Kidney Disease". Lancet. 389 (10075): 1238–1252.',
        url: 'https://doi.org/10.1016/S0140-6736(16)32064-5'
      },
      {
        id: '3',
        text: 'Levey AS, Coresh J (2012). "Chronic kidney disease". Lancet. 379 (9811): 165–180.',
        url: 'https://doi.org/10.1016/S0140-6736(11)60178-5'
      },
      {
        id: '4',
        text: 'Jha V, Garcia-Garcia G, Iseki K, et al. (2013). "Chronic kidney disease: global dimension and perspectives". Lancet. 382 (9888): 260–272.',
        url: 'https://doi.org/10.1016/S0140-6736(13)60687-X'
      },
      {
        id: '5',
        text: 'Chen TK, Knicely DH, Grams ME (2019). "Chronic Kidney Disease Diagnosis and Management: A Review". JAMA. 322 (13): 1294–1304.',
        url: 'https://doi.org/10.1001/jama.2019.14745'
      }
    ]
  },
  {
    id: 'kidney-stones',
    name: 'Kidney Stones',
    description: 'Hard deposits made of minerals and salts that form inside the kidneys and can affect any part of the urinary tract from the kidneys to the bladder.[1] Passing kidney stones can be extremely painful, but they usually don\'t cause permanent damage if recognized in a timely fashion.[2] Depending on the situation, kidney stones may pass naturally or require medical intervention such as sound wave treatment (lithotripsy) or surgery.[3] Proper hydration and dietary modifications can help prevent recurrence of kidney stones, which unfortunately is common in many people.[4]',
    category: 'urinary-system',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Kidney_stone_disease',
    symptoms: [
      'Severe, sharp pain in the side and back, below the ribs',
      'Pain that radiates to the lower abdomen and groin',
      'Pain that comes in waves and fluctuates in intensity',
      'Pain or burning sensation during urination',
      'Pink, red, or brown urine (hematuria)',
      'Cloudy or foul-smelling urine',
      'Persistent need to urinate, urinating more often than usual',
      'Urinating small amounts',
      'Nausea and vomiting',
      'Fever and chills (if infection is present)'
    ],
    causes: [
      'Dehydration',
      'Diet high in salt, sugar, and animal protein',
      'Obesity',
      'Family history of kidney stones',
      'Certain medical conditions (inflammatory bowel disease, hyperparathyroidism)',
      'Certain medications (diuretics, calcium-based antacids)',
      'Urinary tract infections',
      'Metabolic disorders (hypercalciuria, hyperoxaluria, hyperuricosuria)',
      'Reduced urinary citrate',
      'Sedentary lifestyle'
    ],
    treatments: [
      'Increased fluid intake',
      'Pain relievers during stone passage',
      'Alpha blockers to relax ureter muscles and facilitate stone passage',
      'Extracorporeal shock wave lithotripsy (ESWL)',
      'Ureteroscopy with stone removal or fragmentation',
      'Percutaneous nephrolithotomy for larger stones',
      'Medications to prevent future stones based on stone type',
      'Surgery for very large or complex stones',
      'Treatment of underlying conditions',
      'Dietary modifications based on stone composition'
    ],
    preventions: [
      'Drinking plenty of water (2-3 liters per day)',
      'Reducing sodium intake',
      'Limiting animal protein consumption',
      'Avoiding foods high in oxalate for certain stone types',
      'Limiting sugar and high-fructose corn syrup',
      'Maintaining normal calcium intake (don\'t restrict without medical advice)',
      'Medications such as thiazide diuretics, allopurinol, or potassium citrate for recurrent stones',
      'Regular exercise and maintaining healthy weight',
      'Limiting caffeine and alcohol consumption',
      'Treating underlying medical conditions'
    ],
    relatedConditions: [
      'urinary-tract-infections',
      'hyperparathyroidism',
      'renal-tubular-acidosis',
      'cystinuria',
      'medullary-sponge-kidney',
      'gout',
      'inflammatory-bowel-disease',
      'urinary-obstruction',
      'hydronephrosis'
    ],
    commonQuestions: [
      {
        question: 'How can I tell if I have a kidney stone?',
        answer: 'The most common symptom of kidney stones is severe pain that starts suddenly in your side or back, below the ribs. The pain may radiate to your lower abdomen and groin. Other signs include blood in the urine, cloudy or foul-smelling urine, frequent urination, nausea, and vomiting. However, small stones may not cause symptoms until they start moving within the kidney or into the ureter. Definitive diagnosis typically requires imaging tests like CT scans or ultrasounds.'
      },
      {
        question: 'How long does it take to pass a kidney stone?',
        answer: 'The time it takes to pass a kidney stone varies based on size and location. Small stones (less than 4mm) often pass within 1-2 weeks, with most passing in a few days. Medium-sized stones (4-6mm) may take 2-4 weeks, with about 60% passing without intervention. Larger stones (>6mm) have a lower chance of passing naturally and often require medical intervention. During passage, pain typically comes in waves as the stone moves through the urinary tract.'
      },
      {
        question: 'Can certain foods cause kidney stones?',
        answer: 'Yes, diet plays a significant role in kidney stone formation. For calcium oxalate stones (the most common type), foods high in oxalates can increase risk, including spinach, rhubarb, almonds, and chocolate. High-sodium diets increase calcium in urine and stone risk. Excessive animal protein raises uric acid levels and lowers citrate, promoting stone formation. Sugary foods and drinks increase kidney stone risk. However, dietary recommendations vary based on the specific type of kidney stone you have, so it\'s important to get personalized advice.'
      }
    ],
    emergencySigns: [
      'Severe pain that makes it impossible to sit still or find a comfortable position',
      'Pain accompanied by nausea and vomiting',
      'Blood in urine',
      'Fever and chills',
      'Difficulty passing urine',
      'Cloudy or foul-smelling urine indicating infection'
    ],
    prevalence: 'Kidney stones affect approximately 1 in 11 people in the United States. The lifetime risk of developing kidney stones is about 9% for women and 19% for men. In recent decades, the prevalence has been increasing worldwide.',
    affectedGroups: [
      'Men (more common than in women)',
      'People between the ages of 30 and 60',
      'Those with a family history of kidney stones',
      'People who are dehydrated or live in hot climates',
      'Individuals with certain medical conditions',
      'People with dietary risk factors',
      'Those who have had previous kidney stones (50% will develop another within 5-10 years)'
    ],
    references: [
      {
        id: '1',
        text: 'Scales CD Jr, Smith AC, Hanley JM, Saigal CS (2012). "Prevalence of kidney stones in the United States". European Urology. 62 (1): 160–165.',
        url: 'https://doi.org/10.1016/j.eururo.2012.03.052'
      },
      {
        id: '2',
        text: 'Pearle MS, Goldfarb DS, Assimos DG, et al. (2014). "Medical management of kidney stones: AUA guideline". Journal of Urology. 192 (2): 316–324.',
        url: 'https://doi.org/10.1016/j.juro.2014.05.006'
      },
      {
        id: '3',
        text: 'Qaseem A, Dallas P, Forciea MA, et al. (2014). "Dietary and pharmacologic management to prevent recurrent nephrolithiasis in adults: a clinical practice guideline from the American College of Physicians". Annals of Internal Medicine. 161 (9): 659–667.',
        url: 'https://doi.org/10.7326/M13-2908'
      },
      {
        id: '4',
        text: 'Morgan MS, Pearle MS (2016). "Medical management of renal stones". BMJ. 352: i52.',
        url: 'https://doi.org/10.1136/bmj.i52'
      },
      {
        id: '5',
        text: 'Gambaro G, Croppi E, Coe F, et al. (2016). "Metabolic diagnosis and medical prevention of calcium nephrolithiasis and its systemic manifestations: a consensus statement". Journal of Nephrology. 29 (6): 715–734.',
        url: 'https://doi.org/10.1007/s40620-016-0329-y'
      }
    ]
  },
  {
    id: 'leukemia',
    name: 'Leukemia',
    description: 'A group of cancers that typically begin in the bone marrow and result in high numbers of abnormal white blood cells.[1] These abnormal cells displace normal blood components in the bone marrow, leading to reduced production of red blood cells, platelets, and functional white blood cells.[2] The symptoms of leukemia result from this reduced production and can include easy bruising or bleeding, fatigue, fever, and increased risk of infections.[3] The exact cause of leukemia is unknown, but risk factors include genetic disorders, previous cancer treatments, and exposure to certain chemicals.[4]',
    category: 'cancer',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Leukemia',
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
      'Children aged 0-14 (most common type of childhood cancer)',
      'Adults over 55 (risk increases with age)',
      'People with certain genetic disorders',
      'Those with prior exposure to high radiation levels or certain chemicals',
      'People previously treated with certain chemotherapy drugs',
      'Individuals with myelodysplastic syndrome'
    ],
    references: [
      {
        id: '1',
        text: 'Davis AS, Viera AJ, Mead MD (2014). "Leukemia: an overview for primary care". American Family Physician. 89 (9): 731–738.',
        url: 'https://www.aafp.org/pubs/afp/issues/2014/0501/p731.html'
      },
      {
        id: '2',
        text: 'Devine SM, Larson RA (2018). "Acute leukemia in adults: recent developments in diagnosis and treatment". CA: A Cancer Journal for Clinicians. 68 (6): 522–546.',
        url: 'https://doi.org/10.3322/caac.21485'
      },
      {
        id: '3',
        text: 'Hunger SP, Mullighan CG (2015). "Acute Lymphoblastic Leukemia in Children". New England Journal of Medicine. 373 (16): 1541–1552.',
        url: 'https://doi.org/10.1056/NEJMra1400972'
      },
      {
        id: '4',
        text: 'Cogliano VJ, Baan R, Straif K, et al. (2011). "Preventable exposures associated with human cancers". Journal of the National Cancer Institute. 103 (24): 1827–1839.',
        url: 'https://doi.org/10.1093/jnci/djr483'
      },
      {
        id: '5',
        text: 'Jabbour E, Kantarjian H (2020). "Chronic myeloid leukemia: 2020 update on diagnosis, therapy and monitoring". American Journal of Hematology. 95 (6): 691–709.',
        url: 'https://doi.org/10.1002/ajh.25792'
      }
    ]
  },
  {
    id: 'lupus',
    name: 'Lupus (Systemic Lupus Erythematosus)',
    description: 'A chronic autoimmune disease where the immune system attacks the body\'s own tissues and organs, causing inflammation and damage throughout the body.[1] Often called "the great imitator" because its symptoms mimic many other illnesses, lupus can be difficult to diagnose.[2] The disease affects multiple systems including the skin, joints, kidneys, brain, and other organs.[3] It typically follows a pattern of flares (periods of active symptoms) and remissions (periods of few or no symptoms).[4] While there is no cure, treatments can help manage symptoms and reduce inflammation.',
    category: 'immune-system',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Systemic_lupus_erythematosus',
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
      'antiphospholipid-syndrome',
      'mixed-connective-tissue-disease',
      'dermatomyositis',
      'polymyositis',
      'vasculitis'
    ],
    references: [
      {
        id: '1',
        text: 'Tsokos GC (2011). "Systemic lupus erythematosus". New England Journal of Medicine. 365 (22): 2110–2121.',
        url: 'https://doi.org/10.1056/NEJMra1100359'
      },
      {
        id: '2',
        text: 'Liu Z, Davidson A (2012). "Taming lupus-a new understanding of pathogenesis is leading to clinical advances". Nature Medicine. 18 (6): 871–882.',
        url: 'https://doi.org/10.1038/nm.2752'
      },
      {
        id: '3',
        text: 'Lisnevskaia L, Murphy G, Isenberg D (2014). "Systemic lupus erythematosus". Lancet. 384 (9957): 1878–1888.',
        url: 'https://doi.org/10.1016/S0140-6736(14)60128-8'
      },
      {
        id: '4',
        text: 'Kaul A, Gordon C, Crow MK, et al. (2016). "Systemic lupus erythematosus". Nature Reviews Disease Primers. 2: 16039.',
        url: 'https://doi.org/10.1038/nrdp.2016.39'
      },
      {
        id: '5',
        text: 'Durcan L, O\'Dwyer T, Petri M (2019). "Management strategies and future directions for systemic lupus erythematosus in adults". Lancet. 393 (10188): 2332–2343.',
        url: 'https://doi.org/10.1016/S0140-6736(19)30237-5'
      }
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
  },
  {
    id: 'lupus',
    name: 'Lupus (Systemic Lupus Erythematosus)',
    description: 'A chronic autoimmune disease in which the body\'s immune system mistakenly attacks healthy tissues and organs.[1] Lupus can affect many body systems, including joints, skin, kidneys, heart, lungs, brain, and blood cells.[2] The condition is characterized by periods of illness (flares) and periods of wellness (remission).[3] While there is no cure for lupus, treatments can help control symptoms and minimize damage to organs.[4] The exact cause remains unknown, but genetics, environment, and hormones are believed to play roles in its development.[5]',
    category: 'immune-system',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Systemic_lupus_erythematosus',
    symptoms: [
      'Fatigue',
      'Fever',
      'Joint pain, stiffness, and swelling',
      'Butterfly-shaped rash on the face (malar rash)',
      'Skin lesions that appear or worsen with sun exposure (photosensitivity)',
      'Fingers and toes that turn white or blue when exposed to cold or during stress (Raynaud\'s phenomenon)',
      'Shortness of breath',
      'Chest pain',
      'Dry eyes',
      'Headaches, confusion, and memory loss',
      'Hair loss',
      'Mouth or nose ulcers',
      'Kidney problems (lupus nephritis)',
      'Blood disorders (anemia, decreased white blood cells or platelets)',
      'Inflammation of the lining around the heart or lungs'
    ],
    causes: [
      'Genetic factors (multiple gene variations)',
      'Environmental triggers (sunlight, infections, certain medications)',
      'Hormonal factors (more common in women of childbearing age)',
      'Immune system abnormalities',
      'Epigenetic factors (changes in gene expression without DNA sequence changes)',
      'Viral infections (potential trigger in genetically susceptible individuals)',
      'Stress and emotional factors (may trigger flares)'
    ],
    treatments: [
      'Nonsteroidal anti-inflammatory drugs (NSAIDs) for pain and inflammation',
      'Antimalarial drugs (hydroxychloroquine) to treat fatigue, joint pain, skin rashes',
      'Corticosteroids to counter inflammation',
      'Immunosuppressants to inhibit immune system activity',
      'Biologics (belimumab, rituximab) targeting specific immune system pathways',
      'Anticoagulants for blood clotting issues',
      'Physical therapy for joint problems',
      'Dialysis or kidney transplant for severe kidney damage',
      'Lifestyle modifications to manage symptoms',
      'Regular monitoring of organ function',
      'Treatment of specific organ complications'
    ],
    preventions: [
      'Avoiding sun exposure and using sun protection',
      'Getting adequate rest and managing stress',
      'Regular exercise tailored to individual capabilities',
      'Avoiding smoking and limiting alcohol consumption',
      'Maintaining a balanced diet',
      'Prompt treatment of infections',
      'Regular medical check-ups to monitor disease activity',
      'Avoiding medications known to trigger lupus flares',
      'Vaccinations as recommended by healthcare providers'
    ],
    relatedConditions: [
      'rheumatoid-arthritis',
      'sjogrens-syndrome',
      'antiphospholipid-syndrome',
      'mixed-connective-tissue-disease',
      'scleroderma',
      'vasculitis',
      'fibromyalgia',
      'raynauds-phenomenon',
      'autoimmune-thyroid-disease'
    ],
    commonQuestions: [
      {
        question: 'Is lupus contagious?',
        answer: 'No, lupus is not contagious. It cannot be spread from person to person through physical contact, air, water, or any other means of transmission. Lupus is an autoimmune disease, which means it develops when your immune system mistakenly attacks your own tissues and organs. While the exact cause of lupus remains unknown, a combination of genetic predisposition and environmental triggers likely plays a role in its development. People with family members who have lupus or other autoimmune diseases may have a slightly higher risk of developing the condition, but this is due to shared genetic factors, not contagion.'
      },
      {
        question: 'Can lupus be cured?',
        answer: 'Currently, there is no cure for lupus. However, with proper treatment and management, most people with lupus can lead active, healthy lives. Treatment focuses on reducing inflammation, suppressing the overactive immune system, preventing flares, and minimizing organ damage. Medications and lifestyle modifications help control symptoms and manage the disease. The course of lupus varies greatly from person to person—some experience mild symptoms with occasional flares, while others may have more severe manifestations. The prognosis for people with lupus has improved significantly over the past few decades due to earlier diagnosis and better treatment options. Research into more effective treatments and potential cures continues, with promising developments in targeted therapies and understanding of the disease mechanisms.'
      },
      {
        question: 'How is lupus diagnosed?',
        answer: 'Diagnosing lupus can be challenging because its symptoms mimic many other conditions and can vary widely between individuals. There is no single test for lupus. Instead, diagnosis typically involves a combination of: Clinical evaluation of symptoms and medical history; Physical examination looking for characteristic signs; Blood tests including antinuclear antibody (ANA) test, anti-double-stranded DNA antibody test, anti-Smith antibody test, and complement tests; Complete blood count to check for anemia or low white blood cell or platelet counts; Urinalysis to detect kidney involvement; Tissue biopsies (particularly of skin or kidney); Imaging tests such as chest X-rays or echocardiograms to assess organ involvement. Doctors often use the American College of Rheumatology criteria, which requires at least 4 out of 11 common signs and symptoms of lupus for diagnosis. Because symptoms develop gradually and can change over time, it may take months or even years to make a definitive diagnosis.'
      }
    ],
    emergencySigns: [
      'Severe chest pain or shortness of breath (may indicate heart or lung involvement)',
      'Severe headache, confusion, seizures, or changes in vision (may indicate brain involvement)',
      'Significant swelling or sudden weight gain (may indicate kidney problems)',
      'Severe abdominal pain (may indicate inflammation of internal organs)',
      'Unusual bleeding or bruising (may indicate blood disorders)',
      'High fever with no apparent cause',
      'Signs of stroke or heart attack',
      'Severe depression or thoughts of self-harm'
    ],
    prevalence: 'Lupus affects approximately 5 million people worldwide. In the United States, an estimated 161,000 to 322,000 people have systemic lupus erythematosus. The disease can affect people of all ages, races, and ethnicities, but it is most common in women of childbearing age (15-44 years). Lupus is 2-3 times more prevalent in women of color, particularly those of African, Hispanic, Asian, and Native American descent, compared to Caucasian women.',
    affectedGroups: [
      'Women (90% of cases, with a female-to-male ratio of 9:1)',
      'People between ages 15-44 (prime reproductive years)',
      'African Americans (2-3 times higher risk than Caucasians)',
      'Hispanic, Asian, and Native American populations (higher risk than Caucasians)',
      'People with family history of lupus or autoimmune diseases',
      'Individuals exposed to certain environmental triggers',
      'Those with specific genetic markers associated with lupus susceptibility'
    ],
    references: [
      {
        id: '1',
        text: 'Tsokos GC. (2011). "Systemic lupus erythematosus". New England Journal of Medicine. 365 (22): 2110-2121.',
        url: 'https://doi.org/10.1056/NEJMra1100359'
      },
      {
        id: '2',
        text: 'Lisnevskaia L, Murphy G, Isenberg D. (2014). "Systemic lupus erythematosus". Lancet. 384 (9957): 1878-1888.',
        url: 'https://doi.org/10.1016/S0140-6736(14)60128-8'
      },
      {
        id: '3',
        text: 'Kaul A, Gordon C, Crow MK, et al. (2016). "Systemic lupus erythematosus". Nature Reviews Disease Primers. 2: 16039.',
        url: 'https://doi.org/10.1038/nrdp.2016.39'
      },
      {
        id: '4',
        text: 'Fanouriakis A, Kostopoulou M, Alunno A, et al. (2019). "2019 update of the EULAR recommendations for the management of systemic lupus erythematosus". Annals of the Rheumatic Diseases. 78 (6): 736-745.',
        url: 'https://doi.org/10.1136/annrheumdis-2019-215089'
      },
      {
        id: '5',
        text: 'Kiriakidou M, Ching CL. (2020). "Systemic Lupus Erythematosus". Annals of Internal Medicine. 172 (11): ITC81-ITC96.',
        url: 'https://doi.org/10.7326/AITC202006020'
      }
    ]
  }
];

export default conditionsJtoL;
