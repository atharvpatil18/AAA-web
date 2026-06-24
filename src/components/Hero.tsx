/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, ArrowRight, ShieldCheck, MapPin, Trophy, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";
import { Link } from "react-router-dom";

export default function Hero() {
  const { t } = useLanguage();
  const punchlines = [
    t("heroPunchline1"),
    t("heroPunchline2"),
    t("heroPunchline3")
  ];
  const [punchlineIndex, setPunchlineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPunchlineIndex((prev) => (prev + 1) % punchlines.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [punchlines.length]);

  const handleCtaClick = () => {
    trackDemoClick("hero_primary_cta");
  };

  const handleGameScroll = () => {
    trackDemoClick("hero_scroll_to_quiz");
    const element = document.getElementById("speed-challenge-widget-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero-section" className="relative bg-vibrant-cream overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 md:pt-16 md:pb-28 lg:pt-20 lg:pb-36 border-b border-slate-100">
      
      {/* Dynamic Background Visual Blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-vibrant-orange/5 rounded-full blur-3xl pointer-events-none -ml-40 -mt-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-vibrant-teal/5 rounded-full blur-3xl pointer-events-none -mr-40 -mb-20" />
 
      {/* Hero Body Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 bg-vibrant-orange/10 px-4 py-1.5 rounded-full text-xs font-bold text-vibrant-orange"
              >
                <Sparkles className="w-4 h-4 text-vibrant-orange animate-spin-slow" />
                <span>{t("heroBadge")}</span>
              </motion.div>
 
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="inline-flex items-center gap-2 bg-vibrant-teal/10 px-4 py-1.5 rounded-full text-xs font-bold text-vibrant-teal"
              >
                <ShieldCheck className="w-4 h-4 text-vibrant-teal" />
                <span>{t("heroRatioBadge")}</span>
              </motion.div>
            </div>
 
            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-display font-black text-3xl xs:text-4xl sm:text-6xl lg:text-7xl text-vibrant-dark tracking-tight leading-[1.1] mb-6 sm:mb-10"
            >
              {t("heroTitleStart")}<span className="text-vibrant-orange">{t("heroTitleFear")}</span>{" "} <br />
              {t("heroTitleInto")}<span className="text-vibrant-teal">{t("heroTitleFun")}</span>{" "}
            </motion.h1>

            {/* Dynamic Rotating Subtitle punchline */}
            <div className="min-h-[48px] flex items-center justify-center lg:justify-start">
              <AnimatePresence mode="wait">
                <motion.p
                  key={punchlineIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-vibrant-orange font-display font-bold text-base md:text-lg lg:text-xl max-w-2xl leading-normal text-center lg:text-left"
                >
                  {punchlines[punchlineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Subtitle description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="text-slate-650 text-sm md:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 pr-0 lg:pr-12"
            >
              {t("heroSubtitle")}
            </motion.p>

            {/* Quick Trust Indicators Card from palette specification */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="grid grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm shadow-slate-100/50"
            >
              <div className="text-center">
                <p className="text-2xl font-black text-vibrant-orange">{t("trustTrained").split(" ")[0]}</p>
                <p className="text-[10px] font-bold uppercase text-slate-400">{t("trustTrained").split(" ").slice(1).join(" ")}</p>
              </div>
              <div className="text-center border-l border-slate-100">
                <p className="text-2xl font-black text-vibrant-dark">{t("trustExp").split(" ")[0]}</p>
                <p className="text-[10px] font-bold uppercase text-slate-400">{t("trustExp").split(" ").slice(1).join(" ")}</p>
              </div>
              <div className="text-center border-l border-slate-100">
                <p className="text-2xl font-black text-vibrant-teal">{t("trustAwards").split(" ")[0]}</p>
                <p className="text-[10px] font-bold uppercase text-slate-400">{t("trustAwards").split(" ").slice(1).join(" ")}</p>
              </div>
              <a 
                href="https://share.google/fFcUhDGoBJ5M27dX5" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-center border-l border-slate-100 hover:scale-102 transition-transform block"
              >
                <p className="text-2xl font-black text-amber-500">{t("trustRating").split(" ")[0]}</p>
                <p className="text-[10px] font-bold uppercase text-slate-400 underline decoration-amber-500">{t("trustRating").split(" ").slice(1).join(" ")}</p>
              </a>
            </motion.div>

            {/* Play Button Row */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3"
            >
              <a
                href="https://wa.me/919021924968"
                onClick={handleCtaClick}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-vibrant-orange hover:bg-vibrant-orange/95 text-white font-bold text-sm px-8 py-4 rounded-full shadow-sm hover:shadow-md active:scale-97 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                {t("heroCta")}
                <ArrowRight className="w-4 h-4 text-orange-100" />
              </a>

              <button
                onClick={handleGameScroll}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-vibrant-dark border border-slate-200 font-bold text-sm px-7 py-4 rounded-full shadow-xs hover:shadow-md active:scale-97 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                {t("heroBtnQuiz")}
              </button>
            </motion.div>

          </div>

          {/* Right Hero App Card Column with Comic Heavy Shadow Theme */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            
            <div className="relative bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
              
              {/* Highlight promo badge rotated */}
              <div className="absolute -top-6 -right-4 bg-vibrant-gold p-3 rounded-2xl rotate-6 border border-vibrant-dark/10 shadow-lg text-vibrant-dark text-center leading-none z-10 max-w-[120px]">
                <p className="font-black text-xs text-vibrant-dark leading-none">{t("heroFreeTrial")}</p>
                <p className="text-[8px] font-black tracking-wider uppercase mt-1">{t("heroTwoSessions")}</p>
              </div>

              {/* Highlight statistics metrics */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">
                  {t("heroEnrollmentStatus")}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  {t("heroAdmissionsOpen")}
                </span>
              </div>

              {/* Special message banner */}
              <div className="space-y-3">
                <span className="block text-vibrant-dark font-display font-black text-xl leading-tight">
                  {t("heroWhyParentsChooseUs")}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {t("heroParentsDesc")}
                </p>
              </div>

              {/* Bullet highlights with check circle */}
              <div className="grid grid-cols-2 gap-3 pb-2">
                <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                  <span className="block font-black text-vibrant-orange text-sm md:text-base">{t("heroStatSpeed")}</span>
                  <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t("heroStatSpeedLabel")}</span>
                </div>
                <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                  <span className="block font-black text-vibrant-teal text-sm md:text-base">{t("heroStatAge")}</span>
                  <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t("heroStatAgeLabel")}</span>
                </div>
              </div>

              {/* Redirect Options: Success Stories & Google Reviews */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  to="/showcase"
                  className="flex-1 bg-vibrant-teal hover:bg-vibrant-teal/95 text-white font-bold text-xs px-4 py-3 rounded-full shadow-xs hover:shadow-md active:scale-97 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-white shrink-0" />
                  <span>{t("heroBtnStories")}</span>
                </Link>
                <a
                  href="https://share.google/fFcUhDGoBJ5M27dX5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-vibrant-gold hover:bg-vibrant-gold/95 text-vibrant-dark font-bold text-xs px-4 py-3 rounded-full shadow-xs hover:shadow-md active:scale-97 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Star className="w-4 h-4 fill-current text-vibrant-dark shrink-0" />
                  <span>{t("heroBtnReviews")}</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
