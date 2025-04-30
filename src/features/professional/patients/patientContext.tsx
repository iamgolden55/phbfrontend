import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Patient,
  Appointment,
  PatientFilter,
  TreatmentPlan,
  Note,
  TestResult,
  generateMockPatients
} from './patientTypes';

interface PatientContextType {
  patients: Patient[];
  filteredPatients: Patient[];
  selectedPatient: Patient | null;
  loading: boolean;
  error: string | null;
  patientFilter: PatientFilter;
  todayAppointments: Appointment[];
  upcomingAppointments: Appointment[];

  // Actions
  selectPatient: (patientId: string | null) => void;
  updatePatient: (patient: Patient) => void;
  addPatient: (patient: Patient) => void;
  setPatientFilter: (filter: PatientFilter) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (appointment: Appointment) => void;
  deleteAppointment: (appointmentId: string, patientId: string) => void;
  addNote: (note: Note) => void;
  addTreatmentPlan: (plan: TreatmentPlan) => void;
  updateTreatmentPlan: (plan: TreatmentPlan) => void;
  addTestResult: (testResult: TestResult) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function usePatients() {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatients must be used within a PatientProvider');
  }
  return context;
}

interface PatientProviderProps {
  children: ReactNode;
}

export function PatientProvider({ children }: PatientProviderProps) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [patientFilter, setPatientFilter] = useState<PatientFilter>({
    status: 'active',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // Initialize with mock data
  useEffect(() => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      const mockPatients = generateMockPatients(20);
      setPatients(mockPatients);
      setLoading(false);
    } catch (err) {
      setError('Failed to load patients');
      setLoading(false);
    }
  }, []);

  // Apply filters whenever the filter criteria or patients change
  useEffect(() => {
    applyFilters();
  }, [patientFilter, patients]);

  const applyFilters = () => {
    let result = [...patients];

    // Apply status filter
    if (patientFilter.status && patientFilter.status !== 'all') {
      result = result.filter(patient => patient.status === patientFilter.status);
    }

    // Apply risk level filter
    if (patientFilter.riskLevel && patientFilter.riskLevel !== 'all') {
      result = result.filter(patient => patient.riskLevel === patientFilter.riskLevel);
    }

    // Apply flagged filter
    if (patientFilter.flagged) {
      result = result.filter(patient => patient.flagged);
    }

    // Apply search term
    if (patientFilter.searchTerm) {
      const searchTerm = patientFilter.searchTerm.toLowerCase();
      result = result.filter(patient =>
        patient.firstName.toLowerCase().includes(searchTerm) ||
        patient.lastName.toLowerCase().includes(searchTerm) ||
        patient.hpn.includes(searchTerm) ||
        (patient.email && patient.email.toLowerCase().includes(searchTerm))
      );
    }

    // Apply sorting
    if (patientFilter.sortBy) {
      result.sort((a, b) => {
        if (patientFilter.sortBy === 'name') {
          const aName = `${a.lastName}, ${a.firstName}`;
          const bName = `${b.lastName}, ${b.firstName}`;
          return patientFilter.sortOrder === 'asc'
            ? aName.localeCompare(bName)
            : bName.localeCompare(aName);
        }
        else if (patientFilter.sortBy === 'lastAppointment') {
          if (!a.lastAppointment) return patientFilter.sortOrder === 'asc' ? 1 : -1;
          if (!b.lastAppointment) return patientFilter.sortOrder === 'asc' ? -1 : 1;
          return patientFilter.sortOrder === 'asc'
            ? a.lastAppointment.localeCompare(b.lastAppointment)
            : b.lastAppointment.localeCompare(a.lastAppointment);
        }
        else if (patientFilter.sortBy === 'nextAppointment') {
          if (!a.nextAppointment) return patientFilter.sortOrder === 'asc' ? 1 : -1;
          if (!b.nextAppointment) return patientFilter.sortOrder === 'asc' ? -1 : 1;
          return patientFilter.sortOrder === 'asc'
            ? a.nextAppointment.localeCompare(b.nextAppointment)
            : b.nextAppointment.localeCompare(a.nextAppointment);
        }
        else if (patientFilter.sortBy === 'riskLevel') {
          const riskLevels = { 'high': 3, 'medium': 2, 'low': 1 };
          const aRisk = a.riskLevel ? riskLevels[a.riskLevel] || 0 : 0;
          const bRisk = b.riskLevel ? riskLevels[b.riskLevel] || 0 : 0;
          return patientFilter.sortOrder === 'asc' ? aRisk - bRisk : bRisk - aRisk;
        }
        return 0;
      });
    }

    setFilteredPatients(result);
  };

  // Calculate today's appointments
  const todayAppointments = patients.reduce<Appointment[]>((appointments, patient) => {
    const today = new Date().toISOString().split('T')[0];
    const todayAppts = patient.appointments.filter(appt =>
      appt.date === today &&
      (appt.status === 'scheduled' || appt.status === 'confirmed')
    );
    return [...appointments, ...todayAppts];
  }, []);

  // Calculate upcoming appointments (next 7 days excluding today)
  const upcomingAppointments = patients.reduce<Appointment[]>((appointments, patient) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const nextWeekStr = nextWeek.toISOString().split('T')[0];

    const upcomingAppts = patient.appointments.filter(appt =>
      appt.date > todayStr &&
      appt.date <= nextWeekStr &&
      (appt.status === 'scheduled' || appt.status === 'confirmed')
    );
    return [...appointments, ...upcomingAppts];
  }, []);

  const selectPatient = (patientId: string | null) => {
    if (!patientId) {
      setSelectedPatient(null);
      return;
    }

    const patient = patients.find(p => p.id === patientId) || null;
    setSelectedPatient(patient);
  };

  const updatePatient = (updatedPatient: Patient) => {
    setPatients(prevPatients =>
      prevPatients.map(patient =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );

    if (selectedPatient && selectedPatient.id === updatedPatient.id) {
      setSelectedPatient(updatedPatient);
    }
  };

  const addPatient = (newPatient: Patient) => {
    setPatients(prevPatients => [...prevPatients, newPatient]);
  };

  const addAppointment = (appointment: Appointment) => {
    setPatients(prevPatients =>
      prevPatients.map(patient => {
        if (patient.id === appointment.patientId) {
          // Update patient's next appointment date if this is in the future
          const today = new Date().toISOString().split('T')[0];
          let nextAppointment = patient.nextAppointment;

          if (appointment.date > today) {
            if (!nextAppointment || appointment.date < nextAppointment) {
              nextAppointment = appointment.date;
            }
          }

          return {
            ...patient,
            appointments: [...patient.appointments, appointment],
            nextAppointment
          };
        }
        return patient;
      })
    );
  };

  const updateAppointment = (updatedAppointment: Appointment) => {
    setPatients(prevPatients =>
      prevPatients.map(patient => {
        if (patient.id === updatedAppointment.patientId) {
          const updatedAppointments = patient.appointments.map(appt =>
            appt.id === updatedAppointment.id ? updatedAppointment : appt
          );

          // Recalculate next appointment if needed
          const today = new Date().toISOString().split('T')[0];
          const futureAppts = updatedAppointments
            .filter(a => a.date > today && (a.status === 'scheduled' || a.status === 'confirmed'))
            .sort((a, b) => a.date.localeCompare(b.date));

          const nextAppointment = futureAppts.length > 0 ? futureAppts[0].date : undefined;

          return {
            ...patient,
            appointments: updatedAppointments,
            nextAppointment
          };
        }
        return patient;
      })
    );
  };

  const deleteAppointment = (appointmentId: string, patientId: string) => {
    setPatients(prevPatients =>
      prevPatients.map(patient => {
        if (patient.id === patientId) {
          const updatedAppointments = patient.appointments.filter(appt => appt.id !== appointmentId);

          // Recalculate next appointment
          const today = new Date().toISOString().split('T')[0];
          const futureAppts = updatedAppointments
            .filter(a => a.date > today && (a.status === 'scheduled' || a.status === 'confirmed'))
            .sort((a, b) => a.date.localeCompare(b.date));

          const nextAppointment = futureAppts.length > 0 ? futureAppts[0].date : undefined;

          return {
            ...patient,
            appointments: updatedAppointments,
            nextAppointment
          };
        }
        return patient;
      })
    );
  };

  const addNote = (note: Note) => {
    setPatients(prevPatients =>
      prevPatients.map(patient => {
        if (patient.id === note.patientId) {
          return {
            ...patient,
            notes: [...patient.notes, note]
          };
        }
        return patient;
      })
    );
  };

  const addTreatmentPlan = (plan: TreatmentPlan) => {
    // In a real app, this would update a treatment plans collection
    // For now, we're just noting that this feature would be implemented
    console.log('Adding treatment plan:', plan);
  };

  const updateTreatmentPlan = (plan: TreatmentPlan) => {
    // In a real app, this would update a treatment plans collection
    // For now, we're just noting that this feature would be implemented
    console.log('Updating treatment plan:', plan);
  };

  const addTestResult = (testResult: TestResult) => {
    setPatients(prevPatients =>
      prevPatients.map(patient => {
        if (patient.id === testResult.patientId) {
          return {
            ...patient,
            testResults: [...patient.testResults, testResult]
          };
        }
        return patient;
      })
    );
  };

  const value = {
    patients,
    filteredPatients,
    selectedPatient,
    loading,
    error,
    patientFilter,
    todayAppointments,
    upcomingAppointments,
    selectPatient,
    updatePatient,
    addPatient,
    setPatientFilter,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    addNote,
    addTreatmentPlan,
    updateTreatmentPlan,
    addTestResult,
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
}
