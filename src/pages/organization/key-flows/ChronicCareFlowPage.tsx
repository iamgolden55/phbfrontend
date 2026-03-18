import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
    ChevronLeft,
    Phone,
    Mail,
    Menu,
    X,
    Plus,
    Minus,
    ChevronDown
} from 'lucide-react';
import { AddItemModal } from './AddItemModal';
import { initialPatientData, initialCarePlanData } from './ChronicCareData';

// Tab Components
import CarePlanTab from './tabs/CarePlanTab';
import OverviewTab from './tabs/OverviewTab';
import AssessmentTab from './tabs/AssessmentTab';
import CarePlanVisitTab from './tabs/CarePlanVisitTab';

// --- Mock Data (Ideally moved to separate file, but keeping here for simplicity as per instructions) ---



// --- Sidebar Recursive Node ---
// Keeping this here for the sidebar logic, or could move to a separate component.
const SidebarNode = ({ label, text, type, id, children, onClick, isActive }: any) => {
    return (
        <div className="relative group/sidebar-node">
            <div
                className="flex gap-2 items-start cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
                onClick={(e) => { e.stopPropagation(); onClick(id); }}
            >
                <div className="relative z-10">
                    <div className={`w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5 border
                        ${type === 'purple' ? 'bg-indigo-900 text-white border-indigo-900' : ''}
                        ${type === 'light-purple' ? 'bg-purple-100 text-purple-700 border-purple-200' : ''}
                        ${type === 'orange' ? 'bg-orange-100 text-orange-600 border-orange-200' : ''}
                    `}>
                        {label.charAt(0).toUpperCase()}
                    </div>
                </div>

                <div className="flex-1 min-w-0">
                    <div className={`text-[10px] truncate transition-colors ${isActive ? 'text-gray-900 font-medium' : 'text-gray-500 group-hover/sidebar-node:text-gray-700'}`}>
                        {text}
                    </div>
                </div>
            </div>
            {/* Connecting Line for Children */}
            {children && <div className="ml-1.5 pl-3 border-l border-dashed border-gray-300 space-y-2 mt-2">{children}</div>}
        </div>
    )
};


