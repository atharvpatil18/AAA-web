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
  GraduationCap,
  MessageSquare
} from "lucide-react";
import { trackPageView, trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";
import DemoBookingModal from "../components/DemoBookingModal";

export default function GuideDoesAbacusConfuseSchoolMath() {
  const { t, language } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    trackPageView(
      "/parent-guides/does-abacus-confuse-school-math", 
      "Does Abacus Confuse School Maths? A Parent Guide | Arnav Abacus Academy"
    );
  }, []);

  // Article and BreadcrumbList Structured Data (No fabricated ratings/dates/author credentials)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Does Abacus Confuse School Maths? An Educational Guide for Parents",
    "description": "An objective guide explaining the relationship between Abacus bead visualization and written school arithmetic, addressing common parent questions about calculation methods and school working steps.",
    "publisher": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://aaa-web-b0h.pages.dev/"
    },
    "mainEntityOfPage": "https://aaa-web-b0h.pages.dev/parent-guides/does-abacus-confuse-school-math"
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
        "name": t("g2BreadcrumbParent"),
        "item": "https://aaa-web-b0h.pages.dev/parent-guides"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": t("g2BreadcrumbCurrent"),
        "item": "https://aaa-web-b0h.pages.dev/parent-guides/does-abacus-confuse-school-math"
      }
    ]
  };

  return (
    <div id="guide-does-abacus-confuse-school-math-page" className="bg-[#FFFDF9] min-h-screen">
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
          <Link to="/parent-guides" className="hover:text-vibrant-orange transition-colors">{t("g2BreadcrumbParent")}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-vibrant-dark font-bold">{t("g2BreadcrumbCurrent")}</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="bg-vibrant-dark text-white py-12 md:py-16 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Lightbulb className="w-3 h-3" /> {t("g2HeroBadge")}
            </span>
          </div>
          
          <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl tracking-tight leading-tight">
            {t("g2HeroTitle")}
          </h1>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
            {t("g2HeroSubtitle")}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-amber-300">
              {t("g2ReadTimeBadge")}
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-teal-300">
              {t("g2PrimaryFocusBadge")}
            </span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-lg font-semibold text-slate-300">
              {t("g2PublisherBadge")}
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
            <h2>{t("g2ShortAnswerTitle")}</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g2ShortAnswerP1")}
          </p>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g2ShortAnswerP2")}
          </p>
          <ul className="text-xs md:text-sm text-slate-700 space-y-2 font-medium pl-4 list-disc">
            <li>
              {t("g2ShortAnswerB1")}
            </li>
            <li>
              {t("g2ShortAnswerB2")}
            </li>
          </ul>
          <p className="text-xs text-slate-600 italic pt-1 border-t border-amber-200/60 font-semibold">
            {t("g2ShortAnswerNote")}
          </p>
        </section>

        {/* 4. Educational Accuracy: Distinguishing the Three Concepts */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <GraduationCap className="w-6 h-6 text-vibrant-teal shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g2DistinguishTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g2DistinguishIntro")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-teal bg-teal-50 px-2 py-0.5 rounded">{t("g2Concept1Badge")}</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g2Concept1Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g2Concept1Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-orange bg-amber-50 px-2 py-0.5 rounded">{t("g2Concept2Badge")}</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g2Concept2Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g2Concept2Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{t("g2Concept3Badge")}</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g2Concept3Title")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g2Concept3Desc")}
              </p>
            </div>
          </div>

          <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 leading-relaxed font-medium">
            {t("g2ConceptKeyInsight")}
          </div>
        </section>

        {/* 5. What Children Learn Through Abacus vs School Math */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Brain className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g2CompareTitle")}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-amber-300 p-6 rounded-3xl space-y-3 shadow-xs">
              <h3 className="font-bold text-base text-vibrant-dark flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-vibrant-orange"></span>
                {t("g2CompareAbacusTitle")}
              </h3>
              <ul className="text-xs text-slate-600 space-y-2.5 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-vibrant-orange font-black">•</span>
                  <span>{t("g2CompareAbacusP1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-vibrant-orange font-black">•</span>
                  <span>{t("g2CompareAbacusP2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-vibrant-orange font-black">•</span>
                  <span>{t("g2CompareAbacusP3")}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border-2 border-teal-300 p-6 rounded-3xl space-y-3 shadow-xs">
              <h3 className="font-bold text-base text-vibrant-dark flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-vibrant-teal"></span>
                {t("g2CompareSchoolTitle")}
              </h3>
              <ul className="text-xs text-slate-600 space-y-2.5 font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-vibrant-teal font-black">•</span>
                  <span>{t("g2CompareSchoolP1")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-vibrant-teal font-black">•</span>
                  <span>{t("g2CompareSchoolP2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-vibrant-teal font-black">•</span>
                  <span>{t("g2CompareSchoolP3")}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Concrete Example */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <Lightbulb className="w-6 h-6 text-amber-500 shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g2ExampleTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-600 font-medium">
            {t("g2ExampleIntro")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="bg-white border-2 border-slate-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Conceptual Layer</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g2ExamplePlaceValueTitle")}</h3>
              <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
                {t("g2ExamplePlaceValueDesc")}
              </p>
            </div>

            <div className="bg-white border-2 border-teal-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-teal bg-teal-50 px-2 py-0.5 rounded">School Method</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g2ExampleSchoolTitle")}</h3>
              <div className="text-[11px] text-slate-600 font-medium space-y-1">
                <p>{t("g2ExampleSchoolDesc")}</p>
                <p className="text-[10px] text-slate-500 pt-1">{t("g2ExampleSchoolSub")}</p>
              </div>
            </div>

            <div className="bg-white border-2 border-amber-200 p-4 rounded-2xl space-y-2 shadow-xs">
              <span className="text-[10px] font-black uppercase tracking-wider text-vibrant-orange bg-amber-50 px-2 py-0.5 rounded">Abacus Method</span>
              <h3 className="font-bold text-xs text-vibrant-dark">{t("g2ExampleAbacusTitle")}</h3>
              <div className="text-[11px] text-slate-600 font-medium space-y-1">
                <p>{t("g2ExampleAbacusDesc")}</p>
                <p className="text-[10px] text-slate-500 pt-1">{t("g2ExampleAbacusSub")}</p>
              </div>
            </div>
          </div>

          <div className="bg-teal-50/60 border border-teal-200 rounded-2xl p-4 text-xs text-teal-950 font-medium leading-relaxed">
            {t("g2ExampleObservation")}
          </div>
        </section>

        {/* 7. Why Children May Experience Temporary Confusion */}
        <section className="space-y-4">
          <h2 className="font-display font-black text-xl md:text-2xl text-vibrant-dark">
            {t("g2UncertaintyTitle")}
          </h2>
          <p className="text-xs md:text-sm text-slate-600 font-medium">
            {t("g2UncertaintyIntro")}
          </p>

          <div className="space-y-3">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1.5 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">
                {t("g2Uncertainty1Title")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g2Uncertainty1Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1.5 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">
                {t("g2Uncertainty2Title")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g2Uncertainty2Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1.5 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">
                {t("g2Uncertainty3Title")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g2Uncertainty3Desc")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-1.5 shadow-xs">
              <h3 className="font-bold text-xs text-vibrant-dark">
                {t("g2Uncertainty4Title")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g2Uncertainty4Desc")}
              </p>
            </div>
          </div>
        </section>

        {/* 8. Practical Steps for Parents */}
        <section className="bg-slate-100/70 border-2 border-slate-200 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark font-display font-black text-lg">
            <Target className="w-5 h-5 text-vibrant-orange shrink-0" />
            <h2>{t("g2ParentActionTitle")}</h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g2ParentActionIntro")}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-700 pt-1">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">{t("g2Action1Title")}</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {t("g2Action1Desc")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">{t("g2Action2Title")}</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {t("g2Action2Desc")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">{t("g2Action3Title")}</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {t("g2Action3Desc")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-xs">
              <strong className="block text-vibrant-dark font-bold text-xs">{t("g2Action4Title")}</strong>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {t("g2Action4Desc")}
              </p>
            </div>
          </div>
        </section>

        {/* 9. How AAA Approaches This Question */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g2AaaApproachTitle")}
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
            {t("g2AaaApproachIntro")}
          </p>
          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">{t("g2Aaa1Title")}</strong> {t("g2Aaa1Desc")}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">{t("g2Aaa2Title")}</strong> {t("g2Aaa2Desc")}
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 font-medium">
                <strong className="block text-vibrant-dark font-bold">{t("g2Aaa3Title")}</strong> {t("g2Aaa3Desc")} <Link to="/programs/school-maths" className="text-vibrant-orange font-bold hover:underline">{t("g2Aaa3Link")}</Link>.
              </div>
            </div>
          </div>
        </section>

        {/* 10. Parent FAQs */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-vibrant-dark">
            <HelpCircle className="w-6 h-6 text-vibrant-orange shrink-0" />
            <h2 className="font-display font-black text-xl md:text-2xl">
              {t("g2FaqTitle")}
            </h2>
          </div>
          
          <div className="space-y-3">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g2Faq1Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g2Faq1A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g2Faq2Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g2Faq2A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g2Faq3Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g2Faq3A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g2Faq4Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g2Faq4A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g2Faq5Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g2Faq5A")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="font-bold text-sm text-vibrant-dark">
                {t("g2Faq6Q")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {t("g2Faq6A")}
              </p>
            </div>
          </div>
        </section>

        {/* 11. Educational Disclaimer */}
        <section className="bg-slate-100/60 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-vibrant-dark font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t("g2DisclaimerTitle")}</span>
          </div>
          <p className="leading-relaxed">
            {t("g2DisclaimerText")}
          </p>
        </section>

        {/* 12. Related AAA Learning Tracks */}
        <section className="bg-white border-4 border-vibrant-dark rounded-[32px] p-6 md:p-8 shadow-[8px_8px_0_0_#1A2E35] space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-black text-vibrant-orange bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {t("g2CtaBadge")}
            </span>
            <h2 className="font-display font-black text-2xl text-vibrant-dark">
              {t("g2CtaTitle")}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed font-medium">
              {t("g2CtaDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <Link
              to="/programs/abacus"
              className="bg-slate-50 hover:bg-amber-50/60 border-2 border-slate-200 hover:border-vibrant-orange p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-orange">
                {t("g2CardAbacusTitle")}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                {t("g2CardAbacusDesc")}
              </span>
            </Link>

            <Link
              to="/programs/school-maths"
              className="bg-slate-50 hover:bg-amber-50/60 border-2 border-slate-200 hover:border-amber-500 p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-amber-600">
                {t("g2CardSchoolTitle")}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                {t("g2CardSchoolDesc")}
              </span>
            </Link>

            <Link
              to="/parent-guides/abacus-vs-vedic-maths"
              className="bg-slate-50 hover:bg-teal-50/60 border-2 border-slate-200 hover:border-vibrant-teal p-4 rounded-2xl text-center transition-all group"
            >
              <span className="text-xs font-black text-vibrant-dark block group-hover:text-vibrant-teal">
                {t("g2CardCompareTitle")}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                {t("g2CardCompareDesc")}
              </span>
            </Link>
          </div>

          {/* Action CTA */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 font-medium">
              <strong>{language === "mr" ? "केंद्राचा पत्ता: " : language === "hi" ? "केंद्र का पता: " : "Center Location: "}</strong>{t("g2LocationText")}
            </div>
            <Link
              to="/contact"
              className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-md shrink-0 inline-flex items-center gap-2"
            >
              <span>{t("g2ConsultNehaBtn")}</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </article>
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="School Math Harmony Discovery"
        source="parent_guide_guidedoesabacusconfuseschoolmath"
      />
    </div>
  );
}