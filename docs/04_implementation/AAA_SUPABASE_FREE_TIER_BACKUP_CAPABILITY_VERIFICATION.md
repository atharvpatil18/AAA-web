# ARNAV ABACUS ACADEMY (AAA) — INFRASTRUCTURE AUDIT
## Supabase Free Tier Backup, PITR & Inactivity Capability Verification

**Document Reference:** `AAA_SUPABASE_FREE_TIER_BACKUP_CAPABILITY_VERIFICATION`  
**Governing Directive:** AAA Management Correction and Staging Execution Directive (05-Nov-2026)  
**Verification Date:** 05-November-2026  
**Auditor:** Independent Systems & Infrastructure Auditor  
**Accountable Leadership:** Nitin Patil (Operations, Tech & Compliance) & Neha Patil (Founder & Academic Director)  
**Primary Source:** Official Supabase Documentation & Pricing Specifications (`supabase.com/pricing`, `supabase.com/docs/guides/platform/backups`)  

---

## 1. Executive Summary & Verification Purpose

Following leadership's critical finding on Determination `MGT-DET-S5-STAGING-03`, this document authoritatively verifies the actual capabilities and limitations of the **Supabase Free Tier** regarding:
1. Automated daily backup availability.
2. Manual database backup and export mechanisms.
3. Point-in-Time Recovery (PITR) availability and true commercial cost.
4. Free-tier inactivity and automatic project pausing rules.
5. Project storage, bandwidth, and compute quotas.

### Definitive Finding:
> **Automated daily backups are NOT included in the Supabase Free Tier.**  
> The previous representation in `MGT-DET-S5-STAGING-03` and earlier reports stating that the Free Tier provides *"automated daily snapshots retained for 7 days"* was factually incorrect. Free-tier projects feature **0 days of automated backup retention**. Users on the Free Tier must arrange their own independent scheduled database dumps and off-site storage.

---

## 2. Granular Provider Capability Verification (Supabase)

```
========================================================================================
                     SUPABASE FREE TIER VS. PRO CAPABILITY MATRIX
========================================================================================
Capability / Feature             Free Tier (Current)            Pro Tier ($25/mo)
----------------------------------------------------------------------------------------
Automated Daily Backups          ❌ NOT INCLUDED (0 days)       🟢 INCLUDED (7-day retention)
Point-in-Time Recovery (PITR)    ❌ NOT AVAILABLE               ⚠️ PAID ADD-ON (~$100/mo extra)
Manual pg_dump Export            🟢 SUPPORTED (via CLI/psql)    🟢 SUPPORTED (via CLI/psql)
Inactivity Pausing               ⚠️ PAUSES AFTER 7 DAYS IDLE   🟢 NEVER PAUSED (Always on)
Database Storage Quota           500 MB (Included)              8 GB (Included, then $0.125/GB)
Bandwidth / Egress Quota         5 GB / month                   250 GB / month
Active Projects Allowed          Up to 2 free projects          Unlimited ($10/project beyond 1)
Auth Monthly Active Users (MAU)  50,000 MAU                     100,000 MAU
Edge Function Invocations        500,000 / month                2,000,000 / month
========================================================================================
```

---

## 3. Detailed Audit of Specific Provider Capabilities

### 3.1 Automated Backup Availability
- **Official Documentation Source:** [Supabase Platform Backups Guide](https://supabase.com/docs/guides/platform/backups) (Checked: 05-Nov-2026).
- **Verified Policy:** Automated daily backups are an exclusive feature of **Pro Plan and above**. Projects on the Free Tier have **0 days** of retention. Supabase does not take, schedule, or store automatic snapshots of free-tier database instances.
- **Correction:** Any reliance on Supabase to take automated daily snapshots at ₹0.00 is invalid.

### 3.2 Manual Backup & Export Capability
- **Official Documentation Source:** [Supabase Database CLI & pg_dump](https://supabase.com/docs/guides/database/connecting-to-postgres) (Checked: 05-Nov-2026).
- **Verified Policy:** Free-tier users can execute manual backups at any time using:
  1. **PostgreSQL Standard CLI:** `pg_dump -h db.<REF>.supabase.co -U postgres -d postgres > backup.sql` over SSL (`sslmode=require`).
  2. **Supabase CLI:** `npx supabase db dump -p <PROJECT_REF> -f backup.sql`.
- **Constraint:** These tools require an external execution environment (e.g. local administrator machine, cron job, or secure CI runner).

### 3.3 Off-Site Storage Requirements
- Because Supabase does not store free-tier snapshots on its storage infrastructure, independent backups require:
  - An encrypted destination store (e.g., private GitHub repository, Cloudflare R2 bucket, AWS S3 bucket, or local encrypted NAS).
  - Credentials and access controls managed strictly outside browser-accessible code.

### 3.4 Point-in-Time Recovery (PITR) Realities & True Charges
- **Official Documentation Source:** [Supabase PITR Pricing & Add-ons](https://supabase.com/docs/guides/platform/backups#point-in-time-recovery) (Checked: 05-Nov-2026).
- **Critical Discovery:**  
  - Subscribing to **Supabase Pro ($25/mo ~ ₹2,100/mo)** provides **daily automated backups with 7-day retention**, but **DOES NOT include Point-in-Time Recovery (PITR) by default**.
  - Continuous Point-in-Time Recovery (PITR) with sub-minute granularity is a **paid infrastructure add-on** priced at **+$100 / month (~₹8,400 / month)** for a 7-day retention window.
  - Therefore, achieving true second-by-second PITR via native Supabase features costs **~$125 / month (~₹10,500 / month = ~₹1,26,000 / year)**, not ₹2,100/mo.

### 3.5 Inactivity Pausing Limitations
- **Official Documentation Source:** [Supabase Project Pausing Policy](https://supabase.com/docs/guides/platform/pausing) (Checked: 05-Nov-2026).
- **Verified Policy:** Free-tier projects are subject to automatic pausing if the database experiences low activity over a **continuous 7-day period**.
- **Impact on AAA:**
  - If the staging or pilot database receives zero queries for 7 consecutive days, Supabase freezes the instance.
  - Data is **not deleted**, but the database goes offline until manually restored via the Supabase Dashboard.
  - Cold-start unpausing takes 1 to 2 minutes.
  - Pro Tier projects are completely exempt from inactivity pausing.

---

## 4. Documentary Audit Conclusion

The representations made in earlier Stage 5 documents regarding Supabase Free Tier capabilities must be formally corrected across the project governance register:

1. **Automated Daily Backups:** Refactored from "Free Tier Feature" to **"Requires Pro Plan ($25/mo)"** OR **"Requires Independently Managed Scheduled Export Script (₹0.00/mo)"**.
2. **Point-in-Time Recovery (PITR):** Refactored from "$25/mo Pro feature" to **"$125/mo ($25 Pro + $100 PITR Add-on)"**.
3. **Inactivity Pausing:** Formally recognized as an operational constraint on Free Tier requiring either active usage monitoring or scheduled health pings.
