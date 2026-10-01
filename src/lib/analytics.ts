/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Arnav Abacus Academy — Unified Analytics & Measurement Foundation
 * Strictly Child-Safe & Zero-PII: Never passes names, phones, emails, or personal identifiers.
 */

import { pushGtmEvent } from "./gtm";

// Rate limiting & deduplication cache (e.g. prevent spamming click events within 1.5s)
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
 */
export const trackProgramView = (programName: string, source: string = "direct") => {
  const normalized = programName.toLowerCase();
  
  // 1. Core program view event
  pushGtmEvent("program_view", {
    program_name: programName,
    view_source: source,
  });

  // 2. Program-specific triggers
  if (normalized.includes("abacus")) {
    pushGtmEvent("abacus_program_view", { source });
  } else if (normalized.includes("vedic")) {
    pushGtmEvent("vedic_math_program_view", { source });
  } else if (normalized.includes("school")) {
    pushGtmEvent("school_math_program_view", { source });
  } else if (normalized.includes("ipm")) {
    pushGtmEvent("ipm_program_view", { source });
  } else if (normalized.includes("olympiad")) {
    pushGtmEvent("olympiad_program_view", { source });
  }
};

/**
 * Secondary Conversion: WhatsApp Clicks
 */
export const trackWhatsAppClick = (source: string, destinationIntent?: string) => {
  if (shouldThrottle(`whatsapp_${source}`)) return;

  pushGtmEvent("whatsapp_click", {
    click_source: source,
    destination_intent: destinationIntent || "general_inquiry",
  });
};

/**
 * Secondary Conversion: Phone Call Clicks
 */
export const trackCallClick = (source: string) => {
  if (shouldThrottle(`call_${source}`)) return;

  pushGtmEvent("call_click", {
    click_source: source,
    channel: "tel_link",
  });
};

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

  pushGtmEvent("google_maps_click", {
    click_source: source,
    destination: "Google Maps Wakad Center",
  });
};

/**
 * Form Intent Tracking (Engagement)
 */
export const trackEnquiryFormStart = (formName: string = "lead_form") => {
  if (shouldThrottle(`form_start_${formName}`, 5000)) return;

  pushGtmEvent("enquiry_form_start", {
    form_name: formName,
  });
};

/**
 * Primary Conversion: Enquiry Form Submit
 * STRICTLY ZERO-PII: No child or parent names, numbers, or emails are included.
 */
export const trackEnquiryFormSubmit = (params: {
  program: string;
  childAgeGroup: string;
  classMode?: string;
  sourceCampaign?: string;
  audienceType?: "parent" | "teacher" | "franchise" | "general";
}) => {
  pushGtmEvent("enquiry_form_submit", {
    program_category: params.program,
    age_group: params.childAgeGroup,
    learning_mode: params.classMode || "offline",
    campaign_source: params.sourceCampaign || "organic_website",
    audience_type: params.audienceType || "parent",
  });
};

/**
 * Primary Conversion: Demo Request
 */
export const trackDemoRequest = (params: {
  source: string;
  program?: string;
  deliveryMode?: string;
}) => {
  if (shouldThrottle(`demo_req_${params.source}`, 1500)) return;

  pushGtmEvent("demo_request", {
    request_source: params.source,
    program_name: params.program || "Abacus",
    delivery_mode: params.deliveryMode || "offline_wakad",
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
  trackDemoRequest({
    source: extra?.sourceCampaign || "lead_form",
    program,
    deliveryMode: extra?.classMode || "offline",
  });
};

export const trackDemoClick = (source: string, extraData: Record<string, any> = {}) => {
  if (source.includes("whatsapp")) {
    trackWhatsAppClick(source, extraData.programName);
  } else if (source.includes("call") || source.includes("tel")) {
    trackCallClick(source);
  } else if (source.includes("map")) {
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
