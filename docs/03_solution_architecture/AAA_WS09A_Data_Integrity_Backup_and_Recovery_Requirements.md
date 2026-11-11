# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# WS-09A.7: DATA INTEGRITY, BACKUP & RECOVERY REQUIREMENTS

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S3-SPEC-WS09A-07`  
**Stage:** Stage 3 — Architecture & Design  
**Parent Workstream:** WS-09 — Technology Architecture, Data Persistence & CRM Strategy  
**Sub-Workstream:** WS-09A — Student Identity, Data Architecture & Persistence Strategy  
**Deliverable:** WS-09A.7 — Data Integrity, Backup & Recovery Requirements  
**Governance Authority:** Nitin Patil (Operations & Technology Lead) & Neha Patil (Academic Director)  
**Date:** 04 November 2026  
**Status:** 🟡 **DRAFT — AWAITING MANAGEMENT REVIEW (GATE 3.4 OPEN)**  
**Execution Mode:** STRICTLY DOCUMENTATION-ONLY (IMPLEMENTATION FREEZE ACTIVE)  

---

## 1. Scope & Objective

This document defines the architectural integrity constraints, automated backup protocols, disaster recovery procedures, and recovery objectives (RPO/RTO) required to safeguard Arnav Abacus Academy's educational, administrative, and student data assets.

---

## 2. Relational Integrity & Constraint Architecture

To prevent data corruption, orphaned records, and duplicate allocations, the persistence layer must enforce strict database-level constraints:

### 2.1 Key Database Constraints
1. **Primary & Foreign Key Integrity:**
   - All relational tables must enforce synthetic primary keys (`UUIDv7` or `UUIDv4`).
   - Foreign key references (e.g., `student_id`, `family_id`, `batch_id`) must enforce referential integrity with strict delete rules (`ON DELETE RESTRICT` for primary records; `ON DELETE CASCADE` only for ephemeral child attempts).
2. **Unique Business Constraints:**
   - `students.display_id` must have an explicit `UNIQUE INDEX`.
   - `families.primary_phone` must have a normalized `UNIQUE INDEX` (in E.164 format, e.g., `+919021924968`).
   - `invoices.invoice_number` must have a `UNIQUE INDEX`.
3. **Check Constraints & Business Validation:**
   - `batches.max_capacity <= 5` (database-level check constraint preventing micro-batch overflow).
   - `dimension_scores.score_observed BETWEEN 1 AND 5` (strictly enforcing the 1–5 observation scale).
   - `practice_attempts.score_percentage BETWEEN 0.00 AND 100.00`.

### 2.2 Deduplication Strategy
- **Parent Phone Normalization:** Inbound phone numbers are stripped of non-numeric characters, validated against Indian 10-digit mobile ranges, and prefixed with `+91`.
- **Duplicate Lead Triage:** If a parent submits multiple inquiries within 48 hours for the same child/phone, the system links the submissions to the existing `LeadID` rather than spawning duplicate records.

---

## 3. Backup Architecture & Options Analysis

The table below outlines backup strategies for AAA's production persistence layer:

| Dimension | Tier 1: Automated Daily Snapshot (Baseline) | Tier 2: Point-in-Time Recovery (PITR) + Daily (Recommended) | Tier 3: Multi-Region Continuous Replication |
| :--- | :--- | :--- | :--- |
| **Snapshot Frequency** | Once every 24 hours (executed at 02:00 IST). | Continuous Write-Ahead Log (WAL) archiving + Daily full snapshot. | Real-time streaming replication to secondary cloud region. |
| **Backup Storage** | Encrypted S3/Cloud Storage bucket with 30-day retention. | Encrypted cloud bucket with 35-day PITR window + 12 monthly archives. | Multi-region redundant storage with geo-separation. |
| **Recovery Point Objective (RPO)** | **Up to 24 hours** (data between snapshots lost). | **$\le 5$ minutes** (restorable to any second within 35 days). | **$< 1$ minute** (near-zero data loss). |
| **Recovery Time Objective (RTO)** | **$< 4$ hours** (time to provision and restore). | **$< 1$ hour** (automated restore orchestration). | **$< 15$ minutes** (automated regional failover). |
| **Cost & Overhead** | Minimal. Free or negligible cloud storage tier. | Low. Marginal storage overhead for WAL logs ($\approx \$5\text{--}\$15/\text{month}$). | High. Requires duplicate active databases ($\approx 2\times$ cost). |
| **Recommendation** | Acceptable for dev/staging. | **Strongly Recommended for AAA Production.** Provides complete protection against accidental data corruption or ransomware. | Over-engineered for current single-center operations in Wakad. |

---

## 4. Disaster Recovery & Restoration Verification Protocol

1. **Automated Restoration Testing:** Backups that are never restored are unverified assumptions. AAA operations shall mandate a quarterly automated restoration drill into an isolated staging container to verify backup integrity.
2. **Encrypted Snapshot Archiving:** Full snapshots are encrypted at rest using AES-256 with keys managed separately from the database instance.
3. **Air-Gapped Cold Storage:** Once per quarter, an encrypted snapshot is archived into an offline, air-gapped storage vault controlled by Nitin Patil.

---

## 5. Stage-Gate Acceptance & Verification

This specification satisfies **WS-09A.7** under Stage 3 Workstream WS-09A. It is submitted in **DRAFT** status and will be formally reviewed under Management Determination `MGT-DET-S3-12`. Gate 3.4 remains **OPEN**.
