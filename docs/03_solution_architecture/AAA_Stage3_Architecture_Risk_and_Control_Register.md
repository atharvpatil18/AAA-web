# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# ARCHITECTURE RISK & CONTROL REGISTER

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Leadership:** Neha Patil (Founder & Academic Director), Nitin Patil (Operations & Technology Lead)  
**Governance Stage:** Stage 3 — Architecture & Design  
**Previous Stage:** Stage 2 — Business Requirements (Ratified & Closed on 03 Nov 2026)  
**Management Authority:** Overall Stage 3 Commencement Authorized; Risk & Control Matrix Submitted for Approval  
**Document Ref:** `docs/03_solution_architecture/AAA_Stage3_Architecture_Risk_and_Control_Register.md`  
**Date:** November 03, 2026  
**Status:** 🟡 **SUBMITTED FOR MANAGEMENT APPROVAL — RECONCILED RISK & CONTROL REGISTER**  

---

## 1. Executive Summary & Purpose

This register identifies, assesses, and formulates binding architectural, operational, pedagogical, and compliance controls for all risks associated with Stage 3 Architecture & Design.

In accordance with Stage 3 principles, **privacy and security operate as continuous cross-cutting controls from Day 1 across every workstream**, rather than isolated end-of-stage evaluations.

---

## 2. Risk Matrix & Severity Categorization

```mermaid
quadrantChart
    title Stage 3 Architectural Risk Matrix
    x-axis Low Impact --> High Impact
    y-axis Low Probability --> High Probability
    quadrant-1 High Priority (Mitigate Immediately)
    quadrant-2 Monitor Closely
    quadrant-3 Low Priority
    quadrant-4 Critical Architectural Gate
    "R-01: Founder Teaching Overload": [0.85, 0.75]
    "R-02: Public Cloud Data Leakage": [0.95, 0.45]
    "R-03: Sibling Identity Collision": [0.80, 0.60]
    "R-04: Diploma Forgery & Misrepresentation": [0.70, 0.50]
    "R-05: Seating Bottleneck Flat 3": [0.75, 0.65]
    "R-06: DPDP Non-Compliance & Minor Data Exposure": [0.95, 0.35]
    "R-07: Speculative Tech Bloat & Unjustified Migration": [0.70, 0.50]
    "R-08: Premature Code Implementation": [0.95, 0.25]
    "R-09: Developmental Misrepresentation & Composite Scoring": [0.85, 0.40]
```

---

## 3. Detailed Architecture Risk & Control Log

| Risk ID | Domain | Risk Description | Severity / Likelihood | Preventive Architectural Control | Detective & Corrective Governance Control | Accountable Owner | Downstream Dependency |
|---|:---:|---|:---:|---|---|:---:|---|
| **R-01** | Operations | **Founder Teaching Bandwidth Erosion:** Administrative triage, inquiry responses, and progress reports overburden Neha Patil's classroom hours. | **HIGH / HIGH** | Decoupled operational workflows (WS-07) where Nitin Patil handles initial intake triage; bi-monthly reports standardized to 10-min qualitative windows (`ACT-WS04-13`). | Weekly batch timetable audit verifying founder classroom hours remain 100% protected. | Nitin Patil & Neha Patil | `CONF-MKT-01`, `ACT-WS04-13` |
| **R-02** | Security | **Public Cloud Data Leakage via Legacy Endpoint:** Continued transmission of minor practice attempt telemetry to hardcoded public JSON endpoints (`jsonblob.com`). | **CRITICAL / MEDIUM** | Architect sovereign, private database options (WS-11) to eliminate public endpoint dependencies in Stage 4 (`ACT-WS04-05`). | Static source-code scanning ensuring zero third-party storage sync URLs in production builds. | Nitin Patil (Technology Lead) | `ACT-WS04-05`, `ACT-WS04-19` |
| **R-03** | Data | **Sibling Identity & Record Collision:** Siblings sharing a parent mobile or email overwrite each other's progress logs or course enrollments. | **HIGH / MEDIUM** | Model an immutable primary key (`student_id`) decoupled from parent contact fields; 1:N parent-student relational schema (WS-09A). Evaluate candidate format `AAA-STU-YYYY-XXXX` alongside alternative formats. | Schema validation rules rejecting duplicate student creation under shared parent keys. | Nitin Patil (Technology Lead) | `ACT-WS04-14`, `DEC-WS04-13` |
| **R-04** | Compliance / Brand | **Digital Drill Certificate Misrepresentation & Accreditation Claims:** Client-side generated PDFs (`jsPDF`) misrepresented as accredited diplomas. | **HIGH / MEDIUM** | Retain "Practice Achievement Records" for software drill PDFs; classify central ledgers and QR verification as proposed options (WS-10). Strictly prohibit claiming external or university accreditation. | Verification portal specifications verifying that diplomas evaluate verified physical curriculum completion only. | Neha Patil & Nitin Patil | `ACT-WS04-06`, `ACT-WS04-15` |
| **R-05** | Facility | **Premises Seating Capacity Bottleneck at Flat 3:** Batch expansion exceeds physical classroom desks under the strict 5-student cap. | **HIGH / MEDIUM** | Physical premises audit (`ACT-WS04-08`) measuring usable desks, acoustic partitions, and maximum concurrent batch limits before scheduling. | Batch scheduling algorithms (WS-07) blocking batch creation beyond audited room seating limits. | Nitin Patil (Operations Lead) | `ACT-WS04-08`, `DEC-WS04-11` |
| **R-06** | Privacy / Legal | **DPDP Statutory Non-Compliance & Minor Data Exposure:** Unlawful collection or analytics transmission of minor data without verifiable consent. | **CRITICAL / LOW** | Four-field maximum enquiry form; unbundled dual consent; zero-PII telemetry design objective (assessing potential indirect identifiers including IPs, cookies, device fingerprints); formulate explicit legal questions for qualified legal review (WS-10). | Qualified legal counsel review of consent notices (`ACT-WS05-05`) and timestamped immutable consent logging. | Nitin Patil & Qualified Legal Counsel | `ACT-WS05-05`, `ACT-WS04-26` |
| **R-07** | Technology | **Speculative Tech Bloat & Unjustified Migration:** Introducing unvetted libraries or abandoning the stable React 19/Vite baseline without business justification. | **MEDIUM / MEDIUM** | Retain existing React 19/Vite baseline; mandatory 9-point Options Analysis before recommending any framework, hosting, CRM, or infrastructure migration; enforce strict Core Web Vitals budgets. | Options Analysis review by Nitin Patil; bundle size and Lighthouse CI regression checks. | Nitin Patil (Technology Lead) | `AGENTS.md` Rule 8 |
| **R-08** | Governance | **Premature Code Modification Before Stage 4 Gate:** Modifying source files or deploying assets before Stage 3 architecture approval. | **CRITICAL / LOW** | Strict stage-gate governance boundary enforced by `AGENTS.md`; documentation-only execution mode. | Independent git status verification confirming zero tracked changes and zero deployments. | Lead Solution Architect | Stage 4 Entry Gate |
| **R-09** | Pedagogy / Brand | **Developmental Misrepresentation & Composite Scoring:** Algorithmic calculation of a "Child Intelligence Score", public rankings, or clinical diagnostic labeling. | **HIGH / LOW** | Segregate academic performance, teacher observation, parent feedback, and child self-reflection (WS-08); progress evaluates child strictly against own historical baseline; zero CIS, zero rankings, zero clinical terms; retain 6 programme areas as current portfolio grouping pending academic validation by Neha Patil; Discovery Session preserved as approx 45–90 min free practice (not a guaranteed fixed duration). | Neha Patil retains exclusive academic governance authority over all rubrics, reports, and developmental interpretations. | Neha Patil (Academic Director) | `DEC-WS04-06`, `REQ-PED-04` |

---

## 4. Architectural Control Verification Protocol

1. **Continuous Cross-Cutting Review:** Every workstream deliverable must incorporate the preventive controls detailed above from Day 1.
2. **Management Review Gate:** High and critical risk mitigations must be formally reviewed with Neha Patil and Nitin Patil during workstream sign-off.
3. **Stage 4 Prerequisite:** No code or database implementation may proceed until detective controls (scans, test scripts, and audit registers) are prepared.

---
*End of Stage 3 Architecture Risk & Control Register — Arnav Abacus Academy (AAA)*
