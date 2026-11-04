/**
 * ARNAV ABACUS ACADEMY (AAA) — WS-15 INTAKE GATEWAY
 * Acceptance Test Suite (10 Acceptance Tests)
 *
 * Governing Document: AAA-S2-REG-TEST-WS15-01
 * Governing Determination: MGT-DET-S4-S2-AUTH-04
 * System Architect & Compliance Lead: Nitin Patil (Operations & Tech Lead)
 * Academic Lead: Neha Patil (Academic Director)
 * Active Feature Branch: feat/sprint2-admissions
 */

import {
  processDiscoveryIntake,
  sanitizeStringInput,
  validateIndianMobile,
  GatewayRateLimiter,
  generateWhatsAppFallbackUrl,
} from './intakeGatewayEngine';
import { DiscoveryIntakePayload } from '../types/gateway';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`TEST ASSERTION FAILED: ${message}`);
  }
}

console.log('=== AAA WS-15 INTAKE BACKEND GATEWAY TEST SUITE ===');
console.log('Governing Specification: AAA-S2-REG-TEST-WS15-01');
console.log('Target Determination: MGT-DET-S4-S2-AUTH-04\n');

const testLimiter = new GatewayRateLimiter();
const testIp = '192.168.1.100';
testLimiter.reset(testIp);

const basePayload: DiscoveryIntakePayload = {
  parentName: 'Vikram Joshi',
  parentPhone: '9822011223',
  childAgeBracket: '4.5-6',
  courseInterest: 'abacus',
  serviceConsent: true,
  marketingConsent: false,
  parentGuardianConfirmed: true,
  clientIp: testIp,
};

// TC-WS15-01: Valid discovery payload processing
console.log('Running TC-WS15-01: Valid Discovery Payload Processing...');
const res01 = processDiscoveryIntake(basePayload, { rateLimiter: testLimiter });
assert(res01.statusCode === 200, 'Status code must be 200');
assert(res01.success === true, 'Success must be true');
assert(res01.leadUID?.startsWith('AAA-LEAD-'), 'Assigned UID must start with AAA-LEAD-');
assert(res01.sanitizedPayload?.parentName === 'Vikram Joshi', 'Parent name must be preserved');
console.log('✅ TC-WS15-01 Passed: Valid payload returns HTTP 200 with generated lead UID.');

// TC-WS15-02: Indian mobile validation
console.log('Running TC-WS15-02: Indian Mobile Validation Standard...');
const validMobile = validateIndianMobile('+91 98220 11223');
assert(validMobile.isValid === true, '+91 formatted mobile must be valid');
assert(validMobile.normalized === '9822011223', 'Must normalize to 10 digits');

const invalidMobileShort = validateIndianMobile('12345');
assert(invalidMobileShort.isValid === false, 'Short number must fail validation');

const invalidMobileLeadingZero = validateIndianMobile('0982201122');
assert(invalidMobileLeadingZero.isValid === false, 'Leading 0 phone must fail validation');
console.log('✅ TC-WS15-02 Passed: Strict Indian 10-digit mobile validation enforced.');

// TC-WS15-03: Anti-Formula Injection guard
console.log('Running TC-WS15-03: Anti-Formula Injection Sanitization...');
const formulaInput = '=SUM(A1:A10)';
const sanitizedFormula = sanitizeStringInput(formulaInput);
assert(sanitizedFormula === "'=SUM(A1:A10)", 'Formula must be escaped with prepended single quote');

const cmdPayload: DiscoveryIntakePayload = {
  ...basePayload,
  parentName: "+cmd|' /C calc'!A0",
  parentPhone: '9890123456',
  clientIp: '10.0.0.1',
};
const res03 = processDiscoveryIntake(cmdPayload, { rateLimiter: testLimiter });
assert(res03.statusCode === 200, 'Request succeeds with sanitized input');
assert(res03.sanitizedPayload?.parentName?.startsWith("'+cmd"), 'Must escape +cmd injection');
console.log('✅ TC-WS15-03 Passed: Formula characters (=, +, -, @) safely escaped for spreadsheet exports.');

// TC-WS15-04: HTML/Script XSS tag stripping
console.log('Running TC-WS15-04: XSS Tag Sanitization...');
const xssInput = "<script>alert('XSS')</script>Neha Patil";
const sanitizedXss = sanitizeStringInput(xssInput);
assert(sanitizedXss === 'Neha Patil', 'HTML script tags must be stripped completely');
assert(!sanitizedXss.includes('<') && !sanitizedXss.includes('>'), 'Zero tag brackets allowed');
console.log('✅ TC-WS15-04 Passed: Script and HTML tags completely stripped.');

