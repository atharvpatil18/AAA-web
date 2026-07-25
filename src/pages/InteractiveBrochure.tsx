/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { generateBrochurePDF } from "../lib/brochure";
import { useLanguage } from "../lib/LanguageContext";
import { RotateCw, Download, Sparkles, HelpCircle, Phone, Award, Zap, BookOpen, CheckCircle2, Sliders, Layers, Clock, FileText, FileCheck, Target, Lightbulb } from "lucide-react";

export default function InteractiveBrochure() {
  const { language, t } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeDocTab, setActiveDocTab] = useState<"brochure" | "manual">("brochure");

  const handleDownload = () => {
    generateBrochurePDF(language);
  };

  return (
    <div className="bg-[#FFFDF9] min-h-screen py-10 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      {/* Header Container */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-8 border-b border-slate-200/80 pb-8">
        {/* 1. Header Intro */}
        <div className="text-center md:text-left space-y-3 max-w-2xl">
          <span className="text-[10px] font-extrabold text-vibrant-orange bg-vibrant-orange/10 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            📖 2-Page Official Resource & User Manual
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-vibrant-dark leading-tight">
            Academy Brochure & Speed Math SOP User Manual
          </h1>
          <p className="text-gray-650 text-sm sm:text-base font-semibold leading-relaxed">
            Explore our whole-brain soroban abacus methodology, student olympiad wins, and the 3-Mode Speed Math Practice SOP User Manual aligned with NEP 2020 cognitive framework.
          </p>
        </div>

        {/* 2. Responsive Action Buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end gap-3 sm:justify-center shrink-0 w-full md:w-auto">
          {/* Download 2-Page PDF Button */}
          <button
            onClick={handleDownload}
            className="bg-vibrant-orange hover:bg-vibrant-orange/95 text-white px-8 py-4 rounded-2xl font-black text-xs sm:text-sm shadow-lg hover:shadow-xl active:scale-97 transition-all flex items-center justify-center gap-2.5 cursor-pointer border-2 border-amber-300 w-full sm:w-auto md:w-72 uppercase tracking-wide"
          >
            <Download className="w-4 h-4 animate-bounce shrink-0" />
            <span>Download 2-Page PDF (Brochure + SOP Manual)</span>
          </button>

          {/* Tab Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 w-full sm:w-auto md:w-72 justify-between">
            <button
              onClick={() => setActiveDocTab("brochure")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeDocTab === "brochure"
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Brochure</span>
            </button>
            <button
              onClick={() => setActiveDocTab("manual")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeDocTab === "manual"
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>SOP Manual</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Document View Content */}
      {activeDocTab === "manual" ? (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Header Banner for SOP Manual */}
          <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-teal-500 text-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-amber-300 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 z-10 max-w-2xl">
              <span className="bg-slate-950/40 text-amber-200 border border-amber-300/40 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                BECOME A SPEED MATH WIZARD • NEP 2020 BRAIN DRILLS 🚀
              </span>
              <h2 className="text-2xl md:text-4xl font-black font-display text-white tracking-tight leading-tight">
                Speed Math Simulator SOP & Kids Practice Guide 🧮
              </h2>
              <p className="text-xs md:text-sm font-semibold text-slate-100/90 leading-relaxed">
                Master 10X mental calculation speeds! Learn how to use Soroban Abacus bead visualization and ancient Vedic Math shortcuts to eliminate finger-counting and math fear.
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="z-10 bg-slate-950 hover:bg-slate-900 text-amber-300 hover:text-white px-6 py-4 rounded-2xl font-black text-xs md:text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer border-2 border-amber-400 shrink-0 uppercase tracking-wide"
            >
              <Download className="w-5 h-5 text-amber-400 animate-bounce" />
              <span>Download 2-Page Color PDF Manual</span>
            </button>
          </div>

          {/* Section 1: Whole-Brain Calculation Magic */}
          <div className="bg-white border-2 border-amber-200 rounded-3xl p-6 md:p-8 shadow-md space-y-4 hover:border-amber-400 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-vibrant-orange text-white rounded-2xl shadow-md shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-vibrant-orange bg-vibrant-orange/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  🌟 STEP 1: UNDERSTAND THE MATH MAGIC
                </span>
                <h3 className="text-lg md:text-xl font-black text-vibrant-dark mt-1">
                  1. Whole-Brain Calculation Methodology & Brain Agility
                </h3>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-700 font-semibold leading-relaxed">
              Arnav Abacus Academy (Wakad, Pune) provides a whole-brain speed math simulator aligning with NEP 2020 cognitive guidelines. By integrating physical soroban abacus bead visualization with ancient Vedic math shortcuts, students achieve 10X faster mental calculation speeds while building photographic focus.
            </p>

            <div className="p-4 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-teal-500/10 border-2 border-dashed border-amber-300 rounded-2xl text-xs md:text-sm text-slate-800 font-bold flex flex-wrap items-center gap-2">
              <span className="text-vibrant-orange font-black">Core Course Focus & Syllabus Synergy:</span>
              <span className="bg-white px-2.5 py-1 rounded-xl shadow-xs border border-amber-200 text-slate-800 font-extrabold">Abacus Classes in Wakad Pune</span>
              <span className="bg-white px-2.5 py-1 rounded-xl shadow-xs border border-amber-200 text-slate-800 font-extrabold">Speed Math Simulator</span>
              <span className="bg-white px-2.5 py-1 rounded-xl shadow-xs border border-amber-200 text-slate-800 font-extrabold">Vedic Math Shortcuts</span>
              <span className="bg-white px-2.5 py-1 rounded-xl shadow-xs border border-amber-200 text-slate-800 font-extrabold">Cambridge & IB Synergy</span>
            </div>
          </div>

          {/* Section 2: 3-Mode Interactive Game Configuration */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-vibrant-teal text-white rounded-2xl shadow-md shrink-0">
                <Sliders className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-vibrant-teal bg-vibrant-teal/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  🎮 STEP 2: CONFIGURE YOUR GAME DRILL
                </span>
                <h3 className="text-lg md:text-xl font-black text-vibrant-dark mt-1">
                  2. Speed Math Simulator User Manual (3-Mode Game Challenge)
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Mode 1 Card */}
              <div className="bg-gradient-to-b from-orange-500/10 to-amber-500/5 border-2 border-orange-300 rounded-3xl p-6 space-y-3 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black bg-vibrant-orange text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      MODE 1
                    </span>
                    <span className="text-xl">🎯</span>
                  </div>
                  <h4 className="font-black text-base md:text-lg text-slate-900">Select Question Volume</h4>
                  <p className="text-xs md:text-sm text-slate-600 font-semibold leading-relaxed">
                    Choose between <strong>10 Qs, 20 Qs, 50 Qs, 100 Qs, or 200 Qs</strong>! 10 questions for daily speed warm-ups; 100-200 questions for Olympiad competition stamina.
                  </p>
                </div>
                <div className="pt-3 border-t border-orange-200/60 text-[11px] font-bold text-vibrant-orange flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-vibrant-orange shrink-0" />
                  <span>Builds Calculation Stamina</span>
                </div>
              </div>

              {/* Mode 2 Card */}
              <div className="bg-gradient-to-b from-teal-500/10 to-emerald-500/5 border-2 border-teal-300 rounded-3xl p-6 space-y-3 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black bg-vibrant-teal text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      MODE 2
                    </span>
                    <span className="text-xl">⚡</span>
                  </div>
                  <h4 className="font-black text-base md:text-lg text-slate-900">Select Speed Math Topic</h4>
                  <p className="text-xs md:text-sm text-slate-600 font-semibold leading-relaxed">
                    Choose <strong>Single Digit Direct (4-5-6 Rows)</strong>, <strong>Double Digit Direct (4-5-6 Rows)</strong>, or <strong>Both (Mixed Rows)</strong> to move soroban beads mentally!
                  </p>
                </div>
                <div className="pt-3 border-t border-teal-200/60 text-[11px] font-bold text-vibrant-teal flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-vibrant-teal shrink-0" />
                  <span>Trains Spatial Bead Memory</span>
                </div>
              </div>

              {/* Mode 3 Card */}
              <div className="bg-gradient-to-b from-purple-500/10 to-indigo-500/5 border-2 border-purple-300 rounded-3xl p-6 space-y-3 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black bg-purple-600 text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      MODE 3
                    </span>
                    <span className="text-xl">⏱️</span>
                  </div>
                  <h4 className="font-black text-base md:text-lg text-slate-900">Set Your Race Clock!</h4>
                  <p className="text-xs md:text-sm text-slate-600 font-semibold leading-relaxed">
                    Select Time as <strong>2 Min, 4 Min, 5 Min, 10 Min, or 20 Min</strong>! Race against the countdown timer to build instant accuracy under exam pressure!
                  </p>
                </div>
                <div className="pt-3 border-t border-purple-200/60 text-[11px] font-bold text-purple-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>Enforces Rapid Exam Speed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Printable PDF & Evaluation Workflow */}
          <div className="bg-white border-2 border-blue-200 rounded-3xl p-6 md:p-8 shadow-md space-y-4 hover:border-blue-400 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-md shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  📄 STEP 3: OFFLINE HOME PRACTICE
                </span>
                <h3 className="text-lg md:text-xl font-black text-vibrant-dark mt-1">
                  3. Printable PDF Worksheets & Parent Evaluation Workflow
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-1">
                <h4 className="font-black text-xs md:text-sm text-slate-900 flex items-center gap-1.5">
                  <span>📄</span> 1-Click PDF Generation
                </h4>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  Generate print-ready A4 worksheets with centered calculation columns for offline home drills.
                </p>
              </div>

              <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl space-y-1">
                <h4 className="font-black text-xs md:text-sm text-slate-900 flex items-center gap-1.5">
                  <span>📑</span> Attached Academy Brochure
                </h4>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  Every downloaded PDF worksheet automatically includes the Academy Brochure & contact info for reference.
                </p>
              </div>

              <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-1">
                <h4 className="font-black text-xs md:text-sm text-slate-900 flex items-center gap-1.5">
                  <span>✍️</span> Parent Evaluation Boxes
                </h4>
                <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                  Each question card includes dedicated Ans: entry boxes and Eval: check/crossmark boxes to track score accuracy.
                </p>
              </div>
            </div>
          </div>

          {/* Enthusiastic Call to Action Bar */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border-4 border-amber-400 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block border border-amber-400/20">
                🏆 READY TO TEST YOUR MATH AGILITY?
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                Try the 10 Questions in 2 Minutes Speed Sprint Right Now!
              </h3>
              <p className="text-xs md:text-sm text-slate-300 font-semibold">
                No passwords required. Experience live timer drills and record your score on the leaderboard!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="/login?mode=guest"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black px-6 py-4 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer border-2 border-amber-300"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>START FREE GUEST SPRINT DRILL</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* 2. 3D Card Flipping Container - Removed scrollbars and compacted contents for mobile */
        <div className="relative w-full max-w-4xl mx-auto h-[690px] md:h-[710px] lg:h-[730px] perspective-1000 mb-12">
          <div
            className={`relative w-full h-full duration-700 transform-style-3d cursor-pointer ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
          {/* FRONT SIDE */}
          <div className="absolute w-full h-full backface-hidden border border-slate-200/80 rounded-3xl bg-white shadow-xl shadow-slate-200/40 flex flex-col justify-between overflow-hidden p-4 md:p-6 lg:p-8">
            {/* Header section with Circular Academy Logo */}
            <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3 md:pb-4 shrink-0">
              <div className="flex items-center gap-2 md:gap-3">
                <img 
                  src="/logo.png" 
                  className="w-8 h-8 md:w-12 md:h-12 object-contain rounded-full border border-slate-200 bg-white" 
                  alt="Academy Logo"
                />
                <div>
                  <h2 className="font-display font-black text-sm md:text-xl text-vibrant-dark tracking-tight leading-tight">
                    ARNAV ABACUS ACADEMY
                  </h2>
                  <p className="text-[8px] md:text-[10px] font-bold text-vibrant-orange uppercase tracking-wider">
                    {t("brochureNepInfo")}
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-bold text-vibrant-teal bg-vibrant-teal/10 px-3 py-1 rounded-full uppercase">
                {t("brochureSideFront")}
              </span>
            </div>

            {/* Core Impact Hook */}
            <div className="my-2 md:my-3 text-center bg-indigo-50/20 border border-indigo-100 rounded-2xl p-2.5 md:p-4 shrink-0">
              <h3 className="font-display font-black text-[11px] md:text-base text-indigo-950 flex items-center justify-center gap-1.5 md:gap-2">
                <Sparkles className="w-3.5 h-3.5 md:w-5 md:h-5 text-vibrant-orange animate-pulse" />
                {t("brochureHookTitle")}
              </h3>
              <p className="text-gray-650 text-[10px] md:text-xs font-semibold mt-0.5 max-w-2xl mx-auto leading-tight md:leading-relaxed">
                {t("brochureHookDesc")}
              </p>
              <p className="text-vibrant-orange text-[10px] md:text-xs italic font-black mt-1 max-w-2xl mx-auto leading-tight md:leading-relaxed">
                {t("brochureHookQuote")}
              </p>
            </div>

            {/* Programs Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 my-1 md:my-2 shrink-0">
              {/* Card 1 */}
              <div className="bg-orange-50/20 border border-orange-100/70 rounded-2xl p-2.5 md:p-4 flex flex-row md:flex-col justify-between items-center md:items-stretch gap-2 hover:shadow-md transition-shadow">
                <div className="flex-1 md:flex-initial">
                  <h4 className="font-black text-xs md:text-sm text-vibrant-dark leading-tight flex items-center gap-1.5">
                    <span className="w-5 h-5 bg-vibrant-orange text-white rounded-lg flex items-center justify-center font-bold text-[10px] md:text-xs">1</span>
                    {t("brochureProg1Title")}
                  </h4>
                  <p className="text-gray-650 text-[9.5px] md:text-[11px] leading-tight font-semibold mt-0.5">
                    {t("brochureProg1Desc")}
                  </p>
                </div>
                <div className="border-l md:border-l-0 md:border-t border-dashed border-slate-205 pl-2 md:pl-0 md:pt-1.5 shrink-0 text-[8.5px] md:text-[9.5px] font-bold text-gray-500">
                  <p className="font-bold text-vibrant-dark hidden md:block">{t("brochureFocusOutcomes")}</p>
                  <span>{t("brochureProg1Outcome")}</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-teal-50/20 border border-teal-100/70 rounded-2xl p-2.5 md:p-4 flex flex-row md:flex-col justify-between items-center md:items-stretch gap-2 hover:shadow-md transition-shadow">
                <div className="flex-1 md:flex-initial">
                  <h4 className="font-black text-xs md:text-sm text-vibrant-dark leading-tight flex items-center gap-1.5">
                    <span className="w-5 h-5 bg-vibrant-teal text-white rounded-lg flex items-center justify-center font-bold text-[10px] md:text-xs">2</span>
                    {t("brochureProg2Title")}
                  </h4>
                  <p className="text-gray-655 text-[9.5px] md:text-[11px] leading-tight font-semibold mt-0.5">
                    {t("brochureProg2Desc")}
                  </p>
                </div>
                <div className="border-l md:border-l-0 md:border-t border-dashed border-slate-205 pl-2 md:pl-0 md:pt-1.5 shrink-0 text-[8.5px] md:text-[9.5px] font-bold text-gray-500">
                  <p className="font-bold text-vibrant-dark hidden md:block">{t("brochureFocusOutcomes")}</p>
                  <span>{t("brochureProg2Outcome")}</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-blue-50/20 border border-blue-100/70 rounded-2xl p-2.5 md:p-4 flex flex-row md:flex-col justify-between items-center md:items-stretch gap-2 hover:shadow-md transition-shadow">
                <div className="flex-1 md:flex-initial">
                  <h4 className="font-black text-xs md:text-sm text-vibrant-dark leading-tight flex items-center gap-1.5">
                    <span className="w-5 h-5 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-[10px] md:text-xs">3</span>
                    {t("brochureProg3Title")}
                  </h4>
                  <p className="text-gray-650 text-[9.5px] md:text-[11px] leading-tight font-semibold mt-0.5">
                    {t("brochureProg3Desc")}
                  </p>
                </div>
                <div className="border-l md:border-l-0 md:border-t border-dashed border-slate-205 pl-2 md:pl-0 md:pt-1.5 shrink-0 text-[8.5px] md:text-[9.5px] font-bold text-gray-500">
                  <p className="font-bold text-vibrant-dark hidden md:block">{t("brochureFocusOutcomes")}</p>
                  <span>{t("brochureProg3Outcome")}</span>
                </div>
              </div>
            </div>

            {/* Bottom Brand Credential Footer */}
            <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-2.5 md:pt-4 mt-1 shrink-0">
              <p className="text-[8.5px] md:text-[10px] font-bold text-gray-500">
                {t("brochureHubInfo")}
              </p>
              <p className="text-[9.5px] md:text-[11px] font-bold text-vibrant-orange animate-bounce">
                {t("brochureFlipActionBack")}
              </p>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 border border-slate-200/80 rounded-3xl bg-white shadow-xl shadow-slate-200/40 flex flex-col justify-between overflow-hidden p-4 md:p-6 lg:p-8">
            {/* Header section */}
            <div className="flex items-center justify-between border-b border-dashed border-slate-200 pb-3 md:pb-4 shrink-0">
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-lg">🏆</span>
                <div>
                  <h2 className="font-display font-black text-sm md:text-xl text-vibrant-dark tracking-tight leading-tight">
                    {t("brochureTrustTitle")}
                  </h2>
                  <p className="text-[8px] md:text-[10px] font-bold text-vibrant-teal uppercase tracking-wider">
                    {t("brochureTrustSub")}
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-block text-[10px] font-bold text-vibrant-orange bg-vibrant-orange/10 px-3 py-1 rounded-full uppercase">
                {t("brochureSideBack")}
              </span>
            </div>

            {/* Content grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 my-1.5 md:my-2 shrink-0">
              {/* AAA Advantages */}
              <div className="space-y-1">
                <h3 className="font-bold text-xs md:text-sm text-vibrant-dark flex items-center gap-1">
                  <Zap className="w-3 h-3 md:w-3.5 md:h-3.5 text-vibrant-orange" />
                  {t("brochureAdvTitle")}
                </h3>
                <div className="space-y-1">
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-1.5 flex items-center gap-2">
                    <span className="text-vibrant-teal font-black text-xs">✔</span>
                    <p className="text-[9px] md:text-[10px] font-semibold text-gray-650 leading-tight">
                      {t("brochureAdv1")}
                    </p>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-1.5 flex items-center gap-2">
                    <span className="text-vibrant-teal font-black text-xs">✔</span>
                    <p className="text-[9px] md:text-[10px] font-semibold text-gray-650 leading-tight">
                      {t("brochureAdv2")}
                    </p>
                  </div>
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-1.5 flex items-center gap-2">
                    <span className="text-vibrant-teal font-black text-xs">✔</span>
                    <p className="text-[9px] md:text-[10px] font-semibold text-gray-650 leading-tight">
                      {t("brochureAdv3")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick FAQs */}
              <div className="space-y-1">
                <h3 className="font-bold text-xs md:text-sm text-vibrant-dark flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-vibrant-teal" />
                  {t("brochureFaqTitle")}
                </h3>
                <div className="space-y-1 bg-amber-50/20 border border-amber-100/50 rounded-2xl p-2 shrink-0">
                  <p className="text-[8.5px] md:text-[9.5px] font-bold text-gray-655 leading-tight">
                    <strong className="text-vibrant-dark font-black">{t("brochureFaq1Q")}</strong> {t("brochureFaq1A")}
                  </p>
                  <p className="text-[8.5px] md:text-[9.5px] font-bold text-gray-655 leading-tight mt-0.5">
                    <strong className="text-vibrant-dark font-black">{t("brochureFaq2Q")}</strong> {t("brochureFaq2A")}
                  </p>
                  <p className="text-[8.5px] md:text-[9.5px] font-bold text-gray-655 leading-tight mt-0.5">
                    <strong className="text-vibrant-dark font-black">{t("brochureFaq3Q")}</strong> {t("brochureFaq3A")}
                  </p>
                </div>
              </div>
            </div>

            {/* Hall of Fame section on Backside with 4 Success Stories and 1 line spacing */}
            <div className="my-1 border border-orange-100 bg-orange-50/10 rounded-2xl p-2 md:p-3 shrink-0">
              <h3 className="font-bold text-xs text-vibrant-dark flex items-center gap-1.5 mb-1 shrink-0">
                <Award className="w-3 h-3 md:w-3.5 md:h-3.5 text-vibrant-orange animate-bounce" />
                {t("brochureFameTitle")}
              </h3>
              <ul className="space-y-0.5 text-[9px] md:text-[10px] font-semibold text-gray-600">
                <li>🏆 {t("brochureFame1")}</li>
                <li>🏆 {t("brochureFame2")}</li>
                <li className="pt-0.5">🏆 {t("brochureFame3")}</li>
                <li className="pt-0.5">🏆 {t("brochureFame4")}</li>
              </ul>
            </div>

            {/* Bottom CTA Block */}
            <div className="bg-[#1A2E35] border border-vibrant-dark rounded-2xl p-3 text-center text-white shadow-md shrink-0">
              <h3 className="font-display font-black text-[9px] md:text-xs text-vibrant-orange tracking-wider uppercase mb-0.5">
                {t("brochureCtaTitle")}
              </h3>
              <p className="text-[8px] md:text-[9.5px] text-gray-300 font-semibold mb-1">
                {t("brochureCtaDesc")}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[9px] md:text-xs font-bold">
                <span className="flex items-center gap-1 text-vibrant-orange">
                  <Phone className="w-3 h-3 text-vibrant-orange" />
                  {t("brochureCtaWa")}
                </span>
                <span className="text-gray-500 hidden sm:inline">|</span>
                <span className="text-gray-200">{t("brochureCtaMail")}</span>
              </div>
            </div>

            {/* Micro footer */}
            <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-2.5 mt-1 shrink-0">
              <p className="text-[8.5px] md:text-[10px] font-bold text-gray-400">
                {t("brochureFooterNote")}
              </p>
              <p className="text-[9.5px] md:text-[11px] font-bold text-vibrant-orange">
                {t("brochureFlipActionFront")}
              </p>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
