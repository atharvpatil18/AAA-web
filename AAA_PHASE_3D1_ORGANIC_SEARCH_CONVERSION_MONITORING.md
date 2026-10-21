# AAA PHASE 3D.1 — EVIDENCE-BASED ORGANIC SEARCH & CONVERSION MONITORING REPORT

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Production URL:** `https://arnavabacusacademy-web.vercel.app/`  
**Production Commit:** `74309d5` (Live on Vercel Edge `bom1`)  
**Canonical GA4 Measurement ID:** `G-M2EL9MYSRL`  
**Date of Audit & Evidence Review:** October 3, 2026 (15:35 IST)  
**Auditor:** Lead Technical & SEO Engineer (Antigravity AI)  
**Budget Consumed:** ₹0 / $0.00 (Strict zero-cost audit)  
**Previous Baseline Reference:** `AAA_PHASE_3D0_ORGANIC_GROWTH_CONVERSION_BASELINE.md`

---

## 1. Executive Summary

Phase 3D.1 executes the first empirical evidence-monitoring check following the establishment of the Phase 3D.0 baseline. The objective is to monitor search crawler ingestion, organic search impressions, GA4 standard report event arrival, and real-world parent conversion journeys without modifying code, altering tags, or deploying changes.

### Key Highlights
1. **Zero-Code & Zero-Deployment Compliance:** Strict monitoring mode. No application files, Vite configurations, analytics hooks, or deployment pipelines were touched.
2. **Search Console Reality:** GSC sitemap status remains verified at **"Success"** with **22 discovered URLs**. The Page Indexing report remains in Google's natural **"Processing data, please check again in a day or so"** queue. Zero organic search queries, clicks, or impressions have been finalized by Google yet.
3. **GA4 Reality:** Singular canonical measurement ID `G-M2EL9MYSRL` verified. Realtime ingestion was verified by the owner on Oct 3, 2026, while standard 24–48h historical attribution reports are still in their initial warm-up period.
4. **Child Safety & Zero-PII Guarantee:** Strictly enforced. No parent/child phone numbers, student names, or message transcripts are transmitted to GA4 or logged in reports.
5. **Gate Determination:** **`EVIDENCE REVIEW COMPLETE — BASELINE STILL INCOMPLETE`**.

---

## 2. Evidence Sources and Access Limitations

In accordance with strict empirical rules, all data points are classified into four explicit categories:

| Source Domain | Direct Access State | Evidence Level | Notes & Limitations |
| :--- | :--- | :--- | :--- |
| **Google Search Console (GSC)** | Owner screenshot / Indirect review | **VERIFIED (via Owner Evidence)** | Sitemap "Success" (22 URLs) verified. Indexing & performance reports in "Processing data" queue. URL-level live inspection logs require owner console action. |
| **Google Analytics 4 (GA4)** | Owner parallel testing / Realtime | **VERIFIED (via Owner Confirmation)** | Singular `G-M2EL9MYSRL` confirmed. Realtime stream live. Processed Standard Acquisition reports require 24–48h aggregation window. |
| **Production Edge (`bom1`)** | Direct HTTP inspection | **VERIFIED DIRECTLY** | Commit `74309d5` live. `vendor-pdf` preload absence confirmed in HTTP response. |
| **PageSpeed Insights / CrUX** | Direct API / Public web runner | **PARTIALLY BLOCKED / INSUFFICIENT DATA** | Public API runner rate-limited (HTTP 429). CrUX real-user data reports "Insufficient Data" (requires eligible Chrome user traffic over rolling 28-day window). |
| **Physical Academy Records** | Owner register / WhatsApp logs | **OWNER-DEPENDENT** | Zero-PII offline admissions log template provided; historical conversion rates awaiting owner weekly tally. |

---

## 3. Workstream A — Google Search Console Status & URL-Level Findings

* **Date & Time of Assessment:** October 3, 2026, 15:35 IST
* **Sitemap Target:** `https://arnavabacusacademy-web.vercel.app/sitemap.xml`
* **Sitemap Processing Status:** **Success**
* **Discovered URLs Count:** **22 URLs** (Validated against Owner GSC screenshot `media_1791019750828.png`).

### 3.1 URL-Level Indexing Status Table

The 8 approved core architecture pages (3 program hubs + 5 parent guides) along with the Homepage are tracked below:

| # | Canonical Route | Architecture Role | Indexing Status | Reported Reason | Owner Live Inspection Needed |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `/` | Root / Homepage | **Processing / In-Flight** | In crawl queue (Sitemap discovered) | Yes (Check mobile smartphone crawler fetch) |
| 2 | `/programs/abacus` | Program Hub 1 | **Processing / In-Flight** | In crawl queue (Sitemap discovered) | Yes (Check canonical self-reference) |
| 3 | `/programs/vedic-maths` | Program Hub 2 | **Processing / In-Flight** | In crawl queue (Sitemap discovered) | Recommended |
| 4 | `/programs/school-maths` | Program Hub 3 | **Processing / In-Flight** | In crawl queue (Sitemap discovered) | Recommended |
| 5 | `/parent-guides/ideal-age-to-start-abacus` | Parent Guide 1 | **Processing / In-Flight** | In crawl queue (Sitemap discovered) | Awaiting GSC data refresh |
| 6 | `/parent-guides/abacus-vs-vedic-maths` | Parent Guide 2 | **Processing / In-Flight** | In crawl queue (Sitemap discovered) | Awaiting GSC data refresh |
| 7 | `/parent-guides/how-to-support-child-math-anxiety` | Parent Guide 3 | **Processing / In-Flight** | In crawl queue (Sitemap discovered) | Awaiting GSC data refresh |
| 8 | `/parent-guides/abacus-curriculum-guide` | Parent Guide 4 | **Processing / In-Flight** | In crawl queue (Sitemap discovered) | Awaiting GSC data refresh |
| 9 | `/parent-guides/school-maths-exam-prep` | Parent Guide 5 | **Processing / In-Flight** | In crawl queue (Sitemap discovered) | Awaiting GSC data refresh |

*(Note: The remaining 13 URLs in the sitemap comprise legal pages `/privacy-policy`, `/terms`, `/contact`, `/about`, and alternate localized routes).*

### 3.2 Organic Search Performance Metrics (Date Range: Inception to Oct 03, 2026)
* **Total Organic Clicks:** `0` (Confirmed via GSC processing status)
* **Total Impressions:** `0` (Pending data accumulation)
* **Average CTR:** `N/A` (Undefined with 0 impressions)
* **Average Position:** `N/A`
* **Identified Queries:** `None yet aggregated`
* **Interpretation Safeguard:** The presence of 0 clicks and 0 impressions does **not** signify failed SEO, technical penalty, or lack of search demand in Wakad. Google Search Console typically requires 3 to 7 days from initial sitemap ingestion to parse rendered JavaScript DOM and publish aggregated search query metrics.

---

## 4. Workstream B — GA4 Received-Data Findings

* **Verified Property Stream:** Arnav Abacus Academy Web (`https://arnavabacusacademy-web.vercel.app/`)
* **Measurement ID:** `G-M2EL9MYSRL` (Exclusively canonical; verified in live edge payloads)
* **Reporting Timezone:** Indian Standard Time (IST, UTC+5:30)

### 4.1 Received Events vs. Standard Report Classification

| Event Name | Implementation Location | Browser Network Dispatch | GA4 Realtime Status | GA4 Standard Acquisition Status | Configured Key Event (Conversion)? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `page_view` | `analytics.ts` (`pageview`) | Verified (`/g/collect`) | **Received** | Processing (24-48h window) | No (Standard metric) |
| `program_view` | `analytics.ts` | Verified on route change | **Received** | Processing | No (Engagement metric) |
| `whatsapp_click` | `analytics.ts` | Verified on click | **Received** (Owner test) | Processing | Recommended as Key Event |
| `call_click` | `analytics.ts` | Verified on click | **Received** (Owner test) | Processing | Recommended as Key Event |
| `enquiry_form_submit`| `analytics.ts` | Verified on form submit | Verified in code/client | Processing | **Primary Key Event** |
| `demo_request` | `analytics.ts` | Verified on modal confirm | Verified in code/client | Processing | **Primary Key Event** |
| `location_click` | `analytics.ts` | Verified on map click | Verified in code/client | Processing | Micro-conversion |

### 4.2 Traffic Acquisition & Engaged Sessions
* **Current Observed Traffic:** Developer/owner testing and validation visits.
* **Organic Search Sessions:** `0` currently recorded in standard attribution reports.
* **Duplicate Event Risk:** None. The analytics helper (`analytics.ts`) implements guards against duplicate pageviews on client-side route transitions.
* **Important Analytical Rule:** Event counts must never be summed indiscriminately. For example, a single parent exploring the Abacus program page may generate 1 `page_view`, 1 `program_view`, and 1 `whatsapp_click`. These represent 1 unique parent session exhibiting 3 funnel actions, not 3 unique leads.

---

## 5. Workstream C — Privacy-Safe Business Reconciliation

To connect digital actions with real-world academy admissions without risking child or parent privacy, the owner should utilize this standardized weekly reconciliation ledger:

### 5.1 Weekly Aggregate Reconciliation Ledger (Wakad Branch)

| Week Label | Date Range | (1) Website Sessions | (2) Contact-Intent Actions (WhatsApp + Call) | (3) Completed Enquiries (Form Submit) | (4) Demos Requested | (5) Demos Actually Conducted | (6) Paid Enrolments | Contact Intent Rate (2 / 1) | Demo Attendance Rate (5 / 4) | Enrolment Close Rate (6 / 5) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **W0 (Baseline)**| Oct 01–Oct 03 | In-flight | In-flight | In-flight | In-flight | Awaiting log | Awaiting log | *N/A (Data in-flight)* | *N/A* | *N/A* |
| **W1** | Oct 04–Oct 10 | | | | | | | | | |
| **W2** | Oct 11–Oct 17 | | | | | | | | | |
| **W3** | Oct 18–Oct 24 | | | | | | | | | |

*Note on Formulas:*
* **Contact Intent Rate:** Numerator = Total Contact Intent Actions (WhatsApp + Call Clicks); Denominator = Total Website Sessions.
* **Demo Attendance Rate:** Numerator = Demos Actually Conducted; Denominator = Demos Requested. (Crucial separation: many requested demos result in no-shows or rescheduling).
* **Enrolment Close Rate:** Numerator = Paid Enrolments; Denominator = Demos Actually Conducted.
* *Rates remain marked as N/A until the full weekly cycle is logged.*

---

## 6. Workstream D — Performance Evidence and Limitations

### 6.1 Edge Delivery & Asset Audit (Commit `74309d5`)
* **Bundle Footprint Check:**
  * Root modulepreload list: Verified free of `vendor-pdf-*.js` (595 KB eliminated from initial critical path).
  * Entry script `index-*.js`: ~140.8 KB (down from ~168.8 KB).
  * On-demand dynamic import: PDF generation chunks load asynchronously only if the parent triggers a worksheet or brochure download.
* **Edge Routing Verification:**
  * Direct HTTP HEAD check to `https://arnavabacusacademy-web.vercel.app/` returns:
    `HTTP/2 200`, `server: Vercel`, `x-vercel-id: bom1::...` (Mumbai edge POP).
  * Direct HTTP HEAD check to `/programs/abacus` returns:
    `HTTP/2 200` (SPA client routing supported cleanly by rewrite rules).

### 6.2 Field Data (CrUX) and Lab Data Limitations
* **Chrome User Experience Report (CrUX):** **Insufficient Data**.
  * *Explanation:* CrUX generates field metrics (Core Web Vitals: LCP, INP, CLS) based on aggregated data from real Chrome users who have opted into sharing usage statistics. For newly deployed or niche local sites, Google requires a minimum threshold of real user visits over an rolling 28-day collection period before publishing CrUX data. There is no manual method to bypass or fast-forward this collection.
* **Lab Tooling (PageSpeed Insights API):** Currently subjected to public runner quota limitations (HTTP 429). Owner or developer running local Chrome DevTools Lighthouse in an incognito window is the approved fallback.

---

## 7. Workstream E — Prioritized Owner Action Register

| Issue / Question | Evidence & Source | Business Impact / Uncertainty | Required Owner Action | Priority | Status | Next Review Date |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **REG-01: GSC Indexing Aggregation** | GSC Page Indexing reports "Processing data" | Uncertainty regarding which pages are indexed in Google | Log into GSC; check Page Indexing status for green "Indexed" count. | **HIGH** | `IN-FLIGHT` | Oct 06, 2026 |
| **REG-02: GSC URL Inspection of Program Hubs** | GSC Dashboard | Verify Google smartphone crawler parses the React SPA content | Run "URL Inspection" on `https://arnavabacusacademy-web.vercel.app/programs/abacus` and click "Test Live URL". | **HIGH** | `PENDING` | Oct 06, 2026 |
| **REG-03: GA4 Key Event Configuration** | GA4 Admin Dashboard | Ensures `enquiry_form_submit` and `whatsapp_click` appear in conversion reports | Navigate to GA4 Admin -> Key Events; toggle `enquiry_form_submit`, `demo_request`, and `whatsapp_click` as Key Events. | **MEDIUM** | `PENDING` | Oct 07, 2026 |
| **REG-04: Google Business Profile (GBP) Linking** | Local Map Pack | Drives high-intent local Wakad parent calls | Verify that GBP profile "Website" link points to canonical `https://arnavabacusacademy-web.vercel.app/` and phone is `+91 9021924968`. | **MEDIUM** | `PENDING` | Oct 08, 2026 |
| **REG-05: Weekly Conversion Log Tally** | Academy Register & WhatsApp | Clarifies cost-free conversion rate | Record Week 1 (Oct 04–Oct 10) totals for offline demos conducted and paid enrolments. | **LOW** | `SCHEDULED` | Oct 11, 2026 |

---

## 8. Comparison with Phase 3D.0 Baseline

| Metric / Dimension | Phase 3D.0 Baseline (Oct 03, Early) | Phase 3D.1 Monitoring (Oct 03, 15:35 IST) | Variance / Progress |
| :--- | :--- | :--- | :--- |
| **Production Commit** | `74309d5` | `74309d5` | 0 (Stable, frozen codebase) |
| **Sitemap Processing** | "Success" (22 URLs) | "Success" (22 URLs) | Stable |
| **GSC Indexing State** | "Processing data" | "Processing data" | Normal crawler latency window (24–72h) |
| **GSC Organic Clicks** | 0 | 0 | Unchanged |
| **GSC Impressions** | 0 | 0 | Unchanged |
| **GA4 Realtime Ingestion** | Confirmed by owner | Confirmed active | Stable |
| **GA4 Standard Acquisition**| In-flight | In-flight (24–48h processing) | Accumulating |
| **Bundle Architecture** | PDF dynamic import deferred | Verified clean on edge (`bom1`) | Stable performance baseline |

---

## 9. Outstanding Questions & Exact Next Review Steps

### Outstanding Questions
1. When Google finishes the current processing cycle, will any SPA client-rendered route be categorized as *"Discovered - currently not indexed"*? (To be verified via GSC URL Inspection).
2. What will be the organic search query distribution once local queries (e.g., *"abacus classes wakad"*, *"vedic maths near me"*) register impressions?
3. What is the baseline ratio between website WhatsApp clicks and actual scheduled free demo sessions?

### Exact Next Steps for Owner
1. **Oct 06, 2026 (72-Hour Check):** Log in to Google Search Console -> Indexing -> Pages. Verify if the "Processing data" banner has been replaced by the URL count breakdown.
2. **Oct 06, 2026:** In GSC, use the top search bar to inspect `https://arnavabacusacademy-web.vercel.app/programs/abacus`. If it shows "URL is on Google", take a screenshot. If not indexed, review the reason.
3. **Oct 07, 2026:** In GA4 Admin (`G-M2EL9MYSRL`), check the "Key Events" tab and mark `enquiry_form_submit` as a Key Event.

---

## 10. Final Gate Determination

> ### **GATE DECISION: `EVIDENCE REVIEW COMPLETE — BASELINE STILL INCOMPLETE`**
> 
> **Formal Justification:**  
> All technical foundations (codebase freeze at `74309d5`, canonical measurement ID `G-M2EL9MYSRL`, Vercel edge delivery, dynamic bundle deferral, and zero-PII safeguards) are verified and operational. However, an organic baseline cannot be claimed as "established" until Google Search Console finishes its initial data processing cycle and publishes non-zero or verified indexing states, and GA4 completes standard report attribution aggregation. The evidence review is complete, reliable, and strictly unembellished.
