# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# GOVERNANCE CORRECTION & WS-06 READINESS REPORT

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S3-REP-001`  
**Stage:** Stage 3 — Architecture & Design  
**Governance Authority:** Neha Patil (Academic Director) & Nitin Patil (Operations & Technology Lead)  
**Baseline Date:** 03 November 2026  
**Git Branch:** `audit-redesign-remediation`  
**Baseline Commit:** `b14c64189fe5aa8e5421a548f41cd1a9626d73ef`  
**Status:** 🟢 **GOVERNANCE CORRECTION COMPLETE — SUBMITTED FOR MANAGEMENT APPROVAL**  

---

> [!IMPORTANT]
> **Implementation Scope Boundary & Governance Safeguards:**  
> This report reconciles and refines the Stage 3 Architecture Governance Framework in `docs/03_solution_architecture/`. **No application source code, website content, CRM tool, or infrastructure deployment has been modified or activated.** All activities remain strictly documentation-only. The seven Stage 4 Hard Gates remain strictly active and blocking.

---

## 1. Executive Summary & Purpose

Following the formal management ratification of Stage 2 (Option 1 Full Management Ratification on 03 November 2026), the initial Stage 3 Architecture Governance Framework was established. In response to management review, a final targeted correction has been executed across all eight Stage 3 governance documents.

This report documents the corrections made, establishes technology neutrality, defines student identity principles, formalizes the four-field maximum enquiry contract, inventories all 30 audited repository routes, details comprehensive accessibility acceptance criteria, enforces academic non-diagnostic safeguards, clarifies cross-cutting privacy/security dependencies, and provides management with the exact decisions required to commence WS-06.

---

## 2. The Eight Mandatory Governance Distinctions

To ensure unambiguous governance clarity between management and engineering agents, the project status is categorized across eight distinct dimensions:

### 2.1 Overall Stage 3 Authorization (Already Granted)
- **Status:** **AUTHORIZED** (03 November 2026).
- **Scope of Authorization:** Neha Patil and Nitin Patil authorized the closure of Stage 2 and the commencement of overall Stage 3 Architecture & Design under Option 1.
- **Boundaries:** Authorizes architectural design, operational modeling, and options analysis; does **not** authorize code implementation, content changes, CRM deployment, or infrastructure migration.

### 2.2 Architecture Governance Documents Awaiting Management Approval
- **Status:** **SUBMITTED FOR APPROVAL (Gate 3.0B)**.
- The following eight corrected documents in `docs/03_solution_architecture/` await formal management review and approval:
  1. `AAA_Stage3_Architecture_and_Design_Charter.md` (`AAA-S3-GOV-001`)
  2. `AAA_Stage3_Workstream_and_Dependency_Plan.md` (`AAA-S3-GOV-002`)
  3. `AAA_Stage3_Architecture_Principles_and_Standards.md` (`AAA-S3-GOV-003`)
  4. `AAA_Stage3_Architecture_Decision_Register.md` (`AAA-S3-GOV-004`)
  5. `AAA_Stage3_Architecture_Risk_and_Control_Register.md` (`AAA-S3-GOV-005`)
  6. `AAA_Stage3_Requirements_to_Architecture_Traceability.md` (`AAA-S3-GOV-006`)
  7. `AAA_Stage3_Management_Approval_and_Gate_Register.md` (`AAA-S3-GOV-007`)
  8. `AAA_Stage3_Architecture_Execution_Roadmap.md` (`AAA-S3-GOV-008`)

### 2.3 WS-06 Detailed Workstream Commencement (Awaiting Approval)
- **Status:** **PAUSED / AWAITING MANAGEMENT AUTHORIZATION**.
- Detailed drafting of WS-06 architecture deliverables (sitemap, 30-route preservation, wireframes, 4-field contract, copy spec) will commence only upon explicit management sign-off on Gate 3.0B and Decision `MGT-DET-S3-02`.

### 2.4 Provisional Four-Phase Execution Plan
- **Status:** **PROVISIONAL PLANNING ESTIMATE**.
- The four-phase roadmap (Phase 1: WS-06 & WS-09A $\rightarrow$ Phase 2: WS-07 & WS-08 $\rightarrow$ Phase 3: WS-09B, WS-10 & WS-11 $\rightarrow$ Phase 4: Master Consolidation) and the 10-working-day target for WS-06 are recorded as planning estimates subject to owner and capacity confirmation by Nitin Patil and Neha Patil, **not as guaranteed deadlines**.
- **WS-10 operates continuously from Day 1** as a cross-cutting governance audit across all phases.

### 2.5 Decisions That Remain Proposed
- **Status:** **PROPOSED ARCHITECTURAL OPTIONS (Zero Approved Migrations)**.
- The active technology baseline remains **React 19, TypeScript, React Router v7, and Vite**.
- The following items are classified strictly as proposed options requiring formal Options Analysis:
  - Framework migration (e.g., Next.js / Edge SSR).
  - Interim CRM tooling (e.g., Google Sheets webhook pipeline vs lightweight sovereign database).
  - Analytics pipeline (Google Tag Manager vs direct sovereign event ingestion).
  - Certificate verification infrastructure (cryptographic hashing vs central database lookup).
  - Candidate Student ID format `AAA-STU-YYYY-XXXX` (evaluated alongside UUID, sequential numeric, and hashed formats).
  - CI/CD build automation, performance budgets, and disaster recovery SLAs.

### 2.6 Decisions Requiring Neha Patil's Academic Approval
- **Status:** **PENDING ACADEMIC SIGN-OFF**.
- Neha Patil retains sole academic governance authority for:
  - `ADR-02`: Micro-batch copy refactoring pattern ("maximum of five students per batch").
  - `ADR-05`: The AAA Learning Model™ 1-page standardized lesson plan architecture.
  - `ADR-06`: Diagnostic crossover evaluation rubric for 9-year-old candidates (proposed framework; **not** an approved admission rule).
  - `ADR-08`: Formal milestone diploma eligibility criteria, passing benchmarks (70%/80%), and manual signature protocols.
  - Pedagogical definitions, rubrics for the 6 observation dimensions and 8 development pillars, academic curriculum for all 6 portfolio programmes, and interpretation of child developmental progress.

### 2.7 Decisions Requiring Qualified Legal/Privacy Validation
- **Status:** **PENDING LEGAL COUNSEL REVIEW**.
- The following require formal qualified legal review under the DPDP Act 2023:
  - `ADR-03`: 4-field maximum enquiry form and unbundled dual consent notice.
  - `ADR-11`: 90-day retention schedule for unconverted lead purging (proposed schedule; **not** an approved policy).
  - Verification that minor data handling, consent logging, and parental access SOPs comply with statutory requirements (rather than assuming compliance via reference).

### 2.8 Stage 4 Implementation Restrictions
- **Status:** **STRICTLY PROHIBITED & LOCKED**.
- All seven Stage 4 Hard Gates (`S4-HG-01` through `S4-HG-07`) remain blocking.
- Zero source code changes in `src/`, zero website publication, zero CRM activation, zero deployments, and zero commits/pushes/merges are permitted during Stage 3.

---

## 3. Detailed Summary of Architectural Corrections Implemented

### 3.1 Technology Neutrality & Options-Analysis Framework
- **Correction:** Removed all premature assumptions regarding Next.js, Edge hosting, Google Sheets CRM, or GTM as pre-approved solutions.
- **Action:** Re-anchored the architecture to the existing **React 19, TypeScript, React Router v7, and Vite** application baseline.
- **Enforcement:** Formulated a mandatory 9-point Options Analysis structure (Current State, Business Need, Options Considered, Pros/Cons, Effort/Cost, Privacy/Security, Compatibility, Recommendation, Approval Authority) before any technical migration can be proposed.

### 3.2 Enquiry Form Data Contract (Four-Field Maximum Concept)
- **Correction:** Reconciled the enquiry form specification to reflect the ratified WS-05 data minimization principle:
  1. *Parent Name* — Required.
  2. *Parent Mobile / WhatsApp* — Required.
  3. *Child Age Bracket OR School Grade* — At least one required.
  4. *Programme of Interest* — Optional.
- **Clarification:** This is a **four-field maximum concept**, meaning prospective parents are never presented with more than 4 intake inputs, and completing all four is not mandatory to submit an enquiry.
- **Consent Separation:** Transactional communication consent is strictly segregated from optional marketing consent. Declining promotional consent must never block enquiry submission.
- **Strict Data Exclusions:** Absolutely zero collection of exact child date of birth (DOB), school name, residential address, or clinical/developmental history at initial enquiry.

### 3.3 Audited Canonical Route Inventory (30 Active Routes)
- **Correction:** Replaced generalized references to "12 canonical paths" with an audited repository route inventory from `src/App.tsx`.
- **Inventory:** Formally documented all **30 active route definitions** (26 static routes, 2 dynamic parameterized patterns `/blog/:slug` and `/campaigns/:slug`, 1 wildcard `*`, and legacy hash redirect handler). All 30 routes must be preserved to protect organic search equity.

### 3.4 Programme Architecture & Discovery Session Clarification
- **Programme Portfolio Grouping:** Retained the six programme areas (Abacus, Vedic, Mental, School Maths, IPM, Olympiad) as AAA's **current portfolio grouping only**. Documented that full curriculum levels, eligibility, and progression remain subject to academic validation by Neha Patil; zero invented age rules.
- **Discovery Session Reality:** Preserved the documented free Discovery Session practice of **approximately 45–90 minutes, depending on child engagement and parent discussion**. Documented that this must **not** be advertised or represented as a fixed guaranteed duration.

### 3.5 Comprehensive Accessibility Acceptance Criteria
- **Conformance Target:** **WCAG 2.1 AA** (subject to automated and manual assistive testing).
- **Expanded Criteria:**
  - *Keyboard Navigation:* Full interactive navigation via keyboard only with visible, high-contrast focus rings.
  - *Screen Readers:* Accessible labels, semantic landmark regions, and live form announcements.
  - *Heading Hierarchy:* Strict logical nesting (`h1` $\rightarrow$ `h2` $\rightarrow$ `h3` $\rightarrow$ `h4`).
  - *Form Error Recovery:* Explicit text error messages associated with inputs via `aria-describedby`.
  - *Text Zoom:* Resilient layout up to 200% zoom without horizontal clipping.
  - *Accessible Modals:* Focus trapping, Escape key dismiss, and background inerting.
  - *Reduced Motion:* Respects `prefers-reduced-motion: reduce`.
  - *Touch Targets:* $\ge 48\text{px}$ touch targets enforced as an AAA design preference (not a substitute for WCAG standards).

### 3.6 Privacy, Telemetry & Data Classification
- **Correction:** Defined zero-PII telemetry as an **architectural design objective requiring data-flow validation**, not an assumed property.
- **Indirect Identifiers Assessment:** Architecture models must assess and mitigate risks from potential indirect identifiers: IP addresses, device identifiers, tracking cookies, URL query parameters, and third-party analytics metadata.
- **Data Classification:** Defined data flow requirements covering Data Collected, Purpose, Destination, Access Permissions, Retention, Consent/Opt-Out, Third-Party Processors, and Deletion/Breach Response.
- **Legal Review:** Explicit legal questions formulated for qualified legal counsel review.

### 3.7 WS-06 and WS-09A Dependency Division
- **WS-06 Scope:** Defines public user journeys, information architecture, mobile wireframes, canonical route preservation, and the enquiry form UI contract.
- **WS-09A Scope:** Defines the complete student, parent, programme, and relationship data architecture based on approved academic and operational business processes. **WS-09A does NOT derive the full AcademyOS data schema solely from the 4-field enquiry contract.**
- **Continuous WS-10 Audit:** Security and privacy operate as continuous cross-cutting controls across all workstreams from Day 1.

---

## 4. Architecture Decision Register Audit Summary

| Decision ID | Subject | Proposed / Approved Status | Required Sign-Off Authority |
|---|---|:---:|:---:|
| **ADR-01** | Public Portal IA & Monolithic Brand (30 Routes) | Proposed Architectural Specification | Nitin Patil & Neha Patil |
| **ADR-02** | Micro-Batch Copy Refactoring Pattern | Proposed Architectural Pattern | Neha Patil (Academic Director) |
| **ADR-03** | Minimum Necessary Enquiry Form UX (4-Field Max) | Proposed Architecture Decision | Nitin Patil & Qualified Legal Counsel |
| **ADR-04** | Inquiry Triage & Teaching Hours Protection SOP | Proposed Architectural Workflow | Nitin Patil & Neha Patil |
| **ADR-05** | The AAA Learning Model™ 1-Page Lesson Plan | Requires Academic Validation | Neha Patil (Academic Director) |
| **ADR-06** | Diagnostic Crossover Rubric for 9-Year-Olds | Requires Academic Validation (Not Admission Rule) | Neha Patil (Academic Director) |
| **ADR-07** | Sovereign Student ID Key & Sibling Schema | Proposed Architecture Decision | Nitin Patil & Neha Patil |
| **ADR-08** | Central Certificate Ledger & QR Verification | Proposed Architecture Decision | Nitin Patil & Neha Patil |
| **ADR-09** | Browser Storage Security & Inactivity Purge | Proposed Architecture Decision | Nitin Patil (Technology Lead) |
| **ADR-10** | Public Cloud Sync Retirement & Sovereign Storage | Proposed Architecture Decision | Nitin Patil (Technology Lead) |
| **ADR-11** | Data Retention & Automated Lead Cleanup Schedule | Requires Legal Validation (Not Approved Policy) | Qualified Legal Counsel & Nitin Patil |
| **ADR-12** | Interim Lead Tracking Tooling & Pipeline | Deferred Pending Options Analysis | Nitin Patil & Qualified Legal Counsel |

*Audit Finding:* Zero ADRs are approved solely by virtue of creation. All 12 ADRs are correctly categorized with source requirement IDs, alternatives, trade-offs, risks, and designated sign-off authorities.

---

## 5. Repository Hygiene & Compliance Verification

- **Git Branch:** `audit-redesign-remediation`
- **Baseline Commit:** `b14c64189fe5aa8e5421a548f41cd1a9626d73ef`
- **Tracked Files Diff:** `git diff --stat` returns **0 files changed, 0 insertions, 0 deletions**.
- **Untracked Additions:** Restricted strictly to `AGENTS.md` and documentation files under `docs/`.
- **Application Code Status:** **Zero modifications** to `src/`, `public/`, or build configurations.
- **Stop Condition Status:** Website updates, code modifications, CRM activations, and production deployments remain 100% paused.

---

## 6. Recommended Management Determinations

To conclude the governance correction and commence architectural work, the following formal determinations are prepared for Neha Patil and Nitin Patil:

1. **MGT-DET-S3-01: Approval of Stage 3 Architecture Governance Framework:**
   - Formally approve Documents `AAA-S3-GOV-001` through `AAA-S3-GOV-008` as the reconciled governing baseline (passing Gate 3.0B).
2. **MGT-DET-S3-02: Authorization to Commence WS-06 (Digital Experience & Website Architecture):**
   - Authorize the architecture team to begin drafting WS-06 deliverables (IA, wireframes, 4-field contract, copy spec) under the 11-area scope.
3. **MGT-DET-S3-03: Endorsement of Provisional Planning Estimates:**
   - Endorse the 10-working-day planning estimate for WS-06 and the 4-phase architecture roadmap, subject to ongoing capacity review.

---
*End of Stage 3 Governance Correction & WS-06 Readiness Report (AAA-S3-REP-001)*
