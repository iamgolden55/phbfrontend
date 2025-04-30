import React, { useState } from 'react';
import { usePatients } from './patientContext';
import TreatmentPlanForm from './TreatmentPlanForm';
import AppointmentScheduler from './AppointmentScheduler';
import PatientCommunication from './PatientCommunication';

interface PatientDetailProps {
  onClose: () => void;
}

const PatientDetail: React.FC<PatientDetailProps> = ({ onClose }) => {
  const { selectedPatient, updatePatient } = usePatients();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [showTreatmentPlanForm, setShowTreatmentPlanForm] = useState<boolean>(false);
  const [showAppointmentForm, setShowAppointmentForm] = useState<boolean>(false);
  const [showCommunicationForm, setShowCommunicationForm] = useState<boolean>(false);

  if (!selectedPatient) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <span className="material-icons text-gray-400 text-5xl mb-2">person_off</span>
        <h3 className="text-xl font-medium text-gray-600">No patient selected</h3>
        <p className="text-gray-500 mt-2">Select a patient from the list to view their details.</p>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'None';

    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const renderRiskBadge = (riskLevel?: string) => {
    if (!riskLevel) return null;

    const badgeColor =
      riskLevel === 'high' ? 'bg-red-100 text-red-800' :
      riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
      'bg-green-100 text-green-800';

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
        {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
      </span>
    );
  };

  const renderStatusBadge = (status: string) => {
    const badgeColor =
      status === 'active' ? 'bg-green-100 text-green-800' :
      status === 'inactive' ? 'bg-gray-100 text-gray-800' :
      'bg-blue-100 text-blue-800';

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Patient Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="h-16 w-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xl font-semibold">
              {selectedPatient.firstName.charAt(0)}{selectedPatient.lastName.charAt(0)}
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedPatient.title ? `${selectedPatient.title} ` : ''}
                {selectedPatient.firstName} {selectedPatient.lastName}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-gray-600">
                  NHS: {selectedPatient.hpn}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">
                  DOB: {formatDate(selectedPatient.dateOfBirth)} ({getAge(selectedPatient.dateOfBirth)} years)
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">
                  {selectedPatient.gender.charAt(0).toUpperCase() + selectedPatient.gender.slice(1)}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {renderStatusBadge(selectedPatient.status)}
                {selectedPatient.riskLevel && renderRiskBadge(selectedPatient.riskLevel)}
                {selectedPatient.flagged && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <span className="material-icons text-sm mr-1">flag</span>
                    Flagged{selectedPatient.flagReason ? `: ${selectedPatient.flagReason}` : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCommunicationForm(true)}
              className="text-blue-600 hover:text-blue-800 px-2 py-1 rounded"
              title="Contact Patient"
            >
              <span className="material-icons">email</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              <span className="material-icons">close</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'appointments'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Appointments
          </button>
          <button
            onClick={() => setActiveTab('conditions')}
            className={`px-4 py-2 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'conditions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Conditions & Medications
          </button>
          <button
            onClick={() => setActiveTab('treatment-plans')}
            className={`px-4 py-2 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'treatment-plans'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Treatment Plans
          </button>
          <button
            onClick={() => setActiveTab('tests')}
            className={`px-4 py-2 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'tests'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Test Results
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'notes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Notes
          </button>
          <button
            onClick={() => setActiveTab('communication')}
            className={`px-4 py-2 font-medium text-sm border-b-2 whitespace-nowrap ${
              activeTab === 'communication'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Communication
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Communication Form (can be shown from any tab) */}
        {showCommunicationForm && (
          <div className="mb-6">
            <PatientCommunication
              patient={selectedPatient}
              onComplete={() => setShowCommunicationForm(false)}
            />
          </div>
        )}

        {/* Treatment Plan Form (only shown when adding/editing a plan) */}
        {showTreatmentPlanForm && (
          <div className="mb-6">
            <TreatmentPlanForm
              patientId={selectedPatient.id}
              onComplete={() => setShowTreatmentPlanForm(false)}
            />
          </div>
        )}

        {/* Appointment Form (only shown when scheduling) */}
        {showAppointmentForm && (
          <div className="mb-6">
            <AppointmentScheduler
              patientId={selectedPatient.id}
              onComplete={() => setShowAppointmentForm(false)}
            />
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && !showTreatmentPlanForm && !showAppointmentForm && !showCommunicationForm && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-900">{selectedPatient.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-gray-900">{selectedPatient.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Preferred Contact Method</p>
                    <p className="text-gray-900">
                      {selectedPatient.preferredContactMethod
                        ? selectedPatient.preferredContactMethod.charAt(0).toUpperCase() +
                          selectedPatient.preferredContactMethod.slice(1)
                        : 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Registration Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Registration Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Registered GP</p>
                    <p className="text-gray-900">{selectedPatient.registeredGP}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Registered Practice</p>
                    <p className="text-gray-900">{selectedPatient.registeredPractice}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointments Summary */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">Appointments</h3>
                <div className="flex gap-2">
                  <button
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    onClick={() => setShowAppointmentForm(true)}
                  >
                    <span className="material-icons text-sm mr-1">add</span>
                    Schedule
                  </button>
                  <button
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    onClick={() => setActiveTab('appointments')}
                  >
                    View All
                  </button>
                </div>
              </div>

              {selectedPatient.appointments.length === 0 ? (
                <p className="text-gray-500 text-sm">No appointments found for this patient.</p>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    {selectedPatient.appointments
                      .sort((a, b) => a.date < b.date ? 1 : -1)
                      .slice(0, 3)
                      .map(appointment => (
                        <div key={appointment.id} className="flex justify-between">
                          <div>
                            <p className="font-medium text-gray-900">
                              {appointment.appointmentType.charAt(0).toUpperCase() +
                                appointment.appointmentType.slice(1)}
                            </p>
                            <p className="text-sm text-gray-500">
                              {formatDate(appointment.date)} at {appointment.time}
                            </p>
                          </div>
                          <div>
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                              appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                              appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              appointment.status === 'no-show' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Medical Conditions Summary */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">Medical Conditions</h3>
                <button
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => setActiveTab('conditions')}
                >
                  View All
                </button>
              </div>

              {selectedPatient.medicalConditions.length === 0 ? (
                <p className="text-gray-500 text-sm">No medical conditions recorded for this patient.</p>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    {selectedPatient.medicalConditions.slice(0, 3).map(condition => (
                      <div key={condition.id} className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{condition.name}</p>
                          <p className="text-sm text-gray-500">
                            Diagnosed: {formatDate(condition.diagnosedDate)}
                          </p>
                        </div>
                        <div>
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            condition.status === 'active' ? 'bg-red-100 text-red-800' :
                            condition.status === 'monitoring' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {condition.status.charAt(0).toUpperCase() + condition.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Treatment Plans Summary */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-900">Treatment Plans</h3>
                <button
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  onClick={() => {
                    setActiveTab('treatment-plans');
                    setShowTreatmentPlanForm(true);
                  }}
                >
                  <span className="material-icons text-sm mr-1">add</span>
                  Add Plan
                </button>
              </div>

              {/* Treatment plans would be displayed here if available */}
              <p className="text-gray-500 text-sm">No treatment plans currently available.</p>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && !showAppointmentForm && !showCommunicationForm && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Patient Appointments</h3>
              <button
                onClick={() => setShowAppointmentForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center text-sm transition"
              >
                <span className="material-icons text-sm mr-1">add</span>
                Schedule Appointment
              </button>
            </div>

            {selectedPatient.appointments.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <span className="material-icons text-gray-400 text-4xl mb-2">event_busy</span>
                <h4 className="text-lg font-medium text-gray-600 mb-1">No Appointments</h4>
                <p className="text-gray-500 mb-4">This patient has no appointments scheduled.</p>
                <button
                  onClick={() => setShowAppointmentForm(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-flex items-center transition"
                >
                  <span className="material-icons text-sm mr-1">add</span>
                  Schedule Now
                </button>
              </div>
            ) : (
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        With
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedPatient.appointments
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map(appointment => (
                        <tr key={appointment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {formatDate(appointment.date)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {appointment.time} ({appointment.duration} minutes)
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {appointment.appointmentType.charAt(0).toUpperCase() +
                               appointment.appointmentType.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {appointment.professionalName}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                              appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                              appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              appointment.status === 'no-show' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">
                              {appointment.location || 'Not specified'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              className="text-blue-600 hover:text-blue-900 mr-3"
                              onClick={() => {
                                // Edit appointment functionality would go here
                              }}
                            >
                              <span className="material-icons text-sm">edit</span>
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={() => {
                                // Cancel appointment functionality would go here
                              }}
                            >
                              <span className="material-icons text-sm">cancel</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Treatment Plans Tab */}
        {activeTab === 'treatment-plans' && !showTreatmentPlanForm && !showCommunicationForm && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Treatment Plans</h3>
              <button
                onClick={() => setShowTreatmentPlanForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center text-sm transition"
              >
                <span className="material-icons text-sm mr-1">add</span>
                New Treatment Plan
              </button>
            </div>

            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <span className="material-icons text-gray-400 text-4xl mb-2">healing</span>
              <h4 className="text-lg font-medium text-gray-600 mb-1">No Treatment Plans</h4>
              <p className="text-gray-500 mb-4">This patient has no treatment plans created yet.</p>
              <button
                onClick={() => setShowTreatmentPlanForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-flex items-center transition"
              >
                <span className="material-icons text-sm mr-1">add</span>
                Create Treatment Plan
              </button>
            </div>
          </div>
        )}

        {/* Communication Tab */}
        {activeTab === 'communication' && !showCommunicationForm && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Patient Communication</h3>
              <button
                onClick={() => setShowCommunicationForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center text-sm transition"
              >
                <span className="material-icons text-sm mr-1">send</span>
                New Message
              </button>
            </div>

            <PatientCommunication
              patient={selectedPatient}
              onComplete={() => setShowCommunicationForm(false)}
            />
          </div>
        )}

        {/* Other tabs would go here... */}
      </div>
    </div>
  );
};

export default PatientDetail;
