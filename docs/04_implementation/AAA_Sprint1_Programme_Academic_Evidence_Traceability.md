# AAA — SPRINT 1 PROGRAMME ACADEMIC EVIDENCE TRACEABILITY REPORT
## Curricular Verification & Neha Patil Determination Mapping

**Document Reference:** `AAA-S4-TRC-ACAD-01`  
**Governing Authority:** Neha Patil (Founder & Academic Director) & Nitin Patil (Compliance Officer)  
**Branch:** `feat/sprint1-public-web`  
**Date:** 04 November 2026  
**Status:** 🟢 **VERIFIED AGAINST FORMAL ACADEMIC DETERMINATIONS**

---

## 1. Academic Director Determinations Traceability

On 04 November 2026, Academic Director **Neha Patil** reviewed and formally resolved three pending curricular items. The table below traces each decision from management input to public staging code implementation:

| Item ID | Programme | Subject / Curricular Clarification | Academic Director Determination | Staging Code Implementation Evidence | Verification Status |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **PEND-01** | **Vedic Maths** | Scope and completion of all 16 Vedic Sutras | *"CONFIRMED HOWEVER AS THE STUDENTS PROCEED WITH EACH LEVEL OF VEDIC MATH THEN ALL 16 SUTRAS ARE COMPLETED BY RESPECTIVE STUDENT"* | Coded in `ProgramVedicMaths.tsx` (Lines 243–246 & 285–302): Public copy presents foundational Sutras (Urdhva Tiryagbhyam, Nikhilam) in early levels, explicitly confirming that all 16 Sutras and sub-sutras are completed as students progress through advanced modules. | 🟢 **PASS** |
| **PEND-02** | **Mental Maths** | Programme structure: Standalone vs Integrated | *"CONFIRMED HOWEVER IT IS OFFERED AS INDEPENDENT COURSE AS WELL AS INTEGRATED MODULE BETWEEN ABACUS AND VEDIC MATH"* | Coded in `ProgramMentalMaths.tsx` (Lines 111–117 & 225–265): Articulated both as an independent 4-level course (Number Sense, Multi-Digit Operations, Rapid Division, Exam Speed) and as an integrated bridging curriculum between Abacus visualization and Vedic Sutras. | 🟢 **PASS** |
| **PEND-03** | **Olympiad Prep** | Target competition public syllabus boundaries | *"CONFIRMED ONLY - public copy should focus primarily on IPM, SOF IMO, Scholarship Math Exam"* | Coded in `ProgramIpmOlympiad.tsx` (Lines 118–127 & 235–265): Public copy strictly restricted to IPM (Pune/Maharashtra), SOF IMO, and Maharashtra State Scholarship Math Exams (5th & 8th). All mentions of National Mathematics Talent Contests (NMTC) completely removed from code. | 🟢 **PASS** |

---

## 2. Programme-by-Programme Curricular Evidence Mapping

### 2.1 Abacus Mathematics (`/programs/abacus`)
- **Eligibility & Age Window:** Ages 4 to 14 years; peak developmental window identified as 5 to 9 years.
- **Tools & Methodology:** Physical Japanese Soroban (13-rod/17-rod), two-hand tactile bead manipulation, auditory mental dictation, and progressive transition to Anzan (mental bead visualization).
- **Curriculum Levels:**
  - *Junior Soroban (Ages 4–6):* Number recognition 1–100, physical bead beads, basic finger placement.
  - *Foundation Levels 1–4 (Ages 5–9):* Direct addition/subtraction, base-5 and base-10 complements (*Big Friends*, *Little Friends*).
  - *Advanced Levels 5–8 (Ages 9–14):* Multi-digit multiplication, long division, square roots on Soroban, and Anzan mental drills.
- **Evidence Verification:** Certified against Neha Patil's approved training framework and Entrepreneurship Certificate (`CI2023/100000455`).
- **Status:** 🟢 **PASS**

### 2.2 Vedic Mathematics (`/programs/vedic-maths`)
- **Eligibility & Age Window:** Ages 9 to 14 years (Grades 5 to 10). Prerequisite: Sound grasp of basic school addition, subtraction, and single-digit times tables.
- **Core Pedagogical Role:** Taught not to contradict school curricula, but as a mental speed catalyst and self-checking mechanism (Beejank digit-sum checks).
- **Curriculum Progression:**
  - *Level 1 (Foundations):* High-speed multiplication using Base 10, 100, 1000 (*Nikhilam Navatashcaramam Dashatah*) and single-line cross multiplication (*Urdhva Tiryagbhyam*).
  - *Level 2 (Intermediate):* Straight division (*Paravartya Yojayet*), square roots of perfect numbers, and Beejank reverse-verification drills.
  - *Level 3 (Advanced):* Cube roots, algebraic factoring, simultaneous linear equations, and multi-digit mental division.
  - *Completion:* Systematic coverage of all 16 Vedic Sutras and 13 Upasutras across the complete tiered track.
- **Status:** 🟢 **PASS**

### 2.3 Mental Mathematics (`/programs/mental-maths`)
- **Eligibility & Age Window:** Ages 6 to 14 years.
- **Dual Structural Framework:**
  1. *Standalone Curriculum:* 4 tiered levels focusing on rapid mental number sense, mental multi-digit operations, decimal arithmetic, and timed speed challenges.
  2. *Integrated Bridging Module:* Embedded bridging drills connecting Abacus visualization with Vedic arithmetic shortcuts.
- **Core Objective:** Eradicating reliance on finger counting, eliminating careless margin scribbles, and improving working memory retention under timed exam pressure.
- **Status:** 🟢 **PASS**

### 2.4 School Mathematics (`/programs/school-maths`)
- **Eligibility & Grade Coverage:** Grades 1 to 10 (CBSE, ICSE, and Maharashtra State Board).
- **Focus Areas:** Concept decomposition, step-by-step problem presentation, geometry spatial visualization, algebra word-problem formulation, and exam time management.
- **Batch Ratio:** Strictly limited to a maximum of 5 students per batch to provide individual attention.
- **Status:** 🟢 **PASS**

### 2.5 IPM & Olympiad Mathematics (`/programs/ipm-olympiad`)
- **Eligibility & Grade Coverage:** Grades 2 to 9.
- **Authorized Target Competitions:**
  - *Track A:* IPM Mathematics (Institute for Promotion of Mathematics, Pune / Maharashtra).
  - *Track B:* Science Olympiad Foundation (SOF) International Mathematics Olympiad (IMO) & SilverZone IOM.
  - *Track C:* Maharashtra State Scholarship Mathematics Examinations (Class 5 & Class 8).
- **Unverified Competitions Purged:** All references to NMTC (National Mathematics Talent Contests) removed from public staging copy.
- **Status:** 🟢 **PASS**

---

## 3. Academic Claims Integrity Check

| Claim Item | Staging Copy Representation | Supporting Documentary Source | Status |
| :--- | :--- | :--- | :---: |
| **Mentor Qualification** | Neha Patil (MCA, Certified Trainer of Abacus & Vedic Mathematics) | Entrepreneurship Certificates `CI2023/100000455` and `CI2023/100000403`. | 🟢 **PASS** |
| **Accreditation Claim** | Authorised Skill Centre in Abacus (Reg. CIAVAS/CI2023/100000455) | Certificate `CI2023/100000455` issued by AVAS. | 🟢 **PASS** |
| **No "Master Trainer"** | Term removed from all public marketing components. | Management Directive `DIR-01`. | 🟢 **PASS** |
| **No "Guaranteed" Outcomes** | Public pages explicitly state outcomes depend on individual student practice and readiness. | Management Directive `DIR-02`. | 🟢 **PASS** |
| **Detailed Lesson Plans** | High-level modular syllabus presented on public pages; granular daily lesson plans retained in internal teacher guides. | Internal pedagogical documents. | 🟡 **PENDING FUTURE WORKSTREAM (Sprint 3 LMS/Pedagogy)** |

---

## 4. Academic Traceability Sign-Off Status

All public-facing curricular statements, level progressions, and competition references on `feat/sprint1-public-web` are 100% compliant with Neha Patil's formal determinations.
