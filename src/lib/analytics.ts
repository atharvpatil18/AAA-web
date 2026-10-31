/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Arnav Abacus Academy — Unified Analytics & Measurement Foundation
 * Strictly Child-Safe & Zero-PII: Never passes names, phones, emails, or personal identifiers.
 * Canonical GA4 Measurement ID: G-M2EL9MYSRL
 */

import { pushGtmEvent } from "./gtm";

// Rate limiting & deduplication cache (e.g. prevent spamming click events within 1.2s)
const recentEvents = new Map<string, number>();

function shouldThrottle(key: string, limitMs = 1200): boolean {
  const now = Date.now();
  const lastTime = recentEvents.get(key) || 0;
  if (now - lastTime < limitMs) {
    return true;
  }
  recentEvents.set(key, now);
  return false;
}

/**
 * Track SPA Route Views
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  pushGtmEvent("page_view", {
    page_path: pagePath,
    page_title: pageTitle || document.title,
    page_location: window.location.href,
  });
};

/**
 * Track Program Views (Generic and Program-specific)
 * Emits both canonical 'programme_view' and 'program_view' for complete backward compatibility.
 */
export const trackProgramView = (programName: string, source: string = "direct") => {
  const normalized = programName.toLowerCase();
  
  // Canonical event as required by Section 10
  pushGtmEvent("programme_view", {
    programme_name: programName,
    view_source: source,
  });

  // Backward-compatible alias
  pushGtmEvent("program_view", {
    program_name: programName,
    view_source: source,
  });

  // Program-specific triggers
  if (normalized.includes("abacus")) {
    pushGtmEvent("abacus_program_view", { source });
  } else if (normalized.includes("vedic")) {
    pushGtmEvent("vedic_math_program_view", { source });
  } else if (normalized.includes("mental")) {
    pushGtmEvent("mental_math_program_view", { source });
  } else if (normalized.includes("school")) {
    pushGtmEvent("school_math_program_view", { source });
  } else if (normalized.includes("ipm") || normalized.includes("olympiad")) {
    pushGtmEvent("ipm_olympiad_program_view", { source });
  }
};

/**
 * Secondary Conversion: WhatsApp Clicks
 */
export const trackWhatsAppClick = (source: string, destinationIntent?: string) => {
  if (shouldThrottle(`whatsapp_${source}`)) return;

  pushGtmEvent("whatsapp_click", {
    click_source: source,
    destination_intent: destinationIntent || "parent_counselling_inquiry",
  });
};

/**
 * Secondary Conversion: Phone Call Clicks
 * Emits canonical 'phone_click' and legacy 'call_click'.
 */
export const trackCallClick = (source: string) => {
  if (shouldThrottle(`call_${source}`)) return;

  pushGtmEvent("phone_click", {
    click_source: source,
    channel: "tel_link",
  });

  pushGtmEvent("call_click", {
    click_source: source,
    channel: "tel_link",
  });
};

export const trackPhoneClick = trackCallClick;

/**
 * Map / Center Location Clicks
 */
export const trackLocationClick = (source: string) => {
  if (shouldThrottle(`location_${source}`)) return;

  pushGtmEvent("location_click", {
    click_source: source,
    center_location: "Wakad, Pune",
  });
};

export const trackGoogleMapsClick = (source: string) => {
  if (shouldThrottle(`maps_${source}`)) return;

  trackLocationClick(source);

  pushGtmEvent("google_maps_click", {
    click_source: source,
    destination: "Google Maps Wakad Center",
  });
};

/**
 * Form Intent Tracking (Engagement)
 * Emits canonical 'form_start' and 'enquiry_form_start'.
 */
export const trackEnquiryFormStart = (formName: string = "lead_form") => {
  if (shouldThrottle(`form_start_${formName}`, 5000)) return;

  pushGtmEvent("form_start", {
    form_name: formName,
  });

  pushGtmEvent("enquiry_form_start", {
    form_name: formName,
  });
};

export const trackFormStart = trackEnquiryFormStart;

/**
 * Primary Conversion: Parent Counselling Booking
 * STRICTLY ZERO-PII: No child or parent names, numbers, or emails are included.
 */
export const trackCounsellingBook = (params: {
  source: string;
  program?: string;
  childAgeGroup?: string;
  deliveryMode?: string;
}) => {
  if (shouldThrottle(`counselling_book_${params.source}`, 1500)) return;

  pushGtmEvent("counselling_book", {
    booking_source: params.source,
    programme_category: params.program || "Abacus & Mental Math",
    child_age_bracket: params.childAgeGroup || "unspecified",
    learning_mode: params.deliveryMode || "offline_wakad",
  });
};

/**
 * Primary Conversion: Form Submit
 * STRICTLY ZERO-PII: No child or parent names, numbers, or emails are included.
 */
export const trackEnquiryFormSubmit = (params: {
  program: string;
  childAgeGroup: string;
  classMode?: string;
  sourceCampaign?: string;
  audienceType?: "parent" | "teacher" | "franchise" | "general";
}) => {
  pushGtmEvent("form_submit", {
    program_category: params.program,
    age_group: params.childAgeGroup,
    learning_mode: params.classMode || "offline",
    campaign_source: params.sourceCampaign || "organic_website",
    audience_type: params.audienceType || "parent",
  });

  pushGtmEvent("enquiry_form_submit", {
    program_category: params.program,
    age_group: params.childAgeGroup,
    learning_mode: params.classMode || "offline",
    campaign_source: params.sourceCampaign || "organic_website",
    audience_type: params.audienceType || "parent",
  });

  trackCounsellingBook({
    source: params.sourceCampaign || "enquiry_form",
    program: params.program,
    childAgeGroup: params.childAgeGroup,
    deliveryMode: params.classMode,
  });
};

export const trackFormSubmit = trackEnquiryFormSubmit;

/**
 * Primary Conversion: Demo Request
 */
export const trackDemoRequest = (params: {
  source: string;
  program?: string;
  deliveryMode?: string;
  childAgeGroup?: string;
}) => {
  if (shouldThrottle(`demo_req_${params.source}`, 1500)) return;

  pushGtmEvent("demo_request", {
    request_source: params.source,
    program_name: params.program || "Abacus",
    delivery_mode: params.deliveryMode || "offline_wakad",
  });

  trackCounsellingBook({
    source: params.source,
    program: params.program,
    deliveryMode: params.deliveryMode,
    childAgeGroup: params.childAgeGroup,
  });
};

/**
 * High-Intent Page Views
 */
export const trackContactPageView = () => {
  pushGtmEvent("contact_page_view", {
    center: "Wakad Pune Center",
  });
};

export const trackResultsPageView = () => {
  pushGtmEvent("results_page_view", {
    section: "showcase_wall_of_fame",
  });
};

export const trackTestimonialsView = () => {
  pushGtmEvent("testimonials_view", {
    type: "parent_reviews",
  });
};

/**
 * Legacy compatibility wrapper for existing component calls
 */
export const trackLeadFormSubmission = (
  _parentName: string,
  childAge: string,
  program: string,
  extra?: { classMode?: string; sourceCampaign?: string }
) => {
  trackEnquiryFormSubmit({
    program,
    childAgeGroup: childAge,
    classMode: extra?.classMode,
    sourceCampaign: extra?.sourceCampaign,
  });
};

export const trackDemoClick = (source: string, extraData: Record<string, any> = {}) => {
  if (source.includes("whatsapp")) {
    trackWhatsAppClick(source, extraData.programName);
  } else if (source.includes("call") || source.includes("tel") || source.includes("phone")) {
    trackCallClick(source);
  } else if (source.includes("map") || source.includes("location") || source.includes("nav")) {
    trackGoogleMapsClick(source);
  } else {
    trackDemoRequest({
      source,
      program: extraData.programName,
    });
  }
};

export const trackQuizCompletion = (scoreStatus: string, age: number, durationSeconds: number) => {
  pushGtmEvent("quiz_completed", {
    status: scoreStatus,
    age_bracket: age ? `${age}y` : "unspecified",
    duration_bucket: durationSeconds < 60 ? "under_1m" : "over_1m",
  });
};
