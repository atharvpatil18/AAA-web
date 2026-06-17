/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link } from "react-router-dom";
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
import { PROGRAMS } from "../data";
import { Sparkles, HelpCircle, MapPin, Phone, Mail, ArrowRight, Star, Heart, CheckCircle2 } from "lucide-react";
import { trackDemoClick } from "../lib/analytics";

export default function Home() {
  const { t } = useLanguage();
  const handleMapCtaClick = () => {
    trackDemoClick("home_map_nav_cta");
  };

  return (
    <div id="home-page-container" className="bg-[#FFFDF9] min-h-screen">
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Trust Counters Bar */}
      <div className="px-4 md:px-8">
        <TrustBar />
      </div>

      {/* 2.5. Interactive Abacus Playground */}
      <section id="interactive-abacus-playground" className="py-16 md:py-24 bg-gradient-to-b from-[#FFFDF9] to-[#FFFBF5] border-t-2 border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
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
          <InteractiveAbacus />
        </div>
      </section>

      {/* 2.6. Interactive Vedic Math Playground */}
      <section id="interactive-vedic-playground" className="py-16 md:py-20 bg-white border-t-2 border-slate-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
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
          <VedicMathDemo />
        </div>
      </section>

      {/* 3. Core Programs Showcase */}
      <section id="programs-showcase" className="py-20 md:py-28 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12 md:mb-16">
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

        {/* 3 Columns Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROGRAMS.map((prog) => (
            <ProgramCard key={prog.id} program={prog} />
          ))}
        </div>
      </section>

      {/* 3.5. Interactive Math Synergy System (Comparison) */}
      <section id="math-synergy-comparison" className="py-20 md:py-24 bg-gradient-to-b from-[#FFFDF9] to-[#FFFBF5] border-t-4 border-vibrant-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <MathComparisonDemo />
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
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
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

              {/* Game Element */}
              <SpeedChallengeWidget />
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
    </div>
  );
}
