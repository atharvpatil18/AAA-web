# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-16 VERIFICATION
## Document Reference: `AAA-WS16-VERIF-SRV-01`
### Deliverable 1: Cloudflare Edge Function & Server Gateway Boundary Verification Report

**Document Version:** 1.0.0  
**Audit Date:** 05-November-2026  
**Governing Audit Baseline:** `AAA-S3-REG-WS16-AUDIT-FINAL-01`  
**Governing Determination:** `MGT-DET-S4-S3-AUTH-02`  
**Inspected Commit:** `51b7322` on branch `feat/sprint3-integration`  
**Production Status:** STRICTLY LOCKED (`a21a3d1129cc17fc6650bfd04648eb91199e6fa8`)  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Summary & Verification Classification

Under Management Determination `MGT-DET-S4-S3-AUTH-02`, an edge function was introduced at `functions/api/discovery-intake.ts` to address Finding `AUD-04` (Absence of Server-Side Gateway Boundary).

This verification inspects the actual runtime execution, deployment status, durable persistence, environment bindings, and error-handling characteristics of `functions/api/discovery-intake.ts`.

### Formal Verification Summary Table:
| Verification Dimension | Inspected File / Mechanism | Technical Finding | Formal Classification |
| :--- | :--- | :--- | :---: |
| **Edge Function Signature** | `functions/api/discovery-intake.ts` | Conforms to Cloudflare Pages Functions file-based routing (`onRequestPost`). | **PASS** |
| **HTTP Method Guard** | `functions/api/discovery-intake.ts` | Rejects non-POST methods with HTTP 405 Method Not Allowed. | **PASS** |
| **Server-Side Input Validation** | `functions/api/discovery-intake.ts` | Validates mobile (10 digits), parent name, mandatory consent, guardian declaration. | **PASS** |
| **Server-Side Honeypot Trap** | `functions/api/discovery-intake.ts` | Silently intercepts non-empty `website_url_hp` with synthetic HTTP 200. | **PASS** |
| **Live Cloudflare Deployment** | Cloudflare Pages Infrastructure | Function exists in repository code only; zero deployment has occurred. | **NOT IMPLEMENTED** |
| **Vite Dev Server Integration** | Vite SPA build configuration | Standard `vite build` does not execute Pages Functions without Wrangler proxy. | **NOT IMPLEMENTED** |
| **Environment Bindings** | Cloudflare Worker Bindings | No KV, D1, Queues, or Secret bindings configured. | **NOT IMPLEMENTED** |
| **Durable Database Persistence** | Storage connection | No connection to Supabase PostgreSQL, Prisma, or SQL pooler. | **NOT IMPLEMENTED** |
| **Persistence-Guaranteed Success** | Response generation logic | Server returns HTTP 201 before or without any durable database write. | **FAIL** |
| **Isolate State Ephemerality** | In-memory Maps & Counters | Global variables (`leadSequenceCounter`, `rateLimitCache`) reset across isolate lifecycles. | **FAIL** |

---

## 2. Technical Inspection of `functions/api/discovery-intake.ts`

### 2.1 Runtime & Deployment Analysis
1. **Cloudflare Pages Structure:**
   The file is located at `functions/api/discovery-intake.ts`, which adheres to Cloudflare Pages Functions convention for routing HTTP requests to `/api/discovery-intake`.
2. **Execution Environment in Current Workspace:**
   In the active workspace, the application is built using Vite (`vite build`) producing a client-side single-page application in `/dist`. Cloudflare Pages Functions are only compiled and executed when deployed on Cloudflare Pages or run locally using Cloudflare Wrangler CLI (`wrangler pages dev`).
3. **Automated Test Harness Execution:**
   In `functions/api/discovery-intake.test.ts`, the function is evaluated by directly importing `handleDiscoveryIntakeRequest(request: Request)` in a Node.js/TSX environment using Web Standard Request/Response polyfills.
4. **Deployment Status:**
   In strict compliance with governance rules, **no cloud deployment has occurred**. The function remains a local codebase asset.

### 2.2 Environment Bindings & External Dependencies
Inspection of `functions/api/discovery-intake.ts` and `package.json` reveals:
- **Zero External npm Runtime Dependencies:** The function uses standard Web API interfaces (`Request`, `Response`, `Headers`, `crypto`).
- **Zero Cloudflare Environment Bindings:** The function context `context: { request: Request }` receives only the raw request. It does not bind to:
  - Cloudflare Workers KV
  - Cloudflare D1 (SQLite)
  - Supabase Database URL / Service Role Key
  - Cloudflare Queues / Upstash Redis

### 2.3 Durable Storage & Persistence Defect
Lines 276–312 of `functions/api/discovery-intake.ts` generate the HTTP 201 response:
```typescript
// Allocation of response entirely in memory:
const systemUUID = typeof crypto !== 'undefined' && crypto.randomUUID
  ? crypto.randomUUID()
  : `uuid-${now}-${Math.floor(Math.random() * 1000000)}`;

const currentYear = new Date(now).getFullYear();
const seqPadded = String(leadSequenceCounter++).padStart(5, '0');
const leadReference = `AAA-LEAD-${currentYear}-${seqPadded}`;
const createdAtIso = new Date(now).toISOString();

const responseBody: ServerGatewayResponse = {
  statusCode: 201,
  success: true,
  id: systemUUID,
  leadReference,
  leadUID: leadReference,
  message: 'Discovery session request registered successfully.',
  createdAt: createdAtIso,
};

// Return HTTP 201 Created without ANY database write
return new Response(JSON.stringify(responseBody), { status: 201, headers });
```

#### Defect Analysis:
- There is **no database driver, REST call, or socket connection** to Supabase PostgreSQL or any durable persistence layer.
- The server responds with `HTTP 201 Created` solely on the condition that the in-memory validation passed.
- **Zero records are written to durable storage.** If the parent closes their browser, the lead exists nowhere on disk or database.

---

## 3. Ephemeral In-Memory State & Isolate Recycling Risks

The file declares module-level state:
```typescript
const rateLimitCache = new Map<string, RateLimitBucket>();
const idempotencyCache = new Map<string, CachedIdempotency>();
let leadSequenceCounter = 1;
```

In serverless and edge architectures (such as Cloudflare Workers V8 isolates):
1. **Multi-Region / Anycast PoP Fragmentation:** Requests routed to Cloudflare's Mumbai PoP and requests routed to the Pune or Singapore PoP execute in distinct V8 isolates. Both isolates initialize `leadSequenceCounter = 1`.
2. **Cold Starts & Isolate Teardowns:** When idle, isolates are terminated by Cloudflare within seconds to minutes. Upon restart, `leadSequenceCounter` resets to `1`, and all rate-limiting and idempotency caches are completely destroyed.
3. **Sequence Collisions:** If two parents submit forms on different edge nodes or after isolate restarts, both receive the exact same sequence number: `AAA-LEAD-2026-00001`.

---

## 4. Error Propagation & Status Code Conformance

The function correctly implements HTTP status codes for all evaluated error conditions:

| Scenario | HTTP Status | Response Payload Verification | Test Status |
| :--- | :---: | :--- | :---: |
| **HTTP GET / PUT / DELETE** | `405 Method Not Allowed` | `error: "Method Not Allowed. Only HTTP POST is permitted."` | Verified (`TC-SRV-01`) |
| **Malformed JSON Body** | `400 Bad Request` | `error: "Invalid JSON request payload."` | Verified (Syntax Guard) |
| **Parent Name < 2 Chars** | `400 Bad Request` | `error: "Parent name must contain at least 2 valid characters."` | Verified (Schema Guard) |
| **Invalid Mobile Number** | `400 Bad Request` | `error: "Invalid Indian mobile number. Number must start with 6, 7, 8, or 9."` | Verified (`TC-SRV-03`) |
| **Guardian Unconfirmed** | `422 Unprocessable Entity` | `error: "Guardian Authority Self-Declaration is mandatory under Section 9 DPDP Act 2023."` | Verified (`TC-SRV-04`) |
| **Service Consent Missing** | `422 Unprocessable Entity` | `error: "Service communication consent is required to coordinate diagnostic assessment."` | Verified (`TC-SRV-05`) |
| **Rate Limit Exceeded (>5 req)**| `429 Too Many Requests` | `error: "Rate limit exceeded. Maximum 5 submissions permitted per 15 minutes."`, `Retry-After: 900` | Verified (`TC-SRV-09`) |
| **Honeypot Triggered** | `200 OK (Silent Drop)` | `isBotDropped: true`, `leadReference: "AAA-LEAD-BOT-TRAP"` | Verified (`TC-SRV-02`) |

---

## 5. Architectural Conclusion & Stop-Gate Finding

1. **Gate Assessment:**
   `functions/api/discovery-intake.ts` successfully implements server-side protocol parsing, HTTP method enforcement, honeypot dropping, and input validation.
2. **Non-Negotiable Limitation:**
   Because durable persistence to Supabase PostgreSQL is **NOT IMPLEMENTED**, the function **CANNOT be classified as a production admissions gateway**. It currently functions as an **Edge-Compatible Serverless Validation Prototype**.
3. **Requirement for Production Readiness:**
   Transition to production requires binding the function to Supabase PostgreSQL in AWS Mumbai (`ap-south-1`) via a secure connection pooler or REST API token before returning `HTTP 201`.

---

## 6. Sign-Off & Verification Block

| Governance Role | Name | Designation | Signature Status | Date |
| :--- | :--- | :--- | :--- | :--- |
| **Audit Inspector** | Independent Security Auditor | Systems & Ingress Audit | Verified | 05-Nov-2026 |
| **Operations & Compliance** | Nitin Patil | Operations, Tech & Compliance Director | Pending Formal Review | [Pending] |
| **Academic & Admissions** | Neha Patil | Founder & Academic Director | Pending Formal Review | [Pending] |
