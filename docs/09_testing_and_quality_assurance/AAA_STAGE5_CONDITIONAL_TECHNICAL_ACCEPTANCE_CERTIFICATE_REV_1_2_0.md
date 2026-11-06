# ARNAV ABACUS ACADEMY (AAA) — STAGE 5 QUALITY ASSURANCE
## Revised Conditional Technical Acceptance Certificate (Revision 1.2.0)

**Certificate Reference:** `AAA-S5-CERT-GATE-01-REV-1.2.0`  
**Certificate Status:** **RATIFIED & FORMALLY SIGNED BY EXECUTIVE LEADERSHIP**  
**Certificate Classification:** **CONDITIONAL TECHNICAL ACCEPTANCE ONLY**  
*(Explicitly NOT Unconditional Technical Acceptance and NOT Production Readiness)*  
**Governing Management Determinations:** `MGT-DET-S5-QA-COND-01`, `MGT-DET-S5-RECON-02`, `MGT-DET-S5-STAGING-03-CORR-01`, and `MGT-DET-S5-REV-1.2.0-ACPT`  
**Audited Evidence Baseline Commit:** `e7d8bc7e2c590da5d1faeac0659cfef15e28a47e` (`e7d8bc7`)  
**Active Working Branch:** `feat/sprint3-integration`  
**Production Main Baseline:** `a21a3d1129cc17fc6650bfd04648eb91199e6fa8` (🔒 **STRICTLY LOCKED**)  
**Verification Function:** Internal QA Verification & Technical Review  
*(Internal engineering assessment only; explicitly NOT an external third-party audit or statutory certification)*  
**Executive Signatories:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)  
**Date of Ratification:** 06-November-2026  

---

## 1. Formal Certification Statement & Non-Production Disclaimer

> [!WARNING]
> **STRICT NON-PRODUCTION & CONDITIONALITY NOTICE:**
> This draft certificate proposes **REVISED CONDITIONAL TECHNICAL ACCEPTANCE (REV 1.2.0)** for the deliverables of Sprint 3 (`WS-16`, `WS-17`, and `WS-18`) on the feature branch `feat/sprint3-integration` at commit `e7d8bc7`.
> 
> **THIS CERTIFICATE DOES NOT:**
> 1. Authorise merging `feat/sprint3-integration` into production `main`.
> 2. Authorise deploying code or applying migrations to any live production environment.
> 3. Certify unconditional technical acceptance or general production readiness.
> 4. Unlock the production `main` branch, which remains strictly locked at `a21a3d1129cc17fc6650bfd04648eb91199e6fa8`.

Conditional acceptance is proposed solely on the basis of internal QA review of live execution evidence on the isolated Supabase Mumbai staging database (`ghbjtmfskgcraxafhlch`, AWS `ap-south-1`) for capacity enforcement (`QA-CAP-01`) and a synthetic canary restore drill (`QA-INF-02`). 

All remaining pre-requisite conditions, operational variances, and feature-specific restrictions detailed in this certificate remain in full effect.

---

## 2. Reconciled Ten-Gate Status Register (Gates A through J)

