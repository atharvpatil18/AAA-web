# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# FINAL WS-06 APPROVAL PACK CORRECTION REPORT

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S3-REP-002`  
**Stage:** Stage 3 — Architecture & Design  
**Governance Authority:** Neha Patil (Academic Director) & Nitin Patil (Operations & Technology Lead)  
**Baseline Date:** 03 November 2026  
**Git Branch:** `audit-redesign-remediation`  
**Baseline Commit:** `b14c64189fe5aa8e5421a548f41cd1a9626d73ef`  
**Status:** 🟢 **GOVERNANCE CORRECTION COMPLETE — SUBMITTED FOR MANAGEMENT APPROVAL**  

---

> [!IMPORTANT]
> **Implementation Scope Boundary & Governance Safeguards:**  
> This report documents the final targeted governance corrections applied to the Stage 3 Architecture Governance Framework and the WS-06 Management Approval Pack. **No application source code, website content, live CRM pipeline, or infrastructure deployment has been modified or activated.** All activities remain strictly documentation-only. The seven Stage 4 Hard Gates remain strictly active and blocking.

---

## 1. Executive Summary & Objective

In accordance with management instructions, a final targeted correction of the Stage 3 Architecture Governance Framework and the WS-06 Management Approval Pack has been completed. 

This exercise reconciled all conflicting headline formulations, restored the previously ratified website H1 and subheadline verbatim, conducted a line-by-line audit of `src/App.tsx` routing mechanisms, expanded the accessibility acceptance criteria with direct mapping to WCAG 2.1 AA success criteria, and reinforced all non-negotiable operational boundaries.

---

## 2. Files Modified & Created

The following documents in `docs/03_solution_architecture/` were updated in place or created:

| File Name | Document Ref | Nature of Change | Status |
|:--- |:---:|---|:---:|
| `AAA_Stage3_Final_WS06_Management_Approval_Pack.md` | `AAA-S3-PACK-001` | Updated with 5-tier classification, verbatim H1/subheadline, 30+1 route table, WCAG mapping, and open dependency tracking. | Reconciled |
| `AAA_Stage3_Workstream_and_Dependency_Plan.md` | `AAA-S3-GOV-002` | Updated with 30 React Router routes + 1 redirect handler, verbatim H1/subheadline, and mapped WCAG criteria. | Reconciled |
| `AAA_Stage3_Architecture_and_Design_Charter.md` | `AAA-S3-GOV-001` | Updated with 30+1 route audit reference, verbatim H1/subheadline, and mapped WCAG criteria. | Reconciled |
| `AAA_Stage3_Requirements_to_Architecture_Traceability.md` | `AAA-S3-GOV-006` | Updated REQ-BRAND-02 and REQ-BRAND-03 with verbatim H1/subheadline and 30+1 route count. | Reconciled |
| `AAA_Stage3_Management_Approval_and_Gate_Register.md` | `AAA-S3-GOV-007` | Updated Gate 3.1 and MGT-DET-S3-01 to reflect verbatim H1 and 30+1 route mechanisms. | Reconciled |
| `AAA_Stage3_Architecture_Principles_and_Standards.md` | `AAA-S3-GOV-003` | Verified and reconciled with WCAG mappings and four-field maximum enquiry concept. | Reconciled |
| `AAA_Stage3_Architecture_Decision_Register.md` | `AAA-S3-GOV-004` | Verified ADR-01..12 classifications (zero premature approvals). | Reconciled |
| `AAA_Stage3_Architecture_Risk_and_Control_Register.md` | `AAA-S3-GOV-005` | Verified risk controls R-01..09. | Reconciled |
| `AAA_Stage3_Architecture_Execution_Roadmap.md` | `AAA-S3-GOV-008` | Verified 10-day planning estimate and cross-cutting WS-10 phasing. | Reconciled |
| `AAA_Stage3_Governance_Correction_and_WS06_Readiness_Report.md` | `AAA-S3-REP-001` | Verified consistency with latest reconciliations. | Reconciled |
| `AAA_Stage3_Final_WS06_Approval_Pack_Correction_Report.md` | `AAA-S3-REP-002` | **NEW REPORT CREATED** documenting exact corrections and verification evidence. | Active |

---

## 3. Detailed Exact Corrections Applied

### 3.1 Restoration of Ratified Website H1 and Subheadline
- **Issue Corrected:** Excised conflicting headline formulation (*"Building Mathematical Thinkers & Confident Learners in Wakad."*).
- **Ratified Replacement (`DEC-WS02-13`):**
  - **Master Website H1:** *"Beyond Calculation. Towards Confident Mathematical Thinking."*
  - **Master Website Subheadline:** *"At Arnav Abacus Academy, mathematics is the medium to develop confident, independent, and thoughtful young learners. Guided by certified educators in small batches with a maximum of five students per batch, our structured programmes provide personalised learning, closer individual guidance, and steady mathematical progress."*
- **Scope of Enforcement:** Applied verbatim across `AAA-S3-PACK-001`, `AAA-S3-GOV-001`, `AAA-S3-GOV-002`, `AAA-S3-GOV-006`, and `AAA-S3-GOV-007`. Prohibited introducing any alternative headline variants.

### 3.2 Reconciliation of Repository Route Inventory (`src/App.tsx`)
- **Audit Findings:** An inspection of `src/App.tsx` revealed:
  - **27 Static Route Definitions** inside `<Routes>` (23 public admissions routes + 4 AcademyOS routes: `/practice`, `/practice/session`, `/practice/results`, `/login`).
  - **2 Dynamic Parameterised Route Patterns** inside `<Routes>` (`/blog/:slug` and `/campaigns/:slug`).
  - **1 Wildcard Fallback Route** inside `<Routes>` (`path="*"` rendering `NotFound.tsx`).
  - **1 Client-Side Legacy Hash Compatibility Handler** (`<LegacyHashRedirector />`), mounted within `<Router>` outside `<Routes>`, which detects `window.location.hash.startsWith("#/")` and executes client-side redirection to clean paths.
- **Reconciliation Principle:** Route preservation is defined as preserving verified existing public URL behavior, dynamic parameter handling, error fallbacks, and legacy redirects—not merely matching a numerical count. Total routing mechanisms: **30 React Router `<Route>` definitions + 1 legacy redirect handler = 31 mechanisms**.

### 3.3 Expanded Accessibility Acceptance Criteria Mapped to WCAG 2.1 AA
- Proposed conformance target: **WCAG 2.1 Level AA** (subject to automated tooling and manual assistive technology testing; conformance cannot be claimed prematurely).
- Mapped explicit success criteria:
  - *Keyboard Operation:* WCAG 2.1.1, 2.1.2 (No Keyboard Trap).
  - *Focus Order & Visibility:* WCAG 2.4.3 (Focus Order), 2.4.7 (Focus Visible), 1.4.11 (Non-text Contrast $\ge 3:1$). Focus not obscured by sticky headers/CTAs.
  - *Screen-Reader Accessibility:* WCAG 1.1.1 (Non-text Content), 1.3.1 (Info & Relationships), 3.3.2 (Labels/Instructions), 4.1.2 (Name, Role, Value), 4.1.3 (Status Messages via `aria-live`).
  - *Headings & Landmarks:* WCAG 1.3.1 (HTML5 landmarks), 2.4.6 (Headings & Labels describe topic/purpose), 3.1.1 (Language of Page `lang="en"`).
  - *Form Error Identification & Recovery:* WCAG 3.3.1, 3.3.3 (`aria-invalid="true"`, `aria-describedby` linking error descriptions).
  - *Accessible Modals:* Focus trapping within open dialogs, Escape key dismiss, background `aria-hidden="true"` inerting, focus restoration on close.
  - *Text Zoom & Reflow:* WCAG 1.4.4 (Resize Text up to 200%), 1.4.10 (Reflow at 320px without horizontal scroll).
  - *Contrast:* WCAG 1.4.3 ($\ge 4.5:1$ text contrast), 1.4.11 ($\ge 3:1$ UI components).
- **Architectural & Conformance Distinctions:**
  - *Reduced Motion:* WCAG 2.3.3 (`prefers-reduced-motion: reduce`) is explicitly classified as an **AAA-level additional preference**, NOT a mandatory WCAG 2.1 Level AA requirement.
  - *Single-H1 Convention:* Enforcing strictly one `h1` per page is an **AAA content and architectural standard**, NOT a standalone WCAG AA conformance requirement (WCAG 2.4.6 requires headings to be descriptive).
  - *Touch Target Sizing:* $\ge 48\times 48\text{px}$ is explicitly designated as an **AAA usability design preference**, not a substitute for WCAG standards.
  - *Verification Lifecycle:* Preserves the three-stage lifecycle (Design Specification $\rightarrow$ Automated CI Tooling $\rightarrow$ Manual Assistive Technology Validation via NVDA, VoiceOver, and keyboard-only audits). Conformance will be evaluated post-testing.

### 3.4 Enquiry Form Minimum Data Contract (Four-Field Maximum Concept)
- Reconciled against `DEC-WS05-04`:
  1. *Parent Name* — Required.
  2. *Parent Mobile / WhatsApp* — Required.
  3. *Child Age Bracket OR School Grade* — At least one required.
  4. *Programme of Interest* — Optional.
- Prospective parents are never presented with more than 4 inputs; completing all 4 is not mandatory to submit an enquiry.
- Unbundled dual consent: transactional communication consent is separated from optional marketing consent; declining marketing never blocks enquiry submission.
- Zero collection of child DOB, school name, residential address, or clinical history at initial enquiry.

### 3.5 Programme Portfolio & Discovery Session Reality
- Retained the six programme areas (Abacus, Vedic, Mental, School, IPM, Olympiad) as AAA's **current portfolio grouping only**, pending academic validation of curriculum and progression levels by Neha Patil; zero invented age rules.
- Discovery Session preserved as documented free practice of **approximately 45–90 minutes depending on child engagement and parent discussion** (not a guaranteed fixed duration).

### 3.6 WS-06 and WS-09A Dependency Division
- WS-06 defines public user touchpoints and the enquiry form UI contract.
- WS-09A defines the comprehensive student, parent, programme, and relationship data architecture based on approved academic and operational business processes.
- **WS-09A does NOT derive the full AcademyOS data schema solely from the enquiry form.**
- WS-10 operates continuously from Day 1 as a cross-cutting governance audit across all workstreams.

### 3.7 ADR Governance Integrity
- All 12 ADRs audited. Zero premature approvals.
- ADR-06 explicitly confirmed as a proposed pedagogical framework, **not** an approved admission rule.
- ADR-11 explicitly confirmed as a proposed operational schedule, **not** an approved retention policy.
- ADR-12 remains deferred pending options analysis.

### 3.8 Factual Reconciliation of Existing External Integrations
- **Issue Corrected:** Excised generalized statements asserting "zero external connections" or unevidenced production inactivity.
- **Repository Integration Reality:** An audit of repository source files reveals references to five external endpoints and integration mechanisms:
  1. *Google Apps Script Lead Webhook:* `src/lib/leadWebhook.ts`, `LeadForm.tsx`, `TeacherFranchise.tsx`, and `WorksheetVault.tsx` dispatch lead payloads via `fetch` (`mode: "no-cors"`) to an endpoint configured via `VITE_LEADS_WEBHOOK_URL`.
  2. *EmailJS Verification Service:* `src/lib/AuthContext.tsx` references EmailJS SDK/API methods to send verification OTPs using `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY`.
  3. *WhatsApp Direct Links:* `FloatingCTA.tsx`, `LeadForm.tsx`, `Navbar.tsx`, `TeacherProfile.tsx`, `ProgramCard.tsx`, and modal components generate pre-filled chat links targeting `https://wa.me/919021924968`.
  4. *Google Analytics 4:* `src/lib/analytics.ts` initializes measurement ID `G-M2EL9MYSRL` and dispatches page view and custom event tracking.
  5. *JSONBlob Cloud Persistence:* `src/lib/cloudSync.ts`, `src/lib/successStories.ts`, and `AdminSuccessStoryManager.tsx` contain hardcoded endpoints to `https://jsonblob.com/api/jsonBlob/...` for student practice attempt synchronization and success story storage.
- **Governance Distinctions Established:**
  - *CRM Identification:* No commercial enterprise SaaS CRM (e.g., HubSpot, Zoho CRM, Salesforce, LeadSquared) is identified in the repository; an interim lead webhook targeting Google Sheets via Apps Script is present.
  - *External Persistence Mechanisms:* Data is persisted across client-side `localStorage`, public unauthenticated `jsonblob.com` endpoints, and Google Sheets via Apps Script.
  - *Production Operational Status:* While source-code integration references are verified, live network operational status and production endpoint availability have not been independently tested via network probes.
  - *Provider-Side Security Controls:* External provider-side access permissions, IAM roles, script execution privileges, and spreadsheet sharing settings remain unverified.

---

## 4. Five-Tier Governance Classification

To maintain strict boundaries between factual baselines, approved policies, and architectural proposals, all project elements are categorized into five tiers:

1. **Tier 1: Repository-Reported Findings:** React 19/Vite baseline; 30 React Router `<Route>` definitions + 1 client-side legacy hash handler; five source-code external integration references (Google Apps Script webhook, EmailJS, WhatsApp links, GA4, JSONBlob persistence); zero commercial SaaS CRM identified; external persistence via Apps Script/JSONBlob/localStorage; live production operational status and provider-side security controls unverified.
2. **Tier 2: Management-Approved Requirements:** Ratified Stage 2 BRD, 54 decisions, verbatim H1 and subheadline, maximum 5 students per batch, 8 pillars, 6 dimensions, 6-stage model, Mon–Sat 9:30–7:30 operating hours.
3. **Tier 3: Proposed Architecture:** 4-field maximum enquiry modal, candidate Student ID format (`AAA-STU-YYYY-XXXX`), technology options analysis framework, WS-06 wireframes, zero-PII telemetry data classification.
4. **Tier 4: Pending Validation:** Full academic curriculum for all 6 portfolio streams (pending Neha Patil); diagnostic crossover rubric (pending Neha Patil); DPDP legal compliance and 90-day retention schedule (pending legal counsel); census roll and physical seating audits.
5. **Tier 5: Separate Implementation Approval:** Writing production code, changing routes, activating CRM pipelines, deploying builds. **Strictly prohibited; blocked by 7 Hard Gates.**

