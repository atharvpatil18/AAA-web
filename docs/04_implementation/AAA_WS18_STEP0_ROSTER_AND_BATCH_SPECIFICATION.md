# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3
## Document Reference: `AAA-WS18-STEP0-SPEC-01`
### WS-18 Step 0: Micro-Batch Capacity & Student Roster Technical Specification
#### AcademyOS Roster Ingestion Sync Bridge

**Document Version:** 1.0.0  
**Specification Date:** 05-November-2026  
**Governing Authority:** `MGT-DET-S4-S3-CLOSURE-INT-07`  
**Execution Stage:** Sprint 3 — WS-18 Step 0 Technical Specification  
**Feature Branch:** `feat/sprint3-integration`  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Specification Overview

This specification establishes the data contracts, algorithmic rules, state transitions, and software interfaces for **Workstream 18 (AcademyOS Roster Ingestion Sync Bridge)**.

---

## 2. Data Contracts & Interfaces

### 2.1 Enrolled Student Profile (`AcademyOSStudentProfile`)

```typescript
export interface AcademyOSStudentProfile {
  studentUid: string;              // Deterministic format: "AAA-STD-YYYY-XXXX"
  leadReference: string;           // Cross-referenced source: "AAA-LEAD-YYYY-XXXXX"
  displayName: string;             // Student first name + initial (e.g. "Aarav P.")
  parentEmail: string;             // Authenticated login email for AcademyOS
  emergencyPhone: string;          // Normalized 10-digit Indian mobile
  assignedBatchId: string;         // e.g. "AAA-BATCH-2026-ABA-WAKAD-01"
  enrolledCourse: "abacus" | "vedic" | "mental" | "school_maths" | "olympiad";
  assignedLevels: string[];        // e.g. ["JR-0", "JR-1"]
  accessMode: "both" | "quiz" | "learn";
  enrollmentDate: string;          // ISO 8601
  status: "ACTIVE" | "ON_LEAVE" | "COMPLETED" | "WITHDRAWN";
  retentionExempt: true;           // Statutory exemption under DPDP Act 2023
}
```

### 2.2 Micro-Batch Roster Model (`MicroBatchRoster`)

```typescript
export interface MicroBatchRoster {
  batchId: string;                 // Format: "AAA-BATCH-YYYY-[PROG]-[VENUE]-[SEQ]"
  batchName: string;               // e.g. "Junior Abacus — Weekend Batch A"
  program: "abacus" | "vedic" | "mental" | "school_maths" | "olympiad";
  schedule: string;                // e.g. "Sat & Sun 10:00 AM - 11:30 AM"
  venue: "offline_wakad" | "live_online";
  maxCapacity: 5;                  // STRICT CONSTANT: Maximum 5 students
  enrolledStudents: {
    studentUid: string;
    studentName: string;
    enrolledAt: string;            // ISO 8601
  }[];
  isFull: boolean;                 // enrolledStudents.length >= 5
}
```

---

## 3. Algorithmic Rules & Enforcement Logic

### 3.1 Strict Batch Capacity Enforcement ($\le 5$)

1. **Rule:** No micro-batch at Arnav Abacus Academy may accommodate more than **five students**.
2. **Pre-Condition Assertion:** Before adding a student to a batch roster, the system evaluates:
   $$\text{batch.enrolledStudents.length} < 5$$
3. **Capacity Reached Guard:** If $\text{batch.enrolledStudents.length} = 5$, the ingestion engine throws `BatchCapacityExceededError` and marks `batch.isFull = true`.
4. **Oversubscription Prevention:** Any concurrent or race-condition attempt to enroll a 6th student into the same batch must fail atomically.

### 3.2 Monotonic Deterministic Student UID Generation

1. **Format:** `AAA-STD-[ACADEMIC_YEAR]-[SEQUENCE_4_DIGITS]` (e.g. `AAA-STD-2026-0001`).
2. **Uniqueness:** Generated sequentially from verified batch registration count or central atomic sequence.
3. **Permanent Decoupling:** Decoupled from the parent's prospective enquiry sequence (`AAA-LEAD-YYYY-[00001]`).

### 3.3 AcademyOS Permission Hydration (`ApprovedEmailRecord`)

To allow the newly enrolled student to log in and practice in `PracticeHub.tsx`, the sync bridge generates an `ApprovedEmailRecord` conforming to `src/types/index.ts`:

```typescript
export function hydrateApprovedRecord(profile: AcademyOSStudentProfile): ApprovedEmailRecord {
  return {
    email: profile.parentEmail.toLowerCase().trim(),
    studentName: profile.displayName,
    isAdmin: false,
    permissions: [
      {
        course: profile.enrolledCourse as any,
        levels: profile.assignedLevels,
        accessMode: profile.accessMode
      }
    ]
  };
}
```

---

## 4. Test Harness Specifications (10 Acceptance Criteria)

A dedicated test suite `src/lib/academyRosterBridge.test.ts` will verify all technical requirements:

| Test ID | Test Assertion | Expected Behavior |
| :---: | :--- | :--- |
| **TC-SYNC-01** | Micro-Batch Capacity Constraint | Successfully enrolls up to 5 students into a single batch. |
| **TC-SYNC-02** | 6th Student Hard Overflow Block | Throws `BatchCapacityExceededError` when attempting to add 6th student to full batch. |
| **TC-SYNC-03** | Deterministic Student UID Generation | Generates valid sequential `AAA-STD-2026-XXXX` identifiers. |
| **TC-SYNC-04** | Dual-Identity Decoupling | Asserts permanent decoupling between `AAA-LEAD` and `AAA-STD`. |
| **TC-SYNC-05** | Telemetry & Honeypot Shredding | Verifies that IP hash, marketing consent, and honeypot flags are excluded from student profile. |
| **TC-SYNC-06** | AcademyOS Permission Hydration | Verifies `hydrateApprovedRecord()` yields valid `ApprovedEmailRecord` for `accessControl.ts`. |
| **TC-SYNC-07** | Course Level Mapping Integrity | Maps Neha Patil's diagnostic recommendations into exact curriculum level tags (`JR-0`, `SR-1`, etc.). |
| **TC-SYNC-08** | Unauthorized Role Enforcement | Rejects enrollment attempts from unauthorized roles (`ADMISSIONS_COORDINATOR` or `ANONYMOUS`). |
| **TC-SYNC-09** | CSV Roster Export Formula Neutralization | Verifies that formula triggers (`=`, `+`, `-`, `@`) in student names or batch IDs are escaped. |
| **TC-SYNC-10** | DPDP Retention Exemption Assertion | Asserts `retentionExempt: true` to prevent automated 90-day prospect purge of enrolled students. |
