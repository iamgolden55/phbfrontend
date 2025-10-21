// src/services/womensHealthApi.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface VerificationStatus {
  verified: boolean;
  verification_date: string | null;
  has_pending_otp: boolean;
  otp_expires_at: string | null;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  otp?: string; // Only in debug mode
}

export interface OTPVerificationResponse {
  success: boolean;
  message: string;
  verified: boolean;
}

export interface WomensHealthProfile {
  id: number;
  created_at: string;
  updated_at: string;
  
  // Basic reproductive health
  age_at_menarche?: number;
  average_cycle_length: number;
  average_period_duration: number;
  last_menstrual_period?: string;
  
  // Pregnancy status
  pregnancy_status: 'not_pregnant' | 'trying_to_conceive' | 'pregnant' | 'postpartum' | 'breastfeeding' | 'menopause' | 'unknown';
  current_pregnancy_week?: number;
  estimated_due_date?: string;
  
  // Pregnancy history
  total_pregnancies: number;
  live_births: number;
  miscarriages: number;
  abortions: number;
  
  // Contraception
  current_contraception: string;
  contraception_start_date?: string;
  
  // Fertility tracking
  fertility_tracking_enabled: boolean;
  temperature_tracking: boolean;
  cervical_mucus_tracking: boolean;
  ovulation_test_tracking: boolean;
  
  // Health conditions
  pcos: boolean;
  endometriosis: boolean;
  fibroids: boolean;
  thyroid_disorder: boolean;
  diabetes: boolean;
  gestational_diabetes_history: boolean;
  hypertension: boolean;
  
  // Family history
  family_history_breast_cancer: boolean;
  family_history_ovarian_cancer: boolean;
  family_history_cervical_cancer: boolean;
  family_history_diabetes: boolean;
  family_history_heart_disease: boolean;
  
  // Lifestyle
  exercise_frequency: string;
  stress_level: string;
  sleep_quality: string;
  
  // Goals and preferences
  health_goals_list: string[];
  notification_preferences: Record<string, any>;
  privacy_settings: Record<string, any>;
  
  // Medical provider info
  primary_gynecologist?: string;
  last_pap_smear?: string;
  last_mammogram?: string;
  last_gynecological_exam?: string;
  
  // Emergency contact
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relationship?: string;
  
  // Calculated fields
  current_cycle_day?: number;
  estimated_ovulation_date?: string;
  estimated_next_period?: string;
  profile_completion_percentage: number;
  
  // Helper properties
  is_pregnant: boolean;
  is_trying_to_conceive: boolean;
  needs_fertility_tracking: boolean;
}

export interface MenstrualCycle {
  id: number;
  created_at: string;
  updated_at: string;
  
  // Basic cycle info
  cycle_start_date: string;
  cycle_end_date?: string;
  period_end_date?: string;
  cycle_length?: number;
  period_length?: number;
  flow_intensity: 'light' | 'medium' | 'heavy' | 'very_heavy';
  is_regular: boolean;
  is_current_cycle: boolean;
  
  // Ovulation
  ovulation_date?: string;
  ovulation_confirmed: boolean;
  ovulation_detection_method?: string;
  days_until_ovulation?: number;
  
  // Pregnancy testing
  pregnancy_test_taken: boolean;
  pregnancy_test_result?: 'positive' | 'negative' | 'unclear';
  pregnancy_test_date?: string;
  conception_attempt: boolean;
  
  // Medications and supplements
  medications_taken: string[];
  supplements_taken: string[];
  hormonal_contraception: boolean;
  
  // Lifestyle factors
  stress_level: 'low' | 'moderate' | 'high' | 'severe';
  exercise_frequency: string;
  travel_during_cycle: boolean;
  illness_during_cycle: boolean;
  
  // Quality and notes
  cycle_quality_score?: number;
  cycle_notes?: string;
  symptoms: string[];
  predicted_cycle: boolean;
  
  // Calculated fields
  cycle_day?: number;
  cycle_phase?: Record<string, any>;
  is_in_fertile_window: boolean;
  data_completeness_score: number;
}

export interface PregnancyRecord {
  id: number;
  created_at: string;
  updated_at: string;
  
  // Basic pregnancy info
  pregnancy_number: number;
  is_current_pregnancy: boolean;
  pregnancy_type: 'singleton' | 'twins' | 'triplets' | 'other_multiple';
  conception_method: 'natural' | 'ivf' | 'iui' | 'other_assisted' | 'unknown';
  pregnancy_status: 'ongoing' | 'completed_delivery' | 'miscarriage' | 'abortion' | 'ectopic' | 'molar';
  
  // Timeline
  last_menstrual_period: string;
  estimated_due_date?: string;
  conception_date?: string;
  pregnancy_start_date?: string;
  completion_date?: string;
  gestational_age_at_completion?: number;
  
  // Risk assessment
  risk_level: 'low' | 'moderate' | 'high' | 'very_high';
  risk_factors: string[];
  
  // Prenatal care
  first_prenatal_visit_date?: string;
  first_prenatal_visit_week?: number;
  total_prenatal_visits: number;
  adequate_prenatal_care: boolean;
  
  // Healthcare providers
  primary_obstetrician?: string;
  hospital_for_delivery?: string;
  midwife_care: boolean;
  doula_support: boolean;
  
  // Complications
  pregnancy_complications: string[];
  gestational_diabetes: boolean;
  preeclampsia: boolean;
  placenta_previa: boolean;
  preterm_labor_risk: boolean;
  
  // Delivery information
  delivery_type?: 'vaginal' | 'c_section_planned' | 'c_section_emergency' | 'vacuum' | 'forceps';
  delivery_location?: string;
  labor_duration_hours?: number;
  delivery_complications: string[];
  
  // Birth outcomes
  birth_weight_grams?: number;
  birth_length_cm?: number;
  head_circumference_cm?: number;
  apgar_1_minute?: number;
  apgar_5_minute?: number;
  
  // Notes and documentation
  pregnancy_notes?: string;
  prenatal_test_results: Record<string, any>;
  ultrasound_reports: Record<string, any>;
  genetic_screening_results: Record<string, any>;
  
  // Calculated fields
  current_gestational_age?: Record<string, any>;
  trimester?: Record<string, any>;
  days_until_due_date?: number;
  is_high_risk: boolean;
}

export interface FertilityTracking {
  id: number;
  created_at: string;
  updated_at: string;
  
  // Basic info
  date: string;
  cycle_day?: number;
  
  // Basal body temperature
  basal_body_temperature?: number;
  bbt_time_taken?: string;
  bbt_method?: string;
  bbt_disrupted: boolean;
  bbt_disruption_reason?: string;
  
  // Cervical mucus
  cervical_mucus_type?: 'dry' | 'sticky' | 'creamy' | 'watery' | 'egg_white';
  cervical_mucus_amount?: 'none' | 'light' | 'moderate' | 'heavy';
  cervical_mucus_stretchy: boolean;
  cervical_mucus_notes?: string;
  
  // Cervical position
  cervical_position_height?: 'low' | 'medium' | 'high';
  cervical_position_firmness?: 'firm' | 'medium' | 'soft';
  cervical_position_opening?: 'closed' | 'slightly_open' | 'open';
  
  // Ovulation tests
  ovulation_test_taken: boolean;
  ovulation_test_result?: 'negative' | 'positive' | 'peak';
  ovulation_test_time?: string;
  ovulation_test_brand?: string;
  lh_level?: number;
  
  // Pregnancy tests
  pregnancy_test_taken: boolean;
  pregnancy_test_result?: 'negative' | 'positive' | 'faint_positive';
  pregnancy_test_time?: string;
  pregnancy_test_brand?: string;
  
  // Sexual activity
  intercourse: boolean;
  protected_intercourse: boolean;
  intercourse_times: number;
  trying_to_conceive: boolean;
  
  // Symptoms
  symptoms: string[];
  ovulation_pain: boolean;
  ovulation_pain_side?: 'left' | 'right' | 'both';
  breast_tenderness: boolean;
  spotting: boolean;
  spotting_color?: string;
  
  // Lifestyle factors
  stress_level: 'low' | 'moderate' | 'high' | 'severe';
  sleep_quality: 'excellent' | 'good' | 'fair' | 'poor' | 'very_poor';
  exercise_performed: boolean;
  alcohol_consumption: boolean;
  caffeine_intake: number;
  
  // Notes
  daily_notes?: string;
  mood: 'excellent' | 'good' | 'neutral' | 'bad' | 'terrible';
  energy_level: 'very_high' | 'high' | 'normal' | 'low' | 'very_low';
  
  // Calculated fields
  fertility_score: number;
  is_potential_ovulation_day: boolean;
  data_completeness_score: number;
}

export interface HealthGoal {
  id: number;
  created_at: string;
  updated_at: string;
  
  // Basic goal info
  title: string;
  description?: string;
  category: 'exercise' | 'nutrition' | 'hydration' | 'sleep' | 'mental_health' | 'reproductive_health' | 'other';
  goal_type: 'numeric' | 'boolean' | 'frequency';
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  
  // Target and progress
  target_value?: number;
  current_value: number;
  unit_of_measurement?: string;
  target_frequency?: number;
  frequency_period?: 'daily' | 'weekly' | 'monthly';
  current_frequency: number;
  
