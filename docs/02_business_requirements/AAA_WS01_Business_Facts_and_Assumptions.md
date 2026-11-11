# AAA MASTER BRD — WORKSTREAM 01 (WS-01)
# BUSINESS FACTS, HISTORICAL REFERENCES & ASSUMPTIONS REGISTER
**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Role:** Lead Business Analyst, Business Transformation Consultant & Enterprise Solution Architect  
**Governance Stage:** Stage 2 — Master Business Requirements Document (BRD) Workshop  
**Document Ref:** `docs/02_business_requirements/AAA_WS01_Business_Facts_and_Assumptions.md`  
**Date:** November 02, 2026  
**Status:** 🟢 **CONDITIONALLY APPROVED — FINAL DOCUMENTATION CORRECTIONS COMPLETED**  

---

## 1. Structure & Classification Protocol

To prevent unverified assumptions from contaminating architectural and business requirements, all business data points are cataloged into three explicit registers:
* **Section 2:** Confirmed Business Facts (Verified reality)
* **Section 3:** Historical Reference Baseline (Past benchmarks requiring re-validation)
* **Section 4:** Strategic Assumptions (Explicitly tagged for validation)

---

## 2. Register A: Confirmed Business Facts `[MANAGEMENT CONFIRMED]`

| Fact ID | Fact Description | Evidence / Confirmation Source | Operational Constraint |
|---|---|---|---|
| **F-01** | Physical Center is located at Flat 3, Adv. Balaji Sagar Bungalow, Wakad, Pune 411057. | Management Confirmation, Google Business Profile, Site Code | Center remains flagship physical base of operations. |
| **F-02** | Teaching model enforces a strict maximum ratio of 5 students per batch (1:5 ceiling). | Management Confirmation (Stage 2 WS-01) | Overrides and deprecates historical 1:8 ratio; ceiling cannot be breached. |
| **F-03** | Active student enrollment is currently greater than 87 students (Above 87 — management-confirmed threshold; exact census pending). | Management Confirmation (Stage 2 WS-01) | Establishes verified minimum enrollment baseline; exact count pending audit. |
| **F-04** | Total active batches across the academy number greater than 14 batches (Above 14 — management-confirmed threshold; exact timetable audit pending). | Management Confirmation (Stage 2 WS-01) | Confirms active operational batch volume threshold; full audit pending. |
| **F-05** | Strategic growth focus is Offline-First (Wakad & Pune/PCMC market). | Management Confirmation (Stage 2 WS-01) | Marketing & local SEO prioritize physical center admissions. |
| **F-06** | Online live delivery operates strictly as a supporting channel. | Management Confirmation (Stage 2 WS-01) | Online is not marketed as a discount alternative to in-center. |
| **F-07** | Primary growth engine is direct B2C parent admissions. | Management Confirmation (Stage 2 WS-01) | Website user journey is optimized 100% for parents. |
| **F-08** | Neha Patil leads academic direction, curriculum, mentoring and academic quality. | Management Confirmation (Stage 2 WS-01) | Core academic direction and quality remain under Neha Patil's oversight. |
| **F-09** | Routine operational responsibilities may be delegated progressively while academic standards remain under her oversight. | Management Confirmation (Stage 2 WS-01) | System architecture must support non-founder administrative roles without restricting future delegation. |
| **F-10** | There is currently NO official Instagram account for Arnav Abacus Academy. | Management Confirmation (Stage 2 WS-01) | Prohibits treating personal account `@lakshmi_narayan_1303` as official. |

---

## 3. Register B: Historical References `[HISTORICAL REFERENCE]`

The following historical references represent snapshots from earlier operating cycles and must **NOT** be represented as current production facts without re-validation:

| Ref ID | Historical Parameter | Historical Value | Context / Known Limitations | Status |
|---|---|---|---|---|
| **H-01** | Historical Student Count | **87 students** | Static snapshot from prior report cycle; current count is confirmed above 87 threshold. | `[HISTORICAL REFERENCE — CURRENT VALIDATION REQUIRED]` |
| **H-02** | Historical Batch Count | **14 batches** | Historically measured Abacus program batches only; omitted Vedic, School, and Olympiad batches. | `[HISTORICAL REFERENCE — CURRENT VALIDATION REQUIRED]` |
| **H-03** | Physical Facility Footprint | **3 rooms / ~30 seats** | Approximate concurrent physical seating capacity based on early physical audit. | `[HISTORICAL REFERENCE — CURRENT VALIDATION REQUIRED]` |
| **H-04** | Monthly Tuition Baseline | **₹1,500 – ₹1,600** | Historical monthly tuition range per student; excludes material/kit fees. | `[HISTORICAL REFERENCE — CURRENT VALIDATION REQUIRED]` |
| **H-05** | Student Delivery Split | **80% Offline / 20% Online** | Historical ratio of student attendance modes. | `[HISTORICAL REFERENCE — CURRENT VALIDATION REQUIRED]` |

---

## 4. Register C: Strategic Assumptions & Hypotheses `[PROPOSED STRATEGY]`

The following assumptions govern forward-looking business strategy and capacity modeling. Each is tagged with its validation dependency:

| Asmp ID | Strategic Assumption | Business Rationale | Validation Dependency |
|---|---|---|---|
| **A-01** | Micro-batches of 5 students can sustain a monthly revenue ambition of ₹3–4 Lakh. | Higher fee commanded by premium 1:5 individualized attention offsets smaller batch capacity. | Financial modeling during WS-06 (Admissions & Pricing). |
| **A-02** | Physical center at Balaji Sagar Bungalow can accommodate expanded batch schedules. | Staggering weekday evening (4 PM – 8 PM) and weekend slots (9 AM – 6 PM) unlocks capacity without immediate real estate expansion. | Center timetable audit (Pending validation). |
| **A-03** | Parents in Wakad/PCMC are willing to pay a premium for guaranteed 1:5 micro-batches over 1:15 franchise competitors. | Parents prioritize foundational focus and error-free calculation over cheap large-batch tuitions. | Parent persona validation (WS-03) and trial feedback. |
| **A-04** | Neha Patil's direct operational load can be reduced by 40% through a standardized digital admissions funnel. | Pre-qualifying parents via zero-PII counselling booking filters out low-intent inquiries before phone calls. | Admissions funnel modeling (WS-06). |
| **A-05** | Secondary growth from school tie-ups can be activated once offline center utilization reaches 80%+. | Focusing on B2C admissions first builds financial stability before investing in long-sales-cycle institutional B2B deals. | Management review in Q3/Q4. |
