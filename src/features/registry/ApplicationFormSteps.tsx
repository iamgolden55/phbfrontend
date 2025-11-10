/**
 * Application Form Step Components
 *
 * Individual step components for the professional application form
 */

import React from 'react';
import { RegulatoryBody } from '../../services/registryService';

interface FormData {
  [key: string]: any;
}

interface StepProps {
  formData: FormData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

// ============================================================================
// PERSONAL INFORMATION STEP
// ============================================================================

export const PersonalInfoStep: React.FC<StepProps> = ({ formData, errors, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Professional Type *
      </label>
      <select
        name="professional_type"
        value={formData.professional_type || ''}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md ${
          errors.professional_type ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <option value="">Select professional type</option>
        <option value="pharmacist">Pharmacist</option>
        <option value="doctor">Doctor</option>
        <option value="nurse">Nurse</option>
        <option value="midwife">Midwife</option>
        <option value="dentist">Dentist</option>
        <option value="physiotherapist">Physiotherapist</option>
        <option value="medical_laboratory_scientist">Medical Laboratory Scientist</option>
        <option value="radiographer">Radiographer</option>
        <option value="optometrist">Optometrist</option>
      </select>
      {errors.professional_type && (
        <p className="text-red-500 text-xs mt-1">{errors.professional_type}</p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Title *
      </label>
      <select
        name="title"
        value={formData.title || ''}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md ${
          errors.title ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <option value="">Select title</option>
        <option value="Mr.">Mr.</option>
        <option value="Mrs.">Mrs.</option>
        <option value="Miss">Miss</option>
        <option value="Ms.">Ms.</option>
        <option value="Dr.">Dr.</option>
        <option value="Prof.">Prof.</option>
      </select>
      {errors.title && (
        <p className="text-red-500 text-xs mt-1">{errors.title}</p>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.first_name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Amara"
        />
        {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
        <input
          type="text"
          name="middle_name"
          value={formData.middle_name || ''}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Chioma"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.last_name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Okafor"
        />
        {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="amara.okafor@example.com"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
        <input
          type="tel"
          name="phone_number"
          value={formData.phone_number || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.phone_number ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="+234 801 234 5678"
        />
        {errors.phone_number && (
          <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>
        )}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.date_of_birth ? 'border-red-500' : 'border-gray-300'
          }`}
          max={new Date().toISOString().split('T')[0]}
        />
        {errors.date_of_birth && (
          <p className="text-red-500 text-xs mt-1">{errors.date_of_birth}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
        <select
          name="gender"
          value={formData.gender || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.gender ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
        <input
          type="text"
          name="nationality"
          value={formData.nationality || 'Nigerian'}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  </div>
);

// ============================================================================
// CONTACT INFORMATION STEP
// ============================================================================

export const ContactInfoStep: React.FC<StepProps & { nigerianStates: string[] }> = ({
  formData,
  errors,
  onChange,
  nigerianStates,
}) => {
  // Debug: Check what nigerianStates actually is
  console.log('ContactInfoStep nigerianStates:', nigerianStates, 'Type:', typeof nigerianStates, 'Is Array:', Array.isArray(nigerianStates));

  // Ensure it's always an array
  const statesArray = Array.isArray(nigerianStates) ? nigerianStates : [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Residential Address</h3>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
      <input
        type="text"
        name="residential_address"
        value={formData.residential_address || ''}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md ${
          errors.residential_address ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="123 Pharmacy Street"
      />
      {errors.residential_address && (
        <p className="text-red-500 text-xs mt-1">{errors.residential_address}</p>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
        <input
          type="text"
          name="residential_city"
          value={formData.residential_city || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.residential_city ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Lagos"
        />
        {errors.residential_city && (
          <p className="text-red-500 text-xs mt-1">{errors.residential_city}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
        <select
          name="residential_state"
          value={formData.residential_state || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.residential_state ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select state</option>
          {statesArray.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.residential_state && (
          <p className="text-red-500 text-xs mt-1">{errors.residential_state}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
        <input
          type="text"
          name="residential_country"
          value={formData.residential_country || 'Nigeria'}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Postal Code *
      </label>
      <input
        type="text"
        name="postcode"
        value={formData.postcode || ''}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md ${
          errors.postcode ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="100001"
      />
      {errors.postcode && (
        <p className="text-red-500 text-xs mt-1">{errors.postcode}</p>
      )}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Alternate Phone Number
      </label>
      <input
        type="tel"
        name="alternate_phone_number"
        value={formData.alternate_phone_number || ''}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        placeholder="+234 802 345 6789"
      />
    </div>
  </div>
  );
};

// ============================================================================
// REGULATORY INFORMATION STEP
// ============================================================================

export const RegulatoryInfoStep: React.FC<
  StepProps & { regulatoryBody: RegulatoryBody }
> = ({ formData, errors, onChange, regulatoryBody }) => {
  const getRegulatoryBodyName = (body: RegulatoryBody): string => {
    const names: Record<RegulatoryBody, string> = {
      MDCN: 'Medical and Dental Council of Nigeria',
      PCN: 'Pharmacists Council of Nigeria',
      NMCN: 'Nursing and Midwifery Council of Nigeria',
      MPBN: 'Medical Physiotherapy Board of Nigeria',
      MLSCN: 'Medical Laboratory Science Council of Nigeria',
      RRBN: 'Radiographers Registration Board of Nigeria',
      OPTON: 'Optometrists and Dispensing Opticians Registration Board',
    };
    return names[body];
  };

  // Auto-populate regulatory_body when component mounts or regulatoryBody changes
  React.useEffect(() => {
    if (regulatoryBody && formData.regulatory_body !== regulatoryBody) {
      const syntheticEvent = {
        target: {
          name: 'regulatory_body',
          value: regulatoryBody,
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  }, [regulatoryBody]);

  return (
    <div className="space-y-4">
      {/* Hidden input to store regulatory_body in formData */}
      <input type="hidden" name="regulatory_body" value={regulatoryBody} />

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
        <p className="text-sm text-blue-800">
          <strong>Regulatory Body:</strong> {getRegulatoryBodyName(regulatoryBody)} ({regulatoryBody})
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Your professional type automatically determines the regulatory body.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {regulatoryBody} Registration Number *
        </label>
        <input
          type="text"
          name="registration_number"
          value={formData.registration_number || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.registration_number ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder={`e.g., ${
            regulatoryBody === 'PCN'
              ? 'PCN/FG/24/12345'
              : regulatoryBody === 'MDCN'
              ? 'MDCN/R/12345'
              : 'Registration number'
          }`}
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter your official {regulatoryBody} registration number
        </p>
        {errors.registration_number && (
          <p className="text-red-500 text-xs mt-1">{errors.registration_number}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Registration Date
          </label>
          <input
            type="date"
            name="registration_date"
            value={formData.registration_date || ''}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            max={new Date().toISOString().split('T')[0]}
          />
          <p className="text-xs text-gray-500 mt-1">Date you were registered with {regulatoryBody}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Registration Expiry Date
          </label>
          <input
            type="date"
            name="registration_expiry_date"
            value={formData.registration_expiry_date || ''}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            min={new Date().toISOString().split('T')[0]}
          />
          <p className="text-xs text-gray-500 mt-1">If your license has an expiry date</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <p className="text-sm text-yellow-800">
          ⚠️ <strong>Important:</strong> You will need to upload your {regulatoryBody} registration
          certificate in the next steps. Please ensure your registration is current and valid.
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// EDUCATION INFORMATION STEP
// ============================================================================

export const EducationInfoStep: React.FC<StepProps & { degreeLabel: string }> = ({
  formData,
  errors,
  onChange,
  degreeLabel,
}) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {degreeLabel} *
      </label>
      <input
        type="text"
        name="highest_degree"
        value={formData.highest_degree || ''}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md ${
          errors.highest_degree ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="e.g., B.Pharm, MBBS, B.Sc Nursing"
      />
      {errors.highest_degree && (
        <p className="text-red-500 text-xs mt-1">{errors.highest_degree}</p>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          University/Institution *
        </label>
        <input
          type="text"
          name="university"
          value={formData.university || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.university ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., University of Lagos"
        />
        {errors.university && (
          <p className="text-red-500 text-xs mt-1">{errors.university}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Graduation Year *
        </label>
        <input
          type="number"
          name="graduation_year"
          value={formData.graduation_year || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.graduation_year ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., 2015"
          min="1950"
          max={new Date().getFullYear()}
        />
        {errors.graduation_year && (
          <p className="text-red-500 text-xs mt-1">{errors.graduation_year}</p>
        )}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Additional Qualifications (Optional)
      </label>
      <textarea
        name="additional_qualifications"
        value={
          Array.isArray(formData.additional_qualifications)
            ? formData.additional_qualifications.join('\n')
            : ''
        }
        onChange={(e) => {
          const qualifications = e.target.value.split('\n').filter((q) => q.trim());
          const event = {
            ...e,
            target: {
              ...e.target,
              name: 'additional_qualifications',
              value: qualifications,
            },
          } as any;
          onChange(event);
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        rows={4}
        placeholder="Enter one qualification per line, e.g.:&#10;Master in Clinical Pharmacy&#10;Certificate in Antimicrobial Stewardship&#10;Diploma in Hospital Pharmacy"
      />
      <p className="text-xs text-gray-500 mt-1">
        List any postgraduate degrees, diplomas, or certificates (one per line)
      </p>
    </div>
  </div>
);

// ============================================================================
// PROFESSIONAL INFORMATION STEP
// ============================================================================

export const ProfessionalInfoStep: React.FC<
  StepProps & { specializations: string[]; nigerianStates: string[] }
> = ({ formData, errors, onChange, specializations, nigerianStates }) => {
  // Debug: Check what we received
  console.log('ProfessionalInfoStep specializations:', specializations, 'Type:', typeof specializations, 'Is Array:', Array.isArray(specializations));
  console.log('ProfessionalInfoStep nigerianStates:', nigerianStates, 'Type:', typeof nigerianStates, 'Is Array:', Array.isArray(nigerianStates));

  // Ensure they're always arrays
  const specializationsArray = Array.isArray(specializations) ? specializations : [];
  const statesArray = Array.isArray(nigerianStates) ? nigerianStates : [];

  return (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Years of Experience *
        </label>
        <input
          type="number"
          name="years_experience"
          value={formData.years_experience || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.years_experience ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., 5"
          min="0"
          max="60"
        />
        {errors.years_experience && (
          <p className="text-red-500 text-xs mt-1">{errors.years_experience}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Primary Specialization *
        </label>
        <select
          name="specialization"
          value={formData.specialization || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.specialization ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select specialization</option>
          {specializationsArray.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
        {errors.specialization && (
          <p className="text-red-500 text-xs mt-1">{errors.specialization}</p>
        )}
      </div>
    </div>

    {/* Show custom specialization input if "Other" is selected */}
    {formData.specialization === 'Other' && (
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Please Specify Your Specialization *
        </label>
        <input
          type="text"
          name="other_specialization"
          value={formData.other_specialization || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.other_specialization ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., Pharmaceutical Biotechnology, Forensic Pharmacy, etc."
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter your specific area of specialization
        </p>
        {errors.other_specialization && (
          <p className="text-red-500 text-xs mt-1">{errors.other_specialization}</p>
        )}
      </div>
    )}

    <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">
      Current Practice Location
    </h3>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Practice Address *
      </label>
      <input
        type="text"
        name="current_practice_address"
        value={formData.current_practice_address || ''}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded-md ${
          errors.current_practice_address ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder="e.g., 45 Hospital Road, Victoria Island"
      />
      {errors.current_practice_address && (
        <p className="text-red-500 text-xs mt-1">{errors.current_practice_address}</p>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
        <input
          type="text"
          name="current_practice_city"
          value={formData.current_practice_city || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.current_practice_city ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Lagos"
        />
        {errors.current_practice_city && (
          <p className="text-red-500 text-xs mt-1">{errors.current_practice_city}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
        <select
          name="current_practice_state"
          value={formData.current_practice_state || ''}
          onChange={onChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.current_practice_state ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select state</option>
          {statesArray.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.current_practice_state && (
          <p className="text-red-500 text-xs mt-1">{errors.current_practice_state}</p>
        )}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Professional Memberships (Optional)
      </label>
      <textarea
        name="professional_memberships"
        value={
          Array.isArray(formData.professional_memberships)
            ? formData.professional_memberships.join('\n')
            : ''
        }
        onChange={(e) => {
          const memberships = e.target.value.split('\n').filter((m) => m.trim());
          const event = {
            ...e,
            target: {
              ...e.target,
              name: 'professional_memberships',
              value: memberships,
            },
          } as any;
          onChange(event);
        }}
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        rows={3}
        placeholder="e.g., Pharmaceutical Society of Nigeria (PSN)"
      />
      <p className="text-xs text-gray-500 mt-1">One per line</p>
    </div>
  </div>
  );
};

// ============================================================================
// REVIEW STEP
// ============================================================================

export const ReviewStep: React.FC<{
  formData: FormData;
  errors: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}> = ({ formData, errors, setFormData }) => (
  <div className="space-y-6">
    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
      <p className="text-sm text-blue-800">
        <strong>Review your application carefully.</strong> Once submitted, some fields cannot be
        edited until your application is reviewed by an administrator.
      </p>
    </div>

    {/* Personal Information */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <span className="mr-2">👤</span> Personal Information
      </h3>
      <div className="bg-gray-50 rounded-md p-4 space-y-2">
        <InfoRow label="Professional Type" value={formData.professional_type} />
        <InfoRow
          label="Full Name"
          value={`${formData.first_name} ${formData.middle_name || ''} ${formData.last_name}`}
        />
        <InfoRow label="Email" value={formData.email} />
        <InfoRow label="Phone" value={formData.phone_number} />
        <InfoRow label="Date of Birth" value={formData.date_of_birth} />
        <InfoRow label="Gender" value={formData.gender} />
      </div>
    </div>

    {/* Contact Information */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <span className="mr-2">📍</span> Contact Information
      </h3>
      <div className="bg-gray-50 rounded-md p-4 space-y-2">
        <InfoRow label="Address" value={formData.residential_address} />
        <InfoRow
          label="City, State"
          value={`${formData.residential_city}, ${formData.residential_state}`}
        />
      </div>
    </div>

    {/* Regulatory Information */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <span className="mr-2">📋</span> Regulatory Information
      </h3>
      <div className="bg-gray-50 rounded-md p-4 space-y-2">
        <InfoRow label="Regulatory Body" value={formData.regulatory_body} />
        <InfoRow label="Registration Number" value={formData.registration_number} />
        {formData.registration_date && (
          <InfoRow label="Registration Date" value={formData.registration_date} />
        )}
      </div>
    </div>

    {/* Education */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <span className="mr-2">🎓</span> Education
      </h3>
      <div className="bg-gray-50 rounded-md p-4 space-y-2">
        <InfoRow label="Degree" value={formData.highest_degree} />
        <InfoRow label="University" value={formData.university} />
        <InfoRow label="Graduation Year" value={formData.graduation_year} />
      </div>
    </div>

    {/* Professional Information */}
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <span className="mr-2">💼</span> Professional Information
      </h3>
      <div className="bg-gray-50 rounded-md p-4 space-y-2">
        <InfoRow label="Years of Experience" value={formData.years_experience} />
        <InfoRow
          label="Specialization"
          value={
            formData.specialization === 'Other' && formData.other_specialization
              ? `Other - ${formData.other_specialization}`
              : formData.specialization
          }
        />
        <InfoRow
          label="Practice Location"
          value={`${formData.current_practice_city}, ${formData.current_practice_state}`}
        />
      </div>
    </div>

    {/* Terms and Conditions */}
    <div className="border-t pt-6">
      <div className="flex items-start">
        <input
          type="checkbox"
          id="agreeToTerms"
          checked={formData.agreeToTerms || false}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, agreeToTerms: e.target.checked }))
          }
          className={`h-4 w-4 text-blue-600 border-gray-300 rounded mt-1 ${
            errors.agreeToTerms ? 'border-red-500' : ''
          }`}
        />
        <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-700">
          I certify that all information provided in this application is true and accurate to the
          best of my knowledge. I understand that providing false information may result in
          rejection of my application or revocation of my license. I agree to the{' '}
          <a href="/terms" target="_blank" className="text-blue-600 hover:underline">
            Terms and Conditions
          </a>{' '}
          and{' '}
          <a href="/privacy" target="_blank" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-red-500 text-xs mt-2 ml-7">{errors.agreeToTerms}</p>
      )}
    </div>

    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
      <p className="text-sm text-yellow-800">
        <strong>Next Steps:</strong> After submitting this application, you will need to:
      </p>
      <ol className="text-sm text-yellow-800 mt-2 ml-4 list-decimal space-y-1">
        <li>Check your email for login credentials</li>
        <li>Log in to your account</li>
        <li>Access your dashboard and click on your application</li>
        <li>Upload required documents (registration certificate, degree certificate, ID, etc.)</li>
      </ol>
    </div>
  </div>
);

// Helper component for displaying info rows
const InfoRow: React.FC<{ label: string; value: any }> = ({ label, value }) => (
  <div className="flex justify-between py-1">
    <span className="text-sm font-medium text-gray-600">{label}:</span>
    <span className="text-sm text-gray-900">{value || 'Not provided'}</span>
  </div>
);
