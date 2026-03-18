import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Visit } from '../../../services/staffService';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface DraggableVisitCardProps {
    visit: Visit;
    onClick: (visit: Visit) => void;
}

const DraggableVisitCard: React.FC<DraggableVisitCardProps> = ({ visit, onClick }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `visit-${visit.id}`,
        data: {
            type: 'visit',
            visit: visit,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 'auto',
        touchAction: 'none', // Important for reliable dragging on touch devices
    };

    // Determine status styling
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'completed':
                return { bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-700', icon: <CheckCircle className="w-3 h-3 mr-1" /> };
            case 'missed':
                return { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-700', icon: <AlertCircle className="w-3 h-3 mr-1" /> };
            case 'in-progress':
                return { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-700', icon: <Clock className="w-3 h-3 mr-1" /> };
            default:
                return { bg: 'bg-white', border: 'border-gray-100', text: 'text-gray-500', icon: null }; // Scheduled/Not-started
        }
    };

    const config = getStatusConfig(visit.status);
    const taskCount = visit.tasks.filter(t => t.type === 'task').length;
    const medCount = visit.tasks.filter(t => t.type === 'medication').length;

    // Helper to get initials
    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onClick={() => onClick(visit)}
            className={`p-3 mb-3 rounded-xl border shadow-sm cursor-grab active:cursor-grabbing transition-all hover:shadow-md hover:border-blue-200 bg-white group select-none`}
        >
            <div className="flex justify-between items-center mb-2 pointer-events-none">
                <div className="flex items-center text-xs font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md">
                    <Clock className="w-3 h-3 mr-1.5 opacity-70" />
                    {visit.startTime} - {visit.endTime}
                </div>
                <div className={`flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${config.bg} ${config.text}`}>
                    {config.icon}
                    {visit.status === 'not-started' ? 'Pending' : visit.status}
                </div>
            </div>

            <div className="flex items-start space-x-3 mb-3 pointer-events-none">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                    {getInitials(visit.patientName)}
                </div>
                <div>
                    <h4 className="font-bold text-sm text-gray-900 leading-tight">{visit.patientName}</h4>
                    <div className="text-xs text-blue-600 font-medium mt-0.5">{visit.type}</div>
                </div>
            </div>

            <div className="border-t border-gray-50 pt-2 flex items-center justify-between pointer-events-none">
                <div className="flex space-x-3 text-[10px] text-gray-500 font-medium">
                    {taskCount > 0 && <span>{taskCount} Tasks</span>}
                    {medCount > 0 && <span>{medCount} Meds</span>}
                </div>

                {!visit.staffId && (
                    <span className="text-[10px] text-red-500 bg-red-50 px-1.5 py-0.5 rounded font-medium">Unassigned</span>
                )}
            </div>
        </div>
    );
};

export default DraggableVisitCard;
