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
  Compass, 
  Target,
  ShieldCheck,
  Scale
} from "lucide-react";
import { trackPageView, trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";
import DemoBookingModal from "../components/DemoBookingModal";

export default function GuideAbacusVsVedicMaths() {
  const { t, language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    trackPageView("/parent-guides/abacus-vs-vedic-maths", "Abacus vs Vedic Maths: What's the Difference? | Arnav Abacus Academy");
  }, []);

  // Article and BreadcrumbList Structured Data (No fabricated ratings/dates/courses)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Abacus vs Vedic Maths: What's the Difference? A Guide for Parents",
    "description": "An objective educational comparison of Abacus Maths and Vedic Maths, outlining learning stages, pedagogical differences, and suitability for children.",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://aaa-web-b0h.pages.dev/"
    },
    "mainEntityOfPage": "https://aaa-web-b0h.pages.dev/parent-guides/abacus-vs-vedic-maths"
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
        "name": t("g1BreadcrumbParent"),
        "item": "https://aaa-web-b0h.pages.dev/parent-guides"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": t("g1BreadcrumbCurrent"),
        "item": "https://aaa-web-b0h.pages.dev/parent-guides/abacus-vs-vedic-maths"
      }
    ]
  };

  const comparisonRows = [
    {
      aspect: t("g1Row1Aspect"),
      abacus: t("g1Row1Abacus"),
      vedic: t("g1Row1Vedic"),
    },
    {
      aspect: t("g1Row2Aspect"),
      abacus: t("g1Row2Abacus"),
      vedic: t("g1Row2Vedic"),
    },
    {
      aspect: t("g1Row3Aspect"),
      abacus: t("g1Row3Abacus"),
      vedic: t("g1Row3Vedic"),
    },
    {
      aspect: t("g1Row4Aspect"),
      abacus: t("g1Row4Abacus"),
      vedic: t("g1Row4Vedic"),
    },
    {
      aspect: t("g1Row5Aspect"),
      abacus: t("g1Row5Abacus"),
      vedic: t("g1Row5Vedic"),
    },
    {
      aspect: t("g1Row6Aspect"),
      abacus: t("g1Row6Abacus"),
      vedic: t("g1Row6Vedic"),
    },
    {
      aspect: t("g1Row7Aspect"),
      abacus: t("g1Row7Abacus"),
      vedic: t("g1Row7Vedic"),
    },
    {
      aspect: t("g1Row8Aspect"),
      abacus: t("g1Row8Abacus"),
      vedic: t("g1Row8Vedic"),
    },
  ];

  return (
    <div id="guide-abacus-vs-vedic-page" className="bg-[#FFFDF9] min-h-screen">
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
          <Link to="/parent-guides" className="hover:text-vibrant-orange transition-colors">{t("g1BreadcrumbParent")}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-vibrant-dark font-bold">{t("g1BreadcrumbCurrent")}</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="bg-vibrant-dark text-white py-12 md:py-16 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Scale className="w-3 h-3" /> {t("g1HeroBadge")}
            </span>
          </div>
          
          <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            {t("g1HeroTitle")}
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            {t("g1HeroSubtitle")}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-amber-300">
              {t("g1ReadTimeBadge")}
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-teal-300">
              {t("g1StageBadge")}
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-slate-300">
              {t("g1PublisherBadge")}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Article Container */}
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-10 md:py-14 space-y-12">

        {/* 3. Short Answer: Abacus vs Vedic Maths */}
        <section className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-6 md:p-8 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-amber-900 font-display font-black text-base md:text-lg">
            <Sparkles className="w-5 h-5 text-vibrant-orange shrink-0" />
            <h2>{t("g1ShortAnswerTitle")}</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g1ShortAnswerIntro")}
          </p>
          <ul className="text-xs md:text-sm text-slate-700 space-y-2 font-medium pl-4 list-disc">
            <li>
              {t("g1ShortAnswerBullet1")}
            </li>
            <li>
              {t("g1ShortAnswerBullet2")}
            </li>
          </ul>
          <p className="text-xs text-slate-600 italic pt-1 border-t border-amber-200/60 font-semibold">
            {t("g1ShortAnswerNote")}
          </p>
        </section>

        {/* 4. What is Abacus Maths? */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Brain className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g1WhatIsAbacusTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g1WhatIsAbacusP1")}
          </p>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g1WhatIsAbacusP2")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-orange bg-amber-50 px-2 py-0.5 rounded">{t("g1AbacusPhase1Badge")}</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g1AbacusPhase1Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g1AbacusPhase1Desc")}
              </p>
            </div>
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-teal bg-teal-50 px-2 py-0.5 rounded">{t("g1AbacusPhase2Badge")}</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g1AbacusPhase2Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g1AbacusPhase2Desc")}
              </p>
            </div>
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{t("g1AbacusPhase3Badge")}</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g1AbacusPhase3Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g1AbacusPhase3Desc")}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {t("g1AbacusPositioning")}
          </p>
        </section>

        {/* 5. What is Vedic Maths? */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Compass className="w-6 h-6 text-vibrant-teal shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g1WhatIsVedicTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g1WhatIsVedicP1")}
          </p>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g1WhatIsVedicP2")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-teal bg-teal-50 px-2 py-0.5 rounded">{t("g1VedicStrat1Badge")}</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g1VedicStrat1Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g1VedicStrat1Desc")}
              </p>
            </div>
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-orange bg-amber-50 px-2 py-0.5 rounded">{t("g1VedicStrat2Badge")}</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g1VedicStrat2Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g1VedicStrat2Desc")}
              </p>
            </div>
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-1.5 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{t("g1VedicStrat3Badge")}</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g1VedicStrat3Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g1VedicStrat3Desc")}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {t("g1VedicPositioning")}
          </p>
        </section>

        {/* 6. Comparison Table */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Scale className="w-6 h-6 text-amber-600 shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g1TableTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-600 font-medium">
            {t("g1TableIntro")}
          </p>

          <div className="overflow-x-auto border-2 border-slate-200 rounded-3xl shadow-xs bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th scope="col" className="p-3.5 md:p-4 font-black text-slate-200 w-1/3 border-r border-slate-800">{t("g1TableHeaderAspect")}</th>
                  <th scope="col" className="p-3.5 md:p-4 font-black text-amber-300 w-1/3 border-r border-slate-800">{t("g1TableHeaderAbacus")}</th>
                  <th scope="col" className="p-3.5 md:p-4 font-black text-teal-300 w-1/3">{t("g1TableHeaderVedic")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                    <th scope="row" className="p-3.5 md:p-4 font-bold text-vibrant-dark border-r border-slate-100 text-left">
                      {row.aspect}
                    </th>
                    <td className="p-3.5 md:p-4 border-r border-slate-100 leading-relaxed">
                      {row.abacus}
                    </td>
                    <td className="p-3.5 md:p-4 leading-relaxed">
                      {row.vedic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Key Differences in Detail */}
        <section className="space-y-4">
          <h2 className="font-display font-black text-xl md:text-2xl text-vibrant-dark">
            {t("g1DiffTitle")}
          </h2>
          <div className="space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xs">1</span>
                {t("g1Diff1Title")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g1Diff1Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-black text-xs">2</span>
                {t("g1Diff2Title")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g1Diff2Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xs">3</span>
                {t("g1Diff3Title")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g1Diff3Desc")}
              </p>
            </div>
          </div>
        </section>

        {/* 8. Learning-Stage Comparison */}
        <section className="space-y-4">
          <h2 className="font-display font-black text-xl md:text-2xl text-vibrant-dark">
            {t("g1SuitabilityTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-amber-300 p-6 rounded-3xl space-y-3 shadow-xs">
              <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                {t("g1SuitAbacusBadge")}
              </span>
              <h3 className="font-bold text-base text-vibrant-dark">{t("g1SuitAbacusTitle")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g1SuitAbacusIntro")}
              </p>
              <ul className="text-xs text-slate-600 space-y-2 font-medium list-disc pl-4">
                <li>{t("g1SuitAbacusB1")}</li>
                <li>{t("g1SuitAbacusB2")}</li>
                <li>{t("g1SuitAbacusB3")}</li>
              </ul>
              <div className="pt-2">
                <Link
                  to="/programs/abacus"
                  className="text-xs font-bold text-vibrant-orange hover:underline inline-flex items-center gap-1"
                >
                  {t("g1SuitAbacusLink")} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="bg-white border-2 border-teal-300 p-6 rounded-3xl space-y-3 shadow-xs">
              <span className="text-[10px] font-black text-teal-800 bg-teal-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                {t("g1SuitVedicBadge")}
              </span>
              <h3 className="font-bold text-base text-vibrant-dark">{t("g1SuitVedicTitle")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g1SuitVedicIntro")}
              </p>
              <ul className="text-xs text-slate-600 space-y-2 font-medium list-disc pl-4">
                <li>{t("g1SuitVedicB1")}</li>
                <li>{t("g1SuitVedicB2")}</li>
                <li>{t("g1SuitVedicB3")}</li>
              </ul>
              <div className="pt-2">
                <Link
                  to="/programs/vedic-maths"
                  className="text-xs font-bold text-vibrant-teal hover:underline inline-flex items-center gap-1"
                >
                  {t("g1SuitVedicLink")} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Can They Complement Each Other? */}
        <section className="bg-slate-100/70 border-2 border-slate-200 rounded-3xl p-6 md:p-8 space-y-3">
          <div className="flex items-center gap-2 text-vibrant-dark font-display font-black text-lg">
            <Target className="w-5 h-5 text-vibrant-teal shrink-0" />
            <h2>{t("g1ComplementTitle")}</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g1ComplementIntro")}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 text-xs font-bold text-slate-700">
            <div className="bg-white border border-slate-200 p-3 rounded-xl text-center w-full sm:w-auto flex-1">
              <span className="text-[10px] text-amber-700 uppercase block font-black">{t("g1ComplementStep1Badge")}</span>
              {t("g1ComplementStep1Text")}
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 rotate-90 sm:rotate-0 shrink-0" />
            <div className="bg-white border border-slate-200 p-3 rounded-xl text-center w-full sm:w-auto flex-1">
              <span className="text-[10px] text-teal-700 uppercase block font-black">{t("g1ComplementStep2Badge")}</span>
              {t("g1ComplementStep2Text")}
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 rotate-90 sm:rotate-0 shrink-0" />
            <div className="bg-white border border-slate-200 p-3 rounded-xl text-center w-full sm:w-auto flex-1">
              <span className="text-[10px] text-slate-600 uppercase block font-black">{t("g1ComplementStep3Badge")}</span>
              {t("g1ComplementStep3Text")}
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-medium pt-2">
            {t("g1ComplementOutro")}
          </p>
        </section>

        {/* 10. Questions Parents Commonly Ask (FAQs) */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <HelpCircle className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g1FaqSectionTitle")}
            </h2>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g1Faq1Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g1Faq1A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g1Faq2Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g1Faq2A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g1Faq3Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g1Faq3A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g1Faq4Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g1Faq4A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g1Faq5Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g1Faq5A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g1Faq6Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g1Faq6A")}
              </p>
            </div>
          </div>
        </section>

        {/* 11. Relationship with School Mathematics & Disclaimers */}
        <section className="bg-slate-100/60 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-vibrant-dark font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t("g1DisclaimerTitle")}</span>
          </div>
          <p className="leading-relaxed">
            {t("g1DisclaimerText")}
          </p>
        </section>

        {/* 12. Related AAA Programs & Decision Support */}
        <section className="bg-white border-4 border-vibrant-dark rounded-[32px] p-6 md:p-8 shadow-[8px_8px_0_0_#1A2E35] space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-vibrant-orange bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {t("g1CtaBadge")}
            </span>
            <h2 className="font-display font-black text-2xl text-vibrant-dark">
              {t("g1CtaTitle")}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
              {t("g1CtaDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <Link
              to="/programs/abacus"
              className="bg-slate-50 hover:bg-amber-50/60 border-2 border-slate-200 hover:border-vibrant-orange p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-orange">
                {t("g1CardAbacusTitle")}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                {t("g1CardAbacusAge")}
              </span>
            </Link>

            <Link
              to="/programs/vedic-maths"
              className="bg-slate-50 hover:bg-teal-50/60 border-2 border-slate-200 hover:border-vibrant-teal p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-teal">
                {t("g1CardVedicTitle")}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                {t("g1CardVedicAge")}
              </span>
            </Link>

            <Link
              to="/programs/school-maths"
              className="bg-slate-50 hover:bg-amber-50/60 border-2 border-slate-200 hover:border-amber-500 p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-amber-600">
                {t("g1CardSchoolTitle")}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                {t("g1CardSchoolAge")}
              </span>
            </Link>
          </div>

          {/* Action CTA */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium">
              <strong>{language === "mr" ? "केंद्राचा पत्ता: " : language === "hi" ? "केंद्र का पता: " : "Center Location: "}</strong>{t("g1LocationText")}
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
                <span>{t("g1BookDiscoveryBtn")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase px-4 py-3 rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-2"
              >
                <span>{t("g1ContactCenterBtn")}</span>
              </Link>
            </div>
          </div>
        </section>
      </article>
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="Abacus vs Vedic Maths Discovery"
        source="parent_guide_guideabacusvsvedicmaths"
      />
    </div>
  );
}