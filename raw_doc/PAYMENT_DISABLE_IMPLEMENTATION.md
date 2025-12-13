# Payment Disable Implementation Guide

## 🎯 Overview

This document outlines the complete implementation for temporarily disabling Paystack payments while allowing appointments to proceed without payment. The system provides a seamless toggle between paid and free appointment booking.

---

## 🔧 Backend Changes (Django)

### 1. **Environment Configuration**
- **File**: `server/settings.py`
- **Change**: Added `PAYMENTS_ENABLED` environment variable
```python
# Payment System Toggle
PAYMENTS_ENABLED = os.environ.get('PAYMENTS_ENABLED', 'false').lower() == 'true'
```

### 2. **Payment Views Updates**
- **File**: `api/views/payment/payment_views.py`
- **Changes**: All payment views now check payment status and handle disabled state

#### PaymentInitializeView
```python
# Check if payments are disabled
if not getattr(settings, 'PAYMENTS_ENABLED', True):
    logger.info("Payment disabled - handling appointment creation with waived payment")
    return self._handle_disabled_payment_flow(request)
```

#### PaymentVerifyView
```python
# Check if payments are disabled
if not getattr(settings, 'PAYMENTS_ENABLED', True):
    return Response({
        'success': True,
        'payments_enabled': False,
        'message': 'Payments are currently disabled. All appointments have waived payment status.',
        'payment_status': 'waived'
    }, status=status.HTTP_200_OK)
```

#### PaymentWebhookView
```python
# Check if payments are disabled
if not getattr(settings, 'PAYMENTS_ENABLED', True):
    logger.info("Webhook received but payments are disabled - ignoring")
    return Response({
        'success': True,
        'message': 'Webhook received but payments are disabled'
    }, status=status.HTTP_200_OK)
```

#### PaymentStatsView
- Returns appropriate stats for disabled payment state
- Shows 0 payments and free appointment message

#### PaymentStatusView (NEW)
```python
def get(self, request):
    """Check if payments are enabled"""
    payments_enabled = getattr(settings, 'PAYMENTS_ENABLED', True)
    
    return Response({
        'payments_enabled': payments_enabled,
        'message': 'Payments are enabled' if payments_enabled else 'Payments are currently disabled - all appointments have waived payment status',
        'available_providers': ['paystack'] if payments_enabled else [],
        'free_appointments': not payments_enabled
    }, status=status.HTTP_200_OK)
```

### 3. **URL Configuration**
- **File**: `api/urls.py`
- **Change**: Added new payment status endpoint
```python
path('payments/status/', PaymentStatusView.as_view(), name='payment-status'),
```

### 4. **Environment Files**
- **File**: `.env`
```env
# Payment System Configuration
PAYMENTS_ENABLED=false
```

- **File**: `.env.example`
```env
# Payment System Configuration
PAYMENTS_ENABLED=false
```

---

## 🎨 Frontend Changes (React/TypeScript)

### 1. **Payment Service Updates**
- **File**: `src/services/paymentService.ts`

#### New Interface
```typescript
export interface PaymentStatusResponse {
  payments_enabled: boolean;
  message: string;
  available_providers: string[];
  free_appointments: boolean;
}
```

#### New Payment Status Method
```typescript
async getPaymentStatus(): Promise<PaymentStatusResponse> {
  try {
    const response = await apiRequest<PaymentStatusResponse>(
      '/api/payments/status/',
      'GET'
    );
    return response;
  } catch (error: any) {
    // Return default enabled state on error
    return {
      payments_enabled: true,
      message: 'Unable to check payment status',
      available_providers: ['paystack'],
      free_appointments: false
    };
  }
}
```

#### Updated Payment Initialize Response
```typescript
export interface PaymentInitResponse {
  status: 'success' | 'error';
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
  message?: string;
  isPaymentWaived?: boolean;  // NEW FLAG
}
```

#### Enhanced Payment Initialize Logic
```typescript
// Check if payments are disabled
if (response.payments_enabled === false || response.payment_status === 'waived') {
  return {
    status: 'success',
    data: {
      authorization_url: '', // No payment URL needed
      access_code: response.appointment_id || 'free-appointment',
      reference: 'waived-payment'
    },
    message: response.message || 'Appointment created successfully with waived payment',
    isPaymentWaived: true
  };
}
```

### 2. **BookAppointment Component Updates**
- **File**: `src/features/health/BookAppointment.tsx`

