# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-16 & WS-17 INTEGRATION AUDIT
## Document Reference: `AAA-S3-AUD-INT-01`
### Deliverable 1: Comprehensive WS-16 Technical Acceptance & Gateway Integration Audit

**Document Version:** 1.0.0  
**Audit Date:** 05-November-2026  
**Governing Baseline:** Commit `6af0c0f` on branch `feat/sprint3-integration`  
**Production Status:** 🔒 **STRICTLY LOCKED** (`a21a3d1129cc17fc6650bfd04648eb91199e6fa8`)  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Summary & Audit Authority

Under the direct instructions of Nitin Patil and Neha Patil, this independent audit inspects the actual implementation code, runtime execution paths, and database persistence layer of **Workstream 16 (Public Form Gateway Wiring)** and **Workstream 17 (Post-Submission Discovery Experience)** at commit `6af0c0f`.

In adherence to mandatory AAA Agent Governance:
- Zero financial expenditure and zero security breach reports are **not** accepted as substitute evidence for technical functionality.
- This audit distinguishes strictly between **code that has been architected/tested in isolation** and **end-to-end operational acceptance**.

---

## 2. Workstream 16: Ten-Point Technical Acceptance Inspection

| Item # | Technical Requirement | Implementation File(s) | Verified Runtime Behavior | Functional Classification | Technical Audit Finding |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **1** | **Real Durable Database Connection** | `functions/api/discovery-intake.ts` | Dispatches HTTPS POST to `${env.SUPABASE_URL}/rest/v1/rpc/fn_submit_discovery_lead` when environment bindings exist; falls back to in-memory isolate counter when unbound. | 🟡 **PARTIALLY IMPLEMENTED** *(Staging Mode)* | The PostgREST RPC bridge is coded and verified with mock RPC (TC-SRV-11/12). However, live Supabase credentials have intentionally not been injected into Cloudflare Pages to maintain the zero-spend / staging boundary. |
| **2** | **PostgreSQL Lead Insertion** | `docs/04_implementation/AAA_WS16_CAP01_Database_and_Identity_Design.md` | Schema DDL defines `public.leads` table with statutory fields and `fn_submit_discovery_lead` stored procedure. | 🟡 **TESTED (MOCK), NOT LIVE** | SQL DDL is production-ready. No live leads exist in cloud PostgreSQL because live credentials remain unprovisioned. |
| **3** | **Lead Retrieval Post-Restart** | Cloudflare Pages Function Isolate | In isolate fallback mode, `leadSequenceCounter` and `idempotencyCache` are in-memory Maps and are wiped when the V8 worker restarts. | 🔴 **NOT IMPLEMENTED IN FALLBACK** | Persistent cross-restart retrieval is mathematically impossible in edge isolate memory alone. It requires active PostgreSQL bindings. |
| **4** | **Atomic Lead Reference Allocation** | `functions/api/discovery-intake.ts`<br/>PostgreSQL Schema | Stored procedure utilizes `NEXTVAL('public.lead_ref_seq_2026')`. Isolate fallback uses in-memory `leadSequenceCounter++`. | 🟢 **IMPLEMENTED & TESTED** | Reference format strictly matches `AAA-LEAD-YYYY-[00001]`. Monotonic increment is guaranteed within an isolate and guaranteed globally in PostgreSQL. |
| **5** | **Database Uniqueness Constraints** | PostgreSQL DDL | DDL defines `CONSTRAINT uq_leads_lead_reference UNIQUE` and `CONSTRAINT uq_leads_idempotency_key UNIQUE`. | 🟢 **IMPLEMENTED IN DDL** | Hard constraints prevent sequence duplication and multiple admissions with identical idempotency keys. |
| **6** | **Transactional Idempotency Enforcement** | `functions/api/discovery-intake.ts` | 24-hour LRU in-memory cache on isolate + transactional `SELECT ... WHERE idempotency_key` in PostgreSQL stored procedure. | 🟢 **IMPLEMENTED & TESTED** | Duplicate submissions return cached response with `isDuplicate: true` and 0 sequence increment (TC-SRV-08). |
| **7** | **HTTP 201 Only After Durable Persistence** | `functions/api/discovery-intake.ts` | When `SUPABASE_URL` is bound, HTTP 201 is emitted **only** if `rpcRes.ok` is true. If RPC fails, HTTP 500 is returned (TC-SRV-12). | 🟢 **IMPLEMENTED IN CODE** | Server-side gate strictly blocks false success on database failure. In isolate fallback, returns 201 after local memory write. |
| **8** | **Truthful UI State on Database Failure** | `src/components/LeadForm.tsx`<br/>`src/components/DemoBookingModal.tsx` | HTTP 500 sets error message; network failure/404 sets amber alert with direct WhatsApp fallback. | 🟢 **IMPLEMENTED & TESTED** | Public forms never display green booking confirmation cards when the backend rejects or drops the request. |
| **9** | **Idempotent Timeout Re-Submission Protection** | `useDiscoveryIntake.ts`<br/>`LeadForm.tsx` | Client preserves `idempotencyKey` across retries. Server recognizes existing key and returns previous record. | 🟢 **IMPLEMENTED & TESTED** | Prevents duplicate admissions queue records if a parent retries following a network drop. |
| **10** | **Distributed Edge Rate Limiting** | `functions/api/discovery-intake.ts` | Implemented via in-memory `rateLimitCache` Map per Cloudflare isolate (5 req / 15 min per `CF-Connecting-IP`). | 🟡 **PARTIALLY IMPLEMENTED** | Protects against rapid flood on a single edge node. Distributed rate limiting across multiple global POPs requires Cloudflare Rate Limiting Rules or KV store. |

---

## 3. Workstream B: Public Form Execution Trace & Hook Bypass

### Actual Execution Trace:
A forensic trace of form submission at commit `6af0c0f` reveals the following execution path:

```
[Parent Submits LeadForm.tsx]
       │
       ├── 1. Client-Side Sanitization (validateSanitizedName)
       ├── 2. Consent Check (serviceConsent === true)
       ├── 3. Honeypot Check (botHoneypot === "")
       ├── 4. INLINE ASYNC FETCH: fetch('/api/discovery-intake', ...) [BYPASSES useDiscoveryIntake]
       │         │
       │         ├── [Success: HTTP 201] --> setAssignedUID, setRedirectSuccess(true), opens WhatsApp
       │         └── [Failure: 404 / 500 / Network Error] --> Displays Amber Offline Alert + WhatsApp Button
       │
       └── [useDiscoveryIntake.ts] is NEVER CALLED.
```

### Critical Audit Finding: Direct Hook Bypass
1. **Architectural Specification (`AAA-S3-PLAN-WS16-01`):** Mandated that `useDiscoveryIntake.ts` be the shared authoritative state machine consumed by all admissions forms.
2. **Current Reality:** Both `LeadForm.tsx` and `DemoBookingModal.tsx` implement their own inline `fetch('/api/discovery-intake')` logic.
3. **Audit Ruling:** **Hook Unification is an unfulfilled functional acceptance requirement**. Leaving `LeadForm.tsx` and `DemoBookingModal.tsx` disconnected from `useDiscoveryIntake` creates technical drift and prevents centralized telemetry, validation, and modal transitions.

---

## 4. Integration Gap: WS-16 Forms Not Yet Opening WS-17 Modals

Although the WS-17 components (`EnquiryReceiptModal.tsx` and `AppointmentConfirmedModal.tsx`) have been built, typed, and unit-tested in `src/components/`, **neither `LeadForm.tsx` nor `DemoBookingModal.tsx` currently renders `EnquiryReceiptModal.tsx` upon receiving an HTTP 201 response!**

- `LeadForm.tsx` currently renders an inline green success block (`#lead-form-success`) with a delayed `window.open(whatsappUrl)`.
- `DemoBookingModal.tsx` currently renders an inline success card.
- **Audit Ruling:** The connection between WS-16 public forms and WS-17 post-submission modals is **unwired in the active UI**. Wiring `EnquiryReceiptModal` into both forms is required to achieve complete milestone integration.
