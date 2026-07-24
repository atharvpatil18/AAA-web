/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { Mail, Sparkles, Key, CheckCircle, AlertCircle, ArrowRight, ShieldCheck, User, Shield, Zap, Clock, Trophy, MessageSquare, Send, Star, CheckCircle2, Flame, ArrowDown, TrendingUp, Rocket, FileText, Download, Lock, AlertTriangle } from "lucide-react";
import { saveVisitorFeedback } from "../lib/cloudSync";
import { validateSanitizedEmail, validateSanitizedName, validateSanitizedMessage } from "../lib/securitySanitizer";
import { generateQuizWorksheetPDF } from "../lib/quizPdfGenerator";

export default function Login() {
  const { sendEmailOTP, verifyEmailOTP } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/practice";

  // Mode Toggle State ("student" for OTP login, "guest" for free sample practice drills)
  const [authMode, setAuthMode] = useState<"student" | "guest">("student");

  // Registered Student Form inputs
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // Guest Mode Form, Mode Selectors & Drill State
  const [guestEmail, setGuestEmail] = useState("");
  const [guestName, setGuestName] = useState("");
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<10 | 20 | 50 | 100 | 200>(10);
  const [selectedTopicMode, setSelectedTopicMode] = useState<"single" | "double" | "both">("single");
  const [selectedSampleSetId, setSelectedSampleSetId] = useState("abacus-sr1-single-direct-5-6row");
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  // Attempt Limit Control (Max 5 attempts allowed)
  const [attemptCount, setAttemptCount] = useState<number>(() => {
    const saved = localStorage.getItem("aaa_guest_quiz_attempts");
    return saved ? parseInt(saved, 10) : 0;
  });

  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Workflow states
  const [otpSent, setOtpSent] = useState(false);
  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null);

  const isConfigured = () => {
    const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID;
    const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY;

    return serviceId && serviceId !== "YOUR_SERVICE_ID_HERE" &&
           templateId && templateId !== "YOUR_TEMPLATE_ID_HERE" &&
           publicKey && publicKey !== "YOUR_PUBLIC_KEY_HERE";
  };

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Security & Anti-Spam / Anti-Vulgarity Validation
    const nameVal = validateSanitizedName(userName);
    if (!nameVal.valid) {
      setError(nameVal.error || "Please enter a valid student name.");
      return;
    }

    const emailVal = validateSanitizedEmail(email);
    if (!emailVal.valid) {
      setError(emailVal.error || "Please enter a valid email address.");
      return;
    }

    const cleanName = nameVal.sanitized;
    const cleanEmail = emailVal.sanitized;

    setError(null);
    setLoading(true);

    try {
      const res = await sendEmailOTP(cleanEmail, cleanName);
      if (res.success) {
        setOtpSent(true);
        setSimulatedOtp(res.otp);
        setSuccessMsg(`Verification code sent to ${cleanEmail}!`);
      } else {
        setError(res.error || "Could not send verification email.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = otp.trim().replace(/\D/g, "");
    if (!cleanOtp || cleanOtp.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await verifyEmailOTP(email, userName, cleanOtp);
      if (res.success) {
        setSuccessMsg("Logged in successfully! Redirecting...");
        setTimeout(() => navigate(redirectTo), 1000);
      } else {
        setError(res.error || "Invalid verification code.");
      }
    } catch (err) {
      setError("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartGuestPractice = (e: React.FormEvent) => {
    e.preventDefault();

    // Enforce 5 attempt limit restriction
    if (attemptCount >= 5) {
      setError("Maximum free trial attempts reached! You have completed all 5 free guest practice attempts. Please contact Arnav Abacus Academy via WhatsApp (+91 90219 24968) or Email (nehaatharv@gmail.com) for full course enrollment & unlimited access.");
      return;
    }

    // Security & Anti-Spam / Anti-Vulgarity Validation for Guest Mode
    const emailVal = validateSanitizedEmail(guestEmail);
    if (!emailVal.valid) {
      setError(emailVal.error || "Please enter a valid email address.");
      return;
    }

    let displayName = emailVal.sanitized.split("@")[0];
    if (guestName.trim()) {
      const nameVal = validateSanitizedName(guestName);
      if (!nameVal.valid) {
        setError(nameVal.error || "Please enter a valid student name.");
        return;
      }
      displayName = nameVal.sanitized;
    }

    const cleanEmail = emailVal.sanitized;
    setError(null);

    // Increment attempt count
    const newAttempts = attemptCount + 1;
    setAttemptCount(newAttempts);
    localStorage.setItem("aaa_guest_quiz_attempts", newAttempts.toString());

    localStorage.setItem("aaa_guest_user", JSON.stringify({ email: cleanEmail, name: displayName }));

    // Automatically record visitor login / inquiry into Admin Feedback Manager
    saveVisitorFeedback({
      guestEmail: cleanEmail,
      guestName: displayName,
      rating: 5,
      message: `⚡ Sample Visitor Practice Access: Started ${selectedQuestionCount} Qs drill (${selectedSampleSetId}). Attempt ${newAttempts}/5.`,
    });

    navigate(`/practice/session?setId=${selectedSampleSetId}&mode=guest-drill&count=${selectedQuestionCount}`);
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
    setError(null);
    try {
      await generateQuizWorksheetPDF(
        displayName,
        selectedSampleSetId,
        topicTitle,
        selectedQuestionCount
      );
    } catch (err) {
      setError("Could not generate PDF worksheet. Please try again.");
    } finally {
      setIsPdfGenerating(false);
    }
  };

  const handleGuestFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailVal = validateSanitizedEmail(guestEmail);
    if (!emailVal.valid) {
      setError(emailVal.error || "Please enter your email address above to submit feedback.");
      return;
    }

    const msgVal = validateSanitizedMessage(feedbackMsg);
    if (!msgVal.valid) {
      setError(msgVal.error || "Please enter a valid feedback message.");
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

    setError(null);
    await saveVisitorFeedback({
      guestEmail: cleanEmail,
      guestName: displayName,
      rating: feedbackRating,
      message: cleanMsg,
    });
    setFeedbackSubmitted(true);
    setFeedbackMsg("");
    setTimeout(() => setFeedbackSubmitted(false), 5000);
  };

  // Local host environment check to show local practice hooks
  const isLocal = typeof window !== "undefined" && (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname.endsWith(".local") ||
    window.location.hostname.startsWith("192.168.") ||
    window.location.hostname.startsWith("10.") ||
    !!(import.meta as any).env?.DEV
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-vibrant-orange/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-vibrant-teal/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className={`w-full ${authMode === "guest" ? "max-w-2xl" : "max-w-md"} bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative z-10 transition-all duration-300`}>
        
        {/* Visual Brand Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-6 text-center border-b border-purple-900/40 relative">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {authMode === "student" ? "Academy Student & Parent Portal" : "Free Visitor Sample Practice Gateway"}
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
            {authMode === "student" ? "Access Arnav Abacus Practice Zone" : "Free Sample Practice Drills (100 Qs / 10 Mins)"}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-lg mx-auto">
            {authMode === "student"
              ? "Sign in with email verification to join dynamic math drills & track scores"
              : "Experience 100-question speed drills! Enter email to log in instantly & track live leaderboard rank."}
          </p>
        </div>

        {/* Out-of-the-Box Local Pointer Banner (POINTING DIRECTLY TO FREE GUEST PRACTICE TRIAL TOGGLE) */}
        {isLocal && (
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-4 text-slate-950 border-b border-amber-300 relative overflow-hidden group shadow-inner">
            {/* Background glow pointer accent */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-yellow-300/30 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>

            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="bg-slate-950 text-amber-400 p-2 rounded-xl shrink-0 shadow-lg animate-pulse">
                  <Flame className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="bg-slate-950 text-amber-400 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow flex items-center gap-1">
                      🔥 WAKAD PUNE #1 FREE GUEST PRACTICE TRIAL
                    </span>
                    <span className="text-[10px] font-extrabold text-slate-950 bg-white/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      NO OTP REQUIRED • INSTANT FREE GUEST TRIAL
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-black tracking-tight text-slate-950 mt-0.5">
                    Test 10X Mental Calculation Speed ({selectedQuestionCount} Qs Speed Drill)
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setAuthMode("guest");
                  setError(null);
                }}
                className="bg-slate-950 hover:bg-slate-900 text-amber-400 text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-400 shrink-0 group-hover:ring-4 group-hover:ring-amber-400/30"
              >
                <Zap className="w-3.5 h-3.5 fill-amber-400" />
                TRY FREE GUEST DRILL
                <ArrowDown className="w-3.5 h-3.5 animate-bounce text-amber-400" />
              </button>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-950/10 flex items-center justify-between flex-wrap gap-1 relative z-10">
              <p className="text-[10px] font-extrabold text-slate-900/90">
                🏆 <strong className="font-black">Arnav Abacus Academy (Wakad, Pune, India)</strong> — Best Abacus & Vedic Maths Brain Development
              </p>
              
              {/* Dynamic Animated Pointer Label pointing directly down to the Free Guest Practice Trial button */}
              <button
                type="button"
                onClick={() => {
                  setAuthMode("guest");
                  setError(null);
                }}
                className="bg-slate-950 hover:bg-slate-900 text-amber-300 border-2 border-amber-400 text-[10px] font-black px-3 py-1 rounded-full shadow-xl animate-bounce flex items-center gap-1 cursor-pointer transition-all hover:scale-105"
              >
                <Flame className="w-3 h-3 text-orange-400 fill-orange-400 animate-pulse" />
                <span>👇 CLICK BELOW FOR FREE GUEST PRACTICE TRIAL (NO OTP)</span>
                <ArrowDown className="w-3 h-3 text-amber-300 animate-bounce" />
              </button>
            </div>
          </div>
        )}

        {/* Toggle Switch Bar with Dynamic Flashing Callout & Arrow */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex gap-2 relative">
          <button
            type="button"
            onClick={() => {
              setAuthMode("student");
              setError(null);
            }}
            className={`flex-1 py-3 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === "student"
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            Student Login (OTP)
          </button>

          {/* Target Button for Free Guest Practice Trial */}
          <div className="relative flex-1">
            <button
              type="button"
              onClick={() => {
                setAuthMode("guest");
                setError(null);
              }}
              className={`w-full py-3 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === "guest"
                  ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-lg font-black border border-amber-300"
                  : "bg-gradient-to-r from-amber-400/30 via-orange-400/30 to-amber-400/30 text-amber-950 border-2 border-amber-500 hover:bg-amber-400/40 ring-4 ring-amber-400/40 animate-pulse font-black shadow-md"
              }`}
            >
              <Zap className="w-4 h-4 text-amber-600 fill-amber-600 animate-bounce" />
              Free Guest Practice Trial
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8">
          
          {/* Error and Success notifications */}
          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border-2 border-red-200 text-red-700 text-xs font-black rounded-xl flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{error}</span>
              </div>
              <button type="button" onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
                &times;
              </button>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3.5 flex items-center gap-2 mb-4 text-xs font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* MODE 1: Student Login (OTP) */}
          {authMode === "student" && (
            <div className="space-y-4">
              {simulatedOtp && otpSent && !isConfigured() && (
                <div className="bg-amber-50 border-2 border-dashed border-amber-300 text-amber-900 rounded-xl p-4 mb-5 text-xs">
                  <div className="font-bold flex items-center gap-1.5 text-amber-800 mb-1">
                    <ShieldCheck className="w-4 h-4 text-amber-600" /> Simulated Email Gateway
                  </div>
                  <p className="text-slate-700">
                    OTP sent to {email}: <span className="font-black font-mono text-base text-amber-900 tracking-wider bg-white px-2 py-0.5 rounded border border-amber-300/60 shadow-sm ml-1 select-all cursor-pointer">{simulatedOtp}</span>
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">Click the code to copy.</p>
                </div>
              )}

              {!otpSent ? (
                <form onSubmit={handleRequestOTP} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter student name (e.g. Aarav Gupta)"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-vibrant-teal focus:ring-2 focus:ring-vibrant-teal/10 font-medium text-sm outline-none transition-all"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email id (e.g. student@gmail.com)"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-vibrant-teal focus:ring-2 focus:ring-vibrant-teal/10 font-medium text-sm outline-none transition-all"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Privacy Disclaimer */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex gap-2.5 text-[11px] text-slate-650 leading-relaxed font-medium">
                    <Shield className="w-4 h-4 text-vibrant-teal shrink-0 mt-0.5" />
                    <p>
                      <span className="font-bold text-slate-800">Privacy Policy Disclaimer:</span> Your email address is processed strictly for local verification purposes and is <span className="font-bold text-vibrant-teal">not stored or recorded</span> on any databases by Arnav Abacus Academy.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-vibrant-teal hover:bg-vibrant-teal/90 text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all cursor-pointer disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Requesting OTP..." : "Get Verification Code"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs flex flex-col gap-1 text-slate-700">
                    <div>
                      <span className="text-slate-400 font-bold">Candidate:</span> <span className="font-black text-slate-900">{userName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold">Email:</span> <span className="font-bold font-mono text-slate-900">{email}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Enter 6-Digit OTP Code
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(false);
                          setSimulatedOtp(null);
                          setError(null);
                        }}
                        className="text-[10px] text-vibrant-teal hover:underline font-bold"
                      >
                        Change Details
                      </button>
                    </div>
                    <div className="relative">
                      <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        placeholder="******"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-vibrant-teal focus:ring-2 focus:ring-vibrant-teal/10 font-black text-center tracking-[0.4em] text-sm outline-none transition-all"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-vibrant-teal hover:bg-vibrant-teal/90 text-white font-black py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all cursor-pointer disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? "Verifying..." : "Verify & Complete Join"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}

          {/* MODE 2: Free Guest Sample Practice Drills Screen */}
          {authMode === "guest" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <form onSubmit={handleStartGuestPractice} className="space-y-5">
                {/* Guest Email Inputs */}
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
                          setSelectedSampleSetId("abacus-sr1-single-direct-5-6row");
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
                          setSelectedSampleSetId("abacus-sr2-double-direct");
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
                          setSelectedSampleSetId("abacus-sr-mixed-direct");
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

                  {/* Printable PDF Generator Download Button */}
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isPdfGenerating}
                    className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-amber-300 font-extrabold text-xs rounded-2xl border border-slate-700 flex items-center justify-center gap-2 transition cursor-pointer shadow-md disabled:opacity-50"
                  >
                    <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>
                      {isPdfGenerating
                        ? "Generating Printable PDF Worksheet..."
                        : `📄 Download Printable PDF Quiz (${selectedQuestionCount} Qs + Academy Brochure)`}
                    </span>
                    <Download className="w-4 h-4 text-amber-400 shrink-0" />
                  </button>
                </div>
              </form>

              {/* Request Course Access Banner */}
              <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h4 className="font-black text-amber-400 text-xs sm:text-sm flex items-center gap-1.5">
                    <Trophy className="w-4 h-4" /> Enjoyed the Sample Practice? Request Full Access
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                    Direct Contact
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Request complete course access via Email or WhatsApp to unlock all Abacus and Vedic Math levels!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <a
                    href={`mailto:nehaatharv@gmail.com?subject=${encodeURIComponent("Request Course Access - Arnav Abacus Academy")}&body=${encodeURIComponent(`Hello Arnav Abacus Academy,\n\nI completed the sample practice drill and would like to request full course access.\n\nMy Email ID: ${guestEmail || "[Insert Email]"}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition"
                  >
                    <Mail className="w-4 h-4 text-amber-400" />
                    Email: nehaatharv@gmail.com
                  </a>
                  <a
                    href={`https://wa.me/919021924968?text=${encodeURIComponent(`Hello Arnav Abacus Academy, I completed the free sample practice session and would like to request course access for my email: ${guestEmail || "[Insert Email]"}`)}`}
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
                  <form onSubmit={handleGuestFeedbackSubmit} className="space-y-3">
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
          )}

        </div>
      </div>
    </div>
  );
}
