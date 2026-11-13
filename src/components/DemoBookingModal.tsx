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
import { useDiscoveryIntake } from "../hooks/useDiscoveryIntake";
import EnquiryReceiptModal from "./EnquiryReceiptModal";
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
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const {
    handleSubmit: submitIntake,
    isSubmitting: hookSubmitting,
    status: intakeStatus,
  } = useDiscoveryIntake();

  const handleResetAndClose = () => {
    setShowReceiptModal(false);
    setSubmitted(false);
    setErrorMsg("");
    setParentName("");
    setPhone("");
    setAssignedUID(null);
    setBotHoneypot("");
    onClose();
  };

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleResetAndClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (showReceiptModal) {
    return (
      <EnquiryReceiptModal
        isOpen={true}
        onClose={handleResetAndClose}
        leadReference={assignedUID || "AAA-LEAD-PENDING"}
        parentName={parentName}
        programName={program}
        deliveryMode={deliveryMode}
      />
    );
  }

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

    // Canonical Hook Dispatch (OBS-01 Hook Unification)
    const intakeResult = await submitIntake(e, {
      parentName: cleanParentName,
      parentPhone: cleanPhone,
      parentEmail: null,
      childAgeBracket: mappedAge,
      courseInterest: mappedCourse,
      serviceConsent,
      marketingConsent,
      parentGuardianConfirmed: true,
      website_url_hp: botHoneypot,
    });

    if (!intakeResult || !intakeResult.success) {
      setIsSubmitting(false);
      setErrorMsg(intakeResult?.error || "Submission could not be completed. Please check your network connection or connect directly with Neha Patil on WhatsApp.");
      return;
    }

    const allocatedRef = intakeResult.leadReference || intakeResult.leadUID || null;
    setAssignedUID(allocatedRef);
    setIsSubmitting(false);

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

    // Mount EnquiryReceiptModal (OBS-02)
    setShowReceiptModal(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleResetAndClose();
        }
      }}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative my-6 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Badge */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-5 sm:p-6 text-white relative border-b border-amber-500/30">
          <button
            onClick={handleResetAndClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 min-w-[44px] min-h-[44px] bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
            aria-label={language === "hi" ? "डायलॉग बंद करें" : language === "mr" ? "डायलॉग बंद करा" : "Close dialog"}
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{t("modalDiscoveryBadge")}</span>
          </div>

          <h3 id="modal-title" className="text-xl md:text-2xl font-black leading-tight text-white pr-10">
            {t("modalDiscoveryTitle")}
          </h3>
          <p className="text-xs md:text-sm text-slate-300 mt-1">
            {t("modalDiscoverySubtitle")}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-6 animate-scale-up">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-slate-900 mb-2">
                {t("modalDiscoverySentTitle")}
              </h4>
              {assignedUID && (
                <div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {language === "hi" ? "बुकिंग संदर्भ:" : language === "mr" ? "नोंदणी संदर्भ:" : "Booking Ref:"} {assignedUID}
                </div>
              )}
              <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto leading-relaxed">
                {t("modalDiscoverySentDesc")}
              </p>
              <button
                onClick={handleResetAndClose}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-2.5 rounded-full transition-all cursor-pointer"
              >
                {t("modalDiscoveryCloseBtn")}
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
                      {language === "hi" ? "व्हाट्सएप पर संपर्क करें" : language === "mr" ? "व्हॉट्सॲपवर संपर्क साधा" : "Connect on WhatsApp"}
                    </a>
                  )}
                </div>
              )}

              {/* Parent Name */}
              <div>
                <label htmlFor="modal-parent-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t("modalDiscoveryParentLabel")}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="modal-parent-name"
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder={t("modalDiscoveryParentPlaceholder")}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* WhatsApp Mobile Number */}
              <div>
                <label htmlFor="modal-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t("modalDiscoveryPhoneLabel")}
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
                    placeholder={language === "hi" || language === "mr" ? "९८७६५४३२१०" : "9876543210"}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-r-xl focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Child's Age Group & Preferred Program (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="modal-child-age" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t("modalDiscoveryAgeLabel")}
                  </label>
                  <select
                    id="modal-child-age"
                    aria-label={t("modalDiscoveryAgeLabel") || "Child's Age Group"}
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full pl-2.5 pr-6 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-medium text-slate-900 cursor-pointer"
                  >
                    <option value="4.5-6">{t("modalDiscoveryAgeOpt1")}</option>
                    <option value="7-9">{t("modalDiscoveryAgeOpt2")}</option>
                    <option value="9-11">{t("modalDiscoveryAgeOpt3")}</option>
                    <option value="12-14">{t("modalDiscoveryAgeOpt4")}</option>
                    <option value="Grade 2-5">{t("modalDiscoveryAgeOpt5")}</option>
                    <option value="Grade 6-10">{t("modalDiscoveryAgeOpt6")}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-program" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {t("modalDiscoveryProgLabel")}
                  </label>
                  <select
                    id="modal-program"
                    aria-label={t("modalDiscoveryProgLabel") || "Programme Interested"}
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full pl-2.5 pr-6 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-orange-500 font-medium text-slate-900 cursor-pointer"
                  >
                    <option value="Abacus Mathematics (Ages 4.5–9)">{t("modalDiscoveryProgOpt1")}</option>
                    <option value="Vedic Mathematics (Ages 9–14)">{t("modalDiscoveryProgOpt2")}</option>
                    <option value="Mental Mathematics (Speed & Recall)">{t("modalDiscoveryProgOpt3")}</option>
                    <option value="School Mathematics (Grades 5–10)">{t("modalDiscoveryProgOpt4")}</option>
                    <option value="IPM & Olympiad Mathematics (Grades 2–9)">{t("modalDiscoveryProgOpt5")}</option>
                    <option value="Teacher Training & Franchise">{t("modalDiscoveryProgOpt6")}</option>
                  </select>
                </div>
              </div>

              {/* Offline vs Online Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {t("modalDiscoveryModeLabel")}
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode("offline")}
                    className={`min-h-[44px] py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      deliveryMode === "offline"
                        ? "bg-orange-50 border-orange-500 text-orange-700 ring-2 ring-orange-200"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>{t("modalDiscoveryModeOffline")}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMode("online")}
                    className={`min-h-[44px] py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      deliveryMode === "online"
                        ? "bg-teal-50 border-teal-500 text-teal-700 ring-2 ring-teal-200"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span>{t("modalDiscoveryModeOnline")}</span>
                  </button>
                </div>
              </div>

              {/* Educational Exploration Callout */}
              <div className="bg-amber-50/70 border border-amber-200/70 rounded-xl p-3 text-[11.5px] text-slate-700 leading-snug">
                <strong className="text-slate-900 block font-bold mb-0.5">{t("modalDiscoveryCalloutTitle")}</strong>
                {t("modalDiscoveryCalloutDesc")}
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
                    {t("modalDiscoveryConsentReq")}
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
                    {t("modalDiscoveryConsentOpt")}
                  </span>
                </label>
              </div>

              {/* Scheduling Confirmation Notice */}
              <p className="text-[10.5px] text-slate-500 leading-relaxed italic bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                {t("modalDiscoveryNote")}
              </p>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 min-h-[48px] bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t("modalDiscoverySubmitBtn")}</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t("modalDiscoverySecurityNote")}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
