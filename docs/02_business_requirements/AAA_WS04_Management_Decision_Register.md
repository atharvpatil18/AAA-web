# AAA MASTER BRD — WORKSTREAM 04 (WS-04)
# MANAGEMENT DECISION REGISTER
**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Role:** Lead Business Analyst, Academic Systems Architect & Security Governance Specialist  
**Governance Stage:** Stage 2 — Master Business Requirements Document (BRD) Workshop  
**Document Ref:** `docs/02_business_requirements/AAA_WS04_Management_Decision_Register.md`  
**Date:** November 02, 2026 (Ratified Final Edition)  
**Status:** 🟢 **FORMALLY RATIFIED & STAGE-GATE CLOSED BY MANAGEMENT**  

---

## 1. Purpose of this Register

This document records the fourteen strategic governance, academic, and architectural decisions formulated during **Workstream 04: Academic Programmes & Child Development (WS-04)**.

On **November 02, 2026**, AAA Management (**Neha Patil**, Founder & Academic Director, and **Nitin Patil**, Operations & Technology Lead) reviewed the complete WS-04 decision instrument (`AAA_WS04_Management_Decision_Brief.md`), accepted all recommendations as submitted without overrides, confirmed all four foundational operational baselines, and formally ratified all fourteen decisions in `AAA_Stage2_WS04_Formal_Closure.md`.

---

## 2. Summary Table: Workstream 04 Management Decisions

| Decision ID | Category | Decision Subject | Core Strategic Question | Formally Ratified Outcome | Governance Status | Management Ratification Record |
|---|---|---|---|---|:---:|---|
| **DEC-WS04-01** | Programmes | **Six-Programme Master Architecture** | Should AAA structure offerings as an interconnected 6-programme continuum? | **APPROVED WITH CONDITIONS** | 🟢 **RATIFIED** | Approved by Neha Patil & Nitin Patil (Nov 02, 2026). Continuum adopted; room allocation conditioned on audit (`ACT-WS04-08`). |
| **DEC-WS04-02** | Eligibility | **Programme Eligibility Reconciliation** | What age and grade boundaries should officially govern admissions? | **DEFERRED PENDING AUDIT** | 🟡 **RATIFIED DEFERRAL** | Approved by Neha Patil (Nov 02, 2026). Working brackets approved; exact cutoffs deferred pending diagnostic rubric (`ACT-WS04-22`). |
| **DEC-WS04-03** | Levels | **Level Progression Reconciliation** | How do 14 practice modules map to the historical 8-level Abacus programme? | **APPROVED WITH CONDITIONS** | 🟢 **RATIFIED** | Approved by Neha Patil (Nov 02, 2026). Practice module distinction approved; workbook mapping deferred to Stage 3 (`ACT-WS04-01`). |
| **DEC-WS04-04** | Teaching Model | **The AAA Learning Model™ Implementation** | How should the 6-stage model be standardized across daily batch lesson plans? | **APPROVED AS PILOT** | 🟢 **RATIFIED PILOT** | Approved by Neha Patil (Nov 02, 2026). Philosophy approved; 1-page templates piloted in 2 batches (`ACT-WS04-04`). |
| **DEC-WS04-05** | Competencies | **Twelve Mathematical Competencies** | Should AAA adopt the 12-competency framework to govern curriculum? | **DEFERRED PENDING PILOT** | 🟡 **RATIFIED DEFERRAL** | Approved by Neha Patil (Nov 02, 2026). Accepted in principle; full adoption deferred pending observation pilot (`ACT-WS04-28`). |
| **DEC-WS04-06** | Child Dev | **Eight Approved Child Development Pillars** | What exact pillar names and safeguards should govern progress reporting? | **APPROVED WITH CONDITIONS** | 🟢 **RATIFIED** | Approved by Neha Patil (Nov 02, 2026). 8 approved names & non-diagnostic safeguards locked; reporting rubrics deferred to Stage 3. |
| **DEC-WS04-07** | Assessment | **Four-Layer Assessment & Certificate Governance** | What evaluation framework and certificate rules should govern student advancement? | **APPROVED WITH CONDITIONS** | 🟢 **RATIFIED** | Approved by Neha Patil & Nitin Patil (Nov 02, 2026). 4 layers & 4 cert tiers approved; software re-labeled "Practice Records"; ledger in Stage 3. |
| **DEC-WS04-08** | Reporting | **Sustainable Bi-Monthly Reporting Model** | What cadence and format of parent progress reporting should be mandated? | **APPROVED AS PILOT** | 🟢 **RATIFIED PILOT** | Approved by Neha Patil & Nitin Patil (Nov 02, 2026). Bi-monthly qualitative updates approved as operational pilot following census audit (`ACT-WS04-13`). |
| **DEC-WS04-09** | Competitions | **Voluntary Competition & Olympiad Policy** | How should competitive tournament coaching (IPM, IMO) be structured and billed? | **APPROVED WITH CONDITIONS** | 🟢 **RATIFIED** | Approved by Neha Patil (Nov 02, 2026). Voluntary status approved; separate fee cards conditioned on calendar review (`ACT-WS04-09`, `23`). |
| **DEC-WS04-10** | Technology | **Ten AcademyOS Principles & Security Remediation** | What architectural principles and security remediations must govern enhancements? | **APPROVED** | 🟢 **RATIFIED** | Approved by Nitin Patil (Nov 02, 2026). 10 principles (P-01..10) locked as mandatory constraints for Stage 3 BRD. |
| **DEC-WS04-11** | Quality | **Educator Standards & Micro-Batch Integrity** | What classroom standards and batch ceiling policies must be enforced? | **APPROVED WITH CONDITIONS** | 🟢 **RATIFIED** | Approved by Neha Patil & Nitin Patil (Nov 02, 2026). 5-student cap reaffirmed; room compliance conditioned on premises audit (`ACT-WS04-08`). |
| **DEC-WS04-12** | Home Practice | **Programme-Wise Home Practice Framework** | What home practice guidelines should be officially recommended to parents? | **APPROVED AS PILOT** | 🟢 **RATIFIED PILOT** | Approved by Neha Patil (Nov 02, 2026). Compulsory homework rejected; 10–15 min/day parent guides approved for pilot (`ACT-WS04-12`). |
| **DEC-WS04-13** | Identity | **Student Identity & Relational Structure** | How should student identities and sibling relationships be structured in future software? | **APPROVED WITH CONDITIONS** | 🟢 **RATIFIED** | Approved by Nitin Patil (Nov 02, 2026). Permanent child ID and sibling linkage approved; ID format and schema deferred to Stage 3. |
| **DEC-WS04-14** | Security | **Security Remediation & Consent Governance** | How and when should cloud sync, leaderboard, and console OTP vectors be remediated? | **APPROVED WITH CONDITIONS** | 🟢 **RATIFIED** | Approved by Nitin Patil (Nov 02, 2026). Privacy-by-design approved; cutover in Stage 4 following Stage 3 architecture; Stage 2 code changes rejected. |

---

## 3. Detailed Decision Sheets Formally Ratified by Management

### DEC-WS04-01: Six-Programme Master Architecture
* **Decision ID:** `DEC-WS04-01`
* **Title:** Six-Programme Master Offering Architecture
* **Current Operational Fact:** AAA delivers Abacus, Vedic Maths, Mental Maths, School Maths, IPM Prep, and Olympiad Maths at Balaji Sagar Bungalow, Wakad.
* **Strategic Rationale:** Structuring offerings as an interconnected 6-programme continuum prevents marketing confusion, eliminates channel cannibalization, and provides a multi-year learning roadmap for parents.
* **Formally Ratified Management Position:** **APPROVED WITH CONDITIONS**
* **Approved Scope & Governing Terms:** Formally adopt the six interconnected programmes (Soroban Abacus, Vedic Maths, Mental Maths, School Maths, IPM Prep, Olympiad Maths). Classify IPM and Olympiad as specialized competitive enrichment tracks with dedicated batch slots and separate fee structures. Detailed physical room allocations and timetable slots are conditioned on the facility capacity audit (`ACT-WS04-08`).
* **Accountable Decision-Maker:** **Academic Director (Neha Patil)** & **Operations Lead (Nitin Patil)**.
* **Governance Status:** 🟢 **FORMALLY RATIFIED (APPROVED WITH CONDITIONS)**
* **Management Ratification Record:** Confirmed and ratified by Neha Patil & Nitin Patil on November 02, 2026. Ref: `AAA_Stage2_WS04_Formal_Closure.md`.

---

### DEC-WS04-02: Programme Eligibility Reconciliation
* **Decision ID:** `DEC-WS04-02`
* **Title:** Programme Eligibility and Age Boundary Reconciliation
* **Current Operational Fact:** Marketing copy contains overlapping references (e.g., Abacus listed as 4.5–9 in `data.ts` and 4–14 in `ProgramAbacus.tsx`).
* **Strategic Rationale:** Clear entry criteria prevent developmental mismatch, such as enrolling 5-year-olds in abstract Vedic mathematics or 12-year-olds in early abacus bead manipulation.
* **Formally Ratified Management Position:** **DEFER EXACT BOUNDARIES PENDING AUDIT**
* **Approved Scope & Governing Terms:** Proposed working age brackets (Soroban Abacus 4.5–9 years, Vedic Maths 9–14 years, Mental Maths 6–14 years, School Maths Grades 1–10, IPM Grades 2–7, Olympiad Grades 2–9) are approved as working intake guidelines. Exact cutoff boundaries and diagnostic crossover rules are deferred pending diagnostic intake rubric validation (`ACT-WS04-22`).
* **Accountable Decision-Maker:** **Academic Director (Neha Patil)**.
* **Governance Status:** 🟡 **FORMALLY RATIFIED (DEFERRED PENDING AUDIT)**
* **Management Ratification Record:** Confirmed and ratified by Neha Patil on November 02, 2026. Ref: `AAA_Stage2_WS04_Formal_Closure.md`.

---

### DEC-WS04-03: Level Progression Reconciliation
* **Decision ID:** `DEC-WS04-03`
* **Title:** Abacus & Vedic Software Modules vs. Academic Curriculum Levels Reconciliation
* **Current Operational Fact:** Codebase contains 14 Abacus practice modules (`JR-0` to `SR-10`) and 8 Vedic suites (`JVM-1`, `SVM-0` to `SVM-6`), whereas management historically references an 8-level Abacus academic programme.
* **Strategic Rationale:** Avoids conflating digital drill question sets with accredited curriculum milestones; protects academic rigor.
* **Formally Ratified Management Position:** **APPROVED WITH CONDITIONS**
* **Approved Scope & Governing Terms:** Strictly maintain the governance distinction that software practice modules represent digital drill sets rather than accredited academic semesters. Preserve the 8-level Abacus programme as a historical management reference. Physical workbook crosswalks and formal syllabus mapping (`ACT-WS04-01`, `ACT-WS04-20`) are deferred to Stage 3 inputs.
* **Accountable Decision-Maker:** **Academic Director (Neha Patil)**.
* **Governance Status:** 🟢 **FORMALLY RATIFIED (APPROVED WITH CONDITIONS)**
* **Management Ratification Record:** Confirmed and ratified by Neha Patil on November 02, 2026. Ref: `AAA_Stage2_WS04_Formal_Closure.md`.

---

### DEC-WS04-04: The AAA Learning Model™ Implementation
* **Decision ID:** `DEC-WS04-04`
* **Title:** Standardized Implementation of The AAA Learning Model™ (6 Stages)
* **Current Operational Fact:** The 6-stage model (*Inspire → Explore → Understand → Practice → Apply → Reflect*) is the approved brand philosophy but lacks standardized written lesson plan templates across daily batches.
* **Strategic Rationale:** Standardizing lesson plan delivery ensures consistent educational quality regardless of which educator mentors the micro-batch.
* **Formally Ratified Management Position:** **APPROVED AS PILOT**
* **Approved Scope & Governing Terms:** Approve the 6-stage model (*Inspire → Explore → Understand → Practice → Apply → Reflect*) as institutional philosophy. Authorize 1-page standardized lesson plan templates (`ACT-WS04-04`) for an operational pilot in 2 batches before mandatory universal rollout.
* **Accountable Decision-Maker:** **Academic Director (Neha Patil)**.
* **Governance Status:** 🟢 **FORMALLY RATIFIED (APPROVED AS PILOT)**
* **Management Ratification Record:** Confirmed and ratified by Neha Patil on November 02, 2026. Ref: `AAA_Stage2_WS04_Formal_Closure.md`.

---

### DEC-WS04-05: Twelve Mathematical Competencies Framework
* **Decision ID:** `DEC-WS04-05`
* **Title:** Formal Adoption of Twelve Core Mathematical Competencies
* **Current Operational Fact:** Student evaluation in practice software is currently tracked primarily through arithmetic accuracy and speed metrics.
* **Strategic Rationale:** Reinforces AAA's differentiation as a child-development academy cultivating durable reasoning and problem-solving habits rather than a mechanical speed-drilling franchise.
* **Formally Ratified Management Position:** **DEFER FULL ADOPTION PENDING PILOT**
* **Approved Scope & Governing Terms:** The 12 core competencies framework is accepted in principle. Full institutional adoption across reporting is deferred pending classroom observation rubric pilots (`ACT-WS04-28`) and educator workload calibration.
* **Accountable Decision-Maker:** **Academic Director (Neha Patil)**.
* **Governance Status:** 🟡 **FORMALLY RATIFIED (DEFERRED PENDING PILOT)**
* **Management Ratification Record:** Confirmed and ratified by Neha Patil on November 02, 2026. Ref: `AAA_Stage2_WS04_Formal_Closure.md`.

---

### DEC-WS04-06: Eight Approved Child Development Pillars
* **Decision ID:** `DEC-WS04-06`
* **Title:** Enforcing Approved Pillar Names and Non-Diagnostic Safeguards
* **Current Operational Fact:** Codebase and documents contain variations in developmental terms; earlier marketing used outcome-heavy claims.
* **Strategic Rationale:** Standardizing exact pillar names and enforcing strict non-diagnostic negative inference rules protects institutional credibility and child emotional welfare.
* **Formally Ratified Management Position:** **APPROVED WITH CONDITIONS**
* **Approved Scope & Governing Terms:** Formally lock the exact eight approved pillar names: (1) Spatial Visualization, (2) Working Memory, (3) Pattern Recognition, (4) Processing Speed, (5) Sustained Attention, (6) Cognitive Flexibility, (7) Executive Function, and (8) Mathematical Confidence. Enforce mandatory non-diagnostic safeguards: strictly zero ADHD/dyslexia labeling, zero composite IQ numbers, and explicit recognition that smiling or focus alone is not clinical proof. Measurement rubrics deferred to Stage 3.
* **Accountable Decision-Maker:** **Academic Director (Neha Patil)**.
* **Governance Status:** 🟢 **FORMALLY RATIFIED (APPROVED WITH CONDITIONS)**
* **Management Ratification Record:** Confirmed and ratified by Neha Patil on November 02, 2026. Ref: `AAA_Stage2_WS04_Formal_Closure.md`.

---

### DEC-WS04-07: Four-Layer Assessment & Certificate Governance Architecture
* **Decision ID:** `DEC-WS04-07`
* **Title:** Four-Layer Assessment Architecture & Certificate Governance Model
* **Current Operational Fact:** `PracticeResult.tsx` triggers client-side PDF diplomas via `jsPDF` with pseudo-random serial numbers (`AAA-INT-xxxxxx`) and public signature assets, lacking central registry verification.
* **Strategic Rationale:** Prevents unverified certificate issuance, eliminates forgery risks, and ensures progression reflects verified educator assessment.
* **Formally Ratified Management Position:** **APPROVED WITH CONDITIONS**
* **Approved Scope & Governing Terms:** The four-layer assessment architecture (Layer A: Practice Performance, Layer B: Formative Assessment, Layer C: Summative Assessment, Layer D: Educator Approval) and four-tier certificate model are approved in principle. Software-generated PDFs are re-labeled "Practice Achievement Records". Passing marks (70%/80%) and server-side verification ledger design are deferred to Stage 3 (`ACT-WS04-10`, `ACT-WS04-15`).
* **Accountable Decision-Maker:** **Academic Director (Neha Patil)** & **Operations Lead (Nitin Patil)**.
* **Governance Status:** 🟢 **FORMALLY RATIFIED (APPROVED WITH CONDITIONS)**
* **Management Ratification Record:** Confirmed and ratified by Neha Patil & Nitin Patil on November 02, 2026. Ref: `AAA_Stage2_WS04_Formal_Closure.md`.

---

### DEC-WS04-08: Sustainable Bi-Monthly Reporting Model
* **Decision ID:** `DEC-WS04-08`
* **Title:** Sustainable Parent Progress Reporting Cadence and Format
* **Current Operational Fact:** Parent progress updates occur informally at pickup; no standardized written progress schedule is operationalized.
* **Strategic Rationale:** Balances parental desire for structured developmental feedback with founder teaching bandwidth across 87+ students.
* **Formally Ratified Management Position:** **APPROVED AS PILOT**
* **Approved Scope & Governing Terms:** Standardize parent progress communication to bi-monthly (once every two months) qualitative reviews + Level Completion Milestone reports. Supplement with informal 2-minute pickup chats. Operational pilot authorized following student census audit and consultation time-budgeting (`ACT-WS04-13`).
* **Accountable Decision-Maker:** **Academic Director (Neha Patil)** & **Operations Lead (Nitin Patil)**.
* **Governance Status:** 🟢 **FORMALLY RATIFIED (APPROVED AS PILOT)**
* **Management Ratification Record:** Confirmed and ratified by Neha Patil & Nitin Patil on November 02, 2026. Ref: `AAA_Stage2_WS04_Formal_Closure.md`.

---

### DEC-WS04-09: Voluntary Competition & Olympiad Policy
* **Decision ID:** `DEC-WS04-09`
* **Title:** Voluntary Competition Coaching and Olympiad Fee Policy
* **Current Operational Fact:** Competitive coaching (IPM, IMO) is conducted alongside core academy classes.
* **Strategic Rationale:** Protects younger and remedial students from premature competitive pressure while offering an elite challenge track for highly motivated students.
* **Formally Ratified Management Position:** **APPROVED WITH CONDITIONS**
* **Approved Scope & Governing Terms:** Voluntary participation in IPM and Olympiads is approved as an absolute child-protection principle. Dedicated weekend batch slots, specialized materials, and separate published fee cards (`ACT-WS04-09`, `ACT-WS04-23`) are conditioned on operational calendar review.
* **Accountable Decision-Maker:** **Academic Director (Neha Patil)**.
* **Governance Status:** 🟢 **FORMALLY RATIFIED (APPROVED WITH CONDITIONS)**
* **Management Ratification Record:** Confirmed and ratified by Neha Patil on November 02, 2026. Ref: `AAA_Stage2_WS04_Formal_Closure.md`.

---

### DEC-WS04-10: Ten AcademyOS Principles & Security Remediation
* **Decision ID:** `DEC-WS04-10`
* **Title:** Ten Permanent AcademyOS Technology Principles & Security Remediation
* **Current Operational Fact:** Repository inspection identified public third-party storage sync, public leaderboard UI rendering student information, client-side permission checks, and plaintext browser storage.
* **Strategic Rationale:** Respects Stage 2 documentation-only boundaries; establishes strict, technology-neutral functional requirements for secure, private architecture in Stage 3 and Stage 4.
* **Formally Ratified Management Position:** **APPROVED**
* **Approved Scope & Governing Terms:** The 10 permanent technology-neutral architecture principles (P-01 to P-10) are formally approved as mandatory non-negotiable constraints for Stage 3 BRD. Technical vendor, database, and infrastructure selections are deferred to Stage 3 Architecture.
* **Accountable Decision-Maker:** **Operations & Technology Lead (Nitin Patil)**.
* **Governance Status:** 🟢 **FORMALLY RATIFIED (APPROVED)**
* **Management Ratification Record:** Confirmed and ratified by Nitin Patil on November 02, 2026. Ref: `AAA_Stage2_WS04_Formal_Closure.md`.

---

### DEC-WS04-11: Educator Standards & Micro-Batch Integrity
* **Decision ID:** `DEC-WS04-11`
* **Title:** Educator Mentoring Standards and Strict Micro-Batch Size Ceiling
* **Current Operational Fact:** Ratified decision DEC-WS02-05 establishes: *"Personalised learning in small batches, with a maximum of five students per batch."*
* **Strategic Rationale:** Direct, individualized attention ensures calculation slips are identified instantly, building deep parental trust and justifying premium tuition in Wakad.
* **Formally Ratified Management Position:** **APPROVED WITH CONDITIONS**
* **Approved Scope & Governing Terms:** Strict maximum 5 students per batch ceiling (DEC-WS02-05) is reaffirmed. Verification of physical classroom seating compliance is conditioned on the premises capacity audit (`ACT-WS04-08`).
* **Accountable Decision-Maker:** **Operations Lead (Nitin Patil)** & **Academic Director (Neha Patil)**.
* **Governance Status:** 🟢 **FORMALLY RATIFIED (APPROVED WITH CONDITIONS)**
* **Management Ratification Record:** Confirmed and ratified by Neha Patil & Nitin Patil on November 02, 2026. Ref: `AAA_Stage2_WS04_Formal_Closure.md`.

---

### DEC-WS04-12: Programme-Wise Home Practice Framework
* **Decision ID:** `DEC-WS04-12`
* **Title:** Programme-Wise Home Practice Framework (10–15 Minutes Per Day)
* **Current Operational Fact:** Home practice expectations are communicated verbally to parents, occasionally resulting in homework friction or over-practicing.
* **Strategic Rationale:** Nurtures daily arithmetic habit formation during short neuroplasticity windows without creating family conflict or tears.
* **Formally Ratified Management Position:** **APPROVED AS PILOT**
* **Approved Scope & Governing Terms:** Compulsory universal daily homework is rejected. Programme-tailored daily practice guidance (10–15 mins/day) positioning parents as calm encouragers is approved for pilot via 1-page parent guides (`ACT-WS04-12`).
* **Accountable Decision-Maker:** **Academic Director (Neha Patil)**.
* **Governance Status:** 🟢 **FORMALLY RATIFIED (APPROVED AS PILOT)**
* **Management Ratification Record:** Confirmed and ratified by Neha Patil on November 02, 2026. Ref: `AAA_Stage2_WS04_Formal_Closure.md`.

---

### DEC-WS04-13: Student Identity Integrity, Parent-Child Relational Structure & Sibling Enrolments
* **Decision ID:** `DEC-WS04-13`
* **Title:** Student Identity Integrity, Parent-Child Relational Structure & Sibling Enrolments
* **Current Operational Fact:** Codebase identifies users by a flat email string (`userEmail`), causing collisions if siblings share an email address.
* **Strategic Rationale:** A relational model ensures accurate longitudinal tracking, prevents sibling record overwrites, and supports multi-programme enrollments under a single parent account.
* **Formally Ratified Management Position:** **APPROVED WITH CONDITIONS**
* **Approved Scope & Governing Terms:** Core governance principles (one permanent Student ID per child, multi-programme attachment to the single child record, and parent account linkage to multiple siblings) are approved. The exact string format (`AAA-STU-YYYY-XXXX`) and relational database schemas are deferred to Stage 3 Architecture design (`ACT-WS04-14`).
* **Accountable Decision-Maker:** **Operations & Technology Lead (Nitin Patil)**.
* **Governance Status:** 🟢 **FORMALLY RATIFIED (APPROVED WITH CONDITIONS)**
* **Management Ratification Record:** Confirmed and ratified by Nitin Patil on November 02, 2026. Ref: `AAA_Stage2_WS04_Formal_Closure.md`.

---

### DEC-WS04-14: AcademyOS Security Remediation, Zero-PII Telemetry & Parental Consent Management
* **Decision ID:** `DEC-WS04-14`
* **Title:** AcademyOS Security Remediation, Zero-PII Telemetry & Parental Consent Management
* **Current Operational Fact:** Discovered technical baseline documented in `AAA_WS04_Security_Privacy_and_Certificate_Governance_Review.md`; zero code changes in Stage 2.
* **Strategic Rationale:** Establishes structured, architectural remediation in Stage 3 and Stage 4; strictly respects Stage 2 documentation-only boundaries while mitigating privacy risks.
* **Formally Ratified Management Position:** **APPROVED WITH CONDITIONS**
* **Approved Scope & Governing Terms:** Privacy-by-design, auditable parental consent logging, and parental statutory data rights are approved as mandatory requirements. Production cloud cutover, console OTP removal, and consent workflows are scheduled for Stage 4 implementation following Stage 3 architecture and legal review (`ACT-WS04-07`, `ACT-WS04-11`, `ACT-WS04-19`). Immediate code changes in Stage 2 are rejected.
* **Accountable Decision-Maker:** **Operations Lead (Nitin Patil)**.
* **Governance Status:** 🟢 **FORMALLY RATIFIED (APPROVED WITH CONDITIONS)**
* **Management Ratification Record:** Confirmed and ratified by Nitin Patil on November 02, 2026. Ref: `AAA_Stage2_WS04_Formal_Closure.md`.
