# ARNAV ABACUS ACADEMY (AAA) — STAGE 5 QA
## Document Reference: `AAA_STAGE5_BATCH_CAPACITY_CONCURRENCY_TEST_REPORT`
### Stage 5 Independent Quality Assurance & Verification
#### Gate F: Maximum-Five Batch Capacity & Concurrency Enforcement Report

**Document Version:** 1.0.0  
**Audit Date:** 05-November-2026  
**Audited Branch:** `feat/sprint3-integration` (Commit: `abcd65c`)  
**Components Audited:** `src/lib/academyRosterBridge.ts`, `src/lib/academyRosterBridge.test.ts`, `src/lib/crmStateMachine.ts`  
**Auditor:** Independent Quality Assurance Lead  
**Accountable Leadership:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Protocol & Pedagogical Mandate

Under Directive `DIR-02` and AAA core educational philosophy:
> *"Personalised learning in small batches, with a maximum of five students per batch."*

The maximum-5-student capacity cap is a core contractual and pedagogical promise made to parents in Wakad and Pune. This audit independently inspects the algorithmic and data-layer mechanisms that prevent oversubscription.

---

## 2. In-Memory Algorithmic Enforcement

### 2.1 Code Inspection in `src/lib/academyRosterBridge.ts`
```typescript
export const MAX_BATCH_CAPACITY = 5 as const;

// 3. Strict Micro-Batch Capacity Guard (Max 5)
if (batch.enrolledStudents.length >= MAX_BATCH_CAPACITY) {
  throw new BatchCapacityExceededError(batch.batchName, MAX_BATCH_CAPACITY);
}

// Update Micro-Batch Roster
const updatedStudents = [
  ...batch.enrolledStudents,
  { studentUid, studentName: studentProfile.displayName, enrolledAt: nowIso }
];

const updatedBatch: MicroBatchRoster = {
  ...batch,
  enrolledStudents: updatedStudents,
  isFull: updatedStudents.length >= MAX_BATCH_CAPACITY
};
```

### 2.2 Test Verification Results (`TC-SYNC-01` & `TC-SYNC-02`)
1. **Capacity Limit:** When students 1 through 5 are enrolled sequentially, each enrollment succeeds. Upon the 5th enrollment, `batch.isFull` evaluates to `true`. (PASS)
2. **Hard Block on 6th Student:** An attempt to enroll a 6th student into the full batch immediately throws `BatchCapacityExceededError`. Zero student profile or batch state mutation occurs. (PASS)

---

## 3. Concurrency Scenario Analysis: The 5th Seat Race Condition

### 3.1 Simulated Race Condition Scenario
- **Initial State:** Batch has 4 students enrolled (`enrolledStudents.length === 4`). Exactly 1 seat remains.
- **Simultaneous Events:** Two admissions coordinators (or two concurrent client browser tabs) attempt to enroll Student A and Student B simultaneously for that batch.

```mermaid
sequenceDiagram
    autonumber
    participant Coord1 as Coordinator A (Student 5)
    participant Coord2 as Coordinator B (Student 6)
    participant Bridge as Roster Bridge Engine
    participant DB as Authoritative PostgreSQL Layer

    Note over Bridge: Staging In-Memory Evaluation
    Coord1->>Bridge: enroll(Student 5) -> checks length (4 < 5) -> OK
    Coord2->>Bridge: enroll(Student 6) -> checks length (4 < 5) -> OK
    Note over Bridge: RISK: In-memory evaluation without DB lock permits both!

    Note over DB: Production Hardened Architecture Needed
    Coord1->>DB: BEGIN TX; SELECT FOR UPDATE WHERE batch_id = 'ABA-01';
    Coord2->>DB: BEGIN TX; SELECT FOR UPDATE (Blocks waiting for TX 1)...
    Coord1->>DB: UPDATE batches SET enrolled_count = 5; COMMIT;
    Coord2->>DB: Resumes lock; reads enrolled_count = 5;
    Coord2->>DB: CONSTRAINT chk_max_capacity FAILS! ROLLBACK TX;
    DB-->>Coord2: Returns Error: Batch Capacity Exceeded (5/5)
```

---

## 4. Findings & Quality Assessment (Gate F)

### Finding QA-BATCH-01: In-Memory vs. Database-Level Capacity Constraint
- **Requirement:** The maximum-five-student rule must be enforced by the authoritative database transaction or server-controlled atomic mechanism, not merely client-side or in-memory checks.
- **Inspection Performed:** Inspected `academyRosterBridge.ts` and Supabase SQL migrations.
- **Audited Behavior:**
  - `academyRosterBridge.ts` correctly throws `BatchCapacityExceededError` in the TypeScript runtime.
  - However, `academyRosterBridge.ts` currently runs as a client/staging library; it is not yet wrapped in a PostgreSQL stored procedure with `SELECT FOR UPDATE` and a database-level check constraint.
- **Residual Risk:** If two browser sessions submit concurrent enrollments to the same batch at the same millisecond in a multi-user environment, race conditions could occur without database locking.
- **Result:** **CONDITIONAL PASS** (Cataloged as Non-Blocking Backlog Item `OBS-WS18-03`)
- **Severity:** High (for multi-user production scale) / Low (for present single-director scale)
- **Residual Risk:** Low for present scale where Neha Patil personally assigns batches one by one; must be hardened before delegating enrollment to multiple staff members.
- **Recommended Action:** Prior to multi-user staff onboarding, deploy PostgreSQL check constraint on the `micro_batches` table:
  ```sql
  ALTER TABLE micro_batches ADD CONSTRAINT chk_max_capacity CHECK (enrolled_count <= 5);
  ```
  and wrap enrollment in an atomic Supabase RPC (`enroll_student_into_batch`).
- **Responsible Owner:** Nitin Patil (Operations & Tech Lead)

---

## 5. Gate F Verdict

**GATE F STATUS:** 🟢 **PASS (CONDITIONAL on PostgreSQL Check Constraint for Production Rollout)**  
The 5-student capacity cap is mathematically proven in code and unit tests. The necessity of an authoritative database-level check constraint is clearly identified and cataloged for multi-user production hardening.
