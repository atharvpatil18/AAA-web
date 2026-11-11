# AAA — SPRINT 1 PROGRAMME PAGE TEST REGISTER

**Document Reference:** `AAA-S4-TEST-PROG-01`  
**Workstream Reference:** `AAA-S4-WS-PROG-01`  
**Governing Determination:** `MGT-DET-S4-PE-04`  
**Compliance Officer:** Nitin Patil  
**Academic Director:** Neha Patil  
**Active Branch:** `feat/sprint1-public-web`  
**Test Environment:** Staging Local Build  
**Date:** 4 November 2026  

---

## 1. Test Suite Summary

| Test Category | Total Tests | Passed | Failed | Blocked / Restricted | Pass Rate |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Category A: Programme Content & Structure** | 10 | 10 | 0 | 0 | 100% |
| **Category B: Discovery Session & Modal Integration** | 8 | 8 | 0 | 0 | 100% |
| **Category C: Consent & Privacy Protocols** | 5 | 5 | 0 | 0 | 100% |
| **Category D: Mobile Responsiveness & Breakpoints** | 5 | 5 | 0 | 0 | 100% |
| **Category E: Route Integrity & Boundary Safety** | 6 | 6 | 0 | 0 | 100% |
| **Total** | **34** | **34** | **0** | **0** | **100%** |

---

## 2. Test Execution Details

### Category A: Programme Content & Structural Integrity

| Test ID | Test Scenario | Verification Target | Actual Result | Status |
| :--- | :--- | :--- | :--- | :---: |
| `TC-PROG-01` | Abacus Page Structure | 10-part framework present on `/programs/abacus` | All 10 structural sections rendered cleanly | **PASS** |
| `TC-PROG-02` | Vedic Maths Page Structure | 10-part framework present on `/programs/vedic-maths` | Modular sutras, Beejank verification detailed | **PASS** |
| `TC-PROG-03` | Mental Maths Page Structure | 10-part framework present on `/programs/mental-maths` | Independent speed calculation track detailed | **PASS** |
| `TC-PROG-04` | School Maths Page Structure | 10-part framework present on `/programs/school-maths` | CBSE/ICSE supplementary support; board disclaimer | **PASS** |
| `TC-PROG-05` | IPM & Olympiad Page Structure | 10-part framework present on `/programs/ipm-olympiad` | Non-routine problem decomposition; no rank guarantees | **PASS** |
| `TC-PROG-06` | Batch Size Copy Across All 5 Pages | "Personalised learning in small batches, with a maximum of five students per batch" | Zero occurrences of "1:8" or "Guaranteed 1:5" | **PASS** |
| `TC-PROG-07` | Mentor Credential Across All 5 Pages | "Neha Patil (MCA, Certified Trainer of Abacus & Vedic Mathematics)" | Zero occurrences of "Master Trainer" or "IIVA Certified Mentors" | **PASS** |
| `TC-PROG-08` | Child Development Phrasing | Non-clinical language: "designed to encourage", "opportunities to develop" | Zero IQ or neurological diagnosis claims | **PASS** |
| `TC-PROG-09` | Academic Flags Inspection | Pending items clearly noted for Neha Patil's validation | PENDING ACADEMIC APPROVAL documented | **PASS** |
| `TC-PROG-10` | Single Location NAP Consistency | Flat No. 3, Balaji Sagar Bungalow, Wakad, Pune 411057 | Single physical center maintained; zero satellite branch claims | **PASS** |

---

### Category B: Discovery Session & Modal Integration

| Test ID | Test Scenario | Verification Target | Actual Result | Status |
| :--- | :--- | :--- | :--- | :---: |
| `TC-CTA-01` | Abacus CTA Click | "Book a Discovery Session" triggers modal with Abacus context | Opens with `Abacus Mathematics (Ages 4.5–9)` | **PASS** |
| `TC-CTA-02` | Vedic Maths CTA Click | "Book a Discovery Session" triggers modal with Vedic context | Opens with `Vedic Mathematics (Ages 9–14)` | **PASS** |
| `TC-CTA-03` | Mental Maths CTA Click | "Book a Discovery Session" triggers modal with Mental Math context | Opens with `Mental Mathematics (Ages 6–14)` | **PASS** |
| `TC-CTA-04` | School Maths CTA Click | "Book a Discovery Session" triggers modal with School Math context | Opens with `School Mathematics (Grades 1–10)` | **PASS** |
| `TC-CTA-05` | IPM & Olympiad CTA Click | "Book a Discovery Session" triggers modal with Olympiad context | Opens with `IPM & Olympiad Mathematics (Grades 2–9)` | **PASS** |
| `TC-CTA-06` | Scheduling Nature Clarification | UI states submission is a scheduling request, not confirmed slot | Prominently displayed in modal callout | **PASS** |
| `TC-CTA-07` | Mode Selection (Offline vs Online) | Can toggle between Wakad Center and Live Online | State switches cleanly, reflected in WhatsApp message | **PASS** |
| `TC-CTA-08` | Pre-filled WhatsApp Text Quality | Formats respectful, detailed message for AAA admin | Message formatted without encoding corruption | **PASS** |

---

### Category C: Consent & Privacy Protocols

| Test ID | Test Scenario | Verification Target | Actual Result | Status |
| :--- | :--- | :--- | :--- | :---: |
| `TC-PRIV-01` | Required Service Consent Enforced | Form cannot be submitted if service consent is unchecked | Error displayed: "Please provide consent for service communication..." | **PASS** |
| `TC-PRIV-02` | Optional Marketing Consent Unbundled | Optional marketing consent is unchecked by default | Verified separate checkbox; submission succeeds even if unchecked | **PASS** |
| `TC-PRIV-03` | Minimum Initial Data Set | No DOB, school name, residential address or clinical fields | Confirmed only Parent Name, Phone, Age, Program, Mode | **PASS** |
| `TC-PRIV-04` | Zero-PII GA4 Telemetry | `trackCounsellingBook` and `trackDemoRequest` omit parent/child names | Clean analytics payloads verified | **PASS** |
| `TC-PRIV-05` | Input Sanitization | Parent name stripped of script tags and formula prefixes | `validateSanitizedName` passes sanitized string | **PASS** |

---

### Category D: Mobile Responsiveness & Viewport Breakpoints

| Test ID | Viewport Width | Testing Scope | Visual & Touch Verification | Status |
| :--- | :---: | :--- | :--- | :---: |
| `TC-RESP-01` | 320px (iPhone SE small) | All 5 programme pages | No horizontal scroll, text wraps cleanly, touch targets $\ge 44\text{px}$ | **PASS** |
| `TC-RESP-02` | 375px (iPhone standard) | Modal and cards | Form fields readable, modal dismiss button accessible | **PASS** |
| `TC-RESP-03` | 768px (iPad portrait) | Two-column grids | Level breakdown tables collapse into single column or scrollable table | **PASS** |
| `TC-RESP-04` | 1024px (iPad landscape) | Navbar & Hero split | Desktop navigation active; Hero grid splits 7/5 cleanly | **PASS** |
| `TC-RESP-05` | 1440px+ (Desktop standard) | Full layout container | Max-width constraints (7xl: 1280px) centered with proper padding | **PASS** |

---

### Category E: Route Integrity & Boundary Safety

| Test ID | Test Scenario | Verification Target | Actual Result | Status |
| :--- | :--- | :--- | :--- | :---: |
| `TC-RT-01` | TypeScript Compilation | `npx tsc --noEmit` exits with 0 | Exit Code 0, zero errors across 2,465 modules | **PASS** |
| `TC-RT-02` | Linter Compliance | `npm run lint` exits with 0 | Exit Code 0 | **PASS** |
| `TC-RT-03` | Production Build Verification | `npm run build` exits with 0 | Exit Code 0, Vite built in 23s | **PASS** |
| `TC-RT-04` | AcademyOS Protection | `/login` and `/practice/*` untouched | Zero file changes in AcademyOS directory | **PASS** |
| `TC-RT-05` | Canonical Head Injection | `SEOHead.tsx` injects canonical URLs on route change | Dynamic titles and canonical tags updated accurately | **PASS** |
| `TC-RT-06` | Git Branch Lock | Production branch `main` verified locked | `main` locked at `a21a3d1`; work isolated on `feat/sprint1-public-web` | **PASS** |
