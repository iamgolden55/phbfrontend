import React, { useState, useEffect } from 'react';

interface Contraction {
  id: string;
  startTime: number;
  endTime: number | null;
  duration: number | null;
  interval: number | null;
}

const ContractionTimer: React.FC = () => {
  const [contractions, setContractions] = useState<Contraction[]>(() => {
    const saved = localStorage.getItem('contractions');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeContraction, setActiveContraction] = useState<Contraction | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Save contractions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('contractions', JSON.stringify(contractions));
  }, [contractions]);

  // Timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  // Check for hospital alert (if contractions are close enough together)
  useEffect(() => {
    if (contractions.length >= 3) {
      const recentContractions = contractions.slice(-3);
      const allShortIntervals = recentContractions.every(c =>
        c.interval !== null && c.interval < 300 // Less than 5 minutes (300 seconds)
      );

      const allLongDurations = recentContractions.every(c =>
        c.duration !== null && c.duration > 60 // More than 1 minute
      );

      if (allShortIntervals && allLongDurations) {
        setShowAlert(true);
      }
    }
  }, [contractions]);

  const startContraction = () => {
    if (activeContraction) return; // Don't start if one is already active

    const newContraction: Contraction = {
      id: Date.now().toString(),
      startTime: Date.now(),
      endTime: null,
      duration: null,
      interval: null
    };

    setActiveContraction(newContraction);
    setIsRunning(true);
    setTimer(0);
  };

  const stopContraction = () => {
    if (!activeContraction) return;

    const now = Date.now();
    const duration = Math.floor((now - activeContraction.startTime) / 1000);

    const completedContraction: Contraction = {
      ...activeContraction,
      endTime: now,
      duration: duration
    };

    // Calculate interval from previous contraction
    let updatedContraction = completedContraction;
    if (contractions.length > 0) {
      const lastContraction = contractions[contractions.length - 1];
      const interval = Math.floor((completedContraction.startTime - lastContraction.startTime) / 1000);
      updatedContraction = {
        ...completedContraction,
        interval: interval
      };
    }

    setContractions([...contractions, updatedContraction]);
    setActiveContraction(null);
    setIsRunning(false);
  };

  const resetAll = () => {
    setContractions([]);
    setActiveContraction(null);
    setIsRunning(false);
    setTimer(0);
    setShowAlert(false);
  };

  const removeContraction = (id: string) => {
    setContractions(contractions.filter(c => c.id !== id));
  };

  // Format seconds to mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      {showAlert && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 relative" role="alert">
          <strong className="font-bold">Alert! </strong>
          <span className="block sm:inline">Your contractions are occurring regularly at less than 5 minutes apart and lasting over 1 minute. It may be time to go to the hospital.</span>
          <button
            className="absolute top-0 right-0 mt-3 mr-3"
            onClick={() => setShowAlert(false)}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="text-center mb-8">
        <div className="text-6xl font-mono mb-4">
          {formatTime(timer)}
        </div>

        <div className="flex justify-center space-x-4">
          {!isRunning ? (
            <button
              onClick={startContraction}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none"
            >
              Start Contraction
            </button>
          ) : (
            <button
              onClick={stopContraction}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none"
            >
              Stop Contraction
            </button>
          )}

          <button
            onClick={resetAll}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-full focus:outline-none"
          >
            Reset All
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Contraction History</h2>

        {contractions.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No contractions recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Start Time</th>
                  <th className="px-4 py-2 text-left">Duration</th>
                  <th className="px-4 py-2 text-left">Interval</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contractions.map((contraction, index) => (
                  <tr key={contraction.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2">{contractions.length - index}</td>
                    <td className="px-4 py-2">
                      {new Date(contraction.startTime).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-2">
                      {contraction.duration ? formatTime(contraction.duration) : "-"}
                    </td>
                    <td className="px-4 py-2">
                      {contraction.interval
                        ? `${formatTime(contraction.interval)} (${Math.floor(contraction.interval / 60)} min ${contraction.interval % 60} sec)`
                        : "-"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => removeContraction(contraction.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-md">
        <h3 className="font-bold text-lg text-blue-800 mb-2">Contraction Timing Guide</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Early Labor:</strong> Contractions 5-30 minutes apart, lasting 30-45 seconds</li>
          <li><strong>Active Labor:</strong> Contractions 3-5 minutes apart, lasting 45-60 seconds</li>
          <li><strong>Transition:</strong> Contractions 2-3 minutes apart, lasting 60-90 seconds</li>
        </ul>
        <div className="mt-4 border-t border-blue-200 pt-4">
          <p className="font-bold">When to go to the hospital:</p>
          <p>Follow the 5-1-1 rule: When contractions are 5 minutes apart, lasting for 1 minute each, and have been occurring for 1 hour.</p>
        </div>
      </div>
    </div>
  );
};

export default ContractionTimer;
