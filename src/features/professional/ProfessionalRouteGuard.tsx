import React from 'react';
import { ProfessionalRole } from './professionalAuthContext';

interface ProfessionalRouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: ProfessionalRole[];
}

// Modified route guard that doesn't check for authentication
const ProfessionalRouteGuard: React.FC<ProfessionalRouteGuardProps> = ({
  children
}) => {
  // Always render the protected route
  return <>{children}</>;
};

export default ProfessionalRouteGuard;
