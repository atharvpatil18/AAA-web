/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Award, BookOpen, CheckCircle2, ShieldCheck, Users, GraduationCap, Building2, Sparkles, Phone, Mail, MapPin, Send, ArrowRight, Check } from "lucide-react";
import { validateSanitizedName, validateSanitizedEmail, validateSanitizedPhone } from "../lib/securitySanitizer";
import { dispatchLeadToWebhook } from "../lib/leadWebhook";
import { trackEnquiryFormSubmit, trackWhatsAppClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

interface InquiryFormProps {
  inquiryType: "teacher" | "franchise";
}

function ProfessionalInquiryForm({ inquiryType }: InquiryFormProps) {
  const { language, t } = useLanguage();
  const founderName = language === "mr" ? "नेहा पाटील" : language === "hi" ? "नेहा पाटिल" : "Neha Patil";
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [profession, setProfession] = useState(
    inquiryType === "teacher" ? "School / Tuition Teacher" : "Education Entrepreneur"
  );
  const [preferredMode, setPreferredMode] = useState("Online Live Virtual");
  const [notes, setNotes] = useState("");
  const [botHoneypot, setBotHoneypot] = useState(""); // Invisible bot trap
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Bot trap check
    if (botHoneypot.trim()) {
      return;
    }

    const nameVal = validateSanitizedName(fullName);
    if (!nameVal.valid) {
      setError(nameVal.error || t("tfErrorFullName"));
      return;
    }

    const phoneVal = validateSanitizedPhone(phone, "+91");
    if (!phoneVal.valid) {
      setError(phoneVal.error || t("tfErrorPhone"));
      return;
    }
    const cleanPhone = phoneVal.sanitized;

    if (email.trim()) {
      const emailVal = validateSanitizedEmail(email);
      if (!emailVal.valid) {
        setError(emailVal.error || t("tfErrorEmail"));
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
      honeypot: botHoneypot,
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

    // Track canonical conversion events (Zero-PII)
    trackEnquiryFormSubmit({
      program: typeLabel,
      childAgeGroup: "Adult / Professional",
      classMode: preferredMode,
      sourceCampaign: typeLabel,
      audienceType: inquiryType === "teacher" ? "teacher" : "franchise",
    });
    trackWhatsAppClick("teacher_franchise_form", typeLabel);

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
        <h4 className="font-extrabold text-slate-900 text-lg">{t("tfSuccessTitle")}</h4>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          {inquiryType === "teacher"
            ? t("tfSuccessDescTeacher").replace("{name}", fullName).replace("{founder}", founderName)
            : t("tfSuccessDescFranchise").replace("{name}", fullName).replace("{founder}", founderName)}
        </p>
        <div className="pt-2 space-y-2">
          <a
            href={`https://wa.me/919021924968?text=${encodeURIComponent(`Hello Neha Ma'am! I registered my inquiry for ${inquiryType === "teacher" ? "Teacher Training" : "Franchise"}. Name: ${fullName}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{t("tfBtnWhatsAppChat")}</span>
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
            {t("tfBtnSubmitAnother")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Invisible Honeypot Trap */}
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

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">{t("tfLabelFullName")}</label>
        <input
          type="text"
          required
          placeholder={t("tfPlaceholderFullName")}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">{t("tfLabelWhatsApp")}</label>
          <input
            type="tel"
            required
            placeholder={t("tfPlaceholderPhone")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">{t("tfLabelEmail")}</label>
          <input
            type="email"
            placeholder={t("tfPlaceholderEmail")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">{t("tfLabelCity")}</label>
          <input
            type="text"
            required
            placeholder={t("tfPlaceholderCity")}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            {inquiryType === "teacher" ? t("tfLabelBackground") : t("tfLabelProposedModel")}
          </label>
          <select
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {inquiryType === "teacher" ? (
              <>
                <option value="School / Tuition Teacher">{t("tfRoleSchoolTeacher")}</option>
                <option value="Home Tutor / Parent">{t("tfRoleHomeTutor")}</option>
                <option value="College Graduate / Fresher">{t("tfRoleGraduate")}</option>
                <option value="Education Entrepreneur">{t("tfRoleEntrepreneur")}</option>
              </>
            ) : (
              <>
                <option value="New Learning Center Setup">{t("tfModelNewCenter")}</option>
                <option value="Existing Coaching Center Add-on">{t("tfModelCoachingAddon")}</option>
                <option value="Home-Based Micro Center">{t("tfModelMicroCenter")}</option>
                <option value="School Partnership Model">{t("tfModelSchoolPartnership")}</option>
              </>
            )}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">{t("tfLabelTrainingMode")}</label>
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
            🌐 {t("tfModeOnline")}
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
            🏫 {t("tfModeCenter")}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">{t("tfLabelMessage")}</label>
        <textarea
          rows={2}
          placeholder={t("tfPlaceholderMessage")}
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
        <span>{inquiryType === "teacher" ? t("tfBtnApplyTeacher") : t("tfBtnApplyFranchise")}</span>
      </button>
    </form>
  );
}

export default function TeacherFranchise() {
  const { language, t } = useLanguage();
  const founderName = language === "mr" ? "नेहा पाटील" : language === "hi" ? "नेहा पाटिल" : "Neha Patil";
  const [activeTab, setActiveTab] = useState<"teacher" | "franchise">("teacher");

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white py-16 px-4 md:px-8 border-b border-purple-900/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            {t("tfHeroBadge")}
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white mb-3">
            {t("tfHeroTitlePrefix")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-teal-300">
              {t("tfHeroTitleHighlight")}
            </span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
            {t("tfHeroDesc").replace("{founder}", founderName)}
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
              {t("tfTabTeacher")}
            </button>
            <button
              onClick={() => setActiveTab("franchise")}
              className={`px-6 py-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeTab === "franchise"
                  ? "bg-amber-500 text-slate-950 shadow-lg"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {t("tfTabFranchise")}
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
                  <Award className="w-4 h-4" /> {t("tfTeacherBadge")}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  {t("tfTeacherHeading")}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {t("tfTeacherDesc")}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">{t("tfBenefit1Title")}</h4>
                      <p className="text-xs text-slate-500">{t("tfBenefit1Desc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">{t("tfBenefit2Title")}</h4>
                      <p className="text-xs text-slate-500">{t("tfBenefit2Desc").replace("{founder}", founderName)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900">{t("tfBenefit3Title")}</h4>
                      <p className="text-xs text-slate-500">{t("tfBenefit3Desc")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl">
                <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
                  <Send className="w-4 h-4 text-amber-500" /> {t("tfApplyTeacherTitle")}
                </h3>
                <p className="text-xs text-slate-500 mb-6 font-medium">{t("tfApplyTeacherDesc")}</p>
                <ProfessionalInquiryForm inquiryType="teacher" />
              </div>
            </div>

            {/* Course Curriculum Highlights */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-extrabold text-slate-900 mb-6 text-center">
                {t("tfModulesTitle")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200">
                  <span className="text-xs font-black text-amber-700 uppercase">{t("tfModule1Badge")}</span>
                  <h4 className="font-extrabold text-slate-900 text-base mt-1 mb-2">{t("tfModule1Title")}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {t("tfModule1Desc")}
                  </p>
                </div>
                <div className="p-5 bg-purple-50 rounded-2xl border border-purple-200">
                  <span className="text-xs font-black text-purple-700 uppercase">{t("tfModule2Badge")}</span>
                  <h4 className="font-extrabold text-slate-900 text-base mt-1 mb-2">{t("tfModule2Title")}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {t("tfModule2Desc")}
                  </p>
                </div>
                <div className="p-5 bg-teal-50 rounded-2xl border border-teal-200">
                  <span className="text-xs font-black text-teal-700 uppercase">{t("tfModule3Badge")}</span>
                  <h4 className="font-extrabold text-slate-900 text-base mt-1 mb-2">{t("tfModule3Title")}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {t("tfModule3Desc")}
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
                  <Building2 className="w-4 h-4" /> {t("tfFranchiseBadge")}
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  {t("tfFranchiseHeading")}
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {t("tfFranchiseDesc")}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-900 text-white rounded-2xl">
                    <span className="text-2xl font-black text-amber-400">{t("tfFranchiseStat1Val")}</span>
                    <p className="text-xs font-bold text-slate-300 mt-1">{t("tfFranchiseStat1Label")}</p>
                  </div>
                  <div className="p-4 bg-slate-900 text-white rounded-2xl">
                    <span className="text-2xl font-black text-emerald-400">{t("tfFranchiseStat2Val")}</span>
                    <p className="text-xs font-bold text-slate-300 mt-1">{t("tfFranchiseStat2Label")}</p>
                  </div>
                </div>
              </div>

              {/* Franchise Inquiry Form */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl">
                <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-500" /> {t("tfApplyFranchiseTitle")}
                </h3>
                <p className="text-xs text-slate-500 mb-6 font-medium">{t("tfApplyFranchiseDesc")}</p>
                <ProfessionalInquiryForm inquiryType="franchise" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
