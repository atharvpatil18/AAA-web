# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# WS-10.1: PRIVACY & DPDP REQUIREMENTS ASSESSMENT

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S3-SPEC-WS10-01`  
**Stage:** Stage 3 — Architecture & Design  
**Workstream:** WS-10 — Security, Privacy, Compliance & Certificate Governance  
**Deliverable:** WS-10.1 — Privacy & DPDP Requirements Assessment  
**Governance Authority:** Nitin Patil (Operations & Technology Lead) & Neha Patil (Academic Director)  
**Date:** 04 November 2026  
**Status:** 🟡 **DRAFT — AWAITING MANAGEMENT REVIEW (GATE 3.5 OPEN)**  
**Execution Mode:** STRICTLY DOCUMENTATION-ONLY (IMPLEMENTATION FREEZE ACTIVE)  

---

## 1. Executive Summary & Legal Framework Baseline

Arnav Abacus Academy (AAA), operating in Wakad, Pune, processes personal data of minor children (ages 4.5 to 14) and their parents/guardians. Under the **Digital Personal Data Protection Act, 2023 (DPDP Act, 2023)** enacted by the Parliament of India, specialized statutory mandates apply to the processing of personal data relating to children.

### 1.1 Strict Assessment Discipline & Legal Disclaimers
In strict compliance with `AGENTS.md` and management directives:
1. **No Assertion of Premature Compliance:** AAA does not claim formal DPDP compliance at this architectural stage. This assessment maps statutory provisions to technical architecture requirements.
2. **Distinction of Enacted vs. Commenced Provisions:** As of late 2026, while the DPDP Act 2023 has been enacted and notified in the Gazette of India, the central Government is in the process of notifying specific subordinate Rules (including operational rules for parental consent verification and the Data Protection Board of India).
3. **Requirement for Qualified Legal Counsel:** This document provides a **technical and operational privacy requirements assessment**, not a formal legal opinion. Specific legal questions identified herein are flagged for formal review by a qualified Indian advocate/legal counsel prior to Stage 4.

---

## 2. DPDP Statutory Requirements Analysis for Children's Data

Section 9 of the DPDP Act, 2023 specifies non-negotiable obligations for processing children's personal data:

| DPDP Section | Statutory Requirement Summary | Enacted vs Commenced Status | AAA Technical Architecture Requirement | Architecture Specification & Control | Legal Counsel Question |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **Section 9(1)** | **Verifiable Parental Consent:** The Data Fiduciary shall, before processing any personal data of a child, obtain verifiable consent of the parent of such child. | Enacted; subordinate rules on verification mechanisms pending notification. | Consent must be captured from a verified parent/guardian. Minor children cannot provide legal consent. | Captured via unbundled checkboxes with phone OTP verification (`WS-09B.6`, `WS-10.3`). | **LQ-01:** What constitutes legally acceptable "verifiable consent" under DPDP Rules for offline/online coaching centers? |
| **Section 9(2)** | **Detrimental Effect Prohibition:** A Data Fiduciary shall not undertake such processing of personal data that is likely to cause any detrimental effect on the well-being of a child. | Enacted. | Zero comparative rankings, public leaderboards with child names, or developmental labeling (`WS-08.1`). | Self-baseline comparisons only; zero public shaming or ranking (`AAA-S3-SPEC-WS08-01`). | None (Core AAA educational philosophy). |
| **Section 9(3)** | **Tracking & Behavioral Monitoring Prohibition:** A Data Fiduciary shall not undertake tracking or behavioral monitoring of children or targeted advertising directed at children. | Enacted; exemptions for educational purposes subject to Government notification. | Prohibit tracking minor students across external websites or deploying third-party tracking pixels on student learning screens (`/practice/*`). | Strict Zero-PII Telemetry (`WS-09B.4`, `WS-10.4`); GA4/GTM strictly excluded from authenticated student practice routes. | **LQ-02:** Does educational telemetry (quiz speed, accuracy) qualify for the statutory educational exemption under Section 9? |
| **Section 6** | **Notice & Purpose Limitation:** The Data Fiduciary must give clear notice describing the personal data sought and the purpose of processing. | Enacted; format subject to rules. | Form notice presented in plain English and Marathi at all enquiry touchpoints. | 4-Field Enquiry Modal explicitly displays purpose notice (`WS-06.1`, `WS-09B.1`). | **LQ-03:** Review of plain-language Marathi & English parent privacy notice text. |
| **Section 8(7)** | **Data Erasure & Purpose Cessation:** Personal data must be erased upon the Data Principal withdrawing consent or once the specified purpose is fulfilled. | Enacted. | Automated 90-day retention purge for non-enrolled leads (`BRD-S2-LEAD-03`). | Automated database cron trigger purging non-enrolled leads after 90 days (`WS-09B.3`). | **LQ-04:** Alignment of 90-day lead purge with consumer protection limitation periods. |

---

## 3. Privacy Requirements Matrix Across AAA Data Domains

The matrix below maps DPDP principles across all 12 AAA data categories ratified in `AAA_WS09A_Data_Classification_and_Retention_Architecture.md`:

| Req ID | AAA Data Domain | Statutory Principle | Required Privacy Control in Architecture | Responsible Owner | Verification Evidence Required | Stage 4 Implementation Dependency |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| **PRV-01** | **Inbound Leads** | Purpose Limitation & Minimization | Strictly limited to 4 fields (Parent Name, Mobile, Age/Grade, Program). Zero child DOB or school collected at inquiry. | Nitin Patil | Form schema inspection (`WS-09B.1`). | Client & Server Zod schema validator. |
| **PRV-02** | **Student Identity** | Minor Data Protection | Permanent Student ID generated as internal UUIDv7; human token `AAA-STU-YYYY-XXXX`. Zero email addresses as primary keys. | Nitin Patil | Relational database schema (`WS-09A.1`). | PostgreSQL migration scripts. |
| **PRV-03** | **Parent Consent** | Consent Record-Keeping | Consent records store timestamp, IP (masked), consent version, purpose tag (Transactional vs Marketing). | Nitin Patil | Audit ledger in `lead_inquiries` table (`WS-09B.3`). | Consent logging database table. |
| **PRV-04** | **Enquiry Retention** | Purpose Cessation | Non-enrolled lead records permanently deleted after 90 days. | Nitin Patil | Database purge trigger / cron job. | Automated background cleanup worker. |
| **PRV-05** | **Student Academic History** | Integrity & Accountability | Practice attempts, level milestones, and certificates preserved indefinitely for student portfolio verification. | Neha Patil | Historical attempt immutability trigger. | Append-only database constraints. |
| **PRV-06** | **Fee & Payment Records** | Statutory Tax Compliance | Fee invoices retained for 8 financial years under Section 44AA of the Income Tax Act, 1961. | Nitin Patil | Financial ledger access restriction. | RBAC permissions restricting billing tables. |
| **PRV-07** | **Discovery Observations** | Confidential Evaluation | 6-Dimension Observation reports accessible exclusively by Neha Patil and the child's verified parents. | Neha Patil | Row-Level Security (RLS) policies. | Authentication token claim validation. |
| **PRV-08** | **Digital Achievement Records** | Transparency & Verifiability | Public verification records show only student first name, level, and issue date; zero child PII or performance scores exposed. | Nitin Patil | Verification endpoint schema (`WS-10.5`). | Public verification API route. |

---

## 4. Formal Legal Questions for Indian Legal Counsel Review

Prior to Stage 4 production deployment, Nitin Patil and Neha Patil shall submit the following structured legal brief to qualified Indian legal counsel:
1. **Verification of Parental Authority:** Does capturing parent phone number via SMS/WhatsApp OTP satisfy Section 9(1) verifiable parental consent for an educational coaching academy, or is Aadhaar/DigiLocker verification mandated once rules commence?
2. **Educational Telemetry Exemption:** Do AcademyOS speed math practice drills (tracking calculation speed, response latency, and error types) fall under standard educational assessment, or do they constitute restricted "tracking/behavioral monitoring" under Section 9(3)?
3. **Retention Conflict Analysis:** Reconciling the 90-day inquiry deletion rule with statutory limitation periods under the Consumer Protection Act, 2019 (where a consumer dispute might arise up to 2 years later).
4. **Offline Local Storage Buffers:** Does caching encrypted parent lead details in browser `localStorage` on a shared household computer constitute an unauthorized disclosure risk under DPDP security safeguard guidelines?

---

## 5. Stage-Gate Acceptance & Verification

This specification satisfies **WS-10.1** under Stage 3 Workstream WS-10. It is submitted in **DRAFT** status and will be formally reviewed under Management Determination `MGT-DET-S3-14`. Gate 3.5 remains **OPEN**.
