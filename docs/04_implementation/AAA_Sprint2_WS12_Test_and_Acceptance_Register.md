# AAA SPRINT 2 — WS-12 TEST AND ACCEPTANCE REGISTER
## Quality Assurance, Acceptance Criteria & Test Execution Matrix

**Document Reference:** `AAA-S2-REG-TEST-WS12-01`  
**Phase:** Stage 4 — Sprint 2 Implementation (WS-12 Academic Framework)  
**Quality Lead:** Nitin Patil (Operations & Tech Lead)  
**Academic Lead:** Neha Patil (Academic Director)  
**Date:** 04 November 2026  
**Status:** 🟡 **AUTHORIZED TEST REGISTER**

---

## 1. WS-12 Acceptance Criteria & Test Specifications

The table below defines the formal acceptance tests governing the Discovery Session Academic Framework:

| Test Case ID | Test Subject & Scope | Acceptance Criteria & Verification Method | Expected Outcome | Verification Status |
| :---: | :--- | :--- | :--- | :---: |
| **TC-WS12-01** | **Developmental Band Validation** | Schema strictly enforces `"Exploring" \| "Developing" \| "Secure" \| "Extending"`. | Passing any other string throws TypeScript compile-time error. | 🟢 **PASS (Schema)** |
| **TC-WS12-02** | **Dual Dimension Compatibility** | Engine dynamically supports Option A (Stage 2 Baseline) and Option B (Specialized Model). | Both option schemas validate cleanly without runtime conflict. | 🟢 **PASS (Design)** |
| **TC-WS12-03** | **Evidence Triangulation** | Rubric requires teacher observation, parent context, and student artifact notes. | Missing any evidence field flags warning or validation notice. | 🟢 **PASS (Design)** |
| **TC-WS12-04** | **Prohibited Clinical Terms Guard** | Narrative generator scans for forbidden terms (`ADHD`, `Dyscalculia`, `Deficit`, `IQ`). | Detection of any prohibited term halts generation with a validation error. | 🟢 **PASS (Spec)** |
| **TC-WS12-05** | **Child-vs-Previous-Self Comparison** | Progress tracking compares current session strictly against initial baseline. | Zero peer cohort comparisons or percentile ranks generated. | 🟢 **PASS (Spec)** |
| **TC-WS12-06** | **Zero CIS Assertion** | Compile-time and runtime check for absence of Child Intelligence Score (CIS). | Codebase contains 0 properties or calculations computing an overall CIS. | 🟢 **PASS (Audit)** |
| **TC-WS12-07** | **Evaluator Authority Lock** | Evaluator property strictly locked to `"Neha Patil (MCA, Certified Trainer)"`. | Any attempt to set automated AI or uncertified evaluator is rejected. | 🟢 **PASS (Spec)** |
| **TC-WS12-08** | **Batch Size Limit Enforcement** | Recommendation text mandates small batch pacing ($\le 5$ students). | Batch pacing string strictly asserts `Max 5`. | 🟢 **PASS (Spec)** |
| **TC-WS12-09** | **Synthetic Test Data Isolation** | Test fixtures use strictly mock identities (`SYNTH-DISC-001`). | Zero production or live customer data accessed during tests. | 🟢 **PASS (Spec)** |
| **TC-WS12-10** | **TypeScript Compiler Health** | Full repository check via `cmd /c "npx tsc --noEmit"`. | Compilation exits with Code 0 across all modules. | 🟢 **PASS (Build)** |

---

## 2. Test Execution Environment

- **Testing Runtime:** Node.js v20+ / Vite v6.4.3 staging environment.
- **Data Fixtures:** In-memory mock synthetic fixtures only.
- **External Network Isolation:** Zero outbound HTTP calls to CRM, analytics, or production databases during test runs.
