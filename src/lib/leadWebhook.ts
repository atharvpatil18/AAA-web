import { sanitizeForGoogleSheets, containsProfanityOrVulgarity } from "./securitySanitizer";

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
  honeypot?: string; // Bot trap field
}

/**
 * Dispatch lead to the centralized Google Sheet Webhook.
 * Uses mode: "no-cors" so requests succeed without CORS preflight hurdles.
 * Validates against bot honeypot, profane content, and spreadsheet formula injection.
 */
export async function dispatchLeadToWebhook(payload: UnifiedLeadPayload): Promise<boolean> {
  const webhookUrl = (import.meta as any).env.VITE_LEADS_WEBHOOK_URL;

  if (!webhookUrl || webhookUrl.trim() === "" || webhookUrl.includes("PASTE_YOUR_WEBHOOK_URL_HERE")) {
    // Webhook not configured yet, gracefully bypass
    return false;
  }

  // 1. Bot Honeypot Protection: If hidden honeypot field was filled, reject silently
  if (payload.honeypot && payload.honeypot.trim() !== "") {
    console.warn("Spam bot submission blocked via honeypot trap.");
    return false;
  }

  // 2. Anti-Profanity & Vulgarity Gatekeeper
  const textToCheck = `${payload.parentName || ""} ${payload.studentName || ""} ${payload.email || ""} ${payload.notes || ""}`;
  if (containsProfanityOrVulgarity(textToCheck)) {
    console.warn("Vulgar or abusive content blocked from Google Sheets CRM.");
    return false;
  }

  try {
    // 3. Phone formatting with formula protection
    let formattedPhone = "N/A";
    if (payload.phone && payload.phone.trim() !== "") {
      const raw = payload.phone.trim();
      const code = payload.countryCode || "+91";
      const fullPhone = raw.startsWith("+") ? raw : `${code} ${raw}`;
      formattedPhone = `'${fullPhone}`;
    }

    // 4. Formula injection sanitization on all user-supplied text
    const dataToSend = {
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      leadType: sanitizeForGoogleSheets(payload.leadType || "Website Inquiry"),
      parentName: sanitizeForGoogleSheets(payload.parentName || "N/A"),
      studentName: sanitizeForGoogleSheets(payload.studentName || payload.parentName || "N/A"),
      phone: formattedPhone,
      email: sanitizeForGoogleSheets(payload.email || "N/A"),
      childAge: sanitizeForGoogleSheets(payload.childAge || "N/A"),
      program: sanitizeForGoogleSheets(payload.program || "N/A"),
      classMode: sanitizeForGoogleSheets(payload.classMode || "N/A"),
      curriculumOrRole: sanitizeForGoogleSheets(payload.curriculumOrRole || "N/A"),
      campaign: sanitizeForGoogleSheets(payload.campaign || "Website"),
      notes: sanitizeForGoogleSheets(payload.notes || ""),
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

