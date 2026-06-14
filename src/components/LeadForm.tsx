/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { trackLeadFormSubmission } from "../lib/analytics";
import { Sparkles, Gift, Send, Landmark, ArrowRight, CheckCircle2 } from "lucide-react";

interface LeadFormProps {
  sourceCampaign?: string;
  defaultProgram?: string;
}

export default function LeadForm({ sourceCampaign, defaultProgram = "Abacus" }: LeadFormProps) {
  const [parentName, setParentName] = useState("");
  const [childAge, setChildAge] = useState("7-9");
  const [program, setProgram] = useState(defaultProgram);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectSuccess, setRedirectSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (defaultProgram) {
      setProgram(defaultProgram);
    }
  }, [defaultProgram]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!parentName.trim()) {
      setValidationError("Please enter your name.");
      return;
    }

    setIsSubmitting(true);
    
    // Log conversion event
    trackLeadFormSubmission(parentName, childAge, program);

    // Form custom WhatsApp message template
    const textMessage = `Hello, I'm interested in a Demo Class at Arnav Abacus Academy!
Name: ${parentName}
Child's Age: ${childAge}
Program: ${program}${sourceCampaign ? `\nCampaign: ${sourceCampaign}` : ""}`;

    const encodedText = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/919021924968?text=${encodedText}`;

    // Simulate smooth redirection
    setTimeout(() => {
      setRedirectSuccess(true);
      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 1500);
    }, 1000);
  };

  if (redirectSuccess) {
    return (
      <div 
        id="lead-form-success" 
        className="bg-white/85 backdrop-blur-md border border-emerald-100 rounded-3xl p-8 shadow-xl text-center flex flex-col items-center justify-center min-h-[400px] animate-fade-in"
      >
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 border border-emerald-100 text-emerald-500 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="font-display font-bold text-2xl text-emerald-950 mb-2">
          Awesome, {parentName}!
        </h3>
        <p className="text-emerald-800/90 max-w-sm leading-relaxed mb-6">
          Your details are secured! We are now redirecting you to WhatsApp to instantly confirm your slot and activate your <strong className="text-emerald-950">Free 2 Sessions of Value-Added Mental Math</strong>.
        </p>
        <div className="flex items-center gap-3 bg-emerald-50 text-emerald-800 px-5 py-3 rounded-full text-sm font-medium border border-emerald-100">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          Redirecting to WhatsApp...
        </div>
        <p className="text-xs text-gray-400 mt-6">
          Didn't redirect? <a href={`https://wa.me/919021924968`} className="text-emerald-600 underline font-medium hover:text-emerald-700">Click here to continue manual booking</a>
        </p>
      </div>
    );
  }

  return (
    <div 
      id="lead-form-container" 
      className="bg-white rounded-[40px] border-4 border-vibrant-dark p-8 md:p-10 shadow-[12px_12px_0_0_#1A2E35] relative overflow-hidden"
    >
      {/* Free 2 Sessions sticker rotated element */}
      <div className="absolute -top-5 -right-5 bg-vibrant-gold p-4 rounded-2xl rotate-12 border-2 border-vibrant-dark shadow-md text-vibrant-dark text-center leading-none z-20 max-w-[120px]">
        <p className="font-black text-xs leading-none">FREE TRIAL</p>
        <p className="text-[8px] font-black tracking-wide uppercase mt-1">2 Mental Math Sessions</p>
      </div>

      <div className="relative z-10 space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#FFF0E0] border border-[#FFD8B1] px-4 py-1.5 rounded-full text-xs font-bold text-vibrant-orange uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Book 100% Free Demo Class
        </div>

        <h3 className="font-display font-black text-2xl lg:text-3xl text-vibrant-dark leading-tight">
          Claim Free Demo Slot
        </h3>
        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
          Get a personalized evaluation session at our center. It takes less than a minute.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {validationError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-medium border border-red-100">
              {validationError}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-vibrant-dark uppercase mb-1 ml-1.5 tracking-wider">
              Parent's Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-vibrant-orange focus:bg-white outline-none text-sm text-gray-800 placeholder-gray-400 transition shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-vibrant-dark uppercase mb-1 ml-1.5 tracking-wider">
                Child's Age Bracket
              </label>
              <select
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-vibrant-orange focus:bg-white outline-none text-sm text-gray-800 transition cursor-pointer shadow-sm"
              >
                <option value="4-6">4 - 6 Years</option>
                <option value="7-9">7 - 9 Years</option>
                <option value="10-12">10+ Years</option>
                <option value="13+">13+ Years</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-vibrant-dark uppercase mb-1 ml-1.5 tracking-wider">
                Program Topic
              </label>
              <select
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-vibrant-orange focus:bg-white outline-none text-sm text-gray-800 transition cursor-pointer shadow-sm"
              >
                <option value="Abacus">Abacus Course</option>
                <option value="Vedic Math">Vedic Math</option>
                <option value="School Math">School Math</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-vibrant-orange text-white py-4 rounded-2xl font-black text-lg shadow-[0_6px_0_0_#B33A00] active:translate-y-1 active:shadow-none hover:brightness-105 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-80"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Securing Slot...</span>
              </>
            ) : (
              <>
                <span>Book on WhatsApp</span>
                <Send className="w-4 h-4 text-orange-100" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-[10px] font-bold uppercase text-gray-400 mt-4 flex items-center justify-center gap-1.5">
          <Landmark className="w-3.5 h-3.5 shrink-0 text-gray-300" /> Center opposite Creative Cameo, before Park Street, Pune
        </p>
      </div>
    </div>
  );
}
