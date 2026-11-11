# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# REQUIREMENTS-TO-ARCHITECTURE TRACEABILITY MATRIX

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Leadership:** Neha Patil (Founder & Academic Director), Nitin Patil (Operations & Technology Lead)  
**Governance Stage:** Stage 3 — Architecture & Design  
**Previous Stage:** Stage 2 — Business Requirements (Ratified & Closed on 03 Nov 2026)  
**Management Authority:** Overall Stage 3 Commencement Authorized; Traceability Baseline Submitted for Approval  
**Document Ref:** `docs/03_solution_architecture/AAA_Stage3_Requirements_to_Architecture_Traceability.md`  
**Date:** November 03, 2026  
**Status:** 🟡 **SUBMITTED FOR MANAGEMENT APPROVAL — RECONCILED TRACEABILITY MATRIX**  

---

## 1. Executive Summary & Purpose

This matrix establishes complete, unbroken bi-directional traceability connecting every ratified Stage 2 business requirement (`REQ-STRAT`, `REQ-BRAND`, `REQ-PED`, `REQ-ACAD`, `REQ-JOUR`, `REQ-PRIV`, `REQ-TECH`) to its originating Stage 2 decision, its assigned Stage 3 architecture workstream, its specific architecture deliverables, and its planned Stage 4 implementation destination.

---

## 2. Requirements-to-Architecture Mapping (All 43 Unique Specifications)

### 2.1 Strategy & Brand Requirements (`REQ-STRAT`, `REQ-BRAND`)

| Master Req ID | Requirement Statement | Originating Decision ID | Assigned Stage 3 WS | Primary Architecture Deliverable | Stage 4 Implementation Target | Acceptance Benchmark |
|---|---|:---:|:---:|---|---|---|
| **REQ-STRAT-01** | Strict 5-Student Batch Ceiling | `DEC-WS01-01` | WS-07 | `AAA_WS07_Batch_Scheduling_and_Room_Allocation_Rules.md` | Batch Timetable Refactor | Timetable enforces $\le 5$ students/batch. |
| **REQ-STRAT-02** | Offline-First Growth Strategy | `DEC-WS01-04` | WS-06 | `AAA_WS06_Information_Architecture_and_Sitemap_Spec.md` | Homepage & CTA Routing | Marketing and SEO prioritize in-center visits in Wakad. |
| **REQ-STRAT-03** | B2C Primary Admissions Engine | `DEC-WS01-05` | WS-06 | `AAA_WS06_Information_Architecture_and_Sitemap_Spec.md` | Navigation IA & Hero UX | Public routes optimized for parent conversion. |
| **REQ-STRAT-04** | Leadership Governance Balance | `DEC-WS01-06` | WS-07 | `AAA_WS07_Admissions_and_Enquiry_Operating_Process_Spec.md` | Operational SOPs | Administrative triage protects founder teaching hours. |
| **REQ-STRAT-05** | Zero Arbitrary Quotas Protocol | `DEC-WS01-10` | WS-07 | `AAA_WS07_Admissions_and_Enquiry_Operating_Process_Spec.md` | KPI Dashboard Framework | Conversion targets logged post-baseline. |
| **REQ-BRAND-01** | Master Brand Positioning Statement | `DEC-WS02-01` | WS-06 | `AAA_WS06_Component_Hierarchy_and_Layout_Blueprints.md` | Metadata & Hero Component | Approved brand positioning rendered uniformly. |
| **REQ-BRAND-02** | Master Website H1 Statement | `DEC-WS02-13` | WS-06 | `AAA_WS06_Component_Hierarchy_and_Layout_Blueprints.md` | `Hero.tsx` Refactoring | Ratified H1 (*"Beyond Calculation. Towards Confident Mathematical Thinking."*) and approved subheadline deployed verbatim with zero discrepancies. |
| **REQ-BRAND-03** | Monolithic Master Brand & Route Preservation | `DEC-WS02-03` | WS-06 | `AAA_WS06_Information_Architecture_and_Sitemap_Spec.md` | Route Preservation Matrix | All 30 repository route definitions + 1 legacy hash handler preserved. |
| **REQ-BRAND-04** | Transformation Value Narrative | `DEC-WS02-04` | WS-06 | `AAA_WS06_Component_Hierarchy_and_Layout_Blueprints.md` | Course Pages Refactoring | 5 transformation pairs rendered without false claims. |
| **REQ-BRAND-05** | Micro-Batch Slogan (Max 5 Students) | `DEC-WS02-05` | WS-06 | `AAA_WS06_Component_Hierarchy_and_Layout_Blueprints.md` | Sitewide Copy Refactoring | Universal slogan deployed; legacy 1:8 removed. |
| **REQ-BRAND-06** | Verified Social Proof Anchor (74+ Reviews) | `DEC-WS02-11` | WS-06 | `AAA_WS06_Component_Hierarchy_and_Layout_Blueprints.md` | Trust Bar Component | Verified 74+ review counter with refresh logic. |
| **REQ-BRAND-07** | Ethical Differentiation Policy | `DEC-WS02-14` | WS-06 | `AAA_WS06_Component_Hierarchy_and_Layout_Blueprints.md` | Content Refactoring | Zero disparaging competitor claims in copy. |

