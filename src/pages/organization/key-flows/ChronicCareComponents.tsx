import React from 'react';

export const StatusBadge = ({ status }: { status: string }) => {
    let colors = "bg-gray-100 text-gray-800";
    if (status === 'High') colors = "text-red-600 font-semibold flex items-center gap-1 before:content-[''] before:w-2 before:h-2 before:bg-red-500 before:rounded-full";
    if (status === 'Active') colors = "text-gray-900 font-medium";

    return <span className={`text-sm ${colors}`}>{status}</span>;
};

export const NodeIcon = ({ type, label }: { type: 'purple' | 'light-purple' | 'orange'; label: string }) => {
    const letter = label.charAt(0).toUpperCase();

    let baseClasses = "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 shrink-0 select-none shadow-sm ring-2 ring-white";

    if (type === 'purple') {
        return (
            <div className={`${baseClasses} bg-indigo-900 text-white`}>
                {letter}
            </div>
        );
    }
    if (type === 'light-purple') {
        return (
            <div className={`${baseClasses} bg-purple-100 text-purple-700 border border-purple-200`}>
                {letter}
            </div>
        );
    }
    if (type === 'orange') {
        return (
            <div className={`${baseClasses} bg-orange-100 text-orange-700 border border-orange-200`}>
                {letter}
            </div>
        );
    }
    return null;
};

export const ProgressBar = ({ percent }: { percent: number }) => (
    <div className="flex items-center gap-2 w-full max-w-[200px]">
        <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out" style={{ width: `${percent}%` }} />
        </div>
        <span className="text-xs font-medium text-gray-600 whitespace-nowrap">{percent}% Completed</span>
    </div>
);
