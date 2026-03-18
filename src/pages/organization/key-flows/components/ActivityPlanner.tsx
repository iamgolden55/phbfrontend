import React, { useState } from 'react';
import {
    Clock,
    Repeat,
    Calendar,
    MoreHorizontal,
    Plus,
    Pill,
    CheckSquare,
    ChevronDown,
    FileText
} from 'lucide-react';

interface Activity {
    id: string;
    type: 'medication' | 'task';
    name: string;
    description?: string;
    time: string;
    cadence: string;
    days: string[]; // M T W T F S S
    startDate: string;
    endDate?: string;
    isEssential?: boolean;
}

interface Session {
    id: string;
    name: string;
    timeRange: string;
    activities: Activity[];
}

const ActivityPlanner: React.FC = () => {
    // Mock Data
    const [sessions, setSessions] = useState<Session[]>([
        {
            id: '1',
            name: 'Morning session',
            timeRange: '06:00 to 11:00',
            activities: [
                {
                    id: 'a1',
                    type: 'medication',
                    name: 'Yuflyma 40mg/0.4ml solution',
                    description: 'Essential',
                    time: '08:00',
                    cadence: 'Every 2 weeks',
                    days: ['M', 'T'],
                    startDate: '6 Feb 25',
                    endDate: '21 Feb 25',
                    isEssential: true
                },
                {
                    id: 'a2',
                    type: 'task',
                    name: 'Assist to shower',
                    time: '09:00',
                    cadence: 'Daily',
                    days: [],
                    startDate: '6 Feb 25'
                },
                {
                    id: 'a3',
                    type: 'medication',
                    name: 'Yuflyma 40mg/0.4ml solution',
                    description: 'Essential',
                    time: '08:00',
                    cadence: 'Every 2 weeks',
                    days: ['M', 'T'],
                    startDate: '6 Feb 25',
                    endDate: '21 Feb 25',
                    isEssential: true
                }
            ]
        },
        {
            id: '2',
            name: 'Lunch session',
            timeRange: '11:00 to 14:00',
            activities: [
                {
                    id: 'a4',
                    type: 'task',
                    name: 'Prepare lunch',
                    time: '12:00',
                    cadence: 'Daily',
                    days: [],
                    startDate: '6 Feb 25'
                }
            ]
        }
    ]);

    const DayPill = ({ day, active }: { day: string, active: boolean }) => (
        <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded mx-0.5 ${active ? 'bg-blue-700 text-white' : 'text-gray-300'
            }`}>
            {day}
        </span>
    );

    const ActivityRow = ({ activity }: { activity: Activity }) => (
        <div className="grid grid-cols-12 gap-4 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors px-4 -mx-4">
            <div className="col-span-4 flex items-start space-x-3">
                <div className="mt-1 text-gray-400">
                    {activity.type === 'medication' ? <Pill size={16} /> : <CheckSquare size={16} />}
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                    {activity.description && (
                        <p className="text-xs text-gray-500">{activity.description}</p>
                    )}
                </div>
            </div>

            <div className="col-span-2 flex items-center text-sm text-gray-600">
                <Clock size={14} className="mr-2 text-gray-400" />
                {activity.time}
            </div>

            <div className="col-span-3">
                <div className="flex items-center text-sm text-gray-600 mb-1">
                    <Repeat size={14} className="mr-2 text-gray-400" />
                    {activity.cadence}
                </div>
                {activity.days.length > 0 && (
                    <div className="flex">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                            <DayPill key={i} day={d} active={activity.days.includes(d) || (activity.days.length === 2 && i < 2)} />
                            // Mock logic for active days visualization
                        ))}
                    </div>
                )}
            </div>

            <div className="col-span-3 flex items-center text-sm text-gray-600">
                <Calendar size={14} className="mr-2 text-gray-400" />
                {activity.startDate}
                {activity.endDate && (
                    <>
                        <span className="mx-2">→</span>
                        {activity.endDate}
                    </>
                )}
            </div>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-start">
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 text-xl">
                        AS
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-gray-900">Annie Smith</h2>
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">Active</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">Template length: <span className="text-gray-900 font-medium">2 Weeks</span></p>
                    </div>
                </div>

                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                        Display Options
                    </button>
                    <button className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800 flex items-center shadow-sm">
                        <Plus size={16} className="mr-2" />
                        Add visit schedule
                    </button>
                </div>
            </div>

            {/* Template Header */}
            <div className="flex justify-between items-end pb-2 border-b border-gray-200">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">Annie's Activity template</h3>
                    <p className="text-sm text-gray-500">A template of all tasks and medications with recurring schedules.</p>
                </div>
            </div>

            {/* Sessions */}
            <div className="space-y-6">
                {sessions.map(session => (
                    <div key={session.id} className="bg-white border boundary-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-gray-900">{session.name}</h4>
                                <p className="text-xs text-gray-500">{session.timeRange}</p>
                            </div>
                            <button className="text-xs font-medium text-gray-600 hover:text-gray-900 flex items-center bg-white px-3 py-1.5 rounded border border-gray-200 shadow-sm hover:shadow-md transition-all">
                                <Plus size={12} className="mr-1" />
                                Add activity list
                            </button>
                        </div>

                        <div className="px-6 py-2">
                            <div className="grid grid-cols-12 gap-4 py-3 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                                <div className="col-span-4">Activity</div>
                                <div className="col-span-2">Time</div>
                                <div className="col-span-3">Cadence</div>
                                <div className="col-span-3">From / Until</div>
                            </div>

                            {session.activities.map(activity => (
                                <ActivityRow key={activity.id} activity={activity} />
                            ))}
                        </div>

                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-start">
                            <div className="flex space-x-4 text-xs text-gray-400">
                                <span className="flex items-center"><Pill size={12} className="mr-1" /> {session.activities.filter(a => a.type === 'medication').length} Meds</span>
                                <span className="flex items-center"><CheckSquare size={12} className="mr-1" /> {session.activities.filter(a => a.type === 'task').length} Tasks</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State / Add Section */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-white group-hover:shadow-md transition-all">
                    <Plus size={24} className="text-gray-400 group-hover:text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900">Add another session</h4>
                <p className="text-sm text-gray-500">Create a new time block for activities</p>
            </div>
        </div>
    );
};

export default ActivityPlanner;
