/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Phone, ArrowRight, Smartphone, Compass, Sparkles, BookOpen, Star, ChevronDown, ChevronUp } from "lucide-react";
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
      colorTheme: "gold",
      imageUrl: "mental_math_power_sessions_july_2026.jpg"
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Toggle Button */}
                  <div className="pt-2">
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

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
              href="https://www.google.com/maps/dir/?api=1&destination=18.5936735,73.7656606"
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
