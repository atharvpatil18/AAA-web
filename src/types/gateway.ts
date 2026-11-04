/**
 * ARNAV ABACUS ACADEMY (AAA) — WS-15 INTAKE BACKEND GATEWAY
 * Type Definitions & Ingestion Gateway Schemas
 *
 * Governing Determination: MGT-DET-S4-S2-AUTH-04
 * System Architect & Compliance Lead: Nitin Patil (Operations & Tech Lead)
 * Academic Lead: Neha Patil (Academic Director)
 * Branch: feat/sprint2-admissions
 */

/**
 * Valid course interest categories for AAA discovery intake
 */
export type CourseInterest =
  | 'abacus'
  | 'vedic'
  | 'mental-math'
  | 'school-math'
  | 'olympiad';

/**
 * Valid age bracket groupings
 */
export type ChildAgeBracket = '4.5-6' | '7-9' | '10-14';

/**
 * Discovery intake payload submitted from LeadForm or DemoBookingModal
 */
export interface DiscoveryIntakePayload {
  parentName: string;
  parentPhone: string;
  parentEmail?: string | null;
  childAgeBracket: ChildAgeBracket | string;
  courseInterest: CourseInterest | string;
  serviceConsent: boolean;
  marketingConsent: boolean;
  parentGuardianConfirmed: boolean;
  website_url_hp?: string; // Hidden honeypot field (must be empty)
  clientIp?: string;
  idempotencyKey?: string;
}

/**
 * Gateway response structure
 */
export interface GatewayResponse {
  statusCode: number;
  success: boolean;
  id?: string;
  leadReference?: string;
  leadUID?: string;
  sanitizedPayload?: Partial<DiscoveryIntakePayload>;
  message: string;
  error?: string;
  retryAfterSeconds?: number;
  isBotDropped?: boolean;
  isDuplicateThrottled?: boolean;
}

/**
 * In-memory rate limiting tracking entry
 */
export interface RateLimitEntry {
  ip: string;
  requestTimestamps: number[];
}

/**
 * In-memory idempotency cache entry
 */
export interface IdempotencyEntry {
  key: string;
  response: GatewayResponse;
  cachedAt: number;
}

/**
 * In-memory duplicate submission tracking entry
 */
export interface DuplicateSubmissionEntry {
  phone: string;
  courseInterest: string;
  leadUID: string;
  submittedAt: number;
}
