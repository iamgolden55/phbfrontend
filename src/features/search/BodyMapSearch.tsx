import React, { useState, useEffect, useRef } from 'react';
import BodyModel3D from './BodyModel3D';

interface BodyPart {
  id: string;
  name: string;
  area: string;
  symptoms: string[];
  svgPath: string;
}

interface BodyMapSearchProps {
  onBodyPartSelect: (bodyPart: BodyPart) => void;
  onSymptomSelect?: (symptom: string, bodyPart: BodyPart) => void;
}

// History item interface for symptom tracking
interface HistoryItem {
  id: string;
  bodyPart: string;
  symptom: string;
  timestamp: number;
}

// Enhanced body parts with more detailed regions
const bodyParts: BodyPart[] = [
  {
    id: 'head',
    name: 'Head',
    area: 'Head and Neck',
    symptoms: [
      'Headache',
      'Migraine',
      'Dizziness',
      'Hearing loss',
      'Vision problems',
      'Sinus congestion',
      'Facial pain'
    ],
    svgPath: 'M160,60 a30,30 0 1,0 0.1,0 Z' // Head
  },
  {
    id: 'face',
    name: 'Face',
    area: 'Head and Neck',
    symptoms: [
      'Facial pain',
      'Swelling',
      'Numbness',
      'Rash',
      'Eye irritation',
      'Jaw pain',
      'Sinus pressure'
    ],
    svgPath: 'M140,60 a20,25 0 1,0 40,0 a20,25 0 1,0 -40,0 Z' // Face area
  },
  {
    id: 'neck',
    name: 'Neck',
    area: 'Head and Neck',
    symptoms: [
      'Sore throat',
      'Swollen glands',
      'Stiff neck',
      'Neck pain',
      'Difficulty swallowing',
      'Throat irritation'
    ],
    svgPath: 'M145,90 h30 v25 h-30 Z' // Neck
  },
  {
    id: 'chest',
    name: 'Chest',
    area: 'Torso',
    symptoms: [
      'Chest pain',
      'Shortness of breath',
      'Heart palpitations',
      'Persistent cough',
      'Breast pain',
      'Difficulty breathing',
      'Chest tightness'
    ],
    svgPath: 'M130,115 h60 v50 h-60 Z' // Chest
  },
  {
    id: 'upperAbdomen',
    name: 'Upper Abdomen',
    area: 'Torso',
    symptoms: [
      'Stomach pain',
      'Heartburn',
      'Indigestion',
      'Nausea',
      'Bloating',
      'Upper abdominal tenderness'
    ],
    svgPath: 'M130,165 h60 v25 h-60 Z' // Upper abdomen
  },
  {
    id: 'lowerAbdomen',
    name: 'Lower Abdomen',
    area: 'Torso',
    symptoms: [
      'Lower abdominal pain',
      'Bladder discomfort',
      'Constipation',
      'Diarrhea',
      'Menstrual cramps',
      'Pelvic pain'
    ],
    svgPath: 'M130,190 h60 v25 h-60 Z' // Lower abdomen
  },
  {
    id: 'leftShoulder',
    name: 'Left Shoulder',
    area: 'Extremities',
    symptoms: [
      'Shoulder pain',
      'Limited range of motion',
      'Joint stiffness',
      'Shoulder weakness',
      'Clicking or popping sensations'
    ],
    svgPath: 'M100,115 h30 v20 h-30 Z' // Left shoulder
  },
  {
    id: 'rightShoulder',
    name: 'Right Shoulder',
    area: 'Extremities',
    symptoms: [
      'Shoulder pain',
      'Limited range of motion',
      'Joint stiffness',
      'Shoulder weakness',
      'Clicking or popping sensations'
    ],
    svgPath: 'M190,115 h30 v20 h-30 Z' // Right shoulder
  },
  {
    id: 'leftArm',
    name: 'Left Arm',
    area: 'Extremities',
    symptoms: [
      'Arm pain',
      'Weakness',
      'Numbness or tingling',
      'Joint pain',
      'Limited range of motion',
      'Muscle spasms'
    ],
    svgPath: 'M100,135 h30 v80 h-30 Z' // Left arm
  },
  {
    id: 'rightArm',
    name: 'Right Arm',
    area: 'Extremities',
    symptoms: [
      'Arm pain',
      'Weakness',
      'Numbness or tingling',
      'Joint pain',
      'Limited range of motion',
      'Muscle spasms'
    ],
    svgPath: 'M190,135 h30 v80 h-30 Z' // Right arm
  },
  {
    id: 'leftHip',
    name: 'Left Hip',
    area: 'Extremities',
    symptoms: [
      'Hip pain',
      'Groin pain',
      'Limited mobility',
      'Joint stiffness',
      'Pain when walking'
    ],
    svgPath: 'M130,215 h30 v25 h-30 Z' // Left hip area
  },
  {
    id: 'rightHip',
    name: 'Right Hip',
    area: 'Extremities',
    symptoms: [
      'Hip pain',
      'Groin pain',
      'Limited mobility',
      'Joint stiffness',
      'Pain when walking'
    ],
    svgPath: 'M160,215 h30 v25 h-30 Z' // Right hip area
  },
  {
    id: 'leftLeg',
    name: 'Left Leg',
    area: 'Extremities',
    symptoms: [
      'Leg pain',
      'Swelling',
      'Muscle cramps',
      'Joint pain',
      'Difficulty walking',
      'Varicose veins',
      'Restless legs'
    ],
    svgPath: 'M130,240 h30 v75 h-30 Z' // Left leg
  },
  {
    id: 'rightLeg',
    name: 'Right Leg',
    area: 'Extremities',
    symptoms: [
      'Leg pain',
      'Swelling',
      'Muscle cramps',
      'Joint pain',
      'Difficulty walking',
      'Varicose veins',
      'Restless legs'
    ],
    svgPath: 'M160,240 h30 v75 h-30 Z' // Right leg
  },
  {
    id: 'upperBack',
    name: 'Upper Back',
    area: 'Back',
    symptoms: [
      'Upper back pain',
      'Stiffness',
      'Muscle spasms',
      'Between shoulder blade pain',
      'Posture-related discomfort'
    ],
    svgPath: 'M300,115 h60 v50 h-60 Z' // Upper back
  },
  {
    id: 'lowerBack',
    name: 'Lower Back',
    area: 'Back',
    symptoms: [
      'Lower back pain',
      'Sciatica',
      'Limited mobility',
      'Muscle spasms',
      'Pain radiating to buttocks or legs',
      'Stiffness'
    ],
    svgPath: 'M300,165 h60 v50 h-60 Z' // Lower back
  }
];

