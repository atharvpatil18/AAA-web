/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  Zap, 
  Calculator, 
  Target, 
  BookOpen, 
  Brain, 
  CheckCircle2, 
  Calendar 
} from "lucide-react";
import VedicMathDemo from "../components/VedicMathDemo";
import DemoBookingModal from "../components/DemoBookingModal";
import { trackPageView, trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function LabVedicMathSutras() {
  const { language, t } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    trackPageView(
      "/vedic-maths-sutras",
      "Interactive Vedic Maths Sutras | Fast Mental Calculation Tricks | AAA Pune"
    );
  }, []);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://aaa-web-b0h.pages.dev/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Interactive Labs",
        "item": "https://aaa-web-b0h.pages.dev/vedic-maths-sutras"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Vedic Maths Sutra Lab",
        "item": "https://aaa-web-b0h.pages.dev/vedic-maths-sutras"
      }
    ]
  };

  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "Interactive Vedic Mathematics Sutras",
    "description": "Step-by-step visual demonstration of authentic Vedic Sutras including Urdhva Tiryagbhyam and Ekadhikena with algebraic proofs.",
    "educationalLevel": "Ages 9 to 16 years (Class 5 to 10)",
    "learningResourceType": "Interactive Simulation",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://aaa-web-b0h.pages.dev"
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-vibrant-dark">
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }}
      />

      {/* Breadcrumb Navigation Bar */}
      <nav aria-label="Breadcrumb" className="bg-[#FAF7F2] border-b border-slate-200 py-3 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-vibrant-orange transition-colors">{t("labVedicBreadcrumbHome")}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-400">{t("labVedicBreadcrumbLabs")}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-vibrant-dark font-bold">{t("labVedicBreadcrumbSutras")}</span>
        </div>
      </nav>

      {/* Hero Header Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-vibrant-orange uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 fill-current" /> {t("labVedicHeroBadge")}
        </div>
        <h1 className="font-display font-black text-3xl md:text-5xl text-vibrant-dark tracking-tight leading-tight">
          {t("labVedicHeroTitle")}
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t("labVedicHeroSubtitle")}
        </p>
      </section>

      {/* Main Interactive Tool Container */}
      <main className="px-4 md:px-8 max-w-4xl mx-auto pb-16">
        <VedicMathDemo />
      </main>

      {/* Pedagogical Explanation & School Exam Integration Section */}
      <section className="py-16 bg-[#FAF7F2] border-t border-slate-200 px-4 md:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-vibrant-teal uppercase tracking-widest">
              {t("labVedicBenefitsBadge")}
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-vibrant-dark">
              {t("labVedicBenefitsTitle")}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {t("labVedicBenefitsDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-vibrant-orange">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-vibrant-dark">{t("labVedicBenefit1Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t("labVedicBenefit1Desc")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-vibrant-teal">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-vibrant-dark">{t("labVedicBenefit2Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t("labVedicBenefit2Desc")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-vibrant-dark">{t("labVedicBenefit3Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t("labVedicBenefit3Desc")}
              </p>
            </div>
          </div>

          {/* Call to Action Box */}
          <div className="bg-vibrant-dark text-white rounded-3xl p-8 md:p-10 border-2 border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-vibrant-gold uppercase tracking-wider block">
                {t("labVedicCtaBadge")}
              </span>
              <h3 className="font-display font-black text-xl md:text-2xl text-white">
                {t("labVedicCtaTitle")}
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                {t("labVedicCtaDesc")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={() => {
                  trackDemoClick("vedic_lab_cta");
                  setIsDemoModalOpen(true);
                }}
                className="w-full sm:w-auto bg-vibrant-teal hover:bg-vibrant-teal/90 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md active:translate-y-0.5 cursor-pointer text-center"
              >
                {t("labVedicCtaBookBtn")}
              </button>
              <Link
                to="/programs/vedic-maths"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>{t("labVedicCtaLevelsBtn")}</span> <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Booking Modal Bridge */}
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="Vedic Mathematics Assessment"
        source="vedic_lab_page"
      />
    </div>
  );
}
