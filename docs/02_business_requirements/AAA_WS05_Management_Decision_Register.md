# AAA MASTER BRD — WORKSTREAM 05 (WS-05)
# MANAGEMENT DECISION REGISTER
**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Role:** Lead Business Analyst, Marketing Systems Architect & Governance Specialist  
**Governance Stage:** Stage 2 — Master Business Requirements Document (BRD) Workshop  
**Document Ref:** `docs/02_business_requirements/AAA_WS05_Management_Decision_Register.md`  
**Date:** November 03, 2026 (Management Ratified Edition)  
**Governance Authority:** Neha Patil (Founder & Academic Director) & Nitin Patil (Operations & Technology Lead)  
**Status:** 🟢 **FORMALLY RATIFIED BY MANAGEMENT (NEHA PATIL & NITIN PATIL)**  

---

## 1. Purpose & Governance Rules

This document codifies the ten strategic marketing, lead generation, and conversion architecture decisions formulated during **Workstream 05: Marketing, Lead Generation & Conversion Architecture (WS-05)**.

In strict accordance with project governance instructions:
> **All ten decisions have been formally evaluated and ratified as the joint management direction of Neha Patil (Academic Director) and Nitin Patil (Operations Lead), subject to their confirmation and the stated conditions. Approval of these requirements constitutes architectural authorization only; live website modifications, code changes, CRM deployment, and advertising spend remain strictly paused until Stage 4 implementation following Stage 3 design approval.**

---

## 2. Summary Table: Workstream 05 Management Determinations

| Decision ID | Category | Decision Subject | Core Strategic Question | Management Determination | Final Governance Status | Accountable Approver |
|---|---|---|---|---|:---:|:---:|
| **DEC-WS05-01** | Brand Slogan | **Master Brand Positioning & Headline Rollout** | Should AAA mandate the approved brand position and headline across all marketing touchpoints? | **APPROVED WITH CONDITIONS** | 🟢 **RATIFIED** | Neha Patil & Nitin Patil |
| **DEC-WS05-02** | Batch Cap | **Micro-Batch Size Marketing Slogan Remediation** | Should AAA enforce maximum five students per batch and remove legacy 1:8 claims? | **APPROVED** | 🟢 **RATIFIED** | Nitin Patil & Neha Patil |
| **DEC-WS05-03** | Funnel CTA | **Discovery Session Nomenclature Standardization** | Should all primary CTAs standardize on "AAA Personalised Learning Discovery Session"? | **APPROVED** | 🟢 **RATIFIED** | Neha Patil |
| **DEC-WS05-04** | Privacy / Form | **Minimum Necessary Data Lead Form Standard** | Should public inquiry forms restrict data collection to 4 core fields, banning intrusive child data? | **APPROVED WITH CONDITIONS** | 🟢 **RATIFIED** | Nitin Patil |
| **DEC-WS05-05** | Geography | **Hyper-Local Geographic Catchment Prioritization** | How should local SEO and marketing energy be prioritized geographically? | **APPROVED WITH CONDITIONS** | 🟢 **RATIFIED** | Nitin Patil |
| **DEC-WS05-06** | Reputation | **Google Business Profile & Ethical Review Policy** | Should AAA adopt the non-incentivized Google review generation and response policy? | **APPROVED** | 🟢 **RATIFIED** | Nitin Patil & Neha Patil |
| **DEC-WS05-07** | Response SLA | **Inquiry Response Operating Service Standard** | Should AAA operationalize the 2-operating-hour inquiry follow-up standard during center hours? | **APPROVED AS PILOT** | 🟢 **RATIFIED** | Nitin Patil |
| **DEC-WS05-08** | Tooling | **Near-Term Lead Tracking Tooling Strategy** | What technical instrument should govern lead tracking prior to Stage 4 AcademyOS private DB? | **DEFERRED** | 🟢 **RATIFIED** | Nitin Patil |
| **DEC-WS05-09** | Copy Discipline | **Elimination of Speed Hyperbole & Multiplier Claims** | Should AAA eliminate legacy "10x to 15x faster" claims in favor of exam verification language? | **APPROVED** | 🟢 **RATIFIED** | Neha Patil |
| **DEC-WS05-10** | Measurement | **Admissions Funnel KPI Architecture & Cadence** | Should AAA adopt the 17-metric KPI dictionary and 3-tier reporting cadence? | **APPROVED WITH CONDITIONS / PILOT** | 🟢 **RATIFIED** | Nitin Patil & Neha Patil |

---

## 3. Detailed Decision Sheets with Formal Management Determinations

### DEC-WS05-01: Master Brand Positioning & Headline Rollout Across Marketing Touchpoints
* **Decision ID:** `DEC-WS05-01`
* **Title:** Adoption of Master Brand Positioning & Website Headline Across Marketing Touchpoints
* **Current Operational Fact:** Website hero (`Hero.tsx:55`) currently reads: *"Build Mathematical Confidence. Unlock Your Child's Potential."* Ratified Stage 2 headline is: *"Beyond Calculation. Towards Confident Mathematical Thinking."*
* **Strategic Rationale:** Unifies academy marketing around cognitive growth and child development rather than generic tutoring slogans.
* **Approved Scope:** Approve the master brand positioning (*“Arnav Abacus Academy – A Premium Mathematical Thinking & Child Development Academy”*) and headline (*“Beyond Calculation. Towards Confident Mathematical Thinking.”*) across all marketing touchpoints, permitting channel-appropriate adaptation (e.g. character limits in Google Business Profile or mobile banners) while strictly preserving core meaning.
* **Alternatives Considered:** Retain current exploratory hero headline; author new marketing headlines without Stage 2 governance alignment.
* **Cost / Effort / Complexity:** Zero financial cost; low copy effort; low technical complexity.
* **Dependencies / Risks:** Stage 3 website copywriting sprint.
* **Accountable Decision-Maker:** **Academic Director (Neha Patil)** & **Operations Lead (Nitin Patil)**.
* **Governance Status:** 🟢 **APPROVED WITH CONDITIONS**
* **Management Decision Field:** `APPROVED WITH CONDITIONS — Joint Management Direction of Neha Patil & Nitin Patil (Nov 03, 2026). Approved master brand positioning and headline across all marketing touchpoints with channel-appropriate adaptations.`

---

### DEC-WS05-02: Micro-Batch Size Marketing Slogan Remediation (5-Student Cap)
* **Decision ID:** `DEC-WS05-02`
* **Title:** Micro-Batch Size Marketing Slogan Remediation (Deprecating Legacy 1:8 Claims)
* **Current Operational Fact:** Codebase repeatedly displays *"Guaranteed 1:8 Micro-Batches"* (`Hero.tsx:69`, `LeadForm.tsx:208, 234`, `data.ts:64, 86`). Ratified decisions `DEC-WS02-05` and `DEC-WS04-11` mandate: *"maximum of five students per batch."*
* **Strategic Rationale:** Eliminates severe operational contradiction; protects premium pricing power; guarantees parents receive the exclusive attention promised.
* **Approved Scope:** Approve maximum five students per batch as the universal marketing standard. The removal and deprecation of all legacy "1:8" claims from website copy, forms, and diagnostic PDFs is an **approved requirement for a separately authorised implementation stage (Stage 4)**. *This approval does NOT authorize starting Stage 4 or modifying code/website assets in Stage 2.*
* **Alternatives Considered:** Keep 1:8 marketing copy while maintaining 5 students in practice; increase physical batch sizes to 8 students.
* **Cost / Effort / Complexity:** Zero financial cost; low code effort in Stage 4; low technical complexity.
* **Dependencies / Risks:** Physical facility seating capacity audit (`ACT-WS04-08`).
* **Accountable Decision-Maker:** **Operations Lead (Nitin Patil)** & **Academic Director (Neha Patil)**.
* **Governance Status:** 🟢 **APPROVED**
* **Management Decision Field:** `APPROVED — Joint Management Direction of Neha Patil & Nitin Patil (Nov 03, 2026). Approved universal maximum five students per batch ceiling; authorized deprecation and removal of legacy 1:8 claims in Stage 4 as a separately gated implementation requirement.`

---

### DEC-WS05-03: Discovery Session Nomenclature Standardization
* **Decision ID:** `DEC-WS05-03`
* **Title:** Discovery Session Nomenclature & Deliverable Standardization
* **Current Operational Fact:** Current digital assets use conflicting CTA names: *"Book a Parent Counselling Session"*, *"Book a Free Demo"*, *"Free Math Demo"*. Operational delivery is an informal ~45–90 minute free session by Neha Patil.
* **Strategic Rationale:** Establishes professional educational branding; separates AAA from pushy sales demos conducted by commercial franchises.
* **Approved Scope:** Approve standardised discovery-session CTA and service naming across all website buttons and marketing campaigns: **"Book an AAA Personalised Learning Discovery Session"** and deliver the **"AAA Demo Observation & Learning Recommendation"**. The session evaluates the **six approved educational observation dimensions**: (1) Number Sense, (2) Arithmetic Understanding, (3) Logical Approach, (4) Learning Attitude, (5) Response and Engagement, and (6) Interest and Learning Passion (strictly non-diagnostic).
* **Alternatives Considered:** Continue using generic "Free Demo Class" terminology; use corporate "Assessment Consultation" wording.
* **Cost / Effort / Complexity:** Zero cost; low effort; low technical complexity.
* **Dependencies / Risks:** Operational validation of session duration (~45–90 min actual vs 35–45 min sequence) and delivery roles by Neha Patil (`ACT-WS05-01`).
* **Accountable Decision-Maker:** **Academic Director (Neha Patil)**.
* **Governance Status:** 🟢 **APPROVED**
* **Management Decision Field:** `APPROVED — Joint Management Direction of Neha Patil & Nitin Patil (Nov 03, 2026). Approved standard discovery session CTA and service deliverable across the 6 approved educational observation dimensions, conditioned on duration validation via ACT-WS05-01.`

---

### DEC-WS05-04: Minimum Necessary Data Lead Form Standard
* **Decision ID:** `DEC-WS05-04`
* **Title:** Minimum Necessary Data Lead Capture Form Standard (DEC-WS03-04 Alignment)
* **Current Operational Fact:** `LeadForm.tsx` collects 10+ fields including child habits, curriculum, and generates client-side PDFs before WhatsApp redirect.
* **Strategic Rationale:** Drastically reduces conversion friction on mobile while complying with DPDP child-data minimization rules.
* **Approved Scope:** Approve minimum-necessary enquiry data standard restricting general web discovery forms to 4 core fields: (1) Parent Name (required), (2) Mobile/WhatsApp (required), (3) Child Age Bracket OR School Grade (one required, not both), and (4) Programme of Interest (optional).
  *Conditions:*
  - Dual consent architecture: separate opt-in for direct inquiry response (mandatory to submit) vs promotional updates (optional). A parent declining promotional communication must still be fully able to submit an enquiry.
  - Published privacy notice before live form launch.
  - Strict prohibition against collecting exact child DOB, school name, home address, or clinical/learning-difficulty checkboxes at initial inquiry.
  - The proposed 90-day retention/deletion timeline is an **unapproved proposal pending legal/privacy review** (`ACT-WS05-05`). Unconverted enquiry records must be distinguished from admitted-student records with separate statutory retention obligations.
  - Technical privacy controls represent design requirements for Stage 3/4 and are not currently technically implemented.
* **Alternatives Considered:** Retain long-form 10-field diagnostic checklist on initial web forms; rely 100% on bare WhatsApp click buttons without web forms.
* **Cost / Effort / Complexity:** Low cost; low implementation effort in Stage 4; low technical complexity.
* **Dependencies / Risks:** Legal review of consent language and retention policy (`ACT-WS04-07`, `ACT-WS05-05`).
* **Accountable Decision-Maker:** **Operations Lead (Nitin Patil)**.
* **Governance Status:** 🟢 **APPROVED WITH CONDITIONS**
* **Management Decision Field:** `APPROVED WITH CONDITIONS — Joint Management Direction of Neha Patil & Nitin Patil (Nov 03, 2026). Approved 4-field inquiry standard with dual consent, ban on child DOB/school/clinical checkboxes, and retention distinction under ACT-WS05-05.`

---

### DEC-WS05-05: Hyper-Local Geographic Catchment Prioritization
* **Decision ID:** `DEC-WS05-05`
* **Title:** Hyper-Local Geographic Catchment Prioritization (Wakad Core vs. Secondary Catchment)
* **Current Operational Fact:** Website currently presents global/international marketing options alongside Wakad local classes.
* **Strategic Rationale:** Focuses limited marketing energy on high-conversion walking/van catchment near Balaji Sagar Bungalow, Wakad.
* **Approved Scope:** Approve Wakad-first local acquisition strategy; treat 0–3 km (Wakad Central, Park Street, Wisdom World vicinity) as an operational hypothesis and primary focus, not an exclusive market boundary. Validate secondary PCMC catchment (Hinjawadi, Pimple Saudagar, Tathawade) through empirical inquiry data (`ACT-WS05-08`).
* **Alternatives Considered:** Spend marketing resources aggressively across the entire Pune municipal region; position AAA exclusively as an online global academy.
* **Cost / Effort / Complexity:** Low cost; moderate local content effort; low technical complexity.
* **Dependencies / Risks:** Local catchment validation audit (`ACT-WS05-08`).
* **Accountable Decision-Maker:** **Operations Lead (Nitin Patil)**.
* **Governance Status:** 🟢 **APPROVED WITH CONDITIONS**
* **Management Decision Field:** `APPROVED WITH CONDITIONS — Joint Management Direction of Neha Patil & Nitin Patil (Nov 03, 2026). Approved Wakad-first acquisition focus treating 0–3 km as primary operational hypothesis, with secondary catchments validated via ACT-WS05-08.`

---

### DEC-WS05-06: Google Business Profile & Ethical Review Generation Policy
* **Decision ID:** `DEC-WS05-06`
* **Title:** Google Business Profile Optimization & Ethical Review Policy
* **Current Operational Fact:** Profile possesses 74+ 5-star reviews; review collection occurs informally.
* **Strategic Rationale:** Protects 5.0-star organic ranking; guarantees compliance with consumer protection laws banning paid/incentivized reviews.
* **Approved Scope:** Approve voluntary, non-incentivised review policy: reviews are 100% voluntary, zero fee discounts or gifts, requested only following milestone completions. Treat 74+ count as a periodically refreshable baseline (`ACT-WS05-07`). The **48-hour response timing is approved as a proposed operational target pending management confirmation**, ensuring that no published response discloses personal identifiable information of students or parents (zero-PII rule).
* **Alternatives Considered:** Offer fee vouchers for Google reviews; cease requesting reviews altogether.
* **Cost / Effort / Complexity:** Zero cost; low operational effort; low complexity.
* **Dependencies / Risks:** Review tracking discipline under Nitin Patil.
* **Accountable Decision-Maker:** **Operations Lead (Nitin Patil)** & **Academic Director (Neha Patil)**.
* **Governance Status:** 🟢 **APPROVED**
* **Management Decision Field:** `APPROVED — Joint Management Direction of Neha Patil & Nitin Patil (Nov 03, 2026). Approved 100% voluntary review policy, zero incentives, and 74+ review count as a refreshable baseline. 48-hour response standard is a proposed target pending management confirmation.`

---

### DEC-WS05-07: Inquiry Response Operating Service Standard
* **Decision ID:** `DEC-WS05-07`
* **Title:** Inquiry Response Operating Service Standard (2 Operating Hours Pilot)
* **Current Operational Fact:** `DEC-WS03-03` approved immediate automated acknowledgement + 2-operating-hour follow-up as a pilot target.
* **Strategic Rationale:** Rapid, polite responses capture high-intent parents before they contact commercial franchise competitors.
* **Approved Scope:** Approve the two-operating-hour response standard as an operational pilot principle. **Live center operating hours (proposed: Mon–Sat 9:30 AM – 7:30 PM) remain pending management confirmation (`EVD-MKT-04`)** and must be formally declared and confirmed by management before the pilot starts. Founder classroom teaching hours are strictly preserved as top priority over inquiry follow-up.
* **Alternatives Considered:** Mandate 24/7 round-the-clock responses; respond only once weekly in batches.
* **Cost / Effort / Complexity:** Zero financial cost; high operational discipline; low technical complexity.
* **Dependencies / Risks:** Declared center operating hours (`EVD-MKT-04`).
* **Accountable Decision-Maker:** **Operations Lead (Nitin Patil)**.
* **Governance Status:** 🟢 **APPROVED AS PILOT**
* **Management Decision Field:** `APPROVED AS PILOT — Joint Management Direction of Neha Patil & Nitin Patil (Nov 03, 2026). Approved 2-operating-hour response standard as an operational pilot principle. Live operating window (proposed: Mon–Sat 9:30 AM – 7:30 PM) is pending management confirmation (EVD-MKT-04) before pilot launch. Teaching priority protected.`

---

### DEC-WS05-08: Near-Term Lead Tracking Tooling Strategy
* **Decision ID:** `DEC-WS05-08`
* **Title:** Near-Term Lead Tracking Tooling Strategy (Spreadsheet vs. CRM vs. AcademyOS)
* **Current Operational Fact:** Website uses client `localStorage` and optional Google Apps Script webhook; no enterprise CRM is installed.
* **Strategic Rationale:** Avoids costly SaaS CRM subscriptions during Stage 2/3; provides immediate visibility into inquiries while planning native AcademyOS integration for Stage 4.
* **Approved Scope:** Defer permanent commercial CRM tool selection. Authorize interim lead management via controlled manual/spreadsheet protocol **strictly after** completing mandatory prerequisites `ACT-WS05-05` (privacy notice & retention review) and `ACT-WS05-06` (security, access control, and formula sanitization assessment). Standardize the refined admissions lifecycle:
  1. `New Enquiry`
  2. `Contacted`
  3. `Discovery Session Booked`
  4. `Discovery Session Attended`
  5. `Admission Completed` *(Counting Criterion: requires verified tuition payment and official registration; expressions of interest strictly NOT counted)*
  6. `Decision Pending`
  7. `Closed – Not Proceeding`
  8. `Follow-up Later`  
  WhatsApp must not remain the sole, unbacked record of admissions interactions.
* **Alternatives Considered:** Authorize immediate Google Sheets production integration; license an external commercial CRM (HubSpot/Salesforce); defer all tracking until Stage 4 AcademyOS.
* **Cost / Effort / Complexity:** Zero software cost; low assessment effort; low complexity.
* **Dependencies / Risks:** Completion and sign-off on mandatory prerequisites `ACT-WS05-05` and `ACT-WS05-06`.
* **Accountable Decision-Maker:** **Operations Lead (Nitin Patil)**.
* **Governance Status:** 🟢 **DEFERRED**
* **Management Decision Field:** `DEFERRED — Joint Management Direction of Neha Patil & Nitin Patil (Nov 03, 2026). Deferred permanent CRM tool selection. Interim spreadsheet protocol gated behind mandatory prerequisites ACT-WS05-05 & ACT-WS05-06. 8-status lifecycle approved.`

---

### DEC-WS05-09: Elimination of Speed Hyperbole & Multiplier Claims
* **Decision ID:** `DEC-WS05-09`
* **Title:** Elimination of Speed Hyperbole & Unsubstantiated Multiplier Claims
* **Current Operational Fact:** `data.ts:38` claims Vedic math *"Accelerates numerical evaluations by 10x to 15x"*.
* **Strategic Rationale:** `AGENTS.md` Section 3.2 strictly prohibits hyperbolic gimmicks; protecting institutional trust with educated Wakad parents requires academically rigorous copy.
* **Approved Scope:** Approve removal of unsupported speed claims ("10x to 15x") and adopt evidence-led educational messaging emphasizing mental calculation poise, procedural error reduction, and exam verification speed in Stage 4.
* **Alternatives Considered:** Keep 10x-15x claims for marketing impact; remove Vedic math marketing entirely.
* **Cost / Effort / Complexity:** Zero cost; low copy editing effort; low complexity.
* **Dependencies / Risks:** Stage 3 copywriting guidelines.
* **Accountable Decision-Maker:** **Academic Director (Neha Patil)**.
* **Governance Status:** 🟢 **APPROVED**
* **Management Decision Field:** `APPROVED — Joint Management Direction of Neha Patil & Nitin Patil (Nov 03, 2026). Approved removal of unsupported 10x–15x speed claims and adoption of exam verification and calculation poise messaging in Stage 4.`

---

### DEC-WS05-10: Admissions Funnel KPI Architecture & Cadence
* **Decision ID:** `DEC-WS05-10`
* **Title:** Formal Adoption of Admissions Funnel KPI Architecture & Reporting Cadence
* **Current Operational Fact:** Conversions are tracked ad-hoc without standardized KPI definitions or reporting schedules.
* **Strategic Rationale:** Establishes objective measurement without creating burdensome administrative overhead for founders.
* **Approved Scope:** Approve KPI framework in principle; pilot a Minimum Viable Dashboard (6 weekly metrics: New Inquiries, Qualified Inquiries, Discovery Sessions Booked, Discovery Sessions Attended, Paid Admissions Confirmed, Pending Follow-Up Queue; 6 monthly metrics; 5 quarterly metrics). All ratio metrics must define explicit numerators/denominators and display `N/A` when denominator is 0. Defer numerical quotas and targets until an empirical **four-week baseline collection period** post-implementation is completed (`ACT-WS05-10`).
* **Alternatives Considered:** Arbitrarily mandate rigid commercial conversion targets immediately; operate without structured admissions metrics.
* **Cost / Effort / Complexity:** Zero financial cost; low reporting effort (15 min/week); low complexity.
* **Dependencies / Risks:** Census audit reconciliation (`ACT-WS04-03`, `ACT-WS05-03`) and 4-week baseline data collection under approved registers.
* **Accountable Decision-Maker:** **Operations Lead (Nitin Patil)** & **Academic Director (Neha Patil)**.
* **Governance Status:** 🟢 **APPROVED WITH CONDITIONS / PILOT**
* **Management Decision Field:** `APPROVED WITH CONDITIONS / PILOT — Joint Management Direction of Neha Patil & Nitin Patil (Nov 03, 2026). Approved 17-metric KPI dictionary and 6-metric weekly MVD. Numerical quotas deferred pending 4-week baseline collection under approved registers.`
