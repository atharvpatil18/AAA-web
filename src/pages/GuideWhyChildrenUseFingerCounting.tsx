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
  GraduationCap 
} from "lucide-react";
import { trackPageView, trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";
import DemoBookingModal from "../components/DemoBookingModal";

export default function GuideWhyChildrenUseFingerCounting() {
  const { t, language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    trackPageView(
      "/parent-guides/why-children-use-finger-counting", 
      "Why Children Use Finger Counting & Mental Math Habits | AAA"
    );
  }, []);

  // Article and BreadcrumbList Structured Data (No fabricated ratings/dates/author credentials)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Why Children Use Finger Counting and How Mental Calculation Habits Develop",
    "description": "An educational guide for parents exploring why children use finger counting, how it supports early quantity representation, and how alternative mental strategies develop gradually without pressure.",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://aaa-web-b0h.pages.dev/"
    },
    "mainEntityOfPage": "https://aaa-web-b0h.pages.dev/parent-guides/why-children-use-finger-counting"
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
        "name": t("g3BreadcrumbParent"),
        "item": "https://aaa-web-b0h.pages.dev/parent-guides"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": t("g3BreadcrumbCurrent"),
        "item": "https://aaa-web-b0h.pages.dev/parent-guides/why-children-use-finger-counting"
      }
    ]
  };

  return (
    <div id="guide-why-children-use-finger-counting-page" className="bg-[#FFFDF9] min-h-screen">
      {/* Article & Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-slate-100/80 border-b border-slate-200 py-2.5 px-4 md:px-8 text-xs font-semibold text-slate-600">
        <div className="max-w-4xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-vibrant-orange transition-colors">{t("navHome")}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/parent-guides" className="hover:text-vibrant-orange transition-colors">{t("g3BreadcrumbParent")}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-vibrant-dark font-bold">{t("g3BreadcrumbCurrent")}</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="bg-vibrant-dark text-white py-12 md:py-16 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Lightbulb className="w-3 h-3" /> {t("g3HeroBadge")}
            </span>
          </div>
          
          <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            {t("g3HeroTitle")}
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            {t("g3HeroSubtitle")}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-amber-300">
              {t("g3ReadTimeBadge")}
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-teal-300">
              {t("g3FoundationBadge")}
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-slate-300">
              {t("g3PublisherBadge")}
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
            <h2>{t("g3ShortAnswerTitle")}</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g3ShortAnswerP1")}
          </p>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g3ShortAnswerP2")}
          </p>
          <p className="text-xs text-slate-600 italic pt-1 border-t border-amber-200/60 font-semibold">
            {t("g3ShortAnswerNote")}
          </p>
        </section>

        {/* 4. Why Children Use Finger Counting */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Brain className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g3WhyFingersTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g3WhyFingersIntro")}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-teal bg-teal-50 px-2 py-0.5 rounded">{t("g3Why1Badge")}</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g3Why1Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g3Why1Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-orange bg-amber-50 px-2 py-0.5 rounded">{t("g3Why2Badge")}</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g3Why2Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g3Why2Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{t("g3Why3Badge")}</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g3Why3Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g3Why3Desc")}
              </p>
            </div>
          </div>

          <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed font-medium">
            {t("g3WhySummary")}
          </div>
        </section>

        {/* 5. Stages of Strategy Development */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <GraduationCap className="w-6 h-6 text-vibrant-teal shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g3StagesTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g3StagesIntro")}
          </p>

          <div className="space-y-3 pt-2">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g3Stage1Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g3Stage1Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g3Stage2Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g3Stage2Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g3Stage3Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g3Stage3Desc")}
              </p>
            </div>
          </div>
        </section>

        {/* 6. Concrete Example */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Lightbulb className="w-6 h-6 text-amber-500 shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g3ExampleTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-600 font-medium">
            {t("g3ExampleIntro")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Stage 1</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g3ExampleCountOnTitle")}</h3>
              <div className="text-[11px] text-slate-600 font-medium space-y-1">
                <p>{t("g3ExampleCountOnDesc")}</p>
                <p className="text-[10px] text-slate-500 pt-1">{t("g3ExampleCountOnSub")}</p>
              </div>
            </div>

            <div className="bg-white border-2 border-teal-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-teal bg-teal-50 px-2 py-0.5 rounded">Stage 2</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g3ExampleMakeTenTitle")}</h3>
              <div className="text-[11px] text-slate-600 font-medium space-y-1">
                <p>{t("g3ExampleMakeTenDesc")}</p>
                <p className="text-[10px] text-slate-500 pt-1">{t("g3ExampleMakeTenSub")}</p>
              </div>
            </div>

            <div className="bg-white border-2 border-amber-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-orange bg-amber-50 px-2 py-0.5 rounded">Stage 3</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g3ExampleBeadsTitle")}</h3>
              <div className="text-[11px] text-slate-600 font-medium space-y-1">
                <p>{t("g3ExampleBeadsDesc")}</p>
                <p className="text-[10px] text-slate-500 pt-1">{t("g3ExampleBeadsSub")}</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 font-medium leading-relaxed">
            {t("g3ExampleTakeaway")}
          </div>
        </section>

        {/* 7. How Abacus Practice Relates to Finger Counting */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Brain className="w-6 h-6 text-vibrant-teal shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g3AbacusBridgeTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g3AbacusBridgeIntro")}
          </p>
          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">{t("g3Bridge1Title")}</strong>
                {t("g3Bridge1Desc")}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">{t("g3Bridge2Title")}</strong>
                {t("g3Bridge2Desc")}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">{t("g3Bridge3Title")}</strong>
                {t("g3Bridge3Desc")}
              </div>
            </div>
          </div>
        </section>

        {/* 8. When Parents Can Encourage Alternative Strategies Patiently */}
        <section className="bg-slate-100/70 border-2 border-slate-200 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark font-display font-black text-lg">
            <Lightbulb className="w-5 h-5 text-vibrant-teal shrink-0" />
            <h2>{t("g3EncourageTitle")}</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g3EncourageIntro")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-700 pt-1">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">{t("g3Tip1Title")}</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {t("g3Tip1Desc")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">{t("g3Tip2Title")}</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {t("g3Tip2Desc")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">{t("g3Tip3Title")}</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {t("g3Tip3Desc")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">{t("g3Tip4Title")}</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {t("g3Tip4Desc")}
              </p>
            </div>
          </div>
        </section>

        {/* 9. Parent FAQs */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <HelpCircle className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g3FaqTitle")}
            </h2>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g3Faq1Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g3Faq1A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g3Faq2Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g3Faq2A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g3Faq3Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g3Faq3A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g3Faq4Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g3Faq4A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g3Faq5Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g3Faq5A")}
              </p>
            </div>
          </div>
        </section>

        {/* 10. Educational Disclaimer */}
        <section className="bg-slate-100/60 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-vibrant-dark font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t("g3DisclaimerTitle")}</span>
          </div>
          <p className="leading-relaxed">
            {t("g3DisclaimerText")}
          </p>
        </section>

        {/* 11. Related Programs & Navigation */}
        <section className="bg-white border-4 border-vibrant-dark rounded-[32px] p-6 md:p-8 shadow-[8px_8px_0_0_#1A2E35] space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-vibrant-orange bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {t("g3CtaBadge")}
            </span>
            <h2 className="font-display font-black text-2xl text-vibrant-dark">
              {t("g3CtaTitle")}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
              {t("g3CtaDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <Link
              to="/programs/abacus"
              className="bg-slate-50 hover:bg-amber-50/60 border-2 border-slate-200 hover:border-vibrant-orange p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-orange">
                {t("g3CardAbacusTitle")}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                {t("g3CardAbacusDesc")}
              </span>
            </Link>

            <Link
              to="/programs/school-maths"
              className="bg-slate-50 hover:bg-amber-50/60 border-2 border-slate-200 hover:border-amber-500 p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-amber-600">
                {t("g3CardSchoolTitle")}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                {t("g3CardSchoolDesc")}
              </span>
            </Link>

            <Link
              to="/parent-guides/does-abacus-confuse-school-math"
              className="bg-slate-50 hover:bg-teal-50/60 border-2 border-slate-200 hover:border-vibrant-teal p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-teal">
                {t("g3CardHarmonyTitle")}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                {t("g3CardHarmonyDesc")}
              </span>
            </Link>
          </div>

          {/* Action CTA */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium">
              <strong>{language === "mr" ? "केंद्राचा पत्ता: " : language === "hi" ? "केंद्र का पता: " : "Center Location: "}</strong>{t("g3LocationText")}
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
                <span>{t("g3BookDiscoveryBtn")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase px-4 py-3 rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-2"
              >
                <span>{t("g3ContactCenterBtn")}</span>
              </Link>
            </div>
          </div>
        </section>
      </article>
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="Finger Counting Transition Discovery"
        source="parent_guide_guidewhychildrenusefingercounting"
      />
    </div>
  );
}