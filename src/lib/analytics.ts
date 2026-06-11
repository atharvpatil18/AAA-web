/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { pushGtmEvent } from "./gtm";

/**
 * Track when a parent submits the Free Demo Class booking form
 */
export const trackLeadFormSubmission = (parentName: string, childAge: string, program: string) => {
  pushGtmEvent("lead_form_submitted", {
    parentName,
    childAge,
    program,
    discountActive: true, // Lead form offers 10% off
  });
};

/**
 * Track direct clicks on WhatsApp CTA buttons or links
 */
export const trackDemoClick = (source: string, extraData: Record<string, any> = {}) => {
  pushGtmEvent("demo_button_clicked", {
    clickSource: source,
    ...extraData,
  });
};

/**
 * Track quiz completion states (success/fail/timeout)
 */
export const trackQuizCompletion = (scoreStatus: string, age: number, durationSeconds: number) => {
  pushGtmEvent("quiz_completed", {
    status: scoreStatus,
    childAge: age,
    durationSeconds,
  });
};
