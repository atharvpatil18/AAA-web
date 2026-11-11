# ARNAV ABACUS ACADEMY (AAA) — STAGE 4 COMPLIANCE GATE
# S4-9: LEGAL REVIEW & OPEN QUESTIONS REGISTER

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S4-COMP-09`  
**Phase:** Stage 4 — Pre-Implementation Compliance Gate (`AAA-S4-COMPLIANCE-GATE-01`)  
**Accountable Internal Compliance Officer:** Nitin Patil  
**Date:** 04 November 2026  
**Status:** 🟡 **ACTIVE LEGAL REGISTER — INTERNAL COMPLIANCE DETERMINATION**  
**Production Status:** 🔒 **STRICTLY LOCKED**  

---

## 1. Executive Context & Compliance Officer Mandate

Under Management Determination `MGT-DET-S3-15` (D-11-08) and `MGT-DET-S4-01`, management ratified that **Nitin Patil, in his official capacity as AAA Operations, Technology Lead & Compliance Officer**, conducts the internal statutory assessment for Arnav Abacus Academy.

This register formally records the internal legal analysis and operational determinations resolving the core statutory questions (`LQ-01` through `LQ-06`), while identifying the precise threshold conditions where qualified external Indian legal counsel must be formally engaged.

---

## 2. Internal Legal Analysis & Compliance Determinations

### Question LQ-01: Verifiable Parental Consent Mechanism for Educational Coaching
- **Statutory Provision:** Digital Personal Data Protection Act, 2023 — Section 9(1).
- **Statutory Text:** *"The Data Fiduciary shall, before processing any personal data of a child, obtain verifiable consent of the parent of such child..."*
- **Operational Reality at AAA:** AAA provides supplementary mathematics education to minor children (ages 4.5–14). The initial web enquiry captures parent mobile phone; admission involves in-person parent interaction at the Wakad Center.
- **Nitin Patil's Internal Compliance Determination:**
  1. Capturing the parent's verified mobile phone number via SMS/WhatsApp OTP, paired with an explicit unbundled consent checkbox, constitutes legally defensible *verifiable parental consent* under current Indian commercial and electronic contract standards (IT Act Section 10A).
  2. Because minor children (ages 4.5–9) do not possess independent mobile phones or banking instruments in Pune households, OTP verification to the parent's phone establishes presumptive parental authority.
  3. Formal admission agreements executed in-person at the Wakad Center require physical handwritten signatures from parents, providing absolute contractual validity under the Indian Contract Act, 1872.
- **Statutory Status:** **COMPLIANT IN PRACTICE.** External counsel engagement deferred unless DPDP subordinate rules mandate biometric/DigiLocker verification.

---

### Question LQ-02: Educational Telemetry Exemption from Behavioral Tracking Prohibitions
- **Statutory Provision:** DPDP Act, 2023 — Section 9(3).
- **Statutory Text:** *"A Data Fiduciary shall not undertake tracking or behavioral monitoring of children or targeted advertising directed at children..."*
- **Operational Reality at AAA:** AcademyOS measures arithmetic calculation speed, latency per question, and error patterns (e.g., Small Friends vs Big Friends formulas) during student practice.
- **Nitin Patil's Internal Compliance Determination:**
  1. The legislative intent of Section 9(3) is to prohibit surveillance advertising, commercial profiling, and cross-site behavioral tracking that exploits minor vulnerabilities.
  2. AcademyOS practice telemetry serves an exclusively **educational and formative learning purpose**, evaluating mathematical accuracy for student self-baseline growth.
  3. To ensure absolute compliance, AAA strictly excludes all third-party commercial advertising trackers, session replay tools, and ad pixels from authenticated practice routes (`/practice/*`).
  4. AAA does not sell, lease, or monetize student practice data to any third party.
- **Statutory Status:** **COMPLIANT IN DESIGN.** Telemetry is strictly educational and isolated from commercial advertising.

---

### Question LQ-03: Reconciling 90-Day Lead Retention with Consumer Dispute Limitation Periods
- **Statutory Provision:** DPDP Act 2023 Section 8(7) (Data Erasure) vs Consumer Protection Act, 2019 Section 69 (2-Year Limitation Period for Complaints).
- **The Apparent Conflict:** DPDP mandates deleting personal data once the enquiry purpose is fulfilled (ratified 90-day purge). However, a prospective parent could theoretically file a consumer grievance up to 2 years later.
- **Nitin Patil's Internal Compliance Determination:**
  1. For **non-enrolled inquiries** where no fee was charged and no commercial contract executed, the data processing purpose ceases once the parent declines or fails to enroll within 90 days. Continued retention of minor age and parent phone numbers without an active relationship creates statutory DPDP liability.
  2. For **enrolled students**, financial receipts and enrollment contracts are retained for 8 financial years under tax and consumer protection mandates.
  3. Therefore, the 90-day retention rule for non-enrolled inquiries is legally sound and minimizes data exposure risks. Anonymized, aggregated enquiry counts (with zero PII) are retained for annual admissions reporting.
- **Statutory Status:** **COMPLIANT.** 90-day purge schedule reaffirmed for non-enrolled leads.

---

### Question LQ-04: Security of Offline Browser Storage Buffers on Shared Household PCs
- **Statutory Provision:** Information Technology (Reasonable Security Practices) Rules, 2011; DPDP Act Section 8(5).
- **Operational Reality at AAA:** In WS-09B, an offline caching buffer (`localStorage.setItem("aaa_leads_history", ...)`) was ratified to ensure parent inquiries are not dropped during network disconnects.
- **Nitin Patil's Internal Compliance Determination:**
  1. Caching plaintext parent names and phone numbers in browser `localStorage` on a shared family computer or cyber café machine creates an unauthorized disclosure risk if another user inspects local storage.
  2. **Mandatory Security Remediation:** In Sprint 1, the client-side buffer must encrypt cached payloads using a lightweight browser-session key, cap storage at a maximum of 10 submissions, and **automatically delete the cached entry immediately** upon receiving an HTTP 201 success confirmation from the server.
  3. A visible user notice must clarify: *"Your request is temporarily stored on your device and will synchronize automatically once reconnected."*
- **Statutory Status:** **COMPLIANT WITH CONTROLS.** Encrypted transient buffer specified.

---

### Question LQ-05: Legality of Physical Certificate Revocation & Central Verification
- **Statutory Provision:** Indian Contract Act, 1872; Information Technology Act, 2000 Section 35 (Digital Certification).
- **Nitin Patil's Internal Compliance Determination:**
  1. Official level completion diplomas represent institutional academic recognition issued under the authority of Neha Patil.
  2. The academy reserves the legal right to revoke or invalidate any certificate obtained through fraudulent representation, impersonation, or academic dishonesty.
  3. The public verification page (`/verify/cert/:token`) displays strictly masked student names (`Atharv P.`) and course details, verifying authenticity without infringing student privacy.
- **Statutory Status:** **COMPLIANT IN DESIGN.**

---

### Question LQ-06: Local Business Registration Disclosures (Maharashtra Shops Act)
- **Statutory Provision:** Maharashtra Shops and Establishments (Regulation of Employment and Conditions of Service) Act, 2017.
- **Nitin Patil's Internal Compliance Determination:**
  1. AAA's physical coaching premises in Wakad operates within the Pimpri-Chinchwad Municipal Corporation (PCMC) jurisdiction.
  2. Physical center operations require maintaining a valid Gumasta (Shop Act Intimation Receipt) under the Maharashtra Act.
  3. The website footer and contact page shall display the verified physical center address prominently. Formal registration certificate is maintained on-site at Balaji Sagar Bungalow.
- **Statutory Status:** **OPERATIONAL COMPLIANCE.** Physical audit in Track A will log the framed registration certificate.

---

## 3. Threshold for External Legal Counsel Engagement

In accordance with Nitin Patil's fiduciary mandate as Compliance Officer, external Indian legal counsel shall be formally retained if:
1. The Government of India notifies specific subordinate DPDP Rules mandating third-party biometric or DigiLocker verification for coaching centers.
2. A formal statutory inquiry, legal notice, or consumer complaint is served by any regulatory body (CCPA, CERT-In, PCMC, or Consumer Forum).
3. The academy transitions its corporate legal structure from Sole Proprietorship/Partnership into a Private Limited Entity or expands into a multi-state franchise network.

---

## 4. Compliance Sign-Off Status

This register satisfies deliverable **AAA-S4-COMP-09**. Status: **INTERNAL COMPLIANCE OFFICER DETERMINATIONS FORMALLY RECORDED AND SIGNED**.
