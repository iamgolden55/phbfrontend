import { HealthCondition } from '../healthConditionsData';

/**
 * Health conditions starting with letters A-C
 */
export const conditionsAtoC: HealthCondition[] = [
  {
    id: 'back-pain',
    name: 'Back Pain',
    description: 'Pain felt in the back that usually originates from the muscles, nerves, bones, joints or other structures in the spine.[1] Back pain can range from a mild, dull, annoying ache, to persistent, severe, disabling pain.[2] Pain can arise from multiple sources including injuries, degenerative conditions, or as a symptom of other medical problems.[3] Most back pain is acute and resolves within weeks, though some cases become chronic and persistent.[4]',
    category: 'bone-and-joint',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Back_pain',
    symptoms: [
      'Localized pain in the back (may be sharp, dull, aching, or burning)',
      'Pain that radiates down the leg (sciatica)',
      'Stiffness or limited mobility of the back',
      'Muscle spasms or tightness',
      'Pain that worsens with bending, lifting, standing or walking',
      'Pain that improves with reclining',
      'Numbness or tingling in limbs',
      'Weakness in legs (in severe cases)',
      'Difficulty standing up straight',
      'Reduced flexibility or range of motion'
    ],
    causes: [
      'Muscle or ligament strain from heavy lifting or sudden awkward movements',
      'Bulging or ruptured disks (herniated disks)',
      'Arthritis (osteoarthritis, rheumatoid arthritis, spondyloarthritis)',
      'Osteoporosis (bone fractures)',
      'Skeletal irregularities (scoliosis, lordosis, kyphosis)',
      'Spinal stenosis (narrowing of the spinal canal)',
      'Poor posture',
      'Sedentary lifestyle',
      'Obesity',
      'Psychological stress',
      'Occupational factors (heavy lifting, repetitive movements)',
      'Pregnancy'
    ],
    treatments: [
      'Over-the-counter pain relievers (NSAIDs, acetaminophen)',
      'Muscle relaxants',
      'Topical pain relievers',
      'Physical therapy and exercise',
      'Limited rest (1-2 days)',
      'Heat or ice application',
      'Gentle stretching',
      'Massage therapy',
      'Chiropractic or osteopathic manipulation',
      'Acupuncture',
      'Cognitive behavioral therapy',
      'Steroid injections',
      'Surgery (in severe cases with nerve compression or structural problems)'
    ],
    preventions: [
      'Regular exercise to strengthen back and core muscles',
      'Maintaining a healthy weight',
      'Proper lifting techniques (bending knees, not waist)',
      'Good posture when sitting and standing',
      'Ergonomic workspace setup',
      'Avoiding prolonged sitting',
      'Regular stretching and movement breaks',
      'Quitting smoking (smoking reduces blood flow to spine)',
      'Stress management techniques',
      'Supportive shoes with low heels'
    ],
    relatedConditions: [
      'sciatica',
      'herniated-disc',
      'spinal-stenosis',
      'ankylosing-spondylitis',
      'spondylolisthesis',
      'fibromyalgia',
      'osteoarthritis',
      'osteoporosis',
      'scoliosis'
    ],
    commonQuestions: [
      {
        question: 'When should I see a doctor for back pain?',
        answer: 'You should see a doctor for back pain if: it persists beyond a few weeks; is severe and doesn\'t improve with rest; spreads down one or both legs, especially if the pain extends below the knee; causes weakness, numbness or tingling in one or both legs; is accompanied by unexplained weight loss; or develops after a fall, blow to your back, or other injury. Additionally, seek immediate medical attention if your back pain is accompanied by bowel or bladder problems, fever, or if it occurs following an accident such as a car crash or fall from height.'
      },
      {
        question: 'What\'s the difference between acute and chronic back pain?',
        answer: 'Acute back pain develops suddenly and typically lasts from a few days to a few weeks. It\'s often related to a specific incident like lifting something heavy or a fall, and usually resolves on its own with self-care. Chronic back pain, by contrast, persists for 12 weeks or longer, even after the initial injury or underlying cause has been treated. Chronic pain may be constant or intermittent, and often requires a different approach to treatment, potentially including a combination of physical therapy, medication, mindfulness practices, and addressing psychological factors that can amplify pain perception.'
      },
      {
        question: 'Is bed rest recommended for back pain?',
        answer: 'No, prolonged bed rest is no longer recommended for back pain. While a short period of rest (1-2 days) may help during acute severe pain, research shows that staying active actually helps recovery and prevents deconditioning of back muscles. Gentle movement and gradual return to normal activities are now standard recommendations. If pain is severe, modify activities rather than avoiding them completely. Continue daily functions as tolerated, gradually increasing activity levels. Specific exercises prescribed by a physical therapist can be particularly beneficial in strengthening core and back muscles to support recovery and prevent recurrence.'
      }
    ],
    emergencySigns: [
      'Loss of bowel or bladder control',
      'Numbness in the groin or rectal area',
      'Severe, progressive leg weakness or numbness',
      'Inability to stand or walk',
      'Back pain with fever',
      'Back pain following trauma such as a car accident or fall',
      'Back pain with unexplained weight loss',
      'Severe, unrelenting night pain'
    ],
    prevalence: 'Back pain is extremely common, with about 80% of adults experiencing low back pain at some point in their lives. It\'s the leading cause of disability worldwide and one of the most common reasons for missed work and doctor visits. The one-year prevalence of low back pain is estimated to be 38%, with the lifetime prevalence reaching up to 84%.',
    affectedGroups: [
      'Adults aged 30-50 (initial onset often in this range)',
      'People with physically demanding jobs',
      'Sedentary individuals',
      'Pregnant women',
      'Older adults',
      'People who are overweight or obese',
      'Smokers',
      'Individuals with a family history of back problems',
      'People with certain medical conditions (arthritis, osteoporosis)'
    ],
    references: [
      {
        id: '1',
        text: 'Maher C, Underwood M, Buchbinder R. (2017). "Non-specific low back pain". Lancet. 389 (10070): 736-747.',
        url: 'https://doi.org/10.1016/S0140-6736(16)30970-9'
      },
      {
        id: '2',
        text: 'Hartvigsen J, Hancock MJ, Kongsted A, et al. (2018). "What low back pain is and why we need to pay attention". Lancet. 391 (10137): 2356-2367.',
        url: 'https://doi.org/10.1016/S0140-6736(18)30480-X'
      },
      {
        id: '3',
        text: 'Foster NE, Anema JR, Cherkin D, et al. (2018). "Prevention and treatment of low back pain: evidence, challenges, and promising directions". Lancet. 391 (10137): 2368-2383.',
        url: 'https://doi.org/10.1016/S0140-6736(18)30489-6'
      },
      {
        id: '4',
        text: 'Qaseem A, Wilt TJ, McLean RM, et al. (2017). "Noninvasive Treatments for Acute, Subacute, and Chronic Low Back Pain: A Clinical Practice Guideline From the American College of Physicians". Annals of Internal Medicine. 166 (7): 514-530.',
        url: 'https://doi.org/10.7326/M16-2367'
      },
      {
        id: '5',
        text: 'Chou R, Qaseem A, Snow V, et al. (2007). "Diagnosis and treatment of low back pain: a joint clinical practice guideline from the American College of Physicians and the American Pain Society". Annals of Internal Medicine. 147 (7): 478-491.',
        url: 'https://doi.org/10.7326/0003-4819-147-7-200710020-00006'
      }
    ]
  },
  {
    id: 'adhd',
    name: 'ADHD',
    description: 'Attention-deficit/hyperactivity disorder (ADHD) is a neurodevelopmental disorder characterized by persistent patterns of inattention, hyperactivity, and impulsivity that interfere with functioning or development.[1] These symptoms often persist from childhood into adolescence and adulthood, affecting academic performance, social interactions, and occupational functioning.[2] ADHD is typically diagnosed in childhood but can be identified at any age.[3]',
    category: 'mental-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Attention_deficit_hyperactivity_disorder',
    symptoms: [
      'Difficulty sustaining attention in tasks or play activities',
      'Failure to follow through on instructions or finish tasks',
      'Easily distracted by extraneous stimuli',
      'Forgetful in daily activities',
      'Fidgeting or tapping hands/feet',
      'Inability to stay seated when expected',
      'Excessive running or climbing in inappropriate situations',
      'Difficulty engaging in activities quietly',
      'Often "on the go" or acting as if "driven by a motor"',
      'Excessive talking and interrupting others',
      'Difficulty waiting turn',
      'Blurting out answers before questions are completed'
    ],
    causes: [
      'Genetic factors (heritability estimated at 74%)',
      'Brain structure and function differences',
      'Neurotransmitter imbalances (particularly dopamine and norepinephrine)',
      'Premature birth or low birth weight',
      'Prenatal exposure to alcohol, tobacco, or other substances',
      'Brain injury or exposure to environmental toxins (e.g., lead)',
      'Maternal stress during pregnancy'
    ],
    treatments: [
      'Stimulant medications (methylphenidate, amphetamine-based)',
      'Non-stimulant medications (atomoxetine, guanfacine, clonidine)',
      'Behavioral therapy and parent training',
      'Cognitive behavioral therapy (CBT)',
      'Educational interventions and accommodations',
      'Social skills training',
      'Organizational skills training',
      'Lifestyle modifications (regular exercise, sleep hygiene, nutrition)'
    ],
    preventions: [
      'Avoiding alcohol, tobacco, and drugs during pregnancy',
      'Reducing exposure to environmental toxins',
      'Early intervention for at-risk children',
      'Proper prenatal care',
      'Promoting healthy brain development through nutrition and stimulation'
    ],
    relatedConditions: [
      'learning-disabilities',
      'anxiety-disorders',
      'mood-disorders',
      'oppositional-defiant-disorder',
      'conduct-disorder',
      'autism-spectrum-disorder',
      'tourettes-syndrome',
      'substance-use-disorders'
    ],
    commonQuestions: [
      {
        question: 'Is ADHD just a childhood disorder?',
        answer: 'No, ADHD is not just a childhood disorder. While symptoms often begin in childhood, about 60-70% of children with ADHD continue to experience symptoms into adulthood. However, the presentation may change over time, with hyperactivity often becoming less obvious and manifesting more as inner restlessness, while difficulties with attention, organization, and impulse control often persist. Many adults with ADHD were never diagnosed in childhood, leading to delayed diagnosis and treatment.'
      },
      {
        question: 'Are ADHD medications addictive or dangerous?',
        answer: 'When properly prescribed and monitored by healthcare professionals, ADHD medications are generally safe and effective. While stimulant medications (the most common treatment) are controlled substances due to potential for misuse, research shows that people with ADHD who take prescribed medication as directed have no increased risk of substance abuse. In fact, proper treatment may reduce this risk. Side effects can occur but are typically mild and manageable through dosage adjustments. Regular monitoring by healthcare providers ensures safe and effective treatment.'
      },
      {
        question: 'How is ADHD diagnosed?',
        answer: 'ADHD diagnosis involves a comprehensive evaluation by qualified healthcare professionals, typically including detailed history-taking, behavioral assessments, and rating scales completed by parents, teachers, and sometimes the individual. There is no single test for ADHD. Clinicians assess whether symptoms are persistent, occur in multiple settings, cause significant impairment, and cannot be better explained by another condition. For children, symptoms must be present before age 12 and be inconsistent with developmental level. Proper diagnosis requires meeting criteria specified in diagnostic manuals like the DSM-5.'
      }
    ],
    prevalence: 'ADHD affects approximately 5-7% of children and 2.5-4% of adults worldwide. Prevalence rates vary by country, partly due to diagnostic practices. It is more commonly diagnosed in males than females, with ratios ranging from 2:1 to 4:1, though this may reflect referral bias as females often present with less obvious symptoms.',
    affectedGroups: [
      'Children (symptoms typically appear between ages 3-6)',
      'Adolescents',
      'Adults',
      'Males (diagnosed more frequently than females)',
      'People with family history of ADHD',
      'Individuals born prematurely or with low birth weight',
      'Those exposed to environmental toxins like lead'
    ],
    references: [
      {
        id: '1',
        text: 'American Psychiatric Association. (2013). "Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition (DSM-5)".',
        url: 'https://doi.org/10.1176/appi.books.9780890425596'
      },
      {
        id: '2',
        text: 'Faraone SV, Asherson P, Banaschewski T, et al. (2015). "Attention-deficit/hyperactivity disorder". Nature Reviews Disease Primers. 1: 15020.',
        url: 'https://doi.org/10.1038/nrdp.2015.20'
      },
      {
        id: '3',
        text: 'Wolraich ML, Hagan JF, Allan C, et al. (2019). "Clinical Practice Guideline for the Diagnosis, Evaluation, and Treatment of Attention-Deficit/Hyperactivity Disorder in Children and Adolescents". Pediatrics. 144 (4): e20192528.',
        url: 'https://doi.org/10.1542/peds.2019-2528'
      },
      {
        id: '4',
        text: 'Kooij JJS, Bijlenga D, Salerno L, et al. (2019). "Updated European Consensus Statement on diagnosis and treatment of adult ADHD". European Psychiatry. 56: 14-34.',
        url: 'https://doi.org/10.1016/j.eurpsy.2018.11.001'
      },
      {
        id: '5',
        text: 'Posner J, Polanczyk GV, Sonuga-Barke E. (2020). "Attention-deficit hyperactivity disorder". Lancet. 395 (10222): 450-462.',
        url: 'https://doi.org/10.1016/S0140-6736(19)33004-1'
      }
    ]
  },
  {
    id: 'bleeding-disorders',
    name: 'Bleeding Disorders',
    description: 'A group of conditions in which there is a problem with the body\'s blood clotting process, resulting in prolonged or excessive bleeding.[1] These disorders can cause bleeding to occur spontaneously or continue longer than normal following an injury or surgery.[2] They can range from mild to severe and may be inherited or acquired during life.[3] The most common inherited bleeding disorder is von Willebrand disease, while hemophilia is perhaps the most well-known.[4]',
    category: 'immune-system',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Bleeding_diathesis',
    symptoms: [
      'Easy or excessive bruising',
      'Prolonged bleeding from cuts or injuries',
      'Nosebleeds that occur frequently or are difficult to stop',
      'Heavy or prolonged menstrual bleeding in women',
      'Bleeding gums',
      'Blood in urine or stool',
      'Joint bleeding (hemarthrosis) causing pain and swelling, particularly in severe hemophilia',
      'Unexplained bleeding episodes',
      'Excessive bleeding during or after surgery or dental procedures',
      'Large, deep bruises (hematomas)'
    ],
    causes: [
      'Genetic mutations affecting clotting factor proteins (in inherited disorders)',
      'Low platelet count (thrombocytopenia)',
      'Platelet dysfunction',
      'Vitamin K deficiency',
      'Liver disease (which impairs clotting factor production)',
      'Certain medications (anticoagulants, aspirin, NSAIDs)',
      'Autoimmune conditions that attack platelets or clotting factors',
      'Severe infections or sepsis',
      'Cancer, particularly leukemia or those affecting the bone marrow',
      'Disseminated intravascular coagulation (DIC)'
    ],
    treatments: [
      'Clotting factor replacement therapy for specific factor deficiencies',
      'Desmopressin (DDAVP) to boost von Willebrand factor and factor VIII levels',
      'Antifibrinolytic medications like tranexamic acid to prevent clot breakdown',
      'Vitamin K for vitamin K deficiency',
      'Platelet transfusions for platelet disorders',
      'Fresh frozen plasma for multiple factor deficiencies',
      'Immunosuppressive drugs for autoimmune causes',
      'Iron supplements for anemia due to blood loss',
      'Gene therapy (emerging treatment for some inherited disorders)',
      'Treatment of underlying conditions causing acquired bleeding disorders'
    ],
    preventions: [
      'Genetic counseling for families with inherited bleeding disorders',
      'Avoiding medications that interfere with clotting (when diagnosed with a bleeding disorder)',
      'Wearing medical alert identification',
      'Regular preventive treatment (prophylaxis) in severe cases',
      'Maintaining a healthy diet with adequate vitamin K',
      'Regular check-ups with hematologists',
      'Avoiding contact sports or high-risk activities in severe cases',
      'Preventive treatment before surgical or dental procedures',
      'Learning self-care and first aid for bleeding episodes'
    ],
    relatedConditions: [
      'hemophilia-a',
      'hemophilia-b',
      'von-willebrand-disease',
      'thrombocytopenia',
      'disseminated-intravascular-coagulation',
      'vitamin-k-deficiency',
      'liver-disease',
      'leukemia',
      'immune-thrombocytopenic-purpura'
    ],
    commonQuestions: [
      {
        question: 'How are bleeding disorders diagnosed?',
        answer: 'Diagnosing bleeding disorders typically begins with a detailed medical history, family history, and physical examination. Laboratory tests are essential and may include: complete blood count to assess platelets; prothrombin time (PT) and activated partial thromboplastin time (aPTT) to evaluate the clotting pathway; specific factor assays to measure levels of individual clotting factors; von Willebrand factor antigen and activity tests; platelet function tests; and genetic testing for inherited disorders. A bleeding assessment tool may be used to quantify bleeding symptoms. For inherited disorders, diagnosis often occurs after family screening or investigation of suspicious bleeding episodes. Accurate diagnosis is critical for proper management, especially before surgeries or invasive procedures.'
      },
      {
        question: 'Can bleeding disorders be cured?',
        answer: 'Most inherited bleeding disorders cannot be completely cured with current treatments, but they can be effectively managed. Treatment approaches focus on preventing and controlling bleeding episodes and maintaining quality of life. For acquired bleeding disorders, addressing the underlying cause may lead to resolution or improvement. For example, if a medication is causing bleeding problems, discontinuing it may resolve the issue. Recent advances in gene therapy show promise for potential cures for some inherited disorders, particularly hemophilia, by introducing functional copies of missing or defective genes. Several clinical trials have shown encouraging results, though these therapies are still developing and not widely available. Regular consultations with hematologists ensure patients receive the most current and appropriate treatments.'
      },
      {
        question: 'Are bleeding disorders more common in women or men?',
        answer: 'The prevalence of bleeding disorders varies by specific type and gender. Hemophilia A and B primarily affect males because they\'re X-linked recessive disorders, though female carriers may experience mild symptoms. In contrast, von Willebrand disease, the most common inherited bleeding disorder, affects both sexes equally. Women with bleeding disorders face unique challenges due to menstruation and childbirth, which can lead to complications like heavy menstrual bleeding (menorrhagia) and postpartum hemorrhage. Interestingly, bleeding disorders are often underdiagnosed in women because heavy menstrual bleeding might be considered "normal" or attributed to other gynecological conditions. Recent awareness efforts have focused on improving diagnosis rates in women by recognizing that bleeding symptoms may manifest differently across genders.'
      }
    ],
    emergencySigns: [
      'Uncontrollable bleeding from any site',
      'Signs of internal bleeding (swelling, pain, discoloration)',
      'Head injury with potential internal bleeding',
      'Bleeding into joints causing severe pain and swelling',
      'Bleeding in the throat or neck that could affect breathing',
      'Severe abdominal pain (possible internal bleeding)',
      'Blood in vomit or coughing up blood',
      'Significant blood loss causing dizziness, confusion, or fainting'
    ],
    prevalence: 'The prevalence of bleeding disorders varies by type. Von Willebrand disease affects approximately 1% of the global population, though many cases go undiagnosed. Hemophilia A affects about 1 in 5,000 male births worldwide, while Hemophilia B affects approximately 1 in 30,000. Rare factor deficiencies collectively affect about 1 in 500,000 to 1 in 2 million people. Acquired bleeding disorders are more common in elderly populations and those with certain medical conditions.',
    affectedGroups: [
      'People with family history of bleeding disorders (for inherited types)',
      'Males (for hemophilia A and B)',
      'Both sexes (for von Willebrand disease and most other disorders)',
      'Women with heavy menstrual bleeding (potentially undiagnosed)',
      'Elderly individuals (higher risk of acquired disorders)',
      'Patients with liver disease, kidney disease, or cancer',
      'People taking anticoagulant medications',
      'Individuals with autoimmune conditions',
      'Premature infants (vitamin K deficiency)'
    ],
    references: [
      {
        id: '1',
        text: 'James AH, Kouides PA, Abdul-Kadir R, et al. (2009). "Von Willebrand disease and other bleeding disorders in women: consensus on diagnosis and management from an international expert panel". American Journal of Obstetrics and Gynecology. 201 (1): 12.e1-12.e8.',
        url: 'https://doi.org/10.1016/j.ajog.2009.04.024'
      },
      {
        id: '2',
        text: 'Konkle BA, Huston H, Nakaya Fletcher S. (2017). "Hemophilia A". In: Adam MP, et al., editors. GeneReviews. University of Washington, Seattle.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK1404/'
      },
      {
        id: '3',
        text: 'Nurden AT, Nurden P. (2014). "Congenital platelet disorders and understanding of platelet function". British Journal of Haematology. 165 (2): 165-178.',
        url: 'https://doi.org/10.1111/bjh.12662'
      },
      {
        id: '4',
        text: 'Nichols WL, Hultin MB, James AH, et al. (2008). "von Willebrand disease (VWD): evidence-based diagnosis and management guidelines, the National Heart, Lung, and Blood Institute (NHLBI) Expert Panel report (USA)". Haemophilia. 14 (2): 171-232.',
        url: 'https://doi.org/10.1111/j.1365-2516.2007.01643.x'
      },
      {
        id: '5',
        text: 'Sharma R, Haberichter SL. (2019). "New advances in the diagnosis of von Willebrand disease". Hematology: American Society of Hematology Education Program. 2019 (1): 596-600.',
        url: 'https://doi.org/10.1182/hematology.2019000064'
      }
    ]
  },
  {
    id: 'bladder-infection',
    name: 'Bladder Infection (UTI)',
    description: 'A bladder infection, also known as cystitis, is a type of urinary tract infection (UTI) that affects the bladder.[1] It occurs when bacteria, typically from the digestive tract, enter the urethra and travel to the bladder, causing inflammation and infection.[2] Bladder infections are more common in women due to their shorter urethra, which allows bacteria easier access to the bladder.[3] While uncomfortable, they typically respond well to treatment and rarely lead to complications if addressed promptly.[4]',
    category: 'urinary-system',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Urinary_tract_infection',
    symptoms: [
      'Frequent urination',
      'Urgent need to urinate (urgency)',
      'Burning or painful urination (dysuria)',
      'Cloudy, dark, bloody, or strong-smelling urine',
      'Pressure or pain in the lower abdomen or back',
      'Feeling tired or shaky',
      'Low-grade fever',
      'Waking up to urinate during the night',
      'Discomfort above the pubic bone',
      'Incomplete emptying of the bladder'
    ],
    causes: [
      'Bacterial infection (most commonly Escherichia coli from the intestines)',
      'Sexual activity (especially in women)',
      'Use of certain types of birth control (diaphragms, spermicidal agents)',
      'Menopause (decreased estrogen leads to changes in the urinary tract)',
      'Urinary tract abnormalities or blockages',
      'Suppressed immune system',
      'Catheter use',
      'Recent urinary procedures',
      'Pregnancy',
      'Incomplete bladder emptying (due to nerve damage, prolapse, etc.)'
    ],
    treatments: [
      'Antibiotics (usually for 3-7 days depending on severity)',
      'Pain relievers (phenazopyridine for urinary pain)',
      'Increased fluid intake to help flush bacteria',
      'Avoiding irritants (caffeine, alcohol, spicy foods)',
      'Applying heat to the abdomen to reduce discomfort',
      'Probiotics to help restore normal bacterial balance',
      'For recurrent infections: longer antibiotic courses or prophylactic antibiotics',
      'For postmenopausal women: vaginal estrogen therapy may help prevent recurrence'
    ],
    preventions: [
      'Drink plenty of water',
      'Urinate frequently and completely, especially after sexual activity',
      'Wipe from front to back after using the toilet (for women)',
      'Take showers instead of baths',
      'Avoid irritating feminine products (douches, powders, sprays)',
      'Consider changing birth control methods if prone to UTIs',
      'Wear cotton underwear and loose-fitting clothes',
      'Consume cranberry products (limited evidence suggests they may help prevent UTIs)'
    ],
    relatedConditions: [
      'kidney-infection',
      'urethritis',
      'interstitial-cystitis',
      'prostatitis',
      'sexually-transmitted-infections',
      'urinary-incontinence',
      'kidney-stones',
      'diabetes'
    ],
    commonQuestions: [
      {
        question: 'Do I need antibiotics for every bladder infection?',
        answer: 'While most bladder infections are treated with antibiotics, some mild cases may resolve on their own with increased fluid intake and other home remedies. However, medical advice should always be sought, as untreated infections can spread to the kidneys and cause more serious problems. Healthcare providers may sometimes recommend a "wait and see" approach with close monitoring for very mild cases, particularly to address concerns about antibiotic resistance. That said, if symptoms persist beyond 1-2 days or worsen, antibiotics are typically necessary. Certain groups, including pregnant women, people with diabetes, and those with compromised immune systems, should always receive prompt antibiotic treatment.'
      },
      {
        question: 'Why do I get recurrent bladder infections?',
        answer: 'Recurrent bladder infections (defined as three or more infections within a year) may occur due to several factors. In women, anatomical factors like a shorter urethra increase vulnerability. Genetic factors may play a role, as some people have cell receptors that bacteria adhere to more easily. Behavioral factors such as sexual activity patterns, hygiene practices, and contraceptive methods can contribute. Incomplete bladder emptying, often due to prolapse or neurological conditions, allows bacteria to multiply. Menopause decreases protective vaginal estrogen. Underlying conditions like diabetes or immunosuppression increase risk. If you experience recurrent infections, your healthcare provider may recommend additional testing to identify specific causes and create a personalized prevention strategy.'
      },
      {
        question: 'Can men get bladder infections?',
        answer: 'Yes, men can get bladder infections, although they\'re less common than in women. Men have longer urethras, which provides more distance for bacteria to travel to reach the bladder. When men do develop UTIs, they warrant careful evaluation as they may indicate an underlying issue such as an enlarged prostate, kidney stones, or structural abnormalities. Risk factors for men include being uncircumcised, having anal intercourse, having an enlarged prostate, recent urinary tract procedures, and use of urinary catheters. In older men, prostatic hyperplasia (enlarged prostate) is a common contributor as it can prevent complete bladder emptying. Men with suspected UTIs should always seek medical attention for proper diagnosis and treatment.'
      }
    ],
    emergencySigns: [
      'High fever (over 101°F or 38.3°C)',
      'Severe back or side pain',
      'Nausea and vomiting',
      'Shaking and chills',
      'Blood in urine',
      'Severe abdominal pain',
      'Confusion or disorientation (especially in elderly patients)',
      'Symptoms of bladder infection during pregnancy'
    ],
    prevalence: 'Urinary tract infections are among the most common bacterial infections, accounting for about 8 million doctor visits annually in the United States. Women are significantly more affected, with about 50-60% experiencing at least one UTI in their lifetime. Among these, approximately 20-30% will have recurrent infections. The incidence increases with age in both sexes, with elderly individuals in care facilities having the highest rates.',
    affectedGroups: [
      'Women (especially sexually active)',
      'Elderly individuals',
      'Pregnant women',
      'People with diabetes',
      'Individuals with compromised immune systems',
      'People with urinary tract abnormalities',
      'Catheter users',
      'Postmenopausal women',
      'Men with enlarged prostates'
    ],
    references: [
      {
        id: '1',
        text: 'Hooton TM. (2012). "Clinical practice. Uncomplicated urinary tract infection". New England Journal of Medicine. 366 (11): 1028-1037.',
        url: 'https://doi.org/10.1056/NEJMcp1104429'
      },
      {
        id: '2',
        text: 'Flores-Mireles AL, Walker JN, Caparon M, Hultgren SJ. (2015). "Urinary tract infections: epidemiology, mechanisms of infection and treatment options". Nature Reviews Microbiology. 13 (5): 269-284.',
        url: 'https://doi.org/10.1038/nrmicro3432'
      },
      {
        id: '3',
        text: 'Gupta K, Hooton TM, Naber KG, et al. (2011). "International clinical practice guidelines for the treatment of acute uncomplicated cystitis and pyelonephritis in women: A 2010 update by the Infectious Diseases Society of America and the European Society for Microbiology and Infectious Diseases". Clinical Infectious Diseases. 52 (5): e103-e120.',
        url: 'https://doi.org/10.1093/cid/ciq257'
      },
      {
        id: '4',
        text: 'Medina M, Castillo-Pino E. (2019). "An introduction to the epidemiology and burden of urinary tract infections". Therapeutic Advances in Urology. 11: 1756287219832172.',
        url: 'https://doi.org/10.1177/1756287219832172'
      },
      {
        id: '5',
        text: 'Anger J, Lee U, Ackerman AL, et al. (2019). "Recurrent Uncomplicated Urinary Tract Infections in Women: AUA/CUA/SUFU Guideline". Journal of Urology. 202 (2): 282-289.',
        url: 'https://doi.org/10.1097/JU.0000000000000296'
      }
    ]
  },
  {
    id: 'cataracts',
    name: 'Cataracts',
    description: 'A clouding of the normally clear lens of the eye, leading to a decrease in vision.[1] Cataracts often develop slowly and can affect one or both eyes.[2] The condition is most common in older adults, but can occasionally occur in younger people or even newborns.[3] Cataracts are the leading cause of blindness worldwide and the leading cause of vision loss in the United States.[4]',
    category: 'eye-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Cataract',
    symptoms: [
      'Cloudy, blurry, or dim vision',
      'Increasing difficulty with vision at night',
      'Sensitivity to light and glare',
      'Need for brighter light for reading and other activities',
      'Seeing "halos" around lights',
      'Frequent changes in eyeglass or contact lens prescription',
      'Fading or yellowing of colors',
      'Double vision in a single eye',
      'Difficulty discerning contrasts',
      'Temporary improvement in near vision ("second sight")'
    ],
    causes: [
      'Aging (most common cause)',
      'Eye injury or trauma',
      'Radiation exposure',
      'Prolonged use of corticosteroid medications',
      'Excessive exposure to sunlight (UV radiation)',
      'Diabetes',
      'Smoking',
      'Alcohol consumption',
      'Family history and genetic factors',
      'Previous eye surgery',
      'Congenital conditions (present at birth)',
      'Hypertension'
    ],
    treatments: [
      'Cataract surgery (phacoemulsification with intraocular lens implantation)',
      'Prescription glasses or contact lenses (for early-stage cataracts)',
      'Stronger lighting and magnifying lenses for reading',
      'Anti-glare sunglasses for daytime use',
      'Regular monitoring if surgery is deferred',
      'Newer techniques like femtosecond laser-assisted cataract surgery',
      'Multifocal or accommodative intraocular lenses to reduce need for glasses after surgery',
      'Toric intraocular lenses for astigmatism correction'
    ],
    preventions: [
      'Regular eye examinations',
      'Wearing sunglasses that block ultraviolet B (UVB) rays',
      'Quitting smoking',
      'Eating a diet rich in fruits and vegetables (especially those with antioxidants)',
      'Maintaining healthy blood sugar levels if diabetic',
      'Limiting alcohol consumption',
      'Managing other health problems',
      'Protecting eyes from injuries'
    ],
    relatedConditions: [
      'glaucoma',
      'age-related-macular-degeneration',
      'diabetic-retinopathy',
      'presbyopia',
      'uveitis',
      'retinal-detachment',
      'secondary-cataracts'
    ],
    commonQuestions: [
      {
        question: 'At what stage should cataracts be removed?',
        answer: 'There is no specific level of vision loss that definitively indicates when cataract surgery should be performed. The decision depends primarily on how the cataract affects your daily activities and quality of life. If your vision impairment interferes with reading, driving, working, or other routine activities despite optimal glasses correction, surgery may be appropriate. Modern cataract surgery is generally safe and effective, so there\'s no need to wait until the cataract is "ripe" or severely impairing, as was common in the past. However, if the cataract isn\'t significantly affecting your lifestyle, it\'s reasonable to delay surgery. This is a personal decision that should be made in consultation with your ophthalmologist after weighing the benefits and risks.'
      },
      {
        question: 'What happens during cataract surgery?',
        answer: 'Cataract surgery is typically an outpatient procedure lasting about 30 minutes. After administering local anesthesia (eye drops or injections) and possibly mild sedation, the surgeon makes a tiny incision in the cornea. Then, using a technique called phacoemulsification, they insert a small probe that emits ultrasound waves to break up the cloudy lens, which is removed by suction. Next, an artificial intraocular lens (IOL) is inserted to replace the natural lens. The incision usually self-seals without stitches. Advanced options include femtosecond laser-assisted surgery for greater precision, and various types of IOLs (monofocal, multifocal, toric, accommodative) that can correct different vision issues. Recovery is generally quick, with improved vision often noticeable within days.'
      },
      {
        question: 'Can cataracts come back after surgery?',
        answer: 'True cataracts cannot "grow back" after surgery because the entire natural lens is removed and replaced with an artificial intraocular lens (IOL). However, approximately 20-30% of patients develop a condition called posterior capsule opacification (PCO), sometimes referred to as a "secondary cataract," months or years after surgery. This occurs when the clear capsule that holds the artificial lens becomes cloudy due to cell growth. Unlike cataracts, PCO is quickly and painlessly treated with a simple laser procedure called YAG laser capsulotomy, which creates an opening in the clouded capsule to restore clear vision. This is a brief outpatient procedure that typically provides immediate vision improvement without requiring incisions or replacement of the IOL.'
      }
    ],
    emergencySigns: [
      'Sudden vision changes or loss',
      'Severe eye pain',
      'Double vision that occurs suddenly',
      'Flashes of light, floaters, or a curtain-like shadow in your field of vision (may indicate retinal detachment)',
      'Red eye with pain and vision changes (may indicate acute glaucoma)',
      'Severe headache with visual disturbances'
    ],
    prevalence: 'Cataracts affect more than 24.4 million Americans aged 40 and older. By age 80, more than half of all Americans have cataracts or have undergone cataract surgery. Globally, cataracts are responsible for 51% of world blindness, representing about 20 million people.',
    affectedGroups: [
      'Older adults (risk increases significantly after age 60)',
      'People with diabetes',
      'Smokers',
      'People with prolonged exposure to sunlight',
      'Those with family history of cataracts',
      'People who have used corticosteroid medications long-term',
      'Individuals with previous eye injuries, inflammation, or surgery',
      'People with certain medical conditions like diabetes or hypertension',
      'Infants (congenital cataracts, though rare)'
    ],
    references: [
      {
        id: '1',
        text: 'Asbell PA, Dualan I, Mindel J, et al. (2005). "Age-related cataract". Lancet. 365 (9459): 599-609.',
        url: 'https://doi.org/10.1016/S0140-6736(05)17911-2'
      },
      {
        id: '2',
        text: 'Liu YC, Wilkins M, Kim T, Malyugin B, Mehta JS. (2017). "Cataracts". Lancet. 390 (10094): 600-612.',
        url: 'https://doi.org/10.1016/S0140-6736(17)30544-5'
      },
      {
        id: '3',
        text: 'Kiziltoprak H, Tekin K, Inanc M, Goker YS. (2019). "Cataract in diabetes mellitus". World Journal of Diabetes. 10 (3): 140-153.',
        url: 'https://doi.org/10.4239/wjd.v10.i3.140'
      },
      {
        id: '4',
        text: 'World Health Organization. (2021). "Blindness and vision impairment". Fact sheets.',
        url: 'https://www.who.int/news-room/fact-sheets/detail/blindness-and-visual-impairment'
      },
      {
        id: '5',
        text: 'National Eye Institute. (2019). "Cataract Data and Statistics".',
        url: 'https://www.nei.nih.gov/learn-about-eye-health/outreach-campaigns-and-resources/eye-health-data-and-statistics/cataract-data-and-statistics'
      }
    ]
  },
  {
    id: 'celiac-disease',
    name: 'Celiac Disease',
    description: 'An autoimmune disorder where ingestion of gluten leads to damage in the small intestine.[1] When people with celiac disease eat gluten (a protein found in wheat, rye, and barley), their body mounts an immune response that attacks the small intestine.[2] These attacks damage the villi, small fingerlike projections that line the small intestine and promote nutrient absorption.[3] When the villi are damaged, the body cannot absorb nutrients properly.[4]',
    category: 'digestive-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Coeliac_disease',
    symptoms: [
      'Diarrhea',
      'Fatigue',
      'Weight loss',
      'Bloating and gas',
      'Abdominal pain',
      'Nausea and vomiting',
      'Constipation',
      'Iron-deficiency anemia',
      'Skin rash (dermatitis herpetiformis)',
      'Damage to dental enamel',
      'Headaches and fatigue',
      'Joint pain',
      'Reduced functioning of the spleen (hyposplenism)',
      'Neurological problems like numbness and tingling in feet and hands',
      'In children: delayed growth, delayed puberty, failure to thrive'
    ],
    causes: [
      'Genetic predisposition (HLA-DQ2 and HLA-DQ8 genes)',
      'Environmental factors that may trigger the disease in genetically susceptible individuals',
      'Consumption of gluten (found in wheat, barley, and rye)',
      'Possibly viral infections or gut bacteria imbalances',
      'Sometimes triggered after pregnancy, childbirth, surgery, viral infection, or severe emotional stress'
    ],
    treatments: [
      'Strict, lifelong gluten-free diet',
      'Nutritional supplements to address deficiencies (iron, folate, vitamin B12, vitamin D, calcium, zinc)',
      'Medications to control intestinal inflammation in severe cases',
      'Regular follow-up with healthcare providers',
      'Consultation with dietitian specialized in celiac disease',
      'Bone density testing and treatment if osteoporosis is present',
      'Monitoring for associated conditions',
      'Support groups and education about gluten-free living'
    ],
    preventions: [
      'Currently no known prevention for developing the disease',
      'Early diagnosis and treatment can prevent complications',
      'Strict adherence to gluten-free diet to prevent symptoms and complications',
      'Regular medical follow-up to monitor the condition',
      'Screening for family members due to genetic component'
    ],
    relatedConditions: [
      'dermatitis-herpetiformis',
      'type-1-diabetes',
      'thyroid-disorders',
      'osteoporosis',
      'infertility',
      'non-celiac-gluten-sensitivity',
      'irritable-bowel-syndrome',
      'inflammatory-bowel-disease',
      'autoimmune-hepatitis',
      'down-syndrome',
      'turner-syndrome'
    ],
    commonQuestions: [
      {
        question: 'What is the difference between celiac disease and gluten sensitivity?',
        answer: 'Celiac disease is an autoimmune disorder where gluten consumption triggers an immune response that damages the small intestine\'s lining, leading to inflammation and nutrient malabsorption. It can be diagnosed through specific blood tests and intestinal biopsies and involves a genetic component. Non-celiac gluten sensitivity (NCGS), on the other hand, causes symptoms similar to celiac disease when gluten is consumed, but without the intestinal damage or autoimmune response. NCGS doesn\'t show the same antibodies in blood tests and doesn\'t damage the intestines. It\'s diagnosed primarily by ruling out celiac disease and wheat allergy, then observing symptom improvement on a gluten-free diet. Both conditions require avoiding gluten, but celiac disease carries risks of serious long-term complications if untreated.'
      },
      {
        question: 'Can celiac disease develop later in life?',
        answer: 'Yes, celiac disease can develop at any age, even in older adults who have previously tolerated gluten without apparent problems. While some people develop symptoms in childhood, many aren\'t diagnosed until adulthood, sometimes not until their 40s, 50s, or even 70s. The condition requires both genetic predisposition and environmental triggers. These triggers, which might include viral infections, pregnancy, childbirth, surgery, or periods of severe emotional stress, can activate the immune response to gluten later in life. Studies suggest that the longer a person with genetic susceptibility consumes gluten, the more likely they may be to develop the disease. This is why someone might consume gluten for decades before developing symptoms, leading to what appears to be adult-onset celiac disease.'
      },
      {
        question: 'Is a gluten-free diet necessary for everyone?',
        answer: 'No, a gluten-free diet is not necessary or beneficial for everyone. It\'s essential for people with celiac disease (about 1% of the population) and may help those with non-celiac gluten sensitivity or wheat allergy. However, for the general population without these conditions, there\'s no evidence that eliminating gluten provides health benefits. In fact, unnecessarily following a gluten-free diet may lead to nutritional deficiencies, as many gluten-free substitute products are lower in fiber, vitamins, and minerals than their gluten-containing counterparts. Whole grains containing gluten provide important nutrients, fiber, and health benefits. Additionally, self-diagnosing and starting a gluten-free diet before proper testing can interfere with accurate diagnosis of celiac disease. Anyone considering a gluten-free diet should consult with healthcare providers first.'
      }
    ],
    emergencySigns: [
      'Severe, persistent abdominal pain',
      'Significant, unintentional weight loss',
      'Persistent diarrhea leading to dehydration',
      'Blood in stool',
      'Severe fatigue or weakness',
      'High fever accompanying digestive symptoms',
      'Symptoms of anemia (extreme fatigue, dizziness, pale skin)',
      'Neurological symptoms like confusion or difficulty with coordination'
    ],
    prevalence: 'Celiac disease affects about 1% of the global population, though many cases remain undiagnosed. In the United States, an estimated 1 in 133 people have celiac disease. The condition is more common in people who have a family member with celiac disease, with a 1 in 22 risk for first-degree relatives and 1 in 39 risk for second-degree relatives.',
    affectedGroups: [
      'People with family history of celiac disease',
      'Women (affected at rates 2-3 times higher than men)',
      'People of European descent (highest prevalence)',
      'Individuals with other autoimmune disorders (Type 1 diabetes, thyroid disease, etc.)',
      'People with Down syndrome, Turner syndrome',
      'All age groups, though diagnosis often occurs in childhood or middle adulthood',
      'Genetically predisposed individuals (carrying HLA-DQ2 or HLA-DQ8 genes)'
    ],
    references: [
      {
        id: '1',
        text: 'Lebwohl B, Sanders DS, Green PHR. (2018). "Coeliac disease". Lancet. 391 (10115): 70-81.',
        url: 'https://doi.org/10.1016/S0140-6736(17)31796-8'
      },
      {
        id: '2',
        text: 'Caio G, Volta U, Sapone A, et al. (2019). "Celiac disease: a comprehensive current review". BMC Medicine. 17 (1): 142.',
        url: 'https://doi.org/10.1186/s12916-019-1380-z'
      },
      {
        id: '3',
        text: 'Lindfors K, Ciacci C, Kurppa K, et al. (2019). "Coeliac disease". Nature Reviews Disease Primers. 5: 3.',
        url: 'https://doi.org/10.1038/s41572-018-0054-z'
      },
      {
        id: '4',
        text: 'Leonard MM, Sapone A, Catassi C, Fasano A. (2017). "Celiac Disease and Nonceliac Gluten Sensitivity: A Review". JAMA. 318 (7): 647-656.',
        url: 'https://doi.org/10.1001/jama.2017.9730'
      },
      {
        id: '5',
        text: 'Al-Toma A, Volta U, Auricchio R, et al. (2019). "European Society for the Study of Coeliac Disease (ESsCD) guideline for coeliac disease and other gluten-related disorders". United European Gastroenterology Journal. 7 (5): 583-613.',
        url: 'https://doi.org/10.1177/2050640619844125'
      }
    ]
  },
  {
    id: 'cerebral-palsy',
    name: 'Cerebral Palsy',
    description: 'A group of permanent movement disorders that appear in early childhood, characterized by abnormal muscle tone, posture, and coordination.[1] Cerebral palsy is caused by abnormal development or damage to the parts of the brain that control movement, balance, and posture.[2] The symptoms vary widely among individuals, from mild to severe, and may change over time.[3] While cerebral palsy affects movement and coordination, many people with the condition also experience related conditions such as intellectual disability, seizures, vision or hearing problems, and joint problems.[4]',
    category: 'brain-and-nerves',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Cerebral_palsy',
    symptoms: [
      'Delayed motor skills development (sitting, crawling, walking)',
      'Variations in muscle tone (too stiff or too floppy)',
      'Stiff muscles with exaggerated reflexes (spasticity)',
      'Stiff muscles with normal reflexes (rigidity)',
      'Lack of muscle coordination (ataxia)',
      'Tremors or involuntary movements',
      'Slow, writhing movements (athetosis)',
      'Favoring one side of the body',
      'Difficulty with precise movements like writing or buttoning clothes',
      'Difficulty with balance and walking',
      'Excessive drooling or difficulties with swallowing',
      'Difficulties with speech (dysarthria)',
      'Seizures (in about one-third of cases)'
    ],
    causes: [
      'Brain damage before, during, or shortly after birth',
      'Infections during pregnancy (e.g., rubella, cytomegalovirus, toxoplasmosis)',
      'Maternal infections that trigger inflammatory responses',
      'Fetal stroke disrupting blood supply to the developing brain',
      'Bleeding in the brain during or shortly after birth',
      'Infant infections causing brain inflammation (e.g., meningitis, encephalitis)',
      'Traumatic head injury during birth or early infancy',
      'Lack of oxygen to the brain (asphyxia) related to difficult labor or delivery',
      'Severe jaundice and kernicterus',
      'Genetic disorders and mutations',
      'Premature birth, especially before 32 weeks gestation',
      'Low birth weight, especially under 2.5 pounds',
      'Multiple births (twins, triplets)'
    ],
    treatments: [
      'Physical therapy to improve mobility and strengthen muscles',
      'Occupational therapy to develop daily living skills',
      'Speech therapy for communication and swallowing difficulties',
      'Medications to reduce muscle tightness (baclofen, diazepam, botulinum toxin injections)',
      'Orthotics (braces, splints) to improve mobility and stretch spastic muscles',
      'Assistive technology devices (communication aids, adapted computer equipment)',
      'Surgeries to reduce muscle tightness or correct bone abnormalities',
      'Selective dorsal rhizotomy to reduce spasticity',
      'Intrathecal baclofen therapy via implanted pump',
      'Pain management strategies',
      'Psychological support and behavioral therapy',
      'Comprehensive multidisciplinary care'
    ],
    preventions: [
      'Regular prenatal care to identify and treat health problems',
      'Vaccinations for women before and during pregnancy',
      'Avoiding alcohol, tobacco, and illicit drugs during pregnancy',
      'Controlling maternal health conditions (diabetes, hypertension, thyroid problems)',
      'RhoGAM for Rh-negative mothers to prevent complications',
      'Management of high-risk pregnancies by specialists',
      'Preventing premature birth when possible',
      'Protecting infants from head injuries (car seats, preventing falls)',
      'Prompt treatment of infant infections and jaundice',
      'Maintaining infant vaccination schedules'
    ],
    relatedConditions: [
      'epilepsy',
      'intellectual-disability',
      'vision-impairment',
      'hearing-loss',
      'speech-disorders',
      'feeding-difficulties',
      'gastroesophageal-reflux',
      'hip-displacement',
      'scoliosis',
      'contractures',
      'behavioral-disorders',
      'sleep-disorders',
      'urinary-incontinence'
    ],
    commonQuestions: [
      {
        question: 'Does cerebral palsy get worse over time?',
        answer: 'Cerebral palsy itself is non-progressive, meaning the initial brain damage does not worsen over time. However, the physical symptoms and manifestations may change as a person grows and develops. Some individuals may experience increased muscle tightness, joint problems, or pain as they age. Secondary conditions like musculoskeletal problems can develop or worsen due to the primary movement disorders. With appropriate therapeutic interventions, proper medical care, and management strategies, many people with cerebral palsy can maintain or improve their functional abilities throughout life. Early intervention is particularly important in maximizing potential and preventing complications. Each person\'s experience with cerebral palsy is unique, and the course of the condition varies significantly among individuals.'
      },
      {
        question: 'When is cerebral palsy usually diagnosed?',
        answer: 'The timing of cerebral palsy diagnosis varies, but most cases are diagnosed during the first two years of life. Very severe cases may be identified in early infancy, while milder cases might not be diagnosed until age 4-5 or even later. Diagnosis typically begins with observation of delayed motor milestones or abnormal motor patterns. For high-risk infants (premature birth, complications during delivery, etc.), careful monitoring may lead to earlier identification. The diagnostic process usually involves clinical observations over time, neurological examinations, and sometimes brain imaging (MRI, CT scans). Definitive diagnosis often takes time because doctors need to rule out other conditions and observe the child\'s development patterns. Early diagnosis is important for accessing interventions that can maximize development during critical periods of brain plasticity.'
      },
      {
        question: 'Can people with cerebral palsy live independently?',
        answer: 'Many people with cerebral palsy can and do live independently, though the level of independence varies based on the severity of the condition and associated impairments. Those with mild to moderate cerebral palsy often achieve substantial independence in adulthood, living in their own homes, pursuing education, maintaining employment, and participating fully in community life. Even individuals with more severe physical limitations can achieve significant independence with appropriate accommodations, assistive technology, and support services. Housing modifications, mobility aids, communication devices, and personal assistance services can facilitate independent living. The key factors influencing independence include not just the physical aspects of cerebral palsy, but also cognitive abilities, access to appropriate education and training, availability of support services, environmental accessibility, and societal attitudes. With the right resources and opportunities, most people with cerebral palsy can reach their maximum potential for independence.'
      }
    ],
    emergencySigns: [
      'Seizures, especially if prolonged or occurring in clusters',
      'Difficulty breathing or bluish discoloration of the skin',
      'Signs of severe dehydration related to feeding difficulties',
      'Sudden change in level of consciousness or alertness',
      'Signs of increased intracranial pressure (severe headache, vomiting, altered consciousness)',
      'Severe pain, especially if associated with joint deformities',
      'Fever with behavior changes in children with shunts (potential shunt infection)'
    ],
    prevalence: 'Cerebral palsy is the most common motor disability in childhood, affecting approximately 1 in 500 children worldwide. In the United States, about 10,000 babies born each year will develop cerebral palsy. The prevalence is higher in areas with limited healthcare resources and in premature or very low birth weight infants.',
    affectedGroups: [
      'Premature infants (especially those born before 32 weeks gestation)',
      'Low birth weight babies (especially under 2.5 pounds)',
      'Multiple birth infants (twins, triplets)',
      'Infants who experienced birth complications or asphyxia',
      'Infants with brain bleeds or stroke',
      'Children born to mothers with certain infections during pregnancy',
      'Infants with severe jaundice or kernicterus',
      'Children with genetic conditions that affect brain development',
      'Boys (slightly higher prevalence than girls)'
    ],
    references: [
      {
        id: '1',
        text: 'Rosenbaum P, Paneth N, Leviton A, et al. (2007). "A report: the definition and classification of cerebral palsy April 2006". Developmental Medicine & Child Neurology. 49 (s109): 8-14.',
        url: 'https://doi.org/10.1111/j.1469-8749.2007.tb12610.x'
      },
      {
        id: '2',
        text: 'Graham HK, Rosenbaum P, Paneth N, et al. (2016). "Cerebral palsy". Nature Reviews Disease Primers. 2: 15082.',
        url: 'https://doi.org/10.1038/nrdp.2015.82'
      },
      {
        id: '3',
        text: 'Novak I, Morgan C, Adde L, et al. (2017). "Early, Accurate Diagnosis and Early Intervention in Cerebral Palsy: Advances in Diagnosis and Treatment". JAMA Pediatrics. 171 (9): 897-907.',
        url: 'https://doi.org/10.1001/jamapediatrics.2017.1689'
      },
      {
        id: '4',
        text: 'Stavsky M, Mor O, Mastrolia SA, et al. (2017). "Cerebral Palsy-Trends in Epidemiology and Recent Development in Prenatal Mechanisms of Disease, Treatment, and Prevention". Frontiers in Pediatrics. 5: 21.',
        url: 'https://doi.org/10.3389/fped.2017.00021'
      },
      {
        id: '5',
        text: 'McIntyre S, Morgan C, Walker K, Novak I. (2011). "Cerebral palsy--don\'t delay". Developmental Disabilities Research Reviews. 17 (2): 114-129.',
        url: 'https://doi.org/10.1002/ddrr.1106'
      }
    ]
  },
  {
    id: 'chickenpox',
    name: 'Chickenpox',
    description: 'A highly contagious viral infection caused by the varicella-zoster virus, characterized by an itchy, blister-like rash that first appears on the face, chest, and back before spreading to the rest of the body.[1] Chickenpox typically affects children, though it can occur at any age.[2] The virus remains dormant in nerve tissues after recovery and may reactivate later in life as shingles.[3] Vaccination has significantly reduced the incidence of chickenpox in many countries.[4]',
    category: 'infectious-diseases',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Chickenpox',
    symptoms: [
      'Itchy, fluid-filled blisters (vesicles) that eventually scab over',
      'Rash that appears in waves over several days',
      'Fever',
      'Fatigue',
      'Headache',
      'Loss of appetite',
      'Malaise (general feeling of unwellness)',
      'Blisters may appear inside the mouth, nose, ears, and genital areas',
      'Symptoms typically appear 10-21 days after exposure to the virus'
    ],
    causes: [
      'Infection with the varicella-zoster virus (VZV)',
      'Direct contact with the fluid from chickenpox blisters',
      'Airborne droplets from an infected person\'s sneeze or cough',
      'Contact with contaminated objects (less common)'
    ],
    treatments: [
      'Symptomatic relief: Calamine lotion for itching',
      'Cool baths with colloidal oatmeal',
      'Acetaminophen for fever (NOT aspirin, which increases risk of Reye\'s syndrome)',
      'Oral antihistamines to reduce itching',
      'Keeping fingernails short to prevent skin damage from scratching',
      'For high-risk patients: Antiviral medications like acyclovir',
      'Plenty of fluids to prevent dehydration',
      'Bed rest and isolation until no longer contagious'
    ],
    preventions: [
      'Varicella vaccine (recommended as two doses in childhood)',
      'Avoiding contact with infected individuals',
      'Varicella-zoster immune globulin (VZIG) for high-risk individuals after exposure',
      'Isolation of infected individuals until all blisters have crusted over',
      'Good hand hygiene and covering coughs and sneezes',
      'Vaccination of healthcare workers and those in close contact with high-risk individuals'
    ],
    transmissions: [
      'Highly contagious, spreading easily through airborne respiratory droplets',
      'Direct contact with fluid from blisters',
      'Infectious from 1-2 days before rash appears until all lesions have crusted over (usually 5-7 days)',
      'Possible transmission from people with shingles to non-immune individuals (resulting in chickenpox)'
    ],
    relatedConditions: [
      'shingles',
      'postherpetic-neuralgia',
      'varicella-pneumonia',
      'encephalitis',
      'reyes-syndrome',
      'bacterial-skin-infections',
      'congenital-varicella-syndrome'
    ],
    commonQuestions: [
      {
        question: 'Can you get chickenpox more than once?',
        answer: 'While it\'s possible, getting chickenpox more than once is rare. After infection, most people develop lifelong immunity. What appears to be a second case is usually either a similar-looking skin condition, a very mild case in someone partially immune, or in rare cases, reinfection in someone with a weakened immune system. However, the varicella-zoster virus remains dormant in nerve cells after recovery and can reactivate years later as shingles (herpes zoster), a different manifestation of the same virus. This is not a second case of chickenpox but rather a reactivation of the original virus. The chickenpox vaccine significantly reduces the risk of infection, and even when vaccinated individuals do get infected, symptoms are typically milder with fewer complications.'
      },
      {
        question: 'Is chickenpox dangerous during pregnancy?',
        answer: 'Yes, chickenpox during pregnancy can be dangerous for both mother and baby. For pregnant women, especially in the third trimester, chickenpox increases the risk of developing varicella pneumonia, which can be severe or even life-threatening. For the unborn baby, the risks depend on timing. Infection in the first 20 weeks, particularly between weeks 8-20, can cause Congenital Varicella Syndrome in about 1-2% of cases, resulting in skin scarring, limb abnormalities, eye problems, and neurological disorders. Infection around the time of delivery (5 days before to 2 days after) is particularly risky as it can cause severe neonatal varicella, with a mortality rate of up to 30% if untreated. Pregnant women without immunity who are exposed should contact their healthcare provider immediately about receiving varicella-zoster immune globulin.'
      },
      {
        question: 'What\'s the difference between chickenpox and shingles?',
        answer: 'Chickenpox and shingles are caused by the same virus (varicella-zoster virus) but represent different manifestations of infection. Chickenpox is the primary infection, typically occurring in childhood, producing an itchy, widespread rash with fever. After recovery, the virus remains dormant in nerve tissues. Shingles occurs when this dormant virus reactivates later in life, usually after age 50 or during periods of weakened immunity. Unlike chickenpox, shingles typically affects a limited area on one side of the body along a nerve pathway, causing a painful, blistering rash. Shingles isn\'t as contagious as chickenpox but can transmit the virus to non-immune individuals, who would then develop chickenpox, not shingles. While chickenpox usually resolves without complications in healthy children, shingles can cause persistent nerve pain (postherpetic neuralgia) that may last months or years.'
      }
    ],
    emergencySigns: [
      'High fever that doesn\'t respond to medication',
      'Difficulty breathing or persistent cough',
      'Severe headache with stiff neck',
      'Confusion or extreme drowsiness',
      'Frequent vomiting',
      'Difficulty walking or any sign of balance problems',
      'Severe abdominal pain',
      'Rash that becomes very red, warm, or tender (sign of secondary bacterial infection)',
      'Bleeding into the skin or unusual bruising'
    ],
    prevalence: 'Before widespread vaccination, chickenpox was extremely common with approximately 90% of people infected by adolescence. In temperate climates, it primarily affected children aged 1-9 years. Since the introduction of the varicella vaccine in 1995, the incidence has declined by about 90% in countries with routine vaccination programs. In unvaccinated populations, annual infection rates still approach 80-90 cases per 1,000 susceptible children.',
    affectedGroups: [
      'Children between 2-10 years of age (in unvaccinated populations)',
      'Individuals who haven\'t been vaccinated or previously infected',
      'Newborns of mothers who have not had chickenpox',
      'Pregnant women without prior immunity',
      'Immunocompromised individuals (including those with HIV/AIDS, cancer patients, transplant recipients)',
      'Adults (who typically experience more severe symptoms than children)',
      'People living in crowded conditions (schools, childcare facilities)'
    ],
    references: [
      {
        id: '1',
        text: 'Gershon AA, Breuer J, Cohen JI, et al. (2015). "Varicella zoster virus infection". Nature Reviews Disease Primers. 1: 15016.',
        url: 'https://doi.org/10.1038/nrdp.2015.16'
      },
      {
        id: '2',
        text: 'Centers for Disease Control and Prevention. (2021). "Chickenpox (Varicella): For Healthcare Professionals".',
        url: 'https://www.cdc.gov/chickenpox/hcp/index.html'
      },
      {
        id: '3',
        text: 'Heininger U, Seward JF. (2006). "Varicella". Lancet. 368 (9544): 1365-1376.',
        url: 'https://doi.org/10.1016/S0140-6736(06)69561-5'
      },
      {
        id: '4',
        text: 'Marin M, Marti M, Kambhampati A, et al. (2016). "Global Varicella Vaccine Effectiveness: A Meta-analysis". Pediatrics. 137 (3): e20153741.',
        url: 'https://doi.org/10.1542/peds.2015-3741'
      },
      {
        id: '5',
        text: 'World Health Organization. (2014). "Varicella and herpes zoster vaccines: WHO position paper, June 2014". Weekly Epidemiological Record. 89 (25): 265-287.',
        url: 'https://www.who.int/wer/2014/wer8925.pdf'
      }
    ]
  },
  {
    id: 'copd',
    name: 'Chronic Obstructive Pulmonary Disease (COPD)',
    description: 'A chronic inflammatory lung disease that causes obstructed airflow from the lungs, making it difficult to breathe.[1] COPD is characterized by long-term breathing problems and poor airflow, typically worsening over time.[2] The main causes are smoking and long-term exposure to air pollutants.[3] Two main forms are chronic bronchitis, which involves a long-term cough with mucus, and emphysema, which involves damage to the lungs over time.[4]',
    category: 'respiratory',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Chronic_obstructive_pulmonary_disease',
    symptoms: [
      'Shortness of breath, especially during physical activities',
      'Wheezing',
      'Chest tightness',
      'Chronic cough with or without mucus',
      'Frequent respiratory infections',
      'Fatigue',
      'Bluish discoloration of the lips or fingernail beds (cyanosis) in severe cases',
      'Swelling in ankles, feet, or legs',
      'Unintended weight loss (in later stages)',
      'Decreased exercise tolerance',
      'Morning headaches',
      'Barrel-shaped chest (in advanced stages)'
    ],
    causes: [
      'Tobacco smoking (primary cause in developed countries)',
      'Secondhand smoke exposure',
      'Long-term exposure to air pollution',
      'Occupational dust and chemical exposure (vapors, irritants, fumes)',
      'Indoor air pollution from burning fuel for cooking and heating in poorly ventilated homes',
      'Genetic factors (alpha-1 antitrypsin deficiency)',
      'History of childhood respiratory infections',
      'Aging (natural decline in lung function)',
      'Bronchial hyperresponsiveness or asthma'
    ],
    treatments: [
      'Smoking cessation (most important step)',
      'Bronchodilators (medications that relax airway muscles)',
      'Inhaled corticosteroids to reduce airway inflammation',
      'Combination inhalers with both bronchodilators and steroids',
      'Phosphodiesterase-4 inhibitors for severe COPD with chronic bronchitis',
      'Antibiotics for respiratory infections',
      'Oxygen therapy for low blood oxygen levels',
      'Pulmonary rehabilitation programs',
      'Lung volume reduction surgery in severe cases',
      'Lung transplantation as a last resort',
      'Vaccinations against influenza and pneumococcal pneumonia',
      'Treatment of comorbidities (heart disease, depression, osteoporosis)'
    ],
    preventions: [
      'Never smoking or quitting smoking',
      'Avoiding secondhand smoke exposure',
      'Minimizing exposure to air pollution',
      'Using protective equipment in occupations with dust or chemical exposure',
      'Improving ventilation in homes where biomass fuels are used',
      'Regular vaccinations against respiratory infections',
      'Early diagnosis and treatment of respiratory conditions',
      'Regular exercise to maintain lung function',
      'Good nutrition to support immune function'
    ],
    relatedConditions: [
      'emphysema',
      'chronic-bronchitis',
      'asthma',
      'bronchiectasis',
      'alpha-1-antitrypsin-deficiency',
      'pulmonary-hypertension',
      'heart-failure',
      'lung-cancer',
      'respiratory-infections',
      'osteoporosis',
      'depression',
      'anxiety-disorders'
    ],
    commonQuestions: [
      {
        question: 'Is COPD the same as asthma?',
        answer: 'No, although COPD and asthma share similar symptoms like wheezing, coughing, and breathing difficulties, they are different conditions. Asthma typically begins in childhood, is often triggered by allergies or exercise, and involves intermittent episodes with periods of normal lung function between flare-ups. The airway inflammation in asthma is usually reversible with proper treatment. COPD, in contrast, typically develops in adults over 40 with a history of smoking or long-term exposure to respiratory irritants. COPD causes progressive, permanent damage to the lungs with airway obstruction that is not fully reversible, even with treatment. While asthma can be well-controlled with proper management, COPD gradually worsens over time, though its progression can be slowed with appropriate treatment. Some people have features of both conditions, sometimes called asthma-COPD overlap syndrome (ACOS).'
      },
      {
        question: 'Can COPD be cured?',
        answer: 'Currently, there is no cure for COPD. Once the damage to the lungs has occurred, it cannot be reversed. However, COPD is treatable and its progression can be slowed with proper management. The most important intervention for smokers with COPD is smoking cessation, which can significantly slow the rate of lung function decline. Other treatments like bronchodilators, inhaled corticosteroids, pulmonary rehabilitation, and oxygen therapy can effectively manage symptoms, improve quality of life, reduce exacerbations, and potentially extend survival. Regular vaccinations against influenza and pneumococcal pneumonia are also important to prevent complications. Early diagnosis and treatment are crucial for the best outcomes. Research into stem cell therapy, gene therapy, and new anti-inflammatory medications offers hope for more effective treatments in the future, though a true cure remains elusive.'
      },
      {
        question: 'How is COPD diagnosed?',
        answer: 'COPD diagnosis involves several steps. Initially, healthcare providers evaluate symptoms (chronic cough, shortness of breath, etc.) and risk factors (smoking history, occupational exposures). The primary diagnostic test is spirometry, which measures how much air you can breathe out and how quickly. A key indicator for COPD is a reduced FEV1/FVC ratio (forced expiratory volume in one second divided by forced vital capacity), typically less than 70%. Additional tests may include chest X-rays or CT scans to visualize lung damage and rule out other conditions; blood tests to check oxygen and carbon dioxide levels; exercise tests to assess lung function during physical activity; and occasionally genetic testing for alpha-1 antitrypsin deficiency in younger patients or those with limited smoking history. The Global Initiative for Chronic Obstructive Lung Disease (GOLD) criteria are often used to classify COPD severity based on symptoms, spirometry results, and frequency of exacerbations.'
      }
    ],
    emergencySigns: [
      'Severe shortness of breath that worsens rapidly',
      'Inability to catch your breath or speak',
      'Bluish or grayish discoloration of lips or fingernails (cyanosis)',
      'Rapid heartbeat',
      'Confusion or disorientation',
      'Loss of consciousness',
      'Worsening symptoms despite using rescue medications',
      'Chest pain accompanied by shortness of breath',
      'Coughing up significantly increased amounts of blood'
    ],
    prevalence: 'COPD affects approximately 10% of the global population over 40 years of age. According to the World Health Organization, it is the third leading cause of death worldwide, causing 3.23 million deaths in 2019. In the United States, about 16 million people have been diagnosed with COPD, though many more may have the disease without knowing it. The prevalence continues to rise due to aging populations and continued exposure to risk factors.',
    affectedGroups: [
      'Adults over 40 years of age',
      'Current and former smokers (account for 80-90% of COPD cases in developed countries)',
      'People with long-term exposure to occupational dusts and chemicals',
      'Individuals exposed to indoor air pollution from biomass fuels (particularly in developing countries)',
      'People with alpha-1 antitrypsin deficiency (genetic form of COPD)',
      'Those with history of severe childhood respiratory infections',
      'Men (historically higher rates, though gender gap is narrowing)',
      'Individuals of lower socioeconomic status (higher smoking rates and occupational exposures)'
    ],
    references: [
      {
        id: '1',
        text: 'Global Initiative for Chronic Obstructive Lung Disease (GOLD). (2023). "Global Strategy for the Diagnosis, Management, and Prevention of Chronic Obstructive Pulmonary Disease."',
        url: 'https://goldcopd.org/2023-gold-report-2/'
      },
      {
        id: '2',
        text: 'Vogelmeier CF, Criner GJ, Martinez FJ, et al. (2017). "Global Strategy for the Diagnosis, Management, and Prevention of Chronic Obstructive Lung Disease 2017 Report. GOLD Executive Summary". American Journal of Respiratory and Critical Care Medicine. 195 (5): 557-582.',
        url: 'https://doi.org/10.1164/rccm.201701-0218PP'
      },
      {
        id: '3',
        text: 'Lozano R, Naghavi M, Foreman K, et al. (2012). "Global and regional mortality from 235 causes of death for 20 age groups in 1990 and 2010: a systematic analysis for the Global Burden of Disease Study 2010". Lancet. 380 (9859): 2095-2128.',
        url: 'https://doi.org/10.1016/S0140-6736(12)61728-0'
      },
      {
        id: '4',
        text: 'Quaderi SA, Hurst JR. (2018). "The unmet global burden of COPD". Global Health, Epidemiology and Genomics. 3: e4.',
        url: 'https://doi.org/10.1017/gheg.2018.1'
      },
      {
        id: '5',
        text: 'Soriano JB, Kendrick PJ, Paulson KR, et al. (2020). "Prevalence and attributable health burden of chronic respiratory diseases, 1990-2017: a systematic analysis for the Global Burden of Disease Study 2017". Lancet Respiratory Medicine. 8 (6): 585-596.',
        url: 'https://doi.org/10.1016/S2213-2600(20)30105-3'
      }
    ]
  },
  {
    id: 'conjunctivitis',
    name: 'Conjunctivitis (Pink Eye)',
    description: 'An inflammation or infection of the transparent membrane (conjunctiva) that lines the eyelid and covers the white part of the eyeball, causing the eyes to appear pink or reddish.[1] Conjunctivitis may be caused by a viral or bacterial infection, allergens, irritants, or an underlying medical condition.[2] While often uncomfortable, conjunctivitis is rarely sight-threatening and generally resolves within one to two weeks, depending on the cause.[3] However, certain types require specific treatment to prevent complications or spread to others.[4]',
    category: 'eye-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Conjunctivitis',
    symptoms: [
      'Redness in the white of the eye or inner eyelid',
      'Increased tear production',
      'Thick yellow discharge that crusts over eyelashes (bacterial conjunctivitis)',
      'Clear or white discharge (viral conjunctivitis)',
      'Itchy eyes (allergic conjunctivitis)',
      'Burning sensation in the eyes',
      'Gritty feeling in the eyes',
      'Sensitivity to light (photophobia)',
      'Swollen eyelids',
      'Blurred vision that clears with blinking',
      'Contact lens discomfort',
      'Symptoms may affect one or both eyes'
    ],
    causes: [
      'Viral infections (most common cause, highly contagious)',
      'Bacterial infections (including Staphylococcus aureus, Streptococcus pneumoniae, Haemophilus influenzae)',
      'Allergic reactions to pollen, dust mites, animal dander, or cosmetics',
      'Irritation from chemical splashes, smoke, air pollution, chlorine in swimming pools',
      'Foreign object in the eye',
      'Blocked tear duct (especially in newborns)',
      'Contact lens use, especially extended wear or improper cleaning',
      'Underlying medical conditions like dry eye syndrome, blepharitis, or autoimmune disorders'
    ],
    treatments: [
      'For viral conjunctivitis: Usually no specific treatment, resolves on its own in 7-14 days',
      'For bacterial conjunctivitis: Antibiotic eye drops or ointments',
      'For allergic conjunctivitis: Antihistamine eye drops, oral antihistamines, mast cell stabilizers',
      'For irritant conjunctivitis: Flushing the eye with clean water, artificial tears',
      'Cool compresses to soothe discomfort',
      'Artificial tears for lubrication',
      'Cleaning eyelids with mild soap and water to remove discharge',
      'Avoiding contact lens use until condition resolves',
      'Avoiding eye makeup until cleared',
      'In rare severe cases, steroid eye drops (only under doctor supervision)'
    ],
    preventions: [
      'Frequent hand washing, especially before touching the eyes',
      'Avoiding touching or rubbing the eyes',
      'Avoiding sharing personal items like towels, washcloths, eye makeup, or eye drops',
      'Proper cleaning and disinfection of contact lenses',
      'Replacing eye makeup regularly (every 3-6 months)',
      'Using protective eyewear in environments with irritants',
      'Frequent washing of pillowcases and bedding',
      'For allergic conjunctivitis: identifying and avoiding allergens',
      'Proper hygiene during upper respiratory infections',
      'Keeping swimming pool water properly chlorinated'
    ],
    transmissions: [
      'Direct contact with infected eye secretions',
      'Touching contaminated surfaces then touching eyes',
      'Sharing contaminated items (towels, makeup, eye drops)',
      'Respiratory droplets (for viral conjunctivitis associated with colds)',
      'Infectious for duration of active symptoms or until 24 hours after starting antibiotic treatment (bacterial)'
    ],
    relatedConditions: [
      'blepharitis',
      'dry-eye-syndrome',
      'keratitis',
      'allergic-rhinitis',
      'upper-respiratory-infections',
      'sinusitis',
      'corneal-ulcers',
      'uveitis',
      'chlamydia-trachomatis-infection',
      'adenovirus-infection'
    ],
    commonQuestions: [
      {
        question: 'How long is pink eye contagious?',
        answer: 'The contagious period for pink eye depends on its cause. Viral conjunctivitis, the most common form, is contagious from before symptoms appear until the symptoms have completely resolved, typically 7-14 days. Bacterial conjunctivitis is contagious until 24-48 hours after starting antibiotic treatment. Without antibiotic treatment, bacterial pink eye can remain contagious as long as there is discharge. Allergic and irritant conjunctivitis are not contagious at all. To prevent spreading contagious forms, wash hands frequently, avoid touching your eyes, don\'t share personal items like towels or makeup, and stay home from work or school during the contagious period if possible. Children with contagious pink eye should not attend daycare or school until the contagious period has passed.'
      },
      {
        question: 'How can I tell if I have viral or bacterial conjunctivitis?',
        answer: 'While a definitive diagnosis requires medical evaluation, there are some distinguishing features between viral and bacterial conjunctivitis. Viral conjunctivitis typically causes watery, clear discharge; affects both eyes (often starting in one eye and spreading to the other); and frequently accompanies cold or flu-like symptoms. Bacterial conjunctivitis usually produces thick, yellow-green discharge that may cause the eyelids to stick together, especially upon waking; may affect just one eye; and doesn\'t typically accompany respiratory symptoms. Viral pink eye tends to cause more redness but less discharge, while bacterial tends to cause more discharge with variable redness. Viral conjunctivitis typically resolves on its own in 1-2 weeks, whereas bacterial conjunctivitis often improves rapidly with antibiotic treatment. If you\'re unsure, or if symptoms are severe or worsening, it\'s best to consult a healthcare provider for proper diagnosis and treatment.'
      },
      {
        question: 'When should I see a doctor for pink eye?',
        answer: 'You should see a doctor for pink eye if you experience: moderate to severe pain in the eye; intense redness; vision changes or blurred vision that doesn\'t clear with blinking; extreme sensitivity to light; symptoms that worsen or don\'t improve within a week; a weakened immune system due to HIV, cancer treatment, or other medical conditions; a pre-existing eye condition; recurrent episodes of conjunctivitis; or if you wear contact lenses and develop symptoms. Additionally, newborns with symptoms of conjunctivitis need immediate medical attention, as do people with severe symptoms or those with exposure to chemical irritants. While many cases of pink eye resolve without treatment, bacterial conjunctivitis typically requires antibiotics, and some forms of viral conjunctivitis can cause complications if left untreated. When in doubt, it\'s better to seek medical advice for proper diagnosis and treatment.'
      }
    ],
    emergencySigns: [
      'Severe eye pain',
      'Significant change in vision or vision loss',
      'Extreme light sensitivity (photophobia)',
      'Symptoms in a newborn baby',
      'Injury to the eye before symptoms developed',
      'Signs of severe allergic reaction (facial swelling, difficulty breathing)',
      'Symptoms persisting beyond 10-14 days despite treatment',
      'Symptoms following exposure to chemicals or foreign body in eye',
      'Severe redness in the eye'
    ],
    prevalence: 'Conjunctivitis is one of the most common eye conditions worldwide. In the United States alone, about 6 million people experience acute conjunctivitis annually. Viral conjunctivitis accounts for approximately 80% of all acute cases. Allergic conjunctivitis affects 15-40% of the population, varying seasonally and geographically. Bacterial conjunctivitis is more common in children than adults.',
    affectedGroups: [
      'Children in school or daycare settings (higher rates of infectious conjunctivitis)',
      'Contact lens wearers (higher risk of bacterial conjunctivitis)',
      'People with allergies (allergic conjunctivitis)',
      'Those exposed to environmental irritants',
      'People with compromised immune systems',
      'Newborns (can develop conjunctivitis during birth if mother has certain infections)',
      'Healthcare workers (occupational exposure)',
      'People living in crowded conditions',
      'Individuals with blepharitis or dry eye syndrome'
    ],
    references: [
      {
        id: '1',
        text: 'Azari AA, Barney NP. (2013). "Conjunctivitis: A Systematic Review of Diagnosis and Treatment". JAMA. 310 (16): 1721-1729.',
        url: 'https://doi.org/10.1001/jama.2013.280318'
      },
      {
        id: '2',
        text: 'Shekhawat NS, Shtein RM, Blachley TS, Stein JD. (2017). "Antibiotic Prescription Fills for Acute Conjunctivitis among Enrollees in a Large United States Managed Care Network". Ophthalmology. 124 (8): 1099-1107.',
        url: 'https://doi.org/10.1016/j.ophtha.2017.04.034'
      },
      {
        id: '3',
        text: 'Kaufman HE. (2011). "Adenovirus advances: new diagnostic and therapeutic options". Current Opinion in Ophthalmology. 22 (4): 290-293.',
        url: 'https://doi.org/10.1097/ICU.0b013e3283477cb5'
      },
      {
        id: '4',
        text: 'O\'Brien TP, Jeng BH, McDonald M, Raizman MB. (2009). "Acute conjunctivitis: truth and misconceptions". Current Medical Research and Opinion. 25 (8): 1953-1961.',
        url: 'https://doi.org/10.1185/03007990903038269'
      },
      {
        id: '5',
        text: 'American Academy of Ophthalmology. (2018). "Pink Eye: What Is Conjunctivitis?"',
        url: 'https://www.aao.org/eye-health/diseases/pink-eye-conjunctivitis'
      }
    ]
  },
  {
    id: 'crohns-disease',
    name: 'Crohn\'s Disease',
    description: 'A type of inflammatory bowel disease (IBD) that causes inflammation of the digestive tract, which can lead to abdominal pain, severe diarrhea, fatigue, weight loss, and malnutrition.[1] The inflammation caused by Crohn\'s disease can involve different areas of the digestive tract in different people, most commonly affecting the small intestine and the beginning of the large intestine.[2] The inflammation often spreads deep into the layers of affected bowel tissue.[3] Crohn\'s disease can be both painful and debilitating, and sometimes may lead to life-threatening complications.[4]',
    category: 'digestive-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Crohn%27s_disease',
    symptoms: [
      'Persistent diarrhea',
      'Abdominal pain and cramping',
      'Blood in stool',
      'Fatigue',
      'Fever',
      'Reduced appetite',
      'Unintended weight loss',
      'Feeling of incomplete bowel evacuation',
      'Urgent need to move bowels',
      'Perianal disease (including abscesses, fistulas, and anal fissures)',
      'Mouth sores',
      'Joint pain or soreness',
      'Eye inflammation',
      'Skin disorders',
      'Delayed growth or sexual development in children'
    ],
    causes: [
      'Genetic factors (family history increases risk)',
      'Immune system dysfunction',
      'Environmental triggers',
      'Smoking (increases risk and severity)',
      'Certain medications (NSAIDs may trigger or worsen disease)',
      'Diet high in fat, refined foods, and processed foods',
      'High stress levels may worsen symptoms',
      'Previous intestinal infection may trigger initial onset',
      'Western lifestyle and industrialized environment'
    ],
    treatments: [
      'Anti-inflammatory medications (corticosteroids, aminosalicylates)',
      'Immune system suppressors (azathioprine, mercaptopurine, methotrexate)',
      'Biologic therapies (infliximab, adalimumab, certolizumab, ustekinumab)',
      'Antibiotics for infections or fistulas',
      'Nutritional supplements',
      'Special diets (elemental, low-residue, or low-FODMAP)',
      'Bowel rest with liquid diet or parenteral nutrition',
      'Surgery to remove damaged portions of digestive tract',
      'Strictureplasty to widen narrowed bowel sections',
      'Fistula removal or repair',
      'Abscess drainage',
      'Pain management',
      'Stress reduction techniques',
      'Regular medical monitoring'
    ],
    preventions: [
      'No known prevention for developing Crohn\'s disease',
      'For those diagnosed: avoiding smoking',
      'Managing stress',
      'Eating a balanced diet as recommended by healthcare providers',
      'Regular exercise',
      'Avoiding NSAIDs when possible',
      'Maintaining medication regimen to prevent flares',
      'Regular medical follow-up',
      'Vaccinations to prevent infections that could trigger flares'
    ],
    relatedConditions: [
      'ulcerative-colitis',
      'inflammatory-bowel-disease',
      'irritable-bowel-syndrome',
      'colorectal-cancer',
      'arthritis',
      'skin-disorders',
      'eye-inflammation',
      'liver-disease',
      'bile-duct-disease',
      'kidney-stones',
      'anemia',
      'osteoporosis',
      'malnutrition'
    ],
    commonQuestions: [
      {
        question: 'Is Crohn\'s disease the same as ulcerative colitis?',
        answer: 'While both Crohn\'s disease and ulcerative colitis are types of inflammatory bowel disease (IBD) that cause inflammation in the digestive tract, they differ in several important ways. Crohn\'s disease can affect any part of the digestive tract from mouth to anus, often with patches of healthy tissue between inflamed areas, and the inflammation extends through all layers of the bowel wall. In contrast, ulcerative colitis affects only the large intestine (colon) and rectum, involves continuous inflammation without patches of healthy tissue, and affects only the innermost lining of the colon. Crohn\'s disease may cause complications like strictures, fistulas, and abscesses, which are less common in ulcerative colitis. The symptoms can overlap, but ulcerative colitis more consistently causes bloody diarrhea, while Crohn\'s may cause more varied symptoms depending on the location of inflammation. Treatment approaches are similar for both conditions but may differ based on location and severity of disease.'
      },
      {
        question: 'Can diet control Crohn\'s disease?',
        answer: 'Diet alone cannot cure or control Crohn\'s disease, but it plays an important supportive role in management. There is no single diet that works for everyone with Crohn\'s disease, as food triggers vary widely between individuals. During flares, low-fiber, low-residue diets may help reduce symptoms. Some patients benefit from specific approaches like the Specific Carbohydrate Diet, Mediterranean diet, or low-FODMAP diet. Keeping a food diary can help identify personal triggers, which commonly include spicy foods, high-fiber foods, dairy, fatty foods, alcohol, and caffeine. In severe cases, elemental diets or parenteral nutrition may be used to rest the bowel. Nutritional support is crucial, as many patients develop deficiencies in vitamins, minerals, and calories. While dietary modifications are important complementary strategies, they should be used alongside, not instead of, medical treatments prescribed by healthcare providers. Working with a registered dietitian who specializes in IBD can help develop an individualized nutrition plan.'
      },
      {
        question: 'Is Crohn\'s disease curable?',
        answer: 'Currently, Crohn\'s disease is not considered curable. It is a chronic, lifelong condition characterized by periods of remission (when symptoms are absent or minimal) and flares (when symptoms worsen). However, advances in treatment have significantly improved the outlook for people with Crohn\'s disease. Many patients achieve long-term remission with appropriate medical therapy, including anti-inflammatory drugs, immunosuppressants, biologic therapies, and sometimes surgery. While surgery can remove damaged portions of the digestive tract, it does not cure the disease, and inflammation often recurs in other areas. The goal of treatment is to achieve and maintain remission, heal the intestinal mucosa, prevent complications, and improve quality of life. Research into new therapies continues, including stem cell treatments, microbiome-based approaches, and targeted molecular therapies, offering hope for better management and potentially curative treatments in the future. With proper medical care, most people with Crohn\'s disease lead full, productive lives.'
      }
    ],
    emergencySigns: [
      'Severe, persistent abdominal pain',
      'Significant rectal bleeding or bloody stools',
      'Persistent vomiting',
      'High fever (over 101°F or 38.3°C)',
      'Inability to keep food or liquids down',
      'Evidence of intestinal obstruction (severe bloating, inability to pass gas or stool)',
      'New or worsening fistula drainage',
      'Abscess (painful, swollen, fluid-filled area)',
      'Severe dehydration (extreme thirst, dry mouth, little or no urination, severe weakness)',
      'Sudden, severe joint pain with swelling'
    ],
    prevalence: 'Crohn\'s disease affects approximately 3 to 7 per 100,000 people in North America. The prevalence is higher in developed countries, particularly in urban areas and northern climates. In the United States, an estimated 780,000 people have Crohn\'s disease. The condition can occur at any age but is most commonly diagnosed in people between 15 and 35 years old, with a smaller peak in diagnoses between ages 60 and 80.',
    affectedGroups: [
      'Young adults (15-35 years old)',
      'Older adults (60-80 years old)',
      'People of European, especially Ashkenazi Jewish, descent',
      'People with family history of IBD',
      'Smokers (2 times higher risk)',
      'Urban residents',
      'Residents of northern climates and developed countries',
      'People taking non-steroidal anti-inflammatory drugs (NSAIDs)',
      'People with certain genetic mutations (e.g., NOD2/CARD15 gene)'
    ],
    references: [
      {
        id: '1',
        text: 'Torres J, Mehandru S, Colombel JF, Peyrin-Biroulet L. (2017). "Crohn\'s disease". Lancet. 389 (10080): 1741-1755.',
        url: 'https://doi.org/10.1016/S0140-6736(16)31711-1'
      },
      {
        id: '2',
        text: 'Gajendran M, Loganathan P, Catinella AP, Hashash JG. (2018). "A comprehensive review of Crohn\'s disease: diagnosis, treatment, and management". Diseases. 6 (4): 99.',
        url: 'https://doi.org/10.3390/diseases6040099'
      },
      {
        id: '3',
        text: 'Baumgart DC, Sandborn WJ. (2012). "Crohn\'s disease". Lancet. 380 (9853): 1590-1605.',
        url: 'https://doi.org/10.1016/S0140-6736(12)60026-9'
      },
      {
        id: '4',
        text: 'Feuerstein JD, Cheifetz AS. (2017). "Crohn Disease: Epidemiology, Diagnosis, and Management". Mayo Clinic Proceedings. 92 (7): 1088-1103.',
        url: 'https://doi.org/10.1016/j.mayocp.2017.04.010'
      },
      {
        id: '5',
        text: 'Ng SC, Shi HY, Hamidi N, et al. (2018). "Worldwide incidence and prevalence of inflammatory bowel disease in the 21st century: a systematic review of population-based studies". Lancet. 390 (10114): 2769-2778.',
        url: 'https://doi.org/10.1016/S0140-6736(17)32448-0'
      }
    ]
  },
  {
    id: 'cushings-syndrome',
    name: 'Cushing\'s Syndrome',
    description: 'A disorder that occurs when your body has too much of the hormone cortisol over a long period of time.[1] Cortisol, produced by the adrenal glands, plays a vital role in regulating blood pressure, reducing inflammation, and helping the body respond to stress.[2] However, excess cortisol can lead to a constellation of symptoms that significantly impact health and quality of life.[3] Cushing\'s syndrome may be caused by taking glucocorticoid medications, or by tumors that produce cortisol or adrenocorticotropic hormone (ACTH).[4]',
    category: 'endocrine-system',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Cushing%27s_syndrome',
    symptoms: [
      'Weight gain, particularly in the face (moon face), abdomen, and upper back (buffalo hump)',
      'Fatty tissue deposits in the face, neck, and shoulders',
      'Pink or purple stretch marks (striae) on the skin of the abdomen, thighs, breasts, and arms',
      'Thinning, fragile skin that bruises easily',
      'Slow healing of cuts, insect bites, and infections',
      'Acne',
      'Muscle weakness, particularly in the legs and arms',
      'Severe fatigue',
      'High blood pressure',
      'High blood sugar (hyperglycemia)',
      'Irritability, anxiety, or depression',
      'Decreased fertility and libido',
      'In women: Increased growth of facial and body hair, irregular or absent menstrual periods',
      'In men: Decreased fertility, erectile dysfunction, decreased libido',
      'Osteoporosis leading to bone fractures'
    ],
    causes: [
      'Long-term use of glucocorticoid medications (iatrogenic Cushing\'s)',
      'Pituitary tumors that secrete excessive ACTH (Cushing\'s disease)',
      'Tumors in the adrenal gland producing excess cortisol',
      'Tumors elsewhere in the body (ectopic) producing ACTH',
      'Familial Cushing\'s syndrome (rare inherited conditions)',
      'Alcoholism (pseudo-Cushing\'s syndrome)',
      'Severe depression or anxiety (pseudo-Cushing\'s syndrome)',
      'Malnutrition (pseudo-Cushing\'s syndrome)',
      'Eating disorders (pseudo-Cushing\'s syndrome)'
    ],
    treatments: [
      'Reducing or discontinuing glucocorticoid medications (if iatrogenic)',
      'Surgery to remove tumors in the pituitary or adrenal glands',
      'Radiation therapy for pituitary tumors',
      'Medications to control cortisol production (ketoconazole, mitotane, metyrapone)',
      'Medications to block effects of cortisol (mifepristone)',
      'Bilateral adrenalectomy (removal of both adrenal glands) in severe cases',
      'Pituitary-directed drugs (pasireotide) for Cushing\'s disease',
      'Management of complications (blood pressure medications, diabetes treatment, etc.)',
      'Hormone replacement therapy after adrenalectomy',
      'Psychological support and counseling'
    ],
    preventions: [
      'Using the lowest effective dose of glucocorticoid medications for the shortest time possible',
      'Regular monitoring when on long-term steroid therapy',
      'Following medication instructions carefully',
      'Never stopping prescribed steroids abruptly',
      'Regular medical check-ups to detect early signs',
      'Seeking prompt medical attention for symptoms of excess cortisol',
      'Genetic counseling for families with inherited forms of the condition'
    ],
    relatedConditions: [
      'addisons-disease',
      'diabetes-mellitus',
      'hypertension',
      'osteoporosis',
      'hyperlipidemia',
      'obesity',
      'depression',
      'anxiety-disorders',
      'pituitary-tumors',
      'adrenal-tumors',
      'metabolic-syndrome',
      'adrenal-insufficiency'
    ],
    commonQuestions: [
      {
        question: 'What is the difference between Cushing\'s syndrome and Cushing\'s disease?',
        answer: 'Cushing\'s syndrome and Cushing\'s disease are related but distinct conditions. Cushing\'s syndrome is the broader term that refers to the cluster of symptoms and physical changes caused by chronic exposure to elevated cortisol levels from any source. Cushing\'s disease, on the other hand, specifically refers to a form of Cushing\'s syndrome caused by a pituitary tumor (usually an adenoma) that produces excessive amounts of adrenocorticotropic hormone (ACTH), which in turn stimulates the adrenal glands to produce too much cortisol. In simpler terms, Cushing\'s disease is one specific cause of Cushing\'s syndrome, accounting for about 70-80% of endogenous (non-medication-induced) Cushing\'s syndrome cases. Other causes of Cushing\'s syndrome include adrenal tumors, ectopic ACTH-producing tumors, and most commonly, long-term use of glucocorticoid medications.'
      },
      {
        question: 'Can Cushing\'s syndrome be cured?',
        answer: 'Yes, Cushing\'s syndrome can often be cured, though the approach depends on the underlying cause. For iatrogenic Cushing\'s syndrome (caused by glucocorticoid medications), tapering and eventually discontinuing the medication, if possible, typically resolves symptoms over time. For Cushing\'s disease (caused by a pituitary tumor), transsphenoidal surgery to remove the tumor is the first-line treatment, with a success rate of 65-90% when performed by an experienced neurosurgeon. For adrenal tumors, surgical removal of the affected adrenal gland is usually curative. For ectopic ACTH syndrome, treatment focuses on finding and removing the source tumor. In cases where surgery is not possible or not successful, radiation therapy or medications to control cortisol production may be used. Recovery can take months to years as the body adjusts, and some physical changes may be permanent. Long-term follow-up is essential, as recurrence is possible, particularly with Cushing\'s disease. With appropriate treatment, many people with Cushing\'s syndrome can return to normal or near-normal health.'
      },
      {
        question: 'How is Cushing\'s syndrome diagnosed?',
        answer: 'Diagnosing Cushing\'s syndrome is a complex process that typically involves three stages. First, doctors must confirm excess cortisol production through laboratory tests, which may include 24-hour urinary free cortisol, late-night salivary cortisol, or the dexamethasone suppression test. Second, once Cushing\'s syndrome is confirmed, the source of excess cortisol must be determined through tests measuring ACTH levels and additional specialized tests like the CRH stimulation test or high-dose dexamethasone suppression test. Third, imaging studies help locate specific tumors, including MRI for pituitary tumors, CT scans for adrenal tumors, or various scans (CT, MRI, PET) for ectopic sources. In some cases, sampling blood from specific veins (petrosal sinus sampling) may be necessary to precisely locate pituitary tumors. Since many Cushing\'s syndrome symptoms overlap with common conditions like metabolic syndrome, and test results can be complicated by factors like stress, medications, and other health issues, diagnosis often requires evaluation by endocrinologists specializing in pituitary or adrenal disorders.'
      }
    ],
    emergencySigns: [
      'Severe, sudden headache (may indicate pituitary apoplexy in Cushing\'s disease)',
      'Severe psychiatric symptoms including psychosis or suicidal thoughts',
      'Adrenal crisis after surgery or abrupt withdrawal of steroids (weakness, dizziness, abdominal pain, vomiting)',
      'Thromboembolism (blood clots, particularly in legs or lungs)',
      'Severe infections due to immunosuppression',
      'Acute fractures (particularly spine or hip) due to severe osteoporosis',
      'Very high blood pressure with risk of stroke or heart attack',
      'Diabetic ketoacidosis from severe hyperglycemia'
    ],
    prevalence: 'Cushing\'s syndrome is relatively rare, affecting approximately 10-15 people per million population each year. Iatrogenic Cushing\'s syndrome (caused by glucocorticoid medications) is the most common form. Among endogenous cases, Cushing\'s disease (pituitary-dependent) accounts for 70-80%, adrenal tumors for 15-20%, and ectopic ACTH syndrome for 5-10%. The condition affects women about three to five times more often than men, particularly between ages 30-50, though it can occur at any age.',
    affectedGroups: [
      'Adults between 30-50 years of age',
      'Women (3-5 times more commonly than men)',
      'People taking long-term glucocorticoid medications',
      'Individuals with certain tumor types (pituitary adenomas, adrenal tumors, neuroendocrine tumors)',
      'People with specific genetic conditions (Multiple Endocrine Neoplasia type 1, Carney complex)',
      'Children (rare, but can occur)',
      'Patients with chronic alcoholism (pseudo-Cushing\'s)',
      'Individuals with poorly controlled diabetes'
    ],
    references: [
      {
        id: '1',
        text: 'Lacroix A, Feelders RA, Stratakis CA, Nieman LK. (2015). "Cushing\'s syndrome". Lancet. 386 (9996): 913-927.',
        url: 'https://doi.org/10.1016/S0140-6736(14)61375-1'
      },
      {
        id: '2',
        text: 'Nieman LK, Biller BM, Findling JW, et al. (2015). "Treatment of Cushing\'s Syndrome: An Endocrine Society Clinical Practice Guideline". Journal of Clinical Endocrinology & Metabolism. 100 (8): 2807-2831.',
        url: 'https://doi.org/10.1210/jc.2015-1818'
      },
      {
        id: '3',
        text: 'Sharma ST, Nieman LK, Feelders RA. (2015). "Cushing\'s syndrome: epidemiology and developments in disease management". Clinical Epidemiology. 7: 281-293.',
        url: 'https://doi.org/10.2147/CLEP.S44336'
      },
      {
        id: '4',
        text: 'Pivonello R, De Leo M, Cozzolino A, Colao A. (2015). "The Treatment of Cushing\'s Disease". Endocrine Reviews. 36 (4): 385-486.',
        url: 'https://doi.org/10.1210/er.2013-1048'
      },
      {
        id: '5',
        text: 'Guarnotta V, Emanuele F, Giordano C. (2022). "Cushing\'s Syndrome: From Diagnosis to Treatment". Biomedicines. 10 (7): 1720.',
        url: 'https://doi.org/10.3390/biomedicines10071720'
      }
    ]
  },
  {
    id: 'cystic-fibrosis',
    name: 'Cystic Fibrosis',
    description: 'An inherited disorder that causes severe damage to the lungs, digestive system, and other organs.[1] Cystic fibrosis affects the cells that produce mucus, sweat, and digestive juices, causing these fluids to become thick and sticky rather than thin and slippery.[2] Instead of acting as lubricants, these secretions plug up tubes, ducts, and passageways, especially in the lungs and pancreas.[3] This life-shortening disorder requires daily care, but advances in treatment have significantly improved both life expectancy and quality of life for those with the condition.[4]',
    category: 'respiratory',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Cystic_fibrosis',
    symptoms: [
      'Persistent cough with thick mucus',
      'Frequent lung infections (pneumonia or bronchitis)',
      'Wheezing or shortness of breath',
      'Poor growth or weight gain despite good appetite (failure to thrive)',
      'Difficulty with bowel movements or greasy, bulky stools',
      'Nasal polyps',
      'Salty-tasting skin',
      'Male infertility',
      'Clubbing (rounding and enlargement) of fingers and toes',
      'Recurrent sinus infections',
      'Pancreatitis (inflammation of the pancreas)',
      'Rectal prolapse in children',
      'Chronic fatigue',
      'Delayed puberty'
    ],
    causes: [
      'Mutations in the cystic fibrosis transmembrane conductance regulator (CFTR) gene',
      'Inheritance of two defective CFTR genes, one from each parent (autosomal recessive pattern)',
      'Over 1,700 different mutations can cause cystic fibrosis, with F508del being the most common',
      'The CFTR mutation affects chloride channels in cell membranes, causing thick, sticky secretions'
    ],
    treatments: [
      'Airway clearance techniques (chest physical therapy, oscillating devices)',
      'Inhaled medications to thin mucus (hypertonic saline)',
      'Mucus-thinning drugs (dornase alfa)',
      'Bronchodilators to keep airways open',
      'Antibiotics to treat and prevent lung infections',
      'Anti-inflammatory medications',
      'CFTR modulators (ivacaftor, lumacaftor, tezacaftor, elexacaftor) that target specific genetic defects',
      'Pancreatic enzyme supplements with meals and snacks',
      'Vitamin supplements (especially fat-soluble vitamins A, D, E, and K)',
      'High-calorie, high-protein diet',
      'Feeding tubes for supplemental nutrition when needed',
      'Oxygen therapy for low blood oxygen levels',
      'Lung transplantation for severe lung disease',
      'Liver transplantation in cases of severe liver disease',
      'Mental health support and counseling'
    ],
    preventions: [
      'Genetic counseling for families with history of cystic fibrosis',
      'Carrier screening for couples planning pregnancy',
      'Prenatal screening during pregnancy',
      'Newborn screening to enable early diagnosis and treatment',
      'For those diagnosed: vaccinations to prevent respiratory infections',
      'Avoiding smoke exposure and other respiratory irritants',
      'Maintaining good nutrition',
      'Regular exercise to help clear lungs',
      'Good hydration to keep mucus thinner',
      'Strict infection control practices'
    ],
    relatedConditions: [
      'bronchiectasis',
      'chronic-sinusitis',
      'nasal-polyps',
      'pancreatitis',
      'diabetes',
      'liver-disease',
      'osteoporosis',
      'male-infertility',
      'intestinal-obstruction',
      'gastroesophageal-reflux-disease',
      'allergic-bronchopulmonary-aspergillosis',
      'depression',
      'anxiety-disorders'
    ],
    commonQuestions: [
      {
        question: 'What is the life expectancy for someone with cystic fibrosis?',
        answer: 'Life expectancy for people with cystic fibrosis has improved dramatically in recent decades due to advances in treatment. Currently, the median predicted survival age is around 44-47 years in developed countries, a significant increase from the 1980s when many patients did not survive childhood. However, life expectancy varies widely based on several factors, including the specific genetic mutations, severity of symptoms, age at diagnosis, access to specialized care, adherence to treatment regimens, and development of complications. The introduction of CFTR modulator therapies that address the underlying cause of the disease (rather than just symptoms) has been particularly transformative for many patients. People born with cystic fibrosis today who have access to modern treatments and receive early diagnosis through newborn screening may have a significantly longer life expectancy than previous generations. It\'s important to note that survival statistics represent population averages and individual outcomes can vary considerably.'
      },
      {
        question: 'How is cystic fibrosis diagnosed?',
        answer: 'Cystic fibrosis diagnosis typically begins with newborn screening, which is now mandatory in all 50 U.S. states and many countries worldwide. This initial screening measures immunoreactive trypsinogen (IRT) levels in blood; elevated levels may indicate CF. Positive newborn screens are followed by confirmatory testing, which may include: sweat chloride testing (the gold standard), where elevated chloride levels in sweat confirm the diagnosis; genetic testing to identify CFTR gene mutations; and in some cases, nasal potential difference measurements to assess ion channel function. For individuals not diagnosed at birth, diagnosis may occur later based on symptoms like recurrent respiratory infections, poor growth, or digestive issues. Diagnostic criteria typically require either two CF-causing mutations, two abnormal sweat chloride tests, or one of these plus characteristic symptoms. Prenatal diagnosis is also possible through chorionic villus sampling or amniocentesis when parents are known carriers. Early diagnosis is crucial for implementing treatments that can slow disease progression and improve quality of life.'
      },
      {
        question: 'Can people with cystic fibrosis have children?',
        answer: 'Yes, many people with cystic fibrosis can have children, though there are important considerations. For women with CF, pregnancy is generally possible but requires careful planning and medical supervision. Pregnancy can pose additional health challenges, as it may strain already compromised lung function and nutritional status. The severity of the woman\'s CF, her lung function, nutritional status, and overall health are key factors in determining pregnancy risks. For men with CF, about 98% are infertile due to congenital bilateral absence of the vas deferens (CBAVD), which prevents sperm from exiting the body. However, sperm production is typically normal, so assisted reproductive technologies like testicular sperm extraction followed by in vitro fertilization can enable biological fatherhood. All children of a person with CF will be carriers of the CF gene. When both parents have CF or are carriers, genetic counseling is important to understand the risk of having a child with CF. Modern family planning options include preimplantation genetic diagnosis to select embryos without CF-causing mutations.'
      }
    ],
    emergencySigns: [
      'Severe difficulty breathing or shortness of breath',
      'Coughing up significant amounts of blood',
      'Severe chest pain',
      'High fever with increased respiratory symptoms',
      'Blue discoloration of the lips or skin (cyanosis)',
      'Confusion or disorientation',
      'Severe abdominal pain',
      'Inability to keep food down for days',
      'Signs of intestinal blockage (severe constipation, abdominal swelling)',
      'Signs of diabetic ketoacidosis in those with CF-related diabetes'
    ],
    prevalence: 'Cystic fibrosis affects approximately 1 in 2,500 to 3,500 newborns in populations of Northern European descent. In the United States, about 30,000 people live with cystic fibrosis, with roughly 1,000 new cases diagnosed each year. The condition is less common in other ethnic groups, affecting about 1 in 17,000 African Americans and 1 in 31,000 Asian Americans. Worldwide, an estimated 70,000 to 100,000 people have cystic fibrosis.',
    affectedGroups: [
      'People of Northern European descent (highest prevalence)',
      'Ashkenazi Jewish populations (higher carrier rates)',
      'All ethnic groups can be affected, though prevalence varies',
      'Both males and females are equally affected by the disease',
      'Most cases are diagnosed by age 2, though milder forms may be diagnosed in adolescence or adulthood',
      'Approximately 1 in 25-30 people of European descent are carriers of a CF mutation'
    ],
    references: [
      {
        id: '1',
        text: 'Elborn JS. (2016). "Cystic fibrosis". Lancet. 388 (10059): 2519-2531.',
        url: 'https://doi.org/10.1016/S0140-6736(16)00576-6'
      },
      {
        id: '2',
        text: 'Farrell PM, White TB, Ren CL, et al. (2017). "Diagnosis of Cystic Fibrosis: Consensus Guidelines from the Cystic Fibrosis Foundation". Journal of Pediatrics. 181S: S4-S15.e1.',
        url: 'https://doi.org/10.1016/j.jpeds.2016.09.064'
      },
      {
        id: '3',
        text: 'Ratjen F, Bell SC, Rowe SM, et al. (2015). "Cystic fibrosis". Nature Reviews Disease Primers. 1: 15010.',
        url: 'https://doi.org/10.1038/nrdp.2015.10'
      },
      {
        id: '4',
        text: 'Shteinberg M, Haq IJ, Polineni D, Davies JC. (2021). "Cystic fibrosis". Lancet. 397 (10290): 2195-2211.',
        url: 'https://doi.org/10.1016/S0140-6736(20)32542-3'
      },
      {
        id: '5',
        text: 'Cystic Fibrosis Foundation. (2022). "About Cystic Fibrosis".',
        url: 'https://www.cff.org/intro-cf/about-cystic-fibrosis'
      }
    ]
  },
  {
    id: 'cancer',
    name: 'Cancer',
    description: 'A group of diseases characterized by the uncontrolled growth and spread of abnormal cells that can invade and destroy surrounding tissues and organs.[1] Cancer can start almost anywhere in the human body, and there are more than 100 different types.[2] When abnormal cells grow out of control, they can form tumors, which may be malignant (cancerous) or benign (non-cancerous).[3] Cancer is a leading cause of death worldwide, but treatments and outcomes have improved significantly for many types of cancer.[4]',
    category: 'cancer',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Cancer',
    symptoms: [
      'Unexplained weight loss',
      'Fatigue that doesn\'t improve with rest',
      'Persistent pain',
      'Skin changes (new moles, changes in existing moles, or unusual skin changes)',
      'Persistent cough or trouble breathing',
      'Difficulty swallowing',
      'Hoarseness or voice changes',
      'Persistent indigestion or discomfort after eating',
      'Persistent, unexplained fevers or night sweats',
      'Unexplained bleeding or bruising',
      'Changes in bowel or bladder habits',
      'Sores that do not heal',
      'Unusual lumps or swelling'
    ],
    causes: [
      'Genetic mutations (inherited or acquired during lifetime)',
      'Tobacco use (smoking and smokeless tobacco)',
      'Excessive alcohol consumption',
      'Ultraviolet (UV) radiation from the sun or tanning beds',
      'Ionizing radiation from medical tests or environmental exposure',
      'Certain viruses and bacteria (HPV, hepatitis, H. pylori)',
      'Chronic inflammation',
      'Hormonal factors',
      'Immunosuppression',
      'Obesity and poor diet',
      'Lack of physical activity',
      'Environmental toxins and workplace exposures',
      'Age (cancer risk generally increases with age)'
    ],
    treatments: [
      'Surgery to remove tumors or affected tissues',
      'Radiation therapy to kill cancer cells or shrink tumors',
      'Chemotherapy using drugs to kill rapidly dividing cells',
      'Immunotherapy to help the immune system fight cancer',
      'Targeted therapy that targets specific genes or proteins in cancer cells',
      'Hormone therapy to block hormones that fuel certain cancers',
      'Stem cell transplants to replace damaged bone marrow',
      'Precision medicine approaches based on genetic profiles',
      'Palliative care to improve quality of life',
      'Clinical trials testing new treatments'
    ],
    preventions: [
      'Avoiding tobacco in all forms',
      'Maintaining a healthy weight through diet and exercise',
      'Protecting skin from excessive sun exposure',
      'Limiting alcohol consumption',
      'Eating a diet rich in fruits, vegetables, and whole grains',
      'Vaccination against cancer-causing infections (HPV, hepatitis B)',
      'Regular cancer screenings appropriate for age and risk factors',
      'Avoiding known carcinogens and environmental toxins',
      'Knowing family history and genetic risks',
      'Breastfeeding (reduces breast cancer risk in women)'
    ],
    relatedConditions: [
      'leukemia',
      'lymphoma',
      'carcinoma',
      'sarcoma',
      'melanoma',
      'metastasis',
      'tumor',
      'oncogene',
      'precancerous-conditions',
      'paraneoplastic-syndromes'
    ],
    commonQuestions: [
      {
        question: 'Is cancer always fatal?',
        answer: 'No, cancer is not always fatal. Survival rates have improved significantly over the past several decades due to advances in early detection, treatment options, and supportive care. The prognosis varies greatly depending on the type of cancer, its stage at diagnosis, the patient\'s overall health, and response to treatment. Many cancers are now curable if detected early, and even those that cannot be cured can often be managed as chronic diseases for many years. For example, the 5-year relative survival rate for all cancers combined has increased from about 50% in the 1970s to about 70% today. Some cancers, like certain leukemias in children and testicular cancer, have very high cure rates exceeding 90%. Regular screening, prompt medical attention for concerning symptoms, and advances in personalized treatment approaches continue to improve cancer outcomes.'
      },
      {
        question: 'What\'s the difference between benign and malignant tumors?',
        answer: 'The key difference between benign and malignant tumors is their potential to spread and invade other tissues. Benign tumors grow locally and do not spread to other parts of the body (metastasize). They typically have well-defined borders, grow slowly, rarely recur if removed completely, and seldom cause death unless they press on vital structures. Malignant tumors, which are cancerous, can invade surrounding tissues and spread to distant parts of the body through the bloodstream or lymphatic system. They often have irregular borders, may grow rapidly, tend to recur after removal, and can be life-threatening. Under a microscope, malignant cells typically look abnormal in shape and size, while benign cells more closely resemble normal cells. While benign tumors are generally less serious than malignant ones, they can still cause health problems depending on their size and location.'
      },
      {
        question: 'Are all cancers hereditary?',
        answer: 'No, not all cancers are hereditary. Only about 5-10% of cancers are considered truly hereditary, meaning they result from genetic mutations inherited from a parent. These inherited mutations create a predisposition to certain cancers (like BRCA1/BRCA2 mutations for breast and ovarian cancers or Lynch syndrome for colorectal cancer). The vast majority of cancers (90-95%) are "sporadic," developing from mutations acquired during a person\'s lifetime due to environmental factors, lifestyle choices, or random cellular errors during DNA replication. That said, family history remains an important risk factor even for non-hereditary cancers, as families often share similar environments, lifestyles, and some genetic factors that may increase cancer susceptibility. Cancer typically results from multiple mutations accumulating over time, which is why cancer risk generally increases with age.'
      }
    ],
    emergencySigns: [
      'Sudden severe abdominal pain',
      'Unexplained severe headache with neurological symptoms',
      'Shortness of breath or difficulty breathing',
      'Prolonged fever with signs of infection',
      'Unusual bleeding that doesn\'t stop',
      'Sudden, severe pain anywhere in the body',
      'Changes in level of consciousness or mental status',
      'Seizures in someone with known or suspected cancer'
    ],
    prevalence: 'Cancer is one of the leading causes of death worldwide, responsible for nearly 10 million deaths annually. In the United States, about 1.9 million new cancer cases are diagnosed each year, and more than 600,000 people die from the disease. Approximately 39.5% of people will be diagnosed with cancer at some point during their lifetime. The most common cancers globally are breast, lung, colorectal, prostate, skin, and stomach cancers.',
    affectedGroups: [
      'All age groups, but risk generally increases with age',
      'Individuals with family history of certain cancers',
      'People with specific genetic mutations',
      'Smokers and tobacco users',
      'Heavy alcohol consumers',
      'People with chronic infections (HPV, hepatitis, H. pylori)',
      'Individuals with prolonged exposure to carcinogens',
      'People with compromised immune systems',
      'Those with obesity and sedentary lifestyles',
      'Specific cancers affect different demographic groups (e.g., prostate cancer in men, breast cancer predominantly in women)'
    ],
    references: [
      {
        id: '1',
        text: 'National Cancer Institute. (2021). "What Is Cancer?"',
        url: 'https://www.cancer.gov/about-cancer/understanding/what-is-cancer'
      },
      {
        id: '2',
        text: 'World Health Organization. (2022). "Cancer Fact Sheet".',
        url: 'https://www.who.int/news-room/fact-sheets/detail/cancer'
      },
      {
        id: '3',
        text: 'Hanahan D, Weinberg RA. (2011). "Hallmarks of cancer: the next generation". Cell. 144(5): 646-674.',
        url: 'https://doi.org/10.1016/j.cell.2011.02.013'
      },
      {
        id: '4',
        text: 'American Cancer Society. (2022). "Cancer Facts & Figures 2022".',
        url: 'https://www.cancer.org/research/cancer-facts-statistics/all-cancer-facts-figures/cancer-facts-figures-2022.html'
      },
      {
        id: '5',
        text: 'Sung H, Ferlay J, Siegel RL, et al. (2021). "Global Cancer Statistics 2020: GLOBOCAN Estimates of Incidence and Mortality Worldwide for 36 Cancers in 185 Countries". CA: A Cancer Journal for Clinicians. 71(3): 209-249.',
        url: 'https://doi.org/10.3322/caac.21660'
      }
    ]
  },
  {
    id: 'bipolar-disorder',
    name: 'Bipolar Disorder',
    description: 'A mental health condition characterized by extreme mood swings that include emotional highs (mania or hypomania) and lows (depression).[1] During manic episodes, people may feel euphoric, full of energy, or unusually irritable, while depressive episodes can lead to feelings of sadness, hopelessness, and loss of interest in most activities.[2] The mood shifts may occur rarely or multiple times a year and can significantly impact daily functioning.[3]',
    category: 'mental-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Bipolar_disorder',
    symptoms: [
      'Manic episodes: Abnormally elevated mood, increased energy, reduced need for sleep, racing thoughts, rapid speech, grandiosity, impulsive behavior, excessive involvement in activities with high potential for painful consequences (e.g., spending sprees, risky sexual behavior)',
      'Hypomanic episodes: Similar to mania but less severe and typically not causing severe dysfunction',
      'Depressive episodes: Persistent sadness, empty feeling, hopelessness, guilt, worthlessness, loss of interest in activities, fatigue, changes in appetite and weight, sleep disturbances, difficulty concentrating, thoughts of death or suicide',
      'Mixed episodes: Features of both mania and depression occurring simultaneously',
      'Psychotic symptoms: In severe cases, hallucinations or delusions during manic or depressive episodes',
      'Cognitive impairment: Problems with attention, memory, and executive functioning even between mood episodes'
    ],
    causes: [
      'Genetic factors (heritability estimated at 60-80%)',
      'Neurochemical imbalances involving neurotransmitters like dopamine, serotonin, and norepinephrine',
      'Brain structure and function abnormalities',
      'Environmental triggers (significant life events, stress, trauma, childhood adversity)',
      'Sleep disruptions and circadian rhythm abnormalities',
      'Substance abuse (can trigger or worsen symptoms)'
    ],
    treatments: [
      'Mood stabilizers (lithium, valproate, carbamazepine, lamotrigine)',
      'Atypical antipsychotics (olanzapine, risperidone, quetiapine, aripiprazole)',
      'Antidepressants (used cautiously and typically with mood stabilizers)',
      'Psychotherapy (cognitive behavioral therapy, interpersonal therapy, family-focused therapy)',
      'Psychoeducation about the condition and treatment adherence',
      'Lifestyle management (regular sleep patterns, stress reduction, exercise)',
      'Electroconvulsive therapy (ECT) for severe cases unresponsive to medication',
      'Regular monitoring of mood and medication effects'
    ],
    preventions: [
      'Consistent treatment adherence to prevent relapse',
      'Early intervention at first signs of mood episodes',
      'Regular sleep schedule and stress management',
      'Avoiding alcohol and recreational drugs',
      'Regular exercise and healthy diet',
      'Building a strong support network',
      'Therapy to develop coping strategies and recognize early warning signs',
      'Mood tracking to identify patterns and triggers'
    ],
    relatedConditions: [
      'major-depressive-disorder',
      'cyclothymic-disorder',
      'schizoaffective-disorder',
      'anxiety-disorders',
      'substance-use-disorders',
      'attention-deficit-hyperactivity-disorder',
      'borderline-personality-disorder'
    ],
    commonQuestions: [
      {
        question: 'Is bipolar disorder curable?',
        answer: 'Bipolar disorder is considered a chronic, lifelong condition that currently has no cure, but it is highly treatable. With proper treatment, which typically includes a combination of medication, psychotherapy, and lifestyle management, most people with bipolar disorder can achieve stabilization of mood and lead fulfilling lives. Treatment is usually ongoing to prevent relapses, manage symptoms, and improve quality of life. Some individuals may experience periods of remission with few or no symptoms, but continued treatment is generally recommended to maintain stability.'
      },
      {
        question: 'How is bipolar disorder diagnosed?',
        answer: 'Diagnosing bipolar disorder involves a comprehensive evaluation by a mental health professional, typically a psychiatrist. The process includes a detailed medical and psychiatric history, family history assessment, and evaluation of symptoms using diagnostic criteria from the DSM-5. Unlike many medical conditions, there are no laboratory tests or brain scans that can definitively diagnose bipolar disorder. A key diagnostic challenge is differentiating bipolar disorder from other conditions like major depression, which is why clinicians pay careful attention to any history of manic or hypomanic episodes. Accurate diagnosis often requires multiple sessions and may involve interviews with family members to identify patterns over time.'
      },
      {
        question: 'How does bipolar disorder affect relationships?',
        answer: 'Bipolar disorder can significantly impact relationships in various ways. During manic episodes, a person may engage in impulsive or reckless behaviors, become irritable, or make decisions that strain relationships. During depressive episodes, they may withdraw socially, become emotionally unavailable, or struggle with self-care. These mood fluctuations can be confusing and challenging for partners, family members, and friends. However, with proper treatment, education, and communication, many people with bipolar disorder maintain healthy relationships. Support groups for both individuals with bipolar disorder and their loved ones can provide valuable strategies for navigating these challenges. Open communication, setting boundaries, and involving trusted loved ones in treatment plans can all help strengthen relationships.'
      }
    ],
    emergencySigns: [
      'Suicidal thoughts or behaviors',
      'Psychotic symptoms (hallucinations, delusions)',
      'Severe manic episode with dangerous behavior (extreme risk-taking, aggression)',
      'Severe depressive episode with inability to function',
      'Catatonia (abnormal movements or lack of movement)',
      'Refusal to eat or drink for extended periods'
    ],
    prevalence: 'Bipolar disorder affects approximately 1-2% of the global population. The lifetime prevalence of the bipolar spectrum disorders (including Bipolar I, Bipolar II, and cyclothymia) is estimated to be around 2.4%. The condition typically emerges in late adolescence or early adulthood, with the average age of onset between 18 and 25 years, though it can sometimes appear in childhood or later in life.',
    affectedGroups: [
      'Young adults (peak onset in late teens to mid-20s)',
      'Men and women (affects both genders equally overall, though presentation may differ)',
      'People with family history of bipolar disorder or other mood disorders',
      'Individuals who have experienced significant trauma or stress',
      'People with substance use disorders (higher comorbidity)',
      'Creative professionals (some studies suggest higher prevalence in artistic populations)'
    ],
    references: [
      {
        id: '1',
        text: 'American Psychiatric Association. (2013). "Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition (DSM-5)".',
        url: 'https://doi.org/10.1176/appi.books.9780890425596'
      },
      {
        id: '2',
        text: 'Grande I, Berk M, Birmaher B, Vieta E. (2016). "Bipolar disorder". Lancet. 387 (10027): 1561-1572.',
        url: 'https://doi.org/10.1016/S0140-6736(15)00241-X'
      },
      {
        id: '3',
        text: 'Geddes JR, Miklowitz DJ. (2013). "Treatment of bipolar disorder". Lancet. 381 (9878): 1672-1682.',
        url: 'https://doi.org/10.1016/S0140-6736(13)60857-0'
      },
      {
        id: '4',
        text: 'Yatham LN, Kennedy SH, Parikh SV, et al. (2018). "Canadian Network for Mood and Anxiety Treatments (CANMAT) and International Society for Bipolar Disorders (ISBD) 2018 guidelines for the management of patients with bipolar disorder". Bipolar Disorders. 20 (2): 97-170.',
        url: 'https://doi.org/10.1111/bdi.12609'
      },
      {
        id: '5',
        text: 'Phillips ML, Kupfer DJ. (2013). "Bipolar disorder diagnosis: challenges and future directions". Lancet. 381 (9878): 1663-1671.',
        url: 'https://doi.org/10.1016/S0140-6736(13)60989-7'
      }
    ]
  },
  {
    id: 'anemia',
    name: 'Anemia',
    description: 'A condition characterized by a deficiency in the number or quality of red blood cells, resulting in reduced oxygen delivery to the body\'s tissues.[1] Anemia can develop due to decreased production of red blood cells, increased destruction of red blood cells, or blood loss.[2] Symptoms may include fatigue, weakness, shortness of breath, and pale skin, though mild cases may be asymptomatic.[3] The severity and clinical manifestations depend on the cause, onset speed, and underlying health status of the individual.[4]',
    category: 'general-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Anemia',
    symptoms: [
      'Fatigue and weakness',
      'Pale skin, mucous membranes, and nail beds',
      'Shortness of breath, especially during physical activity',
      'Dizziness or lightheadedness',
      'Fast or irregular heartbeat',
      'Cold hands and feet',
      'Headaches',
      'Chest pain',
      'Cognitive problems (difficulty concentrating, confusion)',
      'Brittle nails or spoon-shaped nails (in iron-deficiency anemia)'
    ],
    causes: [
      'Iron deficiency (most common cause)',
      'Vitamin deficiencies (B12, folate)',
      'Chronic diseases (kidney disease, cancer, rheumatoid arthritis)',
      'Bone marrow disorders (aplastic anemia, myelodysplastic syndrome)',
      'Inherited blood disorders (sickle cell anemia, thalassemia)',
      'Hemolytic anemias (destruction of red blood cells)',
      'Acute or chronic blood loss (heavy menstruation, gastrointestinal bleeding)',
      'Medications that suppress bone marrow',
      'Pregnancy (dilutional anemia)',
      'Nutritional deficiencies'
    ],
    treatments: [
      'Oral iron supplements for iron-deficiency anemia',
      'Injectable iron for severe iron deficiency or absorption issues',
      'Vitamin B12 supplements (oral or injectable)',
      'Folic acid supplements',
      'Erythropoiesis-stimulating agents for anemia of chronic disease',
      'Blood transfusions for severe cases',
      'Treatment of underlying conditions',
      'Bone marrow transplantation for certain types',
      'Immunosuppressive therapy for aplastic anemia',
      'Dietary changes to increase nutrient intake'
    ],
    preventions: [
      'Iron-rich diet (red meat, beans, leafy greens)',
      'Vitamin C with meals to enhance iron absorption',
      'Regular consumption of foods rich in B12 and folate',
      'Iron supplements when recommended by healthcare provider',
      'Regular medical check-ups for early detection',
      'Prompt treatment of conditions that cause blood loss',
      'Avoiding certain medications that can cause anemia',
      'Genetic counseling for hereditary forms',
      'Screening for anemia during pregnancy'
    ],
    relatedConditions: [
      'iron-deficiency',
      'sickle-cell-disease',
      'thalassemia',
      'aplastic-anemia',
      'hemolytic-anemia',
      'vitamin-b12-deficiency',
      'folate-deficiency',
      'chronic-kidney-disease',
      'leukemia'
    ],
    commonQuestions: [
      {
        question: 'What\'s the difference between iron-deficiency anemia and other types?',
        answer: 'Iron-deficiency anemia is caused specifically by insufficient iron, which is essential for hemoglobin production. It\'s the most common form of anemia worldwide and often results from inadequate dietary iron, impaired absorption, or blood loss. Other types of anemia have different causes, such as vitamin deficiencies (B12 or folate), chronic diseases, genetic disorders, or bone marrow problems. Each type may have unique symptoms and require different treatments.'
      },
      {
        question: 'Can anemia be completely cured?',
        answer: 'Whether anemia can be completely cured depends on its underlying cause. Iron-deficiency anemia and anemia caused by vitamin deficiencies typically resolve completely with appropriate supplementation and addressing the cause of the deficiency. Anemia related to chronic diseases may improve with treatment of the underlying condition. However, genetic forms of anemia like sickle cell disease or thalassemia are lifelong conditions that can be managed but not cured, except in some cases through bone marrow transplantation.'
      },
      {
        question: 'How long does it take to recover from anemia?',
        answer: 'Recovery time varies based on the cause and severity of anemia. With iron supplementation, hemoglobin levels typically begin to rise within 1-2 weeks, but complete replenishment of iron stores may take 3-6 months. Vitamin B12 deficiency anemia often shows improvement within days of starting treatment, but full neurological recovery, if nerve damage has occurred, may take 6-12 months or longer. Some chronic or inherited forms of anemia require ongoing management rather than representing a condition from which one "recovers."'
      }
    ],
    prevalence: 'Anemia affects approximately 1.62 billion people globally (24.8% of the population). Iron-deficiency anemia is the most common type, affecting about 2 billion people worldwide. Women of reproductive age and young children are particularly vulnerable, with prevalence rates of 30-40% in developing countries.',
    affectedGroups: [
      'Women of reproductive age (especially during menstruation and pregnancy)',
      'Infants and young children',
      'Elderly individuals',
      'People with chronic diseases',
      'Those with poor nutrition or malabsorption disorders',
      'Individuals from regions with high parasitic infection rates',
      'People with genetic predispositions to certain types of anemia',
      'Individuals with chronic blood loss conditions'
    ],
    references: [
      {
        id: '1',
        text: 'WHO. (2011). "Haemoglobin concentrations for the diagnosis of anaemia and assessment of severity". Vitamin and Mineral Nutrition Information System. Geneva: World Health Organization.',
        url: 'https://www.who.int/vmnis/indicators/haemoglobin.pdf'
      },
      {
        id: '2',
        text: 'Camaschella C. (2015). "Iron-Deficiency Anemia". New England Journal of Medicine, 372(19), 1832–1843.',
        url: 'https://doi.org/10.1056/NEJMra1401038'
      },
      {
        id: '3',
        text: 'Lopez A, Cacoub P, Macdougall IC, Peyrin-Biroulet L. (2016). "Iron deficiency anaemia". Lancet, 387(10021), 907–916.',
        url: 'https://doi.org/10.1016/S0140-6736(15)60865-0'
      },
      {
        id: '4',
        text: 'Auerbach M, Adamson JW. (2016). "How we diagnose and treat iron deficiency anemia". American Journal of Hematology, 91(1), 31–38.',
        url: 'https://doi.org/10.1002/ajh.24201'
      },
      {
        id: '5',
        text: 'Cappellini MD, Motta I. (2015). "Anemia in Clinical Practice-Definition and Classification: Does Hemoglobin Change With Aging?". Seminars in Hematology, 52(4), 261–269.',
        url: 'https://doi.org/10.1053/j.seminhematol.2015.07.006'
      }
    ]
  },
  {
    id: 'allergic-rhinitis',
    name: 'Allergic Rhinitis (Hay Fever)',
    description: 'An inflammatory condition of the nasal passages caused by an allergic reaction to airborne allergens such as pollen, dust mites, or animal dander.[1] Characterized by rhinorrhea (runny nose), nasal congestion, sneezing, and itching, allergic rhinitis can significantly impact quality of life and productivity.[2] The condition may be seasonal (occurring in response to specific pollen seasons) or perennial (year-round due to allergens like dust mites).[3] Predisposing factors include a personal or family history of atopic conditions such as asthma or eczema.[4]',
    category: 'respiratory',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Allergic_rhinitis',
    symptoms: [
      'Rhinorrhea (runny nose)',
      'Nasal congestion/obstruction',
      'Sneezing fits',
      'Itchy nose, eyes, throat, or ears',
      'Watery, red eyes (allergic conjunctivitis)',
      'Postnasal drip',
      'Cough',
      'Fatigue',
      'Headache or facial pressure',
      'Dark circles under the eyes ("allergic shiners")'
    ],
    causes: [
      'Seasonal pollens (trees, grasses, weeds)',
      'Perennial allergens (dust mites, pet dander, mold)',
      'Occupational allergens',
      'Food allergies (in some cases)',
      'Genetic predisposition',
      'Environmental pollution',
      'Strong odors or irritants'
    ],
    treatments: [
      'Intranasal corticosteroids (fluticasone, mometasone)',
      'Oral antihistamines (cetirizine, loratadine, fexofenadine)',
      'Nasal antihistamines (azelastine)',
      'Leukotriene receptor antagonists (montelukast)',
      'Decongestants (short-term use only)',
      'Nasal saline irrigation',
      'Allergen immunotherapy (allergy shots)',
      'Sublingual immunotherapy tablets',
      'Avoidance of known allergens'
    ],
    preventions: [
      'Identifying and avoiding trigger allergens',
      'Using air purifiers with HEPA filters',
      'Keeping windows closed during high pollen seasons',
      'Showering after outdoor activities in pollen season',
      'Using allergen-proof covers for bedding',
      'Regular cleaning to reduce dust mites and mold',
      'Removing carpets and upholstered furniture (if dust mite allergic)',
      'Keeping indoor humidity below 50% to prevent mold growth',
      'Pre-treatment with medications before allergen exposure'
    ],
    relatedConditions: [
      'asthma',
      'atopic-dermatitis',
      'sinusitis',
      'nasal-polyps',
      'conjunctivitis',
      'sleep-apnea'
    ],
    commonQuestions: [
      {
        question: 'What is the difference between allergic rhinitis and a common cold?',
        answer: 'While both conditions may cause a runny nose and congestion, allergic rhinitis typically causes clear nasal discharge, itchy eyes/nose, and sneezing, whereas colds often include thicker, yellow/green discharge, fever, body aches, and generally resolve within 7-10 days. Allergic rhinitis symptoms persist as long as exposure to the allergen continues and often have a seasonal pattern.'
      },
      {
        question: 'Can allergic rhinitis develop at any age?',
        answer: 'Yes, allergic rhinitis can develop at any age, although it often first appears during childhood or young adulthood. Some people may experience symptoms for the first time in middle age or later. Changes in environment, moving to a new geographic location, or new allergen exposures can trigger the onset of symptoms at any point in life.'
      },
      {
        question: 'Is allergic rhinitis related to asthma?',
        answer: 'Yes, allergic rhinitis and asthma are closely related conditions and often co-exist. This relationship is sometimes referred to as "unified airway disease" or "one airway, one disease." Having allergic rhinitis increases the risk of developing asthma, and treating allergic rhinitis effectively can help improve asthma symptoms in people who have both conditions.'
      }
    ],
    prevalence: 'Allergic rhinitis affects approximately 10-30% of adults and up to 40% of children worldwide. It is one of the most common chronic conditions, affecting over 400 million people globally.',
    affectedGroups: [
      'People with a family history of allergies or asthma',
      'Children and young adults (though can affect any age)',
      'People living in areas with high allergen levels',
      'Those exposed to indoor allergens (dust mites, pet dander)',
      'Urban populations exposed to air pollution',
      'People with other atopic conditions (asthma, eczema)'
    ],
    references: [
      {
        id: '1',
        text: 'Bousquet J, Khaltaev N, Cruz AA, et al. (2008). "Allergic Rhinitis and its Impact on Asthma (ARIA) 2008 update". Allergy. 63 (Suppl 86): 8–160.',
        url: 'https://doi.org/10.1111/j.1398-9995.2007.01620.x'
      },
      {
        id: '2',
        text: 'Meltzer EO, Blaiss MS, Derebery MJ, et al. (2009). "Burden of allergic rhinitis: results from the Pediatric Allergies in America survey". Journal of Allergy and Clinical Immunology. 124 (3): S43–S70.',
        url: 'https://doi.org/10.1016/j.jaci.2009.05.013'
      },
      {
        id: '3',
        text: 'Wheatley LM, Togias A (2015). "Clinical practice. Allergic rhinitis". New England Journal of Medicine. 372 (5): 456–463.',
        url: 'https://doi.org/10.1056/NEJMcp1412282'
      },
      {
        id: '4',
        text: 'Seidman MD, Gurgel RK, Lin SY, et al. (2015). "Clinical practice guideline: Allergic rhinitis". Otolaryngology–Head and Neck Surgery. 152 (1 Suppl): S1–S43.',
        url: 'https://doi.org/10.1177/0194599814561600'
      },
      {
        id: '5',
        text: 'Wallace DV, Dykewicz MS, Bernstein DI, et al. (2008). "The diagnosis and management of rhinitis: an updated practice parameter". Journal of Allergy and Clinical Immunology. 122 (2 Suppl): S1–S84.',
        url: 'https://doi.org/10.1016/j.jaci.2008.06.003'
      }
    ]
  },
  {
    id: 'acne',
    name: 'Acne',
    description: 'A common skin condition characterized by the appearance of inflamed or infected sebaceous glands in the skin.[1] Typical features include increased sebum production, the formation of comedones (blackheads and whiteheads), papules, pustules, nodules, and often results in scarring.[2][3] While primarily affecting adolescents, acne can occur at any age and may result in psychological and social problems.[4]',
    category: 'skin-and-hair',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Acne',
    symptoms: [
      'Whiteheads (closed comedones)',
      'Blackheads (open comedones)',
      'Papules (small red bumps)',
      'Pustules (pimples with pus)',
      'Nodules (large, painful bumps beneath the skin)',
      'Cystic lesions (painful, pus-filled lumps beneath the skin)',
      'Oily skin',
      'Scarring',
      'Hyperpigmentation (dark spots)',
      'Skin redness and inflammation'
    ],
    causes: [
      'Excess sebum production',
      'Bacterial growth (Cutibacterium acnes)',
      'Inflammation',
      'Clogging of hair follicles by oil and dead skin cells',
      'Hormonal changes (especially during puberty)',
      'Genetic factors',
      'Certain medications (corticosteroids, androgens, lithium)',
      'Possible dietary factors (high-glycemic foods, dairy)'
    ],
    treatments: [
      'Topical treatments (benzoyl peroxide, retinoids, antibiotics, salicylic acid)',
      'Oral antibiotics (tetracyclines, macrolides)',
      'Hormonal therapies (oral contraceptives, spironolactone)',
      'Isotretinoin for severe cases',
      'Procedures (chemical peels, extraction, steroid injections)',
      'Light and laser therapies',
      'Proper skincare routine'
    ],
    preventions: [
      'Gentle cleansing twice daily',
      'Using non-comedogenic products',
      'Regular exfoliation',
      'Avoiding touching or picking at acne',
      'Managing stress',
      'Possible dietary modifications (reducing dairy and high-glycemic foods)',
      'Consistent use of prescribed treatments'
    ],
    relatedConditions: [
      'rosacea',
      'hidradenitis-suppurativa',
      'folliculitis',
      'keratosis-pilaris',
      'perioral-dermatitis'
    ],
    references: [
      {
        id: '1',
        text: 'Zaenglein AL, Pathy AL, Schlosser BJ, et al. (2016). "Guidelines of care for the management of acne vulgaris". Journal of the American Academy of Dermatology. 74 (5): 945–73.e33.',
        url: 'https://doi.org/10.1016/j.jaad.2015.12.037'
      },
      {
        id: '2',
        text: 'Williams HC, Dellavalle RP, Garner S (2012). "Acne vulgaris". Lancet. 379 (9813): 361–372.',
        url: 'https://doi.org/10.1016/S0140-6736(11)60321-8'
      },
      {
        id: '3',
        text: 'Tan JK, Bhate K (2015). "A global perspective on the epidemiology of acne". British Journal of Dermatology. 172 (Suppl 1): 3–12.',
        url: 'https://doi.org/10.1111/bjd.13462'
      },
      {
        id: '4',
        text: 'Halvorsen JA, Stern RS, Dalgard F, et al. (2011). "Suicidal ideation, mental health problems, and social impairment are increased in adolescents with acne: a population-based study". Journal of Investigative Dermatology. 131 (2): 363–370.',
        url: 'https://doi.org/10.1038/jid.2010.264'
      },
      {
        id: '5',
        text: 'Thiboutot D, Gollnick H, Bettoli V, et al. (2009). "New insights into the management of acne: an update from the Global Alliance to Improve Outcomes in Acne group". Journal of the American Academy of Dermatology. 60 (5 Suppl): S1–50.',
        url: 'https://doi.org/10.1016/j.jaad.2009.01.019'
      }
    ],
    commonQuestions: [
      {
        question: 'Does diet affect acne?',
        answer: 'Research suggests that certain dietary factors may influence acne in some people. High-glycemic-index foods (those that raise blood sugar quickly) and dairy products have been associated with acne flares in some studies. However, the relationship between diet and acne varies significantly between individuals. If you notice certain foods worsen your acne, consider discussing dietary modifications with a healthcare provider.'
      },
      {
        question: 'Is acne just a teenage problem?',
        answer: 'While acne is most common during adolescence due to hormonal changes, it can affect people of all ages. Adult-onset acne is increasingly recognized, particularly in women in their 20s, 30s, and even 40s. Hormonal fluctuations, stress, certain medications, and genetic factors can contribute to adult acne. The treatment approach may differ between teenage and adult acne.'
      },
      {
        question: 'Can acne scars be treated?',
        answer: 'Yes, various treatments can improve the appearance of acne scars. Options include topical treatments (retinoids, vitamin C), procedures (chemical peels, microdermabrasion, microneedling), laser therapies, dermal fillers, and in severe cases, surgical procedures. The best approach depends on the type and severity of scarring. Early treatment of active acne is important for preventing scarring.'
      }
    ],
    prevalence: 'Acne affects approximately 85% of people between the ages of 12 and 24 years. It is estimated that 40-50 million people in the United States have acne. The condition is less common in some rural societies, suggesting environmental and lifestyle factors may play a role.',
    affectedGroups: [
      'Adolescents and teenagers (most common)',
      'Young adults (20-30 years)',
      'Women more than men in adulthood',
      'People with hormonal disorders',
      'People with family history of acne',
      'Those using certain medications or cosmetics'
    ]
  },
  {
    id: 'african-trypanosomiasis',
    name: 'African Trypanosomiasis (Sleeping Sickness)',
    description: 'A parasitic disease transmitted by the tsetse fly, affecting the nervous system and causing severe neurological complications if untreated.[1][2] The disease progresses in two stages: the hemolymphatic stage with parasites in the blood and lymph, followed by the neurological stage when parasites cross the blood-brain barrier.[3] The symptoms often differ between travelers and those from endemic areas.[4]',
    category: 'infectious-diseases',
    subcategory: 'parasitic-infections',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/African_trypanosomiasis',
    symptoms: [
      'Fever',
      'Severe headaches',
      'Irritability',
      'Extreme fatigue',
      'Swollen lymph nodes',
      'Joint pain',
      'Sleep cycle disruption',
      'Confusion',
      'Difficulty concentrating',
      'Progressive drowsiness',
      'Coma in late stages'
    ],
    causes: [
      'Infection with trypanosoma parasites (T. brucei gambiense or T. brucei rhodesiense)',
      'Transmitted through the bite of infected tsetse flies',
      'Common in rural areas of sub-Saharan Africa'
    ],
    treatments: [
      'Early diagnosis through blood tests and cerebrospinal fluid examination',
      'Stage 1 (hemolymphatic): Pentamidine or Suramin',
      'Stage 2 (neurological): Melarsoprol, Eflornithine, or Nifurtimox-Eflornithine combination',
      'Hospitalization for treatment administration and monitoring',
      'Supportive care for symptoms and complications'
    ],
    preventions: [
      'Avoiding tsetse fly habitats',
      'Wearing protective clothing (long sleeves, pants)',
      'Using insect repellent',
      'Checking vehicles before entering',
      'Tsetse fly population control measures',
      'Public health surveillance in endemic areas'
    ],
    relatedConditions: ['malaria', 'leishmaniasis', 'chagas-disease'],
    references: [
      {
        id: '1',
        text: 'WHO Media Centre (March 2014). "Fact sheet N°259: Trypanosomiasis, Human African (sleeping sickness)". World Health Organization.',
        url: 'https://www.who.int/news-room/fact-sheets/detail/trypanosomiasis-human-african-(sleeping-sickness)'
      },
      {
        id: '2',
        text: 'Kennedy PG (February 2013). "Clinical features, diagnosis, and treatment of human African trypanosomiasis (sleeping sickness)". The Lancet. Neurology. 12 (2): 186–194.',
        url: 'https://doi.org/10.1016/S1474-4422(12)70296-X'
      },
      {
        id: '3',
        text: 'Simarro PP, Cecchi G, Franco JR, et al. (2012). "Estimating and mapping the population at risk of sleeping sickness". PLOS Neglected Tropical Diseases. 6 (10): e1859.',
        url: 'https://doi.org/10.1371/journal.pntd.0001859'
      },
      {
        id: '4',
        text: 'Blum J, Schmid C, Burri C (2006). "Clinical aspects of 2541 patients with second stage human African trypanosomiasis". Acta Tropica. 97 (1): 55–64.',
        url: 'https://doi.org/10.1016/j.actatropica.2005.08.001'
      },
      {
        id: '5',
        text: 'Franco JR, Simarro PP, Diarra A, Jannin JG (2014). "Epidemiology of human African trypanosomiasis". Clinical Epidemiology. 6: 257–275.',
        url: 'https://doi.org/10.2147/CLEP.S39728'
      }
    ],
    commonQuestions: [
      {
        question: 'Can sleeping sickness be contracted outside of Africa?',
        answer: 'African trypanosomiasis is geographically restricted to sub-Saharan Africa where the tsetse fly vector is found. It cannot be contracted in other regions unless through very rare cases of laboratory accidents.'
      },
      {
        question: 'How quickly does sleeping sickness progress?',
        answer: 'The progression varies by parasite type. T. b. rhodesiense causes a more acute form that can progress to the neurological stage within weeks or months. T. b. gambiense causes a chronic form that may take months or years to reach the neurological stage.'
      }
    ],
    emergencySigns: [
      'Severe confusion or behavioral changes',
      'Seizures',
      'Inability to be awakened',
      'Extreme lethargy'
    ]
  },

  {
    id: 'anxiety-disorders',
    name: 'Anxiety Disorders',
    description: 'A group of mental disorders characterized by significant and uncontrollable feelings of anxiety and fear that cause impairment to a person\'s social, occupational, and personal functioning.[1][2] Anxiety may cause physical symptoms like restlessness, fatigue, and increased heart rate, as well as cognitive symptoms such as irritability and difficulty concentrating.[3] Worldwide, anxiety disorders are the second most common type of mental disorders after depression, affecting nearly 30% of adults at some point in their lives.[4]',
    category: 'mental-health',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Anxiety_disorder',
    subcategory: 'anxiety',
    symptoms: [
      'Excessive worrying or fear',
      'Feeling agitated or on edge',
      'Restlessness or feeling keyed up',
      'Fatigue and irritability',
      'Difficulty concentrating',
      'Muscle tension',
      'Sleep problems',
      'Panic attacks (in some types)',
      'Rapid heartbeat',
      'Sweating or trembling'
    ],
    causes: [
      'Genetic factors',
      'Brain chemistry imbalances',
      'Environmental stresses',
      'Trauma or significant life events',
      'Medical conditions',
      'Substance use or withdrawal'
    ],
    treatments: [
      'Cognitive Behavioral Therapy (CBT)',
      'Exposure therapy',
      'Acceptance and Commitment Therapy (ACT)',
      'Selective Serotonin Reuptake Inhibitors (SSRIs)',
      'Serotonin-Norepinephrine Reuptake Inhibitors (SNRIs)',
      'Benzodiazepines (for short-term use)',
      'Buspirone',
      'Relaxation techniques and mindfulness',
      'Lifestyle changes'
    ],
    preventions: [
      'Stress management techniques',
      'Regular physical activity',
      'Adequate sleep',
      'Limiting caffeine and alcohol',
      'Maintaining social connections',
      'Seeking help early when symptoms first appear'
    ],
    relatedConditions: [
      'depression',
      'obsessive-compulsive-disorder',
      'post-traumatic-stress-disorder',
      'panic-disorder',
      'social-anxiety-disorder'
    ],
    references: [
      {
        id: '1',
        text: 'American Psychiatric Association. (2013). Diagnostic and Statistical Manual of Mental Disorders (5th ed.). Arlington, VA: American Psychiatric Association.',
        url: 'https://doi.org/10.1176/appi.books.9780890425596'
      },
      {
        id: '2',
        text: 'Craske MG, Stein MB (December 2016). "Anxiety". Lancet. 388 (10063): 3048–3059.',
        url: 'https://doi.org/10.1016/S0140-6736(16)30381-6'
      },
      {
        id: '3',
        text: 'Szuhany KL, Simon NM (December 2022). "Anxiety Disorders: A Review". JAMA. 328 (24): 2431–2445.',
        url: 'https://doi.org/10.1001/jama.2022.22744'
      },
      {
        id: '4',
        text: 'Bandelow B, Michaelis S (2015). "Epidemiology of anxiety disorders in the 21st century". Dialogues in Clinical Neuroscience. 17 (3): 327–335.',
        url: 'https://doi.org/10.31887/DCNS.2015.17.3/bbandelow'
      },
      {
        id: '5',
        text: 'Remes O, Brayne C, van der Linde R, Lafortune L (2016). "A systematic review of reviews on the prevalence of anxiety disorders in adult populations". Brain and Behavior. 6 (7): e00497.',
        url: 'https://doi.org/10.1002/brb3.497'
      }
    ],
    commonQuestions: [
      {
        question: 'What\'s the difference between normal anxiety and an anxiety disorder?',
        answer: 'Normal anxiety is a temporary response to stress that doesn\'t interfere with daily life. An anxiety disorder involves excessive fear or worry that is difficult to control, lasts for extended periods, and significantly impacts daily functioning.'
      },
      {
        question: 'Are anxiety disorders treatable?',
        answer: 'Yes, anxiety disorders are highly treatable. Most people who receive appropriate treatment experience significant improvement in their symptoms and quality of life. Treatment typically involves therapy, medication, or a combination of both.'
      },
      {
        question: 'Can anxiety disorders develop suddenly?',
        answer: 'While some anxiety disorders may seem to appear suddenly, especially after a traumatic event, many develop gradually over time. Symptoms may worsen during periods of stress or life transitions.'
      }
    ],
    prevalence: 'Anxiety disorders are the most common mental health conditions, affecting approximately 30% of adults at some point in their lives.',
    affectedGroups: [
      'Women (more commonly diagnosed than men)',
      'Adolescents and young adults',
      'People with family history of anxiety',
      'Those who have experienced trauma',
      'People with certain medical conditions'
    ]
  },

  {
    id: 'arthritis',
    name: 'Arthritis',
    description: 'A group of conditions involving inflammation or degeneration of one or more joints, causing pain, stiffness, and reduced mobility.[1] The most common forms include osteoarthritis (resulting from wear and tear on joints) and rheumatoid arthritis (an autoimmune condition).[2] Symptoms vary in severity and may affect any joint in the body, with pain being the most common complaint.[3] While some types of arthritis affect only the joints, others can affect other organs and cause systemic symptoms.[4]',
    category: 'bone-and-joint',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Arthritis',
    symptoms: [
      'Joint pain',
      'Stiffness, especially in the morning or after inactivity',
      'Swelling in the joints',
      'Reduced range of motion',
      'Redness and warmth in the affected area',
      'Fatigue (especially with rheumatoid arthritis)',
      'Joint deformity (in advanced cases)'
    ],
    causes: [
      'Age-related wear and tear (osteoarthritis)',
      'Autoimmune responses (rheumatoid arthritis)',
      'Genetics',
      'Joint injuries',
      'Obesity and excess weight',
      'Infections',
      'Occupational hazards'
    ],
    treatments: [
      'Pain relievers (acetaminophen, NSAIDs)',
      'Anti-inflammatory medications',
      'Disease-modifying antirheumatic drugs (DMARDs)',
      'Biologics',
      'Corticosteroid injections',
      'Physical therapy',
      'Occupational therapy',
      'Joint replacement surgery',
      'Assistive devices (braces, canes)'
    ],
    preventions: [
      'Maintain a healthy weight',
      'Regular low-impact exercise',
      'Protect joints during activities',
      'Good posture and ergonomics',
      'Balanced diet rich in anti-inflammatory foods',
      'Avoiding smoking'
    ],
    relatedConditions: [
      'osteoarthritis',
      'rheumatoid-arthritis',
      'gout',
      'psoriatic-arthritis',
      'lupus',
      'fibromyalgia'
    ],
    commonQuestions: [
      {
        question: 'What\'s the difference between osteoarthritis and rheumatoid arthritis?',
        answer: 'Osteoarthritis is primarily a degenerative joint disease caused by wear and tear on the joints over time. Rheumatoid arthritis is an autoimmune condition where the body\'s immune system mistakenly attacks the joint lining, causing inflammation and damage.'
      },
      {
        question: 'Can weather affect arthritis symptoms?',
        answer: 'Many people with arthritis report that changes in weather, particularly cold or damp conditions, can worsen their symptoms. While research is mixed, barometric pressure changes may affect joint pressure and pain levels.'
      },
      {
        question: 'Is arthritis only an elderly person\'s disease?',
        answer: 'No, arthritis can affect people of all ages, including children. While osteoarthritis is more common in older adults, rheumatoid arthritis and other forms can develop at any age. Juvenile arthritis specifically affects children under 16.'
      }
    ],
    prevalence: 'Arthritis affects over 54 million adults in the United States, making it one of the leading causes of disability.',
    affectedGroups: [
      'Older adults (especially for osteoarthritis)',
      'Women (especially for rheumatoid arthritis)',
      'People with family history of arthritis',
      'Those with previous joint injuries',
      'People who are overweight or obese',
      'Individuals with certain occupations involving repetitive joint stress',
      'Smokers (increased risk for rheumatoid arthritis)'
    ],
    references: [
      {
        id: '1',
        text: 'Centers for Disease Control and Prevention (2023). "Arthritis". National Center for Chronic Disease Prevention and Health Promotion.',
        url: 'https://www.cdc.gov/arthritis/index.html'
      },
      {
        id: '2',
        text: 'Senthelal S, Li J, Goyal A, Bansal P, Thomas MA (2022). "Arthritis". StatPearls. Treasure Island (FL): StatPearls Publishing.',
        url: 'https://www.ncbi.nlm.nih.gov/books/NBK518992/'
      },
      {
        id: '3',
        text: 'Hunter DJ, Bierma-Zeinstra S (2019). "Osteoarthritis". Lancet. 393 (10182): 1745–1759.',
        url: 'https://doi.org/10.1016/S0140-6736(19)30417-9'
      },
      {
        id: '4',
        text: 'Aletaha D, Smolen JS (2018). "Diagnosis and Management of Rheumatoid Arthritis: A Review". JAMA. 320 (13): 1360–1372.',
        url: 'https://doi.org/10.1001/jama.2018.13103'
      },
      {
        id: '5',
        text: 'Glyn-Jones S, Palmer AJ, Agricola R, et al. (2015). "Osteoarthritis". Lancet. 386 (9991): 376–387.',
        url: 'https://doi.org/10.1016/S0140-6736(14)60802-3'
      }
    ]
  },

  {
    id: 'atherosclerosis',
    name: 'Atherosclerosis',
    description: 'A disease in which plaque builds up inside the arteries, gradually narrowing and hardening them, which can lead to serious problems including heart attack, stroke, or even death.[1] Atherosclerosis develops when fat, cholesterol, and other substances accumulate in the walls of arteries and form hard structures called plaques.[2] Over time, these plaques can narrow or completely block the arteries, reducing blood flow and oxygen supply to vital organs and tissues.[3]',
    category: 'heart-and-circulation',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Atherosclerosis',
    symptoms: [
      'Often asymptomatic until advanced stages',
      'Chest pain or pressure (angina) when blockages affect coronary arteries',
      'Sudden numbness or weakness in arms or legs when blockages affect arteries to the brain',
      'Pain or cramping in the legs when walking (claudication) due to reduced blood flow',
      'High blood pressure if blockages affect renal arteries',
      'Shortness of breath if condition affects arteries serving the lungs',
      'Fatigue',
      'Confusion or slurred speech (if affecting brain arteries)'
    ],
    causes: [
      'High levels of cholesterol and triglycerides in the blood',
      'High blood pressure',
      'Smoking and tobacco use',
      'Diabetes mellitus',
      'Obesity',
      'Physical inactivity',
      'Unhealthy diet high in saturated fats, trans fats, and cholesterol',
      'Family history of heart disease',
      'Age (risk increases with age)',
      'Inflammation from diseases like arthritis, lupus, or infections'
    ],
    treatments: [
      'Lifestyle changes (improved diet, regular exercise, smoking cessation)',
      'Medications to lower cholesterol (statins, PCSK9 inhibitors)',
      'Medications to control blood pressure (ACE inhibitors, beta-blockers)',
      'Antiplatelet medications (aspirin, clopidogrel) to reduce clot formation',
      'Medications to control blood sugar in diabetic patients',
      'Angioplasty and stent placement to open narrowed arteries',
      'Endarterectomy to remove plaque from arteries',
      'Bypass surgery to create alternative routes around blocked arteries',
      'Medications to reduce inflammation'
    ],
    preventions: [
      'Eating a heart-healthy diet low in saturated and trans fats',
      'Regular physical activity (at least 150 minutes of moderate exercise weekly)',
      'Maintaining a healthy weight',
      'Not smoking or using tobacco products',
      'Limiting alcohol consumption',
      'Managing stress',
      'Regular check-ups to monitor blood pressure, cholesterol, and blood sugar',
      'Taking medications as prescribed for conditions like high cholesterol or hypertension',
      'Managing other health conditions like diabetes or obesity'
    ],
    relatedConditions: [
      'coronary-artery-disease',
      'peripheral-artery-disease',
      'carotid-artery-disease',
      'heart-attack',
      'stroke',
      'aneurysm',
      'chronic-kidney-disease',
      'hypertension',
      'diabetes'
    ],
    commonQuestions: [
      {
        question: 'Can atherosclerosis be reversed?',
        answer: 'While complete reversal of atherosclerosis is challenging, progression can be slowed or even partially reversed with aggressive treatment. Lifestyle changes including a heart-healthy diet, regular exercise, smoking cessation, and weight management are fundamental. Medications like high-intensity statins can significantly reduce plaque burden in some patients. Studies show that intensive cholesterol-lowering therapy can lead to plaque regression. The earlier treatment begins, the better the chances of preventing further progression and complications. Even in advanced disease, appropriate interventions can improve outcomes and quality of life.'
      },
      {
        question: 'How is atherosclerosis diagnosed?',
        answer: 'Atherosclerosis diagnosis typically involves multiple approaches. Initial assessment includes medical history, physical examination, and blood tests to check cholesterol levels and other risk factors. Imaging tests are crucial and may include: ultrasound to visualize arteries and blood flow; coronary calcium scan to detect calcium deposits in coronary arteries; CT angiography or MRI to create detailed images of arteries; and coronary angiography, which uses contrast dye and X-rays to see blockages directly. Stress tests may be used to determine how well the heart functions during physical activity. Early diagnosis is important as atherosclerosis can be present for decades before causing symptoms.'
      },
      {
        question: 'What\'s the difference between atherosclerosis and arteriosclerosis?',
        answer: 'Although often used interchangeably, atherosclerosis and arteriosclerosis are distinct conditions. Arteriosclerosis is a broader term referring to any hardening and loss of elasticity in arteries, which can occur through several mechanisms. Atherosclerosis is a specific type of arteriosclerosis characterized by the buildup of fats, cholesterol, and other substances (plaque) in and on artery walls. Think of arteriosclerosis as the category and atherosclerosis as a specific type within that category. Atherosclerosis is the most common form of arteriosclerosis and the primary cause of heart attacks, strokes, and peripheral vascular disease.'
      }
    ],
    emergencySigns: [
      'Chest pain or pressure that may radiate to the arm, shoulder, jaw, or back',
      'Sudden weakness, numbness, or paralysis in face, arm, or leg (especially on one side)',
      'Sudden trouble speaking or understanding speech',
      'Sudden severe headache',
      'Sudden difficulty seeing in one or both eyes',
      'Sudden dizziness, loss of balance or coordination',
      'Severe abdominal pain with radiation to the back (possible abdominal aortic issue)',
      'Sudden severe shortness of breath'
    ],
    prevalence: 'Atherosclerosis affects approximately 20-30% of adults over 55 years of age worldwide. In the United States, it underlies about 50% of all deaths. The prevalence increases dramatically with age, with subclinical atherosclerosis present in over 85% of people over 50 years old based on imaging studies.',
    affectedGroups: [
      'Older adults (risk increases significantly after age 45 for men and 55 for women)',
      'People with family history of premature heart disease',
      'Smokers',
      'People with high cholesterol or high blood pressure',
      'Individuals with diabetes',
      'Physically inactive people',
      'Those with obesity or metabolic syndrome',
      'People with chronic inflammatory conditions',
      'Men (higher risk than premenopausal women)'
    ],
    references: [
      {
        id: '1',
        text: 'Libby P, Buring JE, Badimon L, et al. (2019). "Atherosclerosis". Nature Reviews Disease Primers. 5 (1): 56.',
        url: 'https://doi.org/10.1038/s41572-019-0106-z'
      },
      {
        id: '2',
        text: 'Herrington W, Lacey B, Sherliker P, Armitage J, Lewington S. (2016). "Epidemiology of Atherosclerosis and the Potential to Reduce the Global Burden of Atherothrombotic Disease". Circulation Research. 118 (4): 535-546.',
        url: 'https://doi.org/10.1161/CIRCRESAHA.115.307611'
      },
      {
        id: '3',
        text: 'Falk E. (2006). "Pathogenesis of Atherosclerosis". Journal of the American College of Cardiology. 47 (8 Supplement): C7-C12.',
        url: 'https://doi.org/10.1016/j.jacc.2005.09.068'
      },
      {
        id: '4',
        text: 'Arnett DK, Blumenthal RS, Albert MA, et al. (2019). "2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease". Circulation. 140 (11): e596-e646.',
        url: 'https://doi.org/10.1161/CIR.0000000000000678'
      },
      {
        id: '5',
        text: 'Visseren FLJ, Mach F, Smulders YM, et al. (2021). "2021 ESC Guidelines on cardiovascular disease prevention in clinical practice". European Heart Journal. 42 (34): 3227-3337.',
        url: 'https://doi.org/10.1093/eurheartj/ehab484'
      }
    ]
  },
  {
    id: 'asthma',
    name: 'Asthma',
    description: 'A chronic inflammatory disease of the airways characterized by recurrent episodes of wheezing, shortness of breath, chest tightness, and coughing.[1][2] Symptoms are typically worse at night and in the early morning, or in response to exercise or cold air.[3] Asthma is caused by a combination of complex environmental and genetic factors that influence both its severity and responsiveness to treatment.[4]',
    category: 'respiratory',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Asthma',
    symptoms: [
      'Wheezing (whistling sound during breathing)',
      'Shortness of breath',
      'Chest tightness or pain',
      'Coughing, especially at night or early morning',
      'Difficulty sleeping due to breathing problems',
      'Increased mucus production',
      'Fatigue',
      'Symptoms that worsen with exercise, cold air, or allergens'
    ],
    causes: [
      'Genetic predisposition',
      'Allergies (dust mites, pet dander, pollen)',
      'Air pollution and irritants',
      'Respiratory infections',
      'Exercise (exercise-induced asthma)',
      'Cold air',
      'Stress and strong emotions',
      'Certain medications (beta-blockers, aspirin)',
      'Occupational exposures to irritants or allergens',
      'Smoking and secondhand smoke'
    ],
    treatments: [
      'Quick-relief medications (short-acting beta agonists)',
      'Long-term control medications (inhaled corticosteroids)',
      'Long-acting beta agonists in combination with inhaled corticosteroids',
      'Leukotriene modifiers',
      'Anticholinergics',
      'Biologics (for severe asthma)',
      'Allergen immunotherapy',
      'Bronchial thermoplasty (for severe cases)'
    ],
    preventions: [
      'Identifying and avoiding personal triggers',
      'Regular use of prescribed controller medications',
      'Maintaining good overall health',
      'Getting vaccinated against influenza and pneumonia',
      'Managing allergies',
      'Using air purifiers and reducing household allergens',
      'Avoiding tobacco smoke and air pollution',
      'Creating an asthma action plan with a healthcare provider'
    ],
    relatedConditions: [
      'allergic-rhinitis',
      'sinusitis',
      'gastroesophageal-reflux-disease',
      'obstructive-sleep-apnea',
      'eczema',
      'copd',
      'bronchiectasis'
    ],
    references: [
      {
        id: '1',
        text: 'Global Initiative for Asthma. (2023). "Global Strategy for Asthma Management and Prevention."',
        url: 'https://ginasthma.org/gina-reports/'
      },
      {
        id: '2',
        text: 'Dharmage SC, Perret JL, Custovic A (2019). "Epidemiology of Asthma in Children and Adults". Frontiers in Pediatrics. 7: 246.',
        url: 'https://doi.org/10.3389/fped.2019.00246'
      },
      {
        id: '3',
        text: 'Papi A, Brightling C, Pedersen SE, Reddel HK (2018). "Asthma". Lancet. 391 (10122): 783–800.',
        url: 'https://doi.org/10.1016/S0140-6736(17)33311-1'
      },
      {
        id: '4',
        text: 'Subbarao P, Mandhane PJ, Sears MR (2009). "Asthma: epidemiology, etiology and risk factors". CMAJ. 181 (9): E181-90.',
        url: 'https://doi.org/10.1503/cmaj.080612'
      },
      {
        id: '5',
        text: 'Holgate ST, Wenzel S, Postma DS, et al. (2015). "Asthma". Nature Reviews Disease Primers. 1: 15025.',
        url: 'https://doi.org/10.1038/nrdp.2015.25'
      }
    ],
    commonQuestions: [
      {
        question: 'Can asthma be cured?',
        answer: 'Currently, there is no cure for asthma. However, with proper treatment and management, most people with asthma can control their symptoms and lead normal, active lives. Treatment focuses on controlling symptoms and preventing asthma attacks through medication, avoiding triggers, and following an asthma action plan.'
      },
      {
        question: 'Is asthma always linked to allergies?',
        answer: 'Not all asthma is linked to allergies. While allergic asthma (triggered by allergens like pollen, pet dander, or dust mites) is the most common type, non-allergic asthma can be triggered by factors such as exercise, cold air, respiratory infections, stress, or certain medications. Some people have mixed asthma with both allergic and non-allergic triggers.'
      },
      {
        question: 'Can adults develop asthma, or does it only start in childhood?',
        answer: 'Asthma can develop at any age, including in adulthood. While many cases begin in childhood, adult-onset asthma is common and may be triggered by respiratory infections, workplace irritants, hormonal changes, or even developing later in life without clear causes. Adult-onset asthma tends to be more persistent and may require different management approaches than childhood asthma.'
      }
    ],
    emergencySigns: [
      'Severe shortness of breath where speaking is difficult',
      'Breathing that gets worse despite using a rescue inhaler',
      'Shortness of breath when doing minimal activity',
      'Blue-tinged lips or fingernails (cyanosis)',
      'Rapid breathing and pulse',
      'Confusion or drowsiness',
      'Severe anxiety due to breathing difficulty'
    ],
    prevalence: 'Asthma affects approximately 300 million people worldwide. In the United States, about 25 million people have asthma, including 5-10% of children.',
    affectedGroups: [
      'Children, especially boys (before puberty)',
      'Adult women (after puberty)',
      'People with allergies or family history of allergies or asthma',
      'People in urban areas with high levels of air pollution',
      'People exposed to occupational triggers',
      'Smokers and those exposed to secondhand smoke',
      'Individuals who had respiratory infections in early childhood'
    ]
  },

  {
    id: 'atrial-fibrillation',
    name: 'Atrial Fibrillation',
    description: 'An irregular and often rapid heart rhythm that can increase the risk of strokes, heart failure, and other heart-related complications.',
    category: 'heart-and-circulation',
    symptoms: [
      'Palpitations (sensations of a racing, uncomfortable, irregular heartbeat)',
      'Weakness',
      'Fatigue',
      'Lightheadedness',
      'Dizziness',
      'Shortness of breath',
      'Chest pain or discomfort'
    ],
    causes: [
      'Abnormalities or damage to the heart\'s structure',
      'High blood pressure',
      'Heart attacks',
      'Coronary artery disease',
      'Congenital heart defects',
      'Overactive thyroid gland',
      'Sleep apnea',
      'Viral infections',
      'Stress',
      'Alcohol or stimulant use'
    ],
    treatments: [
      'Medications to control heart rate (beta blockers, calcium channel blockers)',
      'Medications to control heart rhythm (antiarrhythmics)',
      'Blood thinners to prevent clots and strokes',
      'Electrical cardioversion',
      'Catheter ablation',
      'Maze procedure surgery',
      'Pacemaker implantation',
      'Left atrial appendage closure'
    ],
    preventions: [
      'Heart-healthy lifestyle',
      'Regular physical activity',
      'Healthy diet low in salt and solid fats',
      'Avoiding excessive alcohol and caffeine',
      'Not smoking',
      'Maintaining a healthy weight',
      'Managing stress',
      'Treating underlying conditions like sleep apnea'
    ],
    relatedConditions: [
      'heart-failure',
      'stroke',
      'coronary-artery-disease',
      'heart-attack',
      'hypertension',
      'valve-disease'
    ],
    commonQuestions: [
      {
        question: 'Is atrial fibrillation life-threatening?',
        answer: 'While atrial fibrillation itself is not usually immediately life-threatening, it significantly increases the risk of stroke and can lead to heart failure over time if not properly managed. The blood clots that may form due to the irregular heartbeat can cause strokes if they travel to the brain.'
      },
      {
        question: 'Can atrial fibrillation go away on its own?',
        answer: 'Some people experience paroxysmal atrial fibrillation, which can come and go, with episodes that stop on their own. However, atrial fibrillation often progresses and becomes more persistent over time, requiring treatment to manage symptoms and prevent complications.'
      },
      {
        question: 'How can I tell if I\'m having an atrial fibrillation episode?',
        answer: 'Many people describe feeling a fluttering or thumping in the chest, irregular heartbeat, or heart palpitations. Others may feel fatigue, shortness of breath, weakness, dizziness, or chest discomfort. Some people have no symptoms and discover they have AFib during a routine medical examination.'
      }
    ],
    emergencySigns: [
      'Severe chest pain',
      'Severe shortness of breath',
      'Fainting or severe dizziness',
      'Sudden weakness or numbness in the face, arm, or leg (signs of a stroke)'
    ],
    prevalence: 'Atrial fibrillation affects an estimated 2.7 to 6.1 million people in the United States, with the prevalence increasing with age.',
    affectedGroups: [
      'Older adults (risk increases with age)',
      'People with heart disease or high blood pressure',
      'Those with family history of AFib',
      'People who are overweight or obese',
      'Heavy alcohol users',
      'Athletes (can develop in some high-performance athletes)'
    ]
  },

  {
    id: 'burns',
    name: 'Burns',
    description: 'Tissue damage caused by heat, chemicals, electricity, sunlight, or radiation.[1] Burns can vary in severity from minor (first-degree) affecting only the outer layer of skin, to more serious (second-degree) affecting both the outer and underlying layer of skin, to severe (third-degree) extending into deeper tissues.[2] Fourth-degree burns, the most severe, extend through the skin and into underlying fat, muscle and bone.[3] The treatment and prognosis depend on the depth, area, location, age, and general health of the person affected.[4]',
    category: 'skin-and-hair',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Burn',
    symptoms: [
      'First-degree burns: Redness, pain, minor swelling, dry peeling skin as it heals',
      'Second-degree burns: Blisters, severe pain, redness, splotchy appearance',
      'Third-degree burns: White or charred appearance, possible numbness due to nerve damage',
      'Fourth-degree burns: Extends through skin into fat, muscle and bone, often appears charred with eschar',
      'Difficulty breathing or coughing (if smoke inhalation occurred)',
      'Shock symptoms: pale skin, weakness, bluish lips and fingernails, drop in alertness',
      'Swelling',
      'Pain (except in very severe burns where nerve damage occurs)'
    ],
    causes: [
      'Thermal burns: Fire, steam, hot liquids, or contact with hot objects',
      'Chemical burns: Strong acids, alkalis, detergents, or solvents',
      'Electrical burns: Contact with electrical current',
      'Radiation burns: Sunburn or exposure to other radiation sources',
      'Friction burns: Skin rubbing against hard surfaces',
      'Cold burns (frostbite): Prolonged exposure to freezing temperatures',
      'Workplace accidents',
      'House fires',
      'Scalding accidents (especially in children and elderly)',
      'Abuse'
    ],
    treatments: [
      'First aid: Stop the burning process, remove clothing/jewelry, cool the burn with cool (not cold) running water',
      'Pain management with acetaminophen, ibuprofen, or prescription medications',
      'Topical antibiotics for minor burns to prevent infection',
      'Tetanus prophylaxis if needed',
      'Wound cleaning and debridement (removing dead tissue)',
      'Dressings and bandages to protect the area and aid healing',
      'Intravenous fluids to prevent dehydration in serious burns',
      'Skin grafting for severe burns',
      'Reconstructive surgery',
      'Physical therapy to maintain function and minimize scarring',
      'Psychological support for trauma and adjustment'
    ],
    preventions: [
      'Install smoke detectors in homes and check batteries regularly',
      'Keep hot liquids away from edges of tables and counters',
      'Set water heater temperature to 120°F (48.9°C) or lower',
      'Use back burners on stoves when possible and turn pot handles inward',
      'Keep chemicals out of reach of children',
      'Wear protective gear when working with chemicals or potentially hot materials',
      'Apply sunscreen regularly when outdoors',
      'Teach children about fire safety',
      'Have fire escape plans for homes and workplaces',
      'Use protective covers on electrical outlets'
    ],
    relatedConditions: [
      'smoke-inhalation',
      'carbon-monoxide-poisoning',
      'traumatic-shock',
      'compartment-syndrome',
      'infections',
      'hypertrophic-scars',
      'keloids',
      'contractures',
      'post-traumatic-stress-disorder'
    ],
    commonQuestions: [
      {
        question: 'When should I seek emergency care for a burn?',
        answer: 'Seek emergency medical care immediately for: burns that affect large areas of the body (larger than 3 inches in diameter); deep burns that affect all layers of the skin (appear dry, leathery, or have charred, white, brown or black areas); burns on the face, hands, feet, genitals, buttocks, or major joints; chemical or electrical burns; burns accompanied by difficulty breathing; burns in infants, young children, or elderly people; and any burn that doesn\'t show improvement within 2 weeks. Even seemingly minor burns can be serious if they completely circle a limb or digit, as swelling may restrict blood flow. When in doubt, it\'s safer to have a healthcare professional evaluate the burn.'
      },
      {
        question: 'Should I pop burn blisters?',
        answer: 'No, you should not pop burn blisters. Blisters act as a natural barrier against infection, and breaking this barrier increases the risk of bacterial contamination. The fluid inside blisters contains proteins and other compounds that aid in healing. If a blister breaks on its own, gently clean the area with mild soap and water, apply an antibiotic ointment, and cover with a sterile bandage. In a medical setting, healthcare providers may sometimes drain large blisters that impair movement or are likely to break, but this is done using sterile technique. Keep the burned area clean, avoid applying home remedies like butter or toothpaste, and see a doctor if you notice signs of infection such as increased pain, redness, swelling, or discharge.'
      },
      {
        question: 'How long does it take for burns to heal?',
        answer: 'Healing time for burns varies significantly depending on the depth and extent of the injury. First-degree burns typically heal within 7-10 days without scarring. Second-degree burns may take 2-3 weeks to heal and might leave some scarring. Third-degree burns require much longer healing times, often months, and almost always result in scarring; they frequently require skin grafting to heal properly. Fourth-degree burns need extensive treatment including surgery and rehabilitation. Factors that affect healing include the victim\'s age, overall health, nutritional status, presence of infection, and location of the burn. Proper wound care, adequate nutrition, and following medical advice can optimize healing. Complete functional recovery, especially for severe burns, may take months to years of rehabilitation.'
      }
    ],
    emergencySigns: [
      'Burns covering a large area of the body',
      'Third-degree or fourth-degree burns',
      'Burns on the face, hands, feet, genitals, or major joints',
      'Circumferential burns (completely encircling a body part)',
      'Chemical or electrical burns',
      'Breathing difficulties (possible airway burn or smoke inhalation)',
      'Signs of infection in a burn: increasing pain, redness, swelling, oozing',
      'Signs of shock: pale skin, weakness, rapid pulse, decreased alertness'
    ],
    prevalence: 'Globally, burns result in about 180,000 deaths annually and millions of non-fatal injuries requiring medical attention. In the United States alone, approximately 486,000 people receive medical treatment for burns each year. Children under 5 and adults over 65 have the highest risk of burn injury. The majority of burns (approximately 73%) occur in the home environment.',
    affectedGroups: [
      'Children under 5 years old (particularly at risk for scalds)',
      'Adults over 65 years old',
      'People with mobility or cognitive impairments',
      'Industrial and kitchen workers',
      'Firefighters and first responders',
      'People in low-income countries (higher incidence due to open fire cooking and heating)',
      'People living in substandard housing with inadequate safety features',
      'Electrical workers',
      'Victims of domestic abuse'
    ],
    references: [
      {
        id: '1',
        text: 'World Health Organization. (2018). "Burns". Fact sheets.',
        url: 'https://www.who.int/news-room/fact-sheets/detail/burns'
      },
      {
        id: '2',
        text: 'Herndon D. (2017). "Total Burn Care". 5th Edition. Elsevier.',
        url: 'https://www.elsevier.com/books/total-burn-care/herndon/978-0-323-47661-4'
      },
      {
        id: '3',
        text: 'American Burn Association. (2016). "Burn Incidence and Treatment in the United States".',
        url: 'https://ameriburn.org/who-we-are/media/burn-incidence-fact-sheet/'
      },
      {
        id: '4',
        text: 'Jeschke MG, van Baar ME, Choudhry MA, Chung KK, Gibran NS, Logsetty S. (2020). "Burn injury". Nature Reviews Disease Primers. 6 (1): 11.',
        url: 'https://doi.org/10.1038/s41572-020-0145-5'
      },
      {
        id: '5',
        text: 'Porter C, Tompkins RG, Finnerty CC, Sidossis LS, Suman OE, Herndon DN. (2016). "The metabolic stress response to burn trauma: current understanding and therapies". Lancet. 388 (10052): 1417-1426.',
        url: 'https://doi.org/10.1016/S0140-6736(16)31469-6'
      }
    ]
  },
  {
    id: 'bronchitis',
    name: 'Bronchitis',
    description: 'An inflammation of the lining of the bronchial tubes, which carry air to and from the lungs, usually resulting in coughing, mucus production, and sometimes difficulty breathing.',
    category: 'respiratory',
    symptoms: [
      'Persistent cough, often with mucus',
      'Shortness of breath',
      'Wheezing',
      'Chest discomfort or tightness',
      'Low fever and chills',
      'Fatigue'
    ],
    causes: [
      'Viral infections (most common cause of acute bronchitis)',
      'Bacterial infections',
      'Exposure to irritants such as tobacco smoke, air pollution, or dust',
      'Workplace exposure to certain chemicals or fumes',
      'Gastroesophageal reflux disease (GERD)'
    ],
    treatments: [
      'Rest and plenty of fluids',
      'Over-the-counter pain relievers to reduce fever and discomfort',
      'Cough medicine (if cough interferes with sleep)',
      'Antibiotics (only if bacterial infection is present)',
      'Inhalers and other bronchodilators (to open airways)',
      'Pulmonary rehabilitation (for chronic bronchitis)',
      'Oxygen therapy (in severe cases)'
    ],
    preventions: [
      'Avoid smoking and secondhand smoke',
      'Vaccination against flu and pneumonia',
      'Frequent handwashing, especially during cold and flu season',
      'Use of masks in polluted environments',
      'Maintaining good overall health with diet and exercise'
    ],
    relatedConditions: [
      'asthma',
      'pneumonia',
      'copd',
      'emphysema',
      'sinusitis'
    ],
    commonQuestions: [
      {
        question: 'What is the difference between acute and chronic bronchitis?',
        answer: 'Acute bronchitis typically lasts less than three weeks and is often due to a viral infection. Chronic bronchitis is defined as a productive cough that lasts for three months or more per year for at least two consecutive years, and is often part of chronic obstructive pulmonary disease (COPD).'
      },
      {
        question: 'When should I see a doctor for bronchitis?',
        answer: 'You should see a doctor if you have a cough that lasts more than three weeks, prevents you from sleeping, is accompanied by fever higher than 100.4°F (38°C), produces discolored or bloody mucus, or is accompanied by wheezing or shortness of breath.'
      },
      {
        question: 'Is bronchitis contagious?',
        answer: 'Acute bronchitis caused by a virus or bacteria can be contagious and spread through coughs, sneezes, or touching contaminated surfaces. Chronic bronchitis is not contagious as it\'s typically caused by long-term exposure to irritants that damage the lungs.'
      }
    ],
    emergencySigns: [
      'Severe difficulty breathing',
      'High fever above 100.4°F (38°C) with shaking chills',
      'Coughing up blood',
      'Bluish discoloration of lips or fingernails'
    ],
    prevalence: 'Acute bronchitis is one of the most common conditions treated by primary care physicians, with millions of cases annually. Chronic bronchitis affects approximately 9 million Americans.',
    affectedGroups: [
      'Smokers',
      'People with weakened immune systems',
      'The elderly and very young children',
      'Those with respiratory conditions like asthma',
      'People regularly exposed to air pollutants or chemical fumes'
    ]
  },

  {
    id: 'buruli-ulcer',
    name: 'Buruli Ulcer',
    description: 'A chronic debilitating skin infection caused by Mycobacterium ulcerans, characterized by large skin ulcers typically on the limbs.',
    category: 'infectious-diseases',
    subcategory: 'bacterial-infections',
    symptoms: [
      'Painless nodules under the skin (initial stage)',
      'Firm, non-tender plaque',
      'Large, undermined skin ulcers with necrotic base',
      'Destruction of skin and soft tissue',
      'Possible bone involvement in advanced cases',
      'Limited mobility if ulcers affect joints'
    ],
    causes: [
      'Infection with Mycobacterium ulcerans bacteria',
      'Transmission methods not fully understood (possibly through water, soil, or insect vectors)',
      'Common in tropical and subtropical regions, especially near wetlands and slow-moving water'
    ],
    treatments: [
      'Combination antibiotic therapy (rifampicin and clarithromycin for 8 weeks)',
      'Wound care and dressings',
      'Surgery to remove necrotic tissue',
      'Skin grafting for large wounds',
      'Physical therapy to prevent disability',
      'Rehabilitation for affected limbs'
    ],
    preventions: [
      'Early detection and prompt treatment',
      'Avoiding contact with contaminated water sources in endemic areas',
      'Proper wound care to prevent secondary infections',
      'Public health education in endemic communities',
      'BCG vaccination may provide limited protection'
    ],
    relatedConditions: ['tuberculosis', 'leprosy'],
    commonQuestions: [
      {
        question: 'Is Buruli ulcer contagious from person to person?',
        answer: 'Buruli ulcer is not believed to be transmitted directly from person to person. Most evidence suggests it is acquired from the environment, particularly in areas near wetlands or slow-moving water bodies.'
      },
      {
        question: 'What is the long-term outlook for people with Buruli ulcer?',
        answer: 'With early diagnosis and appropriate antibiotic treatment, most cases heal with minimal scarring and disability. However, delayed diagnosis can lead to extensive tissue damage, requiring surgery and potentially resulting in permanent disfigurement and disability.'
      }
    ]
  },

  {
    id: 'cancers',
    name: 'Cancers',
    description: 'A group of diseases characterized by the uncontrolled growth and spread of abnormal cells that can invade nearby tissues and spread to other parts of the body.',
    category: 'cancer',
    symptoms: [
      'Unexplained weight loss',
      'Fatigue',
      'Pain',
      'Skin changes',
      'Change in bowel or bladder habits',
      'Unusual bleeding or discharge',
      'Thickening or lump in breast or elsewhere',
      'Indigestion or difficulty swallowing',
      'Recent change in a wart or mole',
      'Persistent cough or hoarseness'
    ],
    causes: [
      'Genetic mutations (inherited or acquired)',
      'Tobacco use',
      'Excessive alcohol consumption',
      'UV radiation exposure',
      'Certain infectious agents (HPV, Hepatitis B and C, H. pylori)',
      'Exposure to carcinogens (asbestos, benzene, etc.)',
      'Chronic inflammation',
      'Hormonal factors',
      'Diet and physical inactivity',
      'Obesity'
    ],
    treatments: [
      'Surgery to remove cancerous tissue',
      'Radiation therapy to kill cancer cells',
      'Chemotherapy to kill rapidly dividing cells',
      'Immunotherapy to help the immune system fight cancer',
      'Targeted therapy to attack specific cancer cell features',
      'Hormone therapy for hormone-sensitive cancers',
      'Stem cell transplant for certain blood cancers',
      'Precision medicine based on genetic profile',
      'Palliative care for symptom management'
    ],
    preventions: [
      'Avoiding tobacco',
      'Limiting alcohol consumption',
      'Maintaining a healthy weight',
      'Regular physical activity',
      'Healthy diet rich in fruits and vegetables',
      'Sun protection',
      'Vaccinations against cancer-causing infections (HPV, Hepatitis B)',
      'Regular screening tests (mammograms, colonoscopies, Pap tests)',
      'Avoiding exposure to environmental carcinogens',
      'Genetic counseling for those with family history'
    ],
    relatedConditions: ['benign-tumors', 'precancerous-conditions', 'metastatic-disease'],
    commonQuestions: [
      {
        question: 'Are all cancers hereditary?',
        answer: 'No, most cancers are not hereditary. Only about 5-10% of cancers are directly linked to inherited genetic mutations. The majority of cancers develop from mutations acquired during a person\'s lifetime due to environmental factors and lifestyle choices.'
      },
      {
        question: 'Can cancer be cured?',
        answer: 'Many cancers can be effectively treated and even cured, especially when detected early. Treatment success depends on the type of cancer, its stage at diagnosis, and individual factors. Some cancers have high cure rates, while others remain challenging to treat.'
      }
    ],
    emergencySigns: [
      'Severe unexplained pain',
      'Difficulty breathing',
      'Unusual bleeding that doesn\'t stop',
      'Large changes in a mole',
      'Seizures or changes in consciousness in those with known or suspected brain tumors'
    ]
  },

  {
    id: 'cardiovascular-diseases',
    name: 'Cardiovascular Diseases',
    description: 'A class of diseases that involve the heart or blood vessels, including coronary artery disease, heart failure, arrhythmias, valve disorders, and congenital heart defects.',
    category: 'heart-and-circulation',
    symptoms: [
      'Chest pain or discomfort (angina)',
      'Shortness of breath',
      'Pain, numbness, or coldness in legs or arms',
      'Irregular heartbeat or palpitations',
      'Dizziness or lightheadedness',
      'Fatigue',
      'Swelling in legs, ankles, or feet',
      'Rapid or racing heartbeat',
      'Fainting or near-fainting spells'
    ],
    causes: [
      'High blood pressure',
      'High cholesterol and triglycerides',
      'Smoking',
      'Diabetes',
      'Obesity',
      'Physical inactivity',
      'Unhealthy diet',
      'Family history and genetic factors',
      'Age (risk increases with age)',
      'Stress',
      'Poor sleep',
      'Alcohol or drug abuse'
    ],
    treatments: [
      'Lifestyle modifications',
      'Medications (statins, beta-blockers, ACE inhibitors, anticoagulants, etc.)',
      'Angioplasty and stent placement',
      'Coronary artery bypass surgery',
      'Valve repair or replacement',
      'Pacemakers and implantable cardioverter-defibrillators',
      'Heart transplantation',
      'Cardiac rehabilitation programs',
      'Management of underlying conditions like diabetes and hypertension'
    ],
    preventions: [
      'Regular physical activity',
      'Heart-healthy diet',
      'Maintaining healthy weight',
      'Not smoking or quitting smoking',
      'Limiting alcohol consumption',
      'Managing stress',
      'Regular health screenings',
      'Controlling blood pressure',
      'Managing cholesterol levels',
      'Controlling blood sugar if diabetic'
    ],
    relatedConditions: ['hypertension', 'coronary-artery-disease', 'heart-failure', 'stroke', 'peripheral-artery-disease'],
    commonQuestions: [
      {
        question: 'What is the difference between a heart attack and cardiac arrest?',
        answer: 'A heart attack occurs when blood flow to part of the heart is blocked, causing damage to heart muscle. Cardiac arrest occurs when the heart suddenly stops beating, causing loss of consciousness and no pulse. A heart attack can lead to cardiac arrest, but they are different conditions requiring different emergency responses.'
      },
      {
        question: 'Can cardiovascular disease be reversed?',
        answer: 'Some cardiovascular conditions can be improved or partially reversed through lifestyle changes, medications, and medical procedures. For example, coronary artery disease may be improved through lifestyle changes, statins, and procedures like angioplasty. However, complete reversal is not always possible for all types of cardiovascular disease.'
      }
    ],
    emergencySigns: [
      'Chest pain, pressure, or squeezing sensation',
      'Pain radiating to arm, jaw, neck, or back',
      'Sudden severe shortness of breath',
      'Sudden weakness, numbness, or paralysis in face, arm, or leg (signs of stroke)',
      'Sudden severe headache',
      'Fainting or loss of consciousness'
    ]
  },

  {
    id: 'cholera',
    name: 'Cholera',
    description: 'An acute diarrheal infection caused by ingestion of food or water contaminated with the bacterium Vibrio cholerae, which can lead to severe dehydration and death if untreated.',
    category: 'infectious-diseases',
    subcategory: 'bacterial-infections',
    symptoms: [
      'Profuse watery diarrhea ("rice water stools")',
      'Vomiting',
      'Leg cramps',
      'Rapid dehydration',
      'Low blood pressure',
      'Dry mouth and skin',
      'Irregular heartbeat',
      'Shock',
      'Little or no urine output',
      'Weakness and fatigue'
    ],
    causes: [
      'Infection with Vibrio cholerae bacteria',
      'Consuming contaminated food or water',
      'Poor sanitation and inadequate clean water supply',
      'Living in crowded conditions with poor hygiene',
      'Raw or undercooked seafood from contaminated waters'
    ],
    treatments: [
      'Prompt rehydration (oral rehydration solution)',
      'Intravenous fluids for severe cases',
      'Antibiotics to shorten duration (doxycycline, azithromycin, ciprofloxacin)',
      'Zinc supplements for children',
      'Management of complications'
    ],
    preventions: [
      'Safe drinking water (boiled, treated, or bottled)',
      'Proper food preparation and storage',
      'Thorough hand washing with soap',
      'Proper sanitation and waste disposal',
      'Cholera vaccines for high-risk populations',
      'Improved water and sanitation infrastructure',
      'Public health education in endemic areas'
    ],
    relatedConditions: ['dysentery', 'typhoid-fever', 'enterotoxigenic-e-coli-infection'],
    commonQuestions: [
      {
        question: 'How quickly can cholera kill if untreated?',
        answer: 'Cholera can cause death within hours if left untreated. The rapid loss of fluids and electrolytes through severe diarrhea and vomiting can lead to dehydration, shock, and death in as little as 2-3 hours in the most severe cases, particularly in vulnerable populations like children and the elderly.'
      },
      {
        question: 'Is cholera still common in the modern world?',
        answer: 'Yes, cholera remains a significant public health problem in many parts of the developing world, particularly in areas with inadequate sanitation and water treatment infrastructure. Major outbreaks still occur, especially following natural disasters, conflicts, or in refugee camps where water and sanitation systems are compromised.'
      }
    ],
    emergencySigns: [
      'Severe dehydration (sunken eyes, dry mouth, extreme thirst, little or no urination)',
      'Lethargy or unconsciousness',
      'Seizures',
      'Severe muscle cramps',
      'Shock (rapid pulse, low blood pressure)'
    ]
  },

  {
    id: 'chronic-respiratory-diseases',
    name: 'Chronic Respiratory Diseases',
    description: 'A group of chronic diseases affecting the airways and other structures of the lungs, including asthma, chronic obstructive pulmonary disease (COPD), pulmonary hypertension, and occupational lung diseases.',
    category: 'respiratory',
    symptoms: [
      'Shortness of breath (dyspnea)',
      'Chronic cough',
      'Wheezing',
      'Chest tightness',
      'Excess mucus production',
      'Fatigue',
      'Reduced exercise tolerance',
      'Recurrent respiratory infections',
      'Cyanosis (bluish discoloration of lips or skin) in severe cases'
    ],
    causes: [
      'Tobacco smoke (active and passive smoking)',
      'Air pollution (outdoor and indoor)',
      'Occupational dusts and chemicals',
      'Frequent lower respiratory infections during childhood',
      'Genetic factors',
      'Allergies and hypersensitivity',
      'Premature birth affecting lung development'
    ],
    treatments: [
      'Bronchodilators to relax airway muscles',
      'Inhaled corticosteroids to reduce inflammation',
      'Long-term oxygen therapy for advanced cases',
      'Pulmonary rehabilitation programs',
      'Smoking cessation support',
      'Vaccination against influenza and pneumococcal disease',
      'Management of comorbidities',
      'Lung transplantation for end-stage disease',
      'Lifestyle modifications'
    ],
    preventions: [
      'Avoiding tobacco smoke',
      'Reducing exposure to air pollution',
      'Using protective equipment in hazardous work environments',
      'Early detection and management of respiratory symptoms',
      'Maintaining good indoor air quality',
      'Regular exercise',
      'Healthy diet',
      'Prevention of respiratory infections'
    ],
    relatedConditions: ['asthma', 'copd', 'bronchiectasis', 'pulmonary-fibrosis', 'pulmonary-hypertension'],
    commonQuestions: [
      {
        question: 'Can chronic respiratory diseases be cured?',
        answer: 'Most chronic respiratory diseases cannot be completely cured, but they can be effectively managed with proper treatment. The goal of treatment is to control symptoms, prevent exacerbations, slow disease progression, and improve quality of life. Early diagnosis and intervention generally lead to better outcomes.'
      },
      {
        question: 'How does air pollution affect respiratory diseases?',
        answer: 'Air pollution can trigger symptoms and exacerbations in people with existing respiratory diseases and contribute to the development of new cases. Pollutants can cause inflammation in the airways, reduce lung function, and increase susceptibility to infections. Long-term exposure is associated with reduced lung growth in children and accelerated lung function decline in adults.'
      }
    ],
    emergencySigns: [
      'Severe breathlessness that doesn\'t improve with medication',
      'Inability to speak in full sentences due to breathlessness',
      'Bluish coloration of lips or face',
      'Altered mental status or confusion',
      'Rapid breathing with severe chest pain'
    ]
  },

  {
    id: 'chronic-venous-insufficiency',
    name: 'Chronic Venous Insufficiency',
    description: 'A condition where the veins in the legs cannot efficiently return blood to the heart, causing blood to pool in the legs and leading to various complications.',
    category: 'heart-and-circulation',
    subcategory: 'vascular-disorders',
    symptoms: [
      'Leg swelling, especially after prolonged standing',
      'Aching or heaviness in legs',
      'Leg pain that worsens when standing',
      'Varicose veins',
      'Leathery-looking skin on the legs',
      'Flaking or itching skin on the legs',
      'Leg ulcers, especially near the ankles',
      'Hardening of the skin on the legs',
      'Brown discoloration around the ankles'
    ],
    causes: [
      'Damaged or weakened vein valves',
      'Past blood clots (deep vein thrombosis)',
      'Phlebitis (vein inflammation)',
      'Family history of venous problems',
      'Prolonged sitting or standing',
      'Obesity',
      'Pregnancy',
      'Age-related changes in veins',
      'Smoking'
    ],
    treatments: [
      'Compression stockings',
      'Regular exercise',
      'Leg elevation',
      'Weight management',
      'Medications to improve blood flow',
      'Endovenous thermal ablation',
      'Sclerotherapy',
      'Vein stripping (in severe cases)',
      'Wound care for venous ulcers',
      'Skin grafting for persistent ulcers'
    ],
    preventions: [
      'Regular physical activity',
      'Maintaining a healthy weight',
      'Avoiding prolonged standing or sitting',
      'Regular leg elevation',
      'Wearing compression stockings',
      'Avoiding tight clothing that restricts blood flow',
      'Quitting smoking'
    ],
    relatedConditions: ['varicose-veins', 'deep-vein-thrombosis', 'venous-stasis-ulcers', 'lymphedema'],
    commonQuestions: [
      {
        question: 'Is chronic venous insufficiency reversible?',
        answer: 'Chronic venous insufficiency is generally not completely reversible, but its progression can be slowed and symptoms can be effectively managed with appropriate treatment. Early intervention tends to yield better outcomes in preventing complications like venous ulcers.'
      },
      {
        question: 'How effective are compression stockings for chronic venous insufficiency?',
        answer: 'Compression stockings are considered a cornerstone of treatment for chronic venous insufficiency. They help improve blood flow by applying graduated pressure to the legs, reducing swelling and discomfort. Studies show they can significantly reduce symptoms and help prevent complications when worn consistently.'
      }
    ]
  },

  {
    id: 'coronary-artery-disease',
    name: 'Coronary Artery Disease',
    description: 'A condition in which the major blood vessels that supply the heart with blood, oxygen, and nutrients (coronary arteries) become damaged or diseased, often due to buildup of cholesterol-containing deposits (plaque).[1] This plaque buildup narrows the coronary arteries, reducing blood flow to the heart muscle.[2] As a result, the heart doesn\'t receive enough oxygen-rich blood, especially during physical activity.[3] Coronary artery disease develops over decades and can go unnoticed until it causes a heart attack.[4]',
    category: 'heart-and-circulation',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Coronary_artery_disease',
    symptoms: [
      'Chest pain or discomfort (angina)',
      'Shortness of breath',
      'Pain or discomfort in the arms, neck, jaw, shoulder, or back',
      'Fatigue',
      'Nausea',
      'Lightheadedness',
      'Cold sweats',
      'Heart palpitations',
      'Swelling in the feet, ankles, or legs',
      'Sleep disturbances due to breathing problems',
      'Symptoms often worsen during physical activity',
      'Women may experience different symptoms including unusual fatigue, sleep disturbances, and shortness of breath'
    ],
    causes: [
      'Atherosclerosis (buildup of plaque in arteries)',
      'High blood pressure',
      'High cholesterol',
      'Diabetes',
      'Smoking',
      'Lack of physical activity',
      'Obesity',
      'Family history',
      'Age (men over 45, women over 55 at increased risk)',
      'Stress',
      'Unhealthy diet high in saturated fats, trans fats, sodium, and sugar',
      'Excessive alcohol consumption',
      'Sleep apnea',
      'Autoimmune conditions causing inflammation of blood vessels',
      'History of preeclampsia during pregnancy'
    ],
    treatments: [
      'Lifestyle changes (diet, exercise, smoking cessation)',
      'Medications (aspirin, statins, beta-blockers, ACE inhibitors)',
      'Angioplasty and stent placement',
      'Coronary artery bypass surgery',
      'Cardiac rehabilitation',
      'Management of underlying conditions',
      'Enhanced external counterpulsation (EECP)',
      'Chelation therapy (for specific cases)',
      'Heart transplant (for severe end-stage heart failure)',
      'Transmyocardial laser revascularization (for patients not eligible for other surgical treatments)',
      'Implantable cardioverter-defibrillator (ICD) for those at risk of dangerous arrhythmias',
      'Biventricular pacemaker for heart failure patients with specific electrical conduction problems'
    ],
    preventions: [
      'Heart-healthy diet (Mediterranean or DASH diet)',
      'Regular exercise (at least 150 minutes of moderate activity weekly)',
      'Maintaining healthy weight',
      'Quitting smoking and avoiding secondhand smoke',
      'Managing stress through relaxation techniques',
      'Limiting alcohol consumption',
      'Controlling blood pressure',
      'Managing cholesterol levels',
      'Controlling diabetes',
      'Regular health screenings',
      'Taking medications as prescribed',
      'Adequate sleep',
      'Dental care (periodontal disease linked to heart disease)',
      'Flu vaccination (respiratory infections can strain the heart)'
    ],
    relatedConditions: [
      'heart-attack',
      'heart-failure',
      'angina',
      'arrhythmias',
      'peripheral-artery-disease',
      'stroke',
      'hypertension',
      'diabetes',
      'metabolic-syndrome',
      'chronic-kidney-disease',
      'atherosclerosis',
      'carotid-artery-disease'
    ],
    commonQuestions: [
      {
        question: 'What\'s the difference between coronary artery disease and heart attack?',
        answer: 'Coronary artery disease (CAD) and heart attack (myocardial infarction) are related but distinct conditions. CAD is a chronic, progressive disease characterized by the buildup of plaque in the coronary arteries that supply blood to the heart muscle. This buildup develops over decades, gradually narrowing the arteries and reducing blood flow to the heart. A heart attack, on the other hand, is an acute event that occurs when a coronary artery becomes suddenly blocked, usually when a plaque ruptures and a blood clot forms, completely cutting off blood flow to a portion of the heart muscle. This causes that section of heart muscle to begin dying from lack of oxygen. In essence, CAD is the underlying disease process that can lead to a heart attack. While CAD develops slowly and may cause symptoms like angina (chest pain) during exertion, a heart attack happens suddenly and requires emergency medical attention. Not everyone with CAD will have a heart attack, especially if they receive appropriate treatment and make lifestyle changes to manage the condition.'
      },
      {
        question: 'Can coronary artery disease be reversed?',
        answer: 'Coronary artery disease can be stabilized and, in some cases, partially reversed through aggressive lifestyle changes and medical therapy. Complete reversal is rare, but studies have shown that intensive lifestyle modifications—including a plant-based or Mediterranean diet very low in saturated fat, regular exercise, stress management, smoking cessation, and social support—can cause regression of atherosclerotic plaques in some patients. Medications, particularly statins, can also help reduce plaque burden. Dr. Dean Ornish\'s lifestyle program and the Pritikin Program have demonstrated plaque regression in clinical studies. However, it\'s important to understand that even when plaques don\'t fully regress, lifestyle changes and medications can stabilize existing plaques (making them less likely to rupture and cause a heart attack), improve endothelial function, reduce inflammation, and promote the development of collateral blood vessels. This can significantly improve symptoms and quality of life while reducing the risk of heart attacks and other complications. The best approach is to begin lifestyle changes and appropriate medical therapy as early as possible, ideally before significant disease has developed.'
      },
      {
        question: 'How is coronary artery disease diagnosed?',
        answer: 'Coronary artery disease diagnosis typically begins with a medical history, physical examination, and assessment of risk factors. Initial tests often include an electrocardiogram (ECG) to check heart\'s electrical activity and blood tests to measure cholesterol levels, glucose, and cardiac enzymes. If CAD is suspected, further diagnostic tests may include: stress tests (exercise or pharmacological) to see how the heart functions under exertion; echocardiogram to visualize heart structure and function; nuclear cardiac stress tests using radioactive tracers to show blood flow; coronary calcium scan to detect calcium deposits in arteries; coronary CT angiography for detailed images of coronary arteries; and cardiac catheterization (coronary angiogram), the gold standard that involves injecting contrast dye directly into the coronary arteries to visualize blockages. Newer techniques include intravascular ultrasound (IVUS) and optical coherence tomography (OCT), which provide detailed images of artery walls during catheterization. The choice of tests depends on symptom severity, risk factors, and previous test results. Early diagnosis is crucial for effective treatment and prevention of complications.'
      }
    ],
    emergencySigns: [
      'Chest pain or pressure lasting more than a few minutes or recurring',
      'Pain extending to shoulder, arm, back, neck, jaw, or stomach',
      'Shortness of breath with or without chest discomfort',
      'Breaking out in a cold sweat',
      'Nausea or vomiting',
      'Lightheadedness or sudden dizziness',
      'Rapid or irregular heartbeats with feeling of weakness',
      'Sudden extreme fatigue',
      'In women: unusual fatigue, sleep disturbances, shortness of breath, anxiety, indigestion'
    ],
    prevalence: 'Coronary artery disease is the most common type of heart disease, affecting approximately 18.2 million adults in the United States, or about 6.7% of the adult population. Globally, it is the leading cause of death, responsible for over 9 million deaths annually. The prevalence increases with age, affecting about 20% of people over 65. Men typically develop CAD about 10 years earlier than women, though after menopause, women\'s risk increases substantially.',
    affectedGroups: [
      'Adults over 45 (men) and over 55 (women)',
      'Individuals with family history of early heart disease',
      'People with high blood pressure, high cholesterol, or diabetes',
      'Smokers',
      'Physically inactive individuals',
      'People with obesity or metabolic syndrome',
      'South Asians (higher genetic risk)',
      'African Americans (higher rates of hypertension increase risk)',
      'Post-menopausal women',
      'People with chronic kidney disease',
      'Individuals with unhealthy diets high in saturated fats, trans fats, and processed foods'
    ],
    references: [
      {
        id: '1',
        text: 'Virani SS, Alonso A, Benjamin EJ, et al. (2020). "Heart Disease and Stroke Statistics-2020 Update: A Report From the American Heart Association". Circulation. 141 (9): e139-e596.',
        url: 'https://doi.org/10.1161/CIR.0000000000000757'
      },
      {
        id: '2',
        text: 'Knuuti J, Wijns W, Saraste A, et al. (2020). "2019 ESC Guidelines for the diagnosis and management of chronic coronary syndromes". European Heart Journal. 41 (3): 407-477.',
        url: 'https://doi.org/10.1093/eurheartj/ehz425'
      },
      {
        id: '3',
        text: 'Arnett DK, Blumenthal RS, Albert MA, et al. (2019). "2019 ACC/AHA Guideline on the Primary Prevention of Cardiovascular Disease". Circulation. 140 (11): e596-e646.',
        url: 'https://doi.org/10.1161/CIR.0000000000000678'
      },
      {
        id: '4',
        text: 'Libby P, Buring JE, Badimon L, et al. (2019). "Atherosclerosis". Nature Reviews Disease Primers. 5 (1): 56.',
        url: 'https://doi.org/10.1038/s41572-019-0106-z'
      },
      {
        id: '5',
        text: 'Timmis A, Townsend N, Gale CP, et al. (2020). "European Society of Cardiology: Cardiovascular Disease Statistics 2019". European Heart Journal. 41 (1): 12-85.',
        url: 'https://doi.org/10.1093/eurheartj/ehz859'
      }
    ]
  }
];



export default conditionsAtoC;
