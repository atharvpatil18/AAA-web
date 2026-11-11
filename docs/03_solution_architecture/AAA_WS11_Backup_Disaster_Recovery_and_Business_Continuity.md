# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# WS-11.5: BACKUP, DISASTER RECOVERY & BUSINESS CONTINUITY

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S3-SPEC-WS11-05`  
**Stage:** Stage 3 — Architecture & Design  
**Workstream:** WS-11 — Platform Hosting, Infrastructure & Operational Architecture  
**Deliverable:** WS-11.5 — Backup, Disaster Recovery & Business Continuity Specification  
**Governance Authority:** Nitin Patil (Operations & Technology Lead) & Neha Patil (Academic Director)  
**Date:** 04 November 2026  
**Status:** 🟡 **DRAFT — AWAITING MANAGEMENT REVIEW (GATE 3.6 OPEN)**  
**Execution Mode:** STRICTLY DOCUMENTATION-ONLY (IMPLEMENTATION FREEZE ACTIVE)  

---

## 1. Scope & Approved Recovery Targets

Under ratified Management Determination `MGT-DET-S3-12` (WS-09A), the approved target metrics for disaster recovery are:
- **Recovery Point Objective (RPO):** $\le 5\text{ minutes}$ (Maximum permissible data loss window in the event of catastrophic server failure).
- **Recovery Time Objective (RTO):** $< 1\text{ hour}$ (Maximum permissible duration to restore full operational services).

This specification translates those approved business targets into an **executable engineering disaster recovery architecture, automated backup pipeline, and incident runbooks**.

---

## 2. Multi-Tier Backup Architecture

```mermaid
flowchart TD
    subgraph Live_Production["Live Production Database (PostgreSQL 16)"]
        LiveDB["Production DB Engine (ap-south-1 Mumbai)"]
        WALWriter["Continuous Write-Ahead Log (WAL) Streamer"]
        LiveDB --> WALWriter
    end

    subgraph Primary_Backup_Vault["Tier 1 & Tier 2 Automated Cloud Vault"]
        WALWriter -->|Real-Time Archiving| S3_WAL["Continuous WAL Storage (S3 Encrypted)<br/>Enables Point-in-Time Recovery (PITR <= 5 min)"]
        LiveDB -->|Automated Daily Snapshot (02:00 IST)| S3_Snapshots["Daily Full Snapshots (AES-256)<br/>30-Day Rolling Retention"]
    end

    subgraph Air_Gapped_Cold_Storage["Tier 3 Air-Gapped Disaster Vault"]
        S3_Snapshots -->|Quarterly Encrypted Export| ColdVault["Offline Encrypted Vault (Nitin Patil Key)<br/>Annual Tax & Academic Archives"]
    end
```

### 2.1 Backup Lifecycle & Encryption Standards
1. **Continuous Write-Ahead Log (WAL) Archiving:** Every transaction (enrolment, fee receipt, practice attempt) is written to WAL archives within seconds. In the event of primary hardware failure, the database can be reconstructed up to the exact minute of the incident ($\text{RPO} \le 5\text{ min}$).
2. **Automated Daily Snapshots:** Full database images captured automatically at 02:00 IST every night. Retained for 30 rolling days.
3. **Encryption at Rest:** Backups stored in encrypted S3/cloud buckets using AES-256 with keys managed separately from the database instance.
4. **Automated Restoration Testing:** Backups that are not tested are theoretical risks. A quarterly automated restoration job will spin up an isolated staging database from the latest snapshot, execute automated integrity queries (`SELECT count(*) FROM students`), and log verification evidence.

---

## 3. Disaster Recovery Runbooks Across 8 Failure Scenarios

| # | Disaster Scenario | Detection & Trigger | Immediate Containment & Mitigation | Recovery Action & Restoration Runbook | Target RTO | Verification Evidence Required |
| :-: | :--- | :--- | :--- | :--- | :---: | :--- |
| **1** | **Database Corruption / Block Failure** | PostgreSQL crash log; query read error on table scan. | Put API into read-only maintenance mode; freeze incoming writes to prevent corruption spread. | Spin up clean PostgreSQL instance from S3 snapshot; replay WAL logs up to the timestamp immediately preceding corruption. | $< 45\text{ min}$ | Database checksum passes; student record count verified against audit ledger. |
| **2** | **Accidental Record Deletion (Admin Error)** | Staff accidentally deletes student or batch enrolment. | Pause automated sync; audit database transaction logs to identify exact deletion timestamp ($T_{\text{del}}$). | Execute Point-in-Time Recovery (PITR) to $T_{\text{del}} - 1\text{ minute}$ in an auxiliary staging database; export deleted rows and re-insert into production via SQL script. | $< 30\text{ min}$ | Deleted records restored without impacting other concurrent student activity. |
| **3** | **API Gateway Outage / Runtime Crash** | Ingestion failure rate $> 5\%$; 502/504 Bad Gateway alerts. | Client automatically shifts to local storage buffer (`aaa_leads_history`); user sees offline safety message. | Redeploy serverless worker from last known good Git release tag; roll back any recent configuration change. | $< 15\text{ min}$ | API health check `/api/health` returns HTTP 200; buffered client leads auto-sync. |
| **4** | **Hosting Provider Infrastructure Outage** | Cloudflare Pages or Supabase regional data center offline. | Point Cloudflare DNS fallback records to standby secondary CDN / static backup container. | Monitor provider status; if outage exceeds 2 hours, spin up standby database replica in secondary region (e.g., AWS Singapore `ap-southeast-1`). | $< 60\text{ min}$ | Public website renders; student practice active. |
| **5** | **Compromised Database / Admin Credential** | Unauthorized login detected or unexpected schema modification. | Immediately revoke compromised database role and master password; terminate all active connection pools. | Rotate all database connection strings, JWT signing keys, and API secrets; redeploy API gateway with new secrets vault. | $< 30\text{ min}$ | Old credentials rejected; new credentials verified. |
| **6** | **Ransomware / Destructive Cyber Attack** | Malicious script drops tables or encrypts data files. | Sever all outbound/inbound network routes to database; isolate infected instances immediately. | Destroy compromised cloud environment completely; provision fresh infrastructure from clean Terraform definitions; restore database from cold encrypted snapshot. | $< 60\text{ min}$ | 100% clean environment verified via integrity hash. |
| **7** | **Regional Fiber Cut / Network Blackout** | Complete network isolation of Mumbai AWS/Cloudflare POPs. | Cloudflare Anycast automatically re-routes global traffic to nearest operational POP (Hyderabad/Chennai/Singapore). | Database traffic routes to regional read-replica if primary region unreachable. | $< 15\text{ min}$ | Edge traffic smoothly rerouted without manual DNS change. |
| **8** | **Failed Data Migration (Stage 4 Cutover)** | Attempt sync shows divergence between JSONBlob and PostgreSQL. | Trigger automated rollback switch `VITE_PERSISTENCE_MODE = "LEGACY_FALLBACK"`. | Restore database from pre-migration snapshot; re-run historical reconciliation script to pinpoint discrepancy. | $< 20\text{ min}$ | Zero student practice attempt loss; zero UI disruption. |

---

## 4. Stage-Gate Acceptance & Verification

This specification satisfies **WS-11.5** under Stage 3 Workstream WS-11. It is submitted in **DRAFT** status and will be formally reviewed under Management Determination `MGT-DET-S3-15`. Gate 3.6 remains **OPEN**.
