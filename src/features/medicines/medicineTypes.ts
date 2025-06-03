export interface MedicineReference {
  id: string;
  text: string;
  url?: string;
}

export interface MedicineMoreInfoLink {
  label: string;
  url: string;
}

export interface Medicine {
  id: string;
  name: string;
  description: string;
  category: string;
  indications: string[];
  dosage: string;
  sideEffects: string[];
  warnings: string[];
  pregnancy?: string;
  breastfeeding?: string;
  relatedMedicines?: string[];
  commonQuestions?: {question: string; answer: string}[];
  wikipediaUrl?: string;
  references?: MedicineReference[];
  moreInfoLinks?: MedicineMoreInfoLink[];
}

export type MedicinesByLetter = Record<string, Medicine[]>;
