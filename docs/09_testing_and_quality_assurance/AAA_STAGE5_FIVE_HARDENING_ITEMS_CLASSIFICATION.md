# ARNAV ABACUS ACADEMY (AAA) — STAGE 5 QA
## Five Hardening Items Technical & Business Reclassification

**Document Reference:** `AAA_STAGE5_FIVE_HARDENING_ITEMS_CLASSIFICATION`  
**Governing Baseline:** Stage 5 Quality Assurance Master Protocol & Determination `MGT-DET-S5-QA-COND-01`  
**Certificate Reference:** `AAA-S5-CERT-GATE-01`  
**Audited Branch:** `feat/sprint3-integration`  
**Auditor:** Independent Quality Assurance & Compliance Lead  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)  
**Date of Reconciliation:** 05-November-2026  

---

## 1. Executive Reclassification Protocol

In the original Stage 5 Certificate (`AAA-S5-CERT-GATE-01`), the five cataloged hardening items were collectively grouped under a general "Phase 2 hardening backlog prior to multi-centre expansion."

**Under this formal reconciliation, that classification is rejected as insufficiently protective of current academy operations.**

In accordance with AAA's governing directives and leadership instructions:
> *"Student identity integrity and the maximum-five-student batch capacity rule must not be deferred if their enforcement is not already reliable for current academy operations."*

The reconciliation team has re-evaluated each item against four strict categories:
- **Category A:** Mandatory before ANY production use (blocks both staging and production).
- **Category B:** Mandatory before production deployment (blocks merging to `main` and production release).
- **Category C:** Mandatory before multi-centre expansion / paid marketing scaling.
- **Category D:** Non-critical future enhancement.

---

## 2. Consolidated Hardening Reclassification Matrix

| Item ID | Description & Target Module | Original Classification | Reconciled Classification | Technical & Business Justification | Pre-Requisite for Production Merge? |
| :---: | :--- | :---: | :---: | :--- | :---: |
| **`QA-CAP-01`** | **PostgreSQL Check Constraint & Row Lock**<br/>(`CHECK (enrolled_count <= 5)`) | Phase 2 Backlog | **B — Mandatory Before Production Deployment** | Enforces AAA's primary pedagogical promise ($\le 5$ students/batch) at the authoritative database layer, preventing concurrency race-condition oversubscription. | 🔴 **YES (BLOCKING)** |
| **`QA-ROS-01`** | **Multi-Student Sibling Email Indexing**<br/>(`accessControl.ts` & `ApprovedEmailRecord`) | Phase 2 Backlog | **B — Mandatory Before Production Deployment** | Prevents sibling data collisions where enrolling a second child under the same parent email overwrites the earlier child's student name. | 🔴 **YES (BLOCKING)** |
| **`QA-INF-02`** | **Live Database Backup Restore Drill**<br/>(Supabase Mumbai Disaster Recovery) | Phase 2 Backlog | **B — Mandatory Before Production Deployment** | An untested backup is not a backup. Real parent and student records must not be stored in production without verified restore evidence. | 🔴 **YES (BLOCKING)** |
| **`QA-LEG-01`** | **Legal Review of Consent & CCPA Refund**<br/>(Parent Registration Deed) | Phase 2 Backlog | **B — Mandatory Before Production Deployment** | Terms governing minor children's education, digital service consent, and fee refunds must be legally vetted before accepting commercial admissions fees. | 🔴 **YES (BLOCKING)** |
| **`QA-INT-02`** | **50-Concurrency PostgREST RPC Benchmark**<br/>(Supabase Staging Gateway Stress Test) | Phase 2 Backlog | **C — Mandatory Before Multi-Centre / Paid Ads** | Current organic single-center volume (~5–10 leads/day) is well within single-thread RPC safety; high-concurrency stress test is only needed for paid ad campaigns. | 🟡 **NO (Non-Blocking for Launch)** |

---

## 3. Deep-Dive Analysis by Item

---

### 3.1 Item QA-CAP-01: Micro-Batch Capacity Database Enforcement
- **Component:** `src/lib/academyRosterBridge.ts` / Supabase PostgreSQL `micro_batches` table
- **Current Implementation:**
  - `academyRosterBridge.ts` (lines 31–33) evaluates:
    ```typescript
    if (batch.enrolledStudents.length >= MAX_BATCH_CAPACITY) {
      throw new BatchCapacityExceededError(batch.batchName, MAX_BATCH_CAPACITY);
    }
    ```
  - This check executes purely within the in-memory JavaScript/TypeScript runtime.
- **Identified Failure Mode:**
  - If two browser sessions (or two automated processes) enroll students concurrently when a batch has 4 students, both read `length === 4`, both pass the guard, and both commit. The batch ends up with 6 students.
  - This directly violates AAA's core contractual and pedagogical promise: *"Personalised learning in small batches, with a maximum of five students per batch."*
- **Reclassification: B — MANDATORY BEFORE PRODUCTION DEPLOYMENT**
- **Technical & Business Justification:**
  - The maximum-5 rule is not a future multi-center feature—it is the foundational premise of Neha Patil's teaching model in Wakad today.
  - A database-level check constraint costs ₹0.00, requires a simple SQL statement, and provides mathematically infallible protection against oversubscription:
    ```sql
    ALTER TABLE micro_batches ADD CONSTRAINT chk_max_capacity CHECK (enrolled_count <= 5);
    ```
