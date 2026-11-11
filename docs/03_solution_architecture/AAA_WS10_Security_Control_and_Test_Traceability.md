# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# WS-10.7: SECURITY CONTROL & TEST TRACEABILITY MATRIX

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S3-SPEC-WS10-07`  
**Stage:** Stage 3 — Architecture & Design  
**Workstream:** WS-10 — Security, Privacy, Compliance & Certificate Governance  
**Deliverable:** WS-10.7 — Security Control & Test Traceability Matrix  
**Governance Authority:** Nitin Patil (Operations & Technology Lead) & Neha Patil (Academic Director)  
**Date:** 04 November 2026  
**Status:** 🟡 **DRAFT — AWAITING MANAGEMENT REVIEW (GATE 3.5 OPEN)**  
**Execution Mode:** STRICTLY DOCUMENTATION-ONLY (IMPLEMENTATION FREEZE ACTIVE)  

---

## 1. Scope & Traceability Methodology

This document establishes the end-to-end security and compliance traceability baseline connecting Stage 2 requirements, Stage 3 architectural specifications (WS-06 through WS-10), WS-11 infrastructure dependencies, and Stage 4 pre-implementation test acceptance criteria.

---

## 2. Consolidated Master Security & Compliance Traceability Matrix

| Req ID | Security & Privacy Requirement | Originating Source | WS-07/08/09 Baseline | WS-10 Specification Reference | WS-11 Infrastructure Dependency | Stage 4 Pre-Implementation Test & Evidence Criterion |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-TR-01** | **Server-Side Authentication & Session Security** | WS-07 Finding | `AAA_WS07_Refined_Management_Decision_Register.md` | `AAA_WS10_Authentication_Authorization_and_AcademyOS_Security.md` | Session store (Redis / DB) evaluated in WS-11. | Unit test verifying OTP generated on server via CSPRNG; test verifying session cookie is `HttpOnly`, `Secure`, and `SameSite=Lax`. |
| **SEC-TR-02** | **Server-Side Rate Limiting & Brute-Force Lockout** | WS-07 & WS-09B | `AAA-S3-SPEC-WS09B-05` | `AAA_WS10_Authentication_Authorization_and_AcademyOS_Security.md` | API Gateway rate limiting tier in WS-11. | Automated test: 4th incorrect OTP within 15 minutes returns HTTP 429 and locks account temporarily. |
| **SEC-TR-03** | **JSONBlob Controlled Deprecation** | WS-07 Vulnerability | `AAA-S3-SPEC-WS09A-05` | `AAA_WS10_External_Integration_Security_Assessment.md` | PostgreSQL database active in WS-11. | 11-point readiness checklist evidenced; verified dual-read execution without student attempt loss. |
| **SEC-TR-04** | **Zero-PII Analytics & URL Query Redaction** | `AGENTS.md` Rule 4 | `AAA-S3-SPEC-WS09B-04` | `AAA_WS10_Zero_PII_Telemetry_Validation.md` | GTM container / GA4 property config. | Network payload audit verifying zero names, phones, emails, or scores in GA4 `collect` hits. |
| **SEC-TR-05** | **Server-Side Formula Injection Defense** | WS-07 Vulnerability | `src/lib/securitySanitizer.ts:321` | `AAA_WS10_Privacy_and_DPDP_Requirements_Assessment.md` | Ingestion API gateway runtime in WS-11. | Automated test verifying strings beginning with `=`, `+`, `-`, `@` are prepended with `'` prior to DB insertion. |
| **SEC-TR-06** | **Unbundled Dual Consent Logging** | `BRD-S2-LEAD-02` | `AAA-S3-SPEC-WS09B-06` | `AAA_WS10_Privacy_and_DPDP_Requirements_Assessment.md` | Relational persistence in WS-11. | Database audit verifying mandatory service consent and optional marketing consent recorded with microsecond timestamps. |
| **SEC-TR-07** | **90-Day Lead Retention Auto-Purge** | `BRD-S2-LEAD-03` | `AAA-S3-SPEC-WS09A-06` | `AAA_WS10_Privacy_and_DPDP_Requirements_Assessment.md` | Scheduled background cron worker in WS-11. | Automated test verifying non-enrolled leads older than 90 days are deleted by automated cleanup task. |
| **SEC-TR-08** | **Certificate Central Ledger & HMAC Verification** | Stage 2 Action `ACT-WS04-27` | `AAA-S3-SPEC-WS09A-02` | `AAA_WS10_Certificate_and_Achievement_Governance_Architecture.md` | Secret vault management in WS-11. | Test verifying QR code scan resolves to public verification page showing masked name and valid HMAC digest. |
| **SEC-TR-09** | **Encrypted Offline Lead Caching Buffer** | WS-09B Mandate | `src/components/LeadForm.tsx:591` | `AAA_WS10_Incident_Response_and_Risk_Management.md` | Client browser storage adapter. | Test verifying offline lead submissions cached in browser are encrypted and automatically deleted once synchronized. |
| **SEC-TR-10** | **Point-in-Time Recovery (PITR) Backup Verification** | WS-09A Mandate | `AAA-S3-SPEC-WS09A-07` | `AAA_WS10_Incident_Response_and_Risk_Management.md` | Cloud backup storage bucket in WS-11. | Quarterly disaster recovery restoration test evidenced with RPO $\le 5$ min and RTO $< 1$ hr. |

---

## 3. Stage-Gate Acceptance & Verification

This specification satisfies **WS-10.7** under Stage 3 Workstream WS-10. It is submitted in **DRAFT** status and will be formally reviewed under Management Determination `MGT-DET-S3-14`. Gate 3.5 remains **OPEN**.
