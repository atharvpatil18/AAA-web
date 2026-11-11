# AAA MASTER BRD — WORKSTREAM 05 (WS-05)
# OPEN INFORMATION & EVIDENCE REGISTER
**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Role:** Lead Business Analyst, Marketing Systems Architect & Governance Specialist  
**Governance Stage:** Stage 2 — Master Business Requirements Document (BRD) Workshop  
**Document Ref:** `docs/02_business_requirements/AAA_WS05_Open_Information_and_Evidence_Register.md`  
**Date:** November 02, 2026 (Discovery Baseline)  
**Status:** 🟡 **DISCOVERY COMPLETE — PENDING MANAGEMENT VALIDATION**  

---

## 1. Purpose & Governance Classification Taxonomy

This register catalogs all marketing, SEO, conversion, lead management, and discovery session requirements, codebase discoveries, operational assumptions, and evidence dependencies formulated during **Workstream 05 (WS-05)**.

Every entry is classified under the approved eight-tier governance taxonomy:
1. `[MANAGEMENT CONFIRMED]` — Formally confirmed by Neha Patil or Nitin Patil.
2. `[EXISTING DOCUMENTED PRACTICE]` — Grounded in documented operational or historical center records.
3. `[REPOSITORY VERIFIED]` — Confirmed through line-by-line inspection of workspace repository source code.
4. `[EXTERNAL EVIDENCE REQUIRED]` — Market, competitor, or demographic fact requiring empirical external research.
5. `[HISTORICAL REFERENCE]` — Earlier marketing statement or promotional text pending empirical re-verification.
6. `[PROPOSED STRATEGY]` — Formulated growth recommendation awaiting executive workshop determination.
7. `[PENDING VALIDATION]` — Operational assumption requiring center timetable or financial audit.
8. `[REQUIRES SEPARATE IMPLEMENTATION APPROVAL]` — Actionable execution deferred to Stage 4.

---

## 2. Marketing & Conversion Requirements Inventory

| Req ID | Requirement Description | Evidence / Codebase Source | Current Classification | Academic / Business Impact | Accountable Owner | Open Question / Dependency | Decision Ref |
|---|---|---|---|---|---|---|---|
| **REQ-WS05-01** | Ratified Brand Positioning & Headline Rollout | `Hero.tsx:55`, `Home.tsx` | `[MANAGEMENT CONFIRMED for headline; REQUIRES SEPARATE IMPLEMENTATION APPROVAL for code]` | Critical (Brand Equity) | Neha Patil & Nitin Patil | Formal approval to replace hero headline in Stage 4. | DEC-WS05-01 |
| **REQ-WS05-02** | Micro-Batch Slogan Remediation (5-Student Cap) | `Hero.tsx:69`, `LeadForm.tsx:208`, `data.ts:64` | `[MANAGEMENT CONFIRMED for 5-cap; REPOSITORY VERIFIED for 1:8 legacy]` | Critical (Operational Truth) | Nitin Patil & Neha Patil | Replace all legacy "1:8" claims across marketing and forms. | DEC-WS05-02 |
| **REQ-WS05-03** | Standardized Discovery Session Nomenclature | `Hero.tsx:88`, `Home.tsx:71`, `data.ts:132` | `[MANAGEMENT CONFIRMED for session name; PROPOSED STRATEGY for sitewide CTA]` | High (Funnel Trust) | Neha Patil | Standardize sitewide CTAs on "Book Discovery Session". | DEC-WS05-03 |
| **REQ-WS05-04** | Minimum Necessary Data Lead Capture Form | `LeadForm.tsx:20-42`, `DemoBookingModal.tsx` | `[MANAGEMENT CONFIRMED for principle; REPOSITORY VERIFIED for form fields]` | High (Privacy & Conversion) | Nitin Patil | Reduce inquiry form fields to 4 core inputs. | DEC-WS05-04 |
| **REQ-WS05-05** | Hyper-Local Catchment Prioritization (Wakad 0-3km) | Center location: Balaji Sagar Bungalow | `[MANAGEMENT CONFIRMED for location; PROPOSED STRATEGY for catchment tiers]` | High (Admissions Velocity) | Nitin Patil | Focus 80% marketing energy on 0–3 km walking/van radius. | DEC-WS05-05 |
| **REQ-WS05-06** | Google Business Profile & Ethical Review Policy | `Home.tsx:31`, Google Maps Profile | `[MANAGEMENT CONFIRMED for 74+ reviews; PROPOSED STRATEGY for policy]` | High (Local SEO) | Nitin Patil | Formally adopt non-incentivized review generation policy. | DEC-WS05-06 |
| **REQ-WS05-07** | Inquiry Response Standard (2 Operating Hours) | `DEC-WS03-03` | `[MANAGEMENT APPROVED AS PILOT TARGET]` | High (Customer Experience) | Nitin Patil | Operationalize 2-hour pilot while protecting teaching hours. | DEC-WS05-07 |
| **REQ-WS05-08** | Near-Term Lead Tracking Tooling Strategy | `leadWebhook.ts`, `localStorage` | `[REPOSITORY VERIFIED for code; PROPOSED STRATEGY for spreadsheet]` | Medium (Operations) | Nitin Patil | Standardize on authenticated, formula-sanitized Google Sheet. | DEC-WS05-08 |
| **REQ-WS05-09** | Elimination of Speed Hyperbole (10x-15x) | `src/data.ts:38`, `CAMPAIGNS:141` | `[REPOSITORY VERIFIED for legacy; PROPOSED STRATEGY for removal]` | Medium (Brand Integrity) | Neha Patil | Remove "10x to 15x" claims in Stage 4 copy updates. | DEC-WS05-09 |
| **REQ-WS05-10** | Admissions Funnel KPI Architecture & Cadence | Analytics events in `analytics.ts` | `[PROPOSED STRATEGY]` | High (Measurement) | Nitin Patil & Solution Architect | Adopt 17-metric KPI dictionary; defer quotas until baseline. | DEC-WS05-10 |

---

## 3. Marketing Empirical Evidence Dependencies (EVD-MKT Register)

The table below codifies the seven empirical evidence dependencies required to substantiate marketing assumptions:

| Evidence ID | Focus Area | Required Empirical Evidence | Current State | Accountable Owner | Downstream Dependency |
|---|---|---|---|:---:|---|
| **EVD-MKT-01** | Competitor Intelligence | Mystery audit of tuition fees and batch sizes across 3 major franchise centers in Wakad | `[EXTERNAL EVIDENCE REQUIRED]` | Nitin Patil | Value proposition pricing justification. |
| **EVD-MKT-02** | Search Console Baseline | Google Search Console indexing status, impressions, and top organic query report | `[PENDING VALIDATION]` | Solution Architect | Local SEO keyword prioritization. |
| **EVD-MKT-03** | Mobile Traffic Baseline | Historical 90-day mobile vs desktop session distribution from GA4 (`G-M2EL9MYSRL`) | `[PENDING VALIDATION]` | Solution Architect | Mobile thumb-zone UI optimization. |
| **EVD-MKT-04** | Operating Hours | Documented center operating schedule governing telephone and WhatsApp responses | `[PROPOSED / PENDING CONFIRMATION]` | Nitin Patil | 2-operating-hour inquiry SLA enforcement (`ACT-WS04-03`, `DEC-WS05-07`). |
| **EVD-MKT-05** | Inquiry Conversion Baseline | Historical nominal reconciliation of inquiries vs admissions from manual registers | `[PENDING VALIDATION]` | Nitin Patil | Funnel conversion baseline (`KPI-12`, `KPI-13`). |
| **EVD-MKT-06** | Review Count Verification | Quarterly verification of live Google Business Profile reviews (current: 74+) | `[MANAGEMENT CONFIRMED]` | Nitin Patil | Sitewide social proof counters (VER-03). |
| **EVD-MKT-07** | Lead Webhook Security | Verification of environment variable `VITE_LEADS_WEBHOOK_URL` in production hosting | `[REPOSITORY VERIFIED in code; PENDING VALIDATION in prod]` | Solution Architect | Centralized lead capture automation (`leadWebhook.ts`). |

---

## 4. Workstream 05 Action Register (ACT-WS05-01 to ACT-WS05-10)

> [!IMPORTANT]
> **Requirements Approval vs. Operational Implementation Boundary:**  
> The ten actions tabulated below represent operational implementation, evidence gathering, and administrative audits. **They are NOT all prerequisites for WS-05 business requirements document closure.** Management sign-off on WS-05 ratifies the architectural requirements and policies. In particular, `ACT-WS05-05` and `ACT-WS05-06` are operational prerequisites to commencing a new live lead-register process, not barriers to requirements approval. No action may be marked complete without verified evidence and explicit acceptance by its designated authority.

| Action ID | Action Title & Specific Deliverable | Proposed Owner | Owner Status | Required Evidence | Dependencies | Priority | Target Milestone & Due Date | Completion Criteria | Evidence Acceptance Authority | Current Status |
|---|---|:---:|:---:|---|---|:---:|:---:|---|:---:|:---:|
| **ACT-WS05-01** | Discovery Session Duration Validation | Neha Patil | Pending Confirmation | Written memo (`Discovery_Session_Workflow_Validation_Memo.pdf`) | Observation log review | P1 | Stage 2 Workshop (Day 1) | Formal validation of actual duration (~45–90 min) vs proposed 35–45 min sequence and delivery roles. | Neha Patil (Academic Director) | Open — Pending Review |
| **ACT-WS05-02** | Lead-Source Baseline Analysis | Nitin Patil | Pending Confirmation | Tabulated report (`Historical_Lead_Source_Distribution_Report.xlsx`) | WhatsApp chat archives & phone logs | P1 | Stage 2 Workshop (Day 1) | Nominal categorization of last 50 inquiries by source with documented caveats. | Nitin Patil (Operations Lead) | Open — Pending Audit |
| **ACT-WS05-03** | Admission Conversion Baseline Reconciliation | Nitin Patil | Pending Confirmation | Reconciliation sheet (`Inquiry_to_Admission_Conversion_Baseline.xlsx`) | Active census roll (`ACT-WS04-03`) | P1 | Stage 2 Workshop (Day 3) | Calculated baseline CVR rates across booking, attendance, and paid admissions. | Nitin Patil & Neha Patil | Open — Pending Audit |
| **ACT-WS05-04** | Lost-Enquiry Reason Taxonomy Audit | Nitin Patil | Pending Confirmation | Classification memo (`Lost_Enquiry_Reason_Analysis_Memo.pdf`) | Historical follow-up logs | P2 | Prior to Stage 3 kickoff | Past un-enrolled inquiries classified into standard lost reason codes (`LOST-01..06`). | Nitin Patil (Operations Lead) | Open — Pending Review |
| **ACT-WS05-05** | Enquiry Privacy, Notice & Retention Review | Nitin Patil & Legal | Pending Confirmation | Specification document (`Enquiry_Form_Privacy_Notice_Specification.pdf`) | DEC-WS05-04 review | P1 | Prior to lead-register rollout | Legal review of 4-field form, dual consent text, and retention rule. **Operational prerequisite to new lead register.** | Nitin Patil & Legal Counsel | Open — Mandatory Prerequisite |
| **ACT-WS05-06** | Lead Tracking Tool Access & Security Assessment | Solution Architect | Pending Confirmation | Technical security assessment (`Lead_Tracking_Tool_Security_and_Access_Memo.pdf`) | Webhook review (`leadWebhook.ts`) | P1 | Stage 2 Workshop (Day 2) | Security, access control, 2FA, and formula sanitization verified. **Operational prerequisite to new lead register.** | Solution Architect & Nitin Patil | Open — Mandatory Prerequisite |
| **ACT-WS05-07** | Google Business Profile Refresh Protocol | Nitin Patil | Pending Confirmation | Verification schedule (`Google_Review_Verification_and_Refresh_Schedule.pdf`) | Google Business Profile access | P2 | Prior to Stage 3 kickoff | Quarterly audit cadence established verifying voluntary reviews and 74+ baseline. | Nitin Patil (Operations Lead) | Open — Baseline Verified |
| **ACT-WS05-08** | Local Catchment Validation & Cluster Audit | Nitin Patil | Pending Confirmation | Spatial analysis memo (`Wakad_Catchment_Student_Cluster_Analysis.pdf`) | Student address records (`ACT-WS04-03`) | P2 | Prior to Stage 3 kickoff | Coarse geographic cluster analysis validating 0–3 km operational hypothesis. | Nitin Patil (Operations Lead) | Open — Pending Audit |
| **ACT-WS05-09** | Competitor Claim Substantiation & Mystery Audit | Nitin Patil | Pending Confirmation | Mystery audit dossier (`Wakad_Math_Academy_Competitor_Benchmarking.pdf`) | Field observation | P2 | Prior to Stage 3 kickoff | Documented fee and batch size benchmarking across 3 franchise centers. | Nitin Patil (Operations Lead) | Open — Pending Audit |
| **ACT-WS05-10** | KPI Validation & Minimum Viable Dashboard Spec | Solution Architect | Pending Confirmation | Technical specification (`Admissions_MVD_Specification_and_Data_Rules.pdf`) | KPI framework review | P2 | Prior to Stage 3 kickoff | Detailed data-capture rules, 4-week baseline logging protocol, and MVD review template. | Solution Architect & Management | Open — Pending Review |

---

## 5. Governance & Code Boundary Discipline

* **Zero Code Modifications:** In strict compliance with `AGENTS.md` and the stage-gate directive, no application code, components, or styles have been altered.
* **Separation of Fact from Strategy:** Every entry above strictly distinguishes verified facts (`[MANAGEMENT CONFIRMED]`, `[REPOSITORY VERIFIED]`) from formulated growth proposals (`[PROPOSED STRATEGY]`).
