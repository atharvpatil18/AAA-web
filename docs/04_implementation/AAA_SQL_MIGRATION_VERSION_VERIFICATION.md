# ARNAV ABACUS ACADEMY (AAA) — DATABASE ARCHITECTURE & QUALITY AUDIT
## Deliverable 2: SQL Migration Version Verification & Symbol Reconciliation Report

**Document Reference:** `AAA_SQL_MIGRATION_VERSION_VERIFICATION`  
**Governing Determination:** `MGT-DET-S5-STAGING-03-CORR-01`  
**Target Migration File:** `supabase/migrations/20261105_micro_batches_cap_constraint.sql`  
**Committed SHA-256 Hash:** `c04e2285a2ce2b591dbbe1a1b156bfe46764426500965d1d6e1fae9a59cfd259`  
**Committed Baseline Commit:** `5c134a8` / `629f2ad` / `a9186d9`  
**Branch:** `feat/sprint3-integration`  
**Production Main:** `a21a3d1129cc17fc6650bfd04648eb91199e6fa8` (🔒 STRICTLY LOCKED)  
**Auditor:** Database Architecture & Quality Assurance Lead  
**Accountable Leadership:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)  
**Verification Date:** 06-November-2026  

---

## 1. Executive Summary & Objective

In accordance with Task 1 of the Management Directive:
> *"Inspect the actual committed SQL migration. Reconcile the earlier and current names:
> - `chk_max_batch_capacity` versus `chk_micro_batch_max_five`
> - `enroll_student_into_batch` versus `enroll_student_in_micro_batch`
> Identify the authoritative definitions and ensure the seven-test plan uses the exact committed SQL. Do not edit the migration."*

This audit conducts a forensic, line-by-line inspection of the committed SQL migration file to eliminate nomenclature drift between planning documents and the database engine.

---

## 2. Line-by-Line Inspection of Committed Migration

The authoritative version-controlled migration file is:  
[`supabase/migrations/20261105_micro_batches_cap_constraint.sql`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/supabase/migrations/20261105_micro_batches_cap_constraint.sql)  
(132 lines, 5,291 bytes, UTF-8 encoded).

### Key Architectural Blocks Audited:
1. **Lines 15–28 (`public.micro_batches` Table):**
   - Primary Key: `batch_id VARCHAR(64)`
   - Counter Column: `enrolled_count INT NOT NULL DEFAULT 0`
   - Generated Status: `is_full BOOLEAN GENERATED ALWAYS AS (enrolled_count >= 5) STORED`
   - Table Check Constraint:
     ```sql
     -- Line 27:
     CONSTRAINT chk_max_batch_capacity CHECK (enrolled_count >= 0 AND enrolled_count <= 5)
     ```
2. **Lines 31–42 (`public.batch_enrollments` Table):**
   - Primary Key: `enrollment_id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
   - Foreign Key: `batch_id VARCHAR(64) REFERENCES public.micro_batches(batch_id) ON DELETE RESTRICT`
   - Natural Unique Constraint:
     ```sql
     -- Line 41:
     CONSTRAINT uq_batch_student UNIQUE (batch_id, student_uid)
     ```
3. **Lines 51–131 (`public.enroll_student_into_batch` Transactional Stored Procedure):**
   - Signature:
     ```sql
     CREATE OR REPLACE FUNCTION public.enroll_student_into_batch(
         p_batch_id VARCHAR(64),
         p_student_uid VARCHAR(32),
         p_student_name VARCHAR(128),
         p_parent_email VARCHAR(255),
         p_lead_ref VARCHAR(64) DEFAULT NULL
     )
     RETURNS JSONB
     LANGUAGE plpgsql
     SECURITY DEFINER
     ```
   - Row-Locking Mechanism:
     ```sql
     -- Lines 69-73:
     SELECT enrolled_count, batch_name 
     INTO v_current_count, v_batch_name
     FROM public.micro_batches
     WHERE batch_id = p_batch_id
     FOR UPDATE;
     ```
   - Capacity Evaluation & Error Mapping:
     ```sql
     -- Lines 82-85:
     IF v_current_count >= 5 THEN
         RAISE EXCEPTION 'BATCH_CAPACITY_EXCEEDED: Batch "%" has reached its maximum contractual limit of 5 students (current: %).', v_batch_name, v_current_count
             USING ERRCODE = '23514'; -- check_violation
     END IF;
     ```

---

## 3. Discrepancy Reconciliation Matrix

During the Sprint 4 / Stage 5 audit cycle, slight nomenclature divergence occurred between high-level architectural specifications and the committed DDL script. The authoritative resolution is tabulated below:

| Architectural Component | Earlier Planning / Narrative Symbol | Committed DDL Symbol (Authoritative) | Reconciliation Finding & Action |
| :--- | :--- | :--- | :--- |
| **Micro-Batch CHECK Constraint** | `chk_micro_batch_max_five` | **`chk_max_batch_capacity`** | 🟢 **AUTHORITATIVE:** `chk_max_batch_capacity` is the exact symbol defined on Line 27. Any catalog query checking `pg_constraint WHERE conname = 'chk_micro_batch_max_five'` will return empty. All verification suites MUST query `chk_max_batch_capacity`. |
| **Transactional Enrollment RPC** | `enroll_student_in_micro_batch` | **`enroll_student_into_batch`** | 🟢 **AUTHORITATIVE:** `enroll_student_into_batch` is the exact symbol declared on Line 51. All RPC invocations from PostgREST, edge functions, and SQL test scripts MUST invoke `enroll_student_into_batch(...)`. |
| **Batch Counter Column** | `current_enrolled_count` | **`enrolled_count`** | 🟢 **AUTHORITATIVE:** The column in `public.micro_batches` is `enrolled_count`. All DML updates and invariants MUST reference `enrolled_count`. |
| **Unique Student Constraint** | `uq_student_batch_map` | **`uq_batch_student`** | 🟢 **AUTHORITATIVE:** Defined on Line 41 as `CONSTRAINT uq_batch_student UNIQUE (batch_id, student_uid)`. Error code is standard PostgreSQL unique violation `23505`. |

---

## 4. Rigorous Seven-Test Plan Symbol Alignment

To guarantee 100% execution compatibility with PostgreSQL without runtime identifier errors, the Seven-Test Plan (`QA-CAP-01`) is strictly aligned to the committed SQL symbols:

```sql
-- ==============================================================================
-- AAA QA-CAP-01 SEVEN-TEST CANONICAL SQL CALLS (AUTHORITATIVE SYMBOLS)
-- ==============================================================================

-- TC-CAP-DB-01: Five normal enrollments (Calling authoritative enroll_student_into_batch)
SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'STD-001', 'Student One', 'parent1@test.com');
SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'STD-002', 'Student Two', 'parent2@test.com');
SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'STD-003', 'Student Three', 'parent3@test.com');
SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'STD-004', 'Student Four', 'parent4@test.com');
SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'STD-005', 'Student Five', 'parent5@test.com');

-- TC-CAP-DB-02: Sixth student rejection (Evaluates IF v_current_count >= 5 -> Error 23514)
SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'STD-006', 'Student Six', 'parent6@test.com');
-- Expected: ERROR 23514 (check_violation): BATCH_CAPACITY_EXCEEDED

-- TC-CAP-DB-03: Concurrent race lock test (Session 1 & 2 FOR UPDATE lock on BATCH-TEST-02)
-- Session 1 acquires lock, increments to 5; Session 2 aborts with Error 23514.

-- TC-CAP-DB-04: Duplicate enrollment rejection (uq_batch_student -> Error 23505)
SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'STD-001', 'Student One Duplicate', 'parent1@test.com');
-- Expected: ERROR 23505 (unique_violation): STUDENT_ALREADY_ENROLLED

-- TC-CAP-DB-05: Direct SQL bypass test (Asserts authoritative chk_max_batch_capacity)
UPDATE public.micro_batches SET enrolled_count = 6 WHERE batch_id = 'BATCH-TEST-01';
-- Expected: ERROR 23514 (check_violation): new row violates check constraint "chk_max_batch_capacity"

-- TC-CAP-DB-06: Constraint existence verification in system catalog
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conname = 'chk_max_batch_capacity';

-- TC-CAP-DB-07: Invariant check (Counter equals actual child records)
SELECT mb.batch_id, mb.enrolled_count, count(be.enrollment_id) as actual_records
FROM public.micro_batches mb
LEFT JOIN public.batch_enrollments be ON mb.batch_id = be.batch_id
GROUP BY mb.batch_id, mb.enrolled_count
HAVING mb.enrolled_count <> count(be.enrollment_id);
-- Expected: 0 rows returned (Zero count discrepancy)
```

---

## 5. Audit Compliance Certification

- **Migration Preservation:** 🟢 **VERIFIED.** Migration `20261105_micro_batches_cap_constraint.sql` was not altered or edited.
- **Symbol Reconciliation:** 🟢 **VERIFIED.** `chk_max_batch_capacity` and `enroll_student_into_batch` established as authoritative.
- **Execution Preparedness:** 🟢 **VERIFIED.** Test scripts updated to prevent runtime identifier failures.

---
*Certified by Database Architecture & QA for Arnav Abacus Academy Governance.*
