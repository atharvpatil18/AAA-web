# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-17
## Document Reference: `AAA-WS17-RPT-COMM-ACAD-01`
### Deliverable 4: Parent Communication, SLA Commitment & Academic Alignment Audit

**Document Version:** 1.0.0  
**Audit Date:** 05-November-2026  
**Governing Baseline:** Commit `6af0c0f` on branch `feat/sprint3-integration`  
**Inspected Components:** `src/components/EnquiryReceiptModal.tsx` & `src/components/ParentPreparationCard.tsx`  
**Production Status:** 🔒 **STRICTLY LOCKED** (`a21a3d1129cc17fc6650bfd04648eb91199e6fa8`)  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Summary & Purpose

This audit evaluates the parent-facing messaging, business commitments, and pedagogical terminology across the new WS-17 components against two non-negotiable AAA governance standards:
1. **Admissions Service Level Agreement (SLA):** Verifying that time-to-contact commitments made to parents match approved operational policies.
2. **Pedagogical Alignment & Anti-Clinical Standard:** Verifying that descriptions of child observation strictly adhere to Neha Patil's **Option D 6-Dimension Pedagogical Framework** (`AAA_Stage4_Discovery_Framework.md`), completely avoiding clinical, medical, or pathologizing language.

---

## 2. Admissions SLA Reconciliation: 2 Operating Hours vs. 4 Business Hours

### 2.1 The Discrepancy
- **In `src/components/EnquiryReceiptModal.tsx:92`:** The parent is told:
  > *"...our academic team will review {childName}'s profile and contact you within **4 business hours** to finalize an optimal trial time slot."*
- **In Previously Approved Documents:**
  - `docs/04_implementation/AAA_S4_DPDP_and_Child_Data_Flow_Register.md:38`: Mandates **"Admissions Queue (2h SLA)"**.
  - `src/lib/crmStateMachine.ts:37`: `STATE_SLA_HOURS.ENQUIRY_RECEIVED = 4` (clock hours for 24/7 calendar tracking).
  - In Stage 2 BRD: Operating hours are defined as **Monday–Saturday, 9:30 AM – 7:30 PM** with an active contact commitment of **2 operating hours**.

### 2.2 Operational Risk:
If a parent submits an inquiry at 10:00 AM on Wednesday, promising "4 business hours" suggests they will not hear from the academy until 2:00 PM. But Neha Patil's operational pilot protocol aims to connect within **2 operating hours** to maintain high parental responsiveness.

### 2.3 Management Recommendation:
**Restore the approved two-operating-hour commitment in the parent-facing UI:**
> *"Thank you, {parentName}! Because Neha Patil mentors dedicated micro-batches of a maximum of 5 students per batch, our academic team will review {childName}'s profile and contact you within **two operating hours** (Monday–Saturday, 9:30 AM – 7:30 PM) to finalize an optimal trial time slot."*

*(If management specifically prefers a relaxed 4-hour window for operational buffer during peak exam seasons, a formal management determination should be passed to adjust the baseline).*

---

## 3. Pedagogical Tone & Clinical Language Review in `ParentPreparationCard.tsx`

Under AAA Permanent Agent Governance (AGENTS.md §1 & §3):
> *"Mathematics is the medium; developing confident, independent and thoughtful learners is the mission."*
> *"Tone: Warm, authoritative, reassuring, academically rigorous, and parent-centric. Avoid hyperbolic gimmicks, fear-mongering copy, or clinical/medical jargon."*

### 3.1 Audit of Existing Phrasing in `ParentPreparationCard.tsx`:

| Line / Element | Current Text in `ParentPreparationCard.tsx` | Pedagogical Evaluation | Recommended Approved Phrasing |
| :---: | :--- | :--- | :--- |
| **Line 38** | *"Tactile Soroban abacus tools, Vedic math templates, and **diagnostic sheets** are provided at the center."* | 🟡 **CLINICAL TERM:** "Diagnostic" sounds medical or evaluative. | *"Tactile Soroban abacus tools, Vedic math templates, and **discovery activity sheets** are provided at the center."* |
| **Line 53** | *"**6-Dimension Evaluation**"* | 🟡 **EVALUATIVE:** "Evaluation" creates test anxiety for parents. | *"**6-Dimension Learning Observation**"* |
| **Line 54** | *"...provides personalized feedback on spatial visualization, **working memory**, **finger-counting habits**, and recommended placement."* | 🟡 **PSYCHOLOGICAL / NEGATIVE JARGON:** "Working memory" sounds cognitive-testing; "finger-counting habits" sounds mildly negative. | *"...provides personalized feedback on sensory number sense, spatial visualization, pattern agility, calculation confidence, and optimal batch placement."* |

### 3.2 Alignment with the Approved Option D Dimensions:
The 6 dimensions approved by Neha Patil in WS-12 (`AAA_Stage4_Discovery_Framework.md`) are:
1. **Sensory & Concrete Number Sense** (Bead tactile perception and base-10 affinity)
2. **Spatial Visualization & Mental Imagery** (Visualizing beads and moving numbers in the mind)
3. **Pattern Agility & Structural Decomposition** (Finding complements of 5 and 10)
4. **Calculation Confidence & Fluency** (Spontaneous mathematical reflexes without anxiety)
5. **Focus, Stamina & Engagement Rhythm** (Deep concentration in micro-batches)
6. **Mathematical Communication & Reflection** (Articulating problem-solving steps joyfully)

Updating `ParentPreparationCard.tsx` to directly mirror these positive, child-centric dimensions reinforces parental trust and protects AAA's premium positioning.
