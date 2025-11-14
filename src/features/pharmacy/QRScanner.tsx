import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Alert, Button, CircularProgress, Box, Typography } from '@mui/material';
import { CameraAlt, StopCircle } from '@mui/icons-material';

interface QRScannerProps {
  onScanSuccess: (decodedText: string, decodedResult: any) => void;
  onScanError?: (error: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanError }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const qrCodeRegionId = 'qr-code-region';

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    try {
      setError(null);
      setIsScanning(true);

      // Initialize scanner if not already done
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(qrCodeRegionId);
      }

      // Configure scanner
      const config = {
        fps: 10, // Frames per second
        qrbox: { width: 250, height: 250 }, // Scanning box size
        aspectRatio: 1.0
      };

      // Success callback
      const qrCodeSuccessCallback = (decodedText: string, decodedResult: any) => {
        console.log('QR Code scanned:', decodedText);
        onScanSuccess(decodedText, decodedResult);

        // Auto-stop scanning after successful scan
        stopScanning();
      };

      // Error callback (optional, fires on every scan attempt that fails)
      const qrCodeErrorCallback = (errorMessage: string) => {
        // Only log critical errors, not every failed scan attempt
        if (!errorMessage.includes('NotFoundException')) {
          console.debug('QR scan error:', errorMessage);
        }
      };

      // Start scanning with back camera
      await scannerRef.current.start(
        { facingMode: "environment" }, // Use back camera
        config,
        qrCodeSuccessCallback,
        qrCodeErrorCallback
      );

      setCameraPermission('granted');
    } catch (err: any) {
      console.error('Failed to start scanning:', err);

      let errorMessage = 'Failed to start camera. ';

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage += 'Camera permission denied. Please allow camera access in your browser settings.';
        setCameraPermission('denied');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage += 'No camera found on this device.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage += 'Camera is already in use by another application.';
      } else {
        errorMessage += err.message || 'Unknown error occurred.';
      }

      setError(errorMessage);
      setIsScanning(false);

      if (onScanError) {
        onScanError(errorMessage);
      }
    }
  };

  const stopScanning = async () => {
    try {
      if (scannerRef.current && scannerRef.current.isScanning) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      }
      setIsScanning(false);
    } catch (err) {
      console.error('Error stopping scanner:', err);
    }
  };

  return (
    <Box>
      {/* Scanner container */}
      <Box
        id={qrCodeRegionId}
        sx={{
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
          border: isScanning ? '2px solid #1976d2' : '2px dashed #ccc',
          borderRadius: '8px',
          overflow: 'hidden',
          minHeight: isScanning ? '300px' : '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5'
        }}
      >
        {!isScanning && (
          <Typography variant="body2" color="text.secondary">
            Camera view will appear here
          </Typography>
        )}
      </Box>

      {/* Error message */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
          {cameraPermission === 'denied' && (
            <Box sx={{ mt: 1, fontSize: '0.875rem' }}>
              <strong>How to enable camera:</strong>
              <ul style={{ marginTop: '4px', paddingLeft: '20px' }}>
                <li>Click the lock/info icon in your browser's address bar</li>
                <li>Find "Camera" permissions</li>
                <li>Change from "Block" to "Allow"</li>
                <li>Reload this page</li>
              </ul>
            </Box>
          )}
        </Alert>
      )}

      {/* Control buttons */}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
        {!isScanning ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<CameraAlt />}
            onClick={startScanning}
            size="large"
          >
            Start Camera Scan
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            startIcon={<StopCircle />}
            onClick={stopScanning}
            size="large"
          >
            Stop Scanning
          </Button>
        )}
      </Box>

      {/* Instructions */}
      <Alert severity="info" sx={{ mt: 2 }}>
        <Typography variant="body2">
          <strong>How to scan:</strong>
        </Typography>
        <ol style={{ marginTop: '4px', paddingLeft: '20px', marginBottom: 0 }}>
          <li>Click "Start Camera Scan" and allow camera access</li>
          <li>Point your camera at the QR code on the prescription printout</li>
          <li>Hold steady until the code is recognized (will auto-scan)</li>
          <li>Prescription details will load automatically</li>
        </ol>
      </Alert>

      {isScanning && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <CircularProgress size={24} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Scanning... Position QR code within the blue box
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default QRScanner;
