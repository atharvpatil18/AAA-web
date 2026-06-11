/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

/**
 * Initialize Google Tag Manager fallback dataLayer
 */
export const initGtm = () => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
  }
};

/**
 * Push a custom event or trigger tag inside GTM
 */
export const pushGtmEvent = (event: string, data: Record<string, any> = {}) => {
  if (typeof window !== "undefined") {
    initGtm();
    window.dataLayer?.push({
      event,
      ...data,
      timestamp: new Date().toISOString(),
    });
    console.log(`[GTM Event]: ${event}`, data);
  }
};
