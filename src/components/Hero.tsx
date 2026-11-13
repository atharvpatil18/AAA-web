/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, MapPin, Trophy, Star, CheckCircle2, Users, Award } from "lucide-react";
import { trackDemoClick, trackWhatsAppClick, trackCounsellingBook } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";
import { Link } from "react-router-dom";
import DemoBookingModal from "./DemoBookingModal";

export default function Hero() {
  const { t } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleCtaClick = () => {
    trackCounsellingBook({
      source: "hero_primary_discovery_cta",
      program: "Personalised Learning Discovery Session",
      deliveryMode: "offline_and_online",
    });
    trackDemoClick("hero_primary_discovery_cta");
    setIsDemoModalOpen(true);
  };

  const handleProgramScroll = () => {
    trackDemoClick("hero_explore_programmes");
    const element = document.getElementById("programmes-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero-section" className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF6F0] to-[#FFFDF9] overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 md:pt-16 md:pb-24 border-b border-slate-200/60">
      
      {/* Background Subtle Ambience Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Authoritative Editorial Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Brand Identifier Pill */}
            <div className="inline-flex items-center gap-2 bg-slate-900 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ARNAV ABACUS ACADEMY | WAKAD, PUNE</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.12]">
              Beyond Calculation. <br className="hidden sm:inline" />
              <span className="text-orange-600">Towards Confident Mathematical Thinking.</span>
            </h1>

            {/* Reassuring Supporting Message */}
            <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Learn Abacus, Vedic Math and Mental Math through structured, personalised learning that develops accuracy, concentration, visualization and independent thinking.
            </p>

            {/* Verified Pillar Checkpoints */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-slate-700 pt-1">
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Small Batches (Max 5 Students)
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Certified Trainer Mentorship
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                Japanese Soroban Method
              </span>
            </div>

            {/* Conversion CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                type="button"
                onClick={handleCtaClick}
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-full shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Discovery Session</span>
                <ArrowRight className="w-4 h-4 text-orange-100" />
              </button>

              <button
                type="button"
                onClick={handleProgramScroll}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-sm sm:text-base px-7 py-4 rounded-full shadow-xs hover:shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Our Programmes</span>
              </button>
            </div>

            {/* Quick Proof Snippet */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-600">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold">
                Rated 5.0/5 by 76+ Wakad Parents • Flat 3, Balaji Sagar Bungalow, Wakad
              </span>
            </div>

          </div>

          {/* Right Column: Authentic AAA Classroom & Achievement Visual Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xl space-y-4 relative">
              
              {/* Highlight Badge */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100">
                <img
                  src="/abacus_brain_dev.jpg"
                  alt="Students learning Japanese Soroban Abacus at Arnav Abacus Academy Wakad Pune"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                    Authentic Classroom Training
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-white mt-1 leading-snug">
                    Small-group interactive math sessions in Wakad, Pune
                  </p>
                </div>
              </div>

              {/* Trust Metric Counters Row */}
              <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100" title="30+ Champions across State, National & International levels (Abacus, Vedic, IPM)">
                  <span className="block font-black text-orange-600 text-lg sm:text-xl">30+</span>
                  <span className="block text-[10px] font-bold text-slate-600 uppercase leading-tight">{t("heroStatChampions")}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="block font-black text-slate-900 text-lg sm:text-xl">Max 5</span>
                  <span className="block text-[10px] font-bold text-slate-600 uppercase">Students Per Batch</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="block font-black text-emerald-700 text-lg sm:text-xl">100%</span>
                  <span className="block text-[10px] font-bold text-slate-600 uppercase">Zero-Finger Goal</span>
                </div>
              </div>

              {/* Founder Credential Card */}
              <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/70 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden shadow-xs">
                  <img
                    src="/teacher-profile.jpg"
                    alt="Neha Patil - Founder Arnav Abacus Academy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-700 block">
                    Personally Mentored By
                  </span>
                  <strong className="text-xs sm:text-sm font-black text-slate-900 block truncate">
                    Neha Patil (MCA, Certified Trainer)
                  </strong>
                  <span className="text-[10.5px] text-slate-600 block truncate">
                    Founder &amp; Academic Director • Wakad Center
                  </span>
                </div>
                <Link
                  to="/mentor"
                  className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 text-[11px] font-bold px-3 py-1.5 rounded-lg shrink-0 transition-colors"
                >
                  Profile &rarr;
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Discovery Booking Modal */}
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="Personalised Learning Discovery Session"
        source="hero_primary_discovery_cta"
      />
    </section>
  );
}
