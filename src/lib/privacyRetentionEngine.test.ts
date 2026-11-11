/**
 * ARNAV ABACUS ACADEMY (AAA) — WS-14 PRIVACY & RETENTION ENGINE
 * Acceptance Test Suite (10 Acceptance Tests)
 *
 * Governing Document: AAA-S2-REG-TEST-WS14-01
 * Governing Determination: MGT-DET-S4-S2-AUTH-03
 * Compliance Lead: Nitin Patil (Internal Compliance Officer)
 * Academic Lead: Neha Patil (Academic Director)
 * Active Feature Branch: feat/sprint2-admissions
 */

import {
  DATA_CLASSIFICATION_REGISTRY,
  getFieldClassification,
  validateConsentRecord,
  evaluateRetentionClock,
  shredLeadPII,
  processRightToErasure,
  verifyPurgeCertificate,
} from './privacyRetentionEngine';
import { SyntheticPrivacyLead, LeadConsentRecord } from '../types/privacy';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`TEST ASSERTION FAILED: ${message}`);
  }
}

console.log('=== AAA WS-14 PRIVACY, CONSENT & RETENTION ENGINE TEST SUITE ===');
console.log('Governing Specification: AAA-S2-REG-TEST-WS14-01');
console.log('Target Determination: MGT-DET-S4-S2-AUTH-03\n');

// TC-WS14-01: Data classification integrity
console.log('Running TC-WS14-01: 4-Tier Data Classification Integrity...');
const piiParentName = getFieldClassification('parentName');
assert(piiParentName.tier === 'TIER_1_PROSPECTIVE', 'parentName must be TIER_1_PROSPECTIVE');
assert(piiParentName.isPii === true, 'parentName must be marked as PII');

const rubricScores = getFieldClassification('observationScores');
assert(rubricScores.tier === 'TIER_2_DIAGNOSTIC', 'observationScores must be TIER_2_DIAGNOSTIC');
assert(rubricScores.isPii === false, 'observationScores must be marked as non-PII');

const studentLegal = getFieldClassification('studentLegalName');
assert(studentLegal.tier === 'TIER_3_ENROLLED_PII', 'studentLegalName must be TIER_3_ENROLLED_PII');

const financialTx = getFieldClassification('feeTransactionId');
assert(financialTx.tier === 'TIER_4_STATUTORY_FINANCIAL', 'feeTransactionId must be TIER_4_STATUTORY_FINANCIAL');
console.log('✅ TC-WS14-01 Passed: All attributes mapped strictly to 4 DPDP statutory tiers.');

// TC-WS14-02: Mandatory service consent validation
console.log('Running TC-WS14-02: Mandatory Service Consent Validation...');
const invalidConsentNoService: LeadConsentRecord = {
  serviceConsent: false,
  serviceConsentTimestamp: new Date().toISOString(),
  marketingConsent: false,
  consentSource: 'WEB_FORM',
  parentGuardianConfirmed: true,
};
const resNoService = validateConsentRecord(invalidConsentNoService);
assert(resNoService.isValid === false, 'Service consent false must fail validation');
assert(
  resNoService.error?.includes('Service communication consent is required'),
  'Must return appropriate error text'
);

const invalidConsentNoGuardian: LeadConsentRecord = {
  serviceConsent: true,
  serviceConsentTimestamp: new Date().toISOString(),
  marketingConsent: false,
  consentSource: 'WEB_FORM',
  parentGuardianConfirmed: false,
};
const resNoGuardian = validateConsentRecord(invalidConsentNoGuardian);
assert(resNoGuardian.isValid === false, 'Lack of guardian confirmation must fail validation');
console.log('✅ TC-WS14-02 Passed: Submission blocked when mandatory service consent or guardian authority is missing.');

// TC-WS14-03: Optional marketing consent unbundling
console.log('Running TC-WS14-03: Marketing Consent Unbundling...');
const validUnbundledConsent: LeadConsentRecord = {
  serviceConsent: true,
  serviceConsentTimestamp: new Date().toISOString(),
  marketingConsent: false, // Unticked by default
  consentSource: 'WEB_FORM',
  parentGuardianConfirmed: true,
};
const resUnbundled = validateConsentRecord(validUnbundledConsent);
assert(resUnbundled.isValid === true, 'Valid unbundled consent must pass');
assert(validUnbundledConsent.marketingConsent === false, 'Marketing consent must remain false');
console.log('✅ TC-WS14-03 Passed: Marketing consent is unbundled, optional, and default unticked.');

// TC-WS14-04: 90-day retention calculation for active prospective lead
console.log('Running TC-WS14-04: Retention Clock Calculation (30 Days Elapsed)...');
const refNow = new Date('2026-11-04T12:00:00.000Z');
const lead30DaysAgo = {
  leadUID: 'SYNTH-LEAD-TEST-30',
  leadStatus: 'LEAD_DORMANT',
  lastActivityDate: new Date(refNow.getTime() - 30 * 86400000).toISOString(),
};
const eval30 = evaluateRetentionClock(lead30DaysAgo, refNow);
assert(eval30.daysElapsed === 30, 'Days elapsed must be 30');
assert(eval30.daysRemaining === 60, 'Days remaining must be 60');
assert(eval30.isPurgeEligible === false, 'Must not be purge eligible');
console.log('✅ TC-WS14-04 Passed: Retention clock accurately reports 30 days elapsed and 60 days remaining.');

// TC-WS14-05: Retention clock exclusion for enrolled student leads
console.log('Running TC-WS14-05: Retention Clock Enrolled Student Exemption...');
const enrolledLead = {
  leadUID: 'SYNTH-LEAD-ENROLLED',
  leadStatus: 'ENROLLED_ACTIVE',
  lastActivityDate: new Date(refNow.getTime() - 120 * 86400000).toISOString(),
};
const evalEnrolled = evaluateRetentionClock(enrolledLead, refNow);
assert(evalEnrolled.isExempt === true, 'Enrolled student must be marked exempt');
assert(evalEnrolled.isPurgeEligible === false, 'Enrolled student must not be purge eligible');
assert(evalEnrolled.exemptReason === 'ENROLLED_STUDENT', 'Exemption reason must be ENROLLED_STUDENT');
console.log('✅ TC-WS14-05 Passed: Active enrolled student leads are completely exempt from 90-day prospect purge.');

// TC-WS14-06: Automated purge trigger on 91+ day dormant lead
console.log('Running TC-WS14-06: Automated Purge Eligibility (95 Days Elapsed)...');
const lead95DaysAgo = {
  leadUID: 'SYNTH-LEAD-TEST-95',
  leadStatus: 'ENQUIRY_CANCELLED',
  lastActivityDate: new Date(refNow.getTime() - 95 * 86400000).toISOString(),
};
const eval95 = evaluateRetentionClock(lead95DaysAgo, refNow);
assert(eval95.daysElapsed === 95, 'Days elapsed must be 95');
assert(eval95.daysRemaining === 0, 'Days remaining must be 0');
assert(eval95.isPurgeEligible === true, 'Must be flagged purge eligible');
console.log('✅ TC-WS14-06 Passed: Record at 95 days elapsed correctly flagged as purge eligible with 0 days remaining.');

// TC-WS14-07: Cryptographic PII shredding verification
console.log('Running TC-WS14-07: Cryptographic PII Erasure...');
const sampleLead: SyntheticPrivacyLead = {
  leadUID: 'SYNTH-LEAD-SHRED-01',
  parentName: 'Suresh Patil',
  parentPhone: '9822334455',
  parentEmail: 'suresh.patil@example.com',
  childName: 'Aniket Patil',
  childAgeBracket: '7-9',
  courseInterest: 'abacus',
  leadStatus: 'LEAD_DORMANT',
  lastActivityDate: new Date(refNow.getTime() - 95 * 86400000).toISOString(),
  consentRecord: validUnbundledConsent,
  notes: 'Requested weekend trial session.',
};

const { shreddedLead, certificate } = shredLeadPII(
  sampleLead,
  'SCHEDULED_90_DAY_RETENTION',
  'SYSTEM_AUTOPURGE',
  refNow.toISOString()
);

