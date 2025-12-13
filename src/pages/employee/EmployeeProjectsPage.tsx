import React from 'react';
import { Helmet } from 'react-helmet';
import { ProjectCard } from '../../components/organization/EmployeeWidgets';
import { Filter, Search } from 'lucide-react';

const EmployeeProjectsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <Helmet>
                <title>Projects | SmartHR</title>
            </Helmet>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Projects</h1>
                    <p className="text-gray-500 text-sm">View and manage your assigned projects.</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
                        <Filter size={18} />
                        <span className="hidden md:inline">Filter</span>
                    </button>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProjectCard
                    title="Office Management"
                    role="Project Leader"
                    deadline="14/01/2024"
                    tasksCompleted={6}
                    totalTasks={10}
                    timeSpent="65/120 Hrs"
                />
                <ProjectCard
                    title="Hospital Admin"
                    role="Project Leader"
                    deadline="20/02/2024"
                    tasksCompleted={3}
                    totalTasks={15}
                    timeSpent="25/150 Hrs"
                />
                <ProjectCard
                    title="Video Conferencing"
                    role="Team Member"
                    deadline="10/03/2024"
                    tasksCompleted={8}
                    totalTasks={12}
                    timeSpent="40/80 Hrs"
                />
                <ProjectCard
                    title="Patient Portal"
                    role="Developer"
                    deadline="05/04/2024"
                    tasksCompleted={2}
                    totalTasks={20}
                    timeSpent="10/200 Hrs"
                />
                <ProjectCard
                    title="Mobile App"
                    role="UX Designer"
                    deadline="15/05/2024"
                    tasksCompleted={12}
                    totalTasks={12}
                    timeSpent="90/90 Hrs"
                />
            </div>
        </div>
    );
};

export default EmployeeProjectsPage;
