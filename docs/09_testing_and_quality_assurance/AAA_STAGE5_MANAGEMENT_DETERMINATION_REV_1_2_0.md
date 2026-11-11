# ARNAV ABACUS ACADEMY (AAA) — EXECUTIVE MANAGEMENT DETERMINATION
## Executive Management Determination: Formal Enactment of Stage 5 Conditional Technical Acceptance (Revision 1.2.0)

**Determination Reference:** `MGT-DET-S5-REV-1.2.0-ACPT`  
**Document Status:** **RATIFIED & FORMALLY ENACTED BY EXECUTIVE LEADERSHIP**  
**Governing Baseline Determinations:**  
- `MGT-DET-S4-S3-CLOSURE-FINAL-10` (Sprint 3 Delivery Acceptance)  
- `MGT-DET-S5-QA-COND-01` (Stage 5 Initial Conditional Acceptance)  
- `MGT-DET-S5-RECON-02` (Stage 5 Reconciled Baseline & Hardening Tiers)  
- `MGT-DET-S5-STAGING-03-CORR-01` (Staging Live Evidence Protocol & Corrected Variance Baseline)  
**Audited Evidence Baseline Commit:** `e7d8bc7e2c590da5d1faeac0659cfef15e28a47e` (`e7d8bc7`)  
**Active Working Branch:** `feat/sprint3-integration`  
**Production Main Baseline:** `a21a3d1129cc17fc6650bfd04648eb91199e6fa8` (🔒 **STRICTLY LOCKED**)  
**Drafting Body:** Internal QA Review Team  
**Executive Signatories:** Nitin Patil (Operations, Technology & Compliance Lead) & Neha Patil (Founder & Academic Director)  
**Date of Enactment:** 06-November-2026  

---

## 1. Executive Purpose & Scope of Proposed Determination

This draft determination is prepared for the consideration of AAA Executive Leadership. 

When formally approved and executed by the authorized leadership, this Determination will:
1. Review and acknowledge the findings of the internal **Live Staging Evidence Independent Verification Report** (`AAA_STAGE5_LIVE_EVIDENCE_INDEPENDENT_VERIFICATION.md`).
2. Consider adoption of the proposed **Revised Stage 5 Conditional Technical Acceptance Certificate (Revision 1.2.0)** (`AAA-S5-CERT-GATE-01-REV-1.2.0`).
3. Formally register the **Open Conditions & Closure Evidence Register (Revision 1.2.0)** (`AAA_STAGE5_OPEN_CONDITIONS_AND_CLOSURE_REGISTER.md`).
4. Re-affirm the absolute lock on production branch `main` at `a21a3d1129cc17fc6650bfd04648eb91199e6fa8`.

---

## 2. Evaluation of Live Staging Verifications

The Internal QA Review Team presents the following empirical findings for management review:

### 2.1 Resolution of Capacity & Concurrency (`QA-CAP-01`)
- The five-student micro-batch pedagogical limit has been demonstrated on PostgreSQL 17.11 on the isolated staging Supabase instance (`ghbjtmfskgcraxafhlch`, AWS Mumbai `ap-south-1`).
- The check constraint `chk_max_batch_capacity` (`CHECK (enrolled_count >= 0 AND enrolled_count <= 5)`) and PL/pgSQL row-level locking (`SELECT ... FOR UPDATE`) prevented oversubscription under a real two-process asynchronous race condition (`TC-CAP-DB-03`).
- **Proposed Classification:** Reclassify Hardening Item `QA-CAP-01` as **🟢 SATISFIED (LIVE POSTGRESQL VERIFIED)** on the tested pooler database connection route.

### 2.2 Resolution of Canary Disaster Recovery Drill (`QA-INF-02`)
- Logical database extraction, symmetric GPG AES-256 encryption, corruption simulation, GPG decryption, and table restoration were successfully executed against synthetic table `public.canary_audit` in 0.35 seconds.
- Zero plaintext passphrases were leaked, and academy data tables remained untouched.
- **Proposed Classification:** Reclassify Hardening Item `QA-INF-02` (Canary Restore Drill) as **🟢 SATISFIED (CANARY DRILL VERIFIED)**.
- **Operational Qualification:** Full-database automated recovery remains governed by the approved **24-hour database temporary risk variance (Pathway 3A)**. Automated daily scheduled exports remain an open operational condition for post-launch Phase 2. Automated daily backup scheduling and full-database DR remain unverified.

