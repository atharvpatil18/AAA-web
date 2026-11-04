# AAA DIGITAL TRANSFORMATION — STAGE 2
# MASTER REQUIREMENTS TRACEABILITY MATRIX (RTM)

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Leadership:** Neha Patil (Founder & Academic Director), Nitin Patil (Operations & Technology Lead)  
**Document Ref:** `docs/02_business_requirements/AAA_Stage2_Master_Requirements_Traceability_Matrix.md`  
**Governance Stage:** Stage 2 — Master Business Requirements Document (BRD) Umbrella Consolidation  
**Date:** November 03, 2026  
**Status:** 🟡 **CONSOLIDATED REQUIREMENTS TRACEABILITY MATRIX — PENDING STAGE 2 MASTER APPROVAL**  

---

## 1. Executive Summary & Purpose

This Master Requirements Traceability Matrix (RTM) establishes a rigorous, bi-directional traceability baseline linking every material business requirement to:
1. Its **Originating Stage 2 Workstream** and **Source Document**.
2. Its **Original Ratified Decision ID** or **Governance Reference**.
3. Its **Management Approval Status** and **Empirical Evidence Status**.
4. Its **Cross-Functional Dependencies** and **Target Implementation Stage**.
5. Its **Objective Acceptance Criteria**.

### 1.1 Category Mapping & Requirement Count Reconciliation
A strict audit of the requirement inventory reconciles the reported category counts:
* **Functional Business Requirements (37 Total):**
  1. Business Strategy & Operations (`REQ-STRAT-01..05`): **5 Requirements**
  2. Brand Architecture & Positioning (`REQ-BRAND-01..07`): **7 Requirements**
  3. Pedagogy & Observation Framework (`REQ-PED-01..06`): **6 Requirements**
  4. Academic Programmes & Progression (`REQ-ACAD-01..07`): **7 Requirements**
  5. Customer Journey & Admissions (`REQ-JOUR-01..06`): **6 Requirements**
  6. Privacy, Consent & Data Governance (`REQ-PRIV-01..06`): **6 Requirements**
  $$\text{Subtotal Functional Business Requirements} = 5 + 7 + 6 + 7 + 6 + 6 = \mathbf{37}$$
* **Non-Functional Technology & Architecture Requirements (6 Total):**
  7. Technology & AcademyOS Architecture (`REQ-TECH-01..06`): **6 Requirements**
* **Grand Total Unique Traceability Specifications:** $37 + 6 = \mathbf{43\text{ Unique Requirements}}$.
* **Audit Verdict:** The previously reported figure of **37** represents the complete set of core functional business requirements across the first six business domains, while the full table contains **43 unique, non-duplicated requirements** incorporating the AcademyOS architectural and security specifications. Zero requirements have been dropped, duplicated, or silently upgraded.

---

## 2. Master Requirements Traceability Matrix

### 2.1 Business Strategy & Operating Architecture (REQ-STRAT)

| Master Req ID | Requirement Statement | Source WS | Original Decision Ref | Source Document | Approval Status | Evidence Status | Dependencies | Target Stage | Acceptance Criteria |
|---|---|:---:|:---:|---|:---:|:---:|---|:---:|---|
| **REQ-STRAT-01** | **Strict 5-Student Batch Ceiling:** AAA shall enforce a maximum of 5 students per batch across all courses. | WS-01 | `DEC-WS01-01` | `AAA_WS01_Management_Decision_Register.md` | Management Confirmed | Baseline verified | Facility seating audit (`ACT-WS04-08`) | Stage 4 Sprint | Every active batch on timetable verifies $\le 5$ students enrolled. |
| **REQ-STRAT-02** | **Offline-First Growth Strategy:** Prioritize physical classroom delivery at Wakad center over online. | WS-01 | `DEC-WS01-04` | `AAA_WS01_Management_Decision_Register.md` | Management Confirmed | Historical delivery | Center premises availability | Ongoing Strategy | Admissions CTAs and marketing prioritize in-center visits. |
| **REQ-STRAT-03** | **B2C Primary Admissions Engine:** Website and intake architecture shall prioritize direct parent enrollments. | WS-01 | `DEC-WS01-05` | `AAA_WS01_Management_Decision_Register.md` | Management Confirmed | Operating model | Navigation IA design | Stage 3 Architecture | Public routes and UI/UX optimized for parent conversion. |
| **REQ-STRAT-04** | **Leadership Governance Balance:** Neha Patil leads academic direction; Nitin Patil leads operations. | WS-01 | `DEC-WS01-06` | `AAA_WS01_Management_Decision_Register.md` | Management Confirmed | Operating practice | Role allocation memo | Ongoing Governance | Clear division of administrative triage vs academic oversight. |
| **REQ-STRAT-05** | **Zero Arbitrary Quotas:** Monthly inquiry and conversion targets shall be established empirically after launch. | WS-01 | `DEC-WS01-10` | `AAA_WS01_Management_Decision_Register.md` | Proposed Strategy | Pending baseline logging | 4-week baseline logging (`ACT-WS05-10`) | Post-Launch Baseline | Numerical conversion targets deferred until baseline is logged. |

---

### 2.2 Brand Positioning & Value Proposition (REQ-BRAND)

| Master Req ID | Requirement Statement | Source WS | Original Decision Ref | Source Document | Approval Status | Evidence Status | Dependencies | Target Stage | Acceptance Criteria |
|---|---|:---:|:---:|---|:---:|:---:|---|:---:|---|
| **REQ-BRAND-01** | **Master Brand Positioning:** Position AAA as: *"Arnav Abacus Academy – A Premium Mathematical Thinking & Child Development Academy."* | WS-02 | `DEC-WS02-01` | `AAA_WS02_Management_Decision_Register.md` | Management Confirmed | Approved copy | Brand messaging guide | Stage 4 Sprint | Approved statement appears in metadata, hero, and brochures. |
| **REQ-BRAND-02** | **Master Website H1:** Sitewide H1 shall read: *"Beyond Calculation. Towards Confident Mathematical Thinking."* | WS-02 | `DEC-WS02-13` | `AAA_WS02_Management_Decision_Register.md` | Management Confirmed | Approved copy | `Hero.tsx` refactoring | Stage 4 Sprint | Verified H1 rendered in `Hero.tsx` with zero copy discrepancies. |
| **REQ-BRAND-03** | **Monolithic Master Brand:** Enforce Branded House architecture across all offerings; describe as interconnected programmes. | WS-02 | `DEC-WS02-03` | `AAA_WS02_Management_Decision_Register.md` | Management Confirmed | Architecture approved | Navigation IA design | Stage 3 Architecture | All programmes presented under unified AAA domain equity. |
| **REQ-BRAND-04** | **Transformation Value Narrative:** Public copy shall articulate 5 Problem-Transformation pairs, avoiding guaranteed outcome claims. | WS-02 | `DEC-WS02-04` | `AAA_WS02_Management_Decision_Register.md` | Management Confirmed | Approved narrative | Copywriting sprint | Stage 4 Sprint | Programme pages focus on cognitive transformation without false claims. |
| **REQ-BRAND-05** | **Micro-Batch Slogan:** Universal marketing slogan: *"Personalised learning in small batches, with a maximum of five students per batch."* | WS-02 | `DEC-WS02-05` | `AAA_WS02_Management_Decision_Register.md` | Management Confirmed | Operating policy | Website copy refactoring | Stage 4 Sprint | Slogan deployed sitewide; all legacy "1:8" claims eliminated. |
| **REQ-BRAND-06** | **Verified Social Proof Anchor:** Display verified Google Reviews: *"Trusted by families, with 74+ five-star Google Reviews."* | WS-02 | `DEC-WS02-11` | `AAA_WS02_Management_Decision_Register.md` | Management Confirmed | Verified on GBP (Nov 2026) | GBP refresh schedule (`ACT-WS05-07`) | Stage 4 Sprint | 74+ review proof point rendered in trust bar with refresh policy. |
| **REQ-BRAND-07** | **Ethical Differentiation:** Remove unsupported competitor batch comparisons; differentiate solely on AAA's verified facts. | WS-02 | `DEC-WS02-14` | `AAA_WS02_Management_Decision_Register.md` | Management Confirmed | Approved policy | Content audit | Stage 4 Sprint | Zero disparaging or unverified competitor claims in marketing. |

---

### 2.3 Pedagogy, Pillars & Observation Dimensions (REQ-PED)

| Master Req ID | Requirement Statement | Source WS | Original Decision Ref | Source Document | Approval Status | Evidence Status | Dependencies | Target Stage | Acceptance Criteria |
|---|---|:---:|:---:|---|:---:|:---:|---|:---:|---|
| **REQ-PED-01** | **The AAA Learning Model™ Progression:** Micro-batches shall follow: *Inspire → Explore → Understand → Practice → Apply → Reflect*. | WS-02/04 | `DEC-WS02-12`, `DEC-WS04-04` | `AAA_WS04_Management_Decision_Register.md` | Approved as Pilot | Pedagogical model | Lesson plan templates (`ACT-WS04-04`) | Operational Pilot / Stage 3 | 1-page standardized lesson plan templates piloted in 2 batches. |
| **REQ-PED-02** | **Eight Child Development Pillars:** Standardize on exact 8 names: Visualization, Working Memory, Pattern Recognition, Processing Speed, Attention, Cognitive Flexibility, Executive Function, Confidence. | WS-04 | `DEC-WS04-06` | `AAA_WS04_Management_Decision_Register.md` | Approved with Conditions | Approved names | Reporting phrase guide (`ACT-WS04-29`) | Stage 3 Architecture | Exact 8 pillar names locked across all marketing and parent reports. |
| **REQ-PED-03** | **Six Educational Observation Dimensions:** Discovery session observation strictly evaluates 6 dimensions: Number Sense, Arithmetic Understanding, Logical Approach, Learning Attitude, Response and Engagement, Interest and Learning Passion. | WS-05 | `DEC-WS05-03` | `AAA_WS05_Management_Decision_Register.md` | Approved | Approved formal names | Feedback template (`DEC-WS02-09`) | Stage 3 / Stage 4 | Feedback forms and CTAs exclusively cite the exact 6 approved names. |
| **REQ-PED-04** | **Mandatory Non-Diagnostic Safeguards:** Strictly prohibit clinical diagnosis (ADHD, dyscalculia), composite IQ scores, or medical claims. | WS-04 | `DEC-WS04-06` | `AAA_WS04_Management_Decision_Register.md` | Approved with Conditions | Policy locked | Phrase guide (`ACT-WS04-29`) | Stage 3 Architecture | Zero clinical pathology terms in parent reports or website copy. |
| **REQ-PED-05** | **Individual Self-Comparison Policy:** Children shall be evaluated against their own historical progress; zero public score ranking boards. | WS-02 | `DEC-WS02-10` | `AAA_WS02_Management_Decision_Register.md` | Management Confirmed | Philosophy approved | Progress reporting spec | Stage 3 Architecture | Assessment reports celebrate personal growth without score shaming. |
| **REQ-PED-06** | **Elimination of Speed Hyperbole:** Remove unverified claims ("10x to 15x faster"); replace with calculation poise and error reduction. | WS-05 | `DEC-WS05-09` | `AAA_WS05_Management_Decision_Register.md` | Approved | Policy locked | Content refactoring | Stage 4 Sprint | Multiplier speed claims eliminated across all website components. |

---

### 2.4 Academic Programmes & Progression (REQ-ACAD)

| Master Req ID | Requirement Statement | Source WS | Original Decision Ref | Source Document | Approval Status | Evidence Status | Dependencies | Target Stage | Acceptance Criteria |
|---|---|:---:|:---:|---|:---:|:---:|---|:---:|---|
| **REQ-ACAD-01** | **Six Interconnected Programmes:** Offer Abacus, Vedic, Mental, School, IPM, and Olympiad Maths as interconnected tracks. | WS-04 | `DEC-WS04-01` | `AAA_WS04_Management_Decision_Register.md` | Approved with Conditions | Existing center offerings | Facility capacity audit (`ACT-WS04-08`) | Stage 3 Architecture | Reconciled programme architecture reflected in navigation and copy. |
| **REQ-ACAD-02** | **Programme Eligibility Working Brackets:** Adopt working age brackets (Abacus 4.5–9, Vedic 9–14, Mental 6–14, School Gr 1–10, IPM Gr 2–7, Olympiad Gr 2–9) as working guidelines; exact boundaries and 9-yr crossover deferred. | WS-04 | `DEC-WS04-02` | `AAA_WS04_Management_Decision_Register.md` | Deferred Pending Audit | Working intake guidelines | Diagnostic crossover rubric (`ACT-WS04-22`) | Stage 2 Hard Gate | Unanimous management sign-off on age/grade matrix and diagnostic crossover rubric. |
| **REQ-ACAD-03** | **Module vs Level Reconciliation:** Digital practice modules represent drill sets; maintain 8-level Abacus programme as historical reference. | WS-04 | `DEC-WS04-03` | `AAA_WS04_Management_Decision_Register.md` | Approved with Conditions | Modules verified in code | Workbook crosswalk (`ACT-WS04-01`) | Stage 3 Input | Workbook crosswalk maps physical books to 14 digital modules. |
| **REQ-ACAD-04** | **Four-Layer Assessment & Milestone Model:** Evaluation layers (A, B, C, D) and milestone certificate model approved in principle; passing benchmarks and blueprints deferred. | WS-04 | `DEC-WS04-07` | `AAA_WS04_Management_Decision_Register.md` | Approved in Principle (Conditions Attached) | Framework approved in principle | Evaluation blueprints (`ACT-WS04-10`) | Stage 3 / Stage 4 | Formal evaluation papers, passing benchmarks, and blueprints codified in Stage 3. |
| **REQ-ACAD-05** | **Practice Record Re-Labeling:** Client-side generated PDF certificates re-labeled "Practice Achievement Record" to prevent forgery. | WS-04 | `DEC-WS04-07` | `AAA_WS04_Management_Decision_Register.md` | Approved with Conditions | In code (`jsPDF`) | Re-labeling spec (`ACT-WS04-06`) | Stage 4 Sprint | Software heading updated to "Practice Achievement Record". |
| **REQ-ACAD-06** | **Voluntary Competition Policy:** Tournament coaching (IPM, IMO) is 100% voluntary with separate dedicated batch slots and fee cards. | WS-04 | `DEC-WS04-09` | `AAA_WS04_Management_Decision_Register.md` | Approved with Conditions | Existing coaching | Competition calendar (`ACT-WS04-23`) | Stage 2 / Stage 3 | Published policy confirms voluntary status and separate fee schedule. |
| **REQ-ACAD-07** | **Calm Home Practice Guidelines:** Reject compulsory homework; provide 1-page parent practice guides (10–15 min/day). | WS-04 | `DEC-WS04-12` | `AAA_WS04_Management_Decision_Register.md` | Approved as Pilot | Pilot approved | 1-page parent guides (`ACT-WS04-12`) | Operational Pilot | 10 parent feedback surveys show zero homework tears. |

---

### 2.5 Customer Journey & Admissions (REQ-JOUR)

| Master Req ID | Requirement Statement | Source WS | Original Decision Ref | Source Document | Approval Status | Evidence Status | Dependencies | Target Stage | Acceptance Criteria |
|---|---|:---:|:---:|---|:---:|:---:|---|:---:|---|
| **REQ-JOUR-01** | **Eight-Stage Customer Journey:** Implement unified 8-stage journey from Discovery to Advocacy. | WS-03 | `DEC-WS03-02` | `AAA_WS03_Management_Decision_Register.md` | Management Approved | Approved journey map | Role allocation memo | Stage 3 Architecture | Customer touchpoints, handoffs, and friction mitigations mapped. |
| **REQ-JOUR-02** | **Standardized Discovery CTA:** Standardize conversion CTA on: *"Book an AAA Personalised Learning Discovery Session"*. | WS-02/05 | `DEC-WS02-08`, `DEC-WS05-03` | `AAA_WS05_Management_Decision_Register.md` | Approved | Approved naming | Navigation & hero redesign | Stage 4 Sprint | Sitewide CTAs uniformly render the approved discovery naming. |
| **REQ-JOUR-03** | **Discovery Diagnostic Feedback:** Deliver in-person 11-point *"AAA Demo Observation & Learning Recommendation"* immediately post-session. | WS-02 | `DEC-WS02-09` | `AAA_WS02_Management_Decision_Register.md` | Management Confirmed | 11-point template | Observation booklet print (`APP-WS02-B`) | Operational Standard | Structured written feedback provided to parents after discovery session. |
| **REQ-JOUR-04** | **Enquiry Response Pilot Standard:** Automated acknowledgment + human contact within 2 operating hours during center hours. | WS-03/05 | `DEC-WS03-03`, `DEC-WS05-07` | `AAA_WS05_Management_Decision_Register.md` | Approved as Pilot | Pilot standard | Center hours confirmation (`CONF-MKT-01`) | Operational Pilot | Response time tracked; founder teaching hours strictly prioritized. |
| **REQ-JOUR-05** | **Eight-Status Admissions Lifecycle:** Leads transition through: New Enquiry → Contacted → Booked → Attended → Admission / Decision / Closed / Follow-up. | WS-05 | `DEC-WS05-08` | `AAA_WS05_Management_Decision_Register.md` | Approved | Lifecycle defined | Security review (`ACT-WS05-06`) | Interim Lead Register | All leads tracked across 8 exclusive statuses without sole WhatsApp reliance. |
| **REQ-JOUR-06** | **Strict Admission Definition:** Admission Completed recorded ONLY upon formal registration and verified tuition fee payment receipt. | WS-05 | `DEC-WS05-08` | `AAA_WS05_Management_Decision_Register.md` | Approved | Policy locked | Fee ledger integration | Operational Standard | Zero verbal agreements or demo bookings counted as admissions. |

---

### 2.6 Privacy, Consent & Data Governance (REQ-PRIV)

| Master Req ID | Requirement Statement | Source WS | Original Decision Ref | Source Document | Approval Status | Evidence Status | Dependencies | Target Stage | Acceptance Criteria |
|---|---|:---:|:---:|---|:---:|:---:|---|:---:|---|
| **REQ-PRIV-01** | **Minimum Necessary Lead Capture Form:** Web inquiry form restricted to 4 fields (Parent Name, Mobile, Age/Grade, Programme). | WS-05 | `DEC-WS05-04` | `AAA_WS05_Management_Decision_Register.md` | Approved with Conditions | Form spec drafted | `LeadForm.tsx` refactoring | Stage 4 Sprint | Form collects exactly 4 fields; eliminates address, DOB, school, clinical. |
| **REQ-PRIV-02** | **Dual Consent Architecture:** Separate checkboxes for inquiry response (mandatory) vs marketing updates (optional); submission unconditioned. | WS-05 | `DEC-WS05-04` | `AAA_WS05_Management_Decision_Register.md` | Approved with Conditions | Specification drafted | Privacy notice review (`ACT-WS05-05`) | Stage 4 Sprint | Declining marketing does not block enquiry submission; logs timestamped. |
| **REQ-PRIV-03** | **Zero-PII Analytics Telemetry:** GA4 (`G-M2EL9MYSRL`) and GTM telemetry strictly prohibit personal identifiers in events or URLs. | WS-03/04 | `DEC-WS03-04`, `DEC-WS04-14` | `AAA_WS04_Management_Decision_Register.md` | Approved with Conditions | `AGENTS.md` Rule 4 | Analytics audit | Stage 3 / Stage 4 | Verified zero-PII payload transmission across all analytics events. |
| **REQ-PRIV-04** | **Student Identity Integrity:** Permanent Student ID per child (`AAA-STU-YYYY-XXXX`) supporting sibling relationships under one parent entity. | WS-04 | `DEC-WS04-13` | `AAA_WS04_Management_Decision_Register.md` | Approved with Conditions | Principles approved | Relational schema spec (`ACT-WS04-14`) | Stage 3 Architecture | Database schema supports multiple siblings sharing parent mobile/email. |
| **REQ-PRIV-05** | **Lead Register Security Prerequisite:** Interim lead tracking spreadsheet authorized strictly after security and privacy reviews. | WS-05 | `DEC-WS05-08` | `AAA_WS05_Management_Decision_Register.md` | Deferred | Prerequisites locked | `ACT-WS05-05`, `ACT-WS05-06` sign-off | Pre-Lead Register Gate | Signed security and privacy assessments before operating new lead tool. |
| **REQ-PRIV-06** | **Parent Statutory Data Rights SOP:** Implement documented SOP for handling parent data inspection, correction, and erasure ("Right to be Forgotten"). | WS-04 | `DEC-WS04-14` | `AAA_WS04_Management_Decision_Register.md` | Approved with Conditions | Policy locked | SOP drafting (`ACT-WS04-11`) | Pre-Implementation | Written administrative SOP approved under DPDP guidelines. |

---

### 2.7 Technology & AcademyOS Architecture (REQ-TECH)

| Master Req ID | Requirement Statement | Source WS | Original Decision Ref | Source Document | Approval Status | Evidence Status | Dependencies | Target Stage | Acceptance Criteria |
|---|---|:---:|:---:|---|:---:|:---:|---|:---:|---|
| **REQ-TECH-01** | **Ten AcademyOS Architecture Principles:** Enhancements must comply with principles P-01 to P-10 (Sovereignty, Identity, Audit, etc.). | WS-04 | `DEC-WS04-10` | `AAA_WS04_Management_Decision_Register.md` | Approved | Principles locked | Stage 3 Technical Architecture | Stage 3 Architecture | Architecture specifications satisfy all 10 principles without exception. |
| **REQ-TECH-02** | **Boundary Protection:** Public portal (`AAA_WEB`) development must not alter or break `/login` or `/practice/*` learning platform routes. | All | `AGENTS.md` Rule 3 | `AGENTS.md` | Permanent Rule | Route structure verified | Stage-gate governance | All Stages | Zero unauthorized modifications to AcademyOS learning routes. |
| **REQ-TECH-03** | **Cloud Storage Cutover:** Replace public cloud storage sync (`jsonblob.com`) with secure private database storage in Stage 4. | WS-04 | `DEC-WS04-10`, `DEC-WS04-14` | `AAA_WS04_Security_Privacy_Review.md` | Approved with Conditions | Hardcoded endpoint found | Migration & rollback plan (`ACT-WS04-19`) | Stage 4 Sprint | Complete cutover to private database with verified data migration. |
| **REQ-TECH-04** | **Central Certificate Ledger:** Implement database ledger for issued graduation diplomas with QR code verification and revocation logic. | WS-04 | `DEC-WS04-07` | `AAA_WS04_Management_Decision_Register.md` | Approved with Conditions | Concept approved | Ledger spec (`ACT-WS04-15`) | Stage 3 / Stage 4 | Online verification endpoint confirms authenticity and prevents forgery. |
| **REQ-TECH-05** | **Browser Storage Security:** Clear client permission cache on logout, encrypt sensitive local state, and enforce inactivity timeouts. | WS-04 | `DEC-WS04-10` | `AAA_WS04_Security_Privacy_Review.md` | Approved | Plaintext storage identified | Browser storage spec (`ACT-WS04-16`) | Stage 3 Architecture | Session sign-out thoroughly clears sensitive cached attempt data. |
| **REQ-TECH-06** | **Server-Side Authorization:** Enforce administrative privileges server-side; eliminate client-side permission checks. | WS-04 | `DEC-WS04-10` | `AAA_WS04_Security_Privacy_Review.md` | Approved | Client-side check identified | API specification | Stage 3 Architecture | Administrative mutations rejected without valid server-side auth token. |

---
*End of Master Requirements Traceability Matrix — Arnav Abacus Academy (AAA)*
