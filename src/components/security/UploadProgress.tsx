import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle, XCircle, Clock, Zap, Upload, Shield } from 'lucide-react';

interface UploadProgress {
  phase: 'validating' | 'scanning' | 'encrypting' | 'uploading' | 'complete' | 'error';
  progress: number;
  fileName: string;
  speed: string;
  timeRemaining: string;
  totalFiles: number;
  completedFiles: number;
}

const UploadProgress: React.FC = () => {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [totalUploads, setTotalUploads] = useState(342);

  useEffect(() => {
    // Simulate real-time upload stats
    const interval = setInterval(() => {
      setTotalUploads(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const startUpload = async () => {
    setIsUploading(true);
    
    const phases: UploadProgress['phase'][] = ['validating', 'scanning', 'encrypting', 'uploading', 'complete'];
    
    for (let i = 0; i < phases.length; i++) {
      const phase = phases[i];
      
      // Set initial phase
      setUploadProgress({
        phase,
        progress: 0,
        fileName: 'Medical_Report_2024.pdf',
        speed: '2.4 MB/s',
        timeRemaining: `${5 - i}s`,
        totalFiles: 3,
        completedFiles: i
      });

      // Simulate progress for this phase
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(prev => prev ? { ...prev, progress } : null);
      }
    }

    setIsUploading(false);
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'validating':
        return <Shield className="h-5 w-5 text-blue-600" />;
      case 'scanning':
        return <Zap className="h-5 w-5 text-yellow-600" />;
      case 'encrypting':
        return <Shield className="h-5 w-5 text-purple-600" />;
      case 'uploading':
        return <Upload className="h-5 w-5 text-green-600" />;
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'validating':
        return 'from-blue-500 to-blue-600';
      case 'scanning':
        return 'from-yellow-500 to-yellow-600';
      case 'encrypting':
        return 'from-purple-500 to-purple-600';
      case 'uploading':
        return 'from-green-500 to-green-600';
      case 'complete':
        return 'from-green-500 to-green-600';
      case 'error':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getPhaseText = (phase: string) => {
    switch (phase) {
      case 'validating':
        return '🔍 Validating File Structure';
      case 'scanning':
        return '🦠 Scanning for Threats';
      case 'encrypting':
        return '🔒 Encrypting with AES-256';
      case 'uploading':
        return '📤 Uploading to Secure Vault';
      case 'complete':
        return '✅ Upload Complete & Secured';
      case 'error':
        return '❌ Upload Failed';
      default:
        return 'Processing...';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <Activity className="h-5 w-5 mr-2 text-blue-600" />
          📊 Upload Progress
        </h3>
        <div className="text-sm text-gray-500">
          Total uploads: {totalUploads}
        </div>
      </div>

      {/* Upload Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">99.8%</div>
          <div className="text-sm text-blue-700">Success Rate</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">2.4 MB/s</div>
          <div className="text-sm text-green-700">Avg Speed</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">4</div>
          <div className="text-sm text-purple-700">Security Phases</div>
        </div>
      </div>

      {/* Start Upload Button */}
      <button
        onClick={startUpload}
        disabled={isUploading}
        className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 font-medium flex items-center justify-center transition-all duration-200"
      >
        {isUploading ? (
          <>
            <Upload className="h-5 w-5 mr-2 animate-bounce" />
            Processing Secure Upload...
          </>
        ) : (
          <>
            <Upload className="h-5 w-5 mr-2" />
            📊 Start Secure Upload Demo
          </>
        )}
      </button>

      {/* Upload Progress Display */}
      {uploadProgress && (
        <div className="space-y-4">
          {/* Current Phase */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                {getPhaseIcon(uploadProgress.phase)}
                <div>
                  <div className="font-medium text-gray-900">{getPhaseText(uploadProgress.phase)}</div>
                  <div className="text-sm text-gray-600">{uploadProgress.fileName}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{uploadProgress.progress}%</div>
                <div className="text-sm text-gray-600">{uploadProgress.speed}</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`bg-gradient-to-r ${getPhaseColor(uploadProgress.phase)} h-3 rounded-full transition-all duration-300`}
                style={{ width: `${uploadProgress.progress}%` }}
              />
            </div>
          </div>

          {/* Upload Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">Time Remaining</div>
              <div className="text-lg font-bold text-gray-900 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {uploadProgress.timeRemaining}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">Files Progress</div>
              <div className="text-lg font-bold text-gray-900">
                {uploadProgress.completedFiles}/{uploadProgress.totalFiles}
              </div>
            </div>
          </div>

          {/* Security Phases Checklist */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Security Pipeline:</h4>
            <div className="space-y-2">
              {['validating', 'scanning', 'encrypting', 'uploading'].map((phase, index) => {
                const isCurrent = uploadProgress.phase === phase;
                const isComplete = ['validating', 'scanning', 'encrypting', 'uploading'].indexOf(uploadProgress.phase) > index;
                
                return (
                  <div key={phase} className={`flex items-center space-x-3 p-2 rounded ${
                    isCurrent ? 'bg-blue-100 border border-blue-200' : 
                    isComplete ? 'bg-green-100 border border-green-200' : 
                    'bg-gray-100 border border-gray-200'
                  }`}>
                    {isComplete ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : isCurrent ? (
                      <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-gray-400 rounded-full" />
                    )}
                    <span className={`text-sm ${
                      isCurrent ? 'text-blue-800 font-medium' :
                      isComplete ? 'text-green-800' :
                      'text-gray-600'
                    }`}>
                      {getPhaseText(phase)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Completion Message */}
          {uploadProgress.phase === 'complete' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <div>
                  <div className="font-bold text-green-800">🎉 Upload Successful!</div>
                  <div className="text-sm text-green-700">
                    File has been securely uploaded and encrypted with military-grade protection.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Progress Features */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">🛡️ Upload Security:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>📊 Real-time progress tracking</div>
          <div>🔒 Multi-phase security</div>
          <div>⚡ High-speed processing</div>
          <div>🛡️ Error recovery</div>
          <div>📋 Complete audit logging</div>
          <div>🎯 99.8% success rate</div>
        </div>
      </div>
    </div>
  );
};

export default UploadProgress;