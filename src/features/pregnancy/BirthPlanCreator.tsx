import React, { useState, useEffect } from 'react';

interface BirthPlanSection {
  id: string;
  title: string;
  options: {
    id: string;
    text: string;
    selected: boolean;
    customOption?: boolean;
  }[];
  allowCustom?: boolean;
  customText?: string;
}

interface BirthPlan {
  name: string;
  dueDate: string;
  careProvider: string;
  birthPlace: string;
  sections: BirthPlanSection[];
  additionalNotes: string;
}

const defaultBirthPlan: BirthPlan = {
  name: '',
  dueDate: '',
  careProvider: '',
  birthPlace: '',
  sections: [
    {
      id: 'atmosphere',
      title: 'Labor & Delivery Atmosphere',
      options: [
        { id: 'dim-lights', text: 'Dim lights', selected: false },
        { id: 'music', text: 'Bring my own music', selected: false },
        { id: 'quiet', text: 'Quiet environment', selected: false },
        { id: 'minimal-people', text: 'Minimal staff in the room', selected: false },
        { id: 'photos', text: 'Allow photos/videos', selected: false },
        { id: 'move-freely', text: 'Freedom to move around', selected: false }
      ],
      allowCustom: true,
      customText: ''
    },
    {
      id: 'support',
      title: 'Labor Support',
      options: [
        { id: 'partner', text: 'Partner present', selected: false },
        { id: 'doula', text: 'Doula present', selected: false },
        { id: 'family', text: 'Family members present', selected: false },
        { id: 'friends', text: 'Friends present', selected: false },
        { id: 'children', text: 'Children present', selected: false }
      ],
      allowCustom: true,
      customText: ''
    },
    {
      id: 'pain-management',
      title: 'Pain Management Preferences',
      options: [
        { id: 'natural', text: 'Natural birth (no pain medication)', selected: false },
        { id: 'epidural', text: 'Epidural', selected: false },
        { id: 'nitrous', text: 'Nitrous oxide', selected: false },
        { id: 'iv-meds', text: 'IV pain medication', selected: false },
        { id: 'breathing', text: 'Breathing techniques', selected: false },
        { id: 'massage', text: 'Massage', selected: false },
        { id: 'water', text: 'Water therapy/shower', selected: false },
        { id: 'tens', text: 'TENS unit', selected: false },
        { id: 'hypnobirthing', text: 'Hypnobirthing techniques', selected: false },
        { id: 'open-pain', text: 'Open to pain management as needed', selected: false }
      ],
      allowCustom: true,
      customText: ''
    },
    {
      id: 'labor-interventions',
      title: 'Labor Interventions',
      options: [
        { id: 'induction-avoid', text: 'Prefer to avoid induction unless medically necessary', selected: false },
        { id: 'induction-open', text: 'Open to induction if recommended', selected: false },
        { id: 'membrane-avoid', text: 'Prefer to avoid membrane sweeping/breaking', selected: false },
        { id: 'membrane-open', text: 'Open to membrane sweeping/breaking', selected: false },
        { id: 'pitocin-avoid', text: 'Prefer to avoid Pitocin unless necessary', selected: false },
        { id: 'pitocin-open', text: 'Open to Pitocin if labor is slow', selected: false },
        { id: 'monitoring-intermittent', text: 'Prefer intermittent monitoring', selected: false },
        { id: 'monitoring-continuous', text: 'Okay with continuous monitoring', selected: false },
        { id: 'iv-avoid', text: 'Prefer to avoid IV if possible', selected: false },
        { id: 'iv-heplock', text: 'Prefer heplock instead of IV', selected: false }
      ],
      allowCustom: true,
      customText: ''
    },
    {
      id: 'delivery',
      title: 'Delivery Preferences',
      options: [
        { id: 'position-choice', text: 'Freedom to choose delivery position', selected: false },
        { id: 'position-upright', text: 'Prefer upright delivery position', selected: false },
        { id: 'mirror', text: 'Would like a mirror to see birth', selected: false },
        { id: 'touch-baby', text: 'Would like to touch baby\'s head during crowning', selected: false },
        { id: 'episiotomy-avoid', text: 'Prefer to avoid episiotomy unless necessary', selected: false },
        { id: 'vacuum-avoid', text: 'Prefer to avoid vacuum/forceps unless necessary', selected: false },
        { id: 'placenta-natural', text: 'Prefer natural delivery of placenta', selected: false },
        { id: 'cord-delayed', text: 'Delayed cord clamping', selected: false },
        { id: 'cord-partner', text: 'Partner to cut cord', selected: false }
      ],
      allowCustom: true,
      customText: ''
    },
    {
      id: 'c-section',
      title: 'In Case of C-Section',
      options: [
        { id: 'partner-present', text: 'Partner present during procedure', selected: false },
        { id: 'screen-lowered', text: 'Screen lowered to see baby born', selected: false },
        { id: 'narrate', text: 'Narration of the procedure', selected: false },
        { id: 'skin-to-skin-or', text: 'Skin-to-skin in operating room if possible', selected: false },
        { id: 'photos-or', text: 'Photos of birth if possible', selected: false },
        { id: 'delayed-bath-cs', text: 'Delayed newborn bath', selected: false },
        { id: 'breastfeed-recovery', text: 'Breastfeed in recovery room', selected: false }
      ],
      allowCustom: true,
      customText: ''
    },
    {
      id: 'newborn-care',
      title: 'Newborn Care',
      options: [
        { id: 'skin-to-skin', text: 'Immediate skin-to-skin contact', selected: false },
        { id: 'delayed-bath', text: 'Delayed newborn bath', selected: false },
        { id: 'breastfeed-immediate', text: 'Immediate breastfeeding', selected: false },
        { id: 'formula-avoid', text: 'No formula unless medically necessary', selected: false },
        { id: 'rooming-in', text: 'Baby to stay in room with parents', selected: false },
        { id: 'pacifier-avoid', text: 'No pacifiers', selected: false },
        { id: 'circumcision-yes', text: 'Plan to circumcise (if male)', selected: false },
        { id: 'circumcision-no', text: 'Do not plan to circumcise (if male)', selected: false },
        { id: 'visitors-limited', text: 'Limited visitors', selected: false },
        { id: 'siblings-visit', text: 'Siblings to visit', selected: false }
      ],
      allowCustom: true,
      customText: ''
    },
    {
      id: 'feeding',
      title: 'Feeding Plans',
      options: [
        { id: 'breastfeeding', text: 'Exclusively breastfeeding', selected: false },
        { id: 'formula', text: 'Formula feeding', selected: false },
        { id: 'combination', text: 'Combination feeding', selected: false },
        { id: 'lactation-consultant', text: 'Would like to see a lactation consultant', selected: false },
        { id: 'pump', text: 'Plan to pump', selected: false }
      ],
      allowCustom: true,
      customText: ''
    }
  ],
  additionalNotes: ''
};

const BirthPlanCreator: React.FC = () => {
  const [birthPlan, setBirthPlan] = useState<BirthPlan>(() => {
    const savedPlan = localStorage.getItem('birthPlan');
    return savedPlan ? JSON.parse(savedPlan) : defaultBirthPlan;
  });

  const [activeSection, setActiveSection] = useState<string>('basic');
  const [exportFormat, setExportFormat] = useState<'pdf' | 'text'>('pdf');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  // Save to localStorage whenever birth plan changes
  useEffect(() => {
    localStorage.setItem('birthPlan', JSON.stringify(birthPlan));
  }, [birthPlan]);

  // Update basic info
  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBirthPlan({
      ...birthPlan,
      [e.target.name]: e.target.value
    });
  };

  // Toggle an option selection
  const handleOptionToggle = (sectionId: string, optionId: string) => {
    setBirthPlan({
      ...birthPlan,
      sections: birthPlan.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            options: section.options.map(option => {
              if (option.id === optionId) {
                return {
                  ...option,
                  selected: !option.selected
                };
              }
              return option;
            })
          };
        }
        return section;
      })
    });
  };

  // Update custom text for a section
  const handleCustomTextChange = (sectionId: string, value: string) => {
    setBirthPlan({
      ...birthPlan,
      sections: birthPlan.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            customText: value
          };
        }
        return section;
      })
    });
  };

  // Add a custom option to a section
  const handleAddCustomOption = (sectionId: string, text: string) => {
    if (!text.trim()) return;

    setBirthPlan({
      ...birthPlan,
      sections: birthPlan.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            options: [
              ...section.options,
              {
                id: `custom-${Date.now()}`,
                text,
                selected: true,
                customOption: true
              }
            ],
            customText: ''
          };
        }
        return section;
      })
    });
  };

  // Reset to default plan
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your birth plan? This will delete all your selections.')) {
      setBirthPlan(defaultBirthPlan);
    }
  };

  // Export birth plan
  const handleExport = () => {
    if (exportFormat === 'pdf') {
      alert('PDF export functionality would be implemented here.');
      // In a real implementation, this would generate a PDF
    } else {
      // Create a text version
      let text = `BIRTH PLAN FOR ${birthPlan.name.toUpperCase()}\n\n`;
      text += `Due Date: ${birthPlan.dueDate}\n`;
      text += `Care Provider: ${birthPlan.careProvider}\n`;
      text += `Birth Place: ${birthPlan.birthPlace}\n\n`;

      birthPlan.sections.forEach(section => {
        text += `${section.title.toUpperCase()}:\n`;
        const selectedOptions = section.options.filter(opt => opt.selected);

        if (selectedOptions.length === 0) {
          text += '- No specific preferences\n';
        } else {
          selectedOptions.forEach(option => {
            text += `- ${option.text}\n`;
          });
        }

        if (section.customText) {
          text += `- ${section.customText}\n`;
        }

        text += '\n';
      });

      if (birthPlan.additionalNotes) {
        text += `ADDITIONAL NOTES:\n${birthPlan.additionalNotes}\n\n`;
      }

      text += 'Note: This birth plan expresses my preferences, but I understand that medical necessities may require changes.';

      // Create and download text file
      const element = document.createElement('a');
      const file = new Blob([text], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `Birth_Plan_${birthPlan.name.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  // Toggle preview mode
  const handleTogglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Calculate completion percentage
  const calculateCompletion = () => {
    // Basic info fields (5 points max)
    let completionPoints = 0;
    if (birthPlan.name) completionPoints += 1;
    if (birthPlan.dueDate) completionPoints += 1;
    if (birthPlan.careProvider) completionPoints += 1;
    if (birthPlan.birthPlace) completionPoints += 1;

    // Sections with selections (1 point per section with at least one selection)
    birthPlan.sections.forEach(section => {
      if (section.options.some(opt => opt.selected) || section.customText) {
        completionPoints += 1;
      }
    });

    // Maximum possible points: 5 basic + 8 sections = 13
    return Math.round((completionPoints / 13) * 100);
  };

  const completionPercentage = calculateCompletion();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Birth Plan Creator</h2>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Plan Completion</span>
            <span>{completionPercentage}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex justify-between mb-6">
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-[#005eb8] text-white rounded-md hover:bg-[#004c93]"
              onClick={handleTogglePreview}
            >
              {showPreview ? 'Edit Plan' : 'Preview Plan'}
            </button>
            <button
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
              onClick={handleReset}
            >
              Reset Plan
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <select
              className="px-3 py-2 border border-gray-300 rounded-md"
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'text')}
            >
              <option value="pdf">PDF Format</option>
              <option value="text">Text Format</option>
            </select>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={handleExport}
            >
              Export Plan
            </button>
          </div>
        </div>

        {showPreview ? (
          // Preview Mode
          <div className="border rounded-lg p-6 bg-gray-50">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Birth Plan for {birthPlan.name || '[Your Name]'}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="font-bold">Due Date:</span> {birthPlan.dueDate || '[Not specified]'}
              </div>
              <div>
                <span className="font-bold">Care Provider:</span> {birthPlan.careProvider || '[Not specified]'}
              </div>
              <div className="col-span-2">
                <span className="font-bold">Birth Place:</span> {birthPlan.birthPlace || '[Not specified]'}
              </div>
            </div>

            <div className="space-y-6">
              {birthPlan.sections.map(section => {
                const selectedOptions = section.options.filter(opt => opt.selected);

                return (
                  <div key={section.id} className="pb-4 border-b">
                    <h4 className="font-bold text-lg mb-2">{section.title}</h4>

                    {selectedOptions.length === 0 && !section.customText ? (
                      <p className="text-gray-500 italic">No preferences specified</p>
                    ) : (
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedOptions.map(option => (
                          <li key={option.id}>
                            {option.text}
                          </li>
                        ))}
                        {section.customText && <li>{section.customText}</li>}
                      </ul>
                    )}
                  </div>
                );
              })}

              {birthPlan.additionalNotes && (
                <div>
                  <h4 className="font-bold text-lg mb-2">Additional Notes</h4>
                  <p className="whitespace-pre-line">{birthPlan.additionalNotes}</p>
                </div>
              )}
            </div>

            <div className="mt-6 text-sm text-gray-500 italic text-center">
              This birth plan expresses my preferences, but I understand that medical necessities may require changes.
            </div>
          </div>
        ) : (
          // Edit Mode
          <div>
            {/* Section Navigation */}
            <div className="mb-6 border-b">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                <button
                  className={`pb-4 px-1 whitespace-nowrap ${
                    activeSection === 'basic'
                      ? 'border-b-2 border-[#005eb8] text-[#005eb8] font-medium'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveSection('basic')}
                >
                  Basic Information
                </button>

                {birthPlan.sections.map(section => (
                  <button
                    key={section.id}
                    className={`pb-4 px-1 whitespace-nowrap ${
                      activeSection === section.id
                        ? 'border-b-2 border-[#005eb8] text-[#005eb8] font-medium'
                        : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.title}
                  </button>
                ))}

                <button
                  className={`pb-4 px-1 whitespace-nowrap ${
                    activeSection === 'notes'
                      ? 'border-b-2 border-[#005eb8] text-[#005eb8] font-medium'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveSection('notes')}
                >
                  Additional Notes
                </button>
              </nav>
            </div>

            {/* Basic Information Form */}
            {activeSection === 'basic' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Basic Information</h3>

                <div>
                  <label className="block mb-2 font-medium">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="Enter your full name"
                    value={birthPlan.name}
                    onChange={handleBasicInfoChange}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={birthPlan.dueDate}
                    onChange={handleBasicInfoChange}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Care Provider</label>
                  <input
                    type="text"
                    name="careProvider"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Dr. Smith, Midwife Johnson"
                    value={birthPlan.careProvider}
                    onChange={handleBasicInfoChange}
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">Birth Place</label>
                  <input
                    type="text"
                    name="birthPlace"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    placeholder="e.g., Memorial Hospital, Birth Center, Home"
                    value={birthPlan.birthPlace}
                    onChange={handleBasicInfoChange}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-md mt-6">
                  <p className="text-blue-800">
                    <span className="font-bold">Tip:</span> Be sure to discuss your birth plan with your healthcare provider during prenatal visits to ensure it aligns with their practices and the facilities available at your chosen birth place.
                  </p>
                </div>
              </div>
            )}

            {/* Section Options */}
            {birthPlan.sections.map(section => {
              if (activeSection !== section.id) return null;

              return (
                <div key={section.id} className="space-y-4">
                  <h3 className="text-xl font-bold mb-4">{section.title}</h3>

                  <div className="space-y-2">
                    {section.options.map(option => (
                      <div key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={option.id}
                          className="h-5 w-5 text-[#005eb8] mr-3"
                          checked={option.selected}
                          onChange={() => handleOptionToggle(section.id, option.id)}
                        />
                        <label htmlFor={option.id} className="flex-grow">
                          {option.text}
                        </label>
                        {option.customOption && (
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => {
                              setBirthPlan({
                                ...birthPlan,
                                sections: birthPlan.sections.map(s => {
                                  if (s.id === section.id) {
                                    return {
                                      ...s,
                                      options: s.options.filter(o => o.id !== option.id)
                                    };
                                  }
                                  return s;
                                })
                              });
                            }}
                          >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {section.allowCustom && (
                    <div className="mt-4">
                      <label className="block mb-2 font-medium">Add a custom preference</label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          className="flex-grow px-4 py-2 border border-gray-300 rounded-md"
                          placeholder="Enter your custom preference"
                          value={section.customText || ''}
                          onChange={(e) => handleCustomTextChange(section.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && section.customText) {
                              handleAddCustomOption(section.id, section.customText);
                            }
                          }}
                        />
                        <button
                          className="px-4 py-2 bg-[#005eb8] text-white rounded-md hover:bg-[#004c93]"
                          onClick={() => handleAddCustomOption(section.id, section.customText || '')}
                          disabled={!section.customText}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-50 p-4 rounded-md mt-6">
                    <p className="text-blue-800">
                      <span className="font-bold">Tip:</span> {' '}
                      {section.id === 'atmosphere' && 'Consider the environment that will help you feel most comfortable during labor and delivery.'}
                      {section.id === 'support' && 'Think about who you want present during labor and delivery, and discuss their roles ahead of time.'}
                      {section.id === 'pain-management' && 'It\'s okay to be flexible about pain management. Many women change their minds during labor.'}
                      {section.id === 'labor-interventions' && 'Discuss these interventions with your provider beforehand to understand when they might be recommended.'}
                      {section.id === 'delivery' && 'Different delivery positions can help with comfort and pushing effectiveness.'}
                      {section.id === 'c-section' && 'Even if you\'re planning a vaginal delivery, it\'s good to have preferences ready in case a C-section becomes necessary.'}
                      {section.id === 'newborn-care' && 'Many routine procedures can be delayed to allow for immediate bonding with your baby.'}
                      {section.id === 'feeding' && 'Whatever your feeding choice, support is available to help you succeed.'}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Additional Notes */}
            {activeSection === 'notes' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Additional Notes</h3>
                <textarea
                  name="additionalNotes"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md h-48"
                  placeholder="Enter any additional notes, special requests, or concerns you want to communicate to your healthcare team..."
                  value={birthPlan.additionalNotes}
                  onChange={handleBasicInfoChange}
                />

                <div className="bg-blue-50 p-4 rounded-md mt-6">
                  <p className="text-blue-800">
                    <span className="font-bold">Tip:</span> Use this space for any special considerations not covered in the other sections. This could include cultural or religious practices, special medical conditions, or previous birth experiences that influence your current preferences.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-yellow-50 p-4 rounded-md">
        <h3 className="font-bold text-lg text-yellow-800 mb-2">Important Note</h3>
        <p className="text-yellow-800">
          While this birth plan helps communicate your preferences, it's important to remain flexible. Your healthcare providers may need to suggest different approaches based on how your labor progresses and to ensure the safety of you and your baby.
        </p>
        <p className="text-yellow-800 mt-2">
          Be sure to discuss your birth plan with your healthcare provider before your due date, and bring a printed copy to the hospital or birth center.
        </p>
      </div>
    </div>
  );
};

export default BirthPlanCreator;
