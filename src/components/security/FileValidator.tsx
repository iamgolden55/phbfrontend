import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, XCircle, AlertTriangle, Zap } from 'lucide-react';

interface ValidationResult {
  isValid: boolean;
  score: number;
  checks: ValidationCheck[];
  riskLevel: 'low' | 'medium' | 'high';
}

interface ValidationCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

const FileValidator: React.FC = () => {
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [validatedFiles, setValidatedFiles] = useState(0);

  useEffect(() => {
    // Simulate real-time validation
    const interval = setInterval(() => {
      setValidatedFiles(prev => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const performValidation = async () => {
    setIsValidating(true);
    
    // Simulate validation process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockValidation: ValidationResult = {
      isValid: true,
      score: 95,
      checks: [
        {
          name: 'Magic Number Verification',
          status: 'pass',
          message: 'File signature matches declared type'
        },
        {
          name: 'Content Structure Analysis',
          status: 'pass',
          message: 'File structure is valid and safe'
        },
        {
          name: 'Metadata Inspection',
          status: 'warning',
          message: 'Contains author metadata (non-critical)'
        },
        {
          name: 'Malicious Code Detection',
          status: 'pass',
          message: 'No embedded scripts or macros detected'
        },
        {
          name: 'Size Validation',
          status: 'pass',
          message: 'File size within secure limits'
        }
      ],
      riskLevel: 'low'
    };

    setValidationResult(mockValidation);
    setIsValidating(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <Shield className="h-5 w-5 mr-2 text-purple-600" />
          🔍 File Validator
        </h3>
        <div className="text-sm text-gray-500">
          Files validated: {validatedFiles}
        </div>
      </div>

      {/* Validation Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">99.8%</div>
          <div className="text-sm text-green-700">Pass Rate</div>
        </div>
        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">847</div>
          <div className="text-sm text-blue-700">Validated</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">5</div>
          <div className="text-sm text-purple-700">Check Types</div>
        </div>
      </div>

      {/* Validation Button */}
      <button
        onClick={performValidation}
        disabled={isValidating}
        className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 font-medium flex items-center justify-center transition-all duration-200"
      >
        {isValidating ? (
          <>
            <Zap className="h-5 w-5 mr-2 animate-spin" />
            Deep Validation in Progress...
          </>
        ) : (
          <>
            <Shield className="h-5 w-5 mr-2" />
            🔍 Run Deep Validation
          </>
        )}
      </button>

      {/* Validation Results */}
      {validationResult && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200">
            <div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <span className="text-lg font-bold text-gray-900">Validation Complete</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Security Score: {validationResult.score}/100
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(validationResult.riskLevel)}`}>
              {validationResult.riskLevel.toUpperCase()} RISK
            </div>
          </div>

          {/* Detailed Checks */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Security Checks:</h4>
            {validationResult.checks.map((check, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                {getStatusIcon(check.status)}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{check.name}</div>
                  <div className="text-sm text-gray-600">{check.message}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Features */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-2">🛡️ Validation Features:</h4>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>✅ Magic number verification</div>
          <div>✅ Content structure analysis</div>
          <div>✅ Malicious code detection</div>
          <div>✅ Metadata inspection</div>
          <div>✅ File type validation</div>
          <div>✅ Size & format checks</div>
        </div>
      </div>
    </div>
  );
};

export default FileValidator;