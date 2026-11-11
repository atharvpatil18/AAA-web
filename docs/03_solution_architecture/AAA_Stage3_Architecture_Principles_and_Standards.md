# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# ARCHITECTURE PRINCIPLES & STANDARDS

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Leadership:** Neha Patil (Founder & Academic Director), Nitin Patil (Operations & Technology Lead)  
**Governance Stage:** Stage 3 — Architecture & Design  
**Previous Stage:** Stage 2 — Business Requirements (Ratified & Closed on 03 Nov 2026)  
**Management Authority:** Formally Ratified by Neha Patil & Nitin Patil on 03 November 2026 via `MGT-DET-S3-01` (Gate 3.0B Passed)  
**Document Ref:** `docs/03_solution_architecture/AAA_Stage3_Architecture_Principles_and_Standards.md`  
**Date:** November 03, 2026  
**Status:** 🟢 **ACTIVE GOVERNANCE BASELINE — ARCHITECTURAL PRINCIPLES RATIFIED**  

---

## 1. Executive Summary & Purpose

This document establishes the mandatory architectural principles, technical standards, pedagogical safeguards, and compliance criteria governing all solution designs produced in Stage 3. Every specification, wireframe, database schema, and integration pattern must strictly comply with these standards.

---

## 2. The Seven Mandatory Architecture Principles

### Principle 1: Technology Neutrality & Options-Analysis Discipline
* **Current Technology Baseline:** The active application baseline is built upon **React 19, TypeScript, React Router v7, and Vite**. This baseline is stable, performant, and currently running.
* **Proposed Architecture Options (NOT Approved Decisions):**
  The following technical mechanisms are classified strictly as **proposed options undergoing evaluation**, not approved mandates:
  - Framework migration (e.g., Next.js / Edge SSR / SSG).
  - Interim CRM tooling (e.g., Google Sheets webhook ingestion vs lightweight sovereign database).
  - Telemetry pipeline (e.g., Google Tag Manager vs direct sovereign event logging).
  - Certificate verification infrastructure (e.g., cryptographic hashing vs central database lookup).
  - CI/CD build automation and infrastructure hosting topologies.
  - Performance budgets and disaster recovery SLAs.
* **Mandatory Options-Analysis Structure:** Prior to recommending any material technology decision or migration, a formal evaluation must document:
  1. *Current State:* Operational baseline and existing capabilities.
  2. *Business Need:* Underlying educational, operational, or business problem.
  3. *Options Considered:* Exhaustive analysis of viable alternatives (including retaining current baseline).
  4. *Advantages & Disadvantages:* Technical, operational, and user experience trade-offs.
  5. *Migration Effort & Cost:* Implementation hours, developer capacity, licensing, and operational expense.
  6. *Security & Privacy Implications:* Attack surfaces, minor data protection, and DPDP alignment.
  7. *Compatibility with Existing Functionality:* Zero disruption to active AcademyOS practice sessions.
  8. *Architectural Recommendation:* Evidence-based choice.
  9. *Approval Authority:* Designated management signatory (Neha Patil and/or Nitin Patil).
* *Governance Rule:* **No technology migration is approved by this document or Stage 3 initiation.**

### Principle 2: AcademyOS Boundary & Active System Protection
* The student practice and learning platform under `/login`, `/practice`, `/practice/session`, and `/practice/results` represents active classroom infrastructure.
* **Boundary Protection Safeguards:**
  - Zero unauthorized changes to learning routes, drill question generation logic, or session states.
  - Architecture specifications must not duplicate or replace existing Student, Parent, Course, Level, Batch, Attendance, Payment, or Assessment data entities without an approved Architecture Decision Record (ADR).
  - All public portal marketing enhancements (`AAA_WEB`) must remain decoupled from the active learning engine.

### Principle 3: Sovereign Student Identity & Candidate Format Analysis
* **Core Identity Principles:**
  1. *One Permanent Identity per Child:* Assigned upon admission and retained across the student's multi-year tenure.
  2. *Multi-Programme Association:* A single student record attaches cleanly to multiple concurrent or sequential academic programs without data overwrites.
  3. *Separate Sibling Identities:* Siblings sharing parent contact numbers must retain separate, segregated student records.
  4. *Duplicate Prevention:* Explicit identity matching logic prevents duplicate student profiles.
  5. *Historical Continuity:* Complete preservation of historical practice records and diagnostic baselines.
  6. *Privacy Protection:* Zero public exposure of unnecessary personal identifiers; IDs must be pseudonymous.
