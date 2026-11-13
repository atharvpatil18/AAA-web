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
  GraduationCap,
  Trophy
} from "lucide-react";
import LeadForm from "../components/LeadForm";
import { trackProgramView, trackDemoClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function ProgramSchoolMaths() {
  const { t } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    trackProgramView("School Maths", "canonical_program_hub");
  }, []);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "School Maths & Competitive Excellence Program",
    "description": "Comprehensive school mathematics support, CBSE/ICSE board curriculum clarity, and Olympiad/IPM competitive preparation in Wakad, Pune.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://aaa-web-b0h.pages.dev/"
    },
    "educationalCredentialAwarded": "School Math & Competitive Prep Certificate",
    "audience": {
      "@type": "Audience",
      "audienceType": "Students in Class 1 to 10"
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
        "name": "School Maths & Competitive Excellence",
        "item": "https://aaa-web-b0h.pages.dev/programs/school-maths"
      }
    ]
  };

  return (
    <div id="program-school-maths-page" className="bg-[#FFFDF9] min-h-screen">
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
          <span className="text-vibrant-dark font-bold">{t("progSchoolBreadcrumb")}</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="bg-vibrant-dark text-white py-14 md:py-20 border-b-4 border-vibrant-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-amber-500/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[10px] font-black text-amber-300 bg-amber-400/15 border border-amber-400/30 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                Curriculum Mastery & Competitive Edge
              </span>
              <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
                School Maths Coaching & Olympiad Prep in Wakad
              </h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                {t("progSchoolHeroDesc")}
              </p>

              {/* Quick Spec Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-amber-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <GraduationCap className="w-3.5 h-3.5" /> {t("progSchoolSpecGrade")}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-emerald-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" /> CBSE, ICSE & State Board
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-sky-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <MapPin className="w-3.5 h-3.5" /> {t("progSchoolSpecLoc")}
                </span>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    trackDemoClick("school_hero_discovery_cta");
                    setIsDemoModalOpen(true);
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-black text-xs uppercase px-6 py-3.5 rounded-full shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>{t("progSchoolBookDiscovery")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Academy Location Snippet */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-vibrant-orange shrink-0 mt-0.5" />
                <span>
                  <strong>{t("progSchoolLocTitle")}</strong> {t("progSchoolLocDesc")}
                </span>
              </div>
            </div>

            {/* Hero LeadForm Embed */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border-4 border-vibrant-dark">
              <div className="mb-4">
                <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {t("progSchoolLeadBadge")}
                </span>
                <h2 className="text-xl font-black text-vibrant-dark mt-2">
                  {t("progSchoolLeadTitle")}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {t("progSchoolLeadDesc")}
                </p>
              </div>
              <LeadForm sourceCampaign="programs_school_maths_page" defaultProgram="School Math" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Who is this program for? */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("progSchoolWhoBadge")}
          </span>
          <h2 className="font-display font-black text-3xl text-vibrant-dark">
            {t("progSchoolWhoTitle")}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            {t("progSchoolWhoSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-amber-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
              {t("progSchoolStage1Grade")}
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">{t("progSchoolStage1Title")}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progSchoolStage1Desc")}
            </p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-amber-400 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-black text-sm">
              {t("progSchoolStage2Grade")}
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">{t("progSchoolStage2Title")}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progSchoolStage2Desc")}
            </p>
          </div>

          <div className="bg-white border-2 border-amber-300 p-6 rounded-3xl space-y-3 shadow-md relative">
            <span className="absolute -top-3 right-4 bg-amber-600 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {t("progSchoolStage3Badge")}
            </span>
            <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-800 flex items-center justify-center font-black text-sm">
              {t("progSchoolStage3Grade")}
            </div>
            <h3 className="font-display font-black text-base text-vibrant-dark">{t("progSchoolStage3Title")}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progSchoolStage3Desc")}
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
                {t("progSchoolMethodBadge")}
              </span>
              <h2 className="font-display font-black text-3xl text-vibrant-dark leading-tight">
                {t("progSchoolMethodTitle")}
              </h2>
              <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
                {t("progSchoolMethodSubtitle")}
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">{t("progSchoolMethodP1Title")}</strong>
                    <span className="text-xs text-slate-600 font-medium">{t("progSchoolMethodP1Desc")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">{t("progSchoolMethodP2Title")}</strong>
                    <span className="text-xs text-slate-600 font-medium">{t("progSchoolMethodP2Desc")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">{t("progSchoolMethodP3Title")}</strong>
                    <span className="text-xs text-slate-600 font-medium">{t("progSchoolMethodP3Desc")}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-vibrant-teal shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-black text-vibrant-dark">{t("progSchoolMethodP4Title")}</strong>
                    <span className="text-xs text-slate-600 font-medium">{t("progSchoolMethodP4Desc")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Curriculum Highlights Box */}
            <div className="bg-white border-4 border-vibrant-dark p-6 md:p-8 rounded-[32px] shadow-[8px_8px_0_0_#1A2E35] space-y-4">
              <h3 className="font-display font-black text-lg text-vibrant-dark flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                School & Competitive Pillars
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                {t("progSchoolPillarsSub")}
              </p>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{t("progSchoolPillars1Title")}</span>
                  <span className="text-slate-500 font-medium">{t("progSchoolPillars1Desc")}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{t("progSchoolPillars2Title")}</span>
                  <span className="text-slate-500 font-medium">{t("progSchoolPillars2Desc")}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{t("progSchoolPillars3Title")}</span>
                  <span className="text-slate-500 font-medium">{t("progSchoolPillars3Desc")}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{t("progSchoolPillars4Title")}</span>
                  <span className="text-slate-500 font-medium">{t("progSchoolPillars4Desc")}</span>
                </div>
                <div className="py-2.5 flex justify-between items-center">
                  <span className="font-bold text-slate-800">{t("progSchoolPillars5Title")}</span>
                  <span className="text-slate-500 font-medium">{t("progSchoolPillars5Desc")}</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-[11px] text-amber-900 font-semibold">
                {t("progSchoolPillarsTip")}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Defensible Learning Outcomes */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("progSchoolOutBadge")}
          </span>
          <h2 className="font-display font-black text-3xl text-vibrant-dark">
            {t("progSchoolOutTitle")}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            {t("progSchoolOutSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">📖</span>
            <h3 className="font-bold text-sm text-vibrant-dark">{t("progSchoolOut1Title")}</h3>
            <p className="text-xs text-slate-600 font-medium">{t("progSchoolOut1Desc")}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">✍️</span>
            <h3 className="font-bold text-sm text-vibrant-dark">{t("progSchoolOut2Title")}</h3>
            <p className="text-xs text-slate-600 font-medium">{t("progSchoolOut2Desc")}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">🏆</span>
            <h3 className="font-bold text-sm text-vibrant-dark">{t("progSchoolOut3Title")}</h3>
            <p className="text-xs text-slate-600 font-medium">{t("progSchoolOut3Desc")}</p>
          </div>

          <div className="bg-white border-2 border-slate-200 p-5 rounded-2xl space-y-2">
            <span className="text-2xl">😊</span>
            <h3 className="font-bold text-sm text-vibrant-dark">{t("progSchoolOut4Title")}</h3>
            <p className="text-xs text-slate-600 font-medium">{t("progSchoolOut4Desc")}</p>
          </div>
        </div>
      </section>

      {/* 6. Parent Questions / FAQ */}
      <section className="py-14 md:py-18 bg-slate-50 border-t-2 border-slate-200">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {t("progSchoolFaqBadge")}
            </span>
            <h2 className="font-display font-black text-2xl md:text-3xl text-vibrant-dark">
              {t("progSchoolFaqTitle")}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                {t("progSchoolQ1")}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                {t("progSchoolA1")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                {t("progSchoolQ2")}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                {t("progSchoolA2")}
              </p>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 space-y-2">
              <h3 className="font-bold text-sm text-vibrant-dark flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                {t("progSchoolQ3")}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed pl-6">
                {t("progSchoolA3Part1")}<Link to="/parent-guides/why-smart-children-make-silly-math-mistakes" className="text-amber-600 font-bold hover:underline">{t("progSchoolA3Link")}</Link>{t("progSchoolA3Part2")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Verified Trust & Location Context */}
      <section className="py-14 md:py-18 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white border-4 border-vibrant-dark rounded-[32px] p-6 md:p-10 shadow-[8px_8px_0_0_#1A2E35] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[10px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
              {t("progSchoolTrustBadge")}
            </span>
            <h3 className="font-display font-black text-2xl text-vibrant-dark">
              {t("progSchoolTrustTitle")}
            </h3>
            <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
              {t("progSchoolTrustDesc")}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-vibrant-gold" /> {t("progSchoolTrustPill1")}
              </span>
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-600" /> Competition & Olympiad Mentorship
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> CBSE & ICSE Board Synergy
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link
              to="/mentor"
              className="bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase px-5 py-3.5 rounded-2xl text-center shadow-md transition-all flex items-center justify-center gap-2"
            >
              Meet Founder Neha Patil (Certified Trainer of Abacus & Vedic Mathematics) <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="bg-vibrant-cream hover:bg-white text-vibrant-dark border-2 border-vibrant-dark font-black text-xs uppercase px-5 py-3.5 rounded-2xl text-center shadow-sm transition-all"
            >
              {t("progSchoolTrustBtnContact")}
            </Link>
          </div>

        </div>
      </section>

      {/* 8. Related Programs Navigation */}
      <section className="py-12 bg-slate-100/60 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-6">
          <h3 className="font-display font-black text-lg text-vibrant-dark">
            {t("progSchoolRelTitle")}
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold">
            <Link
              to="/programs/abacus"
              className="bg-white border-2 border-slate-200 hover:border-vibrant-orange px-5 py-3 rounded-2xl text-vibrant-dark transition-all flex items-center gap-2 shadow-xs"
            >
              <span>{t("progSchoolRelAbacus")}</span>
              <ArrowRight className="w-3.5 h-3.5 text-vibrant-orange" />
            </Link>
            <Link
              to="/programs/vedic-maths"
              className="bg-white border-2 border-slate-200 hover:border-vibrant-orange px-5 py-3 rounded-2xl text-vibrant-dark transition-all flex items-center gap-2 shadow-xs"
            >
              <span>{t("progSchoolRelVedic")}</span>
              <ArrowRight className="w-3.5 h-3.5 text-vibrant-orange" />
            </Link>
            <Link
              to="/programs"
              className="bg-slate-800 text-white hover:bg-slate-900 px-5 py-3 rounded-2xl transition-all flex items-center gap-2 shadow-xs"
            >
              <span>{t("progSchoolRelAll")}</span>
            </Link>
          </div>
        </div>
      </section>
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="School Mathematics (Grades 1–10)"
        source="program_page_school_maths"
      />
    </div>
  );
}
