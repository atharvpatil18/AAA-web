/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Download, FileText, Sparkles, CheckCircle2, BookOpen, Layers, Filter, ShieldCheck, Mail, User, Phone, ArrowRight } from "lucide-react";
import { generateQuizWorksheetPDF } from "../lib/quizPdfGenerator";
import { ABACUS_QUESTION_SETS, VEDIC_QUESTION_SETS } from "../data/practiceData";
import { dispatchLeadToWebhook } from "../lib/leadWebhook";

export default function WorksheetVault() {
  const [category, setCategory] = useState<"abacus" | "vedic">("abacus");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const [pendingDownload, setPendingDownload] = useState<{ set: any; includeAnswers: boolean } | null>(null);
  const [showGateModal, setShowGateModal] = useState(false);

  const activeSets = category === "abacus" ? ABACUS_QUESTION_SETS : VEDIC_QUESTION_SETS;

  // Filter sets by selected level
  const filteredSets = selectedLevel === "all" 
    ? activeSets 
    : activeSets.filter(s => s.level.toLowerCase() === selectedLevel.toLowerCase());

  // Extract unique levels
  const availableLevels = Array.from(new Set(activeSets.map(s => s.level)));

  const executeDownload = async (targetSet: any, includeAnswers: boolean, nameToUse: string, phoneToUse: string, emailToUse: string) => {
    setIsGenerating(true);
    setDownloadSuccess(null);

    const cleanName = (nameToUse || "Parent Lead").trim();
    const cleanEmail = (emailToUse || "parent@arnavabacus.com").trim();
    const cleanPhone = (phoneToUse || "").trim();

    // Save lead info if provided
    if (cleanPhone || nameToUse || emailToUse) {
      try {
        const leads = JSON.parse(localStorage.getItem("aaa_worksheet_leads") || "[]");
        leads.unshift({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          worksheet: targetSet.title,
          includeAnswers,
          downloadedAt: new Date().toISOString()
        });
        localStorage.setItem("aaa_worksheet_leads", JSON.stringify(leads.slice(0, 100)));

        // Also record into unified academy leads CRM
        const unified = JSON.parse(localStorage.getItem("aaa_leads_history") || "[]");
        unified.unshift({
          id: `lead_ws_${Date.now()}`,
          parentName: cleanName,
          studentName: cleanName,
          childAge: "Worksheet Student",
          program: `Worksheet: ${targetSet.title}${includeAnswers ? " (With Key)" : ""}`,
          countryCode: "+91",
          classMode: "worksheet_download",
          timeZone: "Asia/Kolkata",
          schoolCurriculum: cleanPhone ? `WhatsApp: ${cleanPhone}` : "N/A",
          campaign: `Worksheet Vault (${category.toUpperCase()} ${targetSet.level})`,
          submittedAt: new Date().toISOString(),
        });
        localStorage.setItem("aaa_leads_history", JSON.stringify(unified.slice(0, 100)));
      } catch (err) {
        console.warn("Unified lead sync err:", err);
      }

      // Dispatch to Centralized Google Sheet Webhook
      try {
        await dispatchLeadToWebhook({
          leadType: "Worksheet Download",
          parentName: cleanName,
          studentName: cleanName,
          phone: cleanPhone,
          email: cleanEmail,
          childAge: "Student",
          program: `${category.toUpperCase()} ${targetSet.level}: ${targetSet.title}`,
          classMode: includeAnswers ? "PDF Download (With Answer Key)" : "PDF Download (Practice Sheet)",
          campaign: `Worksheet Vault (${category.toUpperCase()} ${targetSet.level})`,
          notes: `Downloaded ${targetSet.title}`,
        });
      } catch (webhookErr) {
        console.warn("Lead webhook error in WorksheetVault:", webhookErr);
      }
    }

    try {
      await generateQuizWorksheetPDF(
        cleanName !== "Parent Lead" ? cleanName : "Student",
        targetSet.id,
        targetSet.title,
        targetSet.questions ? targetSet.questions.length : 20,
        "download",
        includeAnswers
      );

      setDownloadSuccess(
        `Generated "${targetSet.title}" ${includeAnswers ? "with Complete Answer Key" : "Practice Sheet"}! Check your downloads.`
      );
      setTimeout(() => setDownloadSuccess(null), 5000);
    } catch (e) {
      console.error("Failed to generate PDF", e);
      alert("Preparing PDF download... Please check your downloads folder.");
    } finally {
      setIsGenerating(false);
      setShowGateModal(false);
      setPendingDownload(null);
    }
  };

  const handleDownloadClick = (set: any, includeAnswers: boolean = false) => {
    // If downloading Answer Key, parent Name AND WhatsApp phone number are strictly required.
    // If downloading practice sheet without answer key, prompt modal if phone or name is missing.
    const hasName = Boolean(userName.trim());
    const hasPhone = Boolean(userPhone.trim());

    if (includeAnswers) {
      if (!hasName || !hasPhone) {
        setPendingDownload({ set, includeAnswers: true });
        setShowGateModal(true);
        return;
      }
    } else {
      if (!hasName && !hasPhone) {
        setPendingDownload({ set, includeAnswers: false });
        setShowGateModal(true);
        return;
      }
    }

    executeDownload(set, includeAnswers, userName, userPhone, userEmail);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Header */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-14 px-4 md:px-8 border-b border-indigo-900/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            📚 100% Free Printable PDF Worksheet Vault
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white mb-3">
            Abacus & Vedic Math <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-teal-300">Practice Worksheets</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
            Download high-quality printable practice sheets with full step-by-step answer keys. Perfect for daily speed drills, home practice, and exam readiness.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 relative z-20">
        {/* Quick Lead Capture Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center lg:text-left">
              <span className="text-xs font-black text-amber-600 uppercase tracking-wider flex items-center justify-center lg:justify-start gap-1">
                <ShieldCheck className="w-4 h-4" /> Instantly Download PDF Sheets
              </span>
              <h3 className="text-xl font-extrabold text-slate-900">
                Personalize & Download High-Quality Printable Worksheets
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Enter your details to generate custom PDF worksheets with full answer keys for home drills and speed practice.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="Parent Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full sm:w-40 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full sm:w-48 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="tel"
                placeholder="WhatsApp No."
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full sm:w-36 px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          {downloadSuccess && (
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {downloadSuccess}
            </div>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center bg-slate-200 p-1.5 rounded-xl gap-1 w-full md:w-auto">
            <button
              onClick={() => { setCategory("abacus"); setSelectedLevel("all"); }}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                category === "abacus"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              🧮 Abacus Worksheets
            </button>
            <button
              onClick={() => { setCategory("vedic"); setSelectedLevel("all"); }}
              className={`flex-1 md:flex-none px-6 py-2.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                category === "vedic"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              ⚡ Vedic Math Worksheets
            </button>
          </div>

          {/* Level Filter Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-bold text-slate-600">Filter Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="all">All Levels ({activeSets.length} Sets)</option>
              {availableLevels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  Level: {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Worksheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSets.map((set) => (
            <div
              key={set.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-black rounded-md border border-amber-300 uppercase">
                    Level {set.level}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" /> {set.questions.length} Questions
                  </span>
                </div>

                <h4 className="font-extrabold text-slate-900 text-base mb-2 group-hover:text-amber-600 transition-colors">
                  {set.title}
                </h4>
                <p className="text-xs text-slate-600 font-medium mb-4 line-clamp-2">
                  {set.description || "Comprehensive mental calculation speed sheet for daily student practice."}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleDownloadClick(set, false)}
                  disabled={isGenerating}
                  className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  Print Worksheet
                </button>
                <button
                  onClick={() => handleDownloadClick(set, true)}
                  disabled={isGenerating}
                  className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                  title="Download Worksheet with Complete Answer Key"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Answer Key
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Download & Personalization Modal */}
      {showGateModal && pendingDownload && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`p-2 rounded-xl ${pendingDownload.includeAnswers ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                  {pendingDownload.includeAnswers ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Sparkles className="w-5 h-5 text-amber-600" />}
                </span>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {pendingDownload.includeAnswers ? "Unlock Complete Answer Key" : "Personalize Your Worksheet"}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">{pendingDownload.set.title}</p>
                </div>
              </div>
              <button
                onClick={() => setShowGateModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 font-medium leading-relaxed">
              {pendingDownload.includeAnswers ? (
                <span>
                  Please enter your <strong>Parent / Student Name</strong> and <strong>WhatsApp Number</strong> to unlock and download the complete step-by-step solution and answer key.
                </span>
              ) : (
                <span>
                  Enter your details to customize the worksheet header with the student's name, or skip to download as a guest student.
                </span>
              )}
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                executeDownload(
                  pendingDownload.set,
                  pendingDownload.includeAnswers,
                  userName,
                  userPhone,
                  userEmail
                );
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Candidate / Parent Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  WhatsApp Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="e.g. parent@gmail.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isGenerating}
                  className={`w-full py-2.5 px-4 font-black rounded-xl text-xs flex items-center justify-center gap-2 transition shadow cursor-pointer ${
                    pendingDownload.includeAnswers
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "bg-amber-500 hover:bg-amber-600 text-slate-950"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  {isGenerating
                    ? "Generating PDF..."
                    : pendingDownload.includeAnswers
                    ? "Unlock & Download Complete Answer Key"
                    : "Download Printable Worksheet"}
                </button>

                {!pendingDownload.includeAnswers && (
                  <button
                    type="button"
                    onClick={() => {
                      executeDownload(
                        pendingDownload.set,
                        false,
                        "Student",
                        "",
                        ""
                      );
                    }}
                    className="text-[11px] text-slate-500 hover:text-slate-800 text-center py-1 font-medium underline cursor-pointer"
                  >
                    Skip & download as anonymous Guest Student
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
