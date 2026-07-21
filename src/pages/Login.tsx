/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { Mail, Sparkles, Key, CheckCircle, AlertCircle, ArrowRight, ShieldCheck, User, Shield } from "lucide-react";

export default function Login() {
  const { sendEmailOTP, verifyEmailOTP } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/practice";

  // Form inputs
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Workflow states
  const [otpSent, setOtpSent] = useState(false);
  const [simulatedOtp, setSimulatedOtp] = useState<string | null>(null);

  React.useEffect(() => {
    console.log("DEBUG KEYS LOADED:", {
      Service: (import.meta as any).env.VITE_EMAILJS_SERVICE_ID,
      Template: (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID,
      Key: (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY
    });
  }, []);

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
    const nameStr = userName.trim();
    const cleanEmail = email.trim();

    if (!nameStr) {
      setError("Please enter your name.");
      return;
    }
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await sendEmailOTP(cleanEmail, nameStr);
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
    if (!otp) {
      setError("Please enter the 6-digit verification code.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await verifyEmailOTP(email, userName, otp);
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

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 flex items-center justify-center relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-vibrant-orange/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-vibrant-teal/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative z-10 transition-all">
        
        {/* Visual Brand Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white p-6 text-center border-b border-purple-900/40">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Academy Student & Parent Portal
          </div>
          <h2 className="text-xl font-black font-display tracking-tight text-white">
            Access Arnav Abacus Practice Zone
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Sign in with email verification to join dynamic math drills & track scores
          </p>
        </div>

        <div className="p-6 md:p-8">
          
          {/* Error and Success notifications */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3.5 flex items-center gap-2 mb-4 text-xs font-bold animate-pulse">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3.5 flex items-center gap-2 mb-4 text-xs font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* OTP Simulator Email Toast Box */}
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

          {/* Email OTP Form */}
          <div className="space-y-4">
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

        </div>
      </div>
    </div>
  );
}
