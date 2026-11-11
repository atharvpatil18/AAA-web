# ARNAV ABACUS ACADEMY (AAA) — QA-WS-16 HTTPS BROWSER ACCEPTANCE TEST PLAN

**Governing Baseline:** `MGT-DET-S5-REV-1.2.0-ACPT`  
**Governing Gate:** Gate C (WS-16 Admissions Intake Gateway & Durable Persistence)  
**Execution Target:** Deployed Cloudflare Pages Staging Preview URL (`https://<commit-hash>.aaa-web.pages.dev`)  
**Staging Database:** Supabase Mumbai PostgreSQL 17.11 (`ghbjtmfskgcraxafhlch`, AWS `ap-south-1`)  
**Status:** 🟡 **PROPOSED — AWAITING SEPARATE STAGING DEPLOYMENT APPROVAL**  
**Assessment Date:** 2026-11-06 (16:25 IST)  
**Author:** Internal QA Review Team

---

## 1. Test Objectives & Boundaries

This test protocol defines the exact procedure to execute a **deployed, public HTTPS smoke test using a real desktop/mobile web browser**. 

### Strict Boundaries:
1. **Zero Real Parent Contact:** Synthetic data only (`SYNTHETIC-PREVIEW-TEST Parent`).
2. **Zero Notification Dispatch:** Test data must not trigger SMS, WhatsApp, or email notifications to any real parent.
3. **Exact Cleanup Target:** Clean up strictly by unique lead reference or UUID (`DELETE FROM public.leads WHERE lead_reference = '...'`). No wildcard deletions.
4. **No Direct Production Pushes:** Must run exclusively against the isolated Cloudflare preview URL. Production `main` remains locked.

---

## 2. Step-by-Step Test Procedure

### Test Phase 1: TLS & Transport Verification
1. **Navigate to Preview URL:** Open `https://<commit-hash>.aaa-web.pages.dev` in Google Chrome or Mozilla Firefox.
2. **Verify TLS Certificate:**
   - Click the padlock icon in the browser address bar.
   - Confirm connection is secure (`TLS 1.3`, certificate issued by Cloudflare / Google Trust Services / Let's Encrypt).
   - Confirm protocol is strictly `HTTPS`.

### Test Phase 2: Happy-Path Real Browser Submission
1. **Locate Form:** Scroll to the Lead Intake Form on the homepage (`LeadForm.tsx`) or click the "Book Diagnostic Assessment" CTA button to open `DemoBookingModal.tsx`.
2. **Enter Synthetic Test Details:**
   - **Parent Name:** `SYNTHETIC-PREVIEW-TEST Parent`
   - **Mobile Number:** `9822000003`
   - **Child Age Bracket:** Select `7-9 Years (Grade 2–4)`
   - **Course Interest:** Select `Abacus Mathematics`
   - **Parent/Guardian Authority Self-Declaration:** Check mandatory box (`Section 9 DPDP Act 2023`).
   - **Service Communication Consent:** Check mandatory box.
   - **Marketing Updates Consent:** Leave UNCHECKED.
3. **Submit Form:** Click the "Confirm & Reserve Slot" submission button.
4. **Inspect Browser UI:**
   - Form button transitions to "Submitting...".
   - `EnquiryReceiptModal` appears cleanly without page refresh.
   - Official Lead Reference is displayed prominently: format `AAA-LEAD-2026-XXXXX`.
   - Record the allocated lead reference (e.g. `AAA-LEAD-2026-00003`).
   - Verify wording states: *"our academic team will review {childName}'s profile and contact you within two operating hours... to finalize an optimal trial time slot"* (proves no false immediate booking claim).

### Test Phase 3: Negative Test & Failure Handling
1. **Reload Page / Open Fresh Incognito Session:**
2. **Submit Invalid Payload:**
   - Parent Name: `T` (single character — fails 2-character validation).
   - Mobile: `12345` (invalid Indian mobile format).
   - Guardian Confirmation: Unchecked.
3. **Verify UI Assertion:**
   - Form displays validation error inline.
   - Network tab shows either client-side block or HTTP 400 / 422 from `/api/discovery-intake`.
   - `EnquiryReceiptModal` is **NOT** mounted. Zero false success.

### Test Phase 4: Duplicate Submission & Idempotency Check
1. In the same browser session, re-submit the happy-path form with identical parent details and mobile (`9822000003`).
2. **Verify Response:**
   - Gateway returns HTTP 201 with the retained reference (`AAA-LEAD-2026-00003`).
   - Modal displays the same reference without advancing the sequence.

### Test Phase 5: Database Persistence Verification & Targeted Cleanup
1. **Query Database via PostgreSQL Pooler (`psql`):**
   ```sql
   SELECT id, lead_reference, parent_name, mobile_number, course_interest, lifecycle_status, created_at, retention_purge_due_at 
   FROM public.leads 
   WHERE lead_reference = 'AAA-LEAD-2026-00003';
   ```
2. **Verify Attributes:**
   - Exactly 1 row returned.
   - Lead reference matches browser receipt (`AAA-LEAD-2026-00003`).
   - `lifecycle_status = 'ENQUIRY_RECEIVED'`.
   - `retention_purge_due_at = created_at + 90 days`.
3. **Execute Targeted Cleanup:**
   ```sql
   DELETE FROM public.leads WHERE lead_reference = 'AAA-LEAD-2026-00003';
   ```
4. **Confirm Post-Cleanup Zero Residuals:**
   ```sql
   SELECT count(*) FROM public.leads WHERE lead_reference = 'AAA-LEAD-2026-00003';
   ```
   *(Must return 0).*

---

## 3. Evidence Capture & Closure Protocol

Upon completing this test:
1. Export browser Network HAR file or screenshot showing the HTTP 201 response.
2. Save terminal SQL query and cleanup output to:  
   `docs/11_evidence_and_screenshots/WS16_PREVIEW_HTTPS_SMOKE_TEST.log`
3. Update `AAA_STAGE5_OPEN_CONDITIONS_AND_CLOSURE_REGISTER.md`:
   - Transition `QA-WS-16` to 🟢 **CLOSED & SATISFIED**.
4. Submit completion evidence for formal executive sign-off prior to production merge.

---

*Verified and Prepared by Internal QA Review Team for Arnav Abacus Academy Executive Consideration.*
