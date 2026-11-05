# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-16
## Document Reference: `AAA-WS16-CAP01-MAT-TEST-01`
### Deliverable 4: CAP-WS16-01 Test & Acceptance Matrix

**Document Version:** 1.0.0  
**Planning Date:** 05-November-2026  
**Governing Authority:** `MGT-DET-S4-S3-AUTH-02`  
**Governing Audit Reference:** `AAA-S3-REG-WS16-AUDIT-FINAL-01` & `AAA-WS16-REC-FINAL-01`  
**Inspection Baseline Snapshot:** Commit `51b7322` on branch `feat/sprint3-integration`  
**Production Status:** 🔒 **STRICTLY LOCKED** (`a21a3d1129cc17fc6650bfd04648eb91199e6fa8`)  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Summary & Purpose

This matrix defines the 15 binding acceptance test cases required to verify **CAP-WS16-01** across Gates 1, 2, and 3.

Every test case specifies the exact input condition, expected system behavior, assertion criteria, accountable tester, and required documentary evidence. Implementation authorization shall not transition to closure until all 15 test cases achieve **100% PASS** status.

---

## 2. Comprehensive Test & Acceptance Matrix (15 Acceptance Tests)

| Test ID | Gate | Focus Area | Test Input / Action Vector | Expected System Behavior & Strict Assertion Criteria | Evidence Required | Status |
| :---: | :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-CAP-01** | **Gate 1** | **Elimination of False Offline Success** | Submit form while network is disabled or endpoint returns HTTP 404. | Hook catches error; status transitions to `NETWORK_OFFLINE_ERROR`; `isSuccess` remains `false`; `leadUID` is `null`; UI displays transparent retry message and WhatsApp fallback button. Zero fake booking confirmation card rendered. | Console log assertion; visual UI error screenshot. | 🟡 PENDING AUTH |
| **TC-CAP-02** | **Gate 1** | **Server-Confirmed Success Condition** | Server returns HTTP 201 with `{ id: "uuid", leadReference: "AAA-LEAD-2026-00001" }`. | Status transitions to `SERVER_CONFIRMED`; `isSuccess` is `true`; `leadUID` is `AAA-LEAD-2026-00001`; UI displays official appointment confirmation card. | Unit test assertion; mock fetch response log. | 🟡 PENDING AUTH |
| **TC-CAP-03** | **Gate 1** | **Server Input Rejection (HTTP 400/422)** | Server rejects request due to invalid phone or missing consent. | Status transitions to `SERVER_REJECTED`; `errorMessage` surfaces exact server error; form inputs remain populated for user correction. | HTTP 400/422 payload assertion. | 🟡 PENDING AUTH |
| **TC-CAP-04** | **Gate 1** | **Rate Limiting Throttling (HTTP 429)** | 6th submission from same IP triggers HTTP 429 with `Retry-After: 900`. | Status transitions to `RATE_LIMITED`; live countdown timer begins at 900 seconds; submit button disabled until timer elapses. | Countdown timer state tick assertion. | 🟡 PENDING AUTH |
| **TC-CAP-05** | **Gate 1** | **Idempotent Retry After Timeout** | Network times out (>10s); user clicks "Retry Submission". | Hook re-transmits the **exact same `idempotencyKey`** generated in the first attempt; server deduplicates or completes initial insert safely. | Request header `Idempotency-Key` comparison. | 🟡 PENDING AUTH |
| **TC-CAP-06** | **Gate 1** | **WhatsApp Fallback Routing & Disclosure** | Click "Connect via Official WhatsApp" button. | Opens `https://wa.me/919021924968` with pre-filled inquiry text; UI displays explicit disclosure that chat does not automatically register portal record. | URI decode test; DOM text inspection. | 🟡 PENDING AUTH |
| **TC-CAP-07** | **Gate 2** | **LeadForm.tsx Real HTTP Dispatch** | Submit homepage inquiry form. | Component delegates to `useDiscoveryIntake`; global `fetch` spy verifies real `POST /api/discovery-intake` call was dispatched (zero direct engine calls). | Vitest / Jest spy on `window.fetch`. | 🟡 PENDING AUTH |
| **TC-CAP-08** | **Gate 2** | **DemoBookingModal Real HTTP Dispatch** | Submit modal booking form. | Component delegates to `useDiscoveryIntake`; global `fetch` spy verifies real `POST /api/discovery-intake` call was dispatched with modal course payload. | Vitest / Jest spy on `window.fetch`. | 🟡 PENDING AUTH |
| **TC-CAP-09** | **Gate 2** | **Unbundled Dual Consent Blocking** | Form submitted with `serviceConsent = false`. | Client-side validation blocks submit; if bypassed, server returns HTTP 422; submission aborted. | Form submit event cancellation check. | 🟡 PENDING AUTH |
| **TC-CAP-10** | **Gate 2** | **Invisible Honeypot Integration** | Bot populates invisible `website_url_hp` field. | Payload contains filled honeypot; server intercepts and returns synthetic 200 without writing to database. | Gateway response `isBotDropped === true`. | 🟡 PENDING AUTH |
| **TC-CAP-11** | **Gate 3** | **Durable Supabase PostgreSQL Insert** | Valid payload submitted to server endpoint. | Endpoint executes `fn_submit_discovery_lead` in Supabase; database writes record to `public.leads`; returns confirmed UUID & `leadReference`. | PostgreSQL row query; SELECT verification. | 🟡 PENDING AUTH |
| **TC-CAP-12** | **Gate 3** | **Monotonic Sequential Numbering** | Submit Lead A then Lead B sequentially. | Lead A allocated `AAA-LEAD-2026-00001`; Lead B allocated strictly `AAA-LEAD-2026-00002` via PostgreSQL `NEXTVAL`. | DB reference comparison. | 🟡 PENDING AUTH |
| **TC-CAP-13** | **Gate 3** | **Distributed Concurrency Atomic Safety** | 10 simulated concurrent requests submitted simultaneously. | All 10 requests receive unique, sequential reference numbers ($00001$ to $00010$); zero collisions or race condition errors. | Parallel Promise.all test log. | 🟡 PENDING AUTH |
| **TC-CAP-14** | **Gate 3** | **24-Hour Idempotency Cache Protection** | Re-submit exact same payload and idempotency key after 5 minutes. | Stored procedure matches `idempotency_key`, returns original record with `isDuplicate: true`; sequence counter does not increment. | DB row count check (remains 1). | 🟡 PENDING AUTH |
| **TC-CAP-15** | **Gate 3** | **Database Failure / Rollback Handling** | Supabase connection drops or transaction aborts. | Server catches error, returns HTTP 500; zero orphaned sequence consumption; client hook displays retry state. | Simulated DB 500 response test. | 🟡 PENDING AUTH |

---

## 3. Test Execution Commands & Environment Setup

Upon management authorization of implementation:
1. **Frontend Unit & Hook Tests:**
   ```bash
   node node_modules/tsx/dist/cli.mjs src/hooks/useDiscoveryIntake.test.ts
   ```
2. **Server-Side Gateway & Persistence Mock Tests:**
   ```bash
   node node_modules/tsx/dist/cli.mjs functions/api/discovery-intake.test.ts
   ```
3. **Full Regression Suite (WS-12 to WS-16):**
   ```bash
   node node_modules/tsx/dist/cli.mjs src/lib/discoveryEngine.test.ts
   node node_modules/tsx/dist/cli.mjs src/lib/crmStateMachine.test.ts
   node node_modules/tsx/dist/cli.mjs src/lib/privacyRetentionEngine.test.ts
   node node_modules/tsx/dist/cli.mjs src/lib/intakeGatewayEngine.test.ts
   ```

---

## 4. Sign-Off & Verification Block

| Governance Role | Name | Designation | Signature Status | Date |
| :--- | :--- | :--- | :--- | :--- |
| **QA Lead** | Senior Test Automation Engineer | Testing & Acceptance | Verified & Submitted | 05-Nov-2026 |
| **Operations & Compliance** | Nitin Patil | Operations, Tech & Compliance Director | Pending Formal Review | [Pending] |
| **Academic & Admissions** | Neha Patil | Founder & Academic Director | Pending Formal Review | [Pending] |
