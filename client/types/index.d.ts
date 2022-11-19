export interface AutomaticTax {
  enabled: boolean;
  status?: any;
}

export interface CustomText {
  shipping_address?: any;
  submit?: any;
}

export interface Address {
  city: string;
  country: string;
  line1: string;
  line2?: any;
  postal_code: string;
  state: string;
}

export interface CustomerDetails {
  address: Address;
  email: string;
  name: string;
  phone?: any;
  tax_exempt: string;
  tax_ids: any[];
}

export interface Metadata {}

export interface Tip {}

export interface AmountDetails {
  tip: Tip;
}

export interface Metadata2 {}

export interface Card {
  installments?: any;
  mandate_options?: any;
  network?: any;
  request_three_d_secure: string;
}

export interface PaymentMethodOptions {
  card: Card;
}

export interface PaymentIntent {
  id: string;
  object: string;
  amount: number;
  amount_capturable: number;
  amount_details: AmountDetails;
  amount_received: number;
  application?: any;
  application_fee_amount?: any;
  automatic_payment_methods?: any;
  canceled_at?: any;
  cancellation_reason?: any;
  capture_method: string;
  client_secret: string;
  confirmation_method: string;
  created: number;
  currency: string;
  customer?: any;
  description?: any;
  invoice?: any;
  last_payment_error?: any;
  latest_charge: string;
  livemode: boolean;
  metadata: Metadata2;
  next_action?: any;
  on_behalf_of?: any;
  payment_method: string;
  payment_method_options: PaymentMethodOptions;
  payment_method_types: string[];
  processing?: any;
  receipt_email?: any;
  review?: any;
  setup_future_usage?: any;
  shipping?: any;
  source?: any;
  statement_descriptor?: any;
  statement_descriptor_suffix?: any;
  status: string;
  transfer_data?: any;
  transfer_group?: any;
}

export interface PaymentMethodOptions2 {}

export interface PhoneNumberCollection {
  enabled: boolean;
}

export interface TotalDetails {
  amount_discount: number;
  amount_shipping: number;
  amount_tax: number;
}

export interface StripePaymentInfo {
  id: string;
  object: string;
  after_expiration?: any;
  allow_promotion_codes?: any;
  amount_subtotal: number;
  amount_total: number;
  automatic_tax: AutomaticTax;
  billing_address_collection: string;
  cancel_url: string;
  client_reference_id?: any;
  consent?: any;
  consent_collection?: any;
  created: number;
  currency: string;
  custom_text: CustomText;
  customer?: any;
  customer_creation: string;
  customer_details: CustomerDetails;
  customer_email?: any;
  expires_at: number;
  livemode: boolean;
  locale?: any;
  metadata: Metadata;
  mode: string;
  payment_intent: PaymentIntent;
  payment_link?: any;
  payment_method_collection: string;
  payment_method_options: PaymentMethodOptions2;
  payment_method_types: string[];
  payment_status: string;
  phone_number_collection: PhoneNumberCollection;
  recovered_from?: any;
  setup_intent?: any;
  shipping_address_collection?: any;
  shipping_cost?: any;
  shipping_details?: any;
  shipping_options: any[];
  status: string;
  submit_type: string;
  subscription?: any;
  success_url: string;
  total_details: TotalDetails;
  url?: any;
}
