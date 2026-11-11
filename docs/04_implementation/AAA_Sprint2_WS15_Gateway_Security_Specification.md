# AAA SPRINT 2 — WS-15 GATEWAY SECURITY SPECIFICATION
## Intake Gateway, Rate Limiting & Input Sanitization Specification

**Document Reference:** `AAA-S2-SPEC-WS15-01`  
**Phase:** Stage 4 — Sprint 2 Specification (WS-15 Intake Gateway)  
**Governing Baseline:** `MGT-DET-S4-S2-PLAN-06`, `AAA-S2-ARCH-WS15-01`  
**Target Determination:** `MGT-DET-S4-S2-AUTH-04`  
**System Architect & Compliance Lead:** Nitin Patil (Operations & Tech Lead)  
**Academic Lead:** Neha Patil (Academic Director)  
**Active Feature Branch:** `feat/sprint2-admissions` (HEAD: `7178337`)  
**Production Status:** 🔒 **STRICTLY LOCKED** (`main` untouched at `a21a3d1`)  
**Date:** 04 November 2026  
**Status:** 🟡 **SUBMITTED FOR MANAGEMENT IMPLEMENTATION AUTHORIZATION**

---

## 1. Executive Mission & Security Invariants

The **AAA Intake Gateway** processes public web discovery requests from `LeadForm.tsx` and `DemoBookingModal.tsx`. It acts as the perimeter security layer enforcing input sanitization, anti-abuse defenses, rate limiting, and zero-PII data isolation.

---

## 2. Payload Schema & Validation Rules

### Ingestion Schema (`/api/v1/leads/discovery`):
```typescript
interface DiscoveryIntakePayload {
  parentName: string;            // Min 2, max 60 chars. Allowed: letters, spaces, dots, hyphens
  parentPhone: string;           // Strict 10-digit Indian mobile (starts with 6, 7, 8, 9)
  parentEmail?: string;          // Optional: RFC 5322 regex validation
  childAgeBracket: string;       // Categorical: '4.5-6' | '7-9' | '10-14'
  courseInterest: string;        // 'abacus' | 'vedic' | 'mental-math' | 'school-math' | 'olympiad'
  serviceConsent: boolean;       // Mandatory: MUST be true
  marketingConsent: boolean;     // Optional: boolean
  parentGuardianConfirmed: boolean; // Mandatory: MUST be true
  website_url_hp?: string;       // Hidden honeypot field. MUST be empty
}
```

### Validation Matrix:
1. **`parentName`:** Regex `^[a-zA-Z\s\.\'\-]{2,60}$`. Strings containing `<`, `>`, `"`, `'`, `/` are stripped or rejected.
2. **`parentPhone`:** Non-digit characters removed; tested against `^[6-9]\d{9}$`. Length must equal exactly 10.
3. **`childAgeBracket`:** Strict enumeration: `['4.5-6', '7-9', '10-14']`. Arbitrary values rejected.
4. **`courseInterest`:** Strict enumeration: `['abacus', 'vedic', 'mental-math', 'school-math', 'olympiad']`.

---

## 3. Anti-Formula Injection & XSS Sanitization

### Threat Model:
When administration exports CRM leads to CSV or Excel for batch scheduling, malicious formulas injected into text fields can execute arbitrary code on admin workstations (CSV / Formula Injection).

### Defensive Enforcement Rules:
1. **Leading Formula Characters:** If any string field starts with `=`, `+`, `-`, `@`, `\t`, or `\r`, the leading character is either stripped or escaped with a prepended single apostrophe (`'`).
2. **HTML / Script Stripping:** All string fields undergo tag stripping removing `<script>`, `<iframe>`, `<img>`, `onerror`, `onload`, and javascript pseudo-protocols.

```typescript
export function sanitizeStringInput(value: string): string {
  if (!value) return '';
  let sanitized = value.trim();

  // Strip dangerous HTML/script tags
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  // Guard against CSV/Excel formula injection
  const formulaChars = ['=', '+', '-', '@', '\t', '\r'];
  if (formulaChars.some(char => sanitized.startsWith(char))) {
    sanitized = "'" + sanitized;
  }

  return sanitized;
}
```

---

## 4. Honeypot Anti-Bot Mechanism

1. **DOM Implementation:** A hidden input field named `website_url_hp` is placed in the form.
2. **CSS Invisibility:** Styled with `display: none !important; opacity: 0; position: absolute; left: -9999px;` and `tabIndex={-1}`.
3. **Bot Trap Logic:**
   - Real parents will not see or fill this input.
   - Automated scrapers and bot scripts fill all discovered input fields.
   - If `payload.website_url_hp` is non-empty, the gateway returns synthetic HTTP 200 `{ success: true, leadUID: "SYNTH-DROP-BOT" }`.
   - The bot receives a success response, but zero records are stored, zero WhatsApp alerts are sent, and zero CRM resources are consumed.

---

## 5. Rate Limiting & Abuse Prevention

1. **IP Rate Limit:** 5 requests per IP address within a rolling 15-minute window.
2. **Exceeded Response:** HTTP 429 Too Many Requests:
   ```json
   {
     "success": false,
     "statusCode": 429,
     "error": "Submission rate limit exceeded. Please wait 15 minutes before submitting again.",
     "retryAfterSeconds": 900
   }
   ```
3. **Body Size Bound:** Maximum 16 KB payload limit.

---

## 6. Idempotency & Duplicate Suppression

1. **Idempotency Key:** Client provides an `X-Idempotency-Key` header (UUIDv4). If a request with the same key arrives within 60 minutes, the gateway returns the cached response without creating a duplicate lead.
2. **Duplicate Alert Suppression:** If identical `parentPhone` and `courseInterest` arrive within 180 seconds from different keys (e.g. repeated button clicks), the submission succeeds with existing lead UID, but duplicate notification dispatch is suppressed.

---

## 7. Offline Resilience & WhatsApp Direct Link Fallback

If network connectivity fails completely:
1. The client caches the unsubmitted payload in `sessionStorage` (15 min TTL).
2. The UI surfaces a direct 1-click fallback button opening WhatsApp Web / App:
   ```text
   https://wa.me/919021924968?text=Hello%20Neha%20Patil,%20I%20would%20like%20to%20book%20a%20Discovery%20Session%20for%20Abacus%20Mathematics%20at%20AAA%20Wakad.
   ```
3. Guarantees zero lost parent discovery inquiries during mobile network drops.
