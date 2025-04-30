import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getConditionById, HealthCondition } from '../features/health/healthConditionsData';

const HealthConditionPage: React.FC = () => {
  const { conditionSlug } = useParams<{ conditionSlug: string }>();

  // Get condition data based on the slug parameter
  const condition = conditionSlug ? getConditionById(conditionSlug) : null;

  if (!condition) {
    return (
      <div className="bg-white">
        <div className="bg-[#005eb8] text-white py-8">
          <div className="phb-container">
            <h1 className="text-3xl font-bold mb-4">Condition not found</h1>
          </div>
        </div>
        <div className="phb-container py-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-yellow-700">
              Sorry, we couldn't find information about this condition.
            </p>
          </div>
          <Link to="/health-a-z" className="phb-link">
            Return to Health A-Z
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#005eb8] text-white py-8">
        <div className="phb-container">
          <div className="flex items-center gap-2 mb-4">
            <Link to="/health-a-z" className="text-white hover:underline">
              Health A-Z
            </Link>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span>{condition.name}</span>
          </div>
          <h1 className="text-3xl font-bold">{condition.name}</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="phb-container py-8">
        {/* Emergency warning if applicable */}
        {condition.emergencySigns && condition.emergencySigns.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-700">When to seek emergency help</h3>
                <div className="mt-2 text-red-700">
                  <ul className="list-disc pl-6 space-y-2">
                    {condition.emergencySigns.map((sign, index) => (
                      <li key={index}>{sign}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overview */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">About {condition.name}</h2>
          <p className="text-lg mb-4">{condition.description}</p>

          {condition.prevalence && (
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <p className="font-medium text-blue-800">{condition.prevalence}</p>
            </div>
          )}
        </section>

        {/* Table of contents */}
        <section className="mb-8 bg-gray-50 p-6 rounded-md">
          <h2 className="text-xl font-bold mb-4">On this page</h2>
          <ul className="space-y-2">
            <li>
              <a href="#symptoms" className="phb-link">Symptoms</a>
            </li>
            <li>
              <a href="#causes" className="phb-link">Causes</a>
            </li>
            <li>
              <a href="#treatments" className="phb-link">Treatments</a>
            </li>
            <li>
              <a href="#prevention" className="phb-link">Prevention</a>
            </li>
            {condition.commonQuestions && condition.commonQuestions.length > 0 && (
              <li>
                <a href="#questions" className="phb-link">Common questions</a>
              </li>
            )}
            {condition.relatedConditions && condition.relatedConditions.length > 0 && (
              <li>
                <a href="#related" className="phb-link">Related conditions</a>
              </li>
            )}
            {condition.affectedGroups && condition.affectedGroups.length > 0 && (
              <li>
                <a href="#affected-groups" className="phb-link">Affected groups</a>
              </li>
            )}
          </ul>
        </section>

        {/* Symptoms */}
        <section id="symptoms" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Symptoms of {condition.name}</h2>
          <p className="mb-4">Common symptoms of {condition.name.toLowerCase()} include:</p>
          <ul className="list-disc pl-6 space-y-2">
            {condition.symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
        </section>

        {/* Causes */}
        <section id="causes" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Causes of {condition.name}</h2>
          <p className="mb-4">{condition.name} can be caused or triggered by:</p>
          <ul className="list-disc pl-6 space-y-2">
            {condition.causes.map((cause, index) => (
              <li key={index}>{cause}</li>
            ))}
          </ul>
        </section>

        {/* Treatments */}
        <section id="treatments" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Treatments for {condition.name}</h2>
          <p className="mb-4">Treatment options for {condition.name.toLowerCase()} include:</p>
          <ul className="list-disc pl-6 space-y-2">
            {condition.treatments.map((treatment, index) => (
              <li key={index}>{treatment}</li>
            ))}
          </ul>
        </section>

        {/* Prevention */}
        <section id="prevention" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Prevention and management</h2>
          <p className="mb-4">Ways to manage and prevent {condition.name.toLowerCase()} symptoms:</p>
          <ul className="list-disc pl-6 space-y-2">
            {condition.preventions.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </section>

        {/* Common Questions */}
        {condition.commonQuestions && condition.commonQuestions.length > 0 && (
          <section id="questions" className="mb-8 scroll-mt-4">
            <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Common questions about {condition.name}</h2>
            <div className="space-y-6">
              {condition.commonQuestions.map((qa, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-bold mb-2">{qa.question}</h3>
                  <p>{qa.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related conditions */}
        {condition.relatedConditions && condition.relatedConditions.length > 0 && (
          <section id="related" className="mb-8 scroll-mt-4">
            <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Related conditions</h2>
            <p className="mb-4">Conditions that are often associated with {condition.name.toLowerCase()}:</p>
            <ul className="list-disc pl-6 space-y-2">
              {condition.relatedConditions.map((relatedCondition, index) => (
                <li key={index}>
                  <Link to={`/health-a-z/${relatedCondition}`} className="phb-link">
                    {relatedCondition.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Affected Groups */}
        {condition.affectedGroups && condition.affectedGroups.length > 0 && (
          <section id="affected-groups" className="mb-8 scroll-mt-4">
            <h2 className="text-2xl font-bold mb-4 text-[#005eb8]">Who is affected by {condition.name}</h2>
            <p className="mb-4">{condition.name} commonly affects:</p>
            <ul className="list-disc pl-6 space-y-2">
              {condition.affectedGroups.map((group, index) => (
                <li key={index}>{group}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Extra Info and Vaccine Links (if present) */}
        {condition.extraInfo && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-md">
            <p className="text-blue-900 font-medium">{condition.extraInfo}</p>
          </div>
        )}
        {condition.moreInfoLinks && condition.moreInfoLinks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 text-[#005eb8]">Related links</h2>
            <ul className="space-y-2">
              {condition.moreInfoLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.url} className="phb-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Further resources */}
        <section className="bg-gray-50 p-6 rounded-md">
          <h2 className="text-xl font-bold mb-4">Further resources</h2>
          <p className="mb-4">For more information about {condition.name.toLowerCase()}, you may find these resources helpful:</p>
          <ul className="space-y-2">
            <li>
              <a href="#" className="phb-link">PHB guidelines for {condition.name}</a>
            </li>
            <li>
              <a href="#" className="phb-link">Find support groups for {condition.name}</a>
            </li>
            <li>
              <a href="#" className="phb-link">Latest research on {condition.name}</a>
            </li>
            <li>
              <a href="#" className="phb-link">Patient information leaflets</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default HealthConditionPage;
