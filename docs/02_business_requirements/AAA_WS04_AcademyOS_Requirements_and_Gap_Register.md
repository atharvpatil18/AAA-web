# AAA MASTER BRD — WORKSTREAM 04 (WS-04)
# ACADEMYOS REQUIREMENTS & GAP REGISTER
**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Role:** Lead Business Analyst, Academic Systems Architect & Security Governance Specialist  
**Governance Stage:** Stage 2 — Master Business Requirements Document (BRD) Workshop  
**Document Ref:** `docs/02_business_requirements/AAA_WS04_AcademyOS_Requirements_and_Gap_Register.md`  
**Date:** November 02, 2026 (Final Quality-Controlled Baseline)  
**Status:** 🟡 **DOCUMENTATION QUALITY CONTROL COMPLETE — AWAITING MANAGEMENT VALIDATION**  

---

## 1. Executive Summary & Purpose

This document audits the existing **AcademyOS** learning and practice runtime, evaluates technical capabilities against the ten non-negotiable technology principles, and catalogs architectural gaps identified during Workstream 04 evidence reconciliation.

In strict compliance with [AGENTS.md](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/AGENTS.md) Rule 3:
> *"AcademyOS Boundary Protection: Do not modify, delete, redirect, or duplicate the student learning platform and ERP functionality located under `/login`, `/practice`, `/practice/session`, and `/practice/results`."*

This register establishes requirements, capabilities, and governance gaps **only**. It does not authorize schema changes, backend refactoring, or code modifications during Stage 2.

---

## 2. The Ten Non-Negotiable Technology Principles

All future enhancements to AcademyOS and the Child Development Intelligence Layer™ must comply with these ten permanent principles:

| Principle # | Architectural Mandate | Governance Rule & System Implication | Status |
|---|---|---|---|
| **P-01** | **One Permanent Student ID** | A student is assigned exactly one immutable unique identifier (proposed format `AAA-STU-YYYY-XXXX`) upon enrollment that persists across all years and levels. | `[MANDATORY PRINCIPLE / PROPOSED FORMAT]` |
| **P-02** | **Multi-Programme Attachment** | Multiple academic streams (Abacus, Vedic, School Math, Olympiad) attach to the single permanent Student ID without creating duplicate student profiles. | `[MANDATORY PRINCIPLE]` |
| **P-03** | **Immutable Historical Records** | Historical practice attempts, scores, certificates, and level progression dates must never be overwritten, truncated, or deleted. All updates are append-only. | `[MANDATORY PRINCIPLE]` |
| **P-04** | **Entity Reuse Discipline** | Existing student, parent, course, level, batch, attendance, payment, and assessment records must be reused; zero duplication of records across modules. | `[MANDATORY PRINCIPLE]` |
| **P-05** | **Evidence-Gated Statements** | Significant developmental statements or progress remarks must be linked to concrete, dated classroom evidence (quiz attempts, dictation logs, worksheet audits). | `[MANDATORY PRINCIPLE]` |
| **P-06** | **Distinguishable Perspectives** | The system must strictly distinguish and attribute data from: (a) Educator observations, (b) Student self-reflections, and (c) Parent feedback. | `[MANDATORY PRINCIPLE]` |
| **P-07** | **Zero Child Intelligence Scores** | The platform is strictly prohibited from computing, displaying, or transmitting any composite "Child IQ Score", "Brain Index", or aggregate intelligence number. | `[MANDATORY PRINCIPLE]` |
| **P-08** | **No Public Developmental Rankings** | Zero public scoreboards, class rank lists, or peer comparison leaderboards that could induce shame or performance anxiety. | `[MANDATORY PRINCIPLE]` |
| **P-09** | **Self-Baseline Comparison** | All analytical dashboards and student charts must evaluate child progress strictly against their own prior baseline. | `[MANDATORY PRINCIPLE]` |
| **P-10** | **Privacy & Role-Based Access** | Strictly enforce the Minimum Necessary Data Privacy Principle; protect student PII with authenticated role-based access control (Admin vs Mentor vs Parent). | `[MANDATORY PRINCIPLE]` |

---

## 3. Reconciled Technical Evidence Across Five Core Subsystems

### 3.1 Practice History & Cloud Synchronization (`src/lib/cloudSync.ts`):
* **Source-Code Evidence:**
  - `AttemptRecord` interface collects student name (`userName`), student email (`userEmail`), user ID (`userId`), score, and timestamps (`cloudSync.ts:6-22`). `[VERIFIED IN SOURCE CODE]`
  - Data saved to `localStorage` under `aaa_leaderboard_attempts` with client deduplication (`cloudSync.ts:45-53`). `[VERIFIED IN SOURCE CODE]`
  - Hardcoded URL string: `const CLOUD_SYNC_URL = "https://[REDACTED_CLOUD_BLOB_ENDPOINT]";` (`cloudSync.ts:27`). `[VERIFIED IN SOURCE CODE]`
  - Network requests (`fetch` GET and PUT) pass `Accept: application/json` and `Content-Type: application/json` without client-side authentication headers. `[VERIFIED IN SOURCE CODE]`
* **Runtime & Testing Boundary:** Static code analysis only. Live transmission and remote provider controls were `[NOT TESTED]`. Code logic indicates storage intent, not verified external breach.
* **Provider Documentation Context:** The third-party provider (`jsonblob.com`) offers public REST storage. `[VERIFIED BY PROVIDER DOCUMENTATION]`
* **Controls Present:** Client deduplication; HTTPS transport encryption; error handling isolating network faults. `[VERIFIED IN SOURCE CODE]`
* **Controls Absent in Inspected Scope:** Application authentication headers; automated retention/TTL schedules; user-directed deletion. `[CONTROL NOT FOUND IN INSPECTED SCOPE]`

### 3.2 Leaderboard Display (`src/pages/PracticeHub.tsx:1224-1350`):
* **Source-Code Evidence:**
  - Actively rendered under the "Leaderboard" tab in `PracticeHub.tsx`. `[VERIFIED IN SOURCE CODE]`
  - Exact approved phrasing: *"The inspected component renders identifiable student performance information in the leaderboard UI. Production accessibility and audience-level visibility remain untested."*
  - Distinguishes competitive practice scoreboards from developmental progress rankings.
  - Displays top 3 podium with `userName`, `scorePercentage`, and `timeTakenSeconds`. `[VERIFIED IN SOURCE CODE]`
  - Admin view conditionally renders `{top3[x].userEmail || top3[x].userId}` on the podium (`PracticeHub.tsx:1276, 1298, 1319`). `[VERIFIED IN SOURCE CODE]`
  - Data sourced from client state (`attemptsList`) merged from local storage and cloud sync. `[VERIFIED IN SOURCE CODE]`
* **Controls Present:** Email omitted from standard user DOM nodes via `{isAdmin && ...}`. `[VERIFIED IN SOURCE CODE]`
* **Controls Absent in Inspected Scope:** Parental consent capture for scoreboard display; anonymisation; memory sanitization for non-admin sessions. `[CONTROL NOT FOUND IN INSPECTED SCOPE]`

### 3.3 Access Control & Authorization (`src/lib/accessControl.ts` & `AuthContext.tsx`):
* **Identity Verification:** Client-side 6-digit OTP generation; EmailJS integration if configured; fallback logs simulated OTP to developer console (`console.log`) if keys are unconfigured. `[VERIFIED IN SOURCE CODE]`
* **Client-Side Presentation:** UI locks unassigned levels based on `record.permissions` in `localStorage`. `[VERIFIED IN SOURCE CODE]`
* **Server-Side Authorization Status:** Inspected repository scope contains no custom backend server issuing cryptographic session tokens. `[CONTROL NOT FOUND IN INSPECTED SCOPE]` (Production edge middleware / CDN headers `[NOT TESTED]`).
* **API-Level Protection:** Requests to cloud sync lack bearer tokens. `[CONTROL NOT FOUND IN INSPECTED SCOPE]`
* **Record-Level Controls:** Practice attempts reside in a flat shared array without database row isolation. `[CONTROL NOT FOUND IN INSPECTED SCOPE]`

### 3.4 Browser Storage & Session Persistence (`localStorage` / `sessionStorage`):
* **Stored Keys:** `aaa_current_session`, `aaa_approved_email_access_db`, `aaa_leaderboard_attempts`, `aaa_guest_user`, `email_otp_[email]`. `[VERIFIED IN SOURCE CODE]`
* **Persistence:** `localStorage` persists indefinitely across browser restarts; `sessionStorage` lasts until tab closure. `[VERIFIED IN SOURCE CODE]`
* **Logout Behavior:** `logout()` clears `aaa_current_session` but leaves cached user permissions and attempt records in browser storage. `[VERIFIED IN SOURCE CODE]`
* **Shared-Device Vector:** On shared family or school PCs, cached records remain inspectable in dev tools. `[CONTROL NOT FOUND IN INSPECTED SCOPE]`
* **Retention:** Data accumulates without automated TTL or purging mechanisms. `[CONTROL NOT FOUND IN INSPECTED SCOPE]`

### 3.5 Certificate Generation (`src/lib/certificateGenerator.ts`):
* **Source-Code Evidence:**
  - Client-side vector PDF generation via `jsPDF` triggered on-demand from `PracticeResult.tsx`. `[VERIFIED IN SOURCE CODE]`
  - Random serial number: `AAA-INT-${Math.floor(100000 + Math.random() * 900000)}` generated client-side. `[VERIFIED IN SOURCE CODE]`
  - Signature images loaded from public assets `/signature_neha.png` and `/signature_board.png` with text fallback. `[VERIFIED IN SOURCE CODE]`
  - Header text cites internal institutional wording: *"INTERNATIONAL ABACUS & SPEED MATH OLYMPIAD ACCREDITATION"*. `[VERIFIED IN SOURCE CODE]`
* **Separation of 4 Issuance Authorities:** Practice Drill Records (System-generated), Course Level Completion Certificates (Neha Patil & Academic Board), Competition Participation Certificates (AAA Leadership & Tournament Committee), External Examination Certificates (External Examination Boards).
* **Controls Present:** Performance grade visual formatting based on score threshold (≥75%). `[VERIFIED IN SOURCE CODE]`
* **Controls Absent in Inspected Scope:** Central certificate registry; online verification lookup; duplicate/revocation tracking. `[CONTROL NOT FOUND IN INSPECTED SCOPE]`

---

## 4. Reconciled Architectural Gap Register

| Gap ID | Governance Domain | Current Inspected Implementation | Target BRD Requirement | Classification & Status | Stage 3 Planning Direction |
|---|---|---|---|---|---|
| **GAP-SEC-01** | Cloud Storage Security | Hardcoded third-party storage string (`[REDACTED_CLOUD_BLOB_ENDPOINT]`) without client auth headers. | Secure, authenticated cloud storage enforcing user-level isolation and encrypted persistence. | `[CONTROL NOT FOUND IN INSPECTED SCOPE]` | Evaluate private cloud database options with documented architecture comparison. |
| **GAP-SEC-02** | Leaderboard Privacy & Ethics | Podium renders student names; exposes student emails to admin viewers; no consent recorded. | Private "Personal Speed Milestones" tracking self-progress against own prior baseline. | `[CONTROL NOT FOUND IN INSPECTED SCOPE]` | Re-architect UI to private personal progress tracking; require opt-in for competitions. |
| **GAP-SEC-03** | Server-Side Authorisation | Client-side permission checks; hardcoded root admin whitelist; simulated console OTP fallback. | Authoritative server-side identity verification and role-based API access control. | `[CONTROL NOT FOUND IN INSPECTED SCOPE]` | Specify server-side authorization gateway requirements during Stage 3 architecture. |
| **GAP-SEC-04** | Browser Storage Security | Plaintext `localStorage` caching permissions and attempts; partial logout clearing. | Encrypted local caching, complete logout data purge, and session timeout controls. | `[CONTROL NOT FOUND IN INSPECTED SCOPE]` | Specify secure browser session and cache management rules in Stage 3. |
| **GAP-CERT-01** | Certificate Verification | Client-side pseudo-random serial number (`AAA-INT-xxxxxx`); no central registry; unverified accreditation text. | Central cryptographic certificate ledger backed by verifiable lookup mechanism (e.g., QR code). | `[CONTROL NOT FOUND IN INSPECTED SCOPE]` | Re-label software output as "Practice Records"; architect central registry for formal diplomas. |
| **GAP-DATA-01** | Relational Student Identity | Flat email string in `ApprovedEmailRecord`; cannot link siblings under one parent cleanly. | Relational Parent → Sibling Students with permanent Student ID (`AAA-STU-YYYY-XXXX`). | `[PROPOSED STRATEGY]` | Design relational data model supporting siblings and multi-programme enrollments. |
| **GAP-DATA-02** | Retention & Deletion Policy | Indefinite retention in local storage and remote blob; no automated cleanup or deletion controls. | Automated data lifecycle management, time-based guest purging, and parent-initiated data erasure. | `[CONTROL NOT FOUND IN INSPECTED SCOPE]` | Formulate data retention and deletion specifications addressing potential data-protection compliance gaps requiring legal review. |

---

## 5. Stage 3 Architecture Input Requirements (Technology-Neutral)

The following requirements establish functional specifications for Stage 3 architecture design. **No specific cloud provider, database technology, or authentication library is mandated:**

1. **Secure Identity & Session Management:** The architecture must enforce server-verified authentication, eliminate client-side OTP console logging, and maintain tamper-resistant session credentials.
2. **Authoritative Server-Side Access Control:** All resource access, batch permissions, and administrative capabilities must be authorized by an authoritative server-side gateway.
3. **Data Isolation & Tenant Security:** Storage repositories must enforce strict tenant-level and student-level data isolation, ensuring users cannot access records belonging to other families.
4. **Encrypted Transport & Storage:** All data in transit must mandate modern TLS encryption, and all persistent data at rest must reside in private, authenticated storage repositories.
5. **Parental Consent & Audit Logging:** The system must record immutable, timestamped parental consent logs for digital practice tracking and maintain administrative audit trails.
6. **Data Lifecycle Automation:** The architecture must support automated retention schedules, guest session expiry, and parent-initiated data correction and deletion workflows.
7. **Private Personal Progress Interface:** Practice statistics must be architected as private, self-baseline progress views, eliminating unconsented public competitive scoreboards.
8. **Verifiable Certificate Ledger:** Formal academic level completion certificates must be issued from an authoritative server-side registry with tamper-proof verification mechanisms.

---

## 6. Summary of Governance Status

* **Ten Non-Negotiable Technology Principles:** `[MANAGEMENT APPROVED MANDATE]`
* **Forensic Source-Code Findings (SEC-01 to SEC-04, CERT-01):** `[VERIFIED IN SOURCE CODE]`
* **Reconciled Gap Register:** `[EVIDENCE-BASED AUDIT SPECIFICATION]`
* **Stage 3 Architectural Requirements:** `[PROPOSED STRATEGY — TECHNOLOGY NEUTRAL]`
* **Implementation / Code Modifications:** `[STRICTLY PROHIBITED IN STAGE 2]`
