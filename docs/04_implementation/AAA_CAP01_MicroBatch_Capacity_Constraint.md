# ARNAV ABACUS ACADEMY (AAA) — DATABASE ARCHITECTURE
## Micro-Batch Capacity Constraint & Row-Locking RPC Specification

**Document Reference:** `AAA_CAP01_MicroBatch_Capacity_Constraint`  
**Governing Baseline:** Hardening Item `QA-CAP-01` (`OBS-WS18-03`)  
**Governing Determination:** `MGT-DET-S5-RECON-02`  
**Target Migration:** `supabase/migrations/20261105_micro_batches_cap_constraint.sql`  
**Lead Architect:** Nitin Patil (Operations, Tech & Compliance)  
**Academic Lead:** Neha Patil (Founder & Academic Director)  
**Date:** 05-November-2026  

---

## 1. Executive Purpose & Pedagogical Mandate

Under Directive `DIR-02` and AAA's core operating principles:
> *"Personalised learning in small batches, with a maximum of five students per batch."*

Prior to this hardening deliverable, the maximum-5-student capacity cap was enforced purely in TypeScript application memory within `src/lib/academyRosterBridge.ts`. While effective for single-user sequential testing, it left open a potential race condition under concurrent enrollments.

This deliverable deploys the authoritative **PostgreSQL-layer check constraint** and an atomic **stored procedure (`enroll_student_into_batch`)** with row-level locking (`SELECT FOR UPDATE`), guaranteeing that concurrent admissions can never oversubscribe a batch beyond 5 students.

---

## 2. Concurrency Race Mitigation: The 5th-Seat Lock

```mermaid
sequenceDiagram
    autonumber
    actor C1 as Coordinator 1 (Enrolling Student 5)
    actor C2 as Coordinator 2 (Enrolling Student 6)
    participant RPC as Stored Procedure: enroll_student_into_batch()
    participant DB as PostgreSQL micro_batches (Mumbai ap-south-1)

    C1->>RPC: enroll(batch='ABA-01', student='Student 5')
    RPC->>DB: BEGIN TX; SELECT enrolled_count FROM micro_batches WHERE batch_id='ABA-01' FOR UPDATE;
    Note over DB: Row locked by TX 1 (count = 4).
    
    C2->>RPC: enroll(batch='ABA-01', student='Student 6')
    RPC->>DB: BEGIN TX; SELECT enrolled_count ... FOR UPDATE;
    Note over DB: TX 2 BLOCKS waiting for TX 1 to release row lock.

    RPC->>DB: count (4) < 5 -> INSERT batch_enrollments; UPDATE micro_batches SET count = 5; COMMIT TX 1;
    Note over DB: TX 1 committed. Lock released. Batch count is now 5.

    Note over DB: TX 2 unblocks; reads updated count = 5.
    RPC->>RPC: count (5) >= 5 -> RAISE EXCEPTION 'BATCH_CAPACITY_EXCEEDED'!
    RPC-->>C2: Returns HTTP 409 / Error 23514: Maximum contractual limit of 5 students reached.
    Note over DB: Zero 6th student row inserted. Capacity preserved.
```

---

## 3. Database Schema & Hard Constraint Details

### 3.1 Hard Check Constraint
```sql
ALTER TABLE public.micro_batches 
ADD CONSTRAINT chk_max_batch_capacity 
CHECK (enrolled_count >= 0 AND enrolled_count <= 5);
```
- **Error Code:** `23514` (`check_violation`).
- **Guaranteed Behavior:** Even if an administrative script, direct SQL query, or buggy client attempts to increment `enrolled_count` to 6, PostgreSQL rejects the transaction at the storage engine level.

### 3.2 Row-Locking RPC: `enroll_student_into_batch`
- **Security:** `SECURITY DEFINER` (executes with database authority while isolating table permissions).
- **Atomicity:** Locks target batch row with `FOR UPDATE` prior to checking count, preventing any interleaving writes.
- **Deduplication:** Unique constraint `uq_batch_student (batch_id, student_uid)` prevents accidental double enrollment.

---

## 4. Verification & Testing Procedure

### Local Staging SQL Test Commands:
```sql
-- 1. Create a test batch
INSERT INTO public.micro_batches (batch_id, batch_name, program, schedule)
VALUES ('TEST-BATCH-01', 'Test Abacus Batch', 'abacus', 'Saturday 10:00 AM');

-- 2. Enroll students 1 to 5 sequentially
SELECT public.enroll_student_into_batch('TEST-BATCH-01', 'AAA-STD-2026-0001', 'Student 1', 'p1@test.com');
SELECT public.enroll_student_into_batch('TEST-BATCH-01', 'AAA-STD-2026-0002', 'Student 2', 'p2@test.com');
SELECT public.enroll_student_into_batch('TEST-BATCH-01', 'AAA-STD-2026-0003', 'Student 3', 'p3@test.com');
SELECT public.enroll_student_into_batch('TEST-BATCH-01', 'AAA-STD-2026-0004', 'Student 4', 'p4@test.com');
SELECT public.enroll_student_into_batch('TEST-BATCH-01', 'AAA-STD-2026-0005', 'Student 5', 'p5@test.com');

-- 3. Attempt to enroll 6th student (Must FAIL with check_violation / error 23514)
SELECT public.enroll_student_into_batch('TEST-BATCH-01', 'AAA-STD-2026-0006', 'Student 6', 'p6@test.com');
-- Expected Outcome: ERROR: BATCH_CAPACITY_EXCEEDED: Batch "Test Abacus Batch" has reached its maximum contractual limit of 5 students (current: 5).
```

---

## 5. Closure Status

- **Hardening Item:** `QA-CAP-01` (`OBS-WS18-03`)
- **Status:** 🟢 **RESOLVED & DOCUMENTED**
- **Artifact:** `supabase/migrations/20261105_micro_batches_cap_constraint.sql`
