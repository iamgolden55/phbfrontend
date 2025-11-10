import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Calendar,
  AlertTriangle,
  Pill,
  FileText,
  CheckCircle,
  XCircle,
  Building2,
} from 'lucide-react';
import {
  getPrescriptionRequestDetails,
  approvePrescription,
  rejectPrescription,
  PrescriptionRequestDetail,
  ApprovedMedication,
} from '../features/health/prescriptionsService';

interface Props {
  requestId: string;
  onClose: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}

type ActionView = 'review' | 'approve' | 'reject';

const PrescriptionRequestModal: React.FC<Props> = ({
  requestId,
  onClose,
  onApprove,
  onReject,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [request, setRequest] = useState<PrescriptionRequestDetail | null>(null);
  const [actionView, setActionView] = useState<ActionView>('review');
  const [submitting, setSubmitting] = useState(false);

  // Approval form state
  const [approvedMeds, setApprovedMeds] = useState<ApprovedMedication[]>([]);
  const [clinicalNotes, setClinicalNotes] = useState('');

  // Rejection form state
  const [rejectionReason, setRejectionReason] = useState('');
  const [requiresFollowUp, setRequiresFollowUp] = useState(false);

  useEffect(() => {
    loadRequestDetails();
  }, [requestId]);

  const loadRequestDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      const details = await getPrescriptionRequestDetails(requestId);
      setRequest(details);

      // Initialize approval form with requested medications
      setApprovedMeds(
        details.medications.map((med) => ({
          medication_name: med.medication_name,
          strength: med.strength || '',
          form: med.form || '',
          quantity: med.quantity || 30,
          dosage_instructions: med.dosage || '',
          refills_allowed: 0,
        }))
      );
    } catch (err) {
      console.error('Error loading request details:', err);
      setError('Failed to load prescription request details');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!approvedMeds.every((med) => med.quantity > 0 && med.dosage_instructions.trim())) {
      alert('Please fill in quantity and dosage instructions for all medications');
      return;
    }

    setSubmitting(true);

    try {
      await approvePrescription(requestId, approvedMeds, clinicalNotes);
      alert('Prescription approved successfully!');
      onApprove?.();
      onClose();
    } catch (err) {
      console.error('Error approving prescription:', err);
      alert('Failed to approve prescription. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    setSubmitting(true);

    try {
      await rejectPrescription(requestId, rejectionReason, requiresFollowUp);
      alert('Prescription request rejected');
      onReject?.();
      onClose();
    } catch (err) {
      console.error('Error rejecting prescription:', err);
      alert('Failed to reject prescription. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading request details...</p>
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <p className="text-red-800 font-medium mb-4">{error || 'Request not found'}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
        {/* Header */}
        <div className={`sticky top-0 z-10 flex justify-between items-center p-6 border-b ${
          request.urgency === 'urgent' ? 'bg-red-50 border-red-200' : 'bg-gray-50'
        }`}>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {request.urgency === 'urgent' && <AlertTriangle className="w-6 h-6 text-red-600" />}
              Prescription Request
            </h2>
            <p className="text-gray-600 font-mono text-sm">{request.request_reference}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {actionView === 'review' && (
            <>
              {/* Patient Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Patient Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Name</p>
                    <p className="text-blue-900">{request.patient.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700 font-medium">HPN</p>
                    <p className="text-blue-900 font-mono">{request.patient.hpn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Date of Birth</p>
                    <p className="text-blue-900">{request.patient.dob}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Age</p>
                    <p className="text-blue-900">{request.patient.age} years</p>
                  </div>
                </div>

                {request.patient.allergies && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                    <p className="text-sm text-red-700 font-bold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      ALLERGIES
                    </p>
                    <p className="text-red-900 font-medium">{request.patient.allergies}</p>
                  </div>
                )}

                {request.patient.current_medications && request.patient.current_medications.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-blue-700 font-bold mb-2">Current Medications:</p>
                    <ul className="list-disc list-inside text-blue-900 space-y-1">
                      {request.patient.current_medications.map((med, index) => (
                        <li key={index} className="text-sm">{med}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Request Details */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Request Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Request Date</p>
                    <p className="text-gray-900">
                      {new Date(request.request_date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Urgency</p>
                    <p className="text-gray-900">
                      {request.urgency === 'urgent' ? (
                        <span className="text-red-600 font-bold">🚨 URGENT</span>
                      ) : (
                        'Routine'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Medications Requested */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Pill className="w-5 h-5" />
                  Requested Medications ({request.medications.length})
                </h3>
                <div className="space-y-3">
                  {request.medications.map((med, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-bold text-gray-900">{med.medication_name}</p>
                          <p className="text-sm text-gray-600">
                            {med.strength && `${med.strength} - `}
                            {med.form}
                            {med.quantity && ` × ${med.quantity}`}
                          </p>
                          {med.dosage && (
                            <p className="text-sm text-gray-700 mt-1">
                              <span className="font-medium">Dosage:</span> {med.dosage}
                            </p>
                          )}
                          {med.reason && (
                            <p className="text-sm text-gray-700 mt-1">
                              <span className="font-medium">Reason:</span> {med.reason}
                            </p>
                          )}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            med.is_repeat
                              ? 'bg-green-100 text-green-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {med.is_repeat ? 'Repeat' : 'New'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Notes */}
              {request.additional_notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Patient's Additional Notes
                  </h3>
                  <p className="text-yellow-900 italic">&ldquo;{request.additional_notes}&rdquo;</p>
                </div>
              )}

              {/* Pharmacy Info */}
              {request.pharmacy && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                  <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    Nominated Pharmacy
                  </h3>
                  <p className="text-purple-900 font-medium">{request.pharmacy.name}</p>
                  <p className="text-purple-700 text-sm">
                    {request.pharmacy.address_line_1}, {request.pharmacy.city}, {request.pharmacy.postcode}
                  </p>
                  {request.pharmacy.phone && (
                    <p className="text-purple-700 text-sm mt-1">📞 {request.pharmacy.phone}</p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {request.status === 'REQUESTED' && (
                <div className="flex gap-4 sticky bottom-0 bg-white pt-4 border-t">
                  <button
                    onClick={() => setActionView('approve')}
                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approve & Issue Prescription
                  </button>
                  <button
                    onClick={() => setActionView('reject')}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject Request
                  </button>
                </div>
              )}
            </>
          )}

          {actionView === 'approve' && (
            <>
              <button
                onClick={() => setActionView('review')}
                className="mb-4 text-blue-600 hover:text-blue-700 flex items-center gap-2"
              >
                ← Back to Review
              </button>

              <h3 className="text-xl font-bold mb-4">Approve Prescription</h3>

              <div className="space-y-4 mb-6">
                {approvedMeds.map((med, index) => (
                  <div key={index} className="p-4 border border-gray-300 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly
                        className="w-4 h-4"
                      />
                      <p className="font-bold">{med.medication_name}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Quantity *
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={med.quantity}
                          onChange={(e) => {
                            const updated = [...approvedMeds];
                            updated[index].quantity = parseInt(e.target.value) || 0;
                            setApprovedMeds(updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Refills (0-11)
                        </label>
                        <select
                          value={med.refills_allowed}
                          onChange={(e) => {
                            const updated = [...approvedMeds];
                            updated[index].refills_allowed = parseInt(e.target.value);
                            setApprovedMeds(updated);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          {[...Array(12)].map((_, i) => (
                            <option key={i} value={i}>
                              {i} {i === 1 ? 'refill' : 'refills'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dosage Instructions *
                      </label>
                      <textarea
                        value={med.dosage_instructions}
                        onChange={(e) => {
                          const updated = [...approvedMeds];
                          updated[index].dosage_instructions = e.target.value;
                          setApprovedMeds(updated);
                        }}
                        placeholder="e.g., Take 1 tablet twice daily with food"
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Clinical Notes (optional)
                </label>
                <textarea
                  value={clinicalNotes}
                  onChange={(e) => setClinicalNotes(e.target.value)}
                  placeholder="Any clinical notes or instructions for the patient..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleApprove}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400"
                >
                  {submitting ? 'Approving...' : 'Confirm Approval'}
                </button>
                <button
                  onClick={() => setActionView('review')}
                  disabled={submitting}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {actionView === 'reject' && (
            <>
              <button
                onClick={() => setActionView('review')}
                className="mb-4 text-blue-600 hover:text-blue-700 flex items-center gap-2"
              >
                ← Back to Review
              </button>

              <h3 className="text-xl font-bold mb-4">Reject Prescription Request</h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Rejection *
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Please provide a detailed clinical reason for rejecting this prescription request..."
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={requiresFollowUp}
                    onChange={(e) => setRequiresFollowUp(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">
                    Patient requires follow-up appointment
                  </span>
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleReject}
                  disabled={submitting || !rejectionReason.trim()}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:bg-gray-400"
                >
                  {submitting ? 'Rejecting...' : 'Confirm Rejection'}
                </button>
                <button
                  onClick={() => setActionView('review')}
                  disabled={submitting}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionRequestModal;
