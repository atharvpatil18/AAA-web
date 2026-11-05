# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3
## Document Reference: `AAA-S3-PUNCH-ACC-REC-01`
### Deliverable 5: Punch List & Technical Acceptance Reconciliation Matrix

**Document Version:** 1.0.0  
**Audit Date:** 05-November-2026  
**Governing Baseline:** Commit `6af0c0f` on branch `feat/sprint3-integration`  
**Inspected Register:** `AAA_Sprint3_Observation_and_Punch_List.md` (`AAA-S3-PUNCH-01`)  
**Production Status:** 🔒 **STRICTLY LOCKED** (`a21a3d1129cc17fc6650bfd04648eb91199e6fa8`)  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Summary & Quality Gate Protocol

In accordance with AAA Stage-Gate Governance, technical acceptance requires that all architectural inconsistencies, direct hook bypasses, and communication commitments be reconciled and resolved before a milestone is declared formally accepted.

This document classifies every observation into three strict severity levels and establishes which items must be remediated before WS-16/WS-17 formal acceptance.

---

## 2. Comprehensive Observation Reconciliation Matrix

| Item ID | Category | Component(s) | Description of Finding | Severity Level | Target Milestone Stage | Acceptance Blocking? |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: |
| **OBS-01** | **Architecture** | `LeadForm.tsx`<br/>`DemoBookingModal.tsx` | **Hook Unification Bypass:** Public forms dispatch HTTP POST requests inline rather than consuming the canonical `useDiscoveryIntake` hook. | **P1 (Important)** | Pre-Acceptance Remediation Sprint | 🟡 **YES** *(Required for WS-16 Technical Acceptance)* |
| **OBS-02** | **Integration** | `LeadForm.tsx`<br/>`DemoBookingModal.tsx`<br/>`EnquiryReceiptModal.tsx` | **Post-Submission Modal Unwired:** Public forms currently render inline legacy success cards upon HTTP 201 rather than mounting the newly built `EnquiryReceiptModal`. | **P1 (Important)** | Pre-Acceptance Remediation Sprint | 🟡 **YES** *(Required for WS-17 Milestone Acceptance)* |
| **OBS-03** | **Operations / SLA** | `EnquiryReceiptModal.tsx` | **SLA Copy Mismatch:** Promises "4 business hours" instead of previously approved "two operating hours" (Mon–Sat, 9:30 AM – 7:30 PM). | **P1 (Important)** | Pre-Acceptance Remediation Sprint | 🟡 **YES** *(Required for Business Commitment Alignment)* |
| **OBS-04** | **Pedagogy / Brand** | `ParentPreparationCard.tsx` | **Clinical Language Alignment:** Replace "diagnostic sheets" with "discovery activity sheets", "6-Dimension Evaluation" with "6-Dimension Learning Observation", and reflect positive Option D dimensions. | **P2 (Polish)** | Pre-Acceptance Remediation Sprint | ⚪ No (Recommended alongside OBS-01/03) |
| **OBS-05** | **Mobile UX / A11Y** | Modals & Cards | **Mobile Padding & Tap Targets:** Verify all interactive buttons in modals meet 44px minimum touch targets on mobile viewports (320px–375px). | **P2 (Polish)** | Consolidation Polish Pass | ⚪ No |
| **OBS-06** | **Interaction** | `AppointmentConfirmedModal`<br/>`EnquiryReceiptModal` | **Backdrop Click Dismissal:** Verify backdrop clicks smoothly dismiss without leaving keyboard focus trapped. | **P2 (Polish)** | Consolidation Polish Pass | ⚪ No |
| **OBS-07** | **Security / CRM** | `src/lib/intakeGatewayEngine.ts` | **CSV Export Guard Wiring:** Wire `formatCellForCsvExport` to internal CRM roster export buttons once staff views are staged. | **P1 (Important)** | WS-18 / CRM Staging | ⚪ No (Deferred to WS-18) |
| **OBS-08** | **Infrastructure** | Cloudflare Pages / KV | **Distributed Edge Rate Limiting:** Rate limiting is currently isolate-local; evaluate Cloudflare KV / Rate Limiting Rules for multi-POP coverage. | **P1 (Important)** | Cloud Staging Gate | ⚪ No (Zero cost ceiling preserved) |

---

## 3. Technical Acceptance Prerequisite Classification

To achieve clean, uncompromised technical acceptance across both WS-16 and WS-17:

### Group 1: Required Pre-Acceptance Remediations (P1 Items)
1. **Remediation 1 (OBS-01 & OBS-02):** Wire `LeadForm.tsx` and `DemoBookingModal.tsx` to consume `useDiscoveryIntake.ts` directly, and mount `EnquiryReceiptModal.tsx` upon receiving an HTTP 201 response.
2. **Remediation 2 (OBS-03):** Restore the parent-facing coordinator SLA to **"two operating hours"** in `EnquiryReceiptModal.tsx`.
3. **Remediation 3 (OBS-04):** Harmonize `ParentPreparationCard.tsx` with Neha Patil's approved Option D learning observation dimensions, removing clinical terms.

### Group 2: Non-Blocking Polish & Deferred Items (P2 Items)
- Viewport padding refinements and future CRM roster export wiring can proceed without holding milestone closure.
