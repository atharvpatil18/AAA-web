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
  AlertTriangle, 
  ClipboardList, 
  GraduationCap 
} from "lucide-react";
import { trackPageView, trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";
import DemoBookingModal from "../components/DemoBookingModal";

export default function GuideWhySmartChildrenMakeSillyMathMistakes() {
  const { t, language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    trackPageView(
      "/parent-guides/why-smart-children-make-silly-math-mistakes", 
      "Why Children Make Calculation Mistakes | Arnav Abacus Academy"
    );
  }, []);

  // Article and BreadcrumbList Structured Data (strictly verified, zero PII, zero fabricated metrics)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Why Children Make Calculation Mistakes Even When They Understand the Concept",
    "description": "An educational guide for parents exploring why children make arithmetic errors despite understanding mathematical concepts, common points of procedural difficulty, and practical review routines.",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://aaa-web-b0h.pages.dev/"
    },
    "mainEntityOfPage": "https://aaa-web-b0h.pages.dev/parent-guides/why-smart-children-make-silly-math-mistakes"
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
        "name": t("g4BreadcrumbParent"),
        "item": "https://aaa-web-b0h.pages.dev/parent-guides"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": t("g4BreadcrumbCurrent"),
        "item": "https://aaa-web-b0h.pages.dev/parent-guides/why-smart-children-make-silly-math-mistakes"
      }
    ]
  };

  const errorLogRows = [
    {
      problem: t("g4Row1Col1"),
      answer: t("g4Row1Col2"),
      errorType: t("g4Row1Col3"),
      action: t("g4Row1Col4"),
    },
    {
      problem: t("g4Row2Col1"),
      answer: t("g4Row2Col2"),
      errorType: t("g4Row2Col3"),
      action: t("g4Row2Col4"),
    },
    {
      problem: t("g4Row3Col1"),
      answer: t("g4Row3Col2"),
      errorType: t("g4Row3Col3"),
      action: t("g4Row3Col4"),
    },
  ];

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
            {t("g4BreadcrumbParent")}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-800 font-bold truncate">
            {t("g4BreadcrumbCurrent")}
          </span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="bg-vibrant-dark text-white py-12 md:py-16 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Lightbulb className="w-3 h-3" /> {t("g4HeroBadge")}
            </span>
          </div>
          
          <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            {t("g4HeroTitle")}
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            {t("g4HeroSubtitle")}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-amber-300">
              {t("g4ReadTimeBadge")}
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-teal-300">
              {t("g4FoundationsBadge")}
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-slate-300">
              {t("g4PublisherBadge")}
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
            <h2>{t("g4ShortAnswerTitle")}</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g4ShortAnswerP1")}
          </p>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g4ShortAnswerP2")}
          </p>
          <p className="text-xs text-slate-600 italic pt-1 border-t border-amber-200/60 font-semibold">
            {t("g4ShortAnswerNote")}
          </p>
        </section>

        {/* 4. Conceptual Understanding vs. Procedural Execution */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Brain className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g4DistinctionTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g4DistinctionIntro")}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-white border-2 border-amber-300 p-6 rounded-3xl space-y-3 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full inline-block">
                {t("g4ConceptualBadge")}
              </span>
              <h3 className="font-bold text-base text-vibrant-dark">{t("g4ConceptualTitle")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g4ConceptualDesc")}
              </p>
            </div>

            <div className="bg-white border-2 border-teal-300 p-6 rounded-3xl space-y-3 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-full inline-block">
                {t("g4ProceduralBadge")}
              </span>
              <h3 className="font-bold text-base text-vibrant-dark">{t("g4ProceduralTitle")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g4ProceduralDesc")}
              </p>
            </div>
          </div>

          <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed font-medium">
            {t("g4DistinctionTakeaway")}
          </div>
        </section>

        {/* 5. Possible Sources of Calculation Errors */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g4SourcesTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g4SourcesIntro")}
          </p>

          <div className="space-y-3 pt-2">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g4Source1Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g4Source1Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g4Source2Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g4Source2Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g4Source3Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g4Source3Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g4Source4Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g4Source4Desc")}
              </p>
            </div>
          </div>
        </section>

        {/* 6. Concrete Problem Examples */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Lightbulb className="w-6 h-6 text-amber-500 shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g4ExamplesTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-600 font-medium">
            {t("g4ExamplesIntro")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2.5 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g4Ex1Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g4Ex1Correct")}
              </p>
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-[11px] text-rose-950 font-medium space-y-1">
                <strong>{t("g4Ex1SlipTitle")}</strong>
                <p>{t("g4Ex1SlipDesc")}</p>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2.5 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g4Ex2Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g4Ex2Correct")}
              </p>
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-[11px] text-rose-950 font-medium space-y-1">
                <strong>{t("g4Ex2SlipTitle")}</strong>
                <p>{t("g4Ex2SlipDesc")}</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 font-medium leading-relaxed">
            {t("g4ExamplesTakeaway")}
          </div>
        </section>

        {/* 7. Practical 6-Step Parent Routine */}
        <section className="bg-slate-100/70 border-2 border-slate-200 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark font-display font-black text-lg">
            <Target className="w-5 h-5 text-vibrant-orange shrink-0" />
            <h2>{t("g4RoutineTitle")}</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g4RoutineIntro")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-medium text-slate-700 pt-1">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">{t("g4Step1Title")}</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {t("g4Step1Desc")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">{t("g4Step2Title")}</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {t("g4Step2Desc")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">{t("g4Step3Title")}</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {t("g4Step3Desc")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">{t("g4Step4Title")}</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {t("g4Step4Desc")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">{t("g4Step5Title")}</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {t("g4Step5Desc")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">{t("g4Step6Title")}</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {t("g4Step6Desc")}
              </p>
            </div>
          </div>
        </section>

        {/* 8. Error-Review Template */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <ClipboardList className="w-6 h-6 text-vibrant-teal shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g4TemplateTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g4TemplateIntro")}
          </p>

          <div className="overflow-x-auto border-2 border-slate-200 rounded-3xl shadow-xs bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th scope="col" className="p-3.5 md:p-4 font-black text-slate-200 border-r border-slate-800">{t("g4Col1Head")}</th>
                  <th scope="col" className="p-3.5 md:p-4 font-black text-amber-300 border-r border-slate-800">{t("g4Col2Head")}</th>
                  <th scope="col" className="p-3.5 md:p-4 font-black text-teal-300 border-r border-slate-800">{t("g4Col3Head")}</th>
                  <th scope="col" className="p-3.5 md:p-4 font-black text-slate-200">{t("g4Col4Head")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {errorLogRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                    <td className="p-3.5 md:p-4 font-bold text-vibrant-dark border-r border-slate-100">
                      {row.problem}
                    </td>
                    <td className="p-3.5 md:p-4 text-rose-600 font-bold border-r border-slate-100">
                      {row.answer}
                    </td>
                    <td className="p-3.5 md:p-4 border-r border-slate-100">
                      {row.errorType}
                    </td>
                    <td className="p-3.5 md:p-4 leading-relaxed">
                      {row.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            {t("g4TemplateTakeaway")}
          </p>
        </section>

        {/* 9. How AAA Practice Supports Calculation Accuracy */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <GraduationCap className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g4AaaSupportTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g4AaaSupportIntro")}
          </p>
          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">{t("g4Aaa1Title")}</strong>
                {t("g4Aaa1Desc")}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">{t("g4Aaa2Title")}</strong>
                {t("g4Aaa2Desc")}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">{t("g4Aaa3Title")}</strong>
                {t("g4Aaa3Desc")}
              </div>
            </div>
          </div>
        </section>

        {/* 10. Parent FAQs */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <HelpCircle className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g4FaqTitle")}
            </h2>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g4Faq1Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g4Faq1A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g4Faq2Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g4Faq2A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g4Faq3Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g4Faq3A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g4Faq4Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g4Faq4A")}
              </p>
            </div>
          </div>
        </section>

        {/* 11. Educational Disclaimer */}
        <section className="bg-slate-100/60 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-vibrant-dark font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t("g4DisclaimerTitle")}</span>
          </div>
          <p className="leading-relaxed">
            {t("g4DisclaimerText")}
          </p>
        </section>

        {/* 12. Related Programs & Navigation */}
        <section className="bg-white border-4 border-vibrant-dark rounded-[32px] p-6 md:p-8 shadow-[8px_8px_0_0_#1A2E35] space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-vibrant-orange bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {t("g4CtaBadge")}
            </span>
            <h2 className="font-display font-black text-2xl text-vibrant-dark">
              {t("g4CtaTitle")}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
              {t("g4CtaDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <Link
              to="/programs/abacus"
              className="bg-slate-50 hover:bg-amber-50/60 border-2 border-slate-200 hover:border-vibrant-orange p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-orange">
                {t("g4CardAbacusTitle")}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                {t("g4CardAbacusDesc")}
              </span>
            </Link>

            <Link
              to="/programs/school-maths"
              className="bg-slate-50 hover:bg-amber-50/60 border-2 border-slate-200 hover:border-amber-500 p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-amber-600">
                {t("g4CardSchoolTitle")}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                {t("g4CardSchoolDesc")}
              </span>
            </Link>

            <Link
              to="/parent-guides/does-abacus-confuse-school-math"
              className="bg-slate-50 hover:bg-teal-50/60 border-2 border-slate-200 hover:border-vibrant-teal p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-teal">
                {t("g4CardHarmonyTitle")}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                {t("g4CardHarmonyDesc")}
              </span>
            </Link>
          </div>

          {/* Action CTA */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium">
              <strong>{language === "mr" ? "केंद्राचा पत्ता: " : language === "hi" ? "केंद्र का पता: " : "Center Location: "}</strong>{t("g4LocationText")}
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
                <span>{t("g4BookDiscoveryBtn")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase px-4 py-3 rounded-xl transition-all shadow-md inline-flex items-center justify-center gap-2"
              >
                <span>{t("g4ContactCenterBtn")}</span>
              </Link>
            </div>
          </div>
        </section>
      </article>
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="Calculation Accuracy Discovery"
        source="parent_guide_guidewhysmartchildrenmakesillymathmistakes"
      />
    </div>
  );
}