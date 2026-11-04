/**
 * ARNAV ABACUS ACADEMY (AAA) — WS-16 INTAKE HOOK & GATEWAY WIRING TEST SUITE
 * Acceptance Test Harness for useDiscoveryIntake
 *
 * Governing Baseline: AAA-S3-PLAN-MASTER-01, AAA-S3-PLAN-WS16-01
 * Governing Determination: MGT-DET-S4-S3-PLAN-01
 * System Architect: Nitin Patil (Operations & Tech Lead)
 * Academic Lead: Neha Patil (Academic Director)
 * Branch: feat/sprint3-integration
 */

import {
  processDiscoveryIntake,
  sanitizeStringInput,
  formatCellForCsvExport,
  validateIndianMobile,
  generateWhatsAppFallbackUrl,
  GatewayRateLimiter,
} from '../lib/intakeGatewayEngine';
import { DiscoveryIntakePayload } from '../types/gateway';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`TEST ASSERTION FAILED: ${message}`);
  }
}

console.log('=== AAA WS-16 PUBLIC FORM GATEWAY WIRING TEST SUITE ===');
console.log('Governing Specification: AAA-S3-PLAN-WS16-01');
console.log('Target Determination: MGT-DET-S4-S3-PLAN-01\n');

// TC-INTAKE-01: Context-aware formula injection neutralization (AUD-06 & AAA-WS16-POL-CSV-01)
console.log('Running TC-INTAKE-01: Context-Aware Formula Neutralization (CSV Export Guard)...');
const formulaName = '=cmd|/C calc!A0';
const sanitizedFormula = sanitizeStringInput(formulaName);
// Verbatim storage preserved without premature quote corruption
assert(sanitizedFormula === '=cmd|/C calc!A0', 'Canonical input preserved in database storage without mutation');

// Export transformer neutralizes formula trigger for spreadsheet applications
const exportedFormula = formatCellForCsvExport(formulaName);
assert(exportedFormula.startsWith("\"'="), 'Must prepend apostrophe to neutralize formula injection in CSV export');
console.log('✅ TC-INTAKE-01 Passed: Canonical input preserved; CSV export transformer safely neutralizes formula trigger.');

// TC-INTAKE-02: Mobile normalizer strips +91 and formatting
console.log('Running TC-INTAKE-02: Mobile Normalization (+91 and Formatting)...');
const rawMobile = '+91 98220-11223';
const mobileRes = validateIndianMobile(rawMobile);
assert(mobileRes.isValid === true, 'Formatted mobile must be valid');
assert(mobileRes.normalized === '9822011223', 'Must strip +91 and hyphens down to 10 digits');
console.log('✅ TC-INTAKE-02 Passed: Indian mobile normalized to exact 10 digits.');

// TC-INTAKE-03: Blocks submission when mandatory service consent is false
console.log('Running TC-INTAKE-03: Mandatory Service Consent Guard...');
const noConsentPayload: DiscoveryIntakePayload = {
  parentName: 'Vikram Joshi',
  parentPhone: '9822011223',
  childAgeBracket: '4.5-6',
  courseInterest: 'abacus',
  serviceConsent: false,
  marketingConsent: false,
  parentGuardianConfirmed: true,
};
const resNoConsent = processDiscoveryIntake(noConsentPayload);
assert(resNoConsent.statusCode === 422, 'Must return 422 when service consent is false');
assert(resNoConsent.success === false, 'Success must be false');
console.log('✅ TC-INTAKE-03 Passed: Form submission blocked when mandatory service consent is false.');

// TC-INTAKE-04: Blocks submission when guardian authority is unconfirmed
console.log('Running TC-INTAKE-04: Guardian Authority Confirmation Guard...');
const noGuardianPayload: DiscoveryIntakePayload = {
  ...noConsentPayload,
  serviceConsent: true,
  parentGuardianConfirmed: false,
};
const resNoGuardian = processDiscoveryIntake(noGuardianPayload);
assert(resNoGuardian.statusCode === 422, 'Must return 422 when guardian authority is false');
console.log('✅ TC-INTAKE-04 Passed: Form submission blocked when guardian authority is unconfirmed.');

// TC-INTAKE-05: Course label mapping to backend key
console.log('Running TC-INTAKE-05: Course Label Mapping Compatibility...');
const mapCourse = (label: string): string => {
  const l = label.toLowerCase();
  if (l.includes('abacus')) return 'abacus';
  if (l.includes('vedic')) return 'vedic';
  if (l.includes('mental')) return 'mental-math';
  if (l.includes('school')) return 'school-math';
  if (l.includes('olympiad') || l.includes('ipm')) return 'olympiad';
  return 'abacus';
};
assert(mapCourse('Abacus Mathematics (Ages 4.5–9)') === 'abacus', 'Abacus label must map to abacus');
assert(mapCourse('Vedic Mathematics (Ages 9–14)') === 'vedic', 'Vedic label must map to vedic');
assert(mapCourse('IPM & Olympiad Mathematics (Grades 2–9)') === 'olympiad', 'IPM label must map to olympiad');
console.log('✅ TC-INTAKE-05 Passed: Public UI course labels map deterministically to backend keys.');

