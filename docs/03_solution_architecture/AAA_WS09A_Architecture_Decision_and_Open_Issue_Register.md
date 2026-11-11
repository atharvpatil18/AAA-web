# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# WS-09A ARCHITECTURE DECISION & OPEN ISSUE REGISTER (RATIFIED)

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S3-REG-WS09A-01`  
**Stage:** Stage 3 — Architecture & Design  
**Parent Workstream:** WS-09 — Technology Architecture, Data Persistence & CRM Strategy  
**Sub-Workstream:** WS-09A — Student Identity, Data Architecture & Persistence Strategy  
**Governance Authority:** Nitin Patil (Operations & Technology Lead) & Neha Patil (Academic Director)  
**Ratification Date:** 04 November 2026  
**Management Instrument:** `MGT-DET-S3-12`  
**Status:** 🟢 **RATIFIED & CLOSED — WS-09A FORMALLY APPROVED**  

---

## 1. Executive Summary & Ratification Record

Under Management Determination **`MGT-DET-S3-12`**, executed on **04 November 2026**, **Nitin Patil** (Operations & Technology Lead) and **Neha Patil** (Academic Director & Founder) have formally reviewed and approved all eight architectural determinations formulated under **WS-09A (Student Identity, Data Architecture & Persistence Strategy)**.

Deliverables **WS-09A.1 through WS-09A.8** now constitute the binding data and persistence architecture baseline for Arnav Abacus Academy.

---

## 2. Ratified Architectural Determinations (`MGT-DET-S3-12`)

| Decision ID | Decision Title | Owning Lead | Ratified Architectural Determination | Strategic & Operational Impact | Ratification Status |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **D-09A-01** | **Two-Tier Hybrid Student Identity Architecture** | Nitin Patil | **APPROVED:** Adopt Option C (Internal immutable `UUIDv7` primary key + unique human display ID `AAA-STU-YYYY-XXXX`). | Permanently eliminates sibling email collisions, prevents PII exposure in logs/APIs, and maintains parent/receipt ergonomics. | **RATIFIED** (04-Nov-2026) |
| **D-09A-02** | **Normalized Relational Data Model Adoption** | Nitin Patil & Neha Patil | **APPROVED:** Adopt comprehensive ER model spanning families, guardians, students, enrolments, batches ($\le 5$), attendance, and payments. | Derives data schema from authentic business operating procedures rather than web enquiry forms. | **RATIFIED** (04-Nov-2026) |
| **D-09A-03** | **Multi-Programme Enrolment & Lifecycle Isolation** | Neha Patil | **APPROVED:** Adopt multi-enrolment architecture permitting multiple concurrent active programmes under one permanent student identity. | Supports seamless transition (e.g., Abacus to Vedic) and concurrent study without overwriting historical achievements. | **RATIFIED** (04-Nov-2026) |
| **D-09A-04** | **Relational-First Hybrid Model (PostgreSQL + JSONB)** | Nitin Patil | **APPROVED:** Adopt PostgreSQL + JSONB persistence paradigm. Strictly defer cloud/hosting vendor selection to WS-11. | Guarantees ACID transactions for core records while providing high flexibility for high-volume practice telemetry. | **RATIFIED** (04-Nov-2026) |
| **D-09A-05** | **JSONBlob 5-Phase Deprecation & 11-Point Checklist** | Nitin Patil | **APPROVED:** Adopt 5-phase deprecation framework and 11-point readiness checklist. Maintain live endpoints untouched in Stage 3. | Eliminates critical security/data loss vulnerability safely without disrupting live practice sessions for current students. | **RATIFIED** (04-Nov-2026) |
| **D-09A-06** | **12-Category Data Classification & Retention** | Neha Patil & Nitin Patil | **APPROVED:** Adopt 12-category classification; reaffirm ratified 90-day enquiry retention; mark student data retention pending WS-10 legal sign-off. | Complies with Indian DPDP principles and minor privacy protections while awaiting final legal counsel review. | **RATIFIED** (04-Nov-2026) |
| **D-09A-07** | **Backup Strategy: Point-in-Time Recovery (PITR) + Daily** | Nitin Patil | **APPROVED:** Adopt Tier 2 backup architecture (Daily snapshots + continuous WAL archiving achieving RPO $\le 5$ min and RTO $< 1$ hr). | Delivers enterprise-grade disaster recovery and protection against accidental corruption at negligible cloud cost. | **RATIFIED** (04-Nov-2026) |
| **D-09A-08** | **AcademyOS Compatibility Adapter & Dual-Read Design** | Nitin Patil | **APPROVED:** Adopt non-breaking persistence compatibility adapter preserving existing `/practice/*` UI and local storage offline buffers. | Guarantees 100% backward compatibility and zero disruption to active student practice during future migration. | **RATIFIED** (04-Nov-2026) |

---

## 3. Mandatory Governance Conditions & Next Workstream Mandate

1. **Implementation Freeze Remains 100% Active:** No database instances shall be provisioned, no schema migrations run, and no production code modified during Stage 3.
2. **Hosting Neutrality:** Cloud provider selection (Supabase vs. AWS RDS vs. alternatives) remains strictly deferred to **WS-11**.
3. **Authorization to Commence WS-09B:** Management hereby formally authorizes immediate commencement of **WS-09B (Data Integration, Lead Ingestion & Zero-PII Telemetry Architecture)** under strict documentation-only mode.
