/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Sparkles, Send, CheckCircle2, Phone, Calendar, User, BookOpen, ShieldCheck } from "lucide-react";
import { trackDemoRequest, trackWhatsAppClick } from "../lib/analytics";
import { validateSanitizedName } from "../lib/securitySanitizer";
import { useLanguage } from "../lib/LanguageContext";

interface DemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgram?: string;
  source?: string;
}

export default function DemoBookingModal({
  isOpen,
  onClose,
  defaultProgram = "Abacus Mental Arithmetic",
  source = "modal_popup",
}: DemoBookingModalProps) {
  const { language, t } = useLanguage();
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");
  const [childAge, setChildAge] = useState("7-9");
  const [program, setProgram] = useState(defaultProgram);
  const [deliveryMode, setDeliveryMode] = useState<"offline" | "online">("offline");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanParentName = validateSanitizedName(parentName);
    if (!cleanParentName || cleanParentName.length < 2) {
      setErrorMsg("Please enter a valid parent name (at least 2 letters).");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);

    // Track analytics demo request event (zero PII)
    trackDemoRequest({
      source,
      program,
      deliveryMode,
    });

    // Prepare friendly WhatsApp pre-filled message
    const modeText = deliveryMode === "offline" ? "Offline (Wakad Pune Center)" : "Online Live Class";
    const waText = encodeURIComponent(
      `Hello Arnav Abacus Academy!\n\nI want to book a Free Demo / Assessment Class.\n` +
      `• Parent Name: ${cleanParentName}\n` +
      `• Contact: ${cleanPhone}\n` +
      `• Child's Age Group: ${childAge} years\n` +
      `• Program Interested: ${program}\n` +
      `• Preferred Mode: ${modeText}\n\n` +
      `Looking forward to scheduling the trial session!`
    );

    trackWhatsAppClick("demo_modal_submit", "book_free_trial");

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
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      onClick={handleResetAndClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Badge */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 p-6 text-white relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-1.5 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span>Complimentary Assessment</span>
          </div>

          <h3 className="text-xl md:text-2xl font-black leading-tight text-white">
            Book a Free Demo Class
          </h3>
          <p className="text-xs md:text-sm text-orange-50 mt-1">
            Experience our proven mental math coaching at Wakad Center or Live Online.
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
                Booking Request Sent!
              </h4>
              <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto leading-relaxed">
                Thank you! WhatsApp has opened with your request details. Our head mentor will confirm your slot shortly.
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
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-2.5 rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Parent Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Parent / Guardian Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. Nitin Patil"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-vibrant-orange focus:ring-2 focus:ring-orange-100 transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* WhatsApp Mobile Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  WhatsApp Contact Number *
                </label>
                <div className="relative flex">
                  <span className="inline-flex items-center px-3 text-xs font-bold bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-slate-700">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                    placeholder="9876543210"
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-r-xl focus:bg-white focus:outline-none focus:border-vibrant-orange focus:ring-2 focus:ring-orange-100 transition-all font-medium text-slate-900"
                  />
                </div>
              </div>

              {/* Child's Age Group & Preferred Program (2 columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Child's Age Group
                  </label>
                  <select
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-vibrant-orange font-medium text-slate-900 cursor-pointer"
                  >
                    <option value="4-6">4 - 6 yrs (Junior Foundation)</option>
                    <option value="7-9">7 - 9 yrs (Ideal Abacus Age)</option>
                    <option value="10-12">10 - 12 yrs (Vedic / Speed Math)</option>
                    <option value="13+">13+ yrs (High School / Olympiad)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Course Interested
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-vibrant-orange font-medium text-slate-900 cursor-pointer"
                  >
                    <option value="Abacus Mental Arithmetic">Abacus Mental Arithmetic</option>
                    <option value="Vedic Mathematics (Speed Math)">Vedic Mathematics</option>
                    <option value="School Maths Foundation">School Maths Foundation</option>
                    <option value="Teacher Training / Franchise">Teacher Training / Franchise</option>
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

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Free Demo on WhatsApp</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero spam guarantee. 100% free with no obligation.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
