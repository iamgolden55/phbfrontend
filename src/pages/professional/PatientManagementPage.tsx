import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { PatientProvider } from '../../features/professional/patients/patientContext';
import PatientList from '../../features/professional/patients/PatientList';
import PatientDetail from '../../features/professional/patients/PatientDetail';
import { useProfessionalAuth } from '../../features/professional/professionalAuthContext';

const PatientManagementPage: React.FC = () => {
  const { professionalUser } = useProfessionalAuth();
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  if (!professionalUser) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Not Authenticated</h2>
        <p className="text-gray-600">Please <a href="/professional/login" className="text-blue-600 hover:underline">log in</a> to access patient management.</p>
      </div>
    );
  }

  return (
    <PatientProvider>
      <div className="max-w-8xl mx-auto px-4 py-8">
        <Helmet>
          <title>Patient Management | PHB Professional</title>
        </Helmet>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Patient Management</h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition"
          >
            <span className="material-icons mr-1">person_add</span>
            Add New Patient
          </button>
        </div>

        <div className="mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-3">
                  <span className="material-icons">dashboard</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Patient Overview</h2>
                  <p className="text-sm text-gray-500">Manage your patients and their information</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-3 rounded text-center">
                  <div className="text-2xl font-bold text-blue-700">Today</div>
                  <div className="text-sm text-gray-600">Appointments</div>
                </div>
                <div className="bg-blue-50 p-3 rounded text-center">
                  <div className="text-2xl font-bold text-blue-700">Upcoming</div>
                  <div className="text-sm text-gray-600">Appointments</div>
                </div>
                <div className="bg-blue-50 p-3 rounded text-center">
                  <div className="text-2xl font-bold text-blue-700">High Risk</div>
                  <div className="text-sm text-gray-600">Patients</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <div className={`xl:col-span-1 ${selectedPatientId ? 'hidden lg:block' : ''}`}>
            <PatientList onSelectPatient={(patientId) => setSelectedPatientId(patientId)} />
          </div>
          <div className={`xl:col-span-2 ${selectedPatientId ? '' : 'hidden lg:block lg:col-span-1'}`}>
            {selectedPatientId && (
              <PatientDetail onClose={() => setSelectedPatientId(null)} />
            )}
            {!selectedPatientId && (
              <div className="bg-white rounded-lg shadow p-6 h-full flex flex-col items-center justify-center text-center">
                <span className="material-icons text-gray-400 text-5xl mb-2">groups</span>
                <h3 className="text-xl font-medium text-gray-600">Select a Patient</h3>
                <p className="text-gray-500 mt-2 max-w-md">
                  Select a patient from the list to view their details, manage appointments,
                  review medical conditions, and access test results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PatientProvider>
  );
};

export default PatientManagementPage;