---

### 2.2 Pedagogy & Academic Requirements (`REQ-PED`, `REQ-ACAD`)

| Master Req ID | Requirement Statement | Originating Decision ID | Assigned Stage 3 WS | Primary Architecture Deliverable | Stage 4 Implementation Target | Acceptance Benchmark |
|---|---|:---:|:---:|---|---|---|
| **REQ-PED-01** | The AAA Learning Model™ Progression | `DEC-WS02-12`, `04-04` | WS-08 | `AAA_WS08_Learning_Model_Lesson_Plan_Architecture.md` | Lesson Plan System | 1-page standardized lesson templates in batches. |
| **REQ-PED-02** | Eight Child Development Intelligence Pillars | `DEC-WS04-06` | WS-08 | `AAA_WS08_Child_Development_Observation_and_Rubrics_Spec.md` | Progress Reporting Engine | Exact 8 approved pillar names locked. |
| **REQ-PED-03** | Six Educational Observation Dimensions | `DEC-WS05-03` | WS-08 | `AAA_WS08_Diagnostic_Intake_and_Crossover_Rubric_Spec.md` | Discovery Intake Forms | Discovery Session cites exact 6 approved dimensions. |
| **REQ-PED-04** | Mandatory Non-Diagnostic Safeguards | `DEC-WS04-06` | WS-08 | `AAA_WS08_Child_Development_Observation_and_Rubrics_Spec.md` | Editorial Guidelines | Zero clinical diagnostic terms (ADHD, dyscalculia); zero Child Intelligence Scores. |
| **REQ-PED-05** | Individual Self-Comparison Policy | `DEC-WS02-10` | WS-08 | `AAA_WS08_Child_Development_Observation_and_Rubrics_Spec.md` | Assessment Reporting UI | Child evaluated against self; zero public rankings. |
| **REQ-PED-06** | Elimination of Speed Hyperbole (10x-15x) | `DEC-WS05-09` | WS-06 | `AAA_WS06_Component_Hierarchy_and_Layout_Blueprints.md` | Vedic Copy Refactoring | Multiplier claims replaced with poise and accuracy. |
| **REQ-ACAD-01** | Current Programme Portfolio Grouping (6 Streams) | `DEC-WS04-01` | WS-06 / WS-08 | `AAA_WS06_Information_Architecture_and_Sitemap_Spec.md` | Course Pages Hierarchy | 6 streams presented as portfolio grouping pending academic validation by Neha Patil. |
| **REQ-ACAD-02** | Programme Eligibility Working Brackets | `DEC-WS04-02` | WS-08 | `AAA_WS08_Diagnostic_Intake_and_Crossover_Rubric_Spec.md` | Intake Age Validation | Age brackets treated as working guidelines; zero invented eligibility rules. |
| **REQ-ACAD-03** | Module vs Level Progression Reconciliation | `DEC-WS04-03` | WS-08 | `AAA_WS08_Learning_Model_Lesson_Plan_Architecture.md` | Syllabus Mapping Tables | 14 software modules crosswalked to physical books. |
| **REQ-ACAD-04** | Four-Layer Assessment & Milestone Model | `DEC-WS04-07` | WS-08 | `AAA_WS08_Level1_Summative_Assessment_Blueprint_and_Keys.md` | Examination System | Layer C papers authored with passing benchmarks. |
| **REQ-ACAD-05** | Practice Drill Certificate Software Re-Labeling | `DEC-WS04-07` | WS-10 | `AAA_WS10_Practice_Achievement_Records_and_Certificate_Options_Spec.md` | `certificateGenerator.ts` | PDF heading re-labeled "Practice Achievement Record". |
| **REQ-ACAD-06** | Voluntary Competition & Olympiad Policy | `DEC-WS04-09` | WS-07 | `AAA_WS07_Batch_Scheduling_and_Room_Allocation_Rules.md` | Competition Track Hub | Voluntary status and separate fee cards published. |
| **REQ-ACAD-07** | Calm Home Practice Guidelines (10–15 min) | `DEC-WS04-12` | WS-08 | `AAA_WS08_Learning_Model_Lesson_Plan_Architecture.md` | Parent Practice Guides | 1-page parent guides delivered at onboarding. |

