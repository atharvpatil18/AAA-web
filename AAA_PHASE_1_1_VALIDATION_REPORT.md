# AAA WEBSITE — PHASE 1.1 VALIDATION & HARDENING REPORT™

**Date**: October 1, 2026  
**Subject**: Technical SEO, Routing Architecture, GA4 Event Taxonomy & PII Validation  
**Deployment Evaluated**: `https://arnavabacusacademy-web.vercel.app/`  
**Prior Historical Reference**: `https://arnavabacus.com`  

---

## 1. Executive Summary
This Phase 1.1 validation rigorously examines every facet of the foundation implemented in Phase 1 before building the **AAA Parent Search Intelligence System**.

Key findings:
1. **Routing Architecture**: The application uses React Router’s `HashRouter` (`/#/...`), while the Vercel edge configuration has wildcard rewrites to `/index.html`. A clean URL like `/programs` requests `/index.html` from the server, but because the client router expects hash fragments (`/#/programs`), entering a path without a hash defaults to rendering the homepage (`/`).
2. **Canonical Domain Status**: There are conflicting references between the live deployment (`arnavabacusacademy-web.vercel.app`) and the legacy domain (`arnavabacus.com`). Submitting the sitemap to Google Search Console is deferred pending owner confirmation.
3. **GA4 Tracking & PII**: All events follow strict canonical snake_case naming, zero PII enters the `dataLayer`, and click handlers are debounced. Audience segmentation (`audience_type: "parent" | "teacher" | "franchise"`) has been hardened to prevent non-parent inquiries from polluting the admission funnel.
4. **Overall Status**: **PHASE 2 NOT READY** (gated on routing consolidation and canonical domain confirmation).

---

## 2. Routing Validation (HashRouter vs. Clean URLs)

### Direct URL Inspection Matrix
Testing behavior when navigating directly to clean paths vs. hash paths in a fresh browser context:

| URL Tested | Expected Page Component | Direct Load Behavior | Page Refresh Behavior | Document Title Rendered | Meta Description Rendered | Canonical URL Injected | Result |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `https://arnavabacusacademy-web.vercel.app/` | `Home` | Loads Homepage | Stays on Homepage | Arnav Abacus Academy \| Abacus & Vedic Maths Classes in Wakad, Pune | Top-rated mental arithmetic... | `https://arnavabacusacademy-web.vercel.app/#/` | **PASS** |
| `https://arnavabacusacademy-web.vercel.app/#/programs` | `Programs` | Loads Programs page | Stays on Programs page | Abacus, Vedic Maths & School Math Programs \| Arnav Abacus Academy Pune | Explore specialized child brain... | `https://arnavabacusacademy-web.vercel.app/#/programs` | **PASS** |
| `https://arnavabacusacademy-web.vercel.app/programs` (Clean) | `Programs` | Returns `index.html`, but client router reads empty hash `""` and renders `Home` | Renders `Home` (No 404, but wrong page) | Falls back to Home title | Falls back to Home description | Falls back to Home canonical | **FAIL (Routing Mismatch)** |
| `https://arnavabacusacademy-web.vercel.app/#/mentor` | `Mentor` | Loads Mentor page | Stays on Mentor page | Meet Neha Patil \| Certified Master Abacus & Vedic Maths Mentor Wakad | Learn about Neha Patil... | `https://arnavabacusacademy-web.vercel.app/#/mentor` | **PASS** |
| `https://arnavabacusacademy-web.vercel.app/mentor` (Clean) | `Mentor` | Returns `index.html`, renders `Home` | Renders `Home` | Falls back to Home title | Falls back to Home description | Falls back to Home canonical | **FAIL (Routing Mismatch)** |
| `https://arnavabacusacademy-web.vercel.app/#/contact` | `Contact` | Loads Contact page | Stays on Contact page | Contact Arnav Abacus Academy \| Wakad Center, Phone & Location Pune | Get in touch with Arnav Abacus... | `https://arnavabacusacademy-web.vercel.app/#/contact` | **PASS** |
| `https://arnavabacusacademy-web.vercel.app/contact` (Clean) | `Contact` | Returns `index.html`, renders `Home` | Renders `Home` | Falls back to Home title | Falls back to Home description | Falls back to Home canonical | **FAIL (Routing Mismatch)** |
| `https://arnavabacusacademy-web.vercel.app/#/showcase` | `Showcase` | Loads Showcase page | Stays on Showcase page | Student Results, Hall of Fame & State Champions \| Arnav Abacus Academy | Celebrate student milestones... | `https://arnavabacusacademy-web.vercel.app/#/showcase` | **PASS** |
| `https://arnavabacusacademy-web.vercel.app/#/worksheets` | `WorksheetVault`| Loads Worksheets page | Stays on Worksheets page | Free Abacus & Vedic Maths Practice Worksheets \| Arnav Abacus Academy | Download free printable... | `https://arnavabacusacademy-web.vercel.app/#/worksheets` | **PASS** |
| `https://arnavabacusacademy-web.vercel.app/#/faqs` | `Faqs` | Loads FAQs page | Stays on FAQs page | Frequently Asked Questions \| Arnav Abacus Academy Wakad, Pune | Answers to parent questions... | `https://arnavabacusacademy-web.vercel.app/#/faqs` | **PASS** |
| `https://arnavabacusacademy-web.vercel.app/#/teacher-franchise` | `TeacherFranchise` | Loads Teacher Franchise | Stays on Teacher Franchise | Abacus Teacher Training & Academy Franchise \| Arnav Abacus Academy Pune | Start your own education... | `https://arnavabacusacademy-web.vercel.app/#/teacher-franchise` | **PASS** |

### Root Cause Analysis & Architecture Recommendation
- **Current State**: `src/App.tsx` imports and wraps the app with `HashRouter as Router`.  
- **Impact on Search Engines**: Googlebot can crawl and index hash fragments to some extent, but Google's official SEO guidelines strongly recommend standard clean URLs (`BrowserRouter` with HTML5 History API: `/programs`, `/contact`) for indexable web pages.
- **Prerequisite for BrowserRouter**: Because `vercel.json` already has:
  ```json
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  ```
  Switching from `HashRouter` to `BrowserRouter` is fully supported by the hosting platform without 404s, but must be scheduled and verified intentionally to ensure no links break.

---

## 3. Canonical Production Domain Analysis

### Codebase Domain Audit
The repository was scanned across all source and public files. References were found in:

| File Location | Current Domain Reference | Exact Line & Purpose | Recommendation |
| :--- | :--- | :--- | :--- |
| `index.html` | `arnavabacusacademy-web.vercel.app` | Lines 39, 42, 43, 57, 59, 61 (`@id`, `url`, `logo` in JSON-LD) | Keep aligned with current live host until custom domain is DNS-active. |
| `public/robots.txt` | Both (`vercel.app` & `arnavabacus.com`) | Lines 9-10 (Sitemap declarations) | Remove legacy domain once primary domain is confirmed. |
| `public/sitemap.xml` | `arnavabacusacademy-web.vercel.app` | All `<loc>` entries | Keep unified with verified canonical domain. |
| `src/components/SEOHead.tsx`| `arnavabacusacademy-web.vercel.app` | Line 20: `const SITE_ORIGIN = ...` | Central constant controlling canonical tags. |
| `src/lib/brochure.ts` | `arnavabacus.com` | Line 540 (Footer text in generated PDF) | Keep for printed materials if owner owns domain; update to full URL if custom domain changes. |
| `src/lib/certificateGenerator.ts` | `www.arnavabacus.com` | Line 258 (Footer text on student certificates) | Preserved for student offline certificate branding. |
| `src/lib/accessControl.ts` | `admin@arnavabacus.com` | Lines 13, 333 (Authorized admin email list) | Internal authentication credential; leave unchanged. |
| `src/pages/PracticeSession.tsx` | `guest_visitor@arnavabacus.com`| Line 37 (Fallback email identifier for guest quiz) | Internal mock identifier; leave unchanged. |

> [!WARNING]
> **Owner Decision Required**: If `arnavabacus.com` is an active domain owned by the academy, DNS records (A/CNAME) should be pointed to Vercel, making `https://arnavabacus.com/` the single canonical origin. Until DNS is mapped and verified, Google Search Console submission should be held.

---

## 4. Sitemap Validation

- **File Path**: [`public/sitemap.xml`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/public/sitemap.xml)
- **Total URLs Declared**: 14
- **Valid Public URLs**: 14
- **Duplicate URLs**: 0
- **Private / Authenticated Routes Excluded**: 
  - `/practice` (Excluded from public sitemap)
  - `/practice/session` (Excluded from public sitemap)
  - `/practice/results` (Excluded from public sitemap)
  - `/login` (Excluded from public sitemap)
- **Status**: Valid. Currently references hash routes (`/#/...`) to reflect the active `HashRouter`. When `BrowserRouter` is adopted, these will cleanly transition to `/programs`, `/contact`, etc.

---

## 5. Robots.txt Validation

- **File Path**: [`public/robots.txt`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/public/robots.txt)
- **Crawl Permissions**:
  - `Allow: /`
  - Explicitly protects student data and authenticated sessions:
    - `Disallow: /#/practice/session`
    - `Disallow: /#/practice/results`
    - `Disallow: /#/login`
  - When clean routing is implemented, mirror disallows for `/practice/session`, `/practice/results`, and `/login`.
- **Sitemap Declaration**: Points to `https://arnavabacusacademy-web.vercel.app/sitemap.xml`.
- **Status**: **PASS**. No public marketing pages are blocked.

---

## 6. GA4 Runtime Event Validation

Testing the unified measurement library (`src/lib/analytics.ts` and `src/lib/gtm.ts`):

| Test Flow / User Action | Events Triggered | Expected Count | Anti-Duplication Debounce | Status |
| :--- | :--- | :--- | :--- | :--- |
| **A. Initial Homepage Load** | `page_view` | Exactly 1 | N/A (Route listener) | **PASS** |
| **B. Navigate to Programs** | `page_view` | Exactly 1 | Debounced route listener | **PASS** |
| **B2. Expand Abacus Card** | `program_view`, `abacus_program_view` | Exactly 1 each | State toggle guarded | **PASS** |
| **C. Navigate to Contact** | `page_view`, `contact_page_view` | Exactly 1 each | Mount effect | **PASS** |
| **D. WhatsApp Button Click** | `whatsapp_click` | Exactly 1 | 1200ms throttle cache | **PASS** |
| **E. Phone Call Link Click** | `call_click` | Exactly 1 | 1200ms throttle cache | **PASS** |
| **F. Enquiry Form Focus** | `enquiry_form_start` | Exactly 1 | 5000ms throttle cache | **PASS** |
| **G. Lead Form Submission** | `enquiry_form_submit` | Exactly 1 | Form submit handler | **PASS** |
| **H. Demo Booking Intent** | `demo_request` | Exactly 1 | 1500ms throttle cache | **PASS** |
| **I. Navigate to Showcase** | `page_view`, `results_page_view` | Exactly 1 each | Mount effect | **PASS** |
| **J. View Testimonials** | `testimonials_view` | Exactly 1 | Mount effect | **PASS** |

---

## 7. GA4 PII Validation

Every analytics payload was audited against the zero-PII specification.

### Data Passed to Analytics
- `program_category` (e.g., `"Abacus"`, `"Vedic Maths"`)
- `age_group` (e.g., `"4-6"`, `"7-9"`, `"Adult / Professional"`)
- `learning_mode` (`"offline"` or `"online"`)
- `campaign_source` (e.g., `"math-phobia"`, `"LeadForm"`)
- `audience_type` (`"parent"`, `"teacher"`, or `"franchise"`)
- `click_source` (e.g., `"floating_whatsapp_bubble"`, `"navbar_header"`)

### Verified Absent from Analytics Payloads
- Parent Name: **NEVER PASSED** (verified in `LeadForm.tsx` & `analytics.ts`)
- Student Name: **NEVER PASSED** (verified)
- Phone Number: **NEVER PASSED** (verified)
- Email Address: **NEVER PASSED** (verified)
- Child Psychological/Checklist Notes: **NEVER PASSED** (verified)
- **Status**: **PASS (100% PII-Free & Child-Safe)**.

---

## 8. Event Taxonomy & Audience Separation

In Phase 1, teacher and franchise inquiries risked mixing into parent admission counts.  
**Hardened Implementation**:
- Added `audienceType` parameter to `trackEnquiryFormSubmit`:
  - Parent Demo Form ([`LeadForm.tsx`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/components/LeadForm.tsx)): sends `audience_type: "parent"`.
  - Teacher Inquiry ([`TeacherFranchise.tsx`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/pages/TeacherFranchise.tsx)): sends `audience_type: "teacher"`.
  - Franchise Center Inquiry ([`TeacherFranchise.tsx`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/pages/TeacherFranchise.tsx)): sends `audience_type: "franchise"`.
- This allows GA4 custom definitions or BigQuery exports to isolate **Parent Inquiries** from B2B Franchise leads with zero cross-contamination.

---

## 9. SEO Claim Validation

Every promotional and factual claim in metadata and headings was audited against visible, verifiable content:

| Claim Inspected | Appears In | Evidence in Codebase / Real World | Appropriate for Meta? | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **"10X calculation speed"** | Homepage Title / Meta | Appears throughout site as educational aspirational speed benchmark for Abacus/Vedic math. | **Borderline**: Could be interpreted as an absolute guarantee by strict regulators. | Recommend soft, defensible phrasing in metadata: *"Mental arithmetic speed & accuracy"* or *"Up to 10X mental calculation agility"*. |
| **"photographic memory"** | Meta description | Appears in Abacus curriculum descriptions (visualizing soroban bead configurations). | **Acceptable as cognitive concept**, but avoid claiming guaranteed photographic recall. | Neutralize to: *"visual math memory & concentration"*. |
| **"200+ students"** | TrustBar, Mentor bio | Explicitly stated in `TeacherProfile.tsx` and `TrustBar.tsx` as cumulative students trained over 3–4 years. | **Factual & Defensible** based on founder records. | Approved. |
| **"international students"** | Mentor bio, TrustBar | Explicitly supported by UK/Dubai/US testimonials (`t9Author`, `t15Author`) and online international batch options. | **Factual & Verifiable**. | Approved. |
| **"NEP 2020 aligned"** | Curriculum cards, Brochure | Specifically mapped to NEP 2020 Foundational & Preparatory stages (experiential, hands-on learning). | **Factual**. | Approved. |
| **"Master Trainer"** | Mentor page | IIVA Master Trainer Certificate awarded to Neha Patil. | **Factual**. | Approved. |
| **"3+ years experience"** | Mentor page, TrustBar | TrustBar lists "4+ Years Exp", Mentor bio lists "3+ years direct mentoring". | **Factual**. Standardize to "3+ years" for consistency. | Approved. |

---

## 10. Structured Data Validation

The JSON-LD schemas in `index.html` and `src/pages/Faqs.tsx` were inspected against visible website content:

| Schema Property | Configured Value in Code | Visible Website Verification | Match Result |
| :--- | :--- | :--- | :--- |
| **Organization Name** | Arnav Abacus Academy & Vedic Maths Classes | Visible in Navbar and Footer | **PASS** |
| **Telephone** | `+91-9021924968` | Matches phone link across all pages | **PASS** |
| **Email** | `nehaatharv@gmail.com` | Matches email links in Top Bar, Contact page, Footer | **PASS** |
| **Street Address** | Near Datta Mandir, Wakad, Pune 411057 | Matches Contact page and Google Maps coordinates | **PASS** |
| **Geo Coordinates** | Lat: `18.5975866`, Long: `73.7810869` | Matches Google Maps iframe source in Contact page | **PASS** |
| **Opening Hours** | Mon–Sat 09:00 to 19:30 | Matches working schedule in Header and Contact page | **PASS** |
| **FAQPage Schema** | 11 authentic Q&As in `Faqs.tsx` | All 11 questions exist in the rendered visible accordion | **PASS (Zero fabricated questions)** |

---

## 11. Complete Indexability Model

| Indexability Tier | Route / Path | Technical Directive | Reason |
| :--- | :--- | :--- | :--- |
| **Tier 1: High Priority Indexable** | `/#/` (Home) | `index, follow` | Core academy landing page and local trust hub. |
| **Tier 1: High Priority Indexable** | `/#/programs` | `index, follow` | Course directory (Abacus, Vedic Maths, School Maths). |
| **Tier 1: High Priority Indexable** | `/#/contact` | `index, follow` | Physical Wakad center, admissions, phone, maps. |
| **Tier 1: High Priority Indexable** | `/#/mentor` | `index, follow` | Founder credentials (E-E-A-T). |
| **Tier 1: High Priority Indexable** | `/#/showcase` | `index, follow` | Student results, state champions, competition proof. |
| **Tier 2: Content Indexable** | `/#/worksheets` | `index, follow` | Free downloadable practice worksheets. |
| **Tier 2: Content Indexable** | `/#/faqs` | `index, follow` | Verified parent Q&As with schema. |
| **Tier 2: Content Indexable** | `/#/blog`, `/#/blog/:slug` | `index, follow` | Educational articles on child brain development. |
| **Tier 2: Content Indexable** | `/#/news` | `index, follow` | Competition dates and academy announcements. |
| **Tier 2: Content Indexable** | `/#/teacher-franchise` | `index, follow` | Educator certification and center franchise inquiries. |
| **Tier 3: Targeted Campaigns** | `/#/campaigns/:slug` | `index, follow` | Intent landing pages (`math-phobia`, `competitive-exam`). |
| **Tier 4: Private / Non-Indexable** | `/#/login` | `noindex, nofollow` | Student and parent Google OAuth portal. |
| **Tier 4: Private / Non-Indexable** | `/#/practice` | `noindex, nofollow` | Protected student practice question banks. |
| **Tier 4: Private / Non-Indexable** | `/#/practice/session` | `noindex, nofollow` | Active timed practice sessions. |
| **Tier 4: Private / Non-Indexable** | `/#/practice/results` | `noindex, nofollow` | Private student scorecards and certificates. |

---

## 12. Performance & Technical Sanity Review

| Category | Finding | Impact | Severity |
| :--- | :--- | :--- | :--- |
| **Routing Mode** | App relies on `HashRouter`, preventing standard clean URL crawling for Search Console. | High | **Critical** (Prior to SEO launch) |
| **Canonical Domain** | Ambiguity between `arnavabacusacademy-web.vercel.app` and `arnavabacus.com`. | High | **High** |
| **Bundle Size** | `dist/assets/index-Dbmj322R.js` is 631 kB (minified). Includes heavy PDF/motion libraries in root chunk. | Medium | **Medium** |
| **Image Optimization** | Several JPEG/PNG assets exist alongside modern WebP versions in `/public`. | Low | **Low** |
| **Render-blocking Scripts** | None. Scripts in `index.html` are `async` (`googletagmanager`) or `type="module"`. | Positive | **Resolved** |

---

## 13. Critical Issues
1. **Hash URL Dependency**: `HashRouter` creates a discrepancy between clean sitemap URLs and browser routing. Clean URLs like `/programs` currently load `index.html` and default to the homepage.
2. **Custom Domain Status**: Until the custom domain `arnavabacus.com` is configured in Vercel with active DNS, Search Console indexing must not be initiated.

---

## 14. Recommended Fixes
1. **Switch to `BrowserRouter`**: Replace `HashRouter` with `BrowserRouter` in `src/App.tsx`. Because `vercel.json` already has wildcard SPA rewrites, clean URLs (`/programs`, `/contact`) will load directly and survive browser reloads.
2. **Domain Confirmation**: Confirm whether `arnavabacus.com` or `arnavabacusacademy-web.vercel.app` is the permanent production domain.
3. **Chunk Splitting**: Defer `jspdf` and `qrcode` imports using dynamic `import()` so initial bundle size drops below 250 kB.

---

## 15. Items Requiring Owner Decision
1. **Custom Domain Verification**: Does the owner control `arnavabacus.com` and want it mapped to this Vercel project?
2. **Clean URL Migration Approval**: Approve transitioning from `HashRouter` (`/#/`) to `BrowserRouter` (`/`).
3. **Guaranteed Claim Adjustment**: Approve softening "10X calculation speed" in meta descriptions to "up to 10X mental calculation agility" for regulatory compliance.

---

## 16. Phase 2 Readiness Status

### **PHASE 2 NOT READY**

**Rationale**: Phase 2 (Parent Search Intelligence System & Keyword Content Expansion) relies directly on clean canonical indexing and verified Search Console integration. Proceeding to Phase 2 before resolving the `HashRouter` vs. `BrowserRouter` mismatch and confirming the primary production domain would result in duplicate indexing, broken clean URL refreshes, and misattributed search signals.
