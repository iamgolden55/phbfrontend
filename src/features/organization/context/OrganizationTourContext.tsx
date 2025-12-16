import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OrganizationTourContextType {
    tourTrigger: number;
    startTour: () => void;
}

const OrganizationTourContext = createContext<OrganizationTourContextType | undefined>(undefined);

export const OrganizationTourProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tourTrigger, setTourTrigger] = useState(0);

    const startTour = () => {
        setTourTrigger(prev => prev + 1);
    };

    return (
        <OrganizationTourContext.Provider value={{ tourTrigger, startTour }}>
            {children}
        </OrganizationTourContext.Provider>
    );
};

export const useOrganizationTour = () => {
    const context = useContext(OrganizationTourContext);
    if (context === undefined) {
        throw new Error('useOrganizationTour must be used within an OrganizationTourProvider');
    }
    return context;
};
