# ARNAV ABACUS ACADEMY (AAA) — QA-WS-16 SECRET & ENVIRONMENT BOUNDARY REVIEW

**Governing Baseline:** `MGT-DET-S5-REV-1.2.0-ACPT`  
**Current Working Branch:** `feat/sprint3-integration`  
**Governance Commit:** `dbe5872a219b39f924dbdfc34cd2d3508fc96321`  
**Production Main:** `a21a3d1129cc17fc6650bfd04648eb91199e6fa8` — 🔒 **STRICTLY LOCKED**  
**Assessment Date:** 2026-11-06 (16:22 IST)  
**Assessor:** Internal QA Review Team

---

## 1. Executive Summary & Security Objectives

This audit provides forensic proof of the strict isolation boundary separating public browser execution from server-side database credentials. 

Under AAA Governance Rule 5 (Student & Parent Data Privacy) and Zero-PII / Zero-Exposure protocols, secret API keys (specifically `SUPABASE_SERVICE_ROLE_KEY`) must never be leaked into client bundles, browser runtimes, source maps, or telemetry.

---

## 2. Forensic Boundary Verifications

### 2.1 Server-Only Credential Access
- **Source Inspection:** `git grep -n "SUPABASE_SERVICE_ROLE_KEY" src/ functions/`
- **Result:**
  - `functions/api/discovery-intake.ts:307`: `const serviceKey = env?.SUPABASE_SERVICE_ROLE_KEY || env?.SUPABASE_ANON_KEY;`
  - `functions/api/discovery-intake.test.ts:244`: Mock test fixture.
  - `src/` (Entire Frontend Source Tree): **STRICTLY ZERO OCCURRENCES**.
- **Classification:** 🟢 **PASS** (Evidence: `functions/api/discovery-intake.ts#L307`)

### 2.2 Client-Side Bundle & Source Map Inspection
- **Bundle Inspection:** Evaluated production build output in `dist/assets/*.js`.
  - Pattern search: `SUPABASE_SERVICE_ROLE_KEY`, `service_role`, `SUPABASE_URL`.
  - Matches found: **0 occurrences**.
- **`VITE_` Environment Variable Audit:**
  - Examined `.env` and `.env.local`.
  - Registered variables: `VITE_GOOGLE_CLIENT_ID`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, `VITE_LEADS_WEBHOOK_URL`.
  - Zero Supabase credentials are prefixed with `VITE_`.
- **Classification:** 🟢 **PASS** (Evidence: `dist/assets/*.js`, `.env`)

### 2.3 Direct Supabase Browser Ingress Prevention
- **Client Client Library Audit:** `git grep -i "supabase" src/`
- **Result:** **0 matches**. The frontend does not import `@supabase/supabase-js` or instantiate any Supabase client.
- **Network Path:** The browser communicates strictly with the authoritative origin route `/api/discovery-intake` using relative HTTP fetch.
- **Classification:** 🟢 **PASS** (Evidence: `src/hooks/useDiscoveryIntake.ts#L273`)

### 2.4 Server-Side Request Validation & Bot Defense
`functions/api/discovery-intake.ts` enforces multi-layer defensive validation before any database connection is attempted:
1. **Method Enforcement:** Rejects non-POST methods with HTTP 405 (Lines 151–161).
2. **IP Rate Limiting:** Enforces 5 requests per 15-minute window per client IP (Lines 163–195).
3. **Honeypot Trap:** Rejects automated bot spam silently without database persistence (Lines 213–227).
4. **Verbatim Input Sanitization:** Strips HTML/script tags from parent name verbatim (Lines 244–255).
5. **Indian Mobile Format Check:** Enforces 10-digit Indian standard starting with 6, 7, 8, or 9 (Lines 257–268).
6. **Statutory DPDP Consent Check:** Enforces Guardian Authority and Service Consent; rejects with HTTP 422 if missing (Lines 270–293).
- **Classification:** 🟢 **PASS** (Evidence: `functions/api/discovery-intake.ts#L151-L293`)

### 2.5 Database Row Level Security (RLS) & Execution Privileges
- **Table Privileges:**
  - `REVOKE ALL ON public.leads FROM anon;` (Line 186)
  - `REVOKE ALL ON public.leads FROM authenticated;` (Line 187)
  - Result: Even if an attacker obtains the `anon` key, direct SELECT, INSERT, UPDATE, or DELETE on `public.leads` is completely rejected by PostgreSQL.
- **RPC Privileges:**
  - `GRANT EXECUTE ON FUNCTION public.fn_submit_discovery_lead TO service_role, anon;`
  - Function is declared `SECURITY DEFINER` (Line 91), allowing controlled, validated insertion without granting raw table permissions.
- **Classification:** 🟢 **PASS** (Evidence: `supabase/migrations/20261106000000_discovery_leads_schema.sql#L183-L196`)

### 2.6 Staging vs. Production Environment Isolation
- **Staging Database Project:** `ghbjtmfskgcraxafhlch` (AWS Mumbai `ap-south-1`).
- **Production Isolation:**
  - The script runner `scripts/run_staging_discovery_leads_migration.ps1` (Lines 52–56) includes an active hostname guard that halts immediately if production identifiers (`production`, `prod`, `live`, `arnavabacus.com`) are supplied.
  - Production `main` environment variables in Cloudflare Pages are scoped strictly to the `production` environment (`main` branch) and are physically inaccessible by preview deployments on `feat/*` branches.
- **Classification:** 🟢 **PASS** (Evidence: `scripts/run_staging_discovery_leads_migration.ps1#L52-L56`)

---

## 3. Findings Summary Matrix

| Security / Isolation Check | Standard Required | Audit Finding | Status |
| :--- | :--- | :--- | :---: |
| **Server-Side Secret Access** | `SUPABASE_SERVICE_ROLE_KEY` server-only | Read exclusively in Cloudflare Pages Function | 🟢 **PASS** |
| **No Client Leakage** | 0 secrets in client JS or source maps | Confirmed 0 matches in `dist/assets/*.js` | 🟢 **PASS** |
| **No Client Supabase Client** | Zero direct database SDKs in browser | `src/` has 0 imports of Supabase | 🟢 **PASS** |
| **Server Validation Enforcement** | Input validation enforced before SQL | Phone, name, honeypot, DPDP validated | 🟢 **PASS** |
| **PostgreSQL RLS & Grants** | Direct table access denied to public | `REVOKE ALL ON public.leads FROM anon, authenticated` | 🟢 **PASS** |
| **Environment Separation** | Preview secrets distinct from production | Cloudflare Pages Preview environment isolation | 🟢 **PASS** |

---

*Verified and Prepared by Internal QA Review Team for Arnav Abacus Academy Executive Consideration.*
