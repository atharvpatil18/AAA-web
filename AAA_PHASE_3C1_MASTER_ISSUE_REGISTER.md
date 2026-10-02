# AAA — PHASE 3C.1: MASTER ISSUE REGISTER
## Consolidated Multi-Tool Findings, Empirical Evidence & Remediation Roadmap
**Project:** Arnav Abacus Academy & Vedic Maths Classes (`AAA_WEB`), Wakad, Pune  
**Production URL:** `https://arnavabacusacademy-web.vercel.app/`  
**Framework Reference:** `AAA_PHASE_3C0_FOUR_TOOL_DIAGNOSTIC_FRAMEWORK.md`  
**Audit Report Reference:** `AAA_PHASE_3C1_FOUR_TOOL_AUDIT_REPORT.md`  
**Execution Date:** October 2, 2026  
**Auditor:** Antigravity Engineering Agent  
**Budget Spent:** ₹0 / $0.00  

---

## 1. Prioritization Hierarchy & Scoring Rules

Issues are strictly ranked according to the Phase 3C.1 mandate:
1. **Broken conversion paths or confirmed tracking failures** (Direct parent revenue/lead capture risk).
2. **Critical crawlability, indexability, or canonical defects** (Search engine discovery risk).
3. **Significant mobile performance or usability problems** (Parent bounce and CWV penalty risk).
4. **Missing or weak search-intent coverage supported by evidence** (Organic reach opportunity).
5. **Lower-impact hygiene or maintenance improvements** (Long-term maintainability).

---

## 2. Master Issue Register Table

| Issue ID | Diagnostic Tool & Source | Target URL / Scope | Specific Observed Finding | Evidence & Date | Status | Business Impact | Severity & Effort | Priority | Recommended Action | Verification Method | Dependency / Owner Action |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- | :---: | :---: | :--- | :--- | :--- |
| **ISS-01** | PageSpeed / Bundle Audit | Site-Wide (`dist/index.html`) | **Heavy PDF vendor bundle (610.59 KB) is module-preloaded in root `<head>`.** | `dist/index.html#L181` and `dist/assets/vendor-pdf-*.js` (610.59 KB). Oct 2, 2026. | **VERIFIED** | High: Stalls initial mobile rendering on 4G networks, inflating TBT and delaying hero LCP for parents. | High / Small (S, ~1 hr) | **P1** | Configure Vite build chunking to dynamically import `vendor-pdf` only when a user triggers worksheet/brochure/report download; remove root `modulepreload`. | Rebuild bundle; inspect `dist/index.html` to confirm `vendor-pdf` is excluded from `<head>` preloads. | Engineering only; zero owner action needed. |
| **ISS-02** | GA4 / Analytics Pipeline | All Routes & Lead Modals | **GA4 Realtime event arrival is not yet confirmed in the Google Analytics console.** | Source dispatch verified in code, but authenticated console confirmation is pending. Oct 2, 2026. | **BLOCKED (CLI)** | High: Uncertainty whether high-intent demo requests and WhatsApp leads are accumulating in GA4 for conversion reporting. | High / Small (S, 10 min) | **P1** | Perform authenticated live verification: open GA4 Realtime, trigger a mobile demo submission test, and confirm event ingestion. | Observe active user and `demo_request` / `whatsapp_click` counts increment in GA4 Realtime. | **Owner Action Required:** Owner (`nitinkpatil@gmail.com`) performs 2-minute test on mobile. |
| **ISS-03** | Screaming Frog / HTML Crawl | All 21 Sub-Routes (`/programs/*`, `/parent-guides/*`) | **Pre-hydration static HTML serves identical root `<title>` and lacks explicit `<link rel="canonical">`.** | `crawler_results.json`: all raw HTML fetches return root title and `"None in raw HTML"` for canonical. Oct 2, 2026. | **VERIFIED** | Medium: While Googlebot executes JS to read `SEOHead.tsx`, non-JS search scrapers, social crawlers, or throttled bots see identical metadata on raw fetch. | Medium / Medium (M, ~2 hrs) | **P2** | Implement static prerendering (SSG via Vite plugin or script) or inject route-specific meta tags directly during build for the 8 canonical routes. | Re-run crawler against raw HTML without JavaScript; confirm unique title and canonical tags exist in raw response. | Engineering task in Phase 3C.2. |
| **ISS-04** | Search Console / GSC Indexing | Site-Wide (`sitemap.xml`) | **Google Indexation of the 22 submitted sitemap URLs is in-flight (warm-up window).** | GSC verified Oct 1, 2026; sitemap submitted; organic impressions currently 0. Oct 2, 2026. | **OBSERVED (IN-FLIGHT)** | Medium: High-intent Wakad parent searches cannot yield traffic until Google crawls and indexes URLs. | Medium / Low (Wait) | **P2** | Monitor GSC Coverage report daily. If URLs remain in "Discovered - currently not indexed" after 7 days, inspect internal linking depth and request re-crawl. | Check GSC "Pages" indexing table to confirm URLs shift from "Discovered" to "Indexed". | **Owner Action Required:** Review GSC indexing dashboard weekly. |
| **ISS-05** | PageSpeed / Bundle Audit | Site-Wide (`dist/index.html`) | **Full localization translation bundle (372.31 KB) is module-preloaded in root `<head>`.** | `dist/index.html#L182` and `dist/assets/locale-translations-*.js` (372.31 KB). Oct 2, 2026. | **VERIFIED** | Medium: Downloads all multi-language dictionary assets on initial landing even when English is standard. | Medium / Small (S, ~1 hr) | **P2** | Lazy-load non-active language dictionary chunks on demand or split locale JSON files by active language. | Inspect initial network transfer size in Chrome DevTools; verify total JS transferred is reduced by ~370 KB. | Engineering task in Phase 3C.2. |
| **ISS-06** | Ahrefs / Off-Page Footprint | Root Domain (`arnavabacusacademy-web.vercel.app`) | **Zero local Wakad directory citations or external authority backlinks detected (DR 0–1).** | Baseline Ahrefs domain check shows 0 local education directory citations. Oct 2, 2026. | **OBSERVED** | Medium: Lack of local external citations limits Google Local Pack authority and ranking velocity for competitive Wakad terms. | Medium / Medium (M, ~3 hrs) | **P3** | Create and harmonize official Academy citations on Google Business Profile, Justdial Pune, Sulekha, and local Pimpri-Chinchwad directories using identical address/phone. | Verify indexed external citations appear in Google Search and Ahrefs Referring Domains table within 30 days. | **Owner / Marketing Action:** Register verified Google Business Profile. |
| **ISS-07** | Screaming Frog / Schema Audit | Program Pages (`/programs/*`) | **Program Hub schema is limited to `Course`; lacks embedded `aggregateRating` or mentor attribution.** | AST inspection of `ProgramAbacus.tsx` and `SEOHead.tsx`. Oct 2, 2026. | **VERIFIED** | Low: Misses potential rich snippet enhancements in Google Search results. | Low / Small (S, ~1 hr) | **P4** | Enhance `Course` schema with explicit `instructor` entity linking to Neha Patil's verified profile and verified IIVA credentials. | Validate enriched JSON-LD via Google Rich Results Test tool. | Engineering task in Phase 3C.2. |
| **ISS-08** | PageSpeed Insights | Public API Runner | **PageSpeed Insights public API runner returned HTTP 429 quota exhaustion on shared Google runner.** | API response `Status 429: Quota exceeded for project_number:583797351490`. Oct 2, 2026. | **VERIFIED** | Low (Audit tool limitation only; does not affect live site users). | Low / Minimal (S) | **P5** | Run Lighthouse audits via local Chrome DevTools CLI or owner-authenticated Google Cloud PSI API key to capture live simulated field scores. | Confirm complete Lighthouse audit JSON export is generated. | Engineering audit task. |

---

## 3. Top Five Evidence-Backed Issues Summary

1. **ISS-01 (P1 — Performance): Unnecessary 610 KB PDF Vendor Preload in Root `<head>`.**  
   Direct evidence in `dist/index.html` proves Vite is forcing every mobile visitor to preload and parse the entire PDF generator library before seeing the homepage or program hubs.
2. **ISS-02 (P1 — Tracking): Unconfirmed Live GA4 Realtime Event Reception.**  
   While zero-PII event code is verified in source, empirical verification in the owner's GA4 dashboard is blocked from CLI and must be confirmed to ensure lead measurement integrity.
3. **ISS-03 (P2 — Technical SEO): Client-Side Only Meta/Canonical Tags on Raw Server Fetch.**  
   Direct crawl of all 22 URLs confirms that raw static responses lack page-specific titles and canonical links until JavaScript executes client-side.
4. **ISS-04 (P2 — Indexability): Google Search Console Indexing Window In-Flight.**  
   Day 1 sitemap submission is active, but Googlebot crawl cycles require 24–72 hours before pages shift to "Indexed".
5. **ISS-05 (P2 — Performance): 372 KB Multi-Language Localization Bundle Preload.**  
   Root document preloads non-critical translation chunks, adding unnecessary overhead on mobile 4G connections.

---

## 4. First Recommended Remediation Task (Phase 3C.2)

### Task: Prune Non-Critical Module Preloads from Root Entry (`ISS-01` & `ISS-05`)
- **What:** Adjust `vite.config.ts` chunking and import strategies so that `jspdf`, `html2canvas`, and non-active locale translation dictionaries are strictly lazy-loaded on user interaction, eliminating ~980 KB of uncompressed JavaScript from the initial mobile viewport load.
- **Why First:** This is a zero-risk, high-return engineering change. It directly accelerates mobile **Largest Contentful Paint (LCP)** and eliminates **Total Blocking Time (TBT)** for parents browsing on mobile devices in Wakad without altering routing, content, or analytics tags.

---

## 5. Gate Determination

### **READY FOR PHASE 3C.2 REMEDIATION**

**Justification:**
- The four-tool diagnostic audit has been executed without inventing synthetic metrics, altering production code, or spending software budget (₹0 spent).
- Critical technical bottlenecks (root module preloads, SPA raw HTML metadata, indexing timeline) have been isolated and substantiated with reproducible evidence.
- The consolidated Master Issue Register provides clear, prioritized tasks with established verification criteria ready for systematic remediation in Phase 3C.2.
