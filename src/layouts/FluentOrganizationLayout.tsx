import React, { useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { useOrganizationAuth } from '../features/organization/organizationAuthContext';
import { 
  makeStyles,
  shorthands,
  tokens,
  Button,
  Avatar,
  Text,
  Tooltip,
  Badge,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  DrawerProps,
} from '@fluentui/react-components';
import { 
  Dismiss24Regular,
  Navigation24Regular,
  Home24Regular,
  People24Regular,
  CalendarLtr24Regular,
  Bed24Regular,
  Badge24Regular,
  Stethoscope24Regular,
  Box24Regular,
  ChartMultiple24Regular,
  DocumentText24Regular,
  Heart24Regular,
  LocalLanguage24Regular,
  ShieldCheckmark24Regular,
  Settings24Regular,
  SignOut24Regular,
  DarkTheme24Regular,
  WeatherSunny24Regular,
  PersonAdd24Regular,
  Alert24Regular,
  ClipboardTextLtr24Regular,
} from '@fluentui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';
import PHBLogo from '../components/PHBLogo';
import { FluentThemeProvider, useFluentTheme } from '../components/fluent/FluentThemeProvider';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  
  navRail: {
    width: '280px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0,
    zIndex: 1000,
    transition: 'width 0.3s ease',
    boxShadow: tokens.shadow8,
  },
  
  navRailCollapsed: {
    width: '68px',
  },
  
  header: {
    height: '64px',
    backgroundColor: tokens.colorBrandBackground,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding(tokens.spacingHorizontalM),
    color: tokens.colorNeutralForegroundOnBrand,
    boxShadow: tokens.shadow4,
  },
  
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    textDecoration: 'none',
    color: 'inherit',
  },
  
  navContent: {
    flex: 1,
    overflowY: 'auto',
    ...shorthands.padding(tokens.spacingVerticalM),
  },
  
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    marginBottom: tokens.spacingVerticalXS,
    textDecoration: 'none',
    color: tokens.colorNeutralForeground1,
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
    
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      transform: 'translateX(2px)',
    },
    
    '&.active': {
      backgroundColor: tokens.colorBrandBackground,
      color: tokens.colorNeutralForegroundOnBrand,
      
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        width: '4px',
        height: '24px',
        backgroundColor: tokens.colorNeutralForegroundOnBrand,
        borderRadius: '0 2px 2px 0',
      },
    },
  },
  
  navIcon: {
    fontSize: '20px',
    minWidth: '20px',
  },
  
  navLabel: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    transition: 'opacity 0.2s ease',
  },
  
  navFooter: {
    ...shorthands.padding(tokens.spacingVerticalM),
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  
  content: {
    flex: 1,
    marginLeft: '280px',
    transition: 'margin-left 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  
  contentCollapsed: {
    marginLeft: '68px',
  },
  
  appBar: {
    height: '64px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding(0, tokens.spacingHorizontalL),
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(20px)',
    backgroundColor: tokens.colorNeutralBackground2 + 'ee',
  },
  
  main: {
    flex: 1,
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL),
  },
  
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },
  
  badge: {
    marginLeft: 'auto',
  },
  
  navRailMobile: {
    '@media (max-width: 768px)': {
      transform: 'translateX(-100%)',
    },
  },
  
  navRailMobileOpen: {
    '@media (max-width: 768px)': {
      transform: 'translateX(0)',
    },
  },
  
  contentMobile: {
    '@media (max-width: 768px)': {
      marginLeft: '0 !important',
    },
  },
});

