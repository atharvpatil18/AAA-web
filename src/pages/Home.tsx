/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import ProgramCard from "../components/ProgramCard";
import SpeedChallengeWidget from "../components/SpeedChallengeWidget";
import TeacherProfile from "../components/TeacherProfile";
import TestimonialCarousel from "../components/TestimonialCarousel";
import LeadForm from "../components/LeadForm";
import InteractiveAbacus from "../components/InteractiveAbacus";
import VedicMathDemo from "../components/VedicMathDemo";
import MathComparisonDemo from "../components/MathComparisonDemo";
import { useLanguage } from "../lib/LanguageContext";
import MathConcernVideoBooth from "../components/MathConcernVideoBooth";
import { PROGRAMS } from "../data";
import { Sparkles, HelpCircle, MapPin, Phone, Mail, ArrowRight, Star, Heart, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";

export default function Home() {
  const { language, t } = useLanguage();
  const [showAbacus, setShowAbacus] = useState(false);
  const [showVedic, setShowVedic] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showCompareTable, setShowCompareTable] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("abacus");
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const [activeSection, setActiveSection] = useState("hero-section");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const pageSections = [
    { id: "hero-section", label: "Intro", fullLabel: "Introduction", icon: "🏠" },
    { id: "consultation-booth", label: "Consult", fullLabel: "Parent Consult", icon: "💬" },
    { id: "programs-showcase", label: "Programs", fullLabel: "Classroom Streams", icon: "🎓" },
    { id: "interactive-abacus-playground", label: "Abacus", fullLabel: "Interactive Soroban", icon: "🧮" },
    { id: "interactive-vedic-playground", label: "Vedic", fullLabel: "Vedic Math", icon: "⚡" },
    { id: "competitor-comparison", label: "Compare", fullLabel: "Franchise Switch", icon: "⚖️" },
    { id: "location-contact", label: "Wakad Map", fullLabel: "Center Location", icon: "📍" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercentage(pct);

      // Determine the active section
      const sectionElements = pageSections.map(sec => document.getElementById(sec.id));
      let currentActive = "hero-section";

      for (const el of sectionElements) {
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        // If the top of the section is at or above the upper middle viewport
        if (rect.top <= window.innerHeight * 0.4) {
          currentActive = el.id;
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMapCtaClick = () => {
    trackDemoClick("home_map_nav_cta");
  };

  const abacusBtnText = showAbacus
    ? (language === "hi" ? "एबाकस सिम्युलेटर छिपाएं" : language === "mr" ? "ॲबॅकस सिम्युलेटर लपवा" : "Hide Interactive Abacus")
    : (language === "hi" ? "इंटरएक्टिव एबाकस आज़माएं" : language === "mr" ? "इंटरएक्टिव्ह ॲबॅकस वापरून पहा" : "Try Interactive Abacus");

  const vedicBtnText = showVedic
    ? (language === "hi" ? "स्पीड मैथ सिम्युलेटर छिपाएं" : language === "mr" ? "स्पीड मॅथ सिम्युलेटर लपवा" : "Hide Speed Math Simulator")
    : (language === "hi" ? "स्पीड मैथ सिम्युलेटर आज़माएं" : language === "mr" ? "स्पीड मॅथ सिम्युलेटर वापरून पहा" : "Try Speed Math Simulator");

  const quizBtnText = showQuiz
    ? (language === "hi" ? "क्विज़ चुनौती छिपाएं" : language === "mr" ? "क्विझ आव्हान लपवा" : "Hide Quiz Challenge")
    : (language === "hi" ? "गणित क्विज़ चुनौती शुरू करें" : language === "mr" ? "गणित क्विझ आव्हान सुरू करा" : "Try Math Quiz Challenge");

  return (
    <div id="home-page-container" className="bg-[#FFFDF9] min-h-screen flex flex-row relative">
      
      {/* 20% Sidebar ScrollSpy Column */}
      <aside className="w-[20%] md:w-[22%] lg:w-[18%] bg-vibrant-dark text-white border-r-4 border-vibrant-dark sticky top-[80px] h-[calc(100vh-80px)] z-30 flex flex-col justify-start py-8 px-2 md:px-4 select-none overflow-y-auto shrink-0 shadow-md">
        {/* Title progress section */}
        <div className="hidden md:block mb-8 text-center shrink-0">
          <h4 className="font-display font-black text-xs text-vibrant-orange uppercase tracking-wider">Arnav Progress</h4>
          <div className="w-12 h-0.5 bg-vibrant-orange mx-auto mt-1 rounded-full" />
        </div>

        {/* Dynamic scroll progress list */}
        <div className="relative flex-1 flex flex-col justify-between py-6 pl-1 md:pl-2 min-h-[350px]">
          {/* Vertical progress bar line */}
          <div className="absolute left-[12px] md:left-[16px] top-[10px] bottom-[10px] w-[3px] bg-[#233C45] rounded-full z-0">
            <div 
              className="w-full bg-vibrant-orange rounded-full transition-all duration-100" 
              style={{ height: `${scrollPercentage}%` }}
            />
          </div>

          {/* Section rows */}
          {pageSections.map((sec, idx) => {
            const isActive = activeSection === sec.id;
            const isScrolledPast = pageSections.findIndex(s => s.id === activeSection) >= idx;

            return (
              <button
                key={sec.id}
                onClick={() => {
                  const target = document.getElementById(sec.id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="flex items-center gap-2 md:gap-3 text-left focus:outline-none group relative z-10 w-full cursor-pointer py-1.5"
              >
                {/* Dot */}
                <div 
                  className={`w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 transition-all duration-300 flex items-center justify-center shrink-0 ${
                    isActive 
                      ? "bg-vibrant-orange border-vibrant-orange scale-110 shadow-[0_0_8px_rgba(242,106,51,0.6)]" 
                      : isScrolledPast
                      ? "bg-[#233C45] border-vibrant-orange"
                      : "bg-[#102227] border-[#233C45]"
                  }`}
                >
                  {isActive && <div className="w-1 h-1 bg-white rounded-full" />}
                </div>

                {/* Section Labels */}
                <div className="flex flex-col min-w-0">
                  {/* Mobile (up to 20%) Short Label / icon */}
                  <span className={`block md:hidden text-[8px] sm:text-[9px] font-black uppercase tracking-tighter truncate leading-none ${
                    isActive ? "text-vibrant-orange" : "text-gray-400 opacity-60"
                  }`}>
                    {sec.icon} {sec.label}
                  </span>

                  {/* Desktop Label */}
                  <span className={`hidden md:block text-[11px] font-black uppercase tracking-wider truncate leading-tight ${
                    isActive ? "text-vibrant-orange" : "text-gray-400 opacity-60 hover:text-white"
                  }`}>
                    {sec.fullLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Progress reading percentage block */}
        <div className="hidden lg:block pt-6 border-t border-[#233C45] text-center shrink-0">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block">Scrolled</span>
          <span className="font-mono text-xs font-black text-vibrant-teal">{Math.round(scrollPercentage)}%</span>
        </div>
      </aside>

      {/* 80% Main Content Area */}
      <main className="w-[80%] md:w-[78%] lg:w-[82%] min-h-screen flex-grow overflow-x-hidden">
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Trust Counters Bar */}
      <div className="px-4 md:px-8">
        <TrustBar />
      </div>


      {/* 2.2. Interactive Parent Consultation Booth */}
      <MathConcernVideoBooth />

      {/* 3. Core Programs Showcase */}
      <section id="programs-showcase" className="py-20 md:py-28 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("progBadge")}
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-vibrant-dark leading-tight">
            {t("progTitle")}
          </h2>
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-semibold">
            {t("progSubtitle")}
          </p>
        </div>

        {/* Tab Selection Headings */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3 md:gap-6 mb-10 pb-6 max-w-4xl mx-auto border-b border-slate-200">
          {PROGRAMS.map((prog) => {
            const prefix = prog.id === "abacus" ? "Abacus" : prog.id === "vedic-math" ? "Vedic" : "School";
            const progTitle = t(`prog${prefix}Title` as any) || prog.title;
            const isSelected = selectedProgram === prog.id;

            return (
              <button
                key={prog.id}
                onClick={() => setSelectedProgram(prog.id)}
                className={`flex-1 py-3 px-4 rounded-2xl text-xs md:text-sm font-black uppercase tracking-wider transition-all duration-200 cursor-pointer border-2 shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none text-center ${
                  isSelected
                    ? "bg-vibrant-orange text-white border-vibrant-dark"
                    : "bg-white text-vibrant-dark hover:bg-vibrant-cream border-vibrant-dark/20"
                }`}
              >
                {progTitle}
              </button>
            );
          })}
        </div>

        {/* Selected Program Card Display */}
        <div className="max-w-md md:max-w-2xl lg:max-w-3xl mx-auto transition-all duration-300">
          {PROGRAMS.map((prog) => {
            if (prog.id !== selectedProgram) return null;
            return (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <ProgramCard program={prog} />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 2.5. Interactive Abacus Playground */}
      <section id="interactive-abacus-playground" className="py-16 md:py-24 bg-gradient-to-b from-[#FFFDF9] to-[#FFFBF5] border-t-2 border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-6">
            <span className="text-[10px] font-black text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              {t("abacusBadge")}
            </span>
            <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
              {t("abacusTitle")}
            </h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-semibold">
              {t("abacusSubtitle")}
            </p>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setShowAbacus(!showAbacus)}
            className="flex items-center gap-2 bg-vibrant-teal text-white border-2 border-vibrant-dark font-black px-6 py-3 rounded-2xl shadow-[4px_4px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:bg-vibrant-teal/95 transition-all text-xs md:text-sm uppercase tracking-wider mb-8 cursor-pointer"
          >
            {abacusBtnText}
            {showAbacus ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showAbacus && (
            <div className="w-full transition-all duration-300">
              <InteractiveAbacus />
            </div>
          )}
        </div>
      </section>

      {/* 2.6. Interactive Vedic Math Playground */}
      <section id="interactive-vedic-playground" className="py-16 md:py-20 bg-white border-t-2 border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6 flex flex-col items-center">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              {t("homeVedicBadge")}
            </span>
            <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
              {t("homeVedicTitle")}
            </h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-semibold">
              {t("homeVedicSubtitle")}
            </p>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setShowVedic(!showVedic)}
            className="flex items-center gap-2 bg-vibrant-orange text-white border-2 border-vibrant-dark font-black px-6 py-3 rounded-2xl shadow-[4px_4px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:bg-vibrant-orange/95 transition-all text-xs md:text-sm uppercase tracking-wider mb-8 cursor-pointer"
          >
            {vedicBtnText}
            {showVedic ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showVedic && (
            <div className="w-full transition-all duration-300">
              <VedicMathDemo />
            </div>
          )}
        </div>
      </section>

      {/* 3.5. Interactive Math Synergy System (Comparison) */}
      <section id="math-synergy-comparison" className="py-20 md:py-24 bg-gradient-to-b from-[#FFFDF9] to-[#FFFBF5] border-t-4 border-vibrant-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <MathComparisonDemo />
        </div>
      </section>

      {/* 3.8. Competitor Differentiation Comparison Grid */}
      <section id="competitor-comparison" className="py-20 md:py-24 bg-white border-t-4 border-vibrant-dark">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-8">
            <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              {t("diffAAA")}
            </span>
            <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
              {t("diffTitle")}
            </h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-semibold">
              {t("diffSubtitle")}
            </p>
          </div>

          {/* Toggle Button to collapse the entire comparison content */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowCompareTable(!showCompareTable)}
              className="flex items-center gap-2 bg-vibrant-orange text-white border-2 border-vibrant-dark font-black px-6 py-3 rounded-2xl shadow-[4px_4px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:bg-vibrant-orange/95 transition-all text-xs md:text-sm uppercase tracking-wider cursor-pointer"
            >
              {showCompareTable
                ? (language === "hi" ? "तुलना विवरण छिपाएं" : language === "mr" ? "तुलना तपशील लपवा" : "Hide Comparison Grid")
                : (language === "hi" ? "तुलना विवरण देखें" : language === "mr" ? "तुलना तपशील पहा" : "Compare AAA vs Franchises")
              }
              {showCompareTable ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {showCompareTable && (
            <>
              {/* DESKTOP TABLE VIEW (hidden on mobile, blocks on md+) */}
              <div className="hidden md:block overflow-x-auto rounded-[32px] border-4 border-vibrant-dark shadow-[8px_8px_0_0_#1A2E35]">
                <table className="w-full text-left border-collapse bg-white">
                  <thead>
                    <tr className="bg-vibrant-cream border-b-4 border-vibrant-dark font-black text-xs md:text-sm text-vibrant-dark uppercase tracking-wider">
                      <th className="p-4 md:p-6 border-r-4 border-vibrant-dark w-1/4">{t("diffFeature")}</th>
                      <th className="p-4 md:p-6 border-r-4 border-vibrant-dark bg-vibrant-teal/10 text-vibrant-teal w-3/8">{t("diffAAA")}</th>
                      <th className="p-4 md:p-6 text-gray-550 w-3/8">{t("diffOthers")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-4 divide-vibrant-dark font-bold text-xs md:text-sm text-vibrant-dark">
                    {/* Row 1 */}
                    <tr 
                      onClick={() => setExpandedRows(prev => ({ ...prev, row1: !prev.row1 }))}
                      className="cursor-pointer hover:bg-slate-50/50 transition-colors divide-x-4 divide-vibrant-dark"
                    >
                      <td className="p-4 md:p-6 bg-slate-50 font-black flex items-center justify-between gap-2">
                        <span>{t("diffRow1Name")}</span>
                        {expandedRows.row1 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </td>
                      <td className="p-4 md:p-6 bg-vibrant-teal/5 text-vibrant-teal">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-500 text-base font-black">✓</span>
                          <span>{t("diffRow1AAA")}</span>
                        </div>
                        {expandedRows.row1 && (
                          <p className="mt-3 text-xs text-vibrant-teal/80 font-semibold leading-relaxed border-t border-vibrant-teal/15 pt-2">
                            {t("diffRow1Desc")}
                          </p>
                        )}
                      </td>
                      <td className="p-4 md:p-6 text-gray-400">
                        <div className="flex items-center gap-2">
                          <span className="text-rose-500 text-base font-black">✗</span>
                          <span>{t("diffRow1Others")}</span>
                        </div>
                      </td>
                    </tr>

                    {/* Row 2 */}
                    <tr 
                      onClick={() => setExpandedRows(prev => ({ ...prev, row2: !prev.row2 }))}
                      className="cursor-pointer hover:bg-slate-50/50 transition-colors divide-x-4 divide-vibrant-dark"
                    >
                      <td className="p-4 md:p-6 bg-slate-50 font-black flex items-center justify-between gap-2">
                        <span>{t("diffRow2Name")}</span>
                        {expandedRows.row2 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </td>
                      <td className="p-4 md:p-6 bg-vibrant-teal/5 text-vibrant-teal">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-500 text-base font-black">✓</span>
                          <span>{t("diffRow2AAA")}</span>
                        </div>
                        {expandedRows.row2 && (
                          <p className="mt-3 text-xs text-vibrant-teal/80 font-semibold leading-relaxed border-t border-vibrant-teal/15 pt-2">
                            {t("diffRow2Desc")}
                          </p>
                        )}
                      </td>
                      <td className="p-4 md:p-6 text-gray-400">
                        <div className="flex items-center gap-2">
                          <span className="text-rose-500 text-base font-black">✗</span>
                          <span>{t("diffRow2Others")}</span>
                        </div>
                      </td>
                    </tr>

                    {/* Row 3 */}
                    <tr 
                      onClick={() => setExpandedRows(prev => ({ ...prev, row3: !prev.row3 }))}
                      className="cursor-pointer hover:bg-slate-50/50 transition-colors divide-x-4 divide-vibrant-dark"
                    >
                      <td className="p-4 md:p-6 bg-slate-50 font-black flex items-center justify-between gap-2">
                        <span>{t("diffRow3Name")}</span>
                        {expandedRows.row3 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </td>
                      <td className="p-4 md:p-6 bg-vibrant-teal/5 text-vibrant-teal">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-500 text-base font-black">✓</span>
                          <span>{t("diffRow3AAA")}</span>
                        </div>
                        {expandedRows.row3 && (
                          <p className="mt-3 text-xs text-vibrant-teal/80 font-semibold leading-relaxed border-t border-vibrant-teal/15 pt-2">
                            {t("diffRow3Desc")}
                          </p>
                        )}
                      </td>
                      <td className="p-4 md:p-6 text-gray-400">
                        <div className="flex items-center gap-2">
                          <span className="text-rose-500 text-base font-black">✗</span>
                          <span>{t("diffRow3Others")}</span>
                        </div>
                      </td>
                    </tr>

                    {/* Row 4 */}
                    <tr 
                      onClick={() => setExpandedRows(prev => ({ ...prev, row4: !prev.row4 }))}
                      className="cursor-pointer hover:bg-slate-50/50 transition-colors divide-x-4 divide-vibrant-dark"
                    >
                      <td className="p-4 md:p-6 bg-slate-50 font-black flex items-center justify-between gap-2">
                        <span>{t("diffRow4Name")}</span>
                        {expandedRows.row4 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </td>
                      <td className="p-4 md:p-6 bg-vibrant-teal/5 text-vibrant-teal">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-500 text-base font-black">✓</span>
                          <span>{t("diffRow4AAA")}</span>
                        </div>
                        {expandedRows.row4 && (
                          <p className="mt-3 text-xs text-vibrant-teal/80 font-semibold leading-relaxed border-t border-vibrant-teal/15 pt-2">
                            {t("diffRow4Desc")}
                          </p>
                        )}
                      </td>
                      <td className="p-4 md:p-6 text-gray-400">
                        <div className="flex items-center gap-2">
                          <span className="text-rose-500 text-base font-black">✗</span>
                          <span>{t("diffRow4Others")}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* MOBILE STACKED CARD VIEW (visible on mobile, hidden on md+) */}
              <div className="block md:hidden space-y-6">
                {[
                  { key: "row1", name: t("diffRow1Name"), aaa: t("diffRow1AAA"), others: t("diffRow1Others"), desc: t("diffRow1Desc") },
                  { key: "row2", name: t("diffRow2Name"), aaa: t("diffRow2AAA"), others: t("diffRow2Others"), desc: t("diffRow2Desc") },
                  { key: "row3", name: t("diffRow3Name"), aaa: t("diffRow3AAA"), others: t("diffRow3Others"), desc: t("diffRow3Desc") },
                  { key: "row4", name: t("diffRow4Name"), aaa: t("diffRow4AAA"), others: t("diffRow4Others"), desc: t("diffRow4Desc") }
                ].map((row) => {
                  const isRowExpanded = !!expandedRows[row.key];
                  return (
                    <div 
                      key={row.key} 
                      onClick={() => setExpandedRows(prev => ({ ...prev, [row.key]: !prev[row.key] }))}
                      className="bg-white border-4 border-vibrant-dark rounded-2xl p-5 shadow-[4px_4px_0_0_#1A2E35] space-y-3 cursor-pointer"
                    >
                      <div className="flex justify-between items-center border-b-2 border-slate-100 pb-2">
                        <span className="font-display font-black text-sm text-vibrant-dark">{row.name}</span>
                        {isRowExpanded ? <ChevronUp className="w-4 h-4 text-vibrant-orange" /> : <ChevronDown className="w-4 h-4 text-vibrant-orange" />}
                      </div>

                      {/* AAA Card Part */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-vibrant-teal bg-vibrant-teal/10 px-2 py-0.5 rounded uppercase tracking-wider block w-fit">
                          {t("diffAAA")}
                        </span>
                        <div className="flex items-start gap-1.5 text-xs text-vibrant-dark font-black">
                          <span className="text-emerald-500 font-bold shrink-0">✓</span>
                          <span>{row.aaa}</span>
                        </div>
                      </div>

                      {/* Others Card Part */}
                      <div className="space-y-1">
                        <span className="text-[9px] font-black text-gray-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider block w-fit">
                          {t("diffOthers")}
                        </span>
                        <div className="flex items-start gap-1.5 text-xs text-gray-400 font-semibold">
                          <span className="text-rose-500 font-bold shrink-0">✗</span>
                          <span>{row.others}</span>
                        </div>
                      </div>

                      {/* Expandable Details */}
                      {isRowExpanded && (
                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-[11px] md:text-xs text-gray-600 font-medium leading-relaxed mt-2">
                          {row.desc}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 4. Gamified Quiz & Lead Form CTA Segment (Split columns) */}
      <section 
        id="speed-challenge-widget-section" 
        className="py-16 md:py-24 bg-vibrant-cream border-y-4 border-vibrant-dark relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:items-start">
            
            {/* Left Hand: Interactive Widget */}
            <div className="lg:col-span-6 space-y-6 flex flex-col items-start">
              <div className="space-y-3 w-full">
                <div className="inline-flex items-center gap-1.5 text-[10px] text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider font-bold">
                  <Star className="w-3.5 h-3.5 fill-current text-vibrant-orange animate-spin-slow" /> {t("quizBadge")}
                </div>
                <h2 className="font-display font-black text-3xl sm:text-4xl text-vibrant-dark tracking-tight leading-tight">
                  {t("quizTitle")}
                </h2>
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-semibold">
                  {t("quizSubtitle")}
                </p>
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => setShowQuiz(!showQuiz)}
                className="flex items-center gap-2 bg-vibrant-orange text-white border-2 border-vibrant-dark font-black px-6 py-3 rounded-2xl shadow-[4px_4px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:bg-vibrant-orange/95 transition-all text-xs md:text-sm uppercase tracking-wider cursor-pointer mt-2"
              >
                {quizBtnText}
                {showQuiz ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Game Element */}
              {showQuiz && (
                <div className="w-full transition-all duration-300">
                  <SpeedChallengeWidget />
                </div>
              )}
            </div>

            {/* Right Hand: Lead Generation Form */}
            <div className="lg:col-span-6">
              <LeadForm sourceCampaign="Home Page Split Form" />
            </div>

          </div>
        </div>
      </section>

      {/* 5. Mentor Overview section */}
      <section id="mentor-overview" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              {t("mentorBadge")}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-vibrant-dark leading-tight">
              {t("mentorTitle")}
            </h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-semibold">
              {t("mentorSubtitle")}
            </p>
          </div>

          <TeacherProfile />
        </div>
      </section>

      {/* 6. Testimonials Row carousel */}
      <section id="parent-testimonials" className="py-20 md:py-28 bg-[#FFFDF9] border-t-4 border-vibrant-dark relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="text-[10px] font-black text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              {t("testimonialsBadge")}
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-vibrant-dark leading-tight">
              {t("testimonialsTitle")}
            </h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-semibold">
              {t("testimonialsSubtitle")}
            </p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* 7. Wakad Center Address & Google Map Contact Block */}
      <section id="location-contact" className="py-20 md:py-28 bg-white border-t-4 border-vibrant-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Column Left: Map Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                {t("locationBadge")}
              </span>
              <h2 className="font-display font-black text-3.5xl text-vibrant-dark tracking-tight leading-tight">
                {t("locationTitle")}
              </h2>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-semibold">
                {t("locationSubtitle")}
              </p>

              {/* Safe Drop-off & Parking Tips */}
              <div className="bg-teal-50 border border-dashed border-vibrant-teal/30 text-vibrant-teal text-xs font-bold p-3.5 rounded-2xl flex items-center gap-2">
                <span>{t("locationParkingTips")}</span>
              </div>

              <div className="space-y-4 text-xs md:text-sm text-gray-700">
                <div className="flex items-start gap-3 bg-vibrant-cream p-5 rounded-2xl border-2 border-vibrant-dark">
                  <MapPin className="w-5 h-5 text-vibrant-orange shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-vibrant-dark font-black mb-1">{t("homeCenterAddress")}</strong>
                    <span className="text-xs text-gray-600 font-medium leading-relaxed block">
                      {t("footerAddress")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-vibrant-cream p-4.5 py-3.5 rounded-2xl border-2 border-vibrant-dark">
                  <Phone className="w-5 h-5 text-vibrant-teal shrink-0" />
                  <div>
                    <span className="text-xs text-gray-400 font-bold block">{t("homeCallSupport")}</span>
                    <a href="tel:+919021924968" onClick={handleMapCtaClick} className="font-black text-vibrant-dark hover:text-vibrant-orange block text-sm">
                      +91 90219 24968
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-vibrant-cream p-4.5 py-3.5 rounded-2xl border-2 border-vibrant-dark">
                  <Mail className="w-5 h-5 text-vibrant-orange shrink-0" />
                  <div>
                    <span className="text-xs text-gray-400 font-bold block">{t("homeEmailInquiries")}</span>
                    <a href="mailto:nehaatharv@gmail.com" className="font-black text-vibrant-dark hover:text-vibrant-orange block text-sm">
                      nehaatharv@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=18.5936735,73.7656606"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-vibrant-orange hover:text-vibrant-orange/95 uppercase tracking-widest bg-vibrant-cream border-2 border-vibrant-dark px-4 py-2 rounded-xl text-center shadow-[0_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none transition-all"
                >
                  {t("homeViewDirections")} <ArrowRight className="w-4 h-4 text-vibrant-orange" />
                </a>
              </div>
            </div>

            {/* Column Right: Map Iframe wrapper */}
            <div className="lg:col-span-7 h-[350px] md:h-[450px] bg-white rounded-[32px] border-4 border-vibrant-dark overflow-hidden shadow-[6px_6px_0_0_#1A2E35] md:shadow-[12px_12px_0_0_#1A2E35] relative group">
              <iframe 
                src="https://maps.google.com/maps?q=18.5936735,73.7656606&z=17&output=embed" 
                className="w-full h-full border-0" 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Arnav Abacus Academy Center Location"
              />
              <div className="absolute bottom-4 left-4 bg-vibrant-dark text-white text-[10px] font-black px-3.5 py-1.5 rounded-full backdrop-blur-sm tracking-widest uppercase shadow-md border border-slate-700/50">
                {t("homeOppCreativeCameo")}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. Call to Action Lead Form Section */}
      <section className="py-20 md:py-28 bg-[#FF6321] text-white border-t-4 border-vibrant-dark relative">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            {t("heroBadge").replace("⚡", "").trim()}
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight text-white">
            {t("ctaTitle")}
          </h2>
          <p className="text-[#FFF2E0] text-xs md:text-sm max-w-2xl mx-auto leading-relaxed font-bold">
            {t("ctaSubtitle")}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/919021924968"
              onClick={() => trackDemoClick("home_bottom_cta_wa")}
              className="w-full sm:w-auto bg-vibrant-gold text-vibrant-dark border-2 border-vibrant-dark font-black px-8 py-5 rounded-2xl shadow-[0_6px_0_0_#1A2E35] active:translate-y-1 active:shadow-none hover:scale-[1.01] transition-all text-center"
            >
              {t("homeBookTrialWhatsapp")}
            </a>
            <Link
              to="/programs"
              className="text-xs uppercase font-black text-white tracking-widest hover:underline flex items-center gap-1"
            >
              {t("homeExamineCourses")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}
