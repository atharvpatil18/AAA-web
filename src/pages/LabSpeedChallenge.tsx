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
  Trophy, 
  Clock, 
  Zap, 
  Brain, 
  HelpCircle, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";
import SpeedChallengeWidget from "../components/SpeedChallengeWidget";
import { trackPageView } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function LabSpeedChallenge() {
  const { language, t } = useLanguage();

  useEffect(() => {
    trackPageView(
      "/speed-challenge",
      "Child Mental Math Speed Challenge | 45-Second Agility Test | AAA Pune"
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
        "item": "https://aaa-web-b0h.pages.dev/speed-challenge"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Mental Math Speed Challenge",
        "item": "https://aaa-web-b0h.pages.dev/speed-challenge"
      }
    ]
  };

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "Arnav 45-Second Speed Challenge",
    "description": "Adaptive 45-second arithmetic speed drill testing mental arithmetic speed across ages 4 to 16.",
    "educationalLevel": "Ages 4 to 16 years",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
      />

      {/* Breadcrumb Navigation Bar */}
      {/* Breadcrumb Navigation Bar */}
      <nav aria-label="Breadcrumb" className="bg-[#FAF7F2] border-b border-slate-200 py-3 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center gap-1.5 text-xs text-slate-500 font-medium overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-vibrant-orange transition-colors">{t("labSpeedBreadcrumbHome")}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-400">{t("labSpeedBreadcrumbLabs")}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-vibrant-dark font-bold">{t("labSpeedBreadcrumbSpeed")}</span>
        </div>
      </nav>

      {/* Hero Header Section */}
      <section className="py-12 md:py-16 px-4 md:px-8 max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-700 uppercase tracking-wider">
          <Trophy className="w-3.5 h-3.5 fill-current" /> {t("labSpeedHeroBadge")}
        </div>
        <h1 className="font-display font-black text-3xl md:text-5xl text-vibrant-dark tracking-tight leading-tight">
          {t("labSpeedHeroTitle")}
        </h1>
        <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t("labSpeedHeroSubtitle")}
        </p>
      </section>

      {/* Main Interactive Tool Container */}
      <main className="px-4 md:px-8 max-w-2xl mx-auto pb-16">
        <SpeedChallengeWidget />
      </main>

      {/* Diagnostic Context & Parent Guide Section */}
      <section className="py-16 bg-[#FAF7F2] border-t border-slate-200 px-4 md:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-vibrant-orange uppercase tracking-widest">
              {t("labSpeedBenchBadge")}
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-vibrant-dark">
              {t("labSpeedBenchTitle")}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {t("labSpeedBenchDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-vibrant-orange">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-vibrant-dark">{t("labSpeedPillar1Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t("labSpeedPillar1Desc")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-vibrant-teal">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-vibrant-dark">{t("labSpeedPillar2Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t("labSpeedPillar2Desc")}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-vibrant-dark">{t("labSpeedPillar3Title")}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t("labSpeedPillar3Desc")}
              </p>
            </div>
          </div>

          {/* Call to Action Box */}
          <div className="bg-vibrant-dark text-white rounded-3xl p-8 md:p-10 border-2 border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold text-vibrant-gold uppercase tracking-wider block">
                {t("labSpeedCtaBadge")}
              </span>
              <h3 className="font-display font-black text-xl md:text-2xl text-white">
                {t("labSpeedCtaTitle")}
              </h3>
              <p className="text-xs text-slate-300 max-w-xl">
                {t("labSpeedCtaDesc")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <a
                href={
                  language === "hi"
                    ? "https://wa.me/919021924968?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87%20%E0%A4%85%E0%A4%B0%E0%A5%8D%E0%A4%A3%E0%A4%B5%20%E0%A4%8F%E0%A4%AC%E0%A4%BE%E0%A4%95%E0%A4%B8%20%E0%A4%8F%E0%A4%95%E0%A5%87%E0%A4%A1%E0%A4%AE%E0%A5%80!%20%E0%A4%B9%E0%A4%AE%E0%A4%A8%E0%A5%87%20%E0%A4%B8%E0%A5%8D%E0%A4%AA%E0%A5%80%E0%A4%A1%20%E0%A4%9A%E0%A5%88%E0%A4%B2%E0%A5%87%E0%A4%82%E0%A4%9C%20%E0%A4%96%E0%A5%87%E0%A4%B2%E0%A4%BE%20%E0%A4%94%E0%A4%B0%20%E0%A4%A8%E0%A5%87%E0%A4%B9%E0%A4%BE%20%E0%A4%AA%E0%A4%BE%E0%A4%9F%E0%A4%BF%E0%A4%B2%20%E0%A4%95%E0%A5%87%20%E0%A4%B8%E0%A4%BE%E0%A4%A5%20%E0%A5%A7-%E0%A4%91%E0%A4%A8-%E0%A5%A7%20%E0%A4%AE%E0%A5%82%E0%A4%B2%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%82%E0%A4%95%E0%A4%A8%20%E0%A4%B8%E0%A4%A4%E0%A5%8D%E0%A4%B0%20%E0%A4%AC%E0%A5%81%E0%A4%95%20%E0%A4%95%E0%A4%B0%E0%A4%A8%E0%A4%BE%20%E0%A4%9A%E0%A4%BE%E0%A4%B9%E0%A4%A4%E0%A5%87%20%E0%A4%B9%E0%A5%88%E0%A4%82%E0%A5%A4"
                    : language === "mr"
                    ? "https://wa.me/919021924968?text=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%BE%E0%A4%B0%20%E0%A4%85%E0%A4%B0%E0%A5%8D%E0%A4%A3%E0%A4%B5%20%E0%A5%A7%E0%A4%AC%E0%A5%85%E0%A4%95%E0%A4%B8%20%E0%A4%85%E0%A4%95%E0%A5%85%E0%A4%A1%E0%A4%AE%E0%A5%80!%20%E0%A4%86%E0%A4%AE%E0%A5%8D%E0%A4%B9%E0%A5%80%20%E0%A4%B8%E0%A5%8D%E0%A4%AA%E0%A5%80%E0%A4%A1%20%E0%A4%AE%E0%A5%85%E0%A4%A5%20%E0%A4%9A%E0%A5%85%E0%A4%B2%E0%A5%87%E0%A4%82%E0%A4%9C%20%E0%A4%96%E0%A5%87%E0%A4%B3%E0%A4%B2%E0%A5%8B%20%E0%A4%86%E0%A4%A3%E0%A4%BF%20%E0%A4%A8%E0%A5%87%E0%A4%B9%E0%A4%BE%20%E0%A4%AA%E0%A4%BE%E0%A4%9F%E0%A5%80%E0%A4%B2%20%E0%A4%AF%E0%A4%BE%E0%A4%82%E0%A4%9A%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%B8%E0%A5%8B%E0%A4%AC%E0%A4%A4%20%E0%A5%A7-%E0%A4%91%E0%A4%A8-%E0%A5%A7%20%E0%A4%AE%E0%A5%82%E0%A4%B2%E0%A5%8D%E0%A4%AF%E0%A4%AE%E0%A4%BE%E0%A4%AA%E0%A4%A8%20%E0%A4%B8%E0%A4%A4%E0%A5%8D%E0%A4%B0%20%E0%A4%AC%E0%A5%81%E0%A4%95%20%E0%A4%95%E0%A4%B0%E0%A4%BE%E0%A4%AF%E0%A4%9A%E0%A5%87%20%E0%A4%86%E0%A4%B9%E0%A5%87."
                    : "https://wa.me/919021924968?text=Hello%20Arnav%20Abacus%20Academy!%20We%20tried%20your%20Speed%20Math%20Challenge%20and%20would%20love%20to%20book%20a%20Free%201-on-1%20Diagnostic%20Session%20with%20Neha%20Patil."
                }
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md active:translate-y-0.5 text-center"
              >
                {t("labSpeedCtaWhatsAppBtn")}
              </a>
              <Link
                to="/programs"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>{t("labSpeedCtaProgramsBtn")}</span> <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
