# ARNAV ABACUS ACADEMY (AAA) — INFRASTRUCTURE & DISASTER RECOVERY
## RPO & RTO Provider Capability, Architecture & Cost Assessment

**Document Reference:** `AAA_INF02_RPO_RTO_COST_AND_CAPABILITY_ASSESSMENT`  
**Governing Directive:** AAA Management Directive (05-Nov-2026, Task D)  
**Governing Baseline:** Hardening Item `QA-INF-02`  
**Binding Approved Targets:** $\mathbf{RPO \le 5\text{ minutes}} \quad \text{and} \quad \mathbf{RTO < 1\text{ hour}}$  
**Lead Systems Engineer:** Nitin Patil (Operations, Tech & Compliance)  
**Academic Lead:** Neha Patil (Founder & Academic Director)  
**Status:** 🟡 **CAPABILITY ASSESSMENT & MANAGEMENT COST APPROVAL REQUEST**  

---

## 1. Executive Summary & Binding Mandate

Under Management Decision 3 & Decision 4:
> *"3. Retain the existing approved recovery objectives: RPO <= 5 minutes and RTO < 1 hour. No change is authorised."*  
> *"4. Do not purchase Supabase Pro or any paid service without a separate cost approval."*

This assessment establishes the technical architecture, cloud provider constraints, operational engineering mechanisms, and financial commitments required to achieve the binding targets:
- **Recovery Point Objective (RPO):** $\le 5\text{ minutes}$ (Maximum permissible data loss window upon catastrophic failure).
- **Recovery Time Objective (RTO):** $< 1\text{ hour}$ (Maximum permissible duration to restore full operational service).

---

## 2. Cloud Provider Capability Matrix: Free Tier vs. Paid Alternatives

```
+----------------------------------------------------------------------------------------------------+
|                               PROVIDER CAPABILITY & COST COMPARISON                                |
+-----------------------+-----------------------------+-----------------------+----------------------+
| Technical Dimension   | Option 1: Supabase Free     | Option 2: Supabase Pro| Option 3: Edge Cron  |
+-----------------------+-----------------------------+-----------------------+----------------------+
| Monthly Cost          | ₹0.00 / month               | $25/mo (~₹2,100/mo)   | ₹0.00 / month        |
| Backup Frequency      | Daily automated snapshot    | Continuous WAL Stream | Custom 5-min dump    |
| Point-in-Time Recovery| ❌ NOT SUPPORTED            | 🟢 7-Day PITR Native  | ⚠️ Semi-Continuous   |
| Achievable RPO        | Up to 24 hours (FAIL)       | <= 1 minute (PASS)    | 5 to 15 mins (RISKY) |
| Achievable RTO        | ~2.5 to 15 minutes (PASS)   | ~5 to 15 minutes(PASS)| ~10 to 30 mins(PASS) |
| Maintenance Overhead  | Zero maintenance            | Zero maintenance      | High (Custom scripts)|
| Compliance with Target| 🔴 NON-COMPLIANT            | 🟢 FULLY COMPLIANT    | 🟡 MARGINAL          |
+-----------------------+-----------------------------+-----------------------+----------------------+
```

---

## 3. Deep-Dive Technical Capability Analysis

### 3.1 Why Supabase Free Tier Cannot Achieve RPO $\le 5$ Minutes
- **Snapshot Architecture:** On the Free Tier, Supabase takes automated database snapshots **once every 24 hours** (typically between 00:00 and 06:00 UTC).
- **Failure Scenario:** If an admissions surge occurs at 4:00 PM on a Saturday and the database crashes, restoring from the previous midnight snapshot results in **16 hours of lost leads**.
- **Conclusion:** While the Free Tier satisfies the ₹0.00/month cost rule, it mathematically **fails the RPO $\le 5$ minutes mandate**.

### 3.2 How Supabase Pro Achieves RPO $\le 5$ Minutes
- **Continuous Write-Ahead Log (WAL) Archiving:**
  - Supabase Pro streams every committed PostgreSQL transaction log continuously to an isolated AWS S3 archive in Mumbai (`ap-south-1`).
  - **Granularity:** Allows restoring the database to any specific second within the last 7 days.
  - **Achieved RPO:** Typically $< 1\text{ minute}$ of data loss.
- **Why Subscription Alone Does Not Guarantee RTO $< 1$ Hour:**
  - Having a Pro subscription does not automatically guarantee rapid recovery unless the operational team practices restore procedures.
  - A database restore must be rehearsed on staging to ensure DNS endpoints reconnect cleanly without stale connection cache issues.

### 3.3 Option 3: Custom Zero-Cost Edge Archiver (Evaluation)
- **Concept:** A scheduled Cloudflare Worker executes a lightweight query exporting leads created within the last 5 minutes to an encrypted Cloudflare KV store or GitHub repository.
- **Evaluation:** While theoretically achieving ₹0.00 spend, it introduces brittle cron dependencies, fails to backup relational sequences atomically, and increases operational complexity for a small business.

---

## 4. Cost Comparison & Financial Impact Analysis

| Architecture Option | Monthly Cost (INR) | Annual Cost (INR) | RPO Compliance | RTO Compliance | Implementation Complexity |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Option 1: Supabase Free** | **₹0.00** | **₹0.00** | 🔴 Non-Compliant (24h) | 🟢 Compliant (~5m) | Zero (Default built-in) |
| **Option 2: Supabase Pro** | **~₹2,100** | **~₹25,200** | 🟢 Compliant ($< 1\text{m}$) | 🟢 Compliant (~10m) | Low (1-click PITR activation) |
| **Option 3: Custom Cron** | **₹0.00** | **₹0.00** | 🟡 Marginal (~5–15m) | 🟢 Compliant (~20m) | High (Custom worker development) |

---

## 5. Management Recommendation & Cost Approval Request

In accordance with Management Decisions 3 and 4:
1. **Current Pre-Launch Staging Phase (Recommended Decision):**
   - Maintain the isolated Supabase Staging environment on **Option 1 (Free Tier, ₹0.00 / month)**.
   - Execute the restore drill on staging to empirically prove the RTO $< 1$ hour capability.
   - Record that the Free Tier operates under a **known 24-hour RPO capability limitation during staging testing**.
2. **Production Launch Readiness Gate (Approval Request):**
   - Prior to opening public admissions and taking tuition fees from parents, management must either:
     - **Approval Pathway A (Authorize Paid Pro Tier):** Formally approve the **₹2,100 / month** expenditure for Supabase Pro to activate native 7-day PITR, achieving complete compliance with the RPO $\le 5$ minutes mandate.
     - **Approval Pathway B (Formally Relax RPO for Pilot):** Formally authorize a temporary pre-launch variance to **RPO $\le 24\text{ hours}$** for the initial Wakad single-center pilot, preserving strictly ₹0.00/month spend until monthly inquiry volume exceeds 100 leads.
