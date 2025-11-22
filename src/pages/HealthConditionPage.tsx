import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getConditionById, HealthCondition } from '../features/health/healthConditionsData';

// Function to remove citation numbers [1] from text
const removeTextCitations = (text?: string) => {
  if (!text) return null;
  
  // Replace citation pattern [n] with empty string
  return text.replace(/\[(\d+)\]/g, '');
};

const HealthConditionPage: React.FC = () => {
  const { conditionSlug } = useParams<{ conditionSlug: string }>();

  // Get condition data based on the slug parameter
  const condition = conditionSlug ? getConditionById(conditionSlug) : null;

  if (!condition) {
    return (
      <div className="bg-white">
        <div className="bg-[#0891b2] text-white py-8">
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
      <div className="bg-[#0891b2] text-white py-8">
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
        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Disclaimer:</strong> All health information provided is for reading and educational purposes only. If you take any action based on this information, including medication decisions or self-diagnosis, PHB shall not be held liable. Always consult with a qualified healthcare professional before making health-related decisions.
              </p>
            </div>
          </div>
        </div>
        {/* Emergency warning section removed as requested */}

        {/* Two-column layout with sidebar */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar with "On this page" quick links */}
          <div className="md:w-1/4 order-2 md:order-1">
            <div className="sticky top-4 bg-gray-50 p-5 rounded-md border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-[#0891b2]">On this page</h2>
              <ul className="space-y-3">
                <li>
                  <a href="#symptoms" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                    <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Symptoms
                  </a>
                </li>
                <li>
                  <a href="#causes" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                    <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Causes
                  </a>
                </li>
                <li>
                  <a href="#treatments" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                    <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Treatments
                  </a>
                </li>
                <li>
                  <a href="#prevention" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                    <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    Prevention
                  </a>
                </li>
                {condition.commonQuestions && condition.commonQuestions.length > 0 && (
                  <li>
                    <a href="#questions" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                      <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Common questions
                    </a>
                  </li>
                )}
                {condition.affectedGroups && condition.affectedGroups.length > 0 && (
                  <li>
                    <a href="#affected-groups" className="flex items-center text-blue-700 hover:text-blue-900 hover:underline">
                      <svg className="h-3 w-3 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Affected groups
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Main content area */}
          <div className="md:w-3/4 order-1 md:order-2">
            {/* Overview */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About {condition.name}</h2>
              <p className="text-lg mb-4">
                {removeTextCitations(condition.description)}
              </p>
              
              {/* Citation message */}
              <div className="bg-gray-50 border-l-4 border-blue-300 p-3 mb-4 text-sm">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>For references and citations, please scroll to the bottom of the page.</p>
                </div>
              </div>

              {condition.prevalence && (
                <div className="bg-blue-50 p-4 rounded-md mb-4">
                  <p className="font-medium text-blue-800">{removeTextCitations(condition.prevalence)}</p>
                </div>
              )}
            </section>

            {/* Symptoms */}
            <section id="symptoms" className="mb-8 scroll-mt-4">
              <h2 className="text-2xl font-bold mb-4 text-[#0891b2]">Symptoms of {condition.name}</h2>
              <p className="mb-4">Common symptoms of {condition.name.toLowerCase()} include:</p>
              <ul className="list-disc pl-6 space-y-2">
                {condition.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </section>

            {/* Causes */}
            <section id="causes" className="mb-8 scroll-mt-4">
              <h2 className="text-2xl font-bold mb-4 text-[#0891b2]">Causes of {condition.name}</h2>
              <p className="mb-4">{condition.name} can be caused or triggered by:</p>
              <ul className="list-disc pl-6 space-y-2">
                {condition.causes.map((cause, index) => (
                  <li key={index}>{cause}</li>
                ))}
              </ul>
            </section>

            {/* Treatments */}
            <section id="treatments" className="mb-8 scroll-mt-4">
              <h2 className="text-2xl font-bold mb-4 text-[#0891b2]">Treatments for {condition.name}</h2>
              <p className="mb-4">Treatment options for {condition.name.toLowerCase()} include:</p>
              <ul className="list-disc pl-6 space-y-2">
                {condition.treatments.map((treatment, index) => (
                  <li key={index}>{treatment}</li>
                ))}
              </ul>
            </section>

            {/* Prevention */}
            <section id="prevention" className="mb-8 scroll-mt-4">
              <h2 className="text-2xl font-bold mb-4 text-[#0891b2]">Prevention and management</h2>
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
                <h2 className="text-2xl font-bold mb-4 text-[#0891b2]">Common questions about {condition.name}</h2>
                <div className="space-y-4">
                  {condition.commonQuestions.map((qa, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h3 className="font-bold mb-2">{qa.question}</h3>
                      <p>{qa.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Affected Groups */}
            {condition.affectedGroups && condition.affectedGroups.length > 0 && (
              <section id="affected-groups" className="mb-8 scroll-mt-4">
                <h2 className="text-2xl font-bold mb-4 text-[#0891b2]">Who is affected by {condition.name}</h2>
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
                <h2 className="text-xl font-bold mb-2 text-[#0891b2]">Related links</h2>
                <ul className="space-y-2">
                  {condition.moreInfoLinks.map((link, idx) => (
                    <li key={idx}>
                      <Link to={link.url} className="phb-link">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Wikipedia and References */}
            {condition.wikipediaUrl && (
              <section className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-[#0891b2]">Sources & References</h2>
                <p className="mb-4">This information is based on data from reliable medical sources including <a href={condition.wikipediaUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Wikipedia</a>. <a href="#references" className="text-blue-600 hover:underline">View all references</a>.</p>
                <a 
                  href={condition.wikipediaUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center mb-6 bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded-md transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  View on Wikipedia
                </a>
                
                {condition.references && condition.references.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-3" id="references">Scientific References</h3>
                    <div className="border border-gray-200 rounded-md overflow-hidden">
                      {condition.references.map((reference, index) => (
                        <div 
                          key={reference.id} 
                          className={`p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                          id={`reference-${reference.id}`}
                        >
                          <div className="flex">
                            <span className="font-semibold mr-2">[{reference.id}]</span>
                            <div>
                              <span>{reference.text}</span>
                              {reference.url && (
                                <div className="mt-1">
                                  <a 
                                    href={reference.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-sm inline-flex items-center"
                                  >
                                    View source
                                    <svg className="h-3 w-3 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                    </svg>
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
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
      </div>
    </div>
  );
};

export default HealthConditionPage;
