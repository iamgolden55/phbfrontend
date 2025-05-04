import React from 'react';

interface Treatment {
  id?: string;
  name?: string;
  date?: string;
  provider?: string;
  details?: string;
}

interface Diagnosis {
  id?: string;
  name?: string;
  date?: string;
  doctor?: string;
  status?: string;
}

interface PatientProfileData {
  hpn?: string;
  blood_type?: string | null;
  allergies?: string | null;
  chronic_conditions?: string | null;
  emergency_contact_name?: string | null;
  emergency_contact_phone?: string | null;
  last_visit_date?: string | null;
  diagnoses?: Diagnosis[];
  treatments?: Treatment[];
}

interface PatientProfileProps {
  data: PatientProfileData;
  expiryTime?: Date | null;
}

const PatientProfile: React.FC<PatientProfileProps> = ({ data, expiryTime }) => {
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Not available';
    
    try {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-GB', options);
    } catch (err) {
      return dateString;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold">Patient Health Profile</h2>
        
        {expiryTime && (
          <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            Access expires: {expiryTime.toLocaleTimeString()}
          </div>
        )}
      </div>
      
      <div className="p-4 bg-blue-50 rounded-md mb-6">
        <p className="text-blue-700 font-bold">
          HPN: {data.hpn || 'Not available'}
        </p>
      </div>

      {/* Personal Health Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Personal Health Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <span className="font-medium text-gray-700 block">Blood Type:</span>
            <span>{data.blood_type || 'Not recorded'}</span>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <span className="font-medium text-gray-700 block">Allergies:</span>
            <span>{data.allergies || 'None recorded'}</span>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <span className="font-medium text-gray-700 block">Chronic Conditions:</span>
            <span>{data.chronic_conditions || 'None recorded'}</span>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-md">
            <span className="font-medium text-gray-700 block">Last Visit Date:</span>
            <span>{formatDate(data.last_visit_date)}</span>
          </div>
        </div>
      </div>
      
      {/* Emergency Contact Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Emergency Contact</h3>
        
        {data.emergency_contact_name || data.emergency_contact_phone ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-md">
              <span className="font-medium text-gray-700 block">Name:</span>
              <span>{data.emergency_contact_name || 'Not recorded'}</span>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-md">
              <span className="font-medium text-gray-700 block">Phone:</span>
              <span>{data.emergency_contact_phone || 'Not recorded'}</span>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-gray-600">No emergency contacts recorded</p>
          </div>
        )}
      </div>
      
      {/* Diagnoses Information */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Diagnoses</h3>
        
        {data.diagnoses && data.diagnoses.length > 0 ? (
          <div className="space-y-3">
            {data.diagnoses.map((diagnosis, index) => (
              <div key={diagnosis.id || index} className="p-3 border rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium">{diagnosis.name}</span>
                  {diagnosis.date && <span className="text-sm text-gray-500">{formatDate(diagnosis.date)}</span>}
                </div>
                {diagnosis.doctor && (
                  <span className="text-sm text-gray-600 block">Doctor: {diagnosis.doctor}</span>
                )}
                {diagnosis.status && (
                  <span className="text-sm text-gray-600 block">Status: {diagnosis.status}</span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-gray-600">No diagnoses recorded</p>
          </div>
        )}
      </div>
      
      {/* Treatments Information */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">Treatments</h3>
        
        {data.treatments && data.treatments.length > 0 ? (
          <div className="space-y-3">
            {data.treatments.map((treatment, index) => (
              <div key={treatment.id || index} className="p-3 border rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium">{treatment.name}</span>
                  {treatment.date && <span className="text-sm text-gray-500">{formatDate(treatment.date)}</span>}
                </div>
                {treatment.provider && (
                  <span className="text-sm text-gray-600 block">Provider: {treatment.provider}</span>
                )}
                {treatment.details && (
                  <p className="mt-2 text-gray-700">{treatment.details}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-gray-600">No treatments recorded</p>
          </div>
        )}
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 rounded-md text-sm text-gray-500">
        <p>This information is from your electronic health record. If you believe any information is incorrect, please contact your healthcare provider.</p>
      </div>
    </div>
  );
};

export default PatientProfile; 