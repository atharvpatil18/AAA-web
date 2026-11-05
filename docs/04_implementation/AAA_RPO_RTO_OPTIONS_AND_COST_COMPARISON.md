# ARNAV ABACUS ACADEMY (AAA) — INFRASTRUCTURE & DISASTER RECOVERY
## RPO & RTO Operational Options, Technical Capabilities & Financial Comparison

**Document Reference:** `AAA_RPO_RTO_OPTIONS_AND_COST_COMPARISON`  
**Governing Directive:** AAA Management Correction and Staging Execution Directive (05-Nov-2026, Action B)  
**Lead Systems Engineer:** Nitin Patil (Operations, Tech & Compliance)  
**Academic Lead:** Neha Patil (Founder & Academic Director)  
**Date:** 05-November-2026  

---

## 1. Executive Summary & Comparison Purpose

Management requested an objective, comprehensive comparison between:
- **Option A:** Supabase Free Tier with **Independently Managed Backups** (Zero operational expenditure).
- **Option B:** Supabase Paid Tiers with **Native Provider Backups & Point-in-Time Recovery (PITR)**.

### Primary Architectural Takeaway:
Purchasing a cloud subscription **does not automatically guarantee an RPO $\le 5$ minutes or an RTO $< 1$ hour**. True disaster recovery depends on rehearsed restoration procedures, DNS reconnection speed, and operational alerting, regardless of whether backups are free or paid.

---

## 2. Comprehensive Architectural & Cost Comparison Table

```
+----------------------------------------------------------------------------------------------------+
|                                    DISASTER RECOVERY OPTIONS MATRIX                                 |
+------------------------------------+--------------------------------+------------------------------+
| Dimension                          | Option A: Independently Managed| Option B: Paid Provider Tier |
|                                    | (Zero-Cost Free Tier Baseline) | (Supabase Pro + PITR Add-On) |
+------------------------------------+--------------------------------+------------------------------+
| Active Monthly Cloud Spend         | ₹0.00 / month                  | ~$125 / month (~₹10,500/mo)  |
| Annualized Expenditure             | ₹0.00 / year                   | ~$1,500 / year (~₹1,26,000/yr|
| Backup Execution Responsibility    | AAA Independent Automation     | Supabase Managed Platform    |
| Automated Daily Backup Retention   | 7 Days (Off-site encrypted)    | 7 Days (Managed by Supabase) |
| Backup Trigger Mechanism           | Scheduled daily pg_dump overSSL| Continuous WAL Streaming     |
| Point-in-Time Recovery (PITR)      | ❌ Not Native (Export interval)| 🟢 Sub-minute second rollback|
| Achievable Database RPO            | <= 24 hours (Daily export)     | <= 1 to 5 minutes            |
| Achievable Parent Inquiry RPO      | 0 seconds (Instant WhatsApp)   | <= 1 to 5 minutes            |
| Achievable Recovery Time (RTO)     | <= 30 minutes (pg_restore)     | <= 15 to 30 minutes (Console)|
| Automatic Inactivity Pausing       | Yes (After 7 days; ping solves)| No (Never pauses)            |
| Backup Failure Alerting            | Built-in (Webhook/Email alert) | Native Supabase Dashboard    |
| Database Storage Included          | 500 MB                         | 8 GB (+$0.125/GB overage)    |
| Suitable Operational Phase         | Staging & Initial Wakad Pilot  | Multi-Center Franchise Scale |
+------------------------------------+--------------------------------+------------------------------+
```

---

## 3. Deep-Dive Analysis of Option A (Independently Managed)

### 3.1 How Option A Works:
1. **Automation:** A scheduled runner (local or private GitHub Actions) runs `pg_dump` daily at 02:00 AM IST over SSL.
2. **Encryption & Storage:** The archive is encrypted with AES-256 GPG and saved to private off-site storage.
3. **Monitoring & Alerts:** The runner logs execution size and checksums; if a dump fails, it immediately alerts Nitin Patil.
4. **Recovery Drill:** Restoring onto an isolated staging database requires running `pg_restore`, taking ~2.5 minutes for a standard ~50MB database.

### 3.2 True Technical Merits of Option A:
- **Zero Financial Cost:** ₹0.00 / month forever, perfectly aligned with AAA's current business model.
- **Provider Independence:** You own the raw PostgreSQL dump file. You are not locked into Supabase and can restore to any standard PostgreSQL host (e.g. Neon, AWS RDS, or local server).
- **Physical Fallback:** Every admissions lead is simultaneously delivered to Neha Patil's WhatsApp, providing an instantaneous, zero-cost paper trail.

### 3.3 Limitations of Option A:
- Database RPO is bounded by the export frequency ($\le 24\text{ hours}$ for daily dumps).
- Requires occasional maintenance of the backup script.

---

## 4. Deep-Dive Analysis of Option B (Paid Provider Tier)

### 4.1 The Reality of Option B Costs:
Many teams incorrectly assume that paying $25/mo for Supabase Pro gives them continuous 5-minute Point-in-Time Recovery. 
**This is factually false:**
- **Supabase Pro Base ($25/mo ~ ₹2,100/mo):** Provides **daily automated backups only** (24-hour RPO, identical to Option A's schedule).
- **Point-in-Time Recovery (PITR) Add-on (+$100/mo ~ ₹8,400/mo):** Must be added on top of Pro to unlock continuous WAL streaming and sub-minute recovery.
- **Total Option B Cost:** **~$125 / month (~₹10,500 / month = ~₹1,26,000 / year)**.

### 4.2 Why Option B Does NOT Automatically Prove RTO $< 1$ Hour:
- Clicking "Restore" in a cloud dashboard spins up a new database instance with a new connection string.
- If the application's environment secrets (`SUPABASE_URL`) are not updated and deployed across Cloudflare Pages within the hour, the platform remains down despite the database restore finishing.
- Operational testing and rehearsed runbooks are **mandatory** regardless of how much is spent.

---

## 5. Strategic Recommendation for AAA

| Phase | Recommended Strategy | Budget | Justification |
| :--- | :--- | :---: | :--- |
| **Phase 1: Pre-Launch Staging & Pilot (Current)** | **Option A (Independently Managed)** | **₹0.00 / mo** | Volume is single-center (~5–10 leads/day). Free Tier + WhatsApp logs provide zero-risk, zero-cost protection. |
| **Phase 2: Multi-Center Expansion / High Paid Ads** | **Option B (Evaluate Supabase Pro)** | **₹2,100 / mo** | When inquiry volumes reach hundreds daily across multiple Pune centers, upgrade to Pro to eliminate 7-day pausing and increase storage. |

Management is advised to adopt **Option A** for the current pre-launch baseline.