---

### 2.3 Customer Journey & Privacy Requirements (`REQ-JOUR`, `REQ-PRIV`)

| Master Req ID | Requirement Statement | Originating Decision ID | Assigned Stage 3 WS | Primary Architecture Deliverable | Stage 4 Implementation Target | Acceptance Benchmark |
|---|---|:---:|:---:|---|---|---|
| **REQ-JOUR-01** | Eight-Stage Customer Journey Architecture | `DEC-WS03-02` | WS-06 / WS-07 | `AAA_WS06_Mobile_ThumbZone_and_Conversion_Flow_Spec.md` | Public Funnel Workflow | All touchpoints from Discovery to Advocacy mapped. |
| **REQ-JOUR-02** | Standardized Discovery Session CTA | `DEC-WS05-03` | WS-06 | `AAA_WS06_Component_Hierarchy_and_Layout_Blueprints.md` | Button & Modal CTAs | Approved naming rendered sitewide. |
| **REQ-JOUR-03** | Discovery Session Practice & Diagnostic Feedback | `DEC-WS02-09` | WS-08 | `AAA_WS08_Diagnostic_Intake_and_Crossover_Rubric_Spec.md` | Intake Consultation Print | Documented ~45–90 min practice & 11-point feedback sheet (not guaranteed duration). |
| **REQ-JOUR-04** | Enquiry Response Standard (2 Hours) | `DEC-WS05-07` | WS-07 | `AAA_WS07_Admissions_and_Enquiry_Operating_Process_Spec.md` | Operational Triage | 2-hour response tracked during confirmed hours. |
| **REQ-JOUR-05** | Eight-Status Admissions Funnel Lifecycle | `DEC-WS05-08` | WS-07 | `AAA_WS07_Admissions_and_Enquiry_Operating_Process_Spec.md` | Lead Tracking SOP | Leads progress through 8 mutually exclusive statuses. |
| **REQ-JOUR-06** | Strict Definition of an Admission | `DEC-WS05-08` | WS-07 | `AAA_WS07_Admissions_and_Enquiry_Operating_Process_Spec.md` | Fee Accounting Protocol | Admission recorded ONLY upon verified fee payment. |
| **REQ-PRIV-01** | Four-Field Maximum Enquiry Form UX | `DEC-WS05-04` | WS-06 | `AAA_WS06_Mobile_ThumbZone_and_Conversion_Flow_Spec.md` | `LeadForm.tsx` Refactor | Enquiry form restricted to 4-field max concept (Parent Name req, Mobile req, Age/Grade at least one req, Programme opt). |
| **REQ-PRIV-02** | Dual Consent Architecture (Unbundled) | `DEC-WS05-04` | WS-10 | `AAA_WS10_Parental_Consent_Logging_and_Data_Rights_SOP.md` | Form Checkbox Component | Declining marketing does not block enquiry submit. |
| **REQ-PRIV-03** | Zero-PII Analytics Telemetry Design Objective | `DEC-WS04-14` | WS-09B / WS-10 | `AAA_WS09_Zero_PII_Telemetry_and_Data_Classification_Spec.md` | `analytics.ts` Refactor | Data-flow validated; indirect identifiers (IPs, cookies) assessed; zero PII sent. |
| **REQ-PRIV-04** | Sovereign Student Identity & Sibling Model | `DEC-WS04-13` | WS-09A | `AAA_WS09_Permanent_Student_Identity_and_Candidate_Format_Options.md` | Relational Database Schema | 1 Parent Entity links cleanly to multiple siblings. Complete data model from business SOPs. |
| **REQ-PRIV-05** | Lead Register Access & Security Prerequisite | `DEC-WS05-08` | WS-09B / WS-10 | `AAA_WS09_Lead_Capture_Data_Contracts_and_Webhook_Spec.md` | Tool Security Hardening | Signed security/access audit before tool go-live. |
| **REQ-PRIV-06** | Parent Statutory Data Rights SOP | `DEC-WS04-14` | WS-10 | `AAA_WS10_DPDP_Legal_Questions_and_Data_Classification_Spec.md` | Administrative SOP | Written DPDP legal questions reviewed by qualified legal counsel. |

