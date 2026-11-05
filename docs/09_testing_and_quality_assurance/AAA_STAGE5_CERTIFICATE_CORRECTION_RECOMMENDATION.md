# ARNAV ABACUS ACADEMY (AAA) — STAGE 5 QA
## Certificate Correction & Amendment Recommendation

**Document Reference:** `AAA_STAGE5_CERTIFICATE_CORRECTION_RECOMMENDATION`  
**Target Document for Amendment:** `AAA_STAGE5_GATE_COMPLETION_CERTIFICATE.md` (`AAA-S5-CERT-GATE-01`)  
**Audited Branch:** `feat/sprint3-integration` (Commit: `30e2e1a`)  
**Auditor:** Independent Quality Assurance & Compliance Lead  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)  
**Date of Recommendation:** 05-November-2026  

---

## 1. Executive Summary & Purpose

The **Stage 5 Gate Completion Certificate (`AAA-S5-CERT-GATE-01`)** issued under commit `30e2e1a` was reviewed against empirical audit findings. 

While the certificate correctly identifies the milestone as **Conditional Acceptance (Option B)** and preserves the locked status of `main`, the documentary reconciliation identified four areas where certificate text and classifications must be sharpened to reflect engineering truth:

1. **Gate J Status Precision:** Gate J is currently listed as `CONDITIONAL PASS` without explicitly highlighting that the backup recovery drill is **NOT TESTED**.
2. **Hardening Items Two-Tier Split:** The certificate deferred all five hardening items to "Phase 2 prior to multi-centre expansion." This must be amended to separate **Mandatory Pre-Deployment Blockers** (`QA-CAP-01`, `QA-ROS-01`, `QA-INF-02`, `QA-LEG-01`) from **Post-Launch Expansion Items** (`QA-INT-02`).
3. **82/82 Test Result Scope Qualification:** Clarify that 82 passing tests represent automated unit and integration suite coverage within the staging harness, and do not imply live multi-user concurrency stress testing.
4. **Cloud Cost & Free-Tier Disclosure:** Clarify that the factual ₹0.00/month spend is contingent on free-tier usage allowances and will predictably scale (~₹2,100/mo) as admissions grow.

In accordance with Section 7 instructions, the reconciliation team **has not silently modified the certificate**. Below is the formal itemized correction recommendation with exact replacement text.

---

## 2. Proposed Itemized Corrections & Replacement Text

---

### Correction 1: Gate J Status & Audit Description in Section 2
- **Current Certificate Text:**
  ```markdown
  | **Gate J** | **Zero Cloud Spend & Backup** | Zero-Cost Infrastructure Directive | Active monthly cloud expenditure verified at **₹0.00 / month** on Cloudflare Pages and Supabase Mumbai (ap-south-1) free tiers. Automated daily backups enabled. | 🟡 **CONDITIONAL PASS** |
  ```
- **Recommended Exact Replacement Text:**
  ```markdown
  | **Gate J** | **Zero Cloud Spend & Backup Readiness** | Zero-Cost Infrastructure Directive | Active cloud spend verified at ₹0.00 / month on Cloudflare Pages and Supabase Mumbai (ap-south-1) free tiers. Daily automated backups are retained for 7 days; however, live database restore capability remains classified as NOT TESTED pending formal recovery drills. | 🟡 **CONDITIONAL PASS (Backup Restore NOT TESTED)** |
  ```

---

### Correction 2: Test Scope & Parity Qualification in Section 3
- **Current Certificate Text:**
  ```markdown
  ========================================================================================
                            AAA STAGE 5 AUDIT SCORECARD
  ========================================================================================
  Automated Test Suites Passed:   8 / 8  (100.0%)
  Total Automated Tests Passed:   82 / 82 (100.0%)
  TypeScript Compiler Status:     0 errors, 0 warnings (tsc --noEmit: Code 0)
  Production Build Status:        52 chunks, 6.79s (vite build: Code 0)
  AcademyOS Byte Drift:           0 bytes (100% bit-for-bit parity against main)
  Active Operational Cloud Spend: ₹0.00 / month
  Production Branch Status:       main STRICTLY LOCKED at a21a3d1129cc17fc6650bfd04648eb91199e6fa8
  ========================================================================================
  ```
- **Recommended Exact Replacement Text:**
  ```markdown
  ========================================================================================
                            AAA STAGE 5 AUDIT SCORECARD
  ========================================================================================
  Automated Test Suites Passed:   8 / 8  (100.0% within staging test harness)
  Total Automated Tests Passed:   82 / 82 (100.0% unit & integration test coverage)
  TypeScript Compiler Status:     0 errors, 0 warnings (tsc --noEmit: Code 0)
  Production Build Status:        52 production chunks, 6.79s (vite build: Code 0)
  AcademyOS Byte Drift:           0 bytes (100% bit-for-bit file parity against main)
  Active Operational Cloud Spend: ₹0.00 / month (Verified free-tier baseline)
  Production Branch Status:       main STRICTLY LOCKED at a21a3d1129cc17fc6650bfd04648eb91199e6fa8
  ========================================================================================
  *Note on Scope: Automated test results verify algorithmic and logic correctness within the isolated staging test environment. They do not simulate distributed network latency, multi-client DB connection pool exhaustion, or live restore drills. Zero byte drift confirms non-regression of AcademyOS files against main, without asserting certification of unreviewed legacy functions.
  ```

