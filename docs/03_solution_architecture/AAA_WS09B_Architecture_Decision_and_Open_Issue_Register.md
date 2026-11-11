# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# WS-09B ARCHITECTURE DECISION & OPEN ISSUE REGISTER (RATIFIED)

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S3-REG-WS09B-01`  
**Stage:** Stage 3 — Architecture & Design  
**Parent Workstream:** WS-09 — Technology Architecture, Data Persistence & CRM Strategy  
**Sub-Workstream:** WS-09B — Data Integration, Lead Ingestion & Zero-PII Telemetry  
**Governance Authority:** Nitin Patil (Operations & Technology Lead) & Neha Patil (Academic Director)  
**Ratification Date:** 04 November 2026  
**Management Instrument:** `MGT-DET-S3-13`  
**Status:** 🟢 **RATIFIED & CLOSED — WS-09B FORMALLY APPROVED (GATE 3.4 CLOSED)**  

---

## 1. Executive Summary & Ratification Record

Under Management Determination **`MGT-DET-S3-13`**, executed on **04 November 2026**, **Nitin Patil** (Operations & Technology Lead) and **Neha Patil** (Founder & Academic Director) have formally reviewed and ratified all ten architectural determinations formulated under **WS-09B (Data Integration, Lead Ingestion & Zero-PII Telemetry Architecture)**.

With this formal ratification:
1. Deliverables **WS-09B.1 through WS-09B.8** constitute the binding data integration, lead ingestion, CRM lifecycle, and telemetry architecture baseline for Arnav Abacus Academy.
2. Parent Workstream **WS-09 (WS-09A & WS-09B)** is 100% complete and ratified.
3. **Stage-Gate 3.4 is formally CLOSED.**
4. Commencement of **Workstream WS-10 (Security, Compliance & Certificate Governance Architecture)** is officially authorized.

---

## 2. Ratified Architectural Determinations (`MGT-DET-S3-13`)

| Decision ID | Decision Title | Owning Lead | Ratified Architectural Determination | Strategic & Operational Impact | Ratification Status |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **D-09B-01** | **Adoption of 19-Step End-to-End Admissions Data Flow** | Neha & Nitin | **APPROVED:** Adopt the 19-step parent lead and admissions data flow, enforcing strict lifecycle separation between enquiry, discovery, admission, and student enrolment. | Prevents premature student record creation; guarantees structured admissions triage. | **RATIFIED** (04-Nov-2026) |
| **D-09B-02** | **Adoption of Dedicated Server-Side API Gateway** | Nitin Patil | **APPROVED:** Adopt Option B (Dedicated Server-Side API Gateway `POST /api/v1/leads`). Plan transition away from unauthenticated Google Apps Script `no-cors` baseline during Stage 4. | Guarantees delivery visibility, server-side validation, rate limiting, and idempotency. | **RATIFIED** (04-Nov-2026) |
| **D-09B-03** | **Adoption of Custom Headless CRM in AcademyOS** | Nitin & Neha | **APPROVED:** Adopt Approach 2 (Custom lightweight admissions dashboard inside AcademyOS internal admin). Avoid commercial SaaS CRM subscriptions. | Zero software licensing costs; perfectly tailored to $\le 5$ student batches and 6-dimension discovery rubrics. | **RATIFIED** (04-Nov-2026) |
| **D-09B-04** | **Adoption of 14-State Lead Lifecycle State Machine** | Neha Patil | **APPROVED:** Adopt the 14-state lead lifecycle (`NEW` through `CLOSED`) with explicit entry/exit criteria and automated 90-day retention purging for non-enrolled leads. | Provides rigorous operational tracking while upholding DPDP minor privacy mandates. | **RATIFIED** (04-Nov-2026) |
| **D-09B-05** | **Zero-PII Telemetry & Measurement Specification** | Nitin Patil | **APPROVED:** Adopt canonical zero-PII event dictionary for GTM/GA4 (`G-M2EL9MYSRL`). Strictly prohibit minor/parent names, numbers, or performance scores in telemetry. | Protects minor data privacy and eliminates regulatory breach risks under Indian DPDP Act. | **RATIFIED** (04-Nov-2026) |
| **D-09B-06** | **Layered Form Security & Formula Injection Defense** | Nitin Patil | **APPROVED:** Adopt layered input security: client-side UX checks, honeypot traps, Turnstile/rate limiting, and server-side formula injection prefixing (`'`). | Completely eliminates XSS, SQLi, and spreadsheet formula execution risks. | **RATIFIED** (04-Nov-2026) |
| **D-09B-07** | **Hybrid WhatsApp Integration Architecture** | Nitin & Neha | **APPROVED:** Adopt hybrid model: Official WhatsApp Cloud API for automated transactional confirmations; verified 1:1 business chats for Neha Patil's counselling. | Professional, automated transactional reliability without spam or account ban risks. | **RATIFIED** (04-Nov-2026) |
| **D-09B-08** | **Unbundled Dual Consent Model Enforcement** | Neha Patil | **CONFIRMED BASELINE:** Enforce separate checkboxes for Required Transactional Service and Optional Marketing Communication. Declining marketing never blocks admissions. | Respects parental autonomy and adheres to statutory privacy regulations. | **RATIFIED BASELINE** |
| **D-09B-09** | **5-Tier Relational Lead Deduplication Taxonomy** | Nitin Patil | **APPROVED:** Adopt taxonomy (`NEW_LEAD`, `EXACT_DUPLICATE`, `MULTI_PROGRAM_INTEREST`, `EXISTING_FAMILY_FOLLOW_UP`, `SIBLING_ENQUIRY`). Prohibit merging records solely on phone. | Protects sibling academic separation and avoids accidental data corruption. | **RATIFIED** (04-Nov-2026) |
| **D-09B-10** | **Operational SLAs & Offline Local Storage Buffers** | Nitin & Neha | **APPROVED:** Enforce $\le 2$-hour admissions triage SLA during operating hours, 48-hour Google review SLA, and local storage offline caching buffers for zero lead loss. | Guarantees exceptional parent responsiveness and flawless ingestion reliability. | **RATIFIED** (04-Nov-2026) |

---

## 3. Mandatory Governance Conditions & Next Workstream Mandate

1. **Implementation Freeze Remains 100% Active:** No database instances shall be provisioned, no schema migrations run, and no production code modified in `src/` during Stage 3.
2. **Hosting Neutrality Maintained:** Cloud provider and infrastructure selection remain strictly deferred to **WS-11**.
3. **Closure of Stage-Gate 3.4:** Gate 3.4 is formally sealed.
4. **Authorization to Commence WS-10:** Management hereby formally authorizes immediate commencement of **WS-10 (Security, Compliance & Certificate Governance Architecture)** under strict documentation-only mode.
