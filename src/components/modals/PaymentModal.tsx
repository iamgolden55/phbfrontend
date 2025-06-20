import React, { useState, useEffect } from 'react';
import { X, CreditCard, Shield, Clock } from 'lucide-react';
import { PaymentService } from '../../services/paymentService'; // 🔥 IMPORT REAL SERVICE

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (transactionData: any) => void;
  onPaymentError: (error: string) => void;
  appointmentData: {
    amount: number;
    currency: string;
    appointmentType: string;
    patientEmail: string;
    patientName: string;
    appointmentDate: string;
    appointmentTime: string;
    department: string;
    paymentReference?: string; // 🎯 ADD OPTIONAL BACKEND REFERENCE
  };
}

interface PaystackResponse {
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  message: string;
  redirecturl: string;
}

// Declare PaystackPop as global
declare global {
  interface Window {
    PaystackPop: {
      setup: (options: any) => {
        openIframe: () => void;
      };
    };
  }
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  onPaymentError,
  appointmentData
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer' | 'ussd'>('card');
  const [isPaystackLoaded, setIsPaystackLoaded] = useState(false);

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setIsPaystackLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const scripts = document.querySelectorAll('script[src="https://js.paystack.co/v1/inline.js"]');
      scripts.forEach(script => document.body.removeChild(script));
    };
  }, []);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const generateTransactionReference = (): string => {
    return `PHB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const initializePaystackPayment = () => {
    if (!isPaystackLoaded || !window.PaystackPop) {
      onPaymentError('Paystack is not loaded. Please refresh and try again.');
      return;
    }

    setIsProcessing(true);
    
    // 🎯 USE BACKEND REFERENCE IF PROVIDED, OTHERWISE GENERATE
    const reference = appointmentData.paymentReference || generateTransactionReference();
    
    // Debug: Log the key being used
    const paystackKey = 'pk_test_d1ef452c29d9807316c5dcc49aa064bfe33883a5'; // CORRECTED KEY
    console.log('Using Paystack key:', paystackKey);
    console.log('Using payment reference:', reference);

    const handler = window.PaystackPop.setup({
      key: paystackKey, // Direct key for testing
      email: appointmentData.patientEmail,
      amount: appointmentData.amount * 100, // Convert to kobo
      currency: appointmentData.currency,
      ref: reference,
      label: 'PHB Healthcare - Appointment Booking',
      metadata: {
        custom_fields: [
          {
            display_name: 'Appointment Type',
            variable_name: 'appointment_type',
            value: appointmentData.appointmentType
          },
          {
            display_name: 'Department',
            variable_name: 'department',
            value: appointmentData.department
          },
          {
            display_name: 'Appointment Date',
            variable_name: 'appointment_date',
            value: appointmentData.appointmentDate
          },
          {
            display_name: 'Appointment Time',
            variable_name: 'appointment_time',
            value: appointmentData.appointmentTime
          }
        ]
      },
      onClose: function() {
        setIsProcessing(false);
        // Don't close the modal automatically - let user decide
      },
      callback: function(response: PaystackResponse) {
        setIsProcessing(false);
        if (response.status === 'success') {
          // Verify payment on backend (mock for now)
          verifyPayment(response.reference, response);
        } else {
          onPaymentError('Payment was not successful. Please try again.');
        }
      }
    });

    handler.openIframe();
  };

  const verifyPayment = async (reference: string, paymentResponse: PaystackResponse) => {
    try {
      setIsProcessing(true);
      
      console.log('🔍 Verifying REAL payment with backend:', reference);
      console.log('🔍 Paystack response:', paymentResponse);
      
      // 🔥 USE REAL PAYMENTSERVICE INSTEAD OF MOCK!
      const verificationResult = await PaymentService.verifyPayment(reference);
      
      console.log('🔍 Backend verification result:', verificationResult);
      
      // ✅ IMPROVED: Better validation logic for backend responses
      if (verificationResult.status === 'success' && verificationResult.data) {
        // Check if payment transaction status indicates success
        const paymentStatus = verificationResult.data.status;
        
        if (paymentStatus === 'completed') {
          console.log('✅ Payment completed successfully:', verificationResult.data);
          onPaymentSuccess({
            ...verificationResult.data,
            paystack_response: paymentResponse
          });
        } else if (paymentStatus === 'pending' || paymentStatus === 'processing') {
          // Handle pending/processing status - might need to retry
          console.log('⏳ Payment still processing, status:', paymentStatus);
          onPaymentError(`Payment is still ${paymentStatus}. Please wait a moment and check your appointment status.`);
        } else {
          // Payment failed
          console.log('❌ Payment failed with status:', paymentStatus);
          onPaymentError(`Payment ${paymentStatus}. Please try again or contact support.`);
        }
      } else {
        // Backend verification itself failed
        const errorMessage = verificationResult.message || 'Payment verification failed';
        console.error('❌ Backend verification failed:', errorMessage);
        onPaymentError(errorMessage + '. Please contact support if you were charged.');
      }
    } catch (error: any) {
      console.error('💥 Payment verification error:', error);
      onPaymentError(error.message || 'Payment verification failed. Please contact support if you were charged.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMobileMoneyPayment = () => {
    // TODO: Implement mobile money payment flow
    onPaymentError('Mobile money payment is coming soon. Please use card payment.');
  };

  const handleUSSDPayment = () => {
    // TODO: Implement USSD payment flow
    onPaymentError('USSD payment is coming soon. Please use card payment.');
  };

  const processPayment = () => {
    switch (paymentMethod) {
      case 'card':
        initializePaystackPayment();
        break;
      case 'bank_transfer':
        handleMobileMoneyPayment();
        break;
      case 'ussd':
        handleUSSDPayment();
        break;
      default:
        onPaymentError('Please select a payment method.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Complete Payment</h2>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Payment Summary */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-3">Appointment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Type:</span>
                <span className="font-medium text-blue-900">{appointmentData.appointmentType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Department:</span>
                <span className="font-medium text-blue-900">{appointmentData.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Date:</span>
                <span className="font-medium text-blue-900">{appointmentData.appointmentDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Time:</span>
                <span className="font-medium text-blue-900">{appointmentData.appointmentTime}</span>
              </div>
              <div className="border-t border-blue-200 pt-2 mt-3">
                <div className="flex justify-between">
                  <span className="text-blue-700 font-medium">Total Amount:</span>
                  <span className="font-bold text-blue-900 text-lg">
                    {formatCurrency(appointmentData.amount)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Select Payment Method</h3>
            <div className="space-y-3">
              {/* Card Payment */}
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <CreditCard className="h-5 w-5 text-gray-600 ml-3 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Debit/Credit Card</div>
                  <div className="text-sm text-gray-500">Visa, Mastercard, Verve</div>
                </div>
              </label>

              {/* Mobile Money */}
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 opacity-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'bank_transfer')}
                  disabled
                  className="text-blue-600 focus:ring-blue-500"
                />
                <Shield className="h-5 w-5 text-gray-600 ml-3 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Mobile Money</div>
                  <div className="text-sm text-gray-500">Coming Soon</div>
                </div>
              </label>

              {/* USSD */}
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 opacity-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ussd"
                  checked={paymentMethod === 'ussd'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'ussd')}
                  disabled
                  className="text-blue-600 focus:ring-blue-500"
                />
                <Clock className="h-5 w-5 text-gray-600 ml-3 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">USSD Banking</div>
                  <div className="text-sm text-gray-500">Coming Soon</div>
                </div>
              </label>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex">
              <Shield className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-green-700">
                <p className="font-medium">Secure Payment</p>
                <p>Your payment is protected by bank-level security encryption.</p>
              </div>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={processPayment}
            disabled={isProcessing || !isPaystackLoaded}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              `Pay ${formatCurrency(appointmentData.amount)}`
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By clicking "Pay", you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
