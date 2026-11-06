-- ==============================================================================
-- ARNAV ABACUS ACADEMY (AAA) — STAGING CAPACITY TEST SUITE (QA-CAP-01)
-- Target Migration: supabase/migrations/20261105_micro_batches_cap_constraint.sql
-- Authoritative Symbols: chk_max_batch_capacity, enroll_student_into_batch
-- Target Environment: Isolated Supabase Mumbai Staging (aaa-web-staging)
-- Governing Code: MGT-DET-S5-STAGING-03-CORR-01
-- ==============================================================================

\set ON_ERROR_STOP off
\echo '=============================================================================='
\echo 'AAA POSTGRESQL CAPACITY & CONSTRAINTS TEST SUITE (QA-CAP-01)'
\echo '=============================================================================='

-- Setup: Clean up any prior test artifacts
DELETE FROM public.batch_enrollments WHERE batch_id LIKE 'BATCH-TEST-%';
DELETE FROM public.micro_batches WHERE batch_id LIKE 'BATCH-TEST-%';

-- ------------------------------------------------------------------------------
-- PRE-01: Seed Test Micro-Batch
-- ------------------------------------------------------------------------------
\echo '\n--- PRE-01: Seeding Test Micro-Batch BATCH-TEST-01 ---'
INSERT INTO public.micro_batches (batch_id, batch_name, program, schedule, venue)
VALUES ('BATCH-TEST-01', 'Abacus Foundation Batch A (Staging Test)', 'abacus', 'Mon/Wed 4:00 PM', 'offline_wakad')
RETURNING batch_id, batch_name, program, enrolled_count, is_full;

-- ------------------------------------------------------------------------------
-- TC-CAP-DB-01: Five Normal Enrollments
-- ------------------------------------------------------------------------------
\echo '\n--- TC-CAP-DB-01: Enrolling Students 1 through 5 (Must All Succeed) ---'
SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'STD-TEST-001', 'Aarav Sharma', 'aarav.parent@example.com', 'LEAD-2026-001');
SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'STD-TEST-002', 'Ananya Deshmukh', 'ananya.parent@example.com', 'LEAD-2026-002');
SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'STD-TEST-003', 'Kabir Kulkarni', 'kabir.parent@example.com', 'LEAD-2026-003');
SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'STD-TEST-004', 'Riya Joshi', 'riya.parent@example.com', 'LEAD-2026-004');
SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'STD-TEST-005', 'Vihaan Patil', 'vihaan.parent@example.com', 'LEAD-2026-005');

-- Verify state after 5 enrollments
\echo '\nState of BATCH-TEST-01 after 5 enrollments (Expected: enrolled_count = 5, is_full = true):'
SELECT batch_id, enrolled_count, is_full, updated_at FROM public.micro_batches WHERE batch_id = 'BATCH-TEST-01';

-- ------------------------------------------------------------------------------
-- TC-CAP-DB-02: Sixth-Student Hard Rejection (Contractual Max 5 Cap)
-- ------------------------------------------------------------------------------
\echo '\n--- TC-CAP-DB-02: Attempting 6th Student Enrollment (Must FAIL with Error 23514) ---'
SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'STD-TEST-006', 'Ishaan Mehta', 'ishaan.parent@example.com', 'LEAD-2026-006');

-- ------------------------------------------------------------------------------
-- TC-CAP-DB-03: Concurrency Race Condition Preparation & Assertion
-- ------------------------------------------------------------------------------
\echo '\n--- TC-CAP-DB-03: Concurrency Race Setup on BATCH-TEST-02 ---'
INSERT INTO public.micro_batches (batch_id, batch_name, program, schedule, venue)
VALUES ('BATCH-TEST-02', 'Vedic Math Micro Batch B (Staging Race)', 'vedic', 'Tue/Thu 5:00 PM', 'offline_wakad');

-- Fill 4 seats
SELECT public.enroll_student_into_batch('BATCH-TEST-02', 'STD-RACE-001', 'Candidate 1', 'c1@example.com');
SELECT public.enroll_student_into_batch('BATCH-TEST-02', 'STD-RACE-002', 'Candidate 2', 'c2@example.com');
SELECT public.enroll_student_into_batch('BATCH-TEST-02', 'STD-RACE-003', 'Candidate 3', 'c3@example.com');
SELECT public.enroll_student_into_batch('BATCH-TEST-02', 'STD-RACE-004', 'Candidate 4', 'c4@example.com');

\echo 'BATCH-TEST-02 populated with 4 students. Seat 5 is contested:'
SELECT batch_id, enrolled_count, is_full FROM public.micro_batches WHERE batch_id = 'BATCH-TEST-02';

-- Simulate Session 1 claiming 5th seat
\echo 'Session 1 claims Seat 5:'
SELECT public.enroll_student_into_batch('BATCH-TEST-02', 'STD-RACE-005', 'Candidate 5 (Winner)', 'c5@example.com');

-- Simulate Session 2 competing for 5th seat (Must fail with 23514)
\echo 'Session 2 attempts competing Seat 5 (Must FAIL with Error 23514):'
SELECT public.enroll_student_into_batch('BATCH-TEST-02', 'STD-RACE-006', 'Candidate 6 (Competitor)', 'c6@example.com');

-- ------------------------------------------------------------------------------
-- TC-CAP-DB-04: Duplicate Student Enrollment Rejection
-- ------------------------------------------------------------------------------
\echo '\n--- TC-CAP-DB-04: Attempting Duplicate Student Enrollment (Must FAIL with Error 23505) ---'
SELECT public.enroll_student_into_batch('BATCH-TEST-01', 'STD-TEST-001', 'Aarav Sharma Duplicate', 'aarav.parent@example.com');

-- ------------------------------------------------------------------------------
-- TC-CAP-DB-05: Direct SQL Bypass Test (Storage Engine Check Constraint)
-- ------------------------------------------------------------------------------
\echo '\n--- TC-CAP-DB-05: Attempting Direct UPDATE enrolled_count = 6 (Must FAIL with Error 23514) ---'
UPDATE public.micro_batches 
SET enrolled_count = 6 
WHERE batch_id = 'BATCH-TEST-01';

-- ------------------------------------------------------------------------------
-- TC-CAP-DB-06: Schema & Catalog Check Constraint Verification
-- ------------------------------------------------------------------------------
\echo '\n--- TC-CAP-DB-06: Verifying chk_max_batch_capacity in PostgreSQL Catalog ---'
SELECT conname, contype, pg_get_constraintdef(oid) AS definition
FROM pg_constraint 
WHERE conname = 'chk_max_batch_capacity';

-- ------------------------------------------------------------------------------
-- TC-CAP-DB-07: Relational Invariant Consistency
-- ------------------------------------------------------------------------------
\echo '\n--- TC-CAP-DB-07: Invariant Consistency Audit (Zero Row Discrepancy) ---'
SELECT 
    mb.batch_id, 
    mb.enrolled_count AS table_counter, 
    count(be.enrollment_id) AS physical_rows,
    (mb.enrolled_count = count(be.enrollment_id)) AS invariant_holds
FROM public.micro_batches mb
LEFT JOIN public.batch_enrollments be ON mb.batch_id = be.batch_id
WHERE mb.batch_id LIKE 'BATCH-TEST-%'
GROUP BY mb.batch_id, mb.enrolled_count;

\echo '\n=============================================================================='
\echo 'QA-CAP-01 CAPACITY TEST SUITE EXECUTION COMPLETED'
\echo '=============================================================================='
