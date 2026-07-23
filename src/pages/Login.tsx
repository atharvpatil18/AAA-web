/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { Mail, Sparkles, Key, CheckCircle, AlertCircle, ArrowRight, ShieldCheck, User, Shield, Zap, Clock, Trophy, MessageSquare, Send, Star, CheckCircle2, Flame, ArrowDown, TrendingUp } from "lucide-react";
import { saveVisitorFeedback } from "../lib/cloudSync";
import { validateSanitizedEmail, validateSanitizedName, validateSanitizedMessage } from "../lib/securitySanitizer";

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

  // Guest Mode Form & Drill State
  const [guestEmail, setGuestEmail] = useState("");
  const [guestName, setGuestName] = useState("");
  const [selectedSampleSetId, setSelectedSampleSetId] = useState("abacus-sr1-single-direct-5-6row");
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

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

    localStorage.setItem("aaa_guest_user", JSON.stringify({ email: cleanEmail, name: displayName }));

    // Automatically record visitor login / inquiry into Admin Feedback Manager
    saveVisitorFeedback({
      guestEmail: cleanEmail,
      guestName: displayName,
      rating: 5,
      message: `⚡ Sample Visitor Practice Access: Started 100 Qs / 10 Mins drill (${selectedSampleSetId}).`,
    });

    navigate(`/practice/session?setId=${selectedSampleSetId}&mode=speed-100-10m&count=100`);
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

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-vibrant-orange/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-vibrant-teal/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className={`w-full ${authMode === "guest" ? "max-w-2xl" : "max-w-md"} bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative z-10 transition-all duration-300`}>
        
        {/* Out-of-the-Box Viral Advertisement & Business SEO Hook Banner */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-4 text-slate-950 border-b border-amber-300 relative overflow-hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="bg-slate-950 text-amber-400 p-2 rounded-xl shrink-0 shadow-lg animate-pulse">
                <Flame className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="bg-slate-950 text-amber-400 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                    🔥 WAKAD PUNE #1 SPEED MATH TRIAL
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-950 bg-white/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    NO OTP REQUIRED
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-black tracking-tight text-slate-950 mt-0.5">
                  Test 10X Mental Calculation Speed (100 Qs / 10 Mins)
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setAuthMode("guest");
                setError(null);
              }}
              className="bg-slate-950 hover:bg-slate-900 text-amber-400 text-xs font-black px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-400 shrink-0"
            >
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              TRY FREE
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>

          <p className="text-[10px] font-extrabold text-slate-900/90 mt-2 pt-2 border-t border-slate-950/10 flex items-center justify-between flex-wrap gap-1">
            <span>
              🏆 <strong className="font-black">Arnav Abacus Academy (Wakad, Pune, India)</strong> — Best Abacus & Vedic Maths Brain Development
            </span>
            <span className="text-[9px] font-black bg-slate-950/10 px-2 py-0.5 rounded text-slate-950">
              📍 Wakad Center • Instant Rank
            </span>
          </p>
        </div>

        {/* Visual Brand Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-6 text-center border-b border-purple-900/40">
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

          {/* Flashing Callout & Arrow Container for Free Guest Practice Trial */}
          <div className="relative flex-1">
            {authMode === "student" && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center gap-1 bg-slate-950 text-amber-300 border-2 border-amber-400 text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-2xl animate-bounce tracking-wider whitespace-nowrap">
                <Flame className="w-3 h-3 text-orange-400 fill-orange-400 animate-pulse" />
                <span>CLICK HERE (NO OTP)</span>
                <ArrowDown className="w-3 h-3 text-amber-300 animate-bounce" />
              </div>
            )}

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

                {/* Sample Drills Cards */}
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
                    Select 200-Question Sample Topic <span className="text-amber-600 font-bold">(20 Mins Marathon)</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* SR-1 Topic 1 */}
                    <div
                      onClick={() => setSelectedSampleSetId("abacus-sr1-single-direct-5-6row")}
                      className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                        selectedSampleSetId === "abacus-sr1-single-direct-5-6row"
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
                      onClick={() => setSelectedSampleSetId("abacus-sr2-double-direct")}
                      className={`p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                        selectedSampleSetId === "abacus-sr2-double-direct"
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
                  START FREE SAMPLE PRACTICE (200 QUESTIONS / 20 MINS)
                  <ArrowRight className="w-4 h-4" />
                </button>
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
