/**
 * ARNAV ABACUS ACADEMY (AAA) — WS-15 INTAKE BACKEND GATEWAY
 * Input Sanitization, Honeypot Bot Trap, Rate Limiter & Security Engine
 *
 * Governing Determination: MGT-DET-S4-S2-AUTH-04
 * System Architect & Compliance Lead: Nitin Patil (Operations & Tech Lead)
 * Academic Lead: Neha Patil (Academic Director)
 * Branch: feat/sprint2-admissions
 */

import {
  DiscoveryIntakePayload,
  GatewayResponse,
  RateLimitEntry,
  IdempotencyEntry,
  DuplicateSubmissionEntry,
  CourseInterest,
  ChildAgeBracket,
} from '../types/gateway';

/**
 * Valid course interest enumeration
 */
export const VALID_COURSES: CourseInterest[] = [
  'abacus',
  'vedic',
  'mental-math',
  'school-math',
  'olympiad',
];

/**
 * Valid child age brackets
 */
export const VALID_AGE_BRACKETS: ChildAgeBracket[] = [
  '4.5-6',
  '7-9',
  '10-14',
];

/**
 * Anti-Formula Injection & XSS Sanitizer
 * Strips HTML tags and neutralizes CSV/Excel formula characters (=, +, -, @, \t, \r)
 */
export function sanitizeStringInput(value: string | undefined | null): string {
  if (!value) return '';
  let sanitized = value.trim();

  // Strip script tags and their inner content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  // Strip style tags and their inner content
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  // Strip remaining HTML tags
  sanitized = sanitized.replace(/<[^>]*>/g, '').trim();

  // Guard against CSV/Excel formula injection for admin spreadsheet exports
  const formulaChars = ['=', '+', '-', '@', '\t', '\r'];
  if (formulaChars.some((char) => sanitized.startsWith(char))) {
    sanitized = "'" + sanitized;
  }

  return sanitized;
}

/**
 * Validates Indian 10-digit mobile phone standard
 */
export function validateIndianMobile(phone: string): { isValid: boolean; normalized?: string; error?: string } {
  if (!phone) {
    return { isValid: false, error: 'Mobile phone number is required.' };
  }

  // Strip non-digit characters (spaces, dashes, parens, +91)
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) {
    digits = digits.slice(2);
  }

  if (digits.length !== 10) {
    return {
      isValid: false,
      error: `Invalid phone length: expected 10 digits, received ${digits.length}.`,
    };
  }

  if (!/^[6-9]\d{9}$/.test(digits)) {
    return {
      isValid: false,
      error: 'Invalid Indian mobile number. Number must start with 6, 7, 8, or 9.',
    };
  }

  return { isValid: true, normalized: digits };
}

/**
 * In-Memory Rate Limiter Engine
 * Enforces maximum 5 submissions per 15-minute rolling window per client IP.
 */
export class GatewayRateLimiter {
  private ipStore: Map<string, RateLimitEntry> = new Map();
  private readonly maxRequests: number = 5;
  private readonly windowMs: number = 15 * 60 * 1000; // 15 minutes

  public check(ip: string, currentTimeMs: number = Date.now()): { allowed: boolean; retryAfterSeconds?: number } {
    const entry = this.ipStore.get(ip) || { ip, requestTimestamps: [] };
    
    // Filter timestamps within current rolling window
    const recentTimestamps = entry.requestTimestamps.filter(
      (ts) => currentTimeMs - ts < this.windowMs
    );

    if (recentTimestamps.length >= this.maxRequests) {
      const oldestInWindow = recentTimestamps[0];
      const timeRemainingMs = this.windowMs - (currentTimeMs - oldestInWindow);
      const retryAfterSeconds = Math.max(1, Math.ceil(timeRemainingMs / 1000));
      return { allowed: false, retryAfterSeconds };
    }

    recentTimestamps.push(currentTimeMs);
    this.ipStore.set(ip, { ip, requestTimestamps: recentTimestamps });
    return { allowed: true };
  }

  public reset(ip?: string): void {
    if (ip) {
      this.ipStore.delete(ip);
    } else {
      this.ipStore.clear();
    }
  }
}

/**
 * In-Memory Idempotency Cache
 */
