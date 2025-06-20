import React, { useState, useEffect } from 'react';
import { CreditCard, Calendar, Clock, CheckCircle, XCircle, RotateCcw, Eye } from 'lucide-react';
import { PaymentService, PaymentTransaction } from '../../services/paymentService';

const PaymentHistory: React.FC = () => {
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentTransaction | null>(null);

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const fetchPaymentHistory = async () => {
    try {
      setIsLoading(true);
      const paymentHistory = await PaymentService.getPaymentHistory();
      setPayments(paymentHistory);
    } catch (err) {
      setError('Failed to load payment history');
      console.error('Error fetching payment history:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'refunded':
        return <RotateCcw className="h-5 w-5 text-yellow-500" />;
      case 'pending':
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'failed':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'refunded':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'pending':
      case 'processing':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-700">Loading payment history...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="text-center py-8">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Payments</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={fetchPaymentHistory}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
          <p className="text-gray-600">View all your appointment payments and transactions</p>
        </div>
        <CreditCard className="h-8 w-8 text-blue-600" />
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-12">
          <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Payments Yet</h3>
          <p className="text-gray-500">Your payment history will appear here after you book appointments.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(payment.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {payment.appointment_data?.type || 'Appointment Payment'}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {payment.appointment_data?.date && payment.appointment_data?.time ? 
                          `${payment.appointment_data.date} at ${payment.appointment_data.time}` :
                          formatDate(payment.created_at)
                        }
                      </span>
                      {payment.appointment_data?.department && (
                        <span>• {payment.appointment_data.department}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(payment.amount)}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {payment.payment_method}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPayment(payment)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Payment Details</h2>
              <button
                onClick={() => setSelectedPayment(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Status</span>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(selectedPayment.status)}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedPayment.status)}`}>
                    {selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Transaction ID */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Transaction ID</span>
                <span className="text-sm font-mono text-gray-900">{selectedPayment.transaction_id}</span>
              </div>

              {/* Reference */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Reference</span>
                <span className="text-sm font-mono text-gray-900">{selectedPayment.reference}</span>
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Amount</span>
                <span className="text-lg font-semibold text-gray-900">{formatCurrency(selectedPayment.amount)}</span>
              </div>

              {/* Payment Method */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Payment Method</span>
                <span className="text-sm text-gray-900 capitalize">{selectedPayment.payment_method}</span>
              </div>

              {/* Created Date */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Created</span>
                <span className="text-sm text-gray-900">{formatDate(selectedPayment.created_at)}</span>
              </div>

              {/* Completed Date */}
              {selectedPayment.completed_at && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">Completed</span>
                  <span className="text-sm text-gray-900">{formatDate(selectedPayment.completed_at)}</span>
                </div>
              )}

              {/* Appointment Details */}
              {selectedPayment.appointment_data && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Appointment Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Type</span>
                      <span className="text-sm text-gray-900">{selectedPayment.appointment_data.type}</span>
                    </div>
                    {selectedPayment.appointment_data.department && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Department</span>
                        <span className="text-sm text-gray-900">{selectedPayment.appointment_data.department}</span>
                      </div>
                    )}
                    {selectedPayment.appointment_data.date && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Date</span>
                        <span className="text-sm text-gray-900">{selectedPayment.appointment_data.date}</span>
                      </div>
                    )}
                    {selectedPayment.appointment_data.time && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Time</span>
                        <span className="text-sm text-gray-900">{selectedPayment.appointment_data.time}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedPayment(null)}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
