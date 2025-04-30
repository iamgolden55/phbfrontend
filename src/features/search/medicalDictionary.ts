export interface MedicalTermDefinition {
  term: string;
  definition: string;
  category: 'condition' | 'symptom' | 'procedure' | 'medication' | 'anatomy' | 'general';
  relatedTerms?: string[];
}

/**
 * Dictionary of medical terms and their definitions
 * Used for tooltip definitions when hovering over medical terms
 */
export const medicalDictionary: Record<string, MedicalTermDefinition> = {
  // Conditions
  "hypertension": {
    term: "Hypertension",
    definition: "High blood pressure, a common condition in which the long-term force of the blood against your artery walls is high enough that it may eventually cause health problems.",
    category: "condition",
    relatedTerms: ["blood pressure", "cardiovascular disease", "heart disease"]
  },
  "diabetes": {
    term: "Diabetes",
    definition: "A group of diseases that result in too much sugar in the blood (high blood glucose). Type 1 diabetes is when your body does not produce insulin. Type 2 diabetes is when your body does not respond to insulin properly.",
    category: "condition",
    relatedTerms: ["insulin", "glucose", "blood sugar"]
  },
  "migraine": {
    term: "Migraine",
    definition: "A neurological condition that can cause multiple symptoms including throbbing headaches, often on one side of the head. Typically accompanied by nausea, vomiting, and extreme sensitivity to light and sound.",
    category: "condition",
    relatedTerms: ["headache", "aura", "photophobia"]
  },
  "depression": {
    term: "Depression",
    definition: "A mental health disorder characterized by persistently depressed mood or loss of interest in activities, causing significant impairment in daily life.",
    category: "condition",
    relatedTerms: ["mental health", "mood disorder", "sadness"]
  },
  "anxiety": {
    term: "Anxiety",
    definition: "A feeling of worry, nervousness, or unease, typically about an imminent event or something with an uncertain outcome. Anxiety disorders are conditions where anxiety doesn't go away and can get worse over time.",
    category: "condition",
    relatedTerms: ["stress", "worry", "panic attack"]
  },
  "asthma": {
    term: "Asthma",
    definition: "A condition in which your airways narrow, swell and produce extra mucus, making it difficult to breathe and triggering coughing, wheezing and shortness of breath.",
    category: "condition",
    relatedTerms: ["respiratory", "wheezing", "breathing difficulties"]
  },
  "insomnia": {
    term: "Insomnia",
    definition: "A sleep disorder that can make it hard to fall asleep, hard to stay asleep, or cause you to wake up too early and not be able to get back to sleep.",
    category: "condition",
    relatedTerms: ["sleep disorder", "sleeplessness", "sleep problems"]
  },

  // Symptoms
  "headache": {
    term: "Headache",
    definition: "Pain in any region of the head. Headaches may occur on one or both sides of the head, be isolated to a certain location, radiate across the head from one point, or have a viselike quality.",
    category: "symptom",
    relatedTerms: ["pain", "migraine", "tension"]
  },
  "fatigue": {
    term: "Fatigue",
    definition: "Extreme tiredness resulting from mental or physical exertion or illness. It's a common symptom of many medical conditions that range in severity from mild to serious.",
    category: "symptom",
    relatedTerms: ["tiredness", "exhaustion", "lethargy"]
  },
  "nausea": {
    term: "Nausea",
    definition: "An unpleasant sensation in the stomach usually accompanied by the urge to vomit. Nausea can be a symptom of many conditions, including motion sickness, early pregnancy, medication use, and infections.",
    category: "symptom",
    relatedTerms: ["vomiting", "queasiness", "upset stomach"]
  },
  "dizziness": {
    term: "Dizziness",
    definition: "A term used to describe a range of sensations, such as feeling faint, woozy, weak or unsteady. Dizziness can be a symptom of many different conditions and may also be a side effect of certain medications.",
    category: "symptom",
    relatedTerms: ["vertigo", "lightheadedness", "balance problems"]
  },
  "shortness of breath": {
    term: "Shortness of Breath",
    definition: "Difficult or labored breathing, also called dyspnea. It can be a symptom of various conditions, some of which may require immediate medical attention.",
    category: "symptom",
    relatedTerms: ["dyspnea", "breathlessness", "respiratory distress"]
  },
  "chest pain": {
    term: "Chest Pain",
    definition: "Pain or discomfort in the chest, which can be caused by heart, lung, gastrointestinal, or musculoskeletal issues. It's important to seek immediate medical attention for unexplained chest pain.",
    category: "symptom",
    relatedTerms: ["angina", "heart attack", "pressure"]
  },

  // Procedures
  "mri": {
    term: "MRI (Magnetic Resonance Imaging)",
    definition: "A medical imaging technique that uses a magnetic field and computer-generated radio waves to create detailed images of the organs and tissues in your body.",
    category: "procedure",
    relatedTerms: ["imaging", "scan", "diagnostic"]
  },
  "ct scan": {
    term: "CT Scan (Computed Tomography)",
    definition: "A diagnostic imaging procedure that uses a combination of X-rays and computer technology to create detailed images of internal organs, bones, soft tissue and blood vessels.",
    category: "procedure",
    relatedTerms: ["imaging", "x-ray", "diagnostic"]
  },
  "vaccination": {
    term: "Vaccination",
    definition: "The administration of a vaccine to help the immune system develop protection from a disease. Vaccines contain a microorganism or virus in a weakened, live or killed state, or proteins or toxins from the organism.",
    category: "procedure",
    relatedTerms: ["immunization", "vaccine", "immunity"]
  },

  // Medications
  "antibiotic": {
    term: "Antibiotic",
    definition: "A type of antimicrobial drug used in the treatment and prevention of bacterial infections. They may either kill or inhibit the growth of bacteria.",
    category: "medication",
    relatedTerms: ["antibacterial", "penicillin", "amoxicillin"]
  },
  "analgesic": {
    term: "Analgesic",
    definition: "A medication used to relieve pain. Common types include paracetamol (acetaminophen), non-steroidal anti-inflammatory drugs (NSAIDs) like ibuprofen, and opioids such as morphine.",
    category: "medication",
    relatedTerms: ["pain reliever", "painkiller", "NSAID"]
  },
  "antidepressant": {
    term: "Antidepressant",
    definition: "A medication used to treat depression, anxiety disorders, chronic pain conditions, and some addictions. Types include selective serotonin reuptake inhibitors (SSRIs), tricyclic antidepressants, and monoamine oxidase inhibitors.",
    category: "medication",
    relatedTerms: ["SSRI", "depression treatment", "mood stabilizer"]
  },

  // Anatomy
  "cardiovascular": {
    term: "Cardiovascular",
    definition: "Relating to the heart and blood vessels, which make up the circulatory system that transports blood, oxygen, and nutrients throughout the body.",
    category: "anatomy",
    relatedTerms: ["heart", "blood vessels", "circulatory system"]
  },
  "respiratory": {
    term: "Respiratory",
    definition: "Relating to the structures and processes involved in breathing, including the lungs, airways, and respiratory muscles.",
    category: "anatomy",
    relatedTerms: ["lungs", "breathing", "pulmonary"]
  },
  "gastrointestinal": {
    term: "Gastrointestinal",
    definition: "Relating to the stomach and intestines, or digestive system, which is responsible for digesting food, absorbing nutrients, and eliminating waste.",
    category: "anatomy",
    relatedTerms: ["digestive", "stomach", "intestines"]
  },

  // General medical terms
  "chronic": {
    term: "Chronic",
    definition: "Persisting for a long time or constantly recurring. In medicine, chronic conditions are those lasting 3 months or more.",
    category: "general",
    relatedTerms: ["persistent", "long-term", "recurring"]
  },
  "acute": {
    term: "Acute",
    definition: "Having a sudden onset, sharp rise, and short course. In medicine, acute conditions are severe and sudden in onset.",
    category: "general",
    relatedTerms: ["sudden", "severe", "short-term"]
  },
  "remission": {
    term: "Remission",
    definition: "A temporary or permanent decrease or cessation of symptoms of a disease or condition. It can be partial or complete.",
    category: "general",
    relatedTerms: ["recovery", "improvement", "symptom reduction"]
  },
  "prognosis": {
    term: "Prognosis",
    definition: "A forecast of the likely course of a disease or ailment. A medical prognosis may include the expected duration, outcome, and description of the course of a disease.",
    category: "general",
    relatedTerms: ["outlook", "prediction", "expected outcome"]
  }
};

/**
 * Get a medical term definition
 * @param term The term to look up
 * @returns The term definition or null if not found
 */
export const getMedicalTermDefinition = (term: string): MedicalTermDefinition | null => {
  const normalizedTerm = term.toLowerCase().trim();
  return medicalDictionary[normalizedTerm] || null;
};

/**
 * Get all medical terms that might appear in a text
 * This is useful for highlighting terms in a body of text
 * @returns Array of all medical terms
 */
export const getAllMedicalTerms = (): string[] => {
  return Object.keys(medicalDictionary);
};

/**
 * Find medical terms in a text
 * @param text The text to search
 * @returns Array of found terms
 */
export const findMedicalTermsInText = (text: string): string[] => {
  const allTerms = getAllMedicalTerms();
  const normalizedText = text.toLowerCase();

  return allTerms.filter(term => normalizedText.includes(term));
};
