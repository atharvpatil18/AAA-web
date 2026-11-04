# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# WS-09A.2: STUDENT, PARENT & SIBLING RELATIONAL DATA MODEL

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S3-SPEC-WS09A-02`  
**Stage:** Stage 3 — Architecture & Design  
**Parent Workstream:** WS-09 — Technology Architecture, Data Persistence & CRM Strategy  
**Sub-Workstream:** WS-09A — Student Identity, Data Architecture & Persistence Strategy  
**Deliverable:** WS-09A.2 — Relational Data Model Specification  
**Governance Authority:** Nitin Patil (Operations & Technology Lead) & Neha Patil (Academic Director)  
**Date:** 04 November 2026  
**Status:** 🟡 **DRAFT — AWAITING MANAGEMENT REVIEW (GATE 3.4 OPEN)**  
**Execution Mode:** STRICTLY DOCUMENTATION-ONLY (IMPLEMENTATION FREEZE ACTIVE)  

---

## 1. Scope & Objective

This document specifies the complete, authoritative Entity-Relationship (ER) model for Arnav Abacus Academy. It models all academic, administrative, diagnostic, operational, and student progress entities required by the academy's real-world business operating procedures (SOPs), permanently decoupling operational student records from simplistic web enquiry forms.

### 1.1 Repository Baseline vs. Proposed Additions

To maintain absolute architectural transparency, the table below distinguishes between entities verified in the existing code baseline (`src/types.ts`, `src/lib/cloudSync.ts`, `src/lib/accessControl.ts`) and proposed relational entities:

| Entity Name | Source / Status | Current Representation in Repository | Proposed Relational Representation |
| :--- | :--- | :--- | :--- |
| **Student** | Evolved from Code | Stored implicitly as `ApprovedEmailRecord` (`src/types.ts:52`) and `User` (`src/lib/AuthContext.tsx:11`). Identity tied directly to email. | Normalized `students` entity with internal UUID primary key and unique human display ID. |
| **Parent / Guardian** | Newly Proposed | Transiently captured as `LeadSubmission.parentName` (`src/types.ts:36`). No persistent entity exists. | First-class `guardians` and `families` entities with E.164 phone and email normalization. |
| **Sibling Linkage** | Newly Proposed | Completely absent in prototype; causes email collisions. | Relational junction `student_family_members` linking siblings to shared family account. |
| **Programme** | Exists in Code | Static data interface `Program` (`src/types.ts:6`). | Normalized catalog `programmes` entity supporting all 5 academy offerings. |
| **Enrolment** | Newly Proposed | Conflated with static `LevelPermission` array in localStorage. | Explicit `enrolments` entity with enrollment date, status, and fee tier. |
| **Course & Level** | Exists in Code | Hardcoded string arrays in `accessControl.ts` and `types.ts:48`. | Structured `courses` and `levels` entities defining formal academic curricula. |
| **Batch** | Newly Proposed | Conflated in scheduling discussions; no data entity. | Structured `batches` entity enforcing maximum $\le 5$ students micro-batch constraint. |
| **Attendance** | Newly Proposed | Absent in repository; tracked physically on paper registers. | Structured `attendance_records` entity tracking physical/online presence and punctuality. |
| **Fee / Payment** | Newly Proposed | Absent in repository; tracked via external receipts. | Structured `fee_invoices` and `payments` entities tracking financial transactions. |
| **Diagnostic Assessment** | Designed in WS-08 | Abstract rubric in `AAA-S3-SPEC-WS08-01`. | Structured `diagnostic_assessments` and `dimension_scores` entities. |
| **Practice Attempt** | Exists in Code | Flattened JSON object `AttemptRecord` (`cloudSync.ts:6`) synced to JSONBlob. | Normalized `practice_attempts` and `practice_answers` entities. |
| **Achievement Record** | Designed in WS-07 | Flattened `ApprovedEmailRecord` / unverified local certificates. | Structured `practice_achievement_records` entity with tamper-evident hash. |

---

## 2. Complete Entity-Relationship (ER) Diagram

```mermaid
erDiagram
    FAMILIES ||--|{ GUARDIANS : contains
    FAMILIES ||--|{ STUDENTS : has
    STUDENTS ||--o{ ENROLMENTS : registers
    PROGRAMMES ||--|{ COURSES : offers
    COURSES ||--|{ LEVELS : contains
    LEVELS ||--o{ ENROLMENTS : current_level
    ENROLMENTS ||--o{ BATCH_STUDENTS : scheduled_in
    BATCHES ||--|{ BATCH_STUDENTS : includes
    BATCH_STUDENTS ||--o{ ATTENDANCE_RECORDS : logs
    ENROLMENTS ||--o{ INVOICES : bills
    INVOICES ||--o{ PAYMENTS : settles
    STUDENTS ||--o{ DIAGNOSTIC_ASSESSMENTS : undergoes
    DIAGNOSTIC_ASSESSMENTS ||--|{ DIMENSION_SCORES : evaluates
    STUDENTS ||--o{ PRACTICE_ATTEMPTS : performs
    PRACTICE_ATTEMPTS ||--|{ ATTEMPT_ANSWERS : includes
    STUDENTS ||--o{ ACHIEVEMENT_RECORDS : earns
    LEAD_INQUIRIES ||--o{ DISCOVERY_SESSIONS : requests
    DISCOVERY_SESSIONS ||--o| DIAGNOSTIC_ASSESSMENTS : results_in

    FAMILIES {
        uuid id PK
        string display_id UK "AAA-FAM-YYYY-XXXX"
        string primary_phone UK "E.164"
        string primary_email
        string residential_locality "Wakad / Pimple Saudagar / etc."
        timestamp created_at
    }

    GUARDIANS {
        uuid id PK
        uuid family_id FK
        string full_name
        string relationship "Mother | Father | Guardian"
        string phone_number
        string email
        boolean is_primary_contact
    }

    STUDENTS {
        uuid id PK
        string display_id UK "AAA-STU-YYYY-XXXX"
        uuid family_id FK
        string first_name
        string last_name
        date date_of_birth
        string gender "M | F | Other"
        string current_school
        string current_school_grade
        timestamp created_at
        string status "ACTIVE | PAUSED | ALUMNI | PROSPECT"
    }

    PROGRAMMES {
        string code PK "ABACUS | VEDIC | MENTAL_MATH | SCHOOL_MATH | OLYMPIAD"
        string title
        string age_group
        string description
        boolean is_active
    }

    COURSES {
        uuid id PK
        string programme_code FK
        string course_name
        string track_type "Junior | Senior | Foundation"
    }

    LEVELS {
        uuid id PK
        uuid course_id FK
        string level_code "JR-1 | JR-2 | Level 1 | Level 2 | etc."
        int sequence_order
        int required_completion_weeks
    }

    ENROLMENTS {
        uuid id PK
        uuid student_id FK
        string programme_code FK
        uuid current_level_id FK
        date start_date
        date expected_end_date
        string status "ACTIVE | PAUSED | COMPLETED"
        timestamp created_at
    }

    BATCHES {
        uuid id PK
        string programme_code FK
        uuid level_id FK
        string instructor_name "Neha Patil / Approved Educator"
        string schedule_day "Saturday | Sunday | Weekday"
        time start_time
        time end_time
        int max_capacity "Enforced max 5"
        boolean is_active
    }

    BATCH_STUDENTS {
        uuid id PK
        uuid batch_id FK
        uuid enrolment_id FK
        date joined_date
        string status "ACTIVE | TRANSFERRED | DROPPED"
    }

    ATTENDANCE_RECORDS {
        uuid id PK
        uuid batch_student_id FK
        date session_date
        string status "PRESENT | ABSENT | EXCUSED"
        string behavioral_notes
        timestamp recorded_at
    }

    INVOICES {
        uuid id PK
        uuid family_id FK
        uuid enrolment_id FK
        string invoice_number UK
        decimal amount_inr
        date due_date
        string status "ISSUED | PAID | PARTIAL | CANCELLED"
    }

    PAYMENTS {
        uuid id PK
        uuid invoice_id FK
        string payment_ref UK
        decimal amount_paid_inr
        string payment_mode "UPI | NetBanking | Cheque | Cash"
        date payment_date
        string receipt_url
    }

    DIAGNOSTIC_ASSESSMENTS {
        uuid id PK
        uuid student_id FK
        string assessment_type "DISCOVERY_SESSION | LEVEL_TRANSITION"
        date assessment_date
        string evaluated_by "Neha Patil"
        string baseline_summary
        string recommended_programme
        uuid recommended_level_id FK
    }

    DIMENSION_SCORES {
        uuid id PK
        uuid diagnostic_id FK
        string dimension_name "Working Memory | Spatial Visualization | etc."
        int score_observed "Scale 1-5"
        string qualitative_observation
    }

    PRACTICE_ATTEMPTS {
        uuid id PK
        uuid student_id FK
        string set_id
        string set_title
        string category "abacus | vedic | mental"
        string level_code
        string mode "exam | instant | speed"
        int total_questions
        int correct_count
        int wrong_count
        int unanswered_count
        decimal score_percentage
        int time_taken_seconds
        timestamp completed_at
    }

    ACHIEVEMENT_RECORDS {
        uuid id PK
        uuid student_id FK
        string certificate_ref UK "AAA-REC-YYYY-XXXX"
        string record_type "PRACTICE_MILESTONE | LEVEL_COMPLETION"
        string programme_code
        string level_code
        string verification_hash "HMAC-SHA256"
        timestamp issued_at
    }
```

---

## 3. Detailed Entity Cardinalities & Referential Integrity

### 3.1 Family & Sibling Relationships
- `FAMILIES` to `STUDENTS`: **$1 : N$ (One-to-Many)**. Exactly one family/household can have multiple children enrolled in AAA.
- `FAMILIES` to `GUARDIANS`: **$1 : N$ (One-to-Many)**. A family can have multiple registered parents/guardians (e.g., Mother and Father).
- Referential Action: Deleting a family is strictly restricted (`ON DELETE RESTRICT`) if student or payment records exist.

### 3.2 Student to Multi-Programme Enrolments
- `STUDENTS` to `ENROLMENTS`: **$1 : N$ (One-to-Many)**. A student can simultaneously maintain active enrolments in multiple programmes (e.g., Abacus Level 2 and Vedic Math Junior).
- Referential Action: Foreign keys enforce valid `student_id` and `programme_code`.

### 3.3 Micro-Batch Constraint Enforcement
- `BATCHES` to `BATCH_STUDENTS`: **$1 : N$**. To strictly uphold AAA's core pedagogical differentiator ratified in Stage 2 (`BRD-S2-OPS-01`), the database layer enforces a trigger or check constraint ensuring active enrolments in a single batch never exceed 5:
$$\sum_{\text{status} = \text{'ACTIVE'}} \text{batch\_students} \le 5$$

### 3.4 Practice Attempts Isolation
- `STUDENTS` to `PRACTICE_ATTEMPTS`: **$1 : N$**. All practice attempts must explicitly link to `student_id`. Attempt records are append-only; historical attempts are immutable and cannot be overwritten.

---

## 4. Stage-Gate Acceptance & Verification

This specification satisfies **WS-09A.2** under Stage 3 Workstream WS-09A. It is submitted in **DRAFT** status and will be formally reviewed under Management Determination `MGT-DET-S3-12`. Gate 3.4 remains **OPEN**.
