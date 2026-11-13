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
  Target,
  Trophy,
  CheckCircle2
} from "lucide-react";
import LeadForm from "../components/LeadForm";
import { trackProgramView, trackWhatsAppClick } from "../lib/analytics";
import { useLanguage } from "../lib/LanguageContext";

export default function ProgramIpmOlympiad() {
  const { language, t } = useLanguage();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    trackProgramView("IPM & Olympiad Mathematics", "canonical_program_hub");
  }, []);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "IPM & Maths Olympiad Preparation Program",
    "description": "Elite competitive mathematics, logical reasoning, and Olympiad examination coaching for Grades 2 to 9 in Wakad, Pune.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Arnav Abacus Academy",
      "url": "https://aaa-web-b0h.pages.dev/"
    },
    "educationalCredentialAwarded": "Competitive Mathematics Certificate of Excellence",
    "audience": {
      "@type": "Audience",
      "audienceType": "Students in Grades 2 to 9 preparing for IPM, SOF IMO, and Maharashtra State Scholarship Math Exams"
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
        "name": "IPM & Olympiad Mathematics",
        "item": "https://aaa-web-b0h.pages.dev/programs/ipm-olympiad"
      }
    ]
  };

  const handleConsult = () => {
    trackWhatsAppClick("program_ipm_olympiad_counselling", "olympiad_inquiry");
    const waText = encodeURIComponent(
      "Hello Arnav Abacus Academy! I would like to inquire about IPM and Maths Olympiad Preparation for my child (Grade 2–9)."
    );
    window.open(`https://wa.me/919021924968?text=${waText}`, "_blank");
  };

  return (
    <div id="program-ipm-olympiad-page" className="bg-[#FFFDF9] min-h-screen">
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
          <Link to="/" className="hover:text-orange-600 transition-colors">{t("navHome")}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/programs" className="hover:text-orange-600 transition-colors">{t("navPrograms")}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">{t("progIpmBreadcrumb")}</span>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="bg-slate-900 text-white py-14 md:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5" />
                <span>{t("progIpmHeroBadge")}</span>
              </div>
              <h1 className="font-display font-black text-3xl md:text-5xl tracking-tight leading-tight">
                {t("progIpmHeroTitle")}
              </h1>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
                {t("progIpmHeroDesc")}
              </p>

              {/* Quick Spec Pills */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-amber-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <Clock className="w-3.5 h-3.5" /> {t("progIpmSpecGrade")}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-emerald-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <Users className="w-3.5 h-3.5" /> {t("progIpmSpecRatio")}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-slate-800 border border-slate-700 text-sky-300 text-xs px-3 py-1.5 rounded-xl font-bold">
                  <MapPin className="w-3.5 h-3.5" /> {t("progIpmSpecLoc")}
                </span>
              </div>

              {/* Location Snippet */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-xs text-slate-300 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>
                  <strong>{t("progIpmLocTitle")}</strong> {t("progIpmLocDesc")}
                </span>
              </div>
            </div>

            {/* Hero LeadForm Embed */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100">
              <div className="mb-4">
                <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {t("progIpmLeadBadge")}
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-2">
                  {t("progIpmLeadTitle")}
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  {t("progIpmLeadDesc")}
                </p>
              </div>
              <LeadForm sourceCampaign="programs_ipm_olympiad_page" defaultProgram="IPM & Olympiad Mathematics" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. Who Should Join */}
      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("progIpmWhoBadge")}
          </span>
          <h2 className="font-display font-black text-3xl text-slate-900">
            {t("progIpmWhoTitle")}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm font-semibold">
            {t("progIpmWhoSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-orange-500 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm">
              {t("progIpmGroup1Grade")}
            </div>
            <h3 className="font-display font-black text-base text-slate-900">{t("progIpmGroup1Title")}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progIpmGroup1Desc")}
            </p>
          </div>

          <div className="bg-white border-2 border-orange-500/30 p-6 rounded-3xl space-y-3 shadow-md relative">
            <span className="absolute -top-3 right-4 bg-orange-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {t("progIpmGroup2Badge")}
            </span>
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-black text-sm">
              {t("progIpmGroup2Grade")}
            </div>
            <h3 className="font-display font-black text-base text-slate-900">{t("progIpmGroup2Title")}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progIpmGroup2Desc")}
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3 shadow-xs hover:border-orange-500 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-black text-sm">
              {t("progIpmGroup3Grade")}
            </div>
            <h3 className="font-display font-black text-base text-slate-900">{t("progIpmGroup3Title")}</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progIpmGroup3Desc")}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Curriculum & Exam Coverage */}
      <section className="py-14 md:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-14">
            <span className="text-[10px] font-bold text-orange-600 bg-orange-100 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              {t("progIpmCurriculumBadge")}
            </span>
            <h2 className="font-display font-black text-3xl text-slate-900 leading-tight">
              {t("progIpmCurriculumTitle")}
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-semibold">
              {t("progIpmCurriculumSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-black text-orange-600 uppercase tracking-widest block">{t("progIpmTrackATrack")}</span>
              <h3 className="font-bold text-base text-slate-900">{t("progIpmTrackATitle")}</h3>
              <ul className="text-xs text-slate-600 space-y-2 font-medium">
                <li>• {t("progIpmTrackAP1")}</li>
                <li>• {t("progIpmTrackAP2")}</li>
                <li>• {t("progIpmTrackAP3")}</li>
                <li>• {t("progIpmTrackAP4")}</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-black text-teal-700 uppercase tracking-widest block">{t("progIpmTrackBTrack")}</span>
              <h3 className="font-bold text-base text-slate-900">{t("progIpmTrackBTitle")}</h3>
              <ul className="text-xs text-slate-600 space-y-2 font-medium">
                <li>• {t("progIpmTrackBP1")}</li>
                <li>• {t("progIpmTrackBP2")}</li>
                <li>• {t("progIpmTrackBP3")}</li>
                <li>• {t("progIpmTrackBP4")}</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <span className="text-xs font-black text-indigo-600 uppercase tracking-widest block">{t("progIpmTrackCTrack")}</span>
              <h3 className="font-bold text-base text-slate-900">{t("progIpmTrackCTitle")}</h3>
              <ul className="text-xs text-slate-600 space-y-2 font-medium">
                <li>• {t("progIpmTrackCP1")}</li>
                <li>• {t("progIpmTrackCP2")}</li>
                <li>• {t("progIpmTrackCP3")}</li>
                <li>• {t("progIpmTrackCP4")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Teaching Methodology & AAA Learning Model */}
      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
              {t("progIpmMethodBadge")}
            </span>
            <h2 className="font-display font-black text-3xl text-slate-900 leading-tight">
              {t("progIpmMethodTitle")}
            </h2>
            <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed">
              {t("progIpmMethodSubtitle")}
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-slate-700"><strong>{t("progIpmMethodP1Title")}</strong> {t("progIpmMethodP1Desc")}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-slate-700"><strong>{t("progIpmMethodP2Title")}</strong> {t("progIpmMethodP2Desc")}</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-slate-700"><strong>{t("progIpmMethodP3Title")}</strong> {t("progIpmMethodP3Desc")}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Trophy className="w-8 h-8 text-amber-500" />
              <div>
                <h3 className="font-black text-slate-900 text-lg">{t("progIpmTrackRecordHeading")}</h3>
                <span className="text-xs text-slate-500 font-medium">{t("progIpmTrackRecordSub")}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {t("progIpmTrackRecordDesc")}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-100">
                <span className="text-2xl font-black text-amber-600 block">{t("progIpmTrackRecordPartVal")}</span>
                <span className="text-[11px] font-bold text-slate-700">{t("progIpmTrackRecordPart")}</span>
              </div>
              <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
                <span className="text-2xl font-black text-emerald-700 block">{t("progIpmTrackRecordLevelsVal")}</span>
                <span className="text-[11px] font-bold text-slate-700">{t("progIpmTrackRecordLevels")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Practice & Progress Tracking */}
      <section className="py-14 md:py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
                {t("progIpmRigourBadge")}
              </span>
              <h2 className="font-display font-black text-2xl md:text-3xl text-white">
                {t("progIpmRigourTitle")}
              </h2>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-medium">
                {t("progIpmRigourDesc")}
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-400" />
                {t("progIpmAnalyticsTitle")}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t("progIpmAnalyticsDesc")}
              </p>
              <div className="pt-2">
                <button
                  onClick={handleConsult}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs px-6 py-3 rounded-full transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t("progIpmBtnCounselling")}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Parent FAQs */}
      <section className="py-14 md:py-20 max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {t("progIpmFaqBadge")}
          </span>
          <h2 className="font-display font-black text-3xl text-slate-900">
            {t("progIpmFaqTitle")}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="font-bold text-sm md:text-base text-slate-900 mb-2">
              {t("progIpmQ1")}
            </h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {t("progIpmA1")}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="font-bold text-sm md:text-base text-slate-900 mb-2">
              {t("progIpmQ2")}
            </h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {t("progIpmA2")}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="font-bold text-sm md:text-base text-slate-900 mb-2">
              {t("progIpmQ3")}
            </h3>
            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {t("progIpmA3")}
            </p>
          </div>
        </div>
      </section>

      {/* 8. Final Conversion CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white text-center border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-6">
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>{t("progIpmCtaPill")}</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl leading-tight">
            {t("progIpmCtaTitle")}
          </h2>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed font-semibold">
            {t("progIpmCtaDesc")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={handleConsult}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs md:text-sm uppercase tracking-wider px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer"
            >
              {t("progIpmCtaBtnWa")}
            </button>
            <Link
              to="/showcase"
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold text-xs md:text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all"
            >
              {t("progIpmCtaBtnHall")}
            </Link>
          </div>
        </div>
      </section>
      <DemoBookingModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProgram="IPM & Olympiad Mathematics (Grades 2–9)"
        source="program_page_ipm_olympiad"
      />
    </div>
  );
}
