/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Download, FileText, Sparkles, CheckCircle2, BookOpen, Layers, Filter, ShieldCheck, Mail, User, Phone, ArrowRight } from "lucide-react";
import { generateQuizWorksheetPDF } from "../lib/quizPdfGenerator";
import { ABACUS_QUESTION_SETS, VEDIC_QUESTION_SETS } from "../data/practiceData";

export default function WorksheetVault() {
  const [category, setCategory] = useState<"abacus" | "vedic">("abacus");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const activeSets = category === "abacus" ? ABACUS_QUESTION_SETS : VEDIC_QUESTION_SETS;

  // Filter sets by selected level
  const filteredSets = selectedLevel === "all" 
    ? activeSets 
    : activeSets.filter(s => s.level.toLowerCase() === selectedLevel.toLowerCase());

  // Extract unique levels
  const availableLevels = Array.from(new Set(activeSets.map(s => s.level)));

  const handleDownloadWorksheet = async (set: any, includeAnswers: boolean = false) => {
    setIsGenerating(true);
    setDownloadSuccess(null);

    // Save lead info if provided
    if (userEmail || userName) {
      const leads = JSON.parse(localStorage.getItem("aaa_worksheet_leads") || "[]");
      leads.push({
        name: userName || "Parent Lead",
        email: userEmail || "anonymous@lead.com",
        phone: userPhone,
        worksheet: set.title,
        downloadedAt: new Date().toISOString()
      });
      localStorage.setItem("aaa_worksheet_leads", JSON.stringify(leads));
    }

    try {
      await generateQuizWorksheetPDF(
        userName || "Student",
        set.id,
        set.title,
        set.questions ? set.questions.length : 20,
        "download"
      );

      setDownloadSuccess(`Successfully generated "${set.title}" PDF Worksheet!`);
      setTimeout(() => setDownloadSuccess(null), 4000);
    } catch (e) {
      console.error("Failed to generate PDF", e);
      alert("Generating PDF... Please check your downloads folder.");
    } finally {
      setIsGenerating(false);
    }
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
                Get Customized Daily Math Worksheets Sent to Your Email
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Enter your details to download unlimited worksheets for Junior & Senior Abacus and Vedic Maths.
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
                  onClick={() => handleDownloadWorksheet(set, false)}
                  disabled={isGenerating}
                  className="flex-1 py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  Print Worksheet
                </button>
                <button
                  onClick={() => handleDownloadWorksheet(set, true)}
                  disabled={isGenerating}
                  className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                  title="Download Worksheet with Answer Key"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Answer Key
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
