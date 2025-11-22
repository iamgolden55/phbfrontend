import React from 'react';
import { Link } from 'react-router-dom';

interface Medication {
  title: string;
  description: string;
  howItWorks: string;
  dosage: string;
  effectiveness: string;
  sideEffects: string[];
  contraindications: string[];
  tags?: string[];
}

const quitMedications: Medication[] = [
  {
    title: 'Varenicline (Champix)',
    description: 'The most effective prescription medication for smoking cessation. Reduces cravings and blocks nicotine effects.',
    howItWorks: 'Blocks nicotine receptors in the brain, reducing pleasure from smoking and withdrawal symptoms.',
    dosage: 'Start 1 week before quit date. 0.5mg daily for 3 days, then 0.5mg twice daily for 4 days, then 1mg twice daily.',
    effectiveness: '85% effective when combined with counseling',
    sideEffects: ['Nausea', 'Vivid dreams', 'Insomnia', 'Headache', 'Constipation'],
    contraindications: ['Severe kidney disease', 'History of seizures', 'Psychiatric disorders'],
    tags: ['Most effective', 'Prescription only']
  },
  {
    title: 'Bupropion (Zyban)',
    description: 'Antidepressant that helps reduce nicotine cravings and withdrawal symptoms.',
    howItWorks: 'Affects brain chemicals dopamine and norepinephrine to reduce cravings and withdrawal.',
    dosage: 'Start 1-2 weeks before quit date. 150mg daily for 3 days, then 150mg twice daily for 7-12 weeks.',
    effectiveness: '75% effective for smoking cessation',
    sideEffects: ['Dry mouth', 'Insomnia', 'Dizziness', 'Constipation', 'Anxiety'],
    contraindications: ['Seizure disorders', 'Eating disorders', 'Head injury', 'Liver disease'],
    tags: ['Also treats depression', 'Prescription only']
  }
];

const PrescriptionMedicationsPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="bg-[#0891b2] text-white py-8">
        <div className="phb-container">
          <nav className="text-sm mb-4">
            <Link to="/live-well" className="hover:underline">Live well</Link>
            <span className="mx-2">›</span>
            <Link to="/live-well/quit-smoking" className="hover:underline">Quit smoking</Link>
            <span className="mx-2">›</span>
            <span>Prescription medications</span>
          </nav>
          <h1 className="text-3xl font-bold mb-4">Prescription medications for quitting smoking</h1>
          <p className="text-xl font-medium">
            Effective medications that require a doctor's prescription to help you quit smoking
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        
        {/* Important medical notice */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-red-800">Important medical information</h2>
          <p className="mb-4 text-red-700">
            <strong>Prescription medications require careful medical supervision.</strong> Never start these medications without consulting a PHB healthcare provider first.
          </p>
          <p className="mb-4 text-red-700">
            These medications can interact with other drugs and may not be suitable for everyone. A medical assessment is essential before starting treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/account/appointments/book"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-center font-bold"
            >
              Book medical consultation
            </Link>
            <a
              href="tel:0800-QUIT-NOW"
              className="bg-[#0891b2] text-white px-4 py-2 rounded-md hover:bg-[#0e7490] transition-colors text-center font-bold"
            >
              PHB Quit Smoking Helpline
            </a>
          </div>
        </div>

        {/* Who can use prescription medications */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <h2 className="text-xl font-bold mb-2 text-blue-800">Who should consider prescription medications?</h2>
          <p className="mb-4 text-blue-700">
            Prescription quit-smoking medications are particularly helpful for people who:
          </p>
          <ul className="list-disc list-inside text-blue-700 mb-4 space-y-1">
            <li>Smoke 20 or more cigarettes per day</li>
            <li>Have tried to quit before but relapsed</li>
            <li>Experience severe withdrawal symptoms</li>
            <li>Cannot use nicotine replacement therapy</li>
            <li>Want the most effective treatment available</li>
          </ul>
          <p className="text-blue-700">
            These medications work best when combined with behavioral support and counseling.
          </p>
        </div>

        {/* Prescription medications */}
        <h2 className="text-2xl font-bold mb-6">Available prescription medications</h2>
        <div className="space-y-8 mb-12">
          {quitMedications.map((medication, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-[#0891b2]">{medication.title}</h3>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  {medication.effectiveness}
                </span>
              </div>
              
              <p className="text-gray-600 mb-6">{medication.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">How it works:</h4>
                    <p className="text-sm text-gray-600">{medication.howItWorks}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Typical dosage:</h4>
                    <p className="text-sm text-gray-600">{medication.dosage}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Common side effects:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {medication.sideEffects.map((effect, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Who should not use:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {medication.contraindications.map((contra, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                          {contra}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {medication.tags && medication.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {medication.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Treatment process */}
        <h2 className="text-2xl font-bold mb-6">The prescription medication process</h2>
        <div className="bg-[#f0f4f5] p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-[#0891b2] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Medical Assessment</h3>
              <p className="text-sm text-gray-600">
                Doctor evaluates your health, smoking history, and medication suitability.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#0891b2] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">Prescription & Planning</h3>
              <p className="text-sm text-gray-600">
                Receive prescription and set quit date. Start medication as directed.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#0891b2] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">Monitoring & Support</h3>
              <p className="text-sm text-gray-600">
                Regular check-ups to monitor progress and adjust treatment as needed.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-[#0891b2] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                4
              </div>
              <h3 className="font-bold mb-2">Completion</h3>
              <p className="text-sm text-gray-600">
                Complete full course of treatment and transition to maintenance support.
              </p>
            </div>
          </div>
        </div>

        {/* Safety information */}
        <h2 className="text-2xl font-bold mb-6">Safety and side effect management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-yellow-800">Managing side effects</h3>
            <ul className="text-sm text-yellow-700 space-y-2">
              <li>• Most side effects are mild and temporary</li>
              <li>• Take medication with food to reduce nausea</li>
              <li>• Stay hydrated and maintain regular sleep schedule</li>
              <li>• Report severe or persistent side effects immediately</li>
              <li>• Never stop medication suddenly without medical advice</li>
            </ul>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 text-red-800">When to seek immediate help</h3>
            <ul className="text-sm text-red-700 space-y-2">
              <li>• Thoughts of self-harm or suicide</li>
              <li>• Severe mood changes or depression</li>
              <li>• Seizures or unusual behavior</li>
              <li>• Severe allergic reactions</li>
              <li>• Chest pain or heart palpitations</li>
            </ul>
            <p className="text-sm text-red-700 mt-4 font-semibold">
              Call 112 immediately for serious side effects
            </p>
          </div>
        </div>

        {/* Cost and availability */}
        <h2 className="text-2xl font-bold mb-6">Getting prescription medications in Nigeria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Through PHB Health Centers</h3>
            <p className="mb-4">
              Subsidized medications available with sliding scale fees. Includes medical monitoring and counseling support.
            </p>
            <Link
              to="/find-pharmacy"
              className="phb-button inline-block"
            >
              Find nearest PHB center
            </Link>
          </div>

          <div className="bg-[#f0f4f5] p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Private Healthcare</h3>
            <p className="mb-4">
              Available through private doctors and specialists. May be covered by health insurance plans.
            </p>
            <Link
              to="/account/appointments/book"
              className="phb-button inline-block"
            >
              Book private consultation
            </Link>
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-[#0891b2] text-white p-8 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to explore prescription options?</h2>
            <p className="mb-6">
              Book a consultation with a PHB healthcare provider to discuss whether prescription medications are right for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/account/appointments/book"
                className="bg-white text-[#0891b2] px-6 py-3 rounded-md hover:bg-gray-100 transition-colors inline-block font-bold"
              >
                Book medical consultation
              </Link>
              <a
                href="tel:0800-QUIT-NOW"
                className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors inline-block font-bold"
              >
                Call quit line: 0800-QUIT-NOW
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionMedicationsPage;