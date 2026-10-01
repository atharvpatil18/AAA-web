# AAA — GA4 MEASUREMENT ID RECONCILIATION REPORT

**Audit Date:** 2026-10-01  
**Project:** Arnav Abacus Academy & Vedic Maths Classes (`AAA_WEB`)  
**Auditor:** Antigravity Engineering Agent  
**Status:** COMPLETE (Awaiting Owner Decision)

---

## 1. Executive Summary

A discrepancy was identified between historical project reports referencing GA4 Measurement ID **`G-M2EL9MYSRL`** and recent setup instructions/commits referring to **`G-VC40JH2BX3`**. 

This audit was conducted strictly across the codebase repository, commit history, configuration/environment references, and the live production website (`https://arnavabacusacademy-web.vercel.app/`).

- **Current Repository Source Code State:** Configured exclusively with **`G-M2EL9MYSRL`**.
- **Current Live Production HTML State:** Serving exclusively **`G-M2EL9MYSRL`**.
- **Previous Ephemeral State in Git:** `G-VC40JH2BX3` was introduced in commit `ada260b` and subsequently reverted in commit `316dcb7`.

---

## 2. Source Locations Where Either ID Appears

### A. Occurrences of `G-M2EL9MYSRL`

| Location | Line(s) | Context / Code Snippet | Status |
| :--- | :--- | :--- | :--- |
| `index.html` | 5 | `<script async src="https://www.googletagmanager.com/gtag/js?id=G-M2EL9MYSRL"></script>` | **VERIFIED** |
| `index.html` | 11 | `gtag('config', 'G-M2EL9MYSRL');` | **VERIFIED** |
| `src/lib/gtm.ts` | 16–17 | `export const GA4_MEASUREMENT_ID = ((import.meta as any).env?.VITE_GA4_MEASUREMENT_ID as string) \|\| "G-M2EL9MYSRL";` | **VERIFIED** |
| `AAA_WEBSITE_ANALYTICS_SPEC.md` | 31 | Specification doc: Default Fallback ID: `G-M2EL9MYSRL` | **OBSERVED** |
| `AAA_PHASE_3A_GOOGLE_SEARCH_CONSOLE_SEO_BASELINE_REPORT.md` | 5, 16, 159 | Baseline audit documentation referencing `G-M2EL9MYSRL` | **OBSERVED** |
| `AAA_PHASE_2C_INTEGRATED_RELEASE_REVIEW_REPORT.md` | 92 | Integrated release report referencing `G-M2EL9MYSRL` | **OBSERVED** |
| `AAA_PHASE_2C1_LIVE_RELEASE_VERIFICATION_REPORT.md` | 61 | Live release report referencing `G-M2EL9MYSRL` | **OBSERVED** |

### B. Occurrences of `G-VC40JH2BX3`

| Location | Status | Details |
| :--- | :--- | :--- |
| Active Working Tree / Codebase | **VERIFIED ABSENT** | Zero occurrences exist in active source code, markup, or docs. |
| Local `.env` / `.env.local` | **VERIFIED ABSENT** | Neither file defines `VITE_GA4_MEASUREMENT_ID` or references `G-VC40JH2BX3`. |
| Git History: Commit `ada260b` | **OBSERVED** | Commit message: `Configure new Google Analytics ID G-VC40JH2BX3`. Modified `index.html` and `src/lib/gtm.ts`. |
| Git History: Commit `316dcb7` | **OBSERVED** | Commit message: `Restore original Google Analytics ID G-M2EL9MYSRL`. Reverted `index.html` and `src/lib/gtm.ts` back to `G-M2EL9MYSRL`. |

---

## 3. Configuration & Tag Multiplicity Inspection

1. **Number of Tags Configured in Code:**
   - **One single GA4 tag** is configured in `index.html` (`G-M2EL9MYSRL`).
   - The snippet consists of one script loader (`https://www.googletagmanager.com/gtag/js?id=G-M2EL9MYSRL`) and one `gtag('config', 'G-M2EL9MYSRL')` invocation.
   - Neither ID is duplicated. There are no competing or parallel dual-tracker scripts loaded in `index.html`.

2. **Environment Variable Configuration:**
   - `src/lib/gtm.ts` references `import.meta.env.VITE_GA4_MEASUREMENT_ID`.
   - Inspection of local `.env` and `.env.local` confirmed that `VITE_GA4_MEASUREMENT_ID` is **not set** locally, so the module safely falls back to `"G-M2EL9MYSRL"`.

3. **Application Runtime (`src/lib/analytics.ts` and `src/lib/gtm.ts`):**
   - `src/lib/analytics.ts` delegates all event tracking to `pushGtmEvent` in `src/lib/gtm.ts`.
   - `pushGtmEvent` writes to `window.dataLayer` and invokes `window.gtag("event", event, cleanData)`. Because `window.gtag` was initialized in `index.html` with target `G-M2EL9MYSRL`, events dispatched by application code target `G-M2EL9MYSRL`.

---

## 4. Live Production Environment Verification

- **Production Target:** `https://arnavabacusacademy-web.vercel.app/`
- **Method:** Direct HTTP/TLS fetch with `Cache-Control: no-cache` header.

### Findings:
1. **Live HTML Header Tag Presence:**
   - **VERIFIED:** The live HTML document served by Vercel returns:
     ```html
     <!-- Google tag (gtag.js) -->
     <script async src="https://www.googletagmanager.com/gtag/js?id=G-M2EL9MYSRL"></script>
     <script>
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());

       gtag('config', 'G-M2EL9MYSRL');
     </script>
     ```
   - **VERIFIED:** `G-VC40JH2BX3` is **not present** in the live HTML response.

2. **Google Tag Endpoint Availability:**
   - Direct HTTP request to `https://www.googletagmanager.com/gtag/js?id=G-M2EL9MYSRL` returns **HTTP 200 OK** (`Content-Type: application/javascript; charset=UTF-8`).
   - Direct HTTP request to `https://www.googletagmanager.com/gtag/js?id=G-VC40JH2BX3` also returns **HTTP 200 OK** (`Content-Type: application/javascript; charset=UTF-8`), confirming both IDs represent registered Google Analytics containers on Google's CDN.

---

## 5. What Remains Unverified

The following items cannot be programmatically verified without authenticated interactive browser access or direct Google Analytics property credentials:

1. **Browser Network Tag Execution / Dispatch:**
   - **NOT VERIFIED:** While the `<script>` tag pointing to `G-M2EL9MYSRL` is verified in the live HTML and the script file returns HTTP 200, actual client-side network beacon transmission (`https://region1.google-analytics.com/g/collect?v=2&tid=G-M2EL9MYSRL...`) in an end-user browser session requires live browser instrumentation (e.g. Google Tag Assistant or browser DevTools Network tab).
2. **GA4 Realtime / DebugView Event Receipt:**
   - **NOT VERIFIED:** Direct receipt of events inside the Google Analytics web console (DebugView / Realtime dashboard) could not be verified by automated server CLI inspection.
3. **Vercel Cloud Production Environment Variables:**
   - **NOT VERIFIED:** Any server-side build environment variable configured inside the Vercel project settings dashboard (`VITE_GA4_MEASUREMENT_ID`) cannot be read directly from Git. However, inspection of the built client JS assets on production confirmed neither ID is statically injected as an override variable.

---

## 6. Exact Owner Decision Required

Before any further code modifications or deployments are made, the property owner must confirm the intended GA4 web stream destination:

### **Decision Choice:**

- **Option A (Keep `G-M2EL9MYSRL` — Recommended / Current State):**
  - **Property Name:** `AAA_WEBSITE` (Account: `AAA_ANALYTIC`, linked to `nitinkpatil@gmail.com`).
  - **Status:** Already integrated with Search Console and Google Business Profile under `nitinkpatil@gmail.com`.
  - **Action Required:** None. The repository and live production deployment already match this stream.

- **Option B (Switch to `G-VC40JH2BX3`):**
  - **Property Name:** Secondary / Newly created container.
  - **Action Required:** The owner must explicitly instruct to replace `G-M2EL9MYSRL` with `G-VC40JH2BX3` across `index.html` and `src/lib/gtm.ts`, rebuild, and deploy. Note that doing so would disconnect the newly verified Google Search Console and Google Business Profile links configured under `nitinkpatil@gmail.com`.

---

**Audit Conclusion:**  
No code modifications or deployments have been made during this audit. The system remains stable in its current verified state awaiting owner confirmation.
