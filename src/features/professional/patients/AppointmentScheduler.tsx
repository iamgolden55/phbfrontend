import React, { useState } from 'react';
import { Appointment, Patient } from './patientTypes';
import { usePatients } from './patientContext';

interface AppointmentSchedulerProps {
  patientId: string;
  onComplete: () => void;
  existingAppointment?: Appointment;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  patientId,
  onComplete,
  existingAppointment
}) => {
  const { addAppointment, updateAppointment, selectedPatient } = usePatients();
  const isEditing = !!existingAppointment;

  const [formData, setFormData] = useState<Partial<Appointment>>({
    id: existingAppointment?.id || `appt-${Date.now()}`,
    patientId: patientId,
    professionalId: 'PROF1', // Would come from auth context in real app
    professionalName: 'Dr. Sarah Johnson', // Would come from auth context in real app
    appointmentType: existingAppointment?.appointmentType || 'check-up',
    date: existingAppointment?.date || new Date().toISOString().split('T')[0],
    time: existingAppointment?.time || '09:00',
    duration: existingAppointment?.duration || 30,
    status: existingAppointment?.status || 'scheduled',
    location: existingAppointment?.location || 'Main Surgery',
    reason: existingAppointment?.reason || '',
    notes: existingAppointment?.notes || '',
    followUpRequired: existingAppointment?.followUpRequired || false,
    followUpDetails: existingAppointment?.followUpDetails || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date || !formData.time || !formData.appointmentType) {
      // Show validation error
      return;
    }

    const appointment = formData as Appointment;

    if (isEditing) {
      updateAppointment(appointment);
    } else {
      addAppointment(appointment);
    }

    onComplete();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        {isEditing ? 'Edit Appointment' : 'Schedule New Appointment'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Type
            </label>
            <select
              id="appointmentType"
              name="appointmentType"
              value={formData.appointmentType}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="check-up">Check-up</option>
              <option value="follow-up">Follow-up</option>
              <option value="consultation">Consultation</option>
              <option value="procedure">Procedure</option>
              <option value="vaccination">Vaccination</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Main Surgery">Main Surgery</option>
              <option value="North Branch">North Branch</option>
              <option value="South Branch">South Branch</option>
              <option value="Virtual Consultation">Virtual Consultation</option>
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              id="time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes)
            </label>
            <select
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No-show</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Reason
          </label>
          <input
            id="reason"
            type="text"
            name="reason"
            value={formData.reason || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Brief reason for the appointment"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes || ''}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Additional notes about the appointment"
          />
        </div>

        <div className="mb-4">
          <div className="flex items-center">
            <input
              id="followUpRequired"
              type="checkbox"
              name="followUpRequired"
              checked={formData.followUpRequired || false}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="followUpRequired" className="ml-2 block text-sm text-gray-700">
              Follow-up Required
            </label>
          </div>

          {formData.followUpRequired && (
            <div className="mt-2">
              <label htmlFor="followUpDetails" className="block text-sm font-medium text-gray-700 mb-1">
                Follow-up Details
              </label>
              <textarea
                id="followUpDetails"
                name="followUpDetails"
                value={formData.followUpDetails || ''}
                onChange={handleChange}
                rows={2}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Details for the follow-up appointment"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onComplete}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Update' : 'Schedule'} Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentScheduler;
