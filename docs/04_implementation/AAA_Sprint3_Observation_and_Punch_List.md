# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3
## Document Reference: `AAA-S3-PUNCH-01`
### Sprint 3 Observation & Remediation Punch List (Non-Blocking Backlog)

**Document Version:** 1.0.0  
**Created Date:** 05-November-2026  
**Governing Authority:** `MGT-DET-S4-S3-CLOSURE-WS16-04`  
**Governing Pathway:** Pathway 1 (Log & Proceed to WS-17)  
**Feature Branch:** `feat/sprint3-integration`  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Protocol & Purpose

This register formally logs all visual, spacing, layout, micro-copy, and procedural observations recorded during management inspections of Sprint 3 staging components (`LeadForm.tsx`, `DemoBookingModal.tsx`, and future `DiscoveryExperience.tsx`).

All items logged herein are classified as **non-blocking** to the architectural progress of Sprint 3, allowing **WS-17 (Post-Submission Discovery Experience & Diagnostic Questionnaire)** to proceed immediately while ensuring every single management observation is resolved in a dedicated consolidation polish pass prior to Sprint 3 sign-off.

---

## 2. Observations & Action Items Log

| Item # | Component / Route | Type | Management Observation & Requested Change | Logged By | Priority | Target Sprint Stage | Resolution Status |
| :---: | :--- | :---: | :--- | :---: | :---: | :---: | :---: |
| **OBS-01** | `LeadForm.tsx`<br/>`DemoBookingModal.tsx` | Architectural Refactor | **Hook Unification:** Refactor public admissions forms to directly consume the canonical `useDiscoveryIntake` hook, unifying inline `fetch` logic. | Lead Architect / Ratified MGT-DET-S4-S3-INT-AUDIT-06 | P1 (Important) | CAP-INT-01 | 🟢 RESOLVED (Verified with 72/72 tests & Vite Build) |
| **OBS-02** | `LeadForm.tsx`<br/>`DemoBookingModal.tsx` | UI Integration | **Enquiry Modal Mounting:** Mount `EnquiryReceiptModal.tsx` upon receiving HTTP 201 response in both public forms rather than legacy inline text cards. | Neha Patil & Nitin Patil | P1 (Important) | CAP-INT-01 | 🟢 RESOLVED (Mounted & verified in LeadForm + DemoBookingModal) |
| **OBS-03** | `EnquiryReceiptModal.tsx` | SLA Commitment | **SLA Copy Alignment:** Restore review commitment from "4 business hours" to approved "two operating hours (Monday–Saturday, 9:30 AM – 7:30 PM)". | Nitin Patil | P1 (Important) | CAP-INT-01 | 🟢 RESOLVED (EnquiryReceiptModal updated to exact 2 operating hours) |
| **OBS-04** | `ParentPreparationCard.tsx` | Pedagogical Tone | **Option D Pedagogical Alignment:** Remove clinical terms ("diagnostic sheets", "6-Dimension Evaluation", "working memory") and reflect Neha Patil's approved Option D dimensions. | Neha Patil | P2 (Polish) | CAP-INT-01 | 🟢 RESOLVED (Option D 6-Dimension Learning Observation aligned) |
| **OBS-05** | Modals & Cards | Mobile UX / A11Y | **Mobile Padding & Touch Targets:** Verify 44px minimum touch targets and clean responsive padding on 320px–375px viewports. | Nitin Patil | P2 (Medium) | Sprint 3 Polish Pass | 🟡 Scheduled |
| **OBS-06** | `DemoBookingModal.tsx` | Interaction / UX | **Modal Backdrop Dismissal:** Ensure tapping outside modal backdrop smoothly resets and closes without retaining stale validation errors. | Neha Patil | P2 (Medium) | Sprint 3 Polish Pass | 🟡 Scheduled |

---

## 3. Resolution Verification Criteria

Before any observation is marked as **🟢 RESOLVED**:
1. Code modification must be completed on `feat/sprint3-integration`.
2. `npm run lint` (`tsc --noEmit`) and `npm run build` must exit with Code 0.
3. No regulatory, DPDP, or CCPA compliance boundaries may be relaxed.
4. Nitin Patil or Neha Patil must provide visual sign-off during Sprint 3 Consolidated Review.
