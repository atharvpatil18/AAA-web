# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-16 VERIFICATION
## Document Reference: `AAA-WS16-VERIF-CONSENT-01`
### Deliverable 4: Consent Governance, Guardian Authority & Offline Fallback Verification Report

**Document Version:** 1.0.0  
**Audit Date:** 05-November-2026  
**Governing Audit Baseline:** `AAA-S3-REG-WS16-AUDIT-FINAL-01`  
**Governing Determination:** `MGT-DET-S4-S3-AUTH-02`  
**Inspected Commit:** `51b7322` on branch `feat/sprint3-integration`  
**Production Status:** STRICTLY LOCKED (`a21a3d1129cc17fc6650bfd04648eb91199e6fa8`)  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Executive Summary & Verification Purpose

This report evaluates compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act) regarding unbundled consent, guardian authority self-declaration, and offline network failure handling across `functions/api/discovery-intake.ts`, `src/hooks/useDiscoveryIntake.ts`, `src/components/LeadForm.tsx`, and `src/components/DemoBookingModal.tsx`.

A critical audit requirement is verifying that **successful enquiry acknowledgements are presented to parents strictly upon confirmed server-side persistence**, and that offline fallback routes (such as WhatsApp) are never misrepresented as completed CRM registrations.

---

## 2. Findings & Classification Matrix

| Dimension | Evaluated Requirement | Technical Observation | Formal Classification |
| :--- | :--- | :--- | :---: |
| **Service Consent Unbundling** | Required, distinct instrument | Separate checkbox; mandatory for submission. | **PASS** |
| **Marketing Consent Default** | Optional, unticked by default | Default state `marketingConsent = false`; optional. | **PASS** |
| **Server Consent Validation** | Reject missing service consent | Returns `HTTP 422 Unprocessable Entity`. | **PASS** |
| **Guardian Authority Designation**| `Guardian Authority Self-Declaration`| Explicitly declared; not represented as verified identity. | **PASS** |
| **Consent DB Persistence** | Immutable cryptographic audit record | State discarded upon isolate teardown; no DB write. | **NOT IMPLEMENTED** |
| **Marketing Suppression Engine** | Automated exclusion list query | Documented in policy; not implemented in live code. | **NOT IMPLEMENTED** |
| **Offline Fallback UI Behavior** | No false success on network drop | `useDiscoveryIntake` marks `SUCCESS` on local fallback! | **FAIL (Defect)** |
| **Component Hook Wiring** | `LeadForm` & `DemoModal` use hook | Components call `processDiscoveryIntake` directly! | **FAIL (Bypass)** |
| **WhatsApp Direct Fallback Link**| Verified phone link generation | Generates `https://wa.me/919021924968` to Neha Patil. | **PASS** |
| **WhatsApp Registration Claim** | Transparent status disclosure | Offline WhatsApp route does not create CRM lead. | **PASS (Visual Warning Needed)** |

---

## 3. Consent Governance & DPDP Act Alignment

### 3.1 Service vs. Marketing Consent Wording
* **Service Consent:**
  > *"I consent to receiving Discovery Session scheduling messages via WhatsApp / SMS from Arnav Abacus Academy."*
  - **Status:** Required. If unchecked, form submission is disabled on client and rejected with HTTP 422 on server.
* **Marketing Consent:**
  > *"Keep me updated on upcoming math workshops, holiday camps, Olympiad seminars, and educational tips from Neha Patil."*
  - **Status:** Optional. Checkbox remains unticked by default across all forms.
* **Guardian Authority Self-Declaration:**
  > *"I confirm that I am the parent or legal guardian of the child named above."*
  - **Status:** Mandatory legal warranty under Section 9 DPDP Act 2023. Explicitly recorded as `Guardian Authority Self-Declaration`. Physical documentary verification occurs in-person at Adv. Balaji Sagar Bungalow, Wakad.

### 3.2 Server-Side Consent Enforcement Evidence
In `functions/api/discovery-intake.ts` lines 252–274:
- Missing `parentGuardianConfirmed` triggers:
  ```json
  { "statusCode": 422, "success": false, "error": "Guardian Authority Self-Declaration is mandatory under Section 9 DPDP Act 2023." }
  ```
- Missing `serviceConsent` triggers:
  ```json
  { "statusCode": 422, "success": false, "error": "Service communication consent is required to coordinate diagnostic assessment." }
  ```
- Verified passing in `TC-SRV-04` and `TC-SRV-05`.

---

## 4. Critical Defect: Premature Success Acknowledgement on Offline Fallback

### 4.1 Code Inspection: `src/hooks/useDiscoveryIntake.ts`
Lines 256–275 contain the following logic:
```typescript
// If server endpoint is unreachable or returns 404:
if (!response) {
  // Fall back to client-side simulated engine
  response = processDiscoveryIntake(payload);
}

setGatewayResponse(response);

// CRITICAL DEFECT:
if ((response.statusCode === 200 || response.statusCode === 201) && response.success) {
  setStatus('SUCCESS');
  setLeadUID(response.leadReference || response.leadUID || null);
  onSuccess?.(response);
  return response;
}
```

### 4.2 Defect Impact & Failure Mode:
1. When a parent attempts submission on a flaky mobile network, or when running the static Vite production build where `/api/discovery-intake` returns 404:
2. The hook catches the error and executes `processDiscoveryIntake(payload)` in browser RAM.
3. `processDiscoveryIntake` returns `{ statusCode: 200, success: true, leadUID: 'AAA-LEAD-2026-00001' }`.
4. The hook transitions to `status = 'SUCCESS'`, triggering the parent UI to display:
   > *"Discovery Session Confirmed! Your Lead Reference is AAA-LEAD-2026-00001."*
5. **Operational Disaster:** The parent believes their appointment is booked and attends the Wakad center, but **zero data reached the academy or admissions staff**.
6. **Mandatory Rule Violation:**
   > *"A successful enquiry acknowledgement must be shown only after confirmed server persistence."*

---

## 5. Architectural Gap: Component Wiring Bypass

Inspection of `src/components/LeadForm.tsx` and `src/components/DemoBookingModal.tsx` revealed an unexpected bypass:
1. `useDiscoveryIntake.ts` was authored in `src/hooks/`, tested in `useDiscoveryIntake.test.ts`, and enhanced with server fetch logic.
2. **However, neither `LeadForm.tsx` nor `DemoBookingModal.tsx` imports or uses `useDiscoveryIntake`!**
3. In `LeadForm.tsx` line 12:
   ```typescript
   import { processDiscoveryIntake } from "../lib/intakeGatewayEngine";
   ...
   const gatewayRes = processDiscoveryIntake(gatewayPayload);
   ```
4. In `DemoBookingModal.tsx` line 11:
   ```typescript
   import { processDiscoveryIntake, sanitizeStringInput } from "../lib/intakeGatewayEngine";
   ...
   const gatewayResponse = processDiscoveryIntake(payload);
   ```
5. **Finding:** The live public user interface **never issues an HTTP network request to `/api/discovery-intake` at all**. It executes strictly within the browser memory via the legacy simulated engine.

---

## 6. WhatsApp Fallback Link Analysis

* **Link Structure:**
  `https://wa.me/919021924968?text=Hello%20Neha%20Patil...`
* **Verification:** The telephone number `+91 90219 24968` matches Neha Patil's verified director telephone in the documentary register.
* **Registration Status:** The WhatsApp link opens a chat tab on the parent's phone. It does not communicate with AcademyOS or CRM.
* **Remediation Requirement:** The UI must display an explicit note: *"WhatsApp booking connects you directly with Neha Patil via chat. It does not automatically register an online portal record until confirmed by staff."*

---

## 7. Sign-Off & Verification Block

| Governance Role | Name | Designation | Signature Status | Date |
| :--- | :--- | :--- | :--- | :--- |
| **Privacy Auditor** | Data Protection Officer | DPDP & Compliance Audit | Verified | 05-Nov-2026 |
| **Operations & Compliance** | Nitin Patil | Operations, Tech & Compliance Director | Pending Formal Review | [Pending] |
| **Academic & Admissions** | Neha Patil | Founder & Academic Director | Pending Formal Review | [Pending] |
