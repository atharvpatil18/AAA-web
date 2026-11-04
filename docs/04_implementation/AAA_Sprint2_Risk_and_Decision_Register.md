# AAA — SPRINT 2 RISK AND DECISION REGISTER
## Architectural Risk Governance, Mitigation Strategies & Formal Decisions

**Document Reference:** `AAA-S2-REG-RISK-DEC-01`  
**Phase:** Stage 4 — Sprint 2 Architecture (WS-12 through WS-15)  
**Governance Authority:** Nitin Patil (Operations & Tech Lead) & Neha Patil (Academic Director)  
**Date:** 04 November 2026  
**Status:** 🟡 **ACTIVE RISK & DECISION REGISTER**

---

## 1. Architectural & Operational Risk Ledger

The matrix below identifies critical risks associated with the design and future implementation of Sprint 2, along with proactive mitigation controls:

| Risk ID | Category | Risk Description & Failure Mode | Inherent Severity | Likelihood | Proactive Architectural Mitigation Strategy | Residual Severity | Accountable Owner |
| :---: | :--- | :--- | :---: | :---: | :--- | :---: | :---: |
| **RSK-S2-01** | **Scope Creep / Over-Engineering** | Building a heavy, complex enterprise CRM SaaS that overwhelms academy staff and bloats bundle size. | 🔴 High | 🟡 Medium | Design a lightweight, custom React/TypeScript CRM dashboard embedded into AcademyOS admin view, strictly bound to the 14 defined states without unnecessary third-party plugins. | 🟢 Low | Nitin Patil |
| **RSK-S2-02** | **Legal Boundary Conflation** | Misrepresenting Nitin Patil’s internal compliance review as an official external legal opinion under the DPDP Act. | 🔴 High | 🟢 Low | Maintain explicit disclaimers across all documentation: Nitin Patil’s statements reflect internal compliance analysis; statutory legal opinion remains distinct. | 🟢 Low | Nitin Patil |
| **RSK-S2-03** | **Pedagogical Dilution** | Attempting to replace Neha Patil’s 1-on-1 human diagnostic observation with automated computer quiz algorithms. | 🔴 High | 🟢 Low | Mandatory protocol: Automated quizzes are classified as *Speed Practice Drills* only. Discovery Session evaluation remains exclusively conducted and scored by Founder Neha Patil. | 🟢 Low | Neha Patil |
| **RSK-S2-04** | **Data Leakage & Minor PII Exposure** | Accidentally logging child names, phone numbers, or discovery scores into public telemetry (GA4) or URL query strings. | 🔴 High | 🟡 Medium | Enforce strict compile-time TypeScript type guards rejecting PII parameters in analytics wrappers; automated regression scanning for query string PII. | 🟢 Low | Nitin Patil |
| **RSK-S2-05** | **Premature Production Release** | Merging Sprint 2 staging branches into `main` before Stage 4 physical hard gate CAP items are completed on 18-Nov-2026. | 🔴 Critical | 🟢 Low | Branch `main` remains branch-protected and locked. Only formal joint written sign-off post CAP audit can authorize release. | 🟢 Low | Nitin Patil & Neha Patil |

---

## 2. Formal Architectural Decision Ledger (Sprint 2 Planning)

The following architectural decisions have been formulated during the Sprint 2 planning workshop:

| Decision ID | Subject / Technical Domain | Architectural Decision Taken | Alternatives Considered & Rejected | Decision Justification |
| :---: | :--- | :--- | :--- | :--- |
| **DEC-S2-01** | **Discovery Rubric Authority** | All observation rubric modifications must be presented as options to Academic Director Neha Patil for sole determination. | Automated AI-generated rubric scoring. | Preserves AAA’s core value proposition of direct, compassionate educator mentorship. |
| **DEC-S2-02** | **CRM Machine Architecture** | Adopt a deterministic 14-state machine model with strict role permissions and SLAs. | Free-form tag-based lead management without rigid states. | Prevents leads from slipping through cracks; provides clear parent communication SLAs. |
| **DEC-S2-03** | **Lead Ingestion Gateway** | Design a serverless API endpoint (`/api/v1/leads/discovery`) with anti-formula injection sanitization and honeypot protection. | Direct client-to-database writes or third-party iframe form widgets. | Third-party widgets compromise DPDP data residency; serverless endpoint ensures custom rate limiting and validation. |
| **DEC-S2-04** | **Student UID Determinism** | Enrolled students are deterministically migrated to `AAA-STD-YYYY-XXXX` within AcademyOS, completely isolated from transient lead IDs. | Single unified ID for leads and students. | Guarantees that purged non-enrolled leads leave no orphaned data or broken foreign keys in the student database. |
