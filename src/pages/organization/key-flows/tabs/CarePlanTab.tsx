import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { CarePlanData } from '../ChronicCareTypes';
import { StatusBadge, NodeIcon, ProgressBar } from '../ChronicCareComponents';

interface CarePlanTabProps {
    carePlan: CarePlanData;
    collapsedProblems: Set<string>;
    toggleProblem: (id: string, e?: React.MouseEvent) => void;
    collapsedObjectives: Set<string>;
    toggleObjective: (id: string, e?: React.MouseEvent) => void;
    handleAddProblem: () => void;
    handleAddObjective: (problemId: string) => void;
    handleAddGoal: (problemId: string, objectiveId: string) => void;
    handleAddIntervention: (problemId: string, objectiveId: string, goalId: string) => void;
    toggleInterventionStatus: (problemId: string, objectiveId: string, goalId: string, interventionId: string) => void;
}

const CarePlanTab: React.FC<CarePlanTabProps> = ({
    carePlan,
    collapsedProblems,
    toggleProblem,
    collapsedObjectives,
    toggleObjective,
    handleAddProblem,
    handleAddObjective,
    handleAddGoal,
    handleAddIntervention,
    toggleInterventionStatus
}) => {
    return (
        <div className="space-y-6">
            {/* Summary Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-5">
                <div className="flex flex-col xl:flex-row justify-between xl:items-center gap-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
                        <div>
                            <div className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">Conditions</div>
                            <div className="text-sm font-semibold text-gray-800">{carePlan.condition}</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider text-left">Status</div>
                            <StatusBadge status={carePlan.status} />
                        </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2 pl-4 pr-3 flex items-center gap-3 border border-green-100">
                        <div className="text-right">
                            <div className="text-xs text-green-800 font-medium">Care Plan Progress</div>
                            <div className="text-[10px] text-green-600">(As Per Plan)</div>
                        </div>
                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">GOOD</span>
                    </div>
                </div>
            </div>

            {/* Detailed Problems (Recursive Tree Main View) */}
            {carePlan.problems.map((prob) => (
                <div
                    key={prob.id}
                    id={prob.id}
                    data-section-id={prob.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
                >
                    {/* Problem Header */}
                    <div
                        className="bg-purple-100 px-4 md:px-6 py-3 flex items-center gap-3 border-b border-purple-200 cursor-pointer"
                        onClick={(e) => toggleProblem(prob.id, e)}
                    >
                        <button className="bg-white/50 p-0.5 rounded hover:bg-white text-purple-800 transition-colors">
                            {collapsedProblems.has(prob.id) ? <Plus size={14} /> : <Minus size={14} />}
                        </button>
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 flex-1 overflow-hidden">
                            <span className="font-semibold text-purple-900 border border-purple-300 bg-purple-200/50 px-2 py-0.5 rounded text-xs md:text-sm whitespace-nowrap shrink-0">{prob.id}:</span>
                            <span className="text-purple-900 font-medium text-sm md:text-base truncate">{prob.title}</span>
                        </div>

                        {/* Header Actions */}
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); handleAddObjective(prob.id); }}
                                className="text-xs px-2 py-1 bg-white/70 hover:bg-white text-purple-800 rounded shadow-sm transition-all border border-purple-200 font-medium flex items-center gap-1"
                            >
                                <Plus size={12} /> Obj
                            </button>
                        </div>
                    </div>

                    {!collapsedProblems.has(prob.id) && (
                        <div className="p-4 md:p-6 relative animate-in slide-in-from-top-2 duration-300">

                            {/* Objectives Loop */}
                            {prob.objectives.length === 0 && (
                                <div className="text-sm text-gray-400 italic pl-12">No objectives yet.</div>
                            )}

                            {prob.objectives.map((obj) => (
                                <div key={obj.id} className="relative mb-8 last:mb-0">
                                    {/* Objective Node */}
                                    <div id={obj.id} data-section-id={obj.id} className="relative z-10">
                                        <div
                                            className="bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 rounded-lg p-4 flex items-start md:items-center gap-4 border border-gray-100 hover:border-indigo-100 group cursor-pointer"
                                            onClick={(e) => toggleObjective(obj.id, e)}
                                        >
                                            <button
                                                className="mt-1 md:mt-0 p-0.5 rounded text-gray-400 hover:text-indigo-600 hover:bg-white transition-colors"
                                                onClick={(e) => { e.stopPropagation(); toggleObjective(obj.id, e); }}
                                            >
                                                {collapsedObjectives.has(obj.id) ? <Plus size={14} /> : <Minus size={14} />}
                                            </button>

                                            <div className="flex items-center gap-3 shrink-0">
                                                <NodeIcon type="purple" label={obj.label} />
                                                <span className="bg-indigo-900 text-white text-xs font-bold px-2 py-1 rounded hidden md:block shadow-sm">
                                                    Objective
                                                </span>
                                            </div>
                                            <p className="text-gray-700 text-sm leading-relaxed flex-1">{obj.text}</p>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleAddGoal(prob.id, obj.id); }}
                                                className="opacity-0 group-hover:opacity-100 text-xs px-2 py-1 bg-white border border-gray-200 text-gray-600 rounded shadow-sm hover:text-indigo-600 transition-all"
                                            >
                                                + Goal
                                            </button>
                                        </div>
                                    </div>

                                    {/* Children (Goals) - Connected by Line */}
                                    {!collapsedObjectives.has(obj.id) && (
                                        <div className="relative pl-8 md:pl-10 mt-6 border-l-2 border-dashed border-gray-200 ml-5 py-2 space-y-8 animate-in slide-in-from-top-2 duration-300">
                                            {obj.goals.map((goal) => (
                                                <div key={goal.id} className="relative">
                                                    {/* Horizontal Connector to Goal */}
                                                    <div className="absolute -left-[42px] md:-left-[42px] top-[28px] w-8 md:w-8 h-px border-t-2 border-dashed border-gray-200"></div>

                                                    {/* Goal Node */}
                                                    <div id={goal.id} data-section-id={goal.id} className="bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 rounded-lg p-5 md:p-6 border border-gray-100 hover:border-purple-100 group shadow-sm z-10 relative">
                                                        <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                                                            <div className="flex items-center gap-3 shrink-0">
                                                                <NodeIcon type="light-purple" label={goal.label} />
                                                                <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded uppercase hidden md:block">
                                                                    GOAL
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 w-full">
                                                                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{goal.text}</p>
                                                                <div className="flex flex-wrap items-center gap-4">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm animate-pulse"></span>
                                                                        <span className="text-xs font-semibold text-gray-900">{goal.status}</span>
                                                                    </div>
                                                                    <ProgressBar percent={goal.progress} />
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); handleAddIntervention(prob.id, obj.id, goal.id); }}
                                                                className="opacity-0 group-hover:opacity-100 text-xs px-2 py-1 bg-white border border-gray-200 text-gray-600 rounded shadow-sm hover:text-orange-600 transition-all self-start md:self-center"
                                                            >
                                                                + Intervention
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Children (Interventions) */}
                                                    <div className="relative pl-8 md:pl-10 mt-6 border-l-2 border-dashed border-gray-200 ml-5 py-2 space-y-6">
                                                        {goal.interventions.map((intervention) => (
                                                            <div key={intervention.id} className="relative">
                                                                {/* Horizontal Connector to Intervention */}
                                                                <div className="absolute -left-[42px] top-[24px] w-8 h-px border-t-2 border-dashed border-gray-200"></div>

                                                                <div id={intervention.id} data-section-id={intervention.id} className="bg-amber-50/50 hover:bg-amber-50 hover:shadow-md transition-all duration-300 rounded-lg border border-amber-100 p-4 md:p-5">
                                                                    <div className="flex items-start gap-3">
                                                                        <NodeIcon type="orange" label="I" />
                                                                        <div className="flex-1">
                                                                            <div className="flex justify-between items-start">
                                                                                <span className="text-sm font-bold text-gray-700 mb-2 block">{intervention.label}</span>
                                                                                <button
                                                                                    className={`text-xs px-2 py-1 rounded border transition-colors ${intervention.status === 'Completed'
                                                                                        ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
                                                                                        : 'bg-white/50 text-gray-600 border-gray-100 hover:bg-white hover:border-gray-300'
                                                                                        }`}
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation();
                                                                                        toggleInterventionStatus(prob.id, obj.id, goal.id, intervention.id);
                                                                                    }}
                                                                                >
                                                                                    {intervention.status}
                                                                                </button>
                                                                            </div>
                                                                            <p className="text-sm text-gray-800 font-medium mb-4 leading-relaxed">{intervention.text}</p>
                                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                                                                                <div><span className="text-gray-500 block mb-1">Start</span><span className="font-semibold">{intervention.startDate}</span></div>
                                                                                <div><span className="text-gray-500 block mb-1">Target</span><span className="font-semibold">{intervention.targetDate}</span></div>
                                                                                <div><span className="text-gray-500 block mb-1">Assigned</span><span className="font-semibold">{intervention.assignedTo}</span></div>
                                                                                <div><span className="text-gray-500 block mb-1">Priority</span><span className="font-semibold">{intervention.priority}</span></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {/* Add Problem Button */}
            <button
                className="hidden md:flex w-full py-4 border-2 border-dashed border-gray-200 rounded-xl items-center justify-center text-gray-400 hover:text-indigo-600 hover:border-indigo-300 hover:bg-gray-50 transition-all font-medium gap-2"
                onClick={handleAddProblem}
            >
                <Plus size={20} />
                Add New Problem
            </button>
        </div>
    );
};

export default CarePlanTab;
