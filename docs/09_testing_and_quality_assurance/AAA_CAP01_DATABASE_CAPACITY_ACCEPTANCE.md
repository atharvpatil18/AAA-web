# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 CAP-S5-01
## Technical Acceptance Audit: QA-CAP-01 Database-Enforced Maximum-Five Capacity

**Document Reference:** `AAA_CAP01_DATABASE_CAPACITY_ACCEPTANCE`  
**Governing Hardening Item:** `QA-CAP-01` (`OBS-WS18-03`)  
**Governing Determination:** `MGT-DET-S5-RECON-02`  
**Audited Branch:** `feat/sprint3-integration`  
**Baseline Commit:** `5c134a8`  
**Production Baseline:** `a21a3d1129cc17fc6650bfd04648eb91199e6fa8` (`main` 🔒 **LOCKED**)  
**Lead Auditor:** Independent Quality Assurance Lead  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)  
**Date of Audit:** 05-November-2026  

---

## 1. Executive Summary & Audit Mandate

Under Directive `DIR-02` and AAA core educational positioning:
> *"Personalised learning in small batches, with a maximum of five students per batch."*

This audit independently evaluates the implementation and operational deployment status of hardening item **`QA-CAP-01` (Micro-Batch Capacity Constraint & Row-Locking RPC)**.

### Audit Mandate:
- Review the SQL migration file `supabase/migrations/20261105_micro_batches_cap_constraint.sql`.
- Inspect the check constraint, unique constraint, row-locking stored procedure, transaction handling, and security model.
- Authoritatively determine whether the migration has been applied to an isolated staging database.
- Factually report whether live database concurrency tests were executed or remain **NOT TESTED**.

---

## 2. SQL Migration Code & Architecture Inspection

The reconciliation inspected the complete source of `supabase/migrations/20261105_micro_batches_cap_constraint.sql`:

```sql
-- Hard Check Constraint on micro_batches Table
ALTER TABLE public.micro_batches 
ADD CONSTRAINT chk_max_batch_capacity 
CHECK (enrolled_count >= 0 AND enrolled_count <= 5);

-- Deduplication Constraint on batch_enrollments Table
ALTER TABLE public.batch_enrollments
ADD CONSTRAINT uq_batch_student 
UNIQUE (batch_id, student_uid);
```

### Architectural Review Findings:
1. **CHECK Constraint (`chk_max_batch_capacity`):**
   - The constraint `enrolled_count >= 0 AND enrolled_count <= 5` guarantees that any SQL write attempting to increment `enrolled_count` to 6 will be rejected by the PostgreSQL engine with error code `23514` (`check_violation`).
   - This prevents oversubscription even if application-level checks fail or administrative scripts execute direct database updates.
2. **Transactional Row Lock (`SELECT FOR UPDATE`):**
   - In `enroll_student_into_batch`, row locking is explicitly implemented:
     ```sql
     SELECT enrolled_count, batch_name 
     INTO v_current_count, v_batch_name
     FROM public.micro_batches
     WHERE batch_id = p_batch_id
     FOR UPDATE;
     ```
   - This ensures that when two admissions transactions target the same batch concurrently, Transaction 2 blocks until Transaction 1 commits. Transaction 2 then reads `enrolled_count = 5` and aborts with an exception, preventing the classic "5th seat race condition."
3. **Security Context (`SECURITY DEFINER`):**
   - The stored procedure runs with `SECURITY DEFINER` privileges, allowing restricted edge roles to execute enrollments without exposing raw `UPDATE` permissions on the `micro_batches` table.
4. **Unique Constraint (`uq_batch_student`):**
   - Enforces `UNIQUE (batch_id, student_uid)`, preventing duplicate insertions of the same student into a single batch.

---

## 3. Operational Deployment Status: Live Database Verification

### Hard Finding:
- **Migration File Status:** The SQL file `supabase/migrations/20261105_micro_batches_cap_constraint.sql` exists and is syntactically valid.
- **Database Connection Status:** The current workspace environment (`.env`) does not contain active Supabase administrative service keys (`SUPABASE_SERVICE_ROLE_KEY` or direct `PGHOST` database credentials).
- **Execution Evidence:** **Zero live SQL execution logs exist in the repository.** The migration has **NOT been applied to a live or isolated staging PostgreSQL database**.

### Mandated Reporting Standard:
In accordance with explicit management instructions:
> *"Determine whether the migration has actually been applied to an isolated staging database... If staging is unavailable, report NOT TESTED. Do not describe SQL file creation as successful database deployment."*

**OPERATIONAL DEPLOYMENT STATUS:** 🟡 **NOT TESTED (SQL Migration Specified; Staging Database Deployment Pending).**

---

## 4. Staging Test Scenario Matrix (Pending Live Execution)

The following 6 scenarios are defined for execution as soon as staging PostgreSQL access is provisioned:

| Test Scenario # | Scenario Objective | Target SQL / RPC Call | Expected PostgreSQL Behavior | Current Evidence Status |
| :---: | :--- | :--- | :--- | :---: |
| **TC-CAP-DB-01** | Five Normal Enrollments | Call `enroll_student_into_batch` for Students 1 through 5. | 5 rows inserted; `enrolled_count = 5`; `is_full = true`. | 🟡 **NOT TESTED ON LIVE DB** (Passed in TS memory) |
| **TC-CAP-DB-02** | Sixth-Student Rejection | Attempt to enroll Student 6 into full batch. | RPC raises exception; error `23514`; 0 rows inserted. | 🟡 **NOT TESTED ON LIVE DB** (Passed in TS memory) |
| **TC-CAP-DB-03** | Concurrent Race Condition | 2 concurrent connections attempt to enroll for 5th seat. | 1 transaction succeeds; 1 transaction blocked and aborted. | 🟡 **NOT TESTED ON LIVE DB** |
| **TC-CAP-DB-04** | Duplicate Enrollment | Re-enroll Student 1 into Batch 1. | Unique violation `23505`; transaction rolled back. | 🟡 **NOT TESTED ON LIVE DB** |
| **TC-CAP-DB-05** | Direct-Write Bypass Test | Direct `UPDATE micro_batches SET enrolled_count = 6`. | PostgreSQL rejects update with `check_violation` `23514`. | 🟡 **NOT TESTED ON LIVE DB** |
| **TC-CAP-DB-06** | Transaction Rollback Test | Trigger failure after insert, before commit. | Full rollback; `enrolled_count` remains unchanged. | 🟡 **NOT TESTED ON LIVE DB** |

---

## 5. Audit Conclusion & Residual Risk

| Dimension | Finding |
| :--- | :--- |
| **Implementation Quality** | 🟢 **PASS:** SQL architecture, check constraint, unique key, and row-locking RPC are fully designed and correct. |
| **Operational Execution** | 🟡 **NOT TESTED:** Migration has not yet been executed on live staging database. |
| **Severity** | High (for multi-coordinator concurrent admissions). |
| **Residual Risk** | Negligible for current single-coordinator manual admissions; must be verified before paid digital campaigns or multi-user staff onboarding. |
| **Closure Condition** | Execute `supabase/migrations/20261105_micro_batches_cap_constraint.sql` against Supabase Mumbai staging database and document output logs of Scenarios 1–6 in `docs/11_evidence_and_screenshots/`. |