* **Candidate Format Status:** The format `AAA-STU-YYYY-XXXX` is evaluated strictly as a **candidate format** alongside alternatives (e.g., UUIDs, hashed alphanumeric strings, sequential prefixes) against privacy, scalability, and operational usability criteria in WS-09A.

### Principle 4: Academic Integrity, Development Pillars & Programme Portfolio
* **Programme Portfolio Grouping Status:**
  The six programme areas represent AAA's **current portfolio grouping only**.
  - *Academic Validation Pending:* Not all six programmes have independently validated curriculum structures, level progressions, or formal eligibility criteria. These remain subject to formal academic authoring and validation by **Neha Patil**.
  - *Zero Speculative Rules:* Architectural designs must not publish, assume, or invent rigid age eligibility rules.
* **Discovery Session Operational Reality:**
  - The free Discovery Session practice of **approximately 45–90 minutes, depending on child engagement and parent discussion**, is preserved as the documented operational practice.
  - It must **not** be represented or advertised as a fixed, guaranteed duration.
  - All representations must use the approved service name (*Discovery Session*) and cite the approved six educational observation dimensions.
* **Immutable Pedagogical Frameworks:**
  - The **AAA Learning Model™** must govern all batch lesson plans: *Inspire → Explore → Understand → Practice → Apply → Reflect*.
  - The **Eight Child Development Intelligence Pillars** are permanently locked: *Spatial Visualization, Working Memory & Mental Storage, Pattern Recognition, Rapid Information Processing, Sustained Attention & Focus, Cognitive Flexibility, Executive Function & Problem Solving, Self-Confidence & Mathematical Joy*.
  - The **Six Educational Observation Dimensions** are permanently locked: *Number Sense, Arithmetic Understanding, Logical Approach, Learning Attitude, Response and Engagement, Interest and Learning Passion*.
* **Multi-Dimensional Evaluation Separation:** Architecture models must strictly distinguish:
  1. *Academic performance* (verified drill speed, accuracy, curriculum milestone completion).
  2. *Teacher observation* (qualitative classroom behavioral and engagement notes).
  3. *Parent feedback* (qualitative home practice observation).
  4. *Child self-reflection* (personal goal-setting and self-reflection).
* **Strict Non-Diagnostic Safeguards:**
  - Absolutely **zero overall Child Intelligence Scores (CIS)**, composite IQ numbers, or algorithmic ratings.
  - Absolutely **zero clinical labeling or diagnostic terminology** (e.g., ADHD, Dyscalculia, Dyslexia, ADD).
  - Student progress is evaluated strictly against the child's **own previous evidence and baseline**; zero public ranking boards or score shaming.
  - Focus, attentiveness, or smiling in class must be celebrated as educational engagement, never cited as clinical proof.
* **Academic Governance Authority:** **Neha Patil (Founder & Academic Director)** retains exclusive governance authority over academic definitions, assessment models, and the interpretation of developmental observations.

### Principle 5: Certificate Governance & Practice Records
* **Approved Software Terminology:** In-software generated PDF certificates from digital practice sessions remain strictly designated as **"Practice Achievement Records"**.
* **Proposed Architecture Options:** Central database ledgers, online QR verification endpoints, cryptographic verification algorithms, revocation workflows, and formal milestone certificate eligibility criteria are classified as **proposed architecture options** and **pending academic governance decisions**.
* **Accreditation Safeguards:** Architecture specifications must not imply university, government, or external institutional accreditation, nor create unearned certificate entitlements. Milestone certificates evaluate verified physical curriculum completion and Layer C summative evaluations only.

### Principle 6: Security, Privacy & Data Classification Architecture
* Privacy and data protection are fundamental architectural constraints, not post-implementation add-ons.
* **Enquiry Form Minimum Data Contract (Four-Field Maximum Concept):**
  1. *Parent Name* — Required.
  2. *Parent Mobile / WhatsApp* — Required.
  3. *Child Age Bracket OR School Grade* — At least one required.
  4. *Programme of Interest* — Optional.
  - *Maximum Concept Clarification:* Prospective parents are never presented with more than 4 intake inputs, and completing all four is not mandatory to submit an enquiry.
  - *Consent Separation:* Transactional communication consent is strictly separated from optional promotional marketing consent. Declining promotional consent must never block enquiry submission.
  - *Strict Data Prohibitions:* Absolutely zero collection of exact child date of birth (DOB), school name, residential address, or clinical/developmental history at initial enquiry.
* **Proposed Zero-PII Telemetry as a Design Objective:**
  Telemetry captures high-level funnel progression without transmitting personal identifiers into analytics platforms.
  - *Indirect Identifiers Assessment:* Architecture models must assess and mitigate risks from potential indirect identifiers: IP addresses, device identifiers, tracking cookies, URL query parameters, and third-party analytics metadata.
  - *Prohibited Telemetry Fields:* Under no circumstances shall child names, parent mobile numbers, exact DOBs, school names, residential addresses, or identifiable academic performance scores be sent into analytics tools (GA4 `G-M2EL9MYSRL`, GTM, or third-party trackers).
  - *Data Flow & Classification Framework:* Architecture specifications must define: Data Collected, Purpose, Destination, RBAC Access Permissions, Retention, Consent/Opt-Out, Third-Party Processors, and Deletion/Breach Response.
  - *Legal Compliance Governance:* Architectural designs shall **not** claim legal compliance or anonymity merely by referencing the DPDP Act 2023. Explicit legal questions must be formulated for formal qualified legal counsel review.

### Principle 7: Continuous Cross-Cutting Security & Accessibility Standards
* Security, privacy, and compliance (WS-10) operate as **continuous cross-cutting architectural controls from Day 1** across every workstream, not as a late-stage gate.
* **Comprehensive Accessibility Standards:**
  - Proposed Conformance Target: **WCAG 2.1 AA** (subject to formal automated and manual assistive testing).
  - *Keyboard Navigation:* Full interactive navigation via keyboard only with visible, high-contrast focus indicators.
  - *Screen Readers:* Accessible labels, semantic landmark regions, and live form announcements.
  - *Heading Hierarchy & Landmarks:* Semantic landmark regions (`<header>`, `<nav>`, `<main>`, `<footer>`), valid page language (`lang="en"`), and descriptive headings (WCAG 2.4.6 Level AA). The strictly single-`h1` convention is an **AAA content and architectural standard**, not a standalone WCAG AA requirement.
  - *Form Error Recovery:* Explicit text error messages associated with inputs via `aria-describedby` (WCAG 3.3.1, 3.3.3).
  - *Text Zoom & Reflow:* Resilient layout up to 200% zoom (WCAG 1.4.4) and reflow without horizontal scrolling at 320px (WCAG 1.4.10).
  - *Accessible Modals:* Focus trapping within open dialogs, Escape key dismiss, and background inerting (`aria-hidden="true"`).
  - *Reduced Motion:* Respects `prefers-reduced-motion: reduce` preference (classified as a WCAG 2.3.3 **AAA-level additional preference**, not a mandatory Level AA requirement).
  - *Touch Targets:* $\ge 48\times 48\text{px}$ touch targets enforced as an **AAA usability design preference** (not a substitute for WCAG standards).

---

## 3. Technical Quality & Performance Benchmarks

All digital components and systems designed in Stage 3 must adhere to the following rigorous engineering benchmarks:

| Standard | Target Benchmark | Governance / Verification Method |
|---|---|---|
| **TypeScript Strictness** | Strict compilation (`tsc --noEmit`), zero unchecked `any` | Automated CI pipeline check |
| **Largest Contentful Paint (LCP)** | $\le 2.5\text{ seconds}$ on mobile 4G networks | Lighthouse CI & Chrome DevTools |
| **Cumulative Layout Shift (CLS)** | $\le 0.1$ across all responsive views | Layout shift tracing |
| **Interaction to Next Paint (INP)** | $\le 200\text{ ms}$ on touch interactions | Core Web Vitals telemetry |
| **Accessibility (WCAG 2.1 AA)** | 100% compliance with Level AA criteria | Axe Accessibility Linter & Manual Screen Reader Test |
| **Mobile Responsiveness** | Flawless rendering from 320px to 4K without horizontal overflow | Cross-device viewport testing |
| **Form Security** | Anti-XSS sanitization, anti-formula injection, CSRF protection | Security review (`ACT-WS05-06`) |

---
*End of Stage 3 Architecture Principles & Standards — Arnav Abacus Academy (AAA)*
