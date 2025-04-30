import { HealthCondition } from '../healthConditionsData';

/**
 * Health conditions starting with letters U-Z
 */
export const conditionsUtoZ: HealthCondition[] = [
  {
    id: 'ulcerative-colitis',
    name: 'Ulcerative Colitis',
    description: 'A chronic inflammatory bowel disease that causes inflammation and ulcers in the innermost lining of the large intestine (colon) and rectum.',
    category: 'digestive-health',
    subcategory: 'inflammatory-bowel-disease',
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
      'Skin problems',
      'Eye inflammation'
    ],
    causes: [
      'Immune system malfunction',
      'Genetic factors',
      'Environmental triggers',
      'Microbiome imbalances',
      'Abnormal immune response to gut bacteria',
      'Diet and stress (may trigger or worsen symptoms)',
      'Non-steroidal anti-inflammatory drugs (NSAIDs)',
      'Isotretinoin (previously known as Accutane)'
    ],
    treatments: [
      'Anti-inflammatory drugs (5-aminosalicylates, corticosteroids)',
      'Immunosuppressants',
      'Biologics (anti-TNF, anti-integrins, anti-IL-12/23)',
      'JAK inhibitors',
      'Antibiotics (for infections)',
      'Pain relievers',
      'Anti-diarrheal medications (for mild symptoms)',
      'Iron supplements (for anemia)',
      'Dietary modifications',
      'Surgery (colectomy for severe cases)'
    ],
    preventions: [
      'No known prevention for ulcerative colitis',
      'Certain strategies may reduce flares:',
      'Identifying and avoiding trigger foods',
      'Stress management',
      'Regular exercise',
      'Smoking cessation',
      'Avoiding NSAIDs',
      'Taking medications as prescribed',
      'Regular medical check-ups'
    ],
    relatedConditions: [
      'crohns-disease',
      'colorectal-cancer',
      'primary-sclerosing-cholangitis',
      'ankylosing-spondylitis',
      'pyoderma-gangrenosum',
      'erythema-nodosum',
      'uveitis'
    ],
    commonQuestions: [
      {
        question: 'Is ulcerative colitis caused by diet or stress?',
        answer: 'While diet and stress don\'t cause ulcerative colitis, they can trigger symptom flares in some people. Ulcerative colitis is believed to result from a complex interaction of genetic, immune system, and environmental factors. Certain foods (like high-fiber foods, dairy, alcohol) and stress can worsen symptoms, but they don\'t cause the underlying disease. Each person with ulcerative colitis may have different triggers, so it\'s beneficial to identify personal food sensitivities through an elimination diet or food diary under medical supervision.'
      },
      {
        question: 'What\'s the difference between ulcerative colitis and Crohn\'s disease?',
        answer: 'While both are inflammatory bowel diseases with similar symptoms, they differ in key ways: Ulcerative colitis affects only the colon (large intestine) and rectum with continuous inflammation limited to the innermost lining. Crohn\'s disease can affect any part of the digestive tract from mouth to anus, with inflammation that may extend through all layers of the bowel wall and can occur in patches (with healthy areas between inflamed sections). Surgical removal of the colon can "cure" ulcerative colitis, while Crohn\'s disease can recur after surgery.'
      },
      {
        question: 'Does ulcerative colitis increase cancer risk?',
        answer: 'Yes, ulcerative colitis is associated with an increased risk of colorectal cancer, particularly for people with extensive colitis (affecting most of the colon) and long-standing disease (8+ years). The risk increases over time, with approximately 2% after 10 years, 8% after 20 years, and 18% after 30 years of disease. Regular colonoscopies with biopsies for surveillance are recommended, typically starting 8 years after diagnosis. Maintaining disease remission through medication may help reduce cancer risk.'
      }
    ],
    emergencySigns: [
      'Severe abdominal pain',
      'Persistent vomiting',
      'High fever',
      'Significant rectal bleeding or passing large amounts of blood',
      'Severe dehydration (extreme thirst, dry mouth, minimal urination)',
      'Rapid heart rate',
      'Profound weakness and fatigue',
      'Severe, unexplained weight loss'
    ],
    prevalence: 'Ulcerative colitis affects approximately 1 million people in the United States and 2.6 million people worldwide.',
    affectedGroups: [
      'Most common diagnosis between ages 15-30, with a second peak at 50-70',
      'Slightly more common in men than women',
      'More prevalent in developed countries',
      'Higher rates in people of Ashkenazi Jewish descent',
      'Often runs in families (10-25% have a family member with IBD)',
      'Former smokers (risk increases after quitting)',
      'People living in urban areas and northern climates'
    ]
  },
  {
    id: 'urinary-tract-infection',
    name: 'Urinary Tract Infection',
    description: 'An infection affecting any part of the urinary system, including kidneys, ureters, bladder, and urethra, most commonly caused by bacteria.',
    category: 'urinary-system',
    symptoms: [
      'Strong, persistent urge to urinate',
      'Burning sensation when urinating',
      'Passing frequent, small amounts of urine',
      'Cloudy urine',
      'Red, bright pink or cola-colored urine (sign of blood)',
      'Strong-smelling urine',
      'Pelvic pain (in women)',
      'Rectal pain (in men)',
      'Fever, chills, and vomiting (if infection has reached kidneys)',
      'Pain in back or side below ribs'
    ],
    causes: [
      'Bacterial infection (most commonly E. coli)',
      'Sexual activity',
      'Female anatomy (shorter urethra than men)',
      'Urinary tract abnormalities or blockages',
      'Weakened immune system',
      'Catheter use',
      'Recent urinary procedures',
      'Menopause (decreased estrogen)',
      'Pregnancy',
      'Diabetes'
    ],
    treatments: [
      'Antibiotics (type and duration depend on severity and location)',
      'Pain relievers',
      'Increased fluid intake',
      'Urinary analgesics (phenazopyridine) for pain and burning',
      'Heating pad for pelvic pain',
      'Intravenous antibiotics for severe infections',
      'Hospitalization for complicated cases',
      'Surgery (rarely, for structural abnormalities)'
    ],
    preventions: [
      'Drinking plenty of water',
      'Urinating when you feel the need (not holding it)',
      'Emptying bladder before and after sexual activity',
      'Wiping from front to back after urination (women)',
      'Avoiding irritating feminine products',
      'Taking showers instead of baths',
      'Wearing cotton underwear and loose-fitting clothes',
      'Drinking cranberry juice or taking supplements (some evidence)',
      'Estrogen therapy for postmenopausal women (if appropriate)'
    ],
    relatedConditions: [
      'interstitial-cystitis',
      'kidney-infection',
      'kidney-stones',
      'urethritis',
      'prostatitis',
      'urinary-retention',
      'diabetes'
    ],
    commonQuestions: [
      {
        question: 'Can UTIs go away on their own?',
        answer: 'While some mild UTIs may resolve without treatment, most require antibiotics to clear the infection properly. Untreated UTIs can lead to serious complications like kidney infection, which can cause permanent damage. The bacteria causing UTIs rarely leave on their own, especially once they\'ve attached to the bladder wall. Self-care measures like drinking plenty of water may help manage symptoms but typically won\'t eliminate the infection. It\'s always best to consult a healthcare provider for proper diagnosis and treatment.'
      },
      {
        question: 'Why do some people get recurrent UTIs?',
        answer: 'Recurrent UTIs (three or more per year) may result from several factors: anatomical differences (shorter urethra in women), genetic predisposition, incomplete bladder emptying, hormonal changes during menopause, sexual activity patterns, hygiene habits, or underlying conditions like diabetes or kidney stones. Some people have bacterial patterns that make them more susceptible, like specific E. coli strains that adhere strongly to urinary tract cells. Preventive strategies include low-dose antibiotics, post-intercourse antibiotics, vaginal estrogen therapy for postmenopausal women, and lifestyle modifications.'
      },
      {
        question: 'Can men get UTIs?',
        answer: 'Yes, men can get UTIs, though they\'re less common than in women (about 12% of men will experience a UTI in their lifetime). In younger men, UTIs are rare and may indicate an anatomical abnormality. In men over 50, enlarged prostate can increase UTI risk by preventing complete bladder emptying. Other risk factors include unprotected anal intercourse, lack of circumcision, urinary catheter use, diabetes, or immune system suppression. Symptoms in men are similar to those in women but may also include rectal or perineal pain and fluid from the urethra.'
      }
    ],
    emergencySigns: [
      'High fever (over 101°F/38.3°C)',
      'Severe pain in back or side (possible kidney infection)',
      'Vomiting and inability to keep fluids down',
      'Visible blood in urine',
      'Symptoms of shock (severe drop in blood pressure)',
      'Confusion or altered mental state (especially in elderly)',
      'Severe and quickly worsening symptoms'
    ],
    prevalence: 'UTIs account for approximately 8-10 million doctor visits annually in the United States. About 50-60% of women will experience at least one UTI in their lifetime.',
    affectedGroups: [
      'Women (much more common than in men)',
      'Sexually active individuals',
      'Postmenopausal women',
      'Pregnant women',
      'People with diabetes',
      'Individuals with structural abnormalities in urinary tract',
      'People using catheters',
      'Those with weakened immune systems',
      'Men with enlarged prostate'
    ]
  },
  {
    id: 'varicose-veins',
    name: 'Varicose Veins',
    description: 'Enlarged, twisted veins that commonly appear in the legs and feet due to damaged or weakened vein walls and valves.',
    category: 'heart-and-circulation',
    subcategory: 'vascular',
    symptoms: [
      'Veins that appear dark purple or blue',
      'Twisted, bulging veins',
      'Aching, heavy feeling in legs',
      'Burning, throbbing, muscle cramping, and swelling in lower legs',
      'Worsened pain after sitting or standing for long periods',
      'Itching around veins',
      'Skin discoloration around veins',
      'Pain that improves with leg elevation',
      'Restless legs',
      'Ankle swelling, especially in evening'
    ],
    causes: [
      'Age (vein walls weaken over time)',
      'Genetic predisposition',
      'Female gender (hormonal influences)',
      'Pregnancy',
      'Obesity or overweight',
      'Standing or sitting for long periods',
      'Physical inactivity',
      'Prior deep vein thrombosis',
      'Constipation (straining increases pressure)',
      'Tumors (rarely)'
    ],
    treatments: [
      'Self-care (compression stockings, leg elevation, exercise)',
      'Endovenous laser treatment',
      'Radiofrequency ablation',
      'Sclerotherapy',
      'Ambulatory phlebectomy (vein removal through small incisions)',
      'Vein stripping and ligation (traditional surgery)',
      'Endoscopic vein surgery (severe cases)',
      'VenaSeal (medical adhesive to seal veins)',
      'ClariVein (mechanochemical ablation)',
      'Medications for symptom relief'
    ],
    preventions: [
      'Regular exercise to improve circulation',
      'Maintaining healthy weight',
      'Avoiding prolonged standing or sitting',
      'Elevating legs when resting',
      'Wearing compression stockings',
      'Avoiding tight clothing around waist and legs',
      'Low-salt, high-fiber diet',
      'Moving regularly throughout day',
      'Avoiding high heels for extended periods'
    ],
    relatedConditions: [
      'chronic-venous-insufficiency',
      'deep-vein-thrombosis',
      'pulmonary-embolism',
      'venous-stasis-ulcers',
      'lymphedema',
      'spider-veins',
      'hemorrhoids'
    ],
    commonQuestions: [
      {
        question: 'Are varicose veins dangerous?',
        answer: 'While varicose veins are often primarily a cosmetic concern, they can occasionally lead to more serious problems. Most people with varicose veins experience mild symptoms like aching and swelling, but some develop complications like thrombophlebitis (painful blood clots), bleeding from ruptured veins, venous eczema (skin inflammation), or venous ulcers (open sores). People with varicose veins may also have a slightly higher risk of deep vein thrombosis. It\'s advisable to have symptomatic varicose veins evaluated by a healthcare provider, particularly if they cause significant discomfort or skin changes.'
      },
      {
        question: 'Will varicose veins come back after treatment?',
        answer: 'While treatment can effectively remove or close existing varicose veins, it doesn\'t address the underlying tendency to develop them. New varicose veins can form in different locations after treatment. Recurrence rates vary by procedure and individual factors, with estimated rates of 10-30% within five years. Minimally invasive procedures like endovenous laser treatment and radiofrequency ablation typically have lower recurrence rates than traditional vein stripping. To minimize recurrence, continue preventive measures like wearing compression stockings, maintaining a healthy weight, and staying physically active after treatment.'
      },
      {
        question: 'Can exercise help with varicose veins?',
        answer: 'Yes, regular exercise can help manage existing varicose veins and may reduce the risk of developing new ones. Physical activity, particularly walking and low-impact exercises like swimming, cycling, and yoga, improves circulation and vein health by strengthening calf muscles that help pump blood back to the heart. Exercise also helps maintain healthy weight, reducing pressure on veins. While exercise benefits varicose veins, high-impact activities or heavy weightlifting might temporarily increase symptoms in some people. Wearing compression stockings during exercise can provide additional support.'
      }
    ],
    prevalence: 'Varicose veins affect approximately 23% of adults worldwide. In the United States, about 20-25 million people have varicose veins.',
    affectedGroups: [
      'Women (more common than in men)',
      'People over age 50',
      'Pregnant women',
      'Those with family history of varicose veins',
      'Obese or overweight individuals',
      'People who stand or sit for prolonged periods',
      'Those with history of blood clots or vein damage',
      'People with occupations requiring prolonged standing (nurses, teachers, hairdressers, retail workers)'
    ]
  },
  {
    id: 'yellow-fever',
    name: 'Yellow Fever',
    description: 'A viral hemorrhagic disease transmitted by infected mosquitoes, characterized by fever, jaundice, bleeding, and potentially severe liver damage and kidney failure.',
    category: 'infectious-diseases',
    subcategory: 'viral-infections',
    symptoms: [
      'Initial phase: Sudden fever, severe headache, back pain, general body aches',
      'Nausea and vomiting',
      'Fatigue and weakness',
      'Red eyes, face, or tongue',
      'Toxic phase (in severe cases): Jaundice (yellowing of skin and eyes)',
      'Abdominal pain with vomiting',
      'Bleeding from mouth, nose, eyes, or stomach',
      'Decreased urination',
      'Delirium, seizures, or coma',
      'Heart rhythm problems'
    ],
    causes: [
      'Infection with yellow fever virus (a flavivirus)',
      'Transmission via bite of infected Aedes or Haemagogus mosquitoes',
      'Endemic in tropical areas of Africa and South America',
      'Three transmission cycles: sylvatic (jungle), intermediate (savannah), and urban'
    ],
    treatments: [
      'No specific antiviral treatment exists',
      'Supportive care to treat symptoms',
      'Intravenous fluids and oxygen therapy',
      'Blood transfusions for severe bleeding',
      'Dialysis for kidney failure',
      'Management of other organ dysfunction',
      'Avoidance of certain medications (aspirin, other NSAIDs)'
    ],
    preventions: [
      'Yellow fever vaccine (highly effective, single dose provides lifelong immunity)',
      'Use of insect repellent containing DEET or picaridin',
      'Wearing long-sleeved clothing and long pants',
      'Using bed nets when sleeping',
      'Air-conditioning and window/door screens',
      'Mosquito control measures in communities',
      'Vaccination certificate required for entry to many countries'
    ],
    relatedConditions: ['dengue-fever', 'zika-virus', 'other-viral-hemorrhagic-fevers', 'hepatitis'],
    commonQuestions: [
      {
        question: 'How effective is the yellow fever vaccine?',
        answer: 'The yellow fever vaccine is highly effective, with a single dose providing protection for at least 10 years and likely lifelong for most people. The vaccine creates immunity in 80-100% of those vaccinated within 10 days, and in more than 99% of people within 30 days. International health regulations allow countries to require proof of vaccination for travelers coming from or going to areas with risk of yellow fever transmission.'
      },
      {
        question: 'Why is the disease called "yellow fever"?',
        answer: 'The disease is called yellow fever because of the jaundice that affects some patients, causing yellowing of the skin and eyes. This yellowing occurs due to liver damage caused by the virus, which leads to elevated levels of bilirubin in the blood. However, it\'s important to note that not all infected people develop this symptom - only those who progress to the more severe "toxic phase" of the illness, which represents approximately 15% of cases.'
      }
    ],
    emergencySigns: [
      'Yellowing of skin and eyes',
      'Bleeding from multiple sites',
      'Persistent vomiting',
      'Decreased urination',
      'Severe abdominal pain',
      'Changes in mental status',
      'High fever unresponsive to treatment'
    ],
    prevalence: 'Yellow fever causes an estimated 200,000 cases worldwide each year, with about 30,000 deaths. Approximately 90% of cases occur in Africa. An estimated 900 million people live in areas at risk for yellow fever transmission.',
    affectedGroups: [
      'Unvaccinated travelers to endemic regions',
      'People living in or near jungle areas in endemic countries',
      'Individuals in urban areas with Aedes aegypti mosquito populations',
      'Laboratory workers who handle the virus',
      'All age groups are susceptible, though children may have milder illness'
    ]
  },
  {
    id: 'zika-virus',
    name: 'Zika Virus Disease',
    description: 'A mosquito-borne viral infection that can cause mild symptoms in most people but may lead to serious birth defects when contracted during pregnancy.',
    category: 'infectious-diseases',
    symptoms: [
      'Fever',
      'Rash',
      'Joint pain',
      'Conjunctivitis (red eyes)',
      'Muscle pain',
      'Headache',
      'Eye pain',
      'Fatigue',
      'Many infected people have no symptoms'
    ],
    causes: [
      'Infection with Zika virus',
      'Transmission primarily through bite of infected Aedes mosquitoes',
      'Sexual transmission',
      'Transmission from mother to fetus during pregnancy',
      'Blood transfusion (rare)',
      'Laboratory exposure (rare)'
    ],
    treatments: [
      'No specific antiviral treatment available',
      'Rest',
      'Increased fluid intake',
      'Over-the-counter pain and fever reducers (acetaminophen)',
      'Avoiding aspirin and NSAIDs until dengue fever is ruled out',
      'Supportive care for symptoms',
      'Close monitoring during pregnancy for women exposed to Zika'
    ],
    preventions: [
      'Avoiding travel to areas with active Zika outbreaks',
      'Using EPA-registered insect repellents',
      'Wearing long-sleeved shirts and long pants',
      'Treating clothing with permethrin',
      'Staying in places with air conditioning or window/door screens',
      'Emptying standing water around home (mosquito breeding sites)',
      'Safe sex practices or abstinence after potential exposure',
      'Preventing mosquito bites during first week of illness to prevent transmission'
    ],
    relatedConditions: [
      'microcephaly',
      'congenital-zika-syndrome',
      'guillain-barre-syndrome',
      'dengue-fever',
      'chikungunya',
      'yellow-fever',
      'west-nile-virus'
    ],
    commonQuestions: [
      {
        question: 'How long does Zika virus stay in the body?',
        answer: 'Zika virus typically remains in the blood for about a week, though it may persist longer in some bodily fluids. Studies have detected Zika RNA (genetic material) in semen for up to 3 months, in vaginal fluids for up to 2 months, and in urine for up to a month after symptom onset. However, detecting viral RNA doesn\'t necessarily mean the virus is still infectious. Once a person recovers from Zika infection, they likely develop immunity to the virus, though the duration of this immunity is not fully understood.'
      },
      {
        question: 'What birth defects can Zika cause?',
        answer: 'Zika virus infection during pregnancy can cause a range of birth defects collectively known as Congenital Zika Syndrome. The most severe is microcephaly (smaller than normal head size), which can indicate abnormal brain development. Other birth defects include eye abnormalities, hearing loss, seizures, joint problems (like contractures), excessive muscle tone restricting movement, and developmental delays. The risk of birth defects appears highest when infection occurs during the first trimester, though Zika can cause problems throughout pregnancy. Not all babies born to infected mothers will have birth defects.'
      },
      {
        question: 'Is there a vaccine for Zika virus?',
        answer: 'Currently, there is no approved vaccine for Zika virus available to the public. Several vaccine candidates have undergone clinical trials, including DNA vaccines, inactivated virus vaccines, and messenger RNA (mRNA) vaccines. While some have shown promise in early trials, development slowed after Zika outbreaks declined substantially from their 2015-2016 peak. Research continues, but challenges include the difficulty of conducting efficacy trials when transmission rates are low and the need to ensure safety for use in pregnant women—a key target population.'
      }
    ],
    emergencySigns: [
      'Severe abdominal pain',
      'Persistent vomiting',
      'Signs of neurological complications (weakness, numbness, difficulty walking)',
      'Rapid onset of muscle weakness (possible Guillain-Barré syndrome)',
      'Difficulty breathing',
      'Signs of hemorrhage (unusual bleeding or bruising)',
      'Pregnancy complications after Zika exposure'
    ],
    prevalence: 'Since 2015, Zika virus outbreaks have occurred in over 86 countries and territories. The largest outbreak affected approximately 1.5 million people in Brazil in 2015-2016.',
    affectedGroups: [
      'People living in or traveling to areas with active Zika transmission',
      'Pregnant women (high-risk group due to potential fetal effects)',
      'Sexual partners of those infected or exposed to Zika virus',
      'Infants born to mothers infected during pregnancy',
      'People living in tropical areas without adequate mosquito control',
      'Individuals without prior immunity to Zika virus'
    ]
  }
];

export default conditionsUtoZ;
