import React, { useEffect } from 'react';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';

interface PrescriptionData {
  id: string;
  medication: string;
  strength?: string;
  form?: string;
  route?: string;
  dosage: string;
  frequency?: string;
  duration?: string;
  patient_instructions?: string;
  indication?: string;
  prescribed: string;
  prescriber: string;
  generic_name?: string;
  nominated_pharmacy?: {
    name: string;
    address_line_1: string;
    city: string;
    postcode: string;
    phone: string;
    phb_pharmacy_code: string;
  } | null;
  signed_prescription_data?: {
    payload: {
      type: string;
      id: string;
      nonce: string;
      hpn: string;
      medication: string;
      strength?: string;
      patient: string;
      prescriber: string;
      dosage: string;
      frequency: string;
      pharmacy: any | null;
      issued: string;
      expiry: string;
    };
    signature: string;
  } | null;
}

interface UserData {
  full_name?: string;
  email?: string;
  hpn?: string;
  phoneNumber?: string;
}

interface PrintablePrescriptionProps {
  prescription: PrescriptionData;
  user: UserData;
  format: 'electronic' | 'paper' | null;
  onClose: () => void;
}

const PrintablePrescription: React.FC<PrintablePrescriptionProps> = ({
  prescription,
  user,
  format,
  onClose,
}) => {
  useEffect(() => {
    if (format) {
      // Trigger print after a short delay
      const timer = setTimeout(() => {
        window.print();
        onClose();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [format, onClose]);

  if (!format) return null;

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-prescription, .printable-prescription * {
            visibility: visible;
          }
          .printable-prescription {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            size: A4;
            margin: 20mm;
          }
        }
        @media screen {
          .printable-prescription {
            display: block;
          }
        }
      `}</style>

      <div className="printable-prescription">
        {format === 'electronic' ? (
          <ElectronicPrescriptionToken prescription={prescription} user={user} />
        ) : (
          <PaperPrescriptionForm prescription={prescription} user={user} />
        )}
      </div>
    </>
  );
};

// Electronic Prescription Token Component
const ElectronicPrescriptionToken: React.FC<{
  prescription: PrescriptionData;
  user: UserData;
}> = ({ prescription, user }) => {
  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);
  const expiryDateStr = expiryDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ borderBottom: '4px solid #005eb8', paddingBottom: '20px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <h1 style={{ color: '#005eb8', margin: '0 0 10px 0', fontSize: '28px', fontWeight: 'bold' }}>
              Electronic Prescription Token
            </h1>
            <p style={{ color: '#4c6272', margin: '0', fontSize: '14px' }}>
              Public Health Bureau (PHB) - Nigeria
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#666' }}>
              <strong>Issue Date:</strong> {today}
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
              <strong>Valid Until:</strong> {expiryDateStr}
            </div>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div style={{
        backgroundColor: '#e8f4f8',
        border: '2px solid #005eb8',
        padding: '15px',
        marginBottom: '30px',
        borderRadius: '4px'
      }}>
        <p style={{ margin: '0', fontSize: '14px', fontWeight: 'bold', color: '#005eb8' }}>
          📋 Present this token at any registered pharmacy to collect your prescription
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#4c6272' }}>
          This electronic prescription can be dispensed at any pharmacy in Nigeria
        </p>
      </div>

      {/* QR Code and Prescription ID */}
      <div style={{ display: 'flex', gap: '30px', marginBottom: '30px' }}>
        <div style={{
          padding: '10px',
          backgroundColor: 'white',
          border: '2px solid #005eb8',
          borderRadius: '4px'
        }}>
          <QRCode
            value={JSON.stringify({
              payload: prescription.signed_prescription_data?.payload || {
                type: 'PHB_PRESCRIPTION',
                id: `PHB-RX-${prescription.id.toString().padStart(8, '0')}`,
                nonce: 'legacy',
                hpn: user.hpn,
                medication: prescription.medication,
                patient: user.full_name || 'Patient',
                prescriber: prescription.prescriber,
                dosage: prescription.dosage,
                frequency: prescription.frequency || 'As directed',
                pharmacy: prescription.nominated_pharmacy ? {
                  name: prescription.nominated_pharmacy.name,
                  code: prescription.nominated_pharmacy.phb_pharmacy_code,
                  address: prescription.nominated_pharmacy.address_line_1,
                  city: prescription.nominated_pharmacy.city,
                  postcode: prescription.nominated_pharmacy.postcode,
                  phone: prescription.nominated_pharmacy.phone
                } : null,
                issued: new Date().toISOString(),
                expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
              },
              signature: prescription.signed_prescription_data?.signature || 'unsigned'
            })}
            size={130}
            level="M"
          />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '3px' }}>Prescription ID</div>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              color: '#005eb8',
              letterSpacing: '2px'
            }}>
              PHB-RX-{prescription.id.toString().padStart(8, '0')}
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <div style={{ fontSize: '11px', color: '#666', marginBottom: '5px' }}>
              <strong>Barcode:</strong>
            </div>
            <Barcode
              value={prescription.id.toString().padStart(8, '0')}
              format="CODE128"
              width={2}
              height={50}
              displayValue={true}
              fontSize={12}
              margin={0}
            />
          </div>
        </div>
      </div>

      {/* Patient Information */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#005eb8',
          borderBottom: '2px solid #005eb8',
          paddingBottom: '8px',
          marginBottom: '15px'
        }}>
          Patient Information
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '13px' }}>
          <div>
            <div style={{ color: '#666', fontSize: '11px', marginBottom: '3px' }}>Full Name</div>
            <div style={{ fontWeight: 'bold' }}>
              {user.full_name || 'N/A'}
            </div>
          </div>
          <div>
            <div style={{ color: '#666', fontSize: '11px', marginBottom: '3px' }}>Health Patient Number (HPN)</div>
            <div style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{user.hpn || 'N/A'}</div>
          </div>
          <div>
            <div style={{ color: '#666', fontSize: '11px', marginBottom: '3px' }}>Contact</div>
            <div>{user.phoneNumber || user.email || 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* Prescription Details */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#005eb8',
          borderBottom: '2px solid #005eb8',
          paddingBottom: '8px',
          marginBottom: '15px'
        }}>
          Prescription Details
        </h2>

        <div style={{
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '4px',
          border: '1px solid #e0e0e0'
        }}>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
              {prescription.medication}
            </div>
            {prescription.generic_name && (
              <div style={{ fontSize: '13px', color: '#666', marginTop: '3px' }}>
                Generic: {prescription.generic_name}
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '10px', fontSize: '13px' }}>
            <div style={{ color: '#666' }}>Strength:</div>
            <div style={{ fontWeight: '500' }}>{prescription.strength || 'As prescribed'}</div>

            <div style={{ color: '#666' }}>Form:</div>
            <div style={{ fontWeight: '500', textTransform: 'capitalize' }}>{prescription.form || 'N/A'}</div>

            <div style={{ color: '#666' }}>Route:</div>
            <div style={{ fontWeight: '500', textTransform: 'capitalize' }}>{prescription.route || 'N/A'}</div>

            <div style={{ color: '#666' }}>Dosage:</div>
            <div style={{ fontWeight: '500' }}>{prescription.dosage}</div>

            {prescription.frequency && (
              <>
                <div style={{ color: '#666' }}>Frequency:</div>
                <div style={{ fontWeight: '500' }}>{prescription.frequency}</div>
              </>
            )}

            {prescription.duration && (
              <>
                <div style={{ color: '#666' }}>Duration:</div>
                <div style={{ fontWeight: '500' }}>{prescription.duration}</div>
              </>
            )}
          </div>

          {prescription.patient_instructions && (
            <div style={{
              marginTop: '15px',
              paddingTop: '15px',
              borderTop: '1px solid #e0e0e0'
            }}>
              <div style={{ color: '#666', fontSize: '12px', marginBottom: '5px' }}>
                Instructions:
              </div>
              <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                {prescription.patient_instructions}
              </div>
            </div>
          )}

          {prescription.indication && (
            <div style={{ marginTop: '10px' }}>
              <div style={{ color: '#666', fontSize: '12px', marginBottom: '5px' }}>
                Indication:
              </div>
              <div style={{ fontSize: '13px' }}>{prescription.indication}</div>
            </div>
          )}
        </div>
      </div>

      {/* Prescriber Information */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#005eb8',
          borderBottom: '2px solid #005eb8',
          paddingBottom: '8px',
          marginBottom: '15px'
        }}>
          Prescriber Information
        </h2>
        <div style={{ fontSize: '13px' }}>
          <div><strong>Prescribed by:</strong> {prescription.prescriber}</div>
          <div style={{ marginTop: '5px' }}>
            <strong>Date prescribed:</strong> {new Date(prescription.prescribed).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </div>
      </div>

      {/* Nominated Pharmacy (if available) */}
      {prescription.nominated_pharmacy && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#005eb8',
            borderBottom: '2px solid #005eb8',
            paddingBottom: '8px',
            marginBottom: '15px'
          }}>
            Nominated Pharmacy
          </h2>
          <div style={{ fontSize: '13px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {prescription.nominated_pharmacy.name}
            </div>
            <div>{prescription.nominated_pharmacy.address_line_1}</div>
            <div>{prescription.nominated_pharmacy.city}, {prescription.nominated_pharmacy.postcode}</div>
            <div style={{ marginTop: '5px' }}>Phone: {prescription.nominated_pharmacy.phone}</div>
            <div style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>
              Code: {prescription.nominated_pharmacy.phb_pharmacy_code}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        borderTop: '2px solid #e0e0e0',
        paddingTop: '20px',
        marginTop: '40px',
        fontSize: '11px',
        color: '#666'
      }}>
        <div style={{ marginBottom: '10px' }}>
          <strong>Important Notes:</strong>
        </div>
        <ul style={{ margin: '0', paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>This prescription is valid for 30 days from the issue date</li>
          <li>Present this token along with valid ID at any registered pharmacy</li>
          <li>Keep this prescription safe - it cannot be reissued</li>
          <li>For repeat prescriptions, contact your healthcare provider</li>
          <li>In case of emergency, call PHB Emergency Line: 0800-PHB-CARE</li>
        </ul>

        <div style={{ marginTop: '20px', textAlign: 'center', color: '#999', fontSize: '10px' }}>
          This is a computer-generated prescription token from Public Health Bureau (PHB) Electronic Prescription Service
        </div>
      </div>
    </div>
  );
};

// Paper Prescription Form Component (FP10-style)
const PaperPrescriptionForm: React.FC<{
  prescription: PrescriptionData;
  user: UserData;
}> = ({ prescription, user }) => {
  const today = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  // Split full_name into first and last names
  const nameParts = (user.full_name || '').trim().split(' ');
  const lastName = nameParts.length > 0 ? nameParts[nameParts.length - 1] : '';
  const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : nameParts[0] || '';

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      {/* Green Header (NHS-style) */}
      <div style={{
        backgroundColor: '#00703c',
        color: 'white',
        padding: '15px 20px',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold' }}>
          PHB PRESCRIPTION FORM
        </h1>
        <div style={{ fontSize: '12px', marginTop: '5px' }}>
          Public Health Bureau - Federal Republic of Nigeria
        </div>
      </div>

      {/* Form Number */}
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <div style={{
          display: 'inline-block',
          border: '2px solid #00703c',
          padding: '8px 15px',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          Form PHB-RX10 (Nigeria)
        </div>
      </div>

      {/* Patient Details Section */}
      <div style={{
        border: '2px solid #000',
        padding: '15px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>
          PATIENT DETAILS
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '8px', fontSize: '13px' }}>
          <div>Surname:</div>
          <div style={{ borderBottom: '1px solid #333', fontWeight: 'bold' }}>{lastName}</div>

          <div>First Name(s):</div>
          <div style={{ borderBottom: '1px solid #333', fontWeight: 'bold' }}>{firstName}</div>

          <div>HPN:</div>
          <div style={{ borderBottom: '1px solid #333', fontWeight: 'bold', fontFamily: 'monospace' }}>
            {user.hpn || 'N/A'}
          </div>

          <div>Date of Birth:</div>
          <div style={{ borderBottom: '1px solid #333' }}>___ / ___ / ______</div>

          <div>Address:</div>
          <div style={{ borderBottom: '1px solid #333' }}>_________________________________</div>
        </div>
      </div>

      {/* Prescription Details */}
      <div style={{
        border: '3px double #000',
        minHeight: '250px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: 'white'
      }}>
        <div style={{
          fontWeight: 'bold',
          marginBottom: '15px',
          fontSize: '14px',
          textTransform: 'uppercase',
          borderBottom: '2px solid #000',
          paddingBottom: '5px'
        }}>
          Rx - Prescription
        </div>

        <div style={{ fontSize: '14px', lineHeight: '2' }}>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
              {prescription.medication} {prescription.strength}
            </div>
            {prescription.generic_name && (
              <div style={{ fontSize: '12px', color: '#666', marginTop: '3px' }}>
                (Generic: {prescription.generic_name})
              </div>
            )}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Form:</strong> {prescription.form || 'N/A'}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Dosage:</strong> {prescription.dosage}
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Frequency:</strong> {prescription.frequency || 'As directed'}
          </div>

          {prescription.duration && (
            <div style={{ marginBottom: '10px' }}>
              <strong>Duration:</strong> {prescription.duration}
            </div>
          )}

          {prescription.patient_instructions && (
            <div style={{
              marginTop: '15px',
              paddingTop: '10px',
              borderTop: '1px dashed #ccc'
            }}>
              <strong>Instructions:</strong>
              <div style={{ marginTop: '5px', lineHeight: '1.6' }}>
                {prescription.patient_instructions}
              </div>
            </div>
          )}

          <div style={{
            marginTop: '20px',
            fontSize: '12px',
            color: '#666'
          }}>
            <div><strong>Indication:</strong> {prescription.indication || 'As prescribed'}</div>
          </div>
        </div>
      </div>

      {/* Prescriber Details */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ border: '1px solid #000', padding: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '13px' }}>
              PRESCRIBER DETAILS
            </div>
            <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
              <div><strong>Name:</strong> {prescription.prescriber}</div>
              <div><strong>Date:</strong> {today}</div>
              <div style={{ marginTop: '30px', borderTop: '1px solid #000', paddingTop: '5px' }}>
                Signature: _________________________
              </div>
            </div>
          </div>

          <div style={{ border: '1px solid #000', padding: '15px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '13px' }}>
              FOR PHARMACY USE ONLY
            </div>
            <div style={{ fontSize: '11px', lineHeight: '1.8' }}>
              <div>Dispensed by: _____________________</div>
              <div>Date dispensed: ____________________</div>
              <div>Pharmacy stamp:</div>
              <div style={{
                border: '1px dashed #999',
                height: '60px',
                marginTop: '5px'
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Prescription ID */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <div style={{
          fontSize: '11px',
          fontFamily: 'monospace',
          color: '#666'
        }}>
          Prescription ID: PHB-RX-{prescription.id.toString().padStart(8, '0')}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid #ccc',
        paddingTop: '10px',
        fontSize: '9px',
        color: '#666',
        lineHeight: '1.6'
      }}>
        <strong>IMPORTANT:</strong> This prescription is valid for 30 days. Keep in a safe place.
        Not valid if altered. For repeat prescriptions, contact your healthcare provider.
        <div style={{ marginTop: '5px', textAlign: 'center' }}>
          PHB Emergency Line: 0800-PHB-CARE | www.phb.gov.ng
        </div>
      </div>
    </div>
  );
};

export default PrintablePrescription;