### 2.3 Resolution of Sibling Enrolment Data Structure (`QA-ROS-01`)
- Refactoring of `ApprovedEmailRecord` to support multi-student arrays (`students: EnrolledSiblingSummary[]`) has been verified in automated test suites. Sibling intake records no longer overwrite existing student profiles in the ingestion data structures.
- **Proposed Classification:** Reclassify Hardening Item `QA-ROS-01` as **🟢 SATISFIED (CODE REMEDIATED)**.

---

## 3. Explicit Inventory of Preserved Open Conditions

In strict accordance with leadership policy against silent gate downgrades, this draft records that the following five conditions remain open, active, and binding:

```
====================================================================================================
                        PRESERVED OPEN CONDITIONS INVENTORY
====================================================================================================
  1. QA-WS-16 (Live HTTPS PostgREST Staging Smoke Test)
     - Status: OPEN (Mandatory Pre-Merge Blocker)
     - Impact: Staging browser form submission must be verified end-to-end prior to merging to main.
     
  2. QA-INT-02 (50-Concurrency PostgREST RPC Load Benchmark)
     - Status: OPEN (Pre-Campaign Condition)
     - Impact: Blocks paid Meta/Google ad spend. Organic single-center admissions permitted.
     
  3. QA-LEG-01 (External Indian Legal Counsel Policy Review)
     - Status: OPEN (Pre-Online-Payment Condition)
     - Impact: Blocks online payment gateway activation and online fee claims. Existing offline
               academy fee collection (cash/cheque/UPI at center) remains unaffected.
     
  4. QA-WS-18 (Multi-Sibling Practice Session Attribution & Sequence Binding)
     - Status: OPEN (Practice Platform Restriction)
     - Impact: Sibling enrollment is supported, but individual practice attempt histories share
               parent login credentials. Complete separation of practice records is NOT certified.
               
  5. QA-INF-02 Operational DR (Automated Daily Scheduled Off-Site Exports)
     - Status: OPEN (Post-Launch Phase 2 Hardening)
     - Impact: Operates under approved 24-hour database temporary risk variance. Automated cron export
               and full-database disaster recovery remain unverified pending post-launch automation.
====================================================================================================
```

---

## 4. Preservation of Prior Architectural Determinations

This proposed draft reaffirms the following boundaries established in earlier management determinations:
1. **Planned Cloud Expenditure & Usage Limits:** Active infrastructure is modeled on free-tier allowances (planned ₹0.00 / month). However, free-tier quotas (Cloudflare 500 builds/mo; Supabase 500MB DB size, 50k MAU, connection limits) carry upgrade risks upon scaling (~₹2,100/mo).
2. **Infrastructure Verification Boundary:** Free Tier and AWS Mumbai region claims apply **strictly to the verified staging project**. Production infrastructure provider, plan, compute allocations, and backup configurations remain **UNVERIFIED** as production has not been accessed.
3. **Pathway 3A Temporary Risk Variance:** The academy accepts a database temporary risk variance of up to 24 hours under staging free-tier allowances. Instant WhatsApp dispatch is acknowledged as an operational staff notification channel, NOT an ACID-compliant database backup or zero-RPO guarantee.
4. **AcademyOS Boundary Lockdown:** The 8 core student practice platform files (`/practice/*`, `/login`, `practiceData.ts`) remain strictly protected and unchanged (0 bytes diff against `main`).
5. **Accessibility Design Target:** The 44px touch-target rule represents an internal AAA design target for mobile usability, not a formal certification of WCAG 2.1 AA conformance.
6. **Non-Production Nature:** This document proposes conditional technical acceptance only. It does not certify unconditional acceptance or general production readiness.

---

## 5. Proposed Directives & Next Authorized Actions

Upon executive approval and signature:
1. **Production Branch Lock Maintained:** Production `main` remains locked at `a21a3d1129cc17fc6650bfd04648eb91199e6fa8`. No merge, push, or deployment is permitted.
2. **Mandatory Pre-Merge Step:** Condition `QA-WS-16` (Live HTTPS PostgREST smoke test) must be executed on staging before requesting a production merge gate.
3. **Git Working Tree Policy:** The governance documentation files shall remain uncommitted untracked files in the working directory until separate management authorization to commit is given.
4. **Execution Freeze:** Zero live database queries, zero migrations, and zero source code edits are authorized under this documentary task.

---

## 6. Executive Endorsement & Formal Signatures

**Formally Ratified, Approved and Enacted on this 06th Day of November, 2026:**

```
[ RATIFIED & SIGNED BY EXECUTIVE LEADERSHIP ]

Nitin Patil
Operations, Technology & Compliance Lead
Arnav Abacus Academy, Wakad, Pune
Date: 06-November-2026

Neha Patil
Founder & Academic Director
Arnav Abacus Academy, Wakad, Pune
Date: 06-November-2026
```
