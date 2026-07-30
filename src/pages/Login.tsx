/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { Mail, Sparkles, Key, CheckCircle, AlertCircle, ArrowRight, ShieldCheck, User, Shield, Zap, Clock, Trophy, MessageSquare, Send, Star, CheckCircle2, Flame, ArrowDown, TrendingUp, Rocket, FileText, Download, Lock, AlertTriangle, BookOpen } from "lucide-react";
import { saveVisitorFeedback } from "../lib/cloudSync";
import { validateSanitizedEmail, validateSanitizedName, validateSanitizedMessage } from "../lib/securitySanitizer";
import { generateQuizWorksheetPDF } from "../lib/quizPdfGenerator";
import { generateBrochurePDF } from "../lib/brochure";
import { useLanguage } from "../lib/LanguageContext";
import { getQuestionSetById } from "../data/practiceData";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const GoogleBtn = React.memo(({ onSuccess, onError, text = "continue_with" }: { onSuccess: (r: any) => void; onError: () => void; text?: "continue_with" | "signin_with" }) => {
  return <GoogleLogin onSuccess={onSuccess} onError={onError} theme="filled_blue" shape="pill" size="medium" text={text} />;
});

export default function Login() {
  const { sendEmailOTP, verifyEmailOTP, loginWithGoogleCredential } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/practice";

  // Mode Toggle State ("student" for OTP login, "guest" for free sample practice drills)
  const [authMode, setAuthMode] = useState<"student" | "guest">("student");

  React.useEffect(() => {
    if (searchParams.get("redirect") || searchParams.get("mode") === "guest" || searchParams.get("guest") === "true") {
      setAuthMode("guest");
    }
  }, [searchParams]);

  // Registered Student Form inputs
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // Guest Mode Form, Mode Selectors & Drill State
  const [guestEmail, setGuestEmail] = useState("");
  const [guestName, setGuestName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<"abacus" | "mental" | "vedic">("abacus");
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<10 | 20 | 50 | 100 | 200>(10);
  const [selectedTopicMode, setSelectedTopicMode] = useState<"single" | "double" | "both">("single");
  const [selectedTimeMinutes, setSelectedTimeMinutes] = useState<2 | 4 | 5 | 10 | 20>(2);
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
      message: `⚡ Sample Visitor Practice Access: Started ${selectedQuestionCount} Qs drill (${selectedTimeMinutes} Min) (${selectedSampleSetId}). Session #${newAttempts} (Unlimited Access).`,
    });

    navigate(`/practice/session?setId=${selectedSampleSetId}&mode=guest-drill&count=${selectedQuestionCount}&time=${selectedTimeMinutes * 60}`);
  };

  const handleDownloadPdf = async () => {
    let displayName = guestEmail ? guestEmail.split("@")[0] : "Guest Student";
    if (guestName.trim()) {
      displayName = guestName.trim();
    }

    const setObj = getQuestionSetById(selectedSampleSetId);
    const topicTitle = setObj ? setObj.title.replace(/^\d+\s+Questions\s*-\s*/i, "") : "Speed Math Practice Drill";

    setIsPdfGenerating(true);
    setError(null);
    try {
      await generateQuizWorksheetPDF(
        displayName,
        selectedSampleSetId,
        topicTitle,
        selectedQuestionCount
      );

      // Record PDF download in visitor feedback DB
      if (guestEmail && guestEmail.includes("@")) {
        saveVisitorFeedback({
          guestEmail: guestEmail.trim().toLowerCase(),
          guestName: displayName,
          rating: 5,
          message: `📄 Downloaded Speed Math Printable PDF Worksheet: ${selectedQuestionCount} Qs (${topicTitle})`,
          hasDownloadedPdf: true,
          downloadedPdfTopic: topicTitle,
          downloadedPdfCount: selectedQuestionCount,
          downloadedPdfAt: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        });
      }
    } catch (err) {
      setError("Could not generate PDF worksheet. Please try again.");
    } finally {
      setIsPdfGenerating(false);
    }
  };

  const handleShareEmailPdf = async () => {
    await handleDownloadPdf();
    const displayName = guestName.trim() || (guestEmail ? guestEmail.split("@")[0] : "Candidate");
    const subject = encodeURIComponent(`Arnav Abacus Academy Speed Math Practice Worksheet (${selectedQuestionCount} Qs)`);
    const body = encodeURIComponent(
      `Hi!\n\nHere is the printable Speed Math Worksheet & Academy Brochure for ${displayName}.\nTopic: ${selectedTopicMode.toUpperCase()} (${selectedQuestionCount} Questions)\n\nAttached is your downloaded Speed Math Practice Worksheet PDF.\n\nArnav Abacus Academy • Wakad, Pune\nWhatsApp: +91 90219 24968 | Email: nehaatharv@gmail.com`
    );
    window.open(`mailto:${guestEmail || ""}?subject=${subject}&body=${body}`, "_blank");
  };

  const handleShareWhatsappPdf = async () => {
    await handleDownloadPdf();
    const displayName = guestName.trim() || (guestEmail ? guestEmail.split("@")[0] : "Candidate");
    const text = encodeURIComponent(
      `📄 *Arnav Abacus Academy - Speed Math Worksheet & Brochure*\n\nCandidate: *${displayName}*\nTopic: *${selectedTopicMode.toUpperCase()} (${selectedQuestionCount} Questions)*\n\nI generated the printable PDF worksheet!\n\n📍 Arnav Abacus Academy (Wakad, Pune, India)\nWhatsApp: +91 90219 24968`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
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
    <div className="bg-slate-50 min-h-screen py-10 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-vibrant-orange/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-vibrant-teal/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Concise & Simplified Speed Math Resource Banner */}
      <div className="w-full max-w-2xl mb-6 p-4 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-2 border-amber-400/40 text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 rounded-2xl shadow-md shrink-0">
            <BookOpen className="w-5 h-5 fill-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-amber-950 bg-amber-400/30 border border-amber-400/50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                ⚡ ACADEMY SOP GUIDE
              </span>
            </div>
            <h4 className="font-black text-sm text-slate-900 mt-1 leading-snug">
              Speed Math SOP Manual & Academy Brochure
            </h4>
            <p className="text-xs text-slate-650 font-bold mt-0.5">
              3-Mode Practice SOP • NEP 2020 Math Framework • Curriculum Standards
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <Link
            to="/brochure?tab=manual"
            className="flex-1 sm:flex-initial px-3.5 py-2.5 bg-slate-950 hover:bg-slate-900 text-amber-400 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Read Manual</span>
          </Link>
          <button
            type="button"
            onClick={() => generateBrochurePDF(language)}
            className="flex-1 sm:flex-initial px-3.5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
          >
            <Rocket className="w-3.5 h-3.5 fill-slate-950" />
            <span>Get PDF</span>
          </button>
        </div>
      </div>

      <div className={`w-full ${authMode === "guest" ? "max-w-2xl" : "max-w-md"} bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative z-10 transition-all duration-300`}>
        
        {/* Sleek Modern Brand Header (Unified & High Converting) */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-6 text-center border-b border-purple-900/40 relative space-y-3">
          {/* Top Category Badge with SEO Details */}
          <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-300 border border-amber-500/40 px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider flex-wrap justify-center">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse shrink-0" />
            <span>Wakad Pune #1 Abacus & Vedic Maths Academy</span>
            <span className="text-amber-400/50 hidden sm:inline">•</span>
            <span className="text-amber-400 font-extrabold">Google Sign-In</span>
          </div>

          {/* Main SEO Title */}
          <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white leading-snug">
            {authMode === "student"
              ? "Access Arnav Abacus Practice Zone"
              : "Free Guest Practice Drills (100 Qs / 10 Mins)"}
          </h2>

          {/* Subtitle with SEO Keywords */}
          <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed font-medium">
            {authMode === "student"
              ? "Sign in with Google verification to join dynamic math drills & track scores."
              : "Test 10X mental calculation speed with free speed drills! Sign in with Google to auto-fill verified credentials & track live leaderboard rank."}
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
            Student Login (Google)
          </button>

          {/* Target Button for Free Guest Practice Drill */}
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
              Free Guest Practice Drill
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

          {/* MODE 1: Student Login (100% 1-Click Google Sign-In) */}
          {authMode === "student" && (
            <div className="space-y-4">
              <div className="p-6 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl border border-purple-800/50 text-center shadow-lg space-y-4">
                <div className="flex items-center justify-center gap-1.5 text-amber-300 text-xs font-black uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>1-CLICK INSTANT STUDENT LOGIN WITH GOOGLE</span>
                </div>
                <div className="flex justify-center py-2">
                  <GoogleBtn
                    onSuccess={async (credentialResponse) => {
                      const res = await loginWithGoogleCredential(credentialResponse);
                      if (res.success) {
                        navigate(redirectTo);
                      } else {
                        setError(res.error || "Google Sign-In failed.");
                      }
                    }}
                    onError={() => {
                      setError("Google Sign-In authentication failed. Please try again.");
                    }}
                    text="continue_with"
                  />
                </div>
                <p className="text-xs text-slate-300 font-medium max-w-sm mx-auto leading-relaxed">
                  Sign in with your verified Google account to access your student practice zone, track drill scores, and view live leaderboard rankings instantly.
                </p>
              </div>
            </div>
          )}

          {/* MODE 2: Free Guest Sample Practice Drills Screen */}
          {authMode === "guest" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <form onSubmit={handleStartGuestPractice} className="space-y-5">
                {/* STEP 1: 1-Click Instant Google Sign-In for Free Guest Practice (Positioned First) */}
                <div className="p-4 bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-500/15 rounded-2xl border-2 border-amber-400/50 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
                  <div>
                    <span className="text-[10px] font-black text-amber-950 uppercase tracking-wider block flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      STEP 1: SIGN IN WITH GOOGLE TO UNLOCK PRACTICE
                    </span>
                    <p className="text-xs text-slate-700 font-bold mt-0.5">
                      {guestEmail ? `✓ Verified via Google (${guestEmail})` : "Click below to auto-fill verified guest details & unlock practice drills."}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <GoogleBtn
                      onSuccess={(credentialResponse) => {
                        if (credentialResponse?.credential) {
                          try {
                            const decoded: any = jwtDecode(credentialResponse.credential);
                            const email = decoded.email || "";
                            const name = decoded.name || email.split("@")[0] || "Guest Candidate";
                            setGuestEmail(email);
                            setGuestName(name);
                          } catch (e) {
                            console.error("Google Guest token decode error:", e);
                          }
                        }
                      }}
                      onError={() => setError("Google Guest Sign-In failed.")}
                      text="continue_with"
                    />
                  </div>
                </div>

                {/* SHOW ENTIRE PRACTICE FORM SECTION ONLY AFTER GOOGLE SIGN IN */}
                {!guestEmail ? (
                  /* Lock Banner before Google Sign-In */
                  <div className="p-8 bg-amber-500/10 border-2 border-dashed border-amber-400/60 rounded-3xl text-center space-y-3 shadow-xs">
                    <div className="w-12 h-12 bg-amber-500 text-slate-950 rounded-2xl flex items-center justify-center mx-auto text-xl font-black shadow-md">
                      🔒
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900">
                      Google Sign-In Required to Unlock Guest Practice Drills
                    </h3>
                    <p className="text-xs text-slate-650 font-bold max-w-md mx-auto leading-relaxed">
                      Please complete Step 1 (Sign in with Google) above. Once verified, your guest details, course modes, practice drills, and printable PDF hub will display automatically!
                    </p>
                  </div>
                ) : (
                  /* Displayed ONLY after Google Sign-In */
                  <React.Fragment>
                    {/* Disabled Manual Entry Input Fields (Populated via Google Sign-In) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                          <span>Guest Email ID <span className="text-red-500">*</span></span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">✓ Verified via Google</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                          <input
                            type="email"
                            required
                            disabled={true}
                            readOnly={true}
                            value={guestEmail}
                            placeholder="Signed in via Google"
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-800 cursor-not-allowed outline-none select-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                          <span>Student Name</span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">✓ Google Profile</span>
                        </label>
                        <input
                          type="text"
                          disabled={true}
                          readOnly={true}
                          value={guestName}
                          placeholder="Signed in via Google"
                          className="w-full px-4 py-2.5 bg-slate-100 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-800 cursor-not-allowed outline-none select-none"
                        />
                      </div>
                    </div>

                {/* REDESIGNED MODE 1 & MODE 2 SELECTION ZONE */}
                <div className="space-y-4 bg-slate-50 border-2 border-slate-200 p-5 rounded-2xl">
                  
                  {/* Unlimited Guest Practice Access Bar */}
                  <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl text-xs flex-wrap gap-2">
                    <div className="flex items-center gap-2 font-black text-amber-950">
                      <Flame className="w-4 h-4 text-orange-600 fill-orange-500 animate-pulse" />
                      <span>UNLIMITED FREE GUEST PRACTICE DRILLS</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black shadow-xs bg-emerald-600 text-white">
                        ✓ Unlimited Free Access
                      </span>
                    </div>
                  </div>

                  {/* 1st MODE: Course Selector (Abacus Math, Mental Math, Vedic Math) */}
                  <div>
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                      <label className="block text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="bg-amber-500 text-slate-950 w-5 h-5 rounded-full inline-flex items-center justify-center font-black text-[10px]">1</span>
                        Select Course (Mode 1):
                      </label>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-300">
                        Selected: {selectedCourse === "abacus" ? "Abacus Math" : selectedCourse === "mental" ? "Mental Math" : "Vedic Math"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Course 1: Abacus Math */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCourse("abacus");
                          setSelectedSampleSetId("abacus-sr1-single-direct-5-6row");
                        }}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                          selectedCourse === "abacus"
                            ? "border-amber-500 bg-amber-500/10 ring-2 ring-amber-400/40 shadow-md scale-[1.01]"
                            : "border-slate-200 bg-white hover:border-amber-300"
                        }`}
                      >
                        <div>
                          <span className="bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                            🧮 ABACUS MATH
                          </span>
                          <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight">
                            Abacus Math Practice
                          </h4>
                          <p className="text-[10px] text-slate-500 font-semibold mt-1">
                            Bead-visualization speed arithmetic & mental abacus drills.
                          </p>
                        </div>
                        {selectedCourse === "abacus" && (
                          <span className="mt-2 text-[9px] font-black text-slate-950 bg-amber-400 px-2 py-0.5 rounded-md self-start shadow-xs">
                            ✓ SELECTED
                          </span>
                        )}
                      </button>

                      {/* Course 2: Mental Math */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCourse("mental");
                          setSelectedSampleSetId("mental-olympiad-g4");
                        }}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                          selectedCourse === "mental"
                            ? "border-indigo-600 bg-indigo-600/10 ring-2 ring-indigo-500/40 shadow-md scale-[1.01]"
                            : "border-slate-200 bg-white hover:border-indigo-300"
                        }`}
                      >
                        <div>
                          <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                            💡 MENTAL MATH
                          </span>
                          <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight">
                            Mental Math Practice
                          </h4>
                          <p className="text-[10px] text-slate-500 font-semibold mt-1">
                            Speed mental agility & Olympiad curriculum drills.
                          </p>
                        </div>
                        {selectedCourse === "mental" && (
                          <span className="mt-2 text-[9px] font-black text-white bg-indigo-600 px-2 py-0.5 rounded-md self-start shadow-xs">
                            ✓ SELECTED
                          </span>
                        )}
                      </button>

                      {/* Course 3: Vedic Math */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCourse("vedic");
                          setSelectedSampleSetId("vedic-jvm1-overall");
                        }}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                          selectedCourse === "vedic"
                            ? "border-teal-600 bg-teal-600/10 ring-2 ring-teal-500/40 shadow-md scale-[1.01]"
                            : "border-slate-200 bg-white hover:border-teal-300"
                        }`}
                      >
                        <div>
                          <span className="bg-teal-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                            ✨ VEDIC MATH
                          </span>
                          <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight">
                            Vedic Math Practice
                          </h4>
                          <p className="text-[10px] text-slate-500 font-semibold mt-1">
                            Ancient Indian speed math sutras & cross-multiplication shortcuts.
                          </p>
                        </div>
                        {selectedCourse === "vedic" && (
                          <span className="mt-2 text-[9px] font-black text-white bg-teal-600 px-2 py-0.5 rounded-md self-start shadow-xs">
                            ✓ SELECTED
                          </span>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* 2nd MODE: Topic & Quiz Selector (Aligned with Selected Course) */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="bg-amber-500 text-slate-950 w-5 h-5 rounded-full inline-flex items-center justify-center font-black text-[10px]">2</span>
                        Select {selectedCourse === "abacus" ? "Abacus" : selectedCourse === "mental" ? "Mental Math" : "Vedic Math"} Topic (Mode 2):
                      </label>
                    </div>

                    <div className={`grid grid-cols-1 ${selectedCourse === "abacus" ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"} gap-3`}>
                      {selectedCourse === "abacus" && (
                        <>
                          {/* Abacus Topic 1 */}
                          <div
                            onClick={() => setSelectedSampleSetId("abacus-sr1-single-direct-5-6row")}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group ${
                              selectedSampleSetId === "abacus-sr1-single-direct-5-6row"
                                ? "border-amber-500 bg-amber-500/10 ring-2 ring-amber-400/40 shadow-md scale-[1.01]"
                                : "border-slate-200 bg-white hover:border-amber-300"
                            }`}
                          >
                            <div>
                              <span className="bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                                🧮 SINGLE DIGIT
                              </span>
                              <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight">
                                ADD & SUB SINGLE DIGIT DIRECT
                              </h4>
                              <p className="text-[10px] text-slate-500 font-semibold mt-1">
                                Speed single-digit direct mental calculations.
                              </p>
                            </div>
                            {selectedSampleSetId === "abacus-sr1-single-direct-5-6row" && (
                              <span className="mt-2 text-[9px] font-black text-slate-950 bg-amber-400 px-2 py-0.5 rounded-md self-start shadow-xs">
                                ✓ SELECTED
                              </span>
                            )}
                          </div>

                          {/* Abacus Topic 2 */}
                          <div
                            onClick={() => setSelectedSampleSetId("abacus-sr2-double-direct")}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group ${
                              selectedSampleSetId === "abacus-sr2-double-direct"
                                ? "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-400/40 shadow-md scale-[1.01]"
                                : "border-slate-200 bg-white hover:border-emerald-300"
                            }`}
                          >
                            <div>
                              <span className="bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                                🔢 DOUBLE DIGIT
                              </span>
                              <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight">
                                ADD & SUB DOUBLE DIGIT DIRECT
                              </h4>
                              <p className="text-[10px] text-slate-500 font-semibold mt-1">
                                Master 2-digit direct mental abacus drills.
                              </p>
                            </div>
                            {selectedSampleSetId === "abacus-sr2-double-direct" && (
                              <span className="mt-2 text-[9px] font-black text-white bg-emerald-600 px-2 py-0.5 rounded-md self-start shadow-xs">
                                ✓ SELECTED
                              </span>
                            )}
                          </div>

                          {/* Abacus Topic 3: Both Mixed (Sum < 100) */}
                          <div
                            onClick={() => setSelectedSampleSetId("abacus-sr-mixed-direct-under100")}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group ${
                              selectedSampleSetId === "abacus-sr-mixed-direct-under100" || selectedSampleSetId === "abacus-sr-mixed-direct"
                                ? "border-purple-500 bg-purple-500/10 ring-2 ring-purple-400/40 shadow-md scale-[1.01]"
                                : "border-slate-200 bg-white hover:border-purple-300"
                            }`}
                          >
                            <div>
                              <span className="bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                                ⚡ BOTH MIXED (&lt; 100)
                              </span>
                              <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight">
                                BOTH SINGLE & DOUBLE (SUM &lt; 100)
                              </h4>
                              <p className="text-[10px] text-slate-500 font-semibold mt-1">
                                1-Digit & 2-Digit mixed rows with total sum less than 100.
                              </p>
                            </div>
                            {(selectedSampleSetId === "abacus-sr-mixed-direct-under100" || selectedSampleSetId === "abacus-sr-mixed-direct") && (
                              <span className="mt-2 text-[9px] font-black text-white bg-purple-600 px-2 py-0.5 rounded-md self-start shadow-xs">
                                ✓ SELECTED
                              </span>
                            )}
                          </div>

                          {/* Abacus Topic 4: Both Mixed (Sum > 99) */}
                          <div
                            onClick={() => setSelectedSampleSetId("abacus-sr-mixed-direct-over99")}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group ${
                              selectedSampleSetId === "abacus-sr-mixed-direct-over99"
                                ? "border-rose-600 bg-rose-600/10 ring-2 ring-rose-500/40 shadow-md scale-[1.01]"
                                : "border-slate-200 bg-white hover:border-rose-300"
                            }`}
                          >
                            <div>
                              <span className="bg-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                                🚀 BOTH MIXED (&gt; 99)
                              </span>
                              <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight">
                                BOTH SINGLE & DOUBLE (SUM &gt; 99)
                              </h4>
                              <p className="text-[10px] text-slate-500 font-semibold mt-1">
                                1-Digit & 2-Digit mixed rows with total sum greater than 99.
                              </p>
                            </div>
                            {selectedSampleSetId === "abacus-sr-mixed-direct-over99" && (
                              <span className="mt-2 text-[9px] font-black text-white bg-rose-600 px-2 py-0.5 rounded-md self-start shadow-xs">
                                ✓ SELECTED
                              </span>
                            )}
                          </div>
                        </>
                      )}

                      {selectedCourse === "mental" && (
                        <>
                          {/* Mental Topic 1 */}
                          <div
                            onClick={() => setSelectedSampleSetId("mental-olympiad-g4")}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group ${
                              selectedSampleSetId === "mental-olympiad-g4"
                                ? "border-indigo-600 bg-indigo-600/10 ring-2 ring-indigo-500/40 shadow-md scale-[1.01]"
                                : "border-slate-200 bg-white hover:border-indigo-400"
                            }`}
                          >
                            <div>
                              <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                                🏆 GRADE 4 OLYMPIAD
                              </span>
                              <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight">
                                GRADE 4 COMPREHENSIVE DRILL
                              </h4>
                              <p className="text-[10px] text-slate-500 font-semibold mt-1">
                                Numbers, HTO, 3-digit ops, fractions & geometry.
                              </p>
                            </div>
                            {selectedSampleSetId === "mental-olympiad-g4" && (
                              <span className="mt-2 text-[9px] font-black text-white bg-indigo-600 px-2 py-0.5 rounded-md self-start shadow-xs">
                                ✓ SELECTED
                              </span>
                            )}
                          </div>

                          {/* Mental Topic 2 */}
                          <div
                            onClick={() => setSelectedSampleSetId("mental-olympiad-g2")}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group ${
                              selectedSampleSetId === "mental-olympiad-g2"
                                ? "border-blue-600 bg-blue-600/10 ring-2 ring-blue-500/40 shadow-md scale-[1.01]"
                                : "border-slate-200 bg-white hover:border-blue-400"
                            }`}
                          >
                            <div>
                              <span className="bg-blue-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                                ⚡ GRADE 1-3 SPEED
                              </span>
                              <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight">
                                FOUNDATIONAL SPEED & PLACE VALUE
                              </h4>
                              <p className="text-[10px] text-slate-500 font-semibold mt-1">
                                Addition, place value, skip counting & tables.
                              </p>
                            </div>
                            {selectedSampleSetId === "mental-olympiad-g2" && (
                              <span className="mt-2 text-[9px] font-black text-white bg-blue-600 px-2 py-0.5 rounded-md self-start shadow-xs">
                                ✓ SELECTED
                              </span>
                            )}
                          </div>

                          {/* Mental Topic 3 */}
                          <div
                            onClick={() => setSelectedSampleSetId("mental-olympiad-g6")}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group ${
                              selectedSampleSetId === "mental-olympiad-g6"
                                ? "border-purple-600 bg-purple-600/10 ring-2 ring-purple-500/40 shadow-md scale-[1.01]"
                                : "border-slate-200 bg-white hover:border-purple-400"
                            }`}
                          >
                            <div>
                              <span className="bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                                🚀 GRADE 5-9 ADVANCED
                              </span>
                              <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight">
                                ADVANCED OLYMPIAD BENCHMARK
                              </h4>
                              <p className="text-[10px] text-slate-500 font-semibold mt-1">
                                Integers, ratios, decimals, BODMAS & algebra.
                              </p>
                            </div>
                            {selectedSampleSetId === "mental-olympiad-g6" && (
                              <span className="mt-2 text-[9px] font-black text-white bg-purple-600 px-2 py-0.5 rounded-md self-start shadow-xs">
                                ✓ SELECTED
                              </span>
                            )}
                          </div>
                        </>
                      )}

                      {selectedCourse === "vedic" && (
                        <>
                          {/* Vedic Topic 1 */}
                          <div
                            onClick={() => setSelectedSampleSetId("vedic-jvm1-overall")}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group ${
                              selectedSampleSetId === "vedic-jvm1-overall"
                                ? "border-teal-600 bg-teal-600/10 ring-2 ring-teal-500/40 shadow-md scale-[1.01]"
                                : "border-slate-200 bg-white hover:border-teal-400"
                            }`}
                          >
                            <div>
                              <span className="bg-teal-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                                ✨ JUNIOR VEDIC
                              </span>
                              <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight">
                                JUNIOR VEDIC MATH OVERALL DRILL
                              </h4>
                              <p className="text-[10px] text-slate-500 font-semibold mt-1">
                                Speed sutras, conversions & foundational methods.
                              </p>
                            </div>
                            {selectedSampleSetId === "vedic-jvm1-overall" && (
                              <span className="mt-2 text-[9px] font-black text-white bg-teal-600 px-2 py-0.5 rounded-md self-start shadow-xs">
                                ✓ SELECTED
                              </span>
                            )}
                          </div>

                          {/* Vedic Topic 2 */}
                          <div
                            onClick={() => setSelectedSampleSetId("vedic-level1-nikhilam")}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group ${
                              selectedSampleSetId === "vedic-level1-nikhilam"
                                ? "border-amber-600 bg-amber-600/10 ring-2 ring-amber-500/40 shadow-md scale-[1.01]"
                                : "border-slate-200 bg-white hover:border-amber-400"
                            }`}
                          >
                            <div>
                              <span className="bg-amber-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                                ⚡ NIKHILAM SUTRA
                              </span>
                              <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight">
                                NIKHILAM BASE SHORTCUTS
                              </h4>
                              <p className="text-[10px] text-slate-500 font-semibold mt-1">
                                Base subtraction & fast base multiplication.
                              </p>
                            </div>
                            {selectedSampleSetId === "vedic-level1-nikhilam" && (
                              <span className="mt-2 text-[9px] font-black text-white bg-amber-600 px-2 py-0.5 rounded-md self-start shadow-xs">
                                ✓ SELECTED
                              </span>
                            )}
                          </div>

                          {/* Vedic Topic 3 */}
                          <div
                            onClick={() => setSelectedSampleSetId("vedic-level2-urdhva")}
                            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between group ${
                              selectedSampleSetId === "vedic-level2-urdhva"
                                ? "border-rose-600 bg-rose-600/10 ring-2 ring-rose-500/40 shadow-md scale-[1.01]"
                                : "border-slate-200 bg-white hover:border-rose-400"
                            }`}
                          >
                            <div>
                              <span className="bg-rose-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                                🌟 URDHVA TIRYAG
                              </span>
                              <h4 className="font-black text-xs text-slate-900 mt-2 leading-tight">
                                CROSS MULTIPLICATION SUITE
                              </h4>
                              <p className="text-[10px] text-slate-500 font-semibold mt-1">
                                High-speed 2D x 2D vertical & crosswise math.
                              </p>
                            </div>
                            {selectedSampleSetId === "vedic-level2-urdhva" && (
                              <span className="mt-2 text-[9px] font-black text-white bg-rose-600 px-2 py-0.5 rounded-md self-start shadow-xs">
                                ✓ SELECTED
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* 3rd MODE: Number of Questions Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                      <label className="block text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="bg-amber-500 text-slate-950 w-5 h-5 rounded-full inline-flex items-center justify-center font-black text-[10px]">3</span>
                        Select Question Count (Mode 3):
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

                  {/* 4th MODE: Time Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                      <label className="block text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="bg-amber-500 text-slate-950 w-5 h-5 rounded-full inline-flex items-center justify-center font-black text-[10px]">4</span>
                        Select Time (Mode 4):
                      </label>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-300">
                        Selected: {selectedTimeMinutes} Min{selectedTimeMinutes > 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {[2, 4, 5, 10, 20].map((mins) => (
                        <button
                          key={mins}
                          type="button"
                          onClick={() => setSelectedTimeMinutes(mins as any)}
                          className={`py-2.5 px-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border-2 text-center flex flex-col items-center justify-center ${
                            selectedTimeMinutes === mins
                              ? "bg-slate-900 text-amber-400 border-slate-900 shadow-md scale-[1.02]"
                              : "bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50"
                          }`}
                        >
                          {mins} Min
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Launch Button with Dynamic Caption & PDF Download Option */}
                <div className="space-y-3 pt-1">
                  {(() => {
                    const currentSetObj = getQuestionSetById(selectedSampleSetId);
                    const currentTopicLabel = currentSetObj ? currentSetObj.title.replace(/^\d+\s+Questions\s*-\s*/i, "").toUpperCase() : "SPEED MATH DRILL";
                    return (
                      <button
                        type="submit"
                        className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-amber-300 uppercase tracking-tight"
                      >
                        <Rocket className="w-5 h-5 fill-slate-950 animate-bounce shrink-0" />
                        <span>
                          START FREE GUEST PRACTICE DRILL ({selectedQuestionCount} Qs • {selectedTimeMinutes} MINS • {currentTopicLabel})
                        </span>
                        <ArrowRight className="w-5 h-5 shrink-0" />
                      </button>
                    );
                  })()}

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
              </React.Fragment>
            )}
          </form>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