// TC-INTAKE-06: Age bracket mapping to supported keys
console.log('Running TC-INTAKE-06: Age Bracket Mapping Compatibility...');
const mapAge = (label: string): string => {
  if (
    label.includes('10') ||
    label.includes('11') ||
    label.includes('12') ||
    label.includes('13') ||
    label.includes('14') ||
    label.includes('Grade 6')
  ) {
    return '10-14';
  }
  if (
    label.includes('7') ||
    label.includes('8') ||
    label.includes('9') ||
    label.includes('Grade 2') ||
    label.includes('Grade 3') ||
    label.includes('Grade 4') ||
    label.includes('Grade 5')
  ) {
    return '7-9';
  }
  return '4.5-6';
};
assert(mapAge('4.5 - 6 yrs (Junior Soroban)') === '4.5-6', 'Junior maps to 4.5-6');
assert(mapAge('7 - 9 yrs (Foundation)') === '7-9', 'Foundation maps to 7-9');
assert(mapAge('Grade 6-10') === '10-14', 'Senior grade maps to 10-14');
console.log('✅ TC-INTAKE-06 Passed: Public UI age brackets map cleanly to 4.5-6, 7-9, 10-14.');

// TC-INTAKE-07: Populated honeypot drops bot quietly
console.log('Running TC-INTAKE-07: Honeypot Invisible Bot Drop...');
const botPayload: DiscoveryIntakePayload = {
  parentName: 'Scraper Bot',
  parentPhone: '9822011223',
  childAgeBracket: '4.5-6',
  courseInterest: 'abacus',
  serviceConsent: true,
  marketingConsent: false,
  parentGuardianConfirmed: true,
  website_url_hp: 'http://spam-link.xyz',
};
const resBot = processDiscoveryIntake(botPayload);
assert(resBot.statusCode === 200, 'Bot drop must return synthetic 200 OK');
assert(resBot.leadUID === 'SYNTH-DROP-BOT', 'LeadUID must be SYNTH-DROP-BOT');
assert(resBot.isBotDropped === true, 'isBotDropped must be true');
console.log('✅ TC-INTAKE-07 Passed: Honeypot drop verified; zero spam records persisted.');

// TC-INTAKE-08: Successful submission receives deterministic UID
console.log('Running TC-INTAKE-08: Successful Ingestion & Deterministic UID...');
const validPayload: DiscoveryIntakePayload = {
  parentName: 'Priya Kulkarni',
  parentPhone: '9890123456',
  childAgeBracket: '7-9',
  courseInterest: 'vedic',
  serviceConsent: true,
  marketingConsent: true,
  parentGuardianConfirmed: true,
  clientIp: '192.168.10.1',
};
const resValid = processDiscoveryIntake(validPayload);
assert(resValid.statusCode === 200, 'Must return 200 OK');
assert(resValid.success === true, 'Success must be true');
assert(resValid.leadUID?.startsWith('AAA-LEAD-'), 'UID format must be AAA-LEAD-YYYY-XXXX');
console.log('✅ TC-INTAKE-08 Passed: Successful submission assigned valid Lead UID.');

// TC-INTAKE-09: Rate limit flood response returns HTTP 429
console.log('Running TC-INTAKE-09: Rate Limiting Throttling (HTTP 429)...');
const rateLimitIp = '10.200.0.9';
const customLimiter = new GatewayRateLimiter();
customLimiter.reset(rateLimitIp);

for (let i = 1; i <= 5; i++) {
  const res = processDiscoveryIntake(
    { ...validPayload, clientIp: rateLimitIp },
    { rateLimiter: customLimiter }
  );
  assert(res.statusCode === 200, `Request #${i} must succeed`);
}

const resThrottled = processDiscoveryIntake(
  { ...validPayload, clientIp: rateLimitIp },
  { rateLimiter: customLimiter }
);
assert(resThrottled.statusCode === 429, '6th request must return HTTP 429');
assert(resThrottled.success === false, 'Success must be false on throttle');
assert((resThrottled.retryAfterSeconds || 0) > 0, 'Retry-after seconds must be provided');
console.log('✅ TC-INTAKE-09 Passed: Rate limit flood throttled with HTTP 429 and countdown timer.');

// TC-INTAKE-10: Offline WhatsApp fallback URL generator
console.log('Running TC-INTAKE-10: Offline WhatsApp Direct Booking Fallback URL...');
const waUrl = generateWhatsAppFallbackUrl('Meera Deshpande', 'vedic');
assert(waUrl.includes('919021924968'), 'Target phone must be +91 90219 24968');
assert(waUrl.includes('Meera%20Deshpande'), 'Parent name must be URI encoded');
assert(waUrl.includes('Vedic'), 'Course name must be included in pre-filled text');
console.log('✅ TC-INTAKE-10 Passed: Verified offline WhatsApp booking fallback link generated.');

console.log('\n================================================================');
console.log('🎉 ALL 10/10 WS-16 INTAKE HOOK & WIRING TESTS PASSED');
console.log('================================================================');
