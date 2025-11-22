/**
 * PharmacyPrescriptionsPage
 *
 * Main page for pharmacies to search and view patient prescriptions by HPN.
 * Implements industry-standard patient-choice prescription model with comprehensive drug database integration.
 *
 * Features:
 * - HPN-based prescription lookup
 * - Comprehensive drug database information
 * - Risk-based patient verification
 * - Complete audit trail
 * - Industry-standard compliance (NAFDAC, PCN)
 */

import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  Paper,
  Breadcrumbs,
  Link,
  Button,
  Tabs,
  Tab
} from '@mui/material';
import {
  Home as HomeIcon,
  LocalPharmacy,
  ArrowBack,
  Search as SearchIcon,
  QrCodeScanner as QrCodeScannerIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PharmacyHPNSearch from '../../features/pharmacy/PharmacyHPNSearch';
import PharmacyPrescriptionList from '../../features/pharmacy/PharmacyPrescriptionList';
import QRScanner from '../../features/pharmacy/QRScanner';
import {
  searchPrescriptionsByHPN,
  type PharmacyPrescriptionResponse
} from '../../services/pharmacyPrescriptionService';

const PharmacyPrescriptionsPage: React.FC = () => {
  const navigate = useNavigate();

  // State management
  const [activeTab, setActiveTab] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{
    message: string;
    suggestions?: string[];
  } | null>(null);
  const [prescriptionData, setPrescriptionData] = useState<PharmacyPrescriptionResponse | null>(null);

  // Handle HPN search
  const handleSearch = async (hpn: string, status: string) => {
    setLoading(true);
    setError(null);
    setPrescriptionData(null);

    try {
      const data = await searchPrescriptionsByHPN(
        hpn,
        status as 'active' | 'completed' | 'discontinued' | 'all'
      );

      setPrescriptionData(data);
    } catch (err: any) {
      console.error('Prescription search error:', err);

      setError({
        message: err.message || 'Failed to search prescriptions',
        suggestions: err.suggestions || []
      });

      // Handle specific error types
      if (err.status === 403) {
        // License expired or access denied
        if (err.requiresAction === 'license_renewal') {
          setTimeout(() => {
            alert('Your pharmacy license has expired. Please contact administration to renew your license.');
          }, 100);
        }
      } else if (err.status === 404) {
        // Patient not found - error already set above
      } else if (err.status === 0) {
        // Network error
        setError({
          message: 'Network error - unable to reach server. Please check your connection.',
          suggestions: []
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset search
  const handleNewSearch = () => {
    setPrescriptionData(null);
    setError(null);
  };

  // Handle QR code scan
  const handleQRScan = async (decodedText: string) => {
    try {
      // Parse QR code data (JSON format expected)
      const qrData = JSON.parse(decodedText);

      // QR code should contain HPN
      if (qrData.hpn) {
        // Automatically search using HPN from QR code
        await handleSearch(qrData.hpn, 'active');
      } else {
        setError({
          message: 'Invalid QR code format. Expected prescription QR code with HPN.',
          suggestions: ['Ensure the QR code is from a valid prescription printout']
        });
      }
    } catch (err) {
      console.error('QR code parse error:', err);
      setError({
        message: 'Failed to read QR code. Please try again or use manual HPN search.',
        suggestions: [
          'Ensure good lighting for the camera',
          'Hold the camera steady',
          'Try manual HPN search instead'
        ]
      });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          color="inherit"
          onClick={() => navigate('/professional/dashboard')}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Dashboard
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <LocalPharmacy sx={{ mr: 0.5 }} fontSize="inherit" />
          Pharmacy Prescriptions
        </Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, borderLeft: 4, borderColor: 'primary.main' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
          <LocalPharmacy fontSize="large" color="primary" />
          <Typography variant="h4" component="h1" fontWeight="bold">
            Pharmacy Prescription Lookup
          </Typography>
        </Box>

        <Typography variant="body1" color="text.secondary" paragraph>
          Search for patient prescriptions using their Health Patient Number (HPN) or scan prescription QR code.
          All prescriptions include comprehensive drug database information for safe dispensing.
        </Typography>

        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2" fontWeight="500">
            Industry Standards Implemented
          </Typography>
          <Typography variant="caption">
            • Patient-Choice Prescription Model<br />
            • PCN (Pharmacists Council of Nigeria) License Verification<br />
            • NAFDAC Drug Classification & Schedules<br />
            • Risk-Based Patient Verification<br />
            • Complete Audit Trail (All access logged)
          </Typography>
        </Alert>
      </Paper>

      {/* Search Methods - Tabs */}
      {!prescriptionData && (
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab
              icon={<SearchIcon />}
              label="HPN Search"
              iconPosition="start"
            />
            <Tab
              icon={<QrCodeScannerIcon />}
              label="QR Code Scan"
              iconPosition="start"
            />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {/* HPN Search Tab */}
            {activeTab === 0 && (
              <PharmacyHPNSearch onSearch={handleSearch} loading={loading} />
            )}

            {/* QR Code Scan Tab */}
            {activeTab === 1 && (
              <Box>
                <Alert severity="info" sx={{ mb: 3 }}>
                  <Typography variant="body2" fontWeight="500">
                    QR Code Scanning
                  </Typography>
                  <Typography variant="caption">
                    Scan the QR code printed on the patient's prescription to automatically
                    load their prescription details. This method is faster and reduces manual entry errors.
                  </Typography>
                </Alert>

                <QRScanner
                  onScanSuccess={handleQRScan}
                  onScanError={(error) => {
                    setError({
                      message: error,
                      suggestions: ['Try manual HPN search instead']
                    });
                  }}
                />
              </Box>
            )}
          </Box>
        </Paper>
      )}

      {/* Error Display */}
      {error && !loading && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          onClose={() => setError(null)}
        >
          <Typography variant="body1" fontWeight="500">
            {error.message}
          </Typography>
          {error.suggestions && error.suggestions.length > 0 && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" fontWeight="500">Suggestions:</Typography>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                {error.suggestions.map((suggestion, idx) => (
                  <li key={idx}>
                    <Typography variant="body2">{suggestion}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Alert>
      )}

      {/* Results Display */}
      {prescriptionData && !loading && (
        <Box>
          {/* New Search Button */}
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" fontWeight="600">
              Search Results
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handleNewSearch}
            >
              New Search
            </Button>
          </Box>

          {/* Prescription List */}
          <PharmacyPrescriptionList
            patient={prescriptionData.patient}
            prescriptions={prescriptionData.prescriptions}
            summary={prescriptionData.summary}
            verificationRequired={prescriptionData.verification_required}
            accessedAt={prescriptionData.accessed_at}
            accessedBy={prescriptionData.accessed_by}
          />
        </Box>
      )}

      {/* Compliance Footer */}
      <Paper sx={{ p: 2, mt: 4, bgcolor: 'grey.100' }}>
        <Typography variant="caption" color="text.secondary">
          <strong>Compliance Notice:</strong> All prescription access is logged for audit compliance.
          Patient must be physically present for verification. Controlled substances require
          government-issued photo ID verification. This system complies with international healthcare standards,
          NAFDAC regulations, and PCN guidelines.
        </Typography>
      </Paper>
    </Container>
  );
};

export default PharmacyPrescriptionsPage;
