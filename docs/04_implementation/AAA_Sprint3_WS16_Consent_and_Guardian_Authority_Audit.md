# AAA SPRINT 3 — WS-16 CONSENT AND GUARDIAN AUTHORITY AUDIT
## DPDP Act Section 6 Unbundled Consent, Guardian Self-Declaration & Privacy Readiness Audit

**Document Reference:** `AAA-S3-AUD-WS16-CONSENT-01`  
**Phase:** Stage 4 — Sprint 3 Privacy Readiness Audit  
**Audit Scope:** Public UI Forms (`LeadForm.tsx`, `DemoBookingModal.tsx`) & Ingestion Payload  
**Statutory Framework:** Digital Personal Data Protection (DPDP) Act 2023 (Section 6 & 8)  
**Compliance Lead:** Nitin Patil (Operations & Tech Lead)  
**Academic Lead:** Neha Patil (Academic Director)  
**Current Branch:** `feat/sprint3-integration` (HEAD: `89c4323`)  
**Production Status:** 🔒 **STRICTLY LOCKED** (`main` at `a21a3d1129cc17fc6650bfd04648eb91199e6fa8`)  
**Date:** 05 November 2026  
**Audit Classification:** 🟢 **DPDP-ALIGNED PRIVACY READINESS (STAGING VERIFIED)**

---

## 1. Statutory Clarification & Classification Notice

> [!IMPORTANT]
> **Legal Classification Standard:**
> This feature is classified as **DPDP-Aligned Privacy Readiness (Staging Implementation)**. The presence of compliant checkboxes in a React user interface does **NOT** constitute formal statutory compliance certification. Statutory certification requires final gazetting of Central Government DPDP Rules, formal data fiduciary registration, and external statutory legal audit.

---

## 2. Unbundled Consent Audit Checklist

| Consent Requirement | Implementation Evidence in Code | Verification Status | Audit Finding |
| :--- | :--- | :---: | :---: |
| **1. Unbundling: Service vs Marketing Separation** | Form renders two distinct, unlinked checkboxes: (1) Mandatory service coordination consent, (2) Optional marketing insights. | 🟢 **PASS** | Verified in both `LeadForm.tsx` and `DemoBookingModal.tsx`. Bundled consent eliminated. |
| **2. Default State: Marketing Unticked** | `marketingConsent` initialized to `false` in `useDiscoveryIntake.ts`, `LeadForm.tsx`, and `DemoBookingModal.tsx`. | 🟢 **PASS** | Pre-ticked marketing checkboxes are strictly prohibited and verified absent. |
| **3. Marketing Refusal Does Not Block Enquiry** | Submission handler tests `serviceConsent === true` only. `marketingConsent: false` proceeds with HTTP 200. | 🟢 **PASS** | Parents can complete a discovery session booking while explicitly refusing all marketing. |
| **4. Exact Consent Wording & Purpose Limitation** | Service text: *"I consent to receiving Discovery Session scheduling messages via WhatsApp / SMS from Arnav Abacus Academy."* | 🟢 **PASS** | Wording specifies purpose (scheduling), medium (WhatsApp/SMS), and entity (AAA). |
| **5. Timestamp & Audit Capture** | `serviceConsentTimestamp` and `marketingConsentTimestamp` captured in `LeadConsentRecord` (ISO 8601 UTC). | 🟢 **PASS** | Staged in `src/types/privacy.ts` and `src/lib/privacyRetentionEngine.ts`. |
| **6. Guardian Authority Representation** | Checkbox affirms legal authority: *"Parent/guardian authority confirmed."* | 🟡 **CLARIFIED** | **Self-Declaration Only.** Not an independently verified identity (no Aadhaar, OTP, or birth certificate). Must not be represented as verified identity. |
| **7. Consent Withdrawal Protocol** | On-demand parent Right-to-Erasure (< 24h SLA) implemented in `processRightToErasure()`. | 🟢 **PASS** | Parents can revoke consent via written request or WhatsApp STOP trigger. |

---

## 3. Guardian Authority Audit: Self-Declaration vs Verified Identity

Section 8 of the DPDP Act 2023 mandates that processing a child's personal data requires verifiable consent of the parent or lawful guardian.

### Critical Audit Finding:
- In the public intake forms (`LeadForm.tsx` and `DemoBookingModal.tsx`), the field `parentGuardianConfirmed: boolean` is an **affirmative user self-declaration**.
- The system currently has **NO** third-party biometric, DigiLocker, Aadhaar e-KYC, or SMS OTP mechanism to verify that the person filling the form is indeed the lawful guardian of the named minor.
- **Remediation & Phrasing Mandate:**
  - The system must label this field strictly as: *"Guardian Self-Declaration Affirmation"*.
  - It must **NEVER** claim or advertise that *"Guardian Identity is Independently Verified"* at the prospective inquiry stage.
  - Physical verification occurs on-site at the Wakad center during the offline discovery session where the parent personally accompanies the child.

---

## 4. Privacy Readiness Audit Summary

| Metric | Status | Evaluation |
| :--- | :---: | :--- |
| **Consent Unbundling** | 100% | Full separation between service and promotional streams. |
| **Default Opt-In Avoidance** | 100% | Zero pre-checked boxes. |
| **Guardian Affirmation** | Self-Declared | Stated clearly as self-declaration; physical verification on-site. |
| **Statutory Certification** | Pending Rules | Subject to final Central Government DPDP Rules gazette. |