export class GatewayIdempotencyStore {
  private cache: Map<string, IdempotencyEntry> = new Map();
  private readonly ttlMs: number = 60 * 60 * 1000; // 60 minutes

  public get(key: string, currentTimeMs: number = Date.now()): GatewayResponse | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (currentTimeMs - entry.cachedAt > this.ttlMs) {
      this.cache.delete(key);
      return null;
    }
    return entry.response;
  }

  public set(key: string, response: GatewayResponse, currentTimeMs: number = Date.now()): void {
    this.cache.set(key, { key, response, cachedAt: currentTimeMs });
  }

  public clear(): void {
    this.cache.clear();
  }
}

/**
 * In-Memory Duplicate Submission Throttler (180 Seconds Window)
 */
export class DuplicateSubmissionThrottler {
  private store: Map<string, DuplicateSubmissionEntry> = new Map();
  private readonly throttleMs: number = 180 * 1000; // 180 seconds

  public check(
    phone: string,
    courseInterest: string,
    currentTimeMs: number = Date.now()
  ): { isDuplicate: boolean; existingUID?: string } {
    const key = `${phone}_${courseInterest}`;
    const entry = this.store.get(key);

    if (entry && currentTimeMs - entry.submittedAt < this.throttleMs) {
      return { isDuplicate: true, existingUID: entry.leadUID };
    }
    return { isDuplicate: false };
  }

  public record(
    phone: string,
    courseInterest: string,
    leadUID: string,
    currentTimeMs: number = Date.now()
  ): void {
    const key = `${phone}_${courseInterest}`;
    this.store.set(key, { phone, courseInterest, leadUID, submittedAt: currentTimeMs });
  }

  public clear(): void {
    this.store.clear();
  }
}

// Global engine singletons
export const rateLimiterInstance = new GatewayRateLimiter();
export const idempotencyStoreInstance = new GatewayIdempotencyStore();
export const duplicateThrottlerInstance = new DuplicateSubmissionThrottler();

/**
 * Generates deterministic Lead UID in AAA-LEAD-YYYY-XXXX format
 */
export function generateLeadUID(currentTimeMs: number = Date.now()): string {
  const year = new Date(currentTimeMs).getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `AAA-LEAD-${year}-${randomSuffix}`;
}

/**
 * Primary Gateway Ingestion Processor
 */
export function processDiscoveryIntake(
  payload: DiscoveryIntakePayload,
  options?: { currentTimeMs?: number; rateLimiter?: GatewayRateLimiter }
): GatewayResponse {
  const now = options?.currentTimeMs || Date.now();
  const clientIp = payload.clientIp || '127.0.0.1';
  const limiter = options?.rateLimiter || rateLimiterInstance;

  // 1. Honeypot Anti-Bot Trap
  if (payload.website_url_hp && payload.website_url_hp.trim().length > 0) {
    // Quietly drop bot with synthetic 200 OK to confuse scraper
    return {
      statusCode: 200,
      success: true,
      leadUID: 'SYNTH-DROP-BOT',
      isBotDropped: true,
      message: 'Discovery session request received.',
    };
  }

  // 2. IP Rate Limiting Check
  const rateLimitResult = limiter.check(clientIp, now);
  if (!rateLimitResult.allowed) {
    return {
      statusCode: 429,
      success: false,
      error: 'Rate limit exceeded. Maximum 5 discovery submissions permitted per 15 minutes.',
      retryAfterSeconds: rateLimitResult.retryAfterSeconds,
      message: 'Too Many Requests.',
    };
  }

  // 3. Idempotency Check
  if (payload.idempotencyKey) {
    const cachedResponse = idempotencyStoreInstance.get(payload.idempotencyKey, now);
    if (cachedResponse) {
      return cachedResponse;
    }
  }

  // 4. Validate Indian Mobile Phone
  const phoneValidation = validateIndianMobile(payload.parentPhone);
  if (!phoneValidation.isValid) {
    return {
      statusCode: 400,
      success: false,
      error: phoneValidation.error || 'Invalid phone format.',
      message: 'Bad Request: Phone validation failed.',
    };
  }

  // 5. Validate Mandatory Consents
  if (!payload.parentGuardianConfirmed) {
    return {
      statusCode: 422,
      success: false,
      error: 'Parent or legal guardian authority confirmation is mandatory under DPDP child data protection provisions.',
      message: 'Unprocessable Entity: Guardian authority required.',
    };
  }

  if (!payload.serviceConsent) {
    return {
      statusCode: 422,
      success: false,
      error: 'Service communication consent is required to coordinate Discovery Session.',
      message: 'Unprocessable Entity: Service consent required.',
    };
  }

  // 6. Validate Course and Age Bracket Enumerations
  if (!VALID_COURSES.includes(payload.courseInterest as CourseInterest)) {
    return {
      statusCode: 400,
      success: false,
      error: `Invalid course interest. Must be one of: ${VALID_COURSES.join(', ')}.`,
      message: 'Bad Request: Course invalid.',
    };
  }

  if (!VALID_AGE_BRACKETS.includes(payload.childAgeBracket as ChildAgeBracket)) {
    return {
      statusCode: 400,
      success: false,
      error: `Invalid child age bracket. Must be one of: ${VALID_AGE_BRACKETS.join(', ')}.`,
      message: 'Bad Request: Age bracket invalid.',
    };
  }

  // 7. Anti-Formula Injection & XSS Sanitization
  const sanitizedParentName = sanitizeStringInput(payload.parentName);
  if (sanitizedParentName.length < 2) {
    return {
      statusCode: 400,
      success: false,
      error: 'Parent name must contain at least 2 valid characters.',
      message: 'Bad Request: Name too short.',
    };
  }

  // 8. 180-Second Duplicate Alert Suppression Check
  const normalizedPhone = phoneValidation.normalized!;
  const duplicateCheck = duplicateThrottlerInstance.check(normalizedPhone, payload.courseInterest, now);
  if (duplicateCheck.isDuplicate) {
    const existingUID = duplicateCheck.existingUID!;
    const duplicateResponse: GatewayResponse = {
      statusCode: 200,
      success: true,
      leadUID: existingUID,
      isDuplicateThrottled: true,
      message: 'Duplicate discovery request received within 180 seconds. Existing booking retained.',
      sanitizedPayload: {
        parentName: sanitizedParentName,
        parentPhone: normalizedPhone,
        childAgeBracket: payload.childAgeBracket,
        courseInterest: payload.courseInterest,
      },
    };

    if (payload.idempotencyKey) {
      idempotencyStoreInstance.set(payload.idempotencyKey, duplicateResponse, now);
    }
    return duplicateResponse;
  }

  // 9. Generate New Lead UID
  const newLeadUID = generateLeadUID(now);

  // Record duplicate suppression window
  duplicateThrottlerInstance.record(normalizedPhone, payload.courseInterest, newLeadUID, now);

  const successResponse: GatewayResponse = {
    statusCode: 200,
    success: true,
    leadUID: newLeadUID,
    isDuplicateThrottled: false,
    message: 'Discovery session booked successfully.',
    sanitizedPayload: {
      parentName: sanitizedParentName,
      parentPhone: normalizedPhone,
      parentEmail: payload.parentEmail ? sanitizeStringInput(payload.parentEmail) : null,
      childAgeBracket: payload.childAgeBracket,
      courseInterest: payload.courseInterest,
    },
  };

  // Cache idempotency response if key provided
  if (payload.idempotencyKey) {
    idempotencyStoreInstance.set(payload.idempotencyKey, successResponse, now);
  }

  return successResponse;
}

/**
 * Offline Network Resilience Fallback
 * Generates direct pre-filled WhatsApp link to Neha Patil (+91 90219 24968)
 */
export function generateWhatsAppFallbackUrl(parentName: string, courseInterest: string): string {
  const verifiedCenterPhone = '919021924968';
  const cleanName = sanitizeStringInput(parentName) || 'Parent';
  const courseLabel = courseInterest
    ? courseInterest.charAt(0).toUpperCase() + courseInterest.slice(1).replace('-', ' ')
    : 'Mathematics';

  const messageText = `Hello Neha Patil, I am ${cleanName}. I would like to book a Discovery Session for ${courseLabel} at Arnav Abacus Academy, Wakad.`;
  return `https://wa.me/${verifiedCenterPhone}?text=${encodeURIComponent(messageText)}`;
}
