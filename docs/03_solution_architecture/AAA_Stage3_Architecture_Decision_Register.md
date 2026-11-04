# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# ARCHITECTURE DECISION REGISTER (ADR)

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Leadership:** Neha Patil (Founder & Academic Director), Nitin Patil (Operations & Technology Lead)  
**Governance Stage:** Stage 3 — Architecture & Design  
**Previous Stage:** Stage 2 — Business Requirements (Ratified & Closed on 03 Nov 2026)  
**Management Authority:** Overall Stage 3 Commencement Authorized; Decision Log Submitted for Management Determination  
**Document Ref:** `docs/03_solution_architecture/AAA_Stage3_Architecture_Decision_Register.md`  
**Date:** November 03, 2026  
**Status:** 🟡 **SUBMITTED FOR MANAGEMENT APPROVAL — RECONCILED ADR LOG**  

---

## 1. Purpose & Decision Governance Taxonomy

This Architecture Decision Register (ADR) captures every material technical, structural, functional, and integration design choice evaluated during Stage 3.

In strict compliance with Stage 3 governance rules, every decision entry is explicitly classified under one of seven mandatory categories:
1. `[EXISTING APPROVED REQUIREMENT]` — Directly inherited from the ratified Stage 2 Master BRD.
2. `[PROPOSED ARCHITECTURE DECISION]` — Formulated technical or structural solution awaiting review.
3. `[REQUIRES MANAGEMENT APPROVAL]` — Policy, financial, or strategic choice requiring executive determination by Neha Patil or Nitin Patil.
4. `[REQUIRES ACADEMIC VALIDATION]` — Pedagogical rubric, lesson plan, or evaluation paper requiring sign-off by Neha Patil (Academic Director).
5. `[REQUIRES PRIVACY/LEGAL VALIDATION]` — Consent language, data retention rule, or DPDP notice requiring qualified legal counsel review.
6. `[DEFERRED]` — Non-blocking decision intentionally scheduled for subsequent phases.
7. `[REJECTED]` — Explored alternative rejected due to complexity, security risk, or pedagogical mismatch.

*Governance Principle:* **No ADR becomes approved solely because it has been created.** Every material decision must document its source requirement IDs, viable options, rationale, risks, dependencies, and explicit designated approval authorities.

---

## 2. Stage 3 Architecture Decision Matrix (ADR-01 through ADR-12)

| Decision ID | Domain / WS | Architecture Subject | Status & Classification | Source Req IDs | Viable Options Considered | Rationale & Trade-Offs | Primary Risks & Controls | Downstream Dependencies | Required Sign-Off Authority |
|---|:---:|---|:---:|:---:|---|---|---|:---:|:---:|
| **ADR-01** | WS-06 | **Public Portal Information Architecture & Routing** | `[PROPOSED ARCHITECTURE SPECIFICATION]` (Derived from BRD `DEC-WS02-03`) | `REQ-STRAT-03`, `REQ-BRAND-03` | **Option A (Recommended):** Monolithic domain (`AAA_WEB`) preserving all 30 audited repository routes.<br>**Option B:** Multi-domain or subdomains for each program. | Consolidates local SEO authority in Wakad/PCMC; presents unified multi-year developmental continuum. | *Risk:* Code coupling. *Control:* Enforce strict modular component directory structure. | WS-06 Deliverables | Nitin Patil & Neha Patil |
| **ADR-02** | WS-06 | **Micro-Batch Copy Refactoring & Validation Pattern** | `[PROPOSED ARCHITECTURE SPECIFICATION]` (Derived from BRD `DEC-WS05-02`) | `REQ-BRAND-05` | **Option A (Recommended):** Universal string constants and ESLint linter rule enforcing *"maximum of five students per batch"*; schedule removal of legacy "1:8" in Stage 4.<br>**Option B:** Manual, ad-hoc string replacement. | Guarantees 100% messaging consistency; prevents accidental regression. | *Risk:* Missed legacy strings. *Control:* Automated regex search across all JSX/TSX templates. | WS-06 Wireframes | Neha Patil (Academic Director) |
| **ADR-03** | WS-06 | **Minimum Necessary Enquiry Form UX (Four-Field Maximum Concept)** | `[PROPOSED ARCHITECTURE DECISION]` | `REQ-PRIV-01`, `REQ-JOUR-01` | **Option A (Recommended):** Four-field maximum modal (Parent Name req, Mobile/WhatsApp req, Child Age Bracket OR Grade at least one req, Programme opt) with unbundled dual consent. Zero DOB, school, address, clinical data.<br>**Option B:** Multi-step form collecting full DOB, school, and academic history. | Data minimization; maximizes conversion while eliminating unnecessary minor PII capture. | *Risk:* Lack of detailed intake data prior to call. *Control:* Gather qualitative context during in-person session. | WS-06, WS-10 | Nitin Patil & Qualified Legal Counsel |
| **ADR-04** | WS-07 | **Inquiry Triage & Teaching Hours Protection Workflow** | `[PROPOSED ARCHITECTURE DECISION]` (Derived from BRD `CONF-MKT-01`) | `REQ-STRAT-04`, `REQ-JOUR-04` | **Option A (Recommended):** Automated WhatsApp acknowledgment; administrative triage by Nitin Patil; 2-hour response during Mon–Sat 9:30–7:30. Founder teaching hours 100% protected.<br>**Option B:** Direct founder mobile line ringing continuously. | Preserves classroom instruction quality as core value asset while maintaining responsive admissions. | *Risk:* Bottleneck during peak inquiry hours. *Control:* Standardized inquiry response templates and backup triage schedule. | WS-07 SOPs | Nitin Patil & Neha Patil |
| **ADR-05** | WS-08 | **The AAA Learning Model™ 1-Page Lesson Plan Schema** | `[REQUIRES ACADEMIC VALIDATION]` | `REQ-PED-01`, `REQ-ACAD-03` | **Option A (Recommended):** Standardized 1-page template across 6 stages (*Inspire $\rightarrow$ Explore $\rightarrow$ Understand $\rightarrow$ Practice $\rightarrow$ Apply $\rightarrow$ Reflect*).<br>**Option B:** Unstructured teacher-led delivery without written stage breakdowns. | Ensures institutional pedagogy and consistent classroom delivery across batches. | *Risk:* Teacher paperwork burden. *Control:* Lightweight micro-checklists requiring $\le 2$ minutes. | WS-08 Deliverables | Neha Patil (Academic Director) |
| **ADR-06** | WS-08 | **Diagnostic Crossover Rubric for 9-Year-Old Candidates** | `[REQUIRES ACADEMIC VALIDATION]` (Proposed Framework; NOT an Approved Admission Rule) | `REQ-PED-03`, `REQ-ACAD-02` | **Option A (Recommended):** Dual-path diagnostic rubric evaluating tactile bead readiness vs abstract calculation speed.<br>**Option B:** Rigid chronological age cutoffs (e.g., $\le 8$ Abacus, $\ge 9$ Vedic). | Provides tailored, developmentally appropriate placement for borderline age groups. Strictly not an approved admission rule until validated. | *Risk:* Inconclusive diagnostic outcome. *Control:* 15-minute trial bead drill during discovery session. | WS-08 Rubrics | Neha Patil (Academic Director) |
| **ADR-07** | WS-09A | **Sovereign Student Identity Key & Sibling Schema** | `[PROPOSED ARCHITECTURE DECISION]` | `REQ-PRIV-04` | **Option A:** Candidate format `AAA-STU-YYYY-XXXX`.<br>**Option B:** UUIDv4 opaque identifier.<br>**Option C:** Prefixed sequential numeric `AAA-STU-NNNNNN`.<br>**Option D:** Cryptographic hashed token. | Evaluates privacy, scalability, and operational usability to prevent sibling collisions under 1:N parent model. | *Risk:* Public exposure of admission year or sequence. *Control:* Candidate format options analysis. | WS-09A Schemas | Nitin Patil & Neha Patil |
| **ADR-08** | WS-10 | **Central Certificate Ledger & Verification Architecture** | `[PROPOSED ARCHITECTURE DECISION]` | `REQ-ACAD-05`, `REQ-TECH-04` | **Option A (Recommended):** Software PDFs re-labeled "Practice Achievement Record"; proposed append-only database ledger for Layer C milestone diplomas with QR lookup.<br>**Option B:** Pure client-side PDF generation without ledger.<br>**Option C:** Blockchain-based digital credential registry. | Prevents credential forgery and diploma misrepresentation while keeping software drills lightweight. | *Risk:* High operational overhead of ledger maintenance. *Control:* Simple relational database lookup with hashed verification token. | WS-10 Deliverables | Nitin Patil & Neha Patil |
| **ADR-09** | WS-10 | **Browser Storage Security & Cache Purge Architecture** | `[PROPOSED ARCHITECTURE DECISION]` | `REQ-TECH-05` | **Option A (Recommended):** Automated session timeout; complete client-side cache wipe on logout; encryption of sensitive local state.<br>**Option B:** Plaintext `localStorage` persistence without automated purge. | Eliminates data leakage on shared family or public computers. | *Risk:* Session loss on accidental tab close. *Control:* Graceful session recovery prompt on reload. | WS-07, WS-10 | Nitin Patil (Technology Lead) |
| **ADR-10** | WS-11 | **Public Cloud Sync Retirement & Sovereign Storage Options** | `[PROPOSED ARCHITECTURE DECISION]` | `REQ-TECH-03` | **Option A:** Sovereign private database (PostgreSQL / Supabase / SQLite) with automated rollback scripts.<br>**Option B:** Retaining unauthenticated public cloud endpoints (`jsonblob.com`). | Eliminates critical data leakage vector and provides sovereign data ownership. | *Risk:* Data migration disruption. *Control:* Pre-migration checksum validation and zero-data-loss rollback protocol. | WS-11 Options Analysis | Nitin Patil (Technology Lead) |
| **ADR-11** | WS-10 | **Data Retention & Automated Lead Purge Schedule** | `[REQUIRES PRIVACY/LEGAL VALIDATION]` (Proposed Schedule; NOT an Approved Policy) | `REQ-PRIV-06` | **Option A (Recommended):** Proposed 90-day retention schedule for unconverted inquiries followed by automated purge; statutory retention for enrolled students.<br>**Option B:** Indefinite accumulation of marketing inquiries.<br>**Option C:** Immediate 30-day purge. | Balances statutory data minimization principles with the seasonal parent re-engagement cycle. Not approved until legal counsel signs off. | *Risk:* Premature deletion of re-engaging parent records. *Control:* Clear re-inquiry matching based on verified phone number. | WS-10 SOPs | Qualified Legal Counsel & Nitin Patil |
| **ADR-12** | WS-11 | **Interim Lead Tracking Tooling & Pipeline Selection** | `[DEFERRED PENDING OPTIONS ANALYSIS]` | `REQ-STRAT-03`, `REQ-PRIV-05` | **Option A:** Authenticated, formula-sanitized Google Sheet with service account scoping.<br>**Option B:** Lightweight sovereign PostgreSQL/SQLite database endpoint.<br>**Option C:** Commercial SaaS CRM (HubSpot/Zoho). | Deferred pending formal options analysis; spreadsheet option subject to strict privacy sign-off (`ACT-WS05-05`, `06`). | *Risk:* Data exposure or formula injection in spreadsheets. *Control:* Rigorous input sanitization and least-privilege service account scoping. | WS-09B, WS-11 | Nitin Patil & Qualified Legal Counsel |

---

## 3. Governance Audit Findings

1. **Zero Premature Approvals:** None of ADR-01 through ADR-12 is classified as approved. All are correctly logged as proposed, deferred, or requiring academic/legal validation.
2. **Explicit Clarification on ADR-06:** ADR-06 is a proposed pedagogical placement evaluation framework for borderline 9-year-olds; it is explicitly **not** an approved academy admission rule and will not be applied until formally validated by Neha Patil.
3. **Explicit Clarification on ADR-11:** The 90-day retention schedule in ADR-11 is a proposed operational timeline; it is explicitly **not** an approved data retention policy until reviewed and verified by qualified legal counsel under the DPDP Act 2023.
4. **Preservation of ADR-12 Deferred Status:** ADR-12 remains strictly deferred pending formal options analysis and security audits.

---
*End of Stage 3 Architecture Decision Register — Arnav Abacus Academy (AAA)*
