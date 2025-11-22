import React from 'react';
import { Link } from 'react-router-dom';

interface SymptomType {
  title: string;
  description: string;
  urgency: 'emergency' | 'urgent' | 'routine';
  action: string;
}

const pregnancySymptoms: SymptomType[] = [
  {
    title: 'Vaginal bleeding',
    description: 'Any bleeding from your vagina during pregnancy should be investigated. While it can be harmless, it may also be a sign of miscarriage or other serious issues.',
    urgency: 'urgent',
    action: 'Contact your midwife or maternity unit immediately'
  },
  {
    title: 'Severe abdominal pain',
    description: 'Severe, persistent or one-sided abdominal pain that doesn\'t go away could be a sign of an ectopic pregnancy, placental abruption, or other complications.',
    urgency: 'emergency',
    action: 'Call 999 or go to your nearest A&E'
  },
  {
    title: 'Reduced baby movements',
    description: 'If your baby moves less or if you notice a change in the pattern of movements, it could be a sign that your baby is unwell.',
    urgency: 'urgent',
    action: 'Contact your midwife or maternity unit immediately'
  },
  {
    title: 'Severe headache',
    description: 'A severe headache that doesn\'t go away, especially if accompanied by visual disturbances, could be a sign of pre-eclampsia.',
    urgency: 'urgent',
    action: 'Contact your midwife or maternity unit immediately'
  },
  {
    title: 'Blurred vision or flashing lights',
    description: 'Changes in your vision, such as blurred vision, flashing lights or spots before your eyes, could be a sign of pre-eclampsia.',
    urgency: 'urgent',
    action: 'Contact your midwife or maternity unit immediately'
  },
  {
    title: 'Swelling in face, hands or feet',
    description: 'Sudden or excessive swelling in your face, hands or feet could be a sign of pre-eclampsia, especially if accompanied by headaches or visual disturbances.',
    urgency: 'urgent',
    action: 'Contact your midwife or maternity unit immediately'
  },
  {
    title: 'Fever or high temperature',
    description: 'A high temperature (over 38°C) can indicate an infection, which could affect your baby if left untreated.',
    urgency: 'urgent',
    action: 'Contact your midwife, GP or maternity unit'
  },
  {
    title: 'Water breaking',
    description: 'If your waters break before 37 weeks, it\'s called preterm premature rupture of membranes (PPROM). This can lead to premature labor.',
    urgency: 'urgent',
    action: 'Contact your midwife or maternity unit immediately'
  },
  {
    title: 'Itching all over',
    description: 'Severe itching, particularly on hands and feet but can be all over, could be a sign of obstetric cholestasis, a liver condition that can affect pregnancy.',
    urgency: 'routine',
    action: 'Contact your midwife or GP within 24 hours'
  },
  {
    title: 'Difficulty breathing',
    description: 'If you\'re struggling to breathe or experiencing shortness of breath that gets worse when lying down, this could indicate a problem with your heart or lungs.',
    urgency: 'urgent',
    action: 'Contact your midwife or GP, or call us for advice'
  },
  {
    title: 'Regular contractions before 37 weeks',
    description: 'Regular painful contractions before 37 weeks could be a sign of preterm labor.',
    urgency: 'urgent',
    action: 'Contact your midwife or maternity unit immediately'
  },
  {
    title: 'Painful urination',
    description: 'Pain or burning when you urinate, needing to urinate frequently, or blood in your urine could be signs of a urinary tract infection (UTI).',
    urgency: 'routine',
    action: 'Contact your midwife or GP within 24 hours'
  }
];

const PregnancyConcernsPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Symptoms not to ignore in pregnancy</h1>
          <p className="text-xl font-medium">
            Important warning signs to look out for during your pregnancy
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="mb-8">
          <p className="text-lg mb-4">
            During pregnancy, your body goes through many changes. While most symptoms are normal, some can indicate a potential problem that needs medical attention.
          </p>
          <p className="text-lg mb-4">
            If you experience any of the symptoms listed below, contact your midwife, GP, or maternity unit as advised. It's always better to seek medical advice if you're unsure or concerned.
          </p>
          <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-600 mb-6">
            <p className="font-bold text-lg mb-2">Emergency symptoms</p>
            <p>Call 999 immediately if you experience:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Severe abdominal pain</li>
              <li>Severe chest pain</li>
              <li>Collapse or unconsciousness</li>
              <li>Heavy, uncontrollable bleeding</li>
              <li>Seizures or fits</li>
            </ul>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Pregnancy symptoms that require medical attention</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {pregnancySymptoms.map((symptom, index) => (
            <div
              key={index}
              className={`border rounded-lg overflow-hidden ${
                symptom.urgency === 'emergency' ? 'border-red-500' :
                symptom.urgency === 'urgent' ? 'border-amber-500' : 'border-blue-500'
              }`}
            >
              <div className={`p-4 ${
                symptom.urgency === 'emergency' ? 'bg-red-50' :
                symptom.urgency === 'urgent' ? 'bg-amber-50' : 'bg-blue-50'
              }`}>
                <h3 className="font-bold text-lg">{symptom.title}</h3>
              </div>
              <div className="p-4">
                <p className="mb-4">{symptom.description}</p>
                <div className={`mt-3 p-2 rounded-md text-sm font-medium ${
                  symptom.urgency === 'emergency' ? 'bg-red-100 text-red-800' :
                  symptom.urgency === 'urgent' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  <p><strong>What to do:</strong> {symptom.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">When to get help</h2>
          <p className="mb-4">
            If you're concerned about your health or your baby's health during pregnancy, don't hesitate to contact:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Your midwife or maternity unit</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Your GP</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>PHB service (for non-emergency advice)</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">•</span>
              <span>Emergency services (999) for serious symptoms</span>
            </li>
          </ul>
          <div className="mt-4">
            <Link to="/pregnancy" className="text-[#0891b2] font-medium hover:underline flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to pregnancy home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyConcernsPage;
