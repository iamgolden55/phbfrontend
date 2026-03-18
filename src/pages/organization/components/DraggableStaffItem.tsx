import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { StaffMember } from '../../../services/staffService';
import { GripVertical, User } from 'lucide-react';

interface DraggableStaffItemProps {
    staff: StaffMember;
}

const DraggableStaffItem: React.FC<DraggableStaffItemProps> = ({ staff }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `staff-${staff.id}`,
        data: {
            type: 'staff',
            staff: staff,
        },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 1000 : 'auto',
        touchAction: 'none',
    };

    // Helper to get initials
    const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`flex items-center p-3 mb-2 bg-white rounded-lg border border-gray-200 shadow-sm cursor-grab active:cursor-grabbing hover:border-blue-300 hover:shadow-md transition-all select-none ${isDragging ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
        >
            <GripVertical className="w-4 h-4 text-gray-400 mr-2" />
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mr-3">
                {getInitials(staff.full_name)}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    {staff.full_name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                    {staff.role_display}
                </p>
            </div>
            {/* Status dot */}
            <div className={`w-2 h-2 rounded-full ${staff.is_available ? 'bg-green-500' : 'bg-gray-300'}`} title={staff.is_available ? 'Available' : 'Unavailable'} />
        </div>
    );
};

export default DraggableStaffItem;
