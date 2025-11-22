/**
 * PharmacyHPNSearch Component
 *
 * Search component for pharmacies to look up patient prescriptions by HPN.
 * Features:
 * - HPN input with validation
 * - Auto-formatting (XXX XXX XXX XXXX)
 * - Status filter (active/all prescriptions)
 * - Loading states and error handling
 */

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  Chip
} from '@mui/material';
import { Search as SearchIcon, MedicalServices } from '@mui/icons-material';
import { validateHPN, formatHPN } from '../../services/pharmacyPrescriptionService';

interface PharmacyHPNSearchProps {
  onSearch: (hpn: string, status: string) => Promise<void>;
  loading?: boolean;
}

const PharmacyHPNSearch: React.FC<PharmacyHPNSearchProps> = ({
  onSearch,
  loading = false
}) => {
  const [hpn, setHPN] = useState('');
  const [status, setStatus] = useState('active');
  const [error, setError] = useState<string>('');

  // Handle HPN input change with auto-formatting
  const handleHPNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\s/g, '').toUpperCase(); // Remove spaces and convert to uppercase

    // Only allow alphanumeric characters (letters and numbers)
    if (input && !/^[A-Z0-9]+$/.test(input)) {
      return;
    }

    // Limit to 13 characters (3 letters + 10 digits)
    if (input.length <= 13) {
      setHPN(input);
      setError('');
    }
  };

  // Handle search submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate HPN
    const validation = validateHPN(hpn);
    if (!validation.valid) {
      setError(validation.message || 'Invalid HPN');
      return;
    }

    // Clear error and trigger search
    setError('');
    try {
      await onSearch(hpn, status);
    } catch (err: any) {
      setError(err.message || 'Search failed');
    }
  };

  // Format HPN for display
  const displayHPN = formatHPN(hpn);

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <MedicalServices color="primary" />
        <Typography variant="h6" component="h2">
          Patient Prescription Lookup
        </Typography>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Enter the patient's Health Patient Number (HPN) to view their prescriptions.
        Patient must be physically present for verification.
      </Typography>

      <form onSubmit={handleSearch}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* HPN Input */}
          <TextField
            label="Health Patient Number (HPN)"
            value={displayHPN}
            onChange={handleHPNChange}
            placeholder="ABC 123 456 7890"
            fullWidth
            required
            disabled={loading}
            error={!!error}
            helperText={error || 'Format: 3 letters + 10 digits (e.g., ASA 289 xxx xxxx)'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color={error ? 'error' : 'action'} />
                </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 16, // 13 characters + 3 spaces
            }}
          />

          {/* Status Filter */}
          <FormControl fullWidth>
            <InputLabel>Prescription Status</InputLabel>
            <Select
              value={status}
              label="Prescription Status"
              onChange={(e) => setStatus(e.target.value)}
              disabled={loading}
            >
              <MenuItem value="active">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label="Active" size="small" color="success" />
                  <span>Active Prescriptions Only</span>
                </Box>
              </MenuItem>
              <MenuItem value="all">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label="All" size="small" color="default" />
                  <span>All Prescriptions (Active + Historical)</span>
                </Box>
              </MenuItem>
            </Select>
          </FormControl>

          {/* Information Alert */}
          <Alert severity="info" icon={<MedicalServices />}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Patient-Choice Model
            </Typography>
            <Typography variant="caption">
              Any pharmacy can access prescriptions if the patient is physically present.
              All access is logged for audit compliance.
            </Typography>
          </Alert>

          {/* Search Button */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading || !hpn}
            startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
            fullWidth
          >
            {loading ? 'Searching...' : 'Search Prescriptions'}
          </Button>
        </Box>
      </form>

      {/* Example HPN (for testing) */}
      {process.env.NODE_ENV === 'development' && (
        <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary">
            <strong>Development Mode:</strong> Example HPN format: ASA xxx 843 xxxx
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default PharmacyHPNSearch;