#### New State Variables
```typescript
// Payment system status states
const [paymentsEnabled, setPaymentsEnabled] = useState<boolean>(true);
const [freeAppointments, setFreeAppointments] = useState<boolean>(false);
const [paymentStatusLoading, setPaymentStatusLoading] = useState<boolean>(true);
```

#### Payment Status Check
```typescript
// Check payment system status on component mount
useEffect(() => {
  const checkPaymentStatus = async () => {
    try {
      setPaymentStatusLoading(true);
      const paymentStatus = await PaymentService.getPaymentStatus();
      
      console.log('💰 Payment system status:', paymentStatus);
      
      setPaymentsEnabled(paymentStatus.payments_enabled);
      setFreeAppointments(paymentStatus.free_appointments);
    } catch (error) {
      console.error('Failed to check payment status:', error);
      // Default to payments enabled on error
      setPaymentsEnabled(true);
      setFreeAppointments(false);
    } finally {
      setPaymentStatusLoading(false);
    }
  };

  if (isAuthenticated) {
    checkPaymentStatus();
  }
}, [isAuthenticated]);
```

#### Free Appointment Notice UI
```typescript
{/* Free Appointments Notice */}
{!paymentStatusLoading && freeAppointments && (
  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
    <div className="flex items-center">
      <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <div>
        <h3 className="text-sm font-medium text-green-800">
          Free Appointments Available!
        </h3>
        <p className="text-sm text-green-700 mt-1">
          All appointments are currently free of charge. Complete your booking without any payment required.
        </p>
      </div>
    </div>
  </div>
)}
```

#### Dynamic Submit Button
```typescript
{isSubmitting ? (
  <>
    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Processing...
  </>
) : (
  freeAppointments ? "Book Free Appointment" : "Proceed to Payment"
)}
```

#### Waived Payment Flow
```typescript
// Check if payment was waived (payments disabled)
if (paymentInitResult.isPaymentWaived) {
  console.log('🎉 Payment waived - appointment created successfully!');
  
  // Skip payment modal and go directly to confirmation
  setPaymentData({
    reference: 'waived-payment',
    status: 'completed',
    amount: 0,
    currency: 'NGN',
    transaction: 'free-appointment'
  });
  setPaymentStatus('success');
  setShowPaymentConfirmation(true);
  return;
}
```

### 3. **Payment Confirmation Modal Updates**
- **File**: `src/components/modals/PaymentConfirmation.tsx`

#### Free Appointment Detection
```typescript
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
    // ... other cases
  }
};
```

#### Free Appointment Display
```typescript
<h3 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
  <CreditCard className="h-5 w-5 mr-2 text-[#005eb8]" />
  {paymentData.reference === 'waived-payment' || paymentData.amount === 0 ? 'Booking Details' : 'Payment Details'}
</h3>

<div className="flex justify-between items-center py-2 border-b border-gray-200">
  <span className="text-gray-600 font-medium">Amount:</span>
  <span className={`font-bold text-lg ${paymentData.amount === 0 ? 'text-green-600' : 'text-[#005eb8]'}`}>
    {paymentData.amount === 0 ? 'FREE' : formatCurrency(paymentData.amount)}
  </span>
</div>

{paymentData.reference === 'waived-payment' && (
  <div className="flex justify-between items-center py-2 border-b border-gray-200">
    <span className="text-gray-600 font-medium">Booking Type:</span>
    <span className="text-green-600 font-medium">Free Appointment</span>
  </div>
)}
```

---

## 🧪 Testing

### Test File Created
- **File**: `test-payment-disable.html`
- **Purpose**: Simple HTML test page to verify API integration
- **Features**:
  - Payment status endpoint testing
  - Payment initialization testing
  - Real-time results display
  - Error handling and logging

### Test Instructions
1. **Start Backend Server**: `python manage.py runserver`
2. **Open Test Page**: `test-payment-disable.html` in browser
3. **Run Tests**: Click test buttons to verify functionality
4. **Check Results**: Verify payment disabled responses

### Expected Test Results
When `PAYMENTS_ENABLED=false`:
```json
{
  "payments_enabled": false,
  "message": "Payments are currently disabled - all appointments have waived payment status",
  "available_providers": [],
  "free_appointments": true
}
```

---

## 🔄 How to Toggle Payment System

### To Disable Payments (Current State)
1. **Backend**: Set `PAYMENTS_ENABLED=false` in `.env`
2. **Restart Backend**: `python manage.py runserver`
3. **Frontend**: Automatically detects and adapts to disabled state

