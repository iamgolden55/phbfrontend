import React, { useState, useEffect } from 'react';
import { format, addWeeks } from 'date-fns';

interface WeekData {
  week: number;
  title: string;
  babyDevelopment: string;
  momChanges: string;
  size: string;
  tips: string;
  imageSrc?: string;
}

// Sample weekly pregnancy data
const pregnancyData: WeekData[] = [
  {
    week: 1,
    title: "Conception",
    babyDevelopment: "Fertilization occurs when sperm meets egg. Cell division begins almost immediately.",
    momChanges: "You likely won't feel any different yet, though you may have subtle hormone changes.",
    size: "Microscopic",
    tips: "Start taking prenatal vitamins with folic acid if you haven't already.",
    imageSrc: "https://images.unsplash.com/photo-1632091463879-e2e04c34e8a9?w=300&h=200&fit=crop&q=80"
  },
  {
    week: 4,
    title: "Implantation Complete",
    babyDevelopment: "The embryo has implanted in the uterine wall. The primitive placenta begins to form.",
    momChanges: "You may experience implantation bleeding or early pregnancy symptoms like breast tenderness.",
    size: "Poppy seed (about 0.04 inches)",
    tips: "Take a home pregnancy test as you've likely missed your period by now.",
    imageSrc: "https://images.unsplash.com/photo-1632091463879-e2e04c34e8a9?w=300&h=200&fit=crop&q=80"
  },
  {
    week: 8,
    title: "Early Organ Development",
    babyDevelopment: "Major organs begin to form. The heart is beating, and hands and feet are developing.",
    momChanges: "Morning sickness, fatigue, and frequent urination are common symptoms now.",
    size: "Kidney bean (about 0.6 inches)",
    tips: "Schedule your first prenatal appointment if you haven't already.",
    imageSrc: "https://images.unsplash.com/photo-1632157916092-5b35641b4c38?w=300&h=200&fit=crop&q=80"
  },
  {
    week: 12,
    title: "First Trimester Milestone",
    babyDevelopment: "All essential organs are formed. Fingers and toes are distinct, and nails begin to grow.",
    momChanges: "The uterus expands beyond the pelvis. Morning sickness may begin to ease.",
    size: "Lime (about 2.1 inches)",
    tips: "First trimester screening tests might be done now.",
    imageSrc: "https://images.unsplash.com/photo-1522840797147-1837235c5ebf?w=300&h=200&fit=crop&q=80"
  },
  {
    week: 16,
    title: "Gender Determination",
    babyDevelopment: "Eyes move behind closed lids. If you have an ultrasound, you might be able to learn the sex.",
    momChanges: "You may start feeling better with less nausea and more energy.",
    size: "Avocado (about 4.6 inches)",
    tips: "Begin sleeping on your side to improve circulation to your baby.",
    imageSrc: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=300&h=200&fit=crop&q=80"
  },
  {
    week: 20,
    title: "Halfway Point",
    babyDevelopment: "Baby can hear sounds outside the womb. Hair is growing on the head.",
    momChanges: "You'll likely have a detailed anatomy scan ultrasound around this time.",
    size: "Banana (about 6.5 inches)",
    tips: "Start doing daily kick counts to track your baby's movement patterns.",
    imageSrc: "https://images.unsplash.com/photo-1535185384036-28bbc8035f28?w=300&h=200&fit=crop&q=80"
  },
  {
    week: 24,
    title: "Viability Milestone",
    babyDevelopment: "The lungs begin to produce surfactant, critical for breathing. Baby has a chance of survival if born now with intensive care.",
    momChanges: "You may notice Braxton Hicks contractions and skin changes like stretch marks.",
    size: "Corn (about 11.8 inches)",
    tips: "Consider taking a childbirth education class in the coming weeks.",
    imageSrc: "https://images.unsplash.com/photo-1631729480622-f6115348269b?w=300&h=200&fit=crop&q=80"
  },
  {
    week: 28,
    title: "Third Trimester Begins",
    babyDevelopment: "Baby's brain is developing rapidly. Eyes can open and close, and can sense light.",
    momChanges: "You may experience back pain, leg cramps, and trouble sleeping.",
    size: "Eggplant (about 14.8 inches)",
    tips: "Monitor for signs of preeclampsia, including sudden swelling and headaches.",
    imageSrc: "https://images.unsplash.com/photo-1613914633339-4760c6031aea?w=300&h=200&fit=crop&q=80"
  },
  {
    week: 32,
    title: "Rapid Weight Gain",
    babyDevelopment: "Baby is practicing breathing movements and gaining weight rapidly.",
    momChanges: "Your uterus extends well above your belly button. Shortness of breath is common.",
    size: "Squash (about 16.7 inches)",
    tips: "Finalize your birth plan and pack your hospital bag.",
    imageSrc: "https://images.unsplash.com/photo-1489760687210-77d738caaeba?w=300&h=200&fit=crop&q=80"
  },
  {
    week: 36,
    title: "Baby Positioning",
    babyDevelopment: "Most babies move into the head-down position in preparation for birth.",
    momChanges: "You may feel pressure in your pelvis as the baby drops lower.",
    size: "Honeydew melon (about 18.7 inches)",
    tips: "Weekly prenatal visits typically begin now to monitor your progress.",
    imageSrc: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=300&h=200&fit=crop&q=80"
  },
  {
    week: 40,
    title: "Full Term",
    babyDevelopment: "Baby is fully developed and ready to meet you!",
    momChanges: "You may notice the mucus plug being expelled or your water breaking.",
    size: "Small pumpkin (about 20.2 inches)",
    tips: "Know the signs of labor: regular contractions, water breaking, and the mucus plug passing.",
    imageSrc: "https://images.unsplash.com/photo-1548078113-818ad1555a40?w=300&h=200&fit=crop&q=80"
  },
];

