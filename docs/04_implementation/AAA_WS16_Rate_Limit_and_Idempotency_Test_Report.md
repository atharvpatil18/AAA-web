# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-16 VERIFICATION
## Document Reference: `AAA-WS16-RPT-RATELIMIT-01`
### Deliverable 3: Edge Rate Limiting, Trusted IP Extraction & Idempotency Test Report

**Document Version:** 1.0.0  
**Audit Date:** 05-November-2026  
**Governing Audit Baseline:** `AAA-S3-REG-WS16-AUDIT-FINAL-01`  
**Governing Determination:** `MGT-DET-S4-S3-AUTH-02`  
**Inspected Commit:** `51b7322` on branch `feat/sprint3-integration`  
**Production Status:** STRICTLY LOCKED (`a21a3d1129cc17fc6650bfd04648eb91199e6fa8`)  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Summary & Verification Purpose

This report audits the rate-limiting, IP-extraction, header-spoofing defense, and idempotency mechanisms implemented in `functions/api/discovery-intake.ts` under commit `51b7322`.

The objective is to establish whether the reported threshold of **5 requests per 15 minutes** represents a durable, tamper-proof security perimeter or an ephemeral in-memory filter.

---

## 2. Technical Findings & Security Classification

| Security Dimension | Evaluated Mechanism | Technical Observation | Formal Classification |
| :--- | :--- | :--- | :---: |
| **Ingress Rate Limit Threshold**| 5 requests / 15 minutes | Enforced in code: permits 5 requests, blocks 6th with HTTP 429. | **PASS** |
| **Retry-After Header** | RFC 7231 `Retry-After` | Returns numeric seconds until window expiration (e.g., `Retry-After: 900`). | **PASS** |
| **Trusted IP Extraction** | `extractClientIp()` | Prioritizes `CF-Connecting-IP`, falls back to `X-Forwarded-For[0]`, then `127.0.0.1`. | **PASS (Specification)** |
| **Counter Storage Engine** | `rateLimitCache` | Stored in JavaScript `Map<string, RateLimitBucket>` in RAM. | **NOT IMPLEMENTED (Durable)** |
| **Distributed Multi-PoP Sync** | Global rate limiting across edge | Counters are isolated to single V8 isolates; zero cross-node synchronization. | **FAIL** |
| **Persistence Across Restarts**| State preservation | Restarting worker process completely wipes all rate-limit counters. | **NOT IMPLEMENTED** |
| **Direct Header Spoofing** | Untrusted ingress without Cloudflare | If accessed directly without Cloudflare WAF termination, client can forge `CF-Connecting-IP`. | **FAIL (Direct Ingress)** |
| **Platform vs Application WAF**| Defense in depth | Relies solely on application JavaScript; Cloudflare WAF rate rules unconfigured. | **NOT IMPLEMENTED (Platform)** |
| **Idempotency Deduplication** | `Idempotency-Key` header | Returns cached response on duplicate submission within single process. | **PASS (In-Memory)** |

---

## 3. Trusted IP Extraction & Header Spoofing Analysis

### 3.1 Code Inspection: `extractClientIp`
```typescript
export function extractClientIp(request: Request): string {
  const cfConnectingIp = request.headers.get('CF-Connecting-IP');
  if (cfConnectingIp && cfConnectingIp.trim() !== '') {
    return cfConnectingIp.trim();
  }

  const xForwardedFor = request.headers.get('X-Forwarded-For');
  if (xForwardedFor && xForwardedFor.trim() !== '') {
    const firstIp = xForwardedFor.split(',')[0].trim();
    if (firstIp) return firstIp;
  }

  return '127.0.0.1';
}
```

### 3.2 Vulnerability Assessment:
1. **Behind Authentic Cloudflare Proxy:**
   When deployed on Cloudflare Pages, Cloudflare's edge proxy strips any client-supplied `CF-Connecting-IP` header and sets it to the actual TCP socket connection IP. In this environment, `extractClientIp` is secure and tamper-proof.
2. **Outside Cloudflare Proxy (Local Dev / Direct Node / Emulated Host):**
   In any environment where requests do not pass through Cloudflare's managed edge, an attacker can bypass rate limiting indefinitely by simply generating an arbitrary IP on each request:
   ```bash
   curl -X POST https://api.arnavabacus.com/api/discovery-intake \
     -H "CF-Connecting-IP: 10.0.0.$i" \
     -d '{"parentName":"Spam", ...}'
   ```
   Every request is treated as a unique client, bypassing the 5-request limit entirely.

---

## 4. Rate Limiting Execution & Test Evidence

### 4.1 Test Execution Evidence (`TC-SRV-09`)
In `functions/api/discovery-intake.test.ts`, the rate limiter was flooded with 6 sequential requests from IP `198.51.100.77`:
```
Running TC-SRV-09: Trusted IP Edge Rate Limiting Enforcement...
- Request #1 from 198.51.100.77 -> HTTP 201 Created (Allowed)
- Request #2 from 198.51.100.77 -> HTTP 201 Created (Allowed)
- Request #3 from 198.51.100.77 -> HTTP 201 Created (Allowed)
- Request #4 from 198.51.100.77 -> HTTP 201 Created (Allowed)
- Request #5 from 198.51.100.77 -> HTTP 201 Created (Allowed)
- Request #6 from 198.51.100.77 -> HTTP 429 Too Many Requests (Blocked)
  Header: Retry-After: 900
  Body: {"statusCode":429,"success":false,"error":"Rate limit exceeded. Maximum 5 submissions permitted per 15 minutes.","retryAfterSeconds":900,"message":"Too Many Requests"}
✅ TC-SRV-09 Passed: Server boundary permits 5 requests and blocks 6th with HTTP 429.
```

### 4.2 Failure Modes in Distributed Production:
While `TC-SRV-09` passes in a single-process Node.js test runner, in production:
- **Cloudflare Edge Fleet:** Cloudflare operates 330+ data centers globally. A parent in Pune might hit the Pune edge node, while another inquiry hits Mumbai. Each edge node maintains its own independent RAM `Map`.
- **Bot Attack Distribution:** A bot distributed across multiple IPs or rotating through multiple Cloudflare PoPs can submit hundreds of inquiries without ever triggering the 5-request threshold on any individual isolate.
- **Production Standard:** An in-memory JavaScript `Map` **cannot be accepted as an enterprise-grade production security control**.

---

## 5. Idempotency Key Handling & Cache Evaluation

### 5.1 Test Evidence (`TC-SRV-08`)
In `functions/api/discovery-intake.test.ts`:
- First request with `Idempotency-Key: cf-idem-test-uuid-999` returned `HTTP 201 Created` with reference `AAA-LEAD-2026-00001`.
- Immediate re-submission with the exact same key returned `HTTP 201 Created` with identical reference `AAA-LEAD-2026-00001` without incrementing the counter.
- Test verified passing within the same running process.

### 5.2 Durability Gap:
Because `idempotencyCache` is an in-memory `Map`, network retransmissions that hit a fresh worker isolate or occur after an isolate recycle will encounter a cache miss, resulting in duplicate inquiry creation.

---

## 6. Architectural Remediation Recommendations

1. **Layer 1 (Perimeter DDoS & Bot Rate Limiting):**
   Configure Cloudflare WAF Rate Limiting Rule at the DNS/Zone level (5 requests per 15 minutes per IP), terminating floods at Cloudflare L7 before hitting application code.
2. **Layer 2 (Application-Level Distributed Rate Limiting):**
   Integrate **Upstash Redis** (via `@upstash/ratelimit` over HTTP/REST) or Cloudflare Workers KV to store rate-limit counters with atomic sliding-window TTL across all edge nodes.
3. **Layer 3 (Database Idempotency):**
   Persist idempotency keys in PostgreSQL (`public.leads.idempotency_key UNIQUE`), relying on database transactional constraints to prevent duplicate insertions across all regions.

---

## 7. Sign-Off & Verification Block

| Governance Role | Name | Designation | Signature Status | Date |
| :--- | :--- | :--- | :--- | :--- |
| **Security Auditor** | Application Security Specialist | Ingress & Perimeter Audit | Verified | 05-Nov-2026 |
| **Operations & Compliance** | Nitin Patil | Operations, Tech & Compliance Director | Pending Formal Review | [Pending] |
| **Academic & Admissions** | Neha Patil | Founder & Academic Director | Pending Formal Review | [Pending] |