const ChronicCareFlowPage: React.FC = () => {
    // State
    const [patientData] = useState(initialPatientData);
    // Use any type here for simplicity in this refactor step, but ideally strict typing
    const [carePlan, setCarePlan] = useState<any>(initialCarePlanData);
    const [activeTab, setActiveTab] = useState('Overview'); // Default to Overview now? Or stay Care Plan? Let's say Overview.
    const [collapsedProblems, setCollapsedProblems] = useState<Set<string>>(new Set());
    const [collapsedObjectives, setCollapsedObjectives] = useState<Set<string>>(new Set());
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string | null>(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<'problem' | 'objective' | 'goal' | 'intervention'>('problem');
    // Using refs or simple ID tracking for "add" parent context
    const [activeIds, setActiveIds] = useState<{ problemId?: string, objectiveId?: string, goalId?: string }>({});

    // --- Actions ---

    const handleAddProblem = () => {
        setModalType('problem');
        setActiveIds({});
        setIsModalOpen(true);
    };

    const handleAddObjective = (problemId: string) => {
        setModalType('objective');
        setActiveIds({ problemId });
        setIsModalOpen(true);
    };

    const handleAddGoal = (problemId: string, objectiveId: string) => {
        setActiveIds({ problemId, objectiveId });
        setModalType('goal');
        setIsModalOpen(true);
    };

    const handleAddIntervention = (problemId: string, objectiveId: string, goalId: string) => {
        setModalType('intervention');
        setActiveIds({ problemId, objectiveId, goalId });
        setIsModalOpen(true);
    };


    const handleSaveItem = (data: any) => {
        const newCarePlan = { ...carePlan };

        if (modalType === 'problem') {
            const newId = `Problem-${newCarePlan.problems.length + 1}`;
            newCarePlan.problems.push({
                id: newId,
                title: data.text,
                objectives: []
            });
            const newCollapsed = new Set(collapsedProblems);
            newCollapsed.delete(newId);
            setCollapsedProblems(newCollapsed);
        } else {
            const problem = newCarePlan.problems.find((p: any) => p.id === activeIds.problemId);
            if (problem) {
                if (modalType === 'objective') {
                    const newId = `Objective-${Math.random().toString(36).substr(2, 5)}`;
                    problem.objectives.push({
                        id: newId,
                        label: `Objective`,
                        text: data.text,
                        goals: []
                    });
                } else {
                    const objective = problem.objectives.find((o: any) => o.id === activeIds.objectiveId);
                    if (objective) {
                        if (modalType === 'goal') {
                            const newId = `Goal-${Math.random().toString(36).substr(2, 5)}`;
                            objective.goals.push({
                                id: newId,
                                label: `GOAL`,
                                text: data.text,
                                status: data.status || 'Medium',
                                progress: data.progress || 0,
                                startDate: data.startDate || '2024-06-20',
                                targetDate: data.targetDate || '2024-09-20',
                                interventions: []
                            });
                        } else {
                            const goal = objective.goals.find((g: any) => g.id === activeIds.goalId);
                            if (goal) {
                                const newId = `Intervention-${Math.random().toString(36).substr(2, 5)}`;
                                goal.interventions.push({
                                    id: newId,
                                    label: `Intervention`,
                                    text: data.text,
                                    startDate: data.startDate || '2024-06-20',
                                    targetDate: data.targetDate || '2024-06-22',
                                    assignedTo: data.assignedTo || 'Unassigned',
                                    priority: data.priority || 'Medium',
                                    status: 'Open'
                                });
                            }
                        }
                    }
                }
            }
        }
        setCarePlan(newCarePlan);
    };


    const toggleProblem = (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        const newCollapsed = new Set(collapsedProblems);
        if (newCollapsed.has(id)) {
            newCollapsed.delete(id);
        } else {
            newCollapsed.add(id);
        }
        setCollapsedProblems(newCollapsed);
    };

    const toggleObjective = (id: string, e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        const newSet = new Set(collapsedObjectives);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setCollapsedObjectives(newSet);
    };

    const scrollToSection = (id: string) => {
        // Only relevant if we are on the Care Plan tab
        if (activeTab !== 'Care Plan') {
            setActiveTab('Care Plan');
            // Small delay to allow render
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setActiveSection(id);
                }
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActiveSection(id);
            }
        }
        setMobileMenuOpen(false);
    };


    const handleToggleInterventionStatus = (problemId: string, objectiveId: string, goalId: string, interventionId: string) => {
        const newCarePlan = { ...carePlan };
        const problem = newCarePlan.problems.find((p: any) => p.id === problemId);
        if (problem) {
            const objective = problem.objectives.find((o: any) => o.id === objectiveId);
            if (objective) {
                const goal = objective.goals.find((g: any) => g.id === goalId);
                if (goal) {
                    const intervention = goal.interventions.find((i: any) => i.id === interventionId);
                    if (intervention) {
                        intervention.status = intervention.status === 'Open' ? 'Completed' : 'Open';
                        setCarePlan(newCarePlan);
                    }
                }
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-slate-800 pb-20">
            <Helmet>
                <title>Care Program / Patient Detail | PHB</title>
            </Helmet>

            <AddItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveItem}
                type={modalType}
            />

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
            )}

            {/* Top Navigation Bar */}
            <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-4">
                    <button
                        className="lg:hidden p-1 -ml-2 text-gray-600"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <button className="hidden lg:block p-1 hover:bg-gray-100 rounded">
                        <div className="space-y-1">
                            <div className="w-5 h-0.5 bg-gray-600"></div>
                            <div className="w-5 h-0.5 bg-gray-600"></div>
                            <div className="w-5 h-0.5 bg-gray-600"></div>
                        </div>
                    </button>
                    <div className="flex items-center gap-2 text-sm text-gray-500 overflow-hidden">
                        <span className="whitespace-nowrap">Care Program</span>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-900 font-medium whitespace-nowrap truncate">Patient Detail</span>
                    </div>
                </div>
            </div>

            {/* Patient Header Banner */}
            <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
                        <button className="text-gray-400 hover:text-gray-600">
                            <ChevronLeft size={20} />
                        </button>
                        <img
                            src={patientData.image}
                            alt={patientData.name}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-gray-200"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h1 className="text-base md:text-lg font-bold text-gray-900">{patientData.name}</h1>
                                <span className="text-gray-500 text-xs md:text-sm whitespace-nowrap">{patientData.age}Y, {patientData.gender}</span>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-6 ml-4 text-sm text-gray-600 border-l border-gray-200 pl-4">
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="text-gray-400" />
                                {patientData.phone}
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail size={14} className="text-gray-400" />
                                <span className="truncate max-w-[150px]">{patientData.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 px-4 md:px-6 overflow-x-auto scrollbar-hide">
                <div className="flex items-center gap-6 md:gap-8 min-w-max">
                    {['Overview', 'Assessment', 'Care Plan', 'Care Plan Visit'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                ? 'border-indigo-600 text-indigo-900'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-[1600px] mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative">

                {/* LEFT SIDEBAR (Sticky) - Always Visible for Care Plan Context or just for Care Plan tab?
                    Usually for this layout it's good to keep it, but maybe simplify for Overview?
                    Let's keep it visible so users can jump to the plan easily. 
                    Actually, if I am on Overview, the tree might not be relevant or user wants to jump to it.
                    Let's stick to the previous behavior: Sidebar is the Plan of Care tree. 
                */}
                <div className={`
                    fixed lg:sticky lg:top-24 left-0 h-full lg:h-[calc(100vh-120px)] w-[280px] lg:w-auto bg-white lg:bg-transparent shadow-2xl lg:shadow-none z-50 lg:z-auto transition-transform duration-300 ease-in-out lg:translate-x-0 lg:col-span-3
                    ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                        <div className="p-3 bg-purple-50 border-b border-purple-100 flex justify-between items-center shrink-0">
                            <span className="font-semibold text-gray-800 text-sm">Plan of Care</span>
                            <ChevronDown size={16} className="text-gray-500" />
                        </div>
                        <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
                            <div className="space-y-6">
                                {carePlan.problems.map((prob: any) => (
                                    <div key={prob.id} className="relative">
                                        {/* Problem Header in Tree */}
                                        <div
                                            className="flex items-start gap-2 mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors group/item"
                                            onClick={(e) => { toggleProblem(prob.id, e); scrollToSection(prob.id); }}
                                        >
                                            <button
                                                className="mt-0.5 bg-gray-100 p-0.5 rounded border border-gray-300 hover:bg-gray-200"
                                                onClick={(e) => { toggleProblem(prob.id, e); }}
                                            >
                                                {collapsedProblems.has(prob.id) ? <Plus size={10} className="text-gray-600" /> : <Minus size={10} className="text-gray-600" />}
                                            </button>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs font-semibold text-gray-700 mb-0.5">{prob.id}</div>
                                                <div className="text-[11px] text-gray-500 leading-tight truncate">{prob.title}</div>
                                            </div>
                                        </div>

                                        {/* Nested Children Tree */}
                                        {!collapsedProblems.has(prob.id) && (
                                            <div className="relative pl-1.5 ml-1.5 border-l border-dashed border-gray-300 space-y-2 mt-2">
                                                {prob.objectives.map((obj: any) => (
                                                    <SidebarNode
                                                        key={obj.id}
                                                        id={obj.id}
                                                        label="O"
                                                        text={obj.text}
                                                        type="purple"
                                                        onClick={scrollToSection}
                                                        isActive={activeSection === obj.id}
                                                    >
                                                        {obj.goals.map((goal: any) => (
                                                            <SidebarNode
                                                                key={goal.id}
                                                                id={goal.id}
                                                                label="G"
                                                                text={goal.text}
                                                                type="light-purple"
                                                                onClick={scrollToSection}
                                                                isActive={activeSection === goal.id}
                                                            >
                                                                {goal.interventions.map((int: any) => (
                                                                    <SidebarNode
                                                                        key={int.id}
                                                                        id={int.id}
                                                                        label="I"
                                                                        text={int.text}
                                                                        type="orange"
                                                                        onClick={scrollToSection}
                                                                        isActive={activeSection === int.id}
                                                                    />
                                                                ))}
                                                            </SidebarNode>
                                                        ))}
                                                    </SidebarNode>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-4 border-t border-dashed border-gray-200">
                                <button
                                    className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors w-full p-2 rounded hover:bg-gray-50 text-left border border-dashed border-gray-300 hover:border-indigo-300"
                                    onClick={handleAddProblem}
                                >
                                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                                        <Plus size={12} />
                                    </div>
                                    <span className="text-xs font-medium">Add Problem</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT MAIN CONTENT */}
                <div className="lg:col-span-9">
                    {activeTab === 'Overview' && <OverviewTab />}
                    {activeTab === 'Assessment' && <AssessmentTab />}
                    {activeTab === 'Care Plan' && (
                        <CarePlanTab
                            carePlan={carePlan}
                            collapsedProblems={collapsedProblems}
                            toggleProblem={toggleProblem}
                            collapsedObjectives={collapsedObjectives}
                            toggleObjective={toggleObjective}
                            handleAddProblem={handleAddProblem}
                            handleAddObjective={handleAddObjective}
                            handleAddGoal={handleAddGoal}
                            handleAddIntervention={handleAddIntervention}
                            toggleInterventionStatus={handleToggleInterventionStatus}
                        />
                    )}
                    {activeTab === 'Care Plan Visit' && <CarePlanVisitTab />}
                </div>
            </div>
        </div>
    );
};

export default ChronicCareFlowPage;