  // Timeline
  start_date: string;
  target_date?: string;
  completed_date?: string;
  
  // Progress tracking
  current_streak: number;
  longest_streak: number;
  last_activity_date?: string;
  total_updates: number;
  
  // Reminders
  reminder_enabled: boolean;
  reminder_frequency?: 'daily' | 'weekly' | 'monthly';
  reminder_time?: string;
  
  // Motivation
  motivation_note?: string;
  reward_for_completion?: string;
  accountability_partner?: string;
  
  // Professional guidance
  recommended_by_professional: boolean;
  professional_name?: string;
  professional_notes?: string;
  
  // Templates and sharing
  is_template_based: boolean;
  template_source?: string;
  is_public: boolean;
  shared_with_professionals: boolean;
  
  // Notes and history
  goal_notes?: string;
  progress_history: Record<string, any>[];
  milestone_achievements: Record<string, any>[];
  
  // Calculated fields
  progress_percentage: number;
  days_since_start: number;
  days_until_target?: number;
  is_overdue: boolean;
}

export interface DailyHealthLog {
  id: number;
  created_at: string;
  updated_at: string;
  
  // Basic info
  date: string;
  
  // Physical health
  weight_kg?: number;
  body_fat_percentage?: number;
  muscle_mass_kg?: number;
  
  // Vital signs
  systolic_bp?: number;
  diastolic_bp?: number;
  heart_rate_bpm?: number;
  resting_heart_rate?: number;
  body_temperature?: number;
  
  // Sleep
  sleep_bedtime?: string;
  sleep_wake_time?: string;
  sleep_duration_hours?: number;
  sleep_quality: 'excellent' | 'good' | 'fair' | 'poor' | 'very_poor';
  sleep_interrupted: boolean;
  sleep_interruption_count?: number;
  sleep_interruption_duration?: number;
  
  // Nutrition
  water_intake_liters?: number;
  water_goal_met: boolean;
  meals_count?: number;
  vegetables_servings?: number;
  fruits_servings?: number;
  protein_servings?: number;
  dairy_servings?: number;
  grains_servings?: number;
  unhealthy_snacks?: number;
  
  // Exercise
  exercise_performed: boolean;
  exercise_type?: string;
  exercise_duration_minutes?: number;
  exercise_intensity?: 'light' | 'moderate' | 'vigorous' | 'very_vigorous';
  steps_count?: number;
  calories_burned?: number;
  strength_training: boolean;
  cardio_training: boolean;
  
  // Mental health
  mood: 'excellent' | 'good' | 'neutral' | 'bad' | 'terrible';
  stress_level: 'low' | 'moderate' | 'high' | 'severe';
  anxiety_level: 'none' | 'mild' | 'moderate' | 'severe';
  energy_level: 'very_high' | 'high' | 'normal' | 'low' | 'very_low';
  emotional_wellbeing_score?: number;
  meditation_minutes?: number;
  mindfulness_practiced: boolean;
  
  // Women's health specific
  menstrual_flow?: 'none' | 'spotting' | 'light' | 'medium' | 'heavy' | 'very_heavy';
  menstrual_cramps: boolean;
  cramp_severity?: number;
  pms_symptoms: string[];
  breast_tenderness: boolean;
  cervical_mucus_observed: boolean;
  basal_body_temperature_taken: boolean;
  
  // Medications and supplements
  medications_taken: string[];
  supplements_taken: string[];
  prenatal_vitamin: boolean;
  folic_acid: boolean;
  birth_control: boolean;
  pain_medication: boolean;
  
  // Lifestyle
  caffeine_intake?: number;
  alcohol_consumption: boolean;
  smoking: boolean;
  substance_use: boolean;
  
  // Self-care
  self_care_activities: string[];
  social_interactions: number;
  screen_time_hours?: number;
  outdoor_time_minutes?: number;
  
  // Goal progress
  goal_progress: Record<string, any>;
  goal_achievements: string[];
  
  // Notes
  daily_notes?: string;
  symptoms: string[];
  unusual_observations?: string;
  
  // Calculated fields
  health_score: number;
  bmi?: number;
  sleep_efficiency?: number;
  data_completeness_score: number;
}

export interface HealthScreening {
  id: number;
  created_at: string;
  updated_at: string;
  
  // Basic screening info
  screening_type: string;
  custom_screening_name?: string;
  status: 'scheduled' | 'completed' | 'overdue' | 'cancelled' | 'rescheduled' | 'not_applicable' | 'pending_results';
  
