# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# WS-10.2: EXTERNAL INTEGRATION SECURITY ASSESSMENT

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S3-SPEC-WS10-02`  
**Stage:** Stage 3 — Architecture & Design  
**Workstream:** WS-10 — Security, Privacy, Compliance & Certificate Governance  
**Deliverable:** WS-10.2 — External Integration Security Assessment  
**Governance Authority:** Nitin Patil (Operations & Technology Lead) & Neha Patil (Academic Director)  
**Date:** 04 November 2026  
**Status:** 🟡 **DRAFT — AWAITING MANAGEMENT REVIEW (GATE 3.5 OPEN)**  
**Execution Mode:** STRICTLY DOCUMENTATION-ONLY (IMPLEMENTATION FREEZE ACTIVE)  

---

## 1. Scope, Purpose & Code Inspection Evidence

To satisfy the Stage 3 Architecture Charter (`AAA-S3-GOV-001`) and Management Determination `MGT-DET-S3-10`, this assessment conducts a systematic security and privacy audit of all seven external integrations identified in the repository codebase:
1. **JSONBlob Practice Persistence** (`src/lib/cloudSync.ts`)
2. **Google Apps Script Lead Webhook** (`src/lib/leadWebhook.ts`)
3. **EmailJS OTP Authentication Fallback** (`src/lib/AuthContext.tsx`)
4. **Google Analytics 4 & GTM** (`src/lib/analytics.ts`, `src/lib/gtm.ts`)
5. **WhatsApp Outbound Direct Links** (`src/components/*`)
6. **AI Story Generator** (`src/lib/aiStoryGenerator.ts`)
7. **Client-Side PDF Generators** (`src/lib/certificateGenerator.ts`, `src/lib/quizPdfGenerator.ts`)

---

## 2. In-Depth External Integration Risk Register

```mermaid
flowchart TD
    subgraph Public_Web["Public Web & Lead Intake"]
        LeadForm["LeadForm / Modal"] -->|no-cors POST| GAS["Google Apps Script Webhook"]
        LeadForm -->|wa.me click| WA["Outbound WhatsApp"]
        PublicViews["Public Views"] -->|gtag()| GA4["GA4 (G-M2EL9MYSRL)"]
    end

    subgraph AcademyOS["AcademyOS Prototype (src/)"]
        AuthContext["AuthContext.tsx"] -->|sendOTP()| EJS["EmailJS Service"]
        CloudSync["cloudSync.ts"] -->|Unauthenticated PUT| JSONB_Attempts["JSONBlob Attempts"]
        SuccessStories["successStories.ts"] -->|Unauthenticated PUT| JSONB_Stories["JSONBlob Stories"]
    end

    style JSONB_Attempts fill:#fee2e2,stroke:#ef4444,stroke-width:2px
    style GAS fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style EJS fill:#fee2e2,stroke:#ef4444,stroke-width:2px
```

### 2.1 Detailed Integration Audit Matrix

| Provider / Integration | Business Purpose | Data Transmitted | Data Classification | Authentication & Authorization | Secrets & Credential Handling | Production Verification Status | Risk Rating | Architectural Remediation Plan |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| **1. JSONBlob Attempts Endpoint** (`019f9065...`) | Cross-device practice attempt sync. | `userId` (parent email), `userName`, `completedAt`, scores, total questions, durations. | **Confidential (Minor Educational PII)** | **None.** Public read/write REST endpoint without API keys, tokens, or IP restrictions. | No secrets in code; endpoint GUID in code acts as de-facto public token. | **Repository Verified.** Live endpoint accessible via curl/browser. | 🔴 **CRITICAL** | **5-Phase Deprecation (WS-09A.5):** Dual-read adapter $\to$ migrate historical attempts to PostgreSQL $\to$ decommission endpoint. **Untouched in Stage 3.** |
| **2. JSONBlob Stories Endpoint** (`019fa81d...`) | Community success stories and quotes. | Student first name, age, level, quote, date. | **Public Testimonial Data** | **None.** Unauthenticated public read/write. | None. Public GUID in code. | **Repository Verified.** | 🟠 **HIGH** | Decouple from JSONBlob; serve success stories from static verified dataset or internal CMS. |
| **3. Google Apps Script Webhook** | Inbound lead ingestion from modal. | Parent name, phone, age bracket, program, notes. | **Restricted Minor / Parent PII** | **None.** Dispatched via `mode: "no-cors"` without client authentication headers. | Webhook URL passed via `VITE_LEADS_WEBHOOK_URL`. | **Code Verified.** Relies on external Google Sheet script. | 🟠 **HIGH** | **Replace with Dedicated API Gateway (`WS-09B.2`):** `POST /api/v1/leads` with rate limiting, server validation, and PostgreSQL writes. |
| **4. EmailJS Service** (`src/lib/AuthContext.tsx:90`) | OTP dispatch for student login. | Parent email, student name, generated 6-digit OTP. | **Restricted Authentication PII** | Client-side Public Key (`VITE_EMAILJS_PUBLIC_KEY`). | Keys exposed in client bundle; rate limiting handled by EmailJS tier. | **Code Verified.** Fallback console logs OTP when unconfigured. | 🔴 **CRITICAL** | **Server-Side OTP Generation (`WS-10.3`):** Move OTP generation, rate limiting, and hashing to trusted server; dispatch via transactional SMS/Email API. |
| **5. Google Analytics 4 (`G-M2EL9MYSRL`)** | Website traffic and conversion telemetry. | Sanitized page paths, event names (`programme_view`, `whatsapp_click`). | **Anonymous Public Telemetry** | Browser measurement protocol / gtag.js. | Public Measurement ID (`G-M2EL9MYSRL`). | **Code Verified.** Active in `index.html`. | 🟢 **LOW** | **Zero-PII Telemetry (`WS-09B.4`, `WS-10.4`):** Strictly exclude names, numbers, emails, Student IDs, or assessment scores; query param redaction. |
| **6. Outbound WhatsApp (`wa.me`)** | Direct parent inquiries and bookings. | Pre-filled intent text (`Hello Neha Ma'am...`). | **Transactional Inbound** | None. Standard browser `window.open()`. | Canonical number `+919021924968` public. | **Repository Verified.** 33 instances active in `src/`. | 🟡 **MEDIUM** | **Hybrid Model (`WS-09B.6`):** Official WhatsApp Cloud API for automated transactional acks; direct 1:1 business chat for counselling. |
| **7. AI Story Generator** (`src/lib/aiStoryGenerator.ts`) | Personalized motivational story generator. | Student name, current level, speed math achievement. | **Internal Student Data** | Mock generator currently; potential LLM API in future. | Zero API keys currently committed. | **Code Verified.** Pure client-side string synthesis. | 🟢 **LOW** | Ensure future LLM integrations anonymize child names before API dispatch. |

---

## 3. Dedicated Risk Assessment: JSONBlob Persistence Endpoint

In strict adherence to `MGT-DET-S3-10` (Finding WS07-C02), the JSONBlob persistence dependency is formally documented below:

### 3.1 Technical Findings & Evidence
1. **Repository Reference:** `src/lib/cloudSync.ts` lines 27 and lines 58–79.
2. **Endpoint URL:** `https://jsonblob.com/api/jsonBlob/019f9065-ec4f-7d60-b80c-07b7f039afe6`
3. **Data Payload Transmitted:** Each student practice completion triggers an unauthenticated `PUT` request with an array of `AttemptRecord` objects containing:
   - `userId: string` (email address of student/parent)
   - `userName: string` (student name)
   - `userEmail: string`
   - `scorePercentage`, `correctCount`, `wrongCount`, `timeTakenSeconds`, `completedAt`
4. **Vulnerability Mechanics:** Because JSONBlob is an open, unauthenticated mock REST service, anyone with the 36-character GUID can read all student practice records or overwrite the entire JSON document with arbitrary content.

### 3.2 Stage 3 Containment & Governance Mandate
- **No Disablement:** The endpoint **MUST NOT** be disabled or removed during Stage 3, as doing so would immediately disrupt live AcademyOS practice sync for existing students.
- **No External Scraping:** No automated script shall retrieve, inspect, or modify the live endpoint contents.
- **Migration in Stage 4:** The 5-phase deprecation framework (`WS-09A.5`) and 11-point readiness checklist govern the secure cutover in Stage 4.

---

## 4. Stage-Gate Acceptance & Verification

This specification satisfies **WS-10.2** under Stage 3 Workstream WS-10. It is submitted in **DRAFT** status and will be formally reviewed under Management Determination `MGT-DET-S3-14`. Gate 3.5 remains **OPEN**.