---

### Correction 3: Two-Tier Restructuring of Hardening Items in Section 4
- **Current Certificate Text:**
  ```markdown
  ## 4. Phase 2 Hardening Commitments (Option B Conditions)

  The following 5 technical and operational hardening items are formally scheduled for execution during Phase 2 prior to multi-center expansion:

  1. **`QA-INF-02` (Disaster Recovery Rehearsal):** Execute a staged database backup and restore test drill against Supabase Mumbai (`ap-south-1`) with documented recovery logs.
  2. **`QA-INT-02` (Concurrency Benchmark):** Execute a 50-concurrency load benchmark against Supabase PostgREST RPC prior to initiating paid digital marketing campaigns.
  3. **`QA-ROS-01` (`OBS-WS18-01` — Sibling Indexing):** Upgrade `ApprovedEmailRecord` to support multiple enrolled students under a single parent email key in AcademyOS.
  4. **`QA-CAP-01` (`OBS-WS18-03` — Database Constraint):** Deploy PostgreSQL `CHECK (enrolled_count <= 5)` constraint and row-level locking on `micro_batches`.
  5. **`QA-LEG-01` (Legal Policy Review):** Engage formal Indian legal counsel to review the parent registration deed, consent clauses, and CCPA tuition refund terms.
  ```
- **Recommended Exact Replacement Text:**
  ```markdown
  ## 4. Two-Tier Hardening Classification & Production Gate Conditions

  In accordance with AAA core operating guidelines, student identity integrity and micro-batch capacity enforcement must be reliable for current operations and cannot be deferred to future phases. The five hardening items are formally split into two operational tiers:

  ### Tier 1: Mandatory Pre-Deployment Hardening Blockers (Pre-Requisite for Production Merge)
  The following four items directly protect current single-center operations in Wakad and must be implemented and verified prior to merging `feat/sprint3-integration` into production `main`:
  1. **`QA-CAP-01` (Database Check Constraint):** Deploy PostgreSQL `CHECK (enrolled_count <= 5)` constraint and transactional row-locking in Supabase to guarantee that concurrent enrollments can never breach Neha Patil's 5-student batch limit.
  2. **`QA-ROS-01` (Sibling Multi-Student Support):** Upgrade `ApprovedEmailRecord` in `accessControl.ts` to support multiple enrolled children under a single parent email address, preventing academic profile collisions between siblings.
  3. **`QA-INF-02` (Staging Disaster Recovery Restore Drill):** Execute an empirical database snapshot restore drill on Supabase staging infrastructure, recording Recovery Time Objective (RTO) and verifying 100% data fidelity.
  4. **`QA-LEG-01` (Legal Counsel Review):** Obtain formal review and written sign-off from Indian legal counsel in Pune on the parent registration deed, unbundled consent terms, and CCPA tuition refund policy.

  ### Tier 2: Post-Launch Scaling Hardening (Pre-Requisite for Paid Marketing)
  1. **`QA-INT-02` (50-Concurrency PostgREST RPC Benchmark):** Execute a 50-concurrency load benchmark against Supabase Mumbai prior to allocating digital marketing ad spend (Meta / Google Ads), verifying sequence allocation under sudden traffic spikes.
  ```

---

### Correction 4: Section 6 Binding Production Lock Directive Enhancement
- **Current Certificate Text:**
  ```markdown
  ## 6. Binding Production Lock Directive

  > [!IMPORTANT]
  > **Strict Production Branch Lockdown:**
  > Production branch `main` remains **STRICTLY LOCKED** at commit `a21a3d1129cc17fc6650bfd04648eb91199e6fa8`.  
  > No code may be merged, pushed, or deployed to production until:
  > 1. All management observations and corrections logged in Section 5 are resolved and verified.
  > 2. The 10-working-day Track A Corrective Action Period for on-site physical logs (due 18-Nov-2026 under `MGT-DET-S4-01`) is satisfied.
  > 3. Explicit written authorization is issued by Nitin Patil and Neha Patil.
  ```
- **Recommended Exact Replacement Text:**
  ```markdown
  ## 6. Binding Production Lock Directive

  > [!IMPORTANT]
  > **Strict Production Branch Lockdown:**
  > Production branch `main` remains **STRICTLY LOCKED** at commit `a21a3d1129cc17fc6650bfd04648eb91199e6fa8`.  
  > No code may be merged, pushed, or deployed to production until:
  > 1. All Tier 1 Pre-Deployment Hardening Blockers (`QA-CAP-01`, `QA-ROS-01`, `QA-INF-02`, `QA-LEG-01`) are implemented, tested, and verified.
  > 2. All management observations and corrections logged in Section 5 are resolved and verified.
  > 3. The 10-working-day Track A Corrective Action Period for on-site physical logs (due 18-Nov-2026 under `MGT-DET-S4-01`) is satisfied.
  > 4. Explicit written authorization is issued by Nitin Patil and Neha Patil.
  ```

---

## 3. Implementation Mechanism

Upon formal management approval of this recommendation deliverable:
1. Update `AAA_STAGE5_GATE_COMPLETION_CERTIFICATE.md` with the four approved corrections.
2. Advance the Certificate version to `1.1.0 (Reconciled Baseline)`.
3. Commit the reconciled certificate cleanly to `feat/sprint3-integration`.
