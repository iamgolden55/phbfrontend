// Patient data types for professional patient management

export interface Patient {
  id: string;
  hpn: string;
  title?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  email?: string;
  phone?: string;
  address?: Address;
  registeredGP: string;
  registeredPractice: string;
  emergencyContact?: EmergencyContact;
  medicalConditions: MedicalCondition[];
  medications: Medication[];
  allergies: Allergy[];
  appointments: Appointment[];
  notes: Note[];
  testResults: TestResult[];
  status: 'active' | 'inactive' | 'temporary';
  lastAppointment?: string; // ISO date string
  nextAppointment?: string; // ISO date string
  riskLevel?: 'low' | 'medium' | 'high';
  preferredContactMethod?: 'email' | 'phone' | 'post' | 'text';
  flagged?: boolean;
  flagReason?: string;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  county?: string;
  postcode: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface MedicalCondition {
  id: string;
  name: string;
  diagnosedDate: string; // ISO date string
  status: 'active' | 'resolved' | 'monitoring';
  notes?: string;
  treatingDoctor?: string;
  severity?: 'mild' | 'moderate' | 'severe';
  managementPlan?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string
  prescribedBy: string;
  reason: string;
  notes?: string;
  isActive: boolean;
  refillInformation?: string;
}

export interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: 'mild' | 'moderate' | 'severe';
  diagnosedDate: string; // ISO date string
  notes?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  professionalId: string;
  professionalName: string;
  appointmentType: 'check-up' | 'follow-up' | 'vaccination' | 'procedure' | 'consultation' | 'other';
  date: string; // ISO date string
  time: string; // HH:MM format
  duration: number; // in minutes
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  location?: string;
  reason?: string;
  outcome?: string;
  followUpRequired?: boolean;
  followUpDetails?: string;
}

export interface Note {
  id: string;
  patientId: string;
  professionalId: string;
  professionalName: string;
  date: string; // ISO date string
  content: string;
  category: 'general' | 'observation' | 'treatment' | 'discussion' | 'private';
  isPrivate: boolean;
}

export interface TestResult {
  id: string;
  patientId: string;
  testName: string;
  testDate: string; // ISO date string
  resultDate: string; // ISO date string
  resultSummary: string;
  resultDetails: string;
  orderedBy: string;
  status: 'pending' | 'completed' | 'inconclusive';
  abnormal: boolean;
  criticalFlag?: boolean;
  attachmentUrl?: string;
  followUpRequired?: boolean;
  followUpDetails?: string;
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  condition: string;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string
  goals: TreatmentGoal[];
  medications: Medication[];
  instructions: string;
  professionalId: string;
  professionalName: string;
  status: 'active' | 'completed' | 'discontinued';
  progressNotes: ProgressNote[];
}

export interface TreatmentGoal {
  id: string;
  description: string;
  targetDate?: string; // ISO date string
  status: 'pending' | 'in-progress' | 'achieved' | 'discontinued';
  notes?: string;
}

export interface ProgressNote {
  id: string;
  date: string; // ISO date string
  content: string;
  professionalId: string;
  professionalName: string;
}

// Search and filter types
export interface PatientFilter {
  searchTerm?: string;
  status?: 'active' | 'inactive' | 'temporary' | 'all';
  riskLevel?: 'low' | 'medium' | 'high' | 'all';
  flagged?: boolean;
  appointmentStatus?: 'scheduled' | 'completed' | 'all';
  sortBy?: 'name' | 'lastAppointment' | 'nextAppointment' | 'riskLevel';
  sortOrder?: 'asc' | 'desc';
}

