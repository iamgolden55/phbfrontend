import { useState, useEffect } from 'react';
import { Step } from 'react-joyride';
import { useOrganizationTour } from '../context/OrganizationTourContext';

export const useDashboardTour = () => {
    const [run, setRun] = useState(false);
    const { tourTrigger } = useOrganizationTour();

    useEffect(() => {
        // Auto-start tour for demo purposes. 
        // In production, we would check localStorage to see if user has already seen it.
        const hasSeenTour = localStorage.getItem('hasSeenDashboardTour');
        if (!hasSeenTour) {
            setRun(true);
        }
    }, []);

    // Listen for manual triggers from the Layout Header
    useEffect(() => {
        if (tourTrigger > 0) {
            setRun(true);
        }
    }, [tourTrigger]);

    const handleTourFinish = () => {
        setRun(false);
        localStorage.setItem('hasSeenDashboardTour', 'true');
    };

    const steps: Step[] = [
        {
            target: 'body',
            content: (
                <div>
                    <h3 className="font-bold text-lg mb-2">Welcome to your New Dashboard! 🎉</h3>
                    <p className="text-gray-600">
                        We've redesigned the experience to be faster, cleaner, and more powerful.
                        Let's take a quick 1-minute tour.
                    </p>
                </div>
            ),
            placement: 'center',
            disableBeacon: true,
        },
        {
            target: '[data-tour="sidebar-nav"]',
            content: (
                <div>
                    <h4 className="font-bold mb-1">Main Navigation</h4>
                    <p className="text-sm">
                        Use this sidebar to navigate between all hospital modules. It's organized by function for easy access.
                    </p>
                </div>
            ),
            placement: 'right',
        },
        {
            target: '[data-tour="sidebar-section-patient-management"]',
            content: (
                <div>
                    <h4 className="font-bold mb-1">Patient Management</h4>
                    <p className="text-sm">
                        Handle everything from new registrations and admissions to patient records here.
                    </p>
                </div>
            ),
            placement: 'right',
        },
        {
            target: '[data-tour="sidebar-section-operations"]',
            content: (
                <div>
                    <h4 className="font-bold mb-1">Operations & Finance</h4>
                    <p className="text-sm">
                        Manage billing, inventory, and generate comprehensive hospital reports.
                    </p>
                </div>
            ),
            placement: 'right',
        },
        {
            target: '[data-tour="critical-alerts"]',
            content: (
                <div>
                    <h4 className="font-bold mb-1">Critical Alerts</h4>
                    <p className="text-sm">
                        Immediately see what needs your attention. Low stock, understaffing, or emergency alerts will appear here.
                    </p>
                </div>
            ),
            placement: 'bottom',
        },
        {
            target: '[data-tour="welcome-actions"]',
            content: (
                <div>
                    <h4 className="font-bold mb-1">Quick Actions</h4>
                    <p className="text-sm">
                        Jump straight into your most frequent tasks like scheduling or managing requests without navigating through menus.
                    </p>
                </div>
            ),
            placement: 'bottom',
        },
        {
            target: '[data-tour="key-metrics"]',
            content: (
                <div>
                    <h4 className="font-bold mb-1">Key Hospital Metrics</h4>
                    <p className="text-sm">
                        Real-time overview of bed occupancy, patient counts, and department status at a glance.
                    </p>
                </div>
            ),
            placement: 'top',
        },
        {
            target: '[data-tour="department-stats"]',
            content: (
                <div>
                    <h4 className="font-bold mb-1">Department Health</h4>
                    <p className="text-sm">
                        Monitor staffing levels and capacity across all active departments.
                    </p>
                </div>
            ),
            placement: 'top',
        },
        {
            target: '[data-tour="analytics-charts"]',
            content: (
                <div>
                    <h4 className="font-bold mb-1">Visual Analytics</h4>
                    <p className="text-sm">
                        Track trends over time. Click on any chart to see detailed reports and deep-dive analytics.
                    </p>
                </div>
            ),
            placement: 'top',
        },
        {
            target: '[data-tour="daily-logs"]',
            content: (
                <div>
                    <h4 className="font-bold mb-1">Daily Logs & Activity</h4>
                    <p className="text-sm">
                        See who's clocked in, recent admissions, and live activity feeds right here.
                    </p>
                </div>
            ),
            placement: 'top',
        }
    ];

    return {
        run,
        steps,
        handleTourFinish
    };
};