---

### 2.4 Technology & Architecture Requirements (`REQ-TECH`)

| Master Req ID | Requirement Statement | Originating Decision ID | Assigned Stage 3 WS | Primary Architecture Deliverable | Stage 4 Implementation Target | Acceptance Benchmark |
|---|---|:---:|:---:|---|---|---|
| **REQ-TECH-01** | Ten AcademyOS Architecture Principles | `DEC-WS04-10` | WS-11 | `AAA_Stage3_Architecture_Principles_and_Standards.md` | Master Architecture | Design specs comply with P-01..10 without exception. |
| **REQ-TECH-02** | Existing Practice Portal Boundary Protection | `AGENTS.md` Rule 3 | WS-07 / WS-11 | `AAA_WS07_AcademyOS_Route_Boundary_and_Interface_Contract.md` | Routing Architecture | `/login` and `/practice/*` routes untouched. |
| **REQ-TECH-03** | Public Cloud Storage Cutover & Rollback | `DEC-WS04-10` | WS-11 | `AAA_WS11_Data_Migration_Integrity_and_Rollback_Strategy.md` | Database Cutover Sprint | Public JSON endpoint eliminated with zero data loss. |
| **REQ-TECH-04** | Central Certificate Ledger & QR Verification | `DEC-WS04-07` | WS-10 | `AAA_WS10_Practice_Achievement_Records_and_Certificate_Options_Spec.md` | Certificate Ledger DB | Proposed database ledger with public QR verification endpoint. |
| **REQ-TECH-05** | Browser Storage Security & Session Expiry | `DEC-WS04-10` | WS-10 | `AAA_WS10_Browser_Storage_Security_and_Session_Policy.md` | Auth State Refactor | Client cache cleared on logout; sensitive data encrypted. |
| **REQ-TECH-06** | Server-Side Privilege & Authorization Verification | `DEC-WS04-10` | WS-11 | `AAA_WS11_API_Contracts_and_Decoupled_Service_Spec.md` | API Gateway Layer | Administrative mutations validated server-side. |

---
*End of Stage 3 Requirements-to-Architecture Traceability Matrix — Arnav Abacus Academy (AAA)*
