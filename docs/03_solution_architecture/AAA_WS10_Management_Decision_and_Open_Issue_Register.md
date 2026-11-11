# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# WS-10 ARCHITECTURE DECISION & OPEN ISSUE REGISTER (RATIFIED)

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S3-REG-WS10-01`  
**Stage:** Stage 3 — Architecture & Design  
**Workstream:** WS-10 — Security, Privacy, Compliance & Certificate Governance  
**Governance Authority:** Nitin Patil (Operations & Technology Lead) & Neha Patil (Academic Director)  
**Ratification Date:** 04 November 2026  
**Management Instrument:** `MGT-DET-S3-14`  
**Status:** 🟢 **RATIFIED & CLOSED — WS-10 FORMALLY APPROVED (GATE 3.5 CLOSED)**  

---

## 1. Executive Summary & Ratification Record

Under Management Determination **`MGT-DET-S3-14`**, executed on **04 November 2026**, **Nitin Patil** (Operations & Technology Lead) and **Neha Patil** (Academic Director & Founder) have formally reviewed and ratified all eight architectural determinations formulated under **WS-10 (Security, Privacy, Compliance & Certificate Governance Architecture)**.

With this formal ratification:
1. Deliverables **WS-10.1 through WS-10.7** constitute the binding security, privacy, DPDP compliance, and certificate governance baseline for Arnav Abacus Academy.
2. **Stage-Gate 3.5 is formally CLOSED.**
3. Commencement of **Workstream WS-11 (Platform Hosting & Infrastructure Architecture)** under **Gate 3.6** is officially authorized.

---

## 2. Ratified Architectural Determinations (`MGT-DET-S3-14`)

| Decision ID | Decision Title | Owning Lead | Ratified Architectural Determination | Strategic & Operational Impact | Ratification Status |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **D-10-01** | **DPDP Minor Data Privacy Requirements Adoption** | Nitin & Neha | **APPROVED:** Adopt statutory privacy matrix mapping verifiable parental consent, purpose limitation, and data minimization across all 12 AAA data categories. | Establishes institutional alignment with the Digital Personal Data Protection Act, 2023. | **RATIFIED** (04-Nov-2026) |
| **D-10-02** | **Referral of Legal Questions (LQ-01 to LQ-04) to Legal Counsel** | Nitin Patil | **APPROVED:** Formally submit the 4 structured legal questions (parental verification rules, educational telemetry exemption, 90-day retention conflict, offline buffers) to qualified Indian legal counsel. | Secures formal legal sign-off prior to Stage 4 implementation without unauthorized assumptions. | **RATIFIED** (04-Nov-2026) |
| **D-10-03** | **External Integration Risk Mitigation Roadmap** | Nitin Patil | **APPROVED:** Adopt remediation roadmap: migrate JSONBlob practice sync via 5-phase plan; replace Google Apps Script with dedicated API gateway; replace client-side EmailJS with server OTP. Live endpoints untouched in Stage 3. | Eliminates critical security vulnerabilities safely while preserving live AcademyOS operations in Stage 3. | **RATIFIED** (04-Nov-2026) |
| **D-10-04** | **Trusted Server Authentication & Session Architecture** | Nitin Patil | **APPROVED:** Adopt transition to server-side CSPRNG OTP generation, rate limiting (3 tries/15 min), and HttpOnly/Secure/SameSite session cookies. Deprecate localStorage permissions. | Eliminates client-side OTP sniffing and permission tampering in AcademyOS. | **RATIFIED** (04-Nov-2026) |
| **D-10-05** | **Role-Based Access Control (RBAC) Matrix Adoption** | Neha & Nitin | **APPROVED:** Adopt 6-tier RBAC matrix (Academic Director, Operations Lead, Educator, Admissions Staff, Parent, Student) enforced via server-verified JWT claims. | Restricts access to student and financial data based strictly on verifiable institutional need-to-know. | **RATIFIED** (04-Nov-2026) |
| **D-10-06** | **Zero-PII Telemetry Validation & Redaction Filter** | Nitin Patil | **APPROVED:** Adopt independent validation controls: strip URL query parameters from GA4 hits, enforce static page titles, and disable Google Signals advertising profiling for minors. | Guarantees 100% Zero-PII compliance and prevents third-party profiling of minor students. | **RATIFIED** (04-Nov-2026) |
| **D-10-07** | **Certificate & Achievement Governance Hierarchy** | Neha Patil | **APPROVED:** Adopt strict 3-tier hierarchy separating client-side "Practice Achievement Records" from authoritative "Official Level Diplomas" signed by Neha Patil. | Upholds academic integrity, prevents misleading accreditation claims, and protects academy reputation. | **RATIFIED** (04-Nov-2026) |
| **D-10-08** | **Digital Certificate Verification Architecture & Ledger** | Nitin & Neha | **APPROVED:** Adopt Central Certificate Ledger with HMAC-SHA256 cryptographic tamper-evidence and public verification page showing masked student name only. | Provides verifiable credentials for schools and competitions while protecting minor student privacy. | **RATIFIED** (04-Nov-2026) |

---

## 3. Mandatory Governance Conditions & Next Workstream Mandate

1. **Implementation Freeze Remains 100% Active:** No source code changes in `src/`, no live cryptographic key generation, and no deployment.
2. **Closure of Stage-Gate 3.5:** Gate 3.5 is formally sealed.
3. **Authorization to Commence WS-11:** Management hereby formally authorizes immediate commencement of **WS-11 (Platform Hosting & Infrastructure Architecture)** under **Gate 3.6** in strict documentation-only mode.
