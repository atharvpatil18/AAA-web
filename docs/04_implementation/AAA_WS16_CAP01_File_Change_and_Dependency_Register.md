# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-16
## Document Reference: `AAA-WS16-CAP01-REG-FILE-01`
### Deliverable 2: CAP-WS16-01 File Change & Dependency Register

**Document Version:** 1.0.0  
**Planning Date:** 05-November-2026  
**Governing Authority:** `MGT-DET-S4-S3-AUTH-02`  
**Governing Audit Reference:** `AAA-S3-REG-WS16-AUDIT-FINAL-01` & `AAA-WS16-REC-FINAL-01`  
**Inspection Baseline Snapshot:** Commit `51b7322` on branch `feat/sprint3-integration`  
**Production Status:** 🔒 **STRICTLY LOCKED** (`a21a3d1129cc17fc6650bfd04648eb91199e6fa8`)  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Summary & Purpose

This register provides a granular, file-by-file inventory of all source code, type definitions, and test files scheduled for modification under Corrective Action Plan **CAP-WS16-01**.

For each file, the current state in baseline commit `51b7322` is documented alongside the root cause, planned corrective changes, external dependencies, associated risks, and stage-gate approval requirements.

---

## 2. File-by-File Change Specification Register

### 2.1 File 1: `src/hooks/useDiscoveryIntake.ts`
* **File Path:** [`src/hooks/useDiscoveryIntake.ts`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/hooks/useDiscoveryIntake.ts)
* **Associated Gate:** **CAP Gate 1** (Elimination of False Offline Success) & **CAP Gate 2** (Public Form Integration)
* **Finding Reference:** `AAA-WS16-VERIF-CONSENT-01` (Section 4 — Defective Offline Simulation)
* **Current State in Commit `51b7322`:**
  - Status strings are loose: `'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR' | 'RATE_LIMITED'`.
  - When `fetch('/api/discovery-intake')` fails (network drop or 404), the catch block executes `processDiscoveryIntake(payload)`, generates a fake 200 OK, sets `isSuccess = true`, and returns a simulated lead reference.
* **Proposed Corrective Changes:**
  1. Define rigid `DiscoverySubmissionStatus` union with 8 explicit states.
  2. Completely purge local `processDiscoveryIntake(payload)` fallback from the network catch block.
  3. Set `status = 'SERVER_CONFIRMED'` strictly when HTTP 201 is returned with server-generated `id` and `leadReference`.
  4. Set `status = 'NETWORK_OFFLINE_ERROR'` when fetch throws or returns 404; surface transparent offline error message and WhatsApp route.
  5. Retain `idempotencyKey` across retries so re-submitting after timeout does not allocate duplicate records.
* **Dependencies:** Standard Web API `fetch`, `crypto.randomUUID()`. Zero external npm packages required.
* **Risks & Mitigation:**
  - *Risk:* In static development mode without Wrangler proxy, form submissions will show offline error.
  - *Mitigation:* Document local dev configuration; provide clear dev mock flag if explicitly required by test harness.
* **Accountable Owner:** Frontend Lead Engineer
* **Approval Requirement:** Nitin Patil (Technical Architecture)

---

### 2.2 File 2: `src/components/LeadForm.tsx`
* **File Path:** [`src/components/LeadForm.tsx`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/components/LeadForm.tsx)
* **Associated Gate:** **CAP Gate 2** (Live Public Form Wiring)
* **Finding Reference:** `AAA-WS16-VERIF-CONSENT-01` (Section 5 — Component Bypass)
* **Current State in Commit `51b7322`:**
  - Directly imports `processDiscoveryIntake` from `../lib/intakeGatewayEngine`.
  - Submissions execute purely in browser memory, bypassing `/api/discovery-intake`.
* **Proposed Corrective Changes:**
  1. Remove `import { processDiscoveryIntake } from '../lib/intakeGatewayEngine'`.
  2. Import and initialize `useDiscoveryIntake`.
  3. Bind form fields (`parentName`, `parentPhone`, `childAgeBracket`, `courseInterest`, `serviceConsent`, `marketingConsent`, `parentGuardianConfirmed`, `honeypotField`) directly to the hook.
  4. Wire form `<form onSubmit={handleSubmit}>` directly to hook's submission handler.
  5. Render dedicated UI states for `SERVER_CONFIRMED`, `NETWORK_OFFLINE_ERROR`, `SERVER_REJECTED`, and `RATE_LIMITED`.
* **Dependencies:** `useDiscoveryIntake.ts`.
* **Risks & Mitigation:**
  - *Risk:* Breaking legacy Google Sheets webhook tracking (`dispatchLeadToWebhook`).
  - *Mitigation:* Trigger `trackEnquiryFormSubmit` and webhook dispatch strictly upon confirmed server success.
* **Accountable Owner:** Senior UI/UX Engineer
* **Approval Requirement:** Neha Patil (Parent Experience) & Nitin Patil (Compliance)

---

### 2.3 File 3: `src/components/DemoBookingModal.tsx`
* **File Path:** [`src/components/DemoBookingModal.tsx`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/components/DemoBookingModal.tsx)
* **Associated Gate:** **CAP Gate 2** (Live Public Form Wiring)
* **Finding Reference:** `AAA-WS16-VERIF-CONSENT-01` (Section 5 — Component Bypass)
* **Current State in Commit `51b7322`:**
  - Directly imports `processDiscoveryIntake` and executes client-side simulation.
* **Proposed Corrective Changes:**
  1. Remove `import { processDiscoveryIntake } from '../lib/intakeGatewayEngine'`.
  2. Wire modal state and form controls to `useDiscoveryIntake`.
  3. Ensure modal close/reset triggers hook `resetForm()`.
  4. Render transparent offline alert with 1-click WhatsApp fallback button if server is unreachable.
* **Dependencies:** `useDiscoveryIntake.ts`.
* **Accountable Owner:** Senior UI/UX Engineer
* **Approval Requirement:** Neha Patil (Academic Lead)

---

### 2.4 File 4: `functions/api/discovery-intake.ts`
* **File Path:** [`functions/api/discovery-intake.ts`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/functions/api/discovery-intake.ts)
* **Associated Gate:** **CAP Gate 3** (Durable Supabase PostgreSQL Persistence)
* **Finding Reference:** `AAA-WS16-VERIF-SRV-01` & `AAA-WS16-VERIF-PERSIST-01`
* **Current State in Commit `51b7322`:**
  - Logic executes in memory; uses `let leadSequenceCounter = 1` and `rateLimitCache = new Map()`.
  - Returns `HTTP 201` without connecting to any database.
* **Proposed Corrective Changes:**
  1. Add environment binding interface:
     ```typescript
     export interface Env {
       SUPABASE_URL: string;
       SUPABASE_SERVICE_ROLE_KEY: string;
     }
     ```
  2. Implement direct HTTPS PostgREST call to Supabase in AWS Mumbai (`ap-south-1`):
     - Check 24-hour idempotency in `public.leads` table via `idempotency_key`.
     - Insert validated record into `public.leads` using atomic stored procedure `fn_allocate_lead_reference()`.
  3. Return `HTTP 201 Created` only upon confirmed PostgreSQL transaction commit.
  4. Return `HTTP 500 / 503` if Supabase is unreachable, preserving client idempotency.
* **Dependencies:** Standard Cloudflare Pages Fetch API. (Zero npm database dependencies required when using native Supabase REST API over HTTPS).
* **Risks & Mitigation:**
  - *Risk:* Latency overhead connecting to Supabase Mumbai.
  - *Mitigation:* Mumbai-to-Mumbai edge routing typically completes under 35ms.
* **Accountable Owner:** Lead Systems Architect
* **Approval Requirement:** Nitin Patil (Operations, Tech & Compliance)

---

### 2.5 File 5: `src/types/gateway.ts`
* **File Path:** [`src/types/gateway.ts`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/types/gateway.ts)
* **Associated Gate:** **CAP Gate 1 & 3** (Type Safety & State Alignment)
* **Current State in Commit `51b7322`:**
  - Basic `GatewayResponse` contains optional `id` and `leadReference`.
* **Proposed Corrective Changes:**
  1. Export `DiscoverySubmissionStatus` union type.
  2. Add `isPersisted: boolean` to `GatewayResponse` to distinguish real database records from transient states.
* **Dependencies:** None.
* **Accountable Owner:** Frontend Lead Engineer

---

### 2.6 Test Files: `discovery-intake.test.ts` & `useDiscoveryIntake.test.ts`
* **File Paths:**
  - [`functions/api/discovery-intake.test.ts`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/functions/api/discovery-intake.test.ts)
  - [`src/hooks/useDiscoveryIntake.test.ts`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/hooks/useDiscoveryIntake.test.ts)
* **Associated Gate:** **CAP Gates 1, 2 & 3** (Acceptance Testing)
* **Proposed Corrective Changes:**
  1. Add test verifying `useDiscoveryIntake` transitions to `NETWORK_OFFLINE_ERROR` (NOT `SUCCESS`) when `fetch` fails.
  2. Add test verifying identical `idempotencyKey` is transmitted on retry.
  3. Add test verifying mocked Supabase PostgreSQL insert returns confirmed `leadReference`.
* **Accountable Owner:** QA Automation Lead

---

## 3. Dependency & Infrastructure Requirements

| Component | Target Technology | Host Location | Licensing / Cost | Security Isolation |
| :--- | :--- | :--- | :--- | :--- |
| **Compute Edge** | Cloudflare Pages Functions | Anycast Edge (Mumbai/Pune PoP) | Free Tier (100k req/day) | Isolated V8 Workerd runtime |
| **Persistence Tier** | Supabase PostgreSQL 15 | AWS Mumbai (`ap-south-1`) | Free Tier / Sovereign Cloud | Row Level Security (RLS) + KMS |
| **Secret Management**| Cloudflare Environment Secrets | Encrypted at Rest (Cloudflare) | Included | Injected into Worker runtime only |
| **Client Network API**| Native `window.fetch` | Browser (Client) | Standard Web API | Zero external dependencies |

---

## 4. Sign-Off & Verification Block

| Governance Role | Name | Designation | Signature Status | Date |
| :--- | :--- | :--- | :--- | :--- |
| **Principal Architect** | Lead Governance & Systems Architect | AAA Engineering | Verified & Submitted | 05-Nov-2026 |
| **Operations & Compliance** | Nitin Patil | Operations, Tech & Compliance Director | Pending Formal Review | [Pending] |
| **Academic & Admissions** | Neha Patil | Founder & Academic Director | Pending Formal Review | [Pending] |
