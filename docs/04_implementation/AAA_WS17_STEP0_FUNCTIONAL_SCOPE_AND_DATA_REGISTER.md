# ARNAV ABACUS ACADEMY (AAA) — SPRINT 3 WS-17 STEP 0
## Document Reference: `AAA-WS17-STEP0-SCOPE-01`
### Deliverable 3: Functional Scope, Data Field Register & Calendar Standards

**Document Version:** 1.0.0  
**Specification Date:** 05-November-2026  
**Governing Specification:** `AAA-S4-WS-CONF-01`  
**Target Infrastructure:** Client-Side React / TypeScript + Zero-Dependency `.ics` Generator  
**Feature Branch:** `feat/sprint3-integration`  
**Accountable Leaders:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)

---

## 1. Authoritative Center Venue & Contact Attribution

All physical discovery sessions and calendar appointments must strictly reference the officially verified AAA Wakad Center details:

- **Center Name:** Arnav Abacus Academy (AAA), Wakad, Pune
- **Authoritative Address:**  
  `Flat No. 3, 1st Floor, Adv. Balaji Sagar Bungalow, Opp. Creative Cameo, Near Park Street, Behind Wisdom World School, Wakad, Pune 411057, Maharashtra, India`
- **Center Landmark:** Behind Wisdom World School / Opp. Creative Cameo
- **Google Maps Coordinates / Map Link:**  
  `https://maps.google.com/?q=Arnav+Abacus+Academy+Wakad+Pune+411057`
- **Director & Lead Mentor:** Neha Patil (Founder & Academic Director)
- **Verified Admissions WhatsApp & Phone:** `+91 90219 24968`
- **Parent Grievance Officer:** Nitin Patil (`+91 90219 24968`)

---

## 2. Functional Scope Breakdown & Component Register

| Component / Utility | File Path | Functional Role | Trigger Condition |
| :--- | :--- | :--- | :--- |
| **Enquiry Acknowledgment Modal** | `src/components/EnquiryReceiptModal.tsx` | Presents the authoritative `leadReference`, confirms receipt of enquiry, and provides 1-click WhatsApp accelerator to Neha Patil. | HTTP 201 response from `/api/discovery-intake` on initial inquiry submission. |
| **Appointment Confirmed Modal** | `src/components/AppointmentConfirmedModal.tsx` | Displays confirmed appointment date, time, venue address, map link, and `.ics` download button. | Explicit confirmed appointment state (date and time locked). |
| **Calendar Invite Generator** | `src/lib/calendarInviteGenerator.ts` | Zero-dependency RFC 5545 `.ics` file generator supporting Asia/Kolkata (`+05:30`) time zones and sequence versioning. | Parent clicks "Add to Calendar" / "Download Invite (.ics)". |
| **Parent Preparation Card** | `src/components/ParentPreparationCard.tsx` | Embedded educational checklist explaining what to bring (pencil, eraser, curiosity) and what to expect during trial. | Displayed inside both Enquiry and Appointment modal states. |

---

## 3. Data Field Register: Required vs. Optional Fields

### 3.1 Tier 1: Enquiry Acknowledgment Experience

| Field Name | Type | Requirement | Purpose / Usage | PII Classification |
| :--- | :---: | :---: | :--- | :--- |
| `leadReference` | `string` | **Mandatory** | Displayed in badge (`AAA-LEAD-YYYY-[00001]`). | Operational ID (Zero PII) |
| `parentName` | `string` | **Mandatory** | Personalized greeting (`Dear Mr. Joshi`). | Direct PII (First name only in greeting) |
| `studentName` | `string` | Optional | Mentioned in context (`for Aarav`). | Direct PII |
| `programInterest` | `string` | **Mandatory** | Identifies course (`Abacus Mathematics`). | Anonymous Attribute |
| `preferredMode` | `string` | **Mandatory** | `offline` (Wakad Center) or `online`. | Anonymous Preference |
| `whatsappFastTrackUrl` | `string` | **Mandatory** | Pre-fills WhatsApp message with lead ref. | Link Token |

### 3.2 Tier 2: Appointment Confirmed Experience

| Field Name | Type | Requirement | Purpose / Usage | PII Classification |
| :--- | :---: | :---: | :--- | :--- |
| `leadReference` | `string` | **Mandatory** | References parent's admissions file. | Operational ID (Zero PII) |
| `studentName` | `string` | **Mandatory** | Named in calendar appointment summary. | Direct PII (Student First Name only) |
| `programName` | `string` | **Mandatory** | Course title in event summary. | Anonymous Attribute |
| `sessionStartIso` | `string` | **Mandatory** | ISO 8601 string (`2026-11-14T11:00:00+05:30`). | Schedule Metadata |
| `sessionDurationMinutes` | `number` | **Mandatory** | Typically `45` minutes. | Schedule Metadata |
| `deliveryMode` | `string` | **Mandatory** | `'offline'` or `'online'`. | Delivery Format |
| `venueAddress` | `string` | Mandatory (if offline) | Full Balaji Sagar Bungalow address. | Public Venue Data |
| `meetingUrl` | `string` | Mandatory (if online) | Secure Zoom / Google Meet URL. | Access Link |
| `sequenceNumber` | `number` | Optional (default 0) | Increments on reschedules (RFC 5545 `SEQUENCE`).| Revision Counter |

---

## 4. Ten Specific WS-17 Technical Specifications

### 1. Trigger Architecture:
- `EnquiryReceiptModal` triggers on **HTTP 201** from `/api/discovery-intake`.
- `AppointmentConfirmedModal` triggers **only** when an appointment record with verified `sessionStartIso` is present.

### 2. Required Data Validation:
- If `leadReference` is missing or invalid, neither modal opens; client falls back to inline message.
- If `sessionStartIso` is null or invalid, `.ics` generation is strictly disabled.

### 3. Optional Fields Handling:
- If `studentName` is omitted by parent, copy defaults gracefully to *"your child"*.

### 4. Establishing Appointment Confirmation:
- In the initial web discovery flow, appointment confirmation is established after verbal/WhatsApp consultation with Neha Patil to guarantee micro-batch capacity (max 5 students).

### 5. Rescheduling & Cancellation Protocol:
- Under AAA Academic Policy, a maximum of **2 reschedules** are permitted with at least 12 hours advance notice.
- Rescheduling generates an updated `.ics` invite with an incremented `SEQUENCE` counter.

### 6. Handling Unconfirmed Appointment Times:
- When no appointment time has been confirmed, the UI presents the **Enquiry Acknowledgment Card** with the status: *"Scheduling in Progress"*. No `.ics` download link is rendered.

### 7. PII Minimisation Protocol (DPDP Act 2023):
- Calendar invites and summary badges display only the student's first name and course title.
- Sensitive diagnostic observations, phone numbers, and parent home addresses are **never** embedded in `.ics` file strings.

### 8. Asia/Kolkata Time Zone Handling (RFC 5545 Standard):
- Time strings are formatted as UTC with `Z` suffix or explicitly tagged with `TZID=Asia/Kolkata`:
  ```ics
  DTSTART;TZID=Asia/Kolkata:20261114T110000
  DTEND;TZID=Asia/Kolkata:20261114T114500
  ```
- This ensures calendar apps in foreign time zones (US, UK, UAE) convert properly while local Pune parents see exact IST time.

### 9. Special Character Escaping in ICS Output:
- In accordance with RFC 5545 §3.3.11, semicolons (`;`), commas (`,`), and backslashes (`\`) are escaped with a preceding backslash (`\`), and newlines are emitted as `\n`:
  ```typescript
  export function escapeIcsText(text: string): string {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\r?\n/g, '\\n');
  }
  ```

### 10. Update & Reschedule Event Replacement:
- The `.ics` generator uses a deterministic `UID` based on the lead reference:
  `UID:AAA-DISCOVERY-${leadReference}@arnavabacus.com`
- When an appointment is rescheduled, the same `UID` is retained with `SEQUENCE: 1` (or higher). Operating systems (macOS, iOS, Windows, Android) recognize the matching `UID` and **automatically replace the previous calendar entry** rather than creating a duplicate.
