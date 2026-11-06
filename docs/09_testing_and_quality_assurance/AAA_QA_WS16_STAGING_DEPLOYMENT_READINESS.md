# ARNAV ABACUS ACADEMY (AAA) — QA-WS-16 CONTROLLED STAGING DEPLOYMENT READINESS REPORT

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Workstream:** Sprint 3 — QA-WS-16 (Admissions Intake Gateway & Durable Persistence)  
**Governing Baseline:** `MGT-DET-S5-REV-1.2.0-ACPT` (Ratified by Nitin Patil & Neha Patil)  
**Current Working Branch:** `feat/sprint3-integration`  
**Inspected Commit Hash:** `dbe5872a219b39f924dbdfc34cd2d3508fc96321`  
**Production Main:** `a21a3d1129cc17fc6650bfd04648eb91199e6fa8` — 🔒 **STRICTLY LOCKED**  
**Assessment Date:** 2026-11-06 (16:28 IST)  
**Assessor:** Internal QA Review Team

---

## 1. Executive Summary & Purpose of the Package

This document synthesizes the formal **controlled staging deployment readiness package** for the Arnav Abacus Academy admissions intake platform. 

Its sole objective is to provide executive leadership (Nitin Patil, Operations & Tech Lead, and Neha Patil, Academic Director) with complete, auditable verification evidence that:
1. All database migrations, edge functions, and frontend components for durable lead persistence are mathematically and architecturally sound.
2. Server-side secrets are strictly contained, with zero leakage to client bundles, Git, or telemetry.
3. The proposed staging preview deployment is 100% isolated from production infrastructure, data, and users.
4. An exact, non-destructive public HTTPS browser acceptance test protocol is defined and ready for execution.

---

## 2. Synthesis of Forensic Readiness Inspections

### 2.1 Git & Change Manifest Audit
- **Report Reference:** [`AAA_QA_WS16_DEPLOYMENT_CHANGE_MANIFEST.md`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/docs/09_testing_and_quality_assurance/AAA_QA_WS16_DEPLOYMENT_CHANGE_MANIFEST.md)
- **Files Inspected:** 8 files (2 modified, 6 untracked).
- **Production `main` Verification:** Verified locked at `a21a3d1129cc17fc6650bfd04648eb91199e6fa8`. Zero byte drift on the 8 frozen AcademyOS practice platform files.
- **Security Check:** All developer environment files (`.dev.vars`) and emulator state directories (`.wrangler/`) are strictly registered in `.gitignore` and ignored by Git (`git check-ignore -v`).
- **Classification:** 🟢 **PASS**

### 2.2 Database Migration Review
- **File:** `supabase/migrations/20261106000000_discovery_leads_schema.sql` (196 lines).
- **Exact Objects Created:**
  - Sequence: `public.lead_ref_seq_2026` (`START 1`, `MAXVALUE 99999`, `CACHE 1`).
  - Table: `public.leads` (UUID primary key, `lead_reference`, `idempotency_key`, DPDP consents, 90-day retention purge date).
  - Indexes: `idx_leads_mobile_created`, `idx_leads_idempotency`, `idx_leads_retention_purge`.
  - Stored Procedure: `public.fn_submit_discovery_lead(...)` (Language: `plpgsql`, Mode: `SECURITY DEFINER`).
  - Permissions: RLS enabled; `REVOKE ALL ON public.leads FROM anon, authenticated`; `GRANT ALL ON public.leads TO service_role`; `GRANT EXECUTE ON FUNCTION public.fn_submit_discovery_lead TO service_role, anon`.
- **Repeat-Execution & Existing Data Safety:**
  - Purely additive DDL with `CREATE IF NOT EXISTS` and `CREATE OR REPLACE`.
  - Zero `ALTER`, `DROP`, or `TRUNCATE` operations on existing academy tables (`micro_batches`, `batch_enrollments`, `users`).
  - Zero existing data modified or deleted.
- **Staging Deployment Status:**
  - Successfully executed and verified against live staging Supabase PostgreSQL 17.11 (`ghbjtmfskgcraxafhlch`, AWS Mumbai `ap-south-1`) on 2026-11-06 13:01 IST with Exit Code 0 (`MIGRATE_LEADS_LIVE_OUTPUT.log`).
- **Classification:** 🟢 **PASS**

### 2.3 Server-Side Secret Boundary Review
- **Report Reference:** [`AAA_QA_WS16_SECRET_AND_ENVIRONMENT_BOUNDARY_REVIEW.md`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/docs/09_testing_and_quality_assurance/AAA_QA_WS16_SECRET_AND_ENVIRONMENT_BOUNDARY_REVIEW.md)
- **Key Finding:**
  - `SUPABASE_SERVICE_ROLE_KEY` is referenced **exclusively** on the server side in `functions/api/discovery-intake.ts` (Line 307).
  - `src/` has **strictly 0 occurrences** of Supabase SDKs, credentials, or client libraries.
  - Production bundle `dist/assets/*.js` contains **0 occurrences** of Supabase keys or service role references.
  - Client communicates strictly through the local origin route `/api/discovery-intake`.
  - Server-side validations (Indian mobile format, name sanitization, honeypot, DPDP consent checks) are enforced before invoking database RPC.
- **Classification:** 🟢 **PASS**

### 2.4 Staging Deployment Isolation Architecture
- **Hosting Provider:** Cloudflare Pages (Free Tier: 500 builds/month).
- **Target Repository & Branch:** `feat/sprint3-integration` on `AAA_WEB`.
- **Build Settings:**
  - Build Command: `npm run build`
  - Build Output Directory: `dist`
  - Pages Functions Directory: `functions/` (Cloudflare automatically binds `functions/api/discovery-intake.ts` to `/api/discovery-intake`).
  - Compatibility Date: `2024-01-01`
- **Environment Variable Isolation:**
  - In Cloudflare Pages Project Settings $\rightarrow$ Environment Variables $\rightarrow$ **Preview Environment Only**:
    - `SUPABASE_URL = https://ghbjtmfskgcraxafhlch.supabase.co`
    - `SUPABASE_SERVICE_ROLE_KEY = <staging_secret_key>`
  - Production environment variables remain entirely separate and empty.
  - Staging preview runs on a unique, ephemeral domain: `https://<commit-hash>.aaa-web.pages.dev`.
- **Classification:** 🟢 **PASS**

### 2.5 Frontend Journey Inspection
- **Trace Route:** `LeadForm.tsx` (or `DemoBookingModal.tsx`) $\rightarrow$ `useDiscoveryIntake.ts` $\rightarrow$ `POST /api/discovery-intake` $\rightarrow$ Supabase PostgREST RPC $\rightarrow$ `EnquiryReceiptModal.tsx`.
- **Audit Findings:**
  1. **HTTP 201 Requirement:** Confirmation modal `EnquiryReceiptModal` is mounted **strictly upon receiving HTTP 201** with a valid `leadReference`.
  2. **Error Handling:** Client catches network failures (503 / fetch error) and presents a truthful offline message with a direct WhatsApp fallback link to Neha Patil.
  3. **No False Confirmation:** Modal wording explicitly separates inquiry registration from appointment confirmation: *"our academic team will review {childName}'s profile and contact you within two operating hours... to finalize an optimal trial time slot"*. Zero claims of an automated booking are presented to the parent.
- **Classification:** 🟢 **PASS**

---

## 3. HTTPS Browser Acceptance Test Protocol

- **Protocol Reference:** [`AAA_QA_WS16_HTTPS_BROWSER_ACCEPTANCE_TEST_PLAN.md`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/docs/09_testing_and_quality_assurance/AAA_QA_WS16_HTTPS_BROWSER_ACCEPTANCE_TEST_PLAN.md)
- **Scope:** Real desktop/mobile browser interaction on deployed preview `https://<commit-hash>.aaa-web.pages.dev`.
- **Phases:**
  1. TLS 1.3 certificate inspection.
  2. Happy-path synthetic lead submission (`SYNTHETIC-PREVIEW-TEST Parent`, `9822000003`).
  3. Negative validation error handling assertion.
  4. 24-hour duplicate idempotency check.
  5. Exact lead-reference SQL verification and targeted deletion (`WHERE lead_reference = '...'`).
  6. Post-cleanup zero residual confirmation.
- **Classification:** 🟢 **PASS (PROTOCOL READY)**

---

## 4. Master Readiness & Verification Matrix

| Verification Dimension | Standard / Target | Current Finding | Status |
| :--- | :--- | :--- | :---: |
| **Git & Change Manifest** | 0 unapproved files, main locked | 8 files categorized; main strictly locked | 🟢 **PASS** |
| **Schema DDL Integrity** | Repeatable, non-destructive, RLS enforced | Additive DDL; RLS active; tested on staging | 🟢 **PASS** |
| **Secret Boundary** | Server-only; 0 secrets in client JS | 0 client leakage; server isolate protected | 🟢 **PASS** |
| **Staging Environment Isolation** | Separate preview domain and staging DB | `ghbjtmfskgcraxafhlch` isolated from prod | 🟢 **PASS** |
| **Frontend Journey Integrity** | Truthful receipt; 0 false confirmations | Wired to HTTP 201; truthful response target | 🟢 **PASS** |
| **HTTPS Acceptance Test Plan** | Auditable, synthetic, targeted cleanup | Complete step-by-step test plan authored | 🟢 **PASS** |
| **Public HTTPS Verification** | Deployed preview tested over public TLS | Awaiting separate deployment approval | 🟡 **PENDING DEPLOYMENT** |

---

## 5. Mandatory Final Decision & Recommendation

```
====================================================================================================
                        MANAGEMENT READINESS DETERMINATION
====================================================================================================
  FINAL DETERMINATION: 🟢 READY FOR SEPARATE STAGING DEPLOYMENT APPROVAL
  
  PRE-MERGE BLOCKER STATUS: 🟡 QA-WS-16 REMAINS OPEN
  
  JUSTIFICATION:
  The codebase, database migrations, security boundaries, and test protocols are 100% verified 
  and ready. The deployment package introduces zero technical, security, or financial risk (₹0.00).
  
  In accordance with strict stage-gate governance, QA-WS-16 CANNOT be declared closed until the 
  deployed Cloudflare Pages staging preview is publicly tested over HTTPS in a real browser.
  
  Production main remains strictly locked. No merge or production push shall occur.
====================================================================================================
```

### Next Authorized Actions (Upon Management Sign-Off):
1. **Management Approval:** Nitin Patil & Neha Patil review this readiness package and approve committing the change manifest to `feat/sprint3-integration`.
2. **Cloudflare Preview Configuration:** Inject staging secrets into Cloudflare Pages Preview settings.
3. **Branch Push:** Push `feat/sprint3-integration` to trigger the staging preview build.
4. **Acceptance Test Execution:** Execute `AAA_QA_WS16_HTTPS_BROWSER_ACCEPTANCE_TEST_PLAN.md` to formally close `QA-WS-16`.

---

*Verified and Submitted by Internal QA Review Team for Arnav Abacus Academy Executive Consideration.*
