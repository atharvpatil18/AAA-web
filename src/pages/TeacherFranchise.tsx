/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Award, BookOpen, CheckCircle2, ShieldCheck, Users, GraduationCap, Building2, Sparkles, Phone, Mail, MapPin, Send, ArrowRight, Check } from "lucide-react";
import { validateSanitizedName, validateSanitizedEmail } from "../lib/securitySanitizer";
import { dispatchLeadToWebhook } from "../lib/leadWebhook";

interface InquiryFormProps {
  inquiryType: "teacher" | "franchise";
}

function ProfessionalInquiryForm({ inquiryType }: InquiryFormProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [profession, setProfession] = useState(
    inquiryType === "teacher" ? "School / Tuition Teacher" : "Education Entrepreneur"
  );
  const [preferredMode, setPreferredMode] = useState("Online Live Virtual");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const nameVal = validateSanitizedName(fullName);
    if (!nameVal.valid) {
      setError(nameVal.error || "Please enter a valid full name.");
      return;
    }

    const cleanPhone = phone.trim().replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (email.trim()) {
      const emailVal = validateSanitizedEmail(email);
      if (!emailVal.valid) {
        setError(emailVal.error || "Please enter a valid email address.");
        return;
      }
    }

    const cleanName = nameVal.sanitized;
    const typeLabel = inquiryType === "teacher" ? "Teacher Training Certification" : "Academy Center Franchise Inquiry";

    // Persist lead locally in unified storage
    try {
      const existingLeads = JSON.parse(localStorage.getItem("aaa_leads_history") || "[]");
      existingLeads.unshift({
        id: `lead_prof_${Date.now()}`,
        parentName: cleanName,
        studentName: cleanName,
        childAge: "Adult / Professional",
        program: typeLabel,
        countryCode: "+91",
        classMode: preferredMode,
        timeZone: "Asia/Kolkata",
        schoolCurriculum: `City: ${city || "Pune"} | Role: ${profession}`,
        campaign: typeLabel,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem("aaa_leads_history", JSON.stringify(existingLeads.slice(0, 100)));
    } catch (err) {
      console.warn("Failed persisting professional lead:", err);
    }

    // Dispatch to Centralized Google Sheet Webhook
    dispatchLeadToWebhook({
      leadType: inquiryType === "teacher" ? "Teacher Training" : "Franchise Inquiry",
      parentName: cleanName,
      studentName: cleanName,
      phone: cleanPhone,
      email: email.trim(),
      childAge: "Adult / Professional",
      program: typeLabel,
      classMode: preferredMode,
      curriculumOrRole: `City: ${city || "Pune"} | Role: ${profession}`,
      campaign: typeLabel,
      notes: notes.trim(),
    });

    // Format WhatsApp inquiry text
    const message = `Hello Neha Ma'am! I would like to inquire about the ${typeLabel} at Arnav Abacus Academy.
Name: ${cleanName}
Contact Phone: +91 ${cleanPhone}
${email.trim() ? `Email: ${email.trim()}\n` : ""}City / Location: ${city.trim() || "Pune, India"}
Background: ${profession}
Preferred Mode: ${preferredMode}
${notes.trim() ? `Note / Query: ${notes.trim()}\n` : ""}`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919021924968?text=${encoded}`;

    setSubmitted(true);
    try {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.warn("Window open failed:", err);
    }
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-center space-y-4 animate-fade-in">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h4 className="font-extrabold text-slate-900 text-lg">Inquiry Successfully Registered!</h4>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          Thank you, <strong>{fullName}</strong>. Your inquiry for{" "}
          <strong>{inquiryType === "teacher" ? "Teacher Training Certification" : "Center Franchise"}</strong> has been recorded. Neha Patil will connect with you with the prospectus and fee structure.
        </p>
        <div className="pt-2 space-y-2">
          <a
            href={`https://wa.me/919021924968?text=${encodeURIComponent(`Hello Neha Ma'am! I registered my inquiry for ${inquiryType === "teacher" ? "Teacher Training" : "Franchise"}. Name: ${fullName}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Open Direct WhatsApp Chat</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={() => {
              setSubmitted(false);
              setFullName("");
              setPhone("");
              setEmail("");
              setNotes("");
            }}
            className="text-xs text-slate-500 font-bold hover:text-slate-800 underline transition cursor-pointer"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
        <input
          type="text"
          required
          placeholder="e.g. Priya Sharma"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Mobile *</label>
          <input
            type="tel"
            required
            placeholder="10-digit number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            placeholder="name@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">City / Region *</label>
          <input
            type="text"
            required
            placeholder="e.g. Pune, Mumbai, Bangalore"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {inquiryType === "teacher" ? "Current Background" : "Proposed Model"}
          </label>
          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {inquiryType === "teacher" ? (
              <>
                <option value="School / Tuition Teacher">School / Tuition Teacher</option>
                <option value="Home Tutor / Parent">Home Tutor / Parent</option>
                <option value="College Graduate / Fresher">College Graduate / Fresher</option>
                <option value="Education Entrepreneur">Education Entrepreneur</option>
              </>
            ) : (
              <>
                <option value="New Learning Center Setup">New Learning Center Setup</option>
                <option value="Existing Coaching Center Add-on">Existing Coaching Center Add-on</option>
                <option value="Home-Based Micro Center">Home-Based Micro Center</option>
                <option value="School Partnership Model">School Partnership Model</option>
              </>
            )}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Training Mode</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setPreferredMode("Online Live Virtual")}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
              preferredMode === "Online Live Virtual"
                ? "bg-amber-500 text-slate-950 border-amber-600 shadow-sm"
                : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
          >
            🌐 Online Live Virtual
          </button>
          <button
            type="button"
            onClick={() => setPreferredMode("Wakad Pune Center")}
            className={`py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
              preferredMode === "Wakad Pune Center"
                ? "bg-amber-500 text-slate-950 border-amber-600 shadow-sm"
                : "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
          >
            🏫 Wakad Pune Center
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Message / Questions (Optional)</label>
        <textarea
          rows={2}
          placeholder="Any specific questions regarding batches, fee structure or kits..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black py-3.5 px-4 rounded-xl text-xs tracking-wider uppercase shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
      >
        <Send className="w-4 h-4" />
        <span>{inquiryType === "teacher" ? "Apply for Teacher Training Course" : "Request Franchise Prospectus"}</span>
      </button>
    </form>
  );
}

export default function TeacherFranchise() {
  const [activeTab, setActiveTab] = useState<"teacher" | "franchise">("teacher");

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white py-16 px-4 md:px-8 border-b border-purple-900/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            ISO 9001:2015 & Skill India Aligned Certification
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white mb-3">
            Teacher Training & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-teal-300">Academy Franchise</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
            Become a Certified Abacus & Vedic Math Master Trainer or open an official Arnav Abacus Academy center under certified guidance by Neha Patil.
          </p>

          {/* Toggle Button */}
          <div className="mt-8 inline-flex items-center bg-slate-800 p-1.5 rounded-2xl border border-slate-700">
            <button
              onClick={() => setActiveTab("teacher")}
              className={`px-6 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === "teacher"
                  ? "bg-amber-500 text-slate-950 shadow-lg"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              👩‍🏫 Certified Teacher Training Course
            </button>
            <button
              onClick={() => setActiveTab("franchise")}
              className={`px-6 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === "franchise"
                  ? "bg-amber-500 text-slate-950 shadow-lg"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              🏫 Open an Academy Center (Franchise)
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-10">
        {/* TAB 1: TEACHER TRAINING */}
        {activeTab === "teacher" && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black text-amber-600 uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Professional Certification Program
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  Start Your Career as a Certified Abacus & Vedic Math Educator
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Designed for passionate home tutors, teachers, and entrepreneurs. Learn complete bead mechanics, 16 Vedic Math Sutras, lesson planning, and child psychology methods.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Government & ISO Approved Syllabus</h4>
                      <p className="text-xs text-slate-500">Comprehensive Level 1 to Level 8 Soroban + Senior Vedic Math curriculum.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Flexible Online & Offline Batches</h4>
                      <p className="text-xs text-slate-500">Weekend and weekday slots guided directly by Master Trainer Neha Patil.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">Complete Kit & Business Guidance</h4>
                      <p className="text-xs text-slate-500">Includes physical Abacus frame, teacher manuals, printable test banks, and student lead generation assistance.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl">
                <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
                  <Send className="w-4 h-4 text-amber-500" /> Apply for Next Teacher Training Batch
                </h3>
                <p className="text-xs text-slate-500 mb-6 font-medium">Fill in your contact details for curriculum syllabus & fee structure details.</p>
                <ProfessionalInquiryForm inquiryType="teacher" />
              </div>
            </div>

            {/* Course Curriculum Highlights */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 mb-6 text-center">
                Teacher Certification Modules & Duration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200">
                  <span className="text-xs font-black text-amber-700 uppercase">Module 1</span>
                  <h4 className="font-extrabold text-slate-900 text-base mt-1 mb-2">Abacus Teacher Foundation</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Junior Abacus (JR-0 to JR-3) bead movements, Small Friends (+5/-5), Big Friends (+10/-10), and speed listening dictations.
                  </p>
                </div>
                <div className="p-5 bg-purple-50 rounded-2xl border border-purple-200">
                  <span className="text-xs font-black text-purple-700 uppercase">Module 2</span>
                  <h4 className="font-extrabold text-slate-900 text-base mt-1 mb-2">Vedic Math Master Sutras</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    16 Vedic Sutras & 13 Sub-sutras covering rapid multiplications, division shortcuts, square roots, and algebraic speed math.
                  </p>
                </div>
                <div className="p-5 bg-teal-50 rounded-2xl border border-teal-200">
                  <span className="text-xs font-black text-teal-700 uppercase">Module 3</span>
                  <h4 className="font-extrabold text-slate-900 text-base mt-1 mb-2">Classroom & Center Setup</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    Student performance tracking, parent consultation skills, diagnostic testing, and marketing strategies for starting home batches.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FRANCHISE / ACADEMY CENTER */}
        {activeTab === "franchise" && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-black text-amber-600 uppercase tracking-widest flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" /> Low Investment, High Return Franchise Model
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  Partner with Arnav Abacus Academy in Your City
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Establish an authorized learning center under our trusted brand. Access proven curriculum, online student portal access, and complete marketing support.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-900 text-white rounded-2xl">
                    <span className="text-2xl font-black text-amber-400">Zero</span>
                    <p className="text-xs font-bold text-slate-300 mt-1">Royalty Options Available</p>
                  </div>
                  <div className="p-4 bg-slate-900 text-white rounded-2xl">
                    <span className="text-2xl font-black text-emerald-400">100%</span>
                    <p className="text-xs font-bold text-slate-300 mt-1">Curriculum & Portal Support</p>
                  </div>
                </div>
              </div>

              {/* Franchise Inquiry Form */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl">
                <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-500" /> Apply for Center Franchise
                </h3>
                <p className="text-xs text-slate-500 mb-6 font-medium">Get detailed franchise prospectus and revenue share models.</p>
                <ProfessionalInquiryForm inquiryType="franchise" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
