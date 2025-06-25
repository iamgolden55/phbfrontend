import React from 'react';
import { Card, CardHeader, CardPreview, Text, tokens, makeStyles } from '@fluentui/react-components';
import { motion } from 'framer-motion';

const useStyles = makeStyles({
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF', // Pure white background
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow4,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    transition: 'all 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
    color: tokens.colorNeutralForeground1, // Dark text on white background
    
    '&:hover': {
      boxShadow: tokens.shadow16,
      transform: 'translateY(-2px)',
      backgroundColor: '#FFFFFF', // Ensure hover keeps white background
    },
  },
  
  cardHeader: {
    paddingTop: tokens.spacingVerticalL,
    paddingBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
  },
  
  cardContent: {
    padding: tokens.spacingHorizontalL,
    paddingTop: 0,
    paddingBottom: tokens.spacingVerticalL,
  },
  
  elevated: {
    boxShadow: tokens.shadow8,
    '&:hover': {
      boxShadow: tokens.shadow28,
      transform: 'translateY(-4px)',
    },
  },
  
  interactive: {
    cursor: 'pointer',
    '&:active': {
      transform: 'scale(0.98)',
    },
  },
});

export interface FluentCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  interactive?: boolean;
  onClick?: () => void;
  headerAction?: React.ReactNode;
  noPadding?: boolean;
}

export const FluentCard: React.FC<FluentCardProps> = ({
  title,
  children,
  className,
  elevated = false,
  interactive = false,
  onClick,
  headerAction,
  noPadding = false,
}) => {
  const styles = useStyles();
  
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  
  const cardClasses = [
    styles.card,
    elevated && styles.elevated,
    interactive && styles.interactive,
    className,
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Card 
        className={cardClasses}
        onClick={interactive ? onClick : undefined}
        size="large"
      >
        {title && (
          <CardHeader
            className={styles.cardHeader}
            header={
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                width: '100%' 
              }}>
                <Text size={500} weight="semibold">{title}</Text>
                {headerAction}
              </div>
            }
          />
        )}
        <CardPreview className={noPadding ? '' : styles.cardContent}>
          {children}
        </CardPreview>
      </Card>
    </motion.div>
  );
};