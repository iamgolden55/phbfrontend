import React, { useState, useEffect } from 'react';
import { Eye, Lock, FileText, Image, Key, Shield, Download } from 'lucide-react';

interface PreviewData {
  fileName: string;
  fileType: 'image' | 'document' | 'unsupported';
  size: string;
  encryptionKey: string;
  preview: string;
  isEncrypted: boolean;
}

const EncryptedPreview: React.FC = () => {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [previewsGenerated, setPreviewsGenerated] = useState(127);

  useEffect(() => {
    // Simulate real-time preview generation
    const interval = setInterval(() => {
      setPreviewsGenerated(prev => prev + Math.floor(Math.random() * 2));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const generatePreview = async () => {
    setIsGeneratingPreview(true);
    
    // Simulate preview generation
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const mockPreview: PreviewData = {
      fileName: 'Blood_Test_Results.pdf',
      fileType: 'document',
      size: '545 KB',
      encryptionKey: 'AES256-7F3B9E2K',
      preview: 'Patient: John Doe\nDate: 2024-12-08\nTest: Complete Blood Count\n\n[ENCRYPTED CONTENT]\nHemoglobin: [REDACTED]\nWhite Blood Cells: [REDACTED]\nPlatelets: [REDACTED]\n\n*** DOCUMENT ENCRYPTED FOR SECURITY ***',
      isEncrypted: true
    };

    setPreviewData(mockPreview);
    setIsGeneratingPreview(false);
  };

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5 text-purple-600" />;
      case 'document':
        return <FileText className="h-5 w-5 text-blue-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <Eye className="h-5 w-5 mr-2 text-green-600" />
          🔍 Encrypted Preview
        </h3>
        <div className="text-sm text-gray-500">
          Previews: {previewsGenerated}
        </div>
      </div>

      {/* Preview Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">100%</div>
          <div className="text-sm text-purple-700">Encrypted</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">AES-256</div>
          <div className="text-sm text-green-700">Encryption</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">Safe</div>
          <div className="text-sm text-blue-700">Preview</div>
        </div>
      </div>

      {/* Generate Preview Button */}
      <button
        onClick={generatePreview}
        disabled={isGeneratingPreview}
        className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 font-medium flex items-center justify-center transition-all duration-200"
      >
        {isGeneratingPreview ? (
          <>
            <Lock className="h-5 w-5 mr-2 animate-spin" />
            Generating Secure Preview...
          </>
        ) : (
          <>
            <Eye className="h-5 w-5 mr-2" />
            🔍 Generate Encrypted Preview
          </>
        )}
      </button>

      {/* Preview Results */}
      {previewData && (
        <div className="space-y-4">
          {/* File Info */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getFileTypeIcon(previewData.fileType)}
                <div>
                  <div className="font-medium text-gray-900">{previewData.fileName}</div>
                  <div className="text-sm text-gray-600">{previewData.size}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-purple-600" />
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                  ENCRYPTED
                </span>
              </div>
            </div>
          </div>

          {/* Encryption Key */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Key className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-900">Encryption Key:</span>
            </div>
            <div className="font-mono text-sm bg-white p-2 rounded border border-purple-300 text-purple-800">
              🔑 {previewData.encryptionKey}
            </div>
          </div>

          {/* Secure Preview */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-600" />
                Secure Preview Content
              </h4>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                <Download className="h-4 w-4 mr-1" />
                Download
              </button>
            </div>
            
            <div className="bg-white border border-gray-300 rounded p-3 font-mono text-sm text-gray-800 max-h-48 overflow-y-auto">
              {previewData.preview.split('\n').map((line, index) => (
                <div key={index} className={`${
                  line.includes('[ENCRYPTED CONTENT]') || line.includes('[REDACTED]') 
                    ? 'text-purple-600 font-bold' 
                    : line.includes('*** DOCUMENT ENCRYPTED')
                    ? 'text-red-600 font-bold'
                    : 'text-gray-800'
                }`}>
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-yellow-800">Security Notice</div>
                <div className="text-yellow-700">
                  This is a secure preview with sensitive data redacted. Full content requires proper authentication and decryption.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Features */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">🛡️ Preview Security:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>🔒 End-to-end encryption</div>
          <div>🔍 Safe content preview</div>
          <div>🛡️ Data redaction</div>
          <div>🔑 Key-based access</div>
          <div>📋 Audit trail logging</div>
          <div>⚡ Real-time processing</div>
        </div>
      </div>
    </div>
  );
};

export default EncryptedPreview;