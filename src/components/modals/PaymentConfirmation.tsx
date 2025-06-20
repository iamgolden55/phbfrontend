import React from 'react';
import { CheckCircle, XCircle, Clock, CreditCard, Calendar, MapPin, User } from 'lucide-react';

interface PaymentConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  status: 'success' | 'failed' | 'processing';
  paymentData?: {
    transactionId: string;
    reference: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    paidAt?: string;
  };
  appointmentData?: {
    appointmentId?: string;
    appointmentType: string;
    department: string;
    date: string;
    time: string;
    patientName: string;
  };
  onRetry?: () => void;
  onGoToAppointments?: () => void;
}

const PaymentConfirmation: React.FC<PaymentConfirmationProps> = ({
  isOpen,
  onClose,
  status,
  paymentData,
  appointmentData,
  onRetry,
  onGoToAppointments
}) => {
  if (!isOpen) return null;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateTimeString: string): string => {
    return new Date(dateTimeString).toLocaleString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-16 w-16 text-green-500" />;
      case 'failed':
        return <XCircle className="h-16 w-16 text-red-500" />;
      case 'processing':
        return <Clock className="h-16 w-16 text-yellow-500" />;
      default:
        return <Clock className="h-16 w-16 text-gray-500" />;
    }
  };

  const getStatusMessage = () => {
    // Check if this is a free appointment
    const isFreeAppointment = paymentData?.reference === 'waived-payment' || paymentData?.amount === 0;
    
    switch (status) {
      case 'success':
        return {
          title: isFreeAppointment ? 'Appointment Booked Successfully!' : 'Payment Successful!',
          subtitle: isFreeAppointment ? 'Your free appointment has been confirmed.' : 'Your appointment has been booked successfully.',
          description: 'You will receive a confirmation email shortly. A doctor will confirm your appointment soon.'
        };
      case 'failed':
        return {
          title: 'Payment Failed',
          subtitle: 'We could not process your payment.',
          description: 'Please try again with a different payment method or contact support if the issue persists.'
        };
      case 'processing':
        return {
          title: 'Processing...',
          subtitle: 'Verifying your payment and appointment.',
          description: 'Your payment is being verified. Your appointment will be confirmed shortly.'
        };
      default:
        return {
          title: 'Payment Status Unknown',
          subtitle: 'We are checking your payment status.',
          description: 'Please wait a moment while we verify your payment.'
        };
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[95vh] overflow-y-auto border border-gray-100">
        {/* Header with status-based colors */}
        <div className={`text-white p-6 rounded-t-xl ${
          status === 'success' ? 'bg-gradient-to-r from-emerald-500 to-green-600' :
          status === 'failed' ? 'bg-gradient-to-r from-red-500 to-red-600' :
          'bg-gradient-to-r from-blue-500 to-indigo-600'
        }`}>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                {getStatusIcon()}
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">{statusInfo.title}</h2>
            <p className="text-white text-opacity-90">{statusInfo.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Description */}
          <div className={`p-4 rounded-xl border-2 ${
            status === 'success' ? 'bg-emerald-50 border-emerald-200' :
            status === 'failed' ? 'bg-red-50 border-red-200' :
            'bg-blue-50 border-blue-200'
          }`}>
            <p className={`text-sm font-medium ${
              status === 'success' ? 'text-emerald-800' :
              status === 'failed' ? 'text-red-800' :
              'text-blue-800'
            }`}>
              {statusInfo.description}
            </p>
          </div>

          {/* Payment Details */}
          {paymentData && (
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                <CreditCard className="h-5 w-5 mr-2 text-[#005eb8]" />
                {paymentData.reference === 'waived-payment' || paymentData.amount === 0 ? 'Booking Details' : 'Payment Details'}
              </h3>
              <div className="space-y-3">
                {paymentData.reference !== 'waived-payment' && (
                  <>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Transaction ID:</span>
                      <span className="font-mono text-gray-900 text-sm bg-white px-2 py-1 rounded border">
                        {paymentData.transactionId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Reference:</span>
                      <span className="font-mono text-gray-900 text-sm bg-white px-2 py-1 rounded border">
                        {paymentData.reference}
                      </span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Amount:</span>
                  <span className={`font-bold text-lg ${paymentData.amount === 0 ? 'text-green-600' : 'text-[#005eb8]'}`}>
                    {paymentData.amount === 0 ? 'FREE' : formatCurrency(paymentData.amount)}
                  </span>
                </div>
                {paymentData.reference !== 'waived-payment' && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Payment Method:</span>
                    <span className="text-gray-900 capitalize font-medium">{paymentData.paymentMethod}</span>
                  </div>
                )}
                {paymentData.reference === 'waived-payment' && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Booking Type:</span>
                    <span className="text-green-600 font-medium">Free Appointment</span>
                  </div>
                )}
                {paymentData.paidAt && paymentData.reference !== 'waived-payment' && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">Completed:</span>
                    <span className="text-gray-900">{formatDateTime(paymentData.paidAt)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Appointment Details */}
          {appointmentData && status === 'success' && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-200">
              <h3 className="font-bold text-[#005eb8] mb-4 flex items-center text-lg">
                <Calendar className="h-5 w-5 mr-2" />
                Appointment Confirmed
              </h3>
              <div className="space-y-3">
                {appointmentData.appointmentId && (
                  <div className="flex justify-between items-center py-2 border-b border-blue-200">
                    <span className="text-blue-700 font-medium">Appointment ID:</span>
                    <span className="font-mono text-blue-900 text-sm bg-white px-2 py-1 rounded border">
                      {appointmentData.appointmentId}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-blue-700 font-medium">Type:</span>
                  <span className="text-blue-900 font-semibold">{appointmentData.appointmentType}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-blue-700 font-medium">Department:</span>
                  <span className="text-blue-900 font-semibold">{appointmentData.department}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-blue-700 font-medium">Date:</span>
                  <span className="text-blue-900 font-semibold">{formatDate(appointmentData.date)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-blue-200">
                  <span className="text-blue-700 font-medium">Time:</span>
                  <span className="text-blue-900 font-semibold">{appointmentData.time}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-blue-700 font-medium">Patient:</span>
                  <span className="text-blue-900 font-semibold">{appointmentData.patientName}</span>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• You'll receive a confirmation email with appointment details</li>
                <li>• A doctor from the {appointmentData?.department} department will confirm your appointment</li>
                <li>• You'll get a notification when your appointment is confirmed</li>
                <li>• Join your appointment at the scheduled time via your dashboard</li>
              </ul>
            </div>
          )}

          {/* Error Help */}
          {status === 'failed' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-medium text-red-900 mb-2">Need Help?</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Check your card details and try again</li>
                <li>• Ensure you have sufficient funds</li>
                <li>• Try a different payment method</li>
                <li>• Contact your bank if the issue persists</li>
                <li>• Reach out to our support team for assistance</li>
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {status === 'success' && (
              <>
                {onGoToAppointments && (
                  <button
                    onClick={onGoToAppointments}
                    className="w-full bg-gradient-to-r from-[#005eb8] to-[#0070d4] text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-[#004a9f] hover:to-[#005bb3] flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
                  >
                    <Calendar className="h-6 w-6 mr-3" />
                    View My Appointments
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  Close
                </button>
              </>
            )}

            {status === 'failed' && (
              <>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    className="w-full bg-gradient-to-r from-[#005eb8] to-[#0070d4] text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-[#004a9f] hover:to-[#005bb3] transition-all shadow-lg hover:shadow-xl"
                  >
                    Try Again
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  Close
                </button>
              </>
            )}

            {status === 'processing' && (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-10 w-10 border-t-3 border-b-3 border-[#005eb8]"></div>
              </div>
            )}
          </div>

          {/* Support Contact */}
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 leading-relaxed">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@phbhealthcare.com" className="text-[#005eb8] hover:underline font-semibold">
                support@phbhealthcare.com
              </a>
              {' '}or call{' '}
              <a href="tel:+2341234567890" className="text-[#005eb8] hover:underline font-semibold">
                +234 123 456 7890
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
