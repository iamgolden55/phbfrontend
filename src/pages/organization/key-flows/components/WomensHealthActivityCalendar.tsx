import React, { useState } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Clock,
    Pill,
    CheckSquare,
    Maximize2,
    Minimize2,
    Copy,
    ChevronDown,
    FileText
} from 'lucide-react';
import { startOfWeek, addDays, subDays, format, isSameDay } from 'date-fns';
import {
    DndContext,
    DragEndEvent,
    useDraggable,
    useDroppable,
    DragOverlay,
    useSensors,
    useSensor,
    PointerSensor
} from '@dnd-kit/core';
import CreateVisitScheduleModal from './CreateVisitScheduleModal';

// --- Draggable Card Component ---
const DraggableRoutineCard = ({ routine, isExpanded = true }: { routine: any, isExpanded?: boolean }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: routine.id,
        data: routine
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
        opacity: isDragging ? 0.9 : 1
    } : undefined;

    const isError = routine.status === 'no-activities';
    const borderColor = isError ? 'border-red-200' : 'border-blue-200';
    const footerBg = isError ? 'bg-red-50' : 'bg-blue-50';
    const footerText = isError ? 'text-red-700' : 'text-blue-700';
    const statusText = isError ? 'Visit has no activities' : 'Scheduled';
    const hoverBorder = isError ? 'group-hover/card:border-red-400' : 'group-hover/card:border-blue-400';

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`bg-white border ${borderColor} rounded-lg shadow-sm ${hoverBorder} transition-all cursor-grab relative overflow-hidden group/card touch-none mb-3 last:mb-0`}
        >
            {/* Header */}
            <div className={`flex justify-between items-start p-2 ${isExpanded ? 'pb-1' : 'pb-2'}`}>
                <h5 className="font-semibold text-gray-900 text-xs truncate pr-2">{routine.title}</h5>
                <div className="flex items-center space-x-1 text-gray-400">
                    <button className="hover:text-gray-600"><Copy size={12} /></button>
                    <button className="hover:text-gray-600"><ChevronDown size={12} /></button>
                </div>
            </div>

            {/* Content Icons & Time - Only show if expanded */}
            {isExpanded && (
                <div className="p-2 py-1 space-y-2">
                    <div className="flex items-center space-x-3 text-gray-500">
                        <div className="flex items-center space-x-1">
                            <Pill size={12} />
                            <span className="text-[10px] font-medium">{routine.meds}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <FileText size={12} />
                            <span className="text-[10px] font-medium">1</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <CheckSquare size={12} />
                            <span className="text-[10px] font-medium">{routine.tasks || 1}</span>
                        </div>
                    </div>

                    <div className="flex items-center text-[10px] font-medium text-gray-700">
                        <Clock size={10} className="mr-1.5 text-gray-400" />
                        {routine.period || routine.time}
                    </div>
                </div>
            )}

            {/* Footer Status */}
            <div className={`px-2 py-1.5 ${footerBg} ${footerText} text-[10px] font-semibold border-t ${isError ? 'border-red-100' : 'border-blue-100'}`}>
                {statusText}
            </div>
        </div>
    );
};

// --- Droppable Cell Component ---
const DroppableCell = ({ id, children, isToday, onAddClick }: { id: string, children: React.ReactNode, isToday: boolean, onAddClick: () => void }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: id
    });

    return (
        <div
            ref={setNodeRef}
            className={`p-2 border-r border-b border-gray-200 relative group transition-colors min-h-[160px] flex flex-col ${isOver ? 'bg-blue-50/50' : ''} hover:bg-gray-50/50`}
        >
            {/* Render all cards stacked */}
            <div className="flex-1 flex flex-col w-full">
                {children}
            </div>

            {/* Hover Add Button (Center bottom) */}
            <div className="mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center w-full z-10">
                <button
                    onClick={onAddClick}
                    className="p-1.5 rounded-full bg-white shadow-sm border border-gray-200 text-gray-400 hover:text-green-600 hover:border-green-300 transform hover:scale-110 transition-all pointer-events-auto"
                >
                    <Plus size={14} />
                </button>
            </div>
        </div>
    );
};


const WomensHealthActivityCalendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isAllExpanded, setIsAllExpanded] = useState(true);

    // Mock Data State
    const [routines, setRoutines] = useState([
        // Morning Routines
        { id: 'r1', session: 'morning', day: 0, title: 'Morning activities 1', time: '9:00-10:00', meds: 1, tasks: 1, status: 'scheduled' },
        { id: 'r2', session: 'morning', day: 1, title: 'Morning activities 1', time: '9:00-10:00', meds: 1, tasks: 1, status: 'scheduled' },
        { id: 'r3', session: 'morning', day: 2, title: 'Morning activities 1', time: '9:00-10:00', meds: 1, tasks: 1, status: 'scheduled' },
        { id: 'r4', session: 'morning', day: 3, title: 'Morning activities 1', time: '9:00-10:00', meds: 1, tasks: 1, status: 'scheduled' },
        { id: 'r5', session: 'morning', day: 4, title: 'Morning activities 1', time: '9:00-10:00', meds: 1, tasks: 1, status: 'scheduled' },

        // Second Row Morning
        { id: 'r6', session: 'morning', day: 0, title: 'Morning activities 2', time: '9:00-10:00', meds: 1, tasks: 1, status: 'scheduled' },
        { id: 'r7', session: 'morning', day: 1, title: 'Morning activities 2', time: '9:00-10:00', meds: 1, tasks: 1, status: 'scheduled' },

        // No Activities Example (Red)
        { id: 'r8', session: 'morning', day: 0, title: 'Morning activities 3', time: '09:00-10:30', meds: 0, tasks: 0, status: 'no-activities' },
        { id: 'r9', session: 'morning', day: 1, title: 'Morning activities 3', time: '09:00-10:30', meds: 0, tasks: 0, status: 'no-activities' },
        { id: 'r10', session: 'morning', day: 2, title: 'Morning activities 3', time: '09:00-10:30', meds: 0, tasks: 0, status: 'no-activities' },
        { id: 'r11', session: 'morning', day: 3, title: 'Morning activities 3', time: '09:00-10:30', meds: 0, tasks: 0, status: 'no-activities' },
        { id: 'r12', session: 'morning', day: 4, title: 'Morning activities 3', time: '09:00-10:30', meds: 0, tasks: 0, status: 'no-activities' },

    ]);

    const [activeId, setActiveId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

    // Sessions (Y-Axis)
    const sessions = [
        { id: 'morning', label: 'Morning', time: '06:00 to 11:00' },
        { id: 'lunch', label: 'Lunch', time: '11:00 to 14:00' },
        { id: 'afternoon', label: 'Afternoon', time: '14:00 to 18:00' },
        { id: 'evening', label: 'Evening', time: '18:00 to 22:00' }
    ];

    // Get ALL routines for a cell, not just one
    const getRoutinesForCell = (session: string, dayIndex: number) => {
        return routines.filter(r => r.session === session && r.day === dayIndex);
    };

    const handlePrevWeek = () => setCurrentDate(subDays(currentDate, 7));
    const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveId(null);
        const { active, over } = event;

        if (!over) return;

        // Dropping a routine into a cell
        if (over.id) {
            const [sessionId, dayIndexStr] = (over.id as string).split('|');
            const dayIndex = parseInt(dayIndexStr);

            setRoutines(prev => prev.map(r => {
                if (r.id === active.id) {
                    return { ...r, session: sessionId, day: dayIndex };
                }
                return r;
            }));
        }
    };

    const handleSaveSchedule = (data: any) => {
        // ... (existing save logic preserved implicitly or simplified for demo)
        const newRoutines = [...routines];
        if (data.selectedDays && data.selectedDays.size > 0) {
            data.selectedDays.forEach((key: string) => {
                const [week, dayIndex] = key.split('-').map(Number);
                if (week === 1) {
                    newRoutines.push({
                        id: `new-${Date.now()}-${dayIndex}-${Math.random()}`,
                        session: 'morning',
                        day: dayIndex,
                        title: 'New Visit',
                        time: '09:00-10:00',
                        meds: 0,
                        tasks: 1,
                        status: 'scheduled'
                    });
                }
            });
        }
        setRoutines(newRoutines);
        setIsCreateModalOpen(false);
    };

    const activeRoutine = activeId ? routines.find(r => r.id === activeId) : null;

    return (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-sans min-w-0 w-full">
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-20 gap-4">
                    <div className="flex items-center space-x-6">
                        <div className="flex flex-col">
                            <h2 className="text-xl font-bold text-gray-900 leading-tight">Annie Smith</h2>
                            <div className="flex items-center mt-1">
                                <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded mr-2">Active</span>
                            </div>
                        </div>

                        <div className="h-8 w-px bg-gray-200 mx-4"></div>

                        <div className="flex items-center space-x-2">
                            <button onClick={handlePrevWeek} className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors border border-gray-200"><ChevronLeft size={16} /></button>
                            <span className="text-sm font-bold text-blue-600 px-2">
                                {format(startDate, 'dd MMM yyyy')} <span className="text-gray-400 mx-1">→</span> {format(addDays(startDate, 6), 'dd MMM yyyy')}
                            </span>
                            <button onClick={handleNextWeek} className="p-1 hover:bg-gray-100 rounded text-gray-400 transition-colors border border-gray-200"><ChevronRight size={16} /></button>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setIsAllExpanded(!isAllExpanded)}
                            className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-bold bg-white border border-gray-200 px-3 py-2 rounded-lg shadow-sm"
                        >
                            {isAllExpanded ? <Minimize2 size={14} className="mr-2" /> : <Maximize2 size={14} className="mr-2" />}
                            {isAllExpanded ? 'Collapse all' : 'Expand all'}
                        </button>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="flex items-center px-4 py-2 bg-green-700 hover:bg-green-800 text-white text-sm font-bold rounded-lg shadow-sm transition-colors"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add visit schedule
                        </button>
                    </div>
                </div>

                {/* Calendar Grid Container */}
                <div className="flex-1 overflow-x-auto overflow-y-auto">
                    <div className="min-w-[1200px] h-full flex flex-col bg-white">
                        {/* UNIFIED GRID: 200px label col + 7 day cols */}
                        <div className="grid grid-cols-[200px_repeat(7,1fr)] auto-rows-min bg-white w-full">

                            {/* --- Header Row --- */}
                            <div className="p-4 bg-white border-r border-b border-gray-200 sticky top-0 z-30"></div>
                            {weekDays.map((day, i) => {
                                const isToday = isSameDay(day, new Date());
                                return (
                                    <div key={i} className={`py-4 flex flex-col items-center justify-center border-r border-b border-gray-200 sticky top-0 z-30 bg-white`}>
                                        <div className="text-xs font-bold text-gray-500 uppercase mb-2">
                                            {format(day, 'EEE')}
                                        </div>
                                        <div className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold ${isToday ? 'bg-blue-600 text-white' : 'text-gray-900'}`}>
                                            {format(day, 'dd')}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* --- Matrix Rows --- */}
                            {sessions.map(session => (
                                <React.Fragment key={session.id}>
                                    {/* Session Label (Left Column) */}
                                    <div className="p-4 bg-white border-r border-b border-gray-200 flex flex-col justify-start sticky left-0 z-10">
                                        <h4 className="font-bold text-gray-900 text-sm">{session.label}</h4>
                                        <span className="text-xs text-gray-500 mt-1">{session.time}</span>
                                    </div>

                                    {/* Days Cells */}
                                    {weekDays.map((day, dayIndex) => {
                                        const cellRoutines = getRoutinesForCell(session.id, dayIndex);
                                        const isToday = isSameDay(day, new Date());
                                        const cellId = `${session.id}|${dayIndex}`;

                                        return (
                                            <DroppableCell
                                                key={cellId}
                                                id={cellId}
                                                isToday={isToday}
                                                onAddClick={() => setIsCreateModalOpen(true)}
                                            >
                                                {cellRoutines.map(routine => (
                                                    <DraggableRoutineCard key={routine.id} routine={routine} isExpanded={isAllExpanded} />
                                                ))}
                                            </DroppableCell>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                <DragOverlay>
                    {activeId && activeRoutine ? (
                        <div className="w-[160px] opacity-90 rotate-2">
                            <DraggableRoutineCard routine={activeRoutine} isExpanded={true} />
                        </div>
                    ) : null}
                </DragOverlay>

                <CreateVisitScheduleModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSave={handleSaveSchedule}
                />
            </div>
        </DndContext>
    );
};

export default WomensHealthActivityCalendar;