// TC-WS15-05: Honeypot bot trap detection
console.log('Running TC-WS15-05: Honeypot Anti-Bot Trap Detection...');
const botPayload: DiscoveryIntakePayload = {
  ...basePayload,
  website_url_hp: 'https://malicious-spam-url.xyz/phish',
  clientIp: '10.0.0.2',
};
const res05 = processDiscoveryIntake(botPayload, { rateLimiter: testLimiter });
assert(res05.statusCode === 200, 'Bot request returns synthetic 200 OK');
assert(res05.isBotDropped === true, 'isBotDropped flag must be true');
assert(res05.leadUID === 'SYNTH-DROP-BOT', 'LeadUID must be SYNTH-DROP-BOT');
console.log('✅ TC-WS15-05 Passed: Bot quietly dropped with synthetic 200 OK without writing to CRM.');

// TC-WS15-06: Rate limiting enforcement (5 requests per 15 min window)
console.log('Running TC-WS15-06: Rate Limiting Enforcement (5 Req / 15 Min)...');
const rateLimitIp = '172.16.0.5';
testLimiter.reset(rateLimitIp);
const refTime = 1000000;

for (let i = 1; i <= 5; i++) {
  const allowed = testLimiter.check(rateLimitIp, refTime + i * 1000);
  assert(allowed.allowed === true, `Request #${i} must be allowed`);
}

// 6th request should fail with 429
const floodRes = testLimiter.check(rateLimitIp, refTime + 6000);
assert(floodRes.allowed === false, '6th request must be rejected');
assert((floodRes.retryAfterSeconds || 0) > 0, 'Retry-after seconds must be returned');
console.log('✅ TC-WS15-06 Passed: Rate limiter permits 5 requests and blocks 6th with HTTP 429.');

// TC-WS15-07: Rate limiter reset after time window expiration
console.log('Running TC-WS15-07: Rate Limiter Rolling Window Expiration...');
const fifteenMinsLater = refTime + 15 * 60 * 1000 + 1000;
const postExpiryRes = testLimiter.check(rateLimitIp, fifteenMinsLater);
assert(postExpiryRes.allowed === true, 'Request after 15 minutes must be allowed');
console.log('✅ TC-WS15-07 Passed: Rate limiter permits subsequent requests after 15-minute window expires.');

// TC-WS15-08: Idempotency key deduplication
console.log('Running TC-WS15-08: Idempotency Key Deduplication...');
const idemKey = 'IDEM-TEST-KEY-UUID-001';
const idemPayload: DiscoveryIntakePayload = {
  ...basePayload,
  parentPhone: '9765432100',
  idempotencyKey: idemKey,
  clientIp: '10.0.0.3',
};

const res08A = processDiscoveryIntake(idemPayload, { rateLimiter: testLimiter });
const res08B = processDiscoveryIntake(idemPayload, { rateLimiter: testLimiter });
assert(res08A.leadUID === res08B.leadUID, 'Second request must return identical cached lead UID');
console.log('✅ TC-WS15-08 Passed: Idempotency key returns cached response without duplicate creation.');

// TC-WS15-09: Duplicate submission alert throttling (180s window)
console.log('Running TC-WS15-09: Duplicate Submission 180s Throttling...');
const dupPhone = '9922883344';
const dupPayload1: DiscoveryIntakePayload = {
  ...basePayload,
  parentPhone: dupPhone,
  courseInterest: 'vedic',
  clientIp: '10.0.0.4',
};
const res09A = processDiscoveryIntake(dupPayload1, { rateLimiter: testLimiter });
assert(res09A.isDuplicateThrottled === false, 'First request must not be duplicate throttled');

const dupPayload2: DiscoveryIntakePayload = {
  ...basePayload,
  parentPhone: dupPhone,
  courseInterest: 'vedic',
  clientIp: '10.0.0.5',
};
const res09B = processDiscoveryIntake(dupPayload2, { rateLimiter: testLimiter });
assert(res09B.isDuplicateThrottled === true, 'Second request within 180s must be throttled');
assert(res09B.leadUID === res09A.leadUID, 'Existing lead UID must be retained');
console.log('✅ TC-WS15-09 Passed: Duplicate phone + course within 180s throttles alert and retains UID.');

// TC-WS15-10: WhatsApp offline fallback generator
console.log('Running TC-WS15-10: Offline Direct WhatsApp Fallback Link...');
const fallbackUrl = generateWhatsAppFallbackUrl('Sunita Rao', 'abacus');
assert(fallbackUrl.includes('https://wa.me/919021924968'), 'Target phone must be +91 90219 24968');
assert(fallbackUrl.includes('Sunita%20Rao'), 'Parent name must be URI encoded');
assert(fallbackUrl.includes('Abacus'), 'Course name must be capitalized in message');
console.log('✅ TC-WS15-10 Passed: WhatsApp fallback link properly generated for offline resilience.');

console.log('\n================================================================');
console.log('🎉 ALL 10/10 WS-15 INTAKE GATEWAY TESTS PASSED SUCCESSFULLY');
console.log('================================================================');
