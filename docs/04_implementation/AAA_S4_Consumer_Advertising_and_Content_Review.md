# ARNAV ABACUS ACADEMY (AAA) — STAGE 4 COMPLIANCE GATE
# S4-4: CONSUMER ADVERTISING & CONTENT COMPLIANCE REVIEW

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S4-COMP-04`  
**Phase:** Stage 4 — Pre-Implementation Compliance Gate (`AAA-S4-COMPLIANCE-GATE-01`)  
**Accountable Internal Compliance Officer:** Nitin Patil  
**Academic & Child-Related Authority:** Neha Patil  
**Date:** 04 November 2026  
**Status:** 🟡 **DRAFT CONTENT AUDIT — MANDATORY COPY CORRECTIONS IDENTIFIED**  
**Production Status:** 🔒 **STRICTLY LOCKED**  

---

## 1. Scope & CCPA Coaching Guidelines Baseline

In late 2024, the **Central Consumer Protection Authority (CCPA)** issued the *Guidelines for Prevention of Misleading Advertisement in Coaching Sector, 2024* under Section 18 of the Consumer Protection Act, 2019. 

These guidelines make it an offence for educational academies, coaching centers, and supplementary learning institutes to publish:
1. False claims regarding course success rates, exam rank guarantees, or cognitive improvement timelines.
2. Unsubstantiated claims regarding faculty qualifications, affiliations, or government recognitions.
3. Student testimonials or competition ranks without disclosing essential contextual metadata (student name, rank, specific course name, duration, and whether the course was paid).

This review systematically audits every heading, marketing badge, course description, and student claim across the current website and provides **exact, verified replacement wording**.

---

## 2. Line-by-Line Copy Audit & Replacement Dictionary

| Affected URL / Component | Current Legacy Text in Code | Legal / Consumer Protection Vulnerability | Required Replacement Wording (Sprint 1 Target) | Sign-Off Lead |
| :--- | :--- | :--- | :--- | :---: |
| `src/components/Footer.tsx` | `"Government Recognized"` / `"सरकारी मान्यता प्राप्त"` | **Severe CCPA Violation:** AAA is an independent private academy; it is not a government-accredited university or statutory board. | Replace with: **"Independent Child-Centric Academy • Founded by Neha Patil"** | Nitin Patil |
| `src/components/Hero.tsx` | `"Guaranteed 1:8 Micro-Batches"` | **Contradiction & Dark Pattern:** "Guaranteed" is misleading; furthermore, Stage 2 ratified $\le 5$ students, not 1:8! | Replace with: **"Dedicated Micro-Batches (Maximum $\le 5$ Students for Focused Educator Attention)"** | Neha Patil |
| `src/lib/translations.ts` | `"⚡ ALIGNED WITH NEP 2020 • SKILL INDIA & NSDC PARTNER"` | **IP / Affiliation Violation:** Claiming official NSDC/Skill India partnership without an active institutional license risks trademark action. | Replace with: **"⚡ Foundational Mathematics Excellence • Aligned with NEP 2020 Cognitive Principles"** | Neha Patil |
| `src/data/blogData.ts` | `"Why nearly 40% of AAA champions solve 100 questions with 100% accuracy in under 20 minutes during mock diagnostics."` | **Unsubstantiated Performance Claim:** Implies all students achieve 100% accuracy in 20 minutes without cohort disclaimer. | Replace with: **"How Structured Abacus Practice Builds Speed and Calculation Accuracy: A Case Study of Advanced Student Progress."** | Neha Patil |
| `src/lib/certificateGenerator.ts` | `"INTERNATIONAL ABACUS & SPEED MATH OLYMPIAD ACCREDITATION"` | **Misleading Credentialing:** Client-side quiz PDF cannot claim "International Accreditation" without third-party proof. | Replace with: **"ARNAV ABACUS ACADEMY • PRACTICE ACHIEVEMENT RECORD (Speed Math Drill Milestone)"** | Nitin Patil |
| `src/pages/NewsEvents.tsx` | `"Arnav didn't just solve math problems—he redefined human speed boundaries with surgical 100% accuracy..."` | **Hyperbolic Exaggeration:** Violates pedagogical positioning against gimmick copy (*AGENTS.md Rule 3.2*). | Replace with: **"Celebrating Personal Milestone: Master Arnav Completes Advanced Mental Arithmetic Milestone with Exceptional Focus and Speed."** | Neha Patil |
| `src/data.ts` (Testimonials) | `"Aarav S. - State Champion"` (No course type, duration, or paid status). | **Violation of CCPA 2024 Coaching Guidelines (Clause 4):** Fails mandatory student disclosure criteria. | Replace with: **"Aarav S. • Enrolled in Abacus Senior Track (Level 1–4, 18-Month Paid Program) • 1st Place, Regional Abacus Competition 2025"** | Neha Patil |
| `src/components/DemoBookingModal.tsx` | `"Book Free Guaranteed Demo"` | "Guaranteed" creates false service expectations; Discovery Sessions are scheduled based on educator availability. | Replace with: **"Request a Complimentary Personalised Learning Discovery Session (~45–90 Mins)"** | Neha Patil |

---

## 3. CCPA 2024 Testimonial Substantiation Register

Before any student endorsement or competition win is published in Sprint 1, Neha Patil must verify that the documentary record contains:
1. **Written Parental Consent:** Explicit signed media release form from the child's parent permitting publication of name and award.
2. **Documentary Competition Proof:** Physical certificate or official competition result gazette verifying the claimed rank/medal.
3. **Course Relationship Disclosure:** Explicit disclosure confirming the child was an enrolled student at AAA Wakad, detailing the curriculum track and duration.

---

## 4. Consumer Information & Transparency Disclaimers

To protect parents and maintain absolute educational transparency, the following standardized **Pedagogical Disclaimer** must be prominently displayed across all programme hubs, blog posts, and prospectus downloads:

> *"Arnav Abacus Academy offers specialized supplementary mathematics and cognitive development programs designed to build numerical fluency, visual memory, and learning confidence. Our programs complement and reinforce regular school education (CBSE, ICSE, State Boards). We do not promise guaranteed exam grades, rank outcomes, or instantaneous cognitive transformation; sustainable academic progress depends on consistent home practice, child developmental readiness, and close collaboration between educators and parents."*

---

## 5. Compliance Sign-Off Status

This review satisfies deliverable **AAA-S4-COMP-04**. Status: **AUDIT COMPLETE — COPY CORRECTIONS MANDATED FOR SPRINT 1 SCAFFOLDING**.
