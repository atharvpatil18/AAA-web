/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Phone, ArrowRight, Smartphone, Compass, Sparkles, BookOpen, Star, ChevronDown, ChevronUp, Mail, MessageSquare, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: "app" | "competition" | "batch" | "general";
  tag: string;
  summary: string;
  details: string[];
  colorTheme: "teal" | "orange" | "gold";
  imageUrl?: string;
}

export default function NewsEvents() {
  const { t } = useLanguage();
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({});
  const [showResultsModal, setShowResultsModal] = useState(false);

  const toggleEvent = (id: string) => {
    setExpandedEvents(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCtaClick = () => {
    trackDemoClick("news_page_bottom_cta");
  };

  const newsData: NewsItem[] = [
    {
      id: "news-1",
      title: t("news1Title"),
      date: t("news1Date"),
      category: "app",
      tag: t("news1Tag"),
      summary: t("news1Summary"),
      details: [
        t("news1Detail1"),
        t("news1Detail2"),
        t("news1Detail3"),
        t("news1Detail4")
      ],
      colorTheme: "teal",
    },
    {
      id: "news-2",
      title: t("news2Title"),
      date: t("news2Date"),
      category: "competition",
      tag: t("news2Tag"),
      summary: t("news2Summary"),
      details: [
        t("news2Detail1"),
        t("news2Detail2"),
        t("news2Detail3"),
        t("news2Detail4")
      ],
      colorTheme: "gold",
    },
    {
      id: "news-3",
      title: t("news3Title"),
      date: t("news3Date"),
      category: "batch",
      tag: t("news3Tag"),
      summary: t("news3Summary"),
      details: [
        t("news3Detail1"),
        t("news3Detail2"),
        t("news3Detail3"),
        t("news3Detail4")
      ],
      colorTheme: "orange",
    },
    {
      id: "news-4",
      title: t("news4Title"),
      date: t("news4Date"),
      category: "competition",
      tag: t("news4Tag"),
      summary: t("news4Summary"),
      details: [
        t("news4Detail1"),
        t("news4Detail2"),
        t("news4Detail3"),
        t("news4Detail4")
      ],
      colorTheme: "gold"
    }
  ];

  return (
    <div id="news-page-container" className="bg-[#FFFDF9] min-h-screen">
      
      {/* 1. Page Header */}
      <section className="bg-vibrant-dark text-white py-16 md:py-24 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-vibrant-teal/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-4 relative z-10">
          <span className="text-[10px] font-black text-vibrant-gold bg-[#FFF5CC]/15 border border-vibrant-gold/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("newsPageBadge")}
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl tracking-tight leading-tight">
            {t("newsPageTitle")}
          </h1>
          <p className="text-[#A2C4C9] text-xs md:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
            {t("newsPageSubtitle")}
          </p>
        </div>
      </section>

      {/* 2. App Rollout Highlight Feature Card (Full Width) */}
      <section className="py-16 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-[#FFFDF9] border-4 border-vibrant-dark rounded-[32px] overflow-hidden shadow-[6px_6px_0_0_#1A2E35] md:shadow-[12px_12px_0_0_#1A2E35] grid grid-cols-1 lg:grid-cols-12">
          {/* Left panel */}
          <div className="p-8 md:p-12 lg:col-span-7 space-y-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 text-[10px] text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider font-bold w-fit">
              <Smartphone className="w-3.5 h-3.5" /> {t("newsAppComingSoon")}
            </div>
            <h2 className="font-display font-black text-3xl md:text-4xl text-vibrant-dark tracking-tight leading-tight">
              {t("newsAppTitle")}
            </h2>
            <p className="text-gray-500 text-xs md:text-sm leading-relaxed font-semibold">
              {t("newsAppDesc")}
            </p>

            {/* Checklist of app features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-vibrant-dark font-black pt-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-vibrant-teal/10 flex items-center justify-center border border-vibrant-teal/20">✓</div>
                <span>{t("newsAppFeat1")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-vibrant-teal/10 flex items-center justify-center border border-vibrant-teal/20">✓</div>
                <span>{t("newsAppFeat2")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-vibrant-teal/10 flex items-center justify-center border border-vibrant-teal/20">✓</div>
                <span>{t("newsAppFeat3")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-vibrant-teal/10 flex items-center justify-center border border-vibrant-teal/20">✓</div>
                <span>{t("newsAppFeat4")}</span>
              </div>
            </div>

            {/* Registration Options Box as per Academy Records */}
            <div className="mt-4 p-5 bg-[#FFF9E6] border-2 border-vibrant-dark rounded-2xl space-y-3">
              <div className="font-black text-xs md:text-sm text-vibrant-dark flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-vibrant-orange" />
                {t("newsAppRegisterTitle")}
              </div>
              <p className="text-[11px] md:text-xs text-gray-600 font-medium leading-relaxed">
                {t("newsAppRegisterSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={`https://wa.me/919021924968?text=${encodeURIComponent("Hello Arnav Abacus Academy, I would like to register my student details via WhatsApp contact as per academy records for early app & portal access.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-black text-xs px-4 py-2.5 rounded-xl border-2 border-vibrant-dark shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:opacity-95 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  {t("registerViaWhatsApp")}
                </a>
                <a
                  href={`mailto:nehaatharv@gmail.com?subject=${encodeURIComponent("Student Registration Request - Arnav Abacus Academy Records")}&body=${encodeURIComponent("Hello Arnav Abacus Academy team,\n\nI would like to register my email address in your official student database for app and student portal access.\n\nStudent Name:\nParent Contact / Email (as per academy records):\nLevel:")}`}
                  className="inline-flex items-center justify-center gap-2 bg-vibrant-teal text-vibrant-dark font-black text-xs px-4 py-2.5 rounded-xl border-2 border-vibrant-dark shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:opacity-95 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  {t("registerViaEmail")}
                </a>
              </div>
              <div className="text-[10px] text-gray-500 font-bold italic pt-1">
                {t("recordsNote")}
              </div>
            </div>

            <div className="pt-2 text-[10px] text-gray-400 font-bold">
              {t("newsAppNote")}
            </div>
          </div>

          {/* Right panel: Graphic representation of App Mockup */}
          <div className="bg-vibrant-cream lg:col-span-5 border-t-4 lg:border-t-0 lg:border-l-4 border-vibrant-dark flex items-center justify-center p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#1A2E35_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Brutalist Phone frame mockup */}
            <div className="w-64 h-96 bg-vibrant-dark border-4 border-vibrant-dark rounded-[24px] shadow-[6px_6px_0_0_#1A2E35] overflow-hidden flex flex-col justify-between relative z-10">
              {/* Phone speaker notch */}
              <div className="w-24 h-4 bg-vibrant-dark rounded-full mx-auto my-2 shrink-0 z-20"></div>
              
              {/* App screen mockup content */}
              <div className="flex-grow w-full h-full relative overflow-hidden bg-white">
                <img 
                  src="/student_app_ui.png" 
                  alt="Arnav Abacus Student Practice App Interface" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. News / Events List */}
      <section className="py-8 pb-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("newsBoardBadge")}
          </span>
          <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
            {t("newsBoardTitle")}
          </h2>
          <p className="text-gray-550 text-xs md:text-sm font-semibold">
            {t("newsBoardSubtitle")}
          </p>
        </div>

        {/* News stack */}
        <div className="space-y-12">
          {newsData.map((item) => {
            const isTeal = item.colorTheme === "teal";
            const isOrange = item.colorTheme === "orange";
            const isGold = item.colorTheme === "gold";

            const badgeBg = isTeal ? "bg-[#E0FAF5] text-vibrant-teal" : isOrange ? "bg-[#FFF0E0] text-vibrant-orange" : "bg-[#FFF5CC] text-amber-700";
            const borderCol = "border-vibrant-dark";
            const shadowCol = "#1A2E35";
            const accentBg = isTeal ? "bg-vibrant-teal" : isOrange ? "bg-vibrant-orange" : "bg-vibrant-gold";

            const isExpanded = !!expandedEvents[item.id];

            return (
              <div 
                key={item.id}
                className={`bg-[#FFFDF9] border-4 ${borderCol} rounded-[32px] overflow-hidden shadow-[8px_8px_0_0_${shadowCol}] p-6 md:p-8 lg:p-10 flex flex-col md:flex-row gap-6 md:gap-10 hover:scale-[1.005] transition-transform`}
              >
                {/* Date marker block */}
                <div className="md:w-56 shrink-0 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-black text-vibrant-orange">
                    <Calendar className="w-4 h-4" /> {item.date}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-vibrant-dark/15 shadow-sm inline-block ${badgeBg}`}>
                    {item.tag}
                  </span>
                </div>

                {/* News contents */}
                <div className="flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-display font-black text-xl md:text-2xl text-vibrant-dark tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-semibold">
                      {item.summary}
                    </p>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 flex flex-col lg:flex-row gap-6 border-t border-dashed border-vibrant-dark/15 mt-4">
                            {/* Bullet specifics */}
                            <div className="flex-grow space-y-2.5">
                              <ul className="space-y-2.5">
                                {item.details.map((detail, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-xs text-vibrant-dark font-black">
                                    <span className={`w-1.5 h-1.5 rounded-full ${accentBg} shrink-0 mt-1.5`}></span>
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Optional Image block */}
                            {item.imageUrl && (
                              <div className="lg:w-80 shrink-0 aspect-[16/9] lg:aspect-auto lg:h-52 border-4 border-vibrant-dark rounded-[24px] overflow-hidden bg-white shadow-[4px_4px_0_0_#1A2E35] flex items-center justify-center">
                                <img 
                                  src={item.imageUrl} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                />
                              </div>
                            )}
                          </div>

                          {/* Registration Box for news-4 */}
                          {item.id === "news-4" && (
                            <div className="mt-4 p-4 bg-[#FFF9E6] border-2 border-vibrant-dark rounded-2xl space-y-2.5">
                              <div className="font-black text-xs md:text-sm text-vibrant-dark flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-vibrant-orange" />
                                Register for Mental Math Power Sessions (Oct 10-11, 2026)
                              </div>
                              <p className="text-[11px] md:text-xs text-gray-600 font-medium">
                                Option to register through WhatsApp contact (+91 9021924968) or Email (nehaatharv@gmail.com) as per Arnav Abacus Academy records:
                              </p>
                              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                                <a
                                  href={`https://wa.me/919021924968?text=${encodeURIComponent("Hello Arnav Abacus Academy, I would like to register my child for the Mental Math Power Sessions & Excellence Challenge (Oct 10-11, 2026).")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-black text-xs px-4 py-2.5 rounded-xl border-2 border-vibrant-dark shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:opacity-95 transition-all"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                  {t("registerViaWhatsApp")}
                                </a>
                                <a
                                  href={`mailto:nehaatharv@gmail.com?subject=${encodeURIComponent("Mental Math Power Sessions Registration - Oct 2026")}&body=${encodeURIComponent("Hello Arnav Abacus Academy team,\n\nI would like to register my child for the Mental Math Power Sessions & Excellence Challenge on October 10-11, 2026.\n\nStudent Name:\nParent Contact / Email (as per academy records):\nGrade/Level:")}`}
                                  className="inline-flex items-center justify-center gap-2 bg-vibrant-teal text-vibrant-dark font-black text-xs px-4 py-2.5 rounded-xl border-2 border-vibrant-dark shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:opacity-95 transition-all"
                                >
                                  <Mail className="w-4 h-4" />
                                  {t("registerViaEmail")}
                                </a>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => toggleEvent(item.id)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-vibrant-dark transition-all duration-150 shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none ${
                        isExpanded
                          ? "bg-vibrant-orange text-white shadow-none translate-y-0.5"
                          : "bg-white text-vibrant-dark hover:bg-vibrant-cream"
                      }`}
                    >
                      <span>{isExpanded ? t("newsHideDetails") : t("newsViewDetails")}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {item.id === "news-2" && (
                      <button
                        onClick={() => setShowResultsModal(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-vibrant-gold text-vibrant-dark border-2 border-vibrant-dark shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:bg-amber-400 transition-all"
                      >
                        <Trophy className="w-4 h-4 text-vibrant-dark fill-vibrant-dark" />
                        <span>{t("news2ResultsBtn")}</span>
                      </button>
                    )}

                    {item.id === "news-4" && (
                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={`https://wa.me/919021924968?text=${encodeURIComponent("Hello Arnav Abacus Academy, I would like to register for the Mental Math Power Sessions (Oct 10-11, 2026).")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-[#25D366] text-white border-2 border-vibrant-dark shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:opacity-90 transition-all"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                        <a
                          href={`mailto:nehaatharv@gmail.com?subject=${encodeURIComponent("Mental Math Power Sessions Registration - Oct 2026")}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider bg-vibrant-teal text-vibrant-dark border-2 border-vibrant-dark shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:opacity-90 transition-all"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Results Showcase Modal for IIVA Competition & Felicitation */}
      <AnimatePresence>
        {showResultsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => setShowResultsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FFFDF9] border-4 border-vibrant-dark rounded-[32px] shadow-[12px_12px_0_0_#1A2E35] max-w-4xl w-full p-5 md:p-8 overflow-hidden relative space-y-6 max-h-[92vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 border-b-2 border-dashed border-vibrant-dark/20 pb-4">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-black text-vibrant-gold bg-slate-900 border border-vibrant-gold/30 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                      🏆 8 GOLDS • 1 ACADEMY • INFINITE PRIDE
                    </span>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                      🇮🇳 15TH AUG 2026 FELICITATION CEREMONY
                    </span>
                  </div>
                  <h2 className="font-display font-black text-2xl md:text-3xl text-vibrant-dark">
                    Celebrating 8 Golden Champions!
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 font-bold leading-relaxed">
                    IIVA State Level Abacus & Vedic Math Competition 2026 • Felicitation held on 15th Aug 2026 at Arnav Abacus Academy Wakad, Pune by Founder & Director Neha Patil.
                  </p>
                </div>
                <button
                  onClick={() => setShowResultsModal(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border-2 border-vibrant-dark text-vibrant-dark font-black text-xs transition-colors shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Main Content Grid: Left Poster & Right Champion Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column: Poster Image */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-3">
                  <div className="w-full border-4 border-vibrant-dark rounded-2xl overflow-hidden bg-white shadow-[6px_6px_0_0_#1A2E35]">
                    <img 
                      src="/iiva_state_champions_2026.jpg" 
                      alt="Celebrating 8 Golden Champions - Arnav Abacus Academy"
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-[11px] text-center font-black text-vibrant-dark bg-[#FFF5CC] border-2 border-vibrant-dark px-3 py-1.5 rounded-xl w-full">
                    🎖️ Gold Medals Awarded by Founder & Director Neha Patil
                  </div>
                </div>

                {/* Right Column: Detailed Breakdown of Champions & Cash Awards */}
                <div className="lg:col-span-7 space-y-4">
                  
                  {/* SPOTLIGHT CHAMPION: ARNAV PATIL */}
                  <div className="p-4 bg-gradient-to-br from-[#FFF9E6] to-[#FFE6B3] border-3 border-vibrant-dark rounded-2xl space-y-3 shadow-[4px_4px_0_0_#1A2E35] relative overflow-hidden">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-[10px] font-black text-slate-900 bg-vibrant-gold px-2.5 py-1 rounded-full uppercase tracking-wider border border-vibrant-dark">
                        👑 1ST RANK DOUBLE STATE CHAMPION
                      </span>
                      <span className="text-[10px] font-black text-emerald-900 bg-emerald-300 px-2.5 py-1 rounded-full uppercase tracking-wider border border-vibrant-dark">
                        🚀 DIRECT ENTRY TO DEC'26 NATIONALS
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display font-black text-xl md:text-2xl text-vibrant-dark">
                        ARNAV PATIL
                      </h3>
                      <p className="text-xs font-black text-vibrant-orange mt-0.5">
                        State 1st Rank in Abacus & 1st Rank in Vedic Mathematics!
                      </p>
                    </div>

                    <div className="space-y-1.5 text-xs text-vibrant-dark font-bold bg-white/80 p-3 rounded-xl border border-vibrant-dark/20">
                      <div className="flex items-center justify-between">
                        <span>• Abacus (200 Questions):</span>
                        <span className="text-emerald-700 font-black">13 Mins (100% Accuracy)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>• Vedic Math (75 Questions):</span>
                        <span className="text-emerald-700 font-black">7 Mins (100% Accuracy)</span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-dashed border-vibrant-dark/20 text-vibrant-orange font-black">
                        <span>💰 IIVA Cash Rewards Won:</span>
                        <span>₹2,100 (Abacus) + ₹2,100 (Vedic) = ₹4,200</span>
                      </div>
                    </div>

                    <p className="text-[11px] font-bold text-gray-700 italic leading-relaxed bg-[#FFFDF9] p-2.5 rounded-xl border border-dashed border-vibrant-dark/30">
                      🌟 <span className="font-black text-vibrant-dark">Appreciation:</span> "Supersonic Mental Arithmetic Phenomenon! Arnav didn't just solve math problems—he redefined human speed boundaries with surgical 100% accuracy, proving that dedication unlocks true genius!"
                    </p>
                  </div>

                  {/* RUNNER-UP SPOTLIGHTS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-[#E0FAF5] border-2 border-vibrant-dark rounded-xl space-y-1.5">
                      <div className="text-[10px] font-black text-vibrant-teal uppercase tracking-wider flex items-center gap-1">
                        🥈 2ND RANK • NAVYA PATIL
                      </div>
                      <div className="text-xs font-black text-vibrant-dark">Batch 1st Rank Gold Medalist</div>
                      <div className="text-[11px] font-bold text-gray-600">200 Abacus Qs in 19 Mins (100% Acc)</div>
                      <p className="text-[10px] text-teal-900 font-medium italic">"Steely resolve and flawless execution under high competition pressure!"</p>
                    </div>

                    <div className="p-3 bg-[#FFF0E0] border-2 border-vibrant-dark rounded-xl space-y-1.5">
                      <div className="text-[10px] font-black text-vibrant-orange uppercase tracking-wider flex items-center gap-1">
                        🥉 3RD RANK • MANASVI BAGUL
                      </div>
                      <div className="text-xs font-black text-vibrant-dark">Exemplary Performance Gold Medalist</div>
                      <div className="text-[11px] font-bold text-gray-600">200 Abacus Qs in 17 Mins (98% Acc)</div>
                      <p className="text-[10px] text-orange-900 font-medium italic">"Blazing tempo coupled with supreme numerical grit!"</p>
                    </div>
                  </div>

                  {/* 5 GOLDEN STARS */}
                  <div className="p-3.5 bg-slate-50 border-2 border-vibrant-dark rounded-xl space-y-2">
                    <div className="font-black text-xs text-vibrant-dark uppercase tracking-wider flex items-center justify-between">
                      <span>⭐ OUR 5 GOLDEN STARS (GOLD MEDALISTS)</span>
                      <span className="text-[10px] font-bold bg-vibrant-gold/30 text-amber-900 px-2 py-0.5 rounded-md">200 Qs / 20 Mins Challenge</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs font-black text-slate-800">
                      <span className="bg-white border border-vibrant-dark px-2.5 py-1 rounded-lg">⭐ Aarav Vora</span>
                      <span className="bg-white border border-vibrant-dark px-2.5 py-1 rounded-lg">⭐ Devaansh Ganjoo</span>
                      <span className="bg-white border border-vibrant-dark px-2.5 py-1 rounded-lg">⭐ Spriha Kamath</span>
                      <span className="bg-white border border-vibrant-dark px-2.5 py-1 rounded-lg">⭐ Chaitanya Bhave</span>
                      <span className="bg-white border border-vibrant-dark px-2.5 py-1 rounded-lg">⭐ Shaurya Atkare</span>
                    </div>
                    <p className="text-[10px] text-gray-600 font-bold italic pt-0.5">
                      "Precision today, Champions forever! Each golden star demonstrated photographic visual memory and ultimate discipline."
                    </p>
                  </div>

                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-dashed border-vibrant-dark/20">
                <div className="text-xs text-gray-600 font-bold flex items-center gap-1.5">
                  <span>📍 Ceremony Venue:</span>
                  <span className="text-vibrant-dark font-black">Arnav Abacus Academy, Wakad Pune</span>
                </div>
                <Link
                  to="/showcase"
                  onClick={() => setShowResultsModal(false)}
                  className="w-full sm:w-auto bg-vibrant-orange text-white font-black text-xs px-6 py-3 rounded-xl border-2 border-vibrant-dark shadow-[2px_2px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none hover:bg-orange-600 transition-all text-center inline-flex items-center justify-center gap-2"
                >
                  <span>{t("viewFullShowcase")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Bottom CTA Section */}
      <section className="py-20 md:py-28 bg-[#FF6321] text-white border-t-4 border-vibrant-dark relative">
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            {t("newsCtaBadge")}
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight text-white">
            {t("newsCtaTitle")}
          </h2>
          <p className="text-[#FFF2E0] text-xs md:text-sm max-w-2xl mx-auto leading-relaxed font-bold">
            {t("newsCtaSubtitle")}
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/919021924968"
              onClick={handleCtaClick}
              className="w-full sm:w-auto bg-vibrant-gold text-vibrant-dark border-2 border-vibrant-dark font-black px-8 py-5 rounded-2xl shadow-[0_6px_0_0_#1A2E35] active:translate-y-1 active:shadow-none hover:scale-[1.01] transition-all text-center"
            >
              {t("newsContactCta")}
            </a>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=18.5975866,73.7810869"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase font-black text-white tracking-widest hover:underline flex items-center gap-1"
            >
              {t("newsMapsCta")} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
