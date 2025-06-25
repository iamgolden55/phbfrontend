import React from 'react';
import { 
  makeStyles,
  shorthands,
  tokens,
  Text,
  Badge,
  Button,
} from '@fluentui/react-components';
import { 
  Alert20Regular,
  Warning20Regular,
  Info20Regular,
  CheckmarkCircle20Regular,
  Dismiss20Regular,
} from '@fluentui/react-icons';
import { motion, AnimatePresence } from 'framer-motion';

const useStyles = makeStyles({
  notificationCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalM,
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    
    '&:hover': {
      transform: 'translateX(4px)',
      boxShadow: tokens.shadow4,
    },
    
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '4px',
      transition: 'width 0.2s ease',
    },
    
    '&:hover::before': {
      width: '6px',
    },
  },
  
  urgentBorder: {
    '&::before': {
      backgroundColor: tokens.colorPaletteRedBorder1,
    },
  },
  
  warningBorder: {
    '&::before': {
      backgroundColor: tokens.colorPaletteYellowBorder1,
    },
  },
  
  infoBorder: {
    '&::before': {
      backgroundColor: tokens.colorPaletteBlueBorder1,
    },
  },
  
  successBorder: {
    '&::before': {
      backgroundColor: tokens.colorPaletteGreenBorder1,
    },
  },
  
  iconContainer: {
    width: '40px',
    height: '40px',
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  
  urgentIcon: {
    backgroundColor: tokens.colorPaletteRedBackground2,
    color: tokens.colorPaletteRedForeground1,
  },
  
  warningIcon: {
    backgroundColor: tokens.colorPaletteYellowBackground2,
    color: tokens.colorPaletteYellowForeground1,
  },
  
  infoIcon: {
    backgroundColor: tokens.colorPaletteBlueBackground2,
    color: tokens.colorPaletteBlueForeground1,
  },
  
  successIcon: {
    backgroundColor: tokens.colorPaletteGreenBackground2,
    color: tokens.colorPaletteGreenForeground1,
  },
  
  content: {
    flex: 1,
    minWidth: 0,
  },
  
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalXS,
  },
  
  dismissButton: {
    marginLeft: 'auto',
  },
  
  description: {
    color: tokens.colorNeutralForeground2,
  },
  
  timestamp: {
    marginTop: tokens.spacingVerticalXS,
    color: tokens.colorNeutralForeground3,
  },
});

export interface Notification {
  id: string;
  level: 'urgent' | 'warning' | 'info' | 'success';
  title: string;
  description?: string;
  timestamp?: string;
}

interface FluentNotificationCardProps {
  notification: Notification;
  onDismiss?: (id: string) => void;
}

export const FluentNotificationCard: React.FC<FluentNotificationCardProps> = ({
  notification,
  onDismiss,
}) => {
  const styles = useStyles();
  
  const getLevelIcon = () => {
    switch (notification.level) {
      case 'urgent':
        return <Alert20Regular />;
      case 'warning':
        return <Warning20Regular />;
      case 'info':
        return <Info20Regular />;
      case 'success':
        return <CheckmarkCircle20Regular />;
      default:
        return <Info20Regular />;
    }
  };
  
  const getLevelStyles = () => {
    switch (notification.level) {
      case 'urgent':
        return {
          border: styles.urgentBorder,
          icon: styles.urgentIcon,
          badge: 'danger' as const,
        };
      case 'warning':
        return {
          border: styles.warningBorder,
          icon: styles.warningIcon,
          badge: 'warning' as const,
        };
      case 'info':
        return {
          border: styles.infoBorder,
          icon: styles.infoIcon,
          badge: 'informative' as const,
        };
      case 'success':
        return {
          border: styles.successBorder,
          icon: styles.successIcon,
          badge: 'success' as const,
        };
      default:
        return {
          border: styles.infoBorder,
          icon: styles.infoIcon,
          badge: 'informative' as const,
        };
    }
  };
  
  const levelStyles = getLevelStyles();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`${styles.notificationCard} ${levelStyles.border}`}>
        <div className={`${styles.iconContainer} ${levelStyles.icon}`}>
          {getLevelIcon()}
        </div>
        
        <div className={styles.content}>
          <div className={styles.header}>
            <Text weight="semibold" size={300}>
              {notification.title}
            </Text>
            <Badge 
              appearance="tint" 
              color={levelStyles.badge}
              size="small"
            >
              {notification.level}
            </Badge>
          </div>
          
          {notification.description && (
            <Text size={200} className={styles.description}>
              {notification.description}
            </Text>
          )}
          
          {notification.timestamp && (
            <Text size={100} className={styles.timestamp}>
              {notification.timestamp}
            </Text>
          )}
        </div>
        
        {onDismiss && (
          <Button
            appearance="subtle"
            icon={<Dismiss20Regular />}
            size="small"
            onClick={() => onDismiss(notification.id)}
            className={styles.dismissButton}
          />
        )}
      </div>
    </motion.div>
  );
};

// Notification List Component
interface FluentNotificationListProps {
  notifications: Notification[];
  onDismiss?: (id: string) => void;
  maxItems?: number;
}

export const FluentNotificationList: React.FC<FluentNotificationListProps> = ({
  notifications,
  onDismiss,
  maxItems = 5,
}) => {
  const displayedNotifications = maxItems ? notifications.slice(0, maxItems) : notifications;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
      <AnimatePresence mode="popLayout">
        {displayedNotifications.map(notification => (
          <FluentNotificationCard
            key={notification.id}
            notification={notification}
            onDismiss={onDismiss}
          />
        ))}
      </AnimatePresence>
      
      {notifications.length > maxItems && (
        <Text size={200} style={{ 
          textAlign: 'center', 
          color: tokens.colorNeutralForeground3,
          marginTop: tokens.spacingVerticalS 
        }}>
          +{notifications.length - maxItems} more notifications
        </Text>
      )}
    </div>
  );
};