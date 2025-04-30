import React from 'react';
import { Link } from 'react-router-dom';

interface MedicineType {
  name: string;
  description: string;
  dosage: string;
  sideEffects: string[];
  warnings: string[];
}

const MedicinesAZPage: React.FC = () => {
  const commonMedicines: MedicineType[] = [
    {
      name: 'Paracetamol',
      description: 'Used to treat pain and fever. It\'s typically used for mild to moderate pain relief.',
      dosage: 'Adults and children 12 years and over: 500-1000mg every 4-6 hours when necessary, up to a maximum of 4g daily.',
      sideEffects: [
        'Side effects of paracetamol are rare but can include:',
        'Allergic reactions (very rare)',
        'Flushing, low blood pressure and increased heart rate (if given too rapidly by intravenous infusion)',
        'Liver and kidney damage (overdose)'
      ],
      warnings: [
        'Do not exceed the recommended dose',
        'Consult your doctor if you have liver or kidney problems',
        'Seek immediate medical attention in case of overdose'
      ]
    },
    {
      name: 'Ibuprofen',
      description: 'A nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain, reduce inflammation, and lower fever.',
      dosage: 'Adults and children over 12 years: 200-400mg every 4-6 hours, with a maximum of 1200mg in 24 hours.',
      sideEffects: [
        'Stomach pain or discomfort',
        'Heartburn',
        'Nausea or vomiting',
        'Headache',
        'Dizziness',
        'Allergic reactions (rare)'
      ],
      warnings: [
        'Not recommended for those with certain heart conditions',
        'Avoid if you have a history of stomach ulcers',
        'Not recommended during the third trimester of pregnancy',
        'Take with food to reduce stomach upset'
      ]
    },
    {
      name: 'Omeprazole',
      description: 'A proton pump inhibitor (PPI) that reduces the amount of acid produced in the stomach.',
      dosage: 'Adults: Usually 20-40mg once daily for 4-8 weeks, depending on the condition being treated.',
      sideEffects: [
        'Headache',
        'Stomach pain',
        'Diarrhea or constipation',
        'Nausea or vomiting',
        'Gas or flatulence'
      ],
      warnings: [
        'Long-term use may increase risk of bone fractures',
        'May interact with certain medications',
        'Discuss with your doctor if you need to take it for more than a few weeks',
        'Tell your doctor if you are taking other medicines'
      ]
    },
  ];

  return (
    <div className="bg-white">
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <h1 className="text-3xl font-bold mb-4">Medicines A to Z</h1>
          <p className="text-xl font-medium">
            Information about medicines, how they work, and possible side effects
          </p>
        </div>
      </div>

      <div className="phb-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-bold mb-4">About Medicines A to Z</h2>
              <p className="mb-4">
                Our Medicines A to Z provides information on prescription and over-the-counter medicines.
                You can find out about a medicine's side effects, how to take it safely, and what to expect.
              </p>
              <p>
                Always follow the instructions provided by your doctor or pharmacist and read the patient information
                leaflet that comes with your medicine. Contact your doctor or pharmacist if you have any concerns
                about your medicine.
              </p>
            </div>

            {/* Alphabet navigation */}
            <div className="flex flex-wrap gap-2 mb-8">
              {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map(letter => (
                <a
                  key={letter}
                  href={`#${letter}`}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  {letter}
                </a>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-6">Common Medicines</h2>

            {commonMedicines.map((medicine, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h3 className="text-xl font-bold text-[#005eb8] mb-4">{medicine.name}</h3>
                <div className="mb-4">
                  <h4 className="font-bold mb-2">What it's used for</h4>
                  <p>{medicine.description}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Usual dosage</h4>
                  <p>{medicine.dosage}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Common side effects</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    {medicine.sideEffects.map((effect, i) => (
                      <li key={i}>{effect}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-yellow-50 p-4 rounded-md border-l-4 border-yellow-400">
                  <h4 className="font-bold mb-2">Important warnings</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    {medicine.warnings.map((warning, i) => (
                      <li key={i}>{warning}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-4">
              <div className="bg-[#005eb8] text-white p-4">
                <h2 className="text-xl font-bold">Useful Information</h2>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-3">Related Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/health-a-z" className="text-[#005eb8] hover:underline">
                      Health A to Z
                    </Link>
                  </li>
                  <li>
                    <Link to="/phb-services#pharmacy" className="text-[#005eb8] hover:underline">
                      Find a pharmacy
                    </Link>
                  </li>
                  <li>
                    <a href="https://www.nhs.uk/medicines-information/" className="text-[#005eb8] hover:underline" target="_blank" rel="noopener noreferrer">
                      NHS medicines information
                    </a>
                  </li>
                </ul>

                <div className="mt-6 mb-4">
                  <h3 className="font-bold mb-3">Search for a medicine</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="medicine-search" className="block mb-1 font-medium">
                        Medicine name
                      </label>
                      <input
                        type="text"
                        id="medicine-search"
                        placeholder="Enter medicine name"
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-[#005eb8] text-white px-4 py-2 rounded hover:bg-[#003f7e] transition-colors w-full"
                    >
                      Search
                    </button>
                  </form>
                </div>

                <div className="bg-red-50 p-4 rounded-md">
                  <h3 className="font-bold text-red-800 mb-2">Important notice</h3>
                  <p className="text-sm text-red-700 mb-3">
                    This information is not a substitute for professional medical advice. Always consult a healthcare professional
                    before stopping or changing any medicines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicinesAZPage;
