import React, { useState } from 'react';

// Simple SVG icons for visual cues
const IconAge = () => (
  <svg className="inline w-5 h-5 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M12 6v6l4 2" strokeWidth="2" /></svg>
);
const IconGender = () => (
  <svg className="inline w-5 h-5 text-purple-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="5" fill="#ede9fe" /><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.02 0l-1.41-1.41M6.34 6.34L4.93 4.93" strokeWidth="2" /></svg>
);
const IconFamily = () => (
  <svg className="inline w-5 h-5 text-blue-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="8" cy="12" r="3" fill="#bfdbfe" /><circle cx="16" cy="12" r="3" fill="#bfdbfe" /><rect x="4" y="15" width="16" height="5" rx="2" fill="#dbeafe" /></svg>
);
const IconWeight = () => (
  <svg className="inline w-5 h-5 text-orange-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="6" y="10" width="12" height="8" rx="4" fill="#fed7aa" /><rect x="9" y="6" width="6" height="4" rx="2" fill="#fdba74" /></svg>
);
const IconActivity = () => (
  <svg className="inline w-5 h-5 text-lime-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M8 16l4-8 4 8" strokeWidth="2" /></svg>
);
const IconBloodPressure = () => (
  <svg className="inline w-5 h-5 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 21c4.97-4.97 8-8.03 8-12A8 8 0 104 9c0 3.97 3.03 7.03 8 12z" strokeWidth="2" /></svg>
);
const IconCholesterol = () => (
  <svg className="inline w-5 h-5 text-yellow-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><ellipse cx="12" cy="12" rx="6" ry="3" fill="#fde68a" /></svg>
);
const IconGestational = () => (
  <svg className="inline w-5 h-5 text-pink-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><ellipse cx="12" cy="15" rx="6" ry="3" fill="#fbcfe8" /><circle cx="12" cy="9" r="3" fill="#f9a8d4" /></svg>
);

const DiabetesRiskAssessmentPage: React.FC = () => {
  const [form, setForm] = useState({
    age: '',
    gender: '',
    familyHistory: '',
    unsureFamilyHistory: '',
    weight: '',
    activity: '',
    bloodPressure: '',
    cholesterol: '',
    unsureCholesterol: '',
    gestational: '',
    unsureGestational: '',
  });
  const [showFamilyFollowup, setShowFamilyFollowup] = useState(false);
  const [showCholesterolFollowup, setShowCholesterolFollowup] = useState(false);
  const [showGestationalFollowup, setShowGestationalFollowup] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'familyHistory' && value === 'unsure') setShowFamilyFollowup(true);
    if (name === 'familyHistory' && value !== 'unsure') setShowFamilyFollowup(false);
    if (name === 'cholesterol' && value === 'unsure') setShowCholesterolFollowup(true);
    if (name === 'cholesterol' && value !== 'unsure') setShowCholesterolFollowup(false);
    if (name === 'gestational' && value === 'unsure') setShowGestationalFollowup(true);
    if (name === 'gestational' && value !== 'unsure') setShowGestationalFollowup(false);
  };

  // Simple risk calculation (placeholder logic)
  const calculateRisk = () => {
    let risk = 0;
    if (Number(form.age) > 45) risk += 1;
    if (form.gender === 'female' && (form.gestational === 'yes' || (form.gestational === 'unsure' && form.unsureGestational === 'yes'))) risk += 1;
    if (form.familyHistory === 'yes' || (form.familyHistory === 'unsure' && form.unsureFamilyHistory === 'yes')) risk += 1;
    if (form.weight === 'overweight') risk += 1;
    if (form.activity === 'low') risk += 1;
    if (form.bloodPressure === 'high') risk += 1;
    if (form.cholesterol === 'high' || (form.cholesterol === 'unsure' && form.unsureCholesterol === 'yes')) risk += 1;
    if (risk >= 4) return 'High risk';
    if (risk >= 2) return 'Moderate risk';
    return 'Low risk';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const riskResult = calculateRisk();
    setResult(riskResult);
    // --- FUTURE: Anonymized Data Collection Example ---
    // const anonymizedData = { ...form };
    // fetch('/api/diabetes-risk', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(anonymizedData) });
  };

  const Tooltip = ({ text }: { text: string }) => (
    <span className="ml-1 text-xs text-gray-500 cursor-pointer" title={text}>ⓘ</span>
  );

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="phb-container max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-[#005eb8]">Diabetes Risk Assessment</h1>
        <p className="mb-6 text-gray-700">Answer the questions below to estimate your risk of diabetes. This tool is for informational purposes only and does not replace professional medical advice.</p>
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow">
          <div>
            <label className="block font-medium mb-1"><IconAge />Age</label>
            <div className="text-xs text-gray-600 mb-1">How old are you? (Older age can increase risk.)</div>
            <input type="number" name="age" value={form.age} onChange={handleChange} required min="18" max="120" className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium mb-1"><IconGender />Gender</label>
            <div className="text-xs text-gray-600 mb-1">Some risks are different for men and women.</div>
            <select name="gender" value={form.gender} onChange={handleChange} required className="w-full border rounded px-3 py-2">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1"><IconFamily />Family history of diabetes? <Tooltip text="This means a parent, brother, or sister has diabetes." /></label>
            <div className="text-xs text-gray-600 mb-1">Has your parent, brother, or sister ever been told they have diabetes? (If you don't know, that's okay!)</div>
            <select name="familyHistory" value={form.familyHistory} onChange={handleChange} required className="w-full border rounded px-3 py-2">
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="unsure">I'm not sure</option>
            </select>
            {showFamilyFollowup && (
              <div className="mt-2 ml-2 p-2 bg-blue-50 rounded">
                <label className="block text-sm mb-1">Has your parent, brother, or sister ever been told they have diabetes?</label>
                <select name="unsureFamilyHistory" value={form.unsureFamilyHistory} onChange={handleChange} className="w-full border rounded px-2 py-1">
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No / Not sure</option>
                </select>
                {form.unsureFamilyHistory === 'no' && (
                  <div className="text-xs text-gray-600 mt-1">We'll assume you do not have a family history for now, but your result may be less accurate.</div>
                )}
              </div>
            )}
          </div>
          <div>
            <label className="block font-medium mb-1"><IconWeight />Weight</label>
            <div className="text-xs text-gray-600 mb-1">Are you overweight? (Carrying extra weight, especially around your belly, increases risk.)</div>
            <select name="weight" value={form.weight} onChange={handleChange} required className="w-full border rounded px-3 py-2">
              <option value="">Select</option>
              <option value="normal">No, my weight is normal</option>
              <option value="overweight">Yes, I am overweight</option>
              <option value="unsure">I'm not sure</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1"><IconActivity />Physical activity</label>
            <div className="text-xs text-gray-600 mb-1">Do you get at least 30 minutes of exercise most days? (Walking, dancing, gardening, etc.)</div>
            <select name="activity" value={form.activity} onChange={handleChange} required className="w-full border rounded px-3 py-2">
              <option value="">Select</option>
              <option value="high">Yes, I am active</option>
              <option value="low">No, I am not very active</option>
              <option value="unsure">I'm not sure</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1"><IconBloodPressure />Blood Pressure <Tooltip text="High blood pressure increases your risk of diabetes." /></label>
            <div className="text-xs text-gray-600 mb-1">Has a doctor ever said your blood pressure is high, or that your heart works too hard to pump blood?</div>
            <select name="bloodPressure" value={form.bloodPressure} onChange={handleChange} required className="w-full border rounded px-3 py-2">
              <option value="">Select</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1"><IconCholesterol />Cholesterol <Tooltip text="High cholesterol means too much cholesterol in your blood, which can increase your risk." /></label>
            <div className="text-xs text-gray-600 mb-1">Cholesterol is like oil or fat in your blood. Too much can block your blood vessels. Has a doctor ever told you that you have high cholesterol, or that you have too much fat or oil in your blood?</div>
            <select name="cholesterol" value={form.cholesterol} onChange={handleChange} required className="w-full border rounded px-3 py-2">
              <option value="">Select</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="unsure">I'm not sure</option>
            </select>
            {showCholesterolFollowup && (
              <div className="mt-2 ml-2 p-2 bg-blue-50 rounded">
                <label className="block text-sm mb-1">Has a doctor ever told you that you have high cholesterol, or that you have too much fat or oil in your blood?</label>
                <select name="unsureCholesterol" value={form.unsureCholesterol} onChange={handleChange} className="w-full border rounded px-2 py-1">
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No / Not sure</option>
                </select>
                {form.unsureCholesterol === 'no' && (
                  <div className="text-xs text-gray-600 mt-1">We'll assume you do not have high cholesterol for now, but your result may be less accurate.</div>
                )}
              </div>
            )}
          </div>
          {form.gender === 'female' && (
            <div>
              <label className="block font-medium mb-1"><IconGestational />Gestational diabetes (for women)</label>
              <div className="text-xs text-gray-600 mb-1">Gestational diabetes is diabetes that happens during pregnancy. Has a doctor ever told you that you had high blood sugar or diabetes during pregnancy?</div>
              <select name="gestational" value={form.gestational} onChange={handleChange} className="w-full border rounded px-3 py-2">
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="unsure">I'm not sure</option>
              </select>
              {showGestationalFollowup && (
                <div className="mt-2 ml-2 p-2 bg-blue-50 rounded">
                  <label className="block text-sm mb-1">Has a doctor ever told you that you had high blood sugar or diabetes during pregnancy?</label>
                  <select name="unsureGestational" value={form.unsureGestational} onChange={handleChange} className="w-full border rounded px-2 py-1">
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No / Not sure</option>
                  </select>
                  {form.unsureGestational === 'no' && (
                    <div className="text-xs text-gray-600 mt-1">We'll assume you did not have gestational diabetes for now, but your result may be less accurate.</div>
                  )}
                </div>
              )}
            </div>
          )}
          <button type="submit" className="w-full bg-[#005eb8] text-white py-2 rounded font-bold hover:bg-[#004b93] transition-colors">Calculate Risk</button>
        </form>
        {result && (
          <div className="mt-6 p-4 rounded bg-blue-50 border border-blue-200 text-blue-800 text-center">
            <span className="font-bold">Your estimated risk: </span>{result}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiabetesRiskAssessmentPage; 