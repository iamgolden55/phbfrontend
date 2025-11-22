import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface KickSession {
  id: string;
  date: Date | string;
  kicks: number;
  duration: number; // in seconds
  completed: boolean;
}

interface ParsedKickSession extends Omit<KickSession, 'date'> {
  date: string;
}

const KickCounter: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [kickCount, setKickCount] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [sessions, setSessions] = useState<KickSession[]>([]);
  const [viewMode, setViewMode] = useState<'counter' | 'history'>('counter');
  const [showInfo, setShowInfo] = useState(false);

  // Target number of kicks to record (standard is 10)
  const targetKicks = 10;

  // Load saved sessions from localStorage on component mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('kickSessions');
    if (savedSessions) {
      try {
        const parsedSessions = JSON.parse(savedSessions) as ParsedKickSession[];
        const convertedSessions = parsedSessions.map(session => ({
          ...session,
          date: new Date(session.date)
        }));
        setSessions(convertedSessions);
      } catch (error) {
        console.error('Error parsing saved kick sessions:', error);
      }
    }
  }, []);

  // Save sessions to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('kickSessions', JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving kick sessions:', error);
    }
  }, [sessions]);

  // Timer effect for tracking elapsed time
  useEffect(() => {
    let timerInterval: number | null = null;

    if (isTracking) {
      timerInterval = window.setInterval(() => {
        setCurrentTime(new Date());
        if (startTime) {
          const seconds = Math.floor((Date.now() - startTime.getTime()) / 1000);
          setElapsedSeconds(seconds);
        }
      }, 1000);
    }

    return () => {
      if (timerInterval !== null) {
        window.clearInterval(timerInterval);
      }
    };
  }, [isTracking, startTime]);

  const handleStartTracking = () => {
    const now = new Date();
    setStartTime(now);
    setCurrentTime(now);
    setIsTracking(true);
    setKickCount(0);
    setElapsedSeconds(0);
  };

  const handleStopTracking = () => {
    if (!startTime) return;

    setIsTracking(false);

    // Create a new session record
    const newSession: KickSession = {
      id: Date.now().toString(),
      date: startTime,
      kicks: kickCount,
      duration: elapsedSeconds,
      completed: kickCount >= targetKicks
    };

    setSessions(prevSessions => [newSession, ...prevSessions]);

    // Reset tracking state
    setStartTime(null);
    setCurrentTime(null);
  };

  const handleKickRecorded = () => {
    if (!isTracking) return;

    setKickCount(prevCount => prevCount + 1);

    // Auto-stop tracking when target is reached
    if (kickCount + 1 >= targetKicks) {
      handleStopTracking();
    }
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prevSessions => prevSessions.filter(session => session.id !== sessionId));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const formatDateTime = (date: Date): string => {
    return format(date, 'MMM d, yyyy h:mm a');
  };

  // Get message based on kick session performance
  const getSessionMessage = (session: KickSession): { message: string; color: string } => {
    if (!session.completed) {
      return {
        message: 'Incomplete session',
        color: 'text-yellow-600'
      };
    }

    if (session.duration <= 10 * 60) { // Less than 10 minutes
      return {
        message: 'Very active baby',
        color: 'text-green-600'
      };
    } else if (session.duration <= 20 * 60) { // 10-20 minutes
      return {
        message: 'Good activity',
        color: 'text-green-600'
      };
    } else if (session.duration <= 40 * 60) { // 20-40 minutes
      return {
        message: 'Normal activity',
        color: 'text-blue-600'
      };
    } else { // More than 40 minutes
      return {
        message: 'Low activity - discuss with healthcare provider',
        color: 'text-orange-600'
      };
    }
  };

  // Render counter view
  const renderCounter = () => (
    <div className="text-center">
      <div className="mb-8">
        <div className="text-6xl font-bold text-[#0891b2] mb-2">{kickCount}</div>
        <div className="text-gray-500 text-sm">kicks recorded</div>

        {isTracking && (
          <div className="mt-1 text-sm text-gray-500">
            {formatTime(elapsedSeconds)} elapsed
          </div>
        )}
      </div>

      <div className="mb-8">
        {!isTracking ? (
          <button
            onClick={handleStartTracking}
            className="bg-[#0891b2] text-white px-8 py-3 rounded-full hover:bg-[#0e7490] transition-colors text-lg"
          >
            Start Counting
          </button>
        ) : (
          <div className="space-y-4">
            <button
              onClick={handleKickRecorded}
              className="bg-[#0891b2] text-white w-32 h-32 rounded-full hover:bg-[#0e7490] transition-colors text-lg"
            >
              Tap When<br />Baby Kicks
            </button>

            <div>
              <button
                onClick={handleStopTracking}
                className="text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors"
              >
                Stop Counting
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 p-4 rounded-md mb-4 text-left">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-blue-800">How to count kicks</h3>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-blue-600"
          >
            {showInfo ? 'Hide' : 'Show'} info
          </button>
        </div>

        {showInfo && (
          <div className="mt-2 text-sm text-blue-700">
            <p className="mb-2">
              Counting kicks is a simple way to monitor your baby's well-being. Most healthcare providers
              recommend counting kicks once a day in the third trimester.
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Find a comfortable position (sitting or lying on your side).</li>
              <li>Note the time when you start counting.</li>
              <li>Each time you feel your baby move, tap the button.</li>
              <li>Continue until you've counted 10 movements.</li>
              <li>Record how long it took to reach 10 movements.</li>
            </ol>
            <p className="mt-2 font-medium">
              Contact your healthcare provider if you notice a significant change in your baby's movement pattern
              or if it takes much longer than usual to feel 10 kicks.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Render history view
  const renderHistory = () => (
    <div>
      <h3 className="font-bold mb-4 text-lg">Kick Count History</h3>

      {sessions.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-500">No kick counting sessions recorded yet.</p>
          <button
            onClick={() => setViewMode('counter')}
            className="mt-4 text-[#0891b2] hover:underline"
          >
            Start your first session
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map(session => {
            const { message, color } = getSessionMessage(session);
            const sessionDate = session.date instanceof Date ? session.date : new Date(session.date);

            return (
              <div key={session.id} className="border rounded-md p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{formatDateTime(sessionDate)}</div>
                    <div className="text-sm text-gray-500">
                      {session.kicks} kicks in {formatTime(session.duration)}
                    </div>
                    <div className={`text-sm mt-1 ${color}`}>
                      {message}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSession(session.id)}
                    className="text-gray-400 hover:text-red-600"
                    aria-label="Delete session"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 bg-gray-50 p-4 rounded-md">
        <h4 className="font-bold mb-2">What to look for</h4>
        <p className="text-sm">
          The most important thing is to be aware of your baby's normal movement patterns.
          Look for consistency in how long it takes to feel 10 kicks. If it suddenly takes
          much longer than usual or you notice a significant decrease in movements, contact
          your healthcare provider right away.
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#0891b2] text-white p-4">
        <h2 className="text-xl font-bold">Baby Kick Counter</h2>
      </div>

      <div className="p-6">
        {/* View toggle buttons */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setViewMode('counter')}
            className={`pb-3 px-4 text-sm font-medium ${
              viewMode === 'counter'
                ? 'border-b-2 border-[#0891b2] text-[#0891b2]'
                : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Kick Counter
          </button>
          <button
            onClick={() => setViewMode('history')}
            className={`pb-3 px-4 text-sm font-medium ${
              viewMode === 'history'
                ? 'border-b-2 border-[#0891b2] text-[#0891b2]'
                : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            History ({sessions.length})
          </button>
        </div>

        {/* Conditional rendering based on view mode */}
        {viewMode === 'counter' ? renderCounter() : renderHistory()}
      </div>
    </div>
  );
};

export default KickCounter;
