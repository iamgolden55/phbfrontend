import React from 'react';
import { UserData } from '../organizationAuthContext';
import { Text } from '@fluentui/react-components';

interface FluentNGODashboardProps {
  userData: UserData;
}

const FluentNGODashboard: React.FC<FluentNGODashboardProps> = ({ userData }) => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Text size={500} weight="semibold">NGO Dashboard</Text>
      <Text size={300} style={{ display: 'block', marginTop: '1rem' }}>
        Welcome {userData.full_name}! NGO dashboard implementation coming soon.
      </Text>
    </div>
  );
};

export default FluentNGODashboard;