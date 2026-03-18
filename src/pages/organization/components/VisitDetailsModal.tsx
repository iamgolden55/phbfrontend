import React, { useState } from 'react';
import { Visit, VisitTask } from '../../../services/staffService';
import { X, Check, Clock, User, Pill, ClipboardList, Calendar, MapPin } from 'lucide-react';

interface VisitDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    visit: Visit | null;
    onUpdateVisit: (visit: Visit) => void;
}

const VisitDetailsModal: React.FC<VisitDetailsModalProps> = ({
    isOpen,
    onClose,
    visit,
    onUpdateVisit
}) => {
    if (!isOpen || !visit) return null;

    const [localVisit, setLocalVisit] = useState<Visit>(visit);

    const toggleTask = (taskId: string) => {
        const updatedTasks = localVisit.tasks.map(task =>
            task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
        );
        setLocalVisit({ ...localVisit, tasks: updatedTasks });
    };

    const calculateProgress = () => {
        const total = localVisit.tasks.length;
        const completed = localVisit.tasks.filter(t => t.isCompleted).length;
        return total === 0 ? 0 : Math.round((completed / total) * 100);
    };

    const handleSave = () => {
        onUpdateVisit(localVisit);
        onClose();
    };

    // Group tasks by type
    const careTasks = localVisit.tasks.filter(t => t.type === 'task');
    const medicationTasks = localVisit.tasks.filter(t => t.type === 'medication');

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto font-sans">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-60 backdrop-blur-sm" onClick={onClose}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full border border-gray-100">

                    {/* Header */}
                    <div className="relative bg-white px-6 pt-6 pb-4">
                        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 bg-gray-50 p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                            <X className="h-5 w-5" />
                        </button>

                        <div className="flex items-start space-x-4 mb-4">
                            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                <ClipboardList className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{visit.type}</h3>
                                <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
                                    <span className="flex items-center">
                                        <User className="w-3.5 h-3.5 mr-1" /> {visit.patientName}
                                    </span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span className="flex items-center">
                                        <Clock className="w-3.5 h-3.5 mr-1" /> {visit.startTime} - {visit.endTime}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                            <div className="flex justify-between text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                <span>Visit Completion</span>
                                <span>{calculateProgress()}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out shadow-sm"
                                    style={{ width: `${calculateProgress()}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-2 bg-white h-[55vh] overflow-y-auto space-y-6">

                        {/* Care Tasks */}
                        {careTasks.length > 0 && (
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                                    <Check className="w-3 h-3 mr-1.5" /> Care Tasks
                                </h4>
                                <div className="space-y-2.5">
                                    {careTasks.map(task => (
                                        <div
                                            key={task.id}
                                            onClick={() => toggleTask(task.id)}
                                            className={`group p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-start ${task.isCompleted
                                                    ? 'border-green-200 bg-green-50/50'
                                                    : 'border-gray-100 hover:border-blue-200 hover:shadow-sm bg-white'
                                                }`}
                                        >
                                            <div className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center mr-3 transition-all duration-300 ${task.isCompleted
                                                    ? 'bg-green-500 border-green-500 text-white scale-110'
                                                    : 'border-gray-300 bg-white group-hover:border-blue-400'
                                                }`}>
                                                {task.isCompleted && <Check className="w-3 h-3" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className={`text-sm font-medium transition-colors ${task.isCompleted ? 'text-gray-500 line-through decoration-gray-400' : 'text-gray-900 group-hover:text-blue-900'}`}>
                                                    {task.description}
                                                </p>
                                                {task.isEssential && (
                                                    <span className="inline-flex mt-1.5 items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-wide border border-gray-200">
                                                        Essential
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Medication Tasks */}
                        {medicationTasks.length > 0 && (
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center">
                                    <Pill className="w-3 h-3 mr-1.5" /> Medication
                                </h4>
                                <div className="space-y-2.5">
                                    {medicationTasks.map(task => (
                                        <div
                                            key={task.id}
                                            onClick={() => toggleTask(task.id)}
                                            className={`group p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-start ${task.isCompleted
                                                    ? 'border-green-200 bg-green-50/50'
                                                    : 'border-gray-100 hover:border-purple-200 hover:shadow-sm bg-white'
                                                }`}
                                        >
                                            <div className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center mr-3 transition-all duration-300 ${task.isCompleted
                                                    ? 'bg-green-500 border-green-500 text-white scale-110'
                                                    : 'border-gray-300 bg-white group-hover:border-purple-400'
                                                }`}>
                                                {task.isCompleted && <Check className="w-3 h-3" />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center">
                                                    <p className={`text-sm font-medium transition-colors ${task.isCompleted ? 'text-gray-500 line-through decoration-gray-400' : 'text-gray-900 group-hover:text-purple-900'}`}>
                                                        {task.description}
                                                    </p>
                                                </div>
                                                {task.dosage && (
                                                    <div className="flex items-center mt-1 text-xs text-gray-500 font-medium bg-gray-50 inline-block px-1.5 py-0.5 rounded">
                                                        {task.dosage} • {task.time || 'As needed'}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Notes */}
                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Visit Notes</h4>
                            <textarea
                                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                                placeholder="Add optional notes about the visit..."
                            />
                        </div>

                    </div>

                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex flex-row-reverse gap-3 rounded-b-2xl">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="w-full sm:w-auto inline-flex justify-center rounded-lg border border-transparent shadow-sm px-5 py-2.5 bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover:shadow-md"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-3 sm:mt-0 w-full sm:w-auto inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-5 py-2.5 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisitDetailsModal;