// Mock patient data generator
export const generateMockPatients = (count = 10): Patient[] => {
  const patients: Patient[] = [];

  for (let i = 0; i < count; i++) {
    const id = `P${1000 + i}`;
    const gender = i % 3 === 0 ? 'male' : i % 3 === 1 ? 'female' : 'other';
    const firstName = gender === 'male'
      ? ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Thomas', 'Charles', 'Daniel'][i % 10]
      : ['Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'][i % 10];

    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Wilson', 'Martinez'];
    const lastName = lastNames[i % 10];

    // Generate a random birth date for an adult
    const today = new Date();
    const birthYear = today.getFullYear() - Math.floor(Math.random() * 60) - 20; // Between 20 and 80 years old
    const birthMonth = Math.floor(Math.random() * 12) + 1;
    const birthDay = Math.floor(Math.random() * 28) + 1; // Avoid month boundary issues
    const dob = `${birthYear}-${String(birthMonth).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}`;

    // Random appointment dates
    const pastAppointment = new Date(today);
    pastAppointment.setMonth(today.getMonth() - Math.floor(Math.random() * 6));
    const pastDateStr = pastAppointment.toISOString().split('T')[0];

    const futureAppointment = new Date(today);
    const hasUpcoming = Math.random() > 0.3; // 70% have upcoming appointments
    if (hasUpcoming) {
      futureAppointment.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1);
    }
    const futureDateStr = hasUpcoming ? futureAppointment.toISOString().split('T')[0] : undefined;

    // Generate random medical conditions
    const conditions = [
      'Hypertension', 'Type 2 Diabetes', 'Asthma', 'COPD', 'Arthritis',
      'Heart Disease', 'Depression', 'Anxiety', 'Hypothyroidism', 'Osteoporosis'
    ];
    const patientConditions: MedicalCondition[] = [];
    const conditionCount = Math.floor(Math.random() * 4); // 0-3 conditions

    for (let c = 0; c < conditionCount; c++) {
      const conditionName = conditions[Math.floor(Math.random() * conditions.length)];
      const diagnosisDate = new Date(today);
      diagnosisDate.setFullYear(today.getFullYear() - Math.floor(Math.random() * 10) - 1);

      patientConditions.push({
        id: `C${i}${c}`,
        name: conditionName,
        diagnosedDate: diagnosisDate.toISOString().split('T')[0],
        status: Math.random() > 0.7 ? 'active' : (Math.random() > 0.5 ? 'monitoring' : 'resolved'),
        severity: Math.random() > 0.7 ? 'mild' : (Math.random() > 0.5 ? 'moderate' : 'severe'),
      });
    }

    // Generate appointments
    const appointmentTypes = ['check-up', 'follow-up', 'consultation', 'procedure', 'vaccination', 'other'];
    const appointmentLocations = ['Main Surgery', 'North Branch', 'South Branch', 'Virtual Consultation'];
    const professionals = [
      'Dr. Sarah Johnson', 'Dr. Michael Chen', 'Dr. Rebecca Torres',
      'Dr. James Wilson', 'Dr. Emily Rodriguez', 'Dr. David Patel'
    ];

    const appointments: Appointment[] = [];
    const appointmentCount = Math.floor(Math.random() * 4) + 1; // 1-4 appointments

    // Past appointments
    for (let a = 0; a < appointmentCount; a++) {
      const appointmentDate = new Date(today);
      appointmentDate.setMonth(today.getMonth() - a - 1);

      appointments.push({
        id: `A${i}${a}`,
        patientId: id,
        professionalId: `PROF${a % 6 + 1}`,
        professionalName: professionals[a % 6],
        appointmentType: appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)] as any,
        date: appointmentDate.toISOString().split('T')[0],
        time: `${Math.floor(Math.random() * 8) + 9}:${Math.random() > 0.5 ? '00' : '30'}`,
        duration: 15 * (Math.floor(Math.random() * 4) + 1),
        status: 'completed',
        location: appointmentLocations[Math.floor(Math.random() * appointmentLocations.length)],
        reason: patientConditions.length > 0
          ? `Follow-up for ${patientConditions[0].name}`
          : 'Routine check-up',
      });
    }

    // Future appointment if applicable
    if (hasUpcoming) {
      appointments.push({
        id: `A${i}future`,
        patientId: id,
        professionalId: `PROF${Math.floor(Math.random() * 6) + 1}`,
        professionalName: professionals[Math.floor(Math.random() * 6)],
        appointmentType: appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)] as any,
        date: futureDateStr!,
        time: `${Math.floor(Math.random() * 8) + 9}:${Math.random() > 0.5 ? '00' : '30'}`,
        duration: 15 * (Math.floor(Math.random() * 4) + 1),
        status: Math.random() > 0.7 ? 'confirmed' : 'scheduled',
        location: appointmentLocations[Math.floor(Math.random() * appointmentLocations.length)],
        reason: patientConditions.length > 0
          ? `Follow-up for ${patientConditions[0].name}`
          : 'Routine check-up',
      });
    }

    // Generate medications if they have conditions
    const medications: Medication[] = [];
    if (patientConditions.length > 0) {
      const medicationMap: Record<string, string[]> = {
        'Hypertension': ['Lisinopril 10mg', 'Amlodipine 5mg', 'Losartan 50mg'],
        'Type 2 Diabetes': ['Metformin 500mg', 'Glipizide 5mg', 'Januvia 100mg'],
        'Asthma': ['Albuterol inhaler', 'Fluticasone inhaler', 'Montelukast 10mg'],
        'COPD': ['Spiriva 18mcg', 'Symbicort inhaler', 'Albuterol inhaler'],
        'Arthritis': ['Ibuprofen 600mg', 'Naproxen 500mg', 'Meloxicam 15mg'],
        'Heart Disease': ['Aspirin 81mg', 'Atorvastatin 20mg', 'Metoprolol 25mg'],
        'Depression': ['Sertraline 50mg', 'Fluoxetine 20mg', 'Venlafaxine 75mg'],
        'Anxiety': ['Alprazolam 0.5mg', 'Buspirone 10mg', 'Escitalopram 10mg'],
        'Hypothyroidism': ['Levothyroxine 50mcg', 'Levothyroxine 75mcg', 'Levothyroxine 100mcg'],
        'Osteoporosis': ['Alendronate 70mg', 'Calcium + Vitamin D', 'Risedronate 35mg']
      };

      patientConditions.forEach((condition, index) => {
        if (medicationMap[condition.name] && Math.random() > 0.3) { // 70% chance of medication
          const med = medicationMap[condition.name][Math.floor(Math.random() * medicationMap[condition.name].length)];
          const startDate = new Date(condition.diagnosedDate);
          startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));

          medications.push({
            id: `M${i}${index}`,
            name: med,
            dosage: med.split(' ')[1] || '1 tablet',
            frequency: ['Once daily', 'Twice daily', 'Three times daily', 'As needed'][Math.floor(Math.random() * 4)],
            startDate: startDate.toISOString().split('T')[0],
            prescribedBy: professionals[Math.floor(Math.random() * professionals.length)],
            reason: condition.name,
            isActive: condition.status === 'active',
          });
        }
      });
    }

    // Create the patient
    patients.push({
      id,
      hpn: `${9000000000 + i}`,
      firstName,
      lastName,
      dateOfBirth: dob,
      gender: gender as any,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      phone: `07${Math.floor(Math.random() * 100000000) + 900000000}`,
      registeredGP: professionals[Math.floor(Math.random() * professionals.length)],
      registeredPractice: 'Central Medical Group',
      medicalConditions: patientConditions,
      medications,
      allergies: Math.random() > 0.8 ? [{ // 20% chance of allergy
        id: `AL${i}`,
        allergen: ['Penicillin', 'Peanuts', 'Shellfish', 'Latex', 'Aspirin'][Math.floor(Math.random() * 5)],
        reaction: ['Rash', 'Hives', 'Swelling', 'Anaphylaxis', 'Difficulty breathing'][Math.floor(Math.random() * 5)],
        severity: Math.random() > 0.6 ? 'severe' : (Math.random() > 0.5 ? 'moderate' : 'mild'),
        diagnosedDate: dob
      }] : [],
      appointments,
      notes: [],
      testResults: [],
      status: Math.random() > 0.9 ? 'inactive' : 'active',
      lastAppointment: pastDateStr,
      nextAppointment: futureDateStr,
      riskLevel: patientConditions.some(c => c.severity === 'severe')
        ? 'high'
        : (patientConditions.some(c => c.severity === 'moderate') ? 'medium' : 'low'),
      flagged: Math.random() > 0.9,
      flagReason: Math.random() > 0.9 ? 'Missed multiple appointments' : undefined,
    });
  }

  return patients;
};
