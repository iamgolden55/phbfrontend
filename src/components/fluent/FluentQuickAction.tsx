import React from 'react';
import { 
  makeStyles,
  shorthands,
  tokens,
  Text,
  Badge,
} from '@fluentui/react-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const useStyles = makeStyles({
  quickAction: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.padding(tokens.spacingVerticalM, tokens.spacingHorizontalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground2,
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    textDecoration: 'none',
    color: tokens.colorNeutralForeground1,
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
    
    '&:hover': {
      backgroundColor: tokens.colorNeutralBackground2Hover,
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadow8,
      
      '& .arrow': {
        transform: 'translateX(4px)',
      },
    },
    
    '&:active': {
      transform: 'scale(0.98)',
    },
    
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: '2px',
      backgroundColor: tokens.colorBrandBackground,
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: 'transform 0.3s ease',
    },
    
    '&:hover::after': {
      transform: 'scaleX(1)',
    },
  },
  
  highlighted: {
    backgroundColor: tokens.colorBrandBackground2,
    ...shorthands.border('1px', 'solid', tokens.colorBrandStroke1),
    
    '&:hover': {
      backgroundColor: tokens.colorBrandBackground2Hover,
    },
  },
  
  iconContainer: {
    width: '40px',
    height: '40px',
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
    backgroundColor: tokens.colorNeutralBackground1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: tokens.spacingHorizontalM,
    fontSize: '20px',
    color: tokens.colorBrandForeground1,
  },
  
  content: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  
  labelContainer: {
    flex: 1,
  },
  
  label: {
    display: 'block',
    marginBottom: tokens.spacingVerticalXXS,
  },
  
  description: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
  },
  
  badge: {
    marginLeft: tokens.spacingHorizontalS,
  },
  
  arrow: {
    transition: 'transform 0.2s ease',
    color: tokens.colorNeutralForeground3,
  },
});

export interface FluentQuickActionProps {
  icon: React.ReactNode;
  label: string;
  description?: string;
  path: string;
  badge?: string | number;
  highlighted?: boolean;
  onClick?: () => void;
}

export const FluentQuickAction: React.FC<FluentQuickActionProps> = ({
  icon,
  label,
  description,
  path,
  badge,
  highlighted = false,
  onClick,
}) => {
  const styles = useStyles();
  
  const content = (
    <>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          {icon}
        </div>
        <div className={styles.labelContainer}>
          <Text weight="semibold" size={300} className={styles.label}>
            {label}
          </Text>
          {description && (
            <Text size={200} className={styles.description}>
              {description}
            </Text>
          )}
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalS }}>
        {badge !== undefined && (
          <Badge 
            appearance="filled" 
            color={highlighted ? 'warning' : 'brand'}
            size="small"
            className={styles.badge}
          >
            {badge}
          </Badge>
        )}
        <span className={`material-icons ${styles.arrow} arrow`}>
          chevron_right
        </span>
      </div>
    </>
  );
  
  const className = `${styles.quickAction} ${highlighted ? styles.highlighted : ''}`;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link 
        to={path} 
        className={className}
        onClick={onClick}
      >
        {content}
      </Link>
    </motion.div>
  );
};

// Quick Actions Grid Component
interface FluentQuickActionsGridProps {
  actions: FluentQuickActionProps[];
  columns?: number;
}

export const FluentQuickActionsGrid: React.FC<FluentQuickActionsGridProps> = ({
  actions,
  columns = 2,
}) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: tokens.spacingVerticalM,
    }}>
      {actions.map((action, index) => (
        <motion.div
          key={action.path}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
        >
          <FluentQuickAction {...action} />
        </motion.div>
      ))}
    </div>
  );
};