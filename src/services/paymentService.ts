// PaymentService - Handles all payment-related API calls
// Currently using mocks, will connect to PHB backend later

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const AUTH_TOKEN_KEY = 'phb_auth_token';

export interface PaymentData {
  appointmentId?: number; // Added for backend integration
  amount: number;
  currency: string;
  appointmentType: string;
  urgency: 'routine' | 'soon' | 'urgent';
  department: string;
  patientEmail: string;
  patientName: string;
  appointmentDate: string; // Should be ISO format for backend
  appointmentTime: string;
  symptoms?: any[];
  // Payment-first booking details (enhanced)
  departmentId?: number;
  hospitalId?: number;
  chiefComplaint?: string;
  priority?: string;
  medicalHistory?: string;
  allergies?: string;
  currentMedications?: string;
  duration?: number;
  isInsuranceBased?: boolean;
  insuranceDetails?: any;
}

export interface PaymentTransaction {
  id: string;
  transaction_id: string;
  reference: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  payment_method: string;
  created_at: string;
  completed_at?: string;
  appointment_data?: any;
  paystack_data?: any;
}

export interface PaymentInitResponse {
  status: 'success' | 'error';
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
  message?: string;
  isPaymentWaived?: boolean;
}

export interface PaymentVerificationResponse {
  status: 'success' | 'error';
  data?: PaymentTransaction;
  message?: string;
}

export interface PaymentStatusResponse {
  payments_enabled: boolean;
  message: string;
  available_providers: string[];
  free_appointments: boolean;
}

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

// Helper function to map backend payment status to frontend format
const mapBackendStatusToFrontend = (backendStatus: string): 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' => {
  const statusMap: Record<string, 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'> = {
    'completed': 'completed',
    'successful': 'completed',
    'success': 'completed',
    'pending': 'pending',
    'processing': 'processing',
    'failed': 'failed',
    'cancelled': 'failed',
    'refunded': 'refunded'
  };
  
  const mapped = statusMap[backendStatus.toLowerCase()];
  if (!mapped) {
    console.warn(`⚠️ Unknown payment status from backend: ${backendStatus}, defaulting to 'pending'`);
    return 'pending';
  }
  
  console.log(`🔄 Mapped payment status: ${backendStatus} → ${mapped}`);
  return mapped;
};

