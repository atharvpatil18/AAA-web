# AAA MASTER BRD — WORKSTREAM 04 (WS-04)
# ASSESSMENT & EVIDENCE VALIDATION FRAMEWORK
**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Role:** Lead Business Analyst, Academic Systems Architect & Security Governance Specialist  
**Governance Stage:** Stage 2 — Master Business Requirements Document (BRD) Workshop  
**Document Ref:** `docs/02_business_requirements/AAA_WS04_Assessment_and_Evidence_Framework.md`  
**Date:** November 02, 2026 (Final Quality-Controlled Baseline)  
**Status:** 🟡 **DOCUMENTATION QUALITY CONTROL COMPLETE — AWAITING MANAGEMENT VALIDATION**  

---

## 1. Executive Summary & Purpose

This document establishes the **Assessment & Evidence Framework** for Arnav Abacus Academy.

In strict alignment with Stage 2 governance baselines:
* **Core Principle:** Assessment at AAA is a constructive diagnostic tool designed to celebrate individual student progress against their own prior baseline, rather than an exclusionary or punitive ranking mechanism.
* **Governance Standard:** A single test score percentage must **never** serve as the sole criterion for level progression or remedial placement. Progression requires holistic, educator-approved evidence across multiple dimensions.
* **Certificate Governance Standard:** Software-generated practice certificates must be strictly distinguished from formal academic diplomas. Digital certificates require central registry verification rather than cosmetic client-side numbers.

---

## 2. Distinction Across Four Educational Assessment Layers

To maintain operational clarity and prevent software scores from being mistaken for formal academic certification, AAA distinguishes four separate layers:

```
                          FOUR ASSESSMENT & EVALUATION LAYERS
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ LAYER A: PRACTICE PERFORMANCE (Informal & Self-Directed)                │
  │ • Daily workbook drills and AcademyOS online speed/instant practice.    │
  │ • Purpose: Habit formation, bead mechanics, fluency micro-drills.      │
  ├─────────────────────────────────────────────────────────────────────────┤
  │ LAYER B: FORMATIVE CLASSROOM ASSESSMENT (Ongoing & Observational)       │
  │ • Real-time educator monitoring during small batches (max 5 students).  │
  │ • Purpose: Immediate verbal coaching, hand posture, Yomiagezan dictation│
  ├─────────────────────────────────────────────────────────────────────────┤
  │ LAYER C: SUMMATIVE ACADEMIC ASSESSMENT (Structured Milestone Evaluation)│
  │ • Formal level evaluation paper administered at curriculum milestone.   │
  │ • Purpose: Measures tool accuracy, Anzan mental recall, and concepts.   │
  ├─────────────────────────────────────────────────────────────────────────┤
  │ LAYER D: EDUCATOR-APPROVED LEVEL COMPLETION (Professional Sign-Off)     │
  │ • Formal sign-off by Neha Patil integrating Layers A, B, and C.         │
  │ • Purpose: Authorizes Level Completion Certificate and next workbook.   │
  └─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Comprehensive Assessment Validation Matrix

The 70% (Abacus) and 80% (Vedic) thresholds historically cited in software files are **working proposals awaiting management validation**, not verified permanent benchmarks.

The table below defines the multi-dimensional blueprint governing future level evaluations:

| Assessment Dimension | Assessment Specification & Design Criteria | Abacus Programmes | Vedic Mathematics | School Maths & Olympiad |
|---|---|---|---|---|
| **1. Assessment Blueprint** | Standardized evaluation paper with balanced section weighting. | Written tool sums (40%), Anzan mental rows (30%), Oral dictation (30%). | Written sutra applications (50%), Mental speed rounds (30%), Beejank checks (20%). | Conceptual problem solving (60%), Step proofs (20%), Time trial (20%). |
| **2. Topic & Competency Coverage** | Full coverage of prescribed level syllabus. | Tests specific complements (e.g., Small Friends `+4`, Big Friends `-7`). | Tests specific sutras (e.g., *Nikhilam* base 100, *Urdhva* 2D×2D). | Aligned with school board chapter objectives and Olympiad logic topics. |
| **3. Question Difficulty Calibration** | Balanced distribution across cognitive tiers. | 50% direct/basic, 30% intermediate complements, 20% speed endurance. | 40% direct sutra application, 40% mixed base, 20% complex verification. | 40% textbook standard, 40% multi-step word problems, 20% non-routine HOTS. |
| **4. Accuracy Standards** | Proposed working thresholds `[PENDING VALIDATION]`. | Proposed: ≥70% overall; must achieve ≥60% on Anzan section independently. | Proposed: ≥80% overall; must demonstrate valid Beejank check on all products. | Proposed: ≥75% on chapter diagnostics; rubric-aligned marking. |
| **5. Time Constraints** | Evaluates unhesitating reflex execution without inducing panic. | Standard: 10 to 15 minutes for 20–30 multi-row arithmetic sums. | Standard: 10 minutes for 15–20 multi-digit multiplication/division problems. | Aligned with standard school exam or Olympiad time constraints (45–60 mins). |
| **6. Error Classification** | Diagnostic analysis of incorrect answers. | Classified into: (a) Bead placement slip, (b) Wrong complement formula, (c) Column drift. | Classified into: (a) Sutra condition mismatch, (b) Subtraction slip, (c) Carry-over error. | Classified into: (a) Conceptual gap, (b) Rough workspace clutter, (c) Calculation error. |
| **7. Conceptual Understanding** | Oral or written explanation of the underlying rule. | Student verbally explains why a specific complement formula was applied. | Student explains the algebraic rationale behind the sutra. | Student explains step-by-step logic in written solution. |
| **8. Independent Problem Solving** | Execution without teacher prompting or scaffolding. | Student completes evaluation paper independently without educator intervention. | Student executes calculations and performs self-checks independently. | Student decomposes unfamiliar non-routine word problems independently. |
| **9. Remediation Protocol** | Targeted support if evaluation falls below standard. | 2 weeks of focused complement micro-drills in micro-batch (max 5); zero extra fee. | 2 weeks of targeted sutra reinforcement and scratchpad organization; zero extra fee. | Chapter-specific remedial worksheets and doubt clearing; zero extra fee. |
| **10. Retest Policy** | Re-evaluation following remediation period. | Alternate evaluation paper (Form B) covering the specific unmastered complements. | Alternate evaluation paper (Form B) covering unmastered sutra modules. | Modular chapter re-quiz focusing on previously missed question types. |
| **11. Educator Approval** | Professional review before level advancement. | Neha Patil reviews evaluation paper, daily practice diary, and class focus. | Neha Patil reviews sutra accuracy, Beejank audit, and school test performance. | Educator reviews chapter test scores and homework neatness. |
| **12. Progression Criteria** | Holistic gate for advancing to next curriculum level. | Completed workbook + Passed evaluation + Educator sign-off = New kit issued. | Completed module + Passed evaluation + Educator sign-off = Advanced module. | Chapter mastery demonstrated + School exam improvement observed. |

---

## 4. Certificate Governance & Credential Integrity (CERT-WS04-01 Findings)

An audit of `src/lib/certificateGenerator.ts` established key technical and governance realities:
* **Current Software Implementation:** The script generates client-side vector PDFs on-demand using `jsPDF`.
* **Random Verification String:** Prints `AAA-INT-${Math.floor(100000 + Math.random() * 900000)}`. This is a purely random client-side number. There is **NO central verification database, QR code endpoint, or registry** backing this code (`[CONTROL NOT FOUND IN INSPECTED SCOPE]`).
* **Accreditation Claims:** The certificate header text citing *"INTERNATIONAL ABACUS & SPEED MATH OLYMPIAD ACCREDITATION"* is an internal institutional naming convention. Accreditation wording remains strictly **pending documentary verification**, as no external statutory accreditation record is currently attached to the repository.
* **Signature Safeguard:** Digitized signatures are programmatically loaded from public assets. To protect against identity spoofing and forgery, signature image assets shall not be reproduced in public documentation or unauthenticated directories.

### Four-Tier Certificate Governance Model (Proposed Architecture):

| Certificate Category | Issuing Authority & Signature | Eligible Student Base | Evaluation Basis | Software Status in Codebase | Governance Policy |
|---|---|---|---|---|---|
| **Category 1: Practice Drill Record** | System-generated by AcademyOS; automated template. | Any enrolled student or registered guest user completing an online practice set. | Practice drill completion score (e.g. ≥75% on an online quiz). | `[EXISTING DOCUMENTED PRACTICE in certificateGenerator.ts]` | Must be clearly labeled **"Practice Achievement Record"**; does NOT confer formal level graduation. |
| **Category 2: Course Level Completion Certificate** | Signed by Neha Patil (Academic Director) & Academic Examination Board. | Formally enrolled AAA student completing an entire academic level. | Full workbook completion + Passing Layer C Summative Evaluation + Educator sign-off. | `[REQUIRES SEPARATE IMPLEMENTATION APPROVAL for digital issuance]` | Formal academic credential; backed by central verification ledger and permanent Student ID. |
| **Category 3: Competition Participation Certificate** | AAA Leadership & Tournament Organizing Committee. | Students participating in regional, state, or national abacus/Vedic tournaments. | Official tournament registration and verified attendance. | Offline physical document. | Celebrates courage and competitive effort; does not imply course level completion. |
| **Category 4: External Board / Olympiad Certificate** | External Governing Body (e.g., IPM Institute, Science Olympiad Foundation). | Students qualifying in official external competitive examinations. | Evaluated externally by national competition boards. | Issued directly by external institutions. | External academic honor; archived in student portfolio with parental consent. |

---

## 5. Programme-Wise Proposed Home Practice Framework

AAA replaces universal blanket homework rules with a flexible, programme-specific practice model designed to nurture habits without creating family conflict:

| Academic Programme | Recommended Daily Duration | Weekly Frequency | Primary Practice Objective | Parent Role & Guidelines | Guidance for Missed Days |
|---|---|---|---|---|---|
| **Soroban Abacus (Junior JR-0 to JR-3)** | **10 minutes per day** | 4 to 5 days per week | Tactile bead mechanics, 1-digit direct sums, Anzan oral visualization. | **Gentle Encourager:** Provide a quiet 10-minute window; praise effort; avoid criticizing finger slips. | Never double the homework next day. Simply resume the 10-minute routine smoothly. |
| **Soroban Abacus (Senior SR-1 to SR-10)** | **15 minutes per day** | 5 days per week | Multi-digit speed endurance, multiplication (*Kazan*), division (*Wazan*). | **Supporter:** Ensure comfortable desk workspace; celebrate smooth Anzan visualization. | Resume normal 15-minute practice. Inform mentor if school exam schedule causes delays. |
| **Vedic Mathematics** | **15 minutes per day** | 4 to 5 days per week | Sutra application, *Beejank* reverse-checking, school textbook bridging. | **Sounding Board:** Let the child demonstrate a fast math trick; do not enforce rote drills. | Focus on 5 problems rather than catching up on full skipped pages. |
| **Mental Mathematics** | **10 minutes per day** | 4 to 5 days per week | Auditory calculation reflexes, base-10 complements, doubling/halving. | **Playful Partner:** Ask oral dodging table questions during daily commute or dinner. | Treat missed days lightly; practice arithmetic orally through informal games. |
| **School Mathematics Foundation** | **20 to 30 minutes per day** | 4 to 5 days per week | Textbook exercise completion, neat step proofs, chapter revision. | **Facilitator:** Ensure calm study environment; encourage neat scrap-work margins. | Prioritize upcoming school unit test chapters before catching up on older sheets. |
| **IPM & Olympiad Preparation** | **20 to 30 minutes per day** | 3 to 4 days per week | Deep-dive decomposition of 2–3 non-routine logic puzzles and past papers. | **Cheerleader:** Celebrate resilience when child encounters a hard problem; do not provide answers. | Quality over quantity: solving one complex problem thoughtfully is better than rushing 10 easy ones. |

---

## 6. Summary of Governance Status

* **Four Assessment Layers Model:** `[PROPOSED STRATEGY]`
* **Assessment Validation Matrix:** `[PROPOSED STRATEGY / PENDING VALIDATION]`
* **Passing Benchmark Calibration (Awaiting Validation):** `[PENDING VALIDATION]`
* **Four-Tier Certificate Governance Matrix:** `[PROPOSED STRATEGY]`
* **Practice Certificate Generator Audit (CERT-WS04-01):** `[REPOSITORY-VERIFIED AUDIT FINDING]`
* **Programme-Wise Home Practice Framework:** `[PROPOSED STRATEGY]`