  // Scheduling
  scheduled_date?: string;
  appointment_time?: string;
  completed_date?: string;
  next_due_date?: string;
  
  // Healthcare provider
  provider_name?: string;
  clinic_hospital_name?: string;
  provider_type?: string;
  
  // Results
  result_status?: 'normal' | 'abnormal' | 'borderline' | 'inconclusive' | 'pending' | 'not_available';
  result_details?: string;
  result_values: Record<string, any>;
  abnormal_findings?: string;
  recommendations?: string;
  
  // Follow-up
  follow_up_required: boolean;
  follow_up_type?: string;
  follow_up_date?: string;
  follow_up_notes?: string;
  
  // Risk assessment
  risk_assessment?: 'low' | 'moderate' | 'high' | 'very_high' | 'unknown';
  risk_factors_identified: string[];
  
  // Frequency
  recommended_frequency_months?: number;
  is_routine: boolean;
  reason_for_screening: string;
  
  // Cost and insurance
  estimated_cost?: number;
  insurance_covered?: boolean;
  copay_amount?: number;
  
  // Preparation
  preparation_required: boolean;
  preparation_instructions?: string;
  fasting_required: boolean;
  medications_to_avoid: string[];
  
  // Experience
  comfort_level?: 'very_comfortable' | 'comfortable' | 'neutral' | 'uncomfortable' | 'very_uncomfortable';
  pain_level?: number;
  patient_experience_notes?: string;
  
  // Quality
  screening_quality?: 'excellent' | 'good' | 'adequate' | 'poor' | 'inadequate';
  technical_adequacy?: boolean;
  repeat_needed: boolean;
  repeat_reason?: string;
  
  // Reminders
  reminder_enabled: boolean;
  reminder_advance_days: number;
  last_reminder_sent?: string;
  
  // Guidelines compliance
  meets_age_guidelines?: boolean;
  guideline_source?: string;
  
  // Notes
  screening_notes?: string;
  provider_notes?: string;
  patient_questions?: string;
  educational_materials_provided: string[];
  
  // External references
  external_system_id?: string;
  report_file_path?: string;
  
  // Calculated fields
  is_due_soon: boolean;
  days_until_due?: number;
  days_since_last?: number;
  age_at_screening?: number;
}

export interface DashboardData {
  profile: WomensHealthProfile;
  current_cycle?: MenstrualCycle;
  current_pregnancy?: PregnancyRecord;
  recent_fertility_data: FertilityTracking[];
  active_goals: HealthGoal[];
  upcoming_screenings: HealthScreening[];
  recent_health_logs: DailyHealthLog[];
  summary: {
    total_cycles: number;
    total_pregnancies: number;
    active_goals_count: number;
    profile_completion: number;
  };
}

class WomensHealthApiService {
  private baseURL = '/api/womens-health';

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to process request' }));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }

  // Verification endpoints
  async getVerificationStatus(): Promise<{ success: boolean; status: VerificationStatus }> {
    const response = await fetch(`${API_BASE_URL}${this.baseURL}/verification/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
    });
    return this.handleResponse(response);
  }

  async requestVerification(): Promise<VerificationResponse> {
    const response = await fetch(`${API_BASE_URL}${this.baseURL}/verification/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
    });
    return this.handleResponse(response);
  }

  async verifyOTP(otp: string): Promise<OTPVerificationResponse> {
    const response = await fetch(`${API_BASE_URL}${this.baseURL}/verification/verify/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
      body: JSON.stringify({ otp }),
    });
    return this.handleResponse(response);
  }

  // Dashboard
  async getDashboardData(): Promise<{ success: boolean; dashboard: DashboardData }> {
    const response = await fetch(`${API_BASE_URL}${this.baseURL}/dashboard/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
    });
    return this.handleResponse(response);
  }

  // Profile management
  async getProfile(): Promise<{ success: boolean; profile: WomensHealthProfile }> {
    const response = await fetch(`${API_BASE_URL}${this.baseURL}/profile/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
    });
    return this.handleResponse(response);
  }

  async createProfile(profileData: Partial<WomensHealthProfile>): Promise<{ success: boolean; profile: WomensHealthProfile; message: string }> {
    const response = await fetch(`${API_BASE_URL}${this.baseURL}/profile/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
      body: JSON.stringify(profileData),
    });
    return this.handleResponse(response);
  }

  async updateProfile(profileData: Partial<WomensHealthProfile>): Promise<{ success: boolean; profile: WomensHealthProfile; message: string }> {
    const response = await fetch(`${API_BASE_URL}${this.baseURL}/profile/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
      body: JSON.stringify(profileData),
    });
    return this.handleResponse(response);
  }

  // Menstrual cycles
  async getCycles(limit = 10, offset = 0): Promise<{ success: boolean; cycles: MenstrualCycle[]; total_count: number; has_more: boolean }> {
    const queryParams = new URLSearchParams({ limit: limit.toString(), offset: offset.toString() });
    const response = await fetch(`${API_BASE_URL}${this.baseURL}/cycles/?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
    });
    return this.handleResponse(response);
  }

  async createCycle(cycleData: Partial<MenstrualCycle>): Promise<{ success: boolean; cycle: MenstrualCycle; message: string }> {
    const response = await fetch(`${API_BASE_URL}${this.baseURL}/cycles/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
      body: JSON.stringify(cycleData),
    });
    return this.handleResponse(response);
  }

  async deleteCycle(cycleId: number): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}${this.baseURL}/cycles/${cycleId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
    });
    return this.handleResponse(response);
  }

  // Pregnancy records
  async getPregnancyRecord(): Promise<{ success: boolean; pregnancy_record: PregnancyRecord }> {
    const response = await fetch(`${API_BASE_URL}${this.baseURL}/pregnancy/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
    });
    return this.handleResponse(response);
  }

  async createPregnancyRecord(pregnancyData: Partial<PregnancyRecord>): Promise<{ success: boolean; pregnancy_record: PregnancyRecord; message: string }> {
    const response = await fetch(`${API_BASE_URL}${this.baseURL}/pregnancy/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
      body: JSON.stringify(pregnancyData),
    });
    return this.handleResponse(response);
  }

  // Fertility tracking
  async getFertilityData(startDate?: string, endDate?: string): Promise<{ success: boolean; fertility_data: FertilityTracking[]; total_count: number }> {
    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append('start_date', startDate);
    if (endDate) queryParams.append('end_date', endDate);

    const response = await fetch(`${API_BASE_URL}${this.baseURL}/fertility/?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
    });
    return this.handleResponse(response);
  }

  async addFertilityEntry(fertilityData: Partial<FertilityTracking>): Promise<{ success: boolean; tracking: FertilityTracking; message: string }> {
    const response = await fetch(`${API_BASE_URL}${this.baseURL}/fertility/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
      body: JSON.stringify(fertilityData),
    });
    return this.handleResponse(response);
  }

  // Health goals
  async getHealthGoals(status?: string): Promise<{ success: boolean; goals: HealthGoal[]; total_count: number }> {
    const queryParams = new URLSearchParams();
    if (status) queryParams.append('status', status);

    const response = await fetch(`${API_BASE_URL}${this.baseURL}/goals/?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
    });
    return this.handleResponse(response);
  }

  async createHealthGoal(goalData: Partial<HealthGoal>): Promise<{ success: boolean; goal: HealthGoal; message: string }> {
    const response = await fetch(`${API_BASE_URL}${this.baseURL}/goals/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
      body: JSON.stringify(goalData),
    });
    return this.handleResponse(response);
  }

  async updateHealthGoal(goalId: string, goalData: Partial<HealthGoal>): Promise<{ success: boolean; goal: HealthGoal; message: string }> {
    const response = await fetch(`${API_BASE_URL}${this.baseURL}/goals/${goalId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
      body: JSON.stringify(goalData),
    });
    return this.handleResponse(response);
  }

  // Daily health logs
  async getHealthLogs(startDate?: string, endDate?: string): Promise<{ success: boolean; logs: DailyHealthLog[]; total_count: number }> {
    const queryParams = new URLSearchParams();
    if (startDate) queryParams.append('start_date', startDate);
    if (endDate) queryParams.append('end_date', endDate);

    const response = await fetch(`${API_BASE_URL}${this.baseURL}/logs/?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
    });
    return this.handleResponse(response);
  }

  async createHealthLog(logData: Partial<DailyHealthLog>): Promise<{ success: boolean; log: DailyHealthLog; message: string; action?: string }> {
    console.log('🚀 womensHealthApi.createHealthLog() called with:', logData);
    console.log('📡 Making POST request to:', `${API_BASE_URL}${this.baseURL}/logs/`);

    const response = await fetch(`${API_BASE_URL}${this.baseURL}/logs/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with request
      body: JSON.stringify(logData),
    });

    console.log('📨 API Response status:', response.status);
    const result = await this.handleResponse(response);
    console.log('📊 API Response data:', result);

    return result;
  }
}

export const womensHealthApi = new WomensHealthApiService();