/**
 * PharmacyPrescriptionList Component
 *
 * Displays patient prescriptions with comprehensive drug database information.
 * Features:
 * - Complete prescription details
 * - Drug database info (NAFDAC schedules, risk levels, monitoring)
 * - Safety warnings and interactions
 * - Patient verification requirements
 * - Dispensing tracking
 */

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import {
  ExpandMore,
  Warning,
  CheckCircle,
  Info,
  LocalPharmacy,
  CalendarToday,
  Person,
  Security,
  Medication,
  HealthAndSafety,
  Shield,
  LocalShipping
} from '@mui/icons-material';
import type {
  Prescription,
  PatientInfo,
  PrescriptionSummary,
  VerificationRequired,
  DrugInfo
} from '../../services/pharmacyPrescriptionService';
import { getRiskLevelColor, getVerificationText, dispensePrescription } from '../../services/pharmacyPrescriptionService';

interface PharmacyPrescriptionListProps {
  patient: PatientInfo;
  prescriptions: Prescription[];
  summary: PrescriptionSummary;
  verificationRequired: VerificationRequired;
  accessedAt: string;
  accessedBy: {
    pharmacist: string;
    license_number: string;
    pharmacy: string;
  };
}

const PharmacyPrescriptionList: React.FC<PharmacyPrescriptionListProps> = ({
  patient,
  prescriptions,
  summary,
  verificationRequired,
  accessedAt,
  accessedBy
}) => {
  const [expandedPrescription, setExpandedPrescription] = useState<string | false>(false);
  const [dispenseModalOpen, setDispenseModalOpen] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [dispensing, setDispensing] = useState(false);
  const [dispenseError, setDispenseError] = useState<string | null>(null);
  const [dispenseSuccess, setDispenseSuccess] = useState(false);

  const handleAccordionChange = (prescriptionId: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedPrescription(isExpanded ? prescriptionId : false);
  };

  // Handle dispense button click
  const handleDispenseClick = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setDispenseModalOpen(true);
    setDispenseError(null);
    setDispenseSuccess(false);
  };

  // Handle dispense confirmation
  const handleConfirmDispense = async () => {
    if (!selectedPrescription) return;

    setDispensing(true);
    setDispenseError(null);

    try {
      // Get pharmacy code - try to extract from accessedBy.pharmacy
      // Format: "Odnias Pharmacy" or "PHB-PH-001234"
      let pharmacyCode = 'PHB-PHARMACY-DEFAULT';

      // Try to extract pharmacy code if it's in the format
      if (accessedBy.pharmacy) {
        // Check if pharmacy string contains a code pattern (PHB-PH-XXXXXX)
        const codeMatch = accessedBy.pharmacy.match(/PHB-PH-\d+/);
        if (codeMatch) {
          pharmacyCode = codeMatch[0];
        } else {
          // Use pharmacy name as code (backend will try to find by name)
          pharmacyCode = accessedBy.pharmacy.replace(/\s+/g, '-').toUpperCase();
        }
      }

      await dispensePrescription(
        selectedPrescription.id,
        selectedPrescription.nonce,
        pharmacyCode,
        accessedBy.pharmacist
      );

      setDispenseSuccess(true);

      // Close modal after 2 seconds
      setTimeout(() => {
        setDispenseModalOpen(false);
        setSelectedPrescription(null);
        setDispenseSuccess(false);
        // Optionally refresh the page or update the prescription status
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      console.error('Dispense error:', error);
      setDispenseError(error.message || 'Failed to dispense prescription');
    } finally {
      setDispensing(false);
    }
  };

  // Handle modal close
  const handleCloseDispenseModal = () => {
    if (!dispensing) {
      setDispenseModalOpen(false);
      setSelectedPrescription(null);
      setDispenseError(null);
      setDispenseSuccess(false);
    }
  };

  // Get risk level badge color
  const getRiskChipColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'moderate': return 'info';
      default: return 'success';
    }
  };

  return (
    <Box>
      {/* Patient Information Card */}
      <Card elevation={2} sx={{ mb: 3, borderLeft: 4, borderColor: 'primary.main' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
            <Person color="primary" />
            <Typography variant="h6">Patient Information</Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">HPN</Typography>
              <Typography variant="h6" fontWeight="bold">{patient.hpn}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="text.secondary">Name</Typography>
              <Typography variant="body1" fontWeight="500">{patient.name}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Blood Type</Typography>
              <Typography>{patient.blood_type || 'Not specified'}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Allergies</Typography>
              <Typography color={patient.allergies ? 'error.main' : 'text.secondary'} fontWeight={patient.allergies ? 600 : 400}>
                {patient.allergies || 'None recorded'}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Chronic Conditions</Typography>
              <Typography>{patient.chronic_conditions || 'None recorded'}</Typography>
            </Grid>
          </Grid>

          {patient.is_high_risk && (
            <Alert severity="warning" icon={<Warning />} sx={{ mt: 2 }}>
              <strong>High-Risk Patient</strong> - Extra care required
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
            <HealthAndSafety color="primary" />
            <Typography variant="h6">Prescription Summary</Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, bgcolor: 'primary.50', textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main">{summary.total_prescriptions}</Typography>
                <Typography variant="body2" color="text.secondary">Total Prescriptions</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, bgcolor: summary.controlled_substances > 0 ? 'warning.50' : 'success.50', textAlign: 'center' }}>
                <Typography variant="h4" color={summary.controlled_substances > 0 ? 'warning.main' : 'success.main'}>
                  {summary.controlled_substances}
                </Typography>
                <Typography variant="body2" color="text.secondary">Controlled Substances</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2, bgcolor: 'info.50', textAlign: 'center' }}>
                <Chip
                  label={getVerificationText(verificationRequired)}
                  color={verificationRequired.level_2_government_id ? 'warning' : 'info'}
                  size="small"
                  sx={{ mt: 1 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Verification Level
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {summary.requires_enhanced_verification && (
            <Alert severity="warning" icon={<Shield />} sx={{ mt: 2 }}>
              <strong>Enhanced Verification Required:</strong> This patient has controlled substance prescriptions.
              Verify patient identity with government-issued photo ID before dispensing.
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Prescriptions List */}
      <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Medication color="primary" />
        Prescriptions ({prescriptions.length})
      </Typography>

      {prescriptions.length === 0 ? (
        <Alert severity="info">
          No prescriptions found for this patient with the selected status filter.
        </Alert>
      ) : (
        prescriptions.map((prescription) => (
          <Accordion
            key={prescription.id}
            expanded={expandedPrescription === prescription.id}
            onChange={handleAccordionChange(prescription.id)}
            sx={{ mb: 2 }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {prescription.medication_name} {prescription.strength}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {prescription.form} • {prescription.route} • {prescription.frequency}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  {/* Controlled substance badge - checks drug_info OR pharmacy_instructions */}
                  {(prescription.drug_info?.is_controlled ||
                    prescription.pharmacy_instructions?.toUpperCase().includes('CONTROLLED SUBSTANCE')) && (
                    <Chip
                      label={
                        prescription.drug_info?.nafdac_schedule_display ||
                        (prescription.pharmacy_instructions?.toUpperCase().includes('SCHEDULE 2') ? 'CONTROLLED - S2' :
                         prescription.pharmacy_instructions?.toUpperCase().includes('SCHEDULE 3') ? 'CONTROLLED - S3' :
                         prescription.pharmacy_instructions?.toUpperCase().includes('SCHEDULE 4') ? 'CONTROLLED - S4' :
                         'CONTROLLED')
                      }
                      color="error"
                      size="small"
                      icon={<Warning />}
                    />
                  )}
                  {prescription.drug_info?.is_high_risk && (
                    <Chip
                      label="High Risk"
                      color="warning"
                      size="small"
                    />
                  )}
                  <Chip
                    label={prescription.status.toUpperCase()}
                    color={prescription.status === 'active' ? 'success' : 'default'}
                    size="small"
                  />

                  {/* Dispense Button */}
                  {!prescription.dispensed && prescription.status === 'active' && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<LocalShipping />}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent accordion from expanding
                        handleDispenseClick(prescription);
                      }}
                      sx={{ ml: 1 }}
                    >
                      Dispense
                    </Button>
                  )}

                  {/* Already Dispensed Indicator */}
                  {prescription.dispensed && (
                    <Chip
                      label="Dispensed"
                      color="success"
                      size="small"
                      icon={<CheckCircle />}
                    />
                  )}
                </Box>
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <Box>
                {/* Dosage Information */}
                <Typography variant="subtitle2" color="primary" gutterBottom sx={{ mt: 2 }}>
                  Dosage Information
                </Typography>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Dosage</Typography>
                    <Typography>{prescription.dosage}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Frequency</Typography>
                    <Typography>{prescription.frequency}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">Patient Instructions</Typography>
                    <Typography>{prescription.patient_instructions || 'No special instructions'}</Typography>
                  </Grid>
                  {prescription.pharmacy_instructions && (
                    <Grid item xs={12}>
                      <Alert
                        severity={
                          prescription.pharmacy_instructions.toUpperCase().includes('CONTROLLED SUBSTANCE')
                            ? 'error'
                            : 'info'
                        }
                        icon={
                          prescription.pharmacy_instructions.toUpperCase().includes('CONTROLLED SUBSTANCE')
                            ? <Warning />
                            : <LocalPharmacy />
                        }
                      >
                        <strong>Pharmacy Instructions:</strong> {prescription.pharmacy_instructions}
                      </Alert>
                    </Grid>
                  )}
                </Grid>

                <Divider sx={{ my: 2 }} />

                {/* Drug Database Information */}
                {prescription.drug_info && (
                  <>
                    <Typography variant="subtitle2" color="primary" gutterBottom>
                      Drug Database Information
                    </Typography>

                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">Generic Name</Typography>
                        <Typography>{prescription.drug_info.generic_name}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">Brand Names</Typography>
                        <Typography>{prescription.drug_info.brand_names.join(', ') || 'N/A'}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">NAFDAC Status</Typography>
                        <Chip
                          label={prescription.drug_info.nafdac_approved ? 'NAFDAC Approved' : 'Not Approved'}
                          color={prescription.drug_info.nafdac_approved ? 'success' : 'default'}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">Risk Level</Typography>
                        <Chip
                          label={prescription.drug_info.risk_level.toUpperCase()}
                          color={getRiskChipColor(prescription.drug_info.risk_level)}
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Typography variant="body2" color="text.secondary">Abuse Potential</Typography>
                        <Chip
                          label={prescription.drug_info.abuse_potential.toUpperCase()}
                          color={prescription.drug_info.abuse_potential === 'none' ? 'success' : 'warning'}
                          size="small"
                        />
                      </Grid>
                    </Grid>

                    {/* Safety Warnings */}
                    {(prescription.drug_info.black_box_warning ||
                      prescription.drug_info.requires_photo_id ||
                      prescription.drug_info.addiction_risk) && (
                      <>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" color="error" gutterBottom>
                          Safety Warnings
                        </Typography>

                        {prescription.drug_info.black_box_warning && (
                          <Alert severity="error" icon={<Warning />} sx={{ mb: 1 }}>
                            <strong>BLACK BOX WARNING</strong>
                            {prescription.drug_info.black_box_warning_text && (
                              <Typography variant="body2" sx={{ mt: 1 }}>
                                {prescription.drug_info.black_box_warning_text}
                              </Typography>
                            )}
                          </Alert>
                        )}

                        {prescription.drug_info.requires_photo_id && (
                          <Alert severity="warning" icon={<Security />} sx={{ mb: 1 }}>
                            <strong>Photo ID Required:</strong> Patient must present government-issued photo ID to collect this prescription.
                          </Alert>
                        )}

                        {prescription.drug_info.addiction_risk && (
                          <Alert severity="warning" icon={<Warning />} sx={{ mb: 1 }}>
                            <strong>Addiction Risk:</strong> This medication has significant addiction/dependence potential.
                          </Alert>
                        )}
                      </>
                    )}

                    {/* Monitoring Requirements */}
                    {prescription.drug_info.requires_monitoring && (
                      <>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" color="primary" gutterBottom>
                          Monitoring Requirements
                        </Typography>
                        <Alert severity="info" icon={<HealthAndSafety />}>
                          <strong>Monitoring Type:</strong> {prescription.drug_info.monitoring_type}
                          {prescription.drug_info.monitoring_frequency_days && (
                            <Typography variant="body2">
                              Frequency: Every {prescription.drug_info.monitoring_frequency_days} days
                            </Typography>
                          )}
                        </Alert>
                      </>
                    )}

                    {/* Drug Interactions */}
                    {prescription.drug_info.major_drug_interactions.length > 0 && (
                      <>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" color="warning.main" gutterBottom>
                          Major Drug Interactions
                        </Typography>
                        <Alert severity="warning">
                          <List dense>
                            {prescription.drug_info.major_drug_interactions.map((interaction, idx) => (
                              <ListItem key={idx}>
                                <ListItemText primary={interaction} />
                              </ListItem>
                            ))}
                          </List>
                        </Alert>
                      </>
                    )}

                    {/* Contraindications */}
                    {prescription.drug_info.major_contraindications.length > 0 && (
                      <>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" color="error" gutterBottom>
                          Contraindications
                        </Typography>
                        <Alert severity="error">
                          <List dense>
                            {prescription.drug_info.major_contraindications.map((contraindication, idx) => (
                              <ListItem key={idx}>
                                <ListItemText primary={contraindication} />
                              </ListItem>
                            ))}
                          </List>
                        </Alert>
                      </>
                    )}
                  </>
                )}

                <Divider sx={{ my: 2 }} />

                {/* Prescription Details */}
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  Prescription Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Start Date</Typography>
                    <Typography>{new Date(prescription.start_date).toLocaleDateString()}</Typography>
                  </Grid>
                  {prescription.end_date && (
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">End Date</Typography>
                      <Typography>{new Date(prescription.end_date).toLocaleDateString()}</Typography>
                    </Grid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Prescribed By</Typography>
                    <Typography>{prescription.prescribed_by?.name || 'Unknown'}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Refills</Typography>
                    <Typography>{prescription.refills_remaining} of {prescription.refills_authorized} remaining</Typography>
                  </Grid>
                </Grid>

                {/* Dispensing Status */}
                {prescription.dispensed && (
                  <Alert severity="success" icon={<CheckCircle />} sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Dispensed:</strong> {new Date(prescription.dispensed_at!).toLocaleString()}
                    </Typography>
                    {prescription.dispensed_by_pharmacy && (
                      <Typography variant="body2">
                        <strong>By:</strong> {prescription.dispensed_by_pharmacy.name}
                      </Typography>
                    )}
                  </Alert>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      )}

      {/* Access Audit Information */}
      <Paper sx={{ p: 2, mt: 3, bgcolor: 'grey.50' }}>
        <Typography variant="caption" color="text.secondary">
          <strong>Accessed:</strong> {new Date(accessedAt).toLocaleString()} by {accessedBy.pharmacist}
          (License: {accessedBy.license_number}) at {accessedBy.pharmacy}
          <br />
          <strong>Note:</strong> This access has been logged for audit compliance
        </Typography>
      </Paper>

      {/* Dispense Confirmation Modal */}
      <Dialog
        open={dispenseModalOpen}
        onClose={handleCloseDispenseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dispenseSuccess ? 'Prescription Dispensed' : 'Confirm Dispensing'}
        </DialogTitle>
        <DialogContent>
          {dispenseSuccess ? (
            <Alert severity="success" icon={<CheckCircle />}>
              <Typography variant="body1" fontWeight="500">
                Prescription has been successfully marked as dispensed!
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Redirecting...
              </Typography>
            </Alert>
          ) : (
            <Box>
              {selectedPrescription && (
                <Box>
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    <Typography variant="body2" fontWeight="500">
                      Please verify the following before dispensing:
                    </Typography>
                    <ul style={{ marginTop: '8px', marginBottom: 0 }}>
                      <li>Patient identity verified</li>
                      <li>Correct medication and dosage</li>
                      {(selectedPrescription.drug_info?.is_controlled ||
                        selectedPrescription.pharmacy_instructions?.toUpperCase().includes('CONTROLLED SUBSTANCE')) && (
                        <li style={{ color: '#d32f2f', fontWeight: 'bold' }}>
                          Government-issued photo ID verified (Controlled Substance)
                        </li>
                      )}
                      <li>Patient counseled on proper use</li>
                    </ul>
                  </Alert>

                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="h6" gutterBottom>
                      {selectedPrescription.medication_name} {selectedPrescription.strength}
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Form:</Typography>
                        <Typography variant="body2">{selectedPrescription.form}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Dosage:</Typography>
                        <Typography variant="body2">{selectedPrescription.dosage}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Frequency:</Typography>
                        <Typography variant="body2">{selectedPrescription.frequency}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Patient:</Typography>
                        <Typography variant="body2">{patient.name}</Typography>
                      </Grid>
                    </Grid>

                    {selectedPrescription.patient_instructions && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="text.secondary">Patient Instructions:</Typography>
                        <Typography variant="body2">{selectedPrescription.patient_instructions}</Typography>
                      </Box>
                    )}
                  </Paper>

                  {dispenseError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {dispenseError}
                    </Alert>
                  )}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {!dispenseSuccess && (
            <>
              <Button
                onClick={handleCloseDispenseModal}
                disabled={dispensing}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDispense}
                variant="contained"
                color="primary"
                disabled={dispensing}
                startIcon={dispensing ? <CircularProgress size={20} /> : <LocalShipping />}
              >
                {dispensing ? 'Dispensing...' : 'Confirm Dispense'}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PharmacyPrescriptionList;
