# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-17 STEP 0
## Document Reference: `AAA-WS17-STEP0-MGT-REC-01`
### Deliverable 5: Management Implementation Readiness Recommendation

**Document Version:** 1.0.0  
**Date of Recommendation:** 05-November-2026  
**Governing Authority:** `MGT-DET-S4-S3-CLOSURE-WS16-04`  
**Governing Baseline:** `AAA-WS17-STEP0-VERIF-WS16-01` through `AAA-WS17-STEP0-PUNCH-REC-01`  
**Feature Branch:** `feat/sprint3-integration` (Commit `b68aa30`)  
**Production Status:** 🔒 **STRICTLY LOCKED** (`a21a3d1129cc17fc6650bfd04648eb91199e6fa8`)  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Summary & Recommendation Overview

Following the rigorous completion of the **Sprint 3 WS-17 Step 0 Dependency, Scope, and Parent Journey Validation**, this report provides the formal architectural recommendation for management sign-off.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        FINAL MANAGEMENT READINESS DECISION                             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                       🟢 RECOMMENDATION: OPTION B                                      │
│                                                                                        │
│        "WS-17 IS READY FOR IMPLEMENTATION AFTER SPECIFIED SCOPE CLARIFICATIONS"        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Comprehensive State-of-the-System Summary

### 2.1 WS-16 Administrative vs. Technical Acceptance Status
- **Administrative Closure:** Formally ratified under `MGT-DET-S4-S3-CLOSURE-WS16-04`.
- **Functional & Security Verification:** 100% verified. False offline success has been eliminated; rate limiting, idempotency, and anti-bot traps are operational; 62/62 automated tests pass; `tsc` and `vite build` compile with Code 0; zero PII leaks; zero AcademyOS diff.
- **Identified Architectural Divergence:** The public forms (`LeadForm.tsx` and `DemoBookingModal.tsx`) implement gateway fetch calls inline rather than importing `useDiscoveryIntake.ts`. This divergence is classified as **P1 Technical Debt** and is scheduled for resolution in the Sprint 3 consolidation polish pass. It does **not** block WS-17.

### 2.2 Outstanding CAP-WS16-01 Items
- **Supabase Cloud Secret Provisioning:** The code supports PostgREST RPC integration with Supabase Mumbai (`fn_submit_discovery_lead`). Secrets are intentionally unprovisioned in git to preserve the zero-cloud-spend boundary.
- **Physical Document Audits (Track A):** The 10-working-day correction period for on-site physical fire inspection and first-aid logs remains active through 18-Nov-2026 under `MGT-DET-S4-01`.

---

## 3. The Necessary WS-17 Scope Clarifications (Why Option B is Mandated)

Original colloquial descriptions assumed that upon initial web inquiry, the system would immediately issue a "Class Booking Confirmation" with an `.ics` calendar appointment.

Our Step 0 parent journey audit proved that **an initial web inquiry is NOT a confirmed appointment**:
1. **Pedagogical Integrity:** Neha Patil personally evaluates child age, school curriculum, and finger-counting habits to recommend optimal batch placement (max 5 students/batch).
2. **Anti-Deceptive Standard (CCPA 2024):** Generating an `.ics` calendar invitation with a placeholder or unconfirmed time creates parental confusion and violates consumer protection principles.

### Revised Two-Tier WS-17 Architecture:
- **Component 17A: `EnquiryReceiptModal.tsx` (Fires on HTTP 201):**  
  Presents the authoritative Lead Reference (`AAA-LEAD-YYYY-[00001]`), explains that scheduling is *Pending Coordination*, details the 4-hour educator review SLA, provides a 1-click WhatsApp accelerator to Neha Patil (`+91 90219 24968`), and displays the Parent Preparation Tips.
- **Component 17B: `AppointmentConfirmedModal.tsx` + `calendarInviteGenerator.ts` (Fires ONLY when confirmed):**  
  Triggered when an appointment possesses an explicit date, time, and venue. Generates the RFC 5545 `.ics` file with verified Wakad Center venue details (`Balaji Sagar Bungalow, Wakad, Pune 411057`).
- **Component 17C: `ParentPreparationCard.tsx`:**  
  Actionable checklist preparing the child for a fun, stress-free diagnostic session.

---

## 4. Workstream Governance Envelope

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        STAGE 4 SPRINT 3 GOVERNANCE CONTROLS                            │
├────────────────────────────────────────┬───────────────────────────────────────────────┤
│ Governance Area                        │ Enforcement Status                            │
├────────────────────────────────────────┼───────────────────────────────────────────────┤
│ Workstream 16 (Gateway Wiring)         │ Formally Closed; Refinements in Punch List    │
│ Workstream 17 (Post-Submission UX)     │ Ready for Implementation under Option B       │
│ Workstream 18 (AcademyOS Roster Sync)  │ 🔒 STRICTLY IMPLEMENTATION-BLOCKED            │
│ Production Branch (`main`)             │ 🔒 STRICTLY LOCKED (a21a3d1129cc)             │
│ Active Staging Branch                  │ `feat/sprint3-integration`                    │
│ Total Cloud Operating Cost             │ STRICTLY ₹0.00 / month                        │
└────────────────────────────────────────┴───────────────────────────────────────────────┘
```

---

## 5. Formal Determination Draft for Management Adoption

Upon review, Nitin Patil and Neha Patil may formally enact the following determination:

> **"Nitin and Neha approve Determination MGT-DET-S4-S3-STEP0-WS17-05:**  
> 1. **Formally accepting the WS-17 Step 0 Validation Deliverables (`AAA-WS17-STEP0-VERIF-WS16-01` through `AAA-WS17-STEP0-MGT-REC-01`).**  
> 2. **Adopting Recommendation Option B: approving the revised two-tier post-submission architecture (separating Enquiry Acknowledgment from Confirmed Appointment Calendar Generation).**  
> 3. **Affirming that the hook unification (`useDiscoveryIntake`) is cataloged in the Punch List (`AAA-S3-PUNCH-01`) as item `OBS-01` for resolution during the Sprint 3 consolidation pass.**  
> 4. **Authorizing code implementation strictly for WS-17 (EnquiryReceiptModal, AppointmentConfirmedModal, ParentPreparationCard, calendarInviteGenerator, and test harness) on branch `feat/sprint3-integration`.**  
> 5. **Maintaining WS-18 strictly implementation-blocked, and keeping production `main` strictly locked."**
