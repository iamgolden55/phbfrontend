import React, { useState } from 'react';
import {
    Plus,
    X,
    Calendar,
    Clock,
    CheckSquare,
    AlertCircle,
    MoreVertical,
    ChevronDown,
    Filter,
    Search,
    User,
    Activity,
    FileText,
    Heart
} from 'lucide-react';

interface Task {
    id: string;
    description: string;
    details?: string;
    type: 'clinical' | 'admin' | 'personal_care';
    priority: 'high' | 'medium' | 'low';
    assignedTo: string;
    cadence: string;
    time: string;
    frequency: string;
    isEssential?: boolean;
    status: 'pending' | 'completed';
}

const WomensHealthTaskPlanner: React.FC = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'clinical' | 'admin' | 'personal_care'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Form State
    const [newTask, setNewTask] = useState<Partial<Task>>({
        description: '',
        details: '',
        type: 'clinical',
        priority: 'medium',
        assignedTo: '',
        cadence: 'Daily',
        time: 'Morning',
        frequency: 'Everyday',
        isEssential: false,
        status: 'pending'
    });

    // Mock Data
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: '1',
            description: 'Administer IVF Medication',
            details: 'Follow standard protocol for Patient ID #8842',
            type: 'clinical',
            priority: 'high',
            assignedTo: 'Nurse Sarah',
            cadence: 'Daily',
            time: 'Morning',
            frequency: 'Everyday',
            isEssential: true,
            status: 'pending'
        },
        {
            id: '2',
            description: 'Update Patient Chart',
            details: 'Log vitals and morning routine notes',
            type: 'admin',
            priority: 'medium',
            assignedTo: 'Dr. Emily',
            cadence: 'Daily',
            time: 'Afternoon',
            frequency: 'Everyday',
            isEssential: false,
            status: 'completed'
        },
        {
            id: '3',
            description: 'Assist with personal hygiene',
            type: 'personal_care',
            priority: 'low',
            assignedTo: 'Caregiver Mike',
            cadence: 'Twice daily',
            time: 'Morning, Evening',
            frequency: 'Everyday',
            isEssential: false,
            status: 'pending'
        }
    ]);

    const handleSaveTask = (e: React.FormEvent) => {
        e.preventDefault();

        if (!newTask.description) return; // Basic validation

        const taskToAdd: Task = {
            id: Math.random().toString(36).substr(2, 9),
            description: newTask.description || 'New Task',
            details: newTask.details,
            type: newTask.type as any,
            priority: newTask.priority as any,
            assignedTo: newTask.assignedTo || 'Unassigned',
            cadence: newTask.cadence || 'Daily',
            time: newTask.time || 'Anytime',
            frequency: newTask.frequency || 'Everyday',
            isEssential: newTask.isEssential,
            status: 'pending'
        };

        setTasks([taskToAdd, ...tasks]);

        // Reset and close
        setNewTask({
            description: '',
            details: '',
            type: 'clinical',
            priority: 'medium',
            assignedTo: '',
            cadence: 'Daily',
            time: 'Morning',
            frequency: 'Everyday',
            isEssential: false,
            status: 'pending'
        });
        setIsSidePanelOpen(false);
    };

    const toggleTaskStatus = (taskId: string) => {
        setTasks(tasks.map(t =>
            t.id === taskId
                ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
                : t
        ));
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'clinical': return <Activity className="w-4 h-4 text-blue-500" />;
            case 'admin': return <FileText className="w-4 h-4 text-gray-500" />;
            case 'personal_care': return <Heart className="w-4 h-4 text-pink-500" />;
            default: return <CheckSquare className="w-4 h-4 text-gray-400" />;
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'high': return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">High</span>;
            case 'medium': return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700">Medium</span>;
            case 'low': return <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700">Low</span>;
            default: return null;
        }
    };

    const filteredTasks = tasks.filter(task => {
        const matchesTab = activeTab === 'all' || task.type === activeTab;
        const matchesSearch = task.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="flex h-full gap-6 animate-in fade-in duration-500 font-sans min-h-[600px] relative">
            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col transition-all duration-300`}>

                {/* Header Section */}
                <div className="flex flex-col mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Task Management</h1>
                            <p className="text-gray-500 text-sm mt-1">Manage and assign daily care tasks for this flow.</p>
                        </div>
                        <button
                            onClick={() => setIsSidePanelOpen(true)}
                            className="flex items-center px-4 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 shadow-sm transition-transform active:scale-95 text-sm"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create New Task
                        </button>
                    </div>

                    {/* Stats & Filters */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                            {['all', 'clinical', 'admin', 'personal_care'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`px-4 py-1.5 text-xs font-bold rounded-md capitalize transition-all ${activeTab === tab
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab.replace('_', ' ')}
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                            />
                        </div>
                    </div>
                </div>

                {/* Task Table */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <div className="col-span-4">Task Description</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Assigned To</div>
                        <div className="col-span-2">Schedule</div>
                        <div className="col-span-1">Priority</div>
                        <div className="col-span-1 text-right">Actions</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-100 overflow-y-auto flex-1">
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => (
                                <div key={task.id} className="grid grid-cols-12 px-6 py-4 hover:bg-gray-50 transition-colors items-center group">
                                    <div className="col-span-4 pr-4">
                                        <div className="flex items-start">
                                            <div className="mt-1 mr-3">
                                                <div
                                                    onClick={() => toggleTaskStatus(task.id)}
                                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${task.status === 'completed'
                                                            ? 'bg-green-500 border-green-500'
                                                            : 'border-gray-300 hover:border-green-500'
                                                        }`}
                                                >
                                                    {task.status === 'completed' && <CheckSquare className="w-3 h-3 text-white" />}
                                                </div>
                                            </div>
                                            <div>
                                                <p className={`font-bold text-sm transition-all ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                                                    {task.description}
                                                </p>
                                                {task.details && <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[200px]">{task.details}</p>}
                                                {task.isEssential && (
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 mt-1">
                                                        <AlertCircle className="w-3 h-3" /> Essential Care
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <div className="flex items-center space-x-2 text-sm text-gray-700 capitalize">
                                            {getTypeIcon(task.type)}
                                            <span>{task.type.replace('_', ' ')}</span>
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">
                                                {task.assignedTo.charAt(0)}
                                            </div>
                                            <span className="text-sm text-gray-700">{task.assignedTo}</span>
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <div className="text-sm text-gray-900 font-medium">{task.time}</div>
                                        <div className="text-xs text-gray-500">{task.cadence}</div>
                                    </div>

                                    <div className="col-span-1">
                                        {getPriorityBadge(task.priority)}
                                    </div>

                                    <div className="col-span-1 flex justify-end">
                                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                    <Filter className="w-6 h-6 text-gray-400" />
                                </div>
                                <h3 className="text-gray-900 font-bold">No tasks found</h3>
                                <p className="text-gray-500 text-sm">Try adjusting your filters or search query.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Side Panel Overlay */}
            {isSidePanelOpen && (
                <div className="absolute inset-0 z-40 bg-gray-900/10 backdrop-blur-[1px] transition-opacity" onClick={() => setIsSidePanelOpen(false)} />
            )}

            {/* Side Panel */}
            <div className={`fixed right-0 top-0 h-full w-[450px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isSidePanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Panel Header */}
                    <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
                        <div>
                            <h2 className="font-bold text-xl text-gray-900">Create New Task</h2>
                            <p className="text-xs text-gray-500 mt-1">Define task details, assignment, and schedule.</p>
                        </div>
                        <button
                            onClick={() => setIsSidePanelOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Panel Form */}
                    <form className="flex-1 overflow-y-auto p-6 space-y-6" onSubmit={handleSaveTask}>

                        {/* Task Type */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['clinical', 'admin', 'personal_care'].map(type => (
                                    <button
                                        type="button"
                                        key={type}
                                        onClick={() => setNewTask({ ...newTask, type: type as any })}
                                        className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-all group ${newTask.type === type
                                                ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                                                : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                                            }`}
                                    >
                                        <div className={`mb-2 ${newTask.type === type ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`}>
                                            {getTypeIcon(type)}
                                        </div>
                                        <span className={`text-xs font-medium capitalize ${newTask.type === type ? 'text-blue-700' : 'text-gray-600 group-hover:text-blue-700'}`}>
                                            {type.replace('_', ' ')}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Task Name & Details */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-1">Task Name *</label>
                                <input
                                    type="text"
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    placeholder="e.g. Administer Morning Meds"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-1">Additional Details</label>
                                <textarea
                                    rows={3}
                                    value={newTask.details}
                                    onChange={(e) => setNewTask({ ...newTask, details: e.target.value })}
                                    placeholder="Enter specific protocol or notes..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                            </div>
                        </div>

                        <div className="h-px bg-gray-100"></div>

                        {/* Assignment & Priority */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-1">Assigned To</label>
                                <div className="relative">
                                    <select
                                        value={newTask.assignedTo}
                                        onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm appearance-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Staff...</option>
                                        <option value="Nurse Sarah">Nurse Sarah</option>
                                        <option value="Dr. Emily">Dr. Emily</option>
                                        <option value="Caregiver Mike">Caregiver Mike</option>
                                    </select>
                                    <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <ChevronDown className="absolute right-3 top-3 w-3 h-3 text-gray-400" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-900 mb-1">Priority</label>
                                <select
                                    value={newTask.priority}
                                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="low">Low Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="high">High Priority</option>
                                </select>
                            </div>
                        </div>

                        {/* Schedule */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Schedule</label>
                            <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">Frequency</span>
                                    <select
                                        value={newTask.frequency}
                                        onChange={(e) => setNewTask({ ...newTask, frequency: e.target.value })}
                                        className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option>Daily</option>
                                        <option>Weekly</option>
                                        <option>One-off</option>
                                    </select>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">Time of Day</span>
                                    <div className="flex gap-2">
                                        {['Morning', 'Afternoon', 'Evening'].map(t => (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => setNewTask({ ...newTask, time: t })}
                                                className={`px-2 py-1 text-xs border rounded transition-colors ${newTask.time === t
                                                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold'
                                                        : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-600'
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="pt-4 flex items-center justify-between">
                            <label className="flex items-center select-none cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={newTask.isEssential}
                                    onChange={(e) => setNewTask({ ...newTask, isEssential: e.target.checked })}
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">Mark as essential task</span>
                            </label>
                        </div>

                    </form>

                    {/* Panel Footer */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setIsSidePanelOpen(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSaveTask}
                            className={`px-6 py-2 bg-green-700 text-white rounded-lg text-sm font-bold shadow-sm transition-all ${!newTask.description
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'hover:bg-green-800 hover:shadow transform active:scale-95'
                                }`}
                        >
                            Create Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WomensHealthTaskPlanner;
