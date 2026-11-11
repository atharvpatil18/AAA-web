# ARNAV ABACUS ACADEMY (AAA) — TESTING & QUALITY ASSURANCE
## Staging Execution Plan: QA-CAP-01 PostgreSQL Capacity & Concurrency Suite

**Document Reference:** `AAA_CAP01_POSTGRESQL_EXECUTION_PLAN`  
**Governing Directive:** AAA Management Directive (05-Nov-2026, Task C)  
**Governing Hardening Item:** `QA-CAP-01` (`OBS-WS18-03`)  
**Target Migration:** `supabase/migrations/20261105_micro_batches_cap_constraint.sql`  
**Target Environment:** Isolated Supabase Mumbai Staging (`ap-south-1`)  
**Lead QA Engineer:** Independent Quality Assurance Lead  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)  
**Status:** 🟡 **EXECUTION PLAN — PENDING LIVE DATABASE RUN**  

---

## 1. Executive Protocol & Execution Boundary

In accordance with strict management instructions:
> *"Record the exact SQL and test procedure, expected results and evidence to capture. Do not report these tests as passed until executed against PostgreSQL."*

This plan outlines the rigorous 7-part test protocol to be executed against the staging PostgreSQL database as soon as connection credentials are provided.

---

## 2. Seven-Part Staging Test Execution Matrix

```
========================================================================================
                 QA-CAP-01 LIVE POSTGRESQL TEST EXECUTION PROTOCOL
========================================================================================
Test 1: Five Sequential Successful Enrollments        [ Target: 5 rows committed, count = 5 ]
Test 2: Sixth Student Hard Overflow Block            [ Target: RPC exception, Error 23514 ]
Test 3: Two Concurrent Requests for 5th Seat         [ Target: 1 commits, 1 aborted ]
Test 4: Duplicate Student Enrollment Block           [ Target: Unique constraint, Error 23505 ]
Test 5: Direct SQL Write Bypass Prevention           [ Target: PostgreSQL chk_max_batch_capacity ]
Test 6: Transaction Abort & Clean Rollback           [ Target: Count unchanged on failure ]
Test 7: Relational Record-Count Consistency          [ Target: COUNT(*) == enrolled_count ]
========================================================================================
```

---

## 3. Granular Test Procedures & Exact SQL Scripts

### Test 1: Five Sequential Successful Enrollments
- **Objective:** Verify that students 1 through 5 can enroll sequentially into an empty micro-batch, and that upon the 5th enrollment, `is_full` becomes `true`.
- **Pre-Condition:** Create batch `BATCH-TEST-01`:
  ```sql
  INSERT INTO public.micro_batches (batch_id, batch_name, program, schedule)
  VALUES ('BATCH-TEST-01', 'Soroban Junior Batch Alpha', 'abacus', 'Saturday 10:00 AM');
  ```
- **Execution Script:**
  ```sql
  SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'AAA-STD-2026-0001', 'Aarav Sharma', 'parent1@test.com');
  SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'AAA-STD-2026-0002', 'Vivaan Patel', 'parent2@test.com');
  SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'AAA-STD-2026-0003', 'Aditya Joshi', 'parent3@test.com');
  SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'AAA-STD-2026-0004', 'Diya Kulkarni', 'parent4@test.com');
  SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'AAA-STD-2026-0005', 'Ananya Deshmukh', 'parent5@test.com');
  ```
- **Expected Result:**
  - All 5 RPC calls return `{"success": true}` with incrementing `new_enrolled_count` (`1`, `2`, `3`, `4`, `5`).
  - Query `SELECT enrolled_count, is_full FROM public.micro_batches WHERE batch_id = 'BATCH-TEST-01';` returns `enrolled_count = 5`, `is_full = true`.
- **Evidence to Capture:** JSON returns and table state output in `docs/11_evidence_and_screenshots/CAP01_TEST1.txt`.

---

### Test 2: Sixth Student Hard Overflow Block
- **Objective:** Verify that attempting to enroll a 6th student into a full batch is rejected with error code `23514` (`check_violation`).
- **Execution Script:**
  ```sql
  SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'AAA-STD-2026-0006', 'Rohan Mehta', 'parent6@test.com');
  ```
- **Expected Result:**
  - Transaction immediately aborts.
  - PostgreSQL raises exception: `BATCH_CAPACITY_EXCEEDED: Batch "Soroban Junior Batch Alpha" has reached its maximum contractual limit of 5 students (current: 5).`
  - Error Code: `23514`.
  - Zero rows inserted into `public.batch_enrollments` for `AAA-STD-2026-0006`.
- **Evidence to Capture:** Captured terminal error log confirming zero database mutations.

---

### Test 3: Two Concurrent Requests Competing for the 5th Seat
- **Objective:** Prove that `SELECT FOR UPDATE` prevents two simultaneous admissions coordinators from enrolling 2 students into the final remaining seat.
- **Pre-Condition:** Create batch `BATCH-TEST-02` with 4 existing students (`enrolled_count = 4`). Exactly 1 seat remains.
- **Execution Script (Using two concurrent psql shell sessions):**
  - **Session 1 (Terminal A):**
    ```sql
    BEGIN;
    SELECT public.enroll_student_into_batch('BATCH-TEST-02', 'AAA-STD-2026-0005', 'Candidate A', 'parentA@test.com');
    -- DO NOT COMMIT YET; Simulates coordinator review delay
    SELECT pg_sleep(3);
    COMMIT;
    ```
  - **Session 2 (Terminal B — executed 100ms after Session 1 starts):**
    ```sql
    BEGIN;
    SELECT public.enroll_student_into_batch('BATCH-TEST-02', 'AAA-STD-2026-0006', 'Candidate B', 'parentB@test.com');
    COMMIT;
    ```
- **Expected Result:**
  - Session 2 blocks waiting for Session 1's lock to release.
  - Session 1 commits successfully (`enrolled_count = 5`).
  - Session 2 unblocks, reads `enrolled_count = 5`, and fails with `BATCH_CAPACITY_EXCEEDED` (`23514`).
  - Exactly 5 students enrolled. Candidate B rejected. Zero overflow.
- **Evidence to Capture:** Timestamped concurrent execution log demonstrating blocking and clean rejection.

---

### Test 4: Duplicate Student Enrollment Rejection
- **Objective:** Verify that unique constraint `uq_batch_student (batch_id, student_uid)` prevents accidental double enrollment.
- **Execution Script:**
  ```sql
  -- Attempt to enroll Student 1 again into the same batch
  SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'AAA-STD-2026-0001', 'Aarav Sharma Duplicate', 'parent1@test.com');
  ```
- **Expected Result:**
  - RPC raises exception: `STUDENT_ALREADY_ENROLLED: Student AAA-STD-2026-0001 is already enrolled in batch BATCH-TEST-01.`
  - Error Code: `23505` (`unique_violation`).
- **Evidence to Capture:** Unique constraint violation log.

---

### Test 5: Direct SQL Write Bypass Prevention
- **Objective:** Prove that a malicious user or rogue administrative script cannot bypass the stored procedure to force `enrolled_count = 6`.
- **Execution Script:**
  ```sql
  -- Attempt raw SQL update bypassing RPC
  UPDATE public.micro_batches 
  SET enrolled_count = 6 
  WHERE batch_id = 'BATCH-TEST-01';
  ```
- **Expected Result:**
  - PostgreSQL rejects update directly:  
    `ERROR: new row for relation "micro_batches" violates check constraint "chk_max_batch_capacity"`
  - Error Code: `23514`.
- **Evidence to Capture:** Direct SQL constraint violation error message.

---

### Test 6: Transaction Abort & Rollback Integrity
- **Objective:** Prove that if any unexpected error occurs during enrollment, the counter is not incremented.
- **Execution Script:**
  ```sql
  BEGIN;
  -- Attempt enrollment with an invalid batch ID that does not exist
  SELECT public.enroll_student_into_batch('INVALID-BATCH-999', 'AAA-STD-2026-9999', 'Ghost Student', 'ghost@test.com');
  ROLLBACK;
  ```
- **Expected Result:**
  - RPC raises exception: `BATCH_NOT_FOUND: Batch INVALID-BATCH-999 does not exist.`
  - Transaction cleanly aborts.
- **Evidence to Capture:** Clean rollback verification log.

---

### Test 7: Relational Record-Count Consistency
- **Objective:** Confirm that the integer counter `micro_batches.enrolled_count` is identical to the actual row count in `batch_enrollments`.
- **Execution Script:**
  ```sql
  SELECT 
      b.batch_id,
      b.batch_name,
      b.enrolled_count AS counter_value,
      count(e.enrollment_id) AS actual_row_count,
      (b.enrolled_count = count(e.enrollment_id)) AS counts_match
  FROM public.micro_batches b
  LEFT JOIN public.batch_enrollments e ON b.batch_id = e.batch_id
  GROUP BY b.batch_id, b.batch_name, b.enrolled_count;
  ```
- **Expected Result:**
  - For every batch in the database, `counts_match` evaluates strictly to `true`.
- **Evidence to Capture:** Invariant audit query output table.

---

## 4. Current Staging Execution Status

In strict adherence to management instructions:
```
========================================================================================
                             STATUS AS OF 05-NOV-2026
========================================================================================
Tests 1 through 7: 🟡 NOT TESTED (PENDING LIVE STAGING POSTGRESQL PROVISIONING)
========================================================================================
```
No test will be marked as passed until executed against a live PostgreSQL server and recorded in `docs/11_evidence_and_screenshots/`.
