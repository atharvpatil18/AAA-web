# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3
## Document Reference: `AAA_WS18_PRIVACY_LEGAL_AND_RETENTION_ASSESSMENT`
### WS-18 Independent Technical & Governance Acceptance Audit
#### Dimension F: Children's Data Privacy, Statutory Claims & Retention Assessment

**Document Version:** 1.0.0  
**Audit Date:** 05-November-2026  
**Audited Branch:** `feat/sprint3-integration`  
**Audited HEAD Commit:** `d3daf4f`  
**Governing Baseline Determination:** `MGT-DET-S4-S3-STEP0-WS18-08`  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Summary & Regulatory Scope

This assessment reviews every statutory claim, privacy mechanism, and legal statement implemented in **Workstream 18** and its related admissions components. It reconciles technical implementations with the **Digital Personal Data Protection (DPDP) Act, 2023**, the **Central Consumer Protection Authority (CCPA) Guidelines for Prevention of Misleading Advertisements in Coaching 2024**, and the **Information Technology Act, 2000**.

---

## 2. Review of Statutory Claims & Legal Distinctions

### 2.1 DPDP Act 2023 Section 9 (Processing of Children's Data)
- **Statutory Status:** The DPDP Act, 2023 received Presidential assent on 11 August 2023. As of late 2024 / 2026, the subordinate rules and the establishment of the Data Protection Board of India (DPBI) by the Ministry of Electronics and Information Technology (MeitY) are in the process of notification. Section 9 has not yet reached full day-to-day administrative enforcement with issued technical guidelines.
- **Clarification:** AAA's technical implementation of verifiable parental consent, prohibition of behavioral tracking, and data minimization represents a **proactive future-readiness architecture**, rather than compliance with fully notified administrative rules.
- **Retention Exemption Clarification:** Section 9 contains restrictions on processing children's data (e.g. tracking, harmful processing); it does **not** create a general statutory retention exemption for student records.
- **Actual Legal Basis for Educational Record Retention:** Enrolled student records are retained on the legal basis of **contractual performance** (delivering the subscribed educational courses) and **legitimate educational administration** under Indian contract law, not a Section 9 exemption.

### 2.2 DPDP Act 2023 Section 6(1) vs. Section 6(9)
- **Section 6(1):** Governs the mandatory elements of valid consent—it must be free, specific, informed, unconditional, and unambiguous with a clear affirmative action. AAA's unbundled dual consent checkboxes (`serviceConsent` and `marketingConsent`) directly implement Section 6(1).
- **Section 6(9):** Specifically addresses the technical interoperability of Data Fiduciaries with **registered Consent Managers** authorized by the DPBI. AAA does not currently integrate with third-party Consent Managers (which are not yet operational in the market). Previous references to "Section 6(9)" have been corrected to refer to Section 6(1).

### 2.3 Elimination of Hyperbolic Privacy Terminology
- **Correction:** Under modern cybersecurity and legal doctrine, claims such as *"impermeable privacy"*, *"zero-breach compliance"*, or *"unbreakable protection"* are technically inaccurate and legally hazardous.
- **Approved Standard Terminology:**
  *"Arnav Abacus Academy maintains a defensible, DPDP-aligned data minimization architecture with strict role-based access controls and zero-PII public analytics."*

---

## 3. Data Retention & Lifecycle Isolation

```
+---------------------------------------------------------------------------------------+
| PROSPECTIVE LEAD LIFECYCLE (Prospective Zone)                                          |
| - Service Consent & unbundled Marketing Consent collected via public forms             |
| - 90-Day Retention Clock active (monitored by privacyRetentionEngine.ts)               |
| - Immediate Parent Right-to-Erasure supported within 24-hour SLA                       |
| - Unconverted leads automatically eligible for cryptographic shredding at Day 90      |
+---------------------------------------------------------------------------------------+
                                           |
                                  Transition: ENROLLED
                                           v
+---------------------------------------------------------------------------------------+
| ENROLLED STUDENT LIFECYCLE (Educational Zone)                                          |
| - Dual-Identity Decoupling: Lead ID decoupled; AAA-STD UID allocated                   |
| - Telemetry Shredding: Marketing flags, IP hashes, and honeypot flags purged           |
| - Retention Status: Active Student (exempt from 90-day prospective purge)             |
| - Purpose: Educational instruction, batch scheduling, and curriculum practice          |
+---------------------------------------------------------------------------------------+
```

### 3.1 Verification of Retention Exemption Logic
In `src/lib/academyRosterBridge.ts`:
- `verifyStudentRetentionExemption()` evaluates:
  - If `profile.retentionExempt === true && profile.status === "ACTIVE"`: returns `exempt: true`.
  - If `profile.status === "WITHDRAWN"`: returns `exempt: false`.
- **TC-SYNC-10 Verification:** Confirmed that active enrolled students are exempt from prospective purging, but withdrawn students are flagged for retention review. (PASS)

---

## 4. Matters Requiring Independent Indian Legal Counsel

The following matters are business and legal governance decisions that cannot be resolved solely by software architecture and require formal sign-off from AAA's Indian legal counsel:

1. **Parental Verification Standard:** Confirmation of whether SMS OTP to the parent's verified mobile meets the statutory threshold of "verifiable parental consent" under upcoming DPDP Section 9 rules, or whether DigiLocker / Aadhaar identity tokenization will be mandated for coaching institutes.
2. **Student Worksheets & Video Media:** Drafting formal physical and digital consent deeds for publishing student competition photographs or speed-drill demonstration videos under CCPA 2024 Coaching Guidelines.
3. **Tuition Refund Policy:** Formal review of fee refund terms under CCPA 2024 coaching mandates (pro-rata refund within 10 days of withdrawal request).
4. **Terms of Service & Privacy Policy:** Formal legal review of published terms at `/contact` and `/parent-guides`.

---

## 5. Privacy & Legal Findings Summary

| Dimension | Audit Finding | Classification |
| :--- | :--- | :---: |
| **Section 9 Claims** | Re-classified as future-readiness controls; retention basis clarified as contractual educational delivery. | 🟢 **CORRECTED** |
| **Section 6 Citation** | Citation refined to Section 6(1) for unbundled consent; Section 6(9) Consent Manager claims purged. | 🟢 **CORRECTED** |
| **Zero-Breach Claims** | Hyperbolic claims removed; replaced with defensible data minimization posture. | 🟢 **CORRECTED** |
| **Retention Decoupling** | Verified separation of 90-day prospect purge from active student academic records. | 🟢 **PASS** |
| **Legal Counsel Items** | 4 actionable items cataloged for external Indian legal review. | 🟡 **CATALOGED** |
