/**
 * ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-16
 * Authoritative Server-Side Intake Gateway (Cloudflare Pages Edge Function)
 * Route: POST /api/discovery-intake
 *
 * Governing Determinations: MGT-DET-S4-S3-PLAN-01, MGT-DET-S4-S3-AUTH-02
 * Governing Architecture: AAA-WS16-ARCH-SRV-01, AAA-WS16-ARCH-ID-01, AAA-WS16-POL-CSV-01
 * Primary Maintainers: Nitin Patil (Operations & Tech Lead) & Neha Patil (Academic Director)
 */

export interface ServerIntakePayload {
  parentName: string;
  parentPhone: string;
  parentEmail?: string | null;
  childAgeBracket: string;
  courseInterest: string;
  serviceConsent: boolean;
  marketingConsent?: boolean;
  parentGuardianConfirmed: boolean;
  website_url_hp?: string;
  idempotencyKey?: string;
}

export interface ServerGatewayResponse {
  statusCode: number;
  success: boolean;
  id?: string;
  leadReference?: string;
  leadUID?: string;
  isBotDropped?: boolean;
  isDuplicate?: boolean;
  error?: string;
  message: string;
  retryAfterSeconds?: number;
  createdAt?: string;
}

// In-Memory Rate Limiter Store for Edge Worker Isolate
interface RateLimitBucket {
  count: number;
  resetAtMs: number;
}
const rateLimitCache = new Map<string, RateLimitBucket>();
const MAX_REQUESTS_PER_WINDOW = 5;
const WINDOW_DURATION_MS = 15 * 60 * 1000; // 15 minutes

// In-Memory Idempotency Cache for Edge Worker Isolate
interface CachedIdempotency {
  response: ServerGatewayResponse;
  expiresAtMs: number;
}
const idempotencyCache = new Map<string, CachedIdempotency>();
const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Atomic Sequence Counter for Human-Readable Lead Reference
let leadSequenceCounter = 1;

/**
 * Validates Indian 10-digit mobile phone standard
 */