---

## 5. Proposed Management Determinations

The following determinations remain **AWAITING MANAGEMENT CONFIRMATION**:

| Ref | Subject | Proposed Outcome | Current Status |
|:--- |:--- |:--- |:---:|
| **MGT-DET-S3-01** | Approval of Stage 3 Architecture Governance Documents | APPROVE WITH CONDITIONS (Documents 001–008 reconciled with technology neutrality, 30+1 route inventory, verbatim H1/subheadline, 4-field max contract, WCAG mapping, and continuous WS-10 audits). | **AWAITING CONFIRMATION** |
| **MGT-DET-S3-02** | Authorization to Commence WS-06 Detailed Drafting | APPROVE (Drafting IA, wireframes, 4-field contract, copy spec under 11-area scope; code changes strictly prohibited). | **AWAITING CONFIRMATION** |
| **MGT-DET-S3-03** | Provisional Endorsement of Phasing & 10-Day Estimate | APPROVE WITH CONDITIONS (Provisional planning estimate, not a guaranteed deadline; subject to capacity confirmation). | **AWAITING CONFIRMATION** |

---

## 6. Stage 4 Implementation Restrictions

- All **seven Stage 4 Hard Gates** (`S4-HG-01` through `S4-HG-07`) remain strictly active and blocking.
- Implementation freeze enforced: zero source code edits in `src/`, zero static asset edits in `public/`, zero configuration changes, zero deployments, and zero commits/pushes/merges.

---

## 7. Repository Integrity Verification & Git Evidence

- **Git Branch:** `audit-redesign-remediation`
- **Baseline Commit:** `b14c64189fe5aa8e5421a548f41cd1a9626d73ef`
- **Tracked Files Diff:** `git diff --stat` returns **0 files changed, 0 insertions, 0 deletions**.
- **Untracked Additions:** Restricted strictly to `AGENTS.md` and documentation files under `docs/`.
- **Application Code:** **100% clean and untouched**.

---

## 8. Stop Condition Compliance

Detailed WS-06 execution has **not** been commenced. All activities remain strictly documentation-only. The system has stopped and awaits explicit management determination from **Neha Patil** and **Nitin Patil** on Decisions `MGT-DET-S3-01`, `MGT-DET-S3-02`, and `MGT-DET-S3-03`.

---
*End of Final WS-06 Approval Pack Correction Report (AAA-S3-REP-002)*
