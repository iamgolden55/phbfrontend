import React, { useState, useEffect } from 'react';
import { 
  fetchMedicalRecords, 
  requestMedicalRecordOTP, 
  verifyMedicalRecordOTP 
} from './medicalRecordService';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Alert,
  AlertTitle, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  DialogContentText,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Grid,
  SxProps,
  Theme
} from '@mui/material';
import {
  LocalHospital as HospitalIcon,
  Medication as MedicationIcon,
  Science as LabIcon,
  Vaccines as VaccineIcon,
  Favorite as HeartIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';

interface MedicalRecord {
  id: string;
  patient_id: string;
  patient_name: string;
  date_of_birth?: string;
  blood_type?: string;
  height?: string;
  weight?: string;
  allergies?: string[];
  conditions?: MedicalCondition[];
  medications?: Medication[];
  lab_results?: LabResult[];
  procedures?: MedicalProcedure[];
  immunizations?: Immunization[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface MedicalCondition {
  id: string;
  name: string;
  diagnosis_date: string;
  status: 'active' | 'resolved' | 'chronic';
  notes?: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date?: string;
  prescribed_by: string;
  status: 'active' | 'completed' | 'discontinued';
  notes?: string;
}

interface LabResult {
  id: string;
  test_name: string;
  test_date: string;
  result: string;
  reference_range: string;
  status: 'normal' | 'abnormal' | 'critical';
  notes?: string;
}

interface MedicalProcedure {
  id: string;
  name: string;
  procedure_date: string;
  performed_by: string;
  notes?: string;
}

interface Immunization {
  id: string;
  vaccine: string;
  date_administered: string;
  administered_by: string;
  next_dose_date?: string;
  notes?: string;
}

interface MedicalRecordsTabProps {
  patientId: string;
  patientName: string;
}

const MedicalRecordsTab: React.FC<MedicalRecordsTabProps> = ({ patientId, patientName }) => {
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [otpDialogOpen, setOtpDialogOpen] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string>('');
  const [otpRequested, setOtpRequested] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    conditions: true,
    medications: true,
    labResults: true,
    procedures: true,
    immunizations: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const loadMedicalRecords = async (accessToken?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the medicalRecordService to fetch records
      const response = await fetchMedicalRecords(patientId, accessToken);
      
      // Check if OTP is required
      if (response && 'requiresOtp' in response && response.requiresOtp) {
        setOtpDialogOpen(true);
        return;
      }
      
      // If we get here, we have the medical records
      setMedicalRecord(response);
    } catch (err: any) {
      console.error('Error fetching medical records:', err);
      setError(err.message || 'Failed to load medical records. Please try again.');
      
      // If we get a 404, the record might not exist yet
      if (err.message?.includes('404')) {
        setError('No medical records found for this patient.');
      } else if (err.message?.includes('403') || err.message?.includes('unauthorized')) {
        setOtpDialogOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtp = async () => {
    try {
      setOtpError('');
      const response = await requestMedicalRecordOTP(patientId);
      
      if (response.status === 'pending' || response.requires_otp) {
        setOtpSent(true);
        setOtpDialogOpen(true);
        setOtpError(response.message || 'Please enter the OTP sent to your registered contact method.');
      } else if (response.status === 'success') {
        // If no OTP is required, reload records
        await loadMedicalRecords();
      }
      
      setOtpRequested(true);
    } catch (err: any) {
      console.error('Error requesting OTP:', err);
      setOtpError(err.message || 'Failed to request OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      if (!otp.trim()) {
        setOtpError('Please enter the OTP');
        return;
      }
      
      setOtpError('');
      const response = await verifyMedicalRecordOTP(patientId, otp);
      
      if (response.status === 'success' && response.access_token) {
        // Store the token and reload records
        localStorage.setItem('medical_record_token', response.access_token);
        setOtpDialogOpen(false);
        await loadMedicalRecords(response.access_token);
      } else {
        throw new Error('Failed to verify OTP');
      }
    } catch (err: any) {
      console.error('Error verifying OTP:', err);
      setOtpError(err.message || 'Invalid OTP. Please try again.');
    }
  };

  useEffect(() => {
    // Check if we have a valid medical record token first
    const medicalRecordToken = localStorage.getItem('medical_record_token');
    const tokenExpiresAt = localStorage.getItem('medical_record_token_expires_at');
    
    if (medicalRecordToken && tokenExpiresAt && new Date(tokenExpiresAt) > new Date()) {
      // Token is still valid, use it
      loadMedicalRecords(medicalRecordToken);
    } else {
      // No valid token, load without it (will trigger OTP flow if needed)
      loadMedicalRecords();
    }
  }, [patientId]);

  const renderConditions = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Medical Conditions"
        avatar={<HospitalIcon color="primary" />}
        action={
          <IconButton onClick={() => toggleSection('conditions')}>
            {expandedSections.conditions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
      />
      <Collapse in={expandedSections.conditions} timeout="auto" unmountOnExit>
        <CardContent>
          {medicalRecord?.conditions?.length ? (
            <List dense>
              {medicalRecord.conditions.map((condition) => (
                <ListItem key={condition.id}>
                  <ListItemIcon>
                    {condition.status === 'active' ? (
                      <WarningIcon color="warning" />
                    ) : condition.status === 'chronic' ? (
                      <InfoIcon color="info" />
                    ) : (
                      <CheckCircleIcon color="success" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={condition.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {new Date(condition.diagnosis_date).toLocaleDateString()}
                        </Typography>
                        {condition.notes && ` • ${condition.notes}`}
                      </>
                    }
                  />
                  <Chip 
                    label={condition.status} 
                    size="small" 
                    color={
                      condition.status === 'active' ? 'warning' : 
                      condition.status === 'chronic' ? 'info' : 'success'
                    }
                    variant="outlined"
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No medical conditions recorded.
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );

  const renderMedications = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Current Medications"
        avatar={<MedicationIcon color="primary" />}
        action={
          <IconButton onClick={() => toggleSection('medications')}>
            {expandedSections.medications ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
      />
      <Collapse in={expandedSections.medications} timeout="auto" unmountOnExit>
        <CardContent>
          {medicalRecord?.medications?.filter(m => m.status === 'active').length ? (
            <List dense>
              {medicalRecord.medications
                .filter(m => m.status === 'active')
                .map((med) => (
                  <ListItem key={med.id}>
                    <ListItemText
                      primary={`${med.name} (${med.dosage} ${med.frequency})`}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            Started: {new Date(med.start_date).toLocaleDateString()}
                          </Typography>
                          {med.notes && ` • ${med.notes}`}
                          {med.prescribed_by && ` • Prescribed by: ${med.prescribed_by}`}
                        </>
                      }
                    />
                  </ListItem>
                ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No current medications.
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );

  const renderLabResults = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Recent Lab Results"
        avatar={<LabIcon color="primary" />}
        action={
          <IconButton onClick={() => toggleSection('labResults')}>
            {expandedSections.labResults ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
      />
      <Collapse in={expandedSections.labResults} timeout="auto" unmountOnExit>
        <CardContent>
          {medicalRecord?.lab_results?.length ? (
            <List dense>
              {medicalRecord.lab_results.slice(0, 3).map((lab) => (
                <ListItem key={lab.id}>
                  <ListItemIcon>
                    {lab.status === 'normal' ? (
                      <CheckCircleIcon color="success" />
                    ) : lab.status === 'abnormal' ? (
                      <WarningIcon color="warning" />
                    ) : (
                      <WarningIcon color="error" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={lab.test_name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {new Date(lab.test_date).toLocaleDateString()}
                        </Typography>
                        {` • Result: ${lab.result} (${lab.reference_range})`}
                        {lab.notes && ` • ${lab.notes}`}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No recent lab results available.
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );

  const renderProcedures = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Medical Procedures"
        avatar={<HospitalIcon color="primary" />}
        action={
          <IconButton onClick={() => toggleSection('procedures')}>
            {expandedSections.procedures ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
      />
      <Collapse in={expandedSections.procedures} timeout="auto" unmountOnExit>
        <CardContent>
          {medicalRecord?.procedures?.length ? (
            <List dense>
              {medicalRecord.procedures.map((procedure) => (
                <ListItem key={procedure.id}>
                  <ListItemIcon>
                    <HospitalIcon color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={procedure.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {new Date(procedure.procedure_date).toLocaleDateString()}
                        </Typography>
                        {` • Performed by: ${procedure.performed_by}`}
                        {procedure.notes && ` • ${procedure.notes}`}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No medical procedures recorded.
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );

  const renderImmunizations = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Immunizations"
        avatar={<VaccineIcon color="primary" />}
        action={
          <IconButton onClick={() => toggleSection('immunizations')}>
            {expandedSections.immunizations ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        }
      />
      <Collapse in={expandedSections.immunizations} timeout="auto" unmountOnExit>
        <CardContent>
          {medicalRecord?.immunizations?.length ? (
            <List dense>
              {medicalRecord.immunizations.map((immunization) => (
                <ListItem key={immunization.id}>
                  <ListItemIcon>
                    <VaccineIcon color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={immunization.vaccine}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          Administered: {new Date(immunization.date_administered).toLocaleDateString()}
                        </Typography>
                        {immunization.next_dose_date && (
                          ` • Next dose: ${new Date(immunization.next_dose_date).toLocaleDateString()}`
                        )}
                        {` • By: ${immunization.administered_by}`}
                        {immunization.notes && ` • ${immunization.notes}`}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No immunization records available.
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );

  const renderPatientInfo = () => (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title={
          <Box display="flex" alignItems="center">
            <HospitalIcon color="primary" sx={{ mr: 1 }} />
            <span>Patient Information</span>
          </Box>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Name</Typography>
            <Typography variant="body1" gutterBottom>{patientName}</Typography>
          </Grid>
          {medicalRecord?.date_of_birth && (
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">Date of Birth</Typography>
              <Typography variant="body1" gutterBottom>
                {new Date(medicalRecord.date_of_birth).toLocaleDateString()}
              </Typography>
            </Grid>
          )}
          {medicalRecord?.blood_type && (
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="text.secondary">Blood Type</Typography>
              <Typography variant="body1" gutterBottom>
                {medicalRecord.blood_type}
              </Typography>
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Allergies</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
              {medicalRecord?.allergies?.length ? (
                medicalRecord.allergies.map((allergy, index) => (
                  <Chip 
                    key={index} 
                    label={allergy} 
                    size="small" 
                    color="warning"
                    variant="outlined"
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No known allergies</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );

  // Render loading state
  if (loading && !otpDialogOpen) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
        <CircularProgress />
        <Box ml={2}>Loading medical records...</Box>
      </Box>
    );
  }

  // Render error state
  if (error && !otpDialogOpen) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        <AlertTitle>Error</AlertTitle>
        {error}
        <Box mt={2}>
          <Button onClick={() => loadMedicalRecords()} color="primary" variant="outlined">
            Retry
          </Button>
        </Box>
      </Alert>
    );
  }

  // OTP Verification Dialog
  const renderOtpDialog = () => (
    <Dialog open={otpDialogOpen} onClose={() => setOtpDialogOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Medical Records Access Verification</DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>
          To access {patientName}'s medical records, we need to verify your identity for security purposes.
        </DialogContentText>
        
        {!otpSent ? (
          <Box textAlign="center" py={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRequestOtp}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </Button>
            {otpError && (
              <Typography color="error" variant="body2" mt={1}>
                {otpError}
              </Typography>
            )}
          </Box>
        ) : (
          <>
            <DialogContentText gutterBottom>
              A verification code has been sent to the patient's registered contact method. 
              Please enter it below to continue.
            </DialogContentText>
            
            <TextField
              autoFocus
              margin="dense"
              id="otp"
              label="Verification Code"
              type="text"
              fullWidth
              variant="outlined"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              error={!!otpError}
              helperText={otpError}
              disabled={loading}
              sx={{ mt: 2 }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleVerifyOtp();
                }
              }}
            />
            
            <Box display="flex" justifyContent="flex-end" mt={1}>
              <Button 
                onClick={handleRequestOtp}
                disabled={loading}
                size="small"
                color="primary"
              >
                Didn't receive code? Resend
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
      {otpSent && (
        <DialogActions>
          <Button 
            onClick={() => {
              setOtpDialogOpen(false);
              setOtp('');
              setOtpError('');
            }} 
            disabled={loading}
            color="primary"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleVerifyOtp} 
            disabled={loading || !otp.trim()}
            variant="contained"
            color="primary"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            Verify
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );

  return (
    <Box>
      {renderPatientInfo()}
      {renderConditions()}
      {renderMedications()}
      {renderLabResults()}
      {renderProcedures()}
      {renderImmunizations()}
      {renderOtpDialog()}
    </Box>
  );
};

export default MedicalRecordsTab;
