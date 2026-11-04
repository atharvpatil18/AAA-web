/**
 * ARNAV ABACUS ACADEMY (AAA) — WS-14 PRIVACY & RETENTION ENGINE
 * Core Type Definitions & Data Classification Schemas
 *
 * Governing Determination: MGT-DET-S4-S2-AUTH-03
 * Compliance Lead: Nitin Patil (Internal Operations & Compliance Officer)
 * Academic Lead: Neha Patil (Academic Director)
 * Branch: feat/sprint2-admissions
 */

/**
 * 4-Tier Data Classification Taxonomy under DPDP Architecture
 */
export type DataClassificationTier =
  | 'TIER_1_PROSPECTIVE'      // Parent Name, Phone, Child Age Bracket, Course Interest
  | 'TIER_2_DIAGNOSTIC'       // Discovery Rubric Scores (1-4), Placement Track Notes
  | 'TIER_3_ENROLLED_PII'     // Student Legal Name, DOB, Residential Address, Emergency Contact
  | 'TIER_4_STATUTORY_FINANCIAL'; // Fee Invoices, GST Records, Transaction IDs

/**
 * Field metadata descriptor for data classification auditing
 */
export interface FieldClassificationDescriptor {
  fieldName: string;
  tier: DataClassificationTier;
  storageTarget: string;
  retentionPolicy: string;
  isPii: boolean;
}

/**
 * Unbundled Dual Consent Record
 * Section 6 DPDP Act 2023 Compliance
 */
export interface LeadConsentRecord {
  serviceConsent: boolean;          // Mandatory: required for Discovery scheduling
  serviceConsentTimestamp: string; // ISO 8601 UTC
  marketingConsent: boolean;        // Optional: Unticked by default
  marketingConsentTimestamp?: string;
  consentSource: 'WEB_FORM' | 'PHONE_INBOUND' | 'WALK_IN';
  parentGuardianConfirmed: boolean; // Confirms legal guardian authority
  consentIpAddressMasked?: string;  // e.g. 192.168.1.xxx
}

/**
 * Purge reason classification
 */
export type PurgeReason =
  | 'SCHEDULED_90_DAY_RETENTION'
  | 'PARENT_RIGHT_TO_ERASURE'
  | 'ADMINISTRATIVE_PURGE';

/**
 * Tamper-Evident Cryptographic Purge Certificate
 */
export interface PurgeCertificate {
  certificateId: string;       // e.g. PURGE-CERT-20261104-XXXX
  leadUID: string;             // Original UID of the purged lead
  purgedAt: string;            // ISO 8601 UTC
  purgeReason: PurgeReason;
  authorizedBy: 'SYSTEM_AUTOPURGE' | 'NITIN_PATIL_COMPLIANCE';
  fieldsPurged: string[];      // ['parentName', 'parentPhone', 'parentEmail', 'childName', 'notes']
  tamperProofHash: string;     // HMAC-SHA256 hash verifying certificate integrity
}

/**
 * Result of evaluating lead retention against 90-day window
 */
export interface RetentionEvaluationResult {
  leadUID: string;
  status: string;
  daysElapsed: number;
  daysRemaining: number;
  isPurgeEligible: boolean;
  isExempt: boolean;
  exemptReason?: string;
}

/**
 * Synthetic Lead Structure used for compliance tests and sandbox execution
 */
export interface SyntheticPrivacyLead {
  leadUID: string;
  parentName: string;
  parentPhone: string;
  parentEmail?: string | null;
  childName: string;
  childAgeBracket: string;
  courseInterest: string;
  leadStatus: string;
  lastActivityDate: string; // ISO 8601 UTC
  consentRecord: LeadConsentRecord;
  notes?: string;
  purgedAt?: string;
  purgeCertificateId?: string;
}

/**
 * Parent Data Subject Request (DSR) under DPDP Act
 */
export interface DataSubjectRequest {
  requestId: string;
  leadUID: string;
  requestType: 'ACCESS_SUMMARY' | 'CORRECTION' | 'ERASURE';
  requestedAt: string;
  requestedBy: string; // Parent Phone or Email
  status: 'PENDING' | 'EXECUTED' | 'REJECTED';
  executedAt?: string;
  slaHours: number; // 24 for erasure, 48 for correction
}
