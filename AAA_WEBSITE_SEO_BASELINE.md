# Arnav Abacus Academy — Website SEO Baseline & Intelligence Foundation™

## 1. Current Page Inventory & Metadata Status

The website operates as a Vite + React SPA with hash routing. Dynamic metadata and canonical link management is orchestrated via [`src/components/SEOHead.tsx`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/components/SEOHead.tsx).

| Page Route | Page Purpose | Canonical URL | Title Tag | Meta Description |
| :--- | :--- | :--- | :--- | :--- |
| `/#/` | Academy Homepage & Trust Hub | `https://arnavabacusacademy-web.vercel.app/#/` | Arnav Abacus Academy \| Abacus & Vedic Maths Classes in Wakad, Pune | Top-rated mental arithmetic, Abacus (ages 4-14) and Vedic Maths in Wakad, Pune. 10X calculation speed, photographic memory, and offline batches. Book a free demo class! |
| `/#/programs` | Program Directory | `https://arnavabacusacademy-web.vercel.app/#/programs` | Abacus, Vedic Maths & School Math Programs \| Arnav Abacus Academy Pune | Explore specialized child brain development programs: Soroban Abacus (Ages 4-14), High-Speed Vedic Maths (Ages 10+), and School Math syllabus synergy. |
| `/#/mentor` | Founder & Master Trainer | `https://arnavabacusacademy-web.vercel.app/#/mentor` | Meet Neha Patil \| Certified Master Abacus & Vedic Maths Mentor Wakad | Learn about Neha Patil, founder and master trainer at Arnav Abacus Academy. IIVA certified, 3+ years experience coaching 200+ Pune and global students. |
| `/#/contact` | Wakad Center & Admissions | `https://arnavabacusacademy-web.vercel.app/#/contact` | Contact Arnav Abacus Academy \| Wakad Center, Phone & Location Pune | Get in touch with Arnav Abacus Academy in Wakad, Pune. Visit our center near Datta Mandir road or call +91 9021924968 for batch timings and admissions. |
| `/#/showcase` | Hall of Fame & Competitions | `https://arnavabacusacademy-web.vercel.app/#/showcase` | Student Results, Hall of Fame & State Champions \| Arnav Abacus Academy | Celebrate student milestones, speed calculation transformations, and international competition winners from Arnav Abacus Academy, Wakad, Pune. |
| `/#/worksheets` | Free Learning Practice Vault | `https://arnavabacusacademy-web.vercel.app/#/worksheets` | Free Abacus & Vedic Maths Practice Worksheets \| Arnav Abacus Academy | Download free printable mental arithmetic practice worksheets and speed math drills for kids aged 4-14 by Arnav Abacus Academy. |
| `/#/faqs` | Parent Queries & Logistics | `https://arnavabacusacademy-web.vercel.app/#/faqs` | Frequently Asked Questions \| Arnav Abacus Academy Wakad, Pune | Answers to parent questions on abacus starting age, Vedic maths syllabus, offline classroom batch sizes, and school curriculum integration. |
| `/#/teacher-franchise` | B2B & Educator Training | `https://arnavabacusacademy-web.vercel.app/#/teacher-franchise` | Abacus Teacher Training & Academy Franchise \| Arnav Abacus Academy Pune | Start your own education franchise or become a certified Abacus & Vedic Maths teacher with certified training, books, and ongoing business guidance. |
| `/#/blog` | Educational Articles | `https://arnavabacusacademy-web.vercel.app/#/blog` | Brain Development & Math Education Blog \| Arnav Abacus Academy | Parenting guides, tips to overcome math phobia, benefits of mental arithmetic, and visual calculation research from Arnav Abacus Academy. |
| `/#/news` | Competitions & Events | `https://arnavabacusacademy-web.vercel.app/#/news` | Academy News & Competition Alerts \| Arnav Abacus Academy Pune | Stay updated on upcoming mental math tournaments, state championship schedules, and student award ceremonies at Arnav Abacus Academy. |
| `/#/brochure` | Syllabus & Prospectus PDF | `https://arnavabacusacademy-web.vercel.app/#/brochure` | Interactive Academy Brochure & Syllabus \| Arnav Abacus Academy | Explore curriculum levels, batch structure, and download the official Arnav Abacus Academy prospectus PDF. |

---

## 2. Technical SEO & Indexability Observations

1. **Sitemap Location**: [`public/sitemap.xml`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/public/sitemap.xml)
   - Exclusively includes public, indexable canonical URLs.
   - Private and authenticated sub-routes (`/practice/session`, `/practice/results`, `/login`) are intentionally excluded.
2. **Robots Configuration**: [`public/robots.txt`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/public/robots.txt)
   - `Allow: /`
   - Explicitly blocks authenticated or private session URLs:
     - `Disallow: /#/practice/session`
     - `Disallow: /#/practice/results`
     - `Disallow: /#/login`
3. **Structured Data Implementation**:
   - **`EducationalOrganization`** & **`LocalBusiness`**: Configured in [`index.html`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/index.html) with exact geo-coordinates (`18.5975866, 73.7810869`), address (Near Datta Mandir, Wakad, Pune 411057), official phone (`+91-9021924968`), and weekly operating schedule.
   - **`FAQPage`**: Dynamically injected on the [`src/pages/Faqs.tsx`](file:///c:/0-ATHARV2NITIN_Projects/AAA_WEB/src/pages/Faqs.tsx) page with real, visible questions and answers (no fabricated schema).

---

## 3. Local SEO Strategy (Wakad, Pune)

AAA operates out of **Wakad, Pune (PCMC)**. Natural local relevance is established without keyword stuffing:
- Landmark: *Near Datta Mandir, Wakad*
- Surrounding Localities: Wakad, Hinjawadi, Pimple Saudagar, Thergaon, Ravet, and Baner.
- High-intent local keywords:
  - *"Abacus classes in Wakad"*
  - *"Vedic Maths coaching in Pune"*
  - *"Mental maths for kids near Hinjawadi / Wakad"*
  - *"Kids brain development classes Wakad"*

---

## 4. Search Intelligence Topic Clustering (Phase 12)

| Cluster | Parent Search Query Intent | Target Page |
| :--- | :--- | :--- |
| **A. Service Searches** | Abacus classes, Vedic Maths classes, Mental Maths, Olympiad Maths, School Maths | `/programs`, `/` |
| **B. Local Searches** | Abacus in Wakad, Vedic Maths Pune, PCMC kids coaching | `/contact`, `/` |
| **C. Problem-Aware Searches** | How to stop child counting on fingers, reduce silly math errors, math phobia help | `/campaigns/math-phobia`, `/blog` |
| **D. Informational Searches** | What is Soroban abacus, difference between Vedic math and Abacus, syllabus age limits | `/faqs`, `/blog` |