export function validateIndianMobileServer(phone: string): { isValid: boolean; normalized?: string; error?: string } {
  if (!phone) {
    return { isValid: false, error: 'Mobile phone number is required.' };
  }

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
 * Strips HTML tags and script content without mutating formula characters in database storage
 */
export function sanitizeStringVerbatim(value: string | undefined | null): string {
  if (!value) return '';
  let clean = value.trim();
  clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  clean = clean.replace(/<[^>]*>/g, '').trim();
  return clean;
}

/**
 * Extracts verified client IP address from request headers
 */
export function extractClientIp(request: Request): string {
  const cfConnectingIp = request.headers.get('CF-Connecting-IP');
  if (cfConnectingIp && cfConnectingIp.trim() !== '') {
    return cfConnectingIp.trim();
  }

  const xForwardedFor = request.headers.get('X-Forwarded-For');
  if (xForwardedFor && xForwardedFor.trim() !== '') {
    const firstIp = xForwardedFor.split(',')[0].trim();
    if (firstIp) return firstIp;
  }

  return '127.0.0.1';
}

/**
 * Zero-PII SHA-256 hash for IP & audit logging (CERT-In Directions 2022 compliance)
 */
export async function hashSha256(value: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle && typeof TextEncoder !== 'undefined') {
    const msgBuffer = new TextEncoder().encode(value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = ((hash << 5) - hash) + value.charCodeAt(i);
    hash |= 0;
  }
  return 'hash_' + Math.abs(hash).toString(16);
}

/**
 * Core Gateway Request Handler
 */
export async function handleDiscoveryIntakeRequest(
  request: Request,
  env?: Record<string, any>,
  currentTimeMs: number = Date.now()
): Promise<Response> {
  const headers = new Headers({
    'Content-Type': 'application/json',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
  });

  // 1. Enforce HTTP POST
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({
        statusCode: 405,
        success: false,
        error: 'Method Not Allowed. Only HTTP POST is permitted.',
        message: 'Method Not Allowed',
      }),
      { status: 405, headers }
    );
  }

  // 2. Extract Trusted Client IP & Enforce Edge Rate Limiting
  const clientIp = extractClientIp(request);
  const now = currentTimeMs;
  const ipBucket = rateLimitCache.get(clientIp);

  if (ipBucket) {
    if (now < ipBucket.resetAtMs) {
      if (ipBucket.count >= MAX_REQUESTS_PER_WINDOW) {
        const retryAfterSeconds = Math.ceil((ipBucket.resetAtMs - now) / 1000);
        return new Response(
          JSON.stringify({
            statusCode: 429,
            success: false,
            error: 'Rate limit exceeded. Maximum 5 submissions permitted per 15 minutes.',
            retryAfterSeconds,
            message: 'Too Many Requests',
          }),
          {
            status: 429,
            headers: {
              ...Object.fromEntries(headers.entries()),
              'Retry-After': String(retryAfterSeconds),
            },
          }
        );
      }
      ipBucket.count += 1;
    } else {
      rateLimitCache.set(clientIp, { count: 1, resetAtMs: now + WINDOW_DURATION_MS });
    }
  } else {
    rateLimitCache.set(clientIp, { count: 1, resetAtMs: now + WINDOW_DURATION_MS });
  }

  // 3. Parse JSON Body Safely
  let payload: ServerIntakePayload;
  try {
    payload = await request.json();
  } catch {
    return new Response(
      JSON.stringify({
        statusCode: 400,
        success: false,
        error: 'Invalid JSON request payload.',
        message: 'Bad Request',
      }),
      { status: 400, headers }
    );
  }

  // 4. Honeypot Bot Trap (Server Boundary Enforcement)
  if (payload.website_url_hp && payload.website_url_hp.trim().length > 0) {
    // Return silent synthetic 200 OK. Zero persistence, zero SMS/WhatsApp trigger.
    return new Response(
      JSON.stringify({
        statusCode: 200,
        success: true,
        leadReference: 'AAA-LEAD-BOT-TRAP',
        leadUID: 'AAA-LEAD-BOT-TRAP',
        isBotDropped: true,
        message: 'Discovery session request received.',
      }),
      { status: 200, headers }
    );
  }

  // 5. Idempotency Check
  const idempotencyKey =
    request.headers.get('Idempotency-Key') || payload.idempotencyKey || null;

  if (idempotencyKey) {
    const cached = idempotencyCache.get(idempotencyKey);
    if (cached && now < cached.expiresAtMs) {
      return new Response(JSON.stringify(cached.response), {
        status: cached.response.statusCode || 200,
        headers,
      });
    }
  }

  // 6. Server-Side Input Validation
  const parentNameClean = sanitizeStringVerbatim(payload.parentName);
  if (!parentNameClean || parentNameClean.length < 2) {
    return new Response(
      JSON.stringify({
        statusCode: 400,
        success: false,
        error: 'Parent name must contain at least 2 valid characters.',
        message: 'Bad Request',
      }),
      { status: 400, headers }
    );
  }

  const phoneValidation = validateIndianMobileServer(payload.parentPhone);
  if (!phoneValidation.isValid) {
    return new Response(
      JSON.stringify({
        statusCode: 400,
        success: false,
        error: phoneValidation.error || 'Invalid Indian mobile number format.',
        message: 'Bad Request',
      }),
      { status: 400, headers }
    );
  }

  // 7. Mandatory DPDP Consents & Guardian Authority Self-Declaration
  if (!payload.parentGuardianConfirmed) {
    return new Response(
      JSON.stringify({
        statusCode: 422,
        success: false,
        error: 'Guardian Authority Self-Declaration is mandatory under Section 9 DPDP Act 2023.',
        message: 'Unprocessable Entity',
      }),
      { status: 422, headers }
    );
  }

  if (!payload.serviceConsent) {
    return new Response(
      JSON.stringify({
        statusCode: 422,
        success: false,
        error: 'Service communication consent is required to coordinate diagnostic assessment.',
        message: 'Unprocessable Entity',
      }),
      { status: 422, headers }
    );
  }

  // 8. Allocate 3-Tier Lead Identity & Persist
  // Tier 1: System UUID
  const systemUUID =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `uuid-${now}-${Math.floor(Math.random() * 1000000)}`;

  const currentYear = new Date(now).getFullYear();
  const createdAtIso = new Date(now).toISOString();

  // If Supabase environment credentials are provided, persist to Supabase PostgreSQL Mumbai (ap-south-1)
  const supabaseUrl = env?.SUPABASE_URL;
  const serviceKey = env?.SUPABASE_SERVICE_ROLE_KEY || env?.SUPABASE_ANON_KEY;

  if (supabaseUrl && serviceKey) {
    try {
      const clientIpHashed = await hashSha256(clientIp);
      const rpcRes = await fetch(`${supabaseUrl}/rest/v1/rpc/fn_submit_discovery_lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          p_idempotency_key: idempotencyKey || systemUUID,
          p_parent_name: parentNameClean,
          p_mobile_number: phoneValidation.normalized,
          p_email: payload.parentEmail || null,
          p_child_age_bracket: payload.childAgeBracket,
          p_course_interest: payload.courseInterest,
          p_service_consent: payload.serviceConsent,
          p_marketing_consent: payload.marketingConsent || false,
          p_guardian_confirmed: payload.parentGuardianConfirmed,
          p_client_ip_hash: clientIpHashed,
        }),
      });

      if (!rpcRes.ok) {
        const errJson = await rpcRes.json().catch(() => ({ message: 'PostgREST RPC execution failed' }));
        return new Response(
          JSON.stringify({
            statusCode: 500,
            success: false,
            error: 'Database persistence failed. Ingestion aborted.',
            details: errJson?.message,
            message: 'Internal Server Error',
          }),
          { status: 500, headers }
        );
      }

      const persistenceResult = (await rpcRes.json()) as any;
      const responseBody: ServerGatewayResponse = {
        statusCode: 201,
        success: true,
        id: persistenceResult.id || systemUUID,
        leadReference: persistenceResult.leadReference,
        leadUID: persistenceResult.leadReference,
        createdAt: persistenceResult.createdAt || createdAtIso,
        isDuplicate: persistenceResult.isDuplicate || false,
        message: persistenceResult.message || 'Discovery session inquiry registered and permanently persisted.',
      };

      if (idempotencyKey) {
        idempotencyCache.set(idempotencyKey, {
          response: responseBody,
          expiresAtMs: now + IDEMPOTENCY_TTL_MS,
        });
      }

      return new Response(JSON.stringify(responseBody), {
        status: 201,
        headers,
      });
    } catch (dbErr: any) {
      return new Response(
        JSON.stringify({
          statusCode: 500,
          success: false,
          error: 'Database persistence unreachable. Ingestion aborted.',
          message: 'Internal Server Error',
        }),
        { status: 500, headers }
      );
    }
  }

  // Fallback for test harness & local development (in-memory atomic sequence)
  // Tier 2: Authoritative Sequential Lead Reference (AAA-LEAD-YYYY-[00001])
  const seqPadded = String(leadSequenceCounter++).padStart(5, '0');
  const leadReference = `AAA-LEAD-${currentYear}-${seqPadded}`;

  // Tier 3: Client Idempotency Key (tracked in cache)
  const responseBody: ServerGatewayResponse = {
    statusCode: 201,
    success: true,
    id: systemUUID,
    leadReference,
    leadUID: leadReference, // Backward-compatible alias
    message: 'Discovery session request registered successfully.',
    createdAt: createdAtIso,
  };

  if (idempotencyKey) {
    idempotencyCache.set(idempotencyKey, {
      response: responseBody,
      expiresAtMs: now + IDEMPOTENCY_TTL_MS,
    });
  }

  // Return HTTP 201 Created
  return new Response(JSON.stringify(responseBody), {
    status: 201,
    headers,
  });
}

/**
 * Cloudflare Pages Function standard entrypoint
 */
export async function onRequestPost(context: { request: Request; env?: Record<string, any> }): Promise<Response> {
  return handleDiscoveryIntakeRequest(context.request, context.env);
}
