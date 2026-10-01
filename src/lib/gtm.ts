/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Default fallback GA4 Measurement ID if not provided in environment
 */
export const GA4_MEASUREMENT_ID =
  ((import.meta as any).env?.VITE_GA4_MEASUREMENT_ID as string) || "G-M2EL9MYSRL";

/**
 * Initialize Google Analytics 4 / dataLayer cleanly without duplicates
 */
export const initGtm = () => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer?.push(arguments);
      };
    }
  }
};

/**
 * Push an event to dataLayer and execute gtag event if available
 */
export const pushGtmEvent = (event: string, data: Record<string, any> = {}) => {
  if (typeof window !== "undefined") {
    initGtm();

    // Prevent passing undefined or empty objects
    const cleanData = Object.entries(data).reduce<Record<string, any>>((acc, [key, val]) => {
      if (val !== undefined && val !== null) {
        acc[key] = val;
      }
      return acc;
    }, {});

    const payload = {
      event,
      ...cleanData,
      event_timestamp: new Date().toISOString(),
    };

    window.dataLayer?.push(payload);

    if (typeof window.gtag === "function") {
      window.gtag("event", event, cleanData);
    }

    if ((import.meta as any).env?.DEV) {
      console.log(`[AAA Analytics]: ${event}`, cleanData);
    }
  }
};
