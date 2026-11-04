# AAA DIGITAL TRANSFORMATION — PROJECT DOCUMENTATION REPOSITORY

Welcome to the central project governance and documentation directory for the **Arnav Abacus Academy (AAA)** Digital Transformation Programme.

This directory houses all architectural specifications, requirements documents, audit registers, test evidence, and management reports governing the transformation of AAA's digital presence.

---

## Directory Organization & Purpose

```
docs/
├── README.md                                  # This directory guide & conventions
├── 01_project_governance/                     # Charters, stage sign-offs, decision registers
├── 02_business_requirements/                  # Business requirements (BRD), personas, course matrices
├── 03_existing_website_audit/                 # Technical audits, baseline Lighthouse, crawler logs
├── 04_findings_register/                      # Master findings log & verification registers
├── 05_design_strategy/                        # Brand guidelines, UI design system, typography, palettes
├── 06_website_implementation/                 # Technical architecture specs, component guidelines
├── 07_seo_and_local_seo/                      # Keyword targets, canonical URL maps, local SEO schema
├── 08_marketing_and_admissions/               # Admissions funnel, campaign copy, conversion paths
├── 09_testing_and_quality_assurance/          # Test plans, cross-browser test suites, Core Web Vitals
├── 10_closure_and_management_reports/         # Stage closure packs, executive summaries, handover reports
└── 11_evidence_and_screenshots/               # Test run outputs, Lighthouse reports, verification proofs
```

---

## Detailed Directory Descriptions

| Directory | Scope & Purpose | Key Documents Housed |
|---|---|---|
| **`01_project_governance`** | Institutional project governance, management mandates, sign-off certificates, and decision logs. | `PROJECT_CHARTER.md`, `MANAGEMENT_DECISIONS_REGISTER.md`, `AAA_Stage1_Formal_Signoff.md` |
| **`02_business_requirements`** | Detailed business requirements, academic stream descriptions, parent personas, and admission workflows. | `BRD_BASELINE.md`, `PARENT_PERSONA_MATRIX.md`, `CURRICULUM_SPECIFICATIONS.md` |
| **`03_existing_website_audit`** | Historical technical audits, baseline metrics, code quality evaluations, and performance diagnostics. | `BASELINE_LIGHTHOUSE_AUDIT.md`, `CODEBASE_INVENTORY.md`, `HISTORICAL_AUDIT_LOG.md` |
| **`04_findings_register`** | Living register of issues, audit findings, credential verification tracking, and resolution status. | `MASTER_FINDINGS_REGISTER.csv`, `CREDENTIALS_VERIFICATION_REGISTER.md` |
| **`05_design_strategy`** | Premium brand identity guidelines, typography scales, color schemes, component aesthetics, and imagery rubrics. | `BRAND_STYLE_GUIDE.md`, `DESIGN_SYSTEM_SPEC.md`, `ACCESSIBILITY_GUIDELINES.md` |
| **`06_website_implementation`** | Technical architecture specifications, state management rules, routing architecture, and integration patterns. | `SPA_ARCHITECTURE_SPEC.md`, `DATA_CONTRACTS.md`, `COMPONENT_HIERARCHY.md` |
| **`07_seo_and_local_seo`** | Local search optimization strategy for Wakad/PCMC, keyword matrices, XML sitemap rules, and Schema.org structured data. | `LOCAL_SEO_STRATEGY_WAKAD.md`, `KEYWORD_TARGET_MATRIX.md`, `SCHEMA_SPECIFICATIONS.md` |
| **`08_marketing_and_admissions`** | Parent conversion funnels, counselling booking workflows, campaign landing page strategies, and messaging copy. | `ADMISSIONS_FUNNEL_MAP.md`, `CAMPAIGN_SPECIFICATIONS.md`, `WHATSAPP_WORKFLOWS.md` |
| **`09_testing_and_quality_assurance`** | Quality assurance frameworks, cross-device test matrices, browser testing protocols, and acceptance criteria. | `QA_MASTER_TEST_PLAN.md`, `CROSS_BROWSER_MATRIX.md`, `REGRESSION_CHECKLIST.md` |
| **`10_closure_and_management_reports`** | Executive closure presentations, stage completion summaries, and handover documentation for AAA management. | `STAGE_1_COMPLETION_REPORT.md`, `STAGE_2_BRW_REPORT.md`, `FINAL_HANDOVER_REPORT.md` |
| **`11_evidence_and_screenshots`** | Raw command outputs, automated test logs, Lighthouse run captures, and verification artifacts. | `BUILD_EVIDENCE_LOGS/`, `LIGHTHOUSE_RUNS/`, `SCREENSHOTS/` |

---

## Documentation Conventions

1. **Format:** All documentation must be written in GitHub-Flavored Markdown (`.md`).
2. **Evidence-Based Findings:** Findings must be tagged with their empirical verification status:
   - `[VERIFIED FROM SOURCE]` — Confirmed directly in committed code.
   - `[MANAGEMENT CONFIRMATION REQUIRED]` — Requires documentary evidence and management approval.
   - `[PROPOSED]` — Architectural or governance proposal pending sign-off.
3. **Immutability of Historical Evidence:** Test evidence captured in `11_evidence_and_screenshots/` must not be overwritten. New evidence should be versioned or timestamped.
4. **Zero-PII Compliance:** Never record real parent names, phone numbers, or email addresses in documentation. Use synthetic placeholders (e.g., `parent_sample_01@example.com`).
5. **Traceability:** Every document must cite its version, creation date, author/role, and governance status (Draft / Review / Ratified).