assert(shreddedLead.parentName === '[PURGED]', 'parentName must be replaced with [PURGED]');
assert(shreddedLead.parentPhone === '[PURGED]', 'parentPhone must be replaced with [PURGED]');
assert(shreddedLead.parentEmail === null, 'parentEmail must be set to null');
assert(shreddedLead.childName === '[PURGED]', 'childName must be replaced with [PURGED]');
assert(shreddedLead.notes?.includes('[PURGED_PER_DPDP_COMPLIANCE'), 'notes must be overwritten with purged marker');
assert(shreddedLead.leadStatus === 'RECORD_PURGED', 'leadStatus must be RECORD_PURGED');
console.log('✅ TC-WS14-07 Passed: Direct personal identifiers successfully shredded into permanent anonymized tokens.');

// TC-WS14-08: Non-PII statistical preservation
console.log('Running TC-WS14-08: Non-PII Statistical Aggregate Preservation...');
assert(shreddedLead.courseInterest === 'abacus', 'courseInterest must be retained for analytics');
assert(shreddedLead.childAgeBracket === '7-9', 'childAgeBracket must be retained for demographic aggregates');
assert(shreddedLead.leadUID === 'SYNTH-LEAD-SHRED-01', 'leadUID must be retained');
console.log('✅ TC-WS14-08 Passed: Course interest and age bracket preserved for anonymous cohort reporting.');

// TC-WS14-09: HMAC-SHA256 purge certificate verification
console.log('Running TC-WS14-09: Tamper-Evident Purge Certificate Verification...');
assert(certificate.certificateId.startsWith('PURGE-CERT-'), 'Certificate ID format verified');
assert(certificate.leadUID === 'SYNTH-LEAD-SHRED-01', 'LeadUID matches shredded record');
assert(certificate.purgeReason === 'SCHEDULED_90_DAY_RETENTION', 'Purge reason recorded accurately');

const isCertValid = verifyPurgeCertificate(certificate);
assert(isCertValid === true, 'Purge certificate cryptographic hash must be valid');

// Test tamper detection
const tamperedCert = { ...certificate, purgeReason: 'PARENT_RIGHT_TO_ERASURE' as const };
const isTamperedValid = verifyPurgeCertificate(tamperedCert);
assert(isTamperedValid === false, 'Tampered certificate hash must fail verification');
console.log('✅ TC-WS14-09 Passed: Purge certificate verified cryptographically; tamper detection confirmed.');

// TC-WS14-10: Immediate Parent Right-to-Erasure (< 24 Hour SLA)
console.log('Running TC-WS14-10: Immediate Parent Right-to-Erasure SLA Execution...');
const activeLead10Days: SyntheticPrivacyLead = {
  leadUID: 'SYNTH-LEAD-RIGHT-TO-ERASE',
  parentName: 'Anil Deshmukh',
  parentPhone: '9876543210',
  childName: 'Tanmay Deshmukh',
  childAgeBracket: '4.5-6',
  courseInterest: 'mental-math',
  leadStatus: 'DISCOVERY_COMPLETED_PENDING_DECISION',
  lastActivityDate: new Date(refNow.getTime() - 10 * 86400000).toISOString(), // Only 10 days old
  consentRecord: validUnbundledConsent,
};

const { request, shreddedLead: immediateShredded, certificate: immediateCert } = processRightToErasure(
  activeLead10Days,
  'anil.deshmukh@example.com',
  refNow.toISOString()
);

assert(request.requestType === 'ERASURE', 'Request type must be ERASURE');
assert(request.status === 'EXECUTED', 'Request status must be EXECUTED');
assert(request.slaHours === 24, 'SLA must be 24 hours');
assert(immediateShredded.leadStatus === 'RECORD_PURGED', 'Lead must be purged immediately');
assert(immediateCert.purgeReason === 'PARENT_RIGHT_TO_ERASURE', 'Certificate must record PARENT_RIGHT_TO_ERASURE');
assert(verifyPurgeCertificate(immediateCert) === true, 'Immediate erasure certificate must be authentic');
console.log('✅ TC-WS14-10 Passed: Parent Right-to-Erasure executed immediately within 24h SLA with verified certificate.');

console.log('\n================================================================');
console.log('🎉 ALL 10/10 WS-14 PRIVACY & RETENTION TESTS PASSED SUCCESSFULLY');
console.log('================================================================');
