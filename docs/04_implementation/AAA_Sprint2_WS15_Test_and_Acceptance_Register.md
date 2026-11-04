# AAA SPRINT 2 — WS-15 TEST AND ACCEPTANCE REGISTER
## Intake Gateway, Security & Rate Limiting Test Register

**Document Reference:** `AAA-S2-REG-TEST-WS15-01`  
**Phase:** Stage 4 — Sprint 2 Test Register (WS-15 Intake Gateway)  
**Governing Baseline:** `MGT-DET-S4-S2-PLAN-06`, `AAA-S2-ARCH-WS15-01`, `AAA-S2-SPEC-WS15-01`  
**Target Determination:** `MGT-DET-S4-S2-AUTH-04`  
**System Architect & Compliance Lead:** Nitin Patil (Operations & Tech Lead)  
**Academic Lead:** Neha Patil (Academic Director)  
**Active Feature Branch:** `feat/sprint2-admissions` (HEAD: `7178337`)  
**Production Status:** 🔒 **STRICTLY LOCKED** (`main` untouched at `a21a3d1`)  
**Date:** 04 November 2026  
**Status:** 🟡 **SUBMITTED FOR MANAGEMENT IMPLEMENTATION AUTHORIZATION**

---

## 1. Quality Assurance Objective & Framework

This register defines the 10 automated unit test scenarios for **Workstream 15 (Intake Backend Gateway Architecture)**.

All test assertions execute within [`src/lib/intakeGatewayEngine.test.ts`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/lib/intakeGatewayEngine.test.ts) via `cmd /c "npx tsx src/lib/intakeGatewayEngine.test.ts"`.

---

## 2. Test Case Register (10 Acceptance Tests)

| Test ID | Test Category | Scenario / Assertion Description | Expected Result | Pass Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **`TC-WS15-01`** | Gateway Ingestion | Submit valid discovery intake payload with mandatory consents. | Returns HTTP 200, `success: true`, and generated `leadUID` (`AAA-LEAD-YYYY-XXXX`). | Response contains 200 OK and valid UID format. |
| **`TC-WS15-02`** | Mobile Validation | Submit payload with invalid phone number (e.g., `12345` or `0982201122`). | Gateway rejects submission with HTTP 400 Bad Request. | Returns specific Indian 10-digit mobile validation error. |
| **`TC-WS15-03`** | Anti-Formula Injection | Submit payload with `parentName: "=SUM(A1:A10)"` or `"+cmd|..."`. | Gateway neutralizes formula injection by escaping with a leading apostrophe (`"'=SUM(A1:A10)"`). | Lead saved safely without executable formula risk in CSV exports. |
| **`TC-WS15-04`** | XSS Tag Sanitization | Submit payload with `<script>alert('xss')</script>Neha`. | HTML/script tags stripped entirely, leaving clean text `"Neha"`. | Zero `<` or `>` characters remain in sanitized output. |
| **`TC-WS15-05`** | Honeypot Bot Trap | Submit payload with populated honeypot field `website_url_hp: "https://spam.com"`. | Gateway returns synthetic HTTP 200 with bot marker `SYNTH-DROP-BOT`; zero CRM records saved. | Bot quietly dropped without wasting server resources. |
| **`TC-WS15-06`** | Rate Limiting Enforcement | Dispatch 6 consecutive requests from same client IP within 15-minute window. | First 5 succeed (HTTP 200); 6th request is rejected with HTTP 429 Too Many Requests. | Throws rate limit exception with `retryAfterSeconds: 900`. |
| **`TC-WS15-07`** | Rate Limiter Reset | Simulate rolling window expiration (15 minutes elapsed) for previously throttled IP. | Subsequent request succeeds with HTTP 200. | Rate limit counter cleanly resets after window expiration. |
| **`TC-WS15-08`** | Idempotency Key | Dispatch 2 requests with identical `idempotencyKey`. | Second request returns identical cached response without creating a second lead record. | Exactly 1 lead created; duplicate suppressed. |
| **`TC-WS15-09`** | Duplicate Alert Suppression | Dispatch 2 distinct requests with same phone and course within 180 seconds. | Second request returns HTTP 200 with existing UID, but duplicate notification flag is set to `false`. | Admin notification throttled to prevent spamming. |
| **`TC-WS15-10`** | WhatsApp Offline Fallback | Call fallback URL generator with parent name and course interest. | Generates properly encoded URL: `https://wa.me/919021924968?text=...` with verified phone and greeting. | URI component properly encoded; verified Wakad center contact. |

---

## 3. Compliance & Security Thresholds

1. **Anti-Spam Efficacy:** Honeypot and rate limiter must prevent bot flooding.
2. **Spreadsheet Safety:** Zero possibility of unescaped `=` or `+` formulas entering admin export feeds.
3. **Sandbox Isolation:** Zero live network requests or external webhook dispatches during test execution.
4. **Build & Type Cleanliness:** `tsc --noEmit` and `npm run build` must compile with Exit Code 0.
