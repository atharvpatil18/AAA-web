# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# WS-11.7: COST, SCALABILITY & VENDOR EVALUATION

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S3-SPEC-WS11-07`  
**Stage:** Stage 3 — Architecture & Design  
**Workstream:** WS-11 — Platform Hosting, Infrastructure & Operational Architecture  
**Deliverable:** WS-11.7 — Cost, Scalability & Vendor Evaluation Specification  
**Governance Authority:** Nitin Patil (Operations & Technology Lead) & Neha Patil (Academic Director)  
**Date:** 04 November 2026  
**Status:** 🟡 **DRAFT — AWAITING MANAGEMENT REVIEW (GATE 3.6 OPEN)**  
**Execution Mode:** STRICTLY DOCUMENTATION-ONLY (IMPLEMENTATION FREEZE ACTIVE)  

---

## 1. Scope, Methodology & Operating Assumptions

This specification constructs an empirical cost and scalability model comparing three complete architectural infrastructure combinations for Arnav Abacus Academy.

### 1.1 Operating Scale Assumptions & Activity Parameters
To ensure absolute fiscal reality, cost projections are evaluated across three distinct operating tiers:
1. **Tier 1: Current Operating Scale (Single Center Wakad Baseline):**
   - Active Enrolled Students: 60–120 students across Abacus, Vedic, and School Math.
   - Monthly Inbound Leads: 30–80 qualified parent inquiries.
   - Monthly Practice Drills: 3,000–8,000 completed arithmetic sessions.
   - Website Visitors: 1,500–4,000 unique visitors/month.
2. **Tier 2: Moderate Growth (Pimpri-Chinchwad Expansion — 2 Centers):**
   - Active Enrolled Students: 250–500 students.
   - Monthly Inbound Leads: 150–300 inquiries.
   - Monthly Practice Drills: 25,000–50,000 sessions.
   - Website Visitors: 10,000–25,000 unique visitors/month.
3. **Tier 3: Multi-Center / Franchise Scale (Pune Metropolitan Region — 5+ Centers):**
   - Active Enrolled Students: 1,000–2,500 students.
   - Monthly Inbound Leads: 600–1,500 inquiries.
   - Monthly Practice Drills: 150,000–350,000 sessions.
   - Website Visitors: 50,000–120,000 unique visitors/month.

---

## 2. Comparative Evaluation of 3 Complete Architecture Stacks

Below are the three candidate technology stacks evaluated:
- **Stack 1: Modern Edge-Serverless Stack (Recommended Target):** Cloudflare Pages (Frontend) + Cloudflare/Node.js Serverless (API Gateway) + Supabase Managed PostgreSQL (Database in Mumbai) + Meta WhatsApp Cloud API.
- **Stack 2: Pure AWS Cloud Stack:** AWS S3/CloudFront (Frontend) + AWS Lambda & API Gateway (Backend) + AWS RDS PostgreSQL `db.t4g.micro` + AWS KMS + SNS/Pinpoint.
- **Stack 3: Developer SaaS Stack:** Vercel Pro (Frontend & API) + Neon Serverless Postgres + Upstash Redis + Wati/Twilio for WhatsApp.

### 2.1 Three-Tier Cost Projection Matrix (in USD and Estimated INR)

*Exchange Rate Assumption: 1 USD = ~85 INR (Official published pricing as of late 2026).*

| Infrastructure Component | Stack 1: Modern Edge-Serverless (Cloudflare + Supabase) | Stack 2: Pure AWS Cloud (S3 + Lambda + RDS) | Stack 3: Developer SaaS (Vercel + Neon + Wati) |
| :--- | :--- | :--- | :--- |
| **Frontend & CDN Hosting** | Cloudflare Pages Free Tier (\$0/mo). Unlimited bandwidth. | CloudFront + S3: $\approx \$3\text{--}\$8/\text{mo}$ (Data transfer out). | Vercel Pro Plan: \$20/user/month ($\approx \$40/\text{mo}$ for 2 seats). |
| **API Gateway & Compute** | Serverless Worker Free Tier (\$0/mo). Paid tier: \$5/mo if $> 100\text{k req/day}$. | API Gateway + Lambda: $\approx \$5\text{--}\$12/\text{mo}$ (Invocations + duration). | Included in Vercel Serverless compute quota. |
| **PostgreSQL Database** | Supabase Pro Plan: **\$25/month** (Flat rate, 8GB storage, Mumbai region, daily backups + PITR). | AWS RDS `db.t4g.micro` (Single-AZ Mumbai): $\approx \$22/\text{mo}$ + storage (\$3) + RDS Proxy (\$15) = $\approx \mathbf{\$40/\text{mo}}$. | Neon Launch Plan: **\$19/month** (Compute credits + storage). |
| **Continuous WAL & Backups** | Included in Supabase Pro (7-day PITR). Additional S3 cold bucket: $\approx \$1/\text{mo}$. | S3 snapshot storage + automated backups: $\approx \$4\text{--}\$8/\text{mo}$. | Included in Neon time-travel storage. |
| **WAF, DDoS & Turnstile** | Cloudflare Free / Core Tier (\$0/mo). Enterprise DDoS included. | AWS WAF WebACL + Managed Rules: $\approx \mathbf{\$30/\text{mo}}$ base fee + requests. | Cloudflare fronting Vercel or Vercel Edge Firewall (\$20/mo). |
| **WhatsApp Transactional Messaging** | Meta Official Cloud API: $\approx ₹0.40\text{--}₹0.80$ / utility conversation. $\approx \mathbf{\$3\text{--}\$10/\text{mo}}$ at current scale. | AWS Pinpoint / Meta Direct: $\approx \$5\text{--}\$12/\text{mo}$. | Wati / Aisensy Platform Fee: $\approx \mathbf{\$35\text{--}\$49/\text{mo}}$ base subscription. |
| **Security Secrets Vault** | Cloudflare Secrets + Supabase Vault (\$0/mo). | AWS Secrets Manager: \$0.40/secret/mo + API calls $\approx \$3/\text{mo}$. | Vercel Environment Secrets (\$0/mo). |
| **TOTAL TIER 1 MONTHLY (Current Scale)** | **$\approx \$28\text{--}\$35$ / month<br>($\approx ₹2,380\text{--}₹2,975$ / month)** | **$\approx \$85\text{--}\$110$ / month<br>($\approx ₹7,225\text{--}₹9,350$ / month)** | **$\approx \$114\text{--}\$135$ / month<br>($\approx ₹9,690\text{--}₹11,475$ / month)** |
| **TOTAL TIER 2 MONTHLY (2 Centers)** | **$\approx \$45\text{--}\$60$ / month<br>($\approx ₹3,825\text{--}₹5,100$ / month)** | **$\approx \$130\text{--}\$165$ / month<br>($\approx ₹11,050\text{--}₹14,025$ / month)** | **$\approx \$160\text{--}\$210$ / month<br>($\approx ₹13,600\text{--}₹17,850$ / month)** |
| **TOTAL TIER 3 MONTHLY (5+ Centers)** | **$\approx \$95\text{--}\$140$ / month<br>($\approx ₹8,075\text{--}₹11,900$ / month)** | **$\approx \$240\text{--}\$320$ / month<br>($\approx ₹20,400\text{--}₹27,200$ / month)** | **$\approx \$290\text{--}\$380$ / month<br>($\approx ₹24,650\text{--}₹32,300$ / month)** |

---

## 3. Financial Analysis & Vendor Recommendation

### 3.1 Financial Impact for Arnav Abacus Academy
1. **Dramatic Cost Efficiency:** Stack 1 (Cloudflare + Supabase) delivers a **65% to 75% cost reduction** compared to standard AWS or commercial SaaS setups. At current operating scale, full production infrastructure costs less than **₹3,000 per month** ($\approx \$30\text{--}\$35/\text{month}$).
2. **Zero Commercial SaaS Overhead:** By adopting an internal lightweight admissions CRM in AcademyOS instead of subscribing to HubSpot or Salesforce, AAA saves an estimated **₹25,000 to ₹60,000 annually** in recurring seat licenses.
3. **Linear Predictability:** In Stack 1, costs grow only with actual database storage expansion and WhatsApp utility volume. Zero surprise bandwidth overage bills.

### 3.2 Lock-In Risk & Exit Strategy
- **Frontend Portability:** Pure static Vite output (`dist/`) can be copied from Cloudflare Pages to AWS S3, Vercel, or Netlify in under 15 minutes.
- **Database Portability:** Supabase runs standard PostgreSQL 16. A standard `pg_dump` can restore the entire database into AWS RDS, Google Cloud SQL, or a local Linux server without modifying a single line of SQL or application schema.

---

## 4. Stage-Gate Acceptance & Verification

This specification satisfies **WS-11.7** under Stage 3 Workstream WS-11. It is submitted in **DRAFT** status and will be formally reviewed under Management Determination `MGT-DET-S3-15`. Gate 3.6 remains **OPEN**.
