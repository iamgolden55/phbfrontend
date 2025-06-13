import React from 'react';
import { Tooltip } from '@mui/material';
import { 
  CheckCircle, 
  Cancel, 
  NoteAdd, 
  LocalHospital, 
  MedicalServices, 
  PersonOff, 
  EventAvailable,
  EventBusy,
  Medication
} from '@mui/icons-material';

interface ActionButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean | string | null;
  loadingText: string;
  buttonText: string;
  bgColor: string;
  hoverColor: string;
  icon: 'check' | 'cancel' | 'notes' | 'hospital' | 'medical' | 'noshow' | 'available' | 'busy' | 'medication';
  tooltipText: string;
  loadingState?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  disabled,
  loading,
  loadingText,
  buttonText,
  bgColor,
  hoverColor,
  icon,
  tooltipText,
  loadingState
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'check':
        return <CheckCircle className="h-5 w-5" />;
      case 'cancel':
        return <Cancel className="h-5 w-5" />;
      case 'notes':
        return <NoteAdd className="h-5 w-5" />;
      case 'hospital':
        return <LocalHospital className="h-5 w-5" />;
      case 'medical':
        return <MedicalServices className="h-5 w-5" />;
      case 'noshow':
        return <PersonOff className="h-5 w-5" />;
      case 'available':
        return <EventAvailable className="h-5 w-5" />;
      case 'busy':
        return <EventBusy className="h-5 w-5" />;
      case 'medication':
        return <Medication className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const isButtonDisabled = disabled || (loadingState ? loading === loadingState : loading !== null);
  const isLoading = loadingState ? loading === loadingState : loading !== null;

  return (
    <Tooltip title={tooltipText}>
      <button 
        onClick={onClick}
        disabled={isButtonDisabled}
        className={`px-4 py-2 bg-${bgColor} hover:bg-${hoverColor} text-white rounded-md transition-colors flex items-center gap-2 ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {getIcon()}
        {isLoading ? loadingText : buttonText}
      </button>
    </Tooltip>
  );
};

export default ActionButton;
