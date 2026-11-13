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
  HelpCircle,
  Clock,
  Zap,
  Target
} from "lucide-react";
import LeadForm from "../components/LeadForm";
import { trackProgramView, trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function ProgramVedicMaths() {
  const { t } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    trackProgramView("Vedic Maths", "canonical_program_hub");
  }, []);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Vedic Mathematics Program",
    "description": "High-speed mental calculation shortcuts, algebraic sutras, and accuracy checking habits for students aged 10+ in Wakad, Pune.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://aaa-web-b0h.pages.dev/"
    },
    "educationalCredentialAwarded": "Vedic Mathematics Course Certificate",
    "audience": {
      "@type": "Audience",
      "audienceType": "Students aged 10+ years (Class 5 to 10)"
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
        "name": "Vedic Mathematics Program",
        "item": "https://aaa-web-b0h.pages.dev/programs/vedic-maths"
      }
    ]
  };

  return (
    <div id="program-vedic-maths-page" className="bg-[#FFFDF9] min-h-screen">
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
          <span className="text-vibrant-dark font-bold">{t("progVedicBreadcrumb")}</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="bg-vibrant-dark text-white py-14 md:py-20 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-vibrant-teal/15 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[10px] font-black text-vibrant-teal bg-[#E0FAF5]/15 border border-vibrant-teal/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                {t("progVedicHeroBadge")}
              </span>
              <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
                {t("progVedicHeroTitle")}
              </h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                {t("progVedicHeroDesc")}
              </p>

              {/* Quick Spec Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-teal-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <Clock className="w-3.5 h-3.5" /> {t("progVedicSpecAge")}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-amber-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <Zap className="w-3.5 h-3.5" /> {t("progVedicSpecSutras")}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-sky-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <MapPin className="w-3.5 h-3.5" /> {t("progVedicSpecLoc")}
                </span>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    trackDemoClick("vedic_hero_discovery_cta");
                    setIsDemoModalOpen(true);
                  }}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-black text-xs uppercase px-6 py-3.5 rounded-full shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
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
                <span className="text-[10px] font-black text-vibrant-teal bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {t("progVedicLeadBadge")}
                </span>
                <h2 className="text-xl font-black text-vibrant-dark mt-2">
                  {t("progVedicLeadTitle")}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {t("progVedicLeadDesc")}
                </p>
              </div>
              <LeadForm sourceCampaign="programs_vedic_maths_page" defaultProgram="Vedic Maths" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Who is this program for? */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-black text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("progVedicWhoBadge")}
          </span>
          <h2 className="font-display font-black text-3xl text-vibrant-dark">
            {t("progVedicWhoTitle")}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            {t("progVedicWhoSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-vibrant-teal transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-black text-sm">
              {t("progVedicAge1Grade")}
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">{t("progVedicAge1Title")}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progVedicAge1Desc")}
            </p>
          </div>

          <div className="bg-white border-2 border-vibrant-teal/40 p-6 rounded-3xl space-y-3 shadow-md relative">
            <span className="absolute -top-3 right-4 bg-vibrant-teal text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {t("progVedicAge2Badge")}
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
              {t("progVedicAge2Grade")}
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">{t("progVedicAge2Title")}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progVedicAge2Desc")}
            </p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-vibrant-teal transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
              {t("progVedicAge3Grade")}
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">{t("progVedicAge3Title")}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progVedicAge3Desc")}
            </p>
          </div>
        </div>
      </section>

      {/* 4. What the Child Learns & How AAA Teaches */}
      <section className="py-14 md:py-18 bg-vibrant-cream border-y-4 border-vibrant-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-[10px] font-black text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                {t("progVedicMethodBadge")}
              </span>
              <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
                {t("progVedicMethodTitle")}
              </h2>
              <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
                {t("progVedicMethodSubtitle")}
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">{t("progVedicMethodP1Title")}</strong>
                    <span className="text-xs text-slate-600 font-medium">{t("progVedicMethodP1Desc")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">{t("progVedicMethodP2Title")}</strong>
                    <span className="text-xs text-slate-600 font-medium">{t("progVedicMethodP2Desc")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">{t("progVedicMethodP3Title")}</strong>
                    <span className="text-xs text-slate-600 font-medium">{t("progVedicMethodP3Desc")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">{t("progVedicMethodP4Title")}</strong>
                    <span className="text-xs text-slate-600 font-medium">{t("progVedicMethodP4Desc")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum Modules */}
            <div className="bg-white border-4 border-vibrant-dark p-6 md:p-8 rounded-[32px] shadow-[8px_8px_0_0_#1A2E35] space-y-4">
              <h3 className="font-display font-black text-lg text-vibrant-dark flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-vibrant-teal" />
                {t("progVedicModTitle")}
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                {t("progVedicModSub")}
              </p>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{t("progVedicMod1Title")}</span>
                  <span className="text-slate-500 font-medium">{t("progVedicMod1Desc")}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{t("progVedicMod2Title")}</span>
                  <span className="text-slate-500 font-medium">{t("progVedicMod2Desc")}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{t("progVedicMod3Title")}</span>
                  <span className="text-slate-500 font-medium">{t("progVedicMod3Desc")}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{t("progVedicMod4Title")}</span>
                  <span className="text-slate-500 font-medium">{t("progVedicMod4Desc")}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{t("progVedicMod5Title")}</span>
                  <span className="text-slate-500 font-medium">{t("progVedicMod5Desc")}</span>
                </div>
              </div>

              {/* Public Vedic Math Lab Discovery Card */}
              <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-2 border-teal-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
                <div className="space-y-0.5 text-center sm:text-left">
                  <span className="text-[9px] font-black text-teal-700 uppercase tracking-widest block">{t("progVedicLabBadge")}</span>
                  <h4 className="font-display font-black text-xs text-slate-900">{t("progVedicLabTitle")}</h4>
                  <p className="text-[11px] text-slate-600 font-medium">{t("progVedicLabDesc")}</p>
                </div>
                <Link
                  to="/vedic-maths-sutras"
                  className="bg-slate-900 hover:bg-teal-700 text-white text-[11px] font-bold px-3.5 py-2 rounded-xl transition-colors shadow-xs shrink-0 flex items-center gap-1.5"
                >
                  <span>{t("progVedicLabBtn")}</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-3.5 text-[11px] text-teal-900 font-semibold">
                {t("progVedicTip")}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Defensible Learning Outcomes */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-black text-vibrant-teal bg-[#E0FAF5] border border-vibrant-teal/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("progVedicOutBadge")}
          </span>
          <h2 className="font-display font-black text-3xl text-vibrant-dark">
            {t("progVedicOutTitle")}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            {t("progVedicOutSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">⚡</span>
            <h3 className="font-bold text-sm text-vibrant-dark">{t("progVedicOut1Title")}</h3>
            <p className="text-xs text-slate-600 font-medium">{t("progVedicOut1Desc")}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">🎯</span>
            <h3 className="font-bold text-sm text-vibrant-dark">{t("progVedicOut2Title")}</h3>
            <p className="text-xs text-slate-600 font-medium">{t("progVedicOut2Desc")}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">📝</span>
            <h3 className="font-bold text-sm text-vibrant-dark">{t("progVedicOut3Title")}</h3>
            <p className="text-xs text-slate-600 font-medium">{t("progVedicOut3Desc")}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">🧘</span>
            <h3 className="font-bold text-sm text-vibrant-dark">{t("progVedicOut4Title")}</h3>
            <p className="text-xs text-slate-600 font-medium">{t("progVedicOut4Desc")}</p>
          </div>
        </div>
      </section>

      {/* 6. Parent Questions / FAQ */}
      <section className="py-14 md:py-18 bg-slate-50 border-t-2 border-slate-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black text-vibrant-teal bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {t("progVedicFaqBadge")}
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-vibrant-dark">
              {t("progVedicFaqTitle")}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-vibrant-teal shrink-0" />
                {t("progVedicQ1")}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                {t("progVedicA1")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-vibrant-teal shrink-0" />
                {t("progVedicQ2")}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                {t("progVedicA2Part1")}<Link to="/parent-guides/abacus-vs-vedic-maths" className="text-vibrant-teal font-bold hover:underline">{t("progVedicA2Link")}</Link>{t("progVedicA2Part2")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-vibrant-teal shrink-0" />
                {t("progVedicQ3")}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                {t("progVedicA3")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Verified Trust & Location Context */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white border-4 border-vibrant-dark rounded-[32px] p-6 md:p-10 shadow-[8px_8px_0_0_#1A2E35] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[10px] font-black text-vibrant-teal bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {t("progVedicTrustBadge")}
            </span>
            <h3 className="font-display font-black text-2xl text-vibrant-dark">
              {t("progVedicTrustTitle")}
            </h3>
            <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
              {t("progVedicTrustDesc")}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-vibrant-teal" /> {t("progVedicTrustPill1")}
              </span>
              <span className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-amber-600" /> {t("progVedicTrustPill2")}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> {t("progVedicTrustPill3")}
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link
              to="/showcase"
              className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase px-5 py-3.5 rounded-2xl text-center shadow-md transition-all flex items-center justify-center gap-2"
            >
              {t("progVedicTrustBtnResults")} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="bg-vibrant-cream hover:bg-white text-vibrant-dark border-2 border-vibrant-dark font-black text-xs uppercase px-5 py-3.5 rounded-2xl text-center shadow-sm transition-all"
            >
              {t("progVedicTrustBtnVisit")}
            </Link>
          </div>

        </div>
      </section>

      {/* 8. Related Programs Navigation */}
      <section className="py-12 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-6">
          <h3 className="font-display font-black text-lg text-vibrant-dark">
            {t("progVedicRelTitle")}
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold">
            <Link
              to="/programs/abacus"
              className="bg-white border-2 border-slate-200 hover:border-vibrant-orange px-5 py-3 rounded-2xl text-vibrant-dark transition-all flex items-center gap-2 shadow-xs"
            >
              <span>{t("progVedicRelAbacus")}</span>
              <ArrowRight className="w-3.5 h-3.5 text-vibrant-orange" />
            </Link>
            <Link
              to="/programs/school-maths"
              className="bg-white border-2 border-slate-200 hover:border-vibrant-orange px-5 py-3 rounded-2xl text-vibrant-dark transition-all flex items-center gap-2 shadow-xs"
            >
              <span>{t("progVedicRelSchool")}</span>
              <ArrowRight className="w-3.5 h-3.5 text-vibrant-orange" />
            </Link>
            <Link
              to="/programs"
              className="bg-slate-800 text-white hover:bg-slate-900 px-5 py-3 rounded-2xl transition-all flex items-center gap-2 shadow-xs"
            >
              <span>{t("progVedicRelAll")}</span>
            </Link>
          </div>
        </div>
      </section>
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="Vedic Mathematics (Ages 9–14)"
        source="program_page_vedic_maths"
      />
    </div>
  );
}
