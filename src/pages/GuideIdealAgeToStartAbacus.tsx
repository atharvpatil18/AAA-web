/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  HelpCircle, 
  ChevronRight, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Brain, 
  Lightbulb, 
  Target, 
  ShieldCheck, 
  Calendar, 
  Users, 
  Clock, 
  GraduationCap 
} from "lucide-react";
import { trackPageView, trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";
import DemoBookingModal from "../components/DemoBookingModal";

export default function GuideIdealAgeToStartAbacus() {
  const { t, language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    trackPageView(
      "/parent-guides/ideal-age-to-start-abacus", 
      "What Is the Ideal Age to Start Abacus? A Parent's Guide | AAA"
    );
  }, []);

  // Article and BreadcrumbList Structured Data (strictly verified, zero PII, zero fabricated metrics)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What Is the Ideal Age to Start Abacus? A Parent's Guide",
    "description": "An objective guide for parents exploring starting ages for abacus learning, readiness considerations across ages 4 to 14, and how to evaluate suitability without pressure.",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://aaa-web-b0h.pages.dev/"
    },
    "mainEntityOfPage": "https://aaa-web-b0h.pages.dev/parent-guides/ideal-age-to-start-abacus"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t("navHome"),
        "item": "https://aaa-web-b0h.pages.dev/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t("g5BreadcrumbParent"),
        "item": "https://aaa-web-b0h.pages.dev/parent-guides"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": t("g5BreadcrumbCurrent"),
        "item": "https://aaa-web-b0h.pages.dev/parent-guides/ideal-age-to-start-abacus"
      }
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Inject Article & BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-4xl mx-auto px-4 md:px-8 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link to="/" className="hover:text-vibrant-dark transition-colors">
            {t("navHome")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/parent-guides" className="hover:text-vibrant-dark transition-colors">
            {t("g5BreadcrumbParent")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-bold truncate">
            {t("g5BreadcrumbCurrent")}
          </span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="bg-vibrant-dark text-white py-12 md:py-16 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Lightbulb className="w-3 h-3" /> {t("g5HeroBadge")}
            </span>
          </div>
          
          <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            {t("g5HeroTitle")}
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            {t("g5HeroSubtitle")}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-amber-300">
              {t("g5ReadTimeBadge")}
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-teal-300">
              {t("g5EligibilityBadge")}
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-slate-300">
              {t("g5PublisherBadge")}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Article Container */}
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-14 space-y-12">

        {/* 3. Short Answer */}
        <section className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-6 md:p-8 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 font-display font-black text-base md:text-lg">
            <Sparkles className="w-5 h-5 text-vibrant-orange shrink-0" />
            <h2>{t("g5ShortAnswerTitle")}</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g5ShortAnswerP1")}
          </p>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g5ShortAnswerP2")}
          </p>
          <p className="text-xs text-slate-600 italic pt-1 border-t border-amber-200/60 font-semibold">
            {t("g5ShortAnswerNote")}
          </p>
        </section>

        {/* 4. Practical Readiness Factors */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Brain className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g5ReadinessTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g5ReadinessIntro")}
          </p>

          <div className="space-y-3 pt-2">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g5Factor1Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g5Factor1Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g5Factor2Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g5Factor2Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g5Factor3Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g5Factor3Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g5Factor4Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g5Factor4Desc")}
              </p>
            </div>
          </div>

          <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed font-medium">
            {t("g5ReadinessTakeaway")}
          </div>
        </section>

        {/* 5. Age Group Breakdown */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Users className="w-6 h-6 text-vibrant-teal shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g5AgesTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g5AgesIntro")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white border-2 border-amber-300 p-5 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded inline-block">
                {t("g5AgeGroup1Badge")}
              </span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g5AgeGroup1Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g5AgeGroup1Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-teal-300 p-5 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded inline-block">
                {t("g5AgeGroup2Badge")}
              </span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g5AgeGroup2Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g5AgeGroup2Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-100 px-2 py-0.5 rounded inline-block">
                {t("g5AgeGroup3Badge")}
              </span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g5AgeGroup3Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g5AgeGroup3Desc")}
              </p>
            </div>
          </div>
        </section>

        {/* 6. Parent Checklist */}
        <section className="bg-slate-100/70 border-2 border-slate-200 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark font-display font-black text-lg">
            <Target className="w-5 h-5 text-vibrant-orange shrink-0" />
            <h2>{t("g5ChecklistTitle")}</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g5ChecklistIntro")}
          </p>

          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">{t("g5Check1Title")}</strong>
                {t("g5Check1Desc")}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">{t("g5Check2Title")}</strong>
                {t("g5Check2Desc")}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">{t("g5Check3Title")}</strong>
                {t("g5Check3Desc")}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">{t("g5Check4Title")}</strong>
                {t("g5Check4Desc")}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">{t("g5Check5Title")}</strong>
                {t("g5Check5Desc")}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Parent FAQs */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <HelpCircle className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g5FaqTitle")}
            </h2>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g5Faq1Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g5Faq1A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g5Faq2Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g5Faq2A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g5Faq3Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g5Faq3A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g5Faq4Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g5Faq4A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g5Faq5Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g5Faq5A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g5Faq6Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g5Faq6A")}
              </p>
            </div>
          </div>
        </section>

        {/* 8. Educational Disclaimer */}
        <section className="bg-slate-100/60 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-vibrant-dark font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t("g5DisclaimerTitle")}</span>
          </div>
          <p className="leading-relaxed">
            {t("g5DisclaimerText")}
          </p>
        </section>

        {/* 9. Related Programs & Navigation */}
        <section className="bg-white border-4 border-vibrant-dark rounded-[32px] p-6 md:p-8 shadow-[8px_8px_0_0_#1A2E35] space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-vibrant-orange bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {t("g5CtaBadge")}
            </span>
            <h2 className="font-display font-black text-2xl text-vibrant-dark">
              {t("g5CtaTitle")}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
              {t("g5CtaDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <Link
              to="/programs/abacus"
              className="bg-slate-50 hover:bg-amber-50/60 border-2 border-slate-200 hover:border-vibrant-orange p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-orange">
                {t("g5CardAbacusTitle")}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                {t("g5CardAbacusDesc")}
              </span>
            </Link>

            <Link
              to="/programs/vedic-maths"
              className="bg-slate-50 hover:bg-teal-50/60 border-2 border-slate-200 hover:border-vibrant-teal p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-teal">
                {t("g5CardVedicTitle")}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                {t("g5CardVedicDesc")}
              </span>
            </Link>

            <Link
              to="/programs/school-maths"
              className="bg-slate-50 hover:bg-amber-50/60 border-2 border-slate-200 hover:border-amber-500 p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-amber-600">
                {t("g5CardSchoolTitle")}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                {t("g5CardSchoolDesc")}
              </span>
            </Link>
          </div>

          {/* Action CTA */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium">
              <strong>{language === "mr" ? "केंद्राचा पत्ता: " : language === "hi" ? "केंद्र का पता: " : "Center Location: "}</strong>{t("g5LocationText")}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  trackDemoClick("guide_tail_discovery_session");
                  setIsDemoModalOpen(true);
                }}
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t("g5BookDiscoveryBtn")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase px-4 py-3 rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-2"
              >
                <span>{t("g5ContactCenterBtn")}</span>
              </Link>
            </div>
          </div>
        </section>
      </article>
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="Abacus Age Readiness Discovery"
        source="parent_guide_guideidealagetostartabacus"
      />
    </div>
  );
}