# ARNAV ABACUS ACADEMY (AAA)
## Stage 3 Architecture & Design — Workstream WS-06.4
### Mobile Conversion & Thumb-Zone Specification Validation Report

**Document Reference:** `AAA-S3-VAL-WS06-04`  
**Date:** 03 November 2026  
**Status:** 🟢 **APPROVED & RATIFIED BY MANAGEMENT (`MGT-DET-S3-07`)**  
**Author:** AI Technical Architecture Agent  
**Governance Authority:** Neha Patil (Academic Director) & Nitin Patil (Operations & Technology Lead)  
**Deliverable Accompanied:** [`AAA_WS06_Mobile_Conversion_and_ThumbZone_Spec.md`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/docs/03_solution_architecture/AAA_WS06_Mobile_Conversion_and_ThumbZone_Spec.md) (`AAA-S3-SPEC-WS06-04`)  
**Baseline Git Commit:** `b14c64189fe5aa8e5421a548f41cd1a9626d73ef`  

---

## 1. Executive Summary & Prerequisite Audit

### 1.1 Governance Verification
Before authoring the WS-06.4 Mobile Conversion & Thumb-Zone Specification, a formal audit of prerequisite stage-gate approvals was conducted:
- **`MGT-DET-S3-06` Ratification:** Formally confirmed that Neha Patil (Academic Director) and Nitin Patil (Operations & Technology Lead) executed written sign-off on 03 November 2026, approving Determinations 1, 2, and 3:
  1. *Determination 1:* Approved cognitive color tokens (`ACAD-01`) and line icon concepts for the 6 Educational Observation Dimensions (`ACAD-02`).
  2. *Determination 2:* Approved Tailwind v4 theme integration (`TECH-01`), native focus-trapping utility (`TECH-02`), and mobile virtual keyboard auto-suppression (`TECH-03`).
  3. *Determination 3:* Formally reconciled WS-06 into a six-deliverable sequence (`WS-06.1` through `WS-06.6`), confirmed `WS-06.3` as an authorized expansion of the Component Hierarchy, and authorized commencement of `WS-06.4`.
- **Stage-Gate Register Alignment:** Verified that Gate 3.1 Phase 3 was formally closed in `AAA_Stage3_Management_Approval_and_Gate_Register.md`.

**Prerequisite Audit Result:** PASS. All governance mandates and prerequisite approvals are satisfied.

---

## 2. Rigorous Categorization of Information

In accordance with Section 6 of the prompt, the contents of the WS-06.4 architecture deliverable are transparently categorized into five distinct tiers:

### 2.1 Repository-Verified Facts (Empirically Inspected in Codebase)
1. **Audited Route Inventory:** Exactly 30 React Router routes (27 static, 2 dynamic parameterised `/blog/:slug` and `/campaigns/:slug`, 1 wildcard `*`), plus 1 client-side legacy hash handler (`<LegacyHashRedirector />`) exist in `src/App.tsx`.
2. **Current Styling Architecture:** Tailwind CSS v4 is configured via `@import "tailwindcss";` and `@theme` directives inside `src/index.css`.
3. **Telemetry Tag:** Google Analytics 4 tracking ID `G-M2EL9MYSRL` is configured in `index.html` and `src/lib/analytics.ts`.
4. **Sole Authentic Contact Information:** Phone and WhatsApp number `+91 90219 24968` is verified across all codebase component links (`Navbar.tsx`, `FloatingCTA.tsx`, `Footer.tsx`, `Contact.tsx`). An earlier documentation reference to an unverified number (`+91 94038 84844`) was factually incorrect and has been purged.
5. **AcademyOS Routes:** Authenticated practice engine resides under `/practice`, `/practice/session`, `/practice/results`, and `/login`.

### 2.2 Ratified Management Decisions (Binding Baselines)
1. **Master Website Headline (H1):** Strictly verbatim: `"Beyond Calculation. Towards Confident Mathematical Thinking."` (`DEC-WS02-13`).
2. **Master Website Subheadline:** Strictly verbatim: `"At Arnav Abacus Academy, mathematics is the medium to develop confident, independent, and thoughtful young learners. Guided by certified educators in small batches with a maximum of five students per batch, our structured programmes provide personalised learning, closer individual guidance, and steady mathematical progress."` (`DEC-WS02-13`).
3. **Micro-Batch Standard:** Universally enforced as *"maximum of five students per batch"* (`DEC-WS02-04`).
4. **Service Naming & Established Practice:** **AAA Personalised Learning Discovery Session**, free of charge, approximately 45–90 minutes depending on child engagement, educational observation across 6 approved dimensions (`DEC-WS02-06`).
5. **Four-Field Maximum Enquiry Modal Contract:** 1. Parent Name, 2. Mobile/WhatsApp, 3. Child Age Bracket OR School Grade, 4. Optional Programme, with unbundled dual consent (`DEC-WS02-07`, `MGT-DET-S3-04`).
6. **Operating Hours:** Monday – Saturday: 9:30 AM – 7:30 PM (`MGT-DET-S3-01`).
7. **Social Proof Reference:** 74+ verified 5-star Google reviews (4.9★), dated November 2026 and refreshable upon management review.

### 2.3 Design Proposals (Architectural Blueprints in WS-06.4)
1. **Seven-State Mobile Journey Model:** FSM transitioning from S1 (Landing) $\rightarrow$ S2 (Programme Exploration) $\rightarrow$ S3 (Modal Intake) $\rightarrow$ S5 (Enquiry Submitted) $\rightarrow$ S6 (Scheduling Outreach) $\rightarrow$ S7 (Appointment Confirmed).
2. **Ergonomic Thumb-Zone Layout:** Layouts engineered for 320px, 375px, and 430px widths prioritizing the bottom 30% viewport zone.
3. **Sticky Action Bar State Machine:** Dynamic scroll listener (`scrollY >= 120px` show, scroll-up hide, form input focus auto-suppress).
4. **80px Bottom Padding Layout Buffer:** Enforced layout margin on `<main>` (`pb-20`) to eliminate sticky bar content collision.
5. **Single-Column Mobile Form Layout:** Linear vertical stack with auto-formatting for 10-digit Indian mobile numbers.
6. **Honest Confirmation Presentation:** Clear framing that enquiry submission is an admissions request, not a confirmed appointment.

### 2.4 Assumptions (Architectural Presumptions)
1. **Assumption A-01 (Tailwind v4 Build Health):** All mobile utility classes (`h-12`, `pb-20`, `touch-manipulation`) compile smoothly without custom plugins.
2. **Assumption A-02 (Native Focus Trapping):** A custom, dependency-free React hook will handle modal keyboard trapping without third-party npm libraries.
3. **Assumption A-03 (Visual Viewport API Support):** Modern mobile browsers (iOS 13+ Safari, Chrome 61+ Android) support `window.visualViewport` for keyboard resize detection.

### 2.5 Unresolved Questions & Legal Placeholders
1. **Item U-01 (DPDP Minor Consent Wording):** Formal legal language governing consent for processing minor child educational profiles under India's Digital Personal Data Protection (DPDP) Act remains subject to qualified legal review under WS-10.
2. **Item U-02 (International Mobile Numbers):** Whether prospective NRI or relocating parents with non-Indian country codes should be accommodated in the mobile form or directed exclusively to WhatsApp. (Recommendation: Retain 10-digit Indian format as default, with direct WhatsApp link for international parents).

---

## 3. Runtime Verification Status & Device Testing Obligations

> [!CAUTION]
> **CRITICAL TRANSPARENCY SAFEGUARD:**  
> In accordance with Stage 3 governance rules, **no design requirement or test scenario in WS-06.4 is reported as runtime passed**.  
> The 10 test scenarios below (`MOB-01` through `MOB-10`) are **Formal Testing Obligations** to be executed on physical devices and automated CI pipelines during **Stage 4 Implementation**:

| Test ID | Scenario Description | Target Device / Platform | Verification Obligation | Current Runtime Status |
| :--- | :--- | :--- | :--- | :---: |
| **`MOB-01`** | 320px Compact Layout & Reflow | iPhone SE (1st gen) / Safari | Zero horizontal scroll; text wraps cleanly; buttons 100% width. | 📋 **TEST SPECIFIED (Stage 4 Execution Required)** |
| **`MOB-02`** | iOS Virtual Keyboard Overlap | iPhone 14 / Safari | Sticky bar hides on input focus; active input remains visible. | 📋 **TEST SPECIFIED (Stage 4 Execution Required)** |
| **`MOB-03`** | Android Virtual Keyboard Overlap | Pixel 7 / Chrome | `visualViewport` resize handled; submit button not obstructed. | 📋 **TEST SPECIFIED (Stage 4 Execution Required)** |
| **`MOB-04`** | Touch Target Bounding Box ($\ge 48\text{px}$) | Automated axe-core / Chrome | All interactive elements meet or exceed 48 × 48 CSS pixels. | 📋 **TEST SPECIFIED (Stage 4 Execution Required)** |
| **`MOB-05`** | Modal Focus Trap & Return Focus | Hardware Keyboard / iPad | Tab cycles within modal; Escape closes and restores focus. | 📋 **TEST SPECIFIED (Stage 4 Execution Required)** |
| **`MOB-06`** | Navigation Drawer Screen Reader | iOS VoiceOver | Announces "Site Navigation"; expanded/collapsed states clear. | 📋 **TEST SPECIFIED (Stage 4 Execution Required)** |
| **`MOB-07`** | Form Error Screen Reader Announcement | Android TalkBack | Errors announced via `aria-live`; focus shifts to first invalid. | 📋 **TEST SPECIFIED (Stage 4 Execution Required)** |
| **`MOB-08`** | Landscape Orientation Reflow | iPhone / Safari Landscape | Modal fits max-height 85vh with smooth internal scroll. | 📋 **TEST SPECIFIED (Stage 4 Execution Required)** |
| **`MOB-09`** | Reduced Motion Preference | `prefers-reduced-motion` | Sticky bar and modal open with 0ms transition; zero jank. | 📋 **TEST SPECIFIED (Stage 4 Execution Required)** |
| **`MOB-10`** | System Safe Area Padding | iPhone 15 Pro Max | 34px bottom home bar accounted for; 80px body buffer safe. | 📋 **TEST SPECIFIED (Stage 4 Execution Required)** |

---

## 4. Workstream Reconciled Phasing Status

Following the deliverable sequence reconciliation ratified under `MGT-DET-S3-06`, the status of the WS-06 delivery series is as follows:

| Deliverable ID | Workstream Sub-Phase | Document Reference | Governance Status |
| :--- | :--- | :--- | :---: |
| **`WS-06.1`** | Information Architecture & Sitemap Specification | `AAA-S3-SPEC-WS06-01` | 🟢 **RATIFIED** (`MGT-DET-S3-04`) |
| **`WS-06.2`** | Wireframes & Low-Fidelity Layout Blueprints | `AAA-S3-SPEC-WS06-02` | 🟢 **RATIFIED** (`MGT-DET-S3-05`) |
| **`WS-06.3`** | Design System, UI Tokens & Component Specifications | `AAA-S3-SPEC-WS06-03` | 🟢 **RATIFIED** (`MGT-DET-S3-06`) |
| **`WS-06.4`** | Mobile Conversion & Thumb-Zone Specification | `AAA-S3-SPEC-WS06-04` | 🟢 **RATIFIED** (`MGT-DET-S3-07`) |
| **`WS-06.5`** | Local SEO Metadata & Route Preservation Specification | `AAA-S3-SPEC-WS06-05` | 🔒 **QUEUED** (Authorized Next Step) |
| **`WS-06.6`** | Copy, Brand Voice & Messaging Specification | `AAA-S3-SPEC-WS06-06` | 🔒 **QUEUED** |

---

## 5. Management Review Items & Decision Register Entry (`MGT-DET-S3-07`)

The following formal determinations were executed and signed off by **Neha Patil** and **Nitin Patil** on 03 November 2026:

```
========================================================================================
MANAGEMENT DETERMINATION RECORD: MGT-DET-S3-07
Subject: Approval of WS-06.4 Mobile Conversion & Thumb-Zone Specification
Execution Date: 03 November 2026
Signatories: Neha Patil (Academic Director) & Nitin Patil (Operations & Technology Lead)
========================================================================================

[X] DETERMINATION 1 — ACADEMIC POSITIONING & DISCOVERY CONFIRMATION (Neha Patil)
    - Confirms the mobile framing of the AAA Personalised Learning Discovery Session.
    - Confirms that enquiry submission is clearly communicated as a request awaiting 
      personal scheduling, not an automated appointment confirmation.
    - Confirms the mobile presentation of the 6 Educational Observation Dimensions.
    Decision: [X] APPROVED    [  ] APPROVED WITH AMENDMENTS    [  ] REJECTED
    Sign-off: Neha Patil (Founder & Academic Director) — Signed 03-Nov-2026

[X] DETERMINATION 2 — TECHNICAL & ERGONOMIC SPECIFICATION APPROVAL (Nitin Patil)
    - Approves the 7-state mobile parent journey and FSM model.
    - Approves thumb-zone specifications across 320px, 375px, and 430px viewports.
    - Approves the <StickyMobileBar /> state machine, keyboard auto-suppression,
      and 80px bottom padding buffer.
    - Approves the 10-point mobile device testing matrix for Stage 4 execution.
    - Approves the zero-PII mobile telemetry parameter schema.
    Decision: [X] APPROVED    [  ] APPROVED WITH AMENDMENTS    [  ] REJECTED
    Sign-off: Nitin Patil (Operations & Technology Lead) — Signed 03-Nov-2026

[X] DETERMINATION 3 — WORKSTREAM TRANSITION AUTHORIZATION
    - Formally ratifies WS-06.4.
    - Authorizes commencement of WS-06.5 (Local SEO Metadata & Route Preservation Spec).
    Decision: [X] APPROVED    [  ] APPROVED WITH AMENDMENTS    [  ] REJECTED
    Sign-off: Jointly Ratified by Neha Patil & Nitin Patil — Signed 03-Nov-2026
========================================================================================
```

---

## 6. Stage-Gate Transition & Authorization for WS-06.5

> [!NOTE]
> **GATE 3.1 (PHASE 4) CLOSED & WS-06.5 COMMENCEMENT AUTHORIZED:**  
> On 03 November 2026, Neha Patil and Nitin Patil executed formal sign-off under **`MGT-DET-S3-07`**.  
> **WS-06.4: Mobile Conversion & Thumb-Zone Specification** is now **formally ratified and closed**.  
> In accordance with the reconciled roadmap, **WS-06.5: Local SEO Metadata & Route Preservation Specification** is now authorized to commence under strict documentation-only governance safeguards.

---
*Report End — Approved and Ratified by Management (`MGT-DET-S3-07`).*
