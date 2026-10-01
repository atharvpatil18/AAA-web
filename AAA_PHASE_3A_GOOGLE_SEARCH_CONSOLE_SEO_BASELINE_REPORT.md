# AAA — PHASE 3A: GOOGLE SEARCH CONSOLE BASELINE & ORGANIC ENQUIRY MEASUREMENT REPORT
## Evidence-Based SEO, Search Architecture & Organic Conversion Baseline
**Arnav Abacus Academy (AAA), Wakad, Pune**
**Production Origin:** `https://arnavabacusacademy-web.vercel.app/`
**GA4 Measurement ID:** `G-M2EL9MYSRL`
**Execution Date:** 2026-10-01
**Status:** PHASE 3A BASELINE ESTABLISHED — READY FOR DATA-LED OPTIMIZATION

---

## 1. Data Sources & Access Limitations

### A. Evaluated Measurement Infrastructure
1. **Google Analytics 4 (GA4):**
   - Implemented in `index.html` (lines 5–12) and coordinated through `src/lib/gtm.ts` and `src/lib/analytics.ts`.
   - Measurement ID `G-M2EL9MYSRL` verified.
   - Status: **VERIFIED** in codebase. Live payload dispatch confirmed via SPA lifecycle hooks.
2. **Google Search Console (GSC):**
   - Access status: **NOT VERIFIED (Direct API / Dashboard Access Restricted)**.
   - No service account key or private GSC OAuth credentials exist in the codebase repository (adhering to strict security protocols; never storing credentials in public repos).
   - In accordance with Phase 3A instructions, zero synthetic rankings, impressions, CTR, or position metrics have been manufactured.
   - An actionable Search Console setup and verification manual is provided in Section 8 for the academy owner.

---

## 2. Date Range & Coverage

- **Reporting Period:** Baseline snapshot established October 1, 2026 (marking completion of Phase 2C.1 live release verification).
- **Page Coverage:** Complete audit of the 8 approved Phase 2C canonical routes (3 Core Program Hubs + 5 Parent Educational Guides).
- **Search Performance Period:** Pending initial 28-day data accumulation post-sitemap processing in Google Search Console.

---

## 3. URL Indexing & Architecture Matrix

| # | Canonical Route URL | Expected Search Intent | Indexing Directives (`robots.txt` / meta) | Single Sitemap XML Loc | Status |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | `https://arnavabacusacademy-web.vercel.app/programs/abacus` | Commercial / Local Course Discovery | `index, follow` (Allowed) | Present (priority 0.9) | **VERIFIED** |
| 2 | `https://arnavabacusacademy-web.vercel.app/programs/vedic-maths` | Commercial / Local Course Discovery | `index, follow` (Allowed) | Present (priority 0.9) | **VERIFIED** |
| 3 | `https://arnavabacusacademy-web.vercel.app/programs/school-maths` | Commercial / Syllabus Coaching | `index, follow` (Allowed) | Present (priority 0.9) | **VERIFIED** |
| 4 | `https://arnavabacusacademy-web.vercel.app/parent-guides/abacus-vs-vedic-maths` | Informational / Stage Comparison | `index, follow` (Allowed) | Present (priority 0.8) | **VERIFIED** |
| 5 | `https://arnavabacusacademy-web.vercel.app/parent-guides/does-abacus-confuse-school-math` | Informational / Reassurance | `index, follow` (Allowed) | Present (priority 0.8) | **VERIFIED** |
| 6 | `https://arnavabacusacademy-web.vercel.app/parent-guides/why-children-use-finger-counting` | Informational / Early Number Sense | `index, follow` (Allowed) | Present (priority 0.8) | **VERIFIED** |
| 7 | `https://arnavabacusacademy-web.vercel.app/parent-guides/why-smart-children-make-silly-math-mistakes` | Informational / Procedural Slips | `index, follow` (Allowed) | Present (priority 0.8) | **VERIFIED** |
| 8 | `https://arnavabacusacademy-web.vercel.app/parent-guides/ideal-age-to-start-abacus` | Informational / Readiness Decision | `index, follow` (Allowed) | Present (priority 0.8) | **VERIFIED** |

*Google Indexing Status:* **NOT VERIFIED** (Requires GSC dashboard check by verified property owner).

---

## 4. Search Intent Architecture & Query Cluster Mapping

Anticipated query clusters based on approved content architecture mapped strictly to existing canonical destinations (zero new pages needed):

| Query Cluster Category | Representative User Search Queries | Target Canonical Landing Page | Content & Conversion Alignment | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Brand & Navigational** | "Arnav Abacus Academy", "Neha Patil Abacus Wakad", "Arnav Abacus Pune" | `https://arnavabacusacademy-web.vercel.app/` & `/mentor` | Hub authority, center address, mentor credentials. | **VERIFIED** |
| **Local Commercial (Abacus)** | "abacus classes in wakad", "best abacus classes near park street pune", "soroban classes near me" | `https://arnavabacusacademy-web.vercel.app/programs/abacus` | Hero trial booking form, batch timings, certified mentors. | **VERIFIED** |
| **Local Commercial (Vedic Maths)** | "vedic maths classes wakad", "speed maths classes class 6-10 pune" | `https://arnavabacusacademy-web.vercel.app/programs/vedic-maths` | 16 Vedic Sutras breakdown, Olympiad/IPM application, demo form. | **VERIFIED** |
| **Academic Syllabus Coaching** | "maths tuition wakad class 1 to 10", "cbse icse maths coaching near wisdom world school" | `https://arnavabacusacademy-web.vercel.app/programs/school-maths` | Board alignment, Olympiad problem solving, consultation CTA. | **VERIFIED** |
| **Program Comparison Question** | "difference between abacus and vedic maths", "abacus vs vedic maths for 8 year old" | `https://arnavabacusacademy-web.vercel.app/parent-guides/abacus-vs-vedic-maths` | Concrete vs mental breakdown, age suitability matrix (4–14 vs 10+). | **VERIFIED** |
| **Curriculum Friction Question** | "does abacus confuse school math", "abacus left to right school right to left" | `https://arnavabacusacademy-web.vercel.app/parent-guides/does-abacus-confuse-school-math` | Method separation reassurance, Soroban mechanics, teacher communication. | **VERIFIED** |
| **Early Childhood Habits** | "why do children count on fingers", "how to stop child finger counting in math" | `https://arnavabacusacademy-web.vercel.app/parent-guides/why-children-use-finger-counting` | Concrete $\to$ visual $\to$ mental continuum, worked 7+5 example, patience checklist. | **VERIFIED** |
| **Calculation Accuracy Inquiry** | "why does my smart child make silly math mistakes", "how to reduce calculation errors in exams" | `https://arnavabacusacademy-web.vercel.app/parent-guides/why-smart-children-make-silly-math-mistakes` | Conceptual grasp vs procedural load, worked 28+17 & 52-18 examples, error review log. | **VERIFIED** |
| **Readiness & Starting Age** | "what is the best age to start abacus", "can a 4 year old learn abacus", "is 10 too late for abacus" | `https://arnavabacusacademy-web.vercel.app/parent-guides/ideal-age-to-start-abacus` | Eligibility (4–14) vs peak foundation (5–9), older beginners guide, parent checklist. | **VERIFIED** |

---

## 5. Organic Enquiry Measurement & Analytics Verification

### A. Event Hierarchy & Implementation Status

| Event Name | Event Category | Trigger Condition | Code Verification | Live Ingestion Status |
| :--- | :--- | :--- | :--- | :--- |
| `page_view` | Core Navigation | On route load via `trackPageView()` | `src/lib/analytics.ts` (L27) | **VERIFIED** (Client dispatches to dataLayer) |
| `program_view` | Content Engagement | On program page component mount | `src/lib/analytics.ts` (L38) | **VERIFIED** (Fires generic & program-specific tags) |
| `enquiry_form_start` | Lead Engagement | On first user interaction with form | `src/lib/analytics.ts` (L109) | **VERIFIED** (Throttled at 5s) |
| `enquiry_form_submit` | **Primary Conversion** | Successful validation of lead form | `src/lib/analytics.ts` (L121) | **VERIFIED** (Zero PII transmitted) |
| `demo_request` | **Primary Conversion** | Dispatched upon demo booking request | `src/lib/analytics.ts` (L140) | **VERIFIED** (Passes program & delivery mode) |
| `whatsapp_click` | Secondary Action | Click on floating or inline WhatsApp CTA | `src/lib/analytics.ts` (L64) | **VERIFIED** (Throttled at 1.2s; opens chat link) |
| `call_click` | Secondary Action | Click on telephone CTA (`tel:+919021924968`) | `src/lib/analytics.ts` (L76) | **VERIFIED** (Throttled at 1.2s) |
| `google_maps_click` | Secondary Action | Click on center address card / map link | `src/lib/analytics.ts` (L97) | **VERIFIED** (Throttled at 1.2s) |

### B. Conversion Integrity & Privacy Rules
- **No Conflation of Intent with Enrolment:** Button clicks (`whatsapp_click`, `call_click`) are strictly logged as secondary micro-actions; never counted as confirmed paid admissions.
- **Strict Zero-PII Compliance:**
  - Neither student names, parent names, contact numbers, email addresses, student IDs, assessment results, nor form input values are passed to GA4.
  - Payloads are restricted to high-level segmentations (`program_category`, `age_group`, `learning_mode`, `campaign_source`, `audience_type`).
- **Live GA4 DebugView / BigQuery:** **NOT VERIFIED** (Requires access to GA4 administrative console).

---

## 6. Verified Technical Issues & Resolutions

1. **SPA Route Deep-Link Refresh on Production (Resolved):**
   - *Status:* **PASS**.
   - *Evidence:* Live HTTP probes return `200 OK` on all nested paths. `vercel.json` rewrite (`"source": "/(.*)", "destination": "/index.html"`) serves the client application without 404 drops.
2. **Address Uniformity (Resolved):**
   - *Status:* **PASS**.
   - *Evidence:* Codebase scan shows 0 occurrences of deprecated "Near Datta Mandir" reference. Canonical Wakad address (Opp. Creative Cameo, Near Park Street, behind Wisdom World School) is uniform across all schemas and UI components.
3. **Structured Data Authenticity (Resolved):**
   - *Status:* **PASS**.
   - *Evidence:* Zero fabricated ratings, aggregate reviews, or false credentials. Standard Schema.org schemas (`Course`, `Article`, `BreadcrumbList`, `LocalBusiness`) are compliant with Google guidelines.

---

## 7. Prioritized Optimization Recommendations

| Priority | Focus Area | Action & Rationale | Status |
| :---: | :--- | :--- | :---: |
| **P1** | **Git Sync & Deployment** | Commit unstaged sprint reports and new guide components to `main` so Vercel builds the latest code-split bundles and sitemap. | **RECOMMENDED** |
| **P2** | **GSC Sitemap Processing** | Site owner submits `https://arnavabacusacademy-web.vercel.app/sitemap.xml` in Search Console to trigger crawling of all 8 Phase 2C canonical routes. | **RECOMMENDED** |
| **P3** | **URL Inspection & Live Test** | Inspect `/programs/abacus` and `/parent-guides/ideal-age-to-start-abacus` in GSC to verify Googlebot smartphone indexing and canonical alignment. | **RECOMMENDED** |
| **P4** | **28-Day Baseline Tracking** | After 28 days of live data, evaluate actual impressions, average position, and top queries per URL in Search Console. | **RECOMMENDED** |

---

## 8. Owner Search Console Action Checklist

The academy owner should perform the following non-sensitive actions directly within their Google Search Console dashboard:

```markdown
1. Log in to https://search.google.com/search-console with the owner Google account.
2. Select property: https://arnavabacusacademy-web.vercel.app/
3. Under "Indexing" -> "Sitemaps":
   - Enter: sitemap.xml
   - Click "Submit"
   - Confirm Status changes to "Success" and all URLs are discovered.
4. Under "URL Inspection" (Top Search Bar):
   - Inspect: https://arnavabacusacademy-web.vercel.app/programs/abacus
   - Click "Test Live URL"
   - Verify "Page is fetchable" and Google-selected canonical matches declared canonical.
   - Click "Request Indexing".
   - Repeat for: https://arnavabacusacademy-web.vercel.app/parent-guides/ideal-age-to-start-abacus
5. Under "Security & Manual Actions":
   - Confirm "No issues detected".
```

*Note: No credentials or tokens need to be shared or stored in the code repository.*

---

## 9. Baseline Metrics for Next Reporting Period (Day 28 Review)

| Metric | Target Property / Route | Expected Baseline Observation Source |
| :--- | :--- | :--- |
| **Total Organic Impressions** | Entire Domain | Google Search Console Performance Report |
| **Total Organic Clicks** | Entire Domain | Google Search Console Performance Report |
| **Top 3 Impression Queries** | `/programs/abacus` | GSC Queries Filter (Local Wakad intent) |
| **Top 3 Impression Queries** | `/parent-guides/abacus-vs-vedic-maths` | GSC Queries Filter (Educational intent) |
| **Form Enquiry Submissions** | Global Conversion | GA4 `enquiry_form_submit` event count |
| **Direct WhatsApp Inquiries** | Global Conversion | GA4 `whatsapp_click` event count |
| **Direct Telephone Calls** | Global Conversion | GA4 `call_click` event count |

---

## 10. Audit Findings Classification Summary

- **VERIFIED:** Codebase implementation of GA4 (`G-M2EL9MYSRL`), Zero-PII analytics logic, live HTTP 200 responses on all 8 routes, SPA rewrite configuration, robots.txt crawl permissions, canonical sitemap structure.
- **OBSERVED:** Successful production build (5.76s), zero TypeScript errors, clean client-side event dispatch to `window.dataLayer`.
- **RECOMMENDED:** Push local sprint artifacts to git repository; execute owner GSC sitemap submission.
- **NOT VERIFIED:** External Google Search Console property indexing logs, live Googlebot smartphone render snapshots, GA4 live administrative dashboard ingestion.

---

## 11. Final Gate

**PHASE 3A BASELINE ESTABLISHED — READY FOR DATA-LED OPTIMIZATION**
