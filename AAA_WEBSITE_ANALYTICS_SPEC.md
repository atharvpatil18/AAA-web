# Arnav Abacus Academy — Website Analytics & Measurement Specification™

## 1. Overview & Business Objective
This specification defines the digital measurement foundation for **Arnav Abacus Academy (AAA)**, located in Wakad, Pune, Maharashtra.

The analytics foundation is explicitly designed around the parent decision journey:
```
DISCOVERY (Local/Search/Social)
       ↓
WEBSITE VISIT (HashRouter SPA Route View)
       ↓
PROGRAM EXPLORATION (Abacus / Vedic Maths / School Maths)
       ↓
TRUST BUILDING (Results, Champions Wall, Testimonials, Mentor Credentials)
       ↓
ENQUIRY ACTION (Lead Form / WhatsApp / Phone Call)
       ↓
DEMO CLASS (Diagnostic Assessment)
       ↓
FOLLOW-UP & ADMISSION
```

> **Core Metric Rule**: We do not optimize solely for passive page views or clicks. The primary business objective is:  
> **Relevant Parent → Enquiry → Demo → Enrolment**.

---

## 2. GA4 Property Requirement & Configuration

### Measurement ID Configuration
- **Default Fallback ID**: `G-M2EL9MYSRL` (initialized in `index.html` and handled cleanly in `src/lib/gtm.ts`).
- **Environment Variable**: `VITE_GA4_MEASUREMENT_ID`
- **Duplicate Prevention**: `gtm.ts` safely prevents duplicate installations by ensuring `window.dataLayer` and `window.gtag` are never re-declared or re-initialized across SPA navigations.

---

## 3. Data Privacy & Child Safety Guardrails
Arnav Abacus Academy is a child education center (serving ages 4–14). The measurement implementation enforces strict privacy guardrails:
1. **Zero-PII Analytics Policy**: Analytics events **NEVER** contain:
   - Student or child names
   - Parent or student telephone numbers
   - Email addresses
   - Physical residential addresses
   - Academic records or school report cards
2. **Sanitized Event Parameters**: Payloads contain strictly categorical business variables:
   - `program_category` (e.g. `"Abacus"`, `"Vedic Maths"`)
   - `age_group` (e.g. `"4-6"`, `"7-9"`, `"10-14"`)
   - `learning_mode` (`"offline"` or `"online"`)
   - `campaign_source` (e.g. `"math-phobia"`, `"navbar_header"`)
3. **Excluded Surveillance Tooling**:
   - No Microsoft Clarity
   - No behavioral heatmaps or session recordings tracking children
   - No third-party remarketing pixels without express compliance review

---

## 4. Canonical Event Dictionary

All event names strictly follow the snake_case canonical standard. Variations like `whatsappClick` or `demo_button_clicked` have been unified.

| Canonical Event Name | Category | Trigger Location | Parameters Passed |
| :--- | :--- | :--- | :--- |
| `page_view` | Core Navigation | On every SPA hash-route transition (`SEOHead.tsx`) | `page_path`, `page_title`, `page_location` |
| `program_view` | Exploration | When expanding program cards or viewing program tabs | `program_name`, `view_source` |
| `abacus_program_view` | Program-Specific | When viewing or interacting with Soroban Abacus section | `source` |
| `vedic_math_program_view` | Program-Specific | When viewing or interacting with Vedic Maths section | `source` |
| `school_math_program_view` | Program-Specific | When viewing School Math synergy section | `source` |
| `ipm_program_view` | Program-Specific | When exploring IPM / competitive coaching | `source` |
| `olympiad_program_view` | Program-Specific | When exploring Olympiad math preparation | `source` |
| `enquiry_form_start` | Engagement | When user focuses or starts typing in the Lead Form | `form_name` |
| `enquiry_form_submit` | **Primary Conversion** | On successful submission of Demo Lead Form | `program_category`, `age_group`, `learning_mode`, `campaign_source` |
| `demo_request` | **Primary Conversion** | Form submit or direct demo trial intent | `request_source`, `program_name`, `delivery_mode` |
| `whatsapp_click` | **Secondary Conversion** | Clicking WhatsApp buttons (Floating CTA, Navbar, Program cards) | `click_source`, `destination_intent` |
| `call_click` | **Secondary Conversion** | Clicking `tel:` phone call links | `click_source`, `channel` |
| `google_maps_click` | **Secondary Conversion** | Clicking Google Maps or center direction links | `click_source`, `destination` |
| `location_click` | Engagement | Clicking center address card in Contact page | `click_source`, `center_location` |
| `contact_page_view` | High Intent | When parent navigates to `/contact` | `center: "Wakad Pune Center"` |
| `results_page_view` | Trust Building | When parent navigates to `/showcase` Wall of Fame | `section: "showcase_wall_of_fame"` |
| `testimonials_view` | Trust Building | When parent views parent testimonials carousel | `type: "parent_reviews"` |
| `quiz_completed` | Interactive Demo | When child/parent completes the Speed Challenge | `status`, `age_bracket`, `duration_bucket` |

---

## 5. Conversion Funnel & Key Events Distinction

### Primary Conversions (Direct Business Intent)
1. `enquiry_form_submit`: Full parent enquiry with learning mode and curriculum details submitted.
2. `demo_request`: Explicit request for free diagnostic trial class slot.

### Secondary Conversions (Communication & Local Intent)
1. `whatsapp_click`: Direct WhatsApp conversation initiated.
2. `call_click`: Direct phone call to founder/admissions desk.
3. `google_maps_click`: Physical center visit intent for Wakad, Pune.

---

## 6. Testing & Anti-Duplication Procedure
- **Debounce Throttling**: All click-driven conversion events use a 1200ms–1500ms memory lock in `src/lib/analytics.ts` to prevent duplicate event firing on accidental double-clicks.
- **Verification Matrix**:
  - Desktop (Chrome/Edge): Verified `dataLayer.push` and `gtag("event")` dispatches.
  - Mobile (Android / iOS): Verified responsive floating CTA WhatsApp trigger, phone dialer link trigger, and sticky banner click.
  - SPA Navigation: Switching from `/#/` to `/#/programs` or `/#/contact` cleanly fires single `page_view` without page reload.