// Helper function for API requests
async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any
): Promise<T> {
  const url = `${API_BASE_URL.replace(/\/$/, '')}${endpoint}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  const authToken = getAuthToken();
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      const error: any = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data as T;
  } catch (error) {
    console.error(`API request failed: ${method} ${endpoint}`, error);
    throw error;
  }
}

// Calculate appointment price based on urgency and type
export const calculateAppointmentPrice = (paymentData: PaymentData): number => {
  const { urgency, department } = paymentData;
  
  // Base pricing based on urgency
  const urgencyPricing = {
    'routine': 2000,    // Regular Appointment
    'soon': 3500,       // Priority Booking  
    'urgent': 5000      // Same-Day Appointment
  };

  let basePrice = urgencyPricing[urgency] || 2000;

  // Specialist consultation pricing
  const specialistDepartments = [
    'cardiology', 'neurology', 'orthopedics', 'oncology', 
    'gastroenterology', 'pulmonology', 'endocrinology',
    'nephrology', 'rheumatology', 'dermatology'
  ];

  const isSpecialist = specialistDepartments.some(dept => 
    department.toLowerCase().includes(dept)
  );

  if (isSpecialist) {
    basePrice = Math.max(basePrice, 7500); // Specialist minimum
  }

  // Emergency consultation (urgent + specialist)
  if (urgency === 'urgent' && isSpecialist) {
    basePrice = 10000;
  }

  return basePrice;
};

// Get appointment type description
export const getAppointmentTypeDescription = (paymentData: PaymentData): string => {
  const { urgency, department } = paymentData;
  
  const specialistDepartments = [
    'cardiology', 'neurology', 'orthopedics', 'oncology', 
    'gastroenterology', 'pulmonology', 'endocrinology'
  ];

  const isSpecialist = specialistDepartments.some(dept => 
    department.toLowerCase().includes(dept)
  );

  if (urgency === 'urgent' && isSpecialist) {
    return 'Emergency Specialist Consultation';
  } else if (isSpecialist) {
    return 'Specialist Consultation';
  } else if (urgency === 'urgent') {
    return 'Same-Day Appointment';
  } else if (urgency === 'soon') {
    return 'Priority Booking';
  } else {
    return 'Regular Appointment';
  }
};

export const PaymentService = {
  // Check payment system status (NEW!)
  async getPaymentStatus(): Promise<PaymentStatusResponse> {
    try {
      console.log('🔍 Checking payment system status...');
      
      const response = await apiRequest<PaymentStatusResponse>(
        '/api/payments/status/',
        'GET'
      );

      console.log('✅ Payment status response:', response);
      return response;
    } catch (error: any) {
      console.error('💥 Failed to check payment status:', error);
      // Return default enabled state on error
      return {
        payments_enabled: true,
        message: 'Unable to check payment status',
        available_providers: ['paystack'],
        free_appointments: false
      };
    }
  },

  // Initialize payment (REAL API INTEGRATION! 🚀)
  async initializePayment(paymentData: PaymentData): Promise<PaymentInitResponse> {
    try {
      // Calculate final amount
      const amount = calculateAppointmentPrice(paymentData);
      const appointmentType = getAppointmentTypeDescription(paymentData);

      console.log('🚀 Initializing REAL payment:', { ...paymentData, amount, appointmentType });
      
      // 🔥 REAL API CALL TO PHB BACKEND
      const requestBody: any = {
        amount: amount,
        payment_method: 'card',
        payment_provider: 'paystack'
      };

      // 🎯 ONLY ADD APPOINTMENT_ID IF IT EXISTS (Payment-First Approach!)
      if (paymentData.appointmentId) {
        requestBody.appointment_id = paymentData.appointmentId;
      } else {
        // 🚀 PAYMENT-FIRST APPROACH: Send comprehensive booking details
        requestBody.department_id = paymentData.departmentId;
        requestBody.hospital_id = paymentData.hospitalId;
        requestBody.appointment_date = paymentData.appointmentDate; // ISO format from frontend
        requestBody.appointment_type = paymentData.appointmentType || 'consultation';
        requestBody.priority = paymentData.priority || 'normal';
        requestBody.chief_complaint = paymentData.chiefComplaint || '';
        
        // ✅ Add additional booking details for complete appointment data
        if (paymentData.symptoms && paymentData.symptoms.length > 0) {
          requestBody.symptoms_data = paymentData.symptoms.map((symptom: any) => ({
            body_part_id: symptom.bodyPartId,
            body_part_name: symptom.bodyPartName,
            symptom_name: symptom.symptomName,
            description: symptom.description || ''
          }));
        } else {
          // Always provide symptoms_data as empty array if no symptoms
          requestBody.symptoms_data = [];
        }
        
        if (paymentData.medicalHistory) {
          requestBody.medical_history = paymentData.medicalHistory;
        }
        
        if (paymentData.allergies) {
          requestBody.allergies = paymentData.allergies;
        }
        
        if (paymentData.currentMedications) {
          requestBody.current_medications = paymentData.currentMedications;
        }
        
        if (paymentData.duration) {
          requestBody.duration = paymentData.duration;
        }
        
        requestBody.is_insurance_based = paymentData.isInsuranceBased || false;
        
        if (paymentData.insuranceDetails) {
          requestBody.insurance_details = paymentData.insuranceDetails;
        }
      }

      console.log('🔧 Payment request body:', requestBody);

      const response = await apiRequest<{
        success: boolean;
        payments_enabled?: boolean;
        payment_id?: string;
        payment_url?: string;
        provider_reference?: string;
        amount?: number;
        currency?: string;
        appointment_id?: string;
        payment_status?: string;
        message?: string;
        error?: string;
      }>(
        '/api/payments/initialize/',
        'POST',
        requestBody
      );

      if (response.success) {
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

        // Normal payment flow
        return {
          status: 'success',
          data: {
            authorization_url: response.payment_url!,
            access_code: response.payment_id!,
            reference: response.provider_reference!
          }
        };
      } else {
        throw new Error(response.error || 'Payment initialization failed');
      }
    } catch (error: any) {
      console.error('💥 Payment initialization failed:', error);
      return {
        status: 'error',
        message: error.message || 'Payment initialization failed'
      };
    }
  },

  // Verify payment status (REAL API INTEGRATION! 🚀)
  async verifyPayment(reference: string): Promise<PaymentVerificationResponse> {
    try {
      console.log('🔍 Verifying REAL payment:', reference);
      
      // 🔥 REAL API CALL TO PHB BACKEND
      const response = await apiRequest<{
        success: boolean;
        payment_id: string;
        status: string;
        amount: number;
        currency: string;
        completed_at?: string;
        verification_data?: any;
        error?: string;
      }>(
        `/api/payments/verify/${reference}/`,
        'GET'
      );

      console.log('🔍 Backend payment verification response:', response);

      // ✅ IMPROVED: Better response validation and status mapping
      if (!response || typeof response !== 'object') {
        throw new Error('Invalid response format from payment verification API');
      }

      // Validate required fields
      if (!response.payment_id || !response.status || !response.amount) {
        console.error('❌ Missing required fields in verification response:', response);
        throw new Error('Incomplete payment verification data received');
      }

      if (response.success || response.status === 'completed' || response.status === 'successful') {
        // Map backend payment status to frontend format
        const mappedStatus = mapBackendStatusToFrontend(response.status);
        
        const transaction: PaymentTransaction = {
          id: response.payment_id,
          transaction_id: response.payment_id,
          reference: reference,
          amount: response.amount,
          currency: response.currency,
          status: mappedStatus,
          payment_method: 'card',
          created_at: new Date().toISOString(),
          completed_at: response.completed_at,
          paystack_data: response.verification_data
        };

        console.log('✅ Payment verification successful, mapped status:', mappedStatus);

        return {
          status: 'success',
          data: transaction
        };
      } else {
        const errorMessage = response.error || 'Payment verification failed';
        console.error('❌ Payment verification failed:', errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error('💥 Payment verification failed:', error);
      return {
        status: 'error',
        message: error.message || 'Payment verification failed'
      };
    }
  },

  // Get payment history for user (REAL API INTEGRATION! 🚀)
  async getPaymentHistory(): Promise<PaymentTransaction[]> {
    try {
      console.log('📜 Fetching REAL payment history');
      
      // 🔥 REAL API CALL TO PHB BACKEND
      const response = await apiRequest<{
        success: boolean;
        payments: PaymentTransaction[];
        count: number;
        error?: string;
      }>(
        '/api/payments/history/',
        'GET'
      );

      if (response.success) {
        return response.payments;
      } else {
        throw new Error(response.error || 'Failed to fetch payment history');
      }
    } catch (error: any) {
      console.error('💥 Failed to fetch payment history:', error);
      throw error;
    }
  },

  // Get payment details by ID
  async getPaymentById(paymentId: string): Promise<PaymentTransaction | null> {
    try {
      // TODO: Replace with actual API call
      // const response = await apiRequest<PaymentTransaction>(
      //   `/api/payments/${paymentId}/`,
      //   'GET'
      // );

      console.log('Fetching payment details for:', paymentId);
      
      // Mock payment details
      const mockPayment: PaymentTransaction = {
        id: paymentId,
        transaction_id: `PHB-${Date.now()}-mock`,
        reference: `PHB-${Date.now()}-mock`,
        amount: 2000,
        currency: 'NGN',
        status: 'completed',
        payment_method: 'card',
        created_at: new Date().toISOString(),
        completed_at: new Date().toISOString()
      };

      return mockPayment;
    } catch (error) {
      console.error('Failed to fetch payment details:', error);
      return null;
    }
  },

  // Process refund (admin only)
  async processRefund(paymentId: string, amount?: number, reason?: string): Promise<boolean> {
    try {
      // TODO: Replace with actual API call
      // const response = await apiRequest<{success: boolean}>(
      //   `/api/payments/${paymentId}/refund/`,
      //   'POST',
      //   { amount, reason }
      // );

      console.log('Processing refund for payment:', paymentId, { amount, reason });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful refund
      return true;
    } catch (error) {
      console.error('Refund processing failed:', error);
      throw error;
    }
  }
};
