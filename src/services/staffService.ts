export interface Department {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface StaffMember {
  id: number;
  email: string;
  full_name: string;
  role: string;
  role_display: string;
  department_name: string | null;
  is_available: boolean;
  availability_status: {
    is_available: boolean;
    consultation_hours_start: string | null;
    consultation_hours_end: string | null;
    next_available_slot: string | null;
  };
  phone: string | null;
  last_login: string;
  date_joined: string;
}

export interface VisitTask {
  id: string;
  description: string;
  isCompleted: boolean;
  isEssential: boolean;
  type: 'task' | 'medication';
  time?: string;
  dosage?: string;
}

export interface Visit {
  id: string;
  staffId: number | null; // Null if unassigned
  staffName?: string;
  patientId: string;
  patientName: string;
  date: string; // ISO Date string YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  status: 'scheduled' | 'completed' | 'missed' | 'in-progress' | 'not-started';
  tasks: VisitTask[];
  type: string; // e.g., "Morning Routine", "Lunch Call"
  carePlanFor?: string; // e.g., "General Care"
  clientPreferences?: string;
}

interface StaffResponse {
  status: string;
  total_staff: number;
  staff_members: StaffMember[];
}

interface AvailabilityResponse {
  status: string;
  message: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/';

interface CreateStaffRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: 'doctor' | 'nurse' | 'staff';
  department: number;
  date_of_birth?: string;
  gender?: string;
  preferred_language?: string;
  secondary_languages?: string[];
  custom_language?: string;
}

interface CreateStaffResponse {
  status: string;
  message: string;
  staff_member: StaffMember;
}

export const StaffService = {
  async fetchStaffMembers(): Promise<StaffResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/staff/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies with request
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Staff data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching staff:', error);
      throw error;
    }
  },

  async updateAvailability(isAvailable: boolean): Promise<AvailabilityResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/staff/availability/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies with request
        body: JSON.stringify({
          is_available: isAvailable
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating availability:', error);
      throw error;
    }
  },

  async createStaffMember(staffData: CreateStaffRequest): Promise<CreateStaffResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/staff/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies with request
        body: JSON.stringify(staffData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create staff member');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating staff member:', error);
      throw error;
    }
  },

  async getHospitalDepartments(hospitalId: number, category?: 'administrative' | 'clinical' | 'support' | 'clinical_and_support' | 'all'): Promise<Department[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/hospitals/departments/?hospital_id=${hospitalId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Send cookies with request
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let departments = data.departments || [];

      // Filter by category if specified
      if (category && category !== 'all') {
        const categoryMap = {
          administrative: ['admin', 'records', 'it', 'human_resources', 'finance', 'operations'],
          clinical: ['medical', 'surgical', 'emergency', 'critical_care', 'outpatient'],
          support: ['laboratory', 'radiology', 'pharmacy', 'physiotherapy'],
          clinical_and_support: ['medical', 'surgical', 'emergency', 'critical_care', 'outpatient', 'laboratory', 'radiology', 'pharmacy', 'physiotherapy'],
        };

        const allowedTypes = categoryMap[category] || [];
        departments = departments.filter((dept: any) =>
          allowedTypes.includes(dept.department_type)
        );
      }

      return departments;
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  },

  // Mock Visit Methods for Roster UI
  async getVisits(startDate: string, endDate: string): Promise<Visit[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return mock data
    return [
      {
        id: '1',
        staffId: 1, // Assumes a staff with ID 1 exists
        staffName: 'Aaron Aaronson',
        patientId: 'p1',
        patientName: 'Annie Smith',
        date: new Date().toISOString().split('T')[0], // Today
        startTime: '06:00',
        endTime: '11:00',
        status: 'not-started',
        type: 'Morning Routine',
        carePlanFor: 'General Daily Care',
        clientPreferences: 'Prefer female carer',
        tasks: [
          { id: 't1', description: 'Assist to have a shower', isCompleted: false, isEssential: true, type: 'task' },
          { id: 't2', description: 'Prompt to wash/bathe', isCompleted: false, isEssential: true, type: 'task' },
          { id: 'm1', description: 'Enalapril 10mg tablets', isCompleted: false, isEssential: false, type: 'medication', dosage: '10mg' },
          { id: 'm2', description: 'Lithium carbonate 250mg tablets', isCompleted: false, isEssential: false, type: 'medication', dosage: '250mg' },
        ]
      },
      {
        id: '2',
        staffId: null, // Unassigned
        patientId: 'p1',
        patientName: 'Annie Smith',
        date: new Date().toISOString().split('T')[0],
        startTime: '12:00',
        endTime: '13:00',
        status: 'scheduled',
        type: 'Lunch Visit',
        tasks: [
          { id: 't3', description: 'Prepare Lunch', isCompleted: false, isEssential: true, type: 'task' }
        ]
      },
      {
        id: '3',
        staffId: 1,
        staffName: 'Aaron Aaronson',
        patientId: 'p2',
        patientName: 'John Doe',
        date: new Date().toISOString().split('T')[0],
        startTime: '14:00',
        endTime: '15:00',
        status: 'completed',
        type: 'Afternoon Check',
        tasks: [
          { id: 't4', description: 'Check blood pressure', isCompleted: true, isEssential: true, type: 'task' }
        ]
      }
    ];
  },

  async createVisit(visit: Omit<Visit, 'id'>): Promise<Visit> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      ...visit,
      id: Math.random().toString(36).substr(2, 9),
    };
  }
};
