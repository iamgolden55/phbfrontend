import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../components/Breadcrumbs';

// Define types for our cycle data
type CervicalMucusType = 'dry' | 'sticky' | 'creamy' | 'watery' | 'egg-white' | 'unknown';
type TemperatureReading = { date: Date; temperature: number };
type CycleDay = {
  date: Date;
  periodDay: boolean;
  cervicalMucus: CervicalMucusType;
  temperature?: number;
  notes?: string;
};
type Cycle = {
  id: string;
  startDate: Date;
  endDate?: Date;
  days: CycleDay[];
};

const CycleTrackerPage: React.FC = () => {
  // State for managing cycle data
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [currentCycle, setCurrentCycle] = useState<Cycle | null>(null);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [periodLength, setPeriodLength] = useState<number>(5);
  const [temperatures, setTemperatures] = useState<TemperatureReading[]>([]);

  // State for the form
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isPeriodDay, setIsPeriodDay] = useState<boolean>(false);
  const [mucusType, setMucusType] = useState<CervicalMucusType>('unknown');
  const [temperature, setTemperature] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // State for calendar view
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [calendarDays, setCalendarDays] = useState<Array<Date | null>>([]);

  // Calculate current cycle day and fertile window
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [fertileWindow, setFertileWindow] = useState<{start: number; end: number}>({ start: 10, end: 17 });
  const [isFertile, setIsFertile] = useState<boolean>(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCycles = localStorage.getItem('cycles');
    if (savedCycles) {
      try {
        const parsedCycles = JSON.parse(savedCycles);
        // Convert string dates back to Date objects
        const cyclesWithDates = parsedCycles.map((cycle: any) => ({
          ...cycle,
          startDate: new Date(cycle.startDate),
          endDate: cycle.endDate ? new Date(cycle.endDate) : undefined,
          days: cycle.days.map((day: any) => ({
            ...day,
            date: new Date(day.date)
          }))
        }));
        setCycles(cyclesWithDates);

        // Set current cycle to the latest cycle
        if (cyclesWithDates.length > 0) {
          setCurrentCycle(cyclesWithDates[cyclesWithDates.length - 1]);
        }
      } catch (error) {
        console.error('Error loading cycles from localStorage:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever cycles change
  useEffect(() => {
    localStorage.setItem('cycles', JSON.stringify(cycles));
  }, [cycles]);

  // Generate calendar days for the current month
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Get first day of month and how many days in month
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get day of week of first day (0 = Sunday, 6 = Saturday)
    const firstDayWeekday = firstDayOfMonth.getDay();

    // Create array for calendar grid (6 weeks x 7 days)
    const calendarArray: Array<Date | null> = [];

    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDayWeekday; i++) {
      calendarArray.push(null);
    }

    // Add all days in month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarArray.push(new Date(year, month, day));
    }

    // Add empty cells to complete the grid if needed
    const remainingCells = 42 - calendarArray.length;
    for (let i = 0; i < remainingCells; i++) {
      calendarArray.push(null);
    }

    setCalendarDays(calendarArray);
  }, [currentMonth]);

  // Calculate if a given date is in the current cycle's fertile window
  const isDateFertile = (date: Date): boolean => {
    if (!currentCycle) return false;

    const cycleStartDate = currentCycle.startDate;
    const daysSinceCycleStart = Math.floor((date.getTime() - cycleStartDate.getTime()) / (1000 * 60 * 60 * 24));

    return daysSinceCycleStart >= fertileWindow.start && daysSinceCycleStart <= fertileWindow.end;
  };

  // Check if a date is in the current cycle's period
  const isDateInPeriod = (date: Date): boolean => {
    if (!currentCycle) return false;

    const cycleStartDate = currentCycle.startDate;
    const daysSinceCycleStart = Math.floor((date.getTime() - cycleStartDate.getTime()) / (1000 * 60 * 60 * 24));

    return daysSinceCycleStart >= 0 && daysSinceCycleStart < periodLength;
  };

  // Get data for a specific date
  const getDataForDate = (date: Date): CycleDay | undefined => {
    if (!currentCycle) return undefined;

    return currentCycle.days.find(day =>
      day.date.getFullYear() === date.getFullYear() &&
      day.date.getMonth() === date.getMonth() &&
      day.date.getDate() === date.getDate()
    );
  };

  // Function to start a new cycle
  const startNewCycle = (startDate: Date) => {
    // Close current cycle if one exists
    if (currentCycle && !currentCycle.endDate) {
      const updatedCycles = cycles.map(cycle => {
        if (cycle.id === currentCycle.id) {
          return {
            ...cycle,
            endDate: new Date(startDate.getTime() - 24 * 60 * 60 * 1000) // Day before new cycle
          };
        }
        return cycle;
      });
      setCycles(updatedCycles);
    }

    // Create new cycle
    const newCycle: Cycle = {
      id: Date.now().toString(),
      startDate,
      days: [{
        date: startDate,
        periodDay: true,
        cervicalMucus: 'unknown'
      }]
    };

    setCycles([...cycles, newCycle]);
    setCurrentCycle(newCycle);
    setIsPeriodDay(true);
  };

  // Handle form submission for recording daily data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentCycle) {
      // If no current cycle, this must be the start of a new cycle
      if (isPeriodDay) {
        startNewCycle(selectedDate);
      } else {
        alert('You must start with a period day to begin tracking your first cycle.');
        return;
      }
    } else {
      // Add or update day in current cycle
      const dayData: CycleDay = {
        date: selectedDate,
        periodDay: isPeriodDay,
        cervicalMucus: mucusType,
        temperature: temperature ? parseFloat(temperature) : undefined,
        notes: notes || undefined
      };

      // Check if this day already exists in the cycle
      const dayIndex = currentCycle.days.findIndex(day =>
        day.date.getFullYear() === selectedDate.getFullYear() &&
        day.date.getMonth() === selectedDate.getMonth() &&
        day.date.getDate() === selectedDate.getDate()
      );

      const updatedDays = [...currentCycle.days];
      if (dayIndex >= 0) {
        // Update existing day
        updatedDays[dayIndex] = dayData;
      } else {
        // Add new day
        updatedDays.push(dayData);
      }

      // If this is a period day and it's before the current cycle's start date,
      // it could be the start of a new cycle
      if (isPeriodDay && selectedDate < currentCycle.startDate) {
        startNewCycle(selectedDate);
      } else {
        // Otherwise update the current cycle
        const updatedCycles = cycles.map(cycle => {
          if (cycle.id === currentCycle.id) {
            return {
              ...cycle,
              days: updatedDays
            };
          }
          return cycle;
        });

        setCycles(updatedCycles);
        setCurrentCycle({
          ...currentCycle,
          days: updatedDays
        });
      }
    }

    // Reset form
    setShowForm(false);
    setIsPeriodDay(false);
    setMucusType('unknown');
    setTemperature('');
    setNotes('');
  };

  // Format date as YYYY-MM-DD for input
  const formatDateForInput = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Previous month handler
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Next month handler
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Render day cell in calendar
  const renderDay = (date: Date | null) => {
    if (!date) {
      return <div className="h-14 border bg-gray-100"></div>;
    }

    const dayData = getDataForDate(date);
    const isToday = date.toDateString() === new Date().toDateString();
    const isPeriod = dayData?.periodDay || isDateInPeriod(date);
    const isFertileDay = isDateFertile(date);

    let bgColor = 'bg-white';
    if (isPeriod) bgColor = 'bg-red-100';
    else if (isFertileDay) bgColor = 'bg-green-100';

    return (
      <div
        className={`h-14 border p-1 ${bgColor} ${isToday ? 'ring-2 ring-blue-500' : ''} cursor-pointer hover:bg-gray-50`}
        onClick={() => {
          setSelectedDate(date);
          setShowForm(true);

          // Pre-fill form with existing data if available
          if (dayData) {
            setIsPeriodDay(dayData.periodDay);
            setMucusType(dayData.cervicalMucus);
            setTemperature(dayData.temperature ? dayData.temperature.toString() : '');
            setNotes(dayData.notes || '');
          } else {
            setIsPeriodDay(false);
            setMucusType('unknown');
            setTemperature('');
            setNotes('');
          }
        }}
      >
        <div className="flex justify-between">
          <span className="font-semibold">{date.getDate()}</span>
          {dayData && (
            <div className="flex space-x-1">
              {dayData.temperature && (
                <span className="text-xs bg-blue-100 px-1 rounded">🌡️</span>
              )}
              {dayData.cervicalMucus !== 'unknown' && (
                <span className="text-xs bg-purple-100 px-1 rounded">💧</span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#00a499] text-white py-8">
        <div className="phb-container">
          <Breadcrumbs
            items={[
              { label: 'Home', url: '/' },
              { label: 'Contraception', url: '/contraception' },
              { label: 'Cycle Tracker', url: '/contraception/cycle-tracker' }
            ]}
            textColor="text-white"
          />
          <h1 className="text-3xl font-bold mb-4 mt-4">Menstrual Cycle Tracker</h1>
          <p className="text-xl font-medium">
            Track your menstrual cycle for natural family planning
          </p>
        </div>
      </div>

      <div className="phb-container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Cycle Calendar</h2>
                <div className="flex space-x-4 items-center">
                  <button
                    className="p-2 rounded hover:bg-gray-100"
                    onClick={goToPreviousMonth}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h3 className="text-lg font-semibold">
                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button
                    className="p-2 rounded hover:bg-gray-100"
                    onClick={goToNextMonth}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                  <div key={i} className="text-center font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
                {calendarDays.map((date, i) => (
                  <div key={i}>
                    {renderDay(date)}
                  </div>
                ))}
              </div>

              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-100 mr-2"></div>
                  <span>Period</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-100 mr-2"></div>
                  <span>Fertile Window</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 ring-2 ring-blue-500 mr-2"></div>
                  <span>Today</span>
                </div>
              </div>
            </div>

            {/* Recording form */}
            {showForm && (
              <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <h3 className="text-xl font-bold mb-4 text-[#00a499]">
                  Record Data for {selectedDate.toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block mb-2 text-gray-700">
                      <input
                        type="checkbox"
                        checked={isPeriodDay}
                        onChange={(e) => setIsPeriodDay(e.target.checked)}
                        className="mr-2"
                      />
                      Period day
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 text-gray-700">
                      Cervical mucus
                      <select
                        value={mucusType}
                        onChange={(e) => setMucusType(e.target.value as CervicalMucusType)}
                        className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded"
                      >
                        <option value="unknown">Not recorded</option>
                        <option value="dry">Dry (no mucus)</option>
                        <option value="sticky">Sticky (thick, opaque)</option>
                        <option value="creamy">Creamy (white, lotion-like)</option>
                        <option value="watery">Watery (clear, slippery)</option>
                        <option value="egg-white">Egg white (stretchy, clear)</option>
                      </select>
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 text-gray-700">
                      Basal body temperature (°C)
                      <input
                        type="number"
                        step="0.01"
                        min="35.5"
                        max="38.0"
                        placeholder="36.5"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded"
                      />
                    </label>
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-gray-700">
                      Notes
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded"
                        rows={3}
                      ></textarea>
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-[#00a499] rounded-md hover:bg-[#008c82]"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Information sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">Cycle Summary</h3>
              {currentCycle ? (
                <div>
                  <p className="mb-2">
                    <span className="font-semibold">Current cycle started:</span>{' '}
                    {currentCycle.startDate.toLocaleDateString('en-NG')}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Average cycle length:</span>{' '}
                    {cycles.length > 1 ?
                      Math.round(
                        cycles
                          .filter(c => c.endDate)
                          .reduce((sum, c) => {
                            if (c.endDate) {
                              return sum + Math.round((c.endDate.getTime() - c.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                            }
                            return sum;
                          }, 0) / (cycles.filter(c => c.endDate).length)
                      ) :
                      cycleLength} days
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold">Cycles tracked:</span>{' '}
                    {cycles.length}
                  </p>

                  <div className="mb-4 p-3 bg-green-50 rounded-md">
                    <p className="font-semibold text-green-800">Estimated fertile window:</p>
                    <p className="text-green-700">
                      {new Date(currentCycle.startDate.getTime() + (fertileWindow.start * 24 * 60 * 60 * 1000)).toLocaleDateString('en-NG')} - {new Date(currentCycle.startDate.getTime() + (fertileWindow.end * 24 * 60 * 60 * 1000)).toLocaleDateString('en-NG')}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const today = new Date();
                      setSelectedDate(today);
                      setShowForm(true);

                      // Check if we already have data for today
                      const todayData = getDataForDate(today);
                      if (todayData) {
                        setIsPeriodDay(todayData.periodDay);
                        setMucusType(todayData.cervicalMucus);
                        setTemperature(todayData.temperature ? todayData.temperature.toString() : '');
                        setNotes(todayData.notes || '');
                      } else {
                        setIsPeriodDay(false);
                        setMucusType('unknown');
                        setTemperature('');
                        setNotes('');
                      }
                    }}
                    className="w-full px-4 py-2 text-white bg-[#00a499] rounded-md hover:bg-[#008c82]"
                  >
                    Record Today
                  </button>
                </div>
              ) : (
                <div>
                  <p className="mb-4">You haven't started tracking your cycle yet.</p>
                  <button
                    onClick={() => {
                      setSelectedDate(new Date());
                      setIsPeriodDay(true);
                      setShowForm(true);
                    }}
                    className="w-full px-4 py-2 text-white bg-[#00a499] rounded-md hover:bg-[#008c82]"
                  >
                    Start Tracking
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h3 className="text-xl font-bold mb-4 text-[#00a499]">About Natural Family Planning</h3>
              <p className="mb-4">
                Natural family planning helps you identify fertile days when pregnancy is more likely. By tracking your cycle, you can either avoid or plan pregnancy without the use of hormonal or barrier methods.
              </p>
              <p className="mb-4">
                For most accurate results, combine tracking of:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>Menstrual cycle dates</li>
                <li>Cervical mucus changes</li>
                <li>Basal body temperature (taken first thing in the morning)</li>
              </ul>
              <p className="mb-2">
                <Link to="/contraception/natural-methods" className="text-[#00a499] hover:underline">
                  Learn more about natural family planning →
                </Link>
              </p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-2 text-yellow-800">Important Notes</h3>
              <ul className="list-disc pl-5 space-y-2 text-yellow-700">
                <li>Natural family planning is 76-88% effective with perfect use.</li>
                <li>It requires consistent daily tracking and partner cooperation.</li>
                <li>This tool is for educational purposes only and should be used in consultation with a healthcare provider.</li>
                <li>It does not protect against sexually transmitted infections.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleTrackerPage;