- **Action Plan:** Deploy constraint and atomic RPC `enroll_student_into_batch` before production merge.

---

### 3.2 Item QA-ROS-01: Multi-Student Sibling Email Indexing
- **Component:** `src/types.ts` & `src/lib/accessControl.ts`
- **Current Implementation:**
  - `accessControl.ts` maps permissions using `email: string`:
    ```typescript
    export interface ApprovedEmailRecord {
      email: string;
      studentName?: string;
      isAdmin?: boolean;
      permissions: LevelPermission[];
    }
    ```
  - The lookup function `getApprovedRecord(email)` returns a single record for a given email string.
- **Identified Failure Mode:**
  - Sibling enrollment is extremely common in mathematics academies (e.g. older sibling in Vedic Maths, younger sibling in Abacus).
  - When a parent uses the same email (`parent@gmail.com`) to enroll Child 2, hydrating Child 2's profile into `ApprovedEmailRecord` overwrites `studentName` of Child 1.
  - While `academyRosterBridge.ts` assigns unique Student UIDs (`AAA-STD-2026-0001` vs `0002`), AcademyOS permission lookups will collide.
- **Reclassification: B — MANDATORY BEFORE PRODUCTION DEPLOYMENT**
- **Technical & Business Justification:**
  - Enrolling two siblings must not corrupt the academic identity of the first child.
  - Upgrading `ApprovedEmailRecord` to support an array of students per parent email or indexing by `studentUid` is required before onboarding real families.
- **Action Plan:** Refactor `ApprovedEmailRecord` to support multi-student indexing per parent account before production launch.

---

### 3.3 Item QA-INF-02: Live Database Backup Snapshot & Restore Drill
- **Component:** Supabase Mumbai (`ap-south-1`) Managed Database
- **Current Implementation:**
  - Supabase free tier provides daily automated database backups retained for 7 days.
  - SQL schema, sequences, and tables are version-controlled in the repository.
  - **However, zero restore drills have been executed to date.**
- **Identified Failure Mode:**
  - If a production schema corruption, human error, or Supabase service failure occurs, the operational team has never practiced or timed a restore procedure.
  - Under CERT-In Directions 2022 and standard IT governance, unverified backups cannot be claimed as disaster recovery readiness.
- **Reclassification: B — MANDATORY BEFORE PRODUCTION DEPLOYMENT**
- **Technical & Business Justification:**
  - Real parent inquiries and student academic records are entrusted to AAA. An unverified backup posture exposes the academy to total data loss.
  - A staging restore drill takes under 30 minutes, incurs ₹0.00 cost, and establishes an empirical Recovery Time Objective (RTO).
- **Action Plan:** Execute formal staging restore drill from snapshot, document RTO in `docs/11_evidence_and_screenshots/`, and confirm 100% data fidelity.

---

### 3.4 Item QA-LEG-01: Formal Legal Counsel Review of Registration Deed & Refund Policy
- **Component:** Parental Consent Terms, CCPA Refund Policy, DPDP Disclosures
- **Current Implementation:**
  - Statutory texts have been carefully written to eliminate hyperbolic claims and align with DPDP Act Section 6 (unbundled consent) and Section 9.
  - However, external legal counsel has not provided a written opinion on the tuition refund policy under the Consumer Protection Act (CCPA) 2019/2024.
- **Identified Failure Mode:**
  - Operating fee collection without legally vetted terms creates liability in consumer dispute forums in Pune.
- **Reclassification: B — MANDATORY BEFORE PRODUCTION DEPLOYMENT**
- **Technical & Business Justification:**
  - While public web staging can display draft policies, real commercial fee transactions must be governed by an attorney-reviewed parent contract.
- **Action Plan:** Submit registration deed and refund terms to AAA's legal counsel in Pune for review prior to commercial launch.

---

### 3.5 Item QA-INT-02: 50-Concurrency PostgREST RPC Load Benchmark
- **Component:** Cloudflare Pages Functions `/api/discovery-intake` -> Supabase Mumbai RPC
- **Current Implementation:**
  - Verified with 12/12 passing automated tests in `functions/api/discovery-intake.test.ts`.
  - Atomic sequence `lead_ref_seq_2026` increments monotonically in simulated unit tests.
- **Identified Failure Mode:**
  - High concurrency ($> 50$ simultaneous requests/second) could exhaust free-tier Supabase connection pools during sudden advertising traffic surges.
- **Reclassification: C — MANDATORY BEFORE MULTI-CENTRE EXPANSION / PAID MARKETING**
- **Technical & Business Justification:**
  - Organic single-center admissions in Wakad typically generate 5 to 15 inquiries per day, dispersed over operating hours.
  - The built-in IP rate limiter (5 requests/minute per IP) prevents individual abusers from hammering the endpoint.
  - High concurrency testing is essential before running paid Meta/Google digital advertising campaigns, but is **not** a blocker for initial organic production launch.
- **Action Plan:** Schedule load benchmark prior to allocating paid ad spend.
