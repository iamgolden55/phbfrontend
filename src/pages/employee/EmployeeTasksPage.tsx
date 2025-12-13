import React from 'react';
import { Helmet } from 'react-helmet';
import { TaskListItem } from '../../components/organization/EmployeeWidgets';
import { Plus, Filter } from 'lucide-react';

const EmployeeTasksPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <Helmet>
                <title>Tasks | SmartHR</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Tasks</h1>
                    <p className="text-gray-500 text-sm">Manage your daily tasks and to-dos.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus size={18} />
                    <span>Add Task</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* To Do Column */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-700">To Do</h3>
                        <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">3</span>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <TaskListItem title="Patient appointment booking" status="OnHold" />
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <TaskListItem title="Update patient records" status="OnHold" />
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <TaskListItem title="Prepare monthly report" status="OnHold" />
                        </div>
                    </div>
                </div>

                {/* In Progress Column */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-blue-800">In Progress</h3>
                        <span className="bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full text-xs font-bold">2</span>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <TaskListItem title="Appointment booking with payment" status="InProgress" />
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <TaskListItem title="Private chat module" status="InProgress" />
                        </div>
                    </div>
                </div>

                {/* Completed Column */}
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-green-800">Completed</h3>
                        <span className="bg-green-200 text-green-800 px-2 py-0.5 rounded-full text-xs font-bold">1</span>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <TaskListItem title="Patient and Doctor video conferencing" status="Completed" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeTasksPage;
