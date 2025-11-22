import React, { useState, useEffect } from 'react';
import { format, addDays, addWeeks, differenceInDays, isBefore } from 'date-fns';

type CalculationMethod = 'lmp' | 'conception' | 'ivf';

interface DueDateInfo {
  dueDate: Date;
  currentWeek: number;
  currentDay: number;
  trimester: number;
  progress: number;
}

const DueDateCalculator: React.FC = () => {
  const [calculationMethod, setCalculationMethod] = useState<CalculationMethod>('lmp');
  const [lmpDate, setLmpDate] = useState<string>('');
  const [conceptionDate, setConceptionDate] = useState<string>('');
  const [ivfTransferDate, setIvfTransferDate] = useState<string>('');
  const [ivfDayNumber, setIvfDayNumber] = useState<number>(3);
  const [dueDateInfo, setDueDateInfo] = useState<DueDateInfo | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPregnancyDays = 280; // 40 weeks

  useEffect(() => {
    if (showResults && dueDateInfo) {
      // For real applications, you might want to persist this information
      console.log('Due date calculated:', dueDateInfo);
    }
  }, [showResults, dueDateInfo]);

  const calculateDueDate = () => {
    setError(null);
    let startDate: Date | null = null;

    try {
      // Calculate start date based on method
      if (calculationMethod === 'lmp') {
        if (!lmpDate) {
          setError('Please enter your last menstrual period date');
          return;
        }
        startDate = new Date(lmpDate);

        // Validate date
        if (isNaN(startDate.getTime())) {
          setError('Invalid date format');
          return;
        }

        // Check if date is reasonable (not in the future)
        if (isBefore(new Date(), startDate)) {
          setError('Last menstrual period date cannot be in the future');
          return;
        }
      }
      else if (calculationMethod === 'conception') {
        if (!conceptionDate) {
          setError('Please enter your conception date');
          return;
        }
        startDate = new Date(conceptionDate);

        if (isNaN(startDate.getTime())) {
          setError('Invalid date format');
          return;
        }

        if (isBefore(new Date(), startDate)) {
          setError('Conception date cannot be in the future');
          return;
        }

        // For conception date, subtract 14 days (typical ovulation)
        startDate = addDays(startDate, -14);
      }
      else if (calculationMethod === 'ivf') {
        if (!ivfTransferDate) {
          setError('Please enter your IVF transfer date');
          return;
        }
        startDate = new Date(ivfTransferDate);

        if (isNaN(startDate.getTime())) {
          setError('Invalid date format');
          return;
        }

        if (isBefore(new Date(), startDate)) {
          setError('IVF transfer date cannot be in the future');
          return;
        }

        // For IVF, adjust based on the day of transfer
        // Typical embryo transfer days are 3 or 5
        const adjustmentDays = ivfDayNumber === 3 ? 17 : (ivfDayNumber === 5 ? 15 : 17);
        startDate = addDays(startDate, -adjustmentDays);
      }

      if (!startDate) {
        setError('Unable to calculate due date. Please check your inputs.');
        return;
      }

      // Calculate due date (40 weeks from LMP)
      const dueDate = addWeeks(startDate, 40);

      // Calculate current week and day
      const today = new Date();
      const daysSinceStart = differenceInDays(today, startDate);

      // Check if already gave birth or not yet pregnant
      if (daysSinceStart < 0) {
        setError('The date you entered indicates you are not yet pregnant');
        return;
      }

      if (daysSinceStart > totalPregnancyDays) {
        setError('Based on the date you entered, your due date has passed');
        return;
      }

      const currentWeek = Math.floor(daysSinceStart / 7) + 1;
      const currentDay = (daysSinceStart % 7) + 1;

      // Calculate trimester (1: weeks 1-13, 2: weeks 14-26, 3: weeks 27-40)
      let trimester = 1;
      if (currentWeek > 13 && currentWeek <= 26) {
        trimester = 2;
      } else if (currentWeek > 26) {
        trimester = 3;
      }

      // Calculate progress (percentage)
      const progress = Math.min(Math.round((daysSinceStart / totalPregnancyDays) * 100), 100);

      setDueDateInfo({
        dueDate,
        currentWeek,
        currentDay,
        trimester,
        progress
      });

      setShowResults(true);
    } catch (err) {
      console.error('Error calculating due date:', err);
      setError('An error occurred while calculating the due date. Please try again.');
    }
  };

  const renderInputFields = () => {
    switch (calculationMethod) {
      case 'lmp':
        return (
          <div className="mb-4">
            <label htmlFor="lmp-date" className="block text-sm font-medium text-gray-700 mb-1">
              First day of your last menstrual period
            </label>
            <input
              type="date"
              id="lmp-date"
              value={lmpDate}
              onChange={(e) => setLmpDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
            />
            <p className="text-sm text-gray-500 mt-1">
              This is the first day of your most recent period
            </p>
          </div>
        );

      case 'conception':
        return (
          <div className="mb-4">
            <label htmlFor="conception-date" className="block text-sm font-medium text-gray-700 mb-1">
              Date of conception
            </label>
            <input
              type="date"
              id="conception-date"
              value={conceptionDate}
              onChange={(e) => setConceptionDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
            />
            <p className="text-sm text-gray-500 mt-1">
              This is the estimated date when you conceived
            </p>
          </div>
        );

      case 'ivf':
        return (
          <>
            <div className="mb-4">
              <label htmlFor="ivf-date" className="block text-sm font-medium text-gray-700 mb-1">
                IVF transfer date
              </label>
              <input
                type="date"
                id="ivf-date"
                value={ivfTransferDate}
                onChange={(e) => setIvfTransferDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="ivf-day" className="block text-sm font-medium text-gray-700 mb-1">
                Day of transfer
              </label>
              <select
                id="ivf-day"
                value={ivfDayNumber}
                onChange={(e) => setIvfDayNumber(parseInt(e.target.value, 10))}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891b2]"
              >
                <option value={3}>Day 3 Transfer</option>
                <option value={5}>Day 5 Transfer (Blastocyst)</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">
                The day of embryo development when the transfer occurred
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const getTrimesters = () => {
    return [
      { name: '1st Trimester', weeks: 'Weeks 1-13', active: dueDateInfo?.trimester === 1 },
      { name: '2nd Trimester', weeks: 'Weeks 14-26', active: dueDateInfo?.trimester === 2 },
      { name: '3rd Trimester', weeks: 'Weeks 27-40', active: dueDateInfo?.trimester === 3 }
    ];
  };

  const formatDate = (date: Date): string => {
    try {
      return format(date, 'MMMM d, yyyy');
    } catch (err) {
      console.error('Error formatting date:', err);
      return 'Invalid date';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#0891b2] text-white p-4">
        <h2 className="text-xl font-bold">Due Date Calculator</h2>
      </div>

      <div className="p-6">
        {!showResults ? (
          // Calculator form
          <>
            <p className="text-gray-600 mb-6">
              Use this calculator to estimate your due date and see where you are in your pregnancy journey.
            </p>

            <div className="mb-6">
              <h3 className="font-bold mb-2">Calculation method</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="calculation-method"
                    checked={calculationMethod === 'lmp'}
                    onChange={() => setCalculationMethod('lmp')}
                    className="mr-2 text-[#0891b2] focus:ring-[#0891b2]"
                  />
                  <span>Last menstrual period (most common)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="calculation-method"
                    checked={calculationMethod === 'conception'}
                    onChange={() => setCalculationMethod('conception')}
                    className="mr-2 text-[#0891b2] focus:ring-[#0891b2]"
                  />
                  <span>Conception date</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="calculation-method"
                    checked={calculationMethod === 'ivf'}
                    onChange={() => setCalculationMethod('ivf')}
                    className="mr-2 text-[#0891b2] focus:ring-[#0891b2]"
                  />
                  <span>IVF transfer date</span>
                </label>
              </div>
            </div>

            {/* Dynamic input fields based on calculation method */}
            {renderInputFields()}

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
                {error}
              </div>
            )}

            <button
              onClick={calculateDueDate}
              className="w-full bg-[#0891b2] text-white py-2 px-4 rounded-md hover:bg-[#0e7490] transition-colors"
            >
              Calculate Due Date
            </button>
          </>
        ) : (
          // Results view
          <>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Your Due Date</h3>
                <button
                  onClick={() => setShowResults(false)}
                  className="text-[#0891b2] text-sm hover:underline flex items-center"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Recalculate
                </button>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 text-center mb-6">
                <p className="text-sm text-blue-600 mb-1">Estimated due date</p>
                <p className="text-3xl font-bold text-blue-700 mb-1">
                  {dueDateInfo && formatDate(dueDateInfo.dueDate)}
                </p>
                <p className="text-sm text-blue-600">
                  {dueDateInfo && `You are ${dueDateInfo.currentWeek} weeks and ${dueDateInfo.currentDay} days pregnant`}
                </p>
              </div>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>0 weeks</span>
                  <span>40 weeks</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-[#0891b2] rounded-full"
                    style={{ width: `${dueDateInfo?.progress || 0}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-600 mt-1">
                  {dueDateInfo?.progress}% complete
                </div>
              </div>

              {/* Trimesters */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {getTrimesters().map((trimester, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md text-center ${
                      trimester.active
                        ? 'bg-blue-100 border-blue-300 border'
                        : 'bg-gray-50'
                    }`}
                  >
                    <p className={`font-bold ${trimester.active ? 'text-blue-800' : 'text-gray-600'}`}>
                      {trimester.name}
                    </p>
                    <p className={`text-xs ${trimester.active ? 'text-blue-700' : 'text-gray-500'}`}>
                      {trimester.weeks}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-bold mb-2">Important note</h4>
                <p className="text-sm text-gray-600">
                  This calculator provides an estimate based on the information you provided.
                  Every pregnancy is unique, and your actual due date may vary.
                  Always consult with your healthcare provider for the most accurate information.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DueDateCalculator;
