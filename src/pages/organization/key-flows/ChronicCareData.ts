export const initialPatientData = {
    name: "Smith John",
    age: 52,
    gender: "M",
    phone: "202-250-1456",
    email: "smith.john086@gmail.com",
    language: "English",
    insurance: ["BCBS", "Aetna", "+2"],
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};

export const initialCarePlanData = {
    condition: "Diabetes, Adult - Self-Care",
    startDate: "06/20/2024",
    expectedDate: "06/22/2024",
    status: "Active",
    progress: "GOOD",
    problems: [
        {
            id: "Problem-1",
            title: "High Blood Pressure (Hypertension)",
            objectives: [
                {
                    id: "Objective-1",
                    label: "Objective-1",
                    text: "Lower systolic blood pressure from 160 mmHg to below 140 mmHg within 3 months.",
                    goals: [
                        {
                            id: "Goal-1",
                            label: "GOAL-1",
                            text: "Achieve and maintain blood pressure within normal range to reduce the risk of cardiovascular complications.",
                            status: "High",
                            progress: 78.6,
                            startDate: "06/20/2024",
                            targetDate: "09/20/2024",
                            interventions: [
                                {
                                    id: "Intervention-1",
                                    label: "Intervention 1",
                                    text: "Prescribe antihypertensive medication (e.g., ACE inhibitors, beta-blockers) to lower blood pressure.",
                                    startDate: "06/20/2024",
                                    targetDate: "06/22/2024",
                                    assignedTo: "Liam Malik",
                                    priority: "High",
                                    status: "Open"
                                },
                                {
                                    id: "Intervention-2",
                                    label: "Intervention 2",
                                    text: "Recommend lifestyle modifications such as dietary changes (e.g., DASH diet), regular exercise, and stress management techniques.",
                                    startDate: "06/20/2024",
                                    targetDate: "09/20/2024",
                                    assignedTo: "Liam Malik",
                                    priority: "Medium",
                                    status: "Open"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};
