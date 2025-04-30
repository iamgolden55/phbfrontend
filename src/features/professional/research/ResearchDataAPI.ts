// Types for research data
export interface PatientDataPoint {
  id: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bmi: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  cholesterolTotal: number;
  cholesterolHDL: number;
  cholesterolLDL: number;
  triglycerides: number;
  glucoseFasting: number;
  smoker: boolean;
  diabetic: boolean;
  hasCVD: boolean;
  hasHypertension: boolean;
  region: string;
  ethnicity: string;
}

export interface PopulationData {
  region: string;
  ageGroups: {
    category: string;
    male: number;
    female: number;
    other: number;
  }[];
  diseasePrevalence: {
    disease: string;
    prevalence: number;
  }[];
  riskFactors: {
    factor: string;
    percentage: number;
  }[];
}

// Mock patient data for research
const generateMockPatientData = (count: number): PatientDataPoint[] => {
  const regions = ['North', 'South', 'East', 'West', 'Central'];
  const ethnicities = ['White', 'Black', 'Asian', 'Hispanic', 'Other'];

  return Array.from({ length: count }, (_, i) => {
    const age = Math.floor(Math.random() * 70) + 18; // 18-88
    const isMale = Math.random() > 0.5;
    const bmi = +(Math.random() * 20 + 18).toFixed(1); // 18-38

    // Higher values for older patients
    const ageFactor = age / 100;
    const systolic = Math.floor(Math.random() * 40 + 100 + (ageFactor * 20)); // 100-160
    const diastolic = Math.floor(Math.random() * 30 + 60 + (ageFactor * 15)); // 60-105

    // Higher risk with higher BMI
    const bmiFactor = bmi > 25 ? (bmi - 25) / 10 : 0;
    const total = Math.floor(Math.random() * 100 + 150 + (bmiFactor * 50)); // 150-300
    const hdl = Math.floor(Math.random() * 30 + 30 + (isMale ? 0 : 10)); // 30-70
    const ldl = Math.floor(Math.random() * 70 + 70 + (bmiFactor * 30)); // 70-170
    const trig = Math.floor(Math.random() * 100 + 100 + (bmiFactor * 50)); // 100-250

    const glucose = Math.floor(Math.random() * 50 + 70 + (bmiFactor * 30)); // 70-150

    // Risk factors
    const isSmoker = Math.random() < 0.25;
    const isDiabetic = Math.random() < 0.15 + (bmiFactor * 0.2);
    const hasCVD = Math.random() < 0.1 + (ageFactor * 0.2) + (bmiFactor * 0.1);
    const hasHypertension = Math.random() < 0.2 + (ageFactor * 0.3) + (bmiFactor * 0.1);

    const region = regions[Math.floor(Math.random() * regions.length)];
    const ethnicity = ethnicities[Math.floor(Math.random() * ethnicities.length)];

    return {
      id: `PT${(i + 1000).toString().padStart(6, '0')}`,
      age,
      gender: isMale ? 'male' : (Math.random() > 0.95 ? 'other' : 'female'),
      bmi,
      bloodPressureSystolic: systolic,
      bloodPressureDiastolic: diastolic,
      cholesterolTotal: total,
      cholesterolHDL: hdl,
      cholesterolLDL: ldl,
      triglycerides: trig,
      glucoseFasting: glucose,
      smoker: isSmoker,
      diabetic: isDiabetic,
      hasCVD,
      hasHypertension,
      region,
      ethnicity,
    };
  });
};

