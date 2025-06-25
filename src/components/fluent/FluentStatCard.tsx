import React from 'react';
import { 
  Card, 
  CardPreview, 
  Text, 
  tokens, 
  makeStyles,
  Badge,
  mergeClasses
} from '@fluentui/react-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight20Regular 
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  statCard: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF', // Pure white background
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusLarge,
    color: tokens.colorNeutralForeground1, // Dark text on white background
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: tokens.shadow4,
    
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: tokens.shadow16,
    },
  },
  
  // Removed accent colors - using only blue and white theme
  
  cardContent: {
    padding: tokens.spacingVerticalXL,
    paddingBottom: tokens.spacingVerticalL,
    position: 'relative',
    zIndex: 1,
  },
  
  iconContainer: {
    width: '48px',
    height: '48px',
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorBrandBackground, // Blue background for icon
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: tokens.spacingVerticalM,
  },
  
  valueContainer: {
    marginBottom: tokens.spacingVerticalS,
  },
  
  value: {
    fontSize: '2.5rem',
    fontWeight: '700',
    lineHeight: 1.2,
    color: tokens.colorBrandForeground1, // Blue text for value
  },
  
  label: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: '500',
    color: tokens.colorNeutralForeground1,
    marginBottom: tokens.spacingVerticalXS,
  },
  
  trendContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
    marginTop: tokens.spacingVerticalM,
  },
  
  trendBadge: {
    backdropFilter: 'blur(10px)',
  },
  
  footer: {
    paddingTop: tokens.spacingVerticalS,
    paddingBottom: tokens.spacingVerticalS,
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
    opacity: 0.8,
    transition: 'opacity 0.2s ease',
    
    '&:hover': {
      opacity: 1,
    },
  },
});

export interface FluentStatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  trendLabel?: string;
  footer?: string;
  onClick?: () => void;
  loading?: boolean;
}

export const FluentStatCard: React.FC<FluentStatCardProps> = ({
  label,
  value,
  icon,
  trend,
  trendValue,
  trendLabel,
  footer,
  onClick,
  loading = false,
}) => {
  const styles = useStyles();
  
  const cardClass = styles.statCard;
  
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <span style={{ fontSize: '16px' }}>↑</span>;
      case 'down':
        return <span style={{ fontSize: '16px' }}>↓</span>;
      default:
        return null;
    }
  };
  
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'success';
      case 'down':
        return 'danger';
      default:
        return 'informative';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={cardClass}
        onClick={onClick}
        appearance="filled"
      >
        <CardPreview className={styles.cardContent}>
          <div className={styles.iconContainer}>
            {icon}
          </div>
          
          <div className={styles.valueContainer}>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div style={{ 
                    width: '100px', 
                    height: '40px', 
                    background: tokens.colorNeutralBackground1 + '30',
                    borderRadius: tokens.borderRadiusSmall,
                    animation: 'pulse 2s infinite',
                  }} />
                </motion.div>
              ) : (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Text className={styles.value}>
                    {typeof value === 'number' ? value.toLocaleString() : value}
                  </Text>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <Text className={styles.label}>{label}</Text>
          
          {trend && trendValue && (
            <div className={styles.trendContainer}>
              <Badge 
                appearance="tint" 
                color={getTrendColor() as any}
                icon={getTrendIcon()}
                className={styles.trendBadge}
              >
                {trendValue}
              </Badge>
              {trendLabel && (
                <Text size={200} style={{ opacity: 0.8 }}>
                  {trendLabel}
                </Text>
              )}
            </div>
          )}
          
          {footer && (
            <div className={styles.footer}>
              <Text size={200}>{footer}</Text>
              <ArrowRight20Regular />
            </div>
          )}
        </CardPreview>
      </Card>
    </motion.div>
  );
};