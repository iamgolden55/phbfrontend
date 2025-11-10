import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Chip,
  Divider,
  Grid,
  TextField,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as ApproveIcon,
  Warning as EscalateIcon,
  Cancel as RejectIcon,
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  LocalPharmacy as PharmacyIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import {
  getPharmacistTriageRequestDetail,
  pharmacistApprovePrescription,
  escalatePrescriptionToPhysician,
  pharmacistRejectPrescription,
  type PharmacistPrescriptionRequestDetail,
  type PharmacistApprovalRequest,
  type PharmacistEscalationRequest,
  type PharmacistRejectionRequest,
} from '../../features/health/prescriptionsService';
import { format, parseISO } from 'date-fns';

interface PrescriptionTriageModalProps {
  open: boolean;
  requestId: string | null;
  onClose: () => void;
  onActionComplete?: () => void;
}

type ReviewAction = 'approve' | 'escalate' | 'reject' | null;

export default function PrescriptionTriageModal({
  open,
  requestId,
  onClose,
  onActionComplete,
}: PrescriptionTriageModalProps) {
  const [request, setRequest] = useState<PharmacistPrescriptionRequestDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Review action state
  const [selectedAction, setSelectedAction] = useState<ReviewAction>(null);

  // Approval form state
  const [pharmacistNotes, setPharmacistNotes] = useState('');
  const [drugInteractions, setDrugInteractions] = useState('');
  const [monitoringRequirements, setMonitoringRequirements] = useState('');
  const [hadIntervention, setHadIntervention] = useState(false);
  const [approvedMedications, setApprovedMedications] = useState<
    Array<{
      medication_name: string;
      approved_quantity: number;
      approved_dosage: string;
      refills_allowed: number;
    }>
  >([]);

  // Escalation form state
  const [escalationReason, setEscalationReason] = useState('');
  const [clinicalConcerns, setClinicalConcerns] = useState('');
  const [pharmacistRecommendation, setPharmacistRecommendation] = useState('');
  const [flaggedMedications, setFlaggedMedications] = useState<string[]>([]);

  // Rejection form state
  const [rejectionReason, setRejectionReason] = useState('');
  const [requiresAppointment, setRequiresAppointment] = useState(false);

  useEffect(() => {
    if (open && requestId) {
      loadRequestDetail();
    } else {
      resetForm();
    }
  }, [open, requestId]);

  const loadRequestDetail = async () => {
    if (!requestId) return;

    try {
      setLoading(true);
      setError(null);
      const detail = await getPharmacistTriageRequestDetail(requestId);
      setRequest(detail);

      // Initialize approved medications with requested data
      const initialMeds = detail.medications.map((med) => ({
        medication_name: med.medication_name,
        approved_quantity: med.quantity,
        approved_dosage: med.dosage || 'As directed',
        refills_allowed: med.is_repeat ? 11 : 0,
      }));
      setApprovedMedications(initialMeds);

      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to load request details');
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRequest(null);
    setSelectedAction(null);
    setPharmacistNotes('');
    setDrugInteractions('');
    setMonitoringRequirements('');
    setHadIntervention(false);
    setApprovedMedications([]);
    setEscalationReason('');
    setClinicalConcerns('');
    setPharmacistRecommendation('');
    setFlaggedMedications([]);
    setRejectionReason('');
    setRequiresAppointment(false);
    setError(null);
    setSuccessMessage(null);
  };

  const handleApprove = async () => {
    if (!requestId) return;

    try {
      setSubmitting(true);
      setError(null);

      const approvalData: PharmacistApprovalRequest = {
        pharmacist_notes: pharmacistNotes,
        drug_interactions_checked: drugInteractions,
        monitoring_requirements: monitoringRequirements,
        approved_medications: approvedMedications,
        had_clinical_intervention: hadIntervention,
      };

      const response = await pharmacistApprovePrescription(requestId, approvalData);
      setSuccessMessage(response.message);
      setSubmitting(false);

      setTimeout(() => {
        onActionComplete?.();
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to approve prescription');
      setSubmitting(false);
    }
  };

  const handleEscalate = async () => {
    if (!requestId) return;

    try {
      setSubmitting(true);
      setError(null);

      const escalationData: PharmacistEscalationRequest = {
        escalation_reason: escalationReason,
        clinical_concerns: clinicalConcerns,
        pharmacist_recommendation: pharmacistRecommendation,
        pharmacist_notes: pharmacistNotes,
        flagged_medications: flaggedMedications,
        had_clinical_intervention: hadIntervention,
      };

      const response = await escalatePrescriptionToPhysician(requestId, escalationData);
      setSuccessMessage(response.message);
      setSubmitting(false);

      setTimeout(() => {
        onActionComplete?.();
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to escalate prescription');
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!requestId) return;

    try {
      setSubmitting(true);
      setError(null);

      const rejectionData: PharmacistRejectionRequest = {
        rejection_reason: rejectionReason,
        pharmacist_notes: pharmacistNotes,
        requires_appointment: requiresAppointment,
        had_clinical_intervention: hadIntervention,
      };

      const response = await pharmacistRejectPrescription(requestId, rejectionData);
      setSuccessMessage(response.message);
      setSubmitting(false);

      setTimeout(() => {
        onActionComplete?.();
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to reject prescription');
      setSubmitting(false);
    }
  };

  const updateApprovedMedication = (
    index: number,
    field: 'approved_quantity' | 'approved_dosage' | 'refills_allowed',
    value: any
  ) => {
    const updated = [...approvedMedications];
    updated[index] = { ...updated[index], [field]: value };
    setApprovedMedications(updated);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM dd, yyyy HH:mm');
    } catch {
      return dateString;
    }
  };

  const renderActionForm = () => {
    if (!selectedAction) return null;

    switch (selectedAction) {
      case 'approve':
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom color="success.main">
              <ApproveIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Approve Prescription Request
            </Typography>

            <Alert severity="info" sx={{ mb: 2 }}>
              This will forward the prescription to the physician for final authorization. Review
              and adjust quantities/dosages as needed.
            </Alert>

            {/* Approved Medications Table */}
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
              Approved Medications
            </Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Medication</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Dosage Instructions</TableCell>
                    <TableCell>Refills</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {approvedMedications.map((med, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <strong>{med.medication_name}</strong>
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={med.approved_quantity}
                          onChange={(e) =>
                            updateApprovedMedication(
                              index,
                              'approved_quantity',
                              parseInt(e.target.value)
                            )
                          }
                          size="small"
                          sx={{ width: 80 }}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={med.approved_dosage}
                          onChange={(e) =>
                            updateApprovedMedication(index, 'approved_dosage', e.target.value)
                          }
                          size="small"
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          type="number"
                          value={med.refills_allowed}
                          onChange={(e) =>
                            updateApprovedMedication(
                              index,
                              'refills_allowed',
                              parseInt(e.target.value)
                            )
                          }
                          size="small"
                          sx={{ width: 80 }}
                          inputProps={{ min: 0, max: 11 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Pharmacist Clinical Notes (Required)"
              value={pharmacistNotes}
              onChange={(e) => setPharmacistNotes(e.target.value)}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              multiline
              rows={2}
              label="Drug Interactions Checked"
              value={drugInteractions}
              onChange={(e) => setDrugInteractions(e.target.value)}
              placeholder="e.g., No significant interactions identified"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              multiline
              rows={2}
              label="Monitoring Requirements"
              value={monitoringRequirements}
              onChange={(e) => setMonitoringRequirements(e.target.value)}
              placeholder="e.g., Monitor blood pressure monthly"
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={hadIntervention}
                  onChange={(e) => setHadIntervention(e.target.checked)}
                />
              }
              label="Clinical intervention was made (dosage adjustment, quantity change, etc.)"
            />
          </Box>
        );

      case 'escalate':
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom color="warning.main">
              <EscalateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Escalate to Physician
            </Typography>

            <Alert severity="warning" sx={{ mb: 2 }}>
              This will forward the prescription request to a physician for review. Provide clear
              clinical reasoning for escalation.
            </Alert>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Escalation Reason (Required)"
              value={escalationReason}
              onChange={(e) => setEscalationReason(e.target.value)}
              required
              placeholder="e.g., Complex polypharmacy case requiring physician assessment"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Clinical Concerns"
              value={clinicalConcerns}
              onChange={(e) => setClinicalConcerns(e.target.value)}
              placeholder="e.g., Potential drug interactions with current medications"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              multiline
              rows={2}
              label="Pharmacist Recommendation"
              value={pharmacistRecommendation}
              onChange={(e) => setPharmacistRecommendation(e.target.value)}
              placeholder="e.g., Consider alternative therapy or dose adjustment"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              multiline
              rows={2}
              label="Additional Notes"
              value={pharmacistNotes}
              onChange={(e) => setPharmacistNotes(e.target.value)}
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={hadIntervention}
                  onChange={(e) => setHadIntervention(e.target.checked)}
                />
              }
              label="Clinical intervention attempted before escalation"
            />
          </Box>
        );

      case 'reject':
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom color="error.main">
              <RejectIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Reject Prescription Request
            </Typography>

            <Alert severity="error" sx={{ mb: 2 }}>
              Rejecting this request will notify the patient. Provide clear reasoning for
              rejection.
            </Alert>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Rejection Reason (Required)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              required
              placeholder="e.g., Clinical contraindication identified - patient requires in-person assessment"
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              multiline
              rows={2}
              label="Additional Clinical Notes"
              value={pharmacistNotes}
              onChange={(e) => setPharmacistNotes(e.target.value)}
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={requiresAppointment}
                  onChange={(e) => setRequiresAppointment(e.target.checked)}
                />
              }
              label="Patient requires follow-up appointment"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={hadIntervention}
                  onChange={(e) => setHadIntervention(e.target.checked)}
                />
              }
              label="Clinical intervention/consultation provided"
            />
          </Box>
        );

      default:
        return null;
    }
  };

  const canSubmit = () => {
    if (!selectedAction) return false;

    switch (selectedAction) {
      case 'approve':
        return pharmacistNotes.trim().length > 0;
      case 'escalate':
        return escalationReason.trim().length > 0;
      case 'reject':
        return rejectionReason.trim().length > 0;
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            <PharmacyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Pharmacist Triage Review
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        {!loading && request && (
          <>
            {/* Request Summary */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    <PersonIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                    Patient Information
                  </Typography>
                  <Typography variant="body2">
                    <strong>Name:</strong> {request.patient.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>HPN:</strong> {request.patient.hpn}
                  </Typography>
                  <Typography variant="body2">
                    <strong>DOB:</strong> {formatDate(request.patient.dob)} (Age:{' '}
                    {request.patient.age})
                  </Typography>
                  {request.patient.allergies && (
                    <Typography variant="body2" color="error.main">
                      <strong>⚠️ Allergies:</strong> {request.patient.allergies}
                    </Typography>
                  )}
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    <InfoIcon fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                    Request Information
                  </Typography>
                  <Typography variant="body2">
                    <strong>Reference:</strong> {request.request_reference}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Date:</strong> {formatDate(request.request_date)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Urgency:</strong>{' '}
                    <Chip
                      label={request.urgency.toUpperCase()}
                      size="small"
                      color={request.urgency === 'urgent' ? 'error' : 'default'}
                    />
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status:</strong>{' '}
                    <Chip label={request.status} size="small" color="warning" />
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Triage Information */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">Triage Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2">
                      <strong>Category:</strong> {request.triage_info.category.replace(/_/g, ' ')}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2">
                      <strong>Score:</strong> {request.triage_info.score}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2">
                      <strong>Assigned:</strong> {formatDate(request.triage_info.assigned_at)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      <strong>Reason:</strong> {request.triage_info.reason}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Current Medications */}
            {request.patient.current_medications && request.patient.current_medications.length > 0 && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">Current Medications</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                    {request.patient.current_medications.map((med, index) => (
                      <li key={index}>
                        <Typography variant="body2">{med}</Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            )}

            {/* Requested Medications */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  Requested Medications ({request.medications.length})
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Medication</TableCell>
                        <TableCell>Strength</TableCell>
                        <TableCell>Form</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Dosage</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {request.medications.map((med, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            backgroundColor: med.is_controlled
                              ? 'error.light'
                              : 'transparent',
                          }}
                        >
                          <TableCell>
                            <strong>{med.medication_name}</strong>
                            {med.is_controlled && (
                              <Chip
                                label="CONTROLLED"
                                size="small"
                                color="error"
                                sx={{ ml: 1 }}
                              />
                            )}
                          </TableCell>
                          <TableCell>{med.strength || 'N/A'}</TableCell>
                          <TableCell>{med.form || 'N/A'}</TableCell>
                          <TableCell>{med.quantity}</TableCell>
                          <TableCell>
                            <Chip
                              label={med.is_repeat ? 'Repeat' : 'New'}
                              size="small"
                              color={med.is_repeat ? 'success' : 'warning'}
                            />
                          </TableCell>
                          <TableCell>{med.dosage || 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>

            {/* Additional Notes */}
            {request.additional_notes && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1">Patient's Additional Notes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" fontStyle="italic">
                    "{request.additional_notes}"
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )}

            <Divider sx={{ my: 3 }} />

            {/* Action Selection */}
            {!selectedAction && !successMessage && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Pharmacist Review Actions
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Choose an action to take on this prescription request:
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="success"
                      startIcon={<ApproveIcon />}
                      onClick={() => setSelectedAction('approve')}
                      size="large"
                    >
                      Approve & Forward
                    </Button>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Forward to physician for final authorization
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="warning"
                      startIcon={<EscalateIcon />}
                      onClick={() => setSelectedAction('escalate')}
                      size="large"
                    >
                      Escalate to Physician
                    </Button>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Complex case requiring physician review
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="error"
                      startIcon={<RejectIcon />}
                      onClick={() => setSelectedAction('reject')}
                      size="large"
                    >
                      Reject Request
                    </Button>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Clinically inappropriate or unsafe
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            )}

            {/* Action Form */}
            {renderActionForm()}
          </>
        )}
      </DialogContent>

      <DialogActions>
        {selectedAction && !successMessage && (
          <>
            <Button onClick={() => setSelectedAction(null)} disabled={submitting}>
              Back
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                if (selectedAction === 'approve') handleApprove();
                else if (selectedAction === 'escalate') handleEscalate();
                else if (selectedAction === 'reject') handleReject();
              }}
              disabled={!canSubmit() || submitting}
              color={
                selectedAction === 'approve'
                  ? 'success'
                  : selectedAction === 'escalate'
                  ? 'warning'
                  : 'error'
              }
            >
              {submitting ? <CircularProgress size={24} /> : `Confirm ${selectedAction}`}
            </Button>
          </>
        )}
        {!selectedAction && (
          <Button onClick={onClose} disabled={submitting}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
