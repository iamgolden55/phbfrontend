import React, { useState } from 'react';
import { X, Calendar, Clock, ChevronDown, Check, User, Search, Pill, CheckSquare, Plus } from 'lucide-react';

interface CreateVisitScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
}

const CreateVisitScheduleModal: React.FC<CreateVisitScheduleModalProps> = ({ isOpen, onClose, onSave }) => {
    // State for the recurring grid
    // 2 weeks x 7 days
    const [selectedDays, setSelectedDays] = useState<Set<string>>(new Set());
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Mock Activities
    const availableActivities = [
        { id: '1', name: 'Morning activities 1', tasks: 3, meds: 1 },
        { id: '2', name: 'Morning activities 2', tasks: 2, meds: 0 },
        { id: '3', name: 'Lunch routine', tasks: 1, meds: 1 },
    ];
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

    if (!isOpen) return null;

    const toggleDay = (week: 1 | 2, dayIndex: number) => {
        const key = `${week}-${dayIndex}`;
        const newSelected = new Set(selectedDays);
        if (newSelected.has(key)) {
            newSelected.delete(key);
        } else {
            newSelected.add(key);
        }
        setSelectedDays(newSelected);
    };

    const toggleWeek = (week: 1 | 2) => {
        const newSelected = new Set(selectedDays);
        const allWeekSelected = days.every((_, i) => selectedDays.has(`${week}-${i}`));

        days.forEach((_, i) => {
            const key = `${week}-${i}`;
            if (allWeekSelected) {
                newSelected.delete(key);
            } else {
                newSelected.add(key);
            }
        });
        setSelectedDays(newSelected);
    };

    const toggleAll = () => {
        const newSelected = new Set(selectedDays);
        const dayCount = days.length * 2;
        if (selectedDays.size === dayCount) {
            newSelected.clear();
        } else {
            [1, 2].forEach(w => {
                days.forEach((_, i) => newSelected.add(`${w}-${i}`));
            });
        }
        setSelectedDays(newSelected);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl w-[1000px] h-[800px] flex flex-col shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Create visit schedule</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Left Column: Schedule Details */}
                    <div className="w-[60%] p-8 overflow-y-auto border-r border-gray-100">

                        {/* Day Selector */}
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-gray-900 mb-3">
                                Select template days <span className="text-red-500">*</span>
                            </label>

                            <div className="grid grid-cols-[100px_repeat(7,1fr)] gap-2 mb-2">
                                {/* Header Row */}
                                <button
                                    onClick={toggleAll}
                                    className={`h-8 rounded bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center hover:bg-blue-100 transition-colors border border-blue-100`}
                                >
                                    All
                                </button>
                                {days.map(d => (
                                    <div key={d} className="h-8 flex items-center justify-center text-xs font-bold text-gray-400 uppercase">
                                        {d}
                                    </div>
                                ))}

                                {/* Week 1 Row */}
                                <button
                                    onClick={() => toggleWeek(1)}
                                    className="h-10 rounded bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center hover:bg-blue-100 transition-colors border border-blue-100"
                                >
                                    Week 1
                                </button>
                                {days.map((_, i) => (
                                    <button
                                        key={`1-${i}`}
                                        onClick={() => toggleDay(1, i)}
                                        className={`h-10 rounded border text-sm font-bold transition-all ${selectedDays.has(`1-${i}`)
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                                : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'
                                            }`}
                                    >
                                        <Check size={16} className={`mx-auto ${selectedDays.has(`1-${i}`) ? 'opacity-100' : 'opacity-0'}`} />
                                    </button>
                                ))}

                                {/* Week 2 Row */}
                                <button
                                    onClick={() => toggleWeek(2)}
                                    className="h-10 rounded bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center hover:bg-blue-100 transition-colors border border-blue-100"
                                >
                                    Week 2
                                </button>
                                {days.map((_, i) => (
                                    <button
                                        key={`2-${i}`}
                                        onClick={() => toggleDay(2, i)}
                                        className={`h-10 rounded border text-sm font-bold transition-all ${selectedDays.has(`2-${i}`)
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                                : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300'
                                            }`}
                                    >
                                        <Check size={16} className={`mx-auto ${selectedDays.has(`2-${i}`) ? 'opacity-100' : 'opacity-0'}`} />
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                You are creating <span className="font-bold text-gray-900">{selectedDays.size} visit schedules</span>
                            </p>
                        </div>

                        {/* Time Inputs */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Start time *</label>
                                <div className="relative">
                                    <input type="time" defaultValue="09:00" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent font-medium" />
                                    <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">End time *</label>
                                <div className="relative">
                                    <input type="time" defaultValue="10:30" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent font-medium" />
                                    <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-8 -mt-6">Duration: <span className="font-bold text-gray-900">1h 30m</span></p>

                        {/* Date Inputs */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">Start date *</label>
                                <div className="relative">
                                    <input type="date" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent font-medium" />
                                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 mb-1">End date (Optional)</label>
                                <div className="relative">
                                    <input type="date" className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent font-medium" />
                                    <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                                </div>
                            </div>
                        </div>

                        {/* Funding */}
                        <div className="mb-8">
                            <label className="block text-xs font-bold text-gray-700 mb-1">Client funding *</label>
                            <div className="relative">
                                <select className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm appearance-none bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent font-medium">
                                    <option>Default: None</option>
                                    <option>Private</option>
                                    <option>Council</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                            </div>
                        </div>

                        {/* Attendee */}
                        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    <User size={16} />
                                </div>
                                <span className="text-sm font-bold text-gray-900">Attendee 1</span>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1">Role *</label>
                                <select className="w-full px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white">
                                    <option>Any role</option>
                                    <option>Nurse</option>
                                    <option>Carer</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Activities */}
                    <div className="w-[40%] bg-gray-50 p-6 flex flex-col border-l border-gray-100">
                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Search or create activity list"
                                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500"
                            />
                            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                            {availableActivities.map(activity => (
                                <div
                                    key={activity.id}
                                    onClick={() => setSelectedActivity(selectedActivity === activity.id ? null : activity.id)}
                                    className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center space-x-3 ${selectedActivity === activity.id
                                            ? 'bg-green-50 border-green-200 shadow-sm'
                                            : 'bg-white border-gray-200 hover:border-green-300'
                                        }`}
                                >
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedActivity === activity.id ? 'bg-green-600 border-green-600' : 'border-gray-300'
                                        }`}>
                                        {selectedActivity === activity.id && <Check size={10} className="text-white" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{activity.name}</p>
                                        <p className="text-xs text-gray-500 flex items-center space-x-2">
                                            <span>{activity.tasks} tasks</span>
                                            <span>•</span>
                                            <span>{activity.meds} meds</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full py-2 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg text-sm hover:bg-gray-50 mb-4 shadow-sm flex items-center justify-center">
                            Show activity lists outside visit times
                        </button>

                        <button className="w-full py-2 bg-white border border-dashed border-gray-300 text-gray-500 font-bold rounded-lg text-sm hover:bg-gray-50 hover:text-green-600 hover:border-green-300 transition-colors flex items-center justify-center">
                            <Plus size={16} className="mr-2" />
                            Create new activity list
                        </button>

                        {/* Empty/Selected State Visualization */}
                        <div className="flex-1 flex flex-col items-center justify-center text-center mt-6 opacity-60">
                            {selectedActivity ? (
                                <>
                                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600 transform rotate-3">
                                        <CheckSquare size={32} />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Activities Linked</h3>
                                    <p className="text-xs text-gray-500 mt-1">This visit will include the selected activities.</p>
                                </>
                            ) : (
                                <>
                                    <div className="flex gap-2 mb-4">
                                        <div className="w-12 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm transform -rotate-6">
                                            <Pill className="text-gray-300" />
                                        </div>
                                        <div className="w-12 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm transform rotate-6">
                                            <CheckSquare className="text-gray-300" />
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-gray-900">No activity list linked</h3>
                                    <p className="text-xs text-gray-500 max-w-[200px] mt-2">
                                        Add tasks and medications to this schedule by linking it to an activity list.
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3 bg-white">
                    <button onClick={onClose} className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button onClick={() => onSave({ selectedDays })} className="px-6 py-2.5 rounded-lg bg-green-700 text-white font-bold text-sm hover:bg-green-800 shadow-sm transition-colors">
                        Create {selectedDays.size > 0 ? selectedDays.size : ''} visit schedules
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateVisitScheduleModal;
