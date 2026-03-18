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
import { Visit, VisitTask, StaffMember, StaffService } from '../../../../services/staffService';
import { ChevronLeft, ChevronRight, Plus, Download, Calendar, Users, Search, Filter } from 'lucide-react';
import VisitDetailsModal from '../../components/VisitDetailsModal';
import AddVisitModal from '../../components/AddVisitModal';
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
import DraggableVisitCard from '../../components/DraggableVisitCard';
import DraggableStaffItem from '../../components/DraggableStaffItem';
import { createPortal } from 'react-dom';

interface DroppableDayProps {
    date: Date;
    children: React.ReactNode;
    isToday: boolean;
    onAddVisit: (date: Date) => void;
}

const DroppableDay = ({ date, children, isToday, onAddVisit }: DroppableDayProps) => {
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
                ${isToday ? 'bg-pink-50/20' : ''}
                ${isOver ? 'bg-pink-100/50' : 'hover:bg-gray-50/50'}
            `}
        >
            <div className="relative z-10 space-y-3 h-full">
                {children}

                <div className="h-full flex items-center justify-center min-h-[50px]">
                    <button
                        onClick={() => onAddVisit(date)}
                        className="opacity-0 group-hover:opacity-100 flex flex-col items-center text-gray-300 hover:text-pink-600 transition-all p-2 rounded-lg hover:bg-pink-50/50 w-full"
                    >
                        <Plus className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Add Visit</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// Wrapper to make visit cards also droppable for staff assignment
const DroppableVisitWrapper: React.FC<{ visit: Visit, onClick: (v: Visit) => void }> = ({ visit, onClick }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: `visit-drop-${visit.id}`,
        data: {
            type: 'visit-drop',
            visit: visit
        }
    });

    return (
        <div ref={setNodeRef} className={`transition-all rounded-xl ${isOver ? 'ring-2 ring-pink-500 ring-offset-2 bg-pink-50' : ''}`}>
            <DraggableVisitCard visit={visit} onClick={onClick} />
        </div>
    );
};

const WomensHealthSchedule: React.FC = () => {
    // State
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [visits, setVisits] = useState<Visit[]>([]);
    const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addModalDate, setAddModalDate] = useState<Date>(new Date());
    const [staffSearchQuery, setStaffSearchQuery] = useState('');

    // Drag State
    const [activeDragItem, setActiveDragItem] = useState<any>(null);
    const [activeDragType, setActiveDragType] = useState<'visit' | 'staff' | null>(null);

    // Derived State
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

    // Sensors
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(TouchSensor)
    );

    // Filter staff
    const filteredStaff = staffMembers.filter(s =>
        s.full_name.toLowerCase().includes(staffSearchQuery.toLowerCase()) ||
        s.role_display?.toLowerCase().includes(staffSearchQuery.toLowerCase())
    );

    // Effects
    useEffect(() => {
        fetchData();
    }, [startDate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const endDate = addDays(startDate, 6);
            // Parallel fetch
            const [visitsData, staffResponse] = await Promise.all([
                StaffService.getVisits(startDate.toISOString(), endDate.toISOString()),
                StaffService.fetchStaffMembers()
            ]);

            // Filter for Women's Health related visits if categorization existed
            // For now, we show all, or filter by specific types if we had them
            setVisits(visitsData);

            if (staffResponse && staffResponse.staff_members) {
                setStaffMembers(staffResponse.staff_members);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Events
    const handleAddVisitTrigger = (date: Date) => {
        setAddModalDate(date);
        setIsAddModalOpen(true);
    };

    const handleSaveNewVisit = (newVisit: any) => {
        // Optimistic update
        const visitWithId = {
            ...newVisit,
            id: Math.random().toString(), // Temp ID
            status: newVisit.status || 'scheduled',
            tasks: newVisit.tasks || []
        };
        setVisits(prev => [...prev, visitWithId]);
        setIsAddModalOpen(false);
        // Call API
    };

    const handleUpdateVisit = (updatedVisit: Visit) => {
        setVisits(prev => prev.map(v => v.id === updatedVisit.id ? updatedVisit : v));
        setSelectedVisit(null);
    };

    // DND Handlers
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

        // Visit -> Day (Reschedule)
        if (active.data.current?.type === 'visit' && over.data.current?.type === 'day') {
            const visit = active.data.current.visit as Visit;
            const newDate = over.data.current.date as Date;
            const originalDate = new Date(visit.date); // Keep original time

            if (!isSameDay(originalDate, newDate)) {
                // Construct new date with original time
                const updatedDate = new Date(newDate);
                updatedDate.setHours(originalDate.getHours());
                updatedDate.setMinutes(originalDate.getMinutes());

                handleUpdateVisit({
                    ...visit,
                    date: updatedDate.toISOString()
                });
            }
        }

        // Staff -> Visit (Assign)
        if (active.data.current?.type === 'staff' && over.data.current?.type === 'visit-drop') {
            const staff = active.data.current.staff as StaffMember;
            const visit = over.data.current.visit as Visit;

            handleUpdateVisit({
                ...visit,
                staffId: staff.id,
                staffName: staff.full_name,
                status: visit.status === 'not-started' ? 'scheduled' : visit.status
            });
        }
    };

    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex h-full gap-4 animate-in fade-in duration-500 min-h-0">
                {/* Main Calendar Area */}
                <div className="flex-1 flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden min-w-0">
                    {/* Calendar Header with responsive sizing */}
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20 gap-4">
                        <div className="flex items-center space-x-4 min-w-0">
                            <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1 border border-gray-100 flex-shrink-0">
                                <button
                                    onClick={() => setCurrentDate(subWeeks(currentDate, 1))}
                                    className="p-1 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-600"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setCurrentDate(addWeeks(currentDate, 1))}
                                    className="p-1 hover:bg-white hover:shadow-sm rounded-md transition-all text-gray-600"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-center space-x-2 truncate">
                                <span className="text-lg font-bold text-gray-900 tracking-tight truncate">
                                    {format(startDate, 'MMMM yyyy')}
                                </span>
                                <span className="text-xs font-medium text-gray-400 hidden lg:inline flex-shrink-0">
                                    Week of {format(startDate, 'd MMMM')}
                                </span>
                            </div>

                            <button
                                onClick={() => setCurrentDate(new Date())}
                                className="text-xs font-bold text-pink-600 bg-pink-50 hover:bg-pink-100 px-2 py-1 rounded-md transition-colors uppercase tracking-wide flex-shrink-0"
                            >
                                Today
                            </button>
                        </div>

                        <div className="flex space-x-2 flex-shrink-0">
                            <button
                                onClick={() => handleAddVisitTrigger(new Date())}
                                className="flex items-center px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all shadow-pink-200"
                            >
                                <Plus className="w-3.5 h-3.5 mr-1.5" />
                                New Visit
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="flex-1 overflow-x-auto bg-gray-50/30">
                        <div className="min-w-[800px] h-full flex flex-col">
                            {/* Days Header */}
                            <div className="grid grid-cols-7 border-b border-gray-200 bg-white sticky top-0 z-10">
                                {weekDays.map((day, i) => {
                                    const isTodayDate = isSameDay(day, new Date());
                                    return (
                                        <div key={i} className={`py-3 px-2 text-center border-r border-gray-100 last:border-r-0 ${isTodayDate ? 'bg-pink-50/40' : ''}`}>
                                            <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${isTodayDate ? 'text-pink-600' : 'text-gray-400'}`}>
                                                {format(day, 'EEE')}
                                            </div>
                                            <div className={`text-lg font-bold inline-flex items-center justify-center w-8 h-8 rounded-full transition-all ${isTodayDate ? 'bg-pink-600 text-white shadow-md' : 'text-gray-900'
                                                }`}>
                                                {format(day, 'd')}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Droppable Days Column */}
                            <div className="grid grid-cols-7 flex-1 bg-white">
                                {weekDays.map((day) => {
                                    const dayVisits = visits.filter(v => isSameDay(new Date(v.date), day));
                                    return (
                                        <DroppableDay
                                            key={day.toISOString()}
                                            date={day}
                                            isToday={isSameDay(day, new Date())}
                                            onAddVisit={handleAddVisitTrigger}
                                        >
                                            {dayVisits.map(visit => (
                                                <DroppableVisitWrapper
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

                {/* Right Sidebar: Available Staff */}
                <div className="w-72 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden flex-shrink-0">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center mb-3">
                            <Users className="w-4 h-4 mr-2" />
                            Available Team
                        </h3>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Find caregiver..."
                                value={staffSearchQuery}
                                onChange={(e) => setStaffSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
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
                            <div className="text-center py-10">
                                <p className="text-sm text-gray-400">No staff found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Modals */}
                <VisitDetailsModal
                    isOpen={!!selectedVisit}
                    onClose={() => setSelectedVisit(null)}
                    visit={selectedVisit}
                    onUpdateVisit={handleUpdateVisit}
                />

                <AddVisitModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleSaveNewVisit}
                    initialDate={addModalDate}
                    staffMembers={staffMembers}
                />

                {/* Drag Overlay */}
                {createPortal(
                    <DragOverlay>
                        {activeDragItem ? (
                            activeDragType === 'visit' ? (
                                <div className="opacity-90 rotate-2 cursor-grabbing scale-105">
                                    <DraggableVisitCard visit={activeDragItem} onClick={() => { }} />
                                </div>
                            ) : (
                                <div className="opacity-90 rotate-2 cursor-grabbing scale-105">
                                    <DraggableStaffItem staff={activeDragItem} />
                                </div>
                            )
                        ) : null}
                    </DragOverlay>,
                    document.body
                )}
            </div>
        </DndContext>
    );
};

export default WomensHealthSchedule;
