# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3
## Document Reference: `AAA_WS18_IDENTITY_AND_ROSTER_INTEGRITY_AUDIT`
### WS-18 Independent Technical & Governance Acceptance Audit
#### Dimension B: Dual Identity & Student Data Integrity Audit

**Document Version:** 1.0.0  
**Audit Date:** 05-November-2026  
**Audited Branch:** `feat/sprint3-integration`  
**Audited HEAD Commit:** `d3daf4f`  
**Governing Baseline Determination:** `MGT-DET-S4-S3-STEP0-WS18-08`  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Summary

This audit inspects the data architecture, identity lifecycles, and integrity constraints implemented in `src/lib/academyRosterBridge.ts`. It examines how prospective leads transition into enrolled students, evaluates identity uniqueness, tests concurrency limits, and identifies data model boundaries between the admissions portal and AcademyOS.

---

## 2. Dual-Identity Decoupling Architecture

### 2.1 Identifier Separation

```
[ Prospective Zone ]                                     [ Educational Zone ]
Lead ID: AAA-LEAD-2026-00042        =========>>         Student ID: AAA-STD-2026-0001
- Subject to 90-day purge clock                          - Permanent academic record
- Contains marketing telemetry & IP                      - Stripped of prospective telemetry
- Ephemeral admissions entity                            - Persistent learning entity
```

1. **Format Decoupling:**
   - Admissions Lead Reference: `AAA-LEAD-[YYYY]-[XXXXX]` (e.g. `AAA-LEAD-2026-00042`).
   - Permanent Student Identifier: `AAA-STD-[YYYY]-[XXXX]` (e.g. `AAA-STD-2026-0001`).
2. **Cross-Referencing:**
   - In `EnrolledStudentProfile`, `leadReference` stores `AAA-LEAD-2026-00042` to maintain an immutable audit trail of how the student originated.
   - In `LeadRecord`, `enrolledStudentUid` stores `AAA-STD-2026-0001` upon transitioning to terminal state `ENROLLED`.
   - The two identifiers are strictly decoupled; a student never uses a Lead ID to log in or access practice sessions.

---

## 3. Data Integrity & Boundary Analysis

### 3.1 One Child — One Permanent Student ID
- Under `enrollLeadToRoster()`, every successful enrollment allocates a dedicated `studentUid`.
- When a child transitions from Abacus Junior into Vedic Mathematics or Mental Math, the architecture supports attaching additional level permissions to the **same** existing student profile without issuing a duplicate Student UID.

### 3.2 Sibling / Multi-Child Enrolment Limitation (Key Architectural Finding)
- **Current Behavior in `accessControl.ts`:**
  The downstream AcademyOS access database (`ApprovedEmailRecord`) indexes users strictly by `email: string`:
  ```typescript
  export interface ApprovedEmailRecord {
    email: string;
    studentName?: string;
    isAdmin?: boolean;
    permissions: LevelPermission[];
  }
  ```
- **Identified Architectural Observation (OBS-WS18-01):**
  If a parent has two children (e.g., Aarav and Ananya) enrolling with the identical parent email `parent@example.com`, `accessControl.ts`'s `getApprovedRecord(email)` returns a single record. Currently, `academyRosterBridge.ts` sets `displayName` to the child being enrolled, but if two siblings share an email, the second hydration would overwrite the first student's name in `ApprovedEmailRecord` unless AcademyOS is upgraded to support multi-student profiles per parent email.
- **Classification:** **Non-Blocking Architectural Observation**. Does not block single-student admissions staging, but is cataloged for AcademyOS Phase 2 roster enhancement.

### 3.3 Monotonicity vs. Uniqueness vs. Concurrency

| Concept | Implementation in `academyRosterBridge.ts` | Production Live Constraint Needed |
| :--- | :--- | :--- |
| **Monotonicity** | Sequential counter: `AAA-STD-2026-0001`, `0002`, `0003` generated via `generateStudentUid(academicYear, nextSeq)`. | In-memory counter is monotonic within a single runtime batch instance. |
| **Uniqueness** | Unique per batch in test execution. | Across concurrent distributed serverless instances, two concurrent enrollment requests could read identical sequence numbers without an atomic database sequence (`lead_ref_seq_2026`) or PostgreSQL `UNIQUE (student_uid)` constraint. |
| **Distinction** | *Unique ID* guarantees non-collision (e.g. UUID). *Sequential ID* provides human-readable monotonic numbering. | The system uses sequential display IDs backed by sequence numbers. For production scale, an atomic PostgreSQL sequence must back `nextSeq`. |

### 3.4 Duplicate Enrolment Handling
- `enrollLeadToRoster()` verifies `validPriorStates = ["DECISION_PENDING", "RECOMMENDATION_DELIVERED", "FOLLOW_UP_ACTIVE"]`.
- If a lead has already been enrolled (`currentState === "ENROLLED"`), re-submitting enrollment throws `InvalidEnrollmentStateError`.
- This ensures duplicate submissions do not spawn phantom duplicate student records.

---

## 4. Integrity Findings Summary

1. **Dual Identity:** Fully verified and decoupled.
2. **Telemetry Shredding:** Marketing consent and IP hashes are completely purged during hydration into `EnrolledStudentProfile`.
3. **Auditable Conversion:** `LeadRecord.history` appends an immutable transition event recording the actor (`Neha Patil`), timestamp, batch name, and generated Student UID.
4. **Production Hardening Requirement:** Cataloged `OBS-WS18-01` (Multi-student per email support) and `OBS-WS18-02` (PostgreSQL atomic sequence binding for student UIDs).
