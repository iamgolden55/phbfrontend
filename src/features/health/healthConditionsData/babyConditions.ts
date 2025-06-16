import { HealthCondition } from '../healthConditionsData';

/**
 * Baby health conditions that are commonly referenced
 */
export const babyConditions: HealthCondition[] = [
  {
    id: 'colic',
    name: 'Colic',
    description: 'Excessive, frequent crying in a baby who appears to be healthy. Colic typically begins around 2-3 weeks of age and often resolves by 3-4 months. While distressing for parents, colic is generally harmless and does not indicate any serious underlying condition.',
    category: 'childrens-health',
    symptoms: [
      'Crying for more than 3 hours a day, more than 3 days a week',
      'Crying that seems to happen for no reason',
      'Crying that occurs at the same time each day, often in the evening',
      'Intense, high-pitched crying that is different from normal crying',
      'Baby clenches fists, arches back, or pulls legs up to chest while crying',
      'Baby\'s face may become red or flushed during crying episodes',
      'Crying is difficult to soothe',
      'Baby may pass gas or have bowel movements during crying episodes'
    ],
    causes: [
      'Exact cause is unknown',
      'Immature digestive system',
      'Overstimulation or sensitivity to environment',
      'Trapped gas or air bubbles',
      'Immature nervous system',
      'Feeding issues (overfeeding, underfeeding, or food sensitivity)',
      'Reflux or other digestive issues',
      'Normal developmental phase'
    ],
    treatments: [
      'Gentle motion: rocking, walking, or swaying with baby',
      'White noise or soft music',
      'Swaddling to provide comfort and security',
      'Offering a pacifier',
      'Bicycle legs gently to help release trapped gas',
      'Warm bath for relaxation',
      'Changing position: holding baby upright or on their side',
      'Skin-to-skin contact',
      'Taking breaks and asking for help when needed',
      'Probiotics (consult healthcare provider first)',
      'If breastfeeding: mother may try eliminating dairy or caffeine'
    ],
    preventions: [
      'No proven prevention methods',
      'Creating a calm environment',
      'Following regular feeding and sleeping routines',
      'Avoiding overstimulation',
      'Burping baby thoroughly after feeds',
      'Monitoring for signs of reflux or feeding difficulties'
    ],
    relatedConditions: [
      'reflux',
      'feeding-difficulties',
      'sleep-disorders',
      'crying-baby'
    ],
    commonQuestions: [
      {
        question: 'How long does colic last?',
        answer: 'Colic typically begins around 2-3 weeks of age and usually resolves by 3-4 months of age. Most babies outgrow colic by the time they are 3-4 months old. The crying episodes tend to peak around 6 weeks of age and then gradually decrease. While it can be very stressful for parents, remember that colic is temporary and does not cause any long-term problems for the baby.'
      },
      {
        question: 'When should I call the doctor about my baby\'s crying?',
        answer: 'You should contact your healthcare provider if your baby has a high fever, seems ill or lethargic, has changes in eating or sleeping patterns, vomits repeatedly, has diarrhea or constipation, cries differently than usual, or if you are concerned about the crying. Also call if you feel overwhelmed and need support - parental stress is important to address too.'
      }
    ],
    emergencySigns: [
      'High fever (over 100.4°F or 38°C in babies under 3 months)',
      'Difficulty breathing',
      'Vomiting repeatedly',
      'Signs of dehydration',
      'Baby seems unusually lethargic or unresponsive',
      'Crying that sounds different from normal colic crying'
    ],
    prevalence: 'Colic affects about 20-25% of all babies, regardless of gender, birth order, or whether they are breastfed or bottle-fed.',
    affectedGroups: [
      'Babies aged 2 weeks to 4 months',
      'Both breastfed and formula-fed babies',
      'First-born and later-born children equally',
      'All ethnic and socioeconomic groups'
    ]
  },
  {
    id: 'cradle-cap',
    name: 'Cradle Cap',
    description: 'Yellow, crusty patches on a baby\'s scalp. Cradle cap is a common, harmless condition that affects many newborns and infants. Despite its appearance, it doesn\'t usually bother the baby and typically clears up on its own within a few months.',
    category: 'childrens-health',
    symptoms: [
      'Yellow or brown scaly, crusty patches on the scalp',
      'Greasy or oily-looking scales',
      'Flaky or crusty skin that may peel off',
      'Scales may be thick and difficult to remove',
      'May occur on other areas: eyebrows, behind ears, or in skin folds',
      'Usually not itchy or painful for the baby',
      'Mild redness under the scales'
    ],
    causes: [
      'Overactive sebaceous (oil) glands',
      'Hormones passed from mother to baby',
      'Natural oils and dead skin cells',
      'Not caused by poor hygiene or allergies',
      'Not contagious',
      'Normal part of infant development'
    ],
    treatments: [
      'Gently massage baby oil or mineral oil into the scalp',
      'Leave oil on for a few hours or overnight, then gently brush with soft brush',
      'Wash hair with mild baby shampoo',
      'Use a soft-bristled brush or fine-toothed comb to gently remove loose scales',
      'For persistent cases: anti-fungal shampoo (only as recommended by doctor)',
      'Do not pick or scratch at the scales',
      'Be patient - it often resolves on its own'
    ],
    preventions: [
      'Regular gentle washing of baby\'s hair and scalp',
      'Using mild, baby-specific shampoos',
      'Gently brushing baby\'s hair daily',
      'Avoiding harsh scrubbing of the scalp'
    ],
    relatedConditions: [
      'seborrheic-dermatitis',
      'eczema',
      'baby-acne'
    ],
    commonQuestions: [
      {
        question: 'Is cradle cap harmful to my baby?',
        answer: 'No, cradle cap is completely harmless and doesn\'t usually bother the baby. It\'s not painful or itchy, and it\'s not a sign of poor hygiene or any underlying health problem. Most cases resolve on their own within a few months without any treatment.'
      },
      {
        question: 'Can I prevent cradle cap?',
        answer: 'Cradle cap cannot be completely prevented as it\'s a normal part of infant development caused by natural oil production and hormones. However, regular gentle washing and brushing of your baby\'s hair and scalp may help minimize the buildup of scales.'
      }
    ],
    emergencySigns: [
      'Signs of infection (increased redness, warmth, pus, or fever)',
      'Spreading to other parts of the body with severe symptoms',
      'Baby seems uncomfortable or distressed',
      'Scales become very thick or difficult to manage'
    ],
    prevalence: 'Cradle cap is very common, affecting up to 70% of babies in their first 3 months of life.',
    affectedGroups: [
      'Newborns and infants up to 12 months',
      'Most common in first 3 months of life',
      'Both breastfed and bottle-fed babies',
      'All ethnic groups'
    ]
  },
  {
    id: 'nappy-rash',
    name: 'Nappy Rash (Diaper Rash)',
    description: 'Red, painful rash in the nappy (diaper) area. Nappy rash is very common in babies and toddlers, usually caused by prolonged contact with wet or soiled nappies. While uncomfortable, it\'s generally easy to treat and prevent with proper care.',
    category: 'childrens-health',
    symptoms: [
      'Red, inflamed skin in the nappy area',
      'Skin that feels warm to the touch',
      'Spots, pimples, or blisters in the nappy area',
      'Baby crying during nappy changes',
      'Skin that looks sore or tender',
      'Peeling or flaking skin',
      'In severe cases: open sores or bleeding'
    ],
    causes: [
      'Prolonged contact with wet or dirty nappies',
      'Friction from tight-fitting nappies',
      'Chemical irritation from soaps, detergents, or nappy products',
      'Bacterial or fungal infections',
      'Introduction of new foods (changes in stool acidity)',
      'Antibiotics (can disrupt normal skin bacteria)',
      'Sensitive skin or allergies',
      'Infrequent nappy changes'
    ],
    treatments: [
      'Change nappies frequently and promptly when wet or soiled',
      'Clean gently with warm water and pat dry',
      'Apply thick layer of zinc oxide barrier cream',
      'Allow skin to air dry before putting on fresh nappy',
      'Use fragrance-free, gentle cleansing products',
      'Avoid tight-fitting nappies',
      'For fungal infections: antifungal cream (as recommended by healthcare provider)',
      'Give nappy-free time each day to air-dry the skin'
    ],
    preventions: [
      'Change nappies frequently',
      'Clean and dry the nappy area thoroughly',
      'Apply barrier cream at each nappy change',
      'Use properly fitting nappies (not too tight)',
      'Choose gentle, fragrance-free products',
      'Allow air-drying time',
      'Wash hands before and after nappy changes'
    ],
    relatedConditions: [
      'thrush',
      'eczema',
      'bacterial-skin-infections',
      'allergic-contact-dermatitis'
    ],
    commonQuestions: [
      {
        question: 'How long does nappy rash take to heal?',
        answer: 'With proper treatment, mild nappy rash usually improves within 2-3 days and clears completely within a week. More severe cases may take longer. If the rash doesn\'t improve after 3-4 days of treatment, or if it gets worse, contact your healthcare provider as it may need prescription treatment.'
      },
      {
        question: 'When should I see a doctor about nappy rash?',
        answer: 'See a healthcare provider if the rash doesn\'t improve after several days of treatment, gets worse, has blisters or pus, is accompanied by fever, spreads beyond the nappy area, or if your baby seems unwell. Also consult a doctor if you suspect a bacterial or fungal infection.'
      }
    ],
    emergencySigns: [
      'Fever accompanying the rash',
      'Pus or yellow fluid from the rash',
      'Red streaks extending from the rash',
      'Blisters or open sores',
      'Baby seems generally unwell',
      'Rash spreads rapidly or covers large areas'
    ],
    prevalence: 'Nappy rash affects almost all babies at some point, with about 7-35% of babies having nappy rash at any given time.',
    affectedGroups: [
      'Babies and toddlers who wear nappies',
      'Most common between 9-12 months of age',
      'Babies with sensitive skin',
      'Babies taking antibiotics',
      'Babies with frequent bowel movements'
    ]
  },
  {
    id: 'reflux',
    name: 'Baby Reflux',
    description: 'When a baby brings up milk during or shortly after feeding. Reflux is very common in babies and usually improves as the digestive system matures. Most babies with reflux are otherwise healthy and continue to grow normally.',
    category: 'childrens-health',
    symptoms: [
      'Bringing up milk during or shortly after feeding',
      'Coughing or hiccupping when feeding',
      'Being unsettled during feeding',
      'Swallowing or gulping after burping or feeding',
      'Crying and not settling',
      'Not gaining weight or losing weight',
      'Arching back during or after feeding',
      'Frequent vomiting (in more severe cases)',
      'Refusing to feed'
    ],
    causes: [
      'Immature lower esophageal sphincter (muscle between esophagus and stomach)',
      'Liquid diet that flows more easily than solid food',
      'Spending a lot of time lying flat',
      'Short esophagus relative to body size',
      'Small stomach capacity',
      'Normal developmental phase that improves with time'
    ],
    treatments: [
      'Keep baby upright during feeding and for 20-30 minutes after',
      'Feed smaller amounts more frequently',
      'Burp baby regularly during and after feeding',
      'If bottle feeding: check teat size (slow-flow teats may help)',
      'Avoid overfeeding',
      'Keep baby\'s head elevated during sleep (only as advised by healthcare provider)',
      'For severe cases: thickened feeds or anti-reflux medication (prescribed by doctor)',
      'If breastfeeding: continue as normal unless advised otherwise'
    ],
    preventions: [
      'Feed baby in upright position',
      'Keep baby upright after feeding',
      'Avoid bouncing or vigorous play after feeding',
      'Burp baby frequently during feeds',
      'Avoid overfeeding',
      'If bottle feeding: ensure correct teat size'
    ],
    relatedConditions: [
      'gastroesophageal-reflux-disease',
      'colic',
      'feeding-difficulties',
      'failure-to-thrive'
    ],
    commonQuestions: [
      {
        question: 'When does baby reflux usually improve?',
        answer: 'Most babies with reflux improve significantly by 12 months of age as their digestive system matures. Many babies show improvement by 6 months when they start sitting up more and begin eating solid foods. The lower esophageal sphincter strengthens over time, reducing the likelihood of milk coming back up.'
      },
      {
        question: 'Is reflux the same as vomiting?',
        answer: 'Reflux (also called spitting up or possetting) is usually effortless bringing up of small amounts of milk, while vomiting involves forceful expulsion of larger amounts. Reflux is normal and common in babies, whereas frequent vomiting may indicate a more serious condition and should be evaluated by a healthcare provider.'
      }
    ],
    emergencySigns: [
      'Projectile vomiting',
      'Blood in vomit or stool',
      'Green or yellow vomit',
      'Signs of dehydration',
      'Fever',
      'Poor weight gain or weight loss',
      'Difficulty breathing',
      'Excessive crying or signs of pain'
    ],
    prevalence: 'Reflux affects more than half of all babies, with peak occurrence around 4 months of age.',
    affectedGroups: [
      'Babies under 12 months',
      'Premature babies (higher risk)',
      'Babies with neurological conditions',
      'Most common in first 4 months of life'
    ]
  },
  {
    id: 'jaundice',
    name: 'Baby Jaundice',
    description: 'Yellowing of a baby\'s skin and the whites of their eyes. Jaundice is very common in newborn babies and usually appears within the first few days of life. While it can look concerning, mild jaundice is usually harmless and clears up on its own.',
    category: 'childrens-health',
    symptoms: [
      'Yellow tinge to skin, starting from the head and spreading downward',
      'Yellowing of the whites of the eyes',
      'Dark, concentrated urine (though this can be hard to tell in nappies)',
      'Pale-colored stools',
      'In severe cases: extreme sleepiness or difficulty waking',
      'In severe cases: poor feeding or irritability'
    ],
    causes: [
      'Normal breakdown of red blood cells producing bilirubin',
      'Immature liver that cannot process bilirubin quickly enough',
      'Breastfeeding jaundice (insufficient breast milk intake)',
      'Breast milk jaundice (substances in breast milk affecting bilirubin processing)',
      'Blood group incompatibility between mother and baby',
      'Premature birth',
      'Infection',
      'Enzyme deficiencies',
      'Internal bleeding'
    ],
    treatments: [
      'Most cases resolve without treatment',
      'Frequent feeding to help eliminate bilirubin through stools',
      'Phototherapy (light treatment) for higher bilirubin levels',
      'Ensuring adequate hydration and nutrition',
      'In severe cases: exchange transfusion (very rare)',
      'Treating any underlying conditions',
      'Regular monitoring of bilirubin levels'
    ],
    preventions: [
      'Feeding baby frequently in the first days of life',
      'Ensuring baby is getting enough breast milk or formula',
      'Prompt medical attention if jaundice appears in first 24 hours',
      'Regular pediatric check-ups in the first week of life'
    ],
    relatedConditions: [
      'kernicterus',
      'hemolytic-disease',
      'liver-problems',
      'infection',
      'metabolic-disorders'
    ],
    commonQuestions: [
      {
        question: 'When does newborn jaundice usually appear and disappear?',
        answer: 'Physiological jaundice typically appears 2-3 days after birth and usually clears up within 2 weeks for full-term babies, or up to 3 weeks for premature babies. However, if jaundice appears within the first 24 hours of life, this could indicate a more serious condition and requires immediate medical attention.'
      },
      {
        question: 'Can breastfeeding cause jaundice?',
        answer: 'Yes, there are two types of breastfeeding-related jaundice. Breastfeeding jaundice occurs in the first week when babies aren\'t getting enough breast milk. Breast milk jaundice can occur later and may last several weeks but is generally harmless. Neither type usually requires stopping breastfeeding, but more frequent nursing is often recommended.'
      }
    ],
    emergencySigns: [
      'Jaundice appearing in the first 24 hours of life',
      'Jaundice spreading to arms, legs, or palms/soles',
      'High-pitched crying',
      'Extreme sleepiness or difficulty waking baby',
      'Poor feeding or sucking',
      'Fever',
      'Dark yellow or orange skin color',
      'Baby seems very unwell'
    ],
    prevalence: 'About 60% of full-term babies and 80% of premature babies develop jaundice in their first week of life.',
    affectedGroups: [
      'Newborn babies, especially in the first week of life',
      'Premature babies (higher risk)',
      'Babies with blood group incompatibility',
      'Breastfed babies (slightly higher risk)',
      'Babies of East Asian or Mediterranean descent'
    ]
  },
  {
    id: 'thrush',
    name: 'Baby Thrush',
    description: 'White patches in a baby\'s mouth or a persistent nappy rash that won\'t clear up. Thrush is caused by a yeast infection and is common in babies. It can affect the mouth (oral thrush) or the nappy area.',
    category: 'childrens-health',
    symptoms: [
      'White patches on tongue, inside cheeks, or roof of mouth that don\'t wipe off easily',
      'Difficulty feeding or refusing to feed',
      'Crying during feeding',
      'White patches that may bleed slightly if rubbed',
      'Cracked skin at corners of mouth',
      'For nappy thrush: bright red rash with raised borders and satellite spots',
      'Nappy rash that doesn\'t improve with usual treatment',
      'In breastfeeding mothers: sore, cracked, or unusually pink nipples'
    ],
    causes: [
      'Overgrowth of Candida albicans yeast',
      'Immature immune system',
      'Antibiotic use (baby or breastfeeding mother)',
      'Dummy or bottle teat not properly sterilized',
      'Thrush can pass between baby and breastfeeding mother',
      'Warm, moist environment in mouth or nappy area'
    ],
    treatments: [
      'Antifungal drops or gel for oral thrush (prescribed by healthcare provider)',
      'Antifungal cream for nappy area thrush',
      'Sterilize dummies, bottle teats, and toys that go in baby\'s mouth',
      'If breastfeeding: treat both baby and mother simultaneously',
      'Continue treatment for recommended duration even after symptoms improve',
      'Probiotics may help (consult healthcare provider first)'
    ],
    preventions: [
      'Sterilize feeding equipment and dummies regularly',
      'Wash hands before feeding or handling baby',
      'If breastfeeding: keep nipples clean and dry',
      'Change nappies frequently',
      'Avoid unnecessary antibiotic use',
      'If using bottles: prepare fresh formula for each feed'
    ],
    relatedConditions: [
      'candida-infection',
      'nappy-rash',
      'breastfeeding-problems',
      'oral-infections'
    ],
    commonQuestions: [
      {
        question: 'How can I tell if the white patches in my baby\'s mouth are thrush or just milk?',
        answer: 'Milk residue can be easily wiped away with a clean cloth, while thrush patches are more firmly attached and may bleed slightly if you try to wipe them off. Thrush patches also tend to be on the inside of the cheeks, gums, and tongue, not just after feeding. If you\'re unsure, consult your healthcare provider.'
      },
      {
        question: 'Can I continue breastfeeding if my baby has thrush?',
        answer: 'Yes, you can and should continue breastfeeding. However, both you and your baby may need treatment to prevent passing the infection back and forth. Your healthcare provider can prescribe appropriate antifungal treatments for both of you.'
      }
    ],
    emergencySigns: [
      'Baby refusing to feed for several feeds',
      'Signs of dehydration',
      'Fever',
      'Baby seems very unwell',
      'Thrush spreads or doesn\'t improve with treatment',
      'Difficulty breathing or swallowing'
    ],
    prevalence: 'Oral thrush affects about 5-7% of newborns and up to 20% of babies under 1 month old.',
    affectedGroups: [
      'Newborns and young babies (under 6 months)',
      'Premature babies',
      'Babies who have taken antibiotics',
      'Babies whose mothers have vaginal thrush',
      'Breastfed babies (can pass between mother and baby)'
    ]
  }
];

export default babyConditions;