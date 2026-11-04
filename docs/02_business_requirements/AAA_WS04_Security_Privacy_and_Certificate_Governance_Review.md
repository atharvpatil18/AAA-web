# AAA MASTER BRD — WORKSTREAM 04 (WS-04)
# TECHNICAL SECURITY, PRIVACY & CERTIFICATE GOVERNANCE REVIEW
**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Workstream:** WS-04 — Academic Programmes & Child Development  
**Role:** Lead Business Analyst, Academic Systems Architect & Security Governance Specialist  
**Governance Stage:** Stage 2 — Master Business Requirements Document (BRD) Workshop  
**Document Ref:** `docs/02_business_requirements/AAA_WS04_Security_Privacy_and_Certificate_Governance_Review.md`  
**Date:** November 02, 2026 (Ratified Forensic Baseline)  
**Status:** 🟢 **REVIEW COMPLETE & RATIFIED BY MANAGEMENT — FINDINGS CARRIED FORWARD TO STAGE 3/4**  

---

## 1. Executive Summary

This technical review provides an evidence-based forensic analysis of the practice runtime (`AcademyOS`), data synchronization mechanisms, access control architecture, browser storage, and certificate generation routines discovered in the AAA repository.

In strict accordance with project governance instructions:
* **Evidence-Based Classification Discipline:** Findings rigorously distinguish between source-code implementations, observed runtime behaviors, external provider characteristics, controls identified, controls absent within the inspected scope, and untested vectors.
* **Prohibition of Unverified Exposure Assertions:** The presence of an external URL or client-side logic in the codebase is **not** classified as a confirmed live vulnerability. Live network transmission, production accessibility, and provider-side controls were `[NOT TESTED]`.
* **Legal Phrasing Discipline:** Statutory conclusions regarding the Digital Personal Data Protection (DPDP) Act or other frameworks are strictly avoided based on repository inspection alone. Potential compliance areas are documented as *"Potential data-protection compliance gap requiring legal review."*
* **Strict Redaction Standards:** All endpoint URLs, administrator email addresses, asset filenames, and access secrets are presented using redacted references (e.g., `[REDACTED_CLOUD_BLOB_ENDPOINT]`, `[REDACTED_ADMIN_EMAIL]`).
* **Zero Implementation:** No application code, configurations, data models, or stored records have been altered.

---

## 2. Evidence Classification Taxonomy

Every technical observation in this review is classified using one of the seven approved governance tags:
1. `[VERIFIED IN SOURCE CODE]` — Confirmed through line-by-line inspection of repository source code.
2. `[VERIFIED IN AUTHORISED RUNTIME TEST]` — Confirmed through non-intrusive local runtime observation.
3. `[VERIFIED BY PROVIDER DOCUMENTATION]` — Grounded in official third-party vendor technical documentation.
4. `[CONTROL NOT FOUND IN INSPECTED SCOPE]` — Control mechanism is not evident in the inspected codebase.
5. `[NOT TESTED]` — Vector was not executed or probed, in compliance with testing boundaries.
6. `[REQUIRES AUTHORISED SECURITY VALIDATION]` — Technical verification requiring formal management authorization.
7. `[MANAGEMENT DECISION REQUIRED]` — Governance policy choice requiring executive determination.

---

## 3. Forensic Analysis of Priority Technical Findings

### 3.1 Finding SEC-WS04-01: Cloud Data Handling & Student Practice Records

#### A. Source-Code Evidence:
* **Data Fields Collected & Constructed:** The `AttemptRecord` interface (`src/lib/cloudSync.ts:6-22`) defines the data schema assembled during practice drills:
  - `userName: string` (Student name)
  - `userEmail: string` (Student email address)
  - `userId: string` (User identifier, mapped to email)
  - `setId: string`, `setTitle: string`, `category: string`, `level: string`, `mode: string`
  - `totalQuestions: number`, `correctCount: number`, `wrongCount: number`, `unansweredCount: number`
  - `scorePercentage: number`, `timeTakenSeconds: number`, `completedAt: string` (ISO timestamp)
  *Classification:* `[VERIFIED IN SOURCE CODE]` (`src/lib/cloudSync.ts:6-22`)
* **Local Storage Serialization:** Attempts are serialized as JSON and stored in browser `localStorage` under `LOCAL_STORAGE_KEY = "aaa_leaderboard_attempts"` (`src/lib/cloudSync.ts:24, 36, 53`). *Classification:* `[VERIFIED IN SOURCE CODE]`
* **Client-Side Deduplication:** `cloudSync.ts:45-50` deduplicates local attempts by matching `completedAt` and lowercase email strings. *Classification:* `[VERIFIED IN SOURCE CODE]`
* **Remote Endpoint URL String:** A third-party JSON storage endpoint string is hardcoded in the script:
  `const CLOUD_SYNC_URL = "https://[REDACTED_CLOUD_BLOB_ENDPOINT]";` (`src/lib/cloudSync.ts:27`). *Classification:* `[VERIFIED IN SOURCE CODE]`
* **Network Request Construction:**
  - `saveStudentAttempt` constructs an HTTPS `GET` request to fetch existing cloud attempts, appends the new record if not duplicate, and constructs an HTTPS `PUT` passing `{ attempts: cloudAttempts }` (`src/lib/cloudSync.ts:58-79`).
  - Request headers configured: `Accept: "application/json"` and `Content-Type: "application/json"`.
  - **No `Authorization` header, API key, bearer token, or custom signature** is included in the request payload within the inspected source code. *Classification:* `[VERIFIED IN SOURCE CODE]`
* **Data Retrieval Flow:** `syncStudentAttempts` (`src/lib/cloudSync.ts:88-115`) requests the entire array from the endpoint on component mount in `PracticeHub.tsx:376`. *Classification:* `[VERIFIED IN SOURCE CODE]`
* **Network Failure Handling:** Wrapped in `try/catch` blocks logging `console.warn("Cloud sync backup warning:", e)` without interrupting local practice UI. *Classification:* `[VERIFIED IN SOURCE CODE]`

#### B. Runtime & Network Boundary Discipline:
* Static repository analysis only. In strict compliance with governance boundaries, **no network requests were initiated to the remote endpoint**, and no live payloads were transmitted, captured, or intercepted. Live external transmission and remote provider responsiveness were `[NOT TESTED]`.

#### C. External Provider Behaviour Independently Established:
* The domain in `CLOUD_SYNC_URL` corresponds to `jsonblob.com`, a public web service for storing and sharing JSON blobs.
* Public vendor documentation indicates that blobs created without private keys are accessible and modifiable by any party possessing the blob identifier. *Classification:* `[VERIFIED BY PROVIDER DOCUMENTATION]`

#### D. Controls Found in Inspected Scope:
1. Transport Layer Security: HTTPS (TLS encrypted over port 443) is enforced by the hardcoded URL scheme. *Classification:* `[VERIFIED IN SOURCE CODE]`
2. Local Deduplication: Timestamp and email matching logic prevents duplicate entries locally. *Classification:* `[VERIFIED IN SOURCE CODE]`
3. Exception Isolation: Network failures do not crash the practice interface. *Classification:* `[VERIFIED IN SOURCE CODE]`

#### E. Controls Not Found in Inspected Scope:
1. Application-Level Authentication: No API keys, tokens, or credentials passed in HTTP request headers. *Classification:* `[CONTROL NOT FOUND IN INSPECTED SCOPE]`
2. Retention / Expiry Controls: No automated time-to-live (TTL) or data purging logic in code. *Classification:* `[CONTROL NOT FOUND IN INSPECTED SCOPE]`
3. Deletion Mechanisms: No endpoint or function exists for students or parents to delete historical records. *Classification:* `[CONTROL NOT FOUND IN INSPECTED SCOPE]`
4. Privacy Notice & Consent: No disclosure in website forms that attempt records are synchronized to an external third-party storage service. *Classification:* `[CONTROL NOT FOUND IN INSPECTED SCOPE]`

#### F. Tests Not Performed:
* Did not probe the external URL to verify active accessibility, responsiveness, or current contents.
* Did not test whether the remote provider enforces undocumented IP restrictions, rate limits, or access controls.

#### G. Further Authorised Validation Required:
* Administrative confirmation of whether the endpoint is currently in active operational use.
* Security review of target private cloud database architectures for Stage 3. *Classification:* `[MANAGEMENT DECISION REQUIRED]`

---

### 3.2 Finding SEC-WS04-02: Leaderboard Rendering & Personal Information

#### A. Source-Code Evidence:
* **Component Rendering:** Rendered exclusively within `src/pages/PracticeHub.tsx` (lines 1224–1350) when the UI state `hubTab === "leaderboard"`.
* **Exact Phrasing Benchmark:**  
  > *"The inspected component renders identifiable student performance information in the leaderboard UI. Production accessibility and audience-level visibility remain untested."*
* **Distinction Between Competitive Scoreboards and Developmental Rankings:**
  - *Competitive Practice Scoreboards:* Designed for timed drill competitions, displaying fastest completions and accuracy scores.
  - *Developmental Progress Rankings:* Comparative peer ranking in developmental education, which contradicts the core AAA principle of evaluating children strictly against their own prior baseline.
* **User Reachability:**
  - Route `/practice` checks `if (!currentUser && !localStorage.getItem("aaa_guest_user"))` (`PracticeHub.tsx:288`).
  - Unauthenticated visitors can establish a guest session via `GuestSampleGatewayModal.tsx`, which writes `aaa_guest_user` to `localStorage`.
  - Any user with a registered account or guest session can navigate to the "Leaderboard" tab. *Classification:* `[VERIFIED IN SOURCE CODE]`
* **Personal Fields Displayed to Standard Users / Guests:**
  - `userName` (student name string passed in attempt record)
  - `scorePercentage` (numerical score)
  - `timeTakenSeconds` (formatted as minutes and seconds)
  - Placement badge (1st Champion, 2nd, 3rd) (`PracticeHub.tsx:1273, 1295, 1317`). *Classification:* `[VERIFIED IN SOURCE CODE]`
* **Personal Fields Displayed to Administrators:**
  - When `isUserAdmin(currentUser?.email)` evaluates to true, the UI conditionally renders:
    ```tsx
    {isAdmin && (
      <span className="text-[10px] font-mono font-bold text-vibrant-teal block line-clamp-1">
        {top3[x].userEmail || top3[x].userId}
      </span>
    )}
    ```
    rendered beneath the 1st, 2nd, and 3rd place podium positions (`PracticeHub.tsx:1276, 1298, 1319`). *Classification:* `[VERIFIED IN SOURCE CODE]`
* **Data Sourcing:** Sourced from `attemptsList` state, which loads from `localStorage.getItem("aaa_leaderboard_attempts")` and merges results from `syncStudentAttempts()` (`PracticeHub.tsx:358-381`). *Classification:* `[VERIFIED IN SOURCE CODE]`
* **Client Memory Footprint:** The entire `AttemptRecord` object (including `userEmail` and `userId`) resides in client-side React state, accessible via browser developer tools to any user on that machine. *Classification:* `[VERIFIED IN SOURCE CODE]`

#### B. Runtime & Production Visibility Boundary:
* Static code verification. Non-admin vs admin rendering behavior was verified through code inspection. Live multi-account session rendering, production audience traffic, and live accessibility remain `[NOT TESTED]`.

#### C. Controls Found in Inspected Scope:
1. Conditional Admin Display: Student email strings are omitted from standard user DOM nodes via `{isAdmin && ...}` checks. *Classification:* `[VERIFIED IN SOURCE CODE]`
2. Mock Data Filtering: Attempts with `userId` starting with `"mock_"` are filtered out (`PracticeHub.tsx:368, 377`). *Classification:* `[VERIFIED IN SOURCE CODE]`

#### D. Controls Not Found in Inspected Scope:
1. Parental Consent Capture: No opt-in consent record authorising public display of student names on scoreboards. *Classification:* `[CONTROL NOT FOUND IN INSPECTED SCOPE]`
2. Anonymisation: Student names are displayed in plain text without pseudonymisation or masking. *Classification:* `[CONTROL NOT FOUND IN INSPECTED SCOPE]`
3. Client State Sanitisation: Email strings are not stripped from the client `attemptsList` array before reaching non-admin browser memory. *Classification:* `[CONTROL NOT FOUND IN INSPECTED SCOPE]`

#### E. Further Authorised Validation Required:
* Management policy determination regarding whether competitive practice scoreboards should be retired in favor of private self-baseline progress tracking. *Classification:* `[MANAGEMENT DECISION REQUIRED]`

---

### 3.3 Finding SEC-WS04-03: Authentication & Authorisation Boundaries

To maintain rigorous architectural discipline, five distinct dimensions of access control are separated:

#### 1. Identity Verification:
* **Email OTP:** `sendEmailOTP` (`src/lib/AuthContext.tsx:52-141`) checks if entered email exists in `APPROVED_EMAILS_KEY` or `getAllApprovedRecords()`.
  - Generates a 6-digit random code client-side (`Math.floor(100000 + Math.random() * 900000)`).
  - Stores OTP in `sessionStorage.setItem("email_otp_" + email, generatedOTP)`.
  - If EmailJS environment variables (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_PUBLIC_KEY`) are configured, sends email via `https://api.emailjs.com`.
  - **Priority Design Finding (Simulated OTP Fallback):** If EmailJS configuration is missing, lines 138-139 execute:
    `console.log("EmailJS keys not configured. Local simulated Email OTP code is:", generatedOTP);`
    allowing authentication completion by reading browser developer console. *Classification:* `[VERIFIED IN SOURCE CODE]`
* **Google OAuth:** `loginWithGoogleCredential` (`src/lib/AuthContext.tsx:185-235`) decodes Google JWT client-side using `jwtDecode`. Matches email against pre-approved database. *Classification:* `[VERIFIED IN SOURCE CODE]`

#### 2. Client-Side Presentation Controls:
* `checkUserAccess` (`src/lib/accessControl.ts:133-216`) evaluates course, level, and feature (`quiz` vs `learn`) permissions by reading `localStorage.getItem("aaa_approved_email_access_db")`. UI locks unassigned levels. *Classification:* `[VERIFIED IN SOURCE CODE]`

#### 3. Server-Side Authentication:
* Findings are strictly limited to the inspected repository scope. The repository contains no custom backend API server (e.g., Node/Express, Python/FastAPI) or serverless functions validating user sessions on API routes.
* Remote service integrations inspected: `https://api.emailjs.com`, `https://[REDACTED_CLOUD_BLOB_ENDPOINT]`, Google Identity Services. None issue or validate custom session cookies for AAA routes. *Classification:* `[CONTROL NOT FOUND IN INSPECTED SCOPE]`
* Note: Production hosting infrastructure (e.g. edge middleware, CDN headers) was `[NOT TESTED]`.

#### 4. API-Level Protection:
* In the inspected codebase, network calls from `cloudSync.ts` do not pass authorization tokens, bearer headers, or signature keys. *Classification:* `[CONTROL NOT FOUND IN INSPECTED SCOPE]`

#### 5. Record-Level Data Isolation:
* Storage mechanisms evaluated in repository code do not enforce student-level data segregation at the database layer. All attempts are merged into a shared array. *Classification:* `[CONTROL NOT FOUND IN INSPECTED SCOPE]`

---

### 3.4 Finding SEC-WS04-04: Browser Storage, Session Persistence & Device Exposure

#### A. Stored Data Keys & Content:
Inspection of `src/lib/AuthContext.tsx`, `src/lib/accessControl.ts`, and `src/lib/cloudSync.ts` identifies five primary storage keys:
1. `aaa_current_session` (`localStorage`): Stores JSON object of authenticated user (`email`, `name`, `role`, `loginAt`).
2. `aaa_approved_email_access_db` (`localStorage`): Caches entire user permission database, including all approved student emails, assigned courses, allowed levels, and feature flags.
3. `aaa_leaderboard_attempts` (`localStorage`): Caches array of student practice attempt records (names, emails, scores, timestamps).
4. `aaa_guest_user` (`localStorage`): Boolean/string flag establishing unauthenticated guest practice session.
5. `email_otp_[email]` (`sessionStorage`): Stores the generated 6-digit OTP code for pending sign-in.

#### B. Persistence Characteristics:
* Keys in `localStorage` persist indefinitely across browser sessions, tab closures, and computer reboots until programmatically cleared or manually flushed by the user.
* Keys in `sessionStorage` persist for the lifetime of the specific browser tab.

#### C. Logout Behavior:
* Inspection of `logout()` in `src/lib/AuthContext.tsx:242-248` reveals that signing out removes `aaa_current_session`.
* However, `aaa_approved_email_access_db` and `aaa_leaderboard_attempts` **remain cached in browser `localStorage`** after logout.

#### D. Shared-Device Exposure:
* On shared devices (e.g. family home PC, school computer, library device), subsequent users opening the browser can access cached historical records, student names, and emails via browser developer tools or application state.

#### E. Permission Restoration & Tampering Considerations:
* Because level and feature access permissions are evaluated client-side from `localStorage.getItem("aaa_approved_email_access_db")`, client-side script modification or manual `localStorage` editing could theoretically restore or grant access on that local client.

#### F. Unnecessary Data Retention:
* Historical practice records and cached access lists accumulate indefinitely without automated TTL expiration, cache invalidation, or periodic purging.

---

### 3.5 Finding CERT-WS04-01: Certificate Governance & Credential Integrity

#### A. Source-Code Evidence:
* **Generation Engine:** Implemented in `src/lib/certificateGenerator.ts` using client-side `jsPDF`. Triggered on-demand when user clicks "Download Achievement Certificate" on `PracticeResult.tsx:327`. *Classification:* `[VERIFIED IN SOURCE CODE]`
* **Serial Number Generation:**
  `AAA-INT-${Math.floor(100000 + Math.random() * 900000)}` (`src/lib/certificateGenerator.ts:163`).
  Generated via client-side `Math.random()`, producing a newly randomized serial number on every download. *Classification:* `[VERIFIED IN SOURCE CODE]`
* **Central Registry Status:** No database table, API route, or central verification ledger records generated certificate serial numbers in the inspected codebase. *Classification:* `[CONTROL NOT FOUND IN INSPECTED SCOPE]`
* **Signature Asset Handling:** Loads `/signature_neha.png` and `/signature_board.png` from public web directory via `getBase64FromUrl` (`src/lib/certificateGenerator.ts:54-56`). Text fallback renders if images fail. *Classification:* `[VERIFIED IN SOURCE CODE]`

#### B. Accreditation Wording Status:
* Header text citing *"INTERNATIONAL ABACUS & SPEED MATH OLYMPIAD ACCREDITATION"* is an internal institutional naming convention.
* Status: **Kept pending documentary verification.** No external statutory accreditation document is currently attached to the repository.

#### C. Separation of Four Distinct Certificate Issuance Authorities:
To establish academic rigor, four distinct certificate categories and authorities must be maintained:
1. **Category 1: Practice Drill Records:** Automated drill feedback, system-generated by AcademyOS template upon quiz completion. Conveys drill effort; does NOT confer course graduation.
2. **Category 2: Course Level Completion Certificates:** Formal academic diploma, signed by **Neha Patil (Academic Director)** and Academic Examination Board upon completion of full workbook, summative assessment, and educator sign-off.
3. **Category 3: Competition Participation Certificates:** Tournament recognition, issued by **Arnav Abacus Academic Board / Event Organising Committee** for verified participation in regional, state, or national competitions.
4. **Category 4: External Examination Certificates:** Independent credentials, issued directly by **Authorised External Assessment Boards** (e.g., IPM Institute, Science Olympiad Foundation) following external evaluations.

---

## 4. Preliminary Risk Ratings Framework

> [!IMPORTANT]
> **Preliminary Assessment Notice:**  
> All P1/P2/P3 ratings documented below are **preliminary assessments pending confirmation of likelihood, impact, exposure, population, controls, and residual risk**. They reflect codebase analysis and do not represent confirmed production breach events.

| Finding Ref | Vulnerability / Governance Vector | Preliminary Rating | Evaluated Likelihood | Evaluated Potential Impact | Observed Scope of Exposure | Affected Population | Inspected Controls Present | Residual Risk Level |
|---|---|:---:|---|---|---|---|---|---|
| **SEC-WS04-01** | Cloud Data Sync via Public Third-Party Storage String | **P1 (Preliminary)** | Medium (requires knowledge of blob ID) | High (student name, email, scores accessible if queried) | Third-party cloud storage service | Students completing online practice | TLS transport encryption; client-side deduplication | High (pending private DB remediation) |
| **SEC-WS04-02** | Identifiable Student Information in Leaderboard UI | **P2 (Preliminary)** | High (rendered in UI for authenticated/guest users) | Medium (peer visibility of child names/scores) | Client React UI & state memory | Top-scoring practice participants | Emails hidden from non-admin DOM; mock data filtered | Medium (pending private self-baseline UI) |
| **SEC-WS04-03** | Client-Side Access Control & Console OTP Fallback | **P1 (Preliminary)** | Low (requires dev console access & unconfigured EmailJS) | High (unauthorized bypass of level access controls) | Client browser session | Enrolled practice users | Pre-approved email whitelist gate in client | High (pending server-side auth gateway) |
| **SEC-WS04-04** | Plaintext Browser Storage & Indefinite Retention | **P2 (Preliminary)** | Medium (shared or public devices) | Medium (exposure of cached student emails and scores) | Local client `localStorage` | Users on shared/family computers | Session token cleared on logout | Medium (pending cache encryption & TTL) |
| **CERT-WS04-01** | Unregistered Certificate Generation & Public Signatures | **P2 (Preliminary)** | High (client script generates PDF on click) | Medium (institutional credibility & verification risk) | Client-side jsPDF runtime | Students downloading drill certificates | Visual performance tier threshold (≥75%) | Medium (pending central ledger & QR verification) |

---

## 5. Reconciled Technical Evidence Matrix

| Finding Ref | File Path & Line Reference | Evidence Description | Classification | Limitation / Testing Boundary |
|---|---|---|---|---|
| **EVD-01** | `src/lib/cloudSync.ts:6-22` | `AttemptRecord` interface includes `userName`, `userEmail`, `userId`, score, and timestamps. | `[VERIFIED IN SOURCE CODE]` | Confirms code schema; live payload transmission not tested. |
| **EVD-02** | `src/lib/cloudSync.ts:27` | Hardcoded remote URL pointing to third-party public storage service. | `[VERIFIED IN SOURCE CODE]` | URL verified in code; live endpoint accessibility not probed. |
| **EVD-03** | `src/lib/cloudSync.ts:58-79` | Unauthenticated `fetch` GET and PUT operations transferring practice attempts. | `[VERIFIED IN SOURCE CODE]` | Request logic verified in code; network execution not tested. |
| **EVD-04** | `src/pages/PracticeHub.tsx:1224-1350` | Leaderboard tab renders student names, scores, times, and admin-conditional emails. | `[VERIFIED IN SOURCE CODE]` | Component logic verified; live multi-user rendering not tested. |
| **EVD-05** | `src/lib/AuthContext.tsx:138-139` | Unconfigured EmailJS triggers console.log simulated OTP fallback. | `[VERIFIED IN SOURCE CODE]` | Fallback verified in code; live EmailJS gateway response not tested. |
| **EVD-06** | `src/lib/accessControl.ts:11-14` | Hardcoded root administrator email whitelist in client script. | `[VERIFIED IN SOURCE CODE]` | Whitelist verified in code; server-side bypass not tested. |
| **EVD-07** | `src/lib/certificateGenerator.ts:163` | Client-side pseudo-random serial number (`AAA-INT-xxxxxx`). | `[VERIFIED IN SOURCE CODE]` | Algorithm verified in code; PDF visual output verified via inspection. |
| **EVD-08** | `src/lib/certificateGenerator.ts:54-56` | Digitized signature images loaded from public web assets directory. | `[VERIFIED IN SOURCE CODE]` | Asset loading verified; physical authorization documents pending audit. |
| **EVD-09** | `src/lib/AuthContext.tsx:242-248` | `logout()` removes `aaa_current_session` but leaves other keys in `localStorage`. | `[VERIFIED IN SOURCE CODE]` | Local storage state verified; multi-user workstation impact not tested. |

---

## 6. Additional Privacy & Governance Gap Register

| Gap ID | Governance Domain | Evidence Found in Repository | Missing Evidence / Undocumented Area | Risk & Governance Implication | Validation Owner Required |
|---|---|---|---|---|---|
| **GAP-01** | Browser Storage Security | Practice attempts, sessions, and permissions stored in plaintext `localStorage`. | No client-side encryption, integrity hashing, or post-logout data clearing. | Sensitive records accessible to scripts or shared-device users; potential data-protection compliance gap requiring legal review. | Solution Architect [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] |
| **GAP-02** | Guest vs. Student Identity | Guest accounts created via simple modal without email verification. | No linkage or segregation between guest practice telemetry and enrolled student records. | Cloud storage accumulates unverified records; fragmented student history. | Nitin Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] |
| **GAP-03** | Identity Relational Integrity | Students identified solely by flat email string. | No relational parent-child entity structure; cannot link siblings cleanly. | Identity collisions if parents share an email for multiple enrolled children. | Solution Architect [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] |
| **GAP-04** | Parent Consent & Privacy Notices | General lead form disclaimer present on public website. | No specific opt-in consent for digital practice tracking or cloud synchronization. | Potential data-protection compliance gap requiring legal review. | Management / Legal [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] |
| **GAP-05** | Data Retention & Purging Schedule | Indefinite retention in local storage and remote blob. | No documented data retention policy or automated cleanup schedules. | Accumulation of stale student PII; potential data-protection compliance gap requiring legal review. | Management [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] |
| **GAP-06** | Certificate Authority & Revocation | Client-generated PDF with fixed signatures. | No policy or mechanism for revoking compromised or erroneously issued certificates. | Institutional credibility risk if inaccurate certificates cannot be verified or voided. | Neha Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] |
| **GAP-07** | Parent Data Correction / Erasure | Informal verbal requests only. | No documented administrative workflow for handling parental data deletion or correction. | Potential data-protection compliance gap requiring legal review. | Nitin Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] |

---

## 7. Stage 3 Architecture Inputs (Requirements Only — Technology Neutral)

The following specifications govern future system design in Stage 3. **No specific database, cloud vendor, or authentication library is mandated at this stage:**

1. **Secure Student Identity & Authentication:** The system must implement robust identity verification supporting multi-factor or cryptographic authentication, with secure session management and elimination of client-side OTP console logging.
2. **Server-Side Authorisation Gateway:** All access permissions, course enrollments, and administrative privileges must be validated by an authoritative server-side service prior to granting access to data or functionality.
3. **Student-Specific Record Segregation:** The data storage architecture must enforce strict tenant and student-level data isolation, guaranteeing that an enrolled student or parent can only access their own practice records.
4. **Secure Data Transmission & Storage:** All practice and student data in transit must enforce modern transport layer encryption (TLS 1.3), and all persistent data at rest must be stored in secure, private, authenticated storage repositories with private access keys.
5. **Parent Consent & Privacy Notice Management:** The digital portal must maintain an immutable, auditable log of parental consent, timestamping when privacy terms and practice data processing were authorized.
6. **Data Lifecycle Automation:** The architecture must incorporate automated data lifecycle management, including time-based purging of unverified guest attempts, secure archival, and parent-initiated data correction and deletion ("Right to be Forgotten").
7. **Private Personal Progress Tracking:** Student practice analytics must be presented exclusively as private, self-baseline progress records, eliminating public competitive rankings unless explicit, documented opt-in consent is obtained for sanctioned tournaments.
8. **Verifiable Certificate Ledger:** Academic completion certificates must be generated from an authoritative server-side registry that assigns cryptographically verifiable serial numbers backed by an online verification lookup mechanism (e.g., secure QR code).
9. **Administrative Audit Trails:** All administrative modifications to student permissions, course levels, attendance records, and certificates must be logged in an immutable, append-only audit trail recording user identity, timestamp, and action details.

---

## 8. Summary of Governance Status

* **Forensic Evidence Findings (SEC-01 to SEC-04, CERT-01):** `[RECONCILED AUDIT FINDINGS]`
* **Classification Taxonomy:** `[CORRECTED & APPLIED CONSISTENTLY]`
* **Preliminary Risk Ratings:** `[PRELIMINARY ASSESSMENTS PENDING VALIDATION]`
* **Stage 3 Architectural Requirements:** `[PROPOSED STRATEGY — TECHNOLOGY NEUTRAL]`
* **Management Decision Register Items:** `[ALL 12 DECISIONS MARKED NOT APPROVED]`
* **Implementation / Code Changes:** `[STRICTLY PROHIBITED IN STAGE 2]`
