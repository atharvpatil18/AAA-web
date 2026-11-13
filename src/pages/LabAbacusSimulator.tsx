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
  Brain, 
  Eye, 
  Target, 
  ShieldCheck, 
  Calendar, 
  MessageCircle, 
  Layers, 
  HelpCircle 
} from "lucide-react";
import InteractiveAbacus from "../components/InteractiveAbacus";
import DemoBookingModal from "../components/DemoBookingModal";
import { trackPageView, trackDemoClick, trackWhatsAppClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function LabAbacusSimulator() {
  const { language, t } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    trackPageView(
      "/abacus-simulator",
      "Interactive Soroban Abacus Simulator | Free Online Abacus Tool | AAA Pune"
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
        "item": "https://aaa-web-b0h.pages.dev/abacus-simulator"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Soroban Abacus Simulator",
        "item": "https://aaa-web-b0h.pages.dev/abacus-simulator"
      }
    ]
  };

  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "name": "Interactive Soroban Abacus Simulator",
    "description": "Authentic Japanese 1:4 Soroban abacus simulator with 7 place-value rods and Photographic Memory Flashcard challenge.",
    "educationalLevel": "Ages 4.5 to 14 years",
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
          <Link to="/" className="hover:text-vibrant-orange transition-colors">{t("labAbacusBreadcrumbHome")}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-400">{t("labAbacusBreadcrumbLabs")}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-vibrant-dark font-bold">{t("labAbacusBreadcrumbSimulator")}</span>
        </div>
      </nav>

      {/* Hero Header Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-vibrant-teal/10 border border-vibrant-teal/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-vibrant-teal uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 fill-current" /> {t("labAbacusHeroBadge")}
        </div>
        <h1 className="font-display font-black text-3xl md:text-5xl text-vibrant-dark tracking-tight leading-tight">
          {t("labAbacusHeroTitle")}
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t("labAbacusHeroSubtitle")}
        </p>
      </section>

      {/* Main Interactive Tool Container */}
      <main className="px-4 md:px-8 max-w-5xl mx-auto pb-16">
        <InteractiveAbacus onBookDemo={() => setIsDemoModalOpen(true)} />
      </main>

      {/* Pedagogical Explanation & Neuroscience Section */}
      <section className="py-16 bg-[#FAF7F2] border-t border-slate-200 px-4 md:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-vibrant-orange uppercase tracking-widest">
              {t("labAbacusNeuroBadge")}
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-vibrant-dark">
              {t("labAbacusNeuroTitle")}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {t("labAbacusNeuroDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-vibrant-teal">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-vibrant-dark">{t("labAbacusNeuroPillar1Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t("labAbacusNeuroPillar1Desc")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-vibrant-orange">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-vibrant-dark">{t("labAbacusNeuroPillar2Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t("labAbacusNeuroPillar2Desc")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-vibrant-dark">{t("labAbacusNeuroPillar3Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t("labAbacusNeuroPillar3Desc")}
              </p>
            </div>
          </div>

          {/* Call to Action Box */}
          <div className="bg-vibrant-dark text-white rounded-3xl p-8 md:p-10 border-2 border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-vibrant-gold uppercase tracking-wider block">
                {t("labAbacusCtaBadge")}
              </span>
              <h3 className="font-display font-black text-xl md:text-2xl text-white">
                {t("labAbacusCtaTitle")}
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                {t("labAbacusCtaDesc")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={() => {
                  trackDemoClick("abacus_lab_cta");
                  setIsDemoModalOpen(true);
                }}
                className="w-full sm:w-auto bg-vibrant-orange hover:bg-vibrant-orange/90 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md active:translate-y-0.5 cursor-pointer text-center"
              >
                {t("labAbacusCtaBookBtn")}
              </button>
              <Link
                to="/programs/abacus"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>{t("labAbacusCtaCurriculumBtn")}</span> <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Booking Modal Bridge */}
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="Abacus Mathematics Discovery Session"
        source="abacus_lab_page"
      />
    </div>
  );
}
