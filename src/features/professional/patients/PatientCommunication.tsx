import React, { useState } from 'react';
import { Patient } from './patientTypes';
import { usePatients } from './patientContext';

interface PatientCommunicationProps {
  patient: Patient;
  onComplete?: () => void;
}

interface CommunicationTemplate {
  id: string;
  title: string;
  subject: string;
  content: string;
  type: 'email' | 'text' | 'letter';
}

const communicationTemplates: CommunicationTemplate[] = [
  {
    id: 'appt-reminder',
    title: 'Appointment Reminder',
    subject: 'Your upcoming appointment at PHB',
    content: 'Dear [Patient Name],\n\nThis is a friendly reminder about your upcoming appointment with [Doctor Name] on [Appointment Date] at [Appointment Time].\n\nPlease arrive 10 minutes before your scheduled time. If you need to reschedule, please call us at least 24 hours in advance.\n\nBest regards,\nPHB Medical Centre',
    type: 'email'
  },
  {
    id: 'test-results',
    title: 'Test Results Available',
    subject: 'Your test results are ready',
    content: 'Dear [Patient Name],\n\nYour recent test results are now available. Please log in to your PHB account to view them or schedule an appointment to discuss them with your healthcare provider.\n\nBest regards,\nPHB Medical Centre',
    type: 'email'
  },
  {
    id: 'prescription-renewal',
    title: 'Prescription Renewal',
    subject: 'Prescription renewal reminder',
    content: 'Dear [Patient Name],\n\nThis is to inform you that your prescription for [Medication Name] will expire soon. Please contact your healthcare provider to arrange for a renewal.\n\nBest regards,\nPHB Medical Centre',
    type: 'email'
  },
  {
    id: 'follow-up',
    title: 'Follow-up Care',
    subject: 'Follow-up care information',
    content: 'Dear [Patient Name],\n\nAs part of your ongoing care plan, we recommend scheduling a follow-up appointment in the next [Time Period]. Please contact our office to arrange this appointment at your earliest convenience.\n\nBest regards,\nPHB Medical Centre',
    type: 'email'
  },
  {
    id: 'general-notification',
    title: 'General Notification',
    subject: 'Important information from PHB',
    content: 'Dear [Patient Name],\n\n[Custom Message]\n\nBest regards,\nPHB Medical Centre',
    type: 'email'
  }
];

const PatientCommunication: React.FC<PatientCommunicationProps> = ({ patient, onComplete }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [communicationType, setCommunicationType] = useState<'email' | 'text' | 'letter'>('email');
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  // Load template content when template is selected
  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateId = e.target.value;
    setSelectedTemplate(templateId);

    if (templateId) {
      const template = communicationTemplates.find(t => t.id === templateId);
      if (template) {
        setCommunicationType(template.type);
        setSubject(template.subject);

        // Replace placeholders with actual patient info
        let processedContent = template.content;
        processedContent = processedContent.replace(/\[Patient Name\]/g, `${patient.firstName} ${patient.lastName}`);
        processedContent = processedContent.replace(/\[Doctor Name\]/g, 'Dr. Sarah Johnson'); // Replace with actual doctor name

        // Handle appointment placeholders if there's an upcoming appointment
        if (patient.nextAppointment) {
          const upcomingAppointment = patient.appointments.find(a =>
            a.date === patient.nextAppointment &&
            (a.status === 'scheduled' || a.status === 'confirmed'));

          if (upcomingAppointment) {
            const appointmentDate = new Date(upcomingAppointment.date);
            const formattedDate = appointmentDate.toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });

            processedContent = processedContent.replace(/\[Appointment Date\]/g, formattedDate);
            processedContent = processedContent.replace(/\[Appointment Time\]/g, upcomingAppointment.time);
          }
        }

        // For medication reminders, use the first active medication if available
        const activeMedication = patient.medications.find(m => m.isActive);
        if (activeMedication) {
          processedContent = processedContent.replace(/\[Medication Name\]/g, activeMedication.name);
        }

        setMessage(processedContent);
      }
    }
  };

  // Send the communication
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject || !message) {
      // Show validation error
      return;
    }

    setSending(true);

    try {
      // In a real app, this would call an API to send the communication
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      setSent(true);
    } catch (error) {
      // Handle error
      console.error('Failed to send communication:', error);
    } finally {
      setSending(false);
    }
  };

  // Get the preferred contact method label
  const getPreferredContactMethod = () => {
    const method = patient.preferredContactMethod || 'email';
    return method.charAt(0).toUpperCase() + method.slice(1);
  };

  // Reset the form after sending
  const handleReset = () => {
    setSelectedTemplate('');
    setCommunicationType('email');
    setSubject('');
    setMessage('');
    setSent(false);
  };

  if (sent) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <div className="mb-4 text-green-600">
          <span className="material-icons text-5xl">check_circle</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">Communication Sent</h2>
        <p className="text-gray-600 mb-6">
          Your {communicationType} to {patient.firstName} {patient.lastName} has been sent successfully.
        </p>
        <div className="flex justify-center space-x-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Send Another
          </button>
          {onComplete && (
            <button
              onClick={onComplete}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Patient Communication
      </h2>

      <div className="mb-6">
        <div className="bg-blue-50 p-4 rounded-md flex items-start mb-4">
          <span className="material-icons text-blue-600 mr-3 mt-0.5">info</span>
          <div>
            <p className="text-sm text-blue-800">
              <span className="font-medium">Patient Contact Info:</span> {patient.preferredContactMethod ? `Prefers ${getPreferredContactMethod()}` : 'No preferred contact method'}
            </p>
            <p className="text-sm text-blue-800 mt-1">
              Email: {patient.email || 'Not provided'} | Phone: {patient.phone || 'Not provided'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSend}>
        <div className="mb-4">
          <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">
            Communication Template
          </label>
          <select
            id="template"
            value={selectedTemplate}
            onChange={handleTemplateChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a template</option>
            {communicationTemplates.map(template => (
              <option key={template.id} value={template.id}>
                {template.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="communication-type" className="block text-sm font-medium text-gray-700 mb-1">
            Communication Type
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="communication-type"
                value="email"
                checked={communicationType === 'email'}
                onChange={() => setCommunicationType('email')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-gray-700">Email</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="communication-type"
                value="text"
                checked={communicationType === 'text'}
                onChange={() => setCommunicationType('text')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-gray-700">Text Message</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="communication-type"
                value="letter"
                checked={communicationType === 'letter'}
                onChange={() => setCommunicationType('letter')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-gray-700">Letter</span>
            </label>
          </div>
        </div>

        {communicationType === 'email' && (
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email subject"
              required
            />
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={8}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your message"
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          {onComplete && (
            <button
              type="button"
              onClick={onComplete}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={sending}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
          >
            {sending ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Sending...
              </>
            ) : (
              <>
                <span className="material-icons text-sm mr-1">send</span>
                Send {communicationType === 'email' ? 'Email' : communicationType === 'text' ? 'Text' : 'Letter'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientCommunication;
