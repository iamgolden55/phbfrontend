export interface Intervention {
    id: string;
    label: string;
    text: string;
    startDate: string;
    targetDate: string;
    assignedTo: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Open' | 'Completed';
}

export interface Goal {
    id: string;
    label: string;
    text: string;
    status: 'High' | 'Medium' | 'Low';
    progress: number;
    startDate: string;
    targetDate: string;
    interventions: Intervention[];
}

export interface Objective {
    id: string;
    label: string;
    text: string;
    goals: Goal[];
}

export interface Problem {
    id: string;
    title: string;
    objectives: Objective[];
}

export interface CarePlanData {
    condition: string;
    startDate: string;
    expectedDate: string;
    status: string;
    progress: string;
    problems: Problem[];
}
