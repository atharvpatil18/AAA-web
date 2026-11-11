# AAA MASTER BRD — WORKSTREAM 04 (WS-04)
# OPEN INFORMATION & EVIDENCE REGISTER
**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Role:** Lead Business Analyst, Academic Systems Architect & Security Governance Specialist  
**Governance Stage:** Stage 2 — Master Business Requirements Document (BRD) Workshop  
**Document Ref:** `docs/02_business_requirements/AAA_WS04_Open_Information_and_Evidence_Register.md`  
**Date:** November 02, 2026 (Ratified Baseline)  
**Status:** 🟢 **WORKSTREAM RATIFIED & CLOSED — OPEN ITEMS CARRIED FORWARD AS GOVERNANCE DEPENDENCIES**  

---

## 1. Purpose & Governance Classification Taxonomy

This register catalogs all academic requirements, codebase discoveries, operational assumptions, documentary verification records, and privacy/governance investigation items for Workstream 04.

Every entry is strictly classified under the approved seven-tier taxonomy:
1. `[MANAGEMENT CONFIRMED]` — Formally confirmed by AAA management.
2. `[EXISTING DOCUMENTED PRACTICE]` — Documented in operational records or historical center documentation.
3. `[VERIFIED IN SOURCE CODE]` — Confirmed through line-by-line inspection of repository source code.
4. `[HISTORICAL REFERENCE]` — Earlier website copy or marketing statement pending empirical verification.
5. `[PROPOSED STRATEGY]` — Formulated recommendation awaiting formal management validation.
6. `[CONTROL NOT FOUND IN INSPECTED SCOPE]` — Control mechanism is not evident in inspected codebase.
7. `[PENDING VALIDATION]` — Open item requiring empirical timetable, census, or curriculum audit.

> [!CAUTION]
> **Source-Code vs Classroom Practice Boundary:**  
> A capability verified in source code (`[VERIFIED IN SOURCE CODE]`) must **never** be cited as proof of actual day-to-day classroom delivery without separate educator confirmation. All sensitive security findings are cross-referenced to `docs/02_business_requirements/AAA_WS04_Security_Privacy_and_Certificate_Governance_Review.md` using redacted references.

---

## 2. Academic & Technical Requirements Inventory

| Req ID | Academic / Technical Requirement Description | Evidence / Codebase Source | Current Classification | Academic / Business Impact | Validation Owner Status | Open Question | Decision Ref |
|---|---|---|---|---|---|---|---|
| **REQ-WS04-01** | Six-Programme Master Offering Architecture | `src/data.ts`, `src/pages/Programs.tsx` | `[MANAGEMENT CONFIRMED for mission; PENDING VALIDATION for timetable]` | Critical | Neha Patil & Nitin Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Can physical center timetable accommodate all 6 offerings concurrently? | DEC-WS04-01 |
| **REQ-WS04-02** | Reconciled Programme Age Brackets (Abacus 4.5–9, Vedic 9–14, Mental 6–14, School Gr 1–10, IPM Gr 2–7, Olympiad Gr 2–9) | `src/data.ts:13,35,57,79,101`, `Program*.tsx` | `[PENDING VALIDATION]` | High | Neha Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Formal sign-off on 4.5–9 Abacus primary bracket and remedial exception policy. | DEC-WS04-02 |
| **REQ-WS04-03** | Abacus Practice Modules (`JR-0` to `JR-3`, `SR-1` to `SR-10`) vs. Eight-Level Academic Programme | `src/data/practiceData.ts:9-1400`, `PracticeHub.tsx:55-111` | `[VERIFIED IN SOURCE CODE for software; HISTORICAL REFERENCE for 8 levels]` | High | Neha Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | How do the 14 practice modules map to the formal eight academic levels? | DEC-WS04-03 |
| **REQ-WS04-04** | Vedic Practice Suites (`JVM-1`, `SVM-0` to `SVM-6`) vs. Academic Levels | `src/data/practiceData.ts:1401+`, `PracticeHub.tsx:22-54` | `[VERIFIED IN SOURCE CODE for software; PENDING VALIDATION for levels]` | High | Neha Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Are the 8 Vedic practice suites delivered as 8 independent academic levels? | DEC-WS04-03 |
| **REQ-WS04-05** | The AAA Learning Model™ 6-Stage Lesson Plan Consistency | Approved brand positioning; Stage 1 files | `[MANAGEMENT APPROVED for philosophy; PENDING VALIDATION for consistency]` | Critical | Neha Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Are standardized 1-page lesson plans currently documented for all batches? | DEC-WS04-04 |
| **REQ-WS04-06** | Twelve Core Mathematical Competencies Framework | Academic literature; WS-04 discovery | `[PROPOSED STRATEGY]` | Medium | Neha Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Formal adoption of competency tracking across student portfolios. | DEC-WS04-05 |
| **REQ-WS04-07** | Eight Approved Child Development Pillars with Non-Diagnostic Safeguards | Discovered brand documentation; Stage 1 files | `[MANAGEMENT CONFIRMED for names; PROPOSED STRATEGY for rubrics]` | Critical | Neha Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Ensure all marketing copy avoids claiming guaranteed cognitive improvements. | DEC-WS04-06 |
| **REQ-WS04-08** | Multi-Layer Assessment Architecture & Blueprint Calibration | Practice test evaluation rules in code | `[PROPOSED STRATEGY / PENDING VALIDATION]` | High | Neha Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Confirm formal passing mark required before awarding Level Certificate. | DEC-WS04-07 |
| **REQ-WS04-09** | Course Level Certificate Issuance vs Practice Drill Certificate (CERT-WS04-01) | `src/lib/certificateGenerator.ts` (jsPDF) | `[VERIFIED IN SOURCE CODE for practice; PROPOSED STRATEGY for academic]` | High | Nitin Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Link authorized academic certificate generation with permanent Student ID in AcademyOS. | DEC-WS04-07 |
| **REQ-WS04-10** | Micro-Batch Integrity (Maximum 5 Students Per Batch) | Ratified decision DEC-WS02-05 | `[MANAGEMENT CONFIRMED]` | Non-negotiable | Neha Patil & Nitin Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Ensure batch timetable strictly enforces 5-student ceiling without exception. | DEC-WS04-11 |
| **REQ-WS04-11** | Bi-Monthly Qualitative Parent Progress Reporting | Ratified decision DEC-WS03-05 | `[MANAGEMENT APPROVED AS FRAMEWORK]` | Critical | Neha Patil & Nitin Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Operational schedule for bi-monthly 10-minute parent chats across 87+ students. | DEC-WS04-08 |
| **REQ-WS04-12** | Ten Permanent AcademyOS Technology Principles | `AGENTS.md` and WS-04 analysis | `[MANDATORY PRINCIPLE / PROPOSED STRATEGY]` | Critical | Solution Architect [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Ensure future backend refactoring respects immutable history and Student ID rules. | DEC-WS04-10 |
| **REQ-WS04-13** | Documentary Verification of Educator Credentials (VER-01) | Historical reference to MCA and Vedic certificates | `[PENDING VALIDATION for documentary linkage]` | High | Neha Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Physical copies of degree and certification documents to be scanned and attached. | VER-01 |
| **REQ-WS04-14** | Active Student Census (>87) and Batch Count (>14) Audit | Operational management estimate | `[PENDING VALIDATION for exact census]` | High | Nitin Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Exact audited count of currently paying students and active weekly batches. | DEP-01 |
| **REQ-WS04-15** | Cloud Sync Storage Remediation (SEC-WS04-01) | `src/lib/cloudSync.ts:27` | `[VERIFIED IN SOURCE CODE]` | Critical | Solution Architect [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Replace unauthenticated public `[REDACTED_CLOUD_BLOB_ENDPOINT]` with private DB. | DEC-WS04-10 |
| **REQ-WS04-16** | Leaderboard Public Ranking Remediation (SEC-WS04-02) | `src/pages/PracticeHub.tsx:1224+` | `[VERIFIED IN SOURCE CODE]` | Critical | Solution Architect [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Convert public leaderboard into private self-baseline progress tracker. | DEC-WS04-10 |
| **REQ-WS04-17** | Server-Side Authentication & Session Authorization (SEC-WS04-03) | `src/lib/accessControl.ts`, `AuthContext.tsx` | `[CONTROL NOT FOUND IN INSPECTED SCOPE]` | High | Solution Architect [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Implement authoritative server-side session authorization on API layer. | DEC-WS04-10 |
| **REQ-WS04-18** | Programme-Wise Home Practice Framework (10–15 mins/day) | International Soroban & math standards | `[PROPOSED STRATEGY]` | Medium | Neha Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] | Formal adoption of programme-specific home practice recommendations. | DEC-WS04-12 |

---

## 3. Additional Privacy & Governance Questions Register

The following seven governance areas are documented based on repository inspection without asserting unverified vulnerabilities:

| Ref ID | Privacy & Governance Focus Area | Evidence Found in Repository | Missing Evidence / Undocumented Area | Risk & Governance Implication | Proposed Validation Owner |
|---|---|---|---|---|---|
| **GOV-01** | **Browser Storage & Cached Student Data** | `localStorage` actively caches `aaa_current_session`, `aaa_approved_email_access_db`, and `aaa_leaderboard_attempts`; `sessionStorage` caches `email_otp_[email]`. | No encryption at rest for client browser storage; no tamper-detection hash; partial logout clearing leaves permissions and attempts cached. | If a shared family computer or school device is used, cached records can be inspected in browser storage; potential data-protection compliance gap requiring legal review. | Solution Architect [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] |
| **GOV-02** | **Guest vs. Registered Student Identity** | `GuestSampleGatewayModal.tsx` creates temporary sessions without email verification; records saved alongside enrolled students. | No mechanism to distinguish guest attempt telemetry from enrolled academic records in cloud sync. | Cloud storage accumulates unverified guest records, inflating practice datasets with transient data. | Nitin Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] |
| **GOV-03** | **Student Identity Integrity & Record Association** | Students are identified exclusively by flat email strings in `ApprovedEmailRecord`. | No relational mapping between parent account, sibling students, and multi-programme enrollments. | Siblings sharing a parent email risk record collisions and overwrites in level tracking. | Solution Architect [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] |
| **GOV-04** | **Parent Consent & Privacy Notice Evidence** | Basic disclaimer on marketing lead capture forms (`LeadForm.tsx`). | No specific parental consent checkbox or notice regarding digital practice logging or cloud synchronization. | Potential data-protection compliance gap requiring legal review. | Management / Legal [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] |
| **GOV-05** | **Data Inventory & Retention Schedule** | Practice attempts and access lists persist indefinitely in local storage and remote blob. | No documented data retention policy, archival schedule, or automated data purge logic. | Indefinite accumulation of children's educational records; potential data-protection compliance gap requiring legal review. | Management [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] |
| **GOV-06** | **Certificate Approval & Revocation Authority** | Client-side jsPDF script (`certificateGenerator.ts`) prints digitized signatures on demand. | No administrative approval gate, physical dispatch ledger, or revocation workflow. | Risk of unauthorized certificate generation if client script is triggered outside center supervision. | Neha Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] |
| **GOV-07** | **Parent Access, Correction & Deletion Process** | Informal verbal communication between parents and Nitin Patil. | No documented procedure or technical tool for parents to inspect, correct, or request deletion of child data. | Potential data-protection compliance gap requiring legal review. | Nitin Patil [PROPOSED OWNER — AWAITING MANAGEMENT CONFIRMATION] |

---

## 4. Documentary Evidence & Verification Tracking (VER Register)

In compliance with `AGENTS.md` Rule 6 (*No Fabricated Credentials or Claims*):

| Evidence ID | Academic Claim / Institutional Asset | Required Documentary Evidence | Current Verification State | Action Required Prior to Public Launch |
|---|---|---|---|---|
| **VER-01-A** | Neha Patil: Master of Computer Applications (MCA) Degree | University Degree Certificate & Transcript | `[PENDING DOCUMENTARY LINKAGE]` | Secure scanned copy from management archives. |
| **VER-01-B** | Neha Patil: Certified Vedic Mathematics Educator | Institutional Certificate from recognized Vedic Academy | `[PENDING DOCUMENTARY LINKAGE]` | Secure scanned copy from management archives. |
| **VER-01-C** | Neha Patil: Certified Soroban Abacus Trainer | Professional Trainer Accreditation Certificate | `[PENDING DOCUMENTARY LINKAGE]` | Secure scanned copy from management archives. |
| **VER-02** | Student Competition Achievements (State & National Ranks) | Official Tournament Rank Certificates & Trophy Photos | `[DOCUMENTED IN SHOWCASE; REQUIRES FORMAL CONSENT RECORD]` | Pair student showcase entries with written parental consent forms. |
| **VER-03** | 74+ Five-Star Google Reviews | Live Google Business Profile listing (Wakad, Pune) | `[VERIFIED LIVE NOVEMBER 2026]` | Establish quarterly review count refresh schedule. |
| **VER-04** | Physical Center Address & Facilities | Rental agreement / Ownership deed for Balaji Sagar Bungalow | `[MANAGEMENT CONFIRMED]` | Verified physical location. |

---

## 5. Open Operational Dependencies Summary

1. **DEP-01 (Center Timetable & Capacity Audit):** Verification of classroom schedules to confirm room allocation for all 6 programmes while strictly capping batches at 5 students (Action: `ACT-WS04-03`, `ACT-WS04-08`, `ACT-WS04-24`, `ACT-WS04-25`).
2. **DEP-02 (Physical Workbook Inventory Audit):** Alignment of printed physical workbook series with the 14 Abacus practice modules and 8 Vedic suites (Action: `ACT-WS04-01`, `ACT-WS04-20`).
3. **DEP-03 (Census Reconciliation):** Nominal census audit of active students (>87 confirmed threshold) and active batches (>14 confirmed threshold) (Action: `ACT-WS04-03`).
4. **DEP-04 (Documentary Credential Scans - VER-01):** Securing archival scans of Neha Patil's MCA degree and Vedic Mathematics trainer certifications (Action: `ACT-WS04-02`).
5. **DEP-05 (Cloud Sync Security Remediation - SEC-WS04-01):** Deprecation of public `[REDACTED_CLOUD_BLOB_ENDPOINT]` in favor of an authenticated private cloud database in Stage 4 (Action: `ACT-WS04-05`, `ACT-WS04-19`).
6. **DEP-06 (Leaderboard Privacy Remediation - SEC-WS04-02):** Re-architecting public leaderboard to private self-baseline progress tracking (Action: `ACT-WS04-05`).

---

## 6. Comprehensive Evidence & Action Linkage

For the complete end-to-end evidence traceability matrix covering all 29 empirical evidence items (`EVD-ACAD-01..09`, `EVD-OPS-01..09`, `EVD-SEC-01..11`) and all 29 prioritized actions (`ACT-WS04-01` to `ACT-WS04-29`), refer to:
* `docs/02_business_requirements/AAA_WS04_Management_Action_and_Evidence_Tracker.md`
* `docs/02_business_requirements/AAA_WS04_Management_Decision_Brief.md`
