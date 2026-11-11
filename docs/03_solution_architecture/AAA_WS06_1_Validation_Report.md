# ARNAV ABACUS ACADEMY (AAA)
## Stage 3 Architecture & Design — Workstream WS-06.1
### Governance Validation & Verification Report

**Document Reference:** `AAA-S3-VAL-WS06-01`  
**Date:** 03 November 2026  
**Status:** 🟢 **APPROVED & RATIFIED BY MANAGEMENT (`MGT-DET-S3-04`)**  
**Author:** AI Technical Architecture Agent  
**Governance Authority:** Neha Patil (Academic Director) & Nitin Patil (Operations & Technology Lead)  
**Deliverable Accompanied:** [`AAA_WS06_Information_Architecture_and_Sitemap_Spec.md`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/docs/03_solution_architecture/AAA_WS06_Information_Architecture_and_Sitemap_Spec.md)  
**Baseline Git Commit:** `b14c64189fe5aa8e5421a548f41cd1a9626d73ef`  

---

## 1. Executive Summary & Pre-Execution Governance Verification

### 1.1 Management Determination Pre-Execution Check
Before drafting the WS-06.1 specification, a formal pre-execution governance audit was conducted to verify that all workstream authorizations were backed by explicit management evidence:
- **`MGT-DET-S3-01` (Approval of Governance Documents):** Formally signed off on 03 November 2026 by Neha Patil and Nitin Patil with binding conditions (verbatim H1/subheadline, React 19/Vite baseline preservation, ~45–90 min discovery session reality, WCAG 2.1 AA target).
- **`MGT-DET-S3-02` (Authorization of WS-06 Commencement):** Formally signed off on 03 November 2026 authorizing detailed architecture drafting only, strictly prohibiting implementation code changes.
- **`MGT-DET-S3-03` (Adoption of Phased Delivery & Timeline):** Formally endorsed on 03 November 2026 adopting the 4-phase delivery model (WS-06.1 through WS-06.4) and a 10-working-day planning baseline.

**Pre-Execution Result:** PASS. All three determinations are backed by documented management approval records in `docs/03_solution_architecture/AAA_Stage3_Final_WS06_Management_Approval_Pack.md` and `docs/03_solution_architecture/AAA_Stage3_Management_Approval_and_Gate_Register.md`.

---

## 2. Scope & Compliance Audit of WS-06.1 Deliverable

The delivered specification (`AAA-S3-SPEC-WS06-01`) covers all 15 required architectural dimensions:

| Requirement Area | Specification Section | Compliance Status | Audit Evidence & Notes |
| :--- | :---: | :---: | :--- |
| **Website Objectives & Parent IA** | §1.0 | **PASS** | Focuses on high-trust, low-friction, Wakad/Hinjawadi parent discovery. |
| **Primary & Secondary Navigation** | §2.0 | **PASS** | Two-tier desktop header, ergonomic mobile header + drawer, sticky bottom bar. |
| **Complete Visual Sitemap** | §3.0 | **PASS** | Comprehensive Mermaid diagram mapping all 30 routes + 1 redirect handler. |
| **Homepage Information Hierarchy** | §4.0 | **PASS** | 14-block structured flow from Trust Bar to conversion anchor. |
| **Verbatim H1 & Subheadline** | §4.2 | **PASS** | Exact verbatim text from `DEC-WS02-13` preserved with zero alterations. |
| **Programme Discovery Structure** | §5.0 | **PASS** | 6 current portfolio groupings with explicit academic disclaimer. |
| **Parent Guides & Mentor Profile** | §6.0 | **PASS** | 5 core anxiety guides mapped; Neha Patil profile tied to `VER-01`. |
| **Discovery Session Enquiry Journey** | §7.0 | **PASS** | 4-field max modal concept, dual unbundled consent, ~45–90 min reality. |
| **Contact & Local Discovery** | §8.0 | **PASS** | Standardized NAP, local commute landmarks, Google Map Pack integration. |
| **Audited Route Mappings (30 Routes)** | §9.0 | **PASS** | 100% reconciliation with `src/App.tsx`, canonical tags, legacy hash handler. |
| **Mobile Thumb-Zone Considerations** | §10.0 | **PASS** | Bottom 64px sticky bar, 48px touch targets, responsive card adaptation. |
| **Internal Linking & Canonical Rules** | §11.0 | **PASS** | Silo clusters (Programmes, Guides), breadcrumbs, lowercase canonicals. |
| **Content Ownership & Dependencies** | §12.0 | **PASS** | Sole academic authority reserved for Neha Patil; Nitin Patil for tech/ops. |
| **Accessibility Conformance** | §13.0 | **PASS** | WCAG 2.1 AA target; single-H1 AAA standard; 2.3.3 reduced-motion AAA pref. |
| **Privacy & Zero-PII Telemetry** | §14.0 | **PASS** | GA4 parameter sanitization; prohibited fields strictly excluded. |
| **BRD Requirements Traceability** | §15.0 | **PASS** | Complete matrix tracing to `REQ-STRAT`, `REQ-BRAND`, `REQ-PED`, etc. |

---

## 3. Explicit Verification of Non-Negotiable Governance Rules

1. **Brand Headlines & Copy Integrity:**
   - *Master H1:* `"Beyond Calculation. Towards Confident Mathematical Thinking."` (Verified verbatim).
   - *Master Subheadline:* `"At Arnav Abacus Academy, mathematics is the medium to develop confident, independent, and thoughtful young learners. Guided by certified educators in small batches with a maximum of five students per batch, our structured programmes provide personalised learning, closer individual guidance, and steady mathematical progress."` (Verified verbatim).
2. **Micro-Batch Standard:**
   - Universally documented as *"maximum of five students per batch"* across all sections.
3. **Discovery Session Policy:**
   - Documented as **approximately 45–90 minutes, free of charge, adapting to child engagement and parent discussion**.
   - Cites all 6 approved observation dimensions (Number Sense, Arithmetic Understanding, Logical Approach, Learning Attitude, Response and Engagement, Interest and Learning Passion).
4. **Data Minimization & Privacy:**
   - Enforces the 4-field maximum concept (Parent Name, Parent Mobile/WhatsApp, Child Age/Grade [at least one], Programme [optional]).
   - Absolute prohibition on exact DOB, school name, residential address, and clinical data collection.
   - Dual unbundled consent separating transactional enquiry handling from promotional newsletters.
   - Zero-PII analytics telemetry for GA4 (`G-M2EL9MYSRL`).
5. **AcademyOS Boundary Protection:**
   - Protected routes (`/practice`, `/practice/session`, `/practice/results`, `/login`) segregated as internal learning platform subsystems.
6. **Codebase & Git Hygiene:**
   - Zero files modified under `src/` or `public/`.
   - Zero git commits, pushes, or branch manipulations.
   - Working tree clean for tracked files (`git diff --stat` returns 0).

---

## 4. Key Architectural Assumptions

1. **React 19 / Vite Continuity:** Stage 3 and early Stage 4 planning assume retention of the current React 19, Vite, and React Router v7 baseline. (Any shift to Next.js or alternative frameworks remains a proposed option pending formal ADR sign-off).
2. **Current Portfolio Groupings:** The 6 programme areas represent current commercial groupings; curriculum ladder depth validation remains a Stage 4 milestone under Neha Patil.
3. **Form Submissions:** The 4-field enquiry modal will route leads through the secure serverless/webhook endpoint agreed in `ADR-003`, with no direct client-side logging of PII.

---

## 5. Unresolved Questions & Items for Management Clarification

During the compilation of WS-06.1, three operational and architectural nuances were catalogued for management review:

| Item Reference | Area | Question / Consideration for Management | Recommended Approach |
| :---: | :--- | :--- | :--- |
| **Q-01** | Route Aliasing | Should `/gallery` and `/news-events` remain as permanent client-side alias routes, or should they be issued HTTP 301 redirects to `/showcase` and `/news` respectively during future server-side deployment? | **Recommendation:** Retain both in React Router for backward compatibility, but set `<link rel="canonical">` to the primary path. |
| **Q-02** | Operating Hours Sunday Policy | The footer currently states *"Open Every Day"*, whereas the ratified operating hours are *"Mon–Sat: 9:30 AM – 7:30 PM"*. Should Sunday diagnostic assessments be explicitly mentioned as *"By Prior Appointment Only"*? | **Recommendation:** Clarify on `/contact` that Sundays are reserved exclusively for pre-booked Discovery Sessions. |
| **Q-03** | Phone Number Verification | Codebase forensic audit confirmed that `+91 90219 24968` is the sole authentic phone and WhatsApp number across all source code components (`Navbar.tsx`, `FloatingCTA.tsx`, `Footer.tsx`, `Contact.tsx`). An earlier draft mistakenly cited an unverified number (`+91 94038 84844`). | **Resolution:** `+91 90219 24968` is confirmed as the single official Voice Helpline and WhatsApp contact for all website touchpoints. |

---

## 6. Specific Decisions Ratified by Neha Patil & Nitin Patil

On 03 November 2026, Neha Patil (Founder & Academic Director) and Nitin Patil (Operations & Technology Lead) formally approved and ratified the three validation determinations under **`MGT-DET-S3-04`**:

1. **Validation Item V-01 (Neha Patil — Academic Director):**
   - **Determination:** **APPROVED & RATIFIED**.
   - Signed off on the public presentation of the 6 current portfolio groupings and confirmed that the pedagogical continuum (Tactile Abacus $\rightarrow$ Visual Mental Math $\rightarrow$ Analytical Vedic Math $\rightarrow$ School/Olympiad Application) accurately reflects AAA's teaching philosophy.
2. **Validation Item V-02 (Neha Patil — Academic Director):**
   - **Determination:** **APPROVED & RATIFIED**.
   - Formally approved the public copy framing for the 6 Educational Observation Dimensions (*Number Sense, Arithmetic Understanding, Logical Approach, Learning Attitude, Response and Engagement, Interest and Learning Passion*) used during Discovery Sessions.
3. **Validation Item V-03 (Nitin Patil — Operations & Technology Lead):**
   - **Determination:** **APPROVED & RATIFIED**.
   - Formally confirmed that the 4-field maximum enquiry modal contract and dual unbundled consent model satisfy operational admissions needs and data minimization standards.

---

## 7. Stage-Gate Transition & Authorization for WS-06.2

> [!NOTE]
> **GATE 3.1 (PHASE 1) CLOSED & WS-06.2 COMMENCEMENT AUTHORIZED:**  
> With the formal approval of Determinations V-01, V-02, and V-03 under `MGT-DET-S3-04`, **Workstream WS-06.1 is formally ratified and closed**.  
> In accordance with the Stage 3 Architecture Execution Roadmap (`AAA-S3-GOV-006`), **WS-06.2: Wireframes & Low-Fidelity Layout Specifications** is now authorized to proceed under the established documentation-only governance safeguards.

---
*Report End — Approved and Ratified by Management (`MGT-DET-S3-04`).*
