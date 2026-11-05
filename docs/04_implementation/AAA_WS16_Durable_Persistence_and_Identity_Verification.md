# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-16 VERIFICATION
## Document Reference: `AAA-WS16-VERIF-PERSIST-01`
### Deliverable 2: Durable Persistence, Identity Tiering & Atomic Sequence Verification Report

**Document Version:** 1.0.0  
**Audit Date:** 05-November-2026  
**Governing Audit Baseline:** `AAA-S3-REG-WS16-AUDIT-FINAL-01`  
**Governing Determination:** `MGT-DET-S4-S3-AUTH-02`  
**Inspected Commit:** `51b7322` on branch `feat/sprint3-integration`  
**Production Status:** STRICTLY LOCKED (`a21a3d1129cc17fc6650bfd04648eb91199e6fa8`)  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Summary & Problem Scope

Management Determination `MGT-DET-S4-S3-AUTH-02` ratified architectural specification `AAA-WS16-ARCH-ID-01`, which mandated a **Three-Tier Identity Architecture**:
1. Internal System UUID (monotonically indexable primary key).
2. Human-Readable Authoritative Lead Reference (`AAA-LEAD-YYYY-[00001]`) allocated atomically.
3. Network Idempotency Key (UUIDv4) for duplicate submission suppression.

This verification audits the actual implementation on branch `feat/sprint3-integration` (commit `51b7322`) to determine whether durable persistence and atomic allocation are genuinely implemented or merely simulated.

---

## 2. Findings & Classification Matrix

| Identity & Persistence Dimension | Architectural Requirement | Actual Code Implementation in Commit `51b7322` | Verification Classification |
| :--- | :--- | :--- | :---: |
| **Tier 1: System UUID** | UUIDv7 or UUIDv4 Primary Key | Allocated via `crypto.randomUUID()` in `functions/api/discovery-intake.ts` line 279. | **PASS (Simulated)** |
| **Tier 2: Sequence Format** | `AAA-LEAD-YYYY-[00001]` | Formatted as `AAA-LEAD-${currentYear}-${seqPadded}` with 5-digit zero-padding. | **PASS (Format Conformance)** |
| **Tier 2: Atomic DB Sequence** | PostgreSQL `NEXTVAL('lead_ref_seq_2026')` | Simulated via module variable `let leadSequenceCounter = 1`. Zero database sequence exists. | **NOT IMPLEMENTED** |
| **Tier 3: Idempotency Key** | Client UUIDv4 stored in DB/Redis with 24h TTL | In-memory `Map<string, CachedIdempotency>`. Key lookup verified in single-process tests. | **PASS (In-Memory Only)** |
| **Durable Storage Connection** | Supabase PostgreSQL in AWS Mumbai (`ap-south-1`) | Zero database connection string, client, or ORM initialized. | **NOT IMPLEMENTED** |
| **Database Constraints** | `UNIQUE(lead_reference)`, `UNIQUE(idempotency_key)` | Defined in specification `AAA-WS16-ARCH-ID-01` only; not deployed to live database. | **NOT IMPLEMENTED** |
| **Multi-Node Concurrency** | Zero collisions under concurrent distributed traffic | In-memory counter fails across multiple edge PoPs or worker isolates. | **FAIL** |
| **Persistence Across Restarts**| Records survive server/isolate restart | In-memory state is completely wiped on restart or container teardown. | **NOT IMPLEMENTED** |
| **Reliable CRM Retrieval** | Queryable by admissions staff via API/Database | No lookup endpoint or database query implemented. | **NOT IMPLEMENTED** |

---

## 3. Deep-Dive Identity Tier Verification

### 3.1 Tier 1: Internal System UUID
* **Code Location:** `functions/api/discovery-intake.ts` lines 278–282:
  ```typescript
  const systemUUID =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `uuid-${now}-${Math.floor(Math.random() * 1000000)}`;
  ```
* **Evaluation:** When executed in modern Node.js or Cloudflare V8 isolates, `crypto.randomUUID()` produces RFC 4122-compliant 128-bit UUIDv4 values. In test `TC-SRV-06`, the generated UUID was verified (e.g., `0b9de0fe-47c3-459f-a299-43be4a9f9067`).
* **Classification:** **PASS (Ephemeral Allocation)**.

### 3.2 Tier 2: Authoritative Sequential Lead Reference
* **Code Location:** `functions/api/discovery-intake.ts` lines 56 & 284–287:
  ```typescript
  let leadSequenceCounter = 1;
  ...
  const currentYear = new Date(now).getFullYear();
  const seqPadded = String(leadSequenceCounter++).padStart(5, '0');
  const leadReference = `AAA-LEAD-${currentYear}-${seqPadded}`;
  ```
* **Format Conformance:** The output strictly adheres to the mandated pattern `AAA-LEAD-2026-00001`, `AAA-LEAD-2026-00002`, passing regex validation `/^AAA-LEAD-\d{4}-\d{5}$/`.
* **The Atomicity & Concurrency Defect:**
  1. The counter is a JavaScript module-scoped variable executing in local RAM.
  2. In Cloudflare Pages Functions, each request may be handled by an independent worker isolate or different global Anycast edge location.
  3. Every newly spawned isolate starts with `leadSequenceCounter = 1`.
  4. If Parent A in Wakad submits an inquiry handled by Mumbai PoP Isolate #1, and Parent B submits an inquiry handled by Mumbai PoP Isolate #2, **both parents receive `AAA-LEAD-2026-00001`**.
  5. The sequence is neither atomic nor collision-resistant in a distributed environment without a centralized ACID datastore.
* **Classification:** **NOT IMPLEMENTED (Database Level)** / **FAIL (Concurrency Guarantee)**.

### 3.3 Tier 3: Network Idempotency Engine
* **Code Location:** `functions/api/discovery-intake.ts` lines 48–53 & 210–222:
  ```typescript
  const idempotencyCache = new Map<string, CachedIdempotency>();
  ...
  if (idempotencyKey) {
    const cached = idempotencyCache.get(idempotencyKey);
    if (cached && now < cached.expiresAtMs) {
      return new Response(JSON.stringify(cached.response), { status: cached.response.statusCode || 200, headers });
    }
  }
  ```
* **Evaluation:** Within a single running process, `TC-SRV-08` verified that submitting the same `Idempotency-Key` returns the cached response without incrementing the sequence.
* **Limitation:** In production, if the isolate recycles or if retries hit different edge PoPs, the cache misses and duplicates will not be caught.
* **Classification:** **PASS (Single-Process Only)** / **NOT IMPLEMENTED (Distributed Edge)**.

---

## 4. Database Connection & Schema Deployment Audit

A systematic scan of the entire codebase for database client libraries was performed:
```bash
grep -rn "createClient" src/ functions/
grep -rn "@supabase" package.json
grep -rn "postgres://" .env*
```

### Findings:
1. `package.json` contains **zero database drivers or ORMs** (`@supabase/supabase-js`, `pg`, `prisma`, `kysely`, `typeorm` are all absent).
2. No `.env` or configuration file contains a PostgreSQL connection string for AWS Mumbai.
3. The SQL schema defined in `AAA_WS16_Lead_Identity_and_Idempotency_Architecture.md` (`CREATE TABLE public.leads`, `CREATE SEQUENCE lead_ref_seq_2026`) represents an architectural specification only and has not been executed on any live or staging database.
4. **Conclusion:** Durable persistence is completely **NOT IMPLEMENTED**.

---

## 5. Remediation Roadmap for Durable Persistence

To transition from the current in-memory simulation to true durable persistence before production release:
1. **Provision Supabase PostgreSQL:** Commission database schema in AWS Mumbai (`ap-south-1`) including `lead_ref_seq_2026` sequence and `public.leads` table.
2. **Database Connection in Edge Function:** Connect `functions/api/discovery-intake.ts` to Supabase via `@supabase/supabase-js` or direct HTTPS REST RPC (`supabase.rpc('fn_allocate_lead_reference')`).
3. **Transactional Integrity:** Enforce that `HTTP 201 Created` is dispatched only after the PostgreSQL insert transaction successfully commits and returns the confirmed `lead_reference`.

---

## 6. Sign-Off & Verification Block

| Governance Role | Name | Designation | Signature Status | Date |
| :--- | :--- | :--- | :--- | :--- |
| **Database Inspector** | Senior Data Architect | Enterprise Storage & Ingress | Verified | 05-Nov-2026 |
| **Operations & Compliance** | Nitin Patil | Operations, Tech & Compliance Director | Pending Formal Review | [Pending] |
| **Academic & Admissions** | Neha Patil | Founder & Academic Director | Pending Formal Review | [Pending] |
