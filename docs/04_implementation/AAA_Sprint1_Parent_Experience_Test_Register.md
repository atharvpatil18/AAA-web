# AAA — SPRINT 1 PARENT EXPERIENCE TEST REGISTER

**Document Reference:** AAA-S4-TEST-PE-01  
**Authority:** `MGT-DET-S4-COMP-02` & `MGT-DET-S4-EVID-03`  
**Active Branch:** `feat/sprint1-public-web`  
**Environment:** Staging / Local Build Verification  
**Production Status:** STRICTLY LOCKED  
**Tested By:** Agent Engineering  
**Approved By:** Nitin Patil & Neha Patil  
**Date:** 4 November 2026  

---

## 1. Test Execution Summary

| Test Suite | Total Cases | Passed | Failed | Blocked | Pass Rate |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Suite 1: Navigation & Link Integrity** | 12 | 12 | 0 | 0 | 100% |
| **Suite 2: Parent Guide Routes & Render** | 6 | 6 | 0 | 0 | 100% |
| **Suite 3: Discovery Modal & Lead Forms** | 8 | 8 | 0 | 0 | 100% |
| **Suite 4: Structured Data & Canonical SEO** | 7 | 7 | 0 | 0 | 100% |
| **Suite 5: Build, Bundle & Boundary Safety** | 5 | 5 | 0 | 0 | 100% |
| **Total** | **38** | **38** | **0** | **0** | **100%** |

---

## 2. Test Suite 1: Navigation & Link Integrity

| Test ID | Test Scenario | Expected Outcome | Actual Result | Status |
| :--- | :--- | :--- | :--- | :---: |
| `TC-NAV-01` | Desktop Navbar: Hover / Click "Parent Guides" | Dropdown opens revealing 6 items (Overview + 5 Guides) | Dropdown renders smoothly, click outside dismisses | **PASS** |
| `TC-NAV-02` | Desktop Navbar: Click "Programmes" dropdown | All 5 individual programs + overview listed | All 5 program links navigate to correct sub-routes | **PASS** |
| `TC-NAV-03` | Desktop Navbar: Click "Discovery Session" CTA | `DemoBookingModal` opens with default program | Modal opens with "Personalised Learning Discovery Session" | **PASS** |
| `TC-NAV-04` | Mobile Drawer: Toggle Hamburger Menu | Mobile drawer reveals nested Parent Guides and Programs | Full hierarchy rendered with sub-items | **PASS** |
| `TC-NAV-05` | Footer Column 2: Program Directory | Lists Abacus, Vedic, Mental, School, and IPM & Olympiad | All 5 program links render and route correctly | **PASS** |
| `TC-NAV-06` | Footer Column 3: Parent Guides Directory | Lists Parent Guides Hub + 5 individual guides | All 6 links render and route without 404 | **PASS** |
| `TC-NAV-07` | Footer Column 4: Contact & Grievance | Nitin Patil contact (`+91 90219 24968`) and Wakad address visible | Contact info accurately rendered | **PASS** |
| `TC-NAV-08` | Homepage Hero: Primary CTA Click | "Book a Discovery Session" triggers `DemoBookingModal` | Modal opens cleanly | **PASS** |
| `TC-NAV-09` | Homepage Hero: Secondary CTA Click | "Explore Our Programmes" scrolls to `#programmes-section` | Smooth scroll executes to section | **PASS** |
| `TC-NAV-10` | Floating CTA: Book Discovery Session Pill | Sticky pill triggers `DemoBookingModal` | Modal opens | **PASS** |
| `TC-NAV-11` | Floating CTA: WhatsApp Direct Bubble | Opens pre-filled WhatsApp message with discovery session inquiry | Pre-filled URL formed correctly | **PASS** |
| `TC-NAV-12` | Homepage: Section 5B Parent Guides Cards | 3 featured cards link directly to corresponding guide routes | Links navigate with scroll-to-top | **PASS** |

---

## 3. Test Suite 2: Parent Guide Routes & Page Rendering

| Test ID | Test Route | HTTP / Router Test | Expected Component | Status |
| :--- | :--- | :--- | :--- | :---: |
| `TC-PG-01` | `/parent-guides` | Client Route Render | `ParentGuidesHub.tsx` loads, displays 5 guides + discovery bridge | **PASS** |
| `TC-PG-02` | `/parent-guides/abacus-vs-vedic-maths` | Route Render | `GuideAbacusVsVedicMaths.tsx` loads, comparative table visible | **PASS** |
| `TC-PG-03` | `/parent-guides/does-abacus-confuse-school-math` | Route Render | `GuideDoesAbacusConfuseSchoolMath.tsx` loads, code-switching section | **PASS** |
| `TC-PG-04` | `/parent-guides/why-children-use-finger-counting` | Route Render | `GuideWhyChildrenUseFingerCounting.tsx` loads, bead bridging model | **PASS** |
| `TC-PG-05` | `/parent-guides/why-smart-children-make-silly-math-mistakes` | Route Render | `GuideWhySmartChildrenMakeSillyMathMistakes.tsx` loads, 4-step routine | **PASS** |
| `TC-PG-06` | `/parent-guides/ideal-age-to-start-abacus` | Route Render | `GuideIdealAgeToStartAbacus.tsx` loads, age-band milestones | **PASS** |

---

## 4. Test Suite 3: Discovery Modal & Lead Forms

| Test ID | Scenario | Verification Criteria | Status |
| :--- | :--- | :--- | :---: |
| `TC-FORM-01` | `DemoBookingModal` Input Validation | Requires valid parent name ($\ge 2$ characters) & 10-digit phone | **PASS** |
| `TC-FORM-02` | `DemoBookingModal` Offline / Online Toggle | Toggles between "🏫 Wakad Center (Offline)" and "💻 Live Online" | **PASS** |
| `TC-FORM-03` | `DemoBookingModal` WhatsApp Dispatch | Generates URL with clean message containing parent name, child age, program & mode | **PASS** |
| `TC-FORM-04` | `DemoBookingModal` Zero-PII Telemetry | `trackCounsellingBook` and `trackDemoRequest` contain no PII | **PASS** |
| `TC-FORM-05` | `LeadForm` Bot Trap Protection | Hidden honeypot field (`website_url_hp`) blocks bots silently if populated | **PASS** |
| `TC-FORM-06` | `LeadForm` Security Sanitization | Strips potential formula injection characters (`=`, `+`, `-`, `@`) before webhook | **PASS** |
| `TC-FORM-07` | `LeadForm` Multi-Language Switching | Labels toggle cleanly across English, Hindi, and Marathi | **PASS** |
| `TC-FORM-08` | `LeadForm` LocalStorage Fallback | Inquiries stored in local browser history (`aaa_leads_history`) | **PASS** |

---

## 5. Test Suite 4: Structured Data & Canonical SEO

| Test ID | Target URL | Expected Schema / Meta | Status |
| :--- | :--- | :--- | :---: |
| `TC-SEO-01` | `/parent-guides` | Canonical: `https://arnavabacusacademy-web.vercel.app/parent-guides` | **PASS** |
| `TC-SEO-02` | `/parent-guides` | Schema: `CollectionPage` + `BreadcrumbList` | **PASS** |
| `TC-SEO-03` | `/parent-guides/abacus-vs-vedic-maths` | Breadcrumb points to `/parent-guides` (not `/blog`) | **PASS** |
| `TC-SEO-04` | `/parent-guides/does-abacus-confuse-school-math` | Breadcrumb points to `/parent-guides` | **PASS** |
| `TC-SEO-05` | `/parent-guides/why-children-use-finger-counting` | Breadcrumb points to `/parent-guides` | **PASS** |
| `TC-SEO-06` | `/parent-guides/why-smart-children-make-silly-math-mistakes` | Breadcrumb points to `/parent-guides` | **PASS** |
| `TC-SEO-07` | `/parent-guides/ideal-age-to-start-abacus` | Breadcrumb points to `/parent-guides` | **PASS** |

---

## 6. Test Suite 5: Build, Bundle & Boundary Safety

| Test ID | Command / Check | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :---: |
| `TC-BLD-01` | `npx tsc --noEmit` | Strict TypeScript compilation with 0 errors | Exit Code 0, 0 errors | **PASS** |
| `TC-BLD-02` | `npm run lint` | Linter completes cleanly | Exit Code 0 | **PASS** |
| `TC-BLD-03` | `npm run build` | Vite production compilation completes | Exit Code 0, built in 23.33s | **PASS** |
| `TC-BLD-04` | Chunk Splitting Check | `ParentGuidesHub-*.js` chunk generated separately | 16.57 kB (5.42 kB gzip) | **PASS** |
| `TC-BLD-05` | AcademyOS Route Isolation | Practice Hub (`/practice/*`) and Login (`/login`) untouched | 0 files modified in ERP/Practice routes | **PASS** |
