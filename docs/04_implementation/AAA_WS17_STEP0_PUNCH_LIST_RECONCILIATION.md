# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-17 STEP 0
## Document Reference: `AAA-WS17-STEP0-PUNCH-REC-01`
### Deliverable 4: Sprint 3 Observation & Punch List Reconciliation Matrix

**Document Version:** 1.0.0  
**Inspection Date:** 05-November-2026  
**Governing Baseline:** `AAA-S3-PUNCH-01` & `MGT-DET-S4-S3-CLOSURE-WS16-04`  
**Governing Pathway:** Pathway 1 (Log & Proceed to WS-17)  
**Feature Branch:** `feat/sprint3-integration`  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Protocol & Severity Classification Standards

Under the Stage 4 Sprint 3 governance framework, all management observations, audit findings, and code refinements are cataloged and prioritized using strict three-tier classification:

- **P0 — Blocking:** Defects or compliance breaches that prevent progression. (e.g., PII leaks, broken form submissions, false offline success, build/type failures). Must be resolved before any subsequent workstream is unlocked.
- **P1 — Important (Pre-Release):** Architectural optimizations, code unification, or functional improvements that do not cause runtime failures but should be resolved prior to final Sprint 3 closure.
- **P2 — Polish (Consolidation Pass):** Visual refinement, micro-copy enhancements, spacing, typography adjustments, and animation transitions that enhance parent delight. Can be resolved during the final Sprint 3 consolidation pass.

---

## 2. Reconciled Punch List Register

| Item ID | Component / Area | Description & Scope of Observation | Severity | Action Required | Resolution Target | Pre-WS17 Blocking? |
| :---: | :--- | :--- | :---: | :--- | :--- | :---: |
| **OBS-01** | `LeadForm.tsx`<br/>`DemoBookingModal.tsx` | **Hook Unification:** Unify inline `fetch('/api/discovery-intake')` to directly consume the canonical `useDiscoveryIntake` hook. | **P1** | Refactor public forms to import `useDiscoveryIntake`, eliminating duplicated state and fetch logic. | Sprint 3 Consolidation Pass | ❌ No |
| **OBS-02** | `LeadForm.tsx` | **Offline Alert Styling & Mobile Padding:** Verify amber offline notification card has 44px minimum tap target for WhatsApp button and clean padding on small viewports (320px–375px). | **P2** | Verify responsive padding (`p-4` to `p-5`) and ensure button touches do not clip. | Sprint 3 Consolidation Pass | ❌ No |
| **OBS-03** | `DemoBookingModal.tsx` | **Modal Backdrop Dismissal:** Ensure tapping outside modal backdrop smoothly resets and closes without retaining stale validation errors. | **P2** | Add backdrop click handler that resets `errorMsg` and closes cleanly. | Sprint 3 Consolidation Pass | ❌ No |
| **OBS-04** | `LeadForm.tsx` | **Hindi / Marathi Fallback Text:** Harmonize regional language templates in WhatsApp message to include the exact `leadReference` tag consistently. | **P2** | Verify Marathi (`नोंदणी क्रमांक:`) and Hindi (`रेफरेंस:`) pre-fills carry the exact assigned reference. | Sprint 3 Consolidation Pass | ❌ No |
| **OBS-05** | `src/lib/intakeGatewayEngine.ts` | **CSV Security Export Guard:** Ensure `formatCellForCsvExport` is wired to future CRM Lead Dashboard export buttons once internal admissions roster views are built. | **P1** | Wire `formatCellForCsvExport` to CRM download trigger during WS-18 / AcademyOS integration. | WS-18 Staging | ❌ No |
| **OBS-06** | Management Input | *[Reserved for Nitin Patil & Neha Patil's specific inspection bullet points]* | **P2** | Logged upon receipt from leadership. | Sprint 3 Consolidation Pass | ❌ No |

---

## 3. Reconciliation Conclusion & Stage-Gate Impact

1. **Zero P0 (Blocking) Defects Remain:**
   - False offline success has been completely eliminated.
   - All 62 automated unit and integration tests pass cleanly.
   - `tsc --noEmit` exits with Code 0.
   - `vite build` builds all 2,465 modules with Code 0.
   - AcademyOS bit-for-bit parity is 100% preserved.
2. **Path to WS-17 Execution:**
   - None of the cataloged items (OBS-01 through OBS-06) impede or conflict with building the **WS-17 Post-Submission Discovery Experience**.
   - All P1 and P2 items are scheduled for resolution during the **Sprint 3 Consolidated Polish & Hardening Pass** prior to milestone sign-off.
