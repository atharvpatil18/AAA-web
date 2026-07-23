/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Sparkles, Mail, MessageSquare, Send, CheckCircle2, Trophy, Clock, Zap, Star, ShieldCheck, ArrowRight } from "lucide-react";
import { saveVisitorFeedback } from "../lib/cloudSync";

interface GuestSampleGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSamplePractice: (guestEmail: string, guestName: string, setId: string) => void;
  initialSetId?: string;
}

export default function GuestSampleGatewayModal({
  isOpen,
  onClose,
  onStartSamplePractice,
  initialSetId = "abacus-sr1-single-direct-5-6row",
}: GuestSampleGatewayModalProps) {
  const [guestEmail, setGuestEmail] = useState("");
  const [guestName, setGuestName] = useState("");
  const [selectedSetId, setSelectedSetId] = useState(initialSetId);
  const [errorMsg, setErrorMsg] = useState("");

  // Feedback form state
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = guestEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    const displayName = guestName.trim() || cleanEmail.split("@")[0];

    // Automatically record visitor login / inquiry into Admin Feedback Manager
    saveVisitorFeedback({
      guestEmail: cleanEmail,
      guestName: displayName,
      rating: 5,
      message: `⚡ Sample Visitor Practice Access: Started 200 Qs / 20 Mins drill (${selectedSetId}).`,
    });

    onStartSamplePractice(cleanEmail, displayName, selectedSetId);
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = guestEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setErrorMsg("Please enter your Email ID above to submit feedback.");
      return;
    }
    if (!feedbackMsg.trim()) {
      setErrorMsg("Please write a message or feedback.");
      return;
    }

    setFeedbackSubmitting(true);
    try {
      await saveVisitorFeedback({
        guestEmail: cleanEmail,
        guestName: guestName.trim() || cleanEmail.split("@")[0],
        rating: feedbackRating,
        message: feedbackMsg,
      });
      setFeedbackSubmitted(true);
      setFeedbackMsg("");
      setTimeout(() => setFeedbackSubmitted(false), 5000);
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  const emailSubject = encodeURIComponent("Request Course Access - Arnav Abacus Academy");
  const emailBody = encodeURIComponent(
    `Hello Arnav Abacus Academy,\n\nI completed the sample practice drill and would like to request full course access.\n\nMy Email ID: ${guestEmail.trim() || "[Insert Email]"}\nMy Name: ${guestName.trim() || "[Insert Name]"}`
  );
  const mailToUrl = `mailto:nehaatharv@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  const waText = encodeURIComponent(
    `Hello Arnav Abacus Academy, I completed the free sample practice session and would like to request course access for my email: ${guestEmail.trim() || "[Insert Email]"}`
  );
  const waUrl = `https://wa.me/919021924968?text=${waText}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden my-8 relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 text-slate-950 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-950/70 hover:text-slate-950 hover:bg-black/10 rounded-full transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-slate-950 text-amber-400 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Guest Trial Portal
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Free Sample Practice Drills
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-900/90 mt-1">
            Experience 200-question marathon drills! Enter your Email to log in instantly & track your live rank on the leaderboard.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
              <X className="w-4 h-4 text-red-500 shrink-0" />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleStart} className="space-y-5">
            {/* User Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Guest Email ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5">
                  Student Name (Optional)
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Your Name (for Leaderboard)"
                  className="w-full px-4 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Topic Selection Cards */}
            <div>
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                Select 200-Question Sample Practice Topic <span className="text-amber-600 font-bold">(20 Mins Marathon)</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* SR-1 Topic 1 */}
                <div
                  onClick={() => setSelectedSetId("abacus-sr1-single-direct-5-6row")}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                    selectedSetId === "abacus-sr1-single-direct-5-6row"
                      ? "border-amber-500 bg-amber-50/70 shadow-md ring-2 ring-amber-400/20"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-orange-100 text-orange-900 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase">
                      Level SR-1 • Topic 1
                    </span>
                    <span className="text-[10px] font-extrabold text-slate-600 flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      <Clock className="w-3 h-3 text-orange-500" /> 200 Qs / 20M
                    </span>
                  </div>
                  <h4 className="font-black text-slate-900 text-sm leading-snug">
                    ADD & SUB SINGLE DIGIT DIRECT (5-6 ROWS)
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Speed single-digit direct mental abacus calculations across 5 to 6 rows.
                  </p>
                </div>

                {/* SR-2 Topic 1 */}
                <div
                  onClick={() => setSelectedSetId("abacus-sr2-double-direct")}
                  className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                    selectedSetId === "abacus-sr2-double-direct"
                      ? "border-amber-500 bg-amber-50/70 shadow-md ring-2 ring-amber-400/20"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase">
                      Level SR-2 • Topic 1
                    </span>
                    <span className="text-[10px] font-extrabold text-slate-600 flex items-center gap-1 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      <Clock className="w-3 h-3 text-orange-500" /> 200 Qs / 20M
                    </span>
                  </div>
                  <h4 className="font-black text-slate-900 text-sm leading-snug">
                    ADD & SUB DOUBLE DIGIT DIRECT
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Speed 2-digit direct addition and subtraction mental drills.
                  </p>
                </div>
              </div>
            </div>

            {/* Launch Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-sm rounded-2xl shadow-xl hover:shadow-2xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              START SAMPLE PRACTICE (200 QUESTIONS / 20 MINS)
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Request Course Access Banner */}
          <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="font-black text-amber-400 text-sm flex items-center gap-1.5">
                <Trophy className="w-4 h-4" /> Enjoyed the Sample Practice? Request Full Access
              </h4>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                Direct Contact
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              If you like our speed practice modules, request complete course access via Email or WhatsApp to unlock all Abacus and Vedic Math levels!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <a
                href={mailToUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                Email: nehaatharv@gmail.com
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp: 90219 24968
              </a>
            </div>
          </div>

          {/* Visitor Feedback Form */}
          <div className="p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Give Us Your Feedback
              </h4>
              <span className="text-[10px] text-slate-500 font-bold">Admin Recorded</span>
            </div>

            {feedbackSubmitted ? (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Thank you! Your feedback has been recorded.
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRating(star)}
                        className="p-1 cursor-pointer transition hover:scale-110"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= feedbackRating
                              ? "text-amber-500 fill-amber-500"
                              : "text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={feedbackMsg}
                  onChange={(e) => setFeedbackMsg(e.target.value)}
                  placeholder="Share your sample practice experience or questions..."
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:border-amber-500"
                />

                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`https://wa.me/919021924968?text=${encodeURIComponent(
                      `Visitor Feedback from ${guestEmail || "Guest"}: ${feedbackMsg}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Send via WhatsApp
                  </a>

                  <button
                    type="submit"
                    disabled={feedbackSubmitting}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-400" />
                    Submit Feedback
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
