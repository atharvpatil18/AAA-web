# ARNAV ABACUS ACADEMY (AAA)
## Stage 3 Architecture & Design — Workstream WS-06.2
### Wireframes & Layout Blueprints Validation Report

**Document Reference:** `AAA-S3-VAL-WS06-02`  
**Date:** 03 November 2026  
**Status:** 🟢 **APPROVED & RATIFIED BY MANAGEMENT (`MGT-DET-S3-05`)**  
**Author:** AI Technical Architecture Agent  
**Governance Authority:** Neha Patil (Academic Director) & Nitin Patil (Operations & Technology Lead)  
**Deliverable Accompanied:** [`AAA_WS06_Wireframes_and_Layout_Blueprints.md`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/docs/03_solution_architecture/AAA_WS06_Wireframes_and_Layout_Blueprints.md)  
**Baseline Git Commit:** `b14c64189fe5aa8e5421a548f41cd1a9626d73ef`  

---

## 1. Executive Summary & Prerequisite Audit

### 1.1 Governance Alignment
Before authoring the WS-06.2 Wireframes & Layout Blueprints specification, a rigorous governance audit was performed to verify prerequisite compliance:
- **`MGT-DET-S3-04` Verification:** Formally confirmed that Validation Determinations V-01 (Programme Groupings & Progression), V-02 (6 Observation Dimensions), and V-03 (4-Field Maximum Enquiry Modal Contract & Dual Consent) were executed and ratified on 03 November 2026.
- **Stage-Gate Register Alignment:** Verified that Gate 3.1 Phase 1 was formally closed and WS-06.2 commencement was authorized in `AAA_Stage3_Management_Approval_and_Gate_Register.md`.
- **WS-06.1 Traceability:** Verified that every page archetype, sitemap relationship, and navigation tier established in `AAA_WS06_Information_Architecture_and_Sitemap_Spec.md` is directly reflected in the wireframe blueprints.

**Prerequisite Audit Result:** PASS. All governance mandates and prerequisite approvals are satisfied.

---

## 2. Specification Quality & Design Coverage Audit

The delivered specification (`AAA-S3-SPEC-WS06-02`) satisfies all required design dimensions:

| Design Dimension | Wireframe Section | Audit Finding & Verification Evidence | Status |
| :--- | :---: | :--- | :---: |
| **Homepage Layout Blueprint** | §3.0 | Evaluates and validates the 14-block narrative flow against approved IA. Integrates dated & refreshable 74+ Google Reviews anchor. | **PASS** |
| **Verbatim H1 & Subheadline** | §1.2, §3.2 | Verbatim placement in Hero wireframe: *"Beyond Calculation. Towards Confident Mathematical Thinking."* + approved subheadline verbatim. | **PASS** |
| **Programme Hub Blueprint** | §4.0 | Common comparative framework across all 6 current portfolio groupings; explicit disclaimer that offerings are not compulsory sequential ladders. | **PASS** |
| **Programme Detail Template** | §5.0 | Standardized 9-section template featuring learning experience, progression placeholders, and dedicated Discovery Session invitations. | **PASS** |
| **Parent Guide Article Template** | §6.0 | Editorial reassurance layout with sticky table of contents, comparison callouts, and contextual Discovery Session links. | **PASS** |
| **Discovery Session Modal** | §7.0 | Enforces the 4-field maximum concept with unbundled dual consent. Declining marketing consent never penalizes enquiry submission. | **PASS** |
| **Prohibited Data Safeguards** | §7.1 | Zero collection of child exact DOB, school name, residential address, or clinical history. | **PASS** |
| **Contact & Wakad Centre** | §8.0 | Verified physical NAP, commute landmarks, and operating hours (*Mon–Sat: 9:30 AM–7:30 PM*). | **PASS** |
| **Mobile-First Responsive Layouts** | §9.0 | 5 canonical widths (320px, 375px, 768px, 1024px, 1440px). Bottom 64px sticky bar with keyboard collision suppression. | **PASS** |
| **Accessibility Specifications** | §10.0 | WCAG 2.1 AA proposed target; WAI-ARIA 1.2 modal focus trap; single-H1 standard; 2.3.3 reduced-motion preference. | **PASS** |
| **AcademyOS Boundary** | §1.2, §2.2 | Strict separation of authenticated student portal (`/practice/*`, `/login`) from public web wireframes. | **PASS** |

---

## 3. Explicit Verification of Brand & Pedagogical Safeguards

1. **Brand Positioning & Copy Fidelity:**
   - *Master H1:* `"Beyond Calculation. Towards Confident Mathematical Thinking."` (Verified verbatim).
   - *Master Subheadline:* `"At Arnav Abacus Academy, mathematics is the medium to develop confident, independent, and thoughtful young learners. Guided by certified educators in small batches with a maximum of five students per batch, our structured programmes provide personalised learning, closer individual guidance, and steady mathematical progress."` (Verified verbatim).
2. **Micro-Batch Standard:**
   - Universally specified as *"maximum of five students per batch"* across all hero banners, card badges, and value proposition copy.
3. **Discovery Session Operational Reality:**
   - Explicitly framed as **approximately 45–90 minutes, free of charge, adapting to child engagement and parent discussion**.
   - Cites all 6 approved observation dimensions: *Number Sense, Arithmetic Understanding, Logical Approach, Learning Attitude, Response and Engagement, Interest and Learning Passion*.
4. **Pedagogical Independence:**
   - The 6 programme groupings (Abacus, Vedic, Mental, School Maths, IPM, Olympiad) are explicitly designated as AAA's current portfolio offerings and recommended starting points, **strictly not represented as a compulsory sequential curriculum for every child**.
5. **Prohibition of Unsupported Claims:**
   - Zero clinical, psychological, diagnostic medical, or miraculous speed calculation claims appear anywhere in the wireframe copy or structure.

---

## 4. Key Architectural & Operational Assumptions

1. **Assumption A-01 (Component Modularity):** All wireframe components will be implemented in Stage 4 as modular React 19 components with strict TypeScript prop contracts and accessible semantic HTML.
2. **Assumption A-02 (Modal Lead Pipeline):** The 4-field enquiry modal will route leads through the serverless webhook/API endpoint evaluated in `ADR-003`, logging zero PII to client-side telemetry or public stores.
3. **Assumption A-03 (Mobile Keyboard Handling):** On mobile viewports ($< 768\text{px}$), the persistent bottom sticky CTA bar will dynamically hide when virtual keyboards are triggered by form inputs, preventing layout obstruction.

---

## 5. Items Separately Recorded for Neha Patil (Academic Director)

The following academic and pedagogical items in the wireframes require Neha Patil's direct input and sign-off during Stage 4 preparation:

| Item Ref | Area | Description & Academic Dependency | Action Required from Neha Patil |
| :---: | :--- | :--- | :--- |
| **ACAD-01** | Programme Detail Syllabus | Progression ladders and level breakdowns across the 6 programmes. | Validate the level milestones and learning objectives for each course. |
| **ACAD-02** | Vedic Maths Entry Age | Minimum age eligibility for Vedic Mathematics (currently proposed as Ages 9–14). | Confirm whether 8-year-old students with strong mental arithmetic may enroll. |
| **ACAD-03** | Worksheet Previews | Selection of sample practice worksheets for public download on `/worksheets`. | Approve representative sample sheets that demonstrate AAA's visual methodology. |
| **ACAD-04** | Showcase Milestones | Verified student competition awards and milestones displayed in `/showcase`. | Confirm documentary verification references (`VER-01`) for student honors. |

---

## 6. Items Separately Recorded for Nitin Patil (Operations & Technology Lead)

The following operational and technical architecture items in the wireframes require Nitin Patil's review:

| Item Ref | Area | Description & Technical Dependency | Action Required from Nitin Patil |
| :---: | :--- | :--- | :--- |
| **TECH-01** | Lead Webhook Payload | Data schema for the 4-field enquiry submission payload. | Review and confirm the endpoint data contract and encryption in transit. |
| **TECH-02** | Map Embed Performance | Lazy loading and facade implementation for the Google Maps iframe on `/contact`. | Confirm implementation of a static map facade to prevent initial render latency. |
| **TECH-03** | Touch Target Verification | Empirical validation of 48 × 48px touch bounding boxes across mobile views. | Confirm automated axe-core/Lighthouse CI assertions in Stage 4 sprint plans. |

---

## 7. Stage-Gate Transition & Authorization for WS-06.3

> [!NOTE]
> **GATE 3.1 (PHASE 2) CLOSED & WS-06.3 COMMENCEMENT AUTHORIZED:**  
> On 03 November 2026, Neha Patil (Academic Director) and Nitin Patil (Operations & Technology Lead) formally reviewed and granted written sign-off for **WS-06.2 Wireframes & Low-Fidelity Layout Blueprints** under **`MGT-DET-S3-05`**.  
> In accordance with the Stage 3 Architecture Execution Roadmap (`AAA-S3-GOV-006`), **WS-06.3: Design System, UI Tokens & Component Specifications** is now authorized to proceed under the established documentation-only governance safeguards.

---
*Report End — Approved and Ratified by Management (`MGT-DET-S3-05`).*
