# ARNAV ABACUS ACADEMY (AAA) — WS-07 ARCHITECTURE DECISION & OPEN ISSUE REGISTER
## Executive Review & Ratification Instrument (`MGT-DET-S3-10`)

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Stage:** Stage 3 — Architecture & Design  
**Deliverable Under Review:** `AAA-S3-SPEC-WS07-01` (`AAA_WS07_AcademyOS_Boundary_Isolation_Architecture.md`)  
**Validation Report:** `AAA-S3-VAL-WS07-01` (`AAA_WS07_Validation_Report.md`)  
**Document Ref:** `AAA-S3-MGT-WS07-01`  
**Date of Presentation:** 03 November 2026  
**Executive Reviewers:** Nitin Patil (Operations & Technology Lead) & Neha Patil (Founder & Academic Director)  
**Status:** 🟡 **DRAFT — SUBMITTED FOR FORMAL MANAGEMENT DETERMINATION**  

---

## 1. Executive Summary

This register presents the formal architectural decision framework and open issue log for **WS-07 AcademyOS Boundary Isolation & Protection Architecture**.

Workstream WS-07 establishes the architectural, data, and access-control boundaries between the public admissions website (Zone 1), the student practice engine (Zone 2), and internal academy operations (Zone 3). 

Its objective is to safeguard existing student practice routines while providing an enterprise-grade roadmap to resolve vulnerabilities associated with client-side OTP generation and public `jsonblob.com` storage.

---

## 2. Structured Items for Management Evaluation

### 2.1 Technology & Operations Review Items (Nitin Patil — Operations & Technology Lead)

#### Item TECH-07-01: Architectural Isolation Strategy (Options Analysis)
- **Proposed Architectural Decision:**  
  Adopt **Option 2 (Boundary Isolation & Edge API Proxy)** for Stage 4 implementation. Maintain a unified React codebase while introducing a secure serverless API layer (via Vercel Serverless Functions / Cloudflare Workers) to handle authentication, OTP generation, and database persistence.
- **Expected Benefits:**  
  - Eliminates client-side OTP exposure and browser console bypasses.
  - Replaces unauthenticated `jsonblob.com` endpoints with encrypted database storage.
  - Zero disruption to student URLs (`/practice`), bookmarks, and client-side drill mechanics.
- **Risks & Tradeoffs:**  
  Requires establishing a secure backend database (e.g., Supabase / Firebase / Postgres) during Stage 4.
- **Management Sign-off Status:** `[ ] APPROVED   [ ] APPROVED WITH AMENDMENTS   [ ] REJECTED`

#### Item TECH-07-02: Student Identity Model (Permanent Student ID)
- **Proposed Architectural Decision:**  
  Transition from the current "Email-as-ID" model to the candidate permanent Student ID format:  
  **`AAA-STU-YYYY-XXXX`** (e.g., `AAA-STU-2026-0042`).
- **Operational Rationale:**  
  Allows multiple siblings to learn under a single parent contact email without overwriting each other's practice attempts; removes PII (email addresses) from application storage keys and log entries.
- **Risks & Tradeoffs:**  
  Requires an initial data reconciliation script to assign permanent IDs to existing registered student emails.
- **Management Sign-off Status:** `[ ] APPROVED   [ ] APPROVED WITH AMENDMENTS   [ ] REJECTED`

#### Item TECH-07-03: Deprecation of Public JSONBlob Persistence
- **Proposed Architectural Decision:**  
  Formally deprecate the two hardcoded `jsonblob.com` endpoints (`019f9065-ec4f-7d60-b80c-07b7f039afe6` and `019fa81d-0104-7348-beae-a82900883473`). Mandate that all student attempt histories in `localStorage` be preserved and safely migrated to an authenticated database before retiring the fallback.
- **Operational Rationale:**  
  Closes a major data exfiltration vector where unauthenticated parties can read or overwrite student attempt records.
- **Management Sign-off Status:** `[ ] APPROVED   [ ] APPROVED WITH AMENDMENTS   [ ] REJECTED`

---

### 2.2 Academic & Child Privacy Review Items (Neha Patil — Founder & Academic Director)

#### Item ACAD-07-01: Leaderboard Privacy & Milestone Progress
- **Proposed Architectural Decision:**  
  Reform the AcademyOS results view (`PracticeResult.tsx`) to prioritize **self-referential milestone progress** (e.g., "Personal Best: 92% • Speed improved by 4.2 seconds") rather than a public peer ranking table that displays full student names and peer comparisons. If peer benchmarks are enabled by an educator, use pseudonymous identifiers (e.g., "Student A.P.").
- **Pedagogical Rationale:**  
  Directly aligns with AAA's foundational philosophy: *Child growth is compared with the child's own previous baseline, not pitted against peers.* Eliminates calculation anxiety and protects children's privacy.
- **Management Sign-off Status:** `[ ] APPROVED   [ ] APPROVED WITH AMENDMENTS   [ ] REJECTED`

#### Item ACAD-07-02: Multi-Programme Attachment to Single Student Profile
- **Proposed Architectural Decision:**  
  Structure the student academic profile so that an enrolled child can have multiple independent course enrollments (e.g., Abacus Level SR-2 AND Vedic Math Level JVM-1) attached to their permanent Student ID, each maintaining its own independent practice level, speed record, and diagnostic observation history.
- **Pedagogical Rationale:**  
  Reflects the actual developmental trajectory of students advancing from tactile abacus into Vedic and school mathematics.
- **Management Sign-off Status:** `[ ] APPROVED   [ ] APPROVED WITH AMENDMENTS   [ ] REJECTED`

---

## 3. Formal Management Determination Record (`MGT-DET-S3-10`)

```
========================================================================================
MANAGEMENT DETERMINATION RECORD: MGT-DET-S3-10
Subject: Approval of WS-07 AcademyOS Boundary Isolation & Protection Architecture
Stage-Gate Milestone: Stage-Gate 3.2 Review
========================================================================================

[ ] DETERMINATION 1 — ARCHITECTURAL ISOLATION & STORAGE ROADMAP (Nitin Patil)
    - Formally approves Option 2 (Boundary Isolation & Edge API Proxy) as the target architecture.
    - Approves deprecation and migration roadmap for public jsonblob.com endpoints.
    - Confirms adoption of candidate Student ID schema (AAA-STU-YYYY-XXXX).
    Decision: [  ] APPROVED    [  ] APPROVED WITH AMENDMENTS    [  ] REJECTED
    Sign-off: Nitin Patil (Operations & Technology Lead)    Date: _______________

[ ] DETERMINATION 2 — STUDENT PRIVACY & LEADERBOARD POLICY (Neha Patil)
    - Formally approves replacing public peer rankings with self-referential milestone progress.
    - Approves pseudonymous display standards for student practice records.
    - Confirms multi-programme attachment to single student profiles.
    Decision: [  ] APPROVED    [  ] APPROVED WITH AMENDMENTS    [  ] REJECTED
    Sign-off: Neha Patil (Founder & Academic Director)      Date: _______________

[ ] DETERMINATION 3 — WORKSTREAM WS-07 FORMAL RATIFICATION (Joint Gate 3.2 Sign-Off)
    - Formally ratifies Deliverable AAA-S3-SPEC-WS07-01.
    - Formally seals and closes Stage-Gate 3.2.
    - Authorizes commencement of Workstream WS-08 (Diagnostic Assessment Architecture) 
      and WS-09 (Technology Architecture & CRM Strategy).
    Decision: [  ] APPROVED    [  ] APPROVED WITH AMENDMENTS    [  ] REJECTED
    Sign-off (Joint): Neha Patil & Nitin Patil              Date: _______________
========================================================================================
```

---

## 4. Open Issues and Risk Log (WS-07 / WS-10)

| Issue ID | Risk / Consideration | Threat Ref | Impact Severity | Remediation Pathway |
| :---: | :--- | :---: | :---: | :--- |
| **ISS-07-01** | **EmailJS Console OTP Leak:** When EmailJS keys are unconfigured, `AuthContext.tsx` logs the plain OTP to `console.log`. | `TM-02` | **HIGH** | Resolved by moving OTP generation to serverless Edge API in Stage 4. |
| **ISS-07-02** | **Public JSONBlob Exfiltration:** Student attempt records and names are retrievable via unauthenticated REST GET calls. | `TM-01` | **HIGH** | Resolved by migrating to authenticated database in Stage 4. |
| **ISS-07-03** | **Unauthenticated Route Loading:** `ProtectedRoute` in `src/App.tsx` does not redirect to `/login` if `currentUser === null`. | `TM-03` | **MEDIUM** | In Stage 4, update route guard to enforce `<Navigate to="/login" replace />`. |
| **ISS-07-04** | **Sibling Account Collision:** Two children sharing a parent's email address overwrite each other's attempt records. | `TM-03` | **MEDIUM** | Resolved by deploying the `AAA-STU-YYYY-XXXX` schema in Stage 4. |

---

## 5. Mandatory Stop Condition Enforced

> [!IMPORTANT]
> **MANDATORY STOP CONDITION ENFORCED:**  
> The architecture team has stopped all tool execution.  
> WS-07 is submitted in status **🟡 DRAFT — AWAITING MANAGEMENT REVIEW**.  
> In compliance with Stage 3 governance, no source-code changes, database migrations, or work on WS-08 will proceed until Neha Patil and Nitin Patil execute formal written sign-off under **`MGT-DET-S3-10`**.

---
*End of Architecture Decision & Open Issue Register.*
