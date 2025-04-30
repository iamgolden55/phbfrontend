import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountHealthLayout from '../../layouts/AccountHealthLayout';

interface AppointmentFormData {
  appointmentType: string;
  specialtyNeeded: string;
  preferredLanguage: string;
  urgency: string;
  preferredDate: string;
  preferredTimeSlot: string;
  symptoms: string;
  additionalNotes: string;
}

// These would come from the backend API in a real implementation
const SPECIALTIES = [
  'General Practice',
  'Cardiology',
  'Dermatology',
  'Gastroenterology',
  'Neurology',
  'Obstetrics & Gynecology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry',
  'Urology'
];

const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Mandarin',
  'Arabic',
  'Hindi',
  'Portuguese',
  'Russian',
  'Japanese'
];

const APPOINTMENT_TYPES = [
  'Consultation',
  'Follow-up',
  'Test Results Review',
  'Vaccination',
  'Screening',
  'Prescription Renewal',
  'Mental Health',
  'Physical Examination'
];

const BookAppointment: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AppointmentFormData>({
    appointmentType: '',
    specialtyNeeded: '',
    preferredLanguage: 'English', // Default value
    urgency: 'routine',
    preferredDate: '',
    preferredTimeSlot: '',
    symptoms: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [suggestedTimeSlots, setSuggestedTimeSlots] = useState<string[]>([]);

  // In a real app, this would be dynamically generated based on doctor availability
  const mockAvailableTimeSlots = [
    '09:00 - 09:30',
    '09:45 - 10:15',
    '10:30 - 11:00',
    '11:15 - 11:45',
    '13:30 - 14:00',
    '14:15 - 14:45',
    '15:00 - 15:30'
  ];

  // When form data changes, we might want to generate time slots or make API calls
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Generate suggested time slots when preferred date changes
    if (name === 'preferredDate') {
      // In a real app, this would make an API call to get available slots for this date
      setSuggestedTimeSlots(mockAvailableTimeSlots);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      // In a real app, this would be an API call
      console.log('Appointment request submitted:', formData);

      // Simulate an API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate a successful booking
      navigate('/account/appointments/confirmation', {
        state: {
          appointmentDetails: {
            ...formData,
            appointmentId: 'APP-' + Math.floor(100000 + Math.random() * 900000),
            doctorName: 'Dr. Sarah Johnson',
            doctorSpecialty: formData.specialtyNeeded,
            location: 'PHB Virtual Care',
            dateConfirmed: formData.preferredDate,
            timeConfirmed: formData.preferredTimeSlot
          }
        }
      });
    } catch (error) {
      setSubmissionError('There was a problem submitting your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!formData.appointmentType && !!formData.specialtyNeeded;
      case 2:
        return !!formData.preferredLanguage && !!formData.urgency;
      case 3:
        return !!formData.preferredDate && !!formData.preferredTimeSlot;
      case 4:
        return true; // Final review step
      default:
        return false;
    }
  };

  return (
    <AccountHealthLayout title="Book an Appointment">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>

        <div className="mb-8">
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 flex rounded bg-gray-200">
              <div
                className="bg-[#005eb8] transition-all ease-out duration-500"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between">
              <div className={`text-xs font-medium ${currentStep >= 1 ? 'text-[#005eb8]' : 'text-gray-500'}`}>
                Basic Info
              </div>
              <div className={`text-xs font-medium ${currentStep >= 2 ? 'text-[#005eb8]' : 'text-gray-500'}`}>
                Preferences
              </div>
              <div className={`text-xs font-medium ${currentStep >= 3 ? 'text-[#005eb8]' : 'text-gray-500'}`}>
                Schedule
              </div>
              <div className={`text-xs font-medium ${currentStep >= 4 ? 'text-[#005eb8]' : 'text-gray-500'}`}>
                Confirm
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900">Appointment Details</h3>
              <p className="text-gray-600 mb-4">
                Tell us what type of appointment you need and which medical specialty.
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="appointmentType" className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Type *
                  </label>
                  <select
                    id="appointmentType"
                    name="appointmentType"
                    value={formData.appointmentType}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select appointment type</option>
                    {APPOINTMENT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="specialtyNeeded" className="block text-sm font-medium text-gray-700 mb-1">
                    Medical Specialty Needed *
                  </label>
                  <select
                    id="specialtyNeeded"
                    name="specialtyNeeded"
                    value={formData.specialtyNeeded}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select specialty</option>
                    {SPECIALTIES.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={goToNextStep}
                    disabled={!validateCurrentStep()}
                    className={`w-full py-3 px-4 rounded-md text-white font-medium
                      ${validateCurrentStep()
                        ? 'bg-[#005eb8] hover:bg-[#004c93]'
                        : 'bg-gray-300 cursor-not-allowed'}`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Preferences */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900">Your Preferences</h3>
              <p className="text-gray-600 mb-4">
                Help us match you with the right healthcare provider based on your needs.
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Language *
                  </label>
                  <select
                    id="preferredLanguage"
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    {LANGUAGES.map(language => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level *
                    </legend>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="urgency-routine"
                          name="urgency"
                          type="radio"
                          value="routine"
                          checked={formData.urgency === 'routine'}
                          onChange={handleInputChange}
                          className="h-4 w-4 border-gray-300 text-[#005eb8] focus:ring-[#005eb8]"
                        />
                        <label htmlFor="urgency-routine" className="ml-3 text-sm text-gray-700">
                          Routine - I need an appointment within the next few weeks
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="urgency-soon"
                          name="urgency"
                          type="radio"
                          value="soon"
                          checked={formData.urgency === 'soon'}
                          onChange={handleInputChange}
                          className="h-4 w-4 border-gray-300 text-[#005eb8] focus:ring-[#005eb8]"
                        />
                        <label htmlFor="urgency-soon" className="ml-3 text-sm text-gray-700">
                          Soon - I need an appointment within the next week
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="urgency-urgent"
                          name="urgency"
                          type="radio"
                          value="urgent"
                          checked={formData.urgency === 'urgent'}
                          onChange={handleInputChange}
                          className="h-4 w-4 border-gray-300 text-[#005eb8] focus:ring-[#005eb8]"
                        />
                        <label htmlFor="urgency-urgent" className="ml-3 text-sm text-gray-700">
                          Urgent - I need an appointment in the next 24-48 hours
                        </label>
                      </div>
                    </div>
                  </fieldset>

                  {formData.urgency === 'urgent' && (
                    <div className="mt-2 p-3 bg-yellow-50 border border-yellow-100 rounded-md">
                      <p className="text-sm text-yellow-800">
                        <strong>Important:</strong> For medical emergencies, please call emergency services
                        or go to your nearest emergency department immediately.
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
                    Brief Description of Symptoms
                  </label>
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Please describe your symptoms or reason for the appointment"
                  />
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="py-3 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goToNextStep}
                    disabled={!validateCurrentStep()}
                    className={`py-3 px-4 rounded-md text-white font-medium
                      ${validateCurrentStep()
                        ? 'bg-[#005eb8] hover:bg-[#004c93]'
                        : 'bg-gray-300 cursor-not-allowed'}`}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Schedule */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900">Schedule Your Appointment</h3>
              <p className="text-gray-600 mb-4">
                Select your preferred date and time for the appointment.
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                {formData.preferredDate && suggestedTimeSlots.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Time Slots *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {suggestedTimeSlots.map(timeSlot => (
                        <div key={timeSlot} className="relative">
                          <input
                            id={`time-${timeSlot}`}
                            name="preferredTimeSlot"
                            type="radio"
                            value={timeSlot}
                            checked={formData.preferredTimeSlot === timeSlot}
                            onChange={handleInputChange}
                            className="sr-only peer"
                            required
                          />
                          <label
                            htmlFor={`time-${timeSlot}`}
                            className="flex items-center justify-center p-3 border rounded-md text-sm cursor-pointer
                              peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700
                              hover:bg-gray-50"
                          >
                            {timeSlot}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="py-3 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={goToNextStep}
                    disabled={!validateCurrentStep()}
                    className={`py-3 px-4 rounded-md text-white font-medium
                      ${validateCurrentStep()
                        ? 'bg-[#005eb8] hover:bg-[#004c93]'
                        : 'bg-gray-300 cursor-not-allowed'}`}
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900">Review & Confirm</h3>
              <p className="text-gray-600 mb-4">
                Please review your appointment details before submitting.
              </p>

              <div className="bg-gray-50 p-4 rounded-md space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Appointment Type</h4>
                    <p className="text-black">{formData.appointmentType}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Specialty</h4>
                    <p className="text-black">{formData.specialtyNeeded}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Preferred Language</h4>
                    <p className="text-black">{formData.preferredLanguage}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Urgency</h4>
                    <p className="text-black capitalize">{formData.urgency}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date</h4>
                    <p className="text-black">
                      {formData.preferredDate ? new Date(formData.preferredDate).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : ''}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Time</h4>
                    <p className="text-black">{formData.preferredTimeSlot}</p>
                  </div>
                </div>

                {formData.symptoms && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Symptoms/Reason</h4>
                    <p className="text-black">{formData.symptoms}</p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Any additional information for the healthcare provider"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>How doctor matching works:</strong> Our system will match you with an appropriate
                  healthcare provider based on your preferences, appointment type, and availability.
                  You'll receive a confirmation with the details of your appointment.
                </p>
              </div>

              {submissionError && (
                <div className="bg-red-50 p-4 rounded-md">
                  <p className="text-sm text-red-700">{submissionError}</p>
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="py-3 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 px-4 bg-[#005eb8] rounded-md text-white font-medium hover:bg-[#004c93] flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Submit Appointment Request"
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">What happens next?</h3>
          <ol className="space-y-4 ml-5 list-decimal">
            <li className="text-gray-600">
              <span className="text-gray-900 font-medium">Matching:</span> Our system will match you with the most appropriate healthcare provider based on your preferences and requirements.
            </li>
            <li className="text-gray-600">
              <span className="text-gray-900 font-medium">Confirmation:</span> You'll receive a confirmation email with your appointment details.
            </li>
            <li className="text-gray-600">
              <span className="text-gray-900 font-medium">Reminders:</span> We'll send you reminders as your appointment date approaches.
            </li>
            <li className="text-gray-600">
              <span className="text-gray-900 font-medium">Consultation:</span> Join your appointment via the method specified (in-person, phone, or video call).
            </li>
          </ol>
        </div>
      </div>
    </AccountHealthLayout>
  );
};

export default BookAppointment;