const PregnancyCalendar: React.FC = () => {
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number>(12); // Default to showing week 12
  const [weekInfo, setWeekInfo] = useState<WeekData | null>(null);
  const [savedDate, setSavedDate] = useState<string>('');

  // Load saved due date from localStorage on initial render
  useEffect(() => {
    const savedDueDate = localStorage.getItem('pregnancyDueDate');
    if (savedDueDate) {
      setSavedDate(savedDueDate);
      const date = new Date(savedDueDate);
      setDueDate(date);
      calculateCurrentWeek(date);
    }
  }, []);

  // Update week info when selected week changes
  useEffect(() => {
    const found = pregnancyData.find(data => data.week === selectedWeek);
    if (found) {
      setWeekInfo(found);
    } else {
      // If no exact match, find the closest week in the data
      const weeks = pregnancyData.map(data => data.week);
      const closest = weeks.reduce((prev, curr) =>
        Math.abs(curr - selectedWeek) < Math.abs(prev - selectedWeek) ? curr : prev
      );
      setWeekInfo(pregnancyData.find(data => data.week === closest) || null);
    }
  }, [selectedWeek]);

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value;
    if (dateValue) {
      const newDueDate = new Date(dateValue);
      setDueDate(newDueDate);
      setSavedDate(dateValue);
      localStorage.setItem('pregnancyDueDate', dateValue);
      calculateCurrentWeek(newDueDate);
    } else {
      setDueDate(null);
      setCurrentWeek(null);
      setSavedDate('');
      localStorage.removeItem('pregnancyDueDate');
    }
  };

  const calculateCurrentWeek = (dueDateValue: Date) => {
    // Pregnancy is approximately 40 weeks from the last menstrual period
    // Due date is the end of the 40th week
    const today = new Date();

    // Calculate the date of the last menstrual period (LMP)
    const lmpDate = new Date(dueDateValue);
    lmpDate.setDate(lmpDate.getDate() - 280); // 40 weeks = 280 days

    // Calculate the difference in days
    const diffTime = Math.abs(today.getTime() - lmpDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Convert days to weeks
    const weeks = Math.floor(diffDays / 7);

    // If it's within the 1-40 weeks pregnancy range
    if (weeks >= 1 && weeks <= 42) {
      setCurrentWeek(weeks);
      setSelectedWeek(weeks);
    } else if (weeks > 42) {
      // Past due date
      setCurrentWeek(42);
      setSelectedWeek(40);
    } else {
      // Not pregnant yet according to dates
      setCurrentWeek(null);
      setSelectedWeek(12); // Default view
    }
  };

  const handleWeekSelect = (week: number) => {
    setSelectedWeek(week);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Pregnancy Week by Week</h2>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Enter Your Due Date (Optional)</label>
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <input
              type="date"
              className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md mb-2 sm:mb-0"
              value={savedDate}
              onChange={handleDueDateChange}
            />
            {currentWeek && (
              <div className="flex items-center bg-blue-50 p-2 rounded-md">
                <span className="text-blue-600 font-bold mr-2">You are in week:</span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full font-bold">
                  {currentWeek}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Week selector */}
        <div className="mb-8">
          <label className="block mb-2 font-medium">Select Week to View</label>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 40 }, (_, i) => i + 1).map(week => (
              <button
                key={week}
                onClick={() => handleWeekSelect(week)}
                className={`px-3 py-1 rounded-md text-sm font-medium
                  ${selectedWeek === week
                    ? 'bg-[#0891b2] text-white'
                    : currentWeek === week
                      ? 'bg-blue-100 text-blue-600 border border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {week}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline visualization */}
        <div className="mb-8 overflow-x-auto">
          <div className="relative min-w-max pt-6 pb-2">
            <div className="h-2 bg-gray-200 absolute top-0 left-0 right-0 mt-8"></div>

            <div className="flex items-start justify-between">
              <div className="text-center flex-1 relative">
                <div className="absolute left-1/2 -ml-3 mt-2 w-6 h-6 rounded-full bg-blue-100 border-2 border-blue-600 z-10"></div>
                <div className="pt-10 px-4">
                  <span className="block font-medium text-sm">First Trimester</span>
                  <span className="text-xs text-gray-500">Week 1-12</span>
                </div>
              </div>

              <div className="text-center flex-1 relative">
                <div className="absolute left-1/2 -ml-3 mt-2 w-6 h-6 rounded-full bg-green-100 border-2 border-green-600 z-10"></div>
                <div className="pt-10 px-4">
                  <span className="block font-medium text-sm">Second Trimester</span>
                  <span className="text-xs text-gray-500">Week 13-26</span>
                </div>
              </div>

              <div className="text-center flex-1 relative">
                <div className="absolute left-1/2 -ml-3 mt-2 w-6 h-6 rounded-full bg-purple-100 border-2 border-purple-600 z-10"></div>
                <div className="pt-10 px-4">
                  <span className="block font-medium text-sm">Third Trimester</span>
                  <span className="text-xs text-gray-500">Week 27-40</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected week information */}
        {weekInfo ? (
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="sm:flex items-start">
              {weekInfo.imageSrc && (
                <div className="sm:w-1/3 mb-4 sm:mb-0 sm:mr-6">
                  <img
                    src={weekInfo.imageSrc}
                    alt={`Pregnancy week ${weekInfo.week}`}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                </div>
              )}

              <div className={weekInfo.imageSrc ? "sm:w-2/3" : "w-full"}>
                <h3 className="text-xl font-bold mb-2">
                  Week {weekInfo.week}: {weekInfo.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="border-l-4 border-blue-500 pl-3">
                    <h4 className="font-bold text-blue-700">Baby Size</h4>
                    <p>{weekInfo.size}</p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-3">
                    <h4 className="font-bold text-purple-700">Tips</h4>
                    <p>{weekInfo.tips}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-bold text-lg mb-2">Baby's Development</h4>
                  <p className="mb-4">{weekInfo.babyDevelopment}</p>

                  <h4 className="font-bold text-lg mb-2">Changes in Your Body</h4>
                  <p>{weekInfo.momChanges}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              {selectedWeek > 1 && (
                <button
                  onClick={() => handleWeekSelect(selectedWeek - 1)}
                  className="text-sm text-[#0891b2] hover:underline flex items-center"
                >
                  <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous Week
                </button>
              )}

              <div className="flex-1"></div>

              {selectedWeek < 40 && (
                <button
                  onClick={() => handleWeekSelect(selectedWeek + 1)}
                  className="text-sm text-[#0891b2] hover:underline flex items-center"
                >
                  Next Week
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">Select a week to see details</div>
        )}
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-md">
        <h3 className="font-bold text-lg text-blue-800 mb-2">About This Calendar</h3>
        <p className="mb-2">
          This calendar provides a general guide to your pregnancy journey. Every pregnancy is unique, and development can vary.
        </p>
        <p>
          The information provided is for educational purposes only and should not replace medical advice from your healthcare provider.
        </p>
      </div>
    </div>
  );
};

export default PregnancyCalendar;