| Gate | Focus Area | Verified Scope & Evidence Reference | Gate Status | Operational / Technical Limitations |
| :---: | :--- | :--- | :---: | :--- |
| **Gate A** | **Governance & Scope Lineage** | Documented determinations from `MGT-DET-S4-S3-PLAN-01` through `MGT-DET-S5-STAGING-03-CORR-01`. Git commit chronology verified. | 🟢 **PASS** | Governance lineage complete. Zero retrospective backdating. |
| **Gate B** | **Source Control & Production Isolation** | Production `main` locked at `a21a3d1129cc17fc6650bfd04648eb91199e6fa8`. 8 core AcademyOS practice files match `main` bit-for-bit. | 🟢 **PASS** | Production lock must remain maintained. (See Section 3 for qualified parity analysis). |
| **Gate C** | **WS-16 Admissions Intake Gateway** | `useDiscoveryIntake` hook, honeypot defenses, anti-formula sanitization, and sequence allocation verified in 22 automated tests. | 🟡 **CONDITIONAL PASS** | **Pre-Campaign Condition (`QA-INT-02`):** 50-concurrency PostgREST load benchmark required prior to paid digital ad campaigns. **Pre-Merge Blocker (`QA-WS-16`):** End-to-end HTTPS staging persistence smoke test required prior to merge. |
| **Gate D** | **WS-17 Parent Journey & Modals** | Two-tier modal architecture. Tier 1 receipt with 2-operating-hour SLA; Tier 2 confirmed appointment with RFC 5545 `.ics` download. | 🟢 **PASS** | Fully verified in staging harness; 10/10 automated tests pass cleanly. |
| **Gate E** | **WS-18 Identity & Roster Bridge** | Decoupling of Lead ID (`AAA-LEAD-*`) from Student ID (`AAA-STD-*`). Sibling enrollment array implemented in `ApprovedEmailRecord`. | 🟡 **CONDITIONAL PASS** | **Attribution Restriction (`QA-WS-18`):** Sibling *enrolment* data structures are supported, but individual practice session and quiz history attribution in AcademyOS is **NOT certified separated** (See Section 4). |
| **Gate F** | **Batch Capacity & Concurrency (`QA-CAP-01`)** | PostgreSQL 17.11 check constraint `chk_max_batch_capacity` and two-process asynchronous race verified live via `CAP01_LIVE_OUTPUT.log`. | 🟢 **PASS** | Verified exclusively on Supabase Mumbai pooler connection path (`aws-0-ap-south-1.pooler.supabase.com:5432`). |
| **Gate G** | **Security & Access Control** | Formula injection characters sanitized; honeypot bot trap active; root administrative actions require OTP authentication. | 🟢 **PASS** | Zero credential leaks; zero PII in telemetry. |
| **Gate H** | **Privacy, Consent & Statutory Claims** | DPDP Act 2023 Section 6 unbundled consent implemented. Hyperbolic marketing claims purged from copy. | 🟡 **CONDITIONAL PASS** | **Online Payment Gateway Condition (`QA-LEG-01`):** Written sign-off from Indian legal counsel in Pune required prior to online payment gateway activation and fee claims. Existing offline fee collection remains unaffected (See Section 6). |
| **Gate I** | **AcademyOS Parity & Accessibility** | 8 dedicated practice platform files have 0 bytes diff against `main`. 44px internal design target implemented for touch targets. | 🟢 **PASS** | Qualified parity applies (Section 3). 44px touch targets reflect internal design goals, not formal WCAG 2.1 AA conformance certification (Section 7). |
| **Gate J** | **Planned Infrastructure Spend & Backup Readiness (`QA-INF-02`)** | Planned spend modeled on free tiers; synthetic canary backup, GPG AES-256 encryption, and restore drill verified in 0.35s on staging. | 🟡 **CONDITIONAL PASS (Canary Drill Only)** | **Disaster Recovery Limitation:** Canary restore is NOT proof of full-database recovery or automated backup scheduling (Section 5). Operates under approved 24h temporary risk variance. Cloud spend subject to usage allowances (Section 8). |

---

## 3. Qualified AcademyOS Parity & Boundary Analysis

The claim of AcademyOS non-regression is strictly qualified as follows:

### 3.1 Unmodified Core Practice Files (0 Bytes Diff)
The following 8 core files responsible for the student learning platform and ERP were cryptographically compared against baseline commit `a21a3d1129cc17fc6650bfd04648eb91199e6fa8` using `git diff`:
1. `src/pages/PracticeHub.tsx` — **0 bytes diff**
2. `src/pages/PracticeSession.tsx` — **0 bytes diff**
3. `src/pages/PracticeResult.tsx` — **0 bytes diff**
4. `src/pages/Login.tsx` — **0 bytes diff**
5. `src/data/practiceData.ts` — **0 bytes diff**
6. `src/components/PracticeNavbar.tsx` — **0 bytes diff**
7. `src/components/AbacusSimulator.tsx` — **0 bytes diff**
8. `src/lib/AuthContext.tsx` — **0 bytes diff**

### 3.2 Modified Shared Files & Scope Boundary
"Unrestricted zero drift" across the entire repository does **not** exist because shared utility, authorization, and type files were updated to support Sprint 3 requirements:
- `src/lib/accessControl.ts` (42 lines modified): Added support for `EnrolledSiblingSummary` and multi-student array normalization to resolve sibling email collisions.
- `src/types.ts` (8 lines modified): Added `studentUid` and `students?: EnrolledSiblingSummary[]` to `ApprovedEmailRecord`.
- Public portal routes, UI components, and CRM utilities (61 files changed in total).

**Parity Determination:** AcademyOS practice platform runtime code is verified 100% untouched across the 8 frozen practice paths. However, because shared authorization and type files were modified, AcademyOS boundary isolation is certified **only with respect to these 8 specified files**, not as an unrestricted whole-codebase zero drift.

---

## 4. Multi-Sibling Practice Attribution Restriction

In accordance with Section 2.B of Management Directive `MGT-DET-S5-STAGING-03-CORR-01`:

1. **Enrolment Support Verified:** Sibling enrollment under a single parent contact email is supported in `academyRosterBridge.ts` and `accessControl.ts`. Parents enrolling multiple children retain distinct student profiles in the intake data structure.
2. **Practice History Attribution NOT Separated:**
   - Within `src/pages/PracticeHub.tsx`, `PracticeSession.tsx`, and `PracticeResult.tsx`, student attempt histories, guest sessions, and leaderboard scores are keyed strictly on `currentUser?.email` from `AuthContext.tsx` or `localStorage.getItem("aaa_guest_user")`.
   - Because the AcademyOS practice platform files were frozen to prevent regressions, **student-level attribution by `studentUid` has not been implemented inside the practice runner**.
   - If two siblings log in using their parent's email credentials, their practice drills, accuracy scores, and test histories will intermix under that single email identity.
3. **Mandatory Restriction:**
   > [!IMPORTANT]
   > Complete sibling practice-history separation is **EXPLICITLY NOT CERTIFIED**. 
   > Multi-sibling practice attribution remains **RESTRICTED AND CONDITIONAL** until Phase 2, when a student profile switcher is formally added to `PracticeHub.tsx` under an authorized AcademyOS change ticket.

---

## 5. Disaster Recovery, RPO & RTO Architectural Truth

In accordance with Section 2.A and Section 3 of Management Directive `MGT-DET-S5-STAGING-03-CORR-01`:

### 5.1 RPO Separation & Temporary Risk Variance
- **Database RPO (Approved Temporary Risk Variance):** The 24-hour database figure represents an **approved temporary management risk variance (Pathway 3A)**, NOT a demonstrated or guaranteed continuous recovery capability. Because automated scheduled backups are not verified on the Supabase Free Tier, the maximum data loss window in a disaster scenario remains up to 24 hours until automated daily exports are deployed.
- **Admission Lead Recovery (Operational Channel):** Dispatch of inquiry notifications to academy staff via WhatsApp is an operational alert channel, **NOT an ACID-compliant database backup or a zero-second RPO guarantee**. WhatsApp dispatch lacks automated delivery reconciliation, offline retry queues, and cryptographic audit logging. True lead durability depends exclusively on PostgreSQL database persistence.

### 5.2 Scope & Limitations of the Canary Restore Drill (`QA-INF-02`)
- **Canary Scope Only:** The restore drill executed at commit `e7d8bc7` dumped, encrypted, dropped, decrypted, and restored **only the synthetic table `public.canary_audit`** (2,931 bytes). Zero production or academy-roster tables (`micro_batches`, `batch_enrollments`) were dropped or restored.
- **Canary Restore $\ne$ Full Academy Disaster Recovery Proof:** Successful restoration of a single synthetic table does **not** prove full database restoration, multi-table foreign-key cascade recovery, trigger restoration, or point-in-time consistency.
- **RTO Limitation:** The measured duration of 0.35 seconds applies strictly to a 2.9 KB canary archive. **No 30-minute full-database RTO has been independently established** for production-scale datasets.
- **Backup Schedule Limitation:** Automated daily backup scheduling and full-database disaster recovery remain **UNVERIFIED** pending post-launch automation.

---

## 6. Commercial Tuition Fee Governance (`QA-LEG-01`)

In accordance with Section 2 of Management Directive `MGT-DET-S5-STAGING-03-CORR-01`:

1. **Scope of Restriction:** Hardening condition `QA-LEG-01` restricts **online payment gateway activation and public online fee claims** until formal written sign-off is provided by practicing Indian legal counsel in Pune approving the public Parent Registration Deed, CCPA Tuition Refund Policy, and DPDP Act 2023 consent clauses.
2. **Offline Academy Fees Unaffected:** This restriction applies strictly to digital website payment processing. It **does NOT restrict or invalidate existing offline academy fee collection** (such as in-person cash, cheque, or direct center UPI payments) established under standard academy operational procedures, unless separate legal or management counsel specifically directs otherwise.
3. **Public Inquiries Permitted:** Public website lead capture, diagnostic assessment scheduling, and educational inquiries remain fully permitted prior to legal sign-off.

---

## 7. Accessibility Design Target vs. WCAG Conformance