// Maximum number of history items to store
const MAX_HISTORY_ITEMS = 10;

// Local storage key for symptom history
const SYMPTOM_HISTORY_KEY = 'phb-symptom-history';

const BodyMapSearch: React.FC<BodyMapSearchProps> = ({ onBodyPartSelect, onSymptomSelect }) => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart | null>(null);
  const [hoveredBodyPart, setHoveredBodyPart] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState({ id: '', x: 0, y: 0, visible: false });
  const [symptomSearchTerm, setSymptomSearchTerm] = useState('');
  const [animating, setAnimating] = useState<string | null>(null);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [symptomHistory, setSymptomHistory] = useState<HistoryItem[]>([]);
  const [view3D, setView3D] = useState(false);

  // Ref for animation
  const animationRef = useRef<number | null>(null);

  // Load symptom history from local storage on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem(SYMPTOM_HISTORY_KEY);
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        setSymptomHistory(parsedHistory);
      } catch (error) {
        console.error('Error parsing symptom history:', error);
      }
    }
  }, []);

  const handleBodyPartClick = (bodyPart: BodyPart) => {
    setSelectedBodyPart(bodyPart);
    onBodyPartSelect(bodyPart);

    // Start animation
    setAnimating(bodyPart.id);

    // Clear previous animation frame if exists
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Schedule end of animation
    animationRef.current = window.requestAnimationFrame(() => {
      setTimeout(() => {
        setAnimating(null);
        animationRef.current = null;
      }, 500); // Animation duration
    });
  };

  const handleSymptomClick = (symptom: string) => {
    if (selectedBodyPart && onSymptomSelect) {
      onSymptomSelect(symptom, selectedBodyPart);

      // Add to symptom history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        bodyPart: selectedBodyPart.name,
        symptom,
        timestamp: Date.now()
      };

      // Update history state and localStorage
      const updatedHistory = [newHistoryItem, ...symptomHistory].slice(0, MAX_HISTORY_ITEMS);
      setSymptomHistory(updatedHistory);
      localStorage.setItem(SYMPTOM_HISTORY_KEY, JSON.stringify(updatedHistory));
    }
  };

  const handleMouseEnter = (bodyPart: BodyPart, event: React.MouseEvent) => {
    setHoveredBodyPart(bodyPart.id);

    // Position tooltip
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + (rect.width / 2);
    const y = rect.top - 10;

    setTooltip({
      id: bodyPart.id,
      x,
      y,
      visible: true
    });
  };

  const handleMouseLeave = () => {
    setHoveredBodyPart(null);
    setTooltip({ ...tooltip, visible: false });
  };

  const clearHistory = () => {
    setSymptomHistory([]);
    localStorage.removeItem(SYMPTOM_HISTORY_KEY);
  };

  const handleHistoryItemClick = (historyItem: HistoryItem) => {
    // Find the body part
    const bodyPart = bodyParts.find(part => part.name === historyItem.bodyPart);
    if (bodyPart) {
      // Select the body part
      setSelectedBodyPart(bodyPart);
      onBodyPartSelect(bodyPart);

      // Find the symptom in the body part's symptoms
      if (bodyPart.symptoms.includes(historyItem.symptom) && onSymptomSelect) {
        // Slight delay to ensure body part is selected first
        setTimeout(() => {
          onSymptomSelect(historyItem.symptom, bodyPart);
        }, 100);
      }
    }
  };

  const handleBodyPartSelect3D = (bodyPartId: string) => {
    const bodyPart = bodyParts.find(part => part.id === bodyPartId);
    if (bodyPart) {
      handleBodyPartClick(bodyPart);
    }
  };

  // Group symptoms by body area
  const symptomsByArea = selectedBodyPart?.symptoms.reduce((groups: {[key: string]: string[]}, symptom) => {
    // Simple grouping logic - could be enhanced with more precise categorization
    const groupName = 'Common Symptoms';
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(symptom);
    return groups;
  }, {});

  // Filter symptoms based on search term
  const filteredSymptomsByArea = selectedBodyPart ?
    Object.entries(symptomsByArea || {}).reduce((filtered: {[key: string]: string[]}, [area, symptoms]) => {
      const filteredSymptoms = symptomSearchTerm.trim()
        ? symptoms.filter(symptom =>
            symptom.toLowerCase().includes(symptomSearchTerm.toLowerCase()))
        : symptoms;

      if (filteredSymptoms.length > 0) {
        filtered[area] = filteredSymptoms;
      }

      return filtered;
    }, {})
    : {};

  // Format date for history display
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 bg-white rounded-lg shadow-sm">
      {/* Body Map and View Toggle */}
      <div className="flex flex-col">
        {/* View toggle */}
        <div className="flex justify-end mb-2">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setView3D(false)}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                !view3D
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } border border-gray-200`}
            >
              2D View
            </button>
            <button
              type="button"
              onClick={() => setView3D(true)}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                view3D
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } border border-l-0 border-gray-200`}
            >
              3D View
            </button>
          </div>
        </div>

        {/* Body map - show either 2D or 3D view based on toggle */}
        {view3D ? (
          <BodyModel3D onBodyPartSelect={handleBodyPartSelect3D} />
        ) : (
          <div className="flex justify-center items-center bg-gray-50 rounded-lg p-2 sm:p-4 overflow-hidden relative">
            <div className="w-full max-w-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4 text-center">Select a body part</h3>
              <svg
                width="100%"
                height="400"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="max-w-full h-auto touch-manipulation"
                style={{ touchAction: 'manipulation' }}
              >
                {/* Front view skeleton outline */}
                <g stroke="gray" strokeWidth="2" fill="none">
                  {/* Head */}
                  <circle cx="160" cy="60" r="30" />

                  {/* Neck */}
                  <line x1="160" y1="90" x2="160" y2="115" />

                  {/* Torso */}
                  <path d="M130,115 h60 v100 h-60 Z" />

                  {/* Arms */}
                  <path d="M130,115 h-30 v100 M190,115 h30 v100" />

                  {/* Legs */}
                  <path d="M130,215 v100 M190,215 v100" />
                  <line x1="130" y1="215" x2="190" y2="215" />
                </g>

                {/* Back view skeleton outline */}
                <g stroke="gray" strokeWidth="2" fill="none">
                  {/* Head */}
                  <circle cx="330" cy="60" r="30" />

                  {/* Neck */}
                  <line x1="330" y1="90" x2="330" y2="115" />

                  {/* Back torso */}
                  <path d="M300,115 h60 v100 h-60 Z" />

                  {/* Arms */}
                  <path d="M300,115 h-30 v100 M360,115 h30 v100" />

                  {/* Legs */}
                  <path d="M300,215 v100 M360,215 v100" />
                  <line x1="300" y1="215" x2="360" y2="215" />
                </g>

                {/* Divider line */}
                <line x1="240" y1="25" x2="240" y2="375" stroke="gray" strokeWidth="1" strokeDasharray="4" />

                {/* Text labels */}
                <text x="160" y="25" textAnchor="middle" className="text-xs font-medium" fill="gray">Front View</text>
                <text x="330" y="25" textAnchor="middle" className="text-xs font-medium" fill="gray">Back View</text>

                {/* Clickable body parts */}
                {bodyParts.map(part => (
                  <path
                    key={part.id}
                    d={part.svgPath}
                    fill={selectedBodyPart?.id === part.id ? '#60a5fa' : (hoveredBodyPart === part.id ? '#93c5fd' : 'transparent')}
                    stroke={selectedBodyPart?.id === part.id ? '#2563eb' : (hoveredBodyPart === part.id ? '#60a5fa' : '#d1d5db')}
                    strokeWidth={animating === part.id ? "4" : "2"}
                    onClick={() => handleBodyPartClick(part)}
                    onMouseEnter={(e) => handleMouseEnter(part, e)}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={() => handleBodyPartClick(part)}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: animating === part.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                    data-body-part={part.id}
                    className={`${animating === part.id ? 'animate-pulse' : ''}`}
                    aria-label={part.name}
                    role="button"
                  />
                ))}
              </svg>

              {/* Mobile instructions */}
              <p className="text-xs text-gray-500 text-center mt-2 md:hidden">
                Tap on a body part to select it and see related symptoms
              </p>
            </div>

            {/* Floating tooltip */}
            {tooltip.visible && (
              <div
                className="absolute bg-gray-800 text-white px-2 py-1 rounded text-xs pointer-events-none z-10 transform -translate-x-1/2 -translate-y-full"
                style={{
                  left: tooltip.x,
                  top: tooltip.y,
                  opacity: 0.9
                }}
              >
                {bodyParts.find(part => part.id === tooltip.id)?.name}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Symptoms Panel */}
      <div className="flex flex-col bg-gray-50 rounded-lg p-4 h-full">
        {selectedBodyPart ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-900">
                {selectedBodyPart.name} Symptoms
              </h3>

              {/* History toggle button */}
              <button
                onClick={() => setHistoryVisible(!historyVisible)}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                aria-label={historyVisible ? "Hide symptom history" : "Show symptom history"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {historyVisible ? "Hide History" : "History"}
              </button>
            </div>

            {/* History panel */}
            {historyVisible && (
              <div className="mb-4 p-3 bg-white rounded-md border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Recent Symptom Searches</h4>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-red-600 hover:text-red-800"
                    disabled={symptomHistory.length === 0}
                  >
                    Clear
                  </button>
                </div>

                {symptomHistory.length > 0 ? (
                  <div className="max-h-40 overflow-y-auto">
                    <ul className="space-y-1">
                      {symptomHistory.map(item => (
                        <li
                          key={item.id}
                          className="text-xs p-1.5 bg-blue-50 rounded cursor-pointer hover:bg-blue-100"
                          onClick={() => handleHistoryItemClick(item)}
                        >
                          <span className="font-medium">{item.bodyPart}: </span>
                          {item.symptom}
                          <span className="text-gray-500 ml-1">({formatDate(item.timestamp)})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">No search history yet.</p>
                )}
              </div>
            )}

            <p className="text-sm text-gray-500 mb-3">
              Select a symptom you're experiencing in this area:
            </p>

            {/* Symptom search */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <input
                type="text"
                value={symptomSearchTerm}
                onChange={(e) => setSymptomSearchTerm(e.target.value)}
                placeholder="Search symptoms..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {symptomSearchTerm && (
                <button
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setSymptomSearchTerm('')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400 hover:text-gray-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Grouped symptoms */}
            {Object.keys(filteredSymptomsByArea).length > 0 ? (
              Object.entries(filteredSymptomsByArea).map(([area, symptoms]) => (
                <div key={area} className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{area}</h4>
                  <div className="space-y-2">
                    {symptoms.map((symptom, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-4 py-2 rounded-md bg-white hover:bg-blue-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        onClick={() => handleSymptomClick(symptom)}
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              symptomSearchTerm ? (
                <div className="text-center py-6">
                  <p className="text-gray-500">No symptoms match your search criteria.</p>
                  <button
                    onClick={() => setSymptomSearchTerm('')}
                    className="text-blue-600 hover:text-blue-800 text-sm mt-2"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No symptoms available for this body part.</p>
                </div>
              )
            )}

            <div className="mt-auto pt-4">
              <p className="text-xs text-gray-500">
                Note: These symptoms are common for the selected area. For medical advice, please consult a healthcare professional.
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-500 text-center">
              Select a body part to see related symptoms
            </p>

            {/* Show symptom history if available */}
            {symptomHistory.length > 0 && (
              <div className="mt-6 w-full">
                <button
                  onClick={() => setHistoryVisible(!historyVisible)}
                  className="mb-2 text-blue-600 hover:text-blue-800 text-sm flex items-center mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {historyVisible ? "Hide Recent Searches" : "Show Recent Searches"}
                </button>

                {historyVisible && (
                  <div className="p-3 bg-white rounded-md border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-gray-700">Recent Symptom Searches</h4>
                      <button
                        onClick={clearHistory}
                        className="text-xs text-red-600 hover:text-red-800"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="max-h-40 overflow-y-auto">
                      <ul className="space-y-1">
                        {symptomHistory.map(item => (
                          <li
                            key={item.id}
                            className="text-xs p-1.5 bg-blue-50 rounded cursor-pointer hover:bg-blue-100"
                            onClick={() => handleHistoryItemClick(item)}
                          >
                            <span className="font-medium">{item.bodyPart}: </span>
                            {item.symptom}
                            <span className="text-gray-500 ml-1">({formatDate(item.timestamp)})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyMapSearch;
