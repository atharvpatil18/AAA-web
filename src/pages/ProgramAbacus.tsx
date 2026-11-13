/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import DemoBookingModal from "../components/DemoBookingModal";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  ChevronRight,
  Brain,
  HelpCircle,
  Clock,
  Users,
  Download
} from "lucide-react";
import LeadForm from "../components/LeadForm";
import { trackProgramView, trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function ProgramAbacus() {
  const { language, t } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    trackProgramView("Abacus", "canonical_program_hub");
  }, []);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Abacus Learning Program",
    "description": "Japanese Soroban Abacus and mental arithmetic calculation program for children aged 4 to 14 years in Wakad, Pune.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://aaa-web-b0h.pages.dev/"
    },
    "educationalCredentialAwarded": "Course Level Certificate (Levels 1 to 8)",
    "audience": {
      "@type": "Audience",
      "audienceType": "Children aged 4 to 14 years"
    }
  };

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
        "name": "Programs",
        "item": "https://aaa-web-b0h.pages.dev/programs"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Abacus Learning Program",
        "item": "https://aaa-web-b0h.pages.dev/programs/abacus"
      }
    ]
  };

  return (
    <div id="program-abacus-page" className="bg-[#FFFDF9] min-h-screen">
      {/* Course & Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="bg-slate-100/80 border-b border-slate-200 py-2.5 px-4 md:px-8 text-xs font-semibold text-slate-600">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 flex-wrap">
          <Link to="/" className="hover:text-vibrant-orange transition-colors">{t("navHome")}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/programs" className="hover:text-vibrant-orange transition-colors">{t("navPrograms")}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-vibrant-dark font-bold">{t("progAbacusBreadcrumb")}</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="bg-vibrant-dark text-white py-14 md:py-20 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-vibrant-gold/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[10px] font-black text-vibrant-gold bg-[#FFF5CC]/15 border border-vibrant-gold/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                {t("progAbacusHeroBadge")}
              </span>
              <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
                {t("progAbacusHeroTitle")}
              </h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                {t("progAbacusHeroDesc")}
              </p>

              {/* Quick Spec Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-amber-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <Clock className="w-3.5 h-3.5" /> {t("progAbacusSpecAge")}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-emerald-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> {t("progAbacusSpecPeak")}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-sky-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <MapPin className="w-3.5 h-3.5" /> {t("progAbacusSpecLoc")}
                </span>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    trackDemoClick("abacus_hero_discovery_cta");
                    setIsDemoModalOpen(true);
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-black text-xs uppercase px-6 py-3.5 rounded-full shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{t("bookFreeDemo")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Academy Location Snippet */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-vibrant-orange shrink-0 mt-0.5" />
                <span>
                  <strong>{t("progAbacusLocLabel")}</strong> {t("progAbacusLocText")}
                </span>
              </div>
            </div>

            {/* Hero LeadForm Embed */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-vibrant-dark">
              <div className="mb-4">
                <span className="text-[10px] font-black text-vibrant-orange bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {t("progAbacusLeadBadge")}
                </span>
                <h2 className="text-xl font-black text-vibrant-dark mt-2">
                  {t("progAbacusLeadTitle")}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {t("progAbacusLeadDesc")}
                </p>
              </div>
              <LeadForm sourceCampaign="programs_abacus_page" defaultProgram="Abacus" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Who is this program for? */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-black text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("progAbacusWhoBadge")}
          </span>
          <h2 className="font-display font-black text-3xl text-vibrant-dark">
            {t("progAbacusWhoTitle")}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            {t("progAbacusWhoSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-vibrant-orange transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
              4–6
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">{t("progAbacusAgeCard1Title")}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progAbacusAgeCard1Desc")}
            </p>
          </div>

          <div className="bg-white border-2 border-vibrant-orange/40 p-6 rounded-3xl space-y-3 shadow-md relative">
            <span className="absolute -top-3 right-4 bg-vibrant-orange text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {t("progAbacusAgeCard2Badge")}
            </span>
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-vibrant-orange flex items-center justify-center font-black text-sm">
              5–9
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">{t("progAbacusAgeCard2Title")}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progAbacusAgeCard2Desc")}
            </p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-vibrant-orange transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black text-sm">
              10–14
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">{t("progAbacusAgeCard3Title")}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progAbacusAgeCard3Desc")}
            </p>
          </div>
        </div>
      </section>

      {/* 4. What the Child Learns & How AAA Teaches */}
      <section className="py-14 md:py-18 bg-vibrant-cream border-y-4 border-vibrant-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                {t("progAbacusMethodBadge")}
              </span>
              <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
                {t("progAbacusMethodTitle")}
              </h2>
              <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
                {t("progAbacusMethodSubtitle")}
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">{t("progAbacusMethodP1Title")}</strong>
                    <span className="text-xs text-slate-600 font-medium">{t("progAbacusMethodP1Desc")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">{t("progAbacusMethodP2Title")}</strong>
                    <span className="text-xs text-slate-600 font-medium">{t("progAbacusMethodP2Desc")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">{t("progAbacusMethodP3Title")}</strong>
                    <span className="text-xs text-slate-600 font-medium">{t("progAbacusMethodP3Desc")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">{t("progAbacusMethodP4Title")}</strong>
                    <span className="text-xs text-slate-600 font-medium">{t("progAbacusMethodP4Desc")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progressive Level Table */}
            <div className="bg-white border-4 border-vibrant-dark p-6 md:p-8 rounded-[32px] shadow-[8px_8px_0_0_#1A2E35] space-y-4">
              <h3 className="font-display font-black text-lg text-vibrant-dark flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-vibrant-orange" />
                {t("progAbacusProgTitle")}
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                {t("progAbacusProgSub")}
              </p>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{t("progAbacusLevelJunior")}</span>
                  <span className="text-slate-500 font-medium">{t("progAbacusLevelJuniorDesc")}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{t("progAbacusLevelRunner13")}</span>
                  <span className="text-slate-500 font-medium">{t("progAbacusLevelRunner13Desc")}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{t("progAbacusLevelRunner46")}</span>
                  <span className="text-slate-500 font-medium">{t("progAbacusLevelRunner46Desc")}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{t("progAbacusLevelMaster78")}</span>
                  <span className="text-slate-500 font-medium">{t("progAbacusLevelMaster78Desc")}</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-[11px] text-amber-900 font-semibold">
                {t("progAbacusMicroTip")}
              </div>

              {/* Public Abacus Lab Discovery Card */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                <div className="space-y-0.5 text-center sm:text-left">
                  <span className="text-[9px] font-black text-orange-600 uppercase tracking-widest block">{t("progAbacusLabBadge")}</span>
                  <h4 className="font-display font-black text-xs text-slate-900">{t("progAbacusLabTitle")}</h4>
                  <p className="text-[11px] text-slate-600 font-medium">{t("progAbacusLabDesc")}</p>
                </div>
                <Link
                  to="/abacus-simulator"
                  className="bg-slate-900 hover:bg-orange-600 text-white text-[11px] font-bold px-3.5 py-2 rounded-xl transition-colors shadow-xs shrink-0 flex items-center gap-1.5"
                >
                  <span>{t("progAbacusLabBtn")}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <button
                onClick={() => {
                  import("../lib/brochure").then(({ generateBrochurePDF }) => {
                    generateBrochurePDF(language);
                  });
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-vibrant-orange hover:bg-orange-600 text-white font-black text-xs rounded-2xl border-2 border-vibrant-dark shadow-[3px_3px_0_0_#1A2E35] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer uppercase tracking-wider"
              >
                <Download className="w-4 h-4" />
                {t("progAbacusDownloadBtn")}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Defensible Educational Outcomes */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-black text-vibrant-orange bg-[#FFF0E0] border border-[#FFD8B1] px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("progAbacusOutcomeBadge")}
          </span>
          <h2 className="font-display font-black text-3xl text-vibrant-dark">
            {t("progAbacusOutcomeTitle")}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            {t("progAbacusOutcomeSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">🧠</span>
            <h3 className="font-bold text-sm text-vibrant-dark">{t("progAbacusOut1Title")}</h3>
            <p className="text-xs text-slate-600 font-medium">{t("progAbacusOut1Desc")}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">🖐️</span>
            <h3 className="font-bold text-sm text-vibrant-dark">{t("progAbacusOut2Title")}</h3>
            <p className="text-xs text-slate-600 font-medium">{t("progAbacusOut2Desc")}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">⏱️</span>
            <h3 className="font-bold text-sm text-vibrant-dark">{t("progAbacusOut3Title")}</h3>
            <p className="text-xs text-slate-600 font-medium">{t("progAbacusOut3Desc")}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">✨</span>
            <h3 className="font-bold text-sm text-vibrant-dark">{t("progAbacusOut4Title")}</h3>
            <p className="text-xs text-slate-600 font-medium">{t("progAbacusOut4Desc")}</p>
          </div>
        </div>
      </section>

      {/* 6. Parent Questions / FAQ */}
      <section className="py-14 md:py-18 bg-slate-50 border-t-2 border-slate-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black text-vibrant-teal bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {t("progAbacusFaqBadge")}
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-vibrant-dark">
              {t("progAbacusFaqTitle")}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-vibrant-orange shrink-0" />
                {t("progAbacusQ1")}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                {t("progAbacusA1Part1")}<Link to="/parent-guides/ideal-age-to-start-abacus" className="text-vibrant-orange font-bold hover:underline">{t("progAbacusA1Link1")}</Link>{t("progAbacusA1Part2")}<Link to="/parent-guides/abacus-vs-vedic-maths" className="text-vibrant-orange font-bold hover:underline">{t("progAbacusA1Link2")}</Link>{t("progAbacusA1Part3")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-vibrant-orange shrink-0" />
                {t("progAbacusQ2")}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                {t("progAbacusA2Part1")}<Link to="/parent-guides/does-abacus-confuse-school-math" className="text-vibrant-orange font-bold hover:underline">{t("progAbacusA2Link")}</Link>{t("progAbacusA2Part2")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-vibrant-orange shrink-0" />
                {t("progAbacusQ3")}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                {t("progAbacusA3")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-vibrant-orange shrink-0" />
                {t("progAbacusQ4")}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                {t("progAbacusA4")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Verified Trust & Location Context */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white border-4 border-vibrant-dark rounded-[32px] p-6 md:p-10 shadow-[8px_8px_0_0_#1A2E35] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[10px] font-black text-vibrant-orange bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {t("progAbacusTrustBadge")}
            </span>
            <h3 className="font-display font-black text-2xl text-vibrant-dark">
              {t("progAbacusTrustTitle")}
            </h3>
            <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
              {t("progAbacusTrustDesc")}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-vibrant-gold" /> {t("progAbacusTrustPill1")}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-vibrant-teal" /> {t("progAbacusTrustPill2")}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> {t("progAbacusTrustPill3")}
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link
              to="/showcase"
              className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase px-5 py-3.5 rounded-2xl text-center shadow-md transition-all flex items-center justify-center gap-2"
            >
              {t("progAbacusTrustBtnShowcase")} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="bg-vibrant-cream hover:bg-white text-vibrant-dark border-2 border-vibrant-dark font-black text-xs uppercase px-5 py-3.5 rounded-2xl text-center shadow-sm transition-all"
            >
              {t("progAbacusTrustBtnDirections")}
            </Link>
          </div>

        </div>
      </section>

      {/* 8. Related Programs Navigation */}
      <section className="py-12 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-6">
          <h3 className="font-display font-black text-lg text-vibrant-dark">
            {t("progAbacusRelTitle")}
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold">
            <Link
              to="/programs/vedic-maths"
              className="bg-white border-2 border-slate-200 hover:border-vibrant-orange px-5 py-3 rounded-2xl text-vibrant-dark transition-all flex items-center gap-2 shadow-xs"
            >
              <span>{t("progAbacusRelVedic")}</span>
              <ArrowRight className="w-3.5 h-3.5 text-vibrant-orange" />
            </Link>
            <Link
              to="/programs/school-maths"
              className="bg-white border-2 border-slate-200 hover:border-vibrant-orange px-5 py-3 rounded-2xl text-vibrant-dark transition-all flex items-center gap-2 shadow-xs"
            >
              <span>{t("progAbacusRelSchool")}</span>
              <ArrowRight className="w-3.5 h-3.5 text-vibrant-orange" />
            </Link>
            <Link
              to="/programs"
              className="bg-slate-800 text-white hover:bg-slate-900 px-5 py-3 rounded-2xl transition-all flex items-center gap-2 shadow-xs"
            >
              <span>{t("progAbacusRelAll")}</span>
            </Link>
          </div>
        </div>
      </section>
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="Abacus Mathematics (Ages 4.5–9)"
        source="program_page_abacus"
      />
    </div>
  );
}
