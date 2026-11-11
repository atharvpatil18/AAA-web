# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# WS-09A.6: DATA CLASSIFICATION & RETENTION ARCHITECTURE

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S3-SPEC-WS09A-06`  
**Stage:** Stage 3 — Architecture & Design  
**Parent Workstream:** WS-09 — Technology Architecture, Data Persistence & CRM Strategy  
**Sub-Workstream:** WS-09A — Student Identity, Data Architecture & Persistence Strategy  
**Deliverable:** WS-09A.6 — Data Classification & Retention Architecture Specification  
**Governance Authority:** Nitin Patil (Operations & Technology Lead) & Neha Patil (Academic Director)  
**Date:** 04 November 2026  
**Status:** 🟡 **DRAFT — AWAITING MANAGEMENT REVIEW (GATE 3.4 OPEN)**  
**Execution Mode:** STRICTLY DOCUMENTATION-ONLY (IMPLEMENTATION FREEZE ACTIVE)  

---

## 1. Objectives & Compliance Governance

Arnav Abacus Academy handles sensitive minor data (children aged 4.5 to 14) and family financial records. To ensure absolute compliance with Indian Digital Personal Data Protection (DPDP) principles, zero-PII telemetry mandates, and operational efficiency, this specification establishes:
1. A rigorous **12-category Data Classification Matrix**.
2. Strict **Data Minimization** rules governing minimum necessary fields.
3. Explicit **Role-Based Access Control (RBAC)** boundaries.
4. Proposed **Retention & Archival Schedules**, explicitly distinguishing between ratified policies (e.g., 90-day enquiry retention) and policies pending final legal review in Workstream WS-10.

---

## 2. 12-Category Data Classification & Governance Matrix

| # | Data Category | Sensitivity Classification | Minimum Necessary Fields | Responsible Data Owner | Authorized Access Roles | Proposed Retention Schedule | Statutory / Policy Basis |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Student Identity** | **Confidential (Minor PII)** | Internal UUID, Display ID, First Name, Last Initial, DOB, Gender, Current Grade. | Neha Patil | Academic Director, Center Admin. | Permanent during active study; 5 years post-withdrawal; then anonymized. *(Pending WS-10 Legal)* | DPDP Act Minor Protection; AAA Student Record Policy. |
| **2** | **Parent / Guardian Contact** | **Confidential (Personal PII)** | Guardian Name, Relationship, E.164 Mobile Phone, Email, Residential Locality. | Nitin Patil | Admin, Billing Lead. | Active enrollment + 7 years (tax/audit alignment). *(Pending WS-10)* | Indian Contract Act; Tax Record Maintenance. |
| **3** | **Admissions Enquiry / Lead** | **Restricted PII** | Parent Name, Child Age, Programme of Interest, Contact Mobile Phone. | Nitin Patil | Admissions Lead. | **Strictly 90 days** from receipt if unconverted; then permanently purged. | **Ratified in Stage 2 (`BRD-S2-LEAD-03`) & `MGT-DET-S3-01`.** |
| **4** | **Programme Enrolment** | **Internal Operational** | Student ID, Programme Code, Enrolment Date, Status, Current Level ID. | Neha Patil | Academic Director, Instructors. | Permanent historical record. | Academic Progression Continuity. |
| **5** | **Batch Attendance** | **Internal Operational** | Batch ID, Student ID, Session Date, Attendance Status (P/A/E), Session Notes. | Center Admin | Instructors, Admin. | Current academic year + 2 years. | Operational SOP & Attendance Audits. |
| **6** | **Fee & Payment Records** | **Highly Confidential (Financial)** | Invoice Ref, Family ID, Amount (INR), Mode, Transaction Ref, Receipt Link. | Nitin Patil | Operations Lead, Accounts. | 8 financial years (statutory requirement). | Income Tax Act, 1961 (Section 44AA). |
| **7** | **Diagnostic Assessment** | **Pedagogical Confidential** | Student ID, Assessment Date, Evaluator Name, 6 Dimension Scores, Qualitative Notes. | Neha Patil | Neha Patil (Exclusive Academic Authority). | Permanent academic record (accessible only by Neha & parents). | AAA Learning Model™ Intellectual Property. |
| **8** | **Daily Practice Attempts** | **Internal Telemetry** | Student ID, Set ID, Category, Level, Score %, Time Taken (s), Answer Matrix. | Nitin Patil | Instructors, Student (Self). | Granular answers: 12 months; Summary scores: Permanent. | Learning analytics & skill trend analysis. |
| **9** | **Achievement Records / Diplomas** | **Public Verifiable** | Record Ref, Student Display ID, Student First Name, Programme, Level, Issue Date, HMAC Hash. | Neha Patil | Public Verifier, Parents, Students. | Permanent (for immutable third-party verification). | Stage 2 Certificate Verification Policy. |
| **10** | **Discovery Session Notes** | **Pedagogical Confidential** | Lead ID, Session Date, Evaluator Notes, Engagement Observations, Next Steps. | Neha Patil | Neha Patil, Admissions Lead. | 180 days if unconverted; merged into Student Assessment if enrolled. | Admissions Conversion & Student Profiling. |
| **11** | **Learning Recommendations** | **Pedagogical Confidential** | Student ID / Lead ID, Recommended Programme, Recommended Level, Parent Advice. | Neha Patil | Neha Patil, Parents. | 3 years or duration of enrolment. | AAA Educational Guidance Policy. |
| **12** | **System & Audit Logs** | **Internal Security** | Timestamp, Actor UUID, Action Type, Entity Target, IP (Masked), Outcome. | Nitin Patil | Nitin Patil (Security Admin). | Rolling 365 days. | Cybersecurity Incident Response & DPDP Audit. |

---

## 3. Data Minimization & Field Constraints

### 3.1 Strict Field Exclusion Rules
To maintain zero-PII telemetry and strict child data minimization:
1. **Zero Child Contact Info:** Minor students shall **NEVER** have personal mobile numbers or personal email addresses recorded in the database. All communication channels route exclusively through verified parents/guardians.
2. **Zero Government Identifiers:** AAA does not require, collect, or store Aadhaar numbers, PAN cards, passport numbers, or birth certificates for minor students.
3. **Zero Financial Account Credentials:** Credit card numbers, debit card PINs, and UPI MPINs are never handled or persisted by AAA systems. External payment gateways return opaque transaction IDs only.

---

## 4. Stage-Gate Acceptance & Verification

This specification satisfies **WS-09A.6** under Stage 3 Workstream WS-09A. It is submitted in **DRAFT** status and will be formally reviewed under Management Determination `MGT-DET-S3-12`. Gate 3.4 remains **OPEN**.
