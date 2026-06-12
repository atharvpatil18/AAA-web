/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackDemoClick } from "../lib/analytics";

export default function Hero() {
  const punchlines = [
    "Does your child make silly mistakes? Let's zero them down!",
    "Already sharp? Let them excel in National & International competitions!",
    "Give your child the power of speed with accuracy and consistency!"
  ];
  const [punchlineIndex, setPunchlineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPunchlineIndex((prev) => (prev + 1) % punchlines.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

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
    <section id="hero-section" className="relative bg-vibrant-cream overflow-hidden pt-12 pb-24 md:pt-16 md:pb-28 lg:pt-20 lg:pb-36 border-b-2 border-slate-205">
      
      {/* Dynamic Background Visual Blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-vibrant-orange/5 rounded-full blur-3xl pointer-events-none -ml-40 -mt-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-vibrant-teal/5 rounded-full blur-3xl pointer-events-none -mr-40 -mb-20" />

      {/* Hero Body Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Left Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-[#FFF0E0] border border-[#FFD8B1] px-4 py-1.5 rounded-full text-xs font-bold text-vibrant-orange mx-auto lg:mx-0"
            >
              <Sparkles className="w-4 h-4 text-vibrant-orange animate-spin-slow" />
              <span>🚀 Pune's #1 Skill Development Center</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-vibrant-dark tracking-tight leading-[1.1] mb-2"
            >
              Turn Math <span className="text-vibrant-orange">Fear</span> <br />
              Into Math <span className="text-vibrant-teal">Fun!</span>
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
                  👉 {punchlines[punchlineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Subtitle description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="text-[#5A5A5A] text-sm md:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 pr-0 lg:pr-12"
            >
              Empower your child with 10x faster calculation speeds and photographic memory. Led by <span className="font-bold text-vibrant-dark">Neha Patil</span> (IIVA Certified Professional) &amp; <span className="font-bold text-vibrant-dark">Nitin Sir</span> at Wakad, Pune. Online interactive classroom sessions are also conducted.
            </motion.p>

            {/* Quick Trust Indicators Card from palette specification */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="grid grid-cols-4 gap-4 bg-white p-6 rounded-3xl border-2 border-slate-150 shadow-sm"
            >
              <div className="text-center">
                <p className="text-2xl font-black text-vibrant-orange">200+</p>
                <p className="text-[10px] font-black uppercase text-slate-400">Students</p>
              </div>
              <div className="text-center border-l border-slate-100">
                <p className="text-2xl font-black text-vibrant-dark">3+</p>
                <p className="text-[10px] font-black uppercase text-slate-400">Years Exp</p>
              </div>
              <div className="text-center border-l border-slate-100">
                <p className="text-2xl font-black text-vibrant-teal">100+</p>
                <p className="text-[10px] font-black uppercase text-slate-400">Awards</p>
              </div>
              <a 
                href="https://share.google/fFcUhDGoBJ5M27dX5" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-center border-l border-slate-100 hover:scale-105 transition-transform block"
              >
                <p className="text-2xl font-black text-amber-500">5/5</p>
                <p className="text-[10px] font-black uppercase text-slate-400 underline decoration-amber-500">65+ Reviews</p>
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
                className="w-full sm:w-auto bg-vibrant-orange text-white font-black text-sm px-8 py-4.5 rounded-2xl shadow-[0_6px_0_0_#B33A00] active:translate-y-1 active:shadow-none hover:brightness-105 transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                Book Free Demo Class
                <ArrowRight className="w-4 h-4 text-orange-100" />
              </a>

              <button
                onClick={handleGameScroll}
                className="w-full sm:w-auto bg-white hover:bg-vibrant-cream text-vibrant-dark border-2 border-vibrant-dark font-black text-sm px-7 py-4 rounded-2xl shadow-[0_4px_0_0_#1A2E35] active:translate-y-1 active:shadow-none transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                Try Math Quiz Widget
              </button>
            </motion.div>

          </div>

          {/* Right Hero App Card Column with Comic Heavy Shadow Theme */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            
            <div className="relative bg-white border-4 border-vibrant-dark rounded-[40px] p-8 shadow-[12px_12px_0_0_#1A2E35] space-y-6">
              
              {/* Highlight promo badge rotated */}
              <div className="absolute -top-6 -right-4 bg-vibrant-gold p-3 rounded-2xl rotate-12 border-2 border-vibrant-dark shadow-md text-vibrant-dark text-center leading-none z-10 max-w-[120px]">
                <p className="font-black text-xs text-vibrant-dark leading-none">FREE TRIAL</p>
                <p className="text-[8px] font-black tracking-wider uppercase mt-1">2 Value-Added Sessions</p>
              </div>

              {/* Highlight statistics metrics */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">
                  Batch Enrollment Status
                </span>
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Admissions Open
                </span>
              </div>

              {/* Special message banner */}
              <div className="space-y-3">
                <span className="block text-vibrant-dark font-display font-black text-xl leading-tight">
                  Why local Wakad parents choose us:
                </span>
                <p className="text-xs text-gray-600 leading-relaxed">
                  While ordinary tuition centers focus on repetitive paper calculations, Neha Patil’s <strong>Arnav Abacus Academy</strong> incorporates visual beads of abacus and mental shortcuts of Vedic maths, teaching children to solve 10x faster with absolute joy.
                </p>
              </div>

              {/* Bullet highlights with check circle */}
              <div className="grid grid-cols-2 gap-3 pb-2">
                <div className="bg-vibrant-cream p-3 rounded-xl border border-gray-200">
                  <span className="block font-black text-vibrant-orange text-sm md:text-base">10-15x</span>
                  <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">Arithmetical Speed</span>
                </div>
                <div className="bg-vibrant-cream p-3 rounded-xl border border-gray-200">
                  <span className="block font-black text-vibrant-teal text-sm md:text-base">4-14 Yrs</span>
                  <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider">Age Scale Window</span>
                </div>
              </div>

              {/* Promo offer card widget */}
              <div className="bg-vibrant-dark text-white p-4 rounded-2xl flex items-center justify-between gap-4">
                <div>
                  <span className="block text-[10px] uppercase font-black text-vibrant-teal">Wakad Center Benefits</span>
                  <span className="block font-display text-xs text-slate-300">Located directly opposite Creative Cameo bungalow</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  📍
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
