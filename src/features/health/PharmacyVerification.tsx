import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Chip,
  Grid,
  Divider,
  Paper
} from '@mui/material';
import { API_URL } from '../../utils/config';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

interface VerificationResult {
  valid: boolean;
  reason: string;
  details?: {
    prescription_id?: number;
    patient_name?: string;
    medication?: string;
    dosage?: string;
    frequency?: string;
    patient_hpn?: string;
    dispensed?: boolean;
    nominated_pharmacy?: string;
    expiry_date?: string;
    dispensed_at?: string;
    dispensed_by?: string;
  };
}

const PharmacyVerification: React.FC = () => {
  const [qrData, setQrData] = useState('');
  const [pharmacyCode, setPharmacyCode] = useState('');
  const [pharmacyName, setPharmacyName] = useState('');
  const [pharmacistName, setPharmacistName] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [dispensing, setDispensing] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!qrData) {
      setError('Please enter QR code data');
      return;
    }

    setVerifying(true);
    setError(null);
    setVerificationResult(null);

    try {
      // Parse QR code JSON
      const qrPayload = JSON.parse(qrData);

      const response = await fetch(`${API_URL}/prescriptions/verify/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload: qrPayload.payload,
          signature: qrPayload.signature,
          pharmacy_code: pharmacyCode || undefined,
          pharmacy_name: pharmacyName || 'Unknown Pharmacy'
        })
      });

      const data = await response.json();
      setVerificationResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to verify prescription');
    } finally {
      setVerifying(false);
    }
  };

  const handleDispense = async () => {
    if (!verificationResult?.details || !pharmacyCode || !pharmacistName) {
      setError('Missing required information for dispensing');
      return;
    }

    setDispensing(true);
    setError(null);

    try {
      const qrPayload = JSON.parse(qrData);

      const response = await fetch(`${API_URL}/prescriptions/dispense/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prescription_id: qrPayload.payload.id,
          nonce: qrPayload.payload.nonce,
          pharmacy_code: pharmacyCode,
          pharmacist_name: pharmacistName,
          verification_notes: 'Patient ID verified'
        })
      });

      const data = await response.json();

      if (data.success) {
        setVerificationResult({
          ...verificationResult,
          details: {
            ...verificationResult.details,
            dispensed: true,
            dispensed_at: data.details.dispensed_at,
            dispensed_by: data.details.dispensed_by
          }
        });
        setQrData('');
      } else {
        setError(data.message);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to dispense prescription');
    } finally {
      setDispensing(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <LocalPharmacyIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          PHB Prescription Verification System
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Secure prescription verification for pharmacies
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Panel - Verification Form */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <QrCodeScannerIcon />
                Scan & Verify
              </Typography>

              <Box sx={{ mt: 2 }}>
                {/* Pharmacy Info */}
                <TextField
                  fullWidth
                  label="Pharmacy Code"
                  value={pharmacyCode}
                  onChange={(e) => setPharmacyCode(e.target.value)}
                  placeholder="PHB-PH-001234"
                  sx={{ mb: 2 }}
                  size="small"
                />

                <TextField
                  fullWidth
                  label="Pharmacy Name"
                  value={pharmacyName}
                  onChange={(e) => setPharmacyName(e.target.value)}
                  placeholder="City Centre Pharmacy"
                  sx={{ mb: 2 }}
                  size="small"
                />

                <Divider sx={{ my: 2 }} />

                {/* QR Code Data Input */}
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  label="QR Code Data (JSON)"
                  value={qrData}
                  onChange={(e) => setQrData(e.target.value)}
                  placeholder='{"payload": {...}, "signature": "..."}'
                  sx={{ mb: 2 }}
                  helperText="Scan QR code or paste JSON data"
                />

                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleVerify}
                  disabled={verifying || !qrData}
                  startIcon={verifying ? <CircularProgress size={20} /> : <QrCodeScannerIcon />}
                >
                  {verifying ? 'Verifying...' : 'Verify Prescription'}
                </Button>

                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Panel - Verification Results */}
        <Grid item xs={12} md={6}>
          {verificationResult && (
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  {verificationResult.valid ? (
                    <CheckCircleIcon color="success" fontSize="large" />
                  ) : (
                    <ErrorIcon color="error" fontSize="large" />
                  )}
                  <Typography variant="h6">
                    {verificationResult.valid ? 'Valid Prescription' : 'Invalid Prescription'}
                  </Typography>
                </Box>

                <Alert severity={verificationResult.valid ? 'success' : 'error'} sx={{ mb: 2 }}>
                  {verificationResult.reason}
                </Alert>

                {verificationResult.valid && verificationResult.details && (
                  <>
                    <Paper sx={{ p: 2, bgcolor: 'grey.50', mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Patient Information
                      </Typography>
                      <Typography variant="body2">
                        <strong>Name:</strong> {verificationResult.details.patient_name}
                      </Typography>
                      <Typography variant="body2">
                        <strong>HPN:</strong> {verificationResult.details.patient_hpn}
                      </Typography>
                    </Paper>

                    <Paper sx={{ p: 2, bgcolor: 'grey.50', mb: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Medication Details
                      </Typography>
                      <Typography variant="body2">
                        <strong>Medication:</strong> {verificationResult.details.medication}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Dosage:</strong> {verificationResult.details.dosage}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Frequency:</strong> {verificationResult.details.frequency}
                      </Typography>
                    </Paper>

                    {verificationResult.details.nominated_pharmacy && (
                      <Paper sx={{ p: 2, bgcolor: 'grey.50', mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Nominated Pharmacy
                        </Typography>
                        <Typography variant="body2">
                          {verificationResult.details.nominated_pharmacy}
                        </Typography>
                      </Paper>
                    )}

                    {verificationResult.details.dispensed ? (
                      <Alert severity="warning" sx={{ mt: 2 }}>
                        <strong>Already Dispensed</strong>
                        <br />
                        Dispensed at: {verificationResult.details.dispensed_at}
                        <br />
                        Dispensed by: {verificationResult.details.dispensed_by}
                      </Alert>
                    ) : (
                      <Box sx={{ mt: 2 }}>
                        <TextField
                          fullWidth
                          label="Pharmacist Name"
                          value={pharmacistName}
                          onChange={(e) => setPharmacistName(e.target.value)}
                          placeholder="John Smith"
                          sx={{ mb: 2 }}
                          size="small"
                        />
                        <Button
                          fullWidth
                          variant="contained"
                          color="success"
                          onClick={handleDispense}
                          disabled={dispensing || !pharmacyCode || !pharmacistName}
                          startIcon={dispensing ? <CircularProgress size={20} /> : <CheckCircleIcon />}
                        >
                          {dispensing ? 'Processing...' : 'Mark as Dispensed'}
                        </Button>
                      </Box>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {!verificationResult && (
            <Card>
              <CardContent>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <QrCodeScannerIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                  <Typography color="text.secondary">
                    Scan a prescription QR code to begin verification
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Info Section */}
      <Paper sx={{ mt: 4, p: 3, bgcolor: 'info.lighter' }}>
        <Typography variant="h6" gutterBottom>
          Security Features
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Chip icon={<CheckCircleIcon />} label="HMAC-SHA256 Signatures" color="primary" />
          </Grid>
          <Grid item xs={12} md={4}>
            <Chip icon={<CheckCircleIcon />} label="One-Time-Use Tokens" color="primary" />
          </Grid>
          <Grid item xs={12} md={4}>
            <Chip icon={<CheckCircleIcon />} label="Expiry Validation" color="primary" />
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ mt: 2 }}>
          All prescriptions are cryptographically signed by the PHB backend to prevent forgery and fraud.
          Each prescription has a unique nonce that can only be used once, and all verification attempts
          are logged for audit purposes.
        </Typography>
      </Paper>
    </Box>
  );
};

export default PharmacyVerification;
