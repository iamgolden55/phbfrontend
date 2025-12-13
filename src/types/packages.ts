/**
 * Health Packages Type Definitions
 *
 * This file contains TypeScript interfaces for health package management,
 * including package definitions, services, and pricing structures.
 */

export type PriceCategory =
  | 'consultation'
  | 'procedure'
  | 'lab_test'
  | 'imaging'
  | 'vaccination'
  | 'medication'
  | 'other';

/**
 * Represents a pricing tier for a service
 */
export interface PriceTier {
  name: string;                          // "Standard", "Urgent", "After Hours"
  price: number;
  conditions?: string;                   // When this tier applies
}

/**
 * Represents a billable service item in the price list
 */
export interface PriceItem {
  id: string;
  code: string;                          // Internal code (e.g., "CONS-GP")
  name: string;                          // "General Consultation"
  description?: string;

  // Category
  category: PriceCategory;
  subcategory?: string;

  // Pricing
  base_price: number;
  currency: string;
  tiers?: PriceTier[];                   // Multiple pricing levels

  // Tax
  tax_rate?: number;
  tax_inclusive: boolean;

  // Availability
  is_active: boolean;
  available_locations?: string[];

  // Metadata
  unit?: string;                         // "per session", "per test"
  duration_minutes?: number;
  created_at: string;
  updated_at: string;
}

/**
 * Represents a service included in a health package
 */
export interface PackageService {
  price_item_id: string;
  service_name: string;
  service_code: string;
  category: PriceCategory;
  included_count: number;                // How many times included
  original_price: number;
}

/**
 * Represents a complete health package
 */
export interface HealthPackage {
  id: string;
  name: string;
  description: string;
  short_description?: string;

  // Services included
  services: PackageService[];

  // Pricing
  total_value: number;                   // Sum of individual service prices
  package_price: number;                 // Discounted package price
  discount_amount: number;
  discount_percentage: number;
  currency: string;

  // Validity
  duration_days: number;                 // How long package is valid after purchase
  max_uses?: number;                     // Usage limits per service (if different from included_count)

  // Eligibility
  eligible_for?: string[];               // Patient criteria (e.g., ["adults", "seniors"])
  min_age?: number;
  max_age?: number;

  // Status
  is_active: boolean;
  is_featured: boolean;                  // Show prominently on website/app

  // Display
  color?: string;                        // Theme color for package card
  icon?: string;                         // Icon identifier
  image_url?: string;                    // Package image

  // Metadata
  created_at: string;
  updated_at: string;
  created_by?: string;
  purchase_count: number;                // How many times purchased
  popularity_rank?: number;
}

/**
 * Represents a purchased package by a patient
 */
export interface PurchasedPackage {
  id: string;
  package_id: string;
  package_name: string;
  patient_id: string;
  patient_name: string;

  // Purchase details
  purchased_at: string;
  purchase_price: number;
  payment_method?: string;
  payment_reference?: string;

  // Validity
  valid_from: string;
  valid_until: string;
  is_expired: boolean;

  // Usage tracking
  services: PurchasedPackageService[];

  // Status
  status: 'active' | 'expired' | 'fully_used' | 'cancelled';
  cancelled_at?: string;
  cancellation_reason?: string;
}

/**
 * Represents the usage of a specific service within a purchased package
 */
export interface PurchasedPackageService {
  service_id: string;
  service_name: string;
  included_count: number;
  used_count: number;
  remaining_count: number;
  usage_history: ServiceUsage[];
}

/**
 * Represents a single usage of a service from a package
 */
export interface ServiceUsage {
  id: string;
  used_at: string;
  appointment_id?: string;
  performed_by?: string;
  notes?: string;
}

/**
 * Request payload for creating a new health package
 */
export interface CreateHealthPackageRequest {
  name: string;
  description: string;
  short_description?: string;
  services: {
    price_item_id: string;
    included_count: number;
  }[];
  package_price: number;
  duration_days: number;
  eligible_for?: string[];
  min_age?: number;
  max_age?: number;
  is_featured?: boolean;
  color?: string;
  icon?: string;
}

/**
 * Request payload for updating a health package
 */
export interface UpdateHealthPackageRequest extends Partial<CreateHealthPackageRequest> {
  is_active?: boolean;
}

/**
 * Package statistics for analytics
 */
export interface PackageStats {
  total_packages: number;
  active_packages: number;
  featured_packages: number;
  total_purchases: number;
  total_revenue: number;
  average_discount_percentage: number;
  most_popular_package?: HealthPackage;
  recent_purchases: PurchasedPackage[];
}

/**
 * Filter options for health packages
 */
export interface PackageFilters {
  search?: string;
  is_active?: boolean;
  is_featured?: boolean;
  min_price?: number;
  max_price?: number;
  category?: PriceCategory;
  sort_by?: 'name' | 'price' | 'discount' | 'popularity' | 'created_at';
  sort_order?: 'asc' | 'desc';
}