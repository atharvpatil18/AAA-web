/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UnifiedLeadPayload {
  leadType: "Demo Class" | "Teacher Training" | "Franchise Inquiry" | "Worksheet Download" | "Contact Inquiry";
  parentName: string;
  studentName?: string;
  phone: string;
  email?: string;
  childAge?: string;
  program: string;
  classMode?: string;
  countryCode?: string;
  curriculumOrRole?: string;
  campaign?: string;
  notes?: string;
}

/**
 * Dispatch lead to the centralized Google Sheet Webhook.
 * Uses mode: "no-cors" so requests succeed without CORS preflight hurdles.
 */
export async function dispatchLeadToWebhook(payload: UnifiedLeadPayload): Promise<boolean> {
  const webhookUrl = (import.meta as any).env.VITE_LEADS_WEBHOOK_URL;

  if (!webhookUrl || webhookUrl.trim() === "" || webhookUrl.includes("PASTE_YOUR_WEBHOOK_URL_HERE")) {
    // Webhook not configured yet, gracefully bypass
    return false;
  }

  try {
    const dataToSend = {
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      leadType: payload.leadType || "Website Inquiry",
      parentName: payload.parentName || "N/A",
      studentName: payload.studentName || payload.parentName || "N/A",
      phone: payload.phone ? `${payload.countryCode || "+91"} ${payload.phone}`.trim() : "N/A",
      email: payload.email || "N/A",
      childAge: payload.childAge || "N/A",
      program: payload.program || "N/A",
      classMode: payload.classMode || "N/A",
      curriculumOrRole: payload.curriculumOrRole || "N/A",
      campaign: payload.campaign || "Website",
      notes: payload.notes || "",
    };

    // Google Apps Script accepts POST payloads
    await fetch(webhookUrl.trim(), {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(dataToSend),
    });

    return true;
  } catch (err) {
    console.warn("Lead webhook dispatch warning:", err);
    return false;
  }
}
