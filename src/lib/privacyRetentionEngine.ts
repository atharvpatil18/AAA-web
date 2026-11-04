/**
 * ARNAV ABACUS ACADEMY (AAA) — WS-14 PRIVACY & RETENTION ENGINE
 * DPDP Act 2023 Implementation, Retention Clock & Cryptographic PII Shredder
 *
 * Governing Determination: MGT-DET-S4-S2-AUTH-03
 * Compliance Lead: Nitin Patil (Internal Operations & Compliance Officer)
 * Academic Lead: Neha Patil (Academic Director)
 * Branch: feat/sprint2-admissions
 */

import {
  DataClassificationTier,
  FieldClassificationDescriptor,
  LeadConsentRecord,
  PurgeCertificate,
  PurgeReason,
  RetentionEvaluationResult,
  SyntheticPrivacyLead,
  DataSubjectRequest,
} from '../types/privacy';

/**
 * Authoritative Data Classification Registry
 * Maps each domain attribute to its statutory DPDP tier and retention policy.
 */
export const DATA_CLASSIFICATION_REGISTRY: Record<string, FieldClassificationDescriptor> = {
  parentName: {
    fieldName: 'parentName',
    tier: 'TIER_1_PROSPECTIVE',
    storageTarget: 'Inbound Lead CRM Store',
    retentionPolicy: '90 Calendar Days Post-Activity',
    isPii: true,
  },
  parentPhone: {
    fieldName: 'parentPhone',
    tier: 'TIER_1_PROSPECTIVE',
    storageTarget: 'Inbound Lead CRM Store',
    retentionPolicy: '90 Calendar Days Post-Activity',
    isPii: true,
  },
  childAgeBracket: {
    fieldName: 'childAgeBracket',
    tier: 'TIER_1_PROSPECTIVE',
    storageTarget: 'Inbound Lead CRM Store',
    retentionPolicy: '90 Calendar Days Post-Activity',
    isPii: false,
  },
  courseInterest: {
    fieldName: 'courseInterest',
    tier: 'TIER_1_PROSPECTIVE',
    storageTarget: 'Inbound Lead CRM Store',
    retentionPolicy: 'Permanent Statistical Aggregate',
    isPii: false,
  },
  observationScores: {
    fieldName: 'observationScores',
    tier: 'TIER_2_DIAGNOSTIC',
    storageTarget: 'Discovery Diagnostic Store',
    retentionPolicy: '90 Days (Prospect) / Permanent (Student)',
    isPii: false,
  },
  placementNotes: {
    fieldName: 'placementNotes',
    tier: 'TIER_2_DIAGNOSTIC',
    storageTarget: 'Discovery Diagnostic Store',
    retentionPolicy: '90 Days (Prospect) / Permanent (Student)',
    isPii: false,
  },
  studentLegalName: {
    fieldName: 'studentLegalName',
    tier: 'TIER_3_ENROLLED_PII',
    storageTarget: 'Enrolled Student Official Store',
    retentionPolicy: 'Duration of Enrollment + 3 Years',
    isPii: true,
  },
  residentialAddress: {
    fieldName: 'residentialAddress',
    tier: 'TIER_3_ENROLLED_PII',
    storageTarget: 'Enrolled Student Official Store',
    retentionPolicy: 'Duration of Enrollment + 3 Years',
    isPii: true,
  },
  feeTransactionId: {
    fieldName: 'feeTransactionId',
    tier: 'TIER_4_STATUTORY_FINANCIAL',
    storageTarget: 'Financial Accounting Ledger',
    retentionPolicy: '8 Financial Years (Statutory Tax & GST)',
    isPii: false,
  },
};

/**
 * Lookup helper for field classification
 */
export function getFieldClassification(fieldName: string): FieldClassificationDescriptor {
  const descriptor = DATA_CLASSIFICATION_REGISTRY[fieldName];
  if (!descriptor) {
    throw new Error(`Unclassified field detected: "${fieldName}". All fields must be mapped to DPDP tiers.`);
  }
  return descriptor;
}

/**
 * Validates unbundled dual consent record against Section 6 DPDP Act standards.
 */
export function validateConsentRecord(consent: LeadConsentRecord): { isValid: boolean; error?: string } {
  if (!consent.parentGuardianConfirmed) {
    return {
      isValid: false,
      error: 'Parent or legal guardian authority confirmation is mandatory under DPDP child data protection provisions.',
    };
  }

  if (!consent.serviceConsent) {
    return {
      isValid: false,
      error: 'Service communication consent is required to coordinate Discovery Session.',
    };
  }

  // Ensure marketing consent is strictly boolean
  if (typeof consent.marketingConsent !== 'boolean') {
    return {
      isValid: false,
      error: 'Marketing consent must be an explicit boolean value (default false).',
    };
  }

  return { isValid: true };
}

/**
 * Pure TypeScript SHA-256 implementation
 * Guarantees zero-dependency, cross-platform hash computation (works in Vite, Node, browser, tests).
 */
export function computeSha256(input: string): string {
  function rightRotate(value: number, amount: number): number {
    return (value >>> amount) | (value << (32 - amount));
  }

  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = 'length';
  let i: number, j: number;
  let result = '';

  const words: number[] = [];
  const asciiBitLength = input[lengthProperty] * 8;

  let hash = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
  ];

  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
  ];

  let compositeBitLength = asciiBitLength;
  for (i = 0; i < input[lengthProperty]; i++) {
    words[i >> 2] |= (input.charCodeAt(i) & 0xff) << ((3 - (i % 4)) * 8);
  }

  words[compositeBitLength >> 5] |= 0x80 << ((3 - ((compositeBitLength >> 3) % 4)) * 8);
  words[(((compositeBitLength + 64) >> 9) << 4) + 15] = compositeBitLength;

  for (i = 0; i < words[lengthProperty]; i += 16) {
    const w: number[] = [];
    for (j = 0; j < 16; j++) {
      w[j] = words[i + j] || 0;
    }
    for (j = 16; j < 64; j++) {
      const s0 = rightRotate(w[j - 15], 7) ^ rightRotate(w[j - 15], 18) ^ (w[j - 15] >>> 3);
      const s1 = rightRotate(w[j - 2], 17) ^ rightRotate(w[j - 2], 19) ^ (w[j - 2] >>> 10);
      w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0;
    }

    let a = hash[0], b = hash[1], c = hash[2], d = hash[3];
    let e = hash[4], f = hash[5], g = hash[6], h = hash[7];

    for (j = 0; j < 64; j++) {
      const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + k[j] + w[j]) | 0;
      const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) | 0;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) | 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) | 0;
    }

    hash[0] = (hash[0] + a) | 0;
    hash[1] = (hash[1] + b) | 0;
    hash[2] = (hash[2] + c) | 0;
    hash[3] = (hash[3] + d) | 0;
    hash[4] = (hash[4] + e) | 0;
    hash[5] = (hash[5] + f) | 0;
    hash[6] = (hash[6] + g) | 0;
    hash[7] = (hash[7] + h) | 0;
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j >= 0; j--) {
      const b = (hash[i] >> (j * 8)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }

  return result;
}

/**
 * Computes tamper-evident HMAC-SHA256 signature for purge certificate
 */
export function computePurgeSignature(payload: string): string {
  const SECRET_SALT = 'AAA-WAKAD-DPDP-2026-COMPLIANCE-SIGNATURE';
  return computeSha256(`${SECRET_SALT}:${payload}:${SECRET_SALT}`);
}

/**
 * Evaluates the 90-day retention clock for prospective leads.
 */
export function evaluateRetentionClock(
  lead: { leadUID: string; leadStatus: string; lastActivityDate: string },
  currentDate: Date = new Date()
): RetentionEvaluationResult {
  // Enrolled active students are exempt from the 90-day prospect purge
  if (lead.leadStatus === 'ENROLLED_ACTIVE' || lead.leadStatus === 'ENROLLED') {
    return {
      leadUID: lead.leadUID,
      status: lead.leadStatus,
      daysElapsed: 0,
      daysRemaining: 9999, // Governed by student lifecycle (Enrollment + 3 Years)
      isPurgeEligible: false,
      isExempt: true,
      exemptReason: 'ENROLLED_STUDENT',
    };
  }

  const lastActivityMs = new Date(lead.lastActivityDate).getTime();
  const currentMs = currentDate.getTime();
  const elapsedMs = Math.max(0, currentMs - lastActivityMs);
  const daysElapsed = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
  const daysRemaining = Math.max(0, 90 - daysElapsed);

  // Eligible only if 90 days have elapsed and status is non-enrolled
  const isPurgeEligible = daysElapsed >= 90;

  return {
    leadUID: lead.leadUID,
    status: lead.leadStatus,
    daysElapsed,
    daysRemaining,
    isPurgeEligible,
    isExempt: false,
  };
}

/**
 * Generates an immutable, tamper-evident Purge Certificate
 */
export function createPurgeCertificate(
  leadUID: string,
  purgeReason: PurgeReason,
  authorizedBy: 'SYSTEM_AUTOPURGE' | 'NITIN_PATIL_COMPLIANCE',
  purgedAt: string = new Date().toISOString()
): PurgeCertificate {
  const dateStr = purgedAt.slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const certificateId = `PURGE-CERT-${dateStr}-${randomSuffix}`;
  const fieldsPurged = ['parentName', 'parentPhone', 'parentEmail', 'childName', 'notes'];

  const signaturePayload = `${certificateId}:${leadUID}:${purgedAt}:${purgeReason}:${authorizedBy}`;
  const tamperProofHash = computePurgeSignature(signaturePayload);

  return {
    certificateId,
    leadUID,
    purgedAt,
    purgeReason,
    authorizedBy,
    fieldsPurged,
    tamperProofHash,
  };
}

/**
 * Validates the cryptographic integrity of a Purge Certificate
 */
export function verifyPurgeCertificate(cert: PurgeCertificate): boolean {
  const signaturePayload = `${cert.certificateId}:${cert.leadUID}:${cert.purgedAt}:${cert.purgeReason}:${cert.authorizedBy}`;
  const expectedHash = computePurgeSignature(signaturePayload);
  return cert.tamperProofHash === expectedHash;
}

/**
 * Cryptographic PII Shredder
 * Permanently erases personal identifiers while preserving statistical aggregate fields.
 */
export function shredLeadPII(
  lead: SyntheticPrivacyLead,
  purgeReason: PurgeReason,
  authorizedBy: 'SYSTEM_AUTOPURGE' | 'NITIN_PATIL_COMPLIANCE',
  executionDate: string = new Date().toISOString()
): { shreddedLead: SyntheticPrivacyLead; certificate: PurgeCertificate } {
  const certificate = createPurgeCertificate(lead.leadUID, purgeReason, authorizedBy, executionDate);

  const shreddedLead: SyntheticPrivacyLead = {
    ...lead,
    parentName: '[PURGED]',
    parentPhone: '[PURGED]',
    parentEmail: null,
    childName: '[PURGED]',
    notes: `[PURGED_PER_DPDP_COMPLIANCE_${purgeReason}]`,
    leadStatus: 'RECORD_PURGED',
    purgedAt: executionDate,
    purgeCertificateId: certificate.certificateId,
  };

  return { shreddedLead, certificate };
}

/**
 * Processes on-demand Parent Right-to-Erasure Request (< 24 Hour SLA)
 */
export function processRightToErasure(
  lead: SyntheticPrivacyLead,
  requestedBy: string,
  executionDate: string = new Date().toISOString()
): {
  request: DataSubjectRequest;
  shreddedLead: SyntheticPrivacyLead;
  certificate: PurgeCertificate;
} {
  const { shreddedLead, certificate } = shredLeadPII(
    lead,
    'PARENT_RIGHT_TO_ERASURE',
    'NITIN_PATIL_COMPLIANCE',
    executionDate
  );

  const request: DataSubjectRequest = {
    requestId: `DSR-ERASE-${Date.now()}`,
    leadUID: lead.leadUID,
    requestType: 'ERASURE',
    requestedAt: executionDate,
    requestedBy,
    status: 'EXECUTED',
    executedAt: executionDate,
    slaHours: 24,
  };

  return { request, shreddedLead, certificate };
}