### To Enable Payments
1. **Backend**: Set `PAYMENTS_ENABLED=true` in `.env`
2. **Restart Backend**: `python manage.py runserver`
3. **Frontend**: Automatically detects and shows normal payment flow

---

## 🎯 User Experience

### When Payments Are Disabled
1. **Green Notice**: "Free Appointments Available!" banner at top
2. **Button Text**: "Book Free Appointment" instead of "Proceed to Payment"
3. **No Payment Modal**: Skips payment process entirely
4. **Confirmation**: Shows "Appointment Booked Successfully!" with "FREE" amount
5. **Email**: Receives normal appointment confirmation email

### When Payments Are Enabled
1. **Normal Flow**: Standard payment process with Paystack
2. **Button Text**: "Proceed to Payment"
3. **Payment Modal**: Normal Paystack payment interface
4. **Confirmation**: Shows payment details and appointment confirmation

---

## 📝 API Endpoints

### New Endpoint: Payment Status Check
```
GET /api/payments/status/
```

**Response (Payments Disabled)**:
```json
{
  "payments_enabled": false,
  "message": "Payments are currently disabled - all appointments have waived payment status",
  "available_providers": [],
  "free_appointments": true
}
```

**Response (Payments Enabled)**:
```json
{
  "payments_enabled": true,
  "message": "Payments are enabled",
  "available_providers": ["paystack"],
  "free_appointments": false
}
```

### Modified Endpoint: Payment Initialize
```
POST /api/payments/initialize/
```

**Response (Payments Disabled)**:
```json
{
  "success": true,
  "payments_enabled": false,
  "appointment_id": "APT-20250619-001",
  "payment_status": "waived",
  "message": "Appointment created successfully with waived payment",
  "amount": 0,
  "currency": "NGN"
}
```

---

## ✅ Verification Checklist

### Backend Verification
- [ ] `PAYMENTS_ENABLED=false` set in `.env`
- [ ] Payment status endpoint returns disabled response
- [ ] Payment initialize creates appointment with waived payment
- [ ] Payment verify returns appropriate disabled response
- [ ] Payment webhook ignores incoming webhooks
- [ ] Payment stats shows free appointment message

### Frontend Verification
- [ ] Green "Free Appointments" notice displays
- [ ] Submit button shows "Book Free Appointment"
- [ ] Payment modal is skipped for free appointments
- [ ] Confirmation modal shows "FREE" and "Booking Details"
- [ ] Payment status check works on component load
- [ ] All UI elements adapt to payment disabled state

### User Experience Verification
- [ ] Complete booking flow works without payment
- [ ] User receives appointment confirmation
- [ ] Appointment appears in user's appointment list
- [ ] No payment references in user-facing text
- [ ] Smooth transition between paid/free modes

---

## 🚀 Deployment Notes

### Environment Variables Required
```env
# Production
PAYMENTS_ENABLED=false  # or true to enable

# Development
PAYMENTS_ENABLED=false  # for testing free appointments
```

### Restart Required
- Backend server must be restarted when changing `PAYMENTS_ENABLED`
- Frontend automatically adapts without restart needed

### Database Impact
- No database schema changes required
- Appointments created with `payment_status='waived'` when disabled
- Existing appointments and payment records unaffected

---

## 📞 Support & Troubleshooting

### Common Issues

1. **Frontend shows payment flow despite disabled backend**
   - Check browser cache/cookies
   - Verify API calls are reaching correct backend URL
   - Check browser console for API errors

2. **Backend not respecting PAYMENTS_ENABLED setting**
   - Verify `.env` file is being loaded
   - Check environment variable with Django shell: `python manage.py shell` → `from django.conf import settings; print(settings.PAYMENTS_ENABLED)`
   - Ensure server was restarted after `.env` change

3. **Test page cannot connect to backend**
   - Verify backend server is running on correct port
   - Check CORS settings allow frontend domain
   - Verify no authentication required for test endpoints

### Debug Commands
```bash
# Check payment setting
python manage.py shell -c "from django.conf import settings; print('PAYMENTS_ENABLED:', getattr(settings, 'PAYMENTS_ENABLED', 'NOT_SET'))"

# Test payment status endpoint
curl http://localhost:8000/api/payments/status/

# View server logs
tail -f /path/to/django/logs
```

---

**Implementation Status**: ✅ **COMPLETED**  
**Last Updated**: June 19, 2025  
**Version**: 1.0