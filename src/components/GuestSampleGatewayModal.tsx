/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Sparkles, Mail, MessageSquare, Send, CheckCircle2, Trophy, Clock, Zap, Star, ShieldCheck, ArrowRight, Rocket, Flame, FileText, Download, Lock } from "lucide-react";
import { saveVisitorFeedback } from "../lib/cloudSync";
import { validateSanitizedEmail, validateSanitizedName, validateSanitizedMessage } from "../lib/securitySanitizer";
import { generateQuizWorksheetPDF } from "../lib/quizPdfGenerator";

interface GuestSampleGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSamplePractice: (guestEmail: string, guestName: string, setId: string, qCount?: number) => void;
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
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<10 | 20 | 50 | 100 | 200>(10);
  const [selectedTopicMode, setSelectedTopicMode] = useState<"single" | "double" | "both">("single");
  const [selectedSetId, setSelectedSetId] = useState(initialSetId);
  const [errorMsg, setErrorMsg] = useState("");

  // Attempt Limit Control (Max 5 attempts allowed)
  const [attemptCount, setAttemptCount] = useState<number>(() => {
    const saved = localStorage.getItem("aaa_guest_quiz_attempts");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  // Feedback form state
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();

    if (attemptCount >= 5) {
      setErrorMsg("Maximum free trial attempts reached! You have completed all 5 free guest practice attempts. Please contact Arnav Abacus Academy via WhatsApp (+91 90219 24968) or Email (nehaatharv@gmail.com) for full course enrollment & unlimited access.");
      return;
    }

    const emailVal = validateSanitizedEmail(guestEmail);
    if (!emailVal.valid) {
      setErrorMsg(emailVal.error || "Please enter a valid email address.");
      return;
    }

    let displayName = emailVal.sanitized.split("@")[0];
    if (guestName.trim()) {
      const nameVal = validateSanitizedName(guestName);
      if (!nameVal.valid) {
        setErrorMsg(nameVal.error || "Please enter a valid student name.");
        return;
      }
      displayName = nameVal.sanitized;
    }

    const cleanEmail = emailVal.sanitized;
    setErrorMsg("");

    const newAttempts = attemptCount + 1;
    setAttemptCount(newAttempts);
    localStorage.setItem("aaa_guest_quiz_attempts", newAttempts.toString());

    // Automatically record visitor login / inquiry into Admin Feedback Manager
    saveVisitorFeedback({
      guestEmail: cleanEmail,
      guestName: displayName,
      rating: 5,
      message: `⚡ Sample Visitor Practice Access: Started ${selectedQuestionCount} Qs drill (${selectedSetId}). Attempt ${newAttempts}/5.`,
    });

    onStartSamplePractice(cleanEmail, displayName, selectedSetId, selectedQuestionCount);
  };

  const handleDownloadPdf = async () => {
    let displayName = guestEmail ? guestEmail.split("@")[0] : "Guest Student";
    if (guestName.trim()) {
      displayName = guestName.trim();
    }

    const topicTitle =
      selectedTopicMode === "single"
        ? "ADD & SUB SINGLE DIGIT DIRECT (4-5-6 ROWS)"
        : selectedTopicMode === "double"
        ? "ADD & SUB DOUBLE DIGIT DIRECT (4-5-6 ROWS)"
        : "ADD & SUB MIXED SINGLE & DOUBLE DIGIT DIRECT (4-5-6 ROWS)";

    setIsPdfGenerating(true);
    setErrorMsg("");
    try {
      await generateQuizWorksheetPDF(
        displayName,
        selectedSetId,
        topicTitle,
        selectedQuestionCount
      );
    } catch (err) {
      setErrorMsg("Could not generate PDF worksheet. Please try again.");
    } finally {
      setIsPdfGenerating(false);
    }
  };

  const handleShareEmailPdf = async () => {
    await handleDownloadPdf();
    const displayName = guestName.trim() || (guestEmail ? guestEmail.split("@")[0] : "Candidate");
    const subject = encodeURIComponent(`Arnav Abacus Academy Speed Math Practice Worksheet (${selectedQuestionCount} Qs)`);
    const body = encodeURIComponent(
      `Hi!\n\nHere is the printable Speed Math Worksheet & Academy Brochure for ${displayName}.\nTopic: ${selectedTopicMode.toUpperCase()} (${selectedQuestionCount} Questions)\n\nAttached is the downloaded PDF file: Arnav_Abacus_Worksheet_${selectedQuestionCount}Qs.pdf.\n\nArnav Abacus Academy • Wakad, Pune\nWhatsApp: +91 90219 24968 | Email: nehaatharv@gmail.com`
    );
    window.open(`mailto:${guestEmail || ""}?subject=${subject}&body=${body}`, "_blank");
  };

  const handleShareWhatsappPdf = async () => {
    await handleDownloadPdf();
    const displayName = guestName.trim() || (guestEmail ? guestEmail.split("@")[0] : "Candidate");
    const text = encodeURIComponent(
      `📄 *Arnav Abacus Academy - Speed Math Worksheet & Brochure*\n\nCandidate: *${displayName}*\nTopic: *${selectedTopicMode.toUpperCase()} (${selectedQuestionCount} Questions)*\n\nI generated the printable PDF worksheet! Downloaded file: *Arnav_Abacus_Worksheet_${selectedQuestionCount}Qs.pdf*.\n\n📍 Arnav Abacus Academy (Wakad, Pune, India)\nWhatsApp: +91 90219 24968`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailVal = validateSanitizedEmail(guestEmail);
    if (!emailVal.valid) {
      setErrorMsg(emailVal.error || "Please enter your Email ID above to submit feedback.");
      return;
    }

    const msgVal = validateSanitizedMessage(feedbackMsg);
    if (!msgVal.valid) {
      setErrorMsg(msgVal.error || "Please write a valid message or feedback.");
      return;
    }

    let displayName = emailVal.sanitized.split("@")[0];
    if (guestName.trim()) {
      const nameVal = validateSanitizedName(guestName);
      if (nameVal.valid) {
        displayName = nameVal.sanitized;
      }
    }

    const cleanEmail = emailVal.sanitized;
    const cleanMsg = msgVal.sanitized;

    setFeedbackSubmitting(true);
    try {
      await saveVisitorFeedback({
        guestEmail: cleanEmail,
        guestName: displayName,
        rating: feedbackRating,
        message: cleanMsg,
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
            Free Sample Practice Drills (100 Qs / 10 Mins)
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-900/90 mt-1">
            Experience 100-question speed drills! Enter your Email to log in instantly & track your live rank on the leaderboard.
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

            {/* REDESIGNED MODE 1 & MODE 2 SELECTION ZONE */}
            <div className="space-y-4 bg-slate-50 border-2 border-slate-200 p-5 rounded-2xl">
              
              {/* Attempt Limit Counter Bar */}
              <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl text-xs flex-wrap gap-2">
                <div className="flex items-center gap-2 font-black text-amber-950">
                  <Flame className="w-4 h-4 text-orange-600 fill-orange-500 animate-pulse" />
                  <span>FREE GUEST PRACTICE LIMIT</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black shadow-xs ${
                    attemptCount >= 5 ? "bg-red-600 text-white animate-bounce" : "bg-slate-900 text-amber-300"
                  }`}>
                    {attemptCount} / 5 Attempts Used ({Math.max(0, 5 - attemptCount)} Left)
                  </span>
                </div>
              </div>

              {/* 1st MODE: Number of Questions Selector */}
              <div>
                <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="bg-amber-500 text-slate-950 w-5 h-5 rounded-full inline-flex items-center justify-center font-black text-[10px]">1</span>
                    Select Question Count (Mode 1):
                  </label>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-300">
                    Selected: {selectedQuestionCount} Questions
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {[10, 20, 50, 100, 200].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setSelectedQuestionCount(count as any)}
                      className={`py-2.5 px-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border-2 text-center ${
                        selectedQuestionCount === count
                          ? "bg-slate-900 text-amber-400 border-slate-900 shadow-md scale-[1.02]"
                          : "bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50"
                      }`}
                    >
                      {count} Qs
                    </button>
                  ))}
                </div>
              </div>

              {/* 2nd MODE: Topic & Digit Rows Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="bg-amber-500 text-slate-950 w-5 h-5 rounded-full inline-flex items-center justify-center font-black text-[10px]">2</span>
                    Select Speed Math Topic (Mode 2):
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Option 1: Single Digit Direct */}
                  <div
                    onClick={() => {
                      setSelectedTopicMode("single");
                      setSelectedSetId("abacus-sr1-single-direct-5-6row");
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group ${
                      selectedTopicMode === "single"
                        ? "border-amber-500 bg-amber-500/10 ring-2 ring-amber-400/40 shadow-md scale-[1.01]"
                        : "border-slate-200 bg-white hover:border-amber-300"
                    }`}
                  >
                    <div>
                      <span className="bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                        🧮 SINGLE DIGIT
                      </span>
                      <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight group-hover:text-amber-700 transition">
                        ADD & SUB SINGLE DIGIT DIRECT (4-5-6 ROWS)
                      </h4>
                      <p className="text-[10px] text-slate-500 font-semibold mt-1">
                        Speed single-digit direct mental calculations.
                      </p>
                    </div>
                    {selectedTopicMode === "single" && (
                      <span className="mt-2 text-[9px] font-black text-slate-950 bg-amber-400 px-2 py-0.5 rounded-md self-start shadow-xs">
                        ✓ SELECTED
                      </span>
                    )}
                  </div>

                  {/* Option 2: Double Digit Direct */}
                  <div
                    onClick={() => {
                      setSelectedTopicMode("double");
                      setSelectedSetId("abacus-sr2-double-direct");
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group ${
                      selectedTopicMode === "double"
                        ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-400/40 shadow-md scale-[1.01]"
                        : "border-slate-200 bg-white hover:border-emerald-300"
                    }`}
                  >
                    <div>
                      <span className="bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                        🔢 DOUBLE DIGIT
                      </span>
                      <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight group-hover:text-emerald-700 transition">
                        ADD & SUB DOUBLE DIGIT DIRECT (4-5-6 ROWS)
                      </h4>
                      <p className="text-[10px] text-slate-500 font-semibold mt-1">
                        Master 2-digit direct mental abacus drills.
                      </p>
                    </div>
                    {selectedTopicMode === "double" && (
                      <span className="mt-2 text-[9px] font-black text-white bg-emerald-600 px-2 py-0.5 rounded-md self-start shadow-xs">
                        ✓ SELECTED
                      </span>
                    )}
                  </div>

                  {/* Option 3: Both Options (Mixed) */}
                  <div
                    onClick={() => {
                      setSelectedTopicMode("both");
                      setSelectedSetId("abacus-sr-mixed-direct");
                    }}
                    className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group ${
                      selectedTopicMode === "both"
                        ? "border-purple-500 bg-purple-500/10 ring-2 ring-purple-400/40 shadow-md scale-[1.01]"
                        : "border-slate-200 bg-white hover:border-purple-300"
                    }`}
                  >
                    <div>
                      <span className="bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                        ⚡ BOTH (MIXED)
                      </span>
                      <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight group-hover:text-purple-700 transition">
                        BOTH SINGLE & DOUBLE DIGIT DIRECT
                      </h4>
                      <p className="text-[10px] text-slate-500 font-semibold mt-1">
                        Challenge both 1-digit & 2-digit mixed rows.
                      </p>
                    </div>
                    {selectedTopicMode === "both" && (
                      <span className="mt-2 text-[9px] font-black text-white bg-purple-600 px-2 py-0.5 rounded-md self-start shadow-xs">
                        ✓ SELECTED
                      </span>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Launch Button with Dynamic Caption & PDF Download Option */}
            <div className="space-y-3 pt-1">
              {attemptCount >= 5 ? (
                <div className="bg-red-50 border-2 border-red-300 p-4 rounded-2xl text-center space-y-2.5">
                  <div className="flex items-center justify-center gap-2 text-red-700 font-black text-sm">
                    <Lock className="w-5 h-5 text-red-600 shrink-0" />
                    <span>MAX FREE QUIZ ATTEMPTS REACHED (5/5 COMPLETED)</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    You have used all 5 free guest practice drill attempts! To unlock unlimited practice & full course access across all levels, contact Arnav Abacus Academy below.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center pt-1">
                    <a
                      href="https://wa.me/919021924968?text=Hello%20Arnav%20Abacus%20Academy,%20I%20completed%20my%205%20free%20guest%20attempts%20and%20would%20like%20to%20enroll%20for%20full%20course%20access!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-4 h-4" /> Contact via WhatsApp (90219 24968)
                    </a>
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-amber-300 uppercase tracking-tight"
                >
                  <Rocket className="w-5 h-5 fill-slate-950 animate-bounce shrink-0" />
                  <span>
                    START FREE SAMPLE PRACTICE ({selectedQuestionCount} QUESTIONS • {selectedTopicMode === "single" ? "SINGLE DIGIT DIRECT" : selectedTopicMode === "double" ? "DOUBLE DIGIT DIRECT" : "BOTH SINGLE & DOUBLE"})
                  </span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </button>
              )}

              {/* Printable PDF Worksheet Distribution Options */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3 shadow-md">
                <div className="flex items-center justify-between flex-wrap gap-1 border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs font-black text-white">
                      Printable PDF Quiz ({selectedQuestionCount} Qs + Academy Brochure)
                    </span>
                  </div>
                  <span className="bg-amber-500/20 text-amber-300 text-[9px] font-black px-2 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wider">
                    PDF HUB
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* 1. Download Option */}
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isPdfGenerating}
                    className="py-3 px-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow transition cursor-pointer disabled:opacity-50"
                  >
                    <Download className="w-4 h-4 text-slate-950 shrink-0" />
                    <span>{isPdfGenerating ? "Generating..." : "Download PDF"}</span>
                  </button>

                  {/* 2. Share to Email Option */}
                  <button
                    type="button"
                    onClick={handleShareEmailPdf}
                    disabled={isPdfGenerating}
                    className="py-3 px-3 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                  >
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Share Email</span>
                  </button>

                  {/* 3. Share to WhatsApp Option */}
                  <button
                    type="button"
                    onClick={handleShareWhatsappPdf}
                    disabled={isPdfGenerating}
                    className="py-3 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                  >
                    <MessageSquare className="w-4 h-4 text-white shrink-0" />
                    <span>Share WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
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
