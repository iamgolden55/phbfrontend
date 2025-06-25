import React from 'react';
import { Helmet } from 'react-helmet';
import { useOrganizationAuth } from '../../features/organization/organizationAuthContext';
import { 
  makeStyles,
  shorthands,
  tokens,
  Text,
  Spinner,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
} from '@fluentui/react-components';
import { 
  Home20Regular,
  ChevronRight20Regular,
} from '@fluentui/react-icons';
import { motion } from 'framer-motion';
// Theme provider is now in the layout
import FluentHospitalDashboard from '../../features/organization/dashboards/FluentHospitalDashboard';
import FluentNGODashboard from '../../features/organization/dashboards/FluentNGODashboard';
import FluentPharmaDashboard from '../../features/organization/dashboards/FluentPharmaDashboard';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    gap: tokens.spacingVerticalL,
  },
  
  pageHeader: {
    marginBottom: tokens.spacingVerticalXL,
    ...shorthands.padding(tokens.spacingVerticalL, 0),
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: tokens.spacingVerticalM,
  },
  
  titleSection: {
    flex: 1,
  },
  
  pageTitle: {
    marginBottom: tokens.spacingVerticalS,
  },
  
  subtitle: {
    color: tokens.colorNeutralForeground3,
  },
  
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    textAlign: 'center',
    gap: tokens.spacingVerticalL,
  },
  
  errorIcon: {
    fontSize: '48px',
    color: tokens.colorPaletteRedForeground1,
  },
});

const FluentDashboardPage: React.FC = () => {
  const styles = useStyles();
  const { userData, isLoading, isInitialized } = useOrganizationAuth();

  // Determine organization type
  const getOrganizationType = () => {
    if (!userData) return 'Organization';
    if (userData.role === 'hospital_admin') return 'Hospital';
    if (userData.role === 'ngo_admin') return 'NGO';
    if (userData.role === 'pharmacy_admin') return 'Pharmacy';
    return 'Organization';
  };
  
  const formattedType = getOrganizationType();
  const organizationName = userData?.hospital?.name || userData?.ngo?.name || userData?.pharmacy?.name || 'Organization';

  // Render specific dashboard based on role
  const renderSpecificDashboard = () => {
    if (!userData) return null;

    switch (userData.role) {
      case 'hospital_admin':
        return <FluentHospitalDashboard userData={userData} />;
      case 'ngo_admin':
        return <FluentNGODashboard userData={userData} />;
      case 'pharmacy_admin':
        return <FluentPharmaDashboard userData={userData} />;
      default:
        return (
          <div className={styles.errorContainer}>
            <span className={`material-icons ${styles.errorIcon}`}>error_outline</span>
            <Text size={500} weight="semibold">Unknown Organization Type</Text>
            <Text size={300}>Please contact support for assistance.</Text>
          </div>
        );
    }
  };

  // Loading state
  if (!isInitialized || isLoading) {
    return (
      <div className={styles.root}>
        <div className={styles.loadingContainer}>
          <Spinner size="large" label="Initializing Dashboard..." />
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            Please wait while we load your organization data
          </Text>
        </div>
      </div>
    );
  }

  // Error state - no user data
  if (!userData) {
    return (
      <div className={styles.root}>
        <div className={styles.errorContainer}>
          <span className={`material-icons ${styles.errorIcon}`}>account_circle</span>
          <Text size={500} weight="semibold">Session Expired</Text>
          <Text size={300} style={{ marginBottom: tokens.spacingVerticalL }}>
            Your session has expired. Please log in again.
          </Text>
          <Button 
            appearance="primary" 
            as="a" 
            href="/organization/login"
          >
            Return to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
        <Helmet>
          <title>{formattedType} Dashboard | PHB</title>
        </Helmet>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <Breadcrumb aria-label="Breadcrumb">
              <BreadcrumbItem>
                <BreadcrumbButton icon={<Home20Regular />}>
                  Home
                </BreadcrumbButton>
              </BreadcrumbItem>
              <BreadcrumbDivider>
                <ChevronRight20Regular />
              </BreadcrumbDivider>
              <BreadcrumbItem>
                <BreadcrumbButton current>
                  Dashboard
                </BreadcrumbButton>
              </BreadcrumbItem>
            </Breadcrumb>
            
            <div className={styles.headerContent}>
              <div className={styles.titleSection}>
                <Text 
                  as="h1" 
                  size={900} 
                  weight="bold" 
                  className={styles.pageTitle}
                >
                  {formattedType} Dashboard
                </Text>
                <Text size={400} className={styles.subtitle}>
                  Welcome back, {userData.full_name}
                </Text>
                <Text size={300} style={{ color: tokens.colorBrandForeground1 }}>
                  {organizationName}
                </Text>
              </div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div>
            {renderSpecificDashboard()}
          </div>
        </motion.div>
      </div>
  );
};

export default FluentDashboardPage;