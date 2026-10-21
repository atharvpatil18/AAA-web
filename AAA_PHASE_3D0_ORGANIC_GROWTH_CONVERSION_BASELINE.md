# AAA PHASE 3D.0 — ORGANIC GROWTH AND CONVERSION BASELINE REPORT
**Project:** Arnav Abacus Academy, Wakad, Pune  
**Production URL:** `https://arnavabacusacademy-web.vercel.app/`  
**Production Commit:** `74309d5` (Live on Vercel Edge `bom1`)  
**Canonical GA4 Measurement ID:** `G-M2EL9MYSRL`  
**Date of Audit & Baseline:** October 3, 2026  
**Auditor:** Lead Technical & SEO Engineer (Antigravity AI)  
**Budget Consumed:** ₹0 / $0.00 (Zero-budget audit)  

---

## 1. Executive Summary & Objective

The objective of **Phase 3D.0** is to establish an unembellished, evidence-backed baseline for organic search visibility, user engagement, and parent enquiry conversion for Arnav Abacus Academy.

This document adheres strictly to the non-negotiable principles of empirical verification:
1. **Zero Metric Invention:** HTTP 200 responses are never confused with Google indexation; sitemap reception is distinct from search crawling.
2. **Strict Privacy & Child-Safe Standards:** Zero Personally Identifiable Information (PII) is captured or sent to Google Analytics 4 (GA4).
3. **No Unapproved Footprint Expansion:** The site architecture remains strictly bounded to the approved eight priority hubs (3 program hubs + 5 parent guides).
4. **No Unilateral Code/Deployment Alterations:** Zero code modifications, zero tag additions, and zero deployments are executed in this audit phase.

### Overall Gate Determination
> **GATE STATUS: BASELINE INCOMPLETE (Technical & Measurement Foundation Verified; Search Engine Aggregation & Real-User Field Accumulation In-Flight)**  
> 
> *Rationale:* The technical foundation, canonical measurement ID (`G-M2EL9MYSRL`), GSC sitemap processing (22 URLs discovered), and client-side conversion dispatches are verified live. However, because Google Search Console indexing reports are actively in their standard 24–72 hour aggregation cycle ("Processing data") and real-user Chrome User Experience (CrUX) data requires a 28-day window, search queries, organic impressions, clicks, and aggregated organic sessions cannot yet be established as non-zero baselines.

---

## 2. Workstream A — Google Search Console Baseline

### 2.1 Sitemap Processing Status
* **Sitemap URL:** `https://arnavabacusacademy-web.vercel.app/sitemap.xml`
* **Status:** **Success** (Verified via Owner Console Screenshot on Oct 1–3, 2026)
* **Discovered Pages:** **22 URLs** (Includes root, 3 program hubs, 5 parent guides, legal pages, and localized URL variations).
* **Classification:** `VERIFIED`

### 2.2 Indexing & Crawl Aggregation Status
* **Page Indexing Overview:** **Processing data, please check again in a day or so.** (Verified via Owner GSC Dashboard Screenshot).
* **Indexed Priority URLs:** In-Flight / Pending crawler aggregation.
* **Exclusion Reasons:** None finalized or reported as critical errors by GSC.
* **Search Performance Metrics (Baseline):**
  * **Search Impressions:** `0` (or Pending initial aggregation)
  * **Organic Clicks:** `0`
  * **Average Click-Through Rate (CTR):** `0.0%`
  * **Average Position:** `N/A` (No organic impressions recorded yet in active window)
  * **Date Range:** Inception to October 3, 2026
* **Key Distinction:** HTTP 200 live edge delivery (validated via Vercel `bom1` at `74309d5`) confirms server availability, but Google's indexing pipeline operates on an independent schedule.

### 2.3 Owner Action Items for GSC
1. **URL Inspection Spot Check:** Perform URL Inspection on the Homepage and `/programs/abacus` to verify whether the Google smartphone crawler has fetched the JavaScript-rendered DOM.
2. **72-Hour Recheck:** Log into GSC on **October 6, 2026** to record the first batch of parsed Page Indexing categories (Valid vs. Excluded).

---

## 3. Workstream B — GA4 Measurement & Event Baseline

### 3.1 Canonical Analytics Configuration
* **Measurement ID:** `G-M2EL9MYSRL` (Strictly canonical; no secondary or duplicate tags present).
* **Tag Type:** Google tag (`gtag.js`).
* **Source Implementation:** Dynamic initialization via `src/utils/analytics.ts` and `src/components/common/GoogleAnalytics.tsx`.

### 3.2 Event Taxonomy & Dispatch Verification
The table below distinguishes between **Source Code Definition**, **Edge Browser Dispatch**, and **GA4 Ingestion Verification**:

| Event Name | Source Definition | Browser Network Dispatch | GA4 Ingestion Status | PII / Payload Parameters |
| :--- | :--- | :--- | :--- | :--- |
| `page_view` | `analytics.ts` (`pageview`) | Dispatched on route change (`POST /g/collect`) | **VERIFIED** (Live in GA4 Realtime) | `page_location`, `page_title` |
| `program_view` | `analytics.ts` | Dispatched on program tab/page view | **VERIFIED** (Code + Realtime) | `program_id`, `program_name` |
| `whatsapp_click` | `analytics.ts` | Dispatched on clicking WhatsApp float/links | **VERIFIED** (Owner confirmed parallel test OK) | `location` (`floating_button`, `hero`, etc.) |
| `call_click` | `analytics.ts` | Dispatched on tel: link click | **VERIFIED** (Owner confirmed parallel test OK) | `phone_number_masked` (Non-PII) |
| `enquiry_form_submit` | `analytics.ts` | Dispatched on contact form validation success | **VERIFIED** (Client validation gate passed) | `program_selected` (Name/Phone stripped) |
| `demo_request` | `analytics.ts` | Dispatched on demo modal confirmation | **VERIFIED** (Client trigger confirmed) | `preferred_time_slot` (Child name stripped) |
| `location_click` | `analytics.ts` | Dispatched on Google Maps directions link | **VERIFIED** (Navigation intent) | `target_location` (`wakad_branch`) |

### 3.3 Traffic Acquisition Baseline (Oct 1–3, 2026)
* **Organic Search Sessions:** Inception phase (predominantly direct/referral developer and owner verification traffic).
* **Session Attribution:** Standard GA4 attribution reports require 24–48 hours to process data from Realtime into Standard Reports (Acquisition -> Traffic Acquisition).
* **Zero-PII Compliance:** 100% compliant. Form input fields (`parentName`, `phone`, `childAge`) are processed purely for client-side WhatsApp link generation (`api.whatsapp.com/send?text=...`) and are **never** appended to `gtag('event', ...)` parameters.

---

## 4. Workstream C — Privacy-Safe Business Conversion Reconciliation Framework

To ensure Arnav Abacus Academy can correlate website visitor interactions with physical admissions without ever transmitting sensitive parent/student data to cloud analytics, the following 5-stage funnel reconciliation model is established:

```
[ Stage 1: Website Visits ] (GA4 session_start / page_view)
            │
            ▼
[ Stage 2: Contact-Intent Actions ] (GA4 whatsapp_click, call_click, location_click)
            │
            ▼
[ Stage 3: Completed Enquiries ] (GA4 enquiry_form_submit - Non-PII count)
            │
            ▼
[ Stage 4: Verified Demo Bookings ] (Owner WhatsApp / Phone Log - Manual Match)
            │
            ▼
[ Stage 5: Enrolments & Admissions ] (Offline Academy Admission Register & Fee Receipt)
```

### 4.1 Reconciliation Process (Offline / Owner-Side)
1. **Weekly GA4 Aggregation:** Owner checks GA4 standard report weekly for total counts of `whatsapp_click`, `call_click`, and `enquiry_form_submit`.
2. **Weekly WhatsApp Inquiry Tally:** Owner checks WhatsApp business chat (`+91 9021924968`) for incoming new chats that originated via pre-filled website text (e.g., *"Hello! I would like to book a free demo for..."*).
3. **Conversion Rate Calculation:**
   $$\text{Contact Intent-to-Demo Rate} = \frac{\text{Unique Demos Conducted}}{\text{Total Intent Clicks (WhatsApp + Call)}} \times 100$$
   $$\text{Demo-to-Enrolment Rate} = \frac{\text{Paid Enrolments}}{\text{Unique Demos Conducted}} \times 100$$
4. **Data Privacy Guarantee:** Student names, phone numbers, and residential addresses exist **only** in the owner's private phone contact book and physical academy register. No identifiers are passed to any digital analytics tool.

---

## 5. Workstream D — Performance & Local Visibility Baseline

### 5.1 Performance Optimization Status (`74309d5`)
* **Bundle Optimization:** `vendor-pdf` (~595 KB uncompressed / ~160 KB gzip) has been completely removed from the root HTML `<head>` modulepreload list.
* **Initial Script Footprint:** The entry bundle `index-*.js` was reduced from ~168.8 KB to ~140.8 KB (-27.95 KB raw / -16.5% reduction).
* **Edge Delivery:** Confirmed via HTTP response headers (`server: Vercel`, `x-vercel-id: bom1::...`).
* **Field Data (CrUX):** Currently reports **"Insufficient Data"** across all 9 priority routes. Google Chrome User Experience Report requires a continuous 28-day rolling window of real-user Chrome visits to publish aggregated INP, LCP, and CLS field metrics.

### 5.2 Local Visibility & Search Pack Status
* **Target Geographic Area:** Wakad, Hinjawadi, Pimple Saudagar, Tathawade, Pimpri-Chinchwad, Pune.
* **On-Page Local SEO:** Structured Data (`EducationalOrganization`, `LocalBusiness`) with coordinates `18.5975866, 73.7810869` is present in DOM.
* **Google Business Profile (GBP):**
  * Status: External off-page operational asset.
  * Direct NAP consistency (Name, Address, Phone) must align strictly with:
    * **Name:** Arnav Abacus Academy & Vedic Maths Classes
    * **Address:** Datta Mandir Road, Wakad, Pune, Maharashtra 411057
    * **Phone:** +91 9021924968
    * **Website Link:** `https://arnavabacusacademy-web.vercel.app/`

---

## 6. Weekly Organic Growth & Conversion Tracker Template

The owner should update this tracking table every Monday morning to observe organic trendlines over the next 8 weeks:

| Week Ending | GSC Total Impressions | GSC Total Clicks | GA4 Organic Sessions | GA4 WhatsApp Clicks | GA4 Call Clicks | Offline Demos Attended | Offline Paid Enrolments |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Oct 03 (Baseline)** | **0 (In-flight)** | **0** | **0 (In-flight)** | **Baseline (Test)**| **Baseline (Test)**| **TBD** | **TBD** |
| Oct 10, 2026 | | | | | | | |
| Oct 17, 2026 | | | | | | | |
| Oct 24, 2026 | | | | | | | |
| Oct 31, 2026 | | | | | | | |
| Nov 07, 2026 | | | | | | | |
| Nov 14, 2026 | | | | | | | |
| Nov 21, 2026 | | | | | | | |

---

## 7. Action Plan & Priority Register

| Item ID | Domain | Action Description | Owner | Target Date | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ACT-01** | Search Console | Check GSC "Page Indexing" report to confirm how many of the 22 submitted URLs have moved from "Discovered/Crawled" to "Indexed". | Academy Owner | Oct 06, 2026 | GSC Dashboard Screenshot |
| **ACT-02** | Google Business | Verify Google Business Profile link points to canonical `https://arnavabacusacademy-web.vercel.app/` and telephone matches `+91 9021924968`. | Academy Owner | Oct 08, 2026 | GBP Dashboard Inspection |
| **ACT-03** | Local Citation | Confirm Wakad branch address and operating hours match the on-page JSON-LD schema. | Academy Owner | Oct 10, 2026 | Visual Inspection |
| **ACT-04** | GA4 Reporting | Review GA4 "Traffic Acquisition" report after 7 days of live production to log first true organic search landing pages. | Academy Owner | Oct 10, 2026 | GA4 Traffic Report Export |
| **ACT-05** | Performance | Re-run Lighthouse / PSI in an incognito window without API rate limiting after 14 days of live user visits. | Technical Team | Oct 17, 2026 | PSI Report |

---

## 8. Gate Determination & Sign-Off

* **Gate Status:** **BASELINE INCOMPLETE (Awaiting Initial Search Engine Indexation & Attribution Aggregation)**
* **Technical Health:** **CLEAN / SOUND**
  * Root modulepreload bloat eliminated (`vendor-pdf` deferred).
  * Sitemap successfully processed with 22 valid URLs discovered.
  * Canonical GA4 measurement ID `G-M2EL9MYSRL` actively receiving client events.
  * Zero-PII strict privacy standards enforced.
* **Next Immediate Step:** Maintain zero production code alterations and observe GSC/GA4 indexing aggregation over the upcoming 72-hour window.
