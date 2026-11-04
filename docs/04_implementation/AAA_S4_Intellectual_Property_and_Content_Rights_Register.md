# ARNAV ABACUS ACADEMY (AAA) — STAGE 4 COMPLIANCE GATE
# S4-8: INTELLECTUAL PROPERTY & CONTENT RIGHTS REGISTER

**Project:** Arnav Abacus Academy (AAA), Wakad, Pune  
**Document Reference:** `AAA-S4-COMP-08`  
**Phase:** Stage 4 — Pre-Implementation Compliance Gate (`AAA-S4-COMPLIANCE-GATE-01`)  
**Accountable Internal Compliance Officer:** Nitin Patil  
**Academic & Child-Related Authority:** Neha Patil  
**Date:** 04 November 2026  
**Status:** 🟡 **DRAFT IP REGISTER — AWAITING PROOF VERIFICATION**  
**Production Status:** 🔒 **STRICTLY LOCKED**  

---

## 1. Scope & Intellectual Property Governance

Under the **Copyright Act, 1957** and the **Trade Marks Act, 1999**, Arnav Abacus Academy must establish clear ownership, copyright notices, and licensing documentation for all public digital assets, curriculum worksheets, logos, trademarks, and third-party media.

Furthermore, under project governance Rule 6 (`AGENTS.md`), **zero fabricated affiliations, unverified accreditation logos, or unlicensed imagery** may be published on the academy portal.

---

## 2. Master Intellectual Property & Asset Audit Register

| Asset Category | Specific Asset / File Reference | Claimed Ownership / Attribution | Documentary Legal Basis | Identified IP Risk or Infringement Gap | Recommended Corrective Action | Enforcing Owner |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **1. Academy Brand & Name** | `"Arnav Abacus Academy"`, `"AAA"`, Logo (`/logo.png`) | Proprietary to Neha Patil & Nitin Patil. | Common law trademark through continuous commercial use in Wakad, Pune since inception. | Trademark application status not currently recorded in repository. | Nitin Patil to record Trademark Application Number / status in the DVR. | Nitin Patil |
| **2. Third-Party Emblems** | Skill India Logo, NSDC Badge, NCERT Content Partner claims (`LeadForm.tsx`, `translations.ts`). | Government of India / National Skill Development Corporation. | State Emblem of India Act, 2005; Trade Marks Act, 1999. | 🔴 **CRITICAL RISK:** Using Skill India or NSDC emblems without an active, unexpired institutional franchise MoU constitutes statutory infringement. | **Immediately strip Skill India / NSDC logos** from website codebase unless Neha Patil uploads certified MoU to DVR. | Neha Patil |
| **3. Student Media & Showcase** | Photographs and competition videos of minor students in `/showcase` and blog posts. | Minor students & their families. | Copyright Act (Photographer rights) + POCSO / DPDP Privacy. | 🔴 **CRITICAL RISK:** Publishing minor student photographs without documented, signed parental media release forms risks civil and privacy liability. | Neha Patil to verify physical signed parental media consent forms for every displayed student face in the DVR. | Neha Patil |
| **4. Educational Worksheets** | Printable PDF worksheets in `/worksheets` and `/worksheets/vault`. | Arnav Abacus Academy proprietary curriculum. | Copyright Act, 1957 (Original literary & educational work). | Missing explicit copyright notice footer on generated PDF worksheet sheets. | Add prominent copyright notice: *"© 2026 Arnav Abacus Academy, Wakad, Pune. All rights reserved. For personal student practice only."* | Nitin Patil |
| **5. Digital Signatures** | Signature images `/signature_neha.png` and `/signature_board.png` in `src/lib/certificateGenerator.ts`. | Neha Patil & Arnav Academic Board. | Personal identity & electronic execution. | Signature graphic exposed as unencrypted static asset; vulnerable to extraction for fake diplomas. | Restrict official signatures to server-rendered, HMAC-verified physical diplomas; remove raw PNG from public web root. | Nitin Patil |
| **6. Software Fonts & Icons** | Lucide React icons, Tailwind CSS, Google Fonts (Inter, Plus Jakarta Sans). | Open Source (MIT / Apache 2.0 / SIL Open Font License). | Permissive Open Source Software Licenses. | Fully compliant. Proper licenses included in `package.json`. | Retain open-source license attributions in build output. | Nitin Patil |
| **7. Testimonial Quotes** | Parent reviews and Google Maps ratings quoted in `src/data.ts`. | Individual parents / public Google review authors. | Fair use / voluntary public endorsement. | Minor risk: Testimonials must reflect genuine parent reviews without artificial exaggeration. | Cross-reference all 12 website testimonials against authentic Google Business reviews. | Neha Patil |

---

## 3. Mandatory Remediation Directives for Sprint 1

1. **Immediate Stripping of Unverified Emblems:** In Sprint 1 staging scaffolding (`feat/sprint1-public-web`), all instances of Skill India, NSDC, and NCERT partner emblems must be permanently purged from `Hero.tsx`, `Footer.tsx`, and `translations.ts`.
2. **Standardized Copyright Assertions:** The website footer and all printable PDFs must assert unambiguous proprietary ownership:
   ```text
   © 2026 Arnav Abacus Academy (AAA), Wakad, Pune. All rights reserved.
   The AAA Learning Model™ and structured abacus curricula are proprietary educational assets of Neha Patil.
   ```
3. **Parental Media Release Form Verification:** Neha Patil shall verify that every child appearing in website photo galleries has a signed, physical *Parental Media Authorization Form* cataloged in `docs/11_evidence_and_screenshots/`. Any unverified student photograph must be replaced with neutral pedagogical illustrations or stock learning aids.

---

## 4. Compliance Sign-Off Status

This register satisfies deliverable **AAA-S4-COMP-08**. Status: **IP AUDIT COMPLETE — CONTENT REMEDIATION MANDATED FOR SPRINT 1 SCAFFOLDING**.
