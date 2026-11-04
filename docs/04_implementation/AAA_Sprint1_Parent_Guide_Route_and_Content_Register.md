# AAA — SPRINT 1 PARENT GUIDE ROUTE AND CONTENT REGISTER

**Document Reference:** AAA-S4-REG-PG-01  
**Governing Authority:** `MGT-DET-S4-COMP-02` & `MGT-DET-S4-EVID-03`  
**Active Branch:** `feat/sprint1-public-web`  
**Compliance Officer:** Nitin Patil  
**Pedagogical Director:** Neha Patil  
**Date:** 4 November 2026  

---

## 1. Parent Guide Registry Overview

This register documents the structural, pedagogical, and SEO architecture of the Arnav Abacus Academy Parent Guide resource network. It catalogs the central Parent Guides Hub and all five individual thematic guides, establishing canonical paths, target age bands, core dilemmas, solution frameworks, and conversion endpoints.

---

## 2. Parent Guides Directory Matrix

| Route URL | Canonical Title | Primary Age Band | Core Dilemma / Question | Pedagogical Framework | Primary Discovery Action |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/parent-guides` | Parent Guides & Cognitive Math Insights | Ages 4.5–14 | Which mathematical learning path best matches my child's developmental stage? | AAA 6-Stage Learning Model & 8 Intelligence Pillars | Book a Discovery Session |
| `/parent-guides/abacus-vs-vedic-maths` | Abacus vs Vedic Maths: What's the Difference? | Ages 4.5–14 | Should my child start with Abacus beads or Vedic Sutras? | Sensory Soroban visualization (ages 4.5–9) vs Algebraic Sutras (ages 9–14) | Abacus vs Vedic Maths Discovery |
| `/parent-guides/does-abacus-confuse-school-math` | Does Abacus Confuse School Maths? | Ages 5–12 (Grades 1–6) | Will abacus left-to-right calculation clash with school column arithmetic? | Dual-code cognitive flexibility and procedural switching | School Math Harmony Discovery |
| `/parent-guides/why-children-use-finger-counting` | Why Children Use Finger Counting & Mental Calculation Habits | Ages 4–9 | Why does my child still rely on fingers for basic addition and subtraction? | Concrete tactile scaffolding transitioning to mental bead manipulation (Anzan) | Finger Counting Transition Discovery |
| `/parent-guides/why-smart-children-make-silly-math-mistakes` | Why Children Make Mistakes Despite Understanding Concepts | Ages 6–14 | Why does an intelligent child lose marks to careless calculation errors? | Working memory overload, transcription slips & 4-step home review routine | Calculation Accuracy Discovery |
| `/parent-guides/ideal-age-to-start-abacus` | What Is the Ideal Age to Start Abacus? A Parent's Guide | Ages 4.5–9 | Is my child too young to start, or are they beginning too late? | Prime neuroplasticity windows and pre-numeracy milestones | Abacus Readiness Discovery |

---

## 3. Deep Route-by-Route Content Specifications

### 3.1 Parent Guides Hub (`/parent-guides`)
- **Component File:** `src/pages/ParentGuidesHub.tsx`
- **Schema Type:** `CollectionPage` + `BreadcrumbList`
- **Meta Title:** `Parent Guides & Cognitive Math Insights | Arnav Abacus Academy Wakad`
- **Meta Description:** `In-depth educational parent guides on Abacus vs Vedic Maths, overcoming finger counting, eliminating calculation errors, and early childhood mathematical thinking from Arnav Abacus Academy, Wakad, Pune.`
- **Audience:** Parents across Wakad, Pimple Saudagar, Hinjawadi, Tathawade, and Baner researching foundational mathematics.
- **Key Sections:**
  1. Authoritative Header & Mission Statement: *"Mathematics is the medium; thoughtful learning is the mission."*
  2. Educational Philosophy Scaffolding: Why AAA avoids high-pressure speed drills in favor of durable mental models.
  3. 5 In-Depth Guide Cards: Clear dilemma labels, key takeaways, and age recommendations.
  4. Diagnostic Discovery Session Bridge: Direct modal integration with Founder Neha Patil.
  5. Local Catchment Attribution: Explicit single-center statement in Wakad with regional catchment breakdown.

---

### 3.2 Guide 1: Abacus vs Vedic Maths (`/parent-guides/abacus-vs-vedic-maths`)
- **Component File:** `src/pages/GuideAbacusVsVedicMaths.tsx`
- **Schema Type:** `Article` + `BreadcrumbList`
- **Word Count / Depth:** ~4,200 words (deep comparative analysis)
- **Key Pedagogical Insights:**
  - Establishes the distinct neurological mechanisms: Abacus develops visual-spatial working memory (right hemisphere activation via Anzan), whereas Vedic Maths utilizes algebraic patterns and mental sutras (left hemisphere logical reasoning).
  - Clarifies age boundaries: Abacus is optimal for ages 4.5–9 when neuroplasticity for spatial imagination is peak. Vedic Maths is ideal for ages 9+ (Grades 5–10) when abstract algebraic reasoning has matured.
  - Dispels the myth of "competition" between systems: shows how abacus lays arithmetic bedrock that makes Vedic Maths effortless later.
- **Conversion Endpoint:** `DemoBookingModal` with `defaultProgram="Abacus vs Vedic Maths Discovery"`.

---

### 3.3 Guide 2: Does Abacus Confuse School Math? (`/parent-guides/does-abacus-confuse-school-math`)
- **Component File:** `src/pages/GuideDoesAbacusConfuseSchoolMath.tsx`
- **Schema Type:** `Article` + `BreadcrumbList`
- **Word Count / Depth:** ~4,350 words
- **Key Pedagogical Insights:**
  - Explains the cognitive mechanism of "Code Switching": bilingual children switch effortlessly between languages without grammatical collapse; similarly, children trained in abacus switch seamlessly between left-to-right mental calculation and right-to-left school column arithmetic.
  - Identifies the temporary 3–6 week adaptation phase during initial abacus levels and provides parents with specific guidance on supporting teachers without creating conflict.
  - Reassures parents that school boards (CBSE, ICSE, State Boards) reward the computational stamina and self-checking accuracy developed by abacus.
- **Conversion Endpoint:** `DemoBookingModal` with `defaultProgram="School Math Harmony Discovery"`.

---

### 3.4 Guide 3: Why Children Use Finger Counting (`/parent-guides/why-children-use-finger-counting`)
- **Component File:** `src/pages/GuideWhyChildrenUseFingerCounting.tsx`
- **Schema Type:** `Article` + `BreadcrumbList`
- **Word Count / Depth:** ~3,700 words
- **Key Pedagogical Insights:**
  - Normalizes finger counting as a legitimate, necessary stage of concrete cognitive development (Bruner's Enactive Stage).
  - Details the developmental limitation: fingers max out at 10, forcing inefficient multi-step counting for sums like $8 + 7$, creating working memory bottleneck.
  - Demonstrates how the Soroban abacus (1 upper bead valued at 5, 4 lower beads valued at 1) acts as an expanded external cognitive buffer that transitions into the mind's eye without finger movement.
- **Conversion Endpoint:** `DemoBookingModal` with `defaultProgram="Finger Counting Transition Discovery"`.

---

### 3.5 Guide 4: Why Smart Children Make Silly Mistakes (`/parent-guides/why-smart-children-make-silly-math-mistakes`)
- **Component File:** `src/pages/GuideWhySmartChildrenMakeSillyMathMistakes.tsx`
- **Schema Type:** `Article` + `BreadcrumbList`
- **Word Count / Depth:** ~4,500 words
- **Key Pedagogical Insights:**
  - Separates conceptual understanding from execution fidelity: children understand what a fraction or multiplication means, but overload working memory during procedural steps.
  - Catalogs the top 4 causes of careless errors:
    1. Attentional fatigue & subvocalization.
    2. Disorganized scratch paper layouts.
    3. Negative sign transcription slips.
    4. Absence of rapid reverse-checking routines (e.g., Vedic Beejank digit-sum checks).
  - Provides a practical 4-step home error-triage routine: *Identify Type $\rightarrow$ Classify Cause $\rightarrow$ Verify Mentally $\rightarrow$ Log in Error Diary*.
- **Conversion Endpoint:** `DemoBookingModal` with `defaultProgram="Calculation Accuracy Discovery"`.

---

### 3.6 Guide 5: Ideal Age to Start Abacus (`/parent-guides/ideal-age-to-start-abacus`)
- **Component File:** `src/pages/GuideIdealAgeToStartAbacus.tsx`
- **Schema Type:** `Article` + `BreadcrumbList`
- **Word Count / Depth:** ~3,400 words
- **Key Pedagogical Insights:**
  - Details the 3 distinct entry bands:
    - *Ages 4.5 to 6 (Junior Level):* Focus on fine-motor bead pinching, subitizing, and numeral recognition.
    - *Ages 6 to 8 (Optimal Foundation):* Rapid progression from tactile Soroban to full Anzan mental visualization.
    - *Ages 9+ (Accelerated Track):* Direct bridge from foundation abacus levels to Vedic Mathematics.
  - Provides parent readiness checklists: numeral recognition 1–10, pencil grip, ability to sit with focused attention for 15 minutes, and willingness to engage with tactile materials.
- **Conversion Endpoint:** `DemoBookingModal` with `defaultProgram="Abacus Readiness Discovery"`.

---

## 4. Local Catchment & NAP Standards

Across all 6 URLs, center attribution adheres strictly to:
- **Center Name:** Arnav Abacus Academy
- **Physical Address:** Flat No. 3, 1st Floor, Advocate Balaji Sagar Bungalow, Opposite Creative Cameo, Near Park Street, behind Wisdom World School, Wakad, Pune, Maharashtra 411057, India.
- **Geographic Scope:** Single dedicated physical centre serving **Wakad, Pimple Saudagar, Hinjawadi, Tathawade, and Baner**.
- **Outstation & NRI Scope:** Exclusively via structured live interactive online batches.
