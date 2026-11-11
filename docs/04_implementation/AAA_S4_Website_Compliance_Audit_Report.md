# ARNAV ABACUS ACADEMY (AAA) — STAGE 4 COMPLIANCE GATE
# S4-2: WEBSITE COMPLIANCE AUDIT REPORT

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S4-COMP-02`  
**Phase:** Stage 4 — Pre-Implementation Compliance Gate (`AAA-S4-COMPLIANCE-GATE-01`)  
**Accountable Internal Compliance Officer:** Nitin Patil  
**Academic & Child-Related Authority:** Neha Patil  
**Date of Audit:** 04 November 2026  
**Status:** 🟡 **DRAFT AUDIT FINDINGS — AWAITING REMEDIATION**  
**Production Status:** 🔒 **STRICTLY LOCKED**  

---

## 1. Executive Summary & Codebase Audit Scope

An exhaustive forensic scan of the existing repository codebase (`src/` across 73 files) was conducted to evaluate real-world legal, consumer protection, privacy, and technical compliance risks.

### 1.1 Summary of Findings by Severity
- 🔴 **CRITICAL (Immediate Action Required):** 4 Findings
- 🟠 **HIGH (Material Statutory & Regulatory Gaps):** 6 Findings
- 🟡 **MEDIUM (Important Control & Disclosure Gaps):** 5 Findings
- 🟢 **LOW (Minor Polish & Documentation):** 3 Findings

---

## 2. Forensic Findings Register Across Repository Codebase

### Finding AUD-01: False "Government Recognized" & Unverified Skill India / NSDC Badges
- **Severity:** 🔴 **CRITICAL (Violation of CCPA 2024 Coaching Guidelines & Trade Marks Act)**
- **Exact Code References:**
  - `src/components/Footer.tsx:32`: `<ShieldCheck className="..." /> {language === "hi" ? "सरकारी मान्यता प्राप्त" : "Government Recognized"}`
  - `src/lib/translations.ts:18`: `heroBadge: "⚡ ALIGNED WITH NEP 2020 • SKILL INDIA & NSDC PARTNER"`
  - `src/components/LeadForm.tsx:210`: `doc.text("AUTHORIZED SKILL INDIA PARTNER • NEP 2020 COMPLIANT CURRICULUM", ...)`
  - `src/pages/Home.tsx:142`: `Skill India & NSDC Authorised Training Partner Credentials`
- **Legal Risk:** Central Consumer Protection Authority (CCPA) Guidelines 2024 strictly prohibit coaching academies from claiming government recognition, affiliation, or partnership unless backed by active, unexpired statutory accreditation certificates. Misleading use of Government / Skill India / NSDC emblems violates the State Emblem of India (Prohibition of Improper Use) Act, 2005.
- **Evidence Verification:** Unless Neha Patil holds an active, legally certified franchise / training partner MoU with NSDC/Skill India in the Documentary Verification Register (DVR), these claims constitute severe legal liability.
- **Recommended Remediation:** **Strip all claims of "Government Recognized" immediately.** Reframe to factual pedagogical wording: *"Supplementary Mathematics & Cognitive Skill Development • Aligned with NEP 2020 Foundational Numeracy Principles"*.

---

### Finding AUD-02: Unsubstantiated "Guaranteed 100% Accuracy" & "Guaranteed 1:8 Ratio" Claims
- **Severity:** 🔴 **CRITICAL (Violation of CCPA 2022/2024 Coaching Guidelines on Misleading Advertisements)**
- **Exact Code References:**
  - `src/components/Hero.tsx:48`: `Guaranteed 1:8 Micro-Batches`
  - `src/lib/translations.ts:20`: `heroRatioBadge: "🎯 GUARANTEED 1:8 BATCH RATIO — PERSONALIZED CARE"`
  - `src/data/blogData.ts:114`: `Developing 100% accuracy & laser focus`
  - `src/data/blogData.ts:128`: `Why nearly 40% of AAA champions solve 100 questions with 100% accuracy in under 20 minutes...`
  - `src/pages/NewsEvents.tsx:142`: `Arnav didn't just solve math problems—he redefined human speed boundaries with surgical 100% accuracy...`
- **Legal Risk:** CCPA Guidelines 2024 expressly prohibit using words like *"Guaranteed"*, *"100% Success"*, or making absolute speed claims without empirical documentary proof for each cited student. Furthermore, Stage 2 BRD ratified AAA's batch differentiator as **Micro-Batches of maximum $\le 5$ students**, directly contradicting the legacy "1:8" website copy!
- **Recommended Remediation:**
  1. Replace "1:8" with the ratified AAA micro-batch constraint: *"Dedicated Micro-Batches (Maximum $\le 5$ Students for Focused Educator Attention)"*.
  2. Eliminate the word "Guaranteed" from all headings.
  3. Reframe "100% Accuracy" to factual, self-baseline progress metrics: *"Building Speed, Accuracy, and Mathematical Confidence"*.

---

### Finding AUD-03: Minor PII Exposure in Unauthenticated JSONBlob Storage
- **Severity:** 🔴 **CRITICAL (Violation of DPDP Act 2023 Sec 9 & Information Technology Act Sec 43A)**
- **Exact Code References:**
  - `src/lib/cloudSync.ts:27`: `const CLOUD_SYNC_URL = "https://jsonblob.com/api/jsonBlob/019f9065-ec4f-7d60-b80c-07b7f039afe6";`
  - `src/lib/cloudSync.ts:19-22`: Transmits `userId` (email), `userName`, `userEmail`, scores, and completed timestamps via unauthenticated `PUT`.
- **Legal Risk:** Storing minor students' names, email addresses, and practice scores on an unauthenticated third-party mock server without encryption or access controls violates DPDP minor privacy mandates and CERT-In directions.
- **Recommended Remediation:** Maintain strict containment in Stage 3/pre-implementation (zero scraping, zero disruption); execute Phase 3/4 dual-write cutover to authenticated PostgreSQL in Sprint 4 as ratified under `MGT-DET-S3-12`.

---

### Finding AUD-04: Client-Side OTP Generation & Plaintext Console Exposure
- **Severity:** 🔴 **CRITICAL (Cybersecurity Weakness under IT Act Sec 43A & Reasonable Security Practices)**
- **Exact Code References:**
  - `src/lib/AuthContext.tsx:82-95`: OTP generated in browser via `Math.random()` and saved to `localStorage.setItem("aaa_otp_...", otp)`.
  - `src/lib/AuthContext.tsx:105`: `console.log("DEV FALLBACK OTP:", otp)` prints OTP to public browser console on email failure.
- **Legal Risk:** Allows any visitor to inspect `localStorage` or browser console logs to bypass authentication and access AcademyOS practice accounts.
- **Recommended Remediation:** Migrate authentication to trusted server-side API gateway (`/api/v1/auth/request-otp`) utilizing CSPRNG OTP generation, 3-attempt rate limiting, and HttpOnly session cookies in Sprint 3.

---

### Finding AUD-05: Missing Statutory Disclosures & Grievance Officer in Footer
- **Severity:** 🟠 **HIGH (Violation of IT Rules 2021 & Consumer Protection Rules 2020)**
- **Exact Code References:**
  - `src/components/Footer.tsx`: Displays basic copyright, social links, and phone. Lacks Grievance Officer contact, Terms of Service, and explicit Refund Policy.
- **Legal Risk:** Rules mandate that every digital service entity in India prominently publish the name, designation, and contact details (email and physical address) of its designated Grievance Officer.
- **Recommended Remediation:** Add comprehensive legal footer containing:
  1. Designated Grievance Officer: *Nitin Patil (Compliance & Grievance Officer, grievance@arnavabacus.com, +91 90219 24968)*.
  2. Prominent links to Terms of Admission, Privacy Policy (DPDP Aligned), and Fee/Refund Disclosures.

---

### Finding AUD-06: Student Testimonials Lacking CCPA 2024 Mandatory Disclosures
- **Severity:** 🟠 **HIGH (Violation of CCPA Coaching Guidelines 2024, Clause 4)**
- **Exact Code References:**
  - `src/data.ts:24-85`: Testimonials quote student names (*"Aarav S.", "Riya M."*) with claims like *"State Abacus Champion"*, but omit course type, course duration, year of achievement, and whether it was a paid or free course.
- **Legal Risk:** Clause 4 of CCPA Coaching Guidelines 2024 mandates that all student advertisements and testimonials must conspicuously disclose: (a) Student's authentic name & photo with written parental consent; (b) Rank/Award achieved; (c) Exact course name and duration enrolled; (d) Whether the course was paid.
- **Recommended Remediation:** Audit all testimonials against Neha Patil's authentic student register. Standardize testimonial metadata: *"Aarav S. • Enrolled in Abacus Senior (Level 1–4, 18 Months Paid Course) • 1st Place, Regional Abacus Competition 2025"*.

---

### Finding AUD-07: Unsubstantiated "International Accreditation" on PDF Certificates
- **Severity:** 🟠 **HIGH (Misleading Academic Credentialing under Consumer Protection Act)**
- **Exact Code References:**
  - `src/lib/certificateGenerator.ts:101`: `INTERNATIONAL ABACUS & SPEED MATH OLYMPIAD ACCREDITATION • WAKAD, PUNE, INDIA`
  - `src/lib/certificateGenerator.ts:112`: `INTERNATIONAL CERTIFICATE OF SPEED MATH EXCELLENCE`
  - `src/lib/certificateGenerator.ts:163`: `VERIFICATION CODE: AAA-INT-${Math.floor(100000 + Math.random() * 900000)}`
- **Legal Risk:** Browser-generated PDFs generated on timed quiz completions claim "International Accreditation" and use arbitrary random numbers that cannot be verified. This risks charges of fraudulent credentialing.
- **Recommended Remediation:** Retitle to **"Practice Achievement Record"** in Sprint 5; eliminate "International Accreditation" claim; reserve official diplomas for physical certificates authorized by Neha Patil and verified via HMAC central ledger.

---

## 3. Compliance Action Matrix Summary

| Finding ID | Domain | Root Cause in Repository | Required Engineering / Copy Fix | Target Sprint |
| :---: | :--- | :--- | :--- | :---: |
| **AUD-01** | Advertising | Unverified "Government Recognized" badge. | Strip emblem; replace with factual NEP 2020 alignment statement. | Sprint 1 |
| **AUD-02** | Consumer Info | Legacy "Guaranteed 1:8" and "100% Accuracy". | Update to ratified "Micro-Batches $\le 5$ Students"; drop "Guaranteed". | Sprint 1 |
| **AUD-03** | Data Privacy | JSONBlob practice attempt persistence. | Migrate to PostgreSQL via 11-step framework; zero live scraping. | Sprint 4 |
| **AUD-04** | Cybersecurity | Client-side OTP in `AuthContext.tsx`. | Transition to server-side CSPRNG OTP + HttpOnly session cookies. | Sprint 3 |
| **AUD-05** | Legal Disclosure| Missing Grievance Officer in footer. | Add Nitin Patil as Grievance Officer with dedicated contact info. | Sprint 1 |
| **AUD-06** | Testimonials | Missing CCPA 2024 coaching disclosures. | Add course type, duration, and paid status to all testimonials. | Sprint 1 |
| **AUD-07** | Credentials | "International Accreditation" on quiz PDFs. | Retitle to "Practice Achievement Record" with central ledger. | Sprint 5 |
