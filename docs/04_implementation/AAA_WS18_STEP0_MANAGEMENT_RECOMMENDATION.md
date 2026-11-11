# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3
## Document Reference: `AAA-WS18-STEP0-MGT-REC-01`
### WS-18 Step 0: Management Synthesis & Implementation Authorization Recommendation
#### AcademyOS Roster Ingestion Sync Bridge Specification

**Document Version:** 1.0.0  
**Submission Date:** 05-November-2026  
**Governing Authority:** `MGT-DET-S4-S3-CLOSURE-INT-07`  
**Execution Stage:** Sprint 3 — WS-18 Step 0 Discovery & Validation  
**Feature Branch:** `feat/sprint3-integration`  
**Production Baseline:** `main` (🔒 **STRICTLY LOCKED** at `a21a3d1129cc17fc6650bfd04648eb91199e6fa8`)  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Summary & Context

Following the formal technical acceptance of the unified WS-16 and WS-17 integrated admissions engine under **`MGT-DET-S4-S3-CLOSURE-INT-07`**, management authorized **Option B: Initiate Discovery & Step 0 Validation for WS-18 (AcademyOS Roster Sync Bridge)**.

This document synthesizes the findings of the Step 0 discovery and security inspection (`AAA-WS18-STEP0-AUD-01`, `AAA-WS18-STEP0-SEC-01`, and `AAA-WS18-STEP0-SPEC-01`). It demonstrates that WS-18 can be implemented with complete technical isolation, protecting the live AcademyOS learning platform, maintaining ₹0.00 / month cloud expenditure, and strictly upholding children's privacy protections under the DPDP Act 2023.

---

## 2. Review of Step 0 Deliverables

| Deliverable ID | Document Title | Primary Architectural Findings & Governed Decisions | Quality Gate Status |
| :--- | :--- | :--- | :---: |
| **`AAA-WS18-STEP0-AUD-01`** | **Discovery & Dependency Audit** | Verified isolation of AcademyOS `/practice/*` routes. Established hydration bridge from CRM State 12 (`ENROLLED`) into `ApprovedEmailRecord` in `accessControl.ts`. | 🟢 **VALIDATED** |
| **`AAA-WS18-STEP0-SEC-01`** | **Security & Children's DPDP Report** | Enforced Dual-Identity Decoupling (`AAA-LEAD` to `AAA-STD`), telemetry shredding, DPDP Section 9 protections, role locks, and CSV formula export guards. | 🟢 **VALIDATED** |
| **`AAA-WS18-STEP0-SPEC-01`** | **Micro-Batch & Roster Technical Specification** | Specified data contracts, deterministic student UID numbering, strict $\le 5$ micro-batch capacity cap, and 10-test acceptance harness. | 🟢 **VALIDATED** |

---

## 3. Seven Stage 4 Hard Gates Alignment

| Hard Gate ID & Name | WS-18 Operational & Governance Contribution | Status |
| :--- | :--- | :---: |
| **`S4-HG-01`** (Commercial & Legal) | Unbundled consent and clear dual-identity separation satisfy DPDP Act 2023 Sec 6 & 9. | 🟡 Conditional Pass |
| **`S4-HG-02`** (Documentary Evidence) | Batch assignments anchor exclusively to the verified Wakad center venue or live online. | 🟡 Conditional Pass |
| **`S4-HG-03`** (Regulatory Grievance) | Roster managers embed direct grievance channel (Nitin Patil, `+91 90219 24968`). | 🟡 Conditional Pass |
| **`S4-HG-04`** (Digital Safety & DPDP) | Active student exemption from 90-day prospect purge prevents accidental educational record deletion. | 🟡 Conditional Pass |
| **`S4-HG-05`** (Perimeter Security) | Role boundaries restrict enrollment to Academic Director; CSV export guards formula injection. | 🟡 Conditional Pass |
| **`S4-HG-06`** (Pedagogical Integrity) | Micro-batch cap strictly locked to $\le 5$ students, upholding AAA core pedagogical promise. | 🟡 Conditional Pass |
| **`S4-HG-07`** (Physical Premises Logs) | Track A CAP active on-site (due 18-Nov-2026); untouched by software roster bridge. | 🟡 Conditional Pass |

---

## 4. Proposed Implementation Scope for WS-18

Upon management authorization, code implementation on `feat/sprint3-integration` will strictly construct:
1. `src/lib/academyRosterBridge.ts`:
   - Dual-identity decoupling transformer (`AAA-LEAD` to `AAA-STD`).
   - Micro-batch manager enforcing the strict maximum 5 students per batch limit.
   - Profile hydrator producing valid `ApprovedEmailRecord` entries for `accessControl.ts`.
   - CSV export transformer wiring with formula neutralization.
2. `src/lib/academyRosterBridge.test.ts`:
   - 10 automated test suites verifying capacity caps, UID monotonicity, role security, and telemetry stripping.

**Boundary Guarantee:** Practice routes (`/login`, `/practice/*`, `src/data/practiceData.ts`) will experience **zero lines modified** (100% bit-for-bit parity preserved against `main`).

---

## 5. Formal Management Determination for Ratification

Management is respectfully invited to formally approve:

### **`MGT-DET-S4-S3-STEP0-WS18-08`**
**Subject:** WS-18 Step 0 Discovery Acceptance & Implementation Authorization.  
**Ratifying Authority:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)  
**Scope of Approval:**
1. Formally accepting the WS-18 Step 0 Validation Deliverables (`AAA-WS18-STEP0-AUD-01`, `AAA-WS18-STEP0-SEC-01`, `AAA-WS18-STEP0-SPEC-01`, and `AAA-WS18-STEP0-MGT-REC-01`).
2. Ratifying the Dual-Identity Decoupling architecture and the strict micro-batch cap ($\le 5$ students/batch).
3. Authorizing code implementation strictly for WS-18 (`src/lib/academyRosterBridge.ts` and `src/lib/academyRosterBridge.test.ts`) on branch `feat/sprint3-integration`.
4. Maintaining the production branch `main` strictly locked at `a21a3d1129cc17fc6650bfd04648eb91199e6fa8`.
