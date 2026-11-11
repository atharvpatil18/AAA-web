# ARNAV ABACUS ACADEMY (AAA) — STAGE 3 SOLUTION ARCHITECTURE
# WS-11.4: WAF, EDGE SECURITY & NETWORK ARCHITECTURE

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S3-SPEC-WS11-04`  
**Stage:** Stage 3 — Architecture & Design  
**Workstream:** WS-11 — Platform Hosting, Infrastructure & Operational Architecture  
**Deliverable:** WS-11.4 — WAF, Edge Security & Network Architecture Specification  
**Governance Authority:** Nitin Patil (Operations & Technology Lead) & Neha Patil (Academic Director)  
**Date:** 04 November 2026  
**Status:** 🟡 **DRAFT — AWAITING MANAGEMENT REVIEW (GATE 3.6 OPEN)**  
**Execution Mode:** STRICTLY DOCUMENTATION-ONLY (IMPLEMENTATION FREEZE ACTIVE)  

---

## 1. Scope & Perimeter Defense Principles

Arnav Abacus Academy requires a multi-layered edge security perimeter to protect minor student records, prevent DDoS attacks, neutralize spam bots, and enforce strict SSL/TLS encryption.

### 1.1 Non-Negotiable Edge Principle
Enabling a Web Application Firewall (WAF) or cloud proxy **DOES NOT** automatically make an application secure. The edge perimeter serves as the outer shield, while trusted server-side validation, database RLS, and cryptographic verification provide internal defense-in-depth.

---

## 2. Edge Security Perimeter Architecture

```mermaid
flowchart TD
    PublicTraffic["Inbound Web Traffic (Internet)"] --> CloudflareDNS["Cloudflare DNS & Anycast Edge"]
    
    subgraph Cloudflare_Edge_Security["Cloudflare Edge Security Perimeter"]
        CloudflareDNS --> DDoS["L3/L4/L7 DDoS Mitigation Engine"]
        DDoS --> TLS["TLS 1.3 Strict Termination (HSTS Preloaded)"]
        TLS --> WAF["Cloudflare Web Application Firewall (Managed Rules)"]
        WAF --> TurnstileCheck{"Route Requires Bot Verification?"}
        
        TurnstileCheck -->|Yes (/api/v1/leads, /login)| Turnstile["Cloudflare Turnstile (Privacy CAPTCHA)"]
        TurnstileCheck -->|No| RateLimiterEdge["Edge Rate Limiter (Token Bucket)"]
        Turnstile --> RateLimiterEdge
    end
    
    RateLimiterEdge --> RouterCheck{"Route Destination"}
    
    RouterCheck -->|Static Assets & SPA Routes| PagesOrigin["Cloudflare Pages Static Host"]
    RouterCheck -->|API Calls (/api/v1/*)| APIOrigin["Node.js Serverless API Gateway (Mumbai)"]
    
    subgraph Origin_Protection["Origin Cloaking & Strict Transport"]
        APIOrigin --> SecretCheck{"Cloudflare Authenticated Origin Pull?"}
        SecretCheck -->|Valid Client Cert| AppWorker["Execute API Logic"]
        SecretCheck -->|Direct IP Access Attempt| DropPacket["Drop Connection (HTTP 403)"]
    end
```

---

## 3. Detailed Edge Security Controls

| Security Dimension | Technical Specification & Standard Enforced | Protected Assets & Routes | Failure / Abuse Mitigation |
| :--- | :--- | :--- | :--- |
| **1. SSL/TLS Encryption** | **TLS 1.3 Only** with fallback to TLS 1.2; modern cipher suites; **HSTS Preload** (`max-age=31536000; includeSubDomains; preload`). | 100% of academy domains (`arnavabacus.com`, `www.arnavabacus.com`). | Man-in-the-middle attacks and SSL stripping completely blocked. |
| **2. Bot & Spam Mitigation** | **Cloudflare Turnstile:** Invisible, zero-friction privacy CAPTCHA embedded in the 4-field enquiry modal and login screen. | `/api/v1/leads`<br>`/api/v1/auth/request-otp` | Automated headless spam bots and credential-stuffing scripts dropped at edge. |
| **3. Edge Rate Limiting** | **Token-Bucket Edge Rules:**<br>• Public Pages: Max 60 requests/min per IP.<br>• Lead Submissions: Max 5 submissions/10 min per IP.<br>• OTP Requests: Max 3 requests/15 min per phone/IP. | All public and API routes. | HTTP 429 Too Many Requests returned; eliminates brute-force and scraping. |
| **4. Origin Cloaking (Authenticated Origin Pulls)** | API origin servers reject any direct HTTP/S request that does not originate from Cloudflare's verified Anycast IP proxy network using mutual TLS (mTLS). | Backend API Gateway and Database nodes. | Attackers cannot bypass WAF by port-scanning origin server IP addresses. |
| **5. WAF OWASP Core Rules** | Cloudflare Managed Ruleset tuned to block OWASP Top 10 vectors (SQL injection, XSS, remote code execution). | Inbound HTTP POST request bodies. | Exploits blocked at edge before reaching backend compute workers. |
| **6. Hardened HTTP Response Headers** | Standard security response headers injected at edge: Content Security Policy (CSP), `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`. | 100% of HTTP responses. | Clickjacking, MIME-confusion, and cross-site scripting neutralized. |

---

## 4. Administrative Access & Network Segmentation

1. **Zero Public Database Exposure:** The PostgreSQL database port (`5432` / `6543`) is restricted to the API Gateway IP ranges or accessed via encrypted SSL connection pooling with password authentication.
2. **Administrative Access Separation:** AcademyOS internal administrative endpoints (`/admin/*`) require server-side multi-factor authentication (MFA/OTP) and are protected by Cloudflare Access / IP allowlisting for Nitin Patil and Neha Patil.
3. **Secret Key Vault Isolation:** API keys (Meta WhatsApp token, JWT signing secret, HMAC certificate key) are stored in encrypted environment vaults and **NEVER** exposed to public Git repositories or frontend client bundles.

---

## 5. Stage-Gate Acceptance & Verification

This specification satisfies **WS-11.4** under Stage 3 Workstream WS-11. It is submitted in **DRAFT** status and will be formally reviewed under Management Determination `MGT-DET-S3-15`. Gate 3.6 remains **OPEN**.
