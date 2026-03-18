import React, { useState, useEffect } from 'react';
import {
    addDays,
    startOfWeek,
    format,
    isSameDay,
    addWeeks,
    subWeeks,
    startOfToday
} from 'date-fns';
import { Visit, VisitTask, StaffMember, StaffService } from '../../../services/staffService';
import { ChevronLeft, ChevronRight, Plus, Download, Calendar, Clock, User, CheckCircle, AlertCircle, Users, Search } from 'lucide-react';
import VisitDetailsModal from './VisitDetailsModal';
import {
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
    DragStartEvent,
    DragEndEvent,
    useDroppable,
    PointerSensor
} from '@dnd-kit/core';
import DraggableVisitCard from './DraggableVisitCard';
import DraggableStaffItem from './DraggableStaffItem';
import { createPortal } from 'react-dom';

interface StaffScheduleViewProps {
    staffMembers: StaffMember[];
    currentDate: Date;
    onDateChange: (date: Date) => void;
    onAddVisit: (date: Date, staffId?: number) => void;
    onDownload: () => void;
}

const DroppableDay = ({ date, children, isToday, onAddVisit }: { date: Date, children: React.ReactNode, isToday: boolean, onAddVisit: (date: Date) => void }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: `day-${date.toISOString()}`,
        data: {
            type: 'day',
            date: date,
        },
    });

    return (
        <div
            ref={setNodeRef}
            className={`p-3 border-r border-gray-100 last:border-r-0 border-b border-gray-100 relative group transition-colors min-h-[150px]
                ${isToday ? 'bg-blue-50/10' : ''}
                ${isOver ? 'bg-blue-100/50' : 'hover:bg-gray-50/30'}
            `}
        >
            {/* Empty State / Add Button appearing on Hover */}
            <div className="absolute inset-x-0 bottom-0 top-auto flex justify-center pb-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-0">
            </div>

            {/* Visits List */}
            <div className="relative z-10 space-y-3 h-full">
                {children}

                {React.Children.count(children) === 0 && (
                    <div className="h-full flex items-center justify-center">
                        <button
                            onClick={() => onAddVisit(date)}
                            className="hidden group-hover:flex flex-col items-center text-gray-300 hover:text-blue-600 transition-colors p-4 rounded-lg hover:bg-blue-50/50"
                        >
                            <Plus className="w-8 h-8 mb-1" />
                            <span className="text-xs font-medium">Add Schedule</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const StaffScheduleView: React.FC<StaffScheduleViewProps> = ({
    staffMembers,
    currentDate,
    onDateChange,
    onAddVisit,
    onDownload
}) => {
    const [visits, setVisits] = useState<Visit[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
    const [activeDragItem, setActiveDragItem] = useState<any>(null);
    const [activeDragType, setActiveDragType] = useState<'visit' | 'staff' | null>(null);
    const [staffSearchQuery, setStaffSearchQuery] = useState('');

    // Calculate week days
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start on Monday
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

    // Sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor)
    );

    useEffect(() => {
        fetchVisits();
    }, [startDate]);

    const fetchVisits = async () => {
        setLoading(true);
        try {
            const endDate = addDays(startDate, 6);
            const data = await StaffService.getVisits(
                startDate.toISOString(),
                endDate.toISOString()
            );
            setVisits(data);
        } catch (error) {
            console.error('Error fetching visits:', error);
        } finally {
            setLoading(false);
        }
    };

    const getVisitsForDay = (date: Date) => {
        return visits.filter(visit => isSameDay(new Date(visit.date), date));
    };

    const handleUpdateVisit = async (updatedVisit: Visit) => {
        // Optimistic update
        setVisits(prev => prev.map(v => v.id === updatedVisit.id ? updatedVisit : v));
        setSelectedVisit(null);

        // TODO: API call to sync changes
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const type = active.data.current?.type;

        if (type === 'visit') {
            setActiveDragType('visit');
            setActiveDragItem(active.data.current?.visit);
        } else if (type === 'staff') {
            setActiveDragType('staff');
            setActiveDragItem(active.data.current?.staff);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        setActiveDragItem(null);
        setActiveDragType(null);

        if (!over) return;

        if (active.data.current?.type === 'visit' && over.data.current?.type === 'day') {
            const visit = active.data.current.visit as Visit;
            const newDate = over.data.current.date as Date;

            // Create a new date object preserving the time
            const originalDate = new Date(visit.date);
            const updatedDate = new Date(newDate);
            updatedDate.setHours(originalDate.getHours());
            updatedDate.setMinutes(originalDate.getMinutes());

            // Only update if day changed
            if (!isSameDay(originalDate, updatedDate)) {
                handleUpdateVisit({
                    ...visit,
                    date: updatedDate.toISOString(),
                    // Optionally update status if moving to future/past
                });
            }
        }

        // Case 2: Dragging a Staff to a Visit (Assignment)
        if (active.data.current?.type === 'staff' && over.data.current?.type === 'visit-drop') {
            const staff = active.data.current.staff as StaffMember;
            const visit = over.data.current.visit as Visit;

            handleUpdateVisit({
                ...visit,
                staffId: staff.id,
                staffName: staff.full_name,
                // Automatically set status to scheduled if it was pending/not-started
                status: visit.status === 'not-started' ? 'scheduled' : visit.status
            });
        }

        // Case 3: Dragging a Staff to a Day (Create Visit)
        if (active.data.current?.type === 'staff' && over.data.current?.type === 'day') {
            const staff = active.data.current.staff as StaffMember;
            const date = over.data.current.date as Date;

            // Open Add Visit Modal with pre-filled staff and date
            onAddVisit(date, staff.id);
        }
    };

    // Filter staff
    const filteredStaff = staffMembers.filter(s =>
        s.full_name.toLowerCase().includes(staffSearchQuery.toLowerCase()) ||
        s.role_display?.toLowerCase().includes(staffSearchQuery.toLowerCase())
    );

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex h-full gap-6">
                {/* Main Calendar Area */}
                <div className="flex-1 flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header Controls */}
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1 border border-gray-100">
                                <button
                                    onClick={() => onDateChange(subWeeks(currentDate, 1))}
                                    className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-600"
                                    title="Previous Week"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => onDateChange(addWeeks(currentDate, 1))}
                                    className="p-1.5 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-600"
                                    title="Next Week"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-gray-900 flex items-center tracking-tight">
                                    {format(startDate, 'MMMM yyyy')}
                                </span>
                                <div className="relative group">
                                    <label htmlFor="date-jump" className="p-1.5 rounded-full hover:bg-gray-100 cursor-pointer text-gray-400 hover:text-blue-600 transition-colors block">
                                        <Calendar className="w-4 h-4" />
                                    </label>
                                    <input
                                        id="date-jump"
                                        type="date"
                                        className="absolute top-0 left-0 opacity-0 w-full h-full cursor-pointer"
                                        onChange={(e) => {
                                            if (e.target.value) onDateChange(new Date(e.target.value));
                                        }}
                                    />
                                </div>
                                <span className="mx-2 text-gray-300 font-light hidden sm:inline">|</span>
                                <span className="text-sm font-medium text-gray-500 hidden sm:inline">
                                    Week of {format(startDate, 'd MMMM')}
                                </span>
                            </div>

                            <button
                                onClick={() => onDateChange(new Date())}
                                className="text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap"
                            >
                                Today
                            </button>
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => onAddVisit(currentDate)}
                                className="flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg shadow-sm transition-all transform hover:-translate-y-0.5"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Visit
                            </button>
                            <button
                                onClick={onDownload}
                                className="flex items-center px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg shadow-sm transition-colors"
                            >
                                <Download className="w-4 h-4 mr-2" />
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="flex-1 overflow-x-auto bg-gray-50/50">
                        <div className="min-w-[800px] h-full flex flex-col">
                            {/* Week Header */}
                            <div className="grid grid-cols-7 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
                                {weekDays.map((day, i) => {
                                    const isTodayDate = isSameDay(day, new Date());
                                    return (
                                        <div key={i} className={`py-4 px-2 text-center border-r border-gray-100 last:border-r-0 ${isTodayDate ? 'bg-blue-50/30' : ''}`}>
                                            <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isTodayDate ? 'text-blue-600' : 'text-gray-400'}`}>
                                                {format(day, 'EEE')}
                                            </div>
                                            <div className={`text-xl font-bold inline-flex items-center justify-center w-10 h-10 rounded-full transition-all ${isTodayDate ? 'bg-blue-600 text-white shadow-md scale-110' : 'text-gray-900 hover:bg-gray-100'
                                                }`}>
                                                {format(day, 'd')}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Visits Grid */}
                            <div className="grid grid-cols-7 flex-1 min-h-[600px] bg-white">
                                {weekDays.map((day, i) => {
                                    const dayVisits = getVisitsForDay(day);
                                    const isTodayDate = isSameDay(day, new Date());

                                    return (
                                        <DroppableDay
                                            key={day.toISOString()}
                                            date={day}
                                            isToday={isTodayDate}
                                            onAddVisit={onAddVisit}
                                        >
                                            {dayVisits.map(visit => (
                                                <DraggableVisitWrapper
                                                    key={visit.id}
                                                    visit={visit}
                                                    onClick={setSelectedVisit}
                                                />
                                            ))}
                                        </DroppableDay>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Staff List */}
                <div className="w-72 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden flex-shrink-0">
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center mb-3">
                            <Users className="w-4 h-4 mr-2" />
                            Staff Members
                        </h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search staff..."
                                value={staffSearchQuery}
                                onChange={(e) => setStaffSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-1">
                        {filteredStaff.length > 0 ? (
                            filteredStaff.map(staff => (
                                <DraggableStaffItem key={staff.id} staff={staff} />
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-400 text-sm">No staff found</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Drag Overlay */}
            {createPortal(
                <DragOverlay>
                    {activeDragItem ? (
                        activeDragType === 'visit' ? (
                            <div className="opacity-90 rotate-3 cursor-grabbing">
                                <DraggableVisitCard visit={activeDragItem} onClick={() => { }} />
                            </div>
                        ) : (
                            <div className="opacity-90 rotate-3 cursor-grabbing">
                                <DraggableStaffItem staff={activeDragItem} />
                            </div>
                        )
                    ) : null}
                </DragOverlay>,
                document.body
            )}

            {/* Visit Details Modal */}
            <VisitDetailsModal
                isOpen={!!selectedVisit}
                onClose={() => setSelectedVisit(null)}
                visit={selectedVisit}
                onUpdateVisit={handleUpdateVisit}
            />
        </DndContext>
    );
};

// Wrapper to make visit cards also droppable for staff assignment
const DraggableVisitWrapper: React.FC<{ visit: Visit, onClick: (v: Visit) => void }> = ({ visit, onClick }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: `visit-drop-${visit.id}`,
        data: {
            type: 'visit-drop',
            visit: visit
        }
    });

    return (
        <div ref={setNodeRef} className={`transition-all rounded-xl ${isOver ? 'ring-2 ring-blue-500 ring-offset-2 bg-blue-50' : ''}`}>
            <DraggableVisitCard visit={visit} onClick={onClick} />
        </div>
    );
};

export default StaffScheduleView;
