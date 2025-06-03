import React, { useState, useEffect, useRef } from 'react';
import { format, parse, startOfToday, add, eachDayOfInterval, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isToday, isSameDay, setHours, setMinutes, addHours } from 'date-fns';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Appointment } from '../features/professional/appointmentsService';

// Icons
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="m21 21-4.3-4.3"></path>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  status: string;
  status_display: string;
  priority: string;
  doctor_full_name?: string;
  hospital_name?: string;
  chief_complaint?: string;
  appointment_id: string;
  formatted_date?: string;
  formatted_time?: string;
  start_time?: Date;
  end_time?: Date;
  notes?: string;
  location?: string;
  event_type?: 'appointment' | 'personal';
}

interface ProfessionalCalendarProps {
  appointments: Appointment[];
  onSelectEvent: (event: CalendarEvent) => void;
  selectedEvent: CalendarEvent | null;
  className?: string;
  onAddEvent?: (event: CalendarEvent) => void;
}

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export function ProfessionalCalendar({ 
  appointments = [], 
  onSelectEvent,
  selectedEvent,
  className,
  onAddEvent 
}: ProfessionalCalendarProps) {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  });

  function previousMonth() {
    const firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function goToToday() {
    setCurrentMonth(format(today, 'MMM-yyyy'));
    setSelectedDay(today);
  }

  // Convert appointments to calendar events
  const calendarEvents: CalendarEvent[] = appointments.map(appointment => {
    const appointmentDate = new Date(appointment.appointment_date);
    return {
      id: appointment.appointment_id,
      title: appointment.chief_complaint || 'Appointment',
      date: appointmentDate,
      time: appointment.formatted_time || format(appointmentDate, 'h:mm a'),
      status: appointment.status,
      status_display: appointment.status_display,
      priority: appointment.priority,
      doctor_full_name: appointment.doctor_full_name,
      hospital_name: appointment.hospital_name,
      chief_complaint: appointment.chief_complaint,
      appointment_id: appointment.appointment_id,
      formatted_date: appointment.formatted_date,
      formatted_time: appointment.formatted_time,
    };
  });

  // Filter events by search query across all events
  const searchResults = searchQuery 
    ? calendarEvents.filter(event => 
        event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.doctor_full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.hospital_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.event_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.priority?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  // If search is active, show search results, otherwise show selected day events
  const selectedDayEvents = calendarEvents.filter(event => 
    isSameDay(event.date, selectedDay)
  );
  
  // Final filtered events to display
  const filteredEvents = searchQuery ? searchResults.filter(event => isSameDay(event.date, selectedDay)) : selectedDayEvents;

  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return calendarEvents.filter(event => isSameDay(event.date, day));
  };

  // Get status color based on appointment status
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'confirmed':
        return 'bg-amber-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-violet-500';
    }
  };
  
  // Get background color for days with events
  const getEventBackgroundColor = (status: string) => {
    switch(status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'in_progress':
        return 'bg-blue-50 border-blue-200';
      case 'confirmed':
        return 'bg-amber-50 border-amber-200';
      case 'cancelled':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-violet-50 border-violet-200';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {/* Calendar Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Calendar</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600 rounded-full flex items-center gap-1 order-first md:order-last"
            onClick={() => {
              // Initialize new event with default values
              const startTime = setHours(setMinutes(selectedDay, 0), 9); // 9:00 AM
              const endTime = addHours(startTime, 1); // 1 hour duration
              
              setNewEvent({
                id: `new-${Date.now()}`,
                title: '',
                date: selectedDay,
                time: format(startTime, 'h:mm a'),
                status: 'confirmed',
                status_display: 'Confirmed',
                priority: 'normal',
                start_time: startTime,
                end_time: endTime,
                appointment_id: `temp-${Date.now()}`,
                event_type: 'appointment' // Default to appointment type
              });
              setShowEventModal(true);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add event
          </Button>
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search events..."
              className="bg-gray-100 rounded-full pl-10 pr-10 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:bg-gray-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                onClick={() => setSearchQuery('')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
            
            {/* Real-time search dropdown */}
            {searchQuery && searchResults.length > 0 && (
              <div className="absolute z-50 mt-1 w-full sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto animate-fadeIn">
                <div className="p-2 border-b border-gray-100 bg-gray-50 rounded-t-lg">
                  <p className="text-xs text-gray-500 font-medium">Found {searchResults.length} results</p>
                </div>
                <div className="py-1">
                  {searchResults.slice(0, 5).map((event) => (
                    <div 
                      key={event.id}
                      className="px-3 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                      onClick={() => {
                        onSelectEvent(event);
                        // Set the selected day to the event's date
                        setSelectedDay(event.date);
                        // Clear search after selecting
                        setSearchQuery('');
                      }}
                    >
                      <div className="flex items-start">
                        {/* Event type icon */}
                        <div className="mr-2 mt-0.5">
                          {event.event_type === 'personal' ? (
                            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                              <svg className="w-3.5 h-3.5 text-purple-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                            </div>
                          ) : (
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              event.status === 'completed' ? 'bg-green-100' :
                              event.status === 'in_progress' ? 'bg-blue-100' :
                              event.status === 'confirmed' ? 'bg-yellow-100' :
                              event.status === 'cancelled' ? 'bg-red-100' :
                              'bg-gray-100'
                            }`}>
                              <svg className={`w-3.5 h-3.5 ${
                                event.status === 'completed' ? 'text-green-700' :
                                event.status === 'in_progress' ? 'text-blue-700' :
                                event.status === 'confirmed' ? 'text-yellow-700' :
                                event.status === 'cancelled' ? 'text-red-700' :
                                'text-gray-700'
                              }`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        {/* Event details */}
                        <div className="flex-1">
                          <div className="font-medium text-gray-900 text-sm">{event.title}</div>
                          <div className="flex items-center text-xs text-gray-500 mt-0.5">
                            <span>{format(event.date, 'MMM d')}</span>
                            <span className="mx-1">•</span>
                            <span>{event.time}</span>
                            <span className="mx-1">•</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                              event.event_type === 'personal' ? 'bg-purple-100 text-purple-800' :
                              event.status === 'completed' ? 'bg-green-100 text-green-800' :
                              event.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                              event.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                              event.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {event.event_type === 'personal' ? 'Personal' : event.status_display}
                            </span>
                          </div>
                        </div>
                        
                        {/* Arrow icon */}
                        <div className="text-gray-400">
                          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Show more results button */}
                  {searchResults.length > 5 && (
                    <div className="px-3 py-2 bg-gray-50 rounded-b-lg">
                      <button 
                        className="text-xs text-blue-600 font-medium hover:text-blue-800 w-full text-center"
                        onClick={() => {
                          // Scroll to search results section
                          document.getElementById('search-results-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        View all {searchResults.length} results
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
            activeTab === 'all'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          All events
        </button>
        <button
          onClick={() => setActiveTab('shared')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
            activeTab === 'shared'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          Shared
        </button>
        <button
          onClick={() => setActiveTab('public')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
            activeTab === 'public'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          Public
        </button>
        <button
          onClick={() => setActiveTab('archived')}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
            activeTab === 'archived'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          Archived
        </button>
      </div>

      {/* Month and Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {format(firstDayCurrentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            onClick={goToToday}
            variant="outline" 
            size="sm"
            className="border-gray-300 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            Today
          </Button>
          <div className="flex">
            <Button
              onClick={previousMonth}
              variant="outline"
              size="icon"
              className="rounded-l-full rounded-r-none border-r-0 hover:bg-gray-100 transition-all duration-200"
            >
              <ChevronLeft />
            </Button>
            <Button
              onClick={nextMonth}
              variant="outline"
              size="icon"
              className="rounded-r-full rounded-l-none hover:bg-gray-100 transition-all duration-200"
            >
              <ChevronRight />
            </Button>
          </div>
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-full px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:bg-gray-100"
              value="month"
            >
              <option value="month">Month view</option>
              <option value="week">Week view</option>
              <option value="day">Day view</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid - Desktop View / List View - Mobile */}
      <div>
        {/* Desktop Calendar View - Hidden on mobile */}
        <div className="hidden md:block">
          <div className="grid grid-cols-7 gap-2 mt-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={i} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2 mt-2">
            {days.map((day, dayIdx) => {
              const dayEvents = getEventsForDay(day);
              const hasEvents = dayEvents.length > 0;
              const isSelected = isSameDay(day, selectedDay);
              const mainEventStatus = hasEvents ? dayEvents[0].status : null;
              
              return (
                <div
                  key={day.toString()}
                  className={`relative p-2 h-28 rounded-xl transition-all duration-200 border ${
                    !isSameMonth(day, firstDayCurrentMonth) 
                      ? 'text-gray-400 bg-gray-50 border-gray-100' 
                      : hasEvents 
                        ? getEventBackgroundColor(mainEventStatus as string)
                        : 'bg-white border-gray-200'
                  } ${isToday(day) ? 'bg-blue-50 border-blue-200' : ''} ${
                    isSelected ? 'ring-2 ring-blue-600 shadow-sm' : 'hover:shadow-sm'
                  }`}
                  onClick={() => setSelectedDay(day)}
                >
                  <time
                    dateTime={format(day, 'yyyy-MM-dd')}
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium ${
                      isToday(day) ? 'bg-blue-600 text-white shadow-sm' : ''
                    } ${
                      isSelected && !isToday(day) ? 'font-semibold text-blue-600' : ''
                    }`}
                  >
                    {format(day, 'd')}
                  </time>
                  <div className="mt-1 overflow-y-auto max-h-20">
                    {hasEvents && dayEvents.slice(0, 3).map((event, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-xs mt-1 cursor-pointer p-1 rounded-lg hover:bg-white hover:bg-opacity-60 transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEvent(event);
                        }}
                      >
                        <div className={`w-2 h-2 rounded-full mr-1.5 ${getStatusColor(event.status)}`}></div>
                        <div className="truncate font-medium">{event.title}</div>
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-600 mt-1 pl-1 font-medium">
                        +{dayEvents.length - 3} more...
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Mobile Calendar List View - Shown only on mobile */}
        <div className="md:hidden">
          <div className="flex justify-between items-center mb-4 bg-blue-50 p-3 rounded-xl border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800">Current Month</h3>
            <span className="text-sm font-bold text-blue-800">{format(firstDayCurrentMonth, 'MMMM yyyy')}</span>
          </div>
          
          <div className="space-y-2">
            {days.filter(day => isSameMonth(day, firstDayCurrentMonth)).map((day) => {
              const dayEvents = getEventsForDay(day);
              const hasEvents = dayEvents.length > 0;
              const isSelected = isSameDay(day, selectedDay);
              const mainEventStatus = hasEvents ? dayEvents[0].status : null;
              const isCurrentDay = isToday(day);
              
              return (
                <div 
                  key={day.toString()}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    hasEvents 
                      ? 'border-l-4 ' + (mainEventStatus === 'completed' ? 'border-l-green-500' : 
                                       mainEventStatus === 'in_progress' ? 'border-l-blue-500' : 
                                       mainEventStatus === 'confirmed' ? 'border-l-amber-500' : 
                                       mainEventStatus === 'cancelled' ? 'border-l-red-500' : 
                                       'border-l-violet-500')
                      : 'border-gray-200'
                  } ${
                    isSelected ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div 
                    className={`flex items-center justify-between p-3 cursor-pointer ${
                      isCurrentDay ? 'bg-blue-50' : hasEvents ? getEventBackgroundColor(mainEventStatus as string) : 'bg-white'
                    }`}
                    onClick={() => setSelectedDay(day)}
                  >
                    <div className="flex items-center">
                      <div className={`flex flex-col items-center justify-center w-10 h-10 rounded-full mr-3 ${
                        isCurrentDay ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'
                      }`}>
                        <span className="text-xs font-medium">{format(day, 'EEE')}</span>
                        <span className="text-sm font-bold">{format(day, 'd')}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{format(day, 'MMMM d, yyyy')}</h4>
                        <p className="text-xs text-gray-500">
                          {hasEvents 
                            ? `${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}` 
                            : 'No events'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {hasEvents && (
                        <div className="flex -space-x-1 mr-2">
                          {dayEvents.slice(0, 3).map((event, idx) => (
                            <div 
                              key={idx} 
                              className={`w-2 h-2 rounded-full border border-white ${getStatusColor(event.status)}`}
                            />
                          ))}
                        </div>
                      )}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Show events for selected day in mobile view */}
                  {isSelected && hasEvents && (
                    <div className="border-t border-gray-100 divide-y divide-gray-100">
                      {dayEvents.map((event, idx) => (
                        <div 
                          key={idx}
                          className="p-3 flex items-center cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => onSelectEvent(event)}
                        >
                          <div className={`w-3 h-3 rounded-full mr-3 ${getStatusColor(event.status)}`} />
                          <div className="flex-1">
                            <h5 className="font-medium">{event.title}</h5>
                            <div className="flex items-center text-xs text-gray-500">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {event.time}
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            event.status === 'completed' ? 'bg-green-100 text-green-800' :
                            event.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            event.status === 'confirmed' ? 'bg-amber-100 text-amber-800' :
                            event.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {event.status_display}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && searchResults.length > 0 && (
        <div id="search-results-section" className="mt-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            Search Results ({searchResults.length})
          </h3>
          <div className="space-y-3 mb-8">
            {searchResults.map((event) => (
              <div
                key={event.id}
                className={`p-4 rounded-xl border shadow-sm ${
                  selectedEvent?.id === event.id 
                    ? `border-${event.status === 'completed' ? 'green' : event.status === 'in_progress' ? 'blue' : event.status === 'confirmed' ? 'amber' : event.status === 'cancelled' ? 'red' : 'violet'}-500 ${getEventBackgroundColor(event.status)}` 
                    : 'border-gray-200'
                } hover:border-blue-500 hover:shadow-md cursor-pointer transition-all duration-200`}
                onClick={() => onSelectEvent(event)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span className="font-medium">{format(event.date, 'MMM d, yyyy')}</span>
                      <span className="mx-2">•</span>
                      <ClockIcon />
                      <span className="ml-1">{event.time}</span>
                      <span className="mx-2">•</span>
                      {event.event_type === 'personal' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          Personal
                        </span>
                      ) : (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          event.status === 'completed' ? 'bg-green-100 text-green-800' :
                          event.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          event.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                          event.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${getStatusColor(event.status)}`}></span>
                          {event.status_display}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-px bg-gray-200 my-6" />
        </div>
      )}
      
      {/* Selected Day Events */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          Events for {format(selectedDay, 'MMMM d, yyyy')}
        </h3>
        {filteredEvents.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-gray-500">{searchQuery ? 'No matching events for this day' : 'No events scheduled for this day'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className={`p-4 rounded-xl border shadow-sm ${
                  selectedEvent?.id === event.id 
                    ? `border-${event.status === 'completed' ? 'green' : event.status === 'in_progress' ? 'blue' : event.status === 'confirmed' ? 'amber' : event.status === 'cancelled' ? 'red' : 'violet'}-500 ${getEventBackgroundColor(event.status)}` 
                    : 'border-gray-200'
                } hover:border-blue-500 hover:shadow-md cursor-pointer transition-all duration-200`}
                onClick={() => onSelectEvent(event)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                      <ClockIcon />
                      <span className="ml-1">{event.time}</span>
                      <span className="mx-2">•</span>
                      {event.event_type === 'personal' ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          Personal
                        </span>
                      ) : (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          event.status === 'completed' ? 'bg-green-100 text-green-800' :
                          event.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          event.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                          event.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${getStatusColor(event.status)}`}></span>
                          {event.status_display}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 animate-fadeIn">
            {/* Header */}
            <div className={`p-6 text-white ${selectedEvent.event_type === 'personal' ? 'bg-gradient-to-r from-purple-600 to-purple-700' : 'bg-gradient-to-r from-blue-600 to-blue-700'}`}>
              <div className="flex items-center gap-2">
                {selectedEvent.event_type === 'personal' ? (
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                ) : (
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                )}
                <h3 className="font-bold text-xl">{selectedEvent.chief_complaint || selectedEvent.title}</h3>
              </div>
              <div className="flex items-center mt-2 text-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {selectedEvent.formatted_date || format(selectedEvent.date, 'MMMM d, yyyy')} at {selectedEvent.time}
              </div>
              {selectedEvent.event_type === 'personal' && (
                <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500 text-white">
                  Personal Event
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-[120px_1fr] gap-y-4 gap-x-3">
                <div className="text-gray-600 font-medium">Appointment ID:</div>
                <div className="text-gray-800 font-mono">{selectedEvent.appointment_id}</div>
                
                <div className="text-gray-600 font-medium">Status:</div>
                {selectedEvent.event_type === 'personal' ? (
                  <div className="font-semibold rounded-full px-3 py-1 text-xs inline-flex items-center bg-purple-100 text-purple-800">
                    <span className="inline-block w-2 h-2 rounded-full mr-2 bg-purple-500"></span>
                    Personal
                  </div>
                ) : (
                  <div className={`font-semibold rounded-full px-3 py-1 text-xs inline-flex items-center ${
                    selectedEvent.status === 'completed' ? 'bg-green-100 text-green-800' :
                    selectedEvent.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    selectedEvent.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                    selectedEvent.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(selectedEvent.status)}`}></span>
                    {selectedEvent.status_display}
                  </div>
                )}
                
                <div className="text-gray-600 font-medium">Priority:</div>
                <div className={`font-semibold rounded-full px-3 py-1 text-xs inline-flex items-center ${
                  selectedEvent.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                  selectedEvent.priority === 'high' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    selectedEvent.priority === 'urgent' ? 'bg-red-500' :
                    selectedEvent.priority === 'high' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></span>
                  {selectedEvent.priority && selectedEvent.priority.charAt(0).toUpperCase() + selectedEvent.priority.slice(1)}
                </div>
                
                {selectedEvent.doctor_full_name && (
                  <>
                    <div className="text-gray-600 font-medium">Doctor:</div>
                    <div className="text-blue-700 font-medium">{selectedEvent.doctor_full_name}</div>
                  </>
                )}
                
                {selectedEvent.hospital_name && (
                  <>
                    <div className="text-gray-600 font-medium">Hospital:</div>
                    <div className="text-blue-700">{selectedEvent.hospital_name}</div>
                  </>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
                onClick={() => onSelectEvent(selectedEvent)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal - Apple Style */}
      {showEventModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={(e) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
              setShowEventModal(false);
            }
          }}
        >
          <div 
            ref={modalRef}
            className="bg-white dark:bg-gray-800 rounded-2xl p-0 max-w-md w-full max-h-[90vh] overflow-hidden shadow-xl transform transition-all"
            style={{ animation: 'modal-pop-up 0.3s ease-out forwards' }}
          >
            {/* Modal Header */}
            <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-medium">New Event</h3>
              <button 
                onClick={() => setShowEventModal(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Event Type */}
              <div>
                <label htmlFor="event-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {['appointment', 'personal'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`px-3 py-2 rounded-lg text-sm font-medium capitalize flex items-center justify-center ${newEvent.event_type === type ? 'bg-blue-100 text-blue-700 border border-blue-500 dark:bg-blue-900 dark:text-blue-200' : 'border border-gray-300 dark:border-gray-600'}`}
                      onClick={() => setNewEvent({...newEvent, event_type: type as 'appointment' | 'personal'})}
                    >
                      {type === 'appointment' ? (
                        <>
                          <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                            <path d="M9 14l2 2 4-4"></path>
                          </svg>
                          Appointment
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          Personal
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Title Input */}
              <div>
                <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  id="event-title"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder={newEvent.event_type === 'appointment' ? "Add appointment title" : "Add personal event title"}
                  value={newEvent.title || ''}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  autoFocus
                />
              </div>
              
              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="event-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                  <input
                    id="event-date"
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    value={format(newEvent.date || selectedDay, 'yyyy-MM-dd')}
                    onChange={(e) => {
                      const newDate = e.target.value ? new Date(e.target.value) : selectedDay;
                      setNewEvent({...newEvent, date: newDate});
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="event-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                  <input
                    id="event-time"
                    type="time"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    value={newEvent.start_time ? format(newEvent.start_time, 'HH:mm') : '09:00'}
                    onChange={(e) => {
                      if (e.target.value) {
                        const [hours, minutes] = e.target.value.split(':').map(Number);
                        const startTime = setHours(setMinutes(newEvent.date || selectedDay, minutes), hours);
                        const endTime = addHours(startTime, 1);
                        setNewEvent({
                          ...newEvent, 
                          start_time: startTime,
                          end_time: endTime,
                          time: format(startTime, 'h:mm a')
                        });
                      }
                    }}
                  />
                </div>
              </div>
              
              {/* Duration */}
              <div>
                <label htmlFor="event-duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</label>
                <select
                  id="event-duration"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value="60"
                  onChange={(e) => {
                    const durationMinutes = parseInt(e.target.value);
                    if (newEvent.start_time) {
                      const endTime = new Date(newEvent.start_time);
                      endTime.setMinutes(endTime.getMinutes() + durationMinutes);
                      setNewEvent({...newEvent, end_time: endTime});
                    }
                  }}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
              
              {/* Status */}
              <div>
                <label htmlFor="event-status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <div className="grid grid-cols-4 gap-2">
                  {['confirmed', 'in_progress', 'completed', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={`px-3 py-2 rounded-lg text-xs font-medium capitalize flex flex-col items-center justify-center ${newEvent.status === status ? 'ring-2 ring-blue-500' : 'border border-gray-300 dark:border-gray-600'}`}
                      onClick={() => setNewEvent({...newEvent, status, status_display: status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')})}
                    >
                      <div className={`w-3 h-3 rounded-full mb-1 ${getStatusColor(status)}`}></div>
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Priority */}
              <div>
                <label htmlFor="event-priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                <div className="grid grid-cols-3 gap-2">
                  {['low', 'normal', 'urgent'].map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      className={`px-3 py-2 rounded-lg text-xs font-medium capitalize ${newEvent.priority === priority ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'border border-gray-300 dark:border-gray-600'}`}
                      onClick={() => setNewEvent({...newEvent, priority})}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Notes */}
              <div>
                <label htmlFor="event-notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
                <textarea
                  id="event-notes"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Add notes"
                  rows={3}
                  value={newEvent.notes || ''}
                  onChange={(e) => setNewEvent({...newEvent, notes: e.target.value})}
                ></textarea>
              </div>
              
              {/* Location */}
              <div>
                <label htmlFor="event-location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <input
                  id="event-location"
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Add location"
                  value={newEvent.location || ''}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                />
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 flex justify-end space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
                onClick={() => setShowEventModal(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  if (newEvent.title && newEvent.date) {
                    // Create a complete event object
                    const completeEvent = {
                      ...newEvent,
                      id: `new-${Date.now()}`,
                      title: newEvent.title,
                      date: newEvent.date,
                      time: newEvent.time || format(newEvent.start_time || new Date(), 'h:mm a'),
                      status: newEvent.status || 'confirmed',
                      status_display: newEvent.status_display || 'Confirmed',
                      priority: newEvent.priority || 'normal',
                      appointment_id: newEvent.event_type === 'personal' ? 
                        `personal-${Date.now()}` : 
                        `temp-${Date.now()}`,
                      event_type: newEvent.event_type || 'appointment'
                    } as CalendarEvent;
                    
                    // Call the onAddEvent callback if provided
                    if (onAddEvent) {
                      onAddEvent(completeEvent);
                    }
                    
                    // Close the modal
                    setShowEventModal(false);
                  }
                }}
                disabled={!newEvent.title}
              >
                Add Event
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS for animation */}
      <style>
        {`
        @keyframes modal-pop-up {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        `}
      </style>
    </div>
  );
}