1. **Design Target Statement:** AAA has configured interactive touch targets (modal close buttons, program tabs, CTA buttons) to meet an internal design target of **$\ge 44\text{px} \times 44\text{px}$** to optimize ergonomics for mobile users in Wakad.
2. **Non-Certification of WCAG 2.1 AA:** Achieving 44px touch targets on selected controls does **not** constitute formal certification of full WCAG 2.1 AA compliance.
3. **Remaining Accessibility Requirements:** Formal WCAG 2.1 AA conformance requires a comprehensive accessibility audit, including full screen reader validation (VoiceOver / TalkBack), automated axe-core/Lighthouse accessibility audits, keyboard focus trap regression testing, and color contrast verification across all responsive viewports, scheduled for post-launch Phase 2.

---

## 8. Staging vs. Production Infrastructure & Planned Cloud Spend

### 8.1 Infrastructure Boundary & Production Status
- **Verified Staging Project Only:** The Free Tier, PostgreSQL 17.11 engine, and AWS Mumbai (`ap-south-1`) region configurations were verified **strictly on the isolated staging instance** (`ghbjtmfskgcraxafhlch`).
- **Production Infrastructure Unverified:** The production Supabase project provider, tier/plan, hosting region, compute allocations, and backup configurations are **UNVERIFIED** as production has not been accessed during this audit. Production access remains strictly prohibited.

### 8.2 Planned Cloud Spend & Usage Limit Disclosure
- **Qualified Planned Cost:** The "₹0.00 / month" figure is a **planned cost projection based on free-tier allowances**, not an unconditional operational guarantee.
- **Usage Limits & Upgrade Risks:** Continued zero-cost operation depends on remaining within provider free-tier usage ceilings:
  - *Cloudflare Pages:* 500 builds/month, standard bandwidth allowances.
  - *Supabase Free Tier:* 500 MB database storage, 50,000 monthly active users, 2 concurrent connection limits on direct ports, and project pausing after 7 days of inactivity.
- If inquiry volume or database growth breaches these allowances, operational spend will predictably transition to paid tiers (~₹2,100 / month).

---

## 9. Git Working-Tree & Commit Evidence Baseline

In accordance with Section 2.D of Management Directive `MGT-DET-S5-STAGING-03-CORR-01`:

- **Audited Commit Identity:** `e7d8bc7e2c590da5d1faeac0659cfef15e28a47e` (`e7d8bc7`)
- **Active Branch:** `feat/sprint3-integration`
- **Actual Working Tree Status (`git status --short`):**
  ```
  ?? docs/04_implementation/AAA_STAGE5_CERTIFICATE_ISSUANCE_RECOMMENDATION.md
  ?? docs/04_implementation/AAA_STAGE5_GATE_STATUS_RECONCILIATION.md
  ?? docs/04_implementation/AAA_STAGE5_LIVE_EVIDENCE_INDEPENDENT_VERIFICATION.md
  ?? docs/09_testing_and_quality_assurance/AAA_STAGE5_CONDITIONAL_TECHNICAL_ACCEPTANCE_CERTIFICATE_REV_1_2_0.md
  ?? docs/09_testing_and_quality_assurance/AAA_STAGE5_MANAGEMENT_DETERMINATION_REV_1_2_0.md
  ?? docs/09_testing_and_quality_assurance/AAA_STAGE5_OPEN_CONDITIONS_AND_CLOSURE_REGISTER.md
  ```
- **Document Status Reconciliation:** 
  - The working tree is **NOT clean**.
  - Six governance and verification documents exist as **uncommitted, untracked files** in `docs/`.
  - In strict compliance with restrictions, these documents have **not been committed, added, merged, or pushed**.
  - All verified execution claims trace directly to committed files and logs at baseline `e7d8bc7`.

---

## 10. Stage Gate Sign-Off & Governance Endorsement Block

**Verified and Formally Certified by:**  
*Internal QA Review Team*  
Date: 06-November-2026  

**Ratified, Formally Approved & Signed by Executive Leadership:**  
Subject to all open conditions recorded in `AAA_STAGE5_OPEN_CONDITIONS_AND_CLOSURE_REGISTER.md`.

```
[ RATIFIED & SIGNED BY EXECUTIVE LEADERSHIP ]

Nitin Patil
Operations, Technology & Compliance Lead
Arnav Abacus Academy, Wakad, Pune
Date: 06-November-2026

Neha Patil
Founder & Academic Director
Arnav Abacus Academy, Wakad, Pune
Date: 06-November-2026
```
