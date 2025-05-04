import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/';
const AUTH_TOKEN_KEY = 'phb_auth_token';

export interface AppointmentType {
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

export function useAppointments(view: 'upcoming' | 'past' | 'all' = 'upcoming') {
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const authToken = localStorage.getItem(AUTH_TOKEN_KEY);
        if (!authToken) throw new Error('No authentication token found');
        let queryParams = '';
        if (view === 'upcoming') queryParams = '?upcoming=true';
        else if (view === 'past') queryParams = '?past=true';
        // 'all' returns all appointments
        const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/api/appointments/${queryParams}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Accept': 'application/json',
          }
        });
        if (!response.ok) throw new Error(`Failed to fetch appointments: ${response.status}`);
        const data = await response.json();
        const formattedAppointments = Array.isArray(data) ? data.map((apt: any) => ({
          id: apt.id || apt.appointment_id || '',
          date: apt.date || (apt.appointment_date ? apt.appointment_date.split('T')[0] : ''),
          time: apt.time || (apt.appointment_date ? new Date(apt.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''),
          duration: apt.duration || '30 min',
          type: apt.appointment_type?.includes('video') ? 'video' : 
                apt.appointment_type?.includes('phone') ? 'phone' : 'in-person',
          provider: apt.doctor_full_name || apt.doctor_name || 'Doctor',
          speciality: apt.department_name || apt.specialty || 'General',
          location: apt.location || apt.hospital_name || 'PHB Medical Center',
          status: apt.status || 'scheduled',
          reason: apt.chief_complaint || apt.reason || '',
        })) : [];
        setAppointments(formattedAppointments);
      } catch (err: any) {
        setError(err.message || 'Failed to load appointments. Please try again later.');
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, [view]);

  return { appointments, loading, error };
} 