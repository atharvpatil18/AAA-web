# AAA SPRINT 2 — WS-14 TEST AND ACCEPTANCE REGISTER
## Privacy, Consent & Retention Test Verification Register

**Document Reference:** `AAA-S2-REG-TEST-WS14-01`  
**Phase:** Stage 4 — Sprint 2 Test Register (WS-14 Privacy & Retention)  
**Governing Baseline:** `MGT-DET-S4-S2-PLAN-06`, `AAA-S2-ARCH-WS14-01`, `AAA-S2-SPEC-WS14-01`  
**Target Determination:** `MGT-DET-S4-S2-AUTH-03`  
**Compliance Lead:** Nitin Patil (Internal Compliance Officer)  
**Academic Lead:** Neha Patil (Academic Director)  
**Active Feature Branch:** `feat/sprint2-admissions`  
**Production Status:** 🔒 **STRICTLY LOCKED** (`main` untouched at `a21a3d1`)  
**Date:** 04 November 2026  
**Status:** 🟡 **SUBMITTED FOR MANAGEMENT IMPLEMENTATION AUTHORIZATION**

---

## 1. Quality Assurance Objective & Framework

The purpose of this register is to define the exact automated verification test suite for **Workstream 14 (Privacy, Consent & Retention Architecture)**.

All test cases are implemented in [`src/lib/privacyRetentionEngine.test.ts`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/lib/privacyRetentionEngine.test.ts) and executed via `cmd /c "npx tsx src/lib/privacyRetentionEngine.test.ts"`.

---

## 2. Test Case Register (10 Acceptance Tests)

| Test ID | Test Category | Scenario / Assertion Description | Expected Result | Pass Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **`TC-WS14-01`** | Data Classification | Verify that all data fields map strictly to one of the 4 defined DPDP tiers (`TIER_1_PROSPECTIVE`, `TIER_2_DIAGNOSTIC`, `TIER_3_ENROLLED_PII`, `TIER_4_STATUTORY_FINANCIAL`). | Zero unclassified or orphaned fields. | Exact classification taxonomy returned. |
| **`TC-WS14-02`** | Consent Governance | Attempt intake submission with `serviceConsent = false`. | Validation failure: Submission blocked with clear error message. | Throws `ValidationError: Service consent mandatory`. |
| **`TC-WS14-03`** | Consent Unbundling | Submit intake with `serviceConsent = true` and `marketingConsent = false`. | Submission succeeds; service communication permitted, marketing broadcast explicitly prohibited. | Record created with `marketingConsent: false`. |
| **`TC-WS14-04`** | Retention Clock | Evaluate retention clock for dormant lead with last activity 30 days ago. | Retention engine reports `daysElapsed = 30`, `daysRemaining = 60`, `isPurgeEligible = false`. | Accurate integer countdown returned. |
| **`TC-WS14-05`** | Retention Clock (Enrolled Exemption) | Evaluate retention clock for an enrolled student lead (`ENROLLED_ACTIVE`). | Engine identifies record as exempt from the 90-day lead purge, applying statutory student lifecycle policy. | `isPurgeEligible = false`, `exemptReason: "ENROLLED_STUDENT"`. |
| **`TC-WS14-06`** | Retention Expiry Trigger | Evaluate retention clock for dormant lead with last activity 95 days ago. | Retention engine flags record as `isPurgeEligible = true`, `daysRemaining = 0`. | Flagged for automated nightly purge batch. |
| **`TC-WS14-07`** | Cryptographic PII Erasure | Execute `shredLeadPII` on synthetic expired lead record. | `parentName`, `parentPhone`, `childName` permanently replaced with `"[PURGED]"`, `parentEmail` set to `null`, `notes` overwritten. | Zero PII strings remain in sanitized record. |
| **`TC-WS14-08`** | Statistical Aggregate Preservation | Inspect shredded record from `TC-WS14-07` for non-PII attributes. | `courseInterest`, `leadSource`, and original `createdAt` timestamp preserved for cohort analytics. | Aggregate metadata intact for business intelligence. |
| **`TC-WS14-09`** | Tamper-Evident Purge Certificate | Verify generated `PurgeCertificate` schema and HMAC-SHA256 signature. | Certificate contains `certificateId`, `leadUID`, `purgedAt`, `authorizedBy`, and valid HMAC hash that validates against payload. | Cryptographic verification passes with 100% integrity. |
| **`TC-WS14-10`** | Parent Right-to-Erasure | Process on-demand Right-to-Erasure request for an active non-enrolled lead (age 10 days). | Record is shredded immediately within SLA, generating an audit certificate with `PARENT_RIGHT_TO_ERASURE`. | Immediate status transition to `RECORD_PURGED`. |

---

## 3. Compliance Acceptance Thresholds

1. **Zero PII Leakage:** Automated scan of shredded records must confirm zero regex matches for 10-digit phone numbers, email patterns, or human names.
2. **Deterministic Tamper-Proofing:** Any modification to a purge certificate must invalidate its HMAC-SHA256 signature.
3. **Execution Safety:** All tests must run against isolated synthetic mocks (`SYNTH-LEAD-001` through `SYNTH-LEAD-005`).
4. **Build & Type Cleanliness:** `tsc --noEmit` and `npm run build` must compile with Exit Code 0.
