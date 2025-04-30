import React from 'react';
import { Helmet } from 'react-helmet';
import ClinicalCalculators from '../../features/professional/calculators/ClinicalCalculators';
import { useProfessionalAuth } from '../../features/professional/professionalAuthContext';

const ProfessionalCalculatorsPage: React.FC = () => {
  const { professionalUser } = useProfessionalAuth();

  return (
    <div>
      <Helmet>
        <title>Clinical Calculators | PHB Professional</title>
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">Clinical Calculators</h1>
        <p className="mt-2 text-gray-600">
          Evidence-based tools to assist with clinical decision-making
        </p>
      </div>

      {/* Role-specific introduction */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        {professionalUser?.role === 'doctor' && (
          <p>
            These clinical calculators are designed to assist physicians in making evidence-based decisions
            for diagnosis, risk assessment, and treatment planning. Always use these tools in conjunction
            with your clinical judgment and current best practice guidelines.
          </p>
        )}
        {professionalUser?.role === 'nurse' && (
          <p>
            These clinical calculators can support nursing assessment and care planning. They provide
            standardized measurements to help evaluate patient status and guide interventions.
            Always use these tools as part of a comprehensive nursing assessment.
          </p>
        )}
        {professionalUser?.role === 'researcher' && (
          <p>
            These calculators can assist in research design, patient stratification, and data analysis.
            They provide standardized measurements based on validated clinical tools and can help in
            comparing outcomes across studies.
          </p>
        )}
        {professionalUser?.role === 'pharmacist' && (
          <p>
            These calculators can support medication management, dosing decisions, and risk assessment.
            Use these tools to assist in pharmaceutical care planning and medication therapy management
            while considering patient-specific factors.
          </p>
        )}
      </div>

      {/* Calculator component */}
      <ClinicalCalculators />

      <div className="mt-8 text-sm text-gray-500">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Calculator Disclaimer</h3>
        <p>
          The clinical calculators provided are meant to be used as tools to assist in patient care and
          clinical decision-making. They should not replace clinical judgment or established practice
          guidelines. The results from these calculators should be interpreted in the context of the
          individual patient's clinical situation.
        </p>
        <p className="mt-2">
          While every effort has been made to ensure accuracy, PHB cannot guarantee that these calculators
          are free from errors or that they will be suitable for any particular purpose. Healthcare
          professionals should verify all calculations before making clinical decisions.
        </p>
        <p className="mt-2">
          For any concerns about the clinical calculators or suggestions for additional tools,
          please contact the PHB Professional support team.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalCalculatorsPage;
