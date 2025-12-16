import { useState, useEffect } from 'react';
import { Step } from 'react-joyride';

export const useEmployeeDashboardTour = () => {
    const [run, setRun] = useState(false);

    useEffect(() => {
        // Check if user has seen the tour
        const hasSeenTour = localStorage.getItem('hasSeenEmployeeDashboardTour');
        if (!hasSeenTour) {
            setRun(true);
        }
    }, []);

    const handleTourFinish = () => {
        setRun(false);
        localStorage.setItem('hasSeenEmployeeDashboardTour', 'true');
    };

    const steps: Step[] = [
        {
            target: 'body',
            content: (
                <div className="text-left">
                    <h3 className="font-bold text-xl mb-2">Welcome to Your New Hub! 🚀</h3>
                    <p className="text-slate-600 text-sm">
                        James, we've completely redesigned your dashboard to keep you focused and productive.
                        Let's take a quick tour of the new features.
                    </p>
                </div>
            ),
            placement: 'center',
            disableBeacon: true,
        },
        {
            target: '[data-tour="emp-header"]',
            content: (
                <div className="text-left">
                    <h4 className="font-bold text-lg mb-1">Unified Navigation</h4>
                    <p className="text-slate-600 text-sm">
                        Seamlessly switch between your <strong>Overview</strong>, <strong>Tasks</strong>, <strong>Projects</strong>, and more.
                        Everything you need is just one click away.
                    </p>
                </div>
            ),
            placement: 'bottom',
        },
        {
            target: '[data-tour="emp-welcome"]',
            content: (
                <div className="text-left">
                    <h4 className="font-bold text-lg mb-1">Your Personal Brief</h4>
                    <p className="text-slate-600 text-sm">
                        Start your day here. We'll show you exactly what you need to focus on to have a great day.
                    </p>
                </div>
            ),
            placement: 'right',
        },
        {
            target: '[data-tour="emp-clock"]',
            content: (
                <div className="text-left">
                    <h4 className="font-bold text-lg mb-1">Smart Clock-In</h4>
                    <p className="text-slate-600 text-sm">
                        Manage your shift status, take breaks, and track your hours with this easy-to-use widget.
                    </p>
                </div>
            ),
            placement: 'left',
        },
        {
            target: '[data-tour="emp-stats"]',
            content: (
                <div className="text-left">
                    <h4 className="font-bold text-lg mb-1">Vital Stats</h4>
                    <p className="text-slate-600 text-sm">
                        Keep an eye on your key metrics like hours worked, tasks completed, and leave balance at a glance.
                    </p>
                </div>
            ),
            placement: 'top',
        },
        {
            target: '[data-tour="emp-timeline"]',
            content: (
                <div className="text-left">
                    <h4 className="font-bold text-lg mb-1">Shift Timeline</h4>
                    <p className="text-slate-600 text-sm">
                        Visualize your day's productivity. Track meetings, deep work sessions, and breaks in real-time.
                    </p>
                </div>
            ),
            placement: 'top',
        },
        {
            target: '[data-tour="emp-action-card"]',
            content: (
                <div className="text-left">
                    <h4 className="font-bold text-lg mb-1">Priority Actions</h4>
                    <p className="text-slate-600 text-sm">
                        Never miss a deadline. Urgent items like contract signings or approvals will appear right here.
                    </p>
                </div>
            ),
            placement: 'left',
        },
        {
            target: '[data-tour="emp-shortcuts"]',
            content: (
                <div className="text-left">
                    <h4 className="font-bold text-lg mb-1">Quick Shortcuts</h4>
                    <p className="text-slate-600 text-sm">
                        Need to request leave or check your payslip? Access your most common tools instantly.
                    </p>
                </div>
            ),
            placement: 'top',
        }
    ];

    const startTour = () => {
        setRun(true);
    };

    return {
        run,
        steps,
        handleTourFinish,
        startTour
    };
};
