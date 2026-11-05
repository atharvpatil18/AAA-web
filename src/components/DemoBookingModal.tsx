/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Sparkles, Send, CheckCircle2, Phone, Calendar, User, BookOpen, ShieldCheck, AlertCircle } from "lucide-react";
import { trackDemoRequest, trackWhatsAppClick, trackCounsellingBook } from "../lib/analytics";
import { validateSanitizedName } from "../lib/securitySanitizer";
import { useLanguage } from "../lib/LanguageContext";
import { sanitizeStringInput } from "../lib/intakeGatewayEngine";
import { DiscoveryIntakePayload } from "../types/gateway";

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgram?: string;
  source?: string;
}

export default function DemoBookingModal({
  isOpen,
  onClose,
  defaultProgram = "Personalised Learning Discovery Session",
  source = "modal_popup",
}: DemoBookingModalProps) {
  const { language, t } = useLanguage();
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [childAge, setChildAge] = useState("7-9");
  const [program, setProgram] = useState(defaultProgram);
  const [deliveryMode, setDeliveryMode] = useState<"offline" | "online">("offline");
  const [serviceConsent, setServiceConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [botHoneypot, setBotHoneypot] = useState("");
  const [assignedUID, setAssignedUID] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const nameValidation = validateSanitizedName(parentName);
    if (!nameValidation.valid) {
      setErrorMsg(nameValidation.error || "Please enter a valid parent name (at least 2 letters).");
      return;
    }
    const cleanParentName = nameValidation.sanitized || parentName.trim();

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!serviceConsent) {
      setErrorMsg("Please provide consent for service communication to schedule the session.");
      return;
    }

    if (botHoneypot.trim()) {
      return;
    }

    setIsSubmitting(true);

    // Map course for gateway engine
    let mappedCourse = program.toLowerCase();
    if (mappedCourse.includes("abacus")) mappedCourse = "abacus";
    else if (mappedCourse.includes("vedic")) mappedCourse = "vedic";
    else if (mappedCourse.includes("mental")) mappedCourse = "mental-math";
    else if (mappedCourse.includes("school")) mappedCourse = "school-math";
    else if (mappedCourse.includes("olympiad") || mappedCourse.includes("ipm")) mappedCourse = "olympiad";
    else mappedCourse = "abacus";

    // Map age for gateway engine
    let mappedAge = childAge;
    if (!["4.5-6", "7-9", "10-14"].includes(mappedAge)) {
      if (mappedAge.includes("10") || mappedAge.includes("11") || mappedAge.includes("12") || mappedAge.includes("13") || mappedAge.includes("14") || mappedAge.includes("Grade 6")) {
        mappedAge = "10-14";
      } else if (mappedAge.includes("7") || mappedAge.includes("8") || mappedAge.includes("9") || mappedAge.includes("Grade 2") || mappedAge.includes("Grade 3") || mappedAge.includes("Grade 4") || mappedAge.includes("Grade 5")) {
        mappedAge = "7-9";
      } else {
        mappedAge = "4.5-6";
      }
    }

    const idempotencyKey = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `MODAL-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const payload: DiscoveryIntakePayload = {
      parentName: cleanParentName,
      parentPhone: cleanPhone,
      parentEmail: null,
      childAgeBracket: mappedAge,
      courseInterest: mappedCourse,
      serviceConsent,
      marketingConsent,
      parentGuardianConfirmed: true,
      website_url_hp: botHoneypot,
      idempotencyKey,
    };

    let serverRes: Response;
    let serverData: any;

    try {
      serverRes = await fetch("/api/discovery-intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify(payload),
      });

      if (serverRes.status === 404) {
        throw new Error("GATEWAY_ENDPOINT_404");
      }

      serverData = await serverRes.json();
    } catch (networkErr: any) {
      setIsSubmitting(false);
      const is404 = networkErr?.message === "GATEWAY_ENDPOINT_404";
      setErrorMsg(
        is404
          ? "The online admissions gateway is offline in this environment. Your session request was NOT saved online. You can book directly with Neha Patil on WhatsApp."
          : "Network offline or server unreachable. Your request could NOT be registered online. You can connect directly with Neha Patil on WhatsApp."
      );
      return;
    }

    if (serverRes.status === 429) {
      setIsSubmitting(false);
      setErrorMsg(`Rate limit exceeded. Please wait ${serverData?.retryAfterSeconds || 900} seconds before retrying.`);
      return;
    }

    if (!serverRes.ok || (!serverData?.success && serverRes.status !== 200 && serverRes.status !== 201)) {
      setIsSubmitting(false);
      setErrorMsg(serverData?.error || "Submission failed. Please check your inputs.");
      return;
    }

    const allocatedRef = serverData.leadReference || serverData.leadUID || null;
    setAssignedUID(allocatedRef);

    // Track analytics demo request & counselling booking events (Strictly zero PII)
    trackCounsellingBook({
      source,
      program,
      childAgeGroup: childAge,
      deliveryMode,
    });

    trackDemoRequest({
      source,
      program,
      deliveryMode,
      childAgeGroup: childAge,
    });

    // Prepare friendly WhatsApp pre-filled message
    const modeText = deliveryMode === "offline" ? "Offline (Wakad Pune Center)" : "Online Live Class";
    const waText = encodeURIComponent(
      `Hello Arnav Abacus Academy!\n\nI want to book a Personalised Learning Discovery Session for my child.\n` +
      `• Lead Ref: ${allocatedRef || "Pending"}\n` +
      `• Parent Name: ${cleanParentName}\n` +
      `• Contact: ${cleanPhone}\n` +
      `• Child's Age Group: ${childAge} years\n` +
      `• Focus / Programme: ${program}\n` +
      `• Preferred Mode: ${modeText}\n\n` +
      `Looking forward to scheduling the discovery exploration session!`
    );

    trackWhatsAppClick("discovery_modal_submit", "book_discovery_session");

    // Open WhatsApp directly
    window.open(`https://wa.me/919021924968?text=${waText}`, "_blank");

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMsg("");
    setParentName("");
    setPhone("");
    setAssignedUID(null);
    setBotHoneypot("");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      onClick={handleResetAndClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Badge */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white relative border-b border-amber-500/30">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-1.5 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Personalised Learning Discovery Session</span>
          </div>

          <h3 id="modal-title" className="text-xl md:text-2xl font-black leading-tight text-white">
            Book a Personalised Discovery Session
          </h3>
          <p className="text-xs md:text-sm text-slate-300 mt-1">
            An educator-led diagnostic exploration with Founder Neha Patil at our Wakad Center or Live Online.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-6 animate-scale-up">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-2">
                Discovery Session Request Sent!
              </h4>
              {assignedUID && (
                <div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-bold px-3 py-1 rounded-full mb-3">
                  Booking Ref: {assignedUID}
                </div>
              )}
              <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto leading-relaxed">
                Thank you! WhatsApp has opened with your request details. Founder Neha Patil and our academic team will confirm your Discovery Session slot shortly.
              </p>
              <button
                onClick={handleResetAndClose}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-2.5 rounded-full transition-all cursor-pointer"
              >
                Close &amp; Continue Browsing
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Invisible Honeypot Trap for spam bots */}
              <input
                type="text"
                name="website_url_hp"
                value={botHoneypot}
                onChange={(e) => setBotHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {errorMsg && (
                <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-3.5 rounded-xl font-medium flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{errorMsg}</span>
                  </div>
                  {errorMsg.includes("WhatsApp") && (
                    <a
                      href={`https://wa.me/919021924968?text=${encodeURIComponent(
                        `Hello Neha Patil! I attempted to book a trial class for ${program} on the academy website, but encountered an offline network issue. Please coordinate our discovery session.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3.5 rounded-lg text-xs transition-colors shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Connect on WhatsApp
                    </a>
                  )}
                </div>
              )}

              {/* Parent Name */}
              <div>
                <label htmlFor="modal-parent-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Parent / Guardian Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="modal-parent-name"
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Sangeeta Sharma"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* WhatsApp Mobile Number */}
              <div>
                <label htmlFor="modal-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  WhatsApp Contact Number *
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3 text-xs font-bold bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-700">
                    +91
                  </span>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="9876543210"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-r-xl focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Child's Age Group & Preferred Program (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-child-age" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Child's Age / Grade
                  </label>
                  <select
                    id="modal-child-age"
                    aria-label="Child's Age Group"
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-medium text-slate-900 cursor-pointer"
                  >
                    <option value="4.5-6">4.5 - 6 yrs (Junior Abacus)</option>
                    <option value="7-9">7 - 9 yrs (Foundation Abacus)</option>
                    <option value="9-11">9 - 11 yrs (Vedic / Mental Math)</option>
                    <option value="12-14">12 - 14 yrs (Advanced Speed Math)</option>
                    <option value="Grade 2-5">Grade 2 - 5 (IPM & Olympiad)</option>
                    <option value="Grade 6-10">Grade 6 - 10 (School Board & Olympiad)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-program" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Programme Interested
                  </label>
                  <select
                    id="modal-program"
                    aria-label="Programme Interested"
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-medium text-slate-900 cursor-pointer"
                  >
                    <option value="Abacus Mathematics (Ages 4.5–9)">Abacus Mathematics (Ages 4.5–9)</option>
                    <option value="Vedic Mathematics (Ages 9–14)">Vedic Mathematics (Ages 9–14)</option>
                    <option value="Mental Mathematics (Speed & Recall)">Mental Mathematics</option>
                    <option value="School Mathematics (Grades 5–10)">School Mathematics (Grades 5–10)</option>
                    <option value="IPM & Olympiad Mathematics (Grades 2–9)">IPM &amp; Olympiad Mathematics</option>
                    <option value="Teacher Training & Franchise">Teacher Training &amp; Franchise</option>
                  </select>
                </div>
              </div>

              {/* Offline vs Online Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Learning Mode Preference
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode("offline")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      deliveryMode === "offline"
                        ? "bg-orange-50 border-orange-500 text-orange-700 ring-2 ring-orange-200"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>🏫 Wakad Center (Offline)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMode("online")}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      deliveryMode === "online"
                        ? "bg-teal-50 border-teal-500 text-teal-700 ring-2 ring-teal-200"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>💻 Live Online (Global)</span>
                  </button>
                </div>
              </div>

              {/* Educational Exploration Callout */}
              <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-3 text-[11.5px] text-slate-700 leading-snug">
                <strong className="text-slate-900 block font-bold mb-0.5">What happens in a Discovery Session?</strong>
                An encouraging 1-on-1 session where we explore your child's number sense, bead visualization aptitude, and focus to recommend the ideal learning track. Low-pressure and educational—never an exam.
              </div>

              {/* Unbundled Dual Consent Protocol & Scheduling Notice */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-700">
                  <input
                    type="checkbox"
                    checked={serviceConsent}
                    onChange={(e) => setServiceConsent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                    required
                  />
                  <span>
                    <strong>Required:</strong> I consent to receiving Discovery Session scheduling messages via WhatsApp / SMS from Arnav Abacus Academy.
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-slate-500">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span>
                    Optional: I agree to receive occasional mathematical insights and academy announcements.
                  </span>
                </label>
              </div>

              {/* Scheduling Confirmation Notice */}
              <p className="text-[10.5px] text-slate-500 leading-relaxed italic bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                * Submission represents a Discovery Session scheduling request, not an automatically confirmed appointment. Founder Neha Patil personally confirms each slot based on batch availability.
              </p>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Discovery Session on WhatsApp</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero spam policy. Small batches (maximum 5 students). No obligation.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