const FluentOrganizationLayoutInner: React.FC = () => {
  const styles = useStyles();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { userData, logout } = useOrganizationAuth();
  const { isDarkMode, toggleTheme } = useFluentTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/organization/login');
  };

  // Get menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      { label: 'Dashboard', path: '/organization/dashboard', icon: <Home24Regular /> },
    ];

    if (userData) {
      if (userData.role === 'hospital_admin') {
        return [
          ...baseItems,
          { label: 'Patient Admissions', path: '/organization/admissions', icon: <PersonAdd24Regular /> },
          { label: 'Surgery Schedule', path: '/organization/surgery-schedule', icon: <CalendarLtr24Regular /> },
          { label: 'Department Management', path: '/organization/wards', icon: <Bed24Regular /> },
          { label: 'Staff Roster', path: '/organization/staffing', icon: <Badge24Regular /> },
          { label: 'Clinical Guidelines', path: '/organization/clinical-guidelines', icon: <ClipboardTextLtr24Regular /> },
          { label: 'Inventory Check', path: '/organization/inventory', icon: <Box24Regular /> },
          { label: 'Analytics', path: '/organization/analytics', icon: <ChartMultiple24Regular /> },
          { label: 'Emergency', path: '/organization/emergency', icon: <Alert24Regular /> },
        ];
      } else if (userData.role === 'ngo_admin') {
        return [
          ...baseItems,
          { label: 'Programs', path: '/organization/programs', icon: <DocumentText24Regular /> },
          { label: 'Volunteers', path: '/organization/volunteers', icon: <People24Regular /> },
          { label: 'Donations', path: '/organization/donations', icon: <Heart24Regular /> },
          { label: 'Reports', path: '/organization/reports', icon: <ChartMultiple24Regular /> },
        ];
      } else if (userData.role === 'pharmacy_admin') {
        return [
          ...baseItems,
          { label: 'Inventory', path: '/organization/inventory', icon: <Box24Regular /> },
          { label: 'Research', path: '/organization/research', icon: <Stethoscope24Regular /> },
          { label: 'Distribution', path: '/organization/distribution', icon: <LocalLanguage24Regular /> },
          { label: 'Compliance', path: '/organization/compliance', icon: <ShieldCheckmark24Regular /> },
        ];
      }
    }
    
    return baseItems;
  };

  const menuItems = getMenuItems();
  
  // Organization type formatting
  const getOrganizationType = () => {
    if (!userData) return 'Organization';
    if (userData.role === 'hospital_admin') return 'Hospital';
    if (userData.role === 'ngo_admin') return 'NGO';
    if (userData.role === 'pharmacy_admin') return 'Pharmacy';
    return 'Organization';
  };
  
  const formattedType = getOrganizationType();
  const organizationName = userData?.hospital?.name || userData?.ngo?.name || userData?.pharmacy?.name || 'Organization';

  return (
    <div className={styles.root}>
      {/* Navigation Rail */}
      <nav className={`${styles.navRail} ${isCollapsed ? styles.navRailCollapsed : ''} ${styles.navRailMobile} ${isMobileOpen ? styles.navRailMobileOpen : ''}`}>
        <div className={styles.header}>
          <Link to="/organization/dashboard" className={styles.logo}>
            <PHBLogo className="h-8 w-8" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Text size={500} weight="semibold">PHB {formattedType}</Text>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
          <Button
            appearance="subtle"
            icon={isCollapsed ? <Navigation24Regular /> : <Dismiss24Regular />}
            onClick={() => setIsCollapsed(!isCollapsed)}
            style={{ color: 'inherit' }}
          />
        </div>
        
        <div className={styles.navContent}>
          {menuItems.map((item) => (
            <Tooltip
              key={item.path}
              content={item.label}
              positioning="after"
              withArrow
              relationship="label"
              showDelay={500}
              hideDelay={0}
            >
              <Link
                to={item.path}
                className={`${styles.navItem} ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      className={styles.navLabel}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </Tooltip>
          ))}
        </div>
        
        <div className={styles.navFooter}>
          <Tooltip content="Settings" positioning="after" withArrow>
            <Button
              appearance="subtle"
              icon={<Settings24Regular />}
              style={{ width: '100%', justifyContent: isCollapsed ? 'center' : 'flex-start' }}
            >
              {!isCollapsed && 'Settings'}
            </Button>
          </Tooltip>
        </div>
      </nav>
      
      {/* Main Content */}
      <div className={`${styles.content} ${isCollapsed ? styles.contentCollapsed : ''} ${styles.contentMobile}`}>
        {/* App Bar */}
        <header className={styles.appBar}>
          <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM }}>
            <Button
              appearance="subtle"
              icon={<Navigation24Regular />}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              style={{ display: 'none' }}
              className="mobile-menu-button"
            />
            <div>
              <Text size={400} weight="semibold">{organizationName}</Text>
              <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </Text>
            </div>
          </div>
          
          <div className={styles.userSection}>
            <Tooltip content={isDarkMode ? 'Light mode' : 'Dark mode'} withArrow>
              <Button
                appearance="subtle"
                icon={isDarkMode ? <WeatherSunny24Regular /> : <DarkTheme24Regular />}
                onClick={toggleTheme}
              />
            </Tooltip>
            
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button
                  appearance="subtle"
                  icon={
                    <Avatar
                      name={userData?.full_name || 'User'}
                      color="brand"
                      size={32}
                    />
                  }
                >
                  <div style={{ textAlign: 'left' }}>
                    <Text size={300} weight="semibold">{userData?.full_name || 'User'}</Text>
                    <br />
                    <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                      {formattedType} Admin
                    </Text>
                  </div>
                </Button>
              </MenuTrigger>
              
              <MenuPopover>
                <MenuList>
                  <MenuItem icon={<Settings24Regular />}>Profile Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem 
                    icon={<SignOut24Regular />} 
                    onClick={handleLogout}
                  >
                    Sign Out
                  </MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          </div>
        </header>
        
        {/* Page Content */}
        <main className={styles.main}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 999,
            display: 'none',
          }}
          onClick={() => setIsMobileOpen(false)}
          className="mobile-overlay"
        />
      )}
    </div>
  );
};

const FluentOrganizationLayout: React.FC = () => {
  return (
    <FluentThemeProvider>
      <FluentOrganizationLayoutInner />
    </FluentThemeProvider>
  );
};

export default FluentOrganizationLayout;