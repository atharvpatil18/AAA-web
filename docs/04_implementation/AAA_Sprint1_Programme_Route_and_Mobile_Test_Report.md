# AAA — SPRINT 1 PROGRAMME ROUTE AND MOBILE TEST REPORT
## Route-by-Route Verification, Heading Hierarchy & Viewport Responsiveness

**Document Reference:** `AAA-S4-TEST-ROUTE-MOB-01`  
**Governing Authority:** Nitin Patil (Operations & Tech Lead)  
**Execution Branch:** `feat/sprint1-public-web`  
**Date of Testing:** 04 November 2026  
**Status:** 🟢 **ALL 5 PROGRAMME ROUTES PASS COMPREHENSIVE VERIFICATION**

---

## 1. Testing Scope & Methodology

Each of the five dedicated programme routes was individually inspected and tested for:
1. **Content Accuracy & Approved Claims:** Verifying certified trainer titles, batch wording, and absence of forbidden claims.
2. **Heading Hierarchy (A11y):** Logical progression from H1 down to H2 and H3 without skips.
3. **Page Title & Structured Metadata:** Presence of unique `Course` and `BreadcrumbList` JSON-LD schemas.
4. **CTA Visibility & Modal Context:** Functional *"Book a Discovery Session"* button passing the correct default program.
5. **Mobile Viewport Scalability:** Responsive layout integrity at 320px (iPhone SE small screen), 375px/390px, 768px (iPad portrait), and desktop (1024px+).
6. **Internal Navigation:** Valid breadcrumb and cross-program links.
7. **Accessibility & Form Labels:** Explicit `aria-label` tags, `<label htmlFor>`, and touch targets $\ge 44\times 44\text{px}$.
8. **Zero PII Exposure:** Clean URLs, query strings, and analytics events.

---

## 2. Individual Programme Page Verification Reports

### 2.1 Route 1: `/programs/abacus` ([`ProgramAbacus.tsx`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/pages/ProgramAbacus.tsx))
- **Page Title & Heading 1:** `<h1>Abacus Maths Classes in Wakad, Pune</h1>` (Semantic Level 1).
- **Heading Hierarchy:**
  - H1: Hero Headline (Line 111)
  - H2: Embedded LeadForm (Line 160), "Who is the Abacus Program For?" (Line 180), "How Arnav Abacus Academy Teaches Abacus Maths" (Line 233)
  - H3: Learner age brackets (Line 193, 206, 216), FAQ questions (Lines 380, 390, 400, 410), "Learn at an Award-Winning Wakad Academy" (Line 430), "Explore Other Academy Learning Tracks" (Line 471)
- **Approved Claims Verified:**
  - Teacher: *"Certified Trainer of Abacus & Vedic Mathematics (MCA, Authorised Skill Centre in Abacus Reg. CI2023/100000455)"*.
  - Batches: *"Small Batches (Max 5 Students)"*.
  - Disclaimers: Non-guaranteed, individual readiness emphasized.
- **CTA & Modal Integration:** CTA opens [`DemoBookingModal`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/components/DemoBookingModal.tsx) pre-populated with `"Abacus Mathematics (Ages 4.5–9)"`.
- **Mobile Scalability:** Grid collapses cleanly from `grid-cols-12` to single column on mobile; padding adjusts (`py-14 md:py-20`); no horizontal overflow at 320px.
- **Accessibility & PII:** Touch targets $\ge 44\text{px}$; breadcrumb links have hover/focus states; zero PII in analytics.
- **Result:** 🟢 **PASS**

---

### 2.2 Route 2: `/programs/vedic-maths` ([`ProgramVedicMaths.tsx`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/pages/ProgramVedicMaths.tsx))
- **Page Title & Heading 1:** `<h1>Vedic Maths Classes in Wakad, Pune</h1>` (Semantic Level 1).
- **Heading Hierarchy:**
  - H1: Hero Headline (Line 110)
  - H2: Embedded Discovery Form (Line 159), "Who Should Learn Vedic Mathematics?" (Line 179), "Vedic Arithmetic As A School Checking Engine" (Line 232)
  - H3: Age profiles (Line 192, 205, 215), Curriculum Modules (Line 276), FAQ questions (Lines 378, 388, 398, 408), Academy Trust (Line 428)
- **Approved Claims Verified:**
  - Curricular Scope: Foundational Sutras taught early; all 16 Sutras systematically completed as students advance (`PEND-01`).
  - School Math Synergy: Framed as calculation speed catalyst and Beejank reverse-check tool; fully respects CBSE/ICSE written steps.
  - Batches: *"Small Batches (Max 5 Students)"*.
- **CTA & Modal Integration:** Modal opens with `defaultProgram="Vedic Mathematics (Ages 9–14)"`.
- **Mobile Scalability:** Fluid flex layout; quick spec pills wrap naturally; verified responsive down to 320px.
- **Accessibility & PII:** Form inputs have matching labels and ids; zero PII logged.
- **Result:** 🟢 **PASS**

---

### 2.3 Route 3: `/programs/mental-maths` ([`ProgramMentalMaths.tsx`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/pages/ProgramMentalMaths.tsx))
- **Page Title & Heading 1:** `<h1>Mental Maths Classes in Wakad, Pune</h1>` (Semantic Level 1).
- **Heading Hierarchy:**
  - H1: Hero Headline (Line 111)
  - H2: Discovery Form (Line 158), "Who Should Join Mental Mathematics?" (Line 178), "Curriculum & Progressive Mastery Levels" (Line 229)
  - H3: Target challenges (Lines 190, 203, 213), Levels 1–4 (Lines 240, 250, etc.), Trust & Location (Line 389)
- **Approved Claims Verified:**
  - Dual Structure: Explicitly explains both standalone course track (Ages 6–14) and integrated bridging module between Abacus and Vedic Maths (`PEND-02`).
  - Pedagogical Goals: Finger counting elimination, error pattern diagnosis, and working memory enhancement.
  - Batches: Small batches ($\le 5$ students).
- **CTA & Modal Integration:** Modal opens with `defaultProgram="Mental Mathematics (Speed & Recall)"`.
- **Mobile Scalability:** 4-level card grid collapses to single column on mobile screens without text clipping.
- **Accessibility & PII:** Fully keyboard navigable; zero PII in telemetry.
- **Result:** 🟢 **PASS**

---

### 2.4 Route 4: `/programs/school-maths` ([`ProgramSchoolMaths.tsx`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/pages/ProgramSchoolMaths.tsx))
- **Page Title & Heading 1:** `<h1>School Maths Coaching in Wakad, Pune</h1>` (Semantic Level 1).
- **Heading Hierarchy:**
  - H1: Hero Headline (Line 109)
  - H2: Discovery Form (Line 158), "Who is School Maths Coaching For?" (Line 178), "Bridging School Syllabus with Visual Intuition" (Line 229)
  - H3: School grade tiers (Grades 1–4, 5–7, 8–10), FAQ questions, Mentorship callouts.
- **Approved Claims Verified:**
  - Board Coverage: CBSE, ICSE, and Maharashtra State Board (Grades 1–10).
  - Approach: Concept mastery first, geometry spatial reasoning, step presentation discipline, zero cramming.
  - Teacher: Neha Patil (MCA, Certified Trainer).
- **CTA & Modal Integration:** Modal opens with `defaultProgram="School Mathematics (Grades 5–10)"`.
- **Mobile Scalability:** Tested at 320px/375px; clean vertical stacking; card margins prevent edge collision.
- **Accessibility & PII:** High contrast ratios verified; zero PII transmitted.
- **Result:** 🟢 **PASS**

---

### 2.5 Route 5: `/programs/ipm-olympiad` ([`ProgramIpmOlympiad.tsx`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/pages/ProgramIpmOlympiad.tsx))
- **Page Title & Heading 1:** `<h1>IPM & Maths Olympiad Coaching in Wakad, Pune</h1>` (Semantic Level 1).
- **Heading Hierarchy:**
  - H1: Hero Headline (Line 122)
  - H2: Discovery Form (Line 158), "Who Should Join IPM & Olympiad Prep?" (Line 177), "Curriculum & Target Competitions" (Line 228)
  - H3: Target grade groups (Grades 2–4, 5–7, 8–9), Competition Tracks (Track A: IPM, Track B: SOF IMO, Track C: Scholarship Exams), Trust callout (Line 380).
- **Approved Claims Verified:**
  - Competitions: Strictly IPM (Pune), SOF IMO, SilverZone IOM, and Maharashtra State Scholarship Math Exams (`PEND-03`). Zero mentions of NMTC.
  - Batch Standard: Maximum 5 students per batch.
  - No Rank Guarantees: Focus on non-routine thinking, problem decomposition, and exam temperament.
- **CTA & Modal Integration:** Modal opens with `defaultProgram="IPM & Olympiad Mathematics (Grades 2–9)"`.
- **Mobile Scalability:** Clean flex/grid breakdown; responsive across mobile and tablet viewports.
- **Accessibility & PII:** Full WCAG 2.1 AA compliance; zero child PII collected.
- **Result:** 🟢 **PASS**

---

## 3. Overall Route & Responsiveness Verdict

All five dedicated programme routes compile cleanly into independent production chunks, exhibit pristine heading hierarchies, maintain complete mobile responsiveness without horizontal scrolling down to 320px, and uphold strict zero-PII privacy protocols.
