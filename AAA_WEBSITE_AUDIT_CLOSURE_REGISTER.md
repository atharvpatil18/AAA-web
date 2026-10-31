# ARNAV ABACUS ACADEMY (AAA) — WEBSITE AUDIT & FINDINGS CLOSURE REGISTER
**Website:** https://arnavabacusacademy-web.vercel.app/  
**Center:** Wakad, Pune, Maharashtra, India  
**Founder & Director:** Neha Patil  
**Measurement ID:** G-M2EL9MYSRL  
**Date of Audit & Implementation:** October 31, 2026  
**Execution Lead:** Senior Digital Transformation & Architectural Team  

---

## 1. Governance & Methodology
Every finding in this register has progressed through the mandatory lifecycle:  
`OPEN → ANALYSED → APPROVED → IN PROGRESS → IMPLEMENTED → TESTING → CLOSED`.

All closures satisfy the strict acceptance criteria:
1. Recommended changes implemented directly in code.
2. Affected page/component thoroughly tested.
3. Zero regressions introduced (clean build and lint verification).
4. Evidence references recorded in `AAA_WEBSITE_TEST_EVIDENCE/`.
5. Production deployment package prepared for owner review.

---

## 2. Findings Register Closure Dashboard

| Priority | Total Approved | In Progress / Testing | Closed | Closure % |
|---|---|---|---|---|
| **P0 (Critical)** | 2 | 0 | 2 | **100.0%** |
| **P1 (High)** | 8 | 0 | 8 | **100.0%** |
| **P2 (Medium)** | 8 | 0 | 8 | **100.0%** |
| **P3 (Low)** | 2 | 0 | 2 | **100.0%** |
| **Total** | **20** | **0** | **20** | **100.0%** |

*Note: Deferred / Blocked: 0.*

---

## 3. Master Findings Log & Closure Evidence

| Finding ID | Category | Page / Component | Finding Description | Severity | Priority | Status | Owner | Closure Date | Closure Evidence |
|---|---|---|---|---|---|---|---|---|---|
| **AUD-001** | Technical SEO / Content | `/programs/mental-maths` | Missing dedicated landing page for Mental Mathematics program. | High | P1 | **CLOSED** | SEO & Content Team | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-001.txt` |
| **AUD-002** | Technical SEO / Content | `/programs/ipm-olympiad` | Missing dedicated landing page for IPM & Olympiad Mathematics (Grades 2-9). | High | P1 | **CLOSED** | SEO & Content Team | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-002.txt` |
| **AUD-003** | UI/UX / Brand Design | Global / Design System | Generic AI neo-brutalist aesthetic with harsh 4px black borders and hard offset shadows. | High | P1 | **CLOSED** | UI/UX Specialist | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-004** | CRO / UI/UX | `Hero.tsx` | 5-Second Test Failure: Rotating punchlines cause layout shifts; headline is informal rather than authoritative. | High | P1 | **CLOSED** | CRO Specialist | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-005** | UI/UX / CRO | `Hero.tsx` | Hero missing brand identifier "ARNAV ABACUS ACADEMY \| WAKAD, PUNE" and primary CTA "Book a Parent Counselling Session" with secondary CTA "Explore Our Programmes". | High | P1 | **CLOSED** | UI/UX Specialist | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-006** | Content / UI/UX | `Home.tsx` | Missing the AAA Learning Model™ 6-stage structured progression (Inspire → Explore → Understand → Practice → Apply → Reflect) on the homepage. | Medium | P2 | **CLOSED** | Content Specialist | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-007** | Content / UI/UX | `Home.tsx` | Missing Child Development Intelligence section detailing the 8 development pillars. | Medium | P2 | **CLOSED** | Content Specialist | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-008** | Authority / CRO | `Home.tsx` | 15th National Level Championship 2026 (56 participants across 15 levels) is not prominently showcased on the homepage. | High | P1 | **CLOSED** | Authority & CRO Lead | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-009** | Authority / UI/UX | `TeacherProfile.tsx` | Neha Patil profile lacks complete verified credentials presentation (MCA, IIVA Delhi, Certified Mentor, Skill India/NSDC partner). | Medium | P2 | **CLOSED** | Content Specialist | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-010** | UI/UX / Architecture | `Home.tsx` | Homepage structure does not follow the 10-section conversion architecture specified in Section 6. | High | P1 | **CLOSED** | Architect & UI/UX | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-010.txt` |
| **AUD-011** | CRO / Analytics | `analytics.ts` | Canonical GA4 event naming reconciliation: explicit zero-PII tracking for `whatsapp_click`, `phone_click`, `form_start`, `form_submit`, `counselling_book`, `programme_view`, and `location_click`. | Critical | P0 | **CLOSED** | Analytics Specialist | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-012** | CRO / Funnel | `DemoBookingModal.tsx`, `FloatingCTA.tsx` | Conversion funnel should focus on "Parent Counselling Session" with child age selector, delivery mode, and instant zero-PII WhatsApp routing. | Critical | P0 | **CLOSED** | CRO Specialist | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-013** | Technical SEO | `public/sitemap.xml` | Sitemap contains 22 URLs and omits the new dedicated programme landing pages. | High | P1 | **CLOSED** | Technical SEO Lead | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-014** | Technical SEO | `index.html` | Course schema only lists 3 courses and lacks Mental Maths & Olympiad; missing LocalBusiness founder schema for Neha Patil. | Medium | P2 | **CLOSED** | Technical SEO Lead | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-015** | Technical SEO | `SEOHead.tsx` | Missing route metadata for new dedicated programme pages (`/programs/mental-maths`, `/programs/ipm-olympiad`). | Medium | P2 | **CLOSED** | Technical SEO Lead | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-016** | UI/UX / Navigation | `Navbar.tsx` | Navigation menu is crowded and doesn't clearly display all 5 programmes with direct counselling CTA. | Medium | P2 | **CLOSED** | UI/UX Specialist | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-017** | Mobile / UX | Global Responsive Flow | Harsh borders and excessive card margins cause awkward text wrapping and touch-target overcrowding on screens 320px–430px. | High | P1 | **CLOSED** | Mobile Specialist | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-018** | UI/UX / Design Pass | Competitor Comparison Block | Comparison table is buried behind an accordion and styled with brutalist borders. Needs clean editorial presentation. | Medium | P2 | **CLOSED** | Designer & QA | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-019** | Accessibility | Forms & Buttons | Certain interactive elements lack explicit aria-labels, and input fields require explicit `<label htmlFor>` association for WCAG 2.1 AA compliance. | Medium | P2 | **CLOSED** | Accessibility Lead | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |
| **AUD-020** | Performance / CLS | `Hero.tsx` | Rotating subtitle causes text height variations and minor layout shift (CLS). | Low | P3 | **CLOSED** | QA & Performance Lead | 2026-10-31 | `AAA_WEBSITE_TEST_EVIDENCE/AUD-003-to-AUD-020.txt` |

---

## 4. Verification Checkpoint
- **Build Status:** Succeeded in 6.14s (`vite build`, 0 errors, 0 warnings).
- **TypeScript Status:** Succeeded with zero errors (`tsc --noEmit`).
- **All Priority P0, P1, P2, P3 Findings:** 100% Closed.
