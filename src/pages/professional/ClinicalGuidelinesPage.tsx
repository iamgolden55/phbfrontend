import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

interface Guideline {
  id: number;
  title: string;
  category: string;
  lastUpdated: string;
  summary: string;
  content?: string;
}

const ClinicalGuidelinesPage: React.FC = () => {
  // State for selected guideline and search term
  const [selectedGuidelineId, setSelectedGuidelineId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy data for guidelines
  const guidelines: Guideline[] = [
    {
      id: 1,
      title: 'Hypertension Management in Adults',
      category: 'Cardiovascular',
      lastUpdated: 'May 15, 2023',
      summary: 'Updated guidelines for the management of hypertension in adults.',
      content: `
        <h3>Summary</h3>
        <p>These guidelines provide evidence-based recommendations for the diagnosis and management of hypertension in adults.</p>

        <h3>Key Recommendations</h3>
        <ul>
          <li>Confirm hypertension diagnosis with ambulatory or home blood pressure monitoring</li>
          <li>Initiate lifestyle modifications for all patients</li>
          <li>Consider pharmacological treatment for patients with blood pressure consistently ≥140/90 mmHg</li>
          <li>First-line medications include ACE inhibitors, ARBs, calcium channel blockers, and thiazide diuretics</li>
          <li>Target blood pressure should be <140/90 mmHg for most adults, with consideration for <130/80 mmHg in higher risk patients</li>
        </ul>

        <h3>Lifestyle Modifications</h3>
        <ul>
          <li>Reduce dietary sodium intake to <2.3g/day</li>
          <li>Follow DASH diet rich in fruits, vegetables, and low-fat dairy products</li>
          <li>Regular physical activity (150 minutes of moderate-intensity exercise per week)</li>
          <li>Limit alcohol consumption</li>
          <li>Maintain healthy weight (BMI 18.5-24.9)</li>
        </ul>

        <h3>Monitoring and Follow-up</h3>
        <p>Patients should be evaluated for medication efficacy and adverse effects within 2-4 weeks of starting treatment. Blood pressure targets should be achieved within 3 months, with adjustments to medication regimens as needed.</p>
      `
    },
    {
      id: 2,
      title: 'Type 2 Diabetes Screening and Management',
      category: 'Endocrinology',
      lastUpdated: 'April 10, 2023',
      summary: 'Guidelines for screening, diagnosis, and management of type 2 diabetes.',
      content: `
        <h3>Summary</h3>
        <p>These guidelines provide evidence-based recommendations for the screening, diagnosis, and management of type 2 diabetes.</p>

        <h3>Screening Recommendations</h3>
        <ul>
          <li>Screen adults aged 35-70 years with overweight or obesity (BMI ≥25)</li>
          <li>Consider earlier screening for high-risk populations (family history, gestational diabetes history, etc.)</li>
          <li>Screening tests include fasting plasma glucose, 2-hour plasma glucose after OGTT, or HbA1c</li>
        </ul>

        <h3>Diagnostic Criteria</h3>
        <ul>
          <li>Fasting plasma glucose ≥7.0 mmol/L (126 mg/dL)</li>
          <li>2-hour plasma glucose ≥11.1 mmol/L (200 mg/dL) during OGTT</li>
          <li>HbA1c ≥6.5% (48 mmol/mol)</li>
          <li>Random plasma glucose ≥11.1 mmol/L (200 mg/dL) with symptoms</li>
        </ul>

        <h3>Management</h3>
        <ul>
          <li>Lifestyle modifications (diet, exercise, weight management)</li>
          <li>Metformin as first-line pharmacological therapy</li>
          <li>Consider early combination therapy in patients with HbA1c ≥9%</li>
          <li>Target HbA1c <7% for most patients, with individualization based on comorbidities</li>
        </ul>
      `
    },
    {
      id: 3,
      title: 'Asthma Management in Children and Adolescents',
      category: 'Respiratory',
      lastUpdated: 'March 5, 2023',
      summary: 'Updated guidelines for the diagnosis and management of asthma in pediatric patients.',
      content: `
        <h3>Summary</h3>
        <p>These guidelines provide evidence-based recommendations for the diagnosis and management of asthma in children and adolescents.</p>

        <h3>Diagnosis</h3>
        <ul>
          <li>Diagnosis based on history of respiratory symptoms and evidence of variable airflow limitation</li>
          <li>Consider alternative diagnoses, especially in children under 5 years</li>
          <li>Spirometry recommended for children ≥5 years to confirm diagnosis</li>
        </ul>

        <h3>Classification of Severity</h3>
        <ul>
          <li>Intermittent: Symptoms <2 days/week, nocturnal symptoms <2 times/month</li>
          <li>Mild persistent: Symptoms >2 days/week but not daily, nocturnal symptoms 3-4 times/month</li>
          <li>Moderate persistent: Daily symptoms, nocturnal symptoms >1 time/week</li>
          <li>Severe persistent: Symptoms throughout the day, frequent nocturnal symptoms</li>
        </ul>

        <h3>Treatment</h3>
        <ul>
          <li>Step-wise approach based on age and asthma severity</li>
          <li>Inhaled corticosteroids are the cornerstone of controller therapy</li>
          <li>Short-acting beta-agonists for quick relief</li>
          <li>Regular follow-up to adjust therapy based on symptom control</li>
        </ul>
      `
    },
    {
      id: 4,
      title: 'Antibiotic Stewardship in Primary Care',
      category: 'Infectious Disease',
      lastUpdated: 'February 20, 2023',
      summary: 'Guidelines for appropriate antibiotic prescribing in primary care settings.',
      content: `
        <h3>Summary</h3>
        <p>These guidelines provide recommendations for appropriate antibiotic prescribing in primary care to reduce antimicrobial resistance.</p>

        <h3>Key Principles</h3>
        <ul>
          <li>Prescribe antibiotics only when clinically indicated</li>
          <li>Use narrow-spectrum antibiotics when appropriate</li>
          <li>Consider delayed prescribing strategies for uncertain indications</li>
          <li>Educate patients about appropriate antibiotic use and antimicrobial resistance</li>
        </ul>

        <h3>Common Infections and Recommendations</h3>
        <h4>Acute Pharyngitis</h4>
        <ul>
          <li>Use clinical criteria or rapid antigen detection test to identify Group A Streptococcus</li>
          <li>Penicillin V remains first-line therapy for Group A Streptococcal pharyngitis</li>
        </ul>

        <h4>Acute Bronchitis</h4>
        <ul>
          <li>Antibiotics not routinely recommended for uncomplicated acute bronchitis</li>
          <li>Focus on symptom management and patient education</li>
        </ul>

        <h4>Acute Otitis Media</h4>
        <ul>
          <li>Consider watchful waiting for mild cases in children ≥2 years</li>
          <li>Amoxicillin remains first-line therapy when antibiotics are indicated</li>
        </ul>
      `
    },
    {
      id: 5,
      title: 'Depression Screening and Management',
      category: 'Mental Health',
      lastUpdated: 'January 15, 2023',
      summary: 'Guidelines for screening, diagnosis, and management of depression in primary care settings.',
      content: `
        <h3>Summary</h3>
        <p>These guidelines provide recommendations for depression screening, diagnosis, and management in primary care.</p>

        <h3>Screening</h3>
        <ul>
          <li>Screen all adults for depression using validated tools (PHQ-9, Beck Depression Inventory, etc.)</li>
          <li>Particular focus on high-risk populations (postpartum women, chronic medical conditions, etc.)</li>
          <li>Positive screens require comprehensive assessment to confirm diagnosis</li>
        </ul>

        <h3>Diagnosis</h3>
        <ul>
          <li>Diagnosis based on DSM-5 criteria</li>
          <li>Evaluate for suicidality, psychosis, and comorbid conditions</li>
          <li>Rule out medical conditions that can mimic depression</li>
        </ul>

        <h3>Treatment</h3>
        <ul>
          <li>Mild depression: Psychoeducation, support, monitoring, consider psychotherapy</li>
          <li>Moderate-severe depression: Pharmacotherapy, psychotherapy, or combination</li>
          <li>First-line antidepressants include SSRIs</li>
          <li>Regular follow-up to assess response and adjust treatment</li>
        </ul>
      `
    },
  ];

  // Filter guidelines based on search term
  const filteredGuidelines = guidelines.filter(
    guideline =>
      guideline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guideline.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guideline.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Find selected guideline
  const selectedGuideline = guidelines.find(g => g.id === selectedGuidelineId);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Helmet>
        <title>Clinical Guidelines | PHB Professional</title>
      </Helmet>

      <h1 className="text-3xl font-bold text-blue-800 mb-6">Clinical Guidelines</h1>

      {/* Search and filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search guidelines..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="material-icons absolute left-3 top-2.5 text-gray-400">search</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Guidelines List */}
        <div className={`lg:col-span-1 ${selectedGuidelineId ? 'hidden lg:block' : ''}`}>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Available Guidelines</h2>

            {filteredGuidelines.length === 0 ? (
              <p className="text-gray-500">No guidelines found matching your search.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredGuidelines.map(guideline => (
                  <li key={guideline.id} className="py-3">
                    <button
                      onClick={() => setSelectedGuidelineId(guideline.id)}
                      className={`w-full text-left hover:bg-blue-50 p-2 rounded transition ${
                        selectedGuidelineId === guideline.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <h3 className="font-medium text-blue-700">{guideline.title}</h3>
                      <p className="text-sm text-gray-500">Category: {guideline.category}</p>
                      <p className="text-sm text-gray-500">Updated: {guideline.lastUpdated}</p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Guideline Detail */}
        <div className={`lg:col-span-2 ${selectedGuidelineId ? '' : 'hidden lg:block'}`}>
          {selectedGuideline ? (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-blue-800">{selectedGuideline.title}</h2>
                <button
                  onClick={() => setSelectedGuidelineId(null)}
                  className="lg:hidden bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {selectedGuideline.category}
                </span>
                <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                  Last updated: {selectedGuideline.lastUpdated}
                </span>
              </div>

              <p className="text-gray-700 mb-6">{selectedGuideline.summary}</p>

              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedGuideline.content || '' }} />

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <span className="material-icons text-sm">download</span> Download PDF
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <span className="material-icons text-sm">print</span> Print
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <span className="material-icons text-gray-400 text-5xl mb-2">description</span>
              <h3 className="text-xl font-medium text-gray-600">Select a guideline to view details</h3>
              <p className="text-gray-500 mt-2">Choose from the list on the left to view the full clinical guideline.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClinicalGuidelinesPage;