// Mock population data for research
const generateMockPopulationData = (): PopulationData[] => {
  const regions = ['North', 'South', 'East', 'West', 'Central'];

  return regions.map(region => {
    const ageGroups = [
      {
        category: '18-30',
        male: Math.floor(Math.random() * 1000) + 3000,
        female: Math.floor(Math.random() * 1000) + 3000,
        other: Math.floor(Math.random() * 20) + 50
      },
      {
        category: '31-45',
        male: Math.floor(Math.random() * 1000) + 4000,
        female: Math.floor(Math.random() * 1000) + 4000,
        other: Math.floor(Math.random() * 20) + 40
      },
      {
        category: '46-60',
        male: Math.floor(Math.random() * 1000) + 3500,
        female: Math.floor(Math.random() * 1000) + 3500,
        other: Math.floor(Math.random() * 20) + 30
      },
      {
        category: '61-75',
        male: Math.floor(Math.random() * 1000) + 2500,
        female: Math.floor(Math.random() * 1000) + 2800,
        other: Math.floor(Math.random() * 20) + 20
      },
      {
        category: '76+',
        male: Math.floor(Math.random() * 1000) + 1500,
        female: Math.floor(Math.random() * 1000) + 1800,
        other: Math.floor(Math.random() * 20) + 10
      }
    ];

    const diseasePrevalence = [
      { disease: 'Hypertension', prevalence: +(Math.random() * 15 + 20).toFixed(1) },
      { disease: 'Diabetes', prevalence: +(Math.random() * 8 + 8).toFixed(1) },
      { disease: 'Cardiovascular Disease', prevalence: +(Math.random() * 5 + 7).toFixed(1) },
      { disease: 'COPD', prevalence: +(Math.random() * 3 + 5).toFixed(1) },
      { disease: 'Asthma', prevalence: +(Math.random() * 4 + 7).toFixed(1) },
      { disease: 'Depression', prevalence: +(Math.random() * 5 + 10).toFixed(1) },
      { disease: 'Obesity', prevalence: +(Math.random() * 10 + 25).toFixed(1) },
    ];

    const riskFactors = [
      { factor: 'Smoking', percentage: +(Math.random() * 10 + 15).toFixed(1) },
      { factor: 'Physical Inactivity', percentage: +(Math.random() * 15 + 25).toFixed(1) },
      { factor: 'Poor Diet', percentage: +(Math.random() * 15 + 30).toFixed(1) },
      { factor: 'Excessive Alcohol', percentage: +(Math.random() * 10 + 10).toFixed(1) },
      { factor: 'High Stress', percentage: +(Math.random() * 15 + 35).toFixed(1) },
    ];

    return {
      region,
      ageGroups,
      diseasePrevalence,
      riskFactors
    };
  });
};

// API mock functions with delays to simulate network requests
export const ResearchDataAPI = {
  // Get individual patient data for research
  getPatientData: async (): Promise<PatientDataPoint[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return generateMockPatientData(500);
  },

  // Get filtered patient data
  getFilteredPatientData: async (
    filters: {
      ageMin?: number;
      ageMax?: number;
      gender?: string;
      region?: string;
      riskFactors?: string[];
    }
  ): Promise<PatientDataPoint[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const allData = generateMockPatientData(500);

    // Apply filters
    return allData.filter(patient => {
      if (filters.ageMin !== undefined && patient.age < filters.ageMin) return false;
      if (filters.ageMax !== undefined && patient.age > filters.ageMax) return false;
      if (filters.gender && patient.gender !== filters.gender) return false;
      if (filters.region && patient.region !== filters.region) return false;

      if (filters.riskFactors?.length) {
        const hasRequiredFactors = filters.riskFactors.every(factor => {
          switch (factor) {
            case 'smoking': return patient.smoker;
            case 'diabetes': return patient.diabetic;
            case 'hypertension': return patient.hasHypertension;
            case 'cvd': return patient.hasCVD;
            case 'high_bmi': return patient.bmi >= 30;
            default: return true;
          }
        });
        if (!hasRequiredFactors) return false;
      }

      return true;
    });
  },

  // Get population health data for research
  getPopulationData: async (): Promise<PopulationData[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return generateMockPopulationData();
  },

  // Get specific regional health data
  getRegionalData: async (region: string): Promise<PopulationData | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const allData = generateMockPopulationData();
    return allData.find(data => data.region === region) || null;
  }
};

export default ResearchDataAPI;
