# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# WS-11.1: FRONTEND HOSTING & DELIVERY ARCHITECTURE

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S3-SPEC-WS11-01`  
**Stage:** Stage 3 — Architecture & Design  
**Workstream:** WS-11 — Platform Hosting, Infrastructure & Operational Architecture  
**Deliverable:** WS-11.1 — Frontend Hosting & Delivery Architecture Specification  
**Governance Authority:** Nitin Patil (Operations & Technology Lead) & Neha Patil (Academic Director)  
**Date:** 04 November 2026  
**Status:** 🟡 **DRAFT — AWAITING MANAGEMENT REVIEW (GATE 3.6 OPEN)**  
**Execution Mode:** STRICTLY DOCUMENTATION-ONLY (IMPLEMENTATION FREEZE ACTIVE)  

---

## 1. Executive Summary & Application Baseline

The existing Arnav Abacus Academy frontend application (`AAA_WEB`) is built on **React 19** and bundled with **Vite**, utilizing client-side routing via **React Router DOM**. It combines two distinct functional domains in a single Single Page Application (SPA):
1. **Public Marketing & Admissions Website:** High-performance, SEO-optimized public routes (`/`, `/programs/*`, `/parent-guides/*`, `/mentor`, `/contact`, `/showcase`, `/worksheets`, `/blog/*`, `/faqs`, `/campaigns/*`).
2. **AcademyOS Student Practice Portal:** Interactive, timed arithmetic practice drills, dictation audio, instant feedback sounds, and local caching engines (`/login`, `/practice`, `/practice/session`, `/practice/results`).

To satisfy `AGENTS.md` Rule 2 and Management Determination `MGT-DET-S3-09`, any target frontend hosting platform must:
- Deliver ultra-fast static asset performance across India (specifically Pune/Mumbai edge locations).
- Fully support React 19 and Vite Single Page Application (SPA) HTML5 History routing (redirecting all non-file route requests to `index.html` with HTTP 200).
- Preserve all 30 public routes + 1 legacy redirect handler (`/curriculum` $\to$ `/programs`) without breaking organic search equity.
- Provide automated SSL/TLS termination, instant deployment rollbacks, and preview environments for staging.

---

## 2. In-Depth Comparative Evaluation of Frontend Hosting Platforms

| Evaluation Dimension | Option A: Cloudflare Pages (Recommended Target) | Option B: Vercel | Option C: AWS S3 + CloudFront |
| :--- | :--- | :--- | :--- |
| **Architecture Model** | Globally distributed Git-integrated JAMstack edge platform with native CDN. | Developer-centric serverless and static web hosting platform. | Object storage bucket (S3) fronted by global Content Delivery Network (CloudFront). |
| **React 19 & Vite Compatibility** | **Native & Flawless.** Auto-detects Vite build output (`dist/`); builds in $< 60$ seconds. | **Native.** Optimized for Next.js, but fully supports Vite static SPAs out of the box. | **Compatible.** Requires custom CI/CD (GitHub Actions) to run `npm run build` and sync to S3. |
| **SPA HTML5 History Routing** | **Seamless.** Native `_redirects` file or single-click single-page app fallback (`/* /index.html 200`). | **Seamless.** Auto-detects SPA or configured via `vercel.json` rewrites. | **Complex.** Requires custom CloudFront Error Response mapping (404/403 $\to$ `/index.html` with HTTP 200) or CloudFront Functions. |
| **Performance in India (Edge CDN)** | **Superior.** 150+ edge locations in India (including direct Pune and Mumbai peering with Airtel, Jio, Tata). LCP $< 1.2\text{s}$. | **High.** Relies on AWS/GCP Mumbai edge points. Excellent latency across metropolitan India. | **High.** CloudFront has edge locations in Mumbai, Chennai, Delhi, Hyderabad, and Bengaluru. |
| **Deployment Rollback & Previews** | **Instantaneous.** Every commit generates an immutable preview URL; production rollback is a one-click atomic pointer switch ($< 5\text{s}$). | **Instantaneous.** Branch preview URLs and instant production rollbacks supported natively. | **Manual / Complex.** Requires versioned S3 buckets, cache invalidations, and custom rollback scripts. |
| **Security Headers & Edge Control** | **Native.** Configured via static `_headers` file (CSP, HSTS, X-Frame-Options, Permissions-Policy) applied at the global edge. | **Native.** Configured via `vercel.json` headers block. | **Requires Code.** Must deploy Lambda@Edge or CloudFront Functions to inject security response headers. |
| **Bandwidth & Cost at AAA Scale** | **Extremely Cost-Effective.** Free Tier includes unlimited bandwidth and unlimited requests! Paid tier: \$20/month for team features. | **Moderate / Risk.** Free tier has commercial limits; Pro plan is \$20/user/month. Bandwidth overages can be expensive. | **Pay-as-you-go.** S3 storage + CloudFront data transfer out (\$0.085/GB in India). Low base cost, but complex multi-service billing. |
| **Operational Overhead** | **Zero Maintenance.** Git push automatically builds, tests, and deploys. Zero infrastructure management. | **Zero Maintenance.** Automated Git CI/CD. | **High Maintenance.** Requires managing IAM policies, S3 ACLs, CloudFront distributions, and ACM certificates. |
| **Vendor Lock-In** | **Near Zero.** Deploys a pure static `/dist` directory. Can migrate to any other static host in 10 minutes. | **Low.** Pure static export is completely portable. | **Moderate.** AWS infrastructure definitions (CloudFormation/Terraform) create operational lock-in. |

---

## 3. Recommended Frontend Hosting Decision: Cloudflare Pages

**Cloudflare Pages (Option A)** is formally recommended as the target frontend hosting architecture for Arnav Abacus Academy.

### 3.1 Architectural Layout & Edge Delivery Model

```mermaid
flowchart TD
    GitRepo["Git Repository (audit-redesign-remediation)"] -->|Push / Merge Event| CloudflareBuild["Cloudflare Pages CI/CD Build Engine"]
    CloudflareBuild -->|npm run build| DistArtifact["Static Dist Directory (/dist)"]
    DistArtifact --> EdgeNetwork["Cloudflare Global Anycast Edge Network<br/>(Pune, Mumbai, Delhi POPs)"]
    
    Visitor["Parent / Student Browser"] -->|HTTPS / TLS 1.3| EdgeNetwork
    
    EdgeNetwork --> RouteCheck{"Route Match?"}
    RouteCheck -->|Static File (.js, .css, .webp)| EdgeCache["Served from Edge Cache (< 50ms)"]
    RouteCheck -->|Public HTML Route (/programs/abacus)| SPAServe["Serve index.html (200 OK)"]
    RouteCheck -->|AcademyOS Route (/practice/session)| SPAServe
```

### 3.2 Key Operational Capabilities
1. **Preservation of Route Integrity:** A static `public/_redirects` file enforces AAA's 30+1 route contract:
   ```text
   /curriculum  /programs  301
   /*           /index.html 200
   ```
2. **Hardened Security Response Headers:** A static `public/_headers` file injects non-negotiable security headers at the edge:
   ```text
   /*
     Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
     X-Content-Type-Options: nosniff
     X-Frame-Options: SAMEORIGIN
     Referrer-Policy: strict-origin-when-cross-origin
     Permissions-Policy: camera=(), microphone=(), geolocation=()
   ```
3. **Environment Segregation:**
   - **Production:** Bound strictly to branch `main` (custom domain: `arnavabacus.com`).
   - **Staging:** Bound to feature/staging branches (preview domain: `staging.arnavabacus.pages.dev`).
   - **Environment Variables:** Injected securely via Cloudflare dashboard; client environment variables (`VITE_*`) compiled at build time.

---

## 4. Stage-Gate Acceptance & Verification

This specification satisfies **WS-11.1** under Stage 3 Workstream WS-11. It is submitted in **DRAFT** status and will be formally reviewed under Management Determination `MGT-DET-S3-15`. Gate 3.6 remains **OPEN**.
