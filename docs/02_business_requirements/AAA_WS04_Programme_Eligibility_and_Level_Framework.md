# AAA MASTER BRD — WORKSTREAM 04 (WS-04)
# PROGRAMME ELIGIBILITY & LEVEL RECONCILIATION FRAMEWORK
**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Role:** Lead Business Analyst, Academic Systems Architect & Child Development Framework Analyst  
**Governance Stage:** Stage 2 — Master Business Requirements Document (BRD) Workshop  
**Document Ref:** `docs/02_business_requirements/AAA_WS04_Programme_Eligibility_and_Level_Framework.md`  
**Date:** November 02, 2026 (Final Quality-Controlled Baseline)  
**Status:** 🟡 **DOCUMENTATION QUALITY CONTROL COMPLETE — AWAITING MANAGEMENT VALIDATION**  

---

## 1. Purpose of this Framework

This document performs an exhaustive reconciliation between:
1. **Academic Curriculum Levels:** The formal pedagogical syllabus and level milestones historically referenced by AAA management.
2. **Software Practice Modules:** The digital question sets, topics, and practice suites implemented in the repository's practice platform (`AcademyOS`).
3. **Learner Eligibility Boundaries:** Age and grade brackets across all six academic offerings.

---

## 2. Abacus Academic Levels vs. Software Modules Reconciliation

### 2.1 The Seven Distinct Progression Entities:
To avoid confusing software functionality with educational governance, AAA strictly distinguishes seven operational entities:

```
                            THE SEVEN PROGRESSION ENTITIES
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ 1. SOFTWARE PRACTICE MODULE    │ Digital question set (e.g., JR-1, SR-4)│
  │ 2. ACADEMIC CURRICULUM LEVEL   │ Formal syllabus scope (e.g., Level 1)  │
  │ 3. STUDENT ENROLLED LEVEL      │ Active administrative placement record │
  │ 4. PRACTICE COMPLETION         │ Execution of digital/workbook drills   │
  │ 5. ACADEMIC ASSESSMENT         │ Diagnostic/summative evaluation test   │
  │ 6. EDUCATOR-APPROVED SIGN-OFF  │ Professional sign-off by Neha Patil    │
  │ 7. PROGRESSION TO NEXT LEVEL   │ Official advancement & new workbook kit│
  └─────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Module-by-Module Reconciliation Matrix (Abacus):

* **Historical Management Reference:** The Abacus academic programme is historically described as **eight curriculum levels**, approximately 3 months per level `[HISTORICAL REFERENCE PENDING AUDIT]`.
* **Repository-Verified Practice Modules:** 14 practice modules implemented in `src/data/practiceData.ts`.
* **Governing Rule:** No 1:1 mapping between software modules and academic levels is invented where documentary evidence is missing. Unresolved mappings are flagged for curriculum audit.

| Module Code | Topic Coverage (from Codebase) | Practice Functionality in AcademyOS | Corresponding Academic Level (Evidence-Based) | Evidence Source in Codebase | Unresolved Mapping / Validation Dependency |
|---|---|---|---|---|---|
| `JR-0` | Bead Identification & Representation (1, 2, 3 Digits) | Visual Soroban bead reading, rod value drills, interactive bead placement. | Junior Foundation / Pre-Level 1 `[UNRESOLVED]` | `src/data/practiceData.ts:9-53`, `src/pages/PracticeHub.tsx:55-58` | Is JR-0 a distinct enrolled academic level or an orientation module within Academic Level 1? |
| `JR-1` | Direct Addition & Subtraction without Complements (3, 4, 5 Rows) | Timed 20-question drill sets, single-digit direct arithmetic on ones place rod. | Junior Level 1 (or Sub-level) `[UNRESOLVED]` | `src/data/practiceData.ts:55-100`, `src/pages/PracticeHub.tsx:59-62` | Does JR-1 map to Level 1 Part A or an independent certificate level? |
| `JR-2` | Small Friends (`+5/-5`), Big Friends (`+10/-10`), & Mix Complements | Formula practice drills, complement application checks. | Junior Level 2 (or Level 1 Part B) `[UNRESOLVED]` | `src/data/practiceData.ts:101-160`, `src/pages/PracticeHub.tsx:63-66` | Does JR-2 complete Level 1 or Level 2 of the 8-level academic framework? |
| `JR-3` | Multi-Row Speed Rows (6–7 rows single digit) & 2-Digit Foundation | Single-digit marathon drills, 2D direct and simple complement rows. | Junior Level 3 (Bridging Level) `[UNRESOLVED]` | `src/data/practiceData.ts:161-220`, `src/pages/PracticeHub.tsx:67-70` | Transition boundary between Junior Soroban and Senior Soroban requires audit. |
| `SR-1` | Single-Digit Speed & Precision (5–6 Rows) with Formula Breakdown | Timed single-digit speed drills, Goshin & Jushin formula execution. | Senior Academic Level 1 `[UNRESOLVED]` | `src/data/practiceData.ts:221-300`, `src/pages/PracticeHub.tsx:71-74` | Maps to Senior Level 1, but relationship with Junior JR-1/2/3 remains unconfirmed. |
| `SR-2` | Multi-Digit Master Complements (2D Direct/Complements 5 rows, 1D 7 rows) | 2-digit complement endurance drills, multi-row speed challenges. | Senior Academic Level 2 `[UNRESOLVED]` | `src/data/practiceData.ts:301-400`, `src/pages/PracticeHub.tsx:75-78` | Exact alignment with 8-level framework requires workbook review. |
| `SR-3` | Multi-Digit Direct & Combination Drills (1D/2D/3D Endurance 4–5 rows) | 2D short complements (3 rows), 3D direct addition endurance. | Senior Academic Level 3 `[UNRESOLVED]` | `src/data/practiceData.ts:401-500`, `src/pages/PracticeHub.tsx:79-82` | Alignment with academic curriculum syllabus pending verification. |
| `SR-4` | Soroban Multiplication (*Kazan*): Single × Single, Single × 2-Digit | Multiplication rod assignments, partial product placement on abacus. | Senior Academic Level 4 `[UNRESOLVED]` | `src/data/practiceData.ts:501-620`, `src/pages/PracticeHub.tsx:83-86` | Typically represents Level 4 in international abacus pedagogy; requires AAA audit. |
| `SR-5` | 4-Digit Soroban Quad-Digit Foundation (Direct & Complements 4 rows) | Multi-digit place value endurance drills across 4 rods. | Senior Academic Level 5 `[UNRESOLVED]` | `src/data/practiceData.ts:621-720`, `src/pages/PracticeHub.tsx:87-90` | Exact syllabus linkage pending educator workbook verification. |
| `SR-6` | Intermediate Multiplication: Single × 3-Digit, 2-Digit × 2-Digit | Cross-rod product accumulation, multi-digit mental multiplication. | Senior Academic Level 6 `[UNRESOLVED]` | `src/data/practiceData.ts:721-840`, `src/pages/PracticeHub.tsx:91-94` | Maps to Intermediate Multiplication Level; requires management confirmation. |
| `SR-7` | Multi-Digit 5-Row Endurance Sums (2D, 3D, 4D All Complements) | Multi-row speed endurance drills testing long sitting stamina. | Senior Academic Level 7 `[UNRESOLVED]` | `src/data/practiceData.ts:841-960`, `src/pages/PracticeHub.tsx:95-98` | Alignment with Level 7 curriculum pending confirmation. |
| `SR-8` | Soroban Division (*Wazan*): 2D÷1D, 3D÷1D, 4D÷1D | Quotient rod subtraction, division table estimation on Soroban. | Senior Academic Level 8 `[UNRESOLVED]` | `src/data/practiceData.ts:961-1100`, `src/pages/PracticeHub.tsx:99-102` | Division traditionally completes 8-level abacus course; requires management confirmation. |
| `SR-9` | Decimal Addition & Subtraction (3D & 4D 3-Row All Complements) | Decimal point rod alignment, decimal complements. | Advanced Post-Level 8 Module `[UNRESOLVED]` | `src/data/practiceData.ts:1101-1250`, `src/pages/PracticeHub.tsx:103-106` | Is SR-9 an optional post-graduate extension beyond the 8-level curriculum? |
| `SR-10` | Advanced Mental Math & Sutras (Decimals, HCF, LCM, Percentages, Roots) | Master topics combining Vedic sutras with advanced abacus mental math. | Master Diploma Module `[UNRESOLVED]` | `src/data/practiceData.ts:1251-1400`, `src/pages/PracticeHub.tsx:107-111` | Is SR-10 a master bridging module to Vedic Mathematics? |

---

### 2.3 Vedic Mathematics Software Suites vs. Academic Levels Reconciliation:

The 8 software suites discovered in `src/pages/PracticeHub.tsx` (`JVM-1`, `SVM-0` to `SVM-6`) are digital topic bundles. They must **not** be assumed to automatically equal eight separate academic levels:

| Software Suite Code | Discovered Practice Topics in Codebase | Discovered Category & Purpose | Corresponding Academic Level Status | Unresolved Mapping / Validation Dependency |
|---|---|---|---|---|
| `JVM-1` | Rapid addition, *Ekadhikena*, *Ekanyunena*, dodging tables, mult by 11/101, unit conversions. | Junior Vedic Math Foundation (Ages ~9–11) | `[UNRESOLVED MAPPING]` | Is JVM-1 an entry-level course for primary students or a standalone summer bridge? |
| `SVM-0` | Base sutras, *Balancing Rule*, dodging tables, geometric counting. | Senior Vedic Math Foundation | `[UNRESOLVED MAPPING]` | Does SVM-0 represent Senior Level 1 or a preparatory crash course? |
| `SVM-1` | Table formation up to 99, multi-unit conversions (g/kg, m/km, L/kL, ₹/P). | Applied Sutras & Conversions | `[UNRESOLVED MAPPING]` | Academic syllabus linkage requires Neha Patil's curriculum notes. |
| `SVM-2` | Multiplications (5, 9, 15, 25, 50), division shortcuts (÷5, ÷9, ÷8, ÷99, ÷1000). | Advanced Sutras & Divisions | `[UNRESOLVED MAPPING]` | Academic level grouping pending syllabus review. |
| `SVM-3` | *Urdhva Tiryagbhyam* 2D×2D, *Antyayordashake'pi*, *Beejank* checks, divisibility. | High-Speed Master Topics | `[UNRESOLVED MAPPING]` | Core secondary syllabus; maps to middle-school workshop module. |
| `SVM-4` | Comprehensive *Nikhilam* Base Multiplication suite (bases 10, 20–90, 100, 200–900). | Advanced Base Multiplication | `[UNRESOLVED MAPPING]` | Confirm if taught as independent module or semester unit. |
| `SVM-5` | Vinculum numbers, *Paravartya* division, *Yavadunam* squaring suite. | Grand Master Topics | `[UNRESOLVED MAPPING]` | Advanced topic; pending confirmation of student enrollment pre-requisites. |
| `SVM-6` | Multi-digit *Urdhva* (3D×3D, 4D×4D), *Dhwajanka* Flag Division, *Vilokanam* roots, *N^4* powers. | Supreme Master Suite | `[UNRESOLVED MAPPING]` | Teacher training / Master certification module; student eligibility pending audit. |

---

## 3. Programme Eligibility Validation & Comparison

The table below explicitly reconciles historical and current references across all six programmes:

| Programme | Previous / Historical Reference | Proposed Working Reference | Codebase / Operational Evidence | Academic Rationale | Operational Impact | Management Decision Required |
|---|---|---|---|---|---|---|
| **Soroban Abacus** | 4.5–9 Years *(marketing copy also referenced 4–14)* | **4.5 to 9 Years** *(Primary)*; exceptions up to 11 yrs for remedial. | `src/data.ts:13` ("4.5 - 9 Years"); `ProgramAbacus.tsx:47` ("4 to 14 years"). | Peak neuroplasticity for tactile bead visual encoding occurs between 4.5 and 8. Older children (10+) often resist physical abacus. | Aligns intake messaging; prevents enrolling older children who would be better served by Vedic Maths. | Confirm primary eligibility bracket (4.5–9) and remedial exception policy. |
| **Vedic Mathematics** | 9–14 Years *(Class 5 to 10)* | **9 to 14 Years** *(Class 5 to 10)* | `src/data.ts:35` ("9 - 14 Years"); `ProgramVedicMaths.tsx:46` ("10+ years / Class 5 to 10"). | Requires prerequisite fluency with basic school arithmetic; children under 9 lack prerequisite table fluency. | Unifies marketing copy and website schema; sets clear admission diagnostic criteria. | Confirm minimum age (9 years / Class 4 completion). |
| **Mental Mathematics** | 6–14 Years | **6 to 14 Years** *(Reconciled: maintain historical range)* | `src/data.ts:57` ("6 - 14 Years"). | Earlier draft suggested 6–12; however, older middle school students (Grades 7–8) benefit significantly from table and fraction agility. | Maintains broader enrollment pool; prevents turning away Class 7/8 inquiries. | Confirm whether to retain historical 6–14 range or restrict to 6–12. |
| **School Mathematics** | Class 5–10 *(Marketing copy focused on middle school)* | **Grades 1 to 10** *(Primary focus: Grades 4 to 10)* | `src/data.ts:79` ("Class 5 - 10"); operational reality covers primary school foundation. | High parent demand exists in Wakad for Grade 1–4 foundational school math alongside Abacus. | Requires curriculum materials and lesson plans for primary grades (1–4). | Decide whether School Math officially covers Grades 1–10 or remains restricted to Class 5–10. |
| **IPM Preparation** | Grades 2–9 *(Historical broad reference)* | **Grades 2 to 7** *(Operational focus)* | `src/data.ts:101` ("Class 2 - 9"); Maharashtra IPM exam is primarily conducted for Classes 2, 3, 4, 5, 6, 7. | Official IPM Institute exam focuses heavily on primary and lower-secondary standards (Class 2 to 7). | Focuses batch scheduling and mock paper procurement on active competition categories. | Confirm whether IPM is offered for Grades 2–7 or extended to Grades 8–9. |
| **Olympiad Mathematics** | Grades 2–9 | **Grades 2 to 9** | `src/data.ts:101` ("Class 2 - 9"); SOF IMO runs from Class 1 through Class 12. | Covers broader reasoning, HOTS, and logical problem solving for all school grades. | High synergy with school math batches; separate mock test scheduling. | Confirm Grades 2–9 Olympiad eligibility. |

---

## 4. Operational Nature of IPM and Olympiad Programmes

To eliminate organizational ambiguity, the relationship between competitive offerings and standard academy streams is clarified:

| Dimension | IPM Preparation | Olympiad Mathematics | Regular Academic Streams (Abacus / School Math) |
|---|---|---|---|
| **Programme Classification** | **Specialized Competitive Track** | **Supplementary Enrichment Track** | **Core Foundational Programmes** |
| **Enrolment Structure** | Independent enrollment OR Add-on track for existing students. | Supplementary weekend / seasonal batch OR Add-on track. | Primary long-term academy enrollment. |
| **Fee Structure** | **Separate Course Fee** (includes specialized IPM past-paper booklets and mock test series). | **Separate Course Fee** (or bundled seasonal workshop fee). | Standard monthly / term tuition fee card. |
| **Compulsory vs. Voluntary** | **Strictly Voluntary.** Students choose whether to appear for IPM exams. | **Strictly Voluntary.** No student is forced to register for SOF/IMO competitions. | Mandatory progression through curriculum levels. |
| **Scheduling Alignment** | Intensive 8-month cycle leading to April IPM Mega-Final exam. | Seasonal cycle (August to January) aligned with SOF Olympiad dates. | Continuous year-round academic schedule. |

---

## 5. Summary of Governance Status

* **Seven Progression Entities Definition:** `[PROPOSED STRATEGY]`
* **14 Abacus Practice Modules (`JR-0` to `SR-10`):** `[REPOSITORY-VERIFIED CAPABILITY]`
* **8-Level Abacus Academic Programme:** `[HISTORICAL REFERENCE PENDING AUDIT]`
* **8 Vedic Practice Suites (`JVM-1`, `SVM-0` to `SVM-6`):** `[REPOSITORY-VERIFIED CAPABILITY]`
* **Programme Eligibility Comparison:** `[PENDING VALIDATION]`
* **Voluntary Nature of IPM / Olympiad:** `[PROPOSED STRATEGY]`
