import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Alert, CircularProgress, Paper, Grid, Chip } from '@mui/material';
import { Shield, Lock, FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import MedicalOTPAccess from '../../components/MedicalOTPAccess';
import { createApiUrl } from '../../utils/config';

interface MedicalAccessTabProps {
  patientId: string;
  patientName: string;
  appointmentId: string;
}

interface MedicalAccessLog {
  id: string;
  accessed_at: string;
  access_type: string;
  accessed_by: string;
  access_reason: string;
  status: 'granted' | 'denied' | 'expired';
}

interface PatientConsent {
  id: string;
  consent_type: string;
  granted_at: string;
  expires_at?: string;
  status: 'active' | 'expired' | 'revoked';
  granted_by: string;
}

const MedicalAccessTab: React.FC<MedicalAccessTabProps> = ({ 
  patientId, 
  patientName, 
  appointmentId 
}) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessLogs, setAccessLogs] = useState<MedicalAccessLog[]>([]);
  const [patientConsents, setPatientConsents] = useState<PatientConsent[]>([]);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [accessReason, setAccessReason] = useState('');

  useEffect(() => {
    checkMedicalAccess();
    fetchAccessLogs();
    fetchPatientConsents();
  }, [patientId, appointmentId]);

  const checkMedicalAccess = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('phb_auth_token') || 
                   localStorage.getItem('access_token') || 
                   localStorage.getItem('authToken');

      // Check if we have valid medical access token
      const medAccessToken = localStorage.getItem('med_access_token');
      const medAccessExpiry = localStorage.getItem('med_access_expiry');
      
      if (medAccessToken && medAccessExpiry) {
        const expiryTime = parseInt(medAccessExpiry);
        if (Date.now() < expiryTime) {
          setHasAccess(true);
          return;
        } else {
          // Clean up expired tokens
          localStorage.removeItem('med_access_token');
          localStorage.removeItem('med_access_expiry');
        }
      }

      // Check if doctor has access to patient records for this appointment
      const response = await fetch(
        createApiUrl(`api/professional/patient/${patientId}/medical-access/${appointmentId}/`), 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHasAccess(data.has_access || false);
      } else {
        setHasAccess(false);
      }
    } catch (err) {
      console.error('Error checking medical access:', err);
      setError('Failed to check medical access permissions');
      setHasAccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAccessLogs = async () => {
    try {
      const token = localStorage.getItem('phb_auth_token') || 
                   localStorage.getItem('access_token') || 
                   localStorage.getItem('authToken');

      const response = await fetch(
        createApiUrl(`api/professional/patient/${patientId}/access-logs/`), 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAccessLogs(data.access_logs || []);
      }
    } catch (err) {
      console.error('Error fetching access logs:', err);
    }
  };

  const fetchPatientConsents = async () => {
    try {
      const token = localStorage.getItem('phb_auth_token') || 
                   localStorage.getItem('access_token') || 
                   localStorage.getItem('authToken');

      const response = await fetch(
        createApiUrl(`api/professional/patient/${patientId}/consents/`), 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPatientConsents(data.consents || []);
      }
    } catch (err) {
      console.error('Error fetching patient consents:', err);
    }
  };

  const requestMedicalAccess = async () => {
    if (!accessReason.trim()) {
      setError('Please provide a reason for accessing medical records');
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem('phb_auth_token') || 
                   localStorage.getItem('access_token') || 
                   localStorage.getItem('authToken');

      const response = await fetch(
        createApiUrl(`api/professional/patient/${patientId}/request-access/`), 
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            appointment_id: appointmentId,
            access_reason: accessReason,
            access_type: 'medical_records'
          })
        }
      );

      if (response.ok) {
        setShowOTPModal(true);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to request medical access');
      }
    } catch (err) {
      console.error('Error requesting medical access:', err);
      setError('Failed to request medical access');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccessGranted = () => {
    setShowOTPModal(false);
    setHasAccess(true);
    fetchAccessLogs(); // Refresh logs
    setAccessReason('');
  };

  const revokeAccess = () => {
    localStorage.removeItem('med_access_token');
    localStorage.removeItem('med_access_expiry');
    setHasAccess(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'granted': return 'success';
      case 'expired': return 'warning';
      case 'denied':
      case 'revoked': return 'error';
      default: return 'default';
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Checking medical access permissions...
        </Typography>
      </Box>
    );
  }

  if (showOTPModal) {
    return <MedicalOTPAccess onAccessGranted={handleAccessGranted} />;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
        <Shield className="mr-2" size={24} />
        Medical Records Access for {patientName}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Access Status */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current Access Status
        </Typography>
        
        {hasAccess ? (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CheckCircle className="text-green-600 mr-2" size={20} />
            <Typography variant="body1" color="success.main">
              You have active access to this patient's medical records
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Lock className="text-red-600 mr-2" size={20} />
            <Typography variant="body1" color="error.main">
              Medical records access required
            </Typography>
          </Box>
        )}

        {!hasAccess && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Please provide a reason for accessing this patient's medical records:
            </Typography>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 h-20 mb-3"
              placeholder="Enter reason for medical records access (required for audit purposes)"
              value={accessReason}
              onChange={(e) => setAccessReason(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={requestMedicalAccess}
              disabled={!accessReason.trim() || isLoading}
              startIcon={<Shield />}
            >
              Request Medical Access
            </Button>
          </Box>
        )}

        {hasAccess && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={revokeAccess}
              startIcon={<Lock />}
            >
              Revoke Access
            </Button>
          </Box>
        )}
      </Paper>

      {/* Patient Consents */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Patient Consent Status
        </Typography>
        
        {patientConsents.length > 0 ? (
          <Grid container spacing={2}>
            {patientConsents.map((consent) => (
              <Grid item xs={12} md={6} key={consent.id}>
                <Box sx={{ p: 2, border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2">
                      {consent.consent_type.replace('_', ' ').toUpperCase()}
                    </Typography>
                    <Chip 
                      label={consent.status} 
                      color={getStatusColor(consent.status)} 
                      size="small" 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Granted: {formatDateTime(consent.granted_at)}
                  </Typography>
                  {consent.expires_at && (
                    <Typography variant="body2" color="text.secondary">
                      Expires: {formatDateTime(consent.expires_at)}
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    By: {consent.granted_by}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info" icon={<AlertTriangle />}>
            No consent records found for this patient
          </Alert>
        )}
      </Paper>

      {/* Access Logs */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Medical Records Access History
        </Typography>
        
        {accessLogs.length > 0 ? (
          <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
            {accessLogs.map((log) => (
              <Box 
                key={log.id} 
                sx={{ 
                  p: 2, 
                  mb: 1, 
                  border: 1, 
                  borderColor: 'grey.200', 
                  borderRadius: 1,
                  bgcolor: 'grey.50'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <FileText className="mr-2" size={16} />
                    {log.access_type.replace('_', ' ').toUpperCase()}
                  </Typography>
                  <Chip 
                    label={log.status} 
                    color={getStatusColor(log.status)} 
                    size="small" 
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  <Clock className="inline mr-1" size={14} />
                  {formatDateTime(log.accessed_at)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Accessed by: {log.accessed_by}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Reason: {log.access_reason}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Alert severity="info">
            No access history found for this patient
          </Alert>
        )}
      </Paper>
    </Box>
  );
};

export default MedicalAccessTab;