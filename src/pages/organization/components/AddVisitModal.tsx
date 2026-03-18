import React, { useState } from 'react';
import { StaffMember, Visit } from '../../../services/staffService';
import { X, Clock, Search, Calendar, ChevronRight } from 'lucide-react';

interface AddVisitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (visit: any) => void;
    initialDate?: Date;
    initialStaffId?: number | null;
    staffMembers: StaffMember[];
}

const AddVisitModal: React.FC<AddVisitModalProps> = ({
    isOpen,
    onClose,
    onSave,
    initialDate,
    initialStaffId,
    staffMembers
}) => {
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        startDate: initialDate ? initialDate.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '10:00',
        selectedDays: { mon: true, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false },
        clientId: '',
        carePlanId: '',
        clientPreferences: '',
        staffId: initialStaffId ? initialStaffId.toString() : ''
    });

    const [tasks, setTasks] = useState<any[]>([]);
    const [newTask, setNewTask] = useState({ description: '', type: 'task', isEssential: false, dosage: '' });

    const weekDays = [
        { key: 'mon', label: 'M' },
        { key: 'tue', label: 'T' },
        { key: 'wed', label: 'W' },
        { key: 'thu', label: 'T' },
        { key: 'fri', label: 'F' },
        { key: 'sat', label: 'S' },
        { key: 'sun', label: 'S' },
    ];

    const handleDayToggle = (key: string) => {
        setFormData(prev => ({
            ...prev,
            selectedDays: {
                ...prev.selectedDays,
                [key]: !prev.selectedDays[key as keyof typeof prev.selectedDays]
            }
        }));
    };

    const handleAddTask = () => {
        if (!newTask.description) return;

        setTasks(prev => [...prev, {
            id: Math.random().toString(36).substr(2, 9),
            ...newTask,
            isCompleted: false
        }]);

        setNewTask({ description: '', type: 'task', isEssential: false, dosage: '' });
    };

    const removeTask = (taskId: string) => {
        setTasks(prev => prev.filter(t => t.id !== taskId));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newVisit: Partial<Visit> = {
            date: formData.startDate,
            startTime: formData.startTime,
            endTime: formData.endTime,
            patientName: 'Annie Smith', // Mocked
            patientId: 'p1', // Mocked
            staffId: formData.staffId ? parseInt(formData.staffId) : null,
            status: 'scheduled',
            type: 'Custom Visit',
            clientPreferences: formData.clientPreferences,
            tasks: tasks
        };
        onSave(newVisit);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-gray-200">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                        <button onClick={onClose} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
                            <X className="h-4 w-4 text-gray-800" />
                        </button>
                        <h3 className="text-base font-bold text-gray-900">New Visit</h3>
                        <div className="w-8"></div> {/* Spacer for centering */}
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">

                            {/* Section: Timing */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-900">When is the visit?</h4>

                                {/* Days Selector */}
                                <div>
                                    <p className="text-sm text-gray-500 mb-3">Repeats on</p>
                                    <div className="flex gap-2">
                                        {weekDays.map(day => {
                                            const isSelected = formData.selectedDays[day.key as keyof typeof formData.selectedDays];
                                            return (
                                                <button
                                                    key={day.key}
                                                    type="button"
                                                    onClick={() => handleDayToggle(day.key)}
                                                    className={`w-10 h-10 rounded-full text-xs font-semibold flex items-center justify-center transition-all border ${isSelected
                                                        ? 'bg-black text-white border-black'
                                                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-800'
                                                        }`}
                                                >
                                                    {day.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Time Inputs */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative group">
                                        <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-500 group-focus-within:text-black transition-colors">
                                            Start Time
                                        </label>
                                        <div className="flex items-center border border-gray-300 rounded-lg h-14 px-3 focus-within:ring-2 focus-within:ring-black focus-within:border-transparent transition-all overflow-hidden">
                                            <input
                                                type="time"
                                                required
                                                value={formData.startTime}
                                                onChange={e => setFormData({ ...formData, startTime: e.target.value })}
                                                className="w-full h-full border-none focus:ring-0 text-gray-900 font-medium p-0"
                                            />
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-500 group-focus-within:text-black transition-colors">
                                            End Time
                                        </label>
                                        <div className="flex items-center border border-gray-300 rounded-lg h-14 px-3 focus-within:ring-2 focus-within:ring-black focus-within:border-transparent transition-all overflow-hidden">
                                            <input
                                                type="time"
                                                required
                                                value={formData.endTime}
                                                onChange={e => setFormData({ ...formData, endTime: e.target.value })}
                                                className="w-full h-full border-none focus:ring-0 text-gray-900 font-medium p-0"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Section: Care Plan */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-lg font-semibold text-gray-900">Care details</h4>
                                    <button type="button" className="text-sm font-medium underline text-gray-900">Load template</button>
                                </div>

                                <div className="relative">
                                    <select
                                        value={formData.carePlanId}
                                        onChange={e => setFormData({ ...formData, carePlanId: e.target.value })}
                                        className="w-full h-14 pl-4 pr-10 border border-gray-300 rounded-lg text-gray-900 font-normal focus:ring-2 focus:ring-black focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="">Select a care plan...</option>
                                        <option value="cp1">General Daily Care</option>
                                        <option value="cp2">Medication Support</option>
                                    </select>
                                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 rotate-90 pointer-events-none" />
                                </div>

                                <div className="relative group">
                                    <label className="absolute -top-2 left-3 bg-white px-1 text-xs font-medium text-gray-500 group-focus-within:text-black transition-colors">
                                        Notes & Preferences
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={formData.clientPreferences}
                                        onChange={e => setFormData({ ...formData, clientPreferences: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none text-gray-900 placeholder-gray-400"
                                        placeholder="Add any specific instructions..."
                                    />
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* Section: Tasks & Meds */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-900">Tasks & Medications</h4>

                                {tasks.length > 0 && (
                                    <div className="space-y-2 mb-4">
                                        {tasks.map(task => (
                                            <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                                                <div className="flex items-start gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${task.type === 'medication' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                                                        }`}>
                                                        {task.type === 'medication' ? (
                                                            <span className="material-icons text-sm">medication</span>
                                                        ) : (
                                                            <span className="material-icons text-sm">assignment</span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{task.description}</p>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            {task.dosage && (
                                                                <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{task.dosage}</span>
                                                            )}
                                                            {task.isEssential && (
                                                                <span className="text-xs text-red-600 bg-red-50 px-1.5 py-0.5 rounded font-medium">Essential</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeTask(task.id)}
                                                    className="text-gray-400 hover:text-gray-900 p-1"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex gap-2">
                                            <select
                                                value={newTask.type}
                                                onChange={e => setNewTask({ ...newTask, type: e.target.value })}
                                                className="w-28 h-10 px-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                                            >
                                                <option value="task">Task</option>
                                                <option value="medication">Meds</option>
                                            </select>
                                            <input
                                                type="text"
                                                value={newTask.description}
                                                onChange={e => setNewTask({ ...newTask, description: e.target.value })}
                                                placeholder={newTask.type === 'medication' ? "Medication name..." : "What needs to be done?"}
                                                className="flex-1 h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleAddTask();
                                                    }
                                                }}
                                            />
                                        </div>

                                        <div className="flex gap-2 items-center">
                                            {newTask.type === 'medication' && (
                                                <input
                                                    type="text"
                                                    value={newTask.dosage}
                                                    onChange={e => setNewTask({ ...newTask, dosage: e.target.value })}
                                                    placeholder="Dosage (e.g. 10mg)"
                                                    className="flex-1 h-10 px-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                                />
                                            )}

                                            <label className="flex items-center gap-2 h-10 px-3 border border-gray-300 rounded-lg bg-white cursor-pointer hover:border-gray-400 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={newTask.isEssential}
                                                    onChange={e => setNewTask({ ...newTask, isEssential: e.target.checked })}
                                                    className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                                                />
                                                <span className="text-sm font-medium text-gray-700">Essential</span>
                                            </label>

                                            <button
                                                type="button"
                                                onClick={handleAddTask}
                                                disabled={!newTask.description}
                                                className="ml-auto h-10 px-4 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center bg-white rounded-b-xl sticky bottom-0 z-10">
                            <button
                                type="button"
                                onClick={onClose}
                                className="text-sm font-bold text-gray-900 underline hover:text-gray-600 transition-colors"
                            >
                                Clear all
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-bold hover:shadow-lg transform active:scale-95 transition-all text-shadow"
                            >
                                Schedule Visit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVisitModal;
