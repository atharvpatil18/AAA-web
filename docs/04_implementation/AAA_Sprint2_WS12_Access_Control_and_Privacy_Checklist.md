# AAA SPRINT 2 — WS-12 ACCESS CONTROL AND PRIVACY CHECKLIST
## DPDP Compliance, RBAC Matrix & Data Minimization Verification

**Document Reference:** `AAA-S2-CHK-PRIVACY-01`  
**Phase:** Stage 4 — Sprint 2 Implementation (WS-12 Academic Privacy)  
**Compliance Lead:** Nitin Patil (Internal Compliance Officer)  
**Academic Lead:** Neha Patil  
**Date:** 04 November 2026  
**Status:** 🟡 **AUTHORIZED SPECIFICATION**

---

## 1. Statutory DPDP Principles Checklist for Discovery Sessions

| DPDP Principle | Statutory Requirement | WS-12 Architecture Implementation | Verification Evidence |
| :--- | :--- | :--- | :---: |
| **Data Minimization** | Collect only data strictly necessary for educational evaluation. | Only categorical age group (`childAgeGroup: "7-9"`) and parent contact are collected during intake. Exact minor birthdates, Aadhaar numbers, and school names are excluded. | 🟢 **PASS** |
| **Parent/Guardian Authority** | Processing minor data requires verifiable parental consent. | Intake form explicitly mandates parent/guardian submission with verified +91 mobile number and checkbox acknowledgment. | 🟢 **PASS** |
| **Purpose-Specific Consent** | Consent must be unbundled and granular. | Mandatory service communication consent is separated from optional marketing insights. Unticked by default. | 🟢 **PASS** |
| **Zero-PII Analytics Protocol** | No personal data transmitted in telemetry. | GA4 event wrappers (`trackCounsellingBook`, `trackDemoRequest`) pass zero minor names, zero phone numbers, zero addresses. | 🟢 **PASS** |
| **Right to Erasure** | Parent may request complete data deletion. | Non-enrolled discovery session records subject to automated 90-day purge or on-demand erasure within 24 hours. | 🟢 **PASS** |

---

## 2. Role-Based Access Control (RBAC) Matrix

```mermaid
flowchart TD
    subgraph RBAC["WS-12 Role-Based Access Matrix"]
        Role1["Founder & Academic Director<br/>(Neha Patil)"]
        Role2["Operations & Compliance Lead<br/>(Nitin Patil)"]
        Role3["Verified Parent / Guardian"]
        Role4["Public / Unauthenticated Visitor"]
    end

    RubricScoring["Diagnostic Rubric Scoring & Evaluator Notes"]
    SystemAudit["Audit Logs & Retention Purge Management"]
    ParentSummary["Encouraging Parent Discovery Summary Card"]
    PublicOverview["Course Overview & Booking Form"]

    Role1 -->|Full Read/Write/Approve| RubricScoring
    Role1 -->|Read Only| SystemAudit
    Role1 -->|Generate & Sign| ParentSummary

    Role2 -->|Read Only (Anonymized)| RubricScoring
    Role2 -->|Full Admin & Execution| SystemAudit
    Role2 -->|Access Support| ParentSummary

    Role3 -->|No Access| RubricScoring
    Role3 -->|No Access| SystemAudit
    Role3 -->|Read Own Child Summary Only| ParentSummary

    Role4 -->|No Access| RubricScoring
    Role4 -->|No Access| SystemAudit
    Role4 -->|No Access| ParentSummary
    Role4 -->|Submit Enquiry Form| PublicOverview
```

---

## 3. Synthetic Test Data Mandate

In adherence to child privacy mandates, all automated unit tests, component storyboards, and staging renders must use **strictly synthetic test fixtures**:
- **Synthetic Parent:** `"Priya Deshmukh (Synthetic Test Parent)"`
- **Synthetic Child Category:** `"Age 7-9 (Foundation Group)"`
- **Synthetic Phone:** `+91 99999 00000` (Mock test number)
- **Zero Production Storage:** Synthetic records are transiently stored in local memory and are never persisted to live customer databases.
