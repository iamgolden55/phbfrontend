import React from 'react';
import { UserData } from '../organizationAuthContext';
import { Text } from '@fluentui/react-components';

interface FluentPharmaDashboardProps {
  userData: UserData;
}

const FluentPharmaDashboard: React.FC<FluentPharmaDashboardProps> = ({ userData }) => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <Text size={500} weight="semibold">Pharmacy Dashboard</Text>
      <Text size={300} style={{ display: 'block', marginTop: '1rem' }}>
        Welcome {userData.full_name}! Pharmacy dashboard implementation coming soon.
      </Text>
    </div>
  );
};

export default FluentPharmaDashboard;