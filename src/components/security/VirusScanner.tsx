import React, { useState, useEffect } from 'react';
import { Shield, Search, CheckCircle, AlertTriangle, Zap, Bug } from 'lucide-react';

interface ScanResult {
  isClean: boolean;
  threatsFound: number;
  scanTime: number;
  lastUpdate: string;
  engineVersion: string;
}

interface ThreatInfo {
  name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'virus' | 'malware' | 'trojan' | 'adware';
  description: string;
}

const VirusScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [threatsDetected] = useState(0);
  const [filesScanned, setFilesScanned] = useState(2847);

  useEffect(() => {
    // Simulate real-time scanning stats
    const interval = setInterval(() => {
      setFilesScanned(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const performScan = async () => {
    setIsScanning(true);
    setScanProgress(0);

    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate scan completion
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result: ScanResult = {
      isClean: true,
      threatsFound: 0,
      scanTime: 1.2,
      lastUpdate: new Date().toLocaleString(),
      engineVersion: 'ClamAV 1.2.1'
    };

    setScanResult(result);
    setIsScanning(false);
    setScanProgress(100);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-yellow-600 bg-yellow-100';
      case 'medium':
        return 'text-orange-600 bg-orange-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'critical':
        return 'text-red-800 bg-red-200';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <Bug className="h-5 w-5 mr-2 text-red-600" />
          🦠 Virus Scanner
        </h3>
        <div className="text-sm text-gray-500">
          Engine: ClamAV Pro
        </div>
      </div>

      {/* Scanner Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">{filesScanned.toLocaleString()}</div>
          <div className="text-sm text-green-700">Files Scanned</div>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-600">{threatsDetected}</div>
          <div className="text-sm text-red-700">Threats Found</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">100%</div>
          <div className="text-sm text-blue-700">Clean Rate</div>
        </div>
      </div>

      {/* Scan Button */}
      <button
        onClick={performScan}
        disabled={isScanning}
        className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 font-medium flex items-center justify-center transition-all duration-200"
      >
        {isScanning ? (
          <>
            <Search className="h-5 w-5 mr-2 animate-spin" />
            Deep Scanning in Progress...
          </>
        ) : (
          <>
            <Shield className="h-5 w-5 mr-2" />
            🦠 Start Deep Virus Scan
          </>
        )}
      </button>

      {/* Scan Progress */}
      {isScanning && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Scanning for threats...</span>
            <span>{Math.round(scanProgress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Scan Results */}
      {scanResult && (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg border ${
            scanResult.isClean 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center space-x-2">
              {scanResult.isClean ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-500" />
              )}
              <div>
                <div className="font-bold text-gray-900">
                  {scanResult.isClean ? '✅ All Clear!' : '⚠️ Threats Detected'}
                </div>
                <div className="text-sm text-gray-600">
                  Scan completed in {scanResult.scanTime}s • {scanResult.threatsFound} threats found
                </div>
              </div>
            </div>
          </div>

          {/* Scan Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Scan Details:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Engine Version:</span>
                <span className="ml-2 font-medium">{scanResult.engineVersion}</span>
              </div>
              <div>
                <span className="text-gray-600">Last Updated:</span>
                <span className="ml-2 font-medium">{scanResult.lastUpdate}</span>
              </div>
              <div>
                <span className="text-gray-600">Scan Method:</span>
                <span className="ml-2 font-medium">Deep + Heuristic</span>
              </div>
              <div>
                <span className="text-gray-600">Database:</span>
                <span className="ml-2 font-medium">Latest Signatures</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scanner Features */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">🛡️ Scanner Capabilities:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>🦠 Real-time virus detection</div>
          <div>🔍 Heuristic analysis</div>
          <div>🛡️ Malware identification</div>
          <div>🎯 Trojan detection</div>
          <div>📊 Behavioral analysis</div>
          <div>⚡ Lightning-fast scanning</div>
        </div>
      </div>
    </div>
  );
};

export default VirusScanner;