import { useState, useEffect } from 'react';
import { useAuth } from '../auth/authContext';
import { fetchAppointments } from '../professional/appointmentsService';

// Define the appointment types
export interface Appointment {
  id: string;
  date: string;
  time: string;
  duration: string;
  type: 'in-person' | 'phone' | 'video';
  provider: string;
  speciality: string;
  location: string;
  status: 'scheduled' | 'cancelled' | 'completed' | 'missed' | 'rescheduled';
  reason?: string;
}

// Define the view type
type AppointmentViewType = 'upcoming' | 'past' | 'all';

// API base URL from environment or fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.phb.health';

export const useAppointments = (viewType: AppointmentViewType = 'upcoming') => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const getAppointments = async () => {
      setLoading(true);
      setError(null);

      try {
        // Check if user is a doctor but viewing as a patient
        const isDoctor = user?.role === 'doctor' || user?.hpn;
        const viewPreference = localStorage.getItem('phb_view_preference');
        const viewingAsDoctor = viewPreference === 'doctor';

        // If doctor is using patient view, ensure we only get their patient appointments
        const viewAsDoctor = false; // Always false because we're in patient view
        
        // Use the shared appointment service that respects view preference
        const data = await fetchAppointments(viewAsDoctor);
        
        // Transform API data to our internal format if needed
        const formattedAppointments: Appointment[] = data.map((item: any) => ({
          id: item.appointment_id || item.id,
          date: item.appointment_date || item.date,
          time: item.formatted_time || item.time,
          duration: item.duration ? `${item.duration} min` : '30 min',
          type: item.appointment_type?.toLowerCase() || item.type || 'in-person',
          provider: item.doctor_full_name || item.provider,
          speciality: item.department_name || item.speciality || 'General Practice',
          location: item.hospital_name || item.location,
          status: item.status || 'scheduled',
          reason: item.chief_complaint || item.reason,
        }));

        setAppointments(formattedAppointments);
      } catch (err: any) {
        console.error('Error fetching appointments:', err);
        setError(err.message || 'Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, [viewType, user]);

  // Utility function to create a sortable datetime from appointment
  const getAppointmentDateTime = (appointment: Appointment): Date => {
    try {
      // Handle different date formats that might come from the API
      let dateTime: Date;
      
      if (appointment.date.includes('T')) {
        // ISO format date
        dateTime = new Date(appointment.date);
      } else {
        // Date and time are separate, combine them
        const datePart = appointment.date;
        const timePart = appointment.time || '00:00';
        
        // Handle different time formats
        let timeFormatted = timePart;
        if (timePart.includes('AM') || timePart.includes('PM')) {
          // 12-hour format, convert to 24-hour for proper Date parsing
          timeFormatted = timePart;
        } else if (timePart.length === 5 && timePart.includes(':')) {
          // Already in 24-hour format like "09:00"
          timeFormatted = timePart;
        }
        
        dateTime = new Date(`${datePart} ${timeFormatted}`);
      }
      
      // If date is invalid, use a far future date to put it at the end
      return isNaN(dateTime.getTime()) ? new Date('2099-12-31') : dateTime;
    } catch (error) {
      console.warn('Error parsing appointment date/time:', appointment, error);
      return new Date('2099-12-31');
    }
  };

  // Filter and sort appointments based on the view type
  const filteredAndSortedAppointments = appointments
    .filter(appointment => {
      const appointmentDate = getAppointmentDateTime(appointment);
      const now = new Date();

      if (viewType === 'upcoming') {
        return appointmentDate >= now && appointment.status !== 'cancelled';
      } else if (viewType === 'past') {
        return appointmentDate < now || appointment.status === 'completed';
      } else {
        return true; // 'all' view
      }
    })
    .sort((a, b) => {
      const dateA = getAppointmentDateTime(a);
      const dateB = getAppointmentDateTime(b);
      
      if (viewType === 'upcoming') {
        // For upcoming appointments: earliest first
        return dateA.getTime() - dateB.getTime();
      } else if (viewType === 'past') {
        // For past appointments: most recent first
        return dateB.getTime() - dateA.getTime();
      } else {
        // For 'all' view: upcoming first (chronological), then past (reverse chronological)
        const now = new Date();
        const aIsUpcoming = dateA >= now && a.status !== 'cancelled';
        const bIsUpcoming = dateB >= now && b.status !== 'cancelled';
        
        if (aIsUpcoming && !bIsUpcoming) return -1; // a comes first
        if (!aIsUpcoming && bIsUpcoming) return 1;  // b comes first
        
        if (aIsUpcoming && bIsUpcoming) {
          // Both upcoming: earliest first
          return dateA.getTime() - dateB.getTime();
        } else {
          // Both past: most recent first
          return dateB.getTime() - dateA.getTime();
        }
      }
    });

  return {
    appointments: filteredAndSortedAppointments,
    loading,
    error,
  };
}; 